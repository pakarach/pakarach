/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = b.big ? 84 : 40; g.font = F(700, px); const w = Math.max(b.big ? 110 : 0, g.measureText(b.txt).width + 48), h = b.big ? 120 : 74;
  let x = U.clamp(b.x - w / 2, 70, 1010 - w), y = Math.max(820, b.y - h - 26);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = '#1a1f3a'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function cowIcon(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#efe6d6'; rr(g, -18, -9, 30, 18, 6); g.fill(); rr(g, 10, -16, 14, 14, 4); g.fill(); g.fillStyle = '#6b4a3a'; g.beginPath(); g.arc(-6, -2, 5, 0, 6.283); g.fill(); g.fillStyle = '#efe6d6'; for (const lx of [-14, -6, 4, 9]) g.fillRect(lx, 8, 4, 9); g.fillStyle = '#f6f0de'; g.fillRect(12, -21, 3, 6); g.fillRect(20, -21, 3, 6); g.restore(); }
function chapter(g, t) {
  const n = CHAP.length, w = 132, gap = 6, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 22); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], px = 32; g.save(); g.font = F(800, px); const w = g.measureText(d[0]).width + 56, h = 56, x = 540 - w / 2, y = 298;
  const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'center'; g.fillText(d[0], 540, y + h / 2 + 2); g.restore();
}
function dots(g, label, n, cur, col) {
  const y = 410, sp = n > 5 ? 74 : 84; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const total = lw + 24 + n * sp; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + 30;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 30 : 24, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += sp; }
  g.restore();
}
/* lifespan gauge: the measure that runs through the clip (full bar = 60,000 years) */
function gauge(g, t) {
  let years = 60000, label = 'อายุขัย ยุคอรกะ', col = P.gold, a = 1;
  if (inB(t, 'ar2')) { years = 60000 * U.easeOut(sm(0.3, 2.2, ph(t, 'ar2'))); a = U.clamp(ph(t, 'ar2') / 0.3); }
  if (inB(t, 'bud1')) { const k = U.easeIO(sm(1.6, 3.6, ph(t, 'bud1'))); years = U.lerp(60000, 100, k); label = k > 0.5 ? 'อายุยืน ยุคพุทธกาล' : label; col = k > 0.5 ? P.teal : P.gold; }
  if (inB(t, 'th1')) { years = 78; label = 'คนไทย เฉลี่ย'; col = P.coral; }
  const x = 120, y = 446, w = 840, h = 34; g.save(); g.globalAlpha = a;
  g.fillStyle = 'rgba(15,22,48,.75)'; rr(g, x - 16, y - 58, w + 32, h + 82, 26); g.fill();
  g.fillStyle = 'rgba(255,255,255,.14)'; rr(g, x, y, w, h, 17); g.fill();
  const fw = Math.max(10, w * years / 60000); g.fillStyle = col; rr(g, x, y, fw, h, 17); g.fill();
  txt(g, label, x, y - 28, 30, '#fff', 600, 'left'); txt(g, Math.round(years).toLocaleString('en-US') + ' ปี', x + w, y - 28, 40, col, 800, 'right');
  if (years < 1000) { g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(x + fw, y + h + 4); g.lineTo(x + fw + 40, y + h + 4); g.stroke(); }
  g.restore();
}
function counter(g, val, unit, col, sub) {
  g.save(); g.fillStyle = 'rgba(15,22,48,.75)'; rr(g, 240, 350, 600, 120, 30); g.fill();
  txt(g, Math.round(val).toLocaleString('en-US'), 500, 410, 76, col, 800, 'right'); txt(g, unit, 524, 414, 44, '#fff', 700, 'left');
  if (sub) { g.globalAlpha = 0.85; txt(g, sub, 540, 494, 26, '#fff', 500); }
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function recapCard(g, t) {
  const r = ph(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((PLAN.recap - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'เราเกิดมาทำไม?', 540, 450, 76, P.gold, 800);
  const rows = ['ชีวิตเหมือนแม่โค ทุกก้าวใกล้ความตาย', '100 ปี = 36,000 ราตรี · 72,000 มื้อ', 'เกิดเพราะเหตุ: ไม่รู้ + อยาก (โดมิโน)', 'ได้เกิดเป็นคน ยากเหมือนเต่าตาบอดกับแอก', 'เกิดเป็นคน เพื่อทำดี + เรียนรู้จนไม่ต้องเกิดอีก', 'ทีละก้าว: ให้ · ไม่เบียดเบียน · ฝึกใจ'];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.6) / 0.3); if (k <= 0) return; const y = 570 + i * 132; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 54, 880, 108, 26); g.fill(); g.fillStyle = i === 5 ? P.gold : P.teal; g.beginPath(); g.arc(166, y, 36, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 166, y + 2); txt(g, s, 224, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก อังคุตตรนิกาย (อรกานุสาสนีสูตร) · วินัยปิฎก มหาวรรค', 540, 1366);
  g.fillText('สังยุตตนิกาย (ฉิคคฬสูตร) · อิติวุตตกะ · สำนักงานสถิติแห่งชาติ 2568 · ภาพจำลอง', 540, 1404);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (id.startsWith('ar')) { g.fillStyle = 'rgba(120,80,30,0.12)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('ar1') && t < at('recap')) { chapter(g, t);
    const k = U.clamp((t - at('ar1')) / (at('recap') - at('ar1'))); cowIcon(g, 540 - 480 + 960 * k, 214, 0.8); }
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (id.startsWith('ar') && id !== 'ar1') gauge(g, t);
  if (inB(t, 'bud1') || inB(t, 'th1')) gauge(g, t);
  const SI = ['s1', 's2', 's3', 's4', 's5', 's6', 's7']; if (SI.includes(id)) dots(g, 'อุปมา', 7, SI.indexOf(id) + 1, id === 's7' ? P.coral : P.gold);
  if (inB(t, 'c3')) counter(g, 72000 * U.easeIO(sm(0.4, 3.6, ph(t, 'c3'))), 'มื้อ', P.gold, '1 จุด = 1 มื้อ');
  if (inB(t, 'th2')) counter(g, 10950 * U.easeIO(sm(0.6, PLAN.th2 - 0.8, ph(t, 'th2'))), 'ก้าว', P.gold, '1 ก้าว = 1 วัน');
  if (inB(t, 't4')) counter(g, Math.min(100, 1 + 99 * sm(0, 1.8, ph(t, 't4'))), 'ปี', P.teal, 'เต่าโผล่ขึ้นมา 1 ครั้ง');
  const GI = { g1: 1, g2: 1, g3: 1, g4: 1, h1: 2, h2: 2, h3: 2, m1: 3, m2: 3, m3: 3 }; if (GI[id]) dots(g, 'ก้าวดี', 3, GI[id], P.gold);
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('cowbell', (tt) => { VE.audio.tone(tt, 880, 0.35, { type: 'triangle', vol: 0.03, rel: 0.3 }); VE.audio.tone(tt + 0.01, 1320, 0.25, { type: 'sine', vol: 0.015, rel: 0.2 }); });
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
const AUD = [[0.1, 'temple']];
for (let x = 0.6; x < at('ar1') - 0.5; x += 1.6) AUD.push([x, 'cowbell']);
for (let x = at('s7') + 0.3; x < end('s7'); x += 1.6) AUD.push([x, 'cowbell']);
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
{ let pl = null; for (const id of ORDER) { if (id === 'end' || !SHOT[id]) continue; const L0 = SHOT[id][0][1].look; if (pl && !CUT.has(id) && Math.hypot(pl[0] - L0[0], pl[1] - L0[1]) > 5) AUD.push([at(id), 'glide', { dur: 1.0 }]); pl = SHOT[id][SHOT[id].length - 1][1].look; } }
for (const id of ['s1', 's2', 's3', 's4', 's5', 's6', 'g1', 'h1', 'm1']) AUD.push([at(id, 0.15), 'bell']);
for (let i = 0; i < 3; i++) AUD.push([at('q5', 1.6 + i * 0.8), 'pop'], [at('g3', 2.6 + i * 0.6), 'soft']);
AUD.push([at('q3', 0.6), 'chime'], [at('q4', 1.6), 'pop'], [at('g1', 3.0), 'soft'], [at('h1', 4.3), 'tok'], [at('m1', 1.3), 'glide', { dur: 0.6 }], [end('g4'), 'shimmer'], [end('h3'), 'shimmer'], [end('m3'), 'shimmer'], [at('pay3', 0.8), 'chime']);
AUD.push([at('s7', 0.15), 'chime'], [at('refr', 0.6), 'temple'], [at('ar4', 0.4), 'bell'], [at('bud1', 0.5), 'temple'], [at('why2', 0.4), 'chime'], [at('why2', 0.6), 'shimmer']);
for (let i = 0; i < 3; i++) AUD.push([at('c1', 0.5 + i * 0.5), 'soft']);
for (let i = 0; i < 6; i++) AUD.push([at('c3', 0.5 + i * 0.5), 'tok'], [at('th2', 0.8 + i * 0.7), 'tok']);
for (let i = 0; i < 5; i++) AUD.push([at('dom1') + (1.2 + i * 0.75) * dur('dom1') / PLAN.dom1, 'tok']);
AUD.push([at('dom2') + 1.4 * dur('dom2') / PLAN.dom2, 'tok'], [at('dom4', 1.6), 'pop'], [at('t3', 0.6), 'glide', { dur: 2.0 }], [at('t4', 2.0), 'soft'], [at('t5', 2.3), 'soft'], [at('t6', 0.5), 'chime'], [at('a6', 0.5), 'temple'], [at('pay2', 0.6), 'chime'], [at('pay2', 0.8), 'shimmer']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'kerd-ma-tham-mai-youtube' : 'kerd-ma-tham-mai', title: 'เราเกิดมาทำไม',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => t < end('hook4') || between(t, 's7', 'ans1') || inB(t, 'th3'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
