#!/usr/bin/env python3
"""Remap the hero ASCII portrait so it only uses letters from "morganthen".

The existing art encodes brightness via its character ramp. We measure each
glyph's ink coverage with PIL, then remap every source char to the letter in
"morganthen" with the closest (rank-normalized) coverage. Shape is preserved;
only the alphabet changes. Space stays space (the lightest tone).
"""
import re
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"
FONT = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 48)

TARGET = sorted(set("morganthen"))  # m o r g a n t h e (unique)


def coverage(ch):
    """Fraction of inked pixels for a glyph rendered on a fixed cell."""
    img = Image.new("L", (40, 60), 0)
    ImageDraw.Draw(img).text((4, 2), ch, fill=255, font=FONT)
    px = img.getdata()
    return sum(px) / (255 * len(px))


def normalize(values):
    lo, hi = min(values.values()), max(values.values())
    span = hi - lo or 1
    return {k: (v - lo) / span for k, v in values.items()}


def main():
    text = HTML.read_text()
    m = re.search(r'(<pre class="hero__ascii-photo">)(.*?)(</pre)', text, re.S)
    if not m:
        raise SystemExit("ascii pre block not found")
    art = m.group(2)

    src_chars = {c for c in art if c not in " \n"}
    src_cov = normalize({c: coverage(c) for c in src_chars})
    tgt_cov = normalize({c: coverage(c) for c in TARGET})

    def nearest(v):
        return min(tgt_cov, key=lambda t: abs(tgt_cov[t] - v))

    mapping = {c: nearest(src_cov[c]) for c in src_chars}

    new_art = "".join(c if c in " \n" else mapping[c] for c in art)
    text = text[: m.start(2)] + new_art + text[m.end(2):]
    HTML.write_text(text)

    print("density ramp (light -> dark):",
          " ".join(sorted(TARGET, key=lambda t: tgt_cov[t])))
    print(f"remapped {len(src_chars)} distinct source glyphs")


if __name__ == "__main__":
    main()
