/* พ่อแม่หัวจะปวด — ลูกติดให้อุ้ม แก้ยังไง (ติดมือ? / 43% / ปุ่มสงบตอนเดิน / 3 เหตุผล / ไม่ยอมเดิน = ขาเจ็บ? / เดิน 5 + นั่ง 5–8 / เติมกอด / บอกสิ่งที่ทำได้ / 5 ทิป)
   Build: node build.js luk-tid-hai-um.js review-luk-tid-hai-um.html --kit clay --title "ลูกติดให้อุ้ม แก้ยังไง" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6], ['s2', 7.5], ['s3', 7.5], ['s4', 8.5], ['s5', 7], ['s6', 7.5], ['s7', 8.5], ['s8', 6.5], ['s9', 7.5], ['s10', 8.5], ['s11', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's11'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const LX = -60, NX = 60, RX = 120;
  const R1 = REEL ? 1 : 0;
  const SH = {
    cover: [[0, FW(-0.3, 0, 6.2, 4.1, 0.18)], [1, FW(-0.3, 0, 5.9, 4.1, 0.18)]],
    s1: [[0, FW(-0.2, 0, 6.8, 4.25, 0.14)], [1, FW(-0.2, 0, 6.5, 4.25, 0.14)]],
    s2: [[0, FW(LX, 0, 7.4, 5.1 - 0.8 * R1, 0.12)], [1, FW(LX, 0, 7.1, 5.1 - 0.8 * R1, 0.12)]],
    s3: [[0, FW(NX, 0, 6.6, 5.3, 0.12)], [1, FW(NX, 0, 6.3, 5.3, 0.12)]],
    s4: [[0, FW(RX, 0, 8.5, 3.9 - 0.9 * R1, 0.12)], [1, FW(RX, 0, 8.2, 3.9 - 0.9 * R1, 0.12)]],
    s5: [[0, FW(-0.1, 0, 6.8, 4.3 - 1.2 * R1, 0.14)], [1, FW(-0.1, 0, 6.4, 4.3 - 1.2 * R1, 0.14)]],
    s6: [[0, FW(-0.1, 0, 6.8, 5.6, 0.14)], [1, FW(-0.1, 0, 6.6, 5.6, 0.14)]],
    s7: [[0, FW(-0.2, 0, 8.2, 5.3, 0.12)], [1, FW(-0.2, 0, 7.9, 5.3, 0.12)]],
    s8: [[0, FW(-0.45, 0, 7.0, 4.9, 0.12)], [1, FW(-0.45, 0, 6.8, 4.9, 0.12)]],
    s9: [[0, FW(-0.1, 0, 6.6, 4.7, 0.12)], [1, FW(-0.1, 0, 6.3, 4.7, 0.12)]],
    s10: [[0, FW(0.3, 0, 9.6, 6.6, 0.3)], [1, FW(0.3, 0, 9.3, 6.6, 0.3)]],
    s11: [[0, FW(0.2, 0, 9.0, 4.4, 0.2)], [1, FW(0.2, 0, 8.4, 4.4, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's7', 's8', 's9', 's10', 's11']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s5') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const UPV = new T.Vector3(0, 1, 0);
  const setLimb = (m, a, b) => { const d = new T.Vector3().subVectors(b, a), L = d.length(); m.position.copy(a).addScaledVector(d, 0.5); m.scale.set(1, Math.max(0.001, L), 1); m.quaternion.setFromUnitVectors(UPV, d.normalize()); };
  const limb = (r, mat) => new T.Mesh(new T.CylinderGeometry(r, r, 1, 18), mat);
  const v = (x, y, z) => new T.Vector3(x, y, z);
  /* aim a hinge arm (rest = hanging down) of character g at a world point; k blends from the current pose */
  const aimArm = (g, armKey, tg, k, maxStretch) => {
    const arm = g.userData[armKey]; g.updateMatrixWorld(true);
    const sh = arm.getWorldPosition(new T.Vector3()), dir = tg.clone().sub(sh), dist = dir.length();
    dir.applyQuaternion(g.getWorldQuaternion(new T.Quaternion()).invert()).normalize();
    arm.rotation.set(U.lerp(arm.rotation.x, Math.atan2(-dir.z, -dir.y), k), 0, U.lerp(arm.rotation.z, Math.asin(U.clamp(dir.x, -1, 1)), k));
    const L = (g.scale.x >= 1.2 ? 0.56 : 0.42) * g.getWorldScale(new T.Vector3()).x;
    arm.scale.y = U.lerp(1, U.clamp(dist / L, 0.7, maxStretch || 1.25), k);
  };

  VE.run({
    DUR, file: 'luk-tid-hai-um', title: 'ลูกติดให้อุ้ม แก้ยังไง', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกติดอุ้ม', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); { const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(-0.6, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(-0.6, 1.0, -3.7); sofa.add(seat, back); } scene.add(sofa);
      /* pouf for sitting (legs sink into it) */
      const pouf = new T.Mesh(new T.CylinderGeometry(0.85, 0.9, 0.72, 28), M('#ff9ebd')); pouf.position.set(1.9, 0.36, 0.1); scene.add(pouf);
      const poufTop = new T.Mesh(new T.CylinderGeometry(0.86, 0.86, 0.06, 28), M('#ffd36e')); poufTop.position.set(1.9, 0.74, 0.1); scene.add(poufTop);
      /* crib */
      const crib = new T.Group(); crib.position.set(-2.35, 0, -0.4); scene.add(crib);
      { const wm = M('#ffffff'), pm = M('#9fd3ff');
        const mat = new T.Mesh(new T.BoxGeometry(2.1, 0.28, 1.1), M('#ffd6e4')); mat.position.y = 0.95; crib.add(mat);
        const base = new T.Mesh(new T.BoxGeometry(2.2, 0.12, 1.2), wm); base.position.y = 0.78; crib.add(base);
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const p = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 1.9, 12), pm); p.position.set(sx * 1.1, 0.95, sz * 0.58); crib.add(p); const k = new T.Mesh(new T.SphereGeometry(0.11, 12, 10), M('#ffd36e')); k.position.set(sx * 1.1, 1.92, sz * 0.58); crib.add(k); }
        const rb = new T.Mesh(new T.BoxGeometry(2.2, 0.1, 0.1), pm); rb.position.set(0, 1.8, -0.58); crib.add(rb);
        for (let i = 0; i < 9; i++) { const b = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.75, 8), wm); b.position.set(-0.96 + i * 0.24, 1.42, -0.58); crib.add(b); }
        const rf = new T.Mesh(new T.BoxGeometry(2.2, 0.1, 0.1), pm); rf.position.set(0, 1.12, 0.58); crib.add(rf); }
      /* low slide (danger scene) */
      const slide = new T.Group(); slide.position.set(-2.5, 0, -1.3); scene.add(slide);
      { const sm2 = M('#5ab8ff'), st2 = M('#ffd23f'); const step = new T.Mesh(new T.BoxGeometry(0.9, 1.1, 0.9), st2); step.position.set(0.6, 0.55, 0); slide.add(step); const ramp = new T.Mesh(new T.BoxGeometry(1.6, 0.12, 0.8), sm2); ramp.position.set(-0.35, 0.6, 0); ramp.rotation.z = 0.62; slide.add(ramp); }
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      C.mom.rotation.order = 'YXZ'; C.nana.rotation.order = 'YXZ';
      C.mafai = CK.neighbor(T, 0, { scale: 1.26, hairStyle: 'bob', hair: '#d9d3e0', lashes: true, brow: '#a89fb0', top: '#ff9a62', bottom: '#8b6fd6' }); C.mafai.userData.base = 1.26; scene.add(C.mafai);
      C.kmom = CK.neighbor(T, 3, { scale: 1.26, lashes: true, top: '#5cc99a', bottom: '#6b5a8f', hair: '#2b2b33' }); C.kmom.userData.base = 1.26; scene.add(C.kmom);
      C.kt = CK.neighbor(T, 1, { scale: 0.8, top: '#9b8cff', bottom: '#ffc09f' }); C.kt.userData.base = 0.8; scene.add(C.kt);
      /* wawa cradled in mom's arms */
      const nb = CK.family(T, 'wawa'); nb.scale.setScalar(0.6 / 1.3); C.mom.add(nb);
      /* nana on dad's hip (closing), legs as an M */
      const nh = CK.family(T, 'nana'); nh.scale.setScalar(0.74 / 1.4); C.dad.add(nh);
      nh.children.forEach((m) => { if (!m.isMesh) return; const ty = m.geometry.type, ax = Math.abs(m.position.x); if ((ty === 'CylinderGeometry' && Math.abs(ax - 0.17) < 0.01) || (ty === 'SphereGeometry' && Math.abs(ax - 0.18) < 0.01 && m.position.y < 0.1)) m.visible = false; });
      { const lm = M('#ffd95a'), fm = M('#ffffff'); for (const s of [-1, 1]) { const hip = v(s * 0.2, 0.3, 0.05), kn = v(s * 0.56, 0.44, 0.42), ft = v(s * 0.6, 0.1, 0.5); const th = limb(0.13, lm); setLimb(th, hip, kn); nh.add(th); const kb = new T.Mesh(new T.SphereGeometry(0.14, 14, 10), lm); kb.position.copy(kn); nh.add(kb); const sn = limb(0.11, M('#ffd6bd')); setLimb(sn, kn, ft); nh.add(sn); const fb = new T.Mesh(new T.SphereGeometry(0.15, 14, 10), fm); fb.scale.set(1, 0.7, 1.3); fb.position.copy(ft); nh.add(fb); } }
      /* diaper prop for nana */
      const diaper = new T.Group(); { const d = new T.Mesh(new T.BoxGeometry(0.5, 0.36, 0.2), M('#ffffff')); diaper.add(d); const tb = new T.Mesh(new T.BoxGeometry(0.52, 0.09, 0.22), M('#ff8fab')); tb.position.y = 0.1; diaper.add(tb); const dot = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#79dcb4')); dot.position.set(0, -0.05, 0.11); diaper.add(dot); }
      diaper.scale.setScalar(1.6 / 0.8); C.nana.userData['hand-1'].add(diaper); diaper.position.set(0, -0.18, 0.12);
      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.3, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage L: crying bars (x = -60) ===== */
      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const platL = new T.Mesh(new T.BoxGeometry(16, 0.3, 24), M('#ff6f9f')); platL.position.set(LX, -0.15, 6); scene.add(platL);
      const wallL = new T.Mesh(new T.BoxGeometry(16, 10, 0.3), M('#ffffff', { map: dotT('#ffd1e3', '#ffffff', [7, 4]) })); wallL.position.set(LX, 4.5, -4); scene.add(wallL);
      const HR = [2.16, 1.23], BXS = [LX - 1.55, LX + 1.55];
      const bars = HR.map((h, i) => { const b = CK.bar(T, 1.9, 1.4, i ? '#79dcb4' : '#ff8fab'); b.position.set(BXS[i], 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const bw = [CK.family(T, 'wawa'), CK.family(T, 'wawa')]; bw.forEach((g) => { g.userData.base = g.scale.x; scene.add(g); });

      /* ===== stage N: calm-while-walking mechanism (x = 60) ===== */
      const platN = new T.Mesh(new T.BoxGeometry(16, 0.3, 24), M('#7aa9e8')); platN.position.set(NX, -0.15, 6); scene.add(platN);
      const gridT = ctex(256, 256, (x) => { x.fillStyle = '#8fc4f5'; x.fillRect(0, 0, 256, 256); x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 4; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, 256); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(256, i * 64); x.stroke(); } }, [7, 4]);
      const wallN = new T.Mesh(new T.BoxGeometry(16, 10, 0.3), M('#ffffff', { map: gridT })); wallN.position.set(NX, 4.5, -4); scene.add(wallN);
      const stool = new T.Mesh(new T.CylinderGeometry(0.8, 0.85, 0.72, 28), M('#ffd36e')); stool.position.set(NX - 1.2, 0.36, 0); scene.add(stool);
      const path = []; for (let i = 0; i < 7; i++) { const f = new T.Mesh(new T.CircleGeometry(0.16, 18), M('#ffffff', { transparent: true, opacity: 0.8 })); f.rotation.x = -PI / 2; f.position.set(NX - 0.4 + i * 0.42, 0.02, 0.4 + (i % 2) * 0.28); scene.add(f); path.push(f); }

      /* ===== stage R: 3 reasons (x = 120) ===== */
      const platR = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M('#ff9a4d')); platR.position.set(RX, -0.15, 6); scene.add(platR);
      const wallR = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT('#ffe0b8', '#ffffff', [8, 4]) })); wallR.position.set(RX, 4.5, -4); scene.add(wallR);
      const PX = [RX - 2.75, RX, RX + 2.75], PC = ['#ff8fab', '#b9a4f0', '#79dcb4'];
      const peds = PX.map((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(i === 1 ? 1.25 : 1.05, i === 1 ? 1.3 : 1.1, 0.5, 32), M(PC[i])); p.position.set(x, 0.25, 0); scene.add(p); return p; });
      const rn = [0, 1, 2].map(() => { const g = CK.family(T, 'nana'); g.userData.base = g.scale.x; scene.add(g); return g; });
      const rw = CK.family(T, 'wawa'); rw.userData.base = rw.scale.x; scene.add(rw);
      const door = new T.Group(); { const fr = M('#ffffff'); const pnl = new T.Mesh(new T.BoxGeometry(1.0, 1.9, 0.1), M('#ffc94d')); pnl.position.y = 0.95; door.add(pnl); for (const [w, h, x, y] of [[1.2, 0.12, 0, 1.96], [0.12, 2.0, -0.56, 1.0], [0.12, 2.0, 0.56, 1.0]]) { const b = new T.Mesh(new T.BoxGeometry(w, h, 0.16), fr); b.position.set(x, y, 0); door.add(b); } const kn = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#ff8fab')); kn.position.set(0.32, 0.95, 0.08); door.add(kn); }
      door.position.set(PX[0] + 0.55, 0.5, -0.75); door.rotation.y = -0.25; scene.add(door);
      const therm = new T.Group(); { const tb2 = limb(0.07, M('#ffffff')); setLimb(tb2, v(0, 0, 0), v(0, 0.7, 0)); therm.add(tb2); const bulb = new T.Mesh(new T.SphereGeometry(0.12, 12, 10), M('#ff4d5e')); therm.add(bulb); const lq = limb(0.035, M('#ff4d5e')); setLimb(lq, v(0, 0, 0.03), v(0, 0.5, 0.03)); therm.add(lq); }
      therm.position.set(PX[2] + 0.75, 2.2, 0.2); therm.rotation.z = -0.4; scene.add(therm);

      return { crib, slide, key, hemi, room, C, nb, nh, diaper, hearts, bars, bw, path, rn, rw, therm };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      s.crib.visible = !(bt === 's5' || bt === 's6'); s.slide.visible = !s.crib.visible;
      /* ---------- cast placement per beat ---------- */
      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'mafai', 'kmom', 'kt'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      const CR = { a1: [-0.15, -0.95], a2: [0.1, -0.95] }; /* two-arm cradle */
      let nbOn = false, nbEx = 'happy', nhOn = false, diaperOn = false, heartsOn = false, heartsT0 = 0;
      if (bt === 'cover') {
        def('mom', 0.65, 0, 'worried', Object.assign({ ry: -0.2 }, CR)); nbOn = true; nbEx = 'sleepy';
        const j = Math.abs(Math.sin(t * 6.5)) * 0.18;
        def('nana', -1.3, 0.35, 'cry', { y: j, ry: 0.35, a1: [-1.7, 0.9], a2: [2.0 + 0.15 * Math.sin(t * 8), 0.9] });
      } else if (bt === 's1') {
        const q = SP('s1', 0.5);
        def('mafai', -1.55, 0.1, t < q ? 'angry' : 'happy', { ry: 0.35, a2: [0.9 + 0.25 * Math.sin(t * 9), -0.9] });
        def('mom', 1.05, 0, 'worried', Object.assign({ ry: -0.3 }, CR)); nbOn = true; nbEx = 'cry';
      } else if (bt === 's3') {
        const p = ph('s3', t), q = SP('s3', 0.5), wk = U.clamp((t - q + 0.2) / 0.6);
        if (t < q - 0.2) { def('mom', NX - 1.2, 0, 'worried', Object.assign({ y: 0.36 }, CR)); nbEx = 'cry'; }
        else { const w = (t - q) * 1.6, x = NX - 1.2 + U.easeIO(wk) * 1.4 + 0.75 * Math.sin(w) * wk; def('mom', x, 0.3, 'happy', Object.assign({ y: 0.36 * (1 - wk) + Math.abs(Math.sin(t * 6)) * 0.07 * wk, ry: 0.25 * Math.cos(w) * wk }, CR)); nbEx = t > q + 2.2 ? 'sleepy' : 'happy'; }
        nbOn = true;
      } else if (bt === 's5' || bt === 's6') {
        const p = bt === 's5' ? ph('s5', t) : 1;
        def('kt', -0.95, 0.35, 'cry', { rz: 0.1, ry: 0.35, y: Math.abs(Math.sin(t * 4)) * 0.04, a1: [-2.1, 0.25], a2: [2.1, 0.25] });
        def('kmom', 1.15, 0, 'worried', { ry: -0.45, a1: p > 0.3 ? [-0.9, -0.8] : null });
      } else if (bt === 's7') {
        const p = ph('s7', t), q1 = TM('s7', 1, 0.42), q2 = TM('s7', 2, 0.74);
        if (t < q1) { const w = (t - at('s7')) * 1.5; def('mom', -0.1 + 0.9 * Math.sin(w), 0.4, 'happy', Object.assign({ y: Math.abs(Math.sin(t * 6)) * 0.07, ry: 0.35 * Math.cos(w) }, CR)); nbOn = true; nbEx = t > at('s7') + 2.0 ? 'sleepy' : 'happy'; }
        else if (t < q2) { const k = U.easeIO(U.clamp((t - q1) / 0.6)); def('mom', U.lerp(0.4, 1.9, k), U.lerp(0.4, 0.1, k), 'happy', Object.assign({ y: 0.36 * k, ry: U.lerp(0.3, -0.25, k) }, CR)); nbOn = true; nbEx = 'sleepy'; }
        else { const k = U.easeIO(U.clamp((t - q2) / 0.7)); def('mom', U.lerp(1.9, -0.55, k), U.lerp(0.1, 0.55, k), 'happy', { ry: U.lerp(-0.25, -0.75, k), rx: 0.18 * k, a1: [-0.25, -0.9], a2: [0.15, -0.9] }); nbOn = k < 0.95; nbEx = 'sleepy';
          if (k >= 0.95) def('wawa', -2.35, -0.35, 'sleepy', { y: 1.12, rz: PI / 2 - 0.12, lying: true }); }
      } else if (bt === 's8') {
        const p = ph('s8', t); heartsOn = true; heartsT0 = at('s8') + 0.8;
        def('mom', 0.75, -0.15, 'happy', { y: -0.42, ry: -0.65, hug: U.clamp((p - 0.08) / 0.2) });
        def('nana', -0.65, 0.45, p > 0.25 ? 'giggle' : 'happy', { ry: 0.6 });
        def('wawa', -2.35, -0.35, 'sleepy', { y: 1.12, rz: PI / 2 - 0.12, lying: true });
      } else if (bt === 's9') {
        const p = ph('s9', t), q = SP('s9', 0.55), wk = (t - at('s9'));
        def('mom', 0.9, 0.05, 'happy', { ry: -0.15, a1: [-0.42, -0.25], a2: [0.1, -0.95], y: Math.abs(Math.sin(wk * 5)) * 0.05 * (p > 0.2 ? 1 : 0) }); nbOn = true; nbEx = 'happy';
        def('nana', -1.0, 0.4, t > q ? 'giggle' : p < 0.2 ? 'worried' : 'happy', { ry: 0.3, y: Math.abs(Math.sin(wk * 5 + 1)) * 0.07 * (p > 0.2 ? 1 : 0), hold: true }); diaperOn = t > P('s9', 0.3);
        if (t > q) { heartsOn = true; heartsT0 = q; }
      } else if (bt === 's10' || bt === 's11') {
        def('mom', -1.9, -0.7, 'happy', Object.assign({ ry: 0.15 }, CR)); nbOn = true; nbEx = bt === 's11' ? 'giggle' : 'happy';
        def('dad', 1.9, -0.7, 'happy', { ry: -0.15, a1: [0.5, -0.9], a2: [0.55, -0.55] }); nhOn = true;
        def('mama', 0.1, 1.35, 'giggle', { wave: bt === 's11' && ph('s11', t) > 0.3 });
        if (bt === 's11') { heartsOn = true; heartsT0 = at('s11') + 0.6; }
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave, breath: q.lying ? 0.3 : undefined }); g.userData.arm1.scale.y = 1; g.userData['arm-1'].scale.y = 1;
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        if (q.lying) { g.userData.arm1.rotation.z = 0.8; g.userData['arm-1'].rotation.z = -0.8; }
        g.scale.setScalar(g.userData.base);
      }
      if (bt === 'cover' || bt === 's1' || bt === 's3' || bt === 's7' || bt === 's9' || bt === 's10' || bt === 's11') if (st.mom) C.mom.userData.head.rotation.x = 0.2;
      /* s8: mom wraps nana, nana's arms around mom */
      if (bt === 's8') { const k = st.mom.hug; C.mom.updateMatrixWorld(true); C.nana.updateMatrixWorld(true);
        aimArm(C.mom, 'arm-1', C.nana.localToWorld(v(0.45, 0.85, -0.15)), k, 1.35); aimArm(C.mom, 'arm1', C.nana.localToWorld(v(-0.3, 0.9, -0.35)), k, 1.35);
        C.nana.userData.arm1.rotation.z = U.lerp(0.5, 1.5, k); C.nana.userData.arm1.rotation.x = U.lerp(-0.12, -0.6, k); C.nana.userData['arm-1'].rotation.z = U.lerp(-0.5, -0.9, k); C.nana.userData['arm-1'].rotation.x = U.lerp(-0.12, -0.5, k); }
      /* s9: nana's free hand reaches mom's hand */
      if (bt === 's9' && st.nana) { C.mom.updateMatrixWorld(true); aimArm(C.nana, 'arm1', C.mom.userData['hand-1'].getWorldPosition(new T.Vector3()), 1, 1.6); C.nana.userData['arm-1'].rotation.z = -0.35; C.nana.userData['arm-1'].rotation.x = -0.6; }
      s.diaper.visible = diaperOn;
      /* cradled wawa */
      s.nb.visible = nbOn;
      if (nbOn) { s.nb.position.set(0.45, 0.8, 0.6); s.nb.rotation.set(-0.45, 0, PI / 2 - 0.32); s.nb.userData.setExpr(nbEx); s.nb.userData.tick(t, { breath: 0.35 }); s.nb.userData.arm1.rotation.z = 0.9; s.nb.userData['arm-1'].rotation.z = nbEx === 'cry' ? -1.6 - 0.3 * Math.sin(t * 9) : -0.9; }
      s.nh.visible = nhOn;
      if (nhOn) { s.nh.position.set(0.95, 0.48, 0.3); s.nh.rotation.set(0, -0.5, 0); s.nh.userData.setExpr(bt === 's11' ? 'giggle' : 'happy'); s.nh.userData.tick(t, {}); s.nh.userData['arm-1'].rotation.z = -1.1; s.nh.userData['arm-1'].rotation.x = -0.6; }
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        const base = bt === 's8' ? [0.05, 2.6, 0.6] : bt === 's9' ? [-0.4, 2.4, 0.8] : [0.1, 3.4, 0.9]; h.position.set(base[0] + u[0], base[1] + a * 2.0, base[2]); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });

      /* ---------- bars ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : t > end('s2') ? 1 : 0;
        s.bars.forEach((b, i) => { const k = U.easeOut(U.clamp((p - 0.06 - i * 0.14) / 0.3)); b.scale.y = Math.max(0.01, [2.16, 1.23][i] * 1.45 * k); const g = s.bw[i]; g.position.set(b.position.x, b.scale.y, 0.15); g.visible = k > 0.02; g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(k * 1.5)))); g.userData.setExpr(i === 0 ? 'cry' : 'happy'); g.userData.tick(t, { wave: i === 1 && p > 0.55 }); g.position.y += i === 0 ? Math.abs(Math.sin(t * 8)) * 0.06 : 0; }); }
      s.path.forEach((f, i) => { f.material.opacity = inB('s3', t) && t > SP('s3', 0.5) ? 0.35 + 0.5 * U.clamp(Math.sin(t * 4 - i * 0.8)) : 0.25; });

      /* ---------- reasons ---------- */
      { const p = inB('s4', t) ? ph('s4', t) : 0; const ex = ['cry', 'angry', 'sleepy'];
        s.rn.forEach((g, i) => { const k = U.clamp((t - TM('s4', i, 0.12 + i * 0.22)) / 0.35); g.visible = inB('s4', t) && k > 0.01; if (!g.visible) return;
          const x = [RX - 2.75, RX - 0.5, RX + 2.75][i]; g.position.set(x, 0.5 + (i === 0 ? Math.abs(Math.sin(t * 6)) * 0.12 : 0), 0.15); g.rotation.set(0, i === 1 ? 0.45 : 0, 0); g.scale.setScalar(g.userData.base * 1.15 * Math.max(0.01, U.easeBack(k)));
          g.userData.setExpr(ex[i]); g.userData.tick(t, { breath: i === 2 ? 0.25 : undefined });
          if (i === 0) { g.userData.arm1.rotation.z = 2.3 + 0.15 * Math.sin(t * 7); g.userData['arm-1'].rotation.z = -2.3 - 0.15 * Math.sin(t * 7 + 1); g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = 0.2; }
          if (i === 1) { g.userData.arm1.rotation.z = 0.2; g.userData['arm-1'].rotation.z = -0.2; g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = -0.5; }
          if (i === 2) { g.userData.head.rotation.z = 0.25 + 0.05 * Math.sin(t * 1.5); } });
        const k1 = U.clamp((t - TM('s4', 1, 0.34)) / 0.35); s.rw.visible = inB('s4', t) && k1 > 0.01; if (s.rw.visible) { s.rw.position.set(RX + 0.75, 0.5, 0.15); s.rw.rotation.set(0, -0.2, 0); s.rw.scale.setScalar(s.rw.userData.base * 1.15 * Math.max(0.01, U.easeBack(k1))); s.rw.userData.setExpr('giggle'); s.rw.userData.tick(t, { wave: true }); }
        s.therm.visible = inB('s4', t) && U.clamp((t - TM('s4', 2, 0.56)) / 0.35) > 0.5; }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, nb: s.nb, nh: s.nh, bw: s.bw, rn: s.rn, rw: s.rw }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's3') return ['#a8d8ff', '#e3f3ff']; if (b === 's4') return ['#ffd8a8', '#fff4e6']; if (b === 's5' || b === 's6') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, a, fill, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const ring = (x, y, r, a, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.lineWidth = 9; g.strokeStyle = col || '#ffd35e'; g.setLineDash([22, 14]); g.lineDashOffset = -t * 60; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.restore(); };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const C = S.C;
      /* cover: nana's cry */
      if (b === 'cover') { const [x, y] = wp(C.nana.userData.head, 0, 0.9); bubble('อุ้มนานะด้วยยย!', x + 90, y - 70, U.clamp((t - 0.25) / 0.3), 44); }
      /* s1: grandma's line, then a big question mark */
      if (b === 's1') { const p = ph('s1', t), q = SP('s1', 0.5); const [x, y] = wp(C.mafai.userData.head, 0, 1.0);
        bubble('อุ้มบ่อย เดี๋ยวติดมือนะ!', x + 120, y - 60, U.clamp((p - 0.06) / 0.1) * (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3)));
        if (t > q) { const [mx, my] = wp(C.mom.userData.head, 0, 1.0); const a = U.clamp((t - q) / 0.3); g.save(); g.globalAlpha = a; txt('?', mx + 30, my - 60 - 10 * Math.sin(t * 5), 130, '#ffd35e', 800); g.restore(); } }
      /* s2: bar labels + -43% */
      if (b === 's2') { const p = ph('s2', t), NM = ['อุ้มตามปกติ', 'อุ้มเพิ่มทุกวัน'], HRS = [2.16, 1.23];
        S.bw.forEach((w, i) => { const a = U.clamp((p - 0.1 - i * 0.14) / 0.15); if (a <= 0) return; const bx = [-61.55, -58.45][i];
          let [x, y] = proj(new T.Vector3(bx, 0, 0.75)); tag(NM[i], x, y + 46, 40, a, i ? '#c9f5d9' : '#ffd6e4');
          [x, y] = wp(w.userData.head, 0, 0.95); const kk = U.clamp((p - 0.12 - i * 0.14) / 0.3); g.save(); g.globalAlpha = a; txt((HRS[i] * kk).toFixed(2) + ' ชม./วัน', x, y - 30, 46, i ? '#ffffff' : '#ffd35e', 800); g.restore(); });
        const a3 = U.clamp((t - SP('s2', 0.62) - 0.6) / 0.35); if (a3 > 0) { const [x, y] = proj(new T.Vector3(LX, 2.6, 0.5)); g.save(); g.globalAlpha = a3; g.translate(x, y); g.scale(0.8 + 0.2 * U.easeBack(a3), 0.8 + 0.2 * U.easeBack(a3)); rr(-120, -62, 240, 124, 62, '#ff5f86', '#ffffff'); plain('−43%', 0, 4, 70, '#ffffff', 800, 'center'); g.restore(); } }
      /* s3: heart-rate panel */
      if (b === 's3') { const p = ph('s3', t), q = SP('s3', 0.5), wk = U.clamp((t - q) / 0.8), a0 = U.clamp((p - 0.05) / 0.1);
        const x0 = 110 + LD, w = 860 - 2 * LD, y0 = 790, h = 150; g.save(); g.globalAlpha = a0; rr(x0, y0, w, h, 30, 'rgba(255,255,255,.9)', wk > 0.5 ? '#5fd38d' : '#ff5f6d');
        const rate = U.lerp(2.6, 1.3, wk), col = wk > 0.5 ? '#3fbf73' : '#ff4d5e', bx = x0 + 300;
        g.lineWidth = 6; g.strokeStyle = col; g.lineJoin = 'round'; g.beginPath();
        for (let i = 0; i <= 200; i++) { const xx = bx + i * (w - 330) / 200, u = ((t * rate - i / 200 * 3 * rate / 2) % 1 + 1) % 1; let yy = y0 + h / 2 + 10; if (u > 0.1 && u < 0.14) yy -= 55 * Math.sin((u - 0.1) / 0.04 * PI); else if (u > 0.14 && u < 0.17) yy += 22 * Math.sin((u - 0.14) / 0.03 * PI); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
        g.stroke(); const hb = 1 + 0.18 * Math.max(0, Math.sin(t * rate * 2 * PI));
        g.save(); g.translate(x0 + 70, y0 + h / 2); g.scale(hb, hb); g.fillStyle = col; g.beginPath(); g.moveTo(0, 26); g.bezierCurveTo(-48, -6, -28, -44, 0, -18); g.bezierCurveTo(28, -44, 48, -6, 0, 26); g.fill(); g.restore();
        plain('ชีพจรลูก', x0 + 125, y0 + 48, 34, '#3a2f3f', 700); plain(wk > 0.5 ? 'ช้าลง' : 'เต้นเร็ว', x0 + 125, y0 + 100, 40, col, 800); g.restore();
        const [sx, sy] = wp(C.mom.userData.head, 0, 1.35); tag(wk > 0.5 ? 'อุ้มแล้วเดิน' : 'อุ้มนั่งนิ่งๆ', sx, Math.max(sy, 1000), 40, a0, wk > 0.5 ? '#c9f5d9' : '#ffd6e4'); }
      /* s4: numbers + reason tags */
      if (b === 's4') { const L = ['กลัวแม่หายไป', 'มีน้องใหม่', 'เหนื่อย ง่วง ป่วย'], X = [RX - 2.75, RX, RX + 2.75];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s4', i, 0.12 + i * 0.22) - 0.15) / 0.3); if (a <= 0) return;
          let [x, y] = proj(new T.Vector3(X[i], 0, 1.1)); tag(s2, x, y + 40, 38, a, ['#ffd6e4', '#e6dcff', '#c9f5d9'][i]);
          [x, y] = proj(new T.Vector3(X[i], 2.75, 0.2)); g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, 36, 0, 7); g.fillStyle = '#ff6f91'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); plain(String(i + 1), x, y + 3, 42, '#ffffff', 800, 'center'); g.restore();
          if (i === 2) { const [zx, zy] = wp(S.rn[2].userData.head, -0.6, 0.8); g.save(); g.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 3)); plain('z z', zx - 40, zy - 10 * Math.sin(t * 2), 44, '#5a6fd6', 800, 'center'); g.restore(); } }); }
      /* s5: ring on the shin */
      if (b === 's5') { const p = ph('s5', t), q = SP('s5', 0.5); C.kt.updateMatrixWorld(true); const [x, y] = proj(C.kt.localToWorld(new T.Vector3(0.17, 0.18, 0.15)));
        const a = U.clamp((t - q) / 0.3); ring(x, y, 80, a, '#ff5f6d'); tag('ขาเจ็บ เลยไม่ยอมเดิน', x + 60, y - 150 - (REEL ? 40 : 0), 38, a, '#ffd6dc'); }
      /* s6: doctor list */
      if (b === 's6') { const p = ph('s6', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 500, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['จู่ๆ ไม่ยอมเดิน ไม่ยอมลงน้ำหนักขา', 'เดินกะเผลก ไม่ดีขึ้นใน 24 ชม.', 'มีไข้ ร่วมกับขา/ข้อ บวม แดง ร้อน', 'ร้องเจ็บเวลาจับขา หรือเปลี่ยนผ้าอ้อม', 'ทำสิ่งที่เคยทำได้ ไม่ได้แล้ว'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.14)) / 0.35); if (a <= 0) return; const y = 388 + i * 82; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(37 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AAP HealthyChildren, NHS, CDC', 540, 792, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore(); }
      /* s7: 3-step recipe */
      if (b === 's7') { const a0 = U.clamp((ph('s7', t) - 0.03) / 0.08), L = [['เดินอุ้ม', '5 นาที'], ['นั่งอุ้มต่อ', '5–8 นาที'], ['ค่อยวางลง', 'ในเปล']];
        let cur = 0; for (let i = 0; i < 3; i++) if (t >= TM('s7', i, [0, 0.42, 0.74][i])) cur = i;
        const cw = (900 - 2 * LD) / 3; L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, [0.02, 0.42, 0.74][i])) / 0.3) * a0; if (a <= 0) return; const x = 90 + LD + i * cw + cw / 2;
          g.save(); g.globalAlpha = a; rr(x - cw / 2 + 10, 800, cw - 20, 140, 28, i === cur ? '#ffffff' : 'rgba(255,255,255,.7)', i === cur ? '#ff6f91' : null);
          plain(s2[0], x, 845, 36, '#3a2f3f', 700, 'center'); plain(s2[1], x, 900, 40, i === cur ? '#ff4f7b' : '#8a7a8f', 800, 'center'); g.restore();
          if (i < 2) { g.save(); g.globalAlpha = a; plain('›', x + cw / 2, 868, 60, '#ff6f91', 800, 'center'); g.restore(); } }); }
      /* s8: love jar */
      if (b === 's8') { const p = ph('s8', t), a = U.clamp((p - 0.15) / 0.1), f = U.easeOut(U.clamp((p - 0.2) / 0.55)); if (a > 0) { const x = 850 - LD, y0 = 800, h = 200, w = 130; g.save(); g.globalAlpha = a;
        g.fillStyle = 'rgba(255,255,255,.75)'; rr(x - w / 2, y0, w, h, 26, 'rgba(255,255,255,.75)', '#ff8fab'); g.save(); g.beginPath(); g.roundRect(x - w / 2 + 8, y0 + 8, w - 16, h - 16, 20); g.clip(); g.fillStyle = '#ff6f91'; const fy = y0 + h - 8 - (h - 16) * f; g.fillRect(x - w / 2, fy + 6 * Math.sin(t * 4), w, h); g.restore();
        plain('ถังใจ', x, y0 + h + 36, 34, '#3a2f3f', 800, 'center'); plain(Math.round(f * 100) + '%', x, y0 + h / 2, 38, '#ffffff', 800, 'center'); g.restore(); } }
      /* s9: mom's line, then praise */
      if (b === 's9') { const p = ph('s9', t), q = SP('s9', 0.55); const [x, y] = wp(C.mom.userData.head, 0, 1.0);
        bubble('แม่อุ้มน้องอยู่ จับมือแม่นะ', x - 120, y - 70, U.clamp((p - 0.08) / 0.1) * (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3)), 38);
        bubble('เก่งมาก! ช่วยถือผ้าอ้อมให้น้องด้วย', x - 150, y - 70, U.clamp((t - q - 0.1) / 0.3), 36);
        if (p > 0.3) { const [dx, dy] = wp(C.nana.userData['hand-1'], 0, -0.35, 0.3); tag('ผ้าอ้อมน้อง', dx, dy + 70, 32, U.clamp((p - 0.32) / 0.1) * (t < q ? 1 : 0.0)); } }
      /* s10: tips */
      if (b === 's10') { const p = ph('s10', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ทารก: อุ้มได้เต็มที่ ไม่เสียเด็ก', 'เดินอุ้ม 5 นาที + นั่งอุ้ม 5–8 นาที ก่อนวาง', 'เติมกอด + มีเวลาของพี่ทุกวัน', 'ตั้งจุดหมาย "เดินถึงประตู แล้วแม่อุ้ม"', 'จะไปไหน บอกลาสั้นๆ ไม่แอบหนี'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s10', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s10', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(36 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[84, ['ลูกติดให้อุ้ม', '#fff']], [72, ['แก้ยังไงดี?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: SP('s1', 0.5), y: 290, lines: [[60, ['"อุ้มบ่อย เดี๋ยวติดมือ"', '#fff']], [46, ['ประโยคที่พ่อแม่ได้ยินบ่อยที่สุด', '#ffe3ea', 600]]], foot: 'ยายมะไฟ ข้างบ้าน' },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[62, ['จริงไหม?', '#ffd35e']], [46, ['งานวิจัยเคยทดลองไว้แล้ว', '#fff', 600]]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.62), y: 290, lines: [[58, ['ให้แม่อุ้มลูกเพิ่มทุกวัน', '#fff']], [46, ['ตอนลูก 6 สัปดาห์ ช่วงที่ร้องมากที่สุด', '#ffe3ea', 600]]], foot: 'ทดลองแบบสุ่ม 99 คู่แม่ลูก (Hunziker & Barr, Pediatrics 1986)' },
      { t0: SP('s2', 0.62) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[60, ['ลูกร้องน้อยลง ', '#fff'], ['43%', '#ffd35e']]], foot: 'ทารกวัยแรกเกิด อุ้มบ่อยไม่ทำให้เสียเด็ก (AAP)' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.5), y: 290, lines: [[58, ['อุ้มนั่งนิ่งๆ บางทีก็ยังร้อง', '#fff']]] },
      { t0: SP('s3', 0.5) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[58, ['ลุกขึ้น "เดิน" ไปด้วย', '#ffd35e']], [46, ['หัวใจลูกเต้นช้าลง หยุดร้องเร็วขึ้น', '#fff', 600]]], foot: 'ทารก 1–6 เดือน (Esposito et al., Current Biology 2013)' },
      { t0: at('s4') + 0.2, t1: end('s4') - 0.05, y: 290, lines: [[58, ['เดินได้แล้ว ทำไมยังขอให้อุ้ม?', '#fff']], [44, ['3 เหตุผลที่เจอบ่อย', '#ffd35e', 700]]], foot: 'กลัวการแยกจาก พีคช่วง 10–18 เดือน (AAP) · มีน้อง: Stanford Children\'s' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[56, ['น้องกระท้อน ล้มจากสไลเดอร์เตี้ยๆ', '#fff']], [46, ['แล้วไม่ยอมเดินอีกเลย ขอแต่ให้อุ้ม', '#ffe3ea', 600]]] },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[60, ['อาจไม่ใช่แค่อ้อน!', '#ffd35e']], [46, ['กระดูกหน้าแข้งร้าวเล็กๆ ก็เป็นได้', '#fff', 600]]], foot: 'Toddler\'s fracture พบช่วง 9 เดือน–3 ขวบ · X-ray ครั้งแรกอาจยังไม่เห็น' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[56, ['พาไปหาหมอ ถ้าลูก…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 290, lines: [[58, ['ทารก: อุ้มได้เต็มที่', '#ffd35e']], [44, ['ใช้เป้อุ้มช่วยให้มือว่าง · สูตรพาหลับ', '#fff', 600]]], foot: 'ทารก 21 คน (Ohmura, Kuroda et al., Current Biology 2022)' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 290, lines: [[56, ['เติมกอด ตอนลูกยังไม่ขอ', '#ffd35e']], [44, ['มีเวลาของพี่ทุกวัน แม้แค่สั้นๆ', '#fff', 600]]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 290, lines: [[54, ['ไม่บอกแค่ "ไม่"', '#fff']], [48, ['บอกว่าลูกทำอะไรได้ แล้วชมทันที', '#ffd35e', 700]]] },
      { t0: at('s10') + 0.2, t1: end('s10') - 0.05, y: 250, lines: [[56, ['5 ข้อ เมื่อลูกติดอุ้ม', '#ffd35e']]] },
      { t0: at('s11') + 0.2, t1: end('s11'), y: 290, lines: [[54, ['วันหนึ่ง ลูกจะไม่ขอให้อุ้มอีกแล้ว', '#fff']], [58, ['อุ้มได้ ก็อุ้มไปก่อน', '#ffd35e']], [40, ['ลูกคุณขอให้อุ้มบ่อยที่สุดตอนไหน? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AAP, Pediatrics 1986, Current Biology 2013/2022, NHS, CDC' },
    ],
    trans,
    audio: [
      [0.3, 'boing'], [0.7, 'giggle'],
      [at('s1') + 0.4, 'pop'], [at('s1') + 0.9, 'warn'], [SP('s1', 0.5) + 0.1, 'boing'],
      [at('s2') + 0.4, 'riser'], [P('s2', 0.2), 'pop'], [P('s2', 0.34), 'pop'], [SP('s2', 0.62) + 0.6, 'ding'], [SP('s2', 0.62) + 0.65, 'shimmer'],
      [at('s3') + 0.5, 'heartbeat'], [at('s3') + 1.6, 'heartbeat'], [SP('s3', 0.5), 'whoosh'], [SP('s3', 0.5) + 0.9, 'twinkle'],
      [TM('s4', 0, 0.12), 'pop'], [TM('s4', 1, 0.34), 'pop'], [TM('s4', 2, 0.56), 'pop'], [TM('s4', 2, 0.56) + 0.5, 'giggle'],
      [at('s5') + 0.3, 'thud'], [SP('s5', 0.5), 'warn'], [SP('s5', 0.5) + 0.2, 'heartbeat'],
      [TM('s6', 0, 0.1), 'tick'], [TM('s6', 1, 0.24), 'tick'], [TM('s6', 2, 0.38), 'tick'], [TM('s6', 3, 0.52), 'tick'], [TM('s6', 4, 0.66), 'tick'], [P('s6', 0.8), 'heartbeat'],
      [at('s7') + 0.3, 'twinkle'], [TM('s7', 1, 0.42), 'ding'], [TM('s7', 2, 0.74), 'ding'], [TM('s7', 2, 0.74) + 0.8, 'shimmer'],
      [P('s8', 0.15), 'heart'], [P('s8', 0.45), 'giggle'], [P('s8', 0.6), 'heart'],
      [at('s9') + 0.5, 'pop'], [P('s9', 0.3), 'boing'], [SP('s9', 0.55), 'ding'], [SP('s9', 0.55) + 0.3, 'giggle'],
      [TM('s10', 0, 0.1), 'ding'], [TM('s10', 1, 0.27), 'tick'], [TM('s10', 2, 0.44), 'tick'], [TM('s10', 3, 0.61), 'tick'], [TM('s10', 4, 0.78), 'tick'],
      [at('s11') + 0.3, 'twinkle'], [at('s11') + 1.2, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s11'), CK.MUSIC.CUTE), CK.musicBed(at('s11'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
