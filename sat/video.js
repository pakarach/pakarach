(function () {
/* ภพภูมิสัตว์ — พุทธวิธี (story, long). Part A: beats, captions, tags, chapters, gauge. */
const T = THREE, P = FK.pal, U = VE.u, L = FK.land();
const BEATS = [
  ['cover', 2.0], ['h1', 4.8], ['h2', 4.6], ['h3', 4.4],
  ['l0', 5.0], ['l1', 4.8], ['l2', 5.2], ['l3', 4.8], ['l4', 4.8], ['l5', 5.4], ['l6', 5.6], ['l7', 4.6],
  ['p1', 5.6], ['p2', 5.0], ['p3', 5.0], ['p4', 5.0], ['p5', 5.2], ['p6', 5.6], ['p7', 6.2], ['p8', 6.0], ['p9', 5.6], ['p10', 4.4],
  ['n1', 5.4], ['n2', 5.6], ['n3', 5.2], ['n4', 6.0], ['n5', 5.4], ['n6', 6.0], ['n7', 4.8],
  ['d1', 5.8], ['d2', 5.6], ['d3', 5.4], ['d4', 5.0], ['d5', 5.4], ['d6', 5.4], ['d7', 6.0], ['d8', 4.6],
  ['u1', 5.2], ['u2', 5.4], ['u3', 6.0], ['u4', 5.8], ['u5', 4.4],
  ['g1', 5.6], ['g2', 5.8], ['g3', 5.8], ['g4', 5.0], ['g5', 5.4], ['g6', 5.4], ['g7', 5.8], ['g8', 5.4],
  ['r1', 5.2], ['r2', 5.4], ['r3', 5.4], ['r4', 4.8], ['r5', 5.6],
  ['m1', 6.0], ['m2', 5.4], ['m3', 5.4], ['m4', 5.2], ['m5', 5.6], ['m6', 5.4],
  ['recap', 9.6], ['ask', 6.0], ['end', 1.6],
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
  h1: ['ส่วนชายคนนี้ เป็นคนแท้ๆ', 'แต่อาจได้ไปเกิดเป็น<หมา>'],
  h2: ['สัตว์ ขึ้นไปเป็น{เทวดา}', 'คน ลงไปเป็น<หมา>?'],
  h3: ['ภพสัตว์ ตัดสินกันที่อะไร?', 'ตามไปดู {ทีละชั้น}'],
  l0: ['พระพุทธเจ้าเทียบ', 'ทางไปเกิด {5 ทาง}', 'พระไตรปิฎก มัชฌิมนิกาย มหาสีหนาทสูตร'],
  l1: ['ชั้นล่างสุด <นรก>', 'เหมือน{หลุมถ่านไฟ} ลึกท่วมหัว'],
  l2: ['ชั้นที่สอง {ภพสัตว์}', 'เหมือน<หลุมคูถ> ลึกท่วมหัว'],
  l3: ['ส่วนภพเปรต เหมือน', 'ต้นไม้ใบบาง {ร่มเป็นหย่อมๆ}'],
  l4: ['คน = ต้นไม้ร่มครึ้ม', 'เทวดา = {ปราสาท}'],
  l5: ['สัตว์เสวยทุกข์ แรงและเจ็บปวด', 'ภพสัตว์ <แย่กว่าเปรต>อีก'],
  l6: ['คำว่า “ติรัจฉาน”', 'แปลว่า {ไปขวาง}', 'เดินตัวขนานพื้น ไม่ได้ยืนตรงแบบคน (ความหมายศัพท์)'],
  l7: ['ในอบาย มีภพเดียวที่เราเห็น{ทุกวัน}', 'แล้วในภพนี้ มีใครบ้าง?'],
  p1: ['พระพุทธเจ้าแบ่งไว้ {5 กลุ่ม}', '① กินหญ้า: วัว ม้า แพะ กวาง', 'พระไตรปิฎก มัชฌิมนิกาย พาลบัณฑิตสูตร'],
  p2: ['② ได้กลิ่นของเน่า {รีบวิ่งไป}', 'ไก่ หมู หมา หมาจิ้งจอก'],
  p3: ['③ เกิด แก่ ตาย {ในที่มืด}', 'แมลง หนอน ไส้เดือน'],
  p4: ['④ เกิด แก่ ตาย {ในน้ำ}', 'ปลา เต่า จระเข้'],
  p5: ['⑤ เกิด แก่ ตาย {ในที่โสโครก}', 'ปลาเน่า ซากศพ บ่อส้วม'],
  p6: ['นักวิทยาศาสตร์ประมาณว่า', 'สัตว์บนโลก มี{ราว 7.7 ล้านชนิด}', 'Mora et al., PLoS Biology 2011 (ค่าประมาณ)'],
  p7: ['แค่แมลง ราว {10 ล้านล้านล้านตัว}', 'เฉลี่ยคนละ {1.2 พันล้านตัว}!', 'Smithsonian (ค่าประมาณ) · คนบนโลก ~8.3 พันล้าน'],
  p8: ['พระพุทธเจ้าหยิบ{ฝุ่นปลายเล็บ}', 'ถาม: ฝุ่นนี้ กับแผ่นดิน อะไรมากกว่า?', 'พระไตรปิฎก สังยุตตนิกาย ปัญจคติเปยยาล'],
  p9: ['ตายจากคน กลับมาเป็นคน = {ฝุ่นปลายเล็บ}', 'ไปเกิดเป็นสัตว์ = <แผ่นดิน>'],
  p10: ['แต่สัตว์บางพวก…', 'เรา{มองไม่เห็นด้วยตา}'],
  n1: ['{นาค} ก็อยู่ในภพสัตว์', 'มีฤทธิ์ {แปลงกายได้}', 'พระไตรปิฎก สังยุตตนิกาย นาคสังยุต'],
  n2: ['นาคเกิดได้ {4 แบบ}', 'ไข่ · ครรภ์ · เหงื่อไคล · ผุดเกิด'],
  n3: ['นาคบางตัว {รักษาอุโบสถ}', 'เพราะชาติก่อน ทำทั้งดีและชั่ว'],
  n4: ['บางคนได้ยินว่า นาคอายุยืน สวย สุขสบาย', 'ทำบุญแล้ว{ขอไปเกิดเป็นนาค}!'],
  n5: ['แต่นาค ก็มี{ศัตรู}', '“สุบรรณ” หรือ {ครุฑ}', 'พระไตรปิฎก สังยุตตนิกาย สุปัณณสังยุต'],
  n6: ['ครุฑจับนาคได้ เฉพาะตัวที่', 'กำเนิด{เท่ากัน หรือต่ำกว่า}'],
  n7: ['มีฤทธิ์ขนาดนี้ ก็ยังเป็นสัตว์', 'แล้วคนแบบไหน {ถึงร่วงลงมา}?'],
  d1: ['พระไตรปิฎกบอกว่า คน{ติดรส}', 'แล้วทำชั่ว ไปเกิดเป็น{สัตว์กินหญ้า}', 'พระไตรปิฎก มัชฌิมนิกาย พาลบัณฑิตสูตร'],
  d2: ['ศีล 5 ผิดซ้ำๆ จนเป็นนิสัย', 'พาไป นรก · <สัตว์> · เปรต', 'พระไตรปิฎก อังคุตตรนิกาย วิปากสูตร'],
  d3: ['แล้วชายคนนี้ล่ะ?', '{เสนิยะ} นักบวช “วัตรหมา”', 'พระไตรปิฎก มัชฌิมนิกาย กุกกุรวติกสูตร'],
  d4: ['ขดตัวนอนเหมือนหมา', 'กินอาหาร{ที่โยนลงพื้น}'],
  d5: ['เพื่อนชื่อ {ปุณณะ} ถือ “วัตรวัว”', 'ถามว่า เสนิยะ{จะไปเกิดที่ไหน}?'],
  d6: ['พระพุทธเจ้าตอบ “พอเถิด อย่าถามเลย”', 'แต่ถูกถาม{ถึง 3 ครั้ง}'],
  d7: ['“ถ้าวัตรสำเร็จ ไป{อยู่ร่วมกับหมา}', 'ถ้าไม่สำเร็จ ไป<นรก>”'],
  d8: ['เสนิยะ{ร้องไห้}…', 'แล้วเขาจะทำยังไงต่อ?'],
  u1: ['ตกลงไปแล้ว ขึ้นมายากแค่ไหน?', 'ในมหาสมุทร มี{แอกรูเดียว}ลอยอยู่'],
  u2: ['เต่าตาบอด โผล่หัว {100 ปีครั้ง}', 'จะสอดหัวเข้ารูนั้นได้ไหม?'],
  u3: ['เต่ายังสอดหัวได้{เร็วกว่า}', 'คนที่ตกอบาย จะกลับมาเป็นคน', 'พระไตรปิฎก มัชฌิมนิกาย พาลบัณฑิตสูตร · สังยุตตนิกาย ฉิคคฬสูตร'],
  u4: ['เพราะในอบาย {ไม่มีการทำความดี}', 'มีแต่<กินกันเอง> ตัวแข็งกินตัวอ่อน'],
  u5: ['งั้นสัตว์…', '{ทำดีไม่ได้เลย}เหรอ?'],
  g1: ['ครั้งหนึ่ง พระพุทธเจ้าหลีกไปอยู่', 'ป่า{ปาลิไลยกะ} ลำพังพระองค์เดียว', 'พระไตรปิฎก อุทาน นาคสูตร · วินัยปิฎก มหาวรรค'],
  g2: ['พญาช้างเบื่อโขลง ก็ออกมาเหมือนกัน', 'ถางหญ้า ใช้งวง{ตักน้ำมาถวาย}'],
  g3: ['เมื่อพระพุทธเจ้าเสด็จจากไป', 'ช้าง{อกแตกตาย} ไปเกิดเป็นเทพ', 'อรรถกถาธรรมบท'],
  g4: ['ส่วนกบตัวนั้น…', 'อยู่ริม{สระคัคครา} เมืองจัมปา', 'ชื่อสระและเมือง: อรรถกถาวิมานวัตถุ'],
  g5: ['กบได้ยิน{พระสุรเสียง}', 'ฟังไม่รู้ความ แต่{ใจเลื่อมใส}'],
  g6: ['คนเลี้ยงวัว ยืนยันไม้เท้า', 'ไปถูกกบ{โดยไม่ตั้งใจ}'],
  g7: ['กบไปเกิดเป็น{เทพบุตร}', 'ลงมากราบพระพุทธเจ้าเอง', 'พระไตรปิฎก วิมานวัตถุ มัณฑูกเทวปุตตวิมาน'],
  g8: ['“ใจเลื่อมใสแค่ชั่วขณะ', 'ได้{ฤทธิ์และรัศมี}ถึงเพียงนี้”', 'คำของเทพบุตร (ความโดยย่อ)'],
  r1: ['กบไม่เข้าใจธรรมสักคำ', 'แต่{ใจผ่องใส} ในวินาทีสุดท้าย'],
  r2: ['กลับไปที่เสนิยะ', 'เขาขอบวช ยอม{รอถึง 4 ปี}'],
  r3: ['ได้บวช ปฏิบัติจน', 'บรรลุ{อรหันต์}'],
  r4: ['คนที่เกือบได้เป็นหมา', 'ไปถึง{จุดสูงสุด}'],
  r5: ['ภพ ไม่ได้ตัดสินที่ร่าง', 'แต่ที่{ใจ} ที่เราทำซ้ำทุกวัน'],
  m1: ['ทุกงานบวชวันนี้ พระยังถามว่า', '“มนุสฺโสสิ?” = {เป็นมนุษย์หรือเปล่า}', 'คำถามอันตรายิกธรรม ก่อนอุปสมบท'],
  m2: ['เพราะสมัยพุทธกาล นาคตนหนึ่ง', '{แปลงเป็นคน} มาขอบวช', 'พระไตรปิฎก วินัยปิฎก มหาวรรค'],
  m3: ['คืนหนึ่งเผลอหลับ… กุฏิทั้งหลัง', '{มีแต่ขดนาค} ล้นออกหน้าต่าง!'],
  m4: ['พระพุทธเจ้าตรัส: สัตว์บวชไม่ได้', 'นาค{ร้องไห้} จากไป'],
  m5: ['คนไทยจึงเรียกผู้จะบวชว่า “{นาค}”', 'ตามตำนานที่เล่าสืบกันมา', 'ความเชื่อพื้นบ้านไทย'],
  m6: ['มีฤทธิ์แค่ไหน ก็ยังอยากเป็นคน', 'แต่เรา{ได้เกิดเป็นคนแล้ว}'],
  ask: ['ถ้าต้องเกิดเป็นสัตว์ 1 ชาติ', 'เลือก ① {นาค} ② {ครุฑ} ③ {กบฟังธรรม}? คอมเมนต์เลย'],
};
const caps = [{ t0: 0, t1: end('cover'), y: 400, instant: true, lines: [[120, ['กบฟังธรรมไม่รู้เรื่อง', '#fff']], [148, ['แต่ได้เป็น', '#fff'], ['เทวดา', P.gold], ['?', '#fff']], [70, ['ภพภูมิสัตว์ · ตามคติพุทธ', P.teal, 600]]] }];
for (const id in CAP) {
  const c = CAP[id], long1 = c[0].length > 26, long2 = c[1].length > 30;
  const lines = [[long1 ? 62 : 74].concat(segs(c[0])), [c[1].length < 14 ? 96 : long2 ? 56 : 66].concat(segs(c[1]))];
  caps.push({ t0: at(id) + 0.15, t1: end(id) - 0.05, y: CAPY, lines, foot: c[2] });
}
/* source tags */
const TAG = {};
const tagRange = (a, b, k) => { const i0 = ORDER.indexOf(a), i1 = ORDER.indexOf(b); for (let i = i0; i <= i1; i++) TAG[ORDER[i]] = k; };
tagRange('l0', 'l5', 'tri'); TAG.l6 = 'word';
tagRange('p1', 'p5', 'tri'); tagRange('p6', 'p7', 'now'); tagRange('p8', 'p9', 'tri');
tagRange('n1', 'n6', 'tri'); tagRange('d1', 'd8', 'tri'); tagRange('u1', 'u4', 'tri');
tagRange('g1', 'g2', 'tri'); TAG.g3 = 'atth'; TAG.g4 = 'atth'; tagRange('g5', 'g8', 'tri');
tagRange('r2', 'r3', 'tri'); TAG.m1 = 'now'; tagRange('m2', 'm4', 'tri'); TAG.m5 = 'belief';
const TAGS = { tri: ['พระไตรปิฎก', P.teal, ''], atth: ['อรรถกถา', P.violet, 'คัมภีร์อธิบายรุ่นหลัง'], now: ['ข้อมูล ยุคนี้', P.gold, ''], word: ['ความหมายศัพท์', '#9fd0ff', ''], belief: ['ความเชื่อไทย', P.coral, ''] };
const CHAP = [['บันได', 'l0', 'l7'], ['ประชากร', 'p1', 'p10'], ['นาค ครุฑ', 'n1', 'n7'], ['ทางลง', 'd1', 'd8'], ['ขึ้นยาก', 'u1', 'u5'], ['สัตว์ทำดี', 'g1', 'g8'], ['เฉลย', 'r1', 'r5'], ['ยุคนี้', 'm1', 'm6']];

/* gauge "5 ทางไป": levels 0 นรก 1 สัตว์ 2 เปรต 3 คน 4 เทวดา 5 นิพพาน */
const LV = [['นรก', P.coral], ['สัตว์', P.gold], ['เปรต', P.violet], ['คน', P.teal], ['เทวดา', '#9fd0ff'], ['นิพพาน', '#ffffff']];
/* per beat: hi = highlighted level; who = marker name; from/to = arrow (k grows over the beat from t0); x = blocked arrow */
const GZ = {
  l1: { hi: 0 }, l2: { hi: 1 }, l3: { hi: 2 }, l4: { hi: 3, hi2: 4 }, l5: { hi: 1, cmp: 2 }, l6: { hi: 1 }, l7: { hi: 1 },
  d1: { from: 3, to: 1, t0: 1.0 }, d2: { from: 3, to: [0, 1, 2], t0: 1.0 },
  d3: { who: 'เสนิยะ', at: 3 }, d4: { who: 'เสนิยะ', at: 3 }, d5: { who: 'เสนิยะ', at: 3 }, d6: { who: 'เสนิยะ', at: 3 },
  d7: { who: 'เสนิยะ', from: 3, to: [1, 0], t0: 0.6 }, d8: { who: 'เสนิยะ', from: 3, to: [1, 0], t0: -9 },
  u1: { who: 'เต่า', at: 1 }, u2: { who: 'เต่า', at: 1 }, u3: { who: 'เต่า', from: 1, to: 3, x: true, t0: 0.8 }, u4: { who: 'เต่า', from: 1, to: 3, x: true, t0: -9 },
  g2: { who: 'ช้าง', at: 1 }, g3: { who: 'ช้าง', from: 1, to: 4, t0: 1.6 },
  g5: { who: 'กบ', at: 1 }, g6: { who: 'กบ', at: 1 }, g7: { who: 'กบ', from: 1, to: 4, t0: 0.3 }, g8: { who: 'กบ', at: 4 },
  r3: { who: 'เสนิยะ', from: 3, to: 5, t0: 1.4, six: true }, r4: { who: 'เสนิยะ', at: 5, six: true },
};
/* Part B: models (chibi people from mog/, animals, props) */
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

/* ---------- new for ภพภูมิสัตว์ ---------- */
const BALD = { robe: ROBE, sash: ROBE2 };
function monk(s) { const m = chibi(BALD); m.scale.setScalar(s || 1); return m; }
function eyes2(head, r, x, y, z, c) { for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r, 6, 5), basic(c || '#14101a')); e.position.set(sx * x, y, z); head.add(e); } }
/* generic quadruped facing +z; o = {W,H,L,leg,c,c2,head,horns,antlers,ears,tail,snout,mane,patch} */
function quad(o) {
  const g = new T.Group(), c = o.c, leg = o.leg || 0.5, W = o.W || 0.6, H = o.H || 0.55, Lz = o.L || 1.2, hs = o.head || 0.42;
  const body = mk(new T.BoxGeometry(W, H, Lz), c); body.position.y = leg + H / 2; g.add(body);
  if (o.patch) { const p = mk(new T.BoxGeometry(W + 0.02, H * 0.55, Lz * 0.35), o.patch); p.position.set(0, leg + H * 0.62, -Lz * 0.12); g.add(p); }
  const head = new T.Group(); head.position.set(0, leg + H * (o.headUp || 1.0), Lz / 2 + hs * 0.35); g.add(head);
  const hm = mk(new T.BoxGeometry(hs * 0.9, hs * 0.85, hs * 1.0), o.hc || c); head.add(hm);
  if (o.snout) { const sn = mk(new T.BoxGeometry(hs * 0.62, hs * 0.5, hs * 0.5), o.snout); sn.position.set(0, -hs * 0.14, hs * 0.66); head.add(sn); }
  eyes2(head, hs * 0.08, hs * 0.3, hs * 0.14, hs * 0.5);
  if (o.horns) for (const sx of [-1, 1]) { const h = mk(new T.ConeGeometry(hs * 0.09, hs * 0.55, 5), o.horns); h.position.set(sx * hs * 0.32, hs * 0.6, -hs * 0.05); h.rotation.z = -sx * 0.5; head.add(h); }
  if (o.antlers) for (const sx of [-1, 1]) { const a = new T.Group(); a.position.set(sx * hs * 0.25, hs * 0.42, -hs * 0.1); a.rotation.z = -sx * 0.35; const st = mk(new T.CylinderGeometry(0.03, 0.04, hs * 1.1, 4), o.antlers); st.position.y = hs * 0.55; a.add(st); for (let k = 0; k < 2; k++) { const br = mk(new T.CylinderGeometry(0.025, 0.03, hs * 0.5, 4), o.antlers); br.position.set(-sx * 0.1, hs * (0.55 + k * 0.35), 0.06); br.rotation.z = sx * 0.9; a.add(br); } head.add(a); }
  if (o.ears) for (const sx of [-1, 1]) { const e = mk(new T.ConeGeometry(hs * 0.16, hs * 0.42, 4), o.ears); e.position.set(sx * hs * 0.3, hs * 0.55, -hs * 0.15); e.rotation.z = -sx * (o.earTilt || 0.25); head.add(e); }
  if (o.mane) { const m = mk(new T.BoxGeometry(0.08, H * 0.6, Lz * 0.5), o.mane); m.position.set(0, leg + H * 1.05, Lz * 0.25); g.add(m); }
  const legs = [];
  for (const q of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const p = new T.Group(); p.position.set(q[0] * W * 0.32, leg, q[1] * Lz * 0.36); const l = mk(new T.CylinderGeometry(0.07 * (o.legW || 1), 0.06 * (o.legW || 1), leg, 5), o.legC || c); l.position.y = -leg / 2; p.add(l); g.add(p); legs.push(p); }
  let tail = null; if (o.tail) { tail = new T.Group(); tail.position.set(0, leg + H * 0.8, -Lz / 2); const tl = mk(new T.CylinderGeometry(0.03, 0.05, o.tail, 4), o.tailC || c); tl.position.y = o.tail / 2; tail.add(tl); tail.rotation.x = o.tailUp ? -0.6 : -2.6; g.add(tail); }
  g.userData = { head, legs, tail, body }; g.scale.setScalar(o.s || 1); return g;
}
function trot(a, t, k) { k = k == null ? 1 : k; a.userData.legs.forEach((l, i) => (l.rotation.x = Math.sin(t * 8 + (i % 3 ? Math.PI : 0)) * 0.5 * k)); if (a.userData.tail) a.userData.tail.rotation.z = Math.sin(t * 6) * 0.3; }
function graze(a, t) { a.userData.head.rotation.x = 0.55 + Math.sin(t * 2) * 0.12; }
const ANI = {
  cow: () => quad({ c: '#efe8da', patch: '#3a2a22', horns: '#f6f0e0', snout: '#e8b0a8', tail: 0.6, ears: '#efe8da', earTilt: 1.2, W: 0.75, H: 0.65, L: 1.45, leg: 0.55, head: 0.5 }),
  goat: () => quad({ c: '#f2f0ea', horns: '#8a7a60', tail: 0.2, tailUp: true, ears: '#f2f0ea', earTilt: 1.1, W: 0.45, H: 0.42, L: 0.9, leg: 0.45, head: 0.36, headUp: 1.35 }),
  deer: () => quad({ c: '#b47a45', antlers: '#e8d8b8', tail: 0.18, tailUp: true, ears: '#b47a45', W: 0.42, H: 0.45, L: 1.0, leg: 0.7, head: 0.36, headUp: 1.6 }),
  horse: () => quad({ c: '#8a5a3a', mane: '#2a1a12', tail: 0.7, tailC: '#2a1a12', ears: '#8a5a3a', W: 0.55, H: 0.62, L: 1.5, leg: 0.8, head: 0.45, headUp: 1.5 }),
  pig: () => quad({ c: '#f2a8ae', snout: '#e88a92', ears: '#f2a8ae', earTilt: 0.6, tail: 0.18, tailUp: true, W: 0.62, H: 0.55, L: 1.0, leg: 0.25, head: 0.48, headUp: 0.7 }),
  dog: () => quad({ c: '#c48a50', snout: '#e8c8a0', ears: '#7a4a28', tail: 0.42, tailUp: true, W: 0.38, H: 0.38, L: 0.82, leg: 0.4, head: 0.4, headUp: 1.4 }),
  jackal: () => quad({ c: '#b8a070', snout: '#d8c8a0', ears: '#b8a070', earTilt: 0.05, tail: 0.5, W: 0.34, H: 0.34, L: 0.85, leg: 0.42, head: 0.36, headUp: 1.35 }),
  ox: () => quad({ c: '#cfc6b8', horns: '#f3efe6', snout: '#e0d6c8', tail: 0.5, ears: '#cfc6b8', earTilt: 1.2, W: 0.7, H: 0.65, L: 1.4, leg: 0.55, head: 0.5 }),
};
function chicken(c) {
  const g = new T.Group(); const b = mk(new T.SphereGeometry(0.28, 8, 6), c || '#f6f2ea'); b.scale.set(0.9, 0.85, 1.15); b.position.y = 0.42; g.add(b);
  const h = new T.Group(); h.position.set(0, 0.72, 0.2); g.add(h); h.add(mk(new T.SphereGeometry(0.15, 8, 6), c || '#f6f2ea'));
  const cm = mk(new T.BoxGeometry(0.05, 0.14, 0.2), '#e0302a'); cm.position.set(0, 0.15, 0); h.add(cm);
  const bk = mk(new T.ConeGeometry(0.05, 0.14, 4), '#f0b030'); bk.rotation.x = Math.PI / 2; bk.position.set(0, 0, 0.17); h.add(bk); eyes2(h, 0.025, 0.08, 0.04, 0.12);
  const tl = mk(new T.ConeGeometry(0.14, 0.3, 4), '#3a3a3a'); tl.rotation.x = -0.9; tl.position.set(0, 0.58, -0.28); g.add(tl);
  for (const sx of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.025, 0.025, 0.2, 4), '#f0b030'); l.position.set(sx * 0.1, 0.1, 0); g.add(l); }
  g.userData = { head: h }; return g;
}
function elephant() {
  const e = quad({ c: '#8e949e', W: 1.5, H: 1.35, L: 2.4, leg: 1.1, legW: 2.6, head: 1.15, headUp: 1.0, tail: 0.7 });
  const h = e.userData.head;
  for (const sx of [-1, 1]) { const ear = mk(new T.BoxGeometry(0.08, 0.95, 0.8), '#7f858f'); ear.position.set(sx * 0.62, 0.1, -0.1); ear.rotation.y = sx * 0.5; h.add(ear); e.userData['ear' + sx] = ear;
    const tu = mk(new T.ConeGeometry(0.07, 0.75, 5), '#f6f0e0'); tu.rotation.x = 1.9; tu.position.set(sx * 0.25, -0.42, 0.75); h.add(tu); }
  const tr = []; let parent = h; for (let i = 0; i < 6; i++) { const p = new T.Group(); p.position.set(0, i === 0 ? -0.25 : -0.26, i === 0 ? 0.55 : 0); const seg = mk(new T.CylinderGeometry(0.16 - i * 0.017, 0.17 - i * 0.017, 0.28, 6), '#8e949e'); seg.position.y = -0.13; p.add(seg); parent.add(p); tr.push(p); parent = p; }
  e.userData.trunk = tr; return e;
}
function frog(s) {
  const g = new T.Group(), c = '#7fe060';
  const b = new T.Mesh(new T.SphereGeometry(0.42, 18, 12), new T.MeshStandardMaterial({ color: c, roughness: 0.5, emissive: new T.Color('#2a6a10'), emissiveIntensity: 0.35 })); b.scale.set(1, 0.62, 1.1); b.position.y = 0.26; g.add(b);
  const bl = mk(new T.SphereGeometry(0.36, 10, 6), '#d8f0b0'); bl.scale.set(0.9, 0.4, 0.9); bl.position.set(0, 0.16, 0.12); g.add(bl);
  for (const sx of [-1, 1]) { const ey = mk(new T.SphereGeometry(0.17, 8, 6), c); ey.position.set(sx * 0.22, 0.52, 0.24); g.add(ey); const wh = new T.Mesh(new T.SphereGeometry(0.11, 8, 6), basic('#ffffff')); wh.position.set(sx * 0.22, 0.56, 0.34); g.add(wh); const pu = new T.Mesh(new T.SphereGeometry(0.06, 6, 5), basic('#14101a')); pu.position.set(sx * 0.22, 0.57, 0.42); g.add(pu);
    const lg = mk(new T.SphereGeometry(0.17, 6, 5), c); lg.scale.set(0.7, 0.5, 1.4); lg.position.set(sx * 0.36, 0.1, -0.22); g.add(lg);
    const fl = mk(new T.SphereGeometry(0.09, 6, 5), c); fl.scale.set(1, 0.5, 1.4); fl.position.set(sx * 0.24, 0.06, 0.38); g.add(fl); }
  const mo = new T.Mesh(new T.BoxGeometry(0.34, 0.02, 0.02), basic('#2a4a1a')); mo.position.set(0, 0.34, 0.45); g.add(mo);
  g.scale.setScalar(s || 1); return g;
}
function turtle(s) {
  const g = new T.Group(); const sh = mk(new T.SphereGeometry(0.75, 9, 6, 0, 6.283, 0, Math.PI / 2), '#6a8a4a'); sh.scale.y = 0.6; sh.position.y = 0.15; g.add(sh);
  const rim = mk(new T.CylinderGeometry(0.78, 0.78, 0.12, 9), '#4f6a38'); rim.position.y = 0.15; g.add(rim);
  const hd = new T.Group(); hd.position.set(0, 0.2, 0.85); g.add(hd); hd.add(mk(new T.SphereGeometry(0.22, 8, 6), '#9ab070'));
  for (const sx of [-1, 1]) { const ey = new T.Mesh(new T.BoxGeometry(0.09, 0.02, 0.02), basic('#1a2a10')); ey.position.set(sx * 0.1, 0.06, 0.19); hd.add(ey); }
  const fl = []; for (const q of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const f = mk(new T.BoxGeometry(0.5, 0.06, 0.22), '#9ab070'); f.position.set(q[0] * 0.7, 0.12, q[1] * 0.42); g.add(f); fl.push(f); }
  g.userData = { head: hd, fl }; g.scale.setScalar(s || 1); return g;
}
function fish(s, c) {
  const g = new T.Group(); const b = mk(new T.SphereGeometry(0.4, 8, 6), c || '#f0a040'); b.scale.set(0.5, 0.75, 1.2); g.add(b);
  const tf = mk(new T.ConeGeometry(0.3, 0.42, 3), c || '#f0a040'); tf.rotation.x = -Math.PI / 2; tf.position.z = -0.6; tf.scale.x = 0.25; g.add(tf); g.userData.tail = tf;
  const df = mk(new T.ConeGeometry(0.16, 0.3, 3), c || '#f0a040'); df.position.set(0, 0.3, -0.05); df.scale.x = 0.2; g.add(df);
  eyes2(g, 0.045, 0.16, 0.08, 0.32); g.scale.setScalar(s || 1); return g;
}
function croc() {
  const g = new T.Group(), c = '#4f7040'; const b = mk(new T.BoxGeometry(0.7, 0.32, 2.2), c); b.position.y = 0.2; g.add(b);
  const sn = mk(new T.BoxGeometry(0.42, 0.22, 0.9), c); sn.position.set(0, 0.2, 1.5); g.add(sn); const tl = mk(new T.ConeGeometry(0.3, 1.6, 4), c); tl.rotation.x = -Math.PI / 2; tl.position.set(0, 0.2, -1.9); g.add(tl);
  for (let i = 0; i < 5; i++) { const sc = mk(new T.ConeGeometry(0.07, 0.14, 4), '#3a5530'); sc.position.set(0, 0.42, -0.8 + i * 0.4); g.add(sc); }
  eyes2(g, 0.05, 0.14, 0.42, 1.15); return g;
}
function worm(n, c) { const g = new T.Group(); g.userData.seg = []; for (let i = 0; i < (n || 7); i++) { const s = mk(new T.SphereGeometry(0.08, 6, 5), c || '#d88a8a'); g.add(s); g.userData.seg.push(s); } return g; }
function wiggle(w, t, ph) { w.userData.seg.forEach((s, i) => s.position.set(i * 0.11, 0.07 + Math.max(0, Math.sin(t * 5 + ph - i * 0.7)) * 0.08, Math.sin(t * 3 + ph - i * 0.5) * 0.06)); }
function moth(c) { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.03, 0.03, 0.22, 4), '#3a2a20'); b.rotation.x = Math.PI / 2; g.add(b); const ws = []; for (const sx of [-1, 1]) { const w = new T.Mesh(new T.CircleGeometry(0.16, 3), M(c || '#d8c8a0', { side: T.DoubleSide })); w.position.x = sx * 0.12; w.rotation.x = -Math.PI / 2; g.add(w); ws.push(w); } g.userData.w = ws; return g; }
function nagaModel(n, r0, c, c2) {
  const g = new T.Group(), segs = [];
  for (let i = 0; i < n; i++) { const k = 1 - i / n; const s = mk(new T.SphereGeometry(r0 * (0.35 + 0.65 * k), 8, 6), i % 2 ? c : c2 || c, { emissive: new T.Color(c), emissiveIntensity: 0.12 }); g.add(s); segs.push(s); }
  const hd = new T.Group(); g.add(hd);
  const hm = mk(new T.BoxGeometry(r0 * 1.5, r0 * 1.0, r0 * 2.0), c); hd.add(hm);
  const jaw = mk(new T.BoxGeometry(r0 * 1.2, r0 * 0.35, r0 * 1.4), c2 || c); jaw.position.set(0, -r0 * 0.55, r0 * 0.3); hd.add(jaw);
  for (let k = 0; k < 3; k++) { const cr = mk(new T.ConeGeometry(r0 * 0.28, r0 * 1.4, 4), P.gold, { emissive: new T.Color('#a07000'), emissiveIntensity: 0.4 }); cr.position.set((k - 1) * r0 * 0.5, r0 * 0.9, -r0 * 0.3 - Math.abs(k - 1) * r0 * 0.2); cr.rotation.x = -0.35; hd.add(cr); }
  for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r0 * 0.16, 6, 5), basic('#ffe46a')); e.position.set(sx * r0 * 0.5, r0 * 0.25, r0 * 0.95); hd.add(e); }
  g.userData = { segs, hd, r0 }; return g;
}
/* place naga along path fn(u in 0..1) -> [x,y,z] (local) */
function setNaga(ng, fn) {
  const sg = ng.userData.segs, n = sg.length; let p0 = null;
  for (let i = 0; i < n; i++) { const p = fn(i / (n - 1)); sg[i].position.set(p[0], p[1], p[2]); }
  const a = fn(0), b = fn(0.02); ng.userData.hd.position.set(a[0], a[1] + ng.userData.r0 * 0.25, a[2]);
  ng.userData.hd.rotation.y = Math.atan2(a[0] - b[0], a[2] - b[2]); ng.userData.hd.rotation.x = -Math.atan2(a[1] - b[1], Math.hypot(a[0] - b[0], a[2] - b[2])) * 0.6; void p0;
}
function garuda() {
  const g = new T.Group(), red = '#d8463a', gold = P.gold, gm = { emissive: new T.Color('#7a4a00'), emissiveIntensity: 0.3 };
  const body = mk(new T.CylinderGeometry(0.45, 0.65, 1.7, 8), red); body.rotation.x = Math.PI / 2; body.position.y = 0; g.add(body);
  const chest = mk(new T.SphereGeometry(0.55, 8, 6), gold, gm); chest.position.set(0, 0.05, 0.6); g.add(chest);
  const hd = new T.Group(); hd.position.set(0, 0.45, 1.15); g.add(hd); hd.add(mk(new T.SphereGeometry(0.38, 8, 6), red));
  const bk = mk(new T.ConeGeometry(0.16, 0.6, 5), '#f0c040', gm); bk.rotation.x = 1.9; bk.position.set(0, -0.08, 0.42); hd.add(bk);
  for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), basic('#fff6a0')); e.position.set(sx * 0.17, 0.1, 0.3); hd.add(e); }
  const crest = mk(new T.ConeGeometry(0.12, 0.6, 4), gold, gm); crest.position.set(0, 0.42, -0.1); crest.rotation.x = -0.5; hd.add(crest);
  const wings = [];
  for (const sx of [-1, 1]) { const p = new T.Group(); p.position.set(sx * 0.4, 0.2, 0.1); g.add(p); for (let k = 0; k < 3; k++) { const f = mk(new T.BoxGeometry(1.5, 0.07, 0.55 - k * 0.1), k % 2 ? gold : red, k % 2 ? gm : {}); f.position.set(sx * (0.75 + k * 0.55), 0, -k * 0.18); p.add(f); } wings.push(p); }
  const tail = mk(new T.ConeGeometry(0.5, 1.2, 4), gold, gm); tail.rotation.x = -Math.PI / 2; tail.scale.y = 1; tail.scale.x = 1.4; tail.position.set(0, 0, -1.3); g.add(tail);
  const claws = new T.Group(); claws.position.set(0, -0.5, 0.2); g.add(claws); for (const sx of [-1, 1]) { const c = mk(new T.CylinderGeometry(0.06, 0.06, 0.5, 4), '#f0c040'); c.position.set(sx * 0.25, -0.2, 0); claws.add(c); }
  g.userData = { wings, hd, claws }; return g;
}
function flap(gd, t, sp) { gd.userData.wings.forEach((w, i) => (w.rotation.z = (i ? -1 : 1) * Math.sin(t * (sp || 6)) * 0.55)); }
function yoke() {
  const g = new T.Group(), c = '#8a5a32';
  const beam = mk(new T.BoxGeometry(3.4, 0.26, 0.42), c); g.add(beam);
  const ring = mk(new T.TorusGeometry(0.42, 0.13, 6, 14), '#6a4224'); ring.rotation.x = Math.PI / 2; g.add(ring);
  const hole = new T.Mesh(new T.CircleGeometry(0.34, 14), basic('#0a1a30')); hole.rotation.x = -Math.PI / 2; hole.position.y = 0.06; g.add(hole);
  for (const x of [-1.4, 1.4]) { const pg = mk(new T.CylinderGeometry(0.05, 0.05, 0.6, 5), '#6a4224'); pg.position.set(x, -0.2, 0); g.add(pg); }
  return g;
}
function pit(r, wall, fill, o) {
  o = o || {}; const g = new T.Group();
  const rim = mk(new T.CylinderGeometry(r + 0.5, r + 0.7, 0.5, 14, 1, true), wall); rim.position.y = 0.0; rim.material.side = T.DoubleSide; g.add(rim);
  const top = mk(new T.RingGeometry(r, r + 0.55, 18), wall); top.rotation.x = -Math.PI / 2; top.position.y = 0.25; top.material.side = T.DoubleSide; g.add(top);
  const fm = mk(new T.CircleGeometry(r, 18), fill, o.emi ? { emissive: new T.Color(o.emi), emissiveIntensity: 0.9 } : {}); fm.rotation.x = -Math.PI / 2; fm.position.y = 0.05; g.add(fm);
  return g;
}
function finger() {
  const g = new T.Group(), skin = '#e8b890';
  const f = mk(new T.CylinderGeometry(0.75, 0.82, 4.2, 10), skin); f.rotation.z = Math.PI / 2; f.position.x = -2.1; g.add(f);
  const tip = mk(new T.SphereGeometry(0.75, 10, 8), skin); g.add(tip);
  const nail = mk(new T.BoxGeometry(1.1, 0.12, 1.05), '#f6d6d0', { roughness: 0.3 }); nail.position.set(-0.3, 0.74, 0); nail.rotation.z = 0.08; g.add(nail);
  const dust = new T.Group(); dust.position.set(0.05, 0.86, 0); g.add(dust);
  for (let i = 0; i < 7; i++) { const d = mk(new T.IcosahedronGeometry(0.07 + (i % 3) * 0.02, 0), '#b89a6a'); d.position.set(Math.cos(i * 2.3) * 0.12, (i % 2) * 0.04, Math.sin(i * 2.3) * 0.12); dust.add(d); }
  g.userData.dust = dust; return g;
}
function bigTree(s, c) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.28, 0.4, 2.4, 6), '#6a4630'); tr.position.y = 1.2; g.add(tr); [[0, 3.1, 0, 1.9], [1.2, 2.7, 0.3, 1.3], [-1.2, 2.8, -0.2, 1.4], [0.3, 2.6, 1.1, 1.2], [-0.4, 2.7, -1.1, 1.2]].forEach((q) => { const f = mk(new T.IcosahedronGeometry(q[3], 0), c || '#2f8a52'); f.position.set(q[0], q[1], q[2]); g.add(f); }); g.scale.setScalar(s || 1); return g; }
function thinTree(s) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.18, 2.6, 5), '#5a4a3a'); tr.position.y = 1.3; tr.rotation.z = 0.12; g.add(tr); for (let i = 0; i < 4; i++) { const br = mk(new T.CylinderGeometry(0.04, 0.06, 1.1, 4), '#5a4a3a'); br.position.set(Math.cos(i * 1.7) * 0.4, 2.2 + i * 0.18, Math.sin(i * 1.7) * 0.4); br.rotation.set(Math.sin(i) * 0.8, 0, Math.cos(i * 1.7) * 0.9); g.add(br); const lf = mk(new T.IcosahedronGeometry(0.22, 0), '#8a9a5a'); lf.position.set(Math.cos(i * 1.7) * 0.75, 2.6 + i * 0.2, Math.sin(i * 1.7) * 0.75); g.add(lf); } g.scale.setScalar(s || 1); return g; }
function rock(s, c) { const r = mk(new T.DodecahedronGeometry(s || 0.5, 0), c || '#7a6a5a'); r.scale.y = 0.6; return r; }
function seniyaModel() { const s = chibi({ robe: '#d9a27a', skin: '#d9a27a', hair: '#3a2a20', bun: true, beard: '#4a3a2a', thin: true }); const lc = mk(new T.CylinderGeometry(0.42, 0.44, 0.22, 10), '#8a6a4a'); lc.position.y = 0.32; s.add(lc);
  const sh = new T.Group(); sh.position.set(0, 0.15, -0.1); for (const sx of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.09, 0.08, 0.62, 6), '#d9a27a'); l.position.set(sx * 0.17, -0.31, 0); sh.add(l); } sh.rotation.x = -(Math.PI - 1.0) + Math.PI; s.add(sh); sh.visible = false; s.userData.shins = sh; return s; }
function punnaModel() { const p = chibi({ robe: '#e8e0cc', hair: '#3a2a20', bun: true, beard: '#4a3a2a', thin: true }); for (const sx of [-1, 1]) { const h = mk(new T.ConeGeometry(0.06, 0.32, 5), '#f3efe6'); h.position.set(sx * 0.22, 0.42, 0); h.rotation.z = -sx * 0.6; p.userData.head.add(h); } return p; }
function cowherd() { const c = chibi({ robe: '#5a7aa8', hair: '#2a2228', s: 0.95 }); const hat = mk(new T.ConeGeometry(0.62, 0.32, 10), '#d8b878'); hat.position.y = 0.42; c.userData.head.add(hat); const st = mk(new T.CylinderGeometry(0.04, 0.04, 1.7, 5), '#7a5236'); st.position.set(0, -0.6, 0); c.userData.arms.R.add(st); c.userData.staff = st; return c; }
function deva(accent) { const d = chibi({ robe: '#fff3d0', skin: '#f2c89a', crown: true, sash: accent || '#5fd16a', glow: '#ffd27a' }); const gl = softSprite('rgba(255,220,120,1)', 0.7); gl.scale.setScalar(3.2); gl.position.y = 1.2; d.add(gl); d.userData.glow = gl; return d; }
function crawlPose(ch, t, k) { ch.rotation.order = 'YXZ'; const u = ch.userData; if (u.shins) { u.shins.visible = k > 0.5; u.shins.rotation.x = Math.PI / 2 - 1.0; } ch.rotation.x = 1.0 * k; u.arms.L.rotation.set(-1.0 * k + Math.sin(t * 6) * 0.3 * k, 0, -0.14); u.arms.R.rotation.set(-1.0 * k - Math.sin(t * 6) * 0.3 * k, 0, 0.14); u.head.rotation.x = -0.9 * k; }
/* Part C: stations + setup */
const ST = {
  LAD: [0, 0, 0], GRASS: [40, 0, 0], DUNG: [55, 0, 0], DARK: [70, 0, 0], WATER: [85, 0, 0], FILTH: [100, 0, 0], SWARM: [115, 0, 0], NAIL: [132, 0, 0],
  NAGA: [170, 0, 0], KOL: [210, 0, 0], OCEAN: [250, 0, 0], PAL: [290, 0, 0], GAG: [330, 0, 0], TEMPLE: [420, 0, 0], HUT: [470, 0, 0],
};
const TER = 4.5; /* ladder terrace spacing */
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

function setupScene(scene) {
  const s = { anchorV: new T.Vector3() };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#3a5a8a', 40, 120); s.fog = scene.fog;
  const add = (o) => (scene.add(o), o);

  /* ---------- ground (valley .. temple) ---------- */
  const ground = mk(new T.BoxGeometry(470, 0.4, 120), '#4f7a52'); ground.position.set(260, -0.2, -32); scene.add(ground);
  const busy = [40, 55, 70, 85, 100, 115, 132, 170, 210, 250, 290, 330, 420, 470];
  for (let i = 0; i < 170; i++) {
    const x = 28 + rnd() * 460, z = -80 + rnd() * 80; if (busy.some((c) => Math.abs(c - x) < 10) && z > -16) continue; if (x > 228 && x < 272) continue;
    const tr = tree(0.8 + rnd() * 0.9, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  for (const h of [[50, -62, 16], [110, -60, 18], [200, -64, 18], [300, -60, 20], [380, -62, 16], [450, -58, 18]]) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#5a7f5e'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- LADDER: 5 terraces on a floating mountain (MN 12) ---------- */
  const LG = add(new T.Group()); place(LG, 'LAD');
  const mtn = mk(new T.ConeGeometry(8, TER * 5.6, 8), '#3a3a62'); mtn.position.set(0, TER * 2.2, -6); LG.add(mtn);
  const under = mk(new T.ConeGeometry(7, 9, 8), '#3a3a5a'); under.rotation.x = Math.PI; under.position.set(0, -4.6, -3); LG.add(under);
  for (let i = 0; i < 6; i++) { const c = cloud(1.4 + (i % 3) * 0.4); c.position.set(-9 + i * 3.6, -1.5 + (i % 2), 1 - (i % 3) * 3); LG.add(c); }
  s.lad = { ter: [], fx: {} };
  const terCol = ['#5a3a3a', '#6a5a3a', '#6a6a5a', '#4f7a52', '#e8e0ff'];
  for (let k = 0; k < 5; k++) {
    const g = new T.Group(); g.position.set(0, k * TER, 0); LG.add(g);
    const slab = mk(new T.CylinderGeometry(4.6, 4.0, 0.7, 10), terCol[k]); slab.position.y = -0.35; g.add(slab);
    const ring = new T.Mesh(new T.RingGeometry(4.65, 4.95, 40), basic(LV[k][1], { transparent: true, opacity: 0, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; g.add(ring);
    s.lad.ter.push({ g, ring });
  }
  { /* 0 hell: pit of glowing coals */
    const g = s.lad.ter[0].g; const p = pit(2.3, '#3a2626', '#ff5a1a', { emi: '#ff3a00' }); g.add(p);
    s.lad.fx.coals = [];
    for (let i = 0; i < 26; i++) { const c = new T.Mesh(new T.IcosahedronGeometry(0.22 + rnd() * 0.12, 0), basic(['#ff7a2a', '#ffb347', '#e04a10'][i % 3])); const a = rnd() * 6.283, r = Math.sqrt(rnd()) * 2.0; c.position.set(Math.cos(a) * r, 0.12, Math.sin(a) * r); g.add(c); s.lad.fx.coals.push(c); }
    const gl = softSprite('rgba(255,110,40,1)', 0.8); gl.scale.setScalar(7); gl.position.y = 1; g.add(gl); s.lad.fx.hellGlow = gl;
  }
  { /* 1 animals: cesspit + flies */
    const g = s.lad.ter[1].g; g.add(pit(2.2, '#5a4632', '#4a3018'));
    for (let i = 0; i < 5; i++) { const b = mk(new T.SphereGeometry(0.18 + rnd() * 0.15, 6, 5), '#3a2410'); b.scale.y = 0.4; b.position.set((rnd() - 0.5) * 3, 0.08, (rnd() - 0.5) * 3); g.add(b); }
    s.lad.fx.flies = [];
    for (let i = 0; i < 12; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); g.add(f); s.lad.fx.flies.push(f); }
    s.lad.cow = ANI.cow(); s.lad.cow.position.set(3.0, 0, 1.6); s.lad.cow.rotation.y = -0.9; g.add(s.lad.cow);
    s.lad.dog = ANI.dog(); s.lad.dog.position.set(-3.1, 0, 1.5); s.lad.dog.rotation.y = 0.9; g.add(s.lad.dog);
    s.lad.man = chibi({ robe: '#5a8ac8', hair: '#2a2228', s: 0.9 }); s.lad.man.position.set(-1.0, 0, 3.2); g.add(s.lad.man); s.lad.man.visible = false;
    s.lad.walker = ANI.ox(); s.lad.walker.scale.setScalar(0.9); g.add(s.lad.walker); s.lad.walker.visible = false;
    s.lad.barH = new T.Mesh(new T.BoxGeometry(2.6, 0.08, 0.08), basic(P.gold)); g.add(s.lad.barH); s.lad.barV = new T.Mesh(new T.BoxGeometry(0.08, 1.9, 0.08), basic(P.teal)); g.add(s.lad.barV);
  }
  { /* 2 ghosts: rugged ground + thin tree */
    const g = s.lad.ter[2].g; for (let i = 0; i < 9; i++) { const r = rock(0.3 + rnd() * 0.4, ['#6a5a4a', '#7a6a5a'][i % 2]); r.position.set((rnd() - 0.5) * 6, 0.1, (rnd() - 0.5) * 5); g.add(r); }
    const tt = thinTree(1.0); tt.position.set(0, 0, -0.6); g.add(tt);
    for (let i = 0; i < 5; i++) { const sp = new T.Mesh(new T.CircleGeometry(0.3 + rnd() * 0.2, 10), basic('#2a2a20', { transparent: true, opacity: 0.45 })); sp.rotation.x = -Math.PI / 2; sp.position.set((rnd() - 0.5) * 2.4, 0.03, (rnd() - 0.3) * 2); g.add(sp); }
  }
  { /* 3 humans: dense shade tree + resting person */
    const g = s.lad.ter[3].g; const bt = bigTree(0.85); bt.position.set(0, 0, -1.4); g.add(bt);
    const sh = new T.Mesh(new T.CircleGeometry(2.6, 20), basic('#20402a', { transparent: true, opacity: 0.5 })); sh.rotation.x = -Math.PI / 2; sh.position.set(0, 0.03, -0.4); g.add(sh);
    const pr = chibi({ robe: P.teal, hair: '#2a2228', s: 0.85 }); setSit(pr, true); pr.position.set(1.2, 0, 1.0); pr.rotation.y = -0.4; g.add(pr); s.lad.rest = pr;
  }
  { /* 4 devas: palace */
    const g = s.lad.ter[4].g; const pa = palace(); pa.scale.setScalar(0.7); pa.position.set(0, 0, -0.8); g.add(pa);
    const dv = deva('#9fd0ff'); dv.position.set(2.0, 0, 1.4); dv.scale.setScalar(0.85); g.add(dv); s.lad.deva = dv;
  }
  s.lad.orbs = [orb('rgba(140,255,150,1)'), orb('rgba(255,120,120,1)'), orb('rgba(255,210,120,1)'), orb('rgba(255,210,120,1)'), orb('rgba(255,210,120,1)')];
  s.lad.orbs.forEach((o) => { o.scale.setScalar(1.4); LG.add(o); o.visible = false; });
  s.lad.g = LG;

  /* ---------- valley: 5 groups (MN 129) ---------- */
  { const m = mk(new T.CylinderGeometry(7, 7.2, 0.1, 18), '#6aa85a'); place(m, 'GRASS', 0, 0.02, -1); scene.add(m); }
  s.grass = [];
  for (const [kind, x, z, r] of [['cow', -2.6, -0.8, 0.5], ['goat', 1.0, 0.6, -0.6], ['deer', 3.2, -1.4, -1.6], ['horse', -0.4, -3.2, 0.8], ['cow', 2.0, -4.2, 2.6], ['goat', -3.6, 1.6, 0.9]]) { const a = ANI[kind](); place(a, 'GRASS', x, 0, z); a.rotation.y = r; scene.add(a); s.grass.push(a); }
  { const hp = new T.Group(); place(hp, 'DUNG', 0, 0, -0.6); scene.add(hp);
    for (let i = 0; i < 7; i++) { const c = mk(new T.ConeGeometry(0.5 + rnd() * 0.4, 0.5 + rnd() * 0.4, 6), ['#6a4a28', '#5a3a1e'][i % 2]); c.position.set((rnd() - 0.5) * 1.6, 0.25, (rnd() - 0.5) * 1.2); hp.add(c); }
    s.dung = { heap: hp, flies: [], runners: [] };
    for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); scene.add(f); s.dung.flies.push(f); }
    const kinds = [chicken(), ANI.pig(), ANI.dog(), ANI.jackal(), chicken('#b8682a')];
    kinds.forEach((a, i) => { scene.add(a); s.dung.runners.push({ a, ang: -2.6 + i * 1.3 }); });
  }
  { /* darkness: soil cross-section */
    const blk = mk(new T.BoxGeometry(9, 4, 3), '#7a5638'); place(blk, 'DARK', 0, 2, -1.5); scene.add(blk);
    const top = mk(new T.BoxGeometry(9.1, 0.3, 3.1), '#5f8f4a'); place(top, 'DARK', 0, 4.1, -1.5); scene.add(top);
    s.dark = { worms: [], moths: [] };
    for (const q of [[-2.5, 1.0], [1.2, 2.0], [-0.4, 0.6], [2.8, 1.2], [-1.6, 2.8]]) { const tn = mk(new T.BoxGeometry(2.2, 0.55, 0.3), '#2a1a12'); place(tn, 'DARK', q[0], q[1], 0.02); scene.add(tn); const w = worm(7, '#e09a8a'); place(w, 'DARK', q[0] - 0.4, q[1] - 0.2, 0.15); scene.add(w); s.dark.worms.push(w); }
    for (let i = 0; i < 6; i++) { const m = moth(); scene.add(m); s.dark.moths.push(m); }
  }
  { /* water: pond */
    const pond = new T.Mesh(new T.CircleGeometry(6, 28), M('#2f6fb0', { transparent: true, opacity: 0.85, emissive: new T.Color('#10305a'), emissiveIntensity: 0.3 })); pond.rotation.x = -Math.PI / 2; place(pond, 'WATER', 0, 0.06, -1); scene.add(pond);
    s.water = { fish: [], pond };
    for (let i = 0; i < 5; i++) { const f = fish(0.8 + (i % 3) * 0.25, ['#f0a040', '#e86a4a', '#f6d060', '#8ac0e0', '#f0a040'][i]); scene.add(f); s.water.fish.push(f); }
    s.water.turtle = turtle(0.8); place(s.water.turtle, 'WATER', 2.2, 0.12, 1.6); s.water.turtle.rotation.y = -0.6; scene.add(s.water.turtle);
    s.water.croc = croc(); place(s.water.croc, 'WATER', -4.6, 0.02, 2.2); s.water.croc.rotation.y = 0.9; scene.add(s.water.croc);
    for (let i = 0; i < 8; i++) { const r = mk(new T.CylinderGeometry(0.03, 0.03, 1 + rnd(), 4), '#5a8a3a'); place(r, 'WATER', -5 + rnd() * 10, 0.5, -6 + rnd() * 1.2); scene.add(r); }
  }
  { /* filth: murky pool */
    const pool = new T.Mesh(new T.CircleGeometry(3.4, 20), M('#4a5a2a', { emissive: new T.Color('#202a10'), emissiveIntensity: 0.4 })); pool.rotation.x = -Math.PI / 2; place(pool, 'FILTH', 0, 0.05, -0.6); scene.add(pool);
    for (let i = 0; i < 6; i++) { const b = mk(new T.SphereGeometry(0.25 + rnd() * 0.2, 6, 5), '#3a3a1e'); b.scale.y = 0.4; place(b, 'FILTH', (rnd() - 0.5) * 4, 0.08, -0.6 + (rnd() - 0.5) * 3); scene.add(b); }
    const bone = new T.Group(); place(bone, 'FILTH', 1.2, 0.12, 0.2); scene.add(bone);
    const sp = mk(new T.BoxGeometry(1.4, 0.06, 0.06), '#e8e0c8'); bone.add(sp); for (let i = 0; i < 5; i++) { const rb = mk(new T.BoxGeometry(0.04, 0.04, 0.42), '#e8e0c8'); rb.position.x = -0.5 + i * 0.25; bone.add(rb); } const hd = mk(new T.ConeGeometry(0.22, 0.4, 4), '#e8e0c8'); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.85; bone.add(hd);
    s.filth = { mag: [], flies: [] };
    for (let i = 0; i < 14; i++) { const m = mk(new T.SphereGeometry(0.07, 6, 4), '#f6f0e0'); m.scale.z = 2.2; scene.add(m); s.filth.mag.push(m); }
    for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#15121a')); scene.add(f); s.filth.flies.push(f); }
  }
  { /* swarm: insects vs one person */
    const n = 2600, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const a = rnd() * 6.283, r = Math.pow(rnd(), 0.6) * 9, y = 0.3 + rnd() * 6; p[i * 3] = ST.SWARM[0] + Math.cos(a) * r; p[i * 3 + 1] = y; p[i * 3 + 2] = -2 + Math.sin(a) * r * 0.7; }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(p, 3)); geo.setDrawRange(0, 0);
    s.swarm = { pts: new T.Points(geo, new T.PointsMaterial({ color: '#2a2a2a', size: 0.09 })), base: p.slice(0) }; scene.add(s.swarm.pts);
    s.swarm.man = chibi({ robe: P.teal, hair: '#2a2228' }); place(s.swarm.man, 'SWARM', 0, 0, 1.4); scene.add(s.swarm.man);
  }
  { /* fingernail dust vs the earth */
    const earth = new T.Group(); place(earth, 'NAIL', 0, 0, -2); scene.add(earth);
    const slab = mk(new T.CylinderGeometry(7.5, 6.8, 1.2, 16), '#6a8a4a'); slab.position.y = 0.6; earth.add(slab);
    for (let i = 0; i < 6; i++) { const m = mk(new T.ConeGeometry(1 + rnd(), 1.4 + rnd() * 1.2, 6), '#7a9a5a'); m.position.set(-5 + i * 2, 1.4, -2 - rnd() * 3); earth.add(m); }
    for (let i = 0; i < 10; i++) { const tr = tree(0.6 + rnd() * 0.4); tr.position.set((rnd() - 0.5) * 11, 1.2, (rnd() - 0.5) * 8); earth.add(tr); }
    s.nail = { earth, f: finger() }; place(s.nail.f, 'NAIL', 1.5, 5.0, 2.2); s.nail.f.rotation.y = -0.35; scene.add(s.nail.f);
    s.nail.f.traverse((o) => { if (o.isMesh && o.material.color && o.material.color.getHexString() === 'e8b890') o.material = M('#f2c86a', GOLDM); });
    s.nail.glow = softSprite('rgba(46,230,197,1)', 0.9); s.nail.glow.scale.setScalar(1.4); scene.add(s.nail.glow);
  }

  /* ---------- NAGA world (underwater) ---------- */
  { const bed = mk(new T.CylinderGeometry(14, 14, 0.6, 20), '#2a4a5a'); place(bed, 'NAGA', 0, -0.3, -3); scene.add(bed);
    const surf = new T.Mesh(new T.PlaneGeometry(40, 40), basic('#7fd0ff', { transparent: true, opacity: 0.25, side: T.DoubleSide })); surf.rotation.x = Math.PI / 2; place(surf, 'NAGA', 0, 9, -3); scene.add(surf);
    for (let i = 0; i < 14; i++) { const w = mk(new T.ConeGeometry(0.15, 1.5 + rnd() * 2, 4), ['#2f8a6a', '#3fa07a'][i % 2]); place(w, 'NAGA', -10 + rnd() * 20, 0.8, -9 + rnd() * 8); scene.add(w); }
    for (let i = 0; i < 8; i++) { const r = rock(0.6 + rnd() * 0.6, '#3a5a6a'); place(r, 'NAGA', -9 + rnd() * 18, 0.2, -8 + rnd() * 9); scene.add(r); }
    const shelf = mk(new T.BoxGeometry(5, 0.6, 3), '#6a7a6a'); place(shelf, 'NAGA', -6, 9.2, -5); scene.add(shelf);
    s.naga = { big: nagaModel(34, 0.42, '#2e9a7a', '#46c098'), small: nagaModel(22, 0.26, '#3a7aa0', '#5aa0c8'), bubbles: [] };
    scene.add(s.naga.big, s.naga.small);
    s.naga.human = chibi({ robe: '#e8e0cc', hair: '#2a2228', sash: '#2e9a7a', s: 1.1 }); scene.add(s.naga.human);
    s.naga.giver = chibi({ robe: '#e6b85c', hair: '#2a2228' }); place(s.naga.giver, 'NAGA', -6, 9.5, -4.4); scene.add(s.naga.giver);
    const bowl = mk(new T.SphereGeometry(0.24, 10, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), '#c8a060'); bowl.position.set(0, 0.62, 0.45); s.naga.giver.add(bowl);
    s.naga.path = (() => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push(new T.Vector3(ST.NAGA[0] - 6 + u * 6, 9.4 - u * 7.6, -4.4 + u * 4)); } const geo = new T.BufferGeometry().setFromPoints(pts); const ln = new T.Line(geo, new T.LineDashedMaterial({ color: P.gold, dashSize: 0.35, gapSize: 0.25, transparent: true, depthTest: false })); ln.computeLineDistances(); ln.renderOrder = 5; geo.setDrawRange(0, 0); scene.add(ln); return ln; })();
    s.naga.gar = garuda(); s.naga.gar.scale.setScalar(1.3); scene.add(s.naga.gar);
    for (let i = 0; i < 14; i++) { const b = new T.Mesh(new T.SphereGeometry(0.08 + rnd() * 0.08, 6, 5), basic('#cff4ff', { transparent: true, opacity: 0.6 })); b.userData.ph = rnd(); b.userData.x = -8 + rnd() * 16; b.userData.z = -6 + rnd() * 8; scene.add(b); s.naga.bubbles.push(b); }
    s.naga.labS = label('เกิดจากไข่', { w: 2.4, px: 76, color: '#9fd0ff' }); s.naga.labB = label('ผุดเกิด', { w: 2.2, px: 76, color: P.gold }); scene.add(s.naga.labS, s.naga.labB);
    s.naga.spark = softSprite('rgba(180,255,220,1)', 1); s.naga.spark.scale.setScalar(4); scene.add(s.naga.spark);
  }

  /* ---------- Koliya village (Seniya, Punna, the Buddha) ---------- */
  { for (const q of [[-5.5, -4.2], [5.8, -4.6], [0.5, -7.2]]) { const h = hut(2.6, 2.2, 1.7); place(h, 'KOL', q[0], 0, q[1]); scene.add(h); }
    const bt = bigTree(1.2, '#3f8f5a'); place(bt, 'KOL', -1.5, 0, -2.4); scene.add(bt);
    s.kol = { bud: buddha(1.25) }; place(s.kol.bud, 'KOL', -1.3, 0, -1.2); scene.add(s.kol.bud);
    s.kol.sen = seniyaModel(); scene.add(s.kol.sen); s.kol.senMonk = monk(1); scene.add(s.kol.senMonk);
    s.kol.pun = punnaModel(); scene.add(s.kol.pun);
    s.kol.vill = chibi({ robe: '#c97b9a', hair: '#2a2228', bun: true, s: 0.95 }); scene.add(s.kol.vill);
    s.kol.food = []; for (let i = 0; i < 4; i++) { const f = mk(new T.SphereGeometry(0.1, 6, 5), '#f6f0e0'); scene.add(f); s.kol.food.push(f); }
    s.kol.ghost = ANI.dog(); s.kol.ghost.scale.setScalar(1.6); s.kol.ghost.traverse((o) => { if (o.isMesh) o.material = basic('#b8c8ff', { transparent: true, opacity: 0.45, depthWrite: false }); }); scene.add(s.kol.ghost);
    s.kol.red = softSprite('rgba(255,80,60,1)', 0.7); s.kol.red.scale.setScalar(3.5); scene.add(s.kol.red);
    s.kol.tears = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.05, 6, 5), basic('#8fd8ff')); scene.add(d); s.kol.tears.push(d); }
    s.kol.halo = softSprite('rgba(255,215,120,1)', 0.9); s.kol.halo.scale.setScalar(4.5); scene.add(s.kol.halo);
    s.kol.feast = new T.Group(); place(s.kol.feast, 'KOL', 6.5, 0, 1.0); scene.add(s.kol.feast);
  }

  /* ---------- ocean: blind turtle + yoke, fish chain ---------- */
  { const sea = new T.Mesh(new T.PlaneGeometry(60, 60, 30, 30), M('#2a6ab0', { transparent: true, opacity: 0.72, emissive: new T.Color('#0a2a5a'), emissiveIntensity: 0.3 })); sea.rotation.x = -Math.PI / 2; place(sea, 'OCEAN', 0, 0.6, -6); scene.add(sea);
    const deep = mk(new T.BoxGeometry(60, 0.2, 60), '#0e2a4a'); place(deep, 'OCEAN', 0, -4, -6); scene.add(deep);
    s.ocean = { sea, yoke: yoke(), turtle: turtle(1.1), fish: [fish(0.6, '#f6d060'), fish(1.1, '#e86a4a'), fish(1.9, '#5a7aa0')], arrows: [] };
    scene.add(s.ocean.yoke, s.ocean.turtle); s.ocean.fish.forEach((f) => scene.add(f));
    for (let i = 0; i < 3; i++) { const a = new T.Group(); const sh = new T.Mesh(new T.BoxGeometry(1.4, 0.06, 0.06), basic('#e8f6ff', { transparent: true, opacity: 0.8 })); const hd = new T.Mesh(new T.ConeGeometry(0.14, 0.32, 5), basic('#e8f6ff', { transparent: true, opacity: 0.8 })); hd.rotation.z = -Math.PI / 2; hd.position.x = 0.8; a.add(sh, hd); scene.add(a); s.ocean.arrows.push(a); }
    const sun = softSprite('rgba(255,240,200,1)', 0.9); sun.scale.setScalar(6); place(sun, 'OCEAN', 8, 12, -24); scene.add(sun);
  }

  /* ---------- Palileyyaka forest ---------- */
  { for (let i = 0; i < 12; i++) { const a = -1.5 + i * 0.27, r = 7 + (i % 3); const tr = bigTree(0.7 + (i % 3) * 0.15, ['#2f7f4a', '#3f8f5a'][i % 2]); place(tr, 'PAL', Math.sin(a) * r, 0, -2 - Math.cos(a) * r * 0.6); scene.add(tr); }
    const sal = bigTree(1.35, '#3f9a5a'); place(sal, 'PAL', 0, 0, -2.6); scene.add(sal);
    s.pal = { bud: buddha(1.25), ele: elephant() }; place(s.pal.bud, 'PAL', 0, 0, -1.2); scene.add(s.pal.bud, s.pal.ele);
    s.pal.pot = mk(new T.CylinderGeometry(0.22, 0.16, 0.36, 10), '#a0603a'); scene.add(s.pal.pot);
    s.pal.drops = []; for (let i = 0; i < 8; i++) { const d = new T.Mesh(new T.SphereGeometry(0.06, 5, 4), basic('#9fe0ff')); scene.add(d); s.pal.drops.push(d); }
    s.pal.grass = []; for (let i = 0; i < 10; i++) { const g = mk(new T.ConeGeometry(0.12, 0.5, 4), '#5aa04a'); place(g, 'PAL', 1.4 + (i % 5) * 0.5, 0.25, 1.0 + Math.floor(i / 5) * 0.5); scene.add(g); s.pal.grass.push(g); }
    s.pal.orb = orb('rgba(255,215,140,1)'); s.pal.orb.scale.setScalar(1.6); scene.add(s.pal.orb);
  }

  /* ---------- Gaggara lake (dusk): sermon, frog, cowherd, sky palace ---------- */
  { const lake = new T.Mesh(new T.CircleGeometry(9, 30), M('#3a6aa0', { transparent: true, opacity: 0.9, emissive: new T.Color('#2a3a6a'), emissiveIntensity: 0.4 })); lake.rotation.x = -Math.PI / 2; lake.scale.y = 0.6; place(lake, 'GAG', 2, 0.05, 6); scene.add(lake);
    for (let i = 0; i < 6; i++) { const pad = new T.Mesh(new T.CircleGeometry(0.45 + rnd() * 0.2, 10), M('#3f9a4a')); pad.rotation.x = -Math.PI / 2; place(pad, 'GAG', -2 + rnd() * 8, 0.08, 4.2 + rnd() * 3); scene.add(pad); }
    const seat = mk(new T.CylinderGeometry(1.1, 1.2, 0.5, 12), '#c8a878'); place(seat, 'GAG', 0, 0.25, -2.2); scene.add(seat);
    const sal = bigTree(1.2, '#2f6a4a'); place(sal, 'GAG', -0.6, 0, -4.6); scene.add(sal);
    s.gag = { bud: buddha(1.25), aud: [], frog: frog(1.0), cow: cowherd(), dv: deva('#5fd16a'), rings: [] };
    place(s.gag.bud, 'GAG', 0, 0.5, -2.2); scene.add(s.gag.bud);
    for (let i = 0; i < 9; i++) { const lay = i % 3 === 0; const c = lay ? chibi({ robe: ['#e6b85c', '#c97b9a', '#7fb3d5'][i % 3 === 0 ? (i / 3) % 3 : 0], hair: '#2a2228', s: 0.8 }) : monk(0.8); setSit(c, true); anjali(c); const a = -1.1 + (i % 5) * 0.55, r = 3.4 + Math.floor(i / 5) * 1.3; place(c, 'GAG', Math.sin(a) * r, 0, -2.2 + Math.cos(a) * r * 0.75); face(c, -Math.sin(a), -Math.cos(a)); scene.add(c); s.gag.aud.push(c); }
    scene.add(s.gag.frog, s.gag.cow, s.gag.dv);
    for (let i = 0; i < 3; i++) { const r = new T.Mesh(new T.RingGeometry(0.9, 1.0, 36), basic('#ffe8a0', { transparent: true, opacity: 0.6, side: T.DoubleSide })); r.rotation.x = -Math.PI / 2; scene.add(r); s.gag.rings.push(r); }
    s.gag.orb = orb('rgba(170,255,170,1)'); s.gag.orb.scale.setScalar(1.3); scene.add(s.gag.orb);
    s.gag.flash = softSprite('rgba(255,255,230,1)', 1); s.gag.flash.scale.setScalar(3); scene.add(s.gag.flash);
    s.gag.beam = new T.Mesh(new T.CylinderGeometry(0.35, 0.6, 1, 10, 1, true), basic('#ffe9a0', { transparent: true, opacity: 0.35, side: T.DoubleSide, depthWrite: false })); scene.add(s.gag.beam);
    const sky = new T.Group(); place(sky, 'GAG', 4.4, 3.4, -9); scene.add(sky); s.gag.sky = sky;
    const cl = cloud(1.3); cl.position.y = -0.3; sky.add(cl); const pa = palace(); pa.scale.setScalar(0.55); pa.position.y = 0.1; sky.add(pa);
    const pg = softSprite('rgba(255,220,140,1)', 0.6); pg.scale.setScalar(7); pg.position.y = 1.2; sky.add(pg);
    s.gag.labFrog = label('สระคัคครา', { w: 2.6, px: 76, color: '#9fd0ff' }); place(s.gag.labFrog, 'GAG', 3.6, 1.2, 5.4); scene.add(s.gag.labFrog);
  }

  /* ---------- temple (present day ordination) ---------- */
  { const TP = new T.Group(); place(TP, 'TEMPLE'); scene.add(TP);
    const floor = mk(new T.BoxGeometry(20, 0.3, 14), '#7a2418'); floor.position.set(0, -0.15, -1); TP.add(floor);
    const wall = mk(new T.BoxGeometry(20, 12, 0.4), '#4a140e'); wall.position.set(0, 6, -6.6); TP.add(wall);
    for (const y of [2.2, 9.5]) { const tr = mk(new T.BoxGeometry(20, 0.18, 0.1), P.gold, GOLDM); tr.position.set(0, y, -6.35); TP.add(tr); }
    for (const x of [-8, 8]) { const pl = mk(new T.CylinderGeometry(0.45, 0.45, 12, 8), '#9a2a1a'); pl.position.set(x, 6, -4.5); TP.add(pl); }
    const glow = softSprite('rgba(255,200,90,1)', 0.55); glow.scale.set(9, 9, 1); glow.position.set(0, 4.6, -5.6); TP.add(glow);
    const ped = mk(new T.CylinderGeometry(2.0, 2.2, 0.9, 12), P.gold, GOLDM); ped.position.set(0, 0.45, -4.4); TP.add(ped);
    const bud = buddha(2.4); bud.position.set(0, 0.9, -4.4); TP.add(bud);
    s.tmp = { monks: [], g: TP };
    for (let i = 0; i < 5; i++) { const m = monk(0.95); setSit(m, true); m.position.set(-3.6 - (i % 2) * 1.1, 0, -2.4 + i * 1.0); m.rotation.y = Math.PI / 2; TP.add(m); s.tmp.monks.push(m); }
    s.tmp.nak = chibi({ robe: '#f8f8f2', sash: '#e8e8e0' }); setSit(s.tmp.nak, true); anjali(s.tmp.nak); s.tmp.nak.position.set(1.4, 0, 0.2); s.tmp.nak.rotation.y = -Math.PI / 2 + 0.35; TP.add(s.tmp.nak);
    for (const sx of [-1, 1]) { const nk = nagaModel(16, 0.3, P.gold, '#e0a030'); nk.scale.setScalar(1); TP.add(nk); setNaga(nk, (u) => [sx * 6.2, 0.4 + (1 - u) * 1.6 + Math.sin(u * 9) * 0.15, -3 + u * 6]); }
  }
  /* ---------- Vinaya flashback hut (naga monk) ---------- */
  { const h = hut(4.2, 3.4, 2.6, '#c9a77a', '#8f6a3a', { door: true }); place(h, 'HUT', 0, 0, -1.5); scene.add(h); s.hut = { h };
    for (const sx of [-1, 1]) { const w = mk(new T.BoxGeometry(0.9, 0.7, 0.06), '#2a1a10'); place(w, 'HUT', sx * 1.25, 1.45, 0.24); scene.add(w); }
    s.hut.naga = nagaModel(40, 0.36, '#2e9a7a', '#46c098'); scene.add(s.hut.naga);
    s.hut.youth = chibi({ robe: '#e8e0cc', hair: '#2a2228', sash: '#2e9a7a' }); scene.add(s.hut.youth);
    s.hut.ymonk = monk(1); s.hut.ymonk.userData.sash.material = M('#2e9a7a'); scene.add(s.hut.ymonk);
    s.hut.monks = [monk(1), monk(1)]; s.hut.monks.forEach((m) => scene.add(m));
    s.hut.bud = buddha(1.2); place(s.hut.bud, 'HUT', -5.2, 0, 0.8); scene.add(s.hut.bud);
    s.hut.tears = []; for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), basic('#8fd8ff')); scene.add(d); s.hut.tears.push(d); }
    const moon = softSprite('rgba(220,230,255,1)', 0.9); moon.scale.setScalar(3); place(moon, 'HUT', 5, 8, -10); scene.add(moon);
  }
  return s;
}
/* Part D: camera, backgrounds, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const TY = (k, dy) => k * TER + (dy || 0);
const SHOT = {
  cover: [[0, fr('GAG', 3.0, 2.6, 1.6, 8.6, 0.9, 0)]],
  h1: [[0, fr('KOL', 2.6, 1.3, 0.8, 7, 2.2, 0.6)]],
  h2: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  h3: [[0, fr('LAD', 0, TY(4, 1.8), 0, 13, 2.4, 0)], [2.2, fr('LAD', 0, TY(2, 1), 0, 20, 2.4, 0)]],
  l0: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  l1: [[0, fr('LAD', 0, TY(0, 1.6), 0.4, 10, 3.4, 0)]],
  l2: [[0, fr('LAD', 0, TY(1, 1.6), 0.4, 10, 3.4, 0)]],
  l3: [[0, fr('LAD', 0, TY(2, 1.9), 0, 10.5, 3, 0)]],
  l4: [[0, fr('LAD', 0, TY(3, 2), 0, 11, 2.8, 0)], [2.4, fr('LAD', 0, TY(4, 2), 0, 11, 2.6, 0)]],
  l5: [[0, fr('LAD', 0, TY(1.5, 0.6), 0, 15, 1.6, 0)]],
  l6: [[0, fr('LAD', 0, TY(1, 1.3), 1.4, 8.5, 1.8, 0)]],
  l7: [[0, fr('LAD', 0, TY(1, 2.6), 0, 15, 4, 0)]],
  p1: [[0, fr('GRASS', 0, 1.8, -1, 12, 4.2, 0)]],
  p2: [[0, fr('DUNG', 0, 1.4, -0.4, 10, 4, 0)]],
  p3: [[0, fr('DARK', 0, 2.2, -0.4, 10.5, 0.8, 0)]],
  p4: [[0, fr('WATER', 0, 1.2, -0.5, 10.5, 6, 0)]],
  p5: [[0, fr('FILTH', 0.4, 1.0, -0.4, 8.5, 4, 0)]],
  p6: [[0, fr('DARK', 4, 0.5, -1, 7, 8, -22)]],
  p7: [[0, fr('SWARM', 0, 2.6, -0.5, 9, 1.4, 0)], [3.0, fr('SWARM', 0, 3.4, -1, 17, 3, 0)]],
  p8: [[0, fr('NAIL', 1.4, 5.4, 2.2, 5.2, 3.2, 1.0)]],
  p9: [[0, fr('NAIL', 0, 3.4, -1, 17, 4.4, 0)]],
  p10: [[0, fr('NAIL', 0, 1.2, -1, 9, 9, 0)]],
  n1: [[0, fr('NAGA', 0, 2.8, -2, 12, 1.6, 0)]],
  n2: [[0, fr('NAGA', 0, 2.6, -2, 14, 2.4, 0)]],
  n3: [[0, fr('NAGA', 0.5, 1.8, -1.6, 8, 1.4, 0.5)]],
  n4: [[0, fr('NAGA', -3, 5.2, -3, 15, 0.8, 0)]],
  n5: [[0, fr('NAGA', 0.4, 4.6, -1.5, 12, -0.4, 0)]],
  n6: [[0, fr('NAGA', 0, 4.4, -2, 15, 0.4, 0)]],
  n7: [[0, fr('NAGA', 0, 8.6, -2, 13, 1.6, 0)]],
  d1: [[0, fr('LAD', 0, TY(2, 1.4), 0.6, 15, 1.8, 0)]],
  d2: [[0, fr('LAD', 0, TY(1.6, 0.6), 0, 20, 1.4, 0)]],
  d3: [[0, fr('KOL', 0, 1.8, 0, 11, 3, 0)]],
  d4: [[0, fr('KOL', 1.6, 1.0, 0.8, 7, 2.2, 0.6)]],
  d5: [[0, fr('KOL', 1.0, 1.6, 0.6, 9, 2.4, 0)]],
  d6: [[0, fr('KOL', -0.4, 1.8, -0.2, 9.5, 2.4, 0)]],
  d7: [[0, fr('KOL', 0.8, 2.0, 0.4, 11, 2.6, 0)]],
  d8: [[0, fr('KOL', 1.5, 1.2, 0.8, 6.2, 1.5, 0)]],
  u1: [[0, fr('OCEAN', 0, 1.5, -4, 16, 7, 0)]],
  u2: [[0, fr('OCEAN', 0, 1.0, -2, 10, 3.5, 0)]],
  u3: [[0, fr('OCEAN', 0, 1.2, -3, 13, 5, 0)]],
  u4: [[0, fr('OCEAN', 0, -1.6, -2, 9, 0.5, 0)]],
  u5: [[0, fr('OCEAN', 0, 6, -8, 14, 1, 0)]],
  g1: [[0, fr('PAL', 0, 1.8, -1, 12, 3, 0)]],
  g2: [[0, fr('PAL', 1.2, 1.8, -0.4, 10.5, 2.6, 0)]],
  g3: [[0, fr('PAL', 1, 2.4, -1, 14, 3, 0)]],
  g4: [[0, fr('GAG', 2.6, 1.0, 3.4, 7, 2.4, 0)]],
  g5: [[0, fr('GAG', 1.2, 1.6, 1.2, 12, 3.4, 0)]],
  g6: [[0, fr('GAG', 2.6, 1.3, 3.0, 7.5, 2, 0)]],
  g7: [[0, fr('GAG', 3.6, 4.4, -1.6, 14, 0.6, 0)]],
  g8: [[0, fr('GAG', 0.4, 1.8, -0.6, 9, 2, 0)]],
  r1: [[0, fr('GAG', 0.9, 1.9, -0.2, 7, 1.6, 0)]],
  r2: [[0, fr('KOL', -0.4, 1.4, -0.2, 8, 2, 0)]],
  r3: [[0, fr('KOL', 0.2, 1.4, 0.4, 7.5, 2, 0)]],
  r4: [[0, fr('KOL', 0, 4, -1, 13, 4, 0)]],
  r5: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  m1: [[0, fr('TEMPLE', -1, 2.2, -0.6, 11, 2.6, 0)]],
  m2: [[0, fr('HUT', 0, 1.6, 0.8, 11, 2.6, 0)]],
  m3: [[0, fr('HUT', 0, 1.8, -0.5, 12, 3, 0)]],
  m4: [[0, fr('HUT', -3, 1.6, 0.6, 11, 2.4, 0)]],
  m5: [[0, fr('TEMPLE', 1.0, 1.5, 0.4, 6.5, 1.4, 0.8)]],
  m6: [[0, fr('TEMPLE', 0, 3, -1, 15, 3, 0)]],
  recap: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  ask: [[0, fr('GAG', 2.4, 1.8, 3.0, 9, 2, 0)]],
};
const CUT = new Set(['h1', 'h2', 'n1', 'd1', 'd3', 'u1', 'g1', 'g4', 'r2', 'r5', 'm1', 'm2', 'm5', 'recap', 'ask']);
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

/* backgrounds */
const BG = {
  sky: ['#141a3e', '#3a3f8f'], day: ['#22386b', '#6f9fd0'], dusk: ['#1c1530', '#7a4a68'], deep: ['#04121e', '#0c3a52'], dark: ['#0a0a12', '#1c1a28'],
  ocean: ['#1a3a70', '#6fb0e0'], temple: ['#1a0d0a', '#4a1e14'], past: ['#2a1d12', '#7a5a34'], night: ['#070b1e', '#16224a'],
};
function bgKey(t) {
  const id = beatAt(t);
  if (['h2', 'h3', 'l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'd1', 'd2', 'r5', 'recap'].includes(id)) return 'sky';
  if (id === 'p3') return 'dark';
  if (id.startsWith('n')) return 'deep';
  if (id.startsWith('u')) return 'ocean';
  if (['cover', 'g4', 'g5', 'g6', 'g7', 'g8', 'r1', 'ask'].includes(id)) return 'dusk';
  if (['m1', 'm5', 'm6'].includes(id)) return 'temple';
  if (id === 'm2' || id === 'm4') return 'past';
  if (id === 'm3') return 'night';
  return 'day';
}
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const LT = { sky: [0.8, 0.8, '#e8e8ff'], day: [0.72, 0.85, '#fff4e0'], dusk: [0.6, 0.65, '#ffc8a0'], deep: [0.55, 0.5, '#9fe0ff'], dark: [0.6, 0.55, '#e0c8ff'], ocean: [0.8, 0.9, '#ffffff'], temple: [0.7, 0.7, '#ffe0c0'], past: [0.7, 0.75, '#ffd9a0'], night: [0.45, 0.45, '#a8b8ff'] };
const FOG = { sky: [60, 140], day: [40, 120], dusk: [30, 100], deep: [8, 40], dark: [14, 50], ocean: [30, 110], temple: [40, 120], past: [30, 100], night: [20, 80] };

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), bk = bgKey(t);
  { const q = LT[bk]; s.hemi.intensity = q[0]; s.sun.intensity = q[1]; s.sun.color.set(q[2]); s.fog.color.set(bgAt(t)[1]); s.fog.near = FOG[bk][0]; s.fog.far = FOG[bk][1]; }
  const ladOn = bk === 'sky'; vis(s.lad.g, ladOn);

  /* ---------- ladder ---------- */
  if (ladOn) {
    const L1 = s.lad;
    L1.fx.coals.forEach((c, i) => { c.scale.setScalar(0.85 + 0.25 * Math.sin(t * 3 + i)); });
    L1.fx.hellGlow.material.opacity = 0.55 + 0.25 * Math.sin(t * 2.4);
    L1.fx.flies.forEach((f, i) => { const a = t * (2 + (i % 3)) + i; f.position.set(Math.cos(a) * (1 + (i % 4) * 0.4), 0.7 + Math.sin(a * 1.7) * 0.4 + (i % 3) * 0.2, Math.sin(a) * (1 + (i % 4) * 0.4)); });
    graze(L1.cow, t); L1.dog.userData.tail.rotation.z = Math.sin(t * 9) * 0.4;
    const hiOf = () => { const g = GZ[id]; if (!g) return id === 'l5' ? 1 : -1; if (id === 'l4') return rel(t, 'l4') < 2.4 ? 3 : 4; return g.hi != null ? g.hi : -1; };
    const hi = (bk === 'sky' && ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'].includes(id)) ? hiOf() : -1;
    L1.ter.forEach((tr, k) => { tr.ring.material.opacity = k === hi ? 0.55 + 0.35 * Math.sin(t * 4) : 0; });
    /* l6: cow walks horizontally vs human standing upright */
    const l6 = inB(t, 'l6'); vis(L1.walker, l6); vis(L1.man, l6); vis(L1.barH, l6 && rel(t, 'l6') > 1.6); vis(L1.barV, l6 && rel(t, 'l6') > 2.4);
    if (l6) { const r = rel(t, 'l6'), x = U.lerp(-2.2, 0.8, sm(0, 2.2, r)); L1.walker.position.set(x, 0, 2.2); L1.walker.rotation.y = Math.PI / 2; trot(L1.walker, t, r < 2.2 ? 1 : 0); L1.man.position.set(1.9, 0, 2.6); face(L1.man, -0.3, 1); rest(L1.man);
      L1.barH.position.set(x, 1.55, 2.2); L1.barV.position.set(1.9, 1.0, 3.2); }
    /* orbs: h2 (animal up / human down), d1 (feaster drops to animals), d2 (three drops), r5 (mixed), recap */
    L1.orbs.forEach((o) => (o.visible = false));
    const fly = (o, k0, k1, k) => { o.visible = k > 0 && k < 1; o.position.set(o.userData.x || 0, U.lerp(TY(k0, 1.6), TY(k1, 1.6), U.easeIO(k)), 2.4); };
    if (inB(t, 'h2')) { const r = rel(t, 'h2'); L1.orbs[0].userData.x = -1.4; fly(L1.orbs[0], 1, 4, sm(0.6, 3.2, r)); L1.orbs[1].userData.x = 1.4; fly(L1.orbs[1], 3, 1, sm(1.2, 3.8, r)); }
    if (inB(t, 'd1')) { const r = rel(t, 'd1'); vis(L1.man, false); L1.orbs[2].userData.x = 0; fly(L1.orbs[2], 3, 1, sm(1.4, 3.4, r)); }
    if (inB(t, 'd2')) { const r = rel(t, 'd2'); [0, 1, 2].forEach((k, i) => { const o = L1.orbs[2 + i]; o.userData.x = -2 + i * 2; fly(o, 3, k, sm(0.8 + i * 0.4, 3.0 + i * 0.4, r)); }); }
    if (inB(t, 'r5') || inB(t, 'recap')) { const r = (t - at(id)) % 4.2; L1.orbs[0].userData.x = -1.6; fly(L1.orbs[0], 1, 4, sm(0.2, 3.2, r)); L1.orbs[1].userData.x = 1.6; fly(L1.orbs[1], 3, 1, sm(0.8, 3.8, r)); }
    /* d1 feaster on the human terrace */
    vis(L1.rest, !inB(t, 'd1'));
  }

  /* ---------- valley ---------- */
  s.grass.forEach((a, i) => { graze(a, t + i); if (i === 0 && inB(t, 'p1')) { const r = rel(t, 'p1'); setP(a, 'GRASS', U.lerp(-4.6, -2.6, sm(0, 2.6, r)), 0, -0.8); a.rotation.y = Math.PI / 2; trot(a, t, r < 2.6 ? 1 : 0); a.userData.head.rotation.x = r < 2.6 ? 0 : 0.55 + Math.sin(t * 2) * 0.12; } });
  { const D = s.dung; D.flies.forEach((f, i) => { const a = t * (2.2 + (i % 3)) + i; setP(f, 'DUNG', Math.cos(a) * (0.7 + (i % 3) * 0.3), 1.2 + Math.sin(a * 1.6) * 0.3, -0.6 + Math.sin(a) * 0.6); });
    const k = inB(t, 'p2') ? U.easeOut(sm(0.4, 3.2, rel(t, 'p2'))) : t > end('p2') ? 1 : 0;
    D.runners.forEach((rn, i) => { const r = U.lerp(6.5, 1.9 + (i % 2) * 0.3, k), a = rn.ang; setP(rn.a, 'DUNG', Math.sin(a) * r, 0, -0.6 + Math.cos(a) * r * 0.8); face(rn.a, -Math.sin(a), -Math.cos(a)); if (rn.a.userData.legs) trot(rn.a, t + i, k < 0.99 ? 1 : 0); else rn.a.position.y = Math.abs(Math.sin(t * 9 + i)) * 0.12 * (k < 0.99 ? 1 : 0.2); }); }
  { s.dark.worms.forEach((w, i) => wiggle(w, t, i)); s.dark.moths.forEach((m, i) => { const a = t * 1.3 + i * 1.1; setP(m, 'DARK', Math.cos(a) * 3.4, 4.8 + Math.sin(a * 2) * 0.5, 0.6 + Math.sin(a) * 0.8); m.userData.w.forEach((w, j) => (w.rotation.y = (j ? -1 : 1) * Math.sin(t * 20 + i) * 0.6)); m.rotation.y = -a; }); }
  { s.water.fish.forEach((f, i) => { const a = t * (0.7 + i * 0.12) + i * 1.3, r = 2.2 + (i % 3) * 1.1; setP(f, 'WATER', Math.cos(a) * r, -0.05 + 0.12 * (i % 2), -1 + Math.sin(a) * r * 0.7); f.rotation.y = -a; f.userData.tail.rotation.y = Math.sin(t * 10 + i) * 0.4; });
    s.water.turtle.userData.fl.forEach((f, i) => (f.rotation.y = Math.sin(t * 3 + i) * 0.3)); }
  { s.filth.mag.forEach((m, i) => { const a = i * 2.4; setP(m, 'FILTH', Math.cos(a) * (0.6 + (i % 4) * 0.5) + 1.2 * (i % 2 ? 0 : 1) - 0.3, 0.12, -0.4 + Math.sin(a) * (0.5 + (i % 3) * 0.4)); m.rotation.y = a + Math.sin(t * 4 + i) * 0.4; m.scale.z = 2.2 + Math.sin(t * 6 + i) * 0.5; });
    s.filth.flies.forEach((f, i) => { const a = t * (2.4 + (i % 3)) + i; setP(f, 'FILTH', Math.cos(a) * (0.8 + (i % 3) * 0.5), 1.1 + Math.sin(a * 1.7) * 0.3, -0.6 + Math.sin(a) * 0.8); }); }
  { const on = between(t, 'p6', 'p7'), n = inB(t, 'p7') ? Math.round(U.easeOut(sm(0.2, 4.0, rel(t, 'p7'))) * 2600) : 0; s.swarm.pts.geometry.setDrawRange(0, n); vis(s.swarm.pts, n > 0); void on;
    if (inB(t, 'p7')) { const pos = s.swarm.pts.geometry.attributes.position, b = s.swarm.base; for (let i = 0; i < n; i++) { pos.array[i * 3] = b[i * 3] + Math.sin(t * 3 + i) * 0.15; pos.array[i * 3 + 1] = b[i * 3 + 1] + Math.cos(t * 2.6 + i * 0.7) * 0.15; } pos.needsUpdate = true; }
    s.swarm.man.userData.head.rotation.y = Math.sin(t * 2) * 0.5; }
  { const N = s.nail, onN = between(t, 'p8', 'p10'); const r8 = inB(t, 'p8') ? rel(t, 'p8') : 9;
    setP(N.f, 'NAIL', 1.5, 5.0 + (inB(t, 'p8') ? (1 - U.easeOut(sm(0, 1.4, r8))) * 2.5 : 0), 2.2); N.f.visible = t < end('p10') + 0.6;
    N.f.userData.dust.getWorldPosition(N.glow.position); N.glow.visible = between(t, 'p9', 'p9'); N.glow.material.opacity = 0.6 + 0.3 * Math.sin(t * 5);
    N.earth.children[0].material.emissive = N.earth.children[0].material.emissive || new T.Color(); N.earth.children[0].material.emissive.set(P.coral); N.earth.children[0].material.emissiveIntensity = inB(t, 'p9') ? 0.25 + 0.15 * Math.sin(t * 3) : 0; void onN; }

  /* ---------- naga world ---------- */
  { const G = s.naga, on = bk === 'deep'; [G.big, G.small, G.human, G.giver, G.gar, G.path, G.labS, G.labB, G.spark].forEach((o) => vis(o, on)); G.bubbles.forEach((b) => vis(b, on));
    if (on) {
      G.bubbles.forEach((b) => { const k = (t * 0.12 + b.userData.ph) % 1; setP(b, 'NAGA', b.userData.x + Math.sin(t + b.userData.ph * 9) * 0.2, k * 9, b.userData.z); });
      const cx = ST.NAGA[0];
      /* big naga: swimming loop (n1,n2,n5,n7) / coiled (n3,n4,n6) */
      const coiled = inB(t, 'n3') || inB(t, 'n4') || inB(t, 'n6');
      if (coiled) setNaga(G.big, (u) => { const a = u * 13 + 0.3, r = 0.6 + u * 2.2; return [cx + 0.6 + Math.cos(a) * r, 0.45 + (1 - u) * 1.6 + Math.sin(t * 1.5) * 0.05 * (1 - u), -2 + Math.sin(a) * r * 0.8]; });
      else setNaga(G.big, (u) => { const ph = t * 0.9 - u * 3.2; return [cx + Math.cos(ph) * 4.2, 2.6 + Math.sin(ph * 2) * 0.8 + Math.sin(u * 14 - t * 4) * 0.25, -2 + Math.sin(ph) * 2.6]; });
      /* n1: transformation into a human */
      const tr = inB(t, 'n1') ? sm(2.4, 3.4, rel(t, 'n1')) : 0;
      G.big.scale.setScalar(Math.max(0.001, 1 - tr)); if (tr > 0.99) G.big.visible = false;
      G.human.visible = tr > 0.01; G.human.scale.setScalar(1.1 * U.easeBack(tr)); if (tr > 0) { const hp = G.big.userData.segs[0].position; G.human.position.set(cx + 0.5, 0.2, -1.2); face(G.human, 0, 1); }
      G.spark.visible = tr > 0 && tr < 1; G.spark.position.set(cx + 0.5, 1.4, -1.2); G.spark.material.opacity = Math.sin(tr * Math.PI);
      if (inB(t, 'n3')) { G.big.userData.hd.rotation.x = 0.35; }
      /* small naga (egg-born) */
      const sOn = between(t, 'n2', 'n6'); vis(G.small, sOn);
      let grab = inB(t, 'n6') ? sm(2.6, 4.6, rel(t, 'n6')) : 0;
      if (sOn) setNaga(G.small, (u) => { const ph = t * 1.3 - u * 3; const base = [cx - 3 + Math.cos(ph) * 1.6, 1.6 + Math.sin(ph * 2) * 0.4, 0.2 + Math.sin(ph) * 1.2]; if (grab > 0) { const gp = G.gar.position; return [U.lerp(base[0], gp.x + Math.sin(u * 8) * 0.3, grab), U.lerp(base[1], gp.y - 1.1 - u * 1.8, grab), U.lerp(base[2], gp.z, grab)]; } return base; });
      /* garuda */
      const gOn = between(t, 'n5', 'n6'); vis(G.gar, gOn); flap(G.gar, t, 7);
      if (gOn) { let x = cx + 2.5, y = 7.5, z = -1; if (inB(t, 'n5')) { const k = U.easeIO(sm(0.2, 3.2, rel(t, 'n5'))); x = U.lerp(cx + 8, cx + 0.6, k); y = U.lerp(11, 5.6, k); z = U.lerp(-6, -0.5, k); }
        if (inB(t, 'n6')) { const r = rel(t, 'n6'), dn = sm(1.0, 2.6, r), up = sm(2.8, 4.8, r); x = U.lerp(cx + 0.6, cx - 2.6, dn); y = U.lerp(5.6, 3.6, dn) + up * 7; z = U.lerp(-0.5, 0.4, dn); }
        G.gar.position.set(x, y, z); G.gar.rotation.set(0.25, -0.9, 0); }
      vis(G.labS, inB(t, 'n6') && rel(t, 'n6') < 3.2); vis(G.labB, inB(t, 'n6')); if (G.labS.visible) { const p = G.small.userData.segs[0].position; G.labS.position.set(p.x, p.y + 1.1, p.z); } { const p = G.big.userData.hd.position; G.labB.position.set(p.x, p.y + 1.4, p.z); }
      /* n4 giver on the shelf + dotted path down to the naga realm */
      vis(G.giver, inB(t, 'n4')); G.path.geometry.setDrawRange(0, inB(t, 'n4') ? Math.round(sm(1.2, 3.4, rel(t, 'n4')) * 41) : 0); vis(G.path, inB(t, 'n4'));
      if (inB(t, 'n4')) { face(G.giver, 0.3, 1); anjali(G.giver, 0.6); if (rel(t, 'n4') > 1.0 && rel(t, 'n4') < 3.6) BUB.push({ o: G.giver, dy: 2.0, txt: 'ขอไปเกิดเป็นนาค!', c: '#fff' }); }
    }
  }

  /* ---------- Koliya ---------- */
  { const K = s.kol, on = ['h1', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'r2', 'r3', 'r4'].includes(id) || (id === 'cover' ? false : false);
    [K.sen, K.pun, K.vill, K.ghost, K.red, K.halo, K.senMonk].forEach((o) => vis(o, false)); K.food.forEach((f) => vis(f, false)); K.tears.forEach((d) => vis(d, false));
    if (on) {
      const monkNow = inB(t, 'r3') ? rel(t, 'r3') > 1.0 : inB(t, 'r4');
      vis(K.sen, !monkNow); vis(K.senMonk, monkNow);
      const crawl = inB(t, 'h1') || inB(t, 'd3') || (inB(t, 'd4') && rel(t, 'd4') > 2.4);
      K.sen.rotation.set(0, 0, 0); rest(K.sen); setSit(K.sen, false); K.sen.userData.shins.visible = false;
      if (crawl) { const r = t - at(id); const x = inB(t, 'h1') ? U.lerp(1.4, 2.8, sm(0, 3.6, r)) : 1.6; setP(K.sen, 'KOL', x, 0.0, 0.8); K.sen.rotation.y = Math.PI / 2 + 0.35; crawlPose(K.sen, t, 1); if (inB(t, 'h1') && r > 3.6) K.sen.userData.head.rotation.x = -0.4 + Math.abs(Math.sin(t * 6)) * 0.4; }
      else if (inB(t, 'd4')) { /* curled up like a dog */ setP(K.sen, 'KOL', 1.6, 0.42, 0.8); K.sen.rotation.order = 'XYZ'; K.sen.rotation.set(0, 0.4, 1.45); K.sen.userData.arms.L.rotation.set(-1.2, 0, 0.4); K.sen.userData.arms.R.rotation.set(-1.2, 0, -0.4); }
      else if (inB(t, 'r2')) { setP(K.sen, 'KOL', 0.2, 0, 0.6); setSit(K.sen, true); anjali(K.sen); face(K.sen, -0.6, -1); }
      else { setP(K.sen, 'KOL', 1.6, 0, 0.8); setSit(K.sen, true); face(K.sen, -0.8, -0.4); K.sen.userData.head.rotation.x = inB(t, 'd8') ? 0.35 : 0; if (inB(t, 'd8') || (inB(t, 'd7') && rel(t, 'd7') > 3.6)) { K.sen.userData.arms.L.rotation.set(-2.2, 0, 0.3); K.sen.userData.arms.R.rotation.set(-2.2, 0, -0.3); } }
      /* food thrown on the ground in d4 */
      if (inB(t, 'd4')) { const r = rel(t, 'd4'); vis(K.vill, true); setP(K.vill, 'KOL', 3.6, 0, 1.6); face(K.vill, -1, -0.3); K.vill.userData.arms.R.rotation.set(-1.4 + sm(1.2, 1.6, r) * 0.9, 0, 0.2);
        K.food.forEach((f, i) => { const k = sm(1.4 + i * 0.05, 2.2 + i * 0.05, r); vis(f, k > 0); setP(f, 'KOL', U.lerp(3.2, 2.0 + i * 0.12, k), 1.0 * (1 - k) + Math.sin(k * Math.PI) * 0.6 + 0.08, U.lerp(1.6, 1.0 + (i % 2) * 0.2, k)); }); }
      /* Punna */
      const pOn = ['d5', 'd6', 'd7', 'd8'].includes(id); vis(K.pun, pOn);
      if (pOn) { setP(K.pun, 'KOL', 2.8, 0, -0.2); setSit(K.pun, true); face(K.pun, -1, -0.5); if (inB(t, 'd5') && rel(t, 'd5') > 1.6) { K.pun.userData.arms.R.rotation.set(-1.3, 0, 0.5); BUB.push({ o: K.pun, dy: 1.9, txt: 'เขาจะไปเกิดที่ไหน?', c: '#fff' }); } }
      if (inB(t, 'd6')) { const r = rel(t, 'd6'); if (r > 0.4 && r < 2.6) BUB.push({ o: K.bud, dy: 2.4, txt: 'พอเถิด อย่าถามเลย', c: '#fff' }); if (r > 2.8) BUB.push({ o: K.pun, dy: 1.9, txt: 'ขอเถิดพระองค์…', c: '#fff' }); }
      if (inB(t, 'd7')) { const r = rel(t, 'd7'), g = sm(0.6, 1.8, r); vis(K.ghost, g > 0); setP(K.ghost, 'KOL', 3.4, 0, 2.0); K.ghost.rotation.y = -0.8; K.ghost.traverse((o) => { if (o.isMesh) o.material.opacity = 0.45 * g; });
        const rd = sm(3.0, 4.0, r); vis(K.red, rd > 0); setP(K.red, 'KOL', 1.6, 0.3, 0.8); K.red.material.opacity = 0.6 * rd; }
      if (inB(t, 'd8')) { const r = rel(t, 'd8'); K.sen.getWorldPosition(s.anchorV); K.tears.forEach((d, i) => { const k = ((r * 0.8 + i * 0.17) % 1); vis(d, true); d.position.set(s.anchorV.x + (i % 2 ? 0.16 : -0.16), s.anchorV.y + 1.3 - k * 1.0, s.anchorV.z + 0.35); }); BUB.push({ o: K.sen, dy: 1.8, txt: 'ฮือ…', c: '#fff' }); }
      if (inB(t, 'r2') && rel(t, 'r2') > 0.8 && rel(t, 'r2') < 3.6) BUB.push({ o: K.sen, dy: 1.8, txt: 'ขอบวช ยอมรอ 4 ปี', c: '#fff' });
      if (monkNow) { setP(K.senMonk, 'KOL', 0.4, 0, 0.6); setSit(K.senMonk, true); lapHands(K.senMonk); face(K.senMonk, 0, 1); K.senMonk.userData.eyes.forEach((e) => (e.scale.y = 0.2));
        vis(K.halo, true); setP(K.halo, 'KOL', 0.4, 1.3, 0.4); K.halo.material.opacity = 0.5 + 0.3 * Math.sin(t * 3); K.halo.scale.setScalar(4 + (inB(t, 'r4') ? 2 * sm(0, 3, rel(t, 'r4')) : 0)); }
    }
  }

  /* ---------- ocean ---------- */
  { const O = s.ocean, on = bk === 'ocean'; [O.yoke, O.turtle].forEach((o) => vis(o, on)); O.fish.forEach((f) => vis(f, on && inB(t, 'u4'))); O.arrows.forEach((a) => vis(a, on && (inB(t, 'u1') || inB(t, 'u3'))));
    if (on) {
      const pos = O.sea.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.5 + t * 1.5) * 0.12 + Math.cos(y * 0.4 + t) * 0.1); } pos.needsUpdate = true;
      const yx = Math.sin(t * 0.35) * 1.4, yz = -3 + Math.cos(t * 0.27) * 0.8; setP(O.yoke, 'OCEAN', yx, 0.72 + Math.sin(t * 1.5) * 0.06, yz); O.yoke.rotation.y = Math.sin(t * 0.3) * 0.6;
      O.arrows.forEach((a, i) => { const k = (t * 0.25 + i / 3) % 1; setP(a, 'OCEAN', -7 + k * 14, 1.6 + i * 0.5, -5 + i * 1.6); a.rotation.y = 0; a.children.forEach((c) => (c.material.opacity = Math.sin(k * Math.PI) * 0.8)); });
      let ty = -2.2; const tx = yx + 1.3, tz = yz + 0.9;
      if (inB(t, 'u2')) { const r = rel(t, 'u2'); ty = U.lerp(-2.2, 0.7, sm(0.8, 2.4, r)) - sm(3.6, 4.8, r) * 2.9; }
      if (inB(t, 'u3')) { const r = rel(t, 'u3'); ty = U.lerp(-2.2, 0.7, sm(1.4, 2.8, r)) - sm(4.0, 5.4, r) * 2.9; }
      if (inB(t, 'u1')) ty = -2.2;
      setP(O.turtle, 'OCEAN', tx, ty, tz); O.turtle.rotation.set(-0.5 * (ty < 0.5 ? 1 : 0), -0.4, 0); O.turtle.userData.fl.forEach((f, i) => (f.rotation.y = Math.sin(t * 3 + i) * 0.4));
      if (inB(t, 'u4')) { const r = rel(t, 'u4'); const chase = (f, i, x0) => { setP(f, 'OCEAN', x0 + r * 1.1, -1.6 + Math.sin(t * 2 + i) * 0.15, -2 + i * 0.05); f.rotation.y = Math.PI / 2; f.userData.tail.rotation.y = Math.sin(t * 12 + i) * 0.5; };
        chase(O.fish[0], 0, -1.5); chase(O.fish[1], 1, -3.6); chase(O.fish[2], 2, -6.6);
        const eat1 = sm(2.2, 2.6, r); O.fish[0].scale.setScalar(Math.max(0.001, 0.6 * (1 - eat1))); O.fish[0].visible = eat1 < 1; }
    }
  }

  /* ---------- Palileyyaka ---------- */
  { const Pp = s.pal, on = ['g1', 'g2', 'g3'].includes(id); [Pp.bud, Pp.ele, Pp.pot, Pp.orb].forEach((o) => vis(o, on)); Pp.drops.forEach((d) => vis(d, false));
    if (on) {
      const leave = inB(t, 'g3') ? sm(0.4, 2.2, rel(t, 'g3')) : 0; Pp.bud.visible = leave < 0.99; Pp.bud.scale.setScalar(1.25 * Math.max(0.001, 1 - leave));
      const ex = inB(t, 'g1') ? 9 : inB(t, 'g2') ? U.lerp(6, 2.6, U.easeIO(sm(0, 2.0, rel(t, 'g2')))) : 2.6; setP(Pp.ele, 'PAL', ex, 0, 0.6); Pp.ele.rotation.y = -Math.PI / 2 - 0.25; trot(Pp.ele, t, inB(t, 'g2') && rel(t, 'g2') < 2 ? 0.6 : 0);
      const tr = Pp.ele.userData.trunk, lift = inB(t, 'g2') ? sm(2.2, 3.2, rel(t, 'g2')) * (1 - sm(4.8, 5.6, rel(t, 'g2'))) : 0;
      tr.forEach((p, i) => (p.rotation.x = -lift * (0.35 + i * 0.05) + Math.sin(t * 2 + i) * 0.05));
      tr[tr.length - 1].getWorldPosition(s.anchorV); Pp.pot.visible = on && t < at('g3'); Pp.pot.position.set(s.anchorV.x, s.anchorV.y - 0.25, s.anchorV.z);
      if (inB(t, 'g2') && rel(t, 'g2') > 3.4) Pp.drops.forEach((d, i) => { const k = ((rel(t, 'g2') * 1.4 + i / 8) % 1); vis(d, true); d.position.set(U.lerp(s.anchorV.x, ST.PAL[0] + 0.7, k), s.anchorV.y - 0.3 - k * 0.6, U.lerp(s.anchorV.z, ST.PAL[2] - 0.5, k)); });
      Pp.grass.forEach((g, i) => { const cut = inB(t, 'g2') ? sm(0.8 + i * 0.12, 1.2 + i * 0.12, rel(t, 'g2')) : t > end('g2') ? 1 : 0; g.scale.y = Math.max(0.05, 1 - cut); });
      /* g3: elephant lies down, an orb rises */
      const lie = inB(t, 'g3') ? sm(2.4, 3.6, rel(t, 'g3')) : 0; Pp.ele.rotation.z = lie * 0.25; Pp.ele.position.y = -lie * 0.5; Pp.ele.userData.head.rotation.x = lie * 0.4;
      const up = inB(t, 'g3') ? sm(3.6, 5.6, rel(t, 'g3')) : 0; Pp.orb.visible = up > 0; setP(Pp.orb, 'PAL', 2.4, 1.8 + up * 5.5, 0.6);
    }
  }

  /* ---------- Gaggara lake ---------- */
  { const G = s.gag, on = ['cover', 'g4', 'g5', 'g6', 'g7', 'g8', 'r1', 'ask'].includes(id); [G.bud, G.frog, G.cow, G.dv, G.orb, G.flash, G.beam, G.sky, G.labFrog].forEach((o) => vis(o, on)); G.aud.forEach((a) => vis(a, on)); G.rings.forEach((r) => vis(r, false));
    if (on) {
      const fx = 2.6, fz = 3.4; setP(G.frog, 'GAG', fx, 0.08 + Math.abs(Math.sin(t * 2.2)) * 0.04, fz); if (id === 'cover' || id === 'ask') face(G.frog, -0.55, 0.85); else face(G.frog, -1, 0.35); G.frog.scale.setScalar(id === 'cover' || id === 'ask' ? 1.6 : 1.1);
      if (inB(t, 'g5')) { const r = rel(t, 'g5'); setP(G.frog, 'GAG', U.lerp(fx + 0.6, fx, sm(0.5, 1.4, r)), 0.08 + Math.sin(sm(0.5, 1.4, r) * Math.PI) * 0.45, U.lerp(fz + 0.6, fz, sm(0.5, 1.4, r))); }
      G.labFrog.visible = false;
      const preach = ['g4', 'g5', 'g6', 'cover', 'ask'].includes(id);
      if (preach) G.rings.forEach((rg, i) => { const k = (t * 0.45 + i / 3) % 1; vis(rg, true); setP(rg, 'GAG', 0, 0.6, -2.2); rg.scale.setScalar(1 + k * 6.5); rg.material.opacity = 0.5 * (1 - k); });
      /* cowherd leaning on the staff */
      const cOn = ['g5', 'g6'].includes(id); vis(G.cow, cOn);
      if (cOn) { setP(G.cow, 'GAG', fx + 1.2, 0, fz - 0.6); face(G.cow, -1, -0.8); const lean = inB(t, 'g6') ? sm(1.2, 2.6, rel(t, 'g6')) : 0; G.cow.userData.arms.R.rotation.set(-0.35 - lean * 0.25, 0, 0.5 + lean * 0.35); G.cow.rotation.z = lean * 0.12; }
      /* g6: flash, frog becomes light */
      const fl = inB(t, 'g6') ? sm(2.6, 3.0, rel(t, 'g6')) * (1 - sm(3.6, 4.6, rel(t, 'g6'))) : 0; G.flash.visible = fl > 0; setP(G.flash, 'GAG', fx, 0.5, fz); G.flash.material.opacity = fl; G.flash.scale.setScalar(2 + fl * 3);
      const gone = (inB(t, 'g6') && rel(t, 'g6') > 3.0) || ['g7', 'g8', 'r1'].includes(id); G.frog.visible = !gone;
      const orbK = inB(t, 'g6') ? sm(3.0, 3.6, rel(t, 'g6')) * 0.12 : inB(t, 'g7') ? 0.12 + 0.88 * U.easeIO(sm(0.2, 2.6, rel(t, 'g7'))) : 0; G.orb.visible = orbK > 0 && orbK < 1;
      if (G.orb.visible) { const sk = G.sky.position; G.orb.position.set(U.lerp(ST.GAG[0] + fx, sk.x, orbK), U.lerp(0.6, sk.y + 0.8, orbK), U.lerp(ST.GAG[2] + fz, sk.z, orbK)); }
      /* light beam (cover + g7) */
      const bOn = id === 'cover' || id === 'ask' || (inB(t, 'g7') && rel(t, 'g7') < 3.2); vis(G.beam, bOn);
      if (bOn) { const a = new T.Vector3(ST.GAG[0] + fx, 0.4, ST.GAG[2] + fz), b = G.sky.position.clone(); b.y += 0.6; const mid = a.clone().add(b).multiplyScalar(0.5); G.beam.position.copy(mid); G.beam.scale.set(1, a.distanceTo(b), 1); G.beam.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), b.clone().sub(a).normalize()); G.beam.material.opacity = 0.22 + 0.1 * Math.sin(t * 3); }
      /* deva: appears at the palace (g7), descends & bows (g8, r1) */
      const dOn = (inB(t, 'g7') && rel(t, 'g7') > 2.6) || inB(t, 'g8') || inB(t, 'r1'); vis(G.dv, dOn);
      if (dOn) { let p; if (inB(t, 'g7')) { const k = U.easeIO(sm(2.8, dur('g7'), rel(t, 'g7'))); const sk = G.sky.position; p = [U.lerp(sk.x - ST.GAG[0], 1.4, k), U.lerp(sk.y + 0.4, 0, k), U.lerp(sk.z - ST.GAG[2], -0.4, k)]; } else p = [1.4, 0, -0.4];
        setP(G.dv, 'GAG', p[0], p[1], p[2]); face(G.dv, -1, -1.2); G.dv.scale.setScalar(1.05); setSit(G.dv, !inB(t, 'g7')); if (!inB(t, 'g7')) anjali(G.dv); else rest(G.dv); G.dv.userData.glow.material.opacity = 0.55 + 0.25 * Math.sin(t * 3); }
      if (inB(t, 'g8') && rel(t, 'g8') > 3.0) BUB.push({ o: G.bud, dy: 2.4, txt: 'ท่านเป็นใคร?', c: '#fff' });
      if (inB(t, 'r1')) BUB.push({ o: G.dv, dy: 2.0, txt: 'ชาติก่อน…ข้าคือกบ', c: '#fff' });
      if (inB(t, 'g5') && rel(t, 'g5') > 2.4) BUB.push({ o: G.frog, dy: 1.0, txt: '♪', c: '#fff', big: true });
    }
  }

  /* ---------- temple + Vinaya hut ---------- */
  { const tOn = ['m1', 'm5', 'm6'].includes(id); vis(s.tmp.g, tOn);
    if (tOn) { const r = t - at(id); s.tmp.monks.forEach((m, i) => (m.userData.head.rotation.x = Math.sin(t * 1.5 + i) * 0.05));
      if (inB(t, 'm1')) { if (r > 1.2 && r < 3.6) BUB.push({ o: s.tmp.monks[2], dy: 1.7, txt: 'มนุสฺโสสิ?', c: '#fff' }); if (r > 3.6) BUB.push({ o: s.tmp.nak, dy: 1.7, txt: 'อาม ภนฺเต', c: '#fff' }); } }
    const H = s.hut, hOn = ['m2', 'm3', 'm4'].includes(id); [H.h, H.naga, H.youth, H.ymonk, H.bud].concat(H.monks).forEach((o) => vis(o, hOn)); H.tears.forEach((d) => vis(d, false));
    if (hOn) {
      vis(H.naga, false); vis(H.youth, false); vis(H.ymonk, false); vis(H.bud, inB(t, 'm4'));
      H.monks.forEach((m, i) => { setP(m, 'HUT', -2.6 + i * 1.3, 0, 1.8); face(m, 1, 0.3); rest(m); vis(m, inB(t, 'm2') || inB(t, 'm3')); });
      if (inB(t, 'm2')) { const r = rel(t, 'm2'), k = sm(0, 2.0, r); vis(H.youth, r < 3.2); vis(H.ymonk, r >= 3.2); setP(H.youth, 'HUT', U.lerp(4, 1.4, k), 0, 1.8); face(H.youth, -1, 0.2); if (r < 2) walk(H.youth, t, 1); else rest(H.youth); if (r > 2.0 && r < 3.2) BUB.push({ o: H.youth, dy: 2.0, txt: 'ขอบวชด้วยครับ', c: '#fff' }); setP(H.ymonk, 'HUT', 1.4, 0, 1.8); face(H.ymonk, -1, 0.2); }
      if (inB(t, 'm3')) { const r = rel(t, 'm3'), fill = U.easeOut(sm(0.4, 2.0, r)); vis(H.naga, true);
        setNaga(H.naga, (u) => { const a = u * 22, rr = 1.6 * (1 - u * 0.5); if (u < 0.12) { const k = u / 0.12; return [ST.HUT[0] + U.lerp(1.25 + 1.8 * fill, 1.25, k), 1.45 + Math.sin(k * 6) * 0.1, U.lerp(0.9, -0.2, k)]; } if (u > 0.9) { const k = (u - 0.9) / 0.1; return [ST.HUT[0] - 1.25 - k * 1.6 * fill, 1.45, U.lerp(-0.2, 0.9, k)]; } return [ST.HUT[0] + Math.cos(a) * rr, 0.4 + u * 2.0, -1.5 + Math.sin(a) * rr * 0.8]; });
        H.naga.scale.setScalar(1); H.monks[0].userData.arms.L.rotation.set(-2.4, 0, -0.3); H.monks[0].userData.arms.R.rotation.set(-2.4, 0, 0.3);
        if (r > 2.2) BUB.push({ o: H.monks[0], dy: 2.0, txt: 'งูเต็มกุฏิ!!', c: '#ffb3b3' }); }
      if (inB(t, 'm4')) { const r = rel(t, 'm4'), go = sm(2.6, dur('m4'), r); vis(H.youth, r < 2.6); setP(H.youth, 'HUT', -3.2, 0, 1.4); face(H.youth, -1, -0.3); H.youth.userData.head.rotation.x = 0.35;
        if (r < 2.6) H.tears.forEach((d, i) => { vis(d, true); const k = (r * 0.9 + i / 6) % 1; H.youth.getWorldPosition(s.anchorV); d.position.set(s.anchorV.x + (i % 2 ? 0.15 : -0.15) + 0.2, s.anchorV.y + 1.4 - k, s.anchorV.z + 0.35); });
        if (r > 0.5 && r < 2.4) BUB.push({ o: H.bud, dy: 2.3, txt: 'นาค บวชไม่ได้', c: '#fff' });
        if (r >= 2.6) { vis(H.naga, true); setNaga(H.naga, (u) => [ST.HUT[0] - 3.2 + go * 9 + u * 4.2 - Math.sin(u * 10 + t * 4) * 0.3 * 0, 0.4, 1.4 + Math.sin(u * 12 - t * 5) * 0.5]); H.naga.userData.hd.rotation.y = -Math.PI / 2; } }
    }
  }

  /* ---------- camera + bubble projection ---------- */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
/* Part E: HUD + audio + run */
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
  const n = CHAP.length, w = 120, gap = 8, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 22); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = big ? 74 : 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function dots(g, t, label, n, cur, col) {
  const y = 420; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * 70; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += 70; }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function gauge(g, t, id) {
  const G = GZ[id]; if (!G) return;
  const six = !!G.six, n = six ? 6 : 5, w = six ? 112 : 124, gap = 10, who = G.who || '5 ทางไป';
  g.save(); g.font = F(700, 30); const lw = g.measureText(who).width + 34;
  const total = lw + 14 + n * w + (n - 1) * gap; let x0 = 540 - total / 2; const y = 422, h = 48;
  g.fillStyle = G.who ? P.gold : 'rgba(255,255,255,.18)'; rr(g, x0, y, lw, h, 24); g.fill(); g.fillStyle = G.who ? '#0f1630' : '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(who, x0 + lw / 2, y + h / 2 + 2);
  const cx0 = x0 + lw + 14, cx = (k) => cx0 + k * (w + gap) + w / 2;
  const hiK = id === 'l4' ? (rel(t, 'l4') < 2.4 ? 3 : 4) : G.hi;
  for (let k = 0; k < n; k++) {
    const on = k === hiK || k === G.at || (G.cmp === k), x = cx0 + k * (w + gap);
    g.globalAlpha = 0.95; g.fillStyle = on ? LV[k][1] : 'rgba(15,22,48,.72)'; rr(g, x, y, w, h, 16); g.fill(); g.strokeStyle = LV[k][1]; g.lineWidth = 3; g.stroke();
    g.fillStyle = on ? '#0f1630' : '#fff'; g.font = F(on ? 800 : 600, 28); g.fillText(LV[k][0], x + w / 2, y + h / 2 + 2);
  }
  if (G.cmp != null) { g.fillStyle = P.coral; g.font = F(800, 34); g.fillText('<', (cx(1) + cx(2)) / 2 + 0, y - 18); }
  if (G.at != null) { g.fillStyle = P.gold; g.beginPath(); g.moveTo(cx(G.at) - 12, y - 16); g.lineTo(cx(G.at) + 12, y - 16); g.lineTo(cx(G.at), y - 2); g.fill(); }
  if (G.from != null) {
    const k = U.clamp((rel(t, id) - G.t0) / 1.3), tos = Array.isArray(G.to) ? G.to : [G.to];
    tos.forEach((to, j) => {
      const kk = U.clamp(k * 1.25 - j * 0.25), a = cx(G.from), b = cx(to), up = to > G.from, peak = y - 30 - Math.abs(to - G.from) * 6;
      const lim = G.x ? 0.62 : 1, kd = Math.min(kk, lim); if (kd <= 0) return;
      g.strokeStyle = up ? P.teal : P.coral; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
      for (let i = 0; i <= 30; i++) { const u = i / 30 * kd, px = U.lerp(a, b, u), py = y - 4 - Math.sin(u * Math.PI) * (y - 4 - peak); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
      const u = kd, px = U.lerp(a, b, u), py = y - 4 - Math.sin(u * Math.PI) * (y - 4 - peak);
      if (G.x && kk >= lim) { g.strokeStyle = P.coral; g.lineWidth = 7; g.beginPath(); g.moveTo(px - 14, py - 14); g.lineTo(px + 14, py + 14); g.moveTo(px + 14, py - 14); g.lineTo(px - 14, py + 14); g.stroke(); }
      else { g.fillStyle = up ? P.teal : P.coral; g.beginPath(); g.arc(px, py, 9, 0, 6.283); g.fill(); }
    });
  }
  g.restore();
}
function births(g, t, id) {
  const lab = ['ไข่', 'ครรภ์', 'เหงื่อไคล', 'ผุดเกิด'], w = 170, gap = 14, x0 = 540 - (4 * w + 3 * gap) / 2, y = 392, h = 100;
  for (let i = 0; i < 4; i++) {
    const k = id === 'n2' ? U.clamp((rel(t, 'n2') - 0.9 - i * 0.7) / 0.3) : 1; if (k <= 0) continue;
    const x = x0 + i * (w + gap), hl = id === 'n6' ? (i === 0 ? P.teal : i === 3 ? P.gold : null) : null;
    g.save(); g.globalAlpha = k; g.fillStyle = hl || 'rgba(15,22,48,.8)'; rr(g, x, y, w, h, 22); g.fill(); g.strokeStyle = hl || 'rgba(255,255,255,.3)'; g.lineWidth = 3; g.stroke();
    const ix = x + 44, iy = y + h / 2, ic = hl ? '#0f1630' : '#bfe8ff'; g.fillStyle = ic; g.strokeStyle = ic; g.lineWidth = 4;
    if (i === 0) { g.beginPath(); g.ellipse(ix, iy, 17, 22, 0, 0, 6.283); g.fill(); }
    if (i === 1) { g.beginPath(); g.arc(ix, iy, 21, 0, 6.283); g.stroke(); g.beginPath(); g.arc(ix + 3, iy + 2, 8, 0, 6.283); g.fill(); }
    if (i === 2) { g.beginPath(); g.moveTo(ix, iy - 24); g.quadraticCurveTo(ix + 20, iy + 2, ix, iy + 18); g.quadraticCurveTo(ix - 20, iy + 2, ix, iy - 24); g.fill(); }
    if (i === 3) { g.beginPath(); for (let j = 0; j < 10; j++) { const a = j * Math.PI / 5 - Math.PI / 2, r = j % 2 ? 9 : 23; g.lineTo(ix + Math.cos(a) * r, iy + Math.sin(a) * r); } g.closePath(); g.fill(); }
    g.font = F(700, lab[i].length > 5 ? 28 : 34); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = hl ? '#0f1630' : '#fff'; g.fillText(lab[i], x + 76, iy + 2);
    g.restore();
  }
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 290, 960, 1170, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'ภพภูมิสัตว์', 540, 448, 80, P.gold, 800);
  const rows = ['5 ทางไป: สัตว์ = หลุมคูถ แย่กว่าเปรต', 'สัตว์ 5 กลุ่ม + นาค ครุฑ ก็อยู่ภพนี้', 'ตายจากคนแล้วกลับมาเป็นคน = ฝุ่นปลายเล็บ', 'เต่าตาบอด 100 ปี ยังง่ายกว่า', 'กบเป็นเทพ เสนิยะเป็นอรหันต์: เพราะใจ'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.8) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 4 ? P.gold : P.teal; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 23); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (มัชฌิมนิกาย 12, 57, 129 · สังยุตตนิกาย 29, 30, 56 · อังคุตตรนิกาย 8.40 · อุทาน 4.5 · วิมานวัตถุ 5.1 · วินัย มหาวรรค)', 540, 1352);
  g.fillText('อรรถกถาธรรมบท/วิมานวัตถุ · Mora et al. 2011 · Smithsonian · ภาพจำลองตามคติความเชื่อ', 540, 1390);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (id === 'm2' || id === 'm4') { g.fillStyle = 'rgba(120,80,30,0.14)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('l0') && t < at('recap')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (inB(t, 'd6')) dots(g, t, 'ถามครั้งที่', 3, 1 + Math.min(2, Math.floor(rel(t, 'd6') / 1.5)), P.gold);
  else if (inB(t, 'n2') || inB(t, 'n6')) births(g, t, id);
  else gauge(g, t, id);
  if (id === 'm2' || id === 'm3' || id === 'm4') { g.save(); g.font = F(700, 34); const w = g.measureText('ย้อนไปสมัยพุทธกาล').width + 50; g.fillStyle = 'rgba(255,220,170,.92)'; rr(g, 540 - w / 2, 410, w, 56, 28); g.fill(); g.fillStyle = '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ย้อนไปสมัยพุทธกาล', 540, 439); g.restore(); }
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
VE.registerSfx('croak', (tt) => { VE.audio.tone(tt, 260, 0.09, { type: 'triangle', f2: 190, vol: 0.04, rel: 0.06 }); VE.audio.tone(tt + 0.16, 250, 0.09, { type: 'triangle', f2: 180, vol: 0.035, rel: 0.06 }); });
VE.registerSfx('trumpet', (tt) => { VE.audio.tone(tt, 520, 0.7, { type: 'triangle', f2: 820, vol: 0.03, att: 0.08, rel: 0.3 }); VE.audio.noise(tt, 0.6, { type: 'bandpass', f: 900, q: 1.2, vol: 0.02 }); });
VE.registerSfx('flap', (tt) => { for (let i = 0; i < 3; i++) VE.audio.noise(tt + i * 0.22, 0.14, { type: 'bandpass', f: 600, f2: 900, q: 0.8, vol: 0.04 }); });
const AUD = [[0.1, 'croak']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 12) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
['l1', 'l3', 'l4'].forEach((id) => AUD.push([at(id, 0.3), 'soft'])); AUD.push([at('l2', 0.3), 'bell'], [at('l5', 0.6), 'bell'], [at('l6', 1.6), 'pop'], [at('l6', 2.4), 'pop']);
['p1', 'p2', 'p3', 'p4', 'p5'].forEach((id) => AUD.push([at(id, 0.2), 'pop'])); AUD.push([at('p4', 0.6), 'water', { dur: 2 }]);
for (let i = 0; i < 8; i++) AUD.push([at('p7', 0.4 + i * 0.45), 'tok']);
AUD.push([at('p8', 1.2), 'bell'], [at('p9', 0.5), 'chime'], [at('p9', 0.7), 'shimmer']);
AUD.push([at('n1', 2.4), 'shimmer'], [at('n4', 1.2), 'soft'], [at('n5', 0.6), 'flap'], [at('n5', 2.0), 'flap'], [at('n6', 1.0), 'flap'], [at('n6', 3.0), 'flap']);
for (let i = 0; i < 4; i++) AUD.push([at('n2', 0.9 + i * 0.7), 'tok']);
for (let i = 0; i < 3; i++) AUD.push([at('d6', i * 1.5 + 0.1), 'bell']);
AUD.push([at('d4', 1.6), 'tok'], [at('d7', 0.8), 'soft'], [at('d7', 3.0), 'soft']);
AUD.push([at('u2', 2.2), 'splash'], [at('u3', 2.6), 'splash'], [at('u4', 2.4), 'pop']);
AUD.push([at('g2', 0.4), 'trumpet'], [at('g2', 3.4), 'water', { dur: 1.6 }], [at('g3', 2.2), 'trumpet'], [at('g3', 3.8), 'chime']);
AUD.push([at('g4', 0.6), 'croak'], [at('g5', 2.4), 'croak'], [at('g6', 2.7), 'soft'], [at('g7', 0.4), 'shimmer'], [at('g7', 2.8), 'chime'], [at('r1', 0.4), 'bell']);
AUD.push([at('r3', 1.0), 'chime'], [at('r3', 1.2), 'shimmer'], [at('m1', 0.2), 'temple'], [at('m3', 2.2), 'pop'], [at('m5', 0.2), 'temple']);
for (let i = 0; i < 5; i++) AUD.push([at('recap', 0.5 + i * 0.8), 'tok']);
AUD.push([at('ask', 0.3), 'croak']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'phop-phum-sat-youtube' : 'phop-phum-sat', title: 'ภพภูมิสัตว์',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'd7', 'u5') || between(t, 'm3', 'm4'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
})();
