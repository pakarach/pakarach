/* พ่อแม่หัวจะปวด — นิทานเล่มเดิม (moody story clip, ~45 s, no voice-over; Nov 2026)
   Story: นานะถือนิทานเล่มเดิมมาทุกคืน → "พรุ่งนี้นะ" → พี่น้องเป็นบันไดเวลา (วาวาเล่นหนังสือ / มามะอ่านเอง) → คืนที่พ่อว่าง ลูกหลับแล้ว → พ่ออ่านให้ฟังอยู่ดี "คืนนี้…ยังทัน"
   Build: node build.js nithan-lem-doem.js review-nithan-lem-doem.html --kit clay --title "นิทานเล่มเดิม" --data reel=docs/family/safe.json */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.6], ['s1', 6], ['s2', 7], ['s3', 5.5], ['s4', 7.5], ['s5', 7], ['s6', 8], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => U.clamp((t - at(id)) / dur(id)), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's6'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const K = (t, f) => Object.assign({ t }, f);

  /* ---- set ---- */
  const MT = 0.75, A_LIE = 0.45, ZH = -1.9, BX = -2.3;
  const KX = { mama: -3.15, nana: -1.45 };
  const DOOR = 1.7, DESK = { x: 4.0, z: -2.0, y: 1.2 }, DADDESK = { x: 4.0, z: -3.05 }, STOOL = { x: 0.65, z: -1.05 };
  const lieT = (g, x) => { const s = g.userData.base, hy = g.userData.hy0 * s, R = 0.72 * s, yh = MT + 0.12 + 0.55 * R; return { x, y: yh - hy * Math.sin(A_LIE), z: ZH + hy * Math.cos(A_LIE), rx: -PI / 2 + A_LIE }; };
  const sitY = (g, seat) => seat - (g.userData.base >= 1.2 ? 0.393 : 0.163) * g.userData.base + 0.02;
  const place = (g, x, y, z, ry, rx) => { g.position.set(x, y, z); g.rotation.set(rx || 0, ry || 0, 0); };

  /* ---- textures ---- */
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); return tx; };
  const coverTex = () => ctex(256, 200, (x) => {
    x.fillStyle = '#ffb347'; x.fillRect(0, 0, 256, 200); x.fillStyle = '#ffd27a'; x.fillRect(0, 0, 18, 200);
    x.fillStyle = '#fffbe6'; x.beginPath(); x.arc(84, 62, 34, 0, 7); x.fill(); x.fillStyle = '#ffb347'; x.beginPath(); x.arc(100, 52, 30, 0, 7); x.fill();
    x.fillStyle = '#fffbe6'; for (const [a, b, r] of [[170, 40, 6], [205, 70, 4], [150, 90, 4], [225, 30, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); }
    x.fillStyle = '#6fcf97'; x.beginPath(); x.ellipse(150, 205, 140, 60, 0, 0, 7); x.fill();
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(160, 140, 20, 0, 7); x.fill(); x.beginPath(); x.ellipse(150, 112, 6, 16, -0.2, 0, 7); x.fill(); x.beginPath(); x.ellipse(168, 110, 6, 16, 0.2, 0, 7); x.fill();
    x.fillStyle = '#3a2f3f'; x.beginPath(); x.arc(153, 138, 2.5, 0, 7); x.fill(); x.beginPath(); x.arc(167, 138, 2.5, 0, 7); x.fill();
  });
  const pageTex = (k) => ctex(128, 160, (x) => { x.fillStyle = '#fffaf0'; x.fillRect(0, 0, 128, 160); x.fillStyle = k ? '#ffb347' : '#8fc9ff'; x.beginPath(); x.arc(64, 62, 30, 0, 7); x.fill(); x.fillStyle = '#c9c0b0'; for (let i = 0; i < 3; i++) x.fillRect(20, 110 + i * 14, 88 - i * 18, 6); });
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#1d2366'); g.addColorStop(1, '#3d3f8f'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(170, 82, 36, 0, 7); x.fill(); x.fillStyle = '#262b72'; x.beginPath(); x.arc(186, 70, 32, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 3], [90, 30, 2], [60, 120, 2], [120, 90, 3], [220, 170, 2], [30, 190, 2], [150, 200, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });
  const dots = (base, dot) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } });

  /* ---- shots ---- */
  const SH = {
    cover: [FW(1.55, -3.6, 4.3, 1.2, 0.12), FW(1.6, -3.6, 4.0, 1.15, 0.12)],
    s1: [FW(-0.6, -1.5, 7.0, 2.4, 0.34), FW(-0.5, -1.5, 6.5, 2.3, 0.34)],
    s2: [FW(3.05, -2.6, 5.4, 2.45, 0.14), FW(3.05, -2.6, 5.0, 2.4, 0.14)],
    s3: [FW(2.35, -1.2, 7.4, 2.45, 0.2), FW(2.25, -1.0, 6.9, 2.3, 0.2)],
    s4: [FW(-0.6, 0.6, 4.9, 2.25, 0.3), FW(-0.65, 0.6, 4.5, 2.2, 0.3)],
    s5a: FW(3.6, -2.7, 4.8, 2.45, 0.14), s5b: FW(-0.15, -1.5, 5.8, 2.65, 0.36),
    s6: [FW(0.1, -1.5, 5.8, 2.3, 0.38), FW(0.05, -1.5, 5.1, 2.2, 0.4)],
  };
  const CAM = [];
  for (const id of ['cover', 's1', 's2', 's3', 's4']) { CAM.push(K(at(id), SH[id][0]), K(end(id) - 0.001, SH[id][1])); }
  CAM.push(K(at('s5'), SH.s5a), K(P('s5', 0.38), SH.s5a), K(P('s5', 0.8), SH.s5b), K(end('s5') - 0.001, SH.s5b));
  CAM.push(K(at('s6'), SH.s6[0]), K(end('s6'), SH.s6[1]));
  const trans = ['s1', 's2', 's3', 's4', 's5', 's6'].map((id) => ({ t: at(id) - 0.45, dur: 0.9, type: 'iris', color: '#0e1028' }));

  /* dad's walk in s5: desk → stool */
  const PATH = [[DADDESK.x - 0.05, DADDESK.z], [2.5, -2.95], [1.1, -1.4], [STOOL.x + 0.2, STOOL.z + 0.25]];
  const walkAt = (u) => { const n = PATH.length - 1, f = U.clamp(u) * n, i = Math.min(n - 1, Math.floor(f)), k = f - i; const a = PATH[i], b = PATH[i + 1]; return [U.lerp(a[0], b[0], k), U.lerp(a[1], b[1], k), Math.atan2(b[0] - a[0], b[1] - a[1])]; };

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  const au = () => VE.audio;
  VE.registerSfx('page', (t) => { au().noise(t, 0.22, { type: 'bandpass', f: 2600, f2: 1400, vol: 0.09, att: 0.05, q: 0.8 }); });
  VE.registerSfx('type', (t, o) => { const n = (o && o.n) || 8; for (let i = 0; i < n; i++) au().noise(t + i * 0.13 + (i % 3) * 0.03, 0.03, { type: 'highpass', f: 3500, vol: 0.05 }); });
  VE.registerSfx('shut', (t) => { au().tone(t, 150, 0.08, { f2: 80, vol: 0.18 }); au().noise(t, 0.06, { type: 'lowpass', f: 900, vol: 0.12 }); });
  VE.registerSfx('steps', (t, o) => { const n = (o && o.n) || 4; for (let i = 0; i < n; i++) au().tone(t + i * 0.42, 95, 0.05, { f2: 60, vol: 0.12 }); });
  VE.registerSfx('soft', (t) => [784, 988].forEach((f, i) => au().tone(t + i * 0.12, f, 0.3, { vol: 0.045, rel: 0.6 })));

  VE.run({
    DUR, file: 'nithan-lem-doem', title: 'นิทานเล่มเดิม', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'เรื่องเล็กๆ ในบ้าน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(6,6,24,.62)',
    setup({ scene }) {
      const L = CK.nightLights(T, scene, { hemi: 0.3, key: 0.22, fill: 0.24 });
      const M = (c, x) => CK.mat(T, c, x);
      /* room */
      const room = CK.room(T, { wall: '#3d4588', dots: 'rgba(255,255,255,0.14)', wain: '#4f4580', floor: '#a8754f', rug: false, props: false, winX: -3.3 }); scene.add(room);
      room.userData.win.material.map = nightTex();
      const rugT = dots('#8a72c4', '#a690dc');
      const rug = new T.Mesh(new T.CylinderGeometry(1.6, 1.6, 0.04, 40), [M('#8a72c4'), M('#ffffff', { map: rugT }), M('#8a72c4')]); rug.position.set(0.9, 0.02, 0.8); scene.add(rug);
      /* kids' bed */
      const frame = new T.Mesh(new T.BoxGeometry(3.7, 0.36, 4.6), M('#c98d5c')); frame.position.set(BX, 0.18, -0.5); scene.add(frame);
      const matt = new T.Mesh(new T.BoxGeometry(3.5, 0.4, 4.4), M('#e6c8ff')); matt.position.set(BX, MT - 0.2, -0.5); scene.add(matt);
      const hb = new T.Mesh(new T.BoxGeometry(3.7, 1.5, 0.3), M('#d9a06a')); hb.position.set(BX, 0.95, -2.85); scene.add(hb);
      for (const k of ['mama', 'nana']) { const p = new T.Mesh(new T.SphereGeometry(1, 24, 14), M('#fff4e6')); p.scale.set(0.78, 0.24, 0.5); p.position.set(KX[k], MT + 0.12, -2.2); scene.add(p); }
      const blT = dots('#4f7fd8', '#a9c6ff'); blT.wrapS = blT.wrapT = T.RepeatWrapping; blT.repeat.set(2, 2);
      const bm = M('#ffffff', { map: blT }), blanket = new T.Group();
      const bb = new T.Mesh(new T.BoxGeometry(3.4, 0.5, 2.6), bm); bb.position.set(BX, MT + 0.25, 0.75); blanket.add(bb);
      const roll = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 3.4, 24), bm); roll.rotation.z = PI / 2; roll.position.set(BX, MT + 0.3, -0.55); blanket.add(roll);
      scene.add(blanket);
      /* headboard lamp */
      const lamp = new T.Group(); lamp.add(new T.Mesh(new T.CylinderGeometry(0.16, 0.22, 0.2, 16), M('#fff4e6')));
      const bulb = new T.Mesh(new T.SphereGeometry(0.28, 20, 14), new T.MeshStandardMaterial({ color: '#ffd28a', emissive: '#ffb44d', emissiveIntensity: 1.0, roughness: 0.4 })); bulb.position.y = 0.32; lamp.add(bulb);
      lamp.position.set(-0.85, 1.8, -2.85); scene.add(lamp);
      const lampL = new T.PointLight(0xffa860, 1.2, 8); lampL.position.set(-0.9, 2.4, -2.0); scene.add(lampL);
      const halo = new T.Mesh(new T.SphereGeometry(0.6, 20, 14), new T.MeshBasicMaterial({ color: '#ffb44d', transparent: true, opacity: 0.18, depthWrite: false })); halo.position.copy(lamp.position).add(new T.Vector3(0, 0.32, 0)); scene.add(halo);
      /* doorway with warm hallway light */
      const dg = new T.Group(); dg.position.set(DOOR, 0, -4.32); scene.add(dg);
      const glow = new T.Mesh(new T.PlaneGeometry(1.3, 2.6), new T.MeshBasicMaterial({ color: '#ffc47a' })); glow.position.set(0, 1.3, 0.02); dg.add(glow);
      for (const [w, h, x, y] of [[0.14, 2.75, -0.72, 1.37], [0.14, 2.75, 0.72, 1.37], [1.58, 0.14, 0, 2.7]]) { const b = new T.Mesh(new T.BoxGeometry(w, h, 0.16), M('#f3e3c8')); b.position.set(x, y, 0.05); dg.add(b); }
      const hallL = new T.PointLight(0xffb870, 0.9, 5); hallL.position.set(DOOR, 2.0, -3.7); scene.add(hallL);
      /* desk + laptop */
      const top = new T.Mesh(new T.BoxGeometry(2.3, 0.12, 1.25), M('#a87452')); top.position.set(DESK.x, DESK.y, DESK.z); scene.add(top);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const l = new T.Mesh(new T.BoxGeometry(0.1, DESK.y, 0.1), M('#8a5d40')); l.position.set(DESK.x + sx * 1.05, DESK.y / 2, DESK.z + sz * 0.5); scene.add(l); }
      const chair = new T.Mesh(new T.BoxGeometry(1.0, 0.7, 0.9), M('#6a5a8a')); chair.position.set(DADDESK.x, 0.37, DADDESK.z - 0.05); scene.add(chair);
      const lap = new T.Group(); lap.position.set(DESK.x, DESK.y + 0.07, DESK.z + 0.32); scene.add(lap);
      const base = new T.Mesh(new T.BoxGeometry(1.0, 0.05, 0.66), M('#b9bfcc')); base.position.set(0, 0, -0.33); lap.add(base);
      const lid = new T.Group(); lap.add(lid);
      const lidG = new T.BoxGeometry(1.0, 0.68, 0.04); lidG.translate(0, 0.34, 0); lid.add(new T.Mesh(lidG, M('#c7ccd8')));
      const scr = new T.Mesh(new T.PlaneGeometry(0.9, 0.58), new T.MeshBasicMaterial({ color: '#cfe4ff' })); scr.position.set(0, 0.34, -0.025); scr.rotation.y = PI; lid.add(scr);
      const stk = new T.Mesh(new T.CircleGeometry(0.07, 20), M('#ff8fab')); stk.position.set(0.25, 0.48, 0.025); lid.add(stk);
      const scrL = new T.PointLight(0x9fc4ff, 1.0, 3.2); scrL.position.set(DESK.x, 2.0, DESK.z - 0.55); scene.add(scrL);
      /* stool by the bed */
      const stool = new T.Mesh(new T.CylinderGeometry(0.42, 0.42, 0.72, 20), M('#c98d5c')); stool.position.set(STOOL.x, 0.36, STOOL.z); scene.add(stool);
      /* dust motes in the lamp light */
      const motes = []; for (let i = 0; i < 14; i++) { const m = new T.Mesh(new T.SphereGeometry(0.025, 6, 5), new T.MeshBasicMaterial({ color: '#ffe2b0', transparent: true, opacity: 0.7 })); scene.add(m); motes.push(m); }

      /* books */
      const CT = coverTex(), PG = [pageTex(0), pageTex(1)];
      const closedBook = (col) => { const m = new T.Mesh(new T.BoxGeometry(0.85, 0.66, 0.12), [M('#fffaf0'), M(col), M('#fffaf0'), M('#fffaf0'), M('#ffffff', { map: CT }), M(col)]); return m; };
      const openBook = (col, cov) => {
        const g = new T.Group(), cm = cov ? M('#ffffff', { map: cov }) : M(col);
        for (const s of [-1, 1]) {
          const board = new T.Mesh(new T.BoxGeometry(0.46, 0.04, 0.64), [M(col), M(col), M(col), cm, M(col), M(col)]); board.position.set(s * 0.24, 0, 0); board.rotation.z = -s * 0.14; g.add(board);
          const pg = new T.Mesh(new T.BoxGeometry(0.42, 0.05, 0.6), [M('#fffaf0'), M('#fffaf0'), M('#ffffff', { map: PG[s > 0 ? 1 : 0] }), M('#fffaf0'), M('#fffaf0'), M('#fffaf0')]); pg.position.set(s * 0.23, 0.04, 0); pg.rotation.z = -s * 0.14; g.add(pg);
        }
        const piv = new T.Group(); piv.position.y = 0.07; g.add(piv); const fp = new T.Mesh(new T.BoxGeometry(0.42, 0.01, 0.58), M('#fffaf0')); fp.position.x = 0.22; piv.add(fp); g.userData.flip = piv;
        return g;
      };
      const C = {}; for (const k of ['dad', 'mama', 'nana', 'wawa']) { const g = CK.family(T, k); g.userData.base = g.scale.x; g.userData.hy0 = g.userData.head.position.y; scene.add(g); C[k] = g; }
      const bkHold = closedBook('#ff9a3c'); bkHold.position.set(0, 0.95, 0.52); bkHold.scale.setScalar(1.2); C.nana.add(bkHold);
      const bkLap = openBook('#ff9a3c', CT); bkLap.position.set(0, 0.62, 0.62); bkLap.rotation.x = 0.75; bkLap.scale.setScalar(1.3); C.nana.add(bkLap);
      const bkChest = closedBook('#ff9a3c'); bkChest.position.set(0.05, 0.85, 0.5); bkChest.rotation.z = 0.25; C.nana.add(bkChest);
      const bkDad = openBook('#ff9a3c', CT); bkDad.position.set(0, 1.18, 0.62); bkDad.rotation.x = 0.5; bkDad.scale.setScalar(1.35); C.dad.add(bkDad);
      const bkMama = openBook('#4fb38a'); bkMama.position.set(0, 0.46, 0.72); bkMama.rotation.x = 0.95; bkMama.scale.setScalar(1.3); C.mama.add(bkMama);
      const soft = new T.Group(); for (const [c, x, rz] of [['#ff9ec0', -0.2, 0.25], ['#9fe3cf', 0.2, -0.25]]) { const p = new T.Mesh(new T.BoxGeometry(0.4, 0.5, 0.14), M(c)); p.position.x = x; p.rotation.y = -rz * 2; soft.add(p); }
      C.wawa.add(soft); soft.position.set(0, 0.95, 0.5); soft.scale.setScalar(1.5);
      return { L, room, lampL, bulb, halo, glow, hallL, lid, scr, scrL, motes, C, bkHold, bkLap, bkChest, bkDad, bkMama, soft };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const pos = {}, ex = {}, vis = { dad: false, mama: false, nana: false, wawa: false }, pose = {};
      const books = { hold: false, lap: false, chest: false, dad: false, mama: false, soft: false };
      let lamp = 0.9, hall = 0.35, screen = 0, lidA = -0.32;
      const seatDad = () => [DADDESK.x, sitY(C.dad, 0.72), DADDESK.z, 0, 0];
      if (bt === 'cover') {
        vis.nana = true; const p = ph('cover', t); pos.nana = [DOOR - 0.05, 0, -3.55, 0.12, 0]; ex.nana = 'happy'; pose.nana = 'hug'; books.hold = true;
        hall = 1.0; lamp = 0.45; screen = 1; pose.nanaBob = p;
      } else if (bt === 's1') {
        const p = ph('s1', t);
        vis.dad = vis.nana = vis.mama = true; lamp = 1.25; hall = 0.25;
        pos.dad = [STOOL.x, sitY(C.dad, 0.72), STOOL.z, -0.6, 0]; ex.dad = 'happy'; pose.dad = 'read'; books.dad = true;
        pos.nana = [KX.nana + 0.15, sitY(C.nana, MT), -1.35, 0.35, -0.05]; ex.nana = (Math.sin(t * 2.3) > 0.1 && p > 0.25) ? 'giggle' : 'happy'; pose.nana = 'lean';
        pos.mama = 'lie'; ex.mama = p > 0.4 ? 'giggle' : 'happy';
      } else if (bt === 's2' || bt === 's3') {
        vis.dad = vis.nana = true; screen = 1; lamp = 0.45; hall = bt === 's2' ? 0.85 : 0.35;
        pos.dad = seatDad(); ex.dad = 'happy'; pose.dad = 'type';
        if (bt === 's2') {
          const p = ph('s2', t), kw = U.easeIO(U.clamp((p - 0.04) / 0.26));
          pos.nana = [U.lerp(DOOR, 2.15, kw), 0, U.lerp(-3.55, -1.95, kw), U.lerp(0.4, 0.75, kw), 0]; pose.nanaWalk = kw > 0 && kw < 1;
          ex.nana = p < 0.62 ? 'happy' : 'worried'; pose.nana = p < 0.7 ? 'offer' : 'hug'; books.hold = true;
          pose.dadTurn = p > 0.5 && p < 0.72 ? 0.35 : 0; if (p > 0.48 && p < 0.72) ex.dad = 'happy';
        } else {
          const p = ph('s3', t);
          pos.nana = [0.95, sitY(C.nana, 0.02), 0.85, 0.25, 0]; ex.nana = 'worried'; pose.nana = 'lapRead'; books.lap = true;
          if (p > 0.55) ex.nana = 'happy';
        }
      } else if (bt === 's4') {
        const p = ph('s4', t); vis.mama = vis.wawa = true; lamp = 1.0; hall = 0.25;
        pos.mama = [-1.75, sitY(C.mama, MT + 0.5), 0.55, 0.15, -0.04]; ex.mama = 'happy'; pose.mama = 'lapRead'; books.mama = true;
        pos.wawa = [0.55, sitY(C.wawa, 0.02), 1.45, -0.3, 0]; ex.wawa = p > 0.2 && Math.sin(t * 3) > 0 ? 'giggle' : 'happy'; pose.wawa = 'hug'; books.soft = true;
      } else if (bt === 's5') {
        const p = ph('s5', t); vis.dad = vis.nana = true; lamp = 0.85; hall = 0.25;
        pos.nana = 'lie'; ex.nana = 'sleepy'; books.chest = true; pos.mama = 'lie'; ex.mama = 'sleepy';
        const kc = U.easeIO(U.clamp((p - 0.08) / 0.12)); lidA = U.lerp(-0.32, -PI / 2 + 0.06, kc); screen = 1 - kc;
        if (p < 0.24) { pos.dad = seatDad(); ex.dad = p < 0.12 ? 'happy' : 'worried'; pose.dad = p < 0.08 ? 'type' : 'rest'; }
        else { const u = U.clamp((p - 0.26) / 0.52), w = walkAt(u), up = U.easeIO(U.clamp((p - 0.24) / 0.05)); const ry = u >= 1 ? -0.7 : U.clamp(w[2], -1.1, 1.1); pos.dad = [w[0], U.lerp(sitY(C.dad, 0.72), 0, up), w[1], ry, 0]; pose.dadWalk = u > 0 && u < 1; ex.dad = u >= 1 ? 'happy' : 'worried'; pose.dad = 'rest'; }
      } else {
        const p = ph('s6', t); vis.dad = vis.nana = true; hall = 0.25;
        lamp = U.lerp(0.95, 1.55, U.easeIO(U.clamp((p - 0.55) / 0.3)));
        pos.nana = 'lie'; ex.nana = 'sleepy'; pos.mama = 'lie'; ex.mama = 'sleepy';
        const ks = U.easeIO(U.clamp(p / 0.12));
        pos.dad = [U.lerp(STOOL.x + 0.2, STOOL.x, ks), U.lerp(0, sitY(C.dad, 0.72), ks), U.lerp(STOOL.z + 0.25, STOOL.z, ks), -0.6, 0]; ex.dad = 'happy';
        if (p < 0.2) { books.chest = true; pose.dad = 'rest'; } else { books.dad = true; pose.dad = 'read'; }
      }
      /* apply characters */
      for (const k of ['dad', 'mama', 'nana', 'wawa']) {
        const g = C[k]; g.visible = vis[k]; if (!vis[k]) continue;
        const q = pos[k] === 'lie' ? (() => { const l = lieT(g, KX[k]); return [l.x, l.y, l.z, 0, l.rx]; })() : pos[k];
        let y = q[1]; if ((k === 'nana' && pose.nanaWalk) || (k === 'dad' && pose.dadWalk)) y += 0.06 * Math.abs(Math.sin(t * 7));
        place(g, q[0], y, q[2], q[3], q[4]);
        g.userData.setExpr(ex[k] || 'happy'); g.userData.tick(t, { breath: ex[k] === 'sleepy' ? 0.25 : 0.4 });
        const ud = g.userData, A1 = ud.arm1, A2 = ud['arm-1'], hd = ud.head; hd.rotation.x = 0; hd.rotation.y = 0; A1.rotation.x = A2.rotation.x = -0.12; A1.rotation.y = A2.rotation.y = 0;
        const pz = k === 'dad' ? pose.dad : k === 'nana' ? pose.nana : k === 'mama' ? pose.mama : pose.wawa;
        if (pz === 'hug' || pz === 'offer') { const up = pz === 'offer' ? 1.25 : 1.0; A1.rotation.set(-up, 0, -0.2); A2.rotation.set(-up, 0, 0.2); }
        if (pz === 'read') { A1.rotation.set(-1.05, 0, -0.18); A2.rotation.set(-1.05, 0, 0.18); hd.rotation.x = 0.28; }
        if (pz === 'lapRead') { A1.rotation.set(-0.85, 0, -0.15); A2.rotation.set(-0.85, 0, 0.15); hd.rotation.x = 0.38; }
        if (pz === 'type') { A1.rotation.set(-1.0 + 0.05 * Math.sin(t * 17), 0, -0.12); A2.rotation.set(-1.0 + 0.05 * Math.sin(t * 15 + 1), 0, 0.12); hd.rotation.x = 0.08; }
        if (pz === 'lean') { hd.rotation.x = 0.12; hd.rotation.y = 0.25; }
        if (pz === 'up') { A1.rotation.set(0.9, 0, 2.3 + 0.15 * Math.sin(t * 5)); A2.rotation.set(0.9, 0, -2.3 - 0.15 * Math.sin(t * 5 + 0.6)); }
        if (k === 'dad' && pose.dadTurn) hd.rotation.y = -pose.dadTurn;
        if (k === 'dad' && pose.dadWalk) { A1.rotation.x = -0.12 + 0.35 * Math.sin(t * 7); A2.rotation.x = -0.12 - 0.35 * Math.sin(t * 7); }
        if (k === 'nana' && pose.nanaWalk) { A1.rotation.x += 0.1 * Math.sin(t * 7); }
        if (k === 'nana' && bt === 'cover') g.position.y += 0.03 * Math.sin(t * 3);
      }
      s.bkHold.visible = books.hold && vis.nana; s.bkLap.visible = books.lap; s.bkChest.visible = books.chest && vis.nana; s.bkDad.visible = books.dad; s.bkMama.visible = books.mama; s.soft.visible = books.soft;
      if (books.soft) { s.soft.rotation.z = 0.2 * Math.sin(t * 5); s.soft.rotation.x = -0.3 + 0.25 * Math.sin(t * 3); C.wawa.position.y += 0.05 * Math.abs(Math.sin(t * 5)); }
      /* page flips (every ~2.6 s) */
      const flip = (bk, rate, off) => { const f = ((t * rate + off) % 1), k = U.easeIO(U.clamp((f - 0.6) / 0.3)); bk.userData.flip.rotation.z = k * PI * 0.98; bk.userData.flip.visible = f > 0.55; };
      flip(s.bkDad, 0.38, 0.1); flip(s.bkLap, 0.45, 0.3); flip(s.bkMama, 0.32, 0.6);
      /* lights */
      s.lampL.intensity = lamp; s.bulb.material.emissiveIntensity = 0.5 + 0.6 * lamp; s.halo.material.opacity = 0.08 + 0.12 * lamp;
      s.hallL.intensity = hall; s.glow.material.color.set('#ffc47a').multiplyScalar(0.45 + 0.55 * hall);
      s.lid.rotation.x = lidA; s.scrL.intensity = 1.0 * screen * (0.92 + 0.08 * Math.sin(t * 13)); s.scr.material.color.set('#cfe4ff').multiplyScalar(0.25 + 0.75 * screen);
      s.motes.forEach((m, i) => { const a = (t * 0.06 + i * 0.137) % 1; m.position.set(-0.9 + 1.5 * Math.sin(i * 2.3 + t * 0.2), 1.2 + a * 2.4, -2.1 + 0.9 * Math.cos(i * 1.7)); m.material.opacity = 0.6 * Math.sin(a * PI) * Math.min(1, lamp); });
      VE.camAt(CAM, t, camera, 0.03);
      window.__dbg = { s: { C }, camera };
    },
    bgAt: () => ['#0e1028', '#1d1838'],
    hud(g, t) {
      if (!CAMR) return; const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const bubble = (str, x, y, a, tail) => {
        if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '600 40px Kanit,sans-serif'; const w = g.measureText(str).width + 56, h = 80; x = U.clamp(x, 110 + w / 2, 950 - w / 2);
        g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; g.fillStyle = '#fbf7f0'; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 26); g.fill(); g.shadowColor = 'transparent';
        const tx = U.clamp(tail, x - w / 2 + 30, x + w / 2 - 30); g.beginPath(); g.moveTo(tx - 14, y + h / 2 - 2); g.lineTo(tx, y + h / 2 + 24); g.lineTo(tx + 14, y + h / 2 - 2); g.fill();
        g.fillStyle = '#2a2438'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, x, y + 2); g.restore();
      };
      const fadeIn = (t0, t1) => U.clamp((t - t0) / 0.3) * U.clamp((t1 - t) / 0.3);
      if (b === 's2') {
        const [nx, ny] = wp(S.C.nana.userData.head, 0.75 * 0.8); bubble('พ่อ อ่านเล่มนี้หน่อย', nx, ny - 70, fadeIn(P('s2', 0.22), P('s2', 0.52)), nx);
        const [dx, dy] = wp(S.C.dad.userData.head, 0.8 * 1.4); bubble('พรุ่งนี้นะ', dx, dy - 60, fadeIn(P('s2', 0.54), P('s2', 0.86)), dx);
      }
      if (b === 's3') { const [dx, dy] = wp(S.C.dad.userData.head, 0.8 * 1.4); bubble('พรุ่งนี้นะ', dx, dy - 60, fadeIn(P('s3', 0.06), P('s3', 0.42)), dx); }
    },
    caps: [
      { t0: 0, t1: at('s1') - 0.2, y: 300, instant: true, lines: [[78, ['คืนไหน ที่ลูก', '#fff']], [78, ['จะไม่ถือนิทานมาอีก?', '#ffd9a0']]] },
      { t0: at('s1') + 0.4, t1: end('s1') - 0.3, y: 300, lines: [[70, ['เล่มเดิม…อีกแล้ว', '#fff']], [46, ['แต่ลูกหัวเราะเหมือนได้ฟังครั้งแรก', '#ffe6c8', 600]]] },
      { t0: at('s2') + 0.4, t1: end('s2') - 0.3, y: 300, lines: [[66, ['คืนต่อมา…', '#fff']]] },
      { t0: P('s3', 0.42), t1: end('s3') - 0.3, y: 300, lines: [[62, ['แล้วก็ “พรุ่งนี้นะ”', '#fff']], [62, ['อีกคืน', '#ffd9a0']]] },
      { t0: at('s4') + 0.4, t1: P('s4', 0.5), y: 300, lines: [[62, ['พี่มามะ', '#ffd9a0']], [58, ['เคยถือเล่มนี้มาทุกคืน', '#fff']]] },
      { t0: P('s4', 0.5) + 0.05, t1: end('s4') - 0.3, y: 300, lines: [[62, ['จนวันหนึ่ง…', '#fff']], [62, ['ก็ไม่ถือมาอีก', '#ffd9a0']]] },
      { t0: at('s5') + 0.4, t1: P('s5', 0.5), y: 300, lines: [[70, ['คืนที่เราว่าง…', '#fff']]] },
      { t0: P('s5', 0.62), t1: end('s5') - 0.3, y: 300, lines: [[70, ['ลูกหลับไปแล้ว', '#ffd9a0']]] },
      { t0: at('s6') + 0.5, t1: P('s6', 0.56), y: 300, lines: [[60, ['ลูกไม่ได้ขอนิทาน', '#fff']], [64, ['ลูกขอเวลาของเรา', '#ffd9a0']]] },
      { t0: P('s6', 0.6), t1: end('s6'), y: 300, lines: [[76, ['คืนนี้…ยังทัน', '#ffd9a0']]] },
    ],
    trans,
    audio: [
      [0.4, 'steps', { n: 2 }],
      [at('s1') + 0.8, 'page'], [at('s1') + 3.4, 'page'], [P('s1', 0.45), 'giggle'],
      [at('s2') + 0.3, 'type', { n: 10 }], [P('s2', 0.06), 'steps', { n: 4 }], [P('s2', 0.56), 'type', { n: 6 }],
      [at('s3') + 0.2, 'type', { n: 8 }], [P('s3', 0.5), 'page'], [P('s3', 0.85), 'page'],
      [at('s4') + 1.0, 'page'], [P('s4', 0.62), 'page'],
      [at('s5') + 0.2, 'type', { n: 4 }], [P('s5', 0.18), 'shut'], [P('s5', 0.3), 'steps', { n: 7 }],
      [P('s6', 0.18), 'page'], [P('s6', 0.45), 'page'], [P('s6', 0.6), 'soft'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.7, P('s6', 0.58), CK.MUSIC.SAD), CK.musicBed(P('s6', 0.5), DUR - 1.4, CK.MUSIC.HOPE)],
  });
})();
