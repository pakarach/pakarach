/* พ่อแม่หัวจะปวด — ลูกขอดูการ์ตูน จัดการยังไง (เตือน 2 นาที ยิ่งร้อง? / ตามวัย AAP / ไม่มีจุดจบ + เบรกเล็ก / 59-19-22 Hiniker 2016 / ตกลงก่อนเปิด / กิจวัตร / จอไม่ใช่เครื่องปลอบ / ปรึกษาแพทย์ถ้า / 5 ทิป)
   Build: node build.js luk-kho-du-cartoon.js review-luk-kho-du-cartoon.html --kit clay --title "ลูกขอดูการ์ตูน จัดการยังไง" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 9.5], ['s2', 8], ['s3', 9], ['s4', 8], ['s5', 8], ['s6', 7], ['s7', 7], ['s8', 9], ['s9', 6], ['end', 1.6]];
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
    cover: [[0, FW(-0.1, 0, 6.2, 4.2 - 0.6 * R1, 0.16)], [1, FW(-0.1, 0, 5.9, 4.2 - 0.6 * R1, 0.16)]],
    s1: [[0, FW(LX, 0, 6.4 + 0.8 * R1, 3.95 - 1.28 * R1, 0.12)], [1, FW(LX, 0, 6.2 + 0.8 * R1, 3.95 - 1.28 * R1, 0.12)]],
    s2: [[0, FW(NX - 0.3 + 0.7 * R1, 0, 6.8, 2.7 - 0.8 * R1, 0.12)], [1, FW(NX - 0.3 + 0.7 * R1, 0, 6.5, 2.7 - 0.8 * R1, 0.12)]],
    s3: [[0, FW(RX + 0.35 * R1, 0, 8.6 + 0.7 * R1, 4.7 - 1.6 * R1, 0.12)], [1, FW(RX + 0.35 * R1, 0, 8.3 + 0.7 * R1, 4.7 - 1.6 * R1, 0.12)]],
    s4: [[0, FW(-0.6 + 0.4 * R1, 0, 7.4 + 0.9 * R1, 3.6 - 0.7 * R1, 0.14)], [1, FW(-0.6 + 0.4 * R1, 0, 7.1 + 0.9 * R1, 3.6 - 0.7 * R1, 0.14)]],
    s5: [[0, FW(-0.3 + 0.5 * R1, 0, 7.6 + 0.9 * R1, 3.6 - 0.7 * R1, 0.14)], [1, FW(-0.3 + 0.5 * R1, 0, 7.3 + 0.9 * R1, 3.6 - 0.7 * R1, 0.14)]],
    s6: [[0, FW(0.1, 0, 6.6, 4.2 - 0.9 * R1, 0.14)], [1, FW(0.1, 0, 6.3, 4.2 - 0.9 * R1, 0.14)]],
    s7: [[0, FW(0.1, 0, 7.0, 4.6, 0.14)], [1, FW(0.1, 0, 6.8, 4.6, 0.14)]],
    s8: [[0, FW(0.3 + 0.4 * R1, 0, 9.6, 6.6, 0.3)], [1, FW(0.3 + 0.4 * R1, 0, 9.3, 6.6, 0.3)]],
    s9: [[0, FW(0.2 + 0.4 * R1, 0, 9.0, 4.4 - 1.65 * R1, 0.2)], [1, FW(0.2 + 0.4 * R1, 0, 8.4, 4.4 - 1.65 * R1, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's8', 's9']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const PCT = [59, 19, 22], BH = PCT.map((p) => p / 100 * 4.2), BXO = [-2.7, 0, 2.7];

  VE.run({
    DUR, file: 'luk-kho-du-cartoon', title: 'ลูกขอดูการ์ตูน จัดการยังไง', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกขอดูการ์ตูน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); { const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(0.4, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(0.4, 1.0, -3.7); sofa.add(seat, back); } scene.add(sofa);
      /* TV with an original cartoon (smiling star over hills) */
      const scrT = ctex(512, 320, (x, w, h) => { const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#6fc3ff'); gr.addColorStop(1, '#d9f3ff'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
        x.fillStyle = '#7ddc8e'; x.beginPath(); x.arc(120, 400, 190, 0, 7); x.fill(); x.fillStyle = '#58c97a'; x.beginPath(); x.arc(400, 420, 210, 0, 7); x.fill();
        x.fillStyle = '#ffd23f'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5, r = i % 2 ? 48 : 104; x.lineTo(256 + Math.cos(a) * r, 150 + Math.sin(a) * r); } x.closePath(); x.fill();
        x.fillStyle = '#3a2f3f'; x.beginPath(); x.arc(232, 146, 9, 0, 7); x.arc(280, 146, 9, 0, 7); x.fill(); x.strokeStyle = '#3a2f3f'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.arc(256, 160, 20, 0.2, PI - 0.2); x.stroke();
        x.fillStyle = '#ffffff'; for (const [a, b, r] of [[70, 60, 22], [100, 56, 28], [430, 80, 24], [460, 76, 30]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
      const mkTV = (k) => { const g = new T.Group(); const cab = new T.Mesh(new T.BoxGeometry(1.9, 0.7, 0.7), M('#8f7ad9')); cab.position.y = 0.35; g.add(cab);
        const fr = new T.Mesh(new T.BoxGeometry(2.1, 1.36, 0.16), M('#4a4460')); fr.position.y = 0.7 + 0.74; g.add(fr);
        const sm2 = new T.MeshBasicMaterial({ map: scrT }); const sc = new T.Mesh(new T.PlaneGeometry(1.86, 1.12), sm2); sc.position.set(0, 0.7 + 0.74, 0.09); g.add(sc);
        const led = new T.Mesh(new T.SphereGeometry(0.05, 8, 6), new T.MeshBasicMaterial({ color: '#5fd38d' })); led.position.set(0.9, 0.84, 0.1); g.add(led);
        g.scale.setScalar(k); g.userData.scr = sm2; return g; };
      const tv = mkTV(1.15); tv.position.set(-3.0, 0, -0.9); tv.rotation.y = 0.75; scene.add(tv);
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      const nbr = (i, o) => { const g = CK.neighbor(T, i, o); g.userData.base = o.scale; scene.add(g); return g; };
      C.kt = nbr(1, { scale: 0.7, top: '#9b8cff', bottom: '#ffc09f' });                       /* toddler 18-24 months (unnamed) */
      C.big = nbr(0, { scale: 1.08, top: '#5fb3ff', bottom: '#4a5a8f', hairStyle: 'tuft', hair: '#3a2a22' }); /* school-age kid (unnamed) */
      C.chom = nbr(2, { scale: 0.86, top: '#b9a4ff', bottom: '#fff1a8', lashes: true });      /* น้องชมพู่ 3 ขวบ */
      C.cmom = nbr(3, { scale: 1.26, lashes: true, top: '#5cc99a', bottom: '#6b5a8f', hair: '#2b2b33' }); /* แม่ชมพู่ */
      /* props in hands */
      const remote = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(0.2, 0.52, 0.09), M('#4a4460')); remote.add(b); const r = new T.Mesh(new T.SphereGeometry(0.06, 10, 8), M('#ff4d5e')); r.position.set(0, 0.17, 0.05); remote.add(r); for (let i = 0; i < 3; i++) { const d = new T.Mesh(new T.SphereGeometry(0.035, 8, 6), M('#ffffff')); d.position.set(0, 0.03 - i * 0.1, 0.05); remote.add(d); } }
      const remD = remote; remD.scale.setScalar(1.25); C.dad.userData['hand-1'].add(remD); remD.position.set(0, -0.2, 0.12);
      const remM = remote.clone(); remM.scale.setScalar(1.7); C.mama.userData.hand1.add(remM); remM.position.set(0, -0.2, 0.12);
      const phone = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(0.34, 0.6, 0.06), M('#3a3550')); phone.add(b); const sc = new T.Mesh(new T.PlaneGeometry(0.28, 0.5), new T.MeshBasicMaterial({ color: '#8fe0ff' })); sc.position.z = 0.035; phone.add(sc); }
      phone.scale.setScalar(1.3); C.cmom.userData['hand-1'].add(phone); phone.position.set(0, -0.22, 0.14);
      const bowl = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.3, 20, 12, 0, PI * 2, PI / 2, PI / 2), M('#ff8fab', { side: T.DoubleSide })); bowl.add(b); const rice = new T.Mesh(new T.SphereGeometry(0.26, 16, 10, 0, PI * 2, 0, PI / 2), M('#fff6dd')); rice.scale.y = 0.5; bowl.add(rice); }
      bowl.scale.setScalar(1.2); C.mom.userData['hand-1'].add(bowl); bowl.position.set(0, -0.12, 0.16);
      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.6, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const stage = (x, floorC, wallBase) => { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M(floorC)); p.position.set(x, -0.15, 6); scene.add(p); const w = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT(wallBase, '#ffffff', [8, 4]) })); w.position.set(x, 4.5, -4); scene.add(w); };
      /* ===== stage L: age ladder (x = -60) ===== */
      stage(LX, '#6fb7e8', '#cfe9ff');
      const disc = new T.Mesh(new T.CylinderGeometry(2.3, 2.4, 0.2, 40), M('#ffd36e')); disc.position.set(LX, 0.1, 0.2); scene.add(disc);
      /* ===== stage N: endless episodes (x = 60) ===== */
      stage(NX, '#8f7ad9', '#e6dcff');
      const tvN = mkTV(1.5); tvN.position.set(NX - 1.45, 0, -0.3); tvN.rotation.y = 0.5; scene.add(tvN);
      const nm = CK.family(T, 'mama'); nm.userData.base = nm.scale.x; scene.add(nm);
      /* ===== stage R: bars (x = 120) ===== */
      stage(RX, '#ff9a4d', '#ffe0b8');
      const BC = ['#9fd3ff', '#79dcb4', '#ff8fab'];
      const bars = BH.map((h, i) => { const b = CK.bar(T, 1.9, 1.4, BC[i]); b.position.set(RX + BXO[i], 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const bk = [0, 1, 2].map(() => { const g = CK.family(T, 'nana'); g.userData.base = g.scale.x; scene.add(g); return g; });
      return { key, hemi, room, tv, tvN, C, nm, bars, bk, hearts, remD, remM, phone, bowl, sofa };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'kt', 'big', 'chom', 'cmom'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, ex: ex || 'happy' }, o || {}));
      let heartsOn = false, heartsT0 = 0, tvOn = false, tvShow = false, remDOn = false, remMOn = false, bowlOn = false;
      const hop = (f, a) => Math.abs(Math.sin(t * f)) * a;
      if (bt === 'cover') {
        def('dad', 1.35, -0.1, 'worried', { ry: -0.3, a1: [-0.35, -0.9] }); remDOn = true;
        def('mama', -0.35, 0.55, 'giggle', { y: hop(7, 0.2), ry: 0.5, a2: [2.1 + 0.15 * Math.sin(t * 9), 0.8], a1: [-2.1 - 0.15 * Math.sin(t * 9), 0.8] });
        def('nana', -1.95, 0.75, 'happy', { y: hop(7, 0.12) * (t > 0.6 ? 1 : 0), ry: 0.45, a2: [2.0, 0.8] });
      } else if (bt === 's1') {
        let cur = 0; for (let i = 0; i < 4; i++) if (t >= TM('s1', i, 0.06 + i * 0.235)) cur = i;
        const k = U.easeBack(U.clamp((t - TM('s1', cur, 0.06 + cur * 0.235)) / 0.35)), y0 = 0.2;
        if (cur === 0) def('wawa', LX, 0.3, 'happy', { y: y0, sc: k, wave: true });
        if (cur === 1) { def('kt', LX - 0.75, 0.5, 'giggle', { y: y0, ry: 0.3, sc: k }); def('mom', LX + 0.85, 0.1, 'happy', { y: y0, ry: -0.35, sc: k * (REEL ? 0.88 : 1), a1: [-0.5, -0.8] }); }
        if (cur === 2) { def('mama', LX + 0.75, 0.35, 'giggle', { y: y0 + hop(6, 0.12), sc: k }); def('nana', LX - 0.85, 0.45, 'happy', { y: y0, sc: k, wave: true }); }
        if (cur === 3) def('big', LX, 0.3, 'happy', { y: y0, sc: k, wave: true });
      } else if (bt === 's4') {
        const q = SP('s4', 0.5); tvShow = true; tvOn = true; remDOn = true;
        def('dad', 1.75, -0.15, 'happy', { ry: -0.45, a1: [-0.35, -0.9] });
        def('mama', 0.0, 0.6, t > P('s4', 0.22) ? 'giggle' : 'happy', { ry: 0.55, y: t > P('s4', 0.22) && t < q ? hop(7, 0.14) : 0, a2: t > P('s4', 0.22) ? [2.2, 0.7] : null });
        def('nana', -1.75, 0.85, 'happy', { ry: -0.75 });
      } else if (bt === 's5') {
        const p = ph('s5', t), k = U.easeIO(U.clamp((p - 0.42) / 0.3)); tvShow = true; tvOn = p < 0.4; bowlOn = true;
        def('mom', 2.25, -0.1, 'happy', { ry: -0.4, a1: [-0.3, -0.95] });
        def('mama', U.lerp(-0.7, 0.4, k), 0.6, k > 0.1 ? 'giggle' : 'happy', { ry: U.lerp(-0.7, 0.5, k), y: hop(8, 0.16) * (k > 0.02 && k < 0.98 ? 1 : 0) });
        def('nana', U.lerp(-2.3, -1.25, k), 0.9, k > 0.1 ? 'giggle' : 'happy', { ry: U.lerp(-0.7, 0.5, k), y: hop(8, 0.12) * (k > 0.05 && k < 0.99 ? 1 : 0) });
      } else if (bt === 's6' || bt === 's7') {
        const q = SP('s6', 0.5), calm = bt === 's7' || t > q;
        def('chom', -0.95, 0.4, calm ? 'sleepy' : 'cry', { ry: 0.4, y: calm ? 0 : hop(5, 0.06), a1: calm ? null : [-2.1, 0.25], a2: calm ? null : [2.1, 0.25] });
        def('cmom', 1.2, 0, 'worried', { ry: -0.45, a1: [-0.75, -0.95] });
      } else if (bt === 's8' || bt === 's9') {
        const off = bt === 's9' && t > P('s9', 0.3);
        def('mom', -1.9, -0.7, 'happy', { ry: 0.15 });
        def('dad', 1.95, -0.7, 'happy', { ry: -0.15, wave: bt === 's9' && ph('s9', t) > 0.45 });
        def('mama', 0.0, 1.4, 'giggle', { a2: bt === 's9' ? [off ? 2.2 : 0.5, off ? 0.7 : -1.0] : null, y: off ? hop(6, 0.1) : 0 }); remMOn = bt === 's9';
        def('nana', -1.6, 1.4, bt === 's9' ? 'giggle' : 'happy', { wave: bt === 's9' && ph('s9', t) > 0.4 });
        def('wawa', 1.45, 1.4, 'happy');
        if (off) { heartsOn = true; heartsT0 = P('s9', 0.3); }
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(0, q.ry, 0);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base * Math.max(0.01, q.sc == null ? 1 : q.sc));
      }
      s.remD.visible = remDOn; s.remM.visible = remMOn; s.bowl.visible = bowlOn;
      s.tv.visible = tvShow; s.tv.userData.scr.color.set(tvOn ? '#ffffff' : '#2a2838');
      s.sofa.visible = !tvShow || true;
      /* s2: mama glued to the big TV */
      { const on = bt === 's2'; s.nm.visible = on; if (on) { const q = SP('s2', 0.5); s.nm.position.set(NX + 1.45, 0, 0.5); s.nm.rotation.set(0, -0.75, 0); s.nm.userData.setExpr(t > q ? 'worried' : 'giggle'); s.nm.userData.tick(t, {}); s.nm.scale.setScalar(s.nm.userData.base * 1.25); }
        s.tvN.userData.scr.color.setScalar(0.92 + 0.08 * Math.sin(t * 5)); }
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(0.1 + u[0], 3.4 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });
      /* bars */
      { const on = inB('s3', t), p = on ? ph('s3', t) : 0, q = SP('s3', 0.55), ex = ['happy', 'giggle', 'cry'];
        s.bars.forEach((b, i) => { const k = U.easeOut(U.clamp((t - TM('s3', i, 0.08 + i * 0.12)) / 0.6)) * (on ? 1 : 0); b.scale.y = Math.max(0.01, BH[i] * k); const g = s.bk[i]; g.visible = on && k > 0.02; if (!g.visible) return;
          g.position.set(b.position.x, b.scale.y + (i === 2 ? hop(8, t > q ? 0.14 : 0.05) : i === 1 ? hop(5, 0.08) : 0), 0.15); g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(k * 1.5)))); g.userData.setExpr(ex[i]); g.userData.tick(t, { wave: i === 1 && p > 0.4 });
          if (i === 2) { g.userData.arm1.rotation.z = 2.2 + 0.15 * Math.sin(t * 7); g.userData['arm-1'].rotation.z = -2.2 - 0.15 * Math.sin(t * 7 + 1); g.userData.arm1.rotation.x = g.userData['arm-1'].rotation.x = 0.2; } }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, nm: s.nm, bk: s.bk }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's1') return ['#a8d8ff', '#e3f3ff']; if (b === 's2') return ['#d9ccff', '#f3edff']; if (b === 's3') return ['#ffd8a8', '#fff4e6']; if (b === 's6' || b === 's7') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, a, fill, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2); rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const check = (x, y, r, col) => { g.save(); g.strokeStyle = col; g.lineWidth = r * 0.32; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x - r * 0.5, y); g.lineTo(x - r * 0.12, y + r * 0.4); g.lineTo(x + r * 0.55, y - r * 0.4); g.stroke(); g.restore(); };
      const C = S.C;
      if (b === 'cover') { let [x, y] = wp(C.mama.userData.head, 0, 0.9); bubble('ขอดูการ์ตูนหน่อยยย!', x + 60, y - 70, U.clamp((t - 0.2) / 0.3), 44);
        [x, y] = wp(C.nana.userData.head, 0, 0.8); bubble('ตูนๆ!', x - 20, y - 50, U.clamp((t - 0.9) / 0.3), 36); }
      /* s1: age ladder */
      if (b === 's1') { const p = ph('s1', t), a0 = U.clamp((p - 0.02) / 0.05);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, REEL ? 364 : 430, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = [['ต่ำกว่า 18 เดือน', 'งดจอ ยกเว้นวิดีโอคอล'], ['18–24 เดือน', 'ดูได้นิดหน่อย พ่อแม่ดูด้วย'], ['2–5 ขวบ', 'ไม่เกินวันละ 1 ชั่วโมง'], ['6 ขวบขึ้นไป', 'ตั้งกติกา ไม่กินเวลานอน-เล่น']];
        let cur = 0; for (let i = 0; i < 4; i++) if (t >= TM('s1', i, 0.06 + i * 0.235)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s1', i, 0.06 + i * 0.235)) / 0.3); if (a <= 0) return; const y = REEL ? 368 + i * 74 : 380 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - (REEL ? 33 : 37), 932 - 2 * LD, REEL ? 66 : 74, 37, '#ffd6e4');
          plain(s2[0], 104 + LD, y + 2, Math.round(34 * LF), i === cur ? '#ff4f7b' : '#b0879a', 800); plain(s2[1], 400 + LD * 0.6, y + 2, Math.round(36 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AAP 2016 · ราชวิทยาลัยกุมารแพทย์ฯ', 540, REEL ? 658 : 722, 26, '#8a6a7a', 400, 'center'); g.restore();
        const who = [C.wawa, C.kt, C.mama, C.big][cur], TG = ['งดจอไปก่อนนะ', 'มีพ่อแม่นั่งดูด้วย', 'วันละไม่เกิน 1 ชม.', 'กติกาเดิมทุกวัน'];
        const [x, y] = proj(new T.Vector3(LX, 0.1, 2.3)); tag(TG[cur], x, REEL ? y - 30 : y + 10, 42, U.clamp((t - TM('s1', cur, 0.06 + cur * 0.235) - 0.2) / 0.3), ['#ffd6dc', '#e6dcff', '#fff1c9', '#c9f5d9'][cur]); void who; }
      /* s2: endless episode strip + small brake */
      if (b === 's2') { const p = ph('s2', t), q = SP('s2', 0.5), a0 = U.clamp((p - 0.04) / 0.08), y0 = REEL ? 560 : 610, x0 = 70 + LD, w = 940 - 2 * LD;
        g.save(); g.globalAlpha = a0; rr(x0, y0, w, 150, 30, 'rgba(255,255,255,.88)', '#8f7ad9'); g.beginPath(); g.roundRect(x0 + 8, y0 + 8, w - 16, 134, 24); g.clip();
        const cw = 210, off = ((t - at('s2')) * 120) % cw, n0 = Math.floor((t - at('s2')) * 120 / cw);
        for (let i = -1; i < 6; i++) { const cx = x0 + 20 + i * cw - off + cw; const col = ['#ffd6e4', '#c9f5d9', '#fff1c9', '#cfe9ff'][((i + n0) % 4 + 4) % 4]; rr(cx, y0 + 22, cw - 20, 106, 20, col); plain('ตอนที่ ' + (i + n0 + 2), cx + (cw - 20) / 2, y0 + 77, 36, '#3a2f3f', 800, 'center'); }
        g.restore();
        tag('เล่นต่ออัตโนมัติ ไม่มีตอนจบ', 540, y0 - 44, 38, a0, '#e6dcff');
        const a1 = U.clamp((t - q) / 0.3); if (a1 > 0) { const [mx, my] = wp(S.nm.userData.head, 0, 1.25); const bx = U.clamp(mx - 150, 80 + LD, 700 - LD), by = Math.max(my - 150, y0 + 190); g.save(); g.globalAlpha = a1; rr(bx, by, 300, 120, 28, 'rgba(255,255,255,.92)', '#ff6f91'); plain('เบรกหยุดตัวเอง', bx + 150, by + 36, 32, '#3a2f3f', 700, 'center'); rr(bx + 30, by + 66, 240, 30, 15, '#ffe1ea'); rr(bx + 30, by + 66, 240 * (0.2 + 0.03 * Math.sin(t * 6)), 30, 15, '#ff5f86'); g.restore(); } }
      /* s3: bars */
      if (b === 's3') { const p = ph('s3', t), q = SP('s3', 0.55), NM = ['เฉยๆ', 'อารมณ์ดี', 'งอแง'];
        S.bk.forEach((w, i) => { const k = U.clamp((t - TM('s3', i, 0.08 + i * 0.12)) / 0.6), a = U.clamp(k * 3); if (a <= 0) return;
          let [x, y] = proj(new T.Vector3(RX + BXO[i], Math.max(0.35, BH[i] * 0.45), 0.75)); tag(NM[i], x, y, 40, a, ['#dff0ff', '#c9f5d9', '#ffd6e4'][i]);
          [x, y] = wp(w.userData.head, 0, 0.95); g.save(); g.globalAlpha = a; txt(Math.round(PCT[i] * U.easeOut(k)) + '%', x, y - 34, 64, i === 2 ? '#ffd35e' : '#ffffff', 800); g.restore(); });
        const a2 = U.clamp((t - q) / 0.3); if (a2 > 0) { const [x, y] = wp(S.bk[2].userData.head, 0, 0.95); bubble('"อีก 2 นาทีนะ!"', x - 150, y - 150, a2, 40); } }
      /* s4: agree first, stop at the end of an episode */
      if (b === 's4') { const p = ph('s4', t), q = SP('s4', 0.5);
        let [x, y] = wp(C.dad.userData.head, 0, 1.0); bubble('วันนี้ดูกี่ตอนดี?', x - 60, y - 60, U.clamp((p - 0.06) / 0.08) * U.clamp((P('s4', 0.24) - t) / 0.25 + 1) * (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3)), 40);
        [x, y] = wp(C.mama.userData.head, 0, 0.9); bubble('2 ตอน!', x - 30, y - 60, U.clamp((p - 0.24) / 0.06) * (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3)), 44);
        const a = U.clamp((t - q) / 0.3); if (a > 0) { const y0 = REEL ? 520 : 560, cw = 250, x0 = 540 - cw * 1.5 - 10; g.save(); g.globalAlpha = a;
          ['ตอนที่ 1', 'ตอนที่ 2', 'ปิดจอ'].forEach((s2, i) => { const on = t > q + 0.4 + i * 0.7, cx = x0 + i * (cw + 10); rr(cx, y0, cw, 130, 28, on ? (i === 2 ? '#ff6f91' : '#ffffff') : 'rgba(255,255,255,.65)', on ? '#ff6f91' : null); plain(s2, cx + cw / 2, y0 + 44, 36, on && i === 2 ? '#ffffff' : '#3a2f3f', 800, 'center');
            if (on && i < 2) check(cx + cw / 2, y0 + 94, 30, '#3fbf74'); if (i === 2) plain(on ? 'จบตอนพอดี' : '…', cx + cw / 2, y0 + 94, 30, on ? '#ffffff' : '#8a7a8f', 700, 'center'); }); g.restore(); } }
      /* s5: routine strip */
      if (b === 's5') { const p = ph('s5', t), a0 = U.clamp((p - 0.04) / 0.08), L = [['อาบน้ำ', 'เสร็จแล้ว'], ['การ์ตูน', '2 ตอน'], ['กินข้าว', 'จอปิด']], y0 = REEL ? 520 : 560;
        const cur = p < 0.14 ? 0 : p < 0.42 ? 1 : 2, cw = (900 - 2 * LD) / 3;
        L.forEach((s2, i) => { const a = U.clamp((p - 0.04 - i * 0.06) / 0.08) * a0; if (a <= 0) return; const x = 90 + LD + i * cw + cw / 2; g.save(); g.globalAlpha = a; rr(x - cw / 2 + 10, y0, cw - 20, 140, 28, i === cur ? '#ffffff' : 'rgba(255,255,255,.7)', i === cur ? '#ff6f91' : null);
          plain(s2[0], x, y0 + 46, 38, '#3a2f3f', 800, 'center'); plain(s2[1], x, y0 + 100, 34, i === cur ? '#ff4f7b' : '#8a7a8f', 700, 'center'); g.restore();
          if (i < 2) { g.save(); g.globalAlpha = a; plain('›', x + cw / 2, y0 + 68, 60, '#ff6f91', 800, 'center'); g.restore(); } });
        if (p > 0.5) { const [x, y] = wp(C.mom.userData.head, 0, 1.0); bubble('ข้าวมาแล้วจ้า', x - 80, y - 60, U.clamp((p - 0.5) / 0.08), 40); } }
      /* s6: phone as a pacifier */
      if (b === 's6') { const p = ph('s6', t), q = SP('s6', 0.5); const [x, y] = wp(C.cmom.userData.head, 0, 1.0);
        bubble('อ่ะๆ ดูมือถือไปนะลูก', x - 110, y - 60, U.clamp((p - 0.12) / 0.08) * (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3)), 38);
        const [cx, cy] = wp(C.chom.userData.head, 0, 0.85); tag('น้องชมพู่ 3 ขวบ', cx, cy - 40, 34, U.clamp((p - 0.04) / 0.08) * (t < q ? 1 : 0)); }
      /* s7: doctor list */
      if (b === 's7') { const p = ph('s7', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 380, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['2 ขวบแล้ว ยังไม่พูด 2 คำติดกัน', 'ทักษะที่เคยทำได้ หายไป', 'พ่อแม่กังวลเรื่องพัฒนาการ ไม่ต้องรอ'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.12 + i * 0.2)) / 0.35); if (a <= 0) return; const y = 392 + i * 86; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: CDC Learn the Signs. Act Early. · ไม่ได้แปลว่าจอเป็นสาเหตุ', 540, 664, Math.round(26 * LF), 'rgba(255,255,255,.9)', 400, 'center'); g.restore(); }
      /* s8: tips */
      if (b === 's8') { const p = ph('s8', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ตกลงจำนวนตอน ก่อนกดเปิด', 'ปิดตอนจบตอน + ปิดเล่นต่ออัตโนมัติ', 'ดูเวลาเดิมทุกวัน จบแล้วมีอะไรทำต่อ', 'ไม่เปิดตอนกินข้าว และ 1 ชม. ก่อนนอน', 'นั่งดูด้วยกัน พ่อแม่วางมือถือด้วย'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s8', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s8', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(36 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
      /* s9: mama switches it off */
      if (b === 's9') { const p = ph('s9', t); if (p > 0.3) { const [x, y] = proj(new T.Vector3(0, 0, 2.7)); tag('มามะ: จบแล้ว ปิดเอง!', x, REEL ? Math.min(y + 20, 1222) : y + 20, 42, U.clamp((p - 0.3) / 0.06), '#fff1c9'); } }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[70, ['บอก "อีก 2 นาทีนะลูก"', '#fff']], [80, ['ยิ่งร้องหนักกว่าเดิม?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: end('s1') - 0.05, y: 250, lines: [[56, ['ลูกขอดูการ์ตูน ', '#fff'], ['ให้ดูได้ไหม?', '#ffd35e']]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.5), y: 290, lines: [[58, ['ทำไมปิดทีไร ร้องทุกที?', '#fff']], [46, ['การ์ตูนยุคนี้ เล่นต่อเองไม่มีวันจบ', '#ffe3ea', 600]]], foot: 'AAP 2016 เสนอให้เลิกตั้ง "เล่นต่ออัตโนมัติ" เป็นค่าเริ่มต้น' },
      { t0: SP('s2', 0.5) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[58, ['ส่วนเด็กเล็ก', '#fff']], [52, ['ยังหยุดตัวเองได้ไม่เก่ง', '#ffd35e']]] },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.55), y: 290, lines: [[56, ['ตอนปิดจอ เด็ก 1–5 ขวบ', '#fff']], [48, ['งอแงจริงๆ แค่ราว 1 ใน 5 ครั้ง', '#ffd35e', 700]]], foot: 'บันทึกของ 28 ครอบครัว (Hiniker et al., ม.วอชิงตัน, CHI 2016)' },
      { t0: SP('s3', 0.55) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[54, ['แต่ถ้าพ่อแม่เตือน "อีก 2 นาที"', '#fff']], [56, ['เด็กกลับงอแงมากกว่า', '#ffd35e']]], foot: 'งานวิจัยขนาดเล็ก · จบตามกิจวัตรหรือจบตอนพอดี ราบรื่นกว่า' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[58, ['1. ตกลงกัน "ก่อนเปิด"', '#ffd35e']], [46, ['ให้ลูกช่วยเลือกว่าจะดูกี่ตอน', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[56, ['นับเป็น "ตอน" ไม่ใช่ "นาที"', '#ffd35e']], [46, ['จบตอนพอดีแล้วปิด + ปิดเล่นต่ออัตโนมัติ', '#fff', 600]]] },
      { t0: at('s5') + 0.2, t1: end('s5') - 0.05, y: 290, lines: [[58, ['2. ทำให้เป็นกิจวัตร', '#ffd35e']], [46, ['เวลาเดิมทุกวัน จบแล้วมีอะไรรอต่อ', '#fff', 600]]] },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[54, ['บ้านน้องชมพู่ ร้องทีไร', '#fff']], [54, ['แม่ยื่นมือถือให้ทุกที', '#ffe3ea']]] },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[58, ['จอไม่ใช่เครื่องปลอบ', '#ffd35e']], [46, ['ลูกต้องได้ฝึกสงบด้วยตัวเองบ้าง', '#fff', 600]]], foot: 'AAP 2016: ไม่ใช้จอเป็นวิธีปลอบลูกเป็นประจำ' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[56, ['ปรึกษาแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 250, lines: [[56, ['5 ข้อ เมื่อลูกขอดูการ์ตูน', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9'), y: 290, lines: [[56, ['การ์ตูนดูได้', '#fff']], [56, ['แค่ต้องมี "ตอนจบ" ทุกครั้ง', '#ffd35e']], [40, ['บ้านคุณให้ดูวันละกี่ตอน? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AAP 2016, ราชวิทยาลัยกุมารแพทย์ฯ, Hiniker et al. 2016, CDC' },
    ],
    trans,
    audio: [
      [0.3, 'boing'], [0.7, 'giggle'], [1.0, 'pop'],
      [TM('s1', 0, 0.06), 'pop'], [TM('s1', 1, 0.295), 'pop'], [TM('s1', 2, 0.53), 'pop'], [TM('s1', 2, 0.53) + 0.4, 'giggle'], [TM('s1', 3, 0.765), 'pop'],
      [at('s2') + 0.5, 'whoosh'], [P('s2', 0.25), 'tick'], [P('s2', 0.37), 'tick'], [SP('s2', 0.5), 'warn'], [SP('s2', 0.5) + 0.5, 'boing'],
      [at('s3') + 0.4, 'riser'], [TM('s3', 0, 0.08) + 0.5, 'pop'], [TM('s3', 1, 0.2) + 0.5, 'pop'], [TM('s3', 2, 0.32) + 0.5, 'pop'], [SP('s3', 0.55), 'warn'], [SP('s3', 0.55) + 0.4, 'thud'],
      [at('s4') + 0.5, 'pop'], [P('s4', 0.24), 'boing'], [P('s4', 0.26), 'giggle'], [SP('s4', 0.5) + 0.4, 'tick'], [SP('s4', 0.5) + 1.1, 'tick'], [SP('s4', 0.5) + 1.8, 'ding'],
      [at('s5') + 0.4, 'twinkle'], [P('s5', 0.14), 'tick'], [P('s5', 0.42), 'ding'], [P('s5', 0.5), 'giggle'], [P('s5', 0.7), 'shimmer'],
      [at('s6') + 0.4, 'warn'], [P('s6', 0.14), 'pop'], [SP('s6', 0.5), 'heartbeat'], [P('s6', 0.8), 'heartbeat'],
      [TM('s7', 0, 0.12), 'tick'], [TM('s7', 1, 0.32), 'tick'], [TM('s7', 2, 0.52), 'tick'], [P('s7', 0.8), 'heartbeat'],
      [TM('s8', 0, 0.1), 'ding'], [TM('s8', 1, 0.27), 'tick'], [TM('s8', 2, 0.44), 'tick'], [TM('s8', 3, 0.61), 'tick'], [TM('s8', 4, 0.78), 'tick'],
      [at('s9') + 0.3, 'twinkle'], [P('s9', 0.3), 'ding'], [P('s9', 0.36), 'giggle'], [P('s9', 0.5), 'heart'], [P('s9', 0.75), 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s3'), CK.MUSIC.OOPS), CK.musicBed(at('s3'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
