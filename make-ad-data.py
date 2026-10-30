#!/usr/bin/env python3
"""Turn an ad spec (texts + product screenshots with crop boxes) into the data file for photo-ad.js.
usage: python3 make-ad-data.py spec.json out.json
spec.imgs = {"key": {"file": "path/to/screenshot.jpg", "crop": [x0, y0, x1, y1]}}  (pixel box in the source; avoid app buttons, status bar, page counter and the seller's baked-in text)
Images are cropped, scaled to <=1000 px wide and embedded as base64 JPEG. Everything else in the spec is copied through unchanged."""
import base64, io, json, os, sys
from PIL import Image

if len(sys.argv) < 3: print(__doc__); sys.exit(1)
spec = json.load(open(sys.argv[1], encoding='utf-8'))
base = os.path.dirname(os.path.abspath(sys.argv[1]))
out = dict(spec); out['imgs'] = {}
for k, v in spec['imgs'].items():
    im = Image.open(os.path.join(base, v['file'])).convert('RGB')
    if v.get('crop'): im = im.crop(tuple(v['crop']))
    if im.width > 1000: im = im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=86)
    out['imgs'][k] = {'src': 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode(), 'w': im.width, 'h': im.height}
    print(k, im.size)
json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
print('wrote', sys.argv[2], os.path.getsize(sys.argv[2]) // 1024, 'KB')
