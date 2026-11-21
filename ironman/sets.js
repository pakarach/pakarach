/* Iron Man (2008) story + analysis — part 1: grade, helpers, sets. Joined with story.js by mk.sh into one IIFE.
   No suit, mask or chest light is modelled anywhere: characters are plain figurines, the armour stays under a drape, flight is a streak of light. */
const T = THREE, U = VE.u, F = MK.frame(), W = F.W, H = F.H, PI = Math.PI, sh = MK.sh;
const GR = { key: '#ffc890', rim: '#4f9dff', haze: '#070b14', floor: '#0d1018', accent: '#ffc65c', fog: 0.024 }, AC = GR.accent;
let seed = 5; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function bx(g, w, h, d, c, x, y, z, o) { o = o || {}; const m = sh(new T.Mesh(MK.rbox(w, h, d, o.r == null ? 0.05 : o.r), o.m || (o.mat || MK.matte)(c, o.mo)), o.cast, o.recv); m.position.set(x, y, z); if (o.ry) m.rotation.y = o.ry; if (o.rz) m.rotation.z = o.rz; if (o.rx) m.rotation.x = o.rx; g.add(m); return m; }
function cy(g, rt, rb, h, c, x, y, z, o) { o = o || {}; const m = sh(new T.Mesh(new T.CylinderGeometry(rt, rb, h, o.seg || 24), o.m || (o.mat || MK.matte)(c, o.mo)), o.cast, o.recv); m.position.set(x, y, z); if (o.rx) m.rotation.x = o.rx; if (o.rz) m.rotation.z = o.rz; g.add(m); return m; }
function sp(g, r, c, x, y, z, o) { o = o || {}; const m = sh(new T.Mesh(new T.SphereGeometry(r, 24, 18), o.m || (o.mat || MK.matte)(c, o.mo)), o.cast, o.recv); m.position.set(x, y, z); if (o.s) m.scale.set(o.s[0], o.s[1], o.s[2]); g.add(m); return m; }
function em(g, w, h, d, c, k, x, y, z, o) { return bx(g, w, h, d, c, x, y, z, Object.assign({ m: MK.emit(c, k), cast: false, recv: false, r: 0.02 }, o)); }
function lampAt(g, c, p, s, x, y, z) { const l = MK.lamp(c, p, s); l.position.set(x, y, z); l.userData.base = 1; g.add(l); return l; }
function fig(g, o, x, z, turn, y) { const f = MK.figure(o); f.userData.y0 = y == null ? 0.24 : y; f.position.set(x, f.userData.y0, z); f.rotation.order = 'YXZ'; f.rotation.y = turn == null ? -0.9 : turn; f.userData.home = [x, z, f.rotation.y]; g.add(f); return f; }
function drape(g, h, c, x, z) { const m = sh(new T.Mesh(MK.lathe([[0.95, 0], [0.74, h * 0.38], [0.58, h * 0.76], [0.3, h * 0.96], [0.001, h]]), MK.matte(c, { side: T.DoubleSide }))); m.position.set(x, 0.24, z); g.add(m); return m; }
function label(g, x, y, z, w, h) { return em(g, w || 0.36, h || 0.2, 0.02, '#e9e4d6', 0.5, x, y, z); }
function streak(g, c, len, power) { const k = new T.Group(), s = MK.glow(c, 1, 1); s.scale.set(len, len * 0.2, 1); k.add(s); const h = MK.glow('#ffffff', len * 0.34, 1); k.add(h); const p = new T.PointLight(MK.LIN(c).getHex(), power, 10, 1.6); k.add(p); k.userData.k = (v) => { s.material.opacity = v; h.material.opacity = v; p.intensity = power * v; k.visible = v > 0.01; }; g.add(k); return k; }

const CAST = {
  tony: { coat: '#3a4352', hair: '#231b17' }, yin: { coat: '#7b6a54', hair: '#77736d', h: 1.5 }, raza: { coat: '#262a26', hair: '#101010', build: 1.12 },
  rhodey: { coat: '#4f5b3c', hair: '#15110f', hat: '#3e4930' }, pepper: { coat: '#e2dbcb', hair: '#5a3a28', long: true, h: 1.5, build: 0.9 },
  obad: { coat: '#5d6675', hair: '#7f838a', build: 1.18, h: 1.7 }, guard: { coat: '#2f332c', hair: '#151515' }, soldier: { coat: '#4a5438', hair: '#1a1512', hat: '#3e4930' },
};
const EXTRA = ['#3d3a44', '#4a4038', '#35404a', '#463a3f', '#3a4636', '#4d4a42', '#2f3944', '#44383a'];

function setDesert() {
  const g = MK.set(13, 7.5, '#57482f'), S = { g };
  for (const [x, s] of [[-5, 3.2], [0.5, 4.4], [5.5, 3]]) sp(g, 1, '#42361f', x, 0.2, -3.9, { s: [s * 1.6, s * 0.42, s * 0.7], cast: false });
  const truck = (x, z) => { const k = new T.Group(); bx(k, 2.7, 0.8, 1.35, '#3f4a30', 0, 0.85, 0, { r: 0.12, mat: MK.resin }); bx(k, 1.25, 0.62, 1.25, '#3f4a30', -0.4, 1.52, 0, { r: 0.12, mat: MK.resin }); bx(k, 0.5, 0.36, 1.27, '#10141a', 0.02, 1.52, 0, { r: 0.04, mat: MK.metal });
    for (const sx of [-0.85, 0.85]) for (const sz of [-0.66, 0.66]) cy(k, 0.34, 0.34, 0.26, '#141518', sx, 0.34, sz, { rx: PI / 2, mat: MK.resin }); sp(k, 0.09, '#fff', 1.36, 0.95, 0.4, { m: MK.emit('#ffe6b0', 3) }); sp(k, 0.09, '#fff', 1.36, 0.95, -0.4, { m: MK.emit('#ffe6b0', 3) }); k.position.set(x, 0.24, z); g.add(k); return k; };
  S.t1 = truck(-3.4, -1.0); S.t2 = truck(2.6, -1.5); S.head = lampAt(g, '#ffe0a8', 0.7, 0.5, -1.9, 1.2, -1.0);
  for (let i = 0; i < 6; i++) sp(g, 0.25 + rnd() * 0.3, '#4c4030', -6 + rnd() * 12, 0.34, 1.8 + rnd() * 1.6, { s: [1.3, 0.7, 1] });
  S.shell = new T.Group(); cy(S.shell, 0.15, 0.15, 0.8, '#8b9099', 0, 0, 0, { rz: PI / 2, mat: MK.metal }); sp(S.shell, 0.15, '#8b9099', 0.4, 0, 0, { mat: MK.metal, s: [1.5, 1, 1] }); label(S.shell, 0, 0.02, 0.15, 0.4, 0.16); S.shell.position.set(0.9, 0.5, 1.5); S.shell.rotation.y = 0.35; S.shell.scale.setScalar(1.7); g.add(S.shell);
  S.boom = lampAt(g, '#ff8a3a', 3.2, 5, 2.6, 1.4, -0.6); S.boom.userData.k(0);
  S.scrap = new T.Group(); for (let i = 0; i < 7; i++) bx(S.scrap, 0.3 + rnd() * 0.5, 0.12 + rnd() * 0.2, 0.3 + rnd() * 0.4, '#6d7078', -1.4 + rnd() * 2.8, 0.34, -0.6 + rnd() * 1.6, { mat: MK.metal, ry: rnd() * 3, rz: rnd() * 0.5 }); g.add(S.scrap);
  S.heli = new T.Group(); const hb = MK.beam('#cfe4ff', 7.5, 2.6, 0.2); S.heli.add(hb); S.heli.add(MK.glow('#cfe4ff', 2.2, 0.9)); S.heli.position.set(0.4, 7.6, 0.6); S.heli.userData.beam = hb; g.add(S.heli);
  S.tony = fig(g, CAST.tony, -0.9, 0.5); S.sol1 = fig(g, CAST.soldier, 0.7, 1.0, -1.3); S.sol2 = fig(g, CAST.soldier, -2.4, 1.3, -0.6); S.rhodey = fig(g, CAST.rhodey, 4.6, 1.2, -2.3);
  S.bokeh = MK.bokeh(34, [44, 10, 6], ['#cfe0ff', '#ffffff', '#ffd9a0'], 0.7); S.bokeh.position.set(0, 4, -24); g.add(S.bokeh);
  S.dust = MK.dust(80, [9, 4.5, 5], '#ffe0b0'); S.dust.position.set(0, 0.3, 0); g.add(S.dust);
  return S;
}

function setCave() {
  const g = MK.set(11.5, 7.5, '#2a2420'), S = { g };
  bx(g, 11.5, 5.2, 0.6, '#2b2521', 0, 2.8, -3.4); bx(g, 0.6, 5.2, 5.4, '#27211d', -5.5, 2.8, -0.9); bx(g, 0.6, 5.2, 3, '#27211d', 5.5, 2.8, -2.1);
  for (let i = 0; i < 16; i++) sp(g, 0.7 + rnd() * 0.8, '#332b25', -5.6 + rnd() * 11.2, 4.3 + rnd() * 1.2, -3.2 + rnd() * 0.6, { s: [1.3, 0.8, 0.8] });
  for (let i = 0; i < 7; i++) sp(g, 0.5 + rnd() * 0.5, '#302823', (i % 2 ? 5.2 : -5.2), 0.5 + rnd() * 3.5, -2.8 + rnd() * 2.4);
  cy(g, 0.44, 0.34, 0.75, '#2a2b2e', -3.6, 0.62, -1.9, { mat: MK.metal }); sp(g, 0.34, '#fff', -3.6, 1.0, -1.9, { m: MK.emit('#ff7a2a', 3), s: [1, 0.45, 1], cast: false });
  S.fire = lampAt(g, '#ff8a3a', 1.7, 2.4, -3.6, 1.35, -1.9);
  bx(g, 3.2, 0.14, 1.15, '#4a3a2c', 0.9, 1.02, -2.0, { mat: MK.resin }); for (const x of [-0.5, 2.3]) bx(g, 0.14, 0.72, 1.0, '#32271e', x, 0.6, -2.0);
  for (const [x, w] of [[0.1, 0.3], [1.5, 0.5], [2.0, 0.22]]) bx(g, w, 0.1, 0.2, '#74777d', x, 1.14, -1.8, { mat: MK.metal, ry: rnd() });
  S.core = new T.Group(); sp(S.core, 0.09, '#fff', 0, 0, 0, { m: MK.emit('#c8ecff', 5), cast: false }); S.coreL = MK.lamp('#9fdcff', 0.8, 0.55); S.core.add(S.coreL); S.core.position.set(0.9, 1.2, -1.85); g.add(S.core);
  bx(g, 0.62, 0.42, 0.36, '#1b1d21', -1.7, 0.45, 0.5, { mat: MK.resin }); cy(g, 0.04, 0.04, 0.1, '#b9772e', -1.85, 0.7, 0.5, { mat: MK.metal }); cy(g, 0.04, 0.04, 0.1, '#b9772e', -1.55, 0.7, 0.5, { mat: MK.metal });
  cy(g, 0.025, 0.025, 1.0, '#101114', -2.2, 0.62, 0.62, { rz: PI / 2.4 }); bx(g, 2.2, 0.22, 0.95, '#3a352e', -3.2, 0.5, 0.9, { r: 0.08 });
  for (const [x, y, z] of [[3.7, 0.6, -2.5], [4.5, 0.6, -2.4], [4.1, 1.3, -2.5], [4.7, 0.6, -1.5]]) { bx(g, 0.75, 0.68, 0.75, '#3b4032', x, y, z, { r: 0.04 }); label(g, x, y + 0.05, z + 0.39, 0.34, 0.14); }
  S.drape = drape(g, 2.5, '#4a4136', 2.9, -0.2);
  bx(g, 0.25, 2.8, 1.5, '#23262b', 5.2, 1.64, 0.9, { mat: MK.metal }); S.slit = em(g, 0.06, 0.12, 0.5, '#ffd9a0', 2.5, 5.05, 2.2, 0.9);
  S.blast = lampAt(g, '#ffb060', 3.4, 5.5, 4.6, 1.6, 1.0); S.blast.userData.k(0);
  S.tony = fig(g, CAST.tony, -2.6, 1.9, -0.8); S.yin = fig(g, CAST.yin, -1.1, 0.9, -1.2); S.raza = fig(g, CAST.raza, 3.6, 1.7, -2.4); S.guard = fig(g, CAST.guard, 4.4, 2.6, -2.5);
  S.dust = MK.dust(90, [9, 4.6, 5], '#ffb070'); S.dust.position.set(0, 0.3, -0.3); g.add(S.dust);
  return S;
}

function setPress() {
  const g = MK.set(12.5, 7.5, '#22252c'), S = { g };
  bx(g, 12.5, 4.8, 0.4, '#1a2130', 0, 2.64, -3.4); bx(g, 5.4, 2.3, 0.1, '#283a58', 0, 3.1, -3.15, { r: 0.03 });
  bx(g, 5.6, 0.3, 2.3, '#2b2f38', 0, 0.39, -2.0, { r: 0.06 });
  bx(g, 0.95, 1.1, 0.6, '#3a3f4b', 0, 1.09, -1.5, { mat: MK.resin, r: 0.08 }); cy(g, 0.015, 0.015, 0.4, '#101114', 0.15, 1.8, -1.5, { mat: MK.metal }); sp(g, 0.05, '#101114', 0.15, 2.02, -1.5, { mat: MK.metal });
  S.lamps = [lampAt(g, '#ffe6c0', 0.9, 1.5, -2.8, 4.5, -1.2), lampAt(g, '#ffe6c0', 0.9, 1.5, 2.8, 4.5, -1.2)];
  for (const x of [-2.8, 2.8]) { bx(g, 0.4, 0.3, 0.4, '#15171c', x, 4.72, -1.2, { mat: MK.metal }); const b = MK.beam('#ffe6c0', 4.3, 1.5, 0.1); b.position.set(x, 4.5, -1.2); g.add(b); }
  S.rep = []; for (let i = 0; i < 9; i++) { const r = fig(g, { coat: EXTRA[i % 8], hair: ['#1b1512', '#3a2a1e', '#6b6a68'][i % 3], h: 1.42 + (i % 3) * 0.06, long: i % 4 === 1 }, -3.6 + (i % 5) * 1.8 + (i > 4 ? 0.9 : 0), i > 4 ? 3.3 : 2.3, PI / 2 + (rnd() - 0.5) * 0.3); S.rep.push(r); }
  S.fl = []; for (let i = 0; i < 7; i++) { const s = MK.glow('#ffffff', 0.7, 0); s.position.set(-3.6 + rnd() * 7.2, 1.85 + rnd() * 0.25, 2.0 + rnd() * 1.4); s.userData.ph = rnd() * 10; g.add(s); S.fl.push(s); }
  S.tony = fig(g, CAST.tony, 0, -2.25, -PI / 2, 0.54); S.obad = fig(g, CAST.obad, 1.9, -2.3, -PI / 2 - 0.25, 0.54); S.rhodey = fig(g, CAST.rhodey, -2.1, -2.3, -PI / 2 + 0.3, 0.54);
  S.burger = new T.Group(); sp(S.burger, 0.09, '#c9903f', 0, 0.03, 0, { s: [1, 0.55, 1], mat: MK.resin }); sp(S.burger, 0.095, '#5a3a22', 0, 0, 0, { s: [1, 0.3, 1] }); sp(S.burger, 0.09, '#c9903f', 0, -0.03, 0, { s: [1, 0.4, 1], mat: MK.resin }); S.burger.position.set(0.02, -0.62, 0); S.tony.userData.P.armL.add(S.burger);
  S.card = bx(S.tony.userData.P.armR, 0.02, 0.2, 0.14, '#f1ecdf', 0.03, -0.66, 0, { r: 0.005 });
  S.dust = MK.dust(60, [9, 4.6, 5], '#ffe6c0'); S.dust.position.set(0, 0.3, -0.5); g.add(S.dust);
  return S;
}

function setShop() {
  const g = MK.set(12.5, 7.5, '#1d2127'), S = { g };
  bx(g, 5.4, 4.6, 0.4, '#161d27', 3.55, 2.54, -3.4); bx(g, 3.2, 4.6, 0.4, '#161d27', -4.65, 2.54, -3.4); bx(g, 4, 1.0, 0.4, '#161d27', -1.1, 4.34, -3.4);
  S.scr = []; for (const [x, y, w] of [[2.0, 2.7, 1.1], [3.3, 2.9, 1.3], [4.7, 2.6, 1.0]]) S.scr.push(em(g, w, 0.72, 0.05, '#48b6ff', 1.3, x, y, -3.1));
  S.scrL = lampAt(g, '#58bfff', 1.0, 2.0, 3.3, 2.7, -2.4);
  bx(g, 4.2, 0.14, 1.2, '#39414e', 3.2, 1.02, -2.2, { mat: MK.metal }); for (const x of [1.4, 5.0]) bx(g, 0.14, 0.72, 1.0, '#252a33', x, 0.6, -2.2);
  for (const [x, w] of [[2.2, 0.4], [3.6, 0.6], [4.5, 0.25]]) bx(g, w, 0.09, 0.22, '#7b8088', x, 1.14, -2.1, { mat: MK.metal, ry: rnd() });
  const arm = new T.Group(); cy(arm, 0.3, 0.34, 0.3, '#2b3038', 0, 0.15, 0, { mat: MK.metal }); S.a1 = new T.Group(); S.a1.position.y = 0.3; arm.add(S.a1); const s1 = sh(new T.Mesh(MK.capsule(0.09, 1.2), MK.resin('#c9ced6'))); S.a1.add(s1);
  S.a2 = new T.Group(); S.a2.position.y = 1.15; S.a1.add(S.a2); const s2 = sh(new T.Mesh(MK.capsule(0.07, 0.95), MK.resin('#c9ced6'))); S.a2.add(s2); bx(S.a2, 0.05, 0.22, 0.05, '#2b3038', 0, 1.02, 0.07, { mat: MK.metal }); bx(S.a2, 0.05, 0.22, 0.05, '#2b3038', 0, 1.02, -0.07, { mat: MK.metal });
  arm.position.set(-0.3, 0.24, -2.75); g.add(arm);
  S.drape = drape(g, 2.6, '#39404b', 4.9, -0.5); S.under = lampAt(g, '#9fdcff', 0.5, 1.6, 4.9, 0.5, -1.5);
  bx(g, 0.62, 1.0, 0.62, '#2b3038', -1.6, 0.74, -1.7, { mat: MK.resin }); S.case = new T.Group(); const gl = new T.Mesh(MK.rbox(0.5, 0.5, 0.5, 0.04), new T.MeshPhysicalMaterial({ color: 0xbfd8ff, transparent: true, opacity: 0.2, roughness: 0.05, metalness: 0, envMapIntensity: 1.2, depthWrite: false })); S.case.add(gl);
  sp(S.case, 0.085, '#fff', 0, -0.05, 0, { m: MK.emit('#c8ecff', 5), cast: false }); S.caseL = MK.lamp('#9fdcff', 0.9, 0.6); S.case.add(S.caseL); bx(S.case, 0.3, 0.04, 0.2, '#b08a3c', 0, -0.22, 0.1, { mat: MK.metal }); S.case.position.set(-1.6, 1.5, -1.7); g.add(S.case);
  bx(g, 2.3, 0.45, 0.95, '#4a2f2a', -4.3, 0.47, 0.2, { mat: MK.resin, r: 0.12 }); bx(g, 2.3, 0.85, 0.28, '#4a2f2a', -4.3, 0.9, -0.2, { mat: MK.resin, r: 0.12 });
  S.hand = new T.Group(); sp(S.hand, 0.085, '#fff', 0, 0, 0, { m: MK.emit('#c8ecff', 5), cast: false }); S.handL = MK.lamp('#9fdcff', 0.9, 0.6); S.hand.add(S.handL); g.add(S.hand);
  S.tony = fig(g, CAST.tony, 2.4, -0.7, -1.0); S.pepper = fig(g, CAST.pepper, 3.6, -0.2, -1.6); S.obad = fig(g, CAST.obad, -2.6, 1.9, -2.6); S.stranger = fig(g, { coat: '#1c1d22', hair: '#101010', build: 1.1, h: 1.7 }, -3.4, -1.4, -0.6);
  S.bokeh = MK.bokeh(30, [26, 6, 5], ['#ffb060', '#6fb7ff', '#ffe0a8', '#ff7a6a'], 1.7); S.bokeh.position.set(-1, 2.2, -20); g.add(S.bokeh);
  S.dust = MK.dust(70, [9, 4.4, 5], '#cfe6ff'); S.dust.position.set(0, 0.3, -0.5); g.add(S.dust);
  return S;
}

function setVillage() {
  const g = MK.set(13, 7.5, '#473c2c'), S = { g };
  for (const [x, w, h] of [[-4.3, 2.7, 2.0], [-0.9, 2.5, 2.5], [2.6, 2.6, 1.9]]) { bx(g, w, h, 2.2, '#57483a', x, 0.24 + h / 2, -2.5, { r: 0.1 }); bx(g, w + 0.2, 0.14, 2.4, '#463a2e', x, 0.24 + h + 0.05, -2.5); bx(g, 0.6, 1.2, 0.1, '#231c16', x - 0.5, 0.84, -1.38); em(g, 0.5, 0.42, 0.06, '#ffb868', 1.6, x + 0.6, 1.5, -1.38); }
  S.win = lampAt(g, '#ffb060', 0.9, 2.0, -0.6, 1.6, -0.9);
  S.crates = new T.Group(); for (const [x, y, z] of [[4.6, 0.6, 0.2], [5.4, 0.6, 0.0], [5.0, 1.3, 0.1], [4.9, 0.6, 1.0]]) { bx(S.crates, 0.75, 0.68, 0.75, '#3b4032', x, y, z, { r: 0.04 }); label(S.crates, x, y + 0.05, z + 0.39, 0.34, 0.14); } g.add(S.crates);
  S.boom = lampAt(g, '#ff8a3a', 3.4, 5.5, 4.9, 1.3, 0.6); S.boom.userData.k(0);
  S.vil = [fig(g, { coat: EXTRA[1], hair: '#2a211b', h: 1.45 }, -3.4, 0.5, -0.7), fig(g, { coat: EXTRA[4], hair: '#1b1512', h: 1.5, long: true }, -2.4, 1.1, -0.8), fig(g, { coat: EXTRA[7], hair: '#1b1512', h: 1.05 }, -1.6, 0.6, -0.8)];
  S.gun = [fig(g, CAST.guard, 0.9, 0.7, -2.5), fig(g, CAST.raza, 2.0, 1.4, -2.4)];
  S.st = streak(g, '#ffe9c0', 3.2, 1.6); S.j1 = streak(g, '#bcd8ff', 1.3, 0.3); S.j2 = streak(g, '#bcd8ff', 1.3, 0.3);
  S.bokeh = MK.bokeh(36, [44, 10, 6], ['#cfe0ff', '#ffffff', '#ffb060'], 0.7); S.bokeh.position.set(0, 4, -24); g.add(S.bokeh);
  S.dust = MK.dust(70, [9, 4.6, 5], '#ffc890'); S.dust.position.set(0, 0.3, 0); g.add(S.dust);
  return S;
}

function setOffice() {
  const g = MK.set(10.5, 7, '#252932'), S = { g };
  for (let x = -5; x <= 5.01; x += 2.5) bx(g, 0.14, 4.6, 0.14, '#12151b', x, 2.54, -3.2); bx(g, 10.3, 0.16, 0.16, '#12151b', 0, 4.8, -3.2); bx(g, 10.3, 0.5, 0.16, '#12151b', 0, 0.5, -3.2);
  bx(g, 3.3, 0.14, 1.4, '#232832', 0.3, 1.05, -1.0); for (const x of [-1.2, 1.8]) bx(g, 0.14, 0.76, 1.2, '#1f242d', x, 0.62, -1.0);
  cy(g, 0.03, 0.03, 0.34, '#101114', 0.1, 1.3, -1.2, { mat: MK.metal }); bx(g, 1.3, 0.8, 0.06, '#101114', 0.1, 1.82, -1.2, { mat: MK.metal, r: 0.03 });
  S.scr = em(g, 1.2, 0.7, 0.02, '#6fc8ff', 1.2, 0.1, 1.82, -1.24); S.scrL = lampAt(g, '#6fc8ff', 1.3, 0.5, 0.5, 1.8, -1.55);
  cy(g, 0.16, 0.2, 0.05, '#b08a3c', -1.0, 1.15, -1.1, { mat: MK.metal }); cy(g, 0.02, 0.02, 0.45, '#b08a3c', -1.0, 1.38, -1.1, { mat: MK.metal }); S.desk = lampAt(g, '#ffd9a0', 1.0, 0.9, -1.0, 1.66, -1.1);
  bx(g, 0.9, 1.5, 0.9, '#2b2f38', -4.2, 0.99, -2.3, { mat: MK.resin, r: 0.1 });
  S.pepper = fig(g, CAST.pepper, 0.2, -2.1, -PI / 2); S.obad = fig(g, CAST.obad, 0.3, -2.1, -PI / 2); S.tony = fig(g, CAST.tony, 2.6, 0.9, -2.6);
  S.bokeh = MK.bokeh(44, [30, 8, 6], ['#ffb060', '#6fb7ff', '#ffe0a8', '#ff7a6a', '#9fd0ff'], 1.6); S.bokeh.position.set(0, 1.5, -19); g.add(S.bokeh);
  S.dust = MK.dust(50, [8, 4.2, 5], '#cfe6ff'); S.dust.position.set(0, 0.3, -0.5); g.add(S.dust);
  return S;
}

function setRoof() {
  const g = MK.set(13.5, 8, '#1b1f25'), S = { g };
  S.sky = em(g, 5.2, 0.05, 3.2, '#8fdcff', 0.9, -1.6, 0.27, 0.2); for (let x = -4.2; x <= 1.01; x += 1.3) bx(g, 0.08, 0.08, 3.3, '#10141a', x, 0.3, 0.2, { cast: false }); for (const z of [-1.4, 0.2, 1.8]) bx(g, 5.3, 0.08, 0.08, '#10141a', -1.6, 0.3, z, { cast: false });
  S.skyL = lampAt(g, '#8fdcff', 0.8, 0.01, -1.6, 0.9, 0.2);
  cy(g, 1.5, 1.6, 4.2, '#262b33', 4.4, 2.34, -1.8, { mat: MK.metal, seg: 40 }); S.rings = []; for (const y of [1.2, 2.4, 3.6]) S.rings.push(cy(g, 1.58, 1.58, 0.12, '#fff', 4.4, y, -1.8, { m: MK.emit('#9fe0ff', 1.6), cast: false, seg: 40 }));
  S.coreL = lampAt(g, '#9fe0ff', 1.4, 1.5, 4.4, 2.4, 0.0); S.up = MK.beam('#cfeeff', 11, 2.2, 0); S.up.rotation.z = PI; S.up.position.set(4.4, 4.4, -1.8); g.add(S.up);
  bx(g, 1.3, 1.0, 0.6, '#2b3038', -5.2, 0.74, -2.4, { mat: MK.resin }); for (let i = 0; i < 4; i++) em(g, 0.12, 0.05, 0.12, i === 1 ? '#ff6a5a' : '#9fe0ff', 3, -5.65 + i * 0.3, 1.27, -2.4); S.conL = lampAt(g, '#9fe0ff', 0.5, 0.9, -5.2, 1.6, -2.0);
  S.pepper = fig(g, CAST.pepper, -5.2, -1.5, -0.4); S.tony = fig(g, CAST.tony, 0.9, 0.9, -1.0);
  S.a = streak(g, '#ffe9c0', 2.4, 1.3); S.b = streak(g, '#b8d4ff', 4.2, 1.8);
  S.hit = lampAt(g, '#ffffff', 3, 4, -1.4, 3.4, 0.2); S.hit.userData.k(0);
  S.bokeh = MK.bokeh(46, [40, 7, 6], ['#ffb060', '#6fb7ff', '#ffe0a8', '#ff7a6a'], 1.5); S.bokeh.position.set(0, 0.5, -22); g.add(S.bokeh);
  S.dust = MK.dust(60, [9, 5, 5], '#cfe6ff'); S.dust.position.set(0, 0.3, 0); g.add(S.dust);
  return S;
}

function setCrew() {
  const g = MK.set(9.5, 6.5, '#23262b'), S = { g };
  bx(g, 6.2, 3.7, 0.2, '#1c2430', -0.6, 2.1, -2.8, { r: 0.04 });
  const cam = new T.Group(); for (const a of [0, 2.1, 4.2]) { const l = cy(cam, 0.03, 0.03, 1.5, '#15171c', Math.cos(a) * 0.3, 0.7, Math.sin(a) * 0.3, { mat: MK.metal }); l.rotation.z = Math.cos(a) * 0.38; l.rotation.x = -Math.sin(a) * 0.38; }
  bx(cam, 0.75, 0.5, 0.42, '#1a1c20', 0, 1.62, 0, { mat: MK.resin, r: 0.08 }); cy(cam, 0.13, 0.15, 0.36, '#101114', -0.52, 1.62, 0, { rz: PI / 2, mat: MK.metal }); cy(cam, 0.2, 0.2, 0.1, '#101114', -0.05, 2.02, 0, { rx: PI / 2, mat: MK.metal }); cy(cam, 0.2, 0.2, 0.1, '#101114', 0.3, 1.98, 0, { rx: PI / 2, mat: MK.metal });
  cam.position.set(2.6, 0.24, 0.9); cam.rotation.y = -0.5; g.add(cam);
  cy(g, 0.035, 0.035, 3.6, '#15171c', -3.9, 2.04, -0.6, { mat: MK.metal }); bx(g, 0.5, 0.4, 0.5, '#15171c', -3.7, 3.9, -0.6, { mat: MK.metal }); S.lit = lampAt(g, '#ffe6c0', 1.3, 1.6, -3.5, 3.7, -0.6); const b = MK.beam('#ffe6c0', 3.6, 1.7, 0.14); b.position.set(-3.5, 3.7, -0.6); b.rotation.z = 0.5; g.add(b);
  bx(g, 0.6, 0.06, 0.6, '#6b4630', 3.9, 0.9, 1.7, { mat: MK.resin }); bx(g, 0.6, 0.5, 0.06, '#1a1c20', 3.9, 1.4, 1.42); for (const sx of [-0.26, 0.26]) cy(g, 0.03, 0.03, 0.66, '#6b4630', 3.9 + sx, 0.57, 1.7);
  cy(g, 0.025, 0.025, 1.2, '#15171c', -2.9, 0.84, 0.5, { mat: MK.metal }); S.page = bx(g, 0.5, 0.02, 0.4, '#f1ecdf', -2.9, 1.46, 0.5, { r: 0.006, rx: 0.5 });
  S.act1 = fig(g, CAST.tony, -1.5, -0.9, -1.1); S.act2 = fig(g, CAST.obad, 0.3, -1.1, -1.9); S.dir = fig(g, { coat: '#6b5a3c', hair: '#3a2a1e', hat: '#2b2f38' }, 3.2, 0.3, -2.7);
  S.dust = MK.dust(50, [8, 4.2, 5], '#ffe6c0'); S.dust.position.set(0, 0.3, -0.3); g.add(S.dust);
  return S;
}
