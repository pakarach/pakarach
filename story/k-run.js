/* story kit: declarative scenes -> setup, camera, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK] }; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const BG = { day: ['#4a7ab0', '#cfe6f4'], palace: ['#3a2a5a', '#e8a86a'], hall: ['#2a1408', '#b07a3a'], dusk: ['#1a1030', '#6a3a5a'], night: ['#0a0c1e', '#2a2a5a'], forest: ['#2a5a6a', '#bfe0c8'], lanka: ['#140c2a', '#5a3a6a'],
  storm: ['#0c0a1a', '#3a3050'], sea: ['#2a5a9a', '#bfe0f4'], fire: ['#2a0a08', '#a03a1a'], dawn: ['#3a3a7a', '#ffc89a'], grove: ['#0e1a2a', '#3a5a5a'], heaven: ['#5a7ad0', '#fff0d0'], sky: ['#3a7ad0', '#d8ecff'], war: ['#2a1418', '#8a4a3a'] };
Object.assign(ATMO, {
  day: ['#fff4c0', 0.08, 0.12, 50, 0, '#fff0d0', 0.8, '#ffd080', 0.06, 1], palace: ['#ffe0a0', 0.08, 0.12, 60, 0, '#ffe0b0', 0.8, '#ffb060', 0.08, 0.8], hall: ['#ffd090', 0.08, 0.1, 60, 0, '#ffd0a0', 0.9, '#ff9a4a', 0.1, 0.5],
  dusk: ['#d0a0ff', 0.1, 0.1, 70, 1, '#c890ff', 0.9, '#5a2a8a', 0.16, 0], night: ['#bfd8ff', 0.1, 0.1, 70, 1, '#9fb0ff', 0.9, '#2a2a8a', 0.14, 0], forest: ['#e8ffc0', 0.08, 0.1, 60, 0, '#fff0c0', 0.8, '#a0d070', 0.06, 1],
  storm: ['#c8d0ff', 0.08, -0.6, 110, 0, '#a0b0ff', 1.1, '#2a2a6a', 0.18, 0], sea: ['#ffffff', 0.08, 0.1, 40, 0, '#fff0d0', 0.8, '#70b0ff', 0.06, 1], fire: ['#ff9a3a', 0.15, 0.9, 140, 0, '#ffb070', 1.0, '#c0401a', 0.14, 0],
  dawn: ['#ffd0a0', 0.08, 0.1, 60, 1, '#ffc090', 0.9, '#ff8a6a', 0.1, 0.7], grove: ['#c0ffd0', 0.1, 0.1, 80, 1, '#a0c0ff', 0.9, '#2a5a6a', 0.14, 0], heaven: ['#ffe6a0', 0.1, 0.15, 90, 0, '#ffe8b0', 1.0, '#ffb84a', 0.08, 1],
  sky: ['#ffffff', 0.1, -0.4, 80, 0, '#fff0d0', 0.8, '#80c0ff', 0.06, 0.6], war: ['#ff8a5a', 0.12, 0.5, 120, 0, '#ffb080', 1.0, '#a03a2a', 0.14, 0],
});
const LT = { day: [0.8, 0.9, '#fff8e8'], palace: [0.7, 0.85, '#ffe0b0'], hall: [0.55, 0.8, '#ffd0a0'], dusk: [0.45, 0.55, '#c8a0ff'], night: [0.42, 0.5, '#9fb0ff'], forest: [0.75, 0.85, '#fff4d8'], lanka: [0.5, 0.65, '#d0b0ff'],
  storm: [0.45, 0.55, '#b0b8ff'], sea: [0.8, 0.9, '#fff8e8'], fire: [0.5, 0.75, '#ffb070'], dawn: [0.6, 0.75, '#ffc8a0'], grove: [0.45, 0.6, '#b0d0ff'], heaven: [0.85, 0.9, '#fff0d0'], sky: [0.85, 0.9, '#ffffff'], war: [0.55, 0.75, '#ffb090'] };

/* resolve scene specs (inheritance) */
const RES = (() => {
  const out = {}; let prev = null;
  for (const id of ORDER) {
    const sc = SC[id] || {}; const st = sc.st || (prev && prev.st) || Object.keys(ST)[0];
    const same = prev && prev.st === st && !sc.fresh;
    const A = {};
    if (same) for (const k in prev.A) { const a = prev.A[k]; if (!a) continue; const n = Object.assign({}, a); if (a.to) { n.p = [a.to[0], a.to[1], a.to[4] != null ? a.to[4] : (a.p[2] || 0)]; } delete n.to; delete n.say; delete n.pop; delete n.fall; delete n.fly; if (a.fall) n.fallen = true; A[k] = n; }
    for (const k in (sc.A || {})) { const a = sc.A[k]; if (a === null) { delete A[k]; continue; } A[k] = Object.assign({}, A[k] || {}, a); if (a.p && !a.to) delete A[k].to; if (a.p && !a.on) delete A[k].on; if (a.on && !a.p) delete A[k].p; if (a.pose === undefined && sc.A[k].keepPose === undefined && A[k].pose && sc.A[k].p) { /* keep pose */ } }
    let cam = sc.cam; if (cam && typeof cam[0] === 'number') cam = [cam.length >= 7 ? cam : [0].concat(cam)]; // flat: [lx,ly,lz,d,h,sx] or [t,lx,ly,lz,d,h,sx]
    if (!cam) cam = (prev && prev.st === st) ? [[0].concat(prev.cam[prev.cam.length - 1].slice(1))] : [[0, 0, 1.8, 0, 9, 0.8, 0.6]];
    const r = { id, st, bg: sc.bg || (same ? prev.bg : (prev && prev.st === st ? prev.bg : 'day')), cam, cut: sc.cut != null ? sc.cut : (!prev || prev.st !== st), A, fx: sc.fx, sc };
    out[id] = r; prev = r;
  }
  return out;
})();
const SHOT = {}; const CUT = new Set();
for (const id of ORDER) { const r = RES[id]; SHOT[id] = r.cam.map((c) => [c[0], fr(r.st, c[1], c[2], c[3], c[4], c[5], c[6]), !!c[7]]); if (r.cut && id !== 'cover') CUT.add(id); }
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k) });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id], pk = (SC[id] && SC[id].push) || 0.93;
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, pk);
      const cut = j === 0 ? CUT.has(id) : sg[2];
      if (prev) { if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); } else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1], prev.look[2] - f.look[2]) > 10; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.2 : 1.1, (t1 - t0) * 0.45) }, f)); } }
      else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
const sceneOf = (t) => RES[beatAt(t)].st;
const bgKey = (t) => { const r = RES[beatAt(t)]; const b = r.sc.bgAt ? r.sc.bgAt(rel(t, r.id)) : null; return b || r.bg; };
function bgAt(t) { return BG[bgKey(t)] || BG.day; }

/* setup */
function setupScene(scene) {
  const s = { o: {} };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#a9b4ff', 40, 125); s.fog = scene.fog;
  for (const st in ENV) for (const e of ENV[st]) { const objs = ENVB[e[0]](st, e[1] || {}); objs.forEach((o) => scene.add(o)); }
  for (const k in CAST) { const c = CAST[k]; const o = CF[c[0]](c[1], c[2], c[3]); o.userData.s0 = o.scale.x; o.userData.key = k; o.visible = false; scene.add(o); s.o[k] = o; }
  atmoSetup(scene, s);
  s.anchorV = new T.Vector3(); s.tmpA = new T.Vector3(); s.tmpB = new T.Vector3(); s.tmpC = new T.Vector3();
  return s;
}
const BUB = [];
const say = (o, txt, o2) => BUB.push(Object.assign({ o, txt, c: '#fff', dy: 2.1 }, o2 || {}));
const isFig = (o) => !!(o.userData && o.userData.arms);
const POSE = {
  anjali: (c) => anjali(c), point: (c) => point(c, 1), up: (c) => { c.userData.arms.L.rotation.set(0, 0, -2.6); c.userData.arms.R.rotation.set(0, 0, 2.6); },
  wave: (c, r, t) => c.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 8) * 0.3), hips: (c) => { c.userData.arms.L.rotation.set(0, 0, -0.9); c.userData.arms.R.rotation.set(0, 0, 0.9); },
  cry: (c, r, t) => { c.userData.arms.L.rotation.set(-2.3, 0, 0.55); c.userData.arms.R.rotation.set(-2.3, 0, -0.55); c.userData.head.rotation.x = 0.35; c.position.y += Math.abs(Math.sin(t * 6)) * 0.02; },
  hold: (c) => { c.userData.arms.L.rotation.set(-1.25, 0, 0.35); c.userData.arms.R.rotation.set(-1.25, 0, -0.35); },
  give: (c) => { c.userData.arms.R.rotation.set(-1.3, 0, -0.1); }, reach: (c) => { c.userData.arms.L.rotation.set(-1.5, 0, 0.1); c.userData.arms.R.rotation.set(-1.5, 0, -0.1); },
  draw: (c, r, t, a) => { const k = a.drawK != null ? a.drawK : 1; c.userData.arms.L.rotation.set(-1.5, 0, 0.0); c.userData.arms.R.rotation.set(-1.5 + 0.2 * k, 0, -0.9 * k); },
  sword: (c) => { c.userData.arms.R.rotation.set(-0.4, 0, 2.7); }, fist: (c, r, t) => { c.userData.arms.R.rotation.set(-0.6 - Math.max(0, Math.sin(t * 6)) * 0.6, 0, 2.2); c.userData.arms.L.rotation.set(0, 0, -0.9); },
  think: (c) => { c.userData.arms.R.rotation.set(-2.1, 0, -0.6); c.userData.head.rotation.z = 0.15; }, down: (c) => { c.userData.head.rotation.x = 0.4; },
  bless: (c) => { c.userData.arms.R.rotation.set(-1.0, 0, 0.9); }, shrug: (c) => { c.userData.arms.L.rotation.set(-0.3, 0, -1.2); c.userData.arms.R.rotation.set(-0.3, 0, 1.2); },
  whisper: (c, r, t) => { c.userData.arms.R.rotation.set(-2.0, 0, -0.5); c.userData.head.rotation.z = -0.2; c.userData.head.rotation.x = 0.15 + Math.sin(t * 5) * 0.03; },
  lift: (c) => { c.userData.arms.L.rotation.set(0, 0, -2.9); c.userData.arms.R.rotation.set(0, 0, 2.9); }, fly: (c) => { c.userData.arms.L.rotation.set(0, 0, -2.9); c.userData.arms.R.rotation.set(0, 0, 2.9); c.rotation.x = 0.6; },
  sleep: (c) => { c.userData.eyes.forEach((e) => (e.scale.y = 0.1)); c.userData.head.rotation.x = 0.3; },
  embrace: (c) => { c.userData.arms.L.rotation.set(-1.3, 0, 0.9); c.userData.arms.R.rotation.set(-1.3, 0, -0.9); },
};
const H = {
  hand(o, side) { const v = new T.Vector3(); o.updateMatrixWorld(true); o.userData.arms[side || 'R'].userData.hand.getWorldPosition(v); return v; },
  pos(o, dy) { const v = new T.Vector3(); o.getWorldPosition(v); v.y += (dy || 0) * (o.scale.y || 1); return v; },
  aim(b, from, to, k) { aimBeam(b, from, to, k); },
  at(st, x, y, z) { return new T.Vector3(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z); },
};
function applyActor(t, s, st, id, key, a, r) {
  const o = s.o[key]; if (!o) return; if (a.hide) { o.visible = false; return; } o.visible = true;
  const fig = isFig(o), V = fig && o.userData.vinyl; if (V) { o.userData.setExpr(a.ex || (a.pose === 'cry' ? 'cry' : a.lie || a.fall || a.fallen ? 'sleepy' : 'happy')); o.userData.tick(t); }
  if (fig) { o.rotation.set(0, 0, 0); rest(o); o.userData.head.rotation.set(0, 0, 0); o.userData.head.visible = true; o.userData.arms.L.scale.setScalar(1); o.userData.arms.R.scale.setScalar(1); o.userData.eyes.forEach((e) => (e.scale.y = 1)); if (!V) setSit(o, !!a.sit); }
  else o.rotation.set(0, 0, 0);
  const p = a.p || [0, 0, 0]; let x = p[0], z = p[1], y = p[2] || 0, moving = false, dir = null;
  if (a.to) { const k = U.easeIO(sm(a.to[2], a.to[3], r)); const ty = a.to[4] != null ? a.to[4] : y; dir = [a.to[0] - x, a.to[1] - z]; moving = k > 0 && k < 1; x = U.lerp(x, a.to[0], k); z = U.lerp(z, a.to[1], k); y = U.lerp(y, ty, k); }
  if (a.bob) y += Math.sin(t * 2 + key.length) * a.bob;
  if (a.on) { const tgt = s.o[a.on[0]]; let v; if (a.on[1] === 'R' || a.on[1] === 'L') v = H.hand(tgt, a.on[1]); else { v = H.pos(tgt, a.on[1] === 'head' ? 1.5 : 0.8); } o.position.set(v.x + (a.on[2] || 0), v.y + (a.on[3] || 0), v.z + (a.on[4] || 0)); }
  else place(o, st, x, y, z);
  if (V && a.sit) o.position.y -= 0.25 * o.userData.s0;
  const s0 = a.s != null ? a.s : o.userData.s0; if (a.pop != null) pop(o, s0, at(id) + a.pop, t); else o.scale.setScalar(s0);
  if (a.out != null) { const k = 1 - sm(a.out, a.out + 0.4, r); o.scale.multiplyScalar(Math.max(0.001, k)); if (k <= 0.01) o.visible = false; }
  const f = a.f; if (typeof f === 'number') o.rotation.y = f * Math.PI / 180; else if (Array.isArray(f)) face(o, f[0], f[1]); else if (typeof f === 'string' && s.o[f]) { const q = s.o[f].position; face(o, q.x - o.position.x, q.z - o.position.z); } else if (moving && dir) face(o, dir[0], dir[1]);
  if (a.rot) { o.rotation.x += a.rot[0]; o.rotation.y += a.rot[1]; o.rotation.z += a.rot[2]; }
  if (a.spin) o.rotation.y += t * a.spin;
  if (fig) {
    const pose = typeof a.pose === 'function' ? a.pose : POSE[a.pose]; if (pose) pose(o, r, t, a);
    if ((moving && !a.glide) || a.walk) walk(o, t, 1);
    if (a.head) { o.userData.head.rotation.x = a.head[0]; o.userData.head.rotation.y = a.head[1] || 0; }
    if (a.closed) o.userData.eyes.forEach((e) => (e.scale.y = 0.1));
    if (o.userData.tail) o.userData.tail.rotation.z = Math.sin(t * 2 + key.length) * 0.25;
  }
  if (a.lie) { o.rotation.order = 'YXZ'; o.rotation.x = -Math.PI / 2 * (a.lie === true ? 1 : a.lie); o.position.y += 0.42 * o.scale.y; }
  if (a.fall || a.fallen) { const k = a.fallen ? 1 : Math.pow(sm(a.fall[0], a.fall[1], r), 2); o.rotation.order = 'YXZ'; o.rotation.z = (a.fallDir || 1) * 1.4 * k; }
  if (a.shake) o.position.x += Math.sin(t * 40) * a.shake;
  if (o.userData.isFire) fireTick(o, t);
  if (o.userData.fires) o.userData.fires.forEach((ff) => fireTick(ff, t + ff.position.x));
  if (o.userData.wings) o.userData.wings.forEach((w, i) => (w.rotation.z = (i ? -1 : 1) * Math.sin(t * (a.flap || 6)) * 0.5));
  if (o.userData.legs && moving) o.userData.legs.forEach((l, i) => (l.rotation.x = Math.sin(t * 14 + i * 1.6) * 0.5));
  if (a.say) { const list = Array.isArray(a.say[0]) ? a.say : [a.say]; for (const q of list) if (r >= (q[1] || 0) && r < (q[2] != null ? q[2] : 999)) say(o, q[0], { dy: a.dy || (V ? (a.sit ? 2.7 : 2.95) : fig ? (a.sit ? 1.9 : 2.1) : 2.0), big: !!q[3] }); }
}
function update(t, s, { camera, W, H: HH }) {
  BUB.length = 0; const id = beatAt(t), R = RES[id], r = rel(t, id), bk = bgKey(t);
  const lt = LT[bk] || LT.day; s.hemi.intensity = lt[0] * (EP.light || 1); s.sun.intensity = lt[1] * (EP.light ? 1 + (EP.light - 1) / 2 : 1); s.sun.color.set(lt[2]);
  s.fog.color.set(bgAt(t)[1]); s.fog.near = 40; s.fog.far = 125;
  for (const k in s.o) s.o[k].visible = false;
  const keys = Object.keys(R.A).sort((a, b) => (R.A[a].on ? 1 : 0) - (R.A[b].on ? 1 : 0));
  for (const k of keys) applyActor(t, s, R.st, id, k, R.A[k], r);
  if (R.fx) R.fx(r, t, s, s.o, R.st);
  VE.camAt(CAM, t, camera, 0.12); window.__cam = camera;
  atmoUpdate(t, s, bk, camera, R.sc.motes || 0.8);
  const sk = R.sc.shake; if (sk && r > sk[0] && r < sk[1]) { const q = 1 - (r - sk[0]) / (sk[1] - sk[0]); camera.position.x += Math.sin(t * 55) * (sk[2] || 0.1) * q; camera.position.y += Math.sin(t * 43) * (sk[2] || 0.1) * 0.8 * q; }
  camera.updateMatrixWorld(true); window.__dbg = { s: s.o, camera };
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * HH; }
}
const pop = (o, s0, tb, t) => { const k = U.easeBack(sm(tb, tb + 0.45, t)); o.scale.setScalar(Math.max(0.001, s0 * k)); o.visible = k > 0.01; return k; };
