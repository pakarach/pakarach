/* พ่อแม่หัวจะปวด — หัดลูกกินผลไม้ (คาย 3 ครั้ง ≠ ไม่ชอบ, ลิ้นชอบหวาน + กลัวของใหม่ 2–6 ขวบ, บันไดวัย, ติดคอ, น้ำผลไม้ ≠ ผลไม้, ชิมซ้ำ 8–10+, กินให้ดู, 5 ทิป)
   Build: node build.js hat-luk-kin-phonlamai.js review-hat-luk-kin-phonlamai.html --kit clay --title "หัดลูกกินผลไม้" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.0], ['s1', 7], ['s2', 8.5], ['s3', 8.5], ['s4', 8.5], ['s5', 9], ['s6', 8.5], ['s7', 7.5], ['s8', 9], ['s9', 5.5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, PY = REEL ? 40 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's9'; };
  const MQ = DATA.vo ? 0.45 : 1, MU = (o) => Object.assign({}, o, { mv: o.mv * MQ, bv: (o.bv || 0) * MQ, shk: (o.shk || 0) * MQ });
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
  const dots = (base, dot, rep) => { const tx = ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };

  /* ---- layout ---- */
  const TG = { x: 60.7, y: 1.05 }, FLX = [59.5, 60.7, 61.9]; // tongue + flavour balls
  const FLAV = [['หวาน', '#ffd23f', true], ['เปรี้ยว', '#8fdc4a', false], ['ขม', '#3f9a62', false]];
  const STEP = [[117.6, 0.35, '#ffb347'], [120.0, 0.85, '#63c79b'], [122.4, 1.35, '#6fa8ff']];
  const TUBE = [-61.35, -58.65], PED = [180.0, 182.4];
  const CLOSE = (dx, dz) => ({ pos: [dx, 6.6, 26 - (dz || 0)], look: [dx, 3.0, 0], fov: 29 });
  const SH = {
    cover: [FW(0.0, -1.0, 6.6, 3.8, 0.18), FW(0.05, -1.0, 6.4, 3.8, 0.18)],
    s1: [FW(0.1, -1.0, 7.2, 3.8, 0.2), FW(0.1, -1.0, 6.9, 3.8, 0.2)],
    s2: [FW(59.9, 0, 7.6, 3.7, 0.1), FW(59.95, 0, 7.4, 3.7, 0.1)],
    s3: [FW(120, 0, 7.8, 3.6, 0.1), FW(120, 0, 7.6, 3.6, 0.1)],
    s4: [FW(-60, 0, 6.6, REEL ? 4.3 : 4.7, 0.08), FW(-60, 0, 6.4, REEL ? 4.3 : 4.7, 0.08)],
    s5: [FW(180.2, 0, 7.8, 3.5, 0.1), FW(180.25, 0, 7.6, 3.5, 0.1)],
    s6: [FW(0.0, -0.9, 6.6, 3.8, 0.2), FW(0.0, -0.9, 6.4, 3.8, 0.2)],
    s7: [FW(0.1, -1.0, 7.6, 3.9, 0.2), FW(0.1, -1.0, 7.4, 3.9, 0.2)],
    s8: [FW(0, 0.2, 7.8, 4.0, 0.22), FW(0, 0.2, 7.6, 4.0, 0.22)],
    s9: [CLOSE(0.2), CLOSE(0, 1.2)],
  };
  const CUT = new Set(['s2', 's3', 's4', 's5', 's6', 's8', 's9']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s4') - 0.2) / 0.6) * U.clamp((end('s4') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), VH = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };
  const pv = (x, y, z) => proj(VH.set(x, y, z));

  VE.registerSfx('spit', (t) => { VE.audio.noise(t, 0.12, { type: 'bandpass', f: 900, vol: 0.16 }); VE.audio.tone(t + 0.05, 500, 0.18, { f2: 180, type: 'triangle', vol: 0.08 }); });
  VE.registerSfx('slurp', (t) => { VE.audio.tone(t, 400, 0.35, { f2: 900, vol: 0.08 }); VE.audio.noise(t, 0.35, { type: 'bandpass', f: 1200, vol: 0.06 }); });
  VE.registerSfx('crunch', (t) => { for (let i = 0; i < 3; i++) VE.audio.noise(t + i * 0.11, 0.06, { type: 'highpass', f: 2500, vol: 0.14 }); });

  VE.run({
    DUR, file: 'hat-luk-kin-phonlamai', title: 'หัดลูกกินผลไม้', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'กินอยู่ของลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const add = (o, x, y, z) => { o.position.set(x, y, z); scene.add(o); return o; };
      /* fruit builders */
      const banana = (sc) => { const g = new T.Group(); const b = new T.Mesh(new T.TorusGeometry(0.34, 0.1, 10, 20, 2.2), M('#ffd23f')); b.rotation.z = 0.45; g.add(b); for (const a of [0.45, 2.65]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), M('#8a5a30')); e.position.set(Math.cos(a) * 0.34, Math.sin(a) * 0.34, 0); g.add(e); } g.scale.setScalar(sc || 1); return g; };
      const chunk = (c, sc) => { const m = new T.Mesh(new T.SphereGeometry(0.2, 14, 10), M(c || '#ff8a3c')); m.scale.set(1.25 * (sc || 1), 0.6 * (sc || 1), 0.8 * (sc || 1)); return m; };
      const plate = (r) => { const g = new T.Group(); const p = new T.Mesh(new T.CylinderGeometry(r, r * 0.8, 0.07, 32), M('#fff6ea')); const rim = new T.Mesh(new T.TorusGeometry(r * 0.95, 0.035, 8, 32), M('#5ab8ff')); rim.rotation.x = PI / 2; rim.position.y = 0.04; g.add(p, rim); return g; };
      const fruitPlate = () => { const g = plate(0.62); [['#ff8a3c', -0.25, 0.1], ['#ff8a3c', 0.02, -0.18], ['#ffd23f', 0.26, 0.08], ['#ff5f6d', 0.0, 0.22]].forEach(([c, x, z]) => { const k = chunk(c, 1.05); k.position.set(x, 0.14, z); k.rotation.y = x * 3; g.add(k); }); return g; };
      const orange = (r) => { const g = new T.Group(); g.add(new T.Mesh(new T.SphereGeometry(r, 22, 16), M('#ff9a2e'))); const l = new T.Mesh(new T.SphereGeometry(r * 0.3, 10, 8), M('#4fb86a')); l.scale.set(1.4, 0.35, 0.8); l.position.set(r * 0.25, r * 0.98, 0); g.add(l); return g; };
      const apple = (r) => { const g = new T.Group(); const a = new T.Mesh(new T.SphereGeometry(r, 20, 14), M('#ff5263')); a.scale.y = 0.92; g.add(a); const s = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, r * 0.6, 6), M('#7a5230')); s.position.y = r; g.add(s); const l = new T.Mesh(new T.SphereGeometry(r * 0.32, 10, 8), M('#4fb86a')); l.scale.set(1.4, 0.35, 0.8); l.position.set(r * 0.35, r * 1.1, 0); g.add(l); return g; };
      const juiceBox = (sc) => { const g = new T.Group(); const a = new T.Mesh(new T.BoxGeometry(0.36, 0.54, 0.26), M('#ff9a3c')); a.position.y = 0.27; const b = new T.Mesh(new T.BoxGeometry(0.37, 0.18, 0.27), M('#fff6ea')); b.position.y = 0.3; const o = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.28, 12), M('#ff7a1a')); o.rotation.x = PI / 2; o.position.set(0, 0.3, 0.01); const c = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.38, 8), M('#ff5f8f')); c.position.set(0.08, 0.66, 0); c.rotation.z = -0.25; g.add(a, b, o, c); g.scale.setScalar(sc || 1); return g; };
      const stage = (cx, floorC, wallA, wallB) => { const pl = new T.Mesh(new T.BoxGeometry(20, 0.3, 12), M(floorC)); pl.position.set(cx, -0.15, 0); scene.add(pl); const bw = new T.Mesh(new T.BoxGeometry(20, 10, 0.3), M('#ffffff', { map: dots(wallA, wallB, [9, 4]) })); bw.position.set(cx, 4.6, -3.6); scene.add(bw); return { pl, bw }; };

      /* ===== stage 0: dining corner (x = 0) ===== */
      const room = CK.room(T, { wall: '#bfe6ff', dots: 'rgba(255,255,255,0.85)', wain: '#ffb86b', floor: '#e9b483', rug: '#ff9ec0', winX: 3.3 }); scene.add(room);
      const WHO = ['dad', 'mom', 'mama', 'nana', 'wawa'], c = {};
      for (const k of WHO) { const g = CK.family(T, k); g.userData.base = g.scale.x; g.visible = false; scene.add(g); c[k] = g; }
      const chom = CK.neighbor(T, 2, { scale: 0.9, top: '#b58cff', bottom: '#fff1a8' }); chom.userData.base = 0.9; chom.visible = false; scene.add(chom);
      const fp = fruitPlate(); scene.add(fp);
      const spit = chunk('#ff8a3c', 0.9); scene.add(spit);
      const cookie = new T.Group(); { const b = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.09, 20), M('#d99a55')); b.rotation.x = PI / 2; cookie.add(b); for (const [x, y] of [[-0.1, 0.1], [0.12, 0.05], [0, -0.12], [-0.15, -0.08]]) { const d = new T.Mesh(new T.SphereGeometry(0.045, 8, 6), M('#6b3d1f')); d.position.set(x, y, 0.05); cookie.add(d); } } scene.add(cookie);
      const mango = chunk('#ffc12e', 1.3); scene.add(mango);
      const bans = [banana(0.75), banana(0.62), banana(0.6)]; bans.forEach((b) => scene.add(b));
      const hearts = []; for (let i = 0; i < 12; i++) { const h = new T.Mesh(new T.SphereGeometry(0.13, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 3.4, Math.cos(i * 3.3) * 0.8 + 0.6, (i * 0.37) % 1]; scene.add(h); hearts.push(h); }

      /* ===== stage 1: tongue (x = 60) ===== */
      stage(60, '#ff7fa8', '#ffd1e3', '#ffffff');
      const tongue = new T.Group(); tongue.position.set(TG.x, TG.y, 0); scene.add(tongue);
      const tb = new T.Mesh(new T.SphereGeometry(1, 36, 24), M('#ff7396')); tb.scale.set(2.25, 0.42, 1.15); tongue.add(tb);
      const gr = new T.Mesh(new T.BoxGeometry(0.06, 0.05, 1.6), M('#e85580')); gr.position.set(0, 0.42, 0.1); tongue.add(gr);
      for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 0.25 + (i % 7) * 0.24; const x = Math.cos(a) * r * 1.15, z = Math.sin(a) * r * 0.5 + 0.15; const yy = 0.42 * Math.sqrt(Math.max(0, 1 - (x / 2.25) ** 2 - (z / 1.15) ** 2)); const bp = new T.Mesh(new T.SphereGeometry(0.07, 8, 6), M('#ffa3bb')); bp.position.set(x, yy, z); tongue.add(bp); }
      tongue.rotation.x = 0.45;
      const flav = FLAV.map(([, col], i) => { const g = new T.Group(); g.add(new T.Mesh(new T.SphereGeometry(0.42, 22, 16), M(col))); for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#3a2f3f')); e.scale.set(1, 1.3, 0.5); e.position.set(s * 0.15, 0.06, 0.39); g.add(e); } const mo = new T.Mesh(new T.TorusGeometry(0.09, 0.022, 6, 14, PI), M('#3a2f3f')); mo.position.set(0, -0.1, 0.4); mo.rotation.z = i ? 0 : PI; g.add(mo); g.position.set(FLX[i], 5, 0.35); scene.add(g); return g; });
      const sparks = []; for (let i = 0; i < 10; i++) { const sp = new T.Mesh(new T.OctahedronGeometry(0.1, 0), M(i % 2 ? '#ffd23f' : '#ffffff', { emissive: '#ffd23f', emissiveIntensity: 0.4 })); scene.add(sp); sparks.push(sp); }

      /* ===== stage 2: age ladder (x = 120) ===== */
      stage(120, '#ff7fa8', '#fff0b8', '#ffffff');
      STEP.forEach(([x, h, col]) => { const g = new T.BoxGeometry(2.1, h, 2.2); g.translate(0, h / 2, 0); add(new T.Mesh(g, M(col)), x, 0, 0); });
      const bowl = new T.Group(); { const b = new T.Mesh(new T.SphereGeometry(0.3, 18, 10, 0, PI * 2, PI / 2, PI / 2), M('#5ab8ff', { side: T.DoubleSide })); b.position.y = 0.3; const m = new T.Mesh(new T.CylinderGeometry(0.27, 0.27, 0.04, 18), M('#ffc12e')); m.position.y = 0.27; bowl.add(b, m); } scene.add(bowl);
      const piece = chunk('#ffd23f', 0.9); scene.add(piece);
      const app = apple(0.24); scene.add(app);

      /* ===== stage 3: airway (x = -60) ===== */
      stage(-60, '#8f7fd0', '#6a5cb8', '#7d70c8');
      const tubes = TUBE.map((x) => { const tu = CK.tube(T, 0.56, 3.0, '#ffb3c6'); tu.material.transparent = true; tu.material.opacity = 0.42; tu.position.set(x, 1.9, 0); scene.add(tu); for (const y of [0.4, 3.4]) { const r = new T.Mesh(new T.TorusGeometry(0.56, 0.07, 8, 28), M('#ff8fab')); r.rotation.x = PI / 2; r.position.set(x, y, 0); scene.add(r); } return tu; });
      const grape = add(new T.Mesh(new T.SphereGeometry(0.52, 22, 16), M('#9a5fe0', { emissive: '#ff2040', emissiveIntensity: 0 })), TUBE[0], 2.5, 0);
      const quarters = []; for (let i = 0; i < 4; i++) { const q = new T.Mesh(new T.SphereGeometry(0.2, 12, 10), M('#9a5fe0')); q.scale.set(0.7, 1.5, 0.7); scene.add(q); quarters.push(q); }

      /* ===== stage 4: juice vs fruit (x = 180) ===== */
      stage(180, '#ff7fa8', '#c9f0dc', '#ffffff');
      PED.forEach((x, i) => { const g = new T.CylinderGeometry(0.75, 0.8, 1.0, 28); g.translate(0, 0.5, 0); add(new T.Mesh(g, M(i ? '#63c79b' : '#ffb347')), x, 0, 0); });
      const glass = new T.Group(); { const gl = new T.Mesh(new T.CylinderGeometry(0.34, 0.28, 0.85, 20, 1, true), M('#dff3ff', { transparent: true, opacity: 0.5, side: T.DoubleSide })); gl.position.y = 0.43; const ju = new T.Mesh(new T.CylinderGeometry(0.31, 0.27, 0.66, 20), M('#ffa51f', { emissive: '#ff8a00', emissiveIntensity: 0.35 })); ju.position.y = 0.36; glass.add(gl, ju); } add(glass, PED[0], 1.0, 0);
      const whole = orange(0.55); add(whole, PED[1], 1.55, 0);
      const fibre = new T.Mesh(new T.TorusGeometry(0.72, 0.045, 8, 36), M('#4fb86a', { emissive: '#2fa85a', emissiveIntensity: 0.3 })); add(fibre, PED[1], 1.55, 0);
      const jb = juiceBox(1.15); scene.add(jb);

      return { key, hemi, room, c, chom, fp, spit, cookie, mango, bans, hearts, tongue, flav, sparks, bowl, piece, app, tubes, grape, quarters, glass, whole, fibre, jb };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.c, st = {};
      const dn = danger(t); s.hemi.intensity = U.lerp(0.48, 0.3, dn); s.key.intensity = U.lerp(0.68, 0.42, dn);
      const def = (k, x, z, ex, ry, y) => (st[k] = { x, z, ex: ex || 'happy', ry: ry || 0, y: y || 0 });
      const hop = (f, a) => Math.abs(Math.sin(t * f)) * a;
      const v = new T.Vector3();
      const hold = (prop, g, hand, dx, dy, dz) => { g.updateMatrixWorld(true); g.userData[hand].getWorldPosition(v); prop.position.set(v.x + (dx || 0), v.y + (dy || 0), v.z + (dz || 0)); prop.visible = true; };
      [s.fp, s.spit, s.cookie, s.mango, s.bowl, s.piece, s.app, s.jb].concat(s.bans).forEach((o) => (o.visible = false));

      if (bt === 'cover' || bt === 's1') {
        const p = bt === 's1' ? ph('s1', t) : 0, q = bt === 's1' && t >= SP('s1', 0.52);
        def('nana', -1.0, -0.8, q ? 'giggle' : 'sick', 0.25, q ? hop(9, 0.14) : 0); if (q) st.nana.up = true;
        def('mom', 1.05, -1.2, 'worried', q ? 0.1 : -0.3); st.mom.am = q ? [-0.25, -0.4] : [-0.6, -1.0]; if (q) st.mom.a1 = [0.7, -1.1];
      } else if (bt === 's2') {
        const p = ph('s2', t), bad = p > 0.3 && t < SP('s2', 0.55);
        def('nana', 57.25, 0.7, p < 0.12 ? 'happy' : p < 0.3 ? 'giggle' : bad ? 'sick' : 'worried', 0.35, p > 0.12 && p < 0.3 ? hop(9, 0.12) : 0);
      } else if (bt === 's3') {
        const p = ph('s3', t), K = [TM('s3', 0, 0.06), TM('s3', 1, 0.32), TM('s3', 2, 0.58)];
        [['wawa', 'happy'], ['nana', 'happy'], ['mama', 'giggle']].forEach(([k, ex], i) => { const a = U.clamp((t - K[i]) / 0.45); if (a <= 0) return; def(k, STEP[i][0], 0.2, ex, 0, STEP[i][1] + (1 - U.easeBack(a)) * -0.0 + (a < 1 ? Math.sin(a * PI) * 0.35 : 0)); st[k].sc = Math.max(0.01, U.easeBack(a)); });
        if (st.wawa) st.wawa.a1 = [0.5, -1.0]; if (st.nana) st.nana.a1 = [0.75, -1.0]; if (st.mama) { st.mama.a1 = [0.9, -1.1]; st.mama.wave = p > 0.8; }
      } else if (bt === 's4') {
        def('nana', -60, 1.3, 'worried', 0, 0);
      } else if (bt === 's5') {
        const p = ph('s5', t), q = t >= SP('s5', 0.5);
        def('chom', 177.75, 0.5, q ? 'worried' : p > 0.12 ? 'giggle' : 'happy', 0.3, !q && p > 0.12 && p < 0.3 ? hop(9, 0.1) : 0); st.chom.a1 = [0.65, -1.15];
      } else if (bt === 's6') {
        const p = ph('s6', t), q = t >= SP('s6', 0.5);
        def('nana', -0.95, -0.8, q ? 'giggle' : p < 0.2 ? 'worried' : 'happy', 0.3, q ? hop(8, 0.1) : 0); st.nana.a1 = [U.lerp(0.6, 1.25, U.easeIO(U.clamp((p - 0.15) / 0.25))), U.lerp(-1.0, 0.85, U.easeIO(U.clamp((p - 0.15) / 0.25)))];
        def('mom', 1.05, -1.2, 'happy', -0.3); st.mom.am = [-0.6, -1.0];
      } else if (bt === 's7') {
        const p = ph('s7', t);
        def('dad', 1.85, -1.4, 'giggle', -0.3); st.dad.am = [-1.15, 0.9];
        def('mama', 0.15, -0.7, 'giggle', -0.1, hop(7, 0.08)); st.mama.a1 = [1.2, 0.9];
        def('nana', -1.55, -0.6, p > 0.45 ? 'giggle' : 'happy', 0.45, p > 0.45 ? hop(9, 0.12) : 0); if (p > 0.3) st.nana.a1 = [0.95, -1.2];
      } else if (bt === 's8' || bt === 's9') {
        const g9 = bt === 's9', p = g9 ? ph('s9', t) : 0;
        def('mom', g9 ? -2.1 : -1.9, -0.7, 'happy', 0.12); def('dad', 1.95, -0.7, 'happy', -0.12);
        def('nana', -1.6, 1.4, g9 && p > 0.25 ? 'giggle' : 'happy', 0.1, g9 && p > 0.3 ? hop(8, 0.12) : 0); st.nana.a1 = g9 ? [1.2, 0.9] : [0.7, -1.0];
        def('mama', 0.0, 1.4, g9 ? 'giggle' : 'happy', 0, g9 ? hop(7, 0.1) : 0); st.mama.wave = g9 && p > 0.5;
        def('wawa', 1.45, 1.4, 'happy', -0.1);
        if (g9) { st.mom.wave = p > 0.55; }
      }
      for (const k of ['dad', 'mom', 'mama', 'nana', 'wawa', 'chom']) {
        const g = k === 'chom' ? s.chom : C[k], d = st[k]; if (!d) { g.visible = false; continue; }
        g.visible = true; g.position.set(d.x, d.y, d.z); g.rotation.y = d.ry + 0.04 * Math.sin(t * 0.8 + d.x); g.scale.setScalar(g.userData.base * (d.sc || 1));
        g.userData.setExpr(d.ex); g.userData.tick(t, { wave: !!d.wave });
        if (d.up) { g.userData.arm1.rotation.z = 2.3 + 0.2 * Math.sin(t * 9); g.userData['arm-1'].rotation.z = -2.3 - 0.2 * Math.sin(t * 9 + 1); }
        if (d.a1 && !d.wave) { g.userData.arm1.rotation.z = d.a1[0]; g.userData.arm1.rotation.x = d.a1[1]; }
        if (d.am) { g.userData['arm-1'].rotation.z = d.am[0]; g.userData['arm-1'].rotation.x = d.am[1]; }
      }
      /* ---- props ---- */
      if (bt === 'cover' || bt === 's1') {
        hold(s.fp, C.mom, 'hand-1', -0.1, 0.1, 0.25);
        const q = bt === 's1' && t >= SP('s1', 0.52);
        if (q) { hold(s.cookie, C.mom, 'hand1', 0.05, 0.2, 0.2); s.cookie.rotation.z = 0.2 * Math.sin(t * 3); }
        else { const k = (t * 0.75 + 0.15) % 1; C.nana.updateMatrixWorld(true); C.nana.userData.head.getWorldPosition(v); s.spit.visible = k < 0.8; s.spit.position.set(v.x + 0.15 - k * 1.5, v.y - 0.12 + Math.sin(k * PI) * 0.45 - k * 1.1, v.z + 0.6); s.spit.rotation.z = k * 6; }
      }
      if (bt === 's2') {
        const p = ph('s2', t), ph2 = t >= SP('s2', 0.55);
        const K = [TM('s2', 0, 0.08), TM('s2', 1, 0.3), TM('s2', 2, 0.42)];
        let shake = 0;
        s.flav.forEach((g, i) => { const a = U.clamp((t - K[i]) / 0.5), land = 1.95; g.visible = a > 0; let y = U.lerp(5.2, land, U.easeOut(a)); if (a >= 1) { if (i === 0) y = land + 0.06 * Math.sin(t * 5); else { y = land + 0.5 + hop(11, 0.18); shake += U.clamp(1 - (t - K[i] - 0.5) / 1.2); } } g.position.set(FLX[i] + (i && a >= 1 ? Math.sin(t * 30 + i) * 0.03 : 0), y - (ph2 ? 0.25 : 0), 0.35); g.rotation.z = i && a >= 1 ? 0.15 * Math.sin(t * 9 + i) : 0; });
        s.tongue.position.x = TG.x + Math.sin(t * 38) * 0.05 * U.clamp(shake); s.tongue.scale.setScalar(1 + 0.02 * Math.sin(t * 3));
        s.sparks.forEach((sp, i) => { const a = (t * 0.8 + i / 10) % 1; sp.visible = t > K[0] + 0.5 && t < K[1] + 0.3; sp.position.set(FLX[0] + Math.cos(i * 2.4 + t) * 0.8, 2.0 + a * 1.4, 0.6 + Math.sin(i * 2.4 + t) * 0.3); sp.rotation.y = t * 3 + i; });
      } else s.sparks.forEach((sp) => (sp.visible = false));
      if (bt === 's3') {
        if (st.wawa && st.wawa.sc > 0.9) { hold(s.bowl, C.wawa, 'hand1', 0.12, -0.1, 0.25); }
        if (st.nana && st.nana.sc > 0.9) { hold(s.piece, C.nana, 'hand1', 0.05, 0.12, 0.15); }
        if (st.mama && st.mama.sc > 0.9 && !st.mama.wave) { hold(s.app, C.mama, 'hand1', 0.05, 0.22, 0.15); } else if (st.mama && st.mama.wave) { s.app.visible = true; s.app.position.set(STEP[2][0] - 0.7, STEP[2][1] + 0.24, 0.8); }
      }
      { const on = bt === 's4', p = on ? ph('s4', t) : 0;
        s.grape.material.emissiveIntensity = on ? 0.25 + 0.25 * Math.sin(t * 7) : 0; s.grape.scale.setScalar(1 + 0.04 * Math.sin(t * 7)); s.grape.position.x = TUBE[0] + Math.sin(t * 25) * 0.015;
        s.quarters.forEach((q, i) => { const k = (t * 0.45 + i * 0.25) % 1; q.position.set(TUBE[1] + Math.sin(i * 2.1) * 0.18, 3.7 - k * 3.6, Math.cos(i * 2.1) * 0.15); q.rotation.z = k * 2 + i; q.visible = on; }); }
      if (bt === 's5') {
        const p = ph('s5', t); hold(s.jb, s.chom, 'hand1', 0.08, 0.05, 0.2); s.jb.rotation.z = 0.1 * Math.sin(t * 3);
        s.fibre.rotation.set(PI / 2 + 0.35 * Math.sin(t * 1.3), t * 1.2, 0); s.whole.position.y = 1.55 + 0.05 * Math.sin(t * 2.5); s.whole.rotation.y = t * 0.6; s.glass.rotation.z = 0.03 * Math.sin(t * 2);
      }
      if (bt === 's6') { hold(s.fp, C.mom, 'hand-1', -0.1, 0.1, 0.25); const p = ph('s6', t); hold(s.mango, C.nana, 'hand1', 0.02, 0.16, 0.12); if (p > 0.72) s.mango.scale.set(1.3 * 1.25 * 0.6, 0.6 * 1.3 * 0.8, 0.8 * 1.3); else s.mango.scale.set(1.25 * 1.3, 0.6 * 1.3, 0.8 * 1.3); }
      if (bt === 's7') { hold(s.bans[0], C.dad, 'hand-1', 0, 0.3, 0.15); hold(s.bans[1], C.mama, 'hand1', 0, 0.26, 0.12); s.bans[0].rotation.z = 0.2 * Math.sin(t * 4); s.bans[1].rotation.z = 0.25 * Math.sin(t * 5 + 1); }
      if (bt === 's9') { hold(s.bans[2], C.nana, 'hand1', 0, 0.24, 0.12); s.bans[2].rotation.z = 0.2 * Math.sin(t * 5); }
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s9') - 0.4 - u[2] * 1.5) / 3.2; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.0, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { c: s.c, chom: s.chom }, camera, flav: s.flav };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's4') return ['#3a3570', '#6a4a80']; if (b === 's2' || b === 's3' || b === 's5') return ['#ffe8f0', '#fff4e6']; return ['#d9f1ff', '#ffe8f0']; },
    danger,
    hud(g, t) {
      if (!CAMR) return; const b = beatAt(t), D = window.__dbg, S = D && D.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, tail) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 38px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2 - (REEL ? 80 : 0)); rr(x - w / 2, y - 38, w, 76, 38, '#ffffff', '#ff8fab'); const tx = x + (tail || 0); g.beginPath(); g.moveTo(tx - 14, y + 36); g.lineTo(tx + 4, y + 66); g.lineTo(tx + 18, y + 36); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, 38, '#3a2f3f', 700, 'center'); g.restore(); };
      const badge = (x, y, ok, a, r0) => { g.save(); g.globalAlpha = a; const r = (r0 || 30) * (0.85 + 0.15 * U.easeBack(Math.min(1, a))); g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#2fbf71' : '#ff4f6a'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = 8; g.lineCap = 'round'; const u = r / 30; g.beginPath(); if (ok) { g.moveTo(x - 13 * u, y + 1); g.lineTo(x - 4 * u, y + 11 * u); g.lineTo(x + 14 * u, y - 11 * u); } else { g.moveTo(x - 11 * u, y - 11 * u); g.lineTo(x + 11 * u, y + 11 * u); g.moveTo(x + 11 * u, y - 11 * u); g.lineTo(x - 11 * u, y + 11 * u); } g.stroke(); g.restore(); };
      const card = (x, y, w, l1, l2, a, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; const h = l2 ? 104 : 64; rr(x - w / 2, y - h, w, h, 22, 'rgba(255,255,255,.94)', col || '#ff8fab'); plain(l1, x, y - h + 32, 34, col === '#2fbf71' ? '#1f9a58' : '#ff4f7a', 800, 'center'); if (l2) plain(l2, x, y - 30, 29, '#3a2f3f', 600, 'center'); g.restore(); };

      if (b === 'cover') { const [x, y] = wp(S.c.nana.userData.head, 0.95); bubble('แหวะ!', x - 30, y - 40, 1, 20); }
      if (b === 's1') {
        const q = SP('s1', 0.52), p = ph('s1', t);
        if (t < q) { const [x, y] = wp(S.c.nana.userData.head, 0.95); bubble('แหวะ!', x - 30, y - 40, U.clamp((q - t) / 0.3), 20);
          for (let i = 0; i < 3; i++) { const a = U.clamp((t - TM('s1', i, 0.1 + i * 0.12)) / 0.3) * U.clamp((q - t) / 0.3); if (a <= 0) continue; const cx = 290 + i * 250; g.save(); g.globalAlpha = a; rr(cx - 105, 470 + PY, 210, 150, 26, 'rgba(255,255,255,.94)', '#ff8fab'); plain('ครั้งที่ ' + (i + 1), cx, 510 + PY, 34, '#3a2f3f', 700, 'center'); g.restore(); badge(cx, 572 + PY, false, a, 32); } }
        else { const [x, y] = wp(S.c.mom.userData.head, 1.1); bubble('สงสัยลูกไม่ชอบผลไม้…', x - 60, y - 40, U.clamp((t - q) / 0.3) * U.clamp((end('s1') - 0.15 - t) / 0.3), 60); }
      }
      if (b === 's2') {
        const q = SP('s2', 0.55), p = ph('s2', t), K = [TM('s2', 0, 0.08), TM('s2', 1, 0.3), TM('s2', 2, 0.42)];
        FLAV.forEach(([n, , ok], i) => { const a = U.clamp((t - K[i] - 0.45) / 0.3) * U.clamp((q - t) / 0.3); if (a <= 0 || !D.flav) return; const [x, y] = wp(D.flav[i], 0.62); g.save(); g.globalAlpha = a; txt(n, x - 22, y - 26, 40, ok ? '#7dffb0' : '#ffd35e', 800); g.restore(); badge(x + 62, y - 28, ok, a, 22); });
        if (t >= q) { const a = U.clamp((t - q) / 0.35), k = U.easeIO(U.clamp((t - q - 0.2) / 1.6)); g.save(); g.globalAlpha = a;
          const X0 = 150 + LD, X1 = 930 - LD, Y0 = 720 + PY, HH = 190; rr(80 + LD, 440 + PY, 920 - 2 * LD, 345, 30, 'rgba(255,255,255,.94)', '#ff8fab');
          plain('ความกลัวอาหารใหม่ ตามอายุ', 540, 478 + PY, 32, '#3a2f3f', 700, 'center');
          const ax = (age) => X0 + (X1 - X0) * age / 10, f = (age) => 0.12 + 0.88 * Math.exp(-((age - 4) ** 2) / 5.5) * (age < 4 ? 1 : 1) - (age < 1 ? 0.08 : 0);
          rr(ax(2), Y0 - HH, ax(6) - ax(2), HH, 0, 'rgba(255,143,171,.28)');
          g.beginPath(); for (let i = 0; i <= 60 * k; i++) { const age = i / 6, x = ax(age), y = Y0 - HH * f(age); if (!i) g.moveTo(x, y); else g.lineTo(x, y); } g.lineWidth = 9; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#ff4f7a'; g.stroke();
          g.beginPath(); g.moveTo(X0, Y0); g.lineTo(X1, Y0); g.lineWidth = 4; g.strokeStyle = '#3a2f3f'; g.stroke();
          for (const age of [0, 2, 4, 6, 8, 10]) plain(age + (age === 10 ? ' ขวบ' : ''), ax(age), Y0 + 30, 28, age === 2 || age === 6 ? '#ff4f7a' : '#3a2f3f', age === 2 || age === 6 ? 800 : 500, 'center');
          if (k > 0.5) plain('กลัวมากสุด', ax(4), Y0 - 44, 30, '#ff4f7a', 800, 'center');
          g.restore(); }
      }
      if (b === 's3') {
        const K = [TM('s3', 0, 0.06), TM('s3', 1, 0.32), TM('s3', 2, 0.58)];
        [['wawa', '6 เดือน+', 'ผลไม้สุก บดละเอียด', 0.75], ['nana', '1–3 ขวบ', 'ชิ้นนิ่ม หยิบกินเอง', 0.95], ['mama', '3 ขวบ+', 'ช่วยล้าง เลือกเอง', 1.1]].forEach(([k, l1, l2, dy], i) => { const a = U.clamp((t - K[i] - 0.35) / 0.3); if (a <= 0 || !S.c[k].visible) return; const [x, y] = pv(STEP[i][0], STEP[i][1] + [1.11, 1.43, 1.7][i] + 0.25, 0.2); card(U.clamp(x, REEL ? 255 : 195, REEL ? 795 : 885), y - 6, 318, l1, l2, a); });
      }
      if (b === 's4') {
        const p = ph('s4', t), a0 = U.clamp((p - 0.04) / 0.07);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 325 + PY, 960 - 2 * LD, 330, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['องุ่น มะเขือเทศจิ๋ว: ผ่า 4 ตามยาว', 'ผลไม้แข็ง เช่น แอปเปิล: ขูด หรือนึ่งให้นิ่ม', 'นั่งกินทุกครั้ง ไม่วิ่ง ไม่นอนกิน'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s4', i, 0.12 + i * 0.2)) / 0.35); if (a <= 0) return; const y = 385 + PY + i * 76; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(37 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ติดคอ หายใจไม่ออก โทร 1669 · ที่มา: AAP 2010, CDC', 540, 624 + PY, 27, 'rgba(255,255,255,.92)', 400, 'center'); g.restore();
        const a1 = U.clamp((p - 0.1) / 0.1); [['ทั้งลูก', false], ['ผ่า 4 ตามยาว', true]].forEach(([n, ok], i) => { const [x, y] = pv(TUBE[i], 3.72, 0); g.save(); g.globalAlpha = a1; txt(n, x - 20, y - 24, 38, ok ? '#7dffb0' : '#ffb3c0', 800); g.restore(); badge(x + (i ? 128 : 78), y - 26, ok, a1, 22); });
      }
      if (b === 's5') {
        const q = SP('s5', 0.5), p = ph('s5', t);
        if (t < q) { const [x, y] = wp(S.chom.userData.head, 1.0); bubble('หนูกินผลไม้แล้วนะ!', x + 60, y - 150, U.clamp((t - at('s5') - 0.4) / 0.3) * U.clamp((q - t) / 0.3), -40); }
        [['น้ำผลไม้', 'ใยอาหารหาย', '#ff8fab'], ['ผลไม้ทั้งลูก', 'ใยอาหารครบ', '#2fbf71']].forEach(([l1, l2, col], i) => { const a = U.clamp((t - TM('s5', i, 0.14 + i * 0.12)) / 0.3); const [x, y] = pv(PED[i], i ? 2.45 : 2.2, 0); card(Math.min(x, 900 - LD - (REEL ? 70 : 0)), y, 250, l1, l2, a, col); });
        if (t >= q) { const a0 = U.clamp((t - q) / 0.3); g.save(); g.globalAlpha = a0; rr(100 + LD, 440 + PY, 880 - 2 * LD, 296, 30, 'rgba(255,255,255,.94)', '#ff8fab'); g.restore();
          [['ก่อน 1 ขวบ', 'งดน้ำผลไม้'], ['1–3 ขวบ', 'ไม่เกิน 120 มล./วัน'], ['4–6 ขวบ', 'ไม่เกิน 120–180 มล./วัน']].forEach(([a1, v2], i) => { const a = U.clamp((t - q - 0.3 - i * 0.8) / 0.3); if (a <= 0) return; const y = 492 + PY + i * 92; g.save(); g.globalAlpha = a; rr(130 + LD, y - 34, 250, 68, 34, i ? '#ff9ec0' : '#ff6f91'); plain(a1, 255 + LD, y + 2, 36, '#ffffff', 800, 'center'); plain(v2, 410 + LD, y + 2, Math.round(40 * LF), '#3a2f3f', 700); g.restore(); }); }
      }
      if (b === 's6') {
        const q = SP('s6', 0.5), p = ph('s6', t);
        if (t < q) ['จับ', 'ดม', 'เลีย', 'ชิมคำจิ๋ว'].forEach((n, i) => { const a = U.clamp((t - TM('s6', i, 0.1 + i * 0.09)) / 0.3) * U.clamp((q - t) / 0.3); if (a <= 0) return; const W = [150, 150, 150, 250][i], X = [165, 345, 525, 755][i] + (REEL ? [30, 15, 0, -40][i] : 0); g.save(); g.globalAlpha = a; rr(X - W / 2, 470 + PY, W, 84, 42, 'rgba(255,255,255,.94)', '#ff8fab'); plain(n, X, 514 + PY, 40, '#ff4f7a', 800, 'center'); g.restore(); if (i < 3) { g.save(); g.globalAlpha = a; txt('›', X + W / 2 + 16, 510 + PY, 50, '#ffffff', 800); g.restore(); } });
        else { const a0 = U.clamp((t - q) / 0.3), n = Math.floor(U.lerp(0, 10.99, U.clamp((t - q - 0.3) / (dur('s6') * 0.32)))); g.save(); g.globalAlpha = a0; rr(90 + LD, 450 + PY, 900 - 2 * LD, 250, 30, 'rgba(255,255,255,.94)', '#ff8fab'); plain('ตารางชิมของนานะ', 150 + LD, 498 + PY, 34, '#3a2f3f', 700); plain('ครั้งที่ ' + Math.max(1, Math.min(10, n)), 930 - LD, 498 + PY, 38, '#ff4f7a', 800, 'right');
          for (let i = 0; i < 10; i++) { const cx = 150 + LD + i * ((780 - 2 * LD) / 9), cy = 604 + PY, on = i < n; g.beginPath(); g.arc(cx, cy, 33, 0, 7); g.fillStyle = on ? (i >= 7 ? '#2fbf71' : '#ffc94d') : '#f1e4ea'; g.fill(); if (on) { g.fillStyle = '#ffffff'; g.beginPath(); for (let j = 0; j < 10; j++) { const r = j % 2 ? 9 : 20, an = -PI / 2 + j * PI / 5; g.lineTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); } g.fill(); } else plain(String(i + 1), cx, cy + 2, 26, '#b79aa8', 600, 'center'); }
          g.restore(); if (n >= 10) { const [x, y] = wp(S.c.nana.userData.head, 0.95); bubble('อร่อยดีนี่!', x + 10, y - 30, U.clamp((end('s6') - 0.15 - t) / 0.3), -20); } }
      }
      if (b === 's7') {
        const p = ph('s7', t);
        [['กินให้ลูกเห็น', true], ['บังคับ', false], ['เอาขนมมาล่อ', false]].forEach(([n, ok], i) => { const a = U.clamp((t - TM('s7', i, 0.12 + i * 0.16)) / 0.3); if (a <= 0) return; const X = [215, 540, 850][i] + (REEL ? [40, 0, -70][i] : 0), W = [300, 220, 300][i]; g.save(); g.globalAlpha = a; rr(X - W / 2, 470 + PY, W, 130, 26, 'rgba(255,255,255,.94)', ok ? '#2fbf71' : '#ff8fab'); plain(n, X, 508 + PY, 34, '#3a2f3f', 700, 'center'); g.restore(); badge(X, 562 + PY, ok, a, 26); });
        if (p > 0.5) { const [x, y] = wp(S.c.nana.userData.head, 0.95); bubble('ขอชิมหน่อย!', x + 20, y - 34, U.clamp((p - 0.5) / 0.05) * U.clamp((end('s7') - 0.15 - t) / 0.3), -30); }
      }
      if (b === 's8') {
        const p = ph('s8', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320 + PY, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['เริ่มจากผลไม้สุก รสหวานอ่อน', 'วางคู่กับของที่ลูกชอบอยู่แล้ว', 'หั่นรูปสนุก ให้ลูกช่วยจัดจาน', 'ให้ตอนลูกหิว ก่อนขนม ไม่ใช่หลัง', 'พาลูกไปเลือกผลไม้เองที่ตลาด'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s8', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s8', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + PY + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[80, ['ลูกคายผลไม้ 3 ครั้ง', '#fff']], [62, ['แปลว่า "ไม่ชอบ" จริงเหรอ?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.52), y: 290, lines: [[60, ['ลองไม่กี่ครั้ง ลูกก็คายทิ้ง', '#fff']], [46, ['พ่อแม่ส่วนใหญ่ลองไม่เกิน 3–5 ครั้ง', '#ffe3ea', 600]]], foot: 'Carruth et al. 2004 (J Am Diet Assoc)' },
      { t0: SP('s1', 0.52) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[60, ['แล้วสรุปว่า "ลูกไม่ชอบ"', '#ffd35e']], [46, ['ยื่นขนมแทน ลูกเลยไม่ได้หัดอีก', '#fff', 600]]], foot: 'Carruth et al. 2004 (J Am Diet Assoc)' },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.55), y: 290, lines: [[60, ['ลิ้นเด็ก เกิดมาชอบ "หวาน"', '#fff']], [46, ['เปรี้ยว ขม ถูกปฏิเสธเองตามธรรมชาติ', '#ffe3ea', 600]]], foot: 'Beckerman et al. 2017 (Front Nutr)' },
      { t0: SP('s2', 0.55) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[60, ['2–6 ขวบ ', '#ffd35e'], ['กลัวของใหม่ที่สุด', '#fff']], [46, ['คายผลไม้ = เรื่องปกติ ไม่ใช่ดื้อ', '#ffe3ea', 600]]], foot: 'Lafraire et al. 2016 · Beckerman et al. 2017' },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[62, ['หัดกินผลไม้ ตามวัย', '#ffd35e']], [46, ['เนื้อสัมผัสเปลี่ยนตามการเคี้ยวของลูก', '#fff', 600]]], foot: 'เริ่มอาหารตามวัยเมื่ออายุ 6 เดือน (WHO · กรมอนามัย)' },
      { t0: at('s4') + 0.2, t1: end('s4') - 0.05, y: 250 + PY, lines: [[56, ['ก่อน 4 ขวบ ระวังผลไม้ติดคอ', '#ffd35e']]] },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[64, ['น้ำผลไม้ ≠ ผลไม้', '#ffd35e']], [46, ['ดื่มง่าย ได้น้ำตาลเกินไม่รู้ตัว', '#fff', 600]]], foot: 'AAP 2017: น้ำผลไม้ไม่มีข้อดีเหนือผลไม้ทั้งลูก' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[58, ['น้ำผลไม้ 100% ก็ต้องจำกัด', '#fff']], [46, ['ให้กินผลไม้เป็นชิ้น ดื่มน้ำเปล่า', '#ffe3ea', 600]]], foot: 'AAP 2017 (4 ออนซ์ ≈ 120 มล.)' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[60, ['ยังไม่ต้องกินหมดก็ได้', '#ffd35e']], [46, ['ให้ลูกค่อยๆ คุ้น ทีละขั้น', '#fff', 600]]], foot: 'Dazeley & Houston-Price 2015 (Appetite)' },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[58, ['ชิมซ้ำ ', '#fff'], ['8–10 ครั้งขึ้นไป', '#ffd35e']], [46, ['เด็กยอมรับผลไม้นั้นมากขึ้น', '#ffe3ea', 600]]], foot: 'งานทบทวนงานวิจัย USDA NESR 2019' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 290, lines: [[58, ['ลูกอยากลอง เมื่อเห็นเรากิน', '#ffd35e']], [46, ['บังคับหรือล่อด้วยขนม ยิ่งทำให้ไม่ชอบ', '#fff', 600]]], foot: 'Beckerman et al. 2017 (Front Nutr)' },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: 250 + PY, lines: [[58, ['5 ทิป หัดลูกกินผลไม้', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9'), y: 280, lines: [[56, ['คายวันนี้', '#fff']], [56, ['ไม่ได้แปลว่าไม่ชอบตลอดไป', '#ffd35e']], [40, ['ผลไม้แรกที่ลูกยอมกินคืออะไร? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: AAP, USDA NESR, Carruth 2004, Beckerman 2017' },
    ],
    trans,
    audio: [
      ...(DATA.vo ? [[end('cover') - 0.5, 'spit']] : [[0.35, 'spit'], [1.3, 'boing']]),
      [at('s1') + 0.5, 'spit'], [TM('s1', 0, 0.1), 'thud'], [TM('s1', 1, 0.22), 'thud'], [TM('s1', 2, 0.34), 'thud'], [SP('s1', 0.52), 'whoosh'], [SP('s1', 0.52) + 0.4, 'giggle'],
      [TM('s2', 0, 0.08) + 0.4, 'twinkle'], [TM('s2', 0, 0.08) + 0.9, 'heart'], [TM('s2', 1, 0.3) + 0.4, 'boing'], [TM('s2', 1, 0.3) + 0.6, 'warn'], [TM('s2', 2, 0.42) + 0.4, 'boing'], [SP('s2', 0.55), 'whoosh'], [SP('s2', 0.55) + 0.4, 'riser'],
      [TM('s3', 0, 0.06), 'pop'], [TM('s3', 1, 0.32), 'pop'], [TM('s3', 2, 0.58), 'pop'], [TM('s3', 2, 0.58) + 0.6, 'giggle'], [P('s3', 0.85), 'ding'],
      [at('s4') + 0.3, 'heartbeat'], [TM('s4', 0, 0.12), 'tick'], [TM('s4', 1, 0.32), 'tick'], [TM('s4', 2, 0.52), 'tick'], [P('s4', 0.72), 'heartbeat'],
      [at('s5') + 0.5, 'slurp'], [P('s5', 0.14), 'pop'], [P('s5', 0.26), 'ding'], [SP('s5', 0.5), 'whoosh'], [SP('s5', 0.5) + 0.3, 'warn'], [SP('s5', 0.5) + 1.1, 'pop'], [SP('s5', 0.5) + 1.9, 'pop'],
      [TM('s6', 0, 0.1), 'pop'], [TM('s6', 1, 0.19), 'pop'], [TM('s6', 2, 0.28), 'pop'], [TM('s6', 3, 0.37), 'pop'], [SP('s6', 0.5), 'shimmer'], [P('s6', 0.82), 'ding'], [P('s6', 0.86), 'giggle'],
      [TM('s7', 0, 0.12), 'ding'], [TM('s7', 1, 0.28), 'thud'], [TM('s7', 2, 0.44), 'thud'], [P('s7', 0.55), 'giggle'],
      [TM('s8', 0, 0.1), 'ding'], [TM('s8', 1, 0.27), 'tick'], [TM('s8', 2, 0.44), 'tick'], [TM('s8', 3, 0.61), 'tick'], [TM('s8', 4, 0.78), 'tick'],
      [at('s9') + 0.3, 'twinkle'], [at('s9') + 1.2, 'heart'], [P('s9', 0.32), 'crunch'], [at('s9') + 2.4, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(DATA.vo ? at('s1') + 0.2 : 0.8, at('s2'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s2'), at('s3'), MU(CK.MUSIC.OOPS)), CK.musicBed(at('s3'), at('s4'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s4'), at('s5'), MU(CK.MUSIC.NIGHT)), CK.musicBed(at('s5'), at('s6'), MU(CK.MUSIC.OOPS)), CK.musicBed(at('s6'), at('s9'), MU(CK.MUSIC.CUTE)), CK.musicBed(at('s9'), DUR - 1.5, MU(CK.MUSIC.WARM))],
  });
})();
