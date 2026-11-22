/* พ่อแม่หัวจะปวด — อุ้มครั้งสุดท้าย (moody story clip + one stat, ~50 s; Nov 2026)
   Story: ซอยหน้าบ้านกลางคืน กลับจากตลาดนัด → วาวา (อุ้มทั้งวัน) → นานะ "อุ้มๆ" → มามะหลับ พ่ออุ้ม → สถิติ 5/7/7.5 ขวบ
          → เช้า "หนูเดินเองได้" → ย้อนภาพ "ครั้งนั้นคือครั้งสุดท้าย" → นานะขออุ้ม พ่ออุ้มนานขึ้น
   Stats: My Nametags/Obsurvant survey, 1,000 UK parents of 8–14s (Sep 2026): last asked to be carried ~5, bedtime story ~7, hand-holding 7.5.
          WHO Child Growth Standards medians: birth ~3.3 kg, 2 y ~12 kg, 5 y ~18 kg.
   Build: node build.js um-krang-sudtai.js review-um-krang-sudtai.html --kit clay --title "อุ้มครั้งสุดท้าย" --data reel=docs/family/safe.json */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 3.0], ['s1', 4.5], ['s2', 6], ['s3', 6.5], ['s4', 7], ['s5', 8], ['s6', 6], ['s7', 7.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => U.clamp((t - at(id)) / dur(id)), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const REEL = !!(DATA.reel && DATA.reel.on), OY = REEL && DATA.reel.dy != null ? DATA.reel.dy - 30 : 0, LD = REEL ? 64 : 0;
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's7'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const K = (t, f) => Object.assign({ t }, f), HZ = (window.DATA && window.DATA.hz) || 1;
  const MORNING = (b) => b === 's5' || b === 's7';

  /* ---- shots ---- */
  const CAM = [
    K(at('cover'), FW(-0.85, 0, 4.8, 2.55, 0.1)), K(end('cover') - 0.001, FW(-1.25, 0, 4.4, 2.55, 0.1)),
    K(at('s1'), FW(-1.45, 0, 4.4, 2.45, 0.1)), K(end('s1') - 0.001, FW(-2.1, 0, 4.1, 2.45, 0.1)),
    K(at('s2'), FW(0.55, 0, 5.4, 2.55, 0.1)), K(end('s2') - 0.001, FW(0.75, 0, 5.0, 2.55, 0.1)),
    K(at('s3'), FW(1.95, 0, 5.4, 2.55, 0.1)), K(end('s3') - 0.001, FW(2.2, 0, 5.0, 2.55, 0.1)),
    K(at('s4'), FW(1.4, 0.3, 7.6, 3.45, 0.14)), K(end('s4') - 0.001, FW(0.9, 0.3, 7.2, 3.4, 0.14)),
    K(at('s5'), FW(1.3, 0, 5.4, 2.5, 0.1)), K(end('s5') - 0.001, FW(1.3, 0, 5.0, 2.5, 0.1)),
    K(at('s6'), FW(-0.9, 0, 4.6, 2.55, 0.1)), K(end('s6') - 0.001, FW(-1.2, 0, 4.2, 2.55, 0.1)),
    K(at('s7'), FW(0.6, 0, 5.4, 2.55, 0.1)), K(end('s7'), FW(0.95, 0, 4.7, 2.55, 0.1)),
  ];
  const trans = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map((id) => ({ t: at(id) - 0.45, dur: 0.9, type: 'iris', color: '#0e1028' }));

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  /* stretch an arm (shoulder pivot) so its hand reaches a world point; arm base length: adult 0.56, kid 0.42 (local units) */
  const QA = new T.Quaternion(), DN = new T.Vector3(0, -1, 0), VL = new T.Vector3(), VW = new T.Vector3();
  const reach = (g, key, world) => { const ud = g.userData, arm = ud[key], L0 = g.userData.base >= 1.2 ? 0.56 : 0.42; VL.copy(world); g.worldToLocal(VL); VL.sub(arm.position); const len = VL.length(); QA.setFromUnitVectors(DN, VL.normalize()); arm.quaternion.copy(QA); const k = U.clamp(len / L0, 0.7, 2.6); arm.scale.set(1, k, 1); const h = ud[key === 'arm1' ? 'hand1' : 'hand-1']; h.scale.set(1, 1.08 / k, 0.88); };
  const lw = (g, x, y, z) => g.localToWorld(VW.set(x, y, z)).clone();
  const au = () => VE.audio;
  VE.registerSfx('steps', (t, o) => { const n = (o && o.n) || 4; for (let i = 0; i < n; i++) au().tone(t + i * 0.42, 95, 0.05, { f2: 60, vol: 0.1 }); });
  VE.registerSfx('cricket', (t) => { for (let i = 0; i < 3; i++) au().tone(t + i * 0.09, 4200, 0.04, { vol: 0.02, rel: 0.02 }); });
  VE.registerSfx('lift', (t) => au().noise(t, 0.4, { type: 'bandpass', f: 500, f2: 1200, vol: 0.06, att: 0.15 }));
  VE.registerSfx('soft', (t) => [784, 988].forEach((f, i) => au().tone(t + i * 0.12, f, 0.3, { vol: 0.045, rel: 0.6 })));
  VE.registerSfx('bird', (t) => [2600, 3100, 2800].forEach((f, i) => au().tone(t + i * 0.08, f, 0.05, { f2: f * 1.2, vol: 0.03 })));

  VE.run({
    DUR, file: 'um-krang-sudtai', title: 'อุ้มครั้งสุดท้าย', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'เรื่องเล็กๆ ในบ้าน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(6,6,24,.6)',
    setup({ scene }) {
      const L = CK.nightLights(T, scene, { hemi: 0.32, key: 0.24, fill: 0.26 });
      scene.fog = new T.Fog(0x161a3a, 26, 60);
      const M = (c, x) => CK.mat(T, c, x), E = (c, k) => new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: k == null ? 0.9 : k, roughness: 0.5 });
      /* ground: road + sidewalk */
      const road = new T.Mesh(new T.BoxGeometry(60, 0.3, 24), M('#5d5775')); road.position.set(0, -0.15, 6); scene.add(road);
      for (let i = -12; i <= 12; i++) { const d = new T.Mesh(new T.BoxGeometry(1.0, 0.02, 0.14), M('#b8b0c8')); d.position.set(i * 2.4, 0.01, 2.2); scene.add(d); }
      const walk = new T.Mesh(new T.BoxGeometry(60, 0.14, 1.4), M('#7f7696')); walk.position.set(0, 0.07, -2.45); scene.add(walk);
      /* wall + trees + house */
      const wall = new T.Mesh(new T.BoxGeometry(60, 1.7, 0.35), M('#8c7fa6')); wall.position.set(0, 0.85, -3.35); scene.add(wall);
      const cope = new T.Mesh(new T.BoxGeometry(60, 0.14, 0.5), M('#a99cc2')); cope.position.set(0, 1.74, -3.35); scene.add(cope);
      for (let i = 0; i < 14; i++) { const tr = new T.Mesh(new T.SphereGeometry(1.4 + (i % 3) * 0.4, 16, 12), M(i % 2 ? '#2e4a52' : '#35525a')); tr.position.set(-20 + i * 3.1, 2.6 + (i % 2) * 0.6, -5.5 - (i % 3) * 0.6); scene.add(tr); }
      const house = new T.Group(); house.position.set(-7.6, 0, -5.6); scene.add(house);
      const hb = new T.Mesh(new T.BoxGeometry(4.6, 3.4, 2.4), M('#d9c3a5')); hb.position.y = 1.7; house.add(hb);
      const roof = new T.Mesh(new T.ConeGeometry(3.6, 1.6, 4), M('#a0525e')); roof.position.y = 4.2; roof.rotation.y = PI / 4; roof.scale.z = 0.75; house.add(roof);
      const hwin = new T.Mesh(new T.PlaneGeometry(1.2, 1.0), new T.MeshBasicMaterial({ color: '#ffc77a' })); hwin.position.set(-0.9, 2.1, 1.22); house.add(hwin);
      const hwin2 = hwin.clone(); hwin2.position.x = 0.9; house.add(hwin2);
      const gate = new T.Mesh(new T.BoxGeometry(1.8, 1.5, 0.08), M('#4a4560')); gate.position.set(-6.0, 0.8, -3.15); scene.add(gate);
      /* street lamp */
      const lampG = new T.Group(); lampG.position.set(-6.2, 0, -2.4); scene.add(lampG);
      const pole = new T.Mesh(new T.CylinderGeometry(0.07, 0.09, 4.7, 10), M('#3e3a50')); pole.position.y = 2.35; lampG.add(pole);
      const arm = new T.Mesh(new T.BoxGeometry(0.9, 0.08, 0.08), M('#3e3a50')); arm.position.set(0.4, 4.65, 0); lampG.add(arm);
      const bulb = new T.Mesh(new T.SphereGeometry(0.2, 14, 10), E('#ffd08a', 1.2)); bulb.position.set(0.8, 4.5, 0); lampG.add(bulb);
      const lampL = new T.PointLight(0xffb060, 1.3, 11); lampL.position.set(-2.4, 4.2, -1.6); scene.add(lampL);
      const pool = new T.Mesh(new T.CircleGeometry(2.6, 32), new T.MeshBasicMaterial({ color: '#ffb060', transparent: true, opacity: 0.12, depthWrite: false })); pool.rotation.x = -PI / 2; pool.position.set(-2.4, 0.02, -0.6); scene.add(pool);
      /* string lights */
      const bulbs = [], BC = ['#ffd27a', '#ff9ec0', '#9fe3cf', '#ffd27a', '#c9b6ff'];
      for (const [x0, x1] of [[-12, 0], [0, 12]]) for (let i = 0; i <= 20; i++) { const u = i / 20, x = U.lerp(x0, x1, u), y = 4.1 - Math.sin(u * PI) * 0.6; const b = new T.Mesh(new T.SphereGeometry(0.08, 10, 8), E(BC[i % 5], 1.0)); b.position.set(x, y, -4.2); scene.add(b); bulbs.push(b); }
      for (const x of [-12, 0, 12]) { const p = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 4.6, 8), M('#3e3a50')); p.position.set(x, 2.3, -4.2); scene.add(p); }
      /* night market glow (far left) */
      for (let i = 0; i < 4; i++) { const st = new T.Group(); st.position.set(9 + i * 2.6, 0, -7 - (i % 2)); scene.add(st); const c = new T.Mesh(new T.BoxGeometry(2.2, 0.15, 1.6), E(['#ff6f6f', '#ffd166', '#6fc3ff', '#ff9ec0'][i], 0.6)); c.position.y = 2.4; st.add(c); const tb = new T.Mesh(new T.BoxGeometry(2.0, 1.0, 1.2), M('#e8d9c0')); tb.position.y = 0.5; st.add(tb); }
      const mktL = new T.PointLight(0xffa060, 1.0, 12); mktL.position.set(12, 3, -6); scene.add(mktL);
      /* fireflies / dust */
      const motes = []; for (let i = 0; i < 16; i++) { const m = new T.Mesh(new T.SphereGeometry(0.03, 6, 5), new T.MeshBasicMaterial({ color: '#ffe6a8', transparent: true, opacity: 0.7 })); scene.add(m); motes.push(m); }
      /* family */
      const C = {}; for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) { const g = CK.family(T, k); g.userData.base = g.scale.x; scene.add(g); C[k] = g; }
      return { L, lampL, bulb, pool, bulbs, mktL, hwin, hwin2, motes, C };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C, morning = MORNING(bt);
      const st = {}; // k -> { x, y, z, ry, ex, walk, arms, carry:{by, side, sleep, k} , headZ }
      const S = (k, o) => (st[k] = Object.assign({ x: 0, y: 0, z: 0, ry: 0, ex: 'happy' }, o));
      const walkX = (x0, x1, id) => U.lerp(x0, x1, ph(id, t));
      if (bt === 'cover' || bt === 's6') {
        const x = bt === 'cover' ? walkX(-1.2, -1.7, 'cover') : walkX(-1.3, -1.65, 's6'); /* tired walk */
        S('dad', { x, ry: -0.35, walk: true, ex: 'sick', carryArms: true }); S('mama', { carry: { by: 'dad', sleep: true, k: 1 }, ex: 'sleepy' });
      } else if (bt === 's1') {
        const x = walkX(-1.6, -2.2, 's1'); S('dad', { x, ry: -0.35, walk: true, ex: 'giggle', carryArms: true }); S('wawa', { carry: { by: 'dad', k: 1 }, ex: ph('s1', t) > 0.3 && Math.sin(t * 3) > 0 ? 'giggle' : 'happy' });
      } else if (bt === 's2') {
        const p = ph('s2', t), kl = U.easeIO(U.clamp((p - 0.56) / 0.12));
        S('dad', { x: 0.75, ry: -0.25, ex: kl > 0.5 ? 'giggle' : p > 0.3 ? 'sick' : 'happy', carryArms: kl > 0.05, crouch: Math.sin(kl * PI) * 0.25 });
        S('nana', { x: -0.55, z: 0.35, ry: 0.4, ex: kl > 0 ? 'giggle' : p > 0.1 ? 'happy' : 'happy', armsUp: kl < 0.6 && p > 0.12, carry: kl > 0 ? { by: 'dad', k: kl } : null });
      } else if (bt === 's3') {
        const p = ph('s3', t), kl = U.easeIO(U.clamp((p - 0.12) / 0.12));
        S('dad', { x: 2.05, ry: -0.3, ex: p > 0.3 && p < 0.62 ? 'sick' : 'happy', carryArms: kl > 0.05, crouch: Math.sin(kl * PI) * 0.3, backHand: p > 0.3 && p < 0.62 });
        S('mama', { x: 0.75, z: 0.35, ry: 0.35, ex: 'sleepy', carry: kl > 0 ? { by: 'dad', sleep: true, k: kl } : null });
      } else if (bt === 's4') {
        const x = walkX(1.2, 0, 's4');
        S('dad', { x: x + 1.6, ry: -0.35, walk: true, carryArms: true }); S('mama', { carry: { by: 'dad', sleep: true, k: 1 }, ex: 'sleepy' });
        S('mom', { x: x - 1.3, ry: -0.35, walk: true, carryArms: true }); S('wawa', { carry: { by: 'mom', k: 1 }, ex: 'sleepy' });
        S('nana', { x: x + 0.55, z: 1.4, ry: -0.35, walk: true, ex: 'sleepy' });
      } else if (bt === 's5') {
        const p = ph('s5', t), q = TM('s5', 0, 0.2), kr = U.clamp((t - q - 1.0) / 2.4), down = U.easeIO(U.clamp((t - q - 1.6) / 2.2));
        S('dad', { x: 0.2, ry: 0.45, crouch: 0.35, ex: t < q + 0.6 ? 'happy' : 'worried', armsOut: 1 - down * 0.85 });
        S('mama', { x: U.lerp(1.95, 6.5, kr), z: 0.25, ry: kr > 0 ? 1.0 : -0.35, walk: kr > 0, ex: 'giggle' });
      } else if (bt === 's7') {
        const p = ph('s7', t), kw = U.easeIO(U.clamp(p / 0.2)), kl = U.easeIO(U.clamp((p - 0.26) / 0.08));
        S('dad', { x: 0.7, ry: -0.25 + (kl > 0.9 ? 0.1 * Math.sin(t * 1.4) : 0), ex: kl > 0.5 ? 'giggle' : 'happy', carryArms: kl > 0.05, crouch: Math.sin(kl * PI) * 0.25, hug: kl > 0.9 });
        S('nana', { x: U.lerp(-3.2, -0.6, kw), z: 0.35, ry: 0.5, walk: kw > 0 && kw < 1, armsUp: kw > 0.9 && kl < 0.6, ex: kl > 0.5 ? 'giggle' : 'happy', carry: kl > 0 ? { by: 'dad', k: kl } : null });
      }
      /* apply: adults first, then carried kids */
      const order = ['dad', 'mom', 'mama', 'nana', 'wawa'].sort((a, b) => (st[a] && st[a].carry ? 1 : 0) - (st[b] && st[b].carry ? 1 : 0));
      for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) C[k].visible = !!st[k];
      for (const k of order) {
        const q = st[k]; if (!q) continue; const g = C[k], ud = g.userData;
        let x = q.x, y = q.y, z = q.z, ry = q.ry, rz = 0;
        if (q.carry) {
          const ad = C[q.carry.by], aq = st[q.carry.by], kid = ud.base;
          const off = q.carry.by === 'mom' ? [0.8, 1.18, 0.62] : kid < 0.7 ? [0.85, 1.45, 0.62] : kid < 0.85 ? [0.95, 1.15, 0.66] : [0.98, 0.98, 0.68];
          const c = Math.cos(ad.rotation.y), sn = Math.sin(ad.rotation.y), cx = ad.position.x + off[0] * c + off[2] * sn, cz = ad.position.z - off[0] * sn + off[2] * c, cy = ad.position.y + off[1];
          const kk = q.carry.k; x = U.lerp(q.x, cx, kk); y = U.lerp(q.y, cy, kk); z = U.lerp(q.z, cz, kk); ry = U.lerp(q.ry, ad.rotation.y + PI, kk); rz = q.carry.sleep ? 0.14 * kk : 0.06 * kk;
        }
        if (q.walk) y += 0.05 * Math.abs(Math.sin(t * 6.5 + (k === 'nana' ? 1 : 0)));
        g.position.set(x, y, z); g.rotation.set(q.crouch ? q.crouch * 0.55 : 0, ry, rz);
        ud.setExpr(q.ex); ud.tick(t, { breath: q.ex === 'sleepy' ? 0.25 : 0.4 });
        const A1 = ud.arm1, A2 = ud['arm-1'], hd = ud.head; hd.rotation.x = 0; hd.rotation.y = 0; A1.rotation.x = A2.rotation.x = -0.12; A1.rotation.y = A2.rotation.y = 0; A1.scale.set(1, 1, 1); A2.scale.set(1, 1, 1); ud.hand1.scale.set(1, 1.08, 0.88); ud['hand-1'].scale.set(1, 1.08, 0.88);
        if (q.carry) { const kk = q.carry.k; hd.rotation.y = (PI - 0.35) * kk; hd.rotation.z = HZ * (q.carry.sleep ? 0.3 : 0.15) * kk; if (kk > 0.6) { A1.rotation.set(1.15, 0, -0.35); A2.rotation.set(1.15, 0, 0.35); } }
        if (q.carryArms) { A1.rotation.set(-0.75, 0, 0.2); A2.rotation.set(-1.15, 0, 0.95); }
        if (q.backHand) A2.rotation.set(0.75, 0, -0.35);
        if (q.armsUp) { A1.rotation.set(0.9, 0, 2.4 + 0.12 * Math.sin(t * 7)); A2.rotation.set(0.9, 0, -2.4 - 0.12 * Math.sin(t * 7 + 1)); }
        if (q.armsOut != null) { const o = q.armsOut; A1.rotation.set(-1.25 * o - 0.12 * (1 - o), 0, 0.55 * o + 0.4 * (1 - o)); A2.rotation.set(-1.25 * o - 0.12 * (1 - o), 0, -0.55 * o - 0.4 * (1 - o)); }
        if (q.walk && !q.carryArms && !q.carry) { A1.rotation.x = -0.12 + 0.35 * Math.sin(t * 6.5); A2.rotation.x = -0.12 - 0.35 * Math.sin(t * 6.5); }
        if (q.yawn) { A1.rotation.set(0.9, 0, 2.2); }
        if (q.hug) hd.rotation.z = -0.15;
      }
      /* carry arms: adult hands under the bottom + across the back, kid arms around the adult's neck */
      for (const k of ['mama', 'nana', 'wawa']) {
        const q = st[k]; if (!q || !q.carry || q.carry.k < 0.55) continue; const kid = C[k], ad = C[q.carry.by], aq = st[q.carry.by];
        ad.updateMatrixWorld(true); kid.updateMatrixWorld(true);
        reach(ad, 'arm1', lw(kid, 0.05, 0.22, -0.2));
        if (!aq.backHand) reach(ad, 'arm-1', lw(kid, -0.05, 0.78, -0.52));
        const dz = q.carry.sleep ? -0.1 : 0; reach(kid, 'arm1', lw(ad, 0.3, 1.45 + dz, 0.35)); reach(kid, 'arm-1', lw(ad, 0.78, 1.78 + dz, 0.05));
      }
      /* light: night vs morning */
      const L = s.L;
      if (morning) { L.hemi.intensity = 0.62; L.hemi.color.set('#c8d4ff'); L.key.intensity = 0.5; L.key.color.set('#ffd8b0'); L.fill.intensity = 0.3; s.lampL.intensity = 0; s.bulb.material.emissiveIntensity = 0.1; s.pool.visible = false; s.mktL.intensity = 0; }
      else { L.hemi.intensity = 0.32; L.hemi.color.set('#9aa8ff'); L.key.intensity = 0.24; L.key.color.set('#b8c4ff'); L.fill.intensity = 0.26; s.lampL.intensity = 1.3; s.bulb.material.emissiveIntensity = 1.2; s.pool.visible = true; s.mktL.intensity = 1.0; }
      s.bulbs.forEach((b, i) => { b.material.emissiveIntensity = morning ? 0.05 : 0.7 + 0.3 * Math.sin(t * 2 + i * 1.3); });
      s.hwin.material.color.set(morning ? '#c9c2b8' : '#ffc77a'); s.hwin2.material.color.copy(s.hwin.material.color);
      const cx = camera.position.x;
      s.motes.forEach((m, i) => { m.visible = !morning; const a = (t * 0.05 + i * 0.13) % 1; m.position.set(cx - 3 + ((i * 1.37) % 6), 1.0 + a * 3.2, -1.8 + ((i * 0.71) % 2.4)); m.material.opacity = 0.7 * Math.sin(a * PI); });
      VE.camAt(CAM, t, camera, 0.03);
      window.__dbg = { s: { C }, camera };
    },
    bgAt: (t) => MORNING(beatAt(t)) ? ['#8fa3cf', '#f0cdbf'] : ['#0e1028', '#1d1838'],
    hud(g, t) {
      if (!CAMR) return; const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const bubble = (str, x, y, a, tail) => {
        if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '600 42px Kanit,sans-serif'; const w = g.measureText(str).width + 56, h = 82; x = U.clamp(x, 110 + w / 2, 950 - w / 2);
        g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; g.fillStyle = '#fbf7f0'; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 26); g.fill(); g.shadowColor = 'transparent';
        const tx = U.clamp(tail, x - w / 2 + 30, x + w / 2 - 30); g.beginPath(); g.moveTo(tx - 14, y + h / 2 - 2); g.lineTo(tx, y + h / 2 + 24); g.lineTo(tx + 14, y + h / 2 - 2); g.fill();
        g.fillStyle = '#2a2438'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, x, y + 2); g.restore();
      };
      const tag = (str, o, dy, a) => { if (a <= 0 || !o.visible) return; const [x, y] = wp(o.userData.head, dy); g.save(); g.globalAlpha = a; g.font = '700 38px Kanit,sans-serif'; const w = g.measureText(str).width + 36, xx = U.clamp(x, 120 + w / 2, 940 - w / 2); g.fillStyle = 'rgba(255,217,160,.92)'; g.beginPath(); g.roundRect(xx - w / 2, y - 28, w, 56, 28); g.fill(); plain(str, xx, y + 1, 38, '#2a2438', 700, 'center'); g.restore(); };
      const fadeIn = (t0, t1) => U.clamp((t - t0) / 0.3) * U.clamp((t1 - t) / 0.3);
      if (b === 's1') tag('≈ 3 กก.', S.C.wawa, -0.6, fadeIn(P('s1', 0.3), end('s1') - 0.2));
      if (b === 's2') { const [x, y] = wp(S.C.nana.userData.head, 0.75); bubble('อุ้มๆ!', x, y - 70, fadeIn(TM('s2', 0, 0.12), TM('s2', 1, 0.3) - 0.1), x); const [dx, dy] = wp(S.C.dad.userData.head, 0); bubble('อีกแล้วเหรอลูก…', dx - 280, dy - 150, fadeIn(TM('s2', 1, 0.3), P('s2', 0.58)), dx - 120); tag('≈ 12 กก.', S.C.nana, -0.6, fadeIn(P('s2', 0.72), end('s2') - 0.2)); }
      if (b === 's3') { const [x, y] = wp(S.C.dad.userData.head, 0); bubble('โอ๊ย… หนักขึ้นทุกวัน', x - 280, y - 150, fadeIn(P('s3', 0.3), P('s3', 0.6)), x - 120); }
      if (b === 's5') { const [x, y] = wp(S.C.mama.userData.head, 0.75); bubble('หนูโตแล้ว เดินเองได้!', x, y - 70, fadeIn(TM('s5', 0, 0.2), TM('s5', 0, 0.2) + 1.8), x); }
      if (b === 's7') { const [x, y] = wp(S.C.nana.userData.head, 0.75); bubble('อุ้มๆ', x, y - 70, fadeIn(P('s7', 0.16), P('s7', 0.3)), x); }
      /* s4: timeline 0–8 years */
      if (b === 's4') {
        const p = ph('s4', t), a0 = U.clamp((p - 0.26) / 0.08), y0 = 650 + OY, x0 = 150 + LD, x1 = 930 - LD, X = (yr) => x0 + (x1 - x0) * yr / 8;
        g.save(); g.globalAlpha = a0; g.fillStyle = 'rgba(14,16,40,.72)'; g.beginPath(); g.roundRect(x0 - 50, y0 - 105, x1 - x0 + 100, 215, 30); g.fill();
        g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y0); g.stroke();
        for (let yr = 0; yr <= 8; yr++) { g.fillStyle = 'rgba(255,255,255,.6)'; g.beginPath(); g.arc(X(yr), y0, 5, 0, 7); g.fill(); plain(String(yr), X(yr), y0 + 36, 32, 'rgba(255,255,255,.75)', 600, 'center'); }
        
        const prog = U.easeOut(U.clamp((p - 0.3) / 0.1)) * 5; g.strokeStyle = '#ffd9a0'; g.lineWidth = 8; g.beginPath(); g.moveTo(x0, y0); g.lineTo(X(prog), y0); g.stroke();
        [[5, 'อุ้ม', -1, 0.4], [7, 'นิทาน', -1, 0.56], [7.5, 'จับมือ', 1, 0.68]].forEach(([yr, lab, side, f]) => {
          const a = U.clamp((p - f) / 0.06); if (a <= 0) return; const r = (yr === 5 ? 20 : 15) * U.easeBack(a);
          g.globalAlpha = a0 * a; g.fillStyle = yr === 5 ? '#ffd9a0' : '#c9b6ff'; g.beginPath(); g.arc(X(yr), y0, r, 0, 7); g.fill();
          const ly = side < 0 ? y0 - 62 : y0 + 88; plain(lab + ' ' + (yr === 7.5 ? '7½' : yr), Math.min(X(yr), x1 - 10), ly, yr === 5 ? 46 : 38, yr === 5 ? '#ffd9a0' : '#e6dcff', 700, 'center');
        });
        g.restore();
      }
      /* s6: faded flashback */
      if (b === 's6') {
        const a = U.clamp((t - at('s6')) / 0.4); g.save(); g.globalAlpha = 0.9 * a; g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(0, 0, 1080, 1920);
        g.globalCompositeOperation = 'color'; g.globalAlpha = 0.32 * a; g.fillStyle = '#c89a6a'; g.fillRect(0, 0, 1080, 1920);
        g.globalCompositeOperation = 'source-over'; g.globalAlpha = a; g.strokeStyle = 'rgba(255,240,220,.55)'; g.lineWidth = 10; g.beginPath(); g.roundRect(60, 230 + OY - 100, 960, 1120, 36); g.stroke(); g.restore();
      }
    },
    caps: [
      { t0: 0, t1: at('s1') - 0.2, y: 300, instant: true, lines: [[74, ['บ่นทุกคืนว่าหนัก…', '#fff']], [80, ['จนคืนที่ไม่มีให้อุ้ม', '#ffd9a0']]] },
      { t0: at('s1') + 0.3, t1: end('s1') - 0.3, y: 300, lines: [[66, ['ตอนแรกเกิด', '#ffd9a0']], [56, ['อุ้มได้ทั้งวัน ไม่เคยบ่น', '#fff']]] },
      { t0: at('s2') + 0.3, t1: SP('s2', 0.62), y: 300, lines: [[66, ['2 ขวบ', '#ffd9a0']], [56, ['ขออุ้มวันละสิบรอบ', '#fff']]] },
      { t0: SP('s2', 0.62) + 0.05, t1: end('s2') - 0.3, y: 300, lines: [[62, ['เริ่มบ่นว่าเมื่อยแขน', '#fff']]] },
      { t0: at('s3') + 0.3, t1: SP('s3', 0.55), y: 300, lines: [[70, ['ปากบ่นว่าหนัก…', '#fff']]], foot: '5 ขวบ หนักราว 18 กก. มากกว่าแรกเกิด 5–6 เท่า (เกณฑ์ WHO)' },
      { t0: SP('s3', 0.55) + 0.05, t1: end('s3') - 0.3, y: 300, lines: [[62, ['แต่ไม่เคยวางลง', '#ffd9a0']], [62, ['สักครั้ง', '#ffd9a0']]] },
      { t0: at('s4') + 0.3, t1: SP('s4', 0.3), y: 300, lines: [[66, ['ไม่มีใครบอกเราว่า…', '#fff']]] },
      { t0: SP('s4', 0.3) + 0.05, t1: end('s4') - 0.2, y: 280, lines: [[58, ['เด็กขออุ้มครั้งสุดท้าย', '#fff']], [76, ['เฉลี่ยตอน ', '#fff'], ['5 ขวบ', '#ffd9a0']]], foot: 'ผลสำรวจพ่อแม่ 1,000 คน สหราชอาณาจักร (My Nametags, 2026)' },
      { t0: at('s5') + 0.3, t1: TM('s5', 0, 0.2) - 0.05, y: 300, lines: [[66, ['เช้าวันหนึ่ง…', '#fff']]] },
      { t0: TM('s5', 0, 0.2) + 1.9, t1: SP('s5', 0.7), y: 300, lines: [[62, ['แขนที่เคยบ่นว่าเมื่อย…', '#fff']]] },
      { t0: SP('s5', 0.7) + 0.05, t1: end('s5') - 0.3, y: 300, lines: [[62, ['วันนี้ว่างจนแปลกๆ', '#ffd9a0']]] },
      { t0: at('s6') + 0.4, t1: SP('s6', 0.5), y: 300, lines: [[62, ['คืนนั้นที่เราบ่นว่าหนัก…', '#fff']]] },
      { t0: SP('s6', 0.5) + 0.05, t1: end('s6') - 0.3, y: 300, lines: [[64, ['คือครั้งสุดท้าย', '#ffd9a0']], [64, ['ที่ได้อุ้ม', '#ffd9a0']]] },
      { t0: at('s7') + 0.3, t1: SP('s7', 0.5), y: 300, lines: [[66, ['ครั้งนี้…ไม่บ่นแล้ว', '#fff']]] },
      { t0: SP('s7', 0.5) + 0.05, t1: end('s7'), y: 300, lines: [[60, ['หนักแค่ไหน', '#fff']], [66, ['สักวันเราจะคิดถึง', '#ffd9a0']]] },
    ],
    trans,
    audio: [
      [0.3, 'steps', { n: 5 }], [1.2, 'cricket'],
      [at('s1') + 0.4, 'steps', { n: 6 }], [P('s1', 0.5), 'giggle'], [P('s1', 0.7), 'cricket'],
      [TM('s2', 0, 0.12), 'boing'], [TM('s2', 1, 0.32), 'breath'], [P('s2', 0.56), 'lift'], [P('s2', 0.68), 'giggle'],
      [at('s3') + 0.3, 'cricket'], [P('s3', 0.12), 'lift'], [P('s3', 0.3), 'breath'],
      [at('s4') + 0.4, 'steps', { n: 8 }], [P('s4', 0.4), 'ding'], [P('s4', 0.56), 'tick'], [P('s4', 0.68), 'tick'],
      [at('s5') + 0.5, 'bird'], [TM('s5', 0, 0.2) + 1.0, 'steps', { n: 5 }],
      [at('s6') + 0.3, 'shimmer'],
      [P('s7', 0.05), 'steps', { n: 3 }], [P('s7', 0.26), 'lift'], [P('s7', 0.32), 'giggle'], [SP('s7', 0.5), 'soft'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.7, at('s7') + 0.3, CK.MUSIC.SAD), CK.musicBed(at('s7') - 0.3, DUR - 1.4, CK.MUSIC.HOPE)],
  });
})();
