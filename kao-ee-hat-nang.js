/* พ่อแม่หัวจะปวด — เก้าอี้หัดนั่ง ดีไหม แบบไหนดี (ช่วยนั่งเป็นไหม, บันไดพัฒนาการ, วางบนที่สูง, หัวกระแทกพบแพทย์, 4 แบบ, เลือก 5 ข้อ, เก้าอี้กินข้าว, กฎ 2 ข้อ, 5 ทิป)
   Build: node build.js kao-ee-hat-nang.js review-kao-ee-hat-nang.html --kit clay --title "เก้าอี้หัดนั่ง ดีไหม แบบไหนดี" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, TAU = PI * 2, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6.5], ['s2', 8], ['s3', 8.5], ['s4', 8], ['s5', 6.5], ['s6', 8], ['s7', 6.5], ['s8', 8], ['s9', 7], ['s10', 7.5], ['s11', 7], ['s12', 5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's12'; };
  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  const CLOSE = { pos: [0, 6.6, 26], look: [0, 3.0, 0], fov: 29 };

  /* layout */
  const SEAT = [0.4, 0.6], SEAT_Y = 0.22;          // living-room foam seat
  const sitY = (g) => { const s = g.userData.base; return -(s >= 1.2 ? 0.393 : 0.163) * s + 0.02; };
  const STEPX = [116.9, 119.0, 121.1, 123.2], STEPH = [0.3, 0.6, 0.9, 1.2];
  const SHOWX = [-123.9, -121.3, -118.7, -116.1];
  const TBL = 1.45;                                 // neighbour table top

  const SH = {
    cover: [FW(0.4, 0.6, 3.5, 1.95, 0.35), FW(0.4, 0.6, 3.3, 1.95, 0.35)],
    s1: [FW(1.9, -0.6, 7.6, 3.95, 0.32), FW(1.9, -0.6, 7.3, 3.95, 0.32)],
    s2: REEL ? [FW(60, 0, 7.8, 3.0, 0.1), FW(60, 0, 7.6, 3.0, 0.1)] : [FW(60, 0, 7.8, 4.05, 0.1), FW(60, 0, 7.6, 4.05, 0.1)],
    s3: [FW(120.05, 0, 9.0, 2.8, 0.26), FW(120.05, 0, 8.8, 2.8, 0.26)],
    s4: [FW(-61.0, -0.2, 6.6, 3.95, 0.3), FW(-61.0, -0.2, 6.3, 3.95, 0.3)],
    s5: [FW(-61.0, 0, 6.6, 3.5, 0.35), FW(-61.0, 0, 6.4, 3.5, 0.35)],
    s6: REEL ? [FW(-119.7, 0, 11.4, 3.5, 0.25), FW(-119.7, 0, 11.2, 3.5, 0.25)] : [FW(-120, 0, 10.6, 3.5, 0.25), FW(-120, 0, 10.3, 3.5, 0.25)],
    s7: [FW(-120, 0, 10.6, 3.2, 0.25), FW(-120, 0, 10.4, 3.2, 0.25)],
    s8: [FW(179.8, -0.2, 5.8, 4.1, 0.3), FW(179.8, -0.2, 5.6, 4.1, 0.3)],
    s9: [FW(-0.4, 0.4, 5.8, 3.45, 0.35), FW(-0.4, 0.4, 5.6, 3.45, 0.35)],
    s10: [FW(1.0, 0.4, 5.8, 3.6, 0.35), FW(1.0, 0.4, 5.6, 3.6, 0.35)],
    s11: [CLOSE, CLOSE],
    s12: [CLOSE, { pos: [0, 6.3, 24], look: [0, 3.0, 0], fov: 29 }],
  };
  const CUT = new Set(['s2', 's3', 's4', 's6', 's8', 's9']);
  const CAM = [];
  for (const id of ORDER) { const [f, to] = SH[id], t0 = at(id), t1 = end(id); CAM.push(Object.assign({ t: CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75 }, f)); CAM.push(Object.assign({ t: t1 }, to)); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s4') - 0.3) / 0.6) * U.clamp((end('s5') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dy) => { o.getWorldPosition(V3); V3.y += dy || 0; return proj(V3); };

  VE.run({
    DUR, file: 'kao-ee-hat-nang', title: 'เก้าอี้หัดนั่ง ดีไหม แบบไหนดี', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'ของใช้ลูกเล็ก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      const add = (o, x, y, z, p) => { o.position.set(x, y, z); (p || scene).add(o); return o; };
      const box = (w, h, d, c) => new T.Mesh(new T.BoxGeometry(w, h, d), M(c));
      /* --- seat builders --- */
      const strapOf = (g, y, z, w) => { const s = new T.Group(); s.add(box(w, 0.1, 0.06, '#ff6f91')); const b = box(0.16, 0.16, 0.08, '#ffd23f'); b.position.z = 0.03; s.add(b); s.position.set(0, y, z); g.add(s); g.userData.strap = s; s.visible = false; return s; };
      const foamSeat = (c) => {
        const g = new T.Group(), m = M(c, { side: T.DoubleSide });
        const bowl = new T.Mesh(new T.SphereGeometry(0.8, 32, 16, 0, TAU, PI / 2, PI / 2), m); bowl.scale.y = 0.56; bowl.position.y = 0.47; g.add(bowl);
        const rim = new T.Mesh(new T.TorusGeometry(0.8, 0.13, 12, 40), m); rim.rotation.x = PI / 2; rim.position.y = 0.47; g.add(rim);
        const back = new T.Mesh(new T.TorusGeometry(0.66, 0.17, 12, 30, PI), m); back.position.set(0, 0.47, -0.36); back.rotation.x = -0.25; back.scale.y = 0.85; g.add(back);
        const pom = new T.Mesh(new T.SphereGeometry(0.2, 16, 12), m); pom.position.set(0, 0.52, 0.6); pom.scale.set(1, 0.8, 0.8); g.add(pom);
        strapOf(g, 0.62, 0.42, 0.62); return g;
      };
      const airSeat = () => { const g = new T.Group(); const r1 = new T.Mesh(new T.TorusGeometry(0.7, 0.25, 14, 36), M('#ffd95a')); r1.rotation.x = PI / 2; r1.position.y = 0.25; g.add(r1); const r2 = new T.Mesh(new T.TorusGeometry(0.62, 0.2, 14, 30, PI), M('#9fd3ff')); r2.position.set(0, 0.45, -0.38); r2.rotation.x = -0.2; g.add(r2); const bt = new T.Mesh(new T.CylinderGeometry(0.62, 0.62, 0.08, 28), M('#ffe9a8')); bt.position.y = 0.05; g.add(bt); return g; };
      const actSeat = () => { const g = new T.Group(); const s = new T.Mesh(new T.CylinderGeometry(0.66, 0.72, 0.5, 28), M('#79b8ff')); s.position.y = 0.25; g.add(s); const bk = new T.Mesh(new T.TorusGeometry(0.58, 0.16, 12, 30, PI), M('#79b8ff')); bk.position.set(0, 0.55, -0.36); bk.rotation.x = -0.2; g.add(bk); const tr = new T.Mesh(new T.TorusGeometry(0.98, 0.13, 10, 40), M('#ffffff')); tr.rotation.x = PI / 2; tr.position.y = 0.62; g.add(tr); [['#ff6f91', -0.6], ['#ffd23f', 0], ['#79dcb4', 0.6]].forEach(([c, x]) => { const b = new T.Mesh(new T.SphereGeometry(0.15, 14, 10), M(c)); b.position.set(x, 0.8, 0.85 - Math.abs(x) * 0.3); g.add(b); }); return g; };
      const highChair = (seatH) => {
        const g = new T.Group(), wood = M('#e9a86c'), H = seatH;
        for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const l = new T.Mesh(new T.CylinderGeometry(0.05, 0.07, H, 10), wood); l.position.set(sx * 0.45, H / 2, sz * 0.4); l.rotation.z = -sx * 0.1; l.rotation.x = sz * 0.1; g.add(l); }
        const rung = box(0.95, 0.06, 0.06, '#e9a86c'); rung.position.set(0, H * 0.35, 0.42); g.add(rung);
        const st = box(0.9, 0.14, 0.8, '#9fe3cf'); st.position.y = H; g.add(st);
        const bk = box(0.9, 1.0, 0.12, '#9fe3cf'); bk.position.set(0, H + 0.55, -0.38); g.add(bk);
        for (const s of [-1, 1]) { const ar = box(0.08, 0.08, 0.7, '#e9a86c'); ar.position.set(s * 0.43, H + 0.42, 0.0); g.add(ar); }
        const tray = box(1.15, 0.08, 0.5, '#ffffff'); tray.position.set(0, H + 0.48, 0.55); g.add(tray); g.userData.tray = tray;
        strapOf(g, H + 0.38, 0.27, 0.5); return g;
      };

      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffd6e4', wain: '#9fe3cf', floor: '#e3a974', rug: '#6aaaf0', props: false, winX: -2.6 }); scene.add(room);
      const counter = add(box(2.4, 1.7, 1.0, '#ffffff'), 3.6, 0.85, -3.7); const ctop = add(box(2.5, 0.12, 1.1, '#ff9ec0'), 3.6, 1.76, -3.7);
      const pot = add(new T.Mesh(new T.CylinderGeometry(0.32, 0.28, 0.35, 20), M('#5ab8ff')), 3.3, 2.0, -3.6);
      const steam = []; for (let i = 0; i < 4; i++) { const s0 = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#ffffff', { transparent: true, opacity: 0.7 })); scene.add(s0); steam.push(s0); }
      const sofa = new T.Group(); sofa.add(box(3.2, 0.7, 1.2, '#b9a4f0')); const sb = box(3.2, 1.3, 0.35, '#b9a4f0'); sb.position.set(0, 0.5, -0.5); sofa.add(sb); sofa.children[0].position.y = 0.35; add(sofa, -4.6, 0, -3.3);
      const seat0 = add(foamSeat('#79dcb4'), SEAT[0], 0, SEAT[1]);
      const ball = add(new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M('#ffd23f')), 0.3, 0.2, 2.0);
      const fam = {}; for (const k of ['mom', 'dad', 'mama', 'nana', 'wawa']) { const g = CK.family(T, k); g.userData.base = g.scale.x; scene.add(g); fam[k] = g; }
      const spoon = new T.Group(); spoon.add(new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.6, 8), M('#ffffff'))); const sh = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#ffffff')); sh.position.y = -0.32; sh.scale.set(1, 1.3, 0.5); spoon.add(sh); spoon.position.set(0, -0.15, 0.1); fam.mom.userData.hand1.add(spoon);

      /* ===== stage 1: back muscles (x = 60) ===== */
      const mech = new T.Group(); mech.position.x = 60; scene.add(mech);
      add(box(10, 0.3, 4, '#c9b6ff'), 0, -0.15, 0, mech);
      const card = (cx) => { const g = new T.Group(); g.position.set(cx, 2.2, -0.4); mech.add(g); const pnl = box(3.3, 3.5, 0.14, '#5b6fd6'); g.add(pnl); const fr = box(3.45, 3.65, 0.08, '#ffffff'); fr.position.z = -0.06; g.add(fr); return g; };
      const cardL = card(-1.95), cardR = card(1.95);
      const spine = (parent, pts, headP, seated) => {
        const g = new T.Group(); g.position.set(0, -0.3, 0.15); parent.add(g);
        const cv = new T.CatmullRomCurve3(pts.map((p) => new T.Vector3(p[0], p[1], 0)));
        const mus = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map((p) => new T.Vector3(p[0] - 0.24, p[1], -0.05))), 40, 0.14, 10, false), M('#b5adc4', { emissive: '#ff2f6d', emissiveIntensity: 0 })); g.add(mus);
        const verts = []; for (let i = 0; i <= 9; i++) { const v = new T.Mesh(new T.SphereGeometry(0.11, 12, 10), M('#ffffff')); v.position.copy(cv.getPoint(i / 9)); v.scale.set(1.25, 0.8, 1); g.add(v); verts.push(v); }
        const pel = new T.Mesh(new T.SphereGeometry(0.32, 16, 12), M('#ffe3ea')); pel.scale.set(1.2, 0.7, 0.8); pel.position.set(pts[0][0], pts[0][1] - 0.15, 0); g.add(pel);
        const hd = new T.Mesh(new T.SphereGeometry(0.5, 24, 16), M('#ffd6bd')); hd.position.set(headP[0], headP[1], 0); g.add(hd);
        const hair = new T.Mesh(new T.SphereGeometry(0.52, 24, 12, 0, TAU, 0, 1.2), M('#9a6a45')); hair.position.copy(hd.position); hair.rotation.z = seated ? -0.35 : 0.1; g.add(hair);
        const bw = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), M('#ff6f9f')); bw.position.set(headP[0] - 0.2, headP[1] + 0.5, 0.1); g.add(bw);
        const eye = new T.Mesh(new T.SphereGeometry(0.06, 8, 8), M('#3a2f3f')); eye.position.set(headP[0] + 0.36, headP[1] + 0.02, 0.3); g.add(eye);
        return { g, mus, verts };
      };
      const spL = spine(cardL, [[0.15, -1.1], [-0.25, -0.5], [-0.42, 0.1], [-0.25, 0.65], [0.15, 0.95]], [0.55, 1.15], true);
      const spR = spine(cardR, [[0.0, -1.1], [-0.12, -0.5], [0.05, 0.1], [0.0, 0.6], [-0.03, 0.95]], [0.05, 1.4], false);
      const bowlL = new T.Mesh(new T.TorusGeometry(0.75, 0.12, 10, 30, PI), M('#79dcb4')); bowlL.rotation.z = PI; bowlL.position.set(0.0, -0.75, 0.2); cardL.add(bowlL);
      const matR = box(1.8, 0.16, 0.3, '#ff9ec0'); matR.position.set(0, -1.38, 0.2); cardR.add(matR);
      const arrows = []; for (const s of [-1, 1]) { const a = new T.Mesh(new T.ConeGeometry(0.16, 0.36, 12), M('#ffd23f')); a.rotation.z = s * PI / 2; a.position.set(s * 1.1, 0.2, 0.25); cardR.add(a); arrows.push(a); }

      /* ===== stage 2: milestone steps (x = 120) ===== */
      add(box(12, 0.3, 6, '#ffb3c6'), 120, -0.15, 0);
      const bwall = add(new T.Mesh(new T.BoxGeometry(14, 8, 0.3), M('#ffe7a8')), 120, 4, -3.5);
      const STC = ['#9fd3ff', '#79dcb4', '#ffd95a', '#ff9ec0'];
      const steps = STEPX.map((x, i) => add(box(1.8, STEPH[i], 1.6, STC[i]), x, STEPH[i] / 2, 0));
      const baby = STEPX.map(() => { const g = CK.family(T, 'wawa'); g.userData.base = g.scale.x; scene.add(g); return g; });
      const skipSeat = add(foamSeat('#79dcb4'), STEPX[0], STEPH[0], 0.4); skipSeat.scale.setScalar(0.7); skipSeat.visible = false;

      /* ===== stage 3: neighbour room (x = -60) ===== */
      const room2 = CK.room(T, { wall: '#ffe08a', dots: 'rgba(255,255,255,0.8)', wain: '#ff9ec0', floor: '#e3a974', rug: false, props: false, winX: -2.6 }); room2.position.x = -60; scene.add(room2);
      const table = new T.Group(); add(table, -60, 0, -0.3); const tt = box(2.6, 0.16, 1.8, '#e9a86c'); tt.position.y = TBL; table.add(tt); for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const l = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, TBL, 10), M('#c98d5c')); l.position.set(sx * 1.1, TBL / 2, sz * 0.75); table.add(l); }
      const pivot = new T.Group(); add(pivot, -60 + 0.75, TBL + 0.08, -0.25);
      const seat2 = foamSeat('#ffb0d0'); seat2.position.x = -0.75; pivot.add(seat2);
      const kai = CK.neighbor(T, 1, { scale: 0.6, round: true, eyeScale: 1.08, hairStyle: 'tuft' }); kai.userData.base = 0.6; pivot.add(kai);
      const kai2 = CK.neighbor(T, 1, { scale: 0.6, round: true, eyeScale: 1.08, hairStyle: 'tuft' }); kai2.userData.base = 0.6; scene.add(kai2);
      const nmom = CK.neighbor(T, 0, { scale: 1.3, lashes: true }); nmom.userData.base = 1.3; scene.add(nmom);
      const phone = box(0.22, 0.38, 0.05, '#3a2f3f'); phone.position.set(0, -0.12, 0.12); nmom.userData.hand1.add(phone);

      /* ===== stage 4: seat lineup (x = -120) ===== */
      add(box(14, 0.3, 6, '#ffb3c6'), -120, -0.15, 0);
      add(new T.Mesh(new T.BoxGeometry(16, 8, 0.3), M('#d6ccff')), -120, 4, -3.2);
      const peds = SHOWX.map((x) => add(new T.Mesh(new T.CylinderGeometry(1.05, 1.1, 0.3, 32), M('#ffffff', { emissive: '#ff6f91', emissiveIntensity: 0 })), x, 0.15, 0));
      const lineup = [foamSeat('#79dcb4'), airSeat(), actSeat(), highChair(1.45)];
      lineup.forEach((g, i) => { add(g, SHOWX[i], 0.3, 0); g.scale.setScalar(i === 3 ? 1.0 : 1.25); });

      /* ===== stage 5: kitchen high chair (x = 180) ===== */
      const room3 = CK.room(T, { wall: '#bfeedd', dots: 'rgba(255,255,255,0.8)', wain: '#ffd95a', floor: '#e3a974', rug: false, props: false, winX: -2.4 }); room3.position.x = 180; scene.add(room3);
      add(box(2.2, 1.7, 1.0, '#ffffff'), 183.2, 0.85, -3.7); add(box(2.3, 0.12, 1.1, '#ff9ec0'), 183.2, 1.76, -3.7);
      const hc = add(highChair(1.45), 180.6, 0, 0);
      const hbaby = CK.family(T, 'wawa'); hbaby.userData.base = hbaby.scale.x; scene.add(hbaby);
      const kdad = CK.family(T, 'dad'); kdad.userData.base = kdad.scale.x; scene.add(kdad);
      const bowlK = add(new T.Mesh(new T.CylinderGeometry(0.2, 0.13, 0.14, 16), M('#ff6f91')), 180.85, 1.45 + 0.6, 0.55);

      return { key, hemi, room, room2, fam, seat0, ball, pot, steam, spoon, spL, spR, arrows, cardR, steps, baby, skipSeat, pivot, seat2, kai, kai2, nmom, phone, peds, lineup, hc, hbaby, kdad };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t);
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.26, dn); s.key.intensity = U.lerp(0.68, 0.38, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#7a72b0'), dn); s.room2.userData.wall.material.color.copy(wc); s.room2.userData.floor.material.color.copy(wc); s.room2.userData.wain.material.color.set('#ff9ec0').lerp(new T.Color('#6a4f7a'), dn);
      const arm = (g, side, z, x) => { const a = g.userData[side > 0 ? 'arm1' : 'arm-1']; a.rotation.z = z; a.rotation.x = x; };
      const pose = (g, x, y, z, ex, o) => { o = o || {}; g.visible = true; g.position.set(x, y, z); g.rotation.order = o.order || 'XYZ'; g.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0); g.userData.setExpr(ex); g.userData.tick(t, { breath: o.breath || 0.3, wave: o.wave }); g.userData.head.rotation.set(o.hx || 0, o.hy || 0, o.hz || 0); };
      const prone = (g, x, y, z, ex, roll) => { pose(g, x - 0.45 * g.userData.base / 0.62, y + 0.28 * g.userData.base / 0.62, z, ex, { order: 'YXZ', rx: 1.32, ry: 1.4, rz: roll || 0, hx: -1.0 }); arm(g, 1, 0.3, -1.4); arm(g, -1, -0.3, -1.4); };

      /* ---------- living room ---------- */
      const F = s.fam, W = F.wawa;
      for (const k in F) F[k].visible = false; s.seat0.visible = false; s.seat0.userData.strap.visible = false; s.ball.visible = false; s.spoon.visible = false;
      const seatW = (ex, o) => { s.seat0.visible = true; pose(W, SEAT[0], SEAT_Y, SEAT[1], ex, Object.assign({ rx: -0.12, hx: 0.1 }, o || {})); arm(W, 1, 0.55 + 0.05 * Math.sin(t * 3), -0.5); arm(W, -1, -0.55 - 0.05 * Math.sin(t * 3 + 1), -0.5); };
      if (bt === 'cover') { seatW(t < 1.0 ? 'worried' : 'happy', { hy: 0.25 * Math.sin(t * 1.6) }); }
      else if (bt === 's1') {
        const p = ph('s1', t), sp = SP('s1', 0.5), kw = U.easeIO(U.clamp((p - 0.1) / 0.28));
        seatW(t < sp ? 'happy' : 'worried', { hy: 0.45 * Math.sin(t * 1.3) });
        const mx = U.lerp(-1.2, 3.1, kw), mz = U.lerp(0.5, -2.65, kw);
        if (t > at('s1') + 0.7) pose(F.mom, mx, Math.abs(Math.sin(t * 9)) * 0.06 * (kw > 0.02 && kw < 0.98 ? 1 : 0), mz, 'happy', { ry: kw > 0.98 ? 2.75 : kw > 0.02 ? 2.4 : 0.4 });
        if (kw > 0.98) { s.spoon.visible = true; arm(F.mom, 1, 1.1 + 0.25 * Math.sin(t * 6), -0.9); }
        if (kw < 0.05) arm(F.mom, 1, 0.9, -0.6);
      } else if (bt === 's9') {
        const sp = SP('s9', 0.5);
        seatW('happy', { hy: 0.2 * Math.sin(t * 1.4) });
        s.seat0.userData.strap.visible = t > sp; s.seat0.userData.strap.scale.setScalar(U.easeBack(U.clamp((t - sp) / 0.35)) || 0.001);
        pose(F.mom, -1.55, sitY(F.mom), 0.25, 'happy', { ry: 0.45 }); arm(F.mom, 1, 0.95 + 0.06 * Math.sin(t * 3), -0.8);
      } else if (bt === 's10') {
        const sp = SP('s10', 0.5);
        if (t < sp) seatW('happy');
        else { prone(W, 0.0, 0, 1.0, Math.sin(t * 2) > 0 ? 'giggle' : 'happy'); s.ball.visible = true; s.ball.position.set(1.0 + 0.12 * Math.sin(t * 1.5), 0.2, 2.0); }
        pose(F.dad, 2.15, sitY(F.dad), 0.1, 'happy', { ry: -0.45 }); arm(F.dad, -1, -0.9 - 0.08 * Math.sin(t * 3), -0.7);
      } else if (bt === 's11' || bt === 's12') {
        const p = bt === 's12' ? ph('s12', t) : 0, clap = bt === 's12' && p > 0.2;
        pose(F.mom, -2.4, 0, -0.7, 'happy'); pose(F.dad, 2.45, 0, -0.7, 'happy');
        pose(F.nana, -1.32, clap ? Math.abs(Math.sin(t * 7)) * 0.15 : 0, 1.4, clap ? 'giggle' : 'happy'); pose(F.mama, 1.38, clap ? Math.abs(Math.sin(t * 7 + 1)) * 0.15 : 0, 1.4, clap ? 'giggle' : 'happy');
        pose(W, 0.0, sitY(W), 1.55, clap ? 'giggle' : 'happy', { hy: 0.2 * Math.sin(t * 1.2) }); arm(W, 1, clap ? 2.2 + 0.2 * Math.sin(t * 8) : 0.5, clap ? 0.9 : -0.3); arm(W, -1, clap ? -2.2 - 0.2 * Math.sin(t * 8) : -0.5, clap ? 0.9 : -0.3);
        if (clap) for (const k of ['mom', 'dad', 'mama', 'nana']) { arm(F[k], 1, 1.25 + 0.25 * Math.sin(t * 10), 0.9); arm(F[k], -1, -1.25 - 0.25 * Math.sin(t * 10), 0.9); }
      }
      s.steam.forEach((m, i) => { const a = (t * 0.6 + i / 4) % 1; m.position.set(3.3 + Math.sin(i * 2 + t) * 0.1, 2.25 + a * 0.9, -3.6); m.scale.setScalar(0.6 + a); m.material.opacity = 0.7 * Math.sin(a * PI); });

      /* ---------- stage 1: muscles ---------- */
      { const p = inB('s2', t) ? ph('s2', t) : 0, onR = U.clamp((t - SP('s2', 0.48)) / 0.5);
        s.spL.mus.material.color.set('#b5adc4'); s.spL.mus.material.emissiveIntensity = 0;
        s.spR.mus.material.color.set(onR > 0 ? '#ff6f91' : '#b5adc4'); s.spR.mus.material.emissiveIntensity = onR * (0.35 + 0.25 * Math.sin(t * 6));
        s.spL.g.rotation.z = 0; s.spR.g.rotation.z = 0.09 * Math.sin(t * 2.4) * (0.4 + onR);
        s.arrows.forEach((a, i) => { a.visible = onR > 0; a.position.x = (i ? 1 : -1) * (1.15 + 0.08 * Math.sin(t * 4.8 + i * PI)); });
        s.spL.verts.forEach((v, i) => v.scale.set(1.25, 0.8, 1)); }

      /* ---------- stage 2: steps ---------- */
      { const p = inB('s3', t) ? ph('s3', t) : 0;
        s.baby.forEach((g, i) => {
          const a = U.clamp((p - 0.06 - i * 0.07) / 0.06); g.visible = a > 0.01; if (!g.visible) return; g.scale.setScalar(g.userData.base * U.easeBack(a));
          const x = STEPX[i], y = STEPH[i], z = 0.15;
          if (i === 0) { prone(g, x, y, z, 'happy'); g.userData.head.rotation.x = -1.05 + 0.15 * Math.sin(t * 2); }
          else if (i === 1) { prone(g, x, y, z, 'giggle', 0.6 * Math.sin(t * 2.2)); }
          else if (i === 2) { pose(g, x, y + sitY(g) + 0.04, z, 'happy', { rx: 0.38, hx: -0.3 }); arm(g, 1, 0.25, -0.75); arm(g, -1, -0.25, -0.75); }
          else { pose(g, x, y + sitY(g), z, Math.sin(t * 2) > 0 ? 'giggle' : 'happy', { hy: 0.2 * Math.sin(t * 1.5) }); arm(g, 1, 2.1 + 0.15 * Math.sin(t * 6), 0.9); arm(g, -1, -2.1 - 0.15 * Math.sin(t * 6), 0.9); }
        });
        const sp = SP('s3', 0.52); s.skipSeat.visible = inB('s3', t) && t > sp; }

      /* ---------- stage 3: neighbour ---------- */
      { const in4 = inB('s4', t), p = in4 ? ph('s4', t) : 1, sp = SP('s4', 0.5);
        const walk = U.easeIO(U.clamp((p - 0.1) / 0.18)), back = U.easeIO(U.clamp((p - 0.66) / 0.14));
        const tilt = in4 ? U.clamp((p - 0.3) / 0.36) * (1 - back) : 0;
        s.pivot.rotation.z = -(0.32 * tilt + 0.06 * tilt * Math.sin(t * 9));
        s.pivot.visible = in4; s.kai.visible = in4;
        pose(s.kai, -0.75, SEAT_Y * 0.95, 0, tilt > 0.15 ? 'cry' : 'happy', { rx: -0.12 - 0.5 * tilt, hx: -0.5 * tilt });
        arm(s.kai, 1, 0.6 + tilt * 1.4, -0.4); arm(s.kai, -1, -0.6 - tilt * 1.4, -0.4);
        const nm = s.nmom; nm.userData.base = 1.3;
        if (in4) {
          const x = back > 0 ? U.lerp(-62.55, -61.25, back) : U.lerp(-61.85, -62.55, walk), z = back > 0 ? U.lerp(-1.0, 0.55, back) : U.lerp(0.6, -1.0, walk);
          pose(nm, x, 0, z, back > 0.05 ? 'worried' : 'happy', { ry: back > 0 ? 0.6 : walk > 0.02 && walk < 0.98 ? -2.4 : walk >= 0.98 ? -1.2 : 0.3 });
          s.phone.visible = back < 0.05 && walk > 0.3;
          if (s.phone.visible) arm(nm, 1, 1.5, -1.1); if (back > 0.3) { arm(nm, 1, 1.0, -1.2); arm(nm, -1, -1.0, -1.2); }
          s.kai2.visible = false;
        } else if (inB('s5', t)) {
          pose(nm, -61.75, sitY(nm), -0.1, 'worried', { ry: 0.5 }); s.phone.visible = false; arm(nm, 1, 0.9, -0.9);
          pose(s.kai2, -60.25, sitY(s.kai2), 0.35, 'worried', { ry: -0.3 }); arm(s.kai2, 1, 0.5, -0.4); arm(s.kai2, -1, -0.5, -0.4);
        } else { nm.visible = false; s.kai2.visible = false; } }

      /* ---------- stage 4: lineup glow ---------- */
      { const in6 = inB('s6', t), sp = SP('s6', 0.48), q = in6 && t > sp ? 1 : 0;
        s.peds.forEach((pd, i) => { const pul = 0.35 + 0.2 * Math.sin(t * 5); pd.material.emissive.set(i < 3 ? '#ff6f91' : '#2fbf8f'); pd.material.emissiveIntensity = q ? pul : 0; });
        s.lineup.forEach((g, i) => { g.rotation.y = 0.25 * Math.sin(t * 0.8 + i); }); }

      /* ---------- stage 5: kitchen ---------- */
      { const sp = SP('s8', 0.5), kb = inB('s8', t) && t > sp;
        pose(s.hbaby, 180.6, 1.45 + 0.08, 0.02, kb ? 'happy' : 'giggle', { hy: 0.25 * Math.sin(t * 1.8) }); s.hbaby.position.y += kb ? 0 : Math.abs(Math.sin(t * 5)) * 0.12;
        arm(s.hbaby, 1, kb ? 0.6 : 2.0 + 0.2 * Math.sin(t * 7), kb ? -0.6 : 0.9); arm(s.hbaby, -1, kb ? -0.6 : -2.0 - 0.2 * Math.sin(t * 7), kb ? -0.6 : 0.9);
        s.hc.userData.strap.visible = kb; s.hc.userData.strap.scale.setScalar(kb ? Math.max(0.001, U.easeBack(U.clamp((t - sp) / 0.35))) : 0.001);
        pose(s.kdad, 178.75, 0, 0.3, kb ? 'happy' : 'worried', { ry: 0.5 }); arm(s.kdad, 1, kb ? 0.9 : 1.3, kb ? -1.0 : -1.2); if (!kb) arm(s.kdad, -1, -0.5, -0.8); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { fam: s.fam, baby: s.baby, kai: s.kai, kai2: s.kai2, nmom: s.nmom, hbaby: s.hbaby, kdad: s.kdad }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (b === 's2') return ['#b8c8ff', '#ffd6ec']; if (b === 's4' || b === 's5') return ['#3a3570', '#6a4a80']; if (b === 's3' || b === 's6' || b === 's7') return ['#ffe8f0', '#fff4e6']; return ['#ffd0e2', '#fff1d6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t);
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const tag = (str, x, y, size, bg, fg) => { g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, bg); plain(str, x, y + 2, size, fg, 700, 'center'); };
      const cross = (x, y, r) => { g.save(); g.lineCap = 'round'; g.lineWidth = r * 0.32; g.strokeStyle = '#ffffff'; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fillStyle = '#ff4d6d'; g.fill(); g.lineWidth = r * 0.26; g.beginPath(); g.moveTo(x - r * 0.45, y - r * 0.45); g.lineTo(x + r * 0.45, y + r * 0.45); g.moveTo(x + r * 0.45, y - r * 0.45); g.lineTo(x - r * 0.45, y + r * 0.45); g.stroke(); g.restore(); };
      /* s2: card labels */
      if (b === 's2') {
        const onR = t > SP('s2', 0.48);
        [[58.05, 'ในเก้าอี้', 'กล้ามเนื้อหลัง "พัก"', '#d9d3e6'], [61.95, 'บนพื้น', 'กล้ามเนื้อหลัง "ได้ฝึก"', '#ffd35e']].forEach(([x, a, c, col], i) => {
          let [px, py] = proj(new T.Vector3(x, 3.95, -0.25)); tag(a, px, py, 40, i ? '#ff6f91' : '#7b6fae', '#ffffff');
          if (i === 0 || onR) { [px, py] = proj(new T.Vector3(x, 0.3, 0.6)); tag(c, px, py + 30, 32, i ? '#ff6f91' : '#7b6fae', i ? '#ffffff' : '#ffffff'); }
        });
      }
      /* s3: step labels + timeline + skip */
      if (b === 's3') {
        const p = ph('s3', t), sp = SP('s3', 0.52);
        ['ชันคอ', 'พลิกคว่ำ', 'นั่งเอามือยัน', 'นั่งเอง'].forEach((l, i) => { const a = U.clamp((p - 0.06 - i * 0.07) / 0.06); if (a <= 0) return; const [x, y] = proj(new T.Vector3(STEPX[i], STEPH[i] * 0.5, 0.82)); g.save(); g.globalAlpha = a; plain(l, x, y, 34, '#3a2f3f', 800, 'center'); g.restore(); });
        if (t < sp) {
          const a = U.clamp((p - 0.12) / 0.08), x0 = 150 + LD, x1 = 930 - LD, y = 690, mo = (m) => x0 + (x1 - x0) * m / 12;
          g.save(); g.globalAlpha = a; rr(x0, y - 14, x1 - x0, 28, 14, 'rgba(255,255,255,.9)'); const k = U.easeOut(U.clamp((p - 0.16) / 0.15)); rr(mo(3.8), y - 14, (mo(9.2) - mo(3.8)) * k, 28, 14, '#ff8fab');
          for (const m of [0, 3, 6, 9, 12]) plain(m + (m === 12 ? ' ด.' : ''), mo(m), y + 40, 28, '#3a2f3f', 600, 'center');
          g.beginPath(); g.arc(mo(6), y, 18, 0, TAU); g.fillStyle = '#ffd35e'; g.fill(); g.lineWidth = 4; g.strokeStyle = '#ffffff'; g.stroke(); g.restore();
        } else {
          const a = U.clamp((t - sp - 0.3) / 0.4); const [x0, y0] = proj(new T.Vector3(STEPX[0], STEPH[0] + 1.5, 0.2)), [x1, y1] = proj(new T.Vector3(STEPX[3], STEPH[3] + 1.7, 0.2));
          g.save(); g.globalAlpha = a; g.lineWidth = 9; g.strokeStyle = '#ff4d6d'; g.setLineDash([22, 16]); g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + x1) / 2, Math.min(y0, y1) - 150, x1, y1); g.stroke(); g.setLineDash([]); cross((x0 + x1) / 2, Math.min(y0, y1) - 75, 46); g.restore();
        }
      }
      /* s5: doctor list */
      if (b === 's5') {
        const p = ph('s5', t), a0 = U.clamp((p - 0.04) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 340, 960 - 2 * LD, 470, 30, 'rgba(25,18,50,.66)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['หมดสติ ปลุกยาก หรือซึมผิดปกติ', 'อาเจียนมากกว่า 1 ครั้ง', 'กระหม่อมโป่ง หรือหัวบวมมาก', 'ชัก ตัวเกร็ง กระตุก', 'ร้องไม่หยุด ไม่ยอมดูดนม'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s5', i, 0.1 + i * 0.1)) / 0.35); if (a <= 0) return; const y = 400 + i * 80; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(120 + LD, y, 26, 0, TAU); g.fillStyle = '#ff5f6d'; g.fill(); plain(String(i + 1), 120 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 162 + LD, y + 2, Math.round(38 * LF), '#ffffff', 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: Health Sciences Centre Winnipeg, Healthline', 540, 778, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s6: lineup labels */
      if (b === 's6') {
        const p = ph('s6', t);
        ['โฟม', 'เป่าลม', 'มีถาดของเล่น', 'เก้าอี้กินข้าว'].forEach((l, i) => { const a = U.clamp((p - 0.08 - i * 0.06) / 0.06); if (a <= 0) return; const [x, y] = proj(new T.Vector3(SHOWX[i], 0, 1.15)); g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y + 34, 24, 0, TAU); g.fillStyle = i < 3 ? '#ff6f91' : '#2fbf8f'; g.fill(); plain(String(i + 1), x, y + 36, 30, '#ffffff', 800, 'center'); plain(l, x, y + 88, 32, '#3a2f3f', 800, 'center'); g.restore(); });
      }
      /* s7: checklist */
      if (b === 's7') {
        const p = ph('s7', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.9)', '#ff8fab'); g.restore();
        const L = ['ฐานกว้าง วางแล้วไม่โยก', 'มีสายรัด ใช้ได้จริง', 'ขาแยกสบาย ไม่หนีบขาชิด', 'ไม่บีบต้นขา ไม่รัดเอวแน่น', 'ไม่มีชิ้นเล็กหลุด ไม่ติดเรียกคืน'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.1 + i * 0.13)) / 0.3); if (a <= 0) return; const y = 390 + i * 84; g.save(); g.globalAlpha = a0 * a; g.beginPath(); g.arc(130 + LD, y, 27, 0, TAU); g.fillStyle = '#2fbf8f'; g.fill(); g.lineWidth = 7; g.strokeStyle = '#ffffff'; g.lineCap = 'round'; g.beginPath(); g.moveTo(117 + LD, y + 1); g.lineTo(127 + LD, y + 11); g.lineTo(145 + LD, y - 10); g.stroke(); plain(s2, 176 + LD, y + 2, Math.round(39 * LF), '#3a2f3f', 700); g.restore(); });
      }
      /* s10: timer ring */
      if (b === 's10' && t < SP('s10', 0.5)) {
        const p = U.clamp((t - at('s10') - 0.6) / 2.2), [x0, y0] = proj(new T.Vector3(SEAT[0] - 1.45, 1.2, SEAT[1])); const x = Math.max(x0, 120 + LD), y = y0;
        g.save(); g.globalAlpha = U.clamp((t - at('s10') - 0.3) / 0.3); g.beginPath(); g.arc(x, y, 84, 0, TAU); g.fillStyle = '#ffffff'; g.fill(); g.lineWidth = 6; g.strokeStyle = '#ff8fab'; g.stroke();
        g.beginPath(); g.moveTo(x, y); g.arc(x, y, 70, -PI / 2, -PI / 2 + TAU * 0.25 * p); g.closePath(); g.fillStyle = '#ffd35e'; g.fill();
        g.lineWidth = 7; g.strokeStyle = '#3a2f3f'; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); const ang = -PI / 2 + TAU * 0.25 * p; g.lineTo(x + Math.cos(ang) * 60, y + Math.sin(ang) * 60); g.stroke(); plain('สั้นๆ', x, y + 118, 34, '#3a2f3f', 800, 'center'); g.restore();
      }
      /* s11: tips */
      if (b === 's11') {
        const p = ph('s11', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 320, 960 - 2 * LD, 455, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ชันคอแข็งก่อน ค่อยใช้', 'วางบนพื้นเท่านั้น ห่างน้ำ', 'คาดสาย มีคนเฝ้าตลอด', 'ใช้สั้นๆ แล้วพาลงเล่นพื้น', 'นั่งเองได้ → เก้าอี้กินข้าว คาดสาย'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s11', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s11', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 380 + i * 84; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(84 + LD, y - 36, 912 - 2 * LD, 72, 36, '#ffd6e4'); g.beginPath(); g.arc(130 + LD, y, 27, 0, TAU); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 130 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 176 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[88, ['เก้าอี้หัดนั่ง', '#fff']], [66, ['ช่วยให้ลูกนั่งเป็นเร็วขึ้น', '#ffd35e']], [66, ['จริงไหม?', '#ffd35e']]] },
      { t0: at('s1') + 0.25, t1: SP('s1', 0.5), y: 290, lines: [[60, ['ตัวช่วยยอดฮิต', '#ffd35e']], [48, ['วางลูกปุ๊บ แม่มี 2 มือว่าง', '#fff', 600]]] },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[56, ['ช่วยพ่อแม่ได้จริง แต่…', '#fff']], [60, ['ไม่ได้ช่วยสอนลูกนั่ง', '#ffd35e']]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.48), y: 290, lines: [[60, ['ในเก้าอี้ เบาะ "พยุงแทน"', '#fff']], [46, ['หลังงอเป็นตัว C กล้ามเนื้อหลังไม่ต้องออกแรง', '#ffe3ea', 600]]] },
      { t0: SP('s2', 0.48) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[60, ['บนพื้น ลูกต้องทรงตัวเอง', '#ffd35e']], [46, ['ล้ม-ลุก-โยก กล้ามเนื้อแกนกลางได้ฝึก', '#fff', 600]]], foot: 'นักกายภาพเด็กเตือน: อยู่ในที่นั่ง/ที่กั้นนานเกิน อาจทำให้พัฒนาการช้า' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.52), y: 270, lines: [[54, ['ลูกนั่งเองได้ ช่วงอายุ', '#fff']], [76, [(t) => { const k = U.clamp((t - at('s3') - 0.5) / 1.2); return (3.8 * k).toFixed(1) + '–' + (9.2 * k).toFixed(1) + ' เดือน'; }, '#ffd35e']], [42, ['ส่วนใหญ่ราว 6 เดือน เร็วช้าต่างกันได้', '#ffe3ea', 600]]], foot: 'WHO Motor Development Study 2006 · เด็ก 816 คน 5 ประเทศ' },
      { t0: SP('s3', 0.52) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[58, ['ใส่เก้าอี้เร็ว', '#fff']], [64, ['ไม่ได้ทำให้ข้ามขั้น', '#ffd35e']]], foot: 'ถึง 9 เดือน ยังนั่งเองไม่ได้ ปรึกษาแพทย์ (CDC)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[60, ['อันตรายสุด: วางบนที่สูง', '#ffd35e']], [46, ['โต๊ะ โซฟา เตียง ลูกแอ่นหลัง โยกตัว หลุดได้', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[60, ['เคยเรียกคืน ', '#fff'], [(t) => { const k = U.clamp((t - SP('s4', 0.5) - 0.2) / 1.0); return (4 * k).toFixed(k < 1 ? 1 : 0) + ' ล้านตัว'; }, '#ffd35e']], [46, ['เด็ก 3–10 เดือน กะโหลกร้าว 21 ราย', '#fff', 600]]], foot: 'CPSC สหรัฐฯ 2012 (เก้าอี้โฟม) · บางรายหลุดตกแม้วางบนพื้น' },
      { t0: at('s5') + 0.2, t1: end('s5') - 0.05, y: 250, lines: [[54, ['ลูกตก หัวกระแทก รีบพบแพทย์/1669 ถ้า…', '#ffd35e']]] },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.48), y: 290, lines: [[62, ['แบบไหนดี?', '#ffd35e']], [48, ['ที่เห็นบ่อย มี 4 แบบ', '#fff', 600]]] },
      { t0: SP('s6', 0.48) + 0.02, t1: end('s6') - 0.05, y: 280, lines: [[50, ['ยังนั่งเองไม่ได้ → ', '#fff'], ['1–3 ใช้สั้นๆ', '#ffd35e']], [50, ['นั่งเองได้แล้ว → ', '#fff'], ['เก้าอี้กินข้าว', '#9ff0d0']]], foot: 'ทุกแบบ: ใช้เมื่อลูกชันคอแข็งแล้วเท่านั้น (คู่มือผู้ผลิต)' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[60, ['เลือกเก้าอี้ ดู 5 ข้อ', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 280, lines: [[56, ['เก้าอี้กินข้าว ก็ตกได้', '#fff']], [70, [(t) => { const k = U.clamp((t - at('s8') - 0.5) / 1.2); return Math.round(9400 * k).toLocaleString('en-US') + ' คน/ปี'; }, '#ffd35e']], [42, ['เด็กเข้าห้องฉุกเฉิน ราวชั่วโมงละคน', '#ffe3ea', 600]]], foot: 'Clinical Pediatrics 2013 (สหรัฐฯ) · 93% เกิดจากตก' },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[50, ['2 ใน 3 กำลังปีน/ยืนในเก้าอี้', '#fff', 600]], [60, ['ถาดกันตกไม่ได้ คาดสายทุกครั้ง', '#ffd35e']]], foot: 'ล็อกล้อ วางห่างโต๊ะ/ผนัง ไม่ให้ลูกถีบได้ (Nationwide Children\'s)' },
      { t0: at('s9') + 0.2, t1: SP('s9', 0.5), y: 290, lines: [[62, ['กฎข้อ 1: บนพื้นเท่านั้น', '#ffd35e']], [48, ['ห้ามวางบนโต๊ะ โซฟา เตียง', '#fff', 600]]] },
      { t0: SP('s9', 0.5) + 0.02, t1: end('s9') - 0.05, y: 290, lines: [[56, ['คาดสาย + มีคนอยู่ข้างๆ ตลอด', '#fff']], [46, ['ห้ามใช้ในอ่างน้ำ ห้ามยกเก้าอี้ตอนลูกนั่ง', '#ffe3ea', 600]]], foot: 'คำเตือนในคู่มือผู้ผลิต' },
      { t0: at('s10') + 0.2, t1: SP('s10', 0.5), y: 290, lines: [[62, ['กฎข้อ 2: ใช้สั้นๆ', '#ffd35e']], [48, ['ช่วงเล่น ป้อนข้าว ไม่ใช่ทั้งวัน', '#fff', 600]]], foot: 'นักกายภาพเด็กแนะนำ ราว 15–30 นาที/วัน' },
      { t0: SP('s10', 0.5) + 0.02, t1: end('s10') - 0.05, y: 290, lines: [[58, ['ที่เหลือ ให้ฝึกบนพื้น', '#fff']], [44, ['นอนคว่ำเล่น · วางของเล่นข้างหน้า · นั่งพิงตัก', '#ffe3ea', 600]]] },
      { t0: at('s11') + 0.2, t1: end('s11') - 0.05, y: 250, lines: [[60, ['5 ทิป ใช้เก้าอี้หัดนั่ง', '#ffd35e']]] },
      { t0: at('s12') + 0.2, t1: end('s12'), y: 290, lines: [[58, ['ลูกจะนั่งได้ ตอนที่ตัวเองพร้อม', '#fff']], [44, ['ลูกคุณนั่งเองได้ตอนกี่เดือน? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: WHO 2006, CPSC 2012, Clinical Pediatrics 2013, คู่มือผู้ผลิต' },
    ],
    trans,
    audio: [
      [0.4, 'pop'], [1.2, 'giggle'],
      [at('s1') + 0.3, 'whoosh'], [P('s1', 0.25), 'pop'], [SP('s1', 0.5), 'boing'],
      [at('s2') + 0.3, 'shimmer'], [P('s2', 0.25), 'tick'], [SP('s2', 0.48), 'ding'], [SP('s2', 0.48) + 0.8, 'bubble'], [SP('s2', 0.48) + 1.6, 'bubble'],
      [at('s3') + 0.5, 'pop'], [P('s3', 0.13), 'pop'], [P('s3', 0.2), 'pop'], [P('s3', 0.27), 'pop'], [P('s3', 0.34), 'ding'], [SP('s3', 0.52) + 0.3, 'whoosh'], [SP('s3', 0.52) + 0.7, 'warn'],
      [at('s4') + 0.3, 'heartbeat'], [P('s4', 0.35), 'warn'], [P('s4', 0.5), 'heartbeat'], [P('s4', 0.66), 'whoosh'], [P('s4', 0.8), 'thud'],
      [at('s5') + 0.3, 'heartbeat'], [TM('s5', 0, 0.1), 'tick'], [TM('s5', 1, 0.2), 'tick'], [TM('s5', 2, 0.3), 'tick'], [TM('s5', 3, 0.4), 'tick'], [TM('s5', 4, 0.5), 'tick'],
      [at('s6') + 0.3, 'twinkle'], [P('s6', 0.1), 'pop'], [P('s6', 0.16), 'pop'], [P('s6', 0.22), 'pop'], [P('s6', 0.28), 'pop'], [SP('s6', 0.48), 'ding'],
      [TM('s7', 0, 0.1), 'ding'], [TM('s7', 1, 0.23), 'tick'], [TM('s7', 2, 0.36), 'tick'], [TM('s7', 3, 0.49), 'tick'], [TM('s7', 4, 0.62), 'tick'],
      [at('s8') + 0.3, 'giggle'], [at('s8') + 0.6, 'riser'], [SP('s8', 0.5), 'pop'], [SP('s8', 0.5) + 0.3, 'ding'],
      [at('s9') + 0.3, 'twinkle'], [SP('s9', 0.5), 'pop'],
      [at('s10') + 0.4, 'tick'], [at('s10') + 1.4, 'tick'], [at('s10') + 2.4, 'tick'], [SP('s10', 0.5), 'whoosh'], [SP('s10', 0.5) + 0.6, 'giggle'],
      [TM('s11', 0, 0.1), 'ding'], [TM('s11', 1, 0.27), 'tick'], [TM('s11', 2, 0.44), 'tick'], [TM('s11', 3, 0.61), 'tick'], [TM('s11', 4, 0.78), 'tick'],
      [at('s12') + 0.3, 'twinkle'], [P('s12', 0.25), 'giggle'], [P('s12', 0.5), 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s2'), CK.MUSIC.CUTE), CK.musicBed(at('s2'), at('s3'), CK.MUSIC.OOPS), CK.musicBed(at('s3'), at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s6'), CK.MUSIC.NIGHT), CK.musicBed(at('s6'), at('s12'), CK.MUSIC.CUTE), CK.musicBed(at('s12'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
