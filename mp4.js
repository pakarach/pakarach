#!/usr/bin/env node
/* Render a built video to MP4 (H.264 + AAC, 1080x1920, every frame rendered, no dropped frames). CPU only, ~1.2 s per frame.
   usage: node mp4.js <built.html> <out.mp4> [--fps 30]
   Long: run in the background and poll:  nohup node mp4.js out.html out.mp4 > mp4.log 2>&1 &   then  tail -1 mp4.log
   Resumable: frames already in <out>.frames/ are skipped if the script is re-run. Needs ffmpeg, playwright, three, @fontsource/kanit. */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process'), { chromium } = require('playwright');
const [html, outMp4] = process.argv.slice(2);
const opt = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const fps = +opt('--fps', 30), fdir = outMp4 + '.frames', wav = outMp4 + '.audio.webm';
const nm = path.join(__dirname, '..', 'node_modules'), fontDir = path.join(nm, '@fontsource/kanit/files');
const css = [400, 600, 800].map((w) => "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + "-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+2000-206F}').join('');
const exe = ['/opt/google/chrome/chrome', '/opt/pw-browsers/chromium'].find(fs.existsSync);
const args = ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'];
async function open(b) {
  const ctx = await b.newContext({ acceptDownloads: true, viewport: { width: 700, height: 1000 } }), p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: css, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(fontDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html)); await p.waitForFunction('window.__veReady===true', null, { timeout: 30000 });
  if (errs.length) throw new Error(errs.join('\n')); return p;
}
(async () => {
  fs.mkdirSync(fdir, { recursive: true });
  const b = await chromium.launch({ executablePath: exe, args });
  let p = await open(b); const DUR = await p.evaluate(() => window.__ve.DUR), n = Math.round(DUR * fps);
  const f = (i) => path.join(fdir, String(i).padStart(5, '0') + '.jpg');
  for (let i = 0; i < n; i++) {
    if (fs.existsSync(f(i)) && fs.existsSync(f(i + 1))) continue;
    const d = await p.evaluate((t) => { window.__renderAt(t); return document.getElementById('cv').toDataURL('image/jpeg', 0.93); }, i / fps);
    fs.writeFileSync(f(i), Buffer.from(d.split(',')[1], 'base64'));
    if (i % 30 === 0) console.log('frame', i, '/', n);
  }
  console.log('frames done; capturing audio in real time (' + DUR + 's)');
  if (!fs.existsSync(wav)) { p = await open(b); const dl = p.waitForEvent('download', { timeout: (DUR + 120) * 1000 }); await p.click('#ex'); await (await dl).saveAs(wav); }
  await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(fps), '-i', path.join(fdir, '%05d.jpg'), '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k', '-t', String(DUR), '-movflags', '+faststart', outMp4]);
  console.log('DONE', outMp4, fs.statSync(outMp4).size, 'bytes');
})().catch((e) => { console.error('FAILED', e.message); process.exit(1); });
