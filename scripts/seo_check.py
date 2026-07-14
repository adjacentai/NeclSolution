"""SEO gates: fail the build on hand-edit regressions.

Checks every blog post + index.html:
- exactly one <h1>
- <title> <= 60 chars
- every JSON-LD block parses
- canonical present and absolute (https://neclco.com/...)
- blog posts: BlogPosting JSON-LD present
"""
import html as html_mod
import json
import re
import sys
from pathlib import Path

SITE = "https://neclco.com"
failures = []

# Legacy posts published with pre-gate titles that already rank in Google.
# Do NOT retitle ranking pages; new posts must pass the 60-char limit.
TITLE_LEN_ALLOWLIST = {
    "blog/cream-mic-ai-desktop-assistant.html",
    "blog/cream-typer-open-source-voice-dictation-macos.html",
    "blog/pickachu-bot-ai-image-editor.html",
    "blog/resumequick-ai-resume-builder.html",
    "blog/what-is-necl.html",
}

def check(fp: Path, is_post: bool):
    h = fp.read_text()
    name = str(fp)

    h1s = re.findall(r"<h1[ >]", h)
    if len(h1s) != 1:
        failures.append(f"{name}: expected exactly 1 <h1>, found {len(h1s)}")

    t = re.search(r"<title>([^<]*)</title>", h)
    if not t:
        failures.append(f"{name}: missing <title>")
    else:
        title_text = html_mod.unescape(t.group(1))
        if len(title_text) > 60 and name not in TITLE_LEN_ALLOWLIST:
            failures.append(f"{name}: title {len(title_text)} chars (max 60): {title_text!r}")

    c = re.search(r'<link rel="canonical" href="([^"]+)"', h)
    if not c:
        failures.append(f"{name}: missing canonical")
    elif not c.group(1).startswith(SITE):
        failures.append(f"{name}: canonical not absolute prod URL: {c.group(1)}")

    types = []
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.DOTALL):
        try:
            d = json.loads(block)
            types.append(d.get("@type", "?"))
        except Exception as e:
            failures.append(f"{name}: broken JSON-LD: {e}")
    if is_post and "BlogPosting" not in types:
        failures.append(f"{name}: missing BlogPosting JSON-LD")

check(Path("index.html"), is_post=False)
for fp in sorted(Path("blog").glob("*.html")):
    check(fp, is_post=(fp.name != "index.html"))

if failures:
    print("SEO CHECK FAILED:")
    for f in failures:
        print(f"  ✗ {f}")
    sys.exit(1)
print("SEO check: all green")
