/* พ่อแม่หัวจะปวด — พาลูกเที่ยวต่างประเทศ เตรียมตัวยังไง (เอกสาร ตม.: พาสปอร์ต+สูติบัตร+หนังสือยินยอม / หมอ 4–6 สัปดาห์ / รถเข็น-คาร์ซีท-บูสเตอร์ / หูอื้อ / ที่ครอบหู หมอน ผ้าห่ม / ท้องเสีย-รถ-จมน้ำ / ป่วยต่างแดน / 5 ข้อ)
   Build: node build.js pa-luk-thiao-tang-prathet.js review-pa-luk-thiao-tang-prathet.html --kit clay --title "พาลูกเที่ยวต่างประเทศ เตรียมตัวยังไง" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 10.5], ['s2', 7], ['s3', 9], ['s4', 9], ['s5', 8.5], ['s6', 9], ['s7', 7], ['s8', 7.5], ['s9', 8.5], ['s10', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const IX = -60, GX = 60, EX = 120, CX = -120, NX = 180;
  const SH = {
    cover: [[0, FW(0.2 * R1, 0.3, 6.9, 4.35 - 1.5 * R1, 0.2)], [1, FW(0.2 * R1, 0.3, 6.6, 4.35 - 1.5 * R1, 0.2)]],
    s1: [[0, FW(IX - 0.2, 0, 7.6, 5.5 - 1.35 * R1, 0.12)], [1, FW(IX - 0.2, 0, 7.3, 5.5 - 1.35 * R1, 0.12)]],
    s2: [[0, FW(0.1 + 0.3 * R1, 0, 6.8, 5.3 - 1.35 * R1, 0.13)], [1, FW(0.1 + 0.3 * R1, 0, 6.5, 5.3 - 1.35 * R1, 0.13)]],
    s3: [[0, FW(GX, 0, 8.9, 5.6 - 1.1 * R1, 0.12)], [1, FW(GX, 0, 8.6, 5.6 - 1.1 * R1, 0.12)]],
    s4: [[0, FW(EX - 0.1, 0, 8.6, 5.5 - 1.65 * R1, 0.1)], [1, FW(EX - 0.1, 0, 8.3, 5.5 - 1.65 * R1, 0.1)]],
    s5: [[0, FW(CX + 0.1, 0, 6.9, 5.3 - 1.7 * R1, 0.12)], [1, FW(CX + 0.1, 0, 6.6, 5.3 - 1.7 * R1, 0.12)]],
    s6: [[0, FW(NX, 0, 8.9, 5.6 - 1.1 * R1, 0.12)], [1, FW(NX, 0, 8.6, 5.6 - 1.1 * R1, 0.12)]],
    s7: [[0, FW(0.1, 0, 7.2, 4.5 - 1.0 * R1, 0.14)], [1, FW(0.1, 0, 6.8, 4.5 - 1.0 * R1, 0.14)]],
    s8: [[0, FW(0.1, 0, 7.0, 6.3, 0.14)], [1, FW(0.1, 0, 6.8, 6.3, 0.14)]],
    s9: [[0, FW(0.3 + 0.4 * R1, 0, 9.6, 6.6, 0.3)], [1, FW(0.3 + 0.4 * R1, 0, 9.3, 6.6, 0.3)]],
    s10: [[0, FW(0.2 + 0.4 * R1, 0, 9.0, 4.4 - 1.2 * R1, 0.2)], [1, FW(0.2 + 0.4 * R1, 0, 8.4, 4.4 - 1.2 * R1, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s8') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const pj = (x, y, z) => proj(V4.set(x, y, z));
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const UPV = new T.Vector3(0, 1, 0);
  const setLimb = (m, a, b) => { const d = new T.Vector3().subVectors(b, a), L = d.length(); m.position.copy(a).addScaledVector(d, 0.5); m.scale.set(1, Math.max(0.001, L), 1); m.quaternion.setFromUnitVectors(UPV, d.normalize()); };
  const limb = (r, mat) => new T.Mesh(new T.CylinderGeometry(r, r, 1, 18), mat);
  const v = (x, y, z) => new T.Vector3(x, y, z);
  /* e-tube ends (ear mechanism) */
  const TA = v(EX + 0.85, 2.3, 0), TB = v(EX + 2.6, 1.1, 0);
  const Q1 = () => TM('s1', 0, 0.3), Q2 = () => TM('s1', 1, 0.64);

  VE.run({
    DUR, file: 'pa-luk-thiao-tang-prathet', title: 'พาลูกเที่ยวต่างประเทศ เตรียมตัวยังไง', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'พาลูกบิน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const box = (w, h, d, c, x, y, z, par) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), M(c)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const cyl = (r, h, c, x, y, z, par, seg) => { const m = new T.Mesh(new T.CylinderGeometry(r, r, h, seg || 24), M(c)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const sph = (r, c, x, y, z, par, x2) => { const m = new T.Mesh(new T.SphereGeometry(r, 20, 14), M(c, x2)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const stage = (x, floorC, wallBase, wallDot) => { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M(floorC)); p.position.set(x, -0.15, 6); scene.add(p); const w = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT(wallBase, wallDot, [8, 4]) })); w.position.set(x, 4.5, -4); scene.add(w); };

      /* ===== stage 0: home / hotel room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      /* suitcases (cover / tips / closing) */
      const bags = new T.Group(); scene.add(bags);
      const bag = (x, z, c, s) => { const g = new T.Group(); box(0.9, 1.25, 0.5, c, 0, 0.75, 0, g); box(0.92, 0.1, 0.52, '#ffffff', 0, 0.75, 0, g); box(0.5, 0.08, 0.08, '#3a2f3f', 0, 1.85, 0, g); for (const sx of [-0.2, 0.2]) box(0.06, 0.5, 0.06, '#3a2f3f', sx, 1.6, 0, g); for (const sx of [-0.3, 0.3]) cyl(0.09, 0.1, '#3a2f3f', sx, 0.09, 0.15, g).rotation.x = PI / 2; g.position.set(x, 0, z); g.scale.setScalar(s); bags.add(g); return g; };
      bag(-0.55, -0.6, '#5ab8ff', 1.25); bag(0.6, -0.75, '#ffb347', 1.05);
      /* hotel bed (night) */
      const bed = new T.Group(); scene.add(bed);
      box(3.6, 0.5, 1.7, '#ffffff', -0.65, 0.35, -0.3, bed); box(3.6, 0.4, 1.7, '#c9a27a', -0.65, 0.2, -0.3, bed); box(3.5, 0.24, 1.6, '#8fb3ff', -0.65, 0.72, -0.3, bed);
      box(0.25, 1.5, 1.8, '#c9a27a', -2.5, 0.75, -0.3, bed); box(0.8, 0.22, 1.0, '#ffe9a8', -1.85, 0.95, -0.3, bed);
      const blanket = box(1.5, 0.3, 1.5, '#ff9ebd', 0.45, 0.98, -0.25, bed);
      /* doctor's desk (s2) */
      const desk = new T.Group(); scene.add(desk); box(1.3, 0.95, 0.8, '#ffffff', 2.9, 0.48, -0.6, desk); box(1.4, 0.1, 0.9, '#79dcb4', 2.9, 1.0, -0.6, desk);
      { const cr = new T.Group(); box(0.5, 0.14, 0.06, '#ff5f6d', 0, 0, 0, cr); box(0.14, 0.5, 0.06, '#ff5f6d', 0, 0, 0, cr); cr.position.set(2.9, 1.5, -0.55); desk.add(cr); }

      const mk = (g, base) => { g.userData.base = base || g.scale.x; scene.add(g); return g; };
      const C = { dad: mk(CK.family(T, 'dad')), mom: mk(CK.family(T, 'mom')), mama: mk(CK.family(T, 'mama')), nana: mk(CK.family(T, 'nana')), wawa: mk(CK.family(T, 'wawa')) };
      C.mmom = mk(CK.neighbor(T, 3, { scale: 1.26, lashes: true, top: '#ffb347', bottom: '#6b5a8f', hairStyle: 'bob', hair: '#2b2b33' }), 1.26);
      C.mkid = mk(CK.neighbor(T, 0, { scale: 0.8, top: '#ffd23f', bottom: '#57c98b', hairStyle: 'pigtails', hair: '#3a2a22' }), 0.8);
      C.officer = mk(CK.neighbor(T, 1, { scale: 1.4, hairStyle: 'short', hair: '#2b2b33', top: '#3d5a9a', bottom: '#2f3d66', collar: '#ffd23f' }), 1.4);
      C.doctor = mk(CK.neighbor(T, 2, { scale: 1.4, hairStyle: 'short', hair: '#5a3d2b', top: '#ffffff', bottom: '#5ab8ff', collar: '#5ab8ff' }), 1.4);
      /* wawa cradled in mom's arms (cabin) with earmuffs */
      const nb = CK.family(T, 'wawa'); nb.scale.setScalar(0.6 / 1.3); C.mom.add(nb);
      const muffs = new T.Group(); { for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.34, 16, 12), M('#5ab8ff')); e.scale.set(0.55, 1, 1); e.position.set(sx * 0.9, 0, 0); muffs.add(e); const p = new T.Mesh(new T.SphereGeometry(0.2, 12, 10), M('#ffd23f')); p.scale.set(0.5, 1, 1); p.position.set(sx * 1.02, 0, 0); muffs.add(p); } const band = new T.Mesh(new T.TorusGeometry(0.92, 0.07, 8, 28, PI), M('#5ab8ff')); muffs.add(band); }
      nb.userData.head.add(muffs);
      /* blanket + neck pillow for mama (cabin) */
      const mBlanket = new T.Mesh(new T.SphereGeometry(0.62, 20, 14), M('#ffd36e')); mBlanket.scale.set(1.15, 0.95, 0.75); scene.add(mBlanket);
      const mPillow = new T.Mesh(new T.TorusGeometry(0.5, 0.17, 10, 28, PI * 1.5), M('#b9a4f0')); mPillow.rotation.set(PI / 2, 0, PI * 0.75); scene.add(mPillow);
      /* life vest for mama (numbers) */
      const vest = new T.Mesh(new T.CylinderGeometry(0.5, 0.52, 0.5, 24, 1, true), M('#ff7a3d', { side: T.DoubleSide })); scene.add(vest);
      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.3, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage I: immigration counter (x = -60) ===== */
      stage(IX, '#6f8fd6', '#cfe0ff', '#ffffff');
      box(1.9, 1.3, 1.1, '#ffffff', IX + 1.85, 0.65, 0.2); box(2.0, 0.12, 1.2, '#5ab8ff', IX + 1.85, 1.36, 0.2); box(1.9, 0.5, 0.08, '#ffd23f', IX + 1.85, 0.75, 0.76);
      for (const sx of [-1, 1]) cyl(0.06, 1.1, '#ffd23f', IX - 0.2 + sx * 0.0 + (sx > 0 ? 0.55 : -3.3), 0.55, 1.4);
      /* ===== stage G: gear pedestals (x = 60) ===== */
      stage(GX, '#ff9a4d', '#ffe0b8', '#ffffff');
      const PX = [-2.85, 0, 2.85], PC = ['#ff8fab', '#b9a4f0', '#79dcb4'];
      PX.forEach((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(1.15, 1.2, 0.5, 32), M(PC[i])); p.position.set(GX + x, 0.25, 0); scene.add(p); });
      const gear = [new T.Group(), new T.Group(), new T.Group()]; gear.forEach((g, i) => { g.position.set(GX + PX[i], 0.5, 0); scene.add(g); });
      { const g = gear[0], fr = '#5a6fd6'; /* stroller */
        box(0.95, 0.12, 0.8, '#5ab8ff', 0, 0.75, 0, g); const bk = box(0.95, 1.0, 0.12, '#5ab8ff', 0, 1.25, -0.42, g); bk.rotation.x = -0.15;
        const can = new T.Mesh(new T.SphereGeometry(0.62, 20, 12, 0, PI * 2, 0, PI / 2), M('#ffd23f', { side: T.DoubleSide })); can.scale.set(1, 0.9, 0.8); can.position.set(0, 2.25, -0.35); g.add(can);
        for (const sx of [-0.5, 0.5]) { const a = limb(0.045, M(fr)); setLimb(a, v(sx, 0.2, 0.4), v(sx, 2.3, -0.6)); g.add(a); const b2 = limb(0.045, M(fr)); setLimb(b2, v(sx, 0.2, -0.45), v(sx, 0.8, 0.3)); g.add(b2); for (const sz of [0.42, -0.47]) { const w = cyl(0.2, 0.1, '#3a2f3f', sx * 1.08, 0.2, sz, g); w.rotation.z = PI / 2; cyl(0.08, 0.12, '#ffffff', sx * 1.08, 0.2, sz, g).rotation.z = PI / 2; } }
        const hb = limb(0.05, M(fr)); setLimb(hb, v(-0.5, 2.3, -0.6), v(0.5, 2.3, -0.6)); g.add(hb); }
      { const g = gear[1]; /* car seat */
        box(1.1, 0.3, 1.0, '#5a6fd6', 0, 0.15, 0, g); const bk = box(1.05, 1.5, 0.22, '#5a6fd6', 0, 1.0, -0.42, g); bk.rotation.x = -0.18; box(0.85, 1.2, 0.08, '#ffd23f', 0, 1.0, -0.28, g).rotation.x = -0.18;
        for (const sx of [-0.52, 0.52]) box(0.14, 0.7, 0.85, '#5a6fd6', sx, 0.6, 0.02, g); for (const sx of [-0.62, 0.62]) box(0.16, 0.6, 0.4, '#5a6fd6', sx, 1.75, -0.3, g); }
      { const g = gear[2]; /* booster */
        box(1.1, 0.32, 0.95, '#ff8fab', 0, 0.16, 0, g); for (const sx of [-0.55, 0.55]) box(0.14, 0.3, 0.8, '#ffd23f', sx, 0.42, 0, g); }
      /* ===== stage E: ear mechanism (x = 120) ===== */
      stage(EX, '#7aa9e8', '#bfe0ff', '#ffffff');
      const pinna = sph(0.8, '#ffd6bd', EX - 3.05, 2.6, 0); pinna.scale.set(0.4, 1.15, 0.8);
      const canal = CK.tube(T, 0.56, 2.2, '#ffb9a8'); canal.rotation.z = PI / 2; canal.position.set(EX - 1.75, 2.6, 0); scene.add(canal);
      const drum = cyl(0.57, 0.1, '#ffffff', EX - 0.62, 2.6, 0); drum.rotation.z = PI / 2;
      const bulge = sph(0.5, '#ff6f91', EX - 0.56, 2.6, 0);
      const chamber = sph(0.92, '#fff1a8', EX + 0.35, 2.6, 0, null, { transparent: true, opacity: 0.55 });
      const etube = limb(0.27, M('#ffb9d0', { transparent: true, opacity: 0.75 })); setLimb(etube, TA, TB); scene.add(etube);
      const throat = sph(0.62, '#ff9ec0', TB.x + 0.35, TB.y - 0.3, 0);
      const valve = [sph(0.2, '#ff5f86', 0, 0, 0), sph(0.2, '#ff5f86', 0, 0, 0)];
      const bubbles = []; for (let i = 0; i < 5; i++) bubbles.push(sph(0.1, '#ffffff', 0, 0, 0.3));
      const bottle = new T.Group(); cyl(0.2, 0.55, '#ffffff', 0, 0, 0, bottle); cyl(0.21, 0.12, '#5ab8ff', 0, 0.3, 0, bottle); sph(0.11, '#ffd9a8', 0, 0.42, 0, bottle); bottle.scale.setScalar(0.85); scene.add(bottle);
      /* ===== stage C: cabin (x = -120) ===== */
      { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M('#6f8fd6')); p.position.set(CX, -0.15, 6); scene.add(p);
        box(18, 10, 0.3, '#dfe9ff', CX, 4.5, -2.2); box(18, 0.5, 0.2, '#9fb8ee', CX, 5.4, -2.0);
        for (const wx of [-2.6, 0, 2.6]) { const fr = new T.Mesh(new T.CircleGeometry(0.72, 32), M('#ffffff')); fr.scale.set(0.8, 1.15, 1); fr.position.set(CX + wx, 3.6, -2.03); scene.add(fr); const pane = new T.Mesh(new T.CircleGeometry(0.6, 32), new T.MeshBasicMaterial({ color: '#7fc8ff' })); pane.scale.set(0.8, 1.15, 1); pane.position.set(CX + wx, 3.6, -2.0); scene.add(pane); const cl = new T.Mesh(new T.CircleGeometry(0.2, 16), new T.MeshBasicMaterial({ color: '#ffffff' })); cl.scale.set(1.6, 0.8, 1); cl.position.set(CX + wx + 0.05, 3.4, -1.98); scene.add(cl); }
        for (const sx of [-1.25, 1.35]) { box(2.0, 0.72, 1.3, '#5a6fd6', CX + sx, 0.36, -0.1); box(2.0, 3.0, 0.35, '#5a6fd6', CX + sx, 1.9, -0.85); box(1.3, 0.7, 0.12, '#ffffff', CX + sx, 3.0, -0.64); for (const ax of [-1.05, 1.05]) box(0.16, 0.5, 1.2, '#9fb8ee', CX + sx + ax, 0.95, -0.1); } }
      /* ===== stage N: what really hurts (x = 180) ===== */
      stage(NX, '#57b88a', '#d4f5df', '#ffffff');
      PX.forEach((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(i === 1 ? 1.3 : 1.15, i === 1 ? 1.35 : 1.2, i === 1 ? 0.8 : 0.5, 32), M(['#ffd23f', '#ff8fab', '#5ab8ff'][i])); p.position.set(NX + x, i === 1 ? 0.4 : 0.25, 0); scene.add(p); });
      const cup = new T.Group(); cyl(0.26, 0.6, '#ffffff', 0, 0.3, 0, cup); cyl(0.27, 0.2, '#5ab8ff', 0, 0.3, 0, cup); box(0.4, 0.5, 0.05, '#ffffff', 0.5, 0.25, 0.1, cup).rotation.z = -0.2; box(0.4, 0.14, 0.06, '#ff8fab', 0.5, 0.33, 0.1, cup).rotation.z = -0.2; cup.position.set(NX + PX[0] + 0.72, 0.5, 0.45); cup.scale.setScalar(1.1); scene.add(cup);
      const car = new T.Group(); box(2.0, 0.6, 1.0, '#ff6f6f', 0, 0.55, 0, car); box(1.1, 0.5, 0.9, '#ffffff', -0.1, 1.05, 0, car); box(0.9, 0.34, 0.92, '#8fd3ff', -0.1, 1.05, 0, car); for (const sx of [-0.62, 0.62]) for (const sz of [-0.5, 0.5]) { const w = cyl(0.26, 0.16, '#3a2f3f', sx, 0.26, sz, car); w.rotation.x = PI / 2; cyl(0.11, 0.18, '#ffffff', sx, 0.26, sz, car).rotation.x = PI / 2; } sph(0.1, '#ffe066', 1.0, 0.6, 0.3, car); car.position.set(NX, 0.8, 0.1); car.scale.setScalar(1.05); scene.add(car);
      const water = cyl(1.05, 0.08, '#8fd3ff', NX + PX[2], 0.54, 0, null, 32);
      const ring = new T.Mesh(new T.TorusGeometry(0.62, 0.2, 12, 32), M('#ffffff', { map: ctex(64, 16, (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#ffffff' : '#ff6f91'; x.fillRect(i * 8, 0, 8, 16); } }) })); ring.rotation.x = PI / 2; scene.add(ring);

      return { key, hemi, room, C, nb, muffs, hearts, bags, bed, blanket, desk, gear, bulge, drum, valve, bubbles, bottle, mBlanket, mPillow, vest, car, ring, cup, chamber };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);
      const night = bt === 's7' || bt === 's8', famHome = bt === 'cover' || bt === 's9' || bt === 's10';
      s.bed.visible = night; s.bags.visible = famHome; s.desk.visible = bt === 's2';

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'mmom', 'mkid', 'officer', 'doctor'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      const CR = { a1: [-0.15, -0.95], a2: [0.1, -0.95] };
      let nbOn = false, nbEx = 'happy', heartsOn = false, heartsT0 = 0, blk = false, vestOn = false, ringOn = false, bottleOn = false;
      if (famHome) {
        const j = bt === 'cover' ? Math.abs(Math.sin(t * 6.5)) * 0.22 : 0;
        def('mom', -1.9, -0.7, bt === 'cover' ? 'worried' : 'happy', { ry: 0.15 });
        def('dad', 1.95, -0.7, bt === 'cover' ? 'worried' : 'happy', { ry: -0.15, wave: bt === 's10' && ph('s10', t) > 0.3 });
        def('nana', -1.6, 1.4, bt === 'cover' ? 'happy' : 'giggle', { y: bt === 'cover' ? Math.abs(Math.sin(t * 6.5 + 1.2)) * 0.12 : 0 });
        def('mama', 0, 1.4, 'giggle', { y: j, a1: bt === 'cover' ? [-2.2, 0.6] : null, a2: bt === 'cover' ? [2.2 + 0.15 * Math.sin(t * 8), 0.6] : null, wave: bt === 's10' && ph('s10', t) > 0.3 });
        def('wawa', 1.45, 1.4, 'happy');
        if (bt === 's10') { heartsOn = true; heartsT0 = at('s10') + 0.6; }
      } else if (bt === 's1') {
        const ok = t > Q1();
        def('officer', IX + 1.95, -0.75, ok ? 'happy' : 'worried', { ry: -0.35, a1: ok ? null : [-0.9 - 0.1 * Math.sin(t * 6), -0.9] });
        def('mmom', IX - 0.75, 0.05, ok ? 'happy' : 'worried', { ry: 0.35, a2: ok ? [0.7, -1.0] : [1.9, 0.5] });
        def('mkid', IX - 2.35, 0.45, ok ? 'giggle' : 'worried', { ry: 0.3, y: ok ? Math.abs(Math.sin(t * 6)) * 0.1 : 0 });
      } else if (bt === 's2') {
        const p = ph('s2', t);
        def('doctor', 1.75, -0.1, 'happy', { ry: -0.35, a1: [-0.8 - 0.12 * Math.sin(t * 4), -0.9] });
        def('mom', -1.75, -0.1, 'happy', { ry: 0.3 });
        def('wawa', -0.1, 0.9, p > 0.5 ? 'giggle' : 'worried', { ry: 0.25, y: p > 0.5 ? Math.abs(Math.sin(t * 6)) * 0.08 : 0 });
      } else if (bt === 's3') {
        const k = (i) => U.clamp((t - TM('s3', i, 0.08 + i * 0.26)) / 0.35);
        if (k(0) > 0.02) def('nana', GX - 2.85, 0.28, 'giggle', { y: 1.02, sc: U.easeBack(k(0)), wave: true });
        if (k(1) > 0.02) def('wawa', GX, 0.3, 'happy', { y: 0.72, sc: U.easeBack(k(1)) });
        if (k(2) > 0.02) def('mama', GX + 2.85, 0.15, 'happy', { y: 0.8, sc: U.easeBack(k(2)), a1: [-0.3, -0.6], a2: [0.3, -0.6] });
        s.gear.forEach((g, i) => { g.visible = k(i) > 0.02; g.scale.setScalar([1.15, 1.15, 1.2][i] * Math.max(0.01, U.easeBack(k(i)))); });
      } else if (bt === 's4') {
        const q = SP('s4', 0.48), op = t > q;
        def('wawa', EX - 2.75, 1.7, op ? 'happy' : 'cry', { ry: 0.35, y: op ? 0 : Math.abs(Math.sin(t * 7)) * 0.06, a1: op ? null : [-1.9, 0.4], a2: op ? [0.5, -1.1] : [1.9 + 0.2 * Math.sin(t * 9), 0.4] });
        bottleOn = op;
      } else if (bt === 's5') {
        const q = SP('s5', 0.5);
        def('mom', CX - 1.25, 0.1, 'happy', Object.assign({ y: 0.36 }, CR)); nbOn = true; nbEx = 'sleepy';
        def('mama', CX + 1.35, 0.15, 'sleepy', { y: 0.5, rz: 0.12 }); blk = true;
      } else if (bt === 's6') {
        const k = (i) => U.clamp((t - TM('s6', i, [0.06, 0.38, 0.52][i])) / 0.35);
        if (k(0) > 0.02) def('nana', NX - 3.05, 0.2, 'sick', { y: 0.5, sc: U.easeBack(k(0)), a1: [-0.25, -0.75], a2: [0.25, -0.75] });
        if (k(2) > 0.02) { def('mama', NX + 2.85, 0.1, 'giggle', { y: 0.55 + 0.05 * Math.sin(t * 3), sc: U.easeBack(k(2)), a1: [-1.3, 0.2], a2: [1.3, 0.2] }); vestOn = ringOn = true; }
        s.car.visible = k(1) > 0.02; s.car.scale.setScalar(1.05 * Math.max(0.01, U.easeBack(k(1)))); s.car.rotation.y = 0.35 + 0.05 * Math.sin(t * 2);
        s.cup.visible = k(0) > 0.5;
      } else if (night) {
        def('mkid', 0.75, -0.3, 'sick', { y: 1.2, rz: PI / 2 - 0.1, lying: true });
        def('mmom', 2.35, 0.35, 'worried', { ry: -0.6, a1: [-0.9, -0.8] });
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave, breath: q.lying ? 0.9 : q.ex === 'sleepy' ? 0.3 : undefined });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        if (q.lying) { g.userData.arm1.rotation.z = 0.8; g.userData['arm-1'].rotation.z = -0.8; }
        g.scale.setScalar(g.userData.base * (q.sc == null ? 1 : Math.max(0.01, q.sc)));
      }
      if (bt === 's5' && st.mom) C.mom.userData.head.rotation.x = 0.2;
      if (bt === 's5' && st.mama) C.mama.userData.head.rotation.z = 0.22 + 0.04 * Math.sin(t * 1.4);
      /* cradled wawa (cabin) */
      s.nb.visible = nbOn;
      if (nbOn) { s.nb.position.set(0.45, 0.8, 0.6); s.nb.rotation.set(-0.45, 0, PI / 2 - 0.32); s.nb.userData.setExpr(nbEx); s.nb.userData.tick(t, { breath: 0.35 }); s.nb.userData.arm1.rotation.z = 0.9; s.nb.userData['arm-1'].rotation.z = -0.9; }
      s.mBlanket.visible = s.mPillow.visible = blk;
      if (blk) { s.mBlanket.position.set(CX + 1.35, 1.15, 0.42); s.mPillow.position.set(CX + 1.37, 1.92, 0.12); }
      s.vest.visible = vestOn; s.ring.visible = ringOn;
      if (vestOn) { const y = C.mama.position.y; s.vest.position.set(C.mama.position.x, y + 0.78, C.mama.position.z); s.ring.position.set(C.mama.position.x, y + 0.42, C.mama.position.z); const sc = C.mama.scale.x / 0.95; s.vest.scale.setScalar(sc); s.ring.scale.setScalar(sc); }
      if (bt !== 's6') { s.car.visible = false; s.cup.visible = false; }
      if (bt !== 's3') s.gear.forEach((g) => (g.visible = false));
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(0.1 + u[0], 3.4 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });
      /* ---------- ear mechanism ---------- */
      { const q = SP('s4', 0.48), on = bt === 's4', op = on ? U.easeIO(U.clamp((t - q) / 0.6)) : 0, pr = on ? U.clamp((t - at('s4') - 0.6) / 1.2) * (1 - op) : 0;
        const b = pr * (0.85 + 0.15 * Math.sin(t * 7)); s.bulge.scale.set(Math.max(0.02, b * 0.75), 1, 1); s.bulge.position.x = EX - 0.6 + b * 0.18; s.bulge.material.color.set('#ff6f91').lerp(new T.Color('#79dcb4'), op);
        s.drum.material.color.set('#ffffff').lerp(new T.Color('#ff8fab'), pr);
        s.chamber.material.color.set('#fff1a8').lerp(new T.Color('#c9f5d9'), op);
        const mid = TA.clone().lerp(TB, 0.5), dir = TB.clone().sub(TA).normalize(), nrm = v(-dir.y, dir.x, 0), d = U.lerp(0.1, 0.46, op);
        s.valve.forEach((m, i) => { m.position.copy(mid).addScaledVector(nrm, (i ? -1 : 1) * d); m.material.color.set('#ff5f86').lerp(new T.Color('#5fd38d'), op); });
        s.bubbles.forEach((m, i) => { const a = ((t - q) * 0.7 + i / 5) % 1; m.visible = on && op > 0.5; m.position.copy(TB).lerp(TA, a); m.position.z = 0.32; m.position.y += 0.05 * Math.sin(t * 9 + i); m.scale.setScalar(0.7 + 0.5 * Math.sin(a * PI)); });
        s.bottle.visible = bottleOn; if (bottleOn) { C.wawa.updateMatrixWorld(true); C.wawa.userData.hand1.getWorldPosition(V4); s.bottle.position.set(V4.x + 0.12, V4.y - 0.05, V4.z + 0.2); s.bottle.rotation.z = 1.0; } }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, nb: s.nb }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's1' || b === 's5') return ['#a8c8ff', '#e3eeff']; if (b === 's3') return ['#ffd8a8', '#fff4e6']; if (b === 's4') return ['#a8d8ff', '#e3f3ff']; if (b === 's6') return ['#b8ecd0', '#f0fff4']; if (b === 's7' || b === 's8') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = lw || 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, a, fill, col, stroke) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2); rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', stroke || '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const mark = (x, y, r, ok, a) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#3fc77d' : '#ff5f6d'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = r * 0.28; g.lineCap = 'round'; g.beginPath(); if (ok) { g.moveTo(x - r * 0.45, y + r * 0.02); g.lineTo(x - r * 0.1, y + r * 0.38); g.lineTo(x + r * 0.48, y - r * 0.32); } else { g.moveTo(x - r * 0.38, y - r * 0.38); g.lineTo(x + r * 0.38, y + r * 0.38); g.moveTo(x + r * 0.38, y - r * 0.38); g.lineTo(x - r * 0.38, y + r * 0.38); } g.stroke(); g.restore(); };
      const C = S.C;
      if (b === 'cover') { const [x, y] = wp(C.mama.userData.head, 0, 0.9); const dy = wp(C.dad.userData.head, 0, 1.25)[1]; bubble('ถึงยังพ่อ!', x, Math.min(y - 150, dy - 20), U.clamp((t - 0.25) / 0.3), 46); }
      /* s1: 3 document cards */
      if (b === 's1') { const p = ph('s1', t), q1 = Q1(), q2 = Q2(), a0 = U.clamp((p - 0.03) / 0.06);
        const cw = (920 - 2 * LD) / 3, y0 = REEL ? 520 : 560, h = 250, NM = ['พาสปอร์ต', 'สูติบัตร', 'หนังสือยินยอม'];
        for (let i = 0; i < 3; i++) { const a = i < 2 ? a0 : U.clamp((t - q2) / 0.3); if (a <= 0) continue; const x = 80 + LD + i * cw + cw / 2, miss = i === 1 && t < q1, pop = i === 1 && !miss ? 1 + 0.12 * U.clamp(1 - (t - q1) / 0.4) : 1;
          g.save(); g.globalAlpha = a; g.translate(x, y0 + h / 2); g.scale(pop, pop);
          rr(-cw / 2 + 10, -h / 2, cw - 20, h, 28, miss ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.94)', miss ? '#ff5f6d' : i === 2 ? '#ffb347' : '#ff8fab', 5);
          /* icon */
          const iy = -44;
          if (i === 0) { rr(-52, iy - 66, 104, 132, 12, '#34497a'); g.beginPath(); g.arc(0, iy - 8, 26, 0, 7); g.lineWidth = 6; g.strokeStyle = '#ffd23f'; g.stroke(); g.fillStyle = '#ffd23f'; g.fillRect(-30, iy + 34, 60, 8); }
          else { g.globalAlpha = a * (miss ? 0.45 : 1); rr(-52, iy - 66, 104, 132, 8, '#ffffff', '#c9b8c9', 3); g.fillStyle = i === 1 ? '#ff8fab' : '#ffb347'; g.fillRect(-38, iy - 50, 76, 14); g.fillStyle = '#c9b8c9'; for (let k = 0; k < 4; k++) g.fillRect(-38, iy - 22 + k * 18, k === 3 ? 40 : 76, 7); if (i === 2) { g.beginPath(); g.arc(22, iy + 40, 17, 0, 7); g.lineWidth = 5; g.strokeStyle = '#ff5f6d'; g.stroke(); } g.globalAlpha = a; }
          plain(NM[i], 0, 62, Math.round(36 * LF), '#3a2f3f', 800, 'center');
          plain(i === 0 ? 'ยังไม่หมดอายุ' : i === 1 ? (miss ? 'ไม่ได้เอามา!' : 'จริง / สำเนา / รูป') : 'ไปกับพ่อ/แม่คนเดียว', 0, 100, Math.round(26 * LF), miss ? '#ff3f55' : '#7a6a80', 600, 'center');
          g.restore();
          mark(x + cw / 2 - 40, y0 + 22, 26, !miss, a * (i === 2 ? 0 : 1)); }
        const [ox, oy] = wp(C.officer.userData.head, 0, 1.0); bubble('ขอดูสูติบัตรน้องด้วยครับ', ox - 60, oy - 50, U.clamp((p - 0.07) / 0.05) * (t < q1 ? 1 : U.clamp((q1 + 0.3 - t) / 0.3)), 36);
        bubble('เชิญครับ เที่ยวให้สนุก', ox - 60, oy - 50, U.clamp((t - q1 - 0.3) / 0.3) * U.clamp((q2 - t) / 0.3), 36); }
      /* s2: weeks countdown */
      if (b === 's2') { const p = ph('s2', t), a0 = U.clamp((p - 0.04) / 0.08); const x0 = 90 + LD, w = 900 - 2 * LD, y0 = REEL ? 520 : 560, h = 210;
        g.save(); g.globalAlpha = a0; rr(x0, y0, w, h, 30, 'rgba(255,255,255,.92)', '#ff8fab'); plain('นับถอยหลังก่อนบิน (สัปดาห์)', x0 + 34, y0 + 42, Math.round(32 * LF), '#3a2f3f', 700);
        const bw = (w - 68 - 5 * 12) / 7; for (let i = 0; i < 7; i++) { const wk = 6 - i, x = x0 + 34 + i * (bw + 12), on = wk >= 4, k = U.clamp((p - 0.12 - i * 0.05) / 0.1); g.globalAlpha = a0 * k; rr(x, y0 + 80, i === 6 ? bw + 0 : bw, 100, 20, i === 6 ? '#5ab8ff' : on ? '#ff6f91' : '#ffe3ea'); plain(i === 6 ? '✈' : String(wk), x + bw / 2, y0 + 132, i === 6 ? 46 : 44, i === 6 || on ? '#ffffff' : '#c79aa8', 800, 'center'); }
        g.restore();
        const a1 = U.clamp((p - 0.45) / 0.1); if (a1 > 0) { const bw2 = (w - 68 - 60) / 7; tag('พบหมอช่วงนี้', x0 + 34 + 1.5 * bw2 + 12, y0 + h + 34, 34, a1, '#ff6f91', '#ffffff', '#ffffff'); } }
      /* s3: gear verdicts */
      if (b === 's3') { const NM = ['รถเข็น', 'คาร์ซีท', 'บูสเตอร์'], V = [['คันพับเล็ก: ถือขึ้นเครื่อง', 'คันใหญ่: ฝากที่หน้าเกต'], ['ใช้บนเครื่องได้', 'ซื้อที่นั่ง + มีฉลากรับรอง'], ['บนเครื่องใช้ไม่ได้', 'โหลดไปใช้กับรถเช่า']], XS = [-2.85, 0, 2.85], y0 = REEL ? 540 : 590;
        for (let i = 0; i < 3; i++) { const a = U.clamp((t - TM('s3', i, 0.08 + i * 0.26) - 0.2) / 0.3); if (a <= 0) continue; let [x] = pj(GX + XS[i], 2, 0); const cw = 318 - (REEL ? 22 : 0); x = U.clamp(x, 60 + LD + cw / 2, 1020 - LD - cw / 2);
          g.save(); g.globalAlpha = a; rr(x - cw / 2, y0, cw, 196, 26, 'rgba(255,255,255,.94)', ['#ff8fab', '#b9a4f0', '#79dcb4'][i], 5);
          plain(NM[i], x, y0 + 40, 40, '#3a2f3f', 800, 'center'); plain(V[i][0], x, y0 + 98, Math.round((i === 0 ? 27 : 30) * LF), i === 2 ? '#ff3f55' : '#1f9d5c', 700, 'center'); plain(V[i][1], x, y0 + 146, Math.round(27 * LF), '#5a4a60', 600, 'center'); g.restore();
          mark(x + cw / 2 - 30, y0 + 16, 24, i !== 2, a); } }
      /* s4: ear labels + pressure arrows */
      if (b === 's4') { const p = ph('s4', t), q = SP('s4', 0.48), op = U.clamp((t - q) / 0.5), a0 = U.clamp((p - 0.06) / 0.08);
        const pr = U.clamp((t - at('s4') - 0.5) / 0.6) * (1 - op);
        if (pr > 0) for (let i = 0; i < 3; i++) { const u = ((t * 0.8 + i / 3) % 1); const [x, y] = pj(EX - 2.75 + u * 1.9, 2.6, 0.6); g.save(); g.globalAlpha = pr * U.clamp(u * 5) * U.clamp((1 - u) * 5); g.fillStyle = '#ff5f6d'; g.beginPath(); g.moveTo(x + 26, y); g.lineTo(x - 8, y - 20); g.lineTo(x - 8, y - 8); g.lineTo(x - 34, y - 8); g.lineTo(x - 34, y + 8); g.lineTo(x - 8, y + 8); g.lineTo(x - 8, y + 20); g.closePath(); g.fill(); g.restore(); }
        let [x, y] = pj(EX - 1.75, 3.25, 0); tag('แรงดันอากาศ', x, y - 30, 32, a0 * (1 - op), '#ffd6dc');
        [x, y] = pj(EX - 0.62, 3.25, 0); tag('แก้วหู', x + 30, y - 100, 32, a0);
        [x, y] = pj(EX + 0.35, 1.6, 0); tag('หูชั้นกลาง', x - 60, y + 40, 30, a0, '#fff6c9');
        [x, y] = pj(EX + 1.75, 1.7, 0); tag(op > 0.5 ? 'ท่อเปิด อากาศเข้าได้' : 'ท่อปรับความดัน ยังปิด', x + 40, y - 110, 32, a0, op > 0.5 ? '#c9f5d9' : '#ffd6dc', null, op > 0.5 ? '#3fc77d' : '#ff5f6d');
        [x, y] = pj(EX + 2.95, 0.8, 0); tag('คอ', x, y + 80, 30, a0);
        const [wx, wy] = wp(C.wawa.userData.head, 0, 0.85); bubble(op > 0.3 ? 'จ๊วบ จ๊วบ' : 'แง้ หูอื้อ!', wx + 40, wy - 40, a0, 36); }
      /* s5: tags */
      if (b === 's5') { const p = ph('s5', t), q = SP('s5', 0.5), a1 = U.clamp((p - 0.08) / 0.08), a2 = U.clamp((t - q) / 0.3);
        S.nb.updateMatrixWorld(true); let [x, y] = wp(S.nb.userData.head, 0, 0); tag('ที่ครอบหู', x - 10, y + (REEL ? 118 : 140), 34, a1, '#d6ecff', null, '#5ab8ff'); mark(x + 115, y + (REEL ? 118 : 140), 22, true, a1);
        [x, y] = wp(C.mama.userData.head, 0, 0.9); tag('หมอนรองคอ + ผ้าห่ม', x, y - 40, 32, a2, '#fff1c9', null, '#ffb347'); mark(x + 175, y - 40, 22, true, a2); }
      /* s6: ranks */
      if (b === 's6') { const NM = ['ท้องเสีย', 'อุบัติเหตุรถ', 'จมน้ำ'], RK = ['เจอบ่อยที่สุด', 'อันตรายอันดับ 1', 'อันตรายอันดับ 2'], AC = ['พกผงเกลือแร่', 'จองคาร์ซีทกับรถเช่า', 'ใส่ชูชีพ อยู่ใกล้แค่เอื้อม'], XS = [-2.85, 0, 2.85], y0 = REEL ? 540 : 590, qa = TM('s6', 3, 0.7);
        for (let i = 0; i < 3; i++) { const a = U.clamp((t - TM('s6', i, [0.06, 0.38, 0.52][i]) - 0.2) / 0.3); if (a <= 0) continue; let [x] = pj(NX + XS[i], 2, 0); const cw = 318 - (REEL ? 22 : 0); x = U.clamp(x, 60 + LD + cw / 2, 1020 - LD - cw / 2); const act = U.clamp((t - qa - i * 0.25) / 0.3);
          g.save(); g.globalAlpha = a; rr(x - cw / 2, y0, cw, 196, 26, 'rgba(255,255,255,.94)', ['#ffb347', '#ff5f6d', '#5ab8ff'][i], 5);
          plain(RK[i], x, y0 + 36, Math.round(28 * LF), i === 0 ? '#c77a1f' : '#ff3f55', 700, 'center'); plain(NM[i], x, y0 + 88, 44, '#3a2f3f', 800, 'center');
          g.globalAlpha = a * act; rr(x - cw / 2 + 14, y0 + 124, cw - 28, 56, 28, '#c9f5d9'); plain(AC[i], x, y0 + 154, Math.round((i === 2 ? 25 : 28) * LF), '#1f7a4a', 700, 'center'); g.restore(); } }
      /* s7: clock + ORS reminder */
      if (b === 's7') { const p = ph('s7', t), a = U.clamp((p - 0.06) / 0.08); const [x, y] = wp(C.mmom.userData.head, 0, 1.0); tag('02:00', 880 - LD, REEL ? 560 : 620, 44, a, '#2a2550', '#ffd35e', '#ffd35e');
        bubble('ตัวร้อน ท้องเสียอีกแล้ว…', x - 150, y - 50, U.clamp((p - 0.12) / 0.08) * U.clamp((SP('s7', 0.52) - t) / 0.3), 36); }
      /* s8: doctor list */
      if (b === 's8') { const p = ph('s8', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 540, 30, 'rgba(25,18,50,.7)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['ถ่ายเป็นเลือด', 'ซึม ปากแห้ง ร้องไห้ไม่มีน้ำตา ฉี่น้อย', 'ไข้สูง', 'อาเจียนจนกินน้ำไม่ได้', 'จิบน้ำเกลือแร่แล้ว ยังไม่ดีขึ้น'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s8', i, 0.1 + i * 0.13)) / 0.35); if (a <= 0) return; const y = 388 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        const a5 = U.clamp((t - TM('s8', 5, 0.78)) / 0.3); g.save(); g.globalAlpha = a5; rr(80 + LD, 770, 920 - 2 * LD, 60, 30, 'rgba(255,211,94,.95)'); plain('ยาหยุดถ่าย ไม่แนะนำในเด็กต่ำกว่า 6 ขวบ', 540, 802, Math.round(32 * LF), '#3a2f3f', 700, 'center'); g.restore();
        g.save(); g.globalAlpha = a0; plain('ที่มา: CDC', 540, 842, 24, 'rgba(255,255,255,.9)', 400, 'center'); g.restore(); }
      /* s9: tips */
      if (b === 's9') { const p = ph('s9', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['พาสปอร์ต + สูติบัตร (+ หนังสือยินยอม)', 'พบหมอก่อนบิน 4–6 สัปดาห์ พกสมุดวัคซีน', 'รถเข็น คาร์ซีท แจ้งสายการบินล่วงหน้า', 'เครื่องลง ให้ดูดนม จุกนม หรือจิบน้ำ', 'ผงเกลือแร่ + ประกันเดินทาง + คาร์ซีทรถเช่า'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s9', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s9', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(36 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[78, ['พาลูกเที่ยวต่างประเทศ', '#fff']], [74, ['เตรียมตัวยังไง?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: Q1(), y: 290, lines: [[56, ['น้องมะม่วงยังไปไม่ถึงเกต', '#fff']], [46, ['ติดที่ ตม. เพราะขาดเอกสาร 1 ใบ', '#ffe3ea', 600]]] },
      { t0: Q1() + 0.02, t1: Q2(), y: 290, lines: [[50, ['เด็กไทยต่ำกว่า 18 ปี ออกนอกประเทศ', '#fff']], [58, ['พาสปอร์ต + สูติบัตร', '#ffd35e']]], foot: 'สูติบัตร: ตัวจริง สำเนา หรือรูปในมือถือก็ได้ (สตม. 2569)' },
      { t0: Q2() + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[54, ['ไปกับพ่อหรือแม่แค่คนเดียว', '#fff']], [50, ['เพิ่มหนังสือยินยอมจากอีกฝ่าย', '#ffd35e']]], foot: 'ต้องให้สำนักงานเขต/อำเภอออกให้ เขียนกันเองไม่ได้' },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 290, lines: [[58, ['นัดหมอก่อนบิน ', '#fff'], ['4–6 สัปดาห์', '#ffd35e']], [44, ['วัคซีนต้องใช้เวลาสร้างภูมิ', '#ffe3ea', 600]]], foot: 'ทารก 6–11 เดือน ปรึกษาแพทย์เรื่องวัคซีนหัดก่อนเดินทาง (KidsHealth, CDC)' },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[58, ['ของชิ้นใหญ่ โหลดหรือพกดี?', '#fff']], [44, ['เช็กกับสายการบินก่อนทุกครั้ง', '#ffd35e', 700]]], foot: 'AAP: ทารกนั่งคาร์ซีทที่รับรองใช้บนเครื่อง ปลอดภัยที่สุด' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.48), y: 290, lines: [[58, ['เครื่องลดระดับ ลูกร้องจ้า', '#fff']], [46, ['แรงดันอากาศดันแก้วหูเข้าไป', '#ffe3ea', 600]]] },
      { t0: SP('s4', 0.48) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[58, ['ให้ดูดนม จุกนม หรือจิบน้ำ', '#ffd35e']], [46, ['กลืนทีไร ท่อเปิด หูหายอื้อ', '#fff', 600]]], foot: 'เพิ่งเป็นหูอักเสบใน 2 สัปดาห์ ปรึกษาแพทย์ก่อนบิน (AAP)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[56, ['ที่ครอบหู ช่วยลดเสียงดัง', '#fff']], [46, ['แต่ไม่ช่วยเรื่องหูอื้อ ยังต้องดูดหรือกลืน', '#ffd35e', 700]]] },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[56, ['หมอน ผ้าห่ม เด็กโตใช้ได้', '#fff']], [44, ['ทารกต่ำกว่า 1 ขวบ ไม่วางของนุ่มรอบตัว', '#ffd35e', 700]]], foot: 'หลักการนอนปลอดภัย ใช้บนเครื่องบินด้วย (AAP)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 290, lines: [[56, ['เที่ยวต่างแดน อะไรน่าห่วงที่สุด?', '#fff']], [44, ['ไม่ใช่โรคแปลก แต่เป็นเรื่องใกล้ตัว', '#ffd35e', 700]]], foot: 'เด็กที่เดินทางต่างประเทศ (CDC Yellow Book 2026, Dartmouth Health)' },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.52), y: 290, lines: [[56, ['ตีสอง น้องมะม่วงท้องเสียที่โรงแรม', '#fff']], [46, ['เด็กเล็กขาดน้ำเร็วกว่าผู้ใหญ่', '#ffd35e', 700]]], foot: 'CDC Yellow Book' },
      { t0: SP('s7', 0.52) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[54, ['ทำประกันเดินทางให้ลูกด้วย', '#ffd35e']], [44, ['จดโรงพยาบาลใกล้ที่พักไว้ตั้งแต่วันแรก', '#fff', 600]]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 250, lines: [[56, ['พาไปโรงพยาบาล ถ้าลูก…', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[56, ['5 ข้อ ก่อนพาลูกบิน', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[56, ['ทริปที่ดี ไม่ต้องเป๊ะทุกอย่าง', '#fff']], [58, ['ขอแค่ทั้งบ้านกลับมาครบ', '#ffd35e']], [40, ['ทริปแรกของลูก ไปประเทศไหน? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: สตม., กรมการกงสุล, CDC, AAP, KidsHealth' },
    ],
    trans,
    audio: [
      [0.3, 'boing'], [0.7, 'giggle'],
      [at('s1') + 0.5, 'pop'], [at('s1') + 1.0, 'warn'], [Q1(), 'ding'], [Q1() + 0.3, 'giggle'], [Q2(), 'pop'], [Q2() + 0.4, 'tick'],
      [at('s2') + 0.4, 'twinkle'], [P('s2', 0.15), 'tick'], [P('s2', 0.25), 'tick'], [P('s2', 0.35), 'tick'], [P('s2', 0.45), 'ding'],
      [TM('s3', 0, 0.08), 'pop'], [TM('s3', 1, 0.34), 'pop'], [TM('s3', 2, 0.6), 'pop'], [TM('s3', 2, 0.6) + 0.4, 'warn'],
      [at('s4') + 0.4, 'whoosh'], [at('s4') + 1.2, 'riser'], [SP('s4', 0.48), 'bubble'], [SP('s4', 0.48) + 0.5, 'ding'], [SP('s4', 0.48) + 1.2, 'bubble'], [SP('s4', 0.48) + 1.5, 'giggle'],
      [at('s5') + 0.5, 'pop'], [SP('s5', 0.5), 'pop'], [SP('s5', 0.5) + 0.6, 'twinkle'],
      [TM('s6', 0, 0.06), 'pop'], [TM('s6', 1, 0.38), 'boom'], [TM('s6', 2, 0.52), 'bubble'], [TM('s6', 3, 0.7), 'ding'], [TM('s6', 3, 0.7) + 0.25, 'tick'], [TM('s6', 3, 0.7) + 0.5, 'tick'],
      [at('s7') + 0.4, 'heartbeat'], [at('s7') + 1.5, 'heartbeat'], [SP('s7', 0.52), 'warn'],
      [TM('s8', 0, 0.1), 'tick'], [TM('s8', 1, 0.23), 'tick'], [TM('s8', 2, 0.36), 'tick'], [TM('s8', 3, 0.49), 'tick'], [TM('s8', 4, 0.62), 'tick'], [TM('s8', 5, 0.78), 'warn'], [P('s8', 0.9), 'heartbeat'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [at('s10') + 1.2, 'heart'], [at('s10') + 2.0, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s7'), CK.MUSIC.CUTE), CK.musicBed(at('s7'), at('s9'), CK.MUSIC.NIGHT), CK.musicBed(at('s9'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
