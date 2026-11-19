(function () {
/* ศีล 5 = มหาทาน — พุทธวิธี (storytelling, long). Part A: beats, captions, tags, chapters. */
const T = THREE, P = FK.pal, U = VE.u, L = FK.land();
const BEATS = [
  ['cover', 2.0], ['hook1', 4.6], ['hook2', 5.6], ['hook3', 5.0],
  ['c0a', 5.2], ['c0b', 5.4], ['c0c', 6.0], ['c0d', 5.8], ['c0e', 4.6],
  ['c1a', 5.0], ['c1b', 6.0], ['c1c', 5.2], ['c1d', 5.2], ['c1e', 5.6], ['c1f', 5.0],
  ['c2a', 5.0], ['c2b', 4.8], ['c2c', 6.0], ['c2d', 5.4], ['c2e', 5.2],
  ['c3a', 5.2], ['c3b', 5.6], ['c3c', 5.6], ['c3d', 5.4],
  ['c4a', 5.0], ['c4b', 4.8], ['c4c', 6.0], ['c4d', 5.0], ['c4e', 5.8], ['c4f', 5.4], ['c4g', 5.2],
  ['c5a', 5.0], ['c5b', 5.0], ['c5c', 6.0], ['c5d', 6.6], ['c5e', 5.4], ['c5f', 6.0], ['c5g', 5.2],
  ['p1', 5.0], ['p2', 5.4], ['p3', 6.6], ['p4', 6.4], ['p5', 5.6], ['p6', 5.8], ['p7', 5.0],
  ['recap', 9.6], ['ask', 5.6], ['end', 1.6],
];
const B = FK.beats(BEATS, window.DATA && DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
const inB = (t, id) => t >= at(id) && t < end(id);
const rel = (t, id) => t - at(id);
const between = (t, a, b) => t >= at(a) && t < end(b);
const ORDER = BEATS.map((b) => b[0]);
const beatAt = (t) => { for (let i = ORDER.length - 1; i >= 0; i--) if (t >= at(ORDER[i])) return ORDER[i]; return 'cover'; };

/* caption text: {gold} [teal] <coral> */
function segs(str, base) {
  const out = []; const re = /\{([^}]*)\}|\[([^\]]*)\]|<([^>]*)>/g; let i = 0, m;
  while ((m = re.exec(str))) { if (m.index > i) out.push([str.slice(i, m.index), base || '#fff']); out.push([m[1] || m[2] || m[3], m[1] ? P.gold : m[2] ? P.teal : P.coral]); i = re.lastIndex; }
  if (i < str.length) out.push([str.slice(i), base || '#fff']); return out;
}
const CAPY = 600;
const SRC23 = 'พระไตรปิฎก เล่ม 23 · สัพพลหุสสูตร';
const CAP = {
  hook1: ['พูดถึงทำบุญ คนส่วนใหญ่', 'นึกถึง{การให้ของ}'],
  hook2: ['แต่พระพุทธเจ้าตรัสว่า [ศีล 5]', 'คือ{ทาน 5 อย่าง} ที่เป็น{มหาทาน}', 'พระไตรปิฎก เล่ม 23 · ปุญญาภิสันทสูตร'],
  hook3: ['ไม่ได้ให้อะไรสักชิ้น…{ให้ใคร?}', 'ไปหาคำตอบ ใน{1 วัน}ของ "ต้น"'],
  c0a: ['เมื่อวานวันพระ ต้นไปวัด', 'รับ{ศีล 5} มาจากพระ'],
  c0b: ['คำว่า ศีล แปลว่า {ปกติ}', 'นิสัยปกติของคน{ที่ไม่เบียดเบียนใคร}'],
  c0c: ['ศีลไม่ใช่{คำสั่งจากเทวดา}', 'ท้ายทุกข้อคือ [สะมาทิยามิ] = {ขอรับไปฝึกเอง}'],
  c0d: ['ศีลมีหลายขั้น', '5 ชาวบ้าน · 8 วันพระ · 10 เณร · {227 พระ}', 'ภิกษุณี 311 ข้อ · ความสูงขั้นบันไดไม่ตามสัดส่วน'],
  c0e: ['ศีล 5 ฟังดูง่าย…', 'แต่ต้นเจอ{ด่านแรก} ตั้งแต่ตีห้าครึ่ง'],
  c1a: ['ตีห้าครึ่ง ยุงบินวนหู', 'ต้นยกมือขึ้น…{จะตบไหม?}'],
  c1b: ['ผิดศีลข้อ 1 ต้อง{ครบ 5 องค์}', 'ขาดข้อเดียว = ยังไม่ขาดศีล'],
  c1c: ['แล้วถ้า{เหยียบมด}ตาย', 'โดย{ไม่เห็น}ล่ะ?'],
  c1d: ['ไม่รู้ ไม่ตั้งใจ = {ไม่ครบองค์}', 'แต่ตบยุงเพราะ{ตั้งใจ} = <ครบ 5>'],
  c1e: ['ผลเบาที่สุดของการฆ่า', 'ตรัสไว้ว่า คือ{อายุสั้น}', SRC23],
  c1f: ['ต้นเลย{โบกไล่}ออกหน้าต่าง', 'ด่าน 1 ผ่าน…แต่วันนี้{เพิ่งเริ่ม}'],
  c2a: ['9 โมง ที่ออฟฟิศ', 'ปากกาบริษัท ด้ามนี้{สวยดี}…'],
  c2b: ['หยิบกลับบ้าน สักด้าม', '{ใครจะรู้?}'],
  c2c: ['ลักทรัพย์ก็มี{5 องค์}', 'ของมีเจ้าของ แล้ว{ตั้งใจเอาไป}'],
  c2d: ['ผลเบาที่สุดของการลัก', 'คือ{ทรัพย์เสื่อม}', SRC23],
  c2e: ['ต้นวางคืน แล้วไป{ขอเบิก}ให้ถูก', 'ด่าน 2 ผ่าน…เที่ยงนี้{มีแชทเด้ง}'],
  c3a: ['เที่ยงตรง แชทเด้งมา', 'จาก…{แฟนของเพื่อน}'],
  c3b: ['ข้อ 3 คือ ไม่ล่วงเกิน', 'คนที่{มีคู่} หรือ{มีผู้ปกครองดูแล}', 'ความโดยย่อ · พระไตรปิฎก มัชฌิมนิกาย สาเลยยกสูตร'],
  c3c: ['ผลเบาที่สุด คือ{ก่อเวร มีศัตรู}', 'เพราะไปแตะ{ของรักของคนอื่น}', SRC23],
  c3d: ['ต้นตอบ "ไปกับเพื่อนเราดีกว่า"', 'ด่าน 3 ผ่าน'],
  c4a: ['บ่ายสาม หัวหน้าถาม', 'งานที่ต้องเสร็จ{เมื่อวาน}ล่ะ?'],
  c4b: ['ทางรอดง่ายๆ คือ…', '"<ส่งแล้วครับ เมลคงเด้ง>"'],
  c4c: ['โกหก ผิดศีลเมื่อ{ครบ 4 องค์}', '{ไม่จริง} · {ตั้งใจหลอก} · {พูดออกไป} · {เขาเชื่อ}'],
  c4d: ['แล้ว{แชร์ข่าวปลอม}', 'โดย{ไม่รู้}ว่าปลอมล่ะ?'],
  c4e: ['ไม่รู้ = {ไม่ครบองค์}', 'แต่{เช็กก่อนแชร์} คนอื่นจะได้ไม่เดือดร้อน'],
  c4f: ['ผลเบาที่สุดของการโกหก', 'คือ{ถูกใส่ร้าย} ด้วยคำไม่จริง', SRC23],
  c4g: ['ต้นยอมรับตรงๆ ขอส่งเย็นนี้', 'ด่าน 4 ผ่าน…เหลือ{ด่านสุดท้าย}'],
  c5a: ['หนึ่งทุ่ม เพื่อนลากไปฉลอง', '"{แก้วเดียวน่า!}"'],
  c5b: ['แปลก… ข้อ 5 ดื่มเอง', '{ไม่ได้ทำร้ายใคร}นี่?'],
  c5c: ['ชื่อเต็มของข้อนี้ {บอกเหตุผล}ไว้แล้ว', '"…[ปมาทัฏฐานา]" = {ที่ตั้งแห่งความประมาท}'],
  c5d: ['ถ้าเมา…ด่าน 1 ถึง 4', 'ที่ผ่านมาทั้งวัน {ล้มได้ทั้งแถว}', 'ภาพสมมติ'],
  c5e: ['ผลเบาที่สุดของน้ำเมา', 'ตรัสว่า คือ{ความเป็นบ้า}', SRC23],
  c5f: ['คนไทย 15 ปีขึ้นไป ดื่ม {35.2%}', 'ราว {20.9 ล้านคน}', 'สำนักงานสถิติแห่งชาติ 2567'],
  c5g: ['ต้นขอ{น้ำส้ม}ชนแก้ว', 'ด่าน 5 ผ่าน…{ครบทั้ง 5}'],
  p1: ['สี่ทุ่ม ต้นเดินกลับบ้าน', 'วันนี้ {ไม่ได้ให้ของใครเลย}…'],
  p2: ['แต่พระพุทธเจ้าตรัสว่า', 'คนรักษาศีล 5 {ได้ให้ทานแล้ว}'],
  p3: ['ให้[ความไม่มีภัย] [ไม่มีเวร] [ไม่เบียดเบียน]', 'แก่สัตว์{นับไม่ถ้วน}', 'พระไตรปิฎก เล่ม 23 ข้อ 129 · ปุญญาภิสันทสูตร'],
  p4: ['ยุงที่รอด · คู่ที่ไม่แตก', 'ของที่ไม่หาย · {ความจริงที่ไม่ถูกบิด}'],
  p5: ['คนที่ได้รับทานคืนนี้', '{จะไม่มีวันรู้เลย}'],
  p6: ['และตรัสต่อว่า ผู้ให้', '{ได้ส่วนนั้นกลับคืน}ด้วย'],
  p7: ['นี่คือ{มหาทาน}', 'ที่[ไม่ต้องจ่ายสักบาท]'],
  ask: ['ศีลข้อไหน{ยากที่สุด}', 'สำหรับคุณ? คอมเมนต์ [1–5]'],
};
const caps = [{ t0: 0, t1: end('cover'), y: 420, instant: true, lines: [[90, ['ไม่ได้ให้ของใครสักชิ้น', '#fff']], [150, ['แต่คือ ', '#fff'], ['มหาทาน', P.gold]], [84, ['ศีล 5 ', P.teal], ['ให้อะไร? ให้ใคร?', '#fff']]] }];
for (const id in CAP) {
  const c = CAP[id], long1 = c[0].length > 24, long2 = c[1].length > 28;
  const lines = [[long1 ? 62 : 74].concat(segs(c[0])), [c[1].length < 14 ? 96 : long2 ? 56 : 68].concat(segs(c[1]))];
  caps.push({ t0: at(id) + 0.15, t1: end(id) - 0.05, y: CAPY, lines, foot: c[2] });
}
/* source tags */
const TAG = { hook2: 'tri', c1b: 'atth', c1c: 'atth', c1d: 'atth', c1e: 'tri', c2c: 'atth', c2d: 'tri', c3b: 'tri', c3c: 'tri', c4c: 'atth', c4d: 'atth', c4e: 'atth', c4f: 'tri', c5c: 'tri', c5e: 'tri', c5f: 'now', p2: 'tri', p3: 'tri', p6: 'tri' };
const TAGS = { tri: ['พระไตรปิฎก', P.teal, ''], atth: ['อรรถกถา', P.violet, 'คัมภีร์อธิบายรุ่นหลัง'], now: ['เรื่องจริง ยุคนี้', P.gold, ''] };
const CHAP = [['ศีลคือ?', 'c0a', 'c0e'], ['ข้อ 1', 'c1a', 'c1f'], ['ข้อ 2', 'c2a', 'c2e'], ['ข้อ 3', 'c3a', 'c3d'], ['ข้อ 4', 'c4a', 'c4g'], ['ข้อ 5', 'c5a', 'c5g'], ['มหาทาน', 'p1', 'p7']];
/* องค์ chips: [beat range, labels, which are met as fn(t)] */
const ONG = {
  1: ['มีชีวิต', 'รู้ว่ามีชีวิต', 'ตั้งใจฆ่า', 'ลงมือ', 'ตายเพราะนั้น'],
  2: ['มีเจ้าของ', 'รู้ว่ามีเจ้าของ', 'ตั้งใจเอา', 'ลงมือ', 'ได้มา'],
  4: ['ไม่จริง', 'ตั้งใจหลอก', 'พูดออกไป', 'เขาเชื่อ'],
};
/* time of day shown in the HUD clock, per chapter [start beat, hh, mm, minutes advanced over the chapter] */
const CLOCK = [['c1a', 5, 30, 12], ['c2a', 9, 0, 25], ['c3a', 12, 0, 18], ['c4a', 15, 0, 30], ['c5a', 19, 0, 40], ['p1', 22, 0, 30]];
/* lamp i passes at: */
const PASS = { 1: at('c1f', 1.6), 2: at('c2e', 1.6), 3: at('c3d', 2.2), 4: at('c4g', 1.8), 5: at('c5g', 1.8) };
const TEST = { 1: ['c1a', 'c1f'], 2: ['c2a', 'c2e'], 3: ['c3a', 'c3d'], 4: ['c4a', 'c4g'], 5: ['c5a', 'c5g'] };
/* Part B: models (low-poly chibi people, props) — base copied from mog/b-models.js */
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const ROBE = '#e8892a', ROBE2 = '#c76a1a', SKIN = '#e2ae86', MOG = P.violet, SAR = P.teal;
const GOLDM = { metalness: 0.45, roughness: 0.6, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.35 };

function chibi(o) {
  o = o || {}; const g = new T.Group(), skin = o.skin || SKIN, robe = o.robe || ROBE;
  const ex = o.gold ? GOLDM : o.glow ? { emissive: new T.Color(o.glow), emissiveIntensity: 0.3 } : {};
  const body = mk(new T.CylinderGeometry(o.thin ? 0.26 : 0.36, o.thin ? 0.4 : 0.62, 1.1, 10), robe, ex); body.position.y = 0.55; g.add(body);
  let sash = null;
  if (o.sash) { sash = mk(new T.BoxGeometry(0.2, 1.05, 0.07), o.sash, ex); sash.position.set(0.06, 0.62, 0.42); sash.rotation.set(-0.3, 0, 0.5); g.add(sash); }
  const head = new T.Group(); head.position.y = 1.42; g.add(head);
  head.add(mk(new T.SphereGeometry(0.4, 14, 10), skin, ex));
  if (o.hair) { const h = mk(new T.SphereGeometry(0.43, 14, 8, 0, 6.283, 0, 1.05), o.hair); h.position.set(0, 0.02, -0.06); h.rotation.x = -0.35; head.add(h); }
  if (o.bun) { const b = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#2a2228'); b.position.set(0, 0.45, -0.1); head.add(b); }
  if (o.ushnisha) { const u = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#3a2a10', ex); u.position.set(0, 0.42, -0.02); head.add(u); }
  if (o.crown) { const c = mk(new T.ConeGeometry(0.24, 0.55, 6), P.gold, { emissive: new T.Color('#b07800'), emissiveIntensity: 0.5 }); c.position.y = 0.55; head.add(c); }
  if (o.beard) { const b = mk(new T.ConeGeometry(0.2, 0.5, 6), o.beard); b.rotation.x = Math.PI; b.position.set(0, -0.4, 0.24); head.add(b); }
  if (o.band) { const b = mk(new T.TorusGeometry(0.42, 0.06, 6, 16), o.band); b.rotation.x = Math.PI / 2; b.position.y = 0.14; head.add(b); }
  const eyeM = o.eyeGlow ? basic(o.eyeGlow) : basic('#1a1420'); const eyes = [];
  for (const s of [-1, 1]) {
    const e = new T.Mesh(o.closed ? new T.BoxGeometry(0.13, 0.03, 0.02) : new T.SphereGeometry(o.eyeGlow ? 0.07 : 0.055, 8, 6), eyeM);
    e.position.set(s * 0.14, 0.03, 0.385); head.add(e); eyes.push(e);
  }
  if (!o.statue && !o.closed) { const mo = new T.Mesh(new T.BoxGeometry(0.1, 0.022, 0.02), basic('#7a3a3a')); mo.position.set(0, -0.14, 0.39); head.add(mo); }
  const arms = {};
  for (const s of [-1, 1]) {
    const p = new T.Group(); p.position.set(s * (o.thin ? 0.28 : 0.36), 1.0, 0);
    const a = mk(new T.CylinderGeometry(0.085, 0.085, 0.55, 6), o.sleeve || robe, ex); a.position.y = -0.27;
    const h = mk(new T.SphereGeometry(0.1, 8, 6), skin, ex); h.position.y = -0.58; p.add(a, h); p.userData.hand = h;
    g.add(p); arms[s < 0 ? 'L' : 'R'] = p;
  }
  const lap = mk(new T.CylinderGeometry(0.72, 0.78, 0.28, 12), robe, ex); lap.position.y = 0.14; lap.visible = false; g.add(lap);
  let halo = null;
  if (o.halo) { halo = new T.Mesh(new T.TorusGeometry(0.62, 0.05, 6, 28), basic('#ffe08a', { transparent: true, opacity: 0.9 })); halo.position.set(0, 1.45, -0.3); g.add(halo); }
  let ring = null;
  if (o.ring) { ring = new T.Mesh(new T.RingGeometry(0.75, 0.92, 28), basic(o.ring, { transparent: true, opacity: 0.85, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; g.add(ring); }
  g.userData = { head, body, sash, arms, lap, eyes, halo, ring, sit: false };
  rest(g); g.scale.setScalar(o.s || 1); return g;
}
function rest(ch) { const a = ch.userData.arms; a.L.rotation.set(0, 0, -0.14); a.R.rotation.set(0, 0, 0.14); ch.userData.head.rotation.set(0, 0, 0); }
function setSit(ch, on) {
  const u = ch.userData; if (u.sit === on) return; u.sit = on; u.lap.visible = on;
  u.body.scale.y = on ? 0.62 : 1; u.body.position.y = on ? 0.62 : 0.55; u.head.position.y = on ? 1.32 : 1.42;
  u.arms.L.position.y = u.arms.R.position.y = on ? 0.92 : 1.0;
  if (u.sash) { u.sash.scale.y = on ? 0.66 : 1; u.sash.position.y = on ? 0.66 : 0.62; }
}
function anjali(ch, k) { k = k == null ? 1 : k; const a = ch.userData.arms; a.L.rotation.set(-1.15 * k, 0, -0.14 + 0.72 * k); a.R.rotation.set(-1.15 * k, 0, 0.14 - 0.72 * k); }
function lapHands(ch) { const a = ch.userData.arms; a.L.rotation.set(-0.75, 0, 0.5); a.R.rotation.set(-0.75, 0, -0.5); }
function walk(ch, t, amp) { amp = amp == null ? 1 : amp; const a = ch.userData.arms, s = Math.sin(t * 9) * 0.5 * amp; a.L.rotation.set(s, 0, -0.14); a.R.rotation.set(-s, 0, 0.14); ch.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 9)) * 0.05 * amp; }
function face(ch, dx, dz) { ch.rotation.y = Math.atan2(dx, dz); }

function hut(w, d, h, wall, roof, o) {
  o = o || {}; const g = new T.Group();
  const walls = mk(new T.BoxGeometry(w, h, d), wall || '#c9a77a'); walls.position.y = h / 2; g.add(walls);
  const r = mk(new T.ConeGeometry(Math.max(w, d) * 0.82, h * 0.85, 4), roof || '#b8873a'); r.rotation.y = Math.PI / 4; r.position.y = h + h * 0.42; r.scale.z = d / w; g.add(r);
  if (o.door !== false) { const dr = mk(new T.BoxGeometry(0.55, 0.95, 0.06), '#5a3a22'); dr.position.set(0, 0.48, d / 2 + 0.03); g.add(dr); g.userData.door = dr; }
  g.userData.walls = walls; g.userData.roof = r; return g;
}
function tree(s, c) {
  const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 0.9, 5), '#7a5236'); tr.position.y = 0.45; g.add(tr);
  const f = mk(new T.IcosahedronGeometry(0.75, 0), c || '#3f8f5a'); f.position.y = 1.35; f.scale.y = 1.1; g.add(f); g.scale.setScalar(s || 1); return g;
}
function softSprite(c, a) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: T.AdditiveBlending }));
}
function orb(c) { const g = new T.Group(); const core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), basic('#ffffff')); const gl = softSprite(c || 'rgba(190,170,255,1)'); gl.scale.setScalar(1.6); g.add(core, gl); return g; }
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }

/* ---- new props for ศีล 5 ---- */
const TON = P.teal;
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); return tx; }
function box(w, h, d, c, x) { return mk(new T.BoxGeometry(w, h, d), c, x); }
function bed() {
  const g = new T.Group(); const fr = box(2.2, 0.45, 3.0, '#8a5a3c'); fr.position.y = 0.22; const mat = box(2.0, 0.25, 2.8, '#f3efe6'); mat.position.y = 0.55;
  const pil = box(1.2, 0.2, 0.6, '#ffffff'); pil.position.set(0, 0.75, -1.05); const bl = box(2.05, 0.18, 1.8, '#5b7fd6'); bl.position.set(0, 0.72, 0.45);
  const hb = box(2.2, 1.1, 0.15, '#7a4a2c'); hb.position.set(0, 0.75, -1.5); g.add(fr, mat, pil, bl, hb); g.userData.blanket = bl; return g;
}
function desk(o) {
  o = o || {}; const g = new T.Group(); const top = box(1.8, 0.1, 0.9, '#e9e1d2'); top.position.y = 0.8; g.add(top);
  for (const x of [-0.8, 0.8]) { const lg = box(0.08, 0.8, 0.8, '#8a8a8a'); lg.position.set(x, 0.4, 0); g.add(lg); }
  if (o.mon !== false) { const scr = mk(new T.BoxGeometry(0.8, 0.5, 0.05), '#24304f', { emissive: new T.Color('#3a6aa8'), emissiveIntensity: 0.6 }); scr.position.set(o.mx || 0, 1.18, 0.1); const st = box(0.08, 0.22, 0.08, '#555'); st.position.set(o.mx || 0, 0.92, 0.1); g.add(scr, st); g.userData.scr = scr; }
  return g;
}
function chair(c) { const g = new T.Group(); const s = box(0.6, 0.1, 0.6, c || '#3a3f55'); s.position.y = 0.48; const b = box(0.6, 0.6, 0.08, c || '#3a3f55'); b.position.set(0, 0.8, -0.28); const l = box(0.08, 0.45, 0.08, '#555'); l.position.y = 0.22; g.add(s, b, l); return g; }
function table(r, c) { const g = new T.Group(); const top = mk(new T.CylinderGeometry(r || 0.8, r || 0.8, 0.08, 14), c || '#f2e6cf'); top.position.y = 0.78; const lg = mk(new T.CylinderGeometry(0.07, 0.12, 0.78, 6), '#6a6a6a'); lg.position.y = 0.39; g.add(top, lg); return g; }
function glass(c, h) { const g = new T.Group(); const gl = mk(new T.CylinderGeometry(0.1, 0.085, h || 0.3, 10), c || '#f2b233', { transparent: true, opacity: 0.85, emissive: new T.Color(c || '#f2b233'), emissiveIntensity: 0.25 }); gl.position.y = (h || 0.3) / 2; g.add(gl); return g; }
function mosquito() {
  const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.035, 0.05, 0.3, 6), '#2a2a32'); b.rotation.z = Math.PI / 2; g.add(b);
  const h = mk(new T.SphereGeometry(0.06, 8, 6), '#2a2a32'); h.position.x = 0.18; g.add(h);
  const nose = mk(new T.CylinderGeometry(0.008, 0.008, 0.16, 4), '#2a2a32'); nose.rotation.z = Math.PI / 2; nose.position.x = 0.3; g.add(nose);
  const wm = basic('#cfe6ff', { transparent: true, opacity: 0.6, side: T.DoubleSide }); const wings = [];
  for (const s of [-1, 1]) { const w = new T.Mesh(new T.PlaneGeometry(0.22, 0.1), wm); w.position.set(0, 0.05, s * 0.09); w.rotation.x = Math.PI / 2; g.add(w); wings.push(w); }
  for (let i = 0; i < 3; i++) for (const s of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.006, 0.006, 0.22, 3), '#2a2a32'); l.position.set(-0.05 + i * 0.06, -0.08, s * 0.05); l.rotation.x = s * 0.6; g.add(l); }
  g.userData.wings = wings; g.scale.setScalar(1.6); return g;
}
function ant() { const g = new T.Group(); for (let i = 0; i < 3; i++) { const s = mk(new T.SphereGeometry(i === 1 ? 0.035 : 0.045, 6, 4), '#1a1418'); s.position.x = (i - 1) * 0.08; g.add(s); } return g; }
function candle() {
  const g = new T.Group(); const wax = mk(new T.CylinderGeometry(0.12, 0.12, 1, 10), '#fff3dc'); wax.position.y = 0.5; g.add(wax);
  const fl = softSprite('rgba(255,190,90,1)', 1); fl.scale.set(0.35, 0.5, 1); g.add(fl); const core = new T.Mesh(new T.ConeGeometry(0.05, 0.16, 6), basic('#fff0a0')); g.add(core);
  const plate = mk(new T.CylinderGeometry(0.22, 0.22, 0.04, 10), '#c9b27a'); plate.position.y = 0.02; g.add(plate);
  g.userData = { wax, fl, core, set(h) { wax.scale.y = Math.max(0.02, h); wax.position.y = 0.5 * h; fl.position.y = h + 0.2; core.position.y = h + 0.08; } }; g.userData.set(1); return g;
}
function coin() { const c = mk(new T.CylinderGeometry(0.16, 0.16, 0.04, 12), P.gold, GOLDM); c.rotation.x = Math.PI / 2; return c; }
function wallet() { const g = new T.Group(); const w = box(0.7, 0.45, 0.12, '#6a4028'); w.position.y = 0.23; const f = box(0.72, 0.2, 0.13, '#5a3420'); f.position.set(0, 0.38, 0.005); g.add(w, f); return g; }
function phoneMesh() { const p = mk(new T.BoxGeometry(0.22, 0.4, 0.03), '#1a1f3a', { emissive: new T.Color('#5a8ad8'), emissiveIntensity: 0.6 }); return p; }
function pen(c) { const p = mk(new T.CylinderGeometry(0.025, 0.025, 0.36, 6), c || P.gold, c ? {} : GOLDM); return p; }
function sala() {
  const g = new T.Group(); const base = box(9, 0.5, 7, '#d9cdb5'); base.position.y = 0.25; g.add(base);
  for (const x of [-4, 4]) for (const z of [-3, 3]) { const p = mk(new T.CylinderGeometry(0.16, 0.16, 3.2, 8), '#f3efe6'); p.position.set(x, 2.1, z); g.add(p); }
  const ro = { emissive: new T.Color('#5a1e10'), emissiveIntensity: 0.2 };
  const r1 = mk(new T.ConeGeometry(6.8, 1.8, 4), '#b8452f', ro); r1.rotation.y = Math.PI / 4; r1.scale.z = 0.78; r1.position.y = 4.55; g.add(r1);
  const r2 = mk(new T.ConeGeometry(4.6, 1.5, 4), '#c9543a', ro); r2.rotation.y = Math.PI / 4; r2.scale.z = 0.78; r2.position.y = 5.5; g.add(r2);
  for (const s of [-1, 1]) { const ch = mk(new T.ConeGeometry(0.12, 0.9, 5), P.gold, GOLDM); ch.position.set(s * 3.1, 6.1, 0); ch.rotation.z = -s * 0.5; g.add(ch); }
  const dais = box(2.2, 0.5, 1.6, '#c9a77a'); dais.position.set(0, 0.75, -2.0); g.add(dais);
  return g;
}
function stepBlock(h, c) { const m = box(1.5, 1, 1.5, c); m.geometry.translate(0, 0.5, 0); m.userData.h = h; return m; }
function domino(n) {
  const tx = canvasTex(128, 256, (x, w, h) => { x.fillStyle = '#f7f3ea'; x.fillRect(0, 0, w, h); x.fillStyle = n === 5 ? '#ff5d73' : '#1b2a55'; x.font = '800 150px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), w / 2, h / 2 + 8); });
  const mats = [M('#e8e2d4'), M('#e8e2d4'), M('#e8e2d4'), M('#e8e2d4'), new T.MeshStandardMaterial({ map: tx, roughness: 0.7 }), M('#e8e2d4')];
  const geo = new T.BoxGeometry(0.75, 1.5, 0.22); geo.translate(0, 0.75, 0); const m = new T.Mesh(geo, mats); return m;
}
function shophouse(c, h) {
  const g = new T.Group(); h = h || 3; const b = box(3, h, 2.6, c || '#e9dcc0'); b.position.y = h / 2; g.add(b);
  const wm = new T.MeshStandardMaterial({ color: '#2a3550', emissive: new T.Color('#ffcf7a'), emissiveIntensity: 0, flatShading: true });
  const wins = [];
  for (let fy = 0; fy < Math.floor(h / 1.1); fy++) for (const x of [-0.8, 0.8]) { const w = new T.Mesh(new T.BoxGeometry(0.6, 0.55, 0.05), wm); w.position.set(x, 0.75 + fy * 1.05, 1.31); g.add(w); wins.push(w); }
  const roof = box(3.2, 0.18, 2.8, '#8a5a3c'); roof.position.y = h + 0.09; g.add(roof); g.userData.winMat = wm; return g;
}
function streetLamp() { const g = new T.Group(); const p = mk(new T.CylinderGeometry(0.05, 0.06, 2.6, 6), '#5a5f70'); p.position.y = 1.3; const hd = new T.Mesh(new T.SphereGeometry(0.16, 8, 6), basic('#fff2c0')); hd.position.y = 2.65; const gl = softSprite('rgba(255,220,140,1)', 0.0); gl.scale.setScalar(2.2); gl.position.y = 2.65; g.add(p, hd, gl); g.userData.gl = gl; return g; }
function car(c) { const g = new T.Group(); const b = box(1.8, 0.45, 0.9, c || '#d9534f'); b.position.y = 0.42; const cab = box(1.0, 0.4, 0.82, '#bfd6ef'); cab.position.set(-0.1, 0.84, 0); g.add(b, cab); for (const x of [-0.6, 0.6]) for (const z of [-0.46, 0.46]) { const w = mk(new T.CylinderGeometry(0.18, 0.18, 0.12, 10), '#222'); w.rotation.x = Math.PI / 2; w.position.set(x, 0.2, z); g.add(w); } const hl = softSprite('rgba(255,240,190,1)', 0); hl.scale.setScalar(1.2); hl.position.set(0.95, 0.45, 0); g.add(hl); g.userData.hl = hl; return g; }
function giftBox(c) { const g = new T.Group(); const b = box(0.5, 0.4, 0.5, c); b.position.y = 0.2; const rb = box(0.52, 0.42, 0.1, P.gold); rb.position.y = 0.2; const rb2 = box(0.1, 0.42, 0.52, P.gold); rb2.position.y = 0.2; g.add(b, rb, rb2); return g; }
function ringMesh(c) { const m = new T.Mesh(new T.RingGeometry(0.92, 1, 64), basic(c, { transparent: true, opacity: 0.8, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending })); m.rotation.x = -Math.PI / 2; m.renderOrder = 4; return m; }
/* Part C: one small town (home, cafe, office, bar, temple) + setup */
const ST = { HOME: [-8, 0, 0], CAFE: [8, 0, 0], OFFICE: [-8, 0, -26], BAR: [8, 0, -26], TEMPLE: [0, 0, -54], TOWN: [0, 0, -24], STREET: [0, 0, -13] };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

function room(st, floorC, wallC, o) {
  o = o || {}; const g = new T.Group(); place(g, st);
  const fl = box(11, 0.16, 9, floorC); fl.position.y = 0.08; g.add(fl);
  if (o.back !== false) { const w = box(11, 3.2, 0.25, wallC); w.position.set(0, 1.7, -4.4); g.add(w); }
  if (o.left) { const w = box(0.25, 3.2, 9, wallC); w.position.set(-5.4, 1.7, 0); g.add(w); }
  if (o.right) { const w = box(0.25, 3.2, 9, wallC); w.position.set(5.4, 1.7, 0); g.add(w); }
  return g;
}

function setupScene(scene) {
  const s = {};
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#9fc0e8', 45, 140); s.fog = scene.fog;

  /* ---------- ground, streets, filler ---------- */
  const ground = box(110, 0.4, 140, '#4f7a52'); ground.position.set(0, -0.2, -30); scene.add(ground);
  const road = (x, z, w, d) => { const r = box(w, 0.06, d, '#6b6f7a'); r.position.set(x, 0.03, z); scene.add(r); const ln = box(w > d ? w : 0.12, 0.07, w > d ? 0.12 : d, '#e9e4d0'); ln.position.set(x, 0.04, z); scene.add(ln); return r; };
  road(0, -22, 3.6, 76); road(0, -13, 40, 3.2); road(0, -39, 40, 3.2); road(0, 7.5, 40, 3.2);
  s.lamps = [];
  for (const z of [4, -8, -18, -32]) for (const x of [-2.4, 2.4]) { const l = streetLamp(); l.position.set(x, 0, z); scene.add(l); s.lamps.push(l); }
  s.houses = [];
  const HC = ['#e9dcc0', '#d9c3a0', '#c9d9e9', '#e9c9c0', '#d0e0c8', '#f0e2b6'];
  for (const q of [[-21, 3], [-21, -8], [-21, -22], [-21, -33], [21, 4], [21, -9], [21, -21], [21, -34], [-15, 14], [-5, 14], [7, 14], [17, 14], [-14, -62], [14, -62]]) {
    const h = shophouse(HC[s.houses.length % 6], 2.2 + (s.houses.length % 3) * 1.1); h.position.set(q[0], 0, q[1]); h.rotation.y = q[0] < -18 ? Math.PI / 2 : q[0] > 18 ? -Math.PI / 2 : q[1] > 10 ? Math.PI : 0; scene.add(h); s.houses.push(h);
  }
  for (let i = 0; i < 70; i++) { const x = -45 + rnd() * 90, z = -85 + rnd() * 110; if (Math.abs(x) < 25 && z > -60 && z < 18) continue; const tr = tree(0.9 + rnd() * 0.8, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr); }
  for (const q of [[-15, 9.5], [15, -15], [-15, -15], [15, 9.5], [-26, -50], [26, -50]]) { const tr = tree(1.1); tr.position.set(q[0], 0, q[1]); scene.add(tr); }
  /* stars */
  { const n = 300, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = (rnd() - 0.5) * 200; p[i * 3 + 1] = 25 + rnd() * 60; p[i * 3 + 2] = -110 - rnd() * 40; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); s.stars = new T.Points(g, new T.PointsMaterial({ color: '#fff', size: 0.6, transparent: true, opacity: 0, fog: false })); scene.add(s.stars); }

  /* ---------- the hero: ต้น ---------- */
  s.ton = chibi({ robe: TON, hair: '#2a2228', sleeve: TON, ring: TON }); scene.add(s.ton);
  s.tonPhone = phoneMesh(); s.tonPhone.position.set(0, -0.62, 0.08); s.ton.userData.arms.R.add(s.tonPhone); s.tonPhone.visible = false;
  s.tonPen = pen(); s.tonPen.position.set(0, -0.62, 0.05); s.ton.userData.arms.R.add(s.tonPen); s.tonPen.visible = false;
  s.tonGlass = glass('#ffa53a', 0.32); s.tonGlass.position.set(0, -0.72, 0.1); s.ton.userData.arms.R.add(s.tonGlass); s.tonGlass.visible = false;
  s.tonGlow = softSprite('rgba(46,230,197,1)', 0); s.tonGlow.scale.setScalar(3.2); scene.add(s.tonGlow);

  /* ---------- temple (yesterday) ---------- */
  const tg = new T.Group(); place(tg, 'TEMPLE'); scene.add(tg);
  const yard = box(26, 0.12, 20, '#b9ad96'); yard.position.set(0, 0.06, 2); tg.add(yard);
  const sl = sala(); tg.add(sl);
  { const ub = box(6, 4.2, 4, '#f3efe6'); ub.position.set(0, 2.1, -9); tg.add(ub); const ur = mk(new T.ConeGeometry(5, 2.6, 4), '#b8452f'); ur.rotation.y = Math.PI / 4; ur.scale.z = 0.7; ur.position.set(0, 5.5, -9); tg.add(ur);
    const ch = mk(new T.ConeGeometry(0.15, 1.4, 5), P.gold, GOLDM); ch.position.set(0, 7.3, -9); tg.add(ch);
    for (const x of [-9, 9]) { const ce = new T.Group(); const b1 = mk(new T.CylinderGeometry(1.3, 1.5, 0.8, 10), '#f3efe6'); b1.position.y = 0.4; const b2 = mk(new T.SphereGeometry(1.1, 12, 8), '#f3efe6'); b2.position.y = 1.5; b2.scale.y = 0.9; const sp = mk(new T.ConeGeometry(0.5, 3, 10), '#f3efe6'); sp.position.y = 3.6; const tip = mk(new T.ConeGeometry(0.14, 0.9, 8), P.gold, GOLDM); tip.position.y = 5.4; ce.add(b1, b2, sp, tip); ce.position.set(x, 0, -6.5); tg.add(ce); } }
  s.temple = { g: tg };
  s.monk = chibi({ robe: ROBE, sash: ROBE2 }); setSit(s.monk, true); place(s.monk, 'TEMPLE', 0, 1.0, -2.0); scene.add(s.monk);
  s.fan = new T.Group(); { const f = mk(new T.CircleGeometry(0.42, 16, 0, Math.PI), '#f3e2b0'); f.rotation.z = -Math.PI / 2; const h = mk(new T.CylinderGeometry(0.03, 0.03, 0.8, 5), '#7a5236'); h.position.y = -0.35; s.fan.add(f, h); } s.fan.position.set(0, -0.7, 0.15); s.monk.userData.arms.R.add(s.fan);
  s.lay = [];
  const LC = ['#ffffff', '#f3efe6', '#ffffff', '#f3efe6', '#ffffff'];
  for (let i = 0; i < 5; i++) { const c = chibi({ robe: LC[i], sleeve: LC[i], hair: i % 2 ? '#e8e8e8' : '#2a2228', bun: i === 1 || i === 3, s: 0.92 }); setSit(c, true); scene.add(c); s.lay.push(c); }
  s.givers = [];
  for (let i = 0; i < 4; i++) { const c = chibi({ robe: ['#e6b85c', '#c97b9a', '#7fb3d5', '#8fcf8f'][i], hair: '#2a2228', bun: i % 2 === 1, s: 0.9 }); const gb = giftBox(['#ff8fb0', '#8fd0ff', '#ffd27a', '#b9f0a0'][i]); gb.position.set(0, -0.75, 0.32); gb.scale.setScalar(0.9); c.userData.arms.R.add(gb); c.userData.gift = gb; scene.add(c); s.givers.push(c); }
  s.giftPile = new T.Group(); for (let i = 0; i < 7; i++) { const gb = giftBox(['#ff8fb0', '#8fd0ff', '#ffd27a', '#b9f0a0'][i % 4]); gb.position.set(-1 + (i % 4) * 0.55, Math.floor(i / 4) * 0.42 + 0.5, 0); gb.rotation.y = i; s.giftPile.add(gb); }
  { const tb = box(3, 0.5, 1.2, '#c9a77a'); tb.position.set(0, 0.25, 0); s.giftPile.add(tb); } place(s.giftPile, 'TEMPLE', -5.4, 0, 4.4); scene.add(s.giftPile);
  s.steps = []; const SH = [[0.6, '5', 'ชาวบ้าน', P.teal], [1.2, '8', 'วันพระ', P.teal], [1.9, '10', 'สามเณร', ROBE], [2.6, '227', 'พระภิกษุ', P.gold]];
  SH.forEach((q, i) => { const b = stepBlock(q[0], i === 3 ? '#e9c46a' : i === 2 ? '#e8a05a' : '#7fd8c4'); place(b, 'TEMPLE', 6.2 + i * 1.55, 0, 3.4); scene.add(b);
    const lb = label(q[1], { w: 1.6, px: 120, color: q[3] }); scene.add(lb); const lb2 = label(q[2], { w: 2.0, px: 70 }); scene.add(lb2); s.steps.push({ b, lb, lb2, h: q[0], i }); });

  /* ---------- home (bedroom) ---------- */
  room('HOME', '#c9a27a', '#e9dcc0', { left: true });
  s.bed = bed(); place(s.bed, 'HOME', -2.6, 0.16, -2.2); scene.add(s.bed);
  { const ns = box(0.8, 0.7, 0.7, '#8a5a3c'); place(ns, 'HOME', -0.8, 0.5, -3.6); scene.add(ns);
    s.clock = new T.Group(); const cb = box(0.5, 0.4, 0.2, P.coral); cb.position.y = 0.2; const face0 = mk(new T.CircleGeometry(0.15, 16), '#fff'); face0.position.set(0, 0.2, 0.11); s.clock.add(cb, face0); place(s.clock, 'HOME', -0.8, 0.85, -3.6); scene.add(s.clock); }
  s.candle = candle(); place(s.candle, 'HOME', 0.3, 0.16, -3.6); s.candle.scale.setScalar(1.1); scene.add(s.candle);
  { const fr = box(2.4, 1.6, 0.3, '#f3efe6'); place(fr, 'HOME', 2.2, 1.9, -4.32); scene.add(fr); s.winPane = mk(new T.BoxGeometry(2.1, 1.3, 0.32), '#7fb6e8', { emissive: new T.Color('#3a6aa8'), emissiveIntensity: 0.4 }); place(s.winPane, 'HOME', 2.2, 1.9, -4.3); scene.add(s.winPane);
    const mull = box(0.08, 1.4, 0.36, '#f3efe6'); place(mull, 'HOME', 2.2, 1.9, -4.3); scene.add(mull); }
  { const rug = box(3, 0.04, 2, '#8fb0d9'); place(rug, 'HOME', 2.2, 0.17, 0.6); scene.add(rug); const pl = mk(new T.CylinderGeometry(0.3, 0.25, 0.5, 8), '#a8582e'); place(pl, 'HOME', 4.4, 0.4, -3.6); scene.add(pl); const pf = mk(new T.IcosahedronGeometry(0.55, 0), '#4f9a4a'); place(pf, 'HOME', 4.4, 1.05, -3.6); scene.add(pf); }
  s.mos = mosquito(); scene.add(s.mos);
  s.ants = []; for (let i = 0; i < 9; i++) { const a = ant(); scene.add(a); s.ants.push(a); }

  /* ---------- office ---------- */
  room('OFFICE', '#b9c2cc', '#dfe6ee', { right: true });
  { const gl = mk(new T.BoxGeometry(10, 1.6, 0.1), '#9fd0ff', { transparent: true, opacity: 0.35, emissive: new T.Color('#5a8ad8'), emissiveIntensity: 0.3 }); place(gl, 'OFFICE', 0, 2.1, -4.25); scene.add(gl); }
  s.desks = [];
  for (const x of [-3.4, 0, 3.4]) { const d = desk({ mx: 0.5 }); place(d, 'OFFICE', x, 0.16, -0.6); scene.add(d); const c = chair(); place(c, 'OFFICE', x, 0.16, -1.45); scene.add(c); s.desks.push(d); }
  s.cup = mk(new T.CylinderGeometry(0.13, 0.11, 0.26, 10), '#3a3f55'); place(s.cup, 'OFFICE', -0.45, 1.1, -0.45); scene.add(s.cup);
  s.cupPens = []; for (let i = 0; i < 3; i++) { const p0 = pen(i === 0 ? null : ['#5b7fd6', '#e05a5a'][i - 1]); place(p0, 'OFFICE', -0.45 + (i - 1) * 0.05, 1.3, -0.45 + (i - 1) * 0.03); p0.rotation.z = (i - 1) * 0.18; scene.add(p0); s.cupPens.push(p0); }
  s.cab = new T.Group(); { const c = box(1.6, 2.2, 0.8, '#c9cfd8'); c.position.y = 1.1; s.cab.add(c); for (let i = 0; i < 3; i++) { const sh = box(1.5, 0.05, 0.05, '#8a8f99'); sh.position.set(0, 0.6 + i * 0.6, 0.41); s.cab.add(sh); const bx = box(0.4, 0.3, 0.3, ['#ffd27a', '#8fd0ff', '#ff8fb0'][i]); bx.position.set(-0.35 + i * 0.35, 0.8 + i * 0.6, 0.2); s.cab.add(bx); } } place(s.cab, 'OFFICE', -4.4, 0.16, -3.6); scene.add(s.cab);
  s.wallet = wallet(); s.wallet.scale.setScalar(0.6); place(s.wallet, 'OFFICE', -0.1, 0.96, -0.3); scene.add(s.wallet);
  s.coins = []; for (let i = 0; i < 8; i++) { const c = coin(); scene.add(c); s.coins.push(c); }
  s.cow = [chibi({ robe: '#f2f2f2', sleeve: '#f2f2f2', hair: '#2a2228', bun: true }), chibi({ robe: '#ffd27a', sleeve: '#ffd27a', hair: '#3a2a20' })];
  s.cow.forEach((c) => scene.add(c));
  s.boss = chibi({ robe: '#f2f2f2', sleeve: '#f2f2f2', hair: '#bdbdbd' }); { const tie = box(0.12, 0.5, 0.04, '#1b2a55'); tie.position.set(0, 0.85, 0.43); tie.rotation.x = -0.25; s.boss.add(tie); } scene.add(s.boss);
  s.bossDesk = desk({ mx: -0.5 }); place(s.bossDesk, 'OFFICE', 3.4, 0.16, -2.9); const bc = chair('#1b2a55'); place(bc, 'OFFICE', 3.4, 0.16, -3.75); scene.add(bc); scene.add(s.bossDesk);
  s.news = new T.Group(); { const c = mk(new T.BoxGeometry(1.4, 0.9, 0.05), '#ffffff'); s.news.add(c); const tx = canvasTex(256, 160, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#e03a4a'; x.fillRect(0, 0, w, 48); x.fillStyle = '#fff'; x.font = '800 34px Kanit,sans-serif'; x.textAlign = 'center'; x.fillText('ข่าวด่วน!!', w / 2, 36); x.fillStyle = '#9aa'; for (let i = 0; i < 4; i++) x.fillRect(24, 70 + i * 20, w - 48 - (i % 2) * 60, 10); });
    const f = new T.Mesh(new T.PlaneGeometry(1.36, 0.86), new T.MeshBasicMaterial({ map: tx })); f.position.z = 0.03; s.news.add(f); } scene.add(s.news);

  /* ---------- cafe ---------- */
  room('CAFE', '#d9b98a', '#f0e2c8', { back: false });
  { const aw = new T.Group(); for (let i = 0; i < 6; i++) { const st = box(1.8, 0.08, 1.6, i % 2 ? '#ffffff' : P.coral); st.position.set(-4.5 + i * 1.8, 2.9, -3.4); st.rotation.x = 0.35; aw.add(st); } place(aw, 'CAFE'); scene.add(aw);
    const back = box(11, 2.6, 0.25, '#b8452f'); place(back, 'CAFE', 0, 1.4, -4.4); scene.add(back); const ctr = box(4, 1, 0.8, '#8a5a3c'); place(ctr, 'CAFE', -3, 0.66, -3.4); scene.add(ctr); }
  s.ctable = table(0.85); place(s.ctable, 'CAFE', 0, 0.16, -0.4); scene.add(s.ctable);
  { const pl = mk(new T.CylinderGeometry(0.3, 0.22, 0.06, 12), '#ffffff'); place(pl, 'CAFE', -0.2, 1.0, -0.6); scene.add(pl); const fd = mk(new T.SphereGeometry(0.2, 8, 6), '#e8a040'); fd.scale.y = 0.5; place(fd, 'CAFE', -0.2, 1.06, -0.6); scene.add(fd); }
  for (const q of [[-3.6, 1.6], [3.6, 1.8]]) { const tb = table(0.6); place(tb, 'CAFE', q[0], 0.16, q[1]); scene.add(tb); }
  s.cust = [chibi({ robe: '#c97b9a', hair: '#2a2228', bun: true, s: 0.9 }), chibi({ robe: '#7fb3d5', hair: '#2a2228', s: 0.9 })];
  s.cust.forEach((c, i) => { setSit(c, true); place(c, 'CAFE', i ? 3.6 : -3.6, 0.2, i ? 1.0 : 0.8); scene.add(c); });
  s.friend = chibi({ robe: '#e6b85c', sleeve: '#e6b85c', hair: '#2a2228' }); s.gf = chibi({ robe: P.violet, sleeve: P.violet, hair: '#3a2030', bun: true });
  s.gfPhone = phoneMesh(); s.gfPhone.position.set(0, -0.62, 0.08); s.gf.userData.arms.R.add(s.gfPhone); scene.add(s.friend, s.gf);

  /* ---------- bar street ---------- */
  room('BAR', '#7a6a5a', '#4a3a3a', { back: true });
  { const sign = new T.Mesh(new T.PlaneGeometry(2.6, 0.68), new T.MeshBasicMaterial({ map: canvasTex(512, 134, (x, w, h) => { x.fillStyle = '#2a1a2a'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffd27a'; x.font = '800 86px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ร้านอร่อยดี', w / 2, h / 2 + 4); }) })); place(sign, 'BAR', 3.4, 2.5, -4.2); scene.add(sign); s.barSign = sign;
    for (const x of [-5, 5]) { const p = mk(new T.CylinderGeometry(0.06, 0.06, 3.2, 6), '#3a3a3a'); place(p, 'BAR', x, 1.7, 2.6); scene.add(p); } }
  s.bulbs = []; for (let i = 0; i < 14; i++) { const u = i / 13, x = -5 + u * 10, y = 3.1 - Math.sin(u * Math.PI) * 0.6; const b = new T.Mesh(new T.SphereGeometry(0.09, 6, 4), basic('#ffd27a')); place(b, 'BAR', x, y, 2.6); const gl = softSprite('rgba(255,200,100,1)', 0.7); gl.scale.setScalar(0.9); b.add(gl); scene.add(b); s.bulbs.push(b); }
  s.btable = table(0.9, '#5a4a3a'); place(s.btable, 'BAR', -1.2, 0.16, -0.6); scene.add(s.btable);
  s.glasses = []; for (let i = 0; i < 3; i++) { const g0 = glass('#f2b233', 0.34); place(g0, 'BAR', -1.6 + i * 0.4, 1.0, -0.5 - (i % 2) * 0.2); scene.add(g0); s.glasses.push(g0); }
  s.bf = [chibi({ robe: '#d9534f', sleeve: '#d9534f', hair: '#2a2228' }), chibi({ robe: '#5b7fd6', sleeve: '#5b7fd6', hair: '#3a2a20' })];
  s.bf.forEach((c) => { const g0 = glass('#f2b233', 0.32); g0.position.set(0, -0.72, 0.1); c.userData.arms.R.add(g0); scene.add(c); });
  s.dom = []; for (let i = 0; i < 5; i++) { const d = domino(5 - i); place(d, 'BAR', 1.0 + i * 0.9, 0.16, 1.4); scene.add(d); s.dom.push(d); }
  s.car = car('#d9534f'); place(s.car, 'BAR', 1.8, 0, 6.2); scene.add(s.car);

  /* ---------- payoff: beings + rings ---------- */
  { const n = 520, p = new Float32Array(n * 3), col = new Float32Array(n * 3), d = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = (rnd() - 0.5) * 56, z = -66 + rnd() * 84; p[i * 3] = x; p[i * 3 + 1] = 0.5 + rnd() * 0.6; p[i * 3 + 2] = z; d[i] = Math.hypot(x - ST.STREET[0], z - ST.STREET[2]); }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); g.setAttribute('color', new T.BufferAttribute(col, 3));
    s.beings = new T.Points(g, new T.PointsMaterial({ size: 1.1, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending, map: canvasTex(64, 64, (x) => { const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); }) }));
    s.beings.userData.d = d; s.beings.visible = false; scene.add(s.beings); }
  s.rings = []; for (let i = 0; i < 5; i++) { const r = ringMesh(i % 2 ? P.gold : P.teal); r.visible = false; scene.add(r); s.rings.push(r); }
  s.giftGlows = []; for (let i = 0; i < 6; i++) { const g0 = softSprite(i % 2 ? 'rgba(255,201,74,1)' : 'rgba(46,230,197,1)', 0); g0.scale.setScalar(5); scene.add(g0); s.giftGlows.push(g0); }
  s.pLabels = ['ยุงที่รอด', 'คู่ที่ไม่แตก', 'ของที่ไม่หาย', 'ความจริง', 'คนบนถนน'].map((x) => { const lb = label(x, { w: 9, px: 84, color: '#fff' }); lb.visible = false; scene.add(lb); return lb; });

  s.anchorV = new T.Vector3();
  return s;
}
/* Part D: camera, light, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; if (['HOME', 'OFFICE', 'CAFE', 'BAR'].includes(st)) h *= 0.62; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const fx = (st, l, p0) => { const c = ST[st]; return { look: [c[0] + l[0], c[1] + l[1], c[2] + l[2]], pos: [c[0] + p0[0], c[1] + p0[1], c[2] + p0[2]], fov: 40 }; };
const COVERF = fr('STREET', 0, 0.6, -4.5, 17, 15, 0);
const OVER = fr('TOWN', 0, 0, 3, 26, 36, 0);
const SHOT = {
  cover: [[0, COVERF]],
  hook1: [[0, fx('TEMPLE', [-4.6, 1.0, 5.2], [-2.0, 3.2, 13.5])]], hook2: [[0, fx('TEMPLE', [0, 2.4, -1], [0, 6.5, 19])]], hook3: [[0, fx('TEMPLE', [2.4, 1.3, 5.2], [3.4, 2.6, 11.8])]],
  c0a: [[0, fx('TEMPLE', [0, 1.3, -0.8], [4.5, 2.9, 7.0])]], c0b: [[0, fx('TEMPLE', [0.3, 1.2, -0.4], [12.5, 4.2, 4.5])]], c0c: [[0, fx('TEMPLE', [0, 1.8, -2.0], [2.6, 3.5, 3.6])]],
  c0d: [[0, fx('TEMPLE', [8.5, 2.6, 3.4], [8.5, 3.6, 20])]], c0e: [[0, fx('TEMPLE', [0, 2.4, 0], [0, 6.5, 18])]],
  c1a: [[0, fr('HOME', -1.4, 1.6, -1.4, 6.5, 1.9, 1.0)]], c1b: [[0, fr('HOME', -0.9, 1.6, -1.2, 8.5, 2.6, 0)]],
  c1c: [[0, fr('HOME', 1.8, 0.9, 1.4, 6.0, 3.0, 0)]], c1d: [[0, fr('HOME', -0.4, 1.5, -0.6, 8, 2.6, 0)]],
  c1e: [[0, fr('HOME', 0.1, 1.2, -3.4, 5.0, 1.5, 0)]], c1f: [[0, fr('HOME', 2.0, 1.8, -2.8, 7.5, 1.8, -1.0)]],
  c2a: [[0, fr('OFFICE', 0, 1.5, -0.9, 7.5, 2.2, 0.6)]], c2b: [[0, fr('OFFICE', -0.3, 1.3, -0.8, 5.2, 1.4, 0)]],
  c2c: [[0, fr('OFFICE', 0, 1.6, -0.9, 9, 2.6, 0)]], c2d: [[0, fr('OFFICE', 0, 1.3, -0.5, 5.5, 1.6, 0)]], c2e: [[0, fr('OFFICE', -2.4, 1.6, -1.8, 9, 2.6, 0.5)]],
  c3a: [[0, fr('CAFE', 0, 1.5, -0.8, 6.5, 2.0, 0.6)]], c3b: [[0, fr('CAFE', 0, 1.6, -0.6, 9, 2.6, 0)]],
  c3c: [[0, fr('CAFE', 1.3, 1.6, -0.3, 10, 2.8, 0)]], c3d: [[0, fr('CAFE', 0, 1.5, -0.8, 6.8, 2.0, -0.6)]],
  c4a: [[0, fr('OFFICE', 0.8, 1.6, -0.7, 8.5, 2.6, 0)]], c4b: [[0, fr('OFFICE', 0, 1.5, -1.1, 5.2, 1.3, 0.6)]],
  c4c: [[0, fr('OFFICE', 0.8, 1.6, -0.7, 9, 2.6, 0)]], c4d: [[0, fr('OFFICE', 0, 2.0, -0.8, 7, 1.9, 0)]],
  c4e: [[0, fr('OFFICE', 0, 1.9, -0.8, 7.5, 2.1, -0.6)]], c4f: [[0, fr('OFFICE', 0, 1.6, -0.6, 10, 3, 0)]], c4g: [[0, fr('OFFICE', 0.8, 1.5, -0.7, 8, 2.4, 0)]],
  c5a: [[0, fr('BAR', -0.9, 1.5, -0.4, 8.5, 2.6, 0.5)]], c5b: [[0, fr('BAR', -1.0, 1.5, -0.5, 7, 2.0, 0)]],
  c5c: [[0, fr('BAR', -0.3, 1.9, 0, 10, 3, 0)]], c5d: [[0, fr('BAR', 2.8, 1.0, 1.4, 6.5, 2.2, 0.4)]],
  c5e: [[0, fr('BAR', -1.0, 1.6, -0.4, 7.5, 2.2, -0.5)]], c5f: [[0, fr('BAR', 0, 2.0, 0, 11, 3.6, 0)]], c5g: [[0, fr('BAR', -0.8, 1.5, -0.4, 6.8, 1.9, 0)]],
  p1: [[0, fr('STREET', 3, 1.3, 0, 8.5, 2.6, 0)]], p2: [[0, fr('STREET', 0, 1.0, -2, 15, 11, 0)]],
  p3: [[0, OVER]], p4: [[0, fr('TOWN', 0, 0, 7, 25, 35, 1.5)]], p5: [[0, fr('STREET', 0, 1.3, 0, 7.5, 2.2, 0)]],
  p6: [[0, fx('HOME', [-2.7, 1.1, -2.5], [1.9, 2.9, -0.4])]], p7: [[0, COVERF]],
  recap: [[0, fr('TOWN', 0, 0, 1, 28, 38, 0)]], ask: [[0, fr('STREET', 0, 0.6, -4, 15, 13, 0)]],
};
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sh = SHOT[id];
    sh.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < sh.length ? at(id) + sh[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.93);
      if (prev && id !== 'hook1') { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[2] - f.look[2]) > 12; const tg = Math.min(far ? 2.0 : 1.1, (t1 - t0) * 0.45); keys.push(Object.assign({ t: t0 }, prev));
        if (far) keys.push({ t: t0 + tg / 2, look: prev.look.map((v, i) => (v + f.look[i]) / 2), pos: prev.pos.map((v, i) => (v + f.pos[i]) / 2 + (i === 1 ? 7 : 0)), fov: 40 });
        keys.push(Object.assign({ t: t0 + tg }, f)); }
      else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
const IRIS = [{ t: end('cover') - 0.25, dur: 0.5, type: 'iris' }];

/* time-of-day look per beat */
const LOOK = {
  night: { bg: ['#070b1e', '#1a2650'], fog: '#141d40', hemi: 0.42, sun: 0.25, win: 1.0, lamp: 0.85, stars: 1 },
  day: { bg: ['#3a6ab0', '#a9d0f0'], fog: '#a9c8ea', hemi: 0.78, sun: 0.8, win: 0, lamp: 0, stars: 0 },
  dawn: { bg: ['#2a2f6a', '#e9a07a'], fog: '#c99a8a', hemi: 0.7, sun: 0.55, win: 0.4, lamp: 0.4, stars: 0.3 },
  noon: { bg: ['#2f78c8', '#bfe4ff'], fog: '#b8daf5', hemi: 1.0, sun: 1.0, win: 0, lamp: 0, stars: 0 },
  after: { bg: ['#3a6ab0', '#f0d6a0'], fog: '#d8c8a8', hemi: 0.9, sun: 0.85, win: 0, lamp: 0, stars: 0 },
  dusk: { bg: ['#1c1838', '#c4607a'], fog: '#5a3a5a', hemi: 0.6, sun: 0.45, win: 0.8, lamp: 0.7, stars: 0.4 },
};
function lookKey(id) {
  if (id === 'cover' || id[0] === 'p' || id === 'recap' || id === 'ask' || id === 'end') return 'night';
  if (id.startsWith('c1')) return 'dawn'; if (id.startsWith('c3')) return 'noon'; if (id.startsWith('c4')) return 'after'; if (id.startsWith('c5')) return 'dusk';
  return 'day';
}
const mixC = (a, b, k) => { const ca = new T.Color(a), cb = new T.Color(b); return '#' + ca.lerp(cb, k).getHexString(); };
function lookAt(t) {
  const id = beatAt(t), i = ORDER.indexOf(id), cur = LOOK[lookKey(id)]; if (i <= 0) return cur;
  const pv = LOOK[lookKey(ORDER[i - 1])], k = U.easeIO(U.clamp(rel(t, id) / 1.6)); if (pv === cur || k >= 1) return cur;
  return { bg: [mixC(pv.bg[0], cur.bg[0], k), mixC(pv.bg[1], cur.bg[1], k)], fog: mixC(pv.fog, cur.fog, k), hemi: U.lerp(pv.hemi, cur.hemi, k), sun: U.lerp(pv.sun, cur.sun, k), win: U.lerp(pv.win, cur.win, k), lamp: U.lerp(pv.lamp, cur.lamp, k), stars: U.lerp(pv.stars, cur.stars, k) };
}
function bgAt(t) { return lookAt(t).bg; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const say = (o, txt, c, dy, dx) => BUB.push({ o, txt, c: c || '#fff', dy: dy || 2.2, dx: dx || 0 });
const CORAL = '#ffb3b3';
const LAYPOS = [[-2.6, 0.3], [-1.3, 1.0], [0, 1.4], [1.3, 1.0], [-3.4, -0.6]];
const TONSEAT = [2.6, 0.3];
const ANT0 = [1.0, 2.4], ANT1 = [3.8, 0.2];

function ringsAt(t) {
  /* returns [radius list, expanding?] for payoff beats */
  if (t < at('p3') && t >= end('cover')) return null;
  if (t < end('cover')) return { c: [ST.STREET[0], ST.STREET[2]], r: [3, 7.5, 12, 16.5], a: 1, R: 30 };
  if (between(t, 'p3', 'p5')) { const r = t - at('p3'); return { c: [ST.STREET[0], ST.STREET[2]], r: [0, 1, 2, 3, 4].map((i) => (r * 7 - i * 4.5)), a: 1, R: Math.max(0, r * 7) }; }
  if (inB(t, 'p6')) { const r = rel(t, 'p6'), q = 1 - U.easeIO(sm(0.4, 4.2, r)); return { c: [ST.HOME[0] - 2.6, ST.HOME[2] - 2.0], r: [0, 1, 2].map((i) => q * (28 - i * 8)), a: 0.9, R: 99 }; }
  return { c: [ST.STREET[0], ST.STREET[2]], r: [0, 1, 2, 3].map((i) => ((t * 3.2 + i * 6) % 24)), a: 0.8, R: 99 };
}

let scene0 = null;
function update(t, s, { camera, W, H }) {
  if (!scene0) { scene0 = s.ton.parent; }
  BUB.length = 0; const id = beatAt(t), lk = lookAt(t);
  /* light */
  s.hemi.intensity = lk.hemi; s.sun.intensity = lk.sun; s.fog.color.set(lk.fog);
  for (const h of s.houses) h.userData.winMat.emissiveIntensity = lk.win * 0.9;
  for (const l of s.lamps) l.userData.gl.material.opacity = lk.lamp;
  s.stars.material.opacity = lk.stars;
  s.winPane.material.emissiveIntensity = 0.3 + lk.win * 0.5;
  s.bulbs.forEach((b, i) => { b.children[0].material.opacity = Math.max(0.15, lk.lamp) * (0.8 + 0.2 * Math.sin(t * 3 + i)); });
  s.car.userData.hl.material.opacity = lk.lamp * 0.9;

  /* ---------- ต้น ---------- */
  const N = s.ton; rest(N); setSit(N, false); N.rotation.set(0, 0, 0); N.visible = true; N.scale.setScalar(1);
  s.tonPhone.visible = false; s.tonPen.visible = false; s.tonGlass.visible = false; s.tonGlow.material.opacity = 0; N.userData.ring.visible = true;
  const tonAt = (st, x, y, z) => setP(N, st, x, y, z);
  const night = id === 'cover' || id[0] === 'p' || id === 'recap' || id === 'ask';
  if (between(t, 'hook1', 'c0e')) {
    if (between(t, 'hook1', 'hook3')) { const r = t - at('hook1'), k = U.easeIO(sm(0, 3, r)); tonAt('TEMPLE', U.lerp(6.5, 2.4, k), 0.12, U.lerp(7, 5.2, k)); if (k < 1) { face(N, -1, -0.4); walk(N, t, 1); } else { face(N, 0.1, 1); if (inB(t, 'hook3')) N.userData.arms.R.rotation.set(0, 0, 2.5 + Math.sin(t * 8) * 0.3); } }
    else { setSit(N, true); tonAt('TEMPLE', TONSEAT[0], 0.14, TONSEAT[1]); face(N, -0.7, -0.7); anjali(N, inB(t, 'c0a') || inB(t, 'c0c') ? 1 : 0.0); }
  } else if (between(t, 'c1a', 'c1f')) {
    if (inB(t, 'c1a') || inB(t, 'c1b') || inB(t, 'c1e')) { setSit(N, true); tonAt('HOME', -1.35, 0.55, -1.7); face(N, 1, 0.35); if (inB(t, 'c1a')) { const k = sm(2.2, 3.0, rel(t, 'c1a')); N.userData.arms.R.rotation.set(-2.4 * k, 0, 0.2); N.userData.head.rotation.y = Math.sin(t * 2) * 0.2; } }
    else if (inB(t, 'c1c')) { const r = rel(t, 'c1c'), k = U.easeIO(sm(0.2, 3.6, r)); tonAt('HOME', U.lerp(4.4, 0.2, k), 0.16, 1.5); face(N, -1, 0); if (k > 0 && k < 1) walk(N, t, 1); }
    else if (inB(t, 'c1d')) { tonAt('HOME', -0.4, 0.16, -0.6); face(N, 0.2, 1); const r = rel(t, 'c1d'); const k = sm(2.4, 3.0, r); N.userData.arms.L.rotation.set(-1.6 - k * 0.4, 0, -0.7 + k * 0.5); N.userData.arms.R.rotation.set(-1.6 - k * 0.4, 0, 0.7 - k * 0.5); }
    else { const r = rel(t, 'c1f'), k = U.easeIO(sm(0, 1.4, r)); tonAt('HOME', U.lerp(-0.4, 2.0, k), 0.16, U.lerp(-0.6, -3.2, k)); face(N, 0.3, -1); if (k < 1) walk(N, t, 1); else { N.userData.arms.R.rotation.set(0, 0, 2.6 + Math.sin(t * 9) * 0.35); } }
  } else if (between(t, 'c2a', 'c2e') || between(t, 'c4a', 'c4g')) {
    if (inB(t, 'c2e')) { const r = rel(t, 'c2e'), k = U.easeIO(sm(1.0, 2.8, r)); tonAt('OFFICE', U.lerp(0, -3.0, k), 0.16, U.lerp(-1.3, -2.4, k)); face(N, -1, -0.3); if (k > 0 && k < 1) walk(N, t, 1); if (r > 3.0) say(N, 'ขอเบิกปากกา 1 ด้ามครับ'); }
    else { setSit(N, true); tonAt('OFFICE', 0, 0.42, -1.3); face(N, 0, 1); }
    if (inB(t, 'c2b')) { const r = rel(t, 'c2b'), k = sm(0.6, 1.4, r); N.userData.arms.R.rotation.set(-1.3 * k, 0, 0.1); s.tonPen.visible = k > 0.95; if (r > 1.6) say(N, 'แค่ปากกาเอง…', CORAL); }
    if (inB(t, 'c2c')) { N.userData.arms.R.rotation.set(-1.3, 0, 0.1); s.tonPen.visible = true; }
    if (inB(t, 'c4b')) { N.userData.head.rotation.x = 0.15; if (rel(t, 'c4b') > 0.6) say(N, 'ส่งแล้วครับ เมลคงเด้ง…', CORAL); }
    if (inB(t, 'c4d') || inB(t, 'c4e')) { s.tonPhone.visible = true; N.userData.arms.R.rotation.set(-1.25, 0, 0.25); N.userData.head.rotation.x = 0.25; if (inB(t, 'c4e') && rel(t, 'c4e') > 1.2) say(N, 'เช็กก่อนแชร์…', '#fff'); }
    if (inB(t, 'c4g')) { N.userData.head.rotation.x = 0.2 * Math.sin(Math.min(1, rel(t, 'c4g') / 0.6) * Math.PI); if (rel(t, 'c4g') > 0.5 && rel(t, 'c4g') < 3) say(N, 'ขอโทษครับ ขอส่งเย็นนี้'); }
  } else if (between(t, 'c3a', 'c3d')) {
    setSit(N, true); tonAt('CAFE', 0, 0.42, -1.45); face(N, 0, 1); s.tonPhone.visible = true; N.userData.arms.R.rotation.set(-1.25, 0, 0.25); N.userData.head.rotation.x = 0.22;
    if (inB(t, 'c3a') && rel(t, 'c3a') > 1.0) say(N, 'ว่างไหม ไปดูหนังกัน', CORAL, 2.3);
    if (inB(t, 'c3d') && rel(t, 'c3d') > 0.4) say(N, 'ไปกับเพื่อนเราดีกว่า', '#fff', 2.3);
  } else if (between(t, 'c5a', 'c5g')) {
    tonAt('BAR', 0.2, 0.16, -0.2); face(N, -1, 0.3);
    if (inB(t, 'c5g')) { const r = rel(t, 'c5g'); s.tonGlass.visible = true; const k = sm(0.6, 1.2, r) * (1 - sm(2.6, 3.2, r)); N.userData.arms.R.rotation.set(-1.0 - k * 0.6, 0, 0.3 + k * 0.4); if (r > 0.3) say(N, 'น้ำส้มครับ!'); }
  } else if (night) {
    if (inB(t, 'p6')) { tonAt('HOME', -2.6, 1.0, -1.85); N.rotation.x = -Math.PI / 2; s.tonGlow.material.opacity = 0.55 * sm(2.5, 4.5, rel(t, 'p6')); s.tonGlow.position.set(ST.HOME[0] - 2.6, 1.4, ST.HOME[2] - 2.6); N.userData.ring.visible = false; }
    else if (inB(t, 'p1')) { const r = rel(t, 'p1'); tonAt('STREET', U.lerp(6.5, 0.6, U.clamp(r / dur('p1'))), 0.08, 0.2); face(N, -1, 0); walk(N, t, 0.8); }
    else { tonAt('STREET', 0, 0.08, 0.2); face(N, 0, 1); s.tonGlow.material.opacity = 0.7; s.tonGlow.position.set(ST.STREET[0], 1.3, ST.STREET[2] + 0.2);
      if (inB(t, 'p5')) { N.userData.head.rotation.x = -0.25; } else { anjali(N, 0); } }
  }
  if (!(between(t, 'c3a', 'c3d') || inB(t, 'c4d') || inB(t, 'c4e'))) s.tonPhone.visible = false;

  /* ---------- temple ---------- */
  { const on = t < end('c0e') + 1.5 || id === 'recap';
    s.monk.visible = true; anjali(s.monk, 0); s.monk.userData.arms.R.rotation.set(-1.0, 0, 0.2); s.fan.visible = true;
    if (between(t, 'c0a', 'c0c')) { const tl = t - at('c0a'); if (tl > 0.6 && tl < 9.8) say(s.monk, tl < 5 ? 'ปาณาติปาตา เวระมะณี…' : '…สิกขาปะทัง สะมาทิยามิ', '#fff', 1.9); }
    s.lay.forEach((c, i) => { setSit(c, true); const q = LAYPOS[i]; setP(c, 'TEMPLE', q[0], 0.14, q[1]); face(c, -q[0], -2.0 - q[1]); anjali(c, inB(t, 'c0a') || inB(t, 'c0c') ? 1 : 0); c.visible = on; });
    s.givers.forEach((c, i) => { const tl = t - at('hook1') + 0.6 - i * 0.7, k = U.easeIO(sm(0, 2.6, tl)); const x0 = 1 + i * 1.6, z0 = 9, x1 = -6.4 + i * 0.7, z1 = 5.6 + (i % 2) * 0.5;
      setP(c, 'TEMPLE', U.lerp(x0, x1, k), 0.12, U.lerp(z0, z1, k)); face(c, x1 - x0, z1 - z0); if (k > 0 && k < 1) walk(c, t + i, 1); else rest(c);
      c.userData.gift.visible = k < 1; if (k < 1) c.userData.arms.R.rotation.set(-0.9, 0, 0.1); c.visible = between(t, 'hook1', 'hook3'); });
    s.steps.forEach((q) => { const k = inB(t, 'c0d') ? U.easeBack(sm(0.4 + q.i * 0.6, 0.9 + q.i * 0.6, rel(t, 'c0d'))) : (t > end('c0d') && t < end('c0e') ? 1 : 0); q.b.scale.set(1, Math.max(0.001, q.h * k), 1); q.b.visible = k > 0.01;
      q.lb.visible = q.lb2.visible = k > 0.6; q.lb.material.opacity = q.lb2.material.opacity = U.clamp((k - 0.6) / 0.3); setP(q.lb, 'TEMPLE', 6.2 + q.i * 1.55, q.h * k + 0.55, 3.4); setP(q.lb2, 'TEMPLE', 6.2 + q.i * 1.55, q.h * k + 1.15, 3.4); }); }

  /* ---------- home ---------- */
  { s.bed.userData.blanket.position.y = inB(t, 'p6') ? 1.15 : 0.72; s.bed.userData.blanket.scale.z = inB(t, 'p6') ? 0.8 : 1; s.bed.userData.blanket.position.z = inB(t, 'p6') ? 0.65 : 0.45;
    const ch = between(t, 'c1a', 'c1f');
    /* mosquito */
    let mp = null;
    if (ch || inB(t, 'cover')) {
      const c = [ST.HOME[0] - 1.35, 2.0, ST.HOME[2] - 1.5];
      if (inB(t, 'c1f')) { const r = rel(t, 'c1f'), k = sm(1.6, 4.6, r); const a = [N.position.x + 0.3, 2.1, N.position.z - 0.4], b = [ST.HOME[0] + 2.2, 2.2, ST.HOME[2] - 9]; mp = a.map((v, i) => U.lerp(v, b[i], k)); mp[1] += Math.sin(t * 9) * 0.06; }
      else if (inB(t, 'c1c')) mp = [ST.HOME[0] + 2.2, 2.3 + Math.sin(t * 7) * 0.1, ST.HOME[2] - 2 + Math.cos(t * 3) * 0.6];
      else if (inB(t, 'c1d')) mp = [N.position.x + Math.sin(t * 5) * 0.12, 2.35 + Math.sin(t * 7) * 0.05, N.position.z + 0.45];
      else mp = [c[0] + Math.cos(t * 2.6) * 0.7, c[1] + Math.sin(t * 5) * 0.12, c[2] + Math.sin(t * 2.6) * 0.7];
    }
    s.mos.visible = !!mp && t < at('c1f', 4.4); if (mp) { s.mos.position.set(mp[0], mp[1], mp[2]); s.mos.rotation.y = -t * 2.6; s.mos.userData.wings.forEach((w, i) => (w.rotation.x = Math.PI / 2 + Math.sin(t * 60 + i) * 0.6)); }
    if (inB(t, 'c1a') && rel(t, 'c1a') > 0.5 && rel(t, 'c1a') < 2.6) say(s.mos, 'หึ่งงงง~', '#fff', 0.7);
    /* ants */
    s.ants.forEach((a, i) => { const u = ((t * 0.06 + i / s.ants.length) % 1); setP(a, 'HOME', U.lerp(ANT0[0], ANT1[0], u), 0.2, U.lerp(ANT0[1], ANT1[1], u)); a.rotation.y = Math.atan2(-(ANT1[1] - ANT0[1]), ANT1[0] - ANT0[0]); a.scale.set(1, 1, 1); a.visible = true; });
    if (inB(t, 'c1c') || inB(t, 'c1d')) { const sq = s.ants[0]; const k = inB(t, 'c1d') ? 1 : sm(2.0, 2.2, rel(t, 'c1c')); setP(sq, 'HOME', 2.35, 0.18, 1.45); if (k > 0) sq.scale.set(1.4, 0.15, 1.4); }
    /* candle */
    const cl = inB(t, 'c1e') ? 1 - 0.7 * U.easeIO(sm(1.0, 3.8, rel(t, 'c1e'))) : inB(t, 'c1f') ? U.lerp(0.3, 1, U.easeIO(sm(0.5, 3, rel(t, 'c1f')))) : 1;
    s.candle.userData.set(cl); s.candle.userData.fl.material.opacity = 0.75 + 0.25 * Math.sin(t * 13); }

  /* ---------- office ---------- */
  { const pick = between(t, 'c2b', 'c2d') ? 1 : 0; s.cupPens[0].visible = !pick;
    /* colleagues */
    const [a, b] = s.cow; setSit(a, true); setSit(b, true); setP(a, 'OFFICE', -3.4, 0.42, -1.3); setP(b, 'OFFICE', 3.4, 0.42, -1.3); face(a, 0, 1); face(b, 0, 1); rest(a); rest(b);
    if (inB(t, 'c2e')) { setSit(a, false); setP(a, 'OFFICE', -4.2, 0.16, -2.0); face(a, 1, 0.3); if (rel(t, 'c2e') > 3.6) say(a, 'ได้เลย!', '#fff'); }
    if (inB(t, 'c4f')) { const r = rel(t, 'c4f'); a.userData.arms.R.rotation.set(-1.3, 0.6, 0); b.userData.arms.L.rotation.set(-1.3, -0.6, 0); if (r > 0.6) say(a, 'ได้ข่าวว่าต้น…', CORAL); if (r > 2.0) say(b, 'จริงเหรอ!?', CORAL); }
    /* boss */
    const B0 = s.boss; rest(B0); setSit(B0, false);
    if (between(t, 'c4a', 'c4g')) { const r = t - at('c4a'), k = U.easeIO(sm(0.2, 1.6, r)); setP(B0, 'OFFICE', U.lerp(3.4, 1.6, k), 0.16, U.lerp(-3.3, 0.2, k)); face(B0, k < 1 ? -0.5 : -0.8, k < 1 ? 1 : -0.6); if (k > 0 && k < 1) walk(B0, t, 1);
      if (inB(t, 'c4a') && r > 1.8) say(B0, 'งานเมื่อวานล่ะ?', '#fff'); if (inB(t, 'c4g') && rel(t, 'c4g') > 3.0) say(B0, 'โอเค ขอบใจที่บอกตรงๆ', '#fff'); }
    else { setSit(B0, true); setP(B0, 'OFFICE', 3.4, 0.42, -3.6); face(B0, 0, 1); }
    /* wallet + coins */
    const cd = inB(t, 'c2d') ? rel(t, 'c2d') : -1;
    s.coins.forEach((c, i) => { if (cd < 0) { c.visible = false; return; } const u = U.clamp((cd - 0.9 - i * 0.22) / 1.6); c.visible = u > 0 && u < 1; const ang = i * 0.8;
      setP(c, 'OFFICE', -0.1 + Math.cos(ang) * u * 1.0, 1.15 + Math.sin(u * Math.PI) * 0.9 - u * 1.0, -0.3 + Math.sin(ang) * u * 0.6 + 0.2 * u); c.rotation.y = t * 6 + i; c.material.opacity = 1; });
    const ws = cd >= 0 ? 0.6 * (1 - 0.6 * U.easeIO(sm(1.0, 3.5, cd))) : 0.6; s.wallet.scale.setScalar(ws);
    /* news card */
    const nk = inB(t, 'c4d') ? U.easeBack(sm(0.3, 0.9, rel(t, 'c4d'))) : inB(t, 'c4e') ? 1 - sm(3.8, 4.4, rel(t, 'c4e')) : 0; s.news.visible = nk > 0.01; s.news.scale.setScalar(Math.max(0.001, nk)); setP(s.news, 'OFFICE', 0.9, 2.55 + Math.sin(t * 2) * 0.05, -0.6);
    if (inB(t, 'c4e')) { const q = sm(1.6, 2.2, rel(t, 'c4e')); s.news.rotation.z = q * 0.25; } else s.news.rotation.z = 0; }

  /* ---------- cafe ---------- */
  { const F0 = s.friend, G = s.gf; rest(F0); rest(G); const on3 = inB(t, 'c3c'); const onP = between(t, 'p3', 'p5') || id === 'recap' || id === 'cover';
    vis(F0, on3 || onP); vis(G, on3 || onP); G.userData.ring && (G.userData.ring.visible = false);
    if (on3) { const r = rel(t, 'c3c'), k = U.easeOut(sm(0, 1.0, r)); setP(G, 'CAFE', 2.4, 0.16, 0.9); face(G, -1, 0.2); G.userData.arms.R.rotation.set(-1.2, 0, 0.2); s.gfPhone.visible = true;
      setP(F0, 'CAFE', U.lerp(6, 3.5, k), 0.16, 0.4); face(F0, -1, 0.1); if (k < 1) walk(F0, t, 1); else { F0.userData.arms.L.rotation.set(0, 0, -0.9); F0.userData.arms.R.rotation.set(0, 0, 0.9); } if (r > 1.2) say(F0, 'นั่นแฟนเรานะ!', CORAL); }
    else if (onP) { setP(G, 'CAFE', 2.6, 0.16, 1.6); setP(F0, 'CAFE', 3.4, 0.16, 1.6); face(G, 0.3, 1); face(F0, -0.3, 1); G.userData.arms.R.rotation.set(0, 0, 0.5); F0.userData.arms.L.rotation.set(0, 0, -0.5); s.gfPhone.visible = false; } }

  /* ---------- bar ---------- */
  { const [f1, f2] = s.bf; rest(f1); rest(f2); setP(f1, 'BAR', -2.4, 0.16, -0.1); face(f1, 1, -0.2); setP(f2, 'BAR', -1.3, 0.16, -1.8); face(f2, 0.2, 1);
    f1.userData.arms.R.rotation.set(-1.0, 0, 0.2); f2.userData.arms.R.rotation.set(-0.9, 0, 0.2);
    if (inB(t, 'c5a')) { const r = rel(t, 'c5a'); f1.userData.arms.R.rotation.set(-1.4 - Math.sin(r * 4) * 0.15, 0, 0.4); if (r > 0.6) say(f1, 'แก้วเดียวน่า!', '#fff'); }
    if (inB(t, 'c5e')) { const r = rel(t, 'c5e'); f1.rotation.z = Math.sin(r * 3) * 0.18; f1.userData.head.rotation.z = Math.sin(r * 3 + 1) * 0.3; } else f1.rotation.z = 0;
    if (inB(t, 'c5g')) { const k = sm(0.8, 1.3, rel(t, 'c5g')) * (1 - sm(2.6, 3.2, rel(t, 'c5g'))); f1.userData.arms.R.rotation.set(-1.0 - k * 0.6, 0, 0.2 + k * 0.4); }
    /* dominoes */
    s.dom.forEach((d, i) => { let a = 0; if (inB(t, 'c5d')) { const r = rel(t, 'c5d') - 1.0 - i * 0.45; a = r <= 0 ? 0 : -(i === 4 ? 1.45 : 0.5) * Math.pow(U.clamp(r / 0.45), 2); } else if (t >= end('c5d') && t < end('c5e')) a = -(i === 4 ? 1.45 : 0.5); d.rotation.z = a; d.visible = between(t, 'c5d', 'c5e'); });
    s.glasses.forEach((g0) => (g0.visible = true)); }

  /* ---------- payoff: rings + beings ---------- */
  { const R = ringsAt(t);
    s.rings.forEach((m, i) => { if (!R || R.r[i] == null) { m.visible = false; return; } const r = R.r[i]; m.visible = r > 0.2; m.scale.setScalar(Math.max(0.01, r)); m.position.set(R.c[0], 0.25, R.c[1]); m.material.opacity = R.a * 0.85 * (1 - U.clamp(r / 30)); });
    const on = !!R || id === 'recap';
    s.beings.visible = on;
    if (on) { const col = s.beings.geometry.attributes.color, d = s.beings.userData.d, RR = R ? R.R : 99;
      for (let i = 0; i < col.count; i++) { const lit = d[i] < RR, k = lit ? 1 : 0.18, g = i % 3 === 0; col.setXYZ(i, (g ? 1.0 : 0.18) * k, (g ? 0.79 : 0.9) * k, (g ? 0.29 : 0.77) * k); }
      col.needsUpdate = true; }
    /* station glows + labels in p4 */
    const P4 = [['HOME', 2.2, 2.4, -4.0], ['CAFE', 3.0, 1.8, 1.6], ['OFFICE', -2.0, 1.6, -0.3], ['OFFICE', 3.2, 0.2, 12.6], ['BAR', -2, 1.2, 12.5]];
    if (!s.p4a) s.p4a = P4.map((q) => { const o = new T.Object3D(); setP(o, q[0], q[1], q[2], q[3]); scene0.add(o); return o; });
    s.pLabels.forEach((lb, i) => { lb.visible = false; const r = inB(t, 'p4') ? rel(t, 'p4') - [0.5, 1.3, 2.9, 3.7, 4.5][i] : -1; if (r > 0) BUB.push({ o: s.p4a[i], txt: ['ยุงที่รอด', 'คู่ที่ไม่แตก', 'ของที่ไม่หาย', 'ความจริง', 'คนบนถนน'][i], c: '#fff', dy: 1.5, small: true }); });
    s.giftGlows.forEach((g0, i) => { if (i >= 5) { g0.material.opacity = 0; return; } const q = P4[i]; setP(g0, q[0], q[1], q[2] + 1, q[3]); const r = between(t, 'p4', 'p5') ? t - at('p4') - [0.5, 1.3, 2.9, 3.7, 4.5][i] : -1; g0.material.opacity = 0.75 * U.clamp(r / 0.4) * (0.85 + 0.15 * Math.sin(t * 4 + i)); });
    /* the spared mosquito flies over the house at night, a car passes safely on the street */
    if (between(t, 'p3', 'p5')) { s.mos.visible = true; s.mos.scale.setScalar(3.2); s.mos.position.set(ST.HOME[0] + 2.2 + Math.cos(t) * 1.2, 4 + Math.sin(t * 3) * 0.3, ST.HOME[2] - 4 + Math.sin(t) * 1.2); s.mos.userData.wings.forEach((w, i) => (w.rotation.x = Math.PI / 2 + Math.sin(t * 60 + i) * 0.6)); } else s.mos.scale.setScalar(1.6);
    if (night) { const u = (t * 0.07) % 1; s.car.position.set(ST.BAR[0] + U.lerp(-24, 24, u) - 8, 0, -13 + 0.9); s.car.rotation.y = 0; } else { setP(s.car, 'BAR', 1.8, 0, 6.2); } }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.1); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; b.vis = v.z < 1 && v.x > -1.2 && v.x < 1.2; }
  window.__dbg = { s, camera };
}
/* Part E: HUD + audio + run (helpers copied from mog/e-hud.js) */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = b.big ? 84 : 40; g.font = F(700, px); const w = Math.max(b.big ? 110 : 0, g.measureText(b.txt).width + 48), h = b.big ? 120 : 74;
  let x = U.clamp(b.x - w / 2, 70, 1010 - w), y = Math.max(800, b.y - h - 26);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = b.c === '#fff' ? '#1a1f3a' : '#a01830'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function chapter(g, t) {
  const n = CHAP.length, w = 124, gap = 8, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 24); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = big ? 74 : 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }

/* clock + 5 lamps (the ศีล gauge) */
function clockLamps(g, t) {
  let ci = -1; CLOCK.forEach((c, i) => { if (t >= at(c[0])) ci = i; }); if (ci < 0) return;
  const c = CLOCK[ci], nxt = CLOCK[ci + 1], span = (nxt ? at(nxt[0]) : at('recap')) - at(c[0]);
  const mins = c[1] * 60 + c[2] + Math.floor(U.clamp((t - at(c[0])) / span) * c[3]);
  const s = String(Math.floor(mins / 60) % 24).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
  const y = 420, pop = U.easeBack(U.clamp((t - at(c[0])) / 0.4));
  g.save(); g.translate(150, y); g.scale(0.8 + 0.2 * pop, 0.8 + 0.2 * pop); g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, -92, -36, 184, 72, 36); g.fill(); g.strokeStyle = P.gold; g.lineWidth = 3; g.stroke();
  g.fillStyle = P.gold; g.beginPath(); g.arc(-58, 0, 16, 0, 6.283); g.fill(); g.strokeStyle = '#0f1630'; g.lineWidth = 3; g.beginPath(); g.moveTo(-58, 0); g.lineTo(-58, -10); g.moveTo(-58, 0); g.lineTo(-51, 4); g.stroke();
  g.fillStyle = '#fff'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 18, 3); g.restore();
  const drunk = inB(t, 'c5d') ? rel(t, 'c5d') : -1;
  for (let i = 1; i <= 5; i++) {
    const x = 330 + (i - 1) * 132; const pass = t >= PASS[i], test = between(t, TEST[i][0], TEST[i][1]) && !pass;
    let col = 'rgba(255,255,255,.16)', r = 34, fg = '#fff';
    if (pass) { col = P.teal; fg = '#0f1630'; const k = U.clamp((t - PASS[i]) / 0.35); r = 34 + 10 * Math.sin(k * Math.PI); }
    if (test) { col = P.gold; fg = '#0f1630'; r = 36 + Math.sin(t * 6) * 3; }
    if (drunk > 0 && i < 5) { const hit = drunk - 1.0 - (4 - i + 1) * 0.45; if (hit > 0) { col = Math.sin(t * 14) > 0 ? P.coral : '#7a2030'; fg = '#fff'; } }
    if (pass) { g.save(); g.globalAlpha = 0.35; g.fillStyle = P.teal; g.beginPath(); g.arc(x, y, r + 12, 0, 6.283); g.fill(); g.restore(); }
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill(); g.fillStyle = fg; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2);
  }
  g.font = F(600, 24); g.fillStyle = 'rgba(255,255,255,.85)'; g.textAlign = 'left'; g.fillText('ศีล', 330 + 4 * 132 + 50, y + 2);
}
/* องค์ chips row */
function chipsState(t) {
  const tick = (id, t0, step, n) => (k) => t >= at(id, t0 + k * step) ? 1 : 0;
  if (inB(t, 'c1b')) { const f = tick('c1b', 0.6, 0.75); return [1, [0, 1, 2, 3, 4].map(f)]; }
  if (inB(t, 'c1c')) return [1, [1, rel(t, 'c1c') > 2.4 ? -1 : 0, rel(t, 'c1c') > 2.4 ? -1 : 0, 1, rel(t, 'c1c') > 2.2 ? 1 : 0]];
  if (inB(t, 'c1d')) return rel(t, 'c1d') < 2.4 ? [1, [1, -1, -1, 1, 1]] : [1, [1, 1, 1, 1, 1]];
  if (inB(t, 'c2c')) { const f = tick('c2c', 0.6, 0.75); return [2, [0, 1, 2, 3, 4].map(f)]; }
  if (inB(t, 'c4c')) { const f = tick('c4c', 0.8, 0.9); return [4, [0, 1, 2, 3].map(f)]; }
  if (inB(t, 'c4d') || inB(t, 'c4e')) return [4, [1, -1, 1, 1]];
  return null;
}
function chips(g, t) {
  const st = chipsState(t); if (!st) return; const lab = ONG[st[0]], v = st[1], n = lab.length;
  const y = 1440; g.save(); g.font = F(700, 30); const ws = lab.map((s) => g.measureText(s).width + 76); const total = ws.reduce((a, b) => a + b, 0) + (n - 1) * 10; const sc = Math.min(1, 1000 / total);
  g.translate(540, y); g.scale(sc, sc); let x = -total / 2;
  lab.forEach((s, i) => { const w = ws[i], k = v[i]; g.fillStyle = k > 0 ? P.teal : k < 0 ? 'rgba(255,93,115,.9)' : 'rgba(15,22,48,.82)'; rr(g, x, -32, w, 64, 32); g.fill(); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = k > 0 ? '#0f1630' : '#fff'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(k > 0 ? '✓' : k < 0 ? '✕' : '○', x + 30, 2); g.font = F(700, 30); g.fillText(s, x + 30 + (w - 44) / 2, 2); x += w + 10; });
  g.restore();
}
/* 20-person grid: 35.2% drink */
function peopleGrid(g, t) {
  const r = rel(t, 'c5f'), a = U.clamp(r / 0.3) * U.clamp((dur('c5f') - r) / 0.3); g.save(); g.globalAlpha = a; panel(g, 120, 1250, 840, 250, 1);
  for (let i = 0; i < 20; i++) { const cx = 200 + (i % 10) * 76, cy = 1325 + Math.floor(i / 10) * 100, on = i < 7 && r > 1.0 + i * 0.22;
    g.fillStyle = on ? P.gold : 'rgba(255,255,255,.28)'; g.beginPath(); g.arc(cx, cy - 18, 13, 0, 6.283); g.fill(); rr(g, cx - 17, cy - 2, 34, 36, 12); g.fill(); }
  g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ประมาณ 7 ใน 20 คน', 540, 1478); g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1220, 1);
  txt(g, 'ศีล 5 = มหาทาน 5', 540, 380, 74, P.gold, 800); txt(g, 'ให้ความไม่มีภัย ไม่มีเวร ไม่เบียดเบียน', 540, 460, 38, '#fff', 600);
  const rows = [['ไม่ฆ่า', 'อายุสั้น'], ['ไม่ลัก', 'ทรัพย์เสื่อม'], ['ไม่ผิดในกาม', 'ก่อเวร มีศัตรู'], ['ไม่โกหก', 'ถูกใส่ร้าย'], ['ไม่เสพของเมา', 'ความเป็นบ้า']];
  txt(g, 'ถ้าละเมิด ผลเบาที่สุดคือ…', 640, 545, 30, 'rgba(255,255,255,.75)', 600);
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.6) / 0.3); if (k <= 0) return; const y = 640 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = P.teal; g.beginPath(); g.arc(170, y, 40, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 42); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s[0], 236, y, 44, '#fff', 700, 'left'); txt(g, '→ ' + s[1], 940, y, 40, P.coral, 700, 'right'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก เล่ม 23 ข้อ 129–130 (ปุญญาภิสันทสูตร · สัพพลหุสสูตร)', 540, 1405);
  g.fillText('องค์ของศีล: อรรถกถา · สำนักงานสถิติแห่งชาติ 2567 · ภาพจำลอง', 540, 1443);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  for (const b of BUB) if (b.vis !== false) bubble(g, b);
  if (t >= at('c0a') && t < at('recap')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (t >= at('c1a') && t < at('recap')) clockLamps(g, t);
  chips(g, t);
  if (inB(t, 'c5f')) peopleGrid(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
  if (between(t, 'c0a', 'c0e')) { g.save(); g.font = F(700, 32); const w = g.measureText('เมื่อวาน · วันพระ').width + 50; g.fillStyle = 'rgba(255,220,170,.92)'; rr(g, 540 - w / 2, 392, w, 56, 28); g.fill(); g.fillStyle = '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('เมื่อวาน · วันพระ', 540, 421); g.restore(); }
}

/* audio */
FK.softSfx();
VE.registerSfx('buzz', (tt) => VE.audio.tone(tt, 640, 1.1, { type: 'triangle', f2: 700, vol: 0.012, att: 0.15, rel: 0.3 }));
VE.registerSfx('clink', (tt) => { VE.audio.tone(tt, 1760, 0.25, { vol: 0.03, rel: 0.25 }); VE.audio.tone(tt + 0.01, 2350, 0.2, { vol: 0.02, rel: 0.2 }); });
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
const AUD = [[0.1, 'shimmer'], [at('hook1'), 'temple'], [at('c0a', 0.4), 'temple'], [at('c1a', 0.4), 'buzz'], [at('c1d', 0.2), 'buzz']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (!SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && id !== 'hook1' && Math.hypot(pl[0] - L0[0], pl[2] - L0[2]) > 12) AUD.push([at(id), 'glide', { dur: 1.4 }]); pl = L0; } }
for (const i of [1, 2, 3, 4, 5]) AUD.push([PASS[i], 'bell']);
for (let k = 0; k < 5; k++) { AUD.push([at('c1b', 0.6 + k * 0.75), 'tok'], [at('c2c', 0.6 + k * 0.75), 'tok']); if (k < 4) AUD.push([at('c4c', 0.8 + k * 0.9), 'tok']); }
for (let k = 0; k < 5; k++) AUD.push([at('c5d', 1.0 + k * 0.45 + 0.3), 'tok']);
for (let k = 0; k < 7; k++) AUD.push([at('c5f', 1.0 + k * 0.22), 'tok']);
for (let k = 0; k < 4; k++) AUD.push([at('c0d', 0.5 + k * 0.6), 'pop']);
for (const d of [0.5, 1.3, 2.9, 3.7, 4.5]) AUD.push([at('p4', d), 'pop']);
AUD.push([at('c1e', 1.0), 'soft'], [at('c2d', 1.0), 'soft'], [at('c3a', 1.0), 'pop'], [at('c4d', 0.3), 'pop'], [at('c5g', 1.0), 'clink'], [at('c5g', 1.8), 'chime']);
AUD.push([at('hook2', 0.5), 'chime'], [at('p3', 0.2), 'chime'], [at('p3', 0.4), 'shimmer'], [at('p6', 3.0), 'shimmer'], [at('p7', 0.3), 'chime'], [at('p7', 0.5), 'shimmer'], [at('recap', 0.2), 'bell']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'sil-5-mahathan-youtube' : 'sil-5-mahathan', title: 'ศีล 5 = มหาทาน',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => inB(t, 'c5d') || inB(t, 'p5'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
})();
