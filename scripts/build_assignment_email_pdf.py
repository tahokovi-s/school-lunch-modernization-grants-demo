from __future__ import annotations

from pathlib import Path
import textwrap


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "assets" / "generated" / "pi_assignment_email.pdf"

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 54
TOP = 742
BOTTOM = 54


EMAIL = {
    "from": "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA. <jensen@stax.example>",
    "to": "STAX Predoc Team <predocs@stax.example>",
    "date": "Monday, March 4, 2024 at 8:17 AM",
    "subject": "Possible new project on school lunch modernization grants",
    "attachment": "school_lunch_modernization_raw_data.zip",
    "paragraphs": [
        "Hi team,",
        "I have a possible new project that I would like to explore. The state has been giving small modernization grants to schools for cafeteria equipment, kitchen upgrades, and healthier meal infrastructure, but I do not yet have a clean sense of which schools received what.",
        "The broad question is whether we can turn these grant records into an auditable school-year panel. My intuition is that better kitchens, cooler storage, salad bars, and serving-line upgrades may show up in meal participation or healthier menu measures, but I do not know what the raw files will support.",
        "I attached the raw materials I have so far. They are not cleaned or documented beyond what is in the files, so please treat this as exploratory. I expect school and district names, grant records, equipment descriptions, cafeteria partner role labels, and school-name crosswalks to need some judgment before we can say anything confidently.",
        "Could you take a first pass and see whether it is possible to turn this into a school-year file for 2019-2024? I would like something that shows, for each school and year, whether the school received a modernization grant, roughly how much it received, what its lunch participation and healthy-meal measures look like, and whether it appears to have led a meal-program modernization effort.",
        "Please do not worry about making this perfect on the first pass. I care more about a transparent, auditable workflow: what files are there, how names were matched, which role labels were counted as school meal-program leads, what looked ambiguous, and what should be checked before I rely on the results.",
        "If an organization's role sounds like a district office, equipment vendor, food supplier, consultant, nutrition education group, or just a vague strategic partner, please flag it instead of automatically treating it as a school lead. A conservative first pass with clear caveats would be more useful than a polished file that hides the hard calls.",
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
    add("STAX Lab Assignment Email", "F2", 11, gap=20)
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
        is_bullet = paragraph.startswith("- ")
        content = paragraph[2:] if is_bullet else paragraph
        width = 94 if is_bullet else 101
        for line_number, line in enumerate(wrap(content, width=width)):
            prefix = "- " if is_bullet and line_number == 0 else "  " if is_bullet else ""
            add(f"{prefix}{line}", "F1", 9, indent=12 if is_bullet else 0, gap=12)
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
    OUT.write_bytes(build_pdf(build_page_streams()))
    print(OUT)


if __name__ == "__main__":
    main()
