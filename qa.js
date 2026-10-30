#!/usr/bin/env node
/* qa.js — pixel-accurate composition check for a built family-channel video (kit-clay).
   usage: node qa.js out.html t0 t1 step [--res 0.25] [--dump t]
   video.js must set at the end of update():
     window.__dbg = { s:{ch:C}, camera, scene, renderer, P, kinds, caps }
   and hud() must fill window.__hudRects = [{kind:'panel'|'badge'|'label', name, x, y, w, h}] every frame.
   Items: each character head, each character body, each entry of P (arrays: one item per element).
   kinds[key] for P entries: 'pet' | 'prop' | 'germ' | 'fx' | 'bg' (default 'prop').
   Every frame it renders an ID buffer (each item one flat colour, everything else 'bg') plus one
   silhouette per item, then reports (worst share, time ranges):
     OCC   a<-b    a's silhouette hidden behind b (head>=2%, pet>=8%, prop>=12%, germ>=25%, body>=40%)
     TRANS a<-b    a translucent item in front of a (>=1%) — reads as a double image
     CAP   x       3D item under a caption line
     HUD   kind>x  2D overlay (panel/badge/label) on top of a 3D item; PEEK = item only partly under a panel
     CUT   x E     item touches the frame edge E (L/R/T/B)
     ZONE  x       face inside the TikTok UI zone (bottom 380 px, right 140 px of the lower half)
     TOUCH a~b     another object hugging a head outline (tangent, reads as merged)
     BEHIND x      background item (window, room prop, kinds 'bg') only partly hidden behind subjects
   Same character's parts never count; userData.heldBy='<char key>' on a prop skips prop vs that character's body. */
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const [html, t0, t1, st] = process.argv.slice(2);
const opt = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const RES = +opt('--res', 0.25), DUMP = opt('--dump', null);
const nm = path.join(__dirname, 'node_modules'), fontDir = path.join(nm, '@fontsource/kanit/files');
const css = [400, 600, 800].map((w) =>
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-thai-' + w + '-normal.woff2);unicode-range:U+0E01-0E5B,U+200C-200D,U+25CC}' +
  "@font-face{font-family:'Kanit';font-weight:" + w + ';src:url(https://fonts.gstatic.com/local/kanit-latin-' + w + '-normal.woff2);unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}').join('');

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 700, height: 1000 } });
  const errs = []; p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.route('**/three.min.js', (r) => r.fulfill({ path: path.join(nm, 'three/build/three.min.js'), contentType: 'application/javascript' }));
  await p.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: css, contentType: 'text/css' }));
  await p.route('https://fonts.gstatic.com/local/**', (r) => r.fulfill({ path: path.join(fontDir, r.request().url().split('/').pop()), contentType: 'font/woff2' }));
  await p.goto('file://' + path.resolve(html));
  await p.waitForFunction('window.__veReady===true', null, { timeout: 30000 });
  const out = await p.evaluate(([A0, A1, STEP, RES, DUMP]) => {
    const T = THREE, W = 1080, H = 1920, RW = Math.round(W * RES), RH = Math.round(H * RES), N = RW * RH, BG = 4000;
    const mats = new Map();
    const idMat = (id) => { let m = mats.get(id); if (!m) { m = new T.MeshBasicMaterial({ color: new T.Color((id & 255) / 255, ((id >> 8) + 16) / 255, 77 / 255), side: T.DoubleSide }); mats.set(id, m); } return m; };
    const dec = (r, g, b) => (b === 77 ? r + ((g - 16) << 8) : 0);
    const rt = new T.WebGLRenderTarget(RW, RH), px = new Uint8Array(N * 4), mc = document.createElement('canvas').getContext('2d');
    const visOf = (o) => { for (let q = o; q; q = q.parent) if (!q.visible) return false; return true; };
    const isShadow = (m) => m.geometry && m.geometry.type === 'CircleGeometry' && !Array.isArray(m.material) && m.material.transparent && m.material.depthWrite === false && !!m.material.map;
    const ws = new T.Vector3();
    const grab = (ren, scene, cam) => {
      ren.setRenderTarget(rt); ren.setClearColor(0x000000, 0); ren.clear(true, true, true); ren.render(scene, cam);
      ren.readRenderTargetPixels(rt, 0, 0, RW, RH, px); ren.setRenderTarget(null);
      const ids = new Int32Array(N);
      for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) { const i = ((RH - 1 - y) * RW + x) * 4; ids[y * RW + x] = dec(px[i], px[i + 1], px[i + 2]); }
      return ids;
    };
    const rep = [], TH = { head: 0.02, pet: 0.08, prop: 0.12, germ: 0.25, body: 0.4 };
    let dump = null;
    for (let k = 0; ; k++) {
      const t = +(A0 + k * STEP).toFixed(4); if (t > A1 + 1e-6) break;
      window.__renderAt(t);
      const D = window.__dbg, scene = D.scene, cam = D.camera, ren = D.renderer, kinds = D.kinds || {};
      scene.updateMatrixWorld(true);
      const R = (type, key, r) => rep.push([t, type, key, r]);
      if (![cam.position.x, cam.position.y, cam.position.z].every(isFinite)) R('NAN', 'camera', 1);
      const items = [null], own = new Map();
      const add = (name, kind, root, owner) => {
        if (!root || !root.isObject3D || !visOf(root)) return;
        if (![root.position.x, root.position.y, root.position.z].every(isFinite)) R('NAN', name, 1);
        const it = { id: items.length, name, kind, owner: owner || null, heldBy: (root.userData && root.userData.heldBy) || null, meshes: [], trans: false };
        root.traverse((o) => {
          if (!o.isMesh || own.has(o) || !visOf(o) || isShadow(o)) return;
          it.meshes.push(o); own.set(o, it.id);
          const mt = o.material;
          if (!owner && !Array.isArray(mt) && mt.transparent && mt.opacity < 0.9 && !mt.map) {
            if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
            o.getWorldScale(ws); if (o.geometry.boundingSphere.radius * Math.max(ws.x, ws.y, ws.z) > 0.2) it.trans = true;
          }
        });
        if (it.meshes.length) items.push(it);
      };
      const chars = {}, scan = (obj) => { for (const kk in obj) { const v = obj[kk]; if (v && v.isObject3D && v.userData && v.userData.head) chars[kk] = v; } };
      scan(D.s); for (const kk in D.s) { const v = D.s[kk]; if (v && typeof v === 'object' && !v.isObject3D) scan(v); }
      for (const kk in chars) { add(kk + '.head', 'head', chars[kk].userData.head, kk); add(kk + '.body', 'body', chars[kk], kk); }
      for (const kk in D.P || {}) { const v = D.P[kk]; if (Array.isArray(v)) v.forEach((e, i) => add('P.' + kk + '[' + i + ']', kinds[kk] || 'prop', e, null)); else add('P.' + kk, kinds[kk] || 'prop', v, null); }
      const all = []; scene.traverse((o) => { if (o.isMesh) all.push(o); });
      const saved = all.map((o) => [o, o.material, o.visible]);
      for (const o of all) if (!own.has(o) && visOf(o) && !isShadow(o)) own.set(o, BG);
      for (const o of all) { const id = own.get(o); if (id === undefined) o.visible = false; else o.material = idMat(id); }
      const comb = grab(ren, scene, cam), masks = [];
      for (const it of items.slice(1)) {
        for (const o of all) { const id = own.get(o); if (id !== undefined) o.visible = id === it.id; }
        const ids = grab(ren, scene, cam), m = []; for (let i = 0; i < N; i++) if (ids[i] === it.id) m.push(i); masks[it.id] = m;
      }
      for (const [o, mt, v] of saved) { o.material = mt; o.visible = v; }
      if (DUMP != null && Math.abs(t - DUMP) < 1e-6) dump = { RW, RH, comb: Array.from(comb), names: items.map((i) => i && i.name) };
      const visCnt = new Map(); for (let i = 0; i < N; i++) { const c = comb[i]; if (c > 0 && c !== BG) visCnt.set(c, (visCnt.get(c) || 0) + 1); }
      for (const it of items.slice(1)) {
        const m = masks[it.id], F = m.length; if (F < 8) continue;
        if (it.kind === 'bg') {
          let hid = 0; for (const i of m) { const c = comb[i]; if (c !== it.id && c !== 0 && c !== BG) hid++; }
          const r = hid / F; if (r > 0.03 && r < 0.97) R('BEHIND', it.name + ' peeks behind subjects', r);
        }
        if (it.kind === 'head') { // TOUCH: another object hugging the head outline (tangent, reads as merged)
          const RR = Math.max(2, Math.round(16 * RES)), msk = new Uint8Array(N), ring = new Uint8Array(N);
          for (const i of m) msk[i] = 1;
          for (const i of m) { const x = i % RW, y = (i / RW) | 0; for (let dy = -RR; dy <= RR; dy++) { const yy = y + dy; if (yy < 0 || yy >= RH) continue; for (let dx = -RR; dx <= RR; dx++) { const xx = x + dx; if (xx < 0 || xx >= RW) continue; const j = yy * RW + xx; if (!msk[j]) ring[j] = 1; } } }
          const tc = new Map(); let rn = 0;
          for (let j = 0; j < N; j++) if (ring[j]) { rn++; const c = comb[j]; if (c > 0 && c !== BG) tc.set(c, (tc.get(c) || 0) + 1); }
          for (const [c, n] of tc) { const o = items[c]; if (o.owner === it.owner || o.kind === 'body') continue; if (n / rn > 0.04) R('TOUCH', it.name + '~' + o.name, n / rn); }
        }
        if (it.kind !== 'bg' && it.kind !== 'fx') {
          const occ = new Map(); for (const i of m) { const c = comb[i]; if (c !== it.id && c !== 0) occ.set(c, (occ.get(c) || 0) + 1); }
          for (const [c, n] of occ) {
            const o = c === BG ? { name: 'bg', kind: 'bg', owner: null } : items[c];
            if (it.owner && o.owner === it.owner) continue;
            if (it.kind === 'body' && o.heldBy && o.heldBy === it.owner) continue;
            if (it.heldBy && o.owner === it.heldBy) continue;
            const r = n / F;
            if (o.trans && r >= 0.01) R('TRANS', it.name + '<-' + o.name, r);
            else if (r >= (TH[it.kind] || 0.12)) R('OCC', it.name + '<-' + o.name, r);
          }
          let e = '';
          for (const i of m) { const x = i % RW, y = (i / RW) | 0; if (x === 0) e = 'L'; else if (x === RW - 1) e = 'R'; else if (y === 0) e = 'T'; else if (y === RH - 1) e = 'B'; if (e) break; }
          if (e) R('CUT', it.name + ' ' + e, 1);
          if (it.kind === 'head') { let z = 0; for (const i of m) { const x = (i % RW) / RES, y = ((i / RW) | 0) / RES; if (y > 1540 || (x > 940 && y > 900)) z++; } if (z / F > 0.1) R('ZONE', it.name, z / F); }
        }
      }
      const rects = [];
      for (const c of D.caps || []) {
        if (t < c.t0 || t >= c.t1) continue;
        let y = c.y, prev = 0;
        for (const line of c.lines) {
          const size0 = line[0], segs = line.slice(1).map((s) => ({ t: typeof s[0] === 'function' ? s[0](t) : s[0], w: s[2] || 800 }));
          if (prev) y += (prev + size0) / 2 * 1.34;
          const meas = (sz) => segs.reduce((acc, s) => { mc.font = s.w + ' ' + sz + 'px Kanit,sans-serif'; return acc + mc.measureText(s.t).width; }, 0);
          let size = size0, tw = meas(size); if (tw > W - 160) { size = size0 * (W - 160) / tw; tw = W - 160; }
          rects.push({ kind: 'cap', name: segs.map((s) => s.t).join('').slice(0, 14), x: W / 2 - tw / 2 - size * 0.1, y: y - size * 0.8, w: tw + size * 0.2, h: size * 1.45 });
          prev = size0;
        }
        if (c.foot) rects.push({ kind: 'cap', name: 'foot', x: 140, y: y + prev * 0.7 + 8, w: W - 280, h: 36 });
      }
      for (const r of window.__hudRects || []) rects.push(r);
      for (const r of rects) {
        const x0 = Math.max(0, Math.floor(r.x * RES)), x1 = Math.min(RW - 1, Math.ceil((r.x + r.w) * RES)), y0 = Math.max(0, Math.floor(r.y * RES)), y1 = Math.min(RH - 1, Math.ceil((r.y + r.h) * RES));
        if (x1 < x0 || y1 < y0) continue;
        const cnt = new Map(), area = (x1 - x0 + 1) * (y1 - y0 + 1);
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = comb[y * RW + x]; if (c > 0 && c !== BG) cnt.set(c, (cnt.get(c) || 0) + 1); }
        for (const [c, n] of cnt) {
          const it = items[c];
          if (r.kind === 'cap') { if (n >= 6) R('CAP', '"' + r.name + '">' + it.name, n / area); }
          else if (r.kind === 'panel') { const V = visCnt.get(c) || n; R(n / V > 0.98 ? 'HUD' : 'PEEK', 'panel>' + it.name, n / V); }
          else if (n / area > 0.03) R('HUD', r.kind + ':' + (r.name || '') + '>' + it.name, n / area);
        }
      }
    }
    return { rep, dump };
  }, [+t0, +t1, +st, RES, DUMP == null ? null : +DUMP]);
  await b.close();
  if (out.dump) {
    const { RW, RH, comb, names } = out.dump, img = Buffer.alloc(RW * RH * 3), pal = (c) => (c === 4000 ? [70, 70, 70] : c ? [(c * 97) % 256, (c * 57 + 80) % 256, (c * 151 + 40) % 256] : [0, 0, 0]);
    comb.forEach((c, i) => { const [r, g, bb] = pal(c); img[i * 3] = r; img[i * 3 + 1] = g; img[i * 3 + 2] = bb; });
    fs.writeFileSync('qa-dump.ppm', Buffer.concat([Buffer.from('P6\n' + RW + ' ' + RH + '\n255\n'), img]));
    console.log('dump qa-dump.ppm', names.map((n, i) => i + ':' + n).join(' '));
  }
  const agg = new Map();
  for (const [t, ty, k, r] of out.rep) { const key = ty + ' ' + k; const a = agg.get(key) || { ts: [], max: 0 }; a.ts.push(t); a.max = Math.max(a.max, r); agg.set(key, a); }
  const S = +st, ranges = (ts) => { const out = []; let a = ts[0], z = ts[0]; for (const t of ts.slice(1)) { if (t - z <= S * 1.5) z = t; else { out.push(a === z ? a.toFixed(2) : a.toFixed(2) + '-' + z.toFixed(2)); a = z = t; } } out.push(a === z ? a.toFixed(2) : a.toFixed(2) + '-' + z.toFixed(2)); return out.join(' '); };
  const rows = [...agg].sort((x, y) => x[1].ts[0] - y[1].ts[0]);
  for (const [k, a] of rows) console.log(k.padEnd(46), ('max ' + a.max.toFixed(2)).padEnd(9), ranges(a.ts));
  console.log(rows.length ? rows.length + ' issue keys' : 'CLEAN');
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no page errors');
})();
