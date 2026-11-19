/* Part E: HUD + audio + run */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); }
function bubble(g, b) {
  const px = 40; g.font = F(700, px); const w = g.measureText(b.txt).width + 48, h = 74;
  const x = U.clamp(b.x - w / 2, 70, 940 - w), y = U.clamp(b.y - h - 26, 800, 1420);
  g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.shadowColor = 'rgba(0,0,0,.35)'; g.shadowBlur = 14; rr(g, x, y, w, h, 30); g.fill();
  g.beginPath(); const tx = U.clamp(b.x, x + 30, x + w - 30); g.moveTo(tx - 16, y + h - 2); g.lineTo(tx + 16, y + h - 2); g.lineTo(tx, y + h + 22); g.fill(); g.shadowColor = 'transparent';
  g.fillStyle = b.c === '#fff' ? '#1a1f3a' : '#a01830'; g.font = F(700, px); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(b.txt, x + w / 2, y + h / 2 + 3); g.restore();
}
function chapter(g, t) {
  const n = CHAP.length, w = 214, gap = 10, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 236;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= at(c[1])) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? P.teal : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 42, 21); g.fill();
    if (i === cur) { const k = U.clamp((t - at(c[1])) / (end(c[2]) - at(c[1]))); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 42, 21); g.fill(); }
    g.font = F(600, 26); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText((i + 1) + ' ' + c[0], x + w / 2, y + 22); g.restore();
  });
}
function tagPill(g, k, t, id) {
  const d = TAGS[k]; const px = 32; g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = d[2] ? g.measureText(d[2]).width + 18 : 0;
  const w = w1 + w2 + 56, h = 56, x = 540 - w / 2, y = 298; const a = U.clamp((t - at(id)) / 0.25 + (TAG[ORDER[ORDER.indexOf(id) - 1]] === k ? 1 : 0)); g.globalAlpha = a;
  g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = '#0f1630'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (d[2]) { g.font = F(400, 24); g.fillText(d[2], x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
/* magnifier icon */
function lensIcon(g, x, y, c, s) { g.save(); g.strokeStyle = c; g.lineWidth = 5 * s; g.lineCap = 'round'; g.beginPath(); g.arc(x - 4 * s, y - 4 * s, 11 * s, 0, 6.283); g.stroke(); g.beginPath(); g.moveTo(x + 4 * s, y + 4 * s); g.lineTo(x + 13 * s, y + 13 * s); g.stroke(); g.restore(); }
const fillAt = (q) => at(q[3]) + ph(q[3], q[4]);
function lensRow(g, t, gh) {
  const w = 300, gap = 12, x0 = 540 - (3 * w + 2 * gap) / 2, y = 378; const intro = inB(t, 'tools');
  [0, 1, 2].forEach((i) => {
    const q = gh ? LENS[gh][i] : null, on = q && t >= fillAt(q), fresh = on && t < fillAt(q) + 1.0, x = x0 + i * (w + gap);
    const k = intro ? pop(sm(0.4 + i * 0.5, 0.8 + i * 0.5, rk(t, 'tools'))) : fresh ? 0.85 + 0.15 * pop(sm(0, 0.4, t - fillAt(q))) : 1; if (k <= 0.01) return;
    g.save(); g.translate(x + w / 2, y + 44); g.scale(k, k); g.translate(-(x + w / 2), -(y + 44));
    const col = on ? (q[2] ? P.teal : P.coral) : 'rgba(255,255,255,.14)'; g.fillStyle = col; rr(g, x, y, w, 88, 24); g.fill();
    const tc = on ? '#0f1630' : '#fff';
    g.fillStyle = tc; g.font = F(800, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(['①', '②', '③'][i], x + 30, y + 28);
    g.font = F(600, 24); g.textAlign = 'left'; g.fillText(q ? q[0] : ['ฟังมาจากไหน', 'พระไตรปิฎก', 'เหตุจริง'][i], x + 52, y + 28);
    if (on) { g.font = F(800, 32); g.fillText(q[1], x + 22, y + 64); txt(g, q[2] ? '✓' : '✕', x + w - 32, y + 50, 46, '#ffffff', 800); }
    else lensIcon(g, x + w / 2 + 10, y + 62, 'rgba(255,255,255,.75)', 1);
    g.restore();
  });
}
function stamp(g, t, id) {
  const v = VERD[id], k = pop(sm(0.6, 1.0, rk(t, id))); if (k <= 0.01) return;
  g.save(); g.translate(540, 1080); g.rotate(-0.12); g.scale(1.6 - 0.6 * k, 1.6 - 0.6 * k); g.globalAlpha = U.clamp(k * 1.2);
  g.lineWidth = 14; g.strokeStyle = v[1]; g.fillStyle = 'rgba(15,22,48,.78)'; rr(g, -280, -130, 560, 260, 34); g.fill(); g.stroke();
  txt(g, v[0], 0, -24, v[0].length > 4 ? 120 : 150, v[1], 800); txt(g, v[2], 0, 82, 50, '#fff', 700); g.restore();
}
function counter(g, label, n, col, unit) {
  g.save(); g.font = F(700, 36); const lw = g.measureText(label).width; g.font = F(800, 84); const nw = g.measureText(n).width; g.font = F(600, 34); const uw = unit ? g.measureText(unit).width + 16 : 0;
  const w = lw + nw + uw + 90, x = 540 - w / 2, y = 372; g.fillStyle = 'rgba(15,22,48,.8)'; rr(g, x, y, w, 104, 30); g.fill();
  txt(g, label, x + 30 + lw / 2, y + 54, 36, '#fff', 700); txt(g, n, x + 30 + lw + 20 + nw / 2, y + 52, 84, col, 800); if (unit) txt(g, unit, x + 50 + lw + nw + uw / 2, y + 58, 34, '#fff', 600); g.restore();
}
function dots(g, label, n, cur, col, names) {
  const y = 418; g.save(); g.font = F(700, 34); const lw = g.measureText(label).width; const step = 150; const total = lw + 24 + n * step; let x = 540 - total / 2;
  txt(g, label, x + lw / 2, y, 34, '#fff', 700); x += lw + 24 + step / 2;
  for (let i = 1; i <= n; i++) { g.fillStyle = i < cur ? 'rgba(255,255,255,.45)' : i === cur ? col : 'rgba(255,255,255,.16)'; g.beginPath(); g.arc(x, y, i === cur ? 32 : 26, 0, 6.283); g.fill(); g.fillStyle = '#0f1630'; g.font = F(800, 28); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i, x, y + 2); txt(g, names[i - 1], x, y + 56, 24, i <= cur ? '#fff' : 'rgba(255,255,255,.5)', 600); x += step; }
  g.restore();
}
/* Sivaka: 8 causes of feeling */
const CAUSES = ['ดี', 'เสมหะ', 'ลม', 'ทั้ง 3 รวมกัน', 'ฤดูแปรปรวน', 'ดูแลกายไม่ดี', 'ถูกทำร้าย', 'กรรม'];
function causes(g, t) {
  const id = beatAt(t), r = rk(t, id), w = 230, h = 66, gap = 10, x0 = 540 - (4 * w + 3 * gap) / 2, y0 = 372;
  CAUSES.forEach((c, i) => { const k = inB(t, 'c10') ? pop(sm(0.3 + i * 0.32, 0.6 + i * 0.32, r)) : 1; if (k <= 0.01) return;
    const x = x0 + (i % 4) * (w + gap), y = y0 + Math.floor(i / 4) * (h + gap), last = i === 7, hl = inB(t, 'c11') && last;
    g.save(); g.translate(x + w / 2, y + h / 2); g.scale(k, k); g.translate(-(x + w / 2), -(y + h / 2));
    g.fillStyle = hl ? P.gold : last ? 'rgba(143,123,255,.85)' : 'rgba(46,230,197,.85)'; rr(g, x, y, w, h, 22); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(700, 28); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText((i + 1) + '. ' + c, x + w / 2, y + h / 2 + 2); g.restore(); });
  if (inB(t, 'c11')) { const k = sm(0.8, 1.2, r); g.save(); g.globalAlpha = k; txt(g, 'กรรม = 1 ใน 8', 540, y0 + 2 * (h + gap) + 34, 44, P.gold, 800); g.restore(); }
}
/* mini map (Thailand + neighbours) */
let MM = null; const MMB = { lon0: 96.5, lon1: 107, lat0: 0.6, lat1: 21, x: 64, y: 1060, w: 240, h: 450 };
function miniMap(g, t, key) {
  const a = U.clamp((t - at(beatAt(t))) / 0.3 + (PIN[ORDER[ORDER.indexOf(beatAt(t)) - 1]] ? 1 : 0)); const b = MMB;
  if (!MM) { MM = []; for (const f of DATA.world.features) { const nm = f.properties.name; if (!['Thailand', 'Laos', 'Cambodia', 'Myanmar', 'Malaysia', 'Vietnam'].includes(nm)) continue; const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates; for (const p of polys) MM.push([nm, p[0]]); } }
  const pr = (lon, lat) => [b.x + (lon - b.lon0) / (b.lon1 - b.lon0) * b.w, b.y + (b.lat1 - lat) / (b.lat1 - b.lat0) * b.h];
  g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.85)'; rr(g, b.x - 14, b.y - 14, b.w + 28, b.h + 28, 22); g.fill();
  g.save(); g.beginPath(); g.rect(b.x - 10, b.y - 10, b.w + 20, b.h + 20); g.clip();
  for (const [nm, ring] of MM) { g.beginPath(); ring.forEach((q, i) => { const p = pr(q[0], q[1]); i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }); g.closePath(); g.fillStyle = nm === 'Thailand' ? '#4f5aa0' : '#2e3f73'; g.fill(); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1.5; g.stroke(); }
  g.restore();
  const pl = PL[key]; const p = pr(pl[0], pl[1]);
  if (key === 'isan') { g.fillStyle = 'rgba(255,201,74,.35)'; g.beginPath(); g.ellipse(p[0], p[1] - 6, 46, 34, 0, 0, 6.283); g.fill(); }
  if (key === 'sing') { const q = pr(103.5, 16.0); const k = sm(0.3, 1.6, rk(t, 'c8')); g.strokeStyle = P.gold; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(q[0], q[1]); g.quadraticCurveTo(q[0] + 70, (q[1] + p[1]) / 2, U.lerp(q[0], p[0], 1), U.lerp(q[1], p[1], k)); g.stroke(); g.setLineDash([]); }
  const pk = (t * 1.2) % 1; g.strokeStyle = P.coral; g.lineWidth = 3; g.globalAlpha = a * (1 - pk); g.beginPath(); g.arc(p[0], p[1], 8 + pk * 22, 0, 6.283); g.stroke(); g.globalAlpha = a;
  g.fillStyle = P.coral; g.beginPath(); g.arc(p[0], p[1], 9, 0, 6.283); g.fill();
  txt(g, pl[2], U.clamp(p[0], b.x + 60, b.x + b.w - 50), p[1] < b.y + 60 ? p[1] + 34 : p[1] - 30, 28, '#fff', 700);
  g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.92)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function recapCard(g, t) {
  const r = rk(t, 'recap'), a = U.clamp(r / 0.3) * U.clamp((BASE.recap - r) / 0.3);
  g.save(); g.globalAlpha = a; panel(g, 60, 270, 960, 1200, 1);
  txt(g, 'สรุป: 3 ผีอีสาน', 540, 350, 64, '#fff', 800); txt(g, 'ตรวจด้วยพุทธวิธี', 540, 428, 50, P.gold, 800);
  const rows = [['พระอุ้มหมา ชีอุ้มแมว', 'ข่าวลือ · ผิดวินัยตั้งแต่ก้าวแรก', 'มั่ว', P.coral], ['ปอบ', 'สัตว์ป่วยตาย · คนถูกกล่าวหาเจ็บจริง', 'มั่ว', P.coral], ['ผีแม่ม่าย', 'ใหลตาย = ไฟฟ้าหัวใจ (บรูกาดา)', 'ตายจริง', P.gold]];
  rows.forEach((s0, i) => { const k = U.clamp((r - 0.5 - i * 1.0) / 0.3); if (k <= 0) return; const y = 560 + i * 170; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 70, 880, 140, 26); g.fill(); g.fillStyle = s0[3]; g.beginPath(); g.arc(165, y, 40, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 42); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 165, y + 2);
    txt(g, s0[0], 230, y - 24, 42, '#fff', 800, 'left'); txt(g, s0[1], 230, y + 30, 30, P.teal, 600, 'left');
    g.save(); g.translate(880, y); g.rotate(-0.12); g.strokeStyle = s0[3]; g.lineWidth = 6; rr(g, -78, -34, 156, 68, 14); g.stroke(); txt(g, s0[2], 0, 2, s0[2].length > 4 ? 34 : 42, s0[3], 800); g.restore(); g.restore(); });
  const k2 = U.clamp((r - 3.8) / 0.3); g.globalAlpha = a * k2;
  txt(g, 'ผีในพระไตรปิฎก มาเพื่อ “ขอ” ไม่ได้มาเพื่อ “เอา”', 540, 1110, 36, P.gold, 700);
  txt(g, 'ญาติเคยใหลตาย หรือเคยวูบ → ตรวจคลื่นไฟฟ้าหัวใจ', 540, 1170, 34, '#fff', 600);
  g.globalAlpha = a * 0.85; g.font = F(400, 22); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (กาลามสูตร · ปาจิตตีย์ · สีวกสูตร · ติโรกุฑฑสูตร) · Bangkok Post/Thai PBS 2560', 540, 1300);
  g.fillText('มติชน 2560 · ไทยรัฐ 2569 · เดลินิวส์ 2569 · Tatsanavivat 1992 · Nademanee 1997 · Srettabunjong 2019', 540, 1334);
  g.fillText('เรื่องพระอุ้มหมา ชีอุ้มแมว เป็นเรื่องเล่า ไม่มีหลักฐานยืนยัน · ภาพจำลอง', 540, 1368);
  g.restore();
}
function hud(g, t, { W, H }) {
  const id = beatAt(t), gh = ghostOf(t);
  for (const b of BUB) bubble(g, b);
  if (t >= at('a1') && t < at('recap')) chapter(g, t);
  if (TAG[id]) tagPill(g, TAG[id], t, id);
  if (inB(t, 'b4')) counter(g, '370 หลัง ลงขัน', '124', P.gold, 'บาท');
  else if (inB(t, 'c4')) dots(g, 'ห่างกัน', 2, rk(t, 'c4') > 2.2 ? 2 : 1, P.coral, ['สัปดาห์ 1', 'สัปดาห์ 2']);
  else if (inB(t, 'c6')) counter(g, 'สำรวจ', Math.round(3867 * U.easeOut(sm(0.4, 3.8, rk(t, 'c6')))).toLocaleString('en-US'), P.gold, 'หมู่บ้าน');
  else if (inB(t, 'c8')) counter(g, 'แรงงานไทย', String(Math.round(235 * U.easeOut(sm(0.4, 3.2, rk(t, 'c8'))))), P.coral, 'คน');
  else if (inB(t, 'c13')) counter(g, 'บรูกาดา', String(Math.round(16 * U.easeOut(sm(0.6, 2.6, rk(t, 'c13'))))), P.gold, 'จาก 27 คน');
  else if (between(t, 'c10', 'c11')) causes(g, t);
  else if (inB(t, 'tools') || (gh && !inB(t, 'cliff1') && !inB(t, 'cliff2'))) lensRow(g, t, inB(t, 'tools') ? null : gh);
  if (VERD[id]) stamp(g, t, id);
  if (PIN[id]) miniMap(g, t, PIN[id]);
  if (inB(t, 'recap')) recapCard(g, t);
  if (FLASH > 0) { g.fillStyle = 'rgba(255,255,255,' + FLASH + ')'; g.fillRect(0, 0, W, H); }
}

/* audio (soft only) */
FK.softSfx();
VE.registerSfx('knock', (tt) => { VE.audio.noise(tt, 0.05, { type: 'bandpass', f: 900, q: 2, vol: 0.05 }); VE.audio.tone(tt, 180, 0.08, { type: 'triangle', vol: 0.03, rel: 0.06 }); });
VE.registerSfx('stamp', (tt) => { VE.audio.tone(tt, 880, 0.06, { type: 'triangle', vol: 0.05, rel: 0.05 }); VE.audio.noise(tt, 0.08, { type: 'bandpass', f: 1500, vol: 0.04 }); });
VE.registerSfx('beat', (tt) => { VE.audio.tone(tt, 150, 0.09, { type: 'sine', vol: 0.045, rel: 0.08 }); VE.audio.tone(tt + 0.2, 130, 0.09, { type: 'sine', vol: 0.035, rel: 0.08 }); });
VE.registerSfx('ping', (tt) => VE.audio.tone(tt, 1320, 0.12, { type: 'sine', vol: 0.03, rel: 0.1 }));
const A = (id, s) => at(id) + ph(id, s);
const AUD = [[0.1, 'chime']];
IRIS.forEach((q) => AUD.push([q.t, 'glide']));
AUD.push([A('hook1', 0.8), 'soft'], [A('hook2', 0.3), 'pop'], [A('hook3', 0.4), 'bell']);
for (let i = 0; i < 3; i++) AUD.push([A('tools', 0.4 + i * 0.5), 'pop']);
for (const t0 of [0.7, 1.0, 1.9, 2.2]) AUD.push([A('a2', t0), 'knock']);
for (let i = 0; i < 6; i++) AUD.push([A('a3', 0.3 + i * 0.7), 'pop']);
AUD.push([A('a4', 0.6), 'glide'], [A('a8', 0.9), 'stamp'], [A('a9', 2.8), 'chime']);
for (let i = 0; i < 4; i++) AUD.push([A('a10', 0.9 + i * 0.75), 'ping']);
for (const g0 of ['a', 'b', 'c']) LENS[g0].forEach((q) => AUD.push([fillAt(q), 'bell']));
for (const id in VERD) AUD.push([A(id, 0.62), 'stamp']);
AUD.push([A('c18', 0.9), 'chime'], [A('c18', 1.0), 'shimmer']);
AUD.push([A('b1', 2.4), 'shimmer'], [A('b3', 0.3), 'soft'], [A('b3', 0.7), 'soft']);
for (let i = 0; i < 6; i++) AUD.push([A('b4', 0.2 + i * 0.4), 'tok']);
AUD.push([A('b4', 3.2), 'pop']);
for (let i = 0; i < 4; i++) AUD.push([A('b5', 2.4 + i * 0.35), 'pop']);
AUD.push([A('b8', 1.6), 'bell'], [A('b9', 1.0), 'glide'], [A('b11', 0.4), 'chime']);
AUD.push([A('c2', 1.2), 'pop'], [A('c4', 0.6), 'shimmer'], [A('c4', 2.2), 'shimmer']);
for (let i = 0; i < 8; i++) AUD.push([A('c6', 0.4 + i * 0.42), 'tok']);
for (let i = 0; i < 8; i++) AUD.push([A('c10', 0.3 + i * 0.32), 'pop']);
AUD.push([A('c11', 0.8), 'bell']);
for (let i = 0; i < 4; i++) AUD.push([A('c12', 0.5 + i * 0.85), 'beat']);
for (let i = 0; i < 3; i++) AUD.push([A('c14', 0.1 + i * 0.85), 'beat']);
AUD.push([A('c16', 1.2), 'stamp'], [A('c16', 2.6), 'chime'], [A('d2', 1.0), 'shimmer'], [A('d2', 2.6), 'chime'], [A('d4', 0.4), 'chime']);
for (let i = 0; i < 3; i++) AUD.push([at('recap') + 0.5 + i * 1.0, 'tok']);
AUD.push([at('ask', 0.3), 'chime']);
AUD.sort((a, b) => a[0] - b[0]);

caps.forEach((c) => { if (L.LAND) { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; } });
VE.run({
  DUR, W: L.W, H: L.H, coverAt0: true, file: L.LAND ? 'phi-isan-3-tua-youtube' : 'phi-isan-3-tua', title: '3 ผีอีสาน มั่วไหม?',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene }) { S = setupScene(scene); return S; },
  update, bgAt, hud, caps, trans: IRIS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => between(t, 'a1', 'a4') || between(t, 'b9', 'b11') || between(t, 'cliff2', 'c4'), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, B) })],
});
