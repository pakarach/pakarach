/* Part D EP2: camera, backgrounds, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const SHOT = {
  cover: [[0, L.LAND ? fr('COURT', -3.0, 1.8, 0.4, 3, 1.6, 7.5) : fr('COURT', 0, 1.6, -0.4, 8.5, 2.4, -3.4)]],
  hook1: [[0, fr('ROAD', -1.2, 1.5, 1.2, -2.9, 0.05, 0.7)]],
  hook2: [[0, fr('ROAD', 0.3, 2.0, -1.5, 1.0, 0.35, 9.0)]],
  ay0: [[0, fr('AYO', 0, 1.8, -1.6, 7.5, 1.0, 0.8)]],
  ay1: [[0, fr('AYO', 0, 2.2, -0.8, 10, 2.6, 1.0)]],
  ay2: [[0, fr('AYO', 0, 2.6, -0.2, 8.5, 1.6, 0.6)]],
  ay3: [[0, fr('AYO', 0, 3.2, 0.4, 10.5, 1.8, 0)]],
  ay4: [[0, fr('AYO', 0, 3.2, 0.4, 10.5, 1.8, 0.4)]],
  ay5: [[0, fr('AYO', 2.6, 1.8, 0.8, 6.5, 1.4, 0.8)]],
  ay6: [[0, fr('AYO', 0, 2.2, 0.6, 10, 1.8, 0)]],
  ay7: [[0, fr('AYO', -0.4, 1.8, 2.2, 6, 0.4, 0.4)]],
  vm1: [[0, fr('AYO', -0.4, 2.4, -0.6, 9.5, 1.6, -1.2)]],
  vm2: [[0, fr('AYO', -0.2, 1.6, -1.8, 6, 0.8, 0.6)]],
  vm3: [[0, fr('AYO', 0, 1.8, -2.0, 4.6, 0.4, -0.5)]],
  vm4: [[0, fr('AYO', 0, 2.0, 0.8, 8, 1.4, -0.4)]],
  bt1: [[0, fr('SID', 0, 3.2, -1.2, 11, 0.8, 0.6)]],
  bt2: [[0, fr('SID', 2.0, 3.6, -2.0, 12, 0.8, -0.4)]],
  bt3: [[0, fr('SID', -0.4, 2.6, -0.6, 9, 0.6, 0.6)]],
  bt4: [[0, fr('SID', 18, 2.0, -10, 9, 0.6, 1.2)]],
  st1: [[0, fr('MIT', 0, 2.4, -1.0, 11, 1.4, 1.2)]],
  st2: [[0, fr('MIT', 0.6, 1.6, -0.4, 6.0, 0.8, 0.6)]],
  bw1: [[0, fr('COURT', 0, 2.8, -4.2, 10, 0.8, 0.6)]],
  bw2: [[0, fr('COURT', 0, 2.4, -1.0, 9, 0.6, 1.2)]],
  bw3: [[0, fr('COURT', 0, 2.6, 0.4, 11, 0.8, 2.4)]],
  bw4: [[0, fr('COURT', 0, 2.6, -1.0, 6.5, 0.2, 0.6)]],
  bw5: [[0, fr('COURT', 0, 2.8, -1.0, 6.0, 0.1, -0.5)]],
  bw6: [[0, fr('COURT', 0, 2.8, -2.0, 11, 1.2, 0.8)]],
  wd1: [[0, fr('COURT', 0, 2.2, 1.0, 9, 0.8, 0.6)]],
  wd2: [[0, fr('COURT', 0, 2.2, -1.2, 6.5, 0.5, 0.4)], [3.0, fr('COURT', 0, 3.0, -2.0, 11, 1.0, -0.6)]],
  pr1: [[0, fr('ROAD', 0, 2.6, -2.0, 11, 0.6, 1.0)]],
  pr2: [[0, fr('ROAD', 0, 2.6, -3.4, 3.2, 0.6, 0.3)]],
  pr3: [[0, fr('ROAD', -1.2, 1.5, 1.2, -2.9, 0.05, 0.7)]],
  pr4: [[0, fr('ROAD', 0.3, 2.0, -1.5, 1.0, 0.35, 9.0)]],
  pr5: [[0, fr('ROAD', 0.4, 2.0, -1.0, 0.8, 0.3, 6.5)], [3.2, fr('ROAD', 0, 2.2, -1.2, 1.4, 0.7, 7.5)]],
  cl1: [[0, fr('AYO', 0, 1.6, -1.6, 5.5, 1.2, 3.0)]],
  cl2: [[0, fr('AYO', -1.4, 2.0, 1.6, 5.5, 0.3, 0.4)]],
  facts: [[0, fr('AYO', 0, 2.4, -1.0, 10, 1.4, 0.6)]],
  next: [[0, fr('AYO', -1.4, 2.0, 1.6, 6.5, 0.4, -0.4)]],
  ask: [[0, fr('AYO', 0.2, 1.6, 1.6, 6, 0.4, 0.4)]],
};
const CUT = new Set(['hook1', 'ay0', 'bt1', 'st1', 'bw1', 'pr1', 'cl1', 'facts', 'ask']);
const PUSHK = { hook1: 0.82, hook2: 0.86, vm2: 0.85, vm3: 0.8, bt4: 0.86, bw5: 0.86, pr2: 0.82, pr3: 0.8, cl2: 0.84 };
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, PUSHK[id] || 0.93);
      const cut = j === 0 ? CUT.has(id) : !!sg[2];
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1], prev.look[2] - f.look[2]) > 10; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.2 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

const BG = { court: ['#3a2410', '#c99a5a'], ayo: ['#3a2a5a', '#e8a86a'], night: ['#0a0c1e', '#2a2a5a'], field: ['#4a7ab0', '#bfe0f0'], dusk: ['#1a1030', '#6a3a5a'], storm: ['#0c0a1a', '#3a3050'], road: ['#4a6a9a', '#c8b890'] };
Object.assign(ATMO, { court: ['#ffe0a0', 0.08, 0.12, 60, 0, '#ffe0b0', 0.8, '#ffb060', 0.08, 0.8], night: ['#bfd8ff', 0.1, 0.1, 70, 1, '#9fb0ff', 0.9, '#2a2a8a', 0.14, 0], field: ['#fff4c0', 0.08, 0.12, 60, 0, '#fff0d0', 0.8, '#ffd080', 0.06, 1], dusk: ['#d0a0ff', 0.1, 0.1, 70, 1, '#c890ff', 0.9, '#5a2a8a', 0.16, 0], storm: ['#c8d0ff', 0.08, -0.6, 110, 0, '#a0b0ff', 1.1, '#2a2a6a', 0.18, 0], road: ['#fff0c0', 0.08, 0.12, 50, 0, '#ffe8c0', 0.8, '#ffc070', 0.07, 1] });
function sceneOf(t) {
  const id = beatAt(t);
  if (['cover', 'end'].includes(id) || id.startsWith('bw') || id.startsWith('wd')) return 'court';
  if (['hook1', 'hook2'].includes(id) || id.startsWith('pr')) return 'road';
  if (id.startsWith('bt')) return 'sid';
  if (id.startsWith('st')) return 'mit';
  return 'ayo';
}
function bgKey(t) { const sc = sceneOf(t), id = beatAt(t); if (sc === 'sid') return 'night'; if (sc === 'mit') return 'field'; if (sc === 'road') return (id === 'pr5' && rel(t, 'pr5') > 3.2) ? 'road' : 'storm'; if (['cl2', 'next', 'ay0'].includes(id)) return 'dusk'; return sc; }
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const say = (o, txt, o2) => BUB.push(Object.assign({ o, txt, c: '#fff', dy: 2.1 }, o2 || {}));
function resetFig(ch) { ch.rotation.set(0, ch.rotation.y, 0); rest(ch); ch.userData.head.rotation.set(0, 0, 0); ch.userData.eyes.forEach((e) => (e.scale.y = 1)); }
const pop = (o, s0, tb, t) => { const k = U.easeBack(sm(tb, tb + 0.45, t)); o.scale.setScalar(Math.max(0.001, s0 * k)); o.visible = k > 0.01; return k; };
/* bow state: 0 in chest, 1 lifted, 2 strung/drawn, 3 broken */
function bowState(t) {
  if (t < at('bw4')) return { lift: 0, draw: 0, brk: 0 };
  const lift = inB(t, 'bw4') ? U.easeIO(sm(0.6, 2.4, rel(t, 'bw4'))) : 1;
  const draw = inB(t, 'bw5') ? sm(0.4, 2.6, rel(t, 'bw5')) : t >= end('bw5') ? 1 : 0;
  const brk = inB(t, 'bw5') ? sm(2.8, 3.6, rel(t, 'bw5')) : t >= end('bw5') ? 1 : 0;
  return { lift, draw, brk };
}
const BRK = () => at('bw5', 2.8);

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), sc = sceneOf(t), bk = bgKey(t);
  { const LT = { court: [0.7, 0.85, '#ffe8c8'], ayo: [0.7, 0.85, '#ffe0b0'], night: [0.45, 0.5, '#9fb0ff'], field: [0.8, 0.9, '#fff8e8'], dusk: [0.45, 0.55, '#c8a0ff'], storm: [0.45, 0.55, '#b0b8ff'], road: [0.75, 0.9, '#fff0d8'] }[bk];
    s.hemi.intensity = LT[0]; s.sun.intensity = LT[1]; s.sun.color.set(LT[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = 40; s.fog.far = 125;
  s.sparks.forEach((q) => (q.visible = false)); s.flash.visible = false;

  /* ---------- Ayodhya ---------- */
  { const A = s.ay, on = sc === 'ayo';
    [A.f, A.king, A.glow, ...A.pr, ...A.q].forEach((o) => vis(o, on)); [A.being, A.pot, A.vis, A.ram, A.lak, ...A.babies, ...A.orbs].forEach((o) => vis(o, false));
    if (on) {
      const night = ['cl2', 'next'].includes(id), fireOn = !night && !['ay0', 'cl1', 'ask', 'vm2', 'vm3'].includes(id) && !(id === 'facts'); vis(A.f, fireOn); A.glow.visible = fireOn; if (inB(t, 'ay1')) { const fk = pop(A.f, 1.3, at('ay1', 0.6), t); A.glow.visible = fk > 0.3; }
      fireTick(A.f, t); A.glow.material.opacity = 0.5 + 0.08 * Math.sin(t * 5);
      resetFig(A.king); setSit(A.king, true); anjali(A.king); place(A.king, 'AYO', 0, 0, -2.2); face(A.king, 0, 1); A.king.rotation.z = 0;
      if (id === 'ay0') { A.pr.forEach((p) => (p.visible = false)); A.king.userData.head.rotation.x = 0.35; rest(A.king); if (rel(t, 'ay0') > 2.2) say(A.king, '…', { dy: 2.0 }); }
      const QP = [[-3.1, 0.9], [3.1, 0.9], [3.4, -1.2]]; A.q.forEach((q, i) => { resetFig(q); setSit(q, false); place(q, 'AYO', QP[i][0], 0, QP[i][1]); face(q, -QP[i][0] * 0.4, -1); });
      /* being + pot */
      const bOn = inB(t, 'ay2') || inB(t, 'ay3') || inB(t, 'ay4');
      if (bOn) { const k = pop(A.being, 1.35, at('ay2', 0.6), t); place(A.being, 'AYO', 0, 0.5 + 0.6 * U.easeOut(sm(at('ay2', 0.6), at('ay2', 1.6), t)), -0.1); face(A.being, 0, 1); resetFig(A.being); A.being.userData.arms.L.rotation.set(-1.2, 0, 0.4); A.being.userData.arms.R.rotation.set(-1.2, 0, -0.4);
        A.pot.visible = k > 0.5; A.being.getWorldPosition(A.pot.position); A.pot.position.y += 1.15; A.pot.position.z += 0.65; A.glow.scale.setScalar(5 + k * 3); }
      /* babies */
      if (between(t, 'ay5', 'ay7')) { const BP = [[-2.5, 1.6], [3.0, -0.4], [2.4, 1.7], [3.0, 1.9]], BT = [at('ay6', 0.4), at('ay6', 1.4), at('ay5', 1.6), at('ay5', 2.0)]; A.babies.forEach((b, i) => { pop(b, 1, BT[i], t); place(b, 'AYO', BP[i][0], 0.95, BP[i][1]); b.rotation.y = 0; }); A.q.forEach((q) => { q.userData.arms.L.rotation.set(-1.1, 0, 0.5); q.userData.arms.R.rotation.set(-1.1, 0, -0.5); }); }
      if (inB(t, 'ay7')) { vis(A.ram, true); vis(A.lak, true); A.babies.forEach((b) => (b.visible = false)); resetFig(A.ram); resetFig(A.lak); A.ram.scale.setScalar(0.85); A.lak.scale.setScalar(0.8); const w = sm(0, dur('ay7'), rel(t, 'ay7')); const x = U.lerp(-1.6, 1.9, w); place(A.ram, 'AYO', x, 0, 3.5); place(A.lak, 'AYO', x - 1.0, 0, 3.7); face(A.ram, 1, 0.9); face(A.lak, 1, 0.9); walk(A.ram, t, 1); walk(A.lak, t + 0.1, 1); if (rel(t, 'ay7') > 1.4) say(A.lak, 'รอด้วย!', { dy: 1.7 }); }
      /* vishvamitra */
      if (between(t, 'vm1', 'vm4')) { vis(A.vis, true); resetFig(A.vis); const k = inB(t, 'vm1') ? U.easeOut(sm(0, 2.2, rel(t, 'vm1'))) : 1; place(A.vis, 'AYO', U.lerp(-6, -1.2, k), 0, U.lerp(3, 0.4, k)); face(A.vis, 1, -0.8); if (k < 1) walk(A.vis, t, 0.8); else A.vis.userData.arms.R.rotation.set(-1.4, 0, 0.2);
        vis(A.ram, true); resetFig(A.ram); A.ram.scale.setScalar(0.85); place(A.ram, 'AYO', 1.4, 0, 0.8); face(A.ram, -0.6, -0.5);
        if (inB(t, 'vm1') && rel(t, 'vm1') > 2.4) say(A.vis, 'ขอตัวพระรามไปด้วย', { dy: 2.1 });
        if (inB(t, 'vm2')) { const r2 = rel(t, 'vm2'), fk = U.easeIO(sm(0.2, 1.0, r2)) * (1 - U.easeIO(sm(2.4, 3.2, r2))); rest(A.king); A.king.rotation.order = 'YXZ'; A.king.rotation.z = fk * 1.2; A.king.userData.eyes.forEach((e) => (e.scale.y = 1 - fk * 0.9)); if (r2 > 3.2) { A.king.userData.arms.L.rotation.set(0, 0, -1.4); A.king.userData.arms.R.rotation.set(0, 0, 1.4); say(A.king, 'ลูกยังเด็กนัก!', { dy: 2.2 }); } }
        if (inB(t, 'vm3')) { anjali(A.king); A.king.position.y += Math.sin(t * 40) * 0.012; A.king.userData.head.rotation.x = 0.15; if (rel(t, 'vm3') > 1.0) say(A.king, 'อย่าเอาเขาไปเลย', { dy: 2.2 }); }
        if (inB(t, 'vm4')) { rest(A.king); A.king.userData.head.rotation.x = 0.4; vis(A.lak, true); resetFig(A.lak); A.lak.scale.setScalar(0.8); const k3 = U.easeOut(sm(0.6, 2.4, rel(t, 'vm4'))); place(A.lak, 'AYO', U.lerp(4, 2.4, k3), 0, U.lerp(2.6, 1.2, k3)); face(A.lak, -1, -0.3); if (k3 < 1) walk(A.lak, t, 1); else A.lak.userData.arms.R.rotation.set(0, 0, 2.6); if (rel(t, 'vm4') > 2.6) say(A.lak, 'ข้าไปด้วย!', { dy: 1.7 }); } }
      /* cliff: Kaikeyi with two boons */
      if (night) { const kq = A.q[2]; resetFig(kq); place(kq, 'AYO', -1.4, 0, 1.6); face(kq, 0.2, 1); kq.userData.arms.R.rotation.set(-1.3, 0, -0.2); kq.userData.head.rotation.x = 0.1; A.q[0].visible = false; A.q[1].visible = false; A.king.visible = false; A.pr.forEach((p) => (p.visible = false));
        const ok = id === 'next' ? 1 : sm(2.0, 3.0, rel(t, 'cl2')); A.orbs.forEach((o, i) => { o.visible = ok > 0.02; o.scale.setScalar(ok * (0.9 + 0.1 * Math.sin(t * 4 + i))); kq.getWorldPosition(o.position); o.position.x += 0.55 + i * 0.4; o.position.y += 1.25 + Math.sin(t * 2 + i) * 0.08; o.position.z += 0.5; }); }
      if (id === 'cl1') { rest(A.king); setSit(A.king, false); place(A.king, 'AYO', 0, 0, -2.4); A.king.userData.arms.R.rotation.set(-1.3, 0, -0.3); vis(A.ram, true); resetFig(A.ram); A.ram.scale.setScalar(1.0); setSit(A.ram, true); anjali(A.ram); place(A.ram, 'AYO', 0, 0, -0.6); face(A.ram, 0, -1); A.pr.forEach((p) => (p.visible = false)); }
      if (id === 'ask' || id === 'facts') { rest(A.king); setSit(A.king, false); place(A.king, 'AYO', -0.5, 0, 1.4); face(A.king, 0.3, 1); vis(A.ram, true); resetFig(A.ram); A.ram.scale.setScalar(0.8); place(A.ram, 'AYO', 0.7, 0, 1.7); face(A.ram, -0.3, 1); A.king.userData.arms.R.rotation.set(0, 0, 1.2); A.pr.forEach((p) => (p.visible = false)); if (id === 'ask') say(A.king, '?', { dy: 2.0, big: true }); }
    } }

  /* ---------- Siddhashrama ---------- */
  { const D = s.sd, on = sc === 'sid'; [D.f, D.vis, ...D.r2, D.ram, D.lak, D.fglow].forEach((o) => vis(o, on)); vis(D.mar, false); vis(D.sub, false); D.arrow.visible = false; D.splash.visible = false;
    if (on) {
      fireTick(D.f, t); D.fglow.material.opacity = 0.5 + 0.1 * Math.sin(t * 6);
      resetFig(D.vis); setSit(D.vis, true); anjali(D.vis); place(D.vis, 'SID', 0, 0, -2.8); face(D.vis, 0, 1);
      D.r2.forEach((r, i) => { resetFig(r); setSit(r, true); anjali(r); place(r, 'SID', i ? 1.8 : -1.8, 0, -1.8); face(r, i ? -1 : 1, 0.3); });
      resetFig(D.ram); resetFig(D.lak); place(D.ram, 'SID', -0.8, 0, 1.4); place(D.lak, 'SID', 1.0, 0, 1.6); face(D.ram, 0.3, -1); face(D.lak, -0.2, -1);
      const M0 = [-1.9, 3.3, -3.8], S0 = [2.0, 3.1, -4.0];
      if (inB(t, 'bt1') || inB(t, 'bt2') || inB(t, 'bt3')) {
        const k = inB(t, 'bt1') ? U.easeOut(sm(0.6, 2.6, rel(t, 'bt1'))) : 1;
        vis(D.mar, true); resetFig(D.mar); setP(D.mar, 'SID', U.lerp(-8, M0[0], k), U.lerp(7, M0[1], k) + Math.sin(t * 3) * 0.15, M0[2]); face(D.mar, 0.5, 1); D.mar.userData.arms.L.rotation.set(0, 0, -2.4); D.mar.userData.arms.R.rotation.set(0, 0, 2.4);
        vis(D.sub, true); resetFig(D.sub); setP(D.sub, 'SID', U.lerp(8, S0[0], k), U.lerp(7, S0[1], k) + Math.sin(t * 3 + 1) * 0.15, S0[2]); face(D.sub, -0.5, 1); D.sub.userData.arms.L.rotation.set(0, 0, -2.4); D.sub.userData.arms.R.rotation.set(0, 0, 2.4);
        if (inB(t, 'bt1') && rel(t, 'bt1') > 2.6) say(D.mar, 'แหลกแน่!', { dy: 2.2 });
        D.ram.userData.arms.L.rotation.set(-1.5, 0, -0.3); }
      if (inB(t, 'bt2')) { const r = rel(t, 'bt2'); face(D.ram, -0.4, -1); D.ram.userData.arms.R.rotation.set(-1.4, 0, 0.6 * sm(0.3, 0.9, r));
        const a = s.tmpA, b = s.tmpB; D.ram.getWorldPosition(a); a.y += 1.2; D.mar.getWorldPosition(b); b.y += 1.0;
        if (r > 1.0 && r < 1.6) { aimBeam(D.arrow, a, b, sm(1.0, 1.4, r)); }
        if (r > 1.4) { const u = U.easeOut(sm(1.4, 4.2, r)); setP(D.mar, 'SID', U.lerp(M0[0], 30, u), M0[1] + Math.sin(u * Math.PI) * 6 - u * 3, U.lerp(M0[2], -22, u)); D.mar.rotation.z = u * 12; D.mar.scale.setScalar(1.2 * (1 - u * 0.6)); if (r < 2.6) say(D.mar, 'อ๊ากกก!', { dy: 2.2 }); } }
      if (inB(t, 'bt3')) { vis(D.mar, false); const r = rel(t, 'bt3'); D.ram.userData.arms.R.rotation.set(-1.4, 0, 0.6); const a = s.tmpA, b = s.tmpB; D.ram.getWorldPosition(a); a.y += 1.2; D.sub.getWorldPosition(b); b.y += 1.0; if (r > 0.4 && r < 1.0) aimBeam(D.arrow, a, b, sm(0.4, 0.7, r));
        const fk = sm(0.8, 1.6, r); if (fk > 0) { D.sub.scale.setScalar(Math.max(0.001, 1.15 * (1 - fk))); s.sparks.forEach((q, j) => { if (fk < 1) { q.visible = true; q.position.copy(b).add(s.tmpA.set(Math.sin(j * 2.2) * fk * 1.2, Math.cos(j * 1.3) * fk * 1.2, 0)); q.material.opacity = 1 - fk; } }); }
        if (r > 2.0) { D.vis.userData.arms.L.rotation.set(0, 0, -2.4); D.vis.userData.arms.R.rotation.set(0, 0, 2.4); say(D.vis, 'สำเร็จแล้ว!', { dy: 1.8 }); } }
      if (inB(t, 'bt4')) { const r = rel(t, 'bt4'); vis(D.mar, true); resetFig(D.mar); setP(D.mar, 'SID', 18 + Math.sin(t) * 0.2, -0.3 + Math.sin(t * 1.6) * 0.1, -10); face(D.mar, -0.3, 1); D.mar.scale.setScalar(1.0); D.mar.rotation.z = 0.25; D.mar.userData.eyes.forEach((e) => (e.scale.y = r < 1.8 ? 0.15 : 1));
        D.splash.visible = r < 1.2; setP(D.splash, 'SID', 18, 0.3, -10); D.splash.material.opacity = 0.8 * (1 - r / 1.2); if (r > 2.2) say(D.mar, 'แค้นนี้ต้องชำระ…', { dy: 2.0 }); }
    } }

  /* ---------- Mithila field ---------- */
  { const F = s.mt, on = sc === 'mit'; [F.jan, F.plough, ...F.ox].forEach((o) => vis(o, on)); vis(F.glow, false); vis(F.baby, false); vis(F.urn, false);
    if (on) {
      const k = inB(t, 'st1') ? sm(0, dur('st1'), rel(t, 'st1')) : 1, z = U.lerp(4, -0.6, k);
      F.ox.forEach((o, i) => { setP(o, 'MIT', -0.5 + i * 0.9, 0, z - 3.0); o.rotation.y = Math.PI; o.position.y += Math.abs(Math.sin(t * 5 + i)) * 0.04 * (k < 1 ? 1 : 0); });
      setP(F.plough, 'MIT', 0, 0, z - 1.2); F.plough.rotation.y = Math.PI;
      resetFig(F.jan); setP(F.jan, 'MIT', 0, 0, z); face(F.jan, 0, -1); F.jan.userData.arms.L.rotation.set(-1.0, 0, 0.3); F.jan.userData.arms.R.rotation.set(-1.0, 0, -0.3); if (k < 1) F.jan.position.y += Math.abs(Math.sin(t * 5)) * 0.03;
      if (inB(t, 'st2')) { const r = rel(t, 'st2'); face(F.jan, 0.4, 0.8); F.glow.visible = true; setP(F.glow, 'MIT', 0.8, 0.4, 0.6); F.glow.material.opacity = 0.7 + 0.2 * Math.sin(t * 4); pop(F.baby, 1.1, at('st2', 0.6), t); setP(F.baby, 'MIT', 0.8, 0.15, 0.6); F.baby.rotation.y = -0.6;
        if (r > 2.0) { F.jan.userData.arms.L.rotation.set(-0.9, 0, 0.6); F.jan.userData.arms.R.rotation.set(-0.9, 0, -0.6); say(F.jan, 'ลูกใครกัน?', { dy: 2.2 }); } }
    } }

  /* ---------- Janaka's court ---------- */
  { const C = s.ct, on = sc === 'court'; const bs = bowState(t);
    [C.jan, C.cart, C.bow, ...C.crowd].forEach((o) => vis(o, on)); [C.sita, C.vis, C.ram, C.lak, C.das, ...C.kings, ...C.pull, ...C.ropes, ...C.petals, ...C.garl].forEach((o) => vis(o, false));
    if (on) {
      resetFig(C.jan); setSit(C.jan, true); face(C.jan, 0, 1);
      /* cart position: dragged in during bw3 / cover, otherwise centre */
      const drag = id === 'cover' ? 0.45 : inB(t, 'bw3') ? U.easeIO(sm(0.4, dur('bw3') - 0.6, rel(t, 'bw3'))) : t >= end('bw3') ? 1 : 0;
      const cartZ = U.lerp(7, -1.8, drag); setP(C.cart, 'COURT', 0, 0, cartZ);
      const pulling = id === 'cover' || inB(t, 'bw3');
      if (pulling) { C.pull.forEach((p, i) => { p.visible = true; resetFig(p); const row = i % 2, n = Math.floor(i / 2); setP(p, 'COURT', (row ? 1 : -1) * 0.75, 0, cartZ - 2.6 - n * 0.75); face(p, 0, -1); p.rotation.x = -0.18; walk(p, t * 0.7 + i, 0.6); p.userData.arms.L.rotation.set(-1.2, 0, -0.1); p.userData.arms.R.rotation.set(-1.2, 0, 0.1); });
        C.ropes.forEach((ln, i) => { ln.visible = true; const x = (i ? 1 : -1) * 0.75, pa = ln.geometry.attributes.position; pa.setXYZ(0, ST.COURT[0] + x, 0.7, ST.COURT[2] + cartZ - 2.0); pa.setXYZ(1, ST.COURT[0] + x, 0.7, ST.COURT[2] + cartZ - 2.6 - 11 * 0.75); pa.needsUpdate = true; }); }
      /* lid opens before the lift */
      C.cart.userData.lid.visible = id === 'cover' || inB(t, 'bw3');
      /* crowd at sides */
      C.crowd.forEach((p, i) => { resetFig(p); const sx = i % 2 ? 1 : -1, n = Math.floor(i / 2); setP(p, 'COURT', sx * (3.4 + (n % 2) * 0.9), 0, -5 + n * 1.6); face(p, -sx, 0.2);
        if (t >= BRK() && t < end('bw6')) { const fk = sm(BRK(), BRK() + 0.5, t) * (1 - sm(end('bw6') - 1.2, end('bw6'), t)); p.rotation.order = 'YXZ'; p.rotation.x = -fk * 1.3; }
        if (between(t, 'wd1', 'wd2')) { p.userData.arms.L.rotation.set(0, 0, -2.4 - Math.sin(t * 6 + i) * 0.3); p.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 6 + i) * 0.3); } });
      /* kings trying */
      if (inB(t, 'bw2')) { const r = rel(t, 'bw2'); const cur = Math.min(2, Math.floor(r / 1.6)); C.kings.forEach((kg, i) => { kg.visible = true; resetFig(kg); setP(kg, 'COURT', -1.6 + i * 1.6, 0, 0.9 + (i === cur ? -0.4 : 0.4)); face(kg, 0, -1);
          if (i === cur) { const sw = Math.sin(t * 14) * 0.05; kg.rotation.x = 0.25 + sw; kg.userData.arms.L.rotation.set(-2.0, 0, 0.3); kg.userData.arms.R.rotation.set(-2.0, 0, -0.3); say(kg, 'หนักกก!', { dy: 2.1 }); } else if (i < cur) { kg.rotation.order = 'YXZ'; kg.rotation.x = -0.5; kg.userData.head.rotation.x = 0.4; } }); }
      /* rama + co */
      const ramaOn = t >= at('bw1');
      if (ramaOn) { vis(C.vis, true); vis(C.ram, true); vis(C.lak, true); resetFig(C.vis); resetFig(C.ram); resetFig(C.lak); setP(C.vis, 'COURT', -2.4, 0, 1.0); face(C.vis, 0.6, -1); setP(C.lak, 'COURT', 2.4, 0, 1.2); face(C.lak, -0.5, -1);
        const near = t >= at('bw4'); setP(C.ram, 'COURT', near ? 0 : -1.3, 0, near ? 0.3 : 1.9); face(C.ram, near ? 0 : 0.3, near ? 1 : -1); }
      /* bow */
      const B0 = C.bow; B0.rotation.set(0, 0, 0); B0.userData.L.position.set(0, 0, 0); B0.userData.R.position.set(0, 0, 0); B0.userData.L.rotation.set(0, 0, 0); B0.userData.R.rotation.set(0, 0, Math.PI / 2); B0.userData.str.visible = false; B0.userData.grip.visible = true;
      const chestTop = s.tmpA.set(ST.COURT[0], 1.68, ST.COURT[2] + cartZ);
      const hk2 = false; const lift = hk2 ? U.easeIO(sm(0.6, 2.2, rel(t, 'hook2'))) : bs.lift, draw = hk2 ? sm(2.2, 3.6, rel(t, 'hook2')) : bs.draw, brk = hk2 ? 0 : bs.brk;
      if (lift <= 0) { B0.position.copy(chestTop); B0.rotation.x = -Math.PI / 2; B0.rotation.z = Math.PI / 2; B0.scale.setScalar(1); }
      else { const held = s.tmpB.set(ST.COURT[0], 1.75, ST.COURT[2] + 0.95); B0.position.lerpVectors(chestTop, held, lift); B0.rotation.x = U.lerp(-Math.PI / 2, 0, lift); B0.rotation.z = U.lerp(Math.PI / 2, 0, lift);
        C.ram.userData.arms.L.rotation.set(-0.4 * lift, 0, -2.5 * lift); C.ram.userData.arms.R.rotation.set(-0.4 * lift, 0, 2.5 * lift);
        if (draw > 0) { B0.userData.str.visible = true; C.ram.userData.arms.R.rotation.set(-0.9, 0, 2.5 - 1.6 * draw); const sa = B0.userData.str.geometry.attributes.position; sa.setXYZ(1, 0, -0.5 * draw, 0); sa.needsUpdate = true; B0.userData.L.rotation.z = -0.12 * draw; B0.userData.R.rotation.z = Math.PI / 2 + 0.12 * draw; }
        if (brk > 0) { B0.userData.str.visible = false; B0.userData.grip.visible = false; B0.userData.L.position.set(1.4 * brk, -0.6 * brk, 0.3 * brk); B0.userData.L.rotation.z = -1.4 * brk; B0.userData.R.position.set(-1.4 * brk, -0.6 * brk, 0.3 * brk); B0.userData.R.rotation.z = Math.PI / 2 + 1.4 * brk; }
        if (hk2 && rel(t, 'hook2') > 3.5) { s.flash.visible = true; s.flash.position.copy(B0.position).add(s.tmpA.set(0, 1.4, 0.3)); s.flash.scale.setScalar(4 + Math.sin(t * 30) * 0.5); s.flash.material.opacity = 0.9; } }
      if (t >= BRK() && t < BRK() + 0.8) { const u = sm(BRK(), BRK() + 0.8, t); s.flash.visible = true; s.flash.position.copy(B0.position).add(s.tmpA.set(0, 1.4, 0.3)); s.flash.scale.setScalar(4 + u * 12); s.flash.material.opacity = 1 - u; }
      if (t >= end('bw6')) B0.visible = false;
      if (inB(t, 'bw1')) { C.jan.userData.arms.R.rotation.set(-1.3, 0, 0.3); }
      if (inB(t, 'bw6') && rel(t, 'bw6') > 0.6) say(C.jan, 'ไม่น่าเชื่อ!', { dy: 2.2 });
      if (between(t, 'wd1', 'wd2')) { vis(C.das, true); resetFig(C.das); const kd = inB(t, 'wd1') ? U.easeOut(sm(0.3, 3.0, rel(t, 'wd1'))) : 1; setP(C.das, 'COURT', U.lerp(0, -1.6, kd), 0, U.lerp(7, 1.6, kd)); face(C.das, kd < 1 ? 0 : 0.6, -1); if (kd < 1) walk(C.das, t, 1); else { C.das.userData.arms.L.rotation.set(0, 0, -2.0); C.das.userData.arms.R.rotation.set(0, 0, 2.0); }
        if (inB(t, 'wd1') && rel(t, 'wd1') > 3.2) say(C.das, 'ลูกพ่อ!', { dy: 2.1 }); }
      /* sita + wedding */
      if (t >= at('bw1')) { vis(C.sita, true); resetFig(C.sita); const wed = t >= at('wd2'); const k = wed ? U.easeIO(sm(0, 2.0, rel(t, 'wd2'))) : 0; setP(C.sita, 'COURT', U.lerp(1.6, 0.9, k), 0, U.lerp(-6.6, 0.3, k)); face(C.sita, wed ? -1 : 0, wed ? 0.2 : 1); if (k > 0 && k < 1) walk(C.sita, t, 0.6);
        if (wed) { setP(C.ram, 'COURT', -0.3, 0, 0.3); face(C.ram, 1, 0.2); rest(C.ram); C.garl.forEach((gl, i) => { gl.visible = k >= 1; const who = i ? C.ram : C.sita; who.getWorldPosition(gl.position); gl.position.y += 1.05 * (who.scale.y || 1); }); }
        if (inB(t, 'bw1') && rel(t, 'bw1') > 2.6) say(C.sita, '…', { dy: 2.0 }); }
      if (inB(t, 'wd2')) C.petals.forEach((p, i) => { p.visible = true; const u = (t * 0.15 + i * 0.137) % 1; setP(p, 'COURT', -4 + (i * 2.3) % 8, 6 - u * 6, -4 + (i * 1.7) % 6); p.rotation.set(t + i, t * 0.7, 0); });
    } }

  /* ---------- road home: Parashurama ---------- */
  { const D = s.rd, on = sc === 'road'; [D.das, D.ram, D.lak, D.par, D.car].forEach((o) => vis(o, on)); D.vbow.visible = false; D.glow.visible = false; D.bolt.visible = false;
    if (on) {
      const hk = id === 'hook1' || id === 'hook2';
      resetFig(D.das); resetFig(D.ram); resetFig(D.lak); resetFig(D.par);
      place(D.car, 'ROAD', -4.2, 0, 2.6); D.car.rotation.y = 0.25;
      place(D.das, 'ROAD', -1.2, 0, 1.2); face(D.das, 0.3, -1); place(D.ram, 'ROAD', 0.5, 0, 0.3); face(D.ram, -0.1, -1); place(D.lak, 'ROAD', 1.5, 0, 1.7); face(D.lak, -0.3, -1);
      const pk = inB(t, 'pr1') ? U.easeOut(sm(0.6, dur('pr1') - 0.8, rel(t, 'pr1'))) : 1; place(D.par, 'ROAD', 0, 0, U.lerp(-12, -3.4, pk)); face(D.par, 0, 1); if (pk < 1) walk(D.par, t, 0.7);
      D.par.userData.arms.R.rotation.set(0, 0, 2.6); D.par.userData.axe.rotation.z = 0.2;
      if (inB(t, 'pr1') && rel(t, 'pr1') < 0.9) { s.flash.visible = true; s.flash.position.set(ST.ROAD[0] - 3, 9, ST.ROAD[2] - 14); s.flash.scale.setScalar(14); s.flash.material.opacity = 0.8 * (1 - rel(t, 'pr1') / 0.9); }
      if (inB(t, 'pr2')) { const r = rel(t, 'pr2'); D.par.userData.arms.R.rotation.set(-0.3, 0, 2.9); D.par.position.y += Math.max(0, Math.sin(r * 2)) * 0.05; if (r > 1.6) say(D.par, 'เจ้าหักธนูพระศิวะ?', { dy: 2.2 }); D.lak.userData.arms.R.rotation.set(-1.0, 0, -0.4); }
      const beg = hk || inB(t, 'pr3') || inB(t, 'pr4');
      if (beg) { setSit(D.das, true); anjali(D.das); D.das.userData.head.rotation.x = 0.06; D.das.position.y += Math.sin(t * 38) * 0.012; face(D.das, 0.6, -1);
        if (id === 'hook1' && rel(t, 'hook1') > 1.6) say(D.das, 'ขอชีวิตลูกข้าเถิด…', { dy: 1.7 }); if (inB(t, 'pr3') && rel(t, 'pr3') > 1.4) say(D.das, 'ขอชีวิตลูกข้าเถิด', { dy: 1.7 }); }
      if (inB(t, 'pr4') || inB(t, 'pr5')) { const r = inB(t, 'pr4') ? rel(t, 'pr4') : 99; D.vbow.visible = true; const B0 = D.vbow; B0.rotation.set(0, 0, 0); B0.userData.L.rotation.set(0, 0, 0); B0.userData.R.rotation.set(0, 0, Math.PI / 2); B0.userData.str.visible = false;
        const pA = s.tmpA.set(ST.ROAD[0] + 0.6, 1.9, ST.ROAD[2] - 2.6), pB = s.tmpB.set(ST.ROAD[0] + 0.5, 1.8, ST.ROAD[2] - 0.5); const mk2 = U.easeIO(sm(1.4, 3.4, r)); B0.position.lerpVectors(pA, pB, mk2); B0.rotation.y = 0;
        D.par.userData.arms.L.rotation.set(-1.4 * (1 - mk2 * 0.6), 0, -0.3); if (inB(t, 'pr4') && r > 2.2) say(D.par, 'ลองขึ้นสายดูสิ', { dy: 2.2 });
        D.glow.visible = true; D.glow.position.copy(B0.position); D.glow.material.opacity = 0.5 + 0.1 * Math.sin(t * 6); }
      if (inB(t, 'pr5')) { const r = rel(t, 'pr5'), B0 = D.vbow, dr = U.easeIO(sm(0.4, 1.4, r)); D.ram.userData.arms.L.rotation.set(-0.4, 0, -2.4); D.ram.userData.arms.R.rotation.set(-0.9, 0, 2.5 - 1.6 * dr);
        B0.userData.str.visible = true; const sa = B0.userData.str.geometry.attributes.position; sa.setXYZ(1, 0, -0.5 * dr, 0); sa.needsUpdate = true; B0.position.set(ST.ROAD[0] + 0.5, 1.8, ST.ROAD[2] - 0.5);
        D.glow.scale.setScalar(4 + dr * 4); rest(D.das); setSit(D.das, false); D.das.userData.head.rotation.x = 0;
        const back = U.easeOut(sm(1.6, 3.2, r)); place(D.par, 'ROAD', back * 1.6, 0, -3.4 - back * 1.2); face(D.par, -back * 0.6, 1); D.par.userData.arms.R.rotation.set(0, 0, U.lerp(2.6, 0.4, back)); D.par.userData.head.rotation.x = back * 0.3; D.par.userData.arms.L.rotation.set(0, 0, 0);
        if (r > 2.0 && r < 3.2) say(D.par, '…', { dy: 2.2 }); if (r > 3.6) { say(D.das, 'ลูกข้า…', { dy: 2.1 }); } }
    } }

  /* camera + shake + bubbles */
  VE.camAt(CAM, t, camera, 0.12);
  atmoUpdate(t, s, bk, camera, sc === 'road' ? 1 : 0.8);
  if (inB(t, 'vm4') && rel(t, 'vm4') < 1.2) { const q = 1 - rel(t, 'vm4') / 1.2; camera.position.x += Math.sin(t * 55) * 0.1 * q; camera.position.y += Math.sin(t * 43) * 0.08 * q; }
  if (t > BRK() && t < BRK() + 0.7) { camera.position.x += Math.sin(t * 60) * 0.12; camera.position.y += Math.sin(t * 47) * 0.1; }
  camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
}
