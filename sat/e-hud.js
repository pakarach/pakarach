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
  const n = CHAP.length, w = 120, gap = 8, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 22); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = big ? 74 : 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function dots(g, t, label, n, cur, col) {
  const y = 420; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * 70; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += 70; }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function gauge(g, t, id) {
  const G = GZ[id]; if (!G) return;
  const six = !!G.six, n = six ? 6 : 5, w = six ? 112 : 124, gap = 10, who = G.who || '5 ทางไป';
  g.save(); g.font = F(700, 30); const lw = g.measureText(who).width + 34;
  const total = lw + 14 + n * w + (n - 1) * gap; let x0 = 540 - total / 2; const y = 422, h = 48;
  g.fillStyle = G.who ? P.gold : 'rgba(255,255,255,.18)'; rr(g, x0, y, lw, h, 24); g.fill(); g.fillStyle = G.who ? '#0f1630' : '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(who, x0 + lw / 2, y + h / 2 + 2);
  const cx0 = x0 + lw + 14, cx = (k) => cx0 + k * (w + gap) + w / 2;
  const hiK = id === 'l4' ? (rel(t, 'l4') < 2.4 ? 3 : 4) : G.hi;
  for (let k = 0; k < n; k++) {
    const on = k === hiK || k === G.at || (G.cmp === k), x = cx0 + k * (w + gap);
    g.globalAlpha = 0.95; g.fillStyle = on ? LV[k][1] : 'rgba(15,22,48,.72)'; rr(g, x, y, w, h, 16); g.fill(); g.strokeStyle = LV[k][1]; g.lineWidth = 3; g.stroke();
    g.fillStyle = on ? '#0f1630' : '#fff'; g.font = F(on ? 800 : 600, 28); g.fillText(LV[k][0], x + w / 2, y + h / 2 + 2);
  }
  if (G.cmp != null) { g.fillStyle = P.coral; g.font = F(800, 34); g.fillText('<', (cx(1) + cx(2)) / 2 + 0, y - 18); }
  if (G.at != null) { g.fillStyle = P.gold; g.beginPath(); g.moveTo(cx(G.at) - 12, y - 16); g.lineTo(cx(G.at) + 12, y - 16); g.lineTo(cx(G.at), y - 2); g.fill(); }
  if (G.from != null) {
    const k = U.clamp((rel(t, id) - G.t0) / 1.3), tos = Array.isArray(G.to) ? G.to : [G.to];
    tos.forEach((to, j) => {
      const kk = U.clamp(k * 1.25 - j * 0.25), a = cx(G.from), b = cx(to), up = to > G.from, peak = y - 30 - Math.abs(to - G.from) * 6;
      const lim = G.x ? 0.62 : 1, kd = Math.min(kk, lim); if (kd <= 0) return;
      g.strokeStyle = up ? P.teal : P.coral; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
      for (let i = 0; i <= 30; i++) { const u = i / 30 * kd, px = U.lerp(a, b, u), py = y - 4 - Math.sin(u * Math.PI) * (y - 4 - peak); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
      const u = kd, px = U.lerp(a, b, u), py = y - 4 - Math.sin(u * Math.PI) * (y - 4 - peak);
      if (G.x && kk >= lim) { g.strokeStyle = P.coral; g.lineWidth = 7; g.beginPath(); g.moveTo(px - 14, py - 14); g.lineTo(px + 14, py + 14); g.moveTo(px + 14, py - 14); g.lineTo(px - 14, py + 14); g.stroke(); }
      else { g.fillStyle = up ? P.teal : P.coral; g.beginPath(); g.arc(px, py, 9, 0, 6.283); g.fill(); }
    });
  }
  g.restore();
}
function births(g, t, id) {
  const lab = ['ไข่', 'ครรภ์', 'เหงื่อไคล', 'ผุดเกิด'], w = 170, gap = 14, x0 = 540 - (4 * w + 3 * gap) / 2, y = 392, h = 100;
  for (let i = 0; i < 4; i++) {
    const k = id === 'n2' ? U.clamp((rel(t, 'n2') - 0.9 - i * 0.7) / 0.3) : 1; if (k <= 0) continue;
    const x = x0 + i * (w + gap), hl = id === 'n6' ? (i === 0 ? P.teal : i === 3 ? P.gold : null) : null;
    g.save(); g.globalAlpha = k; g.fillStyle = hl || 'rgba(15,22,48,.8)'; rr(g, x, y, w, h, 22); g.fill(); g.strokeStyle = hl || 'rgba(255,255,255,.3)'; g.lineWidth = 3; g.stroke();
    const ix = x + 44, iy = y + h / 2, ic = hl ? '#0f1630' : '#bfe8ff'; g.fillStyle = ic; g.strokeStyle = ic; g.lineWidth = 4;
    if (i === 0) { g.beginPath(); g.ellipse(ix, iy, 17, 22, 0, 0, 6.283); g.fill(); }
    if (i === 1) { g.beginPath(); g.arc(ix, iy, 21, 0, 6.283); g.stroke(); g.beginPath(); g.arc(ix + 3, iy + 2, 8, 0, 6.283); g.fill(); }
    if (i === 2) { g.beginPath(); g.moveTo(ix, iy - 24); g.quadraticCurveTo(ix + 20, iy + 2, ix, iy + 18); g.quadraticCurveTo(ix - 20, iy + 2, ix, iy - 24); g.fill(); }
    if (i === 3) { g.beginPath(); for (let j = 0; j < 10; j++) { const a = j * Math.PI / 5 - Math.PI / 2, r = j % 2 ? 9 : 23; g.lineTo(ix + Math.cos(a) * r, iy + Math.sin(a) * r); } g.closePath(); g.fill(); }
    g.font = F(700, lab[i].length > 5 ? 28 : 34); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = hl ? '#0f1630' : '#fff'; g.fillText(lab[i], x + 76, iy + 2);
    g.restore();
  }
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 290, 960, 1170, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'ภพภูมิสัตว์', 540, 448, 80, P.gold, 800);
  const rows = ['5 ทางไป: สัตว์ = หลุมคูถ แย่กว่าเปรต', 'สัตว์ 5 กลุ่ม + นาค ครุฑ ก็อยู่ภพนี้', 'ตายจากคนแล้วกลับมาเป็นคน = ฝุ่นปลายเล็บ', 'เต่าตาบอด 100 ปี ยังง่ายกว่า', 'กบเป็นเทพ เสนิยะเป็นอรหันต์: เพราะใจ'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.8) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 4 ? P.gold : P.teal; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 23); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (มัชฌิมนิกาย 12, 57, 129 · สังยุตตนิกาย 29, 30, 56 · อังคุตตรนิกาย 8.40 · อุทาน 4.5 · วิมานวัตถุ 5.1 · วินัย มหาวรรค)', 540, 1352);
  g.fillText('อรรถกถาธรรมบท/วิมานวัตถุ · Mora et al. 2011 · Smithsonian · ภาพจำลองตามคติความเชื่อ', 540, 1390);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (id === 'm2' || id === 'm4') { g.fillStyle = 'rgba(120,80,30,0.14)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('l0') && t < at('recap')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (inB(t, 'd6')) dots(g, t, 'ถามครั้งที่', 3, 1 + Math.min(2, Math.floor(rel(t, 'd6') / 1.5)), P.gold);
  else if (inB(t, 'n2') || inB(t, 'n6')) births(g, t, id);
  else gauge(g, t, id);
  if (id === 'm2' || id === 'm3' || id === 'm4') { g.save(); g.font = F(700, 34); const w = g.measureText('ย้อนไปสมัยพุทธกาล').width + 50; g.fillStyle = 'rgba(255,220,170,.92)'; rr(g, 540 - w / 2, 410, w, 56, 28); g.fill(); g.fillStyle = '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ย้อนไปสมัยพุทธกาล', 540, 439); g.restore(); }
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
VE.registerSfx('croak', (tt) => { VE.audio.tone(tt, 260, 0.09, { type: 'triangle', f2: 190, vol: 0.04, rel: 0.06 }); VE.audio.tone(tt + 0.16, 250, 0.09, { type: 'triangle', f2: 180, vol: 0.035, rel: 0.06 }); });
VE.registerSfx('trumpet', (tt) => { VE.audio.tone(tt, 520, 0.7, { type: 'triangle', f2: 820, vol: 0.03, att: 0.08, rel: 0.3 }); VE.audio.noise(tt, 0.6, { type: 'bandpass', f: 900, q: 1.2, vol: 0.02 }); });
VE.registerSfx('flap', (tt) => { for (let i = 0; i < 3; i++) VE.audio.noise(tt + i * 0.22, 0.14, { type: 'bandpass', f: 600, f2: 900, q: 0.8, vol: 0.04 }); });
const AUD = [[0.1, 'croak']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 12) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
['l1', 'l3', 'l4'].forEach((id) => AUD.push([at(id, 0.3), 'soft'])); AUD.push([at('l2', 0.3), 'bell'], [at('l5', 0.6), 'bell'], [at('l6', 1.6), 'pop'], [at('l6', 2.4), 'pop']);
['p1', 'p2', 'p3', 'p4', 'p5'].forEach((id) => AUD.push([at(id, 0.2), 'pop'])); AUD.push([at('p4', 0.6), 'water', { dur: 2 }]);
for (let i = 0; i < 8; i++) AUD.push([at('p7', 0.4 + i * 0.45), 'tok']);
AUD.push([at('p8', 1.2), 'bell'], [at('p9', 0.5), 'chime'], [at('p9', 0.7), 'shimmer']);
AUD.push([at('n1', 2.4), 'shimmer'], [at('n4', 1.2), 'soft'], [at('n5', 0.6), 'flap'], [at('n5', 2.0), 'flap'], [at('n6', 1.0), 'flap'], [at('n6', 3.0), 'flap']);
for (let i = 0; i < 4; i++) AUD.push([at('n2', 0.9 + i * 0.7), 'tok']);
for (let i = 0; i < 3; i++) AUD.push([at('d6', i * 1.5 + 0.1), 'bell']);
AUD.push([at('d4', 1.6), 'tok'], [at('d7', 0.8), 'soft'], [at('d7', 3.0), 'soft']);
AUD.push([at('u2', 2.2), 'splash'], [at('u3', 2.6), 'splash'], [at('u4', 2.4), 'pop']);
AUD.push([at('g2', 0.4), 'trumpet'], [at('g2', 3.4), 'water', { dur: 1.6 }], [at('g3', 2.2), 'trumpet'], [at('g3', 3.8), 'chime']);
AUD.push([at('g4', 0.6), 'croak'], [at('g5', 2.4), 'croak'], [at('g6', 2.7), 'soft'], [at('g7', 0.4), 'shimmer'], [at('g7', 2.8), 'chime'], [at('r1', 0.4), 'bell']);
AUD.push([at('r3', 1.0), 'chime'], [at('r3', 1.2), 'shimmer'], [at('m1', 0.2), 'temple'], [at('m3', 2.2), 'pop'], [at('m5', 0.2), 'temple']);
for (let i = 0; i < 5; i++) AUD.push([at('recap', 0.5 + i * 0.8), 'tok']);
AUD.push([at('ask', 0.3), 'croak']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'phop-phum-sat-youtube' : 'phop-phum-sat', title: 'ภพภูมิสัตว์',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'd7', 'u5') || between(t, 'm3', 'm4'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
