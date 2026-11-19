/* Part C: stations + setup */
const ST = {
  CASTLE: [0, 0, 0], POL: [60, 0, 0], VIL: [120, 0, 0], MED: [180, 0, 0], LAB: [240, 0, 0], EXE: [300, 0, 0], VOLC: [360, 0, 0],
  VILLA: [420, 0, 0], LIB: [480, 0, 0], CINE: [540, 0, 0], CAVE: [600, 0, 0], BLOOD: [660, 0, 0], GLOBE: [-600, 0, 0], MAP: [-1000, 0, 0],
};
const MP = FK.project(10, 25, 0.3);
const mapXZ = (lon, lat) => { const q = MP(lon, lat); return [ST.MAP[0] + q[0], -q[1]]; };
const PL = {
  pien: [18.7, 53.3], kis: [21.45, 44.7], med: [21.1, 43.7], vienna: [16.37, 48.2], paris: [2.35, 48.85], london: [-0.13, 51.5], exeter: [-71.6, 41.6],
  tambora: [118.0, -8.25], bkk: [100.5, 13.75], geneva: [6.15, 46.2], whitby: [-0.61, 54.49], berlin: [13.4, 52.5], bats: [-88, 14], amaz: [-62, -8],
};
let S = null;
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
function add(st, o, x, y, z) { S.st[st].add(o); o.position.set(x || 0, y || 0, z || 0); return o; }

function setupScene(scene) {
  const s = { st: {}, c: {} }; S = s;
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  s.pt = new T.PointLight('#ffb070', 0, 18); scene.add(s.pt);
  scene.fog = new T.Fog('#141a34', 40, 120); s.fog = scene.fog;
  for (const k in ST) { const g = new T.Group(); g.position.set(ST[k][0], ST[k][1], ST[k][2]); scene.add(g); s.st[k] = g; }

  /* ---------- CASTLE (cover, hook, cliff4, recap, ask) ---------- */
  { const C = {}; s.c.castle = C;
    add('CASTLE', slab(26, 16, '#26323c', '#2a2430'));
    const cs = castle(); cs.scale.setScalar(1.15); add('CASTLE', cs, 0, -0.2, -9); C.castle = cs;
    C.moon = add('CASTLE', moon(2.2), 6.5, 14, -20);
    for (let i = 0; i < 9; i++) { const x = -11 + i * 2.7 + rnd(); const z = -3 - rnd() * 4; if (Math.abs(x) < 5) continue; add('CASTLE', deadTree(0.8 + rnd() * 0.6), x, 0, z); }
    for (const x of [-9, -6.5, 7, 9.5]) add('CASTLE', pine(1.4, '#22403a'), x, 0, -6 - rnd() * 2);
    C.count = chibi({ skin: PALE, body: CAPE, sleeve: CAPE, shirt: '#f2f2f6', hair: '#121018', hairStyle: 'slick', cape: '#121018', capeIn: '#b01c34', fangs: true, brow: '#121018', eyeGlow: '#ff4058', s: 1.25 });
    add('CASTLE', C.count, -1.35, 0, 1.6);
    const cf = coffin(); cf.rotation.x = Math.PI / 2 - 0.32; add('CASTLE', cf, 1.45, 0.05, 2.6); C.coffin = cf;
    C.peasant = chibi({ skin: '#d98a7a', body: '#8a7a5a', sleeve: '#8a7a5a', belt: '#4a3a2a', hair: '#5a4030', closed: true, bloodMouth: true, cheek: '#c04050', s: 0.82 });
    C.peasant.userData.body.scale.set(1.35, 1, 1.35); C.peasant.rotation.x = -Math.PI / 2; C.peasant.position.set(0, 0.32, -0.12); cf.add(C.peasant); C.peasant.rotation.z = 0;
    C.bats = []; for (let i = 0; i < 7; i++) { const b = bat(0.9); add('CASTLE', b, 0, 6, -6); C.bats.push(b); }
    C.q = label('?', { w: 2.0, px: 150, color: P.gold }); add('CASTLE', C.q, 1.45, 4.2, 2.2);
    C.fog = []; for (let i = 0; i < 6; i++) { const f = softSprite('rgba(150,160,210,1)', 0.18, false); f.scale.set(9, 2.4, 1); add('CASTLE', f, -10 + i * 4, 0.6, 3 - (i % 2) * 3); C.fog.push(f); }
  }

  /* ---------- POL (Pień grave, 17th c.) ---------- */
  { const C = {}; s.c.pol = C;
    add('POL', slab(16, 12, '#4f6a46', '#4a3a30'));
    const pit = mk(new T.BoxGeometry(3.2, 0.1, 5.2), '#6a5038'); add('POL', pit, 0, 0.01, 0.4);
    const pit2 = mk(new T.BoxGeometry(2.6, 0.1, 4.6), '#3e2c20'); add('POL', pit2, 0, 0.03, 0.4);
    for (const [x, z] of [[-1.6, -2.2], [1.6, -2.2], [-1.6, 3], [1.6, 3]]) { const p = mk(new T.CylinderGeometry(0.05, 0.05, 0.6, 5), '#c9a46a'); add('POL', p, x, 0.3, z); }
    for (const z of [-2.2, 3]) { const l = new T.Mesh(new T.BoxGeometry(3.2, 0.015, 0.015), basic('#ffeeaa')); add('POL', l, 0, 0.55, z); }
    for (const x of [-1.6, 1.6]) { const l = new T.Mesh(new T.BoxGeometry(0.015, 0.015, 5.2), basic('#ffeeaa')); add('POL', l, x, 0.55, 0.4); }
    /* skeleton lying, head at -z */
    const sk = new T.Group(); add('POL', sk, 0, 0.1, 0.4); const bone = '#efe8d8';
    const skull = mk(new T.SphereGeometry(0.3, 10, 8), bone); skull.position.set(0, 0.15, -1.75); sk.add(skull);
    for (const sx of [-1, 1]) { const e = new T.Mesh(new T.CircleGeometry(0.07, 8), basic('#2a2018')); e.rotation.x = -Math.PI / 2; e.position.set(sx * 0.1, 0.43, -1.68); sk.add(e); }
    const spine = mk(new T.CylinderGeometry(0.05, 0.05, 1.8, 5), bone); spine.rotation.x = Math.PI / 2; spine.position.set(0, 0.1, -0.5); sk.add(spine);
    for (let i = 0; i < 5; i++) { const r = mk(new T.TorusGeometry(0.28 - i * 0.02, 0.025, 4, 10, Math.PI), bone); r.rotation.x = -Math.PI / 2; r.position.set(0, 0.1, -1.25 + i * 0.16); sk.add(r); }
    for (const sx of [-1, 1]) {
      const a = mk(new T.CylinderGeometry(0.04, 0.04, 1.3, 5), bone); a.rotation.x = Math.PI / 2; a.position.set(sx * 0.5, 0.08, -0.7); a.rotation.z = sx * 0.12; sk.add(a);
      const l = mk(new T.CylinderGeometry(0.05, 0.05, 1.6, 5), bone); l.rotation.x = Math.PI / 2; l.position.set(sx * 0.22, 0.08, 1.0); sk.add(l);
      const f = mk(new T.BoxGeometry(0.16, 0.08, 0.28), bone); f.position.set(sx * 0.22, 0.1, 1.9); sk.add(f);
    }
    const pel = mk(new T.BoxGeometry(0.6, 0.12, 0.35), bone); pel.position.set(0, 0.1, 0.15); sk.add(pel);
    /* sickle across the neck */
    const sickle = new T.Group(); const blade = mk(new T.TorusGeometry(0.42, 0.045, 5, 18, 3.4), '#b8c0cc', { metalness: 0.7, roughness: 0.3 }); blade.rotation.x = -Math.PI / 2; sickle.add(blade);
    const hd = mk(new T.CylinderGeometry(0.05, 0.05, 0.9, 6), '#6a4a2a'); hd.rotation.z = Math.PI / 2; hd.position.set(0.85, 0, 0); sickle.add(hd);
    sk.add(sickle); sickle.position.set(0, 0.35, -1.38); C.sickle = sickle;
    /* padlock on the left big toe */
    const lock = new T.Group(); const lb = mk(new T.BoxGeometry(0.22, 0.2, 0.08), '#8a7a5a', { metalness: 0.6, roughness: 0.4 }); lock.add(lb);
    const sh = mk(new T.TorusGeometry(0.08, 0.025, 5, 12, Math.PI), '#9a9aa6', { metalness: 0.7 }); sh.position.y = 0.1; lock.add(sh);
    lock.rotation.x = -1.1; sk.add(lock); lock.position.set(-0.24, 0.3, 2.12); C.lock = lock;
    C.glowS = softSprite('rgba(255,220,120,1)', 0.0); C.glowS.scale.set(2.2, 2.2, 1); sk.add(C.glowS); C.glowS.position.set(0, 0.6, -1.38);
    C.glowL = softSprite('rgba(255,220,120,1)', 0.0); C.glowL.scale.set(1.4, 1.4, 1); sk.add(C.glowL); C.glowL.position.set(-0.24, 0.5, 2.12);
    C.arch = [];
    for (const [x, z, r] of [[2.4, 1.6, -1.2], [-2.5, -0.6, 1.3]]) { const a = chibi({ body: '#5a7a5a', sleeve: '#5a7a5a', hat: 'cap', hatC: '#c9a46a', s: 0.9, smile: true }); add('POL', a, x, 0, z); a.rotation.y = r; C.arch.push(a); }
    for (let i = 0; i < 10; i++) { const a = rnd() * 6.283, r = 5.5 + rnd() * 1.5; add('POL', tree(0.9 + rnd() * 0.5, '#3f6a46'), Math.cos(a) * r, 0, Math.sin(a) * r * 0.7 - 1); }
  }

  /* ---------- VIL (Kisiljevo 1725, night) ---------- */
  { const C = {}; s.c.vil = C;
    add('VIL', slab(26, 16, '#34483a', '#3a2c26'));
    C.huts = [];
    for (const [x, z, r] of [[-7.5, -3, 0.3], [-4, -5.2, 0.1], [0.5, -6, 0], [-8.8, 1.5, 0.9], [8.5, -5.5, -0.3]]) { const h = hut(2.4, 2, 1.7, '#9a8466', '#5a3e2c'); add('VIL', h, x, 0, z); h.rotation.y = r; C.huts.push(h); }
    C.graves = [];
    for (let i = 0; i < 9; i++) { const g = grave('#6a5040'); const row = Math.floor(i / 5); add('VIL', g, 4.0 + (i % 5) * 1.25, 0, -2.6 + row * 1.9); g.scale.setScalar(0.85); C.graves.push(g); }
    C.petarGrave = grave('#6a5040'); add('VIL', C.petarGrave, -1.2, 0, -2.6);
    C.ghost = chibi({ skin: '#cfe0ff', body: '#9ab0e0', sleeve: '#9ab0e0', hair: '#7080b0', ghost: '#6a8cff', eyeGlow: '#ffffff', s: 1.0 }); add('VIL', C.ghost, 0, 0, 0);
    C.from = chibi({ body: '#2f4f8f', sleeve: '#2f4f8f', belt: '#c9a46a', hat: 'tricorn', wig: true, hairStyle: 'none', shirt: '#f2efe6', s: 1.0 }); add('VIL', C.from, -2.6, 0, 1.8);
    C.vills = [];
    for (const [x, z, o] of [[-4.2, 0.6, { hat: 'scarf', hatC: '#a04a3a', dress: true, body: '#7a5a8a' }], [-5.0, 2.4, { hat: 'cap', body: '#6a5a3a' }], [2.6, 2.4, { hat: 'cap', hatC: '#4a3a2a', body: '#5a6a4a' }], [3.6, 0.9, { hat: 'scarf', hatC: '#4a6a8a', dress: true, body: '#8a6a4a' }]]) {
      const v = chibi(Object.assign({ sleeve: o.body, s: 0.92 }, o)); add('VIL', v, x, 0, z); C.vills.push(v);
      const tch = fire(0.32); v.userData.arms.R.userData.hand.add(tch); tch.position.set(0, 0.05, 0); v.userData.torch = tch;
    }
    const cf = coffin(); add('VIL', cf, 0, 0.02, 2.4); C.coffin = cf;
    C.corpse = chibi({ skin: '#d98a7a', body: '#8a7a5a', sleeve: '#8a7a5a', hair: '#5a4030', closed: true, bloodMouth: true, cheek: '#c04050', s: 0.82 });
    C.corpse.userData.body.scale.set(1.35, 1, 1.35); C.corpse.rotation.x = -Math.PI / 2; C.corpse.position.set(0, 0.32, -0.12); cf.add(C.corpse);
    const dirt = mk(new T.SphereGeometry(0.9, 8, 5, 0, 6.283, 0, Math.PI / 2), '#4a3424'); dirt.scale.set(1, 0.5, 1.2); add('VIL', dirt, 1.7, 0, 1.4); C.dirt = dirt;
    C.stake = stake(); add('VIL', C.stake, 0, 0, 0);
    C.flash = softSprite('rgba(255,255,255,1)', 0); C.flash.scale.set(5, 5, 1); add('VIL', C.flash, 0, 1.4, 1.4);
    C.fire = fire(1.6); add('VIL', C.fire, 0, 0.1, 1.4);
    C.paper = card([['WIENERISCHES', 46, '#2a2018'], ['DIARIUM', 70, '#2a2018'], ['21 Jul 1725', 34, '#6a4a30', 600], ['—', 0], ['VAMPYRI', 56, '#a01828']], 2.2, 3.0, { border: '#2a2018', top: 110 });
    add('VIL', C.paper, 0, 0, 0);
    C.dream = []; for (let i = 0; i < 9; i++) { const z = softSprite('rgba(140,170,255,1)', 0.0); z.scale.set(0.6, 0.6, 1); add('VIL', z, 4.0 + (i % 5) * 1.25, 1.3, -2.6 + Math.floor(i / 5) * 1.9); C.dream.push(z); }
    C.moon = add('VIL', moon(1.4), -6, 13, -18);
    for (let i = 0; i < 12; i++) { const a = rnd() * 3.14, r = 10 + rnd() * 2; add('VIL', pine(1 + rnd() * 0.6, '#244a3c'), Math.cos(a) * r, 0, -Math.sin(a) * r * 0.6 - 2); }
  }

  /* ---------- MED (Medveđa 1732, winter) ---------- */
  { const C = {}; s.c.med = C;
    add('MED', slab(24, 15, '#dfe6f0', '#4a3a36'));
    C.graves = [];
    for (let i = 0; i < 17; i++) { const row = Math.floor(i / 6), g = grave('#5a4a40'); g.scale.setScalar(0.72); add('MED', g, -4.8 + (i % 6) * 1.9 + (row % 2) * 0.5, 0, -4.2 + row * 1.7); C.graves.push(g); }
    C.ghost = chibi({ skin: '#cfe0ff', body: '#8a9ad0', sleeve: '#8a9ad0', belt: '#d0d8ff', hat: 'shako', hatC: '#6070a8', ghost: '#7a9cff', eyeGlow: '#ffffff', s: 1.1 }); add('MED', C.ghost, 0, 0, 0);
    C.docs = [];
    for (let i = 0; i < 3; i++) { const d = chibi({ body: '#e8e4da', sleeve: '#e8e4da', belt: '#b02a30', hat: 'tricorn', wig: true, hairStyle: 'none', s: 0.95 }); add('MED', d, -2.2 + i * 1.6, 0, 2.2); C.docs.push(d); }
    const desk = mk(new T.BoxGeometry(2.6, 0.12, 1.2), '#6a4a30'); add('MED', desk, 3.6, 1.0, 1.9); for (const [x, z] of [[-1.1, -0.45], [1.1, -0.45], [-1.1, 0.45], [1.1, 0.45]]) add('MED', mk(new T.BoxGeometry(0.1, 1.0, 0.1), '#5a3a22'), 3.6 + x, 0.5, 1.9 + z);
    C.report = card([['VISUM', 64, '#2a2018'], ['ET REPERTUM', 52, '#2a2018'], ['Belgrad · 1732', 30, '#6a4a30', 600], ['—', 0], ['—', 0]], 1.8, 2.4, { border: '#6a4a30', top: 90 });
    add('MED', C.report, 3.6, 2.35, 1.6); C.report.rotation.x = -0.25;
    C.seal = new T.Mesh(new T.CircleGeometry(0.28, 20), basic('#c0202c')); add('MED', C.seal, 4.05, 1.85, 1.75); C.seal.rotation.x = -0.25;
    C.quill = mk(new T.ConeGeometry(0.05, 0.9, 5), '#f6f2e8'); add('MED', C.quill, 3.0, 1.5, 2.1); C.quill.rotation.z = -0.5;
    C.snow = FK.particles(T, 500, 1, '#ffffff'); C.snow.material.size = 0.09; add('MED', C.snow, 0, 0, 0); C.snowSeed = Float32Array.from({ length: 1500 }, () => rnd());
    for (let i = 0; i < 9; i++) add('MED', pine(1.1 + rnd() * 0.5, '#4f6a62'), -10 + i * 2.5, 0, -7.5 - rnd() * 2);
  }

  /* ---------- LAB (forensic explanation) ---------- */
  { const C = {}; s.c.lab = C;
    add('LAB', slab(18, 12, '#1e2e36', '#18242a'));
    for (let i = -8; i <= 8; i += 2) { add('LAB', new T.Mesh(new T.BoxGeometry(0.02, 0.01, 12), basic('#2e5a66')), i, 0.01, 0); }
    for (let i = -6; i <= 6; i += 2) { add('LAB', new T.Mesh(new T.BoxGeometry(18, 0.01, 0.02), basic('#2e5a66')), 0, 0.01, i); }
    const tbl = mk(new T.BoxGeometry(3.4, 0.2, 1.6), '#8aa0aa', { metalness: 0.6, roughness: 0.35 }); add('LAB', tbl, -1.5, 1.0, 0); for (const x of [-1.4, 1.4]) add('LAB', mk(new T.CylinderGeometry(0.08, 0.08, 1.0, 6), '#6a7a84'), -1.5 + x, 0.5, 0);
    const glass = new T.Mesh(new T.BoxGeometry(3.2, 0.9, 1.4), new T.MeshStandardMaterial({ color: '#9fe8ff', transparent: true, opacity: 0.16, roughness: 0.1 })); add('LAB', glass, -1.5, 1.55, 0);
    C.body = chibi({ skin: '#d98a7a', body: '#8a7a5a', sleeve: '#8a7a5a', hair: '#5a4030', closed: true, cheek: '#c04050', s: 0.82 });
    C.body.rotation.set(-Math.PI / 2, 0, -Math.PI / 2); add('LAB', C.body, -0.25, 1.32, 0);
    C.belly = mk(new T.SphereGeometry(0.26, 12, 10), '#8a7a5a'); add('LAB', C.belly, -1.15, 1.45, 0);
    C.bub = []; for (let i = 0; i < 14; i++) { const b = new T.Mesh(new T.SphereGeometry(0.07 + (i % 3) * 0.03, 8, 6), basic('#9cff7a', { transparent: true, opacity: 0.85 })); add('LAB', b, -1.15, 1.5, 0); C.bub.push(b); }
    C.drips = []; for (let i = 0; i < 4; i++) { const d = drop(); d.scale.setScalar(0.7); add('LAB', d, -2.55, 1.4, 0.2); C.drips.push(d); }
    C.puddle = new T.Mesh(new T.CircleGeometry(0.4, 16), basic(BLOODC)); C.puddle.rotation.x = -Math.PI / 2; add('LAB', C.puddle, -2.6, 1.115, 0.15);
    /* big finger close-up model */
    const fg = new T.Group(); add('LAB', fg, 4.4, 0, 0.6); C.finger = fg;
    const fbase = mk(new T.BoxGeometry(2.6, 0.3, 2.0), '#2c4048'); fbase.position.y = 0.15; fg.add(fbase);
    const fin = mk(new T.CylinderGeometry(0.42, 0.45, 2.6, 12), '#e0a88a'); fin.position.set(0, 1.6, 0); fg.add(fin);
    const tip = mk(new T.SphereGeometry(0.42, 12, 8, 0, 6.283, 0, Math.PI / 2), '#e0a88a'); tip.position.set(0, 2.9, 0); fg.add(tip);
    C.nail = mk(new T.BoxGeometry(0.5, 0.75, 0.12), '#f6e2d6', { roughness: 0.3 }); C.nail.position.set(0, 2.85, 0.39); fg.add(C.nail);
    C.skin = mk(new T.CylinderGeometry(0.47, 0.47, 1.1, 12, 1, true), '#d89a7c', { side: T.DoubleSide }); C.skin.position.set(0, 2.25, 0); fg.add(C.skin);
    C.ruler = new T.Group(); fg.add(C.ruler); C.ruler.position.set(0.9, 2.0, 0.2);
    const rl = mk(new T.BoxGeometry(0.22, 2.4, 0.05), '#f2d24a'); C.ruler.add(rl); for (let i = 0; i < 9; i++) { const tk = new T.Mesh(new T.BoxGeometry(i % 2 ? 0.08 : 0.14, 0.02, 0.06), basic('#2a2018')); tk.position.set(-0.04, -1.1 + i * 0.27, 0.03); C.ruler.add(tk); }
    C.lens = new T.Mesh(new T.TorusGeometry(1.0, 0.07, 8, 28), M('#c9a46a', { metalness: 0.6 })); fg.add(C.lens); C.lens.position.set(0, 2.6, 0.9);
    C.st = stake(); add('LAB', C.st, 0, 0, 0);
    C.puff = []; for (let i = 0; i < 6; i++) { const p = softSprite('rgba(170,255,140,1)', 0.0, false); p.scale.set(0.8, 0.8, 1); add('LAB', p, -0.2, 1.6, 0); C.puff.push(p); }
    C.rings = []; for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.TorusGeometry(0.4, 0.03, 6, 24), basic('#ffffff', { transparent: true, opacity: 0 })); add('LAB', r, -0.05, 1.7, 0); r.rotation.y = Math.PI / 2; C.rings.push(r); }
    C.q = label('?', { w: 1.3, px: 150, color: P.gold }); add('LAB', C.q, -1.3, 2.6, 0);
  }

  /* ---------- EXE (Exeter 1892, snow) ---------- */
  { const C = {}; s.c.exe = C;
    add('EXE', slab(24, 15, '#e6ebf2', '#4a3a36'));
    const house = new T.Group(); add('EXE', house, -6.5, 0, -4.5);
    const hw = mk(new T.BoxGeometry(4, 2.4, 2.8), '#e8e2d2'); hw.position.y = 1.2; house.add(hw);
    const hr = mk(new T.ConeGeometry(3.2, 1.6, 4), '#4a4a58'); hr.rotation.y = Math.PI / 4; hr.scale.z = 0.72; hr.position.y = 3.2; house.add(hr);
    const ch = mk(new T.BoxGeometry(0.4, 1.2, 0.4), '#8a4a3a'); ch.position.set(1.0, 3.6, 0); house.add(ch);
    for (const x of [-1.1, 1.1]) { const w = new T.Mesh(new T.PlaneGeometry(0.6, 0.7), basic('#ffd27a')); w.position.set(x, 1.4, 1.41); house.add(w); }
    const dr = mk(new T.BoxGeometry(0.6, 1.1, 0.06), '#5a3a2a'); dr.position.set(0, 0.55, 1.42); house.add(dr);
    for (let i = 0; i < 11; i++) add('EXE', mk(new T.BoxGeometry(1.1, 0.4, 0.4), '#8a8a92'), 0.8 + i * 1.05, 0.2, -6.2 + (i % 2) * 0.05);
    C.stones = {};
    const stoneAt = (k, x, z, nm) => { const g = grave('#a6a6b0', 'stone'); add('EXE', g, x, 0, z); g.scale.setScalar(0.9); C.stones[k] = g; const lb = card([[nm, 40, '#3a3a44', 700]], 0.5, 0.22, { bg: '#a6a6b0', top: 28 }); lb.position.set(0, 0.42, 0.075); g.add(lb); return g; };
    stoneAt('mom', 2.0, -3.6, 'MARY'); stoneAt('sis', 3.4, -3.6, 'OLIVE'); stoneAt('mercy', 4.8, -3.6, 'MERCY'); stoneAt('edwin', 6.2, -3.6, 'EDWIN');
    const crypt = new T.Group(); add('EXE', crypt, 8.6, 0, -2.2); C.crypt = crypt;
    const cb = mk(new T.BoxGeometry(2.2, 1.6, 2.2), '#8a8a96'); cb.position.y = 0.8; crypt.add(cb); const cr = mk(new T.ConeGeometry(1.75, 0.8, 4), '#6a6a76'); cr.rotation.y = Math.PI / 4; cr.position.y = 2.0; crypt.add(cr);
    C.cdoor = mk(new T.BoxGeometry(0.8, 1.1, 0.08), '#3a3a44'); C.cdoor.position.set(0, 0.55, 1.12); crypt.add(C.cdoor);
    C.george = chibi({ body: '#3a3a44', sleeve: '#3a3a44', hat: 'top', hatC: '#2a2a32', beard: '#6a5a4a', hair: '#6a5a4a', s: 1.05 }); add('EXE', C.george, -1.6, 0, 0.4);
    C.mercy = chibi({ body: '#6a7ab0', sleeve: '#6a7ab0', dress: true, hair: '#6a4a30', hairStyle: 'bun', s: 0.95, cheek: '#e08a9a', smile: true }); add('EXE', C.mercy, 0, 0, 0.6);
    C.edwin = chibi({ body: '#5a4a3a', sleeve: '#5a4a3a', hat: 'cap', hatC: '#3a3a44', shirt: '#c04a3a', s: 1.0 }); add('EXE', C.edwin, 1.5, 0, 0.8);
    C.men = []; for (let i = 0; i < 3; i++) { const m = chibi({ body: ['#4a5a4a', '#5a4a3a', '#3a4a5a'][i], sleeve: ['#4a5a4a', '#5a4a3a', '#3a4a5a'][i], hat: 'cap', hatC: '#3a3028', s: 0.95 }); add('EXE', m, 6 + i * 1.2, 0, 1.2); const sh = mk(new T.BoxGeometry(0.06, 1.1, 0.06), '#6a4a2a'); sh.position.y = -0.3; m.userData.arms.R.userData.hand.add(sh); C.men.push(m); }
    const rock = mk(new T.DodecahedronGeometry(0.8, 0), '#7a7a84'); rock.scale.y = 0.5; add('EXE', rock, 3.6, 0.3, 1.6);
    C.fire = fire(1.0); add('EXE', C.fire, 3.6, 0.65, 1.6);
    C.cup = mk(new T.CylinderGeometry(0.12, 0.09, 0.22, 10), '#d8d4c8'); C.edwin.userData.arms.R.userData.hand.add(C.cup); C.cup.position.set(0, 0.12, 0.08);
    C.cough = []; for (let i = 0; i < 3; i++) { const p = softSprite('rgba(230,240,255,1)', 0, false); p.scale.set(0.35, 0.35, 1); add('EXE', p, 0, 0, 0); C.cough.push(p); }
    C.snow = FK.particles(T, 600, 1, '#ffffff'); C.snow.material.size = 0.08; add('EXE', C.snow, 0, 0, 0); C.snowSeed = Float32Array.from({ length: 1800 }, () => rnd());
    for (let i = 0; i < 6; i++) add('EXE', deadTree(0.9 + rnd() * 0.4), -10 + i * 4, 0, -7);
  }

  /* ---------- VOLC (Tambora 1815) ---------- */
  { const C = {}; s.c.volc = C;
    const sea = mk(new T.BoxGeometry(80, 0.2, 60), '#1a3a6a'); add('VOLC', sea, 0, -0.1, -10);
    const isl = mk(new T.ConeGeometry(9, 2, 9), '#4a6a4a'); add('VOLC', isl, 0, 0.9, -4);
    const cone = mk(new T.ConeGeometry(5.2, 6.5, 9, 1, true), '#5a4a46'); add('VOLC', cone, 0, 4.6, -4); C.cone = cone;
    const top = mk(new T.CylinderGeometry(1.2, 1.4, 0.3, 9), '#ff7a2a', { emissive: new T.Color('#ff5a00'), emissiveIntensity: 1 }); add('VOLC', top, 0, 7.4, -4);
    C.lava = []; for (let i = 0; i < 5; i++) { const l = mk(new T.BoxGeometry(0.25, 4.5, 0.1), '#ff8a2a', { emissive: new T.Color('#ff5a00'), emissiveIntensity: 1 }); const a = -1.2 + i * 0.6; l.position.set(Math.sin(a) * 2.6, 4.6, -4 + Math.cos(a) * 2.6); l.rotation.set(Math.cos(a) * 0.68, 0, -Math.sin(a) * 0.68); S.st.VOLC.add(l); C.lava.push(l); }
    C.ash = []; for (let i = 0; i < 26; i++) { const p = softSprite(i % 3 ? 'rgba(190,182,178,1)' : 'rgba(150,140,138,1)', 0.9, false); add('VOLC', p, 0, 8, -4); C.ash.push(p); }
    C.glow = softSprite('rgba(255,120,40,1)', 0.9); C.glow.scale.set(8, 8, 1); add('VOLC', C.glow, 0, 8, -4);
    for (let i = 0; i < 10; i++) { const a = rnd() * 6.283, r = 7 + rnd() * 1.5; add('VOLC', tree(0.7, '#3f7a4a'), Math.cos(a) * r, 1.2, -4 + Math.sin(a) * r * 0.8); }
  }

  /* ---------- GLOBE (ash veil, 1816) ---------- */
  { const C = {}; s.c.globe = C;
    C.g = FK.globe(T, { r: 3, landFn: FK.landTest(DATA.world) }); add('GLOBE', C.g, 0, 0, 0);
    C.veil = new T.Mesh(new T.SphereGeometry(3.18, 32, 20), new T.MeshBasicMaterial({ color: '#8a8480', transparent: true, opacity: 0, depthWrite: false })); add('GLOBE', C.veil, 0, 0, 0);
    C.sun = softSprite('rgba(255,220,120,1)', 1); C.sun.scale.set(5, 5, 1); add('GLOBE', C.sun, -7, 4, -6);
    C.stars = FK.particles(T, 400, 80, '#ffffff'); add('GLOBE', C.stars, 0, 0, -30);
    C.snow = []; for (let i = 0; i < 14; i++) { const f = softSprite('rgba(230,245,255,1)', 0.9); f.scale.set(0.35, 0.35, 1); add('GLOBE', f, 0, 0, 0); C.snow.push(f); }
  }

  /* ---------- VILLA (Villa Diodati 1816, rain) ---------- */
  { const C = {}; s.c.villa = C;
    add('VILLA', slab(24, 16, '#3e5a48', '#3a2c26'));
    const lake = mk(new T.BoxGeometry(30, 0.1, 10), '#2a4a6a', { roughness: 0.9, metalness: 0 }); add('VILLA', lake, 0, 0.02, 8);
    const V = new T.Group(); add('VILLA', V, 0, 0, -1.5); C.v = V;
    const fl = mk(new T.BoxGeometry(9, 0.3, 6), '#cfc6b4'); fl.position.y = 0.15; V.add(fl);
    const bw = mk(new T.BoxGeometry(9, 4.2, 0.3), '#ece4d0'); bw.position.set(0, 2.4, -3); V.add(bw);
    for (const x of [-4.5, 4.5]) { const sw = mk(new T.BoxGeometry(0.3, 4.2, 6), '#e4dcc8'); sw.position.set(x, 2.4, 0); V.add(sw); }
    for (let i = 0; i < 4; i++) { const c = mk(new T.CylinderGeometry(0.22, 0.25, 4.2, 10), '#f6f0e2'); c.position.set(-3.6 + i * 2.4, 2.4, 2.9); V.add(c); }
    const ent = mk(new T.BoxGeometry(9.6, 0.5, 6.6), '#d8cfba'); ent.position.y = 4.7; V.add(ent);
    const rf = mk(new T.ConeGeometry(6.6, 1.8, 4), '#8a5a4a'); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.66; rf.position.y = 5.85; V.add(rf);
    for (const x of [-2.8, 2.8]) { const w = new T.Mesh(new T.PlaneGeometry(1.1, 1.8), basic('#3a4a6a')); w.position.set(x, 2.4, -2.84); V.add(w); C.win = C.win || []; C.win.push(w); }
    const tb = mk(new T.CylinderGeometry(1.3, 1.3, 0.12, 16), '#6a4a30'); tb.position.y = 1.05; V.add(tb); const tl = mk(new T.CylinderGeometry(0.15, 0.25, 0.9, 8), '#5a3a22'); tl.position.y = 0.6; V.add(tl);
    C.candle = candle(); C.candle.position.set(0, 1.11, 0); V.add(C.candle);
    const mkP = (o, a) => { const p = chibi(o); p.position.set(Math.sin(a) * 2.0, 0.3, Math.cos(a) * 2.0); p.rotation.y = a + Math.PI; V.add(p); return p; };
    C.byron = mkP({ body: '#2a2a3a', sleeve: '#2a2a3a', shirt: '#ffffff', hair: '#2a1a14', hairStyle: 'curly', s: 1.0, brow: '#2a1a14' }, -2.0);
    C.mary = mkP({ body: '#7a4a6a', sleeve: '#7a4a6a', dress: true, hair: '#8a5a30', hairStyle: 'bun', s: 0.92, cheek: '#e08a9a' }, -2.75);
    C.percy = mkP({ body: '#4a5a7a', sleeve: '#4a5a7a', shirt: '#ffffff', hair: '#a07040', hairStyle: 'curly', s: 0.98 }, 2.75);
    C.poli = mkP({ body: '#1e1e28', sleeve: '#1e1e28', shirt: '#e8e8e8', hair: '#1a1410', s: 1.0, brow: '#1a1410' }, 2.0);
    C.frank = book('Frankenstein', '#2a4a3a', 0.8); C.frank.position.set(-0.6, 1.15, -0.5); V.add(C.frank);
    C.vbook = book('The Vampyre', '#7a1828', 0.8); C.vbook.position.set(0.6, 1.15, -0.5); V.add(C.vbook);
    C.ruth = chibi({ skin: '#e6e8f2', body: '#1a1e3a', sleeve: '#1a1e3a', shirt: '#ffffff', hair: '#141018', hairStyle: 'slick', cape: '#1a1e3a', capeIn: '#7a1828', smile: true, brow: '#141018', ghost: '#8a7bff', s: 1.15 });
    C.ruth.position.set(0, 1.4, 0); V.add(C.ruth);
    C.ruthGlow = softSprite('rgba(143,123,255,1)', 0.6); C.ruthGlow.scale.set(4, 4, 1); C.ruthGlow.position.set(0, 2.5, 0); V.add(C.ruthGlow);
    C.mag = card([['THE NEW MONTHLY', 40, '#2a2018'], ['MAGAZINE · April 1819', 30, '#6a4a30', 600], ['THE VAMPYRE', 66, '#7a1828'], ['A Tale by', 36, '#2a2018', 600], ['LORD BYRON', 60, '#2a2018']], 2.6, 3.4, { border: '#2a2018', top: 110 });
    add('VILLA', C.mag, 0, 3, 3); C.stamp = card([['ไม่ใช่!', 90, '#ffffff', 800]], 1.5, 0.7, { bg: '#c0202c', top: 90 }); add('VILLA', C.stamp, 0.5, 2.5, 3.1);
    C.stack = []; for (let i = 0; i < 8; i++) { const b = mk(new T.BoxGeometry(0.9, 0.18, 1.2), ['#7a1828', '#8a2838', '#6a1020'][i % 3]); add('VILLA', b, 3.2, 0.4 + i * 0.19, 2.6); b.rotation.y = (i % 3 - 1) * 0.12; C.stack.push(b); }
    C.rain = (() => { const n = 420, p = new Float32Array(n * 6); const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); const ls = new T.LineSegments(g, new T.LineBasicMaterial({ color: '#b8c8e8', transparent: true, opacity: 0.55 })); ls.userData.seed = Float32Array.from({ length: n * 3 }, () => rnd()); return ls; })();
    add('VILLA', C.rain, 0, 0, 0);
    for (let i = 0; i < 8; i++) add('VILLA', pine(1.3 + rnd() * 0.5, '#2e5446'), -11 + i * 3.1, 0, -6.5 - rnd() * 1.5);
  }

  /* ---------- LIB (Bram Stoker 1897) ---------- */
  { const C = {}; s.c.lib = C;
    add('LIB', slab(18, 12, '#6a4a34', '#3a2a22'));
    const wall = mk(new T.BoxGeometry(18, 7, 0.3), '#4a3a44'); add('LIB', wall, 0, 3.5, -4.5);
    const cols = ['#7a2030', '#2a4a6a', '#3a5a3a', '#8a6a2a', '#5a3a6a', '#a04a2a'];
    for (let sh = 0; sh < 4; sh++) { const x0 = -7.6 + sh * 4.1; if (sh === 2) continue; const frame = mk(new T.BoxGeometry(3.4, 5.2, 0.6), '#4a2e1e'); add('LIB', frame, x0 + 1.7, 2.6, -4.1);
      for (let r = 0; r < 4; r++) for (let b = 0; b < 9; b++) { const h = 0.7 + ((b * 7 + r * 3) % 4) * 0.08; const bk = mk(new T.BoxGeometry(0.3, h, 0.45), cols[(b + r + sh) % 6]); add('LIB', bk, x0 + 0.3 + b * 0.35, 0.55 + r * 1.2 + h / 2, -3.85); } }
    /* window with sun (shelf slot 2) */
    C.win = new T.Mesh(new T.PlaneGeometry(2.4, 1.6), basic('#9ec8f0')); add('LIB', C.win, 2.3, 5.3, -4.32);
    for (const [w, h, x, y] of [[2.6, 0.12, 2.3, 6.1], [2.6, 0.12, 2.3, 4.5], [0.12, 1.7, 1.05, 5.3], [0.12, 1.7, 3.55, 5.3], [0.08, 1.6, 2.3, 5.3]]) add('LIB', mk(new T.BoxGeometry(w, h, 0.1), '#4a2e1e'), x, y, -4.28);
    const desk = mk(new T.BoxGeometry(3.2, 0.15, 1.5), '#5a3a22'); add('LIB', desk, -2.4, 1.1, 0.6); for (const [x, z] of [[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]]) add('LIB', mk(new T.BoxGeometry(0.12, 1.1, 0.12), '#4a2a18'), -2.4 + x, 0.55, 0.6 + z);
    const lamp = candle(); add('LIB', lamp, -3.5, 1.18, 0.3);
    C.open = book('Wallachia', '#6a4a2a', 0.8); add('LIB', C.open, -2.6, 1.28, 0.7); C.open.rotation.x = -0.15;
    C.stoker = chibi({ body: '#3a3a4a', sleeve: '#3a3a4a', shirt: '#f0f0f0', hair: '#9a4a2a', beard: '#9a4a2a', s: 1.05 }); add('LIB', C.stoker, -2.5, 0, -0.6);
    C.name1 = card([['Count', 54, '#2a2018', 700], ['Wampyr', 80, '#2a2018']], 2.4, 1.3, { top: 90 }); add('LIB', C.name1, 0.6, 2.5, 0.6);
    C.strike = new T.Mesh(new T.BoxGeometry(2.4, 0.12, 0.02), basic('#c0202c')); add('LIB', C.strike, 0.6, 2.35, 0.62); C.strike.rotation.z = 0.12;
    C.name2 = card([['DRACULA', 96, '#7a1020']], 2.8, 1.0, { bg: '#ffe7a8', top: 128, border: '#7a1020' }); add('LIB', C.name2, 0.6, 2.5, 0.7);
    C.count = chibi({ skin: PALE, body: CAPE, sleeve: CAPE, shirt: '#f2f2f6', hair: '#121018', hairStyle: 'slick', cape: '#121018', capeIn: '#b01c34', fangs: true, brow: '#121018', s: 1.1 }); add('LIB', C.count, 2.2, 0, 0.6);
    C.harker = chibi({ body: '#6a5a3a', sleeve: '#6a5a3a', shirt: '#f0f0f0', hair: '#5a4030', s: 1.0 }); add('LIB', C.harker, 4.0, 0, 0.4);
    /* mirror */
    const mir = new T.Group(); add('LIB', mir, 3.2, 0, -3.6); C.mirror = mir;
    const fr = mk(new T.BoxGeometry(2.6, 3.6, 0.2), P.gold, { metalness: 0.6, roughness: 0.35, emissive: new T.Color('#5a4000'), emissiveIntensity: 0.3 }); fr.position.y = 2.2; mir.add(fr);
    const gl = new T.Mesh(new T.PlaneGeometry(2.2, 3.2), basic('#aebfd2')); gl.position.set(0, 2.2, 0.11); mir.add(gl);
    C.refl = chibi({ body: '#6a5a3a', sleeve: '#6a5a3a', shirt: '#f0f0f0', hair: '#5a4030', s: 0.62 }); C.refl.position.set(0.55, 0.62, 0.13); C.refl.rotation.y = 0.35; mir.add(C.refl);
    C.garlic = []; for (let i = 0; i < 5; i++) { const gk = garlic(); add('LIB', gk, -1.2 + i * 0.35, 1.25, 1.0); C.garlic.push(gk); }
    { const A = new T.Vector3(2.3, 5.3, -4.2), Bv = new T.Vector3(1.2, 0, 1.4), d = Bv.clone().sub(A), len = d.length();
      const geo = new T.CylinderGeometry(0.9, 1.6, 1, 16, 1, true); C.beam = new T.Mesh(geo, basic('#ffe9a0', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false }));
      C.beam.quaternion.setFromUnitVectors(new T.Vector3(0, -1, 0), d.clone().normalize()); C.beam.scale.y = len; add('LIB', C.beam, (A.x + Bv.x) / 2, (A.y + Bv.y) / 2, (A.z + Bv.z) / 2); }
    C.sun = softSprite('rgba(255,230,140,1)', 0); C.sun.scale.set(3.0, 3.0, 1); add('LIB', C.sun, 2.3, 5.3, -4.2);
  }

  /* ---------- CINE (Nosferatu 1922) ---------- */
  { const C = {}; s.c.cine = C;
    add('CINE', slab(18, 14, '#2a1e26', '#1e1418'));
    const scr = mk(new T.BoxGeometry(9.4, 5.8, 0.3), '#4a1e24'); add('CINE', scr, 0, 3.6, -5.2);
    const curtainL = mk(new T.BoxGeometry(1.2, 6.6, 0.5), '#8a1e2a'); add('CINE', curtainL, -5.0, 3.3, -4.8); const curtainR = curtainL.clone(); add('CINE', curtainR, 5.0, 3.3, -4.8);
    /* the "film world" behind the frame, all greyscale */
    const fw = new T.Group(); add('CINE', fw, 0, 0.9, -4.6); C.fw = fw; const gm = (c) => M(c);
    const back = new T.Mesh(new T.PlaneGeometry(8.6, 5.2), basic('#5a5a5a')); back.position.set(0, 2.7, -0.1); fw.add(back); C.back = back;
    const winF = new T.Mesh(new T.PlaneGeometry(1.6, 2.2), basic('#2a2a2a')); winF.position.set(2.6, 3.0, -0.05); fw.add(winF); C.winF = winF;
    C.orlok = chibi({ skin: '#d8d8d8', body: '#242424', sleeve: '#242424', bald: true, ears: true, fangs: true, brow: '#111111', eyeGlow: '#ffffff', s: 1.35 }); C.orlok.position.set(0.6, 0.15, 0.2); fw.add(C.orlok);
    C.orlok.userData.body.scale.set(0.8, 1.2, 0.8); C.orlok.traverse((m) => { if (m.material) { m.material.transparent = true; } });
    C.ray = new T.Mesh(new T.PlaneGeometry(1.4, 6), basic('#fff6c0', { transparent: true, opacity: 0, depthWrite: false })); C.ray.position.set(1.8, 2.7, 0.3); C.ray.rotation.z = 0.5; fw.add(C.ray);
    C.dust = new T.Points(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(new Float32Array(300 * 3), 3)), new T.PointsMaterial({ color: '#f0f0f0', size: 0.08, transparent: true })); fw.add(C.dust); C.dustSeed = Float32Array.from({ length: 900 }, () => rnd());
    void gm;
    C.proj = new T.Mesh(new T.ConeGeometry(4.6, 15, 4, 1, true), basic('#e8f0ff', { transparent: true, opacity: 0.05, side: T.DoubleSide, depthWrite: false })); C.proj.rotation.x = -Math.PI / 2; add('CINE', C.proj, 0, 4.4, 3.2);
    C.aud = []; for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { const seat = mk(new T.BoxGeometry(1.0, 0.9, 0.8), '#6a1e28'); add('CINE', seat, -3.6 + i * 1.8, 0.45, 2.6 + r * 1.8); const a = chibi({ body: ['#3a3a4a', '#4a3a3a', '#2a3a4a'][(i + r) % 3], hair: ['#2a1a14', '#5a4030', '#1a1410'][i % 3], hat: (i + r) % 3 === 0 ? 'top' : undefined, s: 0.72 }); add('CINE', a, -3.6 + i * 1.8, 0.35, 2.4 + r * 1.8); a.rotation.y = Math.PI; C.aud.push(a); }
    /* court: gavel + reels */
    const ct = mk(new T.BoxGeometry(3.2, 0.14, 1.4), '#5a3a22'); add('CINE', ct, 6.3, 1.2, 0.6); add('CINE', mk(new T.BoxGeometry(2.8, 1.2, 1.0), '#4a2a18'), 6.3, 0.6, 0.6);
    C.gavel = new T.Group(); add('CINE', C.gavel, 7.1, 1.3, 0.6); const gh = mk(new T.CylinderGeometry(0.18, 0.18, 0.6, 10), '#6a3a1a'); gh.rotation.z = Math.PI / 2; gh.position.set(0, 0.9, 0); C.gavel.add(gh); const gs = mk(new T.CylinderGeometry(0.05, 0.05, 0.9, 6), '#8a5a2a'); gs.position.set(0.0, 0.45, 0); C.gavel.add(gs);
    C.reels = []; for (let i = 0; i < 4; i++) { const r = new T.Group(); const d = mk(new T.CylinderGeometry(0.42, 0.42, 0.1, 18), '#9a9aa6', { metalness: 0.6 }); d.rotation.x = Math.PI / 2; r.add(d); const h = mk(new T.CylinderGeometry(0.1, 0.1, 0.12, 8), '#3a3a44'); h.rotation.x = Math.PI / 2; r.add(h); add('CINE', r, 5.3 + i * 0.75, 1.72, 0.5); r.scale.setScalar(1.3); C.reels.push(r); }
    C.rf = fire(1.1); add('CINE', C.rf, 6.8, 1.3, 0.5);
    C.safe = softSprite('rgba(255,220,120,1)', 0); C.safe.scale.set(1.6, 1.6, 1); add('CINE', C.safe, 0, 0, 0);
  }

  /* ---------- CAVE (vampire bats) ---------- */
  { const C = {}; s.c.cave = C;
    add('CAVE', slab(18, 12, '#2a3430', '#1e2622'));
    for (let i = 0; i < 16; i++) { const r = mk(new T.DodecahedronGeometry(1.4 + rnd() * 1.2, 0), '#3a4440'); add('CAVE', r, -9 + i * 1.2, 0.6 + rnd() * 3.5, -5.6 - rnd() * 1.2); }
    const ceil = mk(new T.BoxGeometry(18, 0.6, 10), '#2e3834'); add('CAVE', ceil, 0, 5.4, -1.5);
    for (let i = 0; i < 14; i++) { const st = mk(new T.ConeGeometry(0.25 + rnd() * 0.2, 1 + rnd() * 1.2, 5), '#46524c'); st.rotation.x = Math.PI; const sx = -7 + rnd() * 14; add('CAVE', st, Math.abs(sx) < 3.6 ? sx + Math.sign(sx || 1) * 3.6 : sx, 4.7, -5 + rnd() * 2.4); }
    C.bats = []; for (let i = 0; i < 9; i++) { const b = bat(1.8, i === 4 ? '#8a8098' : '#5a4a72'); b.rotation.z = Math.PI; add('CAVE', b, -3.2 + (i % 5) * 1.6, 4.6, -2.2 - Math.floor(i / 5) * 1.3); C.bats.push(b); }
    C.hungry = C.bats[4]; C.friend = C.bats[3];
    C.flyer = bat(1.3); add('CAVE', C.flyer, 0, 3, 0);
    C.drop = drop(); add('CAVE', C.drop, 0, 0, 0);
    C.heart = label('♥', { w: 1.2, px: 120, color: '#ff5d73' }); add('CAVE', C.heart, 0, 0, 0);
    C.cow = new T.Group(); add('CAVE', C.cow, 5.5, 0, 2.0); const cb = mk(new T.BoxGeometry(2.2, 1.2, 1.0), '#c8b8a0'); cb.position.y = 1.2; C.cow.add(cb); const chd = mk(new T.BoxGeometry(0.7, 0.7, 0.7), '#c8b8a0'); chd.position.set(-1.3, 1.6, 0); C.cow.add(chd); for (const [x, z] of [[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]]) { const lg = mk(new T.BoxGeometry(0.2, 0.7, 0.2), '#b8a890'); lg.position.set(x, 0.35, z); C.cow.add(lg); }
    C.cow.rotation.y = -0.6;
  }

  /* ---------- BLOOD (Thai blood donation today) ---------- */
  { const C = {}; s.c.blood = C;
    add('BLOOD', slab(18, 12, '#cdd7e6', '#7a8aa0'));
    const wall = mk(new T.BoxGeometry(18, 6, 0.3), '#e8eef6'); add('BLOOD', wall, 0, 3, -4.4);
    const bed = mk(new T.BoxGeometry(3.0, 0.5, 1.2), '#7ab0d8'); add('BLOOD', bed, -2.2, 0.9, 0.2); add('BLOOD', mk(new T.BoxGeometry(2.8, 0.7, 1.0), '#b8c4d4'), -2.2, 0.35, 0.2);
    const back = mk(new T.BoxGeometry(0.4, 1.2, 1.2), '#7ab0d8'); add('BLOOD', back, -3.5, 1.5, 0.2); back.rotation.z = 0.35;
    C.donor = chibi({ body: '#2ee6c5', sleeve: '#f2f2f2', hair: '#1a1410', smile: true, cheek: '#f0a0a0', s: 1.0 }); add('BLOOD', C.donor, -2.6, 1.1, 0.3); C.donor.rotation.set(0, 0, -1.15);
    C.nurse = chibi({ body: '#f6f6fa', sleeve: '#f6f6fa', hair: '#2a1a14', hairStyle: 'bun', dress: true, smile: true, s: 0.98, cheek: '#f0a0a0' }); add('BLOOD', C.nurse, 0.2, 0, 1.4); C.nurse.rotation.y = -0.6;
    const pole = mk(new T.CylinderGeometry(0.04, 0.04, 2.6, 6), '#9aa6b6', { metalness: 0.6 }); add('BLOOD', pole, -0.6, 1.3, -0.4);
    C.bag = bloodBag(); add('BLOOD', C.bag, -0.6, 2.0, -0.3); C.bag.scale.setScalar(0.9);
    C.tube = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(-0.6, 2.1, -0.25), new T.Vector3(-1.0, 1.6, 0.1), new T.Vector3(-1.5, 1.45, 0.35)]), 20, 0.03, 6), basic(BLOODC)); add('BLOOD', C.tube, 0, 0, 0);
    C.shelf = new T.Group(); add('BLOOD', C.shelf, 3.6, 0, -3.6); const sf = mk(new T.BoxGeometry(4.2, 4.2, 0.9), '#f4f6fa'); sf.position.y = 2.1; C.shelf.add(sf);
    C.bags = []; for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const b = bloodBag(); b.scale.setScalar(0.62); b.position.set(-1.65 + i * 0.66, 0.35 + r * 1.0, 0.5); C.shelf.add(b); C.bags.push(b); }
    C.bat = bat(1.0); add('BLOOD', C.bat, 0, 0, 0); C.heart = label('♥', { w: 1.0, px: 120, color: '#ff5d73' }); add('BLOOD', C.heart, 0, 0, 0);
    C.drop = drop(); C.drop.scale.setScalar(2.4); add('BLOOD', C.drop, 2.0, 2.6, -4.2);
  }

  /* ---------- MAP (world) ---------- */
  { const C = {}; s.c.map = C;
    const sea = mk(new T.BoxGeometry(110, 0.2, 60), '#14214a'); add('MAP', sea, 8, -0.15, -6);
    const HI = { Poland: '#4f5aa0', Serbia: '#4f5aa0', 'United States of America': '#4f5aa0', Indonesia: '#4f5aa0', Switzerland: '#4f5aa0', 'United Kingdom': '#4f5aa0', Germany: '#4f5aa0', Austria: '#4f5aa0', Thailand: P.coral, Romania: '#4f5aa0' };
    const feats = DATA.world.features.filter((f) => { const c = f.geometry.coordinates.flat(3); let mx = -999, mn = 999; for (let i = 0; i < c.length; i += 2) { mx = Math.max(mx, c[i]); mn = Math.min(mn, c[i]); } return mx > -130 && mn < 150 && f.properties.name !== 'Antarctica' && f.properties.name !== 'Fiji'; });
    const reg = FK.regions(T, feats, { project: MP, idOf: (f) => f.properties.name, color: (id) => HI[id] || P.land });
    for (const id in reg.meshes) { reg.meshes[id].scale.z = id === 'Thailand' ? 0.34 : 0.2; reg.meshes[id].material.emissive = new T.Color('#000000'); }
    add('MAP', reg.group, 0, 0, 0); reg.group.position.set(0, 0, 0); C.reg = reg;
    C.pins = {}; C.labs = {};
    const pin = (k, c, txt, w) => { const [x, z] = mapXZ(PL[k][0], PL[k][1]); const g = new T.Group(); const cone = mk(new T.ConeGeometry(0.12, 0.45, 8), c); cone.rotation.x = Math.PI; cone.position.y = 0.25; const hd = mk(new T.SphereGeometry(0.16, 10, 8), c, { emissive: new T.Color(c), emissiveIntensity: 0.5 }); hd.position.y = 0.55; g.add(cone, hd); add('MAP', g, x - ST.MAP[0], 0.3, z); C.pins[k] = g; if (txt) { const lb = label(txt, { w: w || 1.7, px: 80 }); add('MAP', lb, x - ST.MAP[0], 1.15, z); C.labs[k] = lb; } };
    pin('pien', P.gold, 'โปแลนด์'); pin('kis', P.gold, 'เซอร์เบีย'); pin('med', P.coral, 'Medveđa', 1.5); pin('vienna', P.teal, 'เวียนนา', 1.4); pin('paris', P.teal, 'ปารีส', 1.2); pin('london', P.teal, 'ลอนดอน', 1.4);
    pin('exeter', P.gold, 'Rhode Island', 2.0); pin('tambora', P.coral, 'ตัมโบรา', 1.6); pin('bkk', P.gold, 'ไทย', 1.0); pin('bats', P.violet, 'ค้างคาวแวมไพร์', 2.6);
    C.arcs = {};
    const arc = (k, a, b, h, c) => { const [x0, z0] = mapXZ(PL[a][0], PL[a][1]), [x1, z1] = mapXZ(PL[b][0], PL[b][1]); const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push(new T.Vector3(U.lerp(x0, x1, u) - ST.MAP[0], 0.5 + Math.sin(u * Math.PI) * h, U.lerp(z0, z1, u))); } const geo = new T.BufferGeometry().setFromPoints(pts); const ln = new T.Line(geo, new T.LineBasicMaterial({ color: c, transparent: true, depthTest: false })); ln.renderOrder = 5; geo.setDrawRange(0, 0); add('MAP', ln, 0, 0, 0); ln.userData.pts = pts; C.arcs[k] = ln; };
    arc('pk', 'pien', 'kis', 1.2, P.gold); arc('kv', 'med', 'vienna', 1.0, P.teal); arc('vp', 'vienna', 'paris', 1.2, P.teal); arc('vl', 'vienna', 'london', 1.6, P.teal); arc('me', 'med', 'exeter', 6, P.gold); arc('tb', 'tambora', 'bkk', 1.6, P.coral);
    C.ring = new T.Mesh(new T.RingGeometry(0.5, 0.65, 32), basic(P.coral, { transparent: true, side: T.DoubleSide })); C.ring.rotation.x = -Math.PI / 2; add('MAP', C.ring, 0, 0.45, 0);
    C.mover = softSprite('rgba(255,210,120,1)', 1); C.mover.scale.set(1.2, 1.2, 1); add('MAP', C.mover, 0, 0, 0);
    C.papers = []; for (let i = 0; i < 3; i++) { const p = card([['VAMPYRE', 70, '#7a1020']], 0.9, 0.5, { top: 64 }); add('MAP', p, 0, 0, 0); C.papers.push(p); }
  }
  s.v = new T.Vector3();
  return s;
}
