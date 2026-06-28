from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import html as htmlmod
import json
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "app"
DEST = APP / "html"
SOURCES = ["V01", "V73", "V75", "V76", "V92", "V100"]


class Extractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self.title: list[str] = []
        self._in_title = False
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style"}:
            self._skip += 1
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag in {"script", "style"} and self._skip:
            self._skip -= 1
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._skip:
            return
        if self._in_title:
            self.title.append(data)
        self.parts.append(data)


class BodyExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._depth = 0
        self.body_html = ""
        self._capturing = False

    def handle_starttag(self, tag, attrs):
        attrs_text = " ".join(f'{k}="{htmlmod.escape(v, quote=True)}"' for k, v in attrs)
        tag_text = f"<{tag}{(' ' + attrs_text) if attrs_text else ''}>"
        if tag == "body":
            self._capturing = True
            self._depth = 1
            return
        if self._capturing:
            self.body_html += tag_text
            if tag not in {"br", "hr", "img", "meta", "input", "link"}:
                self._depth += 1

    def handle_endtag(self, tag):
        if tag == "body" and self._capturing:
            self._depth = 0
            self._capturing = False
            return
        if self._capturing:
            self.body_html += f"</{tag}>"
            self._depth -= 1

    def handle_data(self, data):
        if self._capturing:
            self.body_html += data

    def handle_comment(self, data):
        if self._capturing:
            self.body_html += f"<!--{data}-->"


normalize = lambda text: re.sub(r"\s+", " ", htmlmod.unescape(text)).strip()


def extract_body_html(raw: str) -> str:
    match = re.search(r"<body[^>]*>(.*)</body>", raw, re.I | re.S)
    return match.group(1).strip() if match else raw


def extract_authors(text: str, body_html: str) -> str:
    for pattern in [
        re.compile(r"(?:저자|Author|Authors?)[:：]\s*(.+?)(?=\s+(?:IMM\b|Vol\.?\b|DOI\b|STEP\b|Abstract\b|초록\b|#\b|1\.|2\.|$))", re.I | re.S),
        re.compile(r"(?:저자|Author|Authors?)[:：]\s*([^<\n]+)", re.I),
    ]:
        match = pattern.search(text)
        if match:
            value = normalize(match.group(1))
            if value and value not in {"Industrial Marketing Management", "IMM"} and len(value) < 120:
                return value

    for candidate in re.findall(r"badge[^>]*badge-primary[^>]*>([^<]+)<", body_html, re.I):
        candidate = normalize(candidate)
        if not candidate or len(candidate) > 120:
            continue
        if any(bad in candidate for bad in ["Industrial Marketing Management", "IMM", "Vol.", "DOI", "quantitative", "논평", "실증연구", "연구 의제"]):
            continue
        return candidate
    return ""


def split_authors(raw: str) -> list[str]:
    raw = normalize(raw)
    if not raw:
        return []
    parts = re.split(r"\s*[·&,]\s*|\s+and\s+", raw)
    return [part for part in (normalize(p) for p in parts) if part]


def apa_author(name: str) -> str:
    name = normalize(name).rstrip(".")
    if not name:
        return ""
    parts = name.split()
    if len(parts) == 1:
        return parts[0]
    last = parts[-1]
    initials = " ".join(f"{part[0].upper()}." for part in parts[:-1] if part)
    return f"{last}, {initials}".strip()


def apa_authors(authors: list[str]) -> str:
    authors = [apa_author(a) for a in authors if a]
    if not authors:
        return ""
    if len(authors) == 1:
        return authors[0]
    if len(authors) == 2:
        return f"{authors[0]} & {authors[1]}"
    return f"{', '.join(authors[:-1])}, & {authors[-1]}"


def volume_year(text: str, collection: str) -> tuple[str, str, str]:
    patterns = [
        re.compile(r"Industrial Marketing Management\s+Vol\.\s*(\d+)\s*\((\d{4})\)(?:,\s*pp?\.?\s*([0-9]+(?:[-–][0-9]+)?))?", re.I),
        re.compile(r"IMM\s+Vol\.\s*(\d+)\s*\((\d{4})\)(?:,\s*pp?\.?\s*([0-9]+(?:[-–][0-9]+)?))?", re.I),
        re.compile(r"Vol\.\s*(\d+)\s*\((\d{4})\)(?:,\s*pp?\.?\s*([0-9]+(?:[-–][0-9]+)?))?", re.I),
        re.compile(r"IMM\s+(\d+)\s*\((\d{4})\)(?:,\s*p\.?\s*([0-9]+(?:[-–][0-9]+)?))?", re.I),
    ]
    for pattern in patterns:
        match = pattern.search(text)
        if match:
            return match.group(1), match.group(2), match.group(3) or ""
    if collection == "V01":
        match = re.search(r"IMM\s+(\d+)\s*\((\d{4})\)", text, re.I)
        if match:
            return match.group(1), match.group(2), ""
    return "", "", ""


def doi_from(text: str) -> str:
    match = re.search(r"10\.\d{4,9}/[^\s\"'<>]+", text, re.I)
    return match.group(0).rstrip(".,;") if match else ""


def excerpt_pair(text: str) -> tuple[str, str]:
    markers = ["한국어 번역", "번역 (한국어)", "한국어 요약", "요약 (한국어)"]
    for marker in markers:
        if marker in text:
            before, after = text.split(marker, 1)
            en = normalize(before)[:220].rstrip()
            ko = normalize(after)[:220].rstrip()
            return (en + ("…" if len(normalize(before)) > 220 else ""), ko + ("…" if len(normalize(after)) > 220 else ""))

    english_like = ""
    korean_like = ""
    for chunk in re.split(r"\s{2,}", text):
        chunk = normalize(chunk)
        if not chunk:
            continue
        has_hangul = bool(re.search(r"[가-힣]", chunk))
        has_latin = bool(re.search(r"[A-Za-z]", chunk))
        if not english_like and has_latin:
            english_like = chunk
        if not korean_like and has_hangul:
            korean_like = chunk
        if english_like and korean_like:
            break

    if not english_like:
        english_like = normalize(text)[:220].rstrip()
    if not korean_like:
        korean_like = ""

    if len(english_like) > 220:
        english_like = english_like[:220].rstrip() + "…"
    if len(korean_like) > 220:
        korean_like = korean_like[:220].rstrip() + "…"
    return english_like, korean_like


def apa_citation(doc: dict[str, str]) -> str:
    authors = doc.get("authorsRaw", "")
    author_text = apa_authors(split_authors(authors))
    year = doc.get("year", "")
    title = doc["title"]
    journal = doc.get("journal", "Industrial Marketing Management")
    volume = doc.get("volume", "")
    pages = doc.get("pages", "")
    doi = doc.get("doi", "")

    parts = []
    if author_text:
        parts.append(f"{author_text}.")
    if year:
        parts.append(f"({year}).")
    parts.append(f"{title}.")
    if volume:
        journal_part = f"{journal}, {volume}"
        if pages:
            journal_part += f", {pages}"
        parts.append(f"{journal_part}.")
    else:
        parts.append(f"{journal}.")
    if doi:
        parts.append(f"https://doi.org/{doi}")
    return " ".join(parts).replace("..", ".")


if DEST.exists():
    shutil.rmtree(DEST)
DEST.mkdir(parents=True, exist_ok=True)

records = []
seen_ids: set[str] = set()

for collection in SOURCES:
    src_root = ROOT / collection
    for src in sorted(src_root.rglob("*.html")):
        dst = DEST / collection / src.relative_to(src_root)
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

        raw = src.read_text(encoding="utf-8", errors="ignore")
        parser = Extractor()
        parser.feed(raw)

        title = " ".join(" ".join(parser.title).split()) or src.stem
        text = normalize(" ".join(parser.parts))
        excerpt_en, excerpt_ko = excerpt_pair(text)
        body_html = extract_body_html(raw)
        authors_raw = extract_authors(text, body_html)
        volume, year, pages = volume_year(text + " " + raw, collection)
        doi = doi_from(raw + " " + text)

        base_id = f"{collection.lower()}-{re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-') or 'doc'}"
        doc_id = base_id
        suffix = 2
        while doc_id in seen_ids:
            doc_id = f"{base_id}-{suffix}"
            suffix += 1
        seen_ids.add(doc_id)

        doc = {
            "id": doc_id,
            "collection": collection,
            "title": title,
            "authorsRaw": authors_raw,
            "journal": "Industrial Marketing Management",
            "volume": volume,
            "year": year,
            "pages": pages,
            "doi": doi,
            "path": f"./html/{collection}/{src.relative_to(src_root).as_posix()}",
            "charCount": len(text),
            "excerptEn": excerpt_en,
            "excerptKo": excerpt_ko,
            "bodyHtml": body_html,
            "sourceHtml": raw,
            "search": " ".join([title, authors_raw, text]).lower(),
        }
        doc["citationApa"] = apa_citation(doc)
        records.append(doc)

records.sort(key=lambda r: (SOURCES.index(r["collection"]), r["title"].lower()))

(APP / "data.js").write_text(
    "globalThis.IMM_DATA = " + json.dumps({"collections": ["ALL", *SOURCES], "documents": records}, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8",
)

assert len(records) == 31, len(records)
assert len({r["id"] for r in records}) == len(records)
print(f"synced {len(records)} html files -> {DEST} and rebuilt data.js")
