/* พ่อแม่หัวจะปวด — ส่งลูกทันเข้าแถว สำคัญไหม + วัยอนุบาลยังร้องเพลงชาติไม่ได้ เป็นไรไหม
   Build: node build.js song-luk-tan-khao-thaeo.js out.html --kit clay --title "ส่งลูกทันเข้าแถว สำคัญไหม?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 7], ['s2', 7], ['s3', 7], ['s4', 7.5], ['s5', 8], ['s6', 6.5], ['s7', 7], ['s8', 6], ['s9', 5.5], ['s10', 8.5], ['s11', 5.2], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, RT = REEL ? 1.1 : 0;
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's11'; };
  const QA = () => MK.s1 ? TM('s1', 0, 0) : at('s1');
  const AR = (i) => TM('s2', i, [0.2, 0.36, 0.52][i]);
  const K4 = (t) => { const a = at('s4') + 0.5, b = SP('s4', 0.55) - 0.35; return U.clamp((t - a) / (b - a)); };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt == null ? 0.12 : tilt; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* ---- stage 0: school yard ---- */
  const POLE = [-3.0, -3.6];
  const LINE = [['n0', -3.6], ['mama', -2.0], ['n1', -0.4], ['n2', 1.2]], LZ = 0.3;
  const TEACH = [-5.6, -0.3], CHUB = [2.85, 0.4], CMOM = [4.75, -0.3];
  const HOME = -120;

  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const flagTex = () => ctex(192, 128, (x) => { const S = [['#e0303f', 1], ['#ffffff', 1], ['#2d3a8c', 2], ['#ffffff', 1], ['#e0303f', 1]]; let y = 0; for (const [c, n] of S) { x.fillStyle = c; x.fillRect(0, y, 192, n * 128 / 6 + 1); y += n * 128 / 6; } });
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3], [150, 200, 4]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const eveTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ff8fa3'); g.addColorStop(1, '#ffd39a'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ffe36e'; x.beginPath(); x.arc(128, 200, 46, 0, 7); x.fill(); });

  function clockFace(cv, h, wedge) {
    const x = cv.getContext('2d'); x.clearRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = '#ff8fab'; x.stroke();
    if (wedge > 0) { x.fillStyle = 'rgba(255,95,109,0.85)'; x.beginPath(); x.moveTo(128, 128); x.arc(128, 128, 108, -PI / 2, -PI / 2 + wedge * PI * 2); x.closePath(); x.fill(); }
    x.fillStyle = '#3a2f3f'; for (let i = 0; i < 12; i++) { const a = i / 12 * PI * 2; x.beginPath(); x.arc(128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92, i % 3 ? 5 : 9, 0, 7); x.fill(); }
    x.lineCap = 'round'; const ha = (h % 12) / 12 * PI * 2, ma = (h % 1) * PI * 2;
    x.strokeStyle = '#3a2f3f'; x.lineWidth = 14; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ha) * 52, 128 - Math.cos(ha) * 52); x.stroke();
    x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ma) * 80, 128 - Math.cos(ma) * 80); x.stroke();
    x.fillStyle = '#ff8fab'; x.beginPath(); x.arc(128, 128, 12, 0, 7); x.fill();
  }

  /* shots */
  const LW = FW(-2.1, 0, 9.6, 3.95, 0.14), WIDE = FW(-0.6, 0, 13.8, 3.95, 0.14);
  const SH = {
    cover: [FW(3.0, 1.2, 7.4, 3.95, 0.16), FW(2.8, 1.2, 7.0, 3.95, 0.16)],
    s1: [LW, FW(-2.1, 0, 9.3, 3.95, 0.14)],
    s2: [FW(60 + RT * 0.7, 0.2, 11.8 + RT, 2.5 - RT, 0.3), FW(60 + RT * 0.7, 0.2, 12.2 + RT, 2.5 - RT, 0.3)],
    s3: [WIDE, FW(-0.4, 0, 13.4, 3.95, 0.14)],
    s4: [FW(120 + RT * 0.7, 0, 10.6 + RT, 2.9 - RT, 0.08), FW(120 + RT * 0.7, 0, 10.3 + RT, 2.9 - RT, 0.08)],
    s5: [FW(-60 + RT * 0.6, 0, 9.6 + RT, 3.3 - RT * 1.2, 0.16), FW(-60 + RT * 0.6, 0, 9.3 + RT, 3.3 - RT * 1.2, 0.16)],
    s6: [LW, FW(-2.1, 0, 9.2, 3.95, 0.14)],
    s7: [FW(HOME + 0.2, 0, 7.4, 4.05, 0.14), FW(HOME + 0.2, 0, 7.2, 4.05, 0.14)],
    s8: [FW(HOME - 0.4, 0, 6.8, 3.95, 0.14), FW(HOME - 0.4, 0, 6.5, 3.95, 0.14)],
    s9: [FW(HOME + 0.0, 0, 7.4, 3.95, 0.14), FW(HOME + 0.0, 0, 7.1, 3.95, 0.14)],
    s10: [FW(HOME + 0.2, 0, 7.6, 4.05, 0.14), FW(HOME + 0.2, 0, 7.4, 4.05, 0.14)],
    s11: [FW(0.7, -0.2, 10.4, 3.95, 0.2), FW(0.7, -0.2, 9.9, 3.95, 0.2)],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11']);
  const CAM = [];
  for (const id of ORDER) {
    const [f, to] = SH[id], t0 = at(id), t1 = end(id);
    CAM.push(Object.assign({ t: t0 }, f));
    if (id === 's1') { CAM.push(Object.assign({ t: SP('s1', 0.52) - 0.1 }, to)); CAM.push(Object.assign({ t: SP('s1', 0.52) + 0.9 }, WIDE)); CAM.push(Object.assign({ t: t1 }, FW(-0.5, 0, 13.6, 3.95, 0.14))); continue; }
    CAM.push(Object.assign({ t: t1 }, to));
  }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.run({
    DUR, file: 'song-luk-tan-khao-thaeo', title: 'ส่งลูกทันเข้าแถว สำคัญไหม?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกวัยอนุบาล', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const keep = (g, k) => { g.userData.base = g.scale.x; scene.add(g); return g; };

      /* ===== stage 0: school yard ===== */
      const yard = CK.room(T, { wall: '#ffe9a8', dots: 'rgba(255,255,255,0.7)', wain: '#ff9ec0', floor: '#bfeaa0', rug: false, props: false, winX: -6.2 }); scene.add(yard);
      for (const wx of [3.0, 6.4]) { const w = new T.Group(); const pn = new T.Mesh(new T.PlaneGeometry(2.0, 1.6), new T.MeshBasicMaterial({ color: '#bfe6ff' })); w.add(pn); for (const [ww, hh, xx, yy] of [[2.2, 0.12, 0, 0.86], [2.2, 0.12, 0, -0.86], [0.12, 1.8, 1.05, 0], [0.12, 1.8, -1.05, 0], [0.08, 1.6, 0, 0]]) { const b = new T.Mesh(new T.BoxGeometry(ww, hh, 0.1), M('#ffffff')); b.position.set(xx, yy, 0.03); w.add(b); } w.position.set(wx, 3.1, -4.32); scene.add(w); }
      const roof = new T.Mesh(new T.BoxGeometry(18, 0.5, 1.2), M('#ff7a8a')); roof.position.set(0, 7.8, -4.0); scene.add(roof);
      for (const [x, c] of [[-7.6, '#57c98b'], [-1.6, '#5fd38d'], [1.4, '#57c98b'], [7.8, '#5fd38d']]) { const bsh = new T.Group(); for (const [dx, dy, r] of [[0, 0.45, 0.55], [-0.45, 0.32, 0.4], [0.45, 0.32, 0.42]]) { const s = new T.Mesh(new T.SphereGeometry(r, 16, 12), M(c)); s.position.set(dx, dy, 0); bsh.add(s); } bsh.position.set(x, 0, -3.7); scene.add(bsh); }
      /* flagpole */
      const pole = new T.Group(); pole.position.set(POLE[0], 0, POLE[1]); scene.add(pole);
      const pb = new T.Mesh(new T.CylinderGeometry(0.45, 0.55, 0.3, 24), M('#ffffff')); pb.position.y = 0.15; pole.add(pb);
      const ps = new T.Mesh(new T.CylinderGeometry(0.06, 0.07, 4.1, 12), M('#e6e6ee', { metalness: 0.2 })); ps.position.y = 2.15; pole.add(ps);
      const pball = new T.Mesh(new T.SphereGeometry(0.13, 14, 10), M('#ffd23f')); pball.position.y = 4.25; pole.add(pball);
      const flag = new T.Mesh(new T.PlaneGeometry(1.05, 0.7, 8, 1), new T.MeshStandardMaterial({ map: flagTex(), side: T.DoubleSide, roughness: 0.6 })); flag.geometry.translate(0.56, 0, 0); pole.add(flag);
      const fpos = flag.geometry.attributes.position, fx0 = Float32Array.from(fpos.array);
      /* wall clock */
      const ccv = document.createElement('canvas'); ccv.width = ccv.height = 256; clockFace(ccv, 7.97, 0); const ctx2 = new T.CanvasTexture(ccv);
      const clock = new T.Mesh(new T.CircleGeometry(0.6, 40), new T.MeshBasicMaterial({ map: ctx2, transparent: true })); clock.position.set(0.6, 3.25, -4.3); scene.add(clock);
      /* line-up + teacher + late pair */
      const ln = {};
      ln.n0 = keep(CK.neighbor(T, 0, { scale: 0.95 })); ln.n1 = keep(CK.neighbor(T, 1, { scale: 0.95 })); ln.n2 = keep(CK.neighbor(T, 3, { scale: 0.95 }));
      ln.mama = keep(CK.family(T, 'mama'));
      const teach = keep(CK.neighbor(T, 3, { scale: 1.3, lashes: true, top: '#b9a4ff', bottom: '#5a6fd0', hairStyle: 'bob', hair: '#3a2a22' }));
      const chub = keep(CK.neighbor(T, 2, { scale: 0.9, top: '#ffd166', bottom: '#5fb3ff' }));
      const cmom = keep(CK.neighbor(T, 0, { scale: 1.3, lashes: true, top: '#ffb86b', bottom: '#6aaaf0', hairStyle: 'pigtails', hair: '#5a3d2b' }));
      const bag = new T.Group(); const bgb = new T.Mesh(new T.BoxGeometry(0.5, 0.55, 0.3), M('#ff6f91')); bag.add(bgb); const bgf = new T.Mesh(new T.BoxGeometry(0.36, 0.2, 0.08), M('#ffd23f')); bgf.position.set(0, -0.08, 0.18); bag.add(bgf); bag.position.set(0, 0.95, -0.32); chub.add(bag);
      /* family (cover + closing) */
      const fam = {}; for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) fam[k] = keep(CK.family(T, k));
      const mbag = new T.Group(); const mb1 = new T.Mesh(new T.BoxGeometry(0.5, 0.55, 0.3), M('#5ab8ff')); mbag.add(mb1); const mb2 = new T.Mesh(new T.BoxGeometry(0.36, 0.2, 0.08), M('#ffffff')); mb2.position.set(0, -0.08, 0.18); mbag.add(mb2); mbag.position.set(0, 0.95, -0.32); fam.mama.add(mbag);

      /* ===== stage 1: bridge home -> class (x = 60) ===== */
      const S1 = new T.Group(); S1.position.x = 60; scene.add(S1);
      const water = new T.Mesh(new T.BoxGeometry(24, 0.2, 30), M('#4fb0ec')); water.position.set(0, -0.3, 10); S1.add(water);
      const back1 = new T.Mesh(new T.BoxGeometry(16, 9, 0.3), M('#ffe8f0')); back1.position.set(0, 3.5, -4.2); S1.add(back1);
      const mkHouse = (x, w, h, c, rc) => { const g = new T.Group(); const bx = new T.Mesh(new T.BoxGeometry(w, h, 1.6), M(c)); bx.position.y = h / 2; g.add(bx); const rf = new T.Mesh(new T.ConeGeometry(w * 0.78, 0.9, 4), M(rc)); rf.rotation.y = PI / 4; rf.position.y = h + 0.45; g.add(rf); const dr = new T.Mesh(new T.BoxGeometry(0.5, 0.8, 0.06), M('#ffffff')); dr.position.set(0, 0.4, 0.82); g.add(dr); const gr = new T.Mesh(new T.CylinderGeometry(w * 0.7, w * 0.7, 0.2, 24), M('#9fe3a0')); gr.position.y = -0.1; g.add(gr); g.position.set(x, 0, -0.2); S1.add(g); return g; };
      mkHouse(-4.6, 1.5, 1.3, '#ffd23f', '#ff6f91'); const cls = mkHouse(4.6, 2.0, 1.7, '#9fd3ff', '#ff8fab');
      const ISL = [-2.4, 0, 2.4], ISC = ['#ffd35e', '#ff8fab', '#79dcb4'];
      const isl = ISL.map((x, i) => { const m = new T.Mesh(new T.CylinderGeometry(0.85, 0.95, 0.4, 28), M(ISC[i], { emissive: ISC[i], emissiveIntensity: 0 })); m.position.set(x, 0.05, 0.2); S1.add(m); return m; });
      const mini = CK.family(T, 'mama', { scale: 0.8 }); mini.userData.base = 0.8; S1.add(mini);

      /* ===== stage 2: 5 clocks (x = 120) ===== */
      const S2 = new T.Group(); S2.position.x = 120; scene.add(S2);
      const plat = new T.Mesh(new T.BoxGeometry(16, 0.3, 10), M('#ff9ebd')); plat.position.set(0, -0.15, 0); S2.add(plat);
      const back2 = new T.Mesh(new T.BoxGeometry(16, 9, 0.3), M('#fff4e6')); back2.position.set(0, 3.5, -4.2); S2.add(back2);
      const clocks = [-4, -2, 0, 2, 4].map((x, i) => { const cv = document.createElement('canvas'); cv.width = cv.height = 256; clockFace(cv, 8.0, 0); const tx = new T.CanvasTexture(cv); const g = new T.Group(); const st = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 1.0, 10), M('#ffffff')); st.position.y = 0.5; g.add(st); const bs = new T.Mesh(new T.CylinderGeometry(0.35, 0.4, 0.12, 20), M('#ffffff')); bs.position.y = 0.06; g.add(bs); const back = new T.Mesh(new T.CylinderGeometry(0.82, 0.82, 0.16, 40), M(['#ffd35e', '#ff8fab', '#79dcb4', '#9fd3ff', '#c9b6ff'][i])); back.rotation.x = PI / 2; back.position.set(0, 1.85, -0.09); g.add(back); const face = new T.Mesh(new T.CircleGeometry(0.72, 40), new T.MeshBasicMaterial({ map: tx, transparent: true })); face.position.set(0, 1.85, 0.0); g.add(face); g.position.set(x, 0, 0); S2.add(g); return { g, cv, tx, w: -1 }; });

      /* ===== stage 3: song ladder (x = -60) ===== */
      const S3 = new T.Group(); S3.position.x = -60; scene.add(S3);
      const plat3 = new T.Mesh(new T.BoxGeometry(16, 0.3, 10), M('#c9b6ff')); plat3.position.set(0, -0.15, 0); S3.add(plat3);
      const back3 = new T.Mesh(new T.BoxGeometry(16, 9, 0.3), M('#fff0f6')); back3.position.set(0, 3.5, -4.2); S3.add(back3);
      const STX = [-2.85, -0.95, 0.95, 2.85], STC = ['#ffd35e', '#ff8fab', '#79dcb4', '#9fd3ff'];
      STX.forEach((x, i) => { const h = 0.5 * (i + 1); const b = new T.Mesh(new T.BoxGeometry(1.86, h, 1.6), M(STC[i])); b.position.set(x, h / 2, 0); S3.add(b); const tp = new T.Mesh(new T.BoxGeometry(1.9, 0.08, 1.64), M('#ffffff')); tp.position.set(x, h + 0.04, 0); S3.add(tp); });
      const notes = []; for (let i = 0; i < 6; i++) { const n = new T.Group(); const hd = new T.Mesh(new T.SphereGeometry(0.16, 14, 10), M(i % 2 ? '#ff6f91' : '#5ab8ff')); hd.scale.set(1.2, 0.9, 0.7); n.add(hd); const stm = new T.Mesh(new T.BoxGeometry(0.05, 0.5, 0.05), M('#3a2f3f')); stm.position.set(0.17, 0.25, 0); n.add(stm); S3.add(n); notes.push(n); }
      const mini3 = CK.family(T, 'mama', { scale: 0.8 }); mini3.userData.base = 0.8; S3.add(mini3);

      /* ===== stage 4: home (x = -120) ===== */
      const room = CK.room(T, { wall: '#ffd9e4', wain: '#9fe3cf', floor: '#ffe3bd', rug: '#b9a4ff', winX: 2.2 }); room.position.x = HOME; scene.add(room);
      const NT = nightTex(), ET = eveTex(), DT = room.userData.win.material.map;
      const hm = {}; hm.mom = keep(CK.family(T, 'mom')); hm.mama = keep(CK.family(T, 'mama')); hm.nana = keep(CK.family(T, 'nana'));
      const book = new T.Group(); const bk = new T.Mesh(new T.BoxGeometry(0.62, 0.82, 0.1), M('#ff8fb8')); book.add(bk); const bl = new T.Mesh(new T.BoxGeometry(0.42, 0.22, 0.02), M('#ffffff')); bl.position.set(0, 0.16, 0.06); book.add(bl); const bh = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), M('#ff4f7b')); bh.position.set(0, -0.18, 0.06); book.add(bh);
      book.position.set(0, -0.2, 0.25); hm.mom.userData.hand1.add(book);
      const chair = new T.Group(); const seat = new T.Mesh(new T.BoxGeometry(1.2, 0.14, 1.0), M('#e9b27c')); seat.position.y = 0.8; chair.add(seat); const cb = new T.Mesh(new T.BoxGeometry(1.2, 1.0, 0.12), M('#e9b27c')); cb.position.set(0, 1.35, -0.45); chair.add(cb); for (const [lx, lz] of [[-0.5, -0.4], [0.5, -0.4], [-0.5, 0.4], [0.5, 0.4]]) { const l = new T.Mesh(new T.BoxGeometry(0.1, 0.8, 0.1), M('#d99a6c')); l.position.set(lx, 0.4, lz); chair.add(l); }
      const shirt = new T.Mesh(new T.BoxGeometry(0.8, 0.12, 0.6), M('#ffffff')); shirt.position.set(-0.1, 0.94, 0.05); chair.add(shirt); const shorts = new T.Mesh(new T.BoxGeometry(0.6, 0.1, 0.4), M('#2d3a8c')); shorts.position.set(-0.1, 1.04, 0.05); chair.add(shorts);
      const cbag = new T.Group(); const cb1 = new T.Mesh(new T.BoxGeometry(0.55, 0.6, 0.3), M('#5ab8ff')); cbag.add(cb1); const cb2 = new T.Mesh(new T.BoxGeometry(0.4, 0.22, 0.08), M('#ffffff')); cb2.position.set(0, -0.1, 0.18); cbag.add(cb2); cbag.position.set(0.3, 1.18, -0.25); chair.add(cbag);
      chair.position.set(HOME + 2.1, 0, -0.9); chair.rotation.y = -0.3; scene.add(chair);

      return { key, hemi, yard, pole, flag, fpos, fx0, clock, ccv, ctx2, clockH: 7.97, ln, teach, chub, cmom, fam, isl, mini, cls, clocks, mini3, notes, room, NT, ET, DT, hm, book, chair };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      { const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4f5a7a'), dn); }
      s.room.userData.win.material.map = bt === 's7' ? s.NT : bt === 's9' ? s.ET : s.DT;

      /* ---------- stage 0 ---------- */
      const atSchool = ['cover', 's1', 's3', 's6', 's11'].includes(bt);
      /* flag: low before 8:00, rises during s1 anthem, up afterwards */
      { const fr = bt === 'cover' ? 0 : bt === 's1' ? U.easeIO(U.clamp((t - QA() - 0.3) / (SP('s1', 0.52) - QA() - 0.6))) : 1;
        s.flag.position.y = U.lerp(1.05, 3.55, fr);
        const a = s.fpos.array; for (let i = 0; i < s.fpos.count; i++) { const x = s.fx0[i * 3]; a[i * 3 + 2] = s.fx0[i * 3 + 2] + Math.sin(x * 4.5 - t * 5) * 0.08 * x; } s.fpos.needsUpdate = true; }
      { const ch = bt === 'cover' ? 7.967 + t * 0.001 : bt === 's1' ? (t < SP('s1', 0.52) ? 8.0 + ph('s1', t) * 0.03 : 8.33) : bt === 's3' ? 8.34 : 8.05;
        if (Math.abs(ch - s.clockH) > 0.002) { s.clockH = ch; clockFace(s.ccv, ch, 0); s.ctx2.needsUpdate = true; } s.clock.visible = bt !== 's11'; }

      const LN = s.ln, q1 = SP('s1', 0.52);
      const lineOn = atSchool && (bt === 's1' || bt === 's3' || bt === 's6');
      for (const [k, x] of LINE) {
        const g = LN[k]; g.visible = lineOn; if (!g.visible) continue;
        g.position.set(x, 0, LZ); g.rotation.set(0, 0, 0);
        let ex = 'happy', look = 0;
        if (bt === 's1') { { const f = (t - QA()) / Math.max(0.5, q1 - QA()); ex = k === 'mama' ? (f < 0.3 ? 'happy' : f < 0.6 ? 'worried' : 'giggle') : 'happy'; } if (t > q1 + 0.8) { look = 0.55; ex = k === 'mama' ? 'worried' : 'happy'; } }
        if (bt === 's3') { look = 0.6 - 0.25 * U.clamp((ph('s3', t) - 0.55) / 0.2); ex = ph('s3', t) < 0.5 ? 'worried' : 'happy'; }
        if (bt === 's6') ex = ph('s6', t) > 0.8 ? 'giggle' : 'happy';
        g.rotation.y = look; g.userData.setExpr(ex); g.userData.tick(t, { breath: 0.35 });
        if (bt === 's6' || (bt === 's1' && t < q1)) { g.userData.arm1.rotation.z = 0.12; g.userData['arm-1'].rotation.z = -0.12; }
        if (k === 'mama' && bt === 's1' && t < q1) g.position.y = 0.04 * Math.abs(Math.sin(t * 6));
        if (k === 'mama' && bt === 's6' && ph('s6', t) > 0.8) { g.userData.arm1.rotation.z = 2.4 + 0.12 * Math.sin(t * 8); g.userData.arm1.rotation.x = 0.9; }
      }
      { const g = s.teach; g.visible = lineOn; if (g.visible) { g.position.set(TEACH[0], 0, TEACH[1]); g.rotation.y = bt === 's3' ? 0.5 : 0.25; g.userData.setExpr(bt === 's3' && ph('s3', t) < 0.5 ? 'worried' : 'happy'); g.userData.tick(t, { wave: bt === 's3' && ph('s3', t) > 0.62 }); if (bt === 's1' && t < q1) { g.userData.arm1.rotation.z = 1.2 + 0.25 * Math.sin(t * 4.2); g.userData.arm1.rotation.x = 0.4; } } }
      /* late pair: run in during s1 second half, cling in s3 */
      { const on = (bt === 's1' && t > q1) || bt === 's3'; s.chub.visible = s.cmom.visible = on;
        if (on) {
          const k = bt === 's1' ? U.easeOut(U.clamp((t - q1 - 0.2) / 1.6)) : 1, run = bt === 's1' && k < 1;
          s.chub.position.set(U.lerp(8.6, CHUB[0], k), run ? 0.12 * Math.abs(Math.sin(t * 13)) : 0, CHUB[1]);
          s.cmom.position.set(U.lerp(10.6, CMOM[0], k), run ? 0.1 * Math.abs(Math.sin(t * 11)) : 0, CMOM[1]);
          s.chub.rotation.y = run ? -0.9 : 0.35; s.cmom.rotation.y = run ? -0.9 : -0.2;
          const p3 = bt === 's3' ? ph('s3', t) : 0;
          s.chub.userData.setExpr(bt === 's1' ? 'worried' : p3 < 0.55 ? 'cry' : 'happy'); s.cmom.userData.setExpr(bt === 's3' && p3 > 0.6 ? 'happy' : 'worried');
          s.chub.userData.tick(t, { breath: run ? 1.2 : 0.4 }); s.cmom.userData.tick(t, { breath: run ? 1.2 : 0.4 });
          if (run) { for (const g of [s.chub, s.cmom]) { g.userData.arm1.rotation.z = 0.5 + 0.4 * Math.sin(t * 12); g.userData['arm-1'].rotation.z = -0.5 + 0.4 * Math.sin(t * 12); } }
          else if (bt === 's3' && p3 < 0.55) { s.chub.userData.arm1.rotation.z = 1.5 + 0.1 * Math.sin(t * 7); s.chub.userData.arm1.rotation.x = -0.3; s.cmom.userData['arm-1'].rotation.z = -0.9; s.cmom.userData['arm-1'].rotation.x = -0.4; }
          else if (bt === 's3') { s.chub.userData.arm1.rotation.z = 2.5 + 0.25 * Math.sin(t * 9); }
        } }
      /* family: cover runs in; closing line-up */
      { const F = s.fam, cov = bt === 'cover', cl = bt === 's11';
        for (const k in F) F[k].visible = cov ? (k === 'dad' || k === 'mama') : cl;
        if (cov) {
          const k = U.easeOut(U.clamp((t - 0.1) / 2.0)), run = k < 0.98;
          F.dad.position.set(U.lerp(4.8, 4.2, k), run ? 0.1 * Math.abs(Math.sin(t * 11)) : 0, 1.2); F.mama.position.set(U.lerp(2.8, 2.2, k), run ? 0.14 * Math.abs(Math.sin(t * 13)) : 0, 1.3);
          F.dad.rotation.y = -0.45; F.mama.rotation.y = -0.45;
          F.dad.userData.setExpr('worried'); F.mama.userData.setExpr('worried');
          F.dad.userData.tick(t, { breath: 1.2 }); F.mama.userData.tick(t, { breath: 1.2 });
          for (const g of [F.dad, F.mama]) { g.userData.arm1.rotation.z = 0.5 + 0.35 * Math.sin(t * 11); g.userData['arm-1'].rotation.z = -0.5 + 0.35 * Math.sin(t * 11 + 1); }
          F.dad.userData['arm-1'].rotation.z = -0.9; F.dad.userData['arm-1'].rotation.x = -0.2;
        } else if (cl) {
          const C = 1.0, p = ph('s11', t), Pz = { mom: [-1.9, -0.7], dad: [1.95, -0.7], nana: [-1.6, 1.4], mama: [0.0, 1.4], wawa: [1.45, 1.4] };
          for (const k in F) { const g = F[k]; g.position.set(C + Pz[k][0], 0, Pz[k][1]); g.rotation.y = 0;
            const cheer = p > 0.25 && p < 0.7 && (k === 'mama' || k === 'nana');
            if (cheer) g.position.y = 0.18 * Math.abs(Math.sin(t * 7 + (k === 'nana' ? 1 : 0)));
            g.userData.setExpr(cheer ? 'giggle' : 'happy'); g.userData.tick(t, { wave: (k === 'mom' || k === 'dad') && p > 0.7 });
            if (cheer) { g.userData.arm1.rotation.z = 2.4 + 0.15 * Math.sin(t * 9); g.userData.arm1.rotation.x = 0.9; g.userData['arm-1'].rotation.z = -2.4 - 0.15 * Math.sin(t * 9); g.userData['arm-1'].rotation.x = 0.9; } }
        } }

      /* ---------- stage 1: bridge ---------- */
      { const WP = [[-3.8, 0], [-2.4, 0.25], [0, 0.25], [2.4, 0.25], [3.9, 0]], LAND = [AR(0), AR(1), AR(2), SP('s2', 0.6)];
        let x = WP[0][0], y = 0;
        for (let i = 0; i < 4; i++) { const b = LAND[i], a = b - 0.45; if (t >= a && t < b) { const k = (t - a) / (b - a); x = U.lerp(WP[i][0], WP[i + 1][0], k); y = U.lerp(WP[i][1], WP[i + 1][1], k) + Math.sin(k * PI) * 0.8; } else if (t >= b) { x = WP[i + 1][0]; y = WP[i + 1][1]; } }
        const done = t >= LAND[3];
        s.mini.position.set(x, y, 0.25); s.mini.rotation.y = done ? 0 : 0.6;
        if (done) s.mini.position.set(3.9, 0.12 * Math.abs(Math.sin(t * 7)), 0.6);
        s.mini.userData.setExpr(done ? 'giggle' : 'happy'); s.mini.userData.tick(t, { wave: done && t > LAND[3] + 0.3 });
        s.isl.forEach((m, i) => { const on = t > LAND[i]; m.material.emissiveIntensity = on ? 0.35 + 0.1 * Math.sin(t * 5 + i) : 0; m.position.y = 0.05 + (on ? 0.03 * Math.sin(t * 3 + i) : 0); }); }

      /* ---------- stage 2: clocks ---------- */
      { const k = K4(t);
        s.clocks.forEach((c, i) => { const w = U.clamp(k * 5 - i) * 0.25; const wq = Math.round(w * 400) / 400; if (wq !== c.w) { c.w = wq; clockFace(c.cv, 8 + wq, wq); c.tx.needsUpdate = true; } c.g.position.y = 0.05 * Math.sin(t * 3 + i); c.g.rotation.z = (w > 0 && w < 0.25) ? 0.06 * Math.sin(t * 20) : 0; }); }

      /* ---------- stage 3: ladder ---------- */
      { const p = inB('s5', t) ? ph('s5', t) : 0;
        const WP = [[-4.6, 0], [-2.85, 0.5], [-0.95, 1.0]], TS = [0.04, 0.16, 0.3];
        let x = WP[0][0], y = 0; for (let i = 0; i < 2; i++) { const a = TS[i], b = TS[i + 1]; if (p >= a && p < b) { const k = (p - a) / (b - a); x = U.lerp(WP[i][0], WP[i + 1][0], k); y = U.lerp(WP[i][1], WP[i + 1][1], k) + Math.sin(k * PI) * 0.7; } else if (p >= b) { x = WP[i + 1][0]; y = WP[i + 1][1]; } }
        s.mini3.position.set(x, y, 0.15); s.mini3.rotation.y = p < 0.3 ? 0.7 : 0.15;
        const sp = t > SP('s5', 0.52); s.mini3.userData.setExpr(sp ? 'worried' : p > 0.3 ? 'happy' : 'happy'); s.mini3.userData.tick(t, {});
        if (sp) { s.mini3.userData.arm1.rotation.z = 2.2 + 0.1 * Math.sin(t * 3); s.mini3.userData.arm1.rotation.x = 1.1; }
        s.notes.forEach((n, i) => { const a = ((t * 0.35 + i / 6) % 1); n.position.set(-3.6 + i * 1.45 + Math.sin(t + i) * 0.2, 2.6 + a * 0.5, -1.2); n.rotation.z = 0.2 * Math.sin(t * 2 + i); n.scale.setScalar(Math.sin(a * PI) * 1.1 + 0.01); }); }

      /* ---------- stage 4: home ---------- */
      { const H = s.hm; const on = ['s7', 's8', 's9', 's10'].includes(bt);
        for (const k in H) H[k].visible = on;
        s.book.visible = bt === 's8'; s.chair.visible = bt === 's9';
        if (on) {
          H.nana.visible = bt === 's10';
          const p = ph(bt, t);
          H.mom.position.set(HOME - 1.8, 0, 0); H.mama.position.set(HOME + 0.2, 0, 0.2); H.nana.position.set(HOME + 2.0, 0, 0.4);
          H.mom.rotation.y = 0.2; H.mama.rotation.y = -0.15; H.nana.rotation.y = -0.25;
          if (bt === 's8') { H.mama.position.set(HOME + 0.9, 0, 0.3); H.mama.rotation.y = -0.45; }
          if (bt === 's9') { H.mama.position.set(HOME - 0.1, 0, 0.3); H.mama.rotation.y = 0.5; H.mom.position.set(HOME - 2.1, 0, 0); }
          H.mom.userData.setExpr(bt === 's7' ? 'worried' : 'happy');
          H.mama.userData.setExpr(bt === 's7' ? 'happy' : bt === 's9' && p > 0.5 ? 'giggle' : 'happy');
          H.nana.userData.setExpr(p > 0.5 ? 'giggle' : 'happy');
          H.mom.userData.tick(t, { breath: 0.35 }); H.mama.userData.tick(t, {}); H.nana.userData.tick(t, {});
          if (bt === 's7') { H.mom.userData.arm1.rotation.z = 1.0 + 0.04 * Math.sin(t * 3); H.mom.userData.arm1.rotation.x = -0.7; H.mama.position.y = 0.03 * Math.abs(Math.sin(t * 4)); }
          if (bt === 's8') { H.mom.userData.arm1.rotation.z = 0.55 + 0.04 * Math.sin(t * 2); H.mom.userData.arm1.rotation.x = -1.15; }
          if (bt === 's9') { H.mama.userData.arm1.rotation.z = 1.1 + 0.08 * Math.sin(t * 3); H.mama.userData.arm1.rotation.x = -0.6; }
          if (bt === 's10' && p > 0.82) { H.mama.position.y = 0.12 * Math.abs(Math.sin(t * 7)); H.nana.position.y = 0.1 * Math.abs(Math.sin(t * 7 + 1)); }
        } }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { ln: s.ln, teach: s.teach, chub: s.chub, cmom: s.cmom, fam: s.fam, mini: s.mini, mini3: s.mini3, hm: s.hm, isl: s.isl, clocks: s.clocks }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's7') return ['#3a3570', '#6a4a80']; if (b === 's9') return ['#ffb3a6', '#ffd9b0']; if (b === 's2' || b === 's4' || b === 's5') return ['#ffe8f0', '#fff4e6']; return ['#bfe6ff', '#ffe8f0']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, size) => { size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, w / 2 + 20, 1060 - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      /* cover: clock tag */
      /* s1: anthem bubble from mama */
      if (b === 's1') { const q = SP('s1', 0.52); if (t < q - 0.1) { const [x, y] = wp(S.ln.mama.userData.head, 1.05); const e = t - QA(), f = e / Math.max(0.5, q - QA()); const str = f < 0.3 ? 'ประเทศไทย ♪' : f < 0.6 ? 'อืมมม… ♪♪' : 'ชโย!'; bubble(str, x + 60, y - 70, U.clamp((e - 0.3) / 0.3) * U.clamp((q - 0.1 - t) / 0.3)); } }
      /* s2: island labels */
      if (b === 's2') { const L = [['ทักเพื่อน'], ['ครูเช็กชื่อ'], ['รู้ว่าวันนี้', 'ทำอะไร']];
        L.forEach((ls, i) => { const a = U.clamp((t - AR(i)) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3(60 + [-2.4, 0, 2.4][i], 0, 1.2)); g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y + 34, 26, 0, 7); g.fillStyle = ['#ffb800', '#ff6f91', '#2fbf8a'][i]; g.fill(); plain(String(i + 1), x, y + 36, 32, '#ffffff', 800, 'center'); ls.forEach((l, j) => txt(l, x, y + 100 + j * 52, 46, '#ffffff', 800)); g.restore(); });
        let [x, y] = proj(new T.Vector3(60 - 4.6, 0, 1.1)); txt('บ้าน', x, y + 44, 46, '#ffffff', 800); [x, y] = proj(new T.Vector3(60 + 4.6, 0, 1.1)); txt('ห้องเรียน', x - 10, y + 44, 46, '#ffffff', 800); }
      /* s3: bubble from chub */
      if (b === 's3') { const p = ph('s3', t); if (p < 0.5) { const [x, y] = wp(S.chub.userData.head, 0.95); bubble('ไม่อยากเข้า~', x - 30, y - 30, U.clamp((p - 0.08) / 0.06) * U.clamp((0.5 - p) / 0.05)); } }
      /* s4: day labels */
      if (b === 's4') { ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.'].forEach((d, i) => { const [x, y] = proj(new T.Vector3(120 + (i - 2) * 2, 0, 0.5)); txt(d, x, y + 44, 50, '#ffffff', 800); }); }
      /* s5: step labels */
      if (b === 's5') { const p = ph('s5', t); ['เนื้อร้อง', 'จังหวะ', 'ทำนอง', 'เสียงตรง'].forEach((l, i) => { const a = U.clamp((t - TM('s5', i, 0.04 + i * 0.05)) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3(-60 + [-2.85, -0.95, 0.95, 2.85][i], 0, 0.9)); g.save(); g.globalAlpha = a; txt(String(i + 1), x, y + 36, 48, ['#ffb800', '#ff6f91', '#2fbf8a', '#3d86e8'][i], 800); txt(l, x, y + 94, 44, '#ffffff', 800); g.restore(); });
        if (t > SP('s5', 0.52)) { const [x, y] = wp(S.mini3.userData.head, 0.8); const a = U.clamp((t - SP('s5', 0.52) - 0.2) / 0.3); g.save(); g.globalAlpha = a; for (let i = 0; i < 3; i++) txt('?', x - 70 + i * 70, y - 40 - 18 * Math.abs(Math.sin(t * 3 + i)), 64, ['#ff6f91', '#5ab8ff', '#ffb800'][i], 800); g.restore(); } }
      /* s6: chayo bubble */
      if (b === 's6') { const p = ph('s6', t); if (p > 0.8) { const [x, y] = wp(S.ln.mama.userData.head, 1.05); bubble('ชโย!', x + 50, y - 30, U.clamp((p - 0.8) / 0.05)); } }
      /* s7: doctor list */
      if (b === 's7') {
        const p = ph('s7', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 480, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['3 ขวบแล้ว คนอื่นยังฟังไม่ค่อยรู้เรื่อง', '4 ขวบ ยังพูดประโยค 4 คำไม่ได้', 'ตอบคำถามง่ายๆ ไม่ได้ (เสื้อไว้ทำอะไร?)', 'ไม่สนใจเข้าไปเล่นกับเพื่อน', 'สิ่งที่เคยทำได้ หายไป'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.12 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 392 + i * 78; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(37 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: CDC Developmental Milestones (2022)', 540, 780, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s10: tips */
      if (b === 's10') {
        const p = ph('s10', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, 470, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ตื่นเร็วขึ้น 15 นาที เผื่อรถติด', 'เปิดเพลงชาติในรถ ร้องตามทีละท่อน', 'ตบมือตามจังหวะ ไม่บังคับร้อง', 'ลาสั้นๆ แบบเดิมทุกวัน กอด + ไฮไฟว์', 'ถ้าสายแล้ว ไม่ดุในรถ คุยกับครูแทน'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s10', i, 0.1 + i * 0.16)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s10', i, 0.1 + i * 0.16)) / 0.3); if (a <= 0) return; const y = 382 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
      /* s11: chayo */
      if (b === 's11') { const p = ph('s11', t); if (p > 0.25 && p < 0.72) { const [x, y] = wp(S.fam.mama.userData.head, 1.0); bubble('ชโย~!', x + 40, y - 20, U.clamp((p - 0.25) / 0.05) * U.clamp((0.72 - p) / 0.05)); } }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[80, ['ส่งลูกทันเข้าแถว', '#fff']], [80, ['สำคัญไหม?', '#ffd35e']], [50, ['แล้วยังร้องเพลงชาติไม่ได้ เป็นไรไหม?', '#ffe3ea', 600]]] },
      { t0: at('s1') + 0.25, t1: QA(), y: 290, lines: [[62, ['ยังร้องเพลงชาติไม่ได้', '#fff']], [62, ['เป็นไรไหม?', '#ffd35e']]] },
      { t0: QA() + 0.02, t1: SP('s1', 0.52), y: 290, lines: [[62, ['8 โมง หน้าเสาธง', '#fff']], [48, ['พี่มามะร้องได้แค่ต้นกับท้าย', '#ffe3ea', 600]]] },
      { t0: SP('s1', 0.52) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[62, ['ส่วนลูกชุบ มาถึง 8:20', '#fff']], [52, ['มาไม่ทันแถว เป็นไรไหม?', '#ffd35e']]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.6), y: 290, lines: [[60, ['เข้าแถว = สะพาน', '#fff']], [56, ['จากบ้าน เข้าห้องเรียน', '#ffd35e']]] },
      { t0: SP('s2', 0.6) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[56, ['ลูกได้ค่อยๆ "เปลี่ยนโหมด"', '#fff']], [48, ['จากลูกที่บ้าน เป็นเด็กในห้องเรียน', '#ffe3ea', 600]]] },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.52), y: 290, lines: [[58, ['มาสาย = เข้ามากลางเรื่อง', '#fff']], [46, ['ทุกคนหันมามอง ลูกยิ่งไม่อยากปล่อยมือ', '#ffe3ea', 600]]] },
      { t0: SP('s3', 0.52) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[56, ['ห้องที่มีเด็กมาสายบ่อย', '#fff']], [50, ['เพื่อนทั้งห้องก็ได้รับผลด้วย', '#ffd35e']]], foot: 'พบความเชื่อมโยงกับปัญหาพฤติกรรมในห้อง (Gottfried 2014, เด็กสหรัฐฯ 21,765 ราย)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.55), y: 290, lines: [[62, ['สายวันละ 15 นาที', '#fff']], [60, ['= สัปดาห์ละ ', '#fff'], [(t) => { const k = K4(t), m = Math.round(75 * k); return m < 60 ? m + ' นาที' : '1 ชม. ' + (m - 60) + ' นาที'; }, '#ffd35e']]] },
      { t0: SP('s4', 0.55) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[58, ['สายบางวัน ไม่เป็นไร', '#fff']], [52, ['ที่ต้องระวัง คือสายจนเป็นนิสัย', '#ffd35e']]], foot: 'บ้านที่มีกิจวัตรสม่ำเสมอ ลูกพร้อมเข้าเรียนมากกว่า (Ferretti & Bub 2017, เด็ก 3,250 คน)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.52), y: 290, lines: [[60, ['ทำไมร้องเพลงชาติไม่ได้?', '#fff']], [48, ['เด็กหัดร้องเพลงทีละขั้น วัยอนุบาลยังอยู่ขั้น 1–2', '#ffe3ea', 600]]], foot: 'Davidson et al. 1981; Welch 2009' },
      { t0: SP('s5', 0.52) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[58, ['แถมเนื้อเพลงชาติ มีคำยาก', '#fff']], [52, ['ไผท · ประชารัฐ · เถลิง', '#ffd35e']]] },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[62, ['4 ขวบ ร้องได้บางคำ', '#fff']], [56, ['= ตามวัย ไม่ต้องกังวล', '#ffd35e']]], foot: 'CDC: 4 ขวบ พูด/ร้อง "บางคำ" จากเพลงหรือนิทานได้' },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[56, ['สำคัญกว่าร้องครบ', '#fff']], [52, ['คือยืนตรง ฟังจนจบ', '#ffd35e']], [44, ['ได้ฝึกควบคุมตัวเอง', '#ffe3ea', 600]]] },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[54, ['ไม่ใช่เรื่องเพลง แต่ควรปรึกษาหมอ ถ้า…', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[66, [(t) => (22.78 * U.clamp((t - at('s8') - 0.3) / 1.2)).toFixed(2) + '%', '#ffd35e']], [52, ['ของเด็กปฐมวัยไทย', '#fff']], [46, ['สงสัยพัฒนาการล่าช้า', '#ffe3ea', 600]]], foot: 'กรมอนามัย ปี 2566' },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[56, ['เช็กตามวัยได้', '#fff']], [52, ['ในสมุดสีชมพู (DSPM)', '#ffd35e']], [44, ['สงสัยตรงไหน ถามคลินิกเด็กดี', '#ffe3ea', 600]]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 290, lines: [[60, ['ทันแถว เริ่มตั้งแต่คืนก่อน', '#ffd35e']], [48, ['จัดกระเป๋า วางชุด เข้านอนเวลาเดิม', '#fff', 600]]] },
      { t0: at('s10') + 0.2, t1: end('s10') - 0.05, y: 250, lines: [[60, ['5 ทิป เช้านี้ไม่วุ่น', '#ffd35e']]] },
      { t0: at('s11') + 0.2, t1: end('s11'), y: 290, lines: [[56, ['ไม่ต้องร้องครบ', '#fff']], [56, ['ขอแค่ลูกอยากไปโรงเรียน', '#ffd35e']], [42, ['ลูกคุณร้องเพลงชาติได้ถึงท่อนไหน? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: Gottfried 2014, Ferretti & Bub 2017, CDC 2022, กรมอนามัย 2566' },
    ].filter((c) => c.t1 > c.t0 + 0.1),
    trans,
    audio: [
      [0.4, 'tick'], [0.9, 'tick'], [1.4, 'tick'],
      [QA() + 0.3, 'riser'], [QA() + 0.4, 'bubble'], [QA() + 2.2, 'boing'], [QA() + 4.6, 'twinkle'], [SP('s1', 0.52) + 0.2, 'whoosh'], [SP('s1', 0.52) + 0.6, 'tick'], [SP('s1', 0.52) + 1.0, 'tick'],
      [at('s2') + 0.3, 'shimmer'], [AR(0), 'pop'], [AR(1), 'pop'], [AR(2), 'pop'], [SP('s2', 0.6) + 0.1, 'giggle'],
      [at('s3') + 0.4, 'breath'], [at('s3') + 0.9, 'boing'], [SP('s3', 0.52), 'warn'], [P('s3', 0.8), 'heart'],
      ...[0, 1, 2, 3, 4].map((i) => { const a = at('s4') + 0.5, b = SP('s4', 0.55) - 0.35; return [a + (b - a) * (i + 1) / 5 - 0.05, i === 4 ? 'ding' : 'tick']; }), [SP('s4', 0.55), 'pop'],
      [at('s5') + 0.5, 'boing'], [P('s5', 0.18), 'boing'], [P('s5', 0.32), 'ding'], [SP('s5', 0.52), 'bubble'], [SP('s5', 0.52) + 0.4, 'boing'],
      [at('s6') + 0.4, 'twinkle'], [P('s6', 0.8), 'giggle'], [P('s6', 0.82), 'ding'],
      [at('s7') + 0.3, 'heartbeat'], [TM('s7', 0, 0.12), 'tick'], [TM('s7', 1, 0.22), 'tick'], [TM('s7', 2, 0.32), 'tick'], [TM('s7', 3, 0.42), 'tick'], [TM('s7', 4, 0.52), 'tick'], [P('s7', 0.75), 'heartbeat'],
      [at('s8') + 0.4, 'riser'], [at('s8') + 1.5, 'ding'], [SP('s8', 0.5), 'pop'],
      [at('s9') + 0.3, 'shimmer'], [P('s9', 0.5), 'pop'], [P('s9', 0.7), 'giggle'],
      [TM('s10', 0, 0.1), 'ding'], [TM('s10', 1, 0.26), 'tick'], [TM('s10', 2, 0.42), 'tick'], [TM('s10', 3, 0.58), 'tick'], [TM('s10', 4, 0.74), 'tick'], [P('s10', 0.85), 'giggle'],
      [at('s11') + 0.3, 'twinkle'], [P('s11', 0.27), 'giggle'], [P('s11', 0.5), 'heart'], [P('s11', 0.75), 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s4'), CK.MUSIC.OOPS), CK.musicBed(at('s4'), at('s7'), CK.MUSIC.CUTE), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s11'), CK.MUSIC.CUTE), CK.musicBed(at('s11'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
