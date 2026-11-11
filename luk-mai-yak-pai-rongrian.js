/* พ่อแม่หัวจะปวด — ลูกไม่อยากไปโรงเรียน จัดการยังไง? (วันเรียนปวดท้อง วันหยุดหาย → มักเริ่มหลังหยุดยาว → 4 เหตุผล Kearney & Silverman → วงจรหลบ ลูกบอลหิมะ → 1–5% พีค 5–6 / 10–11 ขวบ → พบแพทย์ถ้า → ฟังก่อน → กลับไปเร็ว จับมือครู → 5 ทิป)
   Build: node build.js luk-mai-yak-pai-rongrian.js review-luk-mai-yak-pai-rongrian.html --kit clay --title "ลูกไม่อยากไปโรงเรียน จัดการยังไง?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 7.5], ['s2', 6], ['s3', 10.5], ['s4', 7.5], ['s5', 7.5], ['s6', 7.5], ['s7', 7.5], ['s8', 8], ['s9', 8.5], ['s10', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } });
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  /* s1 week strip */
  const DAYS = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];
  const dayIdx = (t) => Math.min(6, Math.floor(U.clamp((t - at('s1') - 0.5) / Math.max(0.5, SP('s1', 0.56) - at('s1') - 0.7)) * 7));
  /* s3 four reasons */
  const PX = [-3.3, -1.1, 1.1, 3.3], PC = ['#9b7bff', '#ff8fab', '#ff5f86', '#4fb2f5'];
  const R3 = (i) => i === 0 ? at('s3') : TM('s3', i, [0, 0.27, 0.52, 0.76][i]);
  const r3Idx = (t) => { let k = 0; for (let i = 1; i < 4; i++) if (t >= R3(i)) k = i; return k; };
  /* s4 slope */
  const SA = [117.2, 4.0], SB = [122.4, 0.5], SN = [0.558, 0.83];
  const ballU = (t) => U.easeIO(U.clamp((t - at('s4') - 0.6) / (dur('s4') - 1.6)));
  /* home blocking */
  const HM = { mom: [-1.35, 0.2], mama: [0.95, 0.7] };
  const FAM = { mom: [-1.9, -0.7], dad: [1.95, -0.7], nana: [-1.6, 1.4], mama: [0, 1.4], wawa: [1.45, 1.4] };
  const SX = -120;

  const HT = REEL ? 3.2 : 3.9, ST = REEL ? 3.2 : 4.0;
  const SH = {
    cover: [FW(-0.2, 0.4, 6.0, HT), FW(-0.2, 0.4, 5.7, HT)],
    s1: [FW(-0.2, 0.4, 5.9, HT), FW(-0.2, 0.4, 5.6, HT)],
    s2: [FW(-0.2, 0.4, 6.1, HT), FW(-0.2, 0.4, 5.8, HT)],
    s3: REEL ? [FW(60, 0, 10.0, 5.5, 0.08), FW(60, 0, 9.7, 5.5, 0.08)] : [FW(60, 0, 10.0, 6.9, 0.08), FW(60, 0, 9.7, 6.9, 0.08)],
    s4: REEL ? [FW(121.3, 0, 10.7, 3.9, 0.1), FW(121.3, 0, 10.4, 3.9, 0.1)] : [FW(120.85, 0, 10.5, 5.7, 0.1), FW(120.85, 0, 10.2, 5.7, 0.1)],
    s5: [FW(SX, 0, 6.4, REEL ? 2.9 : 3.6), FW(SX, 0, 6.1, REEL ? 2.9 : 3.6)],
    s6: [FW(-62.3, -0.6, 6.5, 4.1, 0.22), FW(-62.3, -0.6, 6.2, 4.1, 0.22)],
    s7: [FW(-0.2, 0.4, 5.9, HT), FW(-0.2, 0.4, 5.6, HT)],
    s8: REEL ? [FW(SX + 0.1, 0, 8.9, ST), FW(SX + 0.1, 0, 8.7, ST)] : [FW(SX - 0.2, 0, 8.2, ST), FW(SX - 0.2, 0, 7.9, ST)],
    s9: [FW(0, 0.3, 7.6, REEL ? 3.1 : 4.0, 0.14), FW(0, 0.3, 7.3, REEL ? 3.1 : 4.0, 0.14)],
    s10: REEL ? [FW(SX + 0.1, 0, 8.9, ST), FW(SX + 0.1, 0, 8.6, ST)] : [FW(SX - 0.2, 0, 8.2, ST), FW(SX - 0.2, 0, 7.7, ST)],
  };
  const CUT = new Set(['s3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.run({
    DUR, file: 'luk-mai-yak-pai-rongrian', title: 'ลูกไม่อยากไปโรงเรียน จัดการยังไง?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกกับโรงเรียน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: home ===== */
      scene.add(CK.room(T, { wall: '#ffd3a8', wain: '#8fd6c4', floor: '#e9b483', rug: '#ff9ec0' }));
      const fam = {}; for (const k of ['mom', 'dad', 'mama', 'nana', 'wawa']) { const g = CK.family(T, k); g.userData.base = g.scale.x; scene.add(g); fam[k] = g; }
      const bag = new T.Group(); const bb = new T.Mesh(new T.BoxGeometry(0.62, 0.7, 0.34), M('#3f8fe8')); bag.add(bb); const bp = new T.Mesh(new T.BoxGeometry(0.4, 0.26, 0.06), M('#ffd23f')); bp.position.set(0, -0.12, 0.2); bag.add(bp); const bh = new T.Mesh(new T.TorusGeometry(0.16, 0.045, 8, 16, PI), M('#2a62b8')); bh.position.y = 0.36; bag.add(bh);
      bag.scale.setScalar(0.8); bag.position.set(0, -0.36, 0.1); fam.mom.userData['hand-1'].add(bag);

      /* ===== stage 1: four reasons (x = 60) ===== */
      const mech = new T.Group(); mech.position.x = 60; scene.add(mech);
      const fl1 = new T.Mesh(new T.BoxGeometry(26, 0.3, 30), M('#7fd0bd')); fl1.position.set(0, -0.15, 0); mech.add(fl1);
      const bw1 = new T.Mesh(new T.BoxGeometry(26, 13, 0.3), M('#ffffff', { map: (() => { const tx = dots('#c9f0e6', '#ffffff'); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(9, 4.5); return tx; })() })); bw1.position.set(0, 6, -3.2); mech.add(bw1);
      const peds = PX.map((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(0.92, 1.02, 1.0, 36), M(PC[i])); p.position.set(x, 0.5, 0); mech.add(p); return p; });
      const props = [];
      { /* 1 worry cloud with face */ const c = new T.Group(), cm = M('#8f7be8'); for (const [x, y, r] of [[-0.42, 0, 0.4], [0, 0.16, 0.52], [0.44, 0, 0.4], [0, -0.14, 0.44]]) { const b = new T.Mesh(new T.SphereGeometry(r, 18, 14), cm); b.position.set(x, y, 0); c.add(b); } for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), M('#ffffff')); e.position.set(s * 0.18, 0.1, 0.5); c.add(e); const pu = new T.Mesh(new T.SphereGeometry(0.045, 8, 8), M('#2b2340')); pu.position.set(s * 0.18, 0.08, 0.58); c.add(pu); } const bolt = new T.Mesh(new T.ConeGeometry(0.13, 0.5, 4), M('#ffd23f')); bolt.position.set(0.1, -0.72, 0); bolt.rotation.z = PI + 0.25; c.add(bolt); props.push(c); }
      { /* 2 test paper with red X */ const p = new T.Group(); const sh = new T.Mesh(new T.BoxGeometry(0.95, 1.2, 0.08), M('#fff6d8')); p.add(sh); for (let i = 0; i < 3; i++) { const l = new T.Mesh(new T.BoxGeometry(0.6, 0.07, 0.03), M('#8fb6e8')); l.position.set(-0.05, -0.1 - i * 0.18, 0.06); p.add(l); } for (const s of [-1, 1]) { const x = new T.Mesh(new T.BoxGeometry(0.5, 0.1, 0.04), M('#ff3b5c')); x.rotation.z = s * PI / 4; x.position.set(0.12, 0.3, 0.07); p.add(x); } props.push(p); }
      { /* 3 heart */ const h = new T.Group(), sh = new T.Shape(); sh.moveTo(0, -0.62); sh.bezierCurveTo(-0.22, -0.4, -0.78, -0.02, -0.78, 0.36); sh.bezierCurveTo(-0.78, 0.74, -0.24, 0.84, 0, 0.44); sh.bezierCurveTo(0.24, 0.84, 0.78, 0.74, 0.78, 0.36); sh.bezierCurveTo(0.78, -0.02, 0.22, -0.4, 0, -0.62);
        const hg = new T.ExtrudeGeometry(sh, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 6, curveSegments: 24 }); hg.translate(0, 0, -0.11); hg.scale(0.78, 0.78, 0.78); h.add(new T.Mesh(hg, M('#ff4f7d'))); props.push(h); }
      { /* 4 TV */ const tv = new T.Group(); const bd = new T.Mesh(new T.BoxGeometry(1.25, 0.85, 0.14), M('#3a4a78')); tv.add(bd); const sc = new T.Mesh(new T.BoxGeometry(1.08, 0.68, 0.04), M('#6fe0ff', { emissive: '#3fb8e8', emissiveIntensity: 0.35 })); sc.position.z = 0.08; tv.add(sc); const st = new T.Mesh(new T.SphereGeometry(0.16, 12, 10), M('#ffd23f')); st.position.set(0, 0, 0.14); tv.add(st); const ft = new T.Mesh(new T.BoxGeometry(0.5, 0.1, 0.2), M('#3a4a78')); ft.position.y = -0.5; tv.add(ft); props.push(tv); }
      props.forEach((p, i) => { p.position.set(PX[i], 5.2, 0); mech.add(p); });
      const mini = CK.family(T, 'mama', { scale: 0.9 }); mini.userData.base = 0.9; mech.add(mini);

      /* ===== stage 2: slope (x = 120) ===== */
      const fl2 = new T.Mesh(new T.BoxGeometry(26, 0.3, 16), M('#f08fb4')); fl2.position.set(121, -0.15, 0); scene.add(fl2);
      const bw2 = new T.Mesh(new T.BoxGeometry(26, 13, 0.3), M('#ffffff', { map: (() => { const tx = dots('#ffd9e6', '#ffffff'); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(9, 4.5); return tx; })() })); bw2.position.set(121, 6, -3.6); scene.add(bw2);
      { const dx = SB[0] - SA[0], dy = SB[1] - SA[1], L = Math.hypot(dx, dy); const sl = new T.Mesh(new T.BoxGeometry(L + 0.6, 0.3, 2.2), M('#7fb6f5')); sl.position.set((SA[0] + SB[0]) / 2, (SA[1] + SB[1]) / 2, 0); sl.rotation.z = Math.atan2(dy, dx); scene.add(sl);
        for (const [x, h] of [[117.4, 3.7], [119.8, 2.1]]) { const pl = new T.Mesh(new T.BoxGeometry(0.5, h, 1.6), M('#5f97dd')); pl.position.set(x, h / 2, 0); scene.add(pl); } }
      const ball = new T.Group(); ball.add(new T.Mesh(new T.SphereGeometry(1, 28, 20), M('#9b7bff')));
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.2, 12, 10), M('#ffffff')); e.position.set(s * 0.33, 0.2, 0.86); ball.add(e); const pu = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#2b2340')); pu.position.set(s * 0.33, 0.17, 1.02); ball.add(pu); const br = new T.Mesh(new T.BoxGeometry(0.34, 0.07, 0.06), M('#2b2340')); br.position.set(s * 0.33, 0.5, 0.86); br.rotation.z = s * 0.45; ball.add(br); }
      scene.add(ball);
      const kid4 = CK.family(T, 'mama', { scale: 0.85 }); kid4.userData.base = 0.85; scene.add(kid4);

      /* ===== stage 3: night room (x = -60) ===== */
      const MT = 0.75, NT = nightTex();
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: -2.6 }); room2.position.x = -60; scene.add(room2); room2.userData.win.material.map = NT;
      const b2 = new T.Group(); b2.position.x = -61; scene.add(b2);
      const f2 = new T.Mesh(new T.BoxGeometry(3.2, 0.36, 4.2), M('#e9b27c')); f2.position.set(0, 0.18, -0.6); b2.add(f2);
      const m2 = new T.Mesh(new T.BoxGeometry(3.0, 0.4, 4.0), M('#ffd0dc')); m2.position.set(0, MT - 0.2, -0.6); b2.add(m2);
      const hb2 = new T.Mesh(new T.BoxGeometry(3.2, 1.6, 0.3), M('#9fd3ff')); hb2.position.set(0, 1.0, -2.75); b2.add(hb2);
      const bl2 = new T.Mesh(new T.BoxGeometry(2.9, 0.55, 2.4), M('#ffffff', { map: dots('#4f9fd8', '#d6f0ff') })); bl2.position.set(0, MT + 0.27, 0.15); b2.add(bl2);
      const FU = { scale: 1.05, top: '#b6d94c', bottom: '#5a6fd8' }, CH = { scale: 0.95, top: '#b48cff', bottom: '#ffe08a' };
      const st2 = {};
      st2.kid = CK.neighbor(T, 1, FU); st2.kid.userData.base = 1.05; scene.add(st2.kid);
      st2.kmom = CK.neighbor(T, 0, { scale: 1.3, lashes: true, top: '#ff9a62', bottom: '#5f7fd0' }); st2.kmom.userData.base = 1.3; scene.add(st2.kmom);

      /* ===== stage 4: school front (x = -120) ===== */
      const sch = new T.Group(); sch.position.x = SX; scene.add(sch);
      const yard = new T.Mesh(new T.BoxGeometry(28, 0.3, 18), M('#7fcf8a')); yard.position.set(0, -0.15, 2); sch.add(yard);
      const bld = new T.Mesh(new T.BoxGeometry(28, 12, 0.4), M('#ffb85c')); bld.position.set(0, 6, -3.4); sch.add(bld);
      const band = new T.Mesh(new T.BoxGeometry(28, 0.9, 0.5), M('#f2784b')); band.position.set(0, 0.45, -3.3); sch.add(band);
      const door = new T.Mesh(new T.BoxGeometry(2.3, 3.5, 0.2), M('#d9573f')); door.position.set(2.1, 1.75, -3.15); sch.add(door);
      const dfr = new T.Mesh(new T.BoxGeometry(2.7, 3.75, 0.14), M('#fff1c9')); dfr.position.set(2.1, 1.87, -3.2); sch.add(dfr);
      const knob = new T.Mesh(new T.SphereGeometry(0.11, 10, 8), M('#ffd23f')); knob.position.set(2.95, 1.6, -3.0); sch.add(knob);
      for (const x of [-4.6, -1.6, 5.6]) { const w = new T.Mesh(new T.BoxGeometry(1.9, 1.6, 0.12), M('#8fd3ff')); w.position.set(x, 2.5, -3.15); sch.add(w); const wf = new T.Mesh(new T.BoxGeometry(2.15, 1.85, 0.08), M('#fff1c9')); wf.position.set(x, 2.5, -3.19); sch.add(wf); const wb = new T.Mesh(new T.BoxGeometry(0.1, 1.6, 0.14), M('#fff1c9')); wb.position.set(x, 2.5, -3.12); sch.add(wb); }
      for (const [x, c] of [[-5.4, '#ff6f91'], [-3.9, '#ffd23f'], [4.6, '#5ab8ff']]) { const pot = new T.Mesh(new T.CylinderGeometry(0.3, 0.24, 0.45, 16), M('#c9703f')); pot.position.set(x, 0.22, -2.4); sch.add(pot); const fl = new T.Mesh(new T.SphereGeometry(0.34, 14, 10), M(c)); fl.position.set(x, 0.72, -2.4); sch.add(fl); }
      const sc = {};
      sc.chom = CK.neighbor(T, 2, CH); sc.chom.userData.base = 0.95; scene.add(sc.chom);
      sc.fueang = CK.neighbor(T, 1, FU); sc.fueang.userData.base = 1.05; scene.add(sc.fueang);
      sc.kru = CK.neighbor(T, 3, { scale: 1.35, lashes: true, top: '#4fc27a', bottom: '#ff7f9a' }); sc.kru.userData.base = 1.35; scene.add(sc.kru);
      sc.mom = CK.family(T, 'mom'); sc.mom.userData.base = sc.mom.scale.x; scene.add(sc.mom);
      sc.mama = CK.family(T, 'mama'); sc.mama.userData.base = sc.mama.scale.x; scene.add(sc.mama);
      const hearts = []; for (let i = 0; i < 10; i++) { const h = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M(i % 2 ? '#ff8fab' : '#ffd23f')); h.userData.s = [SX - 0.4 + Math.sin(i * 7.1) * 3.2, -1.2 + Math.cos(i * 3.3) * 0.6, (i * 0.37) % 1]; h.visible = false; scene.add(h); hearts.push(h); }
      return { key, hemi, fam, bag, peds, props, mini, ball, kid4, room2, st2, MT, sc, hearts };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc); s.room2.userData.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dn);
      const arms = (g, z1, x1, z2, x2) => { const a1 = g.userData.arm1, a2 = g.userData['arm-1']; if (z1 != null) { a1.rotation.z = z1; a1.rotation.x = x1; } if (z2 != null) { a2.rotation.z = z2; a2.rotation.x = x2; } };

      /* ---------- home ---------- */
      const F = s.fam, home = ['cover', 's1', 's2', 's7'].includes(bt), tips = bt === 's9';
      for (const k in F) F[k].visible = tips || (home && (k === 'mom' || k === 'mama'));
      s.bag.visible = home && bt !== 's7';
      if (home) {
        const mo = F.mom, ma = F.mama; let mex = 'worried', kex = 'cry', hop = 0, tum = true, reach = false;
        if (bt === 's1') { const q = SP('s1', 0.56); if (t < q) { const d = dayIdx(t); if (d >= 5) { kex = 'giggle'; tum = false; hop = Math.abs(Math.sin(t * 9)) * 0.4; mex = 'worried'; } } else { kex = 'worried'; } }
        if (bt === 's2') { kex = 'worried'; }
        if (bt === 's7') { const q = SP('s7', 0.5); mex = 'happy'; kex = t < at('s7') + 1.4 ? 'cry' : t < q ? 'worried' : 'happy'; tum = t < at('s7') + 1.4; reach = true; }
        mo.position.set(HM.mom[0], 0, HM.mom[1]); mo.rotation.set(0, 0.32, 0); mo.userData.setExpr(mex); mo.userData.tick(t, { breath: 0.3 });
        if (reach) arms(mo, 1.05 + 0.05 * Math.sin(t * 2.5), -0.8);
        ma.position.set(HM.mama[0], hop, HM.mama[1]); ma.rotation.set(0, -0.28, 0); ma.userData.setExpr(kex); ma.userData.tick(t, { breath: kex === 'cry' ? 0.6 : 0.4 });
        if (tum) arms(ma, 0.35 + 0.05 * Math.sin(t * 5), -0.9, -0.35 - 0.05 * Math.sin(t * 5), -0.9);
        else if (hop) arms(ma, 2.2 + 0.15 * Math.sin(t * 8), 0.6, -2.2 - 0.15 * Math.sin(t * 8), 0.6);
        ma.userData.head.rotation.z = kex === 'cry' ? 0.07 * Math.sin(t * 5) : 0;
      }
      if (tips) {
        for (const k in F) { const g = F[k], p = FAM[k]; g.position.set(p[0], Math.abs(Math.sin(t * 3 + p[0])) * (k === 'mama' ? 0.12 : 0.04), p[1]); g.rotation.set(0, 0.12 * Math.sin(t * 0.8 + p[0]), 0); g.userData.setExpr(k === 'mama' || k === 'nana' ? 'giggle' : 'happy'); g.userData.tick(t, { breath: 0.35, wave: k === 'mama' && ph('s9', t) > 0.8 }); g.userData.head.rotation.z = 0; }
      }

      /* ---------- four reasons ---------- */
      { const on = bt === 's3', ri = on ? r3Idx(t) : 0, tr = on ? U.clamp((t - R3(ri)) / 0.6) : 1, from = ri > 0 ? PX[ri - 1] : PX[0];
        const x = U.lerp(from, PX[ri], U.easeIO(tr)), hop = ri > 0 ? Math.sin(tr * PI) * 1.2 : 0;
        s.mini.position.set(x, 1.0 + hop + 0.04 * Math.abs(Math.sin(t * 5)), 0.1);
        s.mini.userData.setExpr(ri === 3 ? 'giggle' : ri === 2 ? 'cry' : 'worried'); s.mini.userData.tick(t, { breath: 0.45 });
        if (ri === 2 && tr >= 1) arms(s.mini, 2.1 + 0.1 * Math.sin(t * 6), 0.7, -2.1 - 0.1 * Math.sin(t * 6), 0.7);
        if (ri === 3 && tr >= 1) s.mini.position.y = 1.0 + 0.3 * Math.abs(Math.sin(t * 6));
        s.props.forEach((p, i) => { const shown = on && i <= ri, a = shown ? U.easeBack(U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.45)) : 0; p.visible = a > 0.01; p.scale.setScalar(Math.max(0.01, a) * (i === ri ? 1.45 + 0.08 * Math.sin(t * 5) : 1.0)); p.position.y = 5.2 + 0.12 * Math.sin(t * 2.4 + i); p.rotation.y = 0.25 * Math.sin(t * 1.5 + i); });
        s.peds.forEach((p, i) => { p.scale.y = i === ri && on ? 1 : 0.8; p.position.y = 0.5 * p.scale.y; }); }

      /* ---------- slope ---------- */
      { const u = ballU(t), r = U.lerp(0.4, 1.1, u), px = U.lerp(SA[0] + 0.3, SB[0] - 1.2, u), py = U.lerp(SA[1], SB[1], (px - SA[0]) / (SB[0] - SA[0]));
        s.ball.position.set(px + SN[0] * (r + 0.15), py + SN[1] * (r + 0.15) + 0.05 * Math.sin(t * 9), 0); s.ball.scale.setScalar(r); s.ball.rotation.z = -0.12 * Math.sin(t * 6);
        const k = s.kid4; k.position.set(124.45, 0, 0.3); k.rotation.y = -0.4; k.userData.setExpr(u > 0.55 ? 'cry' : u > 0.15 ? 'worried' : 'happy'); k.userData.tick(t, { breath: 0.5 });
        if (u > 0.55) arms(k, 2.1 + 0.1 * Math.sin(t * 7), 0.7, -2.1 - 0.1 * Math.sin(t * 7), 0.7); }

      /* ---------- night room ---------- */
      { const k = s.st2.kid; k.position.set(-61, s.MT - 0.163 * 1.05 + 0.02, -1.25); k.rotation.set(-0.04, 0, 0); k.userData.setExpr('worried'); k.userData.tick(t, { breath: 0.5 }); k.userData.head.rotation.z = 0.08 * Math.sin(t * 1.6);
        const m = s.st2.kmom; m.visible = inB('s6', t) && t > at('s6') + 0.7; m.position.set(-63.5, 0, 0.3); m.rotation.y = 0.35; m.userData.setExpr('worried'); m.userData.tick(t, {}); arms(m, 1.0 + 0.05 * Math.sin(t * 3), -0.6); }

      /* ---------- school ---------- */
      { const C = s.sc, s5 = bt === 's5', s8 = bt === 's8', s10 = bt === 's10';
        C.chom.visible = C.fueang.visible = s5; C.kru.visible = C.mom.visible = C.mama.visible = s8 || s10;
        if (s5) { const q = SP('s5', 0.5);
          C.chom.position.set(SX - 1.35, 0, 0.4); C.chom.rotation.y = 0.2; C.chom.userData.setExpr(t < q ? 'worried' : 'cry'); C.chom.userData.tick(t, { breath: 0.5 });
          C.fueang.position.set(SX + 1.35, 0, 0.2); C.fueang.rotation.y = -0.2; C.fueang.userData.setExpr('worried'); C.fueang.userData.tick(t, { breath: 0.4 }); C.fueang.userData.head.rotation.z = 0.06 * Math.sin(t * 1.8); }
        if (s8 || s10) {
          const p = s8 ? ph('s8', t) : 1, q = s8 ? SP('s8', 0.5) : 0, walk = s8 ? U.easeIO(U.clamp((t - at('s8') - 2.2) / 1.6)) : 1;
          C.kru.position.set(SX + 2.1, 0, -1.3); C.kru.rotation.y = -0.3; C.kru.userData.setExpr('happy'); C.kru.userData.tick(t, { breath: 0.3, wave: s8 && p < 0.25 });
          if (!(s8 && p < 0.25)) arms(C.kru, null, null, -0.95 - 0.05 * Math.sin(t * 2.5), -0.7);
          C.mom.position.set(SX - 2.75, 0, 0.3); C.mom.rotation.y = 0.35; C.mom.userData.setExpr(s8 && p < 0.2 ? 'worried' : 'happy'); C.mom.userData.tick(t, { breath: 0.3, wave: (s8 && walk > 0.9) || (s10 && ph('s10', t) < 0.7) });
          const mx = U.lerp(SX - 0.75, SX + 0.1, walk), hopY = s8 ? Math.abs(Math.sin(walk * PI * 4)) * 0.14 * (walk < 1 ? 1 : 0) : Math.abs(Math.sin(t * 5)) * 0.1;
          C.mama.position.set(mx, hopY, U.lerp(0.5, -0.2, walk)); C.mama.rotation.y = s10 ? 0 : U.lerp(-0.3, 0.45, walk) * (s8 && t > q + 1.2 ? 0.2 : 1);
          C.mama.userData.setExpr(s8 ? (p < 0.22 ? 'worried' : walk < 1 ? 'happy' : 'giggle') : 'giggle'); C.mama.userData.tick(t, { breath: 0.4, wave: s10 || (s8 && t > q + 1.2) });
        }
        s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s10') - 0.6 - u[2] * 1.4) / 3.2; h.visible = s10 && a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.6 + a * 4.0, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { fam: s.fam, mini: s.mini, kid4: s.kid4, st2: s.st2, sc: s.sc }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's3') return ['#b8ecdf', '#fff4e6']; if (b === 's4') return ['#ffd9e6', '#fff4e6']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's5' || b === 's8' || b === 's10') return ['#bfe3ff', '#fff1c9']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = lw || 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, sz) => { if (a <= 0) return; sz = sz || 40; g.save(); g.globalAlpha = Math.min(1, a); g.font = '700 ' + sz + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 54, lo = 30 + LD * 2.2, hi = 1050 - LD * 3; const bx = Math.max(lo + w / 2, Math.min(hi - w / 2, x)); rr(bx - w / 2, y - 40, w, 80, 40, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + 38); g.lineTo(x + 2, y + 68); g.lineTo(x + 18, y + 38); g.fillStyle = '#ffffff'; g.fill(); plain(str, bx, y + 2, sz, '#3a2f3f', 700, 'center'); g.restore(); };
      const face = (x, y, r, sad) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = sad ? '#ffe08a' : '#ffe08a'; g.fill(); g.fillStyle = '#3a2f3f'; for (const s2 of [-1, 1]) { g.beginPath(); g.arc(x + s2 * r * 0.36, y - r * 0.15, r * 0.11, 0, 7); g.fill(); } g.lineWidth = r * 0.14; g.lineCap = 'round'; g.strokeStyle = '#3a2f3f'; g.beginPath(); if (sad) g.arc(x, y + r * 0.62, r * 0.36, PI * 1.2, PI * 1.8); else g.arc(x, y + r * 0.1, r * 0.42, PI * 0.15, PI * 0.85); g.stroke(); if (sad) { g.fillStyle = '#5ab8ff'; g.beginPath(); g.arc(x + r * 0.55, y + r * 0.2, r * 0.13, 0, 7); g.fill(); } };
      if (b === 'cover') { const [x, y] = wp(S.fam.mama.userData.head, 1.15); bubble('ปวดท้อง ไม่ไป!', x + 10, y - 50, U.clamp((t - 0.15) / 0.2), 44); }
      /* s1 week strip */
      if (b === 's1') {
        const q = SP('s1', 0.56), d = t < q ? dayIdx(t) : 7, a0 = U.clamp((t - at('s1') - 0.3) / 0.3), cw = REEL ? 108 : 124, gap = 12, x0 = 540 - (7 * cw + 6 * gap) / 2 - (REEL ? 15 : 0), y0 = 470;
        g.save(); g.globalAlpha = a0;
        DAYS.forEach((dn, i) => { const x = x0 + i * (cw + gap), we = i >= 5, on = t < q ? i <= d : true, cur = i === d; rr(x, y0 - (cur ? 10 : 0), cw, 170, 26, on ? (we ? '#b8f0c8' : '#ffc2cf') : 'rgba(255,255,255,.75)', cur ? '#ff6f91' : '#ffffff', cur ? 7 : 4); plain(dn, x + cw / 2, y0 + 36 - (cur ? 10 : 0), 40, '#3a2f3f', 800, 'center'); if (on) face(x + cw / 2, y0 + 108 - (cur ? 10 : 0), 34, !we); });
        g.restore();
        if (t < q) { const [x, y] = wp(S.fam.mama.userData.head, 1.15); bubble(d >= 5 ? 'หายแล้ว ไปเล่น!' : 'ปวดท้องงง…', x + 10, y - 50, a0, 42); }
      }
      /* s2 three triggers */
      if (b === 's2') {
        const IT = ['ปิดเทอม', 'หยุดยาว', 'เพิ่งหายป่วย'], cw = REEL ? 262 : 296, gap = 22, x0 = 540 - (3 * cw + 2 * gap) / 2 - (REEL ? 15 : 0), y0 = 470;
        IT.forEach((s2, i) => { const a = U.clamp((t - TM('s2', i, 0.14 + i * 0.16)) / 0.3); if (a <= 0) return; const x = x0 + i * (cw + gap), cx = x + cw / 2, cy = y0 + 74; g.save(); g.globalAlpha = a; rr(x, y0, cw, 210, 30, 'rgba(255,255,255,.92)', ['#ffb648', '#5ab8ff', '#ff8fab'][i], 6);
          if (i === 0) { g.fillStyle = '#ffb300'; g.beginPath(); g.arc(cx, cy, 30, 0, 7); g.fill(); g.lineWidth = 8; g.lineCap = 'round'; g.strokeStyle = '#ffb300'; for (let k = 0; k < 8; k++) { const an = k / 8 * PI * 2; g.beginPath(); g.moveTo(cx + Math.cos(an) * 42, cy + Math.sin(an) * 42); g.lineTo(cx + Math.cos(an) * 54, cy + Math.sin(an) * 54); g.stroke(); } }
          if (i === 1) { rr(cx - 46, cy - 40, 92, 86, 12, '#ffffff', '#3f8fe8', 6); g.fillStyle = '#3f8fe8'; g.fillRect(cx - 46, cy - 40, 92, 24); g.fillStyle = '#ff5f86'; for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(cx - 26 + (k % 3) * 26, cy + 2 + Math.floor(k / 3) * 24, 8, 0, 7); g.fill(); } }
          if (i === 2) { g.lineCap = 'round'; g.lineWidth = 22; g.strokeStyle = '#ffffff'; g.beginPath(); g.moveTo(cx + 30, cy - 38); g.lineTo(cx - 18, cy + 18); g.stroke(); g.lineWidth = 4; g.strokeStyle = '#ff5f86'; g.stroke(); g.lineWidth = 12; g.strokeStyle = '#ff5f86'; g.beginPath(); g.moveTo(cx + 6, cy - 10); g.lineTo(cx - 18, cy + 18); g.stroke(); g.fillStyle = '#ff5f86'; g.beginPath(); g.arc(cx - 24, cy + 26, 20, 0, 7); g.fill(); }
          plain(s2, cx, y0 + 166, Math.round(40 * LF), '#3a2f3f', 700, 'center'); g.restore(); });
      }
      /* s3 numbers */
      if (b === 's3') { const ri = r3Idx(t); for (let i = 0; i <= ri; i++) { const a = U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.4); if (a <= 0) continue; const [x, y] = proj(new T.Vector3(60 + PX[i], 6.55, 0)); const r = (i === ri ? 40 : 30) * U.easeBack(a); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ['#7a5fe0', '#ff6f91', '#e8456e', '#3f8fe8'][i]; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); txt(String(i + 1), x, y + 2, (i === ri ? 46 : 34) * U.easeBack(a), '#ffffff', 800); } }
      /* s4 slope labels */
      if (b === 's4') {
        const u = ballU(t), LB = [['หยุด 1 วัน', 0.08], ['หยุดหลายวัน', 0.5], ['ยิ่งกลับยาก', 0.92]];
        LB.forEach(([l, f], i) => { const a = U.clamp((u - f + 0.1) / 0.08); if (a <= 0) return; const px = U.lerp(SA[0] + 0.3, SB[0] - 0.9, f), py = U.lerp(SA[1], SB[1], (px - SA[0]) / (SB[0] - SA[0])); const [x, y] = proj(new T.Vector3(px - 0.5, py - 0.75, 1.1)); g.save(); g.globalAlpha = a; g.font = '700 34px Kanit,sans-serif'; const w = g.measureText(l).width + 40; rr(x - w / 2, y - 28, w, 56, 28, 'rgba(255,255,255,.92)', '#7a5fe0'); plain(l, x, y + 2, 34, '#3a2f3f', 700, 'center'); g.restore(); });
        { const u2 = ballU(t), r = U.lerp(0.4, 1.1, u2), px = U.lerp(SA[0] + 0.3, SB[0] - 1.2, u2), py = U.lerp(SA[1], SB[1], (px - SA[0]) / (SB[0] - SA[0])); const [x, y] = proj(new T.Vector3(px + SN[0] * (r + 0.15), py + SN[1] * (r + 0.15) + r + 0.45, 0)); g.save(); g.globalAlpha = U.clamp((t - at('s4') - 0.5) / 0.3); txt('ความกลัว', x, y, 40 + 14 * u2, '#ffffff', 800); g.restore(); }
      }
      /* s5 grid + labels */
      if (b === 's5') {
        const q = SP('s5', 0.5), a0 = U.clamp((t - at('s5') - 0.4) / 0.3) * U.clamp((q - t) / 0.25 + 0.0);
        if (t < q && a0 > 0) { const cols = 20, sp = REEL ? 40 : 46, x0 = 540 - (cols - 1) * sp / 2 - (REEL ? 15 : 0), y0 = 480, lit = Math.round(5 * U.easeOut(U.clamp((t - at('s5') - 0.9) / 1.2)));
          g.save(); g.globalAlpha = a0; for (let i = 0; i < 100; i++) { const cx = x0 + (i % cols) * sp, cy = y0 + Math.floor(i / cols) * sp, on = i < lit; g.beginPath(); g.arc(cx, cy, on ? 17 : 13, 0, 7); g.fillStyle = on ? '#ff5f86' : 'rgba(255,255,255,.9)'; g.fill(); if (on) { g.lineWidth = 4; g.strokeStyle = '#ffffff'; g.stroke(); } } plain('เด็กวัยเรียน 100 คน', 540 - (REEL ? 15 : 0), y0 + 5 * sp + 14, 32, '#5a3550', 700, 'center'); g.restore(); }
        const a1 = U.clamp((t - q - 0.2) / 0.3); if (a1 > 0) { g.save(); g.globalAlpha = a1; let [x, y] = wp(S.sc.chom.userData.head, 1.25); rr(x - 150, y - 110, 300, 96, 30, 'rgba(255,255,255,.92)', '#b48cff'); plain('ชมพู่ 6 ขวบ', x, y - 80, 36, '#3a2f3f', 800, 'center'); plain('เพิ่งขึ้น ป.1', x, y - 40, 30, '#5a3550', 600, 'center'); [x, y] = wp(S.sc.fueang.userData.head, 1.3); rr(x - 150, y - 110, 300, 96, 30, 'rgba(255,255,255,.92)', '#9ccf3a'); plain('มะเฟือง 11 ขวบ', x, y - 80, 36, '#3a2f3f', 800, 'center'); plain('ใกล้ขึ้น ม.1', x, y - 40, 30, '#5a3550', 600, 'center'); g.restore(); }
      }
      /* s6 doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 470, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['ไม่ยอมไปติดกันหลายวัน ปลอบแล้วไม่ดีขึ้น', 'ร้องไห้ ตื่นกลัวรุนแรง แทบทุกเช้า', 'เศร้า เก็บตัว กินนอนเปลี่ยนไป', 'สงสัยว่าโดนแกล้ง หรือกลัวใครเป็นพิเศษ', 'ปวดท้อง ปวดหัวบ่อย แม้ในวันหยุด'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 390 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(40 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AACAP, Merck Manual · สายด่วนสุขภาพจิต 1323', 540, 768, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
        if (S.st2.kid.visible) { const [x, y] = wp(S.st2.kid.userData.head, 0.95); g.save(); g.globalAlpha = a0; txt('มะเฟือง 11 ขวบ', x + 165, y + 30, 36, '#ffffff', 700); g.restore(); }
      }
      /* s7 bubbles */
      if (b === 's7') { const q = SP('s7', 0.5); let [x, y] = wp(S.fam.mom.userData.head, 1.5); bubble('กังวลเรื่องอะไรลูก?', x + 40, y - 40, U.clamp((t - at('s7') - 0.7) / 0.3) * U.clamp((q - t) / 0.3), 40); [x, y] = wp(S.fam.mama.userData.head, 1.15); bubble('กลัวครูดุ…', x + 20, y - 50, U.clamp((t - at('s7') - 2.0) / 0.3) * U.clamp((q - t) / 0.3), 40); bubble('ไปก็ได้…', x + 20, y - 50, U.clamp((t - q - 1.2) / 0.3) * U.clamp((end('s7') - 0.3 - t) / 0.3), 40); }
      /* s8 bubbles + steps */
      if (b === 's8') { const q = SP('s8', 0.5); let [x, y] = wp(S.sc.kru.userData.head, 1.55); bubble('มามะ มาช่วยครูหน่อย', x - 90, y - 40, U.clamp((t - at('s8') - 0.8) / 0.3) * U.clamp((q - t) / 0.3), 38); [x, y] = wp(S.sc.kru.userData.head, 0.2); g.save(); g.globalAlpha = U.clamp((t - at('s8') - 0.5) / 0.3); txt('ครูแตงโม', x, y + 250, 34, '#ffffff', 700); g.restore();
        const a = U.clamp((t - q - 0.2) / 0.3); if (a > 0) { const IT = ['ครึ่งวัน', 'เต็มวัน'], y0 = 500, cx = 540 - (REEL ? 15 : 0); g.save(); g.globalAlpha = a; rr(cx - 330, y0, 280, 90, 45, 'rgba(255,255,255,.92)', '#ffb648', 6); plain(IT[0], cx - 190, y0 + 47, 42, '#3a2f3f', 700, 'center'); const a2 = U.clamp((t - q - 1.0) / 0.3); g.globalAlpha = a * a2; g.lineWidth = 12; g.lineCap = 'round'; g.strokeStyle = '#ff6f91'; g.beginPath(); g.moveTo(cx - 30, y0 + 45); g.lineTo(cx + 26, y0 + 45); g.moveTo(cx + 8, y0 + 27); g.lineTo(cx + 28, y0 + 45); g.lineTo(cx + 8, y0 + 63); g.stroke(); rr(cx + 50, y0, 280, 90, 45, 'rgba(255,255,255,.92)', '#2fbf71', 6); plain(IT[1], cx + 190, y0 + 47, 42, '#3a2f3f', 700, 'center'); g.restore(); } }
      /* s9 tips */
      if (b === 's9') {
        const p = ph('s9', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, REEL ? 398 : 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['หลังหยุดยาว รีบกลับกิจวัตรวันเรียน', 'อยู่บ้านวันเรียน งดจอ งดของเล่นพิเศษ', 'บอกลาสั้นๆ แบบเดิมทุกวัน', 'คุยกับครูสม่ำเสมอ หาเพื่อนคู่หูให้ลูก', 'ไปได้ ชมทันที ที่ความพยายาม'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s9', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s9', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + i * (REEL ? 72 : 84) - (REEL ? 8 : 0); g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - (REEL ? 32 : 36), 912 - 2 * LD, REEL ? 64 : 72, 32, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(39 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
      if (b === 's10') { const [x, y] = wp(S.sc.mama.userData.head, 1.15); bubble('บ๊ายบายแม่!', x + 10, y - 50, U.clamp((t - at('s10') - 0.6) / 0.3) * U.clamp((end('s10') - 0.4 - t) / 0.3), 42); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[80, ['ลูกไม่อยากไปโรงเรียน', '#fff']], [84, ['จัดการยังไง?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.56), y: 290, lines: [[60, ['วันเรียน ปวดท้อง ปวดหัว', '#fff']], [56, ['พอวันหยุด หายเฉย?', '#ffd35e']]] },
      { t0: SP('s1', 0.56) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[60, ['ลูกปวดจริง ไม่ได้แกล้ง', '#ffd35e']], [46, ['ความกังวล ทำให้ร่างกายปวดได้', '#fff', 600]]], foot: 'ที่มา: Harvard Health Publishing 2018' },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 290, lines: [[60, ['มักเริ่มหลังได้อยู่บ้านนานๆ', '#fff']], [46, ['ช่วงที่ลูกใกล้ชิดพ่อแม่มากขึ้น', '#ffe3ea', 600]]], foot: 'ที่มา: AACAP Facts for Families No. 7 (2018)' },
      { t0: at('s3') + 0.2, t1: R3(1), y: 290, lines: [[50, ['ทำไมไม่อยากไป? 4 เหตุผล', '#fff', 600]], [58, ['① กลัวบางอย่างที่โรงเรียน', '#ffd35e']], [44, ['ครูดุ เสียงดัง ห้องน้ำ รถโรงเรียน', '#fff', 600]]] },
      { t0: R3(1) + 0.02, t1: R3(2), y: 290, lines: [[58, ['② หนีเรื่องเพื่อน หรือการสอบ', '#ffd35e']], [44, ['โดนแกล้ง พูดหน้าห้อง กลัวทำผิด', '#fff', 600]]] },
      { t0: R3(2) + 0.02, t1: R3(3), y: 290, lines: [[58, ['③ อยากอยู่กับพ่อแม่', '#ffd35e']], [44, ['แยกจากแล้วใจไม่ดี พบบ่อยในเด็กเล็ก', '#fff', 600]]] },
      { t0: R3(3) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[58, ['④ อยู่บ้านสนุกกว่า', '#ffd35e']], [44, ['ตื่นสาย ดูจอ ของเล่นเต็มบ้าน', '#fff', 600]]], foot: 'ที่มา: Kearney & Silverman (School Refusal Assessment Scale)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.48), y: 290, lines: [[60, ['หยุดวันนี้ โล่งทันที', '#fff']], [50, ['แต่ความกลัวไม่ได้หายไปไหน', '#ffd35e']]] },
      { t0: SP('s4', 0.48) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[58, ['ยิ่งหยุดนาน ยิ่งกลับยาก', '#ffd35e']], [44, ['เรียนไม่ทัน ห่างเพื่อน กลัวกว่าเดิม', '#fff', 600]]], foot: 'ที่มา: Harvard Health Publishing 2018' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[56, ['ถึงขั้น "ไม่ยอมไปโรงเรียน"', '#fff']], [62, ['ราว 1–5 คน ใน 100 คน', '#ffd35e']]], foot: 'ที่มา: Fremont, American Family Physician 2003' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[56, ['พบบ่อยช่วง ', '#fff'], ['5–6', '#ffd35e'], [' และ ', '#fff'], ['10–11 ขวบ', '#ffd35e']], [46, ['ช่วงเปลี่ยนชั้น เปลี่ยนโรงเรียน', '#fff', 600]]], foot: 'ที่มา: Fremont, American Family Physician 2003' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.5), y: 290, lines: [[60, ['① ฟังก่อน ไม่ดุ ไม่ขู่', '#ffd35e']], [46, ['ถามว่ากังวลเรื่องอะไร แล้วรับฟัง', '#fff', 600]]] },
      { t0: SP('s7', 0.5) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[54, ['เข้าใจความรู้สึก แต่ยืนยันว่า', '#fff']], [58, ['"ยังไงก็ต้องไปโรงเรียน"', '#ffd35e']], [40, ['ปวดบ่อย ให้แพทย์ตรวจร่างกายก่อน', '#ffe3ea', 600]]], foot: 'ที่มา: Harvard Health, AACAP' },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[58, ['② กลับไปให้เร็ว จับมือกับครู', '#ffd35e']], [44, ['ให้ครูที่ลูกไว้ใจ รอรับที่ประตู', '#fff', 600]]] },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[58, ['หยุดไปนาน? กลับทีละขั้น', '#fff']], [44, ['วางแผนกับครู เริ่มจากวันสั้นๆ ก่อน', '#ffe3ea', 600]]], foot: 'ที่มา: AACAP Facts for Families No. 7' },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[58, ['5 ทิป เช้าวันเรียนไม่วุ่น', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[60, ['ลูกไม่ได้ดื้อ ลูกกำลังกลัว', '#fff']], [54, ['ฟัง แล้วพากลับไปทีละก้าว', '#ffd35e']], [38, ['ลูกคุณงอแงไม่ไปโรงเรียน วันไหนบ่อยสุด? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AACAP, Harvard Health, Am Fam Physician 2003, Kearney' },
    ],
    trans,
    audio: [
      [0.4, 'boing'], [1.2, 'thud'],
      ...[0, 1, 2, 3, 4, 5, 6].map((i) => [at('s1') + 0.5 + i * (SP('s1', 0.56) - at('s1') - 0.7) / 7, i >= 5 ? 'ding' : 'tick']), [SP('s1', 0.56) - 0.6, 'giggle'], [SP('s1', 0.56), 'pop'], [SP('s1', 0.56) + 0.5, 'shimmer'],
      [at('s2') + 0.4, 'whoosh'], [TM('s2', 0, 0.14), 'pop'], [TM('s2', 1, 0.3), 'pop'], [TM('s2', 2, 0.46), 'pop'], [P('s2', 0.75), 'twinkle'],
      [at('s3') + 0.4, 'warn'], [R3(1), 'boing'], [R3(1) + 0.5, 'pop'], [R3(2), 'boing'], [R3(2) + 0.5, 'heart'], [R3(3), 'boing'], [R3(3) + 0.5, 'giggle'],
      [at('s4') + 0.5, 'pop'], [at('s4') + 0.8, 'riser'], [SP('s4', 0.48), 'warn'], [P('s4', 0.85), 'thud'],
      [at('s5') + 0.5, 'whoosh'], [at('s5') + 1.0, 'tick'], [at('s5') + 1.3, 'tick'], [at('s5') + 1.6, 'tick'], [at('s5') + 1.9, 'tick'], [at('s5') + 2.2, 'ding'], [SP('s5', 0.5) + 0.2, 'pop'], [SP('s5', 0.5) + 0.5, 'pop'],
      [at('s6') + 0.3, 'heartbeat'], ...[0, 1, 2, 3, 4].map((i) => [TM('s6', i, 0.1 + i * 0.1), 'tick']), [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.4, 'shimmer'], [at('s7') + 0.7, 'pop'], [at('s7') + 2.0, 'pop'], [SP('s7', 0.5), 'ding'], [SP('s7', 0.5) + 1.2, 'pop'],
      [at('s8') + 0.4, 'twinkle'], [at('s8') + 0.8, 'pop'], [at('s8') + 2.3, 'boing'], [at('s8') + 3.0, 'boing'], [SP('s8', 0.5) + 0.2, 'pop'], [SP('s8', 0.5) + 1.0, 'ding'], [P('s8', 0.85), 'giggle'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [at('s10') + 0.7, 'giggle'], [at('s10') + 1.4, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
