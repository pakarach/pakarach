/* พ่อแม่หัวจะปวด — ลูกร้องไม่หยุด ไม่รู้ร้องเพราะอะไร หรือเป็นโคลิก? (ย้อนไปตอนวาวา 6 สัปดาห์: ยายชมพู่ "เห็นผี" → เช็ก 5 อย่าง → กฎ 3-3-3 → ร้องหนักช่วงเย็น ท้องป่องเพราะกลืนลม → ทำไม: ประสาท+ลำไส้ยังพัฒนา → ร้อง 2 ชม./2:15 พีค 6 สัปดาห์/1:10, 1 ใน 5, หาย 60/90% → พบแพทย์ถ้า (night) → ปลอบ 5 แบบ → ห้ามน้ำผึ้ง ยาขับลม ≈ ยาหลอก → ห้ามเขย่า วางในเปลแล้วพัก สลับเวร 1323 → 5 ทิป → ปิด)
   Build: node build.js luk-rong-mai-yud.js review-luk-rong-mai-yud.html --kit clay --title "ลูกร้องไม่หยุด หรือเป็นโคลิก?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6.5], ['s2', 8], ['s3', 8], ['s4', 7], ['s5', 8], ['s6', 8.5], ['s7', 8.5], ['s8', 9], ['s9', 8], ['s10', 10], ['s11', 7], ['s12', 6], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's12'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
  const sunsetTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ff9ac0'); g.addColorStop(0.6, '#ffb36b'); g.addColorStop(1, '#ffe08a'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(128, 200, 46, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[50, 70, 22], [80, 64, 28], [200, 90, 24], [226, 86, 18]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  const AX = 60, BX = 120, CX = -60;
  const HT = REEL ? 3.2 : 3.9;
  const SH = {
    cover: [FW(0.3, 0.5, 7.5, 3.9 - 0.6 * R1), FW(0.3, 0.5, 7.2, 3.9 - 0.6 * R1)],
    s1: [FW(-0.3, 0.3, 6.6, HT), FW(-0.3, 0.3, 6.3, HT)],
    s2: [FW(0.5, 0.2, 5.6, HT), FW(0.5, 0.2, 5.3, HT)],
    s3: [FW(AX, 0, 10.2, 4.9 - 1.3 * R1, 0.1), FW(AX, 0, 9.9, 4.9 - 1.3 * R1, 0.1)],
    s4: [FW(0.0, 0.3, 6.6, HT), FW(0.0, 0.3, 6.3, HT)],
    s5: [FW(BX, 0, 7.4, 5.6 - 1.2 * R1, 0.1), FW(BX, 0, 7.1, 5.6 - 1.2 * R1, 0.1)],
    s6: [FW(CX, 0, 9.4, 6.4 - 1.4 * R1, 0.1), FW(CX, 0, 9.1, 6.4 - 1.4 * R1, 0.1)],
    s7: [FW(0.0, 0.3, 6.8, 4.3 - 0.9 * R1, 0.2), FW(0.0, 0.3, 6.5, 4.3 - 0.9 * R1, 0.2)],
    s8: [FW(0.6, 0.2, 5.6, HT), FW(0.6, 0.2, 5.3, HT)],
    s9: [FW(-0.2, 0.3, 6.6, HT), FW(-0.2, 0.3, 6.3, HT)],
    s10: [FW(-0.3, 0.0, 7.6, HT), FW(-0.3, 0.0, 7.3, HT)],
    s11: [FW(0, 0.3, 7.6, REEL ? 3.1 : 4.0, 0.14), FW(0, 0.3, 7.3, REEL ? 3.1 : 4.0, 0.14)],
    s12: [FW(0, 0.3, 7.6, REEL ? 3.4 : 4.1, 0.14), FW(0, 0.3, 7.1, REEL ? 3.4 : 4.1, 0.14)],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: t0 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  /* timings */
  const C2 = (i) => TM('s2', i, 0.07 + i * 0.1), Q2 = SP('s2', 0.62);
  const R3 = (i) => TM('s3', i, 0.1 + i * 0.25);
  const S8 = (i) => TM('s8', i, 0.06 + i * 0.18);
  const Q10a = TM('s10', 1, 0.36), Q10b = TM('s10', 2, 0.7);
  const BARV = [120, 135, 70], BARL = ['2 ชม.', '2 ชม. 15 น.', '1 ชม. 10 น.'], BARW = ['2 สัปดาห์', '6 สัปดาห์', '12 สัปดาห์'], BXS = [CX - 2.7, CX, CX + 2.7], BH = (m) => m / 135 * 3.6;
  const FAM = { mom: [-1.9, -0.7], dad: [1.95, -0.7], nana: [-1.6, 1.4], mama: [0, 1.4], wawa: [1.45, 1.4] };
  const CRIB = [-2.75, -0.9];

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };

  /* gentle baby "wah" for the crying beats (clip-specific SFX) */
  VE.registerSfx('wah', (t) => { const a = VE.audio; a.tone(t, 560, 0.42, { f2: 430, type: 'triangle', vol: 0.05, att: 0.06 }); a.tone(t + 0.48, 600, 0.5, { f2: 410, type: 'triangle', vol: 0.045, att: 0.06 }); });

  VE.run({
    DUR, file: 'luk-rong-mai-yud', title: 'ลูกร้องไม่หยุด หรือเป็นโคลิก?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกร้องไม่หยุด', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== home ===== */
      const room = CK.room(T, { wall: '#ffd3a8', wain: '#8fd6c4', floor: '#e9b483', rug: '#ff9ec0', winX: 3.3 }); scene.add(room);
      const SUN = sunsetTex(), NIGHT = nightTex(), DAY = room.userData.win.material.map;
      const crib = new T.Group(); crib.position.set(CRIB[0], 0, CRIB[1]); scene.add(crib);
      { const wm = M('#ffffff'), pm = M('#9fd3ff');
        const mat = new T.Mesh(new T.BoxGeometry(2.1, 0.28, 1.1), M('#ffd6e4')); mat.position.y = 0.95; crib.add(mat);
        const base = new T.Mesh(new T.BoxGeometry(2.2, 0.12, 1.2), wm); base.position.y = 0.78; crib.add(base);
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const p = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 1.9, 12), pm); p.position.set(sx * 1.1, 0.95, sz * 0.58); crib.add(p); const k = new T.Mesh(new T.SphereGeometry(0.11, 12, 10), M('#ffd36e')); k.position.set(sx * 1.1, 1.92, sz * 0.58); crib.add(k); }
        const rb = new T.Mesh(new T.BoxGeometry(2.2, 0.1, 0.1), pm); rb.position.set(0, 1.8, -0.58); crib.add(rb);
        for (let i = 0; i < 9; i++) { const b = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.75, 8), wm); b.position.set(-0.96 + i * 0.24, 1.42, -0.58); crib.add(b); }
        const rf = new T.Mesh(new T.BoxGeometry(2.2, 0.1, 0.1), pm); rf.position.set(0, 1.12, 0.58); crib.add(rf); }
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      C.yai = CK.neighbor(T, 0, { scale: 1.26, hairStyle: 'bob', hair: '#d9d3e0', lashes: true, brow: '#a89fb0', top: '#ff86a8', bottom: '#5fae9c' }); C.yai.userData.base = 1.26; scene.add(C.yai);
      /* newborn wawa (flashback): crying version without pacifier, calm version with it; both can be swaddled */
      const wrapM = M('#c9b6ff');
      const mkNb = (parent, paci, k) => { const g = CK.family(T, 'wawa', paci ? {} : { paci: false }); g.scale.setScalar(k); parent.add(g);
        const w = new T.Mesh(new T.SphereGeometry(0.56, 24, 18), wrapM); w.scale.set(0.95, 1.08, 0.88); w.position.y = 0.46; w.visible = false; g.add(w);
        const fold = new T.Mesh(new T.TorusGeometry(0.42, 0.07, 10, 28, PI * 1.2), M('#ffffff')); fold.rotation.set(PI / 2 - 0.3, 0, PI * 0.9); fold.position.set(0, 0.86, 0.05); fold.visible = false; g.add(fold);
        g.userData.wrap = [w, fold]; return g; };
      const nbA = mkNb(C.mom, false, 0.6 / 1.3), nbB = mkNb(C.mom, true, 0.6 / 1.3), nbD = mkNb(C.dad, true, 0.6 / 1.4);
      const lw = CK.family(T, 'wawa', { paci: false }); lw.userData.base = 0.5 / 0.62 * lw.scale.x; scene.add(lw);
      /* honey jar (yai) */
      const jar = new T.Group(); { const b = new T.Mesh(new T.CylinderGeometry(0.26, 0.24, 0.42, 20), M('#ffb21f', { roughness: 0.25 })); jar.add(b); const lid = new T.Mesh(new T.CylinderGeometry(0.28, 0.28, 0.1, 20), M('#c8743a')); lid.position.y = 0.25; jar.add(lid); const lb = new T.Mesh(new T.CylinderGeometry(0.265, 0.265, 0.16, 20, 1, true), M('#fff3c4')); lb.position.y = -0.02; jar.add(lb); const dot = new T.Mesh(new T.SphereGeometry(0.06, 10, 8), M('#ff8fab')); dot.position.set(0, -0.02, 0.27); jar.add(dot); }
      jar.scale.setScalar(1.25); jar.position.set(0, -0.3, 0.18); C.yai.userData.hand1.add(jar);
      /* thermometer (dad, night) */
      const therm = new T.Group(); { const tb = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.7, 12), M('#ffffff')); tb.position.y = 0.35; therm.add(tb); const bulb = new T.Mesh(new T.SphereGeometry(0.12, 12, 10), M('#ff4d5e')); therm.add(bulb); const lq = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.5, 8), M('#ff4d5e')); lq.position.set(0, 0.25, 0.03); therm.add(lq); }
      therm.scale.setScalar(1.3); therm.position.set(0, -0.25, 0.15); therm.rotation.z = 0.3; C.dad.userData.hand1.add(therm);
      /* wind bubbles (s4) */
      const wind = []; for (let i = 0; i < 6; i++) { const b = new T.Mesh(new T.SphereGeometry(0.09 + (i % 3) * 0.03, 12, 10), M('#ffffff', { transparent: true, opacity: 0.85 })); b.visible = false; scene.add(b); wind.push(b); }
      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.6, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage A: rule of 3 (x = 60) ===== */
      const flA = new T.Mesh(new T.BoxGeometry(26, 0.3, 30), M('#7fd0bd')); flA.position.set(AX, -0.15, 0); scene.add(flA);
      const wA = new T.Mesh(new T.BoxGeometry(26, 13, 0.3), M('#ffffff', { map: dotT('#c9f0e6', '#ffffff', [9, 4.5]) })); wA.position.set(AX, 6, -3.2); scene.add(wA);
      const PXA = [AX - 3.1, AX, AX + 3.1], PCA = ['#ff8fab', '#9b7bff', '#4fb2f5'];
      const pedsA = PXA.map((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(1.15, 1.25, 1.0, 36), M(PCA[i])); p.position.set(x, 0.5, 0); scene.add(p); return p; });
      const propsA = [];
      { /* clock with a 3-hour wedge */ const c = new T.Group(); const rim = new T.Mesh(new T.CylinderGeometry(0.95, 0.95, 0.3, 40), M('#ff6f91')); rim.rotation.x = PI / 2; c.add(rim); const face = new T.Mesh(new T.CircleGeometry(0.8, 40), M('#ffffff')); face.position.z = 0.16; c.add(face);
        const wedge = new T.Mesh(new T.CircleGeometry(0.74, 32, PI / 2 - PI / 2, PI / 2), M('#ffd23f')); wedge.rotation.z = 0; wedge.position.z = 0.17; wedge.rotation.y = 0; wedge.scale.x = -1; c.add(wedge);
        for (let i = 0; i < 12; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.06, 0.14, 0.02), M('#3a2f3f')); const a = i / 12 * PI * 2; tk.position.set(Math.sin(a) * 0.66, Math.cos(a) * 0.66, 0.18); tk.rotation.z = -a; c.add(tk); }
        const hh = new T.Mesh(new T.BoxGeometry(0.08, 0.42, 0.04), M('#3a2f3f')); hh.geometry.translate(0, 0.21, 0); hh.position.z = 0.2; c.add(hh); c.userData.hand = hh; const hub = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), M('#ff6f91')); hub.position.z = 0.22; c.add(hub); propsA.push(c); }
      { /* week calendar, 3 days marked */ const c = new T.Group(); const pg = new T.Mesh(new T.BoxGeometry(1.8, 1.4, 0.14), M('#ffffff')); c.add(pg); const hd = new T.Mesh(new T.BoxGeometry(1.8, 0.36, 0.18), M('#9b7bff')); hd.position.y = 0.52; c.add(hd);
        for (const s of [-1, 1]) { const r = new T.Mesh(new T.TorusGeometry(0.09, 0.03, 8, 16), M('#3a2f3f')); r.position.set(s * 0.5, 0.72, 0.02); c.add(r); }
        const cells = []; for (let i = 0; i < 7; i++) { const x = -0.66 + (i % 4) * 0.44, y = 0.08 - Math.floor(i / 4) * 0.46; const cl = new T.Mesh(new T.BoxGeometry(0.34, 0.34, 0.06), M('#e6e0f5')); cl.position.set(x, y, 0.09); c.add(cl); cells.push(cl); } c.userData.cells = cells; propsA.push(c); }
      { /* three stacked week blocks */ const c = new T.Group(); ['#5ab8ff', '#79dcb4', '#ffd23f'].forEach((col, i) => { const b = new T.Mesh(new T.BoxGeometry(1.5 - i * 0.18, 0.5, 1.0), M(col)); b.position.y = -0.5 + i * 0.52; c.add(b); const d = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), M('#ffffff')); d.position.set(0, -0.5 + i * 0.52, 0.51); c.add(d); }); c.userData.blocks = c.children.filter((m) => m.geometry.type === 'BoxGeometry'); propsA.push(c); }
      propsA.forEach((p, i) => { p.position.set(PXA[i], 2.2, 0); scene.add(p); });

      /* ===== stage B: why (x = 120) ===== */
      const flB = new T.Mesh(new T.BoxGeometry(20, 0.3, 24), M('#a98be8')); flB.position.set(BX, -0.15, 4); scene.add(flB);
      const wB = new T.Mesh(new T.BoxGeometry(20, 13, 0.3), M('#ffffff', { map: dotT('#e4d9ff', '#ffffff', [7, 4.5]) })); wB.position.set(BX, 6, -3.2); scene.add(wB);
      const cush = new T.Mesh(new T.CylinderGeometry(1.5, 1.6, 0.7, 36), M('#ffb3c9')); cush.position.set(BX, 0.35, 0); scene.add(cush);
      const big = CK.family(T, 'wawa', { paci: false }); big.userData.base = 2.0; scene.add(big);
      const gut = new T.Mesh(new T.TorusKnotGeometry(0.34, 0.1, 80, 12, 2, 3), M('#ff8f6b', { transparent: true, opacity: 0.92 })); scene.add(gut);
      const dial = new T.Group(); { const d0 = new T.Mesh(new T.CylinderGeometry(0.7, 0.75, 0.35, 32), M('#5ab8ff')); d0.rotation.x = PI / 2; dial.add(d0); const top = new T.Mesh(new T.CylinderGeometry(0.55, 0.55, 0.1, 32), M('#ffffff')); top.rotation.x = PI / 2; top.position.z = 0.2; dial.add(top); const nt = new T.Mesh(new T.BoxGeometry(0.1, 0.38, 0.06), M('#ff5f86')); nt.geometry.translate(0, 0.2, 0); nt.position.z = 0.27; dial.add(nt); dial.userData.notch = nt;
        for (let i = 0; i < 9; i++) { const a = -PI * 0.75 + i / 8 * PI * 1.5; const tk = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), M(i > 5 ? '#ff5f86' : '#ffd23f')); tk.position.set(Math.sin(a) * 0.95, Math.cos(a) * 0.95, 0); dial.add(tk); } }
      dial.position.set(BX - 1.95, 4.1, 0.3); scene.add(dial);
      const waves = []; for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.TorusGeometry(1, 0.05, 8, 40), M('#ffd23f', { transparent: true, opacity: 0.8 })); r.position.set(BX + 0.05, 3.3, 0.2); scene.add(r); waves.push(r); }

      /* ===== stage C: crying-time bars (x = -60) ===== */
      const flC = new T.Mesh(new T.BoxGeometry(20, 0.3, 24), M('#ff6f9f')); flC.position.set(CX, -0.15, 4); scene.add(flC);
      const wC = new T.Mesh(new T.BoxGeometry(20, 13, 0.3), M('#ffffff', { map: dotT('#ffd1e3', '#ffffff', [7, 4.5]) })); wC.position.set(CX, 6, -3.2); scene.add(wC);
      const bars = BXS.map((x, i) => { const b = CK.bar(T, 1.9, 1.3, ['#ffb3c9', '#ff5f86', '#79dcb4'][i]); b.position.set(x, 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const tops = BXS.map(() => { const g = CK.family(T, 'wawa', { paci: false }); g.userData.base = 0.42 / 0.62 * g.scale.x; scene.add(g); return g; });

      return { key, hemi, room, SUN, NIGHT, DAY, crib, C, nbA, nbB, nbD, lw, jar, therm, wind, hearts, pedsA, propsA, big, gut, dial, waves, bars, tops };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C, dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#8fd6c4').lerp(new T.Color('#4a5f7a'), dn);
      const present = bt === 's11' || bt === 's12';
      s.room.userData.win.material.map = bt === 's7' ? s.NIGHT : present ? s.DAY : s.SUN;
      s.crib.visible = bt === 's10';

      /* ---------- cast per beat ---------- */
      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'yai'], st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      const CR = { a1: [-0.15, -0.95], a2: [0.1, -0.95] };
      let nb = null, nbEx = 'cry', wrap = false, side = 0, lwOn = false, heartsOn = false, heartsT0 = 0, windOn = false;
      const sway = (k) => Math.sin(t * 2.2) * k;
      if (bt === 'cover') {
        def('mom', 0.45, 0, 'worried', Object.assign({ ry: -0.15 + sway(0.08) }, CR)); nb = 'A';
        def('dad', 2.8, -0.9, 'worried', { ry: -0.35, a2: [2.55, 0.9] });
        const j = Math.abs(Math.sin(t * 6)) * 0.08;
        def('mama', -1.2, 1.6, 'worried', { y: j, ry: 0.25, a1: [-2.55, 1.0], a2: [2.55, 1.0] });
        def('nana', -2.65, 1.5, 'cry', { y: j * 0.6, ry: 0.35, a1: [-2.55, 1.0], a2: [2.55, 1.0] });
      } else if (bt === 's1') {
        const q = SP('s1', 0.5), wk = U.easeOut(U.clamp((t - at('s1') - 0.1) / 1.0));
        def('yai', U.lerp(-5.5, -1.75, wk), 0.2, t < q ? 'worried' : 'angry', { ry: 0.35, y: wk < 1 ? Math.abs(Math.sin(t * 9)) * 0.08 : 0, a2: t < q ? [1.0 + 0.25 * Math.sin(t * 8), -0.9] : null });
        def('mom', 1.1, 0, t < q ? 'worried' : 'happy', Object.assign({ ry: -0.3 + sway(0.06) }, CR)); nb = 'A';
      } else if (bt === 's2') {
        def('mom', 0.55, 0.1, 'worried', Object.assign({ ry: -0.2 + sway(0.1), y: Math.abs(Math.sin(t * 3)) * 0.04 }, CR)); nb = 'A';
      } else if (bt === 's4') {
        const q = SP('s4', 0.5);
        def('mom', 0.95, 0, 'worried', Object.assign({ ry: -0.25 + sway(0.12), y: Math.abs(Math.sin(t * 4)) * 0.06 }, CR)); nb = 'A';
        def('dad', -1.45, 0.25, 'worried', { ry: 0.4, a2: [0.9, -0.95] }); windOn = t > q;
      } else if (bt === 's7') {
        def('mom', 1.0, 0, 'worried', Object.assign({ ry: -0.25 }, CR)); nb = 'A';
        def('dad', -1.35, 0.25, 'worried', { ry: 0.45, a2: [0.75 + 0.05 * Math.sin(t * 3), -1.05] });
      } else if (bt === 's8') {
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= S8(i)) cur = i;
        wrap = cur >= 0; side = cur === 1 ? 1 : 0;
        const amp = cur >= 3 ? 0.55 : 0.2;
        def('mom', 0.6 + Math.sin(t * 2.4) * amp * 0.5, 0.2, cur >= 2 ? 'happy' : 'worried', Object.assign({ ry: -0.2 + Math.sin(t * 2.4) * 0.15, y: Math.abs(Math.sin(t * 4.8)) * (cur >= 3 ? 0.08 : 0.03) }, CR));
        nb = cur >= 4 ? 'B' : 'A'; nbEx = cur >= 4 ? 'sleepy' : cur >= 2 ? 'worried' : 'cry';
      } else if (bt === 's9') {
        const q = SP('s9', 0.55), wk = U.easeOut(U.clamp((t - at('s9') - 0.1) / 0.8));
        def('yai', U.lerp(-4.5, -1.55, wk), 0.25, t < q ? 'happy' : 'worried', { ry: 0.4, a2: t < q ? [1.05, -1.0] : [0.35, -0.3] });
        def('mom', 1.15, 0, t < P('s9', 0.3) ? 'worried' : 'happy', Object.assign({ ry: -0.3 + sway(0.05) }, CR)); nb = 'A'; nbEx = 'worried';
        if (t > P('s9', 0.3) && t < q) st.mom.ry += 0.18 * Math.sin(t * 9);
      } else if (bt === 's10') {
        if (t < Q10a) { def('mom', 0.4, 0.1, 'sleepy', Object.assign({ ry: -0.1 + sway(0.05), rx: 0.05 }, CR)); nb = 'A'; }
        else if (t < Q10b) {
          const k = U.easeIO(U.clamp((t - Q10a) / 0.9)), k2 = U.easeIO(U.clamp((t - Q10a - 1.1) / 1.0));
          const x = k2 > 0 ? U.lerp(-1.25, 1.65, k2) : U.lerp(0.4, -1.25, k);
          def('mom', x, U.lerp(0.1, -0.15, k), k2 > 0.5 ? 'happy' : 'worried', k2 > 0 ? { ry: U.lerp(-0.6, 0.2, k2), a1: [-0.25, -0.15], a2: [0.25, -0.15] } : Object.assign({ ry: U.lerp(-0.1, -0.6, k), rx: 0.15 * k }, CR));
          nb = k < 0.95 ? 'A' : null; lwOn = k >= 0.95;
        } else {
          const k = U.easeOut(U.clamp((t - Q10b) / 0.9));
          def('mom', 1.65, -0.15, 'happy', { ry: -0.35, a1: [-0.25, -0.15], a2: [0.25, -0.15] });
          def('dad', U.lerp(-5.0, -0.85, k), 0.25, 'happy', Object.assign({ ry: 0.25, y: k < 1 ? Math.abs(Math.sin(t * 8)) * 0.06 : 0 }, CR));
        }
      } else if (present) {
        for (const k in FAM) { const p = FAM[k]; def(k, p[0], p[1], k === 'mama' || k === 'nana' || k === 'wawa' ? 'giggle' : 'happy', { y: Math.abs(Math.sin(t * 3 + p[0])) * (k === 'mama' ? 0.12 : 0.04), ry: 0.12 * Math.sin(t * 0.8 + p[0]), wave: bt === 's12' ? ph('s12', t) > 0.35 && k !== 'wawa' : k === 'mama' && ph('s11', t) > 0.8 }); }
        if (bt === 's12') { heartsOn = true; heartsT0 = at('s12') + 0.5; }
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base); g.userData.head.rotation.x = 0; g.userData.head.rotation.z = 0;
      }
      if (st.mom && st.mom.a1 === CR.a1) C.mom.userData.head.rotation.x = 0.2;
      if (st.dad && st.dad.a1 === CR.a1) C.dad.userData.head.rotation.x = 0.2;
      if (st.nana && bt === 'cover') C.nana.userData.head.rotation.z = 0.08 * Math.sin(t * 5);
      s.jar.visible = bt === 's9'; s.therm.visible = bt === 's7';

      /* cradled newborns */
      const cradle = (g, on, ex, wr, sd) => { g.visible = on; if (!on) return; g.position.set(0.45, 0.8 + 0.12 * sd, 0.6); g.rotation.set(-0.45 - 0.5 * sd, 0, PI / 2 - 0.32); g.userData.setExpr(ex); g.userData.tick(t, { breath: ex === 'cry' ? 0.7 : 0.35 });
        g.userData.wrap.forEach((m) => (m.visible = wr)); g.userData.arm1.visible = g.userData['arm-1'].visible = !wr;
        g.userData.arm1.rotation.z = 0.9; g.userData['arm-1'].rotation.z = ex === 'cry' ? -1.6 - 0.3 * Math.sin(t * 9) : -0.9; g.userData.head.rotation.z = ex === 'cry' ? 0.12 * Math.sin(t * 6) : 0; };
      cradle(s.nbA, nb === 'A', nbEx, wrap, side); cradle(s.nbB, nb === 'B', nbEx, wrap, side);
      cradle(s.nbD, bt === 's10' && t >= Q10b, 'sleepy', true, 0);
      { const g = s.lw; g.visible = lwOn; if (lwOn) { g.position.set(CRIB[0] + 0.05, 1.12, CRIB[1] + 0.05); g.rotation.set(0, 0, PI / 2 - 0.12); g.scale.setScalar(g.userData.base); g.userData.setExpr('cry'); g.userData.tick(t, { breath: 0.6 }); g.userData.arm1.rotation.z = 0.8; g.userData['arm-1'].rotation.z = -0.8 - 0.4 * Math.abs(Math.sin(t * 7)); } }

      /* wind bubbles */
      { let base = null; if (windOn && s.nbA.visible) { s.nbA.updateMatrixWorld(true); base = s.nbA.getWorldPosition(new T.Vector3()); }
        s.wind.forEach((b, i) => { const a = ((t * 0.55 + i / 6) % 1); b.visible = !!base; if (!base) return; b.position.set(base.x + 0.15 + Math.sin(i * 2.3 + t) * 0.35, base.y + 0.2 + a * 1.4, base.z + 0.3); b.scale.setScalar(U.clamp(a * 5) * U.clamp((1 - a) * 4)); }); }
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(u[0], 3.6 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });

      /* ---------- stage A: rule of 3 ---------- */
      { const on = bt === 's3';
        s.propsA.forEach((p, i) => { const a = on ? U.easeBack(U.clamp((t - R3(i)) / 0.45)) : 0; p.visible = a > 0.01; p.scale.setScalar(Math.max(0.01, a)); p.position.y = 2.3 + 0.1 * Math.sin(t * 2.4 + i); p.rotation.y = 0.2 * Math.sin(t * 1.3 + i); });
        const ck = s.propsA[0].userData.hand; ck.rotation.z = -U.clamp((t - R3(0) - 0.4) / 1.2) * PI / 2;
        s.propsA[1].userData.cells.forEach((cl, i) => { const lit = i < 3 && t > R3(1) + 0.5 + i * 0.25; cl.material = lit ? (cl.userData.mR || (cl.userData.mR = CK.mat(T, '#ff5f86'))) : (cl.userData.mG || (cl.userData.mG = CK.mat(T, '#e6e0f5'))); });
        s.propsA[2].userData.blocks.forEach((b, i) => { const k = U.easeBack(U.clamp((t - R3(2) - 0.3 - i * 0.3) / 0.35)); b.scale.set(Math.max(0.01, k), Math.max(0.01, k), Math.max(0.01, k)); });
        s.pedsA.forEach((p, i) => { const cur = on && t >= R3(i) && (i === 2 || t < R3(i + 1)); p.scale.y = cur ? 1.15 : 0.85; p.position.y = 0.5 * p.scale.y; }); }

      /* ---------- stage B: why ---------- */
      { const on = bt === 's5', p = on ? ph('s5', t) : 0, q = SP('s5', 0.55);
        const g = s.big; g.position.set(BX, 0.62, 0.15); g.scale.setScalar(g.userData.base); g.rotation.set(0, 0, 0); g.userData.setExpr(t < q ? 'cry' : 'happy'); g.userData.tick(t, { breath: t < q ? 0.7 : 0.35 });
        g.userData.arm1.rotation.z = t < q ? 1.9 + 0.2 * Math.sin(t * 8) : 0.5; g.userData['arm-1'].rotation.z = t < q ? -1.9 - 0.2 * Math.sin(t * 8 + 1) : -0.5; g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = t < q ? 0.3 : -0.12;
        g.userData.head.rotation.z = t < q ? 0.06 * Math.sin(t * 6) : 0;
        const ga = U.clamp((t - TM('s5', 1, 0.3)) / 0.4); s.gut.visible = on && ga > 0.01; s.gut.position.set(BX, 1.65, 1.15); s.gut.scale.setScalar(Math.max(0.01, U.easeBack(ga)) * 1.05); s.gut.rotation.set(0.4, t * 0.6, 0.2 * Math.sin(t * 3)); s.gut.material.color.set(t < q ? '#ff8f6b' : '#ffb38f');
        const da = U.clamp((t - TM('s5', 0, 0.12)) / 0.4); s.dial.visible = on && da > 0.01; s.dial.scale.setScalar(Math.max(0.01, U.easeBack(da))); s.dial.userData.notch.rotation.z = t < q ? -(PI * 0.6 + 0.12 * Math.sin(t * 9)) : U.lerp(-(PI * 0.6), PI * 0.35, U.easeIO(U.clamp((t - q) / 1.0)));
        s.dial.position.y = 4.4 + 0.08 * Math.sin(t * 2);
        s.waves.forEach((w, i) => { const a = ((t * 0.7 + i / 3) % 1); w.visible = on && t < q; w.scale.setScalar(1.1 + a * 1.4); w.material.opacity = 0.8 * (1 - a); w.rotation.y = 0; }); }

      /* ---------- stage C: bars ---------- */
      { const on = bt === 's6', p = on ? ph('s6', t) : t > end('s6') ? 1 : 0;
        s.bars.forEach((b, i) => { const k = U.easeOut(U.clamp((p - 0.06 - i * 0.12) / 0.28)); b.scale.y = Math.max(0.01, BH(BARV[i]) * k);
          const g = s.tops[i]; g.visible = on && k > 0.05; g.position.set(b.position.x, b.scale.y, 0.15); g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(k * 1.4)))); g.userData.setExpr(i === 1 ? 'cry' : i === 2 ? 'happy' : 'worried'); g.userData.tick(t, { wave: i === 2 && p > 0.5 }); if (i === 1) g.position.y += Math.abs(Math.sin(t * 8)) * 0.06; }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, nbA: s.nbA, nbB: s.nbB, nbD: s.nbD, lw: s.lw, big: s.big, tops: s.tops, bars: s.bars, propsA: s.propsA, dial: s.dial, gut: s.gut, jar: s.jar }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's3') return ['#b8ecdf', '#fff4e6']; if (b === 's5') return ['#ddd0ff', '#fff4e6']; if (b === 's6') return ['#ffd1e3', '#fff4e6']; if (b === 's7') return ['#3a3570', '#6a4a80']; return ['#ffe0c8', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = lw || 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = Math.min(1, a); g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; const bx = U.clamp(x, 70 + LD * 2.2 + w / 2, 1010 - LD * 3 - w / 2); rr(bx - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, bx, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const tag = (str, x, y, size, a, border) => { if (a <= 0) return; g.save(); g.globalAlpha = Math.min(1, a); g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, 'rgba(255,255,255,.93)', border || '#ff8fab', 5); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      /* small canvas icons, centred at (cx, cy), ~70 px */
      const ICON = {
        bottle: (cx, cy) => { rr(cx - 20, cy - 18, 40, 52, 12, '#ffffff', '#5ab8ff', 5); g.fillStyle = '#fff3c4'; g.fillRect(cx - 15, cy + 2, 30, 28); rr(cx - 14, cy - 30, 28, 14, 5, '#ff8fab'); g.fillStyle = '#ffc94d'; g.beginPath(); g.ellipse(cx, cy - 38, 9, 11, 0, 0, 7); g.fill(); },
        diaper: (cx, cy) => { g.fillStyle = '#ffffff'; g.strokeStyle = '#79dcb4'; g.lineWidth = 5; g.beginPath(); g.moveTo(cx - 34, cy - 20); g.lineTo(cx + 34, cy - 20); g.quadraticCurveTo(cx + 30, cy + 26, cx, cy + 30); g.quadraticCurveTo(cx - 30, cy + 26, cx - 34, cy - 20); g.fill(); g.stroke(); g.fillStyle = '#ff8fab'; g.fillRect(cx - 34, cy - 24, 68, 10); },
        therm: (cx, cy) => { rr(cx - 9, cy - 36, 18, 56, 9, '#ffffff', '#ff5f86', 4); g.fillStyle = '#ff5f86'; g.fillRect(cx - 4, cy - 12, 8, 30); g.beginPath(); g.arc(cx, cy + 26, 15, 0, 7); g.fill(); },
        moon: (cx, cy) => { g.fillStyle = '#ffc94d'; g.beginPath(); g.arc(cx, cy, 30, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,1)'; g.beginPath(); g.arc(cx + 14, cy - 10, 26, 0, 7); g.fill(); plain('z', cx + 22, cy + 18, 26, '#7a5fe0', 800, 'center'); },
        finger: (cx, cy) => { rr(cx - 14, cy - 36, 28, 70, 14, '#ffd6bd', '#e8a07a', 4); g.strokeStyle = '#6b4a3a'; g.lineWidth = 3.5; for (let k = 0; k < 2; k++) { g.beginPath(); g.ellipse(cx, cy - 4 + k * 10, 19, 5, 0, 0, 7); g.stroke(); } g.beginPath(); g.moveTo(cx + 18, cy + 2); g.quadraticCurveTo(cx + 40, cy + 10, cx + 34, cy + 34); g.stroke(); },
        wrap: (cx, cy) => { g.fillStyle = '#c9b6ff'; g.beginPath(); g.ellipse(cx, cy + 8, 26, 30, 0, 0, 7); g.fill(); g.fillStyle = '#ffd6bd'; g.beginPath(); g.arc(cx, cy - 24, 17, 0, 7); g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 5; g.beginPath(); g.moveTo(cx - 22, cy - 2); g.lineTo(cx + 20, cy + 18); g.stroke(); },
        side: (cx, cy) => { g.fillStyle = '#ffd6bd'; rr(cx - 36, cy + 4, 72, 18, 9, '#ffd6bd', '#e8a07a', 3); g.fillStyle = '#ffa6c6'; g.beginPath(); g.ellipse(cx + 2, cy - 8, 26, 14, 0, 0, 7); g.fill(); g.fillStyle = '#ffd6bd'; g.beginPath(); g.arc(cx - 28, cy - 12, 13, 0, 7); g.fill(); },
        shh: (cx, cy) => { g.strokeStyle = '#5ab8ff'; g.lineWidth = 6; g.lineCap = 'round'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(cx - 20, cy, 14 + k * 14, -0.7, 0.7); g.stroke(); } plain('ชู่ว', cx - 10, cy + 2, 22, '#3a2f3f', 800, 'center'); },
        rock: (cx, cy) => { g.strokeStyle = '#ff8fab'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy - 34, 50, PI * 0.3, PI * 0.7); g.stroke(); for (const s2 of [-1, 1]) { const ex = cx + s2 * 30, ey = cy + 6; g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex - s2 * 4, ey - 16); g.moveTo(ex, ey); g.lineTo(ex - s2 * 17, ey + 3); g.stroke(); } },
        paci: (cx, cy) => { g.fillStyle = '#8fd3ff'; g.beginPath(); g.ellipse(cx, cy, 30, 20, 0, 0, 7); g.fill(); g.strokeStyle = '#5ab8ff'; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy + 26, 14, 0, 7); g.stroke(); g.fillStyle = '#fff3c4'; g.beginPath(); g.arc(cx, cy - 14, 10, 0, 7); g.fill(); },
      };
      const chipRow = (L, icons, starts, cur, y0, checks) => { const n = L.length, cw = REEL ? 164 : 184, gap = REEL ? 10 : 14, x0 = 540 - (n * cw + (n - 1) * gap) / 2 - (REEL ? 15 : 0);
        L.forEach((s2, i) => { const a = U.clamp((t - starts[i]) / 0.3); if (a <= 0) return; const x = x0 + i * (cw + gap), cx = x + cw / 2, on = i === cur, lift = on ? 12 : 0; g.save(); g.globalAlpha = a * (cur >= 0 && !on && checks !== true ? 0.75 : 1); rr(x, y0 - lift, cw, 196, 28, on ? '#fff0f5' : 'rgba(255,255,255,.92)', on ? '#ff5f86' : '#ffc2d4', on ? 7 : 4); ICON[icons[i]](cx, y0 + 66 - lift); plain(s2, cx, y0 + 156 - lift, Math.round(32 * LF), '#3a2f3f', 700, 'center');
          if (checks === true) { const c = U.clamp((t - starts[i] - 0.35) / 0.25); if (c > 0) { g.globalAlpha = a * c; g.beginPath(); g.arc(x + cw - 22, y0 + 20, 20, 0, 7); g.fillStyle = '#2fbf71'; g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + cw - 31, y0 + 20); g.lineTo(x + cw - 24, y0 + 28); g.lineTo(x + cw - 12, y0 + 12); g.stroke(); } } g.restore(); }); };
      const C = S.C;

      if (b === 'cover') { const [x, y] = wp(S.nbA, 0, 0.75); bubble('อุแว้ๆๆๆ!', x + 150, y - 420, 1, 46); }
      if (b === 's1') { const q = SP('s1', 0.5); const [x, y] = wp(C.yai.userData.head, 0, 0.95); bubble('หลานเห็นผีแน่ๆ!', x + 60, y - 70, U.clamp((t - at('s1') - 1.0) / 0.25) * U.clamp((q - t) / 0.25), 44); }
      if (b === 's2') {
        chipRow(['หิว', 'ผ้าอ้อม', 'ร้อน/หนาว', 'ง่วงเกิน', 'อะไรรัด'], ['bottle', 'diaper', 'therm', 'moon', 'finger'], [0, 1, 2, 3, 4].map(C2), -1, 500, true);
      }
      if (b === 's3') { for (let i = 0; i < 3; i++) { const a = U.clamp((t - R3(i) - 0.2) / 0.35); if (a <= 0) continue; const [x, y] = proj(new T.Vector3(PXA_(i), 4.05, 0)); const r = 54 * U.easeBack(a); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ['#ff5f86', '#7a5fe0', '#3f8fe8'][i]; g.fill(); g.lineWidth = 6; g.strokeStyle = '#ffffff'; g.stroke(); txt('3', x, y + 3, 64 * U.easeBack(a), '#ffffff', 800);
          const [lx, ly] = proj(new T.Vector3(PXA_(i), 0.5, 1.3)); tag(['ชม./วัน', 'วัน/สัปดาห์', 'สัปดาห์'][i], lx, ly, Math.round(40 * LF), a, ['#ff5f86', '#7a5fe0', '#3f8fe8'][i]); } }
      if (b === 's4') { const q = SP('s4', 0.5); const a0 = U.clamp((t - at('s4') - 0.4) / 0.3) * U.clamp((q - t) / 0.25);
        if (a0 > 0) { const x0 = 120 + LD, x1 = 960 - LD, y0 = 520, hx = (h) => x0 + (h - 6) / 18 * (x1 - x0); g.save(); g.globalAlpha = a0; const gr = g.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, '#ffe08a'); gr.addColorStop(0.55, '#ffb36b'); gr.addColorStop(0.75, '#b07be8'); gr.addColorStop(1, '#4a55b8'); rr(x0, y0, x1 - x0, 64, 32, gr, '#ffffff', 5);
          const k = U.easeOut(U.clamp((t - at('s4') - 0.9) / 0.8)); rr(hx(17), y0 - 10, (hx(24) - hx(17)) * k, 84, 42, 'rgba(255,95,134,.35)', '#ff5f86', 6);
          [[6, '6:00'], [12, '12:00'], [18, '18:00'], [24, '24:00']].forEach(([h, l]) => plain(l, hx(h), y0 + 104, 28, '#5a3550', 600, 'center'));
          g.fillStyle = '#ffd23f'; g.beginPath(); g.arc(x0 + 36, y0 + 32, 18, 0, 7); g.fill(); g.fillStyle = '#fff3b0'; g.beginPath(); g.arc(x1 - 36, y0 + 32, 18, 0, 7); g.fill(); g.fillStyle = '#4a55b8'; g.beginPath(); g.arc(x1 - 28, y0 + 26, 15, 0, 7); g.fill(); g.restore();
          if (k > 0.5) tag('ร้องหนักช่วงนี้', (hx(17) + hx(24)) / 2, y0 - 48, 34, (k - 0.5) * 2 * a0, '#ff5f86'); }
        if (t > q) { const [x, y] = wp(S.nbA, 0.6, 0.55); tag('ลม', x + 70, y - 60, 34, U.clamp((t - q - 0.4) / 0.3), '#5ab8ff'); } }
      if (b === 's5') { const q = SP('s5', 0.55); let [x, y] = wp(S.dial, 0, 1.15); tag('ระบบประสาท', x, y - 10, Math.round(38 * LF), U.clamp((t - TM('s5', 0, 0.12) - 0.3) / 0.3), '#3f8fe8');
        [x, y] = wp(S.gut, 1.15, -0.1); tag('ลำไส้', x + 30, y, Math.round(38 * LF), U.clamp((t - TM('s5', 1, 0.3) - 0.3) / 0.3), '#ff8f6b'); }
      if (b === 's6') { const p = ph('s6', t), q = SP('s6', 0.55);
        const aL = U.clamp((q - t) / 0.3);
        S.bars.forEach((bar, i) => { const k = U.clamp((p - 0.06 - i * 0.12) / 0.28); if (k <= 0.3 || aL <= 0) return; const [x, y] = proj(new T.Vector3(bar.position.x, bar.scale.y + 1.15, 0.2)); g.save(); g.globalAlpha = U.clamp((k - 0.3) / 0.3) * aL; txt(BARL[i], x, y - 30, Math.round((i === 1 ? 44 : 38) * LF), i === 1 ? '#ffd35e' : '#ffffff', 800); g.restore(); const [x2, y2] = proj(new T.Vector3(bar.position.x, bar.scale.y * 0.5, 0.7)); tag(BARW[i], x2, y2, Math.round(30 * LF), U.clamp((k - 0.3) / 0.3) * aL, ['#ffb3c9', '#ff5f86', '#79dcb4'][i]); });
        const a1 = U.clamp((t - q - 0.2) / 0.3); if (a1 > 0) { const n = 5, sp = REEL ? 150 : 170, x0 = 540 - (n - 1) * sp / 2 - (REEL ? 15 : 0), y0 = REEL ? 640 : 680; g.save(); g.globalAlpha = a1; rr(x0 - 100, y0 - 92, (n - 1) * sp + 200, 184, 40, 'rgba(255,255,255,.92)', '#ff8fab', 5);
          for (let i = 0; i < n; i++) { const cx = x0 + i * sp, cry = i === 2, pop = U.easeBack(U.clamp((t - q - 0.3 - i * 0.12) / 0.3)), r = 52 * pop; if (r <= 0) continue; g.beginPath(); g.arc(cx, y0, r, 0, 7); g.fillStyle = cry ? '#ffb3c9' : '#ffe6d6'; g.fill(); g.lineWidth = 5; g.strokeStyle = cry ? '#ff5f86' : '#ffc2a8'; g.stroke(); g.fillStyle = '#3a2f3f'; for (const s2 of [-1, 1]) { g.beginPath(); if (cry) { g.lineWidth = 5; g.strokeStyle = '#3a2f3f'; g.moveTo(cx + s2 * 18 - 8, y0 - 10); g.lineTo(cx + s2 * 18 + 8, y0 - 6); g.stroke(); } else { g.arc(cx + s2 * 17, y0 - 8, 6 * pop, 0, 7); g.fill(); } } g.beginPath(); if (cry) { g.ellipse(cx, y0 + 20, 13 * pop, 10 * pop, 0, 0, 7); g.fillStyle = '#3a2f3f'; g.fill(); g.fillStyle = '#5ab8ff'; g.beginPath(); g.arc(cx + 30, y0 + 8, 8, 0, 7); g.fill(); } else { g.lineWidth = 5; g.strokeStyle = '#3a2f3f'; g.arc(cx, y0 + 6, 16 * pop, 0.2 * PI, 0.8 * PI); g.stroke(); } g.fillStyle = '#ff6f9f'; g.beginPath(); g.arc(cx, y0 - 44 * pop, 9 * pop, 0, 7); g.fill(); }
          g.restore(); } }
      if (b === 's7') { const p = ph('s7', t), a0 = U.clamp((p - 0.04) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 500, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['ไข้ 38°C ขึ้นไป ในเด็กไม่ถึง 3 เดือน', 'ซึม ปลุกยาก หรือร้องเสียงแหลมผิดปกติ', 'ไม่ยอมกินนม', 'อาเจียนสีเขียว หรืออุจจาระมีเลือด', 'หายใจลำบาก ตัวซีดหรือเขียว'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 392 + i * 78; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(118 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 118 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 160 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = U.clamp((t - TM('s7', 4, 0.5) - 0.5) / 0.3); plain('ฉุกเฉิน โทร 1669', 540, 795, 38, '#ffd35e', 800, 'center'); g.restore(); }
      if (b === 's8') { let cur = -1; for (let i = 0; i < 5; i++) if (t >= S8(i)) cur = i;
        chipRow(['ห่อตัว', 'อุ้มตะแคง', 'เสียงชู่ว', 'โยกเบาๆ', 'ให้ดูด'], ['wrap', 'side', 'shh', 'rock', 'paci'], [0, 1, 2, 3, 4].map(S8), cur, 520, false);
        if (cur === 2) { const [x, y] = wp(C.mom.userData.head, 0, 1.0); bubble('ชู่ววว…', x - 40, y - 60, U.clamp((t - S8(2) - 0.2) / 0.25), 42); } }
      if (b === 's9') { const q = SP('s9', 0.55); let [x, y] = wp(C.yai.userData.head, 0, 0.95); bubble('ป้อนน้ำผึ้งสิ หายร้อง', x + 80, y - 70, U.clamp((t - at('s9') - 0.8) / 0.25) * U.clamp((P('s9', 0.32) - t) / 0.25), 40);
        const ax = U.clamp((t - P('s9', 0.32)) / 0.25) * U.clamp((q - t) / 0.3); if (ax > 0) { [x, y] = wp(S.jar, 0, 0.1); const r = 78 * U.easeBack(Math.min(1, ax * 1.2)); g.save(); g.globalAlpha = ax; g.lineWidth = 16; g.strokeStyle = '#ff3b5c'; g.lineCap = 'round'; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.beginPath(); g.moveTo(x - r * 0.68, y + r * 0.68); g.lineTo(x + r * 0.68, y - r * 0.68); g.stroke(); g.restore(); } }
      if (b === 's10') { if (t > Q10a + 1.6 && t < Q10b) { let [x, y] = wp(C.mom.userData.head, 0, 1.0); x = U.clamp(x, 240 + LD, 840 - LD); const k = U.clamp((t - Q10a - 1.6) / (Q10b - Q10a - 1.6)); g.save(); g.globalAlpha = U.clamp((t - Q10a - 1.6) / 0.3) * U.clamp((Q10b - t) / 0.3); rr(x - 170, y - 112, 340, 84, 42, 'rgba(255,255,255,.93)', '#79dcb4', 6); g.lineWidth = 6; g.strokeStyle = '#2fbf71'; g.beginPath(); g.arc(x - 122, y - 70, 22, -PI / 2, -PI / 2 + PI * 2 * k); g.stroke(); plain('พัก 10–15 นาที', x + 28, y - 68, 34, '#3a2f3f', 700, 'center'); g.restore(); }
        if (t >= Q10b) { const [x, y] = wp(C.dad.userData.head, 0, 1.0); bubble('เดี๋ยวพ่ออุ้มเอง', x + 40, y - 60, U.clamp((t - Q10b - 0.9) / 0.25), 40); } }
      if (b === 's11') { const p = ph('s11', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, REEL ? 398 : 455, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['เช็กหิว ผ้าอ้อม ร้อนหนาว ก่อน', 'จดเวลาที่ลูกร้อง ไว้ให้หมอดู', 'ห่อตัว โยก ชู่ว ลองทีละอย่าง', 'ห้ามเขย่า ไม่ไหว วางลงแล้วพัก', 'ผลัดกันเลี้ยง ให้แม่ได้นอน'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s11', i, 0.1 + i * 0.16)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s11', i, 0.1 + i * 0.16)) / 0.3); if (a <= 0) return; const y = 380 + i * (REEL ? 72 : 84) - (REEL ? 8 : 0); g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - (REEL ? 32 : 36), 912 - 2 * LD, REEL ? 64 : 72, 32, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(39 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
      if (b === 's12') { const [x, y] = wp(C.wawa.userData.head, 0, 0.8); bubble('หนูหายร้องแล้ว!', x - 60, y - 60, U.clamp((t - at('s12') - 1.0) / 0.3), 38); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 290, instant: true, lines: [[74, ['ลูกร้องไม่หยุด', '#fff']], [56, ['ไม่รู้ร้องเพราะอะไร', '#fff']], [80, ['หรือเป็นโคลิก?', '#ffd35e']]], foot: 'ย้อนไปตอนน้องวาวาอายุ 6 สัปดาห์' },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[58, ['ร้องทุกเย็น ไม่มีสาเหตุ', '#fff']], [52, ['คนสมัยก่อนเรียก "เด็กเห็นผี"', '#ffd35e']]], foot: 'ย้อนไปตอนน้องวาวาอายุ 6 สัปดาห์' },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[56, ['ไม่ใช่ผี หมอเรียกว่า', '#fff']], [80, ['"โคลิก"', '#ffd35e']]], foot: 'ที่มา: โรงพยาบาลเมดพาร์ค' },
      { t0: at('s2') + 0.2, t1: Q2, y: 270, lines: [[58, ['ร้องไม่หยุด เช็ก 5 อย่างก่อน', '#ffd35e']], [42, ['รวมถึงเส้นผมพันนิ้วมือนิ้วเท้า เสื้อรัด', '#fff', 600]]], foot: 'ที่มา: AAP HealthyChildren' },
      { t0: Q2 + 0.02, t1: end('s2') - 0.05, y: 270, lines: [[54, ['แก้ครบแล้ว ยังร้องเป็นชั่วโมง', '#fff']], [58, ['แบบนี้ทุกเย็น อาจเป็นโคลิก', '#ffd35e']]] },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[58, ['กฎ 3-3-3 สังเกตโคลิก', '#ffd35e']], [44, ['ร้องเกิน 3 ชม./วัน · 3 วัน/สัปดาห์ · นาน 3 สัปดาห์', '#fff', 600]], [42, ['ทั้งที่ลูกกินได้ น้ำหนักขึ้นดี', '#ffe3ea', 600]]], foot: 'ที่มา: Wessel 1954, AAFP 2015' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[58, ['มักร้องหนักช่วงเย็น–ค่ำ', '#ffd35e']], [44, ['หน้าแดง กำมือ ขาคู้ เหมือนเจ็บ', '#fff', 600]]], foot: 'ที่มา: AAFP 2004, MSD Manual' },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[54, ['ท้องป่อง ผายลมบ่อย?', '#fff']], [52, ['มักเพราะกลืนลมตอนร้อง', '#ffd35e']], [44, ['เป็นผลของการร้อง ไม่ใช่ต้นเหตุ', '#ffe3ea', 600]]], foot: 'ที่มา: MSD Manual' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.55), y: 290, lines: [[56, ['ทำไมเป็นโคลิก? ยังไม่รู้แน่ชัด', '#fff']], [48, ['หมอเชื่อว่าเกี่ยวกับระบบประสาท', '#ffd35e']], [48, ['และลำไส้ที่ยังพัฒนาไม่เต็มที่', '#ffd35e']]], foot: 'ที่มา: StatPearls (NIH)' },
      { t0: SP('s5', 0.55) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[56, ['ไม่ใช่เพราะพ่อแม่เลี้ยงผิด', '#ffd35e']], [46, ['หายได้เอง ไม่มีผลเสียระยะยาว', '#fff', 600]]], foot: 'ที่มา: Merck Manual 2025' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.55), y: 270, lines: [[54, ['ทารกทั่วไป ร้องวันละ ~2 ชม.', '#fff']], [56, ['พีคที่ 6 สัปดาห์ แล้วค่อยๆ ลดลง', '#ffd35e']]], foot: 'ที่มา: Wolke 2017, J Pediatr (ทารก ~8,700 คน)' },
      { t0: SP('s6', 0.55) + 0.02, t1: end('s6') - 0.05, y: 270, lines: [[60, ['โคลิก ราว 1 ใน 5', '#ffd35e']], [46, ['หายภายใน 3 เดือน 60% · 4 เดือน 90%', '#fff', 600]]], foot: 'ที่มา: AAP, StatPearls (NIH)' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[58, ['ไม่ใช่โคลิก! พบแพทย์ทันที ถ้า…', '#ffd35e']]], foot: 'ที่มา: NHS, AAP' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 280, lines: [[58, ['ปลอบแบบนี้ ลองทีละอย่าง', '#ffd35e']], [40, ['ห่อตัว: เลิกเมื่อลูกเริ่มพลิกตัว', '#fff', 600]], [40, ['หลับแล้ว วางนอนหงายเสมอ', '#fff', 600]]], foot: 'ที่มา: AAP' },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.55), y: 290, lines: [[60, ['ห้ามน้ำผึ้ง ก่อน 1 ขวบ', '#ffd35e']], [44, ['เสี่ยงโรคโบทูลิซึมในทารก', '#fff', 600]]], foot: 'ที่มา: AAP, CDC' },
      { t0: SP('s9', 0.55) + 0.02, t1: end('s9') - 0.05, y: 290, lines: [[50, ['ยาขับลม งานวิจัยพบว่า', '#fff']], [52, ['ได้ผลไม่ต่างจากยาหลอก', '#ffd35e']], [42, ['ยาหรือโปรไบโอติกใดๆ ปรึกษาแพทย์ก่อน', '#ffe3ea', 600]]], foot: 'ที่มา: AAFP 2015' },
      { t0: at('s10') + 0.2, t1: Q10a, y: 290, lines: [[48, ['ร้องไม่หยุด คือเหตุอันดับ 1', '#fff']], [48, ['ที่ทำให้คนเผลอเขย่าเด็ก', '#fff']], [62, ['ห้ามเขย่า เด็ดขาด', '#ffd35e']]], foot: 'ที่มา: AAP, National Center on Shaken Baby Syndrome' },
      { t0: Q10a + 0.02, t1: Q10b, y: 290, lines: [[54, ['ไม่ไหว วางลูกนอนหงายในเปลโล่ง', '#ffd35e']], [44, ['ออกไปหายใจลึกๆ 10–15 นาที แล้วกลับมาดู', '#fff', 600]]], foot: 'ที่มา: AAP HealthyChildren' },
      { t0: Q10b + 0.02, t1: end('s10') - 0.05, y: 290, lines: [[58, ['สลับเวรกับคนในบ้าน', '#ffd35e']], [44, ['เครียด เศร้านาน โทรสายด่วน 1323', '#fff', 600]]] },
      { t0: at('s11') + 0.2, t1: end('s11') - 0.05, y: 250, lines: [[56, ['5 ทิป รับมือลูกร้องไม่หยุด', '#ffd35e']]] },
      { t0: at('s12') + 0.2, t1: end('s12'), y: 290, lines: [[56, ['ลูกร้อง ไม่ได้แปลว่าเราเลี้ยงไม่เก่ง', '#fff']], [52, ['ส่วนใหญ่ดีขึ้นเอง ราว 3–4 เดือน', '#ffd35e']], [38, ['ลูกคุณร้องหนักช่วงกี่โมง? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AAP, NHS, StatPearls, Wolke 2017, AAFP' },
    ],
    trans,
    audio: [
      [0.2, 'wah'], [1.3, 'wah'],
      [at('s1') + 0.3, 'whoosh'], [at('s1') + 1.0, 'boing'], [at('s1') + 1.6, 'wah'], [SP('s1', 0.5), 'pop'], [SP('s1', 0.5) + 0.4, 'shimmer'],
      ...[0, 1, 2, 3, 4].map((i) => [C2(i), 'pop']), ...[0, 1, 2, 3, 4].map((i) => [C2(i) + 0.4, 'tick']), [Q2, 'warn'], [Q2 + 0.5, 'wah'],
      [R3(0), 'boing'], [R3(0) + 0.5, 'tick'], [R3(1), 'boing'], [R3(1) + 0.6, 'ding'], [R3(2), 'boing'], [R3(2) + 0.4, 'pop'], [R3(2) + 0.7, 'pop'], [R3(2) + 1.0, 'pop'],
      [at('s4') + 0.4, 'wah'], [at('s4') + 1.0, 'riser'], [SP('s4', 0.5) + 0.3, 'bubble'], [SP('s4', 0.5) + 0.9, 'bubble'], [SP('s4', 0.5) + 1.5, 'bubble'],
      [at('s5') + 0.3, 'wah'], [TM('s5', 0, 0.12), 'pop'], [TM('s5', 1, 0.3), 'pop'], [SP('s5', 0.55), 'shimmer'], [SP('s5', 0.55) + 0.4, 'giggle'],
      [at('s6') + 0.6, 'riser'], [at('s6') + 1.2, 'pop'], [at('s6') + 2.2, 'pop'], [at('s6') + 3.2, 'pop'], [SP('s6', 0.55) + 0.3, 'pop'], [SP('s6', 0.55) + 0.9, 'ding'],
      [at('s7') + 0.3, 'heartbeat'], ...[0, 1, 2, 3, 4].map((i) => [TM('s7', i, 0.1 + i * 0.1), 'tick']), [P('s7', 0.7), 'heartbeat'], [P('s7', 0.82), 'warn'],
      ...[0, 1, 2, 3, 4].map((i) => [S8(i), i === 4 ? 'twinkle' : 'pop']), [S8(2) + 0.3, 'breath'], [S8(4) + 0.6, 'shimmer'],
      [at('s9') + 0.3, 'whoosh'], [at('s9') + 0.9, 'boing'], [P('s9', 0.32), 'warn'], [SP('s9', 0.55), 'pop'],
      [at('s10') + 0.3, 'wah'], [at('s10') + 1.3, 'heartbeat'], [Q10a, 'whoosh'], [Q10a + 1.8, 'breath'], [Q10a + 2.8, 'breath'], [Q10b, 'whoosh'], [Q10b + 0.9, 'twinkle'],
      ...[0, 1, 2, 3, 4].map((i) => [TM('s11', i, 0.1 + i * 0.16), i ? 'tick' : 'ding']),
      [at('s12') + 0.3, 'twinkle'], [at('s12') + 0.8, 'giggle'], [at('s12') + 1.4, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s5'), CK.MUSIC.CUTE), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.OOPS), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.CUTE), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), at('s11'), CK.MUSIC.OOPS), CK.musicBed(at('s11'), at('s12'), CK.MUSIC.CUTE), CK.musicBed(at('s12'), DUR - 1.5, CK.MUSIC.WARM)],
  });
  function PXA_(i) { return [AX - 3.1, AX, AX + 3.1][i]; }
})();
