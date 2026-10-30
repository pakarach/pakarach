/* Report on-screen head overlaps and frame-edge cuts between chibi characters.
   usage: node overlap.js out.html t0 t1 step   (video.js must set  window.__dbg = { s, camera }  at the end of update)
   Characters = any object in state s (or one level down: s.fam.mom, s.kids[3]) with userData.head. Prints 'a/b ov=0.3' (overlap as a share of the smaller head) and 'CUT x'. */
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const [html, t0, t1, st] = process.argv.slice(2);
const nm = path.join(__dirname, 'node_modules'), fontDir = path.join(nm, '@fontsource/kanit/files');
const css = [400, 600, 800].map((w) => "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + "-normal.woff2)}").join('');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 700, height: 1000 } });
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: css, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(fontDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html)); await p.waitForFunction('window.__veReady===true', null, { timeout: 30000 });
  const out = await p.evaluate(([a, z, step]) => {
    const T = THREE, res = [];
    for (let t = a; t <= z + 1e-6; t += step) {
      window.__renderAt(t); const { s, camera } = window.__dbg;
      const C = {}, isChar = (o) => o && o.isObject3D && o.userData && o.userData.head;
      for (const k in s) { const v = s[k]; if (isChar(v)) C[k] = v; else if (v && typeof v === 'object' && !v.isObject3D) for (const j in v) if (isChar(v[j])) C[(Array.isArray(v) ? k : '') + j] = v[j]; }
      const vis = (o) => { for (let q = o; q; q = q.parent) if (!q.visible) return false; return true; };
      const right = new T.Vector3().setFromMatrixColumn(camera.matrixWorld, 0), heads = [];
      for (const k in C) {
        const g = C[k]; if (!g || !vis(g)) continue;
        const c = new T.Vector3(); g.userData.head.getWorldPosition(c); const r = 0.8 * 1.08 * g.scale.x;
        const pc = c.clone().project(camera), pr = c.clone().addScaledVector(right, r).project(camera);
        const X = (pc.x + 1) * 540, Y = (1 - pc.y) * 960, R = Math.abs(pr.x - pc.x) * 540;
        if (pc.z > 1 || X + R < 0 || X - R > 1080 || Y + R < 0 || Y - R > 1920) continue;
        heads.push({ k, X, Y, R, d: c.distanceTo(camera.position), cut: X - R < -R * 0.3 || X + R > 1080 + R * 0.3 });
      }
      for (let i = 0; i < heads.length; i++) for (let j = i + 1; j < heads.length; j++) {
        const A = heads[i], B = heads[j], d = Math.hypot(A.X - B.X, A.Y - B.Y), ov = (A.R + B.R - d) / Math.min(A.R, B.R);
        if (ov > 0.08) res.push(t.toFixed(1) + ' ' + A.k + '/' + B.k + ' ov=' + ov.toFixed(2));
      }
      for (const h of heads) if (h.cut) res.push(t.toFixed(1) + ' CUT ' + h.k);
    }
    return res;
  }, [+t0, +t1, +st]);
  await b.close();
  const agg = {}; for (const l of out) { const [t, ...rest] = l.split(' '); const key = rest.join(' ').replace(/ ov=.*/, ''); (agg[key] = agg[key] || []).push(t + (l.includes('ov=') ? ':' + l.split('ov=')[1] : '')); }
  for (const k in agg) console.log(k.padEnd(18), agg[k].length > 6 ? agg[k].slice(0, 3).join(' ') + ' ... ' + agg[k].slice(-2).join(' ') + ' (' + agg[k].length + ')' : agg[k].join(' '));
})();
