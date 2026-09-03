#!/usr/bin/env python3
"""
Turn a photograph of a treeline into the silhouette mask used behind the site.

    python3 tools/treeline.py assets/img/source-treeline.jpg

Writes assets/img/treeline.png — an alpha mask, opaque where the trees are and
transparent where the sky is. The site tints it with the current text colour,
so one file serves both light and dark mode.

The sky in a real photo is never evenly lit, so a single brightness cutoff
either loses the thin branches or floods the dark corners. Instead each pixel
is compared against a heavily blurred copy of the image — its local background
— which flattens the gradient before the cutoff is applied.
"""
import argparse
from PIL import Image, ImageFilter, ImageChops, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('source')
ap.add_argument('-o', '--out', default='assets/img/treeline.png')
ap.add_argument('-w', '--width', type=int, default=1800)
ap.add_argument('-t', '--threshold', type=float, default=0.86,
                help='0..1 — fraction of the local sky brightness below which a '
                     'pixel counts as tree. Raise to catch more haze, lower to '
                     'keep only the hard silhouettes (default 0.86)')
ap.add_argument('-c', '--crop', default='0,1',
                help='vertical slice of the photo to use, as top,bottom '
                     'fractions — e.g. 0,0.6 keeps the top 60%% (default 0,1)')
ap.add_argument('--flat', type=float, default=9.0,
                help='local-background blur radius, as a fraction of width '
                     '(1/N). 0 disables the flattening (default 9)')
ap.add_argument('--softness', type=float, default=1.0)
args = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(args.source)).convert('L')

top, bot = (float(v) for v in args.crop.split(','))
im = im.crop((0, int(top * im.height), im.width, int(bot * im.height)))

h = max(1, round(im.height * args.width / im.width))
im = im.resize((args.width, h), Image.LANCZOS)

if args.flat:
    bg = im.filter(ImageFilter.GaussianBlur(args.width / args.flat))
    px, bgpx = im.load(), bg.load()
    for y in range(im.height):
        for x in range(im.width):
            b = bgpx[x, y]
            px[x, y] = 255 if b == 0 else min(255, int(255.0 * px[x, y] / b))

cut = int(args.threshold * 255)
ramp = 24
alpha = im.point(lambda v: 255 if v <= cut - ramp else
                           0 if v >= cut + ramp else
                           int(255 * (cut + ramp - v) / (2 * ramp)))
if args.softness:
    alpha = alpha.filter(ImageFilter.GaussianBlur(args.softness))

# grayscale + alpha keeps the file about 40% smaller than RGBA, and the
# browser only reads the alpha channel anyway
Image.merge('LA', [Image.new('L', im.size, 0), alpha]).save(args.out, optimize=True)

cover = sum(alpha.getdata()) / (255.0 * im.size[0] * im.size[1])
print('wrote %s  %dx%d  %.0f%% coverage' % (args.out, im.size[0], im.size[1], 100 * cover))
