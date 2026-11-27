/* ประวัติแกมบิท ในลุค recap (full TTS script, 16:9 YouTube). Scenes from gambit-full.js + the recap layer at the end of this file.
   Build: CAST=gambit-full sh story/mk-film.sh gambit-history out.html --data cfg=land.json [--data vo=vo.json]
   One beat per paragraph of the TTS script (gambit-full-script.txt).
   Cast = placeholders in gambit-full-x.js (swap them there). Toon look + lively bed. */
const EP = {
  no: 0, file: 'gambit-history', title: 'ประวัติแกมบิท ราชาไพ่แห่งเอ็กซ์เมน', series: 'ประวัติตัวละคร · แกมบิท', cover: [], recap: true, badges: false, slim: true,
  foot: 'RuNgee รู้งี้ · ประวัติตัวละคร: แกมบิท',
  factHead: ['รู้งี้…', 'เบื้องหลังตัวละคร'],
  chap: [['กำเนิด', 'b01', 'b08'], ['นิวออร์ลีนส์', 'b09', 'b17'], ['ความลับ', 'b18', 'b28'], ['ขั้วโลกใต้', 'b29', 'b36'], ['แต่งงาน', 'b37', 'b45'], ['จอเงิน', 'b46', 'b56']],
  facts: [['เปิดตัวปี 1990 ใน Uncanny X-Men #266', 'สร้างโดยคริส แคลร์มอนต์ กับจิม ลี'], ['ปี 2018 แต่งงานกับโร้กใน X-Men Gold #30', 'ในงานที่โปรโมตว่าเป็นของคิตตี้กับโคลอสซัส'], ['Avengers: Doomsday กำหนดฉาย 18 ธ.ค. 2026', 'แชนนิ่ง เททัมกลับมารับบทอีกครั้ง']],
  src: 'ที่มา: Marvel.com · ComicBook.com · CBR · Comic Vine · CinemaBlend', factFoot: 'ตัวละคร 3D เป็นภาพจำลองชั่วคราว',
};
const BEATS = [
  ['cover', 2.0], ['b01', 25.7], ['b02', 27.7], ['b03', 17.4], ['b04', 5.7], ['b05', 22.9],
  ['b06', 17.0], ['b07', 31.5], ['b08', 15.5], ['b09', 5.3], ['b10', 16.4], ['b11', 22.7],
  ['b12', 19.3], ['b13', 25.5], ['b14', 17.9], ['b15', 13.4], ['b16', 19.6], ['b17', 15.1],
  ['b18', 5.7], ['b19', 21.8], ['b20', 16.7], ['b21', 14.1], ['b22', 12.5], ['b23', 15.2],
  ['b24', 19.5], ['b25', 5.6], ['b26', 13.8], ['b27', 19.2], ['b28', 9.9], ['b29', 7.4],
  ['b30', 20.1], ['b31', 12.0], ['b32', 15.5], ['b33', 15.9], ['b34', 8.4], ['b35', 20.5],
  ['b36', 22.9], ['b37', 11.6], ['b38', 16.9], ['b39', 15.1], ['b40', 28.9], ['b41', 16.9],
  ['b42', 18.4], ['b43', 21.5], ['b44', 23.7], ['b45', 12.2], ['b46', 18.7], ['b47', 5.9],
  ['b48', 13.7], ['b49', 17.5], ['b50', 24.1], ['b51', 27.9], ['b52', 6.4], ['b53', 14.2],
  ['b54', 8.9], ['b55', 15.7], ['b56', 10.3], ['facts', 9.5], ['next', 3.6], ['ask', 4.6],
  ['end', 1.6],
];
/* KEY = punch words per beat (used for subtitle highlights and pops; the recap look has no old-style captions) */
const KEY = {
  b01: ['รู้จัก{แกมบิท}', 'ชื่อจริง <เรมี่ เอเตียน เลอโบ>'],
  b02: ['หนุ่มเคจัน โค้ทยาว ตาแดง', 'เรียกผู้หญิงทุกคนว่า{เชร์}'],
  b03: ['แกมบิท = {ยอมเสียหมากเล็ก}', 'เพื่อชนะ<เกมใหญ่>'],
  b04: ['แม้แต่การเปิดตัว', 'ก็ยัง{วุ่นวาย}'],
  b05: ['สร้างโดย{คริส แคลร์มอนต์} กับ[จิม ลี]', 'แต่เล่มพิเศษดัน<วางแผงก่อน>'],
  b06: ['แฟน ๆ เถียงกันถึงวันนี้', 'สรุปคือ{เกิดสองรอบ}'],
  b07: ['ฉบับ 266 แกมบิทมา{ขโมยงานศิลปะ}', 'แต่ไปเจอ<สตอร์มตัวน้อย>ที่กำลังถูกล่า'],
  b08: ['ฝั่งนึงรักเพราะ{เท่}', 'อีกฝั่งหมั่นไส้เพราะ<เท่>'],
  b09: ['ชีวิตของเรมี่', 'ดราม่ายิ่งกว่า{ละครหลังข่าว}'],
  b10: ['นิวออร์ลีนส์มีสองกิลด์', '{กิลด์โจร} กับ <กิลด์นักฆ่า>'],
  b11: ['คำทำนายถึง{ปีศาจขาว}', '<ฌอง-ลุค>ขโมยทารกจากโรงพยาบาล'],
  b12: ['ทารกถูกส่งให้{แอนทีควอรี่}', 'แล้วแอบไปฝาก<แก๊งเด็กข้างถนน>'],
  b13: ['สิบขวบ ไปล้วงกระเป๋า{ฌอง-ลุค}', 'ได้<พ่อบุญธรรม>กับพี่ชายอองรี'],
  b14: ['เรมี่วิ่งไปช่วย{เบลล่า}', 'แต่เธอคือ<ทายาทกิลด์นักฆ่า>'],
  b15: ['รักกันจนได้{แต่งงาน}', 'หวังให้สองกิลด์<เลิกรบกัน>'],
  b16: ['{จูเลียน}ท้าดวลหลังงานแต่ง', 'เรมี่ชนะ แต่<ถูกเนรเทศ>'],
  b17: ['งานแต่งที่{สั้นที่สุด}', 'จุดเริ่มต้นของ<แกมบิท>'],
  b18: ['ไพ่ใบที่มืดที่สุด', 'ชื่อ<มิสเตอร์ซินิสเตอร์>'],
  b19: ['เรมี่รับงาน{รวมทีมมาโรเดอร์ส}', 'แล้ว<นำทางเข้าอุโมงค์>'],
  b20: ['บ้านของ{ชาวมอร์ล็อค}', 'กลายเป็น<การสังหารหมู่>'],
  b21: ['หยุดไม่ทัน แต่ช่วย', '<ซาร่าห์>ออกมาได้หนึ่งคน'],
  b22: ['เก็บความลับไว้{หลายปี}', 'เหมือน<ระเบิดเวลา>'],
  b23: ['ปี 1991 {ทีมสีน้ำเงิน}', 'ไลน์อัปในความทรงจำ[เด็กยุค 90]'],
  b24: ['ปะทะคารมกับ{วูล์ฟเวอรีน}', 'และเป็น[พี่ชาย]ของจูบิลี่'],
  b25: ['อะไรทำให้แกมบิท{เป็นอมตะ}', 'คำตอบคือ<โร้ก>'],
  b26: ['แตะผิวใคร {ดูดพลังและความทรงจำ}', 'เลย<ต้องใส่ถุงมือ>ตลอด'],
  b27: ['นักเสี่ยงที่สุด{ตกหลุมรัก}', 'ผู้หญิงที่<แตะไม่ได้>ที่สุด'],
  b28: ['ความรักที่พิสูจน์ด้วย', '{การอยู่ข้างกัน}'],
  b29: ['ปี 1997 ฉบับ 350', '<ระเบิดเวลาก็ระเบิด>'],
  b30: ['ขึ้นศาลกลาง{แอนตาร์กติกา}', 'ความลับเรื่อง<มาโรเดอร์ส>ถูกเปิด'],
  b31: ['โร้กถูกยุให้{จูบเรมี่}', 'เลย<เห็นความทรงจำทั้งหมด>'],
  b32: ['ป้อมถล่ม โร้กลากเขาออกมา', 'แล้ว<ทิ้งไว้กลางหิมะ>'],
  b33: ['ไม่ใช่ฮีโร่ขาวสะอาด', 'แต่{เดินกลับมาไถ่โทษ}'],
  b34: ['ปี 2006', 'เดิมพัน{ครั้งใหญ่อีกรอบ}'],
  b35: ['อาสาเป็น{ม้าสาวก}ของอะพอคคาลิปส์', 'หวังเป็น[สายลับ]'],
  b36: ['กลายเป็น<เดธ> ความตาย', '{ซันไฟร์}ช่วยดึงกลับมา'],
  b37: ['ปี 2018 {งานแต่งแห่งศตวรรษ}', 'ของคิตตี้กับโคลอสซัส'],
  b38: ['คิตตี้ถอนตัว แกมบิท{ขอแต่งงาน}', 'โร้ก<ตอบตกลง>'],
  b39: ['ฮันนีมูนได้ไม่ทันไร', 'ก็ต้อง{ออกไปกู้โลก}'],
  b40: ['หนังสือเดี่ยว{หลายชุด}', 'ปี 2022 [ผู้สร้างกลับมาเขียนเอง]'],
  b41: ['การ์ตูนทีวีปี 1992', '{ความทรงจำวัยเด็ก}'],
  b42: ["ปี 2024 X-Men '97", 'แกมบิท<สละชีวิต>บนเกาะจีโนชา'],
  b43: ['เขาตายโดยเชื่อว่า', 'โร้ก<ไม่ได้เลือกเขา>'],
  b44: ['ปี 2026 ภาคสอง', 'ถูกปลุกเป็น<ม้าสาวกเดธ>'],
  b45: ['ช่วยกลับมาได้', 'แลกกับ<ไนท์ครอว์เลอร์>'],
  b46: ['ในตู้เกมยุค 90', '{X-Men vs Street Fighter}'],
  b47: ['เส้นทางจอเงิน', 'ต้อง{อดทนยิ่งกว่ารอโร้ก}'],
  b48: ['สามภาคแรกไม่มีแกมบิท', 'ปี 2009 ได้โผล่<นิดเดียว>'],
  b49: ['หนังเดี่ยวเริ่มปี 2014', 'ปี 2019 <ถูกยกเลิก>'],
  b50: ['ปี 2024 ใน{Deadpool & Wolverine}', 'สำเนียงหนักจน<ฟังไม่ออก>'],
  b51: ['กลับมาใน{Avengers: Doomsday}', 'ฉาย[18 ธันวาคม 2026]'],
  b52: ['ทำไมคนถึงรักเขา', 'เพราะ{ไม่สมบูรณ์แบบ}'],
  b53: ['ไม่ใช่ผู้นำ ไม่ใช่นักสู้', 'เป็น{โจรและนักพนัน}'],
  b54: ['แต่ทุกครั้ง', '{เขาเดินกลับมา}'],
  b55: ['ยอมเสียทุกอย่าง', 'เพื่อ{คู่ควรกับคนที่รัก}'],
  b56: ['ราชาไพ่แห่งนิวออร์ลีนส์', '{ฝันดีนะ เชร์}'],
  next: ['อยากฟังประวัติตัวไหนต่อ?', '{คอมเมนต์}บอกหน่อย'],
  ask: ['ถ้าแตะคนที่รักไม่ได้เลย', 'คุณจะ{ยังรักต่อไหม}?'],
};
const CAP = {};
const ST = { STUDIO: [0, 0, 0], NOLA: [200, 0, 0], HOSP: [400, 0, 0], GUILD: [600, 0, 0], WED: [800, 0, 0], LAB: [1000, 0, 0], TUNNEL: [1200, 0, 0], MANSION: [1400, 0, 0],
  ICE: [1600, 0, 0], DESERT: [1800, 0, 0], GENO: [2000, 0, 0], CINEMA: [2200, 0, 0], VOID: [2400, 0, 0] };
const ENV = { STUDIO: [['cstudio']], NOLA: [['gstreet']], HOSP: [['ghosp']], GUILD: [['gguild']], WED: [['gwed']], LAB: [['glab']], TUNNEL: [['gtunnel']], MANSION: [['gmansion']],
  ICE: [['ice', {}]], DESERT: [['desert', { seed: 19 }]], GENO: [['ggenosha']], CINEMA: [['gcinema']], VOID: [['gvoid']] };
const W = 'rgba(255,255,255,1)';
const CAST = {
  gam: ['gambit', 1], gkid: ['gambitKid', 1], baby: ['baby', 1], jl: ['jeanluc', 1], henri: ['henri', 1], anti: ['antiquary', 1], bkid: ['bellaKid', 1], bella: ['bella', 1], julien: ['julien', 1],
  sin: ['sinister', 1], sabre: ['sabre', 1], mar1: ['marauder', 1], mar2: ['marauder', 1], sarah: ['sarah', 1], storm: ['storm', 1], skid: ['stormKid', 1],
  cyc: ['cyclops', 1], wol: ['wolverine', 1], beast: ['beast', 1], psy: ['psylocke', 1], jub: ['jubilee', 1], rog: ['rogue', 1], hunter: ['hunter', 1], erik: ['erik', 1],
  apoc: ['apoc', 1], hor1: ['horseman', 1], hor2: ['horseman', 1], sun: ['sunfire', 1], kitty: ['kitty', 1], colos: ['colossus', 1], kurt: ['kurt', 1], dp: ['dp', 1], elek: ['elektra', 1], blade: ['blade', 1], x23: ['x23', 1],
  ex1: ['extra', 1, 0], ex2: ['extra', 1, 1], ex3: ['extra', 1, 2], ex4: ['extra', 1, 3], k1: ['extraKid', 1, 0], k2: ['extraKid', 1, 3],
  card: ['paper', 0.9], cglow: ['glow', 0.16, 'rgba(255,214,150,1)'], boom: ['boom', 0.6], boom2: ['boom', 0.9], puff: ['puff', 0.7], flash: ['flash', 2.4], spark: ['glow', 0.22, 'rgba(255,230,170,1)'],
  dark: ['dark', 0.7], dark2: ['dark', 1.2, 'rgba(90,40,120,1)'], fireg: ['glow', 0.7, 'rgba(255,150,70,1)'], giant: ['giant', 1], mem1: ['glow', 0.12, 'rgba(160,200,255,1)'], mem2: ['glow', 0.12, 'rgba(160,200,255,1)'], mem3: ['glow', 0.12, 'rgba(160,200,255,1)'],
  hrt1: ['glow', 0.14, 'rgba(255,120,170,1)'], hrt2: ['glow', 0.14, 'rgba(255,120,170,1)'], cf1: ['glow', 0.1, 'rgba(255,210,120,1)'], cf2: ['glow', 0.1, 'rgba(160,220,255,1)'], cf3: ['glow', 0.1, 'rgba(255,150,200,1)'],
  board: ['checker', 0.24, 8], pawn: ['chessP', 0.28, '#2a2a32'], king: ['chessP', 0.42, '#e4dccb'], tbl: ['table', 1.1, '#6a4a32'], desk: ['desk', 1],
  bk1: ['book', 1.4, '#3a5a9a'], bk2: ['book', 1.4, '#9a3a3a'], bk3: ['book', 1.3, '#3a8a6a'], bk4: ['book', 1.3, '#8a6a2a'], bk5: ['book', 1.3, '#6a3a8a'],
  cot: ['cot', 1.1], frm1: ['frame', 1.6], frm2: ['frame', 1.6], podium: ['podium', 1.2], cage: ['cage', 2.4], rose: ['rose', 1.4, '#e04a5a'], ring: ['ring', 1.2], tv: ['tvwall', 0.9, 5, 3],
  booth: ['booth', 1.3, '#4a3a7a'], mon: ['monitor', 1.4], sofa: ['sofa', 1, '#6a7a9a'], pp1: ['paper', 1.6], pp2: ['paper', 1.6], pp3: ['paper', 1.6],
  s1: ['sign', 0.75, 'เรมี่ เอเตียน เลอโบ', '#ffd66a'], s2: ['sign', 0.65, 'เกิด: นิวออร์ลีนส์', '#bfe6ff'], s3: ['sign', 0.65, 'พลัง: ชาร์จไพ่ให้ระเบิด', '#ffb3c6'],
  sA: ['sign', 0.6, 'Annual #14', '#bfe6ff'], sB: ['sign', 0.6, 'Uncanny X-Men #266', '#ffd66a'], sC: ['sign', 0.55, 'คริส แคลร์มอนต์', '#fff'], sD: ['sign', 0.55, 'จิม ลี', '#fff'], sE: ['sign', 0.55, 'ไมค์ คอลลินส์', '#fff'],
  gT: ['sign', 0.7, 'กิลด์โจร', '#ffd66a'], gA: ['sign', 0.7, 'กิลด์นักฆ่า', '#ff8a8a'], sec: ['sign', 0.8, 'ความลับ', '#ff6a6a'], blue: ['sign', 0.8, 'ทีมสีน้ำเงิน · 1991', '#9fd3ff'],
  s350: ['sign', 1.0, 'ฉบับ 350 · 1997', '#ffd66a'], mag: ['sign', 0.7, 'ที่จริงคือ แม็กนีโต้', '#ff8a8a'], s2006: ['sign', 1.0, '2006', '#ffd66a'],
  y1: ['sign', 0.55, '1993', '#fff'], y2: ['sign', 0.55, '1999', '#fff'], y3: ['sign', 0.55, '2004', '#fff'], y4: ['sign', 0.55, '2012', '#fff'], y5: ['sign', 0.55, '2022', '#ffd66a'],
  s1992: ['sign', 0.9, 'การ์ตูนทีวี 1992', '#ffd66a'], sGame: ['sign', 0.7, 'X-Men vs Street Fighter', '#ffd66a'], s2009: ['sign', 1.4, '2009 · เทย์เลอร์ คิทช์', '#ffd66a'],
  s2014: ['sign', 1.2, '2014 เริ่มพัฒนา', '#bfe6ff'], s2019: ['sign', 1.2, '2019 ยกเลิก', '#ff8a8a'], sDW: ['sign', 0.8, 'Deadpool & Wolverine · 2024', '#ffd66a'],
  sDD: ['sign', 1.5, 'Avengers: Doomsday', '#ffd66a'], sDate: ['sign', 1.2, '18 ธันวาคม 2026', '#fff'], sTat: ['sign', 1.0, 'แชนนิ่ง เททัม', '#fff'], s2026: ['sign', 0.9, "X-Men '97 ภาคสอง · 2026", '#ffd66a'],
  oc1: ['paper', 0.9], oc2: ['paper', 0.9], oc3: ['paper', 0.9], oc4: ['paper', 0.9], og1: ['glow', 0.12, 'rgba(255,214,150,1)'], og2: ['glow', 0.12, 'rgba(255,214,150,1)'], og3: ['glow', 0.12, 'rgba(255,214,150,1)'], og4: ['glow', 0.12, 'rgba(255,214,150,1)'],
  b1: ['boom', 0.45], b2: ['boom', 0.45], b3: ['boom', 0.45], bolt: ['bolt', 1],
  sn1: ['glow', 0.05, W], sn2: ['glow', 0.05, W], sn3: ['glow', 0.05, W], sn4: ['glow', 0.05, W], sn5: ['glow', 0.05, W], sn6: ['glow', 0.05, W], sn7: ['glow', 0.05, W], sn8: ['glow', 0.05, W],
};
const qb = (st, a, b, c, t0, t1) => (u) => { const k = U.easeIO(U.clamp((u - t0) / (t1 - t0))), m = 1 - k; return H.at(st, m * m * a[0] + 2 * m * k * b[0] + k * k * c[0], m * m * a[1] + 2 * m * k * b[1] + k * k * c[1], m * m * a[2] + 2 * m * k * b[2] + k * k * c[2]); };
const SNOW = ['sn1', 'sn2', 'sn3', 'sn4', 'sn5', 'sn6', 'sn7', 'sn8'];
const snowA = () => { const o = {}; SNOW.forEach((k, i) => (o[k] = { p: [-4 + i, 0, 3] })); return o; };
const snowFx = (r, t, s, o, st) => SNOW.forEach((k, i) => { if (!o[k]) return; const y = 4.6 - ((t * 0.55 + i * 0.57) % 4.6); o[k].position.copy(H.at(st, -5 + i * 1.4 + Math.sin(t + i) * 0.3, y, -1 + (i % 3) * 1.1)); });
/* throw the card from the actor's right hand to a point (x, y, z) between r0..r1, glowing; hides after */
const cardFx = (who, to, r0, r1) => (r, t, s, o, st) => { if (!o.card || !o[who]) return; const hand = H.hand(o[who], 'R');
  const fly = r >= r0 && r < r1, path = qb(st, [0, 0, 0], [0, 0, 0], to, r0, r1), base = hand.clone().add(new T.Vector3(0, 0.12, 0.14));
  let p = base; if (fly) { const k = U.easeIO(U.clamp((r - r0) / (r1 - r0))); p = base.clone().lerp(H.at(st, to[0], to[1], to[2]), k); p.y += Math.sin(k * Math.PI) * 1.2; }
  o.card.position.copy(p); o.card.rotation.set(fly ? t * 14 : 1.3, fly ? t * 9 : 0, 0.3); o.card.visible = r < r1;
  if (o.cglow) { o.cglow.position.copy(p); o.cglow.visible = r > r0 - 0.8 && r < r1; o.cglow.scale.setScalar(0.48 * (1 + 0.25 * Math.sin(t * 18))); } };
/* skill FX: cards orbiting an actor, extra cards thrown from the hand (each lands with a small boom) */
const OC = [['oc1', 'og1'], ['oc2', 'og2'], ['oc3', 'og3'], ['oc4', 'og4']];
const cardsA = (n) => { const a = {}; OC.slice(0, n || 4).forEach(([c, g]) => { a[c] = {}; a[g] = {}; }); return a; };
const noCards = () => { const a = { b1: null, b2: null, b3: null }; OC.forEach(([c, g]) => { a[c] = null; a[g] = null; }); return a; };
const orbitK = (who, r0, r1, n, rad) => (r, t, s, o) => { if (!o[who]) return; const c = H.pos(o[who], 1.1), L = OC.slice(0, n || 4);
  L.forEach(([ck, gk], i) => { const a = t * 2.4 + i * 2 * Math.PI / L.length, on = r > r0 && r < r1, p = new T.Vector3(c.x + Math.cos(a) * (rad || 1.15), c.y + 0.3 * Math.sin(a * 2 + i), c.z + Math.sin(a) * (rad || 1.15));
    if (o[ck]) { o[ck].visible = on; o[ck].position.copy(p); o[ck].rotation.set(1.2, -a, 0.2); } if (o[gk]) { o[gk].visible = on; o[gk].position.copy(p); o[gk].scale.setScalar(0.36 * (1 + 0.25 * Math.sin(t * 16 + i))); } }); };
const throwK = (who, ck, gk, to, r0, r1, show) => (r, t, s, o, st) => { const c = o[ck]; if (!c || !o[who]) return; const base = H.hand(o[who], 'R').add(new T.Vector3(0, 0.12, 0.14));
  let p = base; if (r >= r0) { const e = U.easeIO(U.clamp((r - r0) / (r1 - r0))); p = base.clone().lerp(H.at(st, to[0], to[1], to[2]), e); p.y += Math.sin(e * Math.PI) * 1.0; }
  const vis = r > (show == null ? r0 - 0.5 : show) && r < r1; c.visible = vis; c.position.copy(p); c.rotation.set(r >= r0 ? t * 14 : 1.3, r >= r0 ? t * 9 : 0, 0.3);
  const g = o[gk]; if (g) { g.visible = vis; g.position.copy(p); g.scale.setScalar(0.4 * (1 + 0.25 * Math.sin(t * 18))); } };
const both = (...f) => (r, t, s, o, st) => f.forEach((x) => x && x(r, t, s, o, st));
const pulse = (key, base, sp) => (r, t, s, o) => { if (o[key]) o[key].scale.setScalar(base * (1 + 0.2 * Math.sin(t * (sp || 6)))); };
const popSeq = (keys, r0, gap) => { const o = {}; keys.forEach((k, i) => (o[k] = { pop: r0 + i * gap })); return o; };
const C2 = [0, 0, 1.0, 0, 3.8, 0.45, 0], CW = [0, 0, 1.0, -0.5, 5.6, 0.6, 0];
const SC = {
  cover: { st: 'NOLA', bg: 'night', cam: [0, 1.6, 1.0, 0, 3.6, 0.42, -0.3], A: Object.assign({ gam: { p: [3.0, 0], f: -20, pose: 'give' }, rog: { p: [4.6, -0.6], f: -35, pose: 'hips' }, card: {}, cglow: {} }, cardsA(4)),
    fx: both(cardFx('gam', [0, 0, 0], 99, 100), orbitK('gam', -1, 99)) },
  b01: { st: 'STUDIO', bg: 'palace', cam: [[0, 0.6, 1.0, 0, 4.4, 0.5, 0.2], [8, 0.4, 1.0, 0, 3.6, 0.42, 0.1]], A: Object.assign({ gam: { p: [1.8, 0], f: -15, pose: 'hips' }, card: {}, cglow: {} },
      { s1: { p: [-2.4, 0, 3.9], pop: 1.0 }, s2: { p: [-2.4, 0, 3.0], pop: 3.5 }, s3: { p: [-2.4, 0, 2.1], pop: 6.5 } }, cardsA(4)), sfx: [[1.0, 'pop'], [3.5, 'pop'], [6.5, 'pop'], [9, 'shimmer']], fx: both(cardFx('gam', [0, 0, 0], 99, 100), orbitK('gam', 9, 99)) },
  b02: { st: 'NOLA', bg: 'night', cam: [[0, -1.2, 1.0, 0, 4.4, 0.45, 0.4], [14, 0.8, 1.0, 0, 3.8, 0.42, -0.2]], A: { gam: { p: [-5.5, 0.4], to: [0.4, 0.2, 0.5, 9], f: 0, pose: (c, r) => { if (r > 9) POSE.give(c); }, say: ['เชร์', 14, 18] },
      ex2: { p: [2.6, 0], f: -40, pose: (c, r) => { if (r > 18) POSE.shrug(c); } }, card: {}, cglow: {}, oc1: {}, og1: {}, oc2: {}, og2: {}, oc3: {}, og3: {} }, sfx: [[1, 'shimmer'], [9.5, 'shimmer'], [14, 'pop']], fx: both(cardFx('gam', [0, 0, 0], 99, 100), orbitK('gam', 0.5, 9, 3, 1.0)) },
  b03: { st: 'STUDIO', bg: 'palace', cam: [[0, 0, 1.0, 0, 3.2, 0.62, 0.2], [9, 0.4, 0.9, 0, 2.6, 0.7, 0.1]], A: { tbl: { p: [0, 0] }, board: { p: [0, 0, 0.88] }, king: { p: [0.5, -0.2, 0.9] }, pawn: { p: [-0.3, 0.1, 0.9], to: [-1.1, 0.5, 4, 6, 0.9] },
      gam: { p: [1.9, 0.4], f: -45, pose: 'think' }, card: null, cglow: null }, sfx: [[4, 'tok'], [6, 'soft']] },
  b04: { st: 'STUDIO', cam: C2, A: { tbl: null, board: null, king: null, pawn: null, gam: { p: [0, 0], f: 0, pose: 'shrug', say: ['?', 1, 99, true] } }, sfx: [[1, 'pop']] },
  b05: { st: 'STUDIO', cam: [[0, 0, 1.0, 0, 4.6, 0.5, 0], [12, 0, 1.0, 0, 4.2, 0.48, 0]], A: Object.assign({ gam: { p: [3.2, 0.3], f: -25, pose: 'point' }, desk: { p: [-1.2, -0.6] },
      bk1: { p: [-2.2, -0.6, 1.25], pop: 1.0, spin: 0.4 }, bk2: { p: [-0.3, -0.6, 1.25], pop: 6.0, spin: 0.4 } },
      { sA: { p: [-2.2, -0.6, 2.3], pop: 1.2 }, sB: { p: [-0.3, -0.6, 2.9], pop: 6.2 }, sC: { p: [-3.6, 0.8, 3.6], pop: 2.5 }, sD: { p: [-1.6, 0.8, 3.6], pop: 3.3 }, sE: { p: [0.6, 0.8, 3.6], pop: 4.6 } }),
    sfx: [[1, 'pop'], [2.5, 'tok'], [3.3, 'tok'], [4.6, 'tok'], [6, 'bell']] },
  b06: { st: 'STUDIO', cam: CW, A: { desk: null, bk1: null, bk2: null, sA: null, sB: null, sC: null, sD: null, sE: null, gam: { p: [0, -1.2], f: 0, pose: 'shrug' },
      ex1: { p: [-2.2, 0.6], f: 40, pose: 'point', say: ['เล่มพิเศษสิ!', 1, 6] }, ex2: { p: [2.2, 0.6], f: -40, pose: 'fist', say: ['เล่ม 266!', 3, 8] } }, sfx: [[1, 'pop'], [3, 'pop']] },
  b07: { st: 'GUILD', bg: 'hall', cam: [[0, -1.5, 1.0, 0, 4.4, 0.5, 0.2], [10, 0.5, 1.0, 0, 5.2, 0.55, 0], [22, 0.5, 1.0, 0, 4.0, 0.45, 0]], flash: [16.5, 0.3, 'rgba(255,220,170,'], shake: [16.5, 17.2, 0.08],
    A: { frm1: { p: [-1.2, -4.2, 2.2] }, frm2: { p: [1.2, -4.2, 2.2] }, gam: { p: [-4.5, 0.5], to: [-1.2, -1.6, 0.5, 6], f: 0, pose: (c, r) => { if (r > 6 && r < 10) POSE.reach(c); if (r > 13) POSE.give(c); }, say: ['ระวัง!', 13, 15.5] },
      skid: { p: [5.5, 0.8], to: [1.4, 0.4, 8, 11], f: -60, ex: 'worried' }, dark: { p: [4.5, -1.6, 1.6], pop: 11.5, out: 17 }, boom: { p: [4.5, -1.6, 1.4], pop: 16.4, out: 18 }, card: {}, cglow: {}, oc1: {}, og1: {}, oc2: {}, og2: {},
      b1: { p: [3.8, -1.2, 0.9], pop: 16.6, out: 17.8 }, b2: { p: [5.2, -2.0, 2.0], pop: 16.8, out: 18 } },
    sfx: [[6, 'soft'], [11.5, 'zap'], [15.6, 'zip'], [16.4, 'puff'], [16.8, 'puff'], [22, 'chime']], fx: both(cardFx('gam', [4.5, 1.5, -1.6], 15.6, 16.4), throwK('gam', 'oc1', 'og1', [3.8, 1.0, -1.2], 15.8, 16.6), throwK('gam', 'oc2', 'og2', [5.2, 2.0, -2.0], 16.0, 16.8), pulse('dark', 2.1, 4)) },
  b08: { st: 'STUDIO', bg: 'palace', cam: CW, A: { ex1: { p: [-2, 0], f: 25, pose: 'up', say: ['เท่!', 0.8, 6] }, ex2: { p: [2, 0], f: -25, pose: 'hips', say: ['หมั่นไส้!', 3.5, 9] }, hrt1: { p: [-2, 0, 3.6], pop: 1 }, gam: { p: [0, -1.4], f: 0, pose: 'shrug' } },
    sfx: [[0.8, 'pop'], [3.5, 'pop']], fx: pulse('hrt1', 0.42, 5) },
  b09: { st: 'NOLA', bg: 'night', cam: [[0, -6, 1.6, -2, 6.5, 0.9, 1.0], [4, 5, 1.6, -2, 6.5, 0.9, -1.0]] },
  b10: { st: 'NOLA', cam: [[0, 0, 1.0, -0.5, 6.4, 0.6, 0]], A: { ex1: { p: [-3.6, 0], f: 60, pose: 'hips' }, ex2: { p: [-2.2, 0.6], f: 60, pose: 'hips' }, ex3: { p: [2.2, 0.6], f: -60, pose: 'fist' }, ex4: { p: [3.6, 0], f: -60, pose: 'hips' },
      gT: { p: [-2.9, 0, 3.4], pop: 4 }, gA: { p: [2.9, 0, 3.4], pop: 6 } }, sfx: [[4, 'pop'], [6, 'pop']] },
  b11: { st: 'HOSP', bg: 'dawn', cam: [[0, 0, 1.0, 0, 4.4, 0.55, 0.3], [12, 1.0, 1.0, 0, 4.4, 0.5, -0.2]], A: { cot: { p: [0, -0.8] }, baby: { p: [0, -0.8, 0.55], pop: 0.3 },
      jl: { p: [-5, 0.6], to: [-0.9, 0.2, 4, 8], f: 40, pose: (c, r) => { if (r > 9) POSE.hold(c); }, ex: 'giggle' } },
    sfx: [[9, 'shimmer']], fx: (r, t, s, o, st) => { if (r > 9) { const h = H.hand(o.jl, 'R'), h2 = H.hand(o.jl, 'L'); o.baby.position.set((h.x + h2.x) / 2, (h.y + h2.y) / 2 - 0.2, (h.z + h2.z) / 2 + 0.1); } } },
  b12: { st: 'GUILD', bg: 'hall', cam: [[0, 0, 1.0, 0, 4.6, 0.5, 0], [10, 0, 1.0, 0, 5.4, 0.55, 0]], A: { anti: { p: [2.2, -0.8], f: -30, pose: 'bless' }, dark: { p: [2.2, -1.2, 2.2], pop: 0.5 },
      jl: { p: [-1, 0], to: [-5.5, 1, 9, 13], f: 40, pose: (c, r) => { if (r < 6) POSE.hold(c); } }, baby: { p: [0, 0, 0] },
      gkid: { p: [-6, 1.4], to: [-1.6, 1.0, 12, 15], f: 30, pop: 11.5 }, k1: { p: [-6.8, 1.8], to: [-2.6, 1.6, 12.2, 15.2], pop: 11.6 }, k2: { p: [-7.4, 0.8], to: [-0.6, 1.8, 12.4, 15.4], pop: 11.7 } },
    sfx: [[0.5, 'zap'], [11.5, 'zip']], fx: both(pulse('dark', 2.1, 3), (r, t, s, o) => { if (r < 6) { const h = H.hand(o.jl, 'R'), h2 = H.hand(o.jl, 'L'); o.baby.position.set((h.x + h2.x) / 2, (h.y + h2.y) / 2 - 0.2, (h.z + h2.z) / 2 + 0.1); } else o.baby.visible = false; }) },
  b13: { st: 'NOLA', bg: 'night', cam: [[0, 0, 1.0, 0, 4.0, 0.45, 0.2], [14, 0.8, 1.0, 0, 4.6, 0.5, 0]], A: { jl: { p: [0.8, 0], f: -30 }, gkid: { p: [-3.5, 1], to: [-0.2, 0.4, 1, 5], f: 60, pose: (c, r) => { if (r > 5 && r < 8) POSE.give(c); } },
      henri: { p: [4.5, -0.4], to: [2.4, -0.2, 15, 18], pop: 14.8, f: -40, pose: 'wave' } },
    sfx: [[5.5, 'soft'], [8, 'tok'], [15, 'pop']], fx: (r, t, s, o) => { if (r > 8) { o.jl.rotation.y = -1.6; POSE.give(o.jl); o.jl.userData.setExpr('giggle'); o.gkid.userData.setExpr(r < 11 ? 'worried' : 'happy'); } } },
  b14: { st: 'NOLA', cam: [[0, 0, 1.0, 0, 4.4, 0.45, 0]], A: { jl: null, henri: null, gkid: { p: [-5, 0.8], to: [-2.2, 0.6, 3, 6], f: 70 }, bkid: { p: [0.6, 0], f: 40, pose: (c, r) => { if (r > 8) POSE.fist(c, r, r); } },
      k1: { p: [2.2, 0.3], f: -60, fall: [9, 9.8], fallDir: -1 }, k2: { p: [3.2, -0.4], f: -70, fall: [10, 10.8], fallDir: -1 }, puff: { p: [2.6, 0], pop: 9.2 } },
    sfx: [[3, 'zip'], [9, 'puff'], [10, 'tok']], fx: (r, t, s, o) => { if (r > 11) o.gkid.userData.setExpr('worried'); } },
  b15: { st: 'WED', bg: 'palace', cam: [[0, 0, 1.0, -1.4, 3.6, 0.45, 0], [7, 0, 1.0, -1.4, 3.1, 0.4, 0]], A: { gam: { p: [-0.6, -2.6], f: 40, pose: 'give' }, bella: { p: [0.6, -2.6], f: -40, pose: 'give' },
      cf1: { p: [-1, -2.6, 3.4] }, cf2: { p: [0, -2.6, 3.8] }, cf3: { p: [1, -2.6, 3.5] }, card: null, cglow: null }, sfx: [[0.5, 'bell'], [5, 'chime']],
    fx: (r, t, s, o, st) => ['cf1', 'cf2', 'cf3'].forEach((k, i) => o[k].position.copy(H.at(st, -1.5 + i * 1.5 + Math.sin(t + i) * 0.4, 4 - ((t * 0.8 + i) % 3.5), -2.6))) },
  b16: { st: 'NOLA', bg: 'night', cam: [[0, 0, 1.0, 0, 4.4, 0.45, 0], [10, 1.2, 1.0, 0, 3.8, 0.42, 0]], flash: [8, 0.3, 'rgba(255,220,170,'], shake: [8, 8.6, 0.06],
    A: { gam: { p: [-1.8, 0], f: 70, pose: (c, r) => { if (r > 7 && r < 9) POSE.give(c); else POSE.down(c); } }, julien: { p: [3.5, 0], to: [0.4, 0, 2, 7], f: -70, pose: 'fist', fall: [8.2, 9.2], fallDir: -1 },
      bella: { p: [4.2, -2], f: -30, pop: 1, pose: (c, r) => { if (r > 9) POSE.cry(c, r, r); } }, puff: { p: [0.5, 0], pop: 8.2 }, boom: { p: [0.5, 0, 1.2], pop: 8, out: 9.5 }, card: {}, cglow: {} },
    sfx: [[2, 'zip'], [7.4, 'zip'], [8, 'puff']], fx: both(cardFx('gam', [0.5, 1.2, 0], 7.4, 8.1), (r, t, s, o) => { if (r > 9) { o.bella.userData.setExpr('cry'); o.gam.userData.setExpr('worried'); } }) },
  b17: { st: 'NOLA', cam: [[0, 0, 1.0, -2, 5.6, 0.55, 0]], A: { julien: null, puff: null, boom: null, card: null, cglow: null, gam: { p: [-0.4, 0.4], to: [-1, -6, 1, 13], f: 180, ex: 'worried' }, bella: { p: [3, 0], f: -40, pose: 'cry', ex: 'cry' } } },
  b18: { st: 'LAB', bg: 'grove', cam: [[0, 0, 1.0, 0, 4.2, 0.45, 0], [4, 1.2, 1.2, 0, 3.4, 0.4, -0.2]], A: { gam: { p: [-1.8, 0.6], f: 50, ex: 'worried' }, sin: { p: [1.6, -0.6], f: -40, pop: 0.6, pose: 'hips', ex: 'giggle' }, dark2: { p: [1.6, -1.6, 2.2], pop: 0.4 } },
    sfx: [[0.5, 'zap']], fx: pulse('dark2', 3.6, 2.5) },
  b19: { st: 'LAB', cam: [[0, 0, 1.0, 0, 5.0, 0.5, 0], [12, 0, 1.0, 0, 5.6, 0.55, 0]], A: { sin: { p: [0, -1], f: 0, pose: 'point' }, gam: { p: [-1.6, 0.4], f: 30, pose: 'give', ex: 'happy' },
      mar1: { p: [-6, 1], to: [1.6, 0.6, 6, 10], f: -20, pop: 5.8 }, mar2: { p: [6, 1.4], to: [2.9, 0.2, 7, 11], f: -40, pop: 6.8 } }, sfx: [[6, 'zip'], [7, 'zip'], [11, 'tok']], fx: pulse('dark2', 3.6, 2.5) },
  b20: { st: 'TUNNEL', bg: 'storm', cam: [[0, 0, 1.0, 0, 5.2, 0.5, 0]], flash: [6, 0.25, 'rgba(255,190,140,'], shake: [6, 6.6, 0.06],
    A: { ex1: { p: [1, 0.4], to: [-6, 0.6, 1, 5], ex: 'worried' }, ex3: { p: [2.2, -0.6], to: [-6, -0.2, 1.5, 5.6], ex: 'worried' }, mar1: { p: [5, 0], to: [0.6, 0, 3, 7], f: -80, pose: 'fist' }, mar2: { p: [6, -0.8], to: [2, -0.6, 3.4, 7.6], f: -80, pose: 'fist' },
      puff: { p: [-2.2, 0], pop: 6 }, boom: { p: [-2.4, 0, 1], pop: 6, out: 7.6 } }, sfx: [[1, 'zip'], [6, 'puff']] },
  b21: { st: 'TUNNEL', cam: [[0, 0, 1.0, 0, 4.4, 0.45, 0], [8, -0.8, 1.0, 0, 4.0, 0.45, 0.2]], A: { ex1: null, ex3: null, mar1: null, mar2: null, puff: null, boom: null,
      gam: { p: [-4.5, 0.6], to: [-0.8, 0.2, 0.5, 3.5], f: 70, fall: [4.6, 5.4], fallDir: 1, ex: 'worried' }, sabre: { p: [1.6, -0.4], f: -70, pose: 'fist', out: 7 }, sarah: { p: [-1.6, -1.6], f: 30, ex: 'cry', pose: 'cry' } },
    sfx: [[4.6, 'tok']], fx: (r, t, s, o, st) => { if (r > 7) { o.gam.rotation.z = 0; o.gam.visible = true; o.gam.position.copy(H.at(st, -0.8 + (r - 7) * -0.7, 0, 0.2)); o.gam.rotation.y = -1.4; POSE.hold(o.gam); o.sarah.position.copy(H.at(st, -1.4 + (r - 7) * -0.7, 0, -0.4)); o.sarah.rotation.y = -1.4; o.sarah.userData.setExpr('worried'); } } },
  b22: { st: 'MANSION', bg: 'day', cam: [[0, 0, 1.0, 0, 3.8, 0.45, 0], [8, 0, 1.2, 0, 3.0, 0.4, 0]], A: Object.assign({ gam: { p: [0.8, 0], f: -10, pose: 'give', ex: 'giggle' }, card: {}, cglow: {}, sec: { p: [-2.2, -1.5, 3.4], pop: 3 }, dark: { p: [-2.2, -2, 3.0], pop: 2.6 } }, cardsA(4)),
    sfx: [[1, 'shimmer'], [3, 'zap']], fx: both(cardFx('gam', [0, 0, 0], 99, 100), orbitK('gam', 0.8, 99), pulse('dark', 2.1, 5)) },
  b23: { st: 'MANSION', cam: [[0, -2, 1.0, 0, 6.6, 0.6, 0], [12, 2, 1.0, 0, 6.6, 0.6, 0]], A: Object.assign(noCards(), { sec: null, dark: null, card: null, cglow: null, blue: { p: [0, -1.5, 4.4], pop: 0.6 },
      cyc: { p: [-4.8, 0], f: 10, pop: 1.0 }, wol: { p: [-3.2, 0.3], f: 10, pop: 1.8, pose: 'fist' }, rog: { p: [-1.6, 0], f: 5, pop: 2.6, pose: 'hips' }, gam: { p: [0, 0.3], f: 0, pop: 3.4, pose: 'give' },
      beast: { p: [1.6, 0], f: -5, pop: 4.2 }, psy: { p: [3.2, 0.3], f: -10, pop: 5.0 }, jub: { p: [4.8, 0], f: -15, pop: 5.8, pose: 'wave' } }), sfx: [[0.6, 'bell'], [1, 'pop'], [1.8, 'pop'], [2.6, 'pop'], [3.4, 'pop'], [4.2, 'pop'], [5, 'pop'], [5.8, 'pop']] },
  b24: { st: 'MANSION', cam: [[0, 0, 1.0, 0, 4.8, 0.5, 0]], flash: [6.5, 0.2, 'rgba(255,220,170,'], A: { blue: null, cyc: null, rog: null, beast: null, psy: null,
      gam: { p: [-1.4, 0], f: 70, pose: (c, r) => { if (r > 5.4 && r < 7) POSE.give(c); else POSE.fist(c, r, r); }, say: ['ช้าไปนะ', 2, 5] }, wol: { p: [1.4, 0], f: -70, pose: 'fist' }, puff: { p: [0.9, 0], pop: 6.5 }, card: {}, cglow: {}, jub: { p: [4, 0.8], f: -30, pose: 'up' }, cf1: { p: [4, 0.8, 3.2] }, cf2: { p: [4.4, 0.8, 3.6] }, cf3: { p: [3.6, 0.8, 3.7] } },
    sfx: [[2, 'pop'], [5.8, 'zip'], [6.5, 'puff'], [12, 'shimmer']], fx: both(cardFx('gam', [0.9, 1.6, 0], 5.8, 6.5), (r, t, s, o, st) => { ['cf1', 'cf2', 'cf3'].forEach((k, i) => { const a = t * 3 + i * 2.1; o[k].position.copy(H.at(st, 4 + Math.cos(a) * 0.6, 3.5 + Math.sin(a * 1.3) * 0.4, 0.8)); }); if (r > 6.3 && r < 7.2) o.wol.position.y += Math.sin((r - 6.3) / 0.9 * Math.PI) * 0.6; }) },
  b25: { st: 'MANSION', cam: [[0, 0, 1.0, 0, 4.2, 0.45, 0]], A: { card: null, cglow: null, wol: null, puff: null, jub: null, cf1: null, cf2: null, cf3: null, gam: { p: [-1.2, 0], f: 20, ex: 'giggle' }, rog: { p: [5, -0.4], to: [1.3, 0, 1, 4], f: -40, pose: 'hips' } } },
  b26: { st: 'MANSION', cam: [[0, 0, 1.0, 0, 4.0, 0.45, 0], [7, 0.6, 1.0, 0, 3.4, 0.42, 0]], A: { gam: null, rog: { p: [-0.8, 0], f: 60, pose: (c, r) => { if (r > 3 && r < 6) POSE.give(c); }, ex: 'worried' },
      ex2: { p: [0.8, 0], f: -60, fall: [5, 6], fallDir: -1 }, mem1: { p: [0.8, 0, 2.4], pop: 4, out: 6.5 } }, sfx: [[4, 'shimmer'], [5.5, 'tok']] },
  b27: { st: 'MANSION', cam: [[0, 0, 1.0, 0, 3.6, 0.45, 0], [10, 0, 1.1, 0, 3.0, 0.42, 0]], A: { ex2: null, mem1: null, gam: { p: [-0.75, 0], f: 50, pose: 'give', ex: 'giggle' }, rog: { p: [0.75, 0], f: -50, pose: (c, r) => { if (r < 8) POSE.hips(c); else POSE.reach(c); }, ex: 'happy' },
      rose: { on: ['gam', 'R', 0, 0.1, 0.12], pop: 1 }, spark: { p: [0, 0.3, 1.62], pop: 9 } }, sfx: [[1, 'pop'], [9, 'shimmer']], fx: (r, t, s, o) => { if (o.spark) o.spark.visible = r > 9 && Math.sin(t * 24) > -0.2; } },
  b28: { st: 'STUDIO', bg: 'palace', cam: CW, A: { ex1: { p: [-1.6, 0], f: 20, pose: 'up', ex: 'giggle' }, ex4: { p: [1.6, 0], f: -20, pose: 'up', ex: 'giggle' }, hrt1: { p: [-1.6, 0, 3.6], pop: 0.5 }, hrt2: { p: [1.6, 0, 3.6], pop: 1 } },
    sfx: [[0.5, 'pop'], [1, 'pop']], fx: both(pulse('hrt1', 0.42, 5), pulse('hrt2', 0.42, 6)) },
  b29: { st: 'ICE', bg: 'ice', cam: [[0, 0, 1.6, -1, 6.4, 0.8, 0]], A: Object.assign({ s350: { p: [0, -1, 3.4], pop: 0.8 } }, snowA()), sfx: [[0.8, 'bell']], fx: snowFx },
  b30: { st: 'ICE', cam: [[0, 0, 1.0, -0.8, 5.6, 0.55, 0], [10, 1.6, 1.0, -0.8, 4.6, 0.5, -0.2]], A: { s350: null, podium: { p: [3, -2] }, erik: { p: [3, -2.6, 0.4], f: -30, pose: 'point' },
      gam: { p: [-0.4, 0.4], f: 20, pose: 'down', ex: 'worried' }, hunter: { p: [-1.6, 0.8], f: 30, pose: 'hips' }, cage: { p: [-3.8, -2] }, cyc: { p: [-4.4, -2], f: 20 }, rog: { p: [-3.4, -2.1], f: 20, ex: 'worried' }, wol: { p: [-3.9, -2.8], f: 20 } },
    sfx: [[2, 'tok'], [9, 'zap']], fx: snowFx },
  b31: { st: 'ICE', cam: [[0, 0, 1.0, 0, 3.4, 0.42, 0]], A: { podium: null, erik: null, hunter: null, cage: null, cyc: null, wol: null, rog: { p: [0.7, 0], f: -60, pose: 'reach', ex: 'worried' }, gam: { p: [-0.7, 0], f: 60, pose: 'reach', ex: 'sleepy' },
      mem1: { p: [0, 0, 2] }, mem2: { p: [0, 0, 2] }, mem3: { p: [0, 0, 2] } }, sfx: [[1.5, 'shimmer']],
    fx: (r, t, s, o, st) => ['mem1', 'mem2', 'mem3'].forEach((k, i) => { const u = ((t * 0.6 + i / 3) % 1); o[k].visible = r > 1.5; o[k].position.copy(H.at(st, -0.6 + u * 1.2, 2.5 + Math.sin(u * Math.PI) * 0.6, 0.2)); }) },
  b32: { st: 'ICE', cam: [[0, 0, 1.0, -0.5, 5.4, 0.55, 0], [7, 1.2, 1.0, -1.5, 6.0, 0.6, 0]], flash: [0.5, 0.35, 'rgba(255,230,200,'], shake: [0.5, 2.2, 0.1],
    A: Object.assign({ mem1: null, mem2: null, mem3: null, boom2: { p: [-2, -3, 1.5], pop: 0.4, out: 2.6 }, puff: { p: [2, -3], pop: 1 }, gam: { p: [-0.6, -1.5], to: [-0.6, 0.6, 1, 4], sit: true, f: 0, ex: 'cry' },
      rog: { p: [0.2, -1.5], to: [0.6, 0.6, 1, 4], f: 0, keepPose: true, pose: 'hold' }, mag: { p: [3.5, -3, 3.2], pop: 9 } }, snowA()),
    sfx: [[0.5, 'puff'], [9, 'pop']], fx: both(snowFx, (r, t, s, o, st) => { if (r > 5) { const k = U.clamp((r - 5) / 4); o.rog.position.copy(H.at(st, 0.6 + k * 3.5, 0, 0.6 - k * 4.5)); o.rog.rotation.y = 2.6; o.rog.visible = k < 0.98; o.rog.userData.setExpr('worried'); } }) },
  b33: { st: 'ICE', cam: [[0, 0, 1.0, 0, 5.6, 0.55, 0], [10, 2.5, 1.0, 0, 5.0, 0.5, 0]], A: Object.assign({ boom2: null, puff: null, mag: null, rog: null, gam: { p: [-3, 0.6], to: [3, 0, 2, 14], f: 90, ex: 'happy' } }, snowA()), fx: snowFx },
  b34: { st: 'DESERT', bg: 'dust', cam: [[0, 0, 1.4, -1, 6.0, 0.6, 0]], A: { gam: { p: [-4, 0.6], to: [1, 0, 0.5, 7], f: 90 }, s2006: { p: [0, -2, 4], pop: 0.6 } }, sfx: [[0.6, 'bell']] },
  b35: { st: 'DESERT', cam: [[0, 0, 1.4, -1, 6.0, 0.6, 0], [12, 0, 1.6, -1, 5.0, 0.6, 0]], A: { s2006: null, apoc: { p: [0, -2], f: 0, pose: 'point', pop: 0.4 }, dark2: { p: [0, -3, 3], pop: 0.3 },
      hor1: { p: [-2.6, -1.4], f: 20, pop: 2 }, hor2: { p: [2.6, -1.4], f: -20, pop: 2.6 }, gam: { p: [1, 0], to: [0, 1.2, 3, 7], f: 180, keepPose: true, pose: (c, r) => { if (r > 8) POSE.down(c); } } },
    sfx: [[0.4, 'zap'], [2, 'pop'], [2.6, 'pop']], fx: pulse('dark2', 3.6, 2) },
  b36: { st: 'DESERT', cam: [[0, 0, 1.0, 0, 4.6, 0.5, 0], [12, 0.8, 1.0, 0, 4.2, 0.45, 0]], A: { apoc: null, hor1: null, hor2: null, dark2: null, gam: { p: [-1.2, 0], f: 60, pose: 'fist', ex: 'angry' }, dark: { p: [-1.2, 0, 1.8], pop: 0.3 },
      rog: { p: [1.4, 0.2], f: -60, ex: 'worried', pose: 'hold' }, sun: { p: [5.5, -1], to: [3, -0.6, 10, 13], f: -60, pop: 9.6, pose: 'up' }, fireg: { on: ['sun', 'head'], pop: 9.6 } },
    sfx: [[0.3, 'zap'], [10, 'shimmer'], [14, 'chime']], fx: (r, t, s, o) => { o.dark.scale.setScalar(2.1 * (1 + 0.2 * Math.sin(t * 5)) * (r > 14 ? Math.max(0.01, 1 - (r - 14) / 2) : 1)); if (r > 15) { o.gam.userData.setExpr('sleepy'); POSE.down(o.gam); } } },
  b37: { st: 'WED', bg: 'palace', cam: [[0, 0, 1.0, -1.4, 5.0, 0.5, 0]], A: { kitty: { p: [0.6, -2.6], f: -30, pose: 'hold' }, colos: { p: [-0.6, -2.6], f: 30 }, ex1: { p: [-3.6, -1.6], f: 50 }, ex3: { p: [3.6, -1.6], f: -50 },
      gam: { p: [-2.4, -0.6], f: 40 }, rog: { p: [2.4, -0.6], f: -40 } }, sfx: [[0.5, 'bell']] },
  b38: { st: 'WED', cam: [[0, 0, 1.0, -0.6, 4.6, 0.5, 0], [8, -0.4, 1.0, 0, 3.6, 0.42, 0]], A: { kitty: { p: [0.6, -2.6], to: [5, -1.6, 1, 4], f: 90, out: 4.2 }, colos: { p: [-0.6, -2.6], f: 30, pose: 'shrug' },
      gam: { p: [-1.0, 0], f: 50, sit: true, pose: 'give', ex: 'giggle' }, rog: { p: [0.4, 0.1], f: -50, ex: 'happy', pose: (c, r) => { if (r > 9) POSE.up(c); } }, ring: { on: ['gam', 'R', 0, 0.1, 0.1], pop: 5 },
      cf1: { p: [0, 0, 3] }, cf2: { p: [0, 0, 3] }, cf3: { p: [0, 0, 3] } }, sfx: [[1, 'zip'], [5, 'shimmer'], [9, 'chime']],
    fx: (r, t, s, o, st) => ['cf1', 'cf2', 'cf3'].forEach((k, i) => { o[k].visible = r > 9; o[k].position.copy(H.at(st, -1.2 + i * 1.2 + Math.sin(t + i) * 0.4, 4 - ((t * 0.8 + i) % 3.5), 0)); }) },
  b39: { st: 'WED', cam: [[0, 0, 1.0, 0, 4.0, 0.45, 0]], flash: [7, 0.3, 'rgba(255,200,150,'], shake: [7, 7.6, 0.06], A: { kitty: null, colos: null, ex1: null, ex3: null, ring: null, cf1: null, cf2: null, cf3: null,
      gam: { p: [-0.5, 0], f: 60, pose: (c, r) => { if (r < 7) POSE.embrace(c); else POSE.fist(c, r, r); }, ex: 'happy' }, rog: { p: [0.5, 0], f: -60, pose: (c, r) => { if (r < 7) POSE.embrace(c); else POSE.hips(c); } },
      boom: { p: [3.5, -3, 1.5], pop: 7, out: 8.6 } }, sfx: [[7, 'puff']], fx: (r, t, s, o) => { if (r > 7.5) { o.gam.rotation.y = 0; o.rog.rotation.y = 0; } } },
  b40: { st: 'STUDIO', bg: 'palace', cam: [[0, 0, 1.0, 0, 5.2, 0.55, 0], [20, 0, 1.0, 0, 4.6, 0.5, 0]], A: Object.assign({ desk: { p: [-0.6, -0.8] }, gam: { p: [3.4, 0.4], f: -30, pose: 'point' } },
      popSeq(['bk1', 'bk2', 'bk3', 'bk4', 'bk5'], 1.5, 4.2), { bk1: { p: [-2.4, -0.8, 1.25], pop: 1.5 }, bk2: { p: [-1.5, -0.8, 1.25], pop: 5.7 }, bk3: { p: [-0.6, -0.8, 1.25], pop: 9.9 }, bk4: { p: [0.3, -0.8, 1.25], pop: 14.1 }, bk5: { p: [1.2, -0.8, 1.3], pop: 18.3, spin: 0.6 },
        y1: { p: [-2.4, -0.8, 2.2], pop: 1.6 }, y2: { p: [-1.5, -0.8, 2.6], pop: 5.8 }, y3: { p: [-0.6, -0.8, 2.2], pop: 10 }, y4: { p: [0.3, -0.8, 2.6], pop: 14.2 }, y5: { p: [1.2, -0.8, 2.3], pop: 18.4 } }),
    sfx: [[1.5, 'pop'], [5.7, 'pop'], [9.9, 'pop'], [14.1, 'pop'], [18.3, 'chime']] },
  b41: { st: 'STUDIO', cam: [[0, 0, 1.2, -0.6, 4.8, 0.5, 0]], A: { desk: null, gam: null, bk1: null, bk2: null, bk3: null, bk4: null, bk5: null, y1: null, y2: null, y3: null, y4: null, y5: null,
      tv: { p: [0, -3.2] }, sofa: { p: [0, 0.6] }, k1: { p: [-0.6, 0.6, 0.45], f: 180, sit: true }, k2: { p: [0.6, 0.6, 0.45], f: 180, sit: true }, s1992: { p: [0, -3, 4.4], pop: 0.6 } }, sfx: [[0.6, 'bell']] },
  b42: { st: 'GENO', bg: 'war', cam: [[0, 0, 1.4, -1, 6.0, 0.6, 0], [9, -0.6, 1.2, 0, 4.4, 0.5, 0.3]], flash: [13.4, 0.5, 'rgba(255,230,200,'], shake: [13.4, 15, 0.14],
    A: Object.assign({ giant: { p: [3.5, -5, 4.5], pop: 0.5 }, gam: { p: [-2.4, 0.6], f: 40, pose: (c, r) => { if (r > 6) POSE.give(c); }, ex: 'angry', out: 14 }, card: {}, cglow: {}, boom2: { p: [3.2, -4.4, 3], pop: 13.4, out: 16.5 }, puff: { p: [1, -2], pop: 13.6 },
      b1: { p: [2.4, -3.6, 2.2], pop: 12.9, out: 14 }, b2: { p: [4, -4.8, 3.6], pop: 13.1, out: 14.2 }, b3: { p: [3, -4, 4.2], pop: 13.3, out: 14.4 } }, cardsA(4)),
    sfx: [[0.5, 'zap'], [3, 'shimmer'], [6, 'shimmer'], [12.2, 'zip'], [12.9, 'puff'], [13.4, 'puff']], fx: both(orbitK('gam', 3, 12.1), throwK('gam', 'oc1', 'og1', [2.4, 2.2, -3.6], 12.2, 12.9, 12.1), throwK('gam', 'oc2', 'og2', [4, 3.6, -4.8], 12.4, 13.1, 12.1), throwK('gam', 'oc3', 'og3', [3, 4.2, -4], 12.6, 13.3, 12.1), cardFx('gam', [3.2, 3, -4.4], 12.6, 13.4), pulse('giant', 4, 2), (r, t, s, o) => { if (o.cglow && r > 6 && r < 12.6) o.cglow.scale.setScalar(0.48 * (1 + (r - 6) / 3) * (1 + 0.25 * Math.sin(t * 18))); }) },
  b43: { st: 'GENO', cam: [[0, 0, 0.6, 0, 3.6, 0.6, 0.2]], A: Object.assign(noCards(), { giant: null, card: null, cglow: null, boom2: null, puff: null, gam: { p: [-0.3, 0.2], lie: true, f: 90, ex: 'sleepy' }, rog: { p: [0.9, -0.2], f: -70, sit: true, pose: 'cry', ex: 'cry' } }) },
  b44: { st: 'DESERT', bg: 'dust', cam: [[0, 0, 1.2, 0, 5.0, 0.5, 0]], A: { s2026: { p: [0, -2.5, 5.8], pop: 0.5 }, apoc: { p: [0, -3], f: 0, pose: 'up', pop: 1.2 }, dark2: { p: [0, -3.4, 3], pop: 1 },
      gam: { p: [0, 0.6, -1.2], to: [0, 0.6, 3, 7, 0], f: 0, ex: 'angry', pose: 'lift' }, dark: { on: ['gam', 'head'], pop: 3.5 } }, sfx: [[0.5, 'bell'], [1.2, 'zap'], [3.5, 'zap']], fx: both(pulse('dark2', 3.6, 2), pulse('dark', 2.1, 5)) },
  b45: { st: 'DESERT', cam: [[0, 0, 1.0, 0, 4.6, 0.5, 0]], A: { s2026: null, apoc: null, dark2: null, dark: { out: 3 }, gam: { p: [0, 0.6], f: 0, pose: 'down', ex: 'sleepy' },
      kurt: { p: [-2.2, 0.2], f: 40, pose: 'reach', out: 9, ex: 'happy' }, puff: { p: [-2.2, 0.2], pop: 8.8 }, spark: { p: [-1.1, 0.4, 2], pop: 2, out: 9 }, rog: { p: [5, 0], to: [1.4, 0.4, 7, 10], f: -60, ex: 'cry' } },
    sfx: [[2, 'shimmer'], [8.6, 'chime']], fx: (r, t, s, o) => { if (r > 9) o.gam.userData.setExpr('happy'); } },
  b46: { st: 'STUDIO', bg: 'palace', cam: [[0, 0, 1.2, -0.6, 4.8, 0.5, 0]], A: { booth: { p: [-1.2, -1.6] }, mon: { p: [1.4, -1.8, 1.0] }, k1: { p: [-1.2, -0.2], f: 180, pose: 'hold' }, k2: { p: [1.4, -0.4], f: 180, pose: 'hold' },
      sGame: { p: [0, -2.6, 4.2], pop: 0.6 }, cf1: { p: [1.4, -1.7, 1.6] }, cf3: { p: [-1.2, -1.5, 1.9] } }, sfx: [[0.6, 'bell'], [4, 'zap'], [7, 'zap']],
    fx: (r, t, s, o) => { o.cf1.visible = Math.sin(t * 7) > 0; o.cf3.visible = Math.sin(t * 6 + 1) > 0; } },
  b47: { st: 'CINEMA', bg: 'palace', cam: [[0, 0, 1.0, 0, 4.0, 0.45, 0]], A: { gam: { p: [0, 0], f: 0, pose: 'think', ex: 'sleepy', say: ['รอนานจัง', 1.5, 4.5] } }, sfx: [[1.5, 'pop']] },
  b48: { st: 'CINEMA', cam: [[0, 0, 1.6, -1, 6.0, 0.6, 0]], A: { gam: { p: [-2.2, 0.6], f: 160, pose: 'shrug', ex: 'worried' }, s2009: { p: [0, -6, 4.0], pop: 5 }, ex1: { p: [2, 0.6], f: 180, pose: 'shrug' } }, sfx: [[5, 'bell']] },
  b49: { st: 'CINEMA', cam: [[0, 0, 1.2, -0.5, 5.2, 0.55, 0]], A: { ex1: null, s2009: null, gam: { p: [0, 0.4], f: 0, pose: (c, r) => { if (r > 9) POSE.cry(c, r, r); }, ex: 'happy' },
      s2014: { p: [-3.0, -2, 4.6], pop: 1 }, s2019: { p: [3.0, -2, 4.6], pop: 9 }, pp1: { p: [-0.8, -0.6, 0.05], pop: 2.5, rot: [0, 0.4, 0] }, pp2: { p: [0.6, -0.8, 0.05], pop: 4, rot: [0, -0.3, 0] }, pp3: { p: [-0.1, -1.1, 0.05], pop: 5.5 } },
    sfx: [[1, 'pop'], [2.5, 'tok'], [4, 'tok'], [5.5, 'tok'], [9, 'puff']], fx: (r, t, s, o) => { if (r > 9) o.gam.userData.setExpr('cry'); } },
  b50: { st: 'VOID', bg: 'dust', cam: [[0, 0, 1.0, 0, 5.4, 0.55, 0], [14, -0.6, 1.0, 0, 4.0, 0.45, 0.1]], flash: [1, 0.35, 'rgba(255,230,200,'],
    A: { gam: { p: [-1.2, 0.4], f: 40, pop: 1, pose: 'give', say: ['บงชูร์ เชร์!', 8, 12] }, dp: { p: [0.8, 0.2], f: -40, pose: 'shrug', say: ['???', 12.5, 99, true] },
      elek: { p: [2.4, -0.6], f: -20 }, blade: { p: [-3, -0.8], f: 20, pose: 'hips' }, x23: { p: [3.8, 0], f: -30, pose: 'fist' }, card: {}, cglow: {},
    b1: { p: [1.1, 0.8, 0.2], pop: 15.8, out: 17 } },
    sfx: [[1, 'shimmer'], [8, 'pop'], [12.5, 'pop'], [15, 'zip'], [15.8, 'puff']], fx: both(cardFx('gam', [1.1, 0.2, 0.8], 15, 15.8), (r, t, s, o) => { if (r > 15.8 && r < 16.8) o.dp.position.y += Math.sin((r - 15.8) * Math.PI) * 0.9; }) },
  b51: { st: 'CINEMA', bg: 'palace', cam: [[0, 0, 1.6, -1, 6.0, 0.6, 0], [18, 0, 1.2, -0.5, 4.8, 0.5, 0]], A: { sDD: { p: [0, -6, 4.6], pop: 1 }, sDate: { p: [0, -6, 3.5], pop: 4 }, sTat: { p: [-4.2, -6, 2.6], pop: 8 },
      gam: { p: [0, 0.6], f: 0, pose: (c, r) => { if (r > 18) POSE.fist(c, r, r); else POSE.hips(c); }, ex: 'giggle', say: ['ยังไม่จบหรอก', 20, 24] }, ex2: { p: [-2.6, 1], f: 180, pose: 'up', pop: 12 }, ex4: { p: [2.6, 1], f: 180, pose: 'up', pop: 12.5 } },
    sfx: [[1, 'bell'], [4, 'pop'], [8, 'pop'], [12, 'chime'], [20, 'pop']] },
  b52: { st: 'STUDIO', bg: 'palace', cam: C2, A: { gam: { p: [0, 0], f: 0, pose: 'shrug', ex: 'giggle' } } },
  b53: { st: 'MANSION', bg: 'day', cam: [[0, 0, 1.0, 0, 5.4, 0.55, 0]], A: { cyc: { p: [-3.4, 0], f: 15, pose: 'point', pop: 0.5 }, wol: { p: [-1.6, 0.2], f: 10, pose: 'fist', pop: 2 }, storm: { p: [0.2, 0], f: 0, pose: 'up', pop: 3.5 }, bolt: { p: [0.6, -2.4, 0], pop: 4.2, out: 5.6 },
      gam: { p: [2.6, 0.6], f: -20, pose: 'shrug', pop: 6, ex: 'giggle' } }, sfx: [[0.5, 'pop'], [2, 'pop'], [3.5, 'pop'], [4.2, 'zap'], [6, 'pop']], flash: [4.2, 0.25, 'rgba(220,230,255,'], fx: (r, t, s, o) => { if (o.bolt && r > 4.2 && r < 5.6) o.bolt.visible = Math.sin(t * 40) > -0.3; } },
  b54: { st: 'MANSION', cam: [[0, 0, 1.0, 0, 5.4, 0.55, 0]], A: { bolt: null, cyc: { p: [-3.4, 0], f: 30, pose: 'wave' }, wol: { p: [-2.2, -0.8], f: 30 }, storm: { p: [-1.6, 0.6], f: 40, pose: 'wave' },
      rog: { p: [-0.4, 0], f: 60, pose: 'reach', ex: 'happy' }, gam: { p: [5, 0.4], to: [0.8, 0.2, 1, 6], f: -80, pose: (c, r) => { if (r > 6) POSE.reach(c); }, ex: 'happy' } } },
  b55: { st: 'STUDIO', bg: 'palace', cam: [[0, 0, 1.0, 0, 3.2, 0.62, 0.2], [10, 0.4, 0.9, 0, 2.6, 0.7, 0.1]], A: { tbl: { p: [0, 0] }, board: { p: [0, 0, 0.88] }, king: { p: [0.5, -0.2, 0.9] }, pawn: { p: [-0.6, 0.2, 0.9], to: [-0.1, -0.1, 3, 5, 0.9] },
      gam: { p: [1.9, 0.4], f: -45, pose: 'give', ex: 'happy' } }, sfx: [[3, 'tok'], [5, 'chime']] },
  b56: { st: 'NOLA', bg: 'night', cam: [[0, 0, 1.0, 0, 4.4, 0.45, 0], [8, 0, 1.2, 0, 3.6, 0.42, 0]], A: Object.assign({ gam: { p: [-0.7, 0], f: 15, pose: 'wave', ex: 'giggle' }, rog: { p: [0.8, 0], f: -15, pose: 'wave', ex: 'happy' }, card: {}, cglow: {}, cf1: {}, cf2: {}, cf3: {} }, cardsA(4)),
    sfx: [[1, 'shimmer'], [5, 'chime']], fx: both(cardFx('gam', [0, 0, 0], 99, 100), orbitK('gam', 0.5, 99, 4, 1.2), (r, t, s, o, st) => ['cf1', 'cf2', 'cf3'].forEach((k, i) => { o[k].visible = r > 5; o[k].position.copy(H.at(st, -2 + i * 2 + Math.sin(t + i) * 0.4, 4.6 - ((t * 0.7 + i) % 3.8), -1)); })) },
  facts: { st: 'STUDIO', bg: 'palace', cam: [0, 2.5, 1.0, 0, 5.4, 0.55, 0], A: { gam: { p: [4.2, 0], f: -30, pose: 'hips' }, rog: { p: [5.6, -0.4], f: -40 } } },
  next: { st: 'STUDIO', cam: C2, A: { gam: { p: [-0.6, 0], f: 20, pose: 'wave' }, rog: { p: [0.6, 0], f: -20 } }, sfx: [[0.6, 'pop']] },
  ask: { st: 'STUDIO', cam: C2, A: { gam: { p: [-0.6, 0], f: 20, pose: 'think' }, rog: { p: [0.6, 0], f: -20, pose: 'shrug', say: ['?', 0.6, 99, true] } } },
};
/* portrait-height pull-back for the vinyl cast (same as ironman.js) */
(() => { const LANDF = !!(window.DATA && DATA.cfg && DATA.cfg.land), K = LANDF ? 1.8 : 2.25; const sc1 = (c) => { c[2] += 1.45; c[4] *= K; c[5] *= K; c[6] *= K; }; for (const id in SC) { let c = SC[id].cam; if (!c) continue; if (typeof c[0] === 'number') { c = SC[id].cam = c.slice(); sc1(c); } else { c = SC[id].cam = c.map((k) => k.slice()); c.forEach(sc1); } } })();
EP.light = 1.0; EP.toon = { w: 0.024 }; EP.bed = 'lively'; EP.slim = true;

/* ================= recap layer (EP.recap): subtitles, chapter cards, lower thirds, credit plates, pops, comic pages, orbit camera =================
   Subtitles (SUBS) are the final TTS script cut into one-line phrases (same words; numbers shown as digits). Everything is timed to phrases with
   PH(id, 'word') = when the phrase containing 'word' starts, so it stays in sync once the voice file (vo.json) is attached. */
const SUBS = {
  "b01": [
   "ชื่อจริง {เรมี่ เอเตียน เลอโบ} ฉายา",
   "เดอะเรจจิ้นเคจัน",
   "เลอ เดียโบล บลอง หรือ{ปีศาจขาว} บ้านเกิด",
   "นิวออร์ลีนส์ รัฐลุยเซียนา สหรัฐอเมริกา อาชีพ",
   "ขโมยมืออาชีพ นักพนัน และสมาชิกเอ็กซ์เมน",
   "พลัง ชาร์จพลังงานจลน์ใส่สิ่งของให้ระเบิดได้",
   "และมีเสน่ห์โน้มน้าวใจคนแบบเกินมนุษย์",
   "อาวุธประจำตัว ไพ่หนึ่งสำรับ",
   "กับไม้กระบองยืดหดได้ คนที่รัก {โร้ก} ผู้สร้าง",
   "คริส แคลร์มอนต์ กับจิม ลี เปิดตัว {ปี 1990}"
  ],
  "b02": [
   "ลองนึกภาพผู้ชายคนหนึ่ง",
   "ใส่โค้ทยาวสีน้ำตาลแบบที่ร้อนแค่ไหนก็ไม่ถอด",
   "คลุมหัวด้วยผ้าสีชมพูอมม่วง ตาดำสนิท",
   "แต่ม่านตาเป็นสีแดงวาวเหมือนถ่านติดไฟ",
   "เขาสับไพ่ในมือเล่นไปเรื่อยๆ",
   "แล้วพูดภาษาอังกฤษปนฝรั่งเศส",
   "ด้วยสำเนียงทางใต้ที่ฟังรู้เรื่องบ้างไม่รู้เรื่องบ้าง",
   "เรียกผู้หญิงทุกคนว่า {เชร์} ที่แปลว่าที่รัก",
   "นั่นแหละครับ {แกมบิท} ผู้ชายที่ถ้าอยู่ในวงไพ่",
   "คุณไม่ควรเล่นด้วย และถ้าอยู่ในวงเหล้า",
   "คุณก็ไม่ควรเชื่อคำพูดเขาทุกคำ"
  ],
  "b03": [
   "ชื่อ{แกมบิท}มาจากศัพท์หมากรุก",
   "หมายถึงการยอมเสียหมากตัวเล็กไปก่อน",
   "เพื่อแลกกับเกมที่ใหญ่กว่า",
   "ซึ่งเป็นชื่อที่สรุปชีวิตเรมี่ได้ดีมาก",
   "เพราะทั้งชีวิตของเขาคือการเดิมพัน",
   "บางครั้งชนะใหญ่ บางครั้งแพ้หมดตัว",
   "และบางครั้งก็ไม่รู้ด้วยซ้ำว่ากำลังเล่นเกมของใครอยู่"
  ],
  "b04": [
   "เรื่องแรกที่สนุกคือ",
   "แม้แต่การเปิดตัวของ{แกมบิท}",
   "ก็ยัง{วุ่นวาย}เหมือนชีวิตเขา"
  ],
  "b05": [
   "แกมบิทถูกสร้างโดย{คริส แคลร์มอนต์}",
   "นักเขียนเอ็กซ์เมนในตำนาน",
   "กับ{จิม ลี} นักวาดที่ออกแบบหน้าตาให้",
   "แต่คนที่วาดฉบับเปิดตัวจริงๆ",
   "กลับเป็น{ไมค์ คอลลินส์}",
   "ตามแผนเดิม แกมบิทจะเปิดตัว",
   "ในอันแคนนี่เอ็กซ์เมน{ฉบับที่ 266} ปี 1990",
   "แต่ปรากฏว่า{ฉบับพิเศษประจำปี}",
   "ที่มีแกมบิทโผล่มาแว่บๆ",
   "ดัน{วางแผงก่อน}ไม่กี่สัปดาห์",
   "ทั้งที่เนื้อเรื่องในเล่มนั้น{เกิดขึ้นทีหลัง}"
  ],
  "b06": [
   "ผลคือแฟนๆ เถียงกันมาจนทุกวันนี้ว่า",
   "ตกลง{แกมบิท}ปรากฏตัวครั้งแรกเล่มไหน",
   "วงการนักสะสมเลยตกลงกันแบบประนีประนอมว่า",
   "เล่มประจำปีนับเป็นการโผล่แบบแขกรับเชิญ",
   "ส่วน{ฉบับ 266} นับเป็นการเปิดตัวเต็มรูปแบบ",
   "สรุปคือ ขนาดเกิดยัง{เกิดสองรอบ}",
   "สมกับเป็นนักพนันจริงๆ"
  ],
  "b07": [
   "ในฉบับ 266 นั้น {แกมบิท}ไม่ได้มาแบบฮีโร่",
   "เขามาเพื่อ{ขโมยงานศิลปะ}",
   "แล้วดันไปเจอเด็กผู้หญิงคนหนึ่งที่กำลังถูกไล่ล่า",
   "เด็กคนนั้นคือ{สตอร์ม}",
   "ที่ตอนนั้นโดนวายร้ายทำให้ร่างกายย้อนวัยกลายเป็นเด็ก",
   "และกลับไปใช้ชีวิตเป็นขโมยตัวน้อย",
   "เหมือนตอนเด็กที่ไคโร โจรเจอโจร",
   "คุยกันถูกคอทันที แกมบิทช่วยเธอหนีศัตรู",
   "จนสุดท้ายได้ต่อสู้กับ{ชาโดว์คิง}",
   "วายร้ายพลังจิตตัวเอ้",
   "และนี่คือจุดเริ่มต้นของมิตรภาพที่แข็งแรงที่สุดในชีวิตเรมี่",
   "สตอร์มกลายเป็นเหมือนพี่สาวคนสนิท",
   "และเป็นคนพาเขาเข้าทีมเอ็กซ์เมน"
  ],
  "b08": [
   "ช่วงแรกแฟนๆ แบ่งเป็นสองฝั่งชัดเจน",
   "ฝั่งหนึ่งรักเขามาก เพราะ{เท่} กวน และมีปม",
   "อีกฝั่งหมั่นไส้สุดๆ เพราะเท่ กวน และมีปม",
   "เหตุผลเดียวกันเป๊ะ แต่ไม่ว่าจะรักหรือเกลียด",
   "ทุกคนพูดถึงเขา และในยุคเก้าศูนย์",
   "นั่นคือสิ่งที่สำคัญที่สุด"
  ],
  "b09": [
   "ชีวิตของเรมี่เริ่มต้นแบบที่ถ้าเขียน",
   "เป็น{ละครหลังข่าว}คงโดนว่าเว่อร์"
  ],
  "b10": [
   "เขาเกิดที่นิวออร์ลีนส์ เมืองแห่งดนตรีแจ๊ส",
   "หนองน้ำ และวัฒนธรรมเคจันที่มีรากมาจากฝรั่งเศส",
   "ดวงตาสีแดงบนพื้นดำของเขาทำให้",
   "คนรอบตัวกลัวตั้งแต่ยังแบเบาะ",
   "และในเมืองนี้มีสมาคมลับสองกลุ่ม",
   "ที่เป็นศัตรูกันมาหลายร้อยปี คือ{กิลด์โจร}",
   "กับ{กิลด์นักฆ่า}"
  ],
  "b11": [
   "{กิลด์โจร}มีคำทำนายเก่าแก่ว่า",
   "วันหนึ่งจะมีเด็กที่เรียกว่าเลอ เดียโบล บลอง",
   "หรือ{ปีศาจขาว} มาเปลี่ยนชะตาของกิลด์",
   "และพอเห็นทารกตาแดงคนนี้",
   "พวกเขาก็เชื่อทันทีว่าใช่แน่ๆ {ฌอง-ลุค} เลอโบ",
   "หัวหน้ากิลด์โจร",
   "จึงลักพาตัวทารกออกมาจากโรงพยาบาลเลย",
   "ใช่ครับ ฮีโร่ของเราโดนขโมยตั้งแต่วันแรกของชีวิต",
   "คนเป็นราชาโจรในอนาคต",
   "ก็ต้องเริ่มจากการเป็นของโจรก่อน"
  ],
  "b12": [
   "แต่เรื่องไม่จบง่ายๆ",
   "เพราะเด็กคนนี้ถูกส่งต่อเป็นเครื่องบรรณาการ",
   "ให้ผู้หยั่งรู้ของกิลด์ที่ชื่อ{แอนทีควอรี่}",
   "{ฌอง-ลุค}ไม่อยากให้เด็กโตมาเป็นทาสของใคร",
   "เลยแอบเอาเรมี่ไปฝากไว้",
   "กับแก๊งเด็กล้วงกระเป๋าข้างถนน",
   "เรมี่จึงโตมาแบบเด็กเร่ร่อน",
   "หากินด้วยการล้วงกระเป๋าคนในตลาด",
   "และฝีมือดีขึ้นเรื่อยๆ"
  ],
  "b13": [
   "ราวอายุสิบขวบ เขาเล็งเหยื่อรายใหม่",
   "เป็นผู้ชายแต่งตัวดีท่าทางมีเงิน",
   "ล้วงปุ๊บโดนจับได้ปั๊บ",
   "ผู้ชายคนนั้นก็คือ{ฌอง-ลุค} เลอโบ คนเดิมนั่นเอง",
   "และหลายเวอร์ชันของเรื่องเล่าว่า",
   "ที่จริงฌอง-ลุคจงใจจัดฉากให้เด็กมา",
   "ล้วงกระเป๋าตัวเองเพื่อจะได้เจอกัน",
   "ฌอง-ลุครับเรมี่มาเลี้ยงเป็นลูกบุญธรรม",
   "ให้นามสกุลเลอโบ และฝึกวิชาโจรให้เต็มที่",
   "เรมี่ได้พี่ชายชื่อ{อองรี} และได้ครอบครัวจริงๆ",
   "เป็นครั้งแรก"
  ],
  "b14": [
   "ตอนอายุประมาณแปดขวบ",
   "เรมี่เห็นเด็กผู้หญิงผมบลอนด์",
   "คนหนึ่งถูกผู้ชายกลุ่มหนึ่งรังแก",
   "เขารีบวิ่งเข้าไปช่วยแบบพระเอกหนังสุดๆ",
   "แต่ปรากฏว่าเธอไม่ต้องการความช่วยเหลือเลย",
   "เพราะเธอคือ{เบลล่า} ดอนน่า บูโดรซ์",
   "ทายาทตระกูลหัวหน้า{กิลด์นักฆ่า}",
   "ที่ถูกฝึกวิชาฆ่าคนมาตั้งแต่เด็ก"
  ],
  "b15": [
   "การเปิดตัวแบบเขินๆ ครั้งนั้นกลายเป็นมิตรภาพ",
   "แล้วก็กลายเป็นความรัก",
   "ผู้ใหญ่สองฝั่งเห็นช่องทางทันที",
   "ถ้าลูกชายหัวหน้าโจรแต่งกับทายาทนักฆ่า",
   "สงครามหลายร้อยปีก็น่าจะจบได้",
   "งานแต่งจึงเกิดขึ้นจริง"
  ],
  "b16": [
   "แต่ไม่ใช่ทุกคนที่อยากได้สันติภาพ {จูเลียน}",
   "พี่ชายของ{เบลล่า} ไม่ยอมรับเรื่องนี้",
   "หลังพิธีแต่งงานเขาท้าเรมี่ดวลกัน เรมี่ชนะ",
   "และดูเหมือนจะฆ่าจูเลียนตาย",
   "ผลคือสันติภาพพังลงทันที เรมี่ถูกขับออกจากกิลด์",
   "{ถูกเนรเทศ}ออกจากนิวออร์ลีนส์ ต้องทิ้งบ้าน พ่อ",
   "พี่ชาย และภรรยาที่เพิ่งแต่งงานได้ไม่ถึงวัน"
  ],
  "b17": [
   "นับว่าเป็นหนึ่งในงานแต่ง",
   "ที่{สั้นที่สุด}ในประวัติศาสตร์การ์ตูน",
   "และเป็นจุดเริ่มต้นของ{แกมบิท}แบบที่เรารู้จัก",
   "ผู้ชายที่ไม่มีบ้านให้กลับ",
   "ใช้ชีวิตเป็นขโมยรับจ้างไปทั่วโลก",
   "และพกความรู้สึกผิดติดกระเป๋าเสื้อโค้ทไปด้วยทุกที่"
  ],
  "b18": [
   "ถ้าชีวิต{แกมบิท}เป็นสำรับไพ่",
   "ไพ่ใบที่มืดที่สุดมีชื่อว่า{มิสเตอร์ซินิสเตอร์}"
  ],
  "b19": [
   "ซินิสเตอร์เป็นนักวิทยาศาสตร์อัจฉริยะ",
   "ที่หมกมุ่นกับพันธุกรรมมิวแทนต์ หน้าซีดเหมือนผี",
   "มีเพชรสีแดงบนหน้าผาก",
   "และเป็นวายร้ายที่ชอบเล่นเกมยาวหลายสิบปี",
   "ช่วงที่เรมี่ร่อนเร่หลังถูกเนรเทศ",
   "เขาไปรับงานจากซินิสเตอร์",
   "และหนึ่งในงานนั้นคือการรวบรวม",
   "ทีมนักฆ่ามิวแทนต์ชื่อ{มาโรเดอร์ส}",
   "แถมยังนำทางพวกเขาเข้าไป",
   "ในอุโมงค์ใต้ดินของนิวยอร์ก"
  ],
  "b20": [
   "ในอุโมงค์นั้นคือบ้านของ{ชาวมอร์ล็อค}",
   "มิวแทนต์ที่หน้าตาหรือร่างกายแตกต่างจนอยู่บนดินไม่ได้",
   "และสิ่งที่{มาโรเดอร์ส}ทำ คือการไล่ฆ่าพวกเขา",
   "เหตุการณ์นี้ถูกเรียกว่า{การสังหารหมู่}มิวแทนต์",
   "เป็นหนึ่งในเหตุการณ์ที่โหดร้ายที่สุด",
   "ในประวัติศาสตร์เอ็กซ์เมน"
  ],
  "b21": [
   "พอเรมี่รู้ว่าตัวเองพาฆาตกรเข้าไปทำอะไร",
   "เขาพยายามหยุด",
   "แต่เกือบโดน{เซเบอร์ทูธ}ฆ่าตาย",
   "สิ่งเดียวที่เขาทำได้คือช่วยเด็ก{มอร์ล็อค}",
   "ผู้หญิงชื่อ{ซาร่าห์}ออกมาได้หนึ่งคน",
   "ซึ่งต่อมาเธอโตขึ้นเป็นมิวแทนต์ชื่อมาร์โรว์"
  ],
  "b22": [
   "เรมี่เก็บความลับนี้ไว้คนเดียว{หลายปี}",
   "ตลอดเวลาที่อยู่กับเอ็กซ์เมน ยิ้มกวนๆ",
   "ปาไพ่เท่ๆ แต่ข้างในมี{ระเบิดเวลา}ลูกใหญ่ซ่อนอยู่",
   "และอย่างที่รู้กัน",
   "ระเบิดเวลาในการ์ตูนไม่เคยไม่ระเบิด"
  ],
  "b23": [
   "{ปี 1991} เอ็กซ์เมนออกหนังสือชุดใหม่",
   "และแบ่งทีมเป็นสีน้ำเงินกับสีทอง",
   "{แกมบิท}อยู่ทีมน้ำเงิน ร่วมกับไซคลอปส์",
   "วูล์ฟเวอรีน {โร้ก} บีสต์ ไซล็อค และจูบิลี่",
   "ไลน์อัปนี้คือหน้าตาของเอ็กซ์เมน",
   "ในความทรงจำของเด็กยุคเก้าศูนย์ทั่วโลก"
  ],
  "b24": [
   "ในทีม {แกมบิท}เป็นตัวป่วน ปากหวานกับผู้หญิง",
   "ปากเสียกับผู้ชาย โดยเฉพาะกับ{วูล์ฟเวอรีน}",
   "ที่ไม่เคยไว้ใจคนที่ยิ้มเยอะขนาดนี้",
   "ทั้งคู่เคยปะทะกันตัวต่อตัวในห้องซ้อมรบ",
   "เป็นศึกแบบชายแท้สองคนที่ไม่มีใครยอมใคร",
   "ส่วนกับ{จูบิลี่} สาวน้อยที่ยิงพลุจากมือได้",
   "เขาเป็นเหมือน{พี่ชาย}ที่ชอบแกล้งแต่ก็คอยดูแล"
  ],
  "b25": [
   "ถ้าถามว่าอะไรทำให้แกมบิท{เป็นอมตะ}",
   "คำตอบไม่ใช่ไพ่ ไม่ใช่โค้ท แต่คือ{โร้ก}"
  ],
  "b26": [
   "{โร้ก}เป็นสาวใต้จากมิสซิสซิปปี",
   "พลังของเธอคือการดูดพลัง ความทรงจำ",
   "และชีวิตของคนที่เธอสัมผัสผิว",
   "แตะนานไปอีกฝ่ายอาจหมดสติหรือตาย",
   "เธอจึง{ต้องใส่ถุงมือ}ตลอด และไม่เคยได้จับมือ",
   "กอด หรือจูบใครอย่างสบายใจ"
  ],
  "b27": [
   "แล้วผู้ชายที่ชอบเล่นกับความเสี่ยงที่สุดในทีม",
   "ก็ดัน{ตกหลุมรัก}ผู้หญิงที่แตะไม่ได้ที่สุดในทีม",
   "มันคือการเดิมพันที่บ้าที่สุดของ{แกมบิท}",
   "เขาจีบเธอทุกวัน ด้วยคำหวานสำเนียงเคจัน",
   "{โร้ก}ตอบกลับด้วยความแข็งกร้าวสไตล์สาวใต้",
   "แต่ใจอ่อนทุกที ทั้งคู่ใกล้กันแค่เอื้อม",
   "แต่ไกลกันเท่าถุงมือหนึ่งคู่"
  ],
  "b28": [
   "แฟนๆ รักคู่นี้เพราะมันคือความรักที่พิสูจน์ด้วยการสัมผัสไม่ได้",
   "ต้องพิสูจน์ด้วย{การอยู่ข้างกัน} ด้วยการรอ",
   "และด้วยการเลือกกันซ้ำแล้วซ้ำอีก"
  ],
  "b29": [
   "{ปี 1997} ในอันแคนนี่เอ็กซ์เมนฉบับที่ 350",
   "{ระเบิดเวลาก็ระเบิด}จนได้",
   "เรื่องนี้ชื่อว่าการพิพากษา{แกมบิท}"
  ],
  "b30": [
   "เรมี่ถูกนักล่าค่าหัวจับตัวไป",
   "ที่ป้อมปราการกลางทวีป{แอนตาร์กติกา}",
   "เพื่อขึ้นศาลที่มีผู้พิพากษาลึกลับชื่อ{อีริคเดอะเรด}",
   "เพื่อนๆ เอ็กซ์เมนตามไปช่วย",
   "แต่ก็ถูกจับมัดนั่งอยู่ในคอกลูกขุน",
   "แล้วความลับก็ถูกเปิดออกทีละชั้น",
   "ว่าแกมบิทคือคนที่รวบรวม{มาโรเดอร์ส}ให้ซินิสเตอร์",
   "และพาพวกมันเข้าไปในอุโมงค์{มอร์ล็อค}"
  ],
  "b31": [
   "ที่เจ็บที่สุดคือ โร้กถูกยุให้{จูบเรมี่}",
   "และด้วยพลังของเธอ",
   "เธอได้ดูดความทรงจำของเขาเข้าไป",
   "เธอจึงได้เห็นทุกอย่างด้วยตาตัวเอง",
   "ทั้งความผิด และความพยายามที่จะแก้ไขในวันนั้น"
  ],
  "b32": [
   "สุดท้ายป้อมพังถล่ม {โร้ก}ลากเรมี่ออกมาได้ทัน",
   "แต่แล้วเธอก็ทิ้งเขาไว้ตรงนั้น",
   "กลางทุ่งน้ำแข็งที่ขั้วโลกใต้ ตัวคนเดียว",
   "ส่วนทีมเอ็กซ์เมนก็กลับนิวยอร์กไป",
   "ทีหลังเฉลยว่าผู้พิพากษา{อีริคเดอะเรด}คนนั้น",
   "ก็คือ{แม็กนีโต้}ปลอมตัวมานั่นเอง"
  ],
  "b33": [
   "ฉากถูกทิ้งไว้กลางหิมะ",
   "กลายเป็นหนึ่งในฉากที่แฟนจำได้ที่สุด",
   "และทำให้{แกมบิท}ชัดเจนว่าเขาไม่ใช่ฮีโร่ขาวสะอาด",
   "เขาคือคนที่เคยทำผิดหนัก",
   "และต้อง{เดินกลับมาไถ่โทษ}ด้วยตัวเอง",
   "ซึ่งเขาก็ทำ ค่อยๆ กลับมาทีละก้าว",
   "จนได้ความเชื่อใจคืนจากเพื่อนๆ"
  ],
  "b34": [
   "คิดว่าโดนทิ้งที่ขั้วโลกแล้วจะเข็ด ไม่เลยครับ",
   "ปี 2006 แกมบิทเดิมพัน{ครั้งใหญ่อีกรอบ}",
   "ในเรื่องเลือดแห่ง{อะพอคคาลิปส์}"
  ],
  "b35": [
   "{อะพอคคาลิปส์}คือมิวแทนต์โบราณ",
   "ที่เชื่อว่าโลกเป็นของผู้แข็งแกร่ง",
   "และชอบเปลี่ยนมิวแทนต์ให้เป็นสี่{ม้าสาวก}ของเขา",
   "คือสงคราม ความอดอยาก โรคระบาด",
   "และความตาย",
   "{แกมบิท}อาสาเข้าไปเป็นม้าสาวกเอง",
   "โดยตั้งใจจะเป็น{สายลับ}คอย",
   "จับตาอะพอคคาลิปส์จากข้างใน แผนฟังดูฉลาด",
   "แต่เขาประเมินพลังล้างสมอง",
   "ของอะพอคคาลิปส์ต่ำไปหน่อย"
  ],
  "b36": [
   "ผลคือเขากลายเป็น{ม้าสาวกเดธ} หรือความตาย",
   "ผมขาวโพลน ผิวกลายเป็นสีดำสนิท",
   "ไพ่ธรรมดาเปลี่ยนเป็นไพ่ทาโรต์",
   "และหันมาสู้กับเพื่อนเอ็กซ์เมนจริงๆ",
   "เกือบฆ่าโร้กไปแล้วด้วย จน{ซันไฟร์}",
   "ม้าสาวกอีกคนที่หลุดจากการควบคุมได้",
   "ช่วยดึงเขาออกมา",
   "แต่ร่องรอยของ{เดธ}ยังโผล่มา",
   "หลอกหลอนเขาอีกหลายครั้ง เป็นบทเรียนว่า",
   "เดิมพันกับคนที่ชื่อ{อะพอคคาลิปส์}",
   "เจ้ามือชนะเสมอ"
  ],
  "b37": [
   "หลังจากลุ้นกันมาเกือบสามสิบปี {ปี 2018}",
   "มาร์เวลโปรโมตหนังสือเอ็กซ์เมนโกลด์{ฉบับที่ 30}",
   "ว่าเป็นงานแต่งงานแห่งศตวรรษ",
   "ของ{คิตตี้} ไพรด์กับโคลอสซัส แฟนๆ",
   "ไปรอซื้อกันเพียบ"
  ],
  "b38": [
   "แต่พอถึงวันจริง {คิตตี้}ถอนตัวกลางคัน",
   "งานแต่งที่จัดไว้พร้อมจะเสียเปล่า",
   "{แกมบิท}เห็นจังหวะ",
   "เลยขอ{โร้ก}แต่งงานตรงนั้นเลย",
   "และโร้ก{ตอบตกลง} ใช่ครับ",
   "ทั้งคู่ไปงานแต่งคนอื่น",
   "แล้วกลับมาในฐานะคู่บ่าวสาวเอง",
   "เป็นการชิงไพ่ที่ทั้งน่ารักและกวนที่สุดในชีวิตเรมี่"
  ],
  "b39": [
   "หลังจากนั้นมีหนังสือชุดมิสเตอร์แอนด์มิสซิสเอ็กซ์",
   "ที่เคลลี่ ทอมป์สันเขียน",
   "ตามชีวิตคู่ข้าวใหม่ปลามันของทั้งสองคน",
   "ที่ฮันนีมูนได้ไม่ทันไรก็ต้อง{ออกไปกู้โลก}",
   "เพราะเป็นเอ็กซ์เมน ความสุขแบบสงบๆ",
   "มักอยู่ได้แค่สองหน้ากระดาษ"
  ],
  "b40": [
   "ด้วยความดังระดับนี้",
   "แกมบิทได้หนังสือการ์ตูนเดี่ยว{หลายชุด}",
   "ตั้งแต่มินิซีรีส์{ปี 1993} ซีรีส์ยาวปี 1999",
   "ที่ขุดเรื่อง{กิลด์โจร}ลงลึก",
   "จนวันหนึ่งเขาก้าวขึ้นเป็นราชาแห่งกิลด์โจรเอง",
   "ชุด{ปี 2004} และชุดปี 2012",
   "ที่เน้นงานปล้นสนุกๆ แบบหนังปล้นฮอลลีวูด",
   "และใน{ปี 2022} คริส แคลร์มอนต์",
   "ผู้สร้างคนแรก",
   "กลับมาเขียนเรื่องของเขาอีกครั้ง",
   "ย้อนไปเล่าช่วงที่เรมี่เดินทางกับ{สตอร์ม}ตัวน้อย",
   "ก่อนเข้าเอ็กซ์เมน",
   "เหมือนพ่อกลับมาเล่านิทานเรื่องลูกตัวเองอีกรอบ"
  ],
  "b41": [
   "คนไทยรุ่นสามสิบปลายถึงสี่สิบกว่าๆ",
   "หลายคนรู้จัก{แกมบิท}จากการ์ตูนเอ็กซ์เมนที่ฉายปี 1992",
   "การ์ตูนชุดนี้ใช้ทีมสีน้ำเงินเป็นตัวหลัก",
   "แกมบิทจึงอยู่ในแทบทุกตอน",
   "เพลงเปิดที่ขึ้นทีไรขนลุกทุกที",
   "กับภาพแกมบิทปาไพ่ระเบิดตูม",
   "คือ{ความทรงจำวัยเด็ก}ของคนทั้งรุ่น"
  ],
  "b42": [
   "{ปี 2024} มีภาคต่อชื่อเอ็กซ์เมนเก้าเจ็ด",
   "และตอนที่ห้า ชื่อตอนรีเมมเบอร์อิท",
   "กลายเป็นตอนที่ทำแฟนทั่วโลกร้องไห้",
   "เกาะจีโนชา ประเทศของมิวแทนต์",
   "ถูกหุ่นเซนทิเนลบุกถล่ม {แกมบิท}ถูกแทงทะลุ",
   "แต่ยังรวบรวมแรงสุดท้าย",
   "ชาร์จพลังทั้งหมดที่มีเข้าไปในหุ่นยักษ์",
   "จนระเบิดไปพร้อมกับตัวเอง"
  ],
  "b43": [
   "ที่ทำให้เจ็บกว่านั้นคือ",
   "เขาตายไปโดยเชื่อว่า{โร้ก}เลือกแม็กนีโต้แทนเขา",
   "ทั้งที่ความจริงคืนนั้นโร้กตัดสินใจแล้วว่าจะกลับไปหาเขา",
   "ฉากโร้กกอดร่างไร้ลมหายใจของเรมี่",
   "และพลังดูดชีวิตของเธอไม่ทำงาน",
   "เพราะไม่เหลือชีวิตให้ดูดแล้ว",
   "คือฉากที่หลายคนบอกว่าดูแล้วนอนไม่หลับ",
   "ส่วนเราที่ฟังอยู่ตอนนี้ ไม่ต้องห่วงครับ",
   "เรื่องยังไม่จบ"
  ],
  "b44": [
   "{ปี 2026} เอ็กซ์เมนเก้าเจ็ดภาคสองกลับมา",
   "พร้อม{อะพอคคาลิปส์}",
   "ที่ปลุกแกมบิทขึ้นมาเป็น{ม้าสาวกเดธ}",
   "เหมือนในคอมิก",
   "แถมยังใช้ร่างของเรมี่เป็นภาชนะให้ตัวเองสิงอีก",
   "ที่น่ารักคือ ต่อให้กลายเป็นความตายแล้ว",
   "เรมี่ก็ยังพูดเหมือนเดิม ยังเจ้าเสน่ห์",
   "และยังรัก{โร้ก}หมดหัวใจ",
   "เป้าหมายของเขาคือทำให้ความตาย",
   "พรากเขากับโร้กจากกันไม่ได้อีก ฟังดูโรแมนติก",
   "แต่ก็น่ากลัวพอๆ กัน"
  ],
  "b45": [
   "ในตอนจบของภาคสอง",
   "เอ็กซ์เมนช่วย{แกมบิท}กลับมาได้",
   "แต่ต้องแลกด้วยราคาที่แพงมาก",
   "คือการเสียสละของ{ไนท์ครอว์เลอร์}",
   "เพื่อนร่วมทีม",
   "เป็นการเดิมพันที่ไม่มีใครอยากเล่น",
   "แต่ทุกคนยอมจ่าย"
  ],
  "b46": [
   "ใครเคยหยอดเหรียญตู้เกมยุคเก้าศูนย์",
   "คงจำ{แกมบิท}ได้จากเกมเอ็กซ์เมนปะทะสตรีทไฟเตอร์",
   "และมาร์เวลปะทะแคปคอมสอง ท่าปาไพ่รัวๆ",
   "กับการกระโดดหมุนไม้กระบอง",
   "ทำให้เขาเป็นตัวที่เด็กหลายคนแย่งกันเลือก",
   "นอกจากนี้ยังอยู่ในเกมลุยด่านอย่างเอ็กซ์เมนเลเจนด์",
   "และมาร์เวลอัลติเมทอัลไลแอนซ์ด้วย"
  ],
  "b47": [
   "เส้นทางบนจอหนังของ{แกมบิท} เป็นเรื่องที่แฟนๆ",
   "ต้องอดทนยิ่งกว่าตัวเขาเองรอ{โร้ก}"
  ],
  "b48": [
   "หนังเอ็กซ์เมนสามภาคแรกไม่มี{แกมบิท}เลย",
   "จนปี 2009 เขาได้โผล่ครั้งแรกในเอ็กซ์เมนออริจินส์{วูล์ฟเวอรีน}",
   "รับบทโดยเทย์เลอร์ คิทช์ แต่บทก็น้อย",
   "หนังก็โดนวิจารณ์หนัก แฟนๆ",
   "เลยรู้สึกเหมือนได้ไพ่แค่ใบเดียว"
  ],
  "b49": [
   "จากนั้นแชนนิ่ง เททัม",
   "ที่เป็นแฟนตัวยงของ{แกมบิท}",
   "ประกาศว่าอยากเล่นบทนี้",
   "ฟ็อกซ์เริ่มพัฒนาหนังเดี่ยวราว{ปี 2014}",
   "แล้วนรกก็เริ่ม ผู้กำกับเข้าแล้วออก",
   "บทเขียนใหม่ไม่รู้กี่รอบ",
   "วันฉายเลื่อนแล้วเลื่อนอีก จนดิสนีย์ซื้อฟ็อกซ์",
   "แล้วยกเลิกโปรเจกต์ไปใน{ปี 2019} จบข่าว"
  ],
  "b50": [
   "แต่ห้าปีต่อมา {ปี 2024} จักรวาลก็เล่นตลก",
   "หนังเดดพูลแอนด์{วูล์ฟเวอรีน}",
   "พาตัวละครที่ถูกลืมไปทิ้งไว้ในดินแดนชื่อ{เดอะวอยด์}",
   "และใครโผล่มาล่ะครับ",
   "แชนนิ่ง เททัมในชุด{แกมบิท}เต็มยศ",
   "พร้อมสำเนียงเคจันที่หนักมากจนเดดพูล{ฟังไม่ออก}",
   "กลายเป็นมุกที่คนทั้งโรงหัวเราะ",
   "แต่พอถึงฉากต่อสู้",
   "เขาก็ปาไพ่ให้เห็นว่าแกมบิทเท่แค่ไหน แฟนๆ",
   "หลายคนบอกว่า",
   "นี่คือรางวัลของการรอคอยกว่าสิบปี"
  ],
  "b51": [
   "และเรื่องยังไม่จบ",
   "แชนนิ่ง เททัมได้รับการยืนยันว่าจะกลับมาเล่น",
   "เป็น{แกมบิท}ในอเวนเจอร์สดูมส์เดย์",
   "โดยเป็นแกมบิทคนเดียวกับที่หนีออกมาจาก{เดอะวอยด์}ได้",
   "งานนี้เขาบอกว่าจะลดสำเนียงเคจันลง",
   "ให้เข้ากับโทนจริงจังของหนัง",
   "ซึ่งแปลว่าคราวนี้คนดูน่าจะฟังเขาพูดรู้เรื่องมากขึ้น",
   "หนังมีกำหนดฉายวันที่ {18 ธันวาคม 2026}",
   "และเททัมก็บอกว่า เขายังไม่ยอมแพ้",
   "ยังสู้ให้หนังเดี่ยวของแกมบิทได้สร้างอยู่",
   "สมกับเป็นนักพนันที่ไม่เคยลุกจากโต๊ะ"
  ],
  "b52": [
   "ถ้าถามว่าทำไมผ่านมากว่าสามสิบปี",
   "คนยังรัก{แกมบิท} คำตอบง่ายมาก",
   "เพราะเขา{ไม่สมบูรณ์แบบ}"
  ],
  "b53": [
   "เขาไม่ใช่ผู้นำมีวินัยแบบไซคลอปส์",
   "ไม่ใช่นักสู้ดุดันแบบ{วูล์ฟเวอรีน}",
   "ไม่ใช่เทพธิดาผู้ทรงพลังแบบ{สตอร์ม}",
   "เขาเป็นโจร เป็นนักพนัน",
   "เคยทำเรื่องผิดร้ายแรง เคยถูกทิ้งไว้กลางหิมะ",
   "เคยกลายเป็นความตาย และเคยตายจริงๆ"
  ],
  "b54": [
   "แต่ทุกครั้ง {เขาเดินกลับมา}",
   "กลับมาหาเพื่อนที่ทิ้งเขา",
   "กลับมาหาผู้หญิงที่แตะไม่ได้",
   "และกลับมาเป็นคนที่ดีกว่าเดิมนิดหนึ่งเสมอ"
  ],
  "b55": [
   "ชื่อ{แกมบิท}หมายถึงการยอมเสีย",
   "หมากตัวเล็กเพื่อชนะเกมใหญ่",
   "ชีวิตของเรมี่ เลอโบ ก็คือแบบนั้น",
   "เขายอมเสียศักดิ์ศรี ความลับ ความปลอดภัย",
   "บางครั้งแม้แต่ชีวิต",
   "เพื่อแลกกับสิ่งเดียวที่เขาอยากได้จริงๆ",
   "คือได้เป็นคนที่คู่ควรกับคนที่เขารัก"
  ],
  "b56": [
   "และนี่คือเรื่องของ{แกมบิท}",
   "ราชาไพ่แห่งนิวออร์ลีนส์",
   "หนุ่มเคจันที่เกิดมาเป็นของโจร โตมาเป็นโจร",
   "แต่สุดท้าย ขโมยหัวใจคนดูไปได้ทั้งโลก {ฝันดีนะ เชร์}"
  ],
  "facts": [
   "รู้งี้ เบื้องหลังตัวละคร {แกมบิท}เปิดตัวปี 1990",
   "ในอันแคนนี่เอ็กซ์เมน{ฉบับที่ 266}",
   "สร้างโดยคริส แคลร์มอนต์ กับจิม ลี {ปี 2018}",
   "แต่งงานกับ{โร้ก}ในเอ็กซ์เมนโกลด์ฉบับที่ 30",
   "ในงานที่โปรโมตว่าเป็นของ{คิตตี้}กับโคลอสซัส",
   "และอเวนเจอร์สดูมส์เดย์",
   "มีกำหนดฉายวันที่ 18 ธันวาคม 2026",
   "โดยแชนนิ่ง เททัมกลับมารับบทอีกครั้ง"
  ],
  "next": [
   "อยากฟังประวัติตัวไหนต่อ {คอมเมนต์}บอกหน่อย"
  ],
  "ask": [
   "ถ้าแตะคนที่รักไม่ได้เลยทั้งชีวิต",
   "คุณจะ{ยังรักต่อไหม}"
  ]
};
const RECAP = { booth: ['pgam', 'prog', 'pwol', 'pskid', 'pkid', 'pcard', 'pglow'], sub: SUBS };
const RT = recapTiming(BEATS, RECAP.sub);
const PI_ = (id, w) => { const s = RECAP.sub[id] || [], i = s.findIndex((p) => p.replace(/[{}]/g, '').indexOf(w) >= 0); if (i < 0) console.warn('recap: no phrase', id, w); return Math.max(0, i); };
const PH = (id, w, off) => RT.p(id, PI_(id, w), off || 0), PE = (id, w, off) => RT.e(id, PI_(id, w)) + (off || 0), BD = (id) => (BEATS.find((b) => b[0] === id) || [0, 0])[1];
const p4 = (i, off) => RT.p('b04', i, off), p5 = (i, off) => RT.p('b05', i, off);

/* ---- signs in the sets are replaced by credit plates, pops and comic pages ---- */
for (const id in SC) { const A = SC[id].A; if (A) for (const k in A) if (CAST[k] && CAST[k][0] === 'sign') delete A[k]; }
for (const k in CAST) if (CAST[k][0] === 'sign') delete CAST[k];

/* ---- booth cast: only rendered inside comic panels ---- */
Object.assign(CAST, { pgam: ['gambit', 1], prog: ['rogue', 1], pwol: ['wolverine', 1], pskid: ['stormKid', 1], pkid: ['extra', 1, 1], pcard: ['paper', 0.9], pglow: ['glow', 0.16, 'rgba(255,214,150,1)'] });
const cardIn = (o, t, who) => { const h = H.hand(o[who || 'pgam'], 'R'); o.pcard.visible = true; o.pcard.position.set(h.x, h.y + 0.14, h.z + 0.16); o.pcard.rotation.set(1.3, 0, 0.3); o.pcard.scale.setScalar(o.pcard.userData.s0);
  o.pglow.visible = true; o.pglow.position.copy(o.pcard.position); o.pglow.scale.setScalar(0.5 * (1 + 0.2 * Math.sin(t * 16))); return h; };
/* panel shot: actors [[key, x, z, facing, pose, expression]], camera [lookX, lookY, lookZ, dist, height, side], card = who holds a glowing card */
const sh = (list, cam, card) => (o, t) => { list.forEach(([k, x, z, f, pose, ex]) => RC.act(o[k], x, 0, z, f, pose, ex, t)); if (card) cardIn(o, t, card); return RC.cam(...cam); };
const FACE = (x, s) => [x || 0, 2.5, 0.3, 3.9, 0.1, s == null ? 0.5 : s], MED = (x, s) => [x || 0, 2.0, 0, 6.2, -0.6, s == null ? -1 : s], TWO = (s) => [0, 1.9, 0, 8.2, 0.1, s || 0], LOW = (x) => [x || 0, 2.1, 0, 5.6, -1.3, -1.4];
const PSH = {
  hero: sh([['pgam', 0, 0, 22, 'give', 'giggle']], LOW(0.4), 'pgam'),
  face: sh([['pgam', 0, 0, -18, 'think', 'giggle']], [0, 2.55, 0.3, 3.9, 0.15, 0.6]),
  card: (o, t) => { RC.act(o.pgam, 0, 0, 0, 30, 'give', 'happy', t); const h = cardIn(o, t); return { look: [h.x, h.y + 0.15, h.z], pos: [h.x + 0.9, h.y + 0.5, h.z + 2.3] }; },
  peek: sh([['pkid', -1.0, 0.6, 25, 'reach', 'worried'], ['pgam', 2.9, -4.2, -30, 'wave', 'giggle']], [0.5, 2.0, -0.5, 9.2, 0.4, 0]),
  eyes: sh([['pgam', 0, 0, 12, 'hips', 'giggle']], [0, 2.6, 0.4, 3.0, 0, -0.3]),
};
const LAY = { 1: [[0, 0, 1, 1]], 2: [[0, 0, 1, 0.6], [0, 0.63, 1, 0.37]], 3: [[0, 0, 1, 0.5], [0, 0.53, 0.47, 0.47], [0.51, 0.53, 0.49, 0.47]], 4: [[0, 0, 0.49, 0.49], [0.51, 0, 0.49, 0.49], [0, 0.51, 0.49, 0.49], [0.51, 0.51, 0.49, 0.49]] };
const BGS = { pink: ['#4a2a86', '#ff3d8b'], sun: ['#ffd23f', '#ff9a3a'], sea: ['#17506e', '#35d0ff'], night: ['#1d3b6a', '#3aa0d8'], hot: ['#ff3d8b', '#ffd23f'], ice: ['#a8d4f8', '#3a78c0'],
  dark: ['#1a1030', '#6a2a8a'], red: ['#5a0e1e', '#e0263c'], gold: ['#7a4a10', '#ffd23f'], mint: ['#1e6a5a', '#7ae0c0'] };
const page = (t0, head, panels, o) => Object.assign({ t0, x: 0.75, y: 0.47, h: 0.78, rot: 3, head, panels: panels.map((p, i) => Object.assign({ r: LAY[panels.length][i] }, p, { bg: BGS[p.bg] || p.bg || BGS.pink })) }, o || {});

/* ---- chapters (short cards; the first beat of each chapter) ---- */
const TITLE = { cover: ['ประวัติตัวละคร', 'แกมบิท', 'ราชาไพ่แห่งเอ็กซ์เมน'],
  b04: ['บทที่ 1', 'เกิดมาบนหน้ากระดาษ', 'แบบงงๆ', 3.0], b09: ['บทที่ 2', 'เด็กที่ถูกขโมย', 'ตั้งแต่วันแรก', 3.0], b18: ['บทที่ 3', 'ไพ่ใบที่', 'มืดที่สุด', 3.0],
  b23: ['บทที่ 4', 'ทีมสีน้ำเงิน', 'กับโร้ก', 3.0], b29: ['บทที่ 5', 'ทิ้งไว้', 'กลางหิมะ', 3.0], b34: ['บทที่ 6', 'เดิมพันกับ', 'ความตาย', 3.0],
  b37: ['บทที่ 7', 'งานแต่งที่', 'ไม่ได้วางแผน', 3.0], b40: ['บทที่ 8', 'ราชาไพ่', 'บนทุกจอ', 3.0], b47: ['บทที่ 9', 'ทางยาว', 'สู่จอเงิน', 3.0], b52: ['บทสุดท้าย', 'ทำไมเรา', 'ยังรักเขา', 3.0] };

/* ---- lower thirds: first appearance of each character ---- */
const T3 = (id, w, name, role, off) => [id, [PH(id, w, off == null ? 0.2 : off), name, role, 3.6]];
const THIRD = {}; [
  T3('b01', 'ชื่อจริง', 'แกมบิท', 'เรมี่ เอเตียน เลอโบ · ราชาไพ่แห่งนิวออร์ลีนส์', 0.1), T3('b07', 'เด็กคนนั้นคือสตอร์ม', 'สตอร์ม (ร่างเด็ก)', 'ถูกทำให้ย้อนวัย · ขโมยตัวน้อย'),
  T3('b11', 'ฌอง-ลุค เลอโบ', 'ฌอง-ลุค เลอโบ', 'หัวหน้ากิลด์โจร'), T3('b12', 'แอนทีควอรี่', 'แอนทีควอรี่', 'ผู้หยั่งรู้ของกิลด์'), T3('b13', 'อองรี', 'อองรี', 'พี่ชายบุญธรรม'),
  T3('b14', 'เบลล่า', 'เบลล่า ดอนน่า บูโดรซ์', 'ทายาทกิลด์นักฆ่า'), T3('b16', 'จูเลียน', 'จูเลียน', 'พี่ชายของเบลล่า'), T3('b18', 'มิสเตอร์ซินิสเตอร์', 'มิสเตอร์ซินิสเตอร์', 'นักวิทยาศาสตร์ วายร้ายสายเกมยาว', 1.4),
  T3('b19', 'มาโรเดอร์ส', 'มาโรเดอร์ส', 'ทีมนักฆ่ามิวแทนต์'), T3('b21', 'เซเบอร์ทูธ', 'เซเบอร์ทูธ', 'หนึ่งในมาโรเดอร์ส'), T3('b23', 'ร่วมกับไซคลอปส์', 'ทีมสีน้ำเงิน', 'ไซคลอปส์ · วูล์ฟเวอรีน · โร้ก · บีสต์ · ไซล็อค · จูบิลี่'),
  T3('b26', 'โร้กเป็นสาวใต้', 'โร้ก', 'สาวใต้จากมิสซิสซิปปี · แตะใครไม่ได้'), T3('b30', 'อีริคเดอะเรด', 'อีริคเดอะเรด', 'ผู้พิพากษาลึกลับ'), T3('b35', 'อะพอคคาลิปส์คือ', 'อะพอคคาลิปส์', 'มิวแทนต์โบราณ'),
  T3('b36', 'ซันไฟร์', 'ซันไฟร์', 'ม้าสาวกที่หลุดการควบคุม'), T3('b37', 'คิตตี้', 'คิตตี้ ไพรด์ กับโคลอสซัส', 'เจ้าบ่าวเจ้าสาว (ตามแผน)'), T3('b45', 'ไนท์ครอว์เลอร์', 'ไนท์ครอว์เลอร์', 'เพื่อนร่วมทีม'),
].forEach(([id, q]) => (THIRD[id] = THIRD[id] || []).push(q));
THIRD.b21.push([PH('b21', 'ซาร่าห์', 0.2), 'ซาร่าห์', 'เด็กมอร์ล็อค · ต่อมาคือมาร์โรว์', 3.4]);
THIRD.b24 = [[PH('b24', 'วูล์ฟเวอรีน', 0.2), 'วูล์ฟเวอรีน', 'คู่ปะทะประจำทีม', 3.2], [PH('b24', 'จูบิลี่', 0.2), 'จูบิลี่', 'สาวน้อยยิงพลุ · น้องสาวที่โดนแกล้ง', 3.4]];

/* ---- credit plates (real people: text only) ---- */
const CR = (id, w, label, name, d, off) => [PH(id, w, off == null ? 0.2 : off), label, name, d || 4.5];
const CREDIT = {
  b01: [CR('b01', 'คริส', 'ผู้สร้าง', 'คริส แคลร์มอนต์', 5), CR('b01', 'คริส', 'ผู้สร้าง', 'จิม ลี', 4.8, 0.6)],
  b05: [[p5(0, 0.7), 'เขียนเรื่อง', 'คริส แคลร์มอนต์', p5(5) - p5(0, 0.7)], [p5(2, 0.3), 'ออกแบบตัวละคร', 'จิม ลี', p5(5) - p5(2, 0.3)], [p5(4, 0.2), 'วาดฉบับเปิดตัว', 'ไมค์ คอลลินส์', p5(5, 0.6) - p5(4, 0.2)]],
  b39: [CR('b39', 'เคลลี่', 'เขียนเรื่อง', 'เคลลี่ ทอมป์สัน')], b40: [CR('b40', 'คริส แคลร์มอนต์', 'ผู้สร้างคนแรก กลับมาเขียน', 'คริส แคลร์มอนต์', 5)],
  b48: [CR('b48', 'รับบทโดย', 'รับบทแกมบิท', 'เทย์เลอร์ คิทช์')], b49: [CR('b49', 'แชนนิ่ง', 'แฟนตัวยง อยากเล่นบทนี้', 'แชนนิ่ง เททัม')],
  b50: [CR('b50', 'แชนนิ่ง เททัมในชุด', 'รับบทแกมบิท', 'แชนนิ่ง เททัม')], b51: [CR('b51', 'แชนนิ่ง', 'กลับมารับบท', 'แชนนิ่ง เททัม')],
};

/* ---- comic pages: whenever the narration names an issue, a series, a show, a game or a film ---- */
const PAGES = {
  b01: [page(PH('b01', 'ชื่อจริง', 3.0), ['แกมบิท', 'แฟ้มประวัติ'], [
    { bg: 'pink', fx: 'burst', shot: sh([['pgam', 0, 0, 15, 'hips', 'giggle']], MED(0, -0.6)), cap: 'ปีศาจขาว' },
    { bg: 'night', fx: 'dots', shot: sh([['pgam', 0, 0, -20, 'think', 'happy']], FACE(0, 0.5)), cap: 'นิวออร์ลีนส์' },
    { bg: 'hot', fx: 'speed', shot: PSH.card, sfx: 'ตูม!' },
    { bg: 'sea', fx: 'dots', shot: sh([['prog', 0, 0, -15, 'wave', 'happy']], MED(0, -0.4)), cap: 'คนที่รัก' }], { t1: PE('b01', 'คนที่รัก') })],
  b05: [
    page(p5(5, 0.25), ['ฉบับที่ 266', 'ปี 1990'], [
      { bg: 'pink', fx: 'burst', cy: 0.7, shot: PSH.hero, cap: 'โจรหนุ่มปรากฏตัว' }, { bg: 'sun', fx: 'speed', shot: PSH.face, balloon: 'เชร์!' }, { bg: 'sea', fx: 'dots', shot: PSH.card, sfx: 'ฟึ่บ!' }],
      { x: 0.7, to: [p5(7, 0.1), 0.815, 0.45, 8, 0.9] }),
    page(p5(7, 0.3), ['ฉบับพิเศษประจำปี', 'Annual #14'], [
      { r: [0, 0, 1, 0.6], bg: 'night', fx: 'dots', shot: PSH.peek, cap: 'โผล่มาแว่บเดียว' }, { r: [0, 0.63, 1, 0.37], bg: 'hot', fx: 'speed', shot: PSH.eyes }],
      { from: 'top', x: 0.585, y: 0.5, h: 0.74, rot: -5, stamp: [p5(9, 0.35), 'วางแผงก่อน!'] })],
  b07: [page(PH('b07', 'ขโมยงานศิลปะ', 0.3), ['ฉบับที่ 266', 'ปี 1990'], [
    { bg: 'night', fx: 'dots', shot: sh([['pgam', 0, 0, 30, 'reach', 'giggle']], MED(0.2, -0.8)), cap: 'โจรมาขโมยของ' },
    { bg: 'sun', fx: 'speed', shot: sh([['pskid', 0, 0, -40, 'reach', 'worried']], FACE(0, 0.3)), cap: 'ถูกไล่ล่า' },
    { bg: 'pink', fx: 'burst', shot: sh([['pgam', -0.8, 0, 40, 'give', 'giggle'], ['pskid', 0.8, 0, -40, 'wave', 'happy']], TWO()), cap: 'โจรเจอโจร' }],
    { t1: PE('b07', 'วายร้ายพลังจิต') })],
  b29: [page(PH('b29', 'ฉบับที่ 350', 0.4), ['อันแคนนี่เอ็กซ์เมน ฉบับที่ 350', 'ปี 1997'], [
    { bg: 'red', fx: 'burst', shot: sh([['pgam', 0, 0, 10, 'down', 'worried']], MED(0, -0.6)), cap: 'ความลับแตก' },
    { bg: 'ice', fx: 'dots', shot: sh([['prog', -0.8, 0, 35, 'reach', 'worried'], ['pwol', 0.9, 0, -35, 'hips', 'angry']], TWO()) }],
    { x: 0.7, stamp: [PH('b29', 'การพิพากษา', 0.3), 'พิพากษา!'] })],
  b34: [page(PH('b34', 'ปี 2006', 0.4), ['เลือดแห่งอะพอคคาลิปส์', 'ปี 2006'], [
    { bg: 'gold', fx: 'burst', shot: sh([['pgam', 0, 0, 20, 'think', 'giggle']], MED(0, -0.8)), cap: 'เดิมพันอีกรอบ' },
    { bg: 'dark', fx: 'speed', shot: sh([['pgam', 0, 0, -10, 'hips', 'angry']], FACE(0, 0.2)) }], { x: 0.72 })],
  b38: [page(PH('b38', 'เลยขอโร้ก', 0.2), ['เอ็กซ์เมนโกลด์ ฉบับที่ 30', 'ปี 2018'], [
    { bg: 'pink', fx: 'burst', shot: sh([['pgam', -0.7, 0, 50, 'give', 'happy'], ['prog', 0.8, 0, -50, 'reach', 'worried']], TWO(0.6)), cap: 'แต่งตรงนี้เลยไหม' },
    { bg: 'sun', fx: 'dots', shot: sh([['prog', 0, 0, -10, 'cheer', 'giggle']], FACE(0, -0.4)), balloon: 'ตกลง!' },
    { bg: 'hot', fx: 'speed', shot: sh([['pgam', -0.6, 0, 30, 'cheer', 'giggle'], ['prog', 0.6, 0, -30, 'cheer', 'happy']], TWO()) }],
    { stamp: [PH('b38', 'ทั้งคู่ไปงานแต่ง', 0.3), 'สลับคู่!'] })],
  b40: [
    page(PH('b40', 'หนังสือการ์ตูนเดี่ยว', 0.3), ['หนังสือเดี่ยวของแกมบิท', ''], [
      { bg: 'pink', fx: 'burst', shot: sh([['pgam', 0, 0, 20, 'hips', 'giggle']], MED(0, -0.8)), cap: '1993' },
      { bg: 'gold', fx: 'dots', shot: sh([['pgam', 0, 0, -25, 'cheer', 'happy']], MED(0, 0.8)), cap: '1999' },
      { bg: 'night', fx: 'speed', shot: PSH.card, cap: '2004' }, { bg: 'mint', fx: 'dots', shot: sh([['pgam', 0, 0, 0, 'think', 'giggle']], FACE(0, 0.4)), cap: '2012' }],
      { t1: PE('b40', 'ซีรีส์ยาว') + 6 }),
    page(PH('b40', 'ปี 2022', 0.2), ['ปี 2022', 'ผู้สร้างกลับมาเขียน'], [
      { r: [0, 0, 1, 1], bg: 'sun', fx: 'burst', shot: sh([['pgam', -0.7, 0, 35, 'wave', 'happy'], ['pskid', 0.8, 0, -30, 'cheer', 'giggle']], TWO(0.4)), cap: 'เดินทางกับสตอร์มตัวน้อย' }],
      { from: 'top', x: 0.74, y: 0.5, h: 0.62, rot: -4 })],
  b41: [page(PH('b41', 'การ์ตูนชุดนี้', 0.2), ['การ์ตูนทีวี', 'ปี 1992'], [
    { bg: 'sea', fx: 'burst', shot: sh([['pwol', -1.1, -0.2, 25, 'hips', 'angry'], ['pgam', 0, 0.3, 0, 'give', 'giggle'], ['prog', 1.1, -0.2, -25, 'wave', 'happy']], [0, 1.9, 0, 9.5, 0.2, 0]), cap: 'ทีมสีน้ำเงิน' },
    { bg: 'hot', fx: 'speed', shot: PSH.hero, sfx: 'ตูม!' }], { x: 0.73 })],
  b42: [page(PH('b42', 'ตอนที่ห้า', 0.2), ['เอ็กซ์เมน 97', 'ปี 2024'], [
    { bg: 'red', fx: 'burst', shot: sh([['pgam', 0, 0, 15, 'up', 'angry']], LOW(0)), cap: 'รีเมมเบอร์อิท' },
    { bg: 'hot', fx: 'speed', shot: PSH.card, sfx: 'ตูม!' }], { x: 0.25, rot: -3 })],
  b44: [page(PH('b44', 'ปี 2026', 0.4), ['เอ็กซ์เมน 97 ภาคสอง', 'ปี 2026'], [
    { bg: 'dark', fx: 'burst', shot: sh([['pgam', 0, 0, 10, 'hips', 'angry']], MED(0, -0.6)), cap: 'ม้าสาวกเดธ' },
    { bg: 'pink', fx: 'dots', shot: sh([['pgam', -0.7, 0, 40, 'reach', 'happy'], ['prog', 0.8, 0, -40, 'reach', 'worried']], TWO()) }], { x: 0.74 })],
  b46: [page(PH('b46', 'เกมเอ็กซ์เมนปะทะ', 0.2), ['ตู้เกมยุค 90', ''], [
    { bg: 'night', fx: 'speed', shot: sh([['pgam', -1.0, 0, 70, 'give', 'angry'], ['pwol', 1.0, 0, -70, 'hips', 'angry']], TWO()), sfx: 'ปะทะ!' },
    { bg: 'gold', fx: 'burst', shot: PSH.hero, cap: 'ปาไพ่รัวๆ' }], { x: 0.74 })],
  b48: [page(PH('b48', 'จนปี 2009', 0.3), ['เอ็กซ์เมนออริจินส์ วูล์ฟเวอรีน', 'ปี 2009'], [
    { r: [0, 0, 1, 1], bg: 'night', fx: 'dots', shot: sh([['pgam', 0, 0, 0, 'wave', 'happy']], [0, 1.9, 0, 12, 0.3, 0]), cap: 'ได้ไพ่ใบเดียว' }], { x: 0.74, h: 0.64 })],
  b50: [page(PH('b50', 'เดดพูลแอนด์', 0.2), ['เดดพูลแอนด์วูล์ฟเวอรีน', 'ปี 2024'], [
    { bg: 'dark', fx: 'burst', shot: sh([['pgam', 0, 0, 15, 'hips', 'giggle']], LOW(0)), cap: 'เดอะวอยด์' },
    { bg: 'sun', fx: 'dots', shot: PSH.face, balloon: '#@%&?!' },
    { bg: 'hot', fx: 'speed', shot: PSH.card, sfx: 'ฟึ่บ!' }], { x: 0.75 })],
  b51: [page(PH('b51', 'อเวนเจอร์ส', 0.2), ['อเวนเจอร์สดูมส์เดย์', '18 ธ.ค. 2026'], [
    { bg: 'gold', fx: 'burst', shot: sh([['pgam', 0, 0, 10, 'hips', 'happy']], LOW(0)), cap: 'กลับมาอีกครั้ง' },
    { bg: 'sea', fx: 'dots', shot: sh([['pgam', 0, 0, -15, 'think', 'giggle']], FACE(0, 0.4)), cap: 'ลดสำเนียงลง' }],
    { x: 0.74, stamp: [PH('b51', 'กำหนดฉาย', 0.3), '18 ธ.ค.!'] })],
};

/* ---- key-word pops: the punch word of each beat (from KEY), when it is spoken; manual ones first ---- */
const POP = {
  b03: [[PH('b03', 'ยอมเสียหมาก', 0.3), 'ยอมเสียหมากเล็ก', { x: 0.27, y: 0.2, px: 96 }]], b06: [[PH('b06', 'เกิดสองรอบ', 0.3), 'เกิดสองรอบ!', { x: 0.72, y: 0.2, px: 110 }]],
  b10: [[PH('b10', 'คือกิลด์โจร', 0.2), 'กิลด์โจร', { x: 0.25, y: 0.2, px: 110 }], [PE('b10', 'คือกิลด์โจร', -0.1), 'กิลด์นักฆ่า', { x: 0.75, y: 0.2, px: 110, band: '#e0263c' }]],
  b22: [[PH('b22', 'ระเบิดเวลา', 0.3), 'ความลับ', { x: 0.73, y: 0.2, px: 120, band: '#e0263c' }]], b23: [[PH('b23', 'สีน้ำเงินกับสีทอง', 0.2), 'ทีมสีน้ำเงิน', { x: 0.73, y: 0.2, px: 110, band: '#35a8ff' }]],
  b32: [[PH('b32', 'แม็กนีโต้', 0.3), 'แม็กนีโต้!', { x: 0.72, y: 0.2, px: 120 }]],
  b49: [[PH('b49', 'ปี 2014', 0.2), '2014 เริ่ม', { x: 0.28, y: 0.2, px: 100, band: '#35a8ff' }], [PH('b49', 'ปี 2019', 0.2), '2019 ยกเลิก', { x: 0.72, y: 0.2, px: 100, band: '#e0263c' }]],
  next: [[0.5, 'คอมเมนต์!', { x: 0.74, y: 0.22, px: 120 }]], ask: [[0.6, 'ยังรักไหม?', { x: 0.74, y: 0.22, px: 120 }]],
};
(() => { let side = 1; const GL = (s) => s.replace(/[ัิ-ฺ็-๎]/g, '').length;
  for (const [id] of BEATS) { const k = KEY[id]; if (!k || POP[id] || PAGES[id] || !RECAP.sub[id]) continue;
    const words = (k[1].match(/[{[<]([^}\]>]+)[}\]>]/g) || []).concat(k[0].match(/[{[<]([^}\]>]+)[}\]>]/g) || []).map((w) => w.slice(1, -1));
    const w = words.find((x) => GL(x) <= 14 && RECAP.sub[id].some((p) => p.indexOf(x) >= 0)); if (!w) continue;
    const right = CREDIT[id] ? false : (side = -side) > 0; POP[id] = [[PH(id, w, 0.35), w, { x: right ? 0.74 : 0.26, y: 0.2, px: Math.round(Math.min(130, Math.max(78, 1100 / GL(w)))), rot: right ? -5 : 4 }]]; } })();

Object.assign(RECAP, { title: TITLE, third: THIRD, credit: CREDIT, pages: PAGES, pop: POP });

/* ---- b04-b05: the hand-tuned studio scene from the demo ---- */
const K5 = (t, lx, ly, lz, d, h, sx, cut) => [t, lx, ly, lz, d / 1.45, h / 1.45, (sx || 0) / 1.45, cut ? 1 : 0];
const toss = (r, t, s, o) => { if (!o.card || !o.card.visible) return; const h = H.hand(o.gam, 'R'), u = (t * 0.85) % 1, up = Math.sin(u * Math.PI) * 1.0; o.card.position.set(h.x, h.y + 0.16 + up, h.z + 0.16); o.card.rotation.set(1.3 + u * 12.566, 0, 0.3);
  if (o.cglow) { o.cglow.position.copy(o.card.position); o.cglow.scale.setScalar(0.45 * (1 + 0.2 * Math.sin(t * 16))); } };
Object.assign(SC, {
  b04: { st: 'STUDIO', bg: 'studio', cut: true, cam: [K5(0, 2.0, 2.2, 0.3, 10.5, -1.2, -2.2)], rc: [[0, 2.4, 2.2, 0.3, 11, -1.1, -16], [p4(1, 0.2), 0.8, 2.4, 0.2, 7.0, -0.4, 12]],
    A: { tbl: null, board: null, king: null, pawn: null, gam: { p: [5.2, 0.6], f: null, to: [0.8, 0.2, 0.2, p4(1, 0.0)], pose: (c, r) => { if (r > p4(1, 0.6)) POSE.shrug(c); else POSE.give(c); } }, card: {}, cglow: {} },
    sfx: [[0.5, 'pop'], [p4(1, 0.5), 'bell']],
    fx: (r, t, s, o) => { toss(r, t, s, o); if (r > p4(1, 0.0)) o.gam.rotation.y = 0.22; if (r > p4(1, 0.6)) { o.gam.userData.setExpr('giggle'); o.card.visible = o.cglow.visible = false; } } },
  b05: { st: 'STUDIO', cam: [K5(0, 0.8, 2.4, 0.2, 7.0, -0.4, 0)], rcPage: false,
    rc: [[0, 0.8, 2.4, 0.2, 6.9, -0.4, 14], [p5(2), -2.7, 2.6, -2.9, 10.5, 1.0, 36], [p5(3), -2.8, 2.6, -3.0, 10.2, 0.9, 32], [p5(4), -3.0, 2.4, -3.4, 7.4, -0.3, -8], [p5(5, -0.3), -3.0, 2.4, -3.4, 7.2, -0.3, -4],
      [p5(5, 1.0), 0.6, 2.15, -3.4, 10.8, 0.3, 2], [p5(7), 0.6, 2.15, -3.4, 10.5, 0.3, 0], [p5(10, 2.0), 0.5, 2.2, -3.4, 9.4, 0.2, -9]],
    shake: [p5(7, 0.62), p5(7, 1.1), 0.09], flash: [[p5(7, 0.62), 0.22, 'rgba(255,250,235,']],
    A: { desk: null, bk1: null, bk2: null, card: null, cglow: null, gam: { p: [0.8, 0.2], to: [-3.0, -3.4, 0.3, p5(2) - 0.4], pose: (c, r) => { if (r < p5(2)) return; if (r < p5(3)) POSE.think(c); else if (r < p5(5)) POSE.shrug(c); else if (r < p5(7, 0.5)) POSE.point(c); else if (r < p5(9)) POSE.up(c); else if (r < p5(10)) POSE.hips(c); else POSE.shrug(c); } } },
    sfx: [[p5(0, 0.7), 'pop'], [p5(2, 0.3), 'pop'], [p5(4, 0.2), 'pop'], [p5(5, 0.25), 'zip'], [p5(6, 1.0), 'bell'], [p5(7, 0.3), 'zip'], [p5(7, 0.62), 'puff'], [p5(9, 0.35), 'tok'], [p5(10, 1.2), 'pop']],
    fx: (r, t, s, o) => { const g = o.gam, tw = (a, b, t0) => U.lerp(a, b, U.easeIO(U.clamp((r - t0) / 0.5))); if (r >= p5(2) - 0.4) g.rotation.y = r < p5(3) ? tw(3.9, Math.PI, p5(2) - 0.4) : r < p5(5) ? tw(Math.PI, 0.2, p5(3)) : tw(0.2, 0.8, p5(5));
      g.userData.setExpr(r < p5(3) ? 'happy' : r < p5(5) ? 'worried' : r < p5(7, 0.5) ? 'giggle' : r < p5(10) ? 'worried' : 'giggle'); if (r > p5(3) && r < p5(5)) g.userData.head.rotation.z = 0.18; } },
});
POP.b04 = [[p4(1, 0.3), 'วุ่นวาย!', { x: 0.8, y: 0.25, px: 150, rot: -6, dur: 2.0 }]];
POP.b05 = [[p5(6, 1.0), 'ฉบับ 266', { x: 0.2, y: 0.2, px: 120, rot: -4, dur: 2.2 }], [p5(10, 1.2), 'เกิดทีหลัง?!', { x: 0.21, y: 0.2, px: 112, rot: -4, dur: 2.2, band: '#35d0ff' }]];

/* ---- orbit camera for every other beat: one continuous move per beat (orbit + slow push), from the beat's own framing.
   A beat that stays in the same place with the same people glides on from where the last beat ended instead of cutting.
   While a comic page is up, the shot trucks sideways so the people sit on the free side of the frame. ---- */
(() => { const ZQ = 1.45, R2D = 180 / Math.PI, SMALL = /^(card|cglow|spark|puff|boom\d?|b\d|flash|sn\d|cf\d|og\d|oc\d|mem\d|hrt\d|fireg|dark\d?|bolt|bk\d|pp\d)$/;
  const toRc = (k) => { const sx = (k[6] || 0) * ZQ, dz = k[4] * ZQ; return [k[0], k[1], k[2], k[3], Math.hypot(sx, dz), k[5] * ZQ, Math.atan2(sx, dz) * R2D]; };
  const state = {}; let prev = null, last = null, dir = 1, lastCam = {};
  for (const [id] of BEATS) { const sc = SC[id]; if (!sc) continue; const st = sc.st || (prev && prev.st), d = BD(id), S = (state[st] = state[st] || {});
    let jump = !prev || prev.st !== st || sc.cut === true;
    for (const k in sc.A || {}) { if (SMALL.test(k)) continue; const a = sc.A[k]; const had = S[k];
      if (a === null) { if (had) jump = true; delete S[k]; continue; } const p = a.p || (had && had.slice()); if (!p) continue; if (!had || Math.hypot(p[0] - had[0], p[1] - had[1]) > 0.6) jump = true;
      S[k] = a.to ? [a.to[0], a.to[1]] : [p[0], p[1]]; }
    let cam = sc.cam || lastCam[st]; if (!cam) cam = [0, 0, 2.45, 0, 7.2, 0.8, 0]; if (typeof cam[0] === 'number') cam = [cam.length >= 7 ? cam : [0].concat(cam)]; lastCam[st] = cam;
    if (!sc.rc) { const ks = cam.map(toRc), sw = Math.min(16, 5 + d * 0.5) * (dir = -dir);
      const rc = ks.map((k, i) => { const u = ks.length > 1 ? i / (ks.length - 1) : 0, c = k.slice(); c[6] += -sw / 2 + sw * 0.7 * u; c[4] *= 1.05 - 0.08 * u; return c; });
      const e = rc[rc.length - 1].slice(); e[0] = Math.max(d, e[0] + 1); e[6] += sw * (ks.length > 1 ? 0.3 : 1); e[4] *= 0.93; rc.push(e);
      if (!jump && last) { const g = last.slice(0, 7); g[0] = 0; const t1 = Math.min(2.4, d * 0.3); if (rc[1] && rc[1][0] <= t1) rc[0][0] = t1 * 0.5; else rc[0][0] = t1; rc.unshift(g); sc.cut = false; }
      rc.forEach((k) => (k[7] = 0)); sc.rc = rc; }
    last = sc.rc[sc.rc.length - 1]; prev = { st }; }
})();

/* ---- chapter strip is off in the recap look; facts card text ---- */
EP.factHead = ['รู้งี้…', 'เบื้องหลังตัวละคร'];
/* brighter night / tunnel / lab light for the recap look (applied by k-recap.js) */
EP.lt = { night: [0.82, 0.86, '#c8d0ff'], storm: [0.9, 0.9, '#d0d4ff'], grove: [0.64, 0.76, '#c8dcff'], hall: [0.68, 0.85, '#ffd8b0'], dawn: [0.72, 0.82, '#ffd0a8'], war: [0.66, 0.8, '#ffb898'] };
