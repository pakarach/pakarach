/* พ่อแม่หัวจะปวด — ลูกลุกมานั่งกลางดึก ตื่นหรือหลับ? (สาเหตุ 3 แบบ, พบแพทย์ถ้า, ผลถ้านอนไม่พอ, ทางแก้)
   Build: node build.js luk-luk-nang-klang-duek.js out.html --kit clay --title "ลูกลุกมานั่งกลางดึก ตื่นหรือหลับ?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 5.5], ['s2', 7], ['s3', 8], ['s4', 7], ['s5', 7.5], ['s6', 7.5], ['s7', 6.5], ['s8', 5.5], ['s9', 6.5], ['s10', 6], ['s11', 8.5], ['s12', 4.8], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's12'; };

  /* framing helper (docs/family/blocking.md) */
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* ---- bedroom geometry ---- */
  const MT = 0.75, A_LIE = 0.45, ZH = -1.9;
  const X = { mom: -3.5, nana: -1.6, wawa: -0.05, mama: 1.45, dad: 3.5 };
  const WHO = ['mom', 'nana', 'wawa', 'mama', 'dad'];
  const lieT = (g, x) => { const s = g.userData.base, hy = g.userData.hy0 * s, R = 0.72 * s, yh = MT + 0.12 + 0.55 * R; return { x, y: yh - hy * Math.sin(A_LIE), z: ZH + hy * Math.cos(A_LIE), rx: -PI / 2 + A_LIE }; };
  const sitT = (g, x) => { const s = g.userData.base, sb = s >= 1.2 ? 0.393 : 0.163; return { x, y: MT - sb * s + 0.02, z: -1.45, rx: -0.04 }; };
  const mix = (a, b, k) => ({ x: U.lerp(a.x, b.x, k), y: U.lerp(a.y, b.y, k), z: U.lerp(a.z, b.z, k), rx: U.lerp(a.rx, b.rx, k) });
  const setP = (g, p) => { g.position.set(p.x, p.y, p.z); g.rotation.set(p.rx, 0, 0); };

  /* canvas textures */
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3], [150, 200, 4], [200, 30, 2]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const eveTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ff8fa3'); g.addColorStop(1, '#ffd39a'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ffe36e'; x.beginPath(); x.arc(128, 200, 46, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[60, 80, 26], [92, 74, 30], [124, 84, 22]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const dots = (base, dot) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } });

  function clockFace(cv, h) {
    const x = cv.getContext('2d'); x.clearRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = '#ff8fab'; x.stroke();
    x.fillStyle = '#3a2f3f'; for (let i = 0; i < 12; i++) { const a = i / 12 * PI * 2; x.beginPath(); x.arc(128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92, i % 3 ? 5 : 9, 0, 7); x.fill(); }
    x.lineCap = 'round'; const ha = (h % 12) / 12 * PI * 2, ma = (h % 1) * PI * 2;
    x.lineWidth = 14; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ha) * 52, 128 - Math.cos(ha) * 52); x.stroke();
    x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ma) * 80, 128 - Math.cos(ma) * 80); x.stroke();
    x.fillStyle = '#ff8fab'; x.beginPath(); x.arc(128, 128, 12, 0, 7); x.fill();
  }

  /* shots */
  const SH = {
    cover: [FW(-0.9, -1.6, 7.6, 2.1, 0.55), FW(-0.95, -1.6, 7.2, 2.1, 0.55)],
    s1: [FW(-0.9, -1.6, 7.8, 4.0, 0.42), FW(-0.9, -1.6, 7.5, 4.0, 0.42)],
    s2: [FW(60, 0, 11, 4.95, 0.06), FW(60, 0, 10.6, 4.9, 0.06)],
    s3: [FW(-2.55, -1.6, 5.0, 4.0, 0.42), FW(-2.55, -1.6, 4.8, 3.9, 0.48)],
    s4: [FW(1.2, -1.6, 6.6, 4.2, 0.42), FW(1.2, -1.6, 6.6, 4.2, 0.42)],
    s5: [FW(-59.3, -0.6, 7.6, 3.9, 0.22), FW(-59.3, -0.6, 7.3, 3.9, 0.22)],
    s6: [FW(-61.9, -0.6, 5.9, 4.1, 0.22), FW(-61.9, -0.6, 5.6, 4.1, 0.22)],
    s7: [FW(119.0, 0, 6.0, 3.1, 0.1), FW(119.0, 0, 5.8, 3.1, 0.1)],
    s8: [FW(129.5, 0, 7.6, 3.6, 0.1), FW(129.5, 0, 7.3, 3.6, 0.1)],
    s9: [FW(0, -1.6, 10.4, 4.2, 0.4), FW(0, -1.6, 10.0, 4.2, 0.4)],
    s10: [FW(-2.55, -1.6, 5.0, 4.0, 0.42), FW(-2.55, -1.6, 4.8, 3.6, 0.5)],
    s11: [FW(0, -1.6, 10.6, 2.0, 0.6), FW(0, -1.6, 10.3, 2.0, 0.6)],
    s12: [FW(0, -1.6, 10.6, 2.0, 0.6), FW(0, -1.6, 9.4, 2.0, 0.6)],
  };
  const CUT = new Set(['s2', 's3', 's5', 's7', 's8', 's9']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));

  /* danger ramp (s6) */
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.registerSfx('snore', (t) => { VE.audio.noise(t, 0.8, { type: 'bandpass', f: 170, f2: 260, vol: 0.16, att: 0.35, q: 2 }); VE.audio.tone(t + 0.05, 85, 0.6, { type: 'sawtooth', vol: 0.035, att: 0.3 }); });

  VE.run({
    DUR, file: 'luk-luk-nang-klang-duek', title: 'ลูกลุกมานั่งกลางดึก ตื่นหรือหลับ?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'การนอนของลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: bedroom ===== */
      const room = CK.room(T, { wall: '#cbb8ff', wain: '#ffb3c6', floor: '#e9b483', rug: false, props: false, winX: 3.3 }); scene.add(room);
      const NT = nightTex(), ET = eveTex(); room.userData.win.material.map = NT;
      const frame = new T.Mesh(new T.BoxGeometry(10.4, 0.36, 4.7), M('#e9b27c')); frame.position.set(0, 0.18, -0.5); scene.add(frame);
      const matt = new T.Mesh(new T.BoxGeometry(10.1, 0.4, 4.4), M('#ffc2d6')); matt.position.set(0, MT - 0.2, -0.5); scene.add(matt);
      const head = new T.Mesh(new T.BoxGeometry(10.4, 1.5, 0.3), M('#ff9ec0')); head.position.set(0, 0.95, -2.85); scene.add(head);
      for (const k of WHO) { const p = new T.Mesh(new T.SphereGeometry(1, 24, 14), M('#ffffff')); const w = k === 'mom' || k === 'dad' ? 1.05 : 0.8; p.scale.set(w, 0.24, 0.5); p.position.set(X[k], MT + 0.12, -2.2); scene.add(p); }
      const blT = dots('#4f9be8', '#bfe0ff'); blT.wrapS = blT.wrapT = T.RepeatWrapping; blT.repeat.set(5, 2);
      const blanket = new T.Group(); const bm = M('#ffffff', { map: blT });
      const bb = new T.Mesh(new T.BoxGeometry(9.9, 0.6, 3.0), bm); bb.position.set(0, MT + 0.3, 0.5); blanket.add(bb);
      const roll = new T.Mesh(new T.CylinderGeometry(0.32, 0.32, 9.9, 24), bm); roll.rotation.z = PI / 2; roll.position.set(0, MT + 0.3, -1.0); blanket.add(roll);
      scene.add(blanket);
      /* clock */
      const ccv = document.createElement('canvas'); ccv.width = ccv.height = 256; clockFace(ccv, 2); const ctx2 = new T.CanvasTexture(ccv);
      const clock = new T.Mesh(new T.CircleGeometry(0.6, 40), new T.MeshBasicMaterial({ map: ctx2, transparent: true })); clock.position.set(-3.7, 3.3, -4.33); scene.add(clock);
      /* night-light on the headboard */
      const lamp = new T.Group(); const lb = new T.Mesh(new T.CylinderGeometry(0.18, 0.24, 0.22, 16), M('#ffffff')); lamp.add(lb);
      const lg = new T.Mesh(new T.SphereGeometry(0.3, 20, 14), new T.MeshStandardMaterial({ color: '#ffe08a', emissive: '#ffc94d', emissiveIntensity: 0.4, roughness: 0.4 })); lg.position.y = 0.34; lamp.add(lg);
      lamp.position.set(4.55, 1.82, -2.85); scene.add(lamp);
      const lampL = new T.PointLight(0xffd08a, 0, 7); lampL.position.set(4.5, 2.4, -2.2); scene.add(lampL);
      /* teddy (tips) */
      const ted = new T.Group(), tm = M('#c98d5c'); const tb = new T.Mesh(new T.SphereGeometry(0.26, 16, 12), tm); tb.position.y = 0.26; const th = new T.Mesh(new T.SphereGeometry(0.22, 16, 12), tm); th.position.y = 0.62; ted.add(tb, th);
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), tm); e.position.set(s * 0.16, 0.8, 0); ted.add(e); }
      ted.position.set(-0.85, MT + 0.55, -2.0); ted.scale.setScalar(1.15); ted.visible = false; scene.add(ted);
      /* family */
      const bed = {};
      for (const k of WHO) { const g = CK.family(T, k); g.userData.base = g.scale.x; g.userData.hy0 = g.userData.head.position.y; scene.add(g); bed[k] = g; }
      const book = new T.Group(); const bk1 = new T.Mesh(new T.BoxGeometry(0.75, 0.55, 0.08), M('#ff6f91')); bk1.position.set(-0.2, 0, 0); bk1.rotation.y = 0.5; const bk2 = new T.Mesh(new T.BoxGeometry(0.75, 0.55, 0.08), M('#ffd23f')); bk2.position.set(0.2, 0, 0); bk2.rotation.y = -0.5; book.add(bk1, bk2);
      book.position.set(0, -0.12, 0.25); bed.mom.userData.hand1.add(book);
      const bottle = new T.Group(); const bt = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 0.5, 16), M('#ffffff', { transparent: true, opacity: 0.9 })); const btm = new T.Mesh(new T.CylinderGeometry(0.15, 0.15, 0.3, 16), M('#fff8e8')); btm.position.y = -0.08; const nip = new T.Mesh(new T.ConeGeometry(0.11, 0.22, 14), M('#ffb3c6')); nip.position.y = 0.35; bottle.add(bt, btm, nip);
      bottle.position.set(0.3, 2.95, -1.2); bottle.visible = false; scene.add(bottle);

      /* ===== stage 1: sleep wave (x = 60) ===== */
      const mech = new T.Group(); mech.position.x = 60; scene.add(mech);
      const SURF = 4.3, DS = 5.6, DEP = [1, 0.82, 0.52, 0.36];
      const depth = (u) => { const c = Math.min(3, Math.floor(u * 4)), p = u * 4 - c; return DEP[c] * Math.pow(Math.sin(PI * p), 0.75) * 0.93 + 0.05; };
      const pts = []; for (let i = 0; i <= 160; i++) { const u = i / 160; pts.push(new T.Vector3(-4.6 + 9.2 * u, SURF - depth(u) * DS, 0)); }
      const curve = new T.CatmullRomCurve3(pts);
      const waveM = new T.Mesh(new T.TubeGeometry(curve, 320, 0.1, 10, false), new T.MeshStandardMaterial({ color: '#ffffff', emissive: '#ff8fab', emissiveIntensity: 0.35, roughness: 0.4 })); mech.add(waveM);
      for (const [y0, y1, c, o] of [[2.9, 4.7, '#dff3ff', 0.75], [0.8, 2.9, '#a9bdff', 0.75], [-1.7, 0.8, '#8c86ff', 0.75]]) { const p = new T.Mesh(new T.BoxGeometry(10.2, y1 - y0, 0.2), M(c, { transparent: true, opacity: o })); p.position.set(0, (y0 + y1) / 2, -0.7); mech.add(p); }
      const surfLine = new T.Mesh(new T.BoxGeometry(10.2, 0.06, 0.1), M('#ffffff')); surfLine.position.set(0, 4.62, -0.55); mech.add(surfLine);
      const cloud = new T.Group(); for (const [x, y, r] of [[0, 0, 0.42], [-0.42, -0.06, 0.32], [0.42, -0.06, 0.32]]) { const c = new T.Mesh(new T.SphereGeometry(r, 16, 12), M('#ffffff')); c.position.set(x, y, 0); cloud.add(c); } mech.add(cloud);
      const mini = CK.family(T, 'nana', { scale: 0.38 }); mini.userData.base = 0.38; cloud.add(mini); mini.position.set(0, 0.15, 0.05);
      
      /* ===== stage 2: neighbour room (x = -60) ===== */
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: -2.6 }); room2.position.x = -60; scene.add(room2);
      room2.userData.win.material.map = NT;
      const b2 = new T.Group(); b2.position.x = -61; scene.add(b2);
      const f2 = new T.Mesh(new T.BoxGeometry(3.2, 0.36, 4.2), M('#e9b27c')); f2.position.set(0, 0.18, -0.6); b2.add(f2);
      const m2 = new T.Mesh(new T.BoxGeometry(3.0, 0.4, 4.0), M('#fff4f8')); m2.position.set(0, MT - 0.2, -0.6); b2.add(m2);
      const hb2 = new T.Mesh(new T.BoxGeometry(3.2, 1.6, 0.3), M('#9fd3ff')); hb2.position.set(0, 1.0, -2.75); b2.add(hb2);
      const pil2 = new T.Mesh(new T.SphereGeometry(1, 24, 14), M('#ffffff')); pil2.scale.set(1.05, 0.62, 0.32); pil2.position.set(0, MT + 0.55, -2.25); pil2.rotation.x = -0.35; b2.add(pil2);
      const bl2 = new T.Mesh(new T.BoxGeometry(2.9, 0.55, 2.4), M('#ffffff', { map: dots('#f0804f', '#ffd9c2') })); bl2.position.set(0, MT + 0.27, 0.15); b2.add(bl2);
      const st2 = {};
      st2.thua = CK.neighbor(T, 3, { scale: 0.95 }); st2.thua.userData.base = 0.95; scene.add(st2.thua);
      st2.tmom = CK.neighbor(T, 0, { scale: 1.3, lashes: true }); st2.tmom.userData.base = 1.3; scene.add(st2.tmom);
      const rings = []; for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.TorusGeometry(0.3, 0.04, 8, 28), new T.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0 })); scene.add(r); rings.push(r); }
      /* airway inset */
      const inset = new T.Group(); inset.position.set(-57.3, 2.25, 0.2); scene.add(inset);
      const disc = new T.Mesh(new T.CylinderGeometry(1.85, 1.85, 0.12, 48), M('#fff4e6')); disc.rotation.x = PI / 2; disc.position.z = -0.6; inset.add(disc);
      const rim = new T.Mesh(new T.TorusGeometry(1.85, 0.08, 10, 60), M('#ff8fab')); rim.position.z = -0.52; inset.add(rim);
      const tube = CK.tube(T, 0.62, 2.9, '#ff9eb8'); tube.material.transparent = true; tube.material.opacity = 0.55; inset.add(tube);
      const tons = []; for (const s of [-1, 1]) { const tn = new T.Mesh(new T.SphereGeometry(0.3, 18, 14), M('#ff5f86')); tn.position.set(s * 0.58, -0.15, 0); inset.add(tn); tons.push(tn); }
      const aden = new T.Mesh(new T.SphereGeometry(0.28, 18, 14), M('#ff7aa0')); aden.position.set(0, 1.0, -0.5); inset.add(aden);
      const air = []; for (let i = 0; i < 9; i++) { const a = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), M('#ffffff', { emissive: '#bfe6ff', emissiveIntensity: 0.6 })); inset.add(a); air.push(a); }

      /* ===== stage 3: battery + bars (x = 120..130) ===== */
      const plat = new T.Mesh(new T.BoxGeometry(24, 0.3, 14), M('#ff9ebd')); plat.position.set(125, -0.15, 0); scene.add(plat);
      const backW = new T.Mesh(new T.BoxGeometry(24, 9, 0.3), M('#ffffff', { map: (() => { const tx = dots('#ffd1e3', '#ffffff'); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(10, 4); return tx; })() })); backW.position.set(125, 4.2, -4.5); scene.add(backW);
      const batt = new T.Group(); batt.position.set(120.8, 0, 0); batt.scale.setScalar(0.85); scene.add(batt);
      const shell = new T.Mesh(new T.BoxGeometry(1.6, 3.0, 1.0), M('#ffffff', { transparent: true, opacity: 0.38 })); shell.position.y = 1.5; batt.add(shell);
      const capB = new T.Mesh(new T.BoxGeometry(0.6, 0.28, 0.55), M('#ffffff')); capB.position.y = 3.14; batt.add(capB);
      const fg = new T.BoxGeometry(1.36, 2.76, 0.8); fg.translate(0, 1.38, 0); const fill = new T.Mesh(fg, M('#5fd38d')); fill.position.y = 0.12; batt.add(fill);
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), M('#3a2f3f')); e.scale.set(1.3, 0.5, 0.5); e.position.set(s * 0.32, 2.0, 0.52); batt.add(e); }
      const bars = [33.3, 34.8].map((v, i) => { const b = CK.bar(T, 1.7, 1.2, i ? '#9fd3ff' : '#ff8fab'); b.position.set(129.0 + i * 2.9, 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const barEyes = bars.map((b) => { const gr = new T.Group(); for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#3a2f3f')); e.position.set(s * 0.3, 0, 0.62); gr.add(e); } scene.add(gr); return gr; });
      const st3 = {}; st3.nana = CK.family(T, 'nana'); st3.mama = CK.family(T, 'mama'); for (const k in st3) { st3[k].userData.base = st3[k].scale.x; scene.add(st3[k]); }
      const stars = []; for (let i = 0; i < 10; i++) { const st = new T.Mesh(new T.OctahedronGeometry(0.14, 0), M(i % 2 ? '#ffd23f' : '#ffffff')); st.userData.p = [116 + i * 1.6, 3.6 + (i % 3) * 0.5]; scene.add(st); stars.push(st); }

      return { key, hemi, room, NT, ET, bed, blanket, clock, ccv, ctx2, clockH: 2, lamp, lg, lampL, ted, book, bottle, mech, cloud, mini, curve, SURF, DS, depth, room2, st2, rings, inset, tons, air, batt, fill, bars, barEyes, st3, stars, b2 };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      /* ---------- lights / night ---------- */
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc); s.room2.userData.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dn);
      const eve = inB('s9', t); s.room.userData.win.material.map = eve ? s.ET : s.NT;
      /* bedroom warm lamp at night tips/closing */
      const lampOn = t > at('s10') ? U.clamp((t - at('s10') - 1) / 1.0) : 0; s.lampL.intensity = 0.9 * lampOn; s.lg.material.emissiveIntensity = 0.4 + 0.9 * lampOn;
      const ch = eve ? 8 + ph('s9', t) * 0.5 : t > at('s10') ? 8.6 + (t - at('s10')) * 0.05 : 2 + t * 0.01; if (Math.abs(ch - s.clockH) > 0.004) { s.clockH = ch; clockFace(s.ccv, ch); s.ctx2.needsUpdate = true; }

      /* ---------- bedroom family ---------- */
      const BD = s.bed, L = {}, Sx = {};
      for (const k of WHO) { L[k] = lieT(BD[k], X[k]); Sx[k] = sitT(BD[k], X[k]); }
      const st = {}; // k -> {p, vis, ex, breath, arms(g)}
      const def = (k, p, ex, vis) => (st[k] = { p, ex: ex || 'sleepy', vis: vis !== false, breath: 0.3 });
      for (const k of WHO) def(k, L[k], 'sleepy', true);
      if (bt === 'cover' || bt === 's1') {
        const k1 = U.easeIO(U.clamp((t - at('s1') - 0.2) / 0.7));
        def('mom', mix(L.mom, Sx.mom, k1), t < 0.9 ? 'sleepy' : 'worried');
        def('nana', Sx.nana, 'sick'); st.nana.breath = 0.32; def('dad', L.dad, 'sleepy', false);
      } else if (bt === 's3') {
        const p = ph('s3', t), kd = U.easeIO(U.clamp((p - 0.62) / 0.25));
        def('mom', Sx.mom, p < 0.5 ? 'worried' : 'happy'); st.mom.arm1 = [U.lerp(0.5, 1.45, U.clamp(p * 4)), -0.35];
        def('nana', mix(Sx.nana, L.nana, kd), p < 0.62 ? 'sick' : 'sleepy'); st.nana.breath = 0.32;
        def('wawa', L.wawa, 'sleepy', false); def('dad', L.dad, 'sleepy', false); def('mama', L.mama, 'sleepy', false);
      } else if (bt === 's4') {
        const p = ph('s4', t), kd = U.easeIO(U.clamp((p - 0.45) / 0.15));
        def('mama', Sx.mama, p < 0.5 ? 'cry' : p < 0.8 ? 'worried' : 'happy');
        if (p < 0.5) st.mama.armsUp = true;
        def('dad', mix(L.dad, Sx.dad, U.easeIO(U.clamp((p - 0.12) / 0.15))), p < 0.3 ? 'sleepy' : 'worried');
        if (p > 0.5) { st.dad.ex = 'happy'; st.dad.armm1 = [-1.25, -0.4]; }
        def('mom', L.mom, 'sleepy', false);
      } else if (bt === 's9') {
        const p = ph('s9', t);
        def('mom', Sx.mom, 'happy'); st.mom.arm1 = [0.95, -1.0]; st.mom.book = true;
        def('nana', Sx.nana, p > 0.55 ? 'giggle' : 'happy'); def('mama', Sx.mama, p > 0.4 ? 'giggle' : 'happy'); def('wawa', Sx.wawa, 'happy'); def('dad', Sx.dad, 'happy');
        st.nana.breath = st.mama.breath = 0.4;
      } else if (bt === 's10') {
        const p = ph('s10', t), kd = U.easeIO(U.clamp((p - 0.08) / 0.3));
        def('mom', Sx.mom, 'happy'); st.mom.wave = p > 0.45 && p < 0.75;
        def('nana', mix(Sx.nana, L.nana, kd), p < 0.62 ? 'sick' : 'sleepy'); st.nana.breath = 0.3;
        def('wawa', L.wawa, 'sleepy', false); def('dad', L.dad, 'sleepy', false); def('mama', L.mama, 'sleepy', false);
      } else if (bt === 's11' || bt === 's12') {
        for (const k of WHO) def(k, L[k], 'sleepy');
        if (bt === 's12' && ph('s12', t) > 0.35) { st.mom.ex = 'happy'; st.dad.ex = 'happy'; }
      }
      for (const k of WHO) {
        const g = BD[k], q = st[k]; g.visible = q.vis; if (!q.vis) continue;
        setP(g, q.p); g.userData.setExpr(q.ex); g.userData.tick(t, { breath: q.breath, wave: q.wave });
        if (q.arm1) { g.userData.arm1.rotation.z = q.arm1[0] + 0.04 * Math.sin(t * 3); g.userData.arm1.rotation.x = q.arm1[1]; }
        if (q.armm1) { g.userData['arm-1'].rotation.z = q.armm1[0] + 0.08 * Math.sin(t * 4); g.userData['arm-1'].rotation.x = q.armm1[1]; }
        if (q.armsUp) { g.userData.arm1.rotation.z = 2.2 + 0.15 * Math.sin(t * 8); g.userData['arm-1'].rotation.z = -2.2 - 0.15 * Math.sin(t * 8 + 1); g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = 0.6; }
      }
      s.book.visible = !!st.mom.book;
      s.ted.visible = t > at('s10');
      s.bottle.visible = false; if (s.bottle.visible) { const p = ph('s4', t); s.bottle.position.set(X.mama + 1.05, 3.05 + 0.1 * Math.sin(t * 3), -1.3); s.bottle.rotation.z = -0.4 + 0.1 * Math.sin(t * 2); s.bottle.scale.setScalar(U.easeBack(U.clamp(p * 6))); }

      /* ---------- stage 1: wave ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0; const u = U.clamp((p - 0.06) / 0.88), x = -4.6 + 9.2 * u, y = s.SURF - s.depth(u) * s.DS;
        s.cloud.position.set(x, y + 0.42 + 0.05 * Math.sin(t * 4), 0.35); s.cloud.rotation.z = 0.08 * Math.sin(t * 2);
        const near = s.depth(u) < 0.2; s.mini.userData.setExpr(near ? 'sick' : 'sleepy'); s.mini.userData.tick(t, { breath: 0.3 }); s.mini.position.y = 0.15 + (near ? 0.06 * Math.abs(Math.sin(t * 8)) : 0); }

      /* ---------- stage 2 ---------- */
      { const k = s.st2.thua, ps = inB('s5', t) ? ph('s5', t) : 1; k.position.set(-61, MT - 0.163 * 0.95 + 0.02, -1.25); k.rotation.set(-0.1, 0, 0);
        k.userData.setExpr(inB('s6', t) ? 'sleepy' : 'sleepy'); k.userData.tick(t, { breath: 0.55 }); k.userData.head.rotation.x = -0.32 + 0.04 * Math.sin(t * 2.2);
        const m = s.st2.tmom; m.visible = inB('s6', t) && t > at('s6') + 0.7; m.position.set(-63.0, 0, 0.5); m.rotation.y = 0.35; m.userData.setExpr('worried'); m.userData.tick(t, {}); m.userData.arm1.rotation.z = 1.0 + 0.05 * Math.sin(t * 3); m.userData.arm1.rotation.x = -0.6;
        const hp = new T.Vector3(); k.userData.head.getWorldPosition(hp);
        s.rings.forEach((r, i) => { const a = ((t * 0.7 + i / 3) % 1); r.position.set(hp.x + 0.35 + a * 0.9, hp.y - 0.05 + a * 0.6, hp.z + 0.6); r.rotation.set(0, 0.9, 0.3); r.scale.setScalar(0.6 + a * 1.4); r.material.opacity = (inB('s5', t) || inB('s6', t)) ? 0.85 * Math.sin(a * PI) : 0; });
        const ins = inB('s5', t) ? U.easeBack(U.clamp((ps - 0.05) / 0.12)) : 0; s.inset.scale.setScalar(Math.max(0.001, ins)); s.inset.visible = ins > 0.01;
        const sw = U.clamp((ps - 0.5) / 0.25); s.tons.forEach((tn, i) => tn.scale.setScalar(1 + sw * 0.75 + 0.03 * Math.sin(t * 4 + i)));
        s.air.forEach((a, i) => { const f = ((t * (0.55 - sw * 0.3) + i / 9) % 1); const w = U.lerp(0.32, 0.08, sw); a.position.set(Math.sin(i * 2.1 + t) * w, 1.35 - f * 2.7, 0.1); a.scale.setScalar(1 - sw * 0.3); }); }

      /* ---------- stage 3 ---------- */
      { const n = s.st3.nana, m = s.st3.mama, in8 = t >= at('s8');
        const p7 = inB('s7', t) ? ph('s7', t) : 1, lvl = U.lerp(1, 0.22, U.easeIO(U.clamp((p7 - 0.06) / 0.4)));
        s.fill.scale.y = Math.max(0.02, lvl); s.fill.material.color.set(lvl > 0.6 ? '#5fd38d' : lvl > 0.35 ? '#ffc94d' : '#ff5f6d');
        s.fill.material.emissive.set('#ff2040'); s.fill.material.emissiveIntensity = lvl < 0.35 ? 0.25 + 0.25 * Math.sin(t * 8) : 0;
        if (!in8) { n.position.set(119.0, 0, 0.3); m.position.set(117.2, 0, 0.4); n.rotation.y = 0.2; m.rotation.y = 0.3; n.userData.setExpr(p7 < 0.3 ? 'sleepy' : 'angry'); m.userData.setExpr(p7 < 0.3 ? 'sleepy' : p7 < 0.7 ? 'cry' : 'worried'); }
        else { m.position.set(126.9, 0, 0.6); m.rotation.y = 0.35; n.position.set(125.0, 0, 0.6); n.visible = false; m.userData.setExpr('sleepy'); }
        n.visible = !in8; n.userData.tick(t, { breath: 0.45 }); m.userData.tick(t, { breath: 0.45 });
        if (!in8 && p7 > 0.55) { m.userData.arm1.rotation.z = 2.3 + 0.1 * Math.sin(t * 6); m.userData.arm1.rotation.x = 1.0; } // rubbing eyes
        if (in8) { m.userData['arm-1'].rotation.z = -2.4; m.userData['arm-1'].rotation.x = 1.1; } // yawn stretch
        const p8 = inB('s8', t) ? ph('s8', t) : t > end('s8') ? 1 : 0, kb = U.easeOut(U.clamp((p8 - 0.08) / 0.4));
        s.bars.forEach((b, i) => { const v = [33.3, 34.8][i]; b.scale.y = Math.max(0.01, v * 0.088 * kb); s.barEyes[i].position.set(b.position.x, b.scale.y * 0.72 + 0.1, 0); s.barEyes[i].visible = kb > 0.3; });
        s.stars.forEach((st, i) => { st.position.set(st.userData.p[0], st.userData.p[1] + 0.15 * Math.sin(t * 2 + i), -2.5); st.rotation.y = t * 1.5 + i; }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { bed: s.bed, st2: s.st2, st3: s.st3, mini: s.mini }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's2') return ['#b8c8ff', '#ffd6ec']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's7' || b === 's8') return ['#ffe8f0', '#fff4e6']; return ['#c9b8ff', '#ffd6ec']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a) => { g.save(); g.globalAlpha = a; g.font = '700 38px Kanit,sans-serif'; const w = g.measureText(str).width + 50; rr(x - w / 2, y - 38, w, 76, 38, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + 36); g.lineTo(x + 4, y + 66); g.lineTo(x + 18, y + 36); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, 38, '#3a2f3f', 700, 'center'); g.restore(); };
      /* Zzz over sleeping heads */
      const zz = (o, seed) => { if (!o || !o.visible || o.userData.expr() !== 'sleepy') return; const [x, y, z] = wp(o.userData.head, 0.6 * o.scale.x); if (z > 1 || x < -50 || x > 1130) return; for (let i = 0; i < 3; i++) { const a = ((t * 0.5 + i / 3 + seed) % 1); g.save(); g.globalAlpha = Math.sin(a * PI) * 0.95; txt('z', x + 30 + a * 50 + i * 6, y - 30 - a * 110, 30 + i * 8, '#ffffff', 800); g.restore(); } };
      if (['cover', 's1', 's3', 's4', 's10', 's11', 's12'].includes(b)) WHO.forEach((k, i) => zz(S.bed[k], i * 0.27));
      if (b === 's2') zz(S.mini, 0);
      /* s1: 10 kids icon row */
      if (b === 's1') { const p = ph('s1', t); for (let i = 0; i < 10; i++) { const a = U.clamp((p - 0.12 - i * 0.025) / 0.08); if (a <= 0) continue; const x = 300 + i * 53, y = 610, hot = i < 2 || (i === 2 && Math.sin(t * 6) > -0.2); g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, 22 * U.easeBack(a), 0, 7); g.fillStyle = hot && p > 0.4 ? '#ffd35e' : 'rgba(255,255,255,.85)'; g.fill(); g.lineWidth = 4; g.strokeStyle = '#3a2f3f'; g.stroke(); g.beginPath(); g.arc(x, y + 40, 26 * U.easeBack(a), PI, 0); g.fill(); g.stroke(); g.restore(); } }
      /* s2: wave labels + markers */
      if (b === 's2') {
        const p = ph('s2', t); const W2 = (x, y) => proj(new T.Vector3(60 + x, y, 0));
        let [x, y] = W2(-4.9, 4.62); txt('ใกล้ตื่น', x + 10, y - 30, 36, '#ffffff', 700, 'left');
        [x, y] = W2(-4.9, -1.25); txt('หลับลึก', x + 10, y, 36, '#ffffff', 700, 'left');
        [x, y] = W2(-4.3, -1.75); txt('เข้านอน →', x + 20, y + 34, 34, '#3a2f3f', 700); [x, y] = W2(4.3, -1.75); txt('เช้า', x, y + 34, 34, '#3a2f3f', 700);
        const MKC = ['#ffd35e', '#ff8fab', '#79dcb4'];
        [0.25, 0.5, 0.75].forEach((u, i) => { const a = U.clamp((p - 0.55 - i * 0.09) / 0.08); if (a <= 0) return; const [px, py] = W2(-4.6 + 9.2 * u, 4.3 - 0.05 * 5.6); const r = 34 * U.easeBack(a); g.beginPath(); g.arc(px, py - 70, r, 0, 7); g.fillStyle = MKC[i]; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); txt(String(i + 1), px, py - 68, 40 * U.easeBack(a), '#ffffff', 800); });
      }
      /* s3 / s4 bubbles */
      if (b === 's3') { const p = ph('s3', t); if (p < 0.5) { const [x, y] = wp(S.bed.nana.userData.head, 0.95); bubble('อืม… งึมงำ…', x + 40, y - 40, U.clamp((p - 0.08) / 0.06) * U.clamp((0.5 - p) / 0.05)); } }
      if (b === 's4') { const p = ph('s4', t); if (p < 0.5) { const [x, y] = wp(S.bed.mama.userData.head, 1.0); bubble('แม่จ๋า~ อุ้มหน่อย', x - 40, y - 40, U.clamp((p - 0.06) / 0.06) * U.clamp((0.5 - p) / 0.05)); } }
      /* s5: airway labels */
      if (b === 's5') { const p = ph('s5', t), a = U.clamp((p - 0.2) / 0.1); if (a > 0) { g.save(); g.globalAlpha = a; let [x, y] = proj(new T.Vector3(-57.3, 4.35, 0.2)); txt('ทางเดินหายใจ', x, y, 32, '#ffffff', 700); if (p > 0.5) { [x, y] = proj(new T.Vector3(-57.3, 0.2, 0.2)); txt('ทอนซิล/อะดีนอยด์โต = แคบ', x, y + 10, 30, '#ffd35e', 700); } g.restore(); } }
      /* s6: doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60, 330, 960, 470, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['กรนดัง > 3 คืน/สัปดาห์ หรือหยุดหายใจ หายใจเฮือก', 'ต้องนอนท่านั่ง หรือแหงนคอถึงหลับได้', 'ลุกนั่ง/ละเมอแทบทุกคืน หรือเดินออกนอกห้อง', 'กลับมาฉี่รดที่นอน หรือมีอาการชัก', 'กลางวันง่วงมาก หรือซนผิดปกติ'];
        L.forEach((s2, i) => { const a = U.clamp((p - 0.1 - i * 0.1) / 0.06); if (a <= 0) return; const y = 390 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162, y + 2, 37, '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: ภาควิชาโสต ศอ นาสิก ม.ขอนแก่น, UVM Health', 540, 768, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s7: battery label */
      if (b === 's7') { const p = ph('s7', t), lvl = U.lerp(100, 22, U.easeIO(U.clamp((p - 0.06) / 0.4))); const [x, y] = proj(new T.Vector3(120.8, 3.0, 0)); txt('แบตสมอง ' + Math.round(lvl) + '%', x, y - 20, 44, lvl > 60 ? '#5fd38d' : lvl > 35 ? '#ffc94d' : '#ff5f6d', 800); }
      /* s8: bar labels */
      if (b === 's8') { const p = ph('s8', t), kb = U.easeOut(U.clamp((p - 0.08) / 0.4)); [[33.3, '1–2 ขวบ', 'ควร 11–14 ชม./วัน'], [34.8, '3–5 ขวบ', 'ควร 10–13 ชม./วัน']].forEach(([v, a1, a2], i) => { const bx = 129.0 + i * 2.9; let [x, y] = proj(new T.Vector3(bx, v * 0.088 * kb, 0)); if (kb > 0.05) txt((v * kb).toFixed(1) + '%', x, y - 46, 60, '#ffd35e', 800); [x, y] = proj(new T.Vector3(bx, 0, 0.6)); txt(a1, x, y + 40, 40, '#3a2f3f', 700); plain(a2, x, y + 86, 28, '#6a4a60', 600, 'center'); }); plain('(นับรวมงีบกลางวัน)', 540, 1680, 28, '#6a4a60', 600, 'center'); }
      /* s11: tips */
      if (b === 's11') {
        const p = ph('s11', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60, 320, 960, 455, 30, 'rgba(255,255,255,.86)', '#ff8fab'); g.restore();
        const L = ['ห้องมืด เย็น เงียบ (เปิดไฟหรี่ได้)', 'งดจอ 1 ชม. ก่อนนอน', 'ตุ๊กตา/ผ้าห่มคู่ใจ (1 ขวบขึ้นไป)', 'กลางวันวิ่งเล่น ไม่งีบเย็นเกินไป', 'ตื่นกลางดึก: พูดสั้น ไฟมืด ไม่ชวนเล่น'];
        const cur = Math.floor(U.clamp((p - 0.1) / 0.85) * 5 - 1e-6);
        L.forEach((s2, i) => { const a = U.clamp((p - 0.1 - i * 0.17) / 0.05); if (a <= 0) return; const y = 380 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84, y - 36, 912, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176, y + 2, 38, '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[84, ['ตี 2 ลูกลุกขึ้นนั่ง', '#fff']], [76, ['ตื่น หรือยังหลับอยู่?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: end('s1') - 0.05, y: 290, lines: [[62, ['ไม่ใช่บ้านเราบ้านเดียว', '#fff']], [60, [(t) => { const k = U.clamp((t - at('s1') - 0.4) / 1.2); return Math.round(20 * k) + '–' + Math.round(30 * k) + '%'; }, '#ffd35e'], [' ของเด็กเล็ก', '#fff']], [46, ['นอนยาก หรือตื่นกลางดึกบ่อย', '#ffe3ea', 600]]], foot: 'ที่มา: AASM Practice Parameters, Sleep 2006' },
      { t0: at('s2') + 0.2, t1: P('s2', 0.5), y: 300, lines: [[64, ['การหลับเป็น "คลื่น"', '#fff']], [48, ['หลับลึก สลับ หลับตื้น หลายรอบต่อคืน', '#ffe3ea', 600]]] },
      { t0: P('s2', 0.52), t1: end('s2') - 0.05, y: 300, lines: [[60, ['ช่วงลอยขึ้นใกล้ผิวน้ำ', '#fff']], [60, ['ลูกอาจลุกได้ 3 แบบ', '#ffd35e']]] },
      { t0: at('s3') + 0.2, t1: P('s3', 0.5), y: 290, lines: [[62, ['① ตื่นครึ่ง หลับครึ่ง', '#ffd35e']], [46, ['ตาเปิด มองทะลุ งึมงำ เช้ามาจำไม่ได้', '#fff', 600]]], foot: 'พบราว 15% ของเด็ก 1–6 ขวบ · มักเกิดช่วงแรกของคืน' },
      { t0: P('s3', 0.52), t1: end('s3') - 0.05, y: 290, lines: [[62, ['อย่าปลุก อย่าเขย่า', '#fff']], [46, ['อยู่ข้างๆ กันตกเตียง เดี๋ยวหลับต่อเอง', '#ffe3ea', 600]]], foot: 'ตัวกระตุ้นที่พบบ่อยสุด = นอนไม่พอ เหนื่อยเกิน' },
      { t0: at('s4') + 0.2, t1: P('s4', 0.5), y: 290, lines: [[58, ['② ตื่นจริง แต่หลับต่อเองไม่เป็น', '#ffd35e']], [46, ['เพราะชินว่าต้องมีนม อุ้มกล่อม', '#fff', 600]], [46, ['หรือพ่อแม่อยู่ข้างๆ ถึงจะหลับ', '#fff', 600]]] },
      { t0: P('s4', 0.52), t1: end('s4') - 0.05, y: 290, lines: [[58, ['ตื่นกลางดึก ก็เรียกหาแบบเดิม', '#fff']], [46, ['หรือช่วงนี้กลัวมืด ฝันร้าย', '#ffe3ea', 600]]] },
      { t0: at('s5') + 0.2, t1: P('s5', 0.48), y: 290, lines: [[62, ['③ ร่างกายกวนการนอน', '#ffd35e']], [46, ['คัดจมูก ร้อน ยุงกัด ไข้ ปวดฉี่', '#fff', 600]]] },
      { t0: P('s5', 0.5), t1: end('s5') - 0.05, y: 290, lines: [[56, ['กรนดัง อ้าปาก ลุกนั่งหลับ', '#fff']], [44, ['อาจเพราะทางหายใจแคบ', '#ffe3ea', 600]]], foot: 'เด็กไทยวัยเรียน กรนเป็นประจำ 8.5% (ม.อ. หาดใหญ่, 2001)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: P('s7', 0.55), y: 290, lines: [[58, ['นอนไม่พอ = แบตสมองไม่เต็ม', '#fff']], [46, ['สมาธิสั้นลง หงุดหงิดง่าย เรียนรู้ช้า', '#ffe3ea', 600]]], foot: 'AASM 2016 รีวิว 864 งานวิจัย: พบความเชื่อมโยง' },
      { t0: P('s7', 0.57), t1: end('s7') - 0.05, y: 290, lines: [[56, ['เสี่ยงอุบัติเหตุ น้ำหนักเกิน', '#fff']], [46, ['บางคนง่วง แต่ออกมาเป็น "ซนไม่หยุด"', '#ffe3ea', 600]]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 290, lines: [[66, ['1 ใน 3', '#ffd35e'], [' ของเด็ก 1–5 ขวบ', '#fff']], [54, ['นอนไม่ถึงเกณฑ์', '#fff']]], foot: 'CDC MMWR 2021 (สำรวจในสหรัฐฯ)' },
      { t0: at('s9') + 0.2, t1: P('s9', 0.52), y: 290, lines: [[60, ['เข้านอนเวลาเดิมทุกคืน', '#ffd35e']], [48, ['+ กิจวัตรก่อนนอน 30 นาที', '#fff', 600]]], foot: 'เด็กที่เข้านอนเวลาเดิม มีโอกาสนอนพอมากกว่า (CDC 2021)' },
      { t0: P('s9', 0.54), t1: end('s9') - 0.05, y: 290, lines: [[56, ['อาบน้ำ → แปรงฟัน → นิทาน', '#fff']], [44, ['ทำแบบเดิมทุกคืน ลูกรู้ว่า "ถึงเวลานอน"', '#ffe3ea', 600]]] },
      { t0: at('s10') + 0.2, t1: P('s10', 0.52), y: 290, lines: [[56, ['วางลงตอน "ง่วง แต่ยังไม่หลับ"', '#ffd35e']], [46, ['ให้ลูกได้ฝึกหลับเอง', '#fff', 600]]] },
      { t0: P('s10', 0.54), t1: end('s10') - 0.05, y: 290, lines: [[56, ['ตื่นกลางดึก ก็หลับต่อเองได้', '#fff']], [44, ['ค่อยๆ ฝึก ปลอบได้เสมอ', '#ffe3ea', 600]]], foot: 'ที่มา: AASM Practice Parameters 2006' },
      { t0: at('s11') + 0.2, t1: end('s11') - 0.05, y: 250, lines: [[60, ['5 ทิป ลูกหลับยาว', '#ffd35e']]] },
      { t0: at('s12') + 0.2, t1: end('s12'), y: 290, lines: [[60, ['ลูกหลับดี พ่อแม่ก็ได้หลับ', '#fff']], [44, ['ลูกคุณตื่นกลางดึกตอนกี่โมง? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AASM 2016, CDC 2021, ม.อ. 2001, ม.ขอนแก่น' },
    ],
    trans,
    audio: [
      [0.5, 'tick'], [1.0, 'tick'], [1.5, 'tick'],
      [at('s1') + 0.3, 'whoosh'], [at('s1') + 1.2, 'pop'], [at('s1') + 2.6, 'ding'],
      [at('s2') + 0.3, 'shimmer'], [P('s2', 0.3), 'bubble'], [P('s2', 0.55), 'ding'], [P('s2', 0.64), 'ding'], [P('s2', 0.73), 'ding'],
      [at('s3') + 0.5, 'breath'], [P('s3', 0.52), 'pop'], [P('s3', 0.66), 'twinkle'],
      [at('s4') + 0.4, 'boing'], [P('s4', 0.52), 'pop'], [P('s4', 0.62), 'heart'],
      [at('s5') + 0.5, 'snore'], [at('s5') + 1.9, 'snore'], [P('s5', 0.5), 'warn'], [P('s5', 0.6), 'wheeze'], [P('s5', 0.8), 'snore'],
      [at('s6') + 0.3, 'heartbeat'], [P('s6', 0.15), 'tick'], [P('s6', 0.25), 'tick'], [P('s6', 0.35), 'tick'], [P('s6', 0.45), 'tick'], [P('s6', 0.55), 'tick'], [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.6, 'thud'], [P('s7', 0.4), 'warn'], [P('s7', 0.57), 'pop'],
      [at('s8') + 0.4, 'riser'], [P('s8', 0.5), 'ding'],
      [at('s9') + 0.3, 'twinkle'], [P('s9', 0.54), 'pop'], [P('s9', 0.7), 'giggle'],
      [at('s10') + 0.4, 'shimmer'], [P('s10', 0.54), 'pop'],
      [P('s11', 0.1), 'ding'], [P('s11', 0.27), 'tick'], [P('s11', 0.44), 'tick'], [P('s11', 0.61), 'tick'], [P('s11', 0.78), 'tick'],
      [at('s12') + 0.3, 'twinkle'], [at('s12') + 1.2, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.NIGHT), CK.musicBed(at('s2'), at('s6'), CK.MUSIC.OOPS), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.OOPS), CK.musicBed(at('s8'), at('s12'), CK.MUSIC.CUTE), CK.musicBed(at('s12'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
