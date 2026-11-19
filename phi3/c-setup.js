/* Part C: stations + setup.  VIL = one Isan village at night (most beats), SUTTA = Buddha-era grove + palace wall, HOSP = dorm + ward */
const ST = { VIL: [0, 0, 0], SUTTA: [300, 0, 0], HOSP: [600, 0, 0] };
let S = null;
let rs = 7; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
function add(st, o, x, y, z) { S.st[st].add(o); o.position.set(x || 0, y || 0, z || 0); return o; }
function slab(w, d, top, soil) {
  const g = new T.Group(); const t = mk(new T.BoxGeometry(w, 0.5, d), top || '#3e5a48'); t.position.y = -0.25; g.add(t);
  const s = mk(new T.CylinderGeometry(Math.max(w, d) * 0.62, Math.max(w, d) * 0.3, 3.2, 8), soil || '#4a3a30'); s.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); s.rotation.y = Math.PI / 8; s.position.y = -2.1; g.add(s);
  return g;
}
/* village layout (VIL local) */
const HX = { left: [-21, -1.5, 0.12], h0: [-14, -1, 0], h1: [-6.5, -1.5, -0.05], red: [9, -1, 0], gran: [17, -1.2, -0.06], right: [24, -1.5, 0.1] };
const SALA = [1, -2.2];

function setupScene(scene) {
  const s = { st: {}, c: {} }; S = s;
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  s.pt = new T.PointLight('#ffb070', 0, 18); scene.add(s.pt);
  scene.fog = new T.Fog('#141a34', 40, 120); s.fog = scene.fog;
  for (const k in ST) { const g = new T.Group(); g.position.set(ST[k][0], ST[k][1], ST[k][2]); scene.add(g); s.st[k] = g; }

  /* ---------- VIL ---------- */
  { const C = {}; s.c.vil = C;
    add('VIL', slab(70, 34, '#3a5240', '#3a2c26'));
    add('VIL', mk(new T.BoxGeometry(70, 0.03, 3.2), '#7a6a50'), 0, 0.01, 4.2);
    C.river = mk(new T.BoxGeometry(140, 0.1, 12), '#1e3a6a', { roughness: 0.3 }); add('VIL', C.river, 0, 0.02, -24);
    for (let i = 0; i < 14; i++) add('VIL', mk(new T.BoxGeometry(5 + rnd() * 3, 0.05, 2.6), i % 2 ? '#56743e' : '#4c6a3a'), -30 + i * 4.6, 0.02, -10 - rnd() * 6);
    for (let i = 0; i < 12; i++) add('VIL', palm(0.8 + rnd() * 0.35), -30 + i * 5.3 + rnd() * 2, 0, -8 - rnd() * 7);
    for (let i = 0; i < 10; i++) add('VIL', tree(1 + rnd() * 0.6, '#2f5a46'), -32 + i * 7 + rnd() * 2, 0, -15 - rnd() * 3);
    C.houses = {};
    for (const k in HX) { const [x, z, r] = HX[k]; const h = isanHouse(k === 'red' ? { wall: '#9a7656' } : k === 'gran' ? { w: 3.4, d: 2.8, wall: '#8a6a4a' } : {}); add('VIL', h, x, 0, z); h.rotation.y = r; C.houses[k] = h; }
    C.sala = add('VIL', sala(), SALA[0], 0, SALA[1]);
    C.moon = add('VIL', moon(1.6), -9, 16, -30);
    /* the legend pair (silhouette style, bald) */
    C.lmonk = monk({ body: '#5a4632', sleeve: '#5a4632', sash: '#433424', skin: '#9a8a7a', eyeGlow: '#ffe2a0', s: 1.05 }); add('VIL', C.lmonk, 0, 0, 0);
    C.lnun = chibi({ body: '#d8d4c8', sleeve: '#d8d4c8', robe: true, bald: true, skin: '#9a8a7a', eyeGlow: '#ffe2a0', s: 0.98 }); add('VIL', C.lnun, 0, 0, 0);
    C.ldog = dog(); C.ldog.scale.setScalar(0.62); C.lmonk.add(C.ldog); C.ldog.position.set(0.25, 0.55, 0.45); C.ldog.rotation.y = Math.PI / 2;
    C.lcat = cat(); C.lcat.scale.setScalar(0.8); C.lnun.add(C.lcat); C.lcat.position.set(0.2, 0.7, 0.42); C.lcat.rotation.y = -Math.PI / 2;
    C.lglow = softSprite('rgba(255,220,160,1)', 0); C.lglow.scale.set(5, 5, 1); add('VIL', C.lglow, 0, 1.4, 0);
    /* family of H1 (porch) */
    C.mom = chibi({ body: '#8a5a7a', sleeve: '#8a5a7a', dress: true, hair: '#2a1a14', hairStyle: 'bun', s: 0.95 }); add('VIL', C.mom, 0, 0, 0);
    C.kid = chibi({ body: '#4a8ab0', sleeve: '#4a8ab0', hair: '#2a1a14', s: 0.62, cheek: '#f0a0a0' }); add('VIL', C.kid, 0, 0, 0);
    C.bushes = []; for (const k of ['left', 'h0', 'h1', 'red', 'gran', 'right']) for (const dx of [-1.6, 1.0]) { const b = bush(dx < 0 ? '#3f8a4a' : '#7a5a2a', 1.1); const [x, z] = HX[k]; add('VIL', b, x + dx, 0, z + 3.4); C.bushes.push(b); }
    C.police = chibi({ body: '#7a6a4a', sleeve: '#7a6a4a', belt: '#2a2a2a', hat: 'cap', hatC: '#5a4a30', s: 1.0 }); add('VIL', C.police, 0, 0, 0);
    C.torch = softSprite('rgba(255,250,210,1)', 0); C.torch.scale.set(2.2, 2.2, 1); add('VIL', C.torch, 0, 0, 0);
    /* real monk on alms round (dawn) + kneeling villager */
    C.rmonk = monk({ s: 1.0 }); add('VIL', C.rmonk, 0, 0, 0);
    C.bowl = mk(new T.SphereGeometry(0.26, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), '#2a2a32'); C.rmonk.add(C.bowl); C.bowl.position.set(0, 0.72, 0.52);
    C.giver = chibi({ body: '#d0c0a0', sleeve: '#d0c0a0', dress: true, hair: '#2a1a14', hairStyle: 'bun', s: 0.9 }); setSit(C.giver, true); add('VIL', C.giver, 0, 0, 0);
    /* phone + chat (LINE-style) */
    C.phone = phone(); add('VIL', C.phone, 0, 0, 0);
    C.chats = [['ด่วน! พระอุ้มหมามาแล้ว', '#ffffff'], ['ถึงอำเภอข้างๆ แล้ว!!', '#06c755'], ['ส่งต่อ 10 กลุ่มด่วน', '#ffffff'], ['จริงเหรอ?', '#06c755']].map((c) => { const b = chatBubble(c[0], c[1], 1.72); C.phone.add(b); return b; });
    C.ruleCard = card([['ยามวิกาล', 90, '#7a1828'], ['เที่ยงวัน → รุ่งเช้า', 44, '#2a2018', 600]], 2.4, 1.2, { border: '#7a1828', top: 100 }); add('VIL', C.ruleCard, 0, 0, 0);
    /* ปอบ chapter */
    C.villagers = [];
    const VC = [['#6a5a3a', 'pakoma'], ['#7a4a5a', 0, 1], ['#4a6a5a', 'pakoma'], ['#8a6a4a', 0, 1], ['#5a5a7a', 'pakoma'], ['#7a6a3a', 0, 1], ['#4a5a6a', 'pakoma'], ['#8a5a4a', 0, 1]];
    VC.forEach((v) => { const c = chibi({ body: v[0], sleeve: v[0], hat: v[1] || undefined, hatC: '#3a7a9a', dress: !!v[2], hair: '#2a1a14', hairStyle: v[2] ? 'bun' : undefined, s: 0.92 }); add('VIL', c, 0, 0, 0); C.villagers.push(c); });
    C.sorc = chibi({ body: '#3a3440', sleeve: '#3a3440', hair: '#3a3030', s: 1.0, brow: '#2a2020' }); add('VIL', C.sorc, 0, 0, 0);
    C.pob = chibi({ body: '#5a8a5a', sleeve: '#5a8a5a', skin: '#a8d0a0', hairStyle: 'long', hair: '#2a4a2a', ghost: '#5aff8a', eyeGlow: '#ff5060', s: 1.05 }); add('VIL', C.pob, 0, 0, 0);
    C.plate = new T.Group(); C.plate.add(mk(new T.CylinderGeometry(0.45, 0.35, 0.08, 14), '#e8e4da')); { const m = mk(new T.BoxGeometry(0.4, 0.12, 0.28), '#c8586a'); m.position.y = 0.09; C.plate.add(m); } add('VIL', C.plate, 0, 0, 0);
    C.kidB = chibi({ body: '#5a7a4a', sleeve: '#5a7a4a', hair: '#3a3030', s: 0.62 }); add('VIL', C.kidB, 0, 0, 0);
    C.wreaths = []; for (let i = 0; i < 2; i++) { const g = new T.Group(); const r = mk(new T.TorusGeometry(0.55, 0.16, 8, 20), '#f2f2f2'); r.position.y = 1.3; g.add(r); for (let k = 0; k < 8; k++) { const f = mk(new T.SphereGeometry(0.1, 6, 5), k % 2 ? '#ffd24a' : '#ffffff'); f.position.set(Math.cos(k * 0.785) * 0.55, 1.3 + Math.sin(k * 0.785) * 0.55, 0.12); g.add(f); } const st = mk(new T.BoxGeometry(0.06, 1.3, 0.06), '#6a4a30'); st.position.y = 0.65; g.add(st); add('VIL', g, SALA[0] - 1.2 + i * 2.4, 0.4, SALA[1] - 1.2); C.wreaths.push(g); }
    C.animals = [buffalo(), dog('#6a5040'), cat('#c8a070')]; C.animals.forEach((a, i) => { add('VIL', a, 6.0 + i * 1.7, 0, 3.0 - i * 0.2); a.rotation.y = -0.5; });
    C.mor = chibi({ body: '#f2f0ea', sleeve: '#f2f0ea', hat: 'band', hatC: '#c0202c', hair: '#4a4040', s: 1.0 }); add('VIL', C.mor, 0, 0, 0);
    C.bowlC = mk(new T.CylinderGeometry(0.45, 0.3, 0.3, 14), '#c9a46a', { metalness: 0.5 }); add('VIL', C.bowlC, 0, 0, 0);
    C.coins = []; for (let i = 0; i < 10; i++) { const c = mk(new T.CylinderGeometry(0.12, 0.12, 0.03, 10), P.gold, GOLDM); add('VIL', c, 0, 0, 0); C.coins.push(c); }
    C.gate = new T.Group(); add('VIL', C.gate, -28, 0, 4.2); for (const z of [-2, 2]) { const p = mk(new T.CylinderGeometry(0.14, 0.16, 2.6, 6), '#6a4a30'); p.position.set(0, 1.3, z); C.gate.add(p); }
    C.rope = new T.Group(); C.gate.add(C.rope); { const r = mk(new T.CylinderGeometry(0.04, 0.04, 4, 5), '#c8b878'); r.rotation.x = Math.PI / 2; r.position.y = 2.1; C.rope.add(r); for (let k = 0; k < 9; k++) { const t2 = mk(new T.ConeGeometry(0.1, 0.5, 4), '#b8c070'); t2.rotation.x = Math.PI; t2.position.set(0, 1.8, -1.8 + k * 0.45); C.rope.add(t2); } }
    C.nurse = chibi({ body: '#f6f6fa', sleeve: '#f6f6fa', dress: true, hair: '#2a1a14', hairStyle: 'bun', s: 0.96, smile: true }); add('VIL', C.nurse, 0, 0, 0);
    C.vet = chibi({ body: '#8a7a4a', sleeve: '#8a7a4a', hat: 'cap', hatC: '#6a5a30', s: 1.0 }); add('VIL', C.vet, 0, 0, 0);
    C.clip = mk(new T.BoxGeometry(0.4, 0.5, 0.04), '#e8e0c8'); C.vet.userData.arms.R.userData.hand.add(C.clip); C.clip.position.set(0, 0.05, 0.12);
    C.cow = cow(); add('VIL', C.cow, 0, 0, 0);
    C.check = []; for (let i = 0; i < 4; i++) { const l = label('✓', { w: 0.8, px: 120, color: P.teal }); add('VIL', l, 0, 0, 0); C.check.push(l); }
    C.net = new T.Mesh(new T.SphereGeometry(1.0, 10, 6, 0, 6.283, 0, 1.6), new T.MeshBasicMaterial({ color: '#c8c8d8', wireframe: true, transparent: true, opacity: 0.7 })); add('VIL', C.net, 0, 0, 0);
    C.granA = chibi({ body: '#7a5a4a', sleeve: '#7a5a4a', dress: true, hair: '#c8c8c8', hairStyle: 'bun', brow: '#8a8a8a', sad: true, s: 0.92 }); add('VIL', C.granA, 0, 0, 0);
    C.granW = chibi({ body: WHITE, sleeve: WHITE, dress: true, hair: '#c8c8c8', hairStyle: 'bun', s: 0.92 }); setSit(C.granW, true); add('VIL', C.granW, 0, 0, 0);
    C.tear = new T.Mesh(new T.SphereGeometry(0.05, 6, 5), basic('#9fd8ff')); add('VIL', C.tear, 0, 0, 0);
    /* ผีแม่ม่าย chapter */
    C.sleeper = sleeper({ body: '#5a6a8a', sleeve: '#5a6a8a', hair: '#2a1a14', s: 0.9 }); add('VIL', C.sleeper, 0, 0, 0);
    C.mat = mk(new T.BoxGeometry(1.0, 0.06, 1.9), '#c8b8e0'); add('VIL', C.mat, 0, 0, 0);
    C.widow = chibi({ body: '#f0d8e8', sleeve: '#f0d8e8', dress: true, hairStyle: 'long', hair: '#1a1420', skin: '#e8e0f0', ghost: '#ff8ac8', eyeGlow: '#ffffff', s: 1.0 }); add('VIL', C.widow, 0, 0, 0);
    C.zz = []; for (let i = 0; i < 3; i++) { const z = label('z', { w: 0.6, px: 90, color: '#c8d4ff' }); add('VIL', z, 0, 0, 0); C.zz.push(z); }
    C.shirts = {}; for (const k in HX) { C.shirts[k] = []; for (let i = 0; i < 3; i++) { const sh = redShirt(0.8); C.houses[k].add(sh); sh.position.set(-1.4 + i * 1.4, 1.35, C.houses[k].userData.d / 2 + 1.3); C.shirts[k].push(sh); } }
    C.sign = card([['บ้านนี้', 70, '#ffffff'], ['ไม่มีผู้ชาย', 84, '#ffe7a0']], 1.9, 1.0, { bg: '#a01828', top: 80 }); C.houses.red.add(C.sign); C.sign.position.set(1.15, 2.55, C.houses.red.userData.d / 2 + 1.42);
    /* distant villages (c6): instanced tiny huts */
    { const n = 260; const g = new T.BoxGeometry(1, 1, 1); const m = new T.MeshBasicMaterial({ color: '#ffffff' }); const im = new T.InstancedMesh(g, m, n); const d = new T.Object3D(); C.farN = n; C.farSeed = [];
      for (let i = 0; i < n; i++) { const x = -110 + rnd() * 220, z = -32 - rnd() * 90; C.farSeed.push([x, z, rnd()]); d.position.set(x, 0.3, z); d.scale.setScalar(0.001); d.updateMatrix(); im.setMatrixAt(i, d.matrix); im.setColorAt(i, new T.Color(i % 5 ? '#ffd27a' : '#ffb060')); }
      im.instanceColor.needsUpdate = true; m.fog = false; add('VIL', im, 0, 0, 0); C.far = im; C.farD = d; }
    C.souls = []; for (let i = 0; i < 2; i++) { const g = softSprite('rgba(200,215,255,1)', 0); g.scale.set(1.4, 1.4, 1); add('VIL', g, 0, 0, 0); C.souls.push(g); }
    C.nums = ['1', '2', '3'].map((n) => { const l = label(n, { w: 1.6, px: 120, color: P.gold }); add('VIL', l, 0, 0, 0); return l; });
    C.fog = []; for (let i = 0; i < 6; i++) { const f = softSprite('rgba(150,160,210,1)', 0.14, false); f.scale.set(12, 2.6, 1); add('VIL', f, -30 + i * 11, 0.7, 6 - (i % 2) * 3); C.fog.push(f); }
  }

  /* ---------- SUTTA (Buddha-era grove + palace wall) ---------- */
  { const C = {}; s.c.sutta = C;
    add('SUTTA', slab(60, 26, '#5a7a48', '#4a3a2a'));
    C.tree = add('SUTTA', bodhi(1.2), 0, 0, -4.2);
    C.seat = add('SUTTA', mk(new T.CylinderGeometry(1.1, 1.2, 0.5, 12), '#c9b48a'), 0, 0.25, -1.8);
    C.bud = monk({ body: '#f0b648', sleeve: '#f0b648', sash: '#e0a030', skin: '#f5cf6a', gold: true, halo: true, closed: true, statue: true, s: 1.25 }); setSit(C.bud, true); lapHands(C.bud); add('SUTTA', C.bud, 0, 0.5, -1.8);
    C.budGlow = softSprite('rgba(255,224,140,1)', 0.45); C.budGlow.scale.set(6, 6, 1); add('SUTTA', C.budGlow, 0, 2.5, -2.0);
    C.kal = []; for (let i = 0; i < 6; i++) { const a = -1.0 + i * 0.4; const c = chibi({ body: ['#e9e4d6', '#c9a77a', '#d8c8a8'][i % 3], sleeve: ['#e9e4d6', '#c9a77a', '#d8c8a8'][i % 3], hair: '#2a2228', hairStyle: i % 2 ? 'bun' : undefined, s: 0.85 }); setSit(c, true); add('SUTTA', c, Math.sin(a) * 3.6, 0, -1.8 + Math.cos(a) * 3.0); face(c, -Math.sin(a), -Math.cos(a)); anjali(c); C.kal.push(c); }
    C.kmonk = monk({ s: 0.88 }); setSit(C.kmonk, true); add('SUTTA', C.kmonk, 0, 0, 0); anjali(C.kmonk);
    C.siv = chibi({ body: '#c9a06a', sleeve: '#c9a06a', robe: true, hair: '#3a2a20', hairStyle: 'bun', s: 0.95 }); add('SUTTA', C.siv, 0, 0, 0);
    C.par = chibi({ body: '#7a6a4a', sleeve: '#7a6a4a', hair: '#2a2228', s: 1.0 }); C.child = chibi({ body: '#4a7aa0', sleeve: '#4a7aa0', hair: '#2a2228', s: 0.62 }); add('SUTTA', C.par, 0, 0, 0); add('SUTTA', C.child, 0, 0, 0);
    C.orbP = softSprite('rgba(143,123,255,1)', 1); C.orbP.scale.set(0.9, 0.9, 1); add('SUTTA', C.orbP, 0, 0, 0);
    C.orbC = softSprite('rgba(46,230,197,1)', 1); C.orbC.scale.set(0.7, 0.7, 1); add('SUTTA', C.orbC, 0, 0, 0);
    C.wall = new T.Group(); add('SUTTA', C.wall, 30, 0, -2);
    { const w = mk(new T.BoxGeometry(16, 2.6, 0.6), '#d8c8a0'); w.position.y = 1.3; C.wall.add(w); }
    for (let i = 0; i < 9; i++) { const m = mk(new T.BoxGeometry(0.7, 0.5, 0.7), '#c8b890'); m.position.set(-7.6 + i * 1.9, 2.85, 0); C.wall.add(m); }
    const pal = mk(new T.BoxGeometry(7, 4, 4), '#e8d8b0'); pal.position.set(0, 2, -4.5); C.wall.add(pal); const pr = mk(new T.ConeGeometry(5.2, 2.4, 4), '#a0402a'); pr.rotation.y = Math.PI / 4; pr.scale.z = 0.6; pr.position.set(0, 5.2, -4.5); C.wall.add(pr);
    C.pretas = []; for (let i = 0; i < 6; i++) { const p = chibi({ body: '#6a7088', sleeve: '#6a7088', skin: '#9aa8c0', thin: true, bald: true, eyeGlow: '#d0e8ff', ghost: '#7a9cff', s: 1.05, sad: true, brow: '#4a5068' }); add('SUTTA', p, 30 - 6 + i * 2.4, 0, -0.7 + (i % 2) * 0.3); C.pretas.push(p); }
    C.king = chibi({ body: '#c08a3a', sleeve: '#c08a3a', dress: true, skin: '#e6b88a', hair: '#2a2228', s: 1.15 }); add('SUTTA', C.king, 30, 0, 3.0);
    { const cr = mk(new T.ConeGeometry(0.24, 0.6, 6), P.gold, GOLDM); cr.position.y = 0.6; C.king.userData.head.add(cr); }
    C.pot = waterPot(); C.king.userData.arms.R.userData.hand.add(C.pot); C.pot.position.set(0, 0.0, 0.18);
    C.stream = new T.Mesh(new T.CylinderGeometry(0.03, 0.02, 0.9, 5), basic('#bfe8ff', { transparent: true, opacity: 0.8 })); add('SUTTA', C.stream, 0, 0, 0);
    C.dmonks = []; for (let i = 0; i < 3; i++) { const m = monk({ s: 0.9 }); setSit(m, true); add('SUTTA', m, 30 + 2.2 + i * 1.2, 0, 4.2); face(m, -0.4, -1); C.dmonks.push(m); }
    C.merit = []; for (let i = 0; i < 12; i++) { const m = softSprite('rgba(255,214,120,1)', 0); m.scale.set(0.5, 0.5, 1); add('SUTTA', m, 0, 0, 0); C.merit.push(m); }
    for (let i = 0; i < 10; i++) { const x = -26 + i * 6 + rnd() * 2; if (Math.abs(x) < 5 || Math.abs(x - 30) < 9) continue; add('SUTTA', tree(1.4 + rnd() * 0.5, '#3f7a4a'), x, 0, -7 - rnd() * 3); }
    C.moon = add('SUTTA', moon(1.4), 36, 13, -22);
  }

  /* ---------- HOSP (Singapore dorm + hospital ward) ---------- */
  { const C = {}; s.c.hosp = C;
    add('HOSP', slab(40, 20, '#c8d2e0', '#7a8aa0'));
    /* dorm (left) */
    add('HOSP', mk(new T.BoxGeometry(12, 5, 0.3), '#8a96a8'), -12, 2.5, -4.2);
    C.bunks = []; C.workers = [];
    for (let i = 0; i < 3; i++) { const b = bunk(); add('HOSP', b, -16 + i * 3.2, 0, -1.6); C.bunks.push(b); for (const y of [1.1, 2.5]) { const w = sleeper({ body: ['#4a6a8a', '#6a5a3a', '#3a5a4a'][i], sleeve: ['#4a6a8a', '#6a5a3a', '#3a5a4a'][i], hair: '#1a1410', s: 0.72 }); add('HOSP', w, -16 + i * 3.2, y, -1.2); C.workers.push(w); } }
    C.dormWin = new T.Mesh(new T.PlaneGeometry(2.2, 1.4), basic('#2a3a6a')); add('HOSP', C.dormWin, -12, 3.4, -4.04);
    /* ward (right) */
    add('HOSP', mk(new T.BoxGeometry(18, 6, 0.3), '#eef2f8'), 6, 3, -4.2);
    C.bed = bed('#cfe0f0'); add('HOSP', C.bed, 3.2, 0, -0.6); C.bed.rotation.y = Math.PI / 2;
    C.pat = sleeper({ body: '#7ab0d8', sleeve: '#7ab0d8', hair: '#1a1410', s: 0.95, closed: false }); add('HOSP', C.pat, 0, 0, 0);
    C.doc = chibi({ body: '#f6f6fa', sleeve: '#f6f6fa', shirt: '#4a8ab0', hair: '#2a1a14', glasses: true, s: 1.05, smile: true }); add('HOSP', C.doc, 0, 0, 0);
    C.mon = monitor(3.6, 1.8); add('HOSP', C.mon, 6.6, 3.3, -3.9);
    C.heart = heartModel(); add('HOSP', C.heart, 10.6, 2.6, -1.2); C.heart.scale.setScalar(1.15);
    C.spark = []; for (let i = 0; i < 6; i++) { const sp = softSprite('rgba(255,250,170,1)', 0); sp.scale.set(0.6, 0.6, 1); add('HOSP', sp, 0, 0, 0); C.spark.push(sp); }
    C.clock = card([['02:00', 120, '#ff6070']], 2.2, 0.8, { bg: '#10141c', top: 104 }); add('HOSP', C.clock, 0.4, 4.2, -4.0);
    C.fam = []; for (let g = 0; g < 3; g++) for (let i = 0; i < 2; i++) { const c = chibi({ body: ['#6a5a4a', '#5a6a8a', '#4a8a6a'][g], sleeve: ['#6a5a4a', '#5a6a8a', '#4a8a6a'][g], hair: g === 0 ? '#c8c8c8' : '#2a1a14', hairStyle: i ? 'bun' : undefined, dress: !!i, s: g === 2 ? 0.62 : 0.85 }); add('HOSP', c, 0, 0, 0); C.fam.push(c); }
    C.redX = redShirt(1.4); add('HOSP', C.redX, 0, 0, 0);
    C.no = label('✕', { w: 1.6, px: 150, color: P.coral }); add('HOSP', C.no, 0, 0, 0);
    C.yes = label('✓', { w: 1.6, px: 150, color: P.teal }); add('HOSP', C.yes, 0, 0, 0);
    C.walker = chibi({ body: '#5a6a8a', sleeve: '#5a6a8a', hair: '#2a1a14', s: 1.0 }); add('HOSP', C.walker, 0, 0, 0);
    for (let i = 0; i < 3; i++) { const sk = mk(new T.CylinderGeometry(0.08, 0.08, 0.02, 10), '#ffffff'); C.walker.add(sk); sk.rotation.x = Math.PI / 2; sk.position.set(-0.12 + i * 0.12, 0.92, 0.42); }
  }
  s.v = new T.Vector3();
  return s;
}
