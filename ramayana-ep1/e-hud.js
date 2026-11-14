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
function boonPanel(g, t) {
  const a = inB(t, 'bn3') ? U.clamp(rel(t, 'bn3') / 0.3) : 1; const rows = ['เทพ', 'อสูร', 'ยักษ์', 'คนธรรพ์', 'นาค'];
  g.save(); g.globalAlpha = a; panel(g, 250, 820, 580, 520, 1); txt(g, 'พรที่ทศกัณฐ์ขอ: ใครฆ่าไม่ได้', 540, 872, 38, P.gold, 700);
  rows.forEach((s, i) => { const k = inB(t, 'bn3') ? U.clamp((rel(t, 'bn3') - 0.8 - i * 0.6) / 0.25) : 1; if (k <= 0) return; const y = 940 + i * 62; g.globalAlpha = a * k; txt(g, s, 330, y, 42, '#fff', 600, 'left'); txt(g, '✓', 760, y, 50, P.teal, 800); });
  if (t >= at('bn4')) { const r = rel(t, 'bn4'), k = U.clamp((r - 0.3) / 0.3), bl = r < 4 ? 0.6 + 0.4 * Math.abs(Math.sin(r * 4)) : 1; g.globalAlpha = a * k; const y = 940 + 5 * 62; g.fillStyle = 'rgba(255,93,115,.18)'; rr(g, 290, y - 30, 500, 60, 18); g.fill(); g.globalAlpha = a * k * bl; txt(g, 'มนุษย์', 330, y, 44, P.coral, 800, 'left'); txt(g, '✗ ไม่ได้เอ่ยถึง', 680, y, 38, P.coral, 800); }
  g.restore();
}
function headCount(g, t) {
  const n = headsLeft(t); g.save(); panel(g, 330, 1300, 420, 170, 1); txt(g, 'หัวที่เหลือ', 540, 1338, 34, '#fff', 600); txt(g, String(n), 540, 1412, 86, n <= 1 ? P.coral : P.gold, 800); g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป EP1', 540, 370, 56, '#fff', 800); txt(g, 'ทศกัณฐ์ตัดหัวแลกพร', 540, 450, 72, P.gold, 800);
  const rows = ['ทศกัณฐ์ ลูกรากษส อิจฉาพี่ชายกุเวร', 'อดอาหารหมื่นปี ตัดหัวบูชาไฟ 9 หัว', 'พร: ใครก็ฆ่าไม่ได้… ยกเว้นมนุษย์', 'ยึดลงกา ยกเขาไกรลาส ได้ชื่อ “ราวณะ”', 'พระวิษณุ จะลงมาเกิดเป็นมนุษย์'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.8) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 4 ? P.coral : P.teal; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: รามายณะ ฉบับวาลมีกิ (อุตตรกัณฑ์ · พาลกัณฑ์)', 540, 1360);
  g.fillText('บางตอนมีหลายสำนวน · ภาพจำลอง', 540, 1398);
  g.restore();
}
const s0 = () => S;
function coverLand(g) {
  g.save(); g.textAlign = 'left'; const rows = [[64, 'รามายณะ (อินเดีย) EP1', P.teal, 300], [120, 'ตัดหัวตัวเอง 9 หัว', P.gold, 420], [96, 'เพื่อพร', '#fff', 550], [150, 'ข้อเดียว', P.coral, 700]];
  rows.forEach((r) => txt(g, r[1], 120, r[3], r[0], r[2], 800, 'left')); g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t), LA = L.LAND;
  if (LA) FK.landGradients(g, W, H, { left: t < end('cover') });
  if (LA && t < end('cover')) coverLand(g);
  if (['tp4', 'fam9', 'kl4'].includes(id)) { g.fillStyle = 'rgba(10,6,30,0.22)'; g.fillRect(0, 0, W, H); }
  if (inB(t, 'kl3') && rel(t, 'kl3') > 2.3 && rel(t, 'kl3') < 2.6) { g.fillStyle = 'rgba(255,120,120,0.35)'; g.fillRect(0, 0, W, H); }
  if (inB(t, 'bn1') && rel(t, 'bn1') < 0.35) { g.fillStyle = 'rgba(255,240,200,' + (0.5 * (1 - rel(t, 'bn1') / 0.35)) + ')'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  const sh = (dx, dy, f) => { g.save(); if (LA) g.translate(dx, dy); f(); g.restore(); };
  if (t >= at('fam1') && t < at('recap')) sh(L.CX - 540, -70, () => chapter(g, t));
  if (TAG[id]) sh(L.CX - 540, -70, () => tagPill(g, TAG[id], t, id));
  if (between(t, 'tp2', 'tp4')) sh(W - 820, -1060, () => headCount(g, t));
  if (inB(t, 'bn3') || inB(t, 'bn4')) sh(-180, -640, () => boonPanel(g, t));
  if (inB(t, 'recap')) { g.save(); if (LA) { g.translate(L.CX - 389, -30); g.scale(0.72, 0.72); } recapCard(g, t); g.restore(); }
}

/* audio */
FK.softSfx();
VE.registerSfx('gong', (tt) => { VE.audio.tone(tt, 330, 1.8, { type: 'sine', vol: 0.04, rel: 1.6 }); VE.audio.tone(tt + 0.01, 495, 1.2, { type: 'sine', vol: 0.016, rel: 1.0 }); });
VE.registerSfx('zap', (tt) => { VE.audio.tone(tt, 1300, 0.18, { type: 'sine', vol: 0.03, rel: 0.15 }); VE.audio.tone(tt + 0.05, 900, 0.22, { type: 'sine', vol: 0.025, rel: 0.2 }); });
VE.registerSfx('ching', (tt) => { VE.audio.tone(tt, 1760, 0.4, { type: 'sine', vol: 0.02, rel: 0.35 }); VE.audio.tone(tt + 0.12, 2350, 0.3, { type: 'sine', vol: 0.014, rel: 0.25 }); });
const AUD = [[0.1, 'gong'], [at('bn1', 0.1), 'gong'], [at('recap'), 'gong']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1], pl[2] - L0[2]) > 10) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
HRT.forEach((h) => AUD.push([h, 'zap'], [h + 0.05, 'soft']));
AUD.push([at('fam2', 0.4), 'shimmer'], [at('fam4', 0.4), 'pop'], [at('fam5', 0.3), 'pop'], [at('fam5', 1.0), 'pop'], [at('fam5', 2.2), 'pop'], [at('fam7', 0.3), 'chime'], [at('tp4', 0.4), 'tok'], [at('tp4', 1.4), 'tok'], [at('tp4', 2.4), 'tok']);
AUD.push([at('bn2', 2.4), 'soft'], [at('bn4', 0.4), 'bell'], [at('bn5', 0.5), 'shimmer'], [at('bn6', 3.2), 'ching'], [at('bn7', 2.8), 'soft'], [at('bn9', 0.4), 'chime']);
for (let i = 0; i < 5; i++) AUD.push([at('bn3', 0.8 + i * 0.6), 'tok']);
AUD.push([at('lk1', 3.0), 'bell'], [at('lk3', 1.6), 'shimmer'], [at('kl1', 2.4), 'pop'], [at('kl2', 0.8), 'soft'], [at('kl3', 0.9), 'chime'], [at('kl3', 2.3), 'gong'], [at('kl4', 0.4), 'bell'], [at('kl5', 3.2), 'chime'], [at('sv2', 2.8), 'shimmer'], [at('sv3', 3.0), 'chime'], [at('sv4', 2.8), 'gong'], [at('next', 0.8), 'pop']);
for (let i = 0; i < 6; i++) AUD.push([at('kl5', 0.3 + i * 0.5), 'ching']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'ramayana-ep1-youtube' : 'ramayana-ep1', title: 'รามายณะ EP1 ทศกัณฐ์ตัดหัวแลกพร',
  brand: { name: 'RuNgee รู้งี้', series: 'ตำนานเล่าใหม่', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'tp3', 'bn1') || inB(t, 'fam9') || inB(t, 'kl4'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
