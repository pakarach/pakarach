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
