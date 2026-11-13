/* Part C: stations + setup */
const ST = {
  CAL: [0, 0, 0], CLK: [40, 0, 0], VAL: [80, 0, 0], SUP: [120, 0, 0], HAR: [160, 0, 0], TMP: [200, 0, 0], PAR: [240, 0, 0], WALL: [280, 0, 0],
  SEA: [330, 0, 0], CIN: [380, 0, 0], TOW: [420, 0, 0], ROAD: [460, 0, 0], OFF: [500, 0, 0], THA: [540, 0, 0], MAPC: [-1000, 0, 0],
};
const MP = FK.project(10, 30, 0.32);
const mapXZ = (lon, lat) => { const q = MP(lon, lat); return [ST.MAPC[0] + q[0], -q[1]]; };
const PL = { paris: [2.35, 48.86], phil: [-75.2, 39.9], scilly: [-6.35, 49.9], madrid: [-3.7, 40.4], athens: [23.7, 38.0], mexico: [-99.1, 19.4], rome: [12.5, 41.9], bkk: [100.5, 13.75], boston: [-71.06, 42.36] };
const LATAM = ['Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama', 'Cuba', 'Dominican Rep.', 'Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay'];
const HL = { tue: new Set(['Spain', 'Greece'].concat(LATAM)), it: new Set(['Italy']), th: new Set(['Thailand']), route: new Set(['United States of America', 'United Kingdom']), fr: new Set(['France']) };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
const DOW = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'], CNT = [685, 685, 687, 684, 688, 684, 687];

function setupScene(scene) {
  const s = { anchorV: new T.Vector3() };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#26305a', 40, 115); s.fog = scene.fog;
  let rs = 13; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

  /* ---------- ground world ---------- */
  const ground = mk(new T.BoxGeometry(620, 0.4, 120), '#46684a'); ground.position.set(270, -0.2, -40); scene.add(ground);
    for (let i = 0; i < 170; i++) {
    const x = -15 + rnd() * 575, z = -75 + rnd() * 70; if (Object.values(ST).some((c) => Math.abs(c[0] - x) < 11) && z > -16) continue;
    if (x > 300 && x < 360) continue;
    const tr = tree(0.8 + rnd() * 0.9, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  for (const h of [[20, -60, 16], [100, -64, 18], [190, -60, 16], [260, -62, 20], [400, -60, 18], [480, -58, 16], [550, -60, 18]]) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#567a5c'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- CAL: today ---------- */
  s.tex = {
    nov: calTex('พ.ย. 2569', '13', 'วันศุกร์'), feb: calTex('ก.พ. 2569', '13', 'วันศุกร์'), mar: calTex('มี.ค. 2569', '13', 'วันศุกร์'),
    aug: calTex('ส.ค. 2570', '13', 'วันศุกร์', P.violet), blank: calTex('พ.ย. 2569', '12', 'วันพฤหัส', '#7a8296'),
    c1307: calTex('ต.ค. 1307', '13', 'วันศุกร์', '#8a6a3a'), c1868: calTex('พ.ย. 1868', '13', 'วันศุกร์', '#8a6a3a'), c1907: calTex('ธ.ค. 1907', '13', 'วันศุกร์', '#5a6a8a'),
    fri: calTex('วันนี้คือ', 'ศุกร์', 'FRIDAY', '#8a6a3a'), sat: calTex('เลื่อนไป', 'เสาร์', 'SATURDAY', P.violet),
    lift: { idle: liftTex(''), '12': liftTex('12'), '12A': liftTex('12A'), '14': liftTex('14') },
  };
  const cal = calPad(1.55); place(cal, 'CAL', 0, 0, 0); scene.add(cal);
  const cat = catM(); place(cat, 'CAL', 2.3, 0, 1.2); cat.rotation.y = -2.4; cat.scale.setScalar(1.25); scene.add(cat);
  const post = mk(new T.BoxGeometry(0.25, 2.2, 0.25), '#8a92a6'); place(post, 'CAL', -2.9, 1.1, 0.2); scene.add(post);
  const lift = plane(1.0, 2.5, s.tex.lift.idle, { transparent: false }); place(lift, 'CAL', -2.9, 3.4, 0.35); scene.add(lift);
  const worker = chibi({ robe: '#3a6fb0', hair: '#2a2228', sleeve: '#f2f0ea' }); place(worker, 'CAL', -1.6, 0, 1.9); worker.scale.setScalar(0.8); scene.add(worker);
  const plane3 = new T.Group(); { const b = mk(new T.CylinderGeometry(0.25, 0.25, 2.6, 8), '#f2f4fa'); b.rotation.z = Math.PI / 2; plane3.add(b); const w = mk(new T.BoxGeometry(0.6, 0.06, 2.8), '#c9d3ea'); plane3.add(w); const tl = mk(new T.BoxGeometry(0.5, 0.7, 0.06), P.coral); tl.position.set(-1.2, 0.35, 0); plane3.add(tl); }
  scene.add(plane3);
  /* math cards */
  const cards = DOW.map((d, i) => { const tx = ctex(256, 300, (x, w, h) => { x.fillStyle = i === 4 ? '#ffc94a' : '#f4f1ea'; x.fillRect(0, 0, w, h); x.fillStyle = i === 4 ? '#0f1630' : '#1a1f3a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = KF(700, 46); x.fillText(d, w / 2, 70); x.font = KF(800, 92); x.fillText(CNT[i], w / 2, 190); });
    const p = plane(1.0, 1.17, tx, { transparent: false }); scene.add(p); return p; });
  s.cal = { cal, cat, lift, worker, plane3, cards };

  /* ---------- CLK: 12 vs 13 ---------- */
  const ped = mk(new T.CylinderGeometry(1.2, 1.5, 1.2, 8), '#3a3f55'); place(ped, 'CLK', 0, 0.6, -1.5); scene.add(ped);
  const clk = clockM(); place(clk, 'CLK', 0, 3.6, -1.5); scene.add(clk);
  const months = []; for (let i = 0; i < 13; i++) { const b = block(String(i + 1), i === 12 ? P.coral : i % 2 ? '#2aa58f' : P.teal, 0.85); scene.add(b); months.push(b); }
  s.clk = { clk, months };

  /* ---------- VAL: Valhalla feast ---------- */
  const vfl = mk(new T.BoxGeometry(14, 0.2, 9), '#5a3c22'); place(vfl, 'VAL', 0, 0.1, -1); scene.add(vfl);
  const vw = mk(new T.BoxGeometry(14, 7, 0.4), '#6b4a26'); place(vw, 'VAL', 0, 3.5, -5.3); scene.add(vw);
    for (const x of [-6.4, 6.4]) { const pl = mk(new T.CylinderGeometry(0.4, 0.45, 7, 8), '#8a6a3a'); place(pl, 'VAL', x, 3.5, -3.6); scene.add(pl); }
  const fireV = fire(); place(fireV, 'VAL', 0, 0.2, 2.4); fireV.scale.setScalar(0.9); scene.add(fireV);
  const vt = table(7.6, '#6a4626'); place(vt, 'VAL', 0, -0.15, -1); scene.add(vt);
  for (let i = 0; i < 6; i++) { const c = cup(); place(c, 'VAL', -3 + i * 1.2, 0.9, -0.8); scene.add(c); }
  const gods = []; const GC = ['#7a5a9a', '#3a6a9a', '#9a4a3a', '#4a7a4a', '#8a7a3a', '#5a5a8a', '#9a6a3a', '#3a7a7a', '#7a3a5a', '#4a5a7a', '#8a5a5a', '#5a7a5a'];
  for (let i = 0; i < 12; i++) {
    const balder = i === 6, hod = i === 0;
    const gd = chibi({ robe: balder ? '#fff4d6' : GC[i], hair: balder ? '#ffe08a' : '#a7afbd', beard: i % 3 === 1 ? '#c9b48a' : null, glow: balder ? '#ffd27a' : null, ring: balder ? '#ffe08a' : null, closed: hod });
    gd.scale.setScalar(0.78); const x = -3.6 + (i + (i >= 6 ? 0.6 : 0)) * 0.62; place(gd, 'VAL', x, 0.2, -2.15); scene.add(gd); gods.push(gd);
  }
  const loki = chibi({ robe: '#2f8a4a', hair: '#1a3a22', sash: P.gold }); loki.scale.setScalar(0.85);
  for (const s2 of [-1, 1]) { const h = mk(new T.ConeGeometry(0.08, 0.5, 5), P.gold, GOLDM); h.position.set(s2 * 0.22, 0.45, 0); h.rotation.z = -s2 * 0.5; loki.userData.head.add(h); }
  scene.add(loki);
  const arrow = new T.Group(); { const sh = mk(new T.CylinderGeometry(0.03, 0.03, 1.1, 5), '#d8c8a0'); sh.rotation.z = Math.PI / 2; arrow.add(sh); for (let k = 0; k < 3; k++) { const lf = mk(new T.SphereGeometry(0.09, 6, 4), '#7acb5a'); lf.position.set(0.5 + k * 0.08, (k - 1) * 0.08, 0); arrow.add(lf); } }
  scene.add(arrow);
  const motes = []; for (let i = 0; i < 14; i++) { const q = softSprite('rgba(255,225,150,1)', 0.9); q.scale.setScalar(0.5); scene.add(q); motes.push(q); }
  s.val = { gods, loki, arrow, motes, fire: fireV };

  /* ---------- SUP: 13 at the table ---------- */
  const sfl = mk(new T.BoxGeometry(14, 0.2, 9), '#8a7a62'); place(sfl, 'SUP', 0, 0.1, -1); scene.add(sfl);
  const sw = mk(new T.BoxGeometry(14, 6.5, 0.4), '#c9b99a'); place(sw, 'SUP', 0, 3.25, -5.3); scene.add(sw);
  for (const x of [-3.6, 0, 3.6]) { const win = new T.Mesh(new T.PlaneGeometry(1.6, 2.4), basic('#ffe2a8')); place(win, 'SUP', x, 3.6, -5.08); scene.add(win); const arc = new T.Mesh(new T.CircleGeometry(0.8, 12, 0, Math.PI), basic('#ffe2a8')); place(arc, 'SUP', x, 4.8, -5.08); scene.add(arc); }
  const st2 = table(8.4, '#7a5a3a'); place(st2, 'SUP', 0, -0.25, -1); scene.add(st2);
  for (let i = 0; i < 7; i++) { const br = mk(new T.SphereGeometry(0.13, 6, 4), '#d8a868'); br.scale.y = 0.6; place(br, 'SUP', -3.3 + i * 1.1, 0.85, -0.7); scene.add(br); const c = cup('#c9a27a'); c.material = M('#b98a5a'); place(c, 'SUP', -2.8 + i * 1.0, 0.8, -0.5); scene.add(c); }
  const thirteen = []; const RC = ['#8a6a4a', '#6a7a8a', '#7a5a6a', '#5a6a5a', '#9a7a5a', '#6a5a7a', '#7a7a6a'];
  for (let i = 0; i < 13; i++) { const f = chibi({ robe: RC[i % 7], hair: '#3a2a20', beard: i % 2 ? '#3a2a20' : null }); f.scale.setScalar(0.68); place(f, 'SUP', -3.9 + i * 0.65, 0.2, -2.05); scene.add(f); thirteen.push(f); }
  const nums = thirteen.map((f, i) => { const sp = label(String(i + 1), { w: 0.9, color: i === 12 ? P.coral : '#fff' }); scene.add(sp); return sp; });
  const bag = mk(new T.SphereGeometry(0.16, 8, 6), P.gold, GOLDM); scene.add(bag);
  s.sup = { thirteen, nums, bag };

  /* ---------- HAR: chapel + harbour ---------- */
  const water = new T.Mesh(new T.PlaneGeometry(26, 22, 26, 22), new T.MeshStandardMaterial({ color: '#2b5fa0', flatShading: true, roughness: 0.4 })); water.rotation.x = -Math.PI / 2; place(water, 'HAR', 8, 0.08, -12); scene.add(water);
  const hill = mk(new T.CylinderGeometry(5, 6.5, 1.2, 9), '#4f7a52'); place(hill, 'HAR', -6, 0.6, -4); scene.add(hill);
  const chp = chapel(); place(chp, 'HAR', -6, 1.2, -4.2); scene.add(chp);
  const dock = mk(new T.BoxGeometry(7, 0.3, 3), '#9a7a52'); place(dock, 'HAR', 4.2, 0.3, 0.2); scene.add(dock);
  for (let i = 0; i < 4; i++) { const p = mk(new T.CylinderGeometry(0.14, 0.14, 1.2, 6), '#6a4a2a'); place(p, 'HAR', 1.2 + i * 2, 0.2, -1.2); scene.add(p); }
  const ship = sailShip(3, 5.2, { hull: '#5a3a22', stripe: '#e8d8a0' }); place(ship, 'HAR', 4.4, -0.25, -3.2); scene.add(ship);
  const sailors = []; for (let i = 0; i < 3; i++) { const sl = chibi({ robe: i === 1 ? '#22304a' : '#2c4a7a', hair: '#e8e2d0', sleeve: '#f2f0ea', band: i === 1 ? P.gold : null }); sl.scale.setScalar(0.75); place(sl, 'HAR', 2.6 + i * 1.3, 0.45, 0.6); scene.add(sl); sailors.push(sl); }
  const hcal = calPad(0.75); place(hcal, 'HAR', -3.0, 0, -0.6); hcal.rotation.y = 0.3; scene.add(hcal);
  const bride = chibi({ robe: '#ffffff', hair: '#5a3a2a', sleeve: '#ffffff' }); bride.scale.setScalar(0.8); place(bride, 'HAR', -8, 1.2, 0); bride.visible = false; scene.add(bride);
  const veil = mk(new T.ConeGeometry(0.5, 0.9, 10, 1, true), '#f4f6ff', { transparent: true, opacity: 0.8, side: T.DoubleSide }); veil.position.set(0, 0.2, -0.1); bride.userData.head.add(veil);
  const groom = chibi({ robe: '#1e2233', hair: '#2a2228', sash: '#ffffff' }); groom.scale.setScalar(0.8); place(groom, 'HAR', -9, 1.2, 0); groom.visible = false; scene.add(groom);
  s.har = { water, ship, sailors, hcal, bride, groom };

  /* ---------- TMP: Templars 1307 ---------- */
  const cw = crenWall(12, 3.2); place(cw, 'TMP', 0, 0, -4); scene.add(cw);
  for (const x of [-6.4, 6.4]) { const tw = towerC(1.1, 5.2); place(tw, 'TMP', x, 0, -4); scene.add(tw); }
  const gate = mk(new T.BoxGeometry(1.8, 2.2, 0.2), '#3a2a1a'); place(gate, 'TMP', 0, 1.1, -3.45); scene.add(gate);
  const knights = []; for (let i = 0; i < 4; i++) { const k = knight(); k.scale.setScalar(0.85); scene.add(k); knights.push(k); }
  const guards = []; for (let i = 0; i < 4; i++) { const gd = knight('#2a4a9a', P.gold); gd.scale.setScalar(0.85); scene.add(gd); guards.push(gd);
    const sp = mk(new T.CylinderGeometry(0.03, 0.03, 2.2, 5), '#c9ced8'); sp.position.set(0.1, -0.3, 0.12); gd.userData.arms.R.add(sp); }
  const tcal = calPad(0.85); place(tcal, 'TMP', -3.6, 0, 0.8); tcal.rotation.y = 0.35; scene.add(tcal);
  s.tmp = { knights, guards, tcal };

  /* ---------- PAR: Rossini 1868 ---------- */
  [[-5.5, 3, 4, '#e9dcc4'], [-1.6, 3.6, 5, '#efe3cc'], [2.6, 4.2, 4, '#e4d6bc'], [6.6, 3.4, 5, '#ebdfc8']].forEach((q) => { const h = parisHouse(q[1], q[2], q[3]); place(h, 'PAR', q[0], 0, -5.5); scene.add(h); });
  const rug = mk(new T.CylinderGeometry(3.4, 3.4, 0.05, 20), '#8a2a3a'); place(rug, 'PAR', 0, 0.03, 0); rug.scale.z = 0.6; scene.add(rug);
  const pno = piano(); place(pno, 'PAR', -1.4, 0, -0.4); pno.rotation.y = Math.PI / 2; scene.add(pno);
  const ross = chibi({ robe: '#3a2e4a', hair: '#7a5a3a', sleeve: '#3a2e4a', sash: '#f2f0ea' }); ross.userData.body.scale.x = 1.25; ross.userData.body.scale.z = 1.25; place(ross, 'PAR', 0.15, 0, -0.4); ross.rotation.y = -Math.PI / 2; setSit(ross, true); scene.add(ross);
  const notes = []; for (let i = 0; i < 6; i++) { const sp = label(i % 2 ? '♪' : '♫', { w: 1.1, color: P.gold, px: 120 }); scene.add(sp); notes.push(sp); }
  const pcal = calPad(0.8); place(pcal, 'PAR', 2.6, 0, -0.4); pcal.rotation.y = -0.35; scene.add(pcal);
  const pcal2 = calPad(0.8); place(pcal2, 'PAR', 4.2, 0, -0.2); pcal2.rotation.y = -0.45; scene.add(pcal2);
  const desk2 = deskM(); desk2.children.slice(3).forEach((c) => (c.visible = false)); place(desk2, 'PAR', -3.6, 0, 0.6); scene.add(desk2);
  const bio = chibi({ robe: '#2a3a5a', hair: '#9a9a9a', sleeve: '#2a3a5a' }); bio.scale.setScalar(0.85); place(bio, 'PAR', -3.6, 0, -0.45); scene.add(bio);
  const book1 = bookM('THE LIFE|OF|ROSSINI', '1869', '#2a4a3a'); book1.scale.setScalar(0.3); place(book1, 'PAR', -3.3, 1.05, 0.75); book1.rotation.x = -0.6; scene.add(book1);
  const pmotes = []; for (let i = 0; i < 12; i++) { const q = softSprite('rgba(255,225,150,1)', 0.9); q.scale.setScalar(0.45); scene.add(q); pmotes.push(q); }
  s.par = { ross, notes, pcal, pcal2, bio, book1, pmotes, pno };

  /* ---------- WALL: Lawson's novel + Wall Street ---------- */
  const ex = exchange(); place(ex, 'WALL', 0.6, 0, -4.2); scene.add(ex);
  const bk = bookM('FRIDAY,|THE|THIRTEENTH', 'T. W. LAWSON · 1907'); place(bk, 'WALL', -3.3, 0, 0.4); bk.rotation.y = 0.35; scene.add(bk);
  const law = chibi({ robe: '#1e2233', hair: '#3a2a20', sleeve: '#1e2233', sash: '#c0392b', beard: '#3a2a20' }); law.scale.setScalar(0.9); place(law, 'WALL', -1.6, 0, 1.3); scene.add(law);
  const hat = mk(new T.CylinderGeometry(0.28, 0.3, 0.5, 10), '#15161e'); hat.position.y = 0.55; law.userData.head.add(hat);
  const tick = ctex(512, 320, () => {}); const board = plane(3.4, 2.1, tick, { transparent: false }); place(board, 'WALL', 3.4, 2.6, 0.4); board.rotation.y = -0.3; scene.add(board);
  const bpost = mk(new T.BoxGeometry(0.2, 1.6, 0.2), '#3a3f55'); place(bpost, 'WALL', 3.4, 0.8, 0.2); scene.add(bpost);
  const brokers = []; for (let i = 0; i < 5; i++) { const b = chibi({ robe: ['#2a2f44', '#3a3a3a', '#2a3a4a'][i % 3], hair: '#2a2228', sleeve: '#e8e2d0' }); b.scale.setScalar(0.7); const bh = mk(new T.SphereGeometry(0.3, 10, 6, 0, 6.283, 0, 1.4), '#15161e'); bh.position.y = 0.25; b.userData.head.add(bh); place(b, 'WALL', -0.4 + i * 0.9, 0, 2.6 + (i % 2) * 0.5); scene.add(b); brokers.push(b); }
  s.wall = { tick, board, brokers, bk, law };

  /* ---------- SEA: the seven-masted schooner ---------- */
  const sea = new T.Mesh(new T.PlaneGeometry(70, 60, 40, 30), new T.MeshStandardMaterial({ color: '#1f3f6e', flatShading: true, roughness: 0.35 })); sea.rotation.x = -Math.PI / 2; place(sea, 'SEA', 0, 0.12, -14); scene.add(sea);
  const rocks = []; for (const q of [[-3, -3, 1.2], [-1.6, -2.4, 0.8], [-4.2, -1.6, 0.9], [-2.2, -4.2, 1.5], [3.8, -6, 1.3], [-6.5, -5, 1.1]]) { const r = rockM(q[2]); place(r, 'SEA', q[0], 0.2, q[1]); scene.add(r); rocks.push(r); }
  const lh = lighthouse(); place(lh, 'SEA', -8, 0, -9); scene.add(lh);
  const lhb = rockM(1.8, '#3a3f4e'); place(lhb, 'SEA', -8, 0.1, -9); scene.add(lhb);
  const sch = sailShip(7, 9, { hull: '#2a2f44', stripe: '#e8e2d0', mh: 5.2, sw: 1.05 }); sch.scale.setScalar(0.85); scene.add(sch);
  const surv = []; for (let i = 0; i < 2; i++) { const c = chibi({ robe: '#2c4a7a', hair: '#e8e2d0' }); c.scale.setScalar(0.55); scene.add(c); surv.push(c); }
  const rain = new T.Points(new T.BufferGeometry(), new T.PointsMaterial({ color: '#a9c4ff', size: 0.08, transparent: true, opacity: 0.7 }));
  { const n = 900, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = ST.SEA[0] + (rnd() - 0.5) * 30; p[i * 3 + 1] = rnd() * 14; p[i * 3 + 2] = -14 + rnd() * 24; } rain.geometry.setAttribute('position', new T.BufferAttribute(p, 3)); rain.userData.base = p.slice(); }
  scene.add(rain);
  s.sea = { sea, sch, lh, surv, rain };

  /* ---------- CIN: 1980 ---------- */
  const cn = cinema(); place(cn, 'CIN', 0, 0, -1.6); scene.add(cn);
  const queue = []; for (let i = 0; i < 6; i++) { const q = chibi({ robe: [P.coral, P.teal, P.violet, '#e8892a', '#3a6fb0', '#c94a8a'][i], hair: ['#2a2228', '#7a4a2a', '#e8c070'][i % 3] }); q.scale.setScalar(0.62); scene.add(q); queue.push(q); }
  s.cin = { cn, queue };

  /* ---------- TOW: no 13th floor ---------- */
  const floors = []; for (let i = 1; i <= 16; i++) { const g = new T.Group(); const sl = mk(new T.BoxGeometry(3.4, 0.82, 3.4), i % 2 ? '#5a7ab0' : '#4f6fa6', { roughness: 0.3, metalness: 0.2 }); sl.position.y = 0.41; g.add(sl);
    const fl = mk(new T.BoxGeometry(3.6, 0.1, 3.6), '#d8dde8'); fl.position.y = 0.86; g.add(fl);
    const tag = i < 13 ? String(i) : i === 13 ? '12A' : String(i); const lp = plane(1.2, 0.45, i === 13 ? slabTex('13') : slabTex(tag)); if (i === 13) { g.userData.t13 = lp.material.map; g.userData.t12a = slabTex('12A', true); g.userData.lp = lp; } lp.position.set(0, 0.42, 1.71); g.add(lp);
    place(g, 'TOW', 0, (i - 1) * 0.92, -1); scene.add(g); floors.push(g); }
  const car = mk(new T.BoxGeometry(0.9, 0.82, 0.9), '#ffe08a', { transparent: true, opacity: 0.75, emissive: new T.Color('#6a5a20'), emissiveIntensity: 0.4 }); scene.add(car);
  const rider = chibi({ robe: '#3a6fb0', hair: '#2a2228' }); rider.scale.setScalar(0.42); scene.add(rider);
  const tlift = plane(1.0, 2.5, s.tex.lift.idle, { transparent: false }); place(tlift, 'TOW', 3.4, 10.4, 0.6); tlift.rotation.y = -0.25; scene.add(tlift);
  const crowd = []; for (let i = 0; i < 18; i++) { const c = chibi({ robe: [P.coral, P.teal, P.violet, '#e8892a', '#3a6fb0', '#c94a8a'][i % 6], hair: ['#2a2228', '#7a4a2a', '#e8c070'][i % 3] }); c.scale.setScalar(0.5); place(c, 'TOW', -3 + (i % 6) * 1.2, 0, 2.2 + Math.floor(i / 6) * 0.9); scene.add(c); crowd.push(c); }
  s.tow = { floors, car, rider, tlift, crowd };

  /* ---------- ROAD: Dutch numbers ---------- */
  const road = mk(new T.BoxGeometry(40, 0.08, 3.2), '#3a3d48'); place(road, 'ROAD', 0, 0.05, 2.0); scene.add(road);
  for (let i = 0; i < 20; i++) { const d = mk(new T.BoxGeometry(0.9, 0.02, 0.12), '#f4f1ea'); place(d, 'ROAD', -19 + i * 2, 0.1, 2.0); scene.add(d); }
  const cars = []; for (let i = 0; i < 6; i++) { const c = carM([P.coral, P.teal, '#f4f1ea', P.violet, '#e8892a', '#3a6fb0'][i]); scene.add(c); cars.push(c); }
  const barA = FK.bar(T, 1.6, 1.6, P.teal); place(barA, 'ROAD', -1.4, 0, -2.2); scene.add(barA);
  const barB = FK.bar(T, 1.6, 1.6, P.gold); place(barB, 'ROAD', 1.4, 0, -2.2); scene.add(barB);
  const bla = label('ศุกร์ทั่วไป', { w: 2.6 }), blb = label('ศุกร์ 13', { w: 2.6, color: P.gold }); scene.add(bla, blb);
  const ana = chibi({ robe: '#f2f0ea', hair: '#e8c070', sleeve: '#3a6fb0' }); ana.scale.setScalar(0.8); place(ana, 'ROAD', 3.6, 0, -0.4); scene.add(ana);
  const clip = mk(new T.BoxGeometry(0.4, 0.5, 0.04), '#c9a27a'); clip.position.set(0, -0.55, 0.12); ana.userData.arms.R.add(clip);
  s.road = { cars, barA, barB, bla, blb, ana };

  /* ---------- OFF: coffee ---------- */
  const ofl = mk(new T.BoxGeometry(10, 0.12, 7), '#8f8a80'); place(ofl, 'OFF', 0, 0.06, -0.5); scene.add(ofl);
  const owall = mk(new T.BoxGeometry(10, 5, 0.3), '#d8d2c4'); place(owall, 'OFF', 0, 2.5, -4); scene.add(owall);
  const owin = new T.Mesh(new T.PlaneGeometry(2.4, 1.8), basic('#8fc4ff')); place(owin, 'OFF', -2.6, 3.0, -3.84); scene.add(owin); for (const dx of [0, 1]) { const bar = mk(new T.BoxGeometry(dx ? 2.5 : 0.08, dx ? 0.08 : 1.9, 0.05), '#f4f1ea'); place(bar, 'OFF', -2.6, 3.0, -3.8); scene.add(bar); }
  const plant = tree(0.7, '#4f9a4a'); place(plant, 'OFF', 3.6, 0.1, -2.6); scene.add(plant);
  const dk = deskM(); place(dk, 'OFF', 0, 0, -1.3); scene.add(dk);
  const mug = mugM(); scene.add(mug);
  const puddle = new T.Mesh(new T.CircleGeometry(0.5, 16), basic('#6a3c1e')); puddle.rotation.x = -Math.PI / 2; scene.add(puddle);
  const ow = chibi({ robe: '#f2f0ea', hair: '#2a2228', sleeve: '#f2f0ea', sash: '#3a6fb0' }); place(ow, 'OFF', -0.7, 0, -0.2); ow.rotation.y = Math.PI; setSit(ow, true); scene.add(ow);
  const chair = mk(new T.BoxGeometry(0.9, 0.12, 0.9), '#3a3f55'); place(chair, 'OFF', -0.7, 0.6, -0.1); scene.add(chair);
  const ocal = plane(1.1, 1.29, s.tex.nov, { transparent: false }); place(ocal, 'OFF', 2.8, 2.9, -3.84); scene.add(ocal);
  s.off = { mug, puddle, ow };

  /* ---------- THA: ศุกร์ = สุข ---------- */
  const tg = mk(new T.BoxGeometry(18, 0.12, 10), '#c9b896'); place(tg, 'THA', 0, 0.06, -1.5); scene.add(tg);
  const mr = meru(); place(mr, 'THA', -3.2, 0, -2.8); scene.add(mr);
  const tm = palace('#fbe9c2'); place(tm, 'THA', 5.2, 0, -5.2); tm.scale.setScalar(1.1); scene.add(tm);
  const sign = signBoard([['วันศุกร์', 110], ['งดเผาศพ', 96]], 2.2, 1.5); place(sign, 'THA', 0.6, 0, 0.6); sign.rotation.y = -0.15; scene.add(sign);
  const fam = [chibi({ robe: '#e8892a', hair: '#2a2228' }), chibi({ robe: '#c94a8a', hair: '#2a2228' }), chibi({ robe: P.teal, hair: '#2a2228' })];
  fam.forEach((f, i) => { f.scale.setScalar(i === 2 ? 0.55 : 0.75); place(f, 'THA', 3.2 + i * 1.1, 0, 1.2); scene.add(f); });
  const spark = []; for (let i = 0; i < 16; i++) { const q = softSprite('rgba(255,215,110,1)', 0.9); q.scale.setScalar(0.35); scene.add(q); spark.push(q); }
  for (const x of [-8, -6.8, 8.2]) { const tr = tree(1.2, '#4f9a4a'); place(tr, 'THA', x, 0, -1); scene.add(tr); }
  s.tha = { fam, spark, sign };

  /* ---------- MAP ---------- */
  const oc = mk(new T.BoxGeometry(120, 0.2, 60), '#13204a'); oc.position.set(ST.MAPC[0], -0.15, 5); scene.add(oc);
  const feats = DATA.world.features.filter((f) => f.properties.name !== 'Antarctica');
  const reg = FK.regions(T, feats, { project: (lon, lat) => { const q = MP(lon, lat); return [q[0], q[1]]; }, idOf: (f) => f.properties.name, color: () => '#5a7ab8' });
  reg.group.position.set(ST.MAPC[0], 0, 0); scene.add(reg.group);
  for (const id in reg.meshes) { reg.meshes[id].scale.z = 0.12; reg.meshes[id].userData.base = reg.meshes[id].material.color.clone(); }
  const pins = {}; const mkPin = (k, txt, col) => { const g = new T.Group(); const p = mk(new T.ConeGeometry(0.22, 0.7, 8), col || P.coral); p.rotation.x = Math.PI; p.position.y = 0.6; g.add(p); const b = mk(new T.SphereGeometry(0.24, 10, 8), col || P.coral); b.position.y = 1.05; g.add(b);
    if (txt) { const lb = label(txt, { w: 2.4, color: '#fff' }); lb.position.y = 1.7; g.add(lb); } const [x, z] = mapXZ(PL[k][0], PL[k][1]); g.position.set(x, 0.2, z); g.visible = false; scene.add(g); pins[k] = g; return g; };
  mkPin('paris', '', P.gold); mkPin('phil', 'ฟิลาเดลเฟีย', P.teal); mkPin('scilly', 'หมู่เกาะซิลลี', P.coral); mkPin('rome', '', P.violet); mkPin('bkk', '', P.gold);
  mkPin('madrid', '', P.coral); mkPin('athens', '', P.coral); mkPin('mexico', '', P.coral);
  /* route line Philadelphia -> Scilly (great-circle-ish arc on the map) */
  const rpts = []; for (let i = 0; i <= 60; i++) { const k = i / 60, lon = U.lerp(PL.phil[0], PL.scilly[0], k), lat = U.lerp(PL.phil[1], PL.scilly[1], k) + Math.sin(k * Math.PI) * 4; const [x, z] = mapXZ(lon, lat); rpts.push(new T.Vector3(x, 0.35, z)); }
  const rl = new T.Line(new T.BufferGeometry().setFromPoints(rpts), new T.LineBasicMaterial({ color: '#ffe08a', depthTest: false })); rl.renderOrder = 5; scene.add(rl);
  const mship = sailShip(3, 1.6, { hull: '#f4f1ea', mh: 1.4, sw: 0.5 }); mship.scale.setScalar(0.42); scene.add(mship);
  const dots = rpts.map((p) => { const d = new T.Mesh(new T.SphereGeometry(0.13, 6, 4), basic('#ffe08a')); d.position.copy(p); d.visible = false; scene.add(d); return d; });
  s.map = { reg, pins, rl, rpts, mship, dots };
  return s;
}
