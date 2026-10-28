"""Build Home Court Pixel from the bundled SIL OFL font.

Requires fonttools (python -m pip install fonttools).
Run from any directory: python scripts/generate-retro-font.py
"""

from pathlib import Path

from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont


FONT_DIR = Path(__file__).resolve().parents[1] / "public" / "fonts"
VERTICAL_SCALE = 1.2

font = TTFont(FONT_DIR / "press-start-2p.ttf", recalcTimestamp=False)
glyph_set = font.getGlyphSet()
stretched_glyphs = {}

# Decompose before replacing glyphs so composite letters are scaled only once.
for name in font.getGlyphOrder():
    recording = DecomposingRecordingPen(glyph_set)
    glyph_set[name].draw(recording)
    pen = TTGlyphPen(None)
    recording.replay(TransformPen(pen, (1, 0, 0, VERTICAL_SCALE, 0, 0)))
    stretched_glyphs[name] = pen.glyph()

for name, glyph in stretched_glyphs.items():
    font["glyf"][name] = glyph

# Drop hint programs written for the original outlines.
for table in ("fpgm", "prep", "cvt "):
    if table in font:
        del font[table]

for table, fields in (
    ("hhea", ("ascent", "descent", "lineGap")),
    ("OS/2", ("sTypoAscender", "sTypoDescender", "sTypoLineGap",
              "usWinAscent", "usWinDescent", "sxHeight", "sCapHeight")),
    ("post", ("underlinePosition", "underlineThickness")),
):
    for field in fields:
        if hasattr(font[table], field):
            setattr(font[table], field, round(getattr(font[table], field) * VERTICAL_SCALE))

# The source has a reserved font name; this derivative uses its own family name.
names = {
    1: "Home Court Pixel", 2: "Regular", 3: "HomeCourtPixel-Regular-1.0",
    4: "Home Court Pixel Regular", 6: "HomeCourtPixel-Regular",
    16: "Home Court Pixel", 17: "Regular", 18: "Home Court Pixel Regular",
    21: "Home Court Pixel", 22: "Regular",
}
for record in font["name"].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())

font.save(FONT_DIR / "home-court-pixel.ttf")

