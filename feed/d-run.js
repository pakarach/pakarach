/* Part D: camera, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const SHOT = {
  cover: [[0, fr('ROOM', 0.2, 3.1, -2.2, 6.4, 0.6, 0.5)]], hook1: [[0, fr('ROOM', 0.2, 3.1, -2.2, 7.2, 0.7, -0.7)]],
  hook2: [[0, fr('ROOM', -1.0, 2.7, -2.6, 5.2, 0.4, -1.0)]], hook3: [[0, fr('ROOM', 0.2, 3.0, -2.4, 4.8, 0.25, 0.4)]], hook4: [[0, fr('ROOM', 0.3, 3.4, -1.8, 9, 1.3, 0)]],
  n1: [[0, fr('ROOM', 0, 8, -10, 21, 5.5, 0)]], n2: [[0, fr('ROOM', -8.6, 3.5, 1.6, 7.6, 0.8, 0.6)]], n3: [[0, fr('ROOM', 0.2, 3.3, -2.2, 8.5, 1.1, 0)]],
  d1: [[0, fr('FEED', 0, 7.6, -1, 15.5, 0.8, 0)]], d2: [[0, fr('FEED', 0, 14, -1, 13.5, -2.6, 0)]], d3: [[0, fr('FEED', -3.2, 5.0, 0, 11, 0.8, -1)]],
  d4: [[0, fr('FEED', 1.4, 7.0, -0.5, 12, 0.6, 1.4)]], d5: [[0, fr('FEED', -11, 3.8, 0.4, 13.2, 1.8, 0)]], d6: [[0, fr('FEED', 0, 6.4, -0.8, 12.5, 0.6, 0)]],
  a1: [[0, fr('FOREST', 0, 3.4, -1.6, 13.5, 9.5, 0)]], a2: [[0, fr('FOREST', 0, 3.0, -1.6, 13, 8, -2)], [3.0, fr('FOREST', 0, 3.0, -1.6, 13, 8, 2)]],
  a3: [[0, fr('FOREST', 1.2, 3.0, -1.2, 12.5, 7.5, 2)]], a4: [[0, fr('FOREST', 0, 3.8, 0, 9.5, 3.2, 0)]], a5: [[0, fr('FOREST', 0, 5.2, -0.6, 11.5, 2.2, 0)]],
  a6: [[0, fr('BRANCH', -6.5, 4.6, -0.6, 9.5, 0.6, 0)], [1.2, fr('BRANCH', -3.7, 4.6, -0.6, 9.5, 0.6, 0)], [2.4, fr('BRANCH', 0.1, 4.6, -0.6, 9.5, 0.6, 0)], [3.6, fr('BRANCH', 3.9, 4.6, -0.6, 9.5, 0.6, 0)], [4.8, fr('BRANCH', 7.4, 4.6, -0.6, 9.5, 0.6, 0)]], a7: [[0, fr('BRANCH', 9.6, 4.6, -0.6, 10.5, 1.6, 0)]],
  c1: [[0, fr('CHAIN', 0, 4.8, 0, 13.5, 0.6, 0)]], c2: [[0, fr('CHAIN', -1.8, 6.6, 0, 9.4, 0.4, -0.4)]], c3: [[0, fr('CHAIN', 1.8, 6.6, 0, 9.4, 0.4, 0.4)]],
  c4: [[0, fr('CHAIN', 1.8, 3.6, 0, 9.4, 0.4, 0.4)]], c5: [[0, fr('CHAIN', -1.0, 4.0, 0, 10, 0.4, -0.4)]], c6: [[0, fr('CHAIN', 2.2, 4.8, 0, 9, 0.4, 1.0)]], c7: [[0, fr('CHAIN', 0, 5.2, 0, 15, 2.0, 0)]],
  s1: [[0, fr('LAB', -1.0, 4.4, -0.8, 12, 1.6, 0)]], s2: [[0, fr('LAB', 1.6, 2.2, 0.6, 6.2, 1.0, 0.4)]], s3: [[0, fr('LAB', -0.6, 3.6, -0.6, 10, 1.4, -0.6)]],
  s4: [[0, fr('LAB', 0.4, 2.1, 0.6, 5.6, 0.8, 0)]], s5: [[0, fr('LAB', 0, 3.4, -0.4, 10.5, 1.6, 0)]], s6: [[0, fr('LAB', 3.4, 2.8, -2.6, 7.4, 0.8, 0)]],
  s7: [[0, fr('LAB', -1.2, 2.6, 2.6, 6.6, 0.6, 0)]], s8: [[0, fr('LAB', -1.5, 2.7, 2.6, 5.4, 0.3, 0.5)]], s9: [[0, fr('CHAIN', 2.4, 4.8, 0, 9.5, 0.4, 0.6)]],
  m1: [[0, fr('HEAV', 0, 3.3, 0.4, 9.5, 1.2, 0)]], m2: [[0, fr('HEAV', 0, 3.8, -1, 12.5, 2.2, 0)]], m3: [[0, fr('HEAV', 0, 18.8, 0, 11, 1.2, 0)]],
  m4: [[0, fr('HEAV', 0, 35.0, 0, 11, 1.2, 0)]], m5: [[0, fr('HEAV', 0.4, 34.6, 0.4, 7.5, 0.6, 0.4)]],
  m6: [[0, fr('HEAV', 0, 34.6, 0.4, 8, 0.6, 0)], [1.4, fr('HEAV', 0.4, 3.2, 2.4, 9.5, 1.4, 0)]], m7: [[0, fr('HEAV', 15.6, 2.8, -0.4, 8.5, 0.35, -0.6)]],
  m8: [[0, fr('ROOM', 0.2, 3.7, -1.8, 8.5, 1.0, 0)]],
  p1: [[0, fr('FOREST', 0, 3.8, -1, 13, 8, 0)]], p2: [[0, fr('FOREST', 0, 3.0, 0, 11, 5, 1.5)]], p3: [[0, fr('FOREST', 0, 4.4, 0, 8.6, 2.0, 0)]],
  p4: [[0, fr('ROOM', 0.2, 3.1, -2.2, 6.2, 0.5, 0.4)]], p5: [[0, fr('ROOM', 0.2, 3.0, -2.2, 5.2, 0.3, -0.5)]], p6: [[0, fr('ROOM', 0.2, 3.3, -2.0, 6.2, 0.6, 0.6)]],
  p7: [[0, fr('ROOM', 3.0, 3.0, -0.8, 9.6, 1.2, 0.2)]], back: [[0, fr('ROOM', 0.2, 3.3, -1.6, 8.6, 1.2, 0)]], recap: [[0, fr('ROOM', 0, 7, -8, 20, 4.5, 0)]], ask: [[0, fr('ROOM', 0.2, 3.1, -2.0, 7.2, 0.8, 0.6)]],
};
const CUT = new Set(['m1', 'm8']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sg0 = SHOT[id];
    sg0.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < sg0.length ? at(id) + sg0[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.93);
      const cut = j === 0 && CUT.has(id);
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1]) > 12; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.0 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

/* backgrounds */
const BG = { room: ['#060a1c', '#141f46'], feed: ['#120d2e', '#2c2160'], day: ['#22386b', '#6f9fd0'], chain: ['#0f1630', '#1b2a55'], lab: ['#16264a', '#4a6a9a'], sky: ['#3a3f8f', '#a9b4ff'], gold: ['#3a2a5a', '#d0a060'], warm: ['#0a0c22', '#2a2448'] };
function bgKey(t) {
  const id = beatAt(t), c = id[0];
  if (id === 'cover' || id.startsWith('hook') || id.startsWith('n') || id === 'm8' || ['p4', 'p5', 'p6', 'p7', 'ask'].includes(id)) return 'room';
  if (id === 'back' || id === 'recap') return 'warm';
  if (c === 'd') return 'feed';
  if (c === 'a' || ['p1', 'p2', 'p3'].includes(id)) return 'day';
  if (c === 'c' || id === 's9') return 'chain';
  if (c === 's') return 'lab';
  if (['m1', 'm2'].includes(id)) return 'gold';
  if (c === 'm') return 'sky';
  return 'room';
}
function bgAt(t) { return BG[bgKey(t)]; }

const ss = (o, k) => { o.scale.setScalar(Math.max(0.0001, k)); o.visible = k > 0.002; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const BUB = [];
function armsHold(ch, k) { const a = ch.userData.arms; k = k == null ? 1 : k; a.L.rotation.set(-1.25 * k, 0, -0.14 + 0.5 * k); a.R.rotation.set(-1.25 * k, 0, 0.14 - 0.5 * k); }
function phoneAt(ch, ph, up) { ch.updateMatrixWorld(true); const v = new T.Vector3(0.1, up || 0.8, 0.62); ch.localToWorld(v); ph.parent.worldToLocal(v); ph.position.copy(v); ph.rotation.set(-0.9, ch.rotation.y + Math.PI, 0, 'YXZ'); }
function swipeTex(t, ph, rate) { ph.userData.scr.material.map = CARD_TEX[Math.floor(t * (rate || 0.7)) % CARD_TEX.length]; }

function updRoom(t, s) {
  const R = s.room, P0 = R.phum, u = P0.userData, id = beatAt(t);
  const phoneDocked = t >= at('p7') + 2.6;
  P0.position.set(0.2, 0.92, -2.6); P0.rotation.set(0, 0, 0); rest(P0); u.eyes.forEach((e) => (e.scale.y = 1));
  R.blanket.position.set(0.2, 1.2, -0.8); R.blanket.scale.set(1, 1, 1);
  if (!phoneDocked) {
    armsHold(P0); u.head.rotation.x = 0.18; phoneAt(P0, R.ph); swipeTex(t, R.ph);
    if (t > at('hook2') + 1.5 && t < at('n1')) u.eyes.forEach((e) => (e.scale.y = 0.45));
    if (inB(t, 'p4')) { const r = rel(t, 'p4'), d = sm(0.2, 0.9, r); armsHold(P0, 1 - d * 0.6); phoneAt(P0, R.ph, 0.8 - d * 0.2); u.head.rotation.x = 0.18 - d * 0.25; u.eyes.forEach((e) => (e.scale.y = r > 1 && r < 3.6 ? 0.15 : 1)); if (r > 3.4) BUB.push({ o: P0, dy: 2.0, dx: 0.6, txt: 'เปิดมาทำอะไรนะ?', c: '#fff' }); }
    if (inB(t, 'p5') && rel(t, 'p5') > 2.2) BUB.push({ o: P0, dy: 2.0, dx: 0.6, txt: 'สนุกจริง?', c: '#fff' });
    if (inB(t, 'p7')) { const r = rel(t, 'p7'), k = U.easeIO(sm(0.8, 2.6, r)); if (k > 0) { const a = R.ph.position.clone(), b = new T.Vector3(5.6, 1.2, 0.4); R.ph.position.lerpVectors(a, b, k); R.ph.position.y += Math.sin(k * Math.PI) * 1.6; R.ph.rotation.set(-Math.PI / 2 * k + 0.35 * (1 - k), Math.PI * (1 - k), 0); armsHold(P0, 1 - k); } }
  } else {
    R.ph.position.set(5.6, 1.2, 0.4); R.ph.rotation.set(-Math.PI / 2, 0, 0); R.ph.userData.scr.material.map = CARD_TEX[5];
    if (inB(t, 'back') || t >= at('back')) { const k = inB(t, 'back') ? U.easeIO(sm(1.0, 3.2, rel(t, 'back'))) : 1; P0.rotation.x = -1.3 * k; P0.position.y = 0.92 + 0.2 * k; P0.position.z = -2.6 + 1.0 * k; u.eyes.forEach((e) => (e.scale.y = 1 - 0.85 * k)); R.blanket.scale.set(1, 1, 1 + 0.35 * k); R.blanket.position.z = -0.8 - 0.45 * k;
      if (inB(t, 'back') && rel(t, 'back') > 3.6) BUB.push({ o: P0, dy: 1.2, dx: 0.9, txt: 'Zz…', c: '#fff' }); }
  }
  R.phGlow.position.copy(R.ph.position); R.phGlow.material.opacity = phoneDocked ? 0.35 : 0.8; R.faceLight.position.set(0.2, 2.3, -1.9); R.faceLight.intensity = phoneDocked ? 0 : 1.4;
  R.lampLight.intensity = phoneDocked ? 0.9 : 0;
  if (inB(t, 'hook1') && rel(t, 'hook1') > 1.2) BUB.push({ o: P0, dy: 2.0, dx: 0.7, txt: 'อีกคลิปเดียว…', c: '#fff' });
  if (inB(t, 'hook3') && rel(t, 'hook3') > 1.4) BUB.push({ o: P0, dy: 2.0, dx: 0.7, txt: 'เมื่อกี้ดูอะไรนะ?', c: '#fff' });
  if (inB(t, 'n3') && rel(t, 'n3') > 1.5) BUB.push({ o: P0, dy: 2.0, dx: 0.7, txt: 'อีกคลิปเดียว…', c: '#fff' });
  // breath ring
  { const on = inB(t, 'p4') && rel(t, 'p4') > 1.0 && rel(t, 'p4') < 3.6; R.ring.visible = on; if (on) { const q = ((rel(t, 'p4') - 1.0) / 2.6); R.ring.position.set(0.2, 2.3, -2.0); R.ring.scale.setScalar(0.8 + Math.sin(q * Math.PI) * 0.9); R.ring.material.opacity = 0.85 * Math.sin(q * Math.PI); } }
  // notification bells
  R.bells.forEach((b, i) => { const on = inB(t, 'p6'); b.visible = on; if (!on) return; const r = rel(t, 'p6'), k = U.easeBack(sm(0.3 + i * 0.25, 0.7 + i * 0.25, r)), out = sm(3.4, 4.2, r); b.position.set(-0.6 + i * 0.75, 3.2 + Math.sin(t * 9 + i) * 0.05 * (1 - out), -1.6); b.rotation.z = Math.sin(t * 14 + i) * 0.3 * (1 - sm(2.2, 2.6, r)); ss(b, k * (1 - out)); b.userData.x.visible = r > 2.0 + i * 0.2; });
  // card streams: cover rises from phone, m8 rains from the sky
  const rainOn = t < end('cover') || inB(t, 'm8');
  R.rain.forEach((c, i) => { c.visible = rainOn; if (!rainOn) return; const sd = c.userData.seed;
    if (t < end('cover')) { const q = (sd[0] + t * 0.05) % 1, side = sd[1] < 0.5 ? -1 : 1; c.position.set(0.2 + side * (0.6 + q * 3.2 + sd[2]), 2.0 + q * 2.6, -1.9 - q * 1.5); c.rotation.set(0, (sd[1] - 0.5) * 0.8, (sd[2] - 0.5) * 0.6); c.material.opacity = U.clamp(q * 6) * (1 - q * 0.5); }
    else { const r = rel(t, 'm8'), y = 10 - ((sd[0] * 10 + r * (1.8 + sd[1])) % 10); c.position.set((sd[1] - 0.5) * 8, y, -1.2 + (sd[2] - 0.5) * 4); c.rotation.set(sd[0] * 2 + r, sd[2] * 3 + r * 0.7, 0); c.material.opacity = U.clamp(y / 1.2); } });
  // town windows light up in n1
  const wl = inB(t, 'n1') ? 0.15 + 0.85 * sm(0.6, 3.0, rel(t, 'n1')) : t >= at('recap') ? 0.25 : 0.15;
  s.town.forEach((m, i) => { m.material.emissiveIntensity = inB(t, 'n1') ? U.lerp(0.15, 1.0, U.clamp(sm(0.6 + (i % 9) * 0.25, 1.2 + (i % 9) * 0.25, rel(t, 'n1')))) : wl; });
  // 45 days
  { const on = inB(t, 'n2'); s.days.visible = on; s.daysTop.visible = on; if (on) s.days.count = Math.round(45 * sm(1.0, 3.6, rel(t, 'n2'))); }
}

function drawScreen(g, t) {
  const W = 360, H = 680; g.fillStyle = '#0c0f1e'; g.fillRect(0, 0, W, H);
  if (inB(t, 'd4')) {
    const r = rel(t, 'd4'); g.fillStyle = '#2a1f5a'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 3; i++) { const x = 18 + i * 112, spin = r > 1.0 && r < 2.6 + i * 0.4 ? r * (18 + i * 4) : 0, base = Math.floor(spin) + i * 2;
      g.save(); rr2(g, x, 170, 100, 340, 18); g.clip(); g.fillStyle = '#ffffff'; g.fillRect(x, 170, 100, 340);
      for (let k = -1; k < 3; k++) { const off = (spin % 1) * 180; drawCard(g, x + 8, 190 + k * 180 + off - 90, 84, 150, base + k, (base + k) % 3 === 0 ? 'hit' : null); }
      g.restore(); }
    g.fillStyle = P.gold; g.font = '800 54px Kanit,sans-serif'; g.textAlign = 'center'; g.fillText('ลุ้น…', W / 2, 600); return;
  }
  const spd = inB(t, 'd6') ? 0 : 150, off = (t * spd) % 340;
  if (inB(t, 'd6')) {
    const r = rel(t, 'd6'), n = Math.floor(r / 1.3), k = U.easeOut(U.clamp((r % 1.3) / 0.35)), hit = [1, 0, 0, 1][n % 4];
    drawCard(g, 30, 40 + (1 - k) * 640, 300, 560, n + 1, hit ? 'hit' : 'flop');
    if (k > 0.9) { g.font = '800 92px Kanit,sans-serif'; g.textAlign = 'center'; g.lineWidth = 12; g.strokeStyle = '#0c0f1e'; g.strokeText(hit ? 'ปัง!' : 'แป้ก…', W / 2, 360); g.fillStyle = hit ? P.gold : '#c8c8d8'; g.fillText(hit ? 'ปัง!' : 'แป้ก…', W / 2, 360); }
    return;
  }
  for (let k = -1; k < 3; k++) drawCard(g, 30, 30 + k * 340 - off + 340, 300, 310, k + Math.floor(t * spd / 340) + 7);
}
function updFeed(t, s) {
  const F = s.feed; if (t < at('n3') || t > end('a1')) { F.g.visible = false; return; } F.g.visible = true;
  drawScreen(F.scrTex.userData.g, t); F.scrTex.needsUpdate = true;
  F.cards.forEach((c, i) => { const q = ((i / F.cards.length) + t * 0.06) % 1; c.position.set(Math.sin(i * 1.7 + t * 0.5) * 0.6, 11.2 + q * 20, -1 - q * 1.5); c.material.opacity = U.clamp(q * 8) * (1 - q * 0.6); c.rotation.y = Math.sin(t + i) * 0.15; });
  { const r = rel(t, 'd1'), k = t < at('d1') ? 1 : 1 - sm(2.6, 3.4, r); ss(F.next, k); F.next.position.y = 0.95; }
  { const r = inB(t, 'd3') ? rel(t, 'd3') : 0, q = (r * 0.4) % 1; F.hg.userData.sTop.scale.set(1 - q * 0.8, 1 - q * 0.8, 1 - q * 0.8); F.hg.userData.sBot.scale.set(0.2 + q * 0.8, 0.2 + q * 0.8, 0.2 + q * 0.8); }
  { let a = 0; if (inB(t, 'd4')) { const r = rel(t, 'd4'); a = Math.max(Math.sin(Math.PI * sm(0.4, 1.2, r)), Math.sin(Math.PI * sm(3.6, 4.4, r))) * 1.1; } F.lever.rotation.x = a; }
  F.dp.bars.forEach((b, i) => { const k = inB(t, 'd5') ? U.easeBack(sm(1.0 + i * 0.3, 1.6 + i * 0.3, rel(t, 'd5'))) : 0; b.scale.y = Math.max(0.001, b.userData.h * k); b.visible = k > 0.01; F.dp.lamps[i].material.color.set(inB(t, 'd5') && Math.sin(t * 6 + i * 2) > 0.2 ? (i === 2 ? '#ffe08a' : '#ffffff') : '#5a6280'); });
  F.dp.monkey.userData.head.rotation.y = Math.sin(t * 1.4) * 0.4;
  F.bursts.forEach((b, i) => { b.visible = false; if (!inB(t, 'd6')) return; const r = rel(t, 'd6'), n = Math.floor(r / 1.3), q = (r % 1.3); if ([1, 0, 0, 1][n % 4] && q > 0.35 && i === 0) { b.visible = true; b.position.set(0, 9.0 + q * 0.6, -0.5); b.scale.setScalar(3 + q * 3); b.material.opacity = 0.9 * (1 - q / 1.3); } });
  const Ph = F.phum; Ph.position.set(1.8, 0.6, 2.6); Ph.rotation.y = -0.25; armsHold(Ph); Ph.userData.head.rotation.x = inB(t, 'd2') ? -0.45 : 0.15; phoneAt(Ph, F.mini); swipeTex(t, F.mini, 1.2);
  if (inB(t, 'd2') && rel(t, 'd2') > 2) BUB.push({ o: Ph, dy: 2.1, txt: 'สุดตรงไหน?', c: '#fff' });
}

function updForest(t, s) {
  const O = s.fo, on = between(t, 'd6', 'a6') || between(t, 'p1', 'p4'); O.g.visible = on; if (!on) return;
  const postOn = t >= at('p1'); const pk = postOn ? U.easeBack(sm(0.4, 1.6, rel(t, 'p1'))) : 0;
  O.post.scale.set(1, Math.max(0.001, pk), 1); O.post.visible = pk > 0.01;
  let kn = [0, 0.6, 0];
  if (inB(t, 'a3')) { const r = rel(t, 'a3'), k = U.easeIO(sm(0.8, 3.6, r)), d = O.an[5].userData.dir; kn = [d[0] * 2.2 * k, 0.6, d[1] * 2.2 * k]; }
  if (t >= end('a3') && t < at('p1')) { const d = O.an[5].userData.dir; const k = 1 - U.easeIO(sm(0, 1.2, rel(t, 'a4'))); kn = [d[0] * 2.2 * k, 0.6, d[1] * 2.2 * k]; }
  if (postOn) kn = [0, U.lerp(0.6, 0.9, pk), 0];
  O.knot.position.set(kn[0], kn[1], kn[2]); O.knot.visible = true;
  const tired = postOn ? U.easeIO(sm(2.4, 4.4, rel(t, 'p2'))) * (t >= at('p2') ? 1 : 0) : 0;
  O.an.forEach((an, i) => {
    const d = an.userData.dir, n = an.userData.name, u = an.userData;
    const pop = inB(t, 'a1') ? U.easeBack(sm(0.8 + i * 0.35, 1.2 + i * 0.35, rel(t, 'a1'))) : 1; ss(an, pop * (n === 'monkey' ? 0.75 : 1));
    const strain = t >= at('a2') ? 1 - tired : 0;
    let rad = 3.0 + strain * (0.35 + 0.25 * Math.sin(t * 5 + i * 1.3)) - tired * 0.9;
    let px = kn[0] + d[0] * rad, pz = kn[2] + d[1] * rad, py = 0.15;
    if (inB(t, 'a3') && i !== 5) { const k = sm(0.8, 3.6, rel(t, 'a3')); rad = 3.0 - k * 0.6; px = kn[0] + d[0] * rad; pz = kn[2] + d[1] * rad; }
    if (n === 'bird') { py = 0.15 + (strain * (1.2 + Math.sin(t * 3) * 0.3)) * (1 - tired); u.wings.forEach((w, j) => (w.rotation.z = (j ? -1 : 1) * (strain > 0.1 ? Math.sin(t * 16) * 0.7 : 0.1))); }
    an.position.set(px, py, pz); an.rotation.set(0, Math.atan2(d[0], d[1]), 0);
    if (inB(t, 'a3') && i !== 5) an.rotation.x = -0.25;
    if (u.legs) u.legs.forEach((l, j) => (l.rotation.x = strain > 0.1 ? Math.sin(t * 12 + j * Math.PI) * 0.6 * strain : 0));
    if (u.segs) u.segs.forEach((sg, j) => (sg.position.x = Math.sin(t * 6 - j * 0.8) * 0.18 * (strain + 0.2)));
    if (u.tail && n === 'croc') u.tail.rotation.z = Math.sin(t * 4) * 0.3 * strain;
    if (n === 'monkey') { if (strain > 0.1) { u.arms.L.rotation.set(-1.4, 0, -0.3); u.arms.R.rotation.set(-1.4, 0, 0.3); walk(an, t, strain); } else rest(an); setSit(an, tired > 0.6); }
    if (tired > 0) { an.rotation.y = Math.atan2(-d[0], -d[1]) * tired + Math.atan2(d[0], d[1]) * (1 - tired); if (u.body && n !== 'monkey') u.body.scale.y = 1 - tired * 0.3; }
    // rope from knot to animal
    const hy = n === 'bird' ? py + 1.0 : n === 'monkey' ? 0.9 : n === 'snake' ? 0.2 : 0.6;
    setRope(O.ropes[i], [kn[0], kn[1], kn[2]], [px - d[0] * 0.3, hy, pz - d[1] * 0.3]); O.ropes[i].visible = pop > 0.1;
  });
  // sense icons ring
  O.icons.forEach((sp, k) => { const on = inB(t, 'a4') || inB(t, 'a5'); sp.visible = on; if (!on) return; const a = k / 6 * 6.283 + t * 0.2, pop = inB(t, 'a4') ? U.easeBack(sm(0.4 + k * 0.3, 0.8 + k * 0.3, rel(t, 'a4'))) : 1;
    let p = [Math.cos(a) * 1.9, 2.7 + Math.sin(a * 2) * 0.1, Math.sin(a) * 1.2];
    const pulled = inB(t, 'a5') && [0, 1, 5].includes(k); const dim = inB(t, 'a5') && !pulled;
    if (pulled) { const q = U.easeIO(sm(0.8, 2.6, rel(t, 'a5'))), j = [0, 1, 5].indexOf(k); p = [U.lerp(p[0], -1.2 + j * 1.2, q), U.lerp(p[1], 3.6, q), U.lerp(p[2], 0.2, q)]; }
    sp.position.set(p[0], p[1], p[2]); sp.scale.setScalar(0.95 * pop * (pulled ? 1.15 : 1)); sp.material.opacity = dim ? 0.35 : 1; });
  { const on = inB(t, 'a5'), k = on ? U.easeBack(sm(0.3, 1.0, rel(t, 'a5'))) : 0; ss(O.bigPhone, 2.2 * k); O.bigGlow.visible = k > 0.01; O.bigGlow.material.opacity = 0.6 * k; swipeTex(t, O.bigPhone, 1.0); O.bigPhone.rotation.y = Math.sin(t) * 0.15;
    O.beams.forEach((b, j) => { const q = on ? sm(2.4, 3.0, rel(t, 'a5')) : 0; b.visible = q > 0; if (q > 0) setRope(b, [-1.2 + j * 1.2, 3.6, 0.2], [U.lerp(-1.2 + j * 1.2, 0, q), U.lerp(3.6, 4.4, q), U.lerp(0.2, -0.9, q)]); }); }
}
function updBranch(t, s) {
  const Bq = s.br, on = between(t, 'a5', 'c1'); Bq.g.visible = on; if (!on) return;
  const m = Bq.m, r = t - at('a6'), step = 0.95, n = U.clamp(r / step, 0, 6.999), i = Math.floor(n), f = n - i;
  const gx = (j) => -9 + j * 3 + 1.5, gy = 3.6;
  const x0 = gx(i), x1 = gx(Math.min(6, i + 1)), k = U.easeIO(U.clamp((f - 0.45) / 0.55));
  m.position.set(U.lerp(x0, x1, k), gy - 1.25 - Math.sin(k * Math.PI) * 0.5 + (r < 0 ? 0 : 0), -0.55); m.rotation.set(0, 0, Math.sin(k * Math.PI) * -0.3);
  const a = m.userData.arms; a.L.rotation.set(0, 0, -2.9 + (k > 0 && k < 1 ? 0.6 : 0)); a.R.rotation.set(0, 0, 2.9);
  m.userData.tail.rotation.z = Math.sin(t * 3) * 0.3;
  Bq.cards.forEach((c, j) => { const act = j === i; c.scale.setScalar(act ? 1.25 : 1); c.material.opacity = act ? 1 : 0.55; c.rotation.y = Math.sin(t * 2 + j) * 0.2; });
}
function loopPt(u) { const LP = [[-2.6, 5.0], [2.6, 5.0], [2.6, 1.8], [-2.6, 1.8]]; u = ((u % 4) + 4) % 4; const i = Math.floor(u), f = u - i, a = LP[i], b = LP[(i + 1) % 4]; return [U.lerp(a[0], b[0], f), U.lerp(a[1], b[1], f)]; }
function updChain(t, s) {
  const C = s.ch, on = between(t, 'a7', 's1') || between(t, 's8', 'm1'); C.g.visible = on; if (!on) return;
  let u = t * 0.35, focus = -1;
  if (inB(t, 'c2')) { u = U.easeIO(sm(0.2, 1.2, rel(t, 'c2'))) * 0 + 0; focus = 0; }
  if (inB(t, 'c3')) { u = U.easeIO(sm(0.2, 1.4, rel(t, 'c3'))); focus = 1; }
  if (inB(t, 'c4')) { u = 1 + U.easeIO(sm(0.2, 1.4, rel(t, 'c4'))); focus = 2; }
  if (inB(t, 'c5')) { const r = rel(t, 'c5'); u = r < 2.4 ? 2 + U.easeIO(sm(0.2, 1.4, r)) : 3 + (r - 2.4) * 1.6; focus = r < 2.4 ? 3 : -1; }
  if (inB(t, 'c6') || inB(t, 's9')) { u = 1 + Math.min(0.5, (t % 2.4) / 2.4); }
  const p = loopPt(u); C.orb.position.set(p[0], p[1], 0.6); C.orbCore.position.set(p[0], p[1], 0.6);
  const gapOn = inB(t, 'c6') || inB(t, 's9');
  C.links.forEach((l, i) => { const hi = i === focus || (gapOn && (i === 1 || i === 2)); l.material.emissiveIntensity = hi ? 0.55 + 0.25 * Math.sin(t * 6) : 0.12; const sc = 1.25 * (hi ? 1.08 : 1); l.scale.set(sc, sc * 0.62, sc); });
  C.icons.forEach((ic, i) => { ic.rotation.y = (i === 1 ? 0 : Math.sin(t * 1.5 + i) * 0.3); });
  if (inB(t, 'c1')) C.links.forEach((l, i) => { const k = U.easeBack(sm(0.5 + i * 0.4, 0.9 + i * 0.4, rel(t, 'c1'))); l.visible = k > 0.01; const sc = 1.25 * Math.max(0.001, k); l.scale.set(sc, sc * 0.62, sc); }); else C.links.forEach((l) => (l.visible = true));
  C.gap.visible = gapOn; if (gapOn) { C.gap.material.opacity = 0.6 + 0.35 * Math.sin(t * 7); C.gap.scale.setScalar(2.4 + Math.sin(t * 7) * 0.4); }
  C.nums.forEach((n, i) => { n.visible = !gapOn || i === 1 || i === 2; });
}
function updLab(t, s) {
  const Lb = s.lab, on = between(t, 'c7', 's9'); Lb.g.visible = on; if (!on) return;
  const ra = Lb.rat, u = ra.userData; let x = 0, lick = false, face = 1;
  if (inB(t, 's2')) { const r = rel(t, 's2'), k = U.easeIO(sm(0.4, 2.0, r)); x = k * 2.5; lick = r > 2.1; if (k > 0 && k < 1) u.legs.forEach((l, j) => (l.rotation.x = Math.sin(t * 16 + j * Math.PI) * 0.6)); }
  if (inB(t, 's4')) lick = rel(t, 's4') > 1.8;
  if (inB(t, 's5')) { const r = rel(t, 's5'), q = U.clamp((r - 0.8) / 4.8) * 4, f = q % 1, dirn = Math.floor(q) % 2; const k = U.easeIO(U.clamp(f * 1.6)); x = dirn ? 2.5 * (1 - k) : 2.5 * k; face = (dirn ? -1 : 1); lick = x > 2.3; if (r > 0.8 && r < 5.6) u.legs.forEach((l, j) => (l.rotation.x = Math.sin(t * 22 + j * Math.PI) * 0.7)); }
  if (t >= end('s5')) x = 0;
  ra.position.set(x, 0.48, 0.6); ra.rotation.y = face > 0 ? Math.PI / 2 : -Math.PI / 2;
  u.tongue.visible = lick && Math.sin(t * 14) > -0.2; u.head.rotation.x = lick ? Math.sin(t * 10) * 0.15 : 0;
  if (lick && (inB(t, 's2') || inB(t, 's4'))) BUB.push({ o: ra, dy: 1.2, txt: 'ฟิน~', c: '#fff' });
  if (inB(t, 's3') && rel(t, 's3') > 1.8) BUB.push({ o: ra, dy: 1.2, txt: '…', c: '#fff', big: true });
  // dopamine dots
  let dA = 1, dS = 0.16; if (between(t, 's3', 's4')) dA = inB(t, 's3') ? 1 - 0.9 * sm(0.3, 1.6, rel(t, 's3')) : 0.1; if (inB(t, 's5')) { dA = 0.1 + 0.9 * sm(0.3, 0.9, rel(t, 's5')); dS = 0.26; }
  Lb.dopa.material.opacity = dA; Lb.dopa.material.size = dS + Math.sin(t * 8) * 0.02;
  // dropper
  { const on2 = inB(t, 's4'); Lb.drop.visible = on2; Lb.dropBead.visible = false; if (on2) { const r = rel(t, 's4'); Lb.drop.position.set(0.85, 2.2 - 0.3 * sm(0.3, 1.0, r), 0.6); const q = (r - 1.0) % 1.0; if (r > 1.0) { Lb.dropBead.visible = true; Lb.dropBead.position.set(0.85, 1.6 - q * 0.75, 0.6); } } }
  // zap
  { const on2 = inB(t, 's5'); Lb.zap.visible = on2; Lb.zapG.visible = on2; if (on2) { const k = sm(0.2, 0.7, rel(t, 's5')); setRope(Lb.zap, [-2.8, 1.0, -2.6], [-2.8, U.lerp(1.0, 2.2, k), -2.7]); Lb.zapG.position.set(-2.8, 2.3, -2.6); Lb.zapG.material.opacity = 0.5 + 0.5 * Math.sin(t * 20); } }
  // scientist
  const sc = Lb.sci; rest(sc); if (inB(t, 's1')) { sc.userData.arms.R.rotation.set(-1.2 + Math.sin(t * 4) * 0.2, 0, 0.4); }
  if (inB(t, 's3') || inB(t, 's5')) sc.userData.arms.R.rotation.set(-1.4, 0, 0.6);
  // buttons
  Lb.btn.forEach((b, i) => { const hi = inB(t, 's6') && i === 0; const pr = inB(t, 's6') ? U.easeBack(sm(0.2 + i * 0.5, 0.7 + i * 0.5, rel(t, 's6'))) : 0; b.visible = pr > 0.01; b.scale.setScalar(Math.max(0.001, pr)); b.userData.cap.material.emissiveIntensity = hi ? 0.5 + 0.4 * Math.sin(t * 8) : 0.25; b.userData.cap.position.y = 0.65 - (hi ? Math.max(0, Math.sin(t * 5)) * 0.15 : 0); });
  // Phum in the lab (s7-s8)
  const Ph = Lb.phum, pOn = t >= at('s6') + 2; Ph.visible = pOn; Lb.ph.visible = pOn;
  if (pOn) { Ph.position.set(-1.5, 0.4, 2.6); armsHold(Ph); Ph.userData.head.rotation.x = 0.2; phoneAt(Ph, Lb.ph); swipeTex(t, Lb.ph, 1.4);
    if (inB(t, 's7') && rel(t, 's7') > 1.0) BUB.push({ o: Ph, dy: 2.1, txt: '???', c: '#fff', big: true });
    if (inB(t, 's8') && rel(t, 's8') > 1.8) BUB.push({ o: Ph, dy: 2.1, dx: 0.4, txt: 'แล้วคลิปหน้าล่ะ…', c: '#fff' }); }
}
function updHeaven(t, s) {
  const H = s.hv, on = between(t, 's9', 'm8'); H.g.visible = on; if (!on) return;
  const K = H.king, u = K.userData; rest(K); setSit(K, false); K.rotation.set(0, 0, 0); K.scale.setScalar(1);
  if (H.kingHair) H.kingHair.material.color.set('#2a2228');
  // jewel rain + pile
  const jOn = between(t, 'm1', 'm2'); H.jewels.visible = jOn;
  if (jOn) { const r = t - at('m1'), m4 = new T.Matrix4(), sd = H.jewels.userData.seed; for (let i = 0; i < sd.length; i++) { const q = sd[i]; const y = 5.2 - ((q[0] * 5.2 + Math.max(0, r - 1.2) * (2.2 + q[1] * 1.5)) % 5.2); const rr = Math.sqrt(q[1]) * 4.2, a = q[2] * 6.283; m4.makeRotationY(r * 2 + i); m4.setPosition(Math.cos(a) * rr, r < 1.2 ? -5 : y, Math.sin(a) * rr * 0.8 + 0.3); H.jewels.setMatrixAt(i, m4); } H.jewels.instanceMatrix.needsUpdate = true; }
  { const k = t < at('m1') ? 0 : inB(t, 'm1') ? sm(1.4, 4.5, rel(t, 'm1')) : 1; H.pile.visible = k > 0.01; H.pile.scale.set(1, Math.max(0.001, k * 0.5), 1); H.pile.position.set(0, k * 0.25, 0.3); }
  if (t < at('m3')) { // on the earth throne
    setSit(K, true); K.position.set(0, 0.78, 0.25); lapHands(K);
    if (inB(t, 'm1')) { const r = rel(t, 'm1'); if (r > 0.6 && r < 1.4) { const q = Math.abs(Math.sin((r - 0.6) * 9)); u.arms.L.rotation.set(-1.2, 0, 0.3 * q + 0.2); u.arms.R.rotation.set(-1.2, 0, -0.3 * q - 0.2); } }
  } else if (t < at('m4')) { // rise to level 1
    const r = rel(t, 'm3'), k = U.easeIO(sm(0.2, 2.2, r)); K.position.set(0, U.lerp(0.78, 16.1, k), U.lerp(0.25, 0.6, k)); if (r > 3.2) BUB.push({ o: K, dy: 2.1, txt: 'ขึ้นไปอีก!', c: '#fff' });
  } else if (t < at('m6')) { // Tavatimsa
    const r4 = rel(t, 'm4'), k = inB(t, 'm4') ? U.easeIO(sm(0, 1.6, r4)) : 1;
    if (k < 1) { K.position.set(U.lerp(0, 1.1, k), U.lerp(16.1, 32.75, k), U.lerp(0.6, 0.25, k)); }
    else { setSit(K, true); lapHands(K); K.position.set(1.1, 32.75, 0.25); }
    if (inB(t, 'm5')) { const r = rel(t, 'm5'), q = sm(1.0, 2.2, r); if (q > 0) { setSit(K, false); K.position.set(1.1 - 0.5 * q, 32.45, 0.6); K.rotation.y = -0.6 * q; u.arms.R.rotation.set(-1.4 * q, 0, 0.3); u.arms.L.rotation.set(-1.0 * q, 0, -0.2); } if (r > 2.4) BUB.push({ o: K, dy: 2.2, txt: 'ของข้าทั้งหมด!', c: '#ffb3b3' }); }
  } else { // m6 aging + fall, then lying in the garden
    const r = rel(t, 'm6'), age = sm(0.2, 1.2, r), fall = U.easeIO(sm(1.4, 3.4, r));
    if (H.kingHair) H.kingHair.material.color.set(new T.Color('#2a2228').lerp(new T.Color('#e8e8ee'), age));
    u.head.rotation.x = 0.35 * age; K.position.set(0.6, U.lerp(32.45, 0.15, fall), U.lerp(0.6, 2.6, fall)); K.rotation.z = fall * 0.6; K.rotation.x = -1.4 * sm(3.3, 3.8, r);
    if (t >= end('m6')) { K.position.set(0.6, 0.15, 2.6); K.rotation.set(-1.4, 0, 0.6); u.head.rotation.x = 0.35; if (H.kingHair) H.kingHair.material.color.set('#e8e8ee'); }
  }
  // Sakka count
  const sk = H.sakka; setSit(sk, true); lapHands(sk); sk.position.set(-1.1, 0.75, 0.25);
  if (inB(t, 'm4')) { const r = rel(t, 'm4'), n = 1 + Math.floor(35 * sm(1.6, 5.4, r)), blink = (r * 35 / 3.8) % 1; sk.scale.setScalar(r > 1.6 && r < 5.4 ? 0.85 + 0.15 * Math.abs(Math.cos(blink * Math.PI)) : 1); H.count = n; } else { sk.scale.setScalar(1); H.count = 0; }
  if (inB(t, 'm5') && rel(t, 'm5') > 2.4) sk.userData.head.rotation.y = 0.4; else sk.userData.head.rotation.y = 0;
  H.guards.forEach((g, i) => { g.rotation.y = 0; g.userData.head.rotation.y = inB(t, 'm3') ? Math.sin(t + i) * 0.2 : 0; });
  // coins at Jetavana
  H.coins.forEach((c) => { const on2 = inB(t, 'm7'); c.visible = on2; if (!on2) return; const sd = c.userData.seed, r = rel(t, 'm7'), y = 4.4 - ((sd[0] * 4.4 + r * (1.4 + sd[1])) % 4.4); c.position.set((sd[1] - 0.5) * 6, y, -0.2 + (sd[2] - 0.5) * 3); c.rotation.set(Math.PI / 2 + r * 3 * sd[2], r * 2, 0); });
}

function update(t, s, { camera, W, H }) {
  BUB.length = 0;
  const night = t < at('d1') || between(t, 'm8', 'end');
  s.hemi.intensity = night ? 0.42 : 0.62; s.sun.intensity = night ? 0.45 : 0.95;
  s.fog.color.set(night ? '#0c1230' : '#3a5a8a'); s.fog.near = night ? 30 : 40; s.fog.far = night ? 95 : 130;
  updRoom(t, s); updFeed(t, s); updForest(t, s); updBranch(t, s); updChain(t, s); updLab(t, s); updHeaven(t, s);
  VE.camAt(CAM, t, camera, 0.1); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
