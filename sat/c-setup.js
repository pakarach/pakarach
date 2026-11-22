/* Part C: stations + setup */
const ST = {
  LAD: [0, 0, 0], GRASS: [40, 0, 0], DUNG: [55, 0, 0], DARK: [70, 0, 0], WATER: [85, 0, 0], FILTH: [100, 0, 0], SWARM: [115, 0, 0], NAIL: [132, 0, 0],
  NAGA: [170, 0, 0], KOL: [210, 0, 0], OCEAN: [250, 0, 0], PAL: [290, 0, 0], GAG: [330, 0, 0], TEMPLE: [420, 0, 0], HUT: [470, 0, 0],
};
const TER = 4.5; /* ladder terrace spacing */
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

function setupScene(scene) {
  const s = { anchorV: new T.Vector3() };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#3a5a8a', 40, 120); s.fog = scene.fog;
  const add = (o) => (scene.add(o), o);

  /* ---------- ground (valley .. temple) ---------- */
  const ground = mk(new T.BoxGeometry(470, 0.4, 120), '#4f7a52'); ground.position.set(260, -0.2, -32); scene.add(ground);
  const busy = [40, 55, 70, 85, 100, 115, 132, 170, 210, 250, 290, 330, 420, 470];
  for (let i = 0; i < 170; i++) {
    const x = 28 + rnd() * 460, z = -80 + rnd() * 80; if (busy.some((c) => Math.abs(c - x) < 10) && z > -16) continue; if (x > 228 && x < 272) continue;
    const tr = tree(0.8 + rnd() * 0.9, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  for (const h of [[50, -62, 16], [110, -60, 18], [200, -64, 18], [300, -60, 20], [380, -62, 16], [450, -58, 18]]) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#5a7f5e'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- LADDER: 5 terraces on a floating mountain (MN 12) ---------- */
  const LG = add(new T.Group()); place(LG, 'LAD');
  const mtn = mk(new T.ConeGeometry(8, TER * 5.6, 8), '#3a3a62'); mtn.position.set(0, TER * 2.2, -6); LG.add(mtn);
  const under = mk(new T.ConeGeometry(7, 9, 8), '#3a3a5a'); under.rotation.x = Math.PI; under.position.set(0, -4.6, -3); LG.add(under);
  for (let i = 0; i < 6; i++) { const c = cloud(1.4 + (i % 3) * 0.4); c.position.set(-9 + i * 3.6, -1.5 + (i % 2), 1 - (i % 3) * 3); LG.add(c); }
  s.lad = { ter: [], fx: {} };
  const terCol = ['#5a3a3a', '#6a5a3a', '#6a6a5a', '#4f7a52', '#e8e0ff'];
  for (let k = 0; k < 5; k++) {
    const g = new T.Group(); g.position.set(0, k * TER, 0); LG.add(g);
    const slab = mk(new T.CylinderGeometry(4.6, 4.0, 0.7, 10), terCol[k]); slab.position.y = -0.35; g.add(slab);
    const ring = new T.Mesh(new T.RingGeometry(4.65, 4.95, 40), basic(LV[k][1], { transparent: true, opacity: 0, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; g.add(ring);
    s.lad.ter.push({ g, ring });
  }
  { /* 0 hell: pit of glowing coals */
    const g = s.lad.ter[0].g; const p = pit(2.3, '#3a2626', '#ff5a1a', { emi: '#ff3a00' }); g.add(p);
    s.lad.fx.coals = [];
    for (let i = 0; i < 26; i++) { const c = new T.Mesh(new T.IcosahedronGeometry(0.22 + rnd() * 0.12, 0), basic(['#ff7a2a', '#ffb347', '#e04a10'][i % 3])); const a = rnd() * 6.283, r = Math.sqrt(rnd()) * 2.0; c.position.set(Math.cos(a) * r, 0.12, Math.sin(a) * r); g.add(c); s.lad.fx.coals.push(c); }
    const gl = softSprite('rgba(255,110,40,1)', 0.8); gl.scale.setScalar(7); gl.position.y = 1; g.add(gl); s.lad.fx.hellGlow = gl;
  }
  { /* 1 animals: cesspit + flies */
    const g = s.lad.ter[1].g; g.add(pit(2.2, '#5a4632', '#4a3018'));
    for (let i = 0; i < 5; i++) { const b = mk(new T.SphereGeometry(0.18 + rnd() * 0.15, 6, 5), '#3a2410'); b.scale.y = 0.4; b.position.set((rnd() - 0.5) * 3, 0.08, (rnd() - 0.5) * 3); g.add(b); }
    s.lad.fx.flies = [];
    for (let i = 0; i < 12; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); g.add(f); s.lad.fx.flies.push(f); }
    s.lad.cow = ANI.cow(); s.lad.cow.position.set(3.0, 0, 1.6); s.lad.cow.rotation.y = -0.9; g.add(s.lad.cow);
    s.lad.dog = ANI.dog(); s.lad.dog.position.set(-3.1, 0, 1.5); s.lad.dog.rotation.y = 0.9; g.add(s.lad.dog);
    s.lad.man = chibi({ robe: '#5a8ac8', hair: '#2a2228', s: 0.9 }); s.lad.man.position.set(-1.0, 0, 3.2); g.add(s.lad.man); s.lad.man.visible = false;
    s.lad.walker = ANI.ox(); s.lad.walker.scale.setScalar(0.9); g.add(s.lad.walker); s.lad.walker.visible = false;
    s.lad.barH = new T.Mesh(new T.BoxGeometry(2.6, 0.08, 0.08), basic(P.gold)); g.add(s.lad.barH); s.lad.barV = new T.Mesh(new T.BoxGeometry(0.08, 1.9, 0.08), basic(P.teal)); g.add(s.lad.barV);
  }
  { /* 2 ghosts: rugged ground + thin tree */
    const g = s.lad.ter[2].g; for (let i = 0; i < 9; i++) { const r = rock(0.3 + rnd() * 0.4, ['#6a5a4a', '#7a6a5a'][i % 2]); r.position.set((rnd() - 0.5) * 6, 0.1, (rnd() - 0.5) * 5); g.add(r); }
    const tt = thinTree(1.0); tt.position.set(0, 0, -0.6); g.add(tt);
    for (let i = 0; i < 5; i++) { const sp = new T.Mesh(new T.CircleGeometry(0.3 + rnd() * 0.2, 10), basic('#2a2a20', { transparent: true, opacity: 0.45 })); sp.rotation.x = -Math.PI / 2; sp.position.set((rnd() - 0.5) * 2.4, 0.03, (rnd() - 0.3) * 2); g.add(sp); }
  }
  { /* 3 humans: dense shade tree + resting person */
    const g = s.lad.ter[3].g; const bt = bigTree(0.85); bt.position.set(0, 0, -1.4); g.add(bt);
    const sh = new T.Mesh(new T.CircleGeometry(2.6, 20), basic('#20402a', { transparent: true, opacity: 0.5 })); sh.rotation.x = -Math.PI / 2; sh.position.set(0, 0.03, -0.4); g.add(sh);
    const pr = chibi({ robe: P.teal, hair: '#2a2228', s: 0.85 }); setSit(pr, true); pr.position.set(1.2, 0, 1.0); pr.rotation.y = -0.4; g.add(pr); s.lad.rest = pr;
  }
  { /* 4 devas: palace */
    const g = s.lad.ter[4].g; const pa = palace(); pa.scale.setScalar(0.7); pa.position.set(0, 0, -0.8); g.add(pa);
    const dv = deva('#9fd0ff'); dv.position.set(2.0, 0, 1.4); dv.scale.setScalar(0.85); g.add(dv); s.lad.deva = dv;
  }
  s.lad.orbs = [orb('rgba(140,255,150,1)'), orb('rgba(255,120,120,1)'), orb('rgba(255,210,120,1)'), orb('rgba(255,210,120,1)'), orb('rgba(255,210,120,1)')];
  s.lad.orbs.forEach((o) => { o.scale.setScalar(1.4); LG.add(o); o.visible = false; });
  s.lad.g = LG;

  /* ---------- valley: 5 groups (MN 129) ---------- */
  { const m = mk(new T.CylinderGeometry(7, 7.2, 0.1, 18), '#6aa85a'); place(m, 'GRASS', 0, 0.02, -1); scene.add(m); }
  s.grass = [];
  for (const [kind, x, z, r] of [['cow', -2.6, -0.8, 0.5], ['goat', 1.0, 0.6, -0.6], ['deer', 3.2, -1.4, -1.6], ['horse', -0.4, -3.2, 0.8], ['cow', 2.0, -4.2, 2.6], ['goat', -3.6, 1.6, 0.9]]) { const a = ANI[kind](); place(a, 'GRASS', x, 0, z); a.rotation.y = r; scene.add(a); s.grass.push(a); }
  { const hp = new T.Group(); place(hp, 'DUNG', 0, 0, -0.6); scene.add(hp);
    for (let i = 0; i < 7; i++) { const c = mk(new T.ConeGeometry(0.5 + rnd() * 0.4, 0.5 + rnd() * 0.4, 6), ['#6a4a28', '#5a3a1e'][i % 2]); c.position.set((rnd() - 0.5) * 1.6, 0.25, (rnd() - 0.5) * 1.2); hp.add(c); }
    s.dung = { heap: hp, flies: [], runners: [] };
    for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); scene.add(f); s.dung.flies.push(f); }
    const kinds = [chicken(), ANI.pig(), ANI.dog(), ANI.jackal(), chicken('#b8682a')];
    kinds.forEach((a, i) => { scene.add(a); s.dung.runners.push({ a, ang: -2.6 + i * 1.3 }); });
  }
  { /* darkness: soil cross-section */
    const blk = mk(new T.BoxGeometry(9, 4, 3), '#7a5638'); place(blk, 'DARK', 0, 2, -1.5); scene.add(blk);
    const top = mk(new T.BoxGeometry(9.1, 0.3, 3.1), '#5f8f4a'); place(top, 'DARK', 0, 4.1, -1.5); scene.add(top);
    s.dark = { worms: [], moths: [] };
    for (const q of [[-2.5, 1.0], [1.2, 2.0], [-0.4, 0.6], [2.8, 1.2], [-1.6, 2.8]]) { const tn = mk(new T.BoxGeometry(2.2, 0.55, 0.3), '#2a1a12'); place(tn, 'DARK', q[0], q[1], 0.02); scene.add(tn); const w = worm(7, '#e09a8a'); place(w, 'DARK', q[0] - 0.4, q[1] - 0.2, 0.15); scene.add(w); s.dark.worms.push(w); }
    for (let i = 0; i < 6; i++) { const m = moth(); scene.add(m); s.dark.moths.push(m); }
  }
  { /* water: pond */
    const pond = new T.Mesh(new T.CircleGeometry(6, 28), M('#2f6fb0', { transparent: true, opacity: 0.85, emissive: new T.Color('#10305a'), emissiveIntensity: 0.3 })); pond.rotation.x = -Math.PI / 2; place(pond, 'WATER', 0, 0.06, -1); scene.add(pond);
    s.water = { fish: [], pond };
    for (let i = 0; i < 5; i++) { const f = fish(0.8 + (i % 3) * 0.25, ['#f0a040', '#e86a4a', '#f6d060', '#8ac0e0', '#f0a040'][i]); scene.add(f); s.water.fish.push(f); }
    s.water.turtle = turtle(0.8); place(s.water.turtle, 'WATER', 2.2, 0.12, 1.6); s.water.turtle.rotation.y = -0.6; scene.add(s.water.turtle);
    s.water.croc = croc(); place(s.water.croc, 'WATER', -4.6, 0.02, 2.2); s.water.croc.rotation.y = 0.9; scene.add(s.water.croc);
    for (let i = 0; i < 8; i++) { const r = mk(new T.CylinderGeometry(0.03, 0.03, 1 + rnd(), 4), '#5a8a3a'); place(r, 'WATER', -5 + rnd() * 10, 0.5, -6 + rnd() * 1.2); scene.add(r); }
  }
  { /* filth: murky pool */
    const pool = new T.Mesh(new T.CircleGeometry(3.4, 20), M('#4a5a2a', { emissive: new T.Color('#202a10'), emissiveIntensity: 0.4 })); pool.rotation.x = -Math.PI / 2; place(pool, 'FILTH', 0, 0.05, -0.6); scene.add(pool);
    for (let i = 0; i < 6; i++) { const b = mk(new T.SphereGeometry(0.25 + rnd() * 0.2, 6, 5), '#3a3a1e'); b.scale.y = 0.4; place(b, 'FILTH', (rnd() - 0.5) * 4, 0.08, -0.6 + (rnd() - 0.5) * 3); scene.add(b); }
    const bone = new T.Group(); place(bone, 'FILTH', 1.2, 0.12, 0.2); scene.add(bone);
    const sp = mk(new T.BoxGeometry(1.4, 0.06, 0.06), '#e8e0c8'); bone.add(sp); for (let i = 0; i < 5; i++) { const rb = mk(new T.BoxGeometry(0.04, 0.04, 0.42), '#e8e0c8'); rb.position.x = -0.5 + i * 0.25; bone.add(rb); } const hd = mk(new T.ConeGeometry(0.22, 0.4, 4), '#e8e0c8'); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.85; bone.add(hd);
    s.filth = { mag: [], flies: [] };
    for (let i = 0; i < 14; i++) { const m = mk(new T.SphereGeometry(0.07, 6, 4), '#f6f0e0'); m.scale.z = 2.2; scene.add(m); s.filth.mag.push(m); }
    for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); scene.add(f); s.filth.flies.push(f); }
  }
  { /* swarm: insects vs one person */
    const n = 2600, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const a = rnd() * 6.283, r = Math.pow(rnd(), 0.6) * 9, y = 0.3 + rnd() * 6; p[i * 3] = ST.SWARM[0] + Math.cos(a) * r; p[i * 3 + 1] = y; p[i * 3 + 2] = -2 + Math.sin(a) * r * 0.7; }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(p, 3)); geo.setDrawRange(0, 0);
    s.swarm = { pts: new T.Points(geo, new T.PointsMaterial({ color: '#2a2a2a', size: 0.09 })), base: p.slice(0) }; scene.add(s.swarm.pts);
    s.swarm.man = chibi({ robe: P.teal, hair: '#2a2228' }); place(s.swarm.man, 'SWARM', 0, 0, 1.4); scene.add(s.swarm.man);
  }
  { /* fingernail dust vs the earth */
    const earth = new T.Group(); place(earth, 'NAIL', 0, 0, -2); scene.add(earth);
    const slab = mk(new T.CylinderGeometry(7.5, 6.8, 1.2, 16), '#6a8a4a'); slab.position.y = 0.6; earth.add(slab);
    for (let i = 0; i < 6; i++) { const m = mk(new T.ConeGeometry(1 + rnd(), 1.4 + rnd() * 1.2, 6), '#7a9a5a'); m.position.set(-5 + i * 2, 1.4, -2 - rnd() * 3); earth.add(m); }
    for (let i = 0; i < 10; i++) { const tr = tree(0.6 + rnd() * 0.4); tr.position.set((rnd() - 0.5) * 11, 1.2, (rnd() - 0.5) * 8); earth.add(tr); }
    s.nail = { earth, f: finger() }; place(s.nail.f, 'NAIL', 1.5, 5.0, 2.2); s.nail.f.rotation.y = -0.35; scene.add(s.nail.f);
    s.nail.f.traverse((o) => { if (o.isMesh && o.material.color && o.material.color.getHexString() === 'e8b890') o.material = M('#f2c86a', GOLDM); });
    s.nail.glow = softSprite('rgba(46,230,197,1)', 0.9); s.nail.glow.scale.setScalar(1.4); scene.add(s.nail.glow);
  }

  /* ---------- NAGA world (underwater) ---------- */
  { const bed = mk(new T.CylinderGeometry(14, 14, 0.6, 20), '#2a4a5a'); place(bed, 'NAGA', 0, -0.3, -3); scene.add(bed);
    const surf = new T.Mesh(new T.PlaneGeometry(40, 40), basic('#7fd0ff', { transparent: true, opacity: 0.25, side: T.DoubleSide })); surf.rotation.x = Math.PI / 2; place(surf, 'NAGA', 0, 9, -3); scene.add(surf);
    for (let i = 0; i < 14; i++) { const w = mk(new T.ConeGeometry(0.15, 1.5 + rnd() * 2, 4), ['#2f8a6a', '#3fa07a'][i % 2]); place(w, 'NAGA', -10 + rnd() * 20, 0.8, -9 + rnd() * 8); scene.add(w); }
    for (let i = 0; i < 8; i++) { const r = rock(0.6 + rnd() * 0.6, '#3a5a6a'); place(r, 'NAGA', -9 + rnd() * 18, 0.2, -8 + rnd() * 9); scene.add(r); }
    const shelf = mk(new T.BoxGeometry(5, 0.6, 3), '#6a7a6a'); place(shelf, 'NAGA', -6, 9.2, -5); scene.add(shelf);
    s.naga = { big: nagaModel(34, 0.42, '#2e9a7a', '#46c098'), small: nagaModel(22, 0.26, '#3a7aa0', '#5aa0c8'), bubbles: [] };
    scene.add(s.naga.big, s.naga.small);
    s.naga.human = chibi({ robe: '#e8e0cc', hair: '#2a2228', sash: '#2e9a7a', s: 1.1 }); scene.add(s.naga.human);
    s.naga.giver = chibi({ robe: '#e6b85c', hair: '#2a2228' }); place(s.naga.giver, 'NAGA', -6, 9.5, -4.4); scene.add(s.naga.giver);
    const bowl = mk(new T.SphereGeometry(0.24, 10, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), '#c8a060'); bowl.position.set(0, 0.62, 0.45); s.naga.giver.add(bowl);
    s.naga.path = (() => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push(new T.Vector3(ST.NAGA[0] - 6 + u * 6, 9.4 - u * 7.6, -4.4 + u * 4)); } const geo = new T.BufferGeometry().setFromPoints(pts); const ln = new T.Line(geo, new T.LineDashedMaterial({ color: P.gold, dashSize: 0.35, gapSize: 0.25, transparent: true, depthTest: false })); ln.computeLineDistances(); ln.renderOrder = 5; geo.setDrawRange(0, 0); scene.add(ln); return ln; })();
    s.naga.gar = garuda(); s.naga.gar.scale.setScalar(1.3); scene.add(s.naga.gar);
    for (let i = 0; i < 14; i++) { const b = new T.Mesh(new T.SphereGeometry(0.08 + rnd() * 0.08, 6, 5), basic('#cff4ff', { transparent: true, opacity: 0.6 })); b.userData.ph = rnd(); b.userData.x = -8 + rnd() * 16; b.userData.z = -6 + rnd() * 8; scene.add(b); s.naga.bubbles.push(b); }
    s.naga.labS = label('เกิดจากไข่', { w: 2.4, px: 76, color: '#9fd0ff' }); s.naga.labB = label('ผุดเกิด', { w: 2.2, px: 76, color: P.gold }); scene.add(s.naga.labS, s.naga.labB);
    s.naga.spark = softSprite('rgba(180,255,220,1)', 1); s.naga.spark.scale.setScalar(4); scene.add(s.naga.spark);
  }

  /* ---------- Koliya village (Seniya, Punna, the Buddha) ---------- */
  { for (const q of [[-5.5, -4.2], [5.8, -4.6], [0.5, -7.2]]) { const h = hut(2.6, 2.2, 1.7); place(h, 'KOL', q[0], 0, q[1]); scene.add(h); }
    const bt = bigTree(1.2, '#3f8f5a'); place(bt, 'KOL', -1.5, 0, -2.4); scene.add(bt);
    s.kol = { bud: buddha(1.25) }; place(s.kol.bud, 'KOL', -1.3, 0, -1.2); scene.add(s.kol.bud);
    s.kol.sen = seniyaModel(); scene.add(s.kol.sen); s.kol.senMonk = monk(1); scene.add(s.kol.senMonk);
    s.kol.pun = punnaModel(); scene.add(s.kol.pun);
    s.kol.vill = chibi({ robe: '#c97b9a', hair: '#2a2228', bun: true, s: 0.95 }); scene.add(s.kol.vill);
    s.kol.food = []; for (let i = 0; i < 4; i++) { const f = mk(new T.SphereGeometry(0.1, 6, 5), '#f6f0e0'); scene.add(f); s.kol.food.push(f); }
    s.kol.ghost = ANI.dog(); s.kol.ghost.scale.setScalar(1.6); s.kol.ghost.traverse((o) => { if (o.isMesh) o.material = basic('#b8c8ff', { transparent: true, opacity: 0.45, depthWrite: false }); }); scene.add(s.kol.ghost);
    s.kol.red = softSprite('rgba(255,80,60,1)', 0.7); s.kol.red.scale.setScalar(3.5); scene.add(s.kol.red);
    s.kol.tears = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.05, 6, 5), basic('#8fd8ff')); scene.add(d); s.kol.tears.push(d); }
    s.kol.halo = softSprite('rgba(255,215,120,1)', 0.9); s.kol.halo.scale.setScalar(4.5); scene.add(s.kol.halo);
    s.kol.feast = new T.Group(); place(s.kol.feast, 'KOL', 6.5, 0, 1.0); scene.add(s.kol.feast);
  }

  /* ---------- ocean: blind turtle + yoke, fish chain ---------- */
  { const sea = new T.Mesh(new T.PlaneGeometry(60, 60, 30, 30), M('#2a6ab0', { transparent: true, opacity: 0.72, emissive: new T.Color('#0a2a5a'), emissiveIntensity: 0.3 })); sea.rotation.x = -Math.PI / 2; place(sea, 'OCEAN', 0, 0.6, -6); scene.add(sea);
    const deep = mk(new T.BoxGeometry(60, 0.2, 60), '#0e2a4a'); place(deep, 'OCEAN', 0, -4, -6); scene.add(deep);
    s.ocean = { sea, yoke: yoke(), turtle: turtle(1.1), fish: [fish(0.6, '#f6d060'), fish(1.1, '#e86a4a'), fish(1.9, '#5a7aa0')], arrows: [] };
    scene.add(s.ocean.yoke, s.ocean.turtle); s.ocean.fish.forEach((f) => scene.add(f));
    for (let i = 0; i < 3; i++) { const a = new T.Group(); const sh = new T.Mesh(new T.BoxGeometry(1.4, 0.06, 0.06), basic('#e8f6ff', { transparent: true, opacity: 0.8 })); const hd = new T.Mesh(new T.ConeGeometry(0.14, 0.32, 5), basic('#e8f6ff', { transparent: true, opacity: 0.8 })); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.8; a.add(sh, hd); scene.add(a); s.ocean.arrows.push(a); }
    const sun = softSprite('rgba(255,240,200,1)', 0.9); sun.scale.setScalar(6); place(sun, 'OCEAN', 8, 12, -24); scene.add(sun);
  }

  /* ---------- Palileyyaka forest ---------- */
  { for (let i = 0; i < 12; i++) { const a = -1.5 + i * 0.27, r = 7 + (i % 3); const tr = bigTree(0.7 + (i % 3) * 0.15, ['#2f7f4a', '#3f8f5a'][i % 2]); place(tr, 'PAL', Math.sin(a) * r, 0, -2 - Math.cos(a) * r * 0.6); scene.add(tr); }
    const sal = bigTree(1.35, '#3f9a5a'); place(sal, 'PAL', 0, 0, -2.6); scene.add(sal);
    s.pal = { bud: buddha(1.25), ele: elephant() }; place(s.pal.bud, 'PAL', 0, 0, -1.2); scene.add(s.pal.bud, s.pal.ele);
    s.pal.pot = mk(new T.CylinderGeometry(0.22, 0.16, 0.36, 10), '#a0603a'); scene.add(s.pal.pot);
    s.pal.drops = []; for (let i = 0; i < 8; i++) { const d = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#9fe0ff')); scene.add(d); s.pal.drops.push(d); }
    s.pal.grass = []; for (let i = 0; i < 10; i++) { const g = mk(new T.ConeGeometry(0.12, 0.5, 4), '#5aa04a'); place(g, 'PAL', 1.4 + (i % 5) * 0.5, 0.25, 1.0 + Math.floor(i / 5) * 0.5); scene.add(g); s.pal.grass.push(g); }
    s.pal.orb = orb('rgba(255,215,140,1)'); s.pal.orb.scale.setScalar(1.6); scene.add(s.pal.orb);
  }

  /* ---------- Gaggara lake (dusk): sermon, frog, cowherd, sky palace ---------- */
  { const lake = new T.Mesh(new T.CircleGeometry(9, 30), M('#3a6aa0', { transparent: true, opacity: 0.9, emissive: new T.Color('#2a3a6a'), emissiveIntensity: 0.4 })); lake.rotation.x = -Math.PI / 2; lake.scale.y = 0.6; place(lake, 'GAG', 2, 0.05, 6); scene.add(lake);
    for (let i = 0; i < 6; i++) { const pad = new T.Mesh(new T.CircleGeometry(0.45 + rnd() * 0.2, 10), M('#3f9a4a')); pad.rotation.x = -Math.PI / 2; place(pad, 'GAG', -2 + rnd() * 8, 0.08, 4.2 + rnd() * 3); scene.add(pad); }
    const seat = mk(new T.CylinderGeometry(1.1, 1.2, 0.5, 12), '#c8a878'); place(seat, 'GAG', 0, 0.25, -2.2); scene.add(seat);
    const sal = bigTree(1.2, '#2f6a4a'); place(sal, 'GAG', -0.6, 0, -4.6); scene.add(sal);
    s.gag = { bud: buddha(1.25), aud: [], frog: frog(1.0), cow: cowherd(), dv: deva('#5fd16a'), rings: [] };
    place(s.gag.bud, 'GAG', 0, 0.5, -2.2); scene.add(s.gag.bud);
    for (let i = 0; i < 9; i++) { const lay = i % 3 === 0; const c = lay ? chibi({ robe: ['#e6b85c', '#c97b9a', '#7fb3d5'][i % 3 === 0 ? (i / 3) % 3 : 0], hair: '#2a2228', s: 0.8 }) : monk(0.8); setSit(c, true); anjali(c); const a = -1.1 + (i % 5) * 0.55, r = 3.4 + Math.floor(i / 5) * 1.3; place(c, 'GAG', Math.sin(a) * r, 0, -2.2 + Math.cos(a) * r * 0.75); face(c, -Math.sin(a), -Math.cos(a)); scene.add(c); s.gag.aud.push(c); }
    scene.add(s.gag.frog, s.gag.cow, s.gag.dv);
    for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.RingGeometry(0.9, 1.0, 36), basic('#ffe8a0', { transparent: true, opacity: 0.6, side: T.DoubleSide })); r.rotation.x = -Math.PI / 2; scene.add(r); s.gag.rings.push(r); }
    s.gag.orb = orb('rgba(170,255,170,1)'); s.gag.orb.scale.setScalar(1.3); scene.add(s.gag.orb);
    s.gag.flash = softSprite('rgba(255,255,230,1)', 1); s.gag.flash.scale.setScalar(3); scene.add(s.gag.flash);
    s.gag.beam = new T.Mesh(new T.CylinderGeometry(0.35, 0.6, 1, 10, 1, true), basic('#ffe9a0', { transparent: true, opacity: 0.35, side: T.DoubleSide, depthWrite: false })); scene.add(s.gag.beam);
    const sky = new T.Group(); place(sky, 'GAG', 4.4, 3.4, -9); scene.add(sky); s.gag.sky = sky;
    const cl = cloud(1.3); cl.position.y = -0.3; sky.add(cl); const pa = palace(); pa.scale.setScalar(0.55); pa.position.y = 0.1; sky.add(pa);
    const pg = softSprite('rgba(255,220,140,1)', 0.6); pg.scale.setScalar(7); pg.position.y = 1.2; sky.add(pg);
    s.gag.labFrog = label('สระคัคครา', { w: 2.6, px: 76, color: '#9fd0ff' }); place(s.gag.labFrog, 'GAG', 3.6, 1.2, 5.4); scene.add(s.gag.labFrog);
  }

  /* ---------- temple (present day ordination) ---------- */
  { const TP = new T.Group(); place(TP, 'TEMPLE'); scene.add(TP);
    const floor = mk(new T.BoxGeometry(20, 0.3, 14), '#7a2418'); floor.position.set(0, -0.15, -1); TP.add(floor);
    const wall = mk(new T.BoxGeometry(20, 12, 0.4), '#4a140e'); wall.position.set(0, 6, -6.6); TP.add(wall);
    for (const y of [2.2, 9.5]) { const tr = mk(new T.BoxGeometry(20, 0.18, 0.1), P.gold, GOLDM); tr.position.set(0, y, -6.35); TP.add(tr); }
    for (const x of [-8, 8]) { const pl = mk(new T.CylinderGeometry(0.45, 0.45, 12, 8), '#9a2a1a'); pl.position.set(x, 6, -4.5); TP.add(pl); }
    const glow = softSprite('rgba(255,200,90,1)', 0.55); glow.scale.set(9, 9, 1); glow.position.set(0, 4.6, -5.6); TP.add(glow);
    const ped = mk(new T.CylinderGeometry(2.0, 2.2, 0.9, 12), P.gold, GOLDM); ped.position.set(0, 0.45, -4.4); TP.add(ped);
    const bud = buddha(2.4); bud.position.set(0, 0.9, -4.4); TP.add(bud);
    s.tmp = { monks: [], g: TP };
    for (let i = 0; i < 5; i++) { const m = monk(0.95); setSit(m, true); m.position.set(-3.6 - (i % 2) * 1.1, 0, -2.4 + i * 1.0); m.rotation.y = Math.PI / 2; TP.add(m); s.tmp.monks.push(m); }
    s.tmp.nak = chibi({ robe: '#f8f8f2', sash: '#e8e8e0' }); setSit(s.tmp.nak, true); anjali(s.tmp.nak); s.tmp.nak.position.set(1.4, 0, 0.2); s.tmp.nak.rotation.y = -Math.PI / 2 + 0.35; TP.add(s.tmp.nak);
    for (const sx of [-1, 1]) { const nk = nagaModel(16, 0.3, P.gold, '#e0a030'); nk.scale.setScalar(1); TP.add(nk); setNaga(nk, (u) => [sx * 6.2, 0.4 + (1 - u) * 1.6 + Math.sin(u * 9) * 0.15, -3 + u * 6]); }
  }
  /* ---------- Vinaya flashback hut (naga monk) ---------- */
  { const h = hut(4.2, 3.4, 2.6, '#c9a77a', '#8f6a3a', { door: true }); place(h, 'HUT', 0, 0, -1.5); scene.add(h); s.hut = { h };
    for (const sx of [-1, 1]) { const w = mk(new T.BoxGeometry(0.9, 0.7, 0.06), '#2a1a10'); place(w, 'HUT', sx * 1.25, 1.45, 0.24); scene.add(w); }
    s.hut.naga = nagaModel(40, 0.36, '#2e9a7a', '#46c098'); scene.add(s.hut.naga);
    s.hut.youth = chibi({ robe: '#e8e0cc', hair: '#2a2228', sash: '#2e9a7a' }); scene.add(s.hut.youth);
    s.hut.ymonk = monk(1); s.hut.ymonk.userData.sash.material = M('#2e9a7a'); scene.add(s.hut.ymonk);
    s.hut.monks = [monk(1), monk(1)]; s.hut.monks.forEach((m) => scene.add(m));
    s.hut.bud = buddha(1.2); place(s.hut.bud, 'HUT', -5.2, 0, 0.8); scene.add(s.hut.bud);
    s.hut.tears = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), basic('#8fd8ff')); scene.add(d); s.hut.tears.push(d); }
    const moon = softSprite('rgba(220,230,255,1)', 0.9); moon.scale.setScalar(3); place(moon, 'HUT', 5, 8, -10); scene.add(moon);
  }
  return s;
}
