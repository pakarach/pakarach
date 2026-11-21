/* part 2: beats, tracks, camera, light cues, hud, sound */
const SHOT = { wide: [8.5, 3.0, 12.5, 0, 1.2, -0.4], wideL: [-8.5, 3.0, 12.5, 0, 1.2, -0.4], med: [5.2, 1.9, 8.4, 0, 1.15, -0.5], medL: [-5.2, 1.9, 8.4, 0, 1.15, -0.5], low: [2.5, 1.0, 9.2, 0, 1.7, -0.5], high: [3, 6.5, 10.5, 0, 0.7, 0] };
const near = (x, z, side, d, up) => { side = side || 1; d = d || 6.4; return [x + side * d * 0.55, 1.7 + (up || 0), z + d * 0.85, x, 1.1 + (up || 0), z]; };
/* id, seconds, set, shot, line 1, line 2 (accent), source footnote */
const SC = [
  ['cover', 2.4, 'cave', [4.2, 1.7, 5.0, -1.9, 1.25, -1.2]],
  ['h1', 4.6, 'desert', 'wide', 'กลางทะเลทรายอัฟกานิสถาน', 'ขบวนรถทหารกำลังคุ้มกันเศรษฐีคนหนึ่ง'],
  ['h2', 4.8, 'desert', near(-0.9, 0.5), 'เขาคือ โทนี่ สตาร์ก', 'อัจฉริยะเจ้าของบริษัทผลิตอาวุธ'],
  ['h3', 4.8, 'desert', 'med', 'แล้วขบวนรถก็ถูกโจมตี', 'ระเบิดลูกหนึ่งตกลงตรงหน้าเขา'],
  ['h4', 5.2, 'desert', [2.9, 2.7, 5.9, 0.7, 0.55, 1.3], 'บนระเบิดลูกนั้นมีชื่อบริษัทติดอยู่', 'บริษัทของเขาเอง'],
  ['h5', 5.6, 'desert', 'low', 'ทำไมคนขายอาวุธ ถึงเกือบตายเพราะอาวุธตัวเอง', 'และทำไมเขากลับมาประกาศเลิกขาย'],
  ['card', 6.4, 'cave', [8.5, 3.0, 12.5, -3.2, 1.2, -0.4], 'นี่คือ Iron Man ภาคแรก หนังที่เปิดจักรวาลมาร์เวล', 'คลิปนี้สปอยล์ทั้งเรื่อง'],
  ['a1', 4.8, 'cave', near(-2.6, 1.9, -1), 'โทนี่ตื่นขึ้นมาในถ้ำ', 'สะเก็ดระเบิดฝังอยู่ใกล้หัวใจ'],
  ['a2', 5.4, 'cave', near(-1.6, 0.9, -1, 6), 'หมอยินเซน เพื่อนร่วมห้องขัง ช่วยชีวิตเขาไว้', 'ด้วยแม่เหล็กไฟฟ้า ต่อกับแบตเตอรี่รถยนต์'],
  ['a3', 5.2, 'cave', 'med', 'กลุ่มก่อการร้ายสั่งให้เขาสร้างขีปนาวุธ', 'จากกองอาวุธของสตาร์ก ที่พวกมันมีเต็มถ้ำ'],
  ['a4', 5.2, 'cave', near(0.9, -1.3, 1, 6), 'โทนี่รับปาก แต่แอบสร้างอย่างอื่น', 'ชิ้นแรกคือแหล่งพลังงานจิ๋ว ใช้แทนแบตเตอรี่'],
  ['a5', 5.2, 'cave', near(2.3, -0.3, -1, 7.5), 'ชิ้นที่สองคือชุดเกราะเหล็ก', 'ประกอบจากเศษขีปนาวุธของตัวเอง'],
  ['a6', 5.2, 'cave', 'med', 'วันหนี ชุดยังเปิดเครื่องไม่เสร็จ', 'ยินเซนวิ่งออกไปถ่วงเวลาให้'],
  ['a7', 5.6, 'cave', near(3.9, 1.4, -1, 6.4), 'ก่อนสิ้นใจ ยินเซนขอเพียงอย่างเดียว', 'ให้โทนี่ใช้ชีวิตที่เหลือให้คุ้ม'],
  ['a8', 5.4, 'desert', 'wide', 'โทนี่ฝ่าออกมาได้ แล้วไปตกกลางทะเลทราย', 'โรดส์ เพื่อนทหารของเขา ตามมาเจอ'],
  ['obs1', 6.0, 'desert', near(0.6, 0.7, -1), 'สังเกตว่าหนังไม่ได้เริ่มที่ชุดเกราะ', 'หนังเริ่มที่คนขายอาวุธ ได้เห็นปลายทางของสินค้าตัวเอง'],
  ['cl1', 4.8, 'desert', 'low', 'เขากลับถึงอเมริกา', 'แล้วพูดประโยคที่ทำให้หุ้นบริษัทดิ่ง'],
  ['b1', 5.4, 'press', [6.8, 3.3, 7.4, 0, 1.0, -1.0], 'โทนี่นั่งลงกับพื้น กินชีสเบอร์เกอร์', 'แล้วประกาศว่า สตาร์กจะเลิกผลิตอาวุธ'],
  ['b2', 5.2, 'press', [4.4, 2.2, 1.9, 0.6, 1.15, -0.9], 'โอบาไดห์ หุ้นส่วนรุ่นพ่อ รีบออกมาคุมสถานการณ์', 'และบอกให้โทนี่เก็บตัวเงียบๆ'],
  ['b3', 5.2, 'shop', 'wide', 'โทนี่ขังตัวเองในห้องทำงานใต้บ้าน', 'สร้างแหล่งพลังงานตัวใหม่ และชุดรุ่นใหม่'],
  ['b4', 5.4, 'shop', near(2.9, -0.5), 'เป๊ปเปอร์ ผู้ช่วยของเขา ช่วยเปลี่ยนตัวใหม่ให้', 'ส่วนตัวเก่า โทนี่สั่งให้ทิ้ง'],
  ['b5', 5.8, 'shop', near(-1.2, -1.4, -1, 5.8), 'เป๊ปเปอร์ไม่ทิ้ง เธอใส่กล่องแก้วเป็นของขวัญ', 'สลักข้อความแซวว่า เขาก็มีหัวใจเหมือนกัน'],
  ['b6', 5.2, 'shop', 'low', 'เขาซ้อมบินในห้องทำงาน', 'ชนเพดานบ้าง ตกใส่รถตัวเองบ้าง'],
  ['b7', 5.6, 'village', 'wide', 'แล้วนักข่าวคนหนึ่งก็ยื่นรูปถ่ายให้ดู', 'อาวุธของสตาร์ก ถูกใช้ถล่มหมู่บ้านของยินเซน'],
  ['b8', 5.6, 'office', near(1.7, 0.6, 1, 5.4), 'โทนี่ไปถามโอบาไดห์', 'และได้รู้ว่าโอบาไดห์นี่เอง ที่ยื่นเรื่องกันเขาออกจากบริษัท'],
  ['b9', 5.8, 'village', [6.5, 2.6, 10.8, 0.5, 1.8, -0.3], 'คืนนั้น โทนี่ใส่ชุดบินไปหมู่บ้านเอง', 'ช่วยชาวบ้าน แล้วทำลายอาวุธของตัวเองจนหมด'],
  ['b10', 5.2, 'village', [3, 1.0, 10.5, 0, 3.3, -1], 'ขากลับ เครื่องบินรบสองลำไล่ตาม', 'โรดส์ต้องออกข่าวว่า เป็นแค่การซ้อมรบ'],
  ['obs2', 6.0, 'shop', near(4.2, -0.2, -1, 6), 'โทนี่บอกว่าเลิกทำอาวุธ แต่ชุดนี้ก็คืออาวุธ', 'ที่ต่างคือ ครั้งนี้เขาถือเอง และรับผิดชอบเอง'],
  ['cl2', 4.8, 'shop', 'high', 'แต่ยังเหลืออีกคำถาม', 'ใครกันที่ส่งอาวุธของเขาให้ผู้ก่อการร้าย'],
  ['c1', 5.4, 'office', near(0.8, -1.7, 1, 6.4, 0.35), 'เป๊ปเปอร์แอบเข้าไปก๊อปไฟล์จากคอมบริษัท', 'และเจอคลิปที่ไม่ควรมีอยู่'],
  ['c2', 5.8, 'office', 'medL', 'โอบาไดห์คือคนจ้างกลุ่มก่อการร้ายให้ฆ่าโทนี่', 'และแอบขายอาวุธให้ทั้งสองฝั่งมาตลอด'],
  ['c3', 5.8, 'office', 'low', 'เขาเก็บซากชุดจากทะเลทราย มาสร้างชุดยักษ์ของตัวเอง', 'ขาดอย่างเดียว วิศวกรย่อแหล่งพลังงานไม่ได้'],
  ['c4', 5.8, 'shop', near(-3.8, 1.0, 1, 5.6), 'เขาจึงมาที่บ้านโทนี่ ทำให้โทนี่ขยับตัวไม่ได้', 'แล้วเอาแหล่งพลังงานของโทนี่ไปต่อหน้า'],
  ['c5', 6.0, 'shop', near(-1.3, -1.2, 1, 6), 'โทนี่คลานลงไปที่ห้องทำงาน', 'สิ่งเดียวที่ช่วยได้ คือของขวัญในกล่องแก้ว'],
  ['c6', 5.4, 'roof', 'wide', 'โทนี่ตามไปที่โรงงาน ด้วยพลังงานรุ่นเก่า', 'สู้กับชุดที่ใหญ่กว่าและแรงกว่า'],
  ['c7', 5.6, 'roof', 'medL', 'เขาบอกเป๊ปเปอร์ให้เร่งเตาปฏิกรณ์ยักษ์ของโรงงาน', 'จนพลังงานพุ่งขึ้นฟ้า'],
  ['c8', 5.6, 'roof', [-3, 2.4, 11.5, 2.2, 1.7, -1.2], 'โอบาไดห์ร่วงลงไปในเตาปฏิกรณ์', 'จบชีวิตด้วยเทคโนโลยีที่เขาอยากขโมย'],
  ['e1', 5.6, 'press', [6.8, 3.3, 7.4, 0, 1.0, -1.0], 'เช้าวันต่อมา หน่วยงานรัฐเตรียมคำแก้ตัวให้โทนี่', 'ให้บอกว่า คนในชุดเกราะคือบอดี้การ์ด'],
  ['e2', 5.8, 'press', [2.6, 2.1, 1.7, 0, 1.5, -2.2], 'โทนี่มองกระดาษในมือ แล้ววางลง', '“ผมคือไอรอนแมน”'],
  ['e3', 5.4, 'shop', near(-2.4, -0.8, 1, 5.8), 'หลังเครดิต มีชายแปลกหน้ารออยู่ในบ้าน', 'เขามาชวนคุยเรื่องทีมที่ชื่อ อเวนเจอร์ส'],
  ['n0', 4.6, 'press', 'high', 'ทำไมหนังเรื่องนี้ยังถูกพูดถึง', 'มี 3 เรื่องที่อยากชวนดู'],
  ['n1a', 5.8, 'press', 'wideL', 'หนึ่ง หนังเรื่องนี้ไม่ได้พูดเรื่องชุดเกราะ', 'มันพูดเรื่องการรับผิดชอบสิ่งที่ตัวเองสร้าง'],
  ['n1b', 6.0, 'press', [-2.8, 2.1, 1.7, 0, 1.5, -2.2], 'ต้นเรื่อง โทนี่ไม่รู้ด้วยซ้ำว่าอาวุธไปอยู่กับใคร', 'ท้ายเรื่อง เขาเลือกบอกโลกว่า คนในชุดคือเขา'],
  ['n2a', 5.8, 'shop', near(-1.2, -1.4, -1, 5.8), 'สอง ของขวัญในกล่องแก้ว', 'ตอนกลางเรื่อง มันเป็นแค่มุกแซวเจ้านาย'],
  ['n2b', 6.0, 'shop', 'medL', 'ตอนท้าย มันคือสิ่งเดียวที่ทำให้เขารอด', 'หนังวางของไว้ก่อน แล้วค่อยให้มันมีความหมาย'],
  ['n3a', 6.0, 'crew', 'med', 'สาม ตอนถ่ายทำ หนังเรื่องนี้ยังไม่มีบทที่เสร็จ', 'เจฟฟ์ บริดเจส เล่าว่า มีแค่โครงเรื่อง', 'ที่มา: Jeff Bridges ให้สัมภาษณ์ In Contention'],
  ['n3b', 6.4, 'crew', near(-0.9, -0.3, 1, 6), 'ประโยคปิดเรื่อง ดาวนีย์ จูเนียร์ ก็พูดสดเอง', 'ผู้สร้างเก็บไว้ และหนังมาร์เวลก็แทบไม่มีตัวตนลับอีก', 'ที่มา: Kevin Feige ให้สัมภาษณ์ (Syfy Wire)'],
  ['n3c', 5.8, 'crew', 'low', 'ปี 2022 หอสมุดรัฐสภาสหรัฐฯ', 'เลือก Iron Man เข้าทะเบียนภาพยนตร์แห่งชาติ', 'ที่มา: Library of Congress'],
  ['v1', 5.8, 'press', 'wide', 'Iron Man สนุกเพราะชุดเกราะ', 'แต่อยู่ได้นานเพราะคนที่อยู่ข้างใน'],
  ['q1', 6.0, 'press', 'low', 'ถ้าเป็นคุณ จะอ่านตามกระดาษ', 'หรือบอกความจริงแบบโทนี่ คอมเมนต์ไว้ได้เลย'],
  ['end', 3.4, 'press', 'high'],
];
const BEATS = SC.map((s) => [s[0], s[1]]);
const B = FK.beats(BEATS, window.DATA && DATA.vo), at = B.at, end = B.end, DUR = B.DUR;
const IDX = {}; SC.forEach((s, i) => { IDX[s[0]] = i; });
const beatAt = (t) => { let i = SC.length - 1; for (let k = 0; k < SC.length; k++) if (t < end(SC[k][0])) { i = k; break; } return i; };
const shotOf = (i) => { const s = SC[i][3]; return typeof s === 'string' ? SHOT[s] : s; };
const LABEL = (id) => { const c = id[0]; if (id === 'cover' || id === 'end') return ''; if (c === 'h') return 'COLD OPEN'; if (id === 'card') return 'THE FILM'; if (c === 'a' || id === 'obs1' || id === 'cl1') return 'ACT 1  ·  THE CAVE'; if (c === 'b' || id === 'obs2' || id === 'cl2') return 'ACT 2  ·  THE WORKSHOP'; if (c === 'c') return 'ACT 3  ·  THE PARTNER'; if (c === 'e') return 'ENDING'; if (id === 'n0') return 'ANALYSIS'; if (c === 'n') return 'ANALYSIS  ·  ' + id[1] + ' / 3'; return 'VERDICT'; };
FK.softSfx();

const CEN = { desert: [0, 0, 0], cave: [80, 0, 0], press: [160, 0, 0], shop: [240, 0, 0], village: [320, 0, 0], office: [400, 0, 0], roof: [480, 0, 0], crew: [560, 0, 0] };
const KEY = { desert: { k: 0.8, rim: 0.55 }, cave: { k: 0.5, from: [-5, 11, 9], rim: 0.18 }, press: { k: 0.8, rim: 0.5 }, shop: { k: 0.6, from: [6, 11, 9], rimFrom: [-8, 6, -8], rim: 0.28 }, village: { k: 0.55, rim: 0.45 }, office: { k: 0.55, from: [6, 10, 9], rimFrom: [-8, 6, -8], rim: 0.3 }, roof: { k: 0.42, from: [-7, 12, 8], rim: 0.4 }, crew: { k: 0.7, rim: 0.45 } };
const caps = []; SC.forEach((s) => { if (!s[4]) return; const c = { t0: at(s[0]) + 0.25, t1: end(s[0]) - 0.08, y: 0, lines: [[50, [s[4], '#fff', 600]]] }; if (s[5]) c.lines.push([50, [s[5], AC, 600]]); if (s[6]) c.foot = s[6]; c.y = MK.subY(c, H, W) - (s[6] ? 44 : 0); caps.push(c); });

/* tracks: key = [startTime, x, z, turn, moveSeconds] */
const trk = (f, ...keys) => { f.userData.trk = keys; };
const vis = (o, ...w) => { o.userData.vis = w; VISL.push(o); };
const pose = (f, t0, t1, p) => { (f.userData.poses = f.userData.poses || []).push([t0, t1, p]); };
const hop = (f, t, amp) => { (f.userData.hops = f.userData.hops || []).push([t, amp || 0.3]); };
const VISL = [], ALLF = [], NAMES = [], INF = 1e9;
const pulse = (t, t0, up, down) => (t < t0 ? 0 : t < t0 + up ? (t - t0) / up : Math.max(0, 1 - (t - t0 - up) / down));
const tint = (l, c) => { l.children[0].color.copy(MK.LIN(c)); l.children[1].material.color.copy(MK.LIN(c)); };
let S = null, LAB = [], CAMERA = null;

function plan() {
  const D = S.desert, C = S.cave, P = S.press, Sh = S.shop, V = S.village, O = S.office, R = S.roof, K = S.crew;
  /* desert */
  [D.t1, D.t2, D.sol1, D.sol2, D.shell, D.head].forEach((o) => vis(o, [0, at('card')]));
  [D.scrap, D.heli, D.rhodey].forEach((o) => vis(o, [at('a8'), INF])); D.heli.userData.vis = [[at('a8', 2.2), INF]];
  trk(D.tony, [0, -0.9, 0.5, -0.9, 0], [at('h3', 1.2), -0.3, 1.5, -0.4, 0.5], [at('a8'), 0.4, 0.6, -0.9, 0], [at('cl1', 0.8), 2.6, 1.2, -0.3, 2.6]);
  hop(D.tony, at('h3', 1.2), 0.35); pose(D.tony, at('h3', 1.7), at('card'), { lean: 0.35, nod: 0.3 }); pose(D.tony, at('a8'), at('a8', 3.6), { lean: 0.5, nod: 0.35 });
  pose(D.sol1, at('h3', 1.3), at('card'), { lean: -0.9 }); pose(D.sol2, at('h3', 1.3), at('card'), { lean: 0.8 });
  trk(D.rhodey, [0, 6.2, 1.4, -2.6, 0], [at('a8', 2.4), 1.9, 1.0, -2.6, 1.6], [at('cl1', 0.8), 4.2, 1.6, -0.3, 2.6]);
  NAMES.push([D.tony, 'โทนี่ สตาร์ก', at('h2', 0.5), end('h2')], [D.rhodey, 'โรดส์', at('a8', 4.0), at('obs1', 2.5)]);
  /* cave */
  vis(C.core, [0, end('cover')], [at('a4', 1.6), INF]); vis(C.drape, [at('a5', 0.6), at('a7', 3.0)]); vis(C.raza, [at('a3'), at('a7', 2.6)]); vis(C.guard, [at('a3'), at('a7', 2.6)]);
  trk(C.tony, [0, 0.3, -0.9, -0.7, 0], [at('h1'), -2.6, 1.9, -0.8, 0], [at('a3', 0.4), -1.7, 1.7, -0.5, 1], [at('a4', 0.3), 0.3, -0.9, -0.8, 1.2], [at('a5', 0.3), 1.7, -0.5, -0.3, 1.2], [at('a6', 0.6), 2.9, 0.1, -0.9, 1]);
  vis(C.tony, [0, at('a6', 1.7)]);
  trk(C.yin, [0, 1.6, -0.9, -1.3, 0], [at('h1'), -1.6, 1.0, -1.6, 0], [at('a2', 0.3), -1.2, 0.9, -1.3, 0.8], [at('a4', 0.5), 1.8, -0.9, -1.2, 1.2], [at('a6', 1.6), 4.2, 1.4, -0.4, 1.4], [at('a7'), 3.9, 1.5, -1.2, 0]);
  pose(C.yin, at('a7'), INF, { lean: 0.55, nod: 0.4 }); pose(C.tony, at('a5', 1.2), at('a6'), { armL: 1.1 }); hop(C.tony, at('a1', 0.7), 0.18); hop(C.tony, at('a4', 2.0), 0.22);
  trk(C.raza, [0, 3.6, 1.7, -2.4, 0], [at('a3', 0.5), 0.5, 1.3, -2.9, 1.3], [at('a4', 0.2), 4.3, 1.8, -2.4, 1.2]); trk(C.guard, [0, 4.4, 2.6, -2.5, 0], [at('a3', 0.7), 1.9, 2.4, -2.9, 1.3], [at('a4', 0.2), 4.7, 2.7, -2.4, 1.2]);
  NAMES.push([C.yin, 'ยินเซน', at('a2', 0.8), end('a2')]);
  /* press */
  vis(P.burger, [at('b1'), end('b2')]); vis(P.card, [at('e1'), INF]); vis(P.obad, [0, at('e1')]);
  trk(P.tony, [0, 0, -2.25, -PI / 2, 0], [at('b1', 1.0), 0, -0.5, -PI / 2, 1.1], [at('e1'), 0, -2.25, -PI / 2, 0]);
  trk(P.obad, [0, 1.9, -2.3, -1.8, 0], [at('b2', 0.4), 1.1, -0.8, -1.9, 1.3]); trk(P.rhodey, [0, -2.1, -2.3, -1.3, 0], [at('e1'), -1.3, -2.3, -1.3, 0]);
  pose(P.tony, at('b1', 2.0), end('b2'), { armL: 1.5, nod: 0.1 }); pose(P.tony, at('e1'), at('e2', 2.4), { armR: 1.35, nod: 0.25 }); pose(P.tony, at('n0'), INF, { armR: 0.2 });
  P.rep.forEach((r, i) => { hop(r, at('b1', 3.3 + i * 0.05), 0.2); hop(r, at('e2', 3.5 + i * 0.04), 0.28); hop(r, at('q1', 2.5 + i * 0.2), 0.18); });
  NAMES.push([P.obad, 'โอบาไดห์ สเตน', at('b2', 1.7), end('b2')]);
  /* workshop */
  vis(Sh.pepper, [at('b4'), end('b6')], [at('n2a'), end('n2b')]); vis(Sh.case, [at('b5', 2.0), INF]); vis(Sh.obad, [at('c4'), end('c4')]); vis(Sh.stranger, [at('e3'), end('e3')]); vis(Sh.hand, [at('c4', 3.2), end('c4')]);
  trk(Sh.tony, [0, 2.4, -0.9, -1.0, 0], [at('b5', 0.6), 0.2, -0.6, -2.0, 1.4], [at('b6'), 1.0, 0.9, -1.2, 0], [at('obs2'), 3.5, 0.5, -0.6, 0], [at('cl2'), 3.0, -0.9, 1.3, 0], [at('c4'), -4.2, 1.2, -1.0, 0], [at('c5', 0.3), -0.7, -0.8, -2.4, 3.6], [at('e3'), 1.6, 1.0, -2.6, 0], [at('e3', 0.6), 0.2, 0.2, -2.7, 1.6], [at('n2a'), 0.2, -0.6, -2.0, 0]);
  trk(Sh.pepper, [0, 6.4, 0.8, -2.2, 0], [at('b4', 0.3), 3.6, -0.2, -2.2, 1.4], [at('b5', 0.2), -0.6, -1.0, -2.2, 1.8], [at('n2a'), -0.6, -1.0, -2.2, 0]);
  trk(Sh.obad, [0, -1.0, 3.6, -2.6, 0], [at('c4', 0.4), -2.9, 1.7, -2.7, 1.6], [at('c4', 4.2), -0.6, 3.8, -0.6, 1.6]);
  hop(Sh.tony, at('b6', 0.8), 1.5); hop(Sh.tony, at('b6', 2.6), 2.0); pose(Sh.tony, at('c4', 1.6), at('c5', 3.4), { lean: 0.5, nod: 0.4 }); pose(Sh.obad, at('c4', 2.6), end('c4'), { armL: 1.3 }); pose(Sh.pepper, at('b5', 2.0), end('b5'), { armL: 1.0 }); hop(Sh.tony, at('c5', 4.4), 0.25);
  NAMES.push([Sh.pepper, 'เป๊ปเปอร์ พอตส์', at('b4', 1.8), end('b4')]);
  /* village */
  vis(V.crates, [0, at('b9', 3.5)]); V.gun.forEach((g2) => vis(g2, [0, at('b9', 3.2)]));
  V.gun.forEach((g2, i) => { pose(g2, at('b7'), at('b9', 2.4), { armL: 1.2 }); pose(g2, at('b9', 2.4 + i * 0.25), INF, { lean: 1.2 }); });
  V.vil.forEach((v, i) => { pose(v, at('b7'), at('b9', 3.0), { lean: -0.25, nod: 0.3 }); hop(v, at('b9', 4.2 + i * 0.2), 0.3); pose(v, at('b10'), INF, { nod: -0.45 }); });
  /* office */
  vis(O.pepper, [at('c1'), end('c2')]); vis(O.tony, [0, end('b8')]);
  trk(O.obad, [0, 0.8, 0.3, -0.3, 0], [at('c1'), -5.6, 1.2, 0, 0], [at('c2', 2.0), -2.6, 0.5, -0.5, 1.6], [at('c3', 0.2), 1.5, -2.1, -PI / 2 - 0.3, 1.8]); vis(O.obad, [0, end('b8')], [at('c2', 1.8), INF]);
  trk(O.pepper, [0, 1.1, -2.1, -PI / 2 + 0.2, 0], [at('c2', 2.6), 1.7, -2.2, -2.9, 0.7]); hop(O.pepper, at('c1', 3.6), 0.2); pose(O.tony, at('b8', 3.0), end('b8'), { lean: -0.2, nod: 0.3 }); pose(O.obad, at('b8', 2.4), end('b8'), { armL: 0.8 });
  /* roof */
  vis(R.tony, [at('c8', 3.4), INF]); trk(R.pepper, [0, -5.2, -1.5, -0.4, 0], [at('c8', 3.8), -0.5, 1.4, -0.3, 1.5]); hop(R.pepper, at('c7', 1.0), 0.3); pose(R.pepper, at('c7', 1.2), end('c7'), { armL: 1.2 }); pose(R.tony, at('c8', 3.4), INF, { lean: 0.3, nod: 0.3 });
  /* crew */
  hop(K.act1, at('n3a', 2.0), 0.2); hop(K.act2, at('n3a', 3.2), 0.2); pose(K.dir, at('n3a', 1.0), end('n3a'), { armL: 1.0 });
  trk(K.act1, [0, -1.5, -0.9, -1.1, 0], [at('n3b', 0.5), -0.9, -0.2, -1.0, 1.2]); hop(K.act1, at('n3b', 2.6), 0.25); pose(K.act1, at('n3b', 2.4), end('n3b'), { armL: 0.9 });
}

function setup({ scene, renderer }) {
  const L = MK.look(scene, renderer, GR);
  S = { L, desert: setDesert(), cave: setCave(), press: setPress(), shop: setShop(), village: setVillage(), office: setOffice(), roof: setRoof(), crew: setCrew() };
  for (const n in CEN) { const s = S[n]; s.g.position.set(CEN[n][0], 0, CEN[n][2]); scene.add(s.g); s.g.traverse((o) => { if (o.userData && o.userData.P) { o.userData.set = n; ALLF.push(o); } }); }
  plan();
  return S;
}

function figures(t, name) {
  for (const f of ALLF) {
    if (f.userData.set !== name) continue; const d = f.userData; let x = d.home[0], z = d.home[1], r = d.home[2], hy = 0;
    if (d.trk) { const K = d.trk; x = K[0][1]; z = K[0][2]; r = K[0][3]; for (let i = 1; i < K.length; i++) { const k = K[i], mv = k[4] == null ? 1.2 : k[4]; if (t >= k[0] + mv) { x = k[1]; z = k[2]; r = k[3]; } else { if (t > k[0]) { const u = U.easeIO((t - k[0]) / mv); x += (k[1] - x) * u; z += (k[2] - z) * u; r += (k[3] - r) * u; hy = Math.sin(u * PI) * 0.14; } break; } } }
    const ph = d.home[0] * 1.7 + d.home[1]; const p = { turn: r + Math.sin(t * 0.6 + ph) * 0.06, lean: 0, nod: 0.06 + Math.sin(t * 0.9 + ph) * 0.03, armL: Math.sin(t * 0.8 + ph) * 0.05, armR: -Math.sin(t * 0.8 + ph) * 0.05 };
    if (d.poses) for (const w of d.poses) if (t >= w[0] && t < w[1]) { const a = U.easeIO(U.clamp((t - w[0]) / 0.5)); for (const key in w[2]) p[key] = (p[key] || 0) * (1 - a) + w[2][key] * a; }
    if (d.hops) for (const h of d.hops) { const u = (t - h[0]) / (0.45 + h[1] * 0.35); if (u > 0 && u < 1) hy += Math.sin(u * PI) * h[1]; }
    let y0 = d.y0; if (name === 'press' && d.y0 > 0.3) y0 = 0.24 + 0.3 * U.clamp((-1.0 - z) / 0.4);
    const ln = p.lean; p.lean = 0; f.position.set(x, y0 + hy, z); MK.pose(f, p); f.rotation.z = -ln;
  }
}

function update(t, s, { camera }) {
  CAMERA = camera; const i = beatAt(t), sc = SC[i], id = sc[0], name = sc[2], Sx = S[name], c = CEN[name], tl = t - at(id), dur = end(id) - at(id), u = U.clamp(tl / dur);
  for (const n in CEN) S[n].g.visible = n === name;
  for (const o of VISL) { let v = false; for (const w of o.userData.vis) if (t >= w[0] && t < w[1]) v = true; o.visible = v; }
  /* light cue */
  const newSet = i > 0 && SC[i - 1][2] !== name, nextSet = i < SC.length - 1 && SC[i + 1][2] !== name;
  const k = (newSet ? U.easeIO(U.clamp(tl / 0.9)) : 1) * (nextSet ? U.easeIO(U.clamp((dur - tl) / 0.7)) : 1); S.fade = 1 - k;
  const kc = KEY[name]; MK.keyOn(S.L, c, { k: kc.k * k, from: kc.from, rimFrom: kc.rimFrom }); S.L.rim.intensity = 1.7 * (kc.rim == null ? 0.75 : kc.rim);
  /* camera */
  const b = shotOf(i), prev = i > 0 && !newSet ? shotOf(i - 1) : null; let a = prev;
  if (!a) a = i === 0 ? [b[3] + (b[0] - b[3]) * 1.05, b[1], b[5] + (b[2] - b[5]) * 1.05, b[3], b[4], b[5]] : [b[3] + (b[0] - b[3]) * 1.2, b[1] + 0.5, b[5] + (b[2] - b[5]) * 1.2, b[3], b[4], b[5]];
  const e = U.easeIO(u), same = prev === b ? 1 - 0.06 * e : 1, q = []; for (let j = 0; j < 6; j++) q.push(a[j] + (b[j] - a[j]) * e);
  camera.fov = 28; camera.position.set(c[0] + q[3] + (q[0] - q[3]) * same + Math.sin(t * 0.33) * 0.1, q[1] + Math.sin(t * 0.27) * 0.05, c[2] + q[5] + (q[2] - q[5]) * same); camera.lookAt(c[0] + q[3], q[4], c[2] + q[5]); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
  figures(t, name); Sx.dust.userData.tick(t); if (Sx.bokeh) Sx.bokeh.userData.tick(t);
  /* per-set animation */
  if (name === 'desert') { const bm = pulse(t, at('h3', 1.2), 0.12, 1.8), late = t >= at('a8'); S.desert.boom.userData.k(late ? 0 : bm + (t > at('h3', 1.3) && t < at('card') ? 0.22 + Math.sin(t * 17) * 0.04 : 0)); S.desert.t2.rotation.z = -0.16 * U.clamp((t - at('h3', 1.2)) / 0.3); S.desert.heli.userData.beam.material.opacity = 0.2 * U.clamp((t - at('a8', 2.2)) / 0.8); S.desert.heli.position.x = 0.4 + Math.sin(t * 0.5) * 0.4; }
  if (name === 'cave') { const C = S.cave; C.fire.userData.k(0.85 + Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.07 + (t > at('a5', 1.2) && t < at('a6') ? Math.max(0, Math.sin(t * 9)) * 0.5 : 0)); const cp = U.easeBack(U.clamp((t - at('a4', 1.6)) / 0.5)); C.core.scale.setScalar(t < at('card') ? 1 : Math.max(0.01, cp)); C.coreL.userData.k(0.8 + Math.sin(t * 3) * 0.15);
    C.drape.scale.y = Math.max(0.02, U.easeOut(U.clamp((t - at('a5', 0.6)) / 2.2))); C.blast.userData.k(pulse(t, at('a7', 2.9), 0.15, 2.2) + (t > at('a6', 2.6) && t < at('a7', 2.9) ? 0.12 + Math.max(0, Math.sin(t * 21)) * 0.2 : 0)); }
  if (name === 'press') { const P = S.press, burst = pulse(t, at('b1', 3.3), 0.1, 1.6) + pulse(t, at('e2', 3.4), 0.1, 2.2); P.fl.forEach((f, j) => { const w = Math.sin(t * (5 + j * 0.9) + f.userData.ph); f.material.opacity = Math.max(0, w - 0.93) * 14 * (0.5 + burst * 1.5) + (burst > 0.2 && Math.sin(t * 23 + j * 2) > 0.6 ? 0.8 : 0); }); }
  if (name === 'shop') { const H2 = S.shop, work = t < at('b4') || (t >= at('b6') && t < at('b7')); H2.a1.rotation.z = -0.5 + Math.sin(t * (work ? 1.6 : 0.5)) * (work ? 0.35 : 0.08) - (t >= at('c5', 3.0) && t < at('e1') ? 0.5 * U.easeIO(U.clamp((t - at('c5', 3.0)) / 1.2)) : 0); H2.a2.rotation.z = 1.2 + Math.sin(t * 1.3 + 1) * 0.25; H2.a1.rotation.y = Math.sin(t * 0.4) * 0.5 + (t >= at('c5', 3.0) && t < at('e1') ? 1.9 : 0);
    H2.drape.scale.y = Math.max(0.02, U.easeOut(U.clamp((t - at('b3', 1.0)) / 2.4))); H2.scr.forEach((m, j) => { m.material.emissiveIntensity = 1.1 + Math.sin(t * 2.2 + j) * 0.3; }); const cs = U.easeBack(U.clamp((t - at('b5', 2.0)) / 0.5)); H2.case.scale.setScalar(Math.max(0.01, cs)); H2.caseL.userData.k(0.8 + (t >= at('c5', 3.4) && t < at('e1') ? 1.2 * U.clamp((t - at('c5', 3.4)) / 0.8) : 0) + Math.sin(t * 2.6) * 0.1);
    const ob = H2.obad.position; H2.hand.position.set(ob.x + 0.5, 1.72, ob.z + 0.25); }
  if (name === 'village') { const V = S.village, t9 = at('b9'), on9 = t >= t9 + 0.5 && t < end('b9'), on10 = t >= at('b10'); let sx = -7, sy = 7, sz = -1.5;
    if (on9) { const a2 = U.easeOut(U.clamp((t - t9 - 0.5) / 1.4)), out = U.easeIO(U.clamp((t - end('b9') + 0.9) / 0.9)); sx = -7 + 7.4 * a2 + out * 7; sy = 7 - 4.3 * a2 + Math.sin(t * 2.4) * 0.12 + out * 5; sz = -1.5 + 2.1 * a2; }
    if (on10) { const w = (t - at('b10')) * 0.9; sx = Math.sin(w * 1.3) * 4.2; sy = 4.3 + Math.sin(w * 2.1) * 0.7; sz = -2 + Math.cos(w) * 1.2; V.j1.position.set(Math.sin((w - 0.5) * 1.3) * 4.4, 4.7 + Math.sin((w - 0.5) * 2.1) * 0.6, -2.6); V.j2.position.set(Math.sin((w - 0.8) * 1.3) * 4.6, 4.0 + Math.sin((w - 0.8) * 2.1) * 0.6, -1.2); }
    V.st.position.set(sx, sy, sz); V.st.userData.k(on9 || on10 ? 1 : 0); V.j1.userData.k(on10 ? 0.9 : 0); V.j2.userData.k(on10 ? 0.9 : 0);
    V.boom.userData.k(pulse(t, t9 + 3.4, 0.12, 1.8) + pulse(t, t9 + 2.4, 0.08, 0.5) * 0.4 + (t < t9 ? 0.16 + Math.sin(t * 15) * 0.03 : 0)); V.win.userData.k(0.8 + Math.sin(t * 5) * 0.06); }
  if (name === 'office') { const O = S.office, red = U.easeIO(U.clamp((t - at('c1', 3.4)) / 0.8)) * (t < at('c3') ? 1 : 0); tint(O.scrL, red > 0.5 ? '#ff6a5a' : '#6fc8ff'); O.scr.material.emissive.copy(MK.LIN(red > 0.5 ? '#ff6a5a' : '#6fc8ff')); O.scrL.userData.k(0.9 + Math.sin(t * 6) * 0.08); }
  if (name === 'roof') { const R = S.roof, w = t * 1.5, fight = t >= at('c6') && t < at('c8', 1.2), ov = U.clamp((t - at('c7', 2.6)) / 2.4), fall = U.easeIO(U.clamp((t - at('c8', 0.6)) / 1.2));
    R.a.position.set(-1.6 + Math.cos(w) * 2.8, 3.3 + Math.sin(w * 1.7) * 0.8, 0.2 + Math.sin(w) * 1.3); R.b.position.set(-1.6 - Math.cos(w) * 2.4 + fall * (6 + Math.cos(w) * 2.4), 4.1 - Math.sin(w * 1.7) * 0.6 + fall * (0.4 + Math.sin(w * 1.7) * 0.6), 0.1 - Math.sin(w) * 1.0 - fall * 1.9);
    if (t >= at('c7', 2.0) && t < at('c8', 0.6)) { R.a.position.set(-2.4 + Math.sin(t * 2) * 0.3, 1.5 + Math.sin(t * 3) * 0.1, 0.6); R.b.position.set(-0.4 + Math.sin(t * 1.7) * 0.3, 2.6, 0.2); }
    const gone = pulse(t, at('c8', 1.9), 0.01, 0.4); R.a.userData.k(t < at('c8', 3.0) ? 1 : Math.max(0, 1 - (t - at('c8', 3.0)) / 0.5)); R.b.userData.k(t < at('c8', 1.8) ? 1 : gone);
    R.hit.position.copy(R.a.position).lerp(R.b.position, 0.5); R.hit.userData.k(fight && t < at('c7', 2.0) ? Math.max(0, Math.sin(w * 2 + 1) - 0.8) * 4 : 0);
    const dead = t >= at('c8', 2.2) ? U.clamp((t - at('c8', 2.2)) / 1.2) : 0, ri = 1.6 + ov * 5 - dead * 6.2 + pulse(t, at('c8', 1.8), 0.1, 0.6) * 6; R.rings.forEach((m) => { m.material.emissiveIntensity = Math.max(0.3, ri); }); R.coreL.userData.k(Math.max(0.2, 1 + ov * 1.6 - dead * 2.2 + pulse(t, at('c8', 1.8), 0.1, 0.7) * 2.5));
    R.up.material.opacity = Math.max(0, ov - 0.35) * 0.7 * (1 - dead); }
  if (name === 'crew') { S.crew.page.rotation.z = Math.sin(t * 1.2) * 0.03; }
  /* name labels */
  LAB = []; for (const n of NAMES) if (t >= n[2] && t < n[3] && n[0].visible) { const v = new T.Vector3(); n[0].getWorldPosition(v); v.y += 2.05 * n[0].scale.y; v.project(camera); LAB.push([(v.x + 1) / 2 * W, Math.max(MK.bar(W, H) + 40, (1 - v.y) / 2 * H), n[1], U.clamp((t - n[2]) / 0.3) * U.clamp((n[3] - t) / 0.3)]); }
}

function hud(g, t, { W, H }) {
  MK.finish(g, t, { W, H }); const bar = MK.bar(W, H), i = beatAt(t), id = SC[i][0];
  if (S.fade > 0.003) { g.fillStyle = 'rgba(3,5,10,' + S.fade + ')'; g.fillRect(0, bar, W, H - 2 * bar); }
  const panel = (a) => { const gl = g.createLinearGradient(0, 0, W * 0.56, 0); gl.addColorStop(0, 'rgba(4,6,12,' + 0.88 * a + ')'); gl.addColorStop(1, 'rgba(4,6,12,0)'); g.fillStyle = gl; g.fillRect(0, bar, W * 0.56, H - 2 * bar); };
  if (t < end('cover')) { const a = U.clamp((end('cover') - t) / 0.4); g.save(); g.globalAlpha = a; panel(1); MK.spaced(g, 'IRON MAN  ·  2008  ·  STORY + ANALYSIS', 124, bar + 132, 26, AC); MK.title(g, [['พ่อค้าอาวุธ', 132, '#fff'], ['ที่เกือบตายเพราะอาวุธตัวเอง', 84, AC], ['สรุป + วิเคราะห์  |  สปอยล์ทั้งเรื่อง', 38, '#fff', 400]], 120, bar + 178); g.restore(); }
  if (id === 'card') { const a = U.clamp((t - at('card') - 0.5) / 0.5) * U.clamp((end('card') - 0.5 - t) / 0.4); g.save(); g.globalAlpha = a; panel(1); MK.spaced(g, 'THE FILM', 124, bar + 120, 26, AC); const y = MK.title(g, [['Iron Man', 128, '#fff']], 120, bar + 160);
    MK.title(g, [['ปี 2008  ·  สหรัฐอเมริกา  ·  126 นาที', 40, '#fff', 400], ['กำกับโดย Jon Favreau', 40, '#fff', 400], ['รายได้ทั่วโลกราว 585 ล้านดอลลาร์', 40, AC, 600], ['หนังเรื่องแรกของจักรวาลภาพยนตร์มาร์เวล', 40, '#fff', 400], ['ตัวเลขรายได้: Box Office Mojo', 24, 'rgba(255,255,255,.7)', 400]], 124, y + 14); g.restore(); }
  if (id === 'b7') { const a = U.clamp((t - at('b7') - 0.9) / 0.4) * U.clamp((end('b7') - 0.7 - t) / 0.3); g.save(); g.globalAlpha = a * 0.9; g.strokeStyle = '#f1ecdf'; g.lineWidth = 5; g.strokeRect(170, bar + 34, W - 340, H - 2 * bar - 68); MK.spaced(g, 'PHOTOGRAPH', 196, bar + 68, 22, '#f1ecdf'); g.restore(); }
  const lb = LABEL(id); if (lb) MK.spaced(g, 'IRON MAN (2008)  ·  ' + lb, 70, bar / 2, 22, 'rgba(255,255,255,.62)');
  for (const l of LAB) { g.save(); g.globalAlpha = l[3]; g.font = '600 32px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,.8)'; g.shadowBlur = 10; g.fillStyle = '#fff'; g.fillText(l[2], l[0], l[1]); g.shadowColor = 'transparent'; const w2 = g.measureText(l[2]).width; g.fillStyle = AC; g.fillRect(l[0] - w2 / 2, l[1] + 24, w2, 3); g.restore(); }
  if (id === 'end') { const a = U.clamp((t - at('end')) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#05070c'; g.fillRect(0, 0, W, H); MK.spaced(g, 'END OF STORY', W / 2, H / 2 - 150, 28, AC, 'center'); MK.title(g, [['เรื่องต่อไป เร็วๆ นี้', 92, '#fff'], ['ภาพทั้งหมดเป็นงาน 3D ที่สร้างขึ้นใหม่ ไม่ใช่ภาพจากภาพยนตร์', 30, 'rgba(255,255,255,.8)', 400], ['ข้อมูล: Box Office Mojo · Library of Congress · In Contention · Syfy Wire', 26, 'rgba(255,255,255,.6)', 400]], W / 2, H / 2 - 110, { align: 'center' }); g.restore(); }
}

const audio = []; SC.forEach((s, i) => { if (i > 0 && SC[i - 1][2] !== s[2]) audio.push([at(s[0]) - 0.5, 'glide', { dur: 1.2 }]); });
audio.push([at('h3', 1.2), 'roar', { dur: 1.4 }], [at('h4', 1.0), 'bell'], [at('a4', 1.6), 'chime'], [at('a7', 2.9), 'roar', { dur: 1.6 }], [at('b1', 3.3), 'soft'], [at('b5', 2.0), 'chime'], [at('b9', 3.4), 'roar', { dur: 1.4 }], [at('c1', 3.4), 'bell'], [at('c5', 4.4), 'chime'], [at('c7', 3.4), 'shimmer'], [at('c8', 1.8), 'roar', { dur: 1.6 }], [at('e2', 3.4), 'bell'], [at('e2', 3.5), 'shimmer'], [at('n1a'), 'soft'], [at('n2a'), 'soft'], [at('n3a'), 'soft'], [at('v1'), 'chime']);
const tense = (t) => (t >= at('h3') && t < at('card')) || (t >= at('a6') && t < at('a8')) || (t >= at('b7') && t < at('b8')) || (t >= at('c1') && t < at('e1'));

VE.run({
  DUR, W, H, coverAt0: true, brandBar: false, endLen: 0, vignette: 'rgba(0,0,0,.55)', file: 'iron-man-2008-story', title: 'Iron Man (2008) สรุป + วิเคราะห์',
  brand: { name: '', series: '', color: AC, bg: [GR.haze, GR.haze], motif: { notes: [] } },
  setup, update, hud, caps, audio,
  bed: [FK.chillBed({ DUR, calm: tense, vol: (window.DATA && DATA.vo) ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
