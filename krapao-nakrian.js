/* พ่อแม่หัวจะปวด — กระเป๋านักเรียนหนักเกินตัว (เกณฑ์ 10%, กลไก, ไม่ใช่สาเหตุหลังคด, ตามช่วงวัย, พบแพทย์ถ้า, โรงเรียน, พ่อแม่)
   Build: node build.js krapao-nakrian.js review-krapao-nakrian.html --kit clay --title "กระเป๋านักเรียน หนักเกินตัวรึเปล่า?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 7.5], ['s2', 8], ['s3', 6.5], ['s4', 8], ['s5', 8], ['s6', 7.5], ['s7', 7.5], ['s8', 8.5], ['s9', 8.5], ['s10', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* stages: 0 hallway, 60 body mechanism, 90 spine, 120 age stairs, -60 night room, -120 classroom */
  const SH = {
    cover: [FW(0.05, 0.6, 5.6, 2.55, 0.2), FW(0.05, 0.6, 5.3, 2.5, 0.2)],
    s1: [FW(0.1, 0.6, 5.4, 2.7, 0.22), FW(0.1, 0.6, 5.2, 2.7, 0.22)],
    s2: [FW(60, 0, 4.6, 2.75, 0.14), FW(60, 0, 4.4, 2.75, 0.14)],
    s3: [FW(90.6, 0, 6.2, 6.0, 0.08), FW(90.6, 0, 6.0, 6.0, 0.08)],
    s4: [FW(117.3, 0.3, 6.4, 3.2, 0.12), FW(117.3, 0.3, 6.2, 3.2, 0.12)],
    s5: [FW(123.1, 0.3, 6.8, 5.0, 0.12), FW(123.1, 0.3, 6.6, 5.0, 0.12)],
    s6: REEL ? [FW(-60, 0.4, 8.0, 4.0, 0.16), FW(-60, 0.4, 7.8, 4.0, 0.16)] : [FW(-60, 0.4, 6.0, 5.4, 0.16), FW(-60, 0.4, 5.8, 5.4, 0.16)],
    s7: REEL ? [FW(-119.6, 0.4, 7.8, 3.1, 0.16), FW(-119.6, 0.4, 7.5, 3.1, 0.16)] : [FW(-119.6, 0.4, 7.8, 4.1, 0.16), FW(-119.6, 0.4, 7.5, 4.1, 0.16)],
    s8: REEL ? [FW(-119.6, 0.4, 7.8, 4.0, 0.16), FW(-119.6, 0.4, 7.5, 4.0, 0.16)] : [FW(-119.6, 0.4, 7.8, 5.9, 0.16), FW(-119.6, 0.4, 7.5, 5.9, 0.16)],
    s9: REEL ? [FW(0.2, 0.6, 5.8, 3.3, 0.2), FW(0.2, 0.6, 5.6, 3.3, 0.2)] : [FW(0.2, 0.6, 5.8, 5.0, 0.2), FW(0.2, 0.6, 5.6, 5.0, 0.2)],
    s10: REEL ? [{ pos: [0, 5.8, 29], look: [0, 2.3, 0], fov: 29 }, { pos: [0, 5.6, 28], look: [0, 2.3, 0], fov: 29 }] : [{ pos: [0, 6.6, 26], look: [0, 3.0, 0], fov: 29 }, { pos: [0, 6.3, 24.5], look: [0, 3.0, 0], fov: 29 }],
  };
  const CUT = new Set(['s2', 's3', 's4', 's6', 's7', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s6') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const t = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  /* scale display */
  function scaleFace(cv, kg) { const x = cv.getContext('2d'); x.fillStyle = '#20343a'; x.fillRect(0, 0, 256, 112); x.fillStyle = '#7dffb0'; x.font = '800 70px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(kg.toFixed(1), 128, 60); }

  /* uniforms / supporting cast (fruit names: มะยม ป.2, สละ ป.5, ลิ้นจี่ ม.2, ครูมะขาม) */
  const UNI = { top: '#f4f6ff', collar: '#2f4f9a' };
  const CAST = {
    myom: () => CK.chibi(T, Object.assign({ hairStyle: 'short', hair: '#3a2a22', bottom: '#2f4f9a', skin: CK.pal.skin[1], scale: 1.05 }, UNI)),
    sala: () => CK.chibi(T, Object.assign({ hairStyle: 'pigtails', hair: '#4a2c20', bottom: '#2f4f9a', skin: CK.pal.skin[0], lashes: true, scale: 1.13 }, UNI)),
    linji: () => CK.chibi(T, Object.assign({ bangs: 'side', hair: '#3d2a22', bottom: '#24346b', skin: CK.pal.skin[2], scale: 1.26 }, UNI)),
    teach: () => CK.chibi(T, { hairStyle: 'bob', hair: '#2b2b33', top: '#ff9a62', bottom: '#5a6ab8', skin: CK.pal.skin[0], lashes: true, longSleeve: true, scale: 1.36 }),
    nmom: () => CK.chibi(T, { hairStyle: 'bob', hair: '#5a3d2b', top: '#5cc99a', bottom: '#8a6ad8', skin: CK.pal.skin[1], lashes: true, longSleeve: true, scale: 1.3 }),
  };

  VE.run({
    DUR, file: 'krapao-nakrian', title: 'กระเป๋านักเรียน หนักเกินตัวรึเปล่า?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ลูกวัยเรียน', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x), dark = (c, k) => '#' + new T.Color(c).multiplyScalar(k || 0.72).getHexString();
      const prep = (g) => { g.userData.base = g.scale.x; g.rotation.order = 'YXZ'; scene.add(g); return g; };

      /* backpack: outer face toward -z (behind the wearer) */
      const makeBag = (w, h, d, col, books) => {
        const g = new T.Group(), m = M(col);
        const body = new T.Mesh(new T.BoxGeometry(w, h, d), m); g.add(body);
        const cap = new T.Mesh(new T.CylinderGeometry(d / 2, d / 2, w, 20), m); cap.rotation.z = PI / 2; cap.position.y = h / 2; g.add(cap);
        const pk = new T.Mesh(new T.BoxGeometry(w * 0.72, h * 0.4, 0.14), M(dark(col, 0.85))); pk.position.set(0, -h * 0.22, -d / 2 - 0.05); g.add(pk);
        const zp = new T.Mesh(new T.BoxGeometry(w * 0.6, 0.04, 0.03), M('#ffffff')); zp.position.set(0, -h * 0.05, -d / 2 - 0.12); g.add(zp);
        const tag = new T.Mesh(new T.SphereGeometry(0.06, 10, 8), M('#ffd23f')); tag.position.set(w * 0.25, -h * 0.05, -d / 2 - 0.14); g.add(tag);
        if (books) ['#ff5f6d', '#5ab8ff', '#79dcb4', '#ffd23f'].slice(0, books).forEach((c, i) => { const b = new T.Mesh(new T.BoxGeometry(w * 0.16, h * 0.5, d * 0.8), M(c)); b.position.set(-w * 0.3 + i * w * 0.2, h * 0.62, 0); b.rotation.z = (i - 1.5) * 0.12; g.add(b); });
        return g;
      };
      /* put a bag on a chibi: bag sits behind the back, two straps over the shoulders (tubes) */
      const wear = (g, bag, adult) => {
        const bodyH = adult ? 1.28 : 1.0, legH = adult ? 0.36 : 0.12, by = legH + 0.08 + 0.46 * bodyH * 0.92, sy = by + 0.46 * bodyH * (adult ? 0.58 : 0.55);
        const zf = (x, y) => 0.414 * Math.sqrt(Math.max(0.05, 1 - Math.pow(x / 0.469, 2) - Math.pow((y - by) / (0.46 * bodyH), 2))) + 0.045;
        const box = new T.Box3().setFromObject(bag), d = box.max.z - box.min.z;
        bag.position.set(0, by + 0.12, -0.38 - d * 0.42); g.add(bag);
        const sc = M(dark(bag.children[0].material.color.getStyle(), 0.6)), straps = [];
        for (const s of [-1, 1]) {
          const x = s * 0.22, pts = [new T.Vector3(x, sy - 0.05, -0.42), new T.Vector3(x, sy + 0.1, -0.12), new T.Vector3(x, sy + 0.05, zf(x, sy) - 0.03), new T.Vector3(x * 1.05, by + 0.1, zf(x, by + 0.1)), new T.Vector3(x * 1.15, by - 0.18, zf(x * 1.15, by - 0.18) - 0.02)];
          const st = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 24, 0.045, 8, false), sc); st.scale.x = 1; g.add(st); straps.push(st);
        }
        g.userData.bag = bag; g.userData.straps = straps; g.userData.bagHome = bag.position.clone();
        return g;
      };
      const oneShoulder = (g, k) => { const b = g.userData.bag, h = g.userData.bagHome; b.position.set(h.x + 0.3 * k, h.y - 0.08 * k, h.z); b.rotation.z = -0.32 * k; g.userData.straps[0].visible = k < 0.5; };

      /* ===== stage 0: home hallway (x = 0) ===== */
      const room = CK.room(T, { wall: '#bfe3ff', dots: 'rgba(255,255,255,0.8)', wain: '#ffb3c6', floor: '#e9b483', rug: '#79dcb4', props: false, winX: 3.4 }); scene.add(room);
      const door = new T.Group(); const dr = new T.Mesh(new T.BoxGeometry(1.7, 3.3, 0.14), M('#ff9e6e')); dr.position.y = 1.65; door.add(dr); const kn = new T.Mesh(new T.SphereGeometry(0.1, 12, 10), M('#ffd23f')); kn.position.set(0.6, 1.6, 0.1); door.add(kn); door.position.set(-3.3, 0, -4.3); scene.add(door);
      const shelf = new T.Mesh(new T.BoxGeometry(1.6, 0.9, 0.6), M('#c9b6ff')); shelf.position.set(-1.2, 0.45, -3.9); scene.add(shelf);
      for (let i = 0; i < 3; i++) { const sh = new T.Mesh(new T.SphereGeometry(0.16, 12, 10), M(['#ff6f91', '#5ab8ff', '#ffd23f'][i])); sh.scale.set(1, 0.6, 1.5); sh.position.set(-1.65 + i * 0.45, 1.0, -3.85); scene.add(sh); }
      /* bathroom scale */
      const sc = new T.Group(); const sb = new T.Mesh(new T.BoxGeometry(1.25, 0.14, 1.15), M('#ffffff')); sb.position.y = 0.07; sc.add(sb);
      const scv = document.createElement('canvas'); scv.width = 256; scv.height = 112; scaleFace(scv, 0); const scT = new T.CanvasTexture(scv);
      const disp = new T.Mesh(new T.PlaneGeometry(0.62, 0.27), new T.MeshBasicMaterial({ map: scT })); disp.rotation.x = -PI / 2 + 0.5; disp.position.set(0, 0.16, 0.42); sc.add(disp);
      sc.position.set(0, 0, 0.55); scene.add(sc);
      const H = {};
      for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa']) H[k] = prep(CK.family(T, k));
      H.myom = prep(wear(CAST.myom(), makeBag(0.98, 1.0, 0.5, '#ff6f91', 4), false));
      H.mamaBag = makeBag(0.62, 0.62, 0.3, '#ffd23f', 0); wear(H.mama, H.mamaBag, false);
      const floorBag = makeBag(0.98, 1.0, 0.5, '#ff6f91', 4); floorBag.scale.setScalar(1.05); floorBag.rotation.y = PI * 0.85; scene.add(floorBag);
      const lightBag = makeBag(0.8, 0.82, 0.36, '#5ab8ff', 0); /* closing: lighter bag for มะยม */
      const H2 = { myom: prep(wear(CAST.myom(), lightBag, false)) };
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 3.6, Math.cos(i * 3.3) * 0.6 + 0.6, (i * 0.37) % 1]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage 1: body mechanism (x = 60) ===== */
      const plat = (x, w, col, wallCol) => { const p = new T.Mesh(new T.BoxGeometry(w, 0.3, 12), M(col)); p.position.set(x, -0.15, 0); scene.add(p); const bw = new T.Mesh(new T.BoxGeometry(w, 10, 0.3), M('#ffffff', { map: dots(wallCol, '#ffffff', [w / 2.4, 4]) })); bw.position.set(x, 4.6, -4.5); scene.add(bw); };
      plat(60, 16, '#ff9ebd', '#ffd1e3'); plat(90, 14, '#6fb8f0', '#d6ecff'); plat(120, 18, '#9a7ef0', '#e8deff');
      const MB = prep(wear(CAST.myom(), makeBag(0.98, 1.0, 0.5, '#ff6f91', 4), false)); MB.position.set(60, 0, 0.2);
      const arrow = (col) => { const g = new T.Group(), m = M(col, { emissive: col, emissiveIntensity: 0.3 }); const sh = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.8, 12), m); sh.position.y = 0.4; const hd = new T.Mesh(new T.ConeGeometry(0.18, 0.34, 16), m); hd.position.y = 0.95; g.add(sh, hd); scene.add(g); return g; };
      const arPull = arrow('#ff4d6d'), arLean = arrow('#ffb020');
      const glow = []; for (let i = 0; i < 2; i++) { const s = new T.Mesh(new T.SphereGeometry(0.16, 16, 12), new T.MeshBasicMaterial({ color: '#ff3b5c', transparent: true, opacity: 0.6, depthTest: false })); s.renderOrder = 5; scene.add(s); glow.push(s); }

      /* ===== stage 2: spine (x = 90) ===== */
      const spine = new T.Group(); spine.position.set(90, 0.5, 0); scene.add(spine);
      const VERT = []; for (let i = 0; i < 13; i++) { const v = new T.Mesh(new T.CylinderGeometry(0.34 - i * 0.008, 0.36 - i * 0.008, 0.2, 20), M('#fff0c8')); const sp = new T.Mesh(new T.BoxGeometry(0.12, 0.12, 0.34), M('#ffe2a0')); sp.position.set(0, 0, -0.3); v.add(sp); spine.add(v); VERT.push(v); if (i < 12) { const dsk = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.09, 18), M('#ff8fab')); spine.add(dsk); v.userData.disc = dsk; } }
      const skull = new T.Mesh(new T.SphereGeometry(0.55, 24, 18), M('#fff0c8')); skull.scale.set(1, 0.9, 1); spine.add(skull);
      const pelvis = new T.Mesh(new T.SphereGeometry(0.75, 24, 14), M('#fff0c8')); pelvis.scale.set(1.2, 0.45, 0.6); pelvis.position.set(0, -0.15, 0); spine.add(pelvis);
      const sEyes = new T.Group(); for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#3a2f3f')); e.position.set(s * 0.18, 0, 0.5); sEyes.add(e); } skull.add(sEyes);
      const pains = []; for (let i = 0; i < 3; i++) { const s = new T.Mesh(new T.SphereGeometry(0.34, 16, 12), new T.MeshBasicMaterial({ color: '#ff3b5c', transparent: true, opacity: 0.5, depthTest: false })); s.renderOrder = 5; spine.add(s); pains.push(s); }
      const spBag = makeBag(0.98, 1.0, 0.5, '#ff6f91', 4); spBag.position.set(91.9, 1.3, 0); spBag.rotation.y = -0.5; scene.add(spBag);

      /* ===== stage 3: age stairs (x = 120) ===== */
      const STX = [115.6, 118.6, 121.6, 124.6], STH = [0.3, 0.7, 1.1, 1.5], STC = ['#ffd23f', '#ff8fab', '#5ab8ff', '#79dcb4'];
      STX.forEach((x, i) => { const b = new T.Mesh(new T.BoxGeometry(2.9, STH[i], 2.6), M(STC[i])); b.position.set(x, STH[i] / 2, 0.3); scene.add(b); const tp = new T.Mesh(new T.BoxGeometry(2.96, 0.08, 2.66), M('#ffffff')); tp.position.set(x, STH[i] + 0.02, 0.3); scene.add(tp); });
      const S3 = {
        mama: prep(wear(CK.family(T, 'mama'), makeBag(0.62, 0.62, 0.3, '#ffd23f', 0), false)),
        myom: prep(wear(CAST.myom(), makeBag(0.98, 1.0, 0.5, '#ff6f91', 4), false)),
        sala: prep(wear(CAST.sala(), makeBag(0.9, 0.95, 0.46, '#7a5cff', 3), false)),
        linji: prep(wear(CAST.linji(), makeBag(0.85, 0.85, 0.45, '#ff9a62', 3), true)),
      };
      const kit = new T.Group(); const bottleK = new T.Mesh(new T.CylinderGeometry(0.15, 0.15, 0.55, 16), M('#5ab8ff')); bottleK.position.set(0, 0.28, 0); const capK = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.12, 14), M('#ffffff')); capK.position.y = 0.6; const mat = new T.Mesh(new T.BoxGeometry(0.75, 0.22, 0.5), M('#ff9ec0')); mat.position.set(0.55, 0.11, 0.05); const clo = new T.Mesh(new T.BoxGeometry(0.45, 0.14, 0.4), M('#ffffff')); clo.position.set(0.55, 0.29, 0.05); kit.add(bottleK, capK, mat, clo); kit.position.set(114.5, STH[0] + 0.04, 1.0); scene.add(kit);

      /* ===== stage 4: night room (x = -60) ===== */
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: 2.4 }); room2.position.x = -60; scene.add(room2);
      room2.userData.win.material.map = nightTex();
      const bed2 = new T.Group(); const bf = new T.Mesh(new T.BoxGeometry(3.0, 0.5, 2.2), M('#e9b27c')); bf.position.y = 0.25; const bm2 = new T.Mesh(new T.BoxGeometry(2.9, 0.3, 2.1), M('#ffffff', { map: dots('#f0804f', '#ffd9c2') })); bm2.position.y = 0.62; bed2.add(bf, bm2); bed2.position.set(-62.2, 0, -2.6); scene.add(bed2);
      const N = { myom: prep(CAST.myom()), mom: prep(CAST.nmom()) };
      const nBag = makeBag(0.98, 1.0, 0.5, '#ff6f91', 4); nBag.position.set(-58.2, 0.5, -0.6); nBag.rotation.set(0, -0.5, 0.25); scene.add(nBag);

      /* ===== stage 5: classroom (x = -120) ===== */
      const room3 = CK.room(T, { wall: '#ffd9a8', dots: 'rgba(255,255,255,0.7)', wain: '#79dcb4', floor: '#d9a066', rug: false, props: false, winX: 3.7 }); room3.position.x = -120; scene.add(room3);
      const bt = ctex(512, 256, (x) => { x.fillStyle = '#2f7a5a'; x.fillRect(0, 0, 512, 256); x.strokeStyle = '#e9d29a'; x.lineWidth = 16; x.strokeRect(0, 0, 512, 256); x.fillStyle = '#ffffff'; x.font = '700 46px Kanit,sans-serif'; x.textAlign = 'center'; x.fillText('ตารางเรียน', 256, 70); x.font = '500 30px Kanit,sans-serif'; ['จ. ไทย คณิต', 'อ. วิทย์ อังกฤษ', 'พ. สังคม ศิลปะ'].forEach((s, i) => x.fillText(s, 256, 128 + i * 44)); });
      const board = new T.Mesh(new T.BoxGeometry(3.6, 1.8, 0.1), M('#ffffff', { map: bt })); board.position.set(-120.6, 3.1, -4.3); scene.add(board);
      const lockers = new T.Group(); const LC = ['#ff6f91', '#ffd23f', '#5ab8ff', '#79dcb4', '#b9a4ff', '#ff9e6e'];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { const b = new T.Mesh(new T.BoxGeometry(0.72, 0.8, 0.7), M(LC[r * 2 + c])); b.position.set(c * 0.76, 0.42 + r * 0.84, 0); lockers.add(b); const hd = new T.Mesh(new T.BoxGeometry(0.08, 0.22, 0.06), M('#ffffff')); hd.position.set(c * 0.76 + 0.24, 0.42 + r * 0.84, 0.37); lockers.add(hd); }
      lockers.position.set(-117.0, 0, -3.0); scene.add(lockers);
      const pile = []; ['#ff5f6d', '#5ab8ff', '#79dcb4', '#ffd23f', '#b9a4ff'].forEach((c, i) => { const b = new T.Mesh(new T.BoxGeometry(0.8, 0.12, 0.6), M(c)); b.userData.home = new T.Vector3(-120.35 + (i % 2) * 0.05, 0.42 + i * 0.13, 1.92); b.rotation.y = (i % 3) * 0.12; scene.add(b); pile.push(b); });
      const C = { teach: prep(CAST.teach()), myom: prep(wear(CAST.myom(), makeBag(0.98, 1.0, 0.5, '#ff6f91', 0), false)), sala: prep(wear(CAST.sala(), makeBag(0.9, 0.95, 0.46, '#7a5cff', 0), false)) };

      return { key, hemi, room, room2, scv, scT, scale: sc, H, H2, floorBag, hearts, MB, arPull, arLean, glow, spine, VERT, skull, pains, spBag, S3, kit, N, nBag, C, pile, lockers, oneShoulder, kgShown: -1 };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t); s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc);
      const pose = (g, x, z, o) => { o = o || {}; g.visible = true; g.position.set(x, o.y || 0, z); g.rotation.set(o.lean || 0, o.ry || 0, o.tilt || 0); g.userData.setExpr(o.ex || 'happy'); g.userData.tick(t, { wave: o.wave, breath: o.breath }); };
      const bob = (sp, a) => Math.abs(Math.sin(t * sp)) * a;

      /* ---------- stage 0: hallway ---------- */
      const H = s.H; for (const k in H) if (H[k].isObject3D) H[k].visible = false; s.H2.myom.visible = false; s.floorBag.visible = false; s.scale.visible = false;
      H.mamaBag.visible = false; H.myom.userData.bag.visible = true; H.myom.userData.straps.forEach((x) => (x.visible = true));
      let kg = 0;
      if (bt === 'cover') {
        const w = Math.sin(t * 3.2);
        pose(H.myom, -0.95 + 0.05 * w, 0.6, { ex: 'worried', lean: 0.3 + 0.04 * w, tilt: 0.06 * w, ry: 0.75 });
        pose(H.mama, 1.2, 0.9, { ex: 'worried', ry: -0.45, y: bob(5, 0.06) }); H.mama.userData.arm1.rotation.z = 0.9; H.mama.userData['arm-1'].rotation.z = -0.9; H.mama.userData.arm1.rotation.x = H.mama.userData['arm-1'].rotation.x = -0.9;
      } else if (bt === 's1') {
        const p = ph('s1', t), on = U.clamp((p - 0.03) / 0.08), withBag = p > 0.22;
        s.scale.visible = true;
        const hop = Math.sin(PI * on) * 0.4;
        pose(H.myom, U.lerp(-1.4, 0, U.easeIO(on)), U.lerp(1.1, 0.55, on), { y: 0.14 * on + hop, ex: p > 0.36 && p < 0.55 ? 'worried' : 'happy', lean: withBag ? 0.22 : 0, ry: 0.1 });
        H.myom.userData.bag.visible = withBag; H.myom.userData.straps.forEach((x) => (x.visible = withBag));
        s.floorBag.visible = !withBag; s.floorBag.position.set(1.4, 0.5, 0.9);
        kg = on < 0.9 ? 0 : !withBag ? 22.0 * U.clamp((p - 0.1) / 0.06) : 22.0 + 4.4 * U.clamp((p - 0.24) / 0.1);
      } else if (bt === 's9') {
        const p = ph('s9', t);
        pose(H.mama, -0.5, 0.7, { ex: p > 0.15 ? 'giggle' : 'happy', ry: -0.75, y: bob(4, 0.04) }); H.mamaBag.visible = true; H.mama.userData.straps.forEach((x) => (x.visible = true));
        pose(H.mom, 1.4, 0.0, { ex: 'happy', ry: -0.6 }); H.mom.userData['arm-1'].rotation.z = -1.0 + 0.08 * Math.sin(t * 5); H.mom.userData['arm-1'].rotation.x = -0.9;
      } else if (bt === 's10') {
        const p = ph('s10', t);
        pose(H.mom, -1.9, -0.7, { ex: 'happy' }); pose(H.dad, 1.95, -0.7, { ex: 'happy', wave: p > 0.3 && p < 0.7 });
        pose(H.nana, -0.6, 1.4, { ex: 'giggle', y: bob(5, 0.12) }); pose(H.mama, 0.95, 1.4, { ex: 'giggle', y: bob(5.5, 0.14) }); H.mamaBag.visible = true;
        pose(H.wawa, 2.3, 1.4, { ex: 'happy', y: bob(4, 0.05) });
        pose(s.H2.myom, -2.3, 1.4, { ex: 'giggle', ry: 0.15, y: bob(5, 0.1), wave: p > 0.2 });
        s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s10') - 0.4 - u[2] * 1.4) / 3.2; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.2, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });
      }
      if (bt !== 's10') s.hearts.forEach((h) => (h.visible = false));
      H.mama.userData.straps.forEach((x) => (x.visible = H.mamaBag.visible));
      if (Math.abs(kg - s.kgShown) > 0.05) { s.kgShown = kg; scaleFace(s.scv, kg); s.scT.needsUpdate = true; }

      /* ---------- stage 1: mechanism ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0, q = SP('s2', 0.5), k1 = U.easeIO(U.clamp((p - 0.08) / 0.25)), k2 = U.easeIO(U.clamp((t - q) / 0.7));
        const g = s.MB, ry = U.lerp(-1.05, 0, k2), lean = 0.32 * k1 * (1 - k2) + 0.08 * k2, tilt = 0.2 * k2;
        pose(g, 60, 0.2, { ex: p > 0.3 ? 'worried' : 'happy', lean, ry, tilt });
        g.userData.head.position.z = 0.15 * k1 * (1 - k2); s.oneShoulder(g, k2);
        g.updateMatrixWorld(true);
        const ap = new T.Vector3(); g.userData.bag.getWorldPosition(ap);
        const showA = inB('s2', t) && k1 > 0.05 && k2 < 0.5;
        s.arPull.visible = showA; s.arPull.position.copy(ap).add(new T.Vector3(0.75, -0.1, 0)); s.arPull.rotation.set(0, 0, -PI / 2 - 0.35); s.arPull.scale.setScalar(k1 * (1 + 0.08 * Math.sin(t * 6)));
        const hp = new T.Vector3(); g.userData.head.getWorldPosition(hp);
        s.arLean.visible = showA && p > 0.2; s.arLean.position.copy(hp).add(new T.Vector3(-0.75, -0.45, 0.2)); s.arLean.rotation.set(0, 0, PI / 2 + 0.3); s.arLean.scale.setScalar(U.clamp((p - 0.2) / 0.1));
        s.glow.forEach((o, i) => { const st = g.userData.straps[i === 0 ? 0 : 1]; o.visible = inB('s2', t) && p > 0.3 && st.visible; if (!o.visible) return; const v = new T.Vector3(i ? 0.22 : -0.22, 0.95, 0.05); g.localToWorld(v); o.position.copy(v); o.scale.setScalar(1 + 0.25 * Math.sin(t * 7)); o.material.opacity = 0.45 + 0.2 * Math.sin(t * 7); });
      }

      /* ---------- stage 2: spine ---------- */
      { const p = inB('s3', t) ? ph('s3', t) : 0, q = SP('s3', 0.45), amp = 0.34 * U.easeIO(U.clamp((p - 0.08) / 0.25)) * (1 - U.easeIO(U.clamp((t - q) / 0.6)));
        let y = 0.3; s.VERT.forEach((v, i) => { const u = i / 12, x = -amp * Math.sin(u * PI * 2); v.position.set(x, y, 0); v.rotation.z = -amp * Math.cos(u * PI * 2) * 0.9; if (v.userData.disc) v.userData.disc.position.set(x, y + 0.16, 0); y += 0.32; });
        s.skull.position.set(0, y + 0.45, 0); s.skull.rotation.y = 0.2 * Math.sin(t * 1.2);
        const pp = t > q + 0.6; [[0, 3.75], [0, 2.4], [0, 0.95]].forEach(([x, py], i) => { const o = s.pains[i]; o.visible = pp && inB('s3', t); o.position.set(x, py, 0.1); o.scale.setScalar(1 + 0.2 * Math.sin(t * 6 + i)); });
        s.spBag.rotation.y = -0.5 + 0.1 * Math.sin(t * 1.5); }

      /* ---------- stage 3: stairs ---------- */
      { const S = s.S3, STX = [115.6, 118.6, 121.6, 124.6], STH = [0.3, 0.7, 1.1, 1.5];
        const p4 = inB('s4', t) ? ph('s4', t) : 0, p5 = inB('s5', t) ? ph('s5', t) : 0, q5 = SP('s5', 0.5);
        pose(S.mama, STX[0] + 0.35, 0.5, { y: STH[0] + 0.04 + bob(4.5, 0.08), ex: 'happy', ry: 0.15 });
        const wob = Math.sin(t * 3.4);
        pose(S.myom, STX[1], 0.4, { y: STH[1] + 0.04, ex: p4 > 0.45 || inB('s5', t) ? 'worried' : 'happy', lean: 0.3 + 0.04 * wob, tilt: 0.05 * wob, ry: 0.15 });
        pose(S.sala, STX[2], 0.4, { y: STH[2] + 0.04, ex: inB('s5', t) && t < q5 ? 'worried' : 'happy', lean: 0.24, ry: -0.1 });
        const one = U.clamp((t - q5) / 0.6);
        pose(S.linji, STX[3], 0.3, { y: STH[3] + 0.04, ex: one > 0.5 ? 'worried' : 'happy', lean: 0.1, tilt: 0.18 * one, ry: -0.25 }); s.oneShoulder(S.linji, one);
        if (inB('s5', t) && t < q5) { S.sala.userData.arm1.rotation.z = 2.3 + 0.1 * Math.sin(t * 5); S.sala.userData.arm1.rotation.x = 1.0; }
        s.kit.visible = true; s.kit.rotation.y = 0.2 * Math.sin(t); }

      /* ---------- stage 4: night ---------- */
      { const p = inB('s6', t) ? ph('s6', t) : 0;
        pose(s.N.myom, -61.1, 0.3, { ex: 'cry', ry: 0.3 }); s.N.myom.userData.arm1.rotation.z = 2.3 + 0.1 * Math.sin(t * 4); s.N.myom.userData.arm1.rotation.x = 1.0;
        pose(s.N.mom, -58.7, 0.0, { ex: 'worried', ry: -0.45 }); s.N.mom.userData.arm1.rotation.z = 0.4; s.N.mom.userData['arm-1'].rotation.z = -1.1 + 0.05 * Math.sin(t * 3); s.N.mom.userData['arm-1'].rotation.x = -0.9;
        s.N.mom.visible = p > 0.08 || !inB('s6', t); }

      /* ---------- stage 5: classroom ---------- */
      { const C = s.C, p7 = inB('s7', t) ? ph('s7', t) : t >= end('s7') ? 1 : 0, q7 = SP('s7', 0.5), lk = U.clamp((t - q7 - 0.3) / 1.6);
        pose(C.teach, -122.25, 0.0, { ex: t < q7 ? 'worried' : 'happy', ry: 0.45, wave: t > q7 + 0.2 && t < q7 + 1.6 });
        pose(C.myom, -120.35, 1.3, { ex: t < q7 ? 'worried' : 'giggle', lean: t < q7 ? 0.28 : 0.04, ry: t < q7 ? 0.1 : 0.4, y: t > q7 ? bob(5, 0.08) : 0 }); if (t < q7 + 1.4) { C.myom.userData.arm1.rotation.set(-1.0, 0, 0.25); C.myom.userData['arm-1'].rotation.set(-1.0, 0, -0.25); }
        pose(C.sala, -118.2, 1.0, { ex: t < q7 ? 'worried' : 'happy', lean: t < q7 ? 0.22 : 0.03, ry: -0.2 });
        s.pile.forEach((b, i) => { const a = U.clamp(lk * 6 - (4 - i) * 1.1), tgt = new T.Vector3(-117.0 + (i % 2) * 0.76, 0.42 + Math.floor(i / 2) * 0.84, -2.7); b.position.lerpVectors(b.userData.home, tgt, U.easeIO(a)); b.position.y += Math.sin(PI * a) * 1.2; b.visible = a < 0.98; });
        s.lockers.children.forEach((m, i) => { if (m.material.emissive) { m.material.emissive.set('#fff3b0'); m.material.emissiveIntensity = t > q7 && t < end('s8') ? 0.12 + 0.1 * Math.sin(t * 4) : 0; } }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { H: s.H, H2: s.H2, MB: s.MB, S3: s.S3, N: s.N, C: s.C }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's6') return ['#3a3570', '#6a4a80']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, a, bg, fg) => { g.save(); g.globalAlpha = a; g.font = '800 40px Kanit,sans-serif'; const w = g.measureText(str).width + 44; rr(x - w / 2, y - 34, w, 68, 34, bg || '#ffffff', '#3a2f3f'); plain(str, x, y + 2, 40, fg || '#3a2f3f', 800, 'center'); g.restore(); };
      /* s1: bag weight + gauge */
      if (b === 's1') {
        const p = ph('s1', t);
        const ra = U.clamp((p - 0.1) / 0.05) * U.clamp((SP('s1', 0.55) - t) / 0.3);
        if (ra > 0) { const kg = p < 0.22 ? 22.0 * U.clamp((p - 0.1) / 0.06) : 22.0 + 4.4 * U.clamp((p - 0.24) / 0.1), bx = 790 - LD, by = 900; g.save(); g.globalAlpha = ra; rr(bx - 160, by - 70, 320, p > 0.36 ? 220 : 140, 28, 'rgba(255,255,255,.92)', '#3a2f3f'); plain(p < 0.22 ? 'ไม่สะพาย' : 'สะพาย', bx, by - 34, 32, '#6a4a60', 700, 'center'); plain(kg.toFixed(1) + ' กก.', bx, by + 16, 56, '#3a2f3f', 800, 'center');
          if (p > 0.36) { const a2 = U.clamp((p - 0.36) / 0.05); g.globalAlpha = ra * a2; rr(bx - 150, by + 70, 300, 64, 32, '#ffd35e'); plain('กระเป๋า 4.4 กก.', bx, by + 104, 36, '#3a2f3f', 800, 'center'); } g.restore(); }
        const ga = U.clamp((t - SP('s1', 0.55) - 0.2) / 0.4);
        if (ga > 0) {
          g.save(); g.globalAlpha = ga; const x0 = 110 + LD, x1 = 970 - LD, y = 760, w = x1 - x0, seg = (a, b2, c) => { g.fillStyle = c; g.fillRect(x0 + w * a / 30, y - 22, w * (b2 - a) / 30, 44); };
          rr(x0 - 8, y - 30, w + 16, 60, 30, '#ffffff'); seg(0, 10, '#5fd38d'); seg(10, 20, '#ffc94d'); seg(20, 30, '#ff5f6d');
          [0, 10, 20, 30].forEach((v) => plain(v + '%', x0 + w * v / 30, y + 58, 30, '#3a2f3f', 700, 'center'));
          const mv = 20 * U.easeOut(U.clamp((t - SP('s1', 0.55) - 0.5) / 1.0)), mx = x0 + w * mv / 30;
          g.beginPath(); g.moveTo(mx, y - 30); g.lineTo(mx - 18, y - 62); g.lineTo(mx + 18, y - 62); g.closePath(); g.fillStyle = '#3a2f3f'; g.fill();
          plain('มะยม ' + Math.round(mv) + '%', mx, y - 86, 34, '#3a2f3f', 800, 'center'); g.restore();
        }
      }
      /* s3: myth stamp */
      if (b === 's3') {
        const q = SP('s3', 0.45), p = ph('s3', t);
        const [x, y] = proj(new T.Vector3(90, 5.9, 0));
        if (t < q) { const a = U.clamp((p - 0.12) / 0.08); g.save(); g.globalAlpha = a; txt('?', x + 160, y + 40 + 8 * Math.sin(t * 5), 110, '#ff5f6d', 800); g.restore(); }
        else { const a = U.clamp((t - q) / 0.25), k = 1.5 - 0.5 * U.easeBack(a); g.save(); g.globalAlpha = a; g.translate(x + 210, y + 10); g.rotate(-0.15); g.scale(k, k); rr(-150, -50, 300, 100, 20, 'rgba(255,255,255,.92)', '#ff3b5c'); plain('ไม่ใช่สาเหตุ', 0, 4, 46, '#ff3b5c', 800, 'center'); g.restore(); }
      }
      /* s4/s5: age labels above heads */
      if (b === 's4' || b === 's5') {
        const L = [['mama', 'อนุบาล', '#ffd23f'], ['myom', 'ป.1–3', '#ff8fab'], ['sala', 'ป.4–6', '#5ab8ff'], ['linji', 'ม.1–6', '#79dcb4']];
        L.forEach(([k, lab, c]) => { const o = S.S3[k]; const [x, y, z] = wp(o.userData.head, 1.15 * o.scale.x); if (z > 1 || x < 40 || x > 1040) return; tag(lab, x, Math.max(y, 640), 1, c, '#3a2f3f'); });
      }
      /* s6: doctor list */
      if (b === 's6') {
        const p = ph('s6', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 460, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = [['ปวดคอ บ่า หลัง ไม่ดีขึ้น', 'หรือปวดจนตื่นกลางดึก'], ['ชา เสียวแปลบ หรืออ่อนแรง', 'ที่แขน มือ หรือขา'], ['ไหล่-สะโพกสูงไม่เท่ากัน', 'หรือหลังนูนข้างเดียวตอนก้มตัว'], ['ปวดหลังร่วมกับมีไข้', 'หรือน้ำหนักลด']];
        L.forEach(([l1, l2], i) => { const a = U.clamp((t - TM('s6', i, 0.12 + i * 0.13)) / 0.35); if (a <= 0) return; const y = 384 + i * 102; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(122 + LD, y + 14, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 122 + LD, y + 16, 32, '#ffffff', 800, 'center'); plain(l1, 166 + LD, y, Math.round(38 * LF), '#ffffff', 700); plain(l2, 166 + LD, y + 40, Math.round(32 * LF), '#ffd6e4', 500); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: AAOS, KidsHealth (Nemours)', 540, 820, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s8: school list, s9: parent list */
      const list = (id, title, L, y0) => {
        const p = ph(id, t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, y0, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM(id, i, 0.1 + i * 0.16)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM(id, i, 0.1 + i * 0.16)) / 0.3); if (a <= 0) return; const y = y0 + 60 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(37 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      };
      if (b === 's8') list('s8', '', ['ล็อกเกอร์ หรือชั้นเก็บหนังสือในห้อง', 'บอกล่วงหน้า พรุ่งนี้ใช้เล่มไหน', 'จัดตาราง วิชาเล่มหนาไม่ชนวันเดียว', 'ให้วางกระเป๋าลง ตอนเข้าแถว-รอรถ', 'ชั่งกระเป๋าเทอมละครั้ง สอนเด็กจัดเอง'], 320);
      if (b === 's9') list('s9', '', ['เป้ 2 สาย สายกว้างเกิน 6 ซม. มีบุนวม', 'สะพาย 2 ข้าง ปรับสายให้ชิดหลัง', 'ก้นกระเป๋าไม่ต่ำกว่าเอว', 'ของหนักไว้ชิดหลัง เอาของเล่นออก', 'จัดตามตารางทุกคืน ย่อเข่าก่อนยก'], 320);
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[88, ['กระเป๋าลูก', '#fff']], [80, ['หนักเกินตัวรึเปล่า?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.55), y: 290, lines: [[64, ['ชั่ง 2 รอบ รู้เลย', '#fff']], [46, ['สะพาย ลบ ไม่สะพาย = น้ำหนักกระเป๋า', '#ffe3ea', 600]]] },
      { t0: SP('s1', 0.55) + 0.02, t1: end('s1') - 0.05, y: 280, lines: [[58, ['ไม่ควรเกิน ', '#fff'], ['10%', '#ffd35e'], [' ของน้ำหนักตัว', '#fff']], [46, ['หนักสุดไม่เกิน 20% · ลูก 22 กก. → ไม่เกิน 2.2 กก.', '#ffe3ea', 600]]], foot: 'ที่มา: AAP, กรมการแพทย์' },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.5), y: 290, lines: [[60, ['กระเป๋าหนักดึงไปข้างหลัง', '#fff']], [46, ['ตัวต้องโน้มไปหน้า คอยื่น สายกดบ่า', '#ffe3ea', 600]]] },
      { t0: SP('s2', 0.5) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[60, ['สะพายข้างเดียว', '#ffd35e']], [46, ['น้ำหนักเทข้างเดียว ตัวเอียง กล้ามเนื้อเกร็ง', '#ffe3ea', 600]]] },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.45), y: 290, lines: [[62, ['แบกหนักทุกวัน', '#fff']], [62, ['หลังจะคดไหม?', '#ffd35e']]] },
      { t0: SP('s3', 0.45) + 0.02, t1: end('s3') - 0.05, y: 280, lines: [[54, ['หลังคด ไม่ได้เกิดจากกระเป๋า', '#fff']], [46, ['แต่ทำให้ปวดคอ บ่า หลัง ท่าทางเสีย', '#ffe3ea', 600]], [46, ['เสียการทรงตัว ล้มบนบันไดได้', '#ffe3ea', 600]]], foot: 'ที่มา: AAOS (สมาคมแพทย์ออร์โธปิดิกส์สหรัฐฯ)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.45), y: 280, lines: [[58, ['อนุบาล: ของใช้หนักกว่าหนังสือ', '#ffd35e']], [44, ['กระติกน้ำ ชุดสำรอง ที่นอน', '#fff', 600]], [44, ['ยังทรงตัวไม่ดี เป้ต้องไม่ใหญ่กว่าหลังลูก', '#ffe3ea', 600]]], foot: 'วัยอนุบาล-ประถมต้น การทรงตัวยังไม่ดี (กรมการแพทย์)' },
      { t0: SP('s4', 0.45) + 0.02, t1: end('s4') - 0.05, y: 280, lines: [[58, ['ป.1–3 หนักสุด', '#ffd35e']], [52, [(t) => 'เกิน ' + Math.round(80 * U.clamp((t - SP('s4', 0.45) - 0.2) / 1.0)) + '%', '#fff'], [' แบกเกินเกณฑ์ 10%', '#fff']], [46, ['1 ใน 4 แบกเกิน 20%', '#ffe3ea', 600]]], foot: 'รามาฯ + มูลนิธิเพื่อผู้บริโภค สุ่มชั่ง ป.1–6 368 คน' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 280, lines: [[58, ['ป.4–6: ', '#ffd35e'], [(t) => (62.8 * U.clamp((t - at('s5') - 0.4) / 1.0)).toFixed(1) + '%', '#fff'], [' แบกเกินเกณฑ์', '#fff']], [46, ['ปวดไหล่ 85% · แบกนานเกิน 20 นาที ยิ่งเสี่ยง', '#ffe3ea', 600]]], foot: 'นักเรียน ป.4–6 กทม. 145 คน · วารสารกรมการแพทย์ 2562' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 280, lines: [[58, ['ม.ต้น–ปลาย: เฉลี่ยเกือบ 7 กก.', '#ffd35e']], [46, ['ชอบสะพายข้างเดียว', '#fff', 600]], [46, ['กลุ่มแบกหนักสุด พบปวดหลังมากขึ้น 50%', '#ffe3ea', 600]]], foot: 'Arch Dis Child 2012 · นักเรียน 12–17 ปี สเปน 1,403 คน' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 250, lines: [[60, ['พาไปพบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s7') + 0.2, t1: SP('s7', 0.5), y: 280, lines: [[58, ['โรงเรียนควรสนใจแค่ไหน?', '#ffd35e']], [46, ['มาก! ต้นเหตุส่วนใหญ่อยู่ที่ระบบ', '#fff', 600]], [42, ['ตารางเรียน · ขนทุกเล่มทุกวัน · ไม่มีที่เก็บ', '#ffe3ea', 600]]] },
      { t0: SP('s7', 0.5) + 0.02, t1: end('s7') - 0.05, y: 280, lines: [[56, ['ปรับเล็กๆ ในโรงเรียน', '#fff']], [56, ['กระเป๋าก็เบาลงได้', '#ffd35e']]], foot: 'Pediatr Res 2018 · นักเรียน 1,668 คน · ได้ผลชัดในบางชั้นปี' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 250, lines: [[58, ['โรงเรียนช่วยได้ 5 ข้อ', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[58, ['พ่อแม่ทำได้ 5 ข้อ', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[62, ['กระเป๋าเบาลง ลูกเดินตัวตรง', '#fff']], [44, ['กระเป๋าลูกคุณหนักกี่กิโล? ลองชั่งแล้วคอมเมนต์', '#ffe3ea', 600]]], foot: 'ข้อมูล: AAP, AAOS, กรมการแพทย์, รามาฯ, Arch Dis Child 2012' },
    ],
    trans,
    audio: [
      [0.4, 'boing'], [1.1, 'thud'],
      [at('s1') + 0.3, 'whoosh'], [P('s1', 0.06), 'boing'], [P('s1', 0.14), 'ding'], [P('s1', 0.23), 'pop'], [P('s1', 0.3), 'tick'], [P('s1', 0.36), 'warn'], [SP('s1', 0.55) + 0.5, 'riser'], [SP('s1', 0.55) + 1.5, 'ding'],
      [at('s2') + 0.6, 'thud'], [P('s2', 0.3), 'warn'], [SP('s2', 0.5), 'whoosh'], [SP('s2', 0.5) + 0.7, 'boing'],
      [at('s3') + 0.4, 'shimmer'], [P('s3', 0.15), 'warn'], [SP('s3', 0.45), 'boom'], [SP('s3', 0.45) + 0.6, 'pop'],
      [at('s4') + 0.3, 'pop'], [at('s4') + 0.8, 'giggle'], [SP('s4', 0.45), 'thud'], [SP('s4', 0.45) + 0.4, 'riser'],
      [at('s5') + 0.4, 'ding'], [SP('s5', 0.5), 'whoosh'], [SP('s5', 0.5) + 0.5, 'warn'],
      [at('s6') + 0.3, 'heartbeat'], [TM('s6', 0, 0.12), 'tick'], [TM('s6', 1, 0.25), 'tick'], [TM('s6', 2, 0.38), 'tick'], [TM('s6', 3, 0.51), 'tick'], [P('s6', 0.7), 'heartbeat'],
      [at('s7') + 0.4, 'thud'], [SP('s7', 0.5), 'twinkle'], [SP('s7', 0.5) + 0.5, 'pop'], [SP('s7', 0.5) + 0.9, 'pop'], [SP('s7', 0.5) + 1.3, 'pop'],
      [TM('s8', 0, 0.1), 'ding'], [TM('s8', 1, 0.26), 'tick'], [TM('s8', 2, 0.42), 'tick'], [TM('s8', 3, 0.58), 'tick'], [TM('s8', 4, 0.74), 'tick'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.26), 'tick'], [TM('s9', 2, 0.42), 'tick'], [TM('s9', 3, 0.58), 'tick'], [TM('s9', 4, 0.74), 'tick'], [P('s9', 0.2), 'giggle'],
      [at('s10') + 0.3, 'twinkle'], [at('s10') + 1.2, 'heart'], [at('s10') + 2.2, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s4'), CK.MUSIC.OOPS), CK.musicBed(at('s4'), at('s6'), CK.MUSIC.CUTE), CK.musicBed(at('s6'), at('s7'), CK.MUSIC.NIGHT), CK.musicBed(at('s7'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
