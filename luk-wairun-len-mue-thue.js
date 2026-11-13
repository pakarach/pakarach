/* พ่อแม่หัวจะปวด — ลูกวัยรุ่นเล่นมือถือถึงตีสอง เช้าตื่นไม่ไหว (ตี 2 → 6:30 = 4.5 ชม. → ต้องนอน 8–10 ชม. AASM → 3 ตัวขโมยการนอน → JAMA Pediatrics 2026: หลับช้า ~1 ชม. นอนน้อยลง ~20 นาที ตื่นกลางดึก → แบตร่างกายพร่อง + วัยรุ่นไทย 69% APST 2022 → พบแพทย์ถ้า (night) → ไม่ขู่ยึด คุยตกลง ชาร์จนอกห้อง → พ่อก็เล่น! พ่อแม่วางก่อน → 5 ทิป → มือถือนอนก่อนลูก)
   Build: node build.js luk-wairun-len-mue-thue.js review-luk-wairun-len-mue-thue.html --kit clay --title "ลูกวัยรุ่นเล่นมือถือถึงตีสอง เช้าตื่นไม่ไหว" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.4], ['s1', 8], ['s2', 6.5], ['s3', 10.5], ['s4', 10.5], ['s5', 8.5], ['s6', 8], ['s7', 8.5], ['s8', 7.5], ['s9', 8.5], ['s10', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const SP2 = (id, frac) => SPL[id + 'b'] != null ? at(id) + B.lead + 0.06 + SPL[id + 'b'] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } });
  const tiled = (base, dot, rx, ry) => { const tx = dots(base, dot); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rx, ry); return tx; };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  /* s1 night -> morning */
  const NF0 = () => P('s1', 0.4), NF1 = () => P('s1', 0.47);
  const nightF = (t) => t < at('s1') ? 1 : inB('s1', t) ? 1 - U.clamp((t - NF0()) / (NF1() - NF0())) : 0;
  const clockMin = (t) => { const a = P('s1', 0.08), b = NF0(); return 120 + 270 * U.easeIO(U.clamp((t - a) / (b - a))); };
  const hhmm = (m) => { m = Math.round(m / 5) * 5; const h = Math.floor(m / 60), mm = m % 60; return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };
  /* s3 three thieves */
  const PX = [-2.7, 0, 2.7], PC = ['#ff8f6b', '#9b7bff', '#4fb2f5'];
  const R3 = (i) => i === 0 ? at('s3') : TM('s3', i, [0, 0.36, 0.68][i]);
  const r3Idx = (t) => { let k = 0; for (let i = 1; i < 3; i++) if (t >= R3(i)) k = i; return k; };
  /* s4 sleep blocks (hours after 21:00 -> x) */
  const XH = (h) => -4.95 + h * 0.9, RA = 3.0, RB = 1.55;
  const A0 = XH(2.5), A1 = XH(10), B0 = XH(2.5 + 65 / 60), B1 = XH(10.75);
  const S4a = () => SP('s4', 0.34), S4b = () => SP2('s4', 0.7), S4c = () => MK.s4 ? at('s4') + B.lead + 0.06 + MK.s4[0] - 0.12 : S4a() + 1.2;
  /* blocking */
  const TEEN = { scale: 1.12, lashes: true, top: '#8fd16a', bottom: '#6a6fd8', hair: '#3a2a22' };
  const TMOM = { scale: 1.3, lashes: true, top: '#5fb3ff', bottom: '#7a5a9a', hair: '#2b2b33' };
  const BEDX = -0.9, MT = 0.75, LX = 180, PRX = -60, CX = -120;
  const FAM = { mom: [-1.9, -0.7], dad: [1.95, -0.7], nana: [-1.6, 1.4], mama: [0, 1.4], wawa: [1.45, 1.4] };
  const DOCK = [LX - 2.55, 1.32, -2.35];

  const HT = REEL ? 3.3 : 4.1;
  const SH = {
    cover: [FW(-0.4, -0.6, 6.6, HT, 0.2), FW(-0.4, -0.6, 6.3, HT, 0.2)],
    s1: [FW(-0.3, -0.6, 6.8, HT, 0.2), FW(-0.3, -0.6, 6.5, HT, 0.2)],
    s2: [FW(-0.3, -0.6, 6.9, REEL ? 3.0 : 3.7, 0.2), FW(-0.3, -0.6, 6.6, REEL ? 3.0 : 3.7, 0.2)],
    s3: REEL ? [FW(60, 0, 9.6, 5.6, 0.08), FW(60, 0, 9.3, 5.6, 0.08)] : [FW(60, 0, 9.4, 6.9, 0.08), FW(60, 0, 9.1, 6.9, 0.08)],
    s4: REEL ? [FW(120, 0, 12.4, 3.6, 0.1), FW(120, 0, 12.1, 3.6, 0.1)] : [FW(120, 0, 11.6, 4.2, 0.1), FW(120, 0, 11.3, 4.2, 0.1)],
    s5: [FW(CX, 0, 6.2, REEL ? 2.6 : 3.2, 0.16), FW(CX, 0, 5.9, REEL ? 2.6 : 3.2, 0.16)],
    s6: [FW(-0.3, -0.6, 6.7, 4.1, 0.22), FW(-0.3, -0.6, 6.4, 4.1, 0.22)],
    s7: [FW(LX - 0.6, 0, 7.2, HT), FW(LX - 0.6, 0, 6.9, HT)],
    s8: [FW(PRX + 0.3, -0.6, 7.0, HT, 0.2), FW(PRX + 0.3, -0.6, 6.7, HT, 0.2)],
    s9: [FW(LX, 0.3, 7.6, REEL ? 3.1 : 4.0, 0.14), FW(LX, 0.3, 7.3, REEL ? 3.1 : 4.0, 0.14)],
    s10: [FW(-0.3, -0.6, 6.8, HT, 0.2), FW(-0.3, -0.6, 6.4, HT, 0.2)],
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
    DUR, file: 'luk-wairun-len-mue-thue', title: 'ลูกวัยรุ่นเล่นมือถือถึงตีสอง เช้าตื่นไม่ไหว', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกวัยรุ่นกับมือถือ', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const phoneMesh = (k) => { const p = new T.Group(); const cs = new T.Mesh(new T.BoxGeometry(0.36, 0.64, 0.07), M('#ff6f91')); p.add(cs); const sc = new T.Mesh(new T.BoxGeometry(0.3, 0.56, 0.02), M('#bff0ff', { emissive: '#7fe0ff', emissiveIntensity: 0.9 })); sc.position.z = -0.04; p.add(sc); const cam = new T.Mesh(new T.SphereGeometry(0.045, 10, 8), M('#ffffff')); cam.position.set(-0.08, 0.2, 0.045); p.add(cam); const ht = new T.Mesh(new T.SphereGeometry(0.06, 10, 8), M('#ffd23f')); ht.position.set(0.04, -0.06, 0.045); p.add(ht); p.scale.setScalar(k || 1); return p; };
      const bed = (parent, x, w, blanket, head) => { const b = new T.Group(); b.position.x = x; parent.add(b); const f = new T.Mesh(new T.BoxGeometry(w + 0.2, 0.36, 4.2), M('#e9b27c')); f.position.set(0, 0.18, -0.6); b.add(f); const m = new T.Mesh(new T.BoxGeometry(w, 0.4, 4.0), M('#ffd0dc')); m.position.set(0, MT - 0.2, -0.6); b.add(m); const hb = new T.Mesh(new T.BoxGeometry(w + 0.2, 1.6, 0.3), M(head)); hb.position.set(0, 1.0, -2.75); b.add(hb); const bl = new T.Mesh(new T.BoxGeometry(w - 0.1, 0.55, 2.4), M('#ffffff', { map: dots(blanket[0], blanket[1]) })); bl.position.set(0, MT + 0.27, 0.15); b.add(bl); return b; };

      /* ===== stage 0: teen bedroom (x = 0) ===== */
      const NT = nightTex();
      const room = CK.room(T, { wall: '#bcd6ff', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e2a877', rug: '#ffd166', props: false, winX: 2.5 }); scene.add(room);
      const DAYT = room.userData.win.material.map;
      bed(scene, BEDX, 2.9, ['#58b06a', '#d8f5c8'], '#ffb3c6');
      const ns = new T.Mesh(new T.BoxGeometry(0.95, 0.85, 0.8), M('#c98a5a')); ns.position.set(-3.05, 0.42, -1.7); scene.add(ns);
      const alarm = new T.Group(); { const rim = new T.Mesh(new T.CylinderGeometry(0.34, 0.34, 0.16, 28), M('#ff5f86')); rim.rotation.x = PI / 2; alarm.add(rim); const fc = new T.Mesh(new T.CylinderGeometry(0.28, 0.28, 0.02, 28), M('#ffffff')); fc.rotation.x = PI / 2; fc.position.z = 0.085; alarm.add(fc); for (const s of [-1, 1]) { const bl = new T.Mesh(new T.SphereGeometry(0.13, 14, 10, 0, 2 * PI, 0, PI / 2), M('#ffd23f')); bl.position.set(s * 0.22, 0.3, 0); bl.rotation.z = -s * 0.5; alarm.add(bl); const lg = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.14, 8), M('#ff5f86')); lg.position.set(s * 0.2, -0.36, 0); alarm.add(lg); } const h1 = new T.Mesh(new T.BoxGeometry(0.03, 0.18, 0.02), M('#3a2f3f')); h1.position.set(0, 0.08, 0.1); alarm.add(h1); const h2 = new T.Mesh(new T.BoxGeometry(0.13, 0.03, 0.02), M('#3a2f3f')); h2.position.set(0.06, 0, 0.1); alarm.add(h2); }
      alarm.position.set(-3.05, 1.27, -1.55); alarm.scale.setScalar(1.15); scene.add(alarm);
      const teen = CK.neighbor(T, 0, TEEN); teen.userData.base = 1.12; scene.add(teen);
      const tmom = CK.neighbor(T, 3, TMOM); tmom.userData.base = 1.3; scene.add(tmom);
      const phone = phoneMesh(1.25); scene.add(phone);
      const glow = new T.PointLight('#8fd8ff', 0, 3.2, 1.6); scene.add(glow);
      const zzz = []; for (let i = 0; i < 3; i++) { zzz.push(i); }

      /* ===== stage 1: three thieves (x = 60) ===== */
      const mech = new T.Group(); mech.position.x = 60; scene.add(mech);
      const fl1 = new T.Mesh(new T.BoxGeometry(26, 0.3, 30), M('#9d8ff0')); fl1.position.set(0, -0.15, 0); mech.add(fl1);
      const bw1 = new T.Mesh(new T.BoxGeometry(26, 13, 0.3), M('#ffffff', { map: tiled('#e2dbff', '#ffffff', 9, 4.5) })); bw1.position.set(0, 6, -3.2); mech.add(bw1);
      const peds = PX.map((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(0.95, 1.05, 1.0, 36), M(PC[i])); p.position.set(x, 0.5, 0); mech.add(p); return p; });
      const props = [];
      { /* 1 bitten clock */ const c = new T.Group(); const face = new T.Mesh(new T.CylinderGeometry(0.85, 0.85, 0.22, 36, 1, false, 0.5, 2 * PI - 1.0), M('#ffffff')); face.rotation.x = PI / 2; c.add(face); const rim = new T.Mesh(new T.TorusGeometry(0.85, 0.08, 10, 36, 2 * PI - 1.0), M('#ff8f6b')); rim.rotation.z = PI / 2 + 0.5 - PI / 2; c.add(rim);
        for (let k = 0; k < 12; k++) { const a = k / 12 * 2 * PI; if (Math.abs(((a - PI / 2 + 0.5 + 2 * PI) % (2 * PI))) < 0) continue; const d = new T.Mesh(new T.SphereGeometry(0.05, 8, 6), M('#3a2f3f')); d.position.set(Math.cos(a) * 0.66, Math.sin(a) * 0.66, 0.13); c.add(d); }
        const h1 = new T.Mesh(new T.BoxGeometry(0.07, 0.5, 0.04), M('#3a2f3f')); h1.position.set(0, 0.22, 0.14); c.add(h1); const h2 = new T.Mesh(new T.BoxGeometry(0.38, 0.07, 0.04), M('#ff5f86')); h2.position.set(-0.17, 0, 0.14); c.add(h2); c.rotation.z = -0.9; props.push(c); }
      { /* 2 notification bell + badge */ const b = new T.Group(); const pts = []; for (let k = 0; k <= 10; k++) { const u = k / 10; pts.push(new T.Vector2(0.12 + 0.62 * Math.pow(u, 1.6), 0.85 - u * 1.25)); } const bell = new T.Mesh(new T.LatheGeometry(pts, 28), M('#ffd23f', { side: T.DoubleSide })); b.add(bell); const top = new T.Mesh(new T.SphereGeometry(0.16, 12, 10), M('#ffd23f')); top.position.y = 0.9; b.add(top); const cl = new T.Mesh(new T.SphereGeometry(0.15, 12, 10), M('#ff9e3d')); cl.position.y = -0.48; b.add(cl); const bd = new T.Mesh(new T.SphereGeometry(0.28, 16, 12), M('#ff3b5c')); bd.position.set(0.6, 0.62, 0.15); b.add(bd); b.userData.bell = bell; props.push(b); }
      { /* 3 phone beaming light */ const p = new T.Group(); const ph0 = phoneMesh(2.2); ph0.rotation.y = PI; p.add(ph0); const rm = M('#bff0ff', { emissive: '#7fe0ff', emissiveIntensity: 0.6, transparent: true, opacity: 0.75 }); for (let k = 0; k < 5; k++) { const r = new T.Mesh(new T.BoxGeometry(0.09, 0.62, 0.05), rm); const a = (k - 2) * 0.42; r.position.set(Math.sin(a) * 1.0, 0.25 + Math.cos(a) * 0.95, 0.1); r.rotation.z = -a; p.add(r); } props.push(p); }
      props.forEach((p, i) => { p.position.set(PX[i], 5.1, 0); mech.add(p); });
      const mini = CK.neighbor(T, 0, Object.assign({}, TEEN, { scale: 0.92 })); mini.userData.base = 0.92; mech.add(mini);

      /* ===== stage 2: sleep blocks (x = 120) ===== */
      const tl = new T.Group(); tl.position.x = 120; scene.add(tl);
      const fl2 = new T.Mesh(new T.BoxGeometry(30, 0.3, 44), M('#4a6cc0')); fl2.position.set(0, -0.15, 14); tl.add(fl2);
      const bw2 = new T.Mesh(new T.BoxGeometry(30, 14, 0.3), M('#ffffff', { map: tiled('#d4ecff', '#ffffff', 10, 4.5) })); bw2.position.set(0, 6.5, -2.4); tl.add(bw2);
      const blk = (x0, x1, y, c) => { const m = new T.Mesh(new T.BoxGeometry(1, 0.72, 0.7), M(c)); m.position.set((x0 + x1) / 2, y, 0); m.scale.x = x1 - x0; tl.add(m); return m; };
      const bA = blk(A0, A1, RA, '#9b8cff'), bB = blk(B0, B1, RB, '#ff8fab');
      const shA = blk(XH(0), XH(11), RA, '#ffffff'); shA.scale.y = 0.18; shA.position.y = RA - 0.45; shA.material = M('#ffffff', { transparent: true, opacity: 0.6 });
      const shB = blk(XH(0), XH(11), RB, '#ffffff'); shB.scale.y = 0.18; shB.position.y = RB - 0.45; shB.material = shA.material;
      const pole = new T.Mesh(new T.BoxGeometry(0.08, 3.6, 0.08), M('#ff5f86')); pole.position.set(XH(1), 1.9, 0.45); tl.add(pole);
      const moonA = new T.Mesh(new T.SphereGeometry(0.22, 14, 10), M('#ffe066')); tl.add(moonA); const moonB = moonA.clone(); tl.add(moonB);
      const ph4 = phoneMesh(1.2); tl.add(ph4); const ph4l = new T.PointLight('#8fd8ff', 0, 2.5, 1.5); tl.add(ph4l);
      const watch = new T.Group(); { const sm = M('#9b7bff'); for (const s2 of [-1, 1]) { const st = new T.Mesh(new T.BoxGeometry(0.62, 0.9, 0.16), sm); st.position.set(0, s2 * 0.82, -0.05); watch.add(st); } const cs = new T.Mesh(new T.BoxGeometry(1.0, 1.0, 0.3), M('#3a3550')); watch.add(cs); const sc = new T.Mesh(new T.BoxGeometry(0.82, 0.82, 0.04), M('#2a2f6a', { emissive: '#3f4fd0', emissiveIntensity: 0.5 })); sc.position.z = 0.16; watch.add(sc); const mn = new T.Mesh(new T.SphereGeometry(0.2, 14, 10), M('#ffe066', { emissive: '#ffd040', emissiveIntensity: 0.5 })); mn.position.set(-0.05, 0.08, 0.2); mn.scale.z = 0.3; watch.add(mn); for (let k = 0; k < 4; k++) { const b = new T.Mesh(new T.BoxGeometry(0.1, 0.12 + k * 0.06, 0.03), M('#7fe0ff', { emissive: '#7fe0ff', emissiveIntensity: 0.6 })); b.position.set(-0.22 + k * 0.15, -0.25 + k * 0.03, 0.19); watch.add(b); } }
      watch.position.set(0, 1.0, 17); watch.scale.setScalar(1.05); tl.add(watch);
      const notch = []; for (let k = 0; k < 3; k++) { const n = new T.Mesh(new T.BoxGeometry(0.12, 0.8, 0.76), M('#ff3b5c')); n.position.set(B0 + 0.12 + k * 0.15, RB, 0); n.visible = false; tl.add(n); notch.push(n); }

      /* ===== stage 3: classroom (x = -120) ===== */
      const cls = new T.Group(); cls.position.x = CX; scene.add(cls);
      const fl3 = new T.Mesh(new T.BoxGeometry(26, 0.3, 18), M('#d99b62')); fl3.position.set(0, -0.15, 2); cls.add(fl3);
      const wl3 = new T.Mesh(new T.BoxGeometry(26, 12, 0.4), M('#ffe7a8')); wl3.position.set(0, 6, -3.4); cls.add(wl3);
      const brd = new T.Mesh(new T.BoxGeometry(5.6, 2.4, 0.16), M('#3f8a62')); brd.position.set(0.4, 2.9, -3.15); cls.add(brd); const bfr = new T.Mesh(new T.BoxGeometry(5.9, 2.7, 0.1), M('#c98a5a')); bfr.position.set(0.4, 2.9, -3.2); cls.add(bfr);
      for (const x of [-1.6, -0.1, 1.4]) { const ln = new T.Mesh(new T.BoxGeometry(1.0, 0.09, 0.04), M('#e8fff0')); ln.position.set(x, 3.3, -3.05); cls.add(ln); const ln2 = ln.clone(); ln2.position.y = 2.75; ln2.scale.x = 0.7; cls.add(ln2); }
      const desk = new T.Group(); { const tp = new T.Mesh(new T.BoxGeometry(2.0, 0.14, 1.1), M('#f2b36e')); tp.position.y = 1.02; desk.add(tp); const fr = new T.Mesh(new T.BoxGeometry(1.9, 0.75, 0.08), M('#d98c4a')); fr.position.set(0, 0.6, 0.5); desk.add(fr); for (const s of [-1, 1]) { const lg = new T.Mesh(new T.BoxGeometry(0.1, 1.0, 0.1), M('#7a5a40')); lg.position.set(s * 0.88, 0.5, 0.45); desk.add(lg); } const bk = new T.Mesh(new T.BoxGeometry(0.8, 0.07, 0.56), M('#5ab8ff')); bk.position.set(0.35, 1.13, 0.12); bk.rotation.y = 0.2; desk.add(bk); }
      desk.position.set(0, 0, 0.55); cls.add(desk);
      const cteen = CK.neighbor(T, 0, TEEN); cteen.userData.base = 1.12; scene.add(cteen);

      /* ===== stage 4: parents' bedroom (x = -60) ===== */
      const room4 = CK.room(T, { wall: '#ffd3a8', dots: 'rgba(255,255,255,0.8)', wain: '#9b8cff', floor: '#e2a877', rug: '#7fcfe0', props: false, winX: 2.7 }); room4.position.x = PRX; scene.add(room4); room4.userData.win.material.map = NT;
      bed(scene, PRX - 0.9, 3.0, ['#ff9e6e', '#ffe2cf'], '#9fd3ff');
      const lamp = new T.Group(); { const st = new T.Mesh(new T.BoxGeometry(0.9, 0.8, 0.8), M('#c98a5a')); st.position.y = 0.4; lamp.add(st); const sh = new T.Mesh(new T.ConeGeometry(0.34, 0.42, 20, 1, true), M('#ffe08a', { emissive: '#ffd060', emissiveIntensity: 0.6, side: T.DoubleSide })); sh.position.y = 1.35; lamp.add(sh); const pl = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.4, 8), M('#ffffff')); pl.position.y = 1.0; lamp.add(pl); } lamp.position.set(PRX - 3.05, 0, -1.7); scene.add(lamp);
      const dad = CK.family(T, 'dad'); dad.userData.base = dad.scale.x; scene.add(dad);
      const mom = CK.family(T, 'mom'); mom.userData.base = mom.scale.x; scene.add(mom);
      const phone8 = phoneMesh(1.1); scene.add(phone8); const glow8 = new T.PointLight('#8fd8ff', 0, 3.2, 1.6); scene.add(glow8);
      const basket = new T.Group(); { const bk = new T.Mesh(new T.CylinderGeometry(0.42, 0.32, 0.36, 20, 1, true), M('#ffb648', { side: T.DoubleSide })); basket.add(bk); const bt = new T.Mesh(new T.CylinderGeometry(0.32, 0.32, 0.04, 20), M('#ffb648')); bt.position.y = -0.17; basket.add(bt); const hd = new T.Mesh(new T.TorusGeometry(0.36, 0.035, 8, 20, PI), M('#e8902a')); hd.position.y = 0.18; basket.add(hd); }
      scene.add(basket);

      /* ===== stage 5: living room (x = 180) ===== */
      const room5 = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#ff9ec0', props: false, winX: 2.6 }); room5.position.x = LX; scene.add(room5);
      const cab = new T.Group(); { const c = new T.Mesh(new T.BoxGeometry(1.5, 1.15, 0.8), M('#7fcfe0')); c.position.y = 0.58; cab.add(c); for (const s of [-1, 1]) { const d = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), M('#ffffff')); d.position.set(s * 0.18, 0.6, 0.42); cab.add(d); } const dk = new T.Mesh(new T.BoxGeometry(0.9, 0.12, 0.42), M('#ffffff')); dk.position.set(0, 1.21, 0.05); cab.add(dk); const pl = new T.Mesh(new T.SphereGeometry(0.28, 12, 10), M('#57c98b')); pl.position.set(-0.5, 1.45, -0.1); cab.add(pl); const pt = new T.Mesh(new T.CylinderGeometry(0.17, 0.13, 0.26, 12), M('#ff9e6e')); pt.position.set(-0.5, 1.28, -0.1); cab.add(pt); }
      cab.position.set(DOCK[0], 0, DOCK[2] - 0.05); scene.add(cab);
      const dockPh = [phoneMesh(0.75), phoneMesh(0.75)]; dockPh.forEach((p, i) => { p.position.set(DOCK[0] + 0.05 + i * 0.32, DOCK[1] + 0.22, DOCK[2] + 0.05); p.rotation.set(-0.15, 0, 0); scene.add(p); });
      dockPh[1].children[0].material = M('#9b7bff');
      const lteen = CK.neighbor(T, 0, TEEN); lteen.userData.base = 1.12; scene.add(lteen);
      const lmom = CK.neighbor(T, 3, TMOM); lmom.userData.base = 1.3; scene.add(lmom);
      const fam = {}; for (const k of ['mom', 'dad', 'mama', 'nana', 'wawa']) { const g = CK.family(T, k); g.userData.base = g.scale.x; scene.add(g); fam[k] = g; }
      const lph = phoneMesh(1.0); scene.add(lph);
      const sparks = []; for (let i = 0; i < 10; i++) { const h = new T.Mesh(new T.SphereGeometry(0.11, 10, 8), M(i % 2 ? '#ffd23f' : '#ff8fab')); h.userData.s = [Math.sin(i * 7.1) * 2.8 - 0.3, -1.4 + Math.cos(i * 3.3) * 0.5, (i * 0.37) % 1]; h.visible = false; scene.add(h); sparks.push(h); }
      return { watch, key, hemi, room, DAYT, NT, alarm, teen, tmom, phone, glow, peds, props, mini, bA, bB, moonA, moonB, ph4, ph4l, notch, cteen, dad, mom, phone8, glow8, basket, dockPh, lteen, lmom, fam, lph, sparks };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), dn = danger(t), nf = nightF(t), dim = Math.max(nf * 0.55, dn);
      s.hemi.intensity = U.lerp(0.48, 0.24, dim); s.key.intensity = U.lerp(0.68, 0.36, dim);
      const R = s.room.userData, wc = new T.Color('#ffffff').lerp(new T.Color('#7f78c8'), dim); R.wall.material.color.copy(wc); R.floor.material.color.copy(new T.Color('#ffffff').lerp(new T.Color('#8a7ab0'), dim)); R.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dim);
      R.win.material.map = (nf > 0.5 || dn > 0.2) ? s.NT : s.DAYT;
      const arms = (g, z1, x1, z2, x2) => { const a1 = g.userData.arm1, a2 = g.userData['arm-1']; if (z1 != null) { a1.rotation.z = z1; a1.rotation.x = x1; } if (z2 != null) { a2.rotation.z = z2; a2.rotation.x = x2; } };
      const holdPhone = (g, ph, light, sway) => { arms(g, 0.3 + sway, -1.85, -0.3 - sway, -1.85); g.updateMatrixWorld(true); const h1 = new T.Vector3(), h2 = new T.Vector3(); g.userData.hand1.getWorldPosition(h1); g.userData['hand-1'].getWorldPosition(h2); h1.add(h2).multiplyScalar(0.5); ph.position.set(h1.x, h1.y + 0.12, h1.z + 0.08); ph.rotation.set(-0.15, 0, 0); ph.visible = true; if (light) { light.position.set(h1.x, h1.y + 0.35, h1.z - 0.25); } };

      /* ---------- teen bedroom ---------- */
      const tb = ['cover', 's1', 's2', 's6', 's10'].includes(bt);
      { const k = s.teen, m = s.tmom; k.visible = tb; m.visible = false; s.phone.visible = false; s.glow.intensity = 0; s.alarm.rotation.z = 0;
        if (tb) {
          k.position.set(BEDX, MT - 0.163 * 1.12 + 0.02, -1.25); k.rotation.set(-0.04, 0, 0); k.userData.head.rotation.x = 0;
          let ex = 'giggle', phoneOn = false, droop = 0, stretch = false;
          if (bt === 'cover') { phoneOn = true; ex = 'giggle'; }
          if (bt === 's1') { const u = (t - at('s1')) / dur('s1'); if (u < 0.3) { phoneOn = true; ex = u < 0.12 ? 'giggle' : 'sleepy'; } else { ex = 'sleepy'; droop = 0.32; } if (t > NF1() + 1.6) { droop = 0.18; } }
          if (bt === 's2') { ex = 'sleepy'; droop = 0.22; }
          if (bt === 's6') { phoneOn = true; ex = 'worried'; }
          if (bt === 's10') { ex = 'giggle'; stretch = true; }
          k.userData.setExpr(ex); k.userData.tick(t, { breath: ex === 'sleepy' ? 0.25 : 0.45 }); k.userData.head.rotation.x = droop + (droop ? 0.04 * Math.sin(t * 1.3) : 0);
          if (phoneOn) { holdPhone(k, s.phone, s.glow, 0.02 * Math.sin(t * 2)); s.glow.intensity = 1.4 + 0.25 * Math.sin(t * 7); }
          else if (stretch) arms(k, 2.35 + 0.12 * Math.sin(t * 3), 0.55, -2.35 - 0.12 * Math.sin(t * 3), 0.55);
          else if (droop) arms(k, 0.3, -0.3, -0.3, -0.3);
          /* alarm */
          const ring = (bt === 's1' && t > NF1() - 0.1 && t < P('s1', 0.8)) || (bt === 's10' && ph('s10', t) < 0.3);
          if (ring) { s.alarm.rotation.z = 0.18 * Math.sin(t * 40); s.alarm.position.y = 1.27 + 0.03 * Math.abs(Math.sin(t * 40)); } else s.alarm.position.y = 1.27;
          /* teen's mom */
          const momOn = (bt === 's1' && t > NF1() + 0.3) || bt === 's2' || (bt === 's6' && t > at('s6') + 0.7);
          if (momOn) { m.visible = true; m.position.set(1.75, 0, 0.3); m.rotation.set(0, -0.38, 0); const mex = bt === 's1' ? 'angry' : 'worried'; m.userData.setExpr(mex); m.userData.tick(t, { wave: bt === 's1' && t < P('s1', 0.75) }); if (bt === 's2') arms(m, 0.75, -0.2, -0.75, -0.2); if (bt === 's6') arms(m, 1.0 + 0.05 * Math.sin(t * 3), -0.6); }
        } }

      /* ---------- three thieves ---------- */
      { const on = bt === 's3', ri = on ? r3Idx(t) : 0, tr = on ? U.clamp((t - R3(ri)) / 0.6) : 1, from = ri > 0 ? PX[ri - 1] : PX[0];
        const x = U.lerp(from, PX[ri], U.easeIO(tr)), hop = ri > 0 ? Math.sin(tr * PI) * 1.2 : 0;
        s.mini.position.set(x, 1.0 + hop + 0.04 * Math.abs(Math.sin(t * 5)), 0.1);
        s.mini.userData.setExpr(ri === 0 ? 'worried' : ri === 1 ? 'giggle' : 'sleepy'); s.mini.userData.tick(t, { breath: 0.45 });
        if (ri === 1 && tr >= 1) arms(s.mini, 0.42, -1.2, -0.42, -1.2);
        s.props.forEach((p, i) => { const shown = on && i <= ri, a = shown ? U.easeBack(U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.45)) : 0; p.visible = a > 0.01; p.scale.setScalar(Math.max(0.01, a) * (i === ri ? 1.35 + 0.06 * Math.sin(t * 5) : 0.95)); p.position.y = 5.1 + 0.12 * Math.sin(t * 2.4 + i); p.rotation.y = i === 2 ? 0.2 * Math.sin(t * 1.5) : 0.25 * Math.sin(t * 1.5 + i); });
        s.props[1].rotation.z = 0.3 * Math.sin(t * 14) * (ri === 1 ? 1 : 0.2);
        s.peds.forEach((p, i) => { p.scale.y = i === ri && on ? 1 : 0.8; p.position.y = 0.5 * p.scale.y; }); }

      /* ---------- sleep blocks ---------- */
      { const on = bt === 's4', a1 = U.clamp((t - at('s4') - 0.5) / 0.8), a2 = U.clamp((t - S4a() - 0.2) / 0.9);
        s.bA.visible = on; s.bA.scale.x = Math.max(0.01, (A1 - A0) * U.easeOut(a1)); s.bA.position.x = A0 + s.bA.scale.x / 2;
        s.bB.visible = on && a2 > 0; s.bB.scale.x = Math.max(0.01, (B1 - B0) * U.easeOut(a2)); s.bB.position.x = B0 + s.bB.scale.x / 2;
        s.moonA.position.set(A0, RA + 0.6 + 0.06 * Math.sin(t * 3), 0.2); s.moonA.visible = on && a1 > 0.05;
        s.moonB.position.set(B0, RB + 0.6 + 0.06 * Math.sin(t * 3 + 1), 0.2); s.moonB.visible = on && a2 > 0.05;
        const pu = U.clamp((t - S4a()) / 0.5); s.ph4.visible = on && pu > 0; s.ph4.position.set(U.lerp(XH(1) + 0.35, B0 - 0.35, 0.5), RB + 0.05 + 0.06 * Math.sin(t * 4), 0.55); s.ph4.rotation.set(0, PI + 0.3 * Math.sin(t * 2), 0); s.ph4.scale.setScalar(1.2 * U.easeBack(pu) + 0.01);
        s.ph4l.position.set(s.ph4.position.x - 120 + 120, RB + 0.4, 1.2); s.ph4l.position.x = s.ph4.position.x; s.ph4l.intensity = s.ph4.visible ? 1.2 : 0;
        s.watch.rotation.set(-0.35, 0.35 * Math.sin(t * 1.2), 0.08 * Math.sin(t * 2)); s.watch.position.y = 0.9 + 0.1 * Math.sin(t * 2.2); const nu = U.clamp((t - S4b() - 0.3) / 0.5); s.notch.forEach((n, i) => { n.visible = on && nu > i * 0.25; n.scale.y = 1 + 0.08 * Math.sin(t * 9 + i); }); }

      /* ---------- classroom ---------- */
      { const k = s.cteen, on = bt === 's5'; k.visible = on;
        if (on) { k.position.set(CX, 0, -0.2); k.rotation.set(0, 0, 0); k.userData.setExpr('sleepy'); k.userData.tick(t, { breath: 0.22 }); const nod = (t * 0.55) % 1; k.userData.head.rotation.x = 0.22 + 0.2 * U.easeIO(Math.min(1, nod * 1.4)) * (nod < 0.85 ? 1 : 0); arms(k, 0.35, -1.25, -0.35, -1.25); } }

      /* ---------- parents' bedroom ---------- */
      { const on = bt === 's8', d = s.dad, m = s.mom; d.visible = m.visible = s.phone8.visible = s.basket.visible = on; s.glow8.intensity = 0;
        if (on) { const q = SP('s8', 0.5), fly = U.easeIO(U.clamp((t - q - 0.4) / 0.7));
          d.position.set(PRX - 0.9, MT - 0.163 * 1.4 + 0.02, -1.25); d.rotation.set(-0.04, 0, 0); d.userData.setExpr(t < at('s8') + 1.6 ? 'giggle' : t < q + 1.2 ? 'worried' : 'happy'); d.userData.tick(t, { breath: 0.35 });
          m.position.set(PRX + 1.75, 0, 0.3); m.rotation.set(0, -0.4, 0); m.userData.setExpr(t < at('s8') + 1.2 ? 'worried' : t < q ? 'angry' : 'happy'); m.userData.tick(t, { breath: 0.3 });
          if (t < q) arms(m, 0.75, -0.25, -0.75, -0.25); else arms(m, null, null, -0.95, -0.9);
          m.updateMatrixWorld(true); const bp = new T.Vector3(); m.userData['hand-1'].getWorldPosition(bp); s.basket.position.set(bp.x, bp.y + 0.1, bp.z + 0.1); s.basket.visible = t >= q;
          if (fly <= 0) { holdPhone(d, s.phone8, s.glow8, 0.02 * Math.sin(t * 2)); s.glow8.intensity = 1.3; }
          else { const st = s.phone8.userData.st || (s.phone8.userData.st = s.phone8.position.clone()); const tg = new T.Vector3(bp.x, bp.y + 0.38, bp.z + 0.1); s.phone8.position.lerpVectors(st, tg, fly); s.phone8.position.y += Math.sin(fly * PI) * 0.9; s.phone8.rotation.set(-0.25 + fly * 0.25, fly * 2 * PI, 0); arms(d, fly < 1 ? 1.4 : 2.3 + 0.1 * Math.sin(t * 6), fly < 1 ? -0.4 : 0.5); }
        } else s.phone8.userData.st = null; }

      /* ---------- living room: s7 teen + mom, s9 family ---------- */
      { const s7 = bt === 's7', s9 = bt === 's9', T7 = s.lteen, M7 = s.lmom; T7.visible = M7.visible = s7; s.lph.visible = false;
        s.dockPh[0].visible = s9 || (s7 && t > SP('s7', 0.5) + 1.3); s.dockPh[1].visible = s7 || s9;
        if (s7) { const q = SP('s7', 0.5), walk = U.easeIO(U.clamp((t - q - 0.1) / 0.9)), fly = U.easeIO(U.clamp((t - q - 0.8) / 0.55));
          M7.position.set(LX + 1.25, 0, 0.35); M7.rotation.set(0, -0.35, 0); M7.userData.setExpr('happy'); M7.userData.tick(t, { breath: 0.3 }); if (t < q) arms(M7, 0.95 + 0.06 * Math.sin(t * 3), -0.7);
          T7.position.set(U.lerp(LX - 0.95, LX - 1.75, walk), Math.abs(Math.sin(walk * PI * 3)) * 0.08 * (walk < 1 ? 1 : 0), U.lerp(0.4, -0.55, walk)); T7.rotation.set(0, U.lerp(0.3, -0.35, walk) * (fly >= 1 ? 0.3 : 1), 0);
          T7.userData.setExpr(t < at('s7') + 2.2 ? 'worried' : 'happy'); T7.userData.tick(t, { breath: 0.4, wave: fly >= 1 && t > q + 2.0 });
          if (fly <= 0) holdPhone(T7, s.lph, null, 0); else { s.lph.visible = fly < 1; const st = s.lph.userData.st || (s.lph.userData.st = s.lph.position.clone()); const tg = s.dockPh[0].position; s.lph.position.lerpVectors(st, tg, fly); s.lph.position.y += Math.sin(fly * PI) * 0.6; s.lph.rotation.set(-0.15, 0, 0); s.lph.scale.setScalar(U.lerp(1.0, 0.75, fly)); }
        } else { s.lph.userData.st = null; s.lph.scale.setScalar(1); }
        for (const k in s.fam) { const g = s.fam[k], p = FAM[k]; g.visible = s9; if (!s9) continue; g.position.set(LX + p[0], Math.abs(Math.sin(t * 3 + p[0])) * (k === 'mama' ? 0.1 : 0.04), p[1]); g.rotation.set(0, 0.12 * Math.sin(t * 0.8 + p[0]), 0); g.userData.setExpr(k === 'mama' || k === 'nana' ? 'giggle' : 'happy'); g.userData.tick(t, { breath: 0.35, wave: k === 'mama' && ph('s9', t) > 0.8 }); }
        s.sparks.forEach((h) => { const u = h.userData.s, a = (t - at('s10') - 0.4 - u[2] * 1.4) / 3.0; h.visible = bt === 's10' && a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 1.2 + a * 3.6, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { teen: s.teen, tmom: s.tmom, alarm: s.alarm, mini: s.mini, cteen: s.cteen, dad: s.dad, mom: s.mom, lteen: s.lteen, lmom: s.lmom, fam: s.fam, dockPh: s.dockPh }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 'cover' || (b === 's1' && nightF(t) > 0.5)) return ['#4a4fa8', '#9a86d8']; if (b === 's3') return ['#e2dbff', '#fff4e6']; if (b === 's4') return ['#d4ecff', '#fff4e6']; if (b === 's5') return ['#bfe3ff', '#fff1c9']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's8') return ['#ffd9c2', '#ffe8f0']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = lw || 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, sz) => { if (a <= 0) return; sz = sz || 40; g.save(); g.globalAlpha = Math.min(1, a); g.font = '700 ' + sz + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 54, lo = 30 + LD * 2.2, hi = 1050 - LD * 3; const bx = Math.max(lo + w / 2, Math.min(hi - w / 2, x)); rr(bx - w / 2, y - 40, w, 80, 40, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + 38); g.lineTo(x + 2, y + 68); g.lineTo(x + 18, y + 38); g.fillStyle = '#ffffff'; g.fill(); plain(str, bx, y + 2, sz, '#3a2f3f', 700, 'center'); g.restore(); };
      const pill = (str, x, y, a, sz, bg, fg) => { if (a <= 0) return; g.save(); g.globalAlpha = Math.min(1, a); g.font = '800 ' + sz + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 44; rr(x - w / 2, y - sz * 0.75, w, sz * 1.5, sz * 0.75, bg, '#ffffff', 5); plain(str, x, y + 2, sz, fg, 800, 'center'); g.restore(); };
      const name = (o, str, dy, a, dx) => { let [x, y] = wp(o.userData.head, dy || 0); x += dx || 0; g.save(); g.globalAlpha = a == null ? 1 : a; txt(str, x, y, 34, '#ffffff', 700); g.restore(); };
      const zz = (x, y, a) => { if (a <= 0) return; for (let i = 0; i < 3; i++) { const u = ((t * 0.6 + i / 3) % 1); g.save(); g.globalAlpha = a * (1 - u); txt('z', x + u * 60 + i * 6, y - u * 110, 34 + i * 10, '#ffffff', 800); g.restore(); } };
      /* teen bedroom: clock + bubbles */
      if (['cover', 's1', 's10'].includes(b)) {
        const [ax, ay] = wp(S.alarm, 0.9), clk = b === 'cover' ? 120 : b === 's1' ? clockMin(t) : 390, morn = b === 's10' || (b === 's1' && t > NF1() - 0.2);
        pill(hhmm(clk), ax + 6, ay - 34, 1, 50, morn ? '#ffb648' : '#3d4bb0', '#ffffff');
        const [hx, hy] = wp(S.teen.userData.head, 1.2);
        if (b === 'cover') bubble('อีกคลิปเดียว…', hx + 40, hy - 40, U.clamp((t - 0.2) / 0.2), 44);
        if (b === 's1') { bubble('อีกคลิปเดียว…', hx + 40, hy - 40, U.clamp((P('s1', 0.12) - t) / 0.25 + 1) * U.clamp((P('s1', 0.14) - t) / 0.2), 42); if (t > P('s1', 0.3) && t < NF1()) zz(hx + 60, hy + 30, U.clamp((t - P('s1', 0.3)) / 0.3)); if (S.tmom.visible) { const [mx, my] = wp(S.tmom.userData.head, 1.5); bubble('ส้มโอ! สายแล้ว!', mx - 20, my - 40, U.clamp((t - NF1() - 0.5) / 0.3) * U.clamp((P('s1', 0.78) - t) / 0.3), 40); } bubble('อีก 5 นาที…', hx + 30, hy - 40, U.clamp((t - P('s1', 0.78) - 0.1) / 0.3) * U.clamp((end('s1') - 0.2 - t) / 0.3), 42); }
        if (b === 's10') bubble('ตื่นเองแล้ว!', hx + 30, hy - 40, U.clamp((t - at('s10') - 0.8) / 0.3) * U.clamp((end('s10') - 0.4 - t) / 0.3), 44);
      }
      if (b === 'cover' || b === 's1') { if (S.teen.visible && (b === 'cover' || t < P('s1', 0.3))) name(S.teen, 'ส้มโอ 14 ขวบ', 0.1, b === 'cover' ? 1 : U.clamp((P('s1', 0.3) - t) / 0.3), 250); }
      /* s2 hours bars */
      if (b === 's2') {
        const a0 = U.clamp((t - at('s2') - 0.4) / 0.3), x0 = 330 + LD * 0.5, px = (REEL ? 56 : 62), y0 = 520, grow = (d) => U.easeOut(U.clamp((t - at('s2') - d) / 0.8));
        g.save(); g.globalAlpha = a0; rr(60 + LD, y0 - 60, 960 - 2 * LD, 250, 30, 'rgba(255,255,255,.9)', '#ff8fab');
        plain('ควรนอน', 100 + LD, y0 + 10, Math.round(40 * LF), '#3a2f3f', 700); plain('ส้มโอนอน', 100 + LD, y0 + 120, Math.round(40 * LF), '#3a2f3f', 700);
        const w8 = 8 * px * grow(0.7), w10 = 2 * px * grow(1.3); rr(x0, y0 - 22, Math.max(1, w8), 64, 18, '#4fc27a'); if (w10 > 2) { g.save(); g.setLineDash([10, 8]); rr(x0 + 8 * px - 4, y0 - 22, w10 + 4, 64, 18, 'rgba(79,194,122,.35)', '#4fc27a', 4); g.restore(); }
        if (grow(1.3) > 0.5) plain('8–10 ชม.', x0 + 8 * px / 2, y0 + 12, 38, '#ffffff', 800, 'center');
        const w4 = 4.5 * px * grow(2.0); rr(x0, y0 + 88, Math.max(1, w4), 64, 18, '#ff5f6d'); if (grow(2.0) > 0.5) plain('4.5 ชม.', x0 + 4.5 * px / 2, y0 + 122, 38, '#ffffff', 800, 'center');
        const a2 = U.clamp((t - at('s2') - 3.0) / 0.3); if (a2 > 0) { g.globalAlpha = a0 * a2; g.save(); g.setLineDash([10, 8]); rr(x0 + 4.5 * px + 6, y0 + 88, 3.5 * px - 6, 64, 18, null, '#ff5f6d', 4); g.restore(); plain('ขาด 3.5 ชม.', x0 + 6.25 * px, y0 + 122, 34, '#e83a52', 800, 'center'); }
        g.restore();
      }
      /* s3 numbers + labels */
      if (b === 's3') { const ri = r3Idx(t); for (let i = 0; i <= ri; i++) { const a = U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.4); if (a <= 0) continue; const [x, y] = proj(new T.Vector3(60 + PX[i], 6.55, 0)); const r = (i === ri ? 40 : 30) * U.easeBack(a); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ['#f0704a', '#7a5fe0', '#2f8fe0'][i]; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); txt(String(i + 1), x, y + 2, (i === ri ? 46 : 34) * U.easeBack(a), '#ffffff', 800); } }
      /* s4 labels */
      if (b === 's4') {
        const lab = (str, v, a, sz, col, bg) => { if (a <= 0) return; const [x, y] = proj(v); g.save(); g.globalAlpha = a; g.font = '700 ' + sz + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 36; rr(x - w / 2, y - sz * 0.72, w, sz * 1.44, sz * 0.72, bg || 'rgba(255,255,255,.94)', col); plain(str, x, y + 2, sz, '#3a2f3f', 700, 'center'); g.restore(); };
        const a1 = U.clamp((t - at('s4') - 0.6) / 0.3), a2 = U.clamp((t - S4a() - 0.2) / 0.3), a3 = U.clamp((t - S4c()) / 0.3), a4 = U.clamp((t - S4b() - 0.3) / 0.3);
        lab('4 ทุ่ม', new T.Vector3(120 + XH(1), 3.95, 0.45), a1, 34, '#ff5f86');
        lab('คืนปกติ', new T.Vector3(120 + (A0 + A1) / 2, RA + 0.78, 0), a1, 36, '#9b8cff');
        lab('คืนที่เล่นหลัง 4 ทุ่มมากกว่าปกติ', new T.Vector3(120 + (B0 + B1) / 2 + 0.3, RB + 0.78, 0), a2 * U.clamp((S4b() - t) / 0.3 + (a4 > 0 ? 0 : 0)), 34, '#ff8fab');
        lab('หลับช้าลง ~1 ชม.', new T.Vector3(120 + (A0 + B0) / 2 - 0.15, RB - 0.95, 0.3), a3, 36, '#ff5f86', '#fff1c9');
        lab('ตื่นกลางดึก', new T.Vector3(120 + B0 + 0.3, RB + 0.78, 0.3), a4, 36, '#ff3b5c', '#ffe3ea');
        { const [x0, y0] = proj(new T.Vector3(120 + A0, RA - 0.45, 0.4)), [x1] = proj(new T.Vector3(120 + B0, RA - 0.45, 0.4)); if (a3 > 0) { g.save(); g.globalAlpha = a3; g.setLineDash([12, 10]); g.lineWidth = 5; g.strokeStyle = '#ff5f86'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0, y0 + 150); g.stroke(); g.restore(); } }
      }
      /* s5 battery strip / grid */
      if (b === 's5') {
        const q = SP('s5', 0.5);
        if (t < q) { const a0 = U.clamp((t - at('s5') - 0.3) / 0.3) * U.clamp((q - t) / 0.25), D = ['จ', 'อ', 'พ', 'พฤ', 'ศ'], cw = REEL ? 150 : 166, gap = 16, x0 = 540 - (5 * cw + 4 * gap) / 2 - (REEL ? 15 : 0), y0 = 500, shown = Math.min(5, Math.floor((t - at('s5') - 0.4) / 0.45) + 1);
          g.save(); g.globalAlpha = a0; D.forEach((d, i) => { if (i >= shown) return; const x = x0 + i * (cw + gap), lvl = [0.8, 0.62, 0.45, 0.3, 0.14][i], col = lvl > 0.5 ? '#ffb648' : lvl > 0.25 ? '#ff8f4a' : '#ff3b5c'; rr(x, y0, cw, 190, 26, 'rgba(255,255,255,.92)', '#ff8fab'); plain(d, x + cw / 2, y0 + 36, 38, '#3a2f3f', 800, 'center'); const bx = x + cw / 2 - 34, by = y0 + 70; rr(bx, by, 68, 100, 12, '#ffffff', '#3a2f3f', 5); g.fillStyle = '#3a2f3f'; g.fillRect(bx + 22, by - 12, 24, 12); g.fillStyle = col; g.fillRect(bx + 8, by + 8 + 84 * (1 - lvl), 52, 84 * lvl); }); g.restore(); }
        else { const a0 = U.clamp((t - q - 0.2) / 0.3), cols = 20, sp = REEL ? 40 : 44, x0 = 540 - (cols - 1) * sp / 2 - (REEL ? 15 : 0), y0 = 560, lit = Math.round(69 * U.easeOut(U.clamp((t - q - 0.4) / 1.4)));
          g.save(); g.globalAlpha = a0; rr(x0 - 34, y0 - 34, (cols - 1) * sp + 68, 4 * sp + 68, 26, 'rgba(255,255,255,.55)'); for (let i = 0; i < 100; i++) { const cx = x0 + (i % cols) * sp, cy = y0 + Math.floor(i / cols) * sp, on = i < lit; g.beginPath(); g.arc(cx, cy, on ? 16 : 12, 0, 7); g.fillStyle = on ? '#ff5f86' : 'rgba(255,255,255,.95)'; g.fill(); if (on) { g.lineWidth = 3; g.strokeStyle = '#ffffff'; g.stroke(); } } g.restore(); }
        if (S.cteen.visible) { const [x, y] = wp(S.cteen.userData.head, 0.6); zz(x + 70, y - 10, U.clamp((t - at('s5') - 0.6) / 0.3)); }
      }
      /* s6 doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 330, 980 - 2 * LD, 470, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['ง่วงจนหลับในห้องเรียนบ่อย', 'เศร้า เก็บตัว หงุดหงิด นานเกิน 2 สัปดาห์', 'กรนดัง หรือหยุดหายใจตอนหลับ', 'วางมือถือแล้ว ก็ยังหลับไม่ลงแทบทุกคืน', 'เลิกเล่นเองไม่ได้ ห้ามแล้วโกรธรุนแรง'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 390 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(110 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 110 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 152 + LD, y + 2, Math.round(39 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AASM, AAP · สายด่วนสุขภาพจิต 1323', 540, 768, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s7 bubbles + dock label */
      if (b === 's7') { const q = SP('s7', 0.5); let [x, y] = wp(S.lmom.userData.head, 1.5); bubble('วางมือถือกี่โมงดี?', x + 10, y - 40, U.clamp((t - at('s7') - 0.6) / 0.3) * U.clamp((q - t) / 0.3), 40); [x, y] = wp(S.lteen.userData.head, 1.3); bubble('4 ทุ่มก็ได้…', x - 10, y - 40, U.clamp((t - at('s7') - 2.2) / 0.3) * U.clamp((q - t) / 0.3), 40);
        const [dx, dy] = proj(new T.Vector3(DOCK[0] + 0.15, 0.55, DOCK[2] + 0.5)); pill('แท่นชาร์จ', dx, dy, U.clamp((t - q) / 0.3), 32, '#4fb2f5', '#ffffff');
        if (t < q) { name(S.lteen, 'ส้มโอ', -1.25, U.clamp((t - at('s7') - 0.3) / 0.3)); name(S.lmom, 'แม่ส้มโอ', -1.25, U.clamp((t - at('s7') - 0.3) / 0.3)); } }
      /* s8 bubbles */
      if (b === 's8') { const q = SP('s8', 0.5); let [x, y] = wp(S.mom.userData.head, 1.55); bubble('พ่อ! เที่ยงคืนแล้วนะ', x - 30, y - 40, U.clamp((t - at('s8') - 1.0) / 0.3) * U.clamp((q - t) / 0.3), 40); [x, y] = wp(S.dad.userData.head, 1.45); bubble('อีกคลิปเดียว…', x + 30, y - 40, U.clamp((t - at('s8') - 0.3) / 0.3) * U.clamp((at('s8') + 1.1 - t) / 0.3), 40); bubble('วางก่อนเลย!', x + 30, y - 40, U.clamp((t - q - 1.3) / 0.3) * U.clamp((end('s8') - 0.3 - t) / 0.3), 40); }
      /* s9 tips */
      if (b === 's9') {
        const p = ph('s9', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, REEL ? 440 : 495, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['วางจอ 30–60 นาที ก่อนนอน', 'ปิดแจ้งเตือน เปิดโหมดนอน', 'ตื่นเวลาเดิมทุกวัน รวมวันหยุด', 'งดกาแฟ ชา เครื่องดื่มชูกำลัง หลังบ่าย', 'ห้องนอนมืด เงียบ เย็นสบาย'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s9', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s9', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + i * (REEL ? 72 : 84) - (REEL ? 8 : 0); g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - (REEL ? 32 : 36), 912 - 2 * LD, REEL ? 64 : 72, 32, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AASM, Sleep Foundation, AAP', 540, (REEL ? 735 : 790), 26, '#7a5a70', 400, 'center'); g.restore();
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 280, instant: true, lines: [[70, ['ลูกเล่นมือถือถึงตีสอง', '#fff']], [70, ['เช้าตื่นไม่ไหว', '#fff']], [80, ['ยึดมือถือเลยดีไหม?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[58, ['ตีสองค่อยวางมือถือ', '#fff']], [52, ['หกโมงครึ่ง ต้องตื่นไปโรงเรียน', '#ffd35e']]] },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[62, ['นอนได้แค่ 4 ชั่วโมงครึ่ง', '#ffd35e']], [48, ['ปลุกยังไง ก็ตื่นไม่ไหว', '#fff', 600]]] },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 280, lines: [[54, ['วัยรุ่น 13–18 ปี ต้องนอน', '#fff']], [66, ['คืนละ 8–10 ชั่วโมง', '#ffd35e']]], foot: 'ที่มา: American Academy of Sleep Medicine (AASM)' },
      { t0: at('s3') + 0.2, t1: R3(1), y: 280, lines: [[48, ['ทำไมเล่นแล้ว นอนไม่หลับ?', '#fff', 600]], [60, ['① ขโมยเวลานอน', '#ffd35e']], [44, ['ยิ่งเล่น เวลานอนยิ่งหด', '#fff', 600]]] },
      { t0: R3(1) + 0.02, t1: R3(2), y: 290, lines: [[60, ['② ปลุกสมองให้ตื่น', '#ffd35e']], [44, ['แจ้งเตือน คลิปถัดไป แชตเพื่อน', '#fff', 600]]] },
      { t0: R3(2) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[56, ['③ แสงจอ เลื่อนนาฬิการ่างกาย', '#ffd35e']], [44, ['วัยรุ่นง่วงช้าอยู่แล้ว ยิ่งง่วงช้าลงอีก', '#fff', 600]]], foot: 'ที่มา: Dr. Bigman (Northwell Health) 2026, Sleep Foundation' },
      { t0: at('s4') + 0.2, t1: S4a(), y: 270, lines: [[46, ['งานวิจัยใหม่ ต.ค. 2569', '#fff', 600]], [58, ['วัยรุ่น 425 คน · 7,591 คืน', '#ffd35e']], [42, ['ใส่นาฬิกาวัดการนอนจริง', '#fff', 600]]], foot: 'ที่มา: Zhao, Hale & Christakis, JAMA Pediatrics 2026' },
      { t0: S4a() + 0.02, t1: S4b(), y: 270, lines: [[46, ['คืนที่เล่นหลัง 4 ทุ่ม มากกว่าปกติ', '#fff', 600]], [62, ['หลับช้าลง ราว 1 ชั่วโมง', '#ffd35e']], [44, ['นอนรวมน้อยลง ~20 นาที', '#fff', 600]]], foot: 'พบความเชื่อมโยง · JAMA Pediatrics 2026' },
      { t0: S4b() + 0.02, t1: end('s4') - 0.05, y: 270, lines: [[46, ['เล่นจนนาทีสุดท้ายก่อนหลับ', '#fff', 600]], [62, ['ตื่นกลางดึกบ่อยขึ้น', '#ffd35e']], [42, ['ช่วงครึ่งชั่วโมงแรกหลังหลับ', '#fff', 600]]], foot: 'พบความเชื่อมโยง · JAMA Pediatrics 2026' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 280, lines: [[54, ['นอนไม่พอทุกคืน แบตยิ่งพร่อง', '#ffd35e']], [44, ['ง่วงในห้อง สมาธิหลุด หงุดหงิดง่าย', '#fff', 600]]], foot: 'ที่มา: Dr. Bigman (Northwell Health) 2026' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 270, lines: [[50, ['วัยรุ่นไทย นอนไม่พอ', '#fff']], [64, ['69 คน ใน 100 คน', '#ffd35e']], [38, ['นอนน้อย พบความเชื่อมโยงกับอาการซึมเศร้า วิตกกังวล', '#ffe3ea', 600]]], foot: 'ที่มา: Rojrattanadumrong et al., APST 2022 (1,259 คน อายุ 11–19)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.5), y: 290, lines: [[60, ['ไม่ต้องขู่ยึดมือถือ', '#ffd35e']], [46, ['ชวนคุย แล้วตกลงกติกาด้วยกัน', '#fff', 600]]], foot: 'ที่มา: ทีมวิจัย JAMA Pediatrics 2026' },
      { t0: SP('s7', 0.5) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[62, ['ถึง 4 ทุ่ม วางจอ', '#ffd35e']], [52, ['ชาร์จมือถือ นอกห้องนอน', '#fff']]], foot: 'ที่มา: AAP · JAMA Pediatrics 2026' },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[56, ['เดี๋ยวนะ… บ้านเราเอง', '#fff']], [60, ['พ่อก็นอนเล่นมือถือ!', '#ffd35e']]] },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[62, ['พ่อแม่วางให้ดูก่อน', '#ffd35e']], [46, ['ลูกเรียนจากสิ่งที่เห็นทุกวัน', '#fff', 600]]], foot: 'ที่มา: American Academy of Pediatrics (AAP)' },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[58, ['5 ทิป คืนนี้นอนทัน', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 280, lines: [[56, ['ไม่ต้องยึดมือถือ', '#fff']], [60, ['แค่ให้มือถือ ได้นอนก่อนลูก', '#ffd35e']], [38, ['ลูกคุณวางมือถือกี่โมง? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AASM, JAMA Pediatrics 2026, APST 2022, AAP' },
    ],
    trans,
    audio: [
      [0.3, 'ding'], [0.9, 'ding'], [1.5, 'giggle'],
      [P('s1', 0.08), 'whoosh'], ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => [P('s1', 0.1) + i * (NF0() - P('s1', 0.1)) / 8, 'tick']), [NF0(), 'shimmer'],
      ...[0, 1, 2, 3, 4, 5].map((i) => [NF1() + i * 0.32, 'warn']), [NF1() + 0.6, 'pop'], [P('s1', 0.78), 'boing'],
      [at('s2') + 0.5, 'whoosh'], [at('s2') + 0.8, 'pop'], [at('s2') + 2.1, 'pop'], [at('s2') + 3.1, 'thud'],
      [at('s3') + 0.4, 'warn'], [at('s3') + 0.6, 'boing'], [R3(1), 'boing'], [R3(1) + 0.4, 'ding'], [R3(1) + 0.8, 'ding'], [R3(2), 'boing'], [R3(2) + 0.5, 'shimmer'],
      [at('s4') + 0.5, 'whoosh'], [at('s4') + 0.8, 'pop'], [S4a() + 0.2, 'whoosh'], [S4a() + 0.4, 'pop'], [S4c(), 'warn'], [S4b() + 0.3, 'tick'], [S4b() + 0.55, 'tick'], [S4b() + 0.8, 'tick'],
      [at('s5') + 0.4, 'breath'], ...[0, 1, 2, 3, 4].map((i) => [at('s5') + 0.45 + i * 0.45, 'tick']), [SP('s5', 0.5) + 0.3, 'whoosh'], [SP('s5', 0.5) + 1.8, 'ding'],
      [at('s6') + 0.3, 'heartbeat'], ...[0, 1, 2, 3, 4].map((i) => [TM('s6', i, 0.1 + i * 0.1), 'tick']), [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.4, 'shimmer'], [at('s7') + 0.7, 'pop'], [at('s7') + 2.2, 'pop'], [SP('s7', 0.5) + 0.8, 'whoosh'], [SP('s7', 0.5) + 1.35, 'ding'],
      [at('s8') + 0.3, 'giggle'], [at('s8') + 1.0, 'pop'], [SP('s8', 0.5) + 0.4, 'whoosh'], [SP('s8', 0.5) + 1.1, 'ding'], [SP('s8', 0.5) + 1.3, 'pop'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.2, 'twinkle'], [at('s10') + 0.8, 'giggle'], [at('s10') + 1.4, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
