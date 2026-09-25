#!/usr/bin/env python3
"""Compose hero lens overlay: rim past engraved text (SERIES 8 / ION-X / etc.)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "images/home/relogio_home.jpg"
OUT = ROOT / "images/home/relogio_home_lens.jpg"
LENS_SRC = Path("/tmp/lens-only.png")

# Calibrated against SERIES 8 crop: text ~r=450-520, rim must clear past letters
CX, CY = 800, 600
R_RIM = 635
R_OUT = 642


def main():
    base_img = Image.open(BASE).convert("RGBA")
    W, H = base_img.size
    diam = R_OUT * 2
    if LENS_SRC.exists():
        src = np.array(
            Image.open(LENS_SRC).convert("RGBA").resize((diam, diam), Image.LANCZOS)
        ).astype(np.float32)
    else:
        src = None

    yy, xx = np.ogrid[:diam, :diam]
    c = diam / 2 - 0.5
    dist = np.sqrt((xx - c) ** 2 + (yy - c) ** 2)
    inside = dist <= R_OUT
    rn = np.where(R_OUT > 0, dist / R_OUT, 0)

    arr = np.zeros((diam, diam, 4), dtype=np.float32)
    arr[inside, 0] = 145
    arr[inside, 1] = 42
    arr[inside, 2] = 48
    if src is not None:
        src_a = src[:, :, 3] / 255.0
        has_tex = (src_a > 0.12) & inside
        arr[has_tex, 0] = np.clip(src[has_tex, 0] * 0.65 + 45, 0, 255)
        arr[has_tex, 1] = np.clip(src[has_tex, 1] * 0.55 + 12, 0, 255)
        arr[has_tex, 2] = np.clip(src[has_tex, 2] * 0.55 + 14, 0, 255)

    alpha = np.zeros((diam, diam), dtype=np.float32)
    alpha[inside] = 72 + 40 * (rn[inside] ** 0.85)
    fade = np.clip((1.0 - rn) / 0.012, 0, 1)
    alpha *= fade
    arr[:, :, 3] = np.clip(alpha, 0, 130)

    lens_layer = Image.fromarray(arr.astype(np.uint8), "RGBA")
    out = base_img.copy()
    out.alpha_composite(lens_layer, dest=(int(CX - R_OUT), int(CY - R_OUT)))

    rim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(rim)
    for width, color in [
        (9, (230, 210, 200, 28)),
        (5, (245, 235, 225, 55)),
        (3, (255, 250, 245, 110)),
        (1, (255, 255, 255, 180)),
    ]:
        d.ellipse(
            [CX - R_RIM, CY - R_RIM, CX + R_RIM, CY + R_RIM],
            outline=color,
            width=width,
        )
    d.ellipse(
        [CX - (R_RIM - 4), CY - (R_RIM - 4), CX + (R_RIM - 4), CY + (R_RIM - 4)],
        outline=(50, 12, 20, 55),
        width=2,
    )
    d.ellipse(
        [CX - R_RIM - 1, CY - R_RIM - 1, CX + R_RIM + 1, CY + R_RIM + 1],
        outline=(150, 110, 190, 40),
        width=1,
    )
    rim = rim.filter(ImageFilter.GaussianBlur(radius=0.45))
    out = Image.alpha_composite(out, rim)
    out.convert("RGB").save(OUT, quality=92, optimize=True)
    print(f"wrote {OUT} R_RIM={R_RIM} R_OUT={R_OUT}")


if __name__ == "__main__":
    main()
