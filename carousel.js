#!/usr/bin/env node
/* Export carousel slides from a built page (one slide per `step` seconds of its timeline) to numbered full-size JPGs + a contact sheet.
   usage: node carousel.js <built.html> <outDir> <count> [--step 10] [--at 2.5] [--prefix slide] [--q 0.93] [--sheet 0.25]
   Slide k (0-based) is rendered at t = k*step + at. Output: <outDir>/<prefix>-01.jpg ... and <outDir>/sheet.png.
   Needs node_modules next to this file (or NM=...): three@0.128.0 @fontsource/kanit playwright. Uses the sandbox's preinstalled Chrome. */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const nm = process.env.NM || path.join(__dirname, 'node_modules');
const { chromium } = require(path.join(nm, 'playwright'));
const [html, outDir, count] = process.argv.slice(2);
const opt = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const step = +opt('--step', 10), at = +opt('--at', 2.5), prefix = opt('--prefix', 'slide'), q = +opt('--q', 0.93), sheet = +opt('--sheet', 0.25);
const fontDir = path.join(nm, '@fontsource/kanit/files');
const css = [400, 600, 800].map((w) =>
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + '-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}' +
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}').join('');
(async () => {
  if (!html || !outDir || !count) { console.error('usage: node carousel.js <built.html> <outDir> <count> [--step 10] [--at 2.5] [--prefix slide]'); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });
  const exe = ['/opt/google/chrome/chrome', '/opt/pw-browsers/chromium', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(fs.existsSync);
  const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 700, height: 1000 } });
  const errs = []; p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: css, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(fontDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html));
  await p.waitForFunction('window.__veReady===true', null, { timeout: 30000 }).catch(() => errs.push('not ready'));
  const files = [];
  for (let k = 0; k < +count; k++) {
    const d = await p.evaluate(([t, q]) => { window.__renderAt(t); return document.getElementById('cv').toDataURL('image/jpeg', q); }, [k * step + at, q]);
    const f = path.join(outDir, prefix + '-' + String(k + 1).padStart(2, '0') + '.jpg'); fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64')); files.push(f);
  }
  await b.close();
  const py = "import sys\nfrom PIL import Image\nout,sc=sys.argv[1],float(sys.argv[2]);fs=sys.argv[3:]\nims=[Image.open(f).convert('RGB') for f in fs];w,h=int(ims[0].width*sc),int(ims[0].height*sc)\ncols=min(len(ims),8);rows=(len(ims)+cols-1)//cols;S=Image.new('RGB',(w*cols,h*rows),(20,20,20))\nfor i,im in enumerate(ims):S.paste(im.resize((w,h)),((i%cols)*w,(i//cols)*h))\nS.save(out)";
  fs.writeFileSync(path.join(outDir, '_sheet.py'), py);
  execFileSync('python3', [path.join(outDir, '_sheet.py'), path.join(outDir, 'sheet.png'), String(sheet), ...files]);
  fs.unlinkSync(path.join(outDir, '_sheet.py'));
  console.log('slides', files.length, '->', outDir, '| sheet', path.join(outDir, 'sheet.png'));
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no console errors');
})();
