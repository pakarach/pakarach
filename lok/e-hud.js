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
  const n = CHAP.length, w = 176, gap = 10, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 24); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k]; const px = 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width;
  const w = w1 + 56, h = 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2); g.restore();
}
function dots(g, label, n, cur, col, cx) {
  const y = 470; g.save(); g.font = F(700, 32); const lw = g.measureText(label).width; const step = n > 5 ? 62 : 70; const total = lw + 24 + n * step; let x = (cx || 540) - total / 2;
  txt(g, label, x + lw / 2, y, 32, '#fff', 700); x += lw + 24 + 28;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.5)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 28 : 22, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 28); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); x += step; }
  g.restore();
}
/* mini ferris-wheel gauge: where the current person sits (top = ขาขึ้น, bottom = ขาลง) */
const moodAt = (t) => { const id = beatAt(t); const m = MOOD[id]; if (!m) return null; const i = ORDER.indexOf(id), pm = MOOD[ORDER[i - 1]]; let v = m[1]; if (pm && pm[0] === m[0]) v = U.lerp(pm[1], m[1], eio(U.clamp(rel(t, id) / 0.9))); return [m[0], v]; };
function gauge(g, t) {
  const m = moodAt(t); if (!m) return; const who = WHO[m[0]], v = m[1], cx = 128, cy = 410, R = 58; const a0 = U.clamp((t - at(beatAt(t))) / 0.3 + (MOOD[ORDER[ORDER.indexOf(beatAt(t)) - 1]] ? 1 : 0));
  g.save(); g.globalAlpha = a0; g.fillStyle = 'rgba(15,22,48,.78)'; rr(g, cx - 92, cy - 92, 360, 184, 40); g.fill();
  g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, R, 0, 6.283); g.stroke();
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 - t * 0.13; g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 7, 0, 6.283); g.fill(); }
  const th = v * Math.PI / 2, px = cx + Math.cos(th) * R, py = cy - Math.sin(th) * R;
  g.fillStyle = who[1]; g.beginPath(); g.arc(px, py, 19, 0, 6.283); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 4; g.stroke();
  txt(g, '↑', cx, cy - R - 2, 26, P.gold, 800); txt(g, '↓', cx, cy + R + 2, 26, '#c9b8ff', 800);
  txt(g, who[0], cx + 92, cy - 30, 34, who[1], 800, 'left');
  const st = v > 0.3 ? ['ขาขึ้น', P.gold] : v < -0.3 ? ['ขาลง', '#c9b8ff'] : ['กลางๆ', '#fff']; txt(g, st[0], cx + 92, cy + 26, 40, st[1], 800, 'left');
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function scoreCard(g, t) {
  const inm1 = inB(t, 'm1'), r = inm1 ? rel(t, 'm1') : dur('m1') + rel(t, 'm2'), a = U.clamp(r / 0.3) * (inB(t, 'm2') ? U.clamp((dur('m2') - rel(t, 'm2')) / 0.3) : 1);
  g.save(); g.globalAlpha = a; panel(g, 90, 840, 900, 400, 1);
  const x0 = 150, x1 = 930, y = 1040, sc = (v) => x0 + (x1 - x0) * v / 10;
  g.fillStyle = 'rgba(255,255,255,.14)'; rr(g, x0, y - 26, x1 - x0, 52, 26); g.fill();
  const fv = 7.76 * U.easeOut(U.clamp((r - 0.6) / 1.8)); g.fillStyle = P.teal; rr(g, x0, y - 26, sc(fv) - x0, 52, 26); g.fill();
  for (let i = 0; i <= 10; i += 2) txt(g, String(i), sc(i), y + 70, 30, 'rgba(255,255,255,.8)', 600);
  txt(g, 'ฟินแลนด์ ' + fv.toFixed(2), Math.min(sc(fv), 720), y - 80, 52, P.teal, 800);
  if (r > 2.6) { g.globalAlpha = a * U.clamp((r - 2.6) / 0.4); g.setLineDash([12, 10]); g.strokeStyle = P.gold; g.lineWidth = 5; rr(g, sc(7.76), y - 30, sc(10) - sc(7.76), 60, 26); g.stroke(); g.setLineDash([]); txt(g, 'ยังขาด 2.24', (sc(7.76) + sc(10)) / 2, y + 140, 40, P.gold, 800); }
  g.globalAlpha = a; txt(g, 'คะแนนความสุข (เต็ม 10)', 540, 890, 34, '#fff', 600);
  g.restore();
}
function recapCard(g, t) {
  const r = rel(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((dur('recap') - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 50, 270, 980, 1210, 1);
  txt(g, 'สรุป: ชิงช้าโลกธรรม', 540, 360, 58, P.gold, 800);
  const rows = [['วิสาขา', 'รวยแค่ไหน ก็ต้องเสียคนที่รัก', P.coral], ['มหาสุทัสสนะ', '84,000 เมือง เหลือป่ากุสินารา', P.gold], ['ท้าวสักกะ', 'แพ้แล้วชนะ แต่สุขทิพย์ก็มีวันหมด', P.teal], ['สุปปพุทธะ', 'จนที่สุด แต่มีวันที่สุขที่สุด', '#e0c79a'], ['พระพุทธเจ้า', 'เจอโลกธรรม แต่ใจไม่หวั่นไหว', '#ffe08a']];
  rows.forEach((row, i) => { const k = U.clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 500 + i * 160; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 90, y - 66, 900, 132, 26); g.fill(); g.fillStyle = row[2]; g.beginPath(); g.arc(160, y, 36, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 38); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 160, y + 2);
    txt(g, row[0], 222, y - 28, 38, row[2], 800, 'left'); txt(g, row[1], 222, y + 26, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.88; g.font = F(400, 23); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก — อังคุตตรนิกาย โลกวิปัตติสูตร · อุทาน 8.8, 5.3, 4.8 · ทีฆนิกาย มหาสุทัสสนสูตร', 540, 1346);
  g.fillText('สังยุตตนิกาย กุลาวกสูตร, มหาลิสูตร, สกลิกสูตร · อิติวุตตกะ 83 · วินัยปิฎก จุลวรรค', 540, 1380);
  g.fillText('World Happiness Report 2026 · ภาพจำลองตามคติความเชื่อ', 540, 1414);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t);
  if (bgKey(t) === 'grey') { g.fillStyle = 'rgba(20,24,44,0.12)'; g.fillRect(0, 0, W, H); }
  for (const b of BUB) bubble(g, b);
  if (t >= at('v1') && t < end('b8')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  gauge(g, t);
  if (inB(t, 's10a') || inB(t, 's10b')) { const r = rel(t, id) / dur(id); const cur = inB(t, 's10a') ? (r < 0.3 ? 1 : r < 0.62 ? 2 : 3) : (r < 0.45 ? 4 : 5); dots(g, 'ลาง', 5, cur, P.coral, 660); }
  if (inB(t, 'b4') || inB(t, 'b5')) { const cur = inB(t, 'b4') ? 1 : 1 + Math.min(6, Math.floor(rel(t, 'b5') / (dur('b5') * 0.8) * 7)); dots(g, 'วันที่', 7, cur, P.gold); }
  if (inB(t, 'm1') || inB(t, 'm2')) scoreCard(g, t);
  if (inB(t, 'recap')) recapCard(g, t);
}

/* audio */
FK.softSfx();
VE.registerSfx('temple', (tt) => { VE.audio.tone(tt, 392, 1.6, { type: 'sine', vol: 0.04, rel: 1.4 }); VE.audio.tone(tt + 0.02, 784, 0.9, { type: 'sine', vol: 0.018, rel: 0.8 }); });
const AUD = [[0.1, 'temple'], [at('b8', 0.4), 'temple'], [at('moral'), 'bell']];
IRIS.forEach((r) => AUD.push([r.t, 'glide']));
for (const id of ['v1', 'k1', 's1', 'p1', 'b1']) AUD.push([at(id, 0.2), 'bell']);
for (const id of ['v2', 's7', 'p4', 'b5', 'b8']) AUD.push([ph(0, id, 0.3), 'chime'], [ph(0, id, 0.34), 'shimmer']);
for (const id of ['v3', 'k8', 's3', 'p6', 'b1', 'b6']) AUD.push([ph(0, id, 0.35), 'soft']);
for (let i = 0; i < 6; i++) AUD.push([ph(0, 'k2', 0.1 + i * 0.12), 'tok']);
for (let i = 0; i < 4; i++) AUD.push([ph(0, 'lok', 0.1 + i * 0.1), 'pop']);
AUD.push([ph(0, 's10a', 0.05), 'tok'], [ph(0, 's10a', 0.32), 'tok'], [ph(0, 's10a', 0.64), 'tok'], [ph(0, 's10b', 0.05), 'tok'], [ph(0, 's10b', 0.47), 'tok']);
for (let i = 0; i < 7; i++) AUD.push([at('b5') + i * dur('b5') * 0.8 / 7, 'tok']);
AUD.push([ph(0, 'k10', 0.2), 'shimmer'], [ph(0, 'm1', 0.15), 'soft'], [ph(0, 'hook3', 0.2), 'shimmer'], [ph(0, 's6', 0.45), 'glide']);
AUD.sort((a, b) => a[0] - b[0]);

const SAD = ['v3', 'v4', 'v5', 'v6', 'k6', 'k7', 'k8', 's3', 's4', 's10a', 's10b', 'p6', 'b1', 'b2', 'b6'];
caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'chingcha-lokadhamma-youtube' : 'chingcha-lokadhamma', title: 'ชิงช้าสวรรค์โลกธรรม',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS.concat([{ t: ph(0, 'p6', 0.55), dur: 0.3, type: 'flash' }]), audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => SAD.includes(beatAt(t)), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
