#!/usr/bin/env python3
"""Diamond halftone plates: assets/src/*.png|jpg -> assets/half/<name>.png

Each cell of the source becomes one ink diamond whose size follows the cell's
darkness. Dark-on-average sources are inverted first so every plate stays
paper-dominant. Output is 1200x750 (16:10), a few colours, small.

    python3 scripts/halftone.py            # all sources
    python3 scripts/halftone.py portrait   # one source by stem
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "assets/src", ROOT / "assets/half"
W, H, CELL, SS = 1200, 750, 8, 3           # output size, cell px, supersample
ZOOM = 1.5                                  # crop to the central 1/ZOOM before screening
ZOOM_BY_STEM = {"strata": 1.1}              # wide headlines need less crop
PAPER, INK = (242, 240, 235), (17, 17, 17)
GAMMA = 0.55                                # <1 pulls light text up into visible dots


def plate(src: Path) -> Path:
    im = Image.open(src).convert("L")
    w, h = im.size
    z = ZOOM_BY_STEM.get(src.stem, ZOOM)
    cw, ch = w / z, h / z
    im = im.crop((int((w - cw) / 2), int(h * 0.04), int((w + cw) / 2), int(h * 0.04 + ch)))
    im = ImageOps.fit(im, (W, H))
    if ImageOps.autocontrast(im).resize((1, 1), Image.BOX).getpixel((0, 0)) < 110:   # dark page: invert so paper dominates
        im = ImageOps.invert(im)
    small = im.resize((W // CELL, H // CELL), Image.BOX)   # mean luminance per cell

    canvas = Image.new("RGB", (W * SS, H * SS), PAPER)
    draw = ImageDraw.Draw(canvas)
    c = CELL * SS
    half_max = c * 0.72
    px = small.load()
    for j in range(small.height):
        for i in range(small.width):
            d = (1 - px[i, j] / 255) ** GAMMA
            r = d * half_max
            if r < 0.6:
                continue
            cx, cy = i * c + c / 2, j * c + c / 2
            draw.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=INK)

    out = canvas.resize((W, H), Image.LANCZOS).quantize(colors=16)
    OUT.mkdir(exist_ok=True)
    dest = OUT / (src.stem + ".png")
    out.save(dest, optimize=True)
    return dest


if __name__ == "__main__":
    stems = sys.argv[1:]
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg"})
    if stems:
        files = [p for p in files if p.stem in stems]
    for p in files:
        d = plate(p)
        print(f"{d.relative_to(ROOT)}  {d.stat().st_size // 1024} KB")
