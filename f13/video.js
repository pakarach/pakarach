(function () {
/* ศุกร์ 13 — ย้อนเวลา (storytelling, long). Part A: beats, captions, chapters, year card. */
const T = THREE, P = FK.pal, U = VE.u, L = FK.land();
const BEATS = [
  ['cover', 2.0], ['hook1', 5.0], ['hook2', 5.0], ['hook3', 5.0], ['hook4', 4.0],
  ['c12', 5.0], ['c13', 5.0], ['loki1', 5.0], ['loki2', 5.0], ['loki3', 5.2], ['supper', 5.0], ['supper2', 5.2], ['cliff1', 4.4],
  ['fri1', 4.8], ['fri2', 5.0], ['fri3', 5.0], ['cliff2', 4.8],
  ['tmp1', 5.2], ['tmp2', 5.2], ['tmp3', 5.0],
  ['ros1', 4.6], ['ros2', 4.8], ['ros3', 5.0], ['ros4', 5.6], ['ros5', 6.0],
  ['law1', 5.4], ['law2', 5.2], ['law3', 5.6], ['law4', 5.0], ['law5', 5.6], ['law6', 5.4], ['movie', 5.0], ['cliff5', 4.4],
  ['tow1', 6.0], ['tow2', 5.0], ['tow3', 5.4], ['road1', 4.8], ['road2', 6.0], ['road3', 4.8], ['cof1', 4.6], ['cof2', 5.2], ['cof3', 5.4], ['cliff6', 4.2],
  ['w1', 5.4], ['w3', 6.0], ['w4', 5.4], ['thai1', 5.6], ['thai2', 5.2], ['thai3', 5.8],
  ['math1', 5.6], ['math2', 5.2], ['recap', 9.0], ['ask', 5.4], ['end', 1.6],
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
const CAP = {
  hook1: ['วันนี้ 13 พ.ย. 2569 ตรงกับ{วันศุกร์}', 'เป็น{ศุกร์ 13} [ครั้งที่ 3] ของปีนี้แล้ว'],
  hook2: ['ลิฟต์หลายตึก กด 12 แล้ว{ข้ามไป 14}', 'บางคน[ไม่ยอมขึ้นเครื่องบิน]วันนี้'],
  hook3: ['แต่ความกลัวนี้ {อายุไม่ถึง 200 ปี}', 'ใครกันที่จับ ศุกร์ กับ 13 [มาคู่กัน]?'],
  hook4: ['ไปสืบกันทีละชิ้น', 'เริ่มจาก{เลข 13} ก่อน'],
  c12: ['ทำไมคนชอบ{เลข 12}?', '12 เดือน · 12 ชั่วโมง · [12 นักษัตร]'],
  c13: ['12 แบ่งลงตัว [ครบพอดี]', 'พอมี 13 เลยกลายเป็น{ตัวเกิน}', '12 หารลงตัวด้วย 2, 3, 4 และ 6'],
  loki1: ['ตำนานนอร์สเล่าว่า', 'เทพ{12 องค์} จัดงานเลี้ยงที่วัลฮัลลา', 'ตำนานนอร์ส ตามที่นักคติชน Donald Dossey เล่า'],
  loki2: ['แล้ว{โลกิ} เทพจอมเจ้าเล่ห์ ก็โผล่มา', 'เป็นแขกคนที่ <13> โดยไม่ได้รับเชิญ'],
  loki3: ['งานเลี้ยงจบด้วย<เรื่องร้าย>', 'บัลเดอร์ เทพแห่งแสง [สิ้นชีวิต] โลกมืดลง'],
  supper: ['ฝั่งคริสต์ มื้อสุดท้ายของพระเยซู', 'มีคนร่วมโต๊ะ{ 13 คน}', 'ภาพจำลอง'],
  supper2: ['หนึ่งในนั้นคือ <ยูดาส> ผู้ทรยศ', 'ฝรั่งเลยถือว่า [กินข้าว 13 คน] ไม่ดี'],
  cliff1: ['แต่ 13 อย่างเดียว', 'ยังไม่ใช่{ศุกร์ 13} นะ…'],
  fri1: ['ชาวคริสต์เชื่อว่า พระเยซู', 'ถูกตรึงกางเขน{วันศุกร์}'],
  fri2: ['ชาวเรืออังกฤษสมัยก่อน', '<ไม่ชอบออกเรือวันศุกร์>'],
  fri3: ['บางคนก็เลี่ยง{แต่งงานวันศุกร์}', 'กลัวชีวิตคู่เริ่มต้น [ไม่ราบรื่น]'],
  cliff2: ['สองความกลัวนี้ อยู่แยกกัน{หลายร้อยปี}', 'แล้วมารวมร่างกัน[ตอนไหน]?'],
  tmp1: ['หลายคนเล่าว่าเริ่มจาก{อัศวินเทมพลาร์}', 'ถูกจับทั่วฝรั่งเศส [13 ต.ค. 1307]'],
  tmp2: ['วันนั้นเป็น{วันศุกร์}จริง', 'แต่<ไม่มีบันทึก>ว่าคนยุคนั้นกลัววันนี้', 'ตามปฏิทินจูเลียนที่ใช้ในยุคนั้น'],
  tmp3: ['การโยงเรื่องนี้ {เพิ่งมีในศตวรรษที่ 20}', 'จึงเป็น[ตำนานที่แต่งทีหลัง]'],
  ros1: ['งั้นหลักฐานแรก อยู่ที่ไหน?', 'ไปดูที่[ปารีส ปี 1868]'],
  ros2: ['{รอสซีนี} คีตกวีดังชาวอิตาลี', 'ผู้แต่งโอเปรา [William Tell]'],
  ros3: ['เขาเสียชีวิตวันที่ 13 พฤศจิกายน', 'ซึ่งตรงกับ{วันศุกร์}'],
  ros4: ['ปีต่อมา คนเขียนชีวประวัติบันทึกว่า', '“น่าแปลก เขาจากไปวัน{ศุกร์ 13}”', 'H. S. Edwards, The Life of Rossini (1869) — ความโดยย่อ'],
  ros5: ['นี่คือหลักฐานภาษาอังกฤษ{ยุคแรกสุด}ที่พบ', 'และ 13 พ.ย. คือ[วันนี้พอดี] ห่างกัน 158 ปี'],
  law1: ['ปี 1907 เศรษฐีบอสตัน {ทอมัส ลอว์สัน}', 'เขียนนิยาย [“Friday, the Thirteenth”]'],
  law2: ['เรื่องนายหน้าหุ้น ที่ใช้{ความกลัววันนี้}', 'ทำให้ [Wall Street] ปั่นป่วน'],
  law3: ['ปีเดียวกันนั้น {เรือใบ 7 เสา}', 'ที่ตั้งชื่อตามลอว์สัน ออกข้ามแอตแลนติก', 'เรือใบ 7 เสา ลำเดียวที่เคยสร้าง (ปล่อยลงน้ำ 1902)'],
  law4: ['เรือมาถึงหมู่เกาะซิลลี อังกฤษ', 'ตรงกับคืน{ศุกร์ 13 ธันวาคม}'],
  law5: ['พายุซัดเรือ<เข้าหาโขดหิน>', 'ลูกเรือ 18 คน [รอดแค่ 2 คน]'],
  law6: ['หนังสือพิมพ์รีบโยงทันที', 'เรือของคนเขียน{“ศุกร์ 13”} มาอับปางวันนี้'],
  movie: ['ปี 1980 หนังสยองชื่อเดียวกัน', 'ทำให้{ทั้งโลก}รู้จักวันนี้'],
  cliff5: ['ความกลัวที่เกิดจากเรื่องเล่า', 'วันนี้{มีผลจริง}แค่ไหน?'],
  tow1: ['Otis บริษัทลิฟต์ ประเมินไว้ปี 2002', '{85%} ของตึกที่ใช้ลิฟต์ Otis ไม่มีชั้นชื่อ 13'],
  tow2: ['ในกรุงเทพฯ ก็มีนะ', 'MBK Tower เรียกชั้นนี้ว่า{12A}'],
  tow3: ['ในสหรัฐฯ คาดว่ามี{17–21 ล้านคน}', 'ที่กังวลกับวันนี้', 'ประมาณการ: Stress Management Center and Phobia Institute'],
  road1: ['แต่วันนี้ ซวยกว่าวันอื่นจริงไหม?', '[เนเธอร์แลนด์] นับอุบัติเหตุไว้'],
  road2: ['วันศุกร์ทั่วไป เฉลี่ย[~7,800 ครั้ง]', 'วันศุกร์ 13 เหลือ{~7,500 ครั้ง}', 'Dutch Centre for Insurance Statistics, 2008'],
  road3: ['ศุกร์ 13 {อุบัติเหตุน้อยกว่า}ซะอีก', 'เพราะคน[ระวังตัว]กันมากขึ้น'],
  cof1: ['แล้วทำไม ยังรู้สึกว่าซวย?', 'ลองนึกถึงตอน{กาแฟหก}'],
  cof2: ['หกวันศุกร์ 13 → {จำแม่นเลย}', 'หกวันอังคาร → [ลืมไปแล้ว]'],
  cof3: ['สมองชอบจำ{เรื่องที่ตรงกับที่เชื่อ}', 'เลยรู้สึกว่า ซวยทุกที', 'อคติยืนยันความเชื่อ (confirmation bias)'],
  cliff6: ['แต่ไม่ใช่ทุกประเทศ', 'จะกลัว{ศุกร์ 13} นะ'],
  w1: ['สเปน กรีซ ละตินอเมริกา', 'กลัว{“อังคาร 13”} แทน'],
  w3: ['อิตาลี กลัว{“ศุกร์ 17”}', 'เพราะ XVII สลับเป็น VIXI = [“ฉันเคยมีชีวิต”]'],
  w4: ['ส่วนไทยเรา{กลับกันเลย}', 'เพราะ “ศุกร์” ออกเสียงเหมือน [“สุข”]'],
  thai1: ['คนโบราณถึงกับ{ห้ามเผาศพวันศุกร์}', 'ไม่เอาความเศร้า [ไปใส่วันแห่งความสุข]'],
  thai2: ['จนมีคำโบราณว่า', '“{เผาผีวันศุกร์} ให้ทุกข์คนยัง”', 'คติโบราณไทย (ศิลปวัฒนธรรม, ไทยรัฐ) · ภาพจำลอง'],
  thai3: ['วันเดียวกัน ที่หนึ่งว่า<ซวย> อีกที่ว่า{สุข}', 'ความโชคร้าย จึงอยู่ใน[เรื่องที่เราเชื่อ]'],
  math1: ['แถมอีกนิด ในรอบ 400 ปี', 'วันที่ 13 ตรงกับ{วันศุกร์บ่อยสุด}', 'ปฏิทินเกรกอเรียน 4,800 เดือน: ศุกร์ 688 ครั้ง (วันอื่น 684–687)'],
  math2: ['ศุกร์ 13 ครั้งหน้า', '{13 ส.ค. 2570} ปีหน้ามีแค่ครั้งเดียว'],
  ask: ['คุณเชื่อแบบไหน?', '{1} ศุกร์ 13 ซวย   [2] ศุกร์ = สุข', 'คอมเมนต์เลข 1 หรือ 2 มาเลย'],
};
const caps = [{ t0: 0, t1: end('cover'), y: 420, instant: true, lines: [[150, ['ศุกร์ 13', P.gold]], [104, ['ทำไมทั้งโลกกลัว?', '#fff']], [62, ['แต่คนไทยว่า ศุกร์ = สุข', P.teal, 700]]] }];
for (const id in CAP) {
  const c = CAP[id], long1 = c[0].length > 26, long2 = c[1].length > 30;
  const lines = [[long1 ? 62 : 74].concat(segs(c[0])), [c[1].length < 14 ? 96 : long2 ? 56 : 66].concat(segs(c[1]))];
  caps.push({ t0: at(id) + 0.15, t1: end(id) - 0.05, y: CAPY, lines, foot: c[2] });
}
const CHAP = [['เลข 13', 'c12', 'cliff1'], ['วันศุกร์', 'fri1', 'cliff2'], ['จับผิด', 'tmp1', 'tmp3'], ['1868', 'ros1', 'ros5'], ['1907', 'law1', 'cliff5'], ['ผลจริง', 'tow1', 'cliff6'], ['ทั่วโลก', 'w1', 'thai3']];
/* year card per beat range: [first, last, big, small] */
const YEARS = [
  ['hook1', 'hook4', '13 พ.ย. 2569', 'วันนี้'], ['loki1', 'loki3', 'ตำนานนอร์ส', 'เรื่องเล่าโบราณ'], ['supper', 'supper2', 'ราว ค.ศ. 30', 'ตามพระคัมภีร์'],
  ['fri1', 'fri1', 'ราว ค.ศ. 30', 'ตามพระคัมภีร์'], ['fri2', 'fri3', 'ค.ศ. 1800s', 'ยุควิกตอเรีย'], ['tmp1', 'tmp3', 'ค.ศ. 1307', 'พ.ศ. 1850'],
  ['ros1', 'ros3', 'ค.ศ. 1868', 'พ.ศ. 2411'], ['ros4', 'ros4', 'ค.ศ. 1869', 'พ.ศ. 2412'], ['ros5', 'ros5', '1868 → 2026', '158 ปี'],
  ['law1', 'law3', 'ค.ศ. 1907', 'พ.ศ. 2450'], ['law4', 'law6', '13 ธ.ค. 1907', 'วันศุกร์'], ['movie', 'movie', 'ค.ศ. 1980', 'พ.ศ. 2523'], ['tow1', 'tow1', 'ค.ศ. 2002', 'พ.ศ. 2545'],
  ['road1', 'road3', 'ค.ศ. 2008', 'พ.ศ. 2551'], ['math2', 'math2', 'ปีหน้า', 'พ.ศ. 2570'],
];
const yearAt = (t) => { for (const y of YEARS) if (between(t, y[0], y[1])) return y; return null; };
/* Part B: models (low-poly chibi people, buildings, props) */
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

function buddha(s) { const b = chibi({ robe: '#f0b648', skin: '#f5cf6a', gold: true, halo: true, sash: '#e0a030', statue: true, closed: true }); setSit(b, true); lapHands(b); b.scale.setScalar(s || 1.35); return b; }

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
function bamboo() {
  const g = new T.Group();
  for (let i = 0; i < 6; i++) { const h = 3 + (i % 3) * 0.8, c = mk(new T.CylinderGeometry(0.06, 0.07, h, 5), '#6fae4a'); c.position.set(Math.cos(i * 2.1) * 0.35, h / 2, Math.sin(i * 2.1) * 0.35); c.rotation.z = (i % 2 ? 1 : -1) * 0.08; g.add(c); const lf = mk(new T.ConeGeometry(0.35, 0.9, 5), '#4f9a3c'); lf.position.set(c.position.x, h, c.position.z); g.add(lf); }
  return g;
}
function palace(col, o) {
  o = o || {}; const g = new T.Group(), gold = { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 };
  const base = mk(new T.BoxGeometry(5, 0.5, 4), '#f3efe6'); base.position.y = 0.25; g.add(base);
  for (let i = 0; i < 6; i++) { const p = mk(new T.CylinderGeometry(0.12, 0.12, 1.8, 6), '#fff6dc'); p.position.set(-2 + (i % 3) * 2, 1.4, i < 3 ? 1.6 : -1.6); g.add(p); }
  const hall = mk(new T.BoxGeometry(3.4, 1.8, 2.6), col || '#fbe9c2'); hall.position.y = 1.4; g.add(hall);
  let y = 2.3; for (let k = 0; k < 3; k++) { const r = mk(new T.ConeGeometry(2.9 - k * 0.75, 0.9, 4), P.gold, gold); r.rotation.y = Math.PI / 4; r.position.y = y + 0.45; r.scale.z = 0.8; g.add(r); y += 0.6; }
  const sp = mk(new T.ConeGeometry(0.18, 1.6, 6), P.gold, gold); sp.position.y = y + 0.9; g.add(sp);
  return g;
}
function cloud(s) { const g = new T.Group(); const m = M('#f4f6ff', { emissive: new T.Color('#9fb2ff'), emissiveIntensity: 0.25 }); [[0, 0, 0, 1.3], [1.3, -0.2, 0.2, 1], [-1.3, -0.25, 0.1, 1], [0.5, 0.4, -0.3, 0.9], [-0.6, 0.3, -0.4, 0.8]].forEach((q) => { const sp = new T.Mesh(new T.IcosahedronGeometry(q[3], 1), m); sp.position.set(q[0], q[1], q[2]); sp.scale.y = 0.6; g.add(sp); }); g.scale.setScalar(s || 1); return g; }
function stupa(s) {
  const g = new T.Group(); const base = mk(new T.CylinderGeometry(1.7, 1.8, 0.5, 16), '#c9b79a'); base.position.y = 0.25; g.add(base);
  const dome = mk(new T.SphereGeometry(1.45, 16, 10, 0, 6.283, 0, Math.PI / 2), '#d8c8a8'); dome.position.y = 0.5; g.add(dome);
  const hm = mk(new T.BoxGeometry(0.5, 0.35, 0.5), '#b9a888'); hm.position.y = 2.1; g.add(hm);
  const pole = mk(new T.CylinderGeometry(0.04, 0.04, 0.7, 5), '#8a7a60'); pole.position.y = 2.55; g.add(pole);
  const ch = mk(new T.CylinderGeometry(0.4, 0.4, 0.06, 10), '#b9a888'); ch.position.y = 2.75; g.add(ch);
  g.userData.dome = dome; g.scale.setScalar(s || 1); return g;
}
function mansion() {
  const g = new T.Group(); const c1 = '#e9dcc0', c2 = '#c98a4a';
  const f1 = mk(new T.BoxGeometry(4.6, 1.5, 3), c1); f1.position.y = 0.75; g.add(f1);
  const r1 = mk(new T.BoxGeometry(5.2, 0.18, 3.6), c2); r1.position.y = 1.6; g.add(r1);
  const f2 = mk(new T.BoxGeometry(3.6, 1.3, 2.4), c1); f2.position.y = 2.35; g.add(f2);
  const r2 = mk(new T.ConeGeometry(3.2, 1.2, 4), c2); r2.rotation.y = Math.PI / 4; r2.scale.z = 0.7; r2.position.y = 3.6; g.add(r2);
  for (let i = 0; i < 4; i++) { const w = mk(new T.BoxGeometry(0.5, 0.6, 0.05), '#5a3a22'); w.position.set(-1.5 + i, 0.8, 1.53); g.add(w); }
  for (let i = 0; i < 3; i++) { const w = mk(new T.BoxGeometry(0.45, 0.5, 0.05), '#5a3a22'); w.position.set(-1 + i, 2.4, 1.23); g.add(w); }
  return g;
}
function cart() {
  const g = new T.Group(); const bed = mk(new T.BoxGeometry(1.8, 0.25, 1.1), '#8a5a32'); bed.position.y = 0.75; g.add(bed);
  for (const z of [-0.62, 0.62]) { const w = mk(new T.CylinderGeometry(0.5, 0.5, 0.1, 10), '#5a3a1e'); w.rotation.x = Math.PI / 2; w.position.set(0, 0.5, z); g.add(w); }
  const shaft = mk(new T.BoxGeometry(1.6, 0.08, 0.08), '#5a3a1e'); shaft.position.set(1.6, 0.7, 0); g.add(shaft);
  const ox = new T.Group(); const ob = mk(new T.BoxGeometry(1.2, 0.7, 0.6), '#cfc6b8'); ob.position.y = 0.75; ox.add(ob);
  const oh = mk(new T.BoxGeometry(0.4, 0.4, 0.4), '#cfc6b8'); oh.position.set(0.75, 0.95, 0); ox.add(oh);
  for (const z of [-0.18, 0.18]) { const hn = mk(new T.ConeGeometry(0.05, 0.3, 4), '#f3efe6'); hn.position.set(0.8, 1.25, z); ox.add(hn); }
  for (const q of [[-0.4, -0.2], [-0.4, 0.2], [0.4, -0.2], [0.4, 0.2]]) { const l = mk(new T.CylinderGeometry(0.07, 0.07, 0.45, 5), '#bfb5a6'); l.position.set(q[0], 0.22, q[1]); ox.add(l); }
  ox.position.x = 2.6; g.add(ox); g.userData.ox = ox; return g;
}
function fire() { const g = new T.Group(); const f = new T.Mesh(new T.ConeGeometry(0.35, 0.9, 6), basic('#ffb347')); f.position.y = 0.45; const f2 = new T.Mesh(new T.ConeGeometry(0.2, 0.6, 6), basic('#fff0a0')); f2.position.y = 0.35; g.add(f, f2); for (let i = 0; i < 4; i++) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.9, 5), '#5a3a1e'); l.rotation.z = Math.PI / 2; l.rotation.y = i * 0.8; l.position.y = 0.06; g.add(l); } g.userData.f = f; return g; }
function softSprite(c, a) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: T.AdditiveBlending }));
}
function orb(c) { const g = new T.Group(); const core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), basic('#ffffff')); const gl = softSprite(c || 'rgba(190,170,255,1)'); gl.scale.setScalar(1.6); g.add(core, gl); return g; }
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }

/* ---------- ศุกร์ 13 models ---------- */
function ctex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h); const t = new T.CanvasTexture(c); t.anisotropy = 4; t.userData = { c, x }; return t; }
const KF = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function plane(w, h, tex, o) { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial(Object.assign({ map: tex, transparent: true, side: T.DoubleSide }, o || {}))); return m; }
function calTex(top, num, dow, col) {
  return ctex(512, 600, (x, w, h) => {
    x.fillStyle = '#fbf7ee'; x.fillRect(0, 0, w, h); x.fillStyle = col || P.coral; x.fillRect(0, 0, w, 150);
    for (let i = 0; i < 6; i++) { x.fillStyle = '#3a3f55'; x.beginPath(); x.arc(70 + i * 75, 30, 14, 0, 6.283); x.fill(); }
    x.fillStyle = '#fff'; x.font = KF(800, 70); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(top, w / 2, 98);
    x.fillStyle = '#1a1f3a'; x.font = KF(800, num.length > 2 ? 200 : 300); x.fillText(num, w / 2, 340);
    x.fillStyle = col || P.coral; x.font = KF(800, 80); x.fillText(dow, w / 2, 525);
  });
}
function calPad(s) {
  const g = new T.Group(); const base = mk(new T.BoxGeometry(2.3, 2.7, 0.35), '#3a3f55'); base.position.y = 1.35; g.add(base);
  const face = plane(2.1, 2.46, null, { transparent: false }); face.position.set(0, 1.33, 0.18); g.add(face);
  const flap = plane(2.1, 2.46, null, { transparent: true }); flap.geometry.translate(0, -1.23, 0); flap.position.set(0, 2.56, 0.19); g.add(flap);
  const legs = mk(new T.BoxGeometry(0.2, 1.4, 0.2), '#3a3f55'); legs.position.set(0, 0.6, -0.5); legs.rotation.x = -0.35; g.add(legs);
  g.userData = { face, flap }; g.scale.setScalar(s || 1); return g;
}
function catM() {
  const g = new T.Group(), c = '#1c1d26', ex = { roughness: 0.5 };
  const body = mk(new T.SphereGeometry(0.45, 10, 8), c, ex); body.scale.set(1.25, 0.85, 0.8); body.position.y = 0.42; g.add(body);
  const head = new T.Group(); head.position.set(0.55, 0.85, 0); g.add(head);
  head.add(mk(new T.SphereGeometry(0.3, 10, 8), c, ex));
  for (const z of [-0.15, 0.15]) { const e = mk(new T.ConeGeometry(0.1, 0.22, 4), c, ex); e.position.set(0, 0.3, z); head.add(e);
    const ey = new T.Mesh(new T.SphereGeometry(0.055, 8, 6), basic('#ffd84a')); ey.position.set(0.25, 0.05, z * 0.8); head.add(ey); }
  const tail = new T.Group(); tail.position.set(-0.55, 0.45, 0); g.add(tail);
  for (let i = 0; i < 5; i++) { const s = mk(new T.CylinderGeometry(0.06, 0.07, 0.22, 5), c); s.position.set(-0.05 * i, 0.18 * i, 0); s.rotation.z = 0.25 * i; tail.add(s); }
  for (const q of [[0.3, 0.2], [0.3, -0.2], [-0.3, 0.2], [-0.3, -0.2]]) { const l = mk(new T.CylinderGeometry(0.07, 0.07, 0.3, 5), c); l.position.set(q[0], 0.12, q[1]); g.add(l); }
  g.userData = { head, tail }; return g;
}
function liftTex(lit) {
  return ctex(256, 640, (x, w, h) => {
    x.fillStyle = '#c9ced8'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a92a6'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8);
    const L = ['15', '14', '12A', '12', '11', '10'];
    L.forEach((s, i) => { const y = 70 + i * 100, on = s === lit; x.fillStyle = on ? '#ffc94a' : '#eef1f6'; x.beginPath(); x.arc(w / 2, y, 40, 0, 6.283); x.fill(); x.strokeStyle = on ? '#b07800' : '#7a8296'; x.lineWidth = 5; x.stroke();
      x.fillStyle = s === '12A' ? '#d0304a' : '#1a1f3a'; x.font = KF(800, s.length > 2 ? 30 : 38); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, y + 2); });
  });
}
function block(txt, col, s) {
  const g = new T.Group(); s = s || 1; const b = mk(new T.BoxGeometry(s, s, s), col); b.position.y = s / 2; g.add(b);
  const tx = ctex(256, 256, (x, w, h) => { x.fillStyle = '#fff'; x.font = KF(800, txt.length > 2 ? 90 : 140); x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 14; x.strokeStyle = 'rgba(10,12,30,.6)'; x.strokeText(txt, 128, 136); x.fillText(txt, 128, 136); });
  const f = plane(s * 0.92, s * 0.92, tx); f.position.set(0, s / 2, s / 2 + 0.01); g.add(f); g.userData.box = b; return g;
}
function clockM() {
  const g = new T.Group();
  const tx = ctex(512, 512, (x, w, h) => { x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(256, 256, 250, 0, 6.283); x.fill(); x.fillStyle = '#1a1f3a'; x.font = KF(800, 58); x.textAlign = 'center'; x.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6; x.fillText(i, 256 + Math.sin(a) * 195, 256 - Math.cos(a) * 195); } });
  const rim = mk(new T.CylinderGeometry(2.3, 2.3, 0.4, 32), P.gold, GOLDM); rim.rotation.x = Math.PI / 2; g.add(rim);
  const face = new T.Mesh(new T.CircleGeometry(2.15, 40), new T.MeshBasicMaterial({ map: tx })); face.position.z = 0.21; g.add(face);
  const hh = mk(new T.BoxGeometry(0.14, 1.1, 0.05), '#1a1f3a'); hh.geometry.translate(0, 0.5, 0); hh.position.z = 0.26; g.add(hh);
  const mh = mk(new T.BoxGeometry(0.09, 1.65, 0.05), P.coral); mh.geometry.translate(0, 0.75, 0); mh.position.z = 0.29; g.add(mh);
  g.userData = { hh, mh }; return g;
}
function table(len, col) {
  const g = new T.Group(); const top = mk(new T.BoxGeometry(len, 0.14, 1.5), col || '#8a5a32'); top.position.y = 0.95; g.add(top);
  for (const x of [-len / 2 + 0.3, len / 2 - 0.3]) for (const z of [-0.55, 0.55]) { const l = mk(new T.BoxGeometry(0.14, 0.9, 0.14), '#5a3a1e'); l.position.set(x, 0.45, z); g.add(l); }
  const cloth = mk(new T.BoxGeometry(len + 0.1, 0.03, 1.2), '#f3efe6'); cloth.position.y = 1.03; g.add(cloth); return g;
}
function cup(c) { const m = mk(new T.CylinderGeometry(0.1, 0.08, 0.22, 8), c || P.gold, GOLDM); m.position.y = 0.11; return m; }
function gable(w, d, h, col) { const sh = new T.Shape([new T.Vector2(-w / 2, 0), new T.Vector2(w / 2, 0), new T.Vector2(0, h)]); const g = new T.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }); g.translate(0, 0, -d / 2); return mk(g, col); }
function chapel() {
  const g = new T.Group(); const w = mk(new T.BoxGeometry(3, 2.4, 4.4), '#efe6d2'); w.position.y = 1.2; g.add(w);
  const r = gable(3.4, 4.6, 1.6, '#7a4a3a'); r.position.y = 2.4; g.add(r);
  const tw = mk(new T.BoxGeometry(1.1, 4.4, 1.1), '#efe6d2'); tw.position.set(0, 2.2, 2.3); g.add(tw);
  const sp = mk(new T.ConeGeometry(0.85, 1.6, 4), '#7a4a3a'); sp.rotation.y = Math.PI / 4; sp.position.set(0, 5.2, 2.3); g.add(sp);
  const cv = mk(new T.BoxGeometry(0.12, 0.9, 0.12), P.gold, GOLDM); cv.position.set(0, 6.35, 2.3); g.add(cv); const ch = mk(new T.BoxGeometry(0.5, 0.12, 0.12), P.gold, GOLDM); ch.position.set(0, 6.5, 2.3); g.add(ch);
  const dr = mk(new T.BoxGeometry(0.7, 1.2, 0.06), '#5a3a22'); dr.position.set(0, 0.6, 2.87); g.add(dr);
  const win = new T.Mesh(new T.CircleGeometry(0.28, 12), basic('#ffd27a')); win.position.set(0, 3.2, 2.86); g.add(win);
  return g;
}
function sailShip(nm, len, o) {
  o = o || {}; const g = new T.Group(); const hull = mk(new T.BoxGeometry(len, 0.9, 1.6), o.hull || '#2a2f44'); hull.position.y = 0.45; g.add(hull);
  const bow = mk(new T.ConeGeometry(0.8, 1.4, 4), o.hull || '#2a2f44'); bow.rotation.z = -Math.PI / 2; bow.rotation.x = Math.PI / 4; bow.scale.set(1, 1, 0.56); bow.position.set(len / 2 + 0.6, 0.48, 0); g.add(bow);
  const deck = mk(new T.BoxGeometry(len, 0.08, 1.4), '#b98a5a'); deck.position.y = 0.93; g.add(deck);
  const stripe = mk(new T.BoxGeometry(len + 0.02, 0.12, 1.62), o.stripe || '#e8e2d0'); stripe.position.y = 0.7; g.add(stripe);
  const sails = [], masts = [];
  for (let i = 0; i < nm; i++) {
    const x = -len / 2 + 0.6 + i * (len - 1.2) / Math.max(1, nm - 1), mh = o.mh || 4.2;
    const m = mk(new T.CylinderGeometry(0.06, 0.08, mh, 5), '#6a4a2a'); m.position.set(x, 0.9 + mh / 2, 0); g.add(m); masts.push(m);
    const sg = new T.Shape([new T.Vector2(0, 0), new T.Vector2(-(o.sw || 1.3), 0), new T.Vector2(-(o.sw || 1.3) * 0.9, mh * 0.78), new T.Vector2(0, mh * 0.9)]);
    const s = new T.Mesh(new T.ShapeGeometry(sg), new T.MeshStandardMaterial({ color: '#f4f0e4', side: T.DoubleSide, flatShading: true })); s.position.set(x - 0.05, 1.2, 0); g.add(s); sails.push(s);
  }
  g.userData = { sails, masts, hull }; return g;
}
function crenWall(len, h, col) {
  const g = new T.Group(); const w = mk(new T.BoxGeometry(len, h, 1), col || '#a9a395'); w.position.y = h / 2; g.add(w);
  for (let x = -len / 2 + 0.3; x < len / 2; x += 0.8) { const c = mk(new T.BoxGeometry(0.45, 0.45, 1), col || '#a9a395'); c.position.set(x, h + 0.22, 0); g.add(c); }
  return g;
}
function towerC(r, h, col) { const g = new T.Group(); const c = mk(new T.CylinderGeometry(r, r * 1.08, h, 8), col || '#9a9486'); c.position.y = h / 2; g.add(c); const cone = mk(new T.ConeGeometry(r * 1.25, r * 1.6, 8), '#4a5a8a'); cone.position.y = h + r * 0.8; g.add(cone); return g; }
function crossTex(col) { return ctex(128, 128, (x) => { x.fillStyle = col; x.fillRect(52, 14, 24, 100); x.fillRect(22, 44, 84, 24); }); }
function knight(robe, crossCol) {
  const k = chibi({ robe: robe || '#f2f0ea', hair: '#9aa3b5', sleeve: '#9aa3b5' }); const t = crossTex(crossCol || '#c8102e');
  const p = plane(0.5, 0.5, t); p.position.set(0, 0.62, 0.47); p.rotation.x = -0.2; k.add(p); return k;
}
function parisHouse(w, floors, col) {
  const g = new T.Group(); const h = floors * 1.1; const b = mk(new T.BoxGeometry(w, h, 2.2), col || '#e9dcc4'); b.position.y = h / 2; g.add(b);
  const roof = mk(new T.CylinderGeometry(w * 0.52, w * 0.72, 1.2, 4), '#5b6787'); roof.rotation.y = Math.PI / 4; roof.scale.z = 2.2 / w; roof.position.y = h + 0.6; g.add(roof);
  for (let f = 0; f < floors; f++) for (let i = 0; i < Math.floor(w / 0.9); i++) { const wi = mk(new T.BoxGeometry(0.4, 0.62, 0.05), f === 0 ? '#5a3a22' : '#3d4a6a'); wi.position.set(-w / 2 + 0.55 + i * 0.9, 0.55 + f * 1.1, 1.12); g.add(wi);
    if (f > 0) { const bal = mk(new T.BoxGeometry(0.55, 0.06, 0.25), '#2a2f44'); bal.position.set(wi.position.x, 0.22 + f * 1.1, 1.22); g.add(bal); } }
  return g;
}
function piano() {
  const g = new T.Group(), c = '#15161e', ex = { roughness: 0.3, metalness: 0.2 };
  const sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(1.6, 0); sh.lineTo(1.6, 0.4); sh.bezierCurveTo(1.0, 0.6, 0.9, 1.6, 0.25, 1.9); sh.lineTo(0, 1.9); sh.lineTo(0, 0);
  const geo = new T.ExtrudeGeometry(sh, { depth: 0.4, bevelEnabled: false }); geo.rotateX(-Math.PI / 2); const body = mk(geo, c, ex); body.position.set(-0.8, 0.75, 0.95); g.add(body);
  const lid = mk(new T.ShapeGeometry(sh), c, ex); lid.rotation.x = -Math.PI / 2; lid.rotation.order = 'YXZ'; lid.position.set(-0.8, 1.16, 0.95); lid.rotation.z = 0; g.add(lid);
  const keys = mk(new T.BoxGeometry(1.5, 0.06, 0.3), '#f6f3ea'); keys.position.set(0, 0.95, 1.08); g.add(keys);
  for (const q of [[-0.6, 0.85], [0.6, 0.85], [-0.4, -0.7]]) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.75, 6), c); l.position.set(q[0], 0.37, q[1]); g.add(l); }
  return g;
}
function bookM(title, sub, col) {
  const g = new T.Group(); const b = mk(new T.BoxGeometry(1.5, 2.0, 0.3), col || '#7a1f2a'); b.position.y = 1.0; g.add(b);
  const tx = ctex(300, 400, (x, w, h) => { x.fillStyle = col || '#7a1f2a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#ffc94a'; x.lineWidth = 8; x.strokeRect(16, 16, w - 32, h - 32);
    x.fillStyle = '#ffe9a8'; x.textAlign = 'center'; x.textBaseline = 'middle'; const lines = title.split('|'); x.font = KF(800, 50); lines.forEach((s, i) => x.fillText(s, w / 2, 130 + i * 62)); if (sub) { x.font = KF(600, 26); x.fillText(sub, w / 2, 345); } });
  const f = plane(1.44, 1.94, tx, { transparent: false }); f.position.set(0, 1.0, 0.16); g.add(f); return g;
}
function exchange() {
  const g = new T.Group(); const st = mk(new T.BoxGeometry(7, 0.5, 3.2), '#e2dccb'); st.position.y = 0.25; g.add(st);
  for (let i = 0; i < 6; i++) { const c = mk(new T.CylinderGeometry(0.22, 0.25, 3.6, 10), '#f3efe2'); c.position.set(-2.75 + i * 1.1, 2.3, 1.1); g.add(c); }
  const back = mk(new T.BoxGeometry(6.6, 3.6, 1.4), '#d8d1bd'); back.position.set(0, 2.3, -0.2); g.add(back);
  const ent = mk(new T.BoxGeometry(7.2, 0.5, 3.0), '#e2dccb'); ent.position.set(0, 4.35, 0.1); g.add(ent);
  const ped = gable(7.2, 2.8, 1.3, '#efe9d8'); ped.position.set(0, 4.6, 0.1); g.add(ped); return g;
}
function rockM(s, c) { const m = mk(new T.DodecahedronGeometry(s, 0), c || '#4a4f5e'); m.scale.y = 0.6; return m; }
function lighthouse() { const g = new T.Group(); const t = mk(new T.CylinderGeometry(0.45, 0.7, 5, 10), '#e8e2d0'); t.position.y = 2.5; g.add(t); for (const y of [1.2, 3.2]) { const b = mk(new T.CylinderGeometry(0.62 - y * 0.04, 0.64 - y * 0.04, 0.5, 10), P.coral); b.position.y = y; g.add(b); }
  const lamp = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.6, 10), basic('#fff2b0')); lamp.position.y = 5.3; g.add(lamp); const cap = mk(new T.ConeGeometry(0.55, 0.6, 10), '#2a2f44'); cap.position.y = 5.9; g.add(cap);
  const beam = softSprite('rgba(255,240,170,1)', 0.8); beam.scale.set(3, 3, 1); beam.position.y = 5.3; g.add(beam); g.userData.beam = beam; return g; }
function carM(col) { const g = new T.Group(); const b = mk(new T.BoxGeometry(1.4, 0.45, 0.75), col); b.position.y = 0.38; g.add(b); const c = mk(new T.BoxGeometry(0.8, 0.38, 0.68), '#cfe3ff'); c.position.set(-0.1, 0.78, 0); g.add(c);
  for (const x of [-0.45, 0.45]) for (const z of [-0.38, 0.38]) { const w = mk(new T.CylinderGeometry(0.17, 0.17, 0.12, 10), '#1a1a22'); w.rotation.x = Math.PI / 2; w.position.set(x, 0.17, z); g.add(w); } return g; }
function deskM() { const g = new T.Group(); const top = mk(new T.BoxGeometry(2.4, 0.1, 1.2), '#c9a27a'); top.position.y = 1.0; g.add(top);
  for (const x of [-1.1, 1.1]) { const l = mk(new T.BoxGeometry(0.1, 1.0, 1.1), '#9a7a5a'); l.position.set(x, 0.5, 0); g.add(l); }
  const mon = mk(new T.BoxGeometry(1.0, 0.65, 0.06), '#22263a'); mon.position.set(-0.5, 1.5, -0.35); g.add(mon); const scr = new T.Mesh(new T.PlaneGeometry(0.9, 0.55), basic('#7fd8ff')); scr.position.set(-0.5, 1.5, -0.31); g.add(scr);
  const st = mk(new T.BoxGeometry(0.1, 0.35, 0.1), '#22263a'); st.position.set(-0.5, 1.15, -0.35); g.add(st); return g; }
function mugM() { const g = new T.Group(); const m = mk(new T.CylinderGeometry(0.16, 0.14, 0.34, 10), '#ffffff'); m.position.y = 0.17; g.add(m); const cf = new T.Mesh(new T.CircleGeometry(0.14, 10), basic('#6a3c1e')); cf.rotation.x = -Math.PI / 2; cf.position.y = 0.33; g.add(cf);
  const h = mk(new T.TorusGeometry(0.09, 0.03, 5, 10), '#ffffff'); h.position.set(0.18, 0.18, 0); g.add(h); return g; }
function meru() {
  const g = new T.Group(), W2 = '#f4f1ea', gold = { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 };
  const b1 = mk(new T.BoxGeometry(5, 0.6, 5), '#e6e0d2'); b1.position.y = 0.3; g.add(b1); const b2 = mk(new T.BoxGeometry(3.6, 2.2, 3.6), W2); b2.position.y = 1.7; g.add(b2);
  for (const s of [-1, 1]) for (const z of [-1, 1]) { const p = mk(new T.CylinderGeometry(0.16, 0.16, 2.2, 6), '#fffaf0'); p.position.set(s * 1.95, 1.7, z * 1.95); g.add(p); }
  let y = 2.8; for (let k = 0; k < 4; k++) { const r = mk(new T.ConeGeometry(2.8 - k * 0.55, 0.8, 4), k % 2 ? P.gold : '#c0392b', k % 2 ? gold : {}); r.rotation.y = Math.PI / 4; r.position.y = y + 0.4; g.add(r); y += 0.55; }
  const pr = mk(new T.ConeGeometry(0.55, 3.2, 8), P.gold, gold); pr.position.y = y + 1.5; g.add(pr);
  const ch = mk(new T.CylinderGeometry(0.28, 0.32, 4.8, 8), '#d8d2c4'); ch.position.set(0, 2.4, -2.9); g.add(ch);
  const dr = mk(new T.BoxGeometry(1.0, 1.4, 0.06), '#7a4a2a'); dr.position.set(0, 1.3, 1.82); g.add(dr); return g;
}
function signBoard(lines, w, h, bg, fg) {
  const g = new T.Group(); const tx = ctex(512, Math.round(512 * h / w), (x, W, H) => { x.fillStyle = bg || '#fbf7ee'; x.fillRect(0, 0, W, H); x.strokeStyle = '#7a4a2a'; x.lineWidth = 14; x.strokeRect(7, 7, W - 14, H - 14);
    x.fillStyle = fg || '#7a1f2a'; x.textAlign = 'center'; x.textBaseline = 'middle'; lines.forEach((l, i) => { x.font = KF(800, l[1]); x.fillText(l[0], W / 2, H * (i + 1) / (lines.length + 1)); }); });
  const p = plane(w, h, tx, { transparent: false }); p.position.y = 1.2 + h / 2; g.add(p);
  for (const s of [-1, 1]) { const l = mk(new T.BoxGeometry(0.1, 1.3, 0.1), '#7a4a2a'); l.position.set(s * w * 0.4, 0.65, -0.03); g.add(l); } return g;
}
function cinema() {
  const g = new T.Group(); const b = mk(new T.BoxGeometry(6, 4.4, 3), '#3d2a4f'); b.position.y = 2.2; g.add(b);
  const tx = ctex(768, 200, (x, w, h) => { x.fillStyle = '#fff6d8'; x.fillRect(0, 0, w, h); x.fillStyle = '#b0102a'; x.font = KF(800, 74); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIDAY THE 13TH', w / 2, 82); x.fillStyle = '#1a1f3a'; x.font = KF(700, 40); x.fillText('NOW SHOWING · 1980', w / 2, 158); });
  const mq = plane(5.2, 1.36, tx, { transparent: false }); mq.position.set(0, 3.0, 1.62); g.add(mq);
  const bulbs = []; for (let i = 0; i < 14; i++) { const bl = new T.Mesh(new T.SphereGeometry(0.08, 6, 4), basic('#ffe08a')); bl.position.set(-2.6 + i * 0.4, 3.8, 1.64); g.add(bl); bulbs.push(bl); const bl2 = bl.clone(); bl2.material = basic('#ffe08a'); bl2.position.y = 2.2; g.add(bl2); bulbs.push(bl2); }
  const dr = mk(new T.BoxGeometry(1.6, 1.6, 0.06), '#1a1222'); dr.position.set(0, 0.8, 1.52); g.add(dr); g.userData.bulbs = bulbs; return g;
}
function slabTex(txt, red) { return ctex(256, 96, (x, w, h) => { x.fillStyle = red ? '#ff5d73' : '#ffffff'; x.font = KF(800, 70); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 4); }); }
/* Part C: stations + setup */
const ST = {
  CAL: [0, 0, 0], CLK: [40, 0, 0], VAL: [80, 0, 0], SUP: [120, 0, 0], HAR: [160, 0, 0], TMP: [200, 0, 0], PAR: [240, 0, 0], WALL: [280, 0, 0],
  SEA: [330, 0, 0], CIN: [380, 0, 0], TOW: [420, 0, 0], ROAD: [460, 0, 0], OFF: [500, 0, 0], THA: [540, 0, 0], MAPC: [-1000, 0, 0], COV: [-2000, 0, 0],
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

  /* ---------- COV: night street cover ---------- */
  { const cg = mk(new T.BoxGeometry(60, 0.4, 50), '#20242e'); place(cg, 'COV', 0, -0.2, -10); scene.add(cg);
    const road = mk(new T.BoxGeometry(60, 0.05, 4), '#15171e'); place(road, 'COV', 0, 0.03, 1.8); scene.add(road);
    for (let i = 0; i < 12; i++) { const d = mk(new T.BoxGeometry(1.0, 0.02, 0.12), '#c9c3a8'); place(d, 'COV', -11 + i * 2, 0.07, 1.8); scene.add(d); }
    const walk2 = mk(new T.BoxGeometry(60, 0.18, 3), '#3a3e4a'); place(walk2, 'COV', 0, 0.09, -1.4); scene.add(walk2);
    const bld = [[-5.2, 4.2, 7.5, '#2a2c3a'], [-0.4, 5.2, 10, '#262838'], [4.8, 4.4, 8, '#2e2f3e']];
    s.covWin = [];
    bld.forEach((q, bi) => { const b = mk(new T.BoxGeometry(q[1], q[2], 3), q[3]); place(b, 'COV', q[0], q[2] / 2, -4.6); scene.add(b);
      for (let f = 0; f < Math.floor(q[2] / 1.4); f++) for (let k = 0; k < Math.floor(q[1] / 1.1); k++) { const lit = ((f * 7 + k * 3 + bi) % 5) === 0;
        const w = new T.Mesh(new T.PlaneGeometry(0.5, 0.7), basic(lit ? '#ffcf6a' : '#141622')); place(w, 'COV', q[0] - q[1] / 2 + 0.6 + k * 1.1, 0.9 + f * 1.4, -3.08); scene.add(w); if (lit) s.covWin.push(w); } });
    const t13 = ctex(512, 400, (x, w, h) => { x.shadowColor = '#ff2a3a'; x.shadowBlur = 40; x.fillStyle = '#ff4a5a'; x.font = KF(800, 330); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('13', w / 2, h / 2 + 20); x.shadowBlur = 0; x.fillStyle = '#ffd0d4'; x.font = KF(800, 300); x.fillText('13', w / 2, h / 2 + 20); });
    const sgn = plane(3.6, 2.8, t13); place(sgn, 'COV', -0.4, 3.5, -3.0); scene.add(sgn);
    const sglow = softSprite('rgba(255,40,60,1)', 0.7); sglow.scale.set(6.5, 5, 1); place(sglow, 'COV', -0.4, 3.5, -3.05); scene.add(sglow);
    const lad = new T.Group(); for (const x of [-0.35, 0.35]) { const r = mk(new T.BoxGeometry(0.1, 4.2, 0.1), '#8a6a3a'); r.position.set(x, 2.1, 0); lad.add(r); }
    for (let i = 0; i < 7; i++) { const r = mk(new T.BoxGeometry(0.7, 0.07, 0.07), '#8a6a3a'); r.position.set(0, 0.4 + i * 0.55, 0); lad.add(r); }
    lad.rotation.x = -0.32; place(lad, 'COV', -3.6, 0.18, -2.4); scene.add(lad);
    const lamp = new T.Group(); const lp = mk(new T.CylinderGeometry(0.08, 0.1, 4.4, 6), '#1a1c24'); lp.position.y = 2.2; lamp.add(lp); const lh = mk(new T.BoxGeometry(0.9, 0.12, 0.3), '#1a1c24'); lh.position.set(-0.4, 4.4, 0); lamp.add(lh);
    const bulb = new T.Mesh(new T.SphereGeometry(0.16, 8, 6), basic('#ffe2a0')); bulb.position.set(-0.75, 4.3, 0); lamp.add(bulb);
    const cone = new T.Mesh(new T.ConeGeometry(1.5, 4.2, 16, 1, true), new T.MeshBasicMaterial({ color: '#ffe2a0', transparent: true, opacity: 0.12, side: T.DoubleSide, depthWrite: false })); cone.position.set(-0.75, 2.2, 0); lamp.add(cone);
    place(lamp, 'COV', 3.4, 0.18, -1.2); scene.add(lamp);
    const pool = new T.Mesh(new T.CircleGeometry(1.5, 20), new T.MeshBasicMaterial({ color: '#ffe2a0', transparent: true, opacity: 0.18, depthWrite: false })); pool.rotation.x = -Math.PI / 2; place(pool, 'COV', 2.65, 0.2, -1.2); scene.add(pool);
    const shade = new T.Group(); { const c = '#07080d'; const body = mk(new T.CylinderGeometry(0.35, 0.75, 2.6, 10), c, { roughness: 1 }); body.position.y = 1.3; shade.add(body);
      const head = mk(new T.SphereGeometry(0.42, 10, 8), c, { roughness: 1 }); head.position.y = 2.85; shade.add(head); const hood = mk(new T.ConeGeometry(0.55, 0.9, 10), c, { roughness: 1 }); hood.position.y = 3.2; shade.add(hood);
      for (const x of [-0.14, 0.14]) { const e = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), basic('#ff2a3a')); e.position.set(x, 2.9, 0.38); shade.add(e); }
      const eg = softSprite('rgba(255,40,60,1)', 0.8); eg.scale.set(0.9, 0.45, 1); eg.position.set(0, 2.9, 0.42); shade.add(eg); }
    place(shade, 'COV', 2.5, 0.18, -1.5); shade.rotation.y = -0.25; scene.add(shade);
    const ccat = catM(); ccat.scale.setScalar(1.15); place(ccat, 'COV', -1.6, 0, 1.6); scene.add(ccat);
    const fogS = []; for (let i = 0; i < 6; i++) { const f = softSprite('rgba(150,160,200,1)', 0.18); f.scale.set(9, 3, 1); place(f, 'COV', -8 + i * 3.2, 0.9, 0.5 - (i % 2) * 2); scene.add(f); fogS.push(f); }
    s.cov = { sgn, sglow, ccat, shade, fogS }; }

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
/* Part D: camera, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { look, pos: [x + (sx || 0), ly + h, z + d], fov: 40 }; };
const SHOT = {
  cover: [[0, fr('COV', 0.3, 4.3, -0.5, 14.5, 0.5, 0)]], hook1: [[0, fr('CAL', 0, 3.4, 0, 11, 1.5, 0)]], hook2: [[0, fr('CAL', -1.8, 3.6, 0, 10, 1.8, -1.0)]],
  hook3: [[0, fr('CAL', 0, 3.6, 0, 13, 2.6, 0.8)]], hook4: [[0, fr('CAL', 1.9, 2.4, 1.0, 7.5, 1.6, 1.2)]],
  c12: [[0, fr('CLK', 0, 5.0, -1.0, 16.5, 2.4, 0)]], c13: [[0, fr('CLK', 0.8, 4.4, 0, 15.5, 3.4, 1)]],
  loki1: [[0, fr('VAL', 0, 2.3, -1.5, 12, 3.2, 0)]], loki2: [[0, fr('VAL', 3.0, 2.1, -1.4, 9.5, 2.6, 1.0)]], loki3: [[0, fr('VAL', 0.4, 2.1, -1.8, 8.2, 2.0, 0)]],
  supper: [[0, fr('SUP', 0, 2.0, -1.8, 8.8, 1.9, 0)]], supper2: [[0, fr('SUP', -1.2, 1.8, -1.8, 6.6, 1.6, -0.5)]], cliff1: [[0, fr('SUP', 0, 2.5, -1.5, 12, 3.2, 0)]],
  fri1: [[0, fr('HAR', -6, 4.8, -3.2, 12, 3.0, 0)]], fri2: [[0, fr('HAR', 3.8, 2.4, -1, 10.5, 3.0, 1)]], fri3: [[0, fr('HAR', -4.0, 2.5, -1.2, 8.6, 2.4, 0.5)]],
  cliff2: [[0, fr('HAR', 0, 3.4, -2, 17, 6.5, 0)]],
  tmp1: [[0, fr('TMP', 0, 2.6, -0.6, 12.5, 3.4, 0)]], tmp2: [[0, fr('TMP', -2.8, 2.1, 0.4, 8.0, 2.0, -0.6)]], tmp3: [[0, fr('TMP', 0, 3.2, -1, 14.5, 4.6, 0)]],
  ros1: [[0, mfr(PL.paris[0] - 4, PL.paris[1] - 6, 0.3, 20, 24, 0)], [1.8, mfr(PL.paris[0], PL.paris[1] + 0.6, 0.6, 6, 7.5, 0)]],
  ros2: [[0, fr('PAR', -0.5, 2.0, 0, 8.6, 2.4, 0)]], ros3: [[0, fr('PAR', 1.0, 2.1, 0, 9.6, 2.4, 0.6)]], ros4: [[0, fr('PAR', -3.4, 1.9, 0.7, 7.2, 2.2, 0)]], ros5: [[0, fr('PAR', 3.4, 2.0, -0.3, 7.4, 1.5, 0.4)]],
  law1: [[0, fr('WALL', -2.2, 2.3, 0.6, 9.2, 2.2, -0.6)]], law2: [[0, fr('WALL', 1.4, 2.5, 0.8, 10.5, 2.6, 0.8)]],
  law3: [[0, mfr(-70, 47, 0.3, 12, 15, 0)], [2.0, mfr(-14, 55, 0.3, 12, 15, 0)]], law4: [[0, fr('SEA', -1, 4.2, -3.5, 26, 4.4, 0)]], law5: [[0, fr('SEA', -2.4, 3.4, -3.2, 19, 3.2, 0)]], law6: [[0, fr('SEA', -2, 3.6, -3, 17, 4.2, 1)]],
  movie: [[0, fr('CIN', 0, 2.6, -0.5, 11.5, 2.4, 0)]], cliff5: [[0, fr('CIN', 0, 3.8, 0, 17, 5.5, 0)]],
  tow1: [[0, fr('TOW', 0.8, 12.6, -1, 18, 0.8, 0.6)]], tow2: [[0, fr('TOW', 0.6, 12.4, -1, 12, 0.6, 1.0)]], tow3: [[0, fr('TOW', 0, 1.8, 2.6, 8.5, 3.6, 0)]],
  road1: [[0, fr('ROAD', 0, 2.2, 0, 12.5, 3.8, 0)]], road2: [[0, fr('ROAD', 0, 3.4, -1.5, 12.5, 2.4, 0)]], road3: [[0, fr('ROAD', 0.6, 3.2, -1.0, 11.5, 2.4, 0.3)]],
  cof1: [[0, fr('OFF', 0.2, 2.0, -0.6, 7.2, 2.0, 0.5)]], cof2: [[0, fr('OFF', 0.2, 2.4, -0.6, 8.8, 2.4, 0)]], cof3: [[0, fr('OFF', 0, 2.8, -0.8, 10.5, 3.0, -0.6)]], cliff6: [[0, fr('OFF', 0, 3.2, -1, 14.5, 4.6, 0)]],
  w1: [[0, mfr(-84, 12, 0.3, 14, 17, 0)], [2.4, mfr(8, 36, 0.3, 14, 17, 0)]], w3: [[0, mfr(12.5, 40, 0.3, 8.5, 10.5, 0)]], w4: [[0, mfr(100.5, 12, 0.3, 10, 12.5, 0)]],
  thai1: [[0, fr('THA', -1.6, 3.6, -1.5, 15, 2.2, 0)]], thai2: [[0, fr('THA', 0.6, 2.4, 0.4, 7.6, 1.8, 0)]], thai3: [[0, fr('THA', 3.6, 1.8, 1.0, 7.2, 1.6, 0.4)]],
  math1: [[0, fr('CAL', 0, 2.4, 2.7, 11.5, 1.6, 0)]], math2: [[0, fr('CAL', 0, 3.1, 0, 9.4, 1.4, 0)]], recap: [[0, fr('CAL', 0, 3.4, 0, 15, 2.6, 0)]], ask: [[0, fr('CAL', 1.0, 2.9, 0.5, 10.5, 2.0, 0.8)]],
};
const CUT = new Set(['hook1', 'ros1', 'ros2', 'law3', 'law4', 'w1', 'thai1', 'math1']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.92);
      const cut = j === 0 ? CUT.has(id) : !!sg[2];
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1]) > 12; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.0 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

/* backgrounds + fog per place */
const BG = { night: ['#03050c', '#161a33'], world: ['#1d2b5c', '#5a7cbc'], map: ['#0f1630', '#1b2a55'], hall: ['#24130a', '#5a3214'], room: ['#2a2238', '#8a7258'], sea: ['#070b1c', '#18223e'], paris: ['#2a2050', '#b98068'], thai: ['#2a3a7a', '#e2a86a'], tow: ['#1a2a5c', '#7aa0d8'] };
const PLACE = (id) => {
  if (id === 'cover') return 'night';
  if (['ros1', 'law3', 'w1', 'w3', 'w4'].includes(id)) return 'map';
  if (id.startsWith('loki')) return 'hall'; if (id.startsWith('supper') || id === 'cliff1') return 'room';
  if (['law4', 'law5', 'law6'].includes(id)) return 'sea'; if (id.startsWith('ros')) return 'paris'; if (id.startsWith('thai')) return 'thai';
  if (id === 'tow1' || id === 'tow2') return 'tow'; return 'world';
};
const mixC = (a, b, k) => { const ca = new T.Color(a), cb = new T.Color(b); return '#' + ca.lerp(cb, k).getHexString(); };
function bgAt(t) {
  const id = beatAt(t), p = PLACE(id), i = ORDER.indexOf(id), prevId = ORDER[i - 1], pp = prevId ? PLACE(prevId) : p;
  if (pp === p || CUT.has(id)) return BG[p];
  const k = U.clamp((t - at(id)) / 1.2); return [mixC(BG[pp][0], BG[p][0], k), mixC(BG[pp][1], BG[p][1], k)];
}

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
let curFace = new Map();
function setFace(mesh, tex) { if (curFace.get(mesh) !== tex) { mesh.material.map = tex; mesh.material.needsUpdate = true; curFace.set(mesh, tex); } }
/* calendar flip: pages [[time, tex]] -> face shows latest, flap shows previous page lifting for 0.45 s */
function calFlip(cal, pages, r) {
  const u = cal.userData; let cur = pages[0][1], prev = null, k = 1;
  for (let i = 1; i < pages.length; i++) if (r >= pages[i][0]) { prev = pages[i - 1][1]; cur = pages[i][1]; k = U.clamp((r - pages[i][0]) / 0.45); }
  setFace(u.face, cur); if (prev && k < 1) { u.flap.visible = true; setFace(u.flap, prev); const e = k * k; u.flap.rotation.x = -k * 0.7; u.flap.rotation.z = k * 0.35; u.flap.position.set(k * 0.6, 2.56 - e * 2.6, 0.19 + k * 0.9); u.flap.material.opacity = 1 - U.clamp((k - 0.6) / 0.4); } else u.flap.visible = false;
}
function drawTick(tex, k, crash) {
  const x = tex.userData.x, w = 512, h = 320; x.fillStyle = '#10142a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 2;
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); }
  x.fillStyle = '#fff'; x.font = KF(800, 34); x.textAlign = 'left'; x.textBaseline = 'top'; x.fillText('WALL ST. · FRI 13', 18, 14);
  x.beginPath(); const n = 40; for (let i = 0; i <= n * k; i++) { const u = i / n, y = 150 + Math.sin(u * 17) * 14 - u * 30 + (crash ? Math.pow(Math.max(0, u - 0.55) / 0.45, 1.6) * 150 : 0); if (i === 0) x.moveTo(20 + u * 470, y); else x.lineTo(20 + u * 470, y); }
  x.strokeStyle = crash ? '#ff5d73' : '#2ee6c5'; x.lineWidth = 7; x.stroke(); tex.needsUpdate = true;
}

function update(t, s, { camera, W, H }) {
  BUB.length = 0;
  const id = beatAt(t), pl = PLACE(id);
  s.hemi.intensity = 0.95; s.sun.intensity = 0.9;
  const bg = bgAt(t); s.fog.color.set(mixC(bg[1], '#1a2240', 0.35));
  s.fog.near = pl === 'map' ? 300 : 40; s.fog.far = pl === 'map' ? 600 : 115;

  /* ----- CAL ----- */
  { const C = s.cal, u = C.cal.userData;
    if (inB(t, 'hook1')) calFlip(C.cal, [[0, s.tex.feb], [1.4, s.tex.mar], [2.8, s.tex.nov]], rel(t, 'hook1'));
    else if (t >= at('math2')) calFlip(C.cal, [[0, s.tex.nov], [0.9, s.tex.aug]], rel(t, 'math2'));
    else { setFace(u.face, s.tex.nov); u.flap.visible = false; }
    C.cat.userData.tail.rotation.z = Math.sin(t * 2.2) * 0.25; C.cat.userData.head.rotation.z = Math.sin(t * 1.3) * 0.08;
    C.cat.rotation.y = inB(t, 'hook4') ? U.lerp(-2.4, -1.3, U.easeIO(sm(0.3, 1.2, rel(t, 'hook4')))) : -2.4;
    const h2 = rel(t, 'hook2'); setFace(C.lift, inB(t, 'hook2') ? (h2 > 2.4 ? s.tex.lift['14'] : h2 > 0.7 ? s.tex.lift['12'] : s.tex.lift.idle) : s.tex.lift.idle);
    const w = C.worker; rest(w); w.userData.head.rotation.y = 0;
    if (inB(t, 'hook2')) { w.userData.head.rotation.y = h2 > 2.6 ? Math.sin(t * 9) * 0.45 : 0; if (h2 > 2.8) BUB.push({ o: w, dy: 2.3, txt: 'วันนี้ไม่บินดีกว่า…', c: '#fff' }); }
    if (inB(t, 'hook3')) { w.userData.arms.R.rotation.set(-2.2, 0, 0.3); w.userData.head.rotation.z = 0.25; }
    const pk = sm(1.6, dur('hook2') - 0.1, h2); vis(C.plane3, inB(t, 'hook2') && pk > 0 && pk < 1); setP(C.plane3, 'CAL', U.lerp(-14, 12, pk), 7.4 + pk * 1.5, -7); C.plane3.rotation.z = 0.15;
    const m1 = rel(t, 'math1'), showC = between(t, 'math1', 'math1');
    C.cards.forEach((p, i) => { const k = showC ? U.easeBack(sm(0.4 + i * 0.25, 0.8 + i * 0.25, m1)) : 0; const up = i === 4 && showC ? U.easeBack(sm(3.0, 3.6, m1)) : 0;
      p.visible = k > 0.01; p.scale.setScalar(Math.max(0.01, 0.8 * k * (1 + up * 0.25))); setP(p, 'CAL', -2.7 + i * 0.9, 0.62 + up * 0.5, 2.7); });
  }
  /* ----- COV ----- */
  if (t < end('cover') + 0.3) { const Cv = s.cov, fl = Math.sin(t * 37) > 0.93 ? 0.4 : 1; Cv.sgn.material.opacity = fl; Cv.sglow.material.opacity = 0.7 * fl;
    const ck = U.clamp(t / 2.4); setP(Cv.ccat, 'COV', U.lerp(-2.4, -0.8, ck), Math.abs(Math.sin(t * 7)) * 0.04, 1.6); Cv.ccat.rotation.y = 0.15; Cv.ccat.userData.tail.rotation.z = Math.sin(t * 2.5) * 0.3; Cv.ccat.userData.head.rotation.y = 0.6;
    Cv.fogS.forEach((f, i) => { f.position.x = ST.COV[0] - 8 + i * 3.2 + Math.sin(t * 0.4 + i) * 0.6; });
    Cv.shade.position.y = 0.18 + Math.sin(t * 1.5) * 0.03;
    if (pl === 'night') { const lf = t > 0.95 && t < 1.07 ? 1.4 : 0; s.hemi.intensity = 0.45 + lf; s.sun.intensity = 0.25 + lf * 0.4; } }
  /* ----- CLK ----- */
  { const K = s.clk; K.clk.userData.mh.rotation.z = -t * 1.1; K.clk.userData.hh.rotation.z = -t * 0.09 - 0.6;
    const on = between(t, 'c12', 'c13'), r1 = rel(t, 'c12'), r2 = rel(t, 'c13');
    K.months.forEach((b, i) => {
      if (i < 12) { const a = (-100 + i * (200 / 11)) * Math.PI / 180, k = on ? U.easeBack(sm(0.4 + i * 0.16, 0.7 + i * 0.16, r1 + (inB(t, 'c13') ? 99 : 0))) : 0;
        b.visible = k > 0.01; b.scale.setScalar(Math.max(0.01, k)); setP(b, 'CLK', Math.sin(a) * 3.6, 0, -1.5 + Math.cos(a) * 3.2); b.rotation.y = a; }
      else { const d = inB(t, 'c13') ? U.clamp((r2 - 0.5) / 0.6) : 0, land = d >= 1, push = U.easeIO(sm(1.8, 3.2, r2));
        b.visible = inB(t, 'c13') && r2 > 0.5; setP(b, 'CLK', U.lerp(0, 5.2, push), land ? Math.abs(Math.sin((r2 - 1.1) * 7)) * 0.25 * (1 - push) : (1 - d * d) * 6, 2.6); b.rotation.z = land ? Math.sin(r2 * 9) * 0.2 : 0; b.scale.setScalar(1.05); }
    }); }
  /* ----- VAL ----- */
  { const V = s.val, r2 = rel(t, 'loki2'), r3 = rel(t, 'loki3'), dim = inB(t, 'loki3') ? sm(1.4, 2.6, r3) : t >= end('loki3') ? 1 : 0;
    V.fire.userData.f.scale.y = (1 + Math.sin(t * 13) * 0.12) * (1 - dim * 0.5);
    const lokiIn = t >= at('loki2'), lk = U.easeIO(sm(0.3, 2.4, r2)); vis(V.loki, lokiIn && t < end('loki3'));
    setP(V.loki, 'VAL', inB(t, 'loki2') ? U.lerp(8.5, 4.4, lk) : 4.4, 0.2, -1.4); V.loki.rotation.y = -1.2; if (inB(t, 'loki2') && lk < 1) walk(V.loki, t, 1); else rest(V.loki);
    if (inB(t, 'loki2') && r2 > 2.4) { V.loki.userData.arms.R.rotation.set(0, 0, 2.4); BUB.push({ o: V.loki, dy: 2.0, txt: 'ขอร่วมงานด้วยคน~', c: '#fff' }); }
    V.gods.forEach((g, i) => { rest(g); const look = t >= at('loki2') + 1.2 && t < end('loki3') ? 0.9 : 0; g.userData.head.rotation.y = look + Math.sin(t * 1.5 + i) * 0.08;
      if (i === 6) { const fade = inB(t, 'loki3') ? sm(1.3, 3.8, r3) : t >= end('loki3') ? 1 : 0; g.visible = fade < 0.98; g.scale.setScalar(0.78 * Math.max(0.01, 1 - fade)); if (g.userData.ring) g.userData.ring.material.opacity = 0.85 * (1 - fade); }
      else if (inB(t, 'loki3') && r3 > 1.5) { g.userData.arms.L.rotation.set(-0.5, 0, -1.2); g.userData.arms.R.rotation.set(-0.5, 0, 1.2); } });
    if (inB(t, 'loki3')) V.gods[0].userData.arms.R.rotation.set(-1.4, 0, 0.2);
    const ak = sm(0.5, 1.3, r3), from = P3('VAL', -3.4, 1.45, -1.9), to = P3('VAL', 0.47, 1.3, -2.05);
    vis(V.arrow, inB(t, 'loki3') && ak > 0 && ak < 1); V.arrow.position.set(U.lerp(from[0], to[0], ak), U.lerp(from[1], to[1], ak) + Math.sin(ak * Math.PI) * 0.6, U.lerp(from[2], to[2], ak));
    V.motes.forEach((q, i) => { const u = inB(t, 'loki3') ? U.clamp((r3 - 1.4) / 2.6 - (i % 5) * 0.07) : 0; q.visible = u > 0 && u < 1; q.position.set(to[0] + Math.sin(i * 2.1) * 0.35, 1.0 + u * 4.2, to[2] + Math.cos(i * 1.3) * 0.3); q.material.opacity = 0.9 * (1 - u); });
    if (pl === 'hall') { s.hemi.intensity = 0.95 - dim * 0.4; s.sun.intensity = 0.9 - dim * 0.45; }
  }
  /* ----- SUP ----- */
  { const Sp = s.sup, r1 = rel(t, 'supper'), r2 = rel(t, 'supper2');
    Sp.thirteen.forEach((f, i) => { rest(f); f.userData.head.rotation.y = Math.sin(t * 1.2 + i * 1.7) * 0.12;
      const p = f.position; const nk = inB(t, 'supper') ? U.easeBack(sm(0.6 + i * 0.26, 0.85 + i * 0.26, r1)) * U.clamp((dur('supper') - r1) / 0.3) : 0;
      Sp.nums[i].visible = nk > 0.01; Sp.nums[i].scale.set(1.1 * nk, 1.1 * nk * 200 / 640, 1); Sp.nums[i].position.set(p.x, 1.85, p.z + 0.05);
      if (inB(t, 'supper2') || inB(t, 'cliff1')) { if (i !== 4) f.userData.head.rotation.y = (p.x < Sp.thirteen[4].position.x ? 0.7 : -0.7) * sm(0.8, 1.6, r2 + (inB(t, 'cliff1') ? 9 : 0)); } });
    const ju = Sp.thirteen[4], jk = inB(t, 'supper2') || inB(t, 'cliff1') ? sm(0.3, 1.0, r2 + (inB(t, 'cliff1') ? 9 : 0)) : 0;
    ju.userData.body.material.color.set(mixC('#9a7a5a', '#c84a5a', jk)); ju.rotation.y = -0.4 * jk; ju.userData.arms.R.rotation.set(-0.9 * jk, 0, 0.3);
    vis(Sp.bag, jk > 0.5); ju.userData.arms.R.userData.hand.getWorldPosition(Sp.bag.position); }
  /* ----- HAR ----- */
  if (between(t, 'fri1', 'cliff2')) { const Hh = s.har, pos = Hh.water.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.8 + t * 1.6) * 0.08 + Math.cos(y * 0.9 + t * 1.2) * 0.07); } pos.needsUpdate = true;
    Hh.ship.rotation.z = Math.sin(t * 1.1) * 0.04; Hh.ship.position.y = -0.25 + Math.sin(t * 1.4) * 0.06;
    const r2 = rel(t, 'fri2'); Hh.sailors.forEach((sl, i) => { rest(sl); sl.rotation.y = 0.2; if (inB(t, 'fri2') && r2 > 0.9) sl.userData.head.rotation.y = Math.sin(t * 8 + i) * 0.45; });
    if (inB(t, 'fri2') && r2 > 0.9) { Hh.sailors[1].userData.arms.L.rotation.set(-1.2, 0, 0.9); Hh.sailors[1].userData.arms.R.rotation.set(-1.2, 0, -0.9); BUB.push({ o: Hh.sailors[1], dy: 2.0, txt: 'วันศุกร์ ไม่ออกเรือ!', c: '#fff' }); }
    const r3 = rel(t, 'fri3'); calFlip(Hh.hcal, [[0, s.tex.fri], [2.0, s.tex.sat]], inB(t, 'fri3') ? r3 : t >= end('fri3') ? 9 : 0);
    const cw = t >= at('fri3'), wk = inB(t, 'fri3') ? U.easeIO(sm(0, 1.6, r3)) : 1; vis(Hh.bride, cw); vis(Hh.groom, cw);
    setP(Hh.bride, 'HAR', U.lerp(-8.5, -4.6, wk), 1.2, 0.5); setP(Hh.groom, 'HAR', U.lerp(-9.3, -5.4, wk), 1.2, 0.5); [Hh.bride, Hh.groom].forEach((c) => { if (wk < 1) { walk(c, t, 1); c.rotation.y = 1.2; } else { rest(c); c.rotation.y = 0.5; } });
    if (inB(t, 'fri3') && r3 > 2.4) { Hh.groom.userData.arms.R.rotation.set(-1.3, 0, -0.6); BUB.push({ o: Hh.groom, dy: 2.0, dx: -0.4, txt: 'เลื่อนเป็นวันเสาร์ดีกว่า', c: '#fff' }); }
  } else { s.har.hcal.userData.flap.visible = false; setFace(s.har.hcal.userData.face, s.tex.fri); s.har.bride.visible = s.har.groom.visible = false; }
  /* ----- TMP ----- */
  { const Tm = s.tmp, r1 = rel(t, 'tmp1'), gk = inB(t, 'tmp1') ? U.easeIO(sm(0.8, 3.0, r1)) : t >= end('tmp1') ? 1 : 0;
    setFace(Tm.tcal.userData.face, s.tex.c1307); Tm.tcal.userData.flap.visible = false;
    Tm.knights.forEach((k, i) => { rest(k); setP(k, 'TMP', -1.35 + i * 0.9, 0, 0.0); k.rotation.y = 0; if (gk > 0.95) { k.userData.arms.L.rotation.set(0, 0, -2.5); k.userData.arms.R.rotation.set(0, 0, 2.5); } });
    const GX = [-2.6, 2.6, -1.3, 1.3], GZ = [1.1, 1.1, 1.9, 1.9];
    Tm.guards.forEach((g, i) => { rest(g); const sx = 8 + i * 0.8; setP(g, 'TMP', U.lerp(sx, GX[i], gk), 0, U.lerp(2.6, GZ[i], gk)); g.rotation.y = gk < 1 ? -1.4 : Math.PI + (GX[i] < 0 ? -0.4 : 0.4); if (gk > 0 && gk < 1) walk(g, t, 1); g.userData.arms.R.rotation.set(-0.3, 0, 0.3); }); }
  /* ----- PAR ----- */
  { const Pp = s.par, r2 = rel(t, 'ros2'), r3 = rel(t, 'ros3'), r4 = rel(t, 'ros4'), r5 = rel(t, 'ros5');
    setFace(Pp.pcal.userData.face, s.tex.c1868); Pp.pcal.userData.flap.visible = false; setFace(Pp.pcal2.userData.face, s.tex.nov); Pp.pcal2.userData.flap.visible = false;
    const playing = inB(t, 'ros2') || (inB(t, 'ros3') && r3 < 1.0); const fade = inB(t, 'ros3') ? sm(1.6, 4.4, r3) : t >= end('ros3') ? 1 : 0;
    const ro = Pp.ross; lapHands(ro); if (playing) { ro.userData.arms.L.rotation.set(-1.0 + Math.sin(t * 11) * 0.15, 0, 0.3); ro.userData.arms.R.rotation.set(-1.0 + Math.cos(t * 13) * 0.15, 0, -0.3); ro.userData.head.rotation.z = Math.sin(t * 3) * 0.1; }
    ro.visible = fade < 0.98; ro.scale.setScalar(Math.max(0.01, 1 - fade));
    Pp.notes.forEach((n, i) => { const u = ((t * 0.5 + i / 6) % 1), on = playing; n.visible = on && t >= at('ros2'); n.position.set(ST.PAR[0] - 0.8 + Math.sin(i * 2.4 + u * 3) * 1.2, 1.8 + u * 3.2, 0.4); n.material.opacity = Math.sin(u * Math.PI); });
    Pp.pmotes.forEach((q, i) => { const u = inB(t, 'ros3') ? U.clamp((r3 - 1.6) / 2.8 - (i % 4) * 0.08) : 0; q.visible = u > 0 && u < 1; q.position.set(ST.PAR[0] + 0.15 + Math.sin(i * 2) * 0.35, 1.0 + u * 4, -0.4 + Math.cos(i) * 0.3); q.material.opacity = 0.9 * (1 - u); });
    const bi = Pp.bio; lapHands(bi); if (inB(t, 'ros4')) bi.userData.arms.R.rotation.set(-1.1 + Math.sin(t * 10) * 0.12, 0.2, -0.3);
    const bk = inB(t, 'ros4') ? U.easeBack(sm(1.2, 1.8, r4)) : t >= end('ros4') ? 1 : 0; Pp.book1.scale.setScalar(0.3 + 0.12 * bk); Pp.book1.position.y = 1.05 + 0.15 * bk;
    const c2 = inB(t, 'ros5') ? U.easeBack(sm(0.8, 1.4, r5)) : 0; Pp.pcal2.visible = c2 > 0.01; Pp.pcal2.scale.setScalar(0.8 * Math.max(0.01, c2)); }
  /* ----- WALL ----- */
  { const Wl = s.wall, r1 = rel(t, 'law1'), r2 = rel(t, 'law2');
    const bk = inB(t, 'law1') ? U.easeBack(sm(0.4, 1.1, r1)) : t >= end('law1') ? 1 : 0; Wl.bk.scale.setScalar(Math.max(0.01, bk)); Wl.bk.rotation.y = 0.35 + Math.sin(t * 0.8) * 0.08;
    rest(Wl.law); if (inB(t, 'law1') && r1 > 1.2) Wl.law.userData.arms.R.rotation.set(0, 0, 2.3);
    if (between(t, 'law1', 'law2')) drawTick(Wl.tick, inB(t, 'law1') ? 0.55 : U.lerp(0.55, 1, sm(0.3, 2.6, r2)), inB(t, 'law2'));
    Wl.brokers.forEach((b, i) => { rest(b); const panic = inB(t, 'law2') && r2 > 1.4; b.position.y = panic ? Math.abs(Math.sin(t * 8 + i)) * 0.25 : 0; b.rotation.y = panic ? Math.sin(t * 5 + i) * 0.6 : 0.3;
      if (panic) { b.userData.arms.L.rotation.set(0, 0, -2.4 - Math.sin(t * 9 + i) * 0.4); b.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 9 + i) * 0.4); } });
    if (inB(t, 'law2') && r2 > 2.0) BUB.push({ o: Wl.brokers[2], dy: 2.0, txt: 'ศุกร์ 13! ขายด่วน!', c: '#ffb3b3' }); }
  /* ----- SEA ----- */
  { const Se = s.sea, r4 = rel(t, 'law4'), r5 = rel(t, 'law5'), storm = inB(t, 'law5') ? 1 : inB(t, 'law4') ? sm(2.5, dur('law4'), r4) * 0.6 : inB(t, 'law6') ? 0.3 : 0;
    if (between(t, 'law4', 'law6')) { const pos = Se.sea.geometry.attributes.position, a = 0.12 + storm * 0.3;
      for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.6 + t * 2.2) * a + Math.cos(y * 0.7 + t * 1.7) * a * 0.8); } pos.needsUpdate = true;
      const rp = Se.rain.geometry.attributes.position, b = Se.rain.userData.base; for (let i = 0; i < rp.count; i++) { rp.setY(i, ((b[i * 3 + 1] - t * 11) % 14 + 14) % 14); rp.setX(i, b[i * 3] - ((b[i * 3 + 1] - t * 11) % 14) * 0.15 * storm); } rp.needsUpdate = true; }
    Se.rain.visible = between(t, 'law4', 'law6') && storm > 0.05; Se.rain.material.opacity = 0.25 + storm * 0.5;
    const arr = inB(t, 'law4') ? U.easeOut(sm(0, 3.6, r4)) : 1, drift = inB(t, 'law5') ? U.easeIO(sm(0.4, 3.0, r5)) : t >= end('law5') ? 1 : 0;
    const sx = U.lerp(9, 2.4, arr) - drift * 4.2, sz = -3.4 + drift * 0.6; setP(Se.sch, 'SEA', sx, 0.1 + Math.sin(t * 1.6) * 0.08 * (1 + storm * 2) - drift * 0.55, sz);
    Se.sch.rotation.y = -0.15; Se.sch.rotation.z = Math.sin(t * 1.3) * 0.04 * (1 + storm * 3) + drift * 0.38; Se.sch.rotation.x = drift * 0.12;
    Se.sch.userData.masts.forEach((m, i) => { const f = inB(t, 'law5') ? sm(3.0 + i * 0.15, 4.0 + i * 0.15, r5) : t >= end('law5') ? 1 : 0; m.rotation.z = f * (i % 2 ? 0.5 : -0.4); Se.sch.userData.sails[i].rotation.z = m.rotation.z; Se.sch.userData.sails[i].visible = f < 0.6; });
    Se.lh.userData.beam.material.opacity = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.6));
    const sv = inB(t, 'law5') ? sm(4.2, 4.8, r5) : t >= end('law5') ? 1 : 0; Se.surv.forEach((c, i) => { c.visible = sv > 0.02; c.scale.setScalar(0.55 * Math.max(0.01, sv)); setP(c, 'SEA', -3.3 + i * 0.6, 0.72, -2.7); rest(c); if (inB(t, 'law6')) c.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 6 + i) * 0.3); });
    if (pl === 'sea') { const fl = inB(t, 'law5') && ((r5 > 1.1 && r5 < 1.25) || (r5 > 3.2 && r5 < 3.32)) ? 1.6 : 0; s.hemi.intensity = 0.78 + fl; s.sun.intensity = 0.5 + fl * 0.5; } }
  /* ----- CIN ----- */
  { const Cn = s.cin; Cn.cn.userData.bulbs.forEach((b, i) => { b.material.color.set(((i + Math.floor(t * 4)) % 2) ? '#ffe08a' : '#7a6a3a'); });
    Cn.queue.forEach((q, i) => { const u = ((t * 0.18 + i / 6) % 1); setP(q, 'CIN', U.lerp(-4.5, 0, Math.min(1, u * 1.4)), 0, U.lerp(3.4, 0.4, sm(0.55, 1, u))); q.rotation.y = u < 0.7 ? 1.4 : 3.1; walk(q, t + i, 1); q.visible = u < 0.95; }); }
  /* ----- TOW ----- */
  { const Tw = s.tow, r1 = rel(t, 'tow1'), f13 = Tw.floors[12].userData;
    const swap = t >= at('tow1') + 1.6; setFace(f13.lp, swap ? f13.t12a : f13.t13); const pop = inB(t, 'tow1') ? 1 + 0.4 * Math.sin(Math.PI * sm(1.6, 2.1, r1)) : 1; f13.lp.scale.setScalar(pop);
    const ck = inB(t, 'tow1') ? U.easeIO(sm(2.4, 4.6, r1)) : t >= end('tow1') ? 1 : 0, y0 = 11 * 0.92, y1 = 13 * 0.92;
    setP(Tw.car, 'TOW', 2.2, U.lerp(y0, y1, ck) + 0.41, 0.85); setP(Tw.rider, 'TOW', 2.2, U.lerp(y0, y1, ck) + 0.02, 0.85); Tw.rider.rotation.y = 0;
    setFace(Tw.tlift, inB(t, 'tow1') ? (r1 > 4.6 ? s.tex.lift['14'] : r1 > 2.2 ? s.tex.lift['12'] : s.tex.lift.idle) : inB(t, 'tow2') ? s.tex.lift['12A'] : s.tex.lift.idle);
    const r3 = rel(t, 'tow3'); Tw.crowd.forEach((c, i) => { rest(c); c.rotation.y = Math.sin(i * 1.7) * 0.4; const wor = inB(t, 'tow3') && i % 4 === 1 && r3 > 1.2; if (wor) { c.userData.arms.L.rotation.set(-1.6, 0, 0.9); c.userData.arms.R.rotation.set(-1.6, 0, -0.9); c.position.x += Math.sin(t * 30) * 0.004; } });
    if (inB(t, 'tow3') && r3 > 2.0) BUB.push({ o: Tw.crowd[7], dy: 2.0, txt: 'วันนี้อยู่บ้านดีกว่า', c: '#fff' }); }
  /* ----- ROAD ----- */
  { const R = s.road, r2 = rel(t, 'road2');
    R.cars.forEach((c, i) => { const dir = i % 2 ? -1 : 1, x = ((t * 5 * dir + i * 7.3) % 40 + 40) % 40 - 20; setP(c, 'ROAD', x, 0.05, i % 2 ? 1.3 : 2.7); c.rotation.y = dir > 0 ? 0 : Math.PI; });
    const ka = inB(t, 'road2') ? U.easeBack(sm(0.5, 1.4, r2)) : t >= end('road2') ? 1 : 0, kb = inB(t, 'road2') ? U.easeBack(sm(1.8, 2.7, r2)) : t >= end('road2') ? 1 : 0, Hh = 3.0;
    R.barA.scale.y = Math.max(0.01, ka * Hh); R.barB.scale.y = Math.max(0.01, kb * Hh * 7500 / 7800); R.barA.visible = ka > 0.01; R.barB.visible = kb > 0.01;
    R.bla.visible = ka > 0.5; R.blb.visible = kb > 0.5; R.bla.position.set(R.barA.position.x, Hh + 0.9, -2.2); R.blb.position.set(R.barB.position.x, Hh * 7500 / 7800 + 0.9, -2.2);
    rest(R.ana); R.ana.userData.arms.R.rotation.set(-1.2, 0, 0.2); if (inB(t, 'road3')) R.ana.userData.head.rotation.x = Math.sin(t * 6) * 0.15; }
  /* ----- OFF ----- */
  { const O = s.off, r1 = rel(t, 'cof1'), sp = inB(t, 'cof1') ? U.easeIO(sm(1.2, 1.6, r1)) : t >= end('cof1') ? 1 : 0;
    setP(O.mug, 'OFF', 0.5 + sp * 0.25, 1.05 - sp * 0.0, -1.0); O.mug.rotation.z = -sp * 1.45;
    const pk = inB(t, 'cof1') ? sm(1.5, 2.6, r1) : t >= end('cof1') ? 1 : 0; O.puddle.visible = pk > 0.01; O.puddle.scale.setScalar(Math.max(0.01, pk)); setP(O.puddle, 'OFF', 0.9, 1.06, -0.95);
    const ow = O.ow; lapHands(ow); if (t >= at('cof1') + 1.4 && t < end('cof3')) { ow.userData.arms.L.rotation.set(0, 0, -2.5); ow.userData.arms.R.rotation.set(0, 0, 2.5); ow.userData.head.rotation.x = -0.2; }
    if (inB(t, 'cof1') && r1 > 1.8) BUB.push({ o: ow, dy: 2.0, txt: 'ซวยจริง! ศุกร์ 13', c: '#ffb3b3' }); }
  /* ----- THA ----- */
  { const Th = s.tha, r3 = rel(t, 'thai3'), r1 = rel(t, 'thai1');
    const sg = inB(t, 'thai1') ? U.easeBack(sm(0.8, 1.4, r1)) : t >= end('thai1') ? 1 : 0; Th.sign.scale.setScalar(Math.max(0.01, sg)); Th.sign.visible = sg > 0.01;
    Th.fam.forEach((f, i) => { rest(f); f.rotation.y = -0.3; const joy = inB(t, 'thai3') && r3 > 0.8; if (joy) { f.position.y = Math.abs(Math.sin(t * 6 + i)) * (i === 2 ? 0.3 : 0.12); f.userData.arms.L.rotation.set(0, 0, -2.3); f.userData.arms.R.rotation.set(0, 0, 2.3); } else f.position.y = 0; });
    Th.spark.forEach((q, i) => { const u = inB(t, 'thai3') ? ((r3 * 0.35 + i / 16) % 1) : 0; q.visible = inB(t, 'thai3') && r3 > 0.6; setP(q, 'THA', 4.3 + Math.sin(i * 2.3) * 1.8, 0.4 + u * 3.6, 1.2 + Math.cos(i * 1.7) * 0.8); q.material.opacity = Math.sin(u * Math.PI) * 0.9; }); }
  /* ----- MAP ----- */
  { const Mp = s.map, mon = pl === 'map';
    const hl = (name) => { const c = []; if (between(t, 'ros1', 'ros1') && name === 'France') c.push(P.gold); if (inB(t, 'law3') && HL.route.has(name)) c.push(P.teal);
      if (t >= at('w1') && t < end('w4')) { if (HL.tue.has(name)) c.push(P.coral); if (t >= at('w3') && name === 'Italy') c.push(P.violet); if (t >= at('w4') && name === 'Thailand') c.push(P.gold); } return c[c.length - 1]; };
    if (mon) for (const nm in Mp.reg.meshes) { const m = Mp.reg.meshes[nm], c = hl(nm); if (c) m.material.color.set(c); else m.material.color.copy(m.userData.base); m.scale.z = c ? 0.5 : 0.12; }
    const pin = (k, on, t0) => { const p = Mp.pins[k], kk = on ? U.easeBack(sm(t0, t0 + 0.4, t)) : 0; p.visible = kk > 0.01; p.scale.setScalar(Math.max(0.01, kk)); };
    pin('paris', inB(t, 'ros1'), at('ros1', 1.4)); pin('phil', inB(t, 'law3'), at('law3', 0.3)); pin('scilly', inB(t, 'law3'), at('law3', 3.8));
    pin('mexico', inB(t, 'w1'), at('w1', 0.5)); pin('madrid', inB(t, 'w1'), at('w1', 2.9)); pin('athens', inB(t, 'w1'), at('w1', 3.4)); pin('rome', inB(t, 'w3'), at('w3', 0.4)); pin('bkk', inB(t, 'w4'), at('w4', 1.6));
    const rk = inB(t, 'law3') ? U.clamp((rel(t, 'law3') - 0.4) / 3.6) : 0; Mp.rl.visible = false; Mp.dots.forEach((d, i) => { d.visible = inB(t, 'law3') && i / 60 <= rk; });
    Mp.mship.visible = inB(t, 'law3'); const ip = Math.min(59, Math.floor(rk * 60)), fk = rk * 60 - ip, a = Mp.rpts[ip], b = Mp.rpts[ip + 1]; Mp.mship.position.set(U.lerp(a.x, b.x, fk), 0.3, U.lerp(a.z, b.z, fk)); Mp.mship.rotation.y = Math.atan2(-(b.z - a.z), b.x - a.x); }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
}
/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = 40; g.font = F(700, px); const w = g.measureText(b.txt).width + 48, h = 74;
  let x = U.clamp(b.x - w / 2, 70, 1010 - w), y = Math.max(820, b.y - h - 26);
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
function yearPill(g, t, y0) {
  const y = yearAt(t); if (!y) return; const a = U.clamp((t - at(y[0])) / 0.3 + (ORDER.indexOf(beatAt(t)) > ORDER.indexOf(y[0]) ? 1 : 0));
  g.save(); g.globalAlpha = a; g.font = F(800, 46); const w1 = g.measureText(y[2]).width; g.font = F(500, 28); const w2 = g.measureText(y[3]).width; const w = w1 + w2 + 90, x = 540 - w / 2;
  g.fillStyle = 'rgba(15,22,48,.82)'; rr(g, x, y0, w, 70, 35); g.fill(); g.strokeStyle = P.gold; g.lineWidth = 3; g.stroke();
  g.fillStyle = P.gold; g.textAlign = 'left'; g.textBaseline = 'middle'; g.font = F(800, 46); g.fillText(y[2], x + 34, y0 + 37); g.fillStyle = '#fff'; g.font = F(500, 28); g.fillText(y[3], x + 34 + w1 + 22, y0 + 39); g.restore();
}
function dots(g, label, n, cur, col, y) {
  g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * 70; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += 70; }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function stamp(g, t) {
  const r = rel(t, 'tmp3'), k = U.clamp((r - 0.9) / 0.18); if (k <= 0) return; const sc = 1.6 - 0.6 * k;
  g.save(); g.globalAlpha = Math.min(1, k * 1.5) * U.clamp((dur('tmp3') - r) / 0.3); g.translate(540, 1080); g.rotate(-0.12); g.scale(sc, sc);
  g.strokeStyle = '#ff5d73'; g.lineWidth = 12; rr(g, -330, -80, 660, 160, 22); g.stroke(); g.fillStyle = 'rgba(255,93,115,.14)'; g.fill();
  g.fillStyle = '#ff5d73'; g.font = F(800, 92); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ตำนานยุคหลัง', 0, 6); g.restore();
}
function newspaper(g, t) {
  const r = rel(t, 'law6'), k = U.easeBack(U.clamp((r - 0.4) / 0.5)); if (k <= 0) return; const a = U.clamp((dur('law6') - r) / 0.3);
  g.save(); g.globalAlpha = a; g.translate(540, 1110); g.rotate(-0.06 * (1 - k) + 0.035); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k);
  g.fillStyle = '#f1ead8'; g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 24; g.fillRect(-380, -230, 760, 460); g.shadowColor = 'transparent';
  g.fillStyle = '#2a2a2a'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '700 30px Georgia,serif'; g.fillText('— THE NEWS —   DECEMBER 15, 1907', 0, -190);
  g.fillRect(-350, -165, 700, 4); g.font = '800 58px Georgia,serif'; g.fillText('SEVEN-MASTER', 0, -105); g.fillText('WRECKED', 0, -40);
  g.font = 'italic 600 38px Georgia,serif'; g.fillStyle = '#7a1f2a'; g.fillText('…on “Friday, the 13th”', 0, 30);
  g.fillStyle = 'rgba(42,42,42,.35)'; for (let i = 0; i < 4; i++) { g.fillRect(-340, 90 + i * 26, 320, 10); g.fillRect(20, 90 + i * 26, 320, 10); }
  g.restore(); g.save(); g.globalAlpha = a * 0.85; g.font = F(400, 26); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ภาพจำลอง · สำนวนตาม The Baltimore Sun 15 ธ.ค. 1907', 540, 1375); g.restore();
}
function memCards(g, t) {
  const r = rel(t, 'cof2'), A = U.clamp((dur('cof2') - r) / 0.3);
  const card = (x, k, title, gold, fade) => { if (k <= 0) return; g.save(); g.globalAlpha = A * (1 - fade * 0.8); g.translate(x, 1070); g.rotate(gold ? -0.06 : 0.06); g.scale(k * (1 - fade * 0.25), k * (1 - fade * 0.25));
    g.fillStyle = '#fbf7ee'; g.shadowColor = gold ? 'rgba(255,201,74,.9)' : 'rgba(0,0,0,.4)'; g.shadowBlur = gold ? 40 : 16; g.fillRect(-170, -190, 340, 380); g.shadowColor = 'transparent';
    g.fillStyle = gold ? '#2a3a6a' : '#6a6f80'; g.fillRect(-145, -165, 290, 250);
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(-20, 20, 50, 16, 0, 0, 6.283); g.fill(); g.fillStyle = '#6a3c1e'; g.beginPath(); g.ellipse(40, 50, 80, 22, 0, 0, 6.283); g.fill();
    g.fillStyle = '#fff'; g.save(); g.translate(-20, -10); g.rotate(-1.3); g.fillRect(-35, -40, 70, 80); g.restore();
    g.fillStyle = gold ? '#b07800' : '#4a4f60'; g.font = F(800, 52); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(title, 0, 140); g.restore(); };
  card(300, U.easeBack(U.clamp((r - 0.3) / 0.4)), 'ศุกร์ 13', true, 0);
  card(780, U.easeBack(U.clamp((r - 1.6) / 0.4)), 'อังคาร', false, U.clamp((r - 2.8) / 1.0));
}
function vixi(g, t) {
  const r = rel(t, 'w3'), k = U.easeIO(U.clamp((r - 1.8) / 1.0)), a = U.clamp(r / 0.3) * U.clamp((dur('w3') - r) / 0.3); if (a <= 0) return;
  const L0 = ['X', 'V', 'I', 'I'], to = [2, 0, 1, 3], sp = 110, x0 = 540 - 1.5 * sp;
  g.save(); g.globalAlpha = a; panel(g, 300, 375, 480, 130, 1);
  L0.forEach((ch, i) => { const x = U.lerp(x0 + i * sp, x0 + to[i] * sp, k), y = 440 - Math.sin(k * Math.PI) * (i % 2 ? 40 : -40); txt(g, ch, x, y, 96, k > 0.99 ? P.coral : '#fff', 800); });
  g.restore();
}
function towers(g, t) {
  const r = rel(t, 'tow1'), a = U.clamp((r - 0.4) / 0.3) * U.clamp((dur('tow1') - r) / 0.3); if (a <= 0) return;
  g.save(); g.globalAlpha = a; const n = 20, w = 34, gap = 9, x0 = 540 - (n * w + (n - 1) * gap) / 2;
  for (let i = 0; i < n; i++) { const on = i < 17 && r > 1.4 + i * 0.12; g.fillStyle = on ? P.coral : 'rgba(255,255,255,.75)'; rr(g, x0 + i * (w + gap), 395, w, 70, 6); g.fill();
    g.fillStyle = 'rgba(15,22,48,.55)'; for (let j = 0; j < 3; j++) g.fillRect(x0 + i * (w + gap) + 8, 405 + j * 20, w - 16, 8); }
  g.font = F(600, 24); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ตึก 20 แห่ง → 17 แห่งไม่มีชั้นชื่อ 13 (ภาพประกอบสัดส่วน 85%)', 540, 490); g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'ศุกร์ 13 มาจากไหน', 540, 450, 72, P.gold, 800);
  const rows = ['เลข 13 = ตัวเกินจาก 12 · โลกิ · มื้อสุดท้าย', 'วันศุกร์ = วันตรึงกางเขน · ชาวเรือไม่ออกเรือ', 'เทมพลาร์ 1307 = ตำนานแต่งทีหลัง', '1869 รอสซีนี → 1907 นิยาย+เรือ → 1980 หนัง', 'อุบัติเหตุจริงน้อยกว่า · ไทย: ศุกร์ = สุข'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 4 ? P.gold : P.teal; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: H. S. Edwards (1869) · The Baltimore Sun (1907) · Otis (2002) · Gallup/Phobia Inst.', 540, 1360);
  g.fillText('Dutch CVS (2008) · ไทยรัฐ · ศิลปวัฒนธรรม · ภาพจำลองประกอบ', 540, 1398);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (between(t, 'law4', 'law6')) { g.fillStyle = 'rgba(5,8,20,0.18)'; g.fillRect(0, 0, W, H); }
  if (id.startsWith('ros') && id !== 'ros1' || id.startsWith('tmp')) { g.fillStyle = 'rgba(120,80,30,0.10)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('c12') && t < end('thai3')) chapter(g, t);
  if (!inB(t, 'w3') && !inB(t, 'recap')) yearPill(g, t, 300);
  if (inB(t, 'hook1')) { const r = rel(t, 'hook1'); dots(g, 'ศุกร์ 13 ปีนี้', 3, r > 2.8 ? 3 : r > 1.4 ? 2 : 1, P.gold, 430); }
  if (inB(t, 'tmp3')) stamp(g, t);
  if (inB(t, 'law6')) newspaper(g, t);
  if (inB(t, 'cof2')) memCards(g, t);
  if (inB(t, 'w3')) vixi(g, t);
  if (inB(t, 'tow1')) towers(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('piano', (tt) => { [60, 64, 67, 72, 67, 64, 62, 65, 69, 74, 69, 65].forEach((n, i) => VE.audio.tone(tt + i * 0.22, VE.midiHz(n + 12), 0.4, { type: 'triangle', vol: 0.03, att: 0.01, rel: 0.35 })); });
VE.registerSfx('shipbell', (tt) => { VE.audio.tone(tt, 1046, 0.6, { vol: 0.035, rel: 0.5 }); VE.audio.tone(tt + 0.35, 1046, 0.6, { vol: 0.03, rel: 0.5 }); });
VE.registerSfx('stamp', (tt) => { VE.audio.tone(tt, 330, 0.12, { type: 'triangle', vol: 0.05, rel: 0.1 }); VE.audio.noise(tt, 0.12, { type: 'bandpass', f: 900, q: 0.8, vol: 0.04 }); });
VE.registerSfx('paper', (tt) => VE.audio.noise(tt, 0.35, { type: 'highpass', f: 2500, vol: 0.03, att: 0.05 }));
VE.registerSfx('flip', (tt) => VE.audio.noise(tt, 0.18, { type: 'bandpass', f: 1800, q: 1.2, vol: 0.035 }));
VE.registerSfx('meow', (tt) => VE.audio.tone(tt, 880, 0.35, { type: 'sine', f2: 620, vol: 0.025, att: 0.05, rel: 0.2 }));
const AUD = [[at('hook1', 1.4), 'flip'], [at('hook1', 2.8), 'flip'], [at('hook1', 2.9), 'bell'], [at('hook2', 0.7), 'tok'], [at('hook2', 2.4), 'tok'], [at('hook4', 0.6), 'meow'],
  [at('c13', 1.1), 'pop'], [at('c13', 1.9), 'glide'], [at('loki2', 2.4), 'pop'], [at('loki3', 0.5), 'glide', { dur: 0.6 }], [at('loki3', 1.4), 'soft'],
  [at('supper2', 0.4), 'soft'], [at('fri1', 0.6), 'bell'], [at('fri2', 0.3), 'water', { dur: 3 }], [at('fri2', 0.6), 'shipbell'], [at('fri3', 2.0), 'flip'], [at('fri3', 2.4), 'pop'],
  [at('tmp1', 1.0), 'tok'], [at('tmp1', 1.6), 'tok'], [at('tmp3', 0.9), 'stamp'], [at('ros1', 1.4), 'pop'], [at('ros2', 0.2), 'piano'], [at('ros2', 2.8), 'piano'], [at('ros3', 1.6), 'soft'],
  [at('ros4', 1.2), 'paper'], [at('ros5', 0.8), 'chime'], [at('ros5', 1.0), 'shimmer'], [at('law1', 0.4), 'pop'], [at('law2', 1.4), 'soft'], [at('law3', 0.3), 'pop'], [at('law3', 3.8), 'pop'],
  [at('law4', 0.2), 'water', { dur: 4 }], [at('law4', 2.5), 'shipbell'], [at('law5', 0.1), 'rain', { dur: 5.4 }], [at('law5', 0.3), 'roar', { dur: 4 }], [at('law5', 2.9), 'splash'], [at('law6', 0.4), 'paper'],
  [at('movie', 0.4), 'bell'], [at('tow1', 1.6), 'pop'], [at('tow1', 4.6), 'bell'], [at('tow2', 0.6), 'bell'], [at('road2', 0.5), 'soft'], [at('road2', 1.8), 'soft'], [at('road3', 0.4), 'chime'],
  [at('cof1', 1.2), 'splash'], [at('cof2', 0.3), 'pop'], [at('cof2', 1.6), 'pop'], [at('w1', 0.5), 'pop'], [at('w1', 2.9), 'pop'], [at('w1', 3.4), 'pop'], [at('w3', 0.4), 'pop'], [at('w3', 1.8), 'glide', { dur: 0.6 }],
  [at('w4', 1.6), 'chime'], [at('w4', 1.8), 'shimmer'], [at('thai1', 0.8), 'pop'], [at('thai3', 0.8), 'chime'], [at('thai3', 1.0), 'shimmer'], [at('math2', 0.9), 'flip'], [at('math2', 1.0), 'bell'], [at('ask', 0.3), 'bell']];
for (let i = 0; i < 12; i++) AUD.push([at('c12', 0.4 + i * 0.16), 'tok']);
for (let i = 0; i < 13; i++) AUD.push([at('supper', 0.6 + i * 0.26), 'tok']);
for (let i = 0; i < 7; i++) AUD.push([at('math1', 0.4 + i * 0.25), 'tok']); AUD.push([at('math1', 3.0), 'chime']);
for (let i = 0; i < 5; i++) AUD.push([at('recap', 0.5 + i * 0.7), 'tok']);
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 12) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'friday-13-youtube' : 'friday-13', title: 'ศุกร์ 13 มาจากไหน',
  brand: { name: 'RuNgee รู้งี้', series: 'ย้อนเวลา', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => inB(t, 'loki3') || inB(t, 'ros3') || between(t, 'law4', 'law6'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
})();
