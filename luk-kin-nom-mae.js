/* พ่อแม่หัวจะปวด — ลูกกินนมแม่ถึงกี่ขวบ (WHO/AAP timeline, พลังงานปีที่ 2, ลูกได้-แม่ได้, MICS 28.6%, ปั๊มน้อย≠นมน้อย, เช็กว่าพอ, พบแพทย์, ดูดบ่อย, สายนมชง/นมผสม, 5 ทิป)
   Build: node build.js luk-kin-nom-mae.js review-luk-kin-nom-mae.html --kit clay --title "ลูกกินนมแม่ถึงกี่ขวบดี?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 7.5], ['s2', 6.5], ['s3', 7.5], ['s4', 6], ['s5', 7.5], ['s6', 8], ['s7', 7], ['s8', 7.5], ['s9', 7.5], ['s10', 8.5], ['s11', 8], ['s12', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, RT = REEL ? 1.0 : 0, RW = (a, b) => REEL ? b : a;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's12'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* stages: 0 home, 60 timeline steps, 120 energy jars, 180 gut, 240 milk factory, 300 kitchen (formula), -60 back to work, -120 night, -180 clinic */
  const TOPH = 1.15, KZH = -1.45;
  const AX = 60, BX = 120, CX = 180, EX = 240, HX = 300, DX = -60, FX = -120, GX = -180;
  const SH = {
    cover: [[0, FW(0.15, 0, 5.6, 3.9 - RT * 0.9, 0.18)], [1, FW(0.15, 0, 5.3, 3.9 - RT * 0.9, 0.18)]],
    s1: [[0, FW(AX, 0.4, RW(9.0, 10.6), 3.5 - RT, 0.14)], [1, FW(AX, 0.4, RW(8.7, 10.3), 3.5 - RT, 0.14)]],
    s2: [[0, FW(BX, 0.3, RW(8.6, 9.9), 3.3 - RT, 0.12)], [1, FW(BX, 0.3, RW(8.3, 9.6), 3.3 - RT, 0.12)]],
    s3: [[0, FW(CX - 0.6, 0, RW(10.6, 12.2), 3.5 - RT * 0.6, 0.1)], [1, FW(CX - 0.6, 0, RW(10.3, 11.9), 3.5 - RT * 0.6, 0.1)]],
    s4: [[0, FW(0, 0.3, 5.4, 3.95, 0.2)], [1, FW(0, 0.3, 5.1, 3.95, 0.2)]],
    s5: [[0, FW(DX + RT * 0.2, 0.2, RW(6.9, 8.0), 3.95, 0.16)], [1, FW(DX - 0.1 + RT * 0.2, 0.2, RW(6.7, 7.8), 3.95, 0.16)]],
    s6: [[0, FW(EX + 0.3, 0, 7.4, 3.7 - RT * 0.6, 0.12)], [1, FW(EX + 0.3, 0, 7.1, 3.7 - RT * 0.6, 0.12)]],
    s7: [[0, FW(0, 0.6, RW(6.6, 7.6), 3.9 - RT, 0.24)], [1, FW(0, 0.6, RW(6.3, 7.3), 3.9 - RT, 0.24)]],
    s8: REEL ? [[0, FW(FX + 0.4, 0.4, 7.6, 4.0, 0.16)], [1, FW(FX + 0.4, 0.4, 7.3, 4.0, 0.16)]] : [[0, FW(FX + 0.4, 0.4, 6.2, 5.4, 0.16)], [1, FW(FX + 0.4, 0.4, 6.0, 5.4, 0.16)]],
    s9: [[0, FW(GX + 0.3, 0.2, 6.4, 3.95, 0.16)], [1, FW(GX + 0.3, 0.2, 6.1, 3.95, 0.16)]],
    s10: [[0, FW(HX - 0.9, 0.3, 5.0, 3.95, 0.2)], ['sp-', FW(HX - 0.9, 0.3, 4.8, 3.95, 0.2)], ['sp+', FW(HX + 1.75, -1.6, RW(4.6, 5.3), 2.6, 0.2)], [1, FW(HX + 1.75, -1.6, RW(4.4, 5.1), 2.6, 0.2)]],
    s11: REEL ? [[0, FW(0.3, 0.2, 7.4, 4.0, 0.2)], [1, FW(0.3, 0.2, 7.1, 4.0, 0.2)]] : [[0, FW(0.3, 0.2, 6.2, 5.3, 0.2)], [1, FW(0.3, 0.2, 6.0, 5.3, 0.2)]],
    s12: REEL ? [[0, { pos: [0, 5.8, 29], look: [0, 2.3, 0], fov: 29 }], [1, { pos: [0, 5.6, 28], look: [0, 2.3, 0], fov: 29 }]] : [[0, { pos: [0, 6.6, 26], look: [0, 3.0, 0], fov: 29 }], [1, { pos: [0, 6.3, 24.5], look: [0, 3.0, 0], fov: 29 }]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { let tt; if (f === 'sp-') tt = SP(id, 0.5) - 0.35; else if (f === 'sp+') tt = SP(id, 0.5) + 0.3; else tt = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t: tt }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s8') - 0.2) / 0.6) * U.clamp((end('s8') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const t = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  /* supporting cast (fruit names): แม่แตงโม (formula/mixed feeding) + baby มะเฟือง, พยาบาลพุทรา */
  const CAST = {
    tangmo: () => CK.chibi(T, { hairStyle: 'bob', hair: '#3b2a24', top: '#ff6f7d', collar: '#4fbf7a', bottom: '#2f8f6a', skin: CK.pal.skin[1], lashes: true, longSleeve: true, scale: 1.3 }),
    mafueang: (sc) => CK.chibi(T, { bangs: 'baby', capLen: 1.05, backLen: 1.55, hair: '#3a2a22', ahoge: true, top: '#ffe066', bottom: '#ffe066', shoes: '#ffe066', round: true, eyeScale: 1.08, longSleeve: true, scale: sc }),
    nurse: () => CK.chibi(T, { hairStyle: 'bob', hair: '#2b2b33', top: '#ffffff', collar: '#5ab8ff', bottom: '#7fd0c0', skin: CK.pal.skin[0], lashes: true, longSleeve: true, scale: 1.32 }),
  };

  VE.run({
    DUR, file: 'luk-kin-nom-mae', title: 'ลูกกินนมแม่ถึงกี่ขวบดี?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกวัยทารก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const prep = (g) => { g.userData.base = g.scale.x; g.rotation.order = 'YXZ'; scene.add(g); return g; };
      const hideLegs = (g) => g.children.forEach((m) => { if (!m.isMesh) return; const ty = m.geometry.type, ax = Math.abs(m.position.x); if ((ty === 'CylinderGeometry' && Math.abs(ax - 0.17) < 0.01) || (ty === 'SphereGeometry' && Math.abs(ax - 0.18) < 0.01 && m.position.y < 0.1)) m.visible = false; });
      const babyIn = (parent, g, sc) => { g.scale.setScalar(sc / parent.scale.x); parent.add(g); return g; };

      /* props */
      const bottle = (lvl, sc) => {
        const g = new T.Group();
        const glass = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.62, 20), M('#ffffff', { transparent: true, opacity: 0.42 })); glass.position.y = 0.31; g.add(glass);
        const mg = new T.CylinderGeometry(0.182, 0.182, 0.6, 20); mg.translate(0, 0.3, 0);
        const milk = new T.Mesh(mg, M('#fff0c4', { emissive: '#ffe9b8', emissiveIntensity: 0.2 })); milk.position.y = 0.01; milk.scale.y = lvl; g.add(milk);
        const ring = new T.Mesh(new T.CylinderGeometry(0.225, 0.225, 0.11, 20), M('#ff8fab')); ring.position.y = 0.66; g.add(ring);
        const nip = new T.Mesh(new T.SphereGeometry(0.13, 16, 12), M('#ffd9a0')); nip.scale.set(1, 1.4, 1); nip.position.y = 0.8; g.add(nip);
        for (let i = 0; i < 3; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.08, 0.018, 0.02), M('#ff8fab')); tk.position.set(-0.1, 0.15 + i * 0.15, 0.2); g.add(tk); }
        g.userData.milk = milk; g.scale.setScalar(sc || 1); return g;
      };
      const drop = (sc) => {
        const g = new T.Group(), m = M('#fffaf0', { emissive: '#fff1dc', emissiveIntensity: 0.25 });
        g.add(new T.Mesh(new T.SphereGeometry(0.5, 24, 18), m));
        const c = new T.Mesh(new T.ConeGeometry(0.43, 0.62, 24), m); c.position.y = 0.5; g.add(c);
        for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.065, 10, 8), M('#3a2f3f')); e.position.set(s * 0.16, 0.06, 0.47); g.add(e); const ch = new T.Mesh(new T.SphereGeometry(0.075, 10, 8), M('#ffb3c6')); ch.scale.set(1, 0.6, 0.4); ch.position.set(s * 0.29, -0.07, 0.43); g.add(ch); }
        const sm = new T.Mesh(new T.TorusGeometry(0.07, 0.022, 6, 12, PI), M('#3a2f3f')); sm.rotation.z = PI; sm.position.set(0, -0.06, 0.49); g.add(sm);
        g.scale.setScalar(sc || 1); return g;
      };
      const bowl = (col, sc) => {
        const g = new T.Group(); g.add(new T.Mesh(new T.SphereGeometry(0.4, 20, 12, 0, PI * 2, PI / 2, PI / 2), M(col || '#5ab8ff', { side: T.DoubleSide })));
        const f = new T.Mesh(new T.CylinderGeometry(0.37, 0.37, 0.04, 20), M('#ffcf6a')); f.position.y = -0.04; g.add(f);
        for (const [x, z, c] of [[-0.12, 0.05, '#ff7a5c'], [0.1, -0.08, '#79dcb4'], [0.05, 0.14, '#ff7a5c']]) { const b = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M(c)); b.position.set(x, 0.0, z); g.add(b); }
        const sp = new T.Mesh(new T.BoxGeometry(0.06, 0.04, 0.55), M('#ffffff')); sp.position.set(0.18, 0.12, 0.02); sp.rotation.x = -0.7; g.add(sp);
        g.scale.setScalar(sc || 1); return g;
      };
      const hs = new T.Shape(); hs.moveTo(0, -0.35); hs.bezierCurveTo(-0.6, 0.05, -0.35, 0.55, 0, 0.25); hs.bezierCurveTo(0.35, 0.55, 0.6, 0.05, 0, -0.35);
      const heartGeo = new T.ExtrudeGeometry(hs, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 }); heartGeo.center();
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(heartGeo, M(i % 3 === 2 ? '#ffc94d' : '#ff6f91')); h.userData.s = [Math.sin(i * 7.1), (i * 0.37) % 1, Math.cos(i * 3.3)]; h.visible = false; scene.add(h); hearts.push(h); }
      const plat = (x, w, col, wallCol) => { const p = new T.Mesh(new T.BoxGeometry(w, 0.3, 12), M(col)); p.position.set(x, -0.15, 0); scene.add(p); const bw = new T.Mesh(new T.BoxGeometry(w, 10, 0.3), M('#ffffff', { map: dots(wallCol, '#ffffff', [w / 2.4, 4]) })); bw.position.set(x, 4.6, -4.5); scene.add(bw); };

      /* ===== stage 0: home (x = 0) ===== */
      const room = CK.room(T, { wall: '#ffd6e6', dots: 'rgba(255,255,255,0.8)', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', props: false, winX: 3.0, curtain: '#ffb3c6' }); scene.add(room);
      const chair = new T.Group(), cm = M('#b9a4f0');
      const seat = new T.Mesh(new T.BoxGeometry(1.9, 0.5, 1.3), cm); seat.position.y = 0.25; const back = new T.Mesh(new T.BoxGeometry(1.9, 1.4, 0.35), cm); back.position.set(0, 0.95, -0.55);
      chair.add(seat, back); for (const s of [-1, 1]) { const a = new T.Mesh(new T.BoxGeometry(0.32, 0.85, 1.3), M('#a48ce8')); a.position.set(s * 1.05, 0.42, 0); chair.add(a); }
      chair.position.set(-0.8, 0, -0.95); scene.add(chair);
      const table = new T.Group(); const tl = new T.Mesh(new T.CylinderGeometry(0.12, 0.16, 0.8, 14), M('#ffffff')); tl.position.y = 0.4; const tt = new T.Mesh(new T.CylinderGeometry(0.55, 0.55, 0.08, 24), M('#ff9e6e')); tt.position.y = 0.84; table.add(tl, tt);
      const pump = new T.Mesh(new T.BoxGeometry(0.62, 0.42, 0.42), M('#8fd3ff')); pump.position.set(0, 1.1, 0); const dial = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.05, 16), M('#ffffff')); dial.rotation.x = PI / 2; dial.position.set(0.1, 1.12, 0.22); const led = new T.Mesh(new T.SphereGeometry(0.04, 8, 6), M('#5fd38d', { emissive: '#5fd38d', emissiveIntensity: 0.8 })); led.position.set(-0.15, 1.18, 0.22);
      table.add(pump, dial, led); table.position.set(-2.55, 0, -0.9); scene.add(table);
      const R = {}; for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) R[k] = prep(CK.family(T, k));
      const Rcw = babyIn(R.mom, CK.family(T, 'wawa'), 0.58); /* cradled */
      const Rhw = babyIn(R.dad, CK.family(T, 'wawa'), 0.62); hideLegs(Rhw); /* on dad's hip */
      const pumpBottle = bottle(0.12, 1.35); scene.add(pumpBottle);
      const diapers = []; for (let i = 0; i < 6; i++) { const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(0.6, 0.44, 0.16), M('#ffffff')); g.add(b); const band = new T.Mesh(new T.BoxGeometry(0.62, 0.09, 0.17), M('#8fd3ff')); band.position.y = 0.18; g.add(band); const d = new T.Mesh(new T.SphereGeometry(0.08, 12, 10), M('#3fa0ff')); d.scale.set(1, 1.25, 0.5); d.position.set(0, -0.03, 0.09); g.add(d); g.visible = false; scene.add(g); diapers.push(g); }
      const cup = new T.Mesh(new T.CylinderGeometry(0.15, 0.12, 0.3, 16), M('#79dcb4')); cup.visible = false; scene.add(cup);

      /* ===== stage A: timeline steps (x = 60) ===== */
      plat(AX, 16, '#ff9ebd', '#ffe0ec');
      const STX = [AX - 3.5, AX, AX + 3.5], STH = [0.3, 0.65, 1.0], STC = ['#ffd23f', '#79dcb4', '#5ab8ff'];
      const steps = STX.map((x, i) => { const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(3.3, STH[i], 2.6), M(STC[i])); b.position.y = STH[i] / 2; const tp = new T.Mesh(new T.BoxGeometry(3.36, 0.08, 2.66), M('#ffffff')); tp.position.y = STH[i] + 0.02; g.add(b, tp); g.position.set(x, 0, 0.3); scene.add(g); return g; });
      const basket = new T.Group(); const bk = new T.Mesh(new T.CylinderGeometry(0.8, 0.65, 0.42, 24), M('#e9a86a')); bk.scale.z = 0.62; bk.position.y = 0.21; const bl = new T.Mesh(new T.CylinderGeometry(0.72, 0.72, 0.06, 24), M('#ffb3c6')); bl.scale.z = 0.6; bl.position.y = 0.4; basket.add(bk, bl); basket.position.set(STX[0], STH[0], 0.45); scene.add(basket);
      const A = { nb: prep(CK.family(T, 'wawa', { scale: 0.55 })), wawa: prep(CK.family(T, 'wawa')), nana: prep(CK.family(T, 'nana')) };
      const aBowl = bowl('#5ab8ff', 0.75); scene.add(aBowl); const aBowl2 = bowl('#ff8fab', 0.85); scene.add(aBowl2);
      const aDrops = [drop(0.5), drop(0.42), drop(0.34)]; aDrops.forEach((d) => scene.add(d));

      /* ===== stage B: energy jars (x = 120) ===== */
      plat(BX, 14, '#7fc4f5', '#e0f1ff');
      const jar = (x) => {
        const g = new T.Group(), H = 2.5, R0 = 0.92;
        const glass = new T.Mesh(new T.CylinderGeometry(R0, R0, H, 32, 1, true), M('#ffffff', { transparent: true, opacity: 0.26, side: T.DoubleSide, depthWrite: false })); glass.position.y = H / 2 + 0.12; glass.renderOrder = 3;
        const base = new T.Mesh(new T.CylinderGeometry(R0 + 0.06, R0 + 0.06, 0.14, 32), M('#ff8fab')); base.position.y = 0.07;
        const rim = new T.Mesh(new T.TorusGeometry(R0, 0.06, 10, 40), M('#ffffff')); rim.rotation.x = PI / 2; rim.position.y = H + 0.12;
        const fg = new T.CylinderGeometry(R0 - 0.06, R0 - 0.06, 1, 32); fg.translate(0, 0.5, 0);
        const milk = new T.Mesh(fg, M('#fffaf0', { emissive: '#fff1dc', emissiveIntensity: 0.3 })); milk.position.y = 0.14;
        const food = new T.Mesh(fg, M('#ffa94d')); food.position.y = 0.14;
        g.add(base, milk, food, glass, rim); g.position.set(x, 0, 0.2); scene.add(g); return { g, milk, food, H };
      };
      const jars = [jar(BX - 1.45), jar(BX + 1.45)];
      const Bc = { wawa: prep(CK.family(T, 'wawa')), nana: prep(CK.family(T, 'nana')) };

      /* ===== stage C: gut + antibodies (x = 180) ===== */
      plat(CX, 18, '#b9a4f0', '#efe8ff');
      const gut = CK.tube(T, 1.25, 7.6, '#ff9ebd'); gut.material.transparent = true; gut.material.opacity = 0.42; gut.material.depthWrite = false; gut.rotation.z = PI / 2; gut.position.set(CX, 1.9, 0); gut.renderOrder = 4; scene.add(gut);
      const gutBack = new T.Mesh(new T.PlaneGeometry(7.6, 2.4), M('#ffc4d6')); gutBack.position.set(CX, 1.9, -1.0); scene.add(gutBack);
      for (const s of [-1, 1]) { const rg = new T.Mesh(new T.TorusGeometry(1.25, 0.08, 10, 40), M('#ff6f91')); rg.rotation.y = PI / 2; rg.position.set(CX + s * 3.8, 1.9, 0); scene.add(rg); }
      const shields = []; for (let i = 0; i < 16; i++) {
        const g = new T.Group(), m = M('#ffd23f', { emissive: '#ffb020', emissiveIntensity: 0.3 });
        const st = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.3, 8), m); st.position.y = 0.15; g.add(st);
        for (const s of [-1, 1]) { const a = new T.Mesh(new T.CylinderGeometry(0.045, 0.045, 0.26, 8), m); a.position.set(s * 0.09, 0.38, 0); a.rotation.z = -s * 0.65; g.add(a); const tip = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), m); tip.position.set(s * 0.17, 0.48, 0); g.add(tip); }
        const a = -0.25 - (i % 4) * 0.62, x = CX - 3.3 + Math.floor(i / 4) * 2.1 + (i % 2) * 0.6;
        g.position.set(x, 1.9 + 1.12 * Math.cos(a), Math.min(-0.2, 1.12 * Math.sin(a))); g.rotation.x = a + PI; g.scale.setScalar(0.01); scene.add(g); shields.push(g);
      }
      const viruses = []; for (let i = 0; i < 4; i++) { const v = CK.virus(T, { color: ['#9b7bff', '#7cc96a', '#ff7a5c', '#5fb3ff'][i] }); v.scale.setScalar(0.62); scene.add(v); viruses.push(v); }
      const flow = []; for (let i = 0; i < 4; i++) { const d = drop(0.26); scene.add(d); flow.push(d); }
      const mascot = drop(0.8); mascot.position.set(CX - 4.75, 0.62, 0.9); scene.add(mascot);

      /* ===== stage D: back to work (x = -60) ===== */
      const roomD = CK.room(T, { wall: '#ffe0b8', dots: 'rgba(255,255,255,0.8)', wain: '#ffb3c6', floor: '#e9b483', rug: '#79dcb4', props: false, winX: 2.8 }); roomD.position.x = DX; scene.add(roomD);
      const door = new T.Group(); const dr = new T.Mesh(new T.BoxGeometry(1.7, 3.3, 0.14), M('#ff9e6e')); dr.position.y = 1.65; door.add(dr); const kn = new T.Mesh(new T.SphereGeometry(0.1, 12, 10), M('#ffd23f')); kn.position.set(0.6, 1.6, 0.1); door.add(kn); door.position.set(DX - 3.2, 0, -4.3); scene.add(door);
      const calT = ctex(256, 256, (x) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ff6f91'; x.fillRect(0, 0, 256, 64); x.fillStyle = '#e0e4ee'; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) x.fillRect(16 + c * 39, 82 + r * 42, 30, 30); x.strokeStyle = '#ff3b5c'; x.lineWidth = 8; x.beginPath(); x.arc(16 + 4 * 39 + 15, 82 + 3 * 42 + 15, 26, 0, 7); x.stroke(); });
      const cal = new T.Mesh(new T.BoxGeometry(1.1, 1.1, 0.06), M('#ffffff', { map: calT })); cal.position.set(DX + 0.4, 3.0, -4.3); scene.add(cal);
      const D = { mom: prep(CK.family(T, 'mom')), dad: prep(CK.family(T, 'dad')) };
      const Dhw = babyIn(D.dad, CK.family(T, 'wawa'), 0.62); hideLegs(Dhw);
      const brief = new T.Group(); const bb = new T.Mesh(new T.BoxGeometry(0.75, 0.5, 0.22), M('#4a5fb8')); brief.add(bb); const bh = new T.Mesh(new T.TorusGeometry(0.13, 0.035, 8, 16, PI), M('#2f3d80')); bh.position.y = 0.25; brief.add(bh); const bc = new T.Mesh(new T.BoxGeometry(0.12, 0.08, 0.24), M('#ffd23f')); bc.position.y = 0.12; brief.add(bc); scene.add(brief);

      /* ===== stage E: milk factory (x = 240) ===== */
      plat(EX, 16, '#ffc75e', '#fff3d6');
      const fac = new T.Group(); fac.position.set(EX + 0.9, 0, 0); scene.add(fac);
      const fb = new T.Mesh(new T.BoxGeometry(2.6, 1.9, 1.7), M('#ff8fab')); fb.position.y = 0.95; fac.add(fb);
      const roof = new T.Mesh(new T.ConeGeometry(1.95, 0.9, 4), M('#ff5f8a')); roof.rotation.y = PI / 4; roof.scale.z = 0.72; roof.position.y = 2.33; fac.add(roof);
      const chim = new T.Mesh(new T.CylinderGeometry(0.2, 0.22, 0.8, 16), M('#ffd23f')); chim.position.set(0.75, 2.5, -0.25); fac.add(chim);
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.11, 12, 10), M('#3a2f3f')); e.position.set(0.55 + s * 0.28, 1.45, 0.86); fac.add(e); const ch = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M('#ffc4d6')); ch.scale.set(1, 0.6, 0.3); ch.position.set(0.55 + s * 0.5, 1.25, 0.86); fac.add(ch); }
      const fsm = new T.Mesh(new T.TorusGeometry(0.14, 0.035, 6, 14, PI), M('#3a2f3f')); fsm.rotation.z = PI; fsm.position.set(0.55, 1.3, 0.87); fac.add(fsm);
      const gear = new T.Group(); const gm = M('#ffd23f'); const gd = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.14, 24), gm); gd.rotation.x = PI / 2; gear.add(gd); for (let i = 0; i < 10; i++) { const tth = new T.Mesh(new T.BoxGeometry(0.16, 0.22, 0.14), gm); const a = i / 10 * PI * 2; tth.position.set(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0); tth.rotation.z = a; gear.add(tth); } const hub = new T.Mesh(new T.SphereGeometry(0.13, 12, 10), M('#ff6f91')); hub.position.z = 0.08; gear.add(hub);
      gear.position.set(-0.55, 1.0, 0.88); fac.add(gear);
      const spout = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.6, 14), M('#ffffff')); spout.rotation.z = PI / 2; spout.position.set(1.55, 0.95, 0.35); fac.add(spout);
      const puffs = []; for (let i = 0; i < 4; i++) { const p = new T.Mesh(new T.SphereGeometry(0.2, 12, 10), M('#ffffff', { transparent: true, opacity: 0.9 })); scene.add(p); puffs.push(p); }
      const fBottle = bottle(0.15, 1.5); fBottle.position.set(EX + 2.75, 0, 0.35); scene.add(fBottle);
      const fdrops = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#fffaf0', { emissive: '#fff1dc', emissiveIntensity: 0.3 })); d.scale.y = 1.3; scene.add(d); fdrops.push(d); }
      const pulses = []; for (let i = 0; i < 8; i++) { const h = new T.Mesh(heartGeo, M('#ff6f91', { emissive: '#ff6f91', emissiveIntensity: 0.25 })); h.scale.setScalar(0.45); scene.add(h); pulses.push(h); }
      const E = { wawa: prep(CK.family(T, 'wawa')) };

      /* ===== stage F: night (x = -120) ===== */
      const roomF = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: 2.4 }); roomF.position.x = FX; scene.add(roomF);
      roomF.userData.win.material.map = nightTex();
      const crib = new T.Group(); const cb = new T.Mesh(new T.BoxGeometry(2.2, 0.15, 1.2), M('#ffffff')); cb.position.y = 0.7; crib.add(cb); for (let i = 0; i < 9; i++) { const bar = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.75, 8), M('#ffffff')); bar.position.set(-1.05 + i * 0.2625, 1.15, 0.58); crib.add(bar); } const rail = new T.Mesh(new T.BoxGeometry(2.25, 0.08, 0.08), M('#ffb3c6')); rail.position.set(0, 1.52, 0.58); crib.add(rail); for (const s of [-1, 1]) { const lg = new T.Mesh(new T.BoxGeometry(0.12, 1.55, 0.12), M('#ffb3c6')); lg.position.set(s * 1.1, 0.78, 0.58); crib.add(lg); const lg2 = lg.clone(); lg2.position.z = -0.58; crib.add(lg2); }
      crib.position.set(FX - 2.0, 0, -2.4); scene.add(crib);
      const F = { mom: prep(CK.family(T, 'mom')) }; const Fcw = babyIn(F.mom, CK.family(T, 'wawa'), 0.58);

      /* ===== stage G: clinic (x = -180) ===== */
      const roomG = CK.room(T, { wall: '#c8f0e0', dots: 'rgba(255,255,255,0.85)', wain: '#5ab8ff', floor: '#e9b483', rug: '#ff8fb0', props: false, winX: 3.3 }); roomG.position.x = GX; scene.add(roomG);
      const posT = ctex(256, 320, (x) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, 256, 320); x.fillStyle = '#ff8fab'; x.beginPath(); x.moveTo(128, 250); x.bezierCurveTo(20, 170, 40, 60, 128, 110); x.bezierCurveTo(216, 60, 236, 170, 128, 250); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 170, 34, 0, 7); x.fill(); x.beginPath(); x.moveTo(128, 112); x.lineTo(104, 160); x.lineTo(152, 160); x.fill(); });
      const poster = new T.Mesh(new T.BoxGeometry(1.2, 1.5, 0.05), M('#ffffff', { map: posT })); poster.position.set(GX - 1.0, 3.2, -4.3); scene.add(poster);
      const bench = new T.Mesh(new T.BoxGeometry(2.0, 0.5, 1.0), M('#ff9ec0')); bench.position.set(GX - 1.0, 0.25, -0.75); scene.add(bench);
      const G = { mom: prep(CK.family(T, 'mom')), nurse: prep(CAST.nurse()) }; const Gcw = babyIn(G.mom, CK.family(T, 'wawa', { paci: false }), 0.58);

      /* ===== stage H: kitchen, formula (x = 300) ===== */
      const roomH = CK.room(T, { wall: '#d9ecff', dots: 'rgba(255,255,255,0.85)', wain: '#ffd27a', floor: '#e9b483', rug: '#ff8fb0', props: false, winX: -2.6 }); roomH.position.x = HX; scene.add(roomH);
      const counter = new T.Group(); const ct = new T.Mesh(new T.BoxGeometry(3.8, 1.05, 1.1), M('#ffffff')); ct.position.y = 0.525; const ctop = new T.Mesh(new T.BoxGeometry(3.9, 0.1, 1.2), M('#ff9ebd')); ctop.position.y = 1.1; counter.add(ct, ctop); for (let i = 0; i < 3; i++) { const kb = new T.Mesh(new T.BoxGeometry(0.3, 0.05, 0.05), M('#5ab8ff')); kb.position.set(-1.2 + i * 1.2, 0.8, 0.57); counter.add(kb); } counter.position.set(HX + 1.75, 0, -1.6); scene.add(counter);
      const TOP = 1.15, KZ = -1.45;
      const kettle = new T.Group(); const kb2 = new T.Mesh(new T.SphereGeometry(0.4, 20, 16), M('#5ab8ff')); kb2.scale.set(1, 0.85, 1); kb2.position.y = 0.34; const ksp = new T.Mesh(new T.ConeGeometry(0.1, 0.42, 12), M('#5ab8ff')); ksp.position.set(0.42, 0.45, 0); ksp.rotation.z = -1.0; const klid = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#ffffff')); klid.position.y = 0.7; const khd = new T.Mesh(new T.TorusGeometry(0.22, 0.05, 8, 16, PI), M('#2f6fbf')); khd.position.set(-0.05, 0.62, 0); kettle.add(kb2, ksp, klid, khd); kettle.position.set(HX + 0.3, TOP, KZ); scene.add(kettle);
      const steam = []; for (let i = 0; i < 4; i++) { const p = new T.Mesh(new T.SphereGeometry(0.13, 10, 8), M('#ffffff', { transparent: true, opacity: 0.85 })); scene.add(p); steam.push(p); }
      const thermo = new T.Group(); const tg = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.8, 12), M('#ffffff')); tg.position.y = 0.5; const tbulb = new T.Mesh(new T.SphereGeometry(0.1, 12, 10), M('#ff3b5c')); tbulb.position.y = 0.1; const tcol = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.55, 8), M('#ff3b5c')); tcol.position.set(0, 0.4, 0.03); thermo.add(tg, tbulb, tcol); thermo.position.set(HX + 0.95, TOP, KZ); scene.add(thermo);
      const hBottle = bottle(0.55, 1.05); hBottle.position.set(HX + 1.55, TOP, KZ); scene.add(hBottle);
      const can = new T.Group(); const cn = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.62, 20), M('#fff4e6')); cn.position.y = 0.31; const cbnd = new T.Mesh(new T.CylinderGeometry(0.305, 0.305, 0.16, 20), M('#5ab8ff')); cbnd.position.y = 0.32; const clid = new T.Mesh(new T.CylinderGeometry(0.31, 0.31, 0.06, 20), M('#ffd23f')); clid.position.y = 0.64; can.add(cn, cbnd, clid); can.position.set(HX + 2.35, TOP, KZ); scene.add(can);
      const scoop = new T.Group(); const sc1 = new T.Mesh(new T.CylinderGeometry(0.1, 0.08, 0.1, 12), M('#ffffff')); const sc2 = new T.Mesh(new T.BoxGeometry(0.3, 0.03, 0.05), M('#ffffff')); sc2.position.x = 0.18; scoop.add(sc1, sc2); scoop.position.set(HX + 2.8, TOP + 0.06, KZ + 0.3); scene.add(scoop);
      const hg = new T.Group(); const hgm = M('#ffd23f'); for (const s of [-1, 1]) { const c = new T.Mesh(new T.ConeGeometry(0.2, 0.3, 16), M('#ffffff', { transparent: true, opacity: 0.6 })); c.position.y = 0.4 + s * 0.15; c.rotation.z = s > 0 ? 0 : PI; hg.add(c); const p = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.05, 16), M('#c98a5a')); p.position.y = 0.4 + s * 0.33; hg.add(p); }
      const sandT = new T.Mesh(new T.ConeGeometry(0.15, 0.2, 14), hgm); sandT.position.y = 0.48; sandT.rotation.z = PI; const sandB = new T.Mesh(new T.ConeGeometry(0.16, 0.16, 14), hgm); sandB.position.y = 0.16; hg.add(sandT, sandB); hg.position.set(HX + 3.25, TOP, KZ); scene.add(hg);
      const H = { tm: prep(CAST.tangmo()) }; const Hmf = babyIn(H.tm, CAST.mafueang(1), 0.58); const tmBottle = bottle(0.6, 0.62); H.tm.add(tmBottle);

      return { key, hemi, room, chair, R, Rcw, Rhw, pumpBottle, diapers, cup, steps, basket, A, aBowl, aBowl2, aDrops, jars, Bc, shields, viruses, flow, mascot, roomD, D, Dhw, brief, gear, puffs, fBottle, fdrops, pulses, E, roomF, F, Fcw, G, Gcw, H, Hmf, tmBottle, steam, sandT, sandB, hearts, chim, fac };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t); s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.roomF.userData.wall.material.color.copy(wc); s.roomF.userData.floor.material.color.copy(wc);
      const pose = (g, x, z, o) => {
        o = o || {}; g.visible = true; g.position.set(x, o.y || 0, z); g.rotation.set(o.lean || 0, o.ry || 0, o.tilt || 0); g.userData.setExpr(o.ex || 'happy'); g.userData.tick(t, { wave: o.wave, breath: o.breath });
        if (o.a1) { g.userData['arm-1'].rotation.z = o.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = o.a1[1]; }
        if (o.a2) { g.userData.arm1.rotation.z = o.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = o.a2[1]; }
        if (o.pop != null) g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(o.pop)))); else if (g.userData.base) g.scale.setScalar(g.userData.base);
      };
      const CR = { a1: [-0.15, -0.95], a2: [0.1, -0.95] }, HIP = { a1: [0.5, -0.9], a2: [0.55, -0.55] };
      const cradle = (b, ex) => { b.visible = true; b.position.set(0.45, 0.78, 0.6); b.rotation.set(-0.45, 0, PI / 2 - 0.32); b.userData.setExpr(ex || 'happy'); b.userData.tick(t, { breath: 0.35 }); b.userData.arm1.rotation.z = 0.9; b.userData['arm-1'].rotation.z = -0.9; };
      const hip = (b, ex) => { b.visible = true; b.position.set(0.92, 0.5, 0.3); b.rotation.set(0, -0.5, 0); b.userData.setExpr(ex || 'happy'); b.userData.tick(t, {}); b.userData['arm-1'].rotation.z = -1.1; b.userData['arm-1'].rotation.x = -0.6; };
      const bob = (sp, a) => Math.abs(Math.sin(t * sp)) * a;
      const follow = (prop, g, hand, dx, dy, dz) => { g.updateMatrixWorld(true); g.userData[hand].getWorldPosition(V3); prop.position.set(V3.x + (dx || 0), V3.y + (dy || 0), V3.z + (dz || 0)); };
      let hearts = null; /* [cx, y0, z, t0, spread] */

      /* ---------- stage 0: home ---------- */
      const R = s.R; for (const k in R) R[k].visible = false; s.Rcw.visible = false; s.Rhw.visible = false; s.pumpBottle.visible = false; s.cup.visible = false; s.chair.visible = true;
      s.diapers.forEach((d) => (d.visible = false));
      if (bt === 'cover') {
        pose(R.mom, -0.8, -0.3, { y: 0.06, ex: 'worried', ry: 0.25, a1: [-0.45, -1.15], a2: [0.35, -0.2] }); R.mom.userData.head.rotation.x = 0.12;
        s.pumpBottle.visible = true; follow(s.pumpBottle, R.mom, 'hand-1', 0.05, -0.55, 0.12); s.pumpBottle.rotation.set(0, 0, 0.08 * Math.sin(t * 2));
        pose(R.wawa, 1.25, 0.75, { ex: 'giggle', ry: -0.35, y: bob(4.2, 0.08), wave: true });
      } else if (bt === 's4') {
        const p = ph('s4', t);
        pose(R.mom, 0, 0.3, Object.assign({ ex: p > 0.2 ? 'giggle' : 'happy' }, CR)); cradle(s.Rcw, 'sleepy'); s.chair.visible = false;
        hearts = [0, 2.2, 0.8, at('s4') + 0.6, 1.6];
      } else if (bt === 's7') {
        const p = ph('s7', t);
        pose(R.mom, -1.75, -0.2, { ex: p > 0.25 ? 'happy' : 'worried', ry: 0.4, a1: [-0.3, -0.7] });
        s.pumpBottle.visible = p < 0.25; follow(s.pumpBottle, R.mom, 'hand-1', 0.05, -0.55, 0.12); s.pumpBottle.rotation.set(0, 0, 0);
        pose(R.wawa, 0.9, 0.25, { ex: 'giggle', ry: -0.25, y: bob(4.5, 0.07), wave: p > 0.5 });
        s.diapers.forEach((d, i) => { const k = U.clamp((t - TM('s7', i, 0.1 + i * 0.07)) / 0.3); d.visible = k > 0.01; d.position.set(-1.9 + i * 0.76, 0.26 + 0.05 * Math.sin(t * 3 + i), 1.75); d.rotation.set(-0.25, 0, 0.06 * Math.sin(t * 2 + i)); d.scale.setScalar(Math.max(0.01, U.easeBack(k))); });
      } else if (bt === 's11') {
        const p = ph('s11', t);
        pose(R.mom, -0.8, -0.3, { y: 0.06, ex: 'happy', ry: 0.25, a1: [-0.35, -1.0] }); s.cup.visible = true; follow(s.cup, R.mom, 'hand-1', 0.05, 0.05, 0.1);
        pose(R.dad, 1.45, 0.1, Object.assign({ ex: 'happy', ry: -0.25 }, HIP)); hip(s.Rhw, p > 0.5 ? 'giggle' : 'happy');
        R.dad.rotation.z = 0.05 * Math.sin(t * 2.2);
      } else if (bt === 's12') {
        const p = ph('s12', t); s.chair.visible = false;
        pose(R.mom, -1.9, -0.7, { ex: 'happy' }); pose(R.dad, 1.95, -0.7, { ex: 'happy', wave: p > 0.3 && p < 0.7 });
        pose(R.nana, -1.6, 1.4, { ex: 'giggle', y: bob(5, 0.12) }); pose(R.mama, 0.0, 1.4, { ex: 'giggle', y: bob(5.5, 0.14) }); pose(R.wawa, 1.45, 1.4, { ex: 'happy', y: bob(4, 0.05) });
        hearts = [0, 0.6, 0.5, at('s12') + 0.4, 3.6];
      }

      /* ---------- stage A: timeline ---------- */
      { const p = inB('s1', t) ? ph('s1', t) : 0, q = SP('s1', 0.5), A = s.A, STX = [AX - 3.5, AX, AX + 3.5], STH = [0.3, 0.65, 1.0];
        const k0 = U.clamp((p - 0.04) / 0.12), k1 = U.clamp((t - q) / 0.45), k2 = U.clamp((t - q - 0.7) / 0.45);
        s.steps.forEach((g, i) => { const k = [k0, k1, k2][i]; g.scale.set(1, Math.max(0.01, U.easeBack(k)), 1); });
        s.basket.scale.setScalar(Math.max(0.01, U.easeBack(k0)));
        A.nb.visible = k0 > 0.05; A.nb.position.set(STX[0] + 0.5, STH[0] * k0 + 0.42, 0.45); A.nb.rotation.set(-0.15, 0, PI / 2 - 0.08); A.nb.userData.setExpr('sleepy'); A.nb.userData.tick(t, { breath: 0.35 }); A.nb.scale.setScalar(A.nb.userData.base * Math.max(0.01, k0));
        pose(A.wawa, STX[1] - 0.35, 0.5, { y: STH[1] * k1, ex: 'giggle', ry: 0.15, pop: k1, a2: [0.55, -1.05] });
        A.wawa.visible = k1 > 0.02; s.aBowl.visible = A.wawa.visible; follow(s.aBowl, A.wawa, 'hand1', 0.05, 0.18, 0.12); s.aBowl.scale.setScalar(0.75 * Math.max(0.01, k1));
        pose(A.nana, STX[2] - 0.35, 0.5, { y: STH[2] * k2, ex: 'giggle', ry: -0.1, pop: k2, a2: [0.55, -1.05], y2: 0 });
        A.nana.position.y += bob(5, 0.08) * k2; A.nana.visible = k2 > 0.02; s.aBowl2.visible = A.nana.visible; follow(s.aBowl2, A.nana, 'hand1', 0.05, 0.2, 0.12); s.aBowl2.scale.setScalar(0.8 * Math.max(0.01, k2));
        s.aDrops.forEach((d, i) => { const k = [k0, k1, k2][i]; d.visible = k > 0.02; d.position.set(STX[i] + 1.05, STH[i] + 1.15 + 0.12 * Math.sin(t * 2.4 + i), 0.75); d.rotation.y = 0.25 * Math.sin(t * 1.3 + i); d.scale.setScalar([0.5, 0.42, 0.34][i] * Math.max(0.01, U.easeBack(k))); }); }

      /* ---------- stage B: jars ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0, share = [0.5, 0.33];
        s.jars.forEach((j, i) => { const f = U.easeIO(U.clamp((p - 0.1 - i * 0.18) / 0.3)), fm = U.easeIO(U.clamp((p - 0.1 - i * 0.18) / 0.18)), Hh = j.H - 0.06;
          const mh = Math.max(0.001, Hh * share[i] * fm), fh = Math.max(0.001, Hh * (1 - share[i]) * U.clamp((f - 0.45) / 0.55));
          j.milk.scale.y = mh; j.food.position.y = 0.14 + mh; j.food.scale.y = fh; j.food.visible = fh > 0.01; });
        pose(s.Bc.wawa, BX - 3.15, 0.6, { ex: 'giggle', ry: 0.35, y: bob(4.5, 0.06) });
        pose(s.Bc.nana, BX + 3.15, 0.6, { ex: p > 0.45 ? 'giggle' : 'happy', ry: -0.35, y: bob(5, 0.08), wave: p > 0.5 && p < 0.8 }); }

      /* ---------- stage C: gut ---------- */
      { const p = inB('s3', t) ? ph('s3', t) : 0, tS = P('s3', 0.16);
        s.shields.forEach((g, i) => { const k = U.clamp((t - tS - i * 0.07) / 0.35); g.scale.setScalar(Math.max(0.01, U.easeBack(k)) * (1 + 0.06 * Math.sin(t * 5 + i))); g.children[0].material.emissiveIntensity = 0.3 + 0.2 * Math.sin(t * 4); });
        s.viruses.forEach((v, i) => {
          const base = [CX + 2.8 - i * 1.6, 1.9 + 0.55 * Math.sin(t * 1.3 + i * 2), 0.35 * Math.cos(t * 1.1 + i)];
          const t1 = tS + 0.9 + i * 0.45; let sc = 1;
          if (t > t1) { const c = (t - t1) % 2.6; sc = c < 0.25 ? 1 - c / 0.25 : c < 1.0 ? 0 : U.easeBack(U.clamp((c - 1.0) / 0.4)); }
          v.position.set(base[0] + 0.25 * Math.sin(t * 2 + i), base[1], base[2]); v.rotation.set(t * 0.7 + i, t * 0.9, 0); v.scale.setScalar(0.62 * Math.max(0.01, sc)); v.visible = sc > 0.02;
        });
        s.flow.forEach((d, i) => { const u = ((t * 0.55 + i * 0.25) % 1); d.position.set(CX - 3.6 + u * 7.2, 1.9 + 0.3 * Math.sin(u * PI * 2 + i), 0.2); d.rotation.z = -0.2; d.visible = u > 0.03 && u < 0.97; });
        s.mascot.position.y = 0.62 + bob(3.2, 0.25); s.mascot.rotation.z = 0.12 * Math.sin(t * 3.2); }

      /* ---------- stage D: work ---------- */
      { const p = inB('s5', t) ? ph('s5', t) : 0, q = SP('s5', 0.5), w = U.easeIO(U.clamp((t - q - 0.2) / 1.6));
        pose(s.D.mom, U.lerp(DX - 0.9, DX - 2.3, w), 0.1, { ex: 'worried', ry: U.lerp(0.3, -0.9, U.clamp(w * 1.6)) + (w > 0.8 ? 1.3 * U.clamp((w - 0.8) / 0.2) : 0), y: w > 0 && w < 1 ? bob(7, 0.06) : 0 });
        follow(s.brief, s.D.mom, 'hand1', 0.0, -0.32, 0.05); s.brief.rotation.set(0, s.D.mom.rotation.y, 0);
        pose(s.D.dad, DX + 1.25, -0.1, Object.assign({ ex: t > q ? 'worried' : 'happy', ry: -0.3 }, HIP)); hip(s.Dhw, t > q + 0.6 ? 'cry' : 'happy');
        if (t > q + 0.6) { s.Dhw.userData['arm-1'].rotation.z = -2.2 + 0.25 * Math.sin(t * 8); s.Dhw.userData['arm-1'].rotation.x = 0.6; } }

      /* ---------- stage E: factory ---------- */
      { const t0 = at('s6'), q = SP('s6', 0.5), te = end('s6');
        const ang = 1.1 * U.clamp(t - t0, 0, Math.max(0, q - t0)) + 5.0 * Math.max(0, t - q);
        s.gear.rotation.z = -ang; s.fac.scale.set(1 + (t > q ? 0.025 * Math.sin(t * 14) : 0), 1, 1);
        const sinceQ = Math.max(0, t - q), lvl = 0.15 + 0.72 * U.clamp(sinceQ / Math.max(0.5, te - q - 0.5));
        s.fBottle.userData.milk.scale.y = lvl;
        const rate = t < q ? 1.1 : 0.32;
        s.fdrops.forEach((d, i) => { const ph0 = t < q ? (t - t0) : (t - q); const c = (ph0 / rate - i / s.fdrops.length * (t < q ? 1 : 6)); const u = ((c % 1) + 1) % 1; d.visible = inB('s6', t) && (t < q ? i < 2 : true) && c > 0; d.position.set(EX + 2.78, 0.88 - u * 0.62 * 0.9, 0.35); });
        const iv = t < q ? 1.4 : 0.42; s.pulses.forEach((h, i) => { const ts = t < q ? t0 + 0.3 + i * 1.4 : q + i * 0.42; const u = (t - ts) / 0.9; h.visible = inB('s6', t) && u > 0 && u < 1 && (t < q ? ts < q : true); if (!h.visible) return; const a = new T.Vector3(EX - 1.8, 1.2, 0.6), b2 = new T.Vector3(EX + 0.35, 1.0, 0.95); h.position.lerpVectors(a, b2, u); h.position.y += Math.sin(u * PI) * 1.0; h.rotation.y = t * 3; });
        s.puffs.forEach((pf, i) => { const u = ((t * (t < q ? 0.35 : 0.9) + i * 0.25) % 1); pf.position.set(EX + 1.65 + 0.2 * Math.sin(u * 5 + i), 2.95 + u * 0.9, -0.25); pf.scale.setScalar(0.6 + u * 0.8); pf.material.opacity = 0.9 * (1 - u); });
        pose(s.E.wawa, EX - 2.15, 0.55, { ex: 'giggle', ry: 0.45, y: bob(t < q ? 3 : 6, 0.08) }); }

      /* ---------- stage F: night ---------- */
      { pose(s.F.mom, FX + 0.55, 0.1, Object.assign({ ex: 'worried', ry: -0.15 }, CR)); cradle(s.Fcw, 'sleepy'); s.F.mom.rotation.z = 0.04 * Math.sin(t * 1.6); }

      /* ---------- stage G: clinic ---------- */
      { const p = inB('s9', t) ? ph('s9', t) : 0, q = SP('s9', 0.5);
        pose(s.G.mom, GX - 1.0, 0.0, Object.assign({ ex: 'happy', ry: 0.2, y: 0.12 }, CR)); cradle(s.Gcw, t > q ? 'happy' : 'sleepy');
        pose(s.G.nurse, GX + 1.55, 0.2, { ex: 'happy', ry: -0.45, wave: p > 0.08 && p < 0.3, a1: p > 0.55 ? [-0.6 - 0.1 * Math.sin(t * 4), -1.0] : null });
        }

      /* ---------- stage H: kitchen ---------- */
      { const p = inB('s10', t) ? ph('s10', t) : 0;
        pose(s.H.tm, HX - 1.25, 0.3, Object.assign({ ex: 'happy', ry: 0.2 }, CR)); cradle(s.Hmf, 'happy'); if (inB('s10', t) && t > SP('s10', 0.5)) s.H.tm.visible = false;
        s.tmBottle.position.set(-0.78, 1.28, 0.95); s.tmBottle.rotation.set(0, 0, -2.0);
        if (inB('s10', t) && t < SP('s10', 0.5)) hearts = [HX - 1.1, 2.1, 0.8, at('s10') + 0.5, 1.4];
        s.steam.forEach((st, i) => { const u = ((t * 0.6 + i * 0.25) % 1); st.position.set(HX + 0.78 + 0.08 * Math.sin(u * 6 + i), TOPH + 0.6 + u * 0.8, -1.45); st.scale.setScalar(0.5 + u); st.material.opacity = 0.85 * (1 - u); });
        const sf = ((t - at('s10')) % 4) / 4; s.sandT.scale.setScalar(Math.max(0.05, 1 - sf)); s.sandB.scale.setScalar(Math.max(0.05, sf)); }

      /* ---------- hearts ---------- */
      s.hearts.forEach((h) => { if (!hearts) { h.visible = false; return; } const [cx, y0, z, t0, sp] = hearts, u = h.userData.s, a = (t - t0 - u[1] * 1.4) / 3.0; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(cx + Math.sign(u[0] || 1) * (0.85 + Math.abs(u[0]) * sp * 0.7), y0 + a * 2.0, z + u[2] * 0.3); h.scale.setScalar(0.55 * (1 + 0.15 * Math.sin(t * 6 + u[0] * 4)) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); h.rotation.y = 0.4 * Math.sin(t * 2 + u[0]); });

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { pb: s.pumpBottle.position.clone(), s: { R: s.R, A: s.A, Bc: s.Bc, D: s.D, E: s.E, F: s.F, G: s.G, H: s.H }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's8') return ['#3a3570', '#6a4a80']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, a, bg, fg, size) => { size = size || 40; g.save(); g.globalAlpha = a; g.font = '800 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 44; x = U.clamp(x, w / 2 + (REEL ? 100 : 30), (REEL ? 950 : 1050) - w / 2); rr(x - w / 2, y - size * 0.85, w, size * 1.7, size * 0.85, bg || '#ffffff', '#3a2f3f'); plain(str, x, y + 2, size, fg || '#3a2f3f', 800, 'center'); g.restore(); };
      const at3 = (x, y, z) => proj(new T.Vector3(x, y, z));
      /* cover: little bottle note */
      if (b === 'cover') { const bp = window.__dbg.pb; if (bp) { const [x, y] = proj(bp); tag('ปั๊มได้แค่นี้…', x + (REEL ? 200 : 30), y + (REEL ? -110 : 52), 1, '#ffffff', '#ff4d6d', 36); } }
      /* s1: age tags */
      if (b === 's1') {
        const q = SP('s1', 0.5), L = [['0–6 เดือน', '#ffd23f', at('s1') + 0.5, S.A.nb], ['6 เดือน+', '#79dcb4', q + 0.2, S.A.wawa], ['2 ปี+', '#5ab8ff', q + 0.9, S.A.nana]];
        L.forEach(([lab, c, t0, o], i) => { const a = U.clamp((t - t0) / 0.3); if (a <= 0) return; const STX = [AX - 3.5, AX, AX + 3.5], STH = [0.3, 0.65, 1.0]; const [x, y] = at3(STX[i], STH[i] + 2.45, 0.5); tag(lab, x, y, a, c, '#3a2f3f', 40); });
      }
      /* s2: jar labels */
      if (b === 's2') {
        const p = ph('s2', t);
        [['6–12 เดือน', BX - 1.45, 0.5, '#ffd23f'], ['1–2 ปี', BX + 1.45, 0.33, '#5ab8ff']].forEach(([lab, x3, sh, c], i) => {
          const a = U.clamp((p - 0.08 - i * 0.18) / 0.1); if (a <= 0) return; const [x, y] = at3(x3, 3.05, 0.2); tag(lab, x, y, a, c, '#3a2f3f', 40);
          const am = U.clamp((p - 0.3 - i * 0.18) / 0.1); if (am > 0) { const [mx, my] = at3(x3, 0.14 + 2.44 * sh * 0.5, 1.15); tag(i ? 'นมแม่ ~1/3' : 'นมแม่ ≥ 1/2', mx, my, am, '#ffffff', '#3a2f3f', 34); }
          const af = U.clamp((p - 0.55 - i * 0.18) / 0.1); if (af > 0) { const [fx, fy] = at3(x3, 0.14 + 2.44 * (sh + (1 - sh) * 0.5), 1.15); tag('อาหาร', fx, fy, af, '#ffa94d', '#3a2f3f', 34); }
        });
      }
      /* s4: mom's benefits */
      if (b === 's4') {
        const p = ph('s4', t), L = [['มะเร็งเต้านม', -1.85, 2.9], ['มะเร็งรังไข่', 1.85, 2.9], ['เบาหวานชนิด 2', 0, 0.35]];
        L.forEach(([lab, x3, y3], i) => { const a = U.clamp((t - TM('s4', i, 0.25 + i * 0.12)) / 0.3); if (a <= 0) return; const [x, y] = at3(x3, y3, 0.6); tag(lab, x, y, a, '#d6ffe8', '#1f7a4a', 36);
          g.save(); g.globalAlpha = a; g.font = '800 36px Kanit,sans-serif'; const w = g.measureText(lab).width + 44, cx = U.clamp(x, w / 2 + 30 + LD, 1050 - LD - w / 2) + w / 2 - 6; g.beginPath(); g.arc(cx, y - 26, 22, 0, 7); g.fillStyle = '#3fbf6f'; g.fill(); g.beginPath(); g.moveTo(cx - 10, y - 32); g.lineTo(cx + 10, y - 32); g.lineTo(cx, y - 16); g.closePath(); g.fillStyle = '#ffffff'; g.fill(); g.restore(); });
      }
      /* s5: 100-baby grid */
      if (b === 's5') {
        const q = SP('s5', 0.5), a0 = U.clamp((t - at('s5') - 0.3) / 0.3) * U.clamp((q - t) / 0.3);
        if (a0 > 0) {
          g.save(); g.globalAlpha = a0; const sp = REEL ? 44 : 54, x0 = 540 - 4.5 * sp, y0 = REEL ? 790 : 800, rd = REEL ? 17 : 20; rr(x0 - 46, y0 - 42, 9 * sp + 92, 9 * sp + 84, 32, 'rgba(255,255,255,.94)', '#ff8fab');
          const lit = 28.6 * U.clamp((t - at('s5') - 0.6) / 1.6);
          for (let i = 0; i < 100; i++) { const cx = x0 + (i % 10) * sp, cy = y0 + Math.floor(i / 10) * sp, f = U.clamp(lit - i); g.beginPath(); g.arc(cx, cy, rd, 0, 7); g.fillStyle = '#e8e2ee'; g.fill(); if (f > 0) { g.save(); g.beginPath(); g.arc(cx, cy, rd, 0, 7); g.clip(); g.fillStyle = '#ff6f91'; g.fillRect(cx - rd, cy + rd - 2 * rd * f, 2 * rd, 2 * rd * f); g.restore(); } }
          g.restore();
        }
      }
      /* s7: diaper count */
      if (b === 's7') { S.R && [0, 1, 2, 3, 4, 5].forEach((i) => { const a = U.clamp((t - TM('s7', i, 0.1 + i * 0.07) - 0.15) / 0.2); if (a <= 0) return; const [x, y] = at3(-1.9 + i * 0.76, 0.85, 1.75); g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, 30, 0, 7); g.fillStyle = i === 5 ? '#ff6f91' : '#5ab8ff'; g.fill(); plain(String(i + 1), x, y + 2, 36, '#ffffff', 800, 'center'); g.restore(); }); }
      /* s8: doctor list */
      if (b === 's8') {
        const p = ph('s8', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 460, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = [['หลังวันที่ 5 ผ้าอ้อมเปียก', 'น้อยกว่า 6 ผืนต่อวัน'], ['ผ่าน 2 สัปดาห์ น้ำหนัก', 'ยังไม่กลับเท่าตอนแรกเกิด'], ['ซึม ปลุกไม่ตื่นมากินนม', 'หรือดูดเบา ไม่มีแรง'], ['หลังสัปดาห์แรก', 'กินนมน้อยกว่า 8 ครั้งต่อวัน']];
        L.forEach(([l1, l2], i) => { const a = U.clamp((t - TM('s8', i, 0.12 + i * 0.13)) / 0.35); if (a <= 0) return; const y = 384 + i * 102; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(122 + LD, y + 14, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 122 + LD, y + 16, 32, '#ffffff', 800, 'center'); plain(l1, 166 + LD, y, Math.round(38 * LF), '#ffffff', 700); plain(l2, 166 + LD, y + 40, Math.round(32 * LF), '#ffd6e4', 500); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ปรึกษากุมารแพทย์ หรือคลินิกนมแม่ · ที่มา: La Leche League, CDC', 540, 820, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s9: 8-12 feeds strip + nurse tag */
      if (b === 's9') {
        const q = SP('s9', 0.5), a0 = U.clamp((t - at('s9') - 0.5) / 0.3) * U.clamp((q - t) / 0.3);
        if (a0 > 0) { g.save(); g.globalAlpha = a0; const n = 12, sp = 64, x0 = 540 - (n - 1) * sp / 2, y = 610; rr(x0 - 50, y - 46, (n - 1) * sp + 100, 92, 46, 'rgba(255,255,255,.92)', '#ff8fab');
          for (let i = 0; i < n; i++) { const k = U.clamp((t - at('s9') - 0.7 - i * 0.12) / 0.2), cx = x0 + i * sp, night = i >= 7 && i <= 10; g.beginPath(); g.arc(cx, y, 22, 0, 7); g.fillStyle = k <= 0 ? '#eee6f0' : i < 8 ? '#ff6f91' : '#ffb3c6'; g.fill(); if (k > 0 && night) { g.beginPath(); g.arc(cx, y, 11, 0, 7); g.fillStyle = '#fff3b0'; g.fill(); g.beginPath(); g.arc(cx + 5, y - 4, 10, 0, 7); g.fillStyle = i < 8 ? '#ff6f91' : '#ffb3c6'; g.fill(); } } g.restore(); }
        const [nx, ny] = wp(S.G.nurse.userData.head, 1.25 * S.G.nurse.scale.x); tag('พยาบาลพุทรา', nx, Math.max(ny, 840), U.clamp((t - at('s9') - 0.3) / 0.3), '#ffffff', '#2f6fbf', 34);
      }
      /* s10: name tag, then prep tags */
      if (b === 's10') {
        const q = SP('s10', 0.5);
        if (t < q) { const [x, y] = wp(S.H.tm.userData.head, 1.25 * S.H.tm.scale.x); tag('แม่แตงโม', x, Math.max(y, 840), U.clamp((t - at('s10') - 0.3) / 0.3) * U.clamp((q - t) / 0.2), '#ffffff', '#e0405a', 36); }
        else { [['≥ 70°C', HX + 0.3, 1.95], ['ตวงตามฉลาก', HX + 2.35, 2.0], ['ภายใน 2 ชม.', HX + 3.25, 1.95]].forEach(([lab, x3, y3], i) => { const a = U.clamp((t - q - 0.6 - i * 0.35) / 0.25); if (a <= 0) return; const [x, y] = at3(x3, y3 + (i === 1 ? 0.55 : 0), KZH); tag(lab, x, y, a, ['#ffd23f', '#ffffff', '#79dcb4'][i], '#3a2f3f', 36); }); }
      }
      /* s11: 5 tips */
      if (b === 's11') {
        const id = 's11', y0 = 320, p = ph(id, t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, y0, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['ให้ดูดตามที่ลูกอยาก ไม่ต้องตั้งตาราง', 'ดูผ้าอ้อม + น้ำหนัก แทนดูขวดปั๊ม', 'พ่อ-ยาย ช่วยเรอ ล้างขวด เฝ้ากลางคืน', 'นมผง ชงด้วยน้ำร้อน 70°C+ ตามฉลาก', 'ติดขัด ปรึกษาคลินิกนมแม่'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM(id, i, 0.1 + i * 0.16)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM(id, i, 0.1 + i * 0.16)) / 0.3); if (a <= 0) return; const y = y0 + 60 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(37 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 290, instant: true, lines: [[88, ['ลูกกินนมแม่', '#fff']], [84, ['ถึงกี่ขวบดี?', '#ffd35e']], [48, ['ปั๊มได้นิดเดียว… นมไม่พอจริงไหม?', '#ffe3ea', 600]]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[60, ['6 เดือนแรก: ', '#ffd35e'], ['นมแม่อย่างเดียว', '#fff']], [46, ['ไม่ต้องให้น้ำ ไม่ต้องให้อาหารอื่น', '#ffe3ea', 600]]] },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 280, lines: [[54, ['6 เดือนขึ้นไป: อาหารตามวัย + นมแม่', '#fff']], [54, ['ต่อได้ถึง 2 ปี หรือนานกว่านั้น', '#ffd35e']], [44, ['นานแค่ไหน ตามที่แม่และลูกพร้อม', '#ffe3ea', 600]]], foot: 'ที่มา: WHO, AAP 2022, กรมอนามัย' },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 280, lines: [[60, ['พ้นขวบแล้ว นมแม่ยังมีค่า', '#ffd35e']], [46, ['6–12 เดือน: ให้พลังงานครึ่งหนึ่งขึ้นไป', '#fff', 600]], [46, ['1–2 ปี: ยังให้ราว 1/3 ของที่ลูกต้องการ', '#fff', 600]]], foot: 'ที่มา: WHO' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.5), y: 290, lines: [[62, ['ลูกได้อะไร?', '#ffd35e']], [48, ['แอนติบอดีในนมแม่ ช่วยเคลือบลำไส้', '#fff']], [44, ['ช่วยลูกสู้เชื้อโรค', '#ffe3ea', 600]]] },
      { t0: SP('s3', 0.5) + 0.02, t1: end('s3') - 0.05, y: 280, lines: [[54, ['ท้องเสีย ลดราว', '#fff'], ['ครึ่งหนึ่ง', '#ffd35e']], [54, ['ปอด-หลอดลมติดเชื้อ ลด ', '#fff'], ['1/3', '#ffd35e']], [44, ['IQ สูงขึ้นราว 3 จุด (พบความเชื่อมโยง)', '#ffe3ea', 600]]], foot: 'Lancet 2016 · ท้องเสีย/ติดเชื้อ: ประเทศรายได้น้อย–ปานกลาง' },
      { t0: at('s4') + 0.2, t1: end('s4') - 0.05, y: 290, lines: [[64, ['แม่ได้ด้วย!', '#ffd35e']], [46, ['ให้นมลูกนานขึ้น พบความเชื่อมโยง', '#fff', 600]], [46, ['กับความเสี่ยงโรคเหล่านี้ที่ลดลง', '#fff', 600]]], foot: 'ที่มา: AAP 2022, Lancet 2016' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[54, ['เด็กไทยได้นมแม่อย่างเดียว ครบ 6 เดือน', '#fff']], [92, [(t) => (28.6 * U.clamp((t - at('s5') - 0.6) / 1.6)).toFixed(1) + '%', '#ffd35e']]], foot: 'MICS 2565 (สำรวจสถานการณ์เด็กและสตรีในประเทศไทย)' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 280, lines: [[52, ['ตัวเลขยิ่งลดลง เมื่อแม่ครบลาคลอด', '#fff']], [52, ['~3 เดือน แล้วต้องกลับไปทำงาน', '#fff']], [50, ['ไม่ใช่ความผิดของแม่คนเดียว', '#ffd35e']]], foot: 'ลาคลอดได้ 98 วัน (กฎหมายคุ้มครองแรงงาน)' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 280, lines: [[54, ['ปั๊มได้น้อย ไม่ได้แปลว่านมน้อย', '#fff']], [46, ['แม่ส่วนใหญ่ผลิตนมได้พอ', '#ffe3ea', 600]], [48, ['นมน้อยเพราะร่างกายจริงๆ ไม่ถึง 5%', '#ffd35e']]], foot: "ที่มา: The Royal Women's Hospital (ออสเตรเลีย)" },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 280, lines: [[58, ['ลูกดูดบ่อย = ', '#fff'], ['สั่งผลิตเพิ่ม', '#ffd35e']], [44, ['เต้านิ่มลงหลัง 3–12 สัปดาห์', '#fff', 600]], [44, ['คือร่างกายปรับตัว ไม่ใช่นมหมด', '#ffe3ea', 600]]] },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 270, lines: [[56, ['ดูที่ลูก ไม่ใช่ดูขวดปั๊ม', '#ffd35e']], [42, ['หลังวันที่ 5 ผ้าอ้อมเปียก 6 ผืนขึ้นไปต่อวัน', '#fff', 600]], [42, ['น้ำหนักกลับเท่าแรกเกิด ใน 10–14 วัน', '#fff', 600]], [42, ['ได้ยินเสียงกลืนตอนดูด', '#fff', 600]]], foot: 'ที่มา: La Leche League, CDC' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.5), y: 280, lines: [[54, ['อยากให้น้ำนมมากขึ้น', '#fff']], [54, ['ให้ลูกดูดบ่อย 8–12 ครั้ง/วัน', '#ffd35e']]], foot: 'รวมกลางคืน ไม่ต้องตั้งตาราง · ที่มา: CDC' },
      { t0: SP('s9', 0.5) + 0.02, t1: end('s9') - 0.05, y: 280, lines: [[52, ['อมลึกถึงลานนม ไม่ใช่แค่หัวนม', '#fff']], [48, ['เจ็บ หรือติดขัด ปรึกษาคลินิกนมแม่', '#ffd35e']], [42, ['มีในโรงพยาบาลหลายแห่ง', '#ffe3ea', 600]]] },
      { t0: at('s10') + 0.2, t1: SP('s10', 0.5), y: 270, lines: [[56, ['สายนมชง หรือนมผสม', '#fff']], [62, ['ก็เป็นแม่ที่ดี', '#ffd35e']], [42, ['นมแม่ทุกหยดมีค่า ให้บางส่วนก็ยังได้ประโยชน์', '#ffe3ea', 600]], [42, ['อุ้มแนบอก สบตา ความผูกพันมาจากอ้อมกอด', '#ffe3ea', 600]]] },
      { t0: SP('s10', 0.5) + 0.02, t1: end('s10') - 0.05, y: 280, lines: [[58, ['ชงนมผงให้ปลอดภัย', '#ffd35e']], [44, ['ต้มน้ำแล้วใช้ภายใน 30 นาที ขณะยังร้อน', '#fff', 600]], [44, ['ไม่ชงจางหรือข้นกว่าฉลาก · ที่เหลือเททิ้ง', '#fff', 600]]], foot: 'ที่มา: WHO' },
      { t0: at('s11') + 0.2, t1: end('s11') - 0.05, y: 250, lines: [[58, ['5 ข้อ ให้นมแบบไม่หมดแรง', '#ffd35e']]] },
      { t0: at('s12') + 0.2, t1: end('s12'), y: 290, lines: [[62, ['นมแม่ หรือนมชง', '#fff']], [62, ['ลูกโตได้ด้วยรัก เหมือนกัน', '#ffd35e']], [44, ['ลูกคุณกินนมแม่ถึงกี่เดือน? คอมเมนต์', '#ffe3ea', 600]]], foot: 'ข้อมูล: WHO, AAP, CDC, Lancet 2016, MICS 2565' },
    ],
    trans,
    audio: [
      [0.4, 'boing'], [1.2, 'giggle'],
      [at('s1') + 0.4, 'pop'], [at('s1') + 0.8, 'twinkle'], [SP('s1', 0.5), 'pop'], [SP('s1', 0.5) + 0.7, 'pop'], [SP('s1', 0.5) + 1.2, 'giggle'],
      [P('s2', 0.1), 'bubble'], [P('s2', 0.28), 'bubble'], [P('s2', 0.55), 'ding'], [P('s2', 0.7), 'giggle'],
      [at('s3') + 0.3, 'shimmer'], [P('s3', 0.16), 'riser'], [P('s3', 0.3), 'pop'], [P('s3', 0.36), 'pop'], [P('s3', 0.42), 'pop'], [SP('s3', 0.5), 'ding'], [SP('s3', 0.5) + 1.2, 'pop'],
      [at('s4') + 0.4, 'heart'], [TM('s4', 0, 0.25), 'ding'], [TM('s4', 1, 0.37), 'ding'], [TM('s4', 2, 0.49), 'ding'],
      [at('s5') + 0.6, 'tick'], [at('s5') + 1.4, 'tick'], [at('s5') + 2.2, 'ding'], [SP('s5', 0.5) + 0.3, 'whoosh'], [SP('s5', 0.5) + 1.0, 'thud'],
      [at('s6') + 0.5, 'boing'], [P('s6', 0.25), 'bubble'], [SP('s6', 0.5), 'riser'], [SP('s6', 0.5) + 0.8, 'bubble'], [SP('s6', 0.5) + 1.6, 'bubble'], [SP('s6', 0.5) + 2.4, 'ding'],
      [TM('s7', 0, 0.1), 'pop'], [TM('s7', 1, 0.17), 'pop'], [TM('s7', 2, 0.24), 'pop'], [TM('s7', 3, 0.31), 'pop'], [TM('s7', 4, 0.38), 'pop'], [TM('s7', 5, 0.45), 'ding'], [P('s7', 0.6), 'giggle'],
      [at('s8') + 0.3, 'heartbeat'], [TM('s8', 0, 0.12), 'tick'], [TM('s8', 1, 0.25), 'tick'], [TM('s8', 2, 0.38), 'tick'], [TM('s8', 3, 0.51), 'tick'], [P('s8', 0.7), 'heartbeat'],
      [at('s9') + 0.5, 'twinkle'], [at('s9') + 1.0, 'tick'], [at('s9') + 1.6, 'tick'], [SP('s9', 0.5), 'ding'], [SP('s9', 0.5) + 0.8, 'heart'],
      [at('s10') + 0.5, 'heart'], [at('s10') + 1.3, 'giggle'], [SP('s10', 0.5), 'whoosh'], [SP('s10', 0.5) + 0.6, 'bubble'], [SP('s10', 0.5) + 0.95, 'ding'], [SP('s10', 0.5) + 1.3, 'tick'],
      [TM('s11', 0, 0.1), 'ding'], [TM('s11', 1, 0.26), 'tick'], [TM('s11', 2, 0.42), 'tick'], [TM('s11', 3, 0.58), 'tick'], [TM('s11', 4, 0.74), 'tick'], [P('s11', 0.5), 'giggle'],
      [at('s12') + 0.3, 'twinkle'], [at('s12') + 1.2, 'heart'], [at('s12') + 2.2, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s5'), CK.MUSIC.CUTE), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.OOPS), CK.musicBed(at('s6'), at('s8'), CK.MUSIC.CUTE), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.NIGHT), CK.musicBed(at('s9'), at('s12'), CK.MUSIC.CUTE), CK.musicBed(at('s12'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
