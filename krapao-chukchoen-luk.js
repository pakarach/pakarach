/* พ่อแม่หัวจะปวด — กระเป๋าฉุกเฉินของลูก เตรียมกี่วัน เท่าไหร่ (ปภ. 72 ชม. → 3/7/14 วัน กาชาด → 0–1 ของใช้ / 0–1 นม / 1–3 / 3–6 ใบจิ๋ว ≤10% / 6–12 จัดเอง → กันพลัดหลง (night) → 5 ทิป → ชวนแชร์ไอเทมเด็ด)
   Build: node build.js krapao-chukchoen-luk.js review-krapao-chukchoen-luk.html --kit clay --title "กระเป๋าฉุกเฉินของลูก เตรียมกี่วัน เท่าไหร่" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 10], ['s2', 9], ['s3', 9], ['s4', 8.5], ['s5', 8.5], ['s6', 8], ['s7', 9], ['s8', 9.5], ['s9', 7], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's9'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const AX = 60; /* packing stage */
  const AGE = ['s2', 's3', 's4', 's5', 's6'];
  const SH = {
    cover: [[0, FW(0, 0.3, 6.9, 4.35 - 0.6 * R1, 0.2)], [1, FW(0, 0.3, 6.6, 4.35 - 0.6 * R1, 0.2)]],
    s1: [[0, FW(0.1, 0, 7.6, 5.35 - 0.4 * R1, 0.2)], [1, FW(0.1, 0, 7.3, 5.35 - 0.4 * R1, 0.2)]],
    s7: [[0, FW(0.1, 0, 8.6, 6.9 - 2.2 * R1, 0.2)], [1, FW(0.1, 0, 8.3, 6.9 - 2.2 * R1, 0.2)]],
    s8: [[0, FW(0.3 + 0.4 * R1, 0, 9.6, 6.6 - 2.3 * R1, 0.3)], [1, FW(0.3 + 0.4 * R1, 0, 9.3, 6.6 - 2.3 * R1, 0.3)]],
    s9: [[0, FW(0.2 + 0.4 * R1, 0, 9.0, 4.6 - 0.7 * R1, 0.2)], [1, FW(0.2 + 0.4 * R1, 0, 8.4, 4.6 - 0.7 * R1, 0.2)]],
  };
  for (const id of AGE) SH[id] = [[0, FW(AX + 0.1 - 0.2 * R1, 0, 6.7 + 0.6 * R1, 3.75 - 0.3 * R1, 0.13)], [1, FW(AX + 0.1 - 0.2 * R1, 0, 6.45 + 0.6 * R1, 3.75 - 0.3 * R1, 0.13)]];
  const CUT = new Set(ORDER.filter((k) => k !== 'cover'));
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id); SH[id].forEach(([f, sh], i) => { CAM.push(Object.assign({ t: i === 0 ? t0 : end(id) }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };

  /* item rows per age scene: [name, qty, prop kind, prop colour] */
  const ROWS = {
    s2: [['ผ้าอ้อม วันละ 8–10 ชิ้น', '24–30 ชิ้น', 'pack', '#79dcb4'], ['ทิชชูเปียก', '2 ห่อ', 'pack', '#5ab8ff'], ['ครีมกันผื่น + ถุงใส่ผ้าอ้อมใช้แล้ว', '1 ชุด', 'can', '#ff8fab'], ['ชุดเปลี่ยน + ผ้าห่อตัว', 'เผื่อไซซ์', 'coat', '#ffd23f']],
    s3: [['กินนมแม่', 'ให้ต่อได้เลย', 'heart', '#ff6f91'], ['นมผง 6–12 เดือน ~4 มื้อ/วัน', '12 มื้อ', 'can', '#ffd23f'], ['น้ำดื่มขวด สำหรับชงนม', 'พอ 12 มื้อ', 'bottle', '#5ab8ff'], ['ขวดนมสะอาด + จุกหลอกสำรอง', 'ตามมื้อ', 'bottle', '#ffffff']],
    s4: [['ผ้าอ้อม / กางเกงผ้าอ้อม', 'ที่ใช้ต่อวัน × 3', 'pack', '#79dcb4'], ['อาหารพร้อมกิน 3 มื้อ/วัน', '9 มื้อ', 'pouch', '#ff9a4d'], ['แก้วหัดดื่ม + ช้อน', '1 ชุด', 'cup', '#b9a4f0'], ['ของปลอบใจ ตุ๊กตา ผ้าเน่า', '1 ชิ้น', 'teddy', '#c98a5a']],
    s5: [['ขนมที่ลูกกินจริง', '3 วัน', 'pouch', '#ff6f6f'], ['สมุดระบายสี + สี', '1 ชุด', 'book', '#b9a4f0'], ['ไฟฉายเล็ก', '1 กระบอก', 'torch', '#ffd23f'], ['นกหวีด ห้อยกระเป๋า', '1 อัน', 'whistle', '#ff8fab']],
    s6: [['น้ำดื่มขวดเล็ก + ขนม', 'พกเอง', 'bottle', '#5ab8ff'], ['เสื้อกันฝน + เสื้อผ้าสำรอง', '1 ชุด', 'coat', '#ffd23f'], ['หนังสือ เกมที่ไม่ใช้ไฟ', '1–2 อย่าง', 'book', '#79dcb4'], ['เบอร์โทรพ่อแม่', 'จำให้ได้', 'card', '#ffffff']],
  };
  const RF = (i) => 0.1 + i * 0.17;
  const BAGC = { s2: '#ff8fab', s3: '#ff8fab', s4: '#57c9a0', s5: '#ff6f6f', s6: '#5a8fe8' }, BAGS = { s2: 1.0, s3: 1.0, s4: 1.05, s5: 0.72, s6: 1.12 };
  const KID = { s2: ['wawa', 0.75], s3: ['wawa', 0.75], s4: ['nana', 0.5], s5: ['mama', 0.22], s6: ['kluay', 0] };

  VE.run({
    DUR, file: 'krapao-chukchoen-luk', title: 'กระเป๋าฉุกเฉินของลูก เตรียมกี่วัน เท่าไหร่', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'เตรียมพร้อม', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const box = (w, h, d, c, x, y, z, par) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), M(c)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const cyl = (r, h, c, x, y, z, par, seg) => { const m = new T.Mesh(new T.CylinderGeometry(r, r, h, seg || 24), M(c)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const sph = (r, c, x, y, z, par) => { const m = new T.Mesh(new T.SphereGeometry(r, 20, 14), M(c)); m.position.set(x, y, z); (par || scene).add(m); return m; };
      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      /* backpack: body colour material returned for recolouring */
      const mkBag = (c) => { const g = new T.Group(), bm = M(c); const body = new T.Mesh(new T.BoxGeometry(1.2, 1.25, 0.7), bm); body.position.y = 0.63; g.add(body);
        const top = new T.Mesh(new T.SphereGeometry(0.6, 20, 12, 0, PI * 2, 0, PI / 2), bm); top.scale.set(1, 0.6, 0.6); top.position.y = 1.25; g.add(top);
        box(0.85, 0.55, 0.16, '#ffffff', 0, 0.42, 0.4, g); box(0.85, 0.1, 0.18, '#ffd23f', 0, 0.62, 0.4, g);
        const cr = new T.Group(); box(0.34, 0.11, 0.05, '#ff5f6d', 0, 0, 0, cr); box(0.11, 0.34, 0.05, '#ff5f6d', 0, 0, 0, cr); cr.position.set(0, 0.36, 0.5); g.add(cr);
        const hd = new T.Mesh(new T.TorusGeometry(0.2, 0.05, 8, 20, PI), M('#3a2f3f')); hd.position.y = 1.6; g.add(hd);
        for (const sx of [-0.66, 0.66]) box(0.12, 1.0, 0.5, '#3a2f3f', sx, 0.6, -0.05, g);
        g.userData.mat = bm; return g; };
      const mkProp = (kind, c) => { const g = new T.Group();
        if (kind === 'pack') { box(0.62, 0.5, 0.36, c, 0, 0.25, 0, g); box(0.64, 0.14, 0.38, '#ffffff', 0, 0.27, 0, g); }
        else if (kind === 'can') { cyl(0.22, 0.5, c, 0, 0.25, 0, g); cyl(0.23, 0.08, '#ffffff', 0, 0.52, 0, g); }
        else if (kind === 'bottle') { cyl(0.17, 0.5, c, 0, 0.25, 0, g); cyl(0.1, 0.14, '#ff8fab', 0, 0.57, 0, g); cyl(0.175, 0.12, '#ffd23f', 0, 0.25, 0, g); }
        else if (kind === 'coat') { box(0.6, 0.2, 0.42, c, 0, 0.1, 0, g); box(0.6, 0.2, 0.42, '#ff8fab', 0, 0.3, 0, g); box(0.6, 0.06, 0.44, '#ffffff', 0, 0.2, 0, g); }
        else if (kind === 'heart') { for (const sx of [-0.13, 0.13]) sph(0.19, c, sx, 0.42, 0, g); const b = new T.Mesh(new T.ConeGeometry(0.3, 0.38, 20), M(c)); b.rotation.x = PI; b.position.y = 0.2; g.add(b); }
        else if (kind === 'pouch') { box(0.46, 0.56, 0.2, c, 0, 0.28, 0, g); box(0.28, 0.2, 0.22, '#ffffff', 0, 0.3, 0, g); cyl(0.07, 0.12, '#ffffff', 0, 0.62, 0, g); }
        else if (kind === 'cup') { cyl(0.2, 0.36, c, 0, 0.18, 0, g); cyl(0.21, 0.1, '#ffd23f', 0, 0.4, 0, g); cyl(0.06, 0.14, '#ffffff', 0.08, 0.5, 0, g); }
        else if (kind === 'teddy') { sph(0.24, c, 0, 0.24, 0, g); sph(0.2, c, 0, 0.58, 0, g); for (const sx of [-0.15, 0.15]) sph(0.08, c, sx, 0.76, 0, g); sph(0.08, '#ffe3c9', 0, 0.54, 0.16, g); for (const sx of [-0.07, 0.07]) sph(0.03, '#3a2f3f', sx, 0.63, 0.17, g); }
        else if (kind === 'book') { box(0.56, 0.1, 0.44, c, 0, 0.05, 0, g); box(0.5, 0.06, 0.4, '#ffffff', 0, 0.1, 0.01, g); box(0.56, 0.05, 0.44, c, 0, 0.15, 0, g); const p = cyl(0.04, 0.5, '#ff6f6f', 0.05, 0.22, 0.1, g); p.rotation.z = PI / 2 - 0.3; }
        else if (kind === 'torch') { const b = cyl(0.11, 0.5, c, -0.05, 0.14, 0, g); b.rotation.z = PI / 2; const h = cyl(0.17, 0.16, '#ffffff', 0.27, 0.14, 0, g); h.rotation.z = PI / 2; sph(0.1, '#fff3a8', 0.36, 0.14, 0, g); }
        else if (kind === 'whistle') { cyl(0.17, 0.16, c, 0, 0.17, 0, g).rotation.x = PI / 2; box(0.34, 0.12, 0.14, c, 0.2, 0.26, 0, g); const r = new T.Mesh(new T.TorusGeometry(0.09, 0.03, 8, 16), M('#ffd23f')); r.position.set(-0.2, 0.2, 0); g.add(r); }
        else if (kind === 'card') { const cd = box(0.62, 0.42, 0.05, c, 0, 0.3, 0, g); cd.rotation.x = -0.35; const s1 = box(0.4, 0.06, 0.02, '#5ab8ff', 0, 0.37, 0.05, g); s1.rotation.x = -0.35; const s2 = box(0.4, 0.06, 0.02, '#ff8fab', 0, 0.26, 0.09, g); s2.rotation.x = -0.35; }
        return g; };

      /* ===== stage 0: home ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      const bigBag = mkBag('#5a8fe8'); bigBag.scale.setScalar(1.45); bigBag.position.set(0, 0, -0.75); scene.add(bigBag);
      const trio = [mkBag('#ff8fab'), mkBag('#57c9a0'), mkBag('#ff6f6f')]; trio.forEach((b, i) => { b.scale.setScalar([0.62, 0.8, 1.0][i]); b.position.set([-0.75, 0, 0.85][i], 1.5, -1.3); scene.add(b); });
      const shelf = box(3.0, 1.5, 0.8, '#c98f5f', 0.05, 0.75, -1.3); const shelfTop = box(3.2, 0.1, 0.95, '#7fb6ef', 0.05, 1.5, -1.3);
      const mk = (g, base) => { g.userData.base = base || g.scale.x; scene.add(g); return g; };
      const C = { dad: mk(CK.family(T, 'dad')), mom: mk(CK.family(T, 'mom')), mama: mk(CK.family(T, 'mama')), nana: mk(CK.family(T, 'nana')), wawa: mk(CK.family(T, 'wawa')) };
      C.kluay = mk(CK.neighbor(T, 0, { scale: 1.08, top: '#ffd23f', bottom: '#5a6fd6', hairStyle: 'short', hair: '#2b2b33' }), 1.08);
      /* name card + whistle on mama (night) */
      const idCard = new T.Group(); box(0.5, 0.36, 0.04, '#ffffff', 0, 0, 0, idCard); box(0.34, 0.05, 0.02, '#5ab8ff', 0, 0.06, 0.03, idCard); box(0.34, 0.05, 0.02, '#ff8fab', 0, -0.05, 0.03, idCard); box(0.5, 0.07, 0.05, '#ffd23f', 0, 0.2, 0, idCard); scene.add(idCard);
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.3, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }

      /* ===== stage A: packing table (x = 60) ===== */
      { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M('#f0a868')); p.position.set(AX, -0.15, 6); scene.add(p); const w = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT('#ffe0b8', '#ffffff', [8, 4]) })); w.position.set(AX, 4.5, -4); scene.add(w); }
      box(3.9, 0.9, 1.3, '#c98f5f', AX + 1.15, 0.45, 0); box(4.1, 0.12, 1.5, '#7fb6ef', AX + 1.15, 0.96, 0);
      const stool = cyl(0.62, 1, '#b9a4f0', AX - 2.25, 0.5, 0.35, null, 32);
      const aBag = mkBag('#ff8fab'); aBag.position.set(AX + 2.35, 1.02, -0.1); scene.add(aBag);
      const props = {}; for (const id of AGE) props[id] = ROWS[id].map((r, i) => { const g = mkProp(r[2], r[3]); g.position.set(AX - 0.45 + i * 0.66, 1.02, 0.25 - (i % 2) * 0.3); g.visible = false; scene.add(g); return g; });
      return { key, hemi, room, C, hearts, bigBag, trio, shelf, shelfTop, stool, aBag, props, idCard };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);
      const home = !AGE.includes(bt);
      s.bigBag.visible = bt === 'cover' || bt === 's1';
      const trioOn = bt === 's8' || bt === 's9'; s.shelf.visible = s.shelfTop.visible = trioOn; s.trio.forEach((b, i) => { b.visible = trioOn; b.rotation.y = 0.12 * Math.sin(t * 1.3 + i); });
      s.bigBag.rotation.y = 0.08 * Math.sin(t * 1.5);

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'kluay'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      let heartsOn = false, cardOn = false;
      if (home) {
        const cov = bt === 'cover', s1 = bt === 's1', ngt = bt === 's7', fin = bt === 's9';
        const calm = s1 && t > SP('s1', 0.45);
        def('mom', -1.9, -0.7, cov || ngt || (s1 && !calm) ? 'worried' : 'happy', { ry: 0.15 });
        def('dad', 1.95, -0.7, cov || ngt || (s1 && !calm) ? 'worried' : 'happy', { ry: -0.15, wave: fin && ph('s9', t) > 0.3, a1: cov ? [-2.1 - 0.12 * Math.sin(t * 8), 0.6] : null, a2: cov ? [2.1 + 0.12 * Math.sin(t * 8), 0.6] : null });
        def('nana', -1.6, 1.4, ngt ? 'worried' : fin ? 'giggle' : 'happy', { y: fin ? Math.abs(Math.sin(t * 5 + 1)) * 0.1 : 0 });
        def('mama', 0, 1.4, ngt ? 'happy' : cov ? 'worried' : 'giggle', { y: fin || bt === 's8' ? Math.abs(Math.sin(t * 6)) * 0.14 : 0, wave: fin && ph('s9', t) > 0.3, a2: ngt ? [0.5, -1.0] : null });
        def('wawa', 1.45, 1.4, cov ? 'cry' : ngt ? 'worried' : 'happy', { y: cov ? Math.abs(Math.sin(t * 7)) * 0.06 : 0, a1: cov ? [-1.9, 0.4] : null, a2: cov ? [1.9 + 0.2 * Math.sin(t * 9), 0.4] : null });
        if (fin) heartsOn = true;
        cardOn = ngt;
      } else {
        const [k, h] = KID[bt], p = ph(bt, t), last = t > TM(bt, 3, RF(3)) + 0.3;
        def(k, AX - 2.25, 0.35, last ? 'giggle' : 'happy', { y: h + (last ? Math.abs(Math.sin(t * 6)) * 0.1 : 0), ry: 0.4, wave: p < 0.2, a2: p >= 0.2 ? [0.9 + 0.1 * Math.sin(t * 4), -0.9] : null });
        s.stool.visible = h > 0.05; s.stool.scale.y = Math.max(0.05, h); s.stool.position.y = h / 2;
        s.aBag.userData.mat.color.set(BAGC[bt]); s.aBag.scale.setScalar(BAGS[bt]); s.aBag.rotation.y = -0.25 + 0.06 * Math.sin(t * 2);
      }
      for (const id of AGE) s.props[id].forEach((g, i) => { const a = id === bt ? U.clamp((t - TM(id, i, RF(i))) / 0.35) : 0; g.visible = a > 0.02; if (!g.visible) return; g.scale.setScalar(1.25 * Math.max(0.01, U.easeBack(a))); g.position.y = 1.02 + 0.5 * Math.sin(a * PI) + 0.03 * Math.sin(t * 3 + i); g.rotation.y = 0.3 * Math.sin(t * 1.2 + i * 2); });
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base);
      }
      s.idCard.visible = cardOn;
      if (cardOn) { C.mama.updateMatrixWorld(true); C.mama.userData.hand1.getWorldPosition(V4); s.idCard.position.set(V4.x + 0.1, V4.y + 0.1, V4.z + 0.25); s.idCard.scale.setScalar(1.5); s.idCard.rotation.z = 0.1 * Math.sin(t * 2); }
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - at('s9') - 0.6 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(0.1 + u[0], 3.4 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });
      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's7') return ['#3a3570', '#6a4a80']; if (b === 's2' || b === 's3') return ['#ffd1e3', '#fff4e6']; if (b === 's4') return ['#b8ecd0', '#f0fff4']; if (b === 's5') return ['#ffd8a8', '#fff4e6']; if (b === 's6') return ['#a8c8ff', '#e3eeff']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = lw || 4; g.strokeStyle = stroke; g.stroke(); } };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const C = S.C;
      if (b === 'cover') { const [x, y] = wp(C.dad.userData.head, 0, 1.3); bubble('ของลูกอยู่ไหน?!', x - 60, y - 60, U.clamp((t - 0.25) / 0.3), 46); }
      /* s1: 72h counter -> 3 / 7 / 14 cards */
      if (b === 's1') { const q = SP('s1', 0.45), y0 = REEL ? 480 : 500;
        const a1 = U.clamp((t - at('s1') - 0.5) / 0.3) * U.clamp((q - t) / 0.25);
        if (a1 > 0) { const n = Math.round(72 * U.easeIO(U.clamp((t - at('s1') - 0.6) / 1.6))); g.save(); g.globalAlpha = a1; rr(190, y0, 700, 250, 36, 'rgba(255,255,255,.94)', '#ff8fab', 5); plain(String(n), 430, y0 + 128, 170, '#ff5f86', 800, 'center'); plain('ชั่วโมง', 690, y0 + 96, 58, '#3a2f3f', 700, 'center'); plain('= 3 วันแรก', 690, y0 + 166, 44, '#c77a1f', 700, 'center'); g.restore(); }
        const cw = (920 - 2 * LD) / 3, NUM = ['3', '7', '14'], LB = ['กระเป๋า', 'ยาประจำตัว', 'ของสำรองที่บ้าน'], SUB = ['คว้าแล้วออก', 'เผื่อไว้ในกระเป๋า', 'กรณีต้องอยู่บ้าน'], COL = ['#ff5f86', '#ff9a2e', '#3fa56f'];
        for (let i = 0; i < 3; i++) { const a = U.clamp((t - q - 0.1 - TM('s1', i, 0) * 0 - i * (MK.s1 ? 0 : 0.9)) / 0.3) * (MK.s1 ? U.clamp((t - TM('s1', i, 0)) / 0.3) : 1); if (a <= 0) continue; const x = 80 + LD + i * cw + cw / 2;
          g.save(); g.globalAlpha = a; rr(x - cw / 2 + 10, y0, cw - 20, 270, 28, 'rgba(255,255,255,.94)', COL[i], 5);
          plain(NUM[i], x - 26, y0 + 86, 120, COL[i], 800, 'center'); plain('วัน', x + (i === 2 ? 92 : 62), y0 + 108, 40, '#3a2f3f', 700, 'center');
          plain(LB[i], x, y0 + 186, Math.round(38 * LF), '#3a2f3f', 800, 'center'); plain(SUB[i], x, y0 + 232, Math.round(27 * LF), '#7a6a7a', 600, 'center'); g.restore(); } }
      /* age scenes: checklist with quantities */
      if (AGE.includes(b)) { const rows = ROWS[b], rh = REEL ? 100 : 108, x0 = 40 + LD, w = REEL ? 870 : 1000, y0 = REEL ? 478 : 460, a0 = U.clamp((ph(b, t) - 0.03) / 0.05);
        g.save(); g.globalAlpha = a0; rr(x0, y0, w, rows.length * rh + 28, 30, 'rgba(255,255,255,.93)', BAGC[b], 5); g.restore();
        let cur = -1; rows.forEach((r, i) => { if (t >= TM(b, i, RF(i))) cur = i; });
        rows.forEach((r, i) => { const a = U.clamp((t - TM(b, i, RF(i))) / 0.3); if (a <= 0) return; const y = y0 + 14 + rh * i + rh / 2;
          g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(x0 + 14, y - 46, w - 28, 92, 46, '#ffe9f0');
          g.beginPath(); g.arc(x0 + 62, y, 31, 0, 7); g.fillStyle = BAGC[b]; g.fill(); plain(String(i + 1), x0 + 62, y + 2, 36, '#ffffff', 800, 'center');
          g.font = '800 ' + Math.round(38 * LF) + 'px Kanit,sans-serif'; const pw = g.measureText(r[1]).width + 44, px = x0 + w - 28 - pw;
          rr(px, y - 35, pw, 70, 35, '#ffd35e'); plain(r[1], px + pw / 2, y + 2, Math.round(38 * LF), '#3a2f3f', 800, 'center');
          let fs = Math.round(42 * LF); g.font = '700 ' + fs + 'px Kanit,sans-serif'; const av = px - (x0 + 108) - 14, tw = g.measureText(r[0]).width; if (tw > av) fs = Math.floor(fs * av / tw);
          plain(r[0], x0 + 108, y + 2, fs, '#3a2f3f', i === cur ? 700 : 600); g.restore(); });
        if (b === 's5') { const a = U.clamp((t - TM('s5', 4, 0.8)) / 0.3); if (a > 0) { g.save(); g.globalAlpha = a; const [x, y] = wp(C.mama.userData.head, 0, 1.0); bubble('หนูแบกเองได้!', x + 40, y - 30, a, 38); g.restore(); } } }
      /* s7: keep-together list (night) */
      if (b === 's7') { g.save(); g.translate(0, REEL ? 38 : 0); const p = ph('s7', t), a0 = U.clamp((p - 0.03) / 0.08);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 330, 980 - 2 * LD, 560, 30, 'rgba(25,18,50,.72)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['บัตรชื่อลูก + ชื่อพ่อแม่ + เบอร์โทร', 'รูปครอบครัวล่าสุด', 'ยาประจำตัวลูก เผื่อ 7 วัน', 'สำเนาสมุดวัคซีน ใส่ถุงซิปกันน้ำ', 'นัดจุดเจอกัน ถ้าพลัดหลง'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.1 + i * 0.13)) / 0.35); if (a <= 0) return; const y = 398 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(112 + LD, y, 27, 0, 7); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 112 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 156 + LD, y + 2, Math.round(40 * LF), '#ffffff', 600); g.restore(); });
        const a5 = U.clamp((t - TM('s7', 5, 0.78)) / 0.3); g.save(); g.globalAlpha = a5; rr(80 + LD, 786, 920 - 2 * LD, 64, 32, 'rgba(255,211,94,.96)'); plain('สายด่วน ปภ. 1784  ·  เจ็บป่วยฉุกเฉิน 1669', 540, 820, Math.round(34 * LF), '#3a2f3f', 700, 'center'); g.restore();
        g.save(); g.globalAlpha = a0; plain('ที่มา: กาชาดสหรัฐฯ, AAP, ปภ.', 540, 866, 24, 'rgba(255,255,255,.9)', 400, 'center'); g.restore(); g.restore(); }
      /* s8: tips */
      if (b === 's8') { g.save(); g.translate(0, REEL ? 38 : 0); const p = ph('s8', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['กระเป๋ากันน้ำ น้ำหนักเบา วางใกล้ประตู', 'กระเป๋า 3 วัน · ยา 7 วัน · ที่บ้าน 2 สัปดาห์', 'เช็กทุก 6 เดือน ส่วนนมผงเช็กทุกเดือน', 'ลูกโตไว เปลี่ยนไซซ์ผ้าอ้อมและเสื้อผ้า', 'ให้ลูกช่วยจัด แล้วซ้อมคว้ากระเป๋าออกจากบ้าน'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s8', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s8', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center');
          let fs = Math.round(36 * LF); g.font = '800 ' + fs + 'px Kanit,sans-serif'; const av = 800 - 2 * LD, tw = g.measureText(s2).width; if (tw > av) fs = Math.floor(fs * av / tw);
          plain(s2, 166 + LD, y + 2, fs, '#3a2f3f', i === cur ? 800 : 600); g.restore(); }); g.restore(); }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[80, ['กระเป๋าฉุกเฉินของลูก', '#fff']], [74, ['เตรียมกี่วัน เท่าไหร่?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: SP('s1', 0.45), y: 290, lines: [[56, ['ไทยแนะนำให้พอใช้ ', '#fff'], ['72 ชั่วโมง', '#ffd35e']], [44, ['ช่วงที่อาจต้องพึ่งตัวเองก่อน', '#ffe3ea', 600]]], foot: 'ปภ. ย้ำ: 3 วันไม่ได้แปลว่าความช่วยเหลือจะมาถึงทันแน่นอน (พ.ย. 2569)' },
      { t0: SP('s1', 0.45) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[56, ['แล้วจริงๆ ควรเตรียมกี่วัน?', '#fff']], [48, ['คิดเป็น 3 ระดับ', '#ffd35e', 700]]], foot: 'อพยพ 3 วัน · ยา 7 วัน · อยู่บ้าน 2 สัปดาห์ (กาชาดสหรัฐฯ)' },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 290, lines: [[62, ['0–1 ขวบ ', '#ffd35e'], ['ของใช้ 3 วัน', '#fff']], [44, ['ผ้าอ้อมคือของที่หมดไวที่สุด', '#ffe3ea', 600]]], foot: '8–10 ชิ้น/วัน: เกณฑ์ศูนย์พักพิงรัฐฟลอริดา · รายการ: CDC' },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[62, ['0–1 ขวบ ', '#ffd35e'], ['เรื่องนม', '#fff']], [44, ['นับมื้อที่ลูกกินจริงต่อวัน แล้วคูณ 3', '#ffe3ea', 600]]], foot: 'นมสูตรพร้อมดื่ม ปลอดภัยที่สุดถ้าหาได้ (CDC) · 4 มื้อ/วัน: รัฐควีนส์แลนด์' },
      { t0: at('s4') + 0.2, t1: end('s4') - 0.05, y: 290, lines: [[62, ['1–3 ขวบ', '#ffd35e']], [44, ['ของกินที่คุ้น + ของปลอบใจ 1 ชิ้น', '#ffe3ea', 600]]], foot: 'ของปลอบใจและของเล่นเด็ก อยู่ในรายการของ Ready.gov' },
      { t0: at('s5') + 0.2, t1: end('s5') - 0.05, y: 290, lines: [[60, ['3–6 ขวบ ', '#ffd35e'], ['ใบจิ๋วของตัวเอง', '#fff']], [44, ['หนัก 16 กก. กระเป๋าไม่เกิน 1.6 กก.', '#ffe3ea', 600]]], foot: 'กระเป๋าเด็กไม่ควรเกิน 10–15% ของน้ำหนักตัว (AAP)' },
      { t0: at('s6') + 0.2, t1: end('s6') - 0.05, y: 290, lines: [[60, ['6–12 ขวบ ', '#ffd35e'], ['จัดเองได้แล้ว', '#fff']], [44, ['พี่กล้วย 9 ขวบ จัดตามเช็กลิสต์', '#ffe3ea', 600]]], foot: 'น้ำดื่มทั้งบ้าน 3 ลิตร/คน/วัน ให้ผู้ใหญ่เป็นคนแบก (ปภ.)' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: REEL ? 282 : 250, lines: [[54, ['ทุกวัยต้องมี: กันพลัดหลง', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: end('s8') - 0.05, y: REEL ? 282 : 250, lines: [[56, ['5 ข้อ ให้กระเป๋าพร้อมใช้จริง', '#ffd35e']]] },
      { t0: at('s9') + 0.2, t1: end('s9'), y: 280, lines: [[52, ['หวังว่าจะไม่ได้ใช้ แต่มีแล้วอุ่นใจ', '#fff']], [46, ['บ้านไหนเตรียมกระเป๋าฉุกเฉินให้ลูกแล้ว', '#ffd35e']], [46, ['มาแชร์ไอเทมเด็ดกันหน่อย', '#ffd35e']]], foot: 'ข้อมูล: ปภ., กาชาดสหรัฐฯ, CDC, AAP, Ready.gov' },
    ],
    trans,
    audio: [
      [0.3, 'boing'], [0.7, 'warn'],
      [at('s1') + 0.6, 'riser'], [at('s1') + 2.2, 'ding'], [SP('s1', 0.45) + 0.1, 'pop'], [SP('s1', 0.45) + 1.0, 'pop'], [SP('s1', 0.45) + 1.9, 'pop'],
      ...AGE.flatMap((id) => [[at(id) + 0.3, 'whoosh'], ...[0, 1, 2, 3].map((i) => [TM(id, i, RF(i)), 'pop']), [TM(id, 3, RF(3)) + 0.5, 'ding']]),
      [TM('s5', 4, 0.8), 'giggle'],
      [at('s7') + 0.4, 'heartbeat'], [at('s7') + 1.5, 'heartbeat'], ...[0, 1, 2, 3, 4].map((i) => [TM('s7', i, 0.1 + i * 0.13), 'tick']), [TM('s7', 5, 0.78), 'warn'],
      [TM('s8', 0, 0.1), 'ding'], ...[1, 2, 3, 4].map((i) => [TM('s8', i, 0.1 + i * 0.17), 'tick']),
      [at('s9') + 0.3, 'twinkle'], [at('s9') + 1.2, 'heart'], [at('s9') + 2.0, 'giggle'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s7'), CK.MUSIC.CUTE), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
