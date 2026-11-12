/* พ่อแม่หัวจะปวด — ลูกติดมือถือ ยึดคืนแล้วโวยวาย (บ้านแตก? / Pew 2020 63-80-71 / ① คลิปไม่มีวันจบ ② ยึดกลางด่าน / ③ เบรกยังเล็ก NIMH / ตกลงก่อนเปิด นับเป็นตา / บ้านมือถือ AAP + พ่อแม่ 68% Pew / ปรึกษาแพทย์ WHO ICD-11 + 1323 / 3 ใน 100 Stevens 2021 / ระเบิดแล้ว ใจเย็น บอกชื่ออารมณ์ / 5 ทิป / ครอบครัวเกมกระดาน)
   Build: node build.js luk-tid-mue-thue.js review-luk-tid-mue-thue.html --kit clay --title "ลูกติดมือถือ ยึดคืนแล้วโวยวาย" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 8], ['s2', 9], ['s3', 7.5], ['s4', 9], ['s5', 9.5], ['s6', 8], ['s7', 6.5], ['s8', 8.5], ['s9', 9], ['s10', 6.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const LX = -60, NX = 60, RX = 120, KX = -120;
  const SH = {
    cover: [[0, FW(0.25, 0, 6.4, 4.5 - 0.6 * R1, 0.16)], [1, FW(0.25, 0, 6.1, 4.5 - 0.6 * R1, 0.16)]],
    s1: [[0, FW(LX, 0, 8.6 + 0.6 * R1, 5.4 - 1.2 * R1, 0.12)], [1, FW(LX, 0, 8.3 + 0.6 * R1, 5.4 - 1.2 * R1, 0.12)]],
    s2: [[0, FW(NX + 0.1, 0, 6.8 + 0.6 * R1, 4.3 - 1.0 * R1, 0.12)], [1, FW(NX + 0.1, 0, 6.5 + 0.6 * R1, 4.3 - 1.0 * R1, 0.12)]],
    s3: [[0, FW(RX - 0.35, 0, 8.9 + 0.6 * R1, 4.4 - 1.2 * R1, 0.12)], [1, FW(RX - 0.35, 0, 8.6 + 0.6 * R1, 4.4 - 1.2 * R1, 0.12)]],
    s4: [[0, FW(0.2, 0, 6.8 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)], [1, FW(0.2, 0, 6.5 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)]],
    s5: [[0, FW(-0.9, 0, 7.8 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)], [1, FW(-0.9, 0, 7.5 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)]],
    s6: [[0, FW(0.2, 0, 6.4, 5.6 - 0.9 * R1, 0.14)], [1, FW(0.2, 0, 6.1, 5.6 - 0.9 * R1, 0.14)]],
    s7: [[0, FW(KX, 0, 6.2 + 0.6 * R1, 5.3 - 1.0 * R1, 0.1)], [1, FW(KX, 0, 6.0 + 0.6 * R1, 5.3 - 1.0 * R1, 0.1)]],
    s8: [[0, FW(0.2, 0, 6.8 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)], [1, FW(0.2, 0, 6.5 + 0.6 * R1, 4.3 - 0.9 * R1, 0.14)]],
    s9: [[0, FW(0.2, 0, 8.4, 6.8, 0.3)], [1, FW(0.2, 0, 8.1, 6.8, 0.3)]],
    s10: [[0, FW(0.2 + 0.4 * R1, 0, 9.0, 4.4 - 1.65 * R1, 0.2)], [1, FW(0.2 + 0.4 * R1, 0, 8.4, 4.4 - 1.65 * R1, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const PCT = [63, 80, 71], BH = PCT.map((p) => p / 100 * 3.0), BXO = [-2.7, 0, 2.7];
  const RED = [23, 56, 88];

  VE.run({
    DUR, file: 'luk-tid-mue-thue', title: 'ลูกติดมือถือ ยึดคืนแล้วโวยวาย', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกติดมือถือ', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4, props: false }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); { const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(1.0, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(1.0, 1.0, -3.7); sofa.add(seat, back); } scene.add(sofa);
      /* phone house (charging station outside the bedroom) */
      const house = new T.Group(); { const cab = new T.Mesh(new T.BoxGeometry(1.5, 1.0, 0.6), M('#ffb36b')); cab.position.y = 0.5; house.add(cab);
        const back = new T.Mesh(new T.BoxGeometry(1.5, 1.3, 0.14), M('#ff8fab')); back.position.set(0, 1.65, -0.24); house.add(back);
        const roof = new T.Mesh(new T.ConeGeometry(1.15, 0.7, 4), M('#ff6f91')); roof.rotation.y = PI / 4; roof.scale.z = 0.35; roof.position.set(0, 2.62, -0.24); house.add(roof);
        const door = new T.Mesh(new T.CircleGeometry(0.2, 20), M('#fff1c9')); door.position.set(0, 0.55, 0.31); house.add(door);
        for (let i = 0; i < 3; i++) { const l = new T.Mesh(new T.SphereGeometry(0.06, 10, 8), new T.MeshBasicMaterial({ color: '#5fd38d' })); l.position.set(-0.45 + i * 0.45, 1.06, 0.26); house.add(l); } }
      house.position.set(-2.9, 0, -1.7); scene.add(house);
      const mkPhone = (k, col) => { const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(0.36, 0.62, 0.06), M('#3a3550')); g.add(b); const sc = new T.Mesh(new T.PlaneGeometry(0.3, 0.52), new T.MeshBasicMaterial({ color: col || '#8fe0ff' })); sc.position.z = 0.035; g.add(sc);
        const st = new T.Mesh(new T.CircleGeometry(0.07, 5), new T.MeshBasicMaterial({ color: '#ffd23f' })); st.position.set(0, 0.04, 0.04); g.add(st); g.scale.setScalar(k); return g; };
      const slots = [0, 1, 2].map((i) => { const p = mkPhone(1.15, ['#8fe0ff', '#ffc0d6', '#c9f5d9'][i]); p.position.set(-0.45 + i * 0.45, 1.36, -0.05); p.rotation.x = -0.12; p.visible = false; house.add(p); return p; });
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      const nbr = (i, o) => { const g = CK.neighbor(T, i, o); g.userData.base = o.scale; scene.add(g); return g; };
      C.ngo = nbr(1, { scale: 1.08, top: '#3fbfa3', bottom: '#3d5a8f', hairStyle: 'tuft', hair: '#2b2b33' });       /* น้องเงาะ ป.4 */
      C.nmom = nbr(3, { scale: 1.26, lashes: true, top: '#c59bff', bottom: '#4a5a8f', hair: '#3a2a22' });            /* แม่เงาะ */
      /* props in hands */
      const phK = mkPhone(1.45); C.ngo.userData.hand1.add(phK); phK.position.set(0, -0.22, 0.14);
      const phM = mkPhone(1.3); C.nmom.userData.hand1.add(phM); phM.position.set(0, -0.22, 0.14);
      const phD = mkPhone(1.2, '#ffc0d6'); C.dad.userData['hand-1'].add(phD); phD.position.set(0, -0.22, 0.14);
      const glow = new T.PointLight('#8fe0ff', 0, 5); scene.add(glow);
      /* board game for the closing */
      const board = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(2.0, 0.12, 1.4), M('#ffffff', { map: ctex(256, 180, (x, w, h) => { const c = ['#ff8fab', '#ffd23f', '#5ab8ff', '#79dcb4']; for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) { x.fillStyle = (i + j) % 2 ? c[(i + j) % 4] : '#fff4e6'; x.fillRect(i * 32, j * 30, 32, 30); } }) })); b.position.y = 0.06; board.add(b);
        [['#ff4d5e', -0.6, 0.2], ['#3f8cff', 0.2, -0.3], ['#ffb400', 0.65, 0.35]].forEach(([c, x, z]) => { const p = new T.Mesh(new T.ConeGeometry(0.12, 0.34, 16), M(c)); p.position.set(x, 0.29, z); board.add(p); const hd = new T.Mesh(new T.SphereGeometry(0.09, 12, 10), M(c)); hd.position.set(x, 0.49, z); board.add(hd); }); }
      board.position.set(0.1, 0, 2.7); board.visible = false; scene.add(board);
      /* hearts */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.6, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const stage = (x, floorC, wallBase) => { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M(floorC)); p.position.set(x, -0.15, 6); scene.add(p); const w = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT(wallBase, '#ffffff', [8, 4]) })); w.position.set(x, 4.5, -4); scene.add(w); };
      /* ===== stage L: bars (x = -60) ===== */
      stage(LX, '#6fb7e8', '#cfe9ff');
      const BC = ['#9fd3ff', '#79dcb4', '#ff8fab'];
      const bars = BH.map((h, i) => { const b = CK.bar(T, 1.9, 1.4, BC[i]); b.position.set(LX + BXO[i], 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const bk = [0, 1].map((i) => { const g = CK.neighbor(T, i === 0 ? 0 : 2, { scale: 0.78 }); g.userData.base = 0.78; scene.add(g); return g; });
      const bp = CK.neighbor(T, 3, { scale: 0.92, lashes: true, top: '#ffd166', bottom: '#6b5a8f' }); bp.userData.base = 0.92; scene.add(bp); bk.push(bp);
      /* ===== stage N: giant phone (x = 60) ===== */
      stage(NX, '#8f7ad9', '#e6dcff');
      const gcv = document.createElement('canvas'); gcv.width = 384; gcv.height = 640; const gtx = new T.CanvasTexture(gcv);
      const gph = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(2.2, 3.5, 0.24), M('#3a3550')); gph.add(b); const sc = new T.Mesh(new T.PlaneGeometry(1.98, 3.22), new T.MeshBasicMaterial({ map: gtx })); sc.position.z = 0.125; gph.add(sc);
        const cam = new T.Mesh(new T.SphereGeometry(0.05, 10, 8), M('#8a86a8')); cam.position.set(0, 1.67, 0.13); gph.add(cam); }
      gph.userData.base = [NX + 1.15, 2.0, 0.0]; scene.add(gph);
      /* ===== stage R: balance (x = 120) ===== */
      stage(RX, '#ff9a4d', '#ffe0b8');
      const bal = new T.Group(); { const post = new T.Mesh(new T.CylinderGeometry(0.14, 0.22, 1.7, 20), M('#8f7ad9')); post.position.y = 0.85; bal.add(post); const foot = new T.Mesh(new T.CylinderGeometry(0.6, 0.7, 0.18, 28), M('#8f7ad9')); foot.position.y = 0.09; bal.add(foot); }
      const beam = new T.Group(); beam.position.y = 1.75; bal.add(beam); { const bm = new T.Mesh(new T.BoxGeometry(3.6, 0.16, 0.3), M('#ffd23f')); beam.add(bm); }
      const ballA = new T.Mesh(new T.SphereGeometry(0.62, 28, 20), M('#ff5f6d', { roughness: 0.3 })); ballA.position.set(-1.55, 0.7, 0); beam.add(ballA);
      const ballB = new T.Mesh(new T.SphereGeometry(0.3, 24, 16), M('#3f8cff', { roughness: 0.3 })); ballB.position.set(1.55, 0.38, 0); beam.add(ballB);
      bal.position.set(RX + 1.7, 0, 0); scene.add(bal);
      /* ===== stage K: 100 dots (x = -120) ===== */
      stage(KX, '#5fbf95', '#a8ecc8');
      const dots = []; for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) { const i = r * 10 + c, red = RED.includes(i); const d = new T.Mesh(new T.SphereGeometry(0.15, 16, 12), M(red ? '#ff5f86' : '#9fd3ff', { roughness: 0.35 })); d.userData.p = [KX - 1.62 + c * 0.36, 4.95 - r * 0.36, 0.2]; d.userData.red = red; d.userData.r = r; scene.add(d); dots.push(d); }
      return { key, hemi, room, house, slots, C, phK, phM, phD, glow, board, hearts, bars, bk, gph, gcv, gtx, beam, ballA, ballB, dots, sofa };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.22, dn); s.key.intensity = U.lerp(0.68, 0.3, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'ngo', 'nmom'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, ex: ex || 'happy' }, o || {}));
      let heartsOn = false, heartsT0 = 0, phKOn = false, phMOn = false, phDOn = false, nSlots = 0, houseOn = true, boardOn = false, glowOn = 0;
      const hop = (f, a) => Math.abs(Math.sin(t * f)) * a;
      if (bt === 'cover') {
        def('nmom', 1.45, -0.1, 'worried', { ry: -0.3, a2: [2.65, 0.25], a1: [-0.5, -0.6] }); phMOn = true; s.phM.rotation.set(0.0, 0, PI);
        def('ngo', -0.8, 0.55, 'angry', { y: hop(7, 0.22), ry: 0.5, a2: [2.55 + 0.12 * Math.sin(t * 9), 0.35], a1: [-2.55 - 0.12 * Math.sin(t * 9), 0.35] });
      } else if (bt === 's4') {
        const p = ph('s4', t), q = SP('s4', 0.45), give = P('s4', 0.82);
        def('nmom', 1.35, -0.1, t > give ? 'giggle' : 'happy', { ry: -0.4, a1: t > give - 0.4 && t < give + 0.6 ? [-0.6, -1.0] : null });
        def('ngo', -0.75, 0.45, t > P('s4', 0.2) ? 'giggle' : 'happy', { ry: 0.45, y: t > P('s4', 0.2) && t < P('s4', 0.3) ? hop(7, 0.14) : 0, a2: t < give ? [0.5, -1.0] : t < give + 0.6 ? [0.9, -1.2] : null, wave: t > give + 0.8 });
        phKOn = t < give; phMOn = t >= give; void p; void q;
      } else if (bt === 's5') {
        const p = ph('s5', t), q = SP('s5', 0.5), k = U.easeIO(U.clamp((p - 0.06) / 0.26)), drop = P('s5', 0.36), dadDrop = P('s5', 0.86);
        if (t < q) { def('ngo', U.lerp(1.4, -1.6, k), 0.2, 'happy', { ry: U.lerp(-0.9, -0.5, k), y: k > 0.02 && k < 0.98 ? hop(8, 0.1) : 0, a1: t > drop - 0.5 && t < drop + 0.3 ? [-0.7, -1.1] : null, wave: t > drop + 0.6 }); phKOn = t < drop; }
        nSlots = t >= drop ? 1 : 0;
        if (t >= q) {
          def('dad', -1.25, 0.1, t > dadDrop ? 'giggle' : 'worried', { ry: t > dadDrop ? 0.35 : 0.1, a1: t < dadDrop ? [-0.35, -1.1] : t < dadDrop + 0.5 ? [-0.9, -1.0] : null });
          def('mama', 0.55, 0.65, t > dadDrop ? 'giggle' : 'worried', { ry: -0.55, a1: t < dadDrop ? [-1.3 - 0.12 * Math.sin(t * 8), 0.5] : null, y: t > dadDrop ? hop(7, 0.14) : 0 });
          phDOn = t < dadDrop; nSlots = t >= dadDrop ? 2 : 1;
        }
      } else if (bt === 's6') {
        def('ngo', 0.2, 0.5, 'sleepy', { a2: [0.55, -1.15] }); phKOn = true; glowOn = 1;
      } else if (bt === 's8') {
        const q = SP('s8', 0.5), calm = t > P('s8', 0.4);
        def('ngo', -0.75, 0.45, calm ? (t > q + 0.6 ? 'happy' : 'sleepy') : 'cry', { ry: 0.4, y: calm ? 0 : hop(5, 0.08), a1: calm ? null : [-2.0 - 0.1 * Math.sin(t * 9), 0.3], a2: calm ? null : [2.0 + 0.1 * Math.sin(t * 9), 0.3] });
        def('nmom', 1.15, 0.0, calm ? 'happy' : 'worried', { ry: -0.45, a1: [-0.75, -0.95] }); phMOn = true;
      } else if (bt === 's9') {
        def('nmom', 1.3, -0.3, 'happy', { ry: -0.25 });
        def('ngo', -0.7, 0.4, 'giggle', { ry: 0.3, wave: ph('s9', t) > 0.85 });
        nSlots = 2;
      } else if (bt === 's10') {
        def('mom', -1.9, -0.7, 'happy', { ry: 0.15 });
        def('dad', 1.95, -0.7, 'giggle', { ry: -0.15, wave: ph('s10', t) > 0.55 });
        def('mama', 0.0, 1.4, 'giggle', { y: ph('s10', t) > 0.3 ? hop(6, 0.12) : 0, a2: ph('s10', t) > 0.3 ? [2.2, 0.7] : null });
        def('nana', -1.6, 1.4, 'giggle', { wave: ph('s10', t) > 0.4 });
        def('wawa', 1.45, 1.4, 'happy');
        boardOn = true; houseOn = false; heartsOn = ph('s10', t) > 0.3; heartsT0 = P('s10', 0.3);
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(0, q.ry, 0);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base * Math.max(0.01, q.sc == null ? 1 : q.sc));
      }
      if (bt !== 'cover') s.phM.rotation.set(0, 0, 0);
      s.phK.visible = phKOn; s.phM.visible = phMOn; s.phD.visible = phDOn; s.board.visible = boardOn; s.house.visible = houseOn;
      s.slots.forEach((p, i) => { p.visible = i < nSlots; });
      s.glow.intensity = glowOn ? 1.6 + 0.3 * Math.sin(t * 5) : 0; if (glowOn) { C.ngo.updateMatrixWorld(true); s.phK.getWorldPosition(s.glow.position); s.glow.position.z += 0.6; }
      /* s2: giant phone */
      { const on = bt === 's2', g = s.gph; g.visible = on;
        if (on) { const p = ph('s2', t), q = SP('s2', 0.48), pull = Math.pow(U.clamp((p - 0.8) / 0.12), 2), bb = g.userData.base;
          g.position.set(bb[0] + pull * 4.5, bb[1] + pull * 1.2 + 0.05 * Math.sin(t * 2), bb[2]); g.rotation.set(0, -0.35 + pull * 0.4, -pull * 0.5);
          const x = s.gcv.getContext('2d'), w = 384, h = 640;
          if (t < q) { const off = (t - at('s2')) * 330; x.fillStyle = '#1e1a2e'; x.fillRect(0, 0, w, h); const ch = 300, n0 = Math.floor(off / ch);
            for (let i = -1; i < 4; i++) { const k = i + n0, y = i * ch - (off % ch) + 20; const col = ['#ff8fab', '#79dcb4', '#ffd23f', '#9fd3ff', '#c9b6ff'][((k % 5) + 5) % 5];
              x.fillStyle = col; x.beginPath(); x.roundRect(18, y, w - 36, ch - 30, 26); x.fill();
              x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath(); x.arc(w / 2, y + 120, 46, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(w / 2 - 14, y + 96); x.lineTo(w / 2 + 26, y + 120); x.lineTo(w / 2 - 14, y + 144); x.fill();
              x.fillStyle = '#ffffff'; x.font = '700 34px Kanit,sans-serif'; x.textAlign = 'left'; x.fillText('♥ ' + (3 + ((k * 7) % 9)) + 'k', 40, y + 240); }
          } else { const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#6a4cff'); gr.addColorStop(1, '#ff6fb0'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
            x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.font = '800 56px Kanit,sans-serif'; x.fillText('ด่าน 12', w / 2, 90);
            x.fillStyle = '#ffd23f'; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -PI / 2 + i * PI / 5 + t * 0.6, r = i % 2 ? 50 : 110; x.lineTo(w / 2 + Math.cos(a) * r, 270 + Math.sin(a) * r); } x.closePath(); x.fill();
            const fill = Math.min(0.99, 0.82 + (t - q) * 0.06); x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.roundRect(40, 430, w - 80, 46, 23); x.fill(); x.fillStyle = '#5fe39a'; x.beginPath(); x.roundRect(40, 430, (w - 80) * fill, 46, 23); x.fill();
            x.fillStyle = '#ffffff'; x.font = '800 40px Kanit,sans-serif'; x.fillText(Math.round(fill * 100) + '%', w / 2, 520);
            ['#ffd23f', '#9fd3ff', '#79dcb4'].forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(110 + i * 82, 588, 30, 0, 7); x.fill(); x.fillStyle = '#3a2f3f'; x.beginPath(); x.arc(100 + i * 82, 582, 4, 0, 7); x.arc(120 + i * 82, 582, 4, 0, 7); x.fill(); }); }
          s.gtx.needsUpdate = true;
          def('ngo', NX - 1.35, 0.45, t < q ? 'giggle' : p > 0.8 ? 'angry' : 'happy', { ry: 0.55, y: p > 0.84 ? hop(7, 0.2) : 0, a2: p > 0.82 ? [2.0 + 0.15 * Math.sin(t * 9), 0.9] : [0.45, -1.0] });
          const g2 = C.ngo, q2 = st.ngo; g2.visible = true; g2.position.set(q2.x, q2.y, q2.z); g2.rotation.set(0, q2.ry, 0); g2.userData.setExpr(q2.ex); g2.userData.tick(t, {}); g2.userData.arm1.rotation.z = q2.a2[0]; g2.userData.arm1.rotation.x = q2.a2[1]; g2.scale.setScalar(g2.userData.base); } }
      /* s3: balance + kid */
      { const on = bt === 's3'; s.beam.parent.visible = on;
        if (on) { const q = SP('s3', 0.55), gk = U.easeIO(U.clamp((t - q) / 1.2)), rb = 0.3 + 0.18 * gk; s.ballB.scale.setScalar(rb / 0.3); s.ballB.position.y = 0.16 + rb * 0.75;
          s.beam.rotation.z = U.lerp(0.34, 0.14, gk) * U.easeOut(U.clamp((t - at('s3') - 0.3) / 0.8)) + 0.03 * Math.sin(t * 3);
          s.ballA.scale.setScalar(1 + 0.05 * Math.sin(t * 6));
          def('ngo', t < q ? RX - 1.7 : RX - 1.35, 0.6, t < q ? 'angry' : 'happy', { ry: 0.35, y: t < q ? hop(6, 0.12) : 0 });
          if (t >= q) def('nmom', RX - 3.35, -0.4, 'happy', { ry: 0.45, a2: [0.9, -0.6] });
          for (const k of ['ngo', 'nmom']) { const g = C[k], q2 = st[k]; if (!q2) continue; g.visible = true; g.position.set(q2.x, q2.y, q2.z); g.rotation.set(0, q2.ry, 0); g.userData.setExpr(q2.ex); g.userData.tick(t, {}); if (q2.a2) { g.userData.arm1.rotation.z = q2.a2[0]; g.userData.arm1.rotation.x = q2.a2[1]; } g.scale.setScalar(g.userData.base); } } }
      /* hearts */
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(0.1 + u[0], 3.4 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });
      /* s1 bars */
      { const on = inB('s1', t), q = SP('s1', 0.55), ex = ['giggle', 'happy', 'worried'];
        s.bars.forEach((b, i) => { const t0 = i < 2 ? TM('s1', i, 0.06 + i * 0.12) : q; const k = U.easeOut(U.clamp((t - t0) / 0.6)) * (on ? 1 : 0); b.scale.y = Math.max(0.01, BH[i] * k); const g = s.bk[i]; g.visible = on && k > 0.02; if (!g.visible) return;
          g.position.set(b.position.x, b.scale.y + (i < 2 ? hop(5 + i, 0.06) : 0), 0.15); g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(k * 1.5)))); g.userData.setExpr(ex[i]); g.userData.tick(t, { wave: i === 0 && ph('s1', t) > 0.3 }); }); }
      /* s7 dots */
      { const on = bt === 's7', p = on ? ph('s7', t) : 0, q = SP('s7', 0.55);
        s.dots.forEach((d) => { const u = d.userData, k = U.easeBack(U.clamp((p - 0.04 - u.r * 0.025) / 0.12)); d.visible = on && k > 0.01; if (!d.visible) return; const pp = u.p;
          const big = u.red && p > 0.3 ? 1.35 + 0.15 * Math.sin(t * 6) : 1; d.position.set(pp[0], pp[1] + (u.red && p > 0.3 ? 0.08 * Math.abs(Math.sin(t * 5)) : 0), pp[2] + (u.red ? 0.15 : 0)); d.scale.setScalar(k * big);
          d.material.color.set(u.red ? '#ff5f86' : t > q ? '#79dcb4' : '#9fd3ff'); }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, bk: s.bk, gph: s.gph, ballA: s.ballA, ballB: s.ballB, house: s.house }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's1') return ['#a8d8ff', '#e3f3ff']; if (b === 's2') return ['#d9ccff', '#f3edff']; if (b === 's3') return ['#ffd8a8', '#fff4e6']; if (b === 's6') return ['#3a3570', '#6a4a80']; if (b === 's7') return ['#bff0d6', '#effff5']; return ['#ffd1e3', '#fff4e6']; },
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
      const fadeTo = (q) => (t < q ? 1 : U.clamp((q + 0.3 - t) / 0.3));
      const C = S.C;
      if (b === 'cover') { let [x, y] = wp(C.ngo.userData.head, 0, 0.95); bubble('อ๊ากก! จะชนะอยู่แล้ว!!', x + 40, y - 80, U.clamp((t - 0.2) / 0.3), 44);
        [x, y] = wp(C.nmom.userData.head, 0, 0.9); bubble('พอแล้วลูก!', x + 20, y - 40, U.clamp((t - 1.0) / 0.3), 36); }
      /* s1: bars */
      if (b === 's1') { const q = SP('s1', 0.55), NM = ['ใช้มือถือ', 'ใช้แท็บเล็ต', 'พ่อแม่กังวล'];
        S.bk.forEach((w, i) => { const t0 = i < 2 ? TM('s1', i, 0.06 + i * 0.12) : q; const k = U.clamp((t - t0) / 0.6), a = U.clamp(k * 3); if (a <= 0) return;
          let [x, y] = proj(new T.Vector3(LX + BXO[i], Math.max(0.35, BH[i] * 0.45), 0.75)); tag(NM[i], x, y, 38, a, ['#dff0ff', '#c9f5d9', '#ffd6e4'][i]);
          [x, y] = wp(w.userData.head, 0, 0.95); g.save(); g.globalAlpha = a; txt(Math.round(PCT[i] * U.easeOut(k)) + '%', x, y - 34, 64, i === 2 ? '#ffd35e' : '#ffffff', 800); g.restore(); }); }
      /* s2: labels */
      if (b === 's2') { const p = ph('s2', t), q = SP('s2', 0.48);
        let [x, y] = wp(C.ngo.userData.head, 0, 0.9); tag('น้องเงาะ ป.4', x, y - 40, 34, U.clamp((p - 0.04) / 0.08) * fadeTo(P('s2', 0.3)));
        if (t < q) { const [px, py] = wp(S.gph, 0, -2.0, 0.3); tag('เลื่อนต่อได้ ไม่มีวันจบ ↓', px, py + 40, 36, U.clamp((p - 0.12) / 0.08) * fadeTo(q), '#e6dcff'); }
        else { const [px, py] = wp(S.gph, 0, -2.0, 0.3); tag('เพื่อนในทีมรออยู่', px, py + 40, 36, U.clamp((t - q - 0.3) / 0.3) * fadeTo(P('s2', 0.8)), '#ffd6e4');
          bubble('เดี๋ยวว! ด่านค้าง!!', x + 60, y - 60, U.clamp((p - 0.84) / 0.05), 42); } }
      /* s3: balance labels */
      if (b === 's3') { const q = SP('s3', 0.55);
        let [x, y] = wp(S.ballA, 0, 0.95); tag('อยากเล่นต่อ', x, y - 10, 38, U.clamp((t - at('s3') - 0.6) / 0.3), '#ffd6dc');
        [x, y] = wp(S.ballB, 0, 0.75); tag(t < q ? 'เบรกห้ามใจ' : 'เบรก + พ่อแม่ช่วย', x, y - 10, 38, U.clamp((t - at('s3') - 1.0) / 0.3), '#dff0ff'); }
      /* s4: agree first, count rounds */
      if (b === 's4') { const p = ph('s4', t), q = SP('s4', 0.45), give = P('s4', 0.82);
        let [x, y] = wp(C.nmom.userData.head, 0, 1.0); bubble('วันนี้เล่นกี่ตาดี?', x - 60, y - 60, U.clamp((p - 0.05) / 0.08) * fadeTo(P('s4', 0.4)), 40);
        bubble('ตาสุดท้ายแล้วนะ', x - 60, y - 60, U.clamp((t - q - 0.6) / 0.3) * fadeTo(give - 0.2), 40);
        [x, y] = wp(C.ngo.userData.head, 0, 0.9); bubble('3 ตา!', x - 10, y - 60, U.clamp((p - 0.2) / 0.06) * fadeTo(P('s4', 0.4)), 44);
        bubble('จบตาแล้ว ให้แม่!', x + 30, y - 60, U.clamp((t - give) / 0.3), 40);
        const a = U.clamp((t - P('s4', 0.3)) / 0.3) * fadeTo(give - 0.1); if (a > 0) { const y0 = REEL ? 540 : 580, cw = 250, x0 = 540 - cw * 1.5 - 10; g.save(); g.globalAlpha = a;
          ['ตาที่ 1', 'ตาที่ 2', 'ตาสุดท้าย'].forEach((s2, i) => { const on = t > P('s4', 0.36) + i * 0.75, cx = x0 + i * (cw + 10); rr(cx, y0, cw, 130, 28, on ? (i === 2 ? '#ff6f91' : '#ffffff') : 'rgba(255,255,255,.65)', on ? '#ff6f91' : null); plain(s2, cx + cw / 2, y0 + 44, 36, on && i === 2 ? '#ffffff' : '#3a2f3f', 800, 'center');
            if (on && i < 2) check(cx + cw / 2, y0 + 94, 30, '#3fbf74'); if (i === 2) plain(on ? 'เตือนตรงนี้' : '…', cx + cw / 2, y0 + 94, 30, on ? '#ffffff' : '#8a7a8f', 700, 'center'); }); g.restore(); } }
      /* s5: phone house */
      if (b === 's5') { const p = ph('s5', t), q = SP('s5', 0.5), drop = P('s5', 0.36), dadDrop = P('s5', 0.86);
        const [hx, hy] = wp(S.house, 0, 3.15, 0); tag('บ้านมือถือ (นอกห้องนอน)', hx + 120, hy - 20, 36, U.clamp((p - 0.04) / 0.08), '#fff1c9');
        if (t < q) { const [x, y] = wp(C.ngo.userData.head, 0, 0.9); bubble('ไปนอนนะมือถือ', x + 40, y - 60, U.clamp((t - drop) / 0.3) * fadeTo(q - 0.1), 38); }
        else { let [x, y] = wp(C.mama.userData.head, 0, 0.9); bubble('พ่อ! เล่นด้วยกัน!', x + 30, y - 60, U.clamp((t - q - 0.3) / 0.3) * fadeTo(dadDrop - 0.1), 40);
          [x, y] = wp(C.dad.userData.head, 0, 1.0); bubble('วางด้วยคน!', x + 40, y - 60, U.clamp((t - dadDrop) / 0.3), 40); } }
      /* s6: doctor list */
      if (b === 's6') { const p = ph('s6', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 430, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['คุมเวลาเล่นเองไม่ได้เลย', 'เกมมาก่อนการเรียน การกิน การนอน', 'เห็นผลเสียแล้ว ยังเล่นหนักขึ้น', 'โดนยึดแล้วทำร้ายตัวเองหรือคนอื่น'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.16)) / 0.35); if (a <= 0) return; const y = 388 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(37 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ข้อ 1–3 = เกณฑ์โรคติดเกมของ WHO (มักนาน 12 เดือน)', 540, 690, Math.round(26 * LF), 'rgba(255,255,255,.9)', 400, 'center'); plain('สายด่วนสุขภาพจิต 1323', 540, 724, Math.round(28 * LF), '#ffd35e', 700, 'center'); g.restore(); }
      /* s7: 3 in 100 */
      if (b === 's7') { const p = ph('s7', t); const [x, y] = proj(new T.Vector3(KX, 1.25, 0.8)); tag(t < SP('s7', 0.55) ? '3 ใน 100 คน' : 'ส่วนใหญ่ = นิสัย ปรับได้', x, REEL ? Math.min(y, 1215) : y, 42, U.clamp((p - 0.3) / 0.08), t < SP('s7', 0.55) ? '#ffd6e4' : '#c9f5d9'); }
      /* s8: tantrum, stay calm */
      if (b === 's8') { const p = ph('s8', t), q = SP('s8', 0.5);
        let [x, y] = wp(C.nmom.userData.head, 0, 1.0); bubble('แม่รู้ หนูหงุดหงิด เพราะจะชนะแล้ว', x - 120, y - 60, U.clamp((p - 0.14) / 0.08) * fadeTo(q - 0.05), 36);
        [x, y] = wp(C.ngo.userData.head, 0, 0.9); tag('สงบแล้ว ค่อยคุยกติกา', 540, y - 70, 38, U.clamp((t - q - 0.6) / 0.3), '#c9f5d9'); void x; }
      /* s9: tips */
      if (b === 's9') { const p = ph('s9', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['ตกลงกันก่อนเปิด ว่าเล่นกี่ตา', 'เตือนตอนเริ่มตาสุดท้าย ไม่ดึงกลางด่าน', 'ร้องแล้วไม่คืน แต่อยู่ข้างๆ ใจเย็น', 'มือถือนอนนอกห้อง งดจอก่อนนอน 1 ชม.', 'พ่อแม่วางมือถือด้วย'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s9', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s9', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(35 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); }
      /* s10: closing */
      if (b === 's10') { const p = ph('s10', t); if (p > 0.3) { const [x, y] = proj(new T.Vector3(0.1, 0, 3.6)); tag('คืนนี้ เล่นเกมกระดานกัน!', x, REEL ? Math.min(y + 10, 1222) : y + 10, 40, U.clamp((p - 0.3) / 0.06), '#fff1c9'); } }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[70, ['ยึดมือถือคืนทีไร', '#fff']], [80, ['บ้านแตกทุกที?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: SP('s1', 0.55), y: 290, lines: [[58, ['ไม่ใช่บ้านคุณบ้านเดียว', '#fff']], [46, ['เด็ก 5–11 ขวบ ส่วนใหญ่ใช้มือถือ-แท็บเล็ต', '#ffd35e', 700]]], foot: 'สำรวจพ่อแม่ในสหรัฐฯ 3,640 คน · Pew Research Center 2020' },
      { t0: SP('s1', 0.55) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[56, ['และพ่อแม่ 71%', '#fff']], [52, ['กังวลว่าลูกอยู่หน้าจอมากไป', '#ffd35e']]], foot: 'พ่อแม่ที่มีลูกอายุต่ำกว่า 12 ปี · Pew Research Center 2020' },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.48), y: 290, lines: [[56, ['ทำไมยึดทีไร ระเบิดทุกที?', '#fff']], [50, ['① คลิปสั้น เลื่อนได้ไม่มีวันจบ', '#ffd35e']]] },
      { t0: SP('s2', 0.48) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[56, ['② ยึดกลางด่าน', '#fff']], [48, ['= ของที่กำลังจะได้ หายต่อหน้า', '#ffd35e']]] },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.55), y: 290, lines: [[54, ['③ เบรกห้ามใจในสมองเด็ก', '#fff']], [52, ['ยังเล็กกว่าความอยากมาก', '#ffd35e']]], foot: 'สมองส่วนหน้าที่ช่วยยั้งใจ โตเต็มที่ราววัยผู้ใหญ่ตอนต้น (NIMH)' },
      { t0: SP('s3', 0.55) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[56, ['ไม่ใช่ลูกนิสัยเสีย', '#fff']], [50, ['พ่อแม่ต้องช่วยเป็น "เบรก" ไปก่อน', '#ffd35e']]] },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.45), y: 290, lines: [[56, ['1. ตกลงกัน "ก่อนเปิดเครื่อง"', '#ffd35e']], [48, ['นับเป็น "ตา" ไม่ใช่ "นาที"', '#fff', 600]]] },
      { t0: SP('s4', 0.45) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[56, ['เตือนตอน "เริ่มตาสุดท้าย"', '#ffd35e']], [48, ['ไม่ใช่ดึงเครื่องกลางด่าน', '#fff', 600]]] },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[56, ['2. มือถือต้องมี "บ้าน"', '#ffd35e']], [46, ['ชาร์จนอกห้องนอน งดจอตอนกินข้าว', '#fff', 600]]], foot: 'AAP 2016: ไม่ใช้จอระหว่างมื้อ และ 1 ชม. ก่อนนอน' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[54, ['แต่พ่อแม่ 68% ยอมรับว่า', '#fff']], [48, ['เสียสมาธิกับมือถือ ตอนอยู่กับลูก', '#ffd35e']]], foot: 'Pew Research Center 2020 (สหรัฐฯ)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[56, ['ปรึกษาแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.55), y: 290, lines: [[56, ['ที่เป็น "โรคติดเกม" จริง', '#fff']], [52, ['ทั่วโลกราว 3 ใน 100 คน', '#ffd35e']]], foot: 'รวม 53 งานวิจัย 17 ประเทศ (Stevens et al. 2021)' },
      { t0: SP('s7', 0.55) + 0.02, t1: end('s7') - 0.05, y: 290, lines: [[56, ['ส่วนใหญ่เป็นแค่นิสัย', '#fff']], [50, ['ที่ปรับได้ด้วยกติกาในบ้าน', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[56, ['3. ถ้าระเบิดไปแล้ว', '#ffd35e']], [46, ['ใจเย็น อยู่ข้างๆ บอกชื่ออารมณ์ลูก', '#fff', 600]]], foot: 'บอกชื่ออารมณ์ ช่วยลูกหัดจัดการอารมณ์ (Radesky, ม.มิชิแกน)' },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[56, ['ร้องแล้ว ไม่คืนเครื่อง', '#ffd35e']], [48, ['แต่ไม่ดุ ไม่เถียงตอนกำลังโกรธ', '#fff', 600]]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[56, ['5 ข้อ ยึดมือถือไม่ต้องรบ', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[56, ['ยึดได้ ไม่ต้องรบ', '#fff']], [56, ['แค่ตกลงกันก่อนเปิด', '#ffd35e']], [40, ['บ้านคุณให้ลูกเล่นวันละกี่ตา? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: Pew 2020, AAP 2016, WHO ICD-11, Stevens 2021, NIMH' },
    ],
    trans,
    audio: [
      [0.2, 'whoosh'], [0.35, 'boing'], [0.6, 'thud'], [1.0, 'pop'],
      [TM('s1', 0, 0.06) + 0.4, 'pop'], [TM('s1', 1, 0.18) + 0.4, 'pop'], [SP('s1', 0.55) + 0.4, 'pop'], [SP('s1', 0.55) + 0.9, 'warn'],
      [at('s2') + 0.4, 'tick'], [P('s2', 0.15), 'tick'], [P('s2', 0.25), 'tick'], [P('s2', 0.35), 'tick'], [SP('s2', 0.48), 'twinkle'], [P('s2', 0.65), 'tick'], [P('s2', 0.8), 'whoosh'], [P('s2', 0.84), 'boing'], [P('s2', 0.88), 'thud'],
      [at('s3') + 0.5, 'thud'], [at('s3') + 1.0, 'pop'], [SP('s3', 0.55), 'riser'], [SP('s3', 0.55) + 1.2, 'ding'],
      [at('s4') + 0.5, 'pop'], [P('s4', 0.2), 'boing'], [P('s4', 0.22), 'giggle'], [P('s4', 0.36), 'tick'], [P('s4', 0.36) + 0.75, 'tick'], [P('s4', 0.36) + 1.5, 'ding'], [P('s4', 0.82), 'pop'], [P('s4', 0.84), 'giggle'],
      [at('s5') + 0.4, 'twinkle'], [P('s5', 0.36), 'ding'], [SP('s5', 0.5) + 0.3, 'warn'], [P('s5', 0.86), 'ding'], [P('s5', 0.88), 'giggle'],
      [at('s6') + 0.4, 'warn'], [TM('s6', 0, 0.1), 'tick'], [TM('s6', 1, 0.26), 'tick'], [TM('s6', 2, 0.42), 'tick'], [TM('s6', 3, 0.58), 'heartbeat'], [P('s6', 0.85), 'heartbeat'],
      [at('s7') + 0.4, 'shimmer'], [P('s7', 0.3), 'pop'], [SP('s7', 0.55), 'twinkle'],
      [at('s8') + 0.3, 'boing'], [P('s8', 0.14), 'pop'], [P('s8', 0.4), 'breath'], [SP('s8', 0.5) + 0.6, 'ding'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [P('s10', 0.3), 'giggle'], [P('s10', 0.4), 'heart'], [P('s10', 0.7), 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s4'), CK.MUSIC.OOPS), CK.musicBed(at('s4'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.CUTE), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.OOPS), CK.musicBed(at('s9'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
