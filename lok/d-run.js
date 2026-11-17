/* Part D: camera, backgrounds, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const STN = (id) => {
  if (id[0] === 'v') return 'SAV'; if (id[0] === 'k') return 'KUS'; if (id[0] === 's') return 'SKY';
  if (['p1', 'p2', 'p3', 'p4', 'p6', 'p7'].includes(id)) return 'RAJ';
  if (['b1', 'b2', 'b4', 'b5', 'b6', 'b7'].includes(id)) return 'JET';
  return 'WHEEL';
};
const WIDE = (sx, ly) => fr('WHEEL', 0, ly || 9.0, -2, 19, 0.8, sx || 0);
const SHOT = {
  cover: [[0, fr('WHEEL', 0, 9.6, -2, 21.5, 0.4, 0)]], hook1: [[0, fr('WHEEL', 0, 9.3, -2, 20.5, 0.8, -1)]], hook2: [[0, fr('WHEEL', -1.2, 8.4, -2, 16, 0.6, -1.5)]],
  hook3: [[0, fr('WHEEL', 0, 3.4, 1.6, 12, 0.8, 0)]], hook4: [[0, fr('WHEEL', 0, 9.2, -2, 19.5, 0.6, 0)]], lok: [[0, fr('WHEEL', 0, 8.8, -2, 20.5, 0.4, 0)]],
  v1: [[0, fr('SAV', -0.6, 1.6, -0.6, 9.5, 2.6, 0)]], v2: [[0, fr('SAV', -0.6, 1.4, 0, 7.4, 1.9, 0.8)]], v3: [[0, fr('SAV', 0.3, 1.3, 0.2, 5.6, 1.1, 0)]],
  v4: [[0, fr('SAV', 1.6, 1.4, 0, 8, 1.9, 0)], [0.45, fr('SAV', 4.6, 1.4, -0.6, 8.6, 1.9, 0)]],
  v5: [[0, fr('SAV', 6.4, 1.3, -0.8, 6.6, 1.5, 1.2)]], v6: [[0, fr('SAV', 6.2, 1.2, -0.6, 5.6, 1.2, -1)]], v7: [[0, fr('SAV', 6.4, 1.8, -0.8, 8.2, 2.2, 0)]], v8: [[0, fr('SAV', 6.4, 1.4, -0.8, 7.2, 1.7, 0.8)]],
  w1: [[0, WIDE(1.6)]],
  k1: [[0, fr('KUS', 0, 2.4, -1, 12, 3, 0)]], k2: [[0, fr('KUS', 0, 3.2, -5, 18, 6.5, 0)]], k3: [[0, fr('KUS', 0, 1.6, 1.0, 9, 1.8, 0)]], k4: [[0, fr('KUS', 0, 3, -5.5, 16.5, 5, 0)]],
  k5: [[0, fr('KUS', 0, 1.3, 3.0, 7.6, 1.5, 0)]], k6: [[0, fr('KUS', 0.7, 1.4, 0.4, 7.6, 1.5, 0.9)]], k7: [[0, fr('KUS', 0.3, 1.4, 0.3, 7.2, 1.4, 0)]],
  k8: [[0, fr('KUS', 0, 3.2, -4, 18, 6.5, 0)]], k9: [[0, fr('KUS', 0, 1.3, 0, 8.4, 2.6, 0)]], k10: [[0, fr('KUS', 0.8, 1.4, 0.4, 8.4, 1.6, 0)]],
  w2: [[0, WIDE(-1.6)]],
  s1: [[0, fr('SKY', -3, 2.2, -3.6, 11, 3, 0)]], s3: [[0, fr('SKY', -1, 1.8, 0, 11, 2.6, 0)]], s4: [[0, fr('SKY', 2, 1.6, 0, 11, 2.4, 0)], [0.4, fr('SKY', 7, 1.6, 0, 11, 2.4, 0)]],
  s5: [[0, fr('SKY', 14, 2.6, -1.5, 12.5, 2.6, 0)]], s6: [[0, fr('SKY', 12.6, 2.4, -0.6, 10, 2.2, 1.4)]], s7: [[0, fr('SKY', 8, 1.8, 0, 12.5, 2.6, 0)]],
  s9: [[0, fr('SKY', -3, 1.6, -4.0, 8, 2, 0)]], s10a: [[0, fr('SKY', -3, 1.6, -4.3, 5.4, 1.1, 0.6)]], s10b: [[0, fr('SKY', -2.6, 1.5, -4.3, 6.2, 1.0, -0.6)]],
  w3: [[0, WIDE(1.2)]],
  p1: [[0, fr('RAJ', 8, 1.1, 5.2, 6, 1.4, 0.6)]], p2: [[0, fr('RAJ', 5, 1.4, 2.6, 10, 2.4, 1)]], p3: [[0, fr('RAJ', 2.2, 1.4, 0.2, 9, 2.4, 1.2)]], p4: [[0, fr('RAJ', 4.2, 1.1, 0.4, 2.9, 1.45, -2.34)]],
  p6: [[0, fr('RAJ', 9.4, 1.3, 5.0, 9, 1.8, 0)]], p7: [[0, fr('RAJ', 0, 1.8, -1.0, 9.6, 2.4, 0)]],
  p8: [[0, WIDE(1, 8.6)]], p9: [[0, WIDE(-1, 8.8)]], m1: [[0, fr('WHEEL', 0, 11, -2, 22, 1.5, 0)]], m2: [[0, fr('WHEEL', 0, 9.5, -2, 20, 1, 0)]], w4: [[0, fr('WHEEL', 0, 6.5, 0, 16, 0.6, 0)]],
  b1: [[0, fr('JET', 1.8, 1.4, 0, 10, 2.4, 0.5)]], b2: [[0, fr('JET', 4.6, 1.4, 2, 7, 1.6, 0.8)]], b4: [[0, fr('JET', 0, 1.6, -1.8, 7, 1.6, 0)]], b5: [[0, fr('JET', 2, 1.6, 0, 11, 2.6, 0)]],
  b6: [[0, fr('JET', -5.8, 2.0, -5.0, 11.5, 2.4, 1.2)]], b7: [[0, fr('JET', 0, 0.9, -1.6, 6.4, 2.2, 0)]],
  b8: [[0, fr('WHEEL', 0, 3.8, 0.8, 13.5, 0.5, 0)]], moral: [[0, fr('WHEEL', 0, 6.2, 0, 17, 0.6, 0)]], recap: [[0, fr('WHEEL', 0, 7.5, -1, 20, 0.6, 0)]], ask: [[0, fr('WHEEL', 0, 4.4, 1, 14, 0.8, 1)]],
};
const CUT = new Set(); { let prev = null; for (const id of ORDER) { if (id === 'end') continue; const s0 = STN(id); if (prev && s0 !== prev) CUT.add(id); prev = s0; } }
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + (j ? dur(id) * sg[0] : 0), t1 = j + 1 < segsS.length ? at(id) + dur(id) * segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.93);
      const cut = j === 0 && CUT.has(id);
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(1.2, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

/* backgrounds + light */
const BG = {
  dusk: ['#1c1530', '#5a3a68'], day: ['#2a4a80', '#8fbfe8'], grey: ['#262c44', '#64708e'], gold: ['#3a2a40', '#d89a60'], jungle: ['#1f3a3a', '#6f9a80'],
  sky: ['#3a3f8f', '#a9b4ff'], battle: ['#241e48', '#6a5a98'], night: ['#070b1e', '#16224a'],
};
function bgKey(t) {
  const id = beatAt(t), st = STN(id);
  if (st === 'WHEEL') return 'dusk';
  if (st === 'SAV') return ['v3', 'v4', 'v5', 'v6'].includes(id) ? 'grey' : 'day';
  if (st === 'KUS') return ['k8', 'k9', 'k10'].includes(id) ? 'jungle' : ['k6', 'k7'].includes(id) ? 'grey' : 'gold';
  if (st === 'SKY') return ['s3', 's4', 's5', 's6'].includes(id) ? 'battle' : ['s10a', 's10b'].includes(id) ? 'grey' : 'sky';
  if (st === 'RAJ') return id === 'p6' ? 'grey' : 'day';
  if (st === 'JET') return id === 'b7' ? 'night' : ['b1', 'b2'].includes(id) ? 'grey' : 'day';
  return 'dusk';
}
function bgAt(t) { return BG[bgKey(t)]; }
const LT = { dusk: [0.62, 0.7, '#ffd8c8'], day: [0.72, 0.9, '#fff4e0'], grey: [0.6, 0.55, '#c8d0e8'], gold: [0.7, 0.85, '#ffe0b0'], jungle: [0.68, 0.75, '#e8ffe0'], sky: [0.85, 0.85, '#ffffff'], battle: [0.6, 0.6, '#d0c8ff'], night: [0.45, 0.4, '#a8b8ff'] };

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const BUB = [];
const greyC = new T.Color('#8a8a92'), tmpC = new T.Color();

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), st = STN(id), r = rel(t, id), k = rk(t, id), D = dur(id);
  const lt = LT[bgKey(t)]; s.hemi.intensity = lt[0]; s.sun.intensity = lt[1]; s.sun.color.set(lt[2]); s.fog.color.set(bgAt(t)[1]);
  for (const key in s.st) s.st[key].visible = key === st;

  /* ---------- WHEEL ---------- */
  if (st === 'WHEEL') {
    const Wd = s.W, fw = Wd.fw.userData, ang = -0.13 * t; fw.rot.rotation.z = ang;
    fw.cars.forEach((c, i) => { c.pv.rotation.z = -ang + Math.sin(t * 1.3 + i) * 0.05; c.ring.material.opacity = 0; });
    fw.bulbs.forEach((b, i) => { b.visible = ((i + Math.floor(t * 4)) % 3) !== 0; });
    let hl = []; if (id === 'cover') hl = [['vis', 0], ['king', 0], ['sak', 0], ['sup', 0]]; if (id === 'hook1') hl = [['vis', 0.25], ['king', 0.45], ['sak', 0.65]]; if (id === 'hook2') hl = [['sup', 0], ['you', 0.45]];
    for (const w of ['w1', 'w2', 'w3', 'w4']) if (id === w) hl = [[{ w1: 'vis', w2: 'king', w3: 'sak', w4: 'sup' }[w], 0]];
    if (id === 'ask') hl = [['you', 0.2]];
    for (const [who, k0] of hl) if (k >= k0) { const c = fw.cars[WHO[who][2]]; c.ring.material.opacity = 0.65 + 0.3 * Math.sin(t * 6); c.ring.material.color.set(WHO[who][1]); }
    if (id === 'hook2' && k > 0.45) BUB.push({ o: Wd.riders.you, dy: 2.4, txt: 'คุณ', c: '#fff' });
    if (id === 'ask' && k > 0.2) BUB.push({ o: Wd.riders.you, dy: 2.4, txt: 'ตอนนี้ ขึ้น/ลง?', c: '#fff' });
    Wd.lokLabs.forEach((lb, i) => { const on = id === 'lok' && k > 0.08 + i * 0.05; lb.visible = on; lb.material.opacity = on ? 1 : 0; });
    const showBud = t >= at('b8');
    Wd.mys.material.opacity = id === 'hook3' ? 0.85 * sm(0.15, 0.4, k) * (0.8 + 0.2 * Math.sin(t * 5)) : 0; Wd.mys.visible = id === 'hook3';
    vis(Wd.bud, showBud); vis(Wd.bring, showBud);
    if (showBud) { const a = id === 'b8' ? sm(0.1, 0.4, k) : 1; Wd.bud.scale.setScalar(1.15 * Math.max(0.001, U.easeBack(a))); Wd.bring.material.opacity = 0.5 + 0.35 * Math.sin(t * 3); Wd.bud.userData.halo.material.opacity = 0.7 + 0.25 * Math.sin(t * 2); }
    Object.values(Wd.riders).forEach((c, i) => { c.userData.head.rotation.y = Math.sin(t * 1.1 + i) * 0.35; });
  }

  /* ---------- SAV: Visakha ---------- */
  if (st === 'SAV') {
    const V = s.V; rest(V.vis); setSit(V.vis, false); V.vis.rotation.set(0, 0, 0); V.vis.userData.head.rotation.set(0, 0, 0);
    const kids = id === 'v1' || id === 'v2';
    V.fam.forEach((f, i) => { vis(f, ['v1', 'v2', 'v3'].includes(id)); rest(f); });
    vis(V.gd, ['v1', 'v2', 'v3'].includes(id)); vis(V.orb, false); V.drops.forEach((d) => vis(d, false)); V.hearts.forEach((h) => vis(h, false));
    if (['v1', 'v2', 'v3'].includes(id)) {
      setP(V.vis, 'SAV', 0, 0, 0.2); face(V.vis, 0.2, 1);
      V.fam[0].position.set(-1.7, 0, 0.6); face(V.fam[0], 0.4, 1); V.fam[1].position.set(-2.6, 0, -0.4); V.fam[2].position.set(-1.0, 0, -1.2);
      if (kids) { const a = t * 1.5; V.fam[1].position.set(-2.4 + Math.cos(a) * 0.8, 0, -0.6 + Math.sin(a) * 0.5); face(V.fam[1], -Math.sin(a), Math.cos(a) * 0.6); walk(V.fam[1], t, 1); V.fam[2].position.set(-2.4 + Math.cos(a - 1.2) * 0.8, 0, -0.6 + Math.sin(a - 1.2) * 0.5); face(V.fam[2], -Math.sin(a - 1.2), Math.cos(a - 1.2) * 0.6); walk(V.fam[2], t + 0.3, 1); }
      V.gd.position.set(0.95, 0, 0.6); face(V.gd, -0.4, 1); V.gd.userData.arms.L.rotation.set(0, 0, -0.9);
      if (id === 'v2') { const q = Math.sin(t * 6) * 0.15; V.vis.userData.arms.L.rotation.set(0, 0, -2.4 + q); V.vis.userData.arms.R.rotation.set(0, 0, 2.4 - q); V.gd.position.y = Math.abs(Math.sin(t * 6)) * 0.15; }
      if (id === 'v3') { const f = sm(0.25, 0.75, k); V.gd.scale.setScalar(Math.max(0.001, 0.58 * (1 - f))); V.gd.visible = f < 0.99; V.orb.visible = f > 0.05; setP(V.orb, 'SAV', 0.95, 0.9 + f * 2.6, 0.6); V.orb.scale.setScalar(0.8 + f * 0.4);
        V.vis.userData.head.rotation.x = 0.35 * sm(0.4, 0.8, k); face(V.vis, 0.6, 0.6); V.fam.forEach((f2) => { f2.userData.head.rotation.x = 0.3 * sm(0.4, 0.8, k); }); }
      else V.gd.scale.setScalar(0.58);
    }
    if (id === 'v4') { const u = eio(k); setP(V.vis, 'SAV', U.lerp(0.4, 5.6, u), 0, U.lerp(0.2, -0.3, u)); face(V.vis, 1, -0.1); walk(V.vis, t, 0.7); V.vis.userData.head.rotation.x = 0.25;
      V.drops.forEach((d, i) => { const q = ((t * 1.3 + i * 0.37) % 1); d.visible = true; d.position.set(V.vis.position.x + Math.cos(i * 2.3) * 0.35, 1.6 - q * 1.5, V.vis.position.z + Math.sin(i * 2.3) * 0.35); }); }
    if (['v5', 'v6', 'v7', 'v8'].includes(id)) { setP(V.vis, 'SAV', 5.6, 0, -0.3); setSit(V.vis, true); face(V.vis, 1.6, -1.1);
      if (id === 'v5' || id === 'v6') V.drops.forEach((d, i) => { const q = ((t * 1.1 + i * 0.37) % 1); d.visible = i < 4; d.position.set(5.6 + Math.cos(i * 2.3) * 0.32, 1.45 - q * 1.2, -0.3 + Math.sin(i * 2.3) * 0.32); });
      if (id === 'v5' && k > 0.55) BUB.push({ o: V.vis, dy: 2.0, txt: 'อยากค่ะ!', c: '#fff' });
      if (id === 'v6') { V.vis.userData.head.rotation.x = 0.15; if (k > 0.5) BUB.push({ o: V.vis, dy: 2.0, txt: 'ทุกวัน…ไม่เคยขาด', c: '#fff' }); }
      if (id === 'v7') { V.hearts.forEach((h, i) => { const a = i / V.hearts.length * Math.PI * 2 + t * 0.4, q = sm(0.05 + i * 0.03, 0.2 + i * 0.03, k); h.visible = q > 0; h.position.set(5.6 + Math.cos(a) * 1.4, 1.0 + Math.sin(i * 1.7) * 0.6 + q * 0.3, -0.3 + Math.sin(a) * 1.0); h.material.opacity = 0.85 * q; }); }
      if (id === 'v8') anjali(V.vis);
    }
    V.bud.userData.halo.material.opacity = 0.75 + 0.2 * Math.sin(t * 2) + (id === 'v7' ? 0.1 : 0);
  }

  /* ---------- KUS: Mahasudassana ---------- */
  if (st === 'KUS') {
    const K = s.K, early = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7'].includes(id), late = !early;
    vis(K.thr, early); vis(K.back, early); vis(K.king, early); vis(K.queen, ['k6', 'k7'].includes(id));
    K.ele.forEach((e) => vis(e, early && id !== 'k5')); K.hor.forEach((h) => vis(h, early && id !== 'k5'));
    K.crowd.forEach((c, i) => { vis(c, ['k1', 'k2', 'k3'].includes(id)); rest(c); if (id === 'k3') { const q = Math.sin(t * 7 + i) * 0.25; c.userData.arms.L.rotation.set(0, 0, -2.5 + q); c.userData.arms.R.rotation.set(0, 0, 2.5 - q); c.position.y = Math.abs(Math.sin(t * 7 + i)) * 0.12; } });
    K.homes.forEach((h, i) => { const q = id === 'k5' ? U.easeBack(sm(0.1 + i * 0.12, 0.3 + i * 0.12, k)) : 0; h.scale.setScalar(Math.max(0.001, q)); h.visible = q > 0.002; });
    /* palaces: grow in k2, dim in k4, shrink in k8 */
    const grow = id === 'k1' ? 0.35 : id === 'k2' ? 1 : 1, dimK = id === 'k4' ? sm(0.15, 0.5, k) : ['k5', 'k6', 'k7'].includes(id) ? 1 : 0, gone = id === 'k8' ? sm(0.05, 0.6, k) : late ? 1 : 0;
    K.pal.forEach((p, i) => { const kk = p.userData.k; let sc = id === 'k1' ? (kk < 0.12 ? 1 : 0) : id === 'k2' ? U.easeBack(sm(kk * 0.75, kk * 0.75 + 0.12, k)) : 1; sc *= 1 - sm(kk * 0.6, kk * 0.6 + 0.35, gone); p.scale.setScalar(Math.max(0.001, sc)); p.visible = sc > 0.002;
      p.userData.b.material.color.set('#fbefd2').lerp(greyC, dimK * 0.75); p.userData.r.material.color.set(P.gold).lerp(greyC, dimK * 0.8); p.userData.r.material.emissiveIntensity = 0.35 * (1 - dimK); });
    void grow;
    { const sc = 0.95 * (1 - sm(0.3, 0.8, gone)); K.big.scale.setScalar(Math.max(0.001, sc)); K.big.visible = sc > 0.002; K.halo.material.opacity = id === 'k4' || id === 'k5' ? 0.55 * sm(0.3, 0.6, k) + (id === 'k5' ? 0.5 : 0) * 0 : 0; K.halo.visible = id === 'k4'; }
    K.jungle.forEach((tr) => { const q = id === 'k8' ? U.easeBack(sm(0.35 + tr.userData.k * 0.4, 0.5 + tr.userData.k * 0.4, k)) : late ? 1 : 0; tr.scale.setScalar(Math.max(0.001, q * (0.9 + tr.userData.k * 0.8))); tr.visible = q > 0.002; });
    K.huts.forEach((h, i) => { const q = id === 'k8' ? U.easeBack(sm(0.6 + i * 0.07, 0.75 + i * 0.07, k)) : late ? 1 : 0; h.scale.setScalar(Math.max(0.001, q)); h.visible = q > 0.002; });
    K.sal.forEach((sl) => vis(sl, ['k9', 'k10'].includes(id))); vis(K.lie, ['k9', 'k10'].includes(id)); K.monks.forEach((m) => vis(m, id === 'k9'));
    K.lie.userData.halo.material.opacity = 0.7 + 0.25 * Math.sin(t * 2);
    if (early) { setSit(K.king, true); setP(K.king, 'KUS', 0, 0.5, 0.2); face(K.king, 0, 1); rest(K.king); K.king.scale.setScalar(1); K.king.visible = true;
      if (id === 'k2' || id === 'k3') { K.king.userData.arms.R.rotation.set(0, 0, 2.2 + Math.sin(t * 3) * 0.2); }
      if (id === 'k4') { K.king.userData.head.rotation.y = Math.sin(t * 1.2) * 0.5; }
      if (id === 'k7') { anjali(K.king); const f = sm(0.7, 1, k); K.king.scale.setScalar(Math.max(0.001, 1 - f)); K.king.visible = f < 0.99; }
      setP(K.queen, 'KUS', 1.5, 0, 0.9); face(K.queen, -1, -0.3); rest(K.queen); K.queen.userData.head.rotation.x = 0.3;
      if (id === 'k6') { K.queen.userData.arms.L.rotation.set(-1.9, 0, 0.5); K.queen.userData.arms.R.rotation.set(-1.9, 0, -0.5);  }
      if (id === 'k7' && k < 0.65) BUB.push({ o: K.king, dy: 2.4, txt: 'อย่าห่วงมันเลย', c: '#fff' }); }
    K.tears.forEach((d, i) => { const on = id === 'k6' || id === 'k7'; d.visible = on; if (on) { const q = (t * 1.4 + i * 0.29) % 1; d.position.set(1.5 + (i % 2 ? 0.14 : -0.14) - 0.12, 1.4 - q * 1.2, 0.9 + 0.3); } });
    K.ele.forEach((e, i) => { e.rotation.y = -0.4 + Math.sin(t * 0.8 + i) * 0.1; });
    { const on = id === 'k10'; vis(K.ghost, on); if (on) { const a = sm(0.15, 0.45, k); setP(K.ghost, 'KUS', 2.0, 0.25 + 0.12 * Math.sin(t * 2), 1.3); face(K.ghost, 0, 1); anjali(K.ghost); K.ghost.traverse((o) => { if (o.material) o.material.opacity = 0.65 * a * (1 - sm(0.8, 1, k) * 0.5); }); } }
  }

  /* ---------- SKY: Sakka ---------- */
  if (st === 'SKY') {
    const Sk = s.Sk, chase = ['s3', 's4', 's5', 's6', 's7'].includes(id);
    vis(Sk.sak, ['s1', 's3'].includes(id)); vis(Sk.car, ['s4', 's5', 's6', 's7'].includes(id));
    Sk.devas.forEach((d, i) => { rest(d); vis(d, id === 's1' || id === 's3'); });
    Sk.asuras.forEach((a) => vis(a, chase));
    vis(Sk.dv, ['s9', 's10a', 's10b'].includes(id)); vis(Sk.seat, true); vis(Sk.seatBack, true);
    Sk.sweat.forEach((d) => vis(d, false)); vis(Sk.glow, id === 's1');
    if (id === 's1') { setP(Sk.sak, 'SKY', -3, 0, -2.8); face(Sk.sak, 0, 1); rest(Sk.sak); Sk.sak.userData.arms.R.rotation.set(0, 0, 2.3);
      setP(Sk.glow, 'SKY', -3, 1.5, -3.1); Sk.devas.forEach((d, i) => { setP(d, 'SKY', -5 + i * (i > 1 ? 1.3 : 1.0) + (i > 1 ? 2.2 : 0), 0, -2.0 - (i % 2) * 0.8); face(d, 0, 1); d.position.y = 0.1 * Math.abs(Math.sin(t * 3 + i)); }); }
    if (id === 's3') { const adv = sm(0.1, 0.9, k);
      setP(Sk.sak, 'SKY', 1.2 + adv * 1.0, 0, -0.6); face(Sk.sak, -1, 0.2); Sk.sak.userData.arms.R.rotation.set(0, 0, 2.0);
      Sk.devas.forEach((d, i) => { setP(d, 'SKY', 0.4 + (i % 2) * 0.7 + adv * 1.6, 0, -1.6 + i * 1.0); face(d, -1, 0); d.userData.arms.R.rotation.set(-1.4, 0, 0.3); });
      Sk.asuras.forEach((a, i) => { setP(a, 'SKY', -4.6 + (i % 3) * 0.9 + adv * 2.6, 0, -1.8 + Math.floor(i / 3) * 1.6 + (i % 3) * 0.3); face(a, 1, 0); a.userData.arms.R.rotation.set(-1.6 + Math.sin(t * 8 + i) * 0.4, 0, 0.2); });
      if (k > 0.55) BUB.push({ o: Sk.sak, dy: 2.4, txt: 'ถอย!', c: '#fff' }); }
    if (['s4', 's5', 's6', 's7'].includes(id)) {
      let cx = 12, ry = 0;
      if (id === 's4') cx = U.lerp(1.5, 10, eio(k)); if (id === 's5') cx = U.lerp(10, 11.6, U.easeOut(k));
      if (id === 's6') { cx = 11.6; ry = Math.PI * eio(sm(0.4, 0.85, k)); } if (id === 's7') { cx = U.lerp(11.6, 10.4, U.easeOut(k)); ry = Math.PI; }
      setP(Sk.car, 'SKY', cx, 0.15 + (id === 's4' ? 0.6 * Math.sin(k * Math.PI) : 0), 0); Sk.car.rotation.y = ry;
      Sk.car.userData.horses.forEach((h, i) => h.userData.legs.forEach((l, j) => { l.rotation.z = Math.sin(t * 14 + j * 1.6 + i) * (id === 's4' ? 0.6 : 0.15); }));
      Sk.sak.visible = true; if (Sk.sak.parent !== Sk.car) Sk.car.add(Sk.sak); Sk.sak.position.set(-0.3, 0.85, -0.25); Sk.sak.rotation.set(0, Math.PI / 2, 0); Sk.sak.scale.setScalar(0.8); rest(Sk.sak);
      const ax = id === 's4' ? U.lerp(-2, 6, k) : id === 's5' ? U.lerp(6, 7.4, k) : id === 's6' ? 7.4 : 7.4 - 9 * ein(sm(0.15, 1, k));
      const flee = id === 's7' && k > 0.15;
      Sk.asuras.forEach((a, i) => { setP(a, 'SKY', ax - (i % 3) * 1.0, 0, -1.6 + Math.floor(i / 3) * 1.6 + (i % 3) * 0.4); face(a, flee ? -1 : 1, 0); walk(a, t + i * 0.3, id === 's6' ? 0.2 : 1); const sc = id === 's7' ? 0.95 * (1 - sm(0.7, 1, k)) : 0.95; a.scale.setScalar(Math.max(0.001, sc)); a.visible = sc > 0.002; });
      Sk.trees.forEach((tr) => tr.userData.chicks.forEach((c, j) => { c.position.y = 3.45 + Math.abs(Math.sin(t * 8 + j)) * 0.08; }));
      if (id === 's6' && k < 0.5) BUB.push({ o: Sk.car, dy: 2.6, txt: 'กลับรถ!', c: '#fff' });
      if (id === 's6' && k > 0.55) BUB.push({ o: Sk.trees[0], dy: 4.1, txt: 'จิ๊บๆ', c: '#fff' });
      if (id === 's7' && k > 0.2 && k < 0.8) BUB.push({ o: Sk.asuras[1], dy: 2.2, txt: 'มันกลับมาสู้!', c: '#ffd0d0' });
    } else if (Sk.sak.parent === Sk.car) { Sk.car.remove(Sk.sak); s.st.SKY.add(Sk.sak); Sk.sak.rotation.set(0, 0, 0); Sk.sak.scale.setScalar(1); }
    if (['s9', 's10a', 's10b'].includes(id)) {
      const dv = Sk.dv; rest(dv); setSit(dv, true); setP(dv, 'SKY', -3, 0.55, -4.55); face(dv, 0, 1); dv.userData.head.rotation.set(0, 0, 0);
      const s1 = id === 's10a' ? sm(0.08, 0.3, k) : id === 's10b' ? 1 : 0, s2 = id === 's10a' ? sm(0.4, 0.6, k) : id === 's10b' ? 1 : 0, s3 = id === 's10a' ? sm(0.7, 0.85, k) : id === 's10b' ? 1 : 0;
      const s4 = id === 's10b' ? sm(0.05, 0.35, k) : 0, s5 = id === 's10b' ? sm(0.5, 0.75, k) : 0;
      Sk.gar.children.forEach((f, i) => { f.material.color.set(i % 2 ? '#ff8ab3' : '#fff2a8').lerp(tmpC.set('#7a5a3a'), s1); f.position.y = -Math.abs(Math.sin((i / 12) * Math.PI * 2)) * 0.25 - s1 * 0.12 * (i % 3); });
      Sk.dvRobe.color.set('#fff6e0').lerp(tmpC.set('#8a8478'), s2 * 0.85);
      Sk.dvSkin.color.set('#f2d2ae').lerp(tmpC.set('#9a8a7a'), s4 * 0.7); Sk.dvSkin.emissiveIntensity = 0.3 * (1 - s4); Sk.dvRobe.emissiveIntensity = 0.3 * (1 - Math.max(s2, s4));
      if (s3 > 0 && id === 's10a') Sk.sweat.forEach((d, i) => { const q = (t * 1.2 + i * 0.31) % 1; d.visible = true; d.position.set(-3 + (i % 2 ? 0.42 : -0.42), 1.25 - q * 0.8, -4.55 + 0.1); });
      if (s5 > 0) { setSit(dv, false); setP(dv, 'SKY', -3 + 1.4 * s5, 0, -4.55 + 0.9 * s5); face(dv, 0.6, 1); walk(dv, t, 0.5 * s5); dv.userData.head.rotation.y = Math.sin(t * 3) * 0.4; dv.userData.head.rotation.x = 0.25; }
      if (id === 's9') { const q = Math.sin(t * 4) * 0.1; dv.userData.arms.R.rotation.set(-0.4, 0, 0.6 + q); }
    }
  }

  /* ---------- RAJ: Suppabuddha ---------- */
  if (st === 'RAJ') {
    const R = s.R, sup = R.sup; rest(sup); setSit(sup, false); sup.rotation.set(0, 0, 0); sup.scale.setScalar(1); sup.visible = true;
    vis(R.bowl, id === 'p1' || id === 'p2'); R.ring.material.opacity = 0; R.glow.material.opacity = 0; vis(R.orb, false); vis(R.cow, id === 'p6'); vis(R.calf, id === 'p6');
    R.crowd.forEach((c, i) => { c.userData.head.rotation.y = Math.sin(t * 0.9 + i) * 0.12; });
    if (id === 'p1') { setSit(sup, true); setP(sup, 'RAJ', 8, 0, 5.2); face(sup, -0.3, 1); sup.userData.head.rotation.x = 0.3; sup.userData.arms.R.rotation.set(-0.9, 0, 0.1); setP(R.bowl, 'RAJ', 8.25, 0.45, 5.7); }
    if (id === 'p2') { const u = sm(0.3, 1, k); if (u <= 0) { setSit(sup, true); setP(sup, 'RAJ', 8, 0, 5.2); face(sup, -1, -0.6); sup.userData.head.rotation.y = 0.5; } else { setP(sup, 'RAJ', U.lerp(8, 5.2, u), 0, U.lerp(5.2, 3.8, u)); face(sup, -1, -0.5); walk(sup, t, 0.8); }
      setP(R.bowl, 'RAJ', 8.25, 0.07, 5.7); if (k > 0.15 && k < 0.85) BUB.push({ o: sup, dy: 2.2, txt: 'แจกข้าวแน่ๆ!', c: '#fff' }); }
    if (id === 'p3') { const u = sm(0, 0.45, k); if (u < 1) { setP(sup, 'RAJ', U.lerp(5.2, 4.4, u), 0, U.lerp(3.8, 0.2, u)); face(sup, -0.3, -1); walk(sup, t, 0.7); } else { setSit(sup, true); setP(sup, 'RAJ', 4.4, 0, 0.2); face(sup, -4.4, -2.4); anjali(sup); } }
    if (id === 'p4') { setSit(sup, true); setP(sup, 'RAJ', 4.4, 0, 0.2); face(sup, -1, -0.35); anjali(sup); const g = sm(0.1, 0.45, k); setP(R.ring, 'RAJ', 4.4, 0.08, 0.2); R.ring.material.opacity = 0.85 * g; R.ring.scale.setScalar(1 + 0.08 * Math.sin(t * 4)); setP(R.glow, 'RAJ', 4.4, 1.1, 0.25); R.glow.material.opacity = 0.75 * g; sup.userData.head.rotation.x = -0.15 * g; }
    if (id === 'p6') { const hit = 0.55, u = sm(0, hit, k), fall = sm(hit, hit + 0.12, k), fade = sm(hit + 0.1, 0.85, k);
      setP(sup, 'RAJ', U.lerp(5.0, 8.2, u), 0, U.lerp(3.0, 5.2, u)); face(sup, 1, 0.2); if (fall <= 0) walk(sup, t, 0.7); sup.rotation.order = 'YXZ'; sup.rotation.x = -1.3 * fall;
      sup.scale.setScalar(Math.max(0.001, 1 - fade)); sup.visible = fade < 0.99;
      const cx = U.lerp(16, 9.1, ein(sm(0.12, hit, k))); setP(R.cow, 'RAJ', cx, 0, 5.2); R.cow.rotation.y = Math.PI; setP(R.calf, 'RAJ', cx + 2.0, 0, 5.9); R.calf.rotation.y = Math.PI;
      [R.cow, R.calf].forEach((c) => c.userData.legs.forEach((l, j) => { l.rotation.z = Math.sin(t * 16 + j * 1.6) * 0.5 * (k < hit ? 1 : 0.2); }));
      if (fade > 0) { R.orb.visible = true; setP(R.orb, 'RAJ', 8.4, 0.8 + fade * 3.2, 5.2); } }
    if (id === 'p7') { setP(sup, 'RAJ', 0, -50, 0); R.orb.visible = true; setP(R.orb, 'RAJ', 3.8, 4.4 + 0.3 * Math.sin(t * 2), 0.6); }
    R.bud.userData.halo.material.opacity = 0.75 + 0.2 * Math.sin(t * 2);
  }

  /* ---------- JET: the Buddha ---------- */
  if (st === 'JET') {
    const J = s.J; vis(J.bud, ['b1', 'b2', 'b4', 'b5'].includes(id)); vis(J.stand, id === 'b6'); vis(J.lie, id === 'b7'); J.devas.forEach((d) => vis(d, id === 'b7'));
    J.monks.forEach((m, i) => { vis(m, id !== 'b6' && id !== 'b7'); anjali(m); m.userData.head.rotation.x = ['b1', 'b2'].includes(id) ? 0.3 : 0; });
    const crowdOn = ['b1', 'b2', 'b4', 'b5'].includes(id);
    J.town.forEach((c, i) => { vis(c, crowdOn); rest(c); const bx = 3.6 + (i % 4) * 1.0, bz = 1.4 + Math.floor(i / 4) * 1.1 + (i % 2) * 0.3; setP(c, 'JET', bx, 0, bz); face(c, -1, -0.5);
      const calm = id === 'b5' ? sm(0.35, 0.8, k) : id === 'b4' ? 0 : 0;
      if (id === 'b1' || id === 'b2' || (id === 'b5' && calm < 1) || id === 'b4') { const q = Math.sin(t * 9 + i * 1.3) * 0.35 * (1 - calm); c.userData.arms.R.rotation.set(0, 0, 2.6 + q); }
      if (id === 'b5' && calm > 0.5) anjali(c); });
    if (id === 'b1') { BUB.push({ o: J.town[1], dy: 2.0, txt: '!!', c: '#ffd0d0', big: true }); if (k > 0.4) BUB.push({ o: J.monks[3], dy: 1.8, txt: 'ไม่จริงนะ…', c: '#fff' }); }
    if (id === 'b2') { if (k > 0.2) BUB.push({ o: J.town[2], dy: 2.0, txt: 'ได้ยินไหม…', c: '#fff' }); if (k > 0.55) BUB.push({ o: J.town[5], dy: 2.0, txt: 'พระทำแน่ๆ!', c: '#ffd0d0' }); }
    if (id === 'b4' && k > 0.45) BUB.push({ o: J.bud, dy: 2.4, txt: '7 วันก็หาย', c: '#fff' });
    J.bud.userData.halo.material.opacity = 0.75 + 0.2 * Math.sin(t * 2) + (id === 'b4' ? 0.1 : 0);
    if (id === 'b6') { const roll = sm(0.05, 0.5, k), hit = 0.5, sp = sm(hit, hit + 0.15, k);
      setP(J.stand, 'JET', U.lerp(-3.4, -4.2, sm(0, 0.45, k)), 0, -3); face(J.stand, -1, -0.4); if (k < 0.45) walk(J.stand, t, 0.5); else rest(J.stand);
      const top = [-13.5, 5.6, -12], bot = [-6.4, 0.9, -5.4];
      J.rock.visible = roll < 1; J.rock.position.set(U.lerp(top[0], bot[0], roll), U.lerp(top[1], bot[1], ein(roll)), U.lerp(top[2], bot[2], roll)); J.rock.rotation.set(t * 4, t * 3, 0);
      J.bits.forEach((b, i) => { b.visible = k > hit; const a = i * 0.9, d = sp * (0.8 + (i % 3) * 0.6); setP(b, 'JET', bot[0] + Math.cos(a) * d, 0.2 + Math.max(0, Math.sin(sp * Math.PI) * 0.9 - (i % 2) * 0.3), bot[2] + Math.sin(a) * d * 0.6); });
      const sh = J.bits[0]; if (k > hit) { const q = sm(hit, hit + 0.12, k); setP(sh, 'JET', U.lerp(bot[0], -4.2 - 0.2, q), 0.15 + Math.sin(q * Math.PI) * 0.8, U.lerp(bot[2], -2.8, q)); }
      J.spark.visible = k > hit + 0.1; setP(J.spark, 'JET', -4.35, 0.25, -2.75); J.spark.material.opacity = 0.9 * (1 - sm(hit + 0.12, 0.95, k)) * (0.7 + 0.3 * Math.sin(t * 10)); }
    else { J.rock.visible = false; J.bits.forEach((b) => vis(b, false)); J.spark.visible = false; }
    if (id === 'b7') { J.lie.userData.halo.material.opacity = 0.75 + 0.2 * Math.sin(t * 2); J.devas.forEach((d, i) => { d.position.y = 0.15 + 0.1 * Math.sin(t * 2 + i); }); }
  }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
