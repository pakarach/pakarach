/* สรุปหนัง The Matrix ภาค 1-4 (1999-2021) — one long vinyl-chibi recap. No actor likeness (no bald head, pince-nez, long hair + beard), no film costumes (no black long coat,
   dark glasses or latex), no green code rain (a teal grid instead), no film ship/Sentinel/APU/machine designs (generic lander, red light streaks, turrets, a swirl of lights), no score, no famous frame recreated. */
const EP = {
  no: 5, file: 'the-matrix-1-4-recap', title: 'สรุปหนัง The Matrix ภาค 1-4', series: 'สรุปหนัง',
  cover: [[56, 'สปอยล์ The Matrix ภาค 1-4', 'teal'], [96, 'ชายคนเดียวที่ช่วยโลกได้', 'gold'], [104, 'ต้องตาย 2 ครั้ง', 'w'], [80, 'แล้วยังโดนเสียบปลั๊กใหม่', 'coral']],
  chap: [['ยาแดง', 'a1', 'a11'], ['ไม่มีช้อน', 'a12', 'a18'], ['ผู้ถูกเลือก', 'a19', 'a30'], ['หากุญแจ', 'b1', 'b13'], ['ศึกซีออน', 'c1', 'c7'], ['แลกสันติภาพ', 'c8', 'c16'], ['ปลุกอีกรอบ', 'd1', 'd14']],
  factHead: ['รู้งี้…', 'เบื้องหลังหนัง'],
  facts: [['4 ภาครวมทำเงินราว 1,800 ล้านดอลลาร์', 'ภาค 2 ทำเงินสูงสุด 742 ล้าน · ภาค 4 ได้ 159 ล้าน จากทุน 190'], ['วิล สมิธ เคยปฏิเสธบทนีโอ', 'ไปเล่น Wild Wild West แทน…ที่เจ๊ง'], ['ภาค 1 กวาด 4 รางวัลออสการ์', 'ปี 2012 ได้เข้าทะเบียนหนังแห่งชาติสหรัฐฯ']],
  src: 'ที่มา: Box Office Mojo · Wikipedia · /Film · TheWrap', factFoot: 'ภาพจำลอง 3D ไม่ใช่ภาพจากภาพยนตร์',
};
const BEATS = [
  ['cover', 2.2],
  ['a1', 5.0], ['a2', 5.4], ['a3', 4.8], ['a4', 5.2], ['a5', 5.4], ['a6', 4.8], ['a7', 5.6], ['a8', 5.2], ['a9', 4.8], ['a10', 5.4], ['a11', 4.8],
  ['a12', 5.4], ['a13', 4.8], ['a14', 4.6], ['a15', 4.8], ['a16', 5.2], ['a17', 5.0], ['a18', 5.4],
  ['a19', 5.0], ['a20', 4.8], ['a21', 5.0], ['a22', 5.0], ['a23', 5.6], ['a24', 5.4], ['a25', 5.2], ['a26', 5.8], ['a27', 5.0], ['a28', 4.8], ['a29', 4.8], ['a30', 5.2],
  ['b1', 5.2], ['b2', 5.0], ['b3', 5.0], ['b4', 5.2], ['b5', 5.6], ['b6', 5.0], ['b7', 5.0], ['b8', 5.6], ['b9', 5.4], ['b10', 5.4], ['b11', 5.6], ['b12', 5.2], ['b13', 5.6],
  ['c1', 5.4], ['c2', 5.2], ['c3', 4.8], ['c4', 5.6], ['c5', 4.8], ['c6', 4.8], ['c7', 5.6],
  ['c8', 5.0], ['c9', 4.8], ['c10', 5.0], ['c11', 5.4], ['c12', 4.8], ['c13', 5.0], ['c14', 6.0], ['c15', 5.2], ['c16', 5.2],
  ['d1', 5.2], ['d2', 4.8], ['d3', 5.2], ['d4', 5.0], ['d5', 5.0], ['d6', 5.2], ['d7', 5.6], ['d8', 5.6], ['d9', 4.8], ['d10', 5.0], ['d11', 5.0], ['d12', 5.6], ['d13', 5.2], ['d14', 5.0],
  ['facts', 9.6], ['next', 4.0], ['ask', 4.6], ['end', 1.6],
];
const CAP = {
  /* ---- ภาค 1 The Matrix (1999) ---- */
  a1: ['กลางวัน {ธอมัส แอนเดอร์สัน} เป็นโปรแกรมเมอร์ที่โดนเจ้านายด่าทุกวัน', 'กลางคืน เป็นแฮกเกอร์ฉายา<"นีโอ">'],
  a2: ['ตีหนึ่ง จอคอมพิมพ์ข้อความขึ้นมาเอง', 'แล้วก็มี<คนมาเคาะประตู> พร้อม{ตุ๊กตากระต่ายขาว}'],
  a3: ['เขาตามไปถึงผับ เจอสาวแฮกเกอร์{ทรินิตี้}', 'เธอกระซิบ <"มอร์เฟียสตามหาคุณอยู่">'],
  a4: ['เช้าวันต่อมา {เอเจนต์ชุดสูท}บุกมาจับถึงออฟฟิศ', 'มอร์เฟียสโทรมาบอกทางหนี แต่นีโอ<กลัวความสูง>'],
  a5: ['เอเจนต์{สมิธ}ยื่นข้อเสนอ: ช่วยจับมอร์เฟียส', 'นีโอไม่ยอม <ปากหายไปดื้อ ๆ> แล้วโดนฝังตัวติดตาม!'],
  a6: ['ตื่นมานึกว่าฝันร้าย แต่ทรินิตี้มารับ', 'ดูด{ตัวติดตาม}ออกจากท้อง <ฟุ้บ!>'],
  a7: ['{มอร์เฟียส}ยื่นยาให้เลือก 2 เม็ด', '[เม็ดฟ้า] กลับไปหลับ <เม็ดแดง> ไปดูความจริง'],
  a8: ['นีโอกลืนเม็ดแดง ตื่นขึ้นใน<ฝักของเหลว>', 'รอบตัวคือ{หอคอยฝักมนุษย์}นับล้าน!'],
  a9: ['เครื่องจักรถอดปลั๊กทิ้ง ลูกเรือยาน{เนบูคัดเนซซาร์}ช้อนตัวขึ้นมา', 'มอร์เฟียสบอก นี่แหละ<โลกจริง>'],
  a10: ['โลกจริงคือราวปี {2199} มนุษย์แพ้สงครามให้ AI', 'โลกที่นีโอเคยอยู่คือ<โลกจำลอง> ขังคนไว้ผลิตไฟ'],
  a11: ['มอร์เฟียสเชื่อว่านีโอคือ{ผู้ถูกเลือก}', 'คนที่จะ<ยุติสงคราม>…แต่เขาใช่จริงเหรอ?'],
  a12: ['เสียบปลั๊กหัว อัปโหลด{กังฟู}เข้าสมองในไม่กี่วินาที', 'ประลองกับมอร์เฟียส โดนก่อน แต่<เร็วขึ้นทุกหมัด!>'],
  a13: ['ด่านกระโดดข้ามตึก ทุกคนพลาดครั้งแรก', 'นีโอก็เช่นกัน <ร่วงลงไปทั้งตัว!>'],
  a14: ['ตื่นมาปากแตกจริง ๆ เพราะกฎเหล็กคือ', '<ตายในโลกจำลอง ร่างจริงก็ตายด้วย>'],
  a15: ['ไปพบ{ออราเคิล} หญิงชราผู้หยั่งรู้', 'ห้องรอมีเด็กงอช้อนด้วยใจ <"ไม่มีช้อน">'],
  a16: ['ออราเคิลยื่นคุกกี้ แล้วบอกตรง ๆ', '<"เธอยังไม่ใช่"> และมอร์เฟียสจะยอมตายแทนเธอ'],
  a17: ['ลูกเรือ{ไซเฟอร์} เบื่อชีวิตจนในโลกจริง', 'แอบนัดสมิธ <ขายเพื่อน> แลกกับได้กลับไปเป็นคนรวย'],
  a18: ['ไซเฟอร์บอกพิกัด <โดนซุ่มโจมตี!>', 'มอร์เฟียสสู้สมิธให้นีโอหนี แล้ว<ถูกจับตัวไป>'],
  a19: ['บนยาน ไซเฟอร์<ถอดปลั๊ก>ฆ่าเพื่อนทีละคน', 'แต่{แทงค์}ฟื้นขึ้นมาสอยทัน <ตูม!>'],
  a20: ['สมิธเค้นรหัสเข้าเมือง{ซีออน}จากหัวมอร์เฟียส', 'นีโอตัดสินใจ <"ผมจะเข้าไปช่วยเขา">'],
  a21: ['นีโอกับทรินิตี้บุก{ล็อบบี้ตึก} ยิงกระจุย', 'เสาหินแตก <ฝุ่นตลบทั้งห้อง!>'],
  a22: ['บนดาดฟ้า เอเจนต์ยิงใส่ นีโอ<หลบกระสุน>ได้', 'เกือบหมด…<เฉี่ยวไป 2 นัด> ทรินิตี้สอยเอเจนต์แทน'],
  a23: ['ยึด{เฮลิคอปเตอร์} กราดยิงห้องขัง มอร์เฟียสกระโดดออกมา', 'เฮลิฯ<พุ่งชนตึกระเบิด!> นีโอคว้าทรินิตี้ไว้ทัน'],
  a24: ['เหลือนีโอคนเดียวในสถานีรถไฟ คราวนี้<ไม่หนี>', 'ซัดสมิธ กดไว้บนราง <รถไฟพุ่งเข้าใส่!>'],
  a25: ['แต่สมิธย้ายร่างตามมา ดักรออยู่ที่{ห้อง 303}', '<ปัง ปัง ปัง!> นีโอล้มลง…หัวใจหยุดเต้น'],
  a26: ['ทรินิตี้กระซิบข้างร่างจริง ออราเคิลบอกว่าเธอจะรัก{ผู้ถูกเลือก}', '<"ลุกขึ้นมาสิ"> แล้วจูบเขา…หัวใจเต้นอีกครั้ง!'],
  a27: ['นีโอลุกขึ้น! มองเห็นทุกอย่างเป็น{รหัส}', 'กระสุนพุ่งมา <หยุดค้างกลางอากาศ!>'],
  a28: ['นีโอพุ่งทะลุเข้าไปในตัวสมิธ', 'สมิธ<ระเบิดเป็นแสง> เอเจนต์ที่เหลือวิ่งหนีป่าราบ!'],
  a29: ['ฝูงเครื่องจักรบุกเข้ายาน นีโอตื่นทันเสี้ยววินาที', 'ยิง{EMP} เครื่องจักร<ร่วงทั้งฝูง!>'],
  a30: ['นีโอโทรบอกเครื่องจักร จะพาคนออกจากโลกจำลอง', 'แล้ว<บินขึ้นฟ้า!> …แต่สมิธยังไม่ตาย'],
  /* ---- ภาค 2 Reloaded (2003) ---- */
  b1: ['6 เดือนต่อมา ที่{ซีออน} เมืองสุดท้ายของมนุษย์', 'ข่าวร้าย: เครื่องจักร<ขุดดินลงมา 250,000 ตัว!>'],
  b2: ['ออราเคิลบอก ทางเดียวที่จะหยุดสงคราม', 'คือไปให้ถึง{ใจกลางระบบ} ด้วยกุญแจของ<ชายทำกุญแจ>'],
  b3: ['สมิธ<กลับมา>! หลุดจากระบบ ก๊อปตัวเองใส่ใครก็ได้', 'แม้แต่ลูกเรือ{เบน} ก็ถูกสิงออกไปโลกจริง'],
  b4: ['สมิธเป็นร้อยรุมนีโอ ยิ่งตียิ่งเพิ่ม', 'สุดท้าย<ต้องบินหนี!>'],
  b5: ['ชายทำกุญแจถูก{เมโรแวงเจียน} เจ้าพ่อโปรแกรมขังไว้', 'แต่เมียเขา{เพอร์เซโฟนี}ยอมพาไป แลกกับ<จูบนีโอ 1 ที>'],
  b6: ['นีโอถ่วงเวลา ฟาดดาบกับลูกน้องเจ้าพ่อ', 'มอร์เฟียสกับทรินิตี้พา{ชายทำกุญแจ}<หนี!>'],
  b7: ['{ฝาแฝด}ไล่ล่าบนไฮเวย์ ทะลุรถได้เหมือนผี', 'ทรินิตี้ซิ่ง<มอเตอร์ไซค์ย้อนศร!>'],
  b8: ['มอร์เฟียสฟันดาบกับเอเจนต์บนหลังคารถบรรทุก', 'รถบรรทุกพุ่งชนกัน <นีโอบินมาคว้าไว้ทันเสี้ยววิ!>'],
  b9: ['ประตูสู่ใจกลางระบบ ต้องเปิด{ตรงเวลาเป๊ะ}', 'สมิธบุกมายิง <ชายทำกุญแจไม่รอด> ส่งกุญแจให้นีโอ'],
  b10: ['หลังประตูคือห้องของ{สถาปนิก} ผู้สร้าง Matrix', 'เผยว่าโลกนี้<รีเซ็ตมาแล้ว 5 รอบ> The One ก็แค่ส่วนหนึ่งของระบบ'],
  b11: ['ให้เลือก: ประตูซ้าย{รีเซ็ตระบบ} มนุษย์รอด 23 คน', 'ประตูขวา<ไปช่วยทรินิตี้> แต่มนุษย์อาจสูญพันธุ์'],
  b12: ['นีโอเลือก{ทรินิตี้} ดิ่งลงไปคว้าเธอกลางอากาศ', 'ล้วงกระสุนออกจากหัวใจ <ทรินิตี้ฟื้น!>'],
  b13: ['โลกจริง ฝูงเครื่องจักรไล่ล่า ยาน<ระเบิดตูม!>', 'นีโอยกมือ <เครื่องจักรร่วงทั้งฝูง> แล้วหมดสติไป'],
  /* ---- ภาค 3 Revolutions (2003) ---- */
  c1: ['นีโอติดอยู่ใน{สถานีรถไฟ}ระหว่างโลกจำลองกับโลกจริง', 'ทรินิตี้บุกคลับเจ้าพ่อ <จ่อปืนจนยอมปล่อย>'],
  c2: ['ออราเคิลบอก สมิธคือ{ด้านกลับของนีโอ}', 'แล้ว<สมิธก็มาก๊อปออราเคิล>ไปอีกคน!'],
  c3: ['นีโอขอยานไป{เมืองเครื่องจักร}', 'ไนโอบียก{ยานโลโกส}ให้ ทรินิตี้<ขอไปด้วย>'],
  c4: ['เบนที่ถูกสมิธสิงแอบขึ้นยาน <ทำนีโอตาบอด!>', 'แต่นีโอกลับเห็นมันเป็น{แสงสีทอง} ซัดจนจอด'],
  c5: ['ที่ซีออน ฝูงเครื่องจักร<ทะลักเข้าเมือง!>', 'ป้อมปืนยิงสู้สุดชีวิต'],
  c6: ['สว่านยักษ์<เจาะเพดานถล่มลงมา!>', 'แนวป้องกันแตก ทหารถอยร่น'],
  c7: ['ไนโอบีซิ่งยานผ่านอุโมงค์แคบมาทัน', 'ยิง{EMP} ดับเครื่องจักรทั้งท่าเรือ <แต่อาวุธมนุษย์ก็ดับด้วย>'],
  c8: ['ใกล้เมืองเครื่องจักร <ระเบิดนับพันพุ่งใส่!>', 'นีโอที่ตาบอด{ทำลายกลางอากาศ}ได้หมด'],
  c9: ['ทรินิตี้ดึงยานขึ้นเหนือเมฆ', 'เห็น{ท้องฟ้าจริง}ครั้งแรกในชีวิต <สวยมาก>'],
  c10: ['ยาน<ตกกระแทก>กลางเมืองเครื่องจักร', '{ทรินิตี้}บอกลานีโอเป็นครั้งสุดท้าย'],
  c11: ['นีโอเดินไปพบ{หัวหน้าเครื่องจักร}', 'ขอแลก: <หยุดสมิธให้ แลกกับสันติภาพ>'],
  c12: ['ใน Matrix ทุกคนกลายเป็น<สมิธ>หมดแล้ว', 'นีโอเดินฝ่าสายฝน ไปดวล{สมิธตัวจริง}'],
  c13: ['ซัดกันกลางอากาศ <ตึกสั่น กระจกแตก!>', 'อัดกันจนพื้นเป็นหลุม…{ไม่มีใครยอมใคร}'],
  c14: ['สมิธถามว่าสู้ไปทำไม นีโอตอบ <"เพราะผมเลือกเอง">', 'แล้ว{ยอมให้สมิธกลืน} เครื่องจักรส่งพลังผ่านร่าง <สมิธระเบิดทั้งหมด!>'],
  c15: ['ฝูงเครื่องจักรที่ซีออน<หยุด…แล้วถอยกลับ>', 'สงคราม{จบลงแล้ว} แต่นีโอไม่ได้กลับมา…'],
  c16: ['สถาปนิกสัญญา ใครอยากออกจาก Matrix ปล่อยได้', '{พระอาทิตย์ขึ้น}ใหม่…<จบไตรภาค?>'],
  /* ---- ภาค 4 Resurrections (2021) ---- */
  d1: ['60 ปีต่อมา…{ธอมัส แอนเดอร์สัน}ยังมีชีวิต', 'เป็นคนทำเกมดัง ชื่อเกม<"The Matrix">!'],
  d2: ['เขาแยกฝันกับความจริงไม่ออก', 'นักบำบัดเลยให้กิน<ยาเม็ดฟ้า>ทุกวัน'],
  d3: ['ที่ร้านกาแฟ เจอ{ทิฟฟานี} คุณแม่ลูกสาม', 'หน้าเหมือน<ทรินิตี้>ไม่มีผิด…แต่เธอจำอะไรไม่ได้'],
  d4: ['{บั๊กส์}สาวรอยสักกระต่าย กับ{มอร์เฟียสคนใหม่}', 'บุกมาช่วย <ยิงกันทั้งออฟฟิศ!>'],
  d5: ['นีโอกิน<ยาแดง>อีกครั้ง ตื่นในฝัก', 'แล้วเห็นว่าฝักข้าง ๆ คือ{ทรินิตี้}!'],
  d6: ['บั๊กส์พาไปเมืองใหม่{ไอโอ} ไนโอบีที่<แก่ลงมาก>', 'มนุษย์กับเครื่องจักรบางตัว{เป็นเพื่อนกันแล้ว}'],
  d7: ['ตัวร้ายตัวจริงคือ{นักบำบัด} The Analyst', 'ชุบสองคนไว้ <ให้อยู่ใกล้แต่ไม่ได้รักกัน> ไฟจะผลิตได้มากสุด'],
  d8: ['นีโอท้าเดิมพัน: ให้{ทิฟฟานีเลือกเอง}', 'เธอตอบ <"ฉันไม่ใช่ทิฟฟานี ฉันคือทรินิตี้">'],
  d9: ['นักบำบัดจะจับทั้งคู่ แต่{สมิธ}โผล่มาซัดกลางร้าน', 'ศัตรูเก่า<มาช่วย>ถ่วงเวลาให้หนี!'],
  d10: ['สองคนซิ่ง{มอเตอร์ไซค์}หนี', 'นักบำบัดสั่ง<คนทั้งเมือง>กลายเป็นฝูงไล่ล่า!'],
  d11: ['คนกระโดดลงมาจากตึก <ตุ้บ ตุ้บ ตุ้บ!>', 'นีโอปล่อย{คลื่นพลัง}ผลักทั้งฝูงกระเด็น'],
  d12: ['หนีจนสุดดาดฟ้า จับมือกัน <กระโดด!>', 'นีโอบินไม่ได้แล้ว…แต่คราวนี้{ทรินิตี้บินได้!}'],
  d13: ['สองคนกลับมาหานักบำบัด <ขอบคุณ>ที่ทำให้ได้เจอกันอีก', 'แล้วประกาศจะ{สร้าง Matrix ใหม่}ในแบบของตัวเอง'],
  d14: ['ทั้งคู่บินจากไปด้วยกัน', 'จาก 1999 ถึง 2021 <รักชนะทุกระบบ>'],
  next: ['ภาค 5 กำลังพัฒนา อยากดูไหม?', '{คอมเมนต์}บอกหน่อย'],
  ask: ['ภาค 2 นีโอเลือกประตู', 'ไปช่วยใคร? {ตอบในคอมเมนต์}'],
};
const ST = { OFFICE: [0, 0, 0], APT: [200, 0, 0], CLUB: [400, 0, 0], INTER: [600, 0, 0], STREET: [800, 0, 0], MROOM: [1000, 0, 0], PODS: [1200, 0, 0], SHIP: [1400, 0, 0], SIM: [1600, 0, 0], JUMP: [1800, 0, 0],
  ORACLE: [2000, 0, 0], DINER: [2200, 0, 0], HALLW: [2400, 0, 0], LOBBY: [2600, 0, 0], ROOF: [2800, 0, 0], SUBWAY: [3000, 0, 0], TUNNEL: [3200, 0, 0], ZION: [3400, 0, 0], PARK: [3600, 0, 0], MERO: [3800, 0, 0],
  HWY: [4000, 0, 0], WHITE: [4200, 0, 0], MCITY: [4400, 0, 0], SKY: [4600, 0, 0], RAIN: [4800, 0, 0], STUDIO: [5000, 0, 0], CAFE: [5200, 0, 0], THER: [5400, 0, 0], IO: [5600, 0, 0], CITY: [5800, 0, 0], ROOF4: [6000, 0, 0] };
const ENV = {
  OFFICE: [['room', { floor: '#5a6270', wall: '#9aa6b4', side: '#8a96a4', lamps: [-3, 3], lampC: 'rgba(235,245,255,1)' }]],
  APT: [['room', { floor: '#3a3430', wall: '#2e3242', side: '#2a2e3e', lamps: [-3], lampC: 'rgba(120,200,255,1)', windows: true }]],
  CLUB: [['room', { floor: '#1a1624', wall: '#2a1a3a', side: '#22163a', lamps: [-4, -1, 2, 5], lampC: 'rgba(255,90,160,1)', city: true }]],
  INTER: [['room', { floor: '#7a7e86', wall: '#b8bcc4', side: '#a8acb4', lamps: [0], lampC: 'rgba(255,255,235,1)' }]],
  STREET: [['street', { seed: 41 }]],
  MROOM: [['room', { floor: '#4a2a22', wall: '#3a2a2a', side: '#322424', lamps: [-3, 3], lampC: 'rgba(255,180,120,1)', windows: true }]],
  PODS: [['podfield', {}]],
  SHIP: [['room', { floor: '#5a6470', wall: '#6e7884', side: '#646e7a', lamps: [-4, 0, 4], lampC: 'rgba(170,230,255,1)' }]],
  SIM: [['cyber', { dojo: true }]],
  JUMP: [['roof', {}]],
  ORACLE: [['room', { floor: '#b89868', wall: '#e0c088', side: '#d0b078', lamps: [0], lampC: 'rgba(255,220,160,1)' }]],
  DINER: [['room', { floor: '#5a3a2a', wall: '#7a4a3a', side: '#6a3e30', lamps: [-3, 3], lampC: 'rgba(255,200,130,1)', glass: true }]],
  HALLW: [['room', { floor: '#6a5444', wall: '#a08a6a', side: '#907a5a', lamps: [-4, 0, 4] }]],
  LOBBY: [['room', { floor: '#e6e0d4', wall: '#c8c0b0', side: '#b8b0a0', lamps: [-4, 0, 4], lampC: 'rgba(255,245,220,1)' }]],
  ROOF: [['roof', {}]],
  SUBWAY: [['room', { floor: '#6a6a62', wall: '#c8c0a0', side: '#b0a888', lamps: [-4, 0, 4], lampC: 'rgba(255,240,200,1)' }]],
  TUNNEL: [['room', { floor: '#3e3a36', wall: '#4e4842', side: '#443e38', rocks: true, lamps: [0], lampC: 'rgba(120,170,255,1)' }]],
  ZION: [['room', { floor: '#4a3e34', wall: '#5a4a3e', side: '#4e4036', rocks: true, lamps: [-5, -2, 2, 5], lampC: 'rgba(255,190,120,1)' }]],
  PARK: [['town', { seed: 61, road: false, trees: 12 }]],
  MERO: [['room', { floor: '#3a2228', wall: '#5a2a32', side: '#4a242a', lamps: [-4, 0, 4], lampC: 'rgba(255,190,120,1)', glass: true }]],
  HWY: [['highway', { trees: 6 }]],
  WHITE: [['cyber', { white: true, seed: 191 }]],
  MCITY: [['mcity', {}]],
  SKY: [['clouds', {}]],
  RAIN: [['street', { seed: 77 }]],
  STUDIO: [['room', { floor: '#4a4e5a', wall: '#e8e4da', side: '#d8d4ca', lamps: [-3, 3], lampC: 'rgba(255,250,235,1)' }]],
  CAFE: [['room', { floor: '#7a5a3a', wall: '#c8a07a', side: '#b8906a', lamps: [-3, 0, 3], lampC: 'rgba(255,210,150,1)', windows: true }]],
  THER: [['room', { floor: '#6a5a4a', wall: '#d8d0c4', side: '#c8c0b4', lamps: [0], shelves: true }]],
  IO: [['town', { seed: 91, road: false, trees: 12, g1: '#6a9a5a', g2: '#4a7a3e' }]],
  CITY: [['street', { seed: 52 }]],
  ROOF4: [['roof', {}]],
};
const CAST = {
  neoW: ['neoW', 1.0], neo: ['neo', 1.0], neoR: ['neoR', 1.0], neoB: ['neoB', 1.0], neo4: ['neo4', 1.0], neo4b: ['neo4', 1.0],
  trin: ['trin', 1.0], trinR: ['trinR', 1.0], tiff: ['tiff', 1.0], morph: ['morph', 1.0], morphR: ['morphR', 1.0], morph4: ['morph4', 1.0],
  smith: ['smith', 1.0], smith4: ['smith4', 1.0], ag1: ['agent', 1.0, 0], ag2: ['agent', 1.0, 1], ag3: ['agent', 1.0, 2],
  sm1: ['smith', 1.0], sm2: ['smith', 1.0], sm3: ['smith', 1.0], sm4: ['smith', 1.0], sm5: ['smith', 1.0], sm6: ['smith', 1.0], sm7: ['smith', 1.0], sm8: ['smith', 1.0],
  bane: ['bane', 1.0], tank: ['tank', 1.0], cypher: ['cypher', 1.0], cr1: ['crew', 1.0, 0], cr2: ['crew', 1.0, 1], niobe: ['niobe', 1.0], niobeO: ['niobeO', 1.0],
  oracle: ['oracle', 1.0], kidS: ['kidS', 1.0], keym: ['keym', 1.0], arch: ['arch', 1.0], mero: ['mero', 1.0], perse: ['perse', 1.0], tw1: ['twin', 1.0], tw2: ['twin', 1.0],
  th1: ['thug', 1.0, 0], th2: ['thug', 1.0, 1], th3: ['thug', 1.0, 2], cop1: ['cop', 1.0, 0], cop2: ['cop', 1.0, 1], boss: ['boss', 1.0], cl1: ['club', 1.0, 0], cl2: ['club', 1.0, 1], cl3: ['club', 1.0, 2],
  analyst: ['analyst', 1.0], bugs: ['bugs', 1.0], chad: ['chad', 1.0], k1: ['mkid', 1.0, 0], k2: ['mkid', 0.9, 1],
  fk1: ['folk', 1.0, 0], fk2: ['folk', 1.0, 1], fk3: ['folk', 1.0, 2], fk4: ['folk', 1.0, 3], fk5: ['folk', 1.0, 1], fk6: ['folk', 1.0, 2], z1: ['zion', 1.0, 0], z2: ['zion', 1.0, 1], z3: ['zion', 1.0, 2], z4: ['zion', 0.75, 1],
  fN: ['flyer', 0.85, 'neo'], fS: ['flyer', 0.85, 'smith'], fT: ['flyer', 0.85, 'trin'], fN4: ['flyer', 0.85, 'neo4'], fT4: ['flyer', 0.85, 'tiff'],
  desk: ['desk', 1.0], desk2: ['desk', 1.0], mon: ['monitor', 1.0], mon2: ['monitor', 1.0], phone: ['device', 1.2], bug: ['device', 1.3], car: ['car', 1.5, '#2a2a30'], car2: ['car', 1.5, '#d8d8d4'], car3: ['car', 1.5, '#a03a2a'], car4: ['car', 1.5, '#3a5a8a'],
  truck: ['truck', 1.4, '#8a8a84'], truck2: ['truck', 1.4, '#5a6a8a'], moto: ['moto', 1.2, '#c8a030'], heli: ['heli', 1.0], sofaR: ['sofa', 1.0, '#7a2a2a'], table: ['table', 1.0], table2: ['table', 1.0, '#e8e4dc'],
  pillR: ['pill', 1.4, '#e0303a', 'rgba(255,90,90,1)'], pillB: ['pill', 1.4, '#2a6ae0', 'rgba(90,150,255,1)'], pod: ['pod', 1.15], pod2: ['pod', 1.15], cot: ['cot', 1.5], cot2: ['cot', 1.5], batt: ['battery', 5.0],
  screens: ['screens', 1.3], tvwall: ['tvwall', 1.2, 11, 6], booth: ['booth', 1.0], booth2: ['booth', 1.0, '#6a3a3a'], spoon: ['spoon', 1.4], cookies: ['choc', 1.2], burger: ['burger', 1.4], cash: ['cash', 1.0],
  pistol: ['pistol', 1.3], pistol2: ['pistol', 1.3], pistol3: ['pistol', 1.3], rifle: ['rifle', 1.2], launcher: ['launcher', 1.4], sword: ['sword', 1.3], sword2: ['sword', 1.3], pole: ['cane', 2.6, '#8a6a42'],
  key: ['key', 1.4], keyring: ['keyring', 1.4], door1: ['door', 1.0, '#c8ccd4'], door2: ['door', 1.0, '#c8ccd4'], door3: ['door', 1.0, '#c8ccd4'], doorL: ['door', 1.3, '#d8dce4', '#ffffff'], doorR: ['door', 1.3, '#d8dce4', '#ffe0c8'], doorA: ['door', 1.1, '#5a3a2a'],
  tur1: ['turret', 1.0], tur2: ['turret', 1.0], tur3: ['turret', 1.0], drill: ['drill', 1.1], mind: ['mind', 2.2], codegrid: ['codegrid', 1.0], lander: ['lander', 2.2, '#b8b4ac'], lander2: ['lander', 2.2, '#8a9aa8'],
  bl1: ['bullet', 1.5], bl2: ['bullet', 1.5], bl3: ['bullet', 1.5], bl4: ['bullet', 1.5], bl5: ['bullet', 1.5], chips: ['chips', 1.0], chips2: ['chips', 1.0], pil1: ['pillar', 1.0], pil2: ['pillar', 1.0], pil3: ['pillar', 1.0],
  train: ['train', 1.0], boom: ['boom', 1.0], boom2: ['boom', 1.6], boom3: ['boom', 2.6], boomT: ['boom', 1.4, 'rgba(110,240,230,1)'], puff: ['puff', 1.0], puff2: ['puff', 1.6], flash: ['flash', 1.2], rain: ['rain', 1.0],
  s1: ['streak', 0.5, 'rgba(255,70,60,1)'], s2: ['streak', 0.5, 'rgba(255,70,60,1)'], s3: ['streak', 0.5, 'rgba(255,70,60,1)'], s4: ['streak', 0.5, 'rgba(255,70,60,1)'], s5: ['streak', 0.5, 'rgba(255,70,60,1)'], s6: ['streak', 0.5, 'rgba(255,70,60,1)'],
  o1: ['streak', 0.45, 'rgba(255,170,80,1)'], o2: ['streak', 0.45, 'rgba(255,170,80,1)'], o3: ['streak', 0.45, 'rgba(255,170,80,1)'], o4: ['streak', 0.45, 'rgba(255,170,80,1)'],
  gold: ['glow', 0.7, 'rgba(255,200,90,1)'], ring1: ['ringw', 1.0], ring2: ['ringw', 1.0, '#ffffff'], heart: ['heartR', 1.0], rabbit: ['rabbit', 0.9], cup: ['cup', 1.3], cup2: ['cup', 1.3, '#d8e8f4'], label303: ['label', 0.7, 'ห้อง 303'],
  mf: ['flash', 0.55], tr1: ['tracer'], tr2: ['tracer'], tr3: ['tracer', 1, '#ff9a7a'], cloud: ['cloud', 1.0], kidBike: ['bike', 1.0], bldg: ['bldg', 1.0, 9, 30, 12, '#40444e'],
};
/* ---- run-time helpers ---- */
const all = (...fs) => (...a) => fs.forEach((f) => f && f(...a));
const aim = (c) => { c.userData.arms.R.rotation.set(-1.5, 0, -0.05); };
const aim2 = (c) => { c.userData.arms.R.rotation.set(-1.5, 0, -0.05); c.userData.arms.L.rotation.set(-1.4, 0, 0.4); };
const punch = (c) => { c.userData.arms.R.rotation.set(-1.6, 0, -0.05); c.userData.arms.L.rotation.set(-0.6, 0, 0.6); };
const flurry = (c, r, t) => { const k = Math.sin(t * 22); c.userData.arms.R.rotation.set(k > 0 ? -1.6 : -0.5, 0, -0.05); c.userData.arms.L.rotation.set(k > 0 ? -0.5 : -1.6, 0, 0.05); };
const guard = (c) => { c.userData.arms.R.rotation.set(-1.9, 0, 0.5); c.userData.arms.L.rotation.set(-1.9, 0, -0.5); };
const handUp = (c) => { c.userData.arms.R.rotation.set(-1.6, 0, 0.0); };
const swing = (c, r, t) => { c.userData.arms.R.rotation.set(-0.3 - Math.max(0, Math.sin(t * 9)) * 1.9, 0, 0.25); };
const at_ = (k, f, g) => (c, r, t, a) => { const p = r >= k ? g : f; if (typeof p === 'function') p(c, r, t, a); else if (p && POSE[p]) POSE[p](c, r, t, a); };
const during = (a, b, f, g) => (c, r, t, x) => { const p = r > a && r < b ? f : g; if (typeof p === 'function') p(c, r, t, x); else if (p && POSE[p]) POSE[p](c, r, t, x); };
const hop = (o, r, t0, h) => { if (r > t0 && r < t0 + 0.5) o.position.y += Math.sin((r - t0) / 0.5 * Math.PI) * (h || 0.8); };
const vis = (o, r, a, b) => { o.visible = o.visible && r >= a && (b == null || r < b); };
/* knocked over between a..b, lies until c, back up by d */
const knock = (o, r, a, b, c, d, dir) => { const k = r < a ? 0 : r < b ? U.easeIO((r - a) / (b - a)) : r < c ? 1 : r < d ? 1 - U.easeIO((r - c) / (d - c)) : 0; o.rotation.order = 'YXZ'; o.rotation.z += (dir || 1) * 1.35 * k; };
const slide = (o, r, t0, t1, dx, dz, dy) => { const k = U.easeIO(U.clamp((r - t0) / (t1 - t0))); o.position.x += dx * k; o.position.z += (dz || 0) * k; o.position.y += (dy || 0) * k; };
const ride = (rider, mount, dy, side) => { rider.position.copy(mount.position); rider.position.y += dy; rider.rotation.y = mount.rotation.y; if (side) { rider.position.x += Math.cos(mount.rotation.y) * side; rider.position.z -= Math.sin(mount.rotation.y) * side; } };
const qb = (st, a, b, c, t0, t1) => (u) => { const k = U.easeIO(U.clamp((u - t0) / (t1 - t0))), m = 1 - k; return H.at(st, m * m * a[0] + 2 * m * k * b[0] + k * k * c[0], m * m * a[1] + 2 * m * k * b[1] + k * k * c[1], m * m * a[2] + 2 * m * k * b[2] + k * k * c[2]); };
const loop = (st, cx, cy, cz, rx, ry, rz, w, ph) => (u) => H.at(st, cx + Math.cos(u * w + ph) * rx, cy + Math.sin(u * w * 2 + ph) * ry, cz + Math.sin(u * w + ph) * rz);
const lin = (st, a, b, t0, t1) => (u) => { const k = U.clamp((u - t0) / (t1 - t0)); return H.at(st, U.lerp(a[0], b[0], k), U.lerp(a[1], b[1], k), U.lerp(a[2], b[2], k)); };
/* a swarm of red machine streaks circling (keys, centre, radius) */
const swarm = (keys, st, cx, cy, cz, rx, ry, rz, w) => (r, t, s, o) => keys.forEach((k, i) => { if (o[k].visible) fly(o[k], loop(st, cx, cy, cz, rx * (0.7 + (i % 3) * 0.2), ry, rz * (0.8 + (i % 2) * 0.3), w * (i % 2 ? 1 : -1.1), i * 1.3), r, 0.018); });
const drop = (keys, st, t0) => (r, t, s, o) => keys.forEach((k, i) => { if (r > t0) { const u = U.clamp((r - t0) / 1.0); o[k].position.y -= u * u * 6; o[k].userData.trail.forEach((q) => q.position.set(0, 0, 0)); if (u >= 1) o[k].visible = false; } });
/* gunfire rows [t0, shooter, target key | [x,y,z], tracer key] */
const guns = (list) => (r, t, s, o, st) => { let mf = null; const used = {}, aimAt = {};
  list.forEach(([t0, a, b, tk]) => { if (!o[a] || !o[a].visible) return; const to = typeof b === 'string' ? H.pos(o[b], 1.0) : H.at(st, b[0], b[1], b[2]); if (r > t0 - 0.6 && r < t0 + 0.4 && !aimAt[a]) aimAt[a] = to;
    if (r > t0 && r < t0 + 0.13) { const k = tk || 'tr1', from = H.hand(o[a], 'R'); aimBeam(o[k], from, to, 1); used[k] = 1; mf = from; } });
  for (const a in aimAt) { const p = aimAt[a], c = o[a]; face(c, p.x - c.position.x, p.z - c.position.z); }
  ['tr1', 'tr2', 'tr3'].forEach((k) => { if (!used[k]) o[k].visible = false; }); o.mf.visible = !!mf; if (mf) o.mf.position.copy(mf); };
/* move a held prop from one hand to another between t0..t1 */
const pass = (p, a, sa, b, sb, r, t0, t1) => { const k = U.easeIO(U.clamp((r - t0) / (t1 - t0))); const v = H.hand(a, sa).lerp(H.hand(b, sb), k); v.y += Math.sin(k * Math.PI) * 0.6; p.position.copy(v); };
/* HUD */
const hudAll = (...fs) => (g, r, t, W, HH) => fs.forEach((f) => f && f(g, r, t, W, HH));
const pow = (list) => (g, r) => list.forEach(([tx, t0, x, y, col, sz]) => { const k = r - t0; if (k < 0 || k > 1.3) return; const z = (sz || 130) * (k < 0.15 ? 0.5 + k / 0.15 * 0.7 : 1.2 - Math.min(0.2, k - 0.15)); g.save(); g.translate(x, y); g.rotate(-0.08); g.globalAlpha = k > 1.0 ? 1 - (k - 1.0) / 0.3 : 1;
  g.font = '900 ' + Math.round(z) + 'px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 16; g.strokeStyle = '#2a1a10'; g.strokeText(tx, 0, 0); g.fillStyle = col || '#ffd94a'; g.fillText(tx, 0, 0); g.restore(); });
const partCard = (n, yr, sub) => (g, r) => { const a = U.clamp(r / 0.25) * U.clamp((2.8 - r) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, 290, 1580, 500, 200, 44); g.fill(); g.strokeStyle = P.teal; g.lineWidth = 4; g.stroke();
  txt(g, n, 540, 1645, 76, P.teal, 800); txt(g, yr + (sub ? ' · ' + sub : ''), 540, 1722, 40, '#fff', 600); g.restore(); };
const typeHud = (lines) => (g, r, t) => { if (r < lines[0][1]) return; g.save(); g.fillStyle = 'rgba(6,12,20,.9)'; rr(g, 140, 1540, 800, 250, 30); g.fill(); g.strokeStyle = 'rgba(95,240,224,.55)'; g.lineWidth = 3; g.stroke();
  lines.forEach(([s, ta], i) => { if (r < ta) return; const cs = Array.from(s), n = Math.min(cs.length, Math.floor((r - ta) * 14)); const blink = n < cs.length || Math.floor(t * 2) % 2; g.font = F(700, 54); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#5ff0e0'; g.fillText(cs.slice(0, n).join('') + (blink ? '▌' : ''), 190, 1610 + i * 100); }); g.restore(); };
const upHud = (lab, t0, t1) => (g, r) => { if (r < t0 || r > t1 + 0.9) return; const k = U.clamp((r - t0) / (t1 - t0)); g.save(); g.fillStyle = 'rgba(6,12,20,.9)'; rr(g, 190, 1560, 700, 180, 30); g.fill();
  txt(g, lab + '  ' + Math.round(k * 100) + '%', 540, 1612, 50, k >= 1 ? '#7dff9a' : '#5ff0e0', 800); g.fillStyle = 'rgba(255,255,255,.15)'; rr(g, 240, 1665, 600, 36, 18); g.fill(); g.fillStyle = k >= 1 ? '#7dff9a' : '#5ff0e0'; rr(g, 240, 1665, Math.max(36, 600 * k), 36, 18); g.fill(); g.restore(); };
const ecg = (flat, back) => (g, r) => { const dead = r > flat && (back == null || r < back); g.save(); g.fillStyle = 'rgba(6,12,20,.88)'; rr(g, 190, 1590, 700, 200, 30); g.fill(); g.strokeStyle = dead ? '#ff5a5a' : '#5ff07a'; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= 120; i++) { const x = 225 + i * 5.3; let tt = (i / 120 * 3 - r * 1.3) % 1; if (tt < 0) tt += 1; let y = 1712; if (!dead) { if (tt > 0.45 && tt < 0.5) y -= (tt - 0.45) / 0.05 * 80; else if (tt >= 0.5 && tt < 0.55) y -= 80 - (tt - 0.5) / 0.05 * 120; else if (tt >= 0.55 && tt < 0.58) y += 40 - (tt - 0.55) / 0.03 * 40; } i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  txt(g, dead ? 'หัวใจหยุดเต้น' : (back != null && r >= back ? 'หัวใจกลับมาเต้น!' : 'ชีพจร'), 540, 1636, 38, dead ? '#ff8a8a' : '#9fffb0', 700); g.restore(); };
const choice = (a, b, t0, ca, cb, pick, tp) => (g, r) => { const k = U.clamp((r - t0) / 0.3); if (k <= 0) return; g.save(); [[a, 290, ca, 0], [b, 790, cb, 1]].forEach(([s, x, c, i]) => { const dimmed = pick != null && r > tp && pick !== i; g.globalAlpha = k * (dimmed ? 0.3 : 1);
  g.fillStyle = 'rgba(15,22,48,.88)'; rr(g, x - 235, 1570, 470, 170, 34); g.fill(); g.strokeStyle = c; g.lineWidth = pick === i && r > tp ? 9 : 5; g.stroke(); const ls = s.split('\n'); ls.forEach((q, j) => txt(g, q, x, 1655 + (j - (ls.length - 1) / 2) * 58, j ? 36 : 44, j ? '#fff' : c, 800)); }); g.restore(); };
const big = (v, sub, t0, col) => (g, r) => { const k = r - t0; if (k < 0) return; const z = k < 0.2 ? 0.6 + k / 0.2 * 0.5 : 1.1 - Math.min(0.1, k - 0.2); g.save(); g.translate(540, 1680); g.scale(z, z);
  g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, -340, -120, 680, 210, 40); g.fill(); txt(g, sub, 0, -66, 42, '#fff', 700); txt(g, v, 0, 18, 96, col || '#ff6a5a', 800); g.restore(); };
const clock = (t0, t1, from) => (g, r) => { if (r < t0 || r > t1 + 0.8) return; const s = Math.max(0, from - Math.floor((r - t0) / (t1 - t0) * from)); g.save(); g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, 330, 1610, 420, 150, 40); g.fill();
  txt(g, '00:00:0' + s, 540, 1688, 90, s === 0 ? '#7dff9a' : '#ffffff', 800); g.restore(); };
const MON = (o, c) => { if (o && o.userData.sc) o.userData.sc.material.color.set(c); };
const SC = {
  cover: { st: 'SIM', bg: 'night', cam: [0, 0, 0.9, 0.4, 4.8, 0.5, 0.2], A: { neo: { p: [0, 0.8], f: 0, ex: 'angry', pose: 'give' }, pillR: { on: ['neo', 'R', 0, 0.12, 0.06] },
    trin: { p: [-1.9, 0.0], f: 20, ex: 'angry', pose: aim }, pistol: { on: ['trin', 'R', 0, 0, 0.05] }, smith: { p: [2.1, -0.6], f: -25, ex: 'angry' }, sm1: { p: [3.4, -2.4], f: -25, ex: 'angry' }, sm2: { p: [0.9, -3.2], f: -10, ex: 'angry' } } },
  /* =========== ภาค 1 =========== */
  a1: { st: 'OFFICE', bg: 'day', cam: [0, 0.4, 0.9, 0.2, 4.8, 0.55, 0.4], A: { desk2: { p: [-4.2, -3.2] }, mon2: { p: [-4.2, -3.3, 0.9] }, desk: { p: [-1.4, -0.9] }, mon: { p: [-1.4, -1.0, 0.9] },
    neoW: { p: [-0.6, 0.6], f: 25, ex: 'sleepy', pose: at_(3.0, 'down', 'shrug') }, boss: { p: [2.4, 0.9], f: -60, ex: 'angry', pose: during(0.4, 2.6, 'point', null), say: ['มาสายอีกแล้วนะ!', 0.4, 2.4] } },
    hud: hudAll(partCard('ภาค 1', '1999', 'The Matrix'), pow([['ปึง!', 0.5, 760, 1240, '#ffd94a', 120]])), sfx: [[0.4, 'tok'], [0.5, 'pop'], [3.0, 'soft']],
    fx: (r, t, s, o) => { hop(o.boss, r, 0.45, 0.25); if (r > 3.0) s.o.neoW.userData.setExpr('giggle'); } },
  a2: { st: 'APT', bg: 'night', dim: 0.08, cam: [0, 0.6, 0.8, 0.2, 4.8, 0.55, 0.4], A: { desk: { p: [-2.0, -0.6] }, mon: { p: [-2.0, -0.7, 0.9] }, neoW: { p: [-0.4, 0.4], f: -60, ex: 'sleepy', pose: at_(0.5, 'sleep', 'think') },
    doorA: { p: [3.2, -1.6] }, cl1: { p: [3.2, -0.8], pop: 3.3, f: -30, ex: 'giggle', say: ['มาเที่ยวด้วยกันสิ!', 3.6] }, rabbit: { on: ['cl1', 'R', 0, -0.15, 0.1], pop: 3.4 } },
    hud: hudAll(typeHud([['ตื่นได้แล้ว นีโอ…', 0.4], ['ตามกระต่ายขาวไป', 1.8]]), pow([['ก๊อก ก๊อก!', 2.9, 760, 1180, '#ffffff', 110]])), sfx: [[0.4, 'zap'], [1.8, 'zap'], [2.9, 'tok'], [3.1, 'tok'], [3.3, 'pop']],
    fx: (r, t, s, o) => { MON(o.mon, '#5ff0e0'); openDoor(o.doorA, U.clamp((r - 3.0) / 0.4)); if (r > 0.6) s.o.neoW.userData.setExpr('worried'); if (r > 3.6) s.o.neoW.userData.setExpr('happy'); } },
  a3: { st: 'CLUB', bg: 'night', cam: [0, 0, 0.9, 0.6, 4.2, 0.5, 0.3], A: { neoW: { p: [-1.0, 0.7], f: 55, ex: 'worried' }, trin: { p: [0.9, 0.7], to: [0.7, 0.8, 0.2, 1.0], f: -55, ex: 'happy', pose: during(1.2, 3.8, 'whisper', null), say: ['มอร์เฟียสตามหาคุณอยู่', 1.3, 3.9] },
    cl2: { p: [-3.2, -2.6], f: 20, ex: 'giggle', pose: 'up' }, cl3: { p: [3.0, -2.8], f: -20, ex: 'giggle', pose: 'wave' }, cl1: { p: [0.2, -3.6], f: 0, ex: 'happy', pose: 'up' } },
    sfx: [[0.3, 'soft'], [1.3, 'chime']], fx: (r, t, s, o) => { ['cl1', 'cl2', 'cl3'].forEach((k, i) => { o[k].position.y += Math.abs(Math.sin(t * 5 + i)) * 0.3; }); if (r > 2.4) s.o.neoW.userData.setExpr('happy'); } },
  a4: { st: 'OFFICE', bg: 'day', cam: [0, 0.4, 0.9, 0.2, 5.4, 0.55, 0.4], A: { boss: null, neoW: { p: [-1.0, 1.0], f: 50, ex: 'worried', pose: 'give', say: ['ไม่ไหว…สูงมาก!', 2.2, 3.4] },
    phone: { on: ['neoW', 'R', 0, 0.05, 0.05], say: ['ปีนหน้าต่างหนีไป!', 0.2, 2.0] }, smith: { p: [6.4, 1.2], to: [1.6, 1.0, 1.4, 3.0], f: -90, ex: 'angry', pose: at_(3.4, null, 'reach') }, ag1: { p: [7.4, -0.6], to: [2.8, -0.4, 1.6, 3.2], f: -90, ex: 'angry' } },
    sfx: [[0.2, 'bell'], [1.4, 'tok'], [2.2, 'soft'], [3.5, 'pop']], fx: (r, t, s, o) => { if (r > 3.5) { o.neoW.position.x += Math.sin(t * 40) * 0.03; s.o.neoW.userData.setExpr('cry'); } vis(o.phone, r, 0, 3.5); } },
  a5: { st: 'INTER', bg: 'hall', cam: [0, 0, 0.9, 0.0, 4.8, 0.6, 0.4], A: { table: { p: [0.2, -0.6], s: 1.6 }, smith: { p: [0.8, -1.8], f: -20, ex: 'happy', pose: 'hips', say: ['ช่วยเราจับมอร์เฟียส แล้วคดีหายหมด', 0.3, 2.1] },
    neoW: { p: [-1.6, 0.7], f: 45, ex: 'angry', say: ['ไม่! ขอโทรหาทนาย', 2.1, 3.0] }, ag1: { p: [-2.8, -2.6], f: 30, ex: 'angry' }, ag2: { p: [2.8, -2.4], f: -30, ex: 'angry' }, bug: { p: [0.6, -0.6, 1.3], pop: 3.3 } },
    hud: pow([['อื้ม! อื้ม!!', 3.0, 540, 1240, '#ff8a3a', 120]]), sfx: [[0.3, 'tok'], [2.1, 'tok'], [3.0, 'puff'], [3.4, 'zip']],
    fx: (r, t, s, o, st) => { if (r > 3.0) { s.o.neoW.userData.setExpr('worried'); o.neoW.position.x += Math.sin(t * 38) * 0.03; } if (r > 3.4) { const k = U.easeIO(U.clamp((r - 3.4) / 1.2)); o.bug.position.copy(H.at(st, U.lerp(0.6, -1.5, k), U.lerp(1.3, 1.0, k) + Math.abs(Math.sin(r * 9)) * 0.15, U.lerp(-0.6, 0.9, k))); } } },
  a6: { st: 'STREET', bg: 'night', cam: [0, 0, 0.9, 1.0, 4.6, 0.5, 0.4], A: { car: { p: [0.2, -1.6], f: 90 }, neoW: { p: [-0.7, 1.2], f: 35, ex: 'worried' }, trin: { p: [0.9, 1.2], f: -50, ex: 'angry', pose: 'give' }, phone: { on: ['trin', 'R', 0, 0, 0.05] },
    bug: { p: [-0.6, 1.6, 1.2] } }, hud: pow([['ฟุ้บ!', 2.2, 380, 1180, '#5ff0e0', 140]]), sfx: [[0.4, 'zap'], [2.2, 'zip'], [2.3, 'pop']],
    fx: (r, t, s, o, st) => { const k = U.clamp((r - 2.2) / 1.2); o.bug.position.copy(H.at(st, -0.6 + k * 6, 1.2 + k * 2.4 + Math.sin(r * 30) * 0.03 * (1 - k), 1.6 - k * 2)); vis(o.bug, r, 0.6, 3.4); if (r > 2.4) { s.o.neoW.userData.setExpr('sick'); s.o.trin.userData.setExpr('happy'); } } },
  a7: { st: 'MROOM', bg: 'dusk', cam: [0, 0, 0.9, 0.3, 4.6, 0.55, 0.3], A: { sofaR: { p: [0, -2.4] }, morph: { p: [0.9, 0.3], f: -40, ex: 'happy', pose: 'reach', say: ['เลือกเอาเอง', 0.2, 1.2] }, pillB: { on: ['morph', 'L', 0, 0.12, 0.06] },
    pillR: { on: ['morph', 'R', 0, 0.12, 0.06] }, neoW: { p: [-1.3, 0.9], f: 50, ex: 'worried', pose: at_(2.8, 'think', 'give') } },
    hud: choice('เม็ดฟ้า\nกลับไปหลับ', 'เม็ดแดง\nไปดูความจริง', 0.8, '#6aa0ff', '#ff6a6a', 1, 2.6), sfx: [[0.8, 'chime'], [2.6, 'tok'], [3.0, 'glide'], [4.1, 'pop']],
    fx: (r, t, s, o) => { if (r > 2.8) { o.pillR.visible = r < 4.1; pass(o.pillR, o.morph, 'R', o.neoW, 'R', r, 2.9, 3.6); if (r > 3.7) { const v = H.pos(o.neoW, 1.9); o.pillR.position.lerp(v, U.clamp((r - 3.7) / 0.4)); } } if (r > 4.1) s.o.neoW.userData.setExpr('angry'); } },
  a8: { st: 'PODS', bg: 'night', cam: [[0, 0, 1.4, 0.2, 4.8, 0.45, 0.5], [3.4, 0, 0.4, 0.2, 4.0, 0.9, 0.3]], flash: [3.6, 0.4, 'rgba(255,200,180,'], A: { pod: { p: [0, 0.4] }, neoR: { p: [0, 0.4, 0.2], f: 0, ex: 'sleepy', pose: during(1.0, 3.4, 'reach', 'sleep') },
    s1: { p: [0, 0] } }, sfx: [[0.6, 'shimmer'], [1.0, 'pop'], [2.0, 'zip'], [3.6, 'puff'], [3.8, 'glide']],
    fx: (r, t, s, o, st) => { if (r > 1.0 && r < 3.4) s.o.neoR.userData.setExpr('worried'); fly(o.s1, qb(st, [6, 6, -6], [3, 4, 0], [1.6, 2.6, 1.6], 1.6, 3.0), r, 0.02); vis(o.s1, r, 1.6, 4.0);
      if (r > 3.6) { const k = U.clamp((r - 3.6) / 0.9); o.neoR.position.y -= k * k * 5; o.neoR.rotation.x = -k * 1.4; } o.pod.userData.glow.material.opacity = 0.35 + 0.2 * Math.sin(t * 4); } },
  a9: { st: 'SHIP', bg: 'night', cam: [0, 0, 0.8, 0.3, 4.6, 0.6, 0.3], A: { screens: { p: [0, -5.6] }, cot: { p: [0, 0.4], f: 90 }, neoR: { p: [0, 0.4, 0.42], f: 90, lie: true, ex: 'sick' },
    morphR: { p: [-1.6, -0.6], f: 40, ex: 'happy', say: ['นี่แหละ โลกจริง', 1.4, 3.6] }, trinR: { p: [1.6, -0.6], f: -40, ex: 'happy' }, tank: { p: [-2.6, 1.4], f: 50, ex: 'giggle' }, cypher: { p: [2.8, 1.2], f: -50, ex: 'worried' } },
    sfx: [[0.3, 'glide'], [1.4, 'chime']] },
  a10: { st: 'SIM', bg: 'storm', cam: [0, 0.6, 1.2, 0.0, 5.6, 0.6, 0.4], flash: [[0.9, 0.3, 'rgba(220,230,255,'], [3.0, 0.3, 'rgba(220,230,255,']], A: { neo: { p: [-1.8, 1.0], f: 40, ex: 'worried' }, morph: { p: [-0.4, 0.4], f: 60, ex: 'angry', pose: 'point', say: ['เครื่องจักรใช้คนเป็นถ่านไฟ', 1.3, 3.8] },
    batt: { p: [2.6, -1.6] }, z4: { p: [2.6, 0.6], f: -20, pose: 'sleep', ex: 'sleepy' }, heart: { p: [2.6, -1.6, 3.4], pop: 1.0, bob: 0.1, s: 0.6 } }, hud: big('≈ ปี 2199', 'โลกจริงตอนนี้คือ', 0.2, '#5ff0e0'),
    sfx: [[0.2, 'gong'], [0.9, 'puff'], [1.3, 'tok'], [3.0, 'puff']], fx: (r, t, s, o) => { o.heart.visible = false; if (r > 3.6) s.o.neo.userData.setExpr('sick'); } },
  a11: { st: 'SHIP', bg: 'night', cam: [0, 0, 0.9, 0.3, 4.2, 0.55, 0.3], A: { cot: { p: [-0.6, 0.0], f: 90 }, tank: null, cypher: null, trinR: { p: [2.4, -1.4], f: -40, ex: 'happy' },
    neoR: { p: [-0.6, 0.4], f: 40, ex: 'worried', lie: false, say: ['ผมเนี่ยนะ?', 2.8, 4.6, true] }, morphR: { p: [1.3, 0.6], f: -50, ex: 'happy', pose: 'point', say: ['นายคือ The One', 0.4, 2.6] } }, sfx: [[0.4, 'chime'], [2.8, 'pop']] },
  /* --- ไม่มีช้อน --- */
  a12: { st: 'SIM', bg: 'night', cam: [0, 0, 0.9, 0.2, 4.8, 0.5, 0.4], A: { neo: { p: [-1.1, 0.4], f: 70, ex: 'angry', pose: during(2.8, 4.6, flurry, guard) }, morph: { p: [1.1, 0.4], f: -70, ex: 'happy', pose: during(1.4, 1.9, punch, guard) }, z4: null, batt: null },
    hud: hudAll(upHud('อัปโหลด: กังฟู', 0.1, 1.0), pow([['ผัวะ!', 1.55, 380, 1250, '#ffd94a', 120], ['ปั้ก!', 3.0, 700, 1220, '#ffd94a', 110], ['ปั้ก ปั้ก!', 3.5, 760, 1320, '#ffd94a', 120], ['ผัวะ!!', 4.1, 720, 1200, '#ff8a3a', 140]])),
    sfx: [[0.1, 'zip'], [1.0, 'ching'], [1.55, 'pop'], [3.0, 'pop'], [3.3, 'pop'], [3.6, 'pop'], [4.1, 'puff']],
    fx: (r, t, s, o) => { knock(o.neo, r, 1.6, 1.9, 2.2, 2.6, -1); if (r > 1.6 && r < 2.6) s.o.neo.userData.setExpr('sick'); slide(o.morph, r, 4.1, 4.5, 1.4, 0); if (r > 4.1) s.o.morph.userData.setExpr('worried'); hop(o.neo, r, 2.8, 0.4); } },
  a13: { st: 'JUMP', bg: 'dusk', cam: [[0, 4.6, 0.9, 0.6, 5.2, 0.6, 0.4], [1.9, 10.6, -0.4, 0.6, 5.6, 0.9, 0.0]], A: { bldg: { p: [18.0, -1.0, 0] }, morph: { p: [2.4, 0.4], f: 70, ex: 'happy', say: [['โดดเลย!', 0.2, 1.0], ['โอ๊ะ…', 3.0, 99]] },
    neo: { p: [4.0, 0.8], to: [8.2, 0.8, 0.6, 1.9], f: 90, ex: 'angry' } }, hud: pow([['ตุ้บ!!', 3.7, 540, 1300, '#ff8a3a', 170]]), shake: [3.7, 4.3, 0.12], sfx: [[0.8, 'zip'], [2.2, 'glide'], [3.7, 'puff']],
    fx: (r, t, s, o) => { if (r > 1.9) { const k = r - 1.9; o.neo.position.x += k * 2.4; o.neo.position.y = 1.6 * k - 2.6 * k * k; o.neo.rotation.x = -Math.min(1, k) * 0.6; s.o.neo.userData.setExpr(k > 0.8 ? 'cry' : 'giggle'); } if (r > 3.0) s.o.morph.userData.setExpr('worried'); } },
  a14: { st: 'SHIP', bg: 'night', cam: [0, 0, 0.9, 0.2, 4.0, 0.55, 0.3], A: { morphR: { p: [1.4, 0.2], f: -50, ex: 'worried', pose: 'point', say: ['ตายในนั้น ร่างจริงก็ตาย', 1.6, 4.4] }, trinR: null,
    neoR: { p: [-0.6, 0.4], f: 40, ex: 'sick', pose: 'think', say: ['ปากแตกจริงด้วย!', 0.2, 1.5] } }, hud: pow([['!!', 1.6, 300, 1150, '#ff5a5a', 150]]), sfx: [[0.2, 'pop'], [1.6, 'bell']] },
  a15: { st: 'ORACLE', bg: 'day', cam: [0, 0, 0.7, 0.4, 4.0, 0.45, 0.3], A: { neo: { p: [-1.1, 0.8], f: 45, ex: 'worried', say: ['งอได้ไง?', 0.6, 1.8] }, kidS: { p: [0.8, 0.8], f: -30, ex: 'happy', pose: 'give', say: ['ไม่มีช้อน', 2.2, 4.6, true] },
    spoon: { on: ['kidS', 'R', 0, 0.02, 0.06] } }, sfx: [[0.6, 'tok'], [1.2, 'shimmer'], [2.2, 'chime']], fx: (r, t, s, o) => { o.spoon.userData.bend.rotation.x = 1.3 * U.easeIO(U.clamp((r - 1.0) / 1.2)); if (r > 2.4) s.o.neo.userData.setExpr('happy'); } },
  a16: { cam: [0, 0, 0.8, 0.2, 4.4, 0.5, 0.3], A: { kidS: null, spoon: null, table: { p: [0.2, -0.8] }, cookies: { p: [0.2, -0.8, 0.88] }, oracle: { p: [1.1, -0.2], f: -40, ex: 'happy', pose: 'give', say: [['เธอยังไม่ใช่', 0.8, 2.6], ['มอร์เฟียสจะยอมตายแทนเธอ', 2.7, 5.0]] },
    neo: { p: [-1.2, 0.8], f: 40, ex: 'worried' } }, sfx: [[0.3, 'tok'], [0.8, 'bell'], [2.7, 'soft']], fx: (r, t, s, o) => { if (r > 2.7) s.o.neo.userData.setExpr('cry'); } },
  a17: { st: 'DINER', bg: 'hall', cam: [0, 0, 0.8, 0.0, 4.6, 0.5, 0.3], A: { table: { p: [0, -0.4], s: 1.3 }, burger: { p: [-0.4, -0.4, 1.12] }, cash: { p: [0.5, -0.5, 1.08], pop: 2.6, s: 0.6 },
    cypher: { p: [-1.3, 0.5], f: 40, ex: 'giggle', pose: during(3.4, 4.6, 'give', null), say: ['ผมไม่อยากรู้ความจริงอะไรแล้ว', 0.4, 2.3] }, smith: { p: [1.3, 0.5], f: -40, ex: 'happy', pose: during(3.4, 4.6, 'give', 'hips'), say: ['ตกลง', 2.5, 3.4] } },
    sfx: [[0.4, 'tok'], [2.5, 'tok'], [2.6, 'ching'], [3.5, 'pop']] },
  a18: { st: 'HALLW', bg: 'hall', cam: [0, 0, 0.9, 0.0, 5.8, 0.6, 0.4], A: { neo: { p: [-2.4, 1.0], to: [-6.4, 1.6, 2.6, 3.8], f: 60, ex: 'worried' }, morph: { p: [-0.4, 0.6], f: 70, ex: 'angry', pose: during(0.6, 2.6, flurry, null) },
    smith: { p: [1.2, 0.6], f: -70, ex: 'angry', pose: during(2.6, 3.0, punch, null) }, cop1: { p: [3.4, -1.4], f: -60, ex: 'angry', pop: 0.4 }, cop2: { p: [4.2, 1.6], f: -80, ex: 'angry', pop: 0.6 } },
    hud: pow([['ปั้ก!', 0.9, 560, 1220], ['ผัวะ!', 1.6, 500, 1300], ['โครม!!', 2.8, 520, 1240, '#ff8a3a', 150]]), sfx: [[0.9, 'pop'], [1.6, 'pop'], [2.8, 'puff'], [3.4, 'bell']],
    fx: (r, t, s, o) => { knock(o.morph, r, 2.8, 3.2, 99, 99, 1); if (r > 2.8) s.o.morph.userData.setExpr('sick'); if (r > 3.4) { o.cop1.position.x -= U.clamp((r - 3.4) / 0.8) * 2.0; } } },
  /* --- ผู้ถูกเลือก --- */
  a19: { st: 'SHIP', bg: 'night', cam: [0, 0, 0.8, 0.2, 5.2, 0.6, 0.4], flash: [3.0, 0.35, 'rgba(255,240,200,'], A: { cot: { p: [-1.4, -0.6], f: 90 }, cot2: { p: [1.0, -1.6], f: 90 }, morphR: null, neoR: { p: [-1.4, -0.6, 0.42], f: 90, lie: true, ex: 'sleepy' },
    cr1: { p: [1.0, -1.6, 0.42], f: 90, lie: true, ex: 'sleepy' }, cypher: { p: [-0.2, 0.9], f: -140, ex: 'giggle', pose: during(0.4, 2.4, 'reach', null), say: ['ทีละคน…', 0.3, 1.8] },
    tank: { p: [-4.4, 1.2], f: 70, pop: 2.0, ex: 'angry', pose: aim }, launcher: { on: ['tank', 'R', 0, 0, 0.1], pop: 2.0 } }, hud: pow([['ตูม!!', 3.0, 600, 1260, '#ff8a3a', 170]]), sfx: [[0.3, 'tok'], [2.0, 'bell'], [3.0, 'puff'], [3.05, 'zap']],
    fx: all(guns([[3.0, 'tank', 'cypher', 'tr3']]), (r, t, s, o) => { knock(o.cypher, r, 3.05, 3.4, 99, 99, 1); if (r > 3.0) s.o.cypher.userData.setExpr('cry'); }) },
  a20: { st: 'INTER', bg: 'hall', cam: [0, 0, 0.8, 0.0, 4.4, 0.55, 0.3], A: { morph: { p: [-0.6, 0.0, 0.0], f: 30, sit: true, ex: 'sick', pose: 'down' }, smith: { p: [1.2, 0.6], f: -60, ex: 'angry', pose: 'point', say: ['รหัสเข้าซีออนอยู่ไหน!', 0.3, 2.6] },
    ag1: { p: [-2.6, -2.2], f: 30, ex: 'angry' }, ag2: { p: [2.6, -2.6], f: -30, ex: 'angry' } }, hud: pow([['!', 2.8, 380, 1200, '#ff8a3a', 150]]), sfx: [[0.3, 'tok'], [2.8, 'bell']],
    fx: (r, t, s, o) => { o.morph.position.x += Math.sin(t * 30) * 0.015; } },
  a21: { st: 'LOBBY', bg: 'day', cam: [0, 0, 0.9, 0.0, 6.2, 0.55, 0.4], A: { pil1: { p: [-3.4, -2.6] }, pil2: { p: [0.2, -3.0] }, pil3: { p: [3.6, -2.4] }, neo: { p: [-1.4, 1.6], f: 30, ex: 'angry', pose: aim }, pistol: { on: ['neo', 'R', 0, 0, 0.05] },
    trin: { p: [-2.8, 0.6], f: 40, ex: 'angry', pose: aim }, pistol2: { on: ['trin', 'R', 0, 0, 0.05] }, cop1: { p: [2.6, -0.4], f: -110, ex: 'angry', fall: [1.05, 1.4] }, cop2: { p: [4.4, 0.8], f: -110, ex: 'angry', fall: [2.25, 2.6] },
    th1: { p: [1.4, -1.8], f: -130, ex: 'angry', pop: 2.4, fall: [3.45, 3.8] }, chips: { p: [0.2, -2.4, 2.0] }, chips2: { p: [3.6, -1.8, 1.5] }, puff2: { p: [1.8, -2.4], pop: 3.2 } },
    hud: pow([['ปัง!', 1.0, 760, 1180], ['ปัง!', 2.2, 820, 1240], ['เพล้ง!', 2.9, 560, 1120, '#ffffff', 120], ['ปัง!', 3.4, 640, 1200]]), shake: [2.9, 3.6, 0.08], sfx: [[1.0, 'tok'], [2.2, 'tok'], [2.9, 'puff'], [3.4, 'tok']],
    fx: all(guns([[1.0, 'neo', 'cop1'], [2.2, 'trin', 'cop2', 'tr2'], [2.8, 'neo', [0.2, 2.0, -2.6]], [3.4, 'trin', 'th1', 'tr2']]), (r, t, s, o) => { burstTick(o.chips, (r - 2.85) / 1.1); burstTick(o.chips2, (r - 3.0) / 1.1); vis(o.chips, r, 2.85, 4.2); vis(o.chips2, r, 3.0, 4.4); }) },
  a22: { st: 'ROOF', bg: 'day', cam: [0, 0.2, -0.6, -1.4, 2.6, 3.4, 0.3], A: { neo: { p: [0, 0.6], f: 160, ex: 'angry', pose: guard }, ag1: { p: [0.4, -4.8], f: -10, ex: 'angry', pose: aim, fall: [4.05, 4.4] }, pistol: { on: ['ag1', 'R', 0, 0, 0.05] },
    trin: { p: [-4.2, -2.6], f: 100, pop: 3.4, ex: 'angry', pose: aim }, pistol2: { on: ['trin', 'R', 0, 0, 0.05], pop: 3.4 }, bl1: { p: [0, 0] }, bl2: { p: [0, 0] }, bl3: { p: [0, 0] } },
    hud: pow([['เฉี่ยว!', 2.0, 380, 1320, '#ff8a3a', 110], ['เฉี่ยว!', 2.7, 700, 1380, '#ff8a3a', 110], ['ปัง!', 4.0, 300, 1100]]), sfx: [[0.4, 'tok'], [0.7, 'zip'], [1.2, 'zip'], [1.8, 'zip'], [2.0, 'pop'], [2.7, 'pop'], [4.0, 'tok']],
    fx: all(guns([[4.0, 'trin', 'ag1', 'tr2']]), (r, t, s, o, st) => { [['bl1', 0.4, -0.7], ['bl2', 0.7, 0.8], ['bl3', 1.0, -0.2]].forEach(([k, t0, dx], i) => { const u = (r - t0) / 2.6; o[k].visible = u > 0 && u < 1; const p = H.at(st, 0.4 + (dx - 0.4) * u * 1.6, 1.4 + i * 0.25, -4.4 + u * 9); o[k].position.copy(p); o[k].rotation.y = Math.atan2(dx - 0.4, 6); });
      o.neo.position.x += Math.sin(r * 5) * 0.5 * U.clamp(r - 0.4) * (r < 3.2 ? 1 : 0); if (r > 2.0 && r < 3.0) s.o.neo.userData.setExpr('worried'); }) },
  a23: { st: 'ROOF', bg: 'day', cam: [[0, 0, 2.0, -0.6, 6.4, 0.7, 0.6], [2.6, 0.8, 1.2, -0.4, 6.0, 0.6, 0.4]], A: { ag1: null, bl1: null, bl2: null, bl3: null, pistol2: null, trin: { p: [0, 0] }, neo: { p: [0, 0], f: 0, ex: 'angry', pose: aim }, rifle: { on: ['neo', 'R', 0, 0, 0.05] },
    heli: { p: [-1.0, -1.2, 3.0] }, morph: { p: [5.4, -2.4, 0], f: -90, ex: 'worried' }, boom2: { p: [8.4, -3.0, 2.6], pop: 3.3, out: 4.0 }, puff2: { p: [8.4, -3.0, 0.6], pop: 3.5 } }, shake: [3.3, 4.0, 0.12],
    hud: pow([['ทรรรรร!', 0.4, 760, 1100, '#ffd94a', 110], ['ตูม!!', 3.3, 760, 1180, '#ff8a3a', 170]]), sfx: [[0.3, 'zip'], [0.4, 'tok'], [0.7, 'tok'], [1.0, 'tok'], [1.6, 'zip'], [3.3, 'puff'], [3.4, 'puff']],
    fx: all(guns([[0.4, 'neo', [6.0, 2.0, -3.0]], [0.7, 'neo', [6.2, 1.6, -3.0], 'tr2'], [1.0, 'neo', [6.0, 2.2, -3.0]]]), (r, t, s, o, st) => { o.heli.userData.rotor.rotation.y = t * 20;
      const hx = r < 2.2 ? -1.0 + r * 0.6 : -1.0 + 1.32 + (r - 2.2) * 4.2, hy = r < 2.2 ? 3.1 : 3.1 - (r - 2.2) * 0.8; o.heli.position.copy(H.at(st, Math.min(8.2, hx), hy, -1.2)); o.heli.rotation.z = r > 2.2 ? -0.4 : 0; o.heli.visible = r < 3.3;
      ride(o.trin, o.heli, -0.4, 0); o.trin.visible = r < 2.2; o.neo.position.copy(o.heli.position); o.neo.position.y -= 1.5; o.neo.position.z += 1.2; if (r > 2.6) { o.neo.position.copy(H.at(st, 3.4, 0, 0.8)); o.neo.rotation.y = -0.6; }
      const mk2 = U.clamp((r - 1.4) / 0.8); o.morph.position.copy(H.at(st, U.lerp(5.4, o.heli.position.x - ST.ROOF[0] + 0.6, mk2), Math.sin(mk2 * Math.PI) * 1.6 + mk2 * (hy - 2.6), U.lerp(-2.4, 0.0, mk2))); if (r > 2.6) { o.morph.position.copy(H.at(st, 1.8, 0, 0.6)); o.morph.rotation.y = 0.5; }
      if (r > 2.6) { o.trin.visible = true; o.trin.position.copy(H.at(st, 4.6, 0, 1.0)); o.trin.rotation.y = -1.2; s.o.trin.userData.setExpr('happy'); s.o.neo.userData.setExpr('happy'); o.neo.userData.arms.R.rotation.set(-1.3, 0, -0.3); o.rifle.visible = false; } }) },
  a24: { st: 'SUBWAY', bg: 'hall', cam: [0, 0, 0.9, 0.6, 5.4, 0.5, 0.4], A: { neo: { p: [-1.2, 1.2], f: 70, ex: 'angry', pose: during(0.4, 2.0, flurry, guard) }, smith: { p: [0.8, 1.0], f: -70, ex: 'angry', pose: during(0.6, 2.0, flurry, guard) }, train: { p: [-14, -2.4] } },
    hud: pow([['ปั้ก!', 0.6, 420, 1200], ['ผัวะ!', 1.0, 680, 1260], ['ปั้ก!', 1.5, 520, 1140], ['โครม!', 2.3, 700, 1300, '#ff8a3a', 130], ['ปู๊นนน!', 3.0, 300, 1120, '#ffffff', 110]]),
    sfx: [[0.6, 'pop'], [1.0, 'pop'], [1.5, 'pop'], [2.3, 'puff'], [3.0, 'bell'], [3.2, 'glide']],
    fx: (r, t, s, o, st) => { if (r > 2.2) { const k = U.clamp((r - 2.2) / 0.5); o.smith.position.copy(H.at(st, 0.8 + k * 0.4, Math.sin(k * Math.PI) * 0.6, 1.0 - k * 3.4)); o.smith.rotation.order = 'YXZ'; o.smith.rotation.x = -k * 1.4; s.o.smith.userData.setExpr('worried'); }
      o.train.position.copy(H.at(st, -14 + U.clamp((r - 3.0) / 1.8) * 34, 0, -2.4)); o.smith.visible = r < 3.9; if (r > 3.9) s.o.neo.userData.setExpr('happy'); } },
  a25: { st: 'HALLW', bg: 'night', dim: 0.1, cam: [0, 0, 0.9, 0.0, 5.4, 0.55, 0.4], A: { morph: null, cop1: null, cop2: null, doorA: { p: [-1.8, -5.9] }, label303: { p: [-1.8, -5.6, 3.0] },
    neo: { p: [5.0, 1.0], to: [-0.6, 0.4, 0.2, 1.6], f: -100, ex: 'worried', fall: [3.2, 3.6], fallDir: 1 }, smith: { p: [-3.2, -1.8], pop: 1.2, f: 50, ex: 'angry', pose: aim }, pistol: { on: ['smith', 'R', 0, 0, 0.05], pop: 1.2 } },
    hud: hudAll(pow([['ปัง!', 2.0, 400, 1150], ['ปัง!', 2.4, 460, 1230], ['ปัง!!', 2.8, 520, 1180, '#ff8a3a', 150]]), (g, r) => { if (r > 3.4) ecg(3.6, null)(g, r); }), sfx: [[0.2, 'zip'], [1.2, 'bell'], [2.0, 'tok'], [2.4, 'tok'], [2.8, 'tok'], [3.5, 'puff'], [3.8, 'soft']],
    fx: all(guns([[2.0, 'smith', 'neo'], [2.4, 'smith', 'neo', 'tr2'], [2.8, 'smith', 'neo']]), (r, t, s, o) => { openDoor(o.doorA, U.clamp((r - 0.8) / 0.4)); if (r > 2.0) s.o.neo.userData.setExpr('sick'); }) },
  a26: { st: 'SHIP', bg: 'night', calm: true, dim: 0.05, cam: [0, -0.4, 0.6, 0.3, 3.8, 0.55, 0.3], flash: [4.2, 0.5, 'rgba(255,255,255,'], A: { cot2: null, cr1: null, cypher: null, tank: null, launcher: null,
    cot: { p: [0, 0.2], f: 90 }, neoR: { p: [0, 0.2, 0.42], f: 90, lie: true, ex: 'sleepy' }, trinR: { p: [0.2, -0.9], f: 0, ex: 'cry', pose: 'whisper', say: [['ออราเคิลบอกว่าฉันจะรักผู้ถูกเลือก', 0.3, 2.4], ['ลุกขึ้นมาสิ', 2.5, 3.6]] },
    heart: { p: [0, 0.6, 2.4], pop: 3.6, bob: 0.1, spin: 1.5 }, s1: { p: [0, 0] }, s2: { p: [0, 0] } }, hud: (g, r) => ecg(0, 4.2)(g, r), sfx: [[0.3, 'soft'], [2.5, 'soft'], [3.6, 'shimmer'], [4.2, 'chime']],
    fx: all(swarm(['s1', 's2'], 'SHIP', 0, 3.6, -5.0, 6, 0.6, 1.0, 1.3), (r, t, s, o) => { if (r > 4.2) { s.o.neoR.userData.setExpr('happy'); s.o.trinR.userData.setExpr('happy'); } }) },
  a27: { st: 'HALLW', bg: 'night', dim: 0, cam: [0, 0, 0.9, 0.0, 5.2, 0.55, 0.4], A: { doorA: null, label303: null, pistol: null, codegrid: { p: [0, 0] }, neo: { p: [-1.4, 0.8], f: 80, ex: 'happy', fall: null, fallen: false, pose: at_(2.0, null, handUp) },
    smith: { p: [2.6, 0.4], f: -80, ex: 'angry', pose: aim }, pistol2: { on: ['smith', 'R', 0, 0, 0.05] }, ag1: { p: [3.8, -1.6], f: -80, ex: 'angry', pose: aim }, pistol3: { on: ['ag1', 'R', 0, 0, 0.05] }, bl1: { p: [0, 0] }, bl2: { p: [0, 0] }, bl3: { p: [0, 0] } },
    sfx: [[0.2, 'shimmer'], [0.9, 'tok'], [1.0, 'tok'], [1.1, 'tok'], [2.0, 'zap'], [3.4, 'tok'], [3.5, 'tok']], hud: pow([['หยุด…', 2.0, 540, 1250, '#5ff0e0', 120], ['กริ๊ง กริ๊ง', 3.4, 540, 1380, '#ffffff', 90]]),
    fx: (r, t, s, o, st) => { [['bl1', 0.9, 1.6, 0.6, 1.8], ['bl2', 1.0, 1.4, 1.0, 1.5], ['bl3', 1.1, 1.8, 0.2, 2.0]].forEach(([k, t0, y, z, stop]) => { const u = U.clamp((r - t0) / 0.9); const x = 2.4 - Math.min(u, 1) * (2.4 - (-1.4 + stop * 0.5)) * (r < 2.0 ? 1 : 1);
      const xx = r < 2.0 ? 2.4 - (r - t0) * 1.0 : 2.4 - (2.0 - t0) * 1.0; o[k].visible = r > t0; let yy = y; if (r > 3.3) yy = Math.max(0.1, y - (r - 3.3) * (r - 3.3) * 9); o[k].position.copy(H.at(st, xx, yy, z)); o[k].rotation.y = -Math.PI / 2; });
      if (r > 2.0) s.o.smith.userData.setExpr('worried'); } },
  a28: { cam: [0, 0, 0.9, 0.0, 5.2, 0.55, 0.4], flash: [1.7, 0.5, 'rgba(200,255,250,'], A: { bl1: null, bl2: null, bl3: null, pistol3: null, ag1: { p: [3.8, -1.6], to: [9.0, -1.6, 2.4, 3.4], f: -80, ex: 'cry', pose: null }, ag2: { p: [4.8, 0.6], to: [9.6, 0.6, 2.6, 3.6], f: -80, ex: 'cry' },
    neo: { p: [-1.4, 0.8], f: 80, ex: 'angry', pose: null }, smith: { p: [2.6, 0.4], f: -80, ex: 'worried', pose: null }, pistol2: null, boomT: { p: [2.6, 0.4, 1.4], pop: 1.6, out: 2.6 } },
    hud: pow([['ฟิ้ววว!', 0.6, 540, 1240, '#5ff0e0', 120], ['ตูม!!', 1.7, 640, 1200, '#5ff0e0', 170]]), sfx: [[0.6, 'zip'], [1.7, 'puff'], [1.75, 'shimmer'], [2.4, 'glide']],
    fx: (r, t, s, o) => { if (r > 0.6) { const k = U.easeIO(U.clamp((r - 0.6) / 1.0)); o.neo.position.x += k * 4.0; o.neo.rotation.order = 'YXZ'; o.neo.rotation.z = -k * 1.2; o.neo.visible = r < 1.6 || r > 2.6; } o.smith.visible = r < 1.7;
      if (r > 2.6) { o.neo.position.x = ST.HALLW[0] + 2.6; o.neo.rotation.z = 0; o.neo.rotation.y = -0.4; s.o.neo.userData.setExpr('happy'); } } },
  a29: { st: 'SHIP', bg: 'night', calm: false, cam: [0, 0, 0.9, 0.0, 5.0, 0.6, 0.4], flash: [2.4, 0.5, 'rgba(255,255,255,'], A: { heart: null, trinR: { p: [-1.2, 1.2], f: 120, ex: 'worried' }, morphR: { p: [2.4, 0.8], f: -60, ex: 'angry', pose: 'point', say: ['ยิงเลย!', 1.8, 2.8] },
    neoR: { p: [0, 0.2, 0.42], f: 90, lie: true, ex: 'worried' }, s1: { p: [0, 0] }, s2: { p: [0, 0] }, s3: { p: [0, 0] }, s4: { p: [0, 0] }, ring2: { p: [0, -1.0, 2.0] } },
    hud: pow([['EMP!!', 2.4, 540, 1200, '#ffffff', 180]]), shake: [2.4, 3.0, 0.1], sfx: [[0.3, 'zip'], [1.0, 'zip'], [1.8, 'tok'], [2.4, 'zap'], [2.45, 'puff']],
    fx: all(swarm(['s1', 's2', 's3', 's4'], 'SHIP', 0, 3.0, -2.0, 5, 0.8, 2.0, 1.6), drop(['s1', 's2', 's3', 's4'], 'SHIP', 2.4), (r, t, s, o) => { ringTick(o.ring2, (r - 2.4) / 0.9, 1, 18); if (r > 1.0) { o.neoR.rotation.x = -Math.PI / 2 * (1 - U.clamp((r - 1.0) / 0.5) * 0.7); s.o.neoR.userData.setExpr('worried'); }
      if (r > 3.2) { s.o.neoR.userData.setExpr('happy'); s.o.trinR.userData.setExpr('giggle'); } }) },
  a30: { st: 'STREET', bg: 'dawn', cam: [[0, 0, 1.2, 0.6, 5.2, 0.5, 0.4], [2.6, 0, 3.0, 0.6, 5.8, 0.2, 0.3]], A: { car: null, trin: null, phone: null, booth: { p: [-1.2, -0.6] }, neo: { p: [-1.2, -0.4], to: [0.6, 0.8, 0.8, 1.8], f: 30, ex: 'happy', say: ['ผมจะพาทุกคนออกมา', 0.2, 2.2] },
    fN: { p: [0, 0] } }, sfx: [[0.2, 'tok'], [2.4, 'zip'], [2.6, 'shimmer']], fx: (r, t, s, o, st) => { o.booth.userData.glow.material.opacity = 0.5 + 0.3 * Math.sin(t * 6); o.neo.visible = r < 2.5; o.fN.visible = r >= 2.5;
      fly(o.fN, qb(st, [0.6, 1.0, 0.8], [0.8, 4.0, 0.4], [1.2, 12, -2], 2.5, 4.6), r, 0.03); } },
  /* =========== ภาค 2 =========== */
  b1: { st: 'ZION', bg: 'fire', cam: [0, 0, 1.2, 0.0, 5.6, 0.5, 0.4], A: { morphR: { p: [0, -0.6], f: 0, ex: 'angry', pose: 'point' }, neoR: { p: [-2.0, 0.6], f: 30, ex: 'worried' }, trinR: { p: [-3.0, 1.4], f: 40, ex: 'worried' }, niobe: { p: [2.2, 0.4], f: -30, ex: 'worried' },
    z1: { p: [-3.6, -2.6], f: 20, ex: 'worried' }, z2: { p: [3.6, -2.4], f: -20, ex: 'cry' }, z3: { p: [1.2, -3.4], f: 0, ex: 'worried' }, z4: { p: [3.4, 1.4], f: -30, ex: 'cry', pose: null }, puff: { p: [-1.2, -1.6, 4.2], pop: 2.6 } },
    hud: hudAll(partCard('ภาค 2', '2003', 'Reloaded'), big('250,000', 'เครื่องจักรกำลังขุดลงมา', 2.8)), shake: [2.6, 3.6, 0.06], sfx: [[0.4, 'gong'], [2.6, 'puff'], [2.8, 'bell']] },
  b2: { st: 'PARK', bg: 'day', cam: [0, 0, 0.8, 0.4, 4.6, 0.5, 0.3], A: { bench: null, oracle: { p: [0.8, 0.4], f: -40, ex: 'happy', pose: 'point', say: [['ไปหาชายทำกุญแจ', 0.6, 2.6], ['เขาจะพาเธอเข้าใจกลางระบบ', 2.7, 5.0]] },
    neo: { p: [-1.0, 0.8], f: 40, ex: 'worried' }, cookies: { on: ['oracle', 'L', 0, 0, 0.1] } }, sfx: [[0.6, 'chime'], [2.7, 'soft']], fx: (r, t, s, o) => { if (r > 2.7) s.o.neo.userData.setExpr('happy'); } },
  b3: { cam: [0, 0, 0.9, 0.2, 5.2, 0.55, 0.4], flash: [2.6, 0.3, 'rgba(255,255,255,'], A: { oracle: null, cookies: null, neo: null, smith: { p: [-1.6, 0.4], to: [-0.4, 0.6, 0.6, 1.8], f: 70, ex: 'giggle', pose: at_(2.2, null, 'reach'), say: ['คิดถึงฉันไหม?', 0.2, 1.6] },
    bane: { p: [1.4, 0.8], f: -60, ex: 'worried' }, sm1: { p: [1.4, 0.8], f: -60, ex: 'giggle', pop: 2.6, say: ['ตัวใหม่ของฉัน', 3.0] } }, hud: pow([['วู้บ!', 2.6, 680, 1200, '#5ff0e0', 140]]), sfx: [[0.2, 'tok'], [2.2, 'zip'], [2.6, 'shimmer'], [3.0, 'pop']],
    fx: (r, t, s, o) => { o.bane.visible = r < 2.6; if (r > 2.2) s.o.bane.userData.setExpr('cry'); } },
  b4: { cam: [[0, 0, 0.9, 0.4, 6.0, 0.6, 0.4], [3.4, 0, 2.6, 0.4, 6.4, 0.3, 0.3]], A: { bane: null, neo: { p: [0, 0.8], f: 0, ex: 'angry', pose: swing }, pole: { on: ['neo', 'R', 0, 0, 0.05] },
    smith: { p: [-2.0, 0.6], f: 60, ex: 'angry', pose: guard }, sm1: { p: [2.0, 0.6], f: -60, ex: 'angry', pose: guard, say: null }, sm2: { p: [-1.2, -1.2], f: 30, ex: 'angry', pop: 0.6 }, sm3: { p: [1.4, -1.4], f: -30, ex: 'angry', pop: 0.9 },
    sm4: { p: [-3.2, -0.8], f: 50, ex: 'angry', pop: 1.2 }, sm5: { p: [3.4, -0.6], f: -50, ex: 'angry', pop: 1.5 }, sm6: { p: [0.2, -2.6], f: 0, ex: 'angry', pop: 1.8 }, sm7: { p: [-2.6, 2.2], f: 120, ex: 'angry', pop: 2.1 }, sm8: { p: [2.6, 2.2], f: -120, ex: 'angry', pop: 2.4 }, fN: { p: [0, 0] } },
    hud: pow([['ผัวะ!', 0.5, 300, 1250], ['ผัวะ!', 1.1, 780, 1250], ['เพิ่มอีก!?', 2.2, 540, 1150, '#ff8a3a', 110], ['ฟิ้ววว!', 3.4, 540, 1050, '#5ff0e0', 140]]), sfx: [[0.5, 'pop'], [1.1, 'pop'], [1.6, 'pop'], [2.2, 'bell'], [3.4, 'zip'], [3.5, 'shimmer']],
    fx: (r, t, s, o, st) => { o.neo.rotation.y = r < 3.0 ? t * 6 : 0; knock(o.smith, r, 0.5, 0.8, 1.6, 2.0, -1); knock(o.sm1, r, 1.1, 1.4, 2.2, 2.6, 1); o.neo.visible = r < 3.4; o.pole.visible = r < 3.4; o.fN.visible = r >= 3.4;
      fly(o.fN, qb(st, [0, 1.0, 0.8], [0, 5.0, 0.6], [2, 14, -4], 3.4, 5.0), r, 0.03); ['sm2', 'sm3', 'sm4', 'sm5', 'sm6', 'sm7', 'sm8'].forEach((k, i) => { if (r > 3.4) { o[k].rotation.y = 0; o[k].userData.head.rotation.x = -0.6; s.o[k].userData.setExpr('worried'); } }); } },
  b5: { st: 'MERO', bg: 'hall', cam: [0, 0, 0.8, 0.0, 5.0, 0.5, 0.3], A: { table: { p: [0.8, -1.0], s: 1.3 }, mero: { p: [1.4, -1.8], f: -20, ex: 'giggle', pose: 'shrug', say: ['ไม่ให้หรอก!', 0.4, 2.0] },
    perse: { p: [2.8, 0.2], f: -60, ex: 'happy', say: ['ฉันพาไปเอง แลกกับจูบ 1 ที', 2.4, 5.0] }, neo: { p: [-1.4, 0.8], f: 40, ex: 'worried' }, morph: { p: [-2.8, -0.2], f: 40, ex: 'angry' }, trin: { p: [-0.4, 1.6], f: 30, ex: 'angry' } },
    sfx: [[0.4, 'tok'], [2.4, 'chime'], [4.2, 'pop']], fx: (r, t, s, o) => { if (r > 3.4) { s.o.trin.userData.setExpr('worried'); s.o.neo.userData.setExpr('sick'); } } },
  b6: { cam: [0, 0, 0.9, 0.2, 5.6, 0.55, 0.4], A: { table: null, mero: null, perse: null, neo: { p: [0, 0.8], f: 0, ex: 'angry', pose: swing }, sword: { on: ['neo', 'R', 0, 0, 0.05] },
    th1: { p: [-2.0, 0.4], f: 60, ex: 'angry', pose: 'sword', fall: [1.0, 1.3] }, sword2: { on: ['th1', 'R', 0, 0, 0.05] }, th2: { p: [2.0, 0.6], f: -60, ex: 'angry', pose: 'sword', fall: [2.0, 2.3], fallDir: -1 }, th3: { p: [0.8, -1.8], f: -20, ex: 'angry', pop: 2.2, fall: [3.0, 3.3] },
    morph: { p: [-3.0, -2.0], to: [-8.0, -2.4, 0.6, 2.4], f: -90, ex: 'worried' }, trin: { p: [-2.4, -2.8], to: [-7.6, -3.2, 0.8, 2.6], f: -90, ex: 'worried' }, keym: { p: [-1.8, -2.2], to: [-7.0, -2.6, 0.7, 2.5], f: -90, ex: 'worried' } },
    hud: pow([['เคร้ง!', 0.9, 360, 1220, '#ffffff', 120], ['เคร้ง!', 1.9, 740, 1220, '#ffffff', 120], ['ฉึบ!', 2.9, 620, 1150, '#ffd94a', 120]]), sfx: [[0.9, 'ching'], [1.9, 'ching'], [2.9, 'pop']],
    fx: (r, t, s, o) => { vis(o.sword2, r, 0, 1.1); o.neo.rotation.y = Math.sin(t * 3) * 0.8; } },
  b7: { st: 'HWY', bg: 'dawn', cam: [0, 0, 1.0, 1.2, 6.4, 0.5, 0.8], A: { moto: { p: [0, 0] }, trin: { p: [0, 0], f: -90, ex: 'angry', sit: true }, keym: { p: [0, 0], f: -90, ex: 'cry', sit: true }, car2: { p: [0, 0] }, car3: { p: [0, 0] }, car4: { p: [0, 0] },
    tw1: { p: [0, 0], f: -90, ex: 'giggle' }, tw2: { p: [0, 0], f: -90, ex: 'giggle' } }, hud: pow([['บรื้นนน!', 0.4, 300, 1180, '#ffd94a', 110], ['ทะลุ!?', 2.6, 700, 1200, '#5ff0e0', 120]]), sfx: [[0.3, 'zip'], [1.4, 'zip'], [2.6, 'shimmer'], [3.4, 'zip']],
    fx: (r, t, s, o, st) => { const mx = 4 - r * 2.0; o.moto.position.copy(H.at(st, mx, 0, 0.8)); o.moto.rotation.y = -Math.PI / 2; ride(o.trin, o.moto, 0.25, 0.0); ride(o.keym, o.moto, 0.25, 0); o.keym.position.x += 0.75;
      [['car3', 1.0, -1.0], ['car4', 2.6, 0.8]].forEach(([k, ph, z]) => { const x = -12 + ((r + ph) * 5.5) % 26; o[k].position.copy(H.at(st, x, 0, z)); o[k].rotation.y = Math.PI / 2; });
      o.car2.position.copy(H.at(st, mx + 6.0, 0, -0.6)); o.car2.rotation.y = -Math.PI / 2; ride(o.tw1, o.car2, 0.5, 0); o.tw1.position.x += 0.2; o.tw2.position.copy(o.tw1.position); o.tw2.position.x += 1.0;
      if (r > 2.4 && r < 3.6) { o.tw2.position.z += (r - 2.4) * 0.9; o.tw2.position.y += 0.2; } o.tw2.traverse((m) => { if (m.material) { m.material.transparent = true; m.material.opacity = r > 2.4 && r < 3.6 ? 0.45 : 1; } }); } },
  b8: { cam: [[0, 0, 1.6, 0.4, 6.4, 0.6, 0.6], [3.0, 0.6, 1.6, 0.4, 7.2, 0.6, 0.6]], flash: [3.4, 0.4, 'rgba(255,230,190,'], A: { moto: null, trin: null, keym: null, car2: null, car3: null, car4: null, tw1: null, tw2: null,
    truck: { p: [0, 0] }, truck2: { p: [0, 0] }, morph: { p: [0, 0], f: 90, ex: 'angry', pose: swing }, sword: { on: ['morph', 'R', 0, 0, 0.05] }, ag1: { p: [0, 0], f: -90, ex: 'angry', pose: 'sword' }, sword2: { on: ['ag1', 'R', 0, 0, 0.05] },
    keym: { p: [0, 0], f: 90, ex: 'cry' }, boom3: { p: [3.6, 0.6, 1.6], pop: 3.4, out: 4.4 }, fN: { p: [0, 0] } }, shake: [3.4, 4.2, 0.14],
    hud: pow([['เคร้ง!', 0.8, 300, 1150, '#ffffff', 110], ['เคร้ง!', 1.6, 760, 1150, '#ffffff', 110], ['ตูมมม!!', 3.4, 700, 1250, '#ff8a3a', 180], ['ฟิ้ว!', 3.0, 400, 1050, '#5ff0e0', 120]]), sfx: [[0.8, 'ching'], [1.6, 'ching'], [2.8, 'bell'], [3.0, 'zip'], [3.4, 'puff'], [3.5, 'puff']],
    fx: (r, t, s, o, st) => { const tx = -2 + r * 0.6; o.truck.position.copy(H.at(st, Math.min(tx, 0.2), 0, 0.6)); o.truck.rotation.y = Math.PI / 2; const t2 = 12 - r * 2.6; o.truck2.position.copy(H.at(st, Math.max(t2, 3.6), 0, 0.6)); o.truck2.rotation.y = -Math.PI / 2; o.truck2.visible = r < 3.5;
      const roof = H.pos(o.truck, 0); roof.y += 2.0 * 1.4 * 0.95; o.morph.position.copy(roof); o.morph.position.x -= 0.6; o.ag1.position.copy(roof); o.ag1.position.x += 0.9; o.keym.position.copy(roof); o.keym.position.x -= 1.6; o.keym.position.z -= 0.4;
      o.ag1.visible = r < 2.2; if (r > 1.6 && r < 2.2) { o.ag1.position.y += (r - 1.6) * 2; o.ag1.position.z += (r - 1.6) * 6; }
      o.fN.visible = r > 2.8 && r < 3.3; fly(o.fN, qb(st, [-6, 8, -4], [-2, 4, 0], [0.4, 3.4, 0.6], 2.8, 3.3), r, 0.03); if (r > 3.2) { const k = U.easeIO(U.clamp((r - 3.2) / 1.2)); const p = H.at(st, U.lerp(0.4, -3.4, k), U.lerp(3.4, 6.0, k) - k * k * 3.2, U.lerp(0.6, 2.4, k)); o.morph.position.copy(p); o.keym.position.copy(p); o.keym.position.x -= 0.9; o.morph.position.y -= 0.6; o.keym.position.y -= 0.6; o.truck.visible = r < 3.5; s.o.keym.userData.setExpr('giggle'); s.o.morph.userData.setExpr('happy'); o.sword.visible = false; } } },
  b9: { st: 'WHITE', bg: 'sky', cam: [0, 0, 0.9, -0.4, 5.6, 0.55, 0.4], A: { door1: { p: [-3.0, -2.6] }, door2: { p: [0, -3.0] }, door3: { p: [3.0, -2.6] }, keym: { p: [0.6, -1.2], f: 160, ex: 'worried', pose: 'give', fall: [3.0, 3.4], fallDir: 1 }, key: { on: ['keym', 'R', 0, 0, 0.05] },
    neo: { p: [-1.0, 0.8], f: 30, ex: 'worried', pose: at_(3.8, null, 'give') }, morph: { p: [-2.6, 1.2], f: 40, ex: 'worried' }, sm1: { p: [-3.0, -2.2], f: 40, pop: 2.2, ex: 'angry', pose: aim }, sm2: { p: [3.0, -2.2], f: -40, pop: 2.4, ex: 'angry', pose: aim },
    pistol: { on: ['sm1', 'R', 0, 0, 0.05], pop: 2.2 }, pistol2: { on: ['sm2', 'R', 0, 0, 0.05], pop: 2.4 } }, hud: hudAll(clock(0.2, 1.6, 3), pow([['แกร๊ก!', 1.7, 540, 1250, '#ffd94a', 120], ['ปัง!', 2.8, 300, 1180], ['ปัง!', 3.0, 780, 1180]])),
    sfx: [[0.3, 'tok'], [0.8, 'tok'], [1.3, 'tok'], [1.7, 'ching'], [2.2, 'bell'], [2.8, 'tok'], [3.0, 'tok'], [3.9, 'chime']],
    fx: all(guns([[2.8, 'sm1', 'keym'], [3.0, 'sm2', 'keym', 'tr2']]), (r, t, s, o) => { openDoor(o.door2, U.clamp((r - 1.7) / 0.4)); openDoor(o.door1, U.clamp((r - 2.0) / 0.3)); openDoor(o.door3, U.clamp((r - 2.2) / 0.3)); if (r > 3.6) { pass(o.key, o.keym, 'R', o.neo, 'R', r, 3.6, 4.2); } if (r > 3.0) s.o.keym.userData.setExpr('sick'); }) },
  b10: { cam: [0, 0, 1.6, -1.0, 5.8, 0.4, 0.3], A: { door1: null, door2: null, door3: null, keym: null, key: null, morph: null, sm1: null, sm2: null, pistol: null, pistol2: null, tvwall: { p: [0, -5.4, 0.2] },
    arch: { p: [1.4, -0.8], f: -30, ex: 'happy', pose: 'hips', say: [['นี่คือเวอร์ชันที่ 6', 0.4, 2.4], ['The One ทุกคน มาถึงห้องนี้', 2.5, 5.0]] }, neo: { p: [-1.2, 0.6], f: 40, ex: 'worried', pose: null } },
    hud: big('เวอร์ชัน 6', 'Matrix ถูกรีเซ็ตมาแล้ว 5 รอบ', 1.2, '#5ff0e0'), sfx: [[0.4, 'gong'], [1.2, 'bell'], [2.5, 'soft']],
    fx: (r, t, s, o) => { o.tvwall.userData.panels.forEach((p, i) => { p.material.opacity = 0.55 + 0.4 * Math.abs(Math.sin(t * 2 + i)); }); } },
  b11: { cam: [0, 0, 0.9, -0.4, 5.6, 0.55, 0.3], A: { tvwall: { p: [0, -5.8, 0.2] }, doorL: { p: [-2.6, -2.2] }, doorR: { p: [2.6, -2.2] }, arch: { p: [-4.2, -0.2], f: 40, ex: 'happy', pose: 'shrug' },
    neo: { p: [0, 1.0], to: [2.4, -1.0, 3.4, 4.8], f: 0, ex: 'worried', pose: null } }, hud: choice('ซ้าย: รีเซ็ต\nมนุษย์รอด 23 คน', 'ขวา: ช่วยทรินิตี้\nเสี่ยงสูญพันธุ์', 0.6, '#ffffff', '#ff8a6a', 1, 3.4),
    sfx: [[0.6, 'chime'], [3.4, 'tok'], [4.4, 'glide']], fx: (r, t, s, o) => { openDoor(o.doorL, 0.6); openDoor(o.doorR, 0.6 + 0.4 * U.clamp((r - 4.2) / 0.5)); if (r > 3.4) s.o.neo.userData.setExpr('angry'); if (r > 3.4) s.o.arch.userData.setExpr('worried'); } },
  b12: { st: 'JUMP', bg: 'night', cam: [[0, 0, 4.0, 0.0, 6.6, 0.3, 0.4], [2.4, 0, 1.0, 0.4, 4.4, 0.55, 0.3]], flash: [3.6, 0.4, 'rgba(255,255,255,'], A: { trin: { p: [0, 0], f: 0, ex: 'sleepy', lie: false }, fN: { p: [0, 0] },
    neo: { p: [-0.4, 0.6], f: 60, ex: 'worried', pose: 'reach' }, heart: { p: [0.6, 0.6, 2.8], pop: 3.6, bob: 0.1, spin: 1.5 } },
    hud: pow([['ฮึบ!', 1.6, 540, 1100, '#5ff0e0', 130], ['ฟื้นแล้ว!', 3.6, 540, 1250, '#7dff9a', 130]]), sfx: [[0.2, 'glide'], [1.6, 'zip'], [2.6, 'soft'], [3.6, 'chime'], [3.7, 'shimmer']],
    fx: (r, t, s, o, st) => { if (r < 2.2) { o.neo.visible = false; o.trin.position.copy(H.at(st, 0.6, 9 - r * 3.0, 0.4)); o.trin.rotation.set(0.3, 0, Math.sin(t * 4) * 0.3); fly(o.fN, qb(st, [-1, 12, -2], [-0.6, 8, 0], [0.4, 3.6, 0.6], 0.6, 1.8), r, 0.03); o.fN.visible = r > 0.6;
        if (r > 1.6) { const p = o.fN.position.clone(); o.trin.position.copy(p); o.trin.position.y -= 0.6; } } else { o.fN.visible = false; o.trin.position.copy(H.at(st, 0.6, 0, 0.6)); o.trin.rotation.order = 'YXZ'; o.trin.rotation.set(-Math.PI / 2, 0, 0); o.trin.position.y += 0.42 * o.trin.scale.y; }
      if (r > 3.6) { s.o.trin.userData.setExpr('happy'); s.o.neo.userData.setExpr('happy'); const k = U.clamp((r - 3.6) / 0.6); o.trin.rotation.x = -Math.PI / 2 * (1 - k * 0.6); } } },
  b13: { st: 'TUNNEL', bg: 'night', cam: [0, 0, 1.0, 0.0, 5.6, 0.55, 0.4], A: { lander2: { p: [3.2, -2.6, 0.2] }, boom3: { p: [3.2, -2.6, 1.6], pop: 1.0, out: 2.2 }, neoR: { p: [-0.6, 0.8], f: 40, ex: 'worried', pose: at_(2.4, null, handUp), fall: [4.0, 4.4] },
    trinR: { p: [-2.0, 1.4], f: 40, ex: 'worried' }, morphR: { p: [-2.8, 0.2], f: 50, ex: 'worried' }, s1: { p: [0, 0] }, s2: { p: [0, 0] }, s3: { p: [0, 0] }, s4: { p: [0, 0] }, s5: { p: [0, 0] }, ring1: { p: [-0.6, 0.8, 2.2] } },
    flash: [1.0, 0.4, 'rgba(255,220,180,'], shake: [1.0, 1.8, 0.14], hud: pow([['ตูม!!', 1.0, 760, 1200, '#ff8a3a', 170], ['หยุด!', 2.4, 400, 1150, '#5ff0e0', 140]]), sfx: [[1.0, 'puff'], [1.1, 'puff'], [2.4, 'zap'], [2.5, 'shimmer'], [4.0, 'puff']],
    fx: all(swarm(['s1', 's2', 's3', 's4', 's5'], 'TUNNEL', 1.0, 3.0, -1.6, 5, 0.8, 1.8, 1.6), drop(['s1', 's2', 's3', 's4', 's5'], 'TUNNEL', 2.6), (r, t, s, o) => { o.lander2.visible = r < 1.2; ringTick(o.ring1, (r - 2.4) / 1.0, 0.5, 9); if (r > 4.0) s.o.neoR.userData.setExpr('sleepy'); }) },
  /* =========== ภาค 3 =========== */
  c1: { st: 'CLUB', bg: 'dusk', cam: [0, 0, 0.9, 0.2, 5.0, 0.55, 0.4], A: { mero: { p: [0.4, -0.2], f: 10, ex: 'worried', sit: false }, trin: { p: [-0.8, 0.4], f: 70, ex: 'angry', pose: aim, say: ['ปล่อยนีโอ หรือตายด้วยกันหมด!', 0.4, 2.8] }, pistol: { on: ['trin', 'R', 0, 0, 0.05] },
    morph: { p: [-2.6, -0.6], f: 50, ex: 'angry', pose: aim }, pistol2: { on: ['morph', 'R', 0, 0, 0.05] }, th1: { p: [2.4, -1.0], f: -60, ex: 'angry', pose: aim }, pistol3: { on: ['th1', 'R', 0, 0, 0.05] }, th2: { p: [3.2, 0.8], f: -80, ex: 'angry', pose: aim },
    perse: { p: [1.6, -2.4], f: -20, ex: 'giggle' } }, hud: hudAll(partCard('ภาค 3', '2003', 'Revolutions'), pow([['ก็ได้ ๆ!', 3.2, 640, 1150, '#ffd94a', 120]])), sfx: [[0.4, 'tok'], [3.2, 'pop']],
    fx: (r, t, s, o) => { o.mero.position.x += Math.sin(t * 30) * 0.01; if (r > 3.2) s.o.mero.userData.setExpr('cry'); } },
  c2: { st: 'ORACLE', bg: 'day', cam: [0, 0, 0.9, 0.2, 5.0, 0.55, 0.4], flash: [3.0, 0.35, 'rgba(255,255,255,'], A: { table: { p: [-0.6, -1.4] }, oracle: { p: [0.6, 0.2], f: -30, ex: 'worried', pose: 'point', say: ['สมิธคือด้านกลับของเธอ', 0.3, 2.0] },
    neoR: null, neo: { p: [-1.4, 0.8], f: 40, ex: 'worried', to: [-5.8, 1.2, 1.6, 2.6] }, smith: { p: [3.8, 0.6], pop: 1.8, f: -80, ex: 'giggle', pose: at_(2.6, null, 'reach') }, sm1: { p: [0.6, 0.2], f: -30, pop: 3.0, ex: 'giggle', say: ['ตอนนี้ฉันรู้ทุกอย่าง', 3.4] } },
    hud: pow([['วู้บ!', 3.0, 540, 1180, '#5ff0e0', 150]]), sfx: [[0.3, 'chime'], [1.8, 'bell'], [3.0, 'shimmer'], [3.4, 'pop']], fx: (r, t, s, o) => { o.oracle.visible = r < 3.0; if (r > 2.4) s.o.oracle.userData.setExpr('cry'); } },
  c3: { st: 'ZION', bg: 'hall', cam: [0, 0, 1.0, 0.0, 5.4, 0.55, 0.4], A: { lander: { p: [2.2, -3.0, 0.2], f: 0 }, niobe: { p: [1.2, 0.4], f: -50, ex: 'happy', pose: 'give', say: ['เอายานโลโกสของฉันไป', 0.4, 2.4] }, key: { on: ['niobe', 'R', 0, 0, 0.05] },
    neoR: { p: [-0.6, 0.8], f: 50, ex: 'happy' }, trinR: { p: [-2.0, 1.2], f: 50, ex: 'happy', say: ['ฉันไปด้วย', 2.6, 4.6] }, morphR: { p: [-3.2, -0.6], f: 40, ex: 'worried' } }, sfx: [[0.4, 'chime'], [2.6, 'tok'], [3.0, 'ching']],
    fx: (r, t, s, o) => { if (r > 1.6) pass(o.key, o.niobe, 'R', o.neoR, 'R', r, 1.6, 2.2); } },
  c4: { st: 'SHIP', bg: 'night', cam: [0, 0, 0.9, 0.0, 4.8, 0.55, 0.4], flash: [1.6, 0.35, 'rgba(255,240,200,'], A: { screens: { p: [0, -5.6] }, neoR: { p: [-0.8, 0.8], f: 70, ex: 'angry', pose: during(3.2, 4.4, flurry, guard) }, neoB: { p: [-0.8, 0.8], f: 70, ex: 'angry', pose: during(3.2, 4.4, flurry, guard) },
    bane: { p: [1.2, 0.6], f: -70, ex: 'angry', pose: during(1.2, 1.7, punch, null), fall: [4.4, 4.8] }, gold: { on: ['bane', 'x', 0, 0.2, 0] }, trinR: { p: [-3.4, -1.6], f: 30, ex: 'worried' } },
    hud: pow([['ซ่าาา!', 1.6, 540, 1180, '#ff8a3a', 130], ['มองเห็น!', 2.6, 380, 1100, '#ffd94a', 120], ['ผัวะ!!', 4.4, 700, 1200, '#ffd94a', 150]]), sfx: [[1.2, 'pop'], [1.6, 'puff'], [2.6, 'shimmer'], [3.4, 'pop'], [3.8, 'pop'], [4.4, 'puff']],
    fx: (r, t, s, o) => { o.neoR.visible = r < 1.6; o.neoB.visible = r >= 1.6; o.gold.visible = r > 2.6 && r < 4.6; if (r > 1.6 && r < 2.6) s.o.neoB.userData.setExpr('cry'); } },
  c5: { st: 'ZION', bg: 'war', cam: [0, 0, 2.0, -0.6, 6.4, 0.45, 0.4], A: { lander: null, niobe: null, key: null, neoR: null, trinR: null, morphR: null, tur1: { p: [-3.4, 0.2] }, tur2: { p: [0, -1.0] }, tur3: { p: [3.4, 0.2] },
    z1: { p: [-2.0, -0.2], f: 160, ex: 'angry', pose: aim }, rifle: { on: ['z1', 'R', 0, 0, 0.05] }, z2: { p: [2.0, -0.4], f: -160, ex: 'angry', pose: 'point' }, s1: { p: [0, 0] }, s2: { p: [0, 0] }, s3: { p: [0, 0] }, s4: { p: [0, 0] }, s5: { p: [0, 0] }, s6: { p: [0, 0] },
    boom: { p: [-2.0, -3.4, 5.0], pop: 1.4, out: 2.0 }, boom2: { p: [2.4, -3.0, 6.0], pop: 3.0, out: 3.7 } }, shake: [0.2, 4.6, 0.04], hud: pow([['ตึง ตึง ตึง!', 0.5, 540, 1150, '#ffd94a', 110], ['ตูม!', 1.4, 300, 1050, '#ff8a3a', 130], ['ตูม!', 3.0, 780, 1050, '#ff8a3a', 130]]),
    sfx: [[0.5, 'tok'], [0.7, 'tok'], [0.9, 'tok'], [1.4, 'puff'], [2.0, 'tok'], [2.2, 'tok'], [3.0, 'puff'], [3.6, 'zip']],
    fx: all(swarm(['s1', 's2', 's3', 's4', 's5', 's6'], 'ZION', 0, 6.0, -3.0, 6, 1.4, 2.0, 1.1), (r, t, s, o) => { ['tur1', 'tur2', 'tur3'].forEach((k, i) => { const h = o[k].userData.head; h.rotation.y = Math.sin(t * 1.2 + i) * 0.6; h.rotation.x = -0.7; o[k].userData.fl.visible = Math.floor(t * 12 + i * 3) % 3 === 0; }); }) },
  c6: { cam: [[0, 0, 4.0, -1.6, 7.2, 0.3, 0.4], [2.0, 0, 2.0, -0.6, 6.4, 0.45, 0.4]], A: { drill: { p: [0.6, -3.0, 9] }, chips: { p: [0.6, -3.0, 5.6] }, puff2: { p: [0.6, -3.0, 4.0], pop: 1.6 }, boom2: { p: [0, -1.0, 1.6], pop: 3.2, out: 4.0 },
    z1: { p: [-2.0, -0.2], to: [-4.6, 2.0, 3.4, 4.6], f: 160, ex: 'cry' }, z2: { p: [2.0, -0.4], to: [4.6, 2.0, 3.4, 4.6], f: -160, ex: 'cry', pose: null }, rifle: null }, shake: [1.0, 4.6, 0.12],
    hud: pow([['ครืนนน!!', 1.2, 540, 1080, '#ff8a3a', 150], ['ตูม!', 3.2, 540, 1250, '#ff8a3a', 150]]), sfx: [[0.4, 'glide'], [1.2, 'puff'], [1.3, 'puff'], [3.2, 'puff']],
    fx: all(swarm(['s1', 's2', 's3', 's4', 's5', 's6'], 'ZION', 0, 6.0, -3.0, 6, 1.4, 2.0, 1.1), (r, t, s, o, st) => { o.drill.userData.bit.rotation.y = t * 6; o.drill.position.y = U.lerp(14, 6.4, U.easeIO(U.clamp((r - 0.4) / 1.6))); burstTick(o.chips, (r - 1.2) / 1.4); vis(o.chips, r, 1.2, 3.0); o.tur2.visible = r < 3.2; ['tur1', 'tur3'].forEach((k, i) => { o[k].userData.head.rotation.x = -0.9; o[k].userData.fl.visible = Math.floor(t * 12 + i * 3) % 3 === 0; }); }) },
  c7: { cam: [[0, 0, 2.0, -0.6, 6.6, 0.45, 0.4], [2.4, 0, 3.0, -1.0, 7.4, 0.4, 0.4]], flash: [2.6, 0.6, 'rgba(255,255,255,'], A: { drill: { p: [0.6, -3.0, 6.4] }, chips: null, puff2: null, boom2: null, z1: { p: [-2.6, 0.6], f: 160, ex: 'worried' }, z2: { p: [2.6, 0.6], f: -160, ex: 'worried' },
    lander2: { p: [0, 0] }, ring2: { p: [0, -1.0, 3.0] } }, hud: pow([['วู้ววว!', 0.6, 540, 1050, '#5ff0e0', 120], ['EMP!!', 2.6, 540, 1200, '#ffffff', 190]]), shake: [2.6, 3.4, 0.1],
    sfx: [[0.3, 'zip'], [1.2, 'zip'], [2.6, 'zap'], [2.65, 'puff'], [3.6, 'soft']],
    fx: all(swarm(['s1', 's2', 's3', 's4', 's5', 's6'], 'ZION', 0, 6.0, -3.0, 6, 1.4, 2.0, 1.1), drop(['s1', 's2', 's3', 's4', 's5', 's6'], 'ZION', 2.6), (r, t, s, o, st) => { const p = qb(st, [-12, 5, -12], [-2, 4, -2], [2.6, 3.4, -1.4], 0.2, 2.4)(r); o.lander2.position.copy(p); o.lander2.rotation.y = -0.6; o.lander2.rotation.z = r < 2.4 ? Math.sin(t * 6) * 0.3 : 0;
      ringTick(o.ring2, (r - 2.6) / 1.0, 1, 22); o.drill.userData.bit.rotation.y = r < 2.6 ? t * 6 : 0; ['tur1', 'tur3'].forEach((k) => { o[k].userData.fl.visible = r < 2.6 && Math.floor(t * 12) % 3 === 0; }); if (r > 2.8) { s.o.z1.userData.setExpr('giggle'); s.o.z2.userData.setExpr('worried'); } }) },
  c8: { st: 'MCITY', bg: 'storm', cam: [0, 0, 3.0, 0.0, 6.6, 0.3, 0.6], A: { lander: { p: [0, 0] }, o1: { p: [0, 0] }, o2: { p: [0, 0] }, o3: { p: [0, 0] }, o4: { p: [0, 0] }, boom: { p: [0, 0] }, boom2: { p: [0, 0] } },
    hud: pow([['ฟิ้ว ฟิ้ว!', 0.6, 760, 1100, '#ffd94a', 110], ['ตูม ตูม!!', 2.2, 540, 1150, '#ff8a3a', 160]]), sfx: [[0.6, 'zip'], [1.0, 'zip'], [2.2, 'puff'], [2.4, 'puff'], [2.6, 'puff']],
    fx: (r, t, s, o, st) => { o.lander.position.copy(H.at(st, -1.0 + r * 0.3, 3.4 + Math.sin(t * 3) * 0.2, 0.4)); o.lander.rotation.y = 0.3; [['o1', -6, 1], ['o2', 6, 2], ['o3', -4, 6], ['o4', 7, 5]].forEach(([k, x, y], i) => { const k2 = U.clamp((r - 0.3 - i * 0.2) / 1.8); fly(o[k], lin(st, [x, y, -14], [-0.4 + r * 0.3 + (x < 0 ? -1.6 : 1.6), 3.6, -0.6], 0, 1), k2 * 0.9, 0.03); o[k].visible = r > 0.3 + i * 0.2 && r < 2.2; });
      o.boom.position.copy(H.at(st, -1.6, 3.6, -1.0)); o.boom2.position.copy(H.at(st, 2.0, 3.8, -1.0)); const kb = U.clamp((r - 2.2) / 0.3), ko = U.clamp((3.2 - r) / 0.6); [o.boom, o.boom2].forEach((b) => { b.visible = r > 2.2 && r < 3.2; b.scale.setScalar(Math.max(0.01, kb * ko) * 1.2); }); } },
  c9: { st: 'SKY', bg: 'dawn', calm: true, cam: [0, 0, 2.6, 0.0, 5.6, 0.3, 0.6], A: { lander: { p: [0, 0] }, trinR: { p: [0, 0], f: 30, ex: 'happy', say: ['สวยจัง…', 1.8, 4.6] } }, sfx: [[0.4, 'glide'], [1.8, 'shimmer']],
    fx: (r, t, s, o, st) => { o.lander.position.copy(H.at(st, -0.4, U.lerp(-2.0, 2.6, U.easeIO(U.clamp(r / 1.8))), 0.4)); o.lander.rotation.y = 0.3; o.lander.rotation.z = 0.2 * (1 - U.clamp(r / 1.8)); o.trinR.position.copy(o.lander.position); o.trinR.position.y += 0.55 * 2.2; o.trinR.position.x += 0.4; } },
  c10: { st: 'MCITY', bg: 'storm', calm: true, dim: 0.12, cam: [[0, 0, 2.0, 0.0, 6.6, 0.4, 0.4], [2.0, -0.6, 0.6, 0.6, 4.0, 0.55, 0.3]], flash: [1.0, 0.4, 'rgba(255,200,160,'], A: { lander: { p: [0, 0] }, boom2: { p: [1.4, 0.0, 1.0], pop: 1.0, out: 1.8 }, puff2: { p: [1.4, -0.6], pop: 1.2 },
    trinR: { p: [0.4, 0.6, 0], f: 0, lie: true, ex: 'sleepy' }, neoB: { p: [-0.8, 1.1], f: 100, ex: 'cry', pose: 'down' }, heart: { p: [0.4, 0.6, 2.4], pop: 3.0, bob: 0.08, out: 4.6 } }, shake: [1.0, 1.6, 0.14], sfx: [[0.2, 'glide'], [1.0, 'puff'], [2.2, 'soft'], [3.0, 'shimmer']],
    fx: (r, t, s, o, st) => { o.lander.position.copy(H.at(st, U.lerp(-6, 1.4, U.clamp(r / 1.0)), U.lerp(6, 0.4, U.clamp(r / 1.0)), -0.8)); o.lander.rotation.z = -0.5; o.trinR.visible = r > 2.0; o.neoB.visible = r > 2.0; o.heart.visible = o.heart.visible && r > 2.0; } },
  c11: { cam: [[0, 0, 2.6, -1.4, 6.6, 0.35, 0.4], [2.6, 0, 2.4, -1.4, 5.2, 0.4, 0.3]], A: { lander: null, boom2: null, puff2: null, trinR: null, heart: null, neoB: { p: [-0.6, 2.2], to: [0.0, 0.8, 0.2, 1.8], f: 180, ex: 'angry', pose: at_(2.0, null, 'point'), say: ['ผมจะหยุดสมิธให้ แลกกับสันติภาพ', 2.0, 4.8] },
    mind: { p: [0, -4.0, 4.4] } }, sfx: [[0.2, 'glide'], [1.6, 'gong'], [2.0, 'tok'], [4.6, 'shimmer']], fx: (r, t, s, o) => { o.mind.userData.tick(t); o.mind.scale.setScalar(2.2 * (1 + 0.05 * Math.sin(t * 3))); } },
  c12: { st: 'RAIN', bg: 'storm', cam: [0, 0, 1.0, 0.8, 5.8, 0.5, 0.6], A: { rain: { p: [0, 0] }, neo: { p: [0, 3.4], to: [0, 0.6, 0.2, 3.6], f: 180, ex: 'angry' }, sm1: { p: [-2.0, 1.6], f: 90, ex: 'giggle' }, sm2: { p: [2.0, 1.6], f: -90, ex: 'giggle' }, sm3: { p: [-2.4, -0.4], f: 70, ex: 'giggle' },
    sm4: { p: [2.4, -0.4], f: -70, ex: 'giggle' }, sm5: { p: [-2.8, -2.4], f: 60, ex: 'giggle' }, sm6: { p: [2.8, -2.4], f: -60, ex: 'giggle' }, smith: { p: [0, -3.2], f: 0, ex: 'giggle', pose: 'hips', say: ['ยินดีต้อนรับ', 3.2] } },
    sfx: [[0.3, 'soft'], [3.2, 'tok']], fx: (r, t, s, o) => { rainTick(o.rain, t); } },
  c13: { cam: [[0, 0, 4.0, -1.0, 7.0, 0.4, 0.6], [2.6, 0, 1.4, 0.0, 6.0, 0.5, 0.6]], flash: [[1.2, 0.3, 'rgba(255,255,255,'], [2.4, 0.3, 'rgba(255,255,255,']], shake: [3.4, 4.2, 0.16], A: { neo: null, smith: null, sm1: null, sm2: null, sm5: null, sm6: null, fN: { p: [0, 0] }, fS: { p: [0, 0] },
    boom: { p: [0, -1.0, 6.0], pop: 1.2, out: 1.6 }, boom2: { p: [0, -1.0, 5.0], pop: 2.4, out: 2.9 }, puff2: { p: [0, 0.4], pop: 3.4 }, chips: { p: [0, 0.4, 0.2] } },
    hud: pow([['ตูม!!', 1.2, 540, 950, '#ffffff', 150], ['ตูม!!', 2.4, 540, 980, '#ffffff', 150], ['ครืนนน!!', 3.4, 540, 1300, '#ff8a3a', 160]]), sfx: [[0.4, 'zip'], [1.2, 'puff'], [2.4, 'puff'], [3.4, 'puff'], [3.45, 'puff']],
    fx: all((r, t, s, o) => rainTick(o.rain, t), (r, t, s, o, st) => { fly(o.fN, (u) => u < 2.6 ? loop(st, 0, 6.0, -1.0, 2.6, 0.6, 1.2, 2.4, 0)(u) : qb(st, [2.6, 6, -1], [1, 5, 0], [0.3, 0.6, 0.4], 2.6, 3.4)(u), r, 0.03);
      fly(o.fS, (u) => u < 2.6 ? loop(st, 0, 6.0, -1.0, 2.6, 0.6, 1.2, 2.4, Math.PI)(u) : qb(st, [-2.6, 6, -1], [-1, 5, 0], [-0.3, 0.6, 0.4], 2.6, 3.4)(u), r, 0.03); burstTick(o.chips, (r - 3.4) / 1.2); vis(o.chips, r, 3.4, 4.8); }) },
  c14: { cam: [0, 0, 0.9, 0.4, 5.0, 0.5, 0.4], flash: [[3.4, 0.4, 'rgba(255,255,255,'], [4.2, 0.9, 'rgba(255,255,255,']], A: { fN: null, fS: null, boom: null, boom2: null, puff2: null, chips: null,
    neo: { p: [-0.8, 0.8], f: 60, ex: 'sick', lie: false, say: ['เพราะผมเลือกเอง', 1.6, 2.8] }, smith: { p: [0.9, 0.6], f: -60, ex: 'angry', pose: at_(2.8, 'hips', 'reach'), say: ['สู้ไปทำไม!?', 0.2, 1.5] },
    sm1: { p: [-2.4, -1.6], f: 30, ex: 'giggle' }, sm2: { p: [2.6, -1.8], f: -30, ex: 'giggle' }, sm5: { p: [-1.0, -3.0], f: 10, ex: 'giggle' }, sm6: { p: [1.4, -3.4], f: -10, ex: 'giggle' }, sm7: { p: [0.6, 0.8], f: -60, ex: 'giggle', pop: 3.2 }, boomT: { p: [0.6, 0.8, 1.4], pop: 4.2, out: 5.6 } },
    hud: pow([['แสงพุ่ง!!', 4.2, 540, 1150, '#ffffff', 170]]), sfx: [[0.2, 'tok'], [1.6, 'bell'], [3.0, 'zip'], [3.4, 'shimmer'], [4.2, 'puff'], [4.3, 'chime']],
    fx: all((r, t, s, o) => rainTick(o.rain, t), (r, t, s, o, st) => { o.neo.visible = r < 3.3; o.sm7.visible = r > 3.3 && r < 4.3; if (r > 3.6) { ['sm1', 'sm2', 'sm5', 'sm6', 'sm7', 'smith'].forEach((k) => { s.o[k].userData.setExpr('worried'); o[k].userData.head.rotation.x = -0.4; }); }
      if (r > 4.2) { ['sm1', 'sm2', 'sm5', 'sm6', 'smith', 'sm3', 'sm4'].forEach((k) => { if (o[k]) o[k].visible = false; }); } }) },
  c15: { st: 'ZION', bg: 'dawn', cam: [0, 0, 2.0, -0.6, 6.4, 0.45, 0.4], A: { drill: { p: [0.6, -3.0, 6.4] }, lander2: null, ring2: null, z1: { p: [-2.4, 0.4], f: 15, ex: 'worried', head: [-0.4], pose: at_(3.0, null, 'up') }, z2: { p: [2.4, 0.4], f: -15, ex: 'worried', head: [-0.4], pose: at_(3.0, null, 'up') },
    niobe: { p: [-0.7, 0.8], f: 10, ex: 'worried', head: [-0.4], pose: null }, morphR: { p: [0.7, 0.8], f: -10, ex: 'worried', head: [-0.4], pose: at_(3.0, null, 'embrace') }, s1: { p: [0, 0] }, s2: { p: [0, 0] }, s3: { p: [0, 0] }, s4: { p: [0, 0] } },
    hud: pow([['เงียบ…', 0.8, 540, 1150, '#ffffff', 120], ['เย้!!', 3.0, 540, 1250, '#7dff9a', 170]]), sfx: [[0.8, 'soft'], [2.0, 'glide'], [3.0, 'chime'], [3.2, 'pop']],
    fx: (r, t, s, o, st) => { ['s1', 's2', 's3', 's4'].forEach((k, i) => { const u = r < 1.6 ? 0 : (r - 1.6) / 1.4; const base = H.at(st, -3 + i * 2, 5.0 + (i % 2) * 0.8, -2.4); base.y += u * u * 10; base.z -= u * 6; o[k].position.copy(base); o[k].userData.trail.forEach((q) => q.position.set(0, -0.3 * u, 0.4 * u)); o[k].visible = u < 1; });
      if (r > 3.0) ['z1', 'z2', 'niobe', 'morphR'].forEach((k) => s.o[k].userData.setExpr('giggle')); hop(o.z1, r, 3.1, 0.6); hop(o.z2, r, 3.3, 0.6); } },
  c16: { st: 'PARK', bg: 'dawn', calm: true, cam: [0, 0, 1.0, 0.2, 5.0, 0.5, 0.4], A: { arch: { p: [1.2, 0.2], f: -40, ex: 'happy', pose: 'shrug', say: ['ใครอยากออกไป ก็ปล่อยได้', 0.4, 2.8] }, oracle: { p: [-0.8, 0.6], f: 40, ex: 'happy', say: ['สัญญานะ', 3.0, 5.0] },
    kidS: { p: [-2.2, 1.4], f: 20, ex: 'happy', pose: 'wave' } }, sfx: [[0.4, 'soft'], [3.0, 'chime'], [4.0, 'shimmer']] },
  /* =========== ภาค 4 =========== */
  d1: { st: 'STUDIO', bg: 'day', cam: [0, 0, 0.9, 0.2, 5.0, 0.55, 0.4], A: { desk: { p: [0, -1.0] }, mon: { p: [0, -1.1, 0.9] }, neo4: { p: [-0.6, 0.6], f: 30, ex: 'sleepy' }, fk1: { p: [1.8, 0.6], f: -50, ex: 'giggle', pose: at_(2.2, null, 'up') }, fk2: { p: [2.8, -1.4], f: -40, ex: 'giggle', pose: at_(2.4, null, 'up') },
    smith4: { p: [-2.6, -0.8], f: 40, ex: 'happy', pose: 'hips', say: ['บริษัทแม่สั่งทำภาค 4!', 2.6, 4.8] } }, hud: partCard('ภาค 4', '2021', 'Resurrections'), sfx: [[0.4, 'gong'], [2.2, 'pop'], [2.6, 'tok']],
    fx: (r, t, s, o) => { MON(o.mon, '#5ff0e0'); hop(o.fk1, r, 2.2, 0.4); hop(o.fk2, r, 2.4, 0.4); if (r > 2.8) s.o.neo4.userData.setExpr('worried'); } },
  d2: { st: 'THER', bg: 'day', cam: [0, 0, 0.8, 0.2, 4.6, 0.5, 0.3], A: { sofaR: { p: [-1.4, -1.6] }, neo4: { p: [-1.0, 0.6], f: 40, ex: 'worried', pose: at_(3.0, 'give', 'think') }, analyst: { p: [1.2, 0.4], f: -40, ex: 'happy', pose: 'give', say: ['กินยาฟ้าทุกวันนะ', 0.6, 2.6] },
    pillB: { on: ['analyst', 'R', 0, 0.1, 0.06] } }, sfx: [[0.6, 'tok'], [2.0, 'glide'], [3.4, 'pop']], fx: (r, t, s, o) => { if (r > 1.8) { pass(o.pillB, o.analyst, 'R', o.neo4, 'R', r, 1.8, 2.6); if (r > 3.0) { o.pillB.position.lerp(H.pos(o.neo4, 1.9), U.clamp((r - 3.0) / 0.4)); o.pillB.visible = r < 3.4; } } if (r > 3.4) s.o.neo4.userData.setExpr('sleepy'); } },
  d3: { st: 'CAFE', bg: 'day', cam: [0, 0, 0.8, 0.2, 5.0, 0.5, 0.4], A: { table: { p: [-1.6, -0.6] }, cup: { p: [-1.6, -0.6, 0.86] }, neo4: { p: [-1.6, 0.4], f: 60, ex: 'happy' }, tiff: { p: [1.2, 0.4], f: -40, ex: 'happy', say: ['เคยเจอกันไหมคะ?', 1.2, 3.0] },
    chad: { p: [2.6, -0.6], f: -50, ex: 'happy', pop: 2.8 }, k1: { p: [2.4, 1.2], f: -30, pop: 3.0 }, k2: { p: [3.4, 0.8], f: -40, pop: 3.2 } }, sfx: [[0.4, 'soft'], [1.2, 'chime'], [3.0, 'pop']], fx: (r, t, s, o) => { if (r > 3.0) s.o.neo4.userData.setExpr('worried'); } },
  d4: { st: 'STUDIO', bg: 'day', cam: [0, 0, 0.9, 0.2, 5.6, 0.55, 0.4], A: { smith4: null, fk1: null, fk2: null, neo4: { p: [-0.6, 0.8], f: 60, ex: 'worried', pose: guard }, bugs: { p: [-2.6, 1.0], f: 70, ex: 'angry', pose: aim, pop: 0.2 }, pistol: { on: ['bugs', 'R', 0, 0, 0.05], pop: 0.2 },
    morph4: { p: [-1.8, -1.2], f: 60, ex: 'giggle', pose: aim, pop: 0.4, say: ['ไปกันเถอะ!', 3.4] }, pistol2: { on: ['morph4', 'R', 0, 0, 0.05], pop: 0.4 }, ag1: { p: [3.2, 0.2], f: -90, ex: 'angry', fall: [1.25, 1.6] }, ag2: { p: [3.8, -1.6], f: -90, ex: 'angry', fall: [2.25, 2.6] }, rabbit: { p: [-3.6, 1.8], pop: 0.6, s: 0.5 } },
    hud: pow([['ปัง!', 1.2, 760, 1180], ['ปัง!', 2.2, 820, 1250], ['โครม!', 2.7, 540, 1150, '#ff8a3a', 120]]), sfx: [[0.2, 'pop'], [1.2, 'tok'], [2.2, 'tok'], [2.7, 'puff'], [3.4, 'tok']],
    fx: all(guns([[1.2, 'bugs', 'ag1'], [2.2, 'morph4', 'ag2', 'tr2']]), (r, t, s, o) => { if (r > 3.0) s.o.neo4.userData.setExpr('happy'); }) },
  d5: { st: 'PODS', bg: 'night', cam: [0, 0, 1.2, 0.2, 5.4, 0.5, 0.4], A: { pod: { p: [-1.4, 0.4] }, pod2: { p: [1.6, -0.6] }, neo4: { p: [-1.4, 0.4, 0.2], f: 30, ex: 'sleepy', pose: during(1.0, 5, 'reach', 'sleep') },
    tiff: { p: [1.6, -0.6, 0.2], f: -20, ex: 'sleepy', pose: 'sleep' }, pillR: { p: [0, 1.6, 3.2], s: 2.4, out: 0.8 } }, flash: [0.8, 0.4, 'rgba(255,150,150,'], hud: pow([['ทรินิตี้!?', 2.4, 540, 1200, '#ffd94a', 130]]), sfx: [[0.2, 'pop'], [0.8, 'shimmer'], [1.2, 'pop'], [2.4, 'bell']],
    fx: (r, t, s, o) => { if (r > 1.0) s.o.neo4.userData.setExpr('worried'); if (r > 2.4) { s.o.neo4.userData.setExpr('cry'); o.neo4.rotation.y = 0.9; } o.pod.userData.glow.material.opacity = 0.35 + 0.2 * Math.sin(t * 4); } },
  d6: { st: 'IO', bg: 'dawn', cam: [0, 0, 1.0, 0.2, 5.2, 0.5, 0.4], A: { niobeO: { p: [1.0, 0.4], f: -40, ex: 'happy', say: ['ยินดีต้อนรับสู่ไอโอ', 0.4, 2.4] }, neo4: { p: [-1.0, 0.8], f: 40, ex: 'happy' }, bugs: { p: [-2.4, 0.2], f: 40, ex: 'giggle' },
    gold: { p: [2.6, 1.4, 1.6], bob: 0.2 }, z1: { p: [-3.4, -2.0], f: 20, ex: 'happy', pose: 'wave' }, z3: { p: [3.2, -2.4], f: -20, ex: 'happy' } }, sfx: [[0.4, 'chime'], [2.6, 'shimmer']],
    fx: (r, t, s, o) => { o.gold.position.x += Math.sin(t * 2) * 0.4; } },
  d7: { st: 'THER', bg: 'day', cam: [0, 0, 0.8, 0.2, 4.8, 0.5, 0.3], A: { pillB: null, analyst: { p: [1.2, 0.2], f: -40, ex: 'giggle', pose: 'hips', say: [['ใกล้กันแต่ไม่ได้รักกัน', 0.4, 2.6], ['ไฟปั่นได้เยอะสุด!', 2.7, 5.0]] }, neo4: { p: [-1.2, 0.8], to: [-0.6, 0.6, 0.4, 4.6], f: 40, ex: 'angry', pose: punch },
    codegrid: { p: [0, 0] } }, hud: pow([['ช้าาาา…', 1.0, 380, 1150, '#5ff0e0', 120]]), sfx: [[0.4, 'tok'], [1.0, 'glide'], [2.7, 'pop']], fx: (r, t, s, o) => { o.codegrid.visible = r > 1.0; } },
  d8: { st: 'CAFE', bg: 'day', cam: [0, 0, 0.8, 0.2, 5.4, 0.5, 0.4], A: { table: null, cup: null, k1: { p: [2.4, 1.4], f: -60 }, k2: { p: [3.2, 1.0], f: -60 }, chad: { p: [2.6, -0.4], f: -60, ex: 'worried', pose: 'reach', say: ['ที่รัก กลับบ้านกัน', 0.4, 2.0] },
    tiff: { p: [0.6, 0.4], f: -20, ex: 'worried', say: ['ฉันไม่ใช่ทิฟฟานี ฉันคือทรินิตี้', 2.4, 5.4] }, neo4: { p: [-1.4, 0.6], f: 40, ex: 'worried' }, analyst: { p: [-2.6, -1.6], f: 40, ex: 'giggle', pose: 'hips' } },
    sfx: [[0.4, 'tok'], [2.4, 'bell'], [3.0, 'chime']], fx: (r, t, s, o) => { if (r > 2.6) { s.o.tiff.userData.setExpr('angry'); s.o.neo4.userData.setExpr('happy'); s.o.analyst.userData.setExpr('worried'); s.o.chad.userData.setExpr('cry'); } } },
  d9: { cam: [0, 0, 0.8, 0.2, 5.4, 0.5, 0.4], A: { chad: null, k1: null, k2: null, analyst: { p: [-1.2, -0.6], f: 60, ex: 'worried', fall: [1.65, 2.0], fallDir: -1 }, smith4: { p: [-4.0, -0.2], to: [-2.2, -0.4, 0.4, 1.4], f: 70, ex: 'angry', pose: during(1.4, 1.9, punch, null), say: ['ฉันรอวันนี้มานาน', 2.2, 4.4] },
    tiff: { p: [1.0, 0.6], to: [6.0, 1.4, 2.6, 4.4], f: 90, ex: 'happy' }, neo4: { p: [0.0, 0.8], to: [5.0, 1.6, 2.4, 4.2], f: 90, ex: 'happy' } }, hud: pow([['ผัวะ!!', 1.6, 420, 1200, '#ffd94a', 160]]), sfx: [[0.4, 'zip'], [1.6, 'pop'], [1.65, 'puff'], [2.4, 'glide']] },
  d10: { st: 'CITY', bg: 'dusk', cam: [0, 0, 1.0, 0.8, 6.4, 0.55, 0.6], A: { moto: { p: [0, 0] }, tiff: { p: [0, 0], f: 90, ex: 'angry', sit: true }, neo4: { p: [0, 0], f: 90, ex: 'worried', sit: true },
    fk1: { p: [0, 0], f: 90, ex: 'angry' }, fk2: { p: [0, 0], f: 90, ex: 'angry' }, fk3: { p: [0, 0], f: 90, ex: 'angry' }, fk4: { p: [0, 0], f: 90, ex: 'angry' }, fk5: { p: [0, 0], f: 90, ex: 'angry' }, fk6: { p: [0, 0], f: 90, ex: 'angry' } },
    hud: pow([['บรื้นนน!', 0.4, 760, 1150, '#ffd94a', 120], ['ไล่มาทั้งเมือง!', 2.4, 400, 1100, '#ff8a3a', 100]]), sfx: [[0.3, 'zip'], [1.6, 'zip'], [2.4, 'bell']],
    fx: (r, t, s, o, st) => { o.moto.position.copy(H.at(st, -2 + r * 0.8, 0, 1.0)); o.moto.rotation.y = Math.PI / 2; ride(o.tiff, o.moto, 0.25, 0); o.tiff.position.x += 0.2; ride(o.neo4, o.moto, 0.25, 0); o.neo4.position.x -= 0.55;
      ['fk1', 'fk2', 'fk3', 'fk4', 'fk5', 'fk6'].forEach((k, i) => { const x = -9 - (i % 3) * 1.6 + r * 1.6, z = -1.8 + (i % 2) * 1.4 + Math.floor(i / 3) * 0.6; o[k].position.copy(H.at(st, x, Math.abs(Math.sin(t * 9 + i)) * 0.3, z)); o[k].rotation.y = Math.PI / 2; walk(o[k], t, 1.6); }); } },
  d11: { cam: [0, 0, 1.6, 0.8, 6.6, 0.55, 0.6], A: { moto: { p: [1.6, 1.0], f: 90 }, tiff: { p: [2.2, 1.6], f: 120, ex: 'worried' }, neo4: { p: [0.6, 1.2], f: -60, ex: 'angry', pose: at_(2.6, null, 'reach') },
    fk1: { p: [-2.4, 0.4], f: 60, ex: 'angry' }, fk2: { p: [-3.4, -0.6], f: 60, ex: 'angry' }, fk3: { p: [-1.2, -1.2], f: 30, ex: 'angry' }, fk4: { p: [-4.2, 1.2], f: 70, ex: 'angry' }, fk5: { p: [0.4, -2.0], f: 10, ex: 'angry' }, fk6: { p: [-2.8, 1.8], f: 80, ex: 'angry' }, ring1: { p: [0.6, 1.2, 1.4] } },
    hud: pow([['ตุ้บ!', 0.7, 300, 1200, '#ffd94a', 110], ['ตุ้บ!', 1.2, 560, 1150, '#ffd94a', 110], ['ตุ้บ!', 1.7, 420, 1250, '#ffd94a', 110], ['ฟึ่บบบ!!', 2.6, 540, 1150, '#5ff0e0', 170]]), shake: [2.6, 3.2, 0.1], sfx: [[0.7, 'puff'], [1.2, 'puff'], [1.7, 'puff'], [2.6, 'zap'], [2.65, 'puff']],
    fx: (r, t, s, o, st) => { ['fk1', 'fk2', 'fk3', 'fk4', 'fk5', 'fk6'].forEach((k, i) => { const t0 = 0.2 + i * 0.25, u = U.clamp((r - t0) / 0.5); o[k].position.y += (1 - u) * 9; o[k].visible = r > t0;
      if (r > 2.6) { const k2 = U.clamp((r - 2.6) / 0.9), p = o[k].position, dx = p.x - o.neo4.position.x, dz = p.z - o.neo4.position.z, d = Math.hypot(dx, dz) || 1; p.x += dx / d * k2 * 5; p.z += dz / d * k2 * 3; p.y += Math.sin(k2 * Math.PI) * 1.4; o[k].rotation.order = 'YXZ'; o[k].rotation.z = k2 * 1.4; s.o[k].userData.setExpr('cry'); } });
      ringTick(o.ring1, (r - 2.6) / 0.8, 0.6, 9); } },
  d12: { st: 'ROOF4', bg: 'dusk', cam: [[0, 3.6, 0.9, 0.6, 5.4, 0.6, 0.4], [2.0, 9.6, 0.2, 0.6, 5.8, 0.6, 0.0], [3.4, 10.2, 2.2, 0.4, 6.0, 0.4, 0.0]], A: { neo4: { p: [2.4, 1.0], to: [8.0, 1.0, 0.6, 2.0], f: 90, ex: 'angry' }, tiff: { p: [2.4, 0.2], to: [8.0, 0.2, 0.6, 2.0], f: 90, ex: 'angry' },
    fk1: { p: [-1.6, 0.4], to: [5.0, 0.6, 0.8, 2.4], f: 90, ex: 'angry' }, fk2: { p: [-2.6, 1.4], to: [4.2, 1.4, 1.0, 2.6], f: 90, ex: 'angry' }, fT4: { p: [0, 0] } }, hud: pow([['กระโดด!', 2.0, 540, 1100, '#ffd94a', 140], ['บินได้!!', 3.4, 540, 1050, '#5ff0e0', 150]]),
    sfx: [[0.6, 'zip'], [2.0, 'pop'], [2.6, 'glide'], [3.4, 'shimmer'], [3.6, 'chime']],
    fx: (r, t, s, o, st) => { if (r > 2.0) { const k = r - 2.0; o.neo4.position.x += k * 2.2; o.tiff.position.x += k * 2.2; const y = 1.2 * k - 3.0 * k * k; o.neo4.position.y = y; o.tiff.position.y = y; }
      o.tiff.visible = r < 3.0; o.fT4.visible = r >= 3.0; fly(o.fT4, qb(st, [10.4, -1.2, 0.6], [10.0, 2.6, 0.6], [10.6, 5.6, -1.0], 3.0, 5.4), r, 0.03); if (r >= 3.0) { o.neo4.position.copy(o.fT4.position); o.neo4.position.y -= 2.4; o.neo4.rotation.set(0, Math.PI / 2, 0); o.neo4.userData.arms.R.rotation.set(0, 0, 2.8); s.o.neo4.userData.setExpr('giggle'); } } },
  d13: { st: 'THER', bg: 'day', cam: [0, 0, 0.8, 0.2, 5.0, 0.5, 0.3], A: { codegrid: null, analyst: { p: [1.4, -0.2], f: -40, ex: 'worried', pose: 'shrug' }, neo4: { p: [-1.4, 0.8], f: 40, ex: 'happy', say: ['ขอบคุณนะ', 0.4, 2.0] },
    trin: { p: [-0.2, 1.0], f: 20, ex: 'giggle', pose: at_(2.6, null, punch), say: ['เราจะสร้างโลกใหม่เอง', 2.2, 5.0] } }, hud: pow([['ผัวะ!', 2.8, 700, 1150, '#ffd94a', 140]]), sfx: [[0.4, 'chime'], [2.2, 'tok'], [2.8, 'pop']],
    fx: (r, t, s, o) => { slide(o.analyst, r, 2.8, 3.3, 1.6, -0.6); knock(o.analyst, r, 2.8, 3.2, 99, 99, -1); if (r > 2.8) s.o.analyst.userData.setExpr('cry'); } },
  d14: { st: 'ROOF4', bg: 'dawn', calm: true, cam: [[0, 0, 3.0, 0.0, 6.0, 0.4, 0.4], [2.6, 0, 6.0, -2.0, 7.0, 0.2, 0.4]], A: { fN4: { p: [0, 0] }, fT: { p: [0, 0] }, heart: { p: [0, 0] } },
    sfx: [[0.3, 'glide'], [1.2, 'shimmer'], [3.4, 'chime']], fx: (r, t, s, o, st) => { const a = qb(st, [-4, 2.0, 1.0], [0, 4.0, 0.6], [3, 9, -4], 0.2, 4.8); fly(o.fN4, (u) => a(u).add(new T.Vector3(0, 0, 0)), r, 0.03); fly(o.fT, (u) => a(u).add(new T.Vector3(1.4, 0.3, 0)), r, 0.03);
      o.heart.position.copy(o.fT.position); o.heart.position.x -= 0.7; o.heart.position.y += 1.2; o.heart.rotation.y = t * 1.5; } },
  facts: { st: 'SIM', bg: 'night', cam: [0, 0, 1.4, -0.6, 8.0, 1.0, 0.6], A: { neo: { p: [0, 0.6], f: 0, ex: 'happy' }, trin: { p: [-1.6, 0.2], f: 20, ex: 'happy' }, morph: { p: [1.7, 0.0], f: -20, ex: 'happy' } } },
  next: { cam: [0, 0.2, 1.0, 0.6, 3.8, 0.45, 0.6], A: { neo: { pose: 'wave', ex: 'giggle' } }, sfx: [[0.8, 'pop']] },
  ask: { cam: [0, 0.2, 1.0, 0.6, 3.6, 0.45, 0.6], A: { neo: { pose: 'think', ex: 'happy', say: ['?', 0.6, 99, true] } } },
};
/* portrait framing: pull every camera back for the vinyl cast */
(() => { const K = 2.6; const sc1 = (c) => { c[2] += 1.9; c[4] *= K; c[5] *= K; c[6] *= K; }; for (const id in SC) { const c = SC[id].cam; if (!c) continue; if (typeof c[0] === 'number') sc1(c); else c.forEach(sc1); } })();
/* readability: figures turned fully sideways face the camera a little more */
(() => { const FIG = new Set(Object.keys(CAST).filter((k) => !/^(f[A-Z]|desk|mon|phone|bug|car|truck|moto|heli|sofa|table|pill|pod|cot|batt|screens|tvwall|booth|spoon|cookies|burger|cash|pistol|rifle|launcher|sword|pole|key|door|tur|drill|mind|codegrid|lander|bl\d|chips|pil\d|train|boom|puff|flash|rain|s\d|o\d|gold|ring|heart|rabbit|cup|label|mf|tr\d|cloud|kidBike)/.test(k)));
  for (const id in SC) for (const k in (SC[id].A || {})) { const a = SC[id].A[k]; if (!a || !FIG.has(k) || typeof a.f !== 'number' || a.on || a.lie) continue; if (a.f >= 80 && a.f <= 120) a.f = 62; else if (a.f <= -80 && a.f >= -120) a.f = -62; } })();
EP.light = 1.35;
