/* Part D: camera, backgrounds, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const TY = (k, dy) => k * TER + (dy || 0);
const SHOT = {
  cover: [[0, fr('GAG', 3.0, 2.6, 1.6, 8.6, 0.9, 0)]],
  h1: [[0, fr('KOL', 2.6, 1.3, 0.8, 7, 2.2, 0.6)]],
  h2: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  h3: [[0, fr('LAD', 0, TY(4, 1.8), 0, 13, 2.4, 0)], [2.2, fr('LAD', 0, TY(2, 1), 0, 20, 2.4, 0)]],
  l0: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  l1: [[0, fr('LAD', 0, TY(0, 1.6), 0.4, 10, 3.4, 0)]],
  l2: [[0, fr('LAD', 0, TY(1, 1.6), 0.4, 10, 3.4, 0)]],
  l3: [[0, fr('LAD', 0, TY(2, 1.9), 0, 10.5, 3, 0)]],
  l4: [[0, fr('LAD', 0, TY(3, 2), 0, 11, 2.8, 0)], [2.4, fr('LAD', 0, TY(4, 2), 0, 11, 2.6, 0)]],
  l5: [[0, fr('LAD', 0, TY(1.5, 0.6), 0, 15, 1.6, 0)]],
  l6: [[0, fr('LAD', 0, TY(1, 1.3), 1.4, 8.5, 1.8, 0)]],
  l7: [[0, fr('LAD', 0, TY(1, 2.6), 0, 15, 4, 0)]],
  p1: [[0, fr('GRASS', 0, 1.8, -1, 12, 4.2, 0)]],
  p2: [[0, fr('DUNG', 0, 1.4, -0.4, 10, 4, 0)]],
  p3: [[0, fr('DARK', 0, 2.2, -0.4, 10.5, 0.8, 0)]],
  p4: [[0, fr('WATER', 0, 1.2, -0.5, 10.5, 6, 0)]],
  p5: [[0, fr('FILTH', 0.4, 1.0, -0.4, 8.5, 4, 0)]],
  p6: [[0, fr('DARK', 4, 0.5, -1, 7, 8, -22)]],
  p7: [[0, fr('SWARM', 0, 2.6, -0.5, 9, 1.4, 0)], [3.0, fr('SWARM', 0, 3.4, -1, 17, 3, 0)]],
  p8: [[0, fr('NAIL', 1.4, 5.4, 2.2, 5.2, 3.2, 1.0)]],
  p9: [[0, fr('NAIL', 0, 3.4, -1, 17, 4.4, 0)]],
  p10: [[0, fr('NAIL', 0, 1.2, -1, 9, 9, 0)]],
  n1: [[0, fr('NAGA', 0, 2.8, -2, 12, 1.6, 0)]],
  n2: [[0, fr('NAGA', 0, 2.6, -2, 14, 2.4, 0)]],
  n3: [[0, fr('NAGA', 0.5, 1.8, -1.6, 8, 1.4, 0.5)]],
  n4: [[0, fr('NAGA', -3, 5.2, -3, 15, 0.8, 0)]],
  n5: [[0, fr('NAGA', 0.4, 4.6, -1.5, 12, -0.4, 0)]],
  n6: [[0, fr('NAGA', 0, 4.4, -2, 15, 0.4, 0)]],
  n7: [[0, fr('NAGA', 0, 8.6, -2, 13, 1.6, 0)]],
  d1: [[0, fr('LAD', 0, TY(2, 1.4), 0.6, 15, 1.8, 0)]],
  d2: [[0, fr('LAD', 0, TY(1.6, 0.6), 0, 20, 1.4, 0)]],
  d3: [[0, fr('KOL', 0, 1.8, 0, 11, 3, 0)]],
  d4: [[0, fr('KOL', 1.6, 1.0, 0.8, 7, 2.2, 0.6)]],
  d5: [[0, fr('KOL', 1.0, 1.6, 0.6, 9, 2.4, 0)]],
  d6: [[0, fr('KOL', -0.4, 1.8, -0.2, 9.5, 2.4, 0)]],
  d7: [[0, fr('KOL', 0.8, 2.0, 0.4, 11, 2.6, 0)]],
  d8: [[0, fr('KOL', 1.5, 1.2, 0.8, 6.2, 1.5, 0)]],
  u1: [[0, fr('OCEAN', 0, 1.5, -4, 16, 7, 0)]],
  u2: [[0, fr('OCEAN', 0, 1.0, -2, 10, 3.5, 0)]],
  u3: [[0, fr('OCEAN', 0, 1.2, -3, 13, 5, 0)]],
  u4: [[0, fr('OCEAN', 0, -1.6, -2, 9, 0.5, 0)]],
  u5: [[0, fr('OCEAN', 0, 6, -8, 14, 1, 0)]],
  g1: [[0, fr('PAL', 0, 1.8, -1, 12, 3, 0)]],
  g2: [[0, fr('PAL', 1.2, 1.8, -0.4, 10.5, 2.6, 0)]],
  g3: [[0, fr('PAL', 1, 2.4, -1, 14, 3, 0)]],
  g4: [[0, fr('GAG', 2.6, 1.0, 3.4, 7, 2.4, 0)]],
  g5: [[0, fr('GAG', 1.2, 1.6, 1.2, 12, 3.4, 0)]],
  g6: [[0, fr('GAG', 2.6, 1.3, 3.0, 7.5, 2, 0)]],
  g7: [[0, fr('GAG', 3.6, 4.4, -1.6, 14, 0.6, 0)]],
  g8: [[0, fr('GAG', 0.4, 1.8, -0.6, 9, 2, 0)]],
  r1: [[0, fr('GAG', 0.9, 1.9, -0.2, 7, 1.6, 0)]],
  r2: [[0, fr('KOL', -0.4, 1.4, -0.2, 8, 2, 0)]],
  r3: [[0, fr('KOL', 0.2, 1.4, 0.4, 7.5, 2, 0)]],
  r4: [[0, fr('KOL', 0, 4, -1, 13, 4, 0)]],
  r5: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  m1: [[0, fr('TEMPLE', -1, 2.2, -0.6, 11, 2.6, 0)]],
  m2: [[0, fr('HUT', 0, 1.6, 0.8, 11, 2.6, 0)]],
  m3: [[0, fr('HUT', 0, 1.8, -0.5, 12, 3, 0)]],
  m4: [[0, fr('HUT', -3, 1.6, 0.6, 11, 2.4, 0)]],
  m5: [[0, fr('TEMPLE', 1.0, 1.5, 0.4, 6.5, 1.4, 0.8)]],
  m6: [[0, fr('TEMPLE', 0, 3, -1, 15, 3, 0)]],
  recap: [[0, fr('LAD', 0, 17.2, 0, 40, 0.6, 0)]],
  ask: [[0, fr('GAG', 2.4, 1.8, 3.0, 9, 2, 0)]],
};
const CUT = new Set(['h1', 'h2', 'n1', 'd1', 'd3', 'u1', 'g1', 'g4', 'r2', 'r5', 'm1', 'm2', 'm5', 'recap', 'ask']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.92);
      const cut = j === 0 ? CUT.has(id) : !!sg[2];
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
const BG = {
  sky: ['#141a3e', '#3a3f8f'], day: ['#22386b', '#6f9fd0'], dusk: ['#1c1530', '#7a4a68'], deep: ['#04121e', '#0c3a52'], dark: ['#0a0a12', '#1c1a28'],
  ocean: ['#1a3a70', '#6fb0e0'], temple: ['#1a0d0a', '#4a1e14'], past: ['#2a1d12', '#7a5a34'], night: ['#070b1e', '#16224a'],
};
function bgKey(t) {
  const id = beatAt(t);
  if (['h2', 'h3', 'l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'd1', 'd2', 'r5', 'recap'].includes(id)) return 'sky';
  if (id === 'p3') return 'dark';
  if (id.startsWith('n')) return 'deep';
  if (id.startsWith('u')) return 'ocean';
  if (['cover', 'g4', 'g5', 'g6', 'g7', 'g8', 'r1', 'ask'].includes(id)) return 'dusk';
  if (['m1', 'm5', 'm6'].includes(id)) return 'temple';
  if (id === 'm2' || id === 'm4') return 'past';
  if (id === 'm3') return 'night';
  return 'day';
}
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const LT = { sky: [0.8, 0.8, '#e8e8ff'], day: [0.72, 0.85, '#fff4e0'], dusk: [0.6, 0.65, '#ffc8a0'], deep: [0.55, 0.5, '#9fe0ff'], dark: [0.6, 0.55, '#e0c8ff'], ocean: [0.8, 0.9, '#ffffff'], temple: [0.7, 0.7, '#ffe0c0'], past: [0.7, 0.75, '#ffd9a0'], night: [0.45, 0.45, '#a8b8ff'] };
const FOG = { sky: [60, 140], day: [40, 120], dusk: [30, 100], deep: [8, 40], dark: [14, 50], ocean: [30, 110], temple: [40, 120], past: [30, 100], night: [20, 80] };

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), bk = bgKey(t);
  { const q = LT[bk]; s.hemi.intensity = q[0]; s.sun.intensity = q[1]; s.sun.color.set(q[2]); s.fog.color.set(bgAt(t)[1]); s.fog.near = FOG[bk][0]; s.fog.far = FOG[bk][1]; }
  const ladOn = bk === 'sky'; vis(s.lad.g, ladOn);

  /* ---------- ladder ---------- */
  if (ladOn) {
    const L1 = s.lad;
    L1.fx.coals.forEach((c, i) => { c.scale.setScalar(0.85 + 0.25 * Math.sin(t * 3 + i)); });
    L1.fx.hellGlow.material.opacity = 0.55 + 0.25 * Math.sin(t * 2.4);
    L1.fx.flies.forEach((f, i) => { const a = t * (2 + (i % 3)) + i; f.position.set(Math.cos(a) * (1 + (i % 4) * 0.4), 0.7 + Math.sin(a * 1.7) * 0.4 + (i % 3) * 0.2, Math.sin(a) * (1 + (i % 4) * 0.4)); });
    graze(L1.cow, t); L1.dog.userData.tail.rotation.z = Math.sin(t * 9) * 0.4;
    const hiOf = () => { const g = GZ[id]; if (!g) return id === 'l5' ? 1 : -1; if (id === 'l4') return rel(t, 'l4') < 2.4 ? 3 : 4; return g.hi != null ? g.hi : -1; };
    const hi = (bk === 'sky' && ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7'].includes(id)) ? hiOf() : -1;
    L1.ter.forEach((tr, k) => { tr.ring.material.opacity = k === hi ? 0.55 + 0.35 * Math.sin(t * 4) : 0; });
    /* l6: cow walks horizontally vs human standing upright */
    const l6 = inB(t, 'l6'); vis(L1.walker, l6); vis(L1.man, l6); vis(L1.barH, l6 && rel(t, 'l6') > 1.6); vis(L1.barV, l6 && rel(t, 'l6') > 2.4);
    if (l6) { const r = rel(t, 'l6'), x = U.lerp(-2.2, 0.8, sm(0, 2.2, r)); L1.walker.position.set(x, 0, 2.2); L1.walker.rotation.y = Math.PI / 2; trot(L1.walker, t, r < 2.2 ? 1 : 0); L1.man.position.set(1.9, 0, 2.6); face(L1.man, -0.3, 1); rest(L1.man);
      L1.barH.position.set(x, 1.55, 2.2); L1.barV.position.set(1.9, 1.0, 3.2); }
    /* orbs: h2 (animal up / human down), d1 (feaster drops to animals), d2 (three drops), r5 (mixed), recap */
    L1.orbs.forEach((o) => (o.visible = false));
    const fly = (o, k0, k1, k) => { o.visible = k > 0 && k < 1; o.position.set(o.userData.x || 0, U.lerp(TY(k0, 1.6), TY(k1, 1.6), U.easeIO(k)), 2.4); };
    if (inB(t, 'h2')) { const r = rel(t, 'h2'); L1.orbs[0].userData.x = -1.4; fly(L1.orbs[0], 1, 4, sm(0.6, 3.2, r)); L1.orbs[1].userData.x = 1.4; fly(L1.orbs[1], 3, 1, sm(1.2, 3.8, r)); }
    if (inB(t, 'd1')) { const r = rel(t, 'd1'); vis(L1.man, false); L1.orbs[2].userData.x = 0; fly(L1.orbs[2], 3, 1, sm(1.4, 3.4, r)); }
    if (inB(t, 'd2')) { const r = rel(t, 'd2'); [0, 1, 2].forEach((k, i) => { const o = L1.orbs[2 + i]; o.userData.x = -2 + i * 2; fly(o, 3, k, sm(0.8 + i * 0.4, 3.0 + i * 0.4, r)); }); }
    if (inB(t, 'r5') || inB(t, 'recap')) { const r = (t - at(id)) % 4.2; L1.orbs[0].userData.x = -1.6; fly(L1.orbs[0], 1, 4, sm(0.2, 3.2, r)); L1.orbs[1].userData.x = 1.6; fly(L1.orbs[1], 3, 1, sm(0.8, 3.8, r)); }
    /* d1 feaster on the human terrace */
    vis(L1.rest, !inB(t, 'd1'));
  }

  /* ---------- valley ---------- */
  s.grass.forEach((a, i) => { graze(a, t + i); if (i === 0 && inB(t, 'p1')) { const r = rel(t, 'p1'); setP(a, 'GRASS', U.lerp(-4.6, -2.6, sm(0, 2.6, r)), 0, -0.8); a.rotation.y = Math.PI / 2; trot(a, t, r < 2.6 ? 1 : 0); a.userData.head.rotation.x = r < 2.6 ? 0 : 0.55 + Math.sin(t * 2) * 0.12; } });
  { const D = s.dung; D.flies.forEach((f, i) => { const a = t * (2.2 + (i % 3)) + i; setP(f, 'DUNG', Math.cos(a) * (0.7 + (i % 3) * 0.3), 1.2 + Math.sin(a * 1.6) * 0.3, -0.6 + Math.sin(a) * 0.6); });
    const k = inB(t, 'p2') ? U.easeOut(sm(0.4, 3.2, rel(t, 'p2'))) : t > end('p2') ? 1 : 0;
    D.runners.forEach((rn, i) => { const r = U.lerp(6.5, 1.9 + (i % 2) * 0.3, k), a = rn.ang; setP(rn.a, 'DUNG', Math.sin(a) * r, 0, -0.6 + Math.cos(a) * r * 0.8); face(rn.a, -Math.sin(a), -Math.cos(a)); if (rn.a.userData.legs) trot(rn.a, t + i, k < 0.99 ? 1 : 0); else rn.a.position.y = Math.abs(Math.sin(t * 9 + i)) * 0.12 * (k < 0.99 ? 1 : 0.2); }); }
  { s.dark.worms.forEach((w, i) => wiggle(w, t, i)); s.dark.moths.forEach((m, i) => { const a = t * 1.3 + i * 1.1; setP(m, 'DARK', Math.cos(a) * 3.4, 4.8 + Math.sin(a * 2) * 0.5, 0.6 + Math.sin(a) * 0.8); m.userData.w.forEach((w, j) => (w.rotation.y = (j ? -1 : 1) * Math.sin(t * 20 + i) * 0.6)); m.rotation.y = -a; }); }
  { s.water.fish.forEach((f, i) => { const a = t * (0.7 + i * 0.12) + i * 1.3, r = 2.2 + (i % 3) * 1.1; setP(f, 'WATER', Math.cos(a) * r, -0.05 + 0.12 * (i % 2), -1 + Math.sin(a) * r * 0.7); f.rotation.y = -a; f.userData.tail.rotation.y = Math.sin(t * 10 + i) * 0.4; });
    s.water.turtle.userData.fl.forEach((f, i) => (f.rotation.y = Math.sin(t * 3 + i) * 0.3)); }
  { s.filth.mag.forEach((m, i) => { const a = i * 2.4; setP(m, 'FILTH', Math.cos(a) * (0.6 + (i % 4) * 0.5) + 1.2 * (i % 2 ? 0 : 1) - 0.3, 0.12, -0.4 + Math.sin(a) * (0.5 + (i % 3) * 0.4)); m.rotation.y = a + Math.sin(t * 4 + i) * 0.4; m.scale.z = 2.2 + Math.sin(t * 6 + i) * 0.5; });
    s.filth.flies.forEach((f, i) => { const a = t * (2.4 + (i % 3)) + i; setP(f, 'FILTH', Math.cos(a) * (0.8 + (i % 3) * 0.5), 1.1 + Math.sin(a * 1.7) * 0.3, -0.6 + Math.sin(a) * 0.8); }); }
  { const on = between(t, 'p6', 'p7'), n = inB(t, 'p7') ? Math.round(U.easeOut(sm(0.2, 4.0, rel(t, 'p7'))) * 2600) : 0; s.swarm.pts.geometry.setDrawRange(0, n); vis(s.swarm.pts, n > 0); void on;
    if (inB(t, 'p7')) { const pos = s.swarm.pts.geometry.attributes.position, b = s.swarm.base; for (let i = 0; i < n; i++) { pos.array[i * 3] = b[i * 3] + Math.sin(t * 3 + i) * 0.15; pos.array[i * 3 + 1] = b[i * 3 + 1] + Math.cos(t * 2.6 + i * 0.7) * 0.15; } pos.needsUpdate = true; }
    s.swarm.man.userData.head.rotation.y = Math.sin(t * 2) * 0.5; }
  { const N = s.nail, onN = between(t, 'p8', 'p10'); const r8 = inB(t, 'p8') ? rel(t, 'p8') : 9;
    setP(N.f, 'NAIL', 1.5, 5.0 + (inB(t, 'p8') ? (1 - U.easeOut(sm(0, 1.4, r8))) * 2.5 : 0), 2.2); N.f.visible = t < end('p10') + 0.6;
    N.f.userData.dust.getWorldPosition(N.glow.position); N.glow.visible = between(t, 'p9', 'p9'); N.glow.material.opacity = 0.6 + 0.3 * Math.sin(t * 5);
    N.earth.children[0].material.emissive = N.earth.children[0].material.emissive || new T.Color(); N.earth.children[0].material.emissive.set(P.coral); N.earth.children[0].material.emissiveIntensity = inB(t, 'p9') ? 0.25 + 0.15 * Math.sin(t * 3) : 0; void onN; }

  /* ---------- naga world ---------- */
  { const G = s.naga, on = bk === 'deep'; [G.big, G.small, G.human, G.giver, G.gar, G.path, G.labS, G.labB, G.spark].forEach((o) => vis(o, on)); G.bubbles.forEach((b) => vis(b, on));
    if (on) {
      G.bubbles.forEach((b) => { const k = (t * 0.12 + b.userData.ph) % 1; setP(b, 'NAGA', b.userData.x + Math.sin(t + b.userData.ph * 9) * 0.2, k * 9, b.userData.z); });
      const cx = ST.NAGA[0];
      /* big naga: swimming loop (n1,n2,n5,n7) / coiled (n3,n4,n6) */
      const coiled = inB(t, 'n3') || inB(t, 'n4') || inB(t, 'n6');
      if (coiled) setNaga(G.big, (u) => { const a = u * 13 + 0.3, r = 0.6 + u * 2.2; return [cx + 0.6 + Math.cos(a) * r, 0.45 + (1 - u) * 1.6 + Math.sin(t * 1.5) * 0.05 * (1 - u), -2 + Math.sin(a) * r * 0.8]; });
      else setNaga(G.big, (u) => { const ph = t * 0.9 - u * 3.2; return [cx + Math.cos(ph) * 4.2, 2.6 + Math.sin(ph * 2) * 0.8 + Math.sin(u * 14 - t * 4) * 0.25, -2 + Math.sin(ph) * 2.6]; });
      /* n1: transformation into a human */
      const tr = inB(t, 'n1') ? sm(2.4, 3.4, rel(t, 'n1')) : 0;
      G.big.scale.setScalar(Math.max(0.001, 1 - tr)); if (tr > 0.99) G.big.visible = false;
      G.human.visible = tr > 0.01; G.human.scale.setScalar(1.1 * U.easeBack(tr)); if (tr > 0) { const hp = G.big.userData.segs[0].position; G.human.position.set(cx + 0.5, 0.2, -1.2); face(G.human, 0, 1); }
      G.spark.visible = tr > 0 && tr < 1; G.spark.position.set(cx + 0.5, 1.4, -1.2); G.spark.material.opacity = Math.sin(tr * Math.PI);
      if (inB(t, 'n3')) { G.big.userData.hd.rotation.x = 0.35; }
      /* small naga (egg-born) */
      const sOn = between(t, 'n2', 'n6'); vis(G.small, sOn);
      let grab = inB(t, 'n6') ? sm(2.6, 4.6, rel(t, 'n6')) : 0;
      if (sOn) setNaga(G.small, (u) => { const ph = t * 1.3 - u * 3; const base = [cx - 3 + Math.cos(ph) * 1.6, 1.6 + Math.sin(ph * 2) * 0.4, 0.2 + Math.sin(ph) * 1.2]; if (grab > 0) { const gp = G.gar.position; return [U.lerp(base[0], gp.x + Math.sin(u * 8) * 0.3, grab), U.lerp(base[1], gp.y - 1.1 - u * 1.8, grab), U.lerp(base[2], gp.z, grab)]; } return base; });
      /* garuda */
      const gOn = between(t, 'n5', 'n6'); vis(G.gar, gOn); flap(G.gar, t, 7);
      if (gOn) { let x = cx + 2.5, y = 7.5, z = -1; if (inB(t, 'n5')) { const k = U.easeIO(sm(0.2, 3.2, rel(t, 'n5'))); x = U.lerp(cx + 8, cx + 0.6, k); y = U.lerp(11, 5.6, k); z = U.lerp(-6, -0.5, k); }
        if (inB(t, 'n6')) { const r = rel(t, 'n6'), dn = sm(1.0, 2.6, r), up = sm(2.8, 4.8, r); x = U.lerp(cx + 0.6, cx - 2.6, dn); y = U.lerp(5.6, 3.6, dn) + up * 7; z = U.lerp(-0.5, 0.4, dn); }
        G.gar.position.set(x, y, z); G.gar.rotation.set(0.25, -0.9, 0); }
      vis(G.labS, inB(t, 'n6') && rel(t, 'n6') < 3.2); vis(G.labB, inB(t, 'n6')); if (G.labS.visible) { const p = G.small.userData.segs[0].position; G.labS.position.set(p.x, p.y + 1.1, p.z); } { const p = G.big.userData.hd.position; G.labB.position.set(p.x, p.y + 1.4, p.z); }
      /* n4 giver on the shelf + dotted path down to the naga realm */
      vis(G.giver, inB(t, 'n4')); G.path.geometry.setDrawRange(0, inB(t, 'n4') ? Math.round(sm(1.2, 3.4, rel(t, 'n4')) * 41) : 0); vis(G.path, inB(t, 'n4'));
      if (inB(t, 'n4')) { face(G.giver, 0.3, 1); anjali(G.giver, 0.6); if (rel(t, 'n4') > 1.0 && rel(t, 'n4') < 3.6) BUB.push({ o: G.giver, dy: 2.0, txt: 'ขอไปเกิดเป็นนาค!', c: '#fff' }); }
    }
  }

  /* ---------- Koliya ---------- */
  { const K = s.kol, on = ['h1', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'r2', 'r3', 'r4'].includes(id) || (id === 'cover' ? false : false);
    [K.sen, K.pun, K.vill, K.ghost, K.red, K.halo, K.senMonk].forEach((o) => vis(o, false)); K.food.forEach((f) => vis(f, false)); K.tears.forEach((d) => vis(d, false));
    if (on) {
      const monkNow = inB(t, 'r3') ? rel(t, 'r3') > 1.0 : inB(t, 'r4');
      vis(K.sen, !monkNow); vis(K.senMonk, monkNow);
      const crawl = inB(t, 'h1') || inB(t, 'd3') || (inB(t, 'd4') && rel(t, 'd4') > 2.4);
      K.sen.rotation.set(0, 0, 0); rest(K.sen); setSit(K.sen, false); K.sen.userData.shins.visible = false;
      if (crawl) { const r = t - at(id); const x = inB(t, 'h1') ? U.lerp(1.4, 2.8, sm(0, 3.6, r)) : 1.6; setP(K.sen, 'KOL', x, 0.0, 0.8); K.sen.rotation.y = Math.PI / 2 + 0.35; crawlPose(K.sen, t, 1); if (inB(t, 'h1') && r > 3.6) K.sen.userData.head.rotation.x = -0.4 + Math.abs(Math.sin(t * 6)) * 0.4; }
      else if (inB(t, 'd4')) { /* curled up like a dog */ setP(K.sen, 'KOL', 1.6, 0.42, 0.8); K.sen.rotation.order = 'XYZ'; K.sen.rotation.set(0, 0.4, 1.45); K.sen.userData.arms.L.rotation.set(-1.2, 0, 0.4); K.sen.userData.arms.R.rotation.set(-1.2, 0, -0.4); }
      else if (inB(t, 'r2')) { setP(K.sen, 'KOL', 0.2, 0, 0.6); setSit(K.sen, true); anjali(K.sen); face(K.sen, -0.6, -1); }
      else { setP(K.sen, 'KOL', 1.6, 0, 0.8); setSit(K.sen, true); face(K.sen, -0.8, -0.4); K.sen.userData.head.rotation.x = inB(t, 'd8') ? 0.35 : 0; if (inB(t, 'd8') || (inB(t, 'd7') && rel(t, 'd7') > 3.6)) { K.sen.userData.arms.L.rotation.set(-2.2, 0, 0.3); K.sen.userData.arms.R.rotation.set(-2.2, 0, -0.3); } }
      /* food thrown on the ground in d4 */
      if (inB(t, 'd4')) { const r = rel(t, 'd4'); vis(K.vill, true); setP(K.vill, 'KOL', 3.6, 0, 1.6); face(K.vill, -1, -0.3); K.vill.userData.arms.R.rotation.set(-1.4 + sm(1.2, 1.6, r) * 0.9, 0, 0.2);
        K.food.forEach((f, i) => { const k = sm(1.4 + i * 0.05, 2.2 + i * 0.05, r); vis(f, k > 0); setP(f, 'KOL', U.lerp(3.2, 2.0 + i * 0.12, k), 1.0 * (1 - k) + Math.sin(k * Math.PI) * 0.6 + 0.08, U.lerp(1.6, 1.0 + (i % 2) * 0.2, k)); }); }
      /* Punna */
      const pOn = ['d5', 'd6', 'd7', 'd8'].includes(id); vis(K.pun, pOn);
      if (pOn) { setP(K.pun, 'KOL', 2.8, 0, -0.2); setSit(K.pun, true); face(K.pun, -1, -0.5); if (inB(t, 'd5') && rel(t, 'd5') > 1.6) { K.pun.userData.arms.R.rotation.set(-1.3, 0, 0.5); BUB.push({ o: K.pun, dy: 1.9, txt: 'เขาจะไปเกิดที่ไหน?', c: '#fff' }); } }
      if (inB(t, 'd6')) { const r = rel(t, 'd6'); if (r > 0.4 && r < 2.6) BUB.push({ o: K.bud, dy: 2.4, txt: 'พอเถิด อย่าถามเลย', c: '#fff' }); if (r > 2.8) BUB.push({ o: K.pun, dy: 1.9, txt: 'ขอเถิดพระองค์…', c: '#fff' }); }
      if (inB(t, 'd7')) { const r = rel(t, 'd7'), g = sm(0.6, 1.8, r); vis(K.ghost, g > 0); setP(K.ghost, 'KOL', 3.4, 0, 2.0); K.ghost.rotation.y = -0.8; K.ghost.traverse((o) => { if (o.isMesh) o.material.opacity = 0.45 * g; });
        const rd = sm(3.0, 4.0, r); vis(K.red, rd > 0); setP(K.red, 'KOL', 1.6, 0.3, 0.8); K.red.material.opacity = 0.6 * rd; }
      if (inB(t, 'd8')) { const r = rel(t, 'd8'); K.sen.getWorldPosition(s.anchorV); K.tears.forEach((d, i) => { const k = ((r * 0.8 + i * 0.17) % 1); vis(d, true); d.position.set(s.anchorV.x + (i % 2 ? 0.16 : -0.16), s.anchorV.y + 1.3 - k * 1.0, s.anchorV.z + 0.35); }); BUB.push({ o: K.sen, dy: 1.8, txt: 'ฮือ…', c: '#fff' }); }
      if (inB(t, 'r2') && rel(t, 'r2') > 0.8 && rel(t, 'r2') < 3.6) BUB.push({ o: K.sen, dy: 1.8, txt: 'ขอบวช ยอมรอ 4 ปี', c: '#fff' });
      if (monkNow) { setP(K.senMonk, 'KOL', 0.4, 0, 0.6); setSit(K.senMonk, true); lapHands(K.senMonk); face(K.senMonk, 0, 1); K.senMonk.userData.eyes.forEach((e) => (e.scale.y = 0.2));
        vis(K.halo, true); setP(K.halo, 'KOL', 0.4, 1.3, 0.4); K.halo.material.opacity = 0.5 + 0.3 * Math.sin(t * 3); K.halo.scale.setScalar(4 + (inB(t, 'r4') ? 2 * sm(0, 3, rel(t, 'r4')) : 0)); }
    }
  }

  /* ---------- ocean ---------- */
  { const O = s.ocean, on = bk === 'ocean'; [O.yoke, O.turtle].forEach((o) => vis(o, on)); O.fish.forEach((f) => vis(f, on && inB(t, 'u4'))); O.arrows.forEach((a) => vis(a, on && (inB(t, 'u1') || inB(t, 'u3'))));
    if (on) {
      const pos = O.sea.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.5 + t * 1.5) * 0.12 + Math.cos(y * 0.4 + t) * 0.1); } pos.needsUpdate = true;
      const yx = Math.sin(t * 0.35) * 1.4, yz = -3 + Math.cos(t * 0.27) * 0.8; setP(O.yoke, 'OCEAN', yx, 0.72 + Math.sin(t * 1.5) * 0.06, yz); O.yoke.rotation.y = Math.sin(t * 0.3) * 0.6;
      O.arrows.forEach((a, i) => { const k = (t * 0.25 + i / 3) % 1; setP(a, 'OCEAN', -7 + k * 14, 1.6 + i * 0.5, -5 + i * 1.6); a.rotation.y = 0; a.children.forEach((c) => (c.material.opacity = Math.sin(k * Math.PI) * 0.8)); });
      let ty = -2.2; const tx = yx + 1.3, tz = yz + 0.9;
      if (inB(t, 'u2')) { const r = rel(t, 'u2'); ty = U.lerp(-2.2, 0.7, sm(0.8, 2.4, r)) - sm(3.6, 4.8, r) * 2.9; }
      if (inB(t, 'u3')) { const r = rel(t, 'u3'); ty = U.lerp(-2.2, 0.7, sm(1.4, 2.8, r)) - sm(4.0, 5.4, r) * 2.9; }
      if (inB(t, 'u1')) ty = -2.2;
      setP(O.turtle, 'OCEAN', tx, ty, tz); O.turtle.rotation.set(-0.5 * (ty < 0.5 ? 1 : 0), -0.4, 0); O.turtle.userData.fl.forEach((f, i) => (f.rotation.y = Math.sin(t * 3 + i) * 0.4));
      if (inB(t, 'u4')) { const r = rel(t, 'u4'); const chase = (f, i, x0) => { setP(f, 'OCEAN', x0 + r * 1.1, -1.6 + Math.sin(t * 2 + i) * 0.15, -2 + i * 0.05); f.rotation.y = Math.PI / 2; f.userData.tail.rotation.y = Math.sin(t * 12 + i) * 0.5; };
        chase(O.fish[0], 0, -1.5); chase(O.fish[1], 1, -3.6); chase(O.fish[2], 2, -6.6);
        const eat1 = sm(2.2, 2.6, r); O.fish[0].scale.setScalar(Math.max(0.001, 0.6 * (1 - eat1))); O.fish[0].visible = eat1 < 1; }
    }
  }

  /* ---------- Palileyyaka ---------- */
  { const Pp = s.pal, on = ['g1', 'g2', 'g3'].includes(id); [Pp.bud, Pp.ele, Pp.pot, Pp.orb].forEach((o) => vis(o, on)); Pp.drops.forEach((d) => vis(d, false));
    if (on) {
      const leave = inB(t, 'g3') ? sm(0.4, 2.2, rel(t, 'g3')) : 0; Pp.bud.visible = leave < 0.99; Pp.bud.scale.setScalar(1.25 * Math.max(0.001, 1 - leave));
      const ex = inB(t, 'g1') ? 9 : inB(t, 'g2') ? U.lerp(6, 2.6, U.easeIO(sm(0, 2.0, rel(t, 'g2')))) : 2.6; setP(Pp.ele, 'PAL', ex, 0, 0.6); Pp.ele.rotation.y = -Math.PI / 2 - 0.25; trot(Pp.ele, t, inB(t, 'g2') && rel(t, 'g2') < 2 ? 0.6 : 0);
      const tr = Pp.ele.userData.trunk, lift = inB(t, 'g2') ? sm(2.2, 3.2, rel(t, 'g2')) * (1 - sm(4.8, 5.6, rel(t, 'g2'))) : 0;
      tr.forEach((p, i) => (p.rotation.x = -lift * (0.35 + i * 0.05) + Math.sin(t * 2 + i) * 0.05));
      tr[tr.length - 1].getWorldPosition(s.anchorV); Pp.pot.visible = on && t < at('g3'); Pp.pot.position.set(s.anchorV.x, s.anchorV.y - 0.25, s.anchorV.z);
      if (inB(t, 'g2') && rel(t, 'g2') > 3.4) Pp.drops.forEach((d, i) => { const k = ((rel(t, 'g2') * 1.4 + i / 8) % 1); vis(d, true); d.position.set(U.lerp(s.anchorV.x, ST.PAL[0] + 0.7, k), s.anchorV.y - 0.3 - k * 0.6, U.lerp(s.anchorV.z, ST.PAL[2] - 0.5, k)); });
      Pp.grass.forEach((g, i) => { const cut = inB(t, 'g2') ? sm(0.8 + i * 0.12, 1.2 + i * 0.12, rel(t, 'g2')) : t > end('g2') ? 1 : 0; g.scale.y = Math.max(0.05, 1 - cut); });
      /* g3: elephant lies down, an orb rises */
      const lie = inB(t, 'g3') ? sm(2.4, 3.6, rel(t, 'g3')) : 0; Pp.ele.rotation.z = lie * 0.25; Pp.ele.position.y = -lie * 0.5; Pp.ele.userData.head.rotation.x = lie * 0.4;
      const up = inB(t, 'g3') ? sm(3.6, 5.6, rel(t, 'g3')) : 0; Pp.orb.visible = up > 0; setP(Pp.orb, 'PAL', 2.4, 1.8 + up * 5.5, 0.6);
    }
  }

  /* ---------- Gaggara lake ---------- */
  { const G = s.gag, on = ['cover', 'g4', 'g5', 'g6', 'g7', 'g8', 'r1', 'ask'].includes(id); [G.bud, G.frog, G.cow, G.dv, G.orb, G.flash, G.beam, G.sky, G.labFrog].forEach((o) => vis(o, on)); G.aud.forEach((a) => vis(a, on)); G.rings.forEach((r) => vis(r, false));
    if (on) {
      const fx = 2.6, fz = 3.4; setP(G.frog, 'GAG', fx, 0.08 + Math.abs(Math.sin(t * 2.2)) * 0.04, fz); if (id === 'cover' || id === 'ask') face(G.frog, -0.55, 0.85); else face(G.frog, -1, 0.35); G.frog.scale.setScalar(id === 'cover' || id === 'ask' ? 1.6 : 1.1);
      if (inB(t, 'g5')) { const r = rel(t, 'g5'); setP(G.frog, 'GAG', U.lerp(fx + 0.6, fx, sm(0.5, 1.4, r)), 0.08 + Math.sin(sm(0.5, 1.4, r) * Math.PI) * 0.45, U.lerp(fz + 0.6, fz, sm(0.5, 1.4, r))); }
      G.labFrog.visible = false;
      const preach = ['g4', 'g5', 'g6', 'cover', 'ask'].includes(id);
      if (preach) G.rings.forEach((rg, i) => { const k = (t * 0.45 + i / 3) % 1; vis(rg, true); setP(rg, 'GAG', 0, 0.6, -2.2); rg.scale.setScalar(1 + k * 6.5); rg.material.opacity = 0.5 * (1 - k); });
      /* cowherd leaning on the staff */
      const cOn = ['g5', 'g6'].includes(id); vis(G.cow, cOn);
      if (cOn) { setP(G.cow, 'GAG', fx + 1.2, 0, fz - 0.6); face(G.cow, -1, -0.8); const lean = inB(t, 'g6') ? sm(1.2, 2.6, rel(t, 'g6')) : 0; G.cow.userData.arms.R.rotation.set(-0.35 - lean * 0.25, 0, 0.5 + lean * 0.35); G.cow.rotation.z = lean * 0.12; }
      /* g6: flash, frog becomes light */
      const fl = inB(t, 'g6') ? sm(2.6, 3.0, rel(t, 'g6')) * (1 - sm(3.6, 4.6, rel(t, 'g6'))) : 0; G.flash.visible = fl > 0; setP(G.flash, 'GAG', fx, 0.5, fz); G.flash.material.opacity = fl; G.flash.scale.setScalar(2 + fl * 3);
      const gone = (inB(t, 'g6') && rel(t, 'g6') > 3.0) || ['g7', 'g8', 'r1'].includes(id); G.frog.visible = !gone;
      const orbK = inB(t, 'g6') ? sm(3.0, 3.6, rel(t, 'g6')) * 0.12 : inB(t, 'g7') ? 0.12 + 0.88 * U.easeIO(sm(0.2, 2.6, rel(t, 'g7'))) : 0; G.orb.visible = orbK > 0 && orbK < 1;
      if (G.orb.visible) { const sk = G.sky.position; G.orb.position.set(U.lerp(ST.GAG[0] + fx, sk.x, orbK), U.lerp(0.6, sk.y + 0.8, orbK), U.lerp(ST.GAG[2] + fz, sk.z, orbK)); }
      /* light beam (cover + g7) */
      const bOn = id === 'cover' || id === 'ask' || (inB(t, 'g7') && rel(t, 'g7') < 3.2); vis(G.beam, bOn);
      if (bOn) { const a = new T.Vector3(ST.GAG[0] + fx, 0.4, ST.GAG[2] + fz), b = G.sky.position.clone(); b.y += 0.6; const mid = a.clone().add(b).multiplyScalar(0.5); G.beam.position.copy(mid); G.beam.scale.set(1, a.distanceTo(b), 1); G.beam.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), b.clone().sub(a).normalize()); G.beam.material.opacity = 0.22 + 0.1 * Math.sin(t * 3); }
      /* deva: appears at the palace (g7), descends & bows (g8, r1) */
      const dOn = (inB(t, 'g7') && rel(t, 'g7') > 2.6) || inB(t, 'g8') || inB(t, 'r1'); vis(G.dv, dOn);
      if (dOn) { let p; if (inB(t, 'g7')) { const k = U.easeIO(sm(2.8, dur('g7'), rel(t, 'g7'))); const sk = G.sky.position; p = [U.lerp(sk.x - ST.GAG[0], 1.4, k), U.lerp(sk.y + 0.4, 0, k), U.lerp(sk.z - ST.GAG[2], -0.4, k)]; } else p = [1.4, 0, -0.4];
        setP(G.dv, 'GAG', p[0], p[1], p[2]); face(G.dv, -1, -1.2); G.dv.scale.setScalar(1.05); setSit(G.dv, !inB(t, 'g7')); if (!inB(t, 'g7')) anjali(G.dv); else rest(G.dv); G.dv.userData.glow.material.opacity = 0.55 + 0.25 * Math.sin(t * 3); }
      if (inB(t, 'g8') && rel(t, 'g8') > 3.0) BUB.push({ o: G.bud, dy: 2.4, txt: 'ท่านเป็นใคร?', c: '#fff' });
      if (inB(t, 'r1')) BUB.push({ o: G.dv, dy: 2.0, txt: 'ชาติก่อน…ข้าคือกบ', c: '#fff' });
      if (inB(t, 'g5') && rel(t, 'g5') > 2.4) BUB.push({ o: G.frog, dy: 1.0, txt: '♪', c: '#fff', big: true });
    }
  }

  /* ---------- temple + Vinaya hut ---------- */
  { const tOn = ['m1', 'm5', 'm6'].includes(id); vis(s.tmp.g, tOn);
    if (tOn) { const r = t - at(id); s.tmp.monks.forEach((m, i) => (m.userData.head.rotation.x = Math.sin(t * 1.5 + i) * 0.05));
      if (inB(t, 'm1')) { if (r > 1.2 && r < 3.6) BUB.push({ o: s.tmp.monks[2], dy: 1.7, txt: 'มนุสฺโสสิ?', c: '#fff' }); if (r > 3.6) BUB.push({ o: s.tmp.nak, dy: 1.7, txt: 'อาม ภนฺเต', c: '#fff' }); } }
    const H = s.hut, hOn = ['m2', 'm3', 'm4'].includes(id); [H.h, H.naga, H.youth, H.ymonk, H.bud].concat(H.monks).forEach((o) => vis(o, hOn)); H.tears.forEach((d) => vis(d, false));
    if (hOn) {
      vis(H.naga, false); vis(H.youth, false); vis(H.ymonk, false); vis(H.bud, inB(t, 'm4'));
      H.monks.forEach((m, i) => { setP(m, 'HUT', -2.6 + i * 1.3, 0, 1.8); face(m, 1, 0.3); rest(m); vis(m, inB(t, 'm2') || inB(t, 'm3')); });
      if (inB(t, 'm2')) { const r = rel(t, 'm2'), k = sm(0, 2.0, r); vis(H.youth, r < 3.2); vis(H.ymonk, r >= 3.2); setP(H.youth, 'HUT', U.lerp(4, 1.4, k), 0, 1.8); face(H.youth, -1, 0.2); if (r < 2) walk(H.youth, t, 1); else rest(H.youth); if (r > 2.0 && r < 3.2) BUB.push({ o: H.youth, dy: 2.0, txt: 'ขอบวชด้วยครับ', c: '#fff' }); setP(H.ymonk, 'HUT', 1.4, 0, 1.8); face(H.ymonk, -1, 0.2); }
      if (inB(t, 'm3')) { const r = rel(t, 'm3'), fill = U.easeOut(sm(0.4, 2.0, r)); vis(H.naga, true);
        setNaga(H.naga, (u) => { const a = u * 22, rr = 1.6 * (1 - u * 0.5); if (u < 0.12) { const k = u / 0.12; return [ST.HUT[0] + U.lerp(1.25 + 1.8 * fill, 1.25, k), 1.45 + Math.sin(k * 6) * 0.1, U.lerp(0.9, -0.2, k)]; } if (u > 0.9) { const k = (u - 0.9) / 0.1; return [ST.HUT[0] - 1.25 - k * 1.6 * fill, 1.45, U.lerp(-0.2, 0.9, k)]; } return [ST.HUT[0] + Math.cos(a) * rr, 0.4 + u * 2.0, -1.5 + Math.sin(a) * rr * 0.8]; });
        H.naga.scale.setScalar(1); H.monks[0].userData.arms.L.rotation.set(-2.4, 0, -0.3); H.monks[0].userData.arms.R.rotation.set(-2.4, 0, 0.3);
        if (r > 2.2) BUB.push({ o: H.monks[0], dy: 2.0, txt: 'งูเต็มกุฏิ!!', c: '#ffb3b3' }); }
      if (inB(t, 'm4')) { const r = rel(t, 'm4'), go = sm(2.6, dur('m4'), r); vis(H.youth, r < 2.6); setP(H.youth, 'HUT', -3.2, 0, 1.4); face(H.youth, -1, -0.3); H.youth.userData.head.rotation.x = 0.35;
        if (r < 2.6) H.tears.forEach((d, i) => { vis(d, true); const k = (r * 0.9 + i / 6) % 1; H.youth.getWorldPosition(s.anchorV); d.position.set(s.anchorV.x + (i % 2 ? 0.15 : -0.15) + 0.2, s.anchorV.y + 1.4 - k, s.anchorV.z + 0.35); });
        if (r > 0.5 && r < 2.4) BUB.push({ o: H.bud, dy: 2.3, txt: 'นาค บวชไม่ได้', c: '#fff' });
        if (r >= 2.6) { vis(H.naga, true); setNaga(H.naga, (u) => [ST.HUT[0] - 3.2 + go * 9 + u * 4.2 - Math.sin(u * 10 + t * 4) * 0.3 * 0, 0.4, 1.4 + Math.sin(u * 12 - t * 5) * 0.5]); H.naga.userData.hd.rotation.y = -Math.PI / 2; } }
    }
  }

  /* ---------- camera + bubble projection ---------- */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
