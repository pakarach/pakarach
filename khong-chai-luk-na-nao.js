/* พ่อแม่หัวจะปวด — หน้าหนาวไทยไม่รู้มาวันไหน ของใช้ลูกต้องมีอะไรบ้าง?
   Build: node build.js khong-chai-luk-na-nao.js review-khong-chai-luk-na-nao.html --kit clay --title "หน้าหนาวไทย ของใช้ลูกต้องมีอะไรบ้าง?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, TAU = PI * 2, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6.5], ['s2', 6], ['s3', 7], ['s4', 7.5], ['s5', 8], ['s6', 7], ['s7', 7.5], ['s8', 7.5], ['s9', 7], ['s10', 7.5], ['s11', 7], ['s12', 5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's12'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const CLOSE = { pos: [0, 6.6, 26], look: [0, 3.0, 0], fov: 29 };

  /* shots */
  const SH = {
    cover: [FW(-1.9, -1.2, 6.4, 3.9, 0.15), FW(-1.85, -1.2, 6.1, 3.9, 0.15)],
    s1: [FW(1.5, -1.0, 6.6, 3.0, 0.14), FW(1.5, -1.0, 6.3, 3.0, 0.14)],
    s2: [FW(60, -0.4, 10.5, 3.5, 0.3), FW(60, -0.4, 10.1, 3.5, 0.3)],
    s3: REEL ? [FW(72, 0, 6.6, 2.4, 0.1), FW(72, 0, 6.4, 2.4, 0.1)] : [FW(72, 0, 6.6, 3.4, 0.1), FW(72, 0, 6.4, 3.4, 0.1)],
    s4: [FW(0.1, 0, 7.4, 3.9, 0.14), FW(0.1, 0, 7.1, 3.9, 0.14)],
    s5: [FW(-62.3, -1.5, 4.6, 2.5, 0.55), FW(-62.3, -1.5, 4.4, 2.5, 0.55)],
    s6: [FW(-58.9, -0.1, 5.4, 3.9, 0.16), FW(-58.9, -0.1, 5.2, 3.9, 0.16)],
    s7: [FW(-57.5, -0.2, 5.2, 3.0, 0.2), FW(-57.5, -0.2, 5.0, 3.0, 0.2)],
    s8: [FW(0.6, -0.3, 8.2, 3.9, 0.14), FW(0.6, -0.3, 7.9, 3.9, 0.14)],
    s9: [FW(119.6, 0, 5.4, 3.9, 0.18), FW(119.6, 0, 5.1, 3.9, 0.18)],
    s10: [FW(119.6, 0, 5.6, 2.3, 0.45), FW(119.6, 0, 5.4, 2.3, 0.45)],
    s11: [FW(-0.4, 0, 7.4, 2.0, 0.55), FW(-0.4, 0, 7.1, 2.0, 0.55)],
    s12: [CLOSE, { pos: [0, 6.3, 24.5], look: [0, 3.0, 0], fov: 29 }],
  };
  const CUT = new Set(['s1', 's2', 's4', 's5', 's6', 's8', 's9', 's11']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s9') - 0.2) / 0.6) * U.clamp((end('s10') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const tx = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const sky = (c0, c1, fn) => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(0, 0, 256, 256); if (fn) fn(x); });
  const cloudP = (x, pts, col) => { x.fillStyle = col; for (const [a, b, r] of pts) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } };
  const WIN = {
    morn: () => sky('#9fb8e8', '#e8eefc', (x) => { cloudP(x, [[60, 200, 50], [130, 190, 60], [200, 205, 50]], 'rgba(255,255,255,.85)'); x.fillStyle = '#ffd9a0'; x.beginPath(); x.arc(200, 120, 22, 0, 7); x.fill(); }),
    noon: () => sky('#3fa9ff', '#a8dcff', (x) => { x.fillStyle = '#ffe14d'; x.beginPath(); x.arc(128, 90, 46, 0, 7); x.fill(); x.strokeStyle = '#ffe14d'; x.lineWidth = 8; for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; x.beginPath(); x.moveTo(128 + Math.cos(a) * 60, 90 + Math.sin(a) * 60); x.lineTo(128 + Math.cos(a) * 82, 90 + Math.sin(a) * 82); x.stroke(); } cloudP(x, [[60, 200, 30], [96, 196, 36]], '#ffffff'); }),
    rain: () => sky('#6f7fa8', '#a9b4cf', (x) => { cloudP(x, [[50, 60, 40], [110, 50, 50], [180, 64, 44], [230, 50, 30]], '#8e98b8'); x.strokeStyle = '#dfe9ff'; x.lineWidth = 4; for (let i = 0; i < 26; i++) { const a = (i * 37) % 256, b = 100 + (i * 53) % 140; x.beginPath(); x.moveTo(a, b); x.lineTo(a - 8, b + 26); x.stroke(); } }),
    haze: () => sky('#c9b79a', '#e3d6bf', (x) => { x.fillStyle = 'rgba(150,130,110,.55)'; for (let i = 0; i < 40; i++) { x.beginPath(); x.arc((i * 71) % 256, (i * 113) % 256, 4 + (i % 3) * 3, 0, 7); x.fill(); } x.fillStyle = 'rgba(255,230,180,.6)'; x.beginPath(); x.arc(70, 70, 26, 0, 7); x.fill(); }),
  };

  VE.run({
    DUR, file: 'khong-chai-luk-na-nao', title: 'หน้าหนาวไทย ของใช้ลูกต้องมีอะไรบ้าง?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ของใช้ลูกหน้าหนาว', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const bodyOf = (g) => g.children.find((c) => c.geometry && c.geometry.type === 'SphereGeometry' && c.geometry.parameters.radius === 0.46);
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; g.visible = false; scene.add(g); return g; };
      const nb = (i, extra) => { const g = CK.neighbor(T, i, extra); g.userData.base = g.scale.x; g.visible = false; scene.add(g); return g; };
      /* open-front jacket shell on a chibi body */
      const jacket = (g, col, r, puff) => { const sh = new T.Mesh(new T.SphereGeometry(r, 32, 20, PI / 2 + 0.42, TAU - 0.84, 0.32, 1.78), M(col, { side: T.DoubleSide })); bodyOf(g).add(sh); if (puff) for (const yy of [0.12, -0.1]) { const q = new T.Mesh(new T.TorusGeometry(r * Math.cos(yy) * 1.0, 0.025, 6, 40, TAU - 0.9), M(col)); q.rotation.set(PI / 2, 0, PI / 2 + 0.45); q.position.y = yy * r * 1.6; bodyOf(g).add(q); } return sh; };
      const VP = {};

      /* ===== stage 0: living room (x 0) ===== */
      const room = CK.room(T, { wall: '#ffd0e0', wain: '#9fe3cf', floor: '#e9b483', rug: '#5ab8ff', props: false, winX: 3.4 }); scene.add(room);
      room.userData.win.parent.position.y = 2.45;
      VP.win = { morn: WIN.morn(), noon: WIN.noon(), rain: WIN.rain(), haze: WIN.haze() };
      /* wardrobe */
      const wd = new T.Group(); wd.position.set(-3.5, 0, -3.7); scene.add(wd);
      const wb = new T.Mesh(new T.BoxGeometry(2.3, 3.3, 1.0), M('#ff9ec0')); wb.position.y = 1.65; wd.add(wb);
      const wi = new T.Mesh(new T.BoxGeometry(2.0, 2.9, 0.1), M('#a0526e')); wi.position.set(0, 1.7, 0.46); wd.add(wi);
      for (const s of [-1, 1]) { const dr = new T.Mesh(new T.BoxGeometry(1.0, 3.0, 0.08), M('#ffb8d0')); dr.position.set(s * 1.55, 1.7, 0.95); dr.rotation.y = s * -1.1; wd.add(dr); const kb = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), M('#ffd23f')); kb.position.set(s * 1.25, 1.7, 1.25); wd.add(kb); }
      const rod = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 1.9, 8), M('#ffffff')); rod.rotation.z = PI / 2; rod.position.set(0, 2.85, 0.6); wd.add(rod);
      ['#5fb3ff', '#ffd166', '#79dcb4', '#ff7a8a', '#b39dff'].forEach((c, i) => { const cl = new T.Mesh(new T.BoxGeometry(0.32, 1.1, 0.42), M(c)); cl.position.set(-0.75 + i * 0.37, 2.2, 0.62); wd.add(cl); });
      /* clock */
      const ccv = document.createElement('canvas'); ccv.width = ccv.height = 256; const ctx2 = new T.CanvasTexture(ccv);
      const clock = new T.Mesh(new T.CircleGeometry(0.5, 40), new T.MeshBasicMaterial({ map: ctx2, transparent: true })); clock.position.set(-0.6, 2.7, -4.33); scene.add(clock);
      /* air purifier */
      const pur = new T.Group(); pur.position.set(-3.0, 0, -2.2); scene.add(pur);
      const pb = new T.Mesh(new T.BoxGeometry(0.9, 1.6, 0.7), M('#dfe7f2')); pb.position.y = 0.8; pur.add(pb);
      const fan = new T.Group(); fan.position.set(0, 1.0, 0.37); pur.add(fan);
      for (let i = 0; i < 4; i++) { const bl = new T.Mesh(new T.BoxGeometry(0.1, 0.5, 0.03), M('#7f8fa6')); bl.rotation.z = i * PI / 4 * 2; fan.add(bl); }
      const led = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), new T.MeshBasicMaterial({ color: '#4cff8a' })); led.position.set(0, 1.45, 0.36); pur.add(led);
      /* play mat for wawa */
      const mat = new T.Mesh(new T.BoxGeometry(1.6, 0.06, 1.3), M('#ffffff', { map: dots('#ffb347', '#fff1c9') })); mat.position.set(-0.4, 0.03, 1.0); scene.add(mat);
      /* living-room cast */
      const L = {};
      L.mom = mk('mom'); L.dad = mk('dad');
      L.dadJ = mk('dad', { longSleeve: true, sleeve: '#4f8fd6' }); jacket(L.dadJ, '#4f8fd6', 0.48);
      L.mamaP = mk('mama', { longSleeve: true, sleeve: '#5fb3ff' }); jacket(L.mamaP, '#5fb3ff', 0.53, true);
      L.mamaJ = mk('mama', { longSleeve: true, sleeve: '#ffa94d' }); VP.jk = jacket(L.mamaJ, '#ffa94d', 0.475);
      L.mamaM = mk('mama');
      L.nana = mk('nana'); L.wawa = mk('wawa');
      { const HS = L.mamaM.userData.headSpace; const mask = new T.Mesh(new T.SphereGeometry(0.3, 22, 14), M('#e6f2ff')); mask.scale.set(1.3, 0.78, 0.5); mask.position.set(0, -0.3, 0.6); HS.add(mask); for (const s of [-1, 1]) { const lp = new T.Mesh(new T.TorusGeometry(0.12, 0.018, 6, 16, PI), M('#e6f2ff')); lp.position.set(s * 0.52, -0.18, 0.42); lp.rotation.set(0, s * 1.2, PI / 2); HS.add(lp); } const pl = new T.Mesh(new T.BoxGeometry(0.5, 0.02, 0.02), M('#9fb8d8')); pl.position.set(0, -0.3, 0.76); HS.add(pl); }
      /* backpack for mamaJ (s11) */
      const bp = new T.Group(); const bpb = new T.Mesh(new T.BoxGeometry(0.72, 0.82, 0.34), M('#ff6f91')); bp.add(bpb); const bpp = new T.Mesh(new T.BoxGeometry(0.5, 0.36, 0.1), M('#ffd23f')); bpp.position.set(0, -0.14, -0.2); bp.add(bpp);
      for (const s of [-1, 1]) { const st = new T.Mesh(new T.BoxGeometry(0.09, 0.7, 0.06), M('#ff6f91')); st.position.set(s * 0.22, 0.05, 0.62); bp.add(st); }
      bp.position.set(0, 0.7, -0.44); bp.visible = false; L.mamaJ.add(bp); VP.bp = bp;
      /* held props: puffy jacket, tee, lotion jar */
      const puffy = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.42, 20, 14), M('#5fb3ff')); b.scale.set(1, 1.2, 0.45); puffy.add(b); for (const s of [-1, 1]) { const sl = new T.Mesh(new T.CylinderGeometry(0.13, 0.15, 0.6, 12), M('#5fb3ff')); sl.position.set(s * 0.45, 0.05, 0); sl.rotation.z = s * 0.35; puffy.add(sl); } for (const yy of [-0.15, 0.12]) { const q = new T.Mesh(new T.BoxGeometry(0.8, 0.03, 0.2), M('#3d86e8')); q.position.y = yy; puffy.add(q); } } scene.add(puffy);
      const tee = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(0.62, 0.66, 0.08), M('#ffd166')); tee.add(b); for (const s of [-1, 1]) { const sl = new T.Mesh(new T.BoxGeometry(0.28, 0.22, 0.08), M('#ffd166')); sl.position.set(s * 0.4, 0.2, 0); sl.rotation.z = s * -0.5; tee.add(sl); } } scene.add(tee);
      const jar = new T.Group(); { const b = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.24, 18), M('#ffffff')); const cp = new T.Mesh(new T.CylinderGeometry(0.21, 0.21, 0.1, 18), M('#79dcb4')); cp.position.y = 0.17; const lb = new T.Mesh(new T.CylinderGeometry(0.205, 0.205, 0.1, 18), M('#ff9ec0')); jar.add(b, cp, lb); } jar.scale.setScalar(1.4); scene.add(jar);

      /* ===== stage 1: cold-air waves (x 60) + thermometers (x 66) ===== */
      const plat = new T.Mesh(new T.BoxGeometry(24, 0.3, 14), M('#f27fa8')); plat.position.set(66, -0.15, 0); scene.add(plat);
      const backW = new T.Mesh(new T.BoxGeometry(24, 9, 0.3), M('#ffffff', { map: dots('#cfe6ff', '#ffffff', [10, 4]) })); backW.position.set(66, 4.2, -4.5); scene.add(backW);
      const isl = new T.Mesh(new T.CylinderGeometry(3.4, 3.6, 0.6, 48), M('#5cc98a')); isl.position.set(60.6, 0.3, 0); scene.add(isl);
      const house = new T.Group(); house.position.set(62.2, 0.6, -0.8); scene.add(house);
      const hb = new T.Mesh(new T.BoxGeometry(1.2, 1.0, 1.0), M('#ffd166')); hb.position.y = 0.5; const hr = new T.Mesh(new T.ConeGeometry(0.98, 0.7, 4), M('#ff6f91')); hr.position.y = 1.35; hr.rotation.y = PI / 4; const hd = new T.Mesh(new T.BoxGeometry(0.3, 0.5, 0.05), M('#a0526e')); hd.position.set(0, 0.25, 0.52); house.add(hb, hr, hd);
      for (const [x, z] of [[58.4, -0.9], [59.1, -1.6], [62.9, 1.2]]) { const tr = new T.Group(); const tk = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 0.5, 8), M('#a0704a')); tk.position.y = 0.25; const tf = new T.Mesh(new T.SphereGeometry(0.42, 14, 10), M('#3fae6a')); tf.position.y = 0.75; tr.add(tk, tf); tr.position.set(x, 0.6, z); scene.add(tr); }
      const mini = CK.family(T, 'mama', { scale: 0.55 }); mini.userData.base = 0.55; mini.position.set(60.4, 0.6, 0.9); scene.add(mini);
      const cold = new T.Group(); scene.add(cold);
      for (const [x, y, r] of [[0, 0, 0.85], [-0.8, -0.15, 0.62], [0.8, -0.12, 0.66], [-0.35, 0.45, 0.6], [0.4, 0.42, 0.58]]) { const c = new T.Mesh(new T.SphereGeometry(r, 20, 14), M('#8fc9ff')); c.position.set(x, y, 0); cold.add(c); }
      for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.11, 10, 8), M('#2a2340')); e.scale.set(1, 1.3, 0.6); e.position.set(s * 0.26, 0.05, 0.8); cold.add(e); const ck = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#ff9ec0')); ck.scale.set(1.3, 0.7, 0.4); ck.position.set(s * 0.48, -0.15, 0.78); cold.add(ck); }
      const mouth = new T.Mesh(new T.TorusGeometry(0.1, 0.035, 6, 14), M('#2a2340')); mouth.position.set(0.05, -0.22, 0.84); cold.add(mouth);
      const flakes = []; for (let i = 0; i < 16; i++) { const f = new T.Mesh(new T.OctahedronGeometry(0.11, 0), M('#ffffff')); f.visible = false; scene.add(f); flakes.push(f); }
      const therm = [[70.6, 20, '#ff8f5a'], [73.4, 11, '#5ab8ff']].map(([x, v, c]) => { const g = new T.Group(); g.position.set(x, 0, 0); scene.add(g);
        const glass = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 2.7, 24), M('#ffffff', { transparent: true, opacity: 0.45 })); glass.position.y = 1.95; g.add(glass);
        const cap = new T.Mesh(new T.SphereGeometry(0.3, 18, 10, 0, TAU, 0, PI / 2), M('#ffffff', { transparent: true, opacity: 0.45 })); cap.position.y = 3.3; g.add(cap);
        const bulb = new T.Mesh(new T.SphereGeometry(0.55, 24, 16), M(c)); bulb.position.y = 0.55; g.add(bulb);
        const lg = new T.CylinderGeometry(0.18, 0.18, 1, 16); lg.translate(0, 0.5, 0); const liq = new T.Mesh(lg, M(c)); liq.position.y = 0.6; liq.scale.y = 0.01; g.add(liq);
        for (let i = 0; i < 6; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.16, 0.035, 0.04), M('#3a2f3f')); tk.position.set(0.34, 0.95 + i * 0.42, 0.1); g.add(tk); }
        const fe = []; for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#2a2340')); e.position.set(s * 0.18, 0.62, 0.52); g.add(e); fe.push(e); }
        return { g, liq, v }; });

      /* ===== stage 2: kids' bedroom (x -60) ===== */
      const room2 = CK.room(T, { wall: '#bfe0ff', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#79dcb4', props: false, winX: -57.6 + 60 }); room2.position.x = -60; scene.add(room2);
      room2.userData.win.parent.position.y = 2.5;
      const MT = 1.05, CX = -62.3, CZ = -1.5;
      const crib = new T.Group(); crib.position.set(CX, 0, CZ); scene.add(crib);
      const cw = M('#ffffff'), cpk = M('#ff9ec0');
      for (const [x, z] of [[-1.05, -0.8], [1.05, -0.8], [-1.05, 0.8], [1.05, 0.8]]) { const p = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, MT + 0.8, 10), cw); p.position.set(x, (MT + 0.8) / 2, z); crib.add(p); }
      const cb = new T.Mesh(new T.BoxGeometry(2.1, 0.2, 1.6), cpk); cb.position.y = MT - 0.25; crib.add(cb);
      const cm = new T.Mesh(new T.BoxGeometry(2.0, 0.18, 1.5), M('#ffffff', { map: dots('#8fd3ff', '#e6f6ff') })); cm.position.y = MT - 0.08; crib.add(cm);
      const backP = new T.Mesh(new T.BoxGeometry(2.1, 0.9, 0.08), cpk); backP.position.set(0, MT + 0.35, -0.8); crib.add(backP);
      for (const s of [-1, 1]) { const r = new T.Mesh(new T.BoxGeometry(0.07, 0.07, 1.6), cw); r.position.set(s * 1.05, MT + 0.42, 0); crib.add(r); for (let i = 0; i < 4; i++) { const b = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.42, 6), cw); b.position.set(s * 1.05, MT + 0.2, -0.6 + i * 0.4); crib.add(b); } }
      const fr = new T.Mesh(new T.BoxGeometry(2.1, 0.07, 0.07), cw); fr.position.set(0, MT + 0.12, 0.8); crib.add(fr);
      const wth = new T.Group(); wth.position.set(-60.9, 2.35, -4.3); scene.add(wth);
      { const pl = new T.Mesh(new T.BoxGeometry(0.42, 1.0, 0.06), M('#ffffff')); wth.add(pl); const bar = new T.Mesh(new T.BoxGeometry(0.08, 0.6, 0.04), M('#ff5f6d')); bar.position.set(0, -0.08, 0.05); wth.add(bar); const bl = new T.Mesh(new T.SphereGeometry(0.09, 10, 8), M('#ff5f6d')); bl.position.set(0, -0.4, 0.06); wth.add(bl); }
      const R2 = {};
      R2.wawa = mk('wawa');
      { const sk = new T.Mesh(new T.SphereGeometry(0.5, 28, 18, 0, TAU, 0.62, PI - 0.62), M('#ffffff', { map: dots('#b39dff', '#efe9ff'), side: T.DoubleSide })); bodyOf(R2.wawa).add(sk); }
      R2.nana = mk('nana'); R2.mom = mk('mom'); R2.mama = mk('mama');
      /* table with props (s7) */
      const tbl = new T.Group(); tbl.position.set(-56.4, 0, -0.5); scene.add(tbl);
      const tt = new T.Mesh(new T.BoxGeometry(2.0, 0.14, 1.1), M('#ffb347')); tt.position.y = 1.2; tbl.add(tt);
      for (const [x, z] of [[-0.85, -0.4], [0.85, -0.4], [-0.85, 0.4], [0.85, 0.4]]) { const lgm = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 1.2, 8), M('#e08a3a')); lgm.position.set(x, 0.6, z); tbl.add(lgm); }
      const hum = new T.Group(); hum.position.set(0.45, 1.27, -0.15); tbl.add(hum);
      { const hb2 = new T.Mesh(new T.CylinderGeometry(0.3, 0.36, 0.7, 20), M('#ffffff')); hb2.position.y = 0.35; const hw = new T.Mesh(new T.CylinderGeometry(0.28, 0.28, 0.3, 20), M('#8fd3ff', { transparent: true, opacity: 0.8 })); hw.position.y = 0.42; const nz = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 0.15, 12), M('#79dcb4')); nz.position.y = 0.77; hum.add(hb2, hw, nz); }
      const sal = new T.Group(); sal.position.set(-0.6, 1.27, 0.15); tbl.add(sal);
      { const b = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.42, 14), M('#ffffff')); b.position.y = 0.21; const lab = new T.Mesh(new T.CylinderGeometry(0.125, 0.125, 0.16, 14), M('#5ab8ff')); lab.position.y = 0.2; const tip = new T.Mesh(new T.ConeGeometry(0.06, 0.2, 10), M('#ffffff')); tip.position.y = 0.52; sal.add(b, lab, tip); }
      const bulbS = new T.Group(); bulbS.position.set(-0.15, 1.27, 0.25); tbl.add(bulbS);
      { const b = new T.Mesh(new T.SphereGeometry(0.17, 14, 10), M('#8fd3ff')); b.position.y = 0.17; const n2 = new T.Mesh(new T.ConeGeometry(0.06, 0.24, 10), M('#8fd3ff')); n2.position.set(0.2, 0.17, 0); n2.rotation.z = -PI / 2; bulbS.add(b, n2); }
      const thermo = new T.Group(); thermo.position.set(0.15, 1.3, 0.38); tbl.add(thermo);
      { const b = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.5, 8), M('#ffffff')); b.rotation.z = PI / 2; const tp = new T.Mesh(new T.SphereGeometry(0.05, 8, 6), M('#5ab8ff')); tp.position.x = 0.26; const sc = new T.Mesh(new T.BoxGeometry(0.16, 0.05, 0.06), M('#ff9ec0')); sc.position.x = -0.1; thermo.add(b, tp, sc); }
      const mist = []; for (let i = 0; i < 10; i++) { const m2 = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), new T.MeshBasicMaterial({ color: '#e6f6ff', transparent: true, opacity: 0.6 })); scene.add(m2); mist.push(m2); }
      const spark = []; for (let i = 0; i < 8; i++) { const sp = new T.Mesh(new T.OctahedronGeometry(0.08, 0), M('#ffffff', { emissive: '#ffd23f', emissiveIntensity: 0.5 })); sp.visible = false; scene.add(sp); spark.push(sp); }

      /* ===== stage 3: night porch + car seat (x 120) ===== */
      const room3 = CK.room(T, { wall: '#c7b8ff', wain: '#ffb3c6', floor: '#e9b483', rug: false, props: false, winX: 2.6 }); room3.position.x = 120; scene.add(room3);
      room3.userData.win.parent.position.y = 2.6; room3.userData.win.material.map = sky('#3d4bb0', '#8e86e6', (x) => { x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 36, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(186, 70, 32, 0, 7); x.fill(); });
      const seat = new T.Group(); seat.position.set(120.7, 0, 0.1); scene.add(seat);
      const sc1 = M('#5a6b8c'), sc2 = M('#ff9a62');
      const sbase = new T.Mesh(new T.BoxGeometry(1.4, 0.36, 1.3), sc1); sbase.position.y = 0.18; seat.add(sbase);
      const sback = new T.Mesh(new T.BoxGeometry(1.4, 1.5, 0.22), sc1); sback.position.set(0, 0.95, -0.55); sback.rotation.x = -0.18; seat.add(sback);
      for (const s of [-1, 1]) { const sw = new T.Mesh(new T.BoxGeometry(0.14, 0.75, 1.2), sc1); sw.position.set(s * 0.72, 0.6, -0.05); seat.add(sw); const rim = new T.Mesh(new T.BoxGeometry(0.16, 0.08, 1.22), sc2); rim.position.set(s * 0.72, 1.0, -0.05); seat.add(rim); }
      
      const N = {};
      N.lamyai = nb(0, { scale: 1.3, lashes: true });
      N.ngoB = nb(1, { scale: 0.62, round: true, eyeScale: 1.08, bangs: 'baby', capLen: 1.05, backLen: 1.55, top: '#ffd166', bottom: '#ffd166', longSleeve: true, sleeve: '#7b6cff' });
      const coat = new T.Mesh(new T.SphereGeometry(0.58, 28, 18), M('#7b6cff')); bodyOf(N.ngoB).add(coat);
      for (const yy of [0.1, -0.15]) { const q = new T.Mesh(new T.TorusGeometry(0.56 * Math.cos(yy), 0.03, 6, 40), M('#6a5ae8')); q.rotation.x = PI / 2; q.position.y = yy * 0.9; coat.add(q); }
      N.ngo = nb(1, { scale: 0.62, round: true, eyeScale: 1.08, bangs: 'baby', capLen: 1.05, backLen: 1.55, top: '#ffd166', bottom: '#ffd166', longSleeve: true });
      const straps = []; for (const s of [-1, 1]) { const st = new T.Mesh(new T.BoxGeometry(0.1, 0.62, 0.05), M('#2b2f3d')); st.position.set(120.7 + s * 0.16, 0.7, 0.4); scene.add(st); straps.push(st); }
      const buck = new T.Mesh(new T.BoxGeometry(0.2, 0.14, 0.06), M('#ff5f6d')); scene.add(buck);
      const blank = new T.Mesh(new T.BoxGeometry(0.95, 0.06, 0.5), M('#ffffff', { map: dots('#79dcb4', '#e6fff4') })); blank.visible = false; scene.add(blank);

      return { key, hemi, room, room3, VP, ccv, ctx2, clockH: 0, L, puffy, tee, jar, fan, mini, cold, flakes, therm, R2, MT, CX, CZ, mist, hum, spark, N, coat, straps, buck, blank, seat, pur };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.38, dn);
      { const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), Math.max(dn, inB('s9', t) || inB('s10', t) ? 0.6 : 0)); s.room3.userData.wall.material.color.copy(wc); s.room3.userData.floor.material.color.copy(wc); }
      /* window + clock in living room */
      let wk = 'noon', ch = 9;
      if (bt === 's1') { const p = ph('s1', t); wk = p < 0.36 ? 'morn' : p < 0.68 ? 'noon' : 'rain'; ch = p < 0.36 ? 6 + p * 0.5 : p < 0.68 ? 14 + (p - 0.36) * 0.5 : 17 + (p - 0.68) * 0.5; }
      else if (bt === 's8') wk = 'haze'; else if (bt === 'cover' || bt === 's12') { wk = 'morn'; ch = 7; } else if (bt === 's11') { wk = 'morn'; ch = 7.3; }
      s.room.userData.win.material.map = s.VP.win[wk];
      if (Math.abs(ch - s.clockH) > 0.004) { s.clockH = ch; const x = s.ccv.getContext('2d'); x.clearRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 16; x.strokeStyle = '#ff8fab'; x.stroke(); x.fillStyle = '#3a2f3f'; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; x.beginPath(); x.arc(128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92, i % 3 ? 5 : 9, 0, 7); x.fill(); } x.lineCap = 'round'; x.strokeStyle = '#3a2f3f'; const ha = (ch % 12) / 12 * TAU, ma = (ch % 1) * TAU; x.lineWidth = 14; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ha) * 52, 128 - Math.cos(ha) * 52); x.stroke(); x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(ma) * 80, 128 - Math.cos(ma) * 80); x.stroke(); s.ctx2.needsUpdate = true; }

      /* ---------- living room cast ---------- */
      const L = s.L, st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, z, ex: ex || 'happy', y: 0, ry: 0 }, o || {}));
      s.puffy.visible = s.tee.visible = s.jar.visible = false; s.VP.bp.visible = false;
      if (bt === 'cover') { def('mom', -0.9, 0.3, 'worried', { arm1: [1.05, -0.55], armm1: [-1.05, -0.55] }); s.puffy.visible = s.tee.visible = true; }
      else if (bt === 's1') { const p = ph('s1', t); def('mamaP', 1.5, 0.4, p < 0.36 ? 'worried' : p < 0.68 ? 'sick' : 'worried', { x: 1.5 + (p < 0.36 ? 0.03 * Math.sin(t * 40) : 0), ry: -0.15 }); if (p > 0.68) st.mamaP.armsUp = 0.6; }
      else if (bt === 's4') { const p = ph('s4', t), q = SP('s4', 0.5); def('mamaJ', -0.1, 0.6, p < 0.15 ? 'worried' : 'happy', { ry: 0 }); if (t > q) { def('dadJ', 2.2, -0.3, 'happy', { ry: -0.25 }); def('nana', -2.0, 0.5, 'giggle', { ry: 0.25 }); st.mamaJ.wave = p > 0.75; } }
      else if (bt === 's8') { const p = ph('s8', t), q = SP('s8', 0.5); def('mamaM', 2.0, 0.5, 'happy', { ry: -0.3 }); def('wawa', -0.4, 1.0, t > q ? 'giggle' : 'happy', { y: 0.12 }); def('mom', -1.9, 0.1, 'happy', { ry: 0.35 }); if (t > q) st.mom.armm1 = [-1.2, -0.3]; }
      else if (bt === 's11') { def('mamaJ', 0.9, 0.7, 'giggle', { ry: -0.5 }); s.VP.bp.visible = true; def('nana', -1.0, 0.8, 'happy', { wave: true }); def('mom', -2.8, -0.1, 'happy', { ry: 0.3 }); }
      else if (bt === 's12') { def('mom', -1.9, -0.7, 'happy'); def('dadJ', 1.95, -0.7, 'happy'); def('nana', -1.6, 1.4, 'giggle'); def('mamaJ', 0, 1.4, 'giggle'); def('wawa', 1.45, 1.4, 'happy'); const p = ph('s12', t); st.mamaJ.wave = p > 0.2 && p < 0.7; st.mom.wave = p > 0.4; }
      for (const k in L) {
        const g = L[k], q = st[k]; g.visible = !!q; if (!q) continue;
        let y = q.y; if (bt === 's12' && (k === 'mamaJ' || k === 'nana')) y = Math.abs(Math.sin(t * 5 + q.x)) * 0.14;
        g.position.set(q.x, y, q.z); g.rotation.set(0, q.ry, 0); g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.arm1) { g.userData.arm1.rotation.z = q.arm1[0] + 0.05 * Math.sin(t * 3); g.userData.arm1.rotation.x = q.arm1[1]; }
        if (q.armm1) { g.userData['arm-1'].rotation.z = q.armm1[0] - 0.05 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.armm1[1]; }
        if (q.armsUp) { g.userData.arm1.rotation.z = 2.3 + 0.1 * Math.sin(t * 6); g.userData['arm-1'].rotation.z = -2.3 - 0.1 * Math.sin(t * 6 + 1); g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = q.armsUp; }
      }
      /* s4: jacket goes on */
      if (bt === 's4') { const k = U.easeBack(U.clamp((ph('s4', t) - 0.05) / 0.18)); s.VP.jk.scale.setScalar(Math.max(0.01, k)); } else s.VP.jk.scale.setScalar(1);
      const follow = (o, g, h, off) => { g.updateMatrixWorld(true); g.userData[h].getWorldPosition(V3); o.position.copy(V3).add(off); };
      if (bt === 'cover') { follow(s.tee, L.mom, 'hand1', new T.Vector3(0.1, -0.15, 0.2)); follow(s.puffy, L.mom, 'hand-1', new T.Vector3(-0.1, -0.2, 0.2)); s.tee.rotation.z = 0.1 * Math.sin(t * 3); s.puffy.rotation.z = -0.1 * Math.sin(t * 3); }
      s.fan.rotation.z = t * 12; s.pur.visible = true;

      /* ---------- stage 1: waves ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0, u = U.clamp((p - 0.08) / 0.85), w = 0.5 - 0.5 * Math.cos(u * TAU * 2);
        s.cold.position.set(60 - 3.7 + 2.0 * w, 3.0 - 0.6 * w, -0.6); s.cold.scale.setScalar(1 + 0.06 * Math.sin(t * 5)); s.cold.rotation.z = 0.05 * Math.sin(t * 2);
        s.mini.userData.setExpr(w > 0.55 ? 'worried' : 'happy'); s.mini.userData.tick(t, {}); s.mini.position.x = 60.4 + (w > 0.55 ? 0.02 * Math.sin(t * 40) : 0); if (w > 0.55) { s.mini.userData.arm1.rotation.z = 1.4; s.mini.userData['arm-1'].rotation.z = -1.4; s.mini.userData.arm1.rotation.x = s.mini.userData['arm-1'].rotation.x = -1.1; }
        s.flakes.forEach((f, i) => { const a = ((t * 0.6 + i / 16) % 1); f.visible = inB('s2', t) && w > 0.3; f.position.set(s.cold.position.x + 0.8 + a * 3.2, s.cold.position.y - 0.2 - a * 2.0 + 0.3 * Math.sin(i * 3.1), -0.4 + Math.sin(i * 1.7) * 0.6); f.rotation.set(t * 2 + i, t * 3, 0); f.scale.setScalar(Math.sin(a * PI)); });
        const p3 = inB('s3', t) ? ph('s3', t) : t >= end('s3') ? 1 : 0, kb = U.easeOut(U.clamp((p3 - 0.1) / 0.35));
        s.therm.forEach((th) => { th.liq.scale.y = Math.max(0.01, (th.v / 32) * 2.55 * kb); }); }

      /* ---------- stage 2: bedroom ---------- */
      { const R = s.R2; for (const k in R) R[k].visible = false;
        const w = R.wawa; w.visible = bt === 's5'; if (w.visible) { const sc = w.userData.base, hy = w.userData.head.position.y, A = 0.45, Rr = 0.72 * sc, yh = s.MT + 0.12 + 0.55 * Rr; w.position.set(s.CX, yh - hy * sc * Math.sin(A) * 1 + 0.02, s.CZ - 0.55 + hy * sc * Math.cos(A)); w.rotation.set(-PI / 2 + A, 0, 0); w.userData.setExpr('sleepy'); w.userData.tick(t, { breath: 0.3 }); }
        if (bt === 's6') { const q = SP('s6', 0.5); const n = R.nana, m = R.mom; n.visible = m.visible = true;
          n.position.set(-59.9, 0, 0.5); n.rotation.y = 0.3; n.userData.setExpr(t < at('s6') + 2.2 ? 'worried' : 'happy'); n.userData.tick(t, {});
          if (t < at('s6') + 2.2) { n.userData.arm1.rotation.z = -0.15 + 0.12 * Math.sin(t * 16); n.userData.arm1.rotation.x = -0.7; }
          m.position.set(-58.0, 0, 0.0); m.rotation.y = -0.35; m.userData.setExpr('happy'); m.userData.tick(t, {}); m.userData['arm-1'].rotation.z = -0.95 + 0.04 * Math.sin(t * 3); m.userData['arm-1'].rotation.x = -0.7;
          s.jar.visible = true; m.updateMatrixWorld(true); m.userData['hand-1'].getWorldPosition(V3); s.jar.position.copy(V3).add(new T.Vector3(0, 0.12, 0.12)); }
        if (bt === 's7') { const mm = R.mama; mm.visible = true; mm.position.set(-58.6, 0, 0.5); mm.rotation.y = 0.25; mm.userData.setExpr(t < SP('s7', 0.5) ? 'sick' : 'happy'); mm.userData.tick(t, {}); if (t < SP('s7', 0.5)) { mm.userData.arm1.rotation.z = -0.3 + 0.08 * Math.sin(t * 7); mm.userData.arm1.rotation.x = -1.6; } }
        s.mist.forEach((m2, i) => { const a = ((t * 0.45 + i / 10) % 1); m2.visible = bt === 's7'; s.hum.getWorldPosition(V3); m2.position.set(V3.x + Math.sin(i * 2.3 + t) * 0.15 * a, V3.y + 0.85 + a * 1.4, V3.z + Math.cos(i * 1.3) * 0.1); m2.scale.setScalar(0.6 + a * 1.4); m2.material.opacity = 0.65 * Math.sin(a * PI); });
        s.spark.forEach((sp, i) => { const on = bt === 's6' && t > at('s6') + 2.2; sp.visible = on; if (!on) return; const n = R.nana; n.userData.head.getWorldPosition(V3); const a = t * 1.5 + i * TAU / 8; sp.position.set(V3.x + Math.cos(a) * 0.9, V3.y - 0.4 + Math.sin(a * 1.3) * 0.5, V3.z + 0.3 + Math.sin(a) * 0.4); sp.rotation.y = t * 3 + i; sp.scale.setScalar(0.8 + 0.4 * Math.sin(t * 6 + i)); }); }

      /* ---------- stage 3: car seat ---------- */
      { const N = s.N, in9 = inB('s9', t), in10 = inB('s10', t), q = SP('s9', 0.5), fixed = (in9 && t > q + 0.4) || in10;
        N.lamyai.visible = in9 || in10; N.ngoB.visible = (in9 || in10) && !fixed; N.ngo.visible = fixed;
        const by = 0.37 - 0.163 * 0.62 + 0.02;
        for (const g of [N.ngoB, N.ngo]) { if (!g.visible) continue; g.position.set(120.7, by, 0.05); g.rotation.set(-0.12, 0, 0); g.userData.setExpr(g === N.ngoB ? (t > at('s9') + 1.6 ? 'worried' : 'happy') : 'happy'); g.userData.tick(t, {}); g.userData.arm1.rotation.z = 0.9; g.userData['arm-1'].rotation.z = -0.9; }
        const sq = in9 && !fixed ? U.clamp((t - at('s9') - 1.8) / 0.5) : 0; s.coat.scale.setScalar(1 - 0.3 * U.easeOut(sq) * (0.85 + 0.15 * Math.sin(t * 2)));
        const zs = fixed ? 0.34 : 0.47; s.straps.forEach((st2, i) => { st2.position.set(120.7 + (i ? 0.16 : -0.16), 0.62, zs); st2.rotation.set(-0.12, 0, (i ? -1 : 1) * 0.12); }); s.buck.position.set(120.7, 0.42, zs + 0.03);
        s.blank.visible = fixed; if (fixed) { const k = in9 ? U.easeOut(U.clamp((t - q - 0.6) / 0.5)) : 1; s.blank.position.set(120.7, U.lerp(1.6, 0.46, k), 0.44); s.blank.rotation.set(-1.35, 0, 0); }
        const m = N.lamyai; m.position.set(118.3, 0, 0.2); m.rotation.y = 0.45; m.userData.setExpr(in9 && t > at('s9') + 1.6 && !fixed ? 'worried' : 'happy'); m.userData.tick(t, {}); m.userData.arm1.rotation.z = 1.0; m.userData.arm1.rotation.x = -0.9; }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { L: s.L, R2: s.R2, N: s.N, mini: s.mini }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's9' || b === 's10') return ['#3a3570', '#6a4a80']; if (b === 's2' || b === 's3') return ['#cfe6ff', '#fff4e6']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, a, bg, fg, size) => { size = size || 34; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 40; rr(x - w / 2, y - size * 0.95, w, size * 1.9, size * 0.95, bg || '#ffffff', fg ? null : '#ff8fab'); plain(str, x, y + 2, size, fg || '#3a2f3f', 700, 'center'); g.restore(); };
      const mark = (ok, x, y, r) => { g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#3fc77a' : '#ff4d5e'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = r * 0.28; g.lineCap = 'round'; g.beginPath(); if (ok) { g.moveTo(x - r * 0.45, y); g.lineTo(x - r * 0.1, y + r * 0.38); g.lineTo(x + r * 0.5, y - r * 0.38); } else { g.moveTo(x - r * 0.4, y - r * 0.4); g.lineTo(x + r * 0.4, y + r * 0.4); g.moveTo(x + r * 0.4, y - r * 0.4); g.lineTo(x - r * 0.4, y + r * 0.4); } g.stroke(); g.restore(); };
      /* cover: question marks */
      if (b === 'cover') { const [x, y] = wp(S.L.mom.userData.head, 1.15); for (let i = 0; i < 3; i++) { const a = ((t * 0.7 + i / 3) % 1); g.save(); g.globalAlpha = Math.sin(a * PI); txt('?', x - 70 + i * 70, y - a * 70, 56 + i * 6, '#ffd35e', 800); g.restore(); } }
      /* s1: three weather badges + sweat / shiver */
      if (b === 's1') { const p = ph('s1', t), cur = p < 0.36 ? 0 : p < 0.68 ? 1 : 2; [['06:00 เย็น', '#8fc9ff'], ['14:00 ร้อน', '#ff9a62'], ['17:00 ฝน', '#9fa8c8']].forEach(([s2, c], i) => { const a = U.clamp((p - [0.04, 0.36, 0.68][i]) / 0.06); if (a <= 0) return; const x = 210 + i * 330; g.save(); g.globalAlpha = a; rr(x - 150, 520, 300, 84, 42, i === cur ? c : 'rgba(255,255,255,.85)', i === cur ? '#ffffff' : c); plain(s2, x, 564, 40, i === cur ? '#ffffff' : '#3a2f3f', 800, 'center'); g.restore(); });
        const [hx, hy] = wp(S.L.mamaP.userData.head, 0.2); if (cur === 1) for (let i = 0; i < 3; i++) { const a = ((t * 0.9 + i / 3) % 1); g.save(); g.globalAlpha = Math.sin(a * PI); g.fillStyle = '#5ab8ff'; g.beginPath(); const x = hx + (i - 1) * 70, y = hy - 40 + a * 60; g.moveTo(x, y - 18); g.quadraticCurveTo(x + 13, y + 4, x, y + 10); g.quadraticCurveTo(x - 13, y + 4, x, y - 18); g.fill(); g.restore(); }
        if (cur === 0) { g.save(); g.globalAlpha = 0.9; txt('บรื๋อ~', hx + 120, hy - 70, 40, '#ffffff', 800); g.restore(); } }
      /* s2: labels */
      if (b === 's2') { const p = ph('s2', t), u = U.clamp((p - 0.08) / 0.85), w = 0.5 - 0.5 * Math.cos(u * TAU * 2); const [x, y] = proj(new T.Vector3(60 - 3.7 + 2.0 * w, 4.3 - 0.6 * w, -0.6)); txt('ลมเย็นจากจีน', Math.max(190, x), y, 40, '#ffffff', 800); const wave = u < 0.5 ? 1 : 2; if (w > 0.6) { const [hx, hy] = proj(new T.Vector3(62.2, 2.6, -0.8)); tag('ระลอก ' + wave, hx, hy, U.clamp((w - 0.6) / 0.2), '#5ab8ff', '#ffffff', 38); } }
      /* s3: thermometer labels */
      if (b === 's3') { const p = ph('s3', t), kb = U.easeOut(U.clamp((p - 0.1) / 0.35)); [[70.6, 'กทม.', [19, 21]], [73.4, 'เหนือ/อีสานบน', [10, 12]]].forEach(([x0, nm, [lo, hi]], i) => { const th = (i ? 11 : 20); let [x, y] = proj(new T.Vector3(x0, 0.6 + (th / 32) * 2.55 * kb, 0)); if (kb > 0.05) txt(Math.round(lo * kb) + '–' + Math.round(hi * kb) + '°C', x + (i ? 0 : 0), y - 50, 54, i ? '#5ab8ff' : '#ff8f5a', 800); [x, y] = proj(new T.Vector3(x0, 0.55, 0.6)); txt(nm, x, y + 150, 42, '#ffffff', 800); }); }
      /* s4: layer badges */
      if (b === 's4' && t > SP('s4', 0.5)) { const a = U.clamp((t - SP('s4', 0.5) - 0.3) / 0.4); let [x, y] = wp(S.L.dadJ.userData.head, 1.1); tag('ผู้ใหญ่ 2 ชั้น', x - 20, y - 20, a, '#ffffff', null, 34); [x, y] = wp(S.L.nana.userData.head, 1.0); tag('เด็กเล็ก 3 ชั้น', x + 30, y - 20, a, '#ffd35e', '#3a2f3f', 34); }
      /* s5: room temp + TOG table */
      if (b === 's5') { const q = SP('s5', 0.5); if (t > q) { const a = U.clamp((t - q - 0.1) / 0.3); g.save(); g.globalAlpha = a; rr(80 + LD, 390, 920 - 2 * LD, 300, 30, 'rgba(255,255,255,.9)', '#b39dff'); [['ห้อง 24°C ขึ้นไป', '0.5 TOG (บาง)'], ['ห้อง 20–24°C', '1.0 TOG (กลาง)']].forEach(([l, r], i) => { const yy = 455 + i * 84, ai = U.clamp((t - (MK.s5 ? TM('s5', i, 0) : q + 0.3 + i * 0.6)) / 0.3); g.globalAlpha = a * ai; plain(l, 130 + LD, yy, Math.round(42 * LF), '#3a2f3f', 700); plain('→ ' + r, 950 - LD, yy, Math.round(42 * LF), '#7b5cff', 800, 'right'); }); g.globalAlpha = a; plain('แนวทางทั่วไปของผู้ผลิต · จับต้นคอ อุ่นแต่ไม่มีเหงื่อ', 540, 640, Math.round(30 * LF), '#6a4a60', 600, 'center'); g.restore(); }
        else { const [x, y] = proj(new T.Vector3(-60.9, 2.35, -4.2)); tag('23°C', x + 110, y, U.clamp((ph('s5', t) - 0.15) / 0.1), '#ffffff', null, 36); } }
      /* s6: dry flakes */
      if (b === 's6' && t < at('s6') + 2.2) { const [x, y] = wp(S.R2.nana.userData.arm1, 0); for (let i = 0; i < 5; i++) { const a = ((t * 1.3 + i / 5) % 1); g.save(); g.globalAlpha = Math.sin(a * PI); g.fillStyle = '#ffffff'; g.fillRect(x + 20 + Math.sin(i * 2.7) * 30, y + 10 + a * 50, 8, 8); g.restore(); } }
      if (b === 's6' && t > SP('s6', 0.5)) { const a = U.clamp((t - SP('s6', 0.5)) / 0.3); const [x, y] = proj(new T.Vector3(-56.9, 1.4, 0)); tag('5–10 นาที', x, y, a, '#5ab8ff', '#ffffff', 38); }
      /* s7: prop labels */
      if (b === 's7') { const p = ph('s7', t), q = SP('s7', 0.5); const lab = [['น้ำเกลือ', -57.0, 1.9, 0.45], ['ลูกยาง', -56.5, 1.75, 0.6], ['ปรอท', -56.1, 1.75, 0.75]]; if (t < q) lab.forEach(([s2, x0, y0, k0], i) => { const a = U.clamp((t - TM('s7', i, 0.15 + i * 0.08)) / 0.3); if (a <= 0) return; const [x, y] = proj(new T.Vector3(x0, y0, -0.1 + (i - 1) * 0.15)); tag(s2, x, y - 40 - (i % 2) * 70, a, '#ffffff', null, 30); }); else { const a = U.clamp((t - q) / 0.3); const [x, y] = proj(new T.Vector3(-55.95, 2.45, -0.65)); tag('ไอเย็น', x + 40, y - 70, a, '#3fc77a', '#ffffff', 36); mark(true, x - 100, y - 70, 30 * a + 0.1); } }
      /* s8: PM label + no-mask */
      if (b === 's8') { const q = SP('s8', 0.5); const [x, y] = proj(new T.Vector3(3.4, 3.1, -4.2)); tag('PM2.5', x, y, U.clamp((ph('s8', t) - 0.1) / 0.1), '#b0895f', '#ffffff', 36); if (t > q) { const a = U.clamp((t - q - 0.2) / 0.3); const [wx, wy] = wp(S.L.wawa.userData.head, 0.75); tag('< 2 ขวบ ไม่ใส่หน้ากาก', wx + 40, wy - 30, a, '#ffffff', null, 30); const [px, py] = proj(new T.Vector3(-3.0, 1.9, -2.2)); tag('ฟอกอากาศ', px + 30, py - 20, a, '#3fc77a', '#ffffff', 30); } }
      /* s9: car seat marks */
      if (b === 's9') { const q = SP('s9', 0.5), [x, y] = proj(new T.Vector3(121.6, 1.4, 0.3)); if (t < q + 0.4) { const a = U.clamp((t - at('s9') - 1.6) / 0.3); if (a > 0) { mark(false, x + 60, y - 30, 38 * U.easeBack(a)); const sq = U.clamp((t - at('s9') - 1.8) / 0.5); if (sq > 0.3) { g.save(); g.globalAlpha = sq; txt('สายหลวม!', Math.min(x + 60, 950), y - 110, 40, '#ff4d5e', 800); g.restore(); } } } else { const a = U.clamp((t - q - 0.9) / 0.3); mark(true, x + 60, y - 30, 38 * U.easeBack(a) + 0.1); } }
      /* s10: list */
      if (b === 's10') {
        const p = ph('s10', t), a0 = U.clamp((p - 0.04) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 500, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const LI = ['เสื้อพองหนา ใต้สายคาร์ซีท', 'ผ้าห่มหนา หมอน ตุ๊กตา ในเปลทารก', 'ฮีตเตอร์ / เครื่องทำไอร้อน ใกล้เตียง'];
        LI.forEach((s2, i) => { const a = U.clamp((t - TM('s10', i, 0.1 + i * 0.11)) / 0.35); if (a <= 0) return; const y = 395 + i * 80; g.save(); g.globalAlpha = a; mark(false, 122 + LD, y, 24); plain(s2, 162 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        const a3 = U.clamp((t - TM('s10', 3, 0.48)) / 0.35); if (a3 > 0) { g.save(); g.globalAlpha = a3; rr(90 + LD, 620, 900 - 2 * LD, 150, 24, '#ff4d5e'); plain('ทารกผิวแดงและเย็น ซึม ไม่มีแรง', 540, 664, Math.round(38 * LF), '#ffffff', 700, 'center'); plain('รีบพาไป รพ. หรือโทร 1669', 540, 728, Math.round(44 * LF), '#ffd35e', 800, 'center'); g.restore(); }
        g.save(); g.globalAlpha = a0; plain('ที่มา: AAP, CDC', 540, 800, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s11: checklist */
      if (b === 's11') {
        const p = ph('s11', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const LI = ['เสื้อคลุมบาง (ลูกถอดเองได้)', 'กระติกน้ำ', 'ลิปบาล์ม', 'หน้ากากกันฝุ่น (2 ขวบขึ้นไป)', 'เสื้อกันฝน หรือร่มพับ'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s11', i, 0.1 + i * 0.16)) cur = i;
        LI.forEach((s2, i) => { const a = U.clamp((t - TM('s11', i, 0.1 + i * 0.16)) / 0.3); if (a <= 0) return; const y = 380 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); mark(true, 130 + LD, y, 26); plain(s2, 176 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[72, ['หน้าหนาวไทย มาวันไหนไม่รู้', '#fff']], [72, ['ของใช้ลูกต้องมีอะไรบ้าง?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: end('s1') - 0.05, y: 290, lines: [[66, ['วันเดียว เจอ 3 อากาศ', '#fff']], [48, ['เช้าเย็น บ่ายร้อน เย็นฝนตก', '#ffe3ea', 600]]] },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 290, lines: [[64, ['ลมเย็นมาเป็นระลอก', '#fff']], [48, ['มาแล้วถอย แล้วมาใหม่ เดาวันยาก', '#ffe3ea', 600]]] },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.55), y: 290, lines: [[62, ['ปีนี้ หนาวน้อยกว่าปีก่อน', '#fff']], [46, ['อุณหภูมิต่ำสุดที่คาดไว้', '#ffe3ea', 600]]], foot: 'ที่มา: กรมอุตุนิยมวิทยา (ประกาศ 14 ต.ค. 2569)' },
      { t0: SP('s3', 0.55) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[58, ['ไม่ต้องซื้อเสื้อหนาวตัวโต', '#fff']], [54, ['เลือกของที่ปรับได้', '#ffd35e']]], foot: 'หนาวสุด: ปลาย ธ.ค. – ต้น ก.พ.' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[58, ['① เสื้อคลุมบาง แบบซิปหน้า', '#ffd35e']], [46, ['หนาวใส่ ร้อนถอด ลูกถอดเองได้', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[54, ['เด็กเล็ก ใส่มากกว่าผู้ใหญ่ 1 ชั้น', '#fff']], [46, ['หลายชั้นบาง ดีกว่าตัวเดียวหนา', '#ffe3ea', 600]]], foot: 'ที่มา: American Academy of Pediatrics (AAP)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[60, ['② ถุงนอนแบบสวม', '#ffd35e']], [44, ['ใช้แทนผ้าห่มหนา หมอน หมวก ในเปล', '#fff', 600]]], foot: 'ทารกนอนหงาย เปลโล่ง (AAP)' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 280, lines: [[54, ['เลือกความหนา ตามอุณหภูมิห้อง', '#fff']]] },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[56, ['③ โลชั่น/บาล์ม ไม่มีน้ำหอม', '#ffd35e']], [44, ['+ ปิโตรเลียมเจลลี่ ทาปาก แก้มแห้ง', '#fff', 600]]] },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[54, ['อาบน้ำอุ่น ไม่ร้อน ไม่นาน', '#fff']], [46, ['ซับตัวเบาๆ แล้วทาครีมทันที', '#ffe3ea', 600]]], foot: 'ที่มา: American Academy of Dermatology' },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.5), y: 290, lines: [[58, ['④ จมูกแห้ง น้ำมูก ไข้', '#ffd35e']], [44, ['น้ำเกลือหยดจมูก ลูกยางดูดน้ำมูก', '#fff', 600]], [44, ['ปรอทวัดไข้', '#fff', 600]]] },
      { t0: SP('s7', 0.5) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[52, ['เครื่องเพิ่มความชื้น ใช้แบบไอเย็น', '#fff']], [46, ['แบบไอร้อน เสี่ยงลวกมือลูก', '#ffe3ea', 600]]], foot: 'ที่มา: AAP, Mayo Clinic' },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[56, ['⑤ หน้ากากกันฝุ่นสำหรับเด็ก', '#ffd35e']], [46, ['หน้าหนาว ลมนิ่ง ฝุ่นมักสูง', '#fff', 600]]], foot: 'เช็กค่าฝุ่นก่อนออกจากบ้าน: แอป Air4Thai' },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[54, ['ต่ำกว่า 2 ขวบ ไม่ควรใส่หน้ากาก', '#fff']], [44, ['อยู่ห้องปิด เปิดเครื่องฟอกอากาศแทน', '#ffe3ea', 600]]], foot: 'ที่มา: AAP, กระทรวงสาธารณสุข' },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.5), y: 290, lines: [[56, ['เสื้อพองหนา ใต้สายคาร์ซีท', '#fff']], [46, ['ชนแล้วเสื้อยุบ สายหลวม หลุดได้', '#ffe3ea', 600]]] },
      { t0: SP('s9', 0.5) + 0.02, t1: end('s9') - 0.05, y: 290, lines: [[56, ['ถอดเสื้อพอง รัดสายให้แน่น', '#ffd35e']], [46, ['แล้วค่อยห่มเสื้อหรือผ้าทับ', '#fff', 600]]], foot: 'ที่มา: AAP "Buckle, don\'t bundle"' },
      { t0: at('s10') + 0.2, t1: end('s10') - 0.05, y: 250, lines: [[60, ['ระวัง! ของที่ไม่ควรใช้', '#ffd35e']]] },
      { t0: at('s11') + 0.2, t1: end('s11') - 0.05, y: 250, lines: [[60, ['เช็กลิสต์ กระเป๋าไปโรงเรียน', '#ffd35e']]] },
      { t0: at('s12') + 0.2, t1: end('s12'), y: 290, lines: [[60, ['หนาวมาวันไหน ก็ไม่หวั่น', '#fff']], [42, ['ของใช้หน้าหนาวชิ้นไหน ที่ลูกคุณขาดไม่ได้?', '#ffe3ea', 600]]], foot: 'ข้อมูล: กรมอุตุฯ 2569, AAP, AAD, CDC' },
    ],
    trans,
    audio: [
      [0.4, 'whoosh'], [0.9, 'boing'],
      [at('s1') + 0.3, 'pop'], [P('s1', 0.1), 'breath'], [P('s1', 0.36), 'ding'], [P('s1', 0.5), 'pop'], [P('s1', 0.68), 'rain'], [P('s1', 0.75), 'boing'],
      [at('s2') + 0.3, 'whoosh'], [P('s2', 0.33), 'shimmer'], [P('s2', 0.75), 'shimmer'],
      [at('s3') + 0.4, 'riser'], [P('s3', 0.45), 'ding'], [SP('s3', 0.55), 'pop'],
      [at('s4') + 0.3, 'whoosh'], [P('s4', 0.12), 'pop'], [SP('s4', 0.5), 'pop'], [SP('s4', 0.5) + 0.4, 'giggle'],
      [at('s5') + 0.4, 'twinkle'], [SP('s5', 0.5), 'pop'], [SP('s5', 0.5) + 0.4, 'tick'], [SP('s5', 0.5) + 1.0, 'tick'],
      [at('s6') + 0.5, 'boing'], [at('s6') + 2.2, 'shimmer'], [SP('s6', 0.5), 'bubble'],
      [at('s7') + 0.4, 'sneeze'], [P('s7', 0.25), 'pop'], [SP('s7', 0.5), 'bubble'], [SP('s7', 0.5) + 0.3, 'ding'],
      [at('s8') + 0.4, 'whoosh'], [P('s8', 0.2), 'cough'], [SP('s8', 0.5), 'pop'], [SP('s8', 0.5) + 0.5, 'giggle'],
      [at('s9') + 0.3, 'heartbeat'], [at('s9') + 1.6, 'warn'], [at('s9') + 1.9, 'thud'], [SP('s9', 0.5) + 0.4, 'pop'], [SP('s9', 0.5) + 0.9, 'ding'],
      [at('s10') + 0.3, 'heartbeat'], [TM('s10', 0, 0.1), 'tick'], [TM('s10', 1, 0.21), 'tick'], [TM('s10', 2, 0.32), 'tick'], [TM('s10', 3, 0.48), 'warn'],
      [TM('s11', 0, 0.1), 'ding'], [TM('s11', 1, 0.26), 'tick'], [TM('s11', 2, 0.42), 'tick'], [TM('s11', 3, 0.58), 'tick'], [TM('s11', 4, 0.74), 'tick'],
      [at('s12') + 0.3, 'twinkle'], [at('s12') + 1.2, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s3'), CK.MUSIC.OOPS), CK.musicBed(at('s3'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), at('s11'), CK.MUSIC.NIGHT), CK.musicBed(at('s11'), at('s12'), CK.MUSIC.CUTE), CK.musicBed(at('s12'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
