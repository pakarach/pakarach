/* story kit: HUD, audio, run */
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
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }

function factCard(g, t) {
  const r = rel(t, 'facts'), a = U.clamp(r / 0.3) * U.clamp((dur('facts') - r) / 0.3), n = EP.facts.length, gap = Math.min(2.2, (dur('facts') - 2) / n);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  const fh = EP.factHead || ['รู้งี้…', 'จากต้นฉบับ']; txt(g, fh[0], 540, 370, 56, '#fff', 800); txt(g, fh[1], 540, 450, 72, P.gold, 800);
  EP.facts.forEach((row, i) => { const k = U.clamp((r - 0.6 - i * gap) / 0.3); if (k <= 0) return; const y = 590 + i * 148; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 62, 880, 124, 26); g.fill(); g.fillStyle = P.teal; g.beginPath(); g.arc(165, y, 34, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 165, y + 2); txt(g, row[0], 222, y - 22, 36, '#fff', 700, 'left'); txt(g, row[1], 222, y + 24, 32, P.gold, 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText(EP.src, 540, 1360); g.fillText(EP.factFoot || 'บางตอนมีหลายสำนวน · ภาพจำลอง', 540, 1398);
  g.restore();
}
function coverLand(g) {
  g.save(); g.textAlign = 'left'; let y = 300; EP.cover.forEach((r, i) => { const sz = Math.min(r[0], 140); if (i) y += sz * 0.62 + 50; txt(g, r[1], 120, y, sz, COL[r[2]] || r[2], 800, 'left'); y += i ? 0 : 0; if (!i) y += 60; }); g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t), LA = L.LAND, sc = SC[id] || {}, r = rel(t, id);
  atmoGrade(g, t, W, H, bgKey(t), sc.rays != null ? sc.rays : null);
  if (LA) FK.landGradients(g, W, H, { left: t < end('cover') });
  if (LA && t < end('cover')) coverLand(g);
  if (sc.dim) { g.fillStyle = 'rgba(10,6,30,' + (sc.dim === true ? 0.22 : sc.dim) + ')'; g.fillRect(0, 0, W, H); }
  if (sc.flash) { const fl = Array.isArray(sc.flash[0]) ? sc.flash : [sc.flash]; for (const q of fl) if (r > q[0] && r < q[0] + q[1]) { g.fillStyle = (q[2] || 'rgba(255,250,230,') + (0.75 * (1 - (r - q[0]) / q[1])) + ')'; g.fillRect(0, 0, W, H); } }
  for (const b of BUB) bubble(g, b);
  const sh = (dx, dy, f) => { g.save(); if (LA) g.translate(dx, dy); f(); g.restore(); };
  if (t >= at(CHAP[0][1]) && t < at('facts')) sh(L.CX - 540, -70, () => chapter(g, t));
  if (sc.hud) sh(0, 0, () => sc.hud(g, r, t, W, H));
  if (inB(t, 'facts')) { g.save(); if (LA) { g.translate(L.CX - 389, -30); g.scale(0.72, 0.72); } factCard(g, t); g.restore(); }
}
FK.softSfx();
VE.registerSfx('gong', (tt) => { VE.audio.tone(tt, 330, 1.8, { type: 'sine', vol: 0.04, rel: 1.6 }); VE.audio.tone(tt + 0.01, 495, 1.2, { type: 'sine', vol: 0.016, rel: 1.0 }); });
VE.registerSfx('zap', (tt) => { VE.audio.tone(tt, 1300, 0.18, { type: 'sine', vol: 0.03, rel: 0.15 }); VE.audio.tone(tt + 0.05, 900, 0.22, { type: 'sine', vol: 0.025, rel: 0.2 }); });
VE.registerSfx('ching', (tt) => { VE.audio.tone(tt, 1760, 0.4, { type: 'sine', vol: 0.02, rel: 0.35 }); VE.audio.tone(tt + 0.12, 2350, 0.3, { type: 'sine', vol: 0.014, rel: 0.25 }); });
const AUD = [[0.1, 'gong'], [at('facts'), 'gong']];
IRIS.forEach((q) => AUD.push([q.t, 'glide']));
for (const id of ORDER) { const sc = SC[id]; if (sc && sc.sfx) for (const q of sc.sfx) AUD.push([at(id, q[0]), q[1]]); }
AUD.push([at('next', 0.8), 'pop']);
AUD.sort((a, b) => a[0] - b[0]);
caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, capFont: 'Trirong', file: L.LAND ? EP.file + '-youtube' : EP.file, title: EP.title,
  brand: { name: 'RuNgee รู้งี้', series: EP.series || 'ตำนานเล่าใหม่', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); window.__S = S; return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => !!(SC[beatAt(t)] && SC[beatAt(t)].calm) || inB(t, 'facts'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
