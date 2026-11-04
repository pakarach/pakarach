#!/usr/bin/env node
/* Render key frames of a built video to PNG + a contact sheet, in the cloud sandbox (no GPU).
   usage: node shot.js <built.html> <outDir> <t1,t2,...> [--scale 0.25] [--cols 4]
   Needs node_modules (one level up from this file's folder, or set NM): three@0.128.0 @fontsource/kanit @fontsource/ibm-plex-sans-thai playwright.
   Serves Kanit and IBM Plex Sans Thai locally (cinematic decks load Plex from Google Fonts).
   Uses a preinstalled Chrome via executablePath (the Playwright browser download is blocked in the sandbox). */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const nm = process.env.NM || path.join(__dirname, 'node_modules');
const { chromium } = (() => { try { return require(path.join(nm, 'playwright')); } catch (e) { return require('playwright'); } })();
const [html, outDir, ts] = process.argv.slice(2);
const opt = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const times = ts.split(',').map(Number), scale = +opt('--scale', 0.25), cols = +opt('--cols', 4);
const plexDir = path.join(nm, '@fontsource/ibm-plex-sans-thai/files'); const plexCss = [300,400,500].map((w)=>"@font-face{font-family:'IBM Plex Sans Thai';font-weight:"+w+';src:url(https://fonts.gstatic.com/plex/ibm-plex-sans-thai-thai-'+w+'-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}'+"@font-face{font-family:'IBM Plex Sans Thai';font-weight:"+w+';src:url(https://fonts.gstatic.com/plex/ibm-plex-sans-thai-latin-'+w+'-normal.woff2);unicode-range:U+0000-00FF,U+2000-206F}').join('');
const fontDir = path.join(nm, '@fontsource/kanit/files');
const css = [400, 600, 800].map((w) =>
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + '-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}' +
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}').join('');
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const exe = ['/opt/google/chrome/chrome', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(fs.existsSync);
  const b = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage({ viewport: { width: 700, height: 1000 } });
  const errs = []; p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: r.request().url().includes('Plex') ? plexCss : css, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(fontDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.route('https://fonts.gstatic.com/plex/**', (r) => r.fulfill({ path: path.join(plexDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html));
  await p.waitForFunction('window.__veReady===true', null, { timeout: 30000 }).catch(() => errs.push('not ready'));
  const files = [];
  for (const t of times) {
    const d = await p.evaluate((t) => { window.__renderAt(t); return document.getElementById('cv').toDataURL('image/png'); }, t);
    const f = path.join(outDir, 't' + String(t).replace('.', '_') + '.png'); fs.writeFileSync(f, Buffer.from(d.split(',')[1], 'base64')); files.push(f);
  }
  await b.close();
  const py = "import sys\nfrom PIL import Image\nout,sc,cols=sys.argv[1],float(sys.argv[2]),int(sys.argv[3]);fs=sys.argv[4:]\nims=[Image.open(f).convert('RGB') for f in fs];w,h=int(ims[0].width*sc),int(ims[0].height*sc)\nrows=(len(ims)+cols-1)//cols;S=Image.new('RGB',(w*cols,h*rows),(20,20,20))\nfor i,im in enumerate(ims):S.paste(im.resize((w,h)),((i%cols)*w,(i//cols)*h))\nS.save(out)";
  fs.writeFileSync(path.join(outDir, '_sheet.py'), py);
  execFileSync('python3', [path.join(outDir, '_sheet.py'), path.join(outDir, 'sheet.png'), String(scale), String(cols), ...files]);
  console.log('frames', files.length, 'sheet', path.join(outDir, 'sheet.png'));
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no console errors');
})();
