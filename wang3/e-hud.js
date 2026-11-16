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
  const n = CHAP.length, w = 88, gap = 5, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 19); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k], big = k === 'atth' || k === 'tika'; const px = big ? 44 : 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
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
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
const PROF = {
  wprof: ['PROFILE #1', 'ปราสาทรมยะ', '#a8c4ff', 'วังฤดูหนาว', [['ยอด', '9 ชั้น'], ['ใช้ช่วง', 'หน้าหนาว ~4 เดือน'], ['จุดเด่น', 'เก็บความอุ่น']]],
  sprof: ['PROFILE #2', 'ปราสาทสุรมยะ', '#ffb36a', 'วังฤดูร้อน', [['ยอด', '5 ชั้น'], ['ใช้ช่วง', 'หน้าร้อน ~4 เดือน'], ['จุดเด่น', 'ฝนเทียม + ฟ้าร้องเทียม']]],
  rprof: ['PROFILE #3', 'ปราสาทสุภะ', P.teal, 'วังฤดูฝน', [['ยอด', '7 ชั้น'], ['ใช้ช่วง', 'หน้าฝน 4 เดือน'], ['จุดเด่น', 'อุ่นก็ได้ เย็นก็ได้']]],
};
function profileCard(g, t, id) {
  const D = PROF[id], r = ph(t, id, 7.4), a = U.clamp(r / 0.3) * U.clamp((7.4 - r) / 0.3), sc = 0.85 + 0.15 * U.easeBack(U.clamp(r / 0.45));
  g.save(); g.globalAlpha = a; g.translate(540, 700); g.scale(sc, sc); g.translate(-540, -640);
  panel(g, 80, 300, 920, 690, 1);
  g.fillStyle = D[2]; rr(g, 120, 330, 240, 50, 25); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(D[0], 240, 357);
  txt(g, D[1], 540, 475, 118, D[2], 800); txt(g, D[3], 540, 585, 48, '#fff', 600);
  D[4].forEach((row, i) => { const k = U.clamp((r - 1.4 - i * 1.5) / 0.35); if (k <= 0) return; g.save(); g.globalAlpha = a * k; const y = 690 + i * 88;
    g.fillStyle = 'rgba(255,255,255,.08)'; rr(g, 120, y - 36, 840, 72, 20); g.fill(); txt(g, row[0], 150, y, 34, P.gold, 700, 'left'); txt(g, row[1], 330, y, 40, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('ที่มา: อรรถกถา–ฎีกา ตามที่เรียบเรียงใน มหาพุทธวงศ์ (มิงกุนสยาดอ)', 540, 958);
  g.restore();
}
/* season ring (seasons beat): India north vs Thailand */
function seasonRing(g, t) {
  const r = ph(t, 'seasons', 6), a = U.clamp(r / 0.3) * U.clamp((6 - r) / 0.3); if (a <= 0) return;
  const cx = 540, cy = 1240, R = 150; g.save(); g.globalAlpha = a;
  const SEG = [['หนาว', '#7fa8ff', -Math.PI / 2, -Math.PI / 2 + 2.09], ['ร้อน', '#ff9a4a', -Math.PI / 2 + 2.09, -Math.PI / 2 + 4.19], ['ฝน', P.teal, -Math.PI / 2 + 4.19, -Math.PI / 2 + 6.283]];
  SEG.forEach((sg, i) => { const k = U.clamp((r - 0.4 - i * 0.5) / 0.4); if (k <= 0) return; g.strokeStyle = sg[1]; g.lineWidth = 64; g.beginPath(); g.arc(cx, cy, R, sg[2] + 0.04, sg[2] + (sg[3] - sg[2]) * k - 0.04); g.stroke();
    const m = (sg[2] + sg[3]) / 2; txt(g, sg[0], cx + Math.cos(m) * (R + 98), cy + Math.sin(m) * (R + 78), 46, '#fff', 800); });
  const hand = -Math.PI / 2 + ((r * 0.9) % 1) * 6.283; g.strokeStyle = '#fff'; g.lineWidth = 8; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(hand) * (R - 50), cy + Math.sin(hand) * (R - 50)); g.stroke();
  txt(g, '1 ปี', cx, cy + 4, 44, P.gold, 800); g.restore();
}
/* day / night chip for window beats */
function dayNight(g, nightK) {
  const x = 540, y = 420; g.save(); g.font = F(700, 38); const lab = nightK > 0.5 ? 'กลางคืน' : 'กลางวัน'; const w = g.measureText(lab).width + 120;
  g.fillStyle = nightK > 0.5 ? 'rgba(20,30,70,.9)' : 'rgba(255,214,110,.95)'; rr(g, x - w / 2, y - 34, w, 68, 34); g.fill();
  if (nightK > 0.5) { g.fillStyle = '#fff6d8'; g.beginPath(); g.arc(x - w / 2 + 44, y, 20, 0, 6.283); g.fill(); g.fillStyle = 'rgba(20,30,70,1)'; g.beginPath(); g.arc(x - w / 2 + 54, y - 6, 17, 0, 6.283); g.fill(); }
  else { g.fillStyle = '#ff9a2a'; g.beginPath(); g.arc(x - w / 2 + 44, y, 18, 0, 6.283); g.fill(); g.strokeStyle = '#ff9a2a'; g.lineWidth = 4; for (let i = 0; i < 8; i++) { const a = i * 0.785; g.beginPath(); g.moveTo(x - w / 2 + 44 + Math.cos(a) * 24, y + Math.sin(a) * 24); g.lineTo(x - w / 2 + 44 + Math.cos(a) * 32, y + Math.sin(a) * 32); g.stroke(); } }
  g.fillStyle = nightK > 0.5 ? '#fff' : '#3a2410'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lab, x + 30, y + 2); g.restore();
}
/* 4-month counter (r3) */
function months(g, t) { const r = ph(t, 'r3', 6), cur = Math.min(4, 1 + Math.floor(sm(0.8, 4.8, r) * 4 * 0.999)); dots(g, t, 'เดือนที่', 4, cur, P.teal); }
/* season cards (n2) */
function recapCard(g, t) {
  const r = ph(t, 'recap', 9.6), a = U.clamp(r / 0.3) * U.clamp((9.6 - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'วัง 3 ฤดู', 540, 450, 80, P.gold, 800);
  const rows = [['ศากยะ: รัฐเล็ก ปกครองด้วยสภา', 'เป็นเมืองขึ้นของโกศล', '#ff9a6a'], ['วังหนาว 9 · ร้อน 5 · ฝน 7 ชั้น', 'ผนังวาดไฟ · ฝนเทียม · ฟ้าร้องเทียม', '#a8c4ff'], ['กามคุณ 5 ครบชุด', 'นางรำ 4 หมื่น (อรรถกถา)', '#ff8fb0'], ['สุขครบ…แต่หนีแก่ เจ็บ ตายไม่พ้น', 'อายุ 29 จึงออกบวช', P.coral], ['ถูกขัง? ไม่ใช่คุก', 'กรงทองที่เลือกเดินออกมาเอง', P.teal], ['วังพัง รัฐหาย เหลือฐานอิฐ', 'แต่วิธีประชุมสงฆ์ ยังใช้ถึงวันนี้', P.gold]];
  rows.forEach((s, i) => { const k = U.clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 570 + i * 128; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 56, 880, 112, 26); g.fill(); g.fillStyle = s[2]; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s[0], 232, y - 22, 38, '#fff', 700, 'left'); txt(g, s[1], 232, y + 26, 32, '#d8e0ff', 500, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (สุขุมาลสูตร · มาคัณฑิยสูตร · อริยปริเยสนสูตร · มหาปทานสูตร ฯลฯ)', 540, 1355);
  g.fillText('อรรถกถาธรรมบท · ฎีกา (มหาพุทธวงศ์ มิงกุนสยาดอ) · งานวิชาการเรื่องคณสังฆะ/กบิลพัสดุ์', 540, 1390);
  g.fillText('ภาพจำลองตามคติความเชื่อ', 540, 1425);
  g.restore();
}
function tally(g, t) { const r = ph(t, 'l4', 6); let a = 0, b = 0; for (let i = 0; i < 10; i++) if (r > 1.5 + i * 0.32) { if (i < 7) a++; else b++; }
  const y = 1560, al = U.clamp((r - 0.6) / 0.3); g.save(); g.globalAlpha = al; panel(g, 240, y - 70, 600, 140, al);
  txt(g, 'เห็นด้วย', 380, y - 30, 34, P.teal, 700); txt(g, String(a), 380, y + 28, 64, P.teal, 800); txt(g, 'ค้าน', 700, y - 30, 34, P.coral, 700); txt(g, String(b), 700, y + 28, 64, P.coral, 800); txt(g, ':', 540, y + 20, 60, '#fff', 800);
  if (r > 5.0) txt(g, 'ผ่าน ✓', 540, y - 100, 44, P.gold, 800); g.restore(); }
function senses(g, t) { const r = ph(t, 'p1', 6.4); const L = ['รูป', 'เสียง', 'กลิ่น', 'รส', 'สัมผัส'], C = ['#ff8fb0', '#ffd56a', '#8fd8c0', '#ff9a6a', '#9fc0ff'];
  const w = 150, gap = 14, x0 = 540 - (5 * w + 4 * gap) / 2, y = 1540; g.save();
  L.forEach((l, i) => { const k = U.easeBack(U.clamp((r - 1.0 - i * 0.6) / 0.35)); if (k <= 0) return; const cx = x0 + i * (w + gap) + w / 2; g.save(); g.translate(cx, y); g.scale(k, k);
    g.fillStyle = 'rgba(15,22,48,.92)'; rr(g, -w / 2, -70, w, 140, 30); g.fill(); g.strokeStyle = C[i]; g.lineWidth = 5; g.stroke(); txt(g, String(i + 1), 0, -24, 46, C[i], 800); txt(g, l, 0, 34, 38, '#fff', 700); g.restore(); });
  g.restore(); }
function legendVs(g, t) { const id = inB(t, 'q2') ? 'q2' : 'q3', r = ph(t, id, 6.6), a = U.clamp((r - 0.5) / 0.3); const y = 1560; g.save(); g.globalAlpha = a;
  const L = id === 'q2' ? ['ตำนาน', 'พ่อกักไว้ · เทวทูต 4', P.violet] : ['ตำนาน', 'แอบหนีกลางดึก', P.violet], R = id === 'q2' ? ['พระไตรปิฎก', 'เป็นเรื่องพระวิปัสสี', P.teal] : ['พระสูตรเก่าสุด', 'พ่อแม่ร้องไห้ต่อหน้า', P.teal];
  [[L, 290], [R, 790]].forEach(([d, cx]) => { g.fillStyle = 'rgba(15,22,48,.92)'; rr(g, cx - 230, y - 80, 460, 160, 28); g.fill(); g.strokeStyle = d[2]; g.lineWidth = 5; g.stroke(); txt(g, d[0], cx, y - 32, 40, d[2], 800); txt(g, d[1], cx, y + 30, 32, '#fff', 600); });
  txt(g, 'vs', 540, y, 44, P.gold, 800); g.restore(); }
const PROFS = ['wprof', 'sprof', 'rprof'];
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  for (const b of BUB) bubble(g, b);
  if (t >= at('map1') && t < at('moral')) chapter(g, t);
  if (TAG[id] && !PROFS.includes(id)) tagPill(g, TAG[id], t, id);
  if (PROFS.includes(id)) profileCard(g, t, id);
  if (inB(t, 'seasons')) seasonRing(g, t);
  if (inB(t, 'w4')) dayNight(g, dn(t, 'w4', 2.4, 3.2));
  if (inB(t, 's7')) dayNight(g, dn(t, 's7', 2.4, 3.0));
  if (inB(t, 'm1')) dayNight(g, 0); if (inB(t, 'm2')) dayNight(g, 1);
  if (inB(t, 'r3')) months(g, t);
  if (inB(t, 't5')) { const r = ph(t, 't5', 6), cx = U.lerp(-11, 13, U.easeIO(sm(0.2, 5.8, r))); let n = 0; for (let i = 0; i < 4; i++) if (cx > -6 + i * 5 - 0.5) n = i + 1; dots(g, t, 'เห็น', 4, Math.max(1, n), P.gold); }
  if (inB(t, 'p1')) senses(g, t);
  if (inB(t, 'q2') || inB(t, 'q3')) legendVs(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('rumble', (tt) => VE.audio.noise(tt, 1.4, { type: 'bandpass', f: 260, f2: 170, q: 0.7, vol: 0.035, att: 0.15 }));
VE.registerSfx('clop', (tt) => { for (let i = 0; i < 6; i++) VE.audio.tone(tt + i * 0.21, i % 2 ? 640 : 560, 0.04, { type: 'triangle', vol: 0.03, rel: 0.04 }); });
VE.registerSfx('harp', (tt) => { [67, 71, 74, 79].forEach((n, i) => VE.audio.tone(tt + i * 0.12, VE.midiHz(n), 0.6, { type: 'triangle', vol: 0.025, rel: 0.5 })); });
const AUD = [];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
for (const id of PROFS) [1.4, 2.9, 4.4].forEach((d) => AUD.push([at(id) + d * dur(id) / 7.4, 'bell']));
AUD.push([at('hook1', 0.2), 'chime'], [at('map1', 2.3), 'pop'], [at('birth', 1.7), 'chime'], [at('build', 0.7), 'soft'], [at('build', 2.0), 'soft'], [at('build', 3.3), 'soft']);
for (let i = 0; i < 3; i++) AUD.push([at('tiers', 0.7 + i * 0.6), 'pop']);
AUD.push([at('w2', 0.5), 'soft'], [at('w4', 2.5), 'tok'], [at('s2', 0.3), 'water', { dur: 2 }], [at('s3', 0.4), 'water', { dur: 3 }], [at('s4', 0.2), 'rain', { dur: 4.5 }]);
for (let i = 0; i < 6; i++) { const t0 = 1.0 + i * 0.75 + 0.55; AUD.push([at('s5') + t0 * dur('s5') / 6, 'rumble']); }
AUD.push([at('s5', 3.5), 'rain', { dur: 2.4 }]);
AUD.push([at('s7', 2.6), 'tok'], [at('m1', 1.8), 'tok'], [at('m2', 0.8), 'tok'], [at('r1', 0.2), 'rain', { dur: 4 }], [at('r4', 0.4), 'harp'], [at('r4', 2.6), 'harp']);
for (let i = 0; i < 4; i++) AUD.push([at('r3') + (0.8 + i) * dur('r3') / 6, 'tok']);
AUD.push([at('p1', 0.4), 'harp'], [at('p2', 0.5), 'harp'], [at('p3', 1.3), 'pop'], [at('p3', 1.6), 'pop'], [at('p3', 1.9), 'pop'], [at('p3', 2.2), 'pop'], [at('p4', 0.8), 'soft'], [at('t5b', 0.6), 'soft'], [at('q1', 0.5), 'tok'], [at('q1', 0.9), 'chime'], [at('q2', 0.4), 'soft'], [at('q3', 0.6), 'bell'], [at('q4', 0.8), 'shimmer'], [at('t2', 0.7), 'soft'], [at('t3', 0.7), 'soft'], [at('t3', 1.9), 'soft']);
for (let i = 0; i < 3; i++) AUD.push([at('t4') + (0.45 + i * 0.4) * dur('t4') / 6.4, 'pop'], [at('t4') + (3.45 + i * 0.35) * dur('t4') / 6.4, 'shimmer']);
for (let i = 0; i < 4; i++) AUD.push([at('t5') + (1.4 + i * 1.2) * dur('t5') / 6, 'bell']);
AUD.push([at('hook2', 0.4), 'clop'], [at('hook2', 1.7), 'clop'], [at('t6', 0.4), 'clop'], [at('t6', 1.7), 'clop'], [at('t6', 3.0), 'clop']);
AUD.push([at('t7', 0.8), 'soft'], [at('g1', 0.7), 'pop'], [at('g1', 1.3), 'pop'], [at('g1', 2.5), 'bell'], [at('g2', 0.3), 'soft'], [at('g4', 1.7), 'tok'], [at('g4', 1.9), 'tok'], [at('g4', 2.1), 'tok'], [at('g5', 1.0), 'soft', {}], [at('f1', 0.4), 'clop'], [at('f1', 2.2), 'clop'], [at('f2', 4.0), 'soft'], [at('f3', 0.4), 'clop'], [at('f3', 2.4), 'roar', { dur: 1.6 }], [at('f5', 0.5), 'soft'], [at('l1', 1.4), 'shimmer'], [at('l2', 1.3), 'bell'], [at('l2', 2.6), 'bell'], [at('l2', 3.9), 'bell'], [at('moral2', 0.4), 'shimmer'], [at('moral2', 1.7), 'pop'], [at('moral2', 2.1), 'pop'], [at('moral2', 2.5), 'pop'], [at('ask', 0.6), 'bell']);
for (let i = 0; i < 5; i++) AUD.push([at('p1') + (1.0 + i * 0.6) * dur('p1') / 6.4, 'pop']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'wang-3-ruedu-youtube' : 'wang-3-ruedu', title: 'วัง 3 ฤดู ของเจ้าชายสิทธัตถะ',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธโปรไฟล์', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 't1', 't7'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
