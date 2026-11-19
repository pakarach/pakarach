/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = b.big ? 72 : 40; g.font = F(700, px); const w = Math.max(b.big ? 110 : 0, g.measureText(b.txt).width + 48), h = b.big ? 110 : 74;
  const x = U.clamp(b.x - w / 2, 70, 940 - w), y = U.clamp(b.y - h - 26, 800, 1420);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = b.c === '#fff' ? '#1a1f3a' : '#a01830'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function chapter(g, t) {
  const n = CHAP.length, w = 102, gap = 7, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 236;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 22); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function yearPill(g, t) {
  let y0 = null; for (const yr of YEARS) if (between(t, yr[0], yr[1])) y0 = yr[2]; if (y0 == null) return;
  const s1 = typeof y0 === 'number' ? 'ค.ศ. ' + y0 : y0, s2 = typeof y0 === 'number' ? 'พ.ศ. ' + (y0 + 543) : '';
  g.save(); g.font = F(800, 40); const w1 = g.measureText(s1).width; g.font = F(600, 30); const w2 = s2 ? g.measureText(s2).width + 30 : 0; const w = w1 + w2 + 60, x = 540 - w / 2, y = 292;
  g.fillStyle = 'rgba(15,22,48,.82)'; rr(g, x, y, w, 62, 31); g.fill(); g.strokeStyle = P.gold; g.lineWidth = 3; g.stroke();
  g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, 40); g.fillStyle = P.gold; g.fillText(s1, x + 30, y + 33);
  if (s2) { g.font = F(600, 30); g.fillStyle = '#fff'; g.fillText(s2, x + 30 + w1 + 30, y + 34); } g.restore();
}
function icon(g, k, x, y, c) {
  g.save(); g.fillStyle = c; g.strokeStyle = c; g.lineWidth = 5; g.lineCap = 'round';
  if (k === 0) { g.beginPath(); g.moveTo(x - 6, y - 16); g.lineTo(x + 6, y - 16); g.lineTo(x, y + 18); g.closePath(); g.fill(); }
  if (k === 1) { g.beginPath(); g.moveTo(x - 16, y + 10); g.lineTo(x - 16, y - 8); g.lineTo(x - 8, y + 2); g.lineTo(x, y - 14); g.lineTo(x + 8, y + 2); g.lineTo(x + 16, y - 8); g.lineTo(x + 16, y + 10); g.closePath(); g.fill(); }
  if (k === 2) { g.beginPath(); g.ellipse(x, y, 12, 17, 0, 0, 6.283); g.stroke(); g.beginPath(); g.moveTo(x - 4, y - 6); g.lineTo(x + 4, y - 10); g.stroke(); }
  if (k === 3) { g.beginPath(); g.arc(x, y + 3, 13, 0, 6.283); g.fill(); g.beginPath(); g.moveTo(x - 4, y - 8); g.lineTo(x, y - 18); g.lineTo(x + 4, y - 8); g.fill(); }
  if (k === 4) { g.beginPath(); g.arc(x, y, 9, 0, 6.283); g.fill(); for (let i = 0; i < 8; i++) { const a = i * 0.785; g.beginPath(); g.moveTo(x + Math.cos(a) * 13, y + Math.sin(a) * 13); g.lineTo(x + Math.cos(a) * 18, y + Math.sin(a) * 18); g.stroke(); } }
  g.restore();
}
function rulesRow(g, t, numbered) {
  const w = 186, gap = 8, x0 = 540 - (5 * w + 4 * gap) / 2, y = 378;
  RULES.forEach((rl, i) => {
    const on = ruleOn(i, t), x = x0 + i * (w + gap), fresh = on && t < ruleOn.t0(i) + 1.2;
    const k = fresh ? U.easeBack(U.clamp((t - ruleOn.t0(i)) / 0.4)) : 1;
    g.save(); g.translate(x + w / 2, y + 40); g.scale(fresh ? 0.8 + 0.2 * k : 1, fresh ? 0.8 + 0.2 * k : 1); g.translate(-(x + w / 2), -(y + 40));
    g.fillStyle = on ? (fresh ? P.gold : 'rgba(255,201,74,.9)') : 'rgba(255,255,255,.12)'; rr(g, x, y, w, 80, 22); g.fill();
    const tc = on ? '#0f1630' : 'rgba(255,255,255,.55)';
    icon(g, i, x + 34, y + 30, tc);
    g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = tc; g.font = F(800, 28); g.fillText(numbered ? (i + 1) + ' ' + rl[0] : rl[0], x + 58, y + 28);
    g.font = F(600, 22); g.fillText(on ? rl[1] : '?', x + 60, y + 58);
    g.restore();
  });
}
ruleOn.t0 = (i) => { let lo = 0, hi = DUR; for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (ruleOn(i, m)) hi = m; else lo = m; } return hi; };
function steps(g, t) {
  let act = inB(t, 'sci1') ? 1 : inB(t, 'sci2') ? 2 : inB(t, 'sci3') || inB(t, 'myth') ? 3 : inB(t, 'sci4') ? 4 : 0;
  const lab = ['แก๊ส', 'ของเหลว', 'ผิวหด', 'เสียงคราง'], w = 200, x0 = 540 - 2 * w + w / 2, y = 410; g.save();
  for (let i = 1; i <= 4; i++) { const x = x0 + (i - 1) * w, on = i === act, done = i < act; g.fillStyle = on ? P.gold : done ? P.teal : 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(x, y, on ? 36 : 30, 0, 6.283); g.fill(); g.fillStyle = on || done ? '#0f1630' : '#fff'; g.font = F(800, on ? 40 : 32); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); txt(g, lab[i - 1], x, y + 62, 26, on ? P.gold : '#fff', 600); }
  g.restore();
}
function counter(g, label, n, col, unit) {
  g.save(); g.font = F(700, 36); const lw = g.measureText(label).width; g.font = F(800, 84); const nw = g.measureText(n).width; g.font = F(600, 34); const uw = unit ? g.measureText(unit).width + 16 : 0;
  const w = lw + nw + uw + 90, x = 540 - w / 2, y = 372; g.fillStyle = 'rgba(15,22,48,.8)'; rr(g, x, y, w, 104, 30); g.fill();
  txt(g, label, x + 30 + lw / 2, y + 54, 36, '#fff', 700); txt(g, n, x + 30 + lw + 20 + nw / 2, y + 52, 84, col, 800); if (unit) txt(g, unit, x + 50 + lw + nw + uw / 2, y + 58, 34, '#fff', 600); g.restore();
}
function dots(g, label, n, cur, col, names) {
  const y = 418; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const step = names ? 130 : 76; const total = lw + 24 + n * step; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + step / 2;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 32 : 26, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 28); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); if (names) txt(g, names[i - 1], x, y + 56, 24, i <= cur ? '#fff' : 'rgba(255,255,255,.5)', 600); x += step; }
  g.restore();
}
function meter(g, label, k, col) { const x = 300, y = 400, w = 480; g.save(); txt(g, label, x - 70, y + 20, 36, '#fff', 700); g.fillStyle = 'rgba(255,255,255,.15)'; rr(g, x, y, w, 40, 20); g.fill(); g.fillStyle = col; rr(g, x, y, Math.max(40, w * k), 40, 20); g.fill(); txt(g, Math.round(k * 100) + '%', x + w + 70, y + 20, 36, col, 800); g.restore(); }
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.92)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
let ROM = null;
function romania(g, t) {
  const r = rk(t, 'dra3'), a = U.clamp(r / 0.4) * U.clamp((BASE.dra3 - r) / 0.3);
  if (!ROM) { const f = DATA.world.features.find((q) => q.properties.name === 'Romania'); ROM = f ? (f.geometry.type === 'Polygon' ? [f.geometry.coordinates[0]] : f.geometry.coordinates.map((p) => p[0])) : []; }
  const x0 = 560, y0 = 860, w = 440, h = 400; panel(g, x0, y0, w, h, a); if (!ROM.length) return;
  g.save(); g.globalAlpha = a; const pr = (q) => [x0 + 40 + (q[0] - 20.2) / (29.8 - 20.2) * (w - 80), y0 + 70 + (48.3 - q[1]) / (48.3 - 43.6) * (h - 160)];
  g.fillStyle = '#4f5aa0'; g.strokeStyle = '#ffffff'; g.lineWidth = 3; for (const ring of ROM) { g.beginPath(); ring.forEach((q, i) => { const p = pr(q); i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }); g.closePath(); g.fill(); g.stroke(); }
  const c = pr([24.2, 46.4]); g.fillStyle = 'rgba(46,230,197,.5)'; g.beginPath(); g.ellipse(c[0], c[1], 95, 60, 0, 0, 6.283); g.fill();
  txt(g, 'ทรานซิลเวเนีย', c[0], c[1] - 4, 30, '#fff', 700); txt(g, 'โรมาเนีย', x0 + w / 2, y0 + 40, 30, '#fff', 600);
  const xk = sm(1.4, 1.8, r); if (xk > 0) { g.strokeStyle = P.coral; g.lineWidth = 16; g.lineCap = 'round'; const s0 = 70 * xk; g.beginPath(); g.moveTo(c[0] - s0, c[1] - s0); g.lineTo(c[0] + s0, c[1] + s0); g.moveTo(c[0] + s0, c[1] - s0); g.lineTo(c[0] - s0, c[1] + s0); g.stroke(); txt(g, 'ไม่เคยไป', x0 + w / 2, y0 + h - 44, 44, P.coral, 800); }
  g.restore();
}
function chainCard(g, t) {
  const r = rk(t, 'chain'), a = U.clamp(r / 0.3);
  const rows = [['ภูเขาไฟตัมโบราระเบิด', '1815'], ['ปีที่ไม่มีฤดูร้อน', '1816'], ['ติดบ้าน แข่งเล่าเรื่องผี', '1816'], ['แวมไพร์หน้าหล่อเกิดขึ้น', '1819']];
  panel(g, 110, 820, 860, 640, a * 0.95);
  rows.forEach((row, i) => { const k = U.clamp((r - 0.4 - i * 0.7) / 0.3); if (k <= 0) return; const y = 880 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = i === 3 ? P.gold : 'rgba(255,255,255,.1)'; rr(g, 150, y, 780, 100, 26); g.fill();
    txt(g, row[1], 230, y + 50, 40, i === 3 ? '#0f1630' : P.gold, 800); g.fillStyle = i === 3 ? '#0f1630' : '#fff'; g.font = F(700, 40); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(row[0], 320, y + 52);
    if (i < 3) { g.fillStyle = P.teal; g.beginPath(); g.moveTo(520, y + 108); g.lineTo(560, y + 108); g.lineTo(540, y + 140); g.fill(); } g.restore(); });
}
function recapCard(g, t) {
  const r = rk(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((BASE.recap - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป: กฎแวมไพร์', 540, 360, 64, '#fff', 800); txt(g, 'มาจากไหน?', 540, 440, 64, P.gold, 800);
  const rows = [['ไม้ตอก', 'ความเชื่อชาวบ้าน (เซอร์เบีย 1725)'], ['หน้าหล่อ', 'The Vampyre 1819 (เพราะภูเขาไฟ)'], ['ไม่มีเงาในกระจก', 'นิยาย Dracula 1897'], ['กลัวกระเทียม', 'ชาวบ้าน → นิยาย Dracula 1897'], ['กลัวแดด', 'หนัง Nosferatu 1922']];
  rows.forEach((s0, i) => { const k = U.clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 560 + i * 140; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 4 ? P.gold : P.teal; g.beginPath(); g.arc(165, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 165, y + 2);
    txt(g, s0[0], 225, y - 18, 40, '#fff', 800, 'left'); txt(g, s0[1], 225, y + 28, 30, P.gold, 600, 'left'); g.restore(); });
  const k2 = U.clamp((r - 4.4) / 0.3); g.globalAlpha = a * k2; txt(g, 'ศพบวม + เลือดที่ปาก = การเน่าตามธรรมชาติ', 540, 1290, 36, P.teal, 700);
  g.globalAlpha = a * 0.85; g.font = F(400, 22); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: รายงาน Frombald 1725 · Visum et Repertum 1732 · Paul Barber (1988) · Smithsonian · History.com', 540, 1360);
  g.fillText('Science News/Notes from Poland (Pień) · NPR/Current Biology 2019 · สภากาชาดไทย 2569 · ภาพจำลอง', 540, 1394);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t), stN = stAt(t);
  if (stN === 'EXE') { g.fillStyle = 'rgba(170,190,255,0.10)'; g.fillRect(0, 0, W, H); }
  if (stN === 'CINE' && between(t, 'nos1', 'nos2')) { g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('zosia1') && t < at('recap')) chapter(g, t);
  yearPill(g, t);
  if (inB(t, 'petar2')) counter(g, 'คนตาย', String(Math.min(9, Math.floor(sm(0.3, 3.6, rk(t, 'petar2')) * 9 + 0.0001))), P.coral, 'คน');
  else if (inB(t, 'paole1')) counter(g, 'คนตาย', String(Math.min(17, Math.floor(sm(0.4, 3.4, rk(t, 'paole1')) * 17 + 0.0001))), P.coral, 'ราย');
  else if (between(t, 'sci1', 'sci4')) steps(g, t);
  else if (inB(t, 'bat2')) dots(g, 'อดเลือด', 3, 1 + Math.min(2, Math.floor(sm(0.4, 2.4, rk(t, 'bat2')) * 3)), P.coral, ['คืน 1', 'คืน 2', 'คืน 3']);
  else if (inB(t, 'dra5')) meter(g, 'พลัง', 1 - 0.6 * sm(0.6, 3.6, rk(t, 'dra5')), P.gold);
  else if (inB(t, 'th1')) counter(g, 'สำรอง', Math.round(3000 * U.easeOut(sm(0.6, 3.6, rk(t, 'th1')))).toLocaleString('en-US'), P.coral, 'ยูนิต/วัน');
  else if (inB(t, 'th2')) dots(g, 'บริจาค', 4, 1 + Math.min(3, Math.floor(sm(0.3, 3.0, rk(t, 'th2')) * 4)), P.coral, ['ม.ค.', 'เม.ย.', 'ก.ค.', 'ต.ค.']);
  else if (t >= at('zosia1') && t < end('nos4')) rulesRow(g, t, false);
  if (inB(t, 'ask')) rulesRow(g, t, true);
  if (inB(t, 'dra3')) romania(g, t);
  if (inB(t, 'chain')) chainCard(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
  if (FLASH > 0) { g.fillStyle = 'rgba(255,255,255,' + FLASH + ')'; g.fillRect(0, 0, W, H); }
}

/* audio */
FK.softSfx();
VE.registerSfx('thunder', (tt) => VE.audio.noise(tt, 1.4, { type: 'bandpass', f: 900, f2: 750, q: 0.5, vol: 0.04, att: 0.05 }));
VE.registerSfx('flutter', (tt) => { for (let i = 0; i < 5; i++) VE.audio.noise(tt + i * 0.07, 0.05, { type: 'highpass', f: 2500, vol: 0.025 }); });
VE.registerSfx('crackle', (tt) => { for (let i = 0; i < 6; i++) VE.audio.noise(tt + i * 0.13 + (i % 2) * 0.04, 0.03, { type: 'highpass', f: 3000, vol: 0.03 }); });
VE.registerSfx('cough', (tt) => { VE.audio.noise(tt, 0.12, { type: 'bandpass', f: 1300, q: 1.2, vol: 0.035 }); VE.audio.noise(tt + 0.22, 0.1, { type: 'bandpass', f: 1200, q: 1.2, vol: 0.03 }); });
VE.registerSfx('stamp', (tt) => { VE.audio.tone(tt, 880, 0.06, { type: 'triangle', vol: 0.05, rel: 0.05 }); VE.audio.noise(tt, 0.08, { type: 'bandpass', f: 1500, vol: 0.04 }); });
VE.registerSfx('organ', (tt) => { for (const n of [57, 60, 64]) VE.audio.tone(tt, VE.midiHz(n), 1.6, { type: 'sine', vol: 0.02, att: 0.2, rel: 1.0 }); });
const AUD = [[0.1, 'organ'], [at('hook2', 0.4), 'soft'], [at('hook3', 1.7), 'glide', { dur: 1.2 }]];
IRIS.forEach((q) => AUD.push([q.t, 'glide']));
for (let i = 0; i < 9; i++) AUD.push([at('petar2') + ph('petar2', 0.3 + i * 0.37), 'tok']);
for (let i = 0; i < 17; i++) AUD.push([at('paole1') + ph('paole1', 0.4 + i * 0.17), 'tok']);
AUD.push([at('zosia2') + ph('zosia2', 0.4), 'bell'], [at('zosia2') + ph('zosia2', 2.8), 'bell'], [at('dig') + ph('dig', 0.4), 'soft'], [at('stake') + ph('stake', 1.0), 'shimmer'], [at('stake') + ph('stake', 2.1), 'crackle'], [at('news') + ph('news', 0.5), 'glide']);
AUD.push([at('fluck') + ph('fluck', 2.6), 'stamp'], [at('spread') + ph('spread', 0.4), 'pop'], [at('spread') + ph('spread', 1.4), 'pop'], [at('spread') + ph('spread', 2.0), 'pop']);
AUD.push([at('stake') + ph('stake', 1.6), 'bell']);
for (const id of ['sci1', 'sci2', 'sci3', 'sci4']) AUD.push([at(id, 0.15), 'tok']);
AUD.push([at('sci1') + ph('sci1', 0.6), 'soft'], [at('sci4') + ph('sci4', 1.0), 'glide', { dur: 0.8 }]);
AUD.push([at('ex2') + ph('ex2', 1.8), 'cough'], [at('ex4') + ph('ex4', 1.0), 'cough'], [at('ex6') + ph('ex6', 0.3), 'crackle'], [at('ex3') + ph('ex3', 2.6), 'bell'], [at('ex7') + ph('ex7', 1.6), 'bell']);
AUD.push([at('tam1') + ph('tam1', 2.8), 'roar', { dur: 2.0 }], [at('tam2', 0.2), 'roar', { dur: 2.4 }]);
AUD.push([at('dio1', 0.1), 'rain', { dur: 3 }], [at('dio1') + ph('dio1', 1.2), 'thunder'], [at('dio2') + ph('dio2', 3.2), 'thunder'], [at('chain') + ph('chain', 0.6), 'thunder']);
AUD.push([at('dio3') + ph('dio3', 0.6), 'pop'], [at('poli1') + ph('poli1', 0.6), 'pop'], [at('poli1') + ph('poli1', 1.6), 'chime'], [at('poli1') + ph('poli1', 1.8), 'shimmer'], [at('poli2') + ph('poli2', 0.2), 'glide'], [at('poli2') + ph('poli2', 1.8), 'stamp']);
for (let i = 0; i < 4; i++) AUD.push([at('chain') + ph('chain', 0.4 + i * 0.7), 'tok']);
AUD.push([at('dra2') + ph('dra2', 1.4), 'glide'], [at('dra2') + ph('dra2', 2.8), 'chime'], [at('dra2') + ph('dra2', 3.0), 'shimmer'], [at('dra3') + ph('dra3', 1.4), 'pop'], [at('dra4') + ph('dra4', 1.0), 'bell'], [at('dra4') + ph('dra4', 2.4), 'bell']);
AUD.push([at('nos2') + ph('nos2', 0.8), 'chime'], [at('nos2') + ph('nos2', 1.9), 'shimmer'], [at('nos3') + ph('nos3', 0.6), 'stamp'], [at('nos3') + ph('nos3', 1.3), 'stamp'], [at('nos3') + ph('nos3', 1.8), 'crackle'], [at('nos3') + ph('nos3', 3.2), 'bell']);
AUD.push([at('bat1') + ph('bat1', 2.8), 'flutter'], [at('bat2') + ph('bat2', 0.5), 'flutter'], [at('bat3') + ph('bat3', 3.2), 'chime']);
AUD.push([at('th1') + ph('th1', 0.6), 'soft'], [at('th2') + ph('th2', 0.4), 'flutter'], [at('th2') + ph('th2', 2.3), 'chime']);
for (let i = 0; i < 5; i++) { AUD.push([at('recap') + 0.5 + i * 0.7, 'tok']); }
for (let i = 0; i < 5; i++) AUD.push([at(RULES[i][2]) + (i === 3 ? ph('dra4', 2.4) : i === 2 ? ph('dra4', 1.0) : ph(RULES[i][2], 1.6)), 'bell']);
AUD.push([at('ask', 0.3), 'organ']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'vampire-tua-raek-youtube' : 'vampire-tua-raek', title: 'แวมไพร์ตัวแรก ไม่ได้หล่อ',
  brand: { name: 'RuNgee รู้งี้', series: 'ย้อนเวลา', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'petar2', 'stake') || between(t, 'ex2', 'ex8'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
