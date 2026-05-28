from __future__ import annotations

from pathlib import Path
import textwrap


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "workshop_presenter_notes.pdf"

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 54
RIGHT = 558
TOP = 742
BOTTOM = 58


MODULES = [
    {
        "title": "Module 1: Setup",
        "notes": [
            "The workshop starts with a narrow setup goal: everyone knows that Codex, Claude Code, and Python are available before the research workflow begins.",
            "This opening is not really about the command line. It is about making the tools feel usable and making sure the app can run a small check when the project later needs scripts.",
            "The tiny Python check is the first low-stakes interaction with Codex. It gives the room a concrete example of the agent running something, reading the result, and explaining what happened.",
            "The project folder has not been created yet because folder setup is part of the research workflow itself. The session starts from a realistic blank workspace, not from a pre-arranged project.",
        ],
        "transition": "Now that the tools are ready, we can move from setup into a real research assignment.",
    },
    {
        "title": "Module 2: PI Email To Project Memory",
        "notes": [
            "This module turns a loose PI email into a real research project. The important shift is from a message in an inbox to a workspace with source materials, folders, and shared memory.",
            "My_RA_Tasks is just the outer workspace. The actual research project lives inside it, which keeps the workshop folder simple while still showing how a project root gets created.",
            "The PI email and raw ZIP are the source materials. The rest of the workshop feels traceable back to those original inputs, not like a disconnected coding exercise.",
            "The dedicated project folder creates the boundary for the work. Once that folder is the active project root, paths like docs/ and data/original/ have a stable meaning.",
            "The email goes into docs/ and the unchanged ZIP goes into data/original/. That separation makes the difference between source evidence and generated work visible from the beginning.",
            "The handoff summary translates the PI's request into the research objective, expected deliverables, open questions, and judgment calls that the project will carry forward.",
            "The project memory files give future agent turns stable context. They say what the project is, what gets preserved, and where the work stays conservative.",
        ],
        "transition": "We now have the project set up and the PI request anchored. Next we inspect the raw data before making any claims.",
    },
    {
        "title": "Module 3: Raw Data And Role Rubric",
        "notes": [
            "This module is about looking before acting. The panel is not being built yet; the goal is to make the raw evidence understandable.",
            "The raw ZIP contains several files that need to be inventoried before they become useful. Row counts, file units, and likely relationships matter because they shape every later merge.",
            "The key research issue is matching. School identifiers, school names, district aliases, and crosswalk support all determine whether the final panel is trustworthy.",
            "The cafeteria partner roles are where judgment enters the project. Some records clearly look like school meal-program leadership, while others look like vendors, offices, advisors, or vague partners.",
            "The role rubric gives the classification step a conservative standard. It defines what counts as a confirmed school meal-program lead and what remains ambiguous.",
            "Ambiguity is not a failure of the workflow. It is part of the research record when the evidence is weak, vague, prospective, or unclear.",
        ],
        "transition": "Now we know what the files contain and what our classification rules are. Next we apply those rules row by row.",
    },
    {
        "title": "Module 4: Reviewer-Style Classification",
        "notes": [
            "This module shows how the agent can help with judgment-heavy classification without making the judgment disappear.",
            "The school-lead perspective looks for strong positive evidence that a school cafeteria team or meal-program team led the modernization effort.",
            "The non-lead perspective protects the analysis from overcounting. Vendors, district offices, consultants, suppliers, and education partners may be important, but they are not automatically school leads.",
            "The ambiguity perspective keeps weak or undocumented evidence out of the confirmed category. That matters because one generous classification can turn into a misleading analysis variable.",
            "The reconciliation step turns several perspectives into one classification file and one audit note. The CSV carries the category, and the audit carries the reasoning.",
            "The classification file is useful because it is auditable. The human can see which rows were confirmed, which stayed ambiguous, and which cases still need review.",
        ],
        "transition": "Now we have a classification file that can feed the panel, but only confirmed lead rows affect the lead indicator.",
    },
    {
        "title": "Module 5: Build A School-Year Panel",
        "notes": [
            "This module turns the inspected source files and the classification work into the main analysis-ready dataset.",
            "The panel has one row per school-year from 2019 through 2024. The important build rules are the unit of observation, the year range, crosswalk-based matching, grant timing, and conservative lead status.",
            "The workflow has a simple rhythm: rules first, script second, run third, inspect fourth. That rhythm keeps the code tied to the research choices instead of hiding them.",
            "The panel builder creates both a CSV and an audit note because the construction choices matter. Row counts, years, duplicate keys, unmatched names, and timing checks all belong in the record.",
            "The grant variables turn on in the award year, while grant amount is zero when no award occurred. The timing rule is what keeps the panel from blurring before and after.",
            "MealProgramLead turns on only after confirmed school-lead evidence. Ambiguous and non-lead partner rows stay excluded from that indicator.",
        ],
        "transition": "Now we have the baseline panel, but the deliverable is not complete until we explain what it can and cannot support.",
    },
    {
        "title": "Module 6: Prepare The PI Handoff",
        "notes": [
            "This module turns the data product back into research communication. The work is not finished just because the panel exists.",
            "The panel review memo explains what was built, what variables exist, how they were constructed, and which caveats still matter.",
            "The PI update is concise, practical, and honest about uncertainty. It sounds like a research handoff, not like a claim that every data issue has been solved.",
            "This module shows that a good deliverable is more than a file. It is a file plus a readable account of the judgment calls behind it.",
            "By the end of the handoff, the PI knows what is ready, what needs review, and what next analysis step is reasonable.",
        ],
        "transition": "The original assignment is complete, and the same workflow can handle a follow-up question when time allows.",
    },
    {
        "title": "Module 7: Causal Spec Lab",
        "notes": [
            "This module is the realistic follow-up: the PI asks a new question and introduces a new data source after the baseline panel exists.",
            "The same discipline carries forward. The follow-up request becomes source context, the survey extract becomes a new raw input, and the merge has to preserve the baseline panel universe.",
            "The survey extract needs the same kind of inspection as the earlier raw data. Unit of observation, school-year keys, coverage, missingness, and merge readiness all matter before analysis.",
            "The econometric plan is where Codex acts as a design partner. It can lay out candidate specifications, name assumptions, and explain which comparisons are descriptive, exploratory, or closer to causal.",
            "The 2022 scoring change is suggestive, but it is not automatically a clean causal design. A statewide post indicator by itself is not enough for strong causal claims.",
            "The spec-lab outputs are useful for patterns, estimates, plots, and careful checks. The final PI-facing brief separates what the analysis suggests from what remains uncertain.",
        ],
        "transition": "This shows how an organized project can absorb new data and new questions without losing the audit trail.",
    },
    {
        "title": "Module 8: Publication-Style Visualizations",
        "notes": [
            "This module shows that visual work can also be part of an agentic research workflow, not just something that happens after the analysis is over.",
            "The goal is not a final journal figure in one try. The goal is a serious first draft that makes visual choices explicit enough to inspect and discuss.",
            "The visualization brief gives the plots a target before code is written. The four visuals cover grant timing, meal outcomes, survey outcomes, and causal-estimate caveats.",
            "The plotting script turns the expanded panel and spec-lab outputs into SVG drafts after Codex installs the required visualization packages. Because the plots come from code, visual changes remain traceable if the team decides to revise later.",
            "The teaching moment is visual review. Titles, labels, legends, annotations, spacing, source notes, and clipping are all concrete parts of the research output.",
            "The review boundary is important: visual elements can change later, while the analysis and causal claims stay the same even when the plot looks polished.",
        ],
        "transition": "This shows that visual work can also be prompted and inspected like any other research output.",
    },
]


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def text_line(x: float, y: float, text: str, font: str = "F1", size: int = 10) -> str:
    return f"BT /{font} {size} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm ({pdf_escape(text)}) Tj ET"


def wrap(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def page_background() -> list[str]:
    return ["0 0 0 rg"]


class PageBuilder:
    def __init__(self) -> None:
        self.pages: list[list[str]] = [page_background()]
        self.y = TOP
        self.page_numbers: list[int] = []

    def current(self) -> list[str]:
        return self.pages[-1]

    def new_page(self) -> None:
        self.pages.append(page_background())
        self.y = TOP

    def ensure_space(self, needed: int) -> None:
        if self.y - needed < BOTTOM:
            self.new_page()

    def add_line(
        self,
        text: str,
        *,
        font: str = "F1",
        size: int = 10,
        indent: int = 0,
        gap: int = 13,
    ) -> None:
        self.ensure_space(gap + 4)
        self.current().append(text_line(LEFT + indent, self.y, text, font, size))
        self.y -= gap

    def add_paragraph(
        self,
        text: str,
        *,
        font: str = "F1",
        size: int = 10,
        indent: int = 0,
        width: int = 92,
        gap: int = 13,
        after: int = 7,
    ) -> None:
        for line in wrap(text, width=width):
            self.add_line(line, font=font, size=size, indent=indent, gap=gap)
        self.y -= after

    def add_bullet(self, text: str) -> None:
        lines = wrap(text, width=84)
        for index, line in enumerate(lines):
            prefix = "- " if index == 0 else "  "
            self.add_line(prefix + line, size=9, indent=12, gap=12)
        self.y -= 3

    def add_rule(self) -> None:
        self.ensure_space(18)
        self.current().append(f"0.84 0.84 0.81 RG {LEFT} {self.y:.2f} m {RIGHT} {self.y:.2f} l S")
        self.y -= 18

    def add_heading(self, text: str) -> None:
        self.ensure_space(42)
        self.add_line(text, font="F2", size=12, gap=17)

    def finish(self) -> list[str]:
        total = len(self.pages)
        for index, page in enumerate(self.pages, start=1):
            page.append(text_line(LEFT, 28, f"Page {index} of {total}", "F1", 8))
        return ["\n".join(page) for page in self.pages]


def build_page_streams() -> list[str]:
    builder = PageBuilder()

    builder.add_line("Workshop Presenter Notes", font="F2", size=14, gap=18)
    builder.add_line("School Lunch Modernization Grants Demo", font="F2", size=11, gap=24)

    for module in MODULES:
        builder.ensure_space(110)
        builder.add_heading(module["title"])
        for note in module["notes"]:
            builder.add_bullet(note)
        if module["transition"]:
            builder.add_paragraph("Transition: " + module["transition"], font="F2", size=9, indent=12, width=82, after=10)

    return builder.finish()


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
