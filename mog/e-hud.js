/* Part E: HUD + run */
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
  const n = CHAP.length, w = 142, gap = 10, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
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
function steps(g, t) {
  let act = 0; if (inB(t, 'trA')) act = 1 + Math.min(2, Math.floor(rel(t, 'trA') / 2.2)); if (inB(t, 'trB')) act = 4 + Math.min(1, Math.floor(rel(t, 'trB') / 3.3)); if (inB(t, 'trC')) act = 6 + Math.min(2, Math.floor(rel(t, 'trC') / 2.4));
  const y = 420, x0 = 540 - 3.5 * 92; g.save();
  for (let i = 1; i <= 8; i++) { const x = x0 + (i - 1) * 92, on = i === act, done = i < act; g.fillStyle = on ? P.gold : done ? P.teal : 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(x, y, on ? 36 : 30, 0, 6.283); g.fill(); g.fillStyle = on || done ? '#0f1630' : '#fff'; g.font = F(800, on ? 40 : 32); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); }
  g.restore();
}
function dots(g, t, label, n, cur, col) {
  const y = 420; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * 70; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += 70; }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function profileCard(g, t) {
  const r = rel(t, 'profile'), a = U.clamp(r / 0.3) * U.clamp((dur('profile') - r) / 0.3), sc = 0.85 + 0.15 * U.easeBack(U.clamp(r / 0.45));
  g.save(); g.globalAlpha = a; g.translate(540, 700); g.scale(sc, sc); g.translate(-540, -640);
  panel(g, 80, 300, 920, 690, 1);
  g.fillStyle = P.teal; rr(g, 120, 330, 230, 50, 25); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('PROFILE #1', 235, 357);
  txt(g, 'โกลิตะ', 540, 470, 132, MOG, 800); txt(g, 'ต่อมาคือ พระมหาโมคคัลลานะ', 540, 580, 44, '#fff', 600);
  const rows = [['บ้านเกิด', 'หมู่บ้านโกลิตคาม ใกล้ราชคฤห์'], ['ชื่อแม่', 'นางโมคคัลลี → ที่มาของชื่อ'], ['เพื่อนรัก', 'อุปติสสะ = พระสารีบุตร']];
  rows.forEach((row, i) => { const k = U.clamp((r - 1.4 - i * 1.5) / 0.35); if (k <= 0) return; g.save(); g.globalAlpha = a * k; const y = 680 + i * 88;
    g.fillStyle = 'rgba(255,255,255,.08)'; rr(g, 120, y - 36, 840, 72, 20); g.fill(); txt(g, row[0], 150, y, 34, P.gold, 700, 'left'); txt(g, row[1], 330, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 26); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ที่มา: อรรถกถา (ประวัติพระมหาโมคคัลลานเถระ)', 540, 958);
  g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'พระโมคคัลลานะ', 540, 450, 76, P.gold, 800);
  const rows = ['โกลิตะ + อุปติสสะ ออกตามหาทางพ้นตาย', 'บวช 7 วัน ใช้วิธีแก้ง่วง → อรหันต์', 'เลิศด้านฤทธิ์: เขย่าปราสาท ถามเทวดา–เปรต', 'หนีโจรได้ 2 ครั้ง ครั้งที่ 3 ยอมรับกรรม', 'พ.ศ. 2567 พระธาตุมาไทย คนไหว้กว่า 9 แสน'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = i === 3 ? P.violet : P.teal; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s, 232, y, 40, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (วินัย มหาวรรค · อังคุตตรนิกาย · มัชฌิมนิกาย · สังยุตตนิกาย · วิมานวัตถุ/เปตวัตถุ)', 540, 1360);
  g.fillText('อรรถกถาธรรมบท · ฐานเศรษฐกิจ/ไทยพีบีเอส 2567 · ภาพจำลองตามคติความเชื่อ', 540, 1398);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (id.startsWith('past')) { g.fillStyle = 'rgba(120,80,30,0.14)'; g.fillRect(0, 0, W, H); }
  if (inB(t, 'past4') || inB(t, 'past5')) { const a = inB(t, 'past4') ? 0.5 * sm(3.2, 4.3, rel(t, 'past4')) : 0.5; g.fillStyle = 'rgba(12,6,0,' + a + ')'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('map1') && t < at('moral')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (between(t, 'budapp', 'trC')) steps(g, t);
  if (between(t, 'f1a', 'f3')) dots(g, t, 'ฤทธิ์', 3, inB(t, 'f3') ? 3 : inB(t, 'f2') ? 2 : 1, P.gold);
  if (between(t, 'esc1', 'esc3')) dots(g, t, 'ครั้งที่', 3, inB(t, 'esc3') ? 3 : inB(t, 'esc2') ? 2 : 1, P.coral);
  if (id.startsWith('past')) { g.save(); g.font = F(700, 34); const w = g.measureText('ย้อนอดีตชาติ').width + 50; g.fillStyle = 'rgba(255,220,170,.92)'; rr(g, 540 - w / 2, 392, w, 56, 28); g.fill(); g.fillStyle = '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ย้อนอดีตชาติ', 540, 421); g.restore(); }
  if (inB(t, 'profile')) profileCard(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
const AUD = [[0.1, 'temple'], [at('moral'), 'temple'], [at('back'), 'bell']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 12) AUD.push([at(id), 'glide', { dur: 1.2 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
[1.4, 2.9, 4.4].forEach((d) => AUD.push([at('profile', d), 'bell']));
for (const [id, n, step] of [['trA', 3, 2.2], ['trB', 2, 3.3], ['trC', 3, 2.4]]) for (let i = 0; i < n; i++) AUD.push([at(id, i * step + 0.1), 'tok']);
for (const id of ['f1a', 'f2', 'f3', 'esc1', 'esc2', 'esc3']) AUD.push([at(id, 0.1), 'bell']);
for (const id of ['verse', 'arahant', 'etad', 'r4']) AUD.push([at(id, 0.6), 'chime'], [at(id, 0.8), 'shimmer']);
AUD.push([at('f1b', 1.0), 'soft'], [at('f2', 2.5), 'soft'], [at('run', 2.9), 'chime'], [at('ordain', 3.0), 'shimmer'], [at('nibb', 3.4), 'chime'], [at('r2', 1.0), 'pop'], [at('r2', 2.0), 'bell'], [at('ea', 0.4), 'soft']);
for (let i = 0; i < 8; i++) AUD.push([at('r5', 0.6 + i * 0.42), 'tok']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'phra-moggallana-youtube' : 'phra-moggallana', title: 'พระโมคคัลลานะ',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'turn', 'rise'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
