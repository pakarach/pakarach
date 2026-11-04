#!/usr/bin/env node
/* Screenshot presenter steps of a cinematic deck (kit-cine) in the sandbox: one PNG per chosen step + overflow check of the explanation panel.
   usage: node deck-shot.js <deck.html> <outDir> [filter]     filter: 'last' (default: last point of each panel + agenda/recap/final),
          'all' (every point), or a comma list of step indexes. Slow without a GPU (~6-10 s per step): run in batches with --from/--to.
   Options: --from N --to M (step-index range), --w 1300 (viewport width). */
const fs = require('fs'), path = require('path');
const nm = process.env.NM || path.join(__dirname, 'node_modules');
const { chromium } = (() => { try { return require(path.join(nm, 'playwright')); } catch (e) { return require('playwright'); } })();
const [html, outDir, filt0] = process.argv.slice(2), filt = filt0 && !filt0.startsWith('--') ? filt0 : 'last';
const opt = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? +process.argv[i + 1] : d; };
const from = opt('--from', 0), to = opt('--to', 1e9), vw = opt('--w', 1300);
const pd = path.join(nm, '@fontsource/ibm-plex-sans-thai/files'), kd = path.join(nm, '@fontsource/kanit/files');
const plexCss = [300, 400, 500].map((w) => "@font-face{font-family:'IBM Plex Sans Thai';font-weight:" + w + ';src:url(https://fonts.gstatic.com/plex/ibm-plex-sans-thai-thai-' + w + '-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}' + "@font-face{font-family:'IBM Plex Sans Thai';font-weight:" + w + ';src:url(https://fonts.gstatic.com/plex/ibm-plex-sans-thai-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+2000-206F,U+2190-21FF,U+2248}').join('');
const kCss = [400, 600, 800].map((w) => "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + '-normal.woff2);unicode-range:U+0E01-0E5B}' + "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+2000-206F}').join('');
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: vw, height: Math.round(vw * 0.7) } }); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: r.request().url().includes('Plex') ? plexCss : kCss, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/plex/**', (r) => r.fulfill({ path: path.join(pd, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(kd, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html)); await p.waitForFunction('window.__pv', null, { timeout: 30000 }); await p.waitForTimeout(500);
  await p.evaluate(() => { window.__PV_NOLOOP = true; }); // no continuous render loop in the sandbox
  const steps = await p.evaluate(() => __pv.S.map((s) => s.k + ':' + (s.b || s.ci || '') + (s.k === 'pt' ? ':' + s.pi + ':' + s.ii : '')));
  console.log(steps.length + ' steps');
  const pick = steps.map((s, i) => { if (i < from || i > to) return false; if (filt === 'all') return s.startsWith('pt') || /^(agenda|recap|verified)/.test(s);
    if (filt === 'last') { const pre = s.split(':').slice(0, 3).join(':'); return /^(agenda|recap|verified)/.test(s) || (s.startsWith('pt') && !(steps[i + 1] || '').startsWith(pre + ':')); }
    return filt.split(',').map(Number).includes(i); });
  for (let i = 0; i < steps.length; i++) {
    if (!pick[i]) continue;
    await p.evaluate((i) => __pv.go(i, { still: true }), i); await p.waitForTimeout(900);
    await p.evaluate(() => { if (window.__PV_FX) window.__PV_FX.t0 = performance.now() - 1600; __ve.renderFrame(__ve.S.t); }); await p.waitForTimeout(1300);
    const f = path.join(outDir, 's' + String(i).padStart(3, '0') + '.png');
    await p.screenshot({ path: f, clip: await (await p.$('.pv-wrap')).boundingBox(), timeout: 120000 });
    const of = await p.evaluate(() => { const box = document.querySelector('.pv-side.on .pv-in') || document.querySelector('.pv-full.on .pv-fin'); if (!box) return 'ok';
      const r = box.getBoundingClientRect(), bot = Math.max(...[...box.querySelectorAll('*')].filter((e) => e.getClientRects().length).map((e) => e.getBoundingClientRect().bottom)); return bot > r.bottom + 2 ? 'OVERFLOW ' + Math.round(bot - r.bottom) + 'px' : 'ok'; });
    console.log(i, steps[i], path.basename(f), of);
  }
  await b.close(); console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no console errors');
})();
