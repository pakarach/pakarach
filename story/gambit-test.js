/* ทดสอบ: แกมบิท x โร้ก (scene test, placeholders). Actors are swapped in gambit-test-x.js. */
const EP = {
  no: 0, file: 'gambit-rogue-test', title: 'แกมบิท x โร้ก (ทดสอบ)', series: 'ประวัติตัวละคร',
  cover: [[58, 'แกมบิท x โร้ก', 'teal'], [124, 'รักกันมาก', 'gold'], [100, 'แต่แตะกัน', 'w'], [100, 'ไม่ได้', 'coral']],
  chap: [['แตะไม่ได้', 'b1', 'b3'], ['ขั้วโลกใต้', 'b4', 'b5']],
  factHead: ['รู้งี้…', 'เบื้องหลังตัวละคร'],
  facts: [['เปิดตัวปี 1990 ใน Uncanny X-Men #266', 'สร้างโดยคริส แคลร์มอนต์ กับจิม ลี'], ['ปี 2018 แต่งงานกันจริงใน X-Men Gold #30', 'ในงานที่โปรโมตว่าเป็นของคนอื่น'], ["ปี 2024 ตอน Remember It ใน X-Men '97", 'แกมบิทสละชีวิตบนเกาะจีโนชา']],
  src: 'ที่มา: Marvel.com · ComicBook.com · Wikipedia', factFoot: 'ภาพจำลอง 3D ตัวละครชั่วคราว',
};
const BEATS = [
  ['cover', 2.0],
  ['b1', 5.0], ['b2', 5.4], ['b3', 5.2],
  ['b4', 5.6], ['b5', 5.0],
  ['facts', 7.0], ['next', 3.6], ['ask', 4.4], ['end', 1.6],
];
const CAP = {
  b1: ['{โร้ก} แตะผิวใครนาน ๆ', 'จะ<ดูดพลังและความทรงจำ>ไปหมด'],
  b2: ['แล้ว{แกมบิท} นักพนันปากหวาน', 'ก็ชาร์จไพ่ให้ดู <ตูม!>'],
  b3: ['ใกล้กันแค่เอื้อม', 'แต่<แตะกันไม่ได้>'],
  b4: ['จนความลับของเขาถูกเปิด', 'เธอทิ้งเขาไว้<กลางหิมะขั้วโลก>'],
  b5: ['แต่หนุ่มเคจันคนนี้', '{เดินกลับมาเสมอ}'],
  next: ['อยากดูตอนต่อไหม?', '{คอมเมนต์}บอกหน่อย'],
  ask: ['ถ้าแตะกันไม่ได้ทั้งชีวิต', 'คุณจะ{ยังรักต่อไหม}?'],
};
const ST = { BAR: [0, 0, 0], ICE: [200, 0, 0] };
const ENV = { BAR: [['room', { floor: '#3a2a24', wall: '#241a1e', lamps: [-4, 3], lampC: 'rgba(255,200,140,1)' }]], ICE: [['ice', {}]] };
const CAST = {
  gam: ['gambit', 1.0], rog: ['rogue', 1.0],
  card: ['paper', 0.9], crates: ['crates', 0.55], boom: ['boom', 0.55], puff: ['puff', 0.6], spark: ['glow', 0.22, 'rgba(255,230,170,1)'], cglow: ['glow', 0.16, 'rgba(255,210,150,1)'],
  sn1: ['glow', 0.05, 'rgba(255,255,255,1)'], sn2: ['glow', 0.05, 'rgba(255,255,255,1)'], sn3: ['glow', 0.05, 'rgba(255,255,255,1)'], sn4: ['glow', 0.05, 'rgba(255,255,255,1)'],
  sn5: ['glow', 0.05, 'rgba(255,255,255,1)'], sn6: ['glow', 0.05, 'rgba(255,255,255,1)'], sn7: ['glow', 0.05, 'rgba(255,255,255,1)'], sn8: ['glow', 0.05, 'rgba(255,255,255,1)'],
};
const qb = (st, a, b, c, t0, t1) => (u) => { const k = U.easeIO(U.clamp((u - t0) / (t1 - t0))), m = 1 - k; return H.at(st, m * m * a[0] + 2 * m * k * b[0] + k * k * c[0], m * m * a[1] + 2 * m * k * b[1] + k * k * c[1], m * m * a[2] + 2 * m * k * b[2] + k * k * c[2]); };
const SNOW = ['sn1', 'sn2', 'sn3', 'sn4', 'sn5', 'sn6', 'sn7', 'sn8'];
const snowA = () => { const o = {}; SNOW.forEach((k, i) => (o[k] = { p: [-3 + i * 0.85, -1 + (i % 3) * 0.8, 3] })); return o; };
const snowFx = (r, t, s, o, st) => SNOW.forEach((k, i) => { const y = 4.2 - ((t * 0.55 + i * 0.53) % 4.2); o[k].position.copy(H.at(st, -3.2 + i * 0.9 + Math.sin(t + i) * 0.3, y, -1 + (i % 3) * 0.9)); });
const SC = {
  cover: { st: 'BAR', bg: 'palace', cam: [0, 0, 1.0, 0, 3.8, 0.45, 0], A: { gam: { p: [-0.85, 0], f: 30, pose: 'give' }, rog: { p: [0.85, 0], f: -30, pose: 'reach' }, spark: { p: [0, 0.35, 1.62] } } },
  b1: { cam: [[0, 0.6, 1.0, 0, 3.4, 0.45, -0.3]], A: { spark: null, gam: null, rog: { p: [0.6, 0], f: -15, pose: (c, r) => { if (r > 1.0) c.userData.arms.R.rotation.set(-1.9, 0, -0.3); } } }, sfx: [[1.0, 'soft']],
    fx: (r, t, s, o) => { o.rog.userData.head.rotation.x = r > 1.0 ? 0.25 : 0; } },
  b2: { cam: [0, 0, 1.0, -0.6, 4.8, 0.55, 0], flash: [2.5, 0.25, 'rgba(255,220,170,'], shake: [2.5, 3.0, 0.08], A: {
    rog: { p: [1.3, 0.8], f: -35 }, gam: { p: [-2.4, 1.0], to: [-1.1, 0.5, 0.2, 1.3], f: 30, pose: (c, r) => { if (r > 1.3) POSE.give(c); }, say: ['ดูนี่นะ เชร์', 1.4, 2.4] },
    crates: { p: [0.2, -2.4], out: 2.5 }, card: { p: [0, 0, 0] }, cglow: { p: [0, 0, 0] }, boom: { p: [0.2, -2.4, 0.5], pop: 2.5, out: 3.6 }, puff: { p: [0.2, -2.4], pop: 2.6 } },
    sfx: [[1.4, 'shimmer'], [2.0, 'zip'], [2.5, 'puff']],
    fx: (r, t, s, o, st) => { const hand = H.hand(o.gam, 'R'); const fly = r > 1.9 && r < 2.5; const path = qb(st, [-0.7, 1.7, 0.8], [0, 2.4, -0.6], [0.2, 0.6, -2.4], 1.9, 2.5);
      const p = r < 1.9 ? hand.clone().add(new T.Vector3(0, 0.1, 0.12)) : path(r); o.card.position.copy(p); o.card.rotation.set(fly ? t * 14 : 0.6, fly ? t * 9 : 0, 0); o.card.visible = r > 1.3 && r < 2.5;
      o.cglow.position.copy(p); o.cglow.visible = r > 1.5 && r < 2.5; o.cglow.scale.setScalar(0.48 * (1 + 0.25 * Math.sin(t * 18))); } },
  b3: { cam: [0, 0, 1.0, 0, 3.6, 0.45, 0], calm: true, A: { crates: null, boom: null, puff: null, card: null, cglow: null,
    gam: { p: [-0.7, 0], f: 60, pose: 'reach' }, rog: { p: [0.7, 0], to: [1.4, 0.3, 2.6, 3.4], f: -60, pose: (c, r) => { if (r < 2.6) POSE.reach(c); else POSE.hold(c); }, say: ['อย่าแตะนะ', 2.7] },
    spark: { p: [0, 0.4, 1.62] } }, sfx: [[1.2, 'shimmer'], [2.6, 'tok']],
    fx: (r, t, s, o) => { o.spark.visible = r > 1.0 && r < 2.7 && Math.sin(t * 24) > -0.2; } },
  b4: { st: 'ICE', bg: 'ice', cam: [[0, 0, 1.0, -0.6, 5.0, 0.6, 0.4], [3.0, 0.4, 1.0, -1.4, 6.4, 0.8, 0.5]], calm: true, A: Object.assign({ spark: null,
    gam: { p: [-0.6, 0.4], f: 20, sit: true, pose: 'down' }, rog: { p: [0.6, 0.1], to: [3.6, -4.6, 1.2, 4.4], f: -150, out: 4.8 } }, snowA()), sfx: [[1.2, 'soft'], [4.2, 'bell']], fx: snowFx },
  b5: { cam: [[0, 0, 1.0, 0.2, 3.8, 0.5, -0.2], [2.4, 0, 1.0, 1.2, 3.4, 0.45, -0.1]], A: { rog: null,
    gam: { p: [-0.4, -0.6], to: [0, 1.2, 1.6, 4.4], f: 0, pose: (c, r) => { if (r > 2.6) POSE.give(c); }, say: ['ยังไม่จบหรอก เชร์', 3.0, 99, true] }, card: { on: ['gam', 'R', 0, 0.12, 0.12], pop: 2.7, rot: [1.3, 0, 0.3] }, cglow: { on: ['gam', 'R', 0, 0.14, 0.14], pop: 2.8 } },
    sfx: [[2.8, 'shimmer']], fx: (r, t, s, o, st) => { snowFx(r, t, s, o, st); if (o.cglow.visible) o.cglow.scale.setScalar(0.48 * (1 + 0.25 * Math.sin(t * 18))); } },
  facts: { cam: [0, 0, 1.0, 0, 6.0, 0.7, 0.3], A: { card: null, cglow: null, gam: { p: [-0.6, 0], f: 30 }, rog: { p: [0.6, 0], f: -30 } }, fx: snowFx },
  next: { cam: [0, 0, 1.0, 0, 3.6, 0.45, 0.2], A: { gam: { p: [-0.6, 0], f: 20, pose: 'wave' }, rog: { p: [0.6, 0], f: -20 } }, sfx: [[0.6, 'pop']], fx: snowFx },
  ask: { cam: [0, 0, 1.0, 0, 3.4, 0.45, 0.2], A: { gam: { p: [-0.6, 0], f: 20, pose: 'think' }, rog: { p: [0.6, 0], f: -20, pose: 'shrug', say: ['?', 0.6, 99, true] } }, fx: snowFx },
};
/* portrait framing for the vinyl cast (same pull-back as ironman.js) */
(() => { const K = 2.25; const sc1 = (c) => { c[2] += 1.45; c[4] *= K; c[5] *= K; c[6] *= K; }; for (const id in SC) { const c = SC[id].cam; if (!c) continue; if (typeof c[0] === 'number') sc1(c); else c.forEach(sc1); } })();
(() => { const EX = { cover: { gam: 'giggle', rog: 'worried' }, b1: { rog: 'worried' }, b2: { gam: 'giggle', rog: 'happy' }, b3: { gam: 'happy', rog: 'worried' }, b4: { gam: 'cry', rog: 'worried' }, b5: { gam: 'giggle' }, ask: { rog: 'worried' } };
  for (const id in EX) for (const k in EX[id]) if (SC[id] && SC[id].A && SC[id].A[k]) SC[id].A[k].ex = EX[id][k]; })();
EP.light = 1.35;
