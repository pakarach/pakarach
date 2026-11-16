/* ---------- atmosphere: terrain, backdrop ranges, stars, camera-space particles, rim light, grade ---------- */
function dotTex() { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); }
function terrain(st, c1, c2, opt) {
  opt = opt || {}; const S = opt.size || 70, N = 36, geo = new T.PlaneGeometry(S, S, N, N); geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position, col = [], A = new T.Color(c1), B = new T.Color(c2), tmp = new T.Color(); let rs = opt.seed || 7; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i) + (opt.cz || 0), r = Math.hypot(x, z * 1.1); const flat = opt.flat || 9.5; let y = -0.02;
    if (r > flat) { const k = Math.min(1, (r - flat) / 18); y = k * k * (opt.hill || 5) * (0.55 + rnd() * 0.8) + (rnd() - 0.5) * 0.35 * k; } else y += (rnd() - 0.5) * 0.04;
    if (opt.seaX != null && x > opt.seaX) y = -1.2;
    p.setY(i, y); tmp.copy(A).lerp(B, Math.min(1, Math.max(0, (r - flat * 0.6) / 22)) * 0.85 + rnd() * 0.15); col.push(tmp.r, tmp.g, tmp.b); }
  geo.setAttribute('color', new T.Float32BufferAttribute(col, 3)); geo.computeVertexNormals();
  const m = new T.Mesh(geo, new T.MeshLambertMaterial({ vertexColors: true, flatShading: true })); place(m, st, 0, 0, opt.cz ? -opt.cz : -1); return m;
}
function ranges(st, layers, opt) {
  opt = opt || {}; const g = new T.Group(); let rs = opt.seed || 3; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
  layers.forEach((L, li) => { const [R, col, hMin, hMax, n, arc] = L; const mat = M(col, { flatShading: true });
    for (let i = 0; i < n; i++) { const a = -arc / 2 + arc * (i + rnd() * 0.6) / n, h = hMin + rnd() * (hMax - hMin); const cn = new T.Mesh(new T.ConeGeometry(h * (0.9 + rnd() * 0.5), h, 5 + (i % 3)), mat); cn.position.set(Math.sin(a) * R, h / 2 - 0.6, -Math.cos(a) * R); cn.rotation.y = rnd() * 3; g.add(cn);
      if (opt.snow && li === layers.length - 1) { const sn = new T.Mesh(new T.ConeGeometry(h * 0.33, h * 0.3, 5), M('#f2f4ff', { flatShading: true })); sn.position.set(cn.position.x, h - 0.6 - h * 0.15, cn.position.z); sn.rotation.y = cn.rotation.y; g.add(sn); } } });
  place(g, st, 0, 0, opt.cz || -1); return g;
}
function skyline(st, z) { // golden Lanka towers behind the palace
  const g = new T.Group(), gm = M('#e8b048', { emissive: new T.Color('#7a4a00'), emissiveIntensity: 0.55, flatShading: true }), dm = M('#7a4a6a', { flatShading: true });
  const q = [[-13, 5.5], [-10, 8], [-7.5, 6], [-4.6, 10.5], [4.6, 11], [7.6, 6.5], [10.2, 8.5], [13, 5]];
  q.forEach(([x, h], i) => { const b = new T.Mesh(new T.BoxGeometry(1.6, h, 1.6), i % 2 ? gm : dm); b.position.set(x, h / 2, 0); g.add(b);
    for (let k = 0; k < 3; k++) { const tier = new T.Mesh(new T.CylinderGeometry(0.3 + (2 - k) * 0.35, 0.5 + (2 - k) * 0.4, 0.6, 6), gm); tier.position.set(x, h + 0.3 + k * 0.6, 0); g.add(tier); }
    const sp = new T.Mesh(new T.ConeGeometry(0.22, 1.6, 6), gm); sp.position.set(x, h + 2.4, 0); g.add(sp);
    for (let w = 0; w < Math.floor(h / 2); w++) { const win = new T.Mesh(new T.PlaneGeometry(0.35, 0.5), basic('#ffd27a')); win.position.set(x, 1 + w * 1.8, 0.81); g.add(win); } });
  place(g, st, 0, 0.5, z); return g;
}
function atmoSetup(scene, s) {
  const tex = dotTex();
  // stars: a dome that follows the camera
  { const N = 420, pos = new Float32Array(N * 3); let rs = 5; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) { const u = rnd() * 2 - 1, a = rnd() * 6.283, el = 0.05 + Math.abs(u) * 0.95, R = 95; pos[i * 3] = Math.cos(a) * Math.sqrt(1 - el * el) * R; pos[i * 3 + 1] = el * R * 0.8; pos[i * 3 + 2] = Math.sin(a) * Math.sqrt(1 - el * el) * R; }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    s.stars = new T.Points(geo, new T.PointsMaterial({ size: 3.2, sizeAttenuation: false, map: tex, transparent: true, depthWrite: false, fog: false, color: '#fff6e0' })); s.stars.renderOrder = -1; scene.add(s.stars); }
  // camera-space motes (embers / dust / glitter)
  { const N = 140, pos = new Float32Array(N * 3), seed = []; let rs = 9; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) seed.push([rnd() * 2 - 1, rnd(), 3 + rnd() * 11, rnd() * 6.28, 0.4 + rnd() * 0.9]);
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    s.motes = new T.Points(geo, new T.PointsMaterial({ size: 0.16, map: tex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false, color: '#ffb060' })); s.motes.userData.seed = seed; s.motes.frustumCulled = false; scene.add(s.motes); }
  s.rim = new T.DirectionalLight(0xffffff, 0); scene.add(s.rim); scene.add(s.rim.target);
  s.atmoV = new T.Vector3(); s.atmoF = new T.Vector3();
}
const ATMO = { // per bg key: motes colour, size, rise speed (+up / -down), count, stars?, rim colour, rim power, grade tint, grade alpha, rays
  pen: ['#ff9a3a', 0.15, 0.9, 140, 1, '#ffb070', 1.0, '#c0401a', 0.13, 0],
  map: ['#9fd8ff', 0.08, 0.1, 40, 1, '#9fc8ff', 0.4, '#2a3a8a', 0.08, 0],
  sky: ['#ffe6a0', 0.1, 0.15, 90, 0, '#ffe8b0', 1.0, '#ffb84a', 0.08, 1],
  dark: ['#c8b0ff', 0.1, 0.12, 80, 1, '#a090ff', 0.9, '#3a2a9a', 0.16, 0],
  lanka: ['#ffcf6a', 0.1, 0.2, 90, 1, '#c890ff', 1.0, '#6a2a9a', 0.16, 0],
  herm: ['#fff4c0', 0.08, 0.12, 70, 0, '#ffe8c0', 0.8, '#ffc870', 0.07, 1],
  ell: ['#ffe0b0', 0.08, 0.1, 50, 0, '#ffe0b0', 0.6, '#ffb070', 0.08, 1],
  ayo: ['#ffb050', 0.13, 0.7, 120, 0, '#ffc070', 0.8, '#b0501a', 0.12, 0.6],
};
function atmoUpdate(t, s, bk, camera, boost) {
  const A = ATMO[bk] || ATMO.sky; camera.updateMatrixWorld(true);
  s.stars.visible = !!A[4]; s.stars.position.copy(camera.position);
  const m = s.motes, pos = m.geometry.attributes.position, sd = m.userData.seed, n = Math.min(sd.length, Math.round(A[3] * (boost || 1)));
  m.material.color.set(A[0]); m.material.size = A[1]; m.material.opacity = 0.85;
  const fwd = s.atmoF; camera.getWorldDirection(fwd);
  for (let i = 0; i < sd.length; i++) { const q = sd[i]; if (i >= n) { pos.setXYZ(i, 0, -999, 0); continue; }
    const z = q[2], half = z * 0.42; let yy = ((q[1] + t * A[2] * q[4] * 0.12) % 1 + 1) % 1; const x = q[0] * half * 0.7 + Math.sin(t * 0.7 + q[3]) * 0.25, y = (yy * 2 - 1) * half * 1.25;
    const v = s.atmoV.set(x, y, -z).applyMatrix4(camera.matrixWorld); pos.setXYZ(i, v.x, v.y, v.z); }
  pos.needsUpdate = true;
  const tg = s.atmoV.copy(camera.position).addScaledVector(fwd, 9); s.rim.target.position.copy(tg); s.rim.position.copy(tg).addScaledVector(fwd, 12); s.rim.position.y += 2.5; s.rim.color.set(A[5]); s.rim.intensity = A[6] * 0.55;
}
function atmoGrade(g, t, W, H, bk, raysK) {
  const A = ATMO[bk] || ATMO.sky; g.save();
  g.globalCompositeOperation = 'soft-light'; g.globalAlpha = Math.min(1, A[8] * 2.2); g.fillStyle = A[7]; g.fillRect(0, 0, W, H);
  const rk = raysK != null ? raysK : A[9];
  if (rk > 0) { g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { const x0 = W * (-0.1 + i * 0.22) + Math.sin(t * 0.25 + i * 1.7) * 30, w = 70 + (i % 3) * 50; const gr = g.createLinearGradient(0, 0, 0, H * 0.9); gr.addColorStop(0, 'rgba(255,236,190,' + (0.11 * rk * (0.6 + 0.4 * Math.sin(t * 0.6 + i))) + ')'); gr.addColorStop(1, 'rgba(255,236,190,0)'); g.globalAlpha = 1; g.fillStyle = gr;
    g.beginPath(); g.moveTo(x0, -10); g.lineTo(x0 + w, -10); g.lineTo(x0 + w + H * 0.45, H * 0.9); g.lineTo(x0 + H * 0.45 - w * 0.6, H * 0.9); g.closePath(); g.fill(); } }
  g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  const vg = g.createRadialGradient(W / 2, H * 0.52, H * 0.28, W / 2, H * 0.52, H * 0.78); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(6,4,18,.42)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  g.restore();
}
