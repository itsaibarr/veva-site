#!/usr/bin/env python3
"""ASCII plates: assets/ascii-src/<name>.jpg -> assets/ascii/<name>.png (RGBA, ink on transparent).

Each character cell samples the mean darkness of the source; darker cells get denser glyphs.
An edge fade (per plate) multiplies the ink alpha so the plate dissolves into the page.

    python3 scripts/ascii.py            # all plates in PLATES
    python3 scripts/ascii.py hero       # one plate
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "assets/ascii-src", ROOT / "assets/ascii"
FONT = ROOT / "scripts/mono.ttf"
INK = (17, 17, 17)
RAMP = " .'`,:;-~=+*#%@"          # light → dark

# name: (source, output size, crop box as fractions (l,t,r,b), mirror, fades (l,t,r,b) as fraction of width/height)
PLATES = {
    "hero":    ("hero.jpg",    (960, 1280), (0, 0, 1, 1),        True,  (0.25, 0.0, 0.0, 0.5)),
    "veva":    ("dna.jpg",     (600, 1100), (0, 0, 1, 1),        False, (0.1, 0.12, 0.1, 0.15)),
    "step1":   ("step1.jpg",   (800, 600),  (0, 0.12, 1, 0.87),  False, (0.15, 0.15, 0.15, 0.2)),
    "step2":   ("veva.jpg",    (800, 600),  (0.1, 0.05, 0.9, 0.65), False, (0.15, 0.15, 0.15, 0.2)),  # temporary crop until the laptop plate exists
    "step3":   ("step3.jpg",   (800, 600),  (0, 0.12, 1, 0.87),  False, (0.15, 0.15, 0.15, 0.2)),
    "contact": ("contact.jpg", (1500, 500), (0, 0.1, 1, 0.9),    False, (0.25, 0.2, 0.25, 0.3)),
}
CELL_W, CELL_H = 6, 10          # output px per glyph cell
GAMMA = 0.45                    # <1 darkens midtones (engraving lines average out light)
CONTRAST = 1.6                  # applied around mid-grey before the ramp


def fade_mask(w, h, fades):
    """Linear fades from each edge, multiplied together; returns an L image."""
    import numpy as np
    x = np.linspace(0, 1, w)[None, :]
    y = np.linspace(0, 1, h)[:, None]
    l, t, r, b = fades
    m = np.ones((h, w))
    if l: m *= np.clip(x / l, 0, 1)
    if r: m *= np.clip((1 - x) / r, 0, 1)
    if t: m *= np.clip(y / t, 0, 1)
    if b: m *= np.clip((1 - y) / b, 0, 1)
    m = m ** 1.5
    return Image.fromarray((m * 255).astype("uint8"), "L")


def plate(name):
    src, (W, H), crop, mirror, fades = PLATES[name]
    im = Image.open(SRC / src).convert("L")
    w, h = im.size
    im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    if mirror:
        im = ImageOps.mirror(im)
    im = ImageOps.fit(im, (W, H))
    im = ImageOps.autocontrast(im, cutoff=1)
    cols, rows = W // CELL_W, H // CELL_H
    small = im.resize((cols, rows), Image.BOX)
    px = small.load()
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.truetype(str(FONT), 12)
    n = len(RAMP) - 1
    for j in range(rows):
        for i in range(cols):
            d = 1 - px[i, j] / 255
            d = min(1, max(0, 0.5 + (d - 0.5) * CONTRAST))
            d = d ** GAMMA
            ch = RAMP[round(d * n)]
            if ch == " ":
                continue
            draw.text((i * CELL_W - 1, j * CELL_H - 2), ch, font=font, fill=INK + (255,))
    alpha = canvas.getchannel("A")
    fade = fade_mask(W, H, fades)
    from PIL import ImageChops
    canvas.putalpha(ImageChops.multiply(alpha, fade))
    OUT.mkdir(exist_ok=True)
    dest = OUT / f"{name}.png"
    canvas.quantize(colors=32, method=Image.Quantize.FASTOCTREE).save(dest, optimize=True)
    return dest


if __name__ == "__main__":
    names = sys.argv[1:] or list(PLATES)
    for n in names:
        d = plate(n)
        print(f"{d.relative_to(ROOT)}  {d.stat().st_size // 1024} KB")
