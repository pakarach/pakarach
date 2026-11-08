/* พ่อแม่หัวจะปวด — หลังเลิกเรียน ทำไมถึงหิวจัง (ช่องว่างมื้อเที่ยง→เลิกเรียน, ถังพลังงาน, มื้อเช้า, กับดักน้ำหวาน, พบแพทย์ถ้า, ของว่าง=มื้อจิ๋ว, 5 ทิป)
   Build: node build.js hiw-lang-lerk-rian.js out.html --kit clay --title "หลังเลิกเรียน ทำไมถึงหิวจัง" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6], ['s2', 7.5], ['s3', 8.5], ['s4', 7], ['s5', 9], ['s6', 7.5], ['s7', 7.5], ['s8', 6], ['sm', 10], ['s9', 8.5], ['s10', 5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };
  const ROOM = new Set(['cover', 's1', 's6', 's7', 's8', 'sm', 's9', 's10']);

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* ---- layout ---- */
  const TBL = { x: 2.6, z: -0.9, y: 1.07 };
  const HX = (h) => 60 - 4.2 + (h - 7) * (8.4 / 11.5); // timeline hour -> world x
  const HOURS = [[7, 'อาหารเช้า', '#ffd23f'], [11, 'ข้าวเที่ยง', '#79dcb4'], [15.5, 'เลิกเรียน', '#ff8fab'], [18.5, 'ข้าวเย็น', '#b9a4ff']];
  const energy = (h) => (h < 11 ? 100 - (h - 7) * 18 : 100 - (h - 11) * 18);
  const BARS = [[66.96, '10 ขวบ'], [54.7, '12 ขวบ']], BK = 0.032, BX = [129.6, 132.1];

  /* canvas textures */
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3], [150, 200, 4]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const eveTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ff8fa3'); g.addColorStop(1, '#ffd39a'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ffe36e'; x.beginPath(); x.arc(128, 200, 46, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[60, 80, 26], [92, 74, 30], [124, 84, 22]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const dots = (base, dot, rep) => { const tx = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  function clockFace(cv, h) {
    const x = cv.getContext('2d'); x.clearRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = '#ff8fab'; x.stroke();
    x.fillStyle = '#3a2f3f'; for (let i = 0; i < 12; i++) { const a = i / 12 * PI * 2; x.beginPath(); x.arc(128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92, i % 3 ? 5 : 9, 0, 7); x.fill(); }
    x.lineCap = 'round'; const ha = (h % 12) / 12 * PI * 2, ma = (h % 1) * PI * 2;
    x.lineWidth = 14; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ha) * 52, 128 - Math.cos(ha) * 52); x.stroke();
    x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ma) * 80, 128 - Math.cos(ma) * 80); x.stroke();
    x.fillStyle = '#ff8fab'; x.beginPath(); x.arc(128, 128, 12, 0, 7); x.fill();
  }

  /* ---- shots ---- */
  const CLOSE = (dx) => ({ pos: [-2.0 + dx, 6.6, 26.4], look: [-2.0 + dx, 3.0, 0.4], fov: 29 });
  const SH = {
    cover: [FW(-1.5, -1.6, 7.0, 3.8, 0.18), FW(-1.45, -1.6, 6.8, 3.8, 0.18)],
    s1: [FW(-0.5, -1.4, 9.0, 3.8, 0.2), FW(-0.5, -1.4, 8.6, 3.8, 0.2)],
    s2: [FW(60, 0.3, 11.2, 4.1, 0.08), FW(60.05, 0.3, 10.9, 4.1, 0.08)],
    s3: REEL ? [FW(120.0, 0, 7.6, 3.0, 0.1), FW(120.0, 0, 7.4, 3.0, 0.1)] : [FW(120.0, 0, 7.6, 4.0, 0.1), FW(120.0, 0, 7.4, 4.0, 0.1)],
    s4: REEL ? [FW(129.9, 0, 7.8, 2.6, 0.1), FW(129.9, 0, 7.6, 2.6, 0.1)] : [FW(129.9, 0, 7.8, 3.7, 0.1), FW(129.9, 0, 7.6, 3.7, 0.1)],
    s5: [FW(-59.4, 0, 7.8, 3.9, 0.14), FW(-59.0, 0, 7.4, 3.9, 0.14)],
    s6: [FW(0.4, -1.2, 8.8, 3.9, 0.2), FW(0.4, -1.2, 8.5, 3.9, 0.2)],
    s7: [FW(1.7, -1.4, 7.2, 3.6, 0.28), FW(1.7, -1.4, 6.9, 3.6, 0.28)],
    s8: [FW(1.7, -1.4, 7.2, 3.6, 0.28), FW(1.7, -1.4, 7.0, 3.6, 0.28)],
    sm: [FW(1.0, -1.1, 8.8, 3.8, 0.28), FW(1.05, -1.1, 8.5, 3.8, 0.28)],
    s9: [FW(0.6, -1.3, 10.2, 3.9, 0.26), FW(0.6, -1.3, 9.9, 3.9, 0.26)],
    s10: [CLOSE(0.3), CLOSE(0)],
  };
  const CUT = new Set(['s2', 's3', 's5', 's6', 's7', 's10']);
  const S5B = [FW(-58.25, 0, 6.2, 3.4, 0.16), FW(-58.15, 0, 6.0, 3.4, 0.16)];
  const CAM = [];
  for (const id of ORDER) { if (id === 's5') { const q = SP('s5', 0.5); CAM.push(Object.assign({ t: at(id) }, SH.s5[0]), Object.assign({ t: q - 0.3 }, SH.s5[1]), Object.assign({ t: q + 0.7 }, S5B[0]), Object.assign({ t: end(id) }, S5B[1])); continue; } const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.registerSfx('growl', (t) => { VE.audio.tone(t, 95, 0.55, { f2: 60, type: 'sawtooth', vol: 0.07, att: 0.08 }); VE.audio.noise(t, 0.55, { type: 'bandpass', f: 180, f2: 120, vol: 0.12, att: 0.1 }); VE.audio.tone(t + 0.3, 120, 0.3, { f2: 70, type: 'triangle', vol: 0.08 }); });
  VE.registerSfx('crunch', (t) => { for (let i = 0; i < 3; i++) VE.audio.noise(t + i * 0.11, 0.06, { type: 'highpass', f: 2500, vol: 0.14 }); });
  VE.registerSfx('slurp', (t) => { VE.audio.tone(t, 400, 0.35, { f2: 900, vol: 0.08 }); VE.audio.noise(t, 0.35, { type: 'bandpass', f: 1200, vol: 0.06 }); });

  VE.run({
    DUR, file: 'hiw-lang-lerk-rian', title: 'หลังเลิกเรียน ทำไมถึงหิวจัง', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'กินอยู่ของลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const plate = (r, c) => { const g = new T.Group(); const p = new T.Mesh(new T.CylinderGeometry(r, r * 0.8, 0.07, 32), M(c || '#ffffff')); const rim = new T.Mesh(new T.TorusGeometry(r * 0.95, 0.03, 8, 32), M('#ff9ec0')); rim.rotation.x = PI / 2; rim.position.y = 0.04; g.add(p, rim); return g; };

      /* ===== stage 0: kitchen (x = 0) ===== */
      const room = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: false, props: false, winX: -0.4 }); scene.add(room);
      const DAY = room.userData.win.material.map, NT = nightTex(), ET = eveTex();
      /* fridge */
      const fr = new T.Group(); fr.position.set(-3.25, 0, -3.75); scene.add(fr);
      const fb = new T.Mesh(new T.BoxGeometry(1.8, 3.6, 1.2), M('#7fc4ff')); fb.position.y = 1.8; fr.add(fb);
      const inner = new T.Mesh(new T.PlaneGeometry(1.6, 2.1), new T.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff1b8', emissiveIntensity: 0.55, roughness: 0.5 })); inner.position.set(0, 1.15, 0.605); fr.add(inner);
      for (const y of [0.75, 1.5]) { const sh = new T.Mesh(new T.BoxGeometry(1.5, 0.05, 0.14), M('#dff3ff')); sh.position.set(0, y, 0.66); fr.add(sh); }
      const milk = new T.Mesh(new T.BoxGeometry(0.3, 0.5, 0.22), M('#ffffff')); milk.position.set(-0.45, 1.78, 0.7); fr.add(milk); const mb = new T.Mesh(new T.BoxGeometry(0.31, 0.12, 0.23), M('#5ab8ff')); mb.position.set(-0.45, 1.86, 0.7); fr.add(mb);
      const apple = new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M('#ff5f6d')); apple.position.set(0.15, 1.73, 0.72); fr.add(apple);
      const bot = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.55, 14), M('#79dcb4')); bot.position.set(0.5, 1.02, 0.72); fr.add(bot);
      const eggs = new T.Mesh(new T.SphereGeometry(0.12, 12, 10), M('#fff4e6')); eggs.scale.set(1, 1.25, 1); eggs.position.set(-0.3, 0.92, 0.72); fr.add(eggs);
      const fz = new T.Mesh(new T.BoxGeometry(1.8, 1.25, 0.12), M('#9fd3ff')); fz.position.set(0, 2.95, 0.66); fr.add(fz);
      [['#ff6f91', -0.4, 3.15], ['#ffd23f', 0.1, 2.8], ['#79dcb4', 0.45, 3.2]].forEach(([c, x, y]) => { const m = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.05, 14), M(c)); m.rotation.x = PI / 2; m.position.set(x, y, 0.74); fr.add(m); });
      const door = new T.Group(); door.position.set(-0.9, 0, 0.66); fr.add(door);
      const dm = new T.Mesh(new T.BoxGeometry(1.8, 2.22, 0.12), M('#9fd3ff')); dm.position.set(0.9, 1.15, 0); door.add(dm);
      const hd = new T.Mesh(new T.BoxGeometry(0.1, 0.6, 0.1), M('#ffffff')); hd.position.set(1.62, 1.6, 0.1); door.add(hd);
      const frL = new T.PointLight(0xfff2c0, 0, 4.5); frL.position.set(-3.2, 1.4, -2.4); scene.add(frL);
      /* table + clock */
      const tb = new T.Group(); tb.position.set(TBL.x, 0, TBL.z); scene.add(tb);
      const tt = new T.Mesh(new T.BoxGeometry(3.6, 0.14, 1.4), M('#e8955a')); tt.position.y = 1.0; tb.add(tt);
      for (const [x, z] of [[-1.6, -0.55], [1.6, -0.55], [-1.6, 0.55], [1.6, 0.55]]) { const l = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 0.95, 10), M('#c9733f')); l.position.set(x, 0.48, z); tb.add(l); }
      const ccv = document.createElement('canvas'); ccv.width = ccv.height = 256; clockFace(ccv, 15.5); const ctx2 = new T.CanvasTexture(ccv);
      const clock = new T.Mesh(new T.CircleGeometry(0.55, 40), new T.MeshBasicMaterial({ map: ctx2, transparent: true })); clock.position.set(2.7, 3.15, -4.33); scene.add(clock);
      /* snack sets (s7) */
      const setA = new T.Group(); setA.position.set(1.9, TBL.y, -0.65); scene.add(setA); setA.add(plate(0.62));
      const ban = new T.Mesh(new T.TorusGeometry(0.34, 0.1, 10, 20, 2.3), M('#ffd23f')); ban.rotation.set(-PI / 2 + 0.3, 0, 0.4); ban.position.set(-0.12, 0.16, 0.05); setA.add(ban);
      const bt = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), M('#7a5230')); bt.position.set(0.22, 0.17, -0.1); setA.add(bt);
      const mk = new T.Group(); const mk1 = new T.Mesh(new T.BoxGeometry(0.34, 0.52, 0.26), M('#ffffff')); mk1.position.y = 0.3; const mk2 = new T.Mesh(new T.BoxGeometry(0.35, 0.16, 0.27), M('#5ab8ff')); mk2.position.y = 0.36; const st = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.36, 8), M('#ff6f91')); st.position.set(0.08, 0.68, 0); st.rotation.z = -0.25; mk.add(mk1, mk2, st); mk.position.set(0.32, 0.03, -0.1); setA.add(mk);
      const setB = new T.Group(); setB.position.set(3.45, TBL.y, -0.65); scene.add(setB); setB.add(plate(0.62));
      for (const s of [-1, 1]) { const w = new T.Mesh(new T.SphereGeometry(0.2, 18, 10, 0, PI * 2, 0, PI / 2), M('#ffffff')); w.scale.set(1, 0.7, 1.3); w.position.set(-0.22 + s * 0.2, 0.05, 0.12 - s * 0.05); w.rotation.z = s * 0.15; setB.add(w); const y = new T.Mesh(new T.SphereGeometry(0.1, 14, 10), M('#ffc12e')); y.scale.set(1, 0.45, 1); y.position.set(-0.22 + s * 0.2, 0.18, 0.12 - s * 0.05); setB.add(y); }
      const corn = new T.Group(); const cc = new T.Mesh(new T.CylinderGeometry(0.15, 0.12, 0.7, 16), M('#ffffff', { map: dots('#ffd23f', '#ffe98a', [3, 3]) })); cc.rotation.z = PI / 2 - 0.25; corn.add(cc); for (const s of [-1, 1]) { const lf = new T.Mesh(new T.ConeGeometry(0.1, 0.55, 8), M('#57c98b')); lf.rotation.z = -PI / 2 + 0.2 + s * 0.25; lf.position.set(0.45, -0.06 + s * 0.05, s * 0.06); corn.add(lf); } corn.position.set(0.25, 0.22, -0.1); setB.add(corn);
      /* veggie plate (s8) */
      const veg = plate(0.5); for (let i = 0; i < 7; i++) { const s = new T.Mesh(new T.BoxGeometry(0.09, 0.5, 0.09), M(i % 2 ? '#ff9a3c' : '#5cc96b')); s.position.set(-0.24 + i * 0.08, 0.28, Math.sin(i * 2.1) * 0.08); s.rotation.z = (i - 3) * 0.12; veg.add(s); } scene.add(veg);
      const stick = new T.Mesh(new T.BoxGeometry(0.11, 0.6, 0.11), M('#5cc96b')); scene.add(stick);
      /* milk choices (sm) */
      const mkBox = (body, band, strawC) => { const g = new T.Group(); const a = new T.Mesh(new T.BoxGeometry(0.34, 0.52, 0.26), M(body)); a.position.y = 0.26; const b = new T.Mesh(new T.BoxGeometry(0.35, 0.16, 0.27), M(band)); b.position.y = 0.33; const c = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.36, 8), M(strawC)); c.position.set(0.08, 0.64, 0); c.rotation.z = -0.25; g.add(a, b, c); g.scale.setScalar(1.6); return g; };
      const uht = mkBox('#ffffff', '#5ab8ff', '#ff6f91'); uht.position.set(1.75, TBL.y, -0.55); scene.add(uht);
      const choc = mkBox('#8a5a3c', '#ff9ec0', '#ffffff'); choc.position.set(4.05, TBL.y, -0.55); scene.add(choc);
      const past = new T.Group(); const pb = new T.Mesh(new T.CylinderGeometry(0.16, 0.18, 0.5, 18), M('#ffffff')); pb.position.y = 0.25; const pn = new T.Mesh(new T.CylinderGeometry(0.09, 0.14, 0.12, 14), M('#ffffff')); pn.position.y = 0.56; const pc = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.1, 14), M('#ff6f91')); pc.position.y = 0.66; const pl = new T.Mesh(new T.CylinderGeometry(0.165, 0.185, 0.18, 18), M('#79dcb4')); pl.position.y = 0.24; past.add(pb, pn, pc, pl); past.scale.setScalar(1.6); past.position.set(2.9, TBL.y, -0.55); scene.add(past);
      /* water glass (s6) */
      const glass = new T.Group(); const gl = new T.Mesh(new T.CylinderGeometry(0.2, 0.17, 0.5, 18, 1, true), M('#dff3ff', { transparent: true, opacity: 0.55, side: T.DoubleSide })); const wa = new T.Mesh(new T.CylinderGeometry(0.18, 0.16, 0.32, 18), M('#7fc4ff', { transparent: true, opacity: 0.75 })); wa.position.y = -0.07; glass.add(gl, wa); scene.add(glass);
      /* family */
      const WHO = ['dad', 'mom', 'mama', 'nana', 'wawa'], c = {};
      for (const k of WHO) { const g = CK.family(T, k); g.userData.base = g.scale.x; scene.add(g); c[k] = g; }
      const pack = new T.Group(); const pk = new T.Mesh(new T.BoxGeometry(0.74, 0.74, 0.32), M('#ff9a3c')); pk.position.set(0, 0.7, -0.52); const pp = new T.Mesh(new T.BoxGeometry(0.5, 0.3, 0.1), M('#ffd23f')); pp.position.set(0, 0.55, -0.71); pack.add(pk, pp);
      for (const s of [-1, 1]) { const sr = new T.Mesh(new T.TorusGeometry(0.34, 0.035, 8, 20, PI * 0.9), M('#e0702a')); sr.rotation.set(0, PI / 2, 0); sr.position.set(s * 0.2, 0.78, -0.08); pack.add(sr); }
      c.mama.add(pack);

      /* ===== stage 1: timeline (x = 60) ===== */
      const plat1 = new T.Mesh(new T.BoxGeometry(18, 0.3, 10), M('#ff9ebd')); plat1.position.set(60, -0.15, 0); scene.add(plat1);
      const bw1 = new T.Mesh(new T.BoxGeometry(18, 9, 0.3), M('#ffffff', { map: dots('#ffd1e3', '#ffffff', [8, 4]) })); bw1.position.set(60, 4.2, -3.2); scene.add(bw1);
      const track = new T.Mesh(new T.BoxGeometry(9.2, 0.3, 1.0), M('#7fc4ff')); track.position.set(60, 0.15, 0.6); scene.add(track);
      const gapG = new T.BoxGeometry(1, 0.32, 1.02); gapG.translate(0.5, 0, 0); const gap = new T.Mesh(gapG, M('#ff5f6d', { emissive: '#ff2040', emissiveIntensity: 0.2 })); gap.position.set(HX(11), 0.16, 0.6); gap.scale.x = 0.001; scene.add(gap);
      const signs = HOURS.map(([h, , col]) => { const g = new T.Group(); const pole = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 2.3, 10), M('#ffffff')); pole.position.y = 1.15; const d = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.1, 32), M(col)); d.rotation.x = PI / 2; d.position.y = 2.55; const r = new T.Mesh(new T.TorusGeometry(0.5, 0.06, 8, 32), M('#ffffff')); r.position.y = 2.55; r.position.z = 0.04; g.add(pole, d, r); g.position.set(HX(h), 0.3, -0.25); scene.add(g); return g; });
      const mini = CK.family(T, 'mama', { scale: 0.85 }); mini.userData.base = 0.85; scene.add(mini);

      /* ===== stage 2: tank (x = 120) + bars (x = 130) ===== */
      const plat = new T.Mesh(new T.BoxGeometry(24, 0.3, 14), M('#ff9ebd')); plat.position.set(125, -0.15, 0); scene.add(plat);
      const bw = new T.Mesh(new T.BoxGeometry(24, 9, 0.3), M('#ffffff', { map: dots('#ffd1e3', '#ffffff', [10, 4]) })); bw.position.set(125, 4.2, -4.5); scene.add(bw);
      const tank = new T.Group(); tank.position.set(119.9, 0, 0); scene.add(tank);
      const base = new T.Mesh(new T.CylinderGeometry(1.1, 1.15, 0.2, 36), M('#ffffff')); base.position.y = 0.1; tank.add(base);
      const shell = new T.Mesh(new T.CylinderGeometry(0.95, 0.95, 3.0, 36, 1, true), M('#ffffff', { transparent: true, opacity: 0.32, side: T.DoubleSide })); shell.position.y = 1.7; tank.add(shell);
      const lip = new T.Mesh(new T.TorusGeometry(0.95, 0.07, 10, 36), M('#ffffff')); lip.rotation.x = PI / 2; lip.position.y = 3.2; tank.add(lip);
      const lg = new T.CylinderGeometry(0.86, 0.86, 2.9, 36); lg.translate(0, 1.45, 0); const liquid = new T.Mesh(lg, M('#5fd38d', { transparent: true, opacity: 0.9 })); liquid.position.y = 0.22; tank.add(liquid);
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#3a2f3f')); e.scale.set(1, 1.3, 0.5); e.position.set(s * 0.3, 2.3, 0.96); tank.add(e); }
      const CY = [3.25, 2.0, 0.65], CX0 = 122.4;
      const brain = new T.Group(); const bs = new T.Mesh(new T.SphereGeometry(0.42, 22, 16), M('#ff9ec0')); bs.scale.set(1.2, 0.95, 0.95); brain.add(bs); for (let i = 0; i < 4; i++) { const w = new T.Mesh(new T.TorusGeometry(0.3 - i * 0.03, 0.04, 6, 20, PI), M('#ff7aa8')); w.position.set(-0.3 + i * 0.2, 0.08, 0.2); w.rotation.set(0.3, PI / 2, 0); brain.add(w); } brain.position.set(CX0, CY[0], 0); scene.add(brain);
      const ball = new T.Mesh(new T.SphereGeometry(0.4, 22, 16), M('#ffffff', { map: dots('#ffffff', '#3a2f3f', [2, 1]) })); ball.position.set(CX0, CY[1], 0); scene.add(ball);
      const grow = new T.Group(); const gs = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.7, 12), M('#57c98b')); gs.position.y = 0.35; const gc = new T.Mesh(new T.ConeGeometry(0.3, 0.45, 16), M('#57c98b')); gc.position.y = 0.92; grow.add(gs, gc); grow.position.set(CX0, 0.1, 0); scene.add(grow);
      const pipes = CY.map((y) => { const p = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 1.0, 10), M('#ffd1e3')); p.rotation.z = PI / 2; p.position.set(121.35, y, 0); scene.add(p); return p; });
      const drops = []; for (let i = 0; i < 12; i++) { const d = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), M('#ffd23f', { emissive: '#ffb000', emissiveIntensity: 0.4 })); scene.add(d); drops.push(d); }
      const tmama = CK.family(T, 'mama'); tmama.userData.base = tmama.scale.x; scene.add(tmama);
      const bars = BARS.map((v, i) => { const g = new T.Group(); g.position.set(BX[i], 0, 0); const o = new T.Mesh(new T.BoxGeometry(1.6, 100 * BK, 1.0), M('#ffffff', { transparent: true, opacity: 0.35 })); o.position.y = 50 * BK; const f = CK.bar(T, 1.5, 0.92, i ? '#9fd3ff' : '#ff8fab'); f.scale.y = 0.01; g.add(o, f); scene.add(g); g.userData.f = f; return g; });
      const lc2 = CK.chibi(T, { scale: 1.1, hairStyle: 'pigtails', hair: '#3a2a22', top: '#f2f5ff', collar: '#3a5bd0', bottom: '#2f4fa8', skin: CK.pal.skin[0] }); lc2.userData.base = 1.1; scene.add(lc2);
      const ep = plate(0.4); scene.add(ep);

      /* ===== stage 3: school gate (x = -60) ===== */
      const ground = new T.Mesh(new T.BoxGeometry(22, 0.3, 14), M('#6fbf73')); ground.position.set(-60, -0.15, 0); scene.add(ground);
      const walk = new T.Mesh(new T.BoxGeometry(22, 0.04, 2.6), M('#e0a87a')); walk.position.set(-60, 0.02, 0.4); scene.add(walk);
      const fence = new T.Mesh(new T.BoxGeometry(22, 1.6, 0.3), M('#ffffff', { map: dots('#ffb3c6', '#ffffff', [10, 1]) })); fence.position.set(-60, 0.8, -3.4); scene.add(fence);
      const signT = ctex(512, 160, (x) => { x.fillStyle = '#3a5bd0'; x.fillRect(0, 0, 512, 160); x.fillStyle = '#ffffff'; x.font = '700 84px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('โรงเรียน', 256, 84); });
      const sign = new T.Mesh(new T.BoxGeometry(2.6, 0.8, 0.12), [M('#3a5bd0'), M('#3a5bd0'), M('#3a5bd0'), M('#3a5bd0'), new T.MeshStandardMaterial({ map: signT, roughness: 0.5 }), M('#3a5bd0')]); sign.position.set(-62.6, 2.1, -3.2); scene.add(sign);
      for (const x of [-63.9, -61.3]) { const p = new T.Mesh(new T.BoxGeometry(0.16, 1.0, 0.16), M('#ffffff')); p.position.set(x + 0.1, 1.2, -3.25); scene.add(p); }
      for (const [x, s] of [[-65.5, 1.1], [-55.2, 1.3], [-52.8, 1.0]]) { const tr = new T.Mesh(new T.CylinderGeometry(0.16, 0.2, 1.6, 10), M('#b87a4b')); tr.position.set(x, 0.8 + 1.6, -4.4); scene.add(tr); for (const [dx, dy, r] of [[0, 3.6, 0.95], [-0.6, 3.1, 0.7], [0.6, 3.2, 0.7]]) { const l = new T.Mesh(new T.SphereGeometry(r * s, 16, 12), M('#57c98b')); l.position.set(x + dx, dy, -4.4); scene.add(l); } }
      const cart = new T.Group(); cart.position.set(-56.9, 0, -0.9); scene.add(cart);
      const cb = new T.Mesh(new T.BoxGeometry(2.1, 1.0, 1.0), M('#ff9ec0')); cb.position.y = 0.72; cart.add(cb);
      const ctop = new T.Mesh(new T.BoxGeometry(2.3, 0.1, 1.15), M('#ffffff')); ctop.position.y = 1.27; cart.add(ctop);
      for (const s of [-1, 1]) { const w = new T.Mesh(new T.TorusGeometry(0.2, 0.07, 8, 20), M('#3a2f3f')); w.position.set(s * 0.75, 0.2, 0.52); cart.add(w); }
      const pole2 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 2.0, 8), M('#ffffff')); pole2.position.set(1.05, 2.3, -0.45); cart.add(pole2);
      const umb = new T.Mesh(new T.ConeGeometry(1.5, 0.55, 16, 1, true), M('#ffd23f', { side: T.DoubleSide })); umb.position.set(1.05, 3.4, -0.45); cart.add(umb);
      const mkBag = (col) => { const g = new T.Group(); const b = new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M(col, { transparent: true, opacity: 0.88 })); b.scale.set(1, 1.3, 1); const s = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.45, 8), M('#ffffff')); s.position.set(0.05, 0.36, 0); s.rotation.z = -0.2; const k = new T.Mesh(new T.TorusGeometry(0.08, 0.02, 6, 14), M('#ffffff')); k.position.y = 0.27; g.add(b, s, k); return g; };
      const bags = ['#ff5f6d', '#57c98b', '#ff9a3c'].map((col, i) => { const b = mkBag(col); b.position.set(-0.7 + i * 0.4, 1.58, -0.25); b.scale.setScalar(1.15); cart.add(b); return b; });
      const trays = [[-0.55, '#79dcb4', 4], [0.45, '#ff8fab', 12]].map(([x, col, n]) => { const g = new T.Group(); const tr = new T.Mesh(new T.BoxGeometry(0.9, 0.06, 0.62), M(col)); g.add(tr); const cubes = []; for (let i = 0; i < n; i++) { const L = i < 8 ? 0 : 1, j = i < 8 ? i : i - 8, cols = n === 4 ? 2 : 4; const cu = new T.Mesh(new T.BoxGeometry(0.21, 0.21, 0.21), M('#f6faff', { roughness: 0.3 })); const ix = j % cols, iz = Math.floor(j / cols); cu.position.set((ix - (cols - 1) / 2) * 0.2 + (L ? 0.1 : 0), 0.13 + L * 0.2, (iz - 0.5) * 0.2 + (L ? 0.0 : 0)); g.add(cu); cubes.push(cu); } g.position.set(x, 1.33, 0.18); cart.add(g); g.userData.cubes = cubes; return g; });
      const yai = CK.chibi(T, { scale: 1.35, hairStyle: 'short', hair: '#d9d4de', brow: '#9a9aa8', top: '#7a4fa3', bottom: '#4a3a5c', skin: CK.pal.skin[1], lashes: true, longSleeve: true }); yai.userData.base = 1.35; scene.add(yai);
      const lc = CK.chibi(T, { scale: 1.1, hairStyle: 'pigtails', hair: '#3a2a22', top: '#f2f5ff', collar: '#3a5bd0', bottom: '#2f4fa8', skin: CK.pal.skin[0] }); lc.userData.base = 1.1; scene.add(lc);
      const lbag = mkBag('#ff5f6d'); lbag.scale.setScalar(1.05); scene.add(lbag);
      const sparks = []; for (let i = 0; i < 10; i++) { const sp = new T.Mesh(new T.OctahedronGeometry(0.1, 0), M(i % 2 ? '#ffd23f' : '#ffffff', { emissive: '#ffd23f', emissiveIntensity: 0.4 })); scene.add(sp); sparks.push(sp); }
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(new T.SphereGeometry(0.13, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [-2.0 + Math.sin(i * 7.1) * 3.4, Math.cos(i * 3.3) * 0.8 + 0.6, (i * 0.37) % 1]; scene.add(h); hearts.push(h); }

      return { uht, choc, past, key, hemi, room, DAY, NT, ET, door, inner, frL, clock, ccv, ctx2, clockH: 15.5, setA, setB, veg, stick, glass, c, pack, gap, signs, mini, liquid, brain, ball, grow, drops, tmama, bars, lc2, ep, bags, trays, yai, lc, lbag, sparks, hearts };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      /* ---------- lights / night / window / clock ---------- */
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.38, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#7a74b0'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dn);
      s.room.userData.win.material.map = bt === 's6' ? s.NT : (bt === 's8' || bt === 's9' || bt === 's10') ? s.ET : s.DAY;
      const CH = { cover: 15.5, s1: 15.5 + ph('s1', t) * 0.08, s6: 21, s7: 15.75, s8: 17.4, sm: 7.0 + ph('sm', t) * 0.1, s9: 17.6, s10: 18.5 };
      const ch = CH[bt] || 15.5; if (Math.abs(ch - s.clockH) > 0.004) { s.clockH = ch; clockFace(s.ccv, ch); s.ctx2.needsUpdate = true; }
      /* fridge door */
      let opn = 0; if (bt === 'cover') opn = 0.15; else if (bt === 's1') opn = U.easeIO(U.clamp((ph('s1', t) - 0.05) / 0.15)); else if (bt === 's6') opn = 0.0;
      s.door.rotation.y = -1.7 * opn; s.frL.intensity = 0.9 * opn; s.inner.material.emissiveIntensity = 0.2 + 0.5 * opn;

      /* ---------- kitchen family ---------- */
      const C = s.c, st = {};
      const def = (k, x, z, ex, ry) => (st[k] = { x, z, ex: ex || 'happy', ry: ry || 0, y: 0 });
      if (bt === 'cover') {
        def('mama', -1.5, -1.3, 'cry', 0.2); st.mama.armsUp = true; st.mama.y = Math.abs(Math.sin(t * 8)) * 0.12; st.mama.pack = true;
        def('mom', 0.55, -1.6, 'worried', -0.25);
      } else if (bt === 's1') {
        const p = ph('s1', t), q = SP('s1', 0.5), kn = U.easeOut(U.clamp((p - 0.42) / 0.2));
        def('mama', -1.55, -1.3, t < q ? 'cry' : 'giggle', U.lerp(0.2, -0.75, U.easeIO(U.clamp((p - 0.04) / 0.15)))); st.mama.pack = true; st.mama.y = t < q ? Math.abs(Math.sin(t * 8)) * 0.1 : 0;
        if (p > 0.22) { st.mama.arm1 = [0.6, -1.25]; }
        def('mom', 0.55, -1.6, p < 0.75 ? 'worried' : 'happy', -0.3); if (p > 0.3 && p < 0.7) st.mom.armm1 = [-0.55, -0.9];
        def('nana', U.lerp(6.5, 2.85, kn), 0.4, kn < 1 ? 'happy' : 'cry', -0.15); st.nana.y = kn < 1 ? Math.abs(Math.sin(t * 11)) * 0.15 : 0; if (kn >= 1) st.nana.armsUp = true;
      } else if (bt === 's6') {
        const p = ph('s6', t);
        def('mama', -1.6, -1.3, 'sick', 0.15); st.mama.glass = true; st.mama.arm1 = [0.35, -1.45];
        def('mom', 0.5, -1.5, 'worried', 0.05); st.mom.armm1 = [-0.5, -1.0];
        def('dad', 2.95, 0.35, 'worried', -0.2); if (p > 0.4) st.dad.arm1 = [0.45, -0.95];
      } else if (bt === 's7') {
        const p = ph('s7', t);
        def('mom', -0.05, -1.0, 'happy', 0.35); st.mom.arm1 = [0.75 + 0.05 * Math.sin(t * 3), -0.9];
        def('mama', 1.9, -2.1, p > 0.2 ? 'giggle' : 'happy'); st.mama.y = p > 0.2 && p < 0.45 ? Math.abs(Math.sin(t * 9)) * 0.1 : 0;
        def('nana', 3.5, -2.1, p > 0.3 ? 'giggle' : 'happy'); st.nana.wave = p > 0.55 && p < 0.8;
      } else if (bt === 's8') {
        const p = ph('s8', t);
        def('mom', -0.05, -1.0, 'happy', 0.35); st.mom.arm1 = [0.95, -1.15]; st.mom.veg = true;
        def('mama', 1.9, -2.1, p > 0.35 ? 'giggle' : 'happy'); if (p > 0.3) { st.mama.armm1 = [-0.35, -1.45]; st.mama.stick = true; }
        def('nana', 3.5, -2.1, 'happy');
      } else if (bt === 'sm') {
        const p = ph('sm', t);
        def('mama', -1.8, -0.5, p > 0.7 ? 'giggle' : 'happy', 0.55); st.mama.pack = true; st.mama.y = p > 0.72 && p < 0.85 ? Math.abs(Math.sin(t * 9)) * 0.1 : 0;
        def('mom', 0.1, -1.1, t > TM('sm', 0, 0.34) && t < TM('sm', 1, 0.68) ? 'worried' : 'happy', 0.3); st.mom.arm1 = [1.15 + 0.05 * Math.sin(t * 3), -0.55];
      } else if (bt === 's9') {
        const kw = U.easeOut(U.clamp((ph('s9', t) - 0.06) / 0.12)); def('dad', U.lerp(-7.5, -2.55, kw), -1.3, 'happy', kw < 1 ? 1.1 : 0.2); st.dad.y = kw > 0 && kw < 1 ? Math.abs(Math.sin(t * 9)) * 0.08 : 0; def('mom', -0.05, -1.0, 'happy', 0.15);
        def('mama', 1.9, -2.1, 'giggle'); def('nana', 3.5, -2.1, 'happy');
      } else if (bt === 's10') {
        const p = ph('s10', t);
        def('mom', -4.05, -0.7, 'happy', 0.1); def('dad', -0.05, -0.7, 'happy', -0.1);
        def('nana', -3.6, 1.4, p > 0.3 ? 'giggle' : 'happy'); def('mama', -2.0, 1.4, 'giggle'); def('wawa', -0.55, 1.4, 'happy');
        st.mama.y = Math.abs(Math.sin(t * 6)) * 0.12 * (p > 0.25 && p < 0.7 ? 1 : 0); st.mom.wave = p > 0.35 && p < 0.75;
      }
      for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) {
        const g = C[k], q = st[k]; g.visible = !!q && ROOM.has(bt); if (!g.visible) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(0, q.ry, 0); g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.arm1) { g.userData.arm1.rotation.z = q.arm1[0] + 0.04 * Math.sin(t * 3); g.userData.arm1.rotation.x = q.arm1[1]; }
        if (q.armm1) { g.userData['arm-1'].rotation.z = q.armm1[0] - 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.armm1[1]; }
        if (q.armsUp) { g.userData.arm1.rotation.z = 2.2 + 0.18 * Math.sin(t * 9); g.userData['arm-1'].rotation.z = -2.2 - 0.18 * Math.sin(t * 9 + 1); g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = 0.6; }
      }
      s.pack.visible = !!(st.mama && st.mama.pack);
      const hw = (g, side) => { g.updateMatrixWorld(true); const v = new T.Vector3(); g.userData['hand' + side].getWorldPosition(v); return v; };
      s.glass.visible = !!(st.mama && st.mama.glass); if (s.glass.visible) { const v = hw(C.mama, 1); s.glass.position.set(v.x, v.y + 0.2, v.z + 0.12); }
      s.veg.visible = !!(st.mom && st.mom.veg); if (s.veg.visible) { const v = hw(C.mom, 1); s.veg.position.set(v.x + 0.15, v.y + 0.08, v.z + 0.1); }
      s.stick.visible = !!(st.mama && st.mama.stick); if (s.stick.visible) { const v = hw(C.mama, -1); s.stick.position.set(v.x, v.y + 0.3, v.z + 0.12); s.stick.rotation.set(0.25, 0, -0.2); s.stick.scale.y = 1 - 0.4 * U.clamp((ph('s8', t) - 0.45) / 0.4); }
      s.setA.visible = s.setB.visible = bt === 's7' || bt === 's9';
      s.uht.visible = s.past.visible = s.choc.visible = bt === 'sm'; if (bt === 'sm') { const p = ph('sm', t); [s.uht, s.past, s.choc].forEach((o, i) => { const a = U.easeBack(U.clamp((p - 0.04 - i * 0.05) / 0.1)); o.scale.setScalar(1.6 * Math.max(0.01, a)); o.rotation.y = 0.25 * Math.sin(t * 1.5 + i); }); }
      if (bt === 's7') { const a = U.easeBack(U.clamp((ph('s7', t) - 0.08) / 0.12)), b = U.easeBack(U.clamp((ph('s7', t) - 0.18) / 0.12)); s.setA.scale.setScalar(Math.max(0.01, a)); s.setB.scale.setScalar(Math.max(0.01, b)); } else { s.setA.scale.setScalar(1); s.setB.scale.setScalar(1); }

      /* ---------- stage 1: timeline ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0, h = U.lerp(7, 15.5, U.easeIO(U.clamp((p - 0.04) / 0.5))), moving = p > 0.04 && p < 0.54;
        s.mini.position.set(HX(h), 0.3 + (moving ? Math.abs(Math.sin(t * 11)) * 0.08 : 0), 0.65); s.mini.rotation.y = moving ? 0.9 : 0.1;
        const e = energy(h); s.mini.userData.setExpr(e > 55 ? 'happy' : e > 30 ? 'worried' : 'cry'); s.mini.userData.tick(t, {});
        s.gap.scale.x = Math.max(0.001, (HX(Math.max(11, h)) - HX(11))); s.gap.material.emissiveIntensity = p > 0.55 ? 0.25 + 0.3 * Math.max(0, Math.sin(t * 7)) : 0.15;
        s.signs.forEach((g, i) => { const k = U.easeBack(U.clamp((p - 0.02 - i * 0.04) / 0.1)); g.scale.setScalar(Math.max(0.01, inB('s2', t) ? k : 1)); }); }

      /* ---------- stage 2: tank ---------- */
      { const p = inB('s3', t) ? ph('s3', t) : 0, lvl = U.lerp(1, 0.16, U.easeIO(U.clamp((p - 0.08) / 0.5)));
        s.liquid.scale.y = Math.max(0.02, lvl); s.liquid.material.color.set(lvl > 0.6 ? '#5fd38d' : lvl > 0.35 ? '#ffc94d' : '#ff5f6d'); s.liquid.material.emissive.set('#ff2040'); s.liquid.material.emissiveIntensity = lvl < 0.35 ? 0.2 + 0.2 * Math.sin(t * 8) : 0;
        const CY = [3.25, 2.0, 0.65]; s.drops.forEach((d, i) => { const k = i % 3, f = ((t * 0.9 + i * 0.27) % 1); d.position.set(120.85 + f * 1.05, CY[k], 0.0); d.visible = inB('s3', t) && lvl > 0.17; d.scale.setScalar(0.8 + 0.3 * Math.sin(f * PI)); });
        s.brain.rotation.y = 0.2 * Math.sin(t * 2); s.brain.scale.setScalar(1 + 0.05 * Math.sin(t * 6)); s.ball.position.y = 2.0 + Math.abs(Math.sin(t * 5)) * 0.18; s.ball.rotation.z = -t * 2; s.grow.scale.y = 1 + 0.12 * Math.sin(t * 3);
        const m = s.tmama; m.position.set(117.55, 0, 0.3); m.rotation.y = 0.35; m.userData.setExpr(lvl > 0.6 ? 'happy' : lvl > 0.3 ? 'worried' : 'angry'); m.userData.tick(t, {});
        if (lvl < 0.3) { m.userData['arm-1'].rotation.z = -0.35; m.userData['arm-1'].rotation.x = -0.9; m.userData.arm1.rotation.z = 0.35; m.userData.arm1.rotation.x = -0.9; } }

      /* ---------- stage 2b: bars ---------- */
      { const p = inB('s4', t) ? ph('s4', t) : t > end('s4') ? 1 : 0, kb = U.easeOut(U.clamp((p - 0.1) / 0.4));
        s.bars.forEach((g, i) => { g.userData.f.scale.y = Math.max(0.01, BARS[i][0] * BK * kb); });
        const l = s.lc2; l.position.set(127.25, 0, 0.5); l.rotation.y = 0.3; l.userData.setExpr(p < 0.5 ? 'sleepy' : 'worried'); l.userData.tick(t, { breath: 0.5 });
        l.userData.arm1.rotation.z = 0.55; l.userData.arm1.rotation.x = -1.2; const v = new T.Vector3(); l.updateMatrixWorld(true); l.userData.hand1.getWorldPosition(v); s.ep.position.set(v.x + 0.05, v.y + 0.12, v.z + 0.15); }

      /* ---------- stage 3: gate ---------- */
      { const p = inB('s5', t) ? ph('s5', t) : 0, q = SP('s5', 0.5), y = s.yai, l = s.lc;
        const ex = U.easeIO(U.clamp((t - q + 0.4) / 1.2)); y.position.set(U.lerp(-61.75, -66.5, ex), ex > 0 && ex < 1 ? Math.abs(Math.sin(t * 9)) * 0.08 : 0, -0.2); y.rotation.y = ex > 0 && ex < 1 ? -1.2 : 0.3; y.visible = inB('s5', t) && ex < 1; y.userData.setExpr('happy'); y.userData.tick(t, { wave: p > 0.05 && p < 0.2 });
        const sug = sugar(t); l.position.set(-59.55, sug > 0.75 && t < q ? Math.abs(Math.sin(t * 10)) * 0.2 : 0, 0.2); l.rotation.y = 0.05;
        l.userData.setExpr(t > q ? 'worried' : p < 0.14 ? 'happy' : sug > 0.7 ? 'giggle' : sug > 0.4 ? 'sleepy' : 'angry'); l.userData.tick(t, {});
        l.userData.arm1.rotation.z = 0.6; l.userData.arm1.rotation.x = -1.1; const v = new T.Vector3(); l.updateMatrixWorld(true); l.userData.hand1.getWorldPosition(v); s.lbag.position.set(v.x + 0.12, v.y + 0.22, v.z + 0.12); s.lbag.rotation.z = 0.15 * Math.sin(t * 3);
        s.sparks.forEach((sp, i) => { const a = ((t * 0.8 + i / 10) % 1); sp.visible = inB('s5', t) && sug > 0.7 && t < q; sp.position.set(-59.55 + Math.cos(i * 2.4 + t) * 1.1, 1.0 + a * 2.0, 0.6 + Math.sin(i * 2.4 + t) * 0.4); sp.rotation.y = t * 3 + i; });
        s.trays.forEach((g, i) => { g.visible = t > q; g.userData.cubes.forEach((cu, j) => { const a = U.easeBack(U.clamp((t - q - 0.3 - (i ? 0.8 + j * 0.12 : j * 0.12)) / 0.25)); cu.scale.setScalar(Math.max(0.01, a)); cu.visible = a > 0.01; }); });
        s.bags.forEach((b, i) => { b.visible = t <= q; b.rotation.y = t + i; }); }

      /* closing hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s10') - 0.4 - u[2] * 1.5) / 3.2; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.0, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { c: s.c, mini: s.mini, tmama: s.tmama, lc2: s.lc2, yai: s.yai, lc: s.lc }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's5') return ['#8fd0ff', '#d9f1ff']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's2' || b === 's3' || b === 's4') return ['#ffe8f0', '#fff4e6']; return ['#ffd9a8', '#ffe8f0']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const DARK = new Set(['#3a2f3f', '#6a4a60']); const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, DARK.has(col) ? '#ffffff' : col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, tail) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 38px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2 - (REEL ? 80 : 0)); rr(x - w / 2, y - 38, w, 76, 38, '#ffffff', '#ff8fab'); const tx = x + (tail || 0); g.beginPath(); g.moveTo(tx - 14, y + 36); g.lineTo(tx + 4, y + 66); g.lineTo(tx + 18, y + 36); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, 38, '#3a2f3f', 700, 'center'); g.restore(); };
      const growl = (o, a, t0) => { if (!o || !o.visible || a <= 0) return; const [x, y] = wp(o, 0.85 * o.scale.x); for (let i = 0; i < 2; i++) { const k = ((t - t0) * 1.2 + i * 0.5) % 1; g.save(); g.globalAlpha = a * Math.sin(k * PI); txt('โครก~', U.clamp(x + (i ? -1 : 1) * (90 + k * 40), 120 + LD, 960 - LD), y - k * 40, 36, '#ff6f91', 800); g.restore(); } };
      /* cover + s1 */
      if (b === 'cover') growl(S.c.mama, 1, 0);
      if (b === 's1') {
        const q = SP('s1', 0.5), p = ph('s1', t);
        const [mx, my] = wp(S.c.mama.userData.head, 0.95); bubble('หิวจะตายแล้ว!', mx + 30, my - 40, U.clamp((t - at('s1') - 0.3) / 0.3) * U.clamp((q - t) / 0.3));
        const [ox, oy] = wp(S.c.mom.userData.head, 1.1); bubble('เพิ่งกินข้าวเที่ยงไม่ใช่เหรอ?', ox - 40, oy - 40, U.clamp((t - q) / 0.3) * U.clamp((end('s1') - 0.15 - t) / 0.3), 60);
        if (p < 0.5) growl(S.c.mama, 1, at('s1'));
      }
      /* s2: timeline labels + energy */
      if (b === 's2') {
        const p = ph('s2', t);
        HOURS.forEach(([h, name, col], i) => { const a = U.clamp((p - 0.05 - i * 0.04) / 0.1); if (a <= 0) return; const [x, y] = proj(new T.Vector3(HX(h), 3.1, -0.25)); g.save(); g.globalAlpha = a; const hh = Math.floor(h), mm = Math.round((h - hh) * 60); txt((hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm, x, y - 30, 46, '#3a2f3f', 800); txt(name, x, y - 84, 38, i === 2 ? '#ff4f7a' : '#6a4a60', 700); g.restore(); });
        const h = U.lerp(7, 15.5, U.easeIO(U.clamp((p - 0.04) / 0.5))), e = Math.max(5, energy(h));
        const [x, y] = wp(S.mini.userData.head, 0.2); const bx = x + 70, by = y - 10; rr(bx, by - 28, 150, 56, 14, 'rgba(255,255,255,.95)', '#3a2f3f'); rr(bx + 150, by - 11, 10, 22, 3, '#3a2f3f'); rr(bx + 7, by - 21, 136 * e / 100, 42, 9, e > 55 ? '#5fd38d' : e > 30 ? '#ffc94d' : '#ff5f6d');
        if (p > 0.56) { const a = U.clamp((p - 0.56) / 0.08); const [gx, gy] = proj(new T.Vector3((HX(11) + HX(15.5)) / 2, 0.3, 1.1)); g.save(); g.globalAlpha = a; txt('4 ชม. ครึ่ง', gx, gy + 50, 54 * (0.9 + 0.1 * U.easeBack(a)), '#ff4f7a', 800); g.restore(); }
      }
      /* s3: tank labels */
      if (b === 's3') {
        const p = ph('s3', t), lvl = U.lerp(1, 0.16, U.easeIO(U.clamp((p - 0.08) / 0.5)));
        let [x, y] = proj(new T.Vector3(119.9, 3.3, 0)); txt('ถังพลังงาน', x, y - 32, 42, '#3a2f3f', 800); [x, y] = proj(new T.Vector3(119.9, 1.3, 1.0)); txt(Math.round(lvl * 100) + '%', x, y, 64, lvl > 0.6 ? '#2fa86a' : lvl > 0.35 ? '#e8a800' : '#ff4f6a', 800);
        [['สมองเรียน', 3.25], ['วิ่งเล่น', 2.0], ['ตัวโต', 0.65]].forEach(([n, yy], i) => { const a = U.clamp((p - 0.1 - i * 0.07) / 0.08); if (a <= 0) return; const [lx, ly] = proj(new T.Vector3(121.45, yy - 0.34, 0)); g.save(); g.globalAlpha = a; txt(n, lx, ly, 32, '#3a2f3f', 700); g.restore(); });
        if (lvl < 0.3) growl(S.tmama, U.clamp((0.3 - lvl) / 0.1), at('s3'));
      }
      /* s4: bar labels */
      if (b === 's4') {
        const p = ph('s4', t), kb = U.easeOut(U.clamp((p - 0.1) / 0.4));
        BARS.forEach(([v, a1], i) => { let [x, y] = proj(new T.Vector3(BX[i], v * BK * kb, 0)); if (kb > 0.05) txt(Math.round(v * kb) + '%', x, y - 40, 54, '#ff4f7a', 800); [x, y] = proj(new T.Vector3(BX[i], 0, 0.55)); txt(a1, x, y + 36, 40, '#3a2f3f', 700); });
        const [x, y] = proj(new T.Vector3((BX[0] + BX[1]) / 2, 100 * BK, 0)); txt('กินมื้อเช้าทุกวัน', x, y - 30, 34, '#ffffff', 700);
      }
      /* s5: sugar meter + tray labels + bubble */
      if (b === 's5') {
        const q = SP('s5', 0.5);
        if (t < q) { const sug = sugar(t), [x, y] = wp(S.lc.userData.head, 0.2); const bx = x + 95, by = y - 90; rr(bx, by, 40, 150, 14, 'rgba(255,255,255,.95)', '#3a2f3f'); rr(bx + 6, by + 6 + 138 * (1 - sug), 28, 138 * sug, 9, sug > 0.7 ? '#ff8fab' : sug > 0.4 ? '#ffc94d' : '#ff5f6d'); txt('น้ำตาล', bx + 20, by + 174, 30, '#ffffff', 700);
          if (sug < 0.4 && ph('s5', t) > 0.3) { const [hx, hy] = wp(S.lc.userData.head, 1.0); bubble('หิวอีกแล้ว…', hx - 60, hy - 30, U.clamp((0.4 - sug) / 0.1), 40); } }
        else { [['≤ 4', 'ทั้งวัน', '#2fa86a', -0.55], ['5–12', '1 ขวด', '#ff4f7a', 0.45]].forEach(([n, l, col, dx], i) => { const a = U.clamp((t - q - 0.3 - i * 0.8) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3(-56.9 + dx, 2.2, 0.2)); g.save(); g.globalAlpha = a; txt(n, x, y - 40, 60, col, 800); txt(l, x, y + 10, 36, '#3a2f3f', 700); g.restore(); }); }
      }
      /* s6: doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 470, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['หิวจัด กินเยอะ แต่น้ำหนักลด', 'กระหายน้ำ ดื่มน้ำบ่อยผิดปกติ', 'ฉี่บ่อย หรือกลับมาฉี่รดที่นอน', 'อ่อนเพลีย ซึม ผิดปกติ', 'หายใจมีกลิ่นผลไม้ อาเจียน → รีบไป รพ.'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 390 + i * 76; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('อาจเป็นสัญญาณเบาหวานในเด็ก · ที่มา: CDC', 540, 772, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s7: food labels */
      if (b === 's7') {
        const p = ph('s7', t), q = SP('s7', 0.5);
        if (t < q) [[S.c.mama, 'กล้วย', '+ นมจืด'], [S.c.nana, 'ไข่ต้ม', '+ ข้าวโพด']].forEach(([o, l1, l2], i) => { const a = U.clamp((t - TM('s7', i, 0.15 + i * 0.1)) / (0.1 * dur('s7'))) * U.clamp((q - t) / 0.25); if (a <= 0) return; const [x, y] = wp(o.userData.head, 0.95 * o.scale.x + 0.1); g.save(); g.globalAlpha = a; rr(x - 95, y - 92, 190, 100, 24, 'rgba(255,255,255,.92)', '#ff8fab'); plain(l1, x, y - 62, 34, '#3a2f3f', 800, 'center'); plain(l2, x, y - 22, 30, '#ff4f7a', 700, 'center'); g.restore(); });
      }
      /* s8: crunch text */
      if (b === 's8' && ph('s8', t) > 0.4) { const [x, y] = wp(S.c.mama.userData.head, 1.0); const k = (t * 1.6) % 1; g.save(); g.globalAlpha = Math.sin(k * PI); txt('กร๊วบ!', x + 10, y - 20 - k * 40, 34, '#2fa86a', 800); g.restore(); }
      /* sm: milk badges */
      if (b === 'sm') {
        const K1 = TM('sm', 0, 0.34), K2 = TM('sm', 1, 0.68), pg = t < K1 ? 0 : t < K2 ? 1 : 2;
        const badge = (x, y, ok, a) => { g.save(); g.globalAlpha = a; const r = 34 * (0.85 + 0.15 * U.easeBack(Math.min(1, a))); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#2fbf71' : '#ff4f6a'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); if (ok) { g.moveTo(x - 14, y + 1); g.lineTo(x - 4, y + 12); g.lineTo(x + 16, y - 12); } else { g.moveTo(x - 12, y - 12); g.lineTo(x + 12, y + 12); g.moveTo(x + 12, y - 12); g.lineTo(x - 12, y + 12); } g.stroke(); g.restore(); };
        const tags = [[[0, true, 'UHT'], [1, false, 'พาสเจอร์ไรส์']], [[1, false, 'นอกตู้เย็น ≤ 2 ชม.']], [[0, true, 'รสจืด'], [2, false, 'รสหวาน']]][pg];
        const k0 = [at('sm') + 0.4, K1, K2][pg];
        tags.forEach(([i, ok, lab], j) => { const a = U.clamp((t - k0 - 0.2 - j * 0.35) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3([1.75, 2.9, 4.05][i], TBL.y + 1.35, -0.55)); badge(x, y - 10, ok, a); g.save(); g.globalAlpha = a; txt(lab, x, y - 72, 34, ok ? '#7dffb0' : '#ffd35e', 800); g.restore(); });
      }
      /* s9: tips */
      if (b === 's9') {
        const p = ph('s9', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['กินมื้อเช้าทุกวัน ก่อนออกจากบ้าน', 'ยังไม่กลับบ้านทันที? พกของว่างดีๆ', 'น้ำเปล่า หรือนมจืด แทนน้ำหวาน', 'ให้ลูกเลือกเอง จากของว่างดีๆ 2 อย่าง', 'นั่งกินที่โต๊ะ ไม่กินหน้าจอ'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s9', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s9', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(37 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[84, ['เลิกเรียนปุ๊บ หิวปั๊บ', '#fff']], [58, ['ลูกกินไม่อิ่ม หรือร่างกายเรียกร้อง?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: end('s1') - 0.05, y: 290, lines: [[62, ['กลับถึงบ้าน วิ่งหาตู้เย็น', '#fff']], [46, ['หิวหลังเลิกเรียน เป็นเรื่องปกติของเด็กวัยเรียน', '#ffe3ea', 600]]], foot: 'เด็กวัยเรียนกิน 3 มื้อ + ของว่าง 1–2 ครั้ง/วัน (KidsHealth)' },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.55), y: 290, lines: [[62, ['กินข้าวเที่ยง 11 โมง', '#fff']], [58, ['ถึงบ้าน บ่าย 3 ครึ่ง', '#ffd35e']]] },
      { t0: SP('s2', 0.55) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[62, ['ห่างกัน ', '#fff'], ['4 ชม. ครึ่ง!', '#ffd35e']], [46, ['แต่เด็กส่วนใหญ่ต้องได้กินทุก 3–4 ชม.', '#ffe3ea', 600]]], foot: 'ที่มา: KidsHealth (Nemours)' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.5), y: 290, lines: [[60, ['ร่างกายลูก = ถังพลังงานใบเล็ก', '#fff']], [46, ['ถูกดึงไปใช้ทั้งวัน 3 ทาง', '#ffe3ea', 600]]] },
      { t0: SP('s3', 0.5) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[60, ['ถังพร่อง = หิวจัด หงุดหงิด', '#ffd35e']], [46, ['ที่เรียกกันว่า "หิวโมโห"', '#fff', 600]]], foot: 'เด็กวัยเรียนต้องการพลังงานและสารอาหารมาก (กรมอนามัย)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.55), y: 290, lines: [[60, ['มื้อเช้าหาย ถังพร่องเร็ว', '#fff']], [46, ['เด็กที่กินมื้อเช้า "ทุกวัน" มีแค่…', '#ffe3ea', 600]]], foot: 'กรมอนามัย สำรวจเด็กวัยเรียน ปี 2560' },
      { t0: SP('s4', 0.55) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[66, ['1 ใน 3', '#ffd35e'], [' ของเด็ก 10 ขวบ', '#fff']], [52, ['ไม่ได้กินมื้อเช้าทุกวัน', '#fff']]], foot: 'กรมอนามัย สำรวจเด็กวัยเรียน ปี 2560' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[60, ['น้ำหวาน กันหิวได้แป๊บเดียว', '#fff']], [46, ['น้ำตาลพุ่ง แล้วดิ่ง → หิวอีก งอแง', '#ffe3ea', 600]]], foot: 'เด็กไทย 1 ใน 3 ดื่มน้ำอัดลมทุกวัน (กรมอนามัย 2566)' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 280, lines: [[52, ['น้ำหวาน 1 ขวด (250 มล.) มีน้ำตาล', '#fff']], [70, ['5–12 ช้อนชา', '#ffd35e']], [44, ['แต่ทั้งวัน เด็กไม่ควรเกิน 4 ช้อนชา', '#ffe3ea', 600]]], foot: 'ม.มหิดล 2562 (9–19 ก./100 มล.) · กรมอนามัย/สสส.' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['หิวแบบนี้ พาไปพบแพทย์', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.5), y: 290, lines: [[62, ['ของว่าง = มื้อจิ๋ว', '#ffd35e']], [46, ['แป้ง + โปรตีน อิ่มนานกว่าขนมหวาน', '#fff', 600]]] },
      { t0: SP('s7', 0.5) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[58, ['ไม่ใช่มื้อที่ 4 แค่ "กันหิว"', '#fff']], [46, ['กินห่างมื้อเย็น 1–2 ชม.', '#ffe3ea', 600]]], foot: 'แนวทางของว่างเด็กวัยเรียน: KidsHealth (Nemours)' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 290, lines: [[58, ['บ้านไหนกินข้าวเย็นเร็ว', '#fff']], [46, ['ข้ามของว่างได้ ให้ผักของมื้อเย็นรองท้อง', '#ffe3ea', 600]]], foot: 'ที่มา: KidsHealth (Nemours)' },
      { t0: at('sm') + 0.2, t1: TM('sm', 0, 0.34), y: 290, lines: [[62, ['พกนมใส่กระเป๋า ดีไหม?', '#ffd35e']], [46, ['ดี! ถ้าเป็น "นม UHT" กล่องที่ยังไม่เปิด', '#fff', 600]]], foot: 'นม UHT เก็บนอกตู้เย็นได้ จนกว่าจะเปิดกล่อง' },
      { t0: TM('sm', 0, 0.34) + 0.02, t1: TM('sm', 1, 0.68), y: 280, lines: [[58, ['นมพาสเจอร์ไรส์ ต้องแช่เย็น', '#fff']], [44, ['ของสดในกระเป๋า นอกตู้เย็นได้ไม่เกิน 2 ชม.', '#ffe3ea', 600]], [44, ['วันร้อนเกิน 32°C แค่ 1 ชม. ก็เสี่ยงบูด', '#ffe3ea', 600]]], foot: 'ที่มา: USDA FSIS (Keeping Bag Lunches Safe)' },
      { t0: TM('sm', 1, 0.68) + 0.02, t1: end('sm') - 0.05, y: 290, lines: [[62, ['เลือกนมรสจืด', '#ffd35e']], [46, ['แกะแล้วดื่มให้หมด ไม่เก็บไว้กินต่อ', '#fff', 600]]], foot: 'นมรสหวาน ได้นมน้อยลง แต่ได้น้ำตาลเพิ่ม (กรมอนามัย)' },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[58, ['5 ทิป หลังเลิกเรียน ไม่หิวโมโห', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[60, ['ท้องอิ่มพอดี อารมณ์ดีทั้งบ้าน', '#fff']], [44, ['ของว่างหลังเลิกเรียน บ้านคุณคืออะไร? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: KidsHealth, กรมอนามัย, ม.มหิดล, CDC, USDA' },
    ],
    trans,
    audio: [
      [0.4, 'growl'], [1.3, 'boing'],
      [at('s1') + 0.3, 'whoosh'], [P('s1', 0.1), 'pop'], [at('s1') + 0.6, 'growl'], [SP('s1', 0.5), 'pop'], [P('s1', 0.55), 'boing'], [P('s1', 0.65), 'growl'],
      [at('s2') + 0.3, 'shimmer'], [P('s2', 0.06), 'pop'], [P('s2', 0.1), 'pop'], [P('s2', 0.14), 'pop'], [P('s2', 0.18), 'pop'], [P('s2', 0.3), 'ding'], [SP('s2', 0.55) + 0.1, 'warn'], [P('s2', 0.7), 'growl'],
      [at('s3') + 0.4, 'bubble'], [P('s3', 0.25), 'bubble'], [P('s3', 0.4), 'bubble'], [SP('s3', 0.5), 'warn'], [P('s3', 0.62), 'growl'], [P('s3', 0.8), 'thud'],
      [at('s4') + 0.4, 'riser'], [P('s4', 0.5), 'ding'], [SP('s4', 0.55) + 0.3, 'pop'],
      [at('s5') + 0.4, 'giggle'], [P('s5', 0.14), 'slurp'], [P('s5', 0.2), 'twinkle'], [P('s5', 0.36), 'thud'], [P('s5', 0.4), 'growl'], [SP('s5', 0.5), 'whoosh'], [SP('s5', 0.5) + 0.4, 'pop'], [SP('s5', 0.5) + 1.2, 'pop'], [SP('s5', 0.5) + 1.8, 'warn'],
      [at('s6') + 0.3, 'heartbeat'], [TM('s6', 0, 0.15), 'tick'], [TM('s6', 1, 0.25), 'tick'], [TM('s6', 2, 0.35), 'tick'], [TM('s6', 3, 0.45), 'tick'], [TM('s6', 4, 0.55), 'tick'], [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.4, 'pop'], [P('s7', 0.18), 'pop'], [P('s7', 0.25), 'giggle'], [SP('s7', 0.5), 'ding'],
      [at('s8') + 0.4, 'shimmer'], [P('s8', 0.45), 'crunch'], [P('s8', 0.7), 'crunch'],
      [at('sm') + 0.3, 'pop'], [at('sm') + 0.8, 'ding'], [TM('sm', 0, 0.34) + 0.2, 'warn'], [TM('sm', 1, 0.68) + 0.2, 'ding'], [P('sm', 0.75), 'giggle'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [at('s10') + 1.2, 'heart'], [at('s10') + 2.2, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s6'), CK.MUSIC.OOPS), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
  /* sugar level for ลิ้นจี่ in s5 (0..1): sip -> spike -> crash */
  function sugar(t) { const p = (t - at('s5')) / dur('s5'); if (p < 0.14) return 0.35; if (p < 0.22) return U.lerp(0.35, 1, U.easeOut((p - 0.14) / 0.08)); if (p < 0.27) return 1; return Math.max(0.12, U.lerp(1, 0.12, U.easeIO(U.clamp((p - 0.27) / 0.12)))); }
})();
