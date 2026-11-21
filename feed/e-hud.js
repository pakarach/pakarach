/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = b.big ? 84 : 40; g.font = F(700, px); const w = Math.max(b.big ? 110 : 0, g.measureText(b.txt).width + 48), h = b.big ? 120 : 74;
  let x = U.clamp(b.x - w / 2, 70, 1010 - w), y = Math.max(800, b.y - h - 26);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = b.c === '#fff' ? '#1a1f3a' : '#a01830'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function chapter(g, t) {
  const n = CHAP.length, w = 122, gap = 8, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 236;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 23); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 22); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = big ? 70 : 54, x = 540 - w / 2, y = 292; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 22); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function gauges(g, t) {
  const v = gauge(t), y = 432, a = U.clamp((t - at('hook4')) / 0.4); g.save(); g.globalAlpha = a;
  const big = inB(t, 'hook4') || inB(t, 's5') || inB(t, 's7') || inB(t, 's8') || inB(t, 's9');
  const bw = big ? 330 : 270, bh = big ? 34 : 26;
  [[0, 'สุข', P.teal], [1, 'อยาก', P.coral]].forEach(([i, nm, c]) => {
    const x = i ? 556 : 524 - bw - 92; txt(g, nm, x + 40, y, big ? 40 : 32, c, 800);
    const bx = x + 92; g.fillStyle = 'rgba(255,255,255,.16)'; rr(g, bx, y - bh / 2, bw, bh, bh / 2); g.fill();
    g.fillStyle = c; rr(g, bx, y - bh / 2, Math.max(bh, bw * v[i]), bh, bh / 2); g.fill();
  });
  if (inB(t, 's9')) { txt(g, 'เวทนา', 540 - 20 - bw / 2 - 70 + 72 - 36 + 0, y + 50, 30, P.teal, 700); txt(g, 'ตัณหา', 560 + 72 + bw / 2, y + 50, 30, P.coral, 700); }
  g.restore();
}
function clock(g, t) {
  let mins = 23 * 60; if (inB(t, 'hook2')) mins += Math.round(167 * U.easeIO(sm(0.4, 3.4, rel(t, 'hook2')))); else if (t >= at('hook3')) mins += 167;
  if (t >= at('back')) mins = 23 * 60 + 5; const hh = Math.floor(mins / 60) % 24, mm = mins % 60; const s = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  const y = t >= at('back') ? 360 : 420, red = t >= at('hook2') + 3.4 && t < at('back');
  g.save(); g.fillStyle = 'rgba(10,12,30,.8)'; rr(g, 540 - 150, y - 50, 300, 100, 26); g.fill(); g.font = F(800, 74); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = red ? '#ff5d73' : '#7fe0ff'; g.fillText(s, 540, y + 4); g.restore();
}
function dots(g, label, items, cur, col, y) {
  y = y || 432; g.save(); g.font = F(700, 32); const lw = label ? g.measureText(label).width + 24 : 0; const iw = items.map((s) => { g.font = F(700, 30); return g.measureText(s).width + 40; }); const total = lw + iw.reduce((a, b) => a + b + 12, 0); let x = 540 - total / 2;
  if (label) { txt(g, label, x + lw / 2 - 12, y, 32, '#fff', 700); x += lw; }
  items.forEach((s, i) => { g.fillStyle = i < cur ? 'rgba(255,255,255,.4)' : i === cur ? col : 'rgba(255,255,255,.16)'; rr(g, x, y - 26, iw[i], 52, 26); g.fill(); g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.font = F(700, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x + iw[i] / 2, y + 2); x += iw[i] + 12; });
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.92)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 270, 960, 1190, 1);
  txt(g, 'สรุป', 540, 360, 52, '#fff', 800); txt(g, 'ทำไมไถฟีด วางไม่ลง', 540, 440, 70, P.gold, 800);
  const rows = [['ฟีดไม่มีก้น + ลุ้นปัง/แป้ก 50/50', P.gold], ['สัตว์ 6 ตัว = 6 ทวาร ดึงคนละทาง', P.teal], ['โซ่: ผัสสะ→เวทนา→ตัณหา→อุปาทาน', P.teal], ['สมองแยก “สุข” กับ “อยาก” ออกจากกัน', P.coral], ['ฝนแก้วก็ไม่อิ่ม → ผูกไว้กับเสา “สติ”', P.violet]];
  rows.forEach(([s, c], i) => { const k = U.clamp((r - 0.5 - i * 0.8) / 0.3); if (k <= 0) return; const y = 570 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = c; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 23); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('พระไตรปิฎก: ฉัปปาณสูตร · อัสสุตวาสูตร · ปฏิจจสมุปบาทสูตร · ธรรมบท 186 | อรรถกถา: มันธาตุชาดก', 540, 1335);
  g.fillText('Berridge 1989/1991 · Fiorillo et al. Science 2003 · Su et al. 2021 · DataReportal 2025–26 · วิจัยกรุงศรี', 540, 1372);
  g.fillText('Raskin (infinite scroll 2006) · Brichter (pull-to-refresh 2009) · ภาพจำลองประกอบ', 540, 1409);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (between(t, 'm1', 'm6')) { g.fillStyle = 'rgba(120,80,30,0.10)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('n1') && t < at('back')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (between(t, 'hook1', 'hook3') || inB(t, 'back')) clock(g, t);
  if (GAUGE_ON(t) && !inB(t, 'm2') && !inB(t, 'm4') && !between(t, 'p4', 'p7') && !between(t, 'c2', 'c5')) gauges(g, t);
  if (between(t, 'c2', 'c5')) dots(g, '', ['ผัสสะ', 'เวทนา', 'ตัณหา', 'อุปาทาน'], ['c2', 'c3', 'c4', 'c5'].indexOf(id), P.gold);
  if (inB(t, 'm2')) dots(g, '', ['เจ้าชาย', 'อุปราช', 'ราชา'], Math.min(2, Math.floor(rel(t, 'm2') / (dur('m2') / 3))), P.gold);
  if (inB(t, 'm4') && S && S.hv.count) { g.save(); g.fillStyle = 'rgba(10,12,30,.8)'; rr(g, 540 - 250, 392, 500, 84, 30); g.fill(); txt(g, 'พระอินทร์ องค์ที่ ' + S.hv.count, 540, 436, 50, P.gold, 800); g.restore(); }
  if (between(t, 'p4', 'p7')) dots(g, 'วิธี', ['1', '2', '3', '4'], ['p4', 'p5', 'p6', 'p7'].indexOf(id), '#9fe870');
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('swipe', (tt) => { VE.audio.noise(tt, 0.12, { type: 'bandpass', f: 2400, vol: 0.02 }); });
const AUD = [];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 12) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
for (const c of CHAP) AUD.push([at(c[1], 0.1), 'bell']);
AUD.push([at('hook1', 1.2), 'pop'], [at('hook3', 1.4), 'pop'], [at('hook4', 0.5), 'soft']);
for (let i = 0; i < 10; i++) AUD.push([at('hook2', 0.5 + i * 0.3), 'tok']);
for (let i = 0; i < 6; i++) AUD.push([at('n1', 0.8 + i * 0.4), 'tok']);
for (let i = 0; i < 8; i++) AUD.push([at('n2', 1.0 + i * 0.32), 'tok']);
for (let i = 0; i < 4; i++) AUD.push([at('d1', 0.5 + i * 0.8), 'swipe']);
AUD.push([at('d4', 0.5), 'glide'], [at('d4', 3.7), 'glide']);
for (let i = 0; i < 5; i++) AUD.push([at('d5', 1.0 + i * 0.3), 'soft']);
for (let n = 0; n < 4; n++) AUD.push([at('d6', n * 1.3 + 0.4), [1, 0, 0, 1][n] ? 'chime' : 'tok']);
for (let i = 0; i < 6; i++) AUD.push([at('a1', 0.8 + i * 0.35), 'pop']);
for (let i = 0; i < 6; i++) AUD.push([at('a4', 0.4 + i * 0.3), 'pop']);
for (let i = 0; i < 6; i++) AUD.push([at('a6', 0.5 + i * 0.95), 'swipe']);
for (let i = 0; i < 4; i++) AUD.push([at('c1', 0.5 + i * 0.4), 'pop']);
['c2', 'c3', 'c4', 'c5'].forEach((id) => AUD.push([at(id, 0.3), 'bell']));
AUD.push([at('c6', 0.5), 'soft'], [at('s4', 1.8), 'pop'], [at('s5', 0.4), 'shimmer'], [at('s8', 0.6), 'chime'], [at('s8', 0.8), 'shimmer'], [at('s9', 0.5), 'bell']);
AUD.push([at('m1', 1.2), 'shimmer'], [at('m3', 0.3), 'glide'], [at('m4', 0.3), 'glide'], [at('m6', 1.4), 'glide'], [at('m7', 0.6), 'chime']);
for (let i = 0; i < 12; i++) AUD.push([at('m4', 1.6 + i * 0.32), 'tok']);
AUD.push([at('p1', 0.5), 'soft'], [at('p3', 0.4), 'chime'], [at('p4', 1.0), 'soft'], [at('p6', 2.0), 'pop'], [at('p7', 2.6), 'bell'], [at('back', 0.5), 'soft']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'thai-feed-kiles-youtube' : 'thai-feed-kiles', title: 'ไถฟีดทีไร กิเลสเกิด',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'm5', 'm6') || between(t, 'a3', 'a3'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
