#!/usr/bin/env python3
"""Build static context figures for the workshop guide."""

from __future__ import annotations

import csv
import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_ORIGINAL = ROOT / "data" / "original"
DATA_READY = ROOT / "data" / "analysis_ready"
OUT = ROOT / "docs" / "assets" / "generated"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def svg_escape(value: object) -> str:
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def wrap_words(text: str, max_chars: int) -> list[str]:
    lines: list[str] = []
    current: list[str] = []
    for word in text.split():
        candidate = " ".join([*current, word])
        if current and len(candidate) > max_chars:
            lines.append(" ".join(current))
            current = [word]
        else:
            current.append(word)
    if current:
        lines.append(" ".join(current))
    return lines or [text]


def svg_wrapped_text(text: str, x: int, center_y: int, class_name: str, max_chars: int = 28) -> str:
    lines = wrap_words(text, max_chars)
    line_h = 14
    first_y = center_y - int((len(lines) - 1) * line_h / 2)
    tspans = [
        f'<tspan x="{x}" y="{first_y + index * line_h}">{svg_escape(line)}</tspan>'
        for index, line in enumerate(lines)
    ]
    return f'<text class="{class_name}">{"".join(tspans)}</text>'


def role_distribution_svg(role_counts: Counter[str]) -> str:
    top_roles = role_counts.most_common(9)
    width = 820
    row_h = 36
    chart_top = 92
    chart_left = 250
    chart_width = 500
    max_count = max(count for _, count in top_roles)
    height = chart_top + len(top_roles) * row_h + 38
    rows = []
    for index, (role, count) in enumerate(top_roles):
        y = chart_top + index * row_h
        bar_width = int(chart_width * count / max_count)
        label = svg_wrapped_text(role, 32, y + 18, "label")
        rows.append(
            f"{label}"
            f'<rect x="{chart_left}" y="{y + 7}" width="{bar_width}" height="18" rx="3" class="bar"/>'
            f'<text x="{chart_left + bar_width + 10}" y="{y + 19}" class="count">{count}</text>'
        )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">Raw cafeteria partner role labels</title>
  <desc id="desc">A horizontal bar chart showing the most common raw cafeteria partner role labels before classification.</desc>
  <style>
    text {{ font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #18212b; }}
    .title {{ font-size: 24px; font-weight: 800; }}
    .subtitle {{ font-size: 14px; fill: #65717d; }}
    .label {{ font-size: 13px; font-weight: 700; }}
    .count {{ font-size: 13px; font-weight: 800; fill: #245f75; }}
    .bar {{ fill: #b9802e; opacity: 0.78; }}
    .rule {{ stroke: #deddd5; stroke-width: 1; }}
  </style>
  <rect width="{width}" height="{height}" rx="8" fill="#ffffff"/>
  <text x="32" y="40" class="title">Raw role labels are messy</text>
  <text x="32" y="65" class="subtitle">The same file mixes school leads, district offices, vendors, advisors, education partners, and ambiguous helpers.</text>
  <line x1="32" y1="82" x2="788" y2="82" class="rule"/>
  {''.join(rows)}
</svg>
'''


def panel_by_year_svg(panel: list[dict[str, str]]) -> str:
    years = sorted({row["year"] for row in panel})
    recipients = {
        year: sum(int(row["ModernizationGrantRecipient"]) for row in panel if row["year"] == year)
        for year in years
    }
    leads = {year: sum(int(row["MealProgramLead"]) for row in panel if row["year"] == year) for year in years}
    amounts = {
        year: sum(float(row["ModernizationGrantAmount"]) for row in panel if row["year"] == year)
        for year in years
    }
    max_count = max(max(recipients.values()), max(leads.values()))
    max_amount = max(amounts.values())
    width = 820
    height = 360
    left = 68
    bottom = 286
    chart_h = 168
    group_w = 104
    bar_w = 20
    amount_points = []
    bars = []
    for index, year in enumerate(years):
        x = left + index * group_w
        recipient_h = int(chart_h * recipients[year] / max_count)
        lead_h = int(chart_h * leads[year] / max_count)
        amount_y = bottom - int(chart_h * amounts[year] / max_amount)
        amount_points.append(f"{x + 45},{amount_y}")
        bars.append(
            f'<rect x="{x}" y="{bottom - recipient_h}" width="{bar_w}" height="{recipient_h}" rx="3" class="recipient"/>'
            f'<rect x="{x + 26}" y="{bottom - lead_h}" width="{bar_w}" height="{lead_h}" rx="3" class="lead"/>'
            f'<circle cx="{x + 45}" cy="{amount_y}" r="4" class="amount-dot"/>'
            f'<text x="{x + 20}" y="{bottom + 25}" class="year">{year}</text>'
        )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">Clean school-year panel measures by year</title>
  <desc id="desc">Bars show grant recipients and meal-program leads by year. The line shows total grant amount.</desc>
  <style>
    text {{ font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #18212b; }}
    .title {{ font-size: 24px; font-weight: 800; }}
    .subtitle {{ font-size: 14px; fill: #65717d; }}
    .axis {{ stroke: #c6c9c1; stroke-width: 1; }}
    .grid {{ stroke: #deddd5; stroke-width: 1; opacity: 0.8; }}
    .recipient {{ fill: #245f75; }}
    .lead {{ fill: #7e3140; opacity: 0.86; }}
    .amount-line {{ fill: none; stroke: #b9802e; stroke-width: 3; }}
    .amount-dot {{ fill: #b9802e; }}
    .year, .legend {{ font-size: 13px; font-weight: 800; }}
  </style>
  <rect width="{width}" height="{height}" rx="8" fill="#ffffff"/>
  <text x="32" y="40" class="title">The cleaned panel has year-by-year structure</text>
  <text x="32" y="65" class="subtitle">Every school appears in every year, so zeroes and cumulative meal-program leadership are visible.</text>
  <line x1="{left - 18}" y1="{bottom}" x2="730" y2="{bottom}" class="axis"/>
  <line x1="{left - 18}" y1="{bottom - chart_h}" x2="730" y2="{bottom - chart_h}" class="grid"/>
  <polyline points="{' '.join(amount_points)}" class="amount-line"/>
  {''.join(bars)}
  <rect x="535" y="98" width="13" height="13" class="recipient"/><text x="555" y="110" class="legend">Grant recipients</text>
  <rect x="535" y="121" width="13" height="13" class="lead"/><text x="555" y="133" class="legend">Meal-program leads</text>
  <circle cx="541" cy="150" r="5" class="amount-dot"/><text x="555" y="154" class="legend">Grant amount</text>
</svg>
'''


def before_after_summary_svg(stats: dict[str, object]) -> str:
    raw = stats["raw"]
    clean = stats["clean"]
    ambiguous_count = clean["role_category_counts"].get("ambiguous", 0)
    lead_count = clean["role_category_counts"].get("school_meal_program_lead", 0)
    rows = [
        (
            "Raw grants",
            f"{raw['grant_rows']} award rows",
            "Clean panel",
            f"{clean['panel_rows']} school-year rows",
        ),
        (
            "Raw school names",
            f"{raw['unique_raw_school_names']} distinct strings",
            "Canonical schools",
            f"{raw['schools']} schools repeated yearly",
        ),
        (
            "Raw role labels",
            f"{raw['partner_role_rows']} role observations",
            "Classified roles",
            f"{lead_count} school lead rows",
        ),
        (
            "Ambiguous inputs",
            "Need judgment",
            "Audit output",
            f"{ambiguous_count} rows preserved for review",
        ),
    ]
    row_svg = []
    for index, (left_title, left_text, right_title, right_text) in enumerate(rows):
        y = 98 + index * 54
        row_svg.append(
            f'<text x="42" y="{y}" class="mini">{svg_escape(left_title)}</text>'
            f'<text x="42" y="{y + 22}" class="body">{svg_escape(left_text)}</text>'
            f'<text x="456" y="{y}" class="mini">{svg_escape(right_title)}</text>'
            f'<text x="456" y="{y + 22}" class="body">{svg_escape(right_text)}</text>'
        )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 350" role="img" aria-labelledby="title desc">
  <title id="title">Before and after summary of the workflow</title>
  <desc id="desc">A two-column summary comparing raw inputs with cleaned analysis-ready outputs.</desc>
  <style>
    text {{ font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #18212b; }}
    .title {{ font-size: 24px; font-weight: 800; }}
    .head {{ font-size: 16px; font-weight: 900; fill: #245f75; text-transform: uppercase; }}
    .mini {{ font-size: 13px; font-weight: 900; fill: #65717d; text-transform: uppercase; }}
    .body {{ font-size: 18px; font-weight: 800; }}
    .panel {{ fill: #f8f7f3; stroke: #deddd5; }}
    .arrow {{ stroke: #b9802e; stroke-width: 3; fill: none; marker-end: url(#arrow); }}
  </style>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#b9802e"/>
    </marker>
  </defs>
  <rect width="820" height="350" rx="8" fill="#ffffff"/>
  <text x="32" y="42" class="title">Agentic workflow turns lunch-room mess into usable output</text>
  <rect x="32" y="68" width="330" height="246" rx="8" class="panel"/>
  <rect x="456" y="68" width="330" height="246" rx="8" class="panel"/>
  <text x="42" y="88" class="head">Before</text>
  <text x="466" y="88" class="head">After</text>
  <path d="M382 188 C402 170 424 170 444 188" class="arrow"/>
  {''.join(row_svg)}
</svg>
'''


def main() -> None:
    schools = read_csv(DATA_ORIGINAL / "school_directory.csv")
    grants = read_csv(DATA_ORIGINAL / "school_lunch_modernization_grant_awards.csv")
    roles = read_csv(DATA_ORIGINAL / "cafeteria_partner_role_records.csv")
    classifications = read_csv(DATA_READY / "cafeteria_partner_role_classifications.csv")
    panel = read_csv(DATA_READY / "school_year_panel.csv")

    role_counts = Counter(row["organization_role_raw"] for row in roles)
    category_counts = Counter(row["role_category"] for row in classifications)
    years = sorted({row["year"] for row in panel})
    stats = {
        "raw": {
            "schools": len(schools),
            "grant_rows": len(grants),
            "partner_role_rows": len(roles),
            "unique_raw_organization_names": len({row["organization_name"] for row in roles}),
            "unique_raw_school_names": len({row["school_name"] for row in grants}),
            "top_raw_partner_roles": role_counts.most_common(12),
        },
        "clean": {
            "panel_rows": len(panel),
            "schools_per_year": {year: sum(1 for row in panel if row["year"] == year) for year in years},
            "years": years,
            "role_category_counts": dict(category_counts),
            "grant_recipients_by_year": {
                year: sum(int(row["ModernizationGrantRecipient"]) for row in panel if row["year"] == year)
                for year in years
            },
            "meal_program_leads_by_year": {
                year: sum(int(row["MealProgramLead"]) for row in panel if row["year"] == year) for year in years
            },
            "grant_amount_by_year": {
                year: round(sum(float(row["ModernizationGrantAmount"]) for row in panel if row["year"] == year), 1)
                for year in years
            },
            "average_lunch_participation_by_year": {
                year: round(
                    sum(float(row["lunch_participation_rate"]) for row in panel if row["year"] == year)
                    / sum(1 for row in panel if row["year"] == year),
                    1,
                )
                for year in years
            },
            "average_healthy_meal_score_by_year": {
                year: round(
                    sum(float(row["healthy_meal_score"]) for row in panel if row["year"] == year)
                    / sum(1 for row in panel if row["year"] == year),
                    1,
                )
                for year in years
            },
        },
    }

    OUT.mkdir(parents=True, exist_ok=True)
    write(OUT / "context_stats.json", json.dumps(stats, indent=2) + "\n")
    write(OUT / "raw_role_distribution.svg", role_distribution_svg(role_counts))
    write(OUT / "panel_by_year.svg", panel_by_year_svg(panel))
    write(OUT / "before_after_summary.svg", before_after_summary_svg(stats))


if __name__ == "__main__":
    main()
