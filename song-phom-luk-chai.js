/* พ่อแม่หัวจะปวด — ทรงผมลูกชาย ทรงไหนดี ดัด ยืด ย้อม ได้ไหม (ตัดครั้งแรก 8 ด.–2 ขวบ + ผมไฟ / บันไดวัย / กฎ ศธ. 2563-2566-2568 / กลไกเกล็ดผม + PPD / ฉลาก 16 ปี + ไหม้ 5 ใน 8 / พี่ฝรั่งย้อมเอง (night) / พบแพทย์ถ้า / ทางเลือกล้างออกได้ / 5 ทิป)
   Build: node build.js song-phom-luk-chai.js review-song-phom-luk-chai.html --kit clay --title "ทรงผมลูกชาย ดัด ยืด ย้อม ได้ไหม" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 9], ['s2', 9.5], ['s3', 7], ['s4', 9], ['s5', 9], ['s6', 6.5], ['s7', 7], ['s8', 9], ['s9', 9], ['s10', 6], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1, R1 = REEL ? 1 : 0;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's10'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const LX = -60, NX = 60, RX = 120, MX = 180;
  const SH = {
    cover: [[0, FW(0, 0, 7.4, 4.3 - 0.6 * R1, 0.16)], [1, FW(0, 0, 7.0, 4.3 - 0.6 * R1, 0.16)]],
    s1: [[0, FW(NX, 0, 6.2, 3.9 - 1.4 * R1, 0.12)], [1, FW(NX, 0, 6.0, 3.9 - 1.4 * R1, 0.12)]],
    s2: [[0, FW(LX, 0, 6.4, 3.95 - 1.5 * R1, 0.12)], [1, FW(LX, 0, 6.2, 3.95 - 1.5 * R1, 0.12)]],
    s3: [[0, FW(RX, 0, 5.6, 3.3 - 0.9 * R1, 0.12)], [1, FW(RX, 0, 5.3, 3.3 - 0.9 * R1, 0.12)]],
    s4: [[0, FW(MX, 0, 8.0, 4.9 - 1.3 * R1, 0.12)], [1, FW(MX, 0, 7.6, 4.9 - 1.3 * R1, 0.12)]],
    s5: [[0, FW(RX, 0, 7.4, 3.9 - 1.0 * R1, 0.12)], [1, FW(RX, 0, 7.1, 3.9 - 1.0 * R1, 0.12)]],
    s6: [[0, FW(0, 0, 6.4, 4.2 - 0.8 * R1, 0.14)], [1, FW(0, 0, 6.1, 4.2 - 0.8 * R1, 0.14)]],
    s7: [[0, FW(0, 0, 6.6, 4.3, 0.14)], [1, FW(0, 0, 6.4, 4.3, 0.14)]],
    s8: [[0, FW(0, 0, 7.4, 4.1 - 0.9 * R1, 0.16)], [1, FW(0, 0, 7.1, 4.1 - 0.9 * R1, 0.16)]],
    s9: [[0, FW(0.3 + 0.4 * R1, 0, 9.6, 6.6, 0.3)], [1, FW(0.3 + 0.4 * R1, 0, 9.3, 6.6, 0.3)]],
    s10: [[0, FW(0.2 + 0.4 * R1, 0, 9.0, 4.4 - 0.7 * R1, 0.2)], [1, FW(0.2 + 0.4 * R1, 0, 8.4, 4.4 - 0.7 * R1, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's8', 's9', 's10']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s6') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };
  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const TOK = [[-2.1, 2.3], [-0.7, 2.3], [0.7, 2.3], [2.1, 2.3], [-2.1, 0.75], [-0.7, 0.75], [0.7, 0.75], [2.1, 0.75]], KIDTOK = [0, 2, 3, 5, 6];
  const NC = 7; /* cuticle rings */

  VE.run({
    DUR, file: 'song-phom-luk-chai', title: 'ทรงผมลูกชาย ดัด ยืด ย้อม ได้ไหม', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ทรงผมลูกชาย', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: barber shop / home ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.5, props: false }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); { const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(0.2, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(0.2, 1.0, -3.7); sofa.add(seat, back); } scene.add(sofa);
      const shop = new T.Group(); {
        const fr = new T.Mesh(new T.BoxGeometry(2.7, 2.3, 0.12), M('#ffb347')); fr.position.set(-0.4, 3.2, -4.3); shop.add(fr);
        const pane = new T.Mesh(new T.PlaneGeometry(2.4, 2.0), new T.MeshBasicMaterial({ color: '#bfe6ff' })); pane.position.set(-0.4, 3.2, -4.22); shop.add(pane);
        const gl = new T.Mesh(new T.PlaneGeometry(0.18, 1.5), new T.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.7 })); gl.position.set(-1.1, 3.25, -4.2); gl.rotation.z = -0.5; shop.add(gl);
        const sh = new T.Mesh(new T.BoxGeometry(3.2, 0.16, 0.6), M('#c58f5f')); sh.position.set(-0.4, 1.75, -4.0); shop.add(sh);
        [['#ff6f91', -1.4], ['#5ab8ff', -1.0], ['#ffd23f', 0.5]].forEach(([c, x]) => { const b = new T.Mesh(new T.CylinderGeometry(0.13, 0.15, 0.5, 14), M(c)); b.position.set(x, 2.08, -4.0); shop.add(b); const cap = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.14, 10), M('#ffffff')); cap.position.set(x, 2.4, -4.0); shop.add(cap); });
      } scene.add(shop);
      const poleT = ctex(64, 128, (x) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, 64, 128); for (let i = -2; i < 6; i++) { x.fillStyle = i % 2 ? '#ff4d5e' : '#3d86e8'; x.beginPath(); x.moveTo(0, i * 32); x.lineTo(64, i * 32 + 32); x.lineTo(64, i * 32 + 46); x.lineTo(0, i * 32 + 14); x.fill(); } }, [1, 1]);
      const pole = new T.Group(); { const c = new T.Mesh(new T.CylinderGeometry(0.24, 0.24, 1.5, 20), M('#ffffff', { map: poleT })); pole.add(c); for (const s of [-1, 1]) { const k = new T.Mesh(new T.SphereGeometry(0.3, 16, 12), M('#c9cfe0')); k.scale.y = 0.6; k.position.y = s * 0.82; pole.add(k); } pole.position.set(-3.1, 3.0, -4.05); } scene.add(pole);
      const chair = new T.Group(); { const cm = M('#ff6f6f'); const seat = new T.Mesh(new T.BoxGeometry(1.3, 0.26, 1.1), cm); seat.position.y = 0.6; const back = new T.Mesh(new T.BoxGeometry(1.3, 1.5, 0.22), cm); back.position.set(0, 1.3, -0.5); const post = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 0.5, 14), M('#aab2c8')); post.position.y = 0.28; const base = new T.Mesh(new T.CylinderGeometry(0.6, 0.66, 0.1, 24), M('#8f98b3')); base.position.y = 0.05; chair.add(seat, back, post, base); chair.position.set(0, 0, 0.25); } scene.add(chair);
      const table = new T.Group(); { const top = new T.Mesh(new T.CylinderGeometry(0.7, 0.7, 0.1, 24), M('#c58f5f')); top.position.y = 1.2; const leg = new T.Mesh(new T.CylinderGeometry(0.1, 0.14, 1.2, 12), M('#a8754a')); leg.position.y = 0.6; const bowl = new T.Mesh(new T.SphereGeometry(0.36, 20, 12, 0, PI * 2, PI / 2, PI / 2), M('#6b5a8f', { side: T.DoubleSide })); bowl.position.y = 1.6; const goo = new T.Mesh(new T.CylinderGeometry(0.32, 0.32, 0.04, 20), M('#b88cff')); goo.position.y = 1.56; const br = new T.Mesh(new T.BoxGeometry(0.08, 0.7, 0.06), M('#3a3550')); br.position.set(0.25, 1.75, 0); br.rotation.z = -0.6; table.add(top, leg, bowl, goo, br); table.position.set(1.7, 0, 0.3); } scene.add(table);
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      const nbr = (i, o) => { const g = CK.neighbor(T, i, o); g.userData.base = o.scale; scene.add(g); return g; };
      C.barber = nbr(3, { scale: 1.4, top: '#62c7d8', bottom: '#5a5f7a', hairStyle: 'short', hair: '#7a7a88', brow: '#7a7a88', mustache: '#7a7a88' }); /* ลุงมะพร้าว ช่างตัดผม */
      C.teen = nbr(0, { scale: 1.2, top: '#ff9a62', bottom: '#4a5a8f', hairStyle: 'short', hair: '#3a2a22' });                                  /* พี่ฝรั่ง 15 */
      C.big = nbr(1, { scale: 1.05, top: '#dfe6f5', bottom: '#3d4f8f', hairStyle: 'short', hair: '#2b2b33' });                                   /* เด็กประถม (ไม่มีชื่อ) */
      /* props in hands */
      const sc = new T.Group(); { for (const s of [-1, 1]) { const bl = new T.Mesh(new T.BoxGeometry(0.07, 0.55, 0.03), M('#d5dcec', { metalness: 0.3, roughness: 0.3 })); bl.position.y = 0.22; const pv = new T.Group(); pv.rotation.z = s * 0.28; pv.add(bl); const rg = new T.Mesh(new T.TorusGeometry(0.1, 0.035, 8, 16), M('#ff8a3d')); rg.position.set(0, -0.14, 0); pv.add(rg); sc.add(pv); } sc.userData.blades = sc.children; }
      sc.scale.setScalar(1.5); C.barber.userData.hand1.add(sc); sc.position.set(0, -0.2, 0.14);
      const comb = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(0.6, 0.12, 0.05), M('#ff6f91')); comb.add(b); for (let i = 0; i < 7; i++) { const tth = new T.Mesh(new T.BoxGeometry(0.04, 0.2, 0.04), M('#ff6f91')); tth.position.set(-0.26 + i * 0.087, -0.14, 0); comb.add(tth); } }
      comb.scale.setScalar(1.3); C.mom.userData['hand-1'].add(comb); comb.position.set(0, -0.2, 0.14);
      const can = new T.Group(); { const b = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.46, 16), M('#ffc93c')); can.add(b); const n = new T.Mesh(new T.CylinderGeometry(0.06, 0.08, 0.12, 12), M('#ffffff')); n.position.y = 0.29; can.add(n); const st = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), M('#ff6f91')); st.position.set(0, 0.02, 0.12); can.add(st); }
      can.scale.setScalar(1.7); C.mama.userData.hand1.add(can); can.position.set(0, -0.2, 0.12);
      /* hearts + sparkles */
      const hs = new T.Shape(); hs.moveTo(0, -0.5); hs.bezierCurveTo(-0.9, 0.1, -0.5, 0.75, 0, 0.35); hs.bezierCurveTo(0.5, 0.75, 0.9, 0.1, 0, -0.5);
      const hg = new T.ExtrudeGeometry(hs, { depth: 0.18, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 3 }); hg.center();
      const hearts = []; for (let i = 0; i < 9; i++) { const h = new T.Mesh(hg, M(i % 3 === 0 ? '#ffc94d' : '#ff6f91', { roughness: 0.35 })); h.userData.s = [Math.sin(i * 7.1) * 1.6, (i * 0.37) % 1, 0.25 + (i % 3) * 0.08]; h.visible = false; scene.add(h); hearts.push(h); }
      const snips = []; for (let i = 0; i < 10; i++) { const h = new T.Mesh(new T.BoxGeometry(0.16, 0.05, 0.05), M('#26232e')); h.userData.s = [Math.sin(i * 5.3) * 0.9, (i * 0.29) % 1, i * 1.7]; h.visible = false; scene.add(h); snips.push(h); }

      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const stage = (x, floorC, wallBase) => { const p = new T.Mesh(new T.BoxGeometry(18, 0.3, 24), M(floorC)); p.position.set(x, -0.15, 6); scene.add(p); const w = new T.Mesh(new T.BoxGeometry(18, 10, 0.3), M('#ffffff', { map: dotT(wallBase, '#ffffff', [8, 4]) })); w.position.set(x, 4.5, -4); scene.add(w); };
      /* ===== stage L: age ladder ===== */
      stage(LX, '#6fb7e8', '#cfe9ff');
      const disc = new T.Mesh(new T.CylinderGeometry(2.3, 2.4, 0.2, 40), M('#ffd36e')); disc.position.set(LX, 0.1, 0.2); scene.add(disc);
      /* ===== stage N: first haircut ===== */
      stage(NX, '#8f7ad9', '#e6dcff');
      const disc2 = new T.Mesh(new T.CylinderGeometry(2.5, 2.6, 0.2, 40), M('#ff9ec0')); disc2.position.set(NX, 0.1, 0.2); scene.add(disc2);
      /* ===== stage R: school rules + numbers ===== */
      stage(RX, '#ff9a4d', '#ffe0b8');
      const box = new T.Group(); { const b = new T.Mesh(new T.BoxGeometry(1.3, 1.9, 0.7), M('#8f5fd9')); b.position.y = 0.95; box.add(b);
        const lt = ctex(256, 384, (x) => { x.fillStyle = '#8f5fd9'; x.fillRect(0, 0, 256, 384); x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(28, 40, 200, 180, 24); x.fill(); x.fillStyle = '#3a2f3f'; x.beginPath(); x.arc(128, 120, 46, PI, 0); x.fill(); x.fillStyle = '#ffd6bd'; x.beginPath(); x.arc(128, 132, 36, 0, 7); x.fill(); x.fillStyle = '#3a2f3f'; x.beginPath(); x.arc(128, 112, 40, PI, 0); x.fill(); x.fillStyle = '#ffd23f'; x.beginPath(); x.roundRect(28, 250, 200, 90, 20); x.fill(); x.fillStyle = '#3a2f3f'; x.font = '800 56px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ยาย้อมผม', 128, 297, 190); });
        const lb = new T.Mesh(new T.PlaneGeometry(1.2, 1.8), new T.MeshBasicMaterial({ map: lt })); lb.position.set(0, 0.95, 0.36); box.add(lb);
        const ped = new T.Mesh(new T.CylinderGeometry(1.1, 1.2, 0.5, 30), M('#ffd36e')); ped.position.y = -0.25; box.add(ped); box.position.set(RX + 1.3, 0.5, 0); } scene.add(box);
      const toks = TOK.map(([x, y], i) => { const g = new T.Group(), kid = KIDTOK.includes(i), r = kid ? 0.5 : 0.58; const h = new T.Mesh(new T.SphereGeometry(r, 24, 18), M(CK.pal.skin[i % 3])); g.add(h);
        const hair = new T.Mesh(new T.SphereGeometry(r * 1.06, 24, 12, 0, PI * 2, 0, PI * 0.42), M(i % 2 ? '#3a2a22' : '#26232e')); g.add(hair);
        for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r * 0.13, 10, 8), M('#26232e')); e.position.set(s * r * 0.36, -r * 0.05, r * 0.92); g.add(e); }
        const burn = new T.Mesh(new T.SphereGeometry(r * 0.5, 16, 10), M('#ff3d55', { emissive: '#ff3d55', emissiveIntensity: 0.4 })); burn.scale.y = 0.35; burn.position.set(r * 0.25, r * 0.98, r * 0.25); g.add(burn);
        g.position.set(RX + x, y, 0); g.userData = { burn, kid }; scene.add(g); return g; });
      /* ===== stage M: hair strand mechanism ===== */
      stage(MX, '#7fd6c2', '#d8f6ee');
      const scalp = new T.Mesh(new T.SphereGeometry(3.3, 40, 20), M('#e8906a')); scalp.scale.y = 0.34; scalp.position.set(MX, -0.1, 0); scene.add(scalp);
      const sore = new T.Mesh(new T.SphereGeometry(1.5, 30, 14), new T.MeshStandardMaterial({ color: '#ff4d5e', transparent: true, opacity: 0, roughness: 0.6 })); sore.scale.y = 0.26; sore.position.set(MX, 0.98, 0.5); scene.add(sore);
      const strand = new T.Mesh(new T.CylinderGeometry(0.42, 0.46, 3.6, 28), M('#4a3a55')); strand.position.set(MX, 0.9 + 1.8, 0); scene.add(strand);
      const tip = new T.Mesh(new T.SphereGeometry(0.42, 20, 14), M('#4a3a55')); tip.position.set(MX, 4.5, 0); scene.add(tip);
      const rings = []; for (let i = 0; i < NC; i++) { const r = new T.Mesh(new T.CylinderGeometry(0.62, 0.47, 0.5, 28, 1, true), M('#7a6490', { side: T.DoubleSide })); r.position.set(MX, 1.3 + i * 0.46, 0); scene.add(r); rings.push(r); }
      const drops = []; for (let i = 0; i < 8; i++) { const d = new T.Mesh(new T.SphereGeometry(0.2, 14, 10), M('#b88cff', { roughness: 0.25 })); d.userData.s = [(i % 2 ? 1 : -1) * (0.95 + (i % 3) * 0.22), (i * 0.13) % 1, i]; scene.add(d); drops.push(d); }
      const pig = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.13, 12, 8), M('#ffc93c', { emissive: '#ffc93c', emissiveIntensity: 0.3 })); d.position.set(MX + (i % 2 ? 0.2 : -0.2), 1.5 + i * 0.5, 0.42); scene.add(d); pig.push(d); }
      return { key, hemi, room, C, hearts, snips, sofa, shop, pole, poleT, chair, table, sc, comb, can, box, toks, sore, rings, drops, pig };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.34, dn); s.key.intensity = U.lerp(0.68, 0.5, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      const CAST = ['dad', 'mom', 'mama', 'nana', 'wawa', 'barber', 'teen', 'big'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, ex: ex || 'happy' }, o || {}));
      let heartsOn = false, heartsT0 = 0, shopOn = false, chairOn = false, tableOn = false, sofaOn = false, canOn = false, combOn = false, snipOn = false;
      const hop = (f, a) => Math.abs(Math.sin(t * f)) * a;
      if (bt === 'cover') {
        shopOn = chairOn = true;
        def('barber', -2.15, 0.1, 'worried', { ry: 0.4, a2: [0.9 + 0.1 * Math.sin(t * 6), -0.6] });
        def('mama', 0, 0.5, 'giggle', { y: 0.66 + hop(7, 0.08), a2: [2.2 + 0.15 * Math.sin(t * 9), 0.7] });
        def('dad', 2.15, 0.1, 'worried', { ry: -0.4, a1: [-2.0, 0.5] });
      } else if (bt === 's1') {
        const q = SP('s1', 0.52), k = U.easeBack(U.clamp((t - q) / 0.35)), k0 = 1 - U.clamp((t - q + 0.25) / 0.25); combOn = true;
        def('mom', NX + 1.25, 0.1, 'happy', { y: 0.2, ry: -0.4, a1: [-0.6 - 0.12 * Math.sin(t * 5), -0.9] });
        if (t < q) def('wawa', NX - 0.75, 0.5, 'happy', { y: 0.2, ry: 0.3, sc: Math.max(0.01, k0) });
        else def('nana', NX - 0.85, 0.5, 'giggle', { y: 0.2 + hop(6, 0.1), ry: 0.3, sc: k });
      } else if (bt === 's2') {
        let cur = 0; for (let i = 0; i < 4; i++) if (t >= TM('s2', i, 0.06 + i * 0.235)) cur = i;
        const k = U.easeBack(U.clamp((t - TM('s2', cur, 0.06 + cur * 0.235)) / 0.35)), y0 = 0.2;
        if (cur === 0) def('nana', LX, 0.3, 'happy', { y: y0, sc: k, wave: true });
        if (cur === 1) def('mama', LX, 0.3, 'giggle', { y: y0 + hop(6, 0.12), sc: k });
        if (cur === 2) def('big', LX, 0.3, 'happy', { y: y0, sc: k, wave: true });
        if (cur === 3) def('teen', LX, 0.3, 'happy', { y: y0, sc: k, a2: [2.3, 0.6] });
      } else if (bt === 's3') {
        def('big', RX, 0.3, 'happy', { wave: ph('s3', t) > 0.55, y: hop(5, 0.05) });
      } else if (bt === 's5') {
        const q = SP('s5', 0.5), k = 1 - U.clamp((t - q + 0.3) / 0.3);
        if (k > 0) def('teen', RX - 1.4, 0.3, 'worried', { ry: 0.45, sc: k, a2: [0.9, -0.7] });
      } else if (bt === 's6' || bt === 's7') {
        shopOn = tableOn = true; const itch = bt === 's7' || t > SP('s6', 0.5);
        def('teen', -0.7, 0.4, itch ? 'worried' : 'happy', { ry: 0.2, a2: itch ? [2.45 + 0.12 * Math.sin(t * 14), 0.25] : [0.8, -0.8], a1: itch ? [-2.45 - 0.12 * Math.sin(t * 14 + 1), 0.25] : null });
      } else if (bt === 's8') {
        shopOn = chairOn = canOn = true; snipOn = ph('s8', t) < 0.45;
        def('barber', -2.15, 0.1, 'happy', { ry: 0.4, a2: [1.5 + 0.12 * Math.sin(t * 8), -0.5] });
        def('mama', 0, 0.5, 'giggle', { y: 0.66, a2: [2.0 + 0.1 * Math.sin(t * 6), 0.8] });
        def('dad', 2.15, 0.1, 'happy', { ry: -0.4, wave: ph('s8', t) > 0.6 });
      } else if (bt === 's9' || bt === 's10') {
        sofaOn = true; const fin = bt === 's10' && t > P('s10', 0.3);
        def('mom', -1.9, -0.7, 'happy', { ry: 0.15 });
        def('dad', 1.95, -0.7, 'happy', { ry: -0.15, wave: bt === 's10' && ph('s10', t) > 0.45 });
        def('mama', 0.0, 1.4, 'giggle', { y: fin ? hop(6, 0.1) : 0, a2: fin ? [2.2, 0.7] : null });
        def('nana', -1.6, 1.4, bt === 's10' ? 'giggle' : 'happy', { wave: bt === 's10' && ph('s10', t) > 0.4 });
        def('wawa', 1.45, 1.4, 'happy');
        if (fin) { heartsOn = true; heartsT0 = P('s10', 0.3); }
      }
      for (const k of CAST) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(0, q.ry, 0);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave });
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        g.scale.setScalar(g.userData.base * Math.max(0.01, q.sc == null ? 1 : q.sc));
      }
      s.shop.visible = shopOn; s.pole.visible = shopOn && !tableOn; s.chair.visible = chairOn; s.table.visible = tableOn; s.sofa.visible = sofaOn;
      s.can.visible = canOn; s.comb.visible = combOn; s.poleT.offset.y = -t * 0.35;
      s.sc.userData.blades.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * (0.2 + 0.2 * Math.abs(Math.sin(t * 9))); });
      s.snips.forEach((h) => { const u = h.userData.s, a = ((t - at('s8')) * 0.7 + u[1]) % 1; h.visible = snipOn; if (!h.visible) return; h.position.set(u[0] * 0.8, 3.3 - a * 2.6, 1.3 + Math.sin(u[2]) * 0.3); h.rotation.z = t * 3 + u[2]; });
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - heartsT0 - u[1] * 1.6) / 2.6; h.visible = heartsOn && a > 0 && a < 1; if (!h.visible) return;
        h.position.set(0.1 + u[0], 3.4 + a * 2.0, 0.9); h.rotation.y = Math.sin(t * 2 + u[0]) * 0.6; h.scale.setScalar(u[2] * (1 + 0.15 * Math.sin(t * 6 + u[0])) * U.clamp(a * 6) * U.clamp((1 - a) * 4)); });
      /* s5: dye box, then head tokens */
      { const on = inB('s5', t), q = SP('s5', 0.5); s.box.visible = on && t < q; if (s.box.visible) { s.box.rotation.y = Math.sin(t * 1.5) * 0.25; s.box.scale.setScalar(U.easeBack(U.clamp((t - at('s5') - 0.3) / 0.4)) * (1 - U.clamp((t - q + 0.3) / 0.3)) + 0.001); }
        s.toks.forEach((g, i) => { const k = U.easeBack(U.clamp((t - q - 0.1 - i * 0.08) / 0.35)); g.visible = on && t >= q && k > 0.01; if (!g.visible) return; const hit = g.userData.kid && t > TM('s5', 0, 0.72) + KIDTOK.indexOf(i) * 0.18;
          g.scale.setScalar(k); g.position.y = TOK[i][1] + (hit ? Math.sin(t * 16 + i) * 0.03 : Math.sin(t * 2 + i) * 0.04); g.userData.burn.visible = hit; g.rotation.y = Math.sin(t * 1.3 + i) * 0.15; }); }
      /* s4: cuticle opens, drops run down, scalp reddens */
      { const p = inB('s4', t) ? ph('s4', t) : 0, q = (SP('s4', 0.5) - at('s4')) / dur('s4');
        s.rings.forEach((r, i) => { const o = U.easeIO(U.clamp((p - 0.12 - (NC - 1 - i) * 0.035) / 0.12)); r.scale.set(1 + o * 0.42, 1, 1 + o * 0.42); r.rotation.z = Math.sin(t * 3 + i) * 0.03 * o; });
        s.drops.forEach((d) => { const u = d.userData.s, a = ((t - at('s4')) * 0.28 + u[1]) % 1; d.visible = p > 0.05; d.position.set(MX + u[0] * (1 - a * 0.25), 5.2 - a * 4.3, 0.5); d.scale.set(1, 1.25 - a * 0.5, 1); });
        s.pig.forEach((d, i) => { const k = U.clamp((p - 0.3 - i * 0.02) / 0.1); d.visible = k > 0; d.scale.setScalar(Math.max(0.01, k * (1 + 0.15 * Math.sin(t * 6 + i)))); });
        s.sore.material.opacity = 0.85 * U.clamp((p - q) / 0.12) * (0.8 + 0.2 * Math.sin(t * 7)); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's2') return ['#a8d8ff', '#e3f3ff']; if (b === 's1') return ['#d9ccff', '#f3edff']; if (b === 's3' || b === 's5') return ['#ffd8a8', '#fff4e6']; if (b === 's4') return ['#b8ecdf', '#eefaf6']; if (b === 's6' || b === 's7') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, a, fill, col) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; x = U.clamp(x, 60 + LD + w / 2, 1020 - LD - w / 2); rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const bubble = (str, x, y, a, size) => { if (a <= 0) return; size = size || 40; g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + 50; x = U.clamp(x, 70 + LD + w / 2, 1010 - LD - w / 2); rr(x - w / 2, y - size, w, size * 2, size, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + size - 2); g.lineTo(x + 4, y + size + 28); g.lineTo(x + 18, y + size - 2); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, size, '#3a2f3f', 700, 'center'); g.restore(); };
      const cards = (L, y0, a0, cur, hi) => { const cw = (920 - 2 * LD) / 3; L.forEach((s2, i) => { const a = a0 * U.clamp(s2[2] == null ? 1 : s2[2]); if (a <= 0) return; const x = 80 + LD + i * cw + cw / 2, on = cur == null || i <= cur; g.save(); g.globalAlpha = a; rr(x - cw / 2 + 8, y0, cw - 16, 150, 28, on ? '#ffffff' : 'rgba(255,255,255,.7)', on ? (hi || '#ff6f91') : null);
        plain(s2[0], x, y0 + 48, Math.round(38 * LF), on ? '#ff4f7b' : '#8a7a8f', 800, 'center'); g.font = '600 ' + Math.round(30 * LF) + 'px Kanit,sans-serif'; const parts = s2[1].split('|'); parts.forEach((pt, j) => plain(pt, x, y0 + 104 + (j - (parts.length - 1) / 2) * 34, Math.round(30 * LF), '#3a2f3f', 600, 'center')); g.restore(); }); };
      const list = (L, id, f0, df, y0, dark, src) => { const p = ph(id, t), a0 = U.clamp((p - 0.03) / 0.06), n = L.length, h = 60 + n * 86 + (src ? 30 : 0);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, h, 30, dark ? 'rgba(25,18,50,.66)' : 'rgba(255,255,255,.9)', dark ? 'rgba(255,120,150,.9)' : '#ff8fab'); g.restore();
        let cur = -1; for (let i = 0; i < n; i++) if (t >= TM(id, i, f0 + i * df)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM(id, i, f0 + i * df)) / 0.3); if (a <= 0) return; const y = 392 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur && !dark) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = dark ? '#ff5f6d' : i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(36 * LF), dark ? '#ffffff' : '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
        if (src) { g.save(); g.globalAlpha = a0; plain(src, 540, 320 + h - 34, Math.round(26 * LF), dark ? 'rgba(255,255,255,.9)' : '#8a6a7a', 400, 'center'); g.restore(); } };
      const C = S.C;
      if (b === 'cover') { let [x, y] = wp(C.mama.userData.head, 0, 0.9); bubble('เอาผมสีทอง ดัดหยิกด้วย!', 540, Math.min(y - 150, REEL ? 640 : 690), U.clamp((t - 0.2) / 0.3), 42);
        [x, y] = wp(C.dad.userData.head, 0, 1.1); bubble('ห๊ะ?!', x + 60, y - 30, U.clamp((t - 1.0) / 0.3), 40); }
      if (b === 's1') { list(['ไม่มีอายุตายตัว ราว 8 เดือน–2 ขวบ', 'ดูสัญญาณ: ผมทิ่มตา ยาวไม่เท่ากัน พันกัน', 'โกนผมไฟ ไม่ได้ทำให้ผมดกขึ้น', 'ผมดกหรือบาง มาจากกรรมพันธุ์'], 's1', 0.08, 0.21, 0, false, 'ที่มา: Mother&Baby · University of Utah Health');
        const q = SP('s1', 0.52), [x, y] = proj(new T.Vector3(NX - 0.8, 0.1, 2.3)); tag(t < q ? 'น้องวาวา ผมยังบาง รอได้' : 'น้องนานะ ผมเริ่มทิ่มตา', x, REEL ? y - 30 : y + 10, 40, U.clamp((t - at('s1') - 0.6) / 0.3), t < q ? '#ffd6e4' : '#c9f5d9'); }
      if (b === 's2') { const p = ph('s2', t), a0 = U.clamp((p - 0.02) / 0.05);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 400, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = [['1–3 ขวบ', 'สั้น ง่าย ไม่ทิ่มตา ตัดไว'], ['3–6 ขวบ', 'ให้เลือกเอง 1 ใน 2 ทรง'], ['6–12 ปี', 'ตามกฎโรงเรียน สระ-หวีเอง'], ['13 ปีขึ้นไป', 'แฟชั่นได้ ในกติกาที่ตกลงกัน']];
        let cur = 0; for (let i = 0; i < 4; i++) if (t >= TM('s2', i, 0.06 + i * 0.235)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s2', i, 0.06 + i * 0.235)) / 0.3); if (a <= 0) return; const y = 384 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4');
          plain(s2[0], 104 + LD, y + 2, Math.round(36 * LF), i === cur ? '#ff4f7b' : '#b0879a', 800); plain(s2[1], 340 + LD * 0.6, y + 2, Math.round(36 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
        const TG = ['นานะ: นั่งนิ่งได้แป๊บเดียว', 'มามะ: "เอาทรงนี้!"', 'วัยประถม ดูแลผมเองได้', 'พี่ฝรั่ง 15: ขอเซ็ตผมหน่อย'];
        const [x, y] = proj(new T.Vector3(LX, 0.1, 2.3)); tag(TG[cur], x, REEL ? y - 30 : y + 10, 40, U.clamp((t - TM('s2', cur, 0.06 + cur * 0.235) - 0.2) / 0.3), ['#c9f5d9', '#fff1c9', '#dff0ff', '#ffe0cc'][cur]); }
      if (b === 's3') { const p = ph('s3', t), a0 = U.clamp((p - 0.06) / 0.08); let cur = -1; for (let i = 0; i < 3; i++) if (t >= TM('s3', i, 0.12 + i * 0.22)) cur = i;
        cards([['ปี 2563', 'ผมสั้นหรือยาว|ก็ได้'], ['ปี 2566', 'ยกเลิกระเบียบกลาง|โรงเรียนกำหนดเอง'], ['ปี 2568', 'ศาลเพิกถอน|กฎเก่าปี 2518']].map((c, i) => [c[0], c[1], (t - TM('s3', i, 0.12 + i * 0.22)) / 0.3]), REEL ? 500 : 540, a0, cur); }
      if (b === 's4') { const p = ph('s4', t), q = SP('s4', 0.5);
        let [x, y] = proj(new T.Vector3(MX + 0.75, 3.4, 0.4)); tag('เกล็ดผมถูกเปิด', x + 150, y, 38, U.clamp((p - 0.2) / 0.08), '#e6dcff');
        [x, y] = proj(new T.Vector3(MX - 0.2, 2.2, 0.5)); tag('สีเข้าไปข้างใน', x - 190, y, 38, U.clamp((p - 0.34) / 0.08) * (t < q ? 1 : 0.0), '#fff1c9');
        [x, y] = proj(new T.Vector3(MX, 1.15, 1.6)); tag('หนังศีรษะ แดง คัน', x, y, 40, U.clamp((t - q - 0.2) / 0.3), '#ffd6dc');
        [x, y] = proj(new T.Vector3(MX - 1.2, 3.6, 0.5)); tag('น้ำยาเคมี', x - 90, y, 36, U.clamp((p - 0.08) / 0.08), '#e6dcff'); }
      if (b === 's5') { const p = ph('s5', t), q = SP('s5', 0.5);
        if (t < q) { const [x, y] = proj(new T.Vector3(RX + 1.3, 3.0, 0.4)), k = U.easeOut(U.clamp((p - 0.1) / 0.2)); g.save(); g.globalAlpha = U.clamp((p - 0.08) / 0.06) * U.clamp((q - t) / 0.3); txt(String(Math.round(16 * k)), x - 30, y - 60, 170, '#ffd35e', 800, 'center'); txt('ปี', x + 110, y - 30, 64, '#ffffff', 800, 'center'); g.restore();
          const [tx, ty] = wp(C.teen.userData.head, 0, 1.0); tag('พี่ฝรั่ง 15 ปี', tx, ty - 30, 34, U.clamp((p - 0.06) / 0.06) * U.clamp((q - t) / 0.3)); }
        else { const [x, y] = proj(new T.Vector3(RX, -0.05, 1.2)); tag('แดง = ผู้ป่วยเด็ก 5 ใน 8 ราย', x, REEL ? y - 60 : y + 10, 40, U.clamp((t - TM('s5', 0, 0.72) - 0.6) / 0.3), '#ffd6dc'); } }
      if (b === 's6') { const p = ph('s6', t), q = SP('s6', 0.5); const [x, y] = wp(C.teen.userData.head, 0, 1.05);
        bubble(t < q ? 'ย้อมเองก็ได้ ง่ายจะตาย' : 'โอ๊ย คันหัว!', x + 40, y - 60, U.clamp((p - 0.1) / 0.08), 40); }
      if (b === 's7') list(['หนังศีรษะ คัน แดง แสบ มีตุ่มน้ำ', 'หน้า เปลือกตา หรือคอ บวม', 'หายใจลำบาก หน้ามืด โทร 1669 ทันที'], 's7', 0.12, 0.2, 0, true, 'เคยสักเฮนน่าดำชั่วคราว ยิ่งเสี่ยงแพ้ยาย้อมผม');
      if (b === 's8') { const p = ph('s8', t), q = SP('s8', 0.5), a0 = U.clamp((p - 0.05) / 0.08), y0 = REEL ? 500 : 530;
        if (t < q) cards([['สเปรย์ / ชอล์กสี', 'สระแล้ว|ล้างออก'], ['แว็กซ์ เจล', 'เซ็ตทรง|ได้ทุกวัน'], ['เปลี่ยนทรงตัด', 'ไม่ใช้|เคมีเลย']].map((c, i) => [c[0], c[1], (p - 0.06 - i * 0.1) / 0.06]), y0, a0 * U.clamp((q - t) / 0.25), null);
        else cards([['ร้านมืออาชีพ', 'ไม่ย้อม|เองที่บ้าน'], ['ทดสอบแพ้', 'ก่อนทำ|ทุกครั้ง'], ['เลี่ยงหนังศีรษะ', 'เช่น ทำ|แค่ปลายผม']].map((c, i) => [c[0], c[1], (t - q - 0.1 - i * 0.5) / 0.3]), y0, U.clamp((t - q) / 0.25), null, '#8f7ad9');
        const [x, y] = wp(C.mama.userData.head, 0, 0.9); bubble('สีทองแบบล้างออกได้!', x + 30, y - 40, U.clamp((p - 0.22) / 0.06) * U.clamp((q - t) / 0.3), 36); }
      if (b === 's9') list(['ให้ลูกเลือกทรงเอง จากตัวเลือกที่เรารับได้', 'เด็กเล็ก ทรงสั้น ดูแลง่าย ไม่ทิ่มตา', 'เช็กกฎโรงเรียน ก่อนเปลี่ยนทรง', 'ดัด ยืด ย้อมถาวร รอให้โตก่อน', 'จะทำสี ทดสอบแพ้ก่อนทุกครั้ง'], 's9', 0.1, 0.17, 0, false);
      if (b === 's10') { const p = ph('s10', t); if (p > 0.3) { const [x, y] = proj(new T.Vector3(0, 0, 2.7)); tag('มามะ: ทรงเดิมก็หล่อแล้ว!', x, y + 20, 42, U.clamp((p - 0.3) / 0.06), '#fff1c9'); } }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[70, ['ลูกชายขอ "ทำสีผม ดัดผม"', '#fff']], [84, ['ให้ได้ไหม?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: end('s1') - 0.05, y: 250, lines: [[56, ['ตัดผมครั้งแรก ', '#fff'], ['เมื่อไหร่ดี?', '#ffd35e']]] },
      { t0: at('s2') + 0.2, t1: end('s2') - 0.05, y: 250, lines: [[56, ['ทรงผมลูกชาย ', '#fff'], ['เลือกตามวัย', '#ffd35e']]] },
      { t0: at('s3') + 0.2, t1: end('s3') - 0.05, y: 290, lines: [[56, ['กฎทรงผมนักเรียน เปลี่ยนแล้ว', '#ffd35e']], [44, ['เช็กกฎโรงเรียนลูก ก่อนตัดหรือทำสี', '#fff', 600]]], foot: 'ระเบียบ ศธ. 2563 และ 2566 · ศาลปกครองสูงสุด มี.ค. 2568' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[58, ['ดัด ยืด ย้อมถาวร', '#ffd35e']], [46, ['ใช้เคมีเปิดเกล็ดผม เข้าไปเปลี่ยนข้างใน', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[54, ['น้ำยาโดนหนังศีรษะ เสี่ยงแพ้', '#fff']], [46, ['ตัวการหลักในยาย้อม คือสาร PPD', '#ffd35e', 700]]], foot: 'PPD = พาราฟีนิลีนไดอะมีน สีโทนเข้มมักมีมากกว่า (Consumer NZ)' },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[52, ['ฉลากยาย้อมผมถาวรในยุโรป เขียนว่า', '#fff']], [50, ['"ไม่ได้ทำมาสำหรับอายุต่ำกว่า 16 ปี"', '#ffd35e', 700]]], foot: 'คำเตือนบนฉลากใน EU อังกฤษ นิวซีแลนด์' },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[50, ['รายงานหนังศีรษะไหม้จากทำไฮไลต์', '#fff']], [58, ['8 ราย เป็นเด็ก 5 ราย', '#ffd35e']]], foot: 'ทบทวนรายงานผู้ป่วย (PubMed 20854194) · พบไม่บ่อย แต่เกิดขึ้นจริง' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[54, ['พี่ฝรั่ง 15 ย้อมผมเองที่บ้าน', '#fff']]] },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[54, ['ผ่านไป 1–2 วัน', '#fff']], [56, ['หนังศีรษะคัน แดง', '#ffd35e']]], foot: 'อาการแพ้อาจเริ่มช้าได้ถึงราว 48 ชม. หลังย้อม' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[52, ['หยุดใช้ ล้างออก พบแพทย์ ถ้า…', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[54, ['อยากเปลี่ยนลุค?', '#fff']], [54, ['เริ่มจากแบบล้างออกได้', '#ffd35e']]] },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[54, ['วัยรุ่นอยากทำจริง?', '#fff']], [50, ['คุยกันก่อน เลือกทางเสี่ยงน้อยสุด', '#ffd35e', 700]]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 250, lines: [[56, ['5 ข้อ เรื่องผมลูกชาย', '#ffd35e']]] },
      { t0: at('s10') + 0.2, t1: end('s10'), y: 290, lines: [[56, ['ผมยาวใหม่ได้เสมอ', '#fff']], [54, ['ความมั่นใจของลูก สำคัญกว่า', '#ffd35e']], [40, ['ตอนเด็กคุณโดนตัดทรงอะไร? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: Consumer NZ, PubMed 20854194, U of Utah Health, ศธ.' },
    ],
    trans,
    audio: [
      [0.3, 'boing'], [0.7, 'giggle'], [1.1, 'pop'],
      [TM('s1', 0, 0.08), 'pop'], [TM('s1', 1, 0.29), 'tick'], [SP('s1', 0.52), 'boing'], [TM('s1', 2, 0.5), 'tick'], [TM('s1', 3, 0.71), 'tick'],
      [TM('s2', 0, 0.06), 'pop'], [TM('s2', 1, 0.295), 'pop'], [TM('s2', 1, 0.295) + 0.4, 'giggle'], [TM('s2', 2, 0.53), 'pop'], [TM('s2', 3, 0.765), 'pop'],
      [at('s3') + 0.4, 'whoosh'], [TM('s3', 0, 0.12), 'tick'], [TM('s3', 1, 0.34), 'tick'], [TM('s3', 2, 0.56), 'ding'],
      [at('s4') + 0.4, 'riser'], [P('s4', 0.14), 'bubble'], [P('s4', 0.24), 'bubble'], [P('s4', 0.34), 'shimmer'], [SP('s4', 0.5), 'warn'], [SP('s4', 0.5) + 0.5, 'thud'],
      [at('s5') + 0.4, 'pop'], [P('s5', 0.12), 'riser'], [P('s5', 0.32), 'ding'], [SP('s5', 0.5) + 0.2, 'whoosh'], [TM('s5', 0, 0.72), 'warn'], [TM('s5', 0, 0.72) + 0.5, 'thud'],
      [at('s6') + 0.4, 'bubble'], [SP('s6', 0.5), 'warn'], [SP('s6', 0.5) + 0.4, 'heartbeat'], [P('s6', 0.85), 'heartbeat'],
      [TM('s7', 0, 0.12), 'tick'], [TM('s7', 1, 0.32), 'tick'], [TM('s7', 2, 0.52), 'tick'], [P('s7', 0.8), 'heartbeat'],
      [at('s8') + 0.4, 'twinkle'], [P('s8', 0.12), 'tick'], [P('s8', 0.22), 'giggle'], [P('s8', 0.3), 'tick'], [SP('s8', 0.5) + 0.1, 'pop'], [SP('s8', 0.5) + 0.6, 'pop'], [SP('s8', 0.5) + 1.1, 'ding'],
      [TM('s9', 0, 0.1), 'ding'], [TM('s9', 1, 0.27), 'tick'], [TM('s9', 2, 0.44), 'tick'], [TM('s9', 3, 0.61), 'tick'], [TM('s9', 4, 0.78), 'tick'],
      [at('s10') + 0.3, 'twinkle'], [P('s10', 0.3), 'ding'], [P('s10', 0.36), 'giggle'], [P('s10', 0.5), 'heart'], [P('s10', 0.75), 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s6'), CK.MUSIC.OOPS), CK.musicBed(at('s6'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s10'), CK.MUSIC.CUTE), CK.musicBed(at('s10'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
