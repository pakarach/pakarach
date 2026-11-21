/* Part C: stations + setup */
const ST = { ROOM: [0, 0, 0], FEED: [52, 0, 0], FOREST: [80, 0, 0], BRANCH: [100, 0, 0], CHAIN: [120, 0, 0], LAB: [160, 0, 0], HEAV: [2000, 0, 0] };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
const ANI = [ // name, angle(deg), home
  ['snake', 172, 'anthill'], ['croc', 140, 'pond'], ['bird', 106, 'sky'], ['dog', 74, 'hut'], ['jackal', 42, 'grave'], ['monkey', 8, 'trees'],
];
const dirOf = (a) => [Math.cos(a * Math.PI / 180), -Math.sin(a * Math.PI / 180)];
function rope(scene, c) { const m = mk(new T.CylinderGeometry(0.045, 0.045, 1, 5), c || '#d8c08a'); scene.add(m); return m; }
const _ya = new T.Vector3(0, 1, 0), _d = new T.Vector3();
function setRope(m, a, b) { _d.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const l = _d.length(); m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); m.scale.set(1, Math.max(0.001, l), 1); m.quaternion.setFromUnitVectors(_ya, _d.normalize()); }
function senseTex(k) {
  return canvasTex(128, 128, (g) => {
    g.fillStyle = 'rgba(15,22,48,.85)'; g.beginPath(); g.arc(64, 64, 60, 0, 6.283); g.fill(); g.strokeStyle = '#fff'; g.fillStyle = '#fff'; g.lineWidth = 8; g.lineCap = 'round';
    if (k === 0) { g.beginPath(); g.ellipse(64, 64, 40, 22, 0, 0, 6.283); g.stroke(); g.beginPath(); g.arc(64, 64, 11, 0, 6.283); g.fill(); }
    if (k === 1) { g.beginPath(); g.arc(68, 56, 26, Math.PI * 0.9, Math.PI * 2.35); g.stroke(); g.beginPath(); g.moveTo(80, 76); g.quadraticCurveTo(72, 100, 58, 96); g.stroke(); }
    if (k === 2) { g.beginPath(); g.moveTo(64, 30); g.lineTo(48, 86); g.lineTo(80, 86); g.closePath(); g.stroke(); }
    if (k === 3) { g.fillStyle = '#ff7a9a'; g.beginPath(); g.ellipse(64, 70, 22, 30, 0, 0, 6.283); g.fill(); g.strokeStyle = '#c03a5a'; g.beginPath(); g.moveTo(64, 50); g.lineTo(64, 84); g.stroke(); }
    if (k === 4) { g.fillRect(40, 58, 48, 38); for (let i = 0; i < 4; i++) g.fillRect(40 + i * 12.5, 30, 9, 30); g.fillRect(26, 62, 16, 9); }
    if (k === 5) { g.beginPath(); g.arc(50, 60, 18, 0, 6.283); g.arc(76, 56, 20, 0, 6.283); g.arc(66, 76, 16, 0, 6.283); g.fill(); g.beginPath(); g.arc(44, 98, 6, 0, 6.283); g.fill(); }
  });
}

function setupScene(scene) {
  const s = { anchorV: new T.Vector3() };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#1a2450', 40, 120); s.fog = scene.fog;
  const ground = mk(new T.BoxGeometry(260, 0.4, 120), '#46684a'); ground.position.set(80, -0.2, -40); scene.add(ground);

  /* ---------- town around the room ---------- */
  s.town = [];
  const winTex = (seed) => canvasTex(64, 128, (g) => { g.fillStyle = '#2a3150'; g.fillRect(0, 0, 64, 128); for (let y = 0; y < 8; y++) for (let x = 0; x < 4; x++) { const lit = ((x * 7 + y * 13 + seed) % 5) < 2; g.fillStyle = lit ? '#7fd8ff' : '#141a30'; g.fillRect(6 + x * 14, 6 + y * 15, 9, 10); } });
  const WT = [winTex(1), winTex(3), winTex(4)];
  for (let i = 0; i < 34; i++) {
    const side = i % 2 ? 1 : -1, j = Math.floor(i / 2), x = side * (7 + (j % 6) * 4.2 + rnd() * 1.5), z = -8 - Math.floor(j / 6) * 7 - rnd() * 3, h = 6 + rnd() * 10, w = 2.6 + rnd() * 1.2;
    const tx = WT[i % 3].clone(); tx.needsUpdate = true; tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(1, Math.round(h / 4));
    const m = new T.Mesh(new T.BoxGeometry(w, h, w), new T.MeshStandardMaterial({ color: '#ffffff', map: tx, emissive: new T.Color('#ffffff'), emissiveMap: tx, emissiveIntensity: 0.15, flatShading: true, roughness: 0.8 }));
    m.position.set(x, h / 2, z); scene.add(m); s.town.push(m);
  }
  for (let i = 0; i < 6; i++) { const m = new T.Mesh(new T.BoxGeometry(3.4, 9 + i * 1.3, 3.4), new T.MeshStandardMaterial({ color: '#ffffff', map: WT[i % 3], emissive: new T.Color('#ffffff'), emissiveMap: WT[i % 3], emissiveIntensity: 0.15, flatShading: true })); m.position.set(-14 + i * 5.6, (9 + i * 1.3) / 2, -24); scene.add(m); s.town.push(m); }
  s.moon = glow('rgba(255,245,210,1)', 6, 0.9); s.moon.position.set(8, 22, -40); scene.add(s.moon);
  { const mm = new T.Mesh(new T.CircleGeometry(1.2, 24), basic('#fff6d8', { fog: false })); mm.position.set(8, 22, -39.9); scene.add(mm); }

  /* ---------- room (cutaway) ---------- */
  const R = new T.Group(); place(R, 'ROOM'); scene.add(R); s.room = { g: R };
  const fl = mk(new T.BoxGeometry(9, 0.3, 7), '#7a5a46'); fl.position.set(0, 0.0, -0.4); R.add(fl);
  const bw = mk(new T.BoxGeometry(9, 5.4, 0.3), '#2c3566'); bw.position.set(0, 2.85, -3.8); R.add(bw);
  const lw = mk(new T.BoxGeometry(0.3, 5.4, 7), '#26305c'); lw.position.set(-4.5, 2.85, -0.4); R.add(lw);
  const rw = mk(new T.BoxGeometry(0.3, 5.4, 3.0), '#26305c'); rw.position.set(4.5, 2.85, -2.4); R.add(rw);
  const door = mk(new T.BoxGeometry(0.12, 3.2, 1.6), '#8a6a4a'); door.position.set(4.6, 1.75, -1.6); door.rotation.y = -1.2; /* door removed */
  const win = mk(new T.BoxGeometry(2.6, 1.8, 0.1), '#0b1030'); win.position.set(-1.6, 3.4, -3.62); R.add(win);
  const wf = mk(new T.BoxGeometry(2.8, 0.12, 0.14), '#d8d0c0'); wf.position.set(-1.6, 3.4, -3.58); R.add(wf); const wf2 = mk(new T.BoxGeometry(0.12, 1.9, 0.14), '#d8d0c0'); wf2.position.set(-1.6, 3.4, -3.58); R.add(wf2);
  const wmoon = new T.Mesh(new T.CircleGeometry(0.28, 18), basic('#fff6d8')); wmoon.position.set(-1.0, 3.8, -3.55); R.add(wmoon);
  const bed = mk(new T.BoxGeometry(2.6, 0.6, 4.0), '#5a4a6a'); bed.position.set(0.2, 0.45, -1.6); R.add(bed);
  const mat = mk(new T.BoxGeometry(2.5, 0.3, 3.9), '#e8e4f0'); mat.position.set(0.2, 0.9, -1.6); R.add(mat);
  const hb = mk(new T.BoxGeometry(2.7, 1.6, 0.2), '#4a3a5a'); hb.position.set(0.2, 1.2, -3.6); R.add(hb);
  const pil = mk(new T.BoxGeometry(1.4, 0.4, 0.7), '#ffffff'); pil.position.set(0.2, 1.25, -3.1); pil.rotation.x = -0.5; R.add(pil);
  s.room.blanket = mk(new T.BoxGeometry(2.6, 0.4, 2.6), '#ff8fa0'); s.room.blanket.position.set(0.2, 1.2, -0.8); R.add(s.room.blanket);
  const ns = mk(new T.BoxGeometry(0.9, 1.0, 0.8), '#8a6a4a'); ns.position.set(-1.9, 0.5, -3.0); R.add(ns);
  s.room.clock = new T.Mesh(new T.BoxGeometry(0.6, 0.32, 0.25), basic('#101420')); s.room.clock.position.set(-1.9, 1.17, -2.9); R.add(s.room.clock);
  s.room.clockGlow = glow('rgba(255,90,110,1)', 0.9, 0.7); s.room.clockGlow.position.set(-1.9, 1.2, -2.7); R.add(s.room.clockGlow);
  const lamp = mk(new T.CylinderGeometry(0.18, 0.28, 0.5, 8), '#f0e0b0'); lamp.position.set(-2.2, 1.25, -3.2); R.add(lamp);
  // shelf + charger outside the door
  const shelf = mk(new T.BoxGeometry(1.0, 1.1, 0.7), '#a88a6a'); shelf.position.set(5.6, 0.55, 0.4); R.add(shelf);
  s.room.pad = new T.Mesh(new T.BoxGeometry(0.5, 0.05, 0.5), basic('#2ee6c5')); s.room.pad.position.set(5.6, 1.13, 0.4); R.add(s.room.pad);
  s.room.phum = chibi({ robe: PHUM, hair: '#1e1a22', sleeve: PHUM }); setSit(s.room.phum, true); s.room.phum.position.set(0.2, 0.92, -2.6); R.add(s.room.phum);
  s.room.ph = phone(0.55); R.add(s.room.ph);
  s.room.phGlow = glow('rgba(120,200,255,1)', 2.2, 0.75); R.add(s.room.phGlow);
  s.room.faceLight = new T.PointLight('#8fd0ff', 1.4, 5); R.add(s.room.faceLight);
  s.room.lampLight = new T.PointLight('#ffd8a0', 0, 9); s.room.lampLight.position.set(-2, 2.4, -2); R.add(s.room.lampLight);
  s.room.rain = [];
  for (let i = 0; i < 46; i++) { const c = card(i, 1.3); c.userData.seed = [rnd(), rnd(), rnd()]; R.add(c); s.room.rain.push(c); }
  s.room.ring = new T.Mesh(new T.RingGeometry(0.9, 1.05, 40), basic(P.teal, { transparent: true, opacity: 0.8, side: T.DoubleSide })); R.add(s.room.ring);
  s.room.bells = [0, 1, 2].map((i) => { const b = new T.Group(); const c = mk(new T.ConeGeometry(0.22, 0.32, 10), P.gold); const r = mk(new T.SphereGeometry(0.07, 6, 5), P.gold); r.position.y = -0.18; b.add(c, r); const x = new T.Mesh(new T.BoxGeometry(0.6, 0.08, 0.05), basic(P.coral)); x.rotation.z = 0.8; b.add(x); b.userData.x = x; R.add(b); return b; });
  // 45-day wall
  { const n = 45, im = new T.InstancedMesh(new T.BoxGeometry(0.56, 0.56, 0.3), M('#ffffff'), n), m4 = new T.Matrix4();
    for (let i = 0; i < n; i++) { const c = i % 9, r = Math.floor(i / 9); m4.makeTranslation(-11.2 + c * 0.66, 0.4 + (4 - r) * 0.66, 1.6); im.setMatrixAt(i, m4); im.setColorAt(i, new T.Color(i % 7 === 6 ? '#ffc94a' : '#f4f2ff')); }
    im.count = 0; scene.add(im); s.days = im;
    const top = mk(new T.BoxGeometry(6.2, 0.4, 0.4), P.coral); top.position.set(-8.56, 3.95, 1.6); scene.add(top); s.daysTop = top; }

  /* ---------- feed tower ---------- */
  const F = new T.Group(); place(F, 'FEED'); scene.add(F); s.feed = { g: F };
  const base = mk(new T.CylinderGeometry(4, 4.6, 0.6, 16), '#2e3f73'); base.position.y = 0.3; F.add(base);
  const body = mk(new T.BoxGeometry(5.2, 9.8, 0.6), '#1a1e30', { metalness: 0.4 }); body.position.set(0, 5.6, -1); F.add(body);
  s.feed.scrTex = canvasTex(360, 680, () => {}); const scr = new T.Mesh(new T.PlaneGeometry(4.7, 8.9), new T.MeshBasicMaterial({ map: s.feed.scrTex })); scr.position.set(0, 5.6, -0.68); F.add(scr);
  s.feed.glowS = glow('rgba(140,170,255,1)', 13, 0.35); s.feed.glowS.position.set(0, 5.6, -1.2); F.add(s.feed.glowS);
  s.feed.cards = []; for (let i = 0; i < 12; i++) { const c = card(i, 3.2); c.position.set(0, 0, -1); F.add(c); s.feed.cards.push(c); }
  s.feed.next = new T.Group(); { const b = mk(new T.BoxGeometry(2.4, 0.7, 0.3), P.teal); s.feed.next.add(b); const lb = label('หน้าถัดไป ›', { w: 2.3, px: 78, color: '#0f1630' }); lb.material.depthTest = true; lb.position.z = 0.2; s.feed.next.add(lb); } s.feed.next.position.set(0, 0.95, 0.4); F.add(s.feed.next);
  s.feed.lever = new T.Group(); { const hub = mk(new T.CylinderGeometry(0.35, 0.35, 0.4, 12), '#c8c8d8', { metalness: 0.5 }); hub.rotation.z = Math.PI / 2; s.feed.lever.add(hub); const arm = mk(new T.CylinderGeometry(0.1, 0.1, 2.6, 8), '#c8c8d8', { metalness: 0.5 }); arm.position.y = 1.3; s.feed.lever.add(arm); const ball = mk(new T.SphereGeometry(0.42, 12, 10), P.coral); ball.position.y = 2.7; s.feed.lever.add(ball); } s.feed.lever.position.set(3.0, 6.0, -1); F.add(s.feed.lever);
  s.feed.hg = hourglass(); s.feed.hg.position.set(-4.4, 0.6, 0.6); s.feed.hg.scale.setScalar(1.15); F.add(s.feed.hg);
  s.feed.phum = chibi({ robe: PHUM, hair: '#1e1a22', sleeve: PHUM }); s.feed.phum.position.set(1.6, 0.6, 2.4); F.add(s.feed.phum);
  s.feed.mini = phone(0.5); F.add(s.feed.mini);
  s.feed.bursts = [0, 1, 2].map(() => { const g = glow('rgba(255,210,90,1)', 3, 0.9); F.add(g); return g; });
  // dopamine bars (Fiorillo 2003 shape, illustrative)
  const DP = new T.Group(); DP.position.set(-11, 0, 0); F.add(DP); s.feed.dp = { g: DP, bars: [], lamps: [] };
  const plat = mk(new T.BoxGeometry(8.4, 0.4, 2.4), '#2e3f73'); plat.position.y = 0.2; DP.add(plat);
  const PCT = [0, 25, 50, 75, 100], HV = [0.08, 0.62, 1, 0.62, 0.08];
  PCT.forEach((p, i) => { const x = -3.2 + i * 1.6; const b = FK.bar(T, 0.9, 0.9, i === 2 ? P.gold : P.violet); b.position.set(x, 0.4, 0); b.userData.h = HV[i] * 4.2; DP.add(b); s.feed.dp.bars.push(b);
    const lp = new T.Mesh(new T.SphereGeometry(0.28, 10, 8), basic(i === 2 ? '#ffe08a' : '#cfd6ff')); lp.position.set(x, 0.4, 1.25); DP.add(lp); s.feed.dp.lamps.push(lp);
    const lb = label(p + '%', { w: 1.6, px: 90, color: i === 2 ? P.gold : '#fff' }); lb.position.set(x, -0.05, 1.5); DP.add(lb); });
  s.feed.dp.monkey = monkey(0.8); setSit(s.feed.dp.monkey, true); s.feed.dp.monkey.position.set(4.6, 0.4, 0.6); s.feed.dp.monkey.rotation.y = -0.6; DP.add(s.feed.dp.monkey);
  s.feed.dp.cup = mk(new T.CylinderGeometry(0.22, 0.16, 0.42, 10), '#ff9a3a'); s.feed.dp.cup.position.set(5.4, 0.62, 1.0); DP.add(s.feed.dp.cup);

  /* ---------- forest: six animals ---------- */
  const FO = new T.Group(); place(FO, 'FOREST'); scene.add(FO); s.fo = { g: FO, an: [], ropes: [], homes: [] };
  const clearing = mk(new T.CylinderGeometry(9.5, 10, 0.3, 24), '#5f8a52'); clearing.position.y = 0.0; FO.add(clearing);
  s.fo.knot = mk(new T.SphereGeometry(0.32, 10, 8), '#c8a060'); s.fo.knot.position.set(0, 0.6, 0); FO.add(s.fo.knot);
  const mkA = { snake: () => snake(), croc: () => croc(), bird: () => bird(), dog: () => quad({ c: '#b07a4a', c2: '#8a5a32', s: 1.05 }), jackal: () => quad({ c: '#d0904a', c2: '#f0d0a0', pointy: true, bushy: true, s: 1.0 }), monkey: () => monkey(0.75) };
  ANI.forEach(([n, a, h]) => {
    const an = mkA[n](); const d = dirOf(a); an.userData.dir = d; an.userData.name = n; FO.add(an); s.fo.an.push(an);
    const rp = rope(FO); s.fo.ropes.push(rp);
    let home = null; const hx = d[0] * 6.0, hz = d[1] * 6.0;
    if (h === 'anthill') home = anthill(); if (h === 'pond') home = pond(); if (h === 'hut') home = hut(2, 1.8, 1.4, '#d0b080', '#a8502a'); if (h === 'grave') home = grave();
    if (h === 'trees') { home = new T.Group(); for (const q of [[0, 0, 1.4], [0.9, -0.8, 1.1], [-0.8, -0.6, 1.2]]) { const tr = tree(q[2], '#2f7f4a'); tr.position.set(q[0], 0, q[1]); home.add(tr); } }
    if (home) { home.position.set(hx, 0.1, hz); home.rotation.y = Math.atan2(-d[0], -d[1]); FO.add(home); }
    s.fo.homes.push(home);
  });
  for (let i = 0; i < 26; i++) { const a = rnd() * 6.283, r = 11 + rnd() * 8; const tr = tree(1.1 + rnd() * 0.8, ['#2f7f4a', '#3f8f5a'][i % 2]); tr.position.set(Math.cos(a) * r, 0, Math.sin(a) * r - 3); if (Math.sin(a) > 0.5 && r < 14) continue; FO.add(tr); }
  s.fo.icons = [0, 1, 2, 3, 4, 5].map((k) => { const sp = new T.Sprite(new T.SpriteMaterial({ map: senseTex(k), transparent: true, depthTest: false, fog: false })); sp.renderOrder = 9; sp.scale.setScalar(0.9); FO.add(sp); return sp; });
  s.fo.bigPhone = phone(2.2); s.fo.bigPhone.position.set(0, 5.2, -1); FO.add(s.fo.bigPhone); s.fo.bigGlow = glow('rgba(120,200,255,1)', 6, 0.6); s.fo.bigGlow.position.set(0, 5.2, -1.2); FO.add(s.fo.bigGlow);
  s.fo.beams = [0, 1, 2].map(() => rope(FO, '#7fe0ff'));
  s.fo.post = post(); FO.add(s.fo.post);

  /* ---------- branch row (monkey mind) ---------- */
  const BR = new T.Group(); place(BR, 'BRANCH'); scene.add(BR); s.br = { g: BR, cards: [] };
  for (let i = 0; i < 7; i++) { const x = -9 + i * 3; const tr = mk(new T.CylinderGeometry(0.2, 0.3, 4.4, 6), '#7a5236'); tr.position.set(x, 2.2, -1.4); BR.add(tr); const cr = mk(new T.IcosahedronGeometry(1.4, 0), i % 2 ? '#3f8f5a' : '#2f7f4a'); cr.position.set(x, 4.8, -1.6); cr.scale.y = 0.8; BR.add(cr);
    const bh = mk(new T.CylinderGeometry(0.07, 0.09, 1.8, 5), '#7a5236'); bh.rotation.z = Math.PI / 2; bh.position.set(x + 0.9, 3.7, -0.6); BR.add(bh);
    const c = card(i, 1.3); c.position.set(x + 1.6, 3.0, -0.5); BR.add(c); s.br.cards.push(c); }
  s.br.m = monkey(0.8); BR.add(s.br.m);

  /* ---------- chain ---------- */
  const CH = new T.Group(); place(CH, 'CHAIN'); scene.add(CH); s.ch = { g: CH, links: [], icons: [], nums: [] };
  const CHC = ['#7fb3ff', P.teal, P.coral, P.gold], LP = [[-2.6, 5.0], [2.6, 5.0], [2.6, 1.8], [-2.6, 1.8]];
  const pad = mk(new T.CylinderGeometry(6.5, 7, 0.4, 20), '#2e3f73'); pad.position.y = 0.2; CH.add(pad);
  LP.forEach((p, i) => { const l = link(CHC[i]); l.scale.multiplyScalar(1.25); l.position.set(p[0], p[1], 0); CH.add(l); s.ch.links.push(l);
    const ic = [eyeIcon, smileIcon, () => handIcon(), lockIcon][i](); ic.position.set(p[0], p[1], 0.1); ic.scale.setScalar(i === 1 ? 0.95 : 0.85); CH.add(ic); s.ch.icons.push(ic);
    const nb = label('ข้อ ' + (i + 1), { w: 1.7, px: 86, color: CHC[i] }); nb.position.set(p[0] + (p[0] < 0 ? -2.4 : 2.4), p[1], 0.2); CH.add(nb); s.ch.nums.push(nb); });
  s.ch.orb = glow('rgba(255,240,180,1)', 1.5, 1); CH.add(s.ch.orb); s.ch.orbCore = new T.Mesh(new T.SphereGeometry(0.2, 10, 8), basic('#ffffff')); CH.add(s.ch.orbCore);
  s.ch.gap = glow('rgba(255,93,115,1)', 2.6, 0.9); s.ch.gap.position.set(2.6, 3.4, 0.3); CH.add(s.ch.gap);
  for (let i = 0; i < 4; i++) { const a = LP[i], b = LP[(i + 1) % 4]; const ar = mk(new T.ConeGeometry(0.22, 0.5, 6), '#ffffff'); ar.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0); const dx = b[0] - a[0], dy = b[1] - a[1]; ar.rotation.z = Math.atan2(dy, dx) - Math.PI / 2; CH.add(ar); }

  /* ---------- lab ---------- */
  const LB = new T.Group(); place(LB, 'LAB'); scene.add(LB); s.lab = { g: LB };
  const lfl = mk(new T.CylinderGeometry(7.5, 8, 0.4, 24), '#7d8bb0'); lfl.position.y = 0.2; LB.add(lfl);
  s.lab.brain = brain(); s.lab.brain.position.set(-2.8, 2.9, -3.4); s.lab.brain.scale.setScalar(0.72); LB.add(s.lab.brain);
  { const n = 140, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const a = rnd() * 6.283, b = rnd() * 3.14, r = 0.6 + rnd() * 0.5; p[i * 3] = -2.8 + Math.cos(a) * Math.sin(b) * r * 1.35; p[i * 3 + 1] = 2.9 + Math.cos(b) * r * 0.95; p[i * 3 + 2] = -3.4 + Math.sin(a) * Math.sin(b) * r * 1.2 + 0.6; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); s.lab.dopa = new T.Points(g, new T.PointsMaterial({ color: '#ffd34a', size: 0.16, transparent: true, depthTest: false })); s.lab.dopa.renderOrder = 6; LB.add(s.lab.dopa); }
  s.lab.cage = new T.Mesh(new T.BoxGeometry(4.4, 1.6, 2.0), new T.MeshStandardMaterial({ color: '#cfe8ff', transparent: true, opacity: 0.18, roughness: 0.1 })); s.lab.cage.position.set(1.4, 1.2, 0.6); LB.add(s.lab.cage);
  const cfl = mk(new T.BoxGeometry(4.4, 0.08, 2.0), '#e8e0c8'); cfl.position.set(1.4, 0.44, 0.6); LB.add(cfl);
  s.lab.rat = rat(); s.lab.rat.position.set(0.0, 0.48, 0.6); s.lab.rat.rotation.y = Math.PI / 2; LB.add(s.lab.rat);
  s.lab.sugar = mk(new T.BoxGeometry(0.42, 0.42, 0.42), '#ffffff'); s.lab.sugar.position.set(3.1, 0.7, 0.6); LB.add(s.lab.sugar);
  s.lab.drop = new T.Group(); { const tb = mk(new T.CylinderGeometry(0.08, 0.08, 1.1, 8), '#e0f0ff'); const bulb = mk(new T.SphereGeometry(0.18, 8, 6), P.coral); bulb.position.y = 0.6; s.lab.drop.add(tb, bulb); } LB.add(s.lab.drop);
  s.lab.dropBead = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), basic('#ffffff')); LB.add(s.lab.dropBead);
  s.lab.sci = chibi({ robe: '#f4f4f4', hair: '#5a4a3a', sleeve: '#f4f4f4' }); { const gl = new T.Mesh(new T.TorusGeometry(0.1, 0.02, 5, 12), basic('#1a1420')); gl.position.set(-0.14, 0.04, 0.4); const gl2 = gl.clone(); gl2.position.x = 0.14; s.lab.sci.userData.head.add(gl, gl2); }
  s.lab.sci.position.set(-3.6, 0.4, 1.4); s.lab.sci.rotation.y = 0.5; LB.add(s.lab.sci);
  s.lab.zap = rope(LB, '#ffe08a'); s.lab.zapG = glow('rgba(255,230,140,1)', 1.6, 0.9); LB.add(s.lab.zapG);
  s.lab.btn = [P.coral, P.teal].map((c, i) => { const g = new T.Group(); const bs = mk(new T.CylinderGeometry(i ? 0.5 : 0.95, i ? 0.6 : 1.1, 0.5, 16), '#3a4060'); bs.position.y = 0.25; const cap = mk(new T.CylinderGeometry(i ? 0.38 : 0.78, i ? 0.42 : 0.82, 0.4, 16), c, { emissive: new T.Color(c), emissiveIntensity: 0.35 }); cap.position.y = 0.65; g.add(bs, cap); g.userData.cap = cap;
    const ic = i ? smileIcon() : handIcon(c === P.coral ? '#ffd0d8' : undefined); ic.scale.setScalar(i ? 0.6 : 0.8); ic.position.y = i ? 1.6 : 1.9; if (i) ic.rotation.x = -0.2; g.add(ic); g.position.set(i ? 4.6 : 2.6, 0.4, -2.6); LB.add(g); return g; });
  s.lab.phum = chibi({ robe: PHUM, hair: '#1e1a22', sleeve: PHUM }); s.lab.phum.position.set(-0.6, 0.4, 2.6); LB.add(s.lab.phum); s.lab.ph = phone(0.5); LB.add(s.lab.ph);

  /* ---------- heaven story (Mandhatu) ---------- */
  const H = new T.Group(); place(H, 'HEAV'); scene.add(H); s.hv = { g: H };
  const isl = mk(new T.CylinderGeometry(10, 8, 1.2, 20), '#4f8a52'); isl.position.y = -0.6; H.add(isl);
  const pal0 = palace('#fbe9c2'); pal0.position.set(0, 0, -4.2); pal0.scale.setScalar(1.1); H.add(pal0);
  s.hv.th0 = throne(); s.hv.th0.position.set(0, 0, 0.2); H.add(s.hv.th0);
  s.hv.king = chibi({ robe: '#fff3d0', sash: P.gold, hair: '#2a2228', crown: true, sleeve: '#fff3d0' }); H.add(s.hv.king);
  s.hv.kingHair = s.hv.king.userData.head.children.find((c) => c.geometry && c.geometry.type === 'SphereGeometry' && c.geometry.parameters.radius === 0.43);
  { const n = 260, im = new T.InstancedMesh(new T.OctahedronGeometry(0.14, 0), M('#ffffff', { emissive: new T.Color('#404040'), emissiveIntensity: 0.4 }), n); const JC = ['#ff5d73', '#ffc94a', '#2ee6c5', '#8f7bff', '#7fd0ff', '#ffffff', '#9fe870'];
    for (let i = 0; i < n; i++) im.setColorAt(i, new T.Color(JC[i % 7])); im.userData.seed = Array.from({ length: n }, () => [rnd(), rnd(), rnd()]); H.add(im); s.hv.jewels = im; }
  s.hv.pile = mk(new T.CylinderGeometry(4.2, 4.6, 1, 18), '#e8c060', { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35 }); H.add(s.hv.pile);
  for (let i = 0; i < 10; i++) { const tr = tree(1.2, '#3f8f5a'); const a = i * 0.63; tr.position.set(Math.cos(a) * 8, 0, Math.sin(a) * 6 - 1); if (Math.sin(a) > 0.3) continue; H.add(tr); }
  // level 1: Catumaharajika (y 16)
  const C1 = new T.Group(); C1.position.y = 16; H.add(C1); s.hv.c1 = C1;
  for (const q of [[0, 0, 0, 2.6], [-4, -0.2, 1, 2.2], [4, -0.2, 1.2, 2.3], [0, -0.3, -3, 2.6]]) { const c = cloud(q[3]); c.position.set(q[0], q[1] - 1.4, q[2]); C1.add(c); }
  s.hv.guards = ['#ff8a5a', '#7fd0ff', '#9fe870', '#ffc94a'].map((c, i) => { const g = chibi({ robe: c, skin: '#a8b8d8', crown: true, eyeGlow: '#7ff0ff', sleeve: c, s: 0.95 }); const a = -2.2 + i * 1.47; g.position.set(Math.cos(a) * 3.6, 0, Math.sin(a) * 2.2 - 0.5); g.rotation.y = -a - Math.PI / 2 + Math.PI; C1.add(g); return g; });
  // level 2: Tavatimsa (y 32)
  const C2 = new T.Group(); C2.position.y = 32; H.add(C2); s.hv.c2 = C2;
  for (const q of [[0, 0, 0, 3], [-5, -0.2, 1, 2.4], [5, -0.2, 1.2, 2.5], [0, -0.3, -3.5, 3], [-3, -0.4, -2, 2.2], [3, -0.4, -2.4, 2.3]]) { const c = cloud(q[3]); c.position.set(q[0], q[1] - 1.5, q[2]); C2.add(c); }
  const pal2 = palace('#e8f0ff'); pal2.position.set(0, 0, -4.5); pal2.scale.setScalar(1.25); C2.add(pal2);
  s.hv.thA = throne(); s.hv.thA.position.set(-1.1, 0, 0.2); s.hv.thB = throne(); s.hv.thB.position.set(1.1, 0, 0.2); C2.add(s.hv.thA, s.hv.thB);
  s.hv.sakka = chibi({ robe: '#ffffff', skin: '#a8b8d8', crown: true, eyeGlow: '#7ff0ff', sleeve: '#a8b8d8', sash: P.gold }); C2.add(s.hv.sakka);
  // Jetavana corner (verse)
  const JV = new T.Group(); JV.position.set(16, 0, 0); H.add(JV); s.hv.jv = JV;
  const isl2 = mk(new T.CylinderGeometry(6, 5, 1.2, 18), '#4f8a52'); isl2.position.y = -0.6; JV.add(isl2);
  const bt = tree(2.2, '#2f7f4a'); bt.position.set(-3.0, 0, -2.8); JV.add(bt);
  const slab = mk(new T.BoxGeometry(2.4, 0.4, 1.8), '#9a9488'); slab.position.set(0, 0.2, -1.2); JV.add(slab);
  s.hv.bud = buddha(1.25); s.hv.bud.position.set(0, 0.4, -1.2); JV.add(s.hv.bud);
  s.hv.monk = chibi({ robe: ROBE, sash: ROBE2 }); setSit(s.hv.monk, true); anjali(s.hv.monk); s.hv.monk.position.set(1.5, 0, 1.0); s.hv.monk.rotation.y = -1.9; JV.add(s.hv.monk);
  s.hv.coins = []; for (let i = 0; i < 40; i++) { const c = coin(); c.userData.seed = [rnd(), rnd(), rnd()]; JV.add(c); s.hv.coins.push(c); }
  return s;
}
