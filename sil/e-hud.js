/* Part E: HUD + audio + run (helpers copied from mog/e-hud.js) */
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
  const n = CHAP.length, w = 124, gap = 8, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 24); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = big ? 74 : 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }

/* clock + 5 lamps (the ศีล gauge) */
function clockLamps(g, t) {
  let ci = -1; CLOCK.forEach((c, i) => { if (t >= at(c[0])) ci = i; }); if (ci < 0) return;
  const c = CLOCK[ci], nxt = CLOCK[ci + 1], span = (nxt ? at(nxt[0]) : at('recap')) - at(c[0]);
  const mins = c[1] * 60 + c[2] + Math.floor(U.clamp((t - at(c[0])) / span) * c[3]);
  const s = String(Math.floor(mins / 60) % 24).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
  const y = 420, pop = U.easeBack(U.clamp((t - at(c[0])) / 0.4));
  g.save(); g.translate(150, y); g.scale(0.8 + 0.2 * pop, 0.8 + 0.2 * pop); g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, -92, -36, 184, 72, 36); g.fill(); g.strokeStyle = P.gold; g.lineWidth = 3; g.stroke();
  g.fillStyle = P.gold; g.beginPath(); g.arc(-58, 0, 16, 0, 6.283); g.fill(); g.strokeStyle = '#0f1630'; g.lineWidth = 3; g.beginPath(); g.moveTo(-58, 0); g.lineTo(-58, -10); g.moveTo(-58, 0); g.lineTo(-51, 4); g.stroke();
  g.fillStyle = '#fff'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, 18, 3); g.restore();
  const drunk = inB(t, 'c5d') ? rel(t, 'c5d') : -1;
  for (let i = 1; i <= 5; i++) {
    const x = 330 + (i - 1) * 132; const pass = t >= PASS[i], test = between(t, TEST[i][0], TEST[i][1]) && !pass;
    let col = 'rgba(255,255,255,.16)', r = 34, fg = '#fff';
    if (pass) { col = P.teal; fg = '#0f1630'; const k = U.clamp((t - PASS[i]) / 0.35); r = 34 + 10 * Math.sin(k * Math.PI); }
    if (test) { col = P.gold; fg = '#0f1630'; r = 36 + Math.sin(t * 6) * 3; }
    if (drunk > 0 && i < 5) { const hit = drunk - 1.0 - (4 - i + 1) * 0.45; if (hit > 0) { col = Math.sin(t * 14) > 0 ? P.coral : '#7a2030'; fg = '#fff'; } }
    if (pass) { g.save(); g.globalAlpha = 0.35; g.fillStyle = P.teal; g.beginPath(); g.arc(x, y, r + 12, 0, 6.283); g.fill(); g.restore(); }
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill(); g.fillStyle = fg; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2);
  }
  g.font = F(600, 24); g.fillStyle = 'rgba(255,255,255,.85)'; g.textAlign = 'left'; g.fillText('ศีล', 330 + 4 * 132 + 50, y + 2);
}
/* องค์ chips row */
function chipsState(t) {
  const tick = (id, t0, step, n) => (k) => t >= at(id, t0 + k * step) ? 1 : 0;
  if (inB(t, 'c1b')) { const f = tick('c1b', 0.6, 0.75); return [1, [0, 1, 2, 3, 4].map(f)]; }
  if (inB(t, 'c1c')) return [1, [1, rel(t, 'c1c') > 2.4 ? -1 : 0, rel(t, 'c1c') > 2.4 ? -1 : 0, 1, rel(t, 'c1c') > 2.2 ? 1 : 0]];
  if (inB(t, 'c1d')) return rel(t, 'c1d') < 2.4 ? [1, [1, -1, -1, 1, 1]] : [1, [1, 1, 1, 1, 1]];
  if (inB(t, 'c2c')) { const f = tick('c2c', 0.6, 0.75); return [2, [0, 1, 2, 3, 4].map(f)]; }
  if (inB(t, 'c4c')) { const f = tick('c4c', 0.8, 0.9); return [4, [0, 1, 2, 3].map(f)]; }
  if (inB(t, 'c4d') || inB(t, 'c4e')) return [4, [1, -1, 1, 1]];
  return null;
}
function chips(g, t) {
  const st = chipsState(t); if (!st) return; const lab = ONG[st[0]], v = st[1], n = lab.length;
  const y = 1440; g.save(); g.font = F(700, 30); const ws = lab.map((s) => g.measureText(s).width + 76); const total = ws.reduce((a, b) => a + b, 0) + (n - 1) * 10; const sc = Math.min(1, 1000 / total);
  g.translate(540, y); g.scale(sc, sc); let x = -total / 2;
  lab.forEach((s, i) => { const w = ws[i], k = v[i]; g.fillStyle = k > 0 ? P.teal : k < 0 ? 'rgba(255,93,115,.9)' : 'rgba(15,22,48,.82)'; rr(g, x, -32, w, 64, 32); g.fill(); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = k > 0 ? '#0f1630' : '#fff'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(k > 0 ? '✓' : k < 0 ? '✕' : '○', x + 30, 2); g.font = F(700, 30); g.fillText(s, x + 30 + (w - 44) / 2, 2); x += w + 10; });
  g.restore();
}
/* 20-person grid: 35.2% drink */
function peopleGrid(g, t) {
  const r = rel(t, 'c5f'), a = U.clamp(r / 0.3) * U.clamp((dur('c5f') - r) / 0.3); g.save(); g.globalAlpha = a; panel(g, 120, 1250, 840, 250, 1);
  for (let i = 0; i < 20; i++) { const cx = 200 + (i % 10) * 76, cy = 1325 + Math.floor(i / 10) * 100, on = i < 7 && r > 1.0 + i * 0.22;
    g.fillStyle = on ? P.gold : 'rgba(255,255,255,.28)'; g.beginPath(); g.arc(cx, cy - 18, 13, 0, 6.283); g.fill(); rr(g, cx - 17, cy - 2, 34, 36, 12); g.fill(); }
  g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ประมาณ 7 ใน 20 คน', 540, 1478); g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1220, 1);
  txt(g, 'ศีล 5 = มหาทาน 5', 540, 380, 74, P.gold, 800); txt(g, 'ให้ความไม่มีภัย ไม่มีเวร ไม่เบียดเบียน', 540, 460, 38, '#fff', 600);
  const rows = [['ไม่ฆ่า', 'อายุสั้น'], ['ไม่ลัก', 'ทรัพย์เสื่อม'], ['ไม่ผิดในกาม', 'ก่อเวร มีศัตรู'], ['ไม่โกหก', 'ถูกใส่ร้าย'], ['ไม่เสพของเมา', 'ความเป็นบ้า']];
  txt(g, 'ถ้าละเมิด ผลเบาที่สุดคือ…', 640, 545, 30, 'rgba(255,255,255,.75)', 600);
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.6) / 0.3); if (k <= 0) return; const y = 640 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = P.teal; g.beginPath(); g.arc(170, y, 40, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 42); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s[0], 236, y, 44, '#fff', 700, 'left'); txt(g, '→ ' + s[1], 940, y, 40, P.coral, 700, 'right'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก เล่ม 23 ข้อ 129–130 (ปุญญาภิสันทสูตร · สัพพลหุสสูตร)', 540, 1405);
  g.fillText('องค์ของศีล: อรรถกถา · สำนักงานสถิติแห่งชาติ 2567 · ภาพจำลอง', 540, 1443);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  for (const b of BUB) if (b.vis !== false) bubble(g, b);
  if (t >= at('c0a') && t < at('recap')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (t >= at('c1a') && t < at('recap')) clockLamps(g, t);
  chips(g, t);
  if (inB(t, 'c5f')) peopleGrid(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
  if (between(t, 'c0a', 'c0e')) { g.save(); g.font = F(700, 32); const w = g.measureText('เมื่อวาน · วันพระ').width + 50; g.fillStyle = 'rgba(255,220,170,.92)'; rr(g, 540 - w / 2, 392, w, 56, 28); g.fill(); g.fillStyle = '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('เมื่อวาน · วันพระ', 540, 421); g.restore(); }
}

/* audio */
FK.softSfx();
VE.registerSfx('buzz', (tt) => VE.audio.tone(tt, 640, 1.1, { type: 'triangle', f2: 700, vol: 0.012, att: 0.15, rel: 0.3 }));
VE.registerSfx('clink', (tt) => { VE.audio.tone(tt, 1760, 0.25, { vol: 0.03, rel: 0.25 }); VE.audio.tone(tt + 0.01, 2350, 0.2, { vol: 0.02, rel: 0.2 }); });
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
const AUD = [[0.1, 'shimmer'], [at('hook1'), 'temple'], [at('c0a', 0.4), 'temple'], [at('c1a', 0.4), 'buzz'], [at('c1d', 0.2), 'buzz']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (!SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && id !== 'hook1' && Math.hypot(pl[0] - L0[0], pl[2] - L0[2]) > 12) AUD.push([at(id), 'glide', { dur: 1.4 }]); pl = L0; } }
for (const i of [1, 2, 3, 4, 5]) AUD.push([PASS[i], 'bell']);
for (let k = 0; k < 5; k++) { AUD.push([at('c1b', 0.6 + k * 0.75), 'tok'], [at('c2c', 0.6 + k * 0.75), 'tok']); if (k < 4) AUD.push([at('c4c', 0.8 + k * 0.9), 'tok']); }
for (let k = 0; k < 5; k++) AUD.push([at('c5d', 1.0 + k * 0.45 + 0.3), 'tok']);
for (let k = 0; k < 7; k++) AUD.push([at('c5f', 1.0 + k * 0.22), 'tok']);
for (let k = 0; k < 4; k++) AUD.push([at('c0d', 0.5 + k * 0.6), 'pop']);
for (const d of [0.5, 1.3, 2.9, 3.7, 4.5]) AUD.push([at('p4', d), 'pop']);
AUD.push([at('c1e', 1.0), 'soft'], [at('c2d', 1.0), 'soft'], [at('c3a', 1.0), 'pop'], [at('c4d', 0.3), 'pop'], [at('c5g', 1.0), 'clink'], [at('c5g', 1.8), 'chime']);
AUD.push([at('hook2', 0.5), 'chime'], [at('p3', 0.2), 'chime'], [at('p3', 0.4), 'shimmer'], [at('p6', 3.0), 'shimmer'], [at('p7', 0.3), 'chime'], [at('p7', 0.5), 'shimmer'], [at('recap', 0.2), 'bell']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'sil-5-mahathan-youtube' : 'sil-5-mahathan', title: 'ศีล 5 = มหาทาน',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => inB(t, 'c5d') || inB(t, 'p5'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
