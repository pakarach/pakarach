/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = b.big ? 84 : 40; g.font = F(700, px); const w = Math.max(b.big ? 110 : 0, g.measureText(b.txt).width + 48), h = b.big ? 120 : 74;
  let x = U.clamp(b.x - w / 2, 70, L.W - 70 - w), y = Math.max(L.LAND ? 200 : 800, b.y - h - 26);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = b.c === '#fff' ? '#1a1f3a' : '#a01830'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function chapter(g, t) {
  const n = CHAP.length, w = 142, gap = 10, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 24); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], px = 34; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = 58, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function dots(g, label, n, cur, col) {
  const y = 420; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * 70; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += 70; }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function pieChart(g, t) {
  const r0 = inB(t, 'ay3') ? rel(t, 'ay3') : dur('ay3') + rel(t, 'ay4'), a = U.clamp(r0 / 0.3);
  const SL = [['เกาศัลยา', 0.5, P.teal, 0.8], ['สุมิตรา', 0.25, '#7fd07f', dur('ay3') + 0.4], ['ไกเกยี', 0.125, P.coral, dur('ay3') + 1.6], ['สุมิตรา อีกรอบ', 0.125, '#7fd07f', dur('ay3') + 3.2]];
  g.save(); g.globalAlpha = a; panel(g, 140, 800, 800, 560, 1);
  const cx = 360, cy = 1080, R = 200; let ang = -Math.PI / 2;
  g.fillStyle = 'rgba(255,255,255,.08)'; g.beginPath(); g.arc(cx, cy, R, 0, 6.283); g.fill();
  SL.forEach((sl, i) => { const k = U.clamp((r0 - sl[3]) / 0.5); if (k <= 0) { ang += sl[1] * 6.283; return; } const a1 = ang + sl[1] * 6.283 * k; g.fillStyle = sl[2]; g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, ang, a1); g.closePath(); g.fill(); g.strokeStyle = '#0f1630'; g.lineWidth = 6; g.stroke(); ang += sl[1] * 6.283;
    const y = 900 + i * 92; g.fillStyle = sl[2]; g.beginPath(); g.arc(630, y, 16, 0, 6.283); g.fill(); txt(g, sl[0], 660, y, 32, '#fff', 600, 'left'); txt(g, ['1/2', '1/4', '1/8', '1/8'][i], 910, y, 36, sl[2], 800, 'right'); });
  if (r0 > dur('ay3') + 3.8) { g.globalAlpha = a * U.clamp((r0 - dur('ay3') - 3.8) / 0.3); txt(g, 'สุมิตรารวม 3/8 → ลูกแฝด', 540, 1310, 36, P.gold, 800); }
  g.restore();
}
function pullCount(g, t) {
  const r = rel(t, 'bw3'), n = Math.round(5000 * U.easeOut(U.clamp((r - 0.4) / 3.2))); g.save(); panel(g, 300, 1300, 480, 170, 1); txt(g, 'คนลาก', 540, 1338, 34, '#fff', 600); txt(g, n.toLocaleString('en-US') + ' คน', 540, 1412, 80, n >= 5000 ? P.gold : '#fff', 800); g.restore();
}
function factCard(g, t) {
  const r = rel(t, 'facts'), a = U.clamp(r / 0.3) * U.clamp((dur('facts') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'รู้งี้…', 540, 370, 56, '#fff', 800); txt(g, 'จากต้นฉบับ', 540, 450, 72, P.gold, 800);
  const rows = [['“สีดา” แปลว่า “รอยไถ”', 'เพราะพบนางในร่องไถนา'], ['มารีจที่รอดชีวิตวันนั้น', 'จะกลับมาอีกครั้งในร่าง “กวางทอง”'], ['ปรศุรามก็เป็นอวตารของพระวิษณุ', 'วันนั้น “สองพระราม” เผชิญหน้ากัน'], ['พี่น้องทั้งสี่แต่งงานในพิธีเดียวกัน', 'กับธิดาและหลานสาวของท้าวชนก'], ['อินเดียวาดพระรามเป็นสีฟ้า', 'ส่วนรามเกียรติ์ของไทยวาดเป็นสีเขียว']];
  rows.forEach((row, i) => { const k = U.clamp((r - 0.6 - i * 2.2) / 0.3); if (k <= 0) return; const y = 590 + i * 148; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 62, 880, 124, 26); g.fill(); g.fillStyle = P.teal; g.beginPath(); g.arc(165, y, 34, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 165, y + 2); txt(g, row[0], 222, y - 22, 36, '#fff', 700, 'left'); txt(g, row[1], 222, y + 24, 32, P.gold, 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: รามายณะ ฉบับวาลมีกิ (พาลกัณฑ์ · อโยธยากัณฑ์)', 540, 1360); g.fillText('บางตอนมีหลายสำนวน · ภาพจำลอง', 540, 1398);
  g.restore();
}
const s0 = () => S;
function coverLand(g) {
  g.save(); g.textAlign = 'left'; const rows = [[64, 'รามายณะ (อินเดีย) EP2', P.teal, 300], [120, 'ธนูที่ 5,000 คน', P.gold, 420], [96, 'ลากแทบไม่ไหว', '#fff', 545], [136, 'แต่เขาหักมัน!', P.coral, 690]];
  rows.forEach((r) => txt(g, r[1], 120, r[3], r[0], r[2], 800, 'left')); g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t), LA = L.LAND;
  atmoGrade(g, t, W, H, bgKey(t), id === 'ay2' ? 1.4 : (id === 'pr5' && rel(t, 'pr5') > 3.2 ? 1.2 : null));
  if (LA) FK.landGradients(g, W, H, { left: t < end('cover') });
  if (LA && t < end('cover')) coverLand(g);
  if (['bt4', 'cl2', 'next', 'vm3', 'hook1'].includes(id)) { g.fillStyle = 'rgba(10,6,30,0.2)'; g.fillRect(0, 0, W, H); }
  const bk = at('bw5', 2.8); if (t > bk && t < bk + 0.35) { g.fillStyle = 'rgba(255,250,230,' + (0.8 * (1 - (t - bk) / 0.35)) + ')'; g.fillRect(0, 0, W, H); }
  if (inB(t, 'pr1') && rel(t, 'pr1') < 0.5) { g.fillStyle = 'rgba(220,230,255,' + (0.6 * (1 - rel(t, 'pr1') / 0.5)) + ')'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  const sh = (dx, dy, f) => { g.save(); if (LA) g.translate(dx, dy); f(); g.restore(); };
  if (t >= at('ay0') && t < at('facts')) sh(L.CX - 540, -70, () => chapter(g, t));
  if (inB(t, 'ay3') || inB(t, 'ay4')) sh(-100, -520, () => pieChart(g, t));
  if (inB(t, 'bw3')) sh(W - 820, -1060, () => pullCount(g, t));
  if (inB(t, 'facts')) { g.save(); if (LA) { g.translate(L.CX - 389, -30); g.scale(0.72, 0.72); } factCard(g, t); g.restore(); }
}

/* audio */
FK.softSfx();
VE.registerSfx('gong', (tt) => { VE.audio.tone(tt, 330, 1.8, { type: 'sine', vol: 0.04, rel: 1.6 }); VE.audio.tone(tt + 0.01, 495, 1.2, { type: 'sine', vol: 0.016, rel: 1.0 }); });
VE.registerSfx('zap', (tt) => { VE.audio.tone(tt, 1300, 0.18, { type: 'sine', vol: 0.03, rel: 0.15 }); VE.audio.tone(tt + 0.05, 900, 0.22, { type: 'sine', vol: 0.025, rel: 0.2 }); });
VE.registerSfx('ching', (tt) => { VE.audio.tone(tt, 1760, 0.4, { type: 'sine', vol: 0.02, rel: 0.35 }); VE.audio.tone(tt + 0.12, 2350, 0.3, { type: 'sine', vol: 0.014, rel: 0.25 }); });
const AUD = [[0.1, 'gong'], [at('facts'), 'gong']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1], pl[2] - L0[2]) > 10) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
AUD.push([at('hook1', 1.6), 'soft'], [at('hook2', 2.0), 'bell'], [at('ay1', 0.6), 'shimmer'], [at('vm2', 0.4), 'soft'], [at('vm4', 0.1), 'gong'], [at('pr1', 0.05), 'zap'], [at('pr2', 1.6), 'bell'], [at('pr3', 1.4), 'soft'], [at('pr4', 1.4), 'shimmer'], [at('pr5', 1.0), 'zap'], [at('pr5', 3.2), 'chime'], [at('cl1', 0.6), 'bell'], [at('wd1', 3.2), 'pop']);
AUD.push([at('ay2', 0.6), 'gong'], [at('ay2', 1.2), 'shimmer'], [at('ay3', 0.8), 'pop'], [at('ay4', 0.4), 'pop'], [at('ay4', 1.6), 'pop'], [at('ay4', 3.2), 'pop'], [at('ay4', 3.8), 'chime'], [at('ay5', 1.6), 'pop'], [at('ay5', 2.0), 'pop'], [at('ay6', 0.4), 'pop'], [at('ay6', 1.4), 'pop']);
AUD.push([at('vm1', 2.4), 'bell'], [at('vm4', 2.6), 'pop'], [at('bt1', 1.0), 'soft'], [at('bt2', 1.0), 'zap'], [at('bt2', 1.5), 'shimmer'], [at('bt3', 0.4), 'zap'], [at('bt3', 2.0), 'chime'], [at('bt4', 0.1), 'soft'], [at('bt4', 2.2), 'bell']);
AUD.push([at('st2', 0.6), 'shimmer'], [at('st2', 2.0), 'pop'], [at('bw1', 0.6), 'bell'], [at('bw2', 0.4), 'tok'], [at('bw2', 2.0), 'tok'], [at('bw2', 3.6), 'tok'], [at('bw4', 0.8), 'shimmer'], [at('bw5', 0.4), 'soft'], [at('bw5', 2.8), 'gong'], [at('bw5', 2.82), 'zap'], [at('bw6', 0.6), 'pop']);
for (let i = 0; i < 8; i++) AUD.push([at('bw3', 0.6 + i * 0.45), 'tok']);
AUD.push([at('bw3', 4.2), 'chime'], [at('wd1', 1.8), 'chime'], [at('wd2', 0.4), 'shimmer'], [at('cl2', 2.0), 'soft'], [at('cl2', 2.4), 'bell'], [at('next', 0.8), 'pop']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, capFont: 'Trirong', file: L.LAND ? 'ramayana-ep2-youtube' : 'ramayana-ep2', title: 'รามายณะ EP2 ธนูพระศิวะ',
  brand: { name: 'RuNgee รู้งี้', series: 'ตำนานเล่าใหม่', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => inB(t, 'bt4') || inB(t, 'cl2') || inB(t, 'bw5') || inB(t, 'vm3') || inB(t, 'facts'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
