/* พ่อแม่หัวจะปวด — ยุคนี้ มีลูกกี่คนดี ห่างกันกี่ปี (ป้ามะขามถาม → เด็กเกิด 569k→417k → ลูกคนเดียว Polit & Falbo → 4 ข้อถามตัวเอง → WHO 24 เดือน ไม้บรรทัดเวลา → <6 ด./>5 ปี JAMA 2006 (night) → ปรึกษาแพทย์ก่อนท้อง (night) → 3 ระยะห่าง → 5 ทิป → ครอบครัวที่ดีไม่ได้วัดจากจำนวน)
   Build: node build.js mi-luk-kee-khon.js review-mi-luk-kee-khon.html --kit clay --title "ยุคนี้ มีลูกกี่คนดี ห่างกันกี่ปี" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.4], ['s1', 7.5], ['s2', 7.5], ['s3', 8], ['s4', 9], ['s5', 7.5], ['s6', 7.5], ['s7', 9], ['s8', 9], ['s9', 6], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's9'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const LX = -60, NX = 60, RX = 120;
  const SH = {
    cover: [[0, FW(0.35, 0, 6.6, 4.15, 0.16)], [1, FW(0.35, 0, 6.3, 4.15, 0.16)]],
    s1: [[0, FW(LX, 0, 8.2, 5.0 - 0.9 * R1, 0.12)], [1, FW(LX, 0, 7.9, 5.0 - 0.9 * R1, 0.12)]],
    s2: [[0, FW(0.25, 0.4, 5.8, 3.3, 0.14)], [1, FW(0.25, 0.4, 5.5, 3.3, 0.14)]],
    s3: [[0, FW(0.15, -0.4, 6.2, 5.7, 0.14)], [1, FW(0.15, -0.4, 6.0, 5.7, 0.14)]],
    s4: [[0, FW(NX - 0.5, 0, 9.4, 5.2 - 0.8 * R1, 0.3)], [1, FW(NX - 0.5, 0, 9.1, 5.2 - 0.8 * R1, 0.3)]],
    s5: [[0, FW(0.15, -0.4, 6.2, 5.8, 0.14)], [1, FW(0.15, -0.4, 5.9, 5.8, 0.14)]],
    s6: [[0, FW(0.15, -0.4, 6.4, 5.9, 0.14)], [1, FW(0.15, -0.4, 6.2, 5.9, 0.14)]],
    s7: [[0, FW(RX, 0, 9.6, 2.7 - 0.9 * R1, 0.14)], [1, FW(RX, 0, 9.3, 2.7 - 0.9 * R1, 0.14)]],
    s8: [[0, FW(0.15, -0.4, 7.2, 6.7, 0.22)], [1, FW(0.15, -0.4, 7.0, 6.7, 0.22)]],
    s9: [[0, FW(0, 0, 9.8, 4.4, 0.2)], [1, FW(0, 0, 9.2, 4.4, 0.2)]],
  };
  const CUT = new Set(ORDER.filter((k) => k !== 'cover' && k !== 's6'));
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s5') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };

  /* timeline: months after birth -> x */
  const TL0 = NX - 3.6, TLW = 7.2, TLM = 72, mx = (m) => TL0 + Math.min(m, TLM) / TLM * TLW;
  const BIRTHS = [['2563', 569338], ['2566', 517934], ['2568', 416574]];
  const BH = BIRTHS.map((b) => 3.0 * b[1] / 569338);
  const PC2 = ['#ff8fab', '#b9a4f0', '#79dcb4'];
  const PX = [RX - 2.9, RX, RX + 2.9], KS = [0.62, 0.8, 1.05];

  VE.run({
    DUR, file: 'mi-luk-kee-khon', title: 'ยุคนี้ มีลูกกี่คนดี ห่างกันกี่ปี', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'วางแผนครอบครัว', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); { const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(-0.4, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(-0.4, 1.0, -3.7); sofa.add(seat, back); } scene.add(sofa);
      /* toy blocks for s2 */
      const blocks = []; const BC = ['#ff6f91', '#ffd23f', '#5ab8ff', '#79dcb4', '#b9a4ff'];
      for (let i = 0; i < 5; i++) { const b = new T.Mesh(new T.BoxGeometry(0.42, 0.42, 0.42), M(BC[i])); b.userData.p = [0.15 + (i % 2) * 0.46 - 0.2, 0.21 + Math.floor(i / 2) * 0.43, 1.25]; scene.add(b); blocks.push(b); }
      const ball = new T.Mesh(new T.SphereGeometry(0.3, 20, 16), M('#ff9a4d')); scene.add(ball);
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      const nb = (i, ex) => { const g = CK.neighbor(T, i, ex); g.userData.base = ex.scale; scene.add(g); return g; };
      C.makham = nb(1, { scale: 1.26, hairStyle: 'short', hair: '#4a3a3a', lashes: true, top: '#c45cd6', bottom: '#5a4a7a' });
      C.lmom = nb(0, { scale: 1.26, hairStyle: 'bob', hair: '#2b2b33', lashes: true, top: '#5cc99a', bottom: '#6b5a8f' });
      C.linji = nb(2, { scale: 0.8, hairStyle: 'pigtails', bow: '#ff4f7b', top: '#ff7a8a', bottom: '#fff1a8', hair: '#3a2a22' });

      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 10; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 2.6, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      /* ===== stage L: births bars (x = -60) ===== */
      const platL = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M('#ff6f9f')); platL.position.set(LX, -0.15, 6); scene.add(platL);
      const wallL = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT('#ffd1e3', '#ffffff', [8, 4]) })); wallL.position.set(LX, 4.5, -4); scene.add(wallL);
      const BXS = [LX - 2.4, LX, LX + 2.4];
      const bars = BXS.map((x, i) => { const b = CK.bar(T, 1.7, 1.3, ['#ff8fab', '#ffb36b', '#b9a4f0'][i]); b.position.set(x, 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const bw = BXS.map(() => { const g = CK.family(T, 'wawa'); g.userData.base = g.scale.x; scene.add(g); return g; });

      /* ===== stage N: spacing ruler (x = 60) ===== */
      const platN = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M('#7aa9e8')); platN.position.set(NX, -0.15, 6); scene.add(platN);
      const wallN = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT('#a8d4ff', '#ffffff', [8, 4]) })); wallN.position.set(NX, 4.5, -4); scene.add(wallN);
      const ZONES = [[0, 6, '#ff5f6d'], [6, 18, '#ffb347'], [18, 59, '#4fd18b'], [59, 72, '#ffb347']];
      const segs = ZONES.map(([a, b, c]) => { const m = new T.Mesh(new T.BoxGeometry((b - a) / TLM * TLW, 0.36, 1.1), M(c)); m.position.set((mx(a) + mx(b)) / 2, 0.18, 0); m.userData.h = 1; scene.add(m); return m; });
      const tw = [CK.family(T, 'wawa'), CK.family(T, 'wawa')]; tw.forEach((g) => { g.userData.base = g.scale.x; scene.add(g); });
      const flag = new T.Group(); { const pole = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 1.4, 10), M('#ffffff')); pole.position.y = 0.7; flag.add(pole); const fl = new T.Mesh(new T.BoxGeometry(0.6, 0.38, 0.05), M('#ffd23f')); fl.position.set(0.3, 1.2, 0); flag.add(fl); } scene.add(flag);

      /* ===== stage R: 3 spacing pairs (x = 120) ===== */
      const platR = new T.Mesh(new T.BoxGeometry(20, 0.3, 24), M('#ff9a4d')); platR.position.set(RX, -0.15, 6); scene.add(platR);
      const wallR = new T.Mesh(new T.BoxGeometry(20, 10, 0.3), M('#ffffff', { map: dotT('#ffe0b8', '#ffffff', [9, 4]) })); wallR.position.set(RX, 4.5, -4); scene.add(wallR);
      const PC = ['#ff8fab', '#b9a4f0', '#79dcb4'];
      PX.forEach((x, i) => { const p = new T.Mesh(new T.CylinderGeometry(1.2, 1.25, 0.5, 32), M(PC[i])); p.position.set(x, 0.25, 0); scene.add(p); });
      const pk = KS.map((s, i) => nb(i === 1 ? 3 : 1, { scale: s, top: ['#5ab8ff', '#ff9a62', '#5cc99a'][i], bottom: ['#fff1a8', '#bfeedd', '#ffd6e4'][i], hairStyle: ['tuft', 'bob', 'short'][i] }));
      const pb = PX.map(() => { const g = CK.family(T, 'wawa'); g.userData.base = g.scale.x; scene.add(g); return g; });

      return { key, hemi, room, C, blocks, ball, hearts, bars, bw, segs, tw, flag, pk, pb };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'makham', 'lmom', 'linji'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      let heartsOn = false, heartsT0 = 0, hBase = [0, 3, 0.8];
      if (bt === 'cover') {
        def('makham', -1.75, 0.1, 'happy', { ry: 0.45, a2: [0.9 + 0.25 * Math.sin(t * 8), -0.9] });
        def('lmom', 0.75, 0, 'worried', { ry: -0.3 });
        def('linji', 2.5, 0.7, 'worried', { ry: -0.35, y: Math.abs(Math.sin(t * 3)) * 0.03 });
      } else if (bt === 's2') {
        const p = ph('s2', t), q = SP('s2', 0.5), hap = t > q;
        def('linji', -1.35, 0.6, hap ? 'giggle' : 'happy', { ry: 0.35, y: hap ? Math.abs(Math.sin(t * 6)) * 0.12 : 0, wave: hap });
        def('mama', 0.35, 0.3, hap ? 'giggle' : 'happy', { y: Math.abs(Math.sin(t * 6 + 1)) * (hap ? 0.15 : 0.04) });
        def('nana', 1.95, 0.6, 'giggle', { ry: -0.35, y: Math.abs(Math.sin(t * 5 + 2)) * 0.06 });
        if (hap) { heartsOn = true; heartsT0 = q; hBase = [0.3, 2.2, 1.0]; }
      } else if (bt === 's3') {
        const q = ph('s3', t);
        def('mom', -1.05, -0.3, q > 0.75 ? 'happy' : 'worried', { ry: 0.25, a1: [-0.3, -0.9] });
        def('dad', 1.3, -0.3, q > 0.75 ? 'happy' : 'worried', { ry: -0.25, a2: [0.3, -0.9] });
        if (q > 0.2 && q < 0.75) st.dad.rx = 0.03 * Math.sin(t * 4);
      } else if (bt === 's5' || bt === 's6') {
        def('mom', -1.05, -0.3, 'worried', { ry: 0.3 });
        def('dad', 1.3, -0.3, 'worried', { ry: -0.3, a2: bt === 's6' ? [0.6, -0.4] : null });
      } else if (bt === 's8') {
        def('mom', -1.05, -0.3, 'happy', { ry: 0.25, wave: ph('s8', t) < 0.12 });
        def('dad', 1.3, -0.3, 'happy', { ry: -0.25 });
      } else if (bt === 's9') {
        heartsOn = true; heartsT0 = at('s9') + 0.5; hBase = [0, 3.6, 0.9];
        def('mom', -3.15, -0.7, 'happy', { ry: 0.15 });
        def('dad', 0.75, -0.7, 'happy', { ry: -0.1, wave: ph('s9', t) > 0.3 });
        def('nana', -2.85, 1.4, 'giggle', { ry: 0.2 });
        def('mama', -1.25, 1.4, 'giggle', { y: Math.abs(Math.sin(t * 5)) * 0.1 });
        def('wawa', 0.3, 1.4, 'giggle', {});
        def('lmom', 3.25, -0.7, 'happy', { ry: -0.2 });
        def('linji', 2.3, 1.4, 'giggle', { ry: -0.15, wave: ph('s9', t) > 0.2 });
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave }); g.userData.arm1.scale.y = 1; g.userData['arm-1'].scale.y = 1;
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base);
      }
      /* s2 toys */
      const toys = bt === 's2';
      s.blocks.forEach((b, i) => { b.visible = toys; if (!toys) return; const u = b.userData.p, k = U.clamp((t - at('s2') - 0.3 - i * 0.35) / 0.3); b.position.set(u[0] - 0.4, u[1] + (1 - U.easeOut(k)) * 1.5, u[2]); b.rotation.y = 0.2 * i; b.scale.setScalar(Math.max(0.01, k)); });
      s.ball.visible = toys; if (toys) { const w = (t - at('s2')) * 2.2; s.ball.position.set(1.1 + 0.6 * Math.sin(w), 0.3 + Math.abs(Math.sin(w * 2)) * 0.5, 1.6); }
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(hBase[0] + u[0], hBase[1] + a * 2.0, hBase[2]); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });

      /* ---------- s1 bars ---------- */
      { const p = inB('s1', t) ? ph('s1', t) : t > end('s1') ? 1 : 0;
        s.bars.forEach((b, i) => { const k = U.easeOut(U.clamp((p - 0.08 - i * 0.16) / 0.25)); b.scale.y = Math.max(0.01, BH[i] * k); const g = s.bw[i]; g.position.set(b.position.x, b.scale.y, 0.15); g.visible = k > 0.02; g.scale.setScalar(g.userData.base * 1.1 * Math.max(0.01, U.easeBack(U.clamp(k * 1.5))));
          g.userData.setExpr(i === 2 && t > SP('s1', 0.6) ? 'worried' : 'happy'); g.userData.tick(t, {}); }); }

      /* ---------- s4 ruler ---------- */
      { const on = inB('s4', t), p = on ? ph('s4', t) : 0, q = SP('s4', 0.5);
        const k0 = U.easeBack(U.clamp((p - 0.03) / 0.12));
        s.segs.forEach((m) => { m.visible = on; m.scale.set(1, Math.max(0.01, k0), 1); });
        s.flag.visible = on && t > q; s.flag.position.set(mx(24), 0.36, 0.25); s.flag.scale.setScalar(Math.max(0.01, U.easeBack(U.clamp((t - q) / 0.4))));
        const months = t < q ? U.lerp(0, 4, U.easeIO(U.clamp((p - 0.12) / 0.2))) : U.lerp(4, 24, U.easeIO(U.clamp((t - q) / 1.2)));
        s.__months = months;
        s.tw.forEach((g, i) => { g.visible = on && k0 > 0.05; if (!g.visible) return; const x = i === 0 ? mx(0) - 0.55 : mx(months) + 0.6, hop = i === 1 ? Math.abs(Math.sin(t * 9)) * 0.18 * ((t > q && t < q + 1.2) || (p > 0.12 && p < 0.32) ? 1 : 0) : 0;
          g.position.set(x, 0.36 + hop, 0.05); g.rotation.set(0, i === 0 ? 0.3 : -0.2, 0); g.scale.setScalar(g.userData.base * 1.15 * k0);
          g.userData.setExpr(i === 1 ? (t < q && p > 0.3 ? 'worried' : 'giggle') : 'happy'); g.userData.tick(t, { wave: i === 0 && t > q + 1.2 }); }); }

      /* ---------- s7 pairs ---------- */
      { const on = inB('s7', t);
        PX.forEach((x, i) => { const k = U.clamp((t - TM('s7', i, 0.08 + i * 0.27)) / 0.35), kid = s.pk[i], bb = s.pb[i];
          kid.visible = bb.visible = on && k > 0.01; if (!kid.visible) return;
          const sc = Math.max(0.01, U.easeBack(k));
          kid.position.set(x - 0.5, 0.5 + (i === 0 ? Math.abs(Math.sin(t * 7)) * 0.1 : 0), -0.15); kid.rotation.set(0, 0.25, 0); kid.scale.setScalar(KS[i] * sc);
          kid.userData.setExpr(i === 0 ? 'giggle' : 'happy'); kid.userData.tick(t, { wave: i === 2 });
          if (i === 2) { kid.userData['arm-1'].rotation.z = -0.5; kid.userData['arm-1'].rotation.x = -0.9; }
          bb.position.set(x + 0.55, 0.5, 0.45); bb.rotation.set(0, -0.3, 0); bb.scale.setScalar(bb.userData.base * sc);
          bb.userData.setExpr(i === 0 ? 'cry' : 'happy'); bb.userData.tick(t, {}); }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, bw: s.bw, tw: s.tw, pk: s.pk, pb: s.pb, months: s.__months }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's4') return ['#a8d8ff', '#e3f3ff']; if (b === 's7') return ['#ffd8a8', '#fff4e6']; if (b === 's5' || b === 's6') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, a, fill, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const C = S.C;
      if (b === 'cover') { const [x, y] = wp(C.makham.userData.head, 0, 0.95); bubble('ลูกคนเดียวพอเหรอ? เมื่อไหร่จะมีน้อง?', x + 160, y - 70, U.clamp((t - 0.2) / 0.3), 38); }
      /* s1: year tags + counters */
      if (b === 's1') { const p = ph('s1', t);
        S.bw.forEach((w, i) => { const a = U.clamp((p - 0.1 - i * 0.16) / 0.12); if (a <= 0) return; const kk = U.clamp((p - 0.08 - i * 0.16) / 0.25);
          let [x, y] = proj(new T.Vector3([LX - 2.4, LX, LX + 2.4][i], 0, 0.7)); tag('ปี ' + BIRTHS[i][0], x, y + 44, 40, a, ['#ffd6e4', '#ffe5c9', '#e6dcff'][i]);
          [x, y] = wp(w.userData.head, 0, 0.95); g.save(); g.globalAlpha = a; txt(Math.round(BIRTHS[i][1] * U.easeOut(kk)).toLocaleString('en-US'), x, y - 30, 46, i === 2 ? '#ffd35e' : '#ffffff', 800); g.restore(); });
        const a3 = U.clamp((t - SP('s1', 0.6)) / 0.35); if (a3 > 0) { const [x, y] = wp(S.bw[2].userData.head, 0, 0.95); g.save(); g.globalAlpha = a3; g.translate(x - 30, y - 140); const sc = 0.8 + 0.2 * U.easeBack(a3); g.scale(sc, sc); rr(-150, -50, 300, 100, 50, '#ff5f86', '#ffffff'); plain('ต่ำสุดรอบ 75 ปี', 0, 4, 40, '#ffffff', 800, 'center'); g.restore(); } }
      /* s3: 4 questions */
      if (b === 's3') { const L = [['💰', 'เงินพอไหม'], ['⏰', 'เวลาพอไหม'], ['💪', 'สุขภาพแม่'], ['🤝', 'มีคนช่วยเลี้ยง']];
        const cw = (920 - 2 * LD) / 4; L.forEach((c, i) => { const a = U.clamp((t - TM('s3', i, 0.18 + i * 0.13)) / 0.3); if (a <= 0) return; const x = 80 + LD + i * cw + cw / 2, y0 = 790 + (1 - U.easeBack(a)) * 40;
          g.save(); g.globalAlpha = a; rr(x - cw / 2 + 8, y0, cw - 16, 170, 28, '#ffffff', '#ff8fab'); g.font = '64px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(c[0], x, y0 + 60); plain(c[1], x, y0 + 128, Math.round(32 * LF), '#3a2f3f', 700, 'center'); g.restore(); }); }
      /* s4: ruler labels + months readout */
      if (b === 's4') { const p = ph('s4', t), q = SP('s4', 0.5), a0 = U.clamp((p - 0.08) / 0.1);
        const TK = [[0, 'คลอด'], [6, '6 ด.'], [18, '18 ด.'], [59, '5 ปี']];
        TK.forEach(([m, s2], i) => { const [x, y] = proj(new T.Vector3(mx(m), 0, 0.75)); tag(s2, U.clamp(x, 110 + LD, 970 - LD), y + 40 + (i % 2) * 70, 32, a0, '#ffffff'); });
        const [zx, zy] = proj(new T.Vector3(mx(38), 0.4, -0.6)); tag('ช่วงที่ดี', zx, zy - 30, 36, U.clamp((t - q - 0.6) / 0.3), '#c9f5d9', '#1f7a4a');
        const m = S.months || 0, [bx, by] = wp(S.tw[1].userData.head, 0, 0.95);
        if (p > 0.12) bubble('ท้องใหม่หลังคลอด ' + Math.round(m) + ' เดือน', bx, by - 60, U.clamp((p - 0.12) / 0.08), 34);
        if (t > q + 1.3) { const [ax, ay] = wp(S.tw[0].userData.head, 0, 0.95); tag('ลูกห่างกัน ~2 ปีครึ่ง–3 ปี', 540, Math.min(ay, by) - 190, 40, U.clamp((t - q - 1.3) / 0.3), '#ffe36e'); } }
      /* s5: two stat cards */
      if (b === 's5') { const p = ph('s5', t);
        const card = (i, a, head, big, small, col) => { if (a <= 0) return; const w = (900 - 2 * LD) / 2 - 10, x = 90 + LD + i * (w + 20), y = 770 + (1 - U.easeBack(a)) * 40;
          g.save(); g.globalAlpha = a; rr(x, y, w, 260, 30, 'rgba(25,18,50,.72)', col); plain(head, x + w / 2, y + 45, Math.round(34 * LF), '#ffffff', 700, 'center');
          big.forEach((s2, j) => plain(s2, x + w / 2, y + 112 + j * 64, Math.round(38 * LF), col, 800, 'center')); if (small) plain(small, x + w / 2, y + 228, 26, 'rgba(255,255,255,.85)', 500, 'center'); g.restore(); };
        card(0, U.clamp((t - TM('s5', 0, 0.12)) / 0.3), 'ท้องใหม่ < 6 เดือน', ['คลอดก่อนกำหนด +40%', 'ตัวเล็ก +61%'], '', '#ff7a8a');
        card(1, U.clamp((t - SP('s5', 0.55)) / 0.3), 'ห่าง > 5 ปี', ['เสี่ยงเพิ่ม', '20–43%'], 'ก็ไม่ใช่ยิ่งห่างยิ่งดี', '#ffb347'); }
      /* s6: doctor list */
      if (b === 's6') { const p = ph('s6', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 330, 980 - 2 * LD, 500, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['เคยผ่าคลอด', 'อายุ 35 ปีขึ้นไป', 'มีโรคประจำตัว เช่น เบาหวาน ความดัน', 'เคยคลอดก่อนกำหนด หรือแท้ง', 'ครรภ์ก่อนมีภาวะแทรกซ้อน'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.14)) / 0.35); if (a <= 0) return; const y = 398 + i * 82; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ระยะที่เหมาะกับแต่ละคน ให้แพทย์ช่วยดู', 540, 800, 28, 'rgba(255,255,255,.9)', 500, 'center'); g.restore(); }
      /* s7: gap labels under pedestals */
      if (b === 's7') { const L = [['ห่าง 1–2 ปี', 'เล่นด้วยกันได้', 'พ่อแม่เหนื่อยหนัก'], ['ห่าง 3–4 ปี', 'พี่เริ่มช่วยได้', 'แม่ได้พักฟื้น'], ['ห่าง 5 ปีขึ้นไป', 'พี่ช่วยได้มาก', 'เหมือนเริ่มนับหนึ่งใหม่']];
        const cw = (960 - 2 * LD) / 3;
        L.forEach((c, i) => { const a = U.clamp((t - TM('s7', i, 0.08 + i * 0.27) - 0.2) / 0.3); if (a <= 0) return; const [px, py] = proj(new T.Vector3(PX[i], 0, 1.3)); const x = U.clamp(px, 60 + LD + cw / 2, 1020 - LD - cw / 2), y = py + 20;
          g.save(); g.globalAlpha = a; rr(x - cw / 2 + 6, y, cw - 12, 168, 26, '#ffffff', PC2[i]); plain(c[0], x, y + 38, Math.round(34 * LF), '#3a2f3f', 800, 'center'); plain('＋ ' + c[1], x, y + 90, Math.round(28 * LF), '#1f8a55', 700, 'center'); plain('－ ' + c[2], x, y + 135, Math.round(28 * LF), '#d0475f', 700, 'center'); g.restore(); }); }
      /* s8: tips */
      if (b === 's8') { const p = ph('s8', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ตรวจสุขภาพก่อนท้อง + กินโฟลิก', 'คุมกำเนิดหลังคลอด อย่ารอ', 'ให้นมลูก คุมกำเนิดได้ไม่ 100%', 'เตรียมใจพี่ ก่อนน้องมา', 'คุยเรื่องเงิน + คนช่วยเลี้ยงให้ลงตัว'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s8', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s8', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(37 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 290, instant: true, lines: [[84, ['ยุคนี้ มีลูกกี่คนดี?', '#fff']], [72, ['ห่างกันกี่ปี?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: SP('s1', 0.6), y: 290, lines: [[58, ['ยุคนี้ คนมีลูกน้อยลงเรื่อยๆ', '#fff']], [46, ['จำนวนเด็กเกิดในไทย ต่อปี', '#ffe3ea', 600]]], foot: 'ที่มา: สำนักบริหารการทะเบียน กรมการปกครอง' },
      { t0: SP('s1', 0.6) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[58, ['ปี 2568 เกิดแค่ ', '#fff'], ['416,574 คน', '#ffd35e']], [46, ['ไม่แปลก ถ้าบ้านไหนจะมีลูกคนเดียว', '#ffe3ea', 600]]], foot: 'ที่มา: กรมการปกครอง, IPSR มหิดล 2569' },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.5), y: 280, lines: [[58, ['ลูกคนเดียว', '#fff']], [52, ['จะเหงา เอาแต่ใจไหม?', '#ffd35e']]] },
      { t0: SP('s2', 0.5) + 0.02, t1: end('s2') - 0.05, y: 280, lines: [[50, ['รวม 141 งานวิจัย: นิสัยไม่ต่าง', '#fff']], [48, ['จากเด็กที่มีพี่น้อง', '#ffd35e', 700]]], foot: 'Polit & Falbo 1987 · ลูกคนเดียวมักผูกพันกับพ่อแม่มาก' },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[56, ['กี่คนดี? ไม่มีเลขที่ถูกที่สุด', '#fff']], [48, ['ถามตัวเอง 4 ข้อ ไม่ใช่ถามญาติ', '#ffd35e', 700]]] },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 280, lines: [[58, ['ถ้าจะมีน้อง ห่างกันกี่ปีดี?', '#fff']], [44, ['ท้องใหม่เร็วเกิน ร่างกายแม่ยังไม่ฟื้น', '#ffe3ea', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 280, lines: [[50, ['คลอดแล้ว รออย่างน้อย ', '#fff'], ['24 เดือน', '#ffd35e']], [44, ['ค่อยตั้งครรภ์ใหม่', '#fff', 600]]], foot: 'คำแนะนำ WHO 2005' },
      { t0: at('s5') + 0.2, t1: end('s5') - 0.05, y: 280, lines: [[56, ['ห่างน้อยไป หรือมากไป', '#fff']], [52, ['เสี่ยงทั้งคู่', '#ffd35e']]], foot: 'เทียบกับห่าง 18–23 เดือน (Conde-Agudelo, JAMA 2006)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 240, lines: [[54, ['ปรึกษาแพทย์ก่อนมีน้อง ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 280, lines: [[56, ['ห่างแบบไหน ไม่มีผิด', '#fff']], [48, ['แค่ข้อดี ข้อเหนื่อยต่างกัน', '#ffd35e', 700]]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 240, lines: [[56, ['5 ข้อ ก่อนวางแผนมีน้อง', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9'), y: 280, lines: [[54, ['ครอบครัวที่ดี', '#fff']], [58, ['ไม่ได้วัดจากจำนวนลูก', '#ffd35e']], [40, ['บ้านคุณมีลูกกี่คน ห่างกันกี่ปี? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: กรมการปกครอง, WHO 2005, JAMA 2006, Polit & Falbo 1987' },
    ],
    trans,
    audio: [
      [0.3, 'pop'], [0.6, 'boing'],
      [at('s1') + 0.4, 'riser'], [P('s1', 0.1), 'pop'], [P('s1', 0.26), 'pop'], [P('s1', 0.42), 'pop'], [SP('s1', 0.6), 'warn'],
      [P('s2', 0.06), 'pop'], [P('s2', 0.15), 'pop'], [P('s2', 0.25), 'pop'], [SP('s2', 0.5), 'ding'], [SP('s2', 0.5) + 0.3, 'giggle'], [SP('s2', 0.5) + 0.8, 'heart'],
      [TM('s3', 0, 0.18), 'pop'], [TM('s3', 1, 0.31), 'pop'], [TM('s3', 2, 0.44), 'pop'], [TM('s3', 3, 0.57), 'pop'], [P('s3', 0.78), 'twinkle'],
      [P('s4', 0.05), 'whoosh'], [P('s4', 0.15), 'boing'], [P('s4', 0.3), 'warn'], [SP('s4', 0.5), 'whoosh'], [SP('s4', 0.5) + 1.2, 'ding'], [SP('s4', 0.5) + 1.3, 'shimmer'],
      [at('s5') + 0.3, 'heartbeat'], [TM('s5', 0, 0.12), 'warn'], [SP('s5', 0.55), 'warn'], [P('s5', 0.8), 'heartbeat'],
      [TM('s6', 0, 0.1), 'tick'], [TM('s6', 1, 0.24), 'tick'], [TM('s6', 2, 0.38), 'tick'], [TM('s6', 3, 0.52), 'tick'], [TM('s6', 4, 0.66), 'tick'],
      [TM('s7', 0, 0.08), 'pop'], [TM('s7', 0, 0.08) + 0.3, 'giggle'], [TM('s7', 1, 0.35), 'pop'], [TM('s7', 2, 0.62), 'pop'],
      [TM('s8', 0, 0.1), 'ding'], [TM('s8', 1, 0.27), 'tick'], [TM('s8', 2, 0.44), 'tick'], [TM('s8', 3, 0.61), 'tick'], [TM('s8', 4, 0.78), 'tick'],
      [at('s9') + 0.3, 'twinkle'], [at('s9') + 1.0, 'heart'], [at('s9') + 1.8, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), DUR - 1.5, CK.MUSIC.WARM)],
  });

})();
