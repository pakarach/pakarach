/* พ่อแม่หัวจะปวด — กว่าลูกจะยอมนอน ขออีกกี่อย่าง? (ถ่วงเวลานอน: ปกติไหม, เกิดจากอะไร, เกา/ลูบ, นม/น้ำ, พบแพทย์ถ้า, กิจวัตร, บัตรผ่านก่อนนอน)
   Build: node build.js luk-thuang-wela-non.js review-luk-thuang-wela-non.html --kit clay --title "กว่าลูกจะยอมนอน ขออีกกี่อย่าง?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 7], ['s2', 6.5], ['s3', 8.5], ['s4', 7], ['s5', 6.5], ['s6', 7.5], ['s7', 7.5], ['s8', 7], ['s9', 7.5], ['s10', 8.5], ['s11', 5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's11'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* ---- bedroom geometry (tested in luk-luk-nang-klang-duek) ---- */
  const MT = 0.75, A_LIE = 0.45, ZH = -1.9;
  const X = { mom: -3.5, nana: -1.6, wawa: -0.05, mama: 1.45, dad: 3.5 };
  const WHO = ['mom', 'nana', 'wawa', 'mama', 'dad'];
  const lieT = (g, x) => { const s = g.userData.base, hy = g.userData.hy0 * s, R = 0.72 * s, yh = MT + 0.12 + 0.55 * R; return { x, y: yh - hy * Math.sin(A_LIE), z: ZH + hy * Math.cos(A_LIE), rx: -PI / 2 + A_LIE }; };
  const sitT = (g, x) => { const s = g.userData.base, sb = s >= 1.2 ? 0.393 : 0.163; return { x, y: MT - sb * s + 0.02, z: -1.45, rx: -0.04 }; };
  const mix = (a, b, k) => ({ x: U.lerp(a.x, b.x, k), y: U.lerp(a.y, b.y, k), z: U.lerp(a.z, b.z, k), rx: U.lerp(a.rx, b.rx, k) });
  const setP = (g, p) => { g.position.set(p.x, p.y, p.z); g.rotation.set(p.rx, 0, 0); };

  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3], [150, 200, 4], [200, 30, 2]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const eveTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ff8fa3'); g.addColorStop(1, '#ffd39a'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ffe36e'; x.beginPath(); x.arc(128, 200, 46, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[60, 80, 26], [92, 74, 30], [124, 84, 22]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const dots = (base, dot) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } });
  const cardTex = () => ctex(256, 176, (x) => { x.fillStyle = '#ffd23f'; x.fillRect(0, 0, 256, 176); x.lineWidth = 12; x.strokeStyle = '#ff6f91'; x.strokeRect(8, 8, 240, 160); x.fillStyle = '#ff6f91'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 26 : 58; x.lineTo(128 + Math.cos(a) * r, 92 + Math.sin(a) * r); } x.closePath(); x.fill(); });

  function clockFace(cv, h) {
    const x = cv.getContext('2d'); x.clearRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = '#ff8fab'; x.stroke();
    x.fillStyle = '#3a2f3f'; for (let i = 0; i < 12; i++) { const a = i / 12 * PI * 2; x.beginPath(); x.arc(128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92, i % 3 ? 5 : 9, 0, 7); x.fill(); }
    x.lineCap = 'round'; const ha = (h % 12) / 12 * PI * 2, ma = (h % 1) * PI * 2;
    x.lineWidth = 14; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ha) * 52, 128 - Math.cos(ha) * 52); x.stroke();
    x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ma) * 80, 128 - Math.cos(ma) * 80); x.stroke();
    x.fillStyle = '#ff8fab'; x.beginPath(); x.arc(128, 128, 12, 0, 7); x.fill();
  }

  /* requests parade (s1) */
  const REQ = ['เกาหลังหน่อย', 'ลูบหัวด้วย', 'หิวน้ำ', 'หิวนม', 'ปวดฉี่', 'ผ้าห่มยับ', 'กอดอีกที', 'มีอะไรจะบอก…'];
  const rqT = (i) => P('s1', 0.07 + i * 0.108), rqD = () => dur('s1') * 0.108;
  const rqIdx = (t) => { let k = -1; for (let i = 0; i < REQ.length; i++) if (t >= rqT(i)) k = i; return k; };
  /* s3 reasons */
  const R3 = (i) => i === 0 ? at('s3') : TM('s3', i, i === 1 ? 0.37 : 0.69);
  const r3Idx = (t) => t >= R3(2) ? 2 : t >= R3(1) ? 1 : 0;
  const C8 = (i) => MK.s8 ? TM('s8', i, 0) : SP('s8', 0.5) + 0.25 + i * 0.42;
  /* stairs (s7) */
  const STX = (i) => 125.4 + i * 1.45, STH = (i) => 0.6 + i * 0.6;

  const SH = {
    cover: [FW(-1.0, -1.6, 8.0, 4.0, 0.42), FW(-1.0, -1.6, 7.7, 4.0, 0.42)],
    s1: [FW(-1.0, -1.6, 7.9, 4.0, 0.42), FW(-1.0, -1.6, 7.6, 4.0, 0.42)],
    s2: [FW(0, -1.6, 10.6, 4.2, 0.4), FW(0, -1.6, 10.2, 4.2, 0.4)],
    s3: REEL ? [FW(60, 0, 8.4, 5.6, 0.08), FW(60, 0, 8.1, 5.6, 0.08)] : [FW(60, 0, 8.4, 6.6, 0.08), FW(60, 0, 8.1, 6.6, 0.08)],
    s4: [FW(-2.55, -1.6, 5.2, 4.0, 0.42), FW(-2.55, -1.6, 4.9, 3.9, 0.46)],
    s5: [FW(1.2, -1.6, 6.8, 4.3, 0.42), FW(1.2, -1.6, 6.6, 4.3, 0.42)],
    s6: [FW(-61.9, -0.6, 5.9, 4.1, 0.22), FW(-61.9, -0.6, 5.6, 4.1, 0.22)],
    s7: REEL ? [FW(127.9, 0, 9.6, 3.6, 0.1), FW(127.9, 0, 9.3, 3.6, 0.1)] : [FW(127.9, 0, 9.6, 4.6, 0.1), FW(127.9, 0, 9.3, 4.6, 0.1)],
    s8: [FW(0, -1.6, 10.4, 4.2, 0.4), FW(0, -1.6, 10.0, 4.2, 0.4)],
    s9: [FW(1.2, -1.6, 6.8, 4.3, 0.42), FW(1.2, -1.6, 6.5, 4.3, 0.42)],
    s10: [FW(0, -1.6, 10.6, 2.0, 0.6), FW(0, -1.6, 10.3, 2.0, 0.6)],
    s11: [FW(0, -1.6, 10.6, 2.0, 0.6), FW(0, -1.6, 9.4, 2.0, 0.6)],
  };
  const CUT = new Set(['s3', 's4', 's6', 's7', 's8', 's10']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));

  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.registerSfx('snore', (t) => { VE.audio.noise(t, 0.8, { type: 'bandpass', f: 170, f2: 260, vol: 0.16, att: 0.35, q: 2 }); VE.audio.tone(t + 0.05, 85, 0.6, { type: 'sawtooth', vol: 0.035, att: 0.3 }); });

  VE.run({
    DUR, file: 'luk-thuang-wela-non', title: 'กว่าลูกจะยอมนอน ขออีกกี่อย่าง?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'การนอนของลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: bedroom ===== */
      const room = CK.room(T, { wall: '#9fd0f5', wain: '#ffcf7a', floor: '#e9b483', rug: false, props: false, winX: 3.3 }); scene.add(room);
      const NT = nightTex(), ET = eveTex(); room.userData.win.material.map = NT;
      const frame = new T.Mesh(new T.BoxGeometry(10.4, 0.36, 4.7), M('#e9b27c')); frame.position.set(0, 0.18, -0.5); scene.add(frame);
      const matt = new T.Mesh(new T.BoxGeometry(10.1, 0.4, 4.4), M('#ffc2d6')); matt.position.set(0, MT - 0.2, -0.5); scene.add(matt);
      const head = new T.Mesh(new T.BoxGeometry(10.4, 1.5, 0.3), M('#ff9a76')); head.position.set(0, 0.95, -2.85); scene.add(head);
      for (const k of WHO) { const p = new T.Mesh(new T.SphereGeometry(1, 24, 14), M('#ffffff')); const w = k === 'mom' || k === 'dad' ? 1.05 : 0.8; p.scale.set(w, 0.24, 0.5); p.position.set(X[k], MT + 0.12, -2.2); scene.add(p); }
      const blT = dots('#46b89a', '#c9f5e6'); blT.wrapS = blT.wrapT = T.RepeatWrapping; blT.repeat.set(5, 2);
      const blanket = new T.Group(); const bm = M('#ffffff', { map: blT });
      const bb = new T.Mesh(new T.BoxGeometry(9.9, 0.6, 3.0), bm); bb.position.set(0, MT + 0.3, 0.5); blanket.add(bb);
      const roll = new T.Mesh(new T.CylinderGeometry(0.32, 0.32, 9.9, 24), bm); roll.rotation.z = PI / 2; roll.position.set(0, MT + 0.3, -1.0); blanket.add(roll);
      scene.add(blanket);
      const ccv = document.createElement('canvas'); ccv.width = ccv.height = 256; clockFace(ccv, 8); const ctx2 = new T.CanvasTexture(ccv);
      const clock = new T.Mesh(new T.CircleGeometry(0.6, 40), new T.MeshBasicMaterial({ map: ctx2, transparent: true })); clock.position.set(-1.2, 3.65, -4.33); scene.add(clock);
      const lamp = new T.Group(); const lb = new T.Mesh(new T.CylinderGeometry(0.18, 0.24, 0.22, 16), M('#ffffff')); lamp.add(lb);
      const lg = new T.Mesh(new T.SphereGeometry(0.3, 20, 14), new T.MeshStandardMaterial({ color: '#ffe08a', emissive: '#ffc94d', emissiveIntensity: 0.4, roughness: 0.4 })); lg.position.y = 0.34; lamp.add(lg);
      lamp.position.set(4.55, 1.82, -2.85); scene.add(lamp);
      const lampL = new T.PointLight(0xffd08a, 0, 7); lampL.position.set(4.5, 2.4, -2.2); scene.add(lampL);
      const bed = {};
      for (const k of WHO) { const g = CK.family(T, k); g.userData.base = g.scale.x; g.userData.hy0 = g.userData.head.position.y; scene.add(g); bed[k] = g; }
      const book = new T.Group(); const bk1 = new T.Mesh(new T.BoxGeometry(0.75, 0.55, 0.08), M('#ff6f91')); bk1.position.set(-0.2, 0, 0); bk1.rotation.y = 0.5; const bk2 = new T.Mesh(new T.BoxGeometry(0.75, 0.55, 0.08), M('#ffd23f')); bk2.position.set(0.2, 0, 0); bk2.rotation.y = -0.5; book.add(bk1, bk2);
      book.position.set(0, -0.12, 0.25); bed.mom.userData.hand1.add(book);
      /* bedtime pass card in mama's hand */
      const card = new T.Mesh(new T.BoxGeometry(1.05, 0.72, 0.06), [M('#ffb300'), M('#ffb300'), M('#ffb300'), M('#ffb300'), new T.MeshBasicMaterial({ map: cardTex() }), M('#ffb300')]);
      card.position.set(0, -0.2, 0.3); bed.mama.userData.hand1.add(card);
      /* milk bottle + water cup (s5) */
      const bottle = new T.Group(); const bt = new T.Mesh(new T.CylinderGeometry(0.17, 0.17, 0.5, 16), M('#ffffff', { transparent: true, opacity: 0.9 })); const btm = new T.Mesh(new T.CylinderGeometry(0.15, 0.15, 0.3, 16), M('#fff1c9')); btm.position.y = -0.08; const nip = new T.Mesh(new T.ConeGeometry(0.11, 0.22, 14), M('#ffb3c6')); nip.position.y = 0.35; const ring = new T.Mesh(new T.CylinderGeometry(0.19, 0.19, 0.1, 16), M('#ff8fab')); ring.position.y = 0.26; bottle.add(bt, btm, nip, ring);
      bottle.visible = false; scene.add(bottle);
      const cup = new T.Group(); const cb = new T.Mesh(new T.CylinderGeometry(0.24, 0.19, 0.5, 20), M('#bfe6ff', { transparent: true, opacity: 0.75 })); const cw = new T.Mesh(new T.CylinderGeometry(0.21, 0.18, 0.32, 20), M('#4aa8ff')); cw.position.y = -0.07; cup.add(cb, cw);
      cup.visible = false; scene.add(cup);

      /* ===== stage 1: three reasons (x = 60) ===== */
      const mech = new T.Group(); mech.position.x = 60; scene.add(mech);
      const fl1 = new T.Mesh(new T.BoxGeometry(22, 0.3, 30), M('#7fd0bd')); fl1.position.set(0, -0.15, 0); mech.add(fl1);
      const bw1 = new T.Mesh(new T.BoxGeometry(22, 12, 0.3), M('#ffffff', { map: (() => { const tx = dots('#c9f0e6', '#ffffff'); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(8, 4); return tx; })() })); bw1.position.set(0, 5.6, -3.2); mech.add(bw1);
      const PX = [-2.55, 0, 2.55], PC = ['#ff8fab', '#ffb648', '#6fb0ff'];
      const peds = PX.map((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(1.05, 1.18, 1.0, 36), M(PC[i])); p.position.set(x, 0.5, 0); mech.add(p); return p; });
      const props = [];
      { const h = new T.Group(), hm = M('#ff4f7d'); for (const s of [-1, 1]) { const b = new T.Mesh(new T.SphereGeometry(0.36, 20, 14), hm); b.position.set(s * 0.27, 0.16, 0); h.add(b); } const c = new T.Mesh(new T.ConeGeometry(0.6, 0.78, 24), hm); c.rotation.z = PI; c.position.y = -0.32; h.add(c); props.push(h); }
      { const c = new T.Group(), cm = M('#ffd23f'); const r = new T.Mesh(new T.CylinderGeometry(0.46, 0.4, 0.34, 24), cm); c.add(r); for (let i = 0; i < 5; i++) { const a = i / 5 * PI * 2; const k = new T.Mesh(new T.ConeGeometry(0.13, 0.36, 12), cm); k.position.set(Math.cos(a) * 0.4, 0.34, Math.sin(a) * 0.4); c.add(k); const j = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#ff5f86')); j.position.set(Math.cos(a) * 0.4, 0.55, Math.sin(a) * 0.4); c.add(j); } props.push(c); }
      { const b = new T.Group(); const sh = new T.Mesh(new T.BoxGeometry(0.78, 1.1, 0.5), M('#ffffff', { transparent: true, opacity: 0.45 })); b.add(sh); const cp = new T.Mesh(new T.BoxGeometry(0.3, 0.14, 0.3), M('#ffffff')); cp.position.y = 0.62; b.add(cp); const f = new T.Mesh(new T.BoxGeometry(0.62, 0.94, 0.4), M('#4fd07f', { emissive: '#2fae5f', emissiveIntensity: 0.3 })); b.add(f); for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), M('#3a2f3f')); e.position.set(s * 0.16, 0.12, 0.24); b.add(e); } props.push(b); }
      props.forEach((p, i) => { p.position.set(PX[i], 5.3, 0); mech.add(p); });
      const mini = CK.family(T, 'mama', { scale: 0.95 }); mini.userData.base = 0.95; mech.add(mini);

      /* ===== stage 2: neighbour room (x = -60) ===== */
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: -2.6 }); room2.position.x = -60; scene.add(room2);
      room2.userData.win.material.map = NT;
      const b2 = new T.Group(); b2.position.x = -61; scene.add(b2);
      const f2 = new T.Mesh(new T.BoxGeometry(3.2, 0.36, 4.2), M('#e9b27c')); f2.position.set(0, 0.18, -0.6); b2.add(f2);
      const m2 = new T.Mesh(new T.BoxGeometry(3.0, 0.4, 4.0), M('#ffd0dc')); m2.position.set(0, MT - 0.2, -0.6); b2.add(m2);
      const hb2 = new T.Mesh(new T.BoxGeometry(3.2, 1.6, 0.3), M('#9fd3ff')); hb2.position.set(0, 1.0, -2.75); b2.add(hb2);
      const pil2 = new T.Mesh(new T.SphereGeometry(1, 24, 14), M('#ffffff')); pil2.scale.set(1.05, 0.62, 0.32); pil2.position.set(0, MT + 0.55, -2.25); pil2.rotation.x = -0.35; b2.add(pil2);
      const bl2 = new T.Mesh(new T.BoxGeometry(2.9, 0.55, 2.4), M('#ffffff', { map: dots('#d8605f', '#ffd9c2') })); bl2.position.set(0, MT + 0.27, 0.15); b2.add(bl2);
      const st2 = {};
      st2.kid = CK.neighbor(T, 2, { scale: 0.95 }); st2.kid.userData.base = 0.95; scene.add(st2.kid);
      st2.kmom = CK.neighbor(T, 1, { scale: 1.3, lashes: true }); st2.kmom.userData.base = 1.3; scene.add(st2.kmom);

      /* ===== stage 3: stairs (x = 125..132) ===== */
      const plat = new T.Mesh(new T.BoxGeometry(24, 0.3, 14), M('#ee6f9c')); plat.position.set(128, -0.15, 0); scene.add(plat);
      const backW = new T.Mesh(new T.BoxGeometry(24, 11, 0.3), M('#ffffff', { map: (() => { const tx = dots('#ffd1e3', '#ffffff'); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(10, 5); return tx; })() })); backW.position.set(128, 5.2, -4.5); scene.add(backW);
      const SC = ['#ff7fa8', '#ffa55e', '#f2c22e', '#6fcf7f', '#4fb2f5'];
      const steps = SC.map((c, i) => { const g = new T.BoxGeometry(1.32, STH(i), 1.7); g.translate(0, STH(i) / 2, 0); const m = new T.Mesh(g, M(c)); m.position.set(STX(i), 0, 0); m.scale.y = 0.01; scene.add(m); return m; });
      const kid7 = CK.family(T, 'mama', { scale: 0.6 }); kid7.userData.base = 0.6; scene.add(kid7);
      const stars = []; for (let i = 0; i < 9; i++) { const st = new T.Mesh(new T.OctahedronGeometry(0.14, 0), M(i % 2 ? '#ffd23f' : '#ffffff')); st.userData.p = [123.4 + i * 1.15, 4.6 + (i % 3) * 0.45]; scene.add(st); stars.push(st); }

      return { key, hemi, room, NT, ET, bed, clock, ccv, ctx2, clockH: 8, lg, lampL, book, card, bottle, cup, PX, peds, props, mini, room2, st2, steps, kid7, stars };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc); s.room2.userData.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dn);
      const eve = inB('s8', t); s.room.userData.win.material.map = eve ? s.ET : s.NT;
      const lampOn = t > at('s10') ? U.clamp((t - at('s10') - 1) / 1.0) : 0; s.lampL.intensity = 0.4 * lampOn; s.lg.material.emissiveIntensity = 0.4 + 0.9 * lampOn;
      const ch = t < at('s1') ? 8 : t < end('s1') ? 8 + 1.5 * U.clamp((ph('s1', t) - 0.05) / 0.9) : t < at('s8') ? 9.5 : eve ? 7.5 + ph('s8', t) * 0.4 : t < at('s10') ? 8.0 : 8.25;
      if (Math.abs(ch - s.clockH) > 0.004) { s.clockH = ch; clockFace(s.ccv, ch); s.ctx2.needsUpdate = true; }

      /* ---------- bedroom family ---------- */
      const BD = s.bed, L = {}, Sx = {};
      for (const k of WHO) { L[k] = lieT(BD[k], X[k]); Sx[k] = sitT(BD[k], X[k]); }
      const st = {};
      const def = (k, p, ex, vis) => (st[k] = { p, ex: ex || 'sleepy', vis: vis !== false, breath: 0.3 });
      for (const k of WHO) def(k, L[k], 'sleepy', true);
      let cardOn = false;
      if (bt === 'cover' || bt === 's1') {
        const ri = bt === 's1' ? rqIdx(t) : -1, p = bt === 's1' ? ph('s1', t) : 0;
        def('mom', Sx.mom, bt === 'cover' ? 'worried' : p < 0.3 ? 'happy' : p < 0.62 ? 'worried' : 'cry');
        def('mama', Sx.mama, 'giggle'); def('nana', Sx.nana, 'happy'); st.mama.breath = st.nana.breath = 0.45;
        if (bt === 'cover' || (ri >= 0 && ri % 2 === 0)) st.mama.finger = true;
        if (ri >= 0 && ri % 2 === 1) { st.nana.armsUp = true; st.nana.ex = 'giggle'; }
        def('dad', L.dad, 'sleepy', false);
      } else if (bt === 's2') {
        const q = SP('s2', 0.5);
        def('mom', Sx.mom, t < at('s2') + 1.0 ? 'worried' : t < q ? 'happy' : 'worried');
        def('mama', Sx.mama, 'giggle'); def('nana', Sx.nana, 'happy'); st.mama.breath = st.nana.breath = 0.45;
        if (t < q) st.mama.wave = true;
      } else if (bt === 's4') {
        const p = ph('s4', t), kd = U.easeIO(U.clamp((p - 0.12) / 0.2));
        def('mom', Sx.mom, t < SP('s4', 0.5) ? 'happy' : 'sleepy'); st.mom.arm1 = [1.45 + 0.13 * Math.sin(t * 7), -0.35];
        def('nana', mix(Sx.nana, L.nana, kd), kd < 0.5 ? 'happy' : 'sleepy');
        def('wawa', L.wawa, 'sleepy', false); def('dad', L.dad, 'sleepy', false); def('mama', L.mama, 'sleepy', false);
      } else if (bt === 's5') {
        const p = ph('s5', t), q = SP('s5', 0.5);
        def('mama', Sx.mama, t < q ? 'cry' : 'happy'); if (t < q) st.mama.armsUp = true;
        def('dad', mix(L.dad, Sx.dad, U.easeIO(U.clamp((p - 0.1) / 0.14))), p < 0.25 ? 'sleepy' : t < q ? 'worried' : 'happy');
        if (t > q) st.dad.armm1 = [-1.25, -0.4];
        def('mom', L.mom, 'sleepy', false);
      } else if (bt === 's8') {
        const p = ph('s8', t);
        def('mom', Sx.mom, 'happy'); st.mom.arm1 = [0.95, -1.0]; st.mom.book = true;
        def('nana', Sx.nana, p > 0.55 ? 'giggle' : 'happy'); def('mama', Sx.mama, p > 0.4 ? 'giggle' : 'happy'); def('wawa', Sx.wawa, 'happy'); def('dad', Sx.dad, 'happy');
        st.nana.breath = st.mama.breath = 0.4;
      } else if (bt === 's9') {
        const q = SP('s9', 0.52), kd = U.easeIO(U.clamp((t - q - 1.3) / 1.0));
        def('mama', mix(Sx.mama, L.mama, kd), t < q ? 'worried' : kd < 0.5 ? 'happy' : 'sleepy');
        cardOn = t < q + 0.9; if (cardOn) st.mama.hold = true;
        def('dad', Sx.dad, 'happy'); if (t > q + 0.3 && t < q + 1.6) st.dad.armm1 = [-1.25, -0.4];
        def('mom', L.mom, 'sleepy', false);
      } else if (bt === 's11') {
        if (ph('s11', t) > 0.35) { st.mom.ex = 'happy'; st.dad.ex = 'happy'; }
      }
      for (const k of WHO) {
        const g = BD[k], q = st[k]; g.visible = q.vis; if (!q.vis) continue;
        setP(g, q.p); g.userData.setExpr(q.ex); g.userData.tick(t, { breath: q.breath, wave: q.wave });
        const a1 = g.userData.arm1, a2 = g.userData['arm-1'];
        if (q.arm1) { a1.rotation.z = q.arm1[0] + 0.04 * Math.sin(t * 3); a1.rotation.x = q.arm1[1]; }
        if (q.armm1) { a2.rotation.z = q.armm1[0] + 0.08 * Math.sin(t * 4); a2.rotation.x = q.armm1[1]; }
        if (q.armsUp) { a1.rotation.z = 2.2 + 0.15 * Math.sin(t * 8); a2.rotation.z = -2.2 - 0.15 * Math.sin(t * 8 + 1); a1.rotation.x = a2.rotation.x = 0.6; }
        if (q.finger) { a1.rotation.z = 1.95 + 0.12 * Math.sin(t * 7); a1.rotation.x = 0.45; }
        if (q.hold) { a1.rotation.z = 1.2 + 0.05 * Math.sin(t * 2.5); a1.rotation.x = -1.0; }
      }
      s.book.visible = !!st.mom.book; s.card.visible = cardOn;
      { const on = bt === 's5', p = on ? ph('s5', t) : 0, k = on ? U.easeBack(U.clamp((p - 0.06) * 6)) : 0;
        s.bottle.visible = s.cup.visible = on && k > 0.01;
        s.bottle.position.set(-0.15, 3.1 + 0.1 * Math.sin(t * 3), -1.3); s.bottle.rotation.z = 0.3 + 0.1 * Math.sin(t * 2); s.bottle.scale.setScalar(1.7 * Math.max(0.01, k));
        s.cup.position.set(2.4, 2.05 + 0.06 * Math.sin(t * 3 + 1), 0.4); s.cup.rotation.z = 0.08 * Math.sin(t * 2); s.cup.scale.setScalar(1.5 * Math.max(0.01, k)); }

      /* ---------- stage 1: reasons ---------- */
      { const on = bt === 's3', ri = on ? r3Idx(t) : 0, tr = on ? U.clamp((t - R3(ri)) / 0.6) : 1, from = ri > 0 ? s.PX[ri - 1] : s.PX[0];
        const x = U.lerp(from, s.PX[ri], U.easeIO(tr)), hop = ri > 0 ? Math.sin(tr * PI) * 1.3 : 0;
        s.mini.position.set(x, 1.0 + hop + 0.04 * Math.abs(Math.sin(t * 5)), 0.15);
        s.mini.userData.setExpr(ri === 0 ? 'cry' : ri === 1 ? 'giggle' : 'happy'); s.mini.userData.tick(t, { breath: 0.45 });
        if (ri === 0 && tr >= 1) { s.mini.userData.arm1.rotation.z = 2.1 + 0.1 * Math.sin(t * 6); s.mini.userData['arm-1'].rotation.z = -2.1 - 0.1 * Math.sin(t * 6); s.mini.userData.arm1.rotation.x = s.mini.userData['arm-1'].rotation.x = 0.7; }
        if (ri === 1 && tr >= 1) { s.mini.userData.arm1.rotation.z = 1.95 + 0.1 * Math.sin(t * 7); s.mini.userData.arm1.rotation.x = 0.45; }
        if (ri === 2 && tr >= 1) s.mini.position.y = 1.0 + 0.35 * Math.abs(Math.sin(t * 6));
        s.props.forEach((p, i) => { const shown = on && i <= ri, a = shown ? U.easeBack(U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.45)) : 0; p.visible = a > 0.01; p.scale.setScalar(Math.max(0.01, a) * (i === ri ? 1.75 + 0.1 * Math.sin(t * 5) : 1.2)); p.position.y = 5.3 + 0.12 * Math.sin(t * 2.4 + i); p.rotation.y = i === 1 ? t * 0.8 : 0.25 * Math.sin(t * 1.5 + i); });
        s.peds.forEach((p, i) => { p.scale.y = i === ri && on ? 1 : 0.8; p.position.y = 0.5 * p.scale.y; }); }

      /* ---------- stage 2 ---------- */
      { const k = s.st2.kid; k.position.set(-61, MT - 0.163 * 0.95 + 0.02, -1.25); k.rotation.set(-0.04, 0, 0);
        k.userData.setExpr('worried'); k.userData.tick(t, { breath: 0.5 }); k.userData.head.rotation.z = 0.08 * Math.sin(t * 1.6);
        const m = s.st2.kmom; m.visible = inB('s6', t) && t > at('s6') + 0.7; m.position.set(-63.0, 0, 0.5); m.rotation.y = 0.35; m.userData.setExpr('worried'); m.userData.tick(t, {}); m.userData.arm1.rotation.z = 1.0 + 0.05 * Math.sin(t * 3); m.userData.arm1.rotation.x = -0.6; }

      /* ---------- stage 3: stairs ---------- */
      { const on = bt === 's7', p = on ? ph('s7', t) : 0, q = SP('s7', 0.42);
        s.steps.forEach((m, i) => { m.scale.y = Math.max(0.01, on ? U.easeOut(U.clamp((t - q - i * 0.28) / 0.5)) : 0); });
        const u = on ? U.clamp((t - q - 0.9) / Math.max(0.8, end('s7') - q - 1.9)) * 4 : 0, i0 = Math.min(3, Math.floor(u)), f = Math.min(1, (u - i0) * 1.6), top = u >= 4;
        const kx = top ? STX(4) : U.lerp(STX(i0), STX(i0 + 1), U.easeIO(f)), ky = top ? STH(4) : U.lerp(STH(i0), STH(i0 + 1), U.easeIO(f)) + Math.sin(f * PI) * 0.7;
        const k7 = s.kid7, pre = t < q + 0.9; k7.visible = on; if (pre) k7.position.set(STX(0) - 1.15, 0, 0.5); else k7.position.set(kx, ky, 0.2);
        k7.userData.setExpr(top ? 'sleepy' : 'happy'); k7.userData.tick(t, { breath: 0.4, wave: pre });
        s.stars.forEach((st, i) => { st.position.set(st.userData.p[0], st.userData.p[1] + 0.15 * Math.sin(t * 2 + i), -2.5); st.rotation.y = t * 1.5 + i; }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { bed: s.bed, st2: s.st2, mini: s.mini, kid7: s.kid7 }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's3') return ['#b8ecdf', '#fff4e6']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's7') return ['#ffe8f0', '#fff4e6']; return ['#bcd9ff', '#ffd6ec']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, sz) => { if (a <= 0) return; sz = sz || 40; g.save(); g.globalAlpha = Math.min(1, a); g.font = '700 ' + sz + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 54, lo = 30 + LD * 2.2, hi = 1050 - LD * 3; const bx = Math.max(lo + w / 2, Math.min(hi - w / 2, x)); rr(bx - w / 2, y - 40, w, 80, 40, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + 38); g.lineTo(x + 2, y + 68); g.lineTo(x + 18, y + 38); g.fillStyle = '#ffffff'; g.fill(); plain(str, bx, y + 2, sz, '#3a2f3f', 700, 'center'); g.restore(); };
      const zz = (o, seed) => { if (!o || !o.visible || o.userData.expr() !== 'sleepy') return; const [x, y, z] = wp(o.userData.head, 0.6 * o.scale.x); if (z > 1 || x < -50 || x > 1130) return; for (let i = 0; i < 3; i++) { const a = ((t * 0.5 + i / 3 + seed) % 1); g.save(); g.globalAlpha = Math.sin(a * PI) * 0.95; txt('z', x + 30 + a * 50 + i * 6, y - 30 - a * 110, 30 + i * 8, '#ffffff', 800); g.restore(); } };
      if (['cover', 's1', 's2', 's4', 's5', 's9', 's10', 's11'].includes(b)) WHO.forEach((k, i) => zz(S.bed[k], i * 0.27));
      if (b === 's7') zz(S.kid7, 0);
      /* s1: requests + clock + counter */
      if (b === 's1') {
        const ri = rqIdx(t), p = ph('s1', t), mins = Math.round(90 * U.clamp((p - 0.05) / 0.9)), hh = 20 + Math.floor(mins / 60), mm = mins % 60;
        txt(hh + ':' + (mm < 10 ? '0' : '') + mm + ' น.', 330, 560, 60, '#ffffff', 800);
        txt('คำขอ ' + (ri + 1) + ' อย่าง', 730, 560, 60, '#ffd35e', 800);
        if (ri >= 0) { const who = ri % 2 === 0 ? 'mama' : 'nana', a = U.clamp((t - rqT(ri)) / 0.14) * U.clamp((rqT(ri) + rqD() - t) / 0.12 + (ri === REQ.length - 1 ? 1 : 0)); const [x, y] = wp(S.bed[who].userData.head, who === 'mama' ? 1.15 : 1.0); bubble(REQ[ri], x + (who === 'mama' ? -30 : 30), y - 50, a, 44); }
      }
      /* s3: numbers over props */
      if (b === 's3') { const ri = r3Idx(t); for (let i = 0; i <= ri; i++) { const a = U.clamp((t - R3(i) - (i ? 0.1 : 0.4)) / 0.4); if (a <= 0) continue; const [x, y] = proj(new T.Vector3(60 + [-2.55, 0, 2.55][i], 6.75, 0)); const r = (i === ri ? 40 : 30) * U.easeBack(a); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ['#ff6f91', '#f59a1b', '#3f8fe8'][i]; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); txt(String(i + 1), x, y + 2, (i === ri ? 46 : 34) * U.easeBack(a), '#ffffff', 800); } }
      /* s4 bubble */
      if (b === 's4') { const [x, y] = wp(S.bed.nana.userData.head, 0.95); bubble('เกาหลังหน่อย~', x + 60, y - 40, U.clamp((t - at('s4') - 0.5) / 0.3) * U.clamp((P('s4', 0.2) - t) / 0.3), 40); }
      /* s5: bubble + marks on bottle / cup */
      if (b === 's5') {
        const q = SP('s5', 0.5); const [x, y] = wp(S.bed.mama.userData.head, 1.1); bubble('หิวนมมม!', x, y - 50, U.clamp((t - at('s5') - 0.5) / 0.3) * U.clamp((q - t) / 0.3), 44);
        const a = U.clamp((t - q - 0.2) / 0.35); if (a > 0) {
          let [bx, by] = proj(new T.Vector3(-0.15, 3.1, -1.3)); g.save(); g.globalAlpha = a; g.lineCap = 'round'; g.lineWidth = 16; g.strokeStyle = '#ff3b5c'; const r = 62 * U.easeBack(a); g.beginPath(); g.moveTo(bx - r, by - r); g.lineTo(bx + r, by + r); g.moveTo(bx + r, by - r); g.lineTo(bx - r, by + r); g.stroke();
          [bx, by] = proj(new T.Vector3(2.4, 2.05, 0.4)); g.strokeStyle = '#2fbf71'; g.beginPath(); g.moveTo(bx + 30, by - 20); g.lineTo(bx + 52, by + 6); g.lineTo(bx + 96, by - 50); g.stroke(); g.restore();
        }
      }
      /* s6: doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 470, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['กรนดัง หยุดหายใจ หรือหายใจเฮือก', 'นอนลงเกิน 1 ชม. ยังไม่หลับ แทบทุกคืน', 'กลางวันง่วงมาก หงุดหงิด หรือซนผิดปกติ', 'กลัว กังวลรุนแรง จนกระทบตอนกลางวัน', 'บ่นขาอยู่ไม่สุข หรือคันจนมีผื่น'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 390 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(40 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AASM, University of Missouri Extension', 540, 768, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
        if (S.st2.kid.visible) { const [x, y] = wp(S.st2.kid.userData.head, 0.95); g.save(); g.globalAlpha = a0; txt('น้องลิ้นจี่ 5 ขวบ', x + 150, y + 20, 36, '#ffffff', 700); g.restore(); }
      }
      /* s7: stair labels */
      if (b === 's7') {
        const q = SP('s7', 0.42), LB = ['0', '1–2', '3–4', '5–6', '7'];
        LB.forEach((l, i) => { const a = U.clamp((t - q - i * 0.28 - 0.3) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3(STX(i), STH(i) * 0.5, 0.86)); g.save(); g.globalAlpha = a; txt(l, x, y, 46, '#ffffff', 800); g.restore(); });
        const a = U.clamp((t - q - 0.2) / 0.4); if (a > 0) { const [, y] = proj(new T.Vector3(127.9, 0, 0.9)); g.save(); g.globalAlpha = a; plain('จำนวนคืนต่อสัปดาห์ ที่ทำกิจวัตรก่อนนอน', 540, y + 52, 34, '#5a3550', 700, 'center'); const [x2, y2] = proj(new T.Vector3(125.6, 2.9, 0)); txt('ยิ่งบ่อย', x2, y2 - 30, 50, '#ff6f91', 800); txt('ยิ่งหลับดี', x2, y2 + 34, 50, '#ff6f91', 800); g.restore(); }
      }
      /* s8: pre-answered checklist */
      if (b === 's8') {
        const q = SP('s8', 0.5), a0 = U.clamp((t - q) / 0.3); if (a0 > 0) {
          const IT = ['น้ำ', 'ฉี่', 'กอด', 'เกาหลัง 2 นาที', 'นิทาน'];
          g.save(); g.globalAlpha = a0; rr(70 + LD, 470, 940 - 2 * LD, 96, 48, 'rgba(255,255,255,.9)', '#ff8fab'); g.font = '700 ' + Math.round(36 * LF) + 'px Kanit,sans-serif'; const ws = IT.map((s2) => g.measureText(s2).width + 54), tot = ws.reduce((a, c) => a + c, 0), gap = (940 - 2 * LD - 50 - tot) / 4; let x = 95 + LD;
          IT.forEach((s2, i) => { const a = U.clamp((t - C8(i)) / 0.25); g.globalAlpha = a0 * (0.35 + 0.65 * a); g.beginPath(); g.arc(x + 18, 518, 18, 0, 7); g.fillStyle = a > 0 ? '#2fbf71' : '#d9c7d0'; g.fill(); if (a > 0) { g.lineWidth = 5; g.lineCap = 'round'; g.strokeStyle = '#ffffff'; g.beginPath(); g.moveTo(x + 9, 518); g.lineTo(x + 16, 526); g.lineTo(x + 28, 510); g.stroke(); } plain(s2, x + 44, 520, Math.round(36 * LF), '#3a2f3f', 700); x += ws[i] + gap; });
          g.restore();
        }
      }
      /* s9: bubbles */
      if (b === 's9') { const q = SP('s9', 0.52); let [x, y] = wp(S.bed.mama.userData.head, 1.15); bubble('ใช้กับอะไรดีนะ…', x - 20, y - 50, U.clamp((t - at('s9') - 0.8) / 0.3) * U.clamp((q - t) / 0.3), 42); [x, y] = wp(S.bed.dad.userData.head, 1.5); bubble('ถึงเวลานอนแล้วจ้ะ', x - 60, y - 40, U.clamp((t - q - 0.4) / 0.3) * U.clamp((end('s9') - 0.3 - t) / 0.3), 40); }
      /* s10: tips */
      if (b === 's10') {
        const p = ph('s10', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['เข้านอน–ตื่น เวลาเดิมทุกวัน', 'ปิดจอก่อนนอน 1 ชม.', 'งีบบ่าย ให้ตื่นก่อนเข้านอน 4–6 ชม.', 'ให้เลือก 2 ทาง: นิทานเล่มไหน ชุดนอนตัวไหน', 'ทำได้ เช้ามาชมทันที'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s10', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s10', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(37 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[84, ['กว่าลูกจะยอมนอน', '#fff']], [80, ['ขออีกกี่อย่าง?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: end('s1') - 0.05, y: 290, lines: [[62, ['ปิดไฟแล้ว แต่คำขอยังมา', '#fff']], [46, ['จาก 2 ทุ่ม ลากยาวถึง 3 ทุ่มครึ่ง', '#ffe3ea', 600]]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.5), y: 290, lines: [[72, ['ปกติไหม? ', '#fff'], ['ปกติ!', '#ffd35e']], [48, ['พบบ่อยที่สุดช่วง 2–5 ขวบ', '#fff', 600]]], foot: 'ที่มา: Honaker & Meltzer, Paediatr Respir Rev 2014' },
      { t0: SP('s2', 0.5) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[58, ['จะเริ่มเป็นปัญหา เมื่อ…', '#fff']], [54, ['ลากเกิน 1 ชม. แทบทุกคืน', '#ffd35e']]], foot: 'ที่มา: นพ. Craig Canapari, Yale Pediatric Sleep Center' },
      { t0: at('s3') + 0.2, t1: R3(1), y: 290, lines: [[50, ['เกิดจากอะไร?', '#fff', 600]], [60, ['① ไม่อยากแยกจากพ่อแม่', '#ffd35e']], [44, ['นอน = ต้องห่างกัน กลัวพลาดเรื่องสนุก', '#fff', 600]]] },
      { t0: R3(1) + 0.02, t1: R3(2), y: 290, lines: [[60, ['② อยากคุมเอง ตามวัย', '#ffd35e']], [46, ['ขอแล้วได้ผล ก็เลยขอต่อ', '#fff', 600]]] },
      { t0: R3(2) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[60, ['③ ร่างกายยังไม่ง่วง', '#ffd35e']], [44, ['งีบบ่ายดึกไป หรือง่วงเกินจนตาสว่าง', '#fff', 600]]] },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[60, ['เกา ลูบ = ช่วยให้ลูกสงบ', '#ffd35e']], [48, ['ไม่ใช่นิสัยเสีย ทำได้', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[54, ['แต่ถ้าต้องมีจนหลับ ทุกคืน', '#fff']], [48, ['ตื่นกลางดึก ก็จะเรียกหาอีก', '#ffd35e']], [42, ['ลองกำหนด: เกา 2 นาที แล้วบอกฝันดี', '#ffe3ea', 600]]], foot: 'พ่อแม่อยู่ด้วยตอนหลับ สัมพันธ์กับตื่นกลางดึกมากขึ้น (Mindell 2009)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[60, ['หิวนม หิวน้ำ ก่อนนอน', '#fff']], [48, ['นม: ให้ดื่มก่อนแปรงฟัน', '#ffd35e']]] },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[56, ['แปรงฟันแล้ว เหลือแค่น้ำเปล่า', '#fff']], [46, ['ไม่ถือขวดนมเข้านอน เสี่ยงฟันผุ', '#ffe3ea', 600]]], foot: 'ที่มา: AAP (HealthyChildren.org)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.42), y: 290, lines: [[60, ['วิจัยแม่ ', '#fff'], [(t) => Math.round(10085 * U.easeOut(U.clamp((t - at('s7') - 0.3) / 1.3))).toLocaleString('en-US'), '#ffd35e'], [' คน', '#fff']], [48, ['14 ประเทศ รวมถึงไทย', '#fff', 600]]], foot: 'ที่มา: Mindell et al., Sleep 2015' },
      { t0: SP('s7', 0.42) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[54, ['ทำกิจวัตรก่อนนอนทุกคืน', '#fff']], [54, ['นอนนานกว่าไม่เคยทำ กว่า 1 ชม.', '#ffd35e']]], foot: 'Mindell 2015 · พบความเชื่อมโยง (ขั้นบันไดแสดงแนวโน้ม)' },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[58, ['ทางแก้ 1: กิจวัตรเดิมทุกคืน', '#ffd35e']], [44, ['อาบน้ำ → แปรงฟัน → นิทาน → ปิดไฟ', '#fff', 600]]] },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[58, ['ตอบคำขอ "ล่วงหน้า"', '#fff']], [46, ['ใส่ไว้ในกิจวัตรเลย ก่อนปิดไฟ', '#ffe3ea', 600]]] },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.52), y: 290, lines: [[56, ['ทางแก้ 2: บัตรผ่านก่อนนอน', '#ffd35e']], [46, ['1 ใบ แลกได้ 1 อย่าง ใช้แล้วหมด', '#fff', 600]]], foot: 'Bedtime Pass: Friman 1999, Freeman 2006 · เหมาะกับ 3 ขวบขึ้นไป' },
      { t0: SP('s9', 0.52) + 0.02, t1: end('s9') - 0.05, y: 290, lines: [[56, ['คำขอถัดไป ตอบสั้นๆ เรียบๆ', '#fff']], [46, ['แล้วพากลับเตียง ไม่ต่อรอง', '#ffe3ea', 600]]] },
      { t0: at('s10') + 0.2, t1: end('s10') - 0.05, y: 250, lines: [[58, ['5 ทิป เข้านอนไม่ยืดเยื้อ', '#ffd35e']]] },
      { t0: at('s11') + 0.2, t1: end('s11'), y: 290, lines: [[60, ['ลูกไม่ได้แกล้ง', '#fff']], [56, ['แค่อยากอยู่กับเราอีกนิด', '#ffd35e']], [40, ['ลูกคุณขออะไรก่อนนอน แปลกสุด? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: Mindell 2015, Friman 1999, AAP, AASM' },
    ],
    trans,
    audio: [
      [0.5, 'tick'], [1.0, 'tick'], [1.5, 'boing'],
      [at('s1') + 0.3, 'snore'], ...REQ.map((r, i) => [rqT(i), i % 2 ? 'pop' : 'boing']), [P('s1', 0.95), 'thud'],
      [at('s2') + 0.4, 'whoosh'], [at('s2') + 1.0, 'ding'], [P('s2', 0.3), 'giggle'], [SP('s2', 0.5), 'warn'],
      [at('s3') + 0.4, 'heart'], [R3(1), 'boing'], [R3(1) + 0.5, 'twinkle'], [R3(2), 'boing'], [R3(2) + 0.5, 'ding'],
      [at('s4') + 0.5, 'pop'], [P('s4', 0.3), 'shimmer'], [SP('s4', 0.5), 'pop'],
      [at('s5') + 0.5, 'boing'], [P('s5', 0.2), 'bubble'], [SP('s5', 0.5) + 0.2, 'warn'], [SP('s5', 0.5) + 0.6, 'ding'],
      [at('s6') + 0.3, 'heartbeat'], [TM('s6', 0, 0.1), 'tick'], [TM('s6', 1, 0.2), 'tick'], [TM('s6', 2, 0.3), 'tick'], [TM('s6', 3, 0.4), 'tick'], [TM('s6', 4, 0.5), 'tick'], [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.4, 'riser'], [SP('s7', 0.42), 'pop'], [SP('s7', 0.42) + 0.3, 'tick'], [SP('s7', 0.42) + 0.6, 'tick'], [SP('s7', 0.42) + 0.9, 'tick'], [SP('s7', 0.42) + 1.2, 'tick'], [P('s7', 0.9), 'twinkle'],
      [at('s8') + 0.3, 'twinkle'], [SP('s8', 0.5), 'pop'], ...[0, 1, 2, 3, 4].map((i) => [C8(i), 'ding']), [P('s8', 0.6), 'giggle'],
      [at('s9') + 0.4, 'shimmer'], [at('s9') + 0.9, 'pop'], [SP('s9', 0.52), 'ding'], [SP('s9', 0.52) + 0.5, 'pop'],
      [TM('s10', 0, 0.1), 'ding'], [TM('s10', 1, 0.27), 'tick'], [TM('s10', 2, 0.44), 'tick'], [TM('s10', 3, 0.61), 'tick'], [TM('s10', 4, 0.78), 'tick'],
      [at('s11') + 0.3, 'twinkle'], [at('s11') + 1.2, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s4'), CK.MUSIC.OOPS), CK.musicBed(at('s4'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s11'), CK.MUSIC.CUTE), CK.musicBed(at('s11'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
