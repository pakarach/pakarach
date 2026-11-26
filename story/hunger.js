/* สรุปหนัง Hunger Games 1-6 (2012-2026) — one long vinyl-chibi recap in story order, 6 chapters (one per film):
   Ballad of Songbirds & Snakes (10th Games) → Sunrise on the Reaping (50th) → The Hunger Games (74th) → Catching Fire (75th) → Mockingjay 1 → Mockingjay 2.
   No film footage, posters, logos, title lettering or score. Original chibis (colours, hair, one prop). No fire dress, no mockingjay pin, no salute, no peacekeeper armour.
   Mutts = plain animals or coloured light (snakes, wasps = yellow swarm, birds = pink birds, sewer mutts = pale wolves). Deaths stay soft (fall + fade).
   Running devices: "เหลือ N คน" counter in every arena, Snow's white rose, Lenore Dove's dream of a day with no reaping paid off at the end. */
const EP = {
  no: 8, file: 'hunger-games-6-recap', title: 'สรุปหนัง เกมล่าเกม 6 ภาค', series: 'สรุปหนัง',
  cover: [[46, 'สปอยล์ เกมล่าเกม 6 ภาค', 'teal'], [74, 'เด็ก 24 คน ต้องฆ่ากันจนเหลือ 1', 'w'], [84, 'ถ่ายทอดสดทั้งประเทศ!', 'gold'], [62, 'แต่เด็กสาวคนเดียว ล้มทั้งระบบได้', 'coral']],
  chap: [['ปี 74', 'p3', 'c22'], ['ปี 75', 'p4', 'd18'], ['ลุกฮือ', 'p5', 'e13'], ['ศึกสุดท้าย', 'p6', 'f20'], ['ปี 10', 'p1', 'a22'], ['ปี 50', 'p2', 'fin']],
  factHead: ['รู้งี้…', 'เบื้องหลังหนัง'],
  facts: [['ไอเดียเกิดตอนกดรีโมตสลับช่อง', 'รายการเรียลลิตี้ ↔ ข่าวสงครามจริง'], ['5 ภาคแรกทำเงินรวม 3,300 ล้านดอลลาร์', 'ภาค 2 แคชชิ่งไฟเออร์ ทำเงินสูงสุด 865 ล้าน'], ['ภาคล่าสุดขึ้นจอเร็วสุด', 'แค่ปีครึ่งหลังหนังสือออก ภาคแรกใช้เกือบ 4 ปี']],
  src: 'ที่มา: School Library Journal · Britannica · The Numbers · Box Office Mojo · ClutchPoints', factFoot: 'ภาพจำลอง 3D ไม่ใช่ภาพจากภาพยนตร์',
};
const BEATS = [['cover', 2.2]];
const BL = {
  a: [5.2, 5.0, 5.2, 4.8, 5.4, 4.6, 5.0, 5.2, 5.2, 5.0, 5.2, 5.0, 5.0, 5.0, 5.4, 5.2, 5.0, 5.0, 4.8, 5.0, 5.4, 5.2],
  b: [5.2, 5.0, 5.0, 4.8, 5.2, 5.2, 4.8, 5.4, 5.2, 4.8, 5.2, 4.8, 5.4, 5.0, 5.0, 5.2, 4.8, 5.0, 5.0, 5.2, 4.8, 5.2],
  c: [5.0, 4.8, 4.6, 5.2, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.2, 5.2, 4.8, 5.0, 4.8, 5.0, 4.8, 5.0, 5.2, 4.8, 5.0, 5.2],
  d: [5.2, 5.4, 5.0, 4.6, 4.8, 5.0, 5.4, 5.2, 4.6, 5.0, 4.6, 5.2, 5.0, 4.8, 5.0, 5.0, 4.8, 5.2],
  e: [5.2, 5.2, 4.8, 4.6, 5.2, 5.0, 5.0, 4.8, 4.6, 4.8, 4.8, 4.6, 5.4],
  f: [5.0, 5.0, 5.0, 5.0, 4.6, 5.0, 4.8, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.2, 5.4, 4.6, 5.0, 5.2, 5.0, 5.0],
};
const pushB = (id, d) => BEATS.push([id, d]);
/* release order: HG 2012 → CF 2013 → MJ1 2014 → MJ2 2015 → Ballad 2023 → Sunrise 2026 (chapter keys a..f stay tied to the story-order films) */
[...'cdefab'].forEach((k) => { pushB('p' + ('abcdef'.indexOf(k) + 1), 3.8); if (k === 'c') pushB('c0', 5.6); BL[k].forEach((d, i) => pushB(k + (i + 1), d)); });
BEATS.push(['fin', 6.0], ['facts', 9.6], ['next', 3.6], ['end', 1.6]);
const CAP = {
  p1: ['ภาคพรีเควล {The Ballad of Songbirds & Snakes}', 'ย้อนไป<เกมปีที่ 10> 64 ปีก่อนแคทนิส'],
  /* ---- ภาค 1 ปักษาขับขาน (2023) · เกมปีที่ 10 ---- */
  a1: ['ประเทศ{พาเน็ม} แคปิตอลเพิ่งชนะสงครามกบฏ', 'ลงโทษ 12 เขตด้วย <เกมล่าเกม>'],
  a2: ['ตอนนั้นเกมยังเป็นแค่{การลงโทษ}', 'จับเด็ก 24 คน <ปล่อยฆ่ากันในสนามเก่า>'],
  a3: ['ไม่มีใครอยากดู', 'เลยให้{นักเรียนแคปิตอล} มาเป็น<พี่เลี้ยง>'],
  a4: ['{คอริโอเลนัส สโนว์} อายุ 18 <ใช่ สโนว์คนนั้น!>', 'ตระกูลดังแต่ <จนจนต้องกินซุปกะหล่ำ>'],
  a5: ['รางวัลพี่เลี้ยงผู้ชนะคือ{ทุนเรียน}', 'สโนว์ต้องได้ <เพื่อกู้หน้าตระกูล>'],
  a6: ['เขาได้เด็กสาวจาก{เขต 12} เขตที่จนที่สุด', '{ลูซี่ เกรย์} <หย่อนงูใส่ชุดลูกสาวนายกเทศมนตรี!>'],
  a7: ['แล้ว<ร้องเพลง>กลางลานจับฉลาก', 'ทั้งประเทศ{ตะลึง}'],
  a8: ['บรรณาการถูกขัง{ในกรงสวนสัตว์}', 'สโนว์แอบเอา<อาหาร>ไปให้ เธอเริ่มไว้ใจ'],
  a9: ['วันก่อนเกม พาบรรณาการดู{สนามประลอง}', '<ตู้ม!!> กบฏวางระเบิด!'],
  a10: ['ลูซี่ เกรย์<ช่วยสโนว์จากซากที่ถล่ม>', 'คืนนั้นสโนว์แอบให้{ยาเบื่อหนู}เธอไว้'],
  a11: ['เพื่อนซี้ {เซจานัส} ลูกเศรษฐีจากเขต 2', 'เกลียดเกมนี้ <แอบบุกลงไปในสนาม!>'],
  a12: ['สโนว์ถูกสั่งไปพาตัวกลับ', 'บรรณาการพุ่งใส่ สโนว์<ฆ่าคนครั้งแรก>'],
  a13: ['เกมเริ่ม ลูซี่ เกรย์ผสม{ยาเบื่อหนู}ใส่น้ำ', 'แต่<เพื่อนที่ใจดีที่สุด ดื่มผิดขวด>'],
  a14: ['ผู้คุมเกม{ดร.กอล} โกรธเรื่องระเบิด', 'ปล่อย<งูกลายพันธุ์> ให้กัดทุกคนที่เหลือ!'],
  a15: ['สโนว์แอบหย่อน{ผ้าเช็ดหน้าที่มีกลิ่นเธอ}ลงตู้งู', 'งูจำกลิ่นได้ <ไม่กัดเธอเลย!> ลูซี่ เกรย์ชนะ'],
  a16: ['แต่คณบดี{ไฮบอตทอม} จับได้ว่าโกง', 'สโนว์ถูกส่งไปเป็น<ทหารที่เขต 12>'],
  a17: ['เซจานัสตามไปด้วย แล้ว{เข้าร่วมกบฏ}', 'สโนว์<แอบอัดเสียงแผนของเพื่อน>'],
  a18: ['ปะทะกันกลางดึก สโนว์<ยิงเมย์แฟร์>', 'ลูกสาวนายกฯ ศัตรูของลูซี่ เกรย์'],
  a19: ['เสียงที่อัดไว้ส่งถึงแคปิตอล', '{เซจานัส}<ถูกประหารที่ต้นไม้แขวนคอ>'],
  a20: ['สโนว์พาลูซี่ เกรย์หนีเข้าป่า', 'แต่เธอเจอ<ปืนที่ใช้ฆ่าเมย์แฟร์>'],
  a21: ['ลูซี่ เกรย์รู้ทัน แล้ว{หายเข้าป่า}', 'สโนว์โดนงูกัด <ยิงกราดตามเสียงเพลง!>'],
  a22: ['ไม่เหลือพยาน เขาได้{ทุนเรียน}', 'แล้ว<วางยาไฮบอตทอม> เริ่มไต่สู่อำนาจ'],
  p2: ['{Sunrise on the Reaping}', '<เกมปีที่ 50> 40 ปีต่อมา'],
  /* ---- ภาค 2 Sunrise on the Reaping (2026) · เกมปีที่ 50 ---- */
  b1: ['สโนว์ขึ้นเป็น{ประธานาธิบดี}แล้ว', 'เกมปีที่ 50 <ส่งเด็กเพิ่มเป็น 2 เท่า 48 คน!>'],
  b2: ['{เฮย์มิทช์} อายุ 16 วันจับฉลากตรงวันเกิด', 'ซื้อ{ลูกอม}ไปให้แฟน <ลีนอร์ โดฟ>'],
  b3: ['ลีนอร์ฝันว่าสักวัน <จะไม่มีวันจับฉลากอีก>', 'เฮย์มิทช์หัวเราะ {ไม่มีทางหรอก}'],
  b4: ['ชื่อเขาไม่ถูกจับ รอดแล้ว!', 'แต่เด็กอีกคน<วิ่งหนี ถูกยิงตาย>'],
  b5: ['ทหารทำร้ายลีนอร์ เฮย์มิทช์<ต่อยสวน!>', 'เลยถูกจับ<ส่งไปแทนที่ว่าง>'],
  b6: ['ที่แคปิตอล ขบวนพาเหรดผู้เข้าแข่งขัน', '<พลุยิงใส่รถ> {ลูเอลลา}เพื่อนร่วมเขตเสียชีวิต'],
  b7: ['เฮย์มิทช์อุ้มร่างเพื่อน', '<ไปวางหน้าบ้านสโนว์> ถูกจับทันที'],
  b8: ['สโนว์ขู่ <ไม่เชื่อฟัง ตายอย่างทรมาน>', 'แล้วส่ง{คนหน้าเหมือนลูเอลลา}มา ปิดข่าวว่าเธอตาย'],
  b9: ['เฮย์มิทช์จับกลุ่มกับ{เมย์ซิลี} สาวปากร้าย', 'และ{แอมเพิร์ต} ลูกชายอัจฉริยะของบีที'],
  b10: ['คืนก่อนเกม {บีที}กระซิบแผน', '<เจาะระบบควบคุมสนาม!>'],
  b11: ['เกมเริ่ม <ตายทันที 18 คน>', 'สนามสวยราวสวรรค์ แต่{น้ำและผลไม้มีพิษหมด}'],
  b12: ['ลูลู่<สูดกลิ่นดอกไม้พิษ>', 'สิ้นใจในอ้อมแขนเฮย์มิทช์'],
  b13: ['แผนคือ{ปล่อยน้ำท่วมสมองกลของสนาม}', 'แต่แอมเพิร์ต<ถูกฝูงกระรอกกลายพันธุ์รุม>'],
  b14: ['เฮย์มิทช์ทำต่อคนเดียว…', '<ภูเขาไฟระเบิด!> บรรณาการตายอีกหลายคน'],
  b15: ['ที่ขอบสนามมี{สนามพลังล่องหน}', 'ขว้างอะไรใส่ <มันดีดกลับทันที!>'],
  b16: ['เมย์ซิลีโกรธที่เขาปิดบัง <แยกทางกัน>', 'แล้ว{ฝูงนกสีชมพู}โฉบลงใส่เธอ'],
  b17: ['เหลือ 2 คน เฮย์มิทช์ ปะทะ {ซิลก้า}', 'เธอ<ขว้างขวาน> เขาก้มหลบ…'],
  b18: ['ขวานชนสนามพลัง <ดีดกลับใส่เจ้าของ!>', '{เฮย์มิทช์ชนะ} ด้วยกฎของสนามเอง'],
  b19: ['แต่สโนว์ไม่เคยลืม…', 'บ้านเฮย์มิทช์<ถูกเผา แม่กับน้องตาย>'],
  b20: ['เจอลีนอร์ เธอขอบคุณ{ลูกอม}ที่ส่งมา', 'แต่ลูกอมถุงนั้นมาจากสโนว์ <มีพิษ!>'],
  b21: ['ลีนอร์<สิ้นใจในอ้อมแขน>', 'เฮย์มิทช์อยู่คนเดียว <จมกับขวดเหล้า>'],
  b22: ['{พลูทาร์ค}กระซิบ รอคนที่ใช่', '24 ปีต่อมา <คนนั้นก็มาถึง…>'],
  p3: ['{The Hunger Games} (2012)', 'ภาคแรก <เกมปีที่ 74>'],
  c0: ['ประเทศ{พาเน็ม} ทุกปีแต่ละเขตต้องจับฉลาก{เด็ก ชาย 1 หญิง 1}', 'ส่ง 24 คน <ฆ่ากันจนเหลือคนเดียว> ถ่ายทอดสดทั้งประเทศ'],
  /* ---- ภาค 3 เกมล่าเกม (2012) · เกมปีที่ 74 ---- */
  c1: ['เขต 12 {แคทนิส} อายุ 16', 'แอบล่าสัตว์นอกรั้วด้วย<ธนู> กับเพื่อนซี้{เกล}'],
  c2: ['วันจับฉลาก ชื่อที่ถูกจับคือ…', '{พริม} <น้องสาว 12 ขวบของเธอ!>'],
  c3: ['แคทนิสวิ่งออกไป', '<ฉันอาสา!>'],
  c4: ['ผู้ชายคือ{พีต้า} ลูกคนทำขนมปัง', 'เคย<โยนขนมปังช่วย>ตอนแคทนิสหิวจะตาย'],
  c5: ['พี่เลี้ยงคือ{เฮย์มิทช์} ขี้เมาไม่เอาไหน', 'เคยชนะเกมปีที่ 50 <เรื่องของเขาอยู่ภาคล่าสุด>'],
  c6: ['เปิดตัวบนรถม้า <ลุกเป็นไฟ!>', 'ฉายา{สาวผู้ลุกเป็นไฟ}'],
  c7: ['สัมภาษณ์ออกทีวี พีต้าสารภาพ', '<ผมแอบชอบเธอมานานแล้ว>'],
  c8: ['เกมเริ่ม <นองเลือดที่จุดเริ่ม>', 'แคทนิสคว้าเป้แล้ว{วิ่งเข้าป่า}'],
  c9: ['ผู้คุมเกมว่าน่าเบื่อ <ปล่อยไฟป่า!>', 'ลูกไฟพุ่งไล่แคทนิส'],
  c10: ['พวกตัวเก่งไล่ล่าจน<หนีขึ้นต้นไม้>', 'และพีต้า… {เข้ากลุ่มกับพวกนั้น?}'],
  c11: ['เด็กหญิง{รู} ชี้รัง<ต่อแตนพิษ>', 'แคทนิสเลื่อยกิ่ง <รังร่วงใส่ศัตรู!>'],
  c12: ['พีต้าตะโกน<หนีไป!> แล้วโดนฟัน', 'เขาไม่ได้หักหลัง {เขาช่วยเธอ}'],
  c13: ['แคทนิสกับรู{เป็นพันธมิตร}', '<ระเบิดกองเสบียง>ของพวกตัวเก่ง!'],
  c14: ['แต่รูโดน<หอกพุ่งใส่>', 'แคทนิสร้องเพลง <โปรยดอกไม้ให้เธอ>'],
  c15: ['เขต 11 บ้านของรู <ลุกฮือ!>', 'ประกายแรกของ{กบฏ}'],
  c16: ['ประกาศกฎใหม่ <ชนะได้ 2 คน ถ้าเขตเดียวกัน!>', 'แคทนิส{ออกตามหาพีต้า}'],
  c17: ['เจอพีต้าพรางตัวเป็น{ก้อนหินริมลำธาร}', 'แผลติดเชื้อหนัก <ต้องได้ยา>'],
  c18: ['บุกไปเอายาที่{กองเสบียงกลางสนาม}', 'ถูกล็อกคอ แต่{ธรีช}ช่วยไว้ <เพราะเธอดีกับรู>'],
  c19: ['<หมาป่ากลายพันธุ์>ไล่ขึ้น{เขาทองคำ}', 'เคโต้ล็อกคอพีต้า แคทนิส<ยิงมือมัน!>'],
  c20: ['เหลือ 2 คน แต่<ประกาศยกเลิกกฎ!>', 'ต้องฆ่ากันเอง…'],
  c21: ['แคทนิสหยิบ{ผลเบอร์รี่พิษ}', '<กินพร้อมกัน ไม่มีผู้ชนะ!>'],
  c22: ['หยุด!! ประกาศ<ชนะทั้งคู่>', 'แต่สโนว์มองด้วย{สายตาที่ไม่ชอบใจเลย}'],
  p4: ['{Catching Fire} (2013)', '<เกมปีที่ 75>'],
  /* ---- ภาค 4 แคชชิ่งไฟเออร์ (2013) · เกมปีที่ 75 ---- */
  d1: ['สโนว์มาถึงบ้านแคทนิสเอง', 'สั่งให้<ทั้งประเทศเชื่อว่าเพราะรัก ไม่ใช่กบฏ>'],
  d2: ['ทัวร์ผู้ชนะที่เขต 11 ชายแก่<ชูมือให้แคทนิส>', 'ทหารลากตัวไป <ยิงทิ้งกลางลาน!>'],
  d3: ['พีต้าแก้เกม <ขอแคทนิสแต่งงาน>ออกทีวี', 'แต่สโนว์{ไม่เชื่อสักนิด}'],
  d4: ['เกมปีที่ 75 กฎพิเศษ', '<ส่งผู้ชนะเก่ากลับลงสนาม!>'],
  d5: ['เขต 12 มีผู้ชนะหญิงคนเดียว', '<แคทนิสต้องกลับไปอีกครั้ง>'],
  d6: ['ฝ่ายชาย จับได้{เฮย์มิทช์}', 'แต่พีต้า<อาสาแทน> เพื่อปกป้องแคทนิส'],
  d7: ['คู่แข่งระดับตำนาน {ฟินนิก} หนุ่มเขต 4', 'พันธมิตรใหม่ {โจฮันนา} และ<บีที อัจฉริยะเขต 3>'],
  d8: ['สนามเป็น{เกาะกลางทะเลสาบ}', 'พีต้า<ชนสนามพลัง หัวใจหยุดเต้น!>'],
  d9: ['ฟินนิก<ปั๊มหัวใจช่วย>ทัน', 'แคทนิส{เริ่มไว้ใจเขา}'],
  d10: ['<หมอกพิษ>ไล่ล่า แตะแล้วผิวไหม้', 'ฟินนิกแบกเพื่อนวิ่งหนี'],
  d11: ['ฝูง<ลิงกลายพันธุ์>บุกจากต้นไม้!', 'สู้กันชุลมุน'],
  d12: ['ความลับคือ <สนามเป็นนาฬิกา>', 'ทุกชั่วโมง{ภัยใหม่โผล่ทีละช่อง}'],
  d13: ['บีทีวางแผน <ล่อฟ้าผ่าลงทะเลสาบ>', 'ด้วย{ลวดขดยาว}'],
  d14: ['แต่ลวดถูกตัดขาด', 'แคทนิสผูกลวดกับ<ลูกธนู> เล็งขึ้นฟ้า…'],
  d15: ['<ตู้มมม!!> ฟ้าผ่าทะลุโดม', '{สนามพลังแตกเป็นเสี่ยง!}'],
  d16: ['แคทนิสสลบ <ยานลำใหญ่ยกตัวขึ้นไป>', 'ตื่นมาเจอ{พลูทาร์ค} หัวหน้าผู้คุมเกม'],
  d17: ['เขาคือ<สายลับฝ่ายกบฏ>!', 'ภารกิจคือ{ช่วยแคทนิส}มาตั้งแต่แรก'],
  d18: ['แต่พีต้า<ถูกแคปิตอลจับตัวไป>', 'และ{เขต 12 ถูกถล่มจนราบ}'],
  p5: ['{Mockingjay Part 1} (2014)', '<สงครามเริ่มแล้ว>'],
  /* ---- ภาค 5 ม็อกกิ้งเจย์ 1 (2014) ---- */
  e1: ['ใต้ดินมี{เขต 13} ที่ทุกคนคิดว่าไม่มีแล้ว', 'ผู้นำคือ{ประธานาธิบดีคอยน์}'],
  e2: ['คอยน์อยากให้แคทนิสเป็น<สัญลักษณ์กบฏ>', 'ถ่ายคลิปปลุกใจในสตูดิโอ แต่<แข็งสุดๆ>'],
  e3: ['เฮย์มิทช์บอก ปล่อยเธอเป็นตัวเอง', 'พาไปถ่าย{ในสนามรบจริง}'],
  e4: ['เยี่ยมโรงพยาบาลเขต 8', '<เครื่องบินแคปิตอลทิ้งระเบิด!>'],
  e5: ['แคทนิส<ยิงธนูระเบิดสอยเครื่องบินร่วง!>', 'ถ้าเราลุกเป็นไฟ {คุณก็ต้องไหม้ไปด้วย}'],
  e6: ['กลับไปเขต 12 เหลือแต่<ซากและเถ้าถ่าน>', 'แคทนิสร้องเพลงริมทะเลสาบ {นกทั้งป่าร้องตาม}'],
  e7: ['ฝั่งแคปิตอล พีต้าออกทีวี', '<ขอให้กบฏหยุดยิง> ดูผอมลงทุกวัน'],
  e8: ['คนงานเขต 5 <บุกระเบิดเขื่อน>', 'แคปิตอล{ไฟดับทั้งเมือง}'],
  e9: ['พีต้าแอบเตือนกลางรายการ', '<เขต 13 จะโดนถล่ม!>'],
  e10: ['ทุกคนหนีลงหลุมหลบภัยลึก', '<ระเบิดถล่มทั้งคืน> แต่รอดเพราะคำเตือน'],
  e11: ['ทีมกบฏ<แอบบุกช่วยพีต้า>', 'สำเร็จ! {พากลับมาได้}'],
  e12: ['แคทนิสวิ่งไปหา…', 'พีต้า<พุ่งเข้าบีบคอเธอ!>'],
  e13: ['เขาถูก<ล้างสมอง> ให้เกลียดแคทนิส', 'กบฏตัดสินใจ {บุกแคปิตอล}'],
  p6: ['{Mockingjay Part 2} (2015)', '<ศึกสุดท้าย>'],
  /* ---- ภาค 6 ม็อกกิ้งเจย์ 2 (2015) ---- */
  f1: ['บุก{เขต 2} ฐานทัพในภูเขา', 'เกลวางแผน <ระเบิดภูเขาถล่ม!>'],
  f2: ['แคทนิส<ถูกยิง แต่รอด>', 'ทุกเขต{รวมใจบุกแคปิตอล}'],
  f3: ['แคปิตอลฝัง<กับดักไว้ทั้งเมือง>', 'เหมือน{เกมล่าเกมครั้งสุดท้าย}'],
  f4: ['แคทนิสอยู่{หน่วยถ่ายทำแนวหน้า}', 'พีต้ายังไม่หายดี <แต่ถูกส่งมาด้วย>'],
  f5: ['กับดักแรก <ปืนกลโผล่จากพื้น!>', 'หลบกันวุ่น'],
  f6: ['กับดักที่สอง <คลื่นน้ำมันดำท่วมถนน!>', 'ทุกคน{วิ่งขึ้นตึก}'],
  f7: ['แคทนิส<แยกจากทีม>', 'ตั้งใจไป{จบสโนว์ด้วยตัวเอง}'],
  f8: ['ลัดทาง{ท่อระบายน้ำใต้ดิน}', 'แต่<ฝูงกลายพันธุ์>ไล่ตามมา!'],
  f9: ['ฟินนิก<สู้ถ่วงเวลาให้เพื่อน>', '…เขาไม่ได้ขึ้นมาอีกเลย'],
  f10: ['ข้างบน พีต้าเกือบคลั่งอีกครั้ง', 'แคทนิส{จับมือ ช่วยแยกความจริงทีละเรื่อง}'],
  f11: ['ชาวแคปิตอลหนีมา{หน้าคฤหาสน์สโนว์}', 'มีเด็กๆ <ถูกใช้เป็นโล่มนุษย์>'],
  f12: ['ยานลำหนึ่งทิ้ง<ร่มชูชีพ>ลงกลางเด็กๆ', 'หน่วยแพทย์วิ่งเข้าไปช่วย… รวมถึง{พริม}'],
  f13: ['<ตู้ม!!> ร่มชุดที่สองระเบิด', '{พริมจากไป…}'],
  f14: ['สงครามจบ สโนว์ถูกจับ', 'เขาบอกแคทนิส <ระเบิดนั่นไม่ใช่ของผม>'],
  f15: ['คนสั่งคือ{คอยน์} อยากชนะไวๆ', 'แถม<จะจัดเกมล่าเกมอีก ให้เด็กแคปิตอล!>'],
  f16: ['วันประหาร แคทนิสเล็งธนูไปที่สโนว์…', ''],
  f17: ['แล้ว<หันลูกธนูยิงคอยน์!>', 'หยุดคนที่จะเป็น{สโนว์คนใหม่}'],
  f18: ['สโนว์หัวเราะ ฝูงชน<กรูเข้าใส่>', 'จบชายผู้{คุมเกมมา 40 ปี}'],
  f19: ['แคทนิสกลับบ้านเขต 12', 'พีต้ากลับมา <ปลูกดอกไม้ให้พริม>'],
  f20: ['หลายปีต่อมา ที่ทุ่งหญ้าเดิม', 'มี{ลูกน้อย 2 คน} <ไม่ต้องกลัววันจับฉลากอีก>'],
  fin: ['เด็กสาวที่อาสาแทนน้องในภาคแรก', '<คือคนที่เฮย์มิทช์รอมา 24 ปี>'],
  next: ['ติดตามสรุปหนังเรื่องต่อไป', 'ที่ {RuNgee รู้งี้}'],
};
CAP.f16[1] = 'ทั้งประเทศรอดูนาทีนี้';
EP.facts[2][1] = 'ไม่ถึง 2 ปีหลังหนังสือออก ภาคแรกใช้เกือบ 4 ปี';
const STN = ['PANEM', 'REAP', 'HOME', 'ACAD', 'ZOO', 'AR10', 'D12', 'WOODS', 'HANG', 'CAPN',
  'SEAM', 'CAPST', 'SNOWH', 'TRAIN', 'AR50', 'EDGE', 'MEADOW', 'STAGE',
  'AR74', 'CORN', 'CREEK', 'D11', 'CLOCK', 'JUNGLE', 'HOVER',
  'D13', 'D8', 'RUIN12', 'DAM', 'MTN', 'SEWER', 'PLAZA', 'TITLE'];
const ST = {}; STN.forEach((k, i) => (ST[k] = [i * 200, 0, 0]));
const ENV = {
  PANEM: [['field', { g1: '#8a9a6a', g2: '#5a6a4a', seed: 201, city: -34 }], ['deco', { items: [['house', 1.0, '#8a7a62', -5.6, 0, -2.6, 0.4], ['house', 0.9, '#7a6a52', 5.4, 0, -3.0, -0.3]] }]],
  REAP: [['village', {}], ['deco', { items: [['podium', 1.0, null, 0, 0, -3.0], ['bowlG', 1.0, null, -1.6, 0, -3.2], ['bowlG', 1.0, null, 1.6, 0, -3.2], ['screens', 1.4, '#9ad8ff', 0, 1.6, -5.0]] }]],
  HOME: [['room', { floor: '#5a4a3a', wall: '#7a6a5a', side: '#6a5a4a', lamps: [-3, 3], windows: true }], ['deco', { items: [['table', 1.2, '#6a4a32', 0.4, 0, -2.4], ['sofa', 0.9, '#6a5a7a', -4.4, 0, -4.8]] }]],
  ACAD: [['hall', { floor: '#d8d0c0', wall: '#a8a0b0', carpet: '#5a3a6a', pillar: '#e8e4dc', throne: false }], ['deco', { items: [['podium', 1.0, null, 0, 0, -4.2]] }]],
  ZOO: [['street', { seed: 43 }], ['deco', { items: [['cage', 2.4, null, -3.0, 0, -3.4], ['cage', 2.4, null, 0.4, 0, -3.8], ['cage', 2.4, null, 3.8, 0, -3.4]] }]],
  AR10: [['field', { g1: '#8a8270', g2: '#5a5448', seed: 117, r1: '#5a5a5e' }], ['deco', { items: [['ruin', 1.3, null, -5, 0, -5], ['pillar', 1.0, '#b8b0a0', -3.4, 0, -6.4], ['pillar', 1.0, '#b8b0a0', 3.4, 0, -6.6], ['ruin', 1.0, null, 5.6, 0, -4.2], ['stone', 2.4, null, 2.0, 0, -2.4]] }]],
  D12: [['village', {}], ['deco', { items: [['crates', 1.0, null, 4.6, 0, -1.6], ['barrel', 1.0, null, -4.2, 0, -1.2]] }]],
  WOODS: [['forest', { g1: '#3a6a3a', g2: '#1e3a26', trees: 26, seed: 213, river: [-5.4, 3], hut: [4.6, -3.4] }]],
  HANG: [['field', { g1: '#4a5a3a', g2: '#2a3a26', seed: 215 }], ['deco', { items: [['tree', 3.0, '#3a4a2a', 0.6, 0, -3.4]] }]],
  CAPN: [['roof', {}]],
  SEAM: [['village', {}], ['deco', { items: [['house', 1.2, '#9a7c58', -0.6, 0, -2.8], ['tree', 1.6, null, 4.6, 0, -3.2]] }]],
  CAPST: [['street', { seed: 45 }], ['deco', { items: [['bldg', 1.0, 6, -9, 24, -14], ['bldg', 1.0, 7, 9, 24, -15], ['bldg', 1.0, 6, 0, 24, -22]] }]],
  SNOWH: [['hall', { floor: '#f0ece4', wall: '#e8e2d8', carpet: '#b02a3a', pillar: '#f4f0e8', throne: false }], ['deco', { items: [['rose', 6.0, null, -4.6, 1.2, -6.4], ['rose', 6.0, null, 4.6, 1.2, -6.4]] }]],
  TRAIN: [['room', { floor: '#3a3e48', wall: '#2a2e38', side: '#323640', lamps: [-4, 0, 4], lampC: 'rgba(200,230,255,1)' }], ['deco', { items: [['table', 1.2, '#5a5e68', 3.6, 0, -3.6]] }]],
  AR50: [['field', { g1: '#8ad060', g2: '#5aa048', seed: 221, r1: '#6a8aa0' }], ['deco', { items: [['volcano', 1.6, null, 14, 0, -48], ['tree', 1.8, '#5aa84a', -5.4, 0, -4.0], ['tree', 1.6, '#4a9a42', 5.6, 0, -4.6], ['horn', 0.7, null, -1.0, 0, -9.0, Math.PI / 2]] }]],
  EDGE: [['field', { g1: '#7ab050', g2: '#4a8040', seed: 223, r1: '#5a7a8a' }], ['deco', { items: [['ffwall', 1.0, null, 0, 0, -4.6], ['tree', 1.5, '#4a9a42', -6, 0, -2.6]] }]],
  MEADOW: [['field', { g1: '#9ad060', g2: '#6aa848', seed: 225, r1: '#6a9aa0' }], ['deco', { items: [['tree', 2.0, '#5aa84a', -5.2, 0, -4.6], ['tree', 1.7, '#4a9a42', 5.4, 0, -5.2]] }]],
  STAGE: [['room', { floor: '#1a1a2a', wall: '#2a1a3a', side: '#22182e', lamps: [-4, 0, 4], lampC: 'rgba(255,200,240,1)', city: true }], ['deco', { items: [['sofa', 0.8, '#c8b0e0', 1.6, 0, -3.6], ['screens', 1.6, '#ff9ad8', 0, 1.8, -6.0]] }]],
  AR74: [['forest', { g1: '#4a7a3a', g2: '#2a4a2a', trees: 26, seed: 231 }]],
  CORN: [['field', { g1: '#7a9a50', g2: '#4a6a3a', seed: 233 }], ['deco', { items: [['horn', 1.1, null, 0.4, 0, -5.4, Math.PI / 2], ['crates', 0.9, null, -3.6, 0, -2.4], ['crates', 0.8, null, 3.8, 0, -2.6]] }]],
  CREEK: [['forest', { g1: '#4a7a3a', g2: '#2a4a2a', trees: 22, seed: 235, river: [-1.2, 2.2] }], ['deco', { items: [['stone', 1.6, null, -3.2, 0, -3.2], ['stone', 1.2, null, 3.8, 0, -3.6]] }]],
  D11: [['field', { g1: '#c8b060', g2: '#9a8040', seed: 237, r1: '#7a6a4a' }], ['deco', { items: [['podium', 1.0, null, 0, 0, -3.2], ['screens', 1.4, '#ffd890', 0, 1.6, -5.4]] }]],
  CLOCK: [['ocean', {}], ['deco', { items: [['stone', 3.0, null, 0, 0, -2.0], ['tree', 2.6, '#3a6a3a', 0.6, 0, -6.4], ['dome', 2.6, '#8ad8ff', 0, 0, -6]] }]],
  JUNGLE: [['forest', { g1: '#2a5a32', g2: '#163a22', trees: 30, seed: 241 }]],
  HOVER: [['room', { floor: '#2a2e36', wall: '#3a404a', side: '#343a44', lamps: [-3, 3], lampC: 'rgba(180,220,255,1)', windows: true }], ['deco', { items: [['cot', 1.0, null, -1.6, 0, -2.2], ['table', 1.0, '#5a5e68', 3.2, 0, -3.4]] }]],
  D13: [['room', { floor: '#4a4e56', wall: '#5a5e66', side: '#50545c', lamps: [-4, 0, 4], lampC: 'rgba(240,250,255,1)' }], ['deco', { items: [['screens', 1.6, '#9ad8ff', 0, 1.6, -6.0], ['table', 1.6, '#3a3e46', 0, 0, -2.8]] }]],
  D8: [['village', {}], ['deco', { items: [['tentD', 0.9, '#e8e4dc', 0.2, 0, -4.2], ['cot', 0.8, null, -2.6, 0, -1.8], ['cot', 0.8, null, 2.8, 0, -2.0]] }]],
  RUIN12: [['field', { g1: '#4a4440', g2: '#2a2622', seed: 243, r1: '#3a3a3e' }], ['deco', { items: [['ruin', 1.4, null, -5, 0, -4], ['ruin', 1.1, null, 4.6, 0, -5.2], ['ruin', 0.9, null, 0.4, 0, -7.4]] }]],
  DAM: [['field', { g1: '#6a7a5a', g2: '#3a4a3a', seed: 245 }], ['deco', { items: [['wallC', 1.4, '#9a9690', 0, 0, -7.0]] }]],
  MTN: [['field', { g1: '#6a6a5a', g2: '#4a4a3e', seed: 247 }], ['deco', { items: [['peak', 1.6, '#6a6a72', 0, 0, -26]] }]],
  SEWER: [['room', { floor: '#2a2e2a', wall: '#1e221e', side: '#202420', lamps: [-4, 4], lampC: 'rgba(160,255,200,1)', rocks: true }], ['deco', { items: [['pool', 1.0, '#1a2a22', 0, 0, -1.2]] }]],
  PLAZA: [['street', { seed: 47 }], ['deco', { items: [['pillar', 1.0, '#f0ece4', -4.6, 0, -6.4], ['pillar', 1.0, '#f0ece4', 4.6, 0, -6.4], ['pillar', 1.0, '#f0ece4', -1.6, 0, -7.0], ['pillar', 1.0, '#f0ece4', 1.6, 0, -7.0]] }]],
  TITLE: [['room', { floor: '#1a1a26', wall: '#14142a', side: '#16162a', lamps: [-4, 0, 4], lampC: 'rgba(255,220,160,1)' }]],
};
const CAST = {
  snowY: ['snowY', 1.0], snow: ['snow', 1.0], lucy: ['lucy', 1.0], sejanus: ['sejanus', 1.0], gaul: ['gaul', 1.0], high: ['high', 1.0], mayfair: ['mayfair', 1.0],
  haymY: ['haymY', 1.0], haym: ['haym', 1.0], lenore: ['lenore', 1.0], may: ['may', 1.0], ampert: ['ampert', 1.0], beetee: ['beetee', 1.0], louella: ['louella', 1.0], loulou: ['louella', 1.0], silka: ['silka', 1.0], plut: ['plut', 1.0], sid: ['sid', 1.0], mom: ['folk', 1.0, 1],
  kat: ['kat', 1.0], katA: ['katA', 1.0], kat13: ['kat13', 1.0], prim: ['prim', 1.0], primM: ['primM', 1.0], peeta: ['peeta', 1.0], peetaA: ['peetaA', 1.0], gale: ['gale', 1.0], effie: ['effie', 1.0],
  rue: ['rue', 1.0], cato: ['cato', 1.0], thresh: ['thresh', 1.0], finn: ['finn', 1.0], joh: ['joh', 1.0], wiress: ['wiress', 1.0], coin: ['coin', 1.0], beeteeO: ['beetee', 1.0],
  c1: ['career', 1.0, 0], c2: ['career', 1.0, 1], c3: ['career', 1.0, 2], t1: ['trib', 1.0, 0], t2: ['trib', 1.0, 1], t3: ['trib', 1.0, 2], t4: ['trib', 1.0, 3], t5: ['trib', 1.0, 4], t6: ['trib', 1.0, 5], dill: ['trib', 0.9, 1],
  pk1: ['pk', 1.0, 0], pk2: ['pk', 1.0, 1], pk3: ['pk', 1.0, 2], pk4: ['pk', 1.0, 0], s1: ['soldier', 1.0, 0], s2: ['soldier', 1.0, 1], s3: ['soldier', 1.0, 2],
  f1: ['folk', 1.0, 0], f2: ['folk', 1.0, 1], f3: ['folk', 1.0, 2], f4: ['folk', 1.0, 3], f5: ['folk', 1.0, 4], f6: ['folk', 1.0, 5], oldman: ['folk', 1.0, 0],
  cap1: ['cap', 1.0, 0], cap2: ['cap', 1.0, 1], cap3: ['cap', 1.0, 2], cap4: ['cap', 1.0, 3], k1: ['kidC', 1.0, 0], k2: ['kidC', 1.0, 1], k3: ['kidC', 1.0, 2], bb1: ['baby', 1.0, 0], bb2: ['baby', 1.0, 1],
  /* creatures (plain animals, light) */
  sn1: ['serpent', 0.5, '#e0503a', 12], sn2: ['serpent', 0.5, '#3ab0e0', 12], sn3: ['serpent', 0.5, '#e0c03a', 12], sn4: ['serpent', 0.5, '#8a4ad0', 12], snK: ['serpent', 0.45, '#5aa84a', 10],
  wasp: ['mist', 0.9, '#e8c020'], wolf1: ['wolf', 1.3, '#3a3a40'], wolf2: ['wolf', 1.2, '#4a4a52'], wolf3: ['wolf', 1.25, '#3a3a40'], mut1: ['wolf', 1.1, '#d8d8c8'], mut2: ['wolf', 1.0, '#c8c8b8'], mut3: ['wolf', 1.15, '#d8d8c8'],
  mk1: ['dog', 0.8, { c: '#a8783a', w: '#d8b888', e: '#6a4a2a', prick: true }], mk2: ['dog', 0.75, { c: '#8a5a2a', w: '#c89868', e: '#5a3a1a', prick: true }], mk3: ['dog', 0.8, { c: '#a8783a', w: '#d8b888', e: '#6a4a2a', prick: true }],
  sq1: ['rabbit', 0.7, '#a8703a'], sq2: ['rabbit', 0.65, '#986030'], sq3: ['rabbit', 0.7, '#a8703a'], pb1: ['bird', 2.4, '#ff7ab8'], pb2: ['bird', 2.2, '#ff8ac4'], pb3: ['bird', 2.4, '#ff6aa8'], bird1: ['bird', 2.2, '#3a3e48'], bird2: ['bird', 2.0, '#4a4e58'], bird3: ['bird', 2.2, '#3a3e48'],
  fog: ['mist', 0.9, '#d8e8b0'], goose: ['bird', 3.0, '#f4f4f0'],
  /* fx */
  boom: ['boom', 1.2], boom2: ['boom', 2.0], boom3: ['boom', 3.2], puff: ['puff', 1.0], puff2: ['puff', 1.6], flashW: ['glow', 2.6, 'rgba(255,255,255,1)'], fire: ['fire', 1.2], fire2: ['fire', 1.8], flames: ['flames', 0.6], flames2: ['flames', 0.9],
  fb1: ['streak', 1.4, 'rgba(255,140,60,1)'], fb2: ['streak', 1.2, 'rgba(255,170,80,1)'], bolt: ['streak', 1.6, 'rgba(220,240,255,1)'], spark: ['glow', 0.7, 'rgba(255,240,180,1)'], gY: ['glow', 1.0, 'rgba(255,215,90,1)'], gB: ['glow', 1.4, 'rgba(120,200,255,1)'],
  gR: ['glow', 1.0, 'rgba(255,80,60,1)'], gP: ['glow', 0.9, 'rgba(200,120,255,1)'], moon: ['glow', 2.0, 'rgba(230,235,255,1)'], tr1: ['tracer', 1.0], tr2: ['tracer', 1.0], tr3: ['tracer', 1.0], trA: ['tracer', 1.0, '#fff4d0'],
  n1: ['label', 0.7, '♪'], n2: ['label', 0.6, '♫'], n3: ['label', 0.7, '♪'],
  /* props */
  bow: ['bowL', 1.0], arrowP: ['tracer', 1.0, '#e8d8b0'], spear: ['staff', 0.8, '#8a8a90'], trident: ['staff', 1.0, '#c8a040'], sword: ['blade', 0.9], axe: ['axe', 1.0], axe2: ['axe', 1.0], knife: ['knife', 1.2], club: ['staff', 0.7, '#7a5a3a'],
  rifle: ['rifle', 1.0], rifle2: ['rifle', 1.0], rifle3: ['rifle', 1.0], pistol: ['pistol', 1.2], rose: ['rose', 1.0], rose2: ['rose', 1.0], guitar: ['guitar', 1.0], bottle: ['bottle', 1.0], vial: ['bottle', 0.5, '#8a4ad0'], cup: ['cup', 1.0],
  slip: ['paper', 1.4], hanky: ['paper', 1.2], coinP: ['medal', 1.6], bread: ['burger', 1.6], gum: ['berries', 1.8], berries: ['berries', 1.4], berries2: ['berries', 1.4], rec: ['device', 1.0], wire: ['tracer', 1.0, '#e8c070'],
  cake: ['cake', 0.6], cage: ['cage', 2.2], chute1: ['chute', 1.0], chute2: ['chute', 1.0], chute3: ['chute', 1.0], nest: ['nest', 1.0], jet1: ['jet', 1.4], jet2: ['jet', 1.4], ship: ['ship', 1.2], cot: ['cot', 0.8],
  wave: ['wave2', 0.5, '#141210'], wallW: ['wavewall', 0.4, '#2a78b4'], turret: ['turret', 0.8], tank: ['case', 1.6], house: ['house', 1.5, '#8a6a4a'], hut: ['hut', 1.2], tree: ['tree', 2.2, '#3a6a3a'], flowers: ['berries', 3.0], rock: ['stone', 2.0],
  bag: ['crates', 0.4], screen: ['screens', 1.4, '#ff9ad8'], riser: ['span', 1.0, '#3a2a3a'], ffw: ['ffwall', 0.6], dome: ['dome', 2.6, '#8ad8ff'],
  lbCheat: ['label', 1.0, 'โกง!'], lbX: ['label', 1.2, '✕'], lb24: ['label', 0.5, '24 ปีต่อมา'], lb40: ['label', 1.0, '40 ปีต่อมา'],
};
/* ---- run-time helpers (shared with the LOTR / HP recap style) ---- */
const dirAt = (path, r, p) => { let q = path(r + 0.06), a = p; if (Math.hypot(q.x - a.x, q.z - a.z) < 1e-3) { a = path(r - 0.06); q = p; } return [q.x - a.x, q.y - a.y, q.z - a.z]; };
const all = (...fs) => (...a) => fs.forEach((f) => f && f(...a));
const aim = (c) => { c.userData.arms.R.rotation.set(-1.5, 0, -0.05); };
const aim2 = (c) => { c.userData.arms.R.rotation.set(-1.5, 0, -0.05); c.userData.arms.L.rotation.set(-1.4, 0, 0.3); };
const swing = (c, r, t) => { c.userData.arms.R.rotation.set(-0.3 - Math.max(0, Math.sin(t * 8)) * 1.8, 0, 0.25); };
const guard = (c) => { c.userData.arms.R.rotation.set(-1.2, 0, 0.3); c.userData.arms.L.rotation.set(-1.0, 0, 0.6); };
const punch = (c) => { c.userData.arms.R.rotation.set(-1.6, 0, -0.05); c.userData.arms.L.rotation.set(-0.6, 0, 0.6); };
const raise = (c) => { c.userData.arms.R.rotation.set(-2.8, 0, -0.1); };
const flail = (c, r, t) => { c.userData.arms.L.rotation.set(-1.6 + Math.sin(t * 14) * 0.9, 0, 0.6); c.userData.arms.R.rotation.set(-1.6 + Math.cos(t * 14) * 0.9, 0, -0.6); };
const bowP = (c) => { c.userData.arms.L.rotation.set(-1.55, 0, 0.05); c.userData.arms.R.rotation.set(-1.45, 0, -0.75); }; // bow drawn (bow in the left hand)
const choke = (c) => { c.userData.arms.L.rotation.set(-1.5, 0, 0.35); c.userData.arms.R.rotation.set(-1.5, 0, -0.35); };
const at_ = (k, f, g) => (c, r, t, a) => { const p = r >= k ? g : f; if (typeof p === 'function') p(c, r, t, a); else if (p && POSE[p]) POSE[p](c, r, t, a); };
const during = (a, b, f, g) => (c, r, t, x) => { const p = r > a && r < b ? f : g; if (typeof p === 'function') p(c, r, t, x); else if (p && POSE[p]) POSE[p](c, r, t, x); };
const hop = (o, r, t0, h) => { if (r > t0 && r < t0 + 0.5) o.position.y += Math.sin((r - t0) / 0.5 * Math.PI) * (h || 0.8); };
const qb = (st, a, b, c, t0, t1) => (u) => { const k = U.easeIO(U.clamp((u - t0) / (t1 - t0))), m = 1 - k; return H.at(st, m * m * a[0] + 2 * m * k * b[0] + k * k * c[0], m * m * a[1] + 2 * m * k * b[1] + k * k * c[1], m * m * a[2] + 2 * m * k * b[2] + k * k * c[2]); };
const lin = (st, a, c, t0, t1) => qb(st, a, [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2], c, t0, t1);
const along = (o, path, r) => { const p = path(r); o.position.copy(p); return p; };
const expr = (k, e, t0) => (r, t, s) => { if (r > t0 && s.o[k]) s.o[k].userData.setExpr(e); };
/* show object k only between t0..t1 and move it along a path; face = turn along the motion */
const flyK = (k, path, t0, t1, face) => (r, t, s, o) => { const c = o[k]; if (!c) return; c.visible = c.visible && r >= t0 && r <= t1; if (!c.visible) return; const p = path(r); if (face) { const d = dirAt(path, r, p); if (Math.hypot(d[0], d[2]) > 1e-4) c.rotation.y = Math.atan2(d[0], d[2]); } if (c.userData.trail) fly(c, path, r, 0.03); else c.position.copy(p); };
/* thrown thing: from a hand (actor key) to a target (actor key | [x,y,z]) between t0..t1 with an arc; spin = tumble */
const toss = (k, from, to, t0, t1, arc, spin) => (r, t, s, o, st) => { const c = o[k]; if (!c) return; if (r < t0 || r > t1) { c.visible = false; return; } c.visible = true; const a = H.hand(o[from], 'R'), b = typeof to === 'string' ? H.pos(o[to], 1.0) : H.at(st, to[0], to[1], to[2]); const u = U.clamp((r - t0) / (t1 - t0));
  c.position.lerpVectors(a, b, u); c.position.y += Math.sin(u * Math.PI) * (arc || 0.8); if (spin) c.rotation.x = r * spin; };
/* arrows / shots: rows [t0, shooter, target key | [x,y,z], tracer]; 0.14 s line from the shooter's hand */
const shots = (list) => (r, t, s, o, st) => { const used = {}; list.forEach(([t0, a, b, tk]) => { if (!o[a] || !o[a].visible) return; const to = typeof b === 'string' ? H.pos(o[b], 1.0) : H.at(st, b[0], b[1], b[2]);
  if (r > t0 - 0.5 && r < t0 + 0.3) face(o[a], to.x - o[a].position.x, to.z - o[a].position.z); if (r > t0 && r < t0 + 0.14) { const k = tk || 'tr1'; aimBeam(o[k], H.hand(o[a], 'R'), to, 1); used[k] = 1; } });
  ['tr1', 'tr2', 'tr3', 'trA'].forEach((k) => { if (!used[k] && o[k]) o[k].visible = false; }); };
/* music notes rising from a singer's head */
const notes = (who, t0, t1) => (r, t, s, o) => { ['n1', 'n2', 'n3'].forEach((k, i) => { const n = o[k], w = o[who]; if (!n || !w) return; const u = ((r - t0) * 0.6 + i / 3) % 1; n.visible = w.visible && r > t0 && (t1 == null || r < t1); if (!n.visible) return; const p = H.pos(w, 2.2); n.position.set(p.x + Math.sin(u * 6 + i) * 0.5 + (i - 1) * 0.5, p.y + u * 1.8, p.z); n.material && (n.material.opacity = 1 - u); }); };
/* a glow sticks to an actor's hand / head */
const glowAt = (gk, who, dy, a, b, pulse) => (r, t, s, o) => { const g = o[gk], w = o[who]; if (!g || !w || !w.visible || r < a || (b != null && r > b)) { if (g && (r < a || (b != null && r > b))) g.visible = false; return; } g.visible = true; g.position.copy(H.pos(w, dy == null ? 1.0 : dy)); g.scale.setScalar(g.userData.s0 * (1 + Math.sin(t * (pulse || 8)) * 0.15)); };
const greyOut = (k, t0, t1) => (r, t, s, o) => { const c = o[k]; if (!c || r < t0) return; const q = U.clamp((r - t0) / (t1 - t0)); c.traverse((m) => { if (m.isMesh && m.material && m.material.color && !m.userData.c0) m.userData.c0 = m.material.color.clone(); if (m.isMesh && m.userData.c0) m.material.color.copy(m.userData.c0).lerp(new T.Color('#9a9a94'), q); }); };
const drift = (k, sp) => (r, t, s, o) => { const g = o[k]; if (!g || !g.visible || !g.userData.kids) return; g.userData.kids.forEach((c, i) => { c.position.y = 0.6 + Math.sin(t * (sp || 1.6) + i) * 0.5; c.rotation.y = t * 0.6 + i; }); };
const ffFlash = (list) => (r, t, s, o) => { const w = o.ffw; if (!w || !w.userData.flash) return; let k = 0; list.forEach((t0) => { if (r > t0 && r < t0 + 0.6) k = Math.max(k, 1 - (r - t0) / 0.6); }); w.userData.flash(k); };
const HOLD = (who, side, dy, dz) => ({ on: [who, side || 'R', 0, dy || 0, dz == null ? 0.05 : dz] });
const foe = (x, z, tHit, dir, extra) => Object.assign({ p: [x, z], f: dir > 0 ? -60 : 60, ex: 'angry', pop: Math.max(0, tHit - 0.8), fall: [tHit + 0.05, tHit + 0.45], fallDir: dir > 0 ? 1 : -1, out: tHit + 0.9 }, extra);
const fig = (x, z, f, ex, extra) => Object.assign({ p: [x, z], f: f || 0, ex: ex || 'happy' }, extra);
/* explosion at x,z,y at t: boom pops and fades */
const BOOM = (x, z, y, t, d) => ({ p: [x, z, y == null ? 1.0 : y], pop: t, out: t + (d || 0.8) });
/* HUD bits */
const hudAll = (...fs) => (g, r, t, W, HH) => fs.forEach((f) => f && f(g, r, t, W, HH));
const pow = (list) => (g, r) => list.forEach(([tx, t0, x, y, col, sz]) => { const k = r - t0; if (k < 0 || k > 1.3) return; const z = (sz || 130) * (k < 0.15 ? 0.5 + k / 0.15 * 0.7 : 1.2 - Math.min(0.2, k - 0.15)); g.save(); g.translate(x, y); g.rotate(-0.08); g.globalAlpha = k > 1.0 ? 1 - (k - 1.0) / 0.3 : 1;
  g.font = '900 ' + Math.round(z) + 'px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 16; g.strokeStyle = '#2a1a10'; g.strokeText(tx, 0, 0); g.fillStyle = col || '#ffd94a'; g.fillText(tx, 0, 0); g.restore(); });
/* film title card: film no. / English title / year — at the start of each film */
const partCard = (n, sub, yr) => (g, r) => { const a = U.clamp(r / 0.3) * U.clamp((3.8 - r) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, 120, 1500, 840, 270, 46); g.fill(); g.strokeStyle = P.gold; g.lineWidth = 5; g.stroke();
  txt(g, n, 540, 1570, 62, P.gold, 800); txt(g, sub, 540, 1645, 44, '#fff', 600); txt(g, yr, 540, 1712, 40, '#9fd8ff', 600); g.restore(); };
/* survivors counter (top-right, under the chapter strip): n before tc, n2 after (bumps) */
const left = (n, n2, tc) => (g, r) => { const v = n2 != null && r >= tc ? n2 : n, p = n2 != null ? U.clamp((r - tc) / 0.5) : 1, z = 1 + (n2 != null && p < 1 ? Math.sin(p * Math.PI) * 0.3 : 0); g.save(); g.fillStyle = 'rgba(15,22,48,.88)'; rr(g, 690, 300, 330, 96, 30); g.fill(); g.strokeStyle = v <= 2 ? P.coral : P.gold; g.lineWidth = 4; g.stroke();
  txt(g, 'เหลือ', 770, 349, 34, '#fff', 700); txt(g, String(v), 870, 349, 54 * z, v <= 2 ? P.coral : P.gold, 800); txt(g, 'คน', 962, 349, 34, '#fff', 700); g.restore(); };
const tag = (tx, col) => (g, r) => { const a = U.clamp((r - 0.2) / 0.3); if (a <= 0) return; g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.88)'; g.font = F(700, 38); const w = g.measureText(tx).width + 60; rr(g, 540 - w / 2, 300, w, 76, 30); g.fill(); g.strokeStyle = col || P.teal; g.lineWidth = 4; g.stroke(); txt(g, tx, 540, 339, 38, '#fff', 700); g.restore(); };
const KIDS = (dz, keys) => { const A = {}; (keys || ['t1', 't2', 't3', 't4', 't5', 't6']).forEach((k, i) => { A[k] = fig(-3.4 + (i % 6) * 1.36, (dz || 1.0) + (i % 2) * 0.5, 180, 'worried'); }); return A; };
const SC = {
  cover: { st: 'AR74', bg: 'forest', cam: [0, -0.4, 0.9, -0.4, 3.6, 0.45, -0.6], A: { kat: fig(-0.6, 0, 40, 'angry', { pose: bowP }), bow: HOLD('kat', 'L', 0, 0.1), peeta: fig(1.4, -1.6, -20, 'worried') },
    fx: (r, t, s, o) => { o.bow.rotation.y = o.kat.rotation.y; } },
  /* =========== ภาค 1 ปักษาขับขาน · เกมปีที่ 10 =========== */
  a1: { st: 'PANEM', bg: 'war', cam: [0, 0, 1.2, -1.0, 6.4, 1.0, 0.5], shake: [1.4, 2.4, 0.12], flash: [1.4, 0.4],
    A: { pk1: fig(-1.6, 0.6, 20, 'angry', { pose: 'hips' }), pk2: fig(1.6, 0.4, -20, 'angry', { pose: 'hips' }), rifle: HOLD('pk1'), f1: fig(-3.0, -1.6, 0, 'cry', { pose: 'down', sit: true }), f2: fig(0, -2.0, 0, 'worried', { pose: 'down', sit: true }), f3: fig(3.0, -1.6, 0, 'cry', { pose: 'down', sit: true }),
      jet1: { p: [0, 0, 6] }, jet2: { p: [0, 0, 6] }, boom2: BOOM(5.4, -3.0, 1.6, 1.3), puff2: { p: [5.4, -3.0, 2.4], pop: 1.6 } },
    hud: pow([['ตู้ม!!', 1.3, 760, 980, '#ffb04a', 140]]), sfx: [[0.3, 'zip'], [0.9, 'zip'], [1.3, 'puff'], [3.0, 'gong']],
    fx: all(flyK('jet1', lin('PANEM', [-24, 7, -8], [24, 8, -10], 0, 2.4), 0, 2.4, true), flyK('jet2', lin('PANEM', [-28, 8, -12], [22, 9, -14], 0.4, 2.8), 0.4, 2.8, true)) },
  a2: { st: 'REAP', bg: 'day', cam: [0, 0, 1.0, -1.4, 6.2, 1.3, 0.3], A: Object.assign(KIDS(1.2), { pk2: fig(-1.6, -2.6, 0, 'angry', { pose: during(0.6, 2.2, 'reach', 'give') }), slip: HOLD('pk2', 'R'), pk1: fig(3.0, -1.6, -30, 'angry', { pose: 'hips' }), rifle: HOLD('pk1') }),
    hud: left(24), sfx: [[0.6, 'tok'], [2.2, 'pop'], [3.2, 'bell']], fx: (r, t, s, o) => { o.slip.visible = r > 2.2; } },
  a3: { st: 'ACAD', bg: 'hall', cam: [0, 0, 1.0, -1.8, 6.0, 1.3, 0.3], A: { gaul: fig(0, -4.6, 0, 'giggle', { pose: 'point', say: ['ใครอยากเป็นพี่เลี้ยง?', 0.4, 2.4] }),
    snowY: fig(-0.8, 0.2, 180, 'happy', { pose: at_(2.6, null, raise) }), sejanus: fig(1.0, 0.4, 180, 'worried'), cap1: fig(-2.6, 0.8, 170, 'happy'), cap2: fig(2.8, 0.9, 190, 'giggle'), cap3: fig(-1.8, 1.8, 175, 'happy'), cap4: fig(1.6, 2.0, 185, 'happy') },
    sfx: [[0.4, 'tok'], [2.6, 'pop']] },
  a4: { st: 'HOME', bg: 'dusk', cam: [0, 0.2, 0.9, -1.8, 4.0, 0.45, 0.2], A: { snowY: fig(0.2, -1.4, 0, 'sick', { pose: at_(2.6, 'hold', null) }), cup: { on: ['snowY', 'R', 0, 0.05, 0.12], out: 2.6 }, puff: { p: [0.2, -1.0, 1.6], pop: 2.6, out: 3.2 } },
    hud: pow([['ซุปกะหล่ำ…อีกแล้ว', 0.5, 540, 950, '#c8f0a0', 72], ['ฟึ่บ!', 2.6, 700, 1100, '#ffffff', 110]]), sfx: [[0.5, 'tok'], [2.6, 'zip'], [3.2, 'shimmer']],
    fx: (r, t, s, o) => { if (r > 2.9) { o.snowY.userData.setExpr('giggle'); o.snowY.rotation.y = Math.sin(r * 3) * 0.3; } } },
  a5: { st: 'ACAD', bg: 'hall', cam: [0, 0, 1.0, -2.6, 4.6, 0.5, -0.2], A: { gaul: fig(0, -4.0, 0, 'giggle', { pose: 'give' }), coinP: HOLD('gaul'), snowY: fig(-1.8, -2.6, 70, 'happy', { pose: at_(2.4, null, 'fist'), say: ['ทุนนี้ ต้องเป็นของผม!', 2.4] }), gY: { p: [0, 0] } },
    sfx: [[0.3, 'shimmer'], [2.4, 'bell']], fx: glowAt('gY', 'gaul', 1.0, 0.2) },
  a6: { st: 'REAP', bg: 'day', cam: [0, 0, 1.0, -1.6, 4.2, 0.5, -0.2], A: { lucy: fig(-0.6, -1.0, 30, 'giggle', { pose: during(0.6, 1.6, 'give', null) }), mayfair: fig(1.0, -0.6, -40, 'happy', { pose: at_(1.5, null, flail), to: [2.2, 0.8, 2.2, 4.0] }),
    snK: { p: [1.0, -0.6, 1.4], pop: 1.4 }, pk1: fig(3.4, -2.4, -30, 'angry', { pose: 'hips' }), f1: fig(-3.0, 0.8, 150, 'worried'), f2: fig(-2.2, 1.6, 160, 'giggle') },
    hud: pow([['กรี๊ดดด!!', 1.6, 760, 950, '#ff9ac8', 120]]), sfx: [[0.6, 'tok'], [1.4, 'pop'], [1.6, 'zip']],
    fx: all(expr('mayfair', 'cry', 1.5), (r, t, s, o) => { const m = o.mayfair, n = o.snK; if (r > 1.4) CF.serpentTick(n, (u) => { const p = H.pos(m, 1.1); return new T.Vector3(p.x + Math.sin(u * 9) * 0.3, p.y + Math.sin(u * 7) * 0.25, p.z + 0.35 + Math.cos(u * 9) * 0.15); }, r, 0.03); if (r > 1.5) hop(m, (r - 1.5) % 0.5 + 1.5, 1.5, 0.4); }) },
  a7: { cam: [0, -0.6, 1.0, -1.0, 4.6, 0.5, 0.2], A: { mayfair: null, snK: null, lucy: fig(-0.6, -1.0, 0, 'happy', { pose: 'hold' }), guitar: HOLD('lucy', 'R', -0.1, 0.25), f1: fig(-3.0, -1.4, 60, 'happy'), f2: fig(-2.4, -0.4, 70, 'happy'), f3: fig(2.4, -0.6, -70, 'worried', { pose: at_(2.4, null, 'up') }) },
    sfx: [[0.3, 'chime'], [1.2, 'shimmer'], [2.4, 'chime'], [3.4, 'bell']], fx: all(notes('lucy', 0.3), expr('f3', 'happy', 2.4)) },
  a8: { st: 'ZOO', bg: 'day', cam: [0, 0.4, 0.9, -1.6, 4.4, 0.5, 0.3], A: { lucy: fig(0.4, -3.2, 20, 'worried', { pose: at_(2.6, null, 'reach') }), snowY: fig(1.6, -0.6, -150, 'happy', { pose: during(1.6, 3.6, 'give', null), to: [1.0, -1.6, 0.4, 1.6] }), cake: HOLD('snowY'), cap1: fig(-3.6, 0.8, 160, 'giggle', { pose: 'point' }), cap2: fig(-2.6, 1.4, 170, 'giggle') },
    sfx: [[0.4, 'tok'], [1.8, 'pop'], [3.0, 'chime']], fx: all(expr('lucy', 'happy', 3.0), (r, t, s, o) => { if (r > 3.0) { o.cake.position.copy(H.hand(o.lucy, 'R')); } }) },
  a9: { st: 'AR10', bg: 'dust', cam: [0, 0, 1.0, -1.0, 6.0, 0.6, 0.4], shake: [1.6, 3.4, 0.16], flash: [[1.6, 0.5], [2.4, 0.4]],
    A: { snowY: fig(-0.8, 0.2, 20, 'happy', { pose: at_(1.7, null, 'up') }), lucy: fig(0.8, 0.0, -20, 'happy', { pose: at_(1.7, null, 'up') }), t1: fig(3.4, -2.0, -40, 'happy', { fall: [1.8, 2.3], out: 3.6 }), t2: fig(-3.6, -2.4, 30, 'happy', { pose: at_(1.7, null, 'up') }),
      boom2: BOOM(3.0, -3.0, 1.4, 1.6), boom3: BOOM(-3.4, -4.6, 2.0, 2.4, 1.0), puff2: { p: [2.6, -2.6, 1.8], pop: 1.9 }, puff: { p: [-3, -4, 2.4], pop: 2.6 } },
    hud: pow([['ตู้ม!!', 1.6, 760, 950, '#ffb04a', 150], ['ตู้มม!!', 2.4, 320, 900, '#ffb04a', 140]]), sfx: [[0.3, 'tok'], [1.6, 'puff'], [2.4, 'puff'], [2.6, 'gong']], fx: all(expr('snowY', 'cry', 1.7), expr('lucy', 'worried', 1.7)) },
  a10: { cam: [0, 0.2, 0.9, -0.4, 4.2, 0.45, 0.2], A: { t1: null, t2: null, boom2: null, boom3: null, snowY: fig(-0.2, 0.2, 90, 'cry', { lie: true, to: [0.6, 0.6, 0.6, 2.0], glide: true }), lucy: fig(1.8, 0.4, -90, 'angry', { pose: 'reach', to: [2.4, 0.6, 0.6, 2.0] }), rock: { p: [-0.6, -0.2, 0.2], out: 0.6 },
    vial: { p: [0, 0], pop: 3.0 } }, bgAt: (r) => (r > 2.9 ? 'night' : null),
    sfx: [[0.6, 'puff'], [2.2, 'chime'], [3.0, 'tok']], fx: all(expr('snowY', 'happy', 2.2), (r, t, s, o) => { if (r > 2.6) { o.snowY.rotation.set(0, -1.2, 0); o.snowY.position.y -= 0.0; } if (o.vial.visible) o.vial.position.copy(H.hand(o.snowY, 'R')); },
      (r, t, s, o) => { if (r > 2.6) { s.o.snowY.userData.arms.R.rotation.set(-1.3, 0, -0.1); } }) },
  a11: { st: 'AR10', bg: 'dusk', fresh: true, cam: [0, 0, 1.0, -1.2, 5.6, 0.55, 0.4], A: { sejanus: fig(-4.2, 0.4, 90, 'angry', { to: [0.2, -1.0, 0.3, 2.2], pose: at_(2.4, null, 'give') }), bread: { on: ['sejanus', 'R', 0, 0.05, 0.1] }, pk1: fig(4.0, -2.4, -60, 'angry', { pose: at_(3.0, null, 'point'), pop: 2.8, say: ['หยุดนะ!', 3.0] }) },
    sfx: [[0.3, 'tok'], [2.4, 'pop'], [3.0, 'bell']] },
  a12: { cam: [0, 0, 1.0, -0.8, 5.0, 0.5, 0.3], shake: [2.2, 2.8, 0.1], A: { pk1: null, snowY: fig(-2.0, 0.6, 70, 'worried', { pop: 0.1, pose: at_(2.0, guard, swing) }), club: HOLD('snowY'), sejanus: fig(-0.2, -1.4, 40, 'worried'),
    t2: foe(2.8, -0.2, 2.3, 1, { to: [0.0, 0.2, 0.6, 2.1], pose: raise }) },
    hud: pow([['โป๊ก!', 2.3, 700, 950, '#ffffff', 130]]), sfx: [[0.6, 'zip'], [2.3, 'puff'], [3.2, 'soft']], fx: expr('snowY', 'cry', 3.0) },
  a13: { st: 'AR10', bg: 'day', fresh: true, cam: [0, 0, 1.0, -0.6, 4.6, 0.5, 0.3], A: { lucy: fig(-1.6, 0.2, 40, 'angry', { pose: during(0.4, 1.8, 'hold', null) }), vial: HOLD('lucy', 'R'), bottle: { p: [-0.6, 0.4, 0.0] },
    dill: fig(1.6, -0.4, -50, 'happy', { pose: during(2.2, 3.0, 'hold', null), fall: [3.4, 3.9], fallDir: -1, out: 4.6 }), t3: fig(3.6, -2.2, -40, 'angry') },
    sfx: [[0.6, 'tok'], [2.2, 'pop'], [3.4, 'soft']], fx: all(expr('dill', 'sick', 3.0), expr('lucy', 'cry', 3.6), (r, t, s, o) => { o.vial.visible = r < 1.8; if (r > 2.0 && r < 3.1) o.bottle.position.copy(H.hand(o.dill, 'R')); else if (r >= 3.1) o.bottle.visible = false; }) },
  a14: { cam: [0, 0, 1.0, -0.8, 5.8, 0.6, 0.4], A: { lucy: null, vial: null, bottle: null, dill: null, gaul: fig(-3.0, 0.8, 40, 'giggle', { pose: 'point', say: ['ปล่อยงู!', 0.3, 1.8] }), tank: { p: [-1.6, -0.6] },
    sn1: { p: [-1.6, -0.6] }, sn2: { p: [-1.6, -0.6] }, sn3: { p: [-1.6, -0.6] }, t3: fig(2.4, -1.6, -40, 'cry', { pose: flail, to: [5.0, -3.4, 1.4, 3.4] }), t4: fig(3.4, -0.4, -60, 'cry', { pose: flail, to: [6.0, -1.0, 1.6, 3.6] }) },
    hud: pow([['ซู่ๆๆ!', 1.4, 600, 1100, '#9affa8', 120]]), sfx: [[0.3, 'tok'], [1.2, 'zip'], [1.6, 'zip'], [2.4, 'pop']],
    fx: (r, t, s, o, st) => { [['sn1', 0, 2.6], ['sn2', 0.3, 1.0], ['sn3', 0.6, -0.8]].forEach(([k, d, ez]) => { const sn = o[k]; sn.visible = r > 1.0 + d; if (sn.visible) CF.serpentTick(sn, lin(st, [-1.6, 0.15, -0.6], [3.4, 0.15, ez - 1.0], 1.0 + d, 3.4 + d), r, 0.06); }); } },
  a15: { cam: [0, 0, 1.0, -0.6, 4.8, 0.55, 0.3], A: { gaul: null, t3: null, t4: null, tank: { p: [-2.6, -1.2] }, snowY: fig(-3.8, -0.2, 60, 'worried', { pose: during(0.3, 1.4, 'give', null), pop: 0.1 }), hanky: { p: [0, 0] },
    lucy: fig(1.0, -0.2, -10, 'worried', { pose: 'hold' }), sn1: { p: [0, 0] }, sn2: { p: [0, 0] }, sn3: { p: [0, 0] }, sn4: { p: [0, 0] } },
    hud: hudAll(left(2, 1, 3.4), pow([['ชนะ!!', 3.6, 540, 900, '#ffd94a', 150]])), sfx: [[0.6, 'tok'], [1.6, 'zip'], [3.4, 'bell'], [3.6, 'shimmer']],
    fx: all(toss('hanky', 'snowY', [-2.6, 1.6, -1.2], 0.6, 1.3, 0.6), expr('lucy', 'giggle', 3.4), (r, t, s, o, st) => { ['sn1', 'sn2', 'sn3', 'sn4'].forEach((k, i) => { CF.serpentTick(o[k], (u) => H.at(st, 1.0 + Math.cos(u * 0.9 + i * 1.57) * 1.6, 0.15, -0.2 + Math.sin(u * 0.9 + i * 1.57) * 1.6), r, 0.12); }); }) },
  a16: { st: 'ACAD', bg: 'hall', cam: [0, 0, 1.0, -2.0, 4.6, 0.5, 0.2], A: { high: fig(0.8, -2.2, -40, 'angry', { pose: 'give' }), hanky: HOLD('high'), snowY: fig(-0.8, -1.4, 40, 'worried', { pose: at_(2.4, null, 'cry') }), gaul: fig(2.8, -3.6, -30, 'giggle'), lbCheat: { p: [0.8, -2.2, 3.4], pop: 1.4 } },
    sfx: [[0.4, 'tok'], [1.4, 'pop'], [2.6, 'gong']] },
  a17: { st: 'D12', bg: 'night', cam: [0, 0, 1.0, -1.0, 5.0, 0.55, 0.4], A: { sejanus: fig(-1.6, -1.2, 60, 'angry', { pose: 'whisper' }), f1: fig(-0.2, -1.6, -60, 'worried'), f2: fig(-0.9, -2.6, 0, 'angry'),
    snowY: fig(3.4, 0.6, -110, 'worried', { pose: 'hold' }), rec: HOLD('snowY', 'R'), moon: { p: [-6, -30, 14], s: 4 } },
    sfx: [[0.4, 'tok'], [2.0, 'zap'], [3.0, 'soft']], fx: (r, t, s, o) => { if (o.rec.userData && o.rec.children[1]) o.rec.children[1].scale.setScalar(0.6 + Math.sin(t * 8) * 0.2); } },
  a18: { cam: [0, 0, 1.0, -0.8, 5.2, 0.55, 0.3], flash: [1.6, 0.3], A: { rec: null, f1: null, f2: null, snowY: fig(2.4, 0.4, -100, 'angry', { pose: at_(1.2, null, aim) }), pistol: HOLD('snowY'), sejanus: fig(-0.2, -1.6, 40, 'cry', { pose: at_(1.7, null, 'cry') }),
    mayfair: fig(-1.8, -0.4, 60, 'angry', { pose: 'point', fall: [1.7, 2.2], fallDir: -1, out: 3.2 }) },
    hud: pow([['ปัง!', 1.6, 700, 950, '#ffd94a', 140]]), sfx: [[0.4, 'tok'], [1.6, 'puff'], [2.4, 'soft']], fx: shots([[1.6, 'snowY', 'mayfair']]) },
  a19: { st: 'HANG', bg: 'dusk', cam: [0, 0.4, 1.0, -2.0, 5.0, 0.55, 0.3], A: { sejanus: fig(0.6, -2.6, 0, 'cry', { pose: 'down', out: 3.2 }), pk1: fig(-1.4, -2.2, 40, 'angry'), pk2: fig(2.6, -2.2, -40, 'angry'),
    lucy: fig(-2.6, 0.6, 150, 'cry', { pose: 'cry' }), snowY: fig(2.0, 0.8, 200, 'worried', { pose: 'down' }) },
    sfx: [[0.6, 'gong'], [2.8, 'soft']], fx: greyOut('sejanus', 1.0, 2.8) },
  a20: { st: 'WOODS', bg: 'forest', cam: [0, 1.6, 0.9, -1.6, 4.6, 0.5, 0.3], A: { snowY: fig(-1.0, 0.4, 60, 'happy', { to: [0.8, -0.6, 0, 1.6] }), lucy: fig(-2.2, 0.6, 60, 'happy', { to: [2.8, -1.8, 0, 1.8], pose: at_(2.4, null, 'hold') }), rifle: { p: [3.2, -2.4, 0.1], rot: [0, 0, 1.4] } },
    sfx: [[0.3, 'chime'], [2.4, 'tok'], [3.2, 'gong']], fx: all(expr('lucy', 'worried', 2.6), expr('snowY', 'angry', 3.2), (r, t, s, o) => { if (r > 2.4) { o.rifle.position.copy(H.hand(o.lucy, 'R')); o.rifle.rotation.set(0, 0, 0); } }) },
  a21: { cam: [0, 1.2, 1.0, -1.2, 5.6, 0.55, 0.4], A: { rifle: HOLD('snowY'), lucy: fig(2.8, -1.8, 30, 'cry', { to: [7.0, -6.0, 0.2, 1.4], out: 1.6 }), snowY: fig(0.6, -0.4, 60, 'angry', { pose: at_(2.0, 'cry', aim) }), snK: { p: [0.2, 0.2, 0.2], pop: 1.0 },
    bird1: { p: [0, 0] }, bird2: { p: [0, 0] }, bird3: { p: [0, 0] } },
    hud: pow([['ปังๆๆ!', 2.6, 760, 900, '#ffd94a', 130]]), sfx: [[0.4, 'zip'], [1.0, 'pop'], [2.6, 'puff'], [3.0, 'puff'], [3.4, 'puff'], [3.6, 'chime']],
    fx: all(notes('lucy', 0, 1.6), (r, t, s, o, st) => { if (o.snK.visible) CF.serpentTick(o.snK, (u) => H.at(st, 0.2 + Math.sin(u * 3) * 0.5, 0.12, 0.3 + Math.cos(u * 3) * 0.25), r, 0.05); }, shots([[2.6, 'snowY', [5, 1.4, -6], 'tr1'], [3.0, 'snowY', [3, 1.2, -7], 'tr2'], [3.4, 'snowY', [7, 1.6, -5], 'tr3']]),
      flyK('bird1', qb('WOODS', [4, 2, -5], [3, 6, -3], [-6, 10, -8], 2.8, 4.4), 2.8, 4.4, true), flyK('bird2', qb('WOODS', [6, 2, -6], [4, 7, -4], [-2, 11, -9], 3.0, 4.6), 3.0, 4.6, true), flyK('bird3', qb('WOODS', [3, 2, -7], [1, 6, -5], [-8, 9, -6], 3.2, 4.8), 3.2, 4.8, true)) },
  a22: { st: 'ACAD', bg: 'night', cam: [0, 0, 1.0, -2.0, 4.8, 0.5, 0.2], A: { gaul: fig(-1.6, -2.6, 40, 'giggle', { pose: 'give' }), coinP: { on: ['snowY', 'R', 0, 0.05, 0.12] }, snowY: fig(0.2, -1.6, 0, 'giggle', { pose: 'hold' }),
    high: fig(2.4, -2.6, -40, 'happy', { pose: during(0.4, 2.0, 'give', null), fall: [2.6, 3.2], fallDir: 1, out: 4.2 }), cup: { on: ['high', 'R', 0, 0.05, 0.12], out: 2.0 }, rose: { p: [0, 0], pop: 3.4 } },
    sfx: [[0.4, 'shimmer'], [2.6, 'soft'], [3.4, 'bell']], fx: all(expr('high', 'sick', 2.2), (r, t, s, o) => { if (r > 3.4) o.rose.position.copy(H.hand(o.snowY, 'L')); }) },
};
/* =========== ภาค 2 Sunrise on the Reaping · เกมปีที่ 50 =========== */
Object.assign(SC, {
  b1: { st: 'SNOWH', bg: 'palace', cam: [0, 0, 1.0, -2.0, 4.8, 0.5, 0.2], A: { snow: fig(0, -2.4, 0, 'giggle', { pose: 'hold' }), rose: HOLD('snow', 'R', 0.05, 0.12), pk1: fig(-2.6, -3.0, 20, 'angry'), pk2: fig(2.6, -3.0, -20, 'angry') },
    hud: hudAll(left(24, 48, 2.4), pow([['x2 !!', 2.4, 540, 1000, '#ff7a5a', 160]])), sfx: [[0.4, 'gong'], [2.4, 'pop'], [2.6, 'bell']] },
  b2: { st: 'SEAM', bg: 'dawn', cam: [0, 0, 0.9, -0.4, 4.4, 0.5, 0.3], A: { haymY: fig(-2.4, 0.6, 70, 'happy', { to: [-0.6, 0.2, 0.2, 1.6], pose: at_(1.8, null, 'give') }), gum: HOLD('haymY'), sid: fig(-3.4, 1.4, 60, 'giggle', { pose: 'wave' }),
    lenore: fig(1.2, -0.2, -70, 'happy', { pop: 1.2, pose: at_(2.6, null, 'embrace') }) },
    sfx: [[0.3, 'chime'], [1.2, 'pop'], [2.6, 'shimmer']], fx: all(expr('lenore', 'giggle', 2.6), (r, t, s, o) => { if (r > 2.6) o.gum.position.copy(H.hand(o.lenore, 'R')); }) },
  b3: { st: 'MEADOW', bg: 'dawn', cam: [0, -0.4, 0.8, -1.0, 4.0, 0.45, 0.3], A: { lenore: fig(-1.2, -1.2, 20, 'happy', { sit: true, pose: at_(0.4, null, 'point'), say: ['สักวัน… จะไม่มีวันจับฉลากอีก', 0.4, 2.6] }),
    haymY: fig(0.4, -1.0, -20, 'happy', { sit: true, say: ['ไม่มีทางหรอก', 2.8] }), gY: { p: [4, -30, 12], s: 4 } },
    sfx: [[0.4, 'chime'], [2.8, 'pop']], fx: expr('haymY', 'giggle', 2.8) },
  b4: { st: 'REAP', bg: 'day', cam: [0, 0, 1.0, -1.0, 6.0, 1.2, 0.3], A: Object.assign(KIDS(1.0, ['t1', 't2', 'haymY', 't4', 't5', 't6']), { t2: fig(-2.0, 1.4, 180, 'cry', { to: [-6.4, 3.6, 1.6, 2.8], fall: [2.9, 3.3], out: 4.2 }),
    pk1: fig(3.0, -1.4, -30, 'angry', { pose: at_(2.6, null, aim) }), rifle: HOLD('pk1'), plut: fig(-1.4, -2.8, 20, 'happy'), lenore: null }),
    hud: hudAll(left(48), pow([['ปัง!', 2.8, 300, 950, '#ffd94a', 140]])), sfx: [[0.4, 'tok'], [1.6, 'zip'], [2.8, 'puff'], [3.4, 'soft']], fx: all(expr('haymY', 'giggle', 0.3), expr('haymY', 'worried', 2.9), shots([[2.8, 'pk1', 't2']])) },
  b5: { cam: [0, 0.6, 1.0, -0.6, 4.6, 0.5, 0.3], shake: [1.6, 2.0, 0.1], A: { t2: null, t1: null, t5: null, t6: null, lenore: fig(1.8, 1.4, -120, 'cry', { pose: 'cry', fall: [0.6, 1.0], fallDir: 1 }),
    pk1: fig(2.6, 0.2, -80, 'angry', { pose: during(0.3, 0.8, punch, null), fall: [1.7, 2.1], fallDir: 1, out: 4.6 }), haymY: fig(0.4, 0.8, 90, 'angry', { to: [1.6, 0.4, 0.8, 1.5], pose: during(1.4, 2.2, punch, null) }),
    plut: fig(-1.8, -1.8, 40, 'giggle', { pose: at_(2.8, null, 'point'), say: ['เด็กคนนี้แหละ!', 2.8] }) },
    hud: pow([['ผัวะ!!', 1.6, 700, 950, '#ffffff', 150]]), sfx: [[0.6, 'soft'], [1.6, 'puff'], [2.8, 'bell']] },
  b6: { st: 'CAPST', bg: 'dusk', cam: [0, 0, 1.0, 0.2, 6.0, 0.6, 0.5], shake: [2.0, 2.6, 0.12], flash: [2.0, 0.4, 'rgba(255,200,120,'],
    A: { haymY: fig(-3.4, 0.6, 90, 'happy', { to: [0.2, 0.6, 0, 2.0], glide: true }), louella: fig(-4.2, 0.6, 90, 'happy', { to: [-0.6, 0.6, 0, 2.0], glide: true, fall: [2.2, 2.6], fallDir: -1, pose: at_(0, 'wave', null) }),
      cap1: fig(-3.4, -3.6, 0, 'giggle', { pose: 'up' }), cap2: fig(-0.6, -3.8, 0, 'giggle', { pose: 'wave' }), cap3: fig(2.4, -3.6, 0, 'giggle', { pose: 'up' }), fb1: { p: [0, 0] }, boom: BOOM(-0.6, 0.6, 1.4, 2.0) },
    hud: pow([['ตู้ม!', 2.0, 540, 950, '#ffb04a', 140]]), sfx: [[0.3, 'shimmer'], [1.2, 'zip'], [2.0, 'puff'], [2.6, 'soft']],
    fx: all(flyK('fb1', qb('CAPST', [6, 1, -4], [4, 6, -2], [-0.6, 1.4, 0.6], 1.0, 2.0), 1.0, 2.0), expr('haymY', 'cry', 2.3), expr('cap2', 'worried', 2.2)) },
  b7: { st: 'SNOWH', bg: 'palace', fresh: true, cam: [0, 0, 1.0, -1.0, 5.0, 0.55, 0.3], A: { haymY: fig(0, 2.4, 180, 'cry', { to: [0, -1.4, 0.2, 2.6], pose: 'hold' }), louella: { on: ['haymY', 'x', 0, 0.2, 0.4], lie: true },
    pk1: fig(-3.2, -2.6, 60, 'angry', { pop: 2.8, to: [-1.0, -1.6, 3.0, 4.0] }), pk2: fig(3.2, -2.6, -60, 'angry', { pop: 2.8, to: [1.0, -1.6, 3.0, 4.0] }) },
    sfx: [[0.3, 'soft'], [2.8, 'pop'], [3.4, 'tok']], fx: (r, t, s, o) => { const h = o.haymY, l = o.louella; const p = H.pos(h, 0.85); l.position.set(p.x, p.y, p.z + 0.35); l.rotation.set(-Math.PI / 2, h.rotation.y + Math.PI / 2, 0, 'YXZ'); } },
  b8: { cam: [0, 0, 1.0, -1.8, 4.6, 0.5, 0.2], A: { louella: null, pk1: fig(-1.6, -0.6, 60, 'angry'), pk2: fig(1.6, -0.6, -60, 'angry'), haymY: fig(0, 0, 180, 'worried'), snow: fig(0, -3.0, 0, 'angry', { pose: 'hold', say: ['ดื้อนัก… ตายช้าๆ', 0.3, 2.2] }), rose: HOLD('snow', 'R', 0.05, 0.12),
    loulou: fig(2.8, -2.4, -40, 'worried', { pop: 2.6 }) },
    sfx: [[0.3, 'gong'], [2.6, 'pop'], [3.2, 'tok']], fx: (r, t, s, o) => { if (r > 2.8) o.haymY.rotation.y = Math.PI - 0.7; } },
  b9: { st: 'TRAIN', bg: 'hall', cam: [0, 0, 1.0, -1.2, 5.0, 0.55, 0.3], A: { haymY: fig(-0.4, -0.6, 0, 'happy', { pose: 'wave' }), may: fig(-2.2, -1.2, 30, 'angry', { pose: 'hips', say: ['อย่ามาเกาะฉันนะ', 0.4, 2.2] }), ampert: fig(1.6, -1.0, -30, 'giggle', { pop: 2.2, say: ['ผมรู้ว่าสนามทำงานยังไง', 2.6] }),
    loulou: fig(3.2, -2.4, -40, 'happy') }, sfx: [[0.4, 'tok'], [2.2, 'pop'], [2.6, 'chime']] },
  b10: { bg: 'night', cam: [0, -0.4, 1.0, -1.6, 3.8, 0.45, 0.2], A: { may: null, ampert: null, loulou: null, beetee: fig(-1.2, -1.8, 50, 'worried', { pose: 'whisper' }), haymY: fig(0.2, -1.4, -60, 'worried'), gB: { p: [3.6, -3.4, 1.6] } },
    sfx: [[0.4, 'zap'], [1.6, 'tok'], [2.8, 'shimmer']], fx: (r, t, s, o) => { o.gB.scale.setScalar(o.gB.userData.s0 * (1 + Math.sin(t * 6) * 0.2)); if (r > 2.8) o.haymY.userData.setExpr('giggle'); } },
  b11: { st: 'AR50', bg: 'day', cam: [0, 0, 1.0, -2.0, 6.6, 0.75, 0.4], shake: [0.8, 3.0, 0.07], A: { haymY: fig(-2.6, 0.8, 90, 'worried', { to: [-6.6, 2.2, 1.6, 3.2] }), bag: HOLD('haymY', 'R'),
    t1: foe(-1.0, -2.4, 1.4, 1, { pose: swing }), t2: foe(1.2, -2.8, 2.0, -1, { pose: swing }), t3: foe(2.4, -1.6, 2.6, 1, { pose: raise }), t4: foe(-0.4, -1.0, 3.0, -1, { pose: swing }), silka: fig(1.0, -1.4, -30, 'angry', { pose: swing }), axe: HOLD('silka'), c1: fig(3.4, -2.6, -40, 'angry', { pose: swing }) },
    hud: left(48, 30, 3.2), sfx: [[0.3, 'gong'], [1.4, 'puff'], [2.0, 'puff'], [2.6, 'puff'], [3.2, 'pop']] },
  b12: { st: 'AR50', bg: 'day', fresh: true, cam: [0, 0.6, 0.8, -1.6, 4.0, 0.45, 0.3], A: { loulou: fig(1.4, -1.8, -20, 'happy', { pose: during(0.4, 1.8, 'hold', null), fall: [2.2, 2.6], fallDir: -1 }), gP: { p: [1.4, -2.0, 0.8] },
    haymY: fig(-0.6, -0.4, 60, 'worried', { to: [0.4, -1.4, 2.0, 2.8], pose: at_(2.8, 'reach', 'cry') }) },
    sfx: [[0.4, 'shimmer'], [2.2, 'soft'], [3.2, 'gong']], fx: all(expr('loulou', 'sick', 1.6), expr('haymY', 'cry', 2.8), glowAt('gP', 'loulou', 1.3, 0.4, 2.2, 5)) },
  b13: { st: 'AR50', fresh: true, cam: [0, 0, 1.0, -1.0, 5.0, 0.55, 0.3], A: { ampert: fig(-0.4, -0.6, 30, 'happy', { pose: 'point', say: ['ปล่อยน้ำท่วมมัน!', 0.3, 1.8], fall: [3.0, 3.4], out: 4.4 }), haymY: fig(-2.0, 0.2, 50, 'happy'),
    sq1: { p: [4.0, -2.4], to: [0.2, -0.8, 1.8, 2.9] }, sq2: { p: [4.6, -0.6], to: [0.4, -0.2, 2.0, 3.0] }, sq3: { p: [3.4, -3.6], to: [-0.2, -1.4, 2.2, 3.1] } },
    hud: pow([['แกร่กๆๆ!', 2.6, 700, 950, '#ffb04a', 120]]), sfx: [[0.3, 'tok'], [1.8, 'zip'], [2.6, 'puff'], [3.4, 'soft']], fx: all(expr('ampert', 'cry', 2.6), expr('haymY', 'cry', 3.2)) },
  b14: { cam: [0, 2.0, 2.4, -8.0, 8.0, 0.6, 0.0], shake: [1.6, 4.4, 0.16], flash: [1.6, 0.6, 'rgba(255,160,80,'], A: { ampert: null, sq1: null, sq2: null, sq3: null, haymY: fig(-1.0, -0.4, 150, 'angry', { pose: 'reach' }),
    fb1: { p: [0, 0] }, fb2: { p: [0, 0] }, boom3: BOOM(10, -40, 10, 1.6, 1.6), t5: fig(3.4, -2.8, -150, 'cry', { pose: flail, to: [5.6, 2.0, 2.4, 4.4] }), t6: fig(1.4, -3.6, -160, 'cry', { pose: flail, to: [3.2, 1.4, 2.6, 4.6] }) },
    hud: pow([['บึ้มมม!!', 1.6, 540, 900, '#ff7a3a', 160]]), sfx: [[0.4, 'tok'], [1.6, 'puff'], [1.8, 'gong'], [2.6, 'puff'], [3.4, 'puff']],
    fx: all(flyK('fb1', qb('AR50', [14, 12, -48], [10, 18, -24], [4, 0.5, -4], 1.8, 3.4), 1.8, 3.4), flyK('fb2', qb('AR50', [14, 12, -48], [6, 16, -26], [-3, 0.5, -6], 2.2, 3.8), 2.2, 3.8)) },
  b15: { st: 'EDGE', bg: 'day', cam: [0, 0, 1.0, -1.6, 4.4, 0.55, 1.6], A: { haymY: fig(-0.6, 0.2, 180, 'worried', { pose: during(0.6, 1.2, raise, null) }), may: fig(1.4, 0.6, 170, 'worried'), knife: { p: [0, 0] }, ffw: { p: [0, -4.6] } },
    hud: pow([['เด้ง!', 1.9, 540, 1000, '#9ad8ff', 140]]), sfx: [[1.0, 'zip'], [1.9, 'zap'], [2.4, 'pop']],
    fx: all(toss('knife', 'haymY', [0, 1.4, -4.4], 1.0, 1.9, 0.4, 14), ffFlash([1.9]), (r, t, s, o, st) => { if (r > 1.9 && r < 2.6) { o.knife.visible = true; o.knife.position.lerpVectors(H.at(st, 0, 1.4, -4.4), H.at(st, -0.6, 0.1, -0.4), (r - 1.9) / 0.7); } }, expr('haymY', 'giggle', 2.8)) },
  b16: { cam: [0, 0, 1.0, -0.6, 4.6, 0.55, 0.8], A: { knife: null, ffw: { p: [0, -4.6] }, may: fig(0.4, -0.4, 0, 'angry', { pose: 'point', say: ['ปิดบังฉันทำไม!', 0.2, 1.6], to: [3.2, 0.8, 1.4, 2.6], fall: [3.4, 3.9], fallDir: 1 }), haymY: fig(-1.4, -0.2, 60, 'worried', { pose: at_(3.4, null, 'reach') }),
    pb1: { p: [0, 0] }, pb2: { p: [0, 0] }, pb3: { p: [0, 0] } },
    sfx: [[0.2, 'tok'], [2.6, 'zip'], [2.9, 'zip'], [3.4, 'soft']], fx: all(expr('may', 'cry', 2.8), expr('haymY', 'cry', 3.4),
      flyK('pb1', qb('EDGE', [-6, 8, -3], [0, 5, 2], [3.2, 1.2, 0.8], 2.4, 3.4), 2.4, 3.6, true), flyK('pb2', qb('EDGE', [8, 9, -2], [5, 4, 3], [3.0, 1.4, 1.0], 2.6, 3.6), 2.6, 3.8, true), flyK('pb3', qb('EDGE', [2, 10, -6], [4, 6, -1], [3.4, 1.0, 0.6], 2.8, 3.8), 2.8, 4.0, true)) },
  b17: { fresh: true, cam: [0, 0.6, 1.0, -1.0, 5.4, 0.55, 0.6], A: { ffw: { p: [0, -4.6] }, silka: fig(2.6, 0.8, -100, 'angry', { pose: during(0.6, 3.0, raise, at_(3.0, null, punch)) }), axe: { p: [0, 0] },
    haymY: fig(-1.4, -2.6, 70, 'worried', { pose: at_(3.2, null, 'down'), sit: false }) },
    hud: left(2), sfx: [[0.6, 'tok'], [3.0, 'zip']], fx: all(toss('axe', 'silka', [-1.4, 1.2, -2.6], 3.0, 3.5, 0.3, 16), (r, t, s, o) => { if (r < 3.0) o.axe.visible = false; if (r < 3.0) { o.axe.visible = true; o.axe.position.copy(H.hand(o.silka, 'R')); } if (r > 3.2) o.haymY.position.y -= 0.5 * o.haymY.userData.s0; }) },
  b18: { cam: [0, 0.6, 1.0, -1.4, 5.4, 0.6, 0.6], flash: [0.5, 0.3, 'rgba(160,220,255,'], A: { silka: fig(2.6, 0.8, -100, 'worried', { fall: [1.3, 1.8], fallDir: 1, out: 3.0 }), haymY: fig(-1.4, -2.6, 70, 'worried', { pose: at_(2.4, null, 'up') }) },
    hud: hudAll(left(2, 1, 1.6), pow([['เด้งกลับ!!', 0.5, 540, 1000, '#9ad8ff', 140], ['ชนะ!!', 2.4, 540, 900, '#ffd94a', 150]])), sfx: [[0.5, 'zap'], [1.2, 'puff'], [2.4, 'bell'], [2.6, 'shimmer']],
    fx: all(ffFlash([0.5]), (r, t, s, o, st) => { const a = H.at(st, -1.6, 1.3, -4.4), b = H.pos(o.silka, 1.1); o.axe.visible = r < 1.25; if (r < 0.5) o.axe.position.lerpVectors(H.at(st, -1.2, 1.2, -2.6), a, r / 0.5); else o.axe.position.lerpVectors(a, b, U.clamp((r - 0.5) / 0.75)); o.axe.rotation.x = r * 16; }, expr('haymY', 'cry', 3.0)) },
  b19: { st: 'SEAM', bg: 'fire', fresh: true, cam: [0, -0.4, 1.0, -1.6, 5.0, 0.55, 0.3], A: { haymY: fig(0.4, 1.2, 180, 'cry', { to: [0.0, 0.2, 0.2, 1.4], pose: at_(1.6, 'reach', 'cry'), sit: false }), fire2: { p: [-0.6, -2.4, 0.6] }, fire: { p: [0.6, -2.8, 1.6] }, puff2: { p: [-0.4, -2.6, 3.0] } },
    sfx: [[0.3, 'soft'], [1.6, 'gong']], fx: (r, t, s, o) => { if (r > 2.0) o.haymY.position.y -= 0.25 * o.haymY.userData.s0; } },
  b20: { st: 'MEADOW', bg: 'dusk', cam: [0, -0.2, 0.9, -1.0, 3.8, 0.45, 0.3], A: { lenore: fig(-0.8, -1.0, 50, 'giggle', { pose: during(1.6, 2.6, 'hold', null), say: ['ขอบใจสำหรับลูกอมนะ', 0.3, 1.8] }), gum: HOLD('lenore', 'R'), haymY: fig(0.8, -0.8, -60, 'happy', { pose: at_(3.0, null, 'reach') }) },
    sfx: [[0.3, 'chime'], [2.0, 'tok'], [3.0, 'gong']], fx: all(expr('haymY', 'worried', 2.8), (r, t, s, o) => { if (r > 1.6 && r < 2.6) { const p = H.pos(o.lenore, 1.25); o.gum.position.set(p.x, p.y, p.z + 0.3); } }) },
  b21: { cam: [0, 0, 0.8, -0.8, 3.6, 0.45, 0.3], A: { gum: null, lenore: fig(0.0, -0.6, 90, 'sleepy', { lie: true, p: [0.2, -0.4, 0.5] }), haymY: fig(0.6, -1.0, -40, 'cry', { sit: true, pose: 'embrace' }), bottle: { p: [0, 0], pop: 3.0 } }, bgAt: (r) => (r > 2.8 ? 'night' : null),
    sfx: [[0.3, 'soft'], [1.8, 'gong'], [3.0, 'tok']], fx: (r, t, s, o) => { if (r > 3.0) { o.bottle.position.copy(H.hand(o.haymY, 'R')); o.lenore.visible = false; } } },
  b22: { st: 'SEAM', bg: 'night', fresh: true, cam: [0, 0, 1.0, -1.2, 4.2, 0.5, 0.2], A: { plut: fig(-0.8, -1.2, 50, 'giggle', { pose: 'whisper', say: ['รอคนที่ใช่… แล้วสู้', 0.3, 2.4] }), haymY: fig(0.6, -1.0, -50, 'sleepy', { pose: 'hold' }), bottle: HOLD('haymY') },
    sfx: [[0.3, 'tok'], [2.8, 'gong']], fx: expr('haymY', 'worried', 2.4) },
});
/* =========== The Hunger Games · เกมปีที่ 74 (first chapter in release order) =========== */
SC.c0 = { st: 'REAP', bg: 'day', fresh: true, cam: [0, 0, 1.0, -1.4, 6.2, 1.3, 0.3], A: Object.assign(KIDS(1.2), { effie: fig(0, -2.6, 0, 'giggle', { pose: during(0.6, 2.2, 'reach', 'give') }), slip: HOLD('effie'), pk1: fig(3.0, -1.6, -30, 'angry', { pose: 'hips' }), rifle: HOLD('pk1'), screen: { p: [0, -5.6, 3.4] } }),
  hud: left(24), sfx: [[0.6, 'tok'], [2.2, 'pop'], [3.4, 'bell']], fx: (r, t, s, o) => { o.slip.visible = r > 2.2; } };
const BOWH = { bow: HOLD('kat', 'L', 0, 0.1) };
const bowFx = (who) => (r, t, s, o) => { if (o.bow && o[who || 'kat']) o.bow.rotation.y = o[who || 'kat'].rotation.y; };
Object.assign(SC, {
  c1: { st: 'WOODS', bg: 'forest', cam: [0, 0, 1.0, -0.4, 4.6, 0.5, 0.4], A: Object.assign({ kat: fig(-0.8, 0.4, 30, 'angry', { pose: bowP }), gale: fig(1.4, 0.8, -40, 'giggle', { say: ['แม่นจริงนะ แคทนิส', 2.4] }), bird1: { p: [0, 0] } }, BOWH),
    hud: pow([['ฟึ่บ!', 1.2, 380, 950, '#ffffff', 120]]), sfx: [[1.2, 'zip'], [1.4, 'tok'], [2.4, 'pop']], fx: all(bowFx(), shots([[1.2, 'kat', [3.4, 2.0, -6.0], 'trA']]), flyK('bird1', qb('WOODS', [3.4, 2.4, -6], [1, 6, -8], [-6, 9, -12], 1.4, 3.0), 1.4, 3.0, true), expr('kat', 'giggle', 2.0)) },
  c2: { st: 'REAP', bg: 'day', cam: [0, 0, 1.0, -1.4, 6.2, 1.3, 0.3], A: Object.assign(KIDS(1.2, ['t1', 'kat', 't3', 'peeta', 't5', 'gale']), { effie: fig(0, -2.6, 0, 'giggle', { pose: during(0.3, 1.2, 'reach', 'give'), say: ['พริมโรส เอเวอร์ดีน!', 1.4, 3.0] }), slip: HOLD('effie'),
    prim: fig(-2.0, 2.8, 180, 'cry', { pop: 2.4, to: [-1.2, 1.0, 2.6, 4.4] }), pk1: fig(3.2, -1.6, -30, 'angry', { pose: 'hips' }) }),
    hud: left(24), sfx: [[0.4, 'tok'], [1.4, 'bell'], [2.6, 'soft']], fx: (r, t, s, o) => { if (r > 1.6) o.kat.userData.setExpr('cry'); } },
  c3: { cam: [0, -1.0, 1.0, 0.4, 4.0, 0.45, 0.0], A: { kat: fig(-2.6, 1.6, 90, 'angry', { to: [-1.2, 0.4, 0.2, 1.0], pose: at_(1.0, null, guard), say: ['ฉันอาสา!', 1.2, 99, true] }), prim: fig(-1.2, 1.0, 180, 'cry', { p: [-1.0, 1.6], pose: 'cry' }) },
    hud: pow([['อาสา!!', 1.2, 760, 1250, '#ffd94a', 130]]), sfx: [[0.3, 'zip'], [1.2, 'bell'], [1.5, 'shimmer']], fx: (r, t, s, o) => { if (r > 1.0) o.kat.rotation.y = Math.PI * 0.95; } },
  c4: { st: 'D12', bg: 'storm', fresh: true, cam: [0, 0, 0.9, -0.6, 4.4, 0.5, 0.3], A: { rain: { p: [0, 0] }, kat: fig(-1.4, 0.2, 60, 'cry', { sit: true, pose: 'cry' }), peeta: fig(2.2, -0.6, -120, 'worried', { pose: during(1.2, 1.8, raise, null) }), bread: { p: [0, 0] } },
    sfx: [[0.3, 'soft'], [1.4, 'zip'], [2.2, 'pop']], fx: all(toss('bread', 'peeta', [-1.2, 0.5, 0.6], 1.4, 2.2, 1.2, 8), (r, t, s, o, st) => { if (r > 2.2) { o.bread.visible = true; o.bread.position.copy(H.at(st, -1.2, 0.3, 0.7)); } }, expr('kat', 'happy', 2.6)) },
  c5: { st: 'TRAIN', bg: 'hall', fresh: true, cam: [0, 0, 1.0, -1.2, 4.6, 0.5, 0.3], A: { haym: fig(0.2, -1.8, 20, 'sleepy', { pose: 'hold', fall: [1.6, 2.1], fallDir: 1 }), bottle: HOLD('haym'), kat: fig(-1.8, -0.4, 40, 'angry', { pose: 'hips' }), peeta: fig(2.0, -0.4, -40, 'worried') },
    hud: pow([['ตุ้บ!', 2.0, 640, 1100, '#ffffff', 120]]), sfx: [[0.4, 'tok'], [2.0, 'puff'], [2.6, 'pop']], fx: expr('kat', 'worried', 2.2) },
  c6: { st: 'CAPST', bg: 'night', fresh: true, cam: [0, 0, 1.0, 0.2, 6.2, 0.65, 0.5], A: { kat: fig(-3.2, 0.6, 90, 'happy', { to: [0.6, 0.6, 0, 2.4], glide: true, pose: at_(2.4, null, 'wave') }), peeta: fig(-4.0, 0.7, 90, 'happy', { to: [-0.2, 0.7, 0, 2.4], glide: true, pose: at_(2.4, null, 'wave') }),
    fire: { p: [0, 0] }, fire2: { p: [0, 0] }, cap1: fig(-3.4, -3.6, 0, 'giggle', { pose: 'up' }), cap2: fig(-0.6, -3.8, 0, 'happy', { pose: 'up' }), cap3: fig(2.4, -3.6, 0, 'giggle', { pose: 'up' }), cap4: fig(4.4, -3.2, -20, 'happy', { pose: 'wave' }) },
    hud: pow([['ว้าววว!', 2.6, 760, 950, '#ffb04a', 120]]), sfx: [[0.3, 'shimmer'], [1.0, 'puff'], [2.6, 'bell']],
    fx: (r, t, s, o) => { const a = H.pos(o.kat, 0.9), b = H.pos(o.peeta, 0.9); o.fire.position.set(a.x, a.y - 0.4, a.z - 0.5); o.fire2.position.set(b.x, b.y - 0.4, b.z - 0.5); o.fire.visible = o.fire2.visible = r > 1.0; } },
  c7: { st: 'STAGE', bg: 'night', cam: [0, 0.4, 1.0, -2.6, 4.4, 0.5, 0.2], A: { peeta: fig(0.8, -3.0, -20, 'happy', { say: ['ผมแอบชอบเธอมานานแล้ว', 0.4, 2.4] }), kat: fig(-1.6, -2.2, 30, 'worried', { pose: at_(2.6, null, 'cry') }), cap1: fig(-3.2, 0.2, 160, 'giggle', { pose: at_(2.4, null, 'up') }), cap3: fig(3.4, 0.4, 200, 'giggle', { pose: at_(2.4, null, 'up') }) },
    hud: pow([['ว้ายยย!!', 2.4, 540, 950, '#ff9ac8', 130]]), sfx: [[0.4, 'chime'], [2.4, 'pop'], [2.6, 'shimmer']] },
  c8: { st: 'CORN', bg: 'day', cam: [0, 0, 1.0, -1.6, 6.6, 0.75, 0.4], shake: [0.8, 3.0, 0.06], A: { kat: fig(-1.2, -1.6, 0, 'angry', { to: [-6.2, 2.4, 0.8, 2.6] }), bag: HOLD('kat', 'R'), cato: fig(1.4, -2.6, -40, 'angry', { pose: swing }), sword: HOLD('cato'),
    t1: foe(-2.6, -3.0, 1.2, 1, { pose: swing }), t2: foe(2.6, -1.2, 1.8, -1, { pose: raise }), t3: foe(0.2, -0.6, 2.4, 1, { pose: swing }), c2: fig(3.4, -3.0, -60, 'angry', { pose: swing }), knife: HOLD('c2') },
    hud: left(24, 13, 3.0), sfx: [[0.3, 'gong'], [1.2, 'puff'], [1.8, 'puff'], [2.4, 'puff'], [3.0, 'pop']] },
  c9: { st: 'AR74', bg: 'fire', cam: [0, 0, 1.0, -0.6, 5.6, 0.55, 0.4], shake: [1.4, 3.4, 0.1], A: { kat: fig(-3.6, -0.4, 90, 'cry', { to: [3.0, 0.6, 0.6, 3.6], pose: flail }), fb1: { p: [0, 0] }, fb2: { p: [0, 0] }, flames: { p: [-2, -5.4] }, boom: BOOM(-0.4, 0.2, 0.8, 1.9), boom2: BOOM(1.6, -0.6, 1.0, 2.9) },
    hud: pow([['ตู้ม!', 1.9, 400, 1000, '#ffb04a', 130], ['ตู้มม!!', 2.9, 720, 950, '#ffb04a', 140]]), sfx: [[0.6, 'zip'], [1.9, 'puff'], [2.2, 'zip'], [2.9, 'puff']],
    fx: all(flyK('fb1', qb('AR74', [-8, 10, -12], [-4, 8, -4], [-0.4, 0.6, 0.2], 0.8, 1.9), 0.8, 1.9), flyK('fb2', qb('AR74', [6, 11, -14], [4, 8, -6], [1.6, 0.6, -0.6], 1.8, 2.9), 1.8, 2.9)) },
  c10: { st: 'AR74', bg: 'forest', fresh: true, cam: [0, 0, 1.4, -0.8, 6.0, 0.45, 0.4], A: { kat: fig(0.4, -1.4, 160, 'angry', { p: [0.4, -1.4, 2.6], sit: true }), tree: { p: [0.4, -1.8] }, cato: fig(-0.8, 0.6, -20, 'angry', { pose: 'point', say: ['ลงมาสิ!', 0.4, 1.8] }), sword: HOLD('cato'),
    c1: fig(1.2, 0.8, 0, 'giggle', { pose: 'hips' }), c2: fig(2.4, 0.4, -20, 'angry'), peeta: fig(-2.4, 1.0, 20, 'worried', { pop: 2.4 }) },
    sfx: [[0.4, 'tok'], [2.4, 'pop'], [3.0, 'gong']] },
  c11: { cam: [0, 0, 1.6, -1.0, 5.6, 0.45, 0.3], A: { peeta: null, rue: fig(3.4, -2.2, -110, 'happy', { p: [3.4, -2.2, 2.4], sit: true, pose: 'point' }), kat: fig(0.4, -1.4, 160, 'angry', { p: [0.4, -1.4, 2.6], sit: true, pose: during(1.2, 2.4, swing, null) }), knife: HOLD('kat'),
    nest: { p: [0.6, -1.2, 3.8] }, wasp: { p: [0, 0], pop: 2.8 }, cato: fig(-0.8, 0.6, -20, 'angry', { pose: at_(2.8, null, flail) }), c1: fig(1.2, 0.8, 0, 'giggle', { pose: at_(2.8, null, flail), to: [4.4, 3.2, 3.0, 4.6] }), c2: fig(2.4, 0.4, -20, 'angry', { pose: at_(2.8, null, flail), to: [-3.4, 3.6, 3.0, 4.6] }) },
    hud: pow([['ร่วง!!', 2.4, 540, 1000, '#ffd94a', 130], ['หึ่งงง!!', 3.0, 760, 1250, '#ffe060', 120]]), sfx: [[1.2, 'tok'], [2.0, 'tok'], [2.4, 'zip'], [2.8, 'puff'], [3.0, 'zap']],
    fx: all(drift('wasp', 6), (r, t, s, o, st) => { if (r > 2.4) along(o.nest, lin(st, [0.6, 3.8, -1.2], [0.2, 0.3, 0.6], 2.4, 2.8), r); o.wasp.position.copy(H.at(st, 0.4 + Math.sin(t * 3) * 0.6, 1.0, 0.4)); }, expr('cato', 'cry', 2.9), expr('c1', 'cry', 2.9), expr('c2', 'cry', 2.9)) },
  c12: { st: 'AR74', bg: 'forest', fresh: true, cam: [0, 0, 1.0, -0.6, 5.0, 0.55, 0.3], A: { kat: fig(-1.4, -0.4, 60, 'sick', { to: [-5.6, 1.8, 1.4, 2.8] }), peeta: fig(0.4, -0.2, -100, 'angry', { pose: during(0.2, 1.2, 'point', guard), say: ['หนีไป!', 0.2, 1.4, true], fall: [2.4, 2.9], fallDir: -1 }),
    cato: fig(2.6, -0.8, -100, 'angry', { pose: at_(1.8, null, swing), to: [1.4, -0.4, 1.0, 2.0] }), sword: HOLD('cato') },
    hud: pow([['ฉับ!', 2.4, 600, 1000, '#ffffff', 130]]), sfx: [[0.2, 'bell'], [1.8, 'zip'], [2.4, 'puff'], [3.2, 'soft']], fx: expr('peeta', 'cry', 2.4) },
  c13: { st: 'CORN', bg: 'day', fresh: true, cam: [0, 0, 1.0, -1.2, 6.0, 0.65, 0.5], shake: [2.0, 3.0, 0.14], flash: [2.0, 0.5], A: Object.assign({ kat: fig(-3.6, 1.6, 50, 'angry', { pose: bowP }), rue: fig(-4.6, 0.4, 60, 'happy', { pose: at_(2.4, null, 'up') }),
    boom3: BOOM(-3.6, -2.4, 1.2, 2.0, 1.2), puff2: { p: [-3.6, -2.4, 2.4], pop: 2.4 }, cato: fig(2.4, -1.4, -60, 'angry', { pop: 2.6, pose: at_(2.8, null, flail) }) }, BOWH),
    hud: pow([['บึ้มม!!', 2.0, 400, 950, '#ffb04a', 160]]), sfx: [[1.0, 'zip'], [2.0, 'puff'], [2.2, 'gong'], [2.8, 'pop']], fx: all(bowFx(), shots([[1.0, 'kat', [-3.6, 0.6, -2.4], 'trA']]), expr('rue', 'giggle', 2.4)) },
  c14: { st: 'AR74', bg: 'dusk', fresh: true, cam: [0, -0.2, 0.8, -0.6, 3.8, 0.45, 0.3], A: { rue: fig(0.2, -0.6, 0, 'happy', { pose: 'wave', fall: [1.1, 1.5], fallDir: 1, p: [0.2, -0.6] }), c1: fig(4.2, -2.6, -70, 'angry', { pose: at_(0.6, raise, punch), out: 2.0 }), spear: { p: [0, 0] },
    kat: fig(-1.2, -0.2, 70, 'cry', { pop: 1.6, pose: at_(2.4, 'reach', 'cry'), sit: true }), fl1: { p: [0.4, -0.2, 0.25], pop: 3.2 }, fl2: { p: [-0.1, -0.9, 0.25], pop: 3.4 }, fl3: { p: [0.7, -1.1, 0.25], pop: 3.6 } },
    sfx: [[0.8, 'zip'], [1.1, 'puff'], [2.4, 'chime'], [3.2, 'shimmer']], fx: all(toss('spear', 'c1', 'rue', 0.8, 1.1, 0.2), notes('kat', 2.4), expr('rue', 'sleepy', 1.4)) },
  c15: { st: 'D11', bg: 'dusk', cam: [0, 0, 1.0, -1.0, 6.0, 0.65, 0.4], shake: [2.0, 3.2, 0.1], A: { f1: fig(-2.6, 0.4, 0, 'angry', { pose: 'fist' }), f2: fig(-1.0, 0.8, 0, 'angry', { pose: 'fist' }), f3: fig(0.6, 0.6, 0, 'angry', { pose: 'fist' }), f4: fig(2.2, 0.9, 0, 'angry', { pose: 'fist' }), thresh: null,
    pk1: fig(-0.4, -2.0, 0, 'cry', { fall: [2.0, 2.5], fallDir: 1 }), pk2: fig(1.8, -2.2, 0, 'worried', { to: [4.6, -3.6, 1.0, 2.4] }), boom2: BOOM(3.0, -3.6, 1.4, 2.0), fire2: { p: [3.2, -3.8, 0], pop: 2.2 } },
    hud: pow([['ลุกฮือ!!', 2.0, 540, 950, '#ff7a5a', 150]]), sfx: [[0.3, 'gong'], [2.0, 'puff'], [2.4, 'puff']] },
  c16: { st: 'AR74', bg: 'day', fresh: true, cam: [0, 0, 1.0, -0.4, 4.0, 0.45, 0.3], A: Object.assign({ kat: fig(0, -0.4, 0, 'worried', { pose: at_(2.2, null, 'up'), say: ['พีต้า!!', 2.6, 99, true] }) }, BOWH),
    hud: pow([['ชนะได้ 2 คน!', 0.6, 540, 950, '#ffd94a', 110]]), sfx: [[0.6, 'bell'], [2.2, 'pop'], [2.6, 'zip']], fx: all(bowFx(), expr('kat', 'giggle', 1.8), (r, t, s, o) => hop(o.kat, r, 2.2, 0.8)) },
  c17: { st: 'CREEK', bg: 'forest', cam: [0, 0, 0.8, -1.4, 4.2, 0.45, 0.3], A: Object.assign({ kat: fig(-2.6, 0.4, 70, 'worried', { to: [-1.0, -0.8, 0.2, 1.6] }), peeta: fig(0.8, -2.2, 0, 'giggle', { lie: true, pose: at_(2.0, null, 'wave') }) }, BOWH),
    hud: pow([['เจอแล้ว!', 2.0, 540, 950, '#ffd94a', 130]]), sfx: [[0.3, 'tok'], [2.0, 'pop'], [3.0, 'chime']], fx: all(bowFx(), greyOut('peeta', 0, 0.01), expr('kat', 'happy', 2.2), (r, t, s, o) => { if (r > 2.6) o.peeta.userData.setExpr('sick'); }) },
  c18: { st: 'CORN', bg: 'day', fresh: true, cam: [0, 0, 1.0, -1.8, 5.2, 0.55, 0.4], A: { kat: fig(-2.4, 0.4, 60, 'angry', { to: [-0.4, -1.6, 0.2, 1.2], pose: at_(1.2, null, 'cry') }), bag: { p: [-0.2, -2.0, 0.1] },
    c2: fig(1.4, -2.2, -100, 'angry', { pop: 1.0, pose: during(1.2, 2.4, choke, null), fall: [2.8, 3.2], fallDir: 1, out: 3.8 }), thresh: fig(3.6, -2.4, -100, 'angry', { pop: 2.2, to: [2.2, -2.2, 2.2, 2.8], pose: at_(2.8, null, punch), say: ['ครั้งนี้ เพื่อรู', 3.2] }) },
    hud: pow([['ตึ้ง!', 2.8, 700, 1000, '#ffffff', 130]]), sfx: [[0.3, 'zip'], [1.2, 'soft'], [2.2, 'pop'], [2.8, 'puff'], [3.2, 'bell']], fx: (r, t, s, o) => { if (r > 1.2) o.bag.position.copy(H.hand(o.kat, 'R')); } },
  c19: { st: 'CORN', bg: 'night', fresh: true, cam: [0, 0, 2.0, -3.2, 5.6, 0.45, 0.4], A: Object.assign({ kat: fig(-1.0, -3.0, 40, 'angry', { p: [-1.0, -3.0, 2.6], pose: at_(1.6, bowP, bowP) }), peeta: fig(0.8, -3.4, -40, 'cry', { p: [0.8, -3.4, 2.6], pose: flail }),
    cato: fig(1.4, -3.8, -60, 'angry', { p: [1.4, -3.8, 2.6], pose: during(0, 2.2, choke, 'cry'), fall: [2.6, 3.2], fallDir: 1, out: 3.6 }), wolf1: { p: [-2.4, -0.6], f: 20 }, wolf2: { p: [2.6, -0.4], f: -30 }, wolf3: { p: [0.4, 0.6], f: 0 }, moon: { p: [-6, -30, 14], s: 4 } }, BOWH),
    hud: pow([['ฟึ่บ!', 2.0, 400, 900, '#ffffff', 120], ['โฮ่งงง!', 3.0, 760, 1250, '#ffb04a', 110]]), sfx: [[0.4, 'zip'], [2.0, 'zip'], [2.2, 'puff'], [3.0, 'zap']], fx: all(bowFx(), shots([[2.0, 'kat', 'cato', 'trA']]), (r, t, s, o) => { ['wolf1', 'wolf2', 'wolf3'].forEach((k, i) => hop(o[k], (r + i * 0.3) % 0.8 + 1, 1, 0.5)); }) },
  c20: { cam: [0, 0, 1.0, -0.4, 4.4, 0.45, 0.3], fresh: true, st: 'CORN', bg: 'night', A: Object.assign({ kat: fig(-1.0, -0.2, 50, 'worried', { pose: 'hold' }), peeta: fig(1.0, -0.2, -50, 'worried') }, BOWH),
    hud: hudAll(left(2), pow([['ยกเลิกกฎ!', 0.4, 540, 950, '#ff7a5a', 130]])), sfx: [[0.4, 'gong'], [2.4, 'soft']], fx: bowFx() },
  c21: { cam: [0, 0, 0.9, -0.4, 3.4, 0.4, 0.2], A: { bow: null, kat: fig(-0.8, -0.2, 50, 'angry', { pose: at_(2.6, 'give', 'reach') }), peeta: fig(0.8, -0.2, -50, 'worried', { pose: at_(2.6, 'give', 'reach') }), berries: { on: ['kat', 'R', 0, 0.05, 0.12] }, berries2: { on: ['peeta', 'R', 0, 0.05, 0.12] } },
    hud: left(2), sfx: [[0.4, 'tok'], [1.6, 'soft'], [2.6, 'gong']], fx: (r, t, s, o) => { if (r > 2.6) { const k = U.clamp((r - 2.6) / 1.4); ['kat', 'peeta'].forEach((w, i) => { const a = H.hand(o[w], 'R'), b = H.pos(o[w], 1.25); o[i ? 'berries2' : 'berries'].position.lerpVectors(a, b, k * 0.7); }); } } },
  c22: { st: 'SNOWH', bg: 'palace', fresh: true, cam: [0, 0, 1.0, -2.2, 4.2, 0.45, 0.1], A: { snow: fig(0, -2.4, 0, 'angry', { pose: 'hold' }), rose: HOLD('snow', 'R', 0.05, 0.12), screen: { p: [0, -5.0, 1.6] }, cap1: fig(-2.8, -1.0, 40, 'giggle', { pose: 'up' }), cap2: fig(2.8, -1.0, -40, 'giggle', { pose: 'up' }) },
    hud: pow([['หยุด!!', 0.3, 540, 950, '#ffd94a', 160], ['ชนะทั้งคู่!', 1.2, 540, 1150, '#9fe8ff', 110]]), sfx: [[0.3, 'bell'], [1.2, 'shimmer'], [2.6, 'gong']] },
});
CAST.fl1 = ['rose', 1.6, '#f0c040']; CAST.fl2 = ['rose', 1.4, '#e8e0f8']; CAST.fl3 = ['rose', 1.5, '#f08a6a'];
/* =========== ภาค 4 Catching Fire · เกมปีที่ 75 =========== */
/* arena clock: 12 wedges, one lit per second, hand sweeping */
const clockHud = (t0) => (g, r) => { const a = U.clamp((r - t0) / 0.3); if (a <= 0) return; const cx = 540, cy = 1590, R = 150; g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.88)'; g.beginPath(); g.arc(cx, cy, R + 24, 0, 6.283); g.fill();
  const lit = Math.floor((r - t0) * 2.4) % 12, ICON = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  for (let i = 0; i < 12; i++) { const a0 = -Math.PI / 2 + i * Math.PI / 6, a1 = a0 + Math.PI / 6; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, a0, a1); g.closePath(); g.fillStyle = i === lit ? 'rgba(255,122,90,.85)' : i % 2 ? 'rgba(46,230,197,.18)' : 'rgba(46,230,197,.32)'; g.fill(); g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2; g.stroke();
    const am = (a0 + a1) / 2; g.font = F(800, 34); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ICON[i], cx + Math.cos(am) * R * 0.7, cy + Math.sin(am) * R * 0.7); }
  g.fillStyle = '#2a6aa8'; g.beginPath(); g.arc(cx, cy, 52, 0, 6.283); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 3; g.stroke(); g.restore(); };
Object.assign(SC, {
  d1: { st: 'SEAM', bg: 'ice', fresh: true, cam: [0, 0, 1.0, -1.0, 4.2, 0.45, 0.2], A: { snow: fig(0.9, -1.2, -50, 'giggle', { pose: 'hold', say: ['ทำให้ทุกคนเชื่อว่าเพราะรัก', 0.4, 2.8] }), rose: HOLD('snow', 'R', 0.05, 0.12), kat: fig(-0.9, -0.8, 50, 'worried'), pk1: fig(3.2, -2.4, -40, 'angry') },
    sfx: [[0.4, 'gong'], [3.2, 'soft']], fx: expr('kat', 'cry', 3.0) },
  d2: { st: 'D11', bg: 'day', cam: [0, 0, 1.0, -1.2, 5.4, 0.6, 0.3], flash: [3.4, 0.3], A: { kat: fig(-0.6, -2.6, 0, 'happy', { pose: 'hold' }), peeta: fig(0.8, -2.6, 0, 'happy'), f1: fig(-2.6, 0.8, 180, 'worried'), f2: fig(2.4, 0.9, 180, 'worried'),
    oldman: fig(0.2, 1.2, 180, 'happy', { pose: at_(0.6, null, raise), fall: [3.5, 3.9], fallDir: 1, out: 4.6 }), pk1: fig(3.6, -0.4, -100, 'angry', { pop: 1.8, to: [1.6, 1.4, 2.0, 2.8], pose: at_(3.0, null, aim) }), rifle: HOLD('pk1'), pk2: fig(-3.6, -0.2, 100, 'angry', { pop: 1.8, to: [-1.2, 1.6, 2.0, 2.8] }) },
    hud: pow([['ปัง!', 3.4, 760, 950, '#ffd94a', 140]]), sfx: [[0.6, 'chime'], [1.8, 'zip'], [3.4, 'puff'], [3.8, 'soft']], fx: all(shots([[3.4, 'pk1', 'oldman']]), expr('kat', 'cry', 3.5), expr('peeta', 'cry', 3.5)) },
  d3: { st: 'STAGE', bg: 'night', cam: [0, 0.4, 1.0, -2.4, 4.4, 0.5, 0.2], A: { peeta: fig(0.8, -2.4, -60, 'happy', { sit: true, pose: 'give', say: ['แต่งงานกับผมนะ!', 0.4, 2.0] }), coinP: HOLD('peeta'), kat: fig(-0.8, -2.6, 60, 'giggle', { pose: at_(2.2, null, 'embrace') }),
    cap1: fig(-3.2, 0.2, 160, 'giggle', { pose: at_(2.0, null, 'up') }), cap3: fig(3.4, 0.4, 200, 'giggle', { pose: at_(2.0, null, 'up') }) },
    hud: pow([['กรี๊ดดด!!', 2.0, 540, 950, '#ff9ac8', 140]]), sfx: [[0.4, 'chime'], [2.0, 'shimmer'], [3.4, 'soft']], fx: expr('kat', 'worried', 3.6) },
  d4: { st: 'SNOWH', bg: 'palace', fresh: true, cam: [0, 0, 1.0, -2.0, 4.6, 0.5, 0.2], A: { snow: fig(0, -2.6, 0, 'giggle', { pose: 'give' }), slip: HOLD('snow'), pk1: fig(-2.6, -3.0, 20, 'angry'), pk2: fig(2.6, -3.0, -20, 'angry') },
    hud: hudAll(left(24), pow([['ผู้ชนะเก่าเท่านั้น!', 1.6, 540, 950, '#ff7a5a', 100]])), sfx: [[0.4, 'gong'], [1.6, 'bell']] },
  d5: { st: 'REAP', bg: 'ice', fresh: true, cam: [0, 0, 1.0, -1.4, 4.6, 0.55, 0.2], A: { effie: fig(0, -2.6, 0, 'cry', { pose: 'give', say: ['แคทนิส เอเวอร์ดีน', 0.6, 2.6] }), slip: HOLD('effie'), kat: fig(-1.4, 0.6, 180, 'cry'), pk1: fig(3.0, -1.4, -30, 'angry') },
    sfx: [[0.6, 'gong'], [2.8, 'soft']] },
  d6: { cam: [0, 0, 1.0, -0.8, 5.0, 0.55, 0.3], A: { effie: fig(0, -2.6, 0, 'worried', { pose: 'give', say: ['เฮย์มิทช์ อาเบอร์นาธี!', 0.2, 1.6] }), haym: fig(1.4, 0.6, 180, 'sleepy', { pose: during(1.0, 1.8, 'shrug', null) }), bottle: HOLD('haym'),
    peeta: fig(2.8, 1.2, 160, 'angry', { pose: at_(2.0, null, raise), say: ['ผมอาสา!', 2.2, 99, true] }), kat: fig(-1.4, 0.6, 180, 'cry') },
    sfx: [[0.2, 'bell'], [1.2, 'tok'], [2.2, 'bell']], fx: expr('kat', 'worried', 2.4) },
  d7: { st: 'TRAIN', bg: 'hall', fresh: true, cam: [0, 0, 1.0, -1.4, 5.6, 0.6, 0.4], A: { finn: fig(-1.6, -1.0, 40, 'giggle', { pose: during(0.3, 2.2, 'lift', null), say: ['ยินดีที่ได้รู้จัก สาวน้อย', 0.4, 2.2] }), trident: HOLD('finn'), kat: fig(0.4, -0.2, -50, 'worried', { pose: 'hips' }),
    joh: fig(2.2, -1.8, -30, 'angry', { pop: 2.4, pose: 'hips' }), axe: { on: ['joh', 'R', 0, 0.05, 0.05] }, beetee: fig(3.8, -2.6, -30, 'happy', { pop: 2.8 }), wiress: fig(4.6, -1.4, -50, 'happy', { pop: 3.0 }) },
    sfx: [[0.4, 'chime'], [2.4, 'pop'], [2.8, 'pop'], [3.0, 'pop']] },
  d8: { st: 'CLOCK', bg: 'sea', cam: [0, 0, 1.0, -2.0, 5.6, 0.55, 0.4], shake: [2.0, 2.5, 0.12], flash: [2.0, 0.4, 'rgba(160,220,255,'], A: { peeta: fig(0.6, -0.8, 180, 'happy', { to: [0.8, -3.6, 0.2, 1.9], fall: [2.1, 2.5], fallDir: -1 }), kat: fig(-1.4, 0.4, 160, 'worried', { pose: at_(2.0, null, 'reach'), to: [-0.4, -2.4, 2.4, 3.6] }),
    finn: fig(2.6, 0.6, -150, 'worried'), trident: HOLD('finn'), boom: BOOM(0.8, -3.8, 1.2, 2.0, 0.5) },
    hud: pow([['ซ่าาา!!', 2.0, 640, 950, '#9ad8ff', 140]]), sfx: [[0.3, 'tok'], [2.0, 'zap'], [2.4, 'soft']], fx: all(expr('kat', 'cry', 2.2), expr('peeta', 'sleepy', 2.2)) },
  d9: { cam: [0, 0.4, 0.8, -2.4, 3.8, 0.45, 0.3], A: { boom: null, peeta: fig(0.8, -3.6, 90, 'sleepy', { lie: true, p: [0.8, -3.2, 0] }), finn: fig(1.6, -2.4, -150, 'worried', { pose: (c, r, t) => { c.userData.arms.L.rotation.set(-1.0 - Math.max(0, Math.sin(t * 9)) * 0.4, 0, 0.3); c.userData.arms.R.rotation.set(-1.0 - Math.max(0, Math.sin(t * 9)) * 0.4, 0, -0.3); } }),
    kat: fig(-0.6, -2.4, 140, 'cry', { pose: 'cry' }) },
    hud: pow([['เฮือก!', 2.6, 540, 950, '#ffffff', 120]]), sfx: [[0.4, 'tok'], [1.0, 'tok'], [1.6, 'tok'], [2.6, 'chime']], fx: all(expr('peeta', 'worried', 2.6), expr('kat', 'happy', 2.8), expr('finn', 'giggle', 2.8)) },
  d10: { st: 'JUNGLE', bg: 'forest', cam: [0, 0.6, 1.0, -0.6, 5.6, 0.55, 0.5], A: { fog: { p: [-4.0, -1.0], to: [1.6, 0.0, 0.2, 4.4] }, finn: fig(-1.0, 0.0, 70, 'angry', { to: [4.4, 1.0, 0.2, 3.2], pose: 'hold' }), wiress: { on: ['finn', 'x', 0, 0.6, 0.3], lie: true },
    kat: fig(-1.8, 0.8, 70, 'cry', { to: [3.8, 2.0, 0.4, 3.4], pose: flail }), peeta: fig(-2.4, -0.4, 70, 'worried', { to: [3.2, 0.6, 0.6, 3.6] }) },
    hud: pow([['หนีเร็ว!!', 1.0, 540, 950, '#f0f0e0', 130]]), sfx: [[0.3, 'puff'], [1.0, 'zip'], [2.0, 'puff']],
    fx: all(drift('fog', 1.2), (r, t, s, o) => { const f = o.finn, w = o.wiress, p = H.pos(f, 0.95); w.position.set(p.x, p.y, p.z); w.rotation.set(-Math.PI / 2, f.rotation.y + Math.PI / 2, 0, 'YXZ'); }) },
  d11: { st: 'JUNGLE', bg: 'forest', fresh: true, cam: [0, 0, 1.0, -0.8, 5.4, 0.55, 0.4], A: Object.assign({ kat: fig(-1.8, 0.4, 40, 'angry', { pose: bowP }), peeta: fig(0.6, 0.6, -20, 'angry', { pose: swing }), knife: HOLD('peeta'), finn: fig(2.4, 0.2, -40, 'angry', { pose: swing }), trident: HOLD('finn'),
    mk1: { p: [-1.6, -3.6, 3.0], to: [-0.6, -1.2, 0.6, 1.4, 0], fall: [1.9, 2.3], out: 3.0 }, mk2: { p: [2.6, -4.0, 3.4], to: [1.6, -0.8, 1.0, 1.8, 0], fall: [2.6, 3.0], out: 3.6 }, mk3: { p: [0.6, -4.6, 3.6], to: [0.4, -1.6, 1.6, 2.4, 0], fall: [3.4, 3.8], out: 4.4 } }, BOWH),
    hud: pow([['เจี๊ยกๆๆ!!', 0.8, 540, 950, '#ffb04a', 130]]), sfx: [[0.6, 'zip'], [1.8, 'zip'], [2.6, 'puff'], [3.4, 'puff']], fx: all(bowFx(), shots([[1.8, 'kat', 'mk1', 'trA']])) },
  d12: { st: 'CLOCK', bg: 'sea', fresh: true, cam: [0, 0, 0.9, -1.0, 4.8, 0.5, 0.3], A: Object.assign({ kat: fig(-1.6, -0.4, 40, 'worried', { pose: at_(1.2, 'think', 'point'), say: ['มันคือนาฬิกา!', 1.6, 3.4] }), beetee: fig(0.6, -0.8, -40, 'giggle'), peeta: fig(1.8, 0.2, -60, 'worried') }, BOWH),
    hud: clockHud(1.0), sfx: [[1.0, 'chime'], [1.6, 'bell'], [2.4, 'tok'], [3.2, 'tok']], fx: bowFx() },
  d13: { cam: [0, 0, 1.0, -2.2, 5.0, 0.55, 0.4], A: { kat: fig(-1.6, -0.4, 40, 'happy'), beetee: fig(0.4, -1.0, 30, 'giggle', { pose: 'hold', say: ['ฟ้าผ่าตอนเที่ยงคืน', 0.4, 2.2] }), wire: { p: [0, 0] }, peeta: fig(1.8, 0.2, -60, 'happy'), gY: { p: [0, 0] } },
    sfx: [[0.4, 'zap'], [2.4, 'shimmer']], fx: all((r, t, s, o, st) => { aimBeam(o.wire, H.hand(o.beetee, 'R'), H.at(st, 0.6, 3.2, -6.4), 1); }, glowAt('gY', 'beetee', 1.0, 0.4, null, 4)) },
  d14: { bg: 'storm', cam: [0, 0, 1.0, -1.0, 4.4, 0.5, 0.2], A: Object.assign({ beetee: null, peeta: null, gY: null, kat: fig(-0.4, -0.2, 30, 'angry', { pose: during(0, 1.6, 'hold', at_(2.4, null, (c) => { bowP(c); c.userData.arms.L.rotation.set(-2.6, 0, 0.05); c.userData.arms.R.rotation.set(-2.5, 0, -0.6); })) }),
    wire: { p: [0, 0] } }, BOWH), flash: [0.6, 0.2, 'rgba(220,230,255,'],
    hud: pow([['ลวดขาด!', 0.4, 540, 950, '#ff7a5a', 120]]), sfx: [[0.4, 'zap'], [1.6, 'tok'], [2.6, 'zip']], fx: all(bowFx(), (r, t, s, o, st) => { o.wire.visible = r > 1.0; if (o.wire.visible) aimBeam(o.wire, H.hand(o.kat, 'R'), H.at(st, -3.0, 0.1, 2.0), 1); }) },
  d15: { cam: [0, 0, 2.6, -3.0, 7.0, 0.5, 0.3], shake: [1.2, 4.0, 0.2], flash: [[1.0, 0.5, 'rgba(220,230,255,'], [1.4, 0.8]], A: { wire: null, kat: fig(-0.4, -0.2, 30, 'cry', { fall: [1.6, 2.2], fallDir: -1 }), dome: { p: [0, -6], out: 1.6 }, bolt: { p: [0, 0] }, trA: { p: [0, 0] },
    boom3: BOOM(0, -6, 18, 1.2, 1.6), boom2: BOOM(-6, -10, 12, 1.5, 1.4), puff2: { p: [6, -12, 14], pop: 1.7 } },
    hud: pow([['ตู้มมม!!', 1.2, 540, 900, '#e0f0ff', 170], ['เพล้ง!!', 2.0, 760, 1250, '#9ad8ff', 130]]), sfx: [[0.3, 'zip'], [1.0, 'zap'], [1.2, 'puff'], [1.4, 'gong'], [2.0, 'puff']],
    fx: all(flyK('bolt', lin('CLOCK', [0.6, 30, -6.4], [0.6, 2, -6.4], 0.6, 1.0), 0.6, 1.2), (r, t, s, o, st) => { o.trA.visible = r > 0.2 && r < 1.2; if (o.trA.visible) aimBeam(o.trA, H.hand(o.kat, 'R'), H.at(st, 0, 22, -6), U.clamp((r - 0.2) / 0.8)); }) },
  d16: { st: 'HOVER', bg: 'night', cam: [0, 0, 0.9, -1.4, 4.4, 0.5, 0.3], A: { kat: fig(-1.6, -2.2, 90, 'sleepy', { lie: true, p: [-1.6, -2.2, 0.5] }), plut: fig(0.6, -1.4, -60, 'giggle', { pop: 1.2, pose: 'hips' }), haym: fig(2.0, -2.2, -60, 'worried', { pop: 1.6 }) },
    sfx: [[0.4, 'soft'], [1.2, 'pop'], [2.6, 'chime']], fx: (r, t, s, o) => { if (r > 2.4) { o.kat.userData.setExpr('worried'); } } },
  d17: { cam: [0, 0, 0.9, -1.6, 3.8, 0.45, 0.2], A: { kat: fig(-1.2, -1.6, 50, 'worried'), plut: fig(0.6, -1.6, -50, 'giggle', { pose: 'whisper', say: ['ผมอยู่ฝั่งกบฏ', 0.3, 2.2] }), haym: fig(2.0, -2.4, -50, 'happy', { pose: 'hips' }), finn: fig(-2.8, -2.6, 40, 'giggle', { pop: 2.4 }) },
    hud: pow([['สายลับ!', 1.2, 540, 950, '#ffd94a', 130]]), sfx: [[0.3, 'tok'], [1.2, 'bell'], [2.4, 'pop']], fx: expr('kat', 'angry', 2.8) },
  d18: { st: 'RUIN12', bg: 'fire', cam: [0, 0, 1.0, -1.6, 5.4, 0.55, 0.3], A: { gale: fig(1.4, -0.6, -40, 'cry', { say: ['เขต 12 ไม่เหลือแล้ว', 0.6, 2.6] }), kat: fig(-0.8, -0.2, 30, 'cry', { pose: 'cry' }), fire2: { p: [-4.6, -3.6] }, fire: { p: [4.0, -4.6] }, puff2: { p: [0, -6, 3] }, peeta: { p: [0, -40], hide: true } },
    sfx: [[0.3, 'soft'], [0.6, 'gong']] },
});
/* =========== ภาค 5 Mockingjay 1 =========== */
Object.assign(SC, {
  e1: { st: 'D13', bg: 'hall', cam: [0, 0, 1.0, -1.6, 5.4, 0.55, 0.3], A: { coin: fig(0, -3.6, 0, 'happy', { pose: 'hips' }), s1: fig(-2.6, -1.6, 40, 'happy', { pose: raise }), s2: fig(2.6, -1.6, -40, 'happy', { pose: raise }), s3: fig(-3.8, -0.4, 50, 'happy', { pose: raise }),
    kat13: fig(0, 2.6, 180, 'worried', { to: [0, 0.2, 0.2, 2.4] }), gale: fig(1.2, 3.0, 180, 'happy', { to: [1.4, 0.8, 0.4, 2.6] }) },
    sfx: [[0.3, 'gong'], [2.6, 'tok']] },
  e2: { cam: [0, 0, 1.0, -0.6, 4.6, 0.5, 0.3], A: { s1: null, s2: null, s3: null, gale: null, coin: fig(2.6, -2.6, -40, 'worried'), kat13: fig(-0.6, -0.4, 0, 'worried', { pose: 'up', say: ['ประชาชน… แห่งพาเน็ม…', 0.4, 2.6] }), haym: fig(-3.0, 0.8, 60, 'sick', { pose: at_(2.4, null, 'think') }), plut: fig(1.6, 0.6, -40, 'worried', { pose: at_(2.8, null, 'shrug') }) },
    hud: pow([['คัท!!', 3.0, 540, 950, '#ff7a5a', 150]]), sfx: [[0.4, 'tok'], [2.4, 'soft'], [3.0, 'bell']], fx: (r, t, s, o) => { o.kat13.position.y += Math.sin(t * 30) * 0.01; } },
  e3: { cam: [0, -1.0, 1.0, -0.2, 3.8, 0.45, 0.2], A: { haym: fig(-2.4, 0.4, 60, 'giggle', { pose: 'point', say: ['ปล่อยเธอเป็นตัวเองเถอะ', 0.3, 2.6] }), kat13: fig(-0.6, -0.4, -60, 'happy'), coin: fig(1.2, -1.4, -60, 'worried', { pose: at_(2.8, null, 'shrug') }) },
    sfx: [[0.3, 'tok'], [2.8, 'pop']] },
  e4: { st: 'D8', bg: 'day', cam: [0, 0, 1.0, -1.2, 5.6, 0.6, 0.4], shake: [2.2, 4.0, 0.14], flash: [2.2, 0.4], A: { kat13: fig(-0.6, -0.4, 0, 'happy', { pose: at_(2.4, 'wave', 'cry') }), f1: fig(-2.6, -1.8, 0, 'happy', { sit: true }), f2: fig(2.8, -2.0, 0, 'happy', { sit: true }), gale: fig(1.4, 0.4, -30, 'happy'),
    jet1: { p: [0, 0] }, jet2: { p: [0, 0] }, boom3: BOOM(0.4, -4.4, 2.0, 2.2, 1.4), puff2: { p: [0.4, -4.4, 3.4], pop: 2.6 }, fire2: { p: [0.4, -4.2], pop: 2.4 } },
    hud: pow([['ตู้มม!!', 2.2, 540, 900, '#ffb04a', 160]]), sfx: [[0.3, 'chime'], [1.4, 'zip'], [2.2, 'puff'], [2.4, 'gong']],
    fx: all(flyK('jet1', lin('D8', [-26, 9, -10], [24, 10, -6], 1.0, 3.0), 1.0, 3.0, true), flyK('jet2', lin('D8', [-30, 10, -14], [20, 11, -9], 1.4, 3.6), 1.4, 3.6, true), expr('f1', 'cry', 2.3), expr('f2', 'cry', 2.3)) },
  e5: { cam: [0, 0, 2.6, 0.0, 6.6, 0.35, 0.6], shake: [2.4, 3.6, 0.16], flash: [2.4, 0.5], A: Object.assign({ f1: null, f2: null, kat13: fig(-0.6, 0.8, 20, 'angry', { pose: bowP }), gale: fig(1.4, 1.2, -20, 'angry', { pose: aim }), rifle: HOLD('gale'),
    jet1: { p: [0, 0] }, jet2: { p: [0, 0] }, boom2: BOOM(-2, -14, 9, 2.4, 1.0), boom3: BOOM(5, -15, 10, 3.0, 1.2), puff2: { p: [-2, -10, 5], pop: 2.8 } }, { bow: HOLD('kat13', 'L', 0, 0.1) }),
    hud: pow([['ตู้ม!!', 2.4, 400, 800, '#ffb04a', 150], ['ร่วง!!', 3.0, 760, 900, '#ffd94a', 140]]), sfx: [[0.6, 'zip'], [1.6, 'zip'], [2.4, 'puff'], [3.0, 'puff'], [3.4, 'gong']],
    fx: all(bowFx('kat13'), shots([[1.4, 'kat13', [-2, 9, -14], 'trA'], [2.0, 'kat13', [5, 10, -15], 'trA']]), flyK('jet1', qb('D8', [-24, 10, -14], [-6, 10, -14], [-2, 0.5, -10], 0.2, 3.0), 0.2, 2.6, true), flyK('jet2', qb('D8', [26, 11, -16], [8, 10, -15], [6, 0.5, -12], 0.4, 3.4), 0.4, 3.1, true)) },
  e6: { st: 'WOODS', bg: 'dusk', fresh: true, cam: [0, 0, 0.9, -2.2, 4.8, 0.5, 0.3], A: { kat13: fig(-0.4, -2.6, 0, 'happy', { sit: true, pose: 'hold' }), gale: fig(2.6, -1.4, -60, 'happy', { pose: 'hips' }), bird1: { p: [0, 0] }, bird2: { p: [0, 0] }, bird3: { p: [0, 0] } },
    sfx: [[0.3, 'chime'], [1.4, 'shimmer'], [2.6, 'chime'], [3.6, 'shimmer']],
    fx: all(notes('kat13', 0.3), (r, t, s, o, st) => { ['bird1', 'bird2', 'bird3'].forEach((k, i) => { const a = t * 0.8 + i * 2.1; o[k].position.copy(H.at(st, Math.cos(a) * 3.2, 3.2 + Math.sin(a * 2) * 0.4, -3.0 + Math.sin(a) * 1.6)); o[k].rotation.y = -a; }); }) },
  e7: { st: 'STAGE', bg: 'night', fresh: true, cam: [0, 0.4, 1.0, -2.6, 4.0, 0.45, 0.2], A: { peeta: fig(0.6, -3.0, 0, 'sick', { sit: true, say: ['หยุดยิงเถอะ…', 0.4, 2.6] }), snow: fig(-1.6, -3.4, 30, 'giggle', { pose: 'hold' }), rose: HOLD('snow', 'R', 0.05, 0.12) },
    sfx: [[0.4, 'soft'], [3.0, 'tok']], fx: (r, t, s, o) => { o.peeta.position.y += Math.sin(t * 20) * 0.01; } },
  e8: { st: 'DAM', bg: 'night', cam: [0, 0, 1.6, -2.4, 6.6, 0.55, 0.4], shake: [1.6, 3.6, 0.18], flash: [1.6, 0.5], A: { f1: fig(-1.6, 0.4, 150, 'angry', { pose: during(0, 1.2, 'hold', 'fist'), to: [-4.4, 2.4, 1.2, 2.4] }), f2: fig(0.6, 0.6, 180, 'angry', { to: [2.6, 2.6, 1.2, 2.4] }), f3: fig(2.6, 0.2, 200, 'angry', { to: [5.4, 2.2, 1.2, 2.4] }),
    boom3: BOOM(0, -7.0, 2.4, 1.6, 1.4), wallW: { p: [0, -8.4], pop: 2.0 }, puff2: { p: [0, -7, 3], pop: 1.8 } },
    hud: hudAll((g, r, t, W, HH) => { if (r > 3.4) { g.fillStyle = 'rgba(4,6,20,' + (0.55 * U.clamp((r - 3.4) / 0.3)) + ')'; g.fillRect(0, 0, W, HH); } }, pow([['บึ้มมม!!', 1.6, 540, 900, '#ffb04a', 160], ['ไฟดับ!', 3.4, 540, 1150, '#9fd8ff', 120]])), sfx: [[0.3, 'tok'], [1.6, 'puff'], [1.8, 'gong'], [2.4, 'zip'], [3.4, 'soft']],
    fx: (r, t, s, o) => { if (o.wallW.userData.setH) o.wallW.userData.setH(U.clamp((r - 2.0) / 1.4) * 4); } },
  e9: { st: 'STAGE', bg: 'night', fresh: true, cam: [0, 0.4, 1.0, -2.6, 4.0, 0.45, 0.2], shake: [1.8, 2.6, 0.12], A: { peeta: fig(0.6, -3.0, 0, 'angry', { pose: during(0.3, 1.8, 'point', flail), say: ['เขต 13 จะโดนถล่ม!', 0.3, 1.8, true] }), pk1: fig(2.6, -2.4, -60, 'angry', { pop: 1.6, to: [1.4, -2.8, 1.6, 2.2] }),
    snow: fig(-1.6, -3.4, 30, 'angry', { pose: 'point' }) },
    hud: pow([['ผัวะ!', 2.2, 640, 1000, '#ffffff', 130]]), sfx: [[0.3, 'bell'], [1.6, 'pop'], [2.2, 'puff'], [3.0, 'soft']], fx: expr('peeta', 'cry', 2.2) },
  e10: { st: 'D13', bg: 'night', fresh: true, cam: [0, 0, 1.0, -1.4, 4.8, 0.5, 0.3], dim: 0.35, shake: [0.4, 4.6, 0.12], flash: [[1.0, 0.2, 'rgba(255,200,140,'], [2.6, 0.2, 'rgba(255,200,140,']], A: { kat13: fig(-0.6, -0.4, 30, 'cry', { sit: true, pose: 'embrace' }), prim: fig(0.2, -0.6, -40, 'cry', { sit: true, pose: 'cry' }),
    coin: fig(2.4, -2.2, -30, 'worried'), s1: fig(-2.8, -2.0, 30, 'worried'), puff: { p: [0, -4.0, 5.2], pop: 1.0 }, puff2: { p: [-3, -4.4, 5.6], pop: 2.6 } },
    hud: pow([['ตึงง!!', 1.0, 300, 900, '#ffb04a', 120], ['ตึงงง!!', 2.6, 780, 950, '#ffb04a', 130]]), sfx: [[1.0, 'puff'], [2.6, 'puff'], [3.6, 'soft']] },
  e11: { st: 'CAPN', bg: 'night', cam: [0, 0, 1.0, -0.6, 5.0, 0.55, 0.4], A: { gale: fig(-4.0, 0.6, 90, 'angry', { to: [-0.6, 0.2, 0.2, 1.6], pose: at_(1.8, null, 'hold') }), s1: fig(-5.2, 1.2, 90, 'angry', { to: [-2.0, 1.0, 0.4, 1.8], pose: aim }), rifle: HOLD('s1'),
    peeta: fig(0.6, -0.4, -90, 'sleepy', { sit: true, out: 2.2 }), peetaC: { p: [0, 0], hide: true }, ship: { p: [0, 0] } },
    hud: pow([['ได้ตัวแล้ว!', 2.4, 540, 950, '#ffd94a', 120]]), sfx: [[0.3, 'zip'], [1.8, 'pop'], [2.4, 'bell'], [3.0, 'zip']],
    fx: flyK('ship', qb('CAPN', [-14, 6, -8], [-2, 4, -4], [12, 9, -10], 2.4, 4.4), 2.4, 4.4, true) },
  e12: { st: 'D13', bg: 'hall', fresh: true, cam: [0, 0, 0.9, -1.4, 4.0, 0.45, 0.2], shake: [1.8, 3.0, 0.08], A: { cot: { p: [0.8, -1.8] }, peeta: fig(0.8, -1.8, -60, 'sleepy', { sit: true, pose: at_(1.6, null, choke), to: [0.2, -1.4, 1.6, 1.9] }),
    kat13: fig(-1.6, -0.2, 60, 'happy', { to: [-0.6, -1.0, 0.2, 1.4], pose: at_(1.6, 'reach', flail) }), s1: fig(-2.8, -2.2, 40, 'worried', { pop: 2.6, to: [-0.4, -2.2, 2.6, 3.2] }) },
    hud: pow([['อึก!!', 1.8, 400, 950, '#ff7a5a', 140]]), sfx: [[0.3, 'zip'], [1.6, 'puff'], [2.6, 'pop']], fx: all(expr('peeta', 'angry', 1.5), expr('kat13', 'cry', 1.8)) },
  e13: { cam: [0, 0, 1.0, -2.4, 5.0, 0.55, 0.3], A: { cot: null, peeta: fig(-2.6, -1.6, 60, 'angry', { pose: guard }), s1: fig(-3.4, -0.8, 60, 'worried', { pose: 'hold' }), kat13: fig(-0.4, -0.6, -10, 'cry'),
    coin: fig(1.6, -3.2, -20, 'angry', { pose: 'point', say: ['บุกแคปิตอล!', 1.8, 99, true] }), gale: fig(2.8, -1.4, -40, 'angry', { pose: at_(2.4, null, raise) }) },
    sfx: [[0.3, 'soft'], [1.8, 'bell'], [2.4, 'gong']] },
});
/* =========== ภาค 6 Mockingjay 2 =========== */
Object.assign(SC, {
  f1: { st: 'MTN', bg: 'war', cam: [0, 0, 2.0, -4.0, 7.6, 0.6, 0.4], shake: [1.6, 4.0, 0.2], flash: [1.6, 0.5], A: { gale: fig(-1.4, 0.6, 0, 'angry', { pose: during(0.3, 1.6, 'point', 'up') }), s1: fig(0.4, 1.0, 0, 'angry', { pose: aim }), rifle: HOLD('s1'), s2: fig(2.0, 0.8, 0, 'angry'),
    boom3: BOOM(-3, -18, 6, 1.6, 1.6), boom2: BOOM(4, -16, 10, 2.0, 1.4), puff2: { p: [0, -14, 4], pop: 2.2 }, puff: { p: [-4, -12, 3], pop: 2.6 } },
    hud: pow([['ถล่ม!!', 1.6, 540, 900, '#ffb04a', 170]]), sfx: [[0.3, 'tok'], [1.6, 'puff'], [2.0, 'puff'], [2.2, 'gong'], [3.0, 'puff']] },
  f2: { cam: [0, 0, 1.0, -0.8, 5.0, 0.55, 0.4], flash: [1.0, 0.3], A: { boom3: null, boom2: null, puff2: null, puff: null, kat13: fig(-0.6, 0.0, 40, 'angry', { fall: [1.1, 1.5], fallDir: -1, pose: at_(2.6, null, 'up') }),
    f1: fig(2.6, -1.4, -100, 'angry', { pose: aim, out: 2.0 }), pistol: HOLD('f1'), gale: fig(-2.4, 0.8, 60, 'worried'), s1: fig(1.2, 1.4, -60, 'happy', { pop: 2.6, pose: 'up' }), s2: fig(-3.6, 1.6, 40, 'happy', { pop: 2.6, pose: 'up' }) },
    hud: pow([['ปัง!', 1.0, 760, 950, '#ffd94a', 140]]), sfx: [[1.0, 'puff'], [1.4, 'soft'], [2.6, 'bell'], [2.8, 'shimmer']], fx: all(shots([[1.0, 'f1', 'kat13']]), (r, t, s, o) => { if (r > 2.4) { o.kat13.rotation.z = 0; o.kat13.userData.setExpr('angry'); } }) },
  f3: { st: 'CAPST', bg: 'dusk', fresh: true, cam: [0, 0, 1.0, -0.6, 5.6, 0.6, 0.4], A: { kat13: fig(-0.6, 1.6, 180, 'worried', { to: [-0.4, -0.4, 0.2, 3.0] }), gale: fig(0.8, 2.0, 180, 'worried', { to: [1.0, 0.0, 0.3, 3.2], pose: 'hold' }), rifle: HOLD('gale'), s1: fig(-1.8, 2.4, 180, 'angry', { to: [-1.8, 0.6, 0.4, 3.2] }),
    lbX: { p: [-3.0, -2.0, 0.6], pop: 1.4 }, gR: { p: [3.2, -1.6, 0.3] } },
    sfx: [[0.3, 'tok'], [1.4, 'pop'], [2.4, 'zap']], fx: (r, t, s, o) => { o.gR.scale.setScalar(o.gR.userData.s0 * (0.8 + Math.max(0, Math.sin(t * 6)) * 0.6)); } },
  f4: { cam: [0, 0, 1.0, -0.8, 5.0, 0.55, 0.3], A: { lbX: null, gR: null, s1: null, kat13: fig(-1.6, -0.4, 40, 'worried'), gale: fig(-0.2, -0.8, 20, 'angry'), peetaA: fig(1.4, -0.2, -30, 'sick', { pose: 'hold', pop: 0.6 }), finn: fig(2.8, -1.2, -40, 'happy', { pop: 1.2 }), trident: HOLD('finn'),
    s2: fig(-3.4, 0.6, 40, 'happy', { pose: 'hold', pop: 1.8 }), rec: HOLD('s2', 'R') },
    sfx: [[0.6, 'pop'], [1.2, 'pop'], [1.8, 'pop'], [2.8, 'tok']], fx: expr('kat13', 'cry', 2.6) },
  f5: { cam: [0, 0, 1.0, -1.0, 5.4, 0.55, 0.4], shake: [0.8, 3.0, 0.1], A: { rec: null, s2: null, turret: { p: [0.6, -2.6], pop: 0.4 }, kat13: fig(-1.6, -0.4, 40, 'cry', { to: [-4.2, 1.4, 0.8, 1.8], pose: flail }), gale: fig(-0.2, -0.8, 20, 'cry', { to: [-2.6, 2.0, 0.9, 2.0], pose: flail }),
    peetaA: fig(1.4, -0.2, -30, 'cry', { to: [3.4, 1.8, 0.9, 2.2] }), finn: fig(2.8, -1.2, -40, 'angry', { to: [4.6, 1.0, 0.9, 2.0] }), s3: fig(0.0, 1.0, 0, 'cry', { fall: [1.6, 2.0], out: 3.0 }) },
    hud: pow([['ปั้งๆๆๆ!', 1.0, 540, 950, '#ffd94a', 130]]), sfx: [[0.4, 'pop'], [1.0, 'puff'], [1.3, 'puff'], [1.6, 'puff'], [2.0, 'puff']],
    fx: (r, t, s, o, st) => { const on = r > 0.9 && r < 2.8, a = H.at(st, 0.6, 1.4, -2.0); ['tr1', 'tr2', 'tr3'].forEach((k, i) => { const tr = o[k]; tr.visible = on && Math.sin(t * 30 + i * 2) > 0; if (tr.visible) aimBeam(tr, a, H.at(st, -3 + i * 2.6 + Math.sin(t * 5) * 1.5, 0.8, 3), 1); }); } },
  f6: { cam: [0, 0, 1.4, -1.0, 6.6, 0.6, 0.5], A: { turret: null, s3: null, tr1: null, wave: { p: [0, -9], to: [0, 2.0, 0.2, 4.0] }, kat13: fig(-0.6, 0.6, 180, 'cry', { to: [-4.8, -4.4, 0.6, 2.6], pose: flail }), gale: fig(0.6, 1.0, 180, 'cry', { to: [-3.4, -4.8, 0.8, 2.8], pose: flail }),
    peetaA: fig(1.8, 0.8, 180, 'cry', { to: [4.8, -4.6, 0.8, 2.8] }), finn: fig(2.8, 1.4, 180, 'angry', { to: [5.6, -4.2, 0.9, 3.0] }) },
    hud: pow([['วิ่ง!!', 0.6, 540, 950, '#ff7a5a', 160]]), sfx: [[0.3, 'zip'], [0.6, 'bell'], [1.4, 'puff'], [2.6, 'puff']], fx: (r, t, s, o) => { o.wave.rotation.y = Math.PI / 2; o.wave.position.y = -0.4; } },
  f7: { st: 'CAPST', bg: 'night', fresh: true, cam: [0, 0, 1.0, -0.6, 4.6, 0.5, 0.3], A: { kat13: fig(-0.4, 0.2, -150, 'angry', { to: [1.6, -2.6, 1.4, 3.8], say: ['ฉันจะไปหาสโนว์เอง', 0.2, 1.6] }), gale: fig(-2.0, 0.8, 120, 'worried', { pose: at_(2.0, null, 'reach') }), bow: HOLD('kat13', 'L', 0, 0.1) },
    sfx: [[0.2, 'tok'], [2.0, 'soft']], fx: bowFx('kat13') },
  f8: { st: 'SEWER', bg: 'night', cam: [0, 0, 1.0, -0.4, 5.4, 0.55, 0.5], A: { kat13: fig(-1.4, 0.4, 70, 'worried', { pose: at_(2.4, null, flail) }), finn: fig(0.2, 0.0, 70, 'worried', { pose: at_(2.0, null, guard) }), trident: HOLD('finn'), peetaA: fig(-2.6, 0.8, 70, 'worried'), gale: fig(-3.4, -0.2, 70, 'worried'),
    mut1: { p: [6.0, -1.0], to: [2.4, -0.4, 1.6, 3.0] }, mut2: { p: [7.0, 0.4], to: [3.0, 0.6, 1.8, 3.2] }, mut3: { p: [6.6, -2.2], to: [3.2, -1.6, 2.0, 3.4] }, gY: { p: [0, 0] } },
    hud: pow([['แฮ่กกก!!', 2.0, 760, 950, '#e8ffe0', 130]]), sfx: [[0.3, 'soft'], [1.6, 'zip'], [2.0, 'zap'], [2.6, 'zip']], fx: all(glowAt('gY', 'peetaA', 1.4, 0, null, 3), expr('kat13', 'cry', 2.4)) },
  f9: { cam: [0, 0.4, 1.0, -0.6, 5.0, 0.55, 0.4], flash: [3.2, 0.4], A: { gY: null, finn: fig(1.4, -0.2, 80, 'angry', { pose: swing, out: 3.2 }), mut1: { p: [2.4, -0.4], f: -90 }, mut2: { p: [2.8, 0.6], f: -90 }, mut3: { p: [2.6, -1.4], f: -100 },
    kat13: fig(-2.6, 0.6, 70, 'cry', { pose: 'reach', to: [-4.4, 1.6, 2.6, 3.4] }), peetaA: fig(-3.6, 1.2, 80, 'cry', { to: [-5.4, 2.0, 2.4, 3.4] }), gale: null, boom2: BOOM(2.4, -0.2, 1.0, 3.2, 1.0) },
    hud: pow([['ฟินนิก!!', 2.6, 400, 900, '#ffd94a', 130]]), sfx: [[0.4, 'puff'], [1.2, 'puff'], [2.6, 'bell'], [3.2, 'puff'], [3.6, 'gong']],
    fx: (r, t, s, o) => { ['mut1', 'mut2', 'mut3'].forEach((k, i) => { o[k].position.x += Math.sin(t * 9 + i) * 0.12; if (r > 3.2) o[k].visible = false; }); } },
  f10: { st: 'CAPN', bg: 'night', fresh: true, cam: [0, 0, 0.9, -0.6, 3.6, 0.45, 0.2], A: { peetaA: fig(0.7, -0.4, -60, 'angry', { pose: during(0, 1.8, flail, 'embrace') }), kat13: fig(-0.7, -0.4, 60, 'cry', { pose: at_(1.4, null, 'embrace') }) },
    sfx: [[0.3, 'soft'], [1.8, 'chime'], [3.0, 'shimmer']], fx: all(expr('peetaA', 'cry', 1.8), expr('kat13', 'happy', 3.0), (r, t, s, o) => { if (r < 1.8) o.peetaA.position.x += Math.sin(t * 30) * 0.02; }) },
  f11: { st: 'PLAZA', bg: 'ice', cam: [0, 0, 1.0, -1.4, 6.2, 0.65, 0.3], A: { k1: fig(-1.2, -1.0, 0, 'cry'), k2: fig(0.2, -1.2, 0, 'worried'), k3: fig(1.6, -1.0, 0, 'cry'), cap1: fig(-3.0, -2.6, 0, 'worried'), cap2: fig(-1.0, -3.4, 0, 'worried'), cap3: fig(1.4, -3.4, 0, 'worried'), cap4: fig(3.2, -2.6, 0, 'cry'),
    pk1: fig(-4.4, -0.6, 40, 'angry', { pose: 'hips' }), pk2: fig(4.4, -0.6, -40, 'angry', { pose: 'hips' }) },
    sfx: [[0.3, 'soft'], [2.4, 'tok']] },
  f12: { cam: [0, 0, 1.6, -1.6, 6.4, 0.6, 0.4], A: { pk1: null, pk2: null, ship: { p: [0, 0] }, chute1: { p: [0, 0] }, chute2: { p: [0, 0] }, chute3: { p: [0, 0] }, k1: fig(-1.2, -1.0, 0, 'happy', { pose: at_(2.0, null, 'reach') }), k2: fig(0.2, -1.2, 0, 'happy', { pose: at_(2.0, null, 'reach') }), k3: fig(1.6, -1.0, 0, 'happy', { pose: at_(2.0, null, 'reach') }),
    primM: fig(-4.6, 2.0, 60, 'worried', { pop: 2.6, to: [-2.4, 0.4, 2.8, 4.4] }), s1: fig(-5.4, 2.6, 60, 'worried', { pop: 2.8, to: [-3.4, 1.0, 3.0, 4.4] }) },
    sfx: [[0.3, 'zip'], [1.0, 'pop'], [1.3, 'pop'], [1.6, 'pop'], [2.8, 'tok']],
    fx: all(flyK('ship', lin('PLAZA', [-20, 10, -6], [20, 11, -8], 0, 2.4), 0, 2.4, true), flyK('chute1', lin('PLAZA', [-1.2, 9, -1.2], [-1.2, 2.0, -1.2], 1.0, 4.4), 1.0, 9), flyK('chute2', lin('PLAZA', [0.4, 10, -1.6], [0.4, 2.4, -1.6], 1.3, 4.6), 1.3, 9), flyK('chute3', lin('PLAZA', [1.8, 9.4, -1.0], [1.8, 2.2, -1.0], 1.6, 4.8), 1.6, 9)) },
  f13: { cam: [0, 0, 1.0, -0.6, 5.8, 0.6, 0.4], shake: [0.6, 2.4, 0.2], flash: [[0.6, 0.6], [1.0, 0.5]], A: { ship: null, chute1: null, chute2: null, chute3: null, k1: null, k2: null, k3: null, cap1: null, cap2: null, cap3: null, cap4: null, s1: null,
    primM: fig(-1.6, 0.0, 30, 'worried', { out: 0.7 }), boom3: BOOM(-0.4, -1.0, 1.6, 0.6, 1.4), boom2: BOOM(1.4, -1.6, 1.2, 1.0, 1.2), fire2: { p: [0, -1.4], pop: 1.4 }, puff2: { p: [0, -1.2, 3], pop: 1.4 },
    kat13: fig(-3.6, 2.4, 140, 'cry', { pop: 1.8, pose: 'reach', say: ['พริม!!', 2.2, 99, true] }) },
    hud: pow([['ตู้มมม!!', 0.6, 540, 900, '#ffb04a', 170]]), sfx: [[0.6, 'puff'], [1.0, 'puff'], [1.2, 'gong'], [2.2, 'bell']] },
  f14: { st: 'SNOWH', bg: 'palace', fresh: true, cam: [0, 0, 1.0, -2.0, 4.2, 0.45, 0.2], A: { snow: fig(0.9, -2.4, -40, 'giggle', { pose: 'hold', say: ['ระเบิดนั่น ไม่ใช่ของผม', 0.4, 2.8] }), rose: HOLD('snow', 'R', 0.05, 0.12), katA: fig(-0.9, -2.0, 40, 'angry'), s1: fig(-2.6, -1.0, 40, 'angry', { pose: aim }), rifle: HOLD('s1') },
    sfx: [[0.4, 'gong'], [3.0, 'tok']], fx: expr('katA', 'worried', 3.0) },
  f15: { cam: [0, 0, 1.0, -1.6, 4.8, 0.5, 0.3], A: { snow: null, rose: null, s1: null, rifle: null, coin: fig(0, -3.0, 0, 'giggle', { pose: 'point', say: ['จัดเกมอีกรอบ ให้เด็กแคปิตอล', 0.4, 2.8] }), katA: fig(-1.6, -0.6, 30, 'angry'), haym: fig(1.6, -0.6, -30, 'worried'), joh: fig(2.8, -1.4, -40, 'giggle', { pose: raise }),
    peetaA: fig(-2.8, -1.2, 40, 'angry', { pose: 'shrug' }) },
    sfx: [[0.4, 'gong'], [2.8, 'tok'], [3.6, 'soft']], fx: expr('katA', 'angry', 3.0) },
  f16: { st: 'PLAZA', bg: 'day', fresh: true, cam: [0, -0.6, 1.2, 0.6, 4.4, 0.4, -0.6], A: Object.assign({ katA: fig(-0.8, 1.2, 180, 'angry', { pose: bowP }), snow: fig(-0.4, -3.2, 0, 'giggle'), coin: fig(1.8, -4.2, 0, 'giggle', { p: [1.8, -4.2, 1.2] }), riser: { p: [1.8, -4.4, 0.6] },
    cap1: fig(-4.0, -0.6, 60, 'worried'), cap2: fig(4.2, -0.4, -60, 'worried'), f1: fig(-3.2, 0.6, 60, 'angry'), f2: fig(3.4, 0.8, -60, 'angry') }, { bow: HOLD('katA', 'L', 0, 0.1) }),
    sfx: [[0.3, 'soft'], [2.4, 'tok']], fx: bowFx('katA') },
  f17: { cam: [0, 0.4, 1.4, -2.0, 6.0, 0.55, 0.5], flash: [1.4, 0.3], A: { katA: fig(-0.8, 1.2, 160, 'angry', { pose: bowP }), coin: fig(1.8, -4.2, 0, 'cry', { p: [1.8, -4.2, 1.2], fall: [1.5, 2.0], fallDir: 1, out: 3.0 }) },
    hud: pow([['ฟึ่บ!!', 1.4, 760, 900, '#ffffff', 140]]), sfx: [[0.6, 'zip'], [1.4, 'puff'], [1.8, 'gong']], fx: all(bowFx('katA'), (r, t, s, o) => { if (r < 1.0) o.katA.rotation.y = Math.PI + U.lerp(0.25, -0.45, U.clamp(r / 1.0)); }, shots([[1.3, 'katA', 'coin', 'trA']]), expr('snow', 'giggle', 1.6)) },
  f18: { cam: [0, 0, 1.0, -2.6, 5.4, 0.55, 0.3], shake: [1.6, 3.4, 0.08], A: { coin: null, riser: null, bow: null, katA: null, snow: fig(-0.4, -3.2, 0, 'giggle', { pose: at_(0.2, 'lift', null), out: 3.0 }), puff2: { p: [-0.4, -3.2, 1.4], pop: 2.4 },
    cap1: fig(-4.0, -0.6, 60, 'angry', { to: [-1.4, -2.8, 1.2, 2.6] }), cap2: fig(4.2, -0.4, -60, 'angry', { to: [0.8, -2.8, 1.2, 2.6] }), f1: fig(-3.2, 0.6, 60, 'angry', { to: [-1.0, -2.0, 1.4, 2.8] }), f2: fig(3.4, 0.8, -60, 'angry', { to: [0.4, -1.8, 1.4, 2.8] }) },
    hud: pow([['ฮ่าๆๆๆ', 0.3, 540, 950, '#e8e8e8', 120]]), sfx: [[0.3, 'tok'], [1.6, 'zip'], [2.4, 'puff'], [3.2, 'gong']] },
  f19: { st: 'SEAM', bg: 'dawn', fresh: true, cam: [0, 0, 0.9, -0.8, 4.2, 0.45, 0.3], A: { katA: fig(-1.6, -0.6, 50, 'sleepy', { sit: true }), peetaA: fig(1.8, 0.2, -120, 'happy', { pop: 0.8, to: [0.6, -1.4, 1.0, 2.0], pose: at_(2.0, 'hold', 'down'), sit: false }),
    fl1: { p: [0.4, -2.0, 0.25], pop: 2.4 }, fl2: { p: [1.0, -2.2, 0.25], pop: 2.7 }, fl3: { p: [-0.2, -2.3, 0.25], pop: 3.0 } },
    sfx: [[0.8, 'pop'], [2.4, 'shimmer'], [3.2, 'chime']], fx: expr('katA', 'happy', 3.0) },
  f20: { st: 'MEADOW', bg: 'day', cam: [0, 0, 0.9, -1.0, 5.0, 0.5, 0.3], A: { katA: fig(-1.4, -1.6, 30, 'happy', { sit: true }), peetaA: fig(0.0, -1.8, -20, 'giggle', { sit: true }), bb1: fig(1.8, -0.2, -40, 'giggle', { pose: 'up' }), bb2: fig(-0.2, 0.6, 20, 'happy', { pose: 'wave' }),
    fl1: { p: [-2.6, -0.4, 0.25] }, fl2: { p: [2.6, -1.2, 0.25] }, fl3: { p: [0.8, 1.0, 0.25] }, goose: { p: [3.4, -2.4], f: -60 } },
    sfx: [[0.3, 'chime'], [1.6, 'pop'], [3.0, 'shimmer']], fx: (r, t, s, o) => { hop(o.bb1, (r % 0.9) + 1, 1, 0.5); } },
  fin: { st: 'REAP', bg: 'dawn', fresh: true, cam: [[0, 0, 0.9, -0.6, 4.4, 0.5, 0.3], [3.0, 0, 1.2, -1.0, 6.0, 0.7, 0.2]], A: { kat: fig(-0.8, 0.2, 20, 'angry', { pose: guard }), prim: fig(-1.4, 1.4, 160, 'cry'), haym: fig(1.8, -1.6, -40, 'happy', { pop: 1.6, pose: at_(3.0, 'hold', 'up') }), bottle: HOLD('haym'), gY: { p: [8, -40, 16], s: 6 } },
    hud: pow([['คนที่ใช่!', 3.0, 540, 950, '#ffd94a', 140]]), sfx: [[0.3, 'chime'], [1.6, 'pop'], [3.0, 'bell'], [3.2, 'shimmer']], fx: (r, t, s, o) => { o.bottle.visible = r < 3.0; } },
  facts: { cam: [0, 0, 1.6, -1.0, 9.0, 1.0, 0.6], A: {}, calm: true },
  next: { cam: [0, 0, 0.9, -0.8, 5.0, 0.5, 0.3], A: { prim: null, bottle: null, kat: fig(-0.8, 0.2, 20, 'happy', { pose: 'wave' }), haym: fig(1.8, -1.6, -40, 'giggle', { pose: 'wave' }) } },
});
/* chapter title beats: the main faces of that film in a row, name tags */
const titleSc = (keys, sub, extra) => { const A = {}, n = keys.length, two = n > 5, n0 = two ? Math.ceil(n / 2) : n; keys.forEach((k, i) => { const row = two && i >= n0 ? 1 : 0, inRow = row ? n - n0 : n0, j = row ? i - n0 : i;
    A[k] = { p: [(j - (inRow - 1) / 2) * (two ? 2.2 : 2.0) + (row ? 0.5 : 0), row ? -2.4 : 0.6, row ? 0.9 : 0], f: 0, ex: 'happy', pop: 0.3 + i * 0.12 }; }); if (two) A.riser = { p: [0, -2.4, 0.9] };
  return { st: 'TITLE', bg: 'hall', calm: true, fresh: true, cam: [0, 0, two ? 1.6 : 0.9, two ? -0.8 : 0.4, two ? 8.2 : 4.4 + n * 0.6, two ? 0.62 : 0.45, 0.0], A: Object.assign(A, extra || {}), hud: hudAll(tagHud(keys.map((k, i) => [k, 0.4 + i * 0.12]), false, 99), subLine(sub)),
    sfx: [[0.1, 'gong']].concat(keys.map((k, i) => [0.3 + i * 0.12, 'pop'])) }; };
const subLine = (tx) => (g, r) => { const a = U.clamp((r - 0.3) / 0.3); if (a <= 0) return; g.save(); g.globalAlpha = a; txt(g, tx, 540, 1640, 44, P.gold, 800); g.restore(); };
Object.assign(SC, {
  p1: titleSc(['snowY', 'lucy', 'sejanus', 'gaul', 'high'], 'ภาค 5 · พรีเควล ฉาย 2023'),
  p2: titleSc(['haymY', 'lenore', 'may', 'ampert', 'beetee', 'snow'], 'ภาค 6 · ภาคล่าสุด ฉาย 2026'),
  p3: titleSc(['kat', 'prim', 'peeta', 'gale', 'haym', 'effie', 'rue', 'cato'], 'ภาค 1 · ฉาย 2012'),
  p4: titleSc(['finn', 'joh', 'wiress', 'plut'], 'ภาค 2 · ฉาย 2013'),
  p5: titleSc(['kat13', 'coin', 'gale', 'haym'], 'ภาค 3 · ฉาย 2014'),
  p6: titleSc(['katA', 'peetaA', 'coin', 'snow'], 'ภาค 4 · ฉาย 2015'),
});
SC.p6.A.coin.ex = 'angry'; SC.p6.A.snow.ex = 'angry';
/* role cards: name + one-line role under the feet, the first time a character appears in the story (title beats excluded) */
const ROLE = { snowY: ['คอริโอเลนัส สโนว์', 'สโนว์ตอนหนุ่ม อายุ 18'], lucy: ['ลูซี่ เกรย์', 'นักร้องสาวจากเขต 12'], sejanus: ['เซจานัส', 'เพื่อนซี้ ลูกเศรษฐี'], gaul: ['ดร.กอล', 'หัวหน้าผู้คุมเกม'], high: ['ไฮบอตทอม', 'คณบดีโรงเรียน'],
  mayfair: ['เมย์แฟร์', 'ลูกสาวนายกเทศมนตรี'], dill: ['เด็กเขต 11', 'บรรณาการที่ใจดีที่สุด'], pk1: ['ทหารแคปิตอล', 'คุมทุกเขต'], snow: ['ประธานาธิบดีสโนว์', 'ผู้ปกครองพาเน็ม'],
  haymY: ['เฮย์มิทช์', 'ตอนอายุ 16'], lenore: ['ลีนอร์ โดฟ', 'แฟนของเฮย์มิทช์'], sid: ['ซิด', 'น้องชายเฮย์มิทช์'], plut: ['พลูทาร์ค', 'หัวหน้าผู้คุมเกมคนใหม่'], louella: ['ลูเอลลา', 'เพื่อนร่วมเขต 12'], loulou: ['ลูลู่', 'คนหน้าเหมือนลูเอลลา'],
  may: ['เมย์ซิลี', 'สาวเขต 12 ปากร้าย'], ampert: ['แอมเพิร์ต', 'ลูกชายบีที'], beetee: ['บีที', 'อัจฉริยะเขต 3'], silka: ['ซิลก้า', 'บรรณาการสายโหด'],
  kat: ['แคทนิส', 'นักธนูเขต 12 อายุ 16'], gale: ['เกล', 'เพื่อนซี้นักล่า'], prim: ['พริม', 'น้องสาวแคทนิส'], effie: ['เอฟฟี่', 'คนจับฉลากเขต 12'], peeta: ['พีต้า', 'ลูกคนทำขนมปัง'], haym: ['เฮย์มิทช์', 'ผู้ชนะปี 50 ตอนนี้ขี้เมา'],
  cato: ['เคโต้', 'หัวหน้าพวกตัวเก่ง'], rue: ['รู', 'เด็กหญิงเขต 11 อายุ 12'], thresh: ['ธรีช', 'หนุ่มยักษ์เขต 11'], c2: ['พวกตัวเก่ง', 'ฝึกมาตั้งแต่เด็ก'],
  finn: ['ฟินนิก', 'ผู้ชนะจากเขต 4'], joh: ['โจฮันนา', 'ผู้ชนะจากเขต 7'], wiress: ['ไวเรส', 'อัจฉริยะเขต 3'], coin: ['ประธานาธิบดีคอยน์', 'ผู้นำเขต 13'], kat13: ['แคทนิส', ''], oldman: ['ชายแก่เขต 11', ''] };
const PID = { katA: 'kat', kat13: 'kat', peetaA: 'peeta', primM: 'prim', beeteeO: 'beetee', c1: 'c2', c3: 'c2' };
const card = (g, k, x, y, a, role) => { const rw = ROLE[k] || ROLE[PID[k]]; if (!rw) return; const [nm, rl] = rw, two = role && rl; g.save(); g.globalAlpha = a; g.font = F(700, 30); let w = g.measureText(nm).width; if (two) { g.font = F(600, 25); w = Math.max(w, g.measureText(rl).width); } w += 40;
  g.fillStyle = 'rgba(15,22,48,.88)'; rr(g, x - w / 2, y - 24, w, two ? 84 : 48, 22); g.fill(); g.strokeStyle = P.teal; g.lineWidth = 3; g.stroke(); txt(g, nm, x, y + 1, 30, '#fff', 700); if (two) txt(g, rl, x, y + 37, 25, P.gold, 600); g.restore(); };
function tagHud(tags, role, dur) { return (g, r, t, W, HH) => { const d = window.__dbg; if (!d || !d.camera) return; const v = new T.Vector3();
  const put = []; tags.forEach(([k, t0]) => { const a = U.clamp((r - t0) / 0.2) * U.clamp((t0 + (dur || 2.8) - r) / 0.3); if (a <= 0) return; const o = d.s[k]; if (!o || !o.visible) return; o.getWorldPosition(v); v.project(d.camera); if (v.z > 1) return;
    const x = U.clamp((v.x + 1) / 2 * W, 150, W - 150); let y = Math.min((1 - v.y) / 2 * HH + 38, 1780); const hh = role ? 96 : 58; for (let n = 0; role && n < 6 && put.some((q) => Math.abs(q[0] - x) < 250 && Math.abs(q[1] - y) < hh); n++) y += hh;
    put.push([x, y]); card(g, k, x, y, a, role); }); }; }
(() => { const ids = BEATS.map((b) => b[0]), seen = new Set(['kat']); ids.forEach((id) => { const sc = SC[id]; if (!sc || !sc.A || /^p\d$/.test(id) || id === 'cover') return; const tags = [];
  if (id === 'c1') seen.delete('kat');
  for (const k in sc.A) { const a = sc.A[k]; const pid = PID[k] || k; if (!a || !(ROLE[k] || ROLE[pid]) || seen.has(pid)) continue; const t0 = Math.max(0.3, (a.pop || 0) + 0.15) + tags.length * 0.5; if (a.out != null && a.out < t0 + 1.0) continue; seen.add(pid); tags.push([k, t0]); }
  if (tags.length) { const h = tagHud(tags, true, 2.8); sc.hud = sc.hud ? hudAll(sc.hud, h) : h; } }); })();
/* portrait framing: pull every camera back for the vinyl cast */
(() => { const K = 2.25; const sc1 = (c) => { c[2] += 1.6; c[4] *= K * 1.12; c[5] *= K * 1.3; c[6] *= K; }; for (const id in SC) { const c = SC[id].cam; if (!c) continue; if (typeof c[0] === 'number') sc1(c); else c.forEach(sc1); } })();
/* readability: figures turned fully sideways face the camera a little more */
(() => { const FIG = new Set(['snowY', 'snow', 'lucy', 'sejanus', 'gaul', 'high', 'mayfair', 'haymY', 'haym', 'lenore', 'may', 'ampert', 'beetee', 'louella', 'loulou', 'silka', 'plut', 'sid', 'kat', 'katA', 'kat13', 'prim', 'primM', 'peeta', 'peetaA', 'gale', 'effie', 'rue', 'cato', 'thresh', 'finn', 'joh', 'wiress', 'coin', 'c1', 'c2', 't1', 't2', 't3', 't4', 't5', 't6', 'dill', 'pk1', 'pk2', 's1', 's2', 's3', 'f1', 'f2', 'f3', 'f4', 'oldman', 'cap1', 'cap2', 'cap3', 'cap4']);
  for (const id in SC) for (const k in (SC[id].A || {})) { const a = SC[id].A[k]; if (!a || !FIG.has(k) || typeof a.f !== 'number' || a.on || a.sit || a.lie) continue; if (a.f >= 80 && a.f <= 120) a.f = 62; else if (a.f <= -80 && a.f >= -120) a.f = -62; } })();
EP.light = 1.4;
