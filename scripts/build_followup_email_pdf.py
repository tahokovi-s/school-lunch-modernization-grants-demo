from __future__ import annotations

from pathlib import Path
import textwrap


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "assets" / "generated" / "pi_followup_2022_scoring_change_email.pdf"
LEGACY_OUT = ROOT / "docs" / "assets" / "generated" / "pi_followup_causal_inference_email.pdf"

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 54
TOP = 742
BOTTOM = 54


EMAIL = {
    "from": "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA. <jensen@stax.example>",
    "to": "STAX Predoc Team <predocs@stax.example>",
    "date": "Thursday, March 14, 2024 at 3:42 PM",
    "subject": "Follow-up on the 2022 school lunch grant scoring change",
    "attachment": "student_health_wellbeing_survey_extract.csv",
    "paragraphs": [
        "Hi team,",
        "Thanks for putting together the school-year panel and the notes. This is very helpful, and I think it may be enough for a first analysis pass.",
        "One more thing: I confirmed that the state changed the modernization grant scoring in 2022. After the change, applications tied to scratch-cooking equipment, cold storage, and healthier serving-line infrastructure appear to have received a clearer priority. That may give us a useful timing change to explore, though I do not want to assume it is a clean policy break without checking the panel.",
        "I also attached a school-year survey extract with aggregate student health and wellbeing measures. Please merge it carefully before using those variables. If the scoring change mattered in practice, I would expect to see something like more schools receiving grants, larger grant amounts, or improvements in lunch participation, healthy-meal scores, and aggregate student health or wellbeing measures after 2022.",
        "Please be cautious with the wellbeing and mental-health-related measures. A referral rate could reflect need, detection, service access, or reporting practice, so treat those checks as exploratory survey signals rather than proof of a mental-health effect.",
        "Could you take a first pass at whether the panel shows anything along those lines? Please use your judgment about the exact comparisons. Pre/post patterns, plots, and some regression-style checks would be useful, but I do not want to force one specification too early.",
        "I mostly want to know whether there is anything promising here, what the first-pass estimates look like, and what we would need to check before taking the result seriously.",
        "Thanks,",
        "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.",
    ],
}


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def text_line(x: float, y: float, text: str, font: str = "F1", size: int = 10) -> str:
    return f"BT /{font} {size} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm ({pdf_escape(text)}) Tj ET"


def wrap(text: str, width: int = 101) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def page_background() -> list[str]:
    return [
        "0.97 0.97 0.95 rg 0 0 612 792 re f",
        "1 1 1 rg 42 42 528 708 re f",
        "0.87 0.87 0.84 RG 42 42 528 708 re S",
    ]


def build_page_streams() -> list[str]:
    pages: list[list[str]] = [page_background()]
    y = TOP

    def current() -> list[str]:
        return pages[-1]

    def new_page() -> None:
        nonlocal y
        pages.append(page_background())
        y = TOP

    def add(text: str, font: str = "F1", size: int = 9, indent: int = 0, gap: int = 12) -> None:
        nonlocal y
        if y < BOTTOM + 30:
            new_page()
        current().append(text_line(LEFT + indent, y, text, font, size))
        y -= gap

    current().append("0.49 0.19 0.25 rg")
    add("STAX Lab Follow-Up Email", "F2", 11, gap=20)
    current().append("0.09 0.13 0.17 rg")
    add(EMAIL["subject"], "F2", 18, gap=26)

    meta_rows = [
        ("From", EMAIL["from"]),
        ("To", EMAIL["to"]),
        ("Date", EMAIL["date"]),
        ("Attach", EMAIL["attachment"]),
    ]
    for label, value in meta_rows:
        current().append("0.39 0.44 0.49 rg")
        current().append(text_line(LEFT, y, f"{label}:", "F2", 9))
        current().append("0.09 0.13 0.17 rg")
        current().append(text_line(LEFT + 52, y, value, "F1", 9))
        y -= 14

    y -= 8
    current().append("0.87 0.87 0.84 RG 54 %.2f m 558 %.2f l S" % (y, y))
    y -= 22

    for paragraph in EMAIL["paragraphs"]:
        for line in wrap(paragraph):
            add(line, "F1", 9, gap=12)
        y -= 6

    return ["\n".join(page) for page in pages]


def build_pdf(page_streams: list[str]) -> bytes:
    objects: list[str | None] = [None, None, None, None]
    objects[2] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"

    page_ids: list[int] = []
    for stream in page_streams:
        page_id = len(objects) + 1
        content_id = len(objects) + 2
        page_ids.append(page_id)
        objects.append(
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
            f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents {content_id} 0 R >>"
        )
        stream_bytes = stream.encode("ascii")
        objects.append(f"<< /Length {len(stream_bytes)} >>\nstream\n{stream}\nendstream")

    kids = " ".join(f"{page_id} 0 R" for page_id in page_ids)
    objects[0] = "<< /Type /Catalog /Pages 2 0 R >>"
    objects[1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>"

    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(out))
        out.extend(f"{index} 0 obj\n{obj}\nendobj\n".encode("ascii"))

    xref_offset = len(out)
    out.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    out.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        out.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    out.extend(
        f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode(
            "ascii"
        )
    )
    return bytes(out)


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = build_pdf(build_page_streams())
    OUT.write_bytes(pdf)
    LEGACY_OUT.write_bytes(pdf)
    print(OUT)
    print(LEGACY_OUT)


if __name__ == "__main__":
    main()
