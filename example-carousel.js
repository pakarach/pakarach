/* EXAMPLE carousel (kit: fact, 3:4 1080x1440): 5 อำเภอที่ใหญ่ที่สุดในไทย — copy to slides.js and change data, icons, HUD text.
   Data: python3 prep-thmap.py data --districts "อุ้มผาง,ทองผาภูมิ,บ้านไร่,สังขละบุรี,ศรีสวัสดิ์"
   Build: node build.js slides.js out.html --kit fact --data th=data/th.geo.json --data nb=data/nb.geo.json --data amp=data/amp.geo.json
   Export: node carousel.js out.html slides 8 --prefix rungee-top5-amphoe   (slide k is the still at t = k*10 + 2.5)
   Layout (TikTok photo mode shows 3:4 with the caption BELOW the image): top ~140px sits under the app's search bar (brand mark only),
   text block y 230-560, map/scene y 580-1350, footnote y ~1405; keep the lower right (x>920, y>950) free for the like/comment buttons. */
(function () {
  const T = THREE, P = FK.pal, U = VE.u;
  const W = 1080, HH = 1440;
  // rank, amp_th, province, area km2, fact lines, icon
  const TOP = [
    [1, 'อุ้มผาง', 'ตาก', 4325, ['ใหญ่ทิ้งที่ 2 กว่า 670 ตร.กม.', 'น้ำตกทีลอซู + ถนนลอยฟ้า "1,219 โค้ง"'], 'falls'],
    [2, 'ทองผาภูมิ', 'กาญจนบุรี', 3655, ['ที่ตั้งเขื่อนวชิราลงกรณ + เหมืองปิล็อก', 'ชนะบ้านไร่แค่ 34 ตร.กม.!'], 'dam'],
    [3, 'บ้านไร่', 'อุทัยธานี', 3621, ['อำเภอเดียว กินพื้นที่เกินครึ่งจังหวัด', 'ราว 54% ของทั้งจังหวัดอุทัยธานี'], 'forest'],
    [4, 'สังขละบุรี', 'กาญจนบุรี', 3350, ['บ้านของสะพานมอญ สะพานไม้ชื่อดัง', 'ติดด่านเจดีย์สามองค์ ชายแดนเมียนมา'], 'bridge'],
    [5, 'ศรีสวัสดิ์', 'กาญจนบุรี', 3296, ['บ้านของน้ำตกเอราวัณ 7 ชั้น', 'และเขื่อนศรีนครินทร์'], 'erawan'],
  ];
  const N = 5, BY = {}; TOP.forEach((r) => (BY[r[1]] = r));
  const nf = (v) => v.toLocaleString('en-US');
  const SLIDES = 8;
  const proj = FK.project(99.0, 15.2, 2.4);
  const FOOT = 'พื้นที่ (ตร.กม.) ตามข้อมูลที่เผยแพร่ของจังหวัด • ปัดเศษเป็นจำนวนเต็ม';

  /* ---------- icons (base y=0, ~1.4 wide) ---------- */
  const M = (c, x) => FK.mat(T, c, x);
  const box = (w, h, d, c, x, y, z, ex) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), M(c, ex)); m.position.set(x || 0, (y || 0) + h / 2, z || 0); return m; };
  const cyl = (r0, r1, h, c, x, y, z, seg) => { const m = new T.Mesh(new T.CylinderGeometry(r0, r1, h, seg || 10), M(c)); m.position.set(x || 0, (y || 0) + h / 2, z || 0); return m; };
  const cone = (r, h, c, x, y, z, seg) => { const m = new T.Mesh(new T.ConeGeometry(r, h, seg || 6), M(c)); m.position.set(x, y + h / 2, z); return m; };
  const tree = (x, z, s, c) => { const g = new T.Group(); g.add(cyl(0.04 * s, 0.05 * s, 0.25 * s, '#7a5236', 0, 0, 0, 5), cone(0.22 * s, 0.6 * s, c || '#2fbf71', 0, 0.2 * s, 0, 6)); g.position.set(x, 0, z); return g; };
  const WATER = '#4fc3ff', FOAM = '#e9fbff';
  const ICON = {
    falls() { // Thi Lo Su: wide horseshoe curtain of water from a mossy cliff into a pool
      const g = new T.Group();
      const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
      const gr = x.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#dff7ff'); gr.addColorStop(1, '#8fd8ff'); x.fillStyle = gr; x.fillRect(0, 0, 256, 128);
      for (let i = 0; i < 70; i++) { const px = (i * 37) % 256, w = 1 + (i % 3); x.fillStyle = i % 2 ? 'rgba(255,255,255,.9)' : 'rgba(120,200,255,.55)'; x.fillRect(px, (i * 13) % 20, w, 128); }
      const tex = new T.CanvasTexture(c);
      const curtain = new T.Mesh(new T.CylinderGeometry(0.75, 0.8, 1.0, 20, 1, true, -Math.PI * 0.45, Math.PI * 0.9), new T.MeshStandardMaterial({ map: tex, side: T.DoubleSide, emissive: '#9fdcff', emissiveIntensity: 0.35, roughness: 0.4 }));
      curtain.position.set(0, 0.55, -0.35); g.add(curtain);
      const cliff = new T.Mesh(new T.CylinderGeometry(1.0, 1.1, 1.15, 20, 1, false, -Math.PI * 0.5, Math.PI), M('#5f6a56')); cliff.position.set(0, 0.575, -0.55); cliff.scale.z = 0.7; g.add(cliff);
      for (let i = 0; i < 7; i++) { const a = -Math.PI * 0.45 + i * Math.PI * 0.15, m = new T.Mesh(new T.SphereGeometry(0.2, 6, 5), M(i % 2 ? '#2fbf71' : '#27a862')); m.position.set(Math.sin(a) * 0.9, 1.18, -0.55 + Math.cos(a) * 0.55); m.scale.set(1.2, 0.6, 1.2); g.add(m); }
      const pool = new T.Mesh(new T.CylinderGeometry(0.62, 0.62, 0.05, 18), M(WATER)); pool.scale.set(1, 1, 0.5); pool.position.set(0, 0.03, 0.1); g.add(pool);
      g.add(tree(-0.9, 0.15, 0.85), tree(0.92, 0.1, 0.95, '#27a862'));
      return g;
    },
    dam() { // Vajiralongkorn dam: wall holding a reservoir between hills
      const g = new T.Group();
      g.add(box(1.8, 0.08, 0.9, WATER, 0, 0.55, -0.55));
      const wall = new T.Mesh(new T.CylinderGeometry(0.5, 0.75, 1.7, 4, 1), M('#cfd4de')); wall.rotation.y = Math.PI / 4; wall.scale.set(1.4, 1, 0.22); wall.rotation.z = 0; wall.position.set(0, 0.36, 0);
      const w2 = box(1.75, 0.7, 0.28, '#cfd4de', 0, 0, 0); g.add(w2);
      g.add(box(0.3, 0.72, 0.3, '#aab2c4', 0.55, 0, 0.02));
      g.add(cone(0.55, 1.2, '#3e7d55', -1.05, 0, -0.4, 6), cone(0.5, 1.0, '#3e7d55', 1.05, 0, -0.45, 6));
      g.add(box(0.5, 0.05, 0.6, WATER, -0.2, 0, 0.5));
      return g;
    },
    forest() { // Ban Rai: deep forest + hills
      const g = new T.Group();
      g.add(cone(0.6, 1.0, '#3e7d55', 0.35, 0, -0.35, 6), cone(0.45, 0.8, '#4a8f62', -0.45, 0, -0.45, 6));
      [[-0.6, 0.2, 1.1], [-0.2, 0.35, 0.9], [0.25, 0.25, 1.15], [0.65, 0.4, 0.85], [-0.4, -0.05, 0.8], [0.05, 0.0, 1.0], [0.6, -0.05, 0.9]].forEach(([x, z, s], i) => g.add(tree(x, z, s, i % 2 ? '#2fbf71' : '#1f9e58')));
      return g;
    },
    bridge() { // Mon wooden bridge over the reservoir + small chedi
      const g = new T.Group(); g.add(box(2.0, 0.05, 0.9, WATER, 0, 0, 0));
      g.add(box(1.9, 0.07, 0.2, '#a0693c', 0, 0.42, 0));
      for (let i = 0; i < 9; i++) { const x = -0.9 + i * 0.225; g.add(box(0.04, 0.42, 0.04, '#7a4a28', x, 0, -0.08), box(0.04, 0.42, 0.04, '#7a4a28', x, 0, 0.08)); }
      g.add(box(1.9, 0.05, 0.02, '#c08850', 0, 0.58, -0.1), box(1.9, 0.05, 0.02, '#c08850', 0, 0.58, 0.1));
      const pts = [[0.22, 0], [0.22, 0.08], [0.17, 0.12], [0.18, 0.3], [0.1, 0.45], [0.05, 0.6], [0, 0.75]].map((p) => new T.Vector2(p[0], p[1]));
      const ch = new T.Mesh(new T.LatheGeometry(pts, 10), M('#f0c040')); ch.position.set(0.75, 0.05, -0.38); g.add(ch);
      return g;
    },
    erawan() { // Erawan: round turquoise pools stepping down over limestone
      const g = new T.Group(), tq = '#3ee0d0', lime = '#d9c79a';
      [[0, 0.75, -0.45, 0.5], [0.15, 0.48, -0.05, 0.55], [-0.1, 0.22, 0.35, 0.6]].forEach(([x, y, z, r], i) => {
        const base = new T.Mesh(new T.CylinderGeometry(r, r * 1.05, y + 0.02, 14), M(lime)); base.position.set(x, (y + 0.02) / 2, z); base.scale.z = 0.6; g.add(base);
        const wtr = new T.Mesh(new T.CylinderGeometry(r * 0.85, r * 0.85, 0.04, 14), M(tq, { emissive: '#1fb8a8', emissiveIntensity: 0.25 })); wtr.position.set(x, y + 0.02, z); wtr.scale.z = 0.6; g.add(wtr);
        if (i < 2) for (let j = 0; j < 2; j++) g.add(box(0.07, 0.26, 0.03, FOAM, x - 0.12 + j * 0.24, y - 0.26, z + r * 0.55));
      });
      g.add(tree(-0.75, -0.45, 1.0), tree(0.75, -0.5, 0.9, '#27a862'), tree(0.75, 0.35, 0.7), tree(-0.75, 0.3, 0.75, '#27a862'));
      return g;
    },
  };
  const ICON_H = { falls: 1.25, dam: 1.2, forest: 1.3, bridge: 0.8, erawan: 1.0 };

  /* ---------- HUD text ---------- */
  function txt(g, s, x, y, size, color, weight, align, maxW) {
    g.save(); g.font = (weight || 800) + ' ' + size + 'px Kanit,sans-serif'; let w = g.measureText(s).width;
    if (maxW && w > maxW) { size = size * maxW / w; g.font = (weight || 800) + ' ' + size + 'px Kanit,sans-serif'; w = maxW; }
    g.textAlign = align || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = 'rgba(10,12,30,.88)';
    g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 12; g.shadowOffsetY = 4; g.strokeText(s, x, y); g.shadowColor = 'transparent';
    g.fillStyle = color; g.fillText(s, x, y); g.restore(); return w;
  }
  function pill(g, x, y, w, h, color, alpha) { g.save(); g.globalAlpha = alpha == null ? 1 : alpha; g.fillStyle = color; g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, h / 2) : g.rect(x, y, w, h); g.fill(); g.restore(); }
  function foot(g, s, y) { g.save(); g.font = '400 27px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(255,255,255,.72)'; g.fillText(s, 540, y); g.restore(); }

  const slideOf = (t) => U.clamp(Math.floor(t / 10), 0, SLIDES - 1);
  const rankOfSlide = (k) => (k >= 1 && k <= N ? N + 1 - k : 0); // slide1=#5 ... slide5=#1
  const TWIST = N + 1, RECAP = N + 2;

  VE.run({
    W, H: HH, DUR: SLIDES * 10 + 4, file: 'rungee-top5-largest-districts', title: '5 อำเภอที่ใหญ่ที่สุดในไทย',
    brand: { name: 'RuNgee รู้งี้', series: 'จัดอันดับ Top 5', color: P.teal, bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', icon: 'globe', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
    setup({ scene }) {
      FK.lights(T, scene);
      const d2 = new T.DirectionalLight(0xcfe0ff, 0.35); d2.position.set(-8, 6, 4); scene.add(d2);
      const sea = new T.Mesh(new T.PlaneGeometry(600, 600), new T.MeshStandardMaterial({ color: '#16224a', roughness: 1 })); sea.rotation.x = -Math.PI / 2; sea.position.y = -0.03; scene.add(sea);
      const shades = ['#2e4277', '#354b85', '#2a3d6f', '#3a528f'];
      const prov = FK.regions(T, DATA.th.features, { project: proj, idOf: (f) => f.properties.pro_th, color: (id, f) => shades[DATA.th.features.indexOf(f) % 4] });
      for (const id in prov.meshes) prov.meshes[id].scale.z = 0.1;
      scene.add(prov.group);
      const nb = FK.regions(T, DATA.nb.features, { project: proj, idOf: (f) => f.properties.name, color: () => '#1d2a52' });
      for (const id in nb.meshes) nb.meshes[id].scale.z = 0.04;
      scene.add(nb.group);
      const mm = FK.label(T, 'เมียนมา', { px: 70, color: 'rgba(200,215,255,.55)' }); { const q = proj(97.9, 15.9); mm.position.set(q[0], 0.3, -q[1]); mm.scale.set(2.6, 2.6 * 0.3125, 1); } scene.add(mm);
      const dist = FK.regions(T, DATA.amp.features, { project: proj, idOf: (f) => f.properties.amp_th, color: () => P.teal });
      scene.add(dist.group);
      const info = {};
      DATA.amp.features.forEach((f) => { const c = proj(f.properties.c[0], f.properties.c[1]); info[f.properties.amp_th] = { x: c[0], z: -c[1] }; });
      // Bangkok outline moved next to Umphang for the size comparison
      const bk = DATA.th.features.find((f) => f.properties.pro_th === 'กรุงเทพมหานคร'), bc = bk.properties.c, um = TOP[0], at = [99.75, 15.95];
      const shifted = { type: 'Feature', properties: { id: 'bkk' }, geometry: { type: bk.geometry.type, coordinates: JSON.parse(JSON.stringify(bk.geometry.coordinates)) } };
      const mv = (r) => (typeof r[0] === 'number' ? [r[0] - bc[0] + at[0], r[1] - bc[1] + at[1]] : r.map(mv));
      shifted.geometry.coordinates = mv(shifted.geometry.coordinates);
      const bkm = FK.regions(T, [shifted], { project: proj, idOf: () => 'bkk', color: () => P.coral }); bkm.group.visible = false; scene.add(bkm.group);
      const icons = {}, tags = {};
      for (const r of TOP) {
        const ic = ICON[r[5]](); ic.visible = false; scene.add(ic); icons[r[1]] = ic;
        const tg = FK.label(T, '#' + r[0], { color: r[0] === 1 ? P.gold : '#ffffff' }); tg.visible = false; scene.add(tg); tags[r[1]] = tg;
      }
      const ring = new T.Mesh(new T.RingGeometry(0.62, 0.86, 48), new T.MeshBasicMaterial({ color: P.gold, transparent: true, opacity: 0.8, side: T.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2; ring.visible = false; scene.add(ring);
      const q = FK.label(T, '?', { px: 150, color: P.gold }); q.visible = false; scene.add(q);
      const lU = FK.label(T, 'อุ้มผาง 4,325', { px: 66, color: P.gold }), lB = FK.label(T, 'กทม. 1,569', { px: 66, color: P.coral });
      lU.visible = lB.visible = false; scene.add(lU, lB);
      const bp = proj(at[0], at[1]);
      return { dist, info, icons, tags, ring, q, bkm, lU, lB, bpos: [bp[0], -bp[1]] };
    },
    update(t, s, { camera }) {
      const k = slideOf(t), rank = rankOfSlide(k), hook = k === 0, twist = k === TWIST, recap = k === RECAP;
      const H = (a) => 0.35 + 0.75 * a / 4325;
      for (const id in s.dist.meshes) {
        const m = s.dist.meshes[id], r = BY[id];
        let h = 0.1, col = '#2c3d6b', vis = true, em = 0;
        if (hook) vis = false;
        else if (twist) { if (r[0] === 1) { h = H(r[3]); col = P.gold; } else vis = false; }
        else if (recap) { h = H(r[3]); col = r[0] === 1 ? P.gold : P.teal; }
        else if (r[0] >= rank) { h = H(r[3]); col = r[0] === rank ? (rank === 1 ? P.gold : P.teal) : '#7f70e6'; em = r[0] === rank ? 0.15 : 0; }
        else { h = 0.12; col = '#2c3d6b'; }
        m.visible = vis; m.scale.z = h; m.material.color.set(col); m.material.emissive.set(col); m.material.emissiveIntensity = em;
      }
      s.bkm.group.visible = twist; if (twist) s.bkm.meshes.bkk.scale.z = H(1569);
      for (const r of TOP) {
        const id = r[1], ic = s.icons[id], tg = s.tags[id], inf = s.info[id];
        const shown = !hook && !twist && (recap || r[0] >= rank);
        ic.visible = shown; tg.visible = shown && (recap || r[0] !== rank);
        if (!ic.visible) continue;
        const cur = r[0] === rank, sc = cur ? 0.78 : 0.48, top = H(r[3]);
        ic.scale.setScalar(sc); ic.position.set(inf.x, top, inf.z); ic.rotation.y = -0.35;
        const ts = recap ? 1.5 : 1.2; tg.position.set(inf.x, top + ICON_H[r[5]] * sc + 0.35, inf.z); tg.scale.set(ts, ts * 0.3125, 1);
      }
      s.ring.visible = rank > 0;
      if (rank) { const inf = s.info[TOP[rank - 1][1]]; s.ring.position.set(inf.x, 0.15, inf.z); s.ring.scale.setScalar(1.3); s.ring.material.color.set(rank === 1 ? P.gold : P.teal); }
      s.q.visible = hook; if (hook) { const c = proj(100.6, 14.6); s.q.position.set(c[0], 4, -c[1]); s.q.scale.set(16, 16 * 0.3125, 1); }
      s.lU.visible = s.lB.visible = twist;
      if (twist) { const u = s.info['อุ้มผาง']; s.lU.position.set(u.x, 1.6, u.z + 0.2); s.lU.scale.set(3.2, 3.2 * 0.3125, 1); s.lB.position.set(s.bpos[0], 1.3, s.bpos[1] - 0.2); s.lB.scale.set(2.8, 2.8 * 0.3125, 1); }
      // camera
      let C; const ctr = proj(100.6, 13.3);
      if (hook) C = { look: [ctr[0], 0, -ctr[1]], el: 62, az: -8, d: 84, fov: 34, vy: -240 };
      else if (twist) { const u = s.info['อุ้มผาง']; C = { look: [(u.x + s.bpos[0]) / 2, 0.6, u.z + 0.1], el: 50, az: -8, d: 12.5, fov: 34, vy: -250 }; }
      else if (recap) C = { look: [-0.1, 0.6, -0.6], el: 52, az: -10, d: 17.5, fov: 34, vy: -300 };
      else C = { look: [-0.1, 0.6, -0.6], el: 50, az: -10, d: 15.5, fov: 34, vy: -240 };
      const el = C.el * Math.PI / 180, az = C.az * Math.PI / 180;
      camera.position.set(C.look[0] + C.d * Math.cos(el) * Math.sin(az), C.look[1] + C.d * Math.sin(el), C.look[2] + C.d * Math.cos(el) * Math.cos(az));
      camera.lookAt(C.look[0], C.look[1], C.look[2]); camera.fov = C.fov;
      camera.setViewOffset(W, HH, 0, C.vy, W, HH); camera.updateProjectionMatrix();
    },
    hud(g, t) {
      const k = slideOf(t), rank = rankOfSlide(k);
      if (k === 0) {
        txt(g, 'อำเภอที่ใหญ่ที่สุด', 540, 285, 104, '#ffffff', 800, 'center', 980);
        txt(g, 'ในประเทศไทย', 540, 400, 96, P.gold);
        pill(g, 170, 470, 740, 78, P.coral, 0.95); txt(g, 'ทายก่อนปัด! อยู่จังหวัดไหน?', 540, 509, 50, '#ffffff', 800, 'center', 700);
        pill(g, 390, 1292, 300, 70, 'rgba(255,255,255,.14)'); txt(g, 'ปัดดูเฉลย', 508, 1327, 38, '#ffffff', 600);
        g.save(); g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(628, 1310); g.lineTo(658, 1327); g.lineTo(628, 1344); g.closePath(); g.fill(); g.restore();
        foot(g, 'จัดอันดับจากพื้นที่ (ตารางกิโลเมตร) • ทั้งหมด 878 อำเภอ', 1405);
        return;
      }
      if (rank) {
        const r = TOP[rank - 1], hi = rank === 1 ? P.gold : P.teal;
        FK.rankBadge(g, 150, 292, rank, N);
        const w0 = txt(g, r[1], 240, 262, 84, rank === 1 ? P.gold : '#ffffff', 800, 'left', 560);
        txt(g, 'จ.' + r[2], 240 + w0 + 20, 272, 40, '#bcd0ff', 600, 'left');
        const w = txt(g, nf(r[3]), 240, 366, 84, hi, 800, 'left');
        txt(g, 'ตร.กม.', 240 + w + 18, 376, 40, '#ffffff', 600, 'left');
        txt(g, r[4][0], 540, 462, 48, '#ffffff', 800, 'center', 960);
        txt(g, r[4][1], 540, 526, 42, rank === 1 ? '#ffe7a6' : '#bff7ec', 600, 'center', 960);
        foot(g, FOOT, 1405);
        return;
      }
      if (k === TWIST) {
        txt(g, 'รู้งี้ยัง?', 540, 262, 72, '#ffffff');
        txt(g, 'อุ้มผางอำเภอเดียว', 540, 362, 72, P.gold);
        txt(g, 'ใหญ่กว่ากรุงเทพฯ เกือบ 3 เท่า', 540, 452, 60, '#ffffff', 800, 'center', 960);
        pill(g, 150, 506, 780, 76, P.coral, 0.95); txt(g, 'และกาญจนบุรีกินไป 3 ใน 5 อันดับ', 540, 544, 46, '#ffffff', 800, 'center', 740);
        foot(g, 'อุ้มผาง 4,325 ตร.กม. vs กรุงเทพมหานคร 1,569 ตร.กม. (วางเทียบขนาดจริง)', 1405);
        return;
      }
      txt(g, 'สรุป 5 อำเภอที่ใหญ่ที่สุด', 540, 250, 62, P.gold, 800, 'center', 960);
      for (let i = 0; i < N; i++) {
        const r = TOP[i], y = 330 + i * 56, c = i === 0 ? P.gold : P.teal;
        if (i % 2 === 0) pill(g, 110, y - 24, 860, 48, 'rgba(255,255,255,.06)');
        txt(g, '#' + r[0], 160, y, 36, c, 800, 'center');
        const w = txt(g, r[1], 215, y, 36, '#ffffff', 700, 'left', 360);
        txt(g, 'จ.' + r[2], 215 + w + 14, y + 3, 28, '#bcd0ff', 600, 'left');
        txt(g, nf(r[3]) + ' ตร.กม.', 940, y, 36, c, 800, 'right');
      }
      txt(g, 'อำเภอคุณใหญ่แค่ไหน? คอมเมนต์เลย', 540, 1342, 46, P.coral, 800, 'center', 960);
      foot(g, FOOT, 1400);
    },
    caps: [], trans: [], audio: [], bed: [],
  });
})();
