/* พ่อแม่หัวจะปวด — ลูกเลือกกิน อมข้าว ไม่ยอมกินผัก (อม 40 นาที + เขี่ยผัก → 3 สาเหตุอมข้าว → กลไกปาก: ลิ้น→ฟันกราม / กระเป๋าแก้ม, ฟันกราม ADA 13–19 / 23–33 ด.
   → อาหารหยาบหลัง 9 ด. Coulthard 2009 → ลิ้นเด็กไวขม 64 vs 43% Mennella 2005 → อมนาน: ฟันผุ + สำลัก → พบแพทย์ถ้า (night) → มื้อ 20–30 นาที + ปิดจอ
   → ช่วยทำอาหาร +76% van der Horst 2014 → 5 ทิป → ปิด)
   Build: node build.js luk-om-khao.js review-luk-om-khao.html --kit clay --title "ลูกเลือกกิน อมข้าว ไม่กินผัก" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.0], ['s1', 7], ['s2', 7.5], ['s3', 8], ['s4', 8], ['s5', 8], ['s6', 6.5], ['s7', 8.5], ['s8', 8.5], ['s9', 8], ['s10', 8.5], ['s11', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, PY = REEL ? 40 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's11'; };
  const MQ = DATA.vo ? 0.45 : 1, MU = (o) => Object.assign({}, o, { mv: o.mv * MQ, bv: (o.bv || 0) * MQ, shk: (o.shk || 0) * MQ });
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const tx = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };

  /* ---- layout ---- */
  const MX = 60, R = 1.9;                              // mouth stage
  const PD = [117.6, 120.0, 122.4];                     // 3 causes pedestals
  const BX = [178.2, 180.0, 181.8], BV = [12.1, 69.8, 18.1]; // lumpy-food bars
  const TX = 241.3;                                     // tooth stage
  const KX = -60;                                       // kitchen stage
  const RA = REEL ? 0.6 : 0, RB = REEL ? 0.5 : 0;
  const CLOSE = (dx, dz) => ({ pos: [dx, 6.6, 26 - (dz || 0)], look: [dx, 3.0, 0], fov: 29 });
  const SH = {
    cover: [FW(0.25, -1.0, 7.0, 3.8 - RA, 0.18), FW(0.3, -1.0, 6.8, 3.8 - RA, 0.18)],
    s1: [FW(0.3, -1.0, 7.4, 3.8 - RA, 0.2), FW(0.3, -1.0, 7.1, 3.8 - RA, 0.2)],
    s2: [FW(120, 0, REEL ? 8.2 : 7.0, 2.9 - RB, 0.1), FW(120, 0, REEL ? 8.0 : 6.8, 2.9 - RB, 0.1)],
    s3: [{ pos: [MX, 23.6, 13.6], look: [MX, 0.3, REEL ? -0.6 : -1.2], fov: 29 }, { pos: [MX, 22.8, 13.1], look: [MX, 0.3, REEL ? -0.6 : -1.2], fov: 29 }],
    s4: [FW(180, 0, 7.0, 4.4 - RB, 0.1), FW(180, 0, 6.8, 4.4 - RB, 0.1)],
    s5: [FW(0.0, -0.9, 7.0, 3.8 - RA, 0.2), FW(0.0, -0.9, 6.8, 3.8 - RA, 0.2)],
    s6: [FW(240.2, 0, 6.3, 3.4 - RB, 0.12), FW(240.2, 0, 6.1, 3.4 - RB, 0.12)],
    s7: [FW(0.1, -1.0, 7.2, 3.8 - RA, 0.2), FW(0.1, -1.0, 7.0, 3.8 - RA, 0.2)],
    s8: [FW(0.3, -1.0, 7.4, 3.8 - RA, 0.2), FW(0.3, -1.0, 7.1, 3.8 - RA, 0.2)],
    s9: [FW(KX, 0, 6.2, 3.3 - RB, 0.12), FW(KX, 0, 6.0, 3.3 - RB, 0.12)],
    s10: [FW(0, 0.2, 7.8, 4.0, 0.22), FW(0, 0.2, 7.6, 4.0, 0.22)],
    s11: [CLOSE(0.2), CLOSE(0, 1.2)],
  };
  const CUT = new Set(['s2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), VH = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };
  const pv = (x, y, z) => proj(VH.set(x, y, z));

  VE.registerSfx('crunch', (t) => { for (let i = 0; i < 3; i++) VE.audio.noise(t + i * 0.11, 0.06, { type: 'highpass', f: 2500, vol: 0.14 }); });
  VE.registerSfx('gulp', (t) => { VE.audio.tone(t, 320, 0.16, { f2: 140, vol: 0.14 }); VE.audio.tone(t + 0.12, 260, 0.12, { f2: 120, vol: 0.1 }); });
  VE.registerSfx('clockt', (t) => { for (let i = 0; i < 4; i++) VE.audio.tone(t + i * 0.22, 1800, 0.03, { vol: 0.07 }); });

  VE.run({
    DUR, file: 'luk-om-khao', title: 'ลูกเลือกกิน อมข้าว ไม่กินผัก', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'กินอยู่ของลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const add = (o, x, y, z) => { o.position.set(x, y, z); scene.add(o); return o; };
      const face = (g, r, z, col) => { for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r * 0.16, 10, 8), M(col || '#3a2f3f')); e.scale.set(1, 1.3, 0.5); e.position.set(s * r * 0.36, r * 0.12, z); g.add(e); const b = new T.Mesh(new T.SphereGeometry(r * 0.13, 8, 6), M('#ff9eb5')); b.scale.set(1.3, 0.7, 0.3); b.position.set(s * r * 0.6, -r * 0.12, z * 0.92); g.add(b); } };
      /* prop builders */
      const riceBall = (r) => { const g = new T.Group(); g.add(new T.Mesh(new T.SphereGeometry(r, 22, 16), M('#fffaf0'))); for (let i = 0; i < 9; i++) { const gr = new T.Mesh(new T.SphereGeometry(r * 0.16, 6, 5), M('#ffffff')); const a = i * 2.4, b = (i % 3) * 0.6 + 0.3; gr.scale.set(1.6, 0.8, 0.8); gr.position.set(Math.cos(a) * Math.sin(b) * r, Math.cos(b) * r, Math.sin(a) * Math.sin(b) * r * 0.7 - r * 0.2); gr.rotation.z = a; g.add(gr); } face(g, r, r * 0.95); return g; };
      const broc = (sc) => { const g = new T.Group(); const st = new T.Mesh(new T.CylinderGeometry(0.07, 0.1, 0.4, 10), M('#8fdc6a')); st.position.y = 0.2; g.add(st); for (const [x, y, z, r] of [[0, 0.5, 0, 0.2], [-0.17, 0.42, 0.05, 0.16], [0.17, 0.43, 0.04, 0.16], [0, 0.42, 0.15, 0.15], [0, 0.44, -0.13, 0.15]]) { const b = new T.Mesh(new T.SphereGeometry(r, 12, 10), M('#2f9e55')); b.position.set(x, y, z); g.add(b); } g.scale.setScalar(sc || 1); return g; };
      const plate = (r) => { const g = new T.Group(); const p = new T.Mesh(new T.CylinderGeometry(r, r * 0.8, 0.07, 32), M('#fff6ea')); const rim = new T.Mesh(new T.TorusGeometry(r * 0.95, 0.035, 8, 32), M('#5ab8ff')); rim.rotation.x = PI / 2; rim.position.y = 0.04; g.add(p, rim); return g; };
      const spoon = () => { const g = new T.Group(); const h = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.6, 8), M('#5ab8ff')); h.position.y = 0.1; const b = new T.Mesh(new T.SphereGeometry(0.13, 12, 8), M('#5ab8ff')); b.scale.set(1, 0.35, 1.3); b.position.y = 0.42; const r = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), M('#fffaf0')); r.position.y = 0.47; g.add(h, b, r); return g; };
      const bottle = () => { const g = new T.Group(); const b = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.62, 18), M('#ffffff')); b.position.y = 0.31; const m = new T.Mesh(new T.CylinderGeometry(0.185, 0.185, 0.36, 18), M('#fff1c9')); m.position.y = 0.2; const c = new T.Mesh(new T.CylinderGeometry(0.21, 0.21, 0.1, 18), M('#ff9ec0')); c.position.y = 0.66; const n = new T.Mesh(new T.ConeGeometry(0.11, 0.24, 14), M('#ffc94d')); n.position.y = 0.82; g.add(b, m, c, n); return g; };
      const cookie = () => { const g = new T.Group(); const b = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.08, 20), M('#d99a55')); b.rotation.x = PI / 2; g.add(b); for (const [x, y] of [[-0.09, 0.09], [0.1, 0.04], [0, -0.1]]) { const d = new T.Mesh(new T.SphereGeometry(0.04, 8, 6), M('#6b3d1f')); d.position.set(x, y, 0.05); g.add(d); } return g; };
      const tablet = (w, h) => { const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(w, h, 0.1), M('#3a4a8a')); const scr = new T.Mesh(new T.PlaneGeometry(w * 0.86, h * 0.8), new T.MeshBasicMaterial({ color: '#7fd6ff' })); scr.position.z = 0.056; g.add(b, scr); const stars = []; for (let i = 0; i < 3; i++) { const s = new T.Mesh(new T.CircleGeometry(h * 0.09, 5), new T.MeshBasicMaterial({ color: ['#ffd23f', '#ff6f91', '#ffffff'][i] })); s.position.set((i - 1) * w * 0.25, 0, 0.06); g.add(s); stars.push(s); } g.userData.scr = scr; g.userData.stars = stars; return g; };
      const meat = () => { const g = new T.Group(); const m = new T.Mesh(new T.DodecahedronGeometry(0.42, 0), M('#b5683a')); m.scale.set(1.25, 0.85, 1); g.add(m); face(g, 0.42, 0.38, '#2a1a12'); return g; };
      const stage = (cx, floorC, wallA, wallB) => { const pl = new T.Mesh(new T.BoxGeometry(20, 0.3, 12), M(floorC)); pl.position.set(cx, -0.15, 0); scene.add(pl); const bw = new T.Mesh(new T.BoxGeometry(20, 10, 0.3), M('#ffffff', { map: dots(wallA, wallB, [9, 4]) })); bw.position.set(cx, 4.6, -3.6); scene.add(bw); return { pl, bw }; };

      /* ===== stage 0: dining room (x = 0) ===== */
      const room = CK.room(T, { wall: '#bfe6ff', dots: 'rgba(255,255,255,0.85)', wain: '#ffb86b', floor: '#e9b483', rug: '#ff9ec0', winX: -3.2 }); scene.add(room);
      const roomCol = { wall: room.userData.wall.material.color.clone(), floor: room.userData.floor.material.color.clone(), wain: room.userData.wain.material.color.clone() };
      const WHO = ['dad', 'mom', 'mama', 'nana', 'wawa'], c = {};
      for (const k of WHO) { const g = CK.family(T, k); g.userData.base = g.scale.x; g.visible = false; scene.add(g); c[k] = g; }
      /* nana's cheek pocket (rice held in the cheek) */
      const cheek = new T.Mesh(new T.SphereGeometry(0.31, 18, 14), M(CK.pal.skin[0])); cheek.position.set(0.5, -0.27, 0.44); c.nana.userData.headSpace.add(cheek);
      const cheekB = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M('#ff9eb5')); cheekB.scale.set(1.3, 0.7, 0.4); cheekB.position.set(0.62, -0.24, 0.7); c.nana.userData.headSpace.add(cheekB);
      const sala = CK.neighbor(T, 3, { scale: 1.05 }); sala.userData.base = 1.05; sala.visible = false; scene.add(sala);
      const vplate = plate(0.5); { const r = riceBall(0.16); r.position.set(-0.12, 0.17, 0.05); vplate.add(r); } scene.add(vplate);
      const greens = []; for (let i = 0; i < 4; i++) { const b = broc(0.42); scene.add(b); greens.push(b); }
      const sp = spoon(); scene.add(sp);
      const brocs = [broc(0.9), broc(0.9), broc(0.7), broc(0.7)]; brocs.forEach((b) => scene.add(b));
      const timer = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.3, 18, 14), M('#ff6f91')); b.scale.set(1, 0.85, 0.7); const f = new T.Mesh(new T.CircleGeometry(0.22, 24), new T.MeshBasicMaterial({ color: '#ffffff' })); f.position.z = 0.22; const k = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.12, 10), M('#ffd23f')); k.position.y = 0.3; timer.add(b, f, k); } scene.add(timer);
      const tv = tablet(2.0, 1.2); tv.position.set(2.75, 3.15, -4.15); scene.add(tv);
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(new T.SphereGeometry(0.13, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 3.4, Math.cos(i * 3.3) * 0.8 + 0.6, (i * 0.37) % 1]; scene.add(h); hearts.push(h); }

      /* ===== stage 1: mouth mechanism (x = 60) ===== */
      stage(MX, '#ff7fa8', '#ffd1e3', '#ffffff');
      const gumG = new T.TorusGeometry(R, 0.32, 14, 48, PI); gumG.rotateZ(PI); gumG.rotateX(-PI / 2);
      add(new T.Mesh(gumG, M('#ff6f96')), MX, 0.35, 0);
      const onArc = (a, y) => [MX + R * Math.cos(a), y, -R * Math.sin(a)];
      const teethM = M('#ffffff');
      for (let i = 0; i < 6; i++) { const a = 1.5 * PI + (i - 2.5) * 0.21; const tt = new T.Mesh(new T.SphereGeometry(0.15, 12, 10), teethM); tt.scale.set(1.0, 1.5, 0.7); const p = onArc(a, 0.82); tt.position.set(p[0], p[1], p[2]); tt.rotation.y = 1.5 * PI - a; scene.add(tt); }
      for (const s of [-1, 1]) { const a = 1.5 * PI + s * 0.82; const tt = new T.Mesh(new T.ConeGeometry(0.16, 0.42, 12), teethM); const p = onArc(a, 0.86); tt.position.set(p[0], p[1], p[2]); scene.add(tt); }
      const molars = []; for (const s of [-1, 1]) for (const da of [1.12, 1.4]) { const a = 1.5 * PI + s * da; const g = new T.Group(); const body = new T.Mesh(new T.SphereGeometry(0.27, 14, 10), M('#ffffff', { transparent: true, opacity: 1 })); body.scale.set(1.05, 0.8, 1.05); g.add(body); for (const [x, z] of [[-0.1, -0.1], [0.1, -0.1], [-0.1, 0.1], [0.1, 0.1]]) { const cu = new T.Mesh(new T.SphereGeometry(0.09, 8, 6), body.material); cu.position.set(x, 0.18, z); g.add(cu); } const p = onArc(a, 0.72); g.position.set(p[0], p[1], p[2]); g.userData.side = s; scene.add(g); molars.push(g); }
      const tongue = new T.Mesh(new T.SphereGeometry(1, 32, 20), M('#ff5f86')); tongue.scale.set(1.0, 0.3, 1.2); add(tongue, MX, 0.42, 0.1);
      const tgr = new T.Mesh(new T.BoxGeometry(0.05, 0.04, 1.4), M('#e8457a')); add(tgr, MX, 0.72, 0.15);
      const pockets = [-1, 1].map((s) => { const m = new T.Mesh(new T.SphereGeometry(0.62, 22, 16), M('#ffb3c6', { transparent: true, opacity: 0.5, depthWrite: false })); m.scale.set(0.75, 0.75, 1.05); add(m, MX + s * 2.55, 0.62, 0.5); return m; });
      const rb = riceBall(0.3); scene.add(rb);
      const grains = []; for (let i = 0; i < 7; i++) { const g = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), M('#fffaf0')); g.scale.set(1.6, 0.8, 0.8); scene.add(g); grains.push(g); }
      const sparks = []; for (let i = 0; i < 10; i++) { const s = new T.Mesh(new T.OctahedronGeometry(0.09, 0), M(i % 2 ? '#ffd23f' : '#ffffff', { emissive: '#ffd23f', emissiveIntensity: 0.4 })); scene.add(s); sparks.push(s); }

      /* ===== stage 2: three causes (x = 120) ===== */
      stage(120, '#ff7fa8', '#fff0b8', '#ffffff');
      PD.forEach((x, i) => { const g = new T.BoxGeometry(2.0, 0.9, 2.0); g.translate(0, 0.45, 0); add(new T.Mesh(g, M(['#ffb347', '#63c79b', '#6fa8ff'][i])), x, 0, 0); });
      const cMeat = meat(); cMeat.scale.setScalar(1.35); add(cMeat, PD[0], 1.5, 0.2);
      const cBot = bottle(); cBot.scale.setScalar(1.35); add(cBot, PD[1] - 0.35, 0.9, 0.2); const cCook = cookie(); cCook.scale.setScalar(1.35); add(cCook, PD[1] + 0.45, 1.35, 0.35);
      const cTab = tablet(1.25, 0.86); add(cTab, PD[2], 1.5, 0.2);

      /* ===== stage 3: lumpy-food bars (x = 180) ===== */
      stage(180, '#ff7fa8', '#d9f1ff', '#ffffff');
      const bars = BX.map((x, i) => { const b = CK.bar(T, 1.3, 1.3, ['#ff9ec0', '#2fbf71', '#ff6f91'][i]); add(b, x, 0, 0); b.scale.y = 0.01; return b; });

      /* ===== stage 4: tooth (x = 240) ===== */
      stage(240, '#ff7fa8', '#e6ddff', '#ffffff');
      const tooth = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.9, 28, 20), M('#ffffff')); b.scale.set(1.15, 0.95, 0.85); b.position.y = 1.95; tooth.add(b); for (const s of [-1, 1]) { const r = new T.Mesh(new T.ConeGeometry(0.34, 1.2, 14), M('#ffffff')); r.rotation.z = PI + s * 0.18; r.position.set(s * 0.45, 0.95, 0); tooth.add(r); } const fg = new T.Group(); fg.position.y = 1.95; face(fg, 0.9, 0.75); tooth.add(fg); const goo = new T.Mesh(new T.SphereGeometry(0.35, 14, 10), M('#fff1c9')); goo.scale.set(1.6, 0.55, 1.1); goo.position.set(0.2, 2.75, 0.15); tooth.add(goo); const spot = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), M('#8a6a3a')); spot.scale.set(1, 1, 0.3); spot.position.set(0.62, 2.35, 0.62); tooth.add(spot); tooth.userData.spot = spot; }
      add(tooth, TX, 0.0, 0);
      const bugs = []; for (let i = 0; i < 4; i++) { const v = CK.virus(T, { color: ['#b07cff', '#ffb347', '#7ad3a0', '#ff7a8a'][i] }); v.scale.setScalar(0.42); scene.add(v); bugs.push(v); }

      /* ===== stage 5: kitchen (x = -60) ===== */
      stage(KX, '#ff9f6e', '#c9f0dc', '#ffffff');
      { const ct = new T.Mesh(new T.BoxGeometry(5.2, 1.1, 1.1), M('#5ab8ff')); ct.position.set(KX, 0.55, -1.6); scene.add(ct); const top = new T.Mesh(new T.BoxGeometry(5.4, 0.14, 1.3), M('#ffd23f')); top.position.set(KX, 1.17, -1.6); scene.add(top); }
      const bowl = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.42, 20, 10, 0, PI * 2, PI / 2, PI / 2), M('#ff9ec0', { side: T.DoubleSide })); b.position.y = 0.42; bowl.add(b); for (const [x, z, col] of [[-0.15, 0, '#5fcf6a'], [0.12, 0.08, '#8fdc4a'], [0, -0.14, '#ff5f6d'], [0.16, -0.1, '#ffd23f'], [-0.08, 0.16, '#5fcf6a']]) { const l = new T.Mesh(new T.SphereGeometry(0.14, 10, 8), M(col)); l.scale.set(1.2, 0.6, 1); l.position.set(x, 0.42, z); bowl.add(l); } } scene.add(bowl);
      const leaf = new T.Mesh(new T.SphereGeometry(0.26, 14, 10), M('#5fcf6a')); leaf.scale.set(1.2, 0.35, 0.9); scene.add(leaf);
      const kbroc = [broc(0.8), broc(0.7)]; kbroc[0].position.set(KX - 1.8, 1.24, -1.5); kbroc[1].position.set(KX + 1.9, 1.24, -1.55); kbroc.forEach((b) => scene.add(b));

      return { key, hemi, room, roomCol, c, sala, cheek, cheekB, vplate, greens, sp, brocs, timer, tv, hearts, tongue, molars, pockets, rb, grains, sparks, cMeat, cBot, cCook, cTab, bars, tooth, bugs, bowl, leaf };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.c, st = {};
      const dn = danger(t); s.hemi.intensity = U.lerp(0.48, 0.3, dn); s.key.intensity = U.lerp(0.68, 0.42, dn);
      const rd = s.room.userData, NIGHT = new T.Color('#3a3a6a');
      rd.wall.material.color.copy(s.roomCol.wall).lerp(NIGHT, dn * 0.6); rd.floor.material.color.copy(s.roomCol.floor).lerp(NIGHT, dn * 0.5); rd.wain.material.color.copy(s.roomCol.wain).lerp(NIGHT, dn * 0.5);
      const def = (k, x, z, ex, ry, y) => (st[k] = { x, z, ex: ex || 'happy', ry: ry || 0, y: y || 0 });
      const hop = (f, a) => Math.abs(Math.sin(t * f)) * a;
      const v = new T.Vector3();
      const hold = (prop, g, hand, dx, dy, dz) => { g.updateMatrixWorld(true); g.userData[hand].getWorldPosition(v); prop.position.set(v.x + (dx || 0), v.y + (dy || 0), v.z + (dz || 0)); prop.visible = true; };
      [s.vplate, s.sp, s.timer, s.bowl, s.leaf].concat(s.greens, s.brocs).forEach((o) => (o.visible = false));
      let cheekOn = false;

      if (bt === 'cover' || bt === 's1') {
        const q = bt === 's1' && t >= SP('s1', 0.5);
        cheekOn = true;
        def('nana', -1.35, -0.6, q ? 'worried' : 'sleepy', 0.25);
        def('mama', 0.45, -0.4, q ? 'angry' : 'happy', -0.1, 0); st.mama.a1 = [0.75, -1.05];
        def('mom', 1.95, -1.4, 'worried', -0.3); st.mom.am = [-0.75, -1.0];
      } else if (bt === 's2') {
        /* props only */
      } else if (bt === 's4') {
      } else if (bt === 's5') {
        const q = t >= SP('s5', 0.5);
        def('dad', -1.35, -0.9, 'happy', 0.2); st.dad.a1 = [0.9, -1.05];
        def('mama', 1.2, -0.6, q ? 'worried' : 'sick', -0.2, q ? 0 : Math.sin(t * 30) * 0.02); st.mama.am = [-0.85, -1.05];
      } else if (bt === 's6') {
        const q = t >= SP('s6', 0.5); cheekOn = !q;
        def('nana', 238.6, 0.7, q ? 'happy' : 'worried', 0.35, q ? 0 : hop(8, 0.12));
      } else if (bt === 's7') {
        cheekOn = true;
        def('nana', -1.0, -0.6, 'sleepy', 0.25);
        def('mom', 1.2, -1.3, 'worried', -0.3); st.mom.am = [-0.5, -0.6];
      } else if (bt === 's8') {
        const q = t >= SP('s8', 0.5);
        def('mom', -1.65, -1.3, 'happy', 0.25); st.mom.a1 = [0.75, -1.05];
        def('nana', 0.55, -0.6, q ? 'giggle' : 'happy', -0.15, q ? hop(8, 0.1) : 0);
      } else if (bt === 's9') {
        const q = t >= SP('s9', 0.5);
        def('sala', KX - 1.35, 0.4, q ? 'happy' : 'giggle', 0.25, !q ? hop(7, 0.08) : 0); st.sala.a1 = [0.7, -1.05];
        def('mama', KX + 1.35, 0.4, q ? 'giggle' : 'happy', -0.25, q ? hop(8, 0.08) : 0); st.mama.am = [-0.75, -1.05];
      } else if (bt === 's10' || bt === 's11') {
        const g9 = bt === 's11', p = g9 ? ph('s11', t) : 0;
        def('mom', g9 ? -2.35 : -1.9, -0.7, 'happy', 0.12); def('dad', 1.95, -0.7, 'happy', -0.12);
        def('nana', -1.6, 1.4, g9 && p > 0.25 ? 'giggle' : 'happy', 0.1, g9 && p > 0.3 ? hop(8, 0.12) : 0); st.nana.a1 = g9 ? [0.7, -1.05] : [0.6, -1.0];
        def('mama', 0.0, 1.4, g9 ? 'giggle' : 'happy', 0, g9 ? hop(7, 0.1) : 0); st.mama.wave = g9 && p > 0.5;
        def('wawa', 1.45, 1.4, 'happy', -0.1);
        if (g9) st.mom.wave = p > 0.55;
      }
      s.cheek.visible = s.cheekB.visible = cheekOn;
      if (cheekOn) { const k = 1 + 0.06 * Math.sin(t * 2.2); s.cheek.scale.setScalar(k); }
      for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa', 'sala']) {
        const g = k === 'sala' ? s.sala : C[k], d = st[k]; if (!d) { g.visible = false; continue; }
        g.visible = true; g.position.set(d.x, d.y, d.z); g.rotation.y = d.ry + 0.04 * Math.sin(t * 0.8 + d.x); g.scale.setScalar(g.userData.base * (d.sc || 1));
        g.userData.setExpr(d.ex); g.userData.tick(t, { wave: !!d.wave });
        if (d.a1 && !d.wave) { g.userData.arm1.rotation.z = d.a1[0]; g.userData.arm1.rotation.x = d.a1[1]; }
        if (d.am) { g.userData['arm-1'].rotation.z = d.am[0]; g.userData['arm-1'].rotation.x = d.am[1]; }
      }
      /* ---- props ---- */
      if (bt === 'cover' || bt === 's1') {
        hold(s.sp, C.mom, 'hand-1', 0, 0.0, 0.2); s.sp.rotation.z = 0.5 + 0.08 * Math.sin(t * 2);
        hold(s.vplate, C.mama, 'hand1', 0.05, 0.08, 0.25);
        const q = bt === 's1' ? SP('s1', 0.5) : 1e9;
        s.greens.forEach((g, i) => { const t0 = q + 0.4 + i * 0.55, k = U.clamp((t - t0) / 0.9); g.visible = true; const bx = s.vplate.position.x + 0.2 - (i % 2) * 0.12, by = s.vplate.position.y + 0.04, bz = s.vplate.position.z + 0.12 - i * 0.06; if (k <= 0) g.position.set(bx, by, bz); else { g.position.set(bx + k * 0.9, by + Math.sin(k * PI) * 0.6 - k * k * 1.6, bz + k * 0.4); g.rotation.z = -k * 5; } g.visible = g.position.y > 0.1; });
      }
      /* mouth mechanism */
      { const on = bt === 's3', q = SP('s3', 0.5), p = on ? ph('s3', t) : 0;
        const mol = U.clamp((t - q - 0.2) / 0.6);
        s.molars.forEach((m) => { const k = on ? U.easeBack(mol) : 1; m.scale.set(1, Math.max(0.05, k), 1); m.children[0].material.opacity = on ? U.lerp(0.25, 1, mol) : 1; m.children[0].material.transparent = true; });
        const MP = [MX + R * Math.cos(1.5 * PI + 1.12), 1.0, -R * Math.sin(1.5 * PI + 1.12)], CP = [MX + 2.5, 0.68, 0.5], ST = [MX, 0.96, 0.75];
        let rp = ST, sq = 1;
        if (on && t < q) { const a = U.clamp((t - at('s3') - 0.5) / 1.4), b = U.clamp((t - at('s3') - 2.2) / 0.9); rp = [U.lerp(ST[0], MP[0], U.easeIO(a)) + (b > 0 ? (CP[0] - MP[0]) * U.easeIO(b) : 0), U.lerp(ST[1], MP[1], a) + (b > 0 ? (CP[1] - MP[1]) * b : 0) + Math.sin(a * PI) * 0.35, U.lerp(ST[2], MP[2], a) + (b > 0 ? (CP[2] - MP[2]) * b : 0)]; s.pockets[1].scale.set(0.75 + 0.25 * b, 0.75 + 0.2 * b, 1.05 + 0.2 * b); }
        else if (on) { const a = U.clamp((t - q - 0.7) / 0.7), c2 = U.clamp((t - q - 1.6) / 0.5); rp = [U.lerp(CP[0], MP[0], U.easeIO(a)), U.lerp(CP[1], MP[1] + 0.12, a) + Math.sin(a * PI) * 0.4, U.lerp(CP[2], MP[2], a)]; sq = 1 - 0.7 * c2; s.pockets[1].scale.set(1.0 - 0.25 * a, 0.95 - 0.2 * a, 1.25 - 0.2 * a); }
        s.rb.visible = on && sq > 0.32; s.rb.position.set(rp[0], rp[1], rp[2]); s.rb.scale.set(1 + (1 - sq) * 0.4, sq, 1 + (1 - sq) * 0.4); s.rb.rotation.y = on ? 0.2 * Math.sin(t * 3) : 0;
        const g0 = q + 2.2; s.grains.forEach((g, i) => { const k = (t - g0 - i * 0.12) / 1.6; g.visible = on && k > 0 && k < 1; if (!g.visible) return; g.position.set(U.lerp(MP[0] + Math.sin(i * 2) * 0.2, MX + Math.sin(i) * 0.25, k), 0.82 + 0.1 * Math.sin(k * PI), U.lerp(MP[2] + Math.cos(i * 2) * 0.2, -1.0, k)); g.rotation.z = k * 4 + i; });
        if (!on) s.pockets[1].scale.set(0.75, 0.75, 1.05);
        s.tongue.scale.set(1.0, 0.3 + 0.015 * Math.sin(t * 3), 1.2);
        s.sparks.forEach((spk, i) => { const k = (t - q - 0.2) / 1.2; spk.visible = on && k > 0 && k < 1; if (!spk.visible) return; const m = s.molars[i % 4]; spk.position.set(m.position.x + Math.cos(i * 2.4 + t * 2) * 0.45, m.position.y + 0.3 + k * 0.9, m.position.z + Math.sin(i * 2.4 + t * 2) * 0.45); spk.rotation.y = t * 3 + i; });
      }
      if (bt === 's2') { s.cMeat.rotation.y = 0.3 * Math.sin(t * 1.5); s.cMeat.position.y = 1.5 + 0.05 * Math.sin(t * 2.4); s.cBot.rotation.z = 0.08 * Math.sin(t * 2); s.cCook.rotation.z = 0.25 * Math.sin(t * 2.5); s.cCook.position.y = 1.35 + 0.06 * Math.sin(t * 3); s.cTab.rotation.y = 0.25 * Math.sin(t * 1.2); s.cTab.userData.stars.forEach((st2, i) => { st2.rotation.z = t * 2 + i; st2.scale.setScalar(1 + 0.25 * Math.sin(t * 6 + i * 2)); }); }
      if (bt === 's4') { const p = ph('s4', t); s.bars.forEach((b, i) => { const k = U.easeOut(U.clamp((t - TM('s4', i, 0.1 + i * 0.12)) / 0.8)); b.scale.y = Math.max(0.01, k * BV[i] / 69.8 * 3.0); }); }
      if (bt === 's5') { const q = t >= SP('s5', 0.5); hold(s.brocs[0], C.dad, 'hand1', 0.02, 0.05, 0.12); hold(s.brocs[1], C.mama, 'hand-1', -0.02, 0.05, 0.12); s.brocs[0].rotation.z = 0.15 * Math.sin(t * 3); s.brocs[1].rotation.z = -0.25 + 0.1 * Math.sin(t * 9) * (q ? 0.2 : 1); }
      if (bt === 's6') { const q = t >= SP('s6', 0.5); s.tooth.rotation.z = 0.04 * Math.sin(t * 2); s.tooth.position.y = 0.04 * Math.sin(t * 2.5); s.tooth.userData.spot.scale.setScalar(1 + 0.3 * U.clamp((t - at('s6') - 1.2) / 1.5)); s.bugs.forEach((b, i) => { b.visible = true; const a = t * 1.1 + i * PI / 2; b.position.set(TX + Math.cos(a) * 1.45, 2.3 + Math.sin(a * 1.3) * 0.5 + (i % 2) * 0.3, 0.55 + Math.sin(a) * 0.4); b.rotation.y = a; }); }
      else s.bugs.forEach((b) => (b.visible = false));
      if (bt === 's7') { hold(s.vplate, C.mom, 'hand-1', -0.05, 0.08, 0.25); }
      if (bt === 's8') { const q = t >= SP('s8', 0.5); hold(s.timer, C.mom, 'hand1', 0.05, 0.12, 0.22); s.timer.rotation.z = 0.1 * Math.sin(t * 4); s.tv.visible = true; const off = U.clamp((t - SP('s8', 0.5) - 0.8) / 0.4); s.tv.userData.scr.material.color.set(off > 0.5 ? '#2a2f4a' : '#7fd6ff'); s.tv.userData.stars.forEach((st2, i) => { st2.visible = off < 0.5; st2.rotation.z = t * 2 + i; }); }
      else s.tv.visible = false;
      if (bt === 's9') { const q = t >= SP('s9', 0.5); hold(s.bowl, s.sala, 'hand1', 0.05, -0.05, 0.25); hold(s.leaf, C.mama, 'hand-1', -0.02, 0.1, 0.15); s.leaf.rotation.z = 0.3 * Math.sin(t * 6); s.leaf.scale.set(1.2 - (q ? 0.25 * Math.abs(Math.sin(t * 3)) : 0), 0.35, 0.9); }
      if (bt === 's10') { hold(s.vplate, C.mom, 'hand1', 0.05, 0.08, 0.25); }
      if (bt === 's11') { hold(s.brocs[2], C.nana, 'hand1', 0.02, 0.1, 0.12); hold(s.brocs[3], C.mama, 'hand1', 0.02, 0.1, 0.12); s.brocs[2].rotation.z = 0.2 * Math.sin(t * 5); s.brocs[3].rotation.z = 0.2 * Math.sin(t * 4 + 1); }
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s11') - 0.4 - u[2] * 1.5) / 3.2; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.0, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { c: s.c, sala: s.sala, molars: s.molars, pockets: s.pockets, cMeat: s.cMeat, cBot: s.cBot, cTab: s.cTab, tooth: s.tooth, tv: s.tv, bars: s.bars }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's7') return ['#3a3570', '#6a4a80']; if (b === 's2' || b === 's3' || b === 's4' || b === 's6' || b === 's9') return ['#ffe8f0', '#fff4e6']; return ['#d9f1ff', '#ffe8f0']; },
    danger,
    hud(g, t) {
      if (!CAMR) return; const b = beatAt(t), D = window.__dbg, S = D && D.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, tail) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 38px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2 - (REEL ? 80 : 0)); rr(x - w / 2, y - 38, w, 76, 38, '#ffffff', '#ff8fab'); const tx = x + (tail || 0); g.beginPath(); g.moveTo(tx - 14, y + 36); g.lineTo(tx + 4, y + 66); g.lineTo(tx + 18, y + 36); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, 38, '#3a2f3f', 700, 'center'); g.restore(); };
      const badge = (x, y, ok, a, r0) => { g.save(); g.globalAlpha = a; const r = (r0 || 30) * (0.85 + 0.15 * U.easeBack(Math.min(1, a))); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#2fbf71' : '#ff4f6a'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = 8; g.lineCap = 'round'; const u = r / 30; g.beginPath(); if (ok) { g.moveTo(x - 13 * u, y + 1); g.lineTo(x - 4 * u, y + 11 * u); g.lineTo(x + 14 * u, y - 11 * u); } else { g.moveTo(x - 11 * u, y - 11 * u); g.lineTo(x + 11 * u, y + 11 * u); g.moveTo(x + 11 * u, y - 11 * u); g.lineTo(x - 11 * u, y + 11 * u); } g.stroke(); g.restore(); };
      const card = (x, y, w, l1, l2, a, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; const h = l2 ? 104 : 64; rr(x - w / 2, y - h, w, h, 22, 'rgba(255,255,255,.94)', col || '#ff8fab'); plain(l1, x, y - h + 32, 34, col === '#2fbf71' ? '#1f9a58' : '#ff4f7a', 800, 'center'); if (l2) plain(l2, x, y - 30, 29, '#3a2f3f', 600, 'center'); g.restore(); };
      const clock = (x, y, r, frac, a, label) => { g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = '#ffffff'; g.fill(); g.lineWidth = 7; g.strokeStyle = '#ff8fab'; g.stroke(); g.beginPath(); g.moveTo(x, y); g.arc(x, y, r - 10, -PI / 2, -PI / 2 + frac * 2 * PI); g.closePath(); g.fillStyle = 'rgba(255,111,145,.35)'; g.fill(); g.lineCap = 'round'; g.lineWidth = 6; g.strokeStyle = '#3a2f3f'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(-PI / 2 + frac * 2 * PI) * (r - 16), y + Math.sin(-PI / 2 + frac * 2 * PI) * (r - 16)); g.stroke(); g.beginPath(); g.arc(x, y, 6, 0, 7); g.fillStyle = '#3a2f3f'; g.fill(); if (label) { rr(x - 95, y + r + 12, 190, 60, 30, '#ff6f91'); plain(label, x, y + r + 43, 34, '#ffffff', 800, 'center'); } g.restore(); };
      const list = (L, y0, step, tmId, f0, df, a0, dark) => { let cur = -1; for (let i = 0; i < L.length; i++) if (t >= TM(tmId, i, f0 + i * df)) cur = i; L.forEach((s2, i) => { const a = U.clamp((t - TM(tmId, i, f0 + i * df)) / 0.3); if (a <= 0) return; const y = y0 + PY + i * step; g.save(); g.globalAlpha = a0 * a; if (!dark && i === cur) rr(84 + LD, y - 34, 912 - 2 * LD, 68, 34, '#ffd6e4'); g.beginPath(); g.arc(128 + LD, y, 26, 0, 7); g.fillStyle = dark ? '#ff5f6d' : i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 128 + LD, y + 2, 31, '#ffffff', 800, 'center'); plain(s2, 170 + LD, y + 2, Math.round((dark ? 35 : 37) * LF), dark ? '#ffffff' : '#3a2f3f', dark ? 600 : i === cur ? 800 : 600); g.restore(); }); };

      if (b === 'cover' || b === 's1') {
        const q = b === 's1' ? SP('s1', 0.5) : 1e9;
        const [nx, ny] = wp(S.c.nana.userData.head, 0.95);
        if (b === 'cover') { bubble('อึ๊บ…', nx - 10, ny - 40, 1, 10); }
        else if (t < q) { const a = U.clamp((t - at('s1') - 0.2) / 0.3) * U.clamp((q - t) / 0.3), m = Math.round(U.lerp(0, 40, U.easeIO(U.clamp((t - at('s1') - 0.4) / (q - at('s1') - 1.0))))); clock(nx + 150, ny - 150, 66, m / 60, a, m + ' นาที'); bubble('อึ๊บ…', nx - 70, ny - 40, a, 40); }
        else { const [mx, my] = wp(S.c.mama.userData.head, 0.95); bubble('ผักขม ไม่เอา!', mx + 20, my - 40, U.clamp((t - q - 0.2) / 0.3) * U.clamp((end('s1') - 0.15 - t) / 0.3), -10); }
      }
      if (b === 's2') {
        [[S.cMeat, 'ชิ้นใหญ่ แข็งไป', 'เคี้ยวไม่ไหว', 0.9], [S.cBot, 'อิ่มนม/ขนม', 'ก่อนมื้อ ไม่หิว', 1.05], [S.cTab, 'ใจอยู่ที่จอ', 'ลืมเคี้ยว ลืมกลืน', 0.75]].forEach(([o, l1, l2, dy], i) => { const a = U.clamp((t - TM('s2', i, 0.12 + i * 0.22)) / 0.3); if (a <= 0) return; const [x, y] = pv(PD[i], 2.35, 0.2); card(U.clamp(x, (REEL ? 226 : 170), REEL ? 824 : 910), y, REEL ? 270 : 300, (i + 1) + '. ' + l1, l2, a); });
      }
      if (b === 's3') {
        const q = SP('s3', 0.5), a0 = U.clamp((t - at('s3') - 0.3) / 0.3);
        const tag = (str, x, y, a, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '800 34px Kanit,sans-serif'; const w = g.measureText(str).width + 36; x = U.clamp(x, 50 + LD + w / 2, 1030 - LD - w / 2 - (REEL ? 60 : 0)); rr(x - w / 2, y - 28, w, 56, 28, col || '#ffffff'); plain(str, x, y + 2, 34, col ? '#ffffff' : '#ff4f7a', 800, 'center'); g.restore(); };
        { const [x, y] = pv(MX, 0.8, -0.6); tag('ลิ้น', x, y, a0 * U.clamp((end('s3') - 0.2 - t) / 0.3)); }
        { const m = S.molars[2]; const [x, y] = pv(m.position.x, 0.6, m.position.z + 1.0); tag(t < q ? 'ฟันกราม (ยังไม่ขึ้น)' : 'ฟันกราม', x - 60, REEL ? Math.min(y + 30, 1205) : y + 30, a0, t < q ? null : '#2fbf71'); }
        { const [x, y] = pv(MX + 2.55, 1.3, -0.3); tag('กระเป๋าแก้ม', x - 40, y - 40, a0 * U.clamp((q - t) / 0.3)); }
      }
      if (b === 's4') {
        const q = MK.s4 && MK.s4.length > 3 ? TM('s4', 3, 0) - 1.2 : SP('s4', 0.5), qi = MK.s4 && MK.s4.length > 4 ? TM('s4', 4, 0) + 0.5 : q + 2.2;
        if (t < q) BX.forEach((x, i) => { const a = U.clamp((t - TM('s4', i, 0.1 + i * 0.12) - 0.5) / 0.3) * U.clamp((q - t) / 0.3); if (a <= 0) return; const h = BV[i] / 69.8 * 3.0, [px, py] = pv(x, h + 0.15, 0.65); const n = Math.round(BV[i] * U.clamp((t - TM('s4', i, 0.1 + i * 0.12)) / 0.8)); card(U.clamp(px, 175 + LD, 905 - LD), REEL ? Math.min(py, 1235) : py, 250, n + ' ใน 100', ['ก่อน 6 เดือน', '6–9 เดือน', 'หลัง 9 เดือน'][i], a, i === 1 ? '#2fbf71' : '#ff8fab'); });
        else { const a0 = U.clamp((t - q) / 0.35); g.save(); g.globalAlpha = a0; rr(80 + LD, 440 + PY, 920 - 2 * LD, 330, 30, 'rgba(255,255,255,.95)', '#ff8fab');
          plain('ตอน 7 ขวบ · กลุ่มเริ่ม "หลัง 9 เดือน"', 540, 482 + PY, 34, '#3a2f3f', 800, 'center'); g.restore();
          [['มีปัญหาการกิน มากกว่า', 0.25], ['กินผักผลไม้น้อยกว่า ครบ 10 หมวด', 0.55]].forEach(([s2, f], i) => { const a = U.clamp((t - (MK.s4 && MK.s4.length > 3 ? TM('s4', 3 + i, 0) : q + 0.4 + i * 1.0)) / 0.3); if (a <= 0) return; const y = 550 + PY + i * 72; badge(140 + LD, y, false, a0 * a, 24); g.save(); g.globalAlpha = a0 * a; plain(s2, 180 + LD, y + 2, Math.round(36 * LF), '#3a2f3f', 700); g.restore(); });
          const a2 = U.clamp((t - qi) / 0.4); for (let i = 0; i < 10; i++) { const cx = 175 + LD + i * ((730 - 2 * LD) / 9), cy = 708 + PY, dim = U.clamp((t - qi - 0.2 - i * 0.12) / 0.3); g.save(); g.globalAlpha = a0 * a2 * (1 - 0.6 * dim); g.beginPath(); g.arc(cx, cy, 25, 0, 7); g.fillStyle = i % 2 ? '#ff9a3c' : '#4fb86a'; g.fill(); g.restore(); }
        }
      }
      if (b === 's5') {
        const q = SP('s5', 0.5);
        if (t < q) {
          const gauge = (o, val, lab) => { const [x, y] = wp(o.userData.head, 0.2); const gx = U.clamp(x + 150, 120 + LD, 960 - LD - (REEL ? 60 : 0)), gy = y - 120, a = U.clamp((t - at('s5') - 0.5) / 0.3) * U.clamp((q - t) / 0.3), f = val * U.easeOut(U.clamp((t - at('s5') - 0.8) / 1.0)); g.save(); g.globalAlpha = a; rr(gx - 34, gy - 120, 68, 240, 34, '#ffffff', '#3a2f3f'); const fh = 220 * f; rr(gx - 24, gy + 110 - fh, 48, fh, 24, f > 0.6 ? '#2f9e55' : '#8fdc6a'); plain('ขม', gx, gy - 148, 32, '#3a2f3f', 800, 'center'); g.restore(); };
          gauge(S.c.dad, 0.3); gauge(S.c.mama, 0.92);
          const [mx, my] = wp(S.c.mama.userData.head, 0.95); bubble('ขมมม!', mx - 120, my - 40, U.clamp((t - at('s5') - 1.6) / 0.3) * U.clamp((q - t) / 0.3), 60);
        } else { const a0 = U.clamp((t - q) / 0.35); g.save(); g.globalAlpha = a0; rr(80 + LD, 440 + PY, 920 - 2 * LD, 300, 30, 'rgba(255,255,255,.95)', '#ff8fab');
          plain('ยีนรับรสขมแบบเดียวกัน · รับรสขมจางๆ ได้', 540, 484 + PY, 32, '#3a2f3f', 700, 'center'); g.restore();
          [['เด็ก', 64, '#2f9e55'], ['ผู้ใหญ่', 43, '#ff9ec0']].forEach(([n, val, col], i) => { const a = U.clamp((t - (MK.s5 && MK.s5.length > 1 ? TM('s5', i, 0) : q + 0.4 + i * 0.7)) / 0.3); if (a <= 0) return; const y = 560 + PY + i * 92, k = U.easeOut(U.clamp((t - q - 0.5 - i * 0.7) / 1.0)), W = 560 - 2 * LD; g.save(); g.globalAlpha = a0 * a; plain(n, 130 + LD, y + 2, 38, '#3a2f3f', 800); rr(270 + LD, y - 30, W, 60, 30, '#f6e7ee'); rr(270 + LD, y - 30, Math.max(60, W * val / 100 * k), 60, 30, col); plain(Math.round(val * k) + '%', 270 + LD + Math.max(60, W * val / 100 * k) + 16, y + 2, 40, '#3a2f3f', 800); g.restore(); });
        }
      }
      if (b === 's6') {
        const q = SP('s6', 0.5);
        if (t < q) { const [x, y] = pv(TX + 0.95, 3.2, 0.6); const a = U.clamp((t - at('s6') - 1.0) / 0.3) * U.clamp((q - t) / 0.3); if (a > 0) { g.save(); g.globalAlpha = a; txt('กรด!', Math.min(x, 860 - LD), y - 10, 46, '#ffd35e', 800); g.restore(); } }
        else [['อม + วิ่ง / หัวเราะ', 'เสี่ยงสำลัก', false], ['นั่งกิน เคี้ยวแล้วกลืน', 'ปลอดภัยกว่า', true]].forEach(([l1, l2, ok], i) => { const a = U.clamp((t - (MK.s6 && MK.s6.length > 1 ? TM('s6', i, 0) : q + 0.3 + i * 0.9)) / 0.3); if (a <= 0) return; const X = [300, 780][i] + (REEL ? [30, -60][i] : 0), W = 400; g.save(); g.globalAlpha = a; rr(X - W / 2, 470 + PY, W, 150, 26, 'rgba(255,255,255,.95)', ok ? '#2fbf71' : '#ff8fab'); plain(l1, X, 510 + PY, 33, '#3a2f3f', 700, 'center'); plain(l2, X, 556 + PY, 30, ok ? '#1f9a58' : '#ff4f7a', 800, 'center'); g.restore(); badge(X, 470 + PY, ok, a, 24); });
      }
      if (b === 's7') {
        const p = ph('s7', t), a0 = MK.s7 ? U.clamp((t - TM('s7', 0, 0) + 0.7) / 0.4) : U.clamp((p - 0.04) / 0.07);
        g.save(); g.globalAlpha = a0; rr(56 + LD, 318 + PY, 968 - 2 * LD, 440, 30, 'rgba(25,18,50,.7)', 'rgba(255,120,150,.9)'); g.restore();
        list(['น้ำหนัก ส่วนสูง ไม่ขึ้น หรือลดลง', 'กินได้ไม่ถึง ~20 อย่าง / ไม่กินทั้งหมวด', 'ขย้อน สำลัก บ่อยตอนเคี้ยว-กลืน', 'อาหารนิ่มๆ ก็ยังเคี้ยวไม่ได้', 'กลัวการกิน ร้องหนักทุกมื้อ'], 368, 70, 's7', 0.1, 0.13, a0, true);
        g.save(); g.globalAlpha = a0; plain('ที่มา: ASHA · ARFID vs picky eating (Equip)', 540, 728 + PY, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      if (b === 's8') {
        const q = SP('s8', 0.5);
        if (t < q) { const a = U.clamp((t - at('s8') - 0.4) / 0.3) * U.clamp((q - t) / 0.3), m = 30 * U.easeIO(U.clamp((t - at('s8') - 0.6) / 2.4)); clock(REEL ? 700 : 760, 560 + PY, 96, m / 60, a, '20–30 นาที'); const a2 = U.clamp((t - at('s8') - 3.0) / 0.3) * U.clamp((q - t) / 0.3); if (a2 > 0) { g.save(); g.globalAlpha = a2; rr(130 + LD, 500 + PY, 380, 120, 26, 'rgba(255,255,255,.95)', '#2fbf71'); plain('ครบเวลา เก็บจาน', 320 + LD, 540 + PY, 34, '#1f9a58', 800, 'center'); plain('ไม่ดุ ไม่ต้องหมดจาน', 320 + LD, 584 + PY, 29, '#3a2f3f', 600, 'center'); g.restore(); } }
        else { const [x, y] = pv(2.75, 3.95, -4.15); const a = U.clamp((t - q - 0.8) / 0.3); if (a > 0) { badge(Math.min(x, 880 - LD), y - 10, false, a, 34); g.save(); g.globalAlpha = a; txt('ปิดจอ', Math.min(x, 880 - LD) - 150, y - 6, 44, '#ffffff', 800); g.restore(); } }
      }
      if (b === 's9') {
        const q = SP('s9', 0.5);
        if (t < q) { const [x, y] = wp(S.sala.userData.head, 1.1); const a = U.clamp((t - at('s9') - 0.6) / 0.3) * U.clamp((q - t) / 0.3), k = U.easeOut(U.clamp((t - at('s9') - 0.8) / 1.4)); if (a > 0) { g.save(); g.globalAlpha = a; rr(x - 140 + 60, y - 150, 280, 120, 28, '#2fbf71'); plain('+' + Math.round(76 * k) + '%', x + 60, y - 106, 52, '#ffffff', 800, 'center'); plain('กินสลัดมากขึ้น', x + 60, y - 56, 28, '#ffffff', 600, 'center'); g.restore(); } }
        else ['ล้างผัก', 'ฉีกผัก', 'เลือกผักลงจาน'].forEach((n, i) => { const a = U.clamp((t - TM('s9', i, 0.6 + i * 0.1)) / 0.3); if (a <= 0) return; const W = [200, 200, 290][i], X = [190, 420, 720][i] + (REEL ? [30, 20, -40][i] : 0); g.save(); g.globalAlpha = a; rr(X - W / 2, 480 + PY, W, 84, 42, 'rgba(255,255,255,.95)', '#2fbf71'); plain(n, X, 524 + PY, 36, '#1f9a58', 800, 'center'); g.restore(); });
      }
      if (b === 's10') {
        const p = ph('s10', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320 + PY, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        list(['มื้อละ 20–30 นาที ครบแล้วเก็บ ไม่ดุ', 'นม ขนม ห่างมื้ออย่างน้อย 2 ชม.', 'ชิ้นเล็ก นิ่มพอดีกับฟันของลูก', 'ผักชิ้นจิ๋ว วางคู่ของที่ลูกชอบ', 'ปิดจอ กินพร้อมหน้า ให้ลูกช่วยทำ'], 380, 84, 's10', 0.1, 0.17, a0, false);
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[78, ['ลูกอมข้าวแก้มตุ่ย', '#fff']], [62, ['ผักเขี่ยทิ้งเกลี้ยง ทำไงดี?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[60, ['อมข้าวไว้ข้างแก้ม', '#fff']], [46, ['ผ่านไป 40 นาที ยังไม่กลืนสักคำ', '#ffe3ea', 600]]] },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[60, ['ส่วนผัก ', '#fff'], ['เขี่ยออกขอบจาน', '#ffd35e']], [46, ['พ่อแม่หัวจะปวด ทุกมื้อ', '#ffe3ea', 600]]] },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 280, lines: [[60, ['อมข้าว มักมาจาก 3 เรื่อง', '#ffd35e']], [46, ['ไม่ใช่ลูกดื้อเสมอไป', '#fff', 600]]], foot: 'UH Rainbow Babies · Michigan Medicine' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.5), y: 280, lines: [[58, ['ลิ้นต้องส่งข้าวไปบดที่ฟันกราม', '#fff']], [46, ['เคี้ยวไม่ไหว ข้าวเลยไปค้างในแก้ม', '#ffd35e', 600]]] },
      { t0: SP('s3', 0.5) + 0.02, t1: end('s3') - 0.05, y: 280, lines: [[58, ['ฟันกรามซี่แรก ', '#fff'], ['13–19 เดือน', '#ffd35e']], [46, ['ครบชุดราว 2–3 ขวบ ค่อยๆ เคี้ยวเก่งขึ้น', '#ffe3ea', 600]]], foot: 'American Dental Association (ADA)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 280, lines: [[58, ['เด็ก 7,821 คน', '#ffd35e']], [46, ['เริ่มกินอาหารเป็นชิ้น/หยาบ ตอนกี่เดือน?', '#fff', 600]]], foot: 'Coulthard et al. 2009 · ALSPAC อังกฤษ' },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 280, lines: [[58, ['เริ่มช้า หลัง 9 เดือน', '#ffd35e']], [46, ['พบความเชื่อมโยงกับ "กินยาก" ตอนโต', '#fff', 600]]], foot: 'Coulthard 2009 · แนะนำเริ่มอาหารหยาบ 6–9 เดือน (WHO)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 280, lines: [[60, ['ผักเดียวกัน แต่ลูก "ขม" กว่า', '#ffd35e']], [46, ['ลิ้นเด็กไวต่อรสขมกว่าผู้ใหญ่', '#fff', 600]]], foot: 'Mennella & Bobowski 2015' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 280, lines: [[56, ['ไม่ใช่ลูกเรื่องมาก', '#fff']], [46, ['ความไวขมจะลดลงเองเมื่อโตเป็นวัยรุ่น', '#ffd35e', 600]]], foot: 'Mennella et al. 2005 (Pediatrics)' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 280, lines: [[58, ['อมนาน แป้งค้างในปาก', '#fff']], [46, ['เชื้อโรคเปลี่ยนเป็นกรด ฟันผุได้', '#ffd35e', 600]]], foot: 'Johns Hopkins Medicine' },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 250 + PY, lines: [[56, ['อมแล้ววิ่ง ยิ่งอันตราย', '#ffd35e']]], foot: 'คำแนะนำป้องกันสำลักในเด็ก (Krames)' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 238 + PY, lines: [[54, ['ไม่ใช่แค่เลือกกิน ถ้า… พบหมอ', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 280, lines: [[58, ['จับเวลา มื้อละ 20–30 นาที', '#ffd35e']], [46, ['ลูกรู้ว่ามื้อมีเวลาจบ', '#fff', 600]]], foot: 'Michigan Medicine · UH Rainbow Babies' },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 280, lines: [[58, ['ปิดจอ ตอนกินข้าว', '#ffd35e']], [46, ['ดูไปกินไป พบความเชื่อมโยงกับกินผักน้อยลง', '#fff', 600]]], foot: 'Avery et al. 2017 (systematic review)' },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.5), y: 280, lines: [[58, ['ให้ลูกช่วยทำอาหาร', '#ffd35e']], [46, ['ทำเอง กินผักมากขึ้น', '#fff', 600]]], foot: 'van der Horst et al. 2014 (Appetite) · เด็ก 6–10 ขวบ' },
      { t0: SP('s9', 0.5) + 0.02, t1: end('s9') - 0.05, y: 280, lines: [[58, ['เด็กเล็ก ช่วยงานง่ายตามวัย', '#ffd35e']], [46, ['ได้จับ ได้ดม ได้คุ้นกับผัก', '#fff', 600]]] },
      { t0: at('s10') + 0.2, t1: end('s10') - 0.05, y: 250 + PY, lines: [[58, ['5 ทิป ลูกอมข้าว ไม่กินผัก', '#ffd35e']]] },
      { t0: at('s11') + 0.2, t1: end('s11'), y: 280, lines: [[56, ['ไม่ต้องหมดจาน', '#fff']], [56, ['ขอแค่ได้ลองทีละคำ', '#ffd35e']], [40, ['ลูกคุณอมข้าวนานสุดกี่นาที? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: ADA, Coulthard 2009, Mennella 2005, van der Horst 2014' },
    ],
    trans,
    audio: [
      ...(DATA.vo ? [] : [[0.4, 'boing']]),
      [at('s1') + 0.4, 'clockt'], [at('s1') + 1.6, 'clockt'], [P('s1', 0.35), 'tick'], [SP('s1', 0.5), 'whoosh'], [SP('s1', 0.5) + 0.4, 'pop'], [SP('s1', 0.5) + 0.95, 'pop'], [SP('s1', 0.5) + 1.5, 'pop'], [SP('s1', 0.5) + 2.05, 'pop'],
      [TM('s2', 0, 0.12), 'thud'], [TM('s2', 1, 0.34), 'pop'], [TM('s2', 2, 0.56), 'boing'],
      [at('s3') + 0.6, 'whoosh'], [at('s3') + 2.3, 'bubble'], [at('s3') + 2.8, 'boing'], [SP('s3', 0.5) + 0.2, 'shimmer'], [SP('s3', 0.5) + 0.8, 'whoosh'], [SP('s3', 0.5) + 1.6, 'crunch'], [SP('s3', 0.5) + 2.4, 'gulp'],
      [TM('s4', 0, 0.1), 'pop'], [TM('s4', 1, 0.22), 'ding'], [TM('s4', 2, 0.34), 'pop'], [SP('s4', 0.5), 'whoosh'], [SP('s4', 0.5) + 0.4, 'thud'], [SP('s4', 0.5) + 1.4, 'thud'],
      [at('s5') + 0.8, 'riser'], [at('s5') + 1.7, 'warn'], [SP('s5', 0.5), 'whoosh'], [SP('s5', 0.5) + 0.5, 'tick'], [SP('s5', 0.5) + 1.2, 'tick'],
      [at('s6') + 0.5, 'buzz'], [at('s6') + 1.1, 'warn'], [SP('s6', 0.5) + 0.3, 'thud'], [SP('s6', 0.5) + 1.2, 'ding'],
      [at('s7') + 0.3, 'heartbeat'], [TM('s7', 0, 0.1), 'tick'], [TM('s7', 1, 0.23), 'tick'], [TM('s7', 2, 0.36), 'tick'], [TM('s7', 3, 0.49), 'tick'], [TM('s7', 4, 0.62), 'tick'], [P('s7', 0.78), 'heartbeat'],
      [at('s8') + 0.6, 'clockt'], [at('s8') + 3.0, 'ding'], [SP('s8', 0.5) + 0.8, 'pop'], [SP('s8', 0.5) + 1.1, 'ding'],
      [at('s9') + 0.5, 'giggle'], [at('s9') + 0.8, 'riser'], [at('s9') + 2.2, 'ding'], [TM('s9', 0, 0.6), 'pop'], [TM('s9', 1, 0.7), 'pop'], [TM('s9', 2, 0.8), 'pop'],
      [TM('s10', 0, 0.1), 'ding'], [TM('s10', 1, 0.27), 'tick'], [TM('s10', 2, 0.44), 'tick'], [TM('s10', 3, 0.61), 'tick'], [TM('s10', 4, 0.78), 'tick'],
      [at('s11') + 0.3, 'twinkle'], [at('s11') + 1.2, 'heart'], [P('s11', 0.35), 'crunch'], [at('s11') + 2.4, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(DATA.vo ? at('s1') + 0.2 : 0.8, at('s3'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s3'), at('s4'), MU(CK.MUSIC.OOPS)), CK.musicBed(at('s4'), at('s5'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s5'), at('s7'), MU(CK.MUSIC.OOPS)), CK.musicBed(at('s7'), at('s8'), MU(CK.MUSIC.NIGHT)), CK.musicBed(at('s8'), at('s11'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s11'), DUR - 1.5, MU(CK.MUSIC.WARM))],
  });
})();
