"""
Amosanders FC - make the website photos small so they load fast on phones.

HOW TO USE (Windows / Mac / Linux)
  1. Install Python from python.org (tick "Add Python to PATH" on Windows).
  2. Open a terminal (Command Prompt) and run once:   pip install pillow
  3. Put this file in your website folder (the one that contains the "images" folder).
  4. Run:   python optimize_images.py --dry     (only shows what would change)
     then:  python optimize_images.py           (does it)

WHAT IT DOES
  * Looks at every .jpg / .jpeg / .png inside the "images" folder (videos are ignored).
  * Photos wider or taller than 1600 px are shrunk to 1600 px (plenty for phones and laptops).
  * JPG photos are re-saved at quality 80 (looks the same, usually 5-10x smaller).
  * PNG files (logos, kits) keep their transparency and their names; they are only
    touched if they are bigger than 500 KB.
  * File names never change, so the website needs no edits.
  * Before changing anything, the original is copied to the "images_original" folder,
    so you can always put it back.
"""
import sys
import shutil
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install pillow")

MAX_SIDE = 1600          # longest side in pixels
JPG_QUALITY = 80
PNG_MIN_BYTES = 500_000  # leave small PNGs alone
JPG_MIN_BYTES = 250_000  # leave small JPGs alone (unless they are very large in pixels)

root = Path(__file__).resolve().parent
src_dir = root / "images"
backup_dir = root / "images_original"
dry = "--dry" in sys.argv

if not src_dir.is_dir():
    sys.exit(f'Could not find the "images" folder next to this script ({src_dir}).')

before_total = after_total = changed = 0

for path in sorted(src_dir.rglob("*")):
    if not path.is_file():
        continue
    ext = path.suffix.lower()
    if ext not in (".jpg", ".jpeg", ".png"):
        continue
    size = path.stat().st_size
    try:
        with Image.open(path) as im:
            im.load()
            w, h = im.size
            is_png = ext == ".png"
            too_big_px = max(w, h) > MAX_SIDE
            too_big_kb = size > (PNG_MIN_BYTES if is_png else JPG_MIN_BYTES)
            if not (too_big_px or too_big_kb):
                continue

            img = ImageOps.exif_transpose(im)          # keep phone photos the right way up
            if too_big_px:
                img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)

            tmp = path.with_name(path.name + ".tmp")
            if is_png:
                img.save(tmp, format="PNG", optimize=True)
            else:
                if img.mode not in ("RGB", "L"):
                    img = img.convert("RGB")
                img.save(tmp, format="JPEG", quality=JPG_QUALITY, optimize=True, progressive=True)
    except Exception as e:                              # a damaged file should not stop the rest
        print(f"SKIPPED {path.relative_to(root)}  ({e})")
        continue

    new_size = tmp.stat().st_size
    if new_size >= size:                                # never make a file bigger
        tmp.unlink()
        continue

    rel = path.relative_to(root)
    print(f"{rel}: {size/1024:.0f} KB -> {new_size/1024:.0f} KB")
    before_total += size
    after_total += new_size
    changed += 1

    if dry:
        tmp.unlink()
        continue

    backup = backup_dir / path.relative_to(src_dir)
    backup.parent.mkdir(parents=True, exist_ok=True)
    if not backup.exists():
        shutil.copy2(path, backup)
    tmp.replace(path)

print()
if changed == 0:
    print("Nothing needed shrinking. Your photos are already small.")
else:
    verb = "would change" if dry else "changed"
    print(f"{verb} {changed} file(s): {before_total/1e6:.1f} MB -> {after_total/1e6:.1f} MB "
          f"(saves {(before_total-after_total)/1e6:.1f} MB)")
    if dry:
        print("This was only a preview. Run again without --dry to apply it.")
    else:
        print('Originals are saved in the "images_original" folder.')
