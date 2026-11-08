/* พ่อแม่หัวจะปวด — ยุง มดกัด ทำไมทิ้งรอยดำ (ยุง vs มดคันไฟ, กลไก PIH, ทาอะไร, อย่าทา, หาหมอถ้า, รอยเดิม, ยากันยุงตามวัย, 5 ข้อป้องกัน)
   Build: node build.js yung-mot-kat.js review-yung-mot-kat.html --kit clay --title "ยุง มดกัด ทำไมทิ้งรอยดำ?" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 8], ['s2', 9], ['s3', 8.5], ['s4', 8], ['s5', 8.5], ['s6', 7], ['s7', 8], ['s8', 8], ['s9', 8.5], ['s10', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };

  /* stages: 0 living room, -60 yard, 60 skin mechanism, -120 night room, 120 age stairs */
  const SH = {
    cover: [FW(0.1, 0.3, 5.9, 3.9, 0.2), FW(0.1, 0.3, 5.6, 3.9, 0.2)],
    s1: [FW(-60.1, 0.4, 6.8, 2.75, 0.2), FW(-60.1, 0.4, 6.5, 2.75, 0.2)],
    s2: [FW(60, 0.3, 8.6, 4.3, 0.3), FW(60, 0.3, 8.2, 4.3, 0.3)],
    s3: [FW(0.3, 0.4, 5.8, 3.95, 0.2), FW(0.3, 0.4, 5.6, 3.95, 0.2)],
    s4: [FW(-61.0, 0.4, 6.4, 3.85, 0.2), FW(-58.6, 0.4, 6.4, 3.85, 0.2)],
    s5: [FW(-120, 0.4, 7.2, 3.95, 0.18), FW(-120, 0.4, 7.0, 3.95, 0.18)],
    s6: [FW(60, 0.4, 7.4, 3.1, 0.5), FW(60, 0.4, 7.0, 3.1, 0.5)],
    s7: [FW(-60.0, 0.4, 5.9, 3.95, 0.2), FW(-60.0, 0.4, 5.7, 3.95, 0.2)],
    s8: [FW(120, 0.3, 9.4, 3.75, 0.14), FW(120, 0.3, 9.1, 3.75, 0.14)],
    s9: [FW(-60.0, 0.5, 7.9, 3.95, 0.2), FW(-60.0, 0.5, 7.6, 3.95, 0.2)],
    s10: REEL ? [{ pos: [0, 5.8, 29], look: [0, 2.3, 0], fov: 29 }, { pos: [0, 5.6, 28], look: [0, 2.3, 0], fov: 29 }] : [{ pos: [0, 6.6, 26], look: [0, 3.0, 0], fov: 29 }, { pos: [0, 6.3, 24.5], look: [0, 3.0, 0], fov: 29 }],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: t0 }, f)); if (id === 's4') { CAM.push(Object.assign({ t: SP('s4', 0.5) - 0.3 }, f)); CAM.push(Object.assign({ t: Math.min(t1, SP('s4', 0.5) + 1.5) }, to)); } CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s5') - 0.2) / 0.6) * U.clamp((end('s5') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const t = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; };
  const nightTex = () => ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#3d4bb0'); g.addColorStop(1, '#8e86e6'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = '#fff3b0'; x.beginPath(); x.arc(170, 80, 40, 0, 7); x.fill(); x.fillStyle = '#4a55b8'; x.beginPath(); x.arc(188, 68, 36, 0, 7); x.fill(); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[40, 50, 4], [90, 30, 3], [60, 120, 3], [120, 90, 4], [220, 160, 3], [30, 190, 3]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); } });

  /* supporting cast (fruit names): น้องมะปราง 5 ขวบ, ยายลองกอง */
  const CAST = {
    maprang: () => CK.chibi(T, { bangs: 'short', backLen: 1.75, sideOpen: 1.15, ears: true, hair: '#2e2420', top: '#ff9a62', bottom: '#2fae8f', skin: CK.pal.skin[2], scale: 1.0 }),
    yai: () => CK.chibi(T, { hairStyle: 'bob', hair: '#d9d6e0', top: '#b07ad8', bottom: '#c0587a', skin: CK.pal.skin[1], longSleeve: true, brow: '#9a93a8', scale: 1.3 }),
    newborn: () => CK.chibi(T, { bangs: 'baby', hair: '#c79a70', capLen: 0.9, backLen: 1.4, round: true, eyeScale: 1.05, top: '#fff3c4', bottom: '#fff3c4', shoes: '#fff3c4', longSleeve: true, scale: 0.5 }),
  };

  VE.run({
    DUR, file: 'yung-mot-kat', title: 'ยุง มดกัด ทำไมทิ้งรอยดำ?', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ผิวลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const ALL = [];
      const prep = (g) => { g.rotation.order = 'YXZ'; scene.add(g); ALL.push(g); g.visible = false; return g; };
      /* bare legs (shorts): recolour the two leg cylinders to skin; optional dark spots */
      const bare = (g, skin, spots) => { const legs = g.children.filter((m) => m.geometry && m.geometry.type === 'CylinderGeometry' && m.position.y < 0.35); legs.forEach((m) => { m.material = M(skin); }); g.userData.legs = legs;
        if (spots) legs.forEach((m, i) => { [[0.05, 0.04], [-0.06, -0.03]].forEach(([dx, dy], j) => { const d = new T.Mesh(new T.SphereGeometry(0.04, 10, 8), M('#6b3d2c')); d.scale.set(1, 1, 0.4); d.position.set(dx * (i ? -1 : 1), dy, 0.12); m.add(d); }); });
        return g; };
      const SK = CK.pal.skin[0];

      /* ---------- props ---------- */
      const mosq = (k) => {
        const g = new T.Group(), dk = M('#3b4058'), wm = new T.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.55, side: T.DoubleSide, depthWrite: false });
        g.add(new T.Mesh(new T.SphereGeometry(0.2, 16, 12), dk));
        const ab = new T.Mesh(new T.SphereGeometry(0.16, 16, 12), dk); ab.scale.set(0.8, 0.8, 2.0); ab.position.set(0, 0.02, -0.38); g.add(ab);
        [-0.12, 0, 0.12].forEach((dz) => { const r = 0.128 * Math.sqrt(1 - Math.pow(dz / 0.32, 2)); const ring = new T.Mesh(new T.TorusGeometry(r + 0.004, 0.024, 8, 20), M('#ffffff')); ring.position.set(0, 0.02, -0.38 + dz); g.add(ring); });
        const hd = new T.Mesh(new T.SphereGeometry(0.17, 16, 12), dk); hd.position.set(0, 0.06, 0.26); g.add(hd);
        for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.08, 12, 10), M('#ffffff')); e.position.set(s * 0.085, 0.1, 0.37); g.add(e); const p = new T.Mesh(new T.SphereGeometry(0.045, 10, 8), M('#151520')); p.position.set(s * 0.085, 0.1, 0.44); g.add(p); }
        const pr = new T.Mesh(new T.CylinderGeometry(0.02, 0.012, 0.44, 8), dk); pr.position.set(0, -0.1, 0.44); pr.rotation.x = -0.8; g.add(pr);
        const wings = []; for (const s of [-1, 1]) { const pv = new T.Group(); pv.position.set(s * 0.08, 0.17, -0.05); const w = new T.Mesh(new T.CircleGeometry(0.24, 18), wm); w.rotation.x = -PI / 2; w.scale.set(1.5, 0.55, 1); w.position.x = s * 0.3; pv.add(w); g.add(pv); wings.push([pv, s]); }
        for (const s of [-1, 1]) for (const z of [-0.12, 0, 0.12]) { const l = new T.Mesh(new T.CylinderGeometry(0.013, 0.013, 0.46, 6), dk); l.position.set(s * 0.13, -0.2, z); l.rotation.z = s * 0.55; g.add(l); }
        g.scale.setScalar(k); g.userData.wings = wings; g.visible = false; scene.add(g); return g;
      };
      const flap = (g, t) => g.userData.wings.forEach(([pv, s]) => (pv.rotation.z = s * (0.25 + 0.45 * Math.sin(t * 70))));
      const ant = () => { const g = new T.Group(), m = M('#b5482a'); [[0.9, 1.6], [0.7, 0.4], [1.2, -1.3]].forEach(([r, z]) => { const s = new T.Mesh(new T.SphereGeometry(r, 10, 8), m); s.position.z = z; s.scale.y = 0.8; g.add(s); }); g.scale.setScalar(0.07); scene.add(g); return g; };
      const bottle = (col, cap, r, h) => { const g = new T.Group(); const b = new T.Mesh(new T.CylinderGeometry(r, r, h, 16), M(col)); b.position.y = h / 2; const c = new T.Mesh(new T.CylinderGeometry(r * 0.6, r * 0.6, h * 0.25, 14), M(cap)); c.position.y = h * 1.1; const lb = new T.Mesh(new T.CylinderGeometry(r * 1.02, r * 1.02, h * 0.35, 16), M('#ffffff')); lb.position.y = h * 0.45; g.add(b, c, lb); return g; };
      const tube = (band) => { const g = new T.Group(); const b = new T.Mesh(new T.CylinderGeometry(0.1, 0.13, 0.55, 14), M('#ffffff')); b.rotation.z = PI / 2; const bd = new T.Mesh(new T.CylinderGeometry(0.112, 0.125, 0.18, 14), M(band)); bd.rotation.z = PI / 2; const c = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.12, 12), M(band)); c.rotation.z = PI / 2; c.position.x = 0.33; g.add(b, bd, c); return g; };
      const lime = () => { const g = new T.Group(); const h = new T.Mesh(new T.SphereGeometry(0.22, 18, 12, 0, PI * 2, 0, PI / 2), M('#6cc63a')); h.rotation.x = PI / 2 + 0.4; const f = new T.Mesh(new T.CircleGeometry(0.21, 20), M('#e7ff9e')); f.rotation.x = 0.4; f.position.z = 0.01; g.add(h, f); return g; };
      const hold = (ch, side, obj, x, y, z) => { obj.position.set(x || 0, y || -0.05, z || 0.12); obj.visible = false; ch.userData[side].add(obj); return obj; };

      /* ===== stage 0: living room (x = 0) ===== */
      const room = CK.room(T, { wall: '#c9ecff', dots: 'rgba(255,255,255,0.8)', wain: '#ffb3c6', floor: '#e9b483', rug: '#79dcb4', props: true, winX: 3.4 }); scene.add(room);
      const pouf = new T.Mesh(new T.CylinderGeometry(0.55, 0.6, 0.45, 24), M('#ff9e6e')); pouf.position.set(-0.7, 0.22, 0.45); scene.add(pouf);
      const R = { dad: prep(CK.family(T, 'dad')), mom: prep(CK.family(T, 'mom')), mama: prep(bare(CK.family(T, 'mama'), SK, true)), nana: prep(CK.family(T, 'nana')), wawa: prep(CK.family(T, 'wawa')) };
      R.ice = hold(R.mom, 'hand-1', new T.Mesh(new T.BoxGeometry(0.55, 0.36, 0.18), M('#8fdcff', { emissive: '#8fdcff', emissiveIntensity: 0.15 })));
      R.cal = hold(R.mom, 'hand-1', bottle('#ff9ec0', '#ffffff', 0.13, 0.42), 0, -0.2);
      R.cream = hold(R.mom, 'hand-1', tube('#ffc94d'));
      R.soap = []; for (let i = 0; i < 8; i++) { const b = new T.Mesh(new T.SphereGeometry(0.09 + (i % 3) * 0.03, 12, 10), new T.MeshBasicMaterial({ color: '#dff6ff', transparent: true, opacity: 0.7 })); b.visible = false; scene.add(b); R.soap.push(b); }
      R.plaster = new T.Mesh(new T.BoxGeometry(0.2, 0.08, 0.04), M('#ffd0a8')); R.plaster.position.set(0.02, 0.0, 0.135); R.plaster.visible = false; R.mama.userData.legs[1].add(R.plaster);
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 3.6, Math.cos(i * 3.3) * 0.6 + 0.6, (i * 0.37) % 1]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage -60: yard ===== */
      const YX = -60;
      const grass = new T.Mesh(new T.BoxGeometry(22, 0.3, 24), M('#7cc65f')); grass.position.set(YX, -0.15, 6); scene.add(grass);
      const skyT = ctex(256, 256, (x) => { const g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#7cc4ff'); g.addColorStop(1, '#cdeeff'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); x.fillStyle = 'rgba(255,255,255,.9)'; for (const [a, b] of [[50, 70], [180, 50], [120, 120]]) { x.beginPath(); x.arc(a, b, 18, 0, 7); x.arc(a + 20, b - 6, 22, 0, 7); x.arc(a + 42, b, 16, 0, 7); x.fill(); } });
      const sky = new T.Mesh(new T.BoxGeometry(22, 10, 0.3), M('#ffffff', { map: skyT })); sky.position.set(YX, 4.6, -4.8); scene.add(sky);
      for (let i = 0; i < 26; i++) { const pk = new T.Mesh(new T.BoxGeometry(0.34, 1.5, 0.12), M('#ffc98a')); pk.position.set(YX - 10 + i * 0.8, 0.75, -3.8); scene.add(pk); }
      for (const y of [0.5, 1.1]) { const rl = new T.Mesh(new T.BoxGeometry(21, 0.14, 0.1), M('#f0a868')); rl.position.set(YX, y, -3.7); scene.add(rl); }
      [[-4.6, -3.0, 0.8, '#4fb36a'], [-3.6, -3.2, 0.6, '#5cc078'], [4.4, -3.0, 0.85, '#4fb36a'], [3.4, -3.3, 0.55, '#5cc078']].forEach(([x, z, r, c]) => { const b = new T.Mesh(new T.SphereGeometry(r, 16, 12), M(c)); b.position.set(YX + x, r * 0.8, z); scene.add(b); });
      ['#ff6f91', '#ffd23f', '#ffffff', '#b9a4ff'].forEach((c, i) => { const f = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M(c)); f.position.set(YX - 4.3 + i * 0.3 + (i > 1 ? 7.8 : 0), 1.1 + (i % 2) * 0.25, -2.4); scene.add(f); });
      const bucket = new T.Group(); const bk = new T.Mesh(new T.CylinderGeometry(0.36, 0.28, 0.5, 18), M('#5ab8ff')); bk.position.y = 0.25; const wat = new T.Mesh(new T.CircleGeometry(0.33, 18), M('#bfeaff', { emissive: '#7fd7ff', emissiveIntensity: 0.2 })); wat.rotation.x = -PI / 2; wat.position.y = 0.46; bucket.add(bk, wat); bucket.position.set(YX - 3.4, 0, 1.0); scene.add(bucket);
      const splash = []; for (let i = 0; i < 10; i++) { const d = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), M('#7fd7ff')); d.visible = false; scene.add(d); splash.push(d); }
      const mound = new T.Mesh(new T.SphereGeometry(0.75, 20, 12, 0, PI * 2, 0, PI / 2), M('#c98f55')); mound.scale.y = 0.6; mound.position.set(YX + 3.0, 0, -1.3); scene.add(mound);
      for (let i = 0; i < 14; i++) { const p = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), M('#b07a45')); const a = i * 2.4, r = 0.3 + (i % 4) * 0.12; p.position.set(YX + 3.0 + Math.cos(a) * r, 0.3 + (i % 3) * 0.06, -1.3 + Math.sin(a) * r * 0.8); scene.add(p); }
      const ants = []; for (let i = 0; i < 9; i++) ants.push(ant());
      const Y = {
        mama: prep(bare(CK.family(T, 'mama'), SK)), hat: prep(CK.family(T, 'mama', { hat: '#ffd23f' })), maprang: prep(bare(CAST.maprang(), CK.pal.skin[2])),
        yai: prep(CAST.yai()), mom: prep(CK.family(T, 'mom')), dad: prep(CK.family(T, 'dad')), nana: prep(CK.family(T, 'nana')),
      };
      const bumpY = new T.Mesh(new T.SphereGeometry(0.05, 10, 8), M('#ff4d6d')); bumpY.position.set(0.02, 0.04, 0.12); Y.mama.userData.legs[0].add(bumpY);
      const pusY = new T.Mesh(new T.SphereGeometry(0.045, 10, 8), M('#fffbe6')); pusY.position.set(-0.02, 0.03, 0.12); Y.maprang.userData.legs[1].add(pusY);
      Y.lime = hold(Y.yai, 'hand1', lime()); Y.lime.scale.setScalar(1.5);
      Y.paste = hold(Y.yai, 'hand-1', tube('#4fb3ff')); Y.paste.scale.setScalar(1.2);
      Y.lotion = hold(Y.mom, 'hand-1', bottle('#ffffff', '#ff8fab', 0.12, 0.42), 0, -0.2);
      const stool = new T.Mesh(new T.CylinderGeometry(0.42, 0.45, 0.38, 20), M('#ff9e6e')); stool.position.set(YX - 0.2, 0.19, 0.55); scene.add(stool);
      const yMos = mosq(0.85);

      /* ===== stage 60: skin mechanism ===== */
      const SX = 60;
      const plat = new T.Mesh(new T.BoxGeometry(18, 0.3, 12), M('#ff9ebd')); plat.position.set(SX, -0.15, 0); scene.add(plat);
      const bw = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dots('#ffd1e3', '#ffffff', [7, 4]) })); bw.position.set(SX, 4.6, -4.5); scene.add(bw);
      const layer = (y0, h, col) => { const m = new T.Mesh(new T.BoxGeometry(7, h, 3), M(col)); m.position.set(SX, y0 + h / 2, 0); scene.add(m); return m; };
      layer(0, 0.6, '#ffe08a'); layer(0.6, 1.4, '#ffb0a8'); const epi = layer(2.0, 0.4, '#f6c9a6');
      const melano = []; [-1.6, -0.55, 0.55, 1.6].forEach((dx) => { const g = new T.Group(); const b = new T.Mesh(new T.SphereGeometry(0.22, 16, 12), M('#9a6ad8')); b.scale.set(1.2, 0.8, 0.5); g.add(b); for (const s of [-1, 1]) { const a = new T.Mesh(new T.CylinderGeometry(0.05, 0.03, 0.34, 8), M('#9a6ad8')); a.position.set(s * 0.22, 0.14, 0); a.rotation.z = -s * 0.7; g.add(a); const e = new T.Mesh(new T.SphereGeometry(0.035, 8, 6), M('#2b2233')); e.position.set(s * 0.07, 0.03, 0.11); g.add(e); } g.position.set(SX + dx, 2.02, 1.52); scene.add(g); melano.push(g); });
      const gran = []; for (let i = 0; i < 26; i++) { const m = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), M('#6b3d2c')); m.userData.k = i; m.visible = false; scene.add(m); gran.push(m); }
      const patch = new T.Mesh(new T.CircleGeometry(1, 40), new T.MeshBasicMaterial({ color: '#6b3d2c', transparent: true, opacity: 0, depthWrite: false })); patch.rotation.x = -PI / 2; patch.position.set(SX, 2.406, 0.4); scene.add(patch);
      const bump = new T.Mesh(new T.SphereGeometry(0.55, 24, 14, 0, PI * 2, 0, PI / 2), M('#f6c9a6')); bump.position.set(SX, 2.4, 0.4); bump.scale.set(1, 0.01, 1); scene.add(bump);
      const glowS = new T.Mesh(new T.SphereGeometry(0.8, 18, 14), new T.MeshBasicMaterial({ color: '#ff3b5c', transparent: true, opacity: 0, depthWrite: false })); glowS.position.set(SX, 1.7, 1.2); scene.add(glowS);
      const saliva = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), M('#7fd7ff', { emissive: '#7fd7ff', emissiveIntensity: 0.4 })); d.visible = false; scene.add(d); saliva.push(d); }
      const sMos = mosq(1.3);
      const finger = new T.Group(); { const f = new T.Mesh(new T.CylinderGeometry(0.34, 0.36, 3.2, 20), M(SK)); f.position.y = 1.6; const tip = new T.Mesh(new T.SphereGeometry(0.34, 20, 14), M(SK)); const nail = new T.Mesh(new T.SphereGeometry(0.26, 16, 10), M('#ffe1e6')); nail.scale.set(1, 1.3, 0.35); nail.position.set(0, 0.2, 0.26); finger.add(f, tip, nail); finger.rotation.set(0.35, 0, -0.75); finger.visible = false; scene.add(finger); }

      /* ===== stage -120: night room ===== */
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e9b483', rug: '#6aaaf0', props: false, winX: 2.6 }); room2.position.x = -120; scene.add(room2);
      room2.userData.win.material.map = nightTex();
      const bed = new T.Group(); const bf = new T.Mesh(new T.BoxGeometry(2.8, 0.5, 2.2), M('#e9b27c')); bf.position.y = 0.25; const bm = new T.Mesh(new T.BoxGeometry(2.7, 0.28, 2.1), M('#ffffff', { map: dots('#5a8ef0', '#cfe0ff') })); bm.position.y = 0.62; const pil = new T.Mesh(new T.BoxGeometry(1.0, 0.25, 0.5), M('#ffffff')); pil.position.set(0, 0.86, -0.7); bed.add(bf, bm, pil); bed.position.set(-120, 0, -0.9); scene.add(bed);
      const N = { mama: prep(bare(CK.family(T, 'mama'), SK)), mom: prep(CK.family(T, 'mom')), dad: prep(CK.family(T, 'dad')) };

      /* ===== stage 120: age stairs ===== */
      const STX = [116.9, 120.0, 123.1], STH = [0.3, 0.75, 1.2], STC = ['#ffd23f', '#5ab8ff', '#79dcb4'];
      const plat3 = new T.Mesh(new T.BoxGeometry(18, 0.3, 12), M('#9a7ef0')); plat3.position.set(120, -0.15, 0); scene.add(plat3);
      const bw3 = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dots('#e8deff', '#ffffff', [7, 4]) })); bw3.position.set(120, 4.6, -4.5); scene.add(bw3);
      STX.forEach((x, i) => { const b = new T.Mesh(new T.BoxGeometry(2.9, STH[i], 2.6), M(STC[i])); b.position.set(x, STH[i] / 2, 0.3); scene.add(b); const tp = new T.Mesh(new T.BoxGeometry(2.96, 0.08, 2.66), M('#ffffff')); tp.position.set(x, STH[i] + 0.02, 0.3); scene.add(tp); });
      const bas = new T.Group(); const bb = new T.Mesh(new T.CylinderGeometry(0.75, 0.6, 0.45, 24, 1, true), M('#ffb3c6', { side: T.DoubleSide })); bb.position.y = 0.32; const bbot = new T.Mesh(new T.CylinderGeometry(0.6, 0.6, 0.06, 24), M('#ffb3c6')); bbot.position.y = 0.12; bas.add(bb, bbot);
      const net = new T.Mesh(new T.SphereGeometry(0.95, 24, 14, 0, PI * 2, 0, PI / 2), new T.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.35, depthWrite: false, side: T.DoubleSide })); net.position.y = 0.5; net.scale.y = 1.25; bas.add(net);
      bas.position.set(STX[0], STH[0] + 0.04, 0.4); scene.add(bas);
      const S = { baby: prep(CAST.newborn()), wawa: prep(CK.family(T, 'wawa')), nana: prep(CK.family(T, 'nana')), mama: prep(CK.family(T, 'mama')) };
      const spray = (col) => { const g = bottle(col, '#ffffff', 0.12, 0.4); g.scale.setScalar(1.3); scene.add(g); return g; };
      const sp2 = spray('#ff8fab'), sp3 = spray('#79dcb4'); sp2.position.set(121.6, STH[1] + 0.04, 1.1); sp3.position.set(124.2, STH[2] + 0.04, 1.1);

      return { key, hemi, room, room2, ALL, R, Y, N, S, hearts, bucket, splash, ants, yMos, sMos, melano, gran, patch, bump, glowS, saliva, finger, flap, pouf, stool, mound };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t); s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc);
      s.ALL.forEach((g) => (g.visible = false));
      const pose = (g, x, z, o) => { o = o || {}; g.visible = true; g.position.set(x, o.y || 0, z); g.rotation.set(o.lean || 0, o.ry || 0, o.tilt || 0); g.userData.setExpr(o.ex || 'happy'); g.userData.tick(t, { wave: o.wave, breath: o.breath }); };
      const bob = (sp, a) => Math.abs(Math.sin(t * sp)) * a;
      const reach = (g, side, z, x) => { g.userData[side].rotation.z = z; g.userData[side].rotation.x = x; };
      const scratch = (g) => { reach(g, 'arm1', 0.15 + 0.12 * Math.sin(t * 16), -0.55); };
      const R = s.R, Y = s.Y;
      [R.ice, R.cal, R.cream, R.plaster, Y.lime, Y.paste, Y.lotion].forEach((o) => (o.visible = false)); R.soap.forEach((b) => (b.visible = false));
      s.pouf.visible = bt === 's3'; s.stool.visible = bt === 's4';

      /* ---------- living room ---------- */
      if (bt === 'cover') {
        pose(R.mama, 0.55, 0.6, { ex: 'worried', ry: -0.3, y: bob(6, 0.03) }); scratch(R.mama);
        pose(R.mom, -1.55, -0.3, { ex: 'worried', ry: 0.5 }); reach(R.mom, 'arm1', 0.5, -0.2); reach(R.mom, 'arm-1', -1.9, 1.0);
      } else if (bt === 's3') {
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s3', i, 0.1 + i * 0.17)) cur = i;
        pose(R.mama, -0.7, 0.45, { y: 0.44, ex: cur >= 3 ? 'giggle' : cur >= 0 ? 'happy' : 'worried', ry: 0.4 });
        if (cur < 0) scratch(R.mama);
        pose(R.mom, 1.35, 0.1, { ex: 'happy', ry: -0.6 }); reach(R.mom, 'arm-1', -1.0 + 0.06 * Math.sin(t * 5), -0.9);
        R.ice.visible = cur === 1; R.cal.visible = cur === 2; R.cream.visible = cur === 3; R.plaster.visible = cur >= 4;
        if (cur === 4) reach(R.mom, 'arm-1', -0.45, -0.2);
        if (cur === 0) R.soap.forEach((b, i) => { b.visible = true; const a = (t * 0.6 + i * 0.13) % 1; b.position.set(-0.7 + Math.sin(i * 2.1) * 0.5, 0.6 + a * 1.6, 1.0 + Math.cos(i * 1.7) * 0.3); b.material.opacity = 0.75 * (1 - a); });
      } else if (bt === 's10') {
        const p = ph('s10', t);
        pose(R.mom, -1.9, -0.7, { ex: 'happy' }); pose(R.dad, 1.95, -0.7, { ex: 'happy', wave: p > 0.3 && p < 0.7 });
        pose(R.nana, -1.6, 1.4, { ex: 'giggle', y: bob(5, 0.12) }); pose(R.mama, 0.0, 1.4, { ex: 'giggle', y: bob(5.5, 0.14), wave: p > 0.2 }); pose(R.wawa, 1.45, 1.4, { ex: 'happy', y: bob(4, 0.05) });
        s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s10') - 0.4 - u[2] * 1.4) / 3.2; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.2, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });
      }
      if (bt !== 's10') s.hearts.forEach((h) => (h.visible = false));

      /* ---------- yard ---------- */
      const YX = -60, MX = YX + 3.0, MZ = -1.3;
      s.yMos.visible = false; s.Y.mama.userData.legs[0].children.forEach((c) => (c.visible = false)); s.Y.maprang.userData.legs[1].children.forEach((c) => (c.visible = false));
      let antOut = 0;
      if (bt === 's1') {
        const p = ph('s1', t), q = SP('s1', 0.5), land = U.clamp((p - 0.1) / 0.12), leave = U.clamp((p - 0.3) / 0.1);
        const bitten = p > 0.24, a2 = U.clamp((t - q) / 1.2);
        pose(Y.mama, YX - 1.6, 0.6, { ex: bitten ? 'worried' : 'happy', ry: 0.3, y: bitten ? 0 : bob(5, 0.06) }); if (bitten && t < q) scratch(Y.mama);
        s.Y.mama.userData.legs[0].children.forEach((c) => (c.visible = bitten));
        pose(Y.maprang, YX + 1.4, 0.6, { ex: a2 > 0.6 ? 'cry' : 'happy', ry: -0.3, y: t < q ? bob(5, 0.08) : 0 });
        s.Y.maprang.userData.legs[1].children.forEach((c) => (c.visible = a2 > 0.85));
        const m = s.yMos; m.visible = leave < 1; s.flap(m, t);
        const lp = new T.Vector3(YX - 1.55, 0.25, 1.05), st = new T.Vector3(YX - 4.5, 2.6, 1.5), en = new T.Vector3(YX + 1.0, 3.2, 1.0);
        if (leave <= 0) m.position.lerpVectors(st, lp, U.easeIO(land)); else m.position.lerpVectors(lp, en, U.easeIO(leave));
        m.position.y += (land < 1 || leave > 0) ? 0.08 * Math.sin(t * 9) : 0; m.rotation.set(land < 1 ? 0 : 0.5, land < 1 ? 1.2 : 0.4, 0);
        antOut = U.clamp((t - q + 0.4) / 1.2);
      } else if (bt === 's4') {
        const q = SP('s4', 0.5), b2 = t >= q;
        if (t < q - 0.1) { pose(Y.yai, YX - 2.2, 0.2, { ex: 'giggle', ry: 0.45 }); reach(Y.yai, 'arm1', 1.0 + 0.08 * Math.sin(t * 4), -1.0); reach(Y.yai, 'arm-1', -0.5, -0.6); }
        Y.lime.visible = !b2; Y.paste.visible = !b2;
        pose(Y.mama, YX - 0.2, 0.6, { y: 0.38, ex: b2 ? 'happy' : 'worried', ry: b2 ? 0.2 : -0.35 });
        const pick = U.clamp((t - q) / 0.6), stop = U.clamp((t - q - 1.0) / 0.5);
        pose(Y.maprang, YX + 1.6, 0.6, { ex: stop > 0.5 ? 'worried' : 'happy', ry: -0.2, lean: 0.25 * pick * (1 - stop) });
        Y.maprang.userData.legs[1].children.forEach((c) => (c.visible = true));
        if (b2) reach(Y.maprang, 'arm1', 0.2 * (1 - stop) + 0.4 * stop, -0.6 * pick * (1 - stop));
        pose(Y.mom, YX + 3.6, 0.1, { ex: stop > 0.2 ? 'worried' : 'happy', ry: -0.5 }); if (b2) reach(Y.mom, 'arm-1', -1.2 * stop, -0.9 * stop);
      } else if (bt === 's7') {
        pose(Y.hat, YX - 0.95, 0.6, { ex: 'giggle', ry: 0.35, y: bob(4, 0.05) });
        pose(Y.mom, YX + 1.2, 0.1, { ex: 'happy', ry: -0.55 }); reach(Y.mom, 'arm-1', -1.0 + 0.06 * Math.sin(t * 4), -0.9); Y.lotion.visible = true;
      } else if (bt === 's9') {
        const tip = U.clamp((t - TM('s9', 0, 0.1) - 0.2) / 0.6);
        pose(Y.dad, YX - 2.9, 0.0, { ex: 'happy', ry: 0.35, lean: 0.25 * tip }); reach(Y.dad, 'arm1', 0.3, -0.9 * tip);
        pose(Y.mama, YX - 0.6, 1.0, { ex: 'happy', y: bob(5, 0.08), ry: 0.1 }); pose(Y.nana, YX + 1.0, 1.2, { ex: 'giggle', y: bob(5.5, 0.1), ry: -0.1 });
        pose(Y.mom, YX + 3.0, 0.0, { ex: 'happy', ry: -0.4 });
        s.bucket.rotation.z = -1.6 * U.easeIO(tip); s.bucket.position.set(YX - 1.95, 0.3 * Math.sin(PI * tip), 1.55);
        s.splash.forEach((d, i) => { const a = U.clamp((t - TM('s9', 0, 0.1) - 0.6 - i * 0.02) / 0.6); d.visible = a > 0 && a < 1; if (!d.visible) return; d.position.set(YX - 1.95 + 0.4 + a * (0.4 + (i % 4) * 0.25), 0.4 + Math.sin(PI * a) * 0.6, 1.55 + ((i % 3) - 1) * 0.3); });
      }
      if (bt !== 's9') { s.bucket.rotation.z = 0; s.bucket.position.set(YX - 3.4, 0, 1.0); s.splash.forEach((d) => (d.visible = false)); }
      s.ants.forEach((a, i) => { const ang = t * 0.9 + i * 0.7, r = 0.95 + (i % 3) * 0.15; let x = MX + Math.cos(ang) * r, z = MZ + Math.sin(ang) * r * 0.7;
        if (i < 4 && antOut > 0) { const k = U.clamp(antOut * 1.3 - i * 0.12); x = U.lerp(x, YX + 1.4 + (i - 1.5) * 0.12, k); z = U.lerp(z, 0.95, k); }
        a.position.set(x, 0.05, z); a.rotation.y = -ang; });

      /* ---------- skin mechanism ---------- */
      { const in2 = inB('s2', t), in6 = inB('s6', t), p = in2 ? ph('s2', t) : 0, qa = TM('s2', 0, 0.36), qb = TM('s2', 1, 0.66);
        const SX = 60, m = s.sMos; m.visible = in2 && t < qa + 0.4; s.flap(m, t);
        const land = U.clamp((p - 0.02) / 0.1), lift = U.clamp((t - qa + 0.6) / 0.9);
        const st = new T.Vector3(SX - 4.5, 4.4, 0.8), lp = new T.Vector3(SX + 0.05, 2.95, 0.15), en = new T.Vector3(SX + 4.5, 4.6, 0.6);
        if (lift <= 0) m.position.lerpVectors(st, lp, U.easeIO(land)); else m.position.lerpVectors(lp, en, U.easeIO(lift));
        if (land < 1 || lift > 0) m.position.y += 0.08 * Math.sin(t * 9); m.rotation.set(land < 1 ? 0.1 : 0.55, land < 1 ? 1.1 : -0.25, 0);
        s.saliva.forEach((d, i) => { const a = U.clamp((p - 0.13 - i * 0.025) / 0.15); d.visible = in2 && a > 0 && t < qa + 1.2; if (!d.visible) return; d.position.set(SX + 0.05 + (i - 2.5) * 0.12 * a, 2.4 - a * 0.9, 0.4 + 0.6 * a); d.scale.setScalar(1 + 0.2 * Math.sin(t * 8 + i)); });
        const inflam = in2 ? U.clamp((p - 0.18) / 0.15) : 0, scr = in2 ? U.clamp((t - qb) / 0.4) : 0;
        s.bump.visible = in2; s.bump.scale.set(1 + 0.2 * scr, 0.01 + 0.55 * inflam + 0.12 * scr, 1 + 0.2 * scr);
        s.bump.material.color.set('#f6c9a6').lerp(new T.Color('#ff6f7f'), 0.6 * inflam + 0.3 * scr);
        s.glowS.material.opacity = in2 ? (0.18 * inflam + 0.15 * scr) * (0.8 + 0.2 * Math.sin(t * 6)) : 0;
        const mel = in2 ? U.clamp((t - qa) / 0.5) : 0;
        s.melano.forEach((g, i) => { g.scale.setScalar(1 + (mel + scr) * 0.12 * Math.abs(Math.sin(t * 7 + i))); g.rotation.z = 0.12 * Math.sin(t * 3 + i) * (mel > 0 ? 1 : 0.2); });
        const rate = mel * (1 + 1.5 * scr);
        s.gran.forEach((g, i) => { const src = s.melano[i % 4].position, per = 1.4, a = ((t - qa) * (0.8 + 0.6 * scr) + i * per / 26) % per / per;
          const on = in2 && t > qa + (i / 26) * (scr > 0 ? 0.3 : 1.2) / Math.max(0.3, rate) * 0.5 && (i < 14 || scr > 0); g.visible = on; if (!on) return;
          const tgt = new T.Vector3(SX + Math.sin(i * 2.3) * 0.7 * (1 + 0.3 * scr), 2.43, 0.4 + Math.cos(i * 1.7) * 0.5);
          if (a < 0.5) g.position.set(src.x, src.y + a * 0.8, 1.5); else g.position.lerpVectors(new T.Vector3(src.x, 2.43, 1.5), tgt, (a - 0.5) * 2); });
        let po = 0, pr = 0.6;
        if (in2) { po = 0.55 * U.clamp((t - qa - 0.6) / 1.6) + 0.35 * scr; pr = 0.7 + 0.35 * scr; }
        if (in6) { const p6 = ph('s6', t), f = U.clamp((p6 - 0.12) / 0.75); po = U.lerp(0.9, 0.15, U.easeIO(f)); pr = U.lerp(1.05, 0.9, f); s.bump.visible = false; }
        s.patch.material.opacity = po; s.patch.scale.setScalar(pr);
        const fp = scr > 0 && in2; s.finger.visible = fp; if (fp) { const e = U.easeOut(scr); s.finger.position.set(SX + 0.35 + 0.42 * Math.sin(t * 13) + (1 - e) * 2.5, 2.75 + (1 - e) * 2.2, 0.55); }
      }

      /* ---------- night room ---------- */
      if (bt === 's5') {
        const p = ph('s5', t);
        pose(s.N.mama, -120.0, -0.55, { y: 0.74, ex: 'sick', breath: 1.1 });
        pose(s.N.mom, -122.0, 0.35, { ex: 'worried', ry: 0.5 }); reach(s.N.mom, 'arm1', 0.9, -0.9);
        if (p > 0.08) { pose(s.N.dad, -118.0, 0.35, { ex: 'worried', ry: -0.5 }); reach(s.N.dad, 'arm-1', -0.5, -0.3); }
      }

      /* ---------- age stairs ---------- */
      if (bt === 's8') {
        const STX = [116.9, 120.0, 123.1], STH = [0.3, 0.75, 1.2];
        pose(s.S.baby, STX[0], 0.4, { y: STH[0] + 0.12, ex: 'sleepy', breath: 0.3 });
        pose(s.S.wawa, STX[1] - 0.7, 0.5, { y: STH[1] + 0.04 + bob(4, 0.04), ex: 'happy', ry: 0.15 });
        pose(s.S.nana, STX[1] + 0.68, 0.5, { y: STH[1] + 0.04 + bob(4.6, 0.06), ex: 'giggle', ry: -0.1 });
        pose(s.S.mama, STX[2] - 0.2, 0.4, { y: STH[2] + 0.04 + bob(5, 0.07), ex: 'giggle', ry: -0.15, wave: ph('s8', t) > 0.5 && ph('s8', t) < 0.8 });
      }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { R: s.R, Y: s.Y, N: s.N, S: s.S }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's5') return ['#3a3570', '#6a4a80']; return ['#ffe8f0', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag2 = (l1, l2, x, y, a, bg) => { g.save(); g.globalAlpha = a; g.font = '800 36px Kanit,sans-serif'; const w1 = g.measureText(l1).width; g.font = '600 27px Kanit,sans-serif'; const w = Math.max(w1, g.measureText(l2).width) + 40; rr(x - w / 2, y - 40, w, 96, 26, bg || '#ffffff', '#3a2f3f'); plain(l1, x, y - 8, 36, '#3a2f3f', 800, 'center'); plain(l2, x, y + 32, 27, '#4a3a50', 600, 'center'); g.restore(); };
      const label = (str, x, y, a) => { g.save(); g.globalAlpha = a; g.font = '700 32px Kanit,sans-serif'; const w = g.measureText(str).width + 36; rr(x - w / 2, y - 28, w, 56, 28, 'rgba(255,255,255,.92)', '#3a2f3f'); plain(str, x, y + 2, 32, '#3a2f3f', 700, 'center'); g.restore(); };
      const cross = (x, y, a, k) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(k, k); g.lineCap = 'round'; g.lineWidth = 22; g.strokeStyle = '#ffffff'; g.beginPath(); g.moveTo(-42, -42); g.lineTo(42, 42); g.moveTo(42, -42); g.lineTo(-42, 42); g.stroke(); g.lineWidth = 13; g.strokeStyle = '#ff3b5c'; g.stroke(); g.restore(); };
      /* magnifier bubble: leg close-up */
      const mag = (cx, cy, r, kind, a, anchor, shorts) => {
        if (a <= 0) return; g.save(); g.globalAlpha = a;
        if (anchor) { g.strokeStyle = 'rgba(58,47,63,.75)'; g.lineWidth = 6; g.beginPath(); g.moveTo(anchor[0], anchor[1]); const d = Math.hypot(cx - anchor[0], cy - anchor[1]); g.lineTo(cx + (anchor[0] - cx) * r / d, cy + (anchor[1] - cy) * r / d); g.stroke(); g.fillStyle = '#3a2f3f'; g.beginPath(); g.arc(anchor[0], anchor[1], 9, 0, 7); g.fill(); }
        g.save(); g.beginPath(); g.arc(cx, cy, r, 0, 7); g.clip(); g.fillStyle = '#ffe8f0'; g.fillRect(cx - r, cy - r, 2 * r, 2 * r);
        const lw = r * 1.15; rr(cx - lw / 2, cy - r - 20, lw, 2 * r + 40, 50, '#f3c6a3'); g.fillStyle = shorts || '#3d86e8'; g.fillRect(cx - lw / 2 - 10, cy - r - 10, lw + 20, r * 0.42);
        const spot = (x, y, rad, col, al) => { const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, col); gr.addColorStop(0.7, col); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.globalAlpha = a * al; g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill(); g.globalAlpha = a; };
        const k = r / 150;
        if (kind === 'spots') { [[-32, 10, 24, 0.85], [30, 48, 20, 0.7], [-12, 86, 16, 0.6], [36, -10, 14, 0.5], [-44, 62, 12, 0.55]].forEach(([x, y, rad, al]) => spot(cx + x * k, cy + y * k, rad * k, '#7a4632', al)); spot(cx + 10 * k, cy + 20 * k, 22 * k, '#ff6f7f', 0.85); g.fillStyle = '#ff3b5c'; g.beginPath(); g.arc(cx + 10 * k, cy + 20 * k, 4 * k, 0, 7); g.fill(); }
        if (kind === 'bump') { spot(cx + 4 * k, cy + 30 * k, 40 * k, '#ff8a8a', 0.9); spot(cx + 4 * k, cy + 30 * k, 20 * k, '#ff5f6d', 0.9); g.fillStyle = '#c0283c'; g.beginPath(); g.arc(cx + 4 * k, cy + 30 * k, 4 * k, 0, 7); g.fill(); }
        if (kind === 'pus') { spot(cx, cy + 30 * k, 38 * k, '#ff7a7a', 0.9); g.fillStyle = '#fffbe6'; g.beginPath(); g.arc(cx, cy + 30 * k, 17 * k, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(cx - 5 * k, cy + 24 * k, 6 * k, 0, 7); g.fill(); [[-46, -4], [40, 70]].forEach(([x, y]) => { spot(cx + x * k, cy + y * k, 22 * k, '#ff8a8a', 0.8); g.fillStyle = '#fffbe6'; g.beginPath(); g.arc(cx + x * k, cy + y * k, 10 * k, 0, 7); g.fill(); }); }
        g.restore();
        g.lineWidth = 10; g.strokeStyle = '#ffffff'; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.lineWidth = 4; g.strokeStyle = '#3a2f3f'; g.beginPath(); g.arc(cx, cy, r + 6, 0, 7); g.stroke();
        g.restore();
      };
      const legPt = (ch, i) => wp(ch.userData.legs[i], 0);
      if (b === 'cover') { const lp = legPt(S.R.mama, 0); mag(REEL ? 830 : 870, REEL ? 1130 : 1330, REEL ? 120 : 145, 'spots', 1, [lp[0], lp[1]], '#3d86e8'); }
      if (b === 's1') {
        const p = ph('s1', t), q = SP('s1', 0.5);
        if (t < q) { const a = U.clamp((p - 0.28) / 0.06) * U.clamp((q - t) / 0.25); mag(540, 1060, 120, 'bump', a, legPt(S.Y.mama, 0), '#3d86e8'); }
        else { const a = U.clamp((t - q - 1.0) / 0.3) * U.clamp((end('s1') - t) / 0.2); mag(540, 1060, 120, 'pus', a, legPt(S.Y.maprang, 1), '#2fae8f'); }
      }
      /* s2 labels */
      if (b === 's2') {
        const p = ph('s2', t), qa = TM('s2', 0, 0.36);
        const [sx, sy] = proj(new T.Vector3(57.2, 1.4, 1.5)); const a1 = U.clamp((p - 0.15) / 0.06) * U.clamp((qa - t) / 0.3); if (a1 > 0) label('น้ำลายยุง', sx + 10, sy, a1);
        const [mx, my] = proj(new T.Vector3(58.4, 2.02, 1.52)); const a2 = U.clamp((t - qa - 0.3) / 0.3); if (a2 > 0) label('เซลล์สร้างเม็ดสี', mx + 40, my + 70, a2);
      }
      /* s4 crosses on lime / toothpaste */
      if (b === 's4') { const q = SP('s4', 0.5); if (t < q) { const a = U.clamp((t - at('s4') - 1.2) / 0.3) * U.clamp((q - t) / 0.2), k = 1.3 - 0.3 * U.easeBack(U.clamp((t - at('s4') - 1.2) / 0.4)); const [x1, y1] = wp(S.Y.lime, 0), [x2, y2] = wp(S.Y.paste, 0); cross(x1, y1, a, k * 0.8); cross(x2, y2, a, k * 0.8); }
        else { const a = U.clamp((t - q - 0.2) / 0.3) * U.clamp((end('s4') - t) / 0.2); mag(540, 650, 95, 'pus', a, null, '#2fae8f'); const st = U.clamp((t - q - 1.0) / 0.3); if (st > 0) cross(540, 650, st, 1.3 - 0.3 * U.easeBack(U.clamp((t - q - 1.0) / 0.4))); } }
      /* lists */
      const list = (id, L, y0, opt) => {
        opt = opt || {}; const p = ph(id, t), a0 = U.clamp((p - 0.04) / 0.06), n = L.length, rh = opt.rh || 84, H = 50 + n * rh + (opt.foot ? 40 : 0);
        g.save(); g.globalAlpha = a0; rr(60 + LD, y0, 960 - 2 * LD, H, 30, opt.dark ? 'rgba(25,18,50,.7)' : 'rgba(255,255,255,.9)', opt.dark ? 'rgba(255,120,150,.9)' : '#ff8fab'); g.restore();
        let cur = -1; for (let i = 0; i < n; i++) if (t >= TM(id, i, 0.1 + i * (opt.step || 0.16))) cur = i;
        L.forEach((it, i) => { const [m1, m2, warn] = Array.isArray(it) ? it : [it]; const a = U.clamp((t - TM(id, i, 0.1 + i * (opt.step || 0.16))) / 0.3); if (a <= 0) return; const y = y0 + 25 + rh / 2 + i * rh; g.save(); g.globalAlpha = a0 * a;
          if (i === cur && !opt.dark) rr(84 + LD, y - rh / 2 + 6, 912 - 2 * LD, rh - 12, 30, '#ffd6e4');
          g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = opt.dark || warn ? '#ff5f6d' : i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center');
          const c1 = opt.dark ? '#ffffff' : warn ? '#d6284a' : '#3a2f3f', c2 = opt.dark ? '#ffd6e4' : '#6a4a60';
          if (m2) { plain(m1, 176 + LD, y - 16, Math.round(36 * LF), c1, i === cur || opt.dark ? 800 : 700); plain(m2, 176 + LD, y + 22, Math.round(28 * LF), c2, 500); } else plain(m1, 176 + LD, y + 2, Math.round(37 * LF), c1, i === cur ? 800 : 600);
          g.restore(); });
        if (opt.foot) { g.save(); g.globalAlpha = a0; plain(opt.foot, 540, y0 + H - 34, 25, opt.dark ? 'rgba(255,255,255,.88)' : '#7a5a6a', 500, 'center'); g.restore(); }
      };
      if (b === 's3') list('s3', [['ล้างน้ำสบู่ ซับให้แห้ง'], ['ประคบเย็น 10 นาที', 'ลดบวม ลดคัน'], ['ทาคาลาไมน์ หรือยาหม่อง/แซมบัค', 'ยาหม่อง 2 ขวบขึ้นไป ทาบางๆ อย่าทาบนแผลถลอก'], ['คันมาก: ครีมไฮโดรคอร์ติโซน 1%', 'เด็กเล็ก ถามเภสัชกร/หมอก่อนใช้'], ['ตัดเล็บสั้น ปิดพลาสเตอร์', 'กันลูกเกาตอนหลับ']], 330, { rh: 82, step: 0.17 });
      if (b === 's5') list('s5', [['หายใจลำบาก ปาก ตา หน้าบวม', 'ลมพิษทั้งตัว เวียนหัว → โทร 1669'], ['ตุ่มบวมแดงลาม ร้อน เจ็บขึ้น', 'มีหนองเหลือง หรือมีไข้ = อาจติดเชื้อ'], ['โดนมดกัดหลายสิบจุด', 'โดยเฉพาะเด็กเล็ก'], ['ไข้สูงลอย หลังโดนยุงกัด', 'ระวังไข้เลือดออก']], 330, { rh: 92, step: 0.15, dark: true, foot: 'ที่มา: Mayo Clinic, Seattle Children\'s, กรมควบคุมโรค' });
      if (b === 's7') list('s7', [['ออกแดด: กางเกงขายาว / กันแดด', 'แดดทำรอยเข้มขึ้น · กันแดดใช้ได้ 6 เดือนขึ้นไป'], ['ทาโลชั่นให้ผิวชุ่ม', 'ผิวแห้ง = คัน = เกา'], ['ห้ามขัด สครับแรง', 'รอยดำไม่ใช่ขี้ไคล ขัดแล้วยิ่งอักเสบ'], ['ครีมลดรอยดำ อย่าซื้อทาลูกเอง', 'ปรึกษาหมอผิวหนัง', true]], 330, { rh: 92, step: 0.19 });
      if (b === 's9') list('s9', [['คว่ำภาชนะ เปลี่ยนน้ำทุก 7 วัน'], ['เสื้อแขนยาว กางเกงขายาว'], ['เลี่ยงสนามหญ้า ช่วงเช้ามืด-โพล้เพล้'], ['นอนในมุ้ง หรือติดมุ้งลวด'], ['เนินดินร่วน อย่าเหยียบ ใส่รองเท้า', 'อาจเป็นรังมดคันไฟ']], 330, { rh: 82, step: 0.16 });
      /* s6 timeline */
      if (b === 's6') {
        const p = ph('s6', t), a = U.clamp((p - 0.06) / 0.08), f = U.clamp((p - 0.12) / 0.75), x0 = 130 + LD, x1 = 950 - LD, y = 690;
        g.save(); g.globalAlpha = a; rr(x0 - 30, y - 50, x1 - x0 + 60, 140, 30, 'rgba(255,255,255,.9)', '#ff8fab');
        const gr = g.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, '#6b3d2c'); gr.addColorStop(1, '#f3c6a3'); g.fillStyle = gr; rr(x0, y - 14, x1 - x0, 28, 14, gr);
        [0, 3, 6, 9, 12].forEach((v) => plain(String(v), x0 + (x1 - x0) * v / 12, y + 48, 30, '#3a2f3f', 700, 'center'));
        plain('เดือน', x1 + 2, y - 34, 26, '#6a4a60', 600, 'right');
        const mx = x0 + (x1 - x0) * U.easeIO(f); g.fillStyle = '#ff3b5c'; g.beginPath(); g.arc(mx, y, 20, 0, 7); g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.restore();
      }
      /* s8 age tags */
      if (b === 's8') {
        const T8 = [[S.S.baby, 'ต่ำกว่า 2 เดือน', 'ห้ามทา ใช้มุ้งแทน', '#ffe58a', 0.12, 0.9], [S.S.nana, '2 เดือนขึ้นไป', 'DEET ไม่เกิน 30% · Picaridin', '#bfe3ff', 0.32, 1.0], [S.S.mama, '3 ขวบขึ้นไป', '+ น้ำมันยูคาลิปตัสมะนาว', '#c8f2dc', 0.52, 1.1]];
        T8.forEach(([o, l1, l2, bg, f, dy], i) => { const a = U.clamp((t - TM('s8', i, f)) / 0.35); if (a <= 0) return; let [x, y] = wp(o.userData.head, dy * o.scale.x + (i === 0 ? 0.6 : 0)); if (i === 1) { const [xw] = wp(S.S.wawa.userData.head, 0); x = (x + xw) / 2; } tag2(l1, l2, U.clamp(x, 200 + LD, 880 - LD), Math.max(y - 30, 640), a, bg); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[88, ['ยุงกัดตุ่มเดียว', '#fff']], [78, ['ทำไมรอยดำอยู่เป็นเดือน?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[62, ['ยุงกัด: ตุ่มแดง คัน', '#fff']], [46, ['ส่วนใหญ่ยุบเองใน 1–2 วัน', '#ffe3ea', 600]]], foot: 'ที่มา: SingHealth (KK Women\'s & Children\'s Hospital)' },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 280, lines: [[56, ['มดคันไฟ: แสบร้อน → ตุ่มหนองขาว', '#ffd35e']], [44, ['ขึ้นใน 1 วัน จากพิษมด ไม่ใช่ติดเชื้อ', '#fff', 600]], [44, ['ไม่บ่ง หายเองใน 8–10 วัน', '#ffe3ea', 600]]], foot: 'ที่มา: Seattle Children\'s Hospital' },
      { t0: at('s2') + 0.2, t1: TM('s2', 0, 0.36), y: 290, lines: [[60, ['น้ำลายยุงเข้าใต้ผิว', '#fff']], [46, ['ผิวอักเสบ บวม แดง คัน', '#ffe3ea', 600]]] },
      { t0: TM('s2', 0, 0.36) + 0.02, t1: TM('s2', 1, 0.66), y: 290, lines: [[56, ['อักเสบ = ปลุกเซลล์สร้างเม็ดสี', '#fff']], [46, ['ผลิตเม็ดสีเกิน กลายเป็นรอยดำ', '#ffe3ea', 600]]], foot: 'เรียกว่า PIH (รอยดำหลังการอักเสบ)' },
      { t0: TM('s2', 1, 0.66) + 0.02, t1: end('s2') - 0.05, y: 280, lines: [[64, ['ยิ่งเกา ยิ่งดำ', '#ffd35e']], [46, ['อักเสบซ้ำ รอยเข้มขึ้น อยู่นานขึ้น', '#fff', 600]], [44, ['ผิวสีเข้ม เห็นรอยชัดกว่า', '#ffe3ea', 600]]], foot: 'ที่มา: SingHealth, MDedge Dermatology' },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 240, lines: [[58, ['โดนกัดแล้ว ทำแบบนี้', '#ffd35e']]] },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 280, lines: [[56, ['อย่าทา มะนาว ยาสีฟัน แอลกอฮอล์', '#fff']], [44, ['ระคายผิว ยิ่งอักเสบ', '#ffe3ea', 600]], [50, ['มะนาว + แดด = ผิวไหม้ รอยดำเพิ่ม', '#ffd35e']]], foot: 'ที่มา: Dr. Rajani Katta แพทย์ผิวหนัง' },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[62, ['ตุ่มหนองมด อย่าบ่ง!', '#ffd35e']], [46, ['เปิดทางเชื้อโรค เสี่ยงติดเชื้อ เป็นแผลเป็น', '#fff', 600]]] },
      { t0: at('s5') + 0.2, t1: end('s5') - 0.05, y: 240, lines: [[60, ['รีบพาไปหาหมอ ถ้า…', '#ffd35e']]] },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 280, lines: [[58, ['รอยดำเดิม ค่อยๆ จางเอง', '#fff']], [56, ['แต่บางคนใช้ ', '#fff'], ['6–12 เดือน', '#ffd35e']]], foot: 'ที่มา: SingHealth, คณะเภสัชศาสตร์ ม.มหิดล' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 240, lines: [[58, ['รอยเดิม ดูแลแบบนี้', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 280, lines: [[60, ['ยากันยุง เลือกตามวัย', '#ffd35e']], [44, ['ผู้ใหญ่ทาให้ เลี่ยงมือ ตา ปาก · ใช้ตามฉลาก', '#fff', 600]]], foot: 'ที่มา: CDC, AAP (สมาคมกุมารแพทย์สหรัฐฯ)' },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 240, lines: [[58, ['กันยุง กันมด 5 ข้อ', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[62, ['ไม่เกา ไม่บ่ง รอยดำไม่มา', '#fff']], [44, ['ลูกบ้านคุณโดนยุงหรือมดกัดบ่อยกว่ากัน?', '#ffe3ea', 600]]], foot: 'ข้อมูล: SingHealth, CDC, AAP, Seattle Children\'s, เภสัชฯ มหิดล' },
    ],
    trans,
    audio: [
      [0.3, 'buzz'], [0.9, 'boing'],
      [at('s1') + 0.3, 'buzz'], [P('s1', 0.22), 'pop'], [P('s1', 0.3), 'warn'], [SP('s1', 0.5) + 0.2, 'tick'], [SP('s1', 0.5) + 0.6, 'tick'], [SP('s1', 0.5) + 1.0, 'boing'], [SP('s1', 0.5) + 1.3, 'pop'],
      [at('s2') + 0.2, 'buzz'], [P('s2', 0.13), 'pop'], [P('s2', 0.2), 'bubble'], [P('s2', 0.26), 'bubble'], [TM('s2', 0, 0.36), 'shimmer'], [TM('s2', 0, 0.36) + 0.8, 'pop'], [TM('s2', 1, 0.66), 'warn'], [TM('s2', 1, 0.66) + 0.5, 'whoosh'],
      [TM('s3', 0, 0.1), 'bubble'], [TM('s3', 1, 0.27), 'ding'], [TM('s3', 2, 0.44), 'tick'], [TM('s3', 3, 0.61), 'tick'], [TM('s3', 4, 0.78), 'giggle'],
      [at('s4') + 0.4, 'giggle'], [at('s4') + 1.2, 'warn'], [SP('s4', 0.5) + 0.3, 'tick'], [SP('s4', 0.5) + 1.0, 'boing'],
      [at('s5') + 0.3, 'heartbeat'], [TM('s5', 0, 0.1), 'tick'], [TM('s5', 1, 0.25), 'tick'], [TM('s5', 2, 0.4), 'tick'], [TM('s5', 3, 0.55), 'tick'], [P('s5', 0.75), 'heartbeat'],
      [at('s6') + 0.4, 'shimmer'], [at('s6') + 1.0, 'riser'], [P('s6', 0.85), 'ding'],
      [TM('s7', 0, 0.1), 'ding'], [TM('s7', 1, 0.29), 'tick'], [TM('s7', 2, 0.48), 'tick'], [TM('s7', 3, 0.67), 'warn'],
      [TM('s8', 0, 0.12), 'twinkle'], [TM('s8', 1, 0.32), 'pop'], [TM('s8', 2, 0.52), 'pop'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 0, 0.1) + 0.6, 'bubble'], [TM('s9', 1, 0.26), 'tick'], [TM('s9', 2, 0.42), 'tick'], [TM('s9', 3, 0.58), 'tick'], [TM('s9', 4, 0.74), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [at('s10') + 1.2, 'heart'], [at('s10') + 2.2, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s3'), CK.MUSIC.OOPS), CK.musicBed(at('s3'), at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.NIGHT), CK.musicBed(at('s6'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
