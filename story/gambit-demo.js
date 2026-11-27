/* ตัวอย่างสไตล์ recap (30 วิ): ช่วง "เกิดมาบนหน้ากระดาษแบบงงๆ" ของประวัติแกมบิท. Build: CAST=gambit-full sh story/mk-film.sh gambit-demo out.html --data cfg=land.json */
const EP = { no: 0, file: 'gambit-recap-demo', title: 'ประวัติแกมบิท (ตัวอย่างสไตล์ใหม่)', series: 'ประวัติตัวละคร · แกมบิท', cover: [], recap: true, badges: false, foot: 'RuNgee รู้งี้ · ประวัติตัวละคร: แกมบิท' };
const BEATS = [['cover', 2.4], ['b04', 5.7], ['b05', 22.9], ['end', 1.6]];
const CAP = {};
const RECAP = { booth: ['pgam', 'pkid', 'pcard', 'pglow'], sub: {
  b04: ['เรื่องแรกที่สนุกคือ', 'แม้แต่การเปิดตัวของ{แกมบิท}', 'ก็ยัง{วุ่นวาย}เหมือนชีวิตเขา'],
  b05: ['แกมบิทถูกสร้างโดย{คริส แคลร์มอนต์}', 'นักเขียนเอ็กซ์เมนในตำนาน', 'กับ{จิม ลี} นักวาดที่ออกแบบหน้าตาให้', 'แต่คนที่วาดฉบับเปิดตัวจริงๆ', 'กลับเป็น{ไมค์ คอลลินส์}', 'ตามแผนเดิม แกมบิทจะเปิดตัว',
    'ในอันแคนนี่เอ็กซ์เมน{ฉบับที่ 266} ปี 1990', 'แต่ปรากฏว่า{ฉบับพิเศษประจำปี}', 'ที่มีแกมบิทโผล่มาแว่บๆ', 'ดัน{วางแผงก่อน}ไม่กี่สัปดาห์', 'ทั้งที่เนื้อเรื่องในเล่มนั้น{เกิดขึ้นทีหลัง}'] } };
const RT = recapTiming(BEATS, RECAP.sub), p4 = (i, off) => RT.p('b04', i, off), p5 = (i, off) => RT.p('b05', i, off);
/* booth shots: what each comic panel shows (live renders of the cast, posed for the panel) */
const cardIn = (o, t) => { const h = H.hand(o.pgam, 'R'); o.pcard.visible = true; o.pcard.position.set(h.x, h.y + 0.14, h.z + 0.16); o.pcard.rotation.set(1.3, 0, 0.3); o.pcard.scale.setScalar(o.pcard.userData.s0); o.pglow.visible = true; o.pglow.position.copy(o.pcard.position); o.pglow.scale.setScalar(0.5 * (1 + 0.2 * Math.sin(t * 14))); return h; };
const PSH = {
  hero: (o, t) => { RC.act(o.pgam, 0, 0, 0, 22, 'give', 'giggle', t); cardIn(o, t); return RC.cam(0.4, 2.1, 0, 5.6, -1.3, -1.4); },
  face: (o, t) => { RC.act(o.pgam, 0, 0, 0, -18, 'think', 'giggle', t); return RC.cam(0, 2.55, 0.3, 3.9, 0.15, 0.6); },
  card: (o, t) => { RC.act(o.pgam, 0, 0, 0, 30, 'give', 'happy', t); const h = cardIn(o, t); return { look: [h.x, h.y + 0.15, h.z], pos: [h.x + 0.9, h.y + 0.5, h.z + 2.3] }; },
  peek: (o, t) => { RC.act(o.pkid, -1.0, 0, 0.6, 25, 'reach', 'worried', t); RC.act(o.pgam, 2.9, 0, -4.2, -30, 'wave', 'giggle', t); return RC.cam(0.5, 2.0, -0.5, 9.2, 0.4, 0); },
  eyes: (o, t) => { RC.act(o.pgam, 0, 0, 0, 12, 'hips', 'giggle', t); return RC.cam(0, 2.6, 0.4, 3.0, 0, -0.3); },
};
Object.assign(RECAP, {
  title: { cover: ['บทที่ 1', 'เกิดมาบนหน้ากระดาษ', 'แบบงงๆ'] },
  third: { b04: [[0.5, 'แกมบิท', 'เรมี่ เอเตียน เลอโบ · ราชาไพ่แห่งนิวออร์ลีนส์', 3.8]] },
  credit: { b05: [[p5(0, 0.7), 'เขียนเรื่อง', 'คริส แคลร์มอนต์', p5(5) - p5(0, 0.7)], [p5(2, 0.3), 'ออกแบบตัวละคร', 'จิม ลี', p5(5) - p5(2, 0.3)], [p5(4, 0.2), 'วาดฉบับเปิดตัว', 'ไมค์ คอลลินส์', p5(5) - p5(4, 0.2) + 0.15]] },
  pop: { b04: [[p4(2, 0.3), 'วุ่นวาย!', { x: 0.73, y: 0.32, px: 170, rot: -6, dur: 2.0 }]],
    b05: [[p5(6, 1.0), 'ฉบับ 266', { x: 0.2, y: 0.2, px: 120, rot: -4, dur: 2.2 }], [p5(10, 1.2), 'เกิดทีหลัง?!', { x: 0.21, y: 0.2, px: 112, rot: -4, dur: 2.2, band: '#35d0ff' }]] },
  pages: { b05: [
    { t0: p5(5, 0.25), x: 0.7, y: 0.47, h: 0.78, rot: 3, head: ['ฉบับที่ 266', 'ปี 1990'], to: [p5(7, 0.1), 0.815, 0.45, 8, 0.9], panels: [
      { r: [0, 0, 1, 0.5], bg: ['#4a2a86', '#ff3d8b'], fx: 'burst', cy: 0.7, shot: PSH.hero, cap: 'โจรหนุ่มปรากฏตัว' },
      { r: [0, 0.53, 0.47, 0.47], bg: ['#ffd23f', '#ff9a3a'], fx: 'speed', shot: PSH.face, balloon: 'เชร์!' },
      { r: [0.51, 0.53, 0.49, 0.47], bg: ['#17506e', '#35d0ff'], fx: 'dots', shot: PSH.card, sfx: 'ฟึ่บ!' }] },
    { t0: p5(7, 0.3), from: 'top', x: 0.585, y: 0.5, h: 0.74, rot: -5, head: ['ฉบับพิเศษประจำปี', 'Annual #14'], stamp: [p5(9, 0.35), 'วางแผงก่อน!'], panels: [
      { r: [0, 0, 1, 0.6], bg: ['#1d3b6a', '#3aa0d8'], fx: 'dots', shot: PSH.peek, cap: 'โผล่มาแว่บเดียว' },
      { r: [0, 0.63, 1, 0.37], bg: ['#ff3d8b', '#ffd23f'], fx: 'speed', shot: PSH.eyes }] }] },
});
const ST = { STUDIO: [0, 0, 0] }, ENV = { STUDIO: [['cstudio']] };
const CAST = { gam: ['gambit', 1], card: ['paper', 0.9], cglow: ['glow', 0.16, 'rgba(255,214,150,1)'], pgam: ['gambit', 1], pkid: ['extra', 1, 1], pcard: ['paper', 0.9], pglow: ['glow', 0.16, 'rgba(255,214,150,1)'] };
/* camera key in plain units: time, look (x, y, z), distance, height, side, cut */
const K = (t, lx, ly, lz, d, h, sx, cut) => [t, lx, ly, lz, d / 1.45, h / 1.45, (sx || 0) / 1.45, cut ? 1 : 0];
const toss = (r, t, s, o) => { if (!o.card || !o.card.visible) return; const h = H.hand(o.gam, 'R'), u = (t * 0.85) % 1, up = Math.sin(u * Math.PI) * 1.0; o.card.position.set(h.x, h.y + 0.16 + up, h.z + 0.16); o.card.rotation.set(1.3 + u * 12.566, 0, 0.3);
  if (o.cglow) { o.cglow.position.copy(o.card.position); o.cglow.scale.setScalar(0.45 * (1 + 0.2 * Math.sin(t * 16))); } };
const SC = {
  cover: { st: 'STUDIO', bg: 'studio', cam: [K(0, 2.0, 2.2, 0.3, 10.5, -1.2, -2.2)], A: { gam: { p: [5.2, 0.6], f: -70 }, card: {}, cglow: {} }, fx: toss },
  b04: { cut: true, cam: [K(0, 2.0, 2.2, 0.3, 10.5, -1.2, -2.2), K(p4(1, 0.6), 0.8, 2.45, 0.2, 6.6, -0.5, 1.3, 1)],
    A: { gam: { p: [5.2, 0.6], f: null, to: [0.8, 0.2, 0.2, p4(1, 0.4)], pose: (c, r) => { if (r > p4(2)) POSE.shrug(c); else POSE.give(c); } }, card: {}, cglow: {} }, sfx: [[0.5, 'pop'], [p4(2, 0.3), 'bell']],
    fx: (r, t, s, o, st) => { toss(r, t, s, o); if (r > p4(1, 0.4)) o.gam.rotation.y = 0.22; if (r > p4(2)) { o.gam.userData.setExpr('giggle'); o.card.visible = o.cglow.visible = false; } } },
  b05: { cut: true, cam: [K(0, -0.8, 2.5, -1.0, 13.5, 0.8, 4.2), K(p5(2), -4.2, 3.5, -6.9, 10.2, 0.2, 5.6, 1), K(p5(3), -3.0, 2.45, -3.4, 6.6, -0.5, 1.2, 1), K(p5(5), 0.6, 2.15, -3.4, 10.8, 0.3, 0, 1), K(p5(7, 0.3), 0.5, 2.2, -3.4, 10.0, 0.25, 0, 1), K(p5(10), 0.4, 2.25, -3.4, 9.4, 0.15, 0)],
    shake: [p5(7, 0.62), p5(7, 1.1), 0.09], flash: [[p5(7, 0.62), 0.22, 'rgba(255,250,235,']],
    A: { gam: { p: [0.8, 0.2], to: [-3.0, -3.4, 0.3, p5(2) - 0.4], pose: (c, r) => { if (r < p5(2)) return; if (r < p5(3)) POSE.think(c); else if (r < p5(5)) POSE.shrug(c); else if (r < p5(7, 0.5)) POSE.point(c); else if (r < p5(9)) POSE.up(c); else if (r < p5(10)) POSE.hips(c); else POSE.shrug(c); } } },
    sfx: [[p5(0, 0.7), 'pop'], [p5(2, 0.3), 'pop'], [p5(4, 0.2), 'pop'], [p5(5, 0.25), 'zip'], [p5(6, 1.0), 'bell'], [p5(7, 0.3), 'zip'], [p5(7, 0.62), 'puff'], [p5(9, 0.35), 'tok'], [p5(10, 1.2), 'pop']],
    fx: (r, t, s, o) => { const g = o.gam; if (r >= p5(2) - 0.4) g.rotation.y = r < p5(3) ? Math.PI : r < p5(5) ? 0.25 : 0.85;
      g.userData.setExpr(r < p5(3) ? 'happy' : r < p5(5) ? 'worried' : r < p5(7, 0.5) ? 'giggle' : r < p5(10) ? 'worried' : 'giggle'); if (r > p5(3) && r < p5(5)) g.userData.head.rotation.z = 0.18; } },
};
EP.light = 1.0; EP.toon = { w: 0.024 }; EP.bed = 'lively';
