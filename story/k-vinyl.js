/* k-vinyl.js — movie-recap add-on for the story kit (รู้งี้สรุปหนัง), loaded after k-cast.js and before the film's -x.js cast file.
   vin(): kit-clay vinyl chibi adapted to the story kit (arms L/R, hands, face expressions via actor field ex).
   Generic props (vehicles, rooms, explosions, streaks, flyer) + set presets desert/room/village/roof + soft SFX puff/zip. Build with --kit fact,clay. */
/* vinyl cast (kit-clay CK.chibi) adapted to the story kit: arms L/R + hands, dummy body/lap, face expressions via a.ex */
const vin = (o) => { const c = CK.chibi(T, o), u = c.userData; u.vinyl = true; const L = u['arm-1'], R = u.arm1; L.userData.hand = u['hand-1']; R.userData.hand = u.hand1; u.arms = { L, R }; u.eyes = []; u.body = new T.Object3D(); u.lap = new T.Object3D(); return c; };
const AD = 1.25; // adult build (CK adult proportions start at scale 1.2)
const at3 = (m, x, y, z) => { m.position.set(x, y, z); return m; };
const glowM = (c, k) => M(c, { emissive: new T.Color(c), emissiveIntensity: k == null ? 0.9 : k });
const wheel = (r, w) => { const m = mk(new T.CylinderGeometry(r, r, w, 12), '#1e1e24'); m.rotation.z = Math.PI / 2; return m; };
CF.truck = (s, col) => { const g = new T.Group(), c = col || '#5a6440';
  g.add(at3(mk(new T.BoxGeometry(1.5, 0.8, 2.8), c), 0, 0.78, -0.2), at3(mk(new T.BoxGeometry(1.45, 0.72, 1.0), c), 0, 1.5, 0.7), at3(mk(new T.BoxGeometry(1.3, 0.36, 0.05), '#22303c'), 0, 1.6, 1.21));
  for (const sx of [-0.78, 0.78]) for (const sz of [-1.1, 0.9]) g.add(at3(wheel(0.38, 0.28), sx, 0.38, sz));
  for (const sx of [-0.5, 0.5]) g.add(at3(new T.Mesh(new T.SphereGeometry(0.1, 8, 6), basic('#fff2c0')), sx, 0.95, 1.22));
  g.scale.setScalar(s || 1); return g; };
CF.missile = (s) => { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.24, 0.24, 1.7, 12), '#a2a9b3'); b.rotation.z = Math.PI / 2; b.position.y = 0.26; g.add(b);
  const n = mk(new T.ConeGeometry(0.24, 0.55, 12), '#d0d4da'); n.rotation.z = -Math.PI / 2; n.position.set(1.12, 0.26, 0); g.add(n);
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2, f = mk(new T.BoxGeometry(0.34, 0.03, 0.26), '#6a7078'); f.position.set(-0.75, 0.26 + Math.sin(a) * 0.26, Math.cos(a) * 0.26); f.rotation.x = a; g.add(f); }
  const st = mk(new T.BoxGeometry(0.9, 0.2, 0.02), '#f2f2f2'); st.position.set(0.05, 0.3, 0.245); g.add(st);
  const lb = label('สตาร์ก', { px: 120, color: '#ffd94a', w: 1.3 }); lb.position.set(0.05, 0.95, 0.3); g.add(lb); g.userData.lb = lb;
  g.scale.setScalar(s || 1); return g; };
CF.crates = (s) => { const g = new T.Group(); for (const [x, y, z] of [[0, 0.35, 0], [0.75, 0.35, 0.05], [0.38, 1.05, 0], [-0.75, 0.35, 0.1]]) { g.add(at3(mk(new T.BoxGeometry(0.7, 0.7, 0.7), '#4a5232'), x, y, z)); g.add(at3(mk(new T.BoxGeometry(0.4, 0.14, 0.02), '#d8d0a0'), x, y + 0.05, z + 0.36)); } g.scale.setScalar(s || 1); return g; };
CF.tarp = (s, c) => { const g = new T.Group(); const pts = [[0.95, 0], [0.78, 0.6], [0.6, 1.25], [0.34, 1.8], [0.001, 1.95]].map((q) => new T.Vector2(q[0], q[1])); const m = mk(new T.LatheGeometry(pts, 9), c || '#7a7060', { flatShading: true }); g.add(m);
  for (let i = 0; i < 5; i++) { const r = mk(new T.BoxGeometry(0.06, 0.7, 0.4), '#5a5448'); const a = i * 1.26; r.position.set(Math.sin(a) * 0.72, 0.45, Math.cos(a) * 0.72); r.rotation.y = a; g.add(r); }
  g.scale.setScalar(s || 1); return g; };
CF.bench = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.4, 0.12, 0.9), c || '#5a4636'), 0, 0.9, 0)); for (const x of [-1.05, 1.05]) g.add(at3(mk(new T.BoxGeometry(0.12, 0.85, 0.8), '#3a2c22'), x, 0.43, 0));
  for (const [x, w] of [[-0.6, 0.3], [0.1, 0.5], [0.7, 0.24]]) g.add(at3(mk(new T.BoxGeometry(w, 0.1, 0.22), '#8a9098'), x, 1.01, 0.05)); g.scale.setScalar(s || 1); return g; };
CF.cot = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.0, 0.18, 2.2), '#6a6250'), 0, 0.35, 0)); for (const x of [-0.42, 0.42]) for (const z of [-0.95, 0.95]) g.add(at3(mk(new T.BoxGeometry(0.08, 0.3, 0.08), '#3a3430'), x, 0.15, z)); g.scale.setScalar(s || 1); return g; };
CF.battery = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.6, 0.42, 0.36), '#1e2228'), 0, 0.21, 0)); for (const x of [-0.16, 0.16]) g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 0.1, 8), x < 0 ? '#c03030' : '#303030'), x, 0.47, 0)); g.scale.setScalar(s || 1); return g; };
CF.case = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.7, 1.0, 0.7), '#2a3038'), 0, 0.5, 0)); const gl = new T.Mesh(new T.BoxGeometry(0.56, 0.56, 0.56), new T.MeshStandardMaterial({ color: '#cfe8ff', transparent: true, opacity: 0.25, roughness: 0.1 })); gl.position.y = 1.3; g.add(gl);
  const o = orb('rgba(140,220,255,1)'); o.position.y = 1.28; o.scale.setScalar(0.7); g.add(o); g.userData.orb = o; g.add(at3(mk(new T.BoxGeometry(0.4, 0.06, 0.02), P.gold, GOLDM), 0, 1.06, 0.29)); g.scale.setScalar(s || 1); return g; };
CF.podium = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.95, 1.05, 0.6), '#2e3a5a'), 0, 0.52, 0)); g.add(at3(mk(new T.BoxGeometry(0.5, 0.3, 0.02), '#cfd6e6'), 0, 0.7, 0.31)); const mic = mk(new T.CylinderGeometry(0.015, 0.015, 0.45, 6), '#111'); mic.position.set(0.12, 1.25, 0.1); mic.rotation.x = 0.4; g.add(mic); g.scale.setScalar(s || 1); return g; };
CF.paper = (s) => { const m = mk(new T.BoxGeometry(0.28, 0.02, 0.36), '#f4f0e6'); m.scale.setScalar(s || 1); return m; };
CF.burger = (s) => { const g = new T.Group(); g.add(at3(mk(new T.SphereGeometry(0.13, 10, 6, 0, 6.3, 0, 1.6), '#d8963c'), 0, 0.02, 0), at3(mk(new T.CylinderGeometry(0.14, 0.14, 0.05, 10), '#5a3216'), 0, 0, 0), at3(mk(new T.CylinderGeometry(0.13, 0.12, 0.05, 10), '#d8963c'), 0, -0.05, 0)); g.scale.setScalar(s || 1); return g; };
CF.car = (s, c) => { const g = new T.Group(), col = c || '#9a2a2a'; g.add(at3(mk(new T.BoxGeometry(1.5, 0.45, 3.0), col), 0, 0.45, 0), at3(mk(new T.BoxGeometry(1.25, 0.38, 1.3), '#1e2430'), 0, 0.86, -0.15)); for (const sx of [-0.76, 0.76]) for (const sz of [-0.95, 0.95]) g.add(at3(wheel(0.28, 0.2), sx, 0.28, sz)); g.scale.setScalar(s || 1); return g; };
CF.arm = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.3, 0.36, 0.3, 10), '#3a4250'), 0, 0.15, 0)); const a1 = new T.Group(); a1.position.y = 0.3; g.add(a1); a1.add(at3(mk(new T.BoxGeometry(0.16, 1.2, 0.16), '#d0d4dc'), 0, 0.6, 0));
  const a2 = new T.Group(); a2.position.y = 1.2; a1.add(a2); a2.add(at3(mk(new T.BoxGeometry(0.13, 0.9, 0.13), '#d0d4dc'), 0, 0.45, 0)); a2.add(at3(new T.Mesh(new T.SphereGeometry(0.08, 8, 6), basic('#7fd0ff')), 0, 0.95, 0)); g.userData.a1 = a1; g.userData.a2 = a2; g.scale.setScalar(s || 1); return g; };
CF.screens = (s, c) => { const g = new T.Group(); for (const [x, y, w] of [[-1.3, 1.9, 1.1], [0, 2.1, 1.4], [1.35, 1.85, 1.0]]) g.add(at3(new T.Mesh(new T.PlaneGeometry(w, 0.75), basic(c || '#4ab8ff', { transparent: true, opacity: 0.55, side: T.DoubleSide })), x, y, 0)); g.scale.setScalar(s || 1); return g; };
CF.monitor = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.1, 0.7, 0.06), '#15181e'), 0, 0.45, 0)); const sc = new T.Mesh(new T.PlaneGeometry(1.0, 0.6), basic('#6fc8ff')); sc.position.set(0, 0.45, 0.035); g.add(sc); g.add(at3(mk(new T.BoxGeometry(0.06, 0.2, 0.06), '#15181e'), 0, 0.05, 0)); g.userData.sc = sc; g.scale.setScalar(s || 1); return g; };
CF.desk = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.2, 0.1, 1.0), '#3a3f4a'), 0, 0.85, 0)); for (const x of [-1.0, 1.0]) g.add(at3(mk(new T.BoxGeometry(0.1, 0.8, 0.9), '#262a32'), x, 0.42, 0)); g.scale.setScalar(s || 1); return g; };
CF.jet = (s) => { const g = new T.Group(), c = '#8a929e'; const b = mk(new T.CylinderGeometry(0.22, 0.3, 3.0, 8), c); b.rotation.x = Math.PI / 2; g.add(b); const n = mk(new T.ConeGeometry(0.22, 0.9, 8), c); n.rotation.x = Math.PI / 2; n.position.z = 1.95; g.add(n);
  const w = mk(new T.BoxGeometry(2.8, 0.05, 1.0), '#7a828e'); w.position.z = -0.2; g.add(w); const tw = mk(new T.BoxGeometry(1.1, 0.05, 0.5), '#7a828e'); tw.position.z = -1.3; g.add(tw); const f = mk(new T.BoxGeometry(0.05, 0.6, 0.5), '#7a828e'); f.position.set(0, 0.3, -1.3); g.add(f);
  g.add(at3(mk(new T.SphereGeometry(0.16, 8, 6), '#1e2a3a'), 0, 0.18, 0.9)); const ex = softSprite('rgba(255,170,90,1)', 0.9); ex.scale.setScalar(0.9); ex.position.z = -1.65; g.add(ex); g.scale.setScalar(s || 1); return g; };
CF.heli = (s) => { const g = new T.Group(), c = '#4f5b3c'; const b = mk(new T.SphereGeometry(0.7, 10, 8), c); b.scale.set(1, 0.8, 1.5); g.add(b); const tl = mk(new T.CylinderGeometry(0.08, 0.16, 1.9, 6), c); tl.rotation.x = Math.PI / 2; tl.position.set(0, 0.15, -1.7); g.add(tl);
  const r = new T.Group(); r.position.y = 0.72; r.add(mk(new T.BoxGeometry(4.2, 0.03, 0.18), '#22262a'), mk(new T.BoxGeometry(0.18, 0.03, 4.2), '#22262a')); g.add(r); g.userData.rotor = r; g.add(at3(mk(new T.SphereGeometry(0.3, 8, 6), '#1e2a3a'), 0, 0.1, 0.75));
  const bm = beam('#fff6d0'); bm.scale.set(14, 7, 1); g.userData.beam = bm; g.scale.setScalar(s || 1); return g; };
CF.house = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.2, 1.7, 1.8), c || '#a88a62'), 0, 0.85, 0), at3(mk(new T.BoxGeometry(2.4, 0.14, 2.0), '#8a6e4c'), 0, 1.76, 0), at3(mk(new T.BoxGeometry(0.5, 0.9, 0.04), '#3a2a1c'), -0.5, 0.45, 0.91));
  g.add(at3(new T.Mesh(new T.PlaneGeometry(0.42, 0.36), basic('#ffc070')), 0.5, 1.05, 0.915)); g.scale.setScalar(s || 1); return g; };
CF.reactor = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(1.6, 1.7, 3.6, 18), '#2a303a'), 0, 1.8, 0)); const rings = []; for (const y of [0.9, 1.9, 2.9]) { const r = new T.Mesh(new T.CylinderGeometry(1.66, 1.66, 0.14, 18, 1, true), basic('#8fe0ff', { side: T.DoubleSide })); r.position.y = y; g.add(r); rings.push(r); }
  const top = softSprite('rgba(150,225,255,1)', 0.8); top.scale.setScalar(3.4); top.position.y = 3.8; g.add(top); g.userData.rings = rings; g.userData.top = top; g.scale.setScalar(s || 1); return g; };
CF.console = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.2, 0.9, 0.6), '#2a3038'), 0, 0.45, 0)); for (let i = 0; i < 4; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(0.16, 0.06, 0.16), basic(i === 2 ? '#ff4a4a' : '#7fe0ff')), -0.42 + i * 0.28, 0.93, 0)); g.scale.setScalar(s || 1); return g; };
CF.device = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.16, 0.24, 0.06), '#1e1e24'), 0, 0, 0)); const gl = softSprite('rgba(200,120,255,1)', 0.9); gl.scale.setScalar(0.6); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.boom = (s, c) => { const g = new T.Group(); const a = softSprite(c || 'rgba(255,140,50,1)', 0.95); a.scale.setScalar(3.2); const b = softSprite('rgba(255,240,200,1)', 1); b.scale.setScalar(1.6); const d = softSprite('rgba(255,80,30,1)', 0.6); d.scale.setScalar(4.6); g.add(d, a, b); g.scale.setScalar(s || 1); return g; };
CF.puff = (s) => { const g = new T.Group(); for (let i = 0; i < 5; i++) { const p = softSprite('rgba(120,110,100,1)', 0.55); p.scale.setScalar(1.4 + i * 0.3); p.position.set(Math.sin(i * 2.4) * 0.6, 0.5 + i * 0.35, Math.cos(i * 2.4) * 0.4); g.add(p); } g.scale.setScalar(s || 1); return g; };
CF.flash = (s) => { const g = softSprite('rgba(255,255,255,1)', 1); g.scale.setScalar(s || 0.8); return g; };
/* streak: a glowing comet; fly(o, path, u) places it and its trail along path(u) (world points) */
CF.streak = (s, c) => { const g = new T.Group(), col = c || 'rgba(170,220,255,1)'; const a = softSprite(col, 0.95); a.scale.setScalar(1.8); const b = softSprite('rgba(255,255,255,1)', 1); b.scale.setScalar(0.75); g.add(a, b); const tr = [];
  for (let i = 0; i < 7; i++) { const q = softSprite(col, 0.55 - i * 0.07); q.scale.setScalar(1.3 - i * 0.12); g.add(q); tr.push(q); } g.userData.trail = tr; g.scale.setScalar(s || 1); return g; };
/* flyer: a cast member (CF name) flying arms-forward with a light trail; no thrusters, no armour */
CF.flyer = (s, who) => { const g = new T.Group(), b = CF[who || 'hero'](1); b.rotation.x = Math.PI / 2; b.position.z = -0.95; const a = b.userData.arms; a.L.rotation.set(-Math.PI * 0.94, 0, -0.18); a.R.rotation.set(-Math.PI * 0.94, 0, 0.18); g.add(b);
  const tr = []; for (let i = 0; i < 8; i++) { const q = softSprite('rgba(170,220,255,1)', 0.5 - i * 0.05); q.scale.setScalar(0.9 - i * 0.07); g.add(q); tr.push(q); } g.userData.trail = tr; g.userData.flyer = true; g.scale.setScalar(s || 1); return g; };
function fly(o, path, u, step) { const p = path(u); o.position.copy(p); if (o.userData.flyer) { const n = path(u + 0.03); if (n.distanceToSquared(p) > 1e-6) o.lookAt(n); else o.rotation.set(0, 0, 0); }
  o.updateMatrixWorld(true); o.userData.trail.forEach((q, i) => { const v = path(u - (i + 1) * (step || 0.012)); if (o.userData.flyer) v.add(new T.Vector3().subVectors(p, path(u + 0.03)).setLength(0.9)); q.position.copy(o.worldToLocal(v)); }); }

/* set presets */
const decor = (st, list) => list.map(([o, x, y, z, ry]) => { place(o, st, x, y || 0, z); if (ry) o.rotation.y = ry; return o; });
Object.assign(ENVB, {
  desert(st, o) { const out = [terrain(st, '#d9b276', '#a8773e', { hill: 4.5, seed: o.seed || 11, flat: 12 }), ranges(st, [[36, '#b88a52', 5, 10, 12, 2.6], [48, '#9a6a44', 8, 14, 9, 2.8]], { seed: (o.seed || 11) + 1 })];
    for (let i = 0; i < 8; i++) out.push(...decor(st, [[CF.stone(0.6 + (i % 3) * 0.3), -8 + i * 2.3, 0, -3 - (i % 2) * 3]])); return out; },
  room(st, o) { const out = []; const fl = mk(new T.BoxGeometry(16, 0.2, 13), o.floor || '#2a3348'); place(fl, st, 0, -0.1, -1); out.push(fl); const wall = mk(new T.BoxGeometry(16, 7, 0.4), o.wall || '#1e2a48'); place(wall, st, 0, 3.4, -6.5); out.push(wall);
    for (const sx of [-1, 1]) { const sw = mk(new T.BoxGeometry(0.4, 7, 12), o.side || o.wall || '#1e2a48'); place(sw, st, sx * 8, 3.4, -1); out.push(sw); }
    if (o.banner) { const b = new T.Mesh(new T.PlaneGeometry(6, 1.6), basic(o.banner)); place(b, st, 0, 3.6, -6.28); out.push(b); }
    if (o.lamps) for (const x of o.lamps) { const lp = softSprite(o.lampC || 'rgba(255,230,190,1)', 0.7); lp.scale.setScalar(2.4); place(lp, st, x, 5.6, -5); out.push(lp); }
    if (o.city) { for (let i = 0; i < 18; i++) { const h = 1.2 + ((i * 37) % 7) * 0.5; const b = new T.Mesh(new T.PlaneGeometry(0.7, h), basic(['#ffb060', '#6fb7ff', '#ffe0a8'][i % 3], { transparent: true, opacity: 0.35 })); place(b, st, -7 + i * 0.82, 1.4 + h / 2, -6.25); out.push(b); } }
    if (o.rocks) { let rs = 13; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 22; i++) { const r = mk(new T.DodecahedronGeometry(0.8 + rnd() * 0.9, 0), i % 2 ? '#4a3c32' : '#3e322a', { flatShading: true }); const side = i % 3; place(r, st, side === 0 ? -7.4 + rnd() : side === 1 ? 7.4 - rnd() : -7 + rnd() * 14, side === 2 ? 5.5 + rnd() * 1.5 : 0.5 + rnd() * 5, side === 2 ? -6.1 : -6 + rnd() * 9); out.push(r); } }
    return out; },
  village(st, o) { const out = [terrain(st, '#c9a26a', '#8a6a42', { hill: 4, seed: 33, flat: 12 }), ranges(st, [[36, '#7a5a4a', 6, 12, 12, 2.6]], { seed: 34 })];
    out.push(...decor(st, [[CF.house(1, '#a88a62'), -3.6, 0, -3.2, 0.1], [CF.house(1.1, '#b0926a'), 0.2, 0, -4.2], [CF.house(0.95, '#9a7c58'), 3.9, 0, -3.0, -0.15], [CF.house(0.9, '#a08060'), -6.5, 0, -1.2, 0.5]])); return out; },
  roof(st, o) { const out = []; const fl = mk(new T.BoxGeometry(18, 0.4, 13), '#262a32'); place(fl, st, 0, -0.2, -1); out.push(fl);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const sk = new T.Mesh(new T.BoxGeometry(1.7, 0.06, 1.2), basic('#8fdcff', { transparent: true, opacity: 0.6 })); place(sk, st, -5.2 + i * 1.9, 0.03, 1.6 + j * 1.4); out.push(sk); }
    let rs = 21; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 40; i++) { const b = softSprite(['rgba(255,190,110,1)', 'rgba(120,180,255,1)', 'rgba(255,230,170,1)'][i % 3], 0.35 + rnd() * 0.3); b.scale.setScalar(0.6 + rnd() * 1.2); place(b, st, -30 + rnd() * 60, -3 + rnd() * 4, -18 - rnd() * 20); out.push(b); }
    return out; },
});
VE.registerSfx('puff', (tt) => { VE.audio.noise(tt, 0.7, { f: 500, vol: 0.06 }); VE.audio.tone(tt, 120, 0.6, { type: 'sine', f2: 60, vol: 0.05, rel: 0.5 }); });
VE.registerSfx('zip', (tt) => VE.audio.noise(tt, 0.45, { type: 'bandpass', f: 500, f2: 2400, q: 0.8, vol: 0.05 }));

/* ---- added for Forrest Gump (Nov 2026): everyday props + presets, reusable ---- */
const srnd = (seed) => { let rs = seed || 7; return () => ((rs = (rs * 16807) % 2147483647) / 2147483647); };
CF.busstop = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 8), '#8a9098'), 0, 1.3, 0)); g.add(at3(mk(new T.BoxGeometry(0.72, 0.5, 0.06), '#2a6ab0'), 0, 2.45, 0));
  const lb = label('BUS', { px: 110, color: '#ffffff', w: 0.6 }); lb.position.set(0, 2.45, 0.06); g.add(lb); g.scale.setScalar(s || 1); return g; };
CF.pbench = (s, c) => { const g = new T.Group(), w = c || '#7a5a3a'; g.add(at3(mk(new T.BoxGeometry(3.6, 0.1, 0.7), w), 0, 0.5, 0), at3(mk(new T.BoxGeometry(3.6, 0.45, 0.08), w), 0, 0.95, -0.33));
  for (const x of [-1.65, 1.65]) g.add(at3(mk(new T.BoxGeometry(0.1, 0.5, 0.6), '#2a2a2e'), x, 0.25, 0)); g.scale.setScalar(s || 1); return g; };
CF.bike = (s, c) => { const g = new T.Group(), fc = c || '#d04a3a'; for (const z of [-0.5, 0.5]) { const w = mk(new T.TorusGeometry(0.3, 0.05, 6, 18), '#1e1e24'); w.rotation.y = Math.PI / 2; w.position.set(0, 0.33, z); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.07, 0.07, 1.0), fc), 0, 0.58, 0), at3(mk(new T.BoxGeometry(0.07, 0.42, 0.07), fc), 0, 0.42, -0.1), at3(mk(new T.BoxGeometry(0.22, 0.06, 0.3), '#1e1e24'), 0, 0.66, -0.15), at3(mk(new T.BoxGeometry(0.6, 0.05, 0.05), '#c0c4cc'), 0, 0.86, 0.45), at3(mk(new T.BoxGeometry(0.06, 0.32, 0.06), fc), 0, 0.7, 0.45));
  g.scale.setScalar(s || 1); return g; };
CF.sbus = (s, c) => { const g = new T.Group(), y = c || '#f2b81e'; g.add(at3(mk(new T.BoxGeometry(1.7, 1.5, 4.6), y), 0, 1.05, -0.3), at3(mk(new T.BoxGeometry(1.6, 0.75, 1.0), y), 0, 0.68, 2.45), at3(mk(new T.BoxGeometry(1.72, 0.1, 4.62), '#1e1e24'), 0, 0.72, -0.3));
  for (const sx of [-0.86, 0.86]) for (let i = 0; i < 5; i++) { const w = new T.Mesh(new T.PlaneGeometry(0.62, 0.48), basic('#2a3a4a')); w.position.set(sx * 1.003, 1.42, -2.2 + i * 0.85); w.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2; g.add(w); }
  const ws = new T.Mesh(new T.PlaneGeometry(1.5, 0.6), basic('#2a3a4a')); ws.position.set(0, 1.42, 1.96); g.add(ws);
  for (const sx of [-0.8, 0.8]) for (const sz of [-1.8, 1.9]) g.add(at3(wheel(0.36, 0.26), sx, 0.36, sz)); for (const sx of [-0.5, 0.5]) g.add(at3(new T.Mesh(new T.SphereGeometry(0.1, 8, 6), basic('#fff2c0')), sx, 0.8, 2.96));
  g.scale.setScalar(s || 1); return g; };
CF.goal = (s) => { const g = new T.Group(), c = '#f2d24a'; g.add(at3(mk(new T.CylinderGeometry(0.08, 0.08, 1.6, 8), c), 0, 0.8, 0)); const cb = mk(new T.CylinderGeometry(0.07, 0.07, 2.6, 8), c); cb.rotation.z = Math.PI / 2; cb.position.y = 1.6; g.add(cb);
  for (const x of [-1.3, 1.3]) g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 2.6, 8), c), x, 2.9, 0)); g.scale.setScalar(s || 1); return g; };
CF.rain = (s) => { const g = new T.Group(), m = basic('#d8e8ff', { transparent: true, opacity: 0.5 }), rnd = srnd(5); for (let i = 0; i < 180; i++) { const d = new T.Mesh(new T.BoxGeometry(0.025, 0.55, 0.025), m); d.position.set((rnd() - 0.5) * 18, rnd() * 9, (rnd() - 0.5) * 12 - 1); g.add(d); } g.userData.rain = true; g.scale.setScalar(s || 1); return g; };
const rainTick = (o, t) => { if (!o) return; o.children.forEach((d, i) => { d.position.y = 9 - ((t * 13 + i * 3.1) % 9); }); };
CF.pingpong = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.5, 0.06, 2.7), '#2a6a4a'), 0, 0.76, 0)); const ln = new T.Mesh(new T.PlaneGeometry(0.03, 2.7), basic('#ffffff')); ln.rotation.x = -Math.PI / 2; ln.position.y = 0.795; g.add(ln);
  g.add(at3(mk(new T.BoxGeometry(1.62, 0.16, 0.02), '#f4f4f4'), 0, 0.87, 0)); for (const x of [-0.65, 0.65]) for (const z of [-1.2, 1.2]) g.add(at3(mk(new T.BoxGeometry(0.06, 0.74, 0.06), '#2a2a2e'), x, 0.37, z)); g.scale.setScalar(s || 1); return g; };
CF.ball = (s, c) => { const m = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), basic(c || '#ffffff')); m.scale.setScalar(s || 1); return m; };
CF.paddle = (s) => { const g = new T.Group(), h = mk(new T.CylinderGeometry(0.17, 0.17, 0.03, 16), '#c0302a'); h.rotation.x = Math.PI / 2; h.position.y = 0.2; g.add(h, at3(mk(new T.BoxGeometry(0.05, 0.18, 0.03), '#8a5a3a'), 0, 0.02, 0)); g.scale.setScalar(s || 1); return g; };
CF.sboat = (s, c) => { const g = new T.Group(), hc = c || '#f2f0ea'; g.add(at3(mk(new T.BoxGeometry(1.8, 0.8, 4.2), hc), 0, 0.4, 0), at3(mk(new T.BoxGeometry(1.84, 0.14, 4.24), '#2a6ab0'), 0, 0.65, 0), at3(mk(new T.BoxGeometry(1.2, 0.9, 1.0), '#f8f6f0'), 0, 1.25, 1.55), at3(mk(new T.BoxGeometry(1.0, 0.3, 0.05), '#2a3a4a'), 0, 1.45, 2.06));
  const bw = mk(new T.CylinderGeometry(0.02, 0.92, 1.0, 4), hc); bw.rotation.x = Math.PI / 2; bw.rotation.y = Math.PI / 4; bw.scale.set(1, 1, 0.42); bw.position.set(0, 0.4, 2.6); g.add(bw);
  g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 3, 8), '#6a6a70'), 0, 2.2, 0.75)); const nets = [];
  for (const sx of [-1, 1]) { const b = mk(new T.CylinderGeometry(0.04, 0.04, 2.6, 6), '#6a6a70'); b.position.set(sx * 1.1, 2.3, 0.75); b.rotation.z = sx * -0.95; g.add(b); const n = mk(new T.SphereGeometry(0.3, 10, 8), '#c8cfb4', { flatShading: true }); n.scale.set(1, 1.4, 1); n.position.set(sx * 2.05, 2.15, 0.75); g.add(n); nets.push(n); }
  g.userData.nets = nets; g.scale.setScalar(s || 1); return g; };
CF.wchair = (s) => { const g = new T.Group(); for (const sx of [-0.48, 0.48]) { const w = mk(new T.TorusGeometry(0.42, 0.05, 6, 20), '#2a2a2e'); w.rotation.y = Math.PI / 2; w.position.set(sx, 0.45, -0.05); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.85, 0.08, 0.7), '#3a3a40'), 0, 0.55, 0), at3(mk(new T.BoxGeometry(0.85, 0.75, 0.08), '#3a3a40'), 0, 0.95, -0.36)); const bl = mk(new T.BoxGeometry(0.95, 0.3, 0.75), '#8a3a3a'); bl.position.set(0, 0.68, 0.22); g.add(bl); g.userData.blanket = bl; g.scale.setScalar(s || 1); return g; };
CF.choc = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.52, 0.08, 0.38), '#f2e6c8'), 0, 0.04, 0)); for (let i = 0; i < 6; i++) g.add(at3(mk(new T.SphereGeometry(0.06, 8, 6), '#5a3220'), -0.16 + (i % 3) * 0.16, 0.1, -0.08 + Math.floor(i / 3) * 0.16)); g.scale.setScalar(s || 1); return g; };
CF.medal = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.12, 0.22, 0.02), '#2a5ab0'), 0, 0.15, 0)); const d = mk(new T.CylinderGeometry(0.11, 0.11, 0.03, 14), P.gold, GOLDM); d.rotation.x = Math.PI / 2; g.add(d); const gl = softSprite('rgba(255,220,120,1)', 0.6); gl.scale.setScalar(0.55); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.shrimp = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.42, 0.34, 0.26, 14), '#a8814e'), 0, 0.13, 0)); const rnd = srnd(31); for (let i = 0; i < 9; i++) { const sh = new T.Group(); const b1 = mk(new T.SphereGeometry(0.08, 8, 6), '#ff8a5a'); b1.scale.set(1.6, 0.8, 0.8); const b2 = mk(new T.SphereGeometry(0.06, 8, 6), '#ff9a6a'); b2.position.set(0.12, -0.04, 0); sh.add(b1, b2); sh.position.set((rnd() - 0.5) * 0.55, 0.3 + rnd() * 0.12, (rnd() - 0.5) * 0.5); sh.rotation.y = rnd() * 6.3; g.add(sh); } g.scale.setScalar(s || 1); return g; };
CF.trash = (s) => { const g = new T.Group(); [['#6a7a8a', 0], ['#8a6a4a', 1], ['#5a8a5a', 2], ['#9a9aa0', 3]].forEach(([c, i]) => g.add(at3(mk(new T.BoxGeometry(0.2 + i * 0.04, 0.12, 0.16), c), (i - 1.5) * 0.22, 0.06 + (i % 2) * 0.08, (i % 2) * 0.1))); const tire = mk(new T.TorusGeometry(0.16, 0.06, 6, 12), '#1e1e24'); tire.rotation.x = Math.PI / 2; tire.position.set(0.1, 0.2, -0.1); g.add(tire); g.scale.setScalar(s || 1); return g; };
CF.cake = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.4, 0.4, 0.3, 16), '#f8f2ea'), 0, 0.15, 0), at3(mk(new T.CylinderGeometry(0.28, 0.28, 0.24, 16), '#f8f2ea'), 0, 0.42, 0)); for (let i = 0; i < 8; i++) g.add(at3(new T.Mesh(new T.SphereGeometry(0.04, 6, 4), basic('#ff9ab8')), Math.sin(i * 0.785) * 0.38, 0.3, Math.cos(i * 0.785) * 0.38)); g.scale.setScalar(s || 1); return g; };
CF.arch = (s) => { const g = new T.Group(), c = '#f6f2ea'; for (const x of [-1.2, 1.2]) g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 2.4, 8), c), x, 1.2, 0)); const a = mk(new T.TorusGeometry(1.2, 0.07, 6, 20, Math.PI), c); a.position.y = 2.4; g.add(a);
  for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.11, 6, 4), basic(['#ffffff', '#ffb0c8', '#ffe08a'][i % 3])); const k = i / 9 * Math.PI; f.position.set(Math.cos(k) * 1.2, 2.4 + Math.sin(k) * 1.2, 0.05); g.add(f); } g.scale.setScalar(s || 1); return g; };
CF.mailbox = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.08, 1.0, 0.08), '#5a4a3a'), 0, 0.5, 0)); const b = mk(new T.CylinderGeometry(0.18, 0.18, 0.5, 12, 1, false, 0, Math.PI), '#4a6aa0'); b.rotation.z = Math.PI / 2; b.rotation.y = Math.PI / 2; b.position.set(0, 1.0, 0); g.add(b, at3(mk(new T.BoxGeometry(0.36, 0.06, 0.5), '#4a6aa0'), 0, 1.0, 0), at3(mk(new T.BoxGeometry(0.03, 0.2, 0.08), '#d04a3a'), 0.19, 1.15, 0.1)); g.scale.setScalar(s || 1); return g; };
/* leg braces for a figure (kid build): silver side bars + rings; c.userData.braces; burst pieces CF.bits + burstTick */
const braces = (c) => { const g = new T.Group(), m = '#e6eaf2'; for (const s of [-1, 1]) { g.add(at3(mk(new T.BoxGeometry(0.05, 0.5, 0.05), m), s * 0.37, 0.22, 0.05)); g.add(at3(mk(new T.BoxGeometry(0.05, 0.42, 0.05), m), s * 0.06, 0.18, 0.17));
  for (const y of [0.06, 0.24]) { const r = mk(new T.TorusGeometry(0.17, 0.03, 6, 14), m); r.rotation.x = Math.PI / 2; r.position.set(s * 0.19, y, 0.05); g.add(r); } } c.add(g); c.userData.braces = g; return c; };
CF.bits = (s) => { const g = new T.Group(), rnd = srnd(19); for (let i = 0; i < 14; i++) { const b = mk(new T.BoxGeometry(0.05, 0.22 + rnd() * 0.15, 0.05), '#e6eaf2'); b.userData.v = [(rnd() - 0.5) * 3.2, 1.6 + rnd() * 2.2, (rnd() - 0.2) * 2.4, rnd() * 9]; g.add(b); } g.scale.setScalar(s || 1); return g; };
const burstTick = (o, u) => { const k = Math.max(0, u); o.children.forEach((b) => { const v = b.userData.v; b.position.set(v[0] * k, Math.max(0.03, 0.3 + v[1] * k - 4.9 * k * k), v[2] * k); b.rotation.set(v[3] * k, v[3] * k * 0.7, 0); }); };
Object.assign(ENVB, {
  town(st, o) { const out = [terrain(st, o.g1 || '#7aa84e', o.g2 || '#4f7a3a', { hill: 4, seed: o.seed || 81, flat: 14 }), ranges(st, [[38, '#5a8a6a', 5, 10, 12, 2.6]], { seed: (o.seed || 81) + 1 })];
    if (o.road !== false) { const rd = mk(new T.BoxGeometry(70, 0.06, 2.6), '#6a6a70'); place(rd, st, 0, 0.03, o.road != null ? o.road : 2.6); out.push(rd); }
    if (o.house !== false) { const hx = o.hx != null ? o.hx : -2.6; out.push(...decor(st, [[CF.house(1.7, '#f2eee4'), hx, 0, -5.2], [CF.house(1.0, '#c8b49a'), hx + 9, 0, -6.2, -0.2], [CF.house(0.9, '#b8c8d8'), hx - 8, 0, -6.0, 0.3]])); }
    const rnd = srnd(o.seed || 83); for (let i = 0; i < (o.trees || 10); i++) { const x = -14 + i * 3.1 + rnd(), z = -3 - rnd() * 6; if (Math.abs(x - (o.hx != null ? o.hx : -2.6)) < 2.6) continue; const tr = tree(1.2 + rnd() * 0.8, ['#4f8f5a', '#3f7a4a', '#5f9a52'][i % 3]); place(tr, st, x, 0, z); out.push(tr); }
    return out; },
  stadium(st, o) { const out = []; const fl = mk(new T.BoxGeometry(44, 0.2, 30), '#4f9a4a'); place(fl, st, 0, -0.1, -4); out.push(fl);
    for (let i = -5; i <= 5; i++) { const ln = new T.Mesh(new T.PlaneGeometry(0.14, 22), basic('#f4f4f0')); ln.rotation.x = -Math.PI / 2; place(ln, st, i * 3.6, 0.02, -2); out.push(ln); }
    for (let r = 0; r < 4; r++) { const b = mk(new T.BoxGeometry(46, 0.8, 1.6), '#6a7080'); place(b, st, 0, 0.4 + r * 0.8, -14 - r * 1.6); out.push(b);
      for (let i = 0; i < 30; i++) { const p = new T.Mesh(new T.SphereGeometry(0.3, 8, 6), basic(['#e05a4a', '#f2c24a', '#4a8ad0', '#f4f4f4', '#8a5ab0'][(i * 7 + r * 3) % 5])); place(p, st, -21 + i * 1.45 + (r % 2) * 0.7, 1.15 + r * 0.8, -13.7 - r * 1.6); out.push(p); } }
    for (const x of [-19, 19]) { const gp = CF.goal(1.3); place(gp, st, x, 0, -2); gp.rotation.y = Math.PI / 2; out.push(gp); } return out; },
  highway(st, o) { const out = [terrain(st, o.g1 || '#c8a46a', o.g2 || '#9a7a4a', { hill: 4, seed: o.seed || 95, flat: 14 }), ranges(st, [[34, o.r1 || '#b07a52', 6, 12, 12, 2.6], [48, o.r2 || '#8a5a44', 10, 16, 9, 2.8]], { seed: (o.seed || 95) + 1 })];
    const rd = mk(new T.BoxGeometry(90, 0.06, 3.2), '#4a4a52'); place(rd, st, 0, 0.03, 0); out.push(rd); for (let i = 0; i < 24; i++) { const d = new T.Mesh(new T.PlaneGeometry(1.4, 0.14), basic('#f2d24a')); d.rotation.x = -Math.PI / 2; place(d, st, -44 + i * 4, 0.07, 0); out.push(d); }
    if (o.trees) { const rnd = srnd(97); for (let i = 0; i < o.trees; i++) { const tr = tree(1.1 + rnd(), '#4f7a42'); place(tr, st, -20 + i * 4 + rnd() * 2, 0, -4 - rnd() * 5); out.push(tr); } } return out; },
});
CF.wave = (s, c) => { const g = new T.Group(); const w = mk(new T.CylinderGeometry(3, 3, 30, 28, 1, false, 0, Math.PI), c || '#2a6aa8', { emissive: new T.Color('#123a6a'), emissiveIntensity: 0.3 }); w.rotation.z = Math.PI / 2; w.rotation.x = -Math.PI / 2; g.add(w);
  for (let i = 0; i < 26; i++) { const f = softSprite('rgba(240,250,255,1)', 0.8); f.scale.setScalar(1.6 + (i % 3) * 0.5); f.position.set(-14 + i * 1.12, 3.0, Math.sin(i * 1.7) * 0.4); g.add(f); } g.scale.setScalar(s || 1); return g; };

/* ---- added for Interstellar (Nov 2026): farm, space and sci-fi props + presets, reusable. Generic shapes only (no film ship/robot designs). ---- */
const glass = (c, op) => new T.MeshStandardMaterial({ color: c || '#dff2ff', transparent: true, opacity: op == null ? 0.2 : op, roughness: 0.05, metalness: 0.1, depthWrite: false });
/* bubble helmet for a vinyl figure (generic astronaut): c.userData.helm */
const helm = (c) => { const h = new T.Group(); const b = new T.Mesh(new T.SphereGeometry(0.98, 28, 20), glass('#dff2ff', 0.16)); b.position.y = 0.02; h.add(b); const ring = mk(new T.TorusGeometry(0.62, 0.08, 8, 24), '#d8dce4'); ring.rotation.x = Math.PI / 2; ring.position.y = -0.72; h.add(ring);
  c.userData.head.add(h); c.userData.helm = h; return c; };
CF.corn = (s, n, rows) => { const g = new T.Group(), rnd = srnd(41), stM = M('#6a9a3a', { flatShading: true }), lfM = M('#88b84a', { flatShading: true }), cbM = M('#f2c84a');
  for (let r = 0; r < (rows || 4); r++) for (let i = 0; i < (n || 14); i++) { const h = 1.5 + rnd() * 0.5, x = -((n || 14) - 1) * 0.35 + i * 0.7 + (rnd() - 0.5) * 0.2, z = -r * 0.8;
    const st = new T.Mesh(new T.CylinderGeometry(0.035, 0.05, h, 5), stM); st.position.set(x, h / 2, z); g.add(st);
    for (const sd of [-1, 1]) { const lf = new T.Mesh(new T.BoxGeometry(0.5, 0.03, 0.1), lfM); lf.position.set(x + sd * 0.2, h * (0.45 + rnd() * 0.3), z); lf.rotation.z = sd * 0.5; g.add(lf); }
    if (i % 2 === 0) { const cb = new T.Mesh(new T.CylinderGeometry(0.06, 0.05, 0.28, 6), cbM); cb.position.set(x + 0.08, h * 0.6, z + 0.04); cb.rotation.z = -0.3; g.add(cb); } }
  g.scale.setScalar(s || 1); return g; };
CF.drone = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.5, 0.18, 1.1), '#c8ccd4'), 0, 0, 0), at3(mk(new T.BoxGeometry(5.2, 0.05, 0.6), '#3a4a6a'), 0, 0.08, 0), at3(mk(new T.BoxGeometry(1.2, 0.04, 0.3), '#c8ccd4'), 0, 0.05, -0.75));
  for (let i = 0; i < 6; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(0.7, 0.012, 0.5), basic('#4a6aa8')), -2.1 + i * 0.84, 0.115, 0)); const l = softSprite('rgba(255,90,90,1)', 0.9); l.scale.setScalar(0.4); l.position.set(0, -0.12, 0.5); g.add(l); g.userData.blink = l; g.scale.setScalar(s || 1); return g; };
/* bookshelf with loose books (userData.books) that can drop */
CF.shelf = (s, c) => { const g = new T.Group(), w = c || '#8a6040'; g.add(at3(mk(new T.BoxGeometry(2.2, 3.2, 0.1), '#6a4630'), 0, 1.6, -0.25)); for (const x of [-1.1, 1.1]) g.add(at3(mk(new T.BoxGeometry(0.1, 3.2, 0.6), w), x, 1.6, 0));
  for (const y of [0.05, 1.0, 1.95, 2.9]) g.add(at3(mk(new T.BoxGeometry(2.2, 0.08, 0.6), w), 0, y, 0)); const books = [], rnd = srnd(53), cols = ['#c04a3a', '#3a6ab0', '#e0b030', '#4a8a5a', '#8a5ab0', '#e07a4a'];
  for (const y of [0.09, 1.04, 1.99]) for (let i = 0; i < 9; i++) { const h = 0.5 + rnd() * 0.3, b = mk(new T.BoxGeometry(0.17, h, 0.42), cols[(i + Math.round(y)) % 6]); b.position.set(-0.85 + i * 0.21, y + h / 2, 0.02); g.add(b); books.push(b); b.userData.p0 = b.position.clone(); }
  g.userData.books = books; g.scale.setScalar(s || 1); return g; };
/* drop book i of a shelf at time r (r0 start): slides out and falls to the floor in front */
const dropBook = (sh, i, r, r0) => { const b = sh.userData.books[i], k = U.clamp((r - r0) / 0.55); b.position.copy(b.userData.p0); if (k <= 0) { b.rotation.set(0, 0, 0); return; } b.position.z += 0.25 + k * 0.9; b.position.y = Math.max(0.12, b.userData.p0.y - 4.9 * k * k * 0.9); b.rotation.set(k * 1.5, 0, k * 0.4); };
/* dust stripes on a floor (userData.lines), revealed with dustTick(o, k) */
CF.dust = (s) => { const g = new T.Group(), m = basic('#c8a070', { transparent: true, opacity: 0.85 }); const lines = []; for (let i = 0; i < 11; i++) { const w = i % 3 === 1 ? 0.12 : 0.28; const b = new T.Mesh(new T.BoxGeometry(w, 0.02, 3.0), m); b.position.set(-2 + i * 0.4, 0.02, 0); g.add(b); lines.push(b); } g.userData.lines = lines; g.scale.setScalar(s || 1); return g; };
const dustTick = (o, k) => o.userData.lines.forEach((l, i) => { const q = U.clamp(k * 11 - i); l.scale.set(1, 1, Math.max(0.001, q)); l.visible = q > 0.01; });
CF.watch = (s) => { const g = new T.Group(); const c = mk(new T.CylinderGeometry(0.5, 0.5, 0.12, 28), P.gold, GOLDM); c.rotation.x = Math.PI / 2; g.add(c); const f = new T.Mesh(new T.CircleGeometry(0.43, 28), basic('#fbf6ea')); f.position.z = 0.065; g.add(f);
  for (let i = 0; i < 12; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.03, 0.08, 0.01), basic('#3a3030')); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * 0.36, Math.cos(a) * 0.36, 0.07); tk.rotation.z = -a; g.add(tk); }
  const hand = new T.Group(); hand.position.z = 0.075; const hm = new T.Mesh(new T.BoxGeometry(0.025, 0.36, 0.01), basic('#c03030')); hm.position.y = 0.16; hand.add(hm); g.add(hand); g.userData.hand = hand;
  for (const y of [0.75, -0.75]) g.add(at3(mk(new T.BoxGeometry(0.34, 0.6, 0.06), '#5a3a2a'), 0, y, -0.02)); g.scale.setScalar(s || 1); return g; };
CF.board = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(4.2, 2.4, 0.08), '#2a3a34'), 0, 2.3, 0), at3(mk(new T.BoxGeometry(4.4, 0.1, 0.2), '#7a5a3a'), 0, 1.08, 0.05)); const rnd = srnd(61), m = basic('#e8ece4');
  for (let i = 0; i < 22; i++) { const b = new T.Mesh(new T.BoxGeometry(0.25 + rnd() * 0.7, 0.04, 0.01), m); b.position.set(-1.7 + rnd() * 3.2, 1.4 + rnd() * 1.8, 0.05); b.rotation.z = (rnd() - 0.5) * 0.3; g.add(b); } g.scale.setScalar(s || 1); return g; };
/* paper fold: two halves, right half hinged at x=0 (userData.hinge: rotation.z 0 → ~π folds it over), dots A/B, pencil (userData.pencil) */
CF.fold = (s) => { const g = new T.Group(), pm = M('#f6f2e6', { side: T.DoubleSide }); g.add(at3(new T.Mesh(new T.BoxGeometry(1.4, 0.03, 1.2), pm), -0.7, 0, 0)); const h = new T.Group(); g.add(h); h.add(at3(new T.Mesh(new T.BoxGeometry(1.4, 0.03, 1.2), pm), 0.7, 0, 0));
  const dA = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.04, 14), basic('#e04a3a')); dA.position.set(-1.1, 0.02, 0); g.add(dA); const dB = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.04, 14), basic('#3a7ae0')); dB.position.set(1.1, 0.02, 0); h.add(dB);
  const p = new T.Group(); p.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 1.4, 8), '#f2c24a'), 0, 0, 0)); const tip = mk(new T.ConeGeometry(0.05, 0.16, 8), '#3a3030'); tip.rotation.x = Math.PI; tip.position.y = -0.78; p.add(tip); p.position.set(-1.1, 1.6, 0); g.add(p);
  g.userData.hinge = h; g.userData.pencil = p; g.scale.setScalar(s || 1); return g; };
CF.rocket = (s, c) => { const g = new T.Group(), w = c || '#f2f2f0'; g.add(at3(mk(new T.CylinderGeometry(0.55, 0.6, 6.0, 18), w), 0, 3.4, 0)); const n = mk(new T.ConeGeometry(0.55, 1.5, 18), w); n.position.y = 7.15; g.add(n);
  g.add(at3(mk(new T.CylinderGeometry(0.57, 0.57, 0.25, 18), '#2a2e38'), 0, 5.6, 0), at3(mk(new T.CylinderGeometry(0.57, 0.57, 0.18, 18), '#c04a3a'), 0, 1.6, 0));
  for (const sx of [-1, 1]) { g.add(at3(mk(new T.CylinderGeometry(0.28, 0.3, 3.6, 12), '#e6e6e2'), sx * 0.85, 2.0, 0)); const bn = mk(new T.ConeGeometry(0.28, 0.6, 12), '#e6e6e2'); bn.position.set(sx * 0.85, 4.1, 0); g.add(bn); }
  for (let i = 0; i < 4; i++) { const f = mk(new T.BoxGeometry(0.05, 0.9, 0.7), '#5a6070'); const a = i * Math.PI / 2 + Math.PI / 4; f.position.set(Math.sin(a) * 0.62, 0.75, Math.cos(a) * 0.62); f.rotation.y = a; g.add(f); }
  const fl = new T.Group(); const f1 = softSprite('rgba(255,170,70,1)', 1); f1.scale.set(2.2, 3.6, 1); f1.position.y = -1.2; const f2 = softSprite('rgba(255,250,220,1)', 1); f2.scale.set(1.0, 1.8, 1); f2.position.y = -0.5; fl.add(f1, f2); fl.position.y = 0.2; g.add(fl); g.userData.flame = fl;
  g.scale.setScalar(s || 1); return g; };
/* generic capsule spaceship (long body, side modules, solar panels, engine glow); NOT a ring ship */
CF.ship = (s) => { const g = new T.Group(), w = '#eceae4'; const b = mk(new T.CylinderGeometry(0.5, 0.5, 4.4, 16), w); b.rotation.z = Math.PI / 2; g.add(b); const nose = mk(new T.SphereGeometry(0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), w); nose.rotation.z = -Math.PI / 2; nose.position.x = 2.2; g.add(nose);
  g.add(at3(new T.Mesh(new T.BoxGeometry(0.3, 0.22, 0.02), basic('#2a3a5a')), 2.35, 0.18, 0.47)); for (const x of [-1.2, 0.2]) g.add(at3(mk(new T.BoxGeometry(0.9, 0.7, 1.3), '#c8ccd4'), x, 0, 0));
  for (const sz of [-1, 1]) { const pnl = mk(new T.BoxGeometry(1.2, 0.04, 2.2), '#2a4a8a'); pnl.position.set(-0.4, 0, sz * 1.9); g.add(pnl); for (let i = 0; i < 3; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(1.1, 0.045, 0.02), basic('#8ab0e0')), -0.4, 0, sz * (1.1 + i * 0.6))); g.add(at3(mk(new T.BoxGeometry(0.1, 0.1, 0.8), '#8a8e96'), -0.4, 0, sz * 0.75)); }
  const en = mk(new T.CylinderGeometry(0.42, 0.55, 0.5, 14), '#6a6e78'); en.rotation.z = Math.PI / 2; en.position.x = -2.45; g.add(en); const gl = softSprite('rgba(140,200,255,1)', 0.95); gl.scale.setScalar(1.4); gl.position.x = -2.9; g.add(gl); g.userData.glow = gl;
  g.scale.setScalar(s || 1); return g; };
/* small lander / shuttle (wedge body), nose +x */
CF.lander = (s, c) => { const g = new T.Group(), w = c || '#e6e4dc'; const b = mk(new T.BoxGeometry(2.0, 0.55, 1.1), w); g.add(b); const n = mk(new T.CylinderGeometry(0.02, 0.62, 0.9, 4), w); n.rotation.z = -Math.PI / 2; n.rotation.x = Math.PI / 4; n.scale.set(1, 1, 0.75); n.position.x = 1.42; g.add(n);
  g.add(at3(new T.Mesh(new T.BoxGeometry(0.5, 0.2, 0.9), basic('#22303c')), 0.95, 0.22, 0)); for (const sz of [-1, 1]) { const wg = mk(new T.BoxGeometry(1.0, 0.06, 0.7), '#b8bcc4'); wg.position.set(-0.4, -0.1, sz * 0.85); g.add(wg); }
  g.add(at3(mk(new T.BoxGeometry(0.2, 0.5, 0.8), '#8a8e96'), -1.05, 0, 0)); const gl = softSprite('rgba(140,200,255,1)', 0.9); gl.scale.setScalar(1.0); gl.position.x = -1.4; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
CF.wormhole = (s) => { const g = new T.Group(); const a = softSprite('rgba(150,180,255,1)', 0.9); a.scale.setScalar(5.2); const sp = new T.Mesh(new T.SphereGeometry(1.4, 32, 24), new T.MeshStandardMaterial({ color: '#9ab8ff', emissive: new T.Color('#3a4a9a'), emissiveIntensity: 0.6, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.6 }));
  const c = softSprite('rgba(255,255,255,1)', 0.8); c.scale.setScalar(1.6); g.add(a, sp, c); const rnd = srnd(71); for (let i = 0; i < 14; i++) { const st = softSprite('rgba(255,240,220,1)', 0.9); st.scale.setScalar(0.18); st.position.set((rnd() - 0.5) * 1.8, (rnd() - 0.5) * 1.8, 1.1); g.add(st); }
  g.userData.sp = sp; g.scale.setScalar(s || 1); return g; };
/* black hole: black sphere + flat glowing disk (no lensed arc) */
CF.bhole = (s) => { const g = new T.Group(); const gl = softSprite('rgba(255,180,90,1)', 0.7); gl.scale.setScalar(9); g.add(gl); g.add(new T.Mesh(new T.SphereGeometry(1.3, 32, 24), basic('#000000')));
  const d1 = new T.Mesh(new T.RingGeometry(1.6, 3.0, 48), basic('#ffd27a', { side: T.DoubleSide, transparent: true, opacity: 0.95 })); const d2 = new T.Mesh(new T.RingGeometry(3.0, 4.4, 48), basic('#ff8a3a', { side: T.DoubleSide, transparent: true, opacity: 0.6 }));
  const disk = new T.Group(); disk.add(d1, d2); disk.rotation.x = -Math.PI / 2 + 0.22; g.add(disk); g.userData.disk = disk; g.scale.setScalar(s || 1); return g; };
CF.planet = (s, c, ring) => { const g = new T.Group(); g.add(mk(new T.IcosahedronGeometry(1, 2), c || '#c8a46a', { flatShading: true })); if (ring) { const r = new T.Mesh(new T.RingGeometry(1.4, 2.2, 40), basic(ring, { side: T.DoubleSide, transparent: true, opacity: 0.75 })); r.rotation.x = -Math.PI / 2 + 0.35; g.add(r); } g.scale.setScalar(s || 1); return g; };
/* talking helper robot shown only as a glowing orb (no robot body design) */
CF.bot = (s) => { const g = orb('rgba(110,200,255,1)'); const ring = new T.Mesh(new T.TorusGeometry(0.3, 0.025, 6, 24), basic('#bfe8ff')); g.add(ring); g.userData.ring = ring; g.scale.setScalar(s || 1); return g; };
CF.cryo = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.2, 0.5, 2.6), '#b8c0cc'), 0, 0.25, 0)); const lid = new T.Group(); lid.position.set(-0.6, 0.5, 0); const gm = new T.Mesh(new T.CylinderGeometry(0.6, 0.6, 2.5, 16, 1, true, 0, Math.PI), glass('#cfeaff', 0.35)); gm.rotation.x = Math.PI / 2; gm.rotation.y = Math.PI / 2; gm.position.x = 0.6; lid.add(gm); g.add(lid);
  const fog = softSprite('rgba(220,240,255,1)', 0.6); fog.scale.set(2.2, 1.0, 1); fog.position.y = 0.8; g.add(fog); g.userData.lid = lid; g.userData.fog = fog; g.scale.setScalar(s || 1); return g; };
CF.tent = (s, c) => { const g = new T.Group(); const t = mk(new T.ConeGeometry(1.3, 1.6, 4), c || '#e07a3a', { flatShading: true }); t.position.y = 0.8; t.rotation.y = Math.PI / 4; g.add(t); g.add(at3(new T.Mesh(new T.PlaneGeometry(0.5, 0.7), basic('#3a2a20')), 0, 0.36, 0.66)); g.scale.setScalar(s || 1); return g; };
CF.wreck = (s) => { const g = new T.Group(), rnd = srnd(77); for (let i = 0; i < 7; i++) { const b = mk(new T.BoxGeometry(0.3 + rnd() * 0.9, 0.15 + rnd() * 0.4, 0.3 + rnd() * 0.8), ['#c8ccd4', '#8a8e96', '#6a6e78'][i % 3], { flatShading: true }); b.position.set((rnd() - 0.5) * 2.4, 0.1, (rnd() - 0.5) * 1.6); b.rotation.set(rnd(), rnd() * 3, rnd() * 0.5); g.add(b); }
  const bc = softSprite('rgba(255,90,90,1)', 0.9); bc.scale.setScalar(0.6); bc.position.set(0.3, 0.6, 0.2); g.add(bc); g.userData.beacon = bc; g.scale.setScalar(s || 1); return g; };
const bigWave = (o, k, x0, x1) => { o.scale.set(1, Math.max(0.05, k), 1); }; // grow a CF.wave in height
Object.assign(ENVB, {
  farm(st, o) { const out = [terrain(st, o.g1 || '#c8a86a', o.g2 || '#9a7a4a', { hill: 3, seed: o.seed || 101, flat: 16 }), ranges(st, [[40, '#a8885a', 3, 7, 12, 2.6]], { seed: 102 })];
    if (o.house !== false) out.push(...decor(st, [[CF.house(1.8, '#e8e0d0'), o.hx != null ? o.hx : -4.2, 0, -6.4]]));
    for (const [x, z, n, rows] of (o.corn || [[6.5, -3.4, 12, 5], [-12, -3.6, 8, 4], [0, -10.5, 30, 3]])) out.push(...decor(st, [[CF.corn(1, n, rows), x, 0, z]])); return out; },
  ocean(st, o) { const out = []; const fl = mk(new T.PlaneGeometry(120, 120), o.sand || '#8a7a5a'); fl.rotation.x = -Math.PI / 2; place(fl, st, 0, -0.12, -20); out.push(fl);
    const wt = new T.Mesh(new T.PlaneGeometry(120, 120), new T.MeshLambertMaterial({ color: o.water || '#2a6a9a', transparent: true, opacity: 0.75 })); wt.rotation.x = -Math.PI / 2; place(wt, st, 0, 0.06, -20); out.push(wt); return out; },
  ice(st, o) { const out = [terrain(st, '#dce6f0', '#a8bcd4', { hill: 6, seed: o.seed || 111, flat: 11 }), ranges(st, [[34, '#d8e4f0', 6, 12, 12, 2.6], [46, '#b0c4dc', 10, 18, 9, 2.8]], { seed: 112, snow: true })];
    const rnd = srnd(113); for (let i = 0; i < 7; i++) { const sl = mk(new T.BoxGeometry(5 + rnd() * 6, 0.5, 3 + rnd() * 3), '#f4f8fc', { flatShading: true }); place(sl, st, -20 + i * 7, 9 + rnd() * 4, -16 - rnd() * 10); sl.rotation.set(rnd() * 0.2, rnd(), 0); out.push(sl); }
    for (let i = 0; i < 6; i++) { const r = mk(new T.DodecahedronGeometry(0.6 + rnd() * 0.8, 0), '#cfe0f0', { flatShading: true }); place(r, st, -7 + i * 2.8, 0.2, -3 - rnd() * 3); out.push(r); } return out; },
  space(st, o) { const out = [], rnd = srnd(o.seed || 121); for (let i = 0; i < 70; i++) { const p = softSprite(['rgba(255,255,255,1)', 'rgba(190,210,255,1)', 'rgba(255,230,200,1)'][i % 3], 0.5 + rnd() * 0.5); p.scale.setScalar(0.15 + rnd() * 0.35); place(p, st, (rnd() - 0.5) * 70, -12 + rnd() * 40, -12 - rnd() * 30); out.push(p); }
    for (let i = 0; i < 3; i++) { const n = softSprite(['rgba(120,90,200,1)', 'rgba(70,120,200,1)', 'rgba(200,90,140,1)'][i], 0.25); n.scale.setScalar(26); place(n, st, -18 + i * 18, 6 + i * 3, -38); out.push(n); } return out; },
  tess(st, o) { const out = [], gm = basic('#ffcf86', { transparent: true, opacity: 0.55 }), gm2 = basic('#9ab8ff', { transparent: true, opacity: 0.35 });
    for (let i = -4; i <= 4; i++) for (let j = 0; j < 5; j++) { const b = new T.Mesh(new T.BoxGeometry(0.06, 0.06, 40), j % 2 ? gm2 : gm); place(b, st, i * 2.2, j * 2.0, -12); out.push(b); }
    for (let k = 0; k < 8; k++) for (let j = 0; j < 5; j++) { const b = new T.Mesh(new T.BoxGeometry(22, 0.05, 0.05), gm); place(b, st, 0, j * 2.0, -2 - k * 3.2); out.push(b); }
    for (let k = 0; k < 8; k++) for (let i = -4; i <= 4; i += 2) { const b = new T.Mesh(new T.BoxGeometry(0.05, 10, 0.05), gm2); place(b, st, i * 2.2, 4, -2 - k * 3.2); out.push(b); }
    for (let k = 1; k < 5; k++) for (const x of [-6.6, 6.6]) { const sh = CF.shelf(0.9); place(sh, st, x, 0, -2 - k * 4); sh.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2; out.push(sh); } return out; },
  /* inside a cylinder space station: ground curving up overhead */
  station(st, o) { const out = [terrain(st, '#7aa84e', '#5a8a3e', { hill: 0.6, seed: 131, flat: 30 })]; const cyl = new T.Mesh(new T.CylinderGeometry(42, 42, 160, 48, 1, true), new T.MeshLambertMaterial({ color: '#6a9a5a', side: T.BackSide }));
    cyl.rotation.z = Math.PI / 2; place(cyl, st, 0, 41.6, -10); out.push(cyl); const rnd = srnd(133);
    for (let i = 0; i < 26; i++) { const a = -0.55 + rnd() * 1.1 + (i % 2 ? Math.PI : 0) * 0, ang = 0.7 + rnd() * 1.9, h = CF.house(1.6 + rnd(), ['#e8e0d0', '#c8b49a', '#b8c8d8', '#d8a890'][i % 4]); const R = 41.4;
      h.position.set(ST[st][0] - 30 + i * 2.4, ST[st][1] + 41.6 - Math.cos(ang) * R, ST[st][2] - 10 - Math.sin(ang) * R); h.rotation.x = ang; out.push(h); }
    out.push(...decor(st, [[CF.house(1.6, '#e8e0d0'), -6, 0, -6], [CF.house(1.4, '#c8b49a'), 5.5, 0, -7]])); for (let i = 0; i < 6; i++) { const tr = tree(1.2 + rnd() * 0.6, '#4f8f5a'); place(tr, st, -9 + i * 3.6, 0, -9 - rnd() * 3); out.push(tr); } return out; },
});
/* big plain floor under a room set so a far camera never sees past the room's front edge */
ENVB.floor = (st, o) => { const f = mk(new T.PlaneGeometry(o.w || 80, o.d || 80), o.c || '#3a3e48'); f.rotation.x = -Math.PI / 2; place(f, st, 0, -0.04, 0); return [f]; };
/* calmer wave: smaller, fainter foam (CF.wave foam blobs blow out when the wave is near the camera) */
CF.wave2 = (s, c) => { const g = CF.wave(s, c); g.children.slice(1).forEach((f) => { f.scale.multiplyScalar(0.4); if (f.material) f.material.opacity = 0.55; }); return g; };
/* standing wall of water (a "mountain" that turns out to be a wave): userData.setH(h) sets its height */
CF.wavewall = (s, c) => { const g = new T.Group(); const geo = new T.BoxGeometry(70, 1, 3); geo.translate(0, 0.5, 0); const body = mk(geo, c || '#2a78b4', { emissive: new T.Color('#0e3a66'), emissiveIntensity: 0.25 }); g.add(body);
  const crest = new T.Group(); const lip = mk(new T.CylinderGeometry(1.6, 1.6, 70, 16, 1, false, 0, Math.PI), c || '#3a8ac8'); lip.rotation.z = Math.PI / 2; crest.add(lip);
  const foam = mk(new T.BoxGeometry(70, 0.35, 1.2), '#eef6ff'); foam.position.set(0, 1.5, 0.6); crest.add(foam); g.add(crest);
  g.userData.setH = (h) => { body.scale.y = Math.max(0.01, h); crest.position.y = h - 0.2; }; g.userData.setH(4); g.scale.setScalar(s || 1); return g; };
/* ---- added for John Wick 1-4 (Nov 2026): animals, action props, street/stairs/dock presets + room extras, reusable ---- */
/* dog: o = { c body, w chest/muzzle, e ears, saddle (back patch), m muzzle, prick (pointed ears), collar, vest } ; userData.legs (walk), tail (wag) */
CF.dog = (s, o) => { o = o || {}; const g = new T.Group(), c = o.c || '#c8894a', w = o.w || '#f4efe6', e = o.e || '#7a4a2a';
  const body = mk(new T.SphereGeometry(0.42, 14, 10), c); body.scale.set(0.8, 0.72, 1.3); body.position.y = 0.62; g.add(body);
  if (o.saddle) { const sd = mk(new T.SphereGeometry(0.43, 14, 10, 0, 6.3, 0, 1.15), o.saddle); sd.scale.set(0.82, 0.74, 1.12); sd.position.set(0, 0.64, -0.06); g.add(sd); }
  if (o.vest) { const v = mk(new T.CylinderGeometry(0.36, 0.36, 0.5, 12, 1, true, 0, Math.PI * 1.2), o.vest); v.rotation.x = Math.PI / 2; v.rotation.y = Math.PI; v.rotation.z = -Math.PI * 0.6 + Math.PI; v.position.set(0, 0.66, 0); v.scale.set(1, 1, 1); g.add(v); }
  const ch = mk(new T.SphereGeometry(0.28, 10, 8), w); ch.scale.set(0.9, 1, 0.8); ch.position.set(0, 0.56, 0.34); g.add(ch);
  const hg = new T.Group(); hg.position.set(0, 1.0, 0.52); g.add(hg);
  hg.add(mk(new T.SphereGeometry(0.34, 14, 10), c)); const mz = mk(new T.SphereGeometry(0.18, 10, 8), o.m || w); mz.scale.set(1, 0.8, 1.15); mz.position.set(0, -0.09, 0.27); hg.add(mz);
  hg.add(at3(mk(new T.SphereGeometry(0.065, 8, 6), '#1e1a1a'), 0, -0.03, 0.47));
  for (const sx of [-1, 1]) { const ey = mk(new T.SphereGeometry(0.06, 8, 6), '#1a1414'); ey.position.set(sx * 0.13, 0.08, 0.28); hg.add(ey); hg.add(at3(new T.Mesh(new T.SphereGeometry(0.02, 6, 4), basic('#ffffff')), sx * 0.13 + 0.02, 0.11, 0.335));
    if (o.prick) { const ea = mk(new T.ConeGeometry(0.11, 0.28, 6), e); ea.position.set(sx * 0.19, 0.33, -0.02); ea.rotation.z = -sx * 0.25; hg.add(ea); }
    else { const ea = mk(new T.SphereGeometry(0.15, 10, 8), e); ea.scale.set(0.45, 1.25, 0.9); ea.position.set(sx * 0.31, -0.05, -0.02); ea.rotation.z = sx * 0.25; hg.add(ea); } }
  if (o.collar) { const cl = mk(new T.TorusGeometry(0.22, 0.04, 6, 16), o.collar); cl.rotation.x = Math.PI / 2 - 0.5; cl.position.set(0, 0.8, 0.42); g.add(cl); }
  const legs = []; for (const sx of [-0.19, 0.19]) for (const sz of [-0.3, 0.3]) { const lg = new T.Group(); lg.position.set(sx, 0.48, sz); const m = mk(new T.CylinderGeometry(0.075, 0.07, 0.48, 8), c); m.position.y = -0.24; lg.add(m); lg.add(at3(mk(new T.SphereGeometry(0.085, 8, 6), w), 0, -0.47, 0.02)); g.add(lg); legs.push(lg); }
  const tl = new T.Group(); tl.position.set(0, 0.78, -0.5); const tm = mk(new T.CylinderGeometry(0.035, 0.06, 0.42, 6), c); tm.position.set(0, 0.17, -0.08); tm.rotation.x = -0.45; tl.add(tm); g.add(tl);
  g.userData.legs = legs; g.userData.tail = tl; g.userData.dogHead = hg; g.scale.setScalar(s || 1); return g; };
/* horse: saddle top at y ~1.75 (scale 1); rider: on ['horse','x',0,dy,0] */
CF.horse = (s, c, mane) => { const g = new T.Group(), col = c || '#7a4a2a', mn = mane || '#2a1a12';
  const b = mk(new T.SphereGeometry(0.6, 14, 10), col); b.scale.set(0.8, 0.75, 1.55); b.position.y = 1.35; g.add(b);
  const nk = mk(new T.CylinderGeometry(0.22, 0.32, 0.9, 10), col); nk.position.set(0, 1.85, 0.75); nk.rotation.x = 0.6; g.add(nk);
  const hd = mk(new T.BoxGeometry(0.32, 0.34, 0.7), col); hd.position.set(0, 2.2, 1.12); hd.rotation.x = 0.35; g.add(hd);
  for (const sx of [-1, 1]) { g.add(at3(mk(new T.SphereGeometry(0.05, 6, 4), '#141010'), sx * 0.17, 2.3, 1.18)); const ea = mk(new T.ConeGeometry(0.06, 0.2, 5), col); ea.position.set(sx * 0.1, 2.45, 0.86); g.add(ea); }
  const mm = mk(new T.BoxGeometry(0.08, 0.3, 0.95), mn); mm.position.set(0, 2.0, 0.65); mm.rotation.x = 0.6; g.add(mm);
  g.add(at3(mk(new T.BoxGeometry(0.62, 0.12, 0.7), '#5a2a1a'), 0, 1.8, -0.05));
  const legs = []; for (const sx of [-0.25, 0.25]) for (const sz of [-0.6, 0.6]) { const lg = new T.Group(); lg.position.set(sx, 1.1, sz); const m = mk(new T.CylinderGeometry(0.09, 0.08, 1.05, 8), col); m.position.y = -0.52; lg.add(m); lg.add(at3(mk(new T.CylinderGeometry(0.1, 0.11, 0.12, 8), '#2a1e18'), 0, -1.04, 0)); g.add(lg); legs.push(lg); }
  const tl = new T.Group(); tl.position.set(0, 1.55, -0.9); const tm = mk(new T.CylinderGeometry(0.05, 0.12, 0.8, 6), mn); tm.position.set(0, -0.3, -0.12); tm.rotation.x = 0.35; tl.add(tm); g.add(tl);
  g.userData.legs = legs; g.userData.tail = tl; g.scale.setScalar(s || 1); return g; };
CF.pistol = (s) => { const g = new T.Group(), c = '#1c1d22'; g.add(at3(mk(new T.BoxGeometry(0.07, 0.09, 0.34), c), 0, 0.03, 0.14), at3(mk(new T.BoxGeometry(0.07, 0.18, 0.09), c), 0, -0.06, -0.01)); g.scale.setScalar(s || 1); return g; };
CF.rifle = (s) => { const g = new T.Group(), c = '#1c1d22'; g.add(at3(mk(new T.BoxGeometry(0.08, 0.1, 1.0), c), 0, 0.03, 0.35), at3(mk(new T.BoxGeometry(0.08, 0.16, 0.3), '#4a3a2a'), 0, -0.02, -0.25), at3(mk(new T.CylinderGeometry(0.05, 0.05, 0.3, 8), c), 0, 0.12, 0.3)); g.scale.setScalar(s || 1); return g; };
CF.knife = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.03, 0.06, 0.32), '#dfe6ee', { metalness: 0.5, roughness: 0.3 }), 0, 0, 0.2), at3(mk(new T.BoxGeometry(0.05, 0.08, 0.14), '#2a2220'), 0, 0, -0.02)); g.scale.setScalar(s || 1); return g; };
CF.cane = (s, c) => { const g = new T.Group(), col = c || '#3a2a1e'; g.add(at3(mk(new T.CylinderGeometry(0.035, 0.035, 1.0, 8), col), 0, -0.45, 0)); const k = mk(new T.SphereGeometry(0.07, 8, 6), c === '#f4f4f0' ? '#c0c4cc' : P.gold, GOLDM); g.add(k); g.scale.setScalar(s || 1); return g; };
CF.coin = (s) => { const g = new T.Group(); const d = mk(new T.CylinderGeometry(0.16, 0.16, 0.035, 18), P.gold, GOLDM); d.rotation.x = Math.PI / 2; g.add(d); const gl = softSprite('rgba(255,215,120,1)', 0.7); gl.scale.setScalar(0.8); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.frame = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.5, 0.62, 0.05), '#c8a060'), 0, 0.31, 0)); g.add(at3(new T.Mesh(new T.PlaneGeometry(0.38, 0.5), basic('#f6d8dc')), 0, 0.31, 0.03)); const h = label('♥', { px: 120, color: '#e05a6a', w: 0.3 }); h.position.set(0, 0.32, 0.05); g.add(h); g.scale.setScalar(s || 1); return g; };
CF.gift = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.9, 0.7, 0.9), '#f4f0ea'), 0, 0.35, 0)); for (const r of [0, 1]) { const rb = mk(new T.BoxGeometry(r ? 0.94 : 0.14, 0.72, r ? 0.14 : 0.94), '#d04a5a'); rb.position.y = 0.35; g.add(rb); }
  const lid = new T.Group(); lid.position.set(0, 0.72, -0.45); lid.add(at3(mk(new T.BoxGeometry(0.98, 0.12, 0.98), '#f4f0ea'), 0, 0.05, 0.45), at3(mk(new T.TorusGeometry(0.14, 0.04, 6, 12), '#d04a5a'), 0, 0.17, 0.45)); g.add(lid); g.userData.lid = lid; g.scale.setScalar(s || 1); return g; };
CF.pump = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.9, 1.9, 0.6), '#d04a3a'), 0, 0.95, 0), at3(new T.Mesh(new T.PlaneGeometry(0.6, 0.36), basic('#bfe8ff')), 0, 1.5, 0.31), at3(mk(new T.BoxGeometry(0.16, 0.5, 0.16), '#2a2a2e'), 0.52, 0.9, 0.1));
  const roof = mk(new T.BoxGeometry(5.5, 0.25, 3), '#f2f2f0'); roof.position.set(0, 3.6, 0); g.add(roof); for (const x of [-2.4, 2.4]) g.add(at3(mk(new T.BoxGeometry(0.2, 3.5, 0.2), '#d8d8dc'), x, 1.75, 0)); g.scale.setScalar(s || 1); return g; };
CF.cash = (s) => { const g = new T.Group(), rnd = srnd(7); for (let i = 0; i < 16; i++) { const b = mk(new T.BoxGeometry(0.5, 0.18, 0.26), i % 3 ? '#6aa860' : '#5a9a50'); b.position.set((i % 4 - 1.5) * 0.52, 0.09 + Math.floor(i / 8) * 0.19 + (i % 2) * 0.01, (Math.floor(i / 4) % 2 - 0.5) * 0.3); b.rotation.y = (rnd() - 0.5) * 0.3; g.add(b); } g.scale.setScalar(s || 1); return g; };
CF.lamp = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.06, 0.08, 3.4, 8), '#2a2e36'), 0, 1.7, 0), at3(mk(new T.BoxGeometry(0.3, 0.16, 0.3), '#2a2e36'), 0, 3.45, 0)); const gl = softSprite(c || 'rgba(255,214,150,1)', 0.85); gl.scale.setScalar(1.6); gl.position.y = 3.3; g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.moto = (s, c) => { const g = new T.Group(), col = c || '#c03a3a'; for (const z of [-0.6, 0.6]) { const w = mk(new T.TorusGeometry(0.32, 0.09, 6, 16), '#1e1e24'); w.rotation.y = Math.PI / 2; w.position.set(0, 0.36, z); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.34, 0.32, 1.0), col), 0, 0.62, 0), at3(mk(new T.BoxGeometry(0.28, 0.12, 0.5), '#1e1e24'), 0, 0.82, -0.2), at3(mk(new T.BoxGeometry(0.7, 0.05, 0.05), '#c0c4cc'), 0, 1.0, 0.5), at3(mk(new T.BoxGeometry(0.06, 0.4, 0.06), '#c0c4cc'), 0, 0.8, 0.55));
  g.add(at3(new T.Mesh(new T.SphereGeometry(0.08, 8, 6), basic('#fff2c0')), 0, 0.8, 0.72)); g.scale.setScalar(s || 1); return g; };
CF.train = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(9, 2.4, 2.2), '#a8b0ba', { metalness: 0.4, roughness: 0.4 }), 0, 1.5, 0)); const wl = new T.Mesh(new T.PlaneGeometry(8.4, 0.7), basic('#ffe8a8')); wl.position.set(0, 1.9, 1.11); g.add(wl);
  for (let i = 0; i < 6; i++) g.add(at3(mk(new T.BoxGeometry(0.06, 2.0, 0.02), '#6a727c'), -3.6 + i * 1.45, 1.4, 1.12)); g.add(at3(mk(new T.BoxGeometry(9, 0.12, 2.24), '#d04a3a'), 0, 0.9, 0)); g.scale.setScalar(s || 1); return g; };
CF.book = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.42, 0.56, 0.12), c || '#8a2a2a'), 0, 0, 0), at3(mk(new T.BoxGeometry(0.38, 0.52, 0.13), '#f4ecd8'), 0.03, 0, 0)); g.scale.setScalar(s || 1); return g; };
CF.grave = (s, txt) => { const g = new T.Group(); const st = mk(new T.BoxGeometry(1.1, 1.2, 0.26), '#9aa0a8'); st.position.y = 0.6; g.add(st); const tp = mk(new T.CylinderGeometry(0.55, 0.55, 0.26, 18), '#9aa0a8'); tp.rotation.x = Math.PI / 2; tp.position.y = 1.2; g.add(tp);
  if (txt) { const lb = label(txt, { px: 80, color: '#2a2e36', w: 0.9 }); lb.position.set(0, 0.95, 0.15); g.add(lb); } g.add(at3(mk(new T.BoxGeometry(1.5, 0.12, 0.6), '#7a8088'), 0, 0.06, 0.1)); g.scale.setScalar(s || 1); return g; };
CF.tracer = (s, c) => beam(c || '#ffe9a0');
CF.bird = (s, c) => { const g = new T.Group(), col = c || '#8a8f9a'; const b = mk(new T.SphereGeometry(0.16, 10, 8), col); b.scale.set(0.8, 0.8, 1.2); b.position.y = 0.2; g.add(b); g.add(at3(mk(new T.SphereGeometry(0.1, 8, 6), '#6a7080'), 0, 0.36, 0.14), at3(mk(new T.ConeGeometry(0.03, 0.08, 5), '#e0a040'), 0, 0.35, 0.26));
  const wg = []; for (const sx of [-1, 1]) { const w = mk(new T.BoxGeometry(0.22, 0.03, 0.18), '#7a808a'); w.position.set(sx * 0.15, 0.24, 0); g.add(w); wg.push(w); } g.userData.wings = wg; g.scale.setScalar(s || 1); return g; };
CF.lantern = (s, c) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.3, 12, 8), c || '#d03a2a', { emissive: new T.Color(c || '#d03a2a'), emissiveIntensity: 0.5 }); b.scale.set(1, 1.3, 1); g.add(b); const gl = softSprite('rgba(255,140,90,1)', 0.6); gl.scale.setScalar(1.4); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.table = (s, c) => { const g = new T.Group(), col = c || '#6a4a32'; g.add(at3(mk(new T.BoxGeometry(1.6, 0.1, 0.9), col), 0, 0.82, 0)); for (const x of [-0.7, 0.7]) for (const z of [-0.35, 0.35]) g.add(at3(mk(new T.BoxGeometry(0.08, 0.8, 0.08), '#3a2a1e'), x, 0.4, z)); g.scale.setScalar(s || 1); return g; };
CF.sofa = (s, c) => { const g = new T.Group(), col = c || '#5a6a8a'; g.add(at3(mk(new T.BoxGeometry(3.2, 0.5, 0.9), col), 0, 0.25, 0), at3(mk(new T.BoxGeometry(3.2, 0.8, 0.3), col), 0, 0.75, -0.42)); for (const x of [-1.5, 1.5]) g.add(at3(mk(new T.BoxGeometry(0.3, 0.75, 0.9), col), x, 0.38, 0)); g.scale.setScalar(s || 1); return g; };
CF.counter = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(3.4, 1.0, 0.8), c || '#3a2a22'), 0, 0.5, 0), at3(mk(new T.BoxGeometry(3.5, 0.08, 0.9), P.gold, GOLDM), 0, 1.03, 0)); g.scale.setScalar(s || 1); return g; };
CF.hammer = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.035, 0.035, 1.1, 8), '#8a6a42'), 0, 0.1, 0), at3(mk(new T.BoxGeometry(0.2, 0.2, 0.4), '#4a4e56'), 0, 0.66, 0)); g.scale.setScalar(s || 1); return g; };
CF.bat = (s) => { const m = mk(new T.CylinderGeometry(0.06, 0.03, 0.9, 8), '#b08a5a'); m.geometry.translate(0, 0.35, 0); m.scale.setScalar(s || 1); return m; };
CF.launcher = (s) => { const g = new T.Group(); const t = mk(new T.CylinderGeometry(0.1, 0.1, 0.9, 10), '#3a3e36'); t.rotation.x = Math.PI / 2; t.position.z = 0.25; g.add(t, at3(mk(new T.BoxGeometry(0.08, 0.2, 0.1), '#2a2a2a'), 0, -0.12, 0)); g.scale.setScalar(s || 1); return g; };
CF.tentD = (s, c) => { const g = new T.Group(); const t = mk(new T.ConeGeometry(4.2, 3.6, 6, 1, true), c || '#e8dcc0', { side: T.DoubleSide, flatShading: true }); t.position.y = 1.8; g.add(t); g.add(at3(mk(new T.CylinderGeometry(4.6, 4.6, 0.06, 6), '#a0603a'), 0, 0.03, 0)); g.scale.setScalar(s || 1); return g; };
CF.hotel = (s, txt) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(8, 9, 3), '#4a3a32'), 0, 4.5, 0)); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g.add(at3(new T.Mesh(new T.PlaneGeometry(1.1, 1.2), basic(j % 3 ? '#ffd890' : '#5a4a3a')), -2.8 + i * 1.85, 3 + j * 1.8, 1.51));
  g.add(at3(mk(new T.BoxGeometry(2.2, 2.4, 0.2), '#2a1e18'), 0, 1.2, 1.5)); if (txt) { const lb = label(txt, { px: 110, color: '#ffd890', w: 3.2 }); lb.position.set(0, 2.7, 1.7); g.add(lb); } g.scale.setScalar(s || 1); return g; };
CF.cage = (s) => { const g = new T.Group(); const m = '#c0c6ce'; for (let i = 0; i < 6; i++) g.add(at3(mk(new T.BoxGeometry(0.04, 0.9, 0.04), m), -0.5 + i * 0.2, 0.45, 0.4)); g.add(at3(mk(new T.BoxGeometry(1.1, 0.06, 0.9), m), 0, 0.92, 0), at3(mk(new T.BoxGeometry(1.1, 0.06, 0.9), '#8a9098'), 0, 0.03, 0)); g.scale.setScalar(s || 1); return g; };
/* room extras: o.windows (night city windows), o.glass (stained windows), o.shelves (book walls), o.lanterns */
{ const room0 = ENVB.room; ENVB.room = (st, o) => { const out = room0(st, o);
  if (o.windows) for (const x of [-4, 4]) { const w = new T.Mesh(new T.PlaneGeometry(2.4, 2.6), basic('#1e2e52')); place(w, st, x, 3.2, -6.28); out.push(w); for (let i = 0; i < 6; i++) { const l = new T.Mesh(new T.PlaneGeometry(0.18, 0.24), basic(i % 2 ? '#ffd890' : '#8fc0ff')); place(l, st, x - 0.9 + i * 0.36, 2.3 + (i * 37 % 5) * 0.3, -6.26); out.push(l); } }
  if (o.glass) for (const [x, c] of [[-4.5, '#c04a6a'], [0, '#4a7ac0'], [4.5, '#d0a040']]) { const w = new T.Mesh(new T.PlaneGeometry(1.6, 3.4), basic(c, { transparent: true, opacity: 0.85 })); place(w, st, x, 3.6, -6.28); out.push(w); const gl = softSprite(c === '#4a7ac0' ? 'rgba(120,170,255,1)' : 'rgba(255,170,120,1)', 0.35); gl.scale.setScalar(3); place(gl, st, x, 3.6, -6.0); out.push(gl); }
  if (o.shelves) { const rnd = srnd(23); for (const x of [-5.4, -1.8, 1.8, 5.4]) { const sh = mk(new T.BoxGeometry(3.2, 5.4, 0.6), '#4a3220'); place(sh, st, x, 2.7, -6.0); out.push(sh); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const bk = mk(new T.BoxGeometry(0.28, 0.9 + rnd() * 0.2, 0.3), ['#8a2a2a', '#2a4a7a', '#4a6a3a', '#a07a2a', '#5a3a6a'][(i + r) % 5]); place(bk, st, x - 1.25 + i * 0.31, 0.8 + r * 1.3, -5.62); out.push(bk); } } }
  if (o.lanterns) for (let i = 0; i < 7; i++) { const ln = CF.lantern(1.1); place(ln, st, -6 + i * 2, 4.6 + (i % 2) * 0.4, -5.2); out.push(ln); }
  return out; }; }
/* window texture for street facades */
const facadeTex = (base, seed) => { const c = document.createElement('canvas'); c.width = 128; c.height = 256; const g = c.getContext('2d'), rnd = srnd(seed || 3); g.fillStyle = base; g.fillRect(0, 0, 128, 256);
  for (let y = 12; y < 250; y += 28) for (let x = 10; x < 120; x += 24) { g.fillStyle = rnd() < 0.55 ? ['#ffd890', '#ffe8b8', '#9fd0ff'][Math.floor(rnd() * 3)] : 'rgba(0,0,0,.35)'; g.fillRect(x, y, 14, 16); } const t = new T.CanvasTexture(c); return t; };
Object.assign(ENVB, {
  street(st, o) { const out = [], rnd = srnd(o.seed || 41); const fl = mk(new T.BoxGeometry(90, 0.2, 34), o.ground || '#3a3d46'); place(fl, st, 0, -0.1, -2); out.push(fl);
    const sw = mk(new T.BoxGeometry(90, 0.26, 3.4), o.walk || '#5a5d66'); place(sw, st, 0, 0, -5.6); out.push(sw);
    for (let i = 0; i < 22; i++) { const d = new T.Mesh(new T.PlaneGeometry(1.6, 0.14), basic('#e8e0b0')); d.rotation.x = -Math.PI / 2; place(d, st, -42 + i * 4, 0.02, 1.4); out.push(d); }
    if (o.bridge) { for (const x of [-16, 16]) { const tw = mk(new T.BoxGeometry(1.6, 26, 1.6), '#6a7480'); place(tw, st, x, 13, -6); out.push(tw); }
      for (let i = 0; i < 16; i++) { const k = i / 15, x = -16 + k * 32, h = 4 + 20 * Math.pow(2 * k - 1, 2); const cb = mk(new T.CylinderGeometry(0.04, 0.04, h, 5), '#8a96a4'); place(cb, st, x, h / 2, -6); out.push(cb); }
      const rl = mk(new T.BoxGeometry(90, 0.9, 0.2), '#6a7480'); place(rl, st, 0, 0.45, -4.2); out.push(rl); const wt = mk(new T.BoxGeometry(260, 0.2, 200), '#1a2a4a', { emissive: new T.Color('#0a1a3a'), emissiveIntensity: 0.3 }); place(wt, st, 0, -6, -110); out.push(wt);
      for (let i = 0; i < 40; i++) { const b = softSprite(['rgba(255,190,110,1)', 'rgba(120,180,255,1)'][i % 2], 0.4); b.scale.setScalar(0.5 + rnd()); place(b, st, -40 + rnd() * 80, -2 + rnd() * 4, -40 - rnd() * 30); out.push(b); } }
    else { const cols = o.bcol || ['#3a3a48', '#45404a', '#363e4a', '#4a4238']; for (let i = 0; i < 14; i++) { const w = 3.4 + rnd() * 1.6, h = 7 + rnd() * 10, x = -31 + i * 4.8, z = -10 - rnd() * 2; const c = cols[i % cols.length];
        const b = mk(new T.BoxGeometry(w, h, 3), c); place(b, st, x, h / 2, z); out.push(b); const f = new T.Mesh(new T.PlaneGeometry(w * 0.9, h * 0.9), basic('#ffffff', { map: facadeTex(c, i + 3) })); place(f, st, x, h / 2, z + 1.52); out.push(f); }
      for (let x = -12; x <= 12; x += 8) { const lp = CF.lamp(1); place(lp, st, x, 0, -4.4); out.push(lp); } }
    if (o.arch) { const c = '#e6dcc4', a = new T.Group(); for (const x of [-2.6, 2.6]) a.add(at3(mk(new T.BoxGeometry(2.2, 7, 2.4), c), x, 3.5, 0)); a.add(at3(mk(new T.BoxGeometry(7.4, 2.6, 2.4), c), 0, 8.2, 0), at3(mk(new T.BoxGeometry(7.8, 0.4, 2.6), '#d4c8ae'), 0, 9.6, 0)); place(a, st, 0, 0, -18); out.push(a); }
    return out; },
  /* long stone stairs up a hill toward a white domed church (stairY(z) gives the step height at z); o.plaza = the top square in front of the church */
  stairs(st, o) { const out = [], S = stairCfg(), N = S.n; const base = mk(new T.BoxGeometry(80, 0.2, 80), '#4f6a3e'); place(base, st, 0, -0.1, -20); out.push(base);
    const dome = (zz, yy) => { const g = new T.Group(), c = '#f2eee6'; g.add(at3(mk(new T.BoxGeometry(12, 6, 7), c), 0, 3, 0), at3(mk(new T.CylinderGeometry(2.6, 2.6, 2.4, 16), c), 0, 7.2, 0), at3(mk(new T.SphereGeometry(2.6, 18, 12, 0, 6.3, 0, 1.6), c), 0, 8.4, 0), at3(mk(new T.CylinderGeometry(0.3, 0.3, 1.4, 8), c), 0, 11.4, 0));
      for (const x of [-4.6, 4.6]) g.add(at3(mk(new T.CylinderGeometry(1.1, 1.1, 1.6, 12), c), x, 6.8, 0.6), at3(mk(new T.SphereGeometry(1.1, 12, 8, 0, 6.3, 0, 1.6), c), x, 7.6, 0.6)); g.add(at3(mk(new T.BoxGeometry(2.4, 3.4, 0.2), '#7a6a5a'), 0, 1.7, 3.55)); place(g, st, 0, yy, zz); return g; };
    if (o.plaza) { const fl = mk(new T.BoxGeometry(30, 0.3, 20), '#d8d0bf'); place(fl, st, 0, -0.15, -3); out.push(fl); out.push(dome(-12, 0)); for (const x of [-9, 9]) { const tr = tree(1.6, '#4f7a42'); place(tr, st, x, 0, -6); out.push(tr); }
      const sun = softSprite('rgba(255,190,120,1)', 0.9); sun.scale.setScalar(16); place(sun, st, 14, 2, -40); out.push(sun); return out; }
    for (let i = 0; i < N; i++) { const h = (i + 1) * S.rise; const b = mk(new T.BoxGeometry(S.w, h, S.run), i % 2 ? '#cfc6b4' : '#c4bba8'); place(b, st, 0, h / 2, S.z0 - i * S.run - S.run / 2); out.push(b);
      if (i % 4 === 0) for (const sx of [-1, 1]) { const g = mk(new T.BoxGeometry(6, h, S.run * 4), '#5a7a44'); place(g, st, sx * (S.w / 2 + 3.2), h / 2, S.z0 - i * S.run - S.run * 2); out.push(g); } }
    for (const sx of [-1, 1]) { const L = N * S.run, H = N * S.rise, len = Math.hypot(L, H); const rl = mk(new T.CylinderGeometry(0.05, 0.05, len, 6), '#2a2e36'); rl.rotation.x = Math.PI / 2 - Math.atan2(H, L); place(rl, st, sx * (S.w / 2 - 0.2), H / 2 + 1.0, S.z0 - L / 2); out.push(rl);
      for (let i = 2; i < N; i += 9) { const lp = CF.lamp(0.9); place(lp, st, sx * (S.w / 2 + 0.3), (i + 1) * S.rise, S.z0 - i * S.run - S.run / 2); out.push(lp); } }
    const rnd = srnd(61); for (let i = 0; i < 14; i++) { const z = S.z0 - rnd() * N * S.run, x = (i % 2 ? 1 : -1) * (S.w / 2 + 2 + rnd() * 3); const tr = tree(1.2 + rnd() * 0.6, ['#3f7a4a', '#4f8a52'][i % 2]); place(tr, st, x, stairY(z), z); out.push(tr); }
    out.push(dome(S.z0 - N * S.run - 8, N * S.rise)); const top = mk(new T.BoxGeometry(20, 0.3, 14), '#d8d0bf'); place(top, st, 0, N * S.rise - 0.1, S.z0 - N * S.run - 6); out.push(top); return out; },
  dock(st, o) { const out = []; const sea = mk(new T.BoxGeometry(240, 0.4, 200), '#1a2e4a', { emissive: new T.Color('#0a1a32'), emissiveIntensity: 0.3 }); place(sea, st, 0, -1.2, -60); out.push(sea);
    const dk = mk(new T.BoxGeometry(40, 0.5, 16), '#5a4a3a'); place(dk, st, 0, -0.25, -1); out.push(dk); for (let i = 0; i < 20; i++) { const ln = mk(new T.BoxGeometry(0.06, 0.02, 16), '#3a2e24'); place(ln, st, -19 + i * 2, 0.01, -1); out.push(ln); }
    const cols = ['#b04a3a', '#3a6a9a', '#d0a040', '#4a7a5a']; for (let i = 0; i < 8; i++) { const c = mk(new T.BoxGeometry(5.6, 2.4, 2.4), cols[i % 4]); place(c, st, -16 + (i % 4) * 6.4 + (i > 3 ? 3 : 0), 1.2 + (i > 3 ? 2.4 : 0), -7.5 - (i % 2) * 0.4); out.push(c); }
    for (const x of [-10, 10]) { const lp = CF.lamp(1.1, 'rgba(255,200,130,1)'); place(lp, st, x, 0, -4.6); out.push(lp); } return out; },
});
/* stairs config as hoisted functions so episode data can call stairY() while it is being defined */
function stairCfg() { return { z0: 2, run: 0.62, rise: 0.34, n: 48, w: 6 }; }
function stairY(z) { const S = stairCfg(); return z > S.z0 ? 0 : Math.min(S.n, Math.floor((S.z0 - z) / S.run) + 1) * S.rise; }

/* ---- added for The Matrix 1-4 (Nov 2026): sim-world grid, pods, sci-fi war props + presets, reusable. Generic shapes only: no film code-rain, ship, machine, logo or costume designs. ---- */
const gridLines = (w, d, step, col, op) => { const g = new T.Group(), m = basic(col, { transparent: true, opacity: op == null ? 0.6 : op, depthWrite: false });
  for (let x = -w / 2; x <= w / 2 + 1e-6; x += step) g.add(at3(new T.Mesh(new T.BoxGeometry(0.04, 0.01, d), m), x, 0, 0));
  for (let z = -d / 2; z <= d / 2 + 1e-6; z += step) g.add(at3(new T.Mesh(new T.BoxGeometry(w, 0.01, 0.04), m), 0, 0, z)); return g; };
/* pill: c body colour, glow rgba */
CF.pill = (s, c, gc) => { const g = new T.Group(), col = c || '#e0303a', o = { emissive: new T.Color(col), emissiveIntensity: 0.35 }; const b = mk(new T.CylinderGeometry(0.09, 0.09, 0.16, 12), col, o); b.rotation.z = Math.PI / 2; g.add(b);
  for (const x of [-0.08, 0.08]) g.add(at3(mk(new T.SphereGeometry(0.09, 12, 8), col, o), x, 0, 0)); const gl = softSprite(gc || 'rgba(255,90,90,1)', 0.55); gl.scale.setScalar(0.8); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* upright glass pod (stand a figure at the same spot); userData.glow */
CF.pod = (s, c) => { const g = new T.Group(); const sh = new T.Mesh(new T.CylinderGeometry(0.95, 0.95, 2.7, 20, 1, true), glass(c || '#ffb89a', 0.22)); sh.position.y = 1.55; g.add(sh);
  for (const y of [0.15, 2.95]) g.add(at3(mk(new T.CylinderGeometry(1.02, 1.02, 0.3, 20), '#3a2e34'), 0, y, 0)); const gl = softSprite('rgba(255,150,120,1)', 0.35); gl.scale.setScalar(3.2); gl.position.set(0, 1.4, -0.5); g.add(gl); g.userData.glow = gl;
  for (let i = 0; i < 5; i++) g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 6), '#2a2226'), -0.6 + i * 0.3, 4.4, -0.3)); g.scale.setScalar(s || 1); return g; };
/* tall tower of glowing pods (power-plant fields) */
CF.podTower = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.7, 0.9, 17, 10), '#2a2430'), 0, 8.5, 0)); const ms = ['#a8483e', '#b8644a', '#8a3a36'].map((c) => basic(c, { transparent: true, opacity: 0.8 }));
  for (let r = 0; r < 9; r++) for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + r * 0.5; const p = new T.Mesh(new T.SphereGeometry(0.42, 10, 8), ms[(r + i) % 3]); p.scale.set(1, 1.4, 1); p.position.set(Math.sin(a) * 1.05, 1 + r * 1.75, Math.cos(a) * 1.05); g.add(p); }
  g.scale.setScalar(s || 1); return g; };
/* phone booth; userData.glow (opacity 0..1 when the line opens) */
CF.booth = (s, c) => { const g = new T.Group(), col = c || '#3a5a8a'; for (const x of [-0.55, 0.55]) for (const z of [-0.55, 0.55]) g.add(at3(mk(new T.BoxGeometry(0.1, 2.6, 0.1), col), x, 1.3, z));
  g.add(at3(mk(new T.BoxGeometry(1.25, 0.25, 1.25), col), 0, 2.72, 0), at3(new T.Mesh(new T.BoxGeometry(1.1, 2.4, 1.1), glass('#cfe8ff', 0.16)), 0, 1.3, 0), at3(mk(new T.BoxGeometry(0.32, 0.46, 0.12), '#1e1e24'), 0, 1.55, -0.46));
  const gl = softSprite('rgba(140,235,255,1)', 0.9); gl.scale.setScalar(3.2); gl.position.y = 1.4; gl.material.opacity = 0; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
/* slow bullet with a ripple ring */
CF.bullet = (s) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.07, 10, 8), P.gold, GOLDM); b.scale.set(1, 1, 2.4); g.add(b);
  const rg = new T.Mesh(new T.TorusGeometry(0.16, 0.012, 6, 20), basic('#ffffff', { transparent: true, opacity: 0.45 })); rg.position.z = -0.2; g.add(rg); const gl = softSprite('rgba(255,230,160,1)', 0.5); gl.scale.setScalar(0.45); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* spoon; userData.bend (rotation.x bends the top half) */
CF.spoon = (s) => { const g = new T.Group(), o = { metalness: 0.6, roughness: 0.3 }, m = '#dfe4ec'; g.add(at3(mk(new T.BoxGeometry(0.05, 0.36, 0.02), m, o), 0, 0.18, 0)); const up = new T.Group(); up.position.y = 0.36;
  up.add(at3(mk(new T.BoxGeometry(0.05, 0.18, 0.02), m, o), 0, 0.09, 0)); const bw = mk(new T.SphereGeometry(0.09, 10, 8), m, o); bw.scale.set(1, 1.4, 0.35); bw.position.y = 0.28; up.add(bw); g.add(up); g.userData.bend = up; g.scale.setScalar(s || 1); return g; };
CF.key = (s) => { const g = new T.Group(), o = GOLDM; const r = mk(new T.TorusGeometry(0.12, 0.035, 6, 16), P.gold, o); r.position.y = 0.3; g.add(r, at3(mk(new T.BoxGeometry(0.04, 0.4, 0.03), P.gold, o), 0, 0, 0), at3(mk(new T.BoxGeometry(0.12, 0.04, 0.03), P.gold, o), 0.06, -0.14, 0), at3(mk(new T.BoxGeometry(0.09, 0.04, 0.03), P.gold, o), 0.05, -0.05, 0));
  const gl = softSprite('rgba(255,220,130,1)', 0.6); gl.scale.setScalar(0.7); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.keyring = (s) => { const g = new T.Group(); const r = mk(new T.TorusGeometry(0.18, 0.02, 6, 18), '#c0c4cc'); g.add(r); for (let i = 0; i < 6; i++) { const k = CF.key(0.55); k.position.set(Math.sin(i) * 0.12, -0.22 - (i % 2) * 0.05, 0.02 * i); k.rotation.z = -0.5 + i * 0.2; g.add(k); } g.scale.setScalar(s || 1); return g; };
/* door: c leaf colour, gc light colour; userData.leaf (rotation.y -1.6 = open), userData.glow (opacity) */
CF.door = (s, c, gc) => { const g = new T.Group(), f = '#e8e8ec'; g.add(at3(mk(new T.BoxGeometry(0.15, 2.5, 0.2), f), -0.65, 1.25, 0), at3(mk(new T.BoxGeometry(0.15, 2.5, 0.2), f), 0.65, 1.25, 0), at3(mk(new T.BoxGeometry(1.45, 0.15, 0.2), f), 0, 2.55, 0));
  g.add(at3(new T.Mesh(new T.PlaneGeometry(1.15, 2.4), basic(gc || '#fff4d0')), 0, 1.22, -0.05)); const h = new T.Group(); h.position.set(-0.58, 0, 0.02);
  h.add(at3(mk(new T.BoxGeometry(1.15, 2.4, 0.08), c || '#7a6a5a'), 0.575, 1.22, 0), at3(mk(new T.SphereGeometry(0.06, 8, 6), P.gold, GOLDM), 1.0, 1.2, 0.08)); g.add(h); g.userData.leaf = h;
  const gl = softSprite('rgba(255,245,210,1)', 0.9); gl.scale.setScalar(3.6); gl.position.set(0, 1.3, 0.3); gl.material.opacity = 0; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
const openDoor = (d, k) => { d.userData.leaf.rotation.y = -1.7 * k; d.userData.glow.material.opacity = 0.8 * k; };
/* defence turret (generic): userData.head (yaw), userData.fl (muzzle flash sprite) */
CF.turret = (s, c) => { const g = new T.Group(), col = c || '#6a6458'; g.add(at3(mk(new T.CylinderGeometry(0.9, 1.1, 0.8, 12), '#4a4640'), 0, 0.4, 0)); const h = new T.Group(); h.position.y = 1.2; g.add(h);
  h.add(at3(mk(new T.BoxGeometry(1.3, 0.8, 1.2), col), 0, 0, 0), at3(mk(new T.BoxGeometry(0.5, 0.5, 0.1), '#2a3a4a'), 0, 0.1, 0.62)); for (const x of [-0.35, 0.35]) { const b = mk(new T.CylinderGeometry(0.09, 0.09, 1.6, 8), '#2a2a2e'); b.rotation.x = Math.PI / 2; b.position.set(x, 0.05, 1.2); h.add(b); }
  const fl = softSprite('rgba(255,210,120,1)', 1); fl.scale.setScalar(1.4); fl.position.set(0, 0.05, 2.1); fl.visible = false; h.add(fl); g.userData.head = h; g.userData.fl = fl; g.scale.setScalar(s || 1); return g; };
/* giant digging machine (generic cone bit + drum): userData.bit spins on y; nose points down (-y) */
CF.drill = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(2.2, 2.2, 3.4, 16), '#4a4448'), 0, 2.6, 0)); for (const y of [1.4, 3.8]) g.add(at3(mk(new T.CylinderGeometry(2.35, 2.35, 0.3, 16), '#7a2a2a'), 0, y, 0));
  const bit = new T.Group(); const c = mk(new T.ConeGeometry(2.0, 3.2, 12), '#8a8a90', { flatShading: true, metalness: 0.4, roughness: 0.5 }); c.rotation.x = Math.PI; c.position.y = -0.6; bit.add(c);
  for (let i = 0; i < 6; i++) { const t = mk(new T.BoxGeometry(0.2, 2.2, 0.35), '#c0c4cc'); const a = i * Math.PI / 3; t.position.set(Math.sin(a) * 1.0, -0.4, Math.cos(a) * 1.0); t.rotation.set(0.5 * Math.cos(a), a, -0.5 * Math.sin(a)); bit.add(t); }
  for (let i = 0; i < 4; i++) { const l = softSprite('rgba(255,70,50,1)', 0.9); l.scale.setScalar(0.7); const a = i * Math.PI / 2; l.position.set(Math.sin(a) * 2.25, 3.0, Math.cos(a) * 2.25); g.add(l); }
  g.add(bit); g.userData.bit = bit; g.scale.setScalar(s || 1); return g; };
/* machine leader shown as a swirling cloud of lights (no face or body design); userData.tick(t) */
CF.mind = (s) => { const g = new T.Group(), rnd = srnd(91), parts = []; const core = softSprite('rgba(255,150,70,1)', 0.75); core.scale.setScalar(4.4); g.add(core);
  for (let i = 0; i < 80; i++) { const p = softSprite(['rgba(255,190,90,1)', 'rgba(255,110,60,1)', 'rgba(255,235,170,1)'][i % 3], 0.75); p.scale.setScalar(0.45 + rnd() * 0.7); p.userData.v = [rnd() * 6.283, Math.acos(2 * rnd() - 1), 1.6 + rnd() * 0.7]; parts.push(p); g.add(p); }
  g.userData.tick = (t) => parts.forEach((p, i) => { const v = p.userData.v, th = v[0] + t * 0.45 * (i % 2 ? 1 : -1); p.position.set(Math.sin(v[1]) * Math.cos(th) * v[2], Math.cos(v[1]) * v[2] * 1.25, Math.sin(v[1]) * Math.sin(th) * v[2]); });
  g.userData.tick(0); g.scale.setScalar(s || 1); return g; };
/* dark spire with glowing window rings */
CF.spire = (s, h) => { const g = new T.Group(), H = h || 14; g.add(at3(mk(new T.CylinderGeometry(0.4, 1.6, H, 8), '#1e1a20', { flatShading: true }), 0, H / 2, 0)); const m = basic('#ff8a3a');
  for (let i = 1; i < 7; i++) { const r = new T.Mesh(new T.CylinderGeometry(1.6 - i * H / 7 * 1.2 / H + 0.03, 1.6 - i * H / 7 * 1.2 / H + 0.03, 0.12, 8, 1, true), m); r.position.y = i * H / 7; g.add(r); }
  const tp = softSprite('rgba(255,120,60,1)', 0.8); tp.scale.setScalar(2.2); tp.position.y = H + 0.4; g.add(tp); g.scale.setScalar(s || 1); return g; };
/* wall of glowing screens; userData.panels */
CF.tvwall = (s, cols, rows, c) => { const g = new T.Group(), n = cols || 9, m = rows || 5, panels = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const p = new T.Mesh(new T.PlaneGeometry(0.95, 0.66), basic(c || '#dfeeff', { transparent: true, opacity: 0.9 })); p.position.set((i - (n - 1) / 2) * 1.05, 0.5 + j * 0.76, 0); g.add(p); panels.push(p);
    const fig = new T.Mesh(new T.CircleGeometry(0.11, 10), basic('#5a7a9a')); fig.position.set(p.position.x, p.position.y + 0.08, 0.01); g.add(fig); const bd = new T.Mesh(new T.PlaneGeometry(0.2, 0.2), basic('#5a7a9a')); bd.position.set(p.position.x, p.position.y - 0.14, 0.01); g.add(bd); }
  g.userData.panels = panels; g.scale.setScalar(s || 1); return g; };
CF.rabbit = (s, c) => { const g = new T.Group(), w = c || '#fbfaf6'; const b = mk(new T.SphereGeometry(0.3, 14, 10), w); b.scale.set(1, 1.1, 0.95); b.position.y = 0.3; g.add(b); const h = mk(new T.SphereGeometry(0.24, 14, 10), w); h.position.y = 0.72; g.add(h);
  for (const sx of [-1, 1]) { const e = mk(new T.SphereGeometry(0.07, 8, 6), w); e.scale.set(1, 3.2, 0.7); e.position.set(sx * 0.1, 1.05, 0); e.rotation.z = -sx * 0.15; g.add(e); g.add(at3(mk(new T.SphereGeometry(0.035, 6, 4), '#1e1a1a'), sx * 0.09, 0.76, 0.21)); }
  g.add(at3(mk(new T.SphereGeometry(0.035, 6, 4), '#ff9ab0'), 0, 0.7, 0.24), at3(mk(new T.SphereGeometry(0.09, 8, 6), w), 0, 0.2, -0.3)); g.scale.setScalar(s || 1); return g; };
CF.cup = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.11, 0.09, 0.22, 12), c || '#f4f0ea'), 0, 0.11, 0)); const h = mk(new T.TorusGeometry(0.06, 0.018, 6, 10), c || '#f4f0ea'); h.position.set(0.13, 0.12, 0); g.add(h);
  g.add(at3(mk(new T.CylinderGeometry(0.1, 0.1, 0.01, 12), '#5a3420'), 0, 0.215, 0)); g.scale.setScalar(s || 1); return g; };
CF.cloud = (s, c) => { const g = new T.Group(), rnd = srnd(141), m = M(c || '#c4cede', { flatShading: true }); for (let i = 0; i < 9; i++) { const b = new T.Mesh(new T.IcosahedronGeometry(1, 1), m); b.scale.setScalar(1.2 + rnd() * 1.4); b.position.set(-5 + i * 1.25 + rnd(), rnd() * 0.6, (rnd() - 0.5) * 2); g.add(b); } g.scale.setScalar(s || 1); return g; };
CF.pillar = (s, c) => { const g = new T.Group(), col = c || '#d8d0c0'; g.add(at3(mk(new T.CylinderGeometry(0.5, 0.5, 5.6, 14), col), 0, 2.8, 0), at3(mk(new T.BoxGeometry(1.3, 0.3, 1.3), col), 0, 0.15, 0), at3(mk(new T.BoxGeometry(1.3, 0.3, 1.3), col), 0, 5.6, 0)); g.scale.setScalar(s || 1); return g; };
/* flying chips (like CF.bits) in any colour; animate with burstTick */
CF.chips = (s, c) => { const g = new T.Group(), rnd = srnd(23); for (let i = 0; i < 16; i++) { const b = mk(new T.BoxGeometry(0.16 + rnd() * 0.2, 0.12 + rnd() * 0.15, 0.14), c || '#d8d0c0', { flatShading: true }); b.userData.v = [(rnd() - 0.5) * 4.2, 1.8 + rnd() * 2.4, (rnd() - 0.2) * 2.8, rnd() * 9]; g.add(b); } g.scale.setScalar(s || 1); return g; };
/* "seeing the code": a teal wire grid laid over floor and walls + scattered glyph tiles (not falling rain) */
CF.codegrid = (s, c) => { const g = new T.Group(), col = c || '#5ff0e0'; const fl = gridLines(16, 13, 0.8, col, 0.55); g.add(fl); const bw = gridLines(16, 7, 0.8, col, 0.45); bw.rotation.x = Math.PI / 2; bw.position.set(0, 3.5, -6.3); g.add(bw);
  for (const sx of [-1, 1]) { const sw = gridLines(13, 7, 0.8, col, 0.4); sw.rotation.set(Math.PI / 2, 0, Math.PI / 2); sw.position.set(sx * 7.8, 3.5, 0); g.add(sw); }
  const rnd = srnd(57), tm = basic(col, { transparent: true, opacity: 0.6 }); for (let i = 0; i < 46; i++) { const q = new T.Mesh(new T.PlaneGeometry(0.22, 0.3), tm); q.position.set(-7 + rnd() * 14, 0.6 + rnd() * 6, -6.2); g.add(q); } g.scale.setScalar(s || 1); return g; };
/* energy ring (push wave / EMP): grow with scale, fade with material opacity via ringTick */
CF.ringw = (s, c) => { const m = new T.Mesh(new T.TorusGeometry(1, 0.08, 8, 40), basic(c || '#bff4ff', { transparent: true, opacity: 0.85, depthWrite: false })); m.scale.setScalar(s || 1); return m; };
const ringTick = (o, k, s0, s1) => { o.visible = k > 0 && k < 1; o.scale.setScalar(U.lerp(s0, s1, k)); o.material.opacity = 0.85 * (1 - k); };
Object.assign(ENVB, {
  /* simulated world: dark floor with a teal grid, floating cubes; o.white = the white loading void */
  cyber(st, o) { const out = [], wht = !!o.white; const fl = mk(new T.BoxGeometry(60, 0.2, 50), wht ? '#eef2f6' : '#0e1426'); place(fl, st, 0, -0.1, -8); out.push(fl);
    const gl = gridLines(60, 50, 1.2, wht ? '#b8c4d0' : '#3fd8d0', wht ? 0.5 : 0.45); place(gl, st, 0, 0.01, -8); out.push(gl);
    if (o.dojo) { const mat = mk(new T.BoxGeometry(10, 0.1, 8), '#b88a5a'); place(mat, st, 0, 0.05, -0.5); out.push(mat); for (const x of [-5.6, 5.6]) for (const z of [-4.6, 3.6]) { const p = mk(new T.BoxGeometry(0.3, 4, 0.3), '#5a3a2a'); place(p, st, x, 2, z); out.push(p); } }
    const rnd = srnd(o.seed || 151), cm = basic(wht ? '#c8d4e0' : '#3fd8d0', { transparent: true, opacity: wht ? 0.35 : 0.22 }); for (let i = 0; i < 26; i++) { const c = new T.Mesh(new T.BoxGeometry(1, 1, 1), cm); c.scale.setScalar(0.5 + rnd() * 1.6); place(c, st, -24 + rnd() * 48, 1 + rnd() * 9, -14 - rnd() * 18); c.rotation.set(rnd(), rnd(), 0); out.push(c); }
    return out; },
  podfield(st, o) { const out = []; const fl = mk(new T.BoxGeometry(120, 0.2, 90), '#141018'); place(fl, st, 0, -0.1, -20); out.push(fl); const rnd = srnd(161);
    for (let r = 0; r < 4; r++) for (let i = 0; i < 7; i++) { const tw = CF.podTower(0.9 + rnd() * 0.3); place(tw, st, -24 + i * 8 + (r % 2) * 4, -2 - rnd() * 3, -9 - r * 9); out.push(tw); }
    for (let i = 0; i < 6; i++) { const h = softSprite('rgba(255,90,70,1)', 0.1); h.scale.setScalar(6 + rnd() * 5); place(h, st, -30 + rnd() * 60, 6 + rnd() * 8, -26 - rnd() * 16); out.push(h); } return out; },
  /* machine city: dark ground, spires, orange glows */
  mcity(st, o) { const out = [terrain(st, '#2a2226', '#1a1418', { hill: 3, seed: 171, flat: 14 }), ranges(st, [[38, '#241c22', 8, 16, 12, 2.6]], { seed: 172 })]; const rnd = srnd(173);
    for (let i = 0; i < 16; i++) { const sp = CF.spire(0.8 + rnd() * 0.9, 10 + rnd() * 10); place(sp, st, -30 + i * 4 + rnd() * 2, 0, -12 - rnd() * 22); out.push(sp); }
    for (let i = 0; i < 18; i++) { const h = softSprite('rgba(255,120,50,1)', 0.25); h.scale.setScalar(6 + rnd() * 8); place(h, st, -30 + rnd() * 60, 2 + rnd() * 10, -18 - rnd() * 20); out.push(h); } return out; },
  /* above the clouds: cloud floor + sun */
  clouds(st, o) { const out = [], rnd = srnd(181); for (let i = 0; i < 16; i++) { const c = CF.cloud(1.4 + rnd()); place(c, st, -36 + (i % 8) * 10 + rnd() * 3, -4 - rnd() * 2, -6 - Math.floor(i / 8) * 14 - rnd() * 4); out.push(c); }
    const sun = softSprite('rgba(255,220,160,1)', 0.95); sun.scale.setScalar(14); place(sun, st, 10, 9, -50); out.push(sun); return out; },
});
/* building block with a lit-window facade (top at y=0 by default: o.y); for rooftop gaps */
CF.bldg = (s, w, h, d, c) => { const g = new T.Group(), W = w || 8, Hh = h || 24, D = d || 10, col = c || '#3a3e4a'; const b = mk(new T.BoxGeometry(W, Hh, D), col); b.position.y = -Hh / 2; g.add(b);
  const f = new T.Mesh(new T.PlaneGeometry(W * 0.92, Hh * 0.96), basic('#ffffff', { map: facadeTex(col, 9) })); f.position.set(0, -Hh / 2, D / 2 + 0.02); g.add(f); g.add(at3(mk(new T.BoxGeometry(W, 0.5, D), '#262a32'), 0, 0.2, 0)); g.scale.setScalar(s || 1); return g; };
/* ---- added for LOTR + Hobbit recap (Nov 2026): fantasy props + presets, reusable. Generic shapes only (no film creature/costume designs). ---- */
CF.hole = (s, door) => { const g = new T.Group(); const hill = mk(new T.SphereGeometry(2.4, 18, 10, 0, 6.3, 0, 1.45), '#5f9a42', { flatShading: true }); hill.scale.set(1.3, 0.8, 1); g.add(hill);
  const d = mk(new T.CylinderGeometry(0.62, 0.62, 0.12, 20), door || '#8a3a2a'); d.rotation.x = Math.PI / 2; d.position.set(0, 0.62, 2.28); g.add(d); g.add(at3(mk(new T.SphereGeometry(0.07, 8, 6), P.gold, GOLDM), 0, 0.62, 2.36));
  const fr = mk(new T.TorusGeometry(0.66, 0.08, 6, 24), '#c8b89a'); fr.position.set(0, 0.62, 2.3); g.add(fr);
  for (const sx of [-1.5, 1.5]) { const w = new T.Mesh(new T.CircleGeometry(0.3, 16), basic('#ffe0a0')); w.position.set(sx, 0.9, 2.05); w.rotation.y = sx * 0.25; g.add(w); } g.scale.setScalar(s || 1); return g; };
CF.peak = (s, c) => { const g = new T.Group(), col = c || '#6a6a72'; const m = mk(new T.ConeGeometry(9, 13, 7), col, { flatShading: true }); m.position.y = 6.5; g.add(m);
  for (const [x, z, k] of [[-6, 1, 0.55], [6.5, 0.5, 0.6]]) { const c2 = mk(new T.ConeGeometry(9 * k, 13 * k, 6), col, { flatShading: true }); c2.position.set(x, 6.5 * k, z); g.add(c2); }
  const sn = mk(new T.ConeGeometry(2.6, 3.4, 7), '#e8ecf4', { flatShading: true }); sn.position.y = 11.4; g.add(sn); g.scale.setScalar(s || 1); return g; };
CF.volcano = (s) => { const g = new T.Group(); const m = mk(new T.CylinderGeometry(2.2, 9, 12, 9, 1, true), '#2a1e1a', { flatShading: true, side: T.DoubleSide }); m.position.y = 6; g.add(m);
  const lv = new T.Mesh(new T.CircleGeometry(2.1, 16), basic('#ff6a1a')); lv.rotation.x = -Math.PI / 2; lv.position.y = 11.6; g.add(lv); const gl = softSprite('rgba(255,110,30,1)', 0.9); gl.scale.setScalar(9); gl.position.y = 12.5; g.add(gl);
  for (const a of [0.4, 2.2, 4.1]) { const st = mk(new T.BoxGeometry(0.5, 11, 0.1), '#ff7a2a', { emissive: new T.Color('#ff5a10'), emissiveIntensity: 0.9 }); st.position.set(Math.sin(a) * 5.4, 6, Math.cos(a) * 5.4); st.rotation.set(Math.cos(a) * 0.55, 0, -Math.sin(a) * 0.55); g.add(st); }
  g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
CF.towerD = (s, c, glow) => { const g = new T.Group(), col = c || '#1e1c22'; g.add(at3(mk(new T.CylinderGeometry(1.1, 1.6, 12, 8), col, { flatShading: true }), 0, 6, 0));
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4, sp = mk(new T.ConeGeometry(0.35, 2.6, 5), col); sp.position.set(Math.sin(a) * 0.9, 13.1, Math.cos(a) * 0.9); sp.rotation.set(Math.cos(a) * 0.25, 0, -Math.sin(a) * 0.25); g.add(sp); }
  for (let i = 0; i < 6; i++) g.add(at3(new T.Mesh(new T.PlaneGeometry(0.2, 0.4), basic(glow ? '#ff5a2a' : '#ffd890')), Math.sin(i) * 0.3, 3 + i * 1.5, 1.45 - i * 0.07));
  if (glow) { const gl = softSprite(glow, 1); gl.scale.setScalar(5); gl.position.y = 13.6; g.add(gl); g.userData.glow = gl; } g.scale.setScalar(s || 1); return g; };
CF.wallC = (s, c) => { const g = new T.Group(), col = c || '#8a8478'; g.add(at3(mk(new T.BoxGeometry(18, 3.2, 1.6), col, { flatShading: true }), 0, 1.6, 0));
  for (let i = 0; i < 18; i++) g.add(at3(mk(new T.BoxGeometry(0.55, 0.5, 1.6), col), -8.6 + i * 1.0, 3.45, 0));
  g.add(at3(mk(new T.BoxGeometry(2.2, 2.4, 0.3), '#3a2a1e'), 0, 1.2, 0.72)); for (const x of [-9.4, 9.4]) g.add(at3(mk(new T.CylinderGeometry(1.2, 1.3, 4.8, 8), col, { flatShading: true }), x, 2.4, 0));
  g.scale.setScalar(s || 1); return g; };
CF.barrel = (s, c) => { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.36, 0.36, 0.8, 12), c || '#8a5a32'); b.scale.set(1, 1, 1); b.position.y = 0.4; g.add(b);
  for (const y of [0.12, 0.68]) g.add(at3(mk(new T.TorusGeometry(0.37, 0.025, 4, 16), '#3a3a40'), 0, y, 0).rotateX(Math.PI / 2)); g.scale.setScalar(s || 1); return g; };
CF.goldpile = (s) => { const g = new T.Group(), rnd = srnd(57); for (let i = 0; i < 46; i++) { const a = rnd() * 6.283, r = rnd() * 2.4, h = Math.max(0.15, 1.3 - r * 0.5); const c = mk(new T.SphereGeometry(0.42 + rnd() * 0.3, 7, 5), i % 4 ? P.gold : '#ffd46a', GOLDM); c.scale.y = 0.45; c.position.set(Math.sin(a) * r, h * rnd(), Math.cos(a) * r * 0.7); g.add(c); }
  const gl = softSprite('rgba(255,210,100,1)', 0.4); gl.scale.setScalar(5); gl.position.y = 0.8; g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.web = (s) => { const g = new T.Group(), m = basic('#f4f4f8', { transparent: true, opacity: 0.55 }); for (let i = 1; i <= 4; i++) g.add(new T.Mesh(new T.TorusGeometry(i * 0.42, 0.015, 3, 8), m));
  for (let i = 0; i < 8; i++) { const l = new T.Mesh(new T.BoxGeometry(0.02, 3.4, 0.02), m); l.rotation.z = i * Math.PI / 8; g.add(l); } g.position.y = 1.6; const w = new T.Group(); w.add(g); w.scale.setScalar(s || 1); return w; };
CF.wrap = (s, col) => { const g = new T.Group(); const c = mk(new T.SphereGeometry(0.42, 10, 8), col || '#e8e6e0'); c.scale.set(1, 1.7, 1); c.position.y = 0.7; g.add(c); for (let i = 0; i < 5; i++) g.add(at3(mk(new T.TorusGeometry(0.42 - Math.abs(i - 2) * 0.06, 0.02, 3, 12), '#c8c6c0'), 0, 0.3 + i * 0.2, 0).rotateX(Math.PI / 2)); g.scale.setScalar(s || 1); return g; };
CF.spider = (s, c) => { const g = new T.Group(), col = c || '#2a2228'; const ab = mk(new T.SphereGeometry(0.6, 12, 10), col); ab.scale.set(1, 0.85, 1.2); ab.position.set(0, 0.9, -0.55); g.add(ab); g.add(at3(mk(new T.SphereGeometry(0.36, 10, 8), col), 0, 0.75, 0.35));
  for (const sx of [-1, 1]) for (const ey of [0.08, -0.06]) g.add(at3(new T.Mesh(new T.SphereGeometry(0.06, 6, 4), basic('#ff3a2a')), sx * 0.11, 0.85 + ey, 0.68));
  const legs = []; for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { const lg = new T.Group(); lg.position.set(sx * 0.3, 0.8, 0.35 - i * 0.22); const a = mk(new T.CylinderGeometry(0.04, 0.03, 1.1, 5), col); a.position.set(sx * 0.4, 0.15, 0); a.rotation.z = -sx * 1.0; lg.add(a); const b = mk(new T.CylinderGeometry(0.03, 0.02, 1.0, 5), col); b.position.set(sx * 0.95, -0.35, 0); b.rotation.z = sx * 0.5; lg.add(b); lg.rotation.y = (i - 1.5) * 0.35 * sx; g.add(lg); legs.push(lg); }
  g.userData.legs = legs; g.scale.setScalar(s || 1); return g; };
CF.pool = (s, c) => { const w = new T.Mesh(new T.CircleGeometry(3, 24), new T.MeshLambertMaterial({ color: c || '#1e3a4a', transparent: true, opacity: 0.85 })); w.rotation.x = -Math.PI / 2; w.position.y = 0.03; const g = new T.Group(); g.add(w); g.scale.setScalar(s || 1); return g; };
CF.span = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(14, 0.4, 1.3), c || '#5a504a', { flatShading: true }), 0, -0.2, 0)); g.scale.setScalar(s || 1); return g; };
CF.oring = (s) => { const g = new T.Group(); g.add(new T.Mesh(new T.TorusGeometry(0.17, 0.05, 8, 20), M(P.gold, GOLDM))); const gl = softSprite('rgba(255,220,120,1)', 0.8); gl.scale.setScalar(0.9); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.staff = (s, c, tip) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.035, 0.045, 2.0, 6), c || '#6a4a2a'), 0, 0.3, 0)); if (tip) { const t = softSprite(tip, 0.9); t.scale.setScalar(0.9); t.position.y = 1.35; g.add(t); g.userData.tip = t; } g.scale.setScalar(s || 1); return g; };
CF.axe = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.035, 0.035, 1.1, 6), '#6a4a2a'), 0, 0.25, 0)); const b = mk(new T.CylinderGeometry(0.28, 0.28, 0.05, 12, 1, false, 0, Math.PI), '#b8c0c8'); b.rotation.x = Math.PI / 2; b.rotation.z = Math.PI / 2; b.position.set(0, 0.7, 0.05); g.add(b); g.scale.setScalar(s || 1); return g; };
CF.blade = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.07, 1.0, 0.02), c || '#d8dee6'), 0, 0.6, 0), at3(mk(new T.BoxGeometry(0.26, 0.05, 0.06), '#6a5a3a'), 0, 0.08, 0)); g.scale.setScalar(s || 1); return g; };
CF.shield = (s, c) => { const m = mk(new T.CylinderGeometry(0.42, 0.42, 0.06, 16), c || '#7a5a32'); m.rotation.x = Math.PI / 2; const g = new T.Group(); g.add(m, at3(mk(new T.SphereGeometry(0.09, 8, 6), '#b8c0c8'), 0, 0, 0.05)); g.scale.setScalar(s || 1); return g; };
CF.bowL = (s) => { const g = new T.Group(); const a = mk(new T.TorusGeometry(0.5, 0.025, 5, 16, Math.PI), '#8a6a3a'); a.rotation.z = -Math.PI / 2; g.add(a); g.add(at3(new T.Mesh(new T.BoxGeometry(0.01, 1.0, 0.01), basic('#f4f0e0')), 0, 0, 0)); g.scale.setScalar(s || 1); return g; };
CF.crownP = (s) => { const g = new T.Group(); g.add(mk(new T.CylinderGeometry(0.42, 0.4, 0.16, 18, 1, true), P.gold, Object.assign({ side: T.DoubleSide }, GOLDM))); for (let i = 0; i < 6; i++) { const a = i * 1.047, p = mk(new T.ConeGeometry(0.06, 0.2, 4), P.gold, GOLDM); p.position.set(Math.sin(a) * 0.41, 0.16, Math.cos(a) * 0.41); g.add(p); } g.scale.setScalar(s || 1); return g; };
CF.ent = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.42, 0.6, 3.2, 7), '#6a4a2e', { flatShading: true }), 0, 1.6, 0)); const top = mk(new T.IcosahedronGeometry(1.5, 0), '#3f7a3a', { flatShading: true }); top.position.y = 3.7; g.add(top);
  for (const sx of [-1, 1]) { g.add(at3(new T.Mesh(new T.SphereGeometry(0.1, 8, 6), basic('#ffd25a')), sx * 0.2, 2.6, 0.42)); const ar = mk(new T.CylinderGeometry(0.1, 0.14, 1.6, 5), '#6a4a2e'); ar.position.set(sx * 0.75, 2.2, 0.1); ar.rotation.z = sx * 0.9; g.add(ar); }
  g.add(at3(mk(new T.BoxGeometry(0.34, 0.06, 0.05), '#3a2a1a'), 0, 2.3, 0.45)); g.scale.setScalar(s || 1); return g; };
CF.ghosts = (s) => { const g = new T.Group(), rnd = srnd(91), m = basic('#9affc8', { transparent: true, opacity: 0.32, depthWrite: false }); for (let i = 0; i < 14; i++) { const x = (rnd() - 0.5) * 9, z = (rnd() - 0.5) * 5; const b = new T.Mesh(new T.SphereGeometry(0.42, 10, 8), m); b.position.set(x, 1.5, z); const c = new T.Mesh(new T.ConeGeometry(0.5, 1.4, 10, 1, true), m); c.position.set(x, 0.7, z); g.add(b, c); }
  for (let i = 0; i < 6; i++) { const gl = softSprite('rgba(120,255,170,1)', 0.45); gl.scale.setScalar(4); gl.position.set(-4 + i * 1.6, 1.2, 0); g.add(gl); } g.scale.setScalar(s || 1); return g; };
CF.eyes2 = (s, c) => { const g = new T.Group(); for (const sx of [-1, 1]) { const e = softSprite(c || 'rgba(255,210,60,1)', 1); e.scale.set(0.9, 0.35, 1); e.position.x = sx * 0.9; g.add(e); const p = new T.Mesh(new T.BoxGeometry(0.08, 0.3, 0.02), basic('#1a0a00')); p.position.set(sx * 0.9, 0, 0.05); g.add(p); } g.scale.setScalar(s || 1); return g; };
CF.citadel = (s) => { const g = new T.Group(), c = '#eeeae0'; for (let i = 0; i < 5; i++) { const r = 7 - i * 1.3; g.add(at3(mk(new T.CylinderGeometry(r, r + 0.2, 2.2, 14), c, { flatShading: true }), 0, 1.1 + i * 2.2, 0)); for (let j = 0; j < 8; j++) { const a = j * 0.785 + i; g.add(at3(new T.Mesh(new T.PlaneGeometry(0.4, 0.6), basic('#ffd890')), Math.sin(a) * (r + 0.02), 1.2 + i * 2.2, Math.cos(a) * (r + 0.02)).rotateY(a)); } }
  g.add(at3(mk(new T.CylinderGeometry(0.5, 0.6, 5, 8), '#f8f6f0'), 0, 13.5, 0), at3(mk(new T.ConeGeometry(0.7, 1.6, 8), '#d8d4ca'), 0, 16.8, 0)); g.scale.setScalar(s || 1); return g; };
CF.ruin = (s) => { const g = new T.Group(), rnd = srnd(71); for (let i = 0; i < 9; i++) { const a = i * 0.698, h = 0.8 + rnd() * 2.4; g.add(at3(mk(new T.BoxGeometry(0.7, h, 0.7), '#8a867c', { flatShading: true }), Math.sin(a) * 4.6, h / 2, Math.cos(a) * 3.6 - 1).rotateY(rnd())); } g.scale.setScalar(s || 1); return g; };
CF.boatW = (s) => { const g = new T.Group(); const h = mk(new T.BoxGeometry(1.4, 0.5, 4.2), '#f4f0e6'); h.position.y = 0.25; g.add(h); const p = mk(new T.ConeGeometry(0.7, 1.2, 4), '#f4f0e6'); p.rotation.x = Math.PI / 2; p.position.set(0, 0.25, 2.7); g.add(p);
  g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 3.4, 6), '#c8b89a'), 0, 2.0, 0.2)); const sl = new T.Mesh(new T.PlaneGeometry(1.8, 2.4), basic('#fbf8f0', { side: T.DoubleSide })); sl.position.set(0, 2.2, 0.25); sl.rotation.y = Math.PI / 2; g.add(sl); g.scale.setScalar(s || 1); return g; };
CF.parch = (s) => { const g = new T.Group(); const p = mk(new T.BoxGeometry(1.4, 0.02, 1.0), '#e8d8a8'); g.add(p); const m = mk(new T.ConeGeometry(0.18, 0.3, 5), '#6a5a4a'); m.position.set(0.3, 0.15, -0.1); g.add(m); g.add(at3(new T.Mesh(new T.SphereGeometry(0.05, 6, 4), basic('#d02a2a')), 0.3, 0.32, -0.1)); g.scale.setScalar(s || 1); return g; };
CF.wolf = (s, c) => CF.dog(s || 1.1, { c: c || '#5a5a62', w: c ? '#f4f4f4' : '#8a8a92', e: c || '#4a4a52', prick: true });
CF.drop = (s, c) => { const m = mk(new T.CylinderGeometry(0.9, 1.2, 0.6, 12), c || '#ffc23a', { emissive: new T.Color(c ? '#c02a08' : '#ff9a10'), emissiveIntensity: 0.8 }); m.position.y = 0.3; const g = new T.Group(); g.add(m); g.scale.setScalar(s || 1); return g; };
/* hat on a vinyl head: pointed wizard hat */
const wizHat = (c, col) => { const h = c.userData.head, hm = M(col || '#7a7a84'); const br = new T.Mesh(new T.CylinderGeometry(1.05, 1.05, 0.05, 24), hm); br.position.set(0, 0.55, -0.02); br.rotation.x = -0.12; const cn = new T.Mesh(new T.ConeGeometry(0.62, 1.5, 18), hm); cn.position.set(0, 1.25, -0.12); cn.rotation.x = -0.22; h.add(br, cn); return c; };
/* deco: static props per station from data, items [CF name, scale, arg, x, y, z, rotY] */
ENVB.deco = (st, o) => (o.items || []).map(([n, sc, arg, x, y, z, ry]) => { const m = CF[n](sc, arg); place(m, st, x, y || 0, z); if (ry) m.rotation.y = ry; if (m.userData.isFire) m.userData.still = true; return m; });
CF.beacon = (s) => { const g = new T.Group(); for (let i = 0; i < 10; i++) { const l = mk(new T.CylinderGeometry(0.1, 0.12, 2.4, 5), '#6a4a2a'); const a = i * 0.63; l.position.set(Math.sin(a) * 0.5, 1.0, Math.cos(a) * 0.5); l.rotation.set(Math.cos(a) * 0.35, 0, -Math.sin(a) * 0.35); g.add(l); } g.add(at3(mk(new T.CylinderGeometry(1.2, 1.4, 0.3, 8), '#7a7a72'), 0, 0.15, 0)); g.scale.setScalar(s || 1); return g; };
/* ---- added for Harry Potter 1-8 (Nov 2026): generic castle, school + magic props, reusable ---- */
/* castle on a hill: keep + round towers with cone roofs, warm windows (generic fairy-tale shape) */
CF.castle = (s, c, roof) => { const g = new T.Group(), col = c || '#8e887c', rc = roof || '#34425e', wm = basic('#ffd88a');
  const hill = mk(new T.CylinderGeometry(15, 21, 6, 9), '#46563a', { flatShading: true }); hill.position.y = 1; g.add(hill);
  const keep = mk(new T.BoxGeometry(14, 9, 7), col, { flatShading: true }); keep.position.set(0, 8.5, 0); g.add(keep);
  const rf = mk(new T.CylinderGeometry(0.01, 5.6, 4, 4), rc, { flatShading: true }); rf.rotation.y = Math.PI / 4; rf.scale.set(1.75, 1, 0.9); rf.position.set(0, 15, 0); g.add(rf);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const w = new T.Mesh(new T.PlaneGeometry(0.7, 1.4), wm); w.position.set(-5 + i * 2, 7.4 + j * 2.8, 3.52); g.add(w); }
  for (const [x, z, r, h] of [[-9, 1, 1.7, 14], [9, 1, 1.7, 12], [-4.5, -4, 1.3, 19], [5, -3, 1.2, 21], [-13.5, -3, 1.2, 10], [13.5, -2, 1.3, 11], [0.5, -6, 1.9, 16]]) {
    const tw = mk(new T.CylinderGeometry(r, r * 1.08, h, 10), col, { flatShading: true }); tw.position.set(x, 4 + h / 2, z); g.add(tw);
    const cn = mk(new T.ConeGeometry(r * 1.3, r * 2.8, 10), rc, { flatShading: true }); cn.position.set(x, 4 + h + r * 1.4, z); g.add(cn);
    for (let k = 0; k < 3; k++) { const w = new T.Mesh(new T.PlaneGeometry(0.45, 0.9), wm); w.position.set(x, 6 + k * (h - 4) / 3, z + r + 0.05); g.add(w); } }
  g.scale.setScalar(s || 1); return g; };
/* floating candles: rows of small candles with warm glows; userData.kids bob in fx */
CF.candles = (s, n) => { const g = new T.Group(), rnd = srnd(57), m = M('#f4efe2'); g.userData.kids = [];
  for (let i = 0; i < (n || 26); i++) { const c = new T.Group(); c.add(new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.42, 8), m)); const f = softSprite('rgba(255,200,110,1)', 0.95); f.scale.setScalar(0.62); f.position.y = 0.36; c.add(f);
    c.position.set((rnd() - 0.5) * 15, 4.4 + rnd() * 1.8, -7 + rnd() * 9); g.add(c); g.userData.kids.push(c); }
  g.scale.setScalar(s || 1); return g; };
/* broom: stick along z (front +z), bristles at the back */
CF.broom = (s) => { const g = new T.Group(); const st = mk(new T.CylinderGeometry(0.045, 0.05, 2.0, 8), '#7a5232'); st.rotation.x = Math.PI / 2; g.add(st);
  const br = mk(new T.ConeGeometry(0.2, 0.75, 10), '#c8a060', { flatShading: true }); br.rotation.x = Math.PI / 2; br.position.z = -1.15; g.add(br); g.scale.setScalar(s || 1); return g; };
/* cauldron with glowing brew (c = brew colour) */
CF.cauldron = (s, c) => { const g = new T.Group(), col = c || '#5aff7a'; const pot = mk(new T.SphereGeometry(0.75, 16, 10, 0, 6.3, 0.9, 2.24), '#1e1e22'); pot.position.y = 0.72; g.add(pot);
  for (const a of [0, 2.1, 4.2]) g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 0.4, 6), '#1e1e22'), Math.sin(a) * 0.5, 0.15, Math.cos(a) * 0.5));
  const brew = new T.Mesh(new T.CircleGeometry(0.62, 18), basic(col)); brew.rotation.x = -Math.PI / 2; brew.position.y = 1.15; g.add(brew);
  const gl = softSprite(col.startsWith('#') ? 'rgba(120,255,150,1)' : col, 0.8); gl.scale.setScalar(2.6); gl.position.y = 1.5; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
/* stone goblet with blue flames */
CF.goblet = (s) => { const g = new T.Group(), c = '#8a8478'; g.add(at3(mk(new T.CylinderGeometry(0.7, 0.9, 0.3, 10), c, { flatShading: true }), 0, 0.15, 0), at3(mk(new T.CylinderGeometry(0.22, 0.3, 1.2, 8), c, { flatShading: true }), 0, 0.9, 0));
  g.add(at3(mk(new T.CylinderGeometry(0.85, 0.35, 0.9, 10, 1, true), c, { flatShading: true, side: T.DoubleSide }), 0, 1.9, 0)); const fl = [];
  for (let i = 0; i < 3; i++) { const f = softSprite(['rgba(90,170,255,1)', 'rgba(150,220,255,1)', 'rgba(230,245,255,1)'][i], 0.9); f.scale.setScalar(2.4 - i * 0.6); f.position.y = 2.6 + i * 0.25; g.add(f); fl.push(f); }
  g.userData.flames = fl; g.scale.setScalar(s || 1); return g; };
/* tall standing mirror */
CF.mirror = (s) => { const g = new T.Group(), f = '#c8a040'; g.add(at3(mk(new T.BoxGeometry(1.9, 3.2, 0.16), f, GOLDM), 0, 1.9, 0)); const gl = new T.Mesh(new T.PlaneGeometry(1.6, 2.9), basic('#a8c8e0')); gl.position.set(0, 1.9, 0.09); g.add(gl);
  for (const x of [-0.7, 0.7]) g.add(at3(mk(new T.BoxGeometry(0.16, 0.3, 0.7), f, GOLDM), x, 0.15, 0)); g.userData.glass = gl; g.scale.setScalar(s || 1); return g; };
/* checkerboard floor (n x n tiles) and a plain stone chess piece */
CF.checker = (s, n) => { const g = new T.Group(), N = n || 8, a = M('#e4dccb'), b = M('#2a2a32'); for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const t = new T.Mesh(new T.BoxGeometry(1, 0.1, 1), (i + j) % 2 ? a : b); t.position.set(i - N / 2 + 0.5, 0.05, j - N / 2 + 0.5); g.add(t); } g.scale.setScalar(s || 1); return g; };
CF.chessP = (s, c) => { const g = new T.Group(), col = c || '#e4dccb'; g.add(at3(mk(new T.CylinderGeometry(0.55, 0.65, 0.3, 12), col), 0, 0.15, 0), at3(mk(new T.CylinderGeometry(0.22, 0.48, 1.5, 12), col), 0, 1.05, 0), at3(mk(new T.SphereGeometry(0.38, 14, 10), col), 0, 2.05, 0));
  g.scale.setScalar(s || 1); return g; };
/* hourglass on a chain */
CF.hourglass = (s) => { const g = new T.Group(), gm = basic('#d8f0ff', { transparent: true, opacity: 0.5 }); for (const k of [-1, 1]) { const c = new T.Mesh(new T.ConeGeometry(0.16, 0.24, 12), gm); c.position.y = k * 0.12; if (k > 0) c.rotation.x = Math.PI; g.add(c); g.add(at3(mk(new T.CylinderGeometry(0.2, 0.2, 0.03, 12), P.gold, GOLDM), 0, k * 0.25, 0)); }
  const sd = mk(new T.ConeGeometry(0.1, 0.12, 10), '#e8c070'); sd.position.y = -0.17; g.add(sd); const gl = softSprite('rgba(255,225,150,1)', 0.6); gl.scale.setScalar(0.9); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* hedge wall (maze) */
CF.hedge = (s, len) => { const m = mk(new T.BoxGeometry(len || 6, 3.0, 0.9), '#2f5a2e', { flatShading: true }); m.position.y = 1.5; const g = new T.Group(); g.add(m); g.scale.setScalar(s || 1); return g; };
/* dark floating mist figures (soul-sucking guards, cave shades): c = colour */
CF.mist = (s, c) => { const g = new T.Group(), rnd = srnd(97), m = basic(c || '#14141c', { transparent: true, opacity: 0.6, depthWrite: false }); g.userData.kids = [];
  for (let i = 0; i < 9; i++) { const k = new T.Group(); k.add(at3(new T.Mesh(new T.SphereGeometry(0.4, 10, 8), m), 0, 1.5, 0)); const cn = new T.Mesh(new T.ConeGeometry(0.55, 1.8, 10, 1, true), m); cn.position.y = 0.6; cn.rotation.x = Math.PI; k.add(cn);
    k.position.set((rnd() - 0.5) * 8, rnd() * 1.5, (rnd() - 0.5) * 4); g.add(k); g.userData.kids.push(k); }
  g.scale.setScalar(s || 1); return g; };
/* a swarm of envelopes (animate with userData.kids) */
CF.letters = (s, n) => { const g = new T.Group(), rnd = srnd(23), m = M('#f6efdc'), d = basic('#c0302a'); g.userData.kids = [];
  for (let i = 0; i < (n || 40); i++) { const e = new T.Group(); e.add(new T.Mesh(new T.BoxGeometry(0.42, 0.03, 0.3), m)); e.add(at3(new T.Mesh(new T.CircleGeometry(0.05, 10), d), 0, 0.02, 0)); e.children[1].rotation.x = -Math.PI / 2;
    e.userData.a = rnd() * 6.3; e.userData.r = 0.8 + rnd() * 3; e.userData.h = rnd() * 3; e.userData.v = 0.6 + rnd() * 1.4; g.add(e); g.userData.kids.push(e); }
  g.scale.setScalar(s || 1); return g; };
CF.lettersTick = (g, t, k) => { (g.userData.kids || []).forEach((e) => { const u = e.userData, a = u.a + t * u.v * 2; e.position.set(Math.cos(a) * u.r * k, 0.6 + u.h * k + Math.sin(t * 3 + u.a) * 0.2, Math.sin(a) * u.r * 0.6 * k); e.rotation.set(t * u.v * 3, a, t * u.v * 2); }); };
/* small wooden door in a wall (cupboard under stairs) */
CF.doorW = (s, c) => { const g = new T.Group(), col = c || '#7a5232'; g.add(at3(mk(new T.BoxGeometry(1.4, 1.9, 0.12), '#4a3220'), 0, 0.95, 0), at3(mk(new T.BoxGeometry(1.2, 1.75, 0.14), col), 0, 0.9, 0.02));
  g.add(at3(mk(new T.SphereGeometry(0.06, 8, 6), P.gold, GOLDM), 0.45, 0.9, 0.12)); g.scale.setScalar(s || 1); return g; };
/* spell beam: inner white core + coloured glow tube, length along +z (use aimBeam) */
CF.spell = (s, c) => { const g = new T.Group(), col = c || '#ff3a2a'; const a = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1, 6), basic('#ffffff')); const b = new T.Mesh(new T.CylinderGeometry(0.15, 0.15, 1, 8), basic(col, { transparent: true, opacity: 0.55, depthWrite: false }));
  for (const m of [a, b]) { m.geometry.translate(0, 0.5, 0); m.geometry.rotateX(Math.PI / 2); g.add(m); } g.visible = false; g.scale.setScalar(s || 1); return g; };
/* translucent shield dome */
CF.dome = (s, c) => { const g = new T.Group(); const d = new T.Mesh(new T.SphereGeometry(10, 24, 12, 0, 6.3, 0, Math.PI / 2), basic(c || '#8ac8ff', { transparent: true, opacity: 0.16, depthWrite: false, side: T.DoubleSide })); g.add(d);
  const w = new T.Mesh(new T.SphereGeometry(10.05, 16, 8, 0, 6.3, 0, Math.PI / 2), basic(c || '#bfe4ff', { wireframe: true, transparent: true, opacity: 0.28 })); g.add(w); g.scale.setScalar(s || 1); return g; };
/* stone arch with a dark drifting veil */
CF.archV = (s) => { const g = new T.Group(), c = '#4a4a50'; for (const x of [-1.3, 1.3]) g.add(at3(mk(new T.BoxGeometry(0.5, 3.4, 0.5), c, { flatShading: true }), x, 1.7, 0)); const a = mk(new T.TorusGeometry(1.3, 0.25, 6, 14, Math.PI), c, { flatShading: true }); a.position.y = 3.4; g.add(a);
  const v = new T.Mesh(new T.PlaneGeometry(2.2, 3.6), basic('#0a0a10', { transparent: true, opacity: 0.75, side: T.DoubleSide })); v.position.y = 2.0; g.add(v); g.userData.veil = v; g.add(at3(mk(new T.BoxGeometry(4, 0.5, 1.6), c), 0, -0.05, 0)); g.scale.setScalar(s || 1); return g; };
/* tall shelf of glowing glass balls */
CF.orbShelf = (s) => { const g = new T.Group(), w = '#2a2a3a', om = basic('#a8dcff'); g.add(at3(mk(new T.BoxGeometry(5, 5.2, 0.6), w), 0, 2.6, -0.2));
  for (let r = 0; r < 4; r++) { g.add(at3(mk(new T.BoxGeometry(5, 0.08, 0.8), '#3a3a4a'), 0, 0.8 + r * 1.2, 0.2)); for (let i = 0; i < 7; i++) { g.add(at3(new T.Mesh(new T.SphereGeometry(0.17, 10, 8), om), -2.1 + i * 0.7, 1.05 + r * 1.2, 0.3)); } }
  const gl = softSprite('rgba(140,200,255,1)', 0.5); gl.scale.setScalar(6); gl.position.set(0, 2.8, 0.6); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* long dining table */
CF.tableL = (s, len) => { const g = new T.Group(), L = len || 10; g.add(at3(mk(new T.BoxGeometry(L, 0.14, 1.3), '#6a4528'), 0, 0.8, 0)); for (const x of [-L / 2 + 0.4, 0, L / 2 - 0.4]) g.add(at3(mk(new T.BoxGeometry(0.14, 0.8, 1.0), '#4a3020'), x, 0.4, 0));
  for (let i = 0; i < Math.floor(L / 1.2); i++) g.add(at3(mk(new T.SphereGeometry(0.16, 8, 6), ['#e8a040', '#c85a3a', '#f0d070'][i % 3]), -L / 2 + 0.7 + i * 1.2, 0.95, 0)); g.scale.setScalar(s || 1); return g; };
/* stone basin on a pedestal with glowing liquid */
CF.basin = (s, c) => { const g = new T.Group(), k = '#7a7a72'; g.add(at3(mk(new T.CylinderGeometry(0.25, 0.4, 1.0, 8), k, { flatShading: true }), 0, 0.5, 0), at3(mk(new T.CylinderGeometry(0.85, 0.45, 0.4, 12), k, { flatShading: true }), 0, 1.15, 0));
  const l = new T.Mesh(new T.CircleGeometry(0.75, 16), basic(c || '#6aff8a')); l.rotation.x = -Math.PI / 2; l.position.y = 1.36; g.add(l); const gl = softSprite('rgba(120,255,150,1)', 0.7); gl.scale.setScalar(2.2); gl.position.y = 1.6; g.add(gl); g.scale.setScalar(s || 1); return g; };
/* tall wooden cabinet */
CF.cabinet = (s, c) => { const g = new T.Group(), col = c || '#3a2618'; g.add(at3(mk(new T.BoxGeometry(1.5, 3.0, 0.9), col), 0, 1.5, 0)); for (const x of [-0.36, 0.36]) g.add(at3(mk(new T.BoxGeometry(0.66, 2.6, 0.06), '#4a3424'), x, 1.5, 0.47));
  g.add(at3(mk(new T.ConeGeometry(0.95, 0.5, 4), col), 0, 3.25, 0)); g.children[g.children.length - 1].rotation.y = Math.PI / 4; g.scale.setScalar(s || 1); return g; };
/* white marble tomb */
CF.tomb = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.6, 1.0, 1.3), '#ecebe6'), 0, 0.5, 0), at3(mk(new T.BoxGeometry(2.8, 0.18, 1.45), '#f8f8f4'), 0, 1.09, 0)); g.scale.setScalar(s || 1); return g; };
/* silvery cloak (flat fold) */
CF.cloak = (s) => { const g = new T.Group(); const p = new T.Mesh(new T.PlaneGeometry(1.0, 1.3, 4, 4), basic('#c8d8ec', { transparent: true, opacity: 0.6, side: T.DoubleSide })); p.rotation.z = 0.2; g.add(p); const gl = softSprite('rgba(200,220,255,1)', 0.4); gl.scale.setScalar(1.8); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* rat */
CF.rat = (s, c) => { const g = new T.Group(), col = c || '#8a847a'; const b = mk(new T.SphereGeometry(0.22, 12, 8), col); b.scale.set(0.9, 0.8, 1.4); b.position.y = 0.18; g.add(b); g.add(at3(mk(new T.SphereGeometry(0.13, 10, 8), col), 0, 0.22, 0.32));
  for (const x of [-0.08, 0.08]) g.add(at3(mk(new T.SphereGeometry(0.06, 8, 6), '#e8b0b0'), x, 0.35, 0.3)); const t = mk(new T.CylinderGeometry(0.02, 0.01, 0.5, 5), '#e8b0b0'); t.rotation.x = Math.PI / 2 - 0.3; t.position.set(0, 0.15, -0.45); g.add(t); g.scale.setScalar(s || 1); return g; };
/* chibi dragon (generic, original): c body, b belly, w wing; faces +z; userData.wings flap, userData.flame (hide/show), userData.mouth */
CF.dragon = (s, c, b, w) => { const g = new T.Group(), col = c || '#c0402a', bel = b || '#f0c070', wc = w || new T.Color(col).multiplyScalar(0.62).getStyle(), fs = { flatShading: true };
  const body = mk(new T.SphereGeometry(0.9, 14, 10), col, fs); body.scale.set(1.0, 0.85, 1.35); body.position.y = 1.1; g.add(body);
  const belly = mk(new T.SphereGeometry(0.72, 12, 8), bel, fs); belly.scale.set(0.9, 0.7, 1.2); belly.position.set(0, 0.95, 0.25); g.add(belly);
  const neck = mk(new T.CylinderGeometry(0.28, 0.4, 0.9, 8), col, fs); neck.position.set(0, 1.75, 1.05); neck.rotation.x = 0.7; g.add(neck);
  const hd = new T.Group(); hd.position.set(0, 2.15, 1.45); g.add(hd); hd.add(mk(new T.SphereGeometry(0.5, 14, 10), col, fs));
  const sn = mk(new T.BoxGeometry(0.55, 0.36, 0.6), col, fs); sn.position.set(0, -0.1, 0.45); hd.add(sn);
  for (const x of [-0.12, 0.12]) hd.add(at3(mk(new T.SphereGeometry(0.04, 6, 4), '#2a1010'), x, -0.02, 0.76));
  for (const x of [-1, 1]) { const e = mk(new T.SphereGeometry(0.13, 10, 8), '#ffffff'); e.position.set(x * 0.22, 0.14, 0.36); hd.add(e); const p = mk(new T.SphereGeometry(0.07, 8, 6), '#1a1418'); p.position.set(x * 0.22, 0.14, 0.47); hd.add(p);
    const hn = mk(new T.ConeGeometry(0.09, 0.45, 6), bel, fs); hn.position.set(x * 0.25, 0.5, -0.15); hn.rotation.x = -0.5; hd.add(hn); }
  for (let i = 0; i < 5; i++) { const sp = mk(new T.ConeGeometry(0.12, 0.3, 5), bel, fs); sp.position.set(0, 1.85 - i * 0.05, 0.6 - i * 0.42); g.add(sp); }
  let tz = -1.1; for (let i = 0; i < 5; i++) { const r = 0.32 - i * 0.055; const tl = mk(new T.SphereGeometry(r, 8, 6), col, fs); tl.position.set(0, 0.95 - i * 0.1, tz); g.add(tl); tz -= r * 1.6; }
  const tip = mk(new T.ConeGeometry(0.16, 0.35, 4), bel, fs); tip.position.set(0, 0.5, tz); tip.rotation.x = -Math.PI / 2; g.add(tip);
  for (const x of [-0.45, 0.45]) for (const z of [-0.5, 0.55]) g.add(at3(mk(new T.CylinderGeometry(0.13, 0.15, 0.55, 6), col, fs), x, 0.28, z));
  const wings = []; for (const sx of [-1, 1]) { const pv = new T.Group(); pv.position.set(sx * 0.6, 1.6, 0.1); const sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(sx * 2.2, 0.9); sh.lineTo(sx * 1.9, -0.2); sh.lineTo(sx * 1.4, -0.9); sh.lineTo(0, -0.6); sh.lineTo(0, 0);
    const wm = new T.Mesh(new T.ShapeGeometry(sh), M(wc, { side: T.DoubleSide, flatShading: true })); wm.rotation.x = -Math.PI / 2; pv.add(wm); g.add(pv); wings.push(pv); }
  g.userData.wings = wings; const mo = new T.Object3D(); mo.position.set(0, -0.1, 0.8); hd.add(mo); g.userData.mouth = mo; g.userData.headG = hd;
  const fl = new T.Group(); for (let i = 0; i < 6; i++) { const f = softSprite(['rgba(255,240,170,1)', 'rgba(255,170,60,1)', 'rgba(255,90,30,1)'][i % 3], 0.9); f.scale.setScalar(0.5 + i * 0.35); f.position.z = 0.3 + i * 0.5; fl.add(f); } fl.visible = false; mo.add(fl); g.userData.flame = fl;
  g.scale.setScalar(s || 1); return g; };
/* segmented serpent (generic snake); size baked in so the group scale stays 1; animate with userData.segs */
CF.serpent = (s, c, n) => { const g = new T.Group(), k = s || 1, col = c || '#4a8a3a', N = n || 14, segs = [];
  for (let i = 0; i < N; i++) { const r = k * (0.26 - i * 0.012 * (14 / N)); const m = mk(new T.SphereGeometry(Math.max(0.05 * k, r), 10, 8), i % 2 ? col : new T.Color(col).multiplyScalar(0.8).getStyle()); g.add(m); segs.push(m); }
  const h = segs[0]; h.scale.set(1.15, 0.9, 1.4); for (const x of [-1, 1]) { const e = mk(new T.SphereGeometry(0.07 * k, 8, 6), '#ffe24a'); e.position.set(x * 0.15 * k, 0.12 * k, 0.18 * k); h.add(e); const p = mk(new T.SphereGeometry(0.035 * k, 6, 4), '#141010'); p.position.set(x * 0.15 * k, 0.12 * k, 0.24 * k); h.add(p); }
  const tg = mk(new T.ConeGeometry(0.03 * k, 0.25 * k, 4), '#d02a3a'); tg.rotation.x = Math.PI / 2; tg.position.set(0, -0.05 * k, 0.42 * k); h.add(tg); g.userData.segs = segs; g.userData.size = k; return g; };
/* pose a serpent along a path: head at path(r), body trails behind (gap in seconds) */
CF.serpentTick = (g, path, r, gap) => { const segs = g.userData.segs, k = g.userData.size; g.position.set(0, 0, 0); g.rotation.set(0, 0, 0); g.scale.setScalar(1); segs.forEach((m, i) => { const p = path(r - i * (gap || 0.05)); m.position.set(p.x, p.y + Math.sin(r * 8 - i * 0.7) * 0.06 * k, p.z); });
  const a = path(r), b = path(r - 0.04); segs[0].rotation.y = Math.atan2(a.x - b.x, a.z - b.z); };
/* ---- added for the Hunger Games recap (Nov 2026): generic reusable props ---- */
/* white rose: bloom of soft petals on a green stem (s = size) */
CF.rose = (s, c) => { const g = new T.Group(), col = c || '#f6f4f0'; g.add(at3(mk(new T.CylinderGeometry(0.015, 0.015, 0.5, 5), '#3a7a3a'), 0, -0.25, 0));
  for (let i = 0; i < 6; i++) { const p = mk(new T.SphereGeometry(0.07, 8, 6), col); const a = i * 1.047; p.position.set(Math.sin(a) * 0.05, 0.02 + (i % 2) * 0.03, Math.cos(a) * 0.05); g.add(p); } g.add(at3(mk(new T.SphereGeometry(0.06, 8, 6), col), 0, 0.07, 0)); g.scale.setScalar(s || 1); return g; };
/* plain acoustic guitar (held in front) */
CF.guitar = (s, c) => { const g = new T.Group(), col = c || '#b8783a'; const b1 = mk(new T.CylinderGeometry(0.22, 0.22, 0.09, 16), col); b1.rotation.x = Math.PI / 2; const b2 = b1.clone(); b2.scale.setScalar(0.8); b2.position.y = 0.26; g.add(b1, b2);
  g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 0.1, 10), '#2a1a10'), 0, 0.1, 0.03)); g.children[g.children.length - 1].rotation.x = Math.PI / 2; g.add(at3(mk(new T.BoxGeometry(0.06, 0.6, 0.04), '#4a2e1a'), 0, 0.62, 0)); g.scale.setScalar(s || 1); return g; };
/* bottle (green glass) */
CF.bottle = (s, c) => { const g = new T.Group(), m = M(c || '#3a7a4a', { roughness: 0.2, transparent: true, opacity: 0.9 }); g.add(at3(new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 0.3, 10), m), 0, 0.15, 0), at3(new T.Mesh(new T.CylinderGeometry(0.035, 0.08, 0.14, 10), m), 0, 0.37, 0)); g.scale.setScalar(s || 1); return g; };
/* small parachute with a box (supply drop) */
CF.chute = (s, c) => { const g = new T.Group(); const cp = mk(new T.SphereGeometry(0.7, 12, 6, 0, 6.3, 0, 1.2), c || '#e8e4dc', { side: T.DoubleSide }); cp.position.y = 1.5; g.add(cp);
  for (let i = 0; i < 4; i++) { const a = i * 1.57 + 0.78, l = mk(new T.CylinderGeometry(0.008, 0.008, 1.3, 4), '#d8d4cc'); l.position.set(Math.sin(a) * 0.3, 0.75, Math.cos(a) * 0.3); l.rotation.set(Math.cos(a) * 0.4, 0, -Math.sin(a) * 0.4); g.add(l); }
  g.add(at3(mk(new T.BoxGeometry(0.34, 0.3, 0.34), '#c0b080'), 0, 0.0, 0)); g.scale.setScalar(s || 1); return g; };
/* horn of plenty: a big golden curved cone lying on its side, open end forward */
CF.horn = (s) => { const g = new T.Group(); for (let i = 0; i < 6; i++) { const r = 0.25 + i * 0.32, seg = mk(new T.CylinderGeometry(r + 0.32, r, 0.7, 14, 1, true), P.gold, Object.assign({ side: T.DoubleSide }, GOLDM)); seg.rotation.x = Math.PI / 2; seg.position.set(0, 0.6 + r * 0.9, -2.2 + i * 0.66); seg.rotation.x += 0.12 * (5 - i); g.add(seg); }
  g.scale.setScalar(s || 1); return g; };
/* glass ball of name slips (draw bowl) */
CF.bowlG = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.22, 0.3, 0.9, 10), '#5a4a3a'), 0, 0.45, 0)); const b = new T.Mesh(new T.SphereGeometry(0.55, 16, 12), new T.MeshStandardMaterial({ color: '#dff0ff', transparent: true, opacity: 0.3, roughness: 0.1 })); b.position.y = 1.4; g.add(b);
  const rnd = srnd(61); for (let i = 0; i < 26; i++) { const p = mk(new T.BoxGeometry(0.16, 0.02, 0.1), '#f4f0e4'); p.position.set((rnd() - 0.5) * 0.6, 1.08 + rnd() * 0.3, (rnd() - 0.5) * 0.6); p.rotation.set(rnd() * 3, rnd() * 3, 0); g.add(p); } g.scale.setScalar(s || 1); return g; };
/* insect nest hanging from a branch (grey papery ball) */
CF.nest = (s) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.45, 10, 8), '#a8a090', { flatShading: true }); b.scale.set(1, 1.3, 1); g.add(b); g.add(at3(mk(new T.CylinderGeometry(0.03, 0.03, 0.5, 5), '#5a4a3a'), 0, 0.75, 0)); g.scale.setScalar(s || 1); return g; };
/* handful of dark berries */
CF.berries = (s) => { const g = new T.Group(); for (let i = 0; i < 5; i++) { const b = mk(new T.SphereGeometry(0.045, 8, 6), '#2a1e4a', { roughness: 0.25 }); b.position.set(Math.sin(i * 1.3) * 0.06, (i % 2) * 0.04, Math.cos(i * 1.3) * 0.06); g.add(b); } g.scale.setScalar(s || 1); return g; };
/* invisible-wall shimmer: a tall translucent panel with a faint grid (force field / arena edge); userData.flash(k) brightens it */
CF.ffwall = (s, c) => { const g = new T.Group(), col = c || '#8ad8ff'; const m = basic(col, { transparent: true, opacity: 0.12, depthWrite: false, side: T.DoubleSide }); const p = new T.Mesh(new T.PlaneGeometry(22, 9), m); p.position.y = 4.5; g.add(p);
  const lm = basic(col, { transparent: true, opacity: 0.35, depthWrite: false }); for (let i = 0; i < 12; i++) { const v = new T.Mesh(new T.PlaneGeometry(0.04, 9), lm); v.position.set(-10.5 + i * 1.9, 4.5, 0.01); g.add(v); } for (let j = 0; j < 5; j++) { const h = new T.Mesh(new T.PlaneGeometry(22, 0.04), lm); h.position.set(0, 0.5 + j * 2, 0.01); g.add(h); }
  g.userData.flash = (k) => { m.opacity = 0.12 + k * 0.5; lm.opacity = 0.35 + k * 0.6; }; g.scale.setScalar(s || 1); return g; };

/* DRESS-START: generic costume layer for vin() chibis. Editor: Vinyl Chibi Editor (claude.ai artifact). Used in <film>-x.js as
   CF.x = (s) => { const c = vin({...}); dress(c, {...}); return c; };   Every part is off unless its key is set.
   coat (colour), coatLen 0..1 (hip..ankle), coatOpen (front gap 0..1.2 rad), coatCollar (bool), coatSleeve (bool, default true), coatLining (colour)
   cape (colour), capeLen 0..1 · vest (colour) · belt (colour), buckle (colour) · scarf (colour) · bandana (colour), bandanaTail (bool)
   gloves (colour), gloveCuff (colour) · boots (colour), bootH 0..1 · kneepads (colour) · shoulderPads (colour)
   prop: 'staff' | 'card' | 'cards' | 'sword' | 'bag' | 'book' | 'cup' (right hand), propColor, propLen (staff/sword length), propHand 'R'|'L'
   glow (colour, emissive tint on the prop) */
function dress(c, o) {
  o = o || {}; const u = c.userData, PI = Math.PI, TAU = PI * 2;
  const M = (col, x) => CK.mat(T, col, Object.assign({ roughness: 0.48 }, x || {}));
  const adult = u.head.position.y > 1.6, legH = adult ? 0.36 : 0.12, bodyH = adult ? 1.28 : 1.0;
  const bodyY = legH + 0.08 + 0.46 * bodyH * 0.92, ry = 0.46 * bodyH, rx = 0.47, armL = adult ? 0.56 : 0.42, ar = adult ? 0.1 : 0.095;
  const top = bodyY + ry * 0.86, waist = bodyY - 0.2219 * bodyH, D = new T.Group(); D.name = 'dress'; c.add(D); u.dress = D;
  const at = (m, x, y, z) => { m.position.set(x, y, z); return m; };
  /* body-hugging profile r(y) for coats/vests: follows the body above its middle, hangs straight and flares below */
  const prof = (y0, y1, k, flare) => { const pts = []; for (let i = 0; i <= 22; i++) { const y = y0 + (y1 - y0) * i / 22; let r;
      if (y >= bodyY) { const q = (y - bodyY) / ry; r = rx * Math.sqrt(Math.max(0.04, 1 - q * q)) * k; } else r = rx * k + (bodyY - y) * flare; pts.push(new T.Vector2(Math.max(0.05, r), y)); }
    return pts; };
  const shell = (pts, col, gap, back) => { const g = new T.LatheGeometry(pts, 40, back ? PI / 2 + gap : gap / 2, back ? PI - 2 * gap : TAU - gap); const m = new T.Mesh(g, M(col, { side: T.DoubleSide })); m.scale.z = 0.9; return m; };
  if (o.coat) {
    const len = o.coatLen == null ? 0.6 : o.coatLen, hem = (bodyY - ry * 0.45) * (1 - len) + 0.1 * len, gap = o.coatOpen == null ? 0.5 : o.coatOpen;
    const pts = prof(hem, top, 1.08, 0.16); D.add(shell(pts.reverse(), o.coat, gap));
    if (o.coatLining) { const L = shell(prof(hem + 0.02, top - 0.02, 1.05, 0.15), o.coatLining, gap); D.add(L); }
    if (o.coatCollar) { const cp = [new T.Vector2(0.27, top - 0.04), new T.Vector2(0.3, top + 0.08), new T.Vector2(0.36, top + 0.2)]; D.add(shell(cp, o.coat, gap + 0.25)); }
    if (o.coatSleeve !== false) for (const s of [-1, 1]) { const a = u['arm' + s], L = armL * 0.86, sl = new T.Mesh(new T.CylinderGeometry(ar * 1.32, ar * 1.42, L, 14), M(o.coat)); sl.position.y = -L / 2 + 0.02; a.add(sl); a.add(at(new T.Mesh(new T.SphereGeometry(ar * 1.36, 14, 10), M(o.coat)), 0, 0, 0)); }
  }
  if (o.vest) D.add(shell(prof(bodyY - ry * 0.55, top - 0.04, 1.05, 0.05).reverse(), o.vest, 0.7));
  if (o.cape) { const len = o.capeLen == null ? 0.7 : o.capeLen, hem = (bodyY - ry * 0.3) * (1 - len) + 0.08 * len, pts = [];
    for (let i = 0; i <= 12; i++) { const y = top + 0.02 - (top + 0.02 - hem) * i / 12; pts.push(new T.Vector2(0.36 + 0.3 * i / 12, y)); } D.add(shell(pts, o.cape, 0.15, true)); }
  if (o.belt) { const b = new T.Mesh(new T.TorusGeometry(rx * 0.9, 0.045, 8, 40), M(o.belt)); b.rotation.x = PI / 2; b.scale.set(1, 0.9, 1.4); b.position.y = waist; D.add(b);
    D.add(at(new T.Mesh(new T.BoxGeometry(0.14, 0.1, 0.04), M(o.buckle || '#d8b24a', { metalness: 0.5, roughness: 0.3 })), 0, waist, rx * 0.82)); }
  if (o.scarf) { const sc = new T.Mesh(new T.TorusGeometry(0.3, 0.09, 10, 28), M(o.scarf)); sc.rotation.x = PI / 2; sc.position.y = top + 0.02; D.add(sc);
    const tl = at(new T.Mesh(new T.BoxGeometry(0.13, 0.42, 0.06), M(o.scarf)), 0.15, top - 0.2, 0.33); tl.rotation.set(-0.25, 0, 0.12); D.add(tl); }
  if (o.shoulderPads) for (const s of [-1, 1]) { const p = new T.Mesh(new T.SphereGeometry(ar * 1.7, 14, 8, 0, TAU, 0, PI / 2), M(o.shoulderPads)); p.scale.set(1.1, 0.7, 1); p.position.y = 0.02; u['arm' + s].add(p); }
  if (o.bandana) { const HS = u.headSpace, b = new T.Mesh(new T.TorusGeometry(0.7, 0.06, 8, 40), M(o.bandana)); b.rotation.x = PI / 2 - 0.22; b.position.set(0, 0.33, -0.03); HS.add(b);
    if (o.bandanaTail !== false) for (const s of [-1, 1]) { const t = at(new T.Mesh(new T.BoxGeometry(0.1, 0.32, 0.03), M(o.bandana)), s * 0.1, 0.12, -0.72); t.rotation.set(0.3, 0, s * 0.35); HS.add(t); } }
  if (o.gloves) for (const s of [-1, 1]) { const a = u['arm' + s];
    const h = at(new T.Mesh(new T.SphereGeometry(ar * 1.32, 14, 10), M(o.gloves)), 0, -armL, 0); h.scale.set(1, 1.08, 0.9); a.add(h);
    a.add(at(new T.Mesh(new T.CylinderGeometry(ar * 1.0, ar * 0.95, 0.14, 12), M(o.gloveCuff || o.gloves)), 0, -armL + 0.13, 0)); }
  if (o.boots) { const bh = o.bootH == null ? 0.7 : o.bootH, H = (legH + 0.12) * bh + 0.06;
    for (const s of [-1, 1]) { D.add(at(new T.Mesh(new T.CylinderGeometry(0.15, 0.155, H, 14), M(o.boots)), s * 0.17, H / 2 + 0.03, 0));
      const sh = at(new T.Mesh(new T.SphereGeometry(0.172, 16, 12), M(o.boots)), s * 0.18, 0.085, 0.06); sh.scale.set(1, 0.64, 1.38); D.add(sh); } }
  if (o.kneepads && adult) for (const s of [-1, 1]) { const k = at(new T.Mesh(new T.SphereGeometry(0.1, 12, 8), M(o.kneepads)), s * 0.17, legH * 0.62 + 0.08, 0.11); k.scale.set(1, 1.1, 0.6); D.add(k); }
  if (o.prop) { const a = u[o.propHand === 'L' ? 'arm-1' : 'arm1'], g = new T.Group(), pc = o.propColor || '#7a5a3a', len = o.propLen || 1, gl = o.glow ? { emissive: new T.Color(o.glow), emissiveIntensity: 0.8 } : {};
    g.position.set(0, -armL, 0.06); g.rotation.z = (o.propHand === 'L' ? 1 : -1) * 0.4; a.add(g); u.prop = g;
    if (o.prop === 'staff') { const L = 2.2 * len; g.add(at(new T.Mesh(new T.CylinderGeometry(0.035, 0.035, L, 10), M(pc, gl)), 0, L * 0.18, 0)); for (const y of [L * 0.68, -L * 0.32]) g.add(at(new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.08, 10), M('#c8c8cc', { metalness: 0.5 })), 0, y, 0)); }
    else if (o.prop === 'sword') { const L = 1.1 * len; g.add(at(new T.Mesh(new T.BoxGeometry(0.07, L, 0.02), M('#d8dce2', Object.assign({ metalness: 0.6, roughness: 0.25 }, gl))), 0, L / 2 + 0.12, 0), at(new T.Mesh(new T.BoxGeometry(0.28, 0.04, 0.06), M(pc)), 0, 0.1, 0), at(new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.2, 8), M(pc)), 0, -0.02, 0)); }
    else if (o.prop === 'card' || o.prop === 'cards') { const n = o.prop === 'cards' ? 5 : 1;
      for (let i = 0; i < n; i++) { const cg = new T.Group(); cg.rotation.z = (i - (n - 1) / 2) * 0.22; const f = at(new T.Mesh(new T.BoxGeometry(0.17, 0.24, 0.008), M('#fbfaf6', gl)), 0, 0.14, 0.01 + i * 0.002); const b = at(new T.Mesh(new T.BoxGeometry(0.17, 0.24, 0.008), M(pc, gl)), 0, 0.14, -0.002 + i * 0.002); cg.add(f, b); cg.position.z = 0.06; g.add(cg); } }
    else if (o.prop === 'bag') g.add(at(new T.Mesh(new T.BoxGeometry(0.4, 0.3, 0.14), M(pc)), 0, -0.2, 0), at(new T.Mesh(new T.TorusGeometry(0.1, 0.02, 6, 16, PI), M(pc)), 0, -0.05, 0));
    else if (o.prop === 'book') g.add(at(new T.Mesh(new T.BoxGeometry(0.26, 0.34, 0.07), M(pc)), 0, 0, 0.06));
    else if (o.prop === 'cup') g.add(at(new T.Mesh(new T.CylinderGeometry(0.08, 0.065, 0.18, 14), M(pc)), 0, 0.06, 0.08)); }
  return c;
}
/* DRESS-END */

/* ---- custom models (Nov 2026): plug any hand-built Three.js figure into the story kit ----
   actor(root, parts, s): root = your Group (feet at y=0, facing +z); parts = { head, armR, armL, handR, handL, setExpr, tick } (all optional).
   armR/armL = shoulder pivot groups with the arm hanging down -y; armR is the arm on the +x side (screen right when facing camera), like vin's arm1.
   Size: an adult vin chibi is about 3.6 units tall at AD, so scale your model to match (s).
   Use in <film>-x.js:  CF.hero = (s) => { const m = myBuilder(); return actor(m.root, { head: m.parts.head, armR: m.parts.leftArm, armL: m.parts.rightArm }, 1.8 * (s || 1)); };
   The kit poses arms by rotation (x forward, z outward), so build arms as pivot groups at the shoulder. Faces built from meshes have no expressions unless you pass setExpr. */
if (!T.CapsuleGeometry) T.CapsuleGeometry = function (r, len, capSeg, radSeg) { const pts = [], n = capSeg || 4; for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + (i / n) * (Math.PI / 2); pts.push(new T.Vector2(Math.max(1e-4, Math.cos(a) * r), Math.sin(a) * r - len / 2)); }
  for (let i = 0; i <= n; i++) { const a = (i / n) * (Math.PI / 2); pts.push(new T.Vector2(Math.max(1e-4, Math.cos(a) * r), Math.sin(a) * r + len / 2)); } return new T.LatheGeometry(pts, radSeg || 8); };
function actor(root, parts, s) {
  parts = parts || {}; const g = new T.Group(), u = g.userData; g.add(root);
  const dummy = (y) => { const o = new T.Group(); o.position.y = y || 0; g.add(o); return o; };
  const head = parts.head || dummy(2.4), R = parts.armR || dummy(1.6), L = parts.armL || dummy(1.6);
  R.userData.hand = parts.handR || R; L.userData.hand = parts.handL || L;
  let ex = 'happy';
  Object.assign(u, { vinyl: true, custom: true, head, headSpace: head, arm1: R, 'arm-1': L, hand1: R.userData.hand, 'hand-1': L.userData.hand, arms: { L, R }, eyes: [], body: new T.Object3D(), lap: new T.Object3D(),
    setExpr: (n) => { if (n !== ex) { ex = n; if (parts.setExpr) parts.setExpr(n); } }, expr: () => ex,
    tick: (t, o) => { root.position.y = 0.012 * Math.sin(t * 2.4); if (parts.tick) parts.tick(t, o); } });
  g.scale.setScalar(s || 1); return g;
}

/* ---- comic look (Nov 2026): EP.toon = true -> every CAST object gets 3-step cel shading (MeshToonMaterial) + inverted-hull ink outline.
   EP.toon can also be an object: { ink: '#15141a', w: 0.018 (outline width, object units), steps: [95, 160, 205] }. Sets stay as they are. ---- */
function toon(root, opt) {
  opt = Object.assign({ ink: '#15141a', w: 0.018, steps: [95, 160, 205] }, typeof opt === 'object' ? opt : {});
  const TC = toon.cache || (toon.cache = { mats: new Map(), grad: null, out: new Map() });
  if (!TC.grad) { const d = new Uint8Array(opt.steps); TC.grad = new T.DataTexture(d, d.length, 1, T.LuminanceFormat); TC.grad.minFilter = TC.grad.magFilter = T.NearestFilter; TC.grad.generateMipmaps = false; TC.grad.needsUpdate = true; }
  const okey = opt.ink + '|' + opt.w; let OUT = TC.out.get(okey);
  if (!OUT) { OUT = new T.MeshBasicMaterial({ color: opt.ink, side: T.BackSide }); OUT.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = vec3( position ) + normalize( normal ) * ' + opt.w.toFixed(4) + ';'); }; OUT.customProgramCacheKey = () => 'ink' + okey; TC.out.set(okey, OUT); }
  const conv = (m) => { if (!m || !m.isMeshStandardMaterial) return m; let n = TC.mats.get(m); if (n) return n;
    n = new T.MeshToonMaterial({ color: m.color, map: m.map, gradientMap: TC.grad, transparent: m.transparent, opacity: m.opacity, side: m.side, depthWrite: m.depthWrite, polygonOffset: m.polygonOffset, polygonOffsetFactor: m.polygonOffsetFactor, polygonOffsetUnits: m.polygonOffsetUnits, emissive: m.emissive, emissiveIntensity: m.emissiveIntensity, emissiveMap: m.emissiveMap, alphaTest: m.alphaTest, vertexColors: m.vertexColors, flatShading: m.flatShading });
    TC.mats.set(m, n); return n; };
  const list = []; root.traverse((o) => { if (o.isMesh && !o.userData.ink) list.push(o); });
  for (const o of list) { const solid = Array.isArray(o.material) ? o.material.every((m) => m.isMeshStandardMaterial && !m.transparent) : (o.material && o.material.isMeshStandardMaterial && !o.material.transparent);
    o.material = Array.isArray(o.material) ? o.material.map(conv) : conv(o.material);
    if (solid && o.geometry && o.geometry.attributes.normal) { const h = new T.Mesh(o.geometry, OUT); h.userData.ink = true; h.raycast = () => {}; o.add(h); } }
  return root;
}

/* ---- lively bed (Nov 2026): bright pop-ish loop, ~112 bpm, C G Am F. Soft like FK.chillBed (no sub bass, light clicks instead of kick).
   EP.bed = 'lively' switches the story kit to it. calm(t) -> pads + sparse plucks only. ---- */
FK.livelyBed = function (o) {
  const DUR = o.DUR, calm = o.calm || (() => false), gain = o.gain == null ? 0.75 : o.gain, V = o.vol == null ? 1 : o.vol;
  const AU = VE.audio, hz = VE.midiHz, BT = 60 / 112, BAR = BT * 4;
  const CH = [[60, 64, 67], [59, 62, 67], [57, 60, 64], [57, 60, 65]], BS = [48, 55, 57, 53], ARP = [0, 1, 2, 1, 0, 2, 1, 2];
  const MEL = [[76, 74, 72, 74], [74, 71, 74, 79], [72, 76, 72, 69], [69, 72, 77, 76]];
  function play(base, from) {
    const t1 = DUR - 1.6;
    for (let b = 0, tb = 0.3; tb < t1; b++, tb += BAR) {
      if (tb + BAR < from) continue; const c = calm(tb), k = b % 4, ch = CH[k], len = Math.min(BAR, t1 - tb);
      const at = (x) => { const tt = tb + x; return tt >= from && tt < t1 ? base + tt : -1; };
      let p = at(0); if (p >= 0) for (const n of ch) AU.tone(p, hz(n), Math.max(0.2, len - 0.2), { type: 'sine', vol: 0.011 * V, att: 0.25, rel: 0.5 });
      for (const q of c ? [0, 2] : [0, 1.5, 2, 3.5]) { p = at(q * BT); if (p >= 0) AU.tone(p, hz(BS[k] + (q === 1.5 || q === 3.5 ? 7 : 0)), BT * 0.8, { type: 'triangle', vol: 0.022 * V, att: 0.01, rel: 0.2 }); }
      for (let i = 0; i < 8; i += c ? 2 : 1) { p = at(i * BT / 2); if (p >= 0) AU.tone(p, hz(ch[ARP[i]] + 12), 0.18, { type: 'triangle', vol: 0.012 * V, att: 0.005, rel: 0.16 }); }
      if (!c) { for (const q of [1, 3]) { p = at(q * BT); if (p >= 0) AU.noise(p, 0.09, { type: 'bandpass', f: 1800, q: 0.9, vol: 0.016 * V }); }
        for (let i = 0; i < 4; i++) { p = at(i * BT + BT / 2); if (p >= 0 && b % 2 === 0) AU.noise(p, 0.04, { type: 'highpass', f: 7500, vol: 0.010 * V }); }
        for (const q of [0, 2]) { p = at(q * BT); if (p >= 0) AU.noise(p, 0.05, { type: 'bandpass', f: 900, q: 1.2, vol: 0.012 * V }); }
        if (b % 8 >= 4) MEL[k].forEach((n, i) => { const pp = at(i * BT); if (pp >= 0) AU.tone(pp, hz(n), BT * 0.9, { type: 'sine', vol: 0.014 * V, att: 0.02, rel: 0.4 }); }); }
    }
  }
  return { play(base, from, A) {
    if (A && A.bus) { A.bus.gain.setValueAtTime(gain, base + Math.max(0, from)); A.bus.gain.setValueAtTime(gain, base + DUR - 0.6); }
    if (o.voice) o.voice.play(base, from, A);
    play(base, from);
  } };
};

/* ---- slim build (Nov 2026): slim(c, o) reshapes a vin() chibi toward ~2.2-head figurine proportions (smaller head, narrow body, longer legs) so plain
   extras sit well next to hand-built models. o = { head: 0.82, w: 0.64, d: 0.76, leg: 0.34 (extra leg length), keepH: true (keep the overall height) }.
   Call it last (after dress()/tag()); capes/coats/vests follow the body, boots and knee pads are not adjusted. Poses, faces and props keep working. ---- */
function slim(c, o) {
  const u = c.userData; if (u.slim || !u.head || !u.arm1) return c; const adult = u.head.position.y > 1.6;
  o = Object.assign({ head: 0.82, w: 0.64, d: 0.76, leg: adult ? 0.34 : 0.2, keepH: true }, o || {});
  const V = new T.Vector3(), h0 = new T.Box3().setFromObject(c).getSize(V).y, ch = c.children.slice(), up = new T.Group(); up.position.y = o.leg;
  const body = ch.find((m) => m.isMesh && m.geometry.type === 'SphereGeometry' && Math.abs(m.geometry.parameters.radius - 0.46) < 1e-6); if (!body) return c;
  for (const m of ch) { if (!m.isMesh || m === body) continue;
    if (m.geometry.type === 'CylinderGeometry') { const len = m.geometry.parameters.height; m.scale.set(0.84, (len + o.leg) / len, 0.84); m.position.y += o.leg / 2; m.position.x *= 0.82; }   // legs
    else if (m.geometry.type === 'SphereGeometry') { m.position.x *= 0.82; m.scale.multiplyScalar(0.92); } }                                                             // shoes
  const bw = new T.Group(); bw.scale.set(o.w, 1, o.d); bw.add(body); if (u.dress) bw.add(u.dress); up.add(bw);
  for (const s of [-1, 1]) { const a = u['arm' + s]; a.position.x *= o.w * 1.04; a.scale.set(0.9, 1, 0.9); up.add(a); }
  const P = u.head.position.y - 0.52, hw = new T.Group(); hw.position.y = P * (1 - o.head) - 0.04; hw.scale.setScalar(o.head); hw.add(u.head); up.add(hw);
  if (u.badge) { u.badge.position.y += o.leg; u.badge.position.z *= o.d; } c.add(up); u.slim = true;
  if (o.keepH) { const h1 = new T.Box3().setFromObject(c).getSize(V).y; if (h1 > 0) c.scale.multiplyScalar(h0 / h1); }
  return c;
}
