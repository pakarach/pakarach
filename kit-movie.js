/* MovieKit (MK) v0.1 — look kit for the movie-story channel: a dark soundstage with miniature sets.
   Smooth resin figurines and props, ACES tone mapping, one travelling key spotlight with soft shadows, a cool rim light,
   haze, light beams, glow, dust, then a 2D finish (bloom, grain, 2.39:1 bars). Use with the fact kit for beats/sound/voice:
   node build.js film.js out.html --kit fact,movie --font "IBM Plex Sans Thai:wght@300;500"
   16:9 (1920x1080) is the default; --data cfg=port.json ({"port":true}) builds the 9:16 teaser. */
(function () {
  const MK = (window.MK = {}), T = THREE, U = VE.u, PI = Math.PI;
  const LIN = (MK.LIN = (c) => new T.Color(c).convertSRGBToLinear());
  MK.frame = function () { const PORT = !!(window.DATA && DATA.cfg && DATA.cfg.port); return { PORT, W: PORT ? 1080 : 1920, H: PORT ? 1920 : 1080, CX: PORT ? 540 : 960 }; };

  /* Colour grades: key = warm/hero light, rim = back light, haze = air + background, accent = title/keyword colour. */
  MK.GRADES = {
    noir: { key: '#ffb060', rim: '#4f7dff', haze: '#070a12', floor: '#0d0f16', accent: '#ffcf7a', fog: 0.03 },
    thriller: { key: '#ffa24d', rim: '#19c8c0', haze: '#061014', floor: '#0a1215', accent: '#ffb057', fog: 0.03 },
    horror: { key: '#bfe0c2', rim: '#3a5cff', haze: '#05090a', floor: '#080c0c', accent: '#ff4d4d', fog: 0.045 },
    romance: { key: '#ffc9a8', rim: '#ff7fb0', haze: '#150c14', floor: '#1a1018', accent: '#ffd9b8', fog: 0.024 },
    scifi: { key: '#7fe7ff', rim: '#ff4fd8', haze: '#060714', floor: '#0a0b1c', accent: '#7fe7ff', fog: 0.028 },
    adventure: { key: '#ffd98a', rim: '#6fb7ff', haze: '#0c1018', floor: '#14161c', accent: '#ffd98a', fog: 0.022 },
    war: { key: '#e6d9b0', rim: '#7d93a6', haze: '#0b0d0c', floor: '#111311', accent: '#e6d9b0', fog: 0.036 },
  };

  /* ---------- materials (colours given in sRGB hex) ---------- */
  MK.resin = (c, o) => new T.MeshPhysicalMaterial(Object.assign({ color: LIN(c), roughness: 0.4, clearcoat: 0.55, clearcoatRoughness: 0.3, envMapIntensity: 0.8 }, o));
  MK.matte = (c, o) => new T.MeshStandardMaterial(Object.assign({ color: LIN(c), roughness: 0.88, envMapIntensity: 0.25 }, o));
  MK.metal = (c, o) => new T.MeshStandardMaterial(Object.assign({ color: LIN(c), roughness: 0.3, metalness: 0.9 }, o));
  MK.emit = (c, k, o) => new T.MeshStandardMaterial(Object.assign({ color: 0x000000, emissive: LIN(c), emissiveIntensity: k == null ? 2 : k }, o));
  const sh = (MK.sh = (m, cast, recv) => { m.castShadow = cast !== false; m.receiveShadow = recv !== false; return m; });

  /* ---------- geometry ---------- */
  MK.rbox = function (w, h, d, r) { // rounded box, centred, y up
    r = Math.min(r == null ? 0.06 : r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001);
    const s = new T.Shape(), x = w / 2 - r, y = h / 2 - r;
    s.moveTo(-x, -h / 2 + r); s.lineTo(x, -h / 2 + r); s.lineTo(x, y); s.lineTo(-x, y); s.lineTo(-x, -h / 2 + r);
    const g = new T.ExtrudeGeometry(s, { depth: d - 2 * r, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: 4, curveSegments: 4 });
    g.translate(0, 0, -(d - 2 * r) / 2); g.computeVertexNormals(); return g;
  };
  MK.capsule = function (r, len, seg) { // vertical capsule, base at y=0, total height len
    const p = [], n = 8, mid = Math.max(0, len - 2 * r);
    for (let i = 0; i <= n; i++) { const a = -PI / 2 + (i / n) * PI / 2; p.push(new T.Vector2(Math.cos(a) * r, r + Math.sin(a) * r)); }
    for (let i = 0; i <= n; i++) { const a = (i / n) * PI / 2; p.push(new T.Vector2(Math.cos(a) * r, r + mid + Math.sin(a) * r)); }
    return new T.LatheGeometry(p, seg || 20);
  };
  MK.lathe = (pts, seg) => new T.LatheGeometry(pts.map((q) => new T.Vector2(q[0], q[1])), seg || 28);

  /* ---------- soundstage: tone mapping, environment, haze, floor, key + rim lights ---------- */
  MK.look = function (scene, renderer, grade) {
    const G = (MK.G = Object.assign({}, typeof grade === 'string' ? MK.GRADES[grade] : grade)); MK._src = renderer.domElement;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = G.exposure || 1.05; renderer.outputEncoding = T.sRGBEncoding;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    scene.background = LIN(G.haze); scene.fog = new T.FogExp2(LIN(G.haze).getHex(), G.fog || 0.03);
    const pm = new T.PMREMGenerator(renderer), es = new T.Scene();
    es.add(new T.Mesh(new T.BoxGeometry(30, 30, 30), new T.MeshBasicMaterial({ color: LIN(G.haze).multiplyScalar(1.6), side: T.BackSide })));
    const panel = (x, y, z, w, h, c, v) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: LIN(c).multiplyScalar(v), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m); };
    panel(-6, 13, 6, 12, 10, G.key, 3.0); panel(12, 5, -8, 5, 12, G.rim, 2.4); panel(-13, 3, -3, 4, 8, G.rim, 1.0); panel(0, 3, 14, 12, 4, G.key, 0.5);
    scene.environment = pm.fromScene(es, 0.05).texture;
    const hemi = new T.HemisphereLight(LIN(G.rim).getHex(), LIN(G.haze).getHex(), 0.22); scene.add(hemi);
    const key = new T.SpotLight(LIN(G.key).getHex(), 2.2, 80, 0.36, 0.9, 1.0); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.03; key.shadow.camera.near = 2; key.shadow.camera.far = 60;
    scene.add(key); scene.add(key.target);
    const rim = new T.DirectionalLight(LIN(G.rim).getHex(), 1.7); scene.add(rim); scene.add(rim.target);
    const floor = sh(new T.Mesh(new T.PlaneGeometry(600, 600), new T.MeshStandardMaterial({ color: LIN(G.floor).multiplyScalar(0.45), roughness: 0.85, metalness: 0, envMapIntensity: 0.08 })), false); floor.rotation.x = -PI / 2; scene.add(floor);
    const L = (MK.L = { key, rim, hemi, floor, G, keyBase: 2.2 });
    MK.keyOn(L, [0, 0, 0]);
    return L;
  };
  /* Point the key light at a set: c = set centre [x,y,z]; o.from = offset of the lamp from the centre; o.k = brightness 0..1 (a lighting cue). */
  MK.keyOn = function (L, c, o) {
    o = o || {}; const f = o.from || [-6, 13, 8];
    L.key.position.set(c[0] + f[0], c[1] + f[1], c[2] + f[2]); L.key.target.position.set(c[0], c[1] + (o.aimY == null ? 0.8 : o.aimY), c[2]); L.key.target.updateMatrixWorld();
    L.key.intensity = L.keyBase * (o.k == null ? 1 : o.k); if (o.angle) L.key.angle = o.angle;
    const r = o.rimFrom || [7, 6, -9]; L.rim.position.set(c[0] + r[0], c[1] + r[1], c[2] + r[2]); L.rim.target.position.set(c[0], c[1] + 1, c[2]); L.rim.target.updateMatrixWorld();
  };
  /* Lighting cue: 0 before t0, fades up over `fade`, holds, fades down before t1. Use it for o.k, practical lamps, glows and beams. */
  MK.cue = (t, t0, t1, fade) => { fade = fade || 0.8; return U.easeIO(U.clamp((t - t0) / fade)) * U.easeIO(U.clamp((t1 - t) / fade)); };

  /* ---------- light effects ---------- */
  let GLOW = null, BEAM = null;
  const glowTex = () => { if (!GLOW) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'), gr = x.createRadialGradient(64, 64, 2, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); GLOW = new T.CanvasTexture(c); } return GLOW; };
  MK.glow = function (c, size, op) { const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex(), color: LIN(c), transparent: true, opacity: op == null ? 0.8 : op, blending: T.AdditiveBlending, depthWrite: false, fog: false })); s.scale.setScalar(size || 1); return s; };
  /* Visible light cone from a lamp at the top (apex at y=0, opening downwards by h). */
  MK.beam = function (c, h, r, op) {
    if (!BEAM) { const cv = document.createElement('canvas'); cv.width = 8; cv.height = 128; const x = cv.getContext('2d'), gr = x.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, 'rgba(255,255,255,.9)'); gr.addColorStop(0.5, 'rgba(255,255,255,.28)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 8, 128); BEAM = new T.CanvasTexture(cv); }
    const g = new T.ConeGeometry(r, h, 32, 1, true); g.translate(0, -h / 2, 0);
    return new T.Mesh(g, new T.MeshBasicMaterial({ map: BEAM, color: LIN(c), transparent: true, opacity: op == null ? 0.22 : op, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, fog: false }));
  };
  /* Out-of-focus lights far behind a set (city, windows, stars): big soft discs that give depth. cols = sRGB hex list. */
  MK.bokeh = function (n, box, cols, size) {
    let s = 23; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647), g = new T.Group();
    for (let i = 0; i < n; i++) { const b = MK.glow(cols[i % cols.length], (size || 1.6) * (0.5 + rnd()), 0.1 + rnd() * 0.22); b.position.set((rnd() - 0.5) * box[0], rnd() * box[1], (rnd() - 0.5) * box[2]); b.userData.ph = rnd() * 6.28; g.add(b); }
    g.userData.tick = (t) => g.children.forEach((b) => { b.material.rotation = 0; b.scale.x = b.scale.y * (1 + 0.06 * Math.sin(t * 0.7 + b.userData.ph)); });
    return g;
  };
  /* Practical lamp: small point light + glow sprite. set .userData.k(v) to dim both. */
  MK.lamp = function (c, power, size) { const g = new T.Group(), p = new T.PointLight(LIN(c).getHex(), power == null ? 1.2 : power, 9, 1.6), s = MK.glow(c, size || 1.4, 0.9); g.add(p); g.add(s); g.userData.k = (v) => { p.intensity = (power == null ? 1.2 : power) * v; s.material.opacity = 0.9 * v; }; return g; };
  /* Dust motes drifting in the light. Call d.userData.tick(t) every frame. */
  MK.dust = function (n, box, c) {
    let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const pos = new Float32Array(n * 3), ph = []; for (let i = 0; i < n; i++) { pos[i * 3] = (rnd() - 0.5) * box[0]; pos[i * 3 + 1] = rnd() * box[1]; pos[i * 3 + 2] = (rnd() - 0.5) * box[2]; ph.push([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], rnd() * 6.28, 0.2 + rnd() * 0.5]); }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(pos, 3));
    const m = new T.Points(g, new T.PointsMaterial({ map: glowTex(), color: LIN(c || '#ffffff'), size: 0.09, transparent: true, opacity: 0.55, blending: T.AdditiveBlending, depthWrite: false }));
    m.userData.tick = (t) => { const a = g.attributes.position.array; for (let i = 0; i < n; i++) { const q = ph[i]; a[i * 3] = q[0] + Math.sin(t * q[4] + q[3]) * 0.25; a[i * 3 + 1] = (q[1] + t * 0.06 * q[4]) % box[1]; a[i * 3 + 2] = q[2] + Math.cos(t * q[4] * 0.8 + q[3]) * 0.25; } g.attributes.position.needsUpdate = true; };
    return m;
  };

  /* ---------- sets and figurines ---------- */
  /* A set = an island of light: a rounded slab on the dark floor. Everything for one location is added to this group. */
  MK.set = function (w, d, c, o) { o = o || {}; const g = new T.Group(), slab = sh(new T.Mesh(MK.rbox(w, 0.24, d, 0.1), (o.mat || MK.matte)(c)), false); slab.position.y = 0.12; g.add(slab); g.userData.top = 0.24; return g; };
  /* Figurine: a collectible game piece standing for one character. Original design only: identified by coat colour, one prop and a name plate,
     never an actor's likeness or a film's costume/creature design. o = { coat, skin, hair, h, base, hat, build } */
  MK.figure = function (o) {
    o = o || {}; const g = new T.Group(), k = (o.h || 1.6) / 1.6, b = o.build || 1, P = {};
    const coat = MK.resin(o.coat || '#9aa3b5'), skin = MK.resin(o.skin || '#f0c9a4', { clearcoat: 0.3, roughness: 0.55 }), hair = MK.resin(o.hair || '#2a2320', { roughness: 0.5 });
    if (o.base !== false) { const bs = sh(new T.Mesh(new T.CylinderGeometry(0.36 * b, 0.4 * b, 0.07, 36), MK.metal(o.baseColor || '#2a2c33', { roughness: 0.45 }))); bs.position.y = 0.035; g.add(bs); }
    const body = sh(new T.Mesh(MK.lathe([[0.001, 0.07], [0.3 * b, 0.07], [0.31 * b, 0.12], [0.24 * b, 0.5], [0.2 * b, 0.78], [0.25 * b, 0.98], [0.22 * b, 1.08], [0.09, 1.14], [0.08, 1.2], [0.001, 1.2]]), coat)); g.add(body); P.body = body;
    const head = new T.Group(); head.position.y = 1.4; g.add(head); P.head = head;
    head.add(sh(new T.Mesh(new T.SphereGeometry(0.23, 32, 24), skin)));
    if (o.hair !== false) { const hm = sh(new T.Mesh(new T.SphereGeometry(0.245, 32, 16, 0, PI * 2, 0, PI * 0.5), hair)); hm.rotation.x = -0.28; hm.position.y = 0.01; head.add(hm); }
    if (o.long) { const lh = sh(new T.Mesh(MK.capsule(0.2, 0.55), hair)); lh.position.set(-0.07, -0.42, 0); lh.scale.set(0.85, 1, 1.05); head.add(lh); }
    const eyeM = new T.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.15 });
    for (const z of [-0.085, 0.085]) { const e = new T.Mesh(new T.SphereGeometry(0.026, 12, 10), eyeM); e.position.set(0.212, 0.02, z); head.add(e); }
    if (o.hat) { const hb = sh(new T.Mesh(new T.CylinderGeometry(0.34, 0.34, 0.025, 32), MK.matte(o.hat))); hb.position.y = 0.13; head.add(hb); const hc = sh(new T.Mesh(new T.CylinderGeometry(0.19, 0.22, 0.2, 32), MK.matte(o.hat))); hc.position.y = 0.24; head.add(hc); }
    for (const sgn of [-1, 1]) { const piv = new T.Group(); piv.position.set(0, 1.0, sgn * 0.25 * b); const arm = sh(new T.Mesh(MK.capsule(0.07, 0.52), coat)); arm.rotation.z = PI; piv.add(arm); const hand = sh(new T.Mesh(new T.SphereGeometry(0.065, 14, 12), skin)); hand.position.y = -0.52; piv.add(hand); piv.rotation.x = sgn * -0.12; g.add(piv); P[sgn < 0 ? 'armR' : 'armL'] = piv; }
    g.scale.setScalar(k); g.userData.P = P; return g;
  };
  /* Pose: o = { turn (y rotation, faces +x at 0), lean, nod, armL, armR (swing forward, radians), hop (0..1) } */
  MK.pose = function (f, o) { const P = f.userData.P; if (o.turn != null) f.rotation.y = o.turn; if (o.lean != null) P.body.rotation.z = -o.lean, P.head.position.x = o.lean * 0.35; if (o.nod != null) P.head.rotation.z = -o.nod; if (o.armL != null) P.armL.rotation.z = o.armL; if (o.armR != null) P.armR.rotation.z = o.armR; if (o.hop != null) f.position.y = (f.userData.y0 || 0) + Math.sin(U.clamp(o.hop) * PI) * 0.25; };

  /* ---------- 2D finish (call first in hud): bloom from the 3D frame, film grain, 2.39:1 bars ---------- */
  let GRAIN = null;
  MK.finish = function (g, t, o) {
    o = o || {}; const W = o.W, H = o.H;
    if (o.bloom !== 0 && MK._src) { g.save(); g.globalCompositeOperation = 'screen'; g.filter = 'blur(' + Math.round(H * 0.016) + 'px) brightness(1.05) contrast(1.7)'; g.globalAlpha = o.bloom == null ? 0.42 : o.bloom; g.drawImage(MK._src, 0, 0, W, H); g.restore(); }
    if (o.grain !== 0) {
      if (!GRAIN) { GRAIN = []; let s = 11; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647); for (let k = 0; k < 4; k++) { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), im = x.createImageData(256, 256); for (let i = 0; i < im.data.length; i += 4) { const v = 255 * rnd(); im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; } x.putImageData(im, 0, 0); GRAIN.push(c); } }
      const f = Math.floor(t * 24); g.save(); g.globalCompositeOperation = 'overlay'; g.globalAlpha = o.grain == null ? 0.07 : o.grain; g.fillStyle = g.createPattern(GRAIN[f % 4], 'repeat'); g.translate(-((f * 37) % 256), -((f * 91) % 256)); g.fillRect(0, 0, W + 256, H + 256); g.restore();
    }
    const bar = o.bars === false ? 0 : MK.bar(W, H); if (bar > 0) { g.fillStyle = '#000'; g.fillRect(0, 0, W, bar); g.fillRect(0, H - bar, W, bar); }
  };
  MK.bar = (W, H) => (W > H ? Math.round((H - W / 2.39) / 2) : 0);
  /* Title card text: thin spaced Latin line (Plex 300) + big Thai title (Kanit 800). align 'left' | 'center'. */
  MK.spaced = function (g, str, x, y, size, color, align, gap) { g.save(); g.font = '300 ' + size + "px 'IBM Plex Sans Thai',Kanit,sans-serif"; g.fillStyle = color; g.textBaseline = 'middle'; const sp = gap == null ? size * 0.32 : gap, ws = [...str].map((ch) => g.measureText(ch).width + sp), tw = ws.reduce((a, b) => a + b, 0) - sp; let cx = align === 'center' ? x - tw / 2 : x; g.textAlign = 'left'; [...str].forEach((ch, i) => { g.fillText(ch, cx, y); cx += ws[i]; }); g.restore(); };
  MK.title = function (g, lines, x, y, o) { // lines = [[text, size, color]], drawn top to bottom from y
    o = o || {}; g.save(); g.textAlign = o.align || 'left'; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,.6)'; g.shadowBlur = 24; g.shadowOffsetY = 6;
    let yy = y; for (const l of lines) { g.font = (l[3] || 800) + ' ' + l[1] + 'px Kanit,sans-serif'; g.fillStyle = l[2] || '#fff'; g.fillText(l[0], x, yy + l[1] / 2); yy += l[1] * 1.22; } g.restore(); return yy;
  };
  /* Subtitle band position for narrator captions (landscape: just above the bottom bar). */
  MK.subY = (cap, H, W) => { let h = 0; cap.lines.forEach((l, i) => { h += i === cap.lines.length - 1 ? l[0] * 0.6 : l[0] * 1.25; }); return H - MK.bar(W, H) - 46 - h; };
})();
