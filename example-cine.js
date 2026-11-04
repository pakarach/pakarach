/* example-cine.js — Binance hack briefing deck (Nov 2026), the reference for docs/cine-briefing.md. Silent, 16:9, presenter steps via kit-cine.js.
   Build: node build.js example-cine.js out.html --kit fact,cine --data world=world.geo.json
   Look: off-white studio, PBR ceramic/graphite/gold with env reflections, ACES tone mapping, soft shadows, one gold accent
   (red only for compromise), IBM Plex Sans Thai light type, hairlines instead of cards, slow continuous camera, fades instead of iris.
   Facts: TRM Labs, Blockaid, Binance/Richard Teng, Chainalysis, Elliptic, FBI (Oct–Nov 2026); Bybit: Sygnia/FBI (2025); DMM: FBI/NPA; WazirX: Elliptic/Halborn; Bitget statements. */
(function () {
  const T = THREE, U = VE.u, C = U.clamp, eo = U.easeOut, eio = U.easeIO, eb = U.easeBack, lerp = U.lerp;
  const W = 1920, H = 1080;
  const F = '"IBM Plex Sans Thai", Kanit, sans-serif';
  const INK = '#1c1e22', INK2 = '#4b4a46', MUTE = '#8b877f', GOLD = '#b8862f', GOLDL = '#d9a441', RED = '#b3242f', SLATE = '#5d7690', BG = '#e2ded7';
  const LIN = (h) => new THREE.Color(h).convertSRGBToLinear(); const ACC = {}; const acc = (h) => ACC[h] || (ACC[h] = LIN(h));
  const BGA = (a) => 'rgba(226,222,215,' + a + ')';
  const lk = document.createElement('link'); lk.rel = 'stylesheet';
  lk.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500&display=swap'; document.head.appendChild(lk);

  const BEATS = [['cover', 1.8], ['hook', 5.4], ['scale', 7.7], ['drain', 8.1], ['laptop', 6.5], ['devops', 6.6], ['howin', 4.6], ['playbook', 10.8], ['notone', 6.0],
    ['signer', 10.7], ['abuse', 8.3], ['eip', 9.8], ['persist', 8.0], ['freeze', 11.4], ['who', 6.6], ['evidence', 8.3], ['why', 9.5], ['bybit', 8.9], ['trend', 5.0],
    ['users', 9.5], ['lesson', 9.7], ['recap', 8.4], ['ask', 5.0], ['end', 2.4]];
  const B = FK.beats(BEATS), at = B.at, end = B.end, dur = B.dur, DUR = B.DUR;
  const inB = (id, t) => t >= at(id) && t < end(id), rel = (id, t) => t - at(id);
  const beatOf = (t) => { for (const [id] of BEATS) if (t < end(id)) return id; return 'end'; };
  const inAny = (ids, t) => ids.some((id) => inB(id, t));
  const HS = (i, k) => { const s = Math.sin(i * 127.1 + (k || 0) * 311.7) * 43758.5453; return s - Math.floor(s); };

  /* ---------- world layout ---------- */
  const CH = [['ETH', 'Ethereum', 3790], ['BTC', 'Bitcoin', 1470], ['TRX', 'Tron', 628], ['XRP', 'XRP', 296], ['SOL', 'Solana', 96], ['AVAX', 'Avalanche', 28], ['ARB', 'Arbitrum', 13], ['OP', 'Optimism', 13], ['BASE', 'Base', 13], ['POL', 'Polygon', 10]];
  const N = CH.length, POS = CH.map((c, i) => { const x = (i - (N - 1) / 2) * 1.8; return [x, -0.045 * x * x]; });
  const MH = 2.6, TOPY = MH + 0.15;
  const CORE = [0, 0, -5.4], SEALY = 2.05, SINK = new T.Vector3(0, 5.6, -11.5);
  const DESK = [0, 0, 7.2], RACK = [-1.85, 0, 5.9];
  const HALL = 40, CMP = -40, FZ = [20, 0, 34], MAP = [0, 0, 80];
  const ETH = new T.Vector3(POS[0][0], 0, POS[0][1]);
  const COLD = [-5.4, 0, -8.8], CONT = [0, 0, 1.1];

  /* ---------- camera: per-beat dolly A -> B; stage changes cut through a fade ---------- */
  const S = (p, l, f) => ({ p, l, f: f || 34 });
  const WIDE = S([1.3, 7.8, 17.2], [0.2, 0.5, -3.9]);
  const SHOT = {
    cover: [S([6.8, 1.7, 7.6], [-1.6, 2.6, -3.4], 32), S([6.5, 1.8, 8.0], [-1.6, 2.6, -3.4], 32)],
    hook: [S([6.5, 1.8, 8.0], [-1.6, 2.6, -3.4], 32), S([3.4, 4.6, 14.2], [-0.6, 1.4, -3.6], 33)],
    scale: [S([HALL - 2.4, 3.6, 16.8], [HALL - 1.6, 1.35, 0], 34), S([HALL - 1.4, 3.8, 16.0], [HALL - 1.6, 1.35, 0], 34)],
    drain: [S([-5.4, 3.4, 9.6], [-1.9, 1.6, -2.6], 32), WIDE],
    laptop: [S([1.6, 3.0, 13.2], [-1.3, 1.0, 6.6], 32), S([0.8, 2.8, 12.4], [-1.3, 1.0, 6.6], 32)],
    devops: [S([0.8, 2.8, 12.4], [-1.3, 1.0, 6.6], 32), S([1.2, 3.1, 12.6], [-1.9, 1.1, 6.2], 33)],
    howin: [S([1.2, 3.1, 12.6], [-1.9, 1.1, 6.2], 33), S([2.4, 2.7, 12.0], [1.5, 1.0, 6.8], 32)],
    playbook: [S([2.4, 2.7, 12.0], [1.5, 1.0, 6.8], 32), S([3.0, 2.9, 12.6], [1.7, 1.0, 6.8], 32)],
    notone: [S([3.0, 2.9, 12.6], [1.7, 1.0, 6.8], 32), S([6.8, 6.4, 13.0], [-1.6, 1.0, 0.6], 34)],
    signer: [S([2.6, 5.0, 0.6], [-0.9, 0.6, -5.4], 36), S([1.8, 4.4, -0.3], [-0.9, 0.6, -5.4], 36)],
    abuse: [S([1.8, 4.4, -0.3], [-0.9, 0.6, -5.4], 36), S([5.0, 8.2, 5.6], [0, 1.0, -3.4], 36)],
    eip: [S([-6.4, 2.4, 5.8], [-9.6, 1.5, -2.2], 34), S([-7.0, 2.8, 5.8], [-8.9, 1.75, -2.4], 34)],
    persist: [S([-7.0, 2.8, 5.8], [-8.9, 1.75, -2.4], 34), S([-3.4, 4.6, 7.4], [-7.4, 2.9, -2.6], 34)],
    freeze: [S([FZ[0] - 0.4, 3.0, FZ[2] + 8.6], [FZ[0] + 0.6, 1.2, FZ[2]], 34), S([FZ[0] + 0.6, 3.3, FZ[2] + 8.0], [FZ[0] + 0.6, 1.2, FZ[2]], 34)],
    who: [S([MAP[0] + 0.4, 8.6, MAP[2] + 9.6], [MAP[0] + 0.6, 0.2, MAP[2] - 0.8], 34), S([MAP[0] + 0.2, 7.8, MAP[2] + 8.6], [MAP[0] + 0.6, 0.2, MAP[2] - 0.8], 34)],
    evidence: [S([MAP[0] + 0.2, 7.8, MAP[2] + 8.6], [MAP[0] + 1.8, 0.2, MAP[2] - 0.8], 34), S([MAP[0] + 0.6, 7.2, MAP[2] + 8.0], [MAP[0] + 2.0, 0.2, MAP[2] - 0.8], 34)],
    why: [S([MAP[0] + 0.6, 7.2, MAP[2] + 8.0], [MAP[0] + 2.0, 0.2, MAP[2] - 0.8], 34), S([MAP[0] + 1.0, 8.4, MAP[2] + 9.2], [MAP[0] + 2.0, 0.2, MAP[2] - 0.8], 34)],
    bybit: [S([CMP - 0.6, 5.2, 13.6], [CMP + 0.4, -0.2, 0], 34), S([CMP + 0.4, 5.0, 13.0], [CMP + 0.4, -0.2, 0], 34)],
    trend: [S([HALL + 0.2, 3.9, 16.2], [HALL - 0.4, 1.9, 0], 34), S([HALL - 0.8, 4.1, 15.6], [HALL - 0.4, 1.9, 0], 34)],
    users: [S([-2.4, 6.6, 15.4], [0, 0.4, -3.6], 34), S([-1.0, 7.2, 16.2], [0.2, 0.0, -3.9], 34)],
    lesson: [S([-1.0, 7.2, 16.2], [0.2, 0.0, -3.9], 34), S([1.4, 8.2, 17.6], [0.2, 0.4, -4.6], 34)],
    recap: [S([-3, 9, 19], [0, 0.5, -4], 34), S([0, 9.5, 19.5], [0, 0.5, -4], 34)],
    ask: [S([0, 9.5, 19.5], [0, 0.5, -4], 34), S([2.4, 9.8, 19.0], [0, 0.5, -4], 34)],
    end: [S([2.4, 9.8, 19.0], [0, 0.5, -4], 34), S([2.6, 9.9, 19.0], [0, 0.5, -4], 34)],
  };
  const CUTS = ['scale', 'drain', 'laptop', 'signer', 'eip', 'freeze', 'who', 'bybit', 'trend', 'users', 'recap'].map((id) => at(id));
  function camAt(t, camera) {
    const id = beatOf(t), sh = SHOT[id], p = eio(C(rel(id, t) / dur(id)));
    const P = sh[0].p.map((v, i) => lerp(v, sh[1].p[i], p)), L = sh[0].l.map((v, i) => lerp(v, sh[1].l[i], p));
    camera.position.set(P[0], P[1] + Math.sin(t * 0.6) * 0.025, P[2]); camera.lookAt(L[0], L[1], L[2]);
    camera.fov = lerp(sh[0].f, sh[1].f, p);
    const o = window.__PV_OFFT, off = o ? lerp(o.from, o.to, eio(C((performance.now() - o.t0) / 650))) : 0; // presenter: slide the image left while the explanation panel is open
    if (off > 0.001) camera.setViewOffset(W, H, off * 0.17 * W, 0, W, H); else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  const stage = (t) => {
    const id = beatOf(t);
    return {
      main: !['scale', 'freeze', 'who', 'evidence', 'why', 'bybit', 'trend'].includes(id),
      desk: ['laptop', 'devops', 'howin', 'playbook', 'notone', 'signer', 'abuse'].includes(id),
      hall: id === 'scale' || id === 'trend', cmp: id === 'bybit', frz: id === 'freeze', map: ['who', 'evidence', 'why'].includes(id),
    };
  };

  /* ---------- story state ---------- */
  const DR0 = (i) => at('drain') + 0.5 + i * 0.12, DR1 = (i) => at('drain') + dur('drain') * 0.86 - (N - 1 - i) * 0.04;
  const EIPM = 3.1; // eip: matched card opens ETH at rel 3.1
  function level(i, t) {
    if (t < at('drain')) return 0.72;
    if (t < end('drain')) return 1 - 0.96 * eio(C((t - DR0(i)) / (DR1(i) - DR0(i))));
    if (i === 0 && inB('eip', t)) return 1 - eio(C((rel('eip', t) - EIPM) / 2.4));
    if (t < at('users')) return i === 0 && t >= at('eip') ? 0 : 0.04;
    if (t < end('users')) return lerp(i === 0 ? 0 : 0.04, 0.95, eio(C((rel('users', t) - 0.9 - i * 0.08) / 2.8)));
    if (inB('lesson', t)) return lerp(0.95, 0.38, eio(C((rel('lesson', t) - 2.0) / 1.0)));
    return t < at('recap') ? 0.38 : 0.38;
  }
  const SIG_T = [0, 1, 2, 3, 4, 5].map((k) => at('signer') + 2.0 + k * 1.1), ABU_T = POS.map((p, k) => at('abuse') + 1.0 + k * 0.32);
  const STAMPS = SIG_T.concat(ABU_T);
  const pressAt = (t) => { let v = 0; for (const ts of STAMPS) { const d = Math.abs(t - ts); if (d < 0.14) v = Math.max(v, Math.pow(1 - d / 0.14, 1.5)); } return v; };
  const PDROP = [0.45, 1.0, 1.3, 2.1, 3.0, 4.2].map((v) => v * dur('persist') / 5.2);

  /* ---------- geometry helpers ---------- */
  function rrect(w, d, r) {
    const s = new T.Shape(), hw = w / 2, hd = d / 2;
    s.moveTo(-hw + r, -hd); s.lineTo(hw - r, -hd); s.quadraticCurveTo(hw, -hd, hw, -hd + r); s.lineTo(hw, hd - r); s.quadraticCurveTo(hw, hd, hw - r, hd);
    s.lineTo(-hw + r, hd); s.quadraticCurveTo(-hw, hd, -hw, hd - r); s.lineTo(-hw, -hd + r); s.quadraticCurveTo(-hw, -hd, -hw + r, -hd); return s;
  }
  function rbox(w, d, h, r, bev) { // rounded box, base at y=0
    const b = bev == null ? 0.03 : bev, g = new T.ExtrudeGeometry(rrect(w - 2 * b, d - 2 * b, Math.max(0.01, r - b)), { depth: Math.max(0.01, h - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 8 });
    g.rotateX(-Math.PI / 2); g.translate(0, b, 0); return g;
  }
  const UP = new T.Vector3(0, 1, 0);
  function hair(color, r, opacity) { const g = new T.CylinderGeometry(r || 0.012, r || 0.012, 1, 6); g.translate(0, 0.5, 0); const m = new T.Mesh(g, new T.MeshBasicMaterial({ color, transparent: true, opacity: opacity == null ? 0.9 : opacity })); m.visible = false; return m; }
  function aim(m, a, b, prog) { const d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), Ln = d.length(); m.position.set(a[0], a[1], a[2]); m.quaternion.setFromUnitVectors(UP, d.normalize()); m.scale.set(1, Math.max(0.001, Ln * prog), 1); m.visible = prog > 0.01; }
  function bez(a, b, lift, p) {
    const m = [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + lift, (a[2] + b[2]) / 2], q = 1 - p;
    return [q * q * a[0] + 2 * q * p * m[0] + p * p * b[0], q * q * a[1] + 2 * q * p * m[1] + p * p * b[1], q * q * a[2] + 2 * q * p * m[2] + p * p * b[2]];
  }
  let BLOB = null;
  function blob(w, d, a) {
    if (!BLOB) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'), gr = x.createRadialGradient(64, 64, 6, 64, 64, 64); gr.addColorStop(0, 'rgba(40,30,20,1)'); gr.addColorStop(1, 'rgba(40,30,20,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); BLOB = new T.CanvasTexture(c); }
    const m = new T.Mesh(new T.PlaneGeometry(w, d), new T.MeshBasicMaterial({ map: BLOB, transparent: true, opacity: a || 0.45, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.y = 0.006; return m;
  }

  /* ---------- scene ---------- */
  let M = null; // materials
  function setup({ scene, renderer }) {
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.82; renderer.outputEncoding = T.sRGBEncoding;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    scene.background = new T.Color(BG); scene.fog = new T.Fog(BG, 24, 60);
    const pm = new T.PMREMGenerator(renderer), es = new T.Scene();
    es.add(new T.Mesh(new T.BoxGeometry(30, 30, 30), new T.MeshBasicMaterial({ color: 0x8c8780, side: T.BackSide })));
    const panel = (x, y, z, w, h, v) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(v, v * 0.97, v * 0.93), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m); };
    panel(0, 14, 0, 16, 16, 3.2); panel(-14, 4, 4, 6, 12, 2.2); panel(14, 5, -4, 5, 10, 1.6); panel(0, 4, 14, 14, 5, 1.2);
    scene.environment = pm.fromScene(es, 0.06).texture;
    scene.add(new T.HemisphereLight(0xffffff, 0xcfc6b8, 0.28));
    const sun = new T.DirectionalLight(0xfff0dc, 2.1); sun.position.set(-7, 15, 9); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 14, bottom: -14, near: 1, far: 60 }); sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03;
    scene.add(sun); scene.add(sun.target);
    const fill = new T.DirectionalLight(0xe8eeff, 0.35); fill.position.set(9, 6, 10); scene.add(fill);
    const floor = new T.Mesh(new T.PlaneGeometry(400, 400), new T.MeshStandardMaterial({ color: '#dcd7cf', roughness: 0.92 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    M = {
      ceramic: new T.MeshPhysicalMaterial({ color: '#ece8e1', roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.25, envMapIntensity: 0.6 }),
      graphite: new T.MeshStandardMaterial({ color: '#2b2d31', roughness: 0.32, metalness: 0.7 }),
      gold: new T.MeshStandardMaterial({ color: '#d2a24a', metalness: 1, roughness: 0.22 }),
      alu: new T.MeshStandardMaterial({ color: '#cfccc6', metalness: 0.85, roughness: 0.3 }),
      red: new T.MeshStandardMaterial({ color: LIN('#a3222d'), roughness: 0.6, envMapIntensity: 0.4 }),
      slate: new T.MeshPhysicalMaterial({ color: LIN('#7f95ab'), roughness: 0.35, clearcoat: 0.6 }),
    };
    const sh = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
    const Z = {}; Z.sun = sun;

    /* MAIN: monoliths */
    Z.main = new T.Group(); scene.add(Z.main);
    const mg = rbox(0.92, 0.92, MH + 0.07, 0.14, 0.035); mg.translate(0, 0.08, 0);
    const trackM = new T.MeshBasicMaterial({ color: '#d4cfc6' });
    function mono(parent, x, z, face, scale) {
      const g = new T.Group(); g.position.set(x, 0, z); if (face) g.lookAt(face[0], 0, face[1]); if (scale) g.scale.setScalar(scale);
      g.add(sh(new T.Mesh(mg, M.ceramic)));
      const pl = sh(new T.Mesh(new T.BoxGeometry(1.12, 0.08, 1.12), M.graphite)); pl.position.y = 0.04; g.add(pl);
      g.add(blob(2.4, 2.4, 0.4));
      const SL = MH - 0.5, zf = 0.46 + 0.004;
      const tr = new T.Mesh(new T.PlaneGeometry(0.05, SL), trackM); tr.position.set(0, 0.33 + SL / 2, zf); g.add(tr);
      const sg = new T.PlaneGeometry(0.05, SL); sg.translate(0, SL / 2, 0);
      const slot = new T.Mesh(sg, new T.MeshBasicMaterial({ color: GOLDL })); slot.position.set(0, 0.33, zf + 0.001); g.add(slot);
      const cap = new T.Mesh(new T.CircleGeometry(0.045, 20), new T.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0 })); cap.position.set(0, 0.21, zf + 0.002); g.add(cap);
      const mark = new T.Mesh(new T.PlaneGeometry(0.16, 0.012), new T.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0 })); mark.position.set(0, 0.33 + SL * 0.38, zf + 0.002); g.add(mark);
      parent.add(g); return { g, slot, cap, mark, SL };
    }
    Z.mono = mono;
    Z.mons = POS.map(([x, z]) => Object.assign(mono(Z.main, x, z, [0, 16]), { top: new T.Vector3(x, TOPY, z) }));
    /* per-vault mini seals (lesson) */
    Z.minis = POS.map(([x, z]) => { const m = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.05, 32), M.gold); m.position.set(x, TOPY + 0.55, z); m.visible = false; Z.main.add(m); return m; });

    /* signing core ("ตรายาง") */
    Z.core = new T.Group(); Z.core.position.set(...CORE); Z.main.add(Z.core);
    Z.core.add(sh(new T.Mesh(new T.CylinderGeometry(0.95, 1.0, 0.95, 48), M.graphite))); Z.core.children[0].position.y = 0.475;
    const rim = new T.Mesh(new T.TorusGeometry(0.82, 0.018, 8, 64), M.gold); rim.rotation.x = Math.PI / 2; rim.position.y = 0.96; Z.core.add(rim);
    Z.core.add(blob(3.2, 3.2, 0.45));
    Z.seal = new T.Group(); Z.core.add(Z.seal);
    const sd = sh(new T.Mesh(new T.CylinderGeometry(0.55, 0.55, 0.09, 48), M.gold)); Z.seal.add(sd);
    for (const r of [0.42, 0.28]) { const ring = new T.Mesh(new T.TorusGeometry(r, 0.012, 6, 48), M.graphite); ring.rotation.x = Math.PI / 2; ring.position.y = 0.05; Z.seal.add(ring); }
    Z.ripple = new T.Mesh(new T.TorusGeometry(1, 0.01, 6, 64), new T.MeshBasicMaterial({ color: GOLDL, transparent: true, opacity: 0 })); Z.ripple.rotation.x = Math.PI / 2; Z.ripple.position.y = 0.97; Z.core.add(Z.ripple);
    Z.beams = POS.map(() => { const m = hair(GOLD, 0.011, 0.85); Z.main.add(m); return m; });
    /* transfer orders ("ใบสั่งโอน") that the approval system stamps */
    const paperM = new T.MeshStandardMaterial({ color: '#faf8f4', roughness: 0.6, side: T.DoubleSide });
    Z.slips = []; for (let k = 0; k < 10; k++) {
      const g = new T.Group(); const pp = new T.Mesh(new T.PlaneGeometry(0.36, 0.26), paperM); pp.rotation.x = -Math.PI / 2; pp.castShadow = true; g.add(pp);
      const bd = new T.Mesh(new T.PlaneGeometry(0.4, 0.3), new T.MeshBasicMaterial({ color: RED, side: T.DoubleSide })); bd.rotation.x = -Math.PI / 2; bd.position.y = -0.003; g.add(bd);
      for (let q = 0; q < 3; q++) { const ln = new T.Mesh(new T.PlaneGeometry(0.2 - q * 0.04, 0.012), new T.MeshBasicMaterial({ color: '#c9c3b8', side: T.DoubleSide })); ln.rotation.x = -Math.PI / 2; ln.position.set(-0.06 + q * 0.02, 0.002, -0.07 + q * 0.05); g.add(ln); }
      const mk = new T.Mesh(new T.RingGeometry(0.045, 0.068, 32), new T.MeshBasicMaterial({ color: GOLD, side: T.DoubleSide })); mk.rotation.x = -Math.PI / 2; mk.position.set(0.1, 0.003, 0.05); g.add(mk);
      g.visible = false; Z.main.add(g); Z.slips.push({ g, bd, mk });
    }

    /* sink ring + gate */
    Z.ring = new T.Mesh(new T.TorusGeometry(1.5, 0.022, 12, 96), M.graphite); Z.ring.position.copy(SINK); Z.main.add(Z.ring);
    Z.ring2 = new T.Mesh(new T.TorusGeometry(1.5, 0.008, 8, 96), new T.MeshBasicMaterial({ color: GOLDL, transparent: true, opacity: 0 })); Z.ring2.position.copy(SINK); Z.main.add(Z.ring2);
    Z.gate = new T.Mesh(new T.BoxGeometry(3.6, 0.07, 0.07), M.graphite); Z.gate.position.set(SINK.x, SINK.y, SINK.z + 0.25); Z.gate.visible = false; Z.main.add(Z.gate);

    /* streams vault -> sink */
    Z.streams = Z.mons.map((m, i) => {
      const a = (i / (N - 1) - 0.5) * 2.4, e = SINK.clone().add(new T.Vector3(Math.sin(a) * 1.5, Math.cos(a) * 0.9, 0)), p0 = m.top.clone();
      const cv = new T.CubicBezierCurve3(p0, p0.clone().add(new T.Vector3(0, 2.6, 0.4)), new T.Vector3(e.x * 1.3, e.y + 2.2, e.z + 5), e);
      const tube = new T.Mesh(new T.TubeGeometry(cv, 90, 0.007, 6, false), new T.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0 })); tube.geometry.setDrawRange(0, 0); Z.main.add(tube);
      return { cv, tube, gap: C(0.22 - Math.log10(CH[i][2]) * 0.05, 0.035, 0.2) };
    });
    const POOL = 150;
    Z.drops = new T.InstancedMesh(new T.SphereGeometry(0.045, 12, 8), M.gold, POOL * N); Z.drops.castShadow = true; Z.main.add(Z.drops); Z.POOL = POOL;
    Z.fly = new T.InstancedMesh(new T.SphereGeometry(0.045, 12, 8), M.gold, 260); Z.fly.castShadow = true; scene.add(Z.fly);
    Z.sweeper = new T.Mesh(new T.TorusGeometry(0.42, 0.016, 8, 48), M.graphite); Z.sweeper.rotation.x = Math.PI / 2; Z.sweeper.position.set(ETH.x, TOPY + 1.5, ETH.z); Z.sweeper.visible = false; Z.main.add(Z.sweeper);

    /* EIP-7702 authorisation tiles beside the ETH vault */
    Z.tiles = []; for (let k = 0; k < 50; k++) { const m = new T.Mesh(new T.PlaneGeometry(0.15, 0.2), new T.MeshBasicMaterial({ color: '#f7f5f1', side: T.DoubleSide, transparent: true })); m.visible = false; scene.add(m); Z.tiles.push(m); }
    const tileEdge = new T.MeshBasicMaterial({ color: '#b9b3a8', side: T.DoubleSide, transparent: true }); Z.tileEdges = Z.tiles.map((t) => { const e = new T.Mesh(new T.PlaneGeometry(0.17, 0.22), tileEdge.clone()); e.visible = false; scene.add(e); return e; });

    /* DESK: graphite table, aluminium laptop, server rack, links */
    Z.desk = new T.Group(); Z.desk.position.set(...DESK); scene.add(Z.desk);
    const top = sh(new T.Mesh(rbox(2.3, 1.05, 0.06, 0.05, 0.01), M.graphite)); top.position.y = 0.72; Z.desk.add(top);
    for (const sx of [-1.0, 1.0]) { const leg = sh(new T.Mesh(new T.BoxGeometry(0.05, 0.72, 0.9), M.graphite)); leg.position.set(sx, 0.36, 0); Z.desk.add(leg); }
    Z.desk.add(blob(3.2, 2.0, 0.4));
    const base = sh(new T.Mesh(rbox(0.92, 0.62, 0.03, 0.04, 0.008), M.alu)); base.position.y = 0.78; Z.desk.add(base);
    const lid = new T.Group(); lid.position.set(0, 0.81, -0.3); lid.rotation.x = -0.22; Z.desk.add(lid);
    const lb = sh(new T.Mesh(rbox(0.92, 0.6, 0.02, 0.04, 0.006), M.alu)); lb.rotation.x = Math.PI / 2; lb.position.set(0, 0.3, 0); lid.add(lb);
    Z.screen = new T.Mesh(new T.PlaneGeometry(0.84, 0.52), new T.MeshBasicMaterial({ color: '#f4f1ea' })); Z.screen.position.set(0, 0.3, 0.012); lid.add(Z.screen);
    Z.scrLine = []; for (let k = 0; k < 5; k++) { const l = new T.Mesh(new T.PlaneGeometry(0.42 - (k % 3) * 0.09, 0.016), new T.MeshBasicMaterial({ color: '#bdb6aa' })); l.position.set(-0.17 + (0.42 - (k % 3) * 0.09) / 2 - 0.08, 0.47 - k * 0.07, 0.014); lid.add(l); Z.scrLine.push(l); }
    Z.rack = new T.Group(); Z.rack.position.set(...RACK); scene.add(Z.rack);
    Z.rack.add(sh(new T.Mesh(rbox(0.78, 0.7, 1.75, 0.06, 0.02), M.graphite)));
    Z.leds = []; for (let k = 0; k < 6; k++) { const l = new T.Mesh(new T.PlaneGeometry(0.44, 0.014), new T.MeshBasicMaterial({ color: '#f4efe4' })); l.position.set(0, 0.35 + k * 0.22, 0.352); Z.rack.add(l); Z.leds.push(l); }
    Z.rack.add(blob(1.6, 1.4, 0.45));
    Z.letter = new T.Group(); const lp = new T.Mesh(new T.PlaneGeometry(0.42, 0.28), new T.MeshStandardMaterial({ color: '#faf8f4', roughness: 0.6, side: T.DoubleSide })); const lt = new T.Mesh(new T.PlaneGeometry(0.42, 0.012), new T.MeshBasicMaterial({ color: GOLD, side: T.DoubleSide })); lt.position.set(0, 0.09, 0.001); Z.letter.add(lp, lt); Z.letter.visible = false; scene.add(Z.letter);
    Z.worm = hair(RED, 0.014, 0.9); scene.add(Z.worm);
    Z.alarms = [[RACK[0], 0.02, RACK[2]], [CORE[0], 0.02, CORE[2]]].map((p) => { const m = new T.Mesh(new T.TorusGeometry(1, 0.012, 6, 64), new T.MeshBasicMaterial({ color: RED, transparent: true })); m.rotation.x = Math.PI / 2; m.position.set(...p); m.visible = false; scene.add(m); return m; });

    /* HALL: case-size columns + trend steps */
    Z.hall = new T.Group(); scene.add(Z.hall);
    const hp = sh(new T.Mesh(new T.BoxGeometry(9.6, 0.1, 2.2), M.graphite)); hp.position.set(HALL, 0.05, 0); Z.hall.add(hp); const hb = blob(13, 4.5, 0.4); hb.position.x = HALL; Z.hall.add(hb);
    Z.colV = [235, 308, 388, 1500, 6360];
    Z.cols = Z.colV.map((v, k) => { const g = new T.CylinderGeometry(0.5, 0.5, 1, 48); g.translate(0, 0.5, 0); const m = sh(new T.Mesh(g, k === 4 ? M.gold : M.ceramic)); m.position.set(HALL + (k - 2) * 1.8, 0.1, 0); m.userData.h = Math.max(0.12, v / 6360 * 4.0); Z.hall.add(m); return m; });
    const stepG = rbox(1.15, 1.6, 1, 0.08, 0.02);
    Z.steps = [0, 1, 2, 3, 4].map((k) => { const m = sh(new T.Mesh(stepG, k === 4 ? M.gold : M.ceramic)); m.position.set(HALL + (k - 2) * 1.4, 0.1, 0); m.userData.h = 0.7 + k * 0.7; m.visible = false; Z.hall.add(m); return m; });
    Z.hseal = new T.Mesh(new T.CylinderGeometry(0.42, 0.42, 0.07, 48), M.gold); Z.hseal.visible = false; Z.hall.add(Z.hseal);

    /* COMPARE */
    Z.cmp = new T.Group(); scene.add(Z.cmp);
    for (const dx of [-2.7, 2.7]) { const d = sh(new T.Mesh(new T.CylinderGeometry(1.8, 1.8, 0.08, 64), M.graphite)); d.position.set(CMP + dx, 0.04, 0); Z.cmp.add(d); const b2 = blob(5, 5, 0.35); b2.position.x = CMP + dx; Z.cmp.add(b2); }
    const cl = mono(Z.cmp, CMP - 3.1, -0.3, [CMP - 2.4, 16], 0.62); cl.g.position.y = 0.08; cl.slot.scale.y = 0.2;
    const mon = new T.Group(); mon.position.set(CMP - 1.85, 0.08, 0.5); mon.rotation.y = -0.35; Z.cmp.add(mon);
    const mf = sh(new T.Mesh(rbox(0.95, 0.04, 0.62, 0.03, 0.006), M.graphite)); mf.rotation.x = Math.PI / 2; mf.position.set(0, 1.0, 0); mon.add(mf);
    const ms = new T.Mesh(new T.PlaneGeometry(0.86, 0.5), new T.MeshBasicMaterial({ color: '#f4f1ea' })); ms.position.set(0, 1.0 + 0.0, 0.025); mon.add(ms);
    const mst = sh(new T.Mesh(new T.BoxGeometry(0.04, 0.62, 0.04), M.graphite)); mst.position.set(0, 0.38, -0.02); mon.add(mst);
    Z.cmpWarn = new T.Mesh(new T.PlaneGeometry(0.3, 0.02), new T.MeshBasicMaterial({ color: RED })); Z.cmpWarn.position.set(0, 1.0, 0.027); mon.add(Z.cmpWarn);
    const cc = new T.Group(); cc.position.set(CMP + 2.7, 0.08, 0); Z.cmp.add(cc);
    const ccb = sh(new T.Mesh(new T.CylinderGeometry(0.45, 0.48, 0.55, 40), M.graphite)); ccb.position.y = 0.275; cc.add(ccb);
    Z.cmpSeal = sh(new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.06, 40), M.gold)); Z.cmpSeal.position.y = 1.0; cc.add(Z.cmpSeal);
    Z.cmpBeams = []; for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 + 0.95, vx = Math.cos(a) * 1.3, vz = Math.sin(a) * 1.15; const mm = mono(cc, vx, vz, null, 0.32); mm.slot.scale.y = 0.15; const bm = hair(GOLD, 0.009, 0.85); Z.cmp.add(bm); Z.cmpBeams.push([bm, [CMP + 2.7, 1.0, 0], [CMP + 2.7 + vx, 0.08 + 0.9, vz]]); }

    /* FREEZE stage */
    Z.frz = new T.Group(); scene.add(Z.frz);
    for (const dx of [-1.7, 1.7]) { const p = sh(new T.Mesh(rbox(2.2, 1.6, 0.1, 0.06, 0.015), M.graphite)); p.position.set(FZ[0] + dx, 0, FZ[2]); Z.frz.add(p); const b3 = blob(3.4, 2.6, 0.35); b3.position.set(FZ[0] + dx, 0.006, FZ[2]); Z.frz.add(b3); }
    const discG = new T.CylinderGeometry(0.36, 0.36, 0.09, 40);
    for (let k = 0; k < 14; k++) { const m = sh(new T.Mesh(discG, M.slate)); m.position.set(FZ[0] - 1.7 + (k % 2 ? 0.4 : -0.4), 0.15 + Math.floor(k / 2) * 0.1, FZ[2]); Z.frz.add(m); }
    Z.ice = new T.Mesh(rbox(1.9, 1.3, 1.05, 0.08, 0.03), new T.MeshPhysicalMaterial({ color: '#eef3f7', roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.38, depthWrite: false }));
    Z.ice.position.set(FZ[0] - 1.7, 0.1, FZ[2]); Z.frz.add(Z.ice);
    Z.loose = []; for (let k = 0; k < 14; k++) { const m = sh(new T.Mesh(discG, M.gold)); const p0 = [FZ[0] + 1.7 + (k % 2 ? 0.4 : -0.4), 0.15 + Math.floor(k / 2) * 0.1, FZ[2]]; m.position.set(...p0); m.userData.p0 = p0; Z.frz.add(m); Z.loose.push(m); }
    Z.frzRing = new T.Mesh(new T.TorusGeometry(1.0, 0.018, 8, 64), M.graphite); Z.frzRing.position.set(FZ[0] + 6.5, 4.2, FZ[2] - 6); Z.frz.add(Z.frzRing);

    /* MAP stage */
    Z.map = new T.Group(); scene.add(Z.map);
    const sea = new T.Mesh(new T.PlaneGeometry(140, 90), new T.MeshStandardMaterial({ color: LIN('#a9b0b6'), roughness: 0.85 })); sea.rotation.x = -Math.PI / 2; sea.position.set(MAP[0], 0.01, MAP[2]); sea.receiveShadow = true; Z.map.add(sea);
    if (window.DATA && DATA.world) {
      const proj = FK.project(127.5, 38.5, 0.55), NAMES = ['North Korea', 'South Korea', 'Japan', 'China', 'Taiwan'];
      const reg = FK.regions(T, DATA.world.features.filter((f) => NAMES.includes(f.properties.name)), { project: proj, idOf: (f) => f.properties.name, color: () => '#eeeae3' });
      for (const id in reg.meshes) { const m = reg.meshes[id]; m.material = id === 'North Korea' ? M.red : new T.MeshStandardMaterial({ color: '#efebe4', roughness: 0.6 }); m.castShadow = true; m.receiveShadow = true; }
      reg.group.position.set(MAP[0], 0.02, MAP[2]); Z.map.add(reg.group); Z.reg = reg;
    }
    Z.pin = new T.Group(); const pl2 = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 1.3, 6), M.graphite); pl2.position.y = 0.65; const pb = new T.Mesh(new T.SphereGeometry(0.09, 20, 14), M.red); pb.position.y = 1.32; Z.pin.add(pl2, pb);
    Z.pin.position.set(MAP[0] - 0.13, 0.3, MAP[2] - 0.88); Z.map.add(Z.pin);

    /* presenter highlight objects: pulsing rings, a cold wallet, a service container */
    Z.rings = []; for (let k = 0; k < 14; k++) { const r = new T.Mesh(new T.TorusGeometry(1, 0.016, 8, 96), new T.MeshBasicMaterial({ color: GOLD, transparent: true, depthWrite: false })); r.rotation.x = -Math.PI / 2; r.visible = false; scene.add(r); Z.rings.push(r); }
    Z.cold = new T.Group(); Z.cold.position.set(...COLD); Z.cold.lookAt(0, 0, 16); Z.main.add(Z.cold);
    Z.cold.add(sh(new T.Mesh(rbox(1.5, 1.5, 1.6, 0.12, 0.03), M.graphite))); Z.cold.add(blob(2.8, 2.8, 0.45));
    const lockR = new T.Mesh(new T.TorusGeometry(0.2, 0.025, 10, 40), M.gold); lockR.position.set(0, 0.95, 0.77); Z.cold.add(lockR);
    const lockB = new T.Mesh(new T.BoxGeometry(0.34, 0.26, 0.04), M.gold); lockB.position.set(0, 0.72, 0.77); Z.cold.add(lockB); Z.cold.visible = false;
    Z.container = new T.Group(); Z.container.position.set(CONT[0], 0.5, CONT[2]); Z.main.add(Z.container);
    Z.container.add(sh(new T.Mesh(rbox(0.6, 0.6, 0.6, 0.07, 0.015), M.graphite))); const cg = blob(1.4, 1.4, 0.4); cg.position.y = -0.494; Z.container.add(cg);
    const cl2 = new T.Mesh(new T.PlaneGeometry(0.36, 0.02), new T.MeshBasicMaterial({ color: GOLD })); cl2.position.set(0, 0.42, 0.302); Z.container.add(cl2); Z.container.visible = false;

    /* grain tile + scrims */
    const gc = document.createElement('canvas'); gc.width = gc.height = 256; const gg = gc.getContext('2d'), id = gg.createImageData(256, 256);
    for (let k = 0; k < id.data.length; k += 4) { const v = Math.random() * 255; id.data[k] = id.data[k + 1] = id.data[k + 2] = v; id.data[k + 3] = 255; }
    gg.putImageData(id, 0, 0); Z.grain = gc;
    Z.dummy = new T.Object3D();
    const AH = [GOLD, GOLDL, RED].map((h) => new T.Color(h).getHex());
    scene.traverse((o) => { const m = o.material; if (m && m.isMeshBasicMaterial && !m.map && AH.includes(m.color.getHex())) m.color.convertSRGBToLinear(); });
    return Z;
  }

  /* ---------- per-frame ---------- */
  const TRAVEL = 1.7;
  let CAMR = null; const _v = new T.Vector3();
  const scr = (p) => { _v.set(p[0], p[1], p[2]).project(CAMR); return [(_v.x + 1) / 2 * W, (1 - _v.y) / 2 * H, _v.z < 1]; };
  function update(t, Z, { camera }) {
    CAMR = camera; camAt(t, camera);
    const st = stage(t), d = Z.dummy;
    const FX = window.__PV_FX || null, ft = FX ? (performance.now() - FX.t0) / 1000 : 0, fid = FX ? FX.id : '';
    const tStream = fid === 'ethflow' || fid === 'drops' ? at('persist') + 0.5 + (ft % 4) : t;
    const tSl = fid === 'slips' ? at('signer') + 1.2 + (ft % 7.8) : fid === 'fake' ? at('abuse') + 0.4 + (ft % 5.0) : t;
    const tFly = fid === 'drops' ? at('persist') + (ft % (PDROP[5] + 0.9)) : fid === 'money' ? at('why') + 0.4 + (ft % 6.0) : t;
    const tFrz = fid === 'loose' ? at('freeze') + 1.6 + (ft % 4.2) : t;
    Z.main.visible = st.main; Z.desk.visible = st.desk; Z.rack.visible = st.desk; Z.hall.visible = st.hall; Z.cmp.visible = st.cmp; Z.frz.visible = st.frz; Z.map.visible = st.map;
    const lens = camera.position; Z.sun.position.set(lens.x - 7, 15, lens.z - 6); Z.sun.target.position.set(lens.x, 0, lens.z - 14); // shadow box follows the shot

    /* vault slots */
    Z.mons.forEach((m, i) => {
      const lv = level(i, t); m.slot.scale.y = Math.max(0.0001, lv); m.slot.visible = lv > 0.003;
      m.cap.material.opacity = lv < 0.06 && t >= at('drain') ? C((0.06 - lv) / 0.03) : 0;
      m.mark.material.opacity = inB('lesson', t) || t >= end('lesson') ? C((rel('lesson', t) - 2.4) / 0.5) * 0.8 : 0;
      const ms = (t >= at('lesson') ? eb(C((rel('lesson', t) - 0.7 - i * 0.05) / 0.45)) : 0);
      Z.minis[i].visible = ms > 0.01; Z.minis[i].scale.setScalar(Math.max(0.01, ms)); Z.minis[i].position.y = TOPY + 0.55 + Math.sin(t * 2 + i) * 0.03;
    });

    ((t) => {
    /* streams + droplets */
    let n = 0;
    Z.streams.forEach((s, i) => {
      const segs = [];
      if (t < end('hook')) segs.push([-4, end('hook') - TRAVEL * 0.2, 0.16 + i * 0.012]);
      if (inB('drain', t)) segs.push([DR0(i), DR1(i), s.gap]);
      if (i === 0 && (inB('eip', t) || inB('persist', t))) segs.push([at('eip') + EIPM, end('persist') - 0.3, 0.07]);
      let used = 0;
      for (const [e0, e1, gap] of segs) {
        const k0 = Math.max(0, Math.ceil((t - TRAVEL - e0) / gap)), k1 = Math.floor((Math.min(t, e1) - e0) / gap);
        for (let k = k0; k <= k1 && used < Z.POOL; k++) {
          const u = (t - (e0 + k * gap)) / TRAVEL; if (u <= 0 || u >= 1) continue;
          d.position.copy(s.cv.getPoint(eio(u))); d.scale.setScalar(C(u / 0.08) * (1 - C((u - 0.82) / 0.18))); d.updateMatrix(); Z.drops.setMatrixAt(n + used, d.matrix); used++;
        }
      }
      for (; used < Z.POOL; used++) { d.position.set(0, -9, 0); d.scale.setScalar(0.0001); d.updateMatrix(); Z.drops.setMatrixAt(n + used, d.matrix); }
      n += Z.POOL;
      let head = 0, op = 0;
      if (t < end('hook')) { head = 1; op = 0.5; }
      else if (inB('drain', t)) { head = C((t - DR0(i)) / TRAVEL); op = 0.55 * C((t - DR0(i)) / 0.3) * (1 - 0.6 * C((t - DR1(i) - 0.5) / 1.0)); }
      else if (i === 0 && (inB('eip', t) || inB('persist', t))) { head = C((t - at('eip') - EIPM) / TRAVEL); op = 0.55; }
      s.tube.geometry.setDrawRange(0, Math.floor(head * 90) * 36); s.tube.material.opacity = op; s.tube.visible = op > 0.01;
    });
    Z.drops.instanceMatrix.needsUpdate = true;
    const flowing = t < end('hook') || inB('drain', t) || inB('eip', t) || inB('persist', t);
    Z.ring2.material.opacity = flowing ? 0.85 * (0.75 + 0.25 * Math.sin(t * 5)) : 0;

    })(tStream);

    ((t) => {
    /* seal: bob; presses in signer; lifts in users */
    let sy = SEALY + Math.sin(t * 1.4) * 0.05;
    const pv = (inB('signer', t) || inB('abuse', t)) ? pressAt(t) : 0; sy = lerp(sy, 1.06, pv);
    Z.seal.position.y = sy; Z.seal.rotation.y = t * 0.25;
    let since = 9; for (const ts of STAMPS) if (t >= ts) since = Math.min(since, t - ts);
    const rr = since < 0.6 && (inB('signer', t) || inB('abuse', t)) ? since / 0.6 : -1;
    Z.ripple.material.opacity = rr >= 0 ? 0.9 * (1 - rr) : 0; Z.ripple.scale.setScalar(0.7 + Math.max(0, rr) * 1.6);
    Z.beams.forEach((m, i) => {
      const t0 = ABU_T[i] + 0.15, on = t >= t0 && t < at('eip');
      if (!on) { m.visible = false; return; }
      aim(m, [CORE[0], CORE[1] + 1.05, CORE[2]], [POS[i][0], TOPY + 0.05, POS[i][1]], eio(C((t - t0) / 0.6)));
    });

    /* transfer orders: legit (signer) rise away after the stamp; fake (abuse) come along the red path and fly to every vault */
    const CT = [CORE[0], 0.972, CORE[2]];
    Z.slips.forEach((sl, k) => {
      let pos = null, show = false, stamped = false, fake = false, sc = 1, rot = 0;
      if (inB('signer', t) && k < 6) { const ts = SIG_T[k], a = (t - (ts - 0.8)) / 0.8, b = (t - ts - 0.2) / 1.1;
        if (a > 0 && t < ts) { const e = eio(C(a)); pos = [CT[0] + 0.0, lerp(1.3, CT[1], e), lerp(CT[2] + 2.4, CT[2], e)]; show = true; }
        else if (t >= ts && b < 1) { stamped = t > ts + 0.02; const e = eio(C(b)); pos = bez(CT, [CT[0] + 3.2, 3.4, CT[2] - 2.4], 0.8, e); show = true; sc = 1 - C((b - 0.7) / 0.3); rot = e * 0.6; } }
      if (inB('abuse', t)) { const ts = ABU_T[k], a = (t - (ts - 0.5)) / 0.5, b = (t - ts - 0.15) / 0.6; fake = true;
        if (a > 0 && t < ts) { const e = eio(C(a)); pos = [CT[0], lerp(1.0, CT[1], e), lerp(CT[2] + 3.2, CT[2], e)]; show = true; }
        else if (t >= ts && b < 1.15) { stamped = t > ts + 0.02; const e = eio(C(b)); pos = bez(CT, [POS[k][0], TOPY + 0.12, POS[k][1]], 1.0, e); show = true; sc = 1 - C((b - 0.9) / 0.25); rot = e * 0.8; } }
      sl.g.visible = show && sc > 0.01 && st.main; if (!sl.g.visible) return;
      sl.g.position.set(...pos); sl.g.rotation.set(rot * 0.3, rot, 0); sl.g.scale.setScalar(Math.max(0.01, sc)); sl.bd.visible = fake; sl.mk.visible = stamped;
    });

    })(tSl);

    ((t) => {
    /* fly pool: persist deposits, users refunds, why money, freeze ETH/BTC */
    let f = 0; const put = (p, s) => { if (f >= 260) return; d.position.set(p[0], p[1], p[2]); d.scale.setScalar(s); d.updateMatrix(); Z.fly.setMatrixAt(f++, d.matrix); };
    if (inB('persist', t)) PDROP.forEach((t0, k) => { const q = (rel('persist', t) - t0) / 0.7; if (q > 0 && q < 1) put([ETH.x + Math.sin(k) * 0.12, lerp(TOPY + 3.6, TOPY + 0.1, q * q), ETH.z], 1.9 * (1 - C((q - 0.85) / 0.15))); });
    if (inB('users', t)) for (let i = 0; i < 120; i++) { const k = i % N, s0 = 0.9 + HS(i, 4) * 2.4 + k * 0.08, q = (rel('users', t) - s0) / 1.0; if (q > 0 && q < 1) put(bez([CORE[0], SEALY + 0.1, CORE[2]], [POS[k][0], TOPY + 0.1, POS[k][1]], 2.0, eio(q)), C(q / 0.1) * (1 - C((q - 0.85) / 0.15))); }
    if (inB('why', t)) for (let i = 0; i < 90; i++) { const s0 = 0.4 + HS(i, 13) * 5.0, q = (rel('why', t) - s0) / 1.4; if (q > 0 && q < 1) put(bez([MAP[0] - 7 + HS(i, 14) * 2, 3.4, MAP[2] - 3 + HS(i, 15) * 2], [MAP[0] - 0.13, 0.5, MAP[2] - 0.88], 1.6, eio(q)), 1.1 * (1 - C((q - 0.85) / 0.15))); }
    for (; f < 260;) put([0, -9, 0], 0.0001);
    Z.fly.instanceMatrix.needsUpdate = true;
    Z.sweeper.visible = inB('persist', t); Z.sweeper.rotation.z = t;

    })(tFly);

    /* EIP tiles: 50 pre-signed authorisations, one matches */
    const er = rel('eip', t), eOn = inB('eip', t), MATCH = 23, cpos = camera.position;
    const GC = new T.Vector3(-10.6, 1.6, -1.2);
    Z.tiles.forEach((m, k) => {
      const e = Z.tileEdges[k];
      if (!eOn || er > 3.8) { m.visible = false; e.visible = false; return; }
      const gx = GC.x + ((k % 10) - 4.5) * 0.19, gy = GC.y + (2 - Math.floor(k / 10)) * 0.25, gz = GC.z;
      const fly = eo(C((er - 0.15 - k * 0.012) / 0.8));
      let x = lerp(gx + (HS(k, 7) - 0.5) * 6, gx, fly), y = lerp(gy + 3 + HS(k, 8) * 2, gy, fly), z = lerp(gz - 4 - HS(k, 9) * 3, gz, fly);
      const scanned = er > 1.25 + (k % 10) * 0.07 + Math.floor(k / 10) * 0.05;
      let op = fly, col = '#f7f5f1', ecol = '#b9b3a8';
      if (k === MATCH) { if (scanned) { col = GOLDL; ecol = GOLD; } const g2 = eio(C((er - 2.5) / 0.6)); x = lerp(x, ETH.x - 0.1, g2); y = lerp(y, 1.5, g2); z = lerp(z, ETH.z + 0.75, g2); op = 1 - C((er - 3.1) / 0.3); }
      else { if (scanned) { col = '#e4e0d8'; ecol = '#cfc9be'; } const fall = C((er - 2.3 - HS(k, 10) * 0.3) / 0.9); y -= fall * fall * 2.2; op *= 1 - C((er - 2.4) / 0.6); }
      m.position.set(x, y, z); m.lookAt(cpos.x, cpos.y, cpos.z); e.position.copy(m.position); e.quaternion.copy(m.quaternion); e.translateZ(-0.002);
      if (col === GOLDL) m.material.color.copy(acc(GOLDL)); else m.material.color.set(col); if (ecol === GOLD) e.material.color.copy(acc(GOLD)); else e.material.color.set(ecol); m.material.opacity = op; e.material.opacity = op; m.visible = op > 0.01; e.visible = m.visible;
    });

    /* desk story */
    const comp = t >= at('playbook') + 1.6 && t < at('eip');
    Z.screen.material.color.set(comp ? '#f3e4e2' : '#f4f1ea'); Z.scrLine.forEach((l, k) => { if (comp && k % 2 === 0) l.material.color.copy(acc(RED)); else l.material.color.set('#bdb6aa'); });
    Z.leds.forEach((l, k) => { const on = comp ? 0.6 + 0.4 * Math.abs(Math.sin(t * 3 + k)) : 1; if (comp) l.material.color.copy(acc(RED)); else l.material.color.set('#f4efe4'); l.material.opacity = on; l.material.transparent = true; });
    const pbr = rel('playbook', t);
    if (inB('playbook', t) && pbr > 0.4 && pbr < 1.7) { const q = eio(C((pbr - 0.4) / 1.1)); Z.letter.visible = true; Z.letter.position.set(lerp(DESK[0] + 2.4, DESK[0], q), lerp(2.4, 1.12, q), lerp(DESK[2] + 1.6, DESK[2] - 0.05, q)); Z.letter.rotation.set(-1.1 * q, (1 - q) * 1.5, 0); Z.letter.scale.setScalar(1 - 0.8 * C((pbr - 1.4) / 0.3)); }
    else Z.letter.visible = false;
    const wp = t >= at('notone') + 0.9 && t < at('eip') ? eo(C((t - at('notone') - 0.9) / 2.0)) : 0;
    aim(Z.worm, [DESK[0], 0.95, DESK[2] - 0.35], [CORE[0], 1.0, CORE[2] + 0.7], wp); Z.worm.material.opacity = t < at('signer') + 1 ? 0.9 : inB('abuse', t) ? 0.6 + 0.3 * Math.sin(t * 6) : 0.3;
    const nr = rel('notone', t);
    Z.alarms.forEach((m, k) => { const on = inB('notone', t) && nr > 1.0 + k * 0.9; m.visible = on; if (on) { const ph = ((nr - 1.0 - k * 0.9) % 1.4) / 1.4; m.scale.setScalar(0.7 + ph * 0.9); m.material.opacity = 0.9 * (1 - ph); } });

    /* hall */
    const sr = rel('scale', t), RISE = [0.35, 0.75, 1.15, 1.7, 2.5];
    Z.cols.forEach((m, k) => { const s = inB('scale', t) ? eio(C((sr - RISE[k]) / 0.9)) : 0; m.scale.y = Math.max(0.001, m.userData.h * s); m.visible = s > 0.01; });
    const tr = rel('trend', t);
    Z.steps.forEach((m, k) => { const s = inB('trend', t) ? eio(C((tr - 0.5 - k * 0.5) / 0.7)) : 0; m.visible = s > 0.01; m.scale.set(1, Math.max(0.001, m.userData.h * s), 1); });
    const hs = inB('trend', t) ? eb(C((tr - 3.0) / 0.5)) : 0; Z.hseal.visible = hs > 0.01; Z.hseal.scale.setScalar(Math.max(0.01, hs)); Z.hseal.position.set(HALL + 2 * 1.4, 0.1 + 3.5 + 0.55 + Math.sin(t * 1.6) * 0.05, 0);

    /* compare */
    Z.cmpBeams.forEach(([bm, a, b], k) => aim(bm, a, b, st.cmp ? eo(C((rel('bybit', t) - 1.6 - k * 0.15) / 0.4)) : 0));
    Z.cmpSeal.position.y = 1.0 + Math.sin(t * 1.6) * 0.04; Z.cmpWarn.visible = Math.sin(t * 4) > -0.2;

    ((t) => {
    /* freeze */
    const fr = rel('freeze', t);
    const iceS = eo(C((fr - 0.9) / 0.7)); Z.ice.scale.set(1, Math.max(0.01, iceS), 1); Z.ice.material.opacity = 0.38 * C((fr - 0.9) / 0.3);
    Z.loose.forEach((m, k) => { const p0 = m.userData.p0, q = C((fr - 1.9 - (13 - k) * 0.16) / 1.1); if (q <= 0) { m.position.set(...p0); m.visible = true; return; } const w = bez(p0, [Z.frzRing.position.x, Z.frzRing.position.y, Z.frzRing.position.z], 1.2, eio(q)); m.position.set(...w); m.rotation.set(q * 6, q * 3, 0); m.visible = q < 0.96; });

    })(tFrz);

    /* map */
    if (Z.reg) for (const id in Z.reg.meshes) { const m = Z.reg.meshes[id]; m.scale.z = id === 'North Korea' ? 0.12 + 0.5 * eio(C((rel('who', t) - 0.5) / 0.9)) : 0.12; }
    const pinS = st.map ? eb(C((rel('who', t) - 1.1) / 0.5)) : 0; Z.pin.visible = pinS > 0.01; Z.pin.scale.set(1, Math.max(0.01, pinS), 1);

    /* lesson gate */
    const gs = inB('lesson', t) || (t >= end('lesson') && t < at('recap')) ? eio(C((rel('lesson', t) - 3.6) / 0.6)) : 0; Z.gate.visible = gs > 0.01; Z.gate.scale.x = Math.max(0.01, gs);

    /* presenter highlights for the explanation point on screen */
    Z.rings.forEach((r) => { r.visible = false; }); Z.cold.visible = false; Z.container.visible = false;
    if (FX) {
      let rk = 0; const ring = (x, y, z, rad, col, ph) => { const r = Z.rings[rk++]; if (!r) return; const w = 0.5 + 0.5 * Math.sin(ft * 3.2 + (ph || 0)); r.visible = true; r.position.set(x, y, z); r.scale.setScalar(Math.max(0.01, rad * (1 + 0.06 * w) * eo(C(ft / 0.5)))); r.material.color.copy(acc(col || GOLD)); r.material.opacity = 0.45 + 0.5 * w; };
      const vault = (i, col) => ring(POS[i][0], 0.03, POS[i][1], 0.85, col || GOLD, i * 0.5);
      if (fid === 'hot' || fid === 'beams' || fid === 'minis' || fid === 'limit') POS.forEach((p, i) => vault(i));
      if (fid === 'top4') [0, 1, 2, 3].forEach((i) => vault(i));
      if (fid === 'cold') { Z.cold.visible = true; Z.cold.scale.setScalar(Math.max(0.01, eb(C(ft / 0.6)))); ring(COLD[0], 0.03, COLD[2], 1.6, SLATE); }
      if (fid === 'laptop' || fid === 'path1') ring(DESK[0], 0.8, DESK[2] - 0.05, 0.62, fid === 'laptop' ? RED : GOLD);
      if (fid === 'other') Z.alarms.forEach((m, k) => { const ph = ((ft + k * 0.7) % 1.4) / 1.4; m.visible = true; m.scale.setScalar(0.7 + ph * 0.9); m.material.opacity = 0.9 * (1 - ph); });
      if (fid === 'path2') { Z.container.visible = true; Z.container.scale.setScalar(Math.max(0.01, eb(C(ft / 0.5)))); ring(CONT[0], 0.03, CONT[2], 0.75, GOLD); }
      if (fid === 'path3') { ring(CORE[0], 0.03, CORE[2], 1.3, GOLD); Z.beams.forEach((m, i) => aim(m, [CORE[0], CORE[1] + 1.05, CORE[2]], [POS[i][0], TOPY + 0.05, POS[i][1]], eio(C((ft - 0.3 - i * 0.08) / 0.6)))); POS.forEach((p, i) => { if (ft > 0.5 + i * 0.08) vault(i); }); }
      if (fid === 'core') ring(CORE[0], 0.03, CORE[2], 1.35, GOLD);
      if (fid === 'beams') Z.beams.forEach((m) => { m.material.opacity = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(ft * 4)); });
      if (fid === 'ice') { ring(FZ[0] - 1.7, 0.12, FZ[2], 1.35, SLATE); Z.ice.material.opacity = 0.3 + 0.2 * (0.5 + 0.5 * Math.sin(ft * 3)); }
      if (fid === 'loose') ring(FZ[0] + 1.7, 0.12, FZ[2], 1.35, GOLD);
      if (fid === 'nk' && Z.reg) { Z.reg.meshes['North Korea'].scale.z = 0.62 + 0.08 * Math.sin(ft * 3.5); ring(MAP[0] - 0.13, 0.36, MAP[2] - 0.88, 0.55, RED); }
      if (fid === 'cmpL' || fid === 'cmpR') ring(CMP + (fid === 'cmpL' ? -2.7 : 2.7), 0.1, 0, 1.95, GOLD);
      if (/^step\d$/.test(fid)) { const k = +fid[4]; ring(HALL + (k - 2) * 1.4, 0.14, 0, 1.12, GOLD); Z.steps[k].scale.y *= 1 + 0.03 * Math.sin(ft * 4); }
      if (fid === 'minis') Z.minis.forEach((m, i) => m.scale.setScalar(1 + 0.18 * Math.sin(ft * 4 + i)));
      if (fid === 'limit') Z.mons.forEach((m, i) => { m.mark.material.opacity = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(ft * 4 + i * 0.3)); });
      if (fid === 'gate') { const q = eio(C((ft % 2.6) / 0.7)); Z.gate.visible = true; Z.gate.scale.x = Math.max(0.01, q); }
      if (fid === 'ethflow' || fid === 'drops') vault(0);
    }
  }

  /* ---------- HUD: thin type, hairlines, no cards ---------- */
  function tx(g, s, x, y, size, w, col, o) {
    o = o || {}; g.font = w + ' ' + size + 'px ' + F; g.fillStyle = col; g.textAlign = o.align || 'left'; g.textBaseline = o.base || 'alphabetic';
    g.letterSpacing = (o.ls || 0) + 'px'; if (o.max) { const mw = g.measureText(s).width; if (mw > o.max) { g.font = w + ' ' + size * o.max / mw + 'px ' + F; } }
    g.fillText(s, x, y); const wd = g.measureText(s).width; g.letterSpacing = '0px'; return wd;
  }
  function segs(g, list, x, y, size, maxW) { // list: [[text, color, weight]]
    const meas = (sz) => list.reduce((a, s) => { g.font = (s[2] || 300) + ' ' + sz + 'px ' + F; return a + g.measureText(s[0]).width; }, 0);
    let sz = size, w = meas(sz); if (w > maxW) { sz *= maxW / w; }
    let xx = x; for (const s of list) xx += tx(g, s[0], xx, y, sz, s[2] || 300, s[1] || INK);
  }
  const chap = (id) => ({ hook: ['01', 'เหตุการณ์'], scale: ['01', 'เหตุการณ์'], drain: ['01', 'เหตุการณ์'], laptop: ['02', 'ทางเข้า'], devops: ['02', 'ทางเข้า'], howin: ['02', 'ทางเข้า'], playbook: ['02', 'ทางเข้า'], notone: ['02', 'ทางเข้า'],
    signer: ['03', 'กลไกการโจมตี'], abuse: ['03', 'กลไกการโจมตี'], eip: ['03', 'กลไกการโจมตี'], persist: ['03', 'กลไกการโจมตี'], freeze: ['03', 'กลไกการโจมตี'], who: ['04', 'ผู้อยู่เบื้องหลัง'], evidence: ['04', 'ผู้อยู่เบื้องหลัง'], why: ['04', 'ผู้อยู่เบื้องหลัง'],
    bybit: ['05', 'เทียบกับเคสอื่น'], trend: ['05', 'เทียบกับเคสอื่น'], users: ['06', 'ผลกระทบและบทเรียน'], lesson: ['06', 'ผลกระทบและบทเรียน'], recap: ['07', 'สรุป'], ask: ['07', 'สรุป'] })[id];

  const clock = (t) => { const m = Math.round(5 + 20 * eio(C(rel('drain', t) / (dur('drain') * 0.86)))); return 'เวลาไทย 03:' + String(m).padStart(2, '0') + ' น.'; };
  const pct = (t) => Math.round(95 * eio(C((rel('users', t) - 0.9) / 2.8)));
  /* title block per beat: h1/h2 = [[text,color,weight],...] or function(t) */
  const TB = {
    hook: { h1: [['การแฮ็กคริปโต', INK], ['ครั้งใหญ่ที่สุดในโลก', INK, 400]], h2: [['โดยไม่ต้องถอดรหัสแม้แต่ตัวเดียว', GOLD, 400]] },
    scale: { h1: [['ใหญ่กว่าเคส Bybit ราว ', INK], ['4 เท่า', GOLD, 400]], h2: [['$6.36B ≈ 2 แสนล้านบาท', INK2]], foot: 'มูลค่าที่ถูกขโมยในแต่ละเคส (ดอลลาร์สหรัฐ)' },
    drain: { h1: [['ตู้เงินออนไลน์ ', INK], ['10 บล็อกเชน', INK, 400], [' ถูกเปิดพร้อมกัน', INK]], h2: (t) => [[clock(t), GOLD, 400]], foot: 'เช้ามืด 30 ต.ค. 2569 · ตู้เงินออนไลน์ = hot wallet ที่ exchange ใช้โอนเงินประจำวัน · ส่วนใหญ่ภายใน ~20 นาที' },
    laptop: { h1: [['จุดเริ่มต้น: ', INK], ['โน้ตบุ๊กพนักงาน 1 เครื่อง', INK, 400]], h2: [['ของวิศวกร DevOps ที่ Binance', RED, 400]] },
    devops: { h1: [['DevOps คือใคร', INK]], h2: [['ทีมที่ดูแลระบบหลังบ้าน', GOLD, 400]], foot: 'เครื่องของทีมนี้จึงเข้าถึงเซิร์ฟเวอร์จริงได้ เหมือนถือบัตรผ่านเข้าห้องเครื่อง' },
    howin: { h1: [['แล้วเจาะเข้าเครื่องได้อย่างไร', INK]], h2: [['Binance ยังไม่เปิดเผยวิธี', RED, 400]] },
    playbook: { h1: [['แต่กลุ่มที่ถูกชี้ตัวมีวิธีประจำ', INK]], h2: [['หลอกด้วย “งานปลอม”', GOLD, 400]], foot: 'ยังไม่ยืนยันว่าเคส Binance ใช้วิธีใด' },
    notone: { h1: [['ไม่ใช่ความผิดของพนักงานคนเดียว', INK]], h2: [['Binance พบจุดเจาะอื่นร่วมด้วย', RED, 400]], foot: 'และยังไม่ได้กล่าวโทษพนักงานคนใด' },
    signer: { h1: [['แล้วไปถึง ', INK], ['ระบบอนุมัติการโอนอัตโนมัติ', GOLD, 400]], h2: [['ถือกุญแจทุกตู้ · เปรียบเหมือนเครื่องปั๊มตรายาง', INK2]], foot: 'คำสั่งถอนเข้ามาตลอดเวลา จึงให้ระบบอนุมัติแทนคน (signing service)' },
    abuse: { h1: [['แฮ็กเกอร์ไม่ต้องขโมยกุญแจ', INK]], h2: [['แค่สวมรอยส่งใบสั่งโอนปลอมให้ระบบอนุมัติ', RED, 400]], foot: 'ตามการวิเคราะห์ของ TRM Labs · Binance ยังไม่เปิดสาเหตุทั้งหมด' },
    eip: { h1: [['ตู้ ETH: เซ็นอนุมัติล่วงหน้า ', INK], ['50 คิว', INK, 400]], h2: [['ตรงคิวเดียว ก้อนแรกหายไป $2.5B', GOLD, 400]], foot: 'เลขคิว (nonce) ของตู้ขยับตลอด จึงเซ็นเผื่อไว้ 50 คิว · EIP-7702' },
    persist: { h1: [['ช่องทางยังเปิดอยู่ ', INK], ['กลับมาดูดซ้ำ 6 รอบ', INK, 400]], h2: [['เงินฝากใหม่ไหลเข้าไปให้ดูดต่อ', RED, 400]], foot: 'รวมทั้งเครือข่าย Ethereum ~$3.79B (TRM Labs) · รวม USDC $823M ผ่าน approval ที่ค้างไว้' },
    freeze: { h1: [['Stablecoin มีผู้ออกเหรียญ สั่งล็อกได้', INK]], h2: [['ETH กับ BTC ไม่มีตัวกลาง ล็อกไม่ได้', RED, 400]], foot: 'ยอดล็อก: TRM Labs ~$2.7B · Binance ~$3B' },
    who: { h1: [['ใครอยู่เบื้องหลัง', INK]], h2: [['FBI ชี้: ', INK2], ['TraderTraitor', RED, 400], [' ของเกาหลีเหนือ', INK2]], foot: 'หน่วยแฮ็กของรัฐ ในเครือกลุ่ม Lazarus' },
    evidence: { h1: [['รู้ได้อย่างไรว่าเป็นเกาหลีเหนือ', INK]], h2: [['การเตรียมการซ้ำกับเคส Bybit', GOLD, 400]], foot: 'TRM Labs ระบุว่ามั่นใจสูง · Chainalysis เห็นตรงกัน' },
    why: { h1: [['ขโมยไปทำไม', INK]], h2: [['หาเงินเลี่ยงการคว่ำบาตร', GOLD, 400]], foot: 'เป็นแหล่งเงินของรัฐบาลและโครงการอาวุธ (Chainalysis, AP)' },
    bybit: { h1: [['Bybit 2568: ', INK, 400], ['หลอกหน้าจอให้คนกดอนุมัติเอง', INK]], h2: [['Binance 2569: ', GOLD, 400], ['ยึดระบบอนุมัติทั้งระบบ', GOLD]], foot: 'ทั้งสองเคส FBI ชี้ว่าเป็นกลุ่ม TraderTraitor' },
    trend: { h1: [['ทุกเคส แฮ็กเกอร์ขยับเข้าใกล้', INK]], h2: [['ระบบอนุมัติ', GOLD, 400], [' มากขึ้นเรื่อยๆ', INK]] },
    users: { h1: [['แล้วเงินลูกค้าล่ะ', INK]], h2: (t) => [['Binance ชดเชยแล้ว ', INK2], ['~' + pct(t) + '%', GOLD, 400]], foot: 'กองทุน SAFU + เงินบริษัท (จัดสรร $6.34B) · เปิดให้ถอนเงินแล้ว 1 พ.ย. 2569' },
    lesson: { h1: [['บทเรียน: ถ้าระบบอนุมัติถูกยึด', INK]], h2: [['ต้องไม่เสียทุกตู้', GOLD, 400]] },
  };
  const LISTS = {
    playbook: { d: [1.8, 3.0], items: [['ปลอมเป็น HR ส่ง “แบบทดสอบโค้ด”', 'เปิดแล้วติดมัลแวร์ · เคส DMM 2567 (FBI)'], ['หลอกให้เปิดโปรเจกต์ปลอม', 'Docker ปลอมบน Mac นักพัฒนา · เคส Bybit 2568']] },
    evidence: { d: [0.9, 2.0, 3.1], items: [['เงินตั้งต้นจาก Tornado Cash', 'บริการผสมเงินคริปโต · ก้อนเล็กก่อนลงมือ'], ['ซ้อมก่อนลงมือจริง', 'ทดสอบกับกระเป๋าตัวเอง 3 ใบ ภายใน 36 ชม.'], ['เซ็นเตรียมไว้ แล้วยิงรวดเดียว', 'รูปแบบเดียวกับเคส Bybit']] },
    why: { d: [1.6, 3.2], items: [['ปี 2568 เกาหลีเหนือขโมยคริปโต $2.02B', 'สถิติสูงสุด · ราว 6 ใน 10 ของที่ถูกขโมยทั้งโลก (Chainalysis)'], ['Binance เคสเดียว $6.36B', 'มากกว่ายอดทั้งปี 2568 กว่า 3 เท่า · ใกล้ยอดสะสมทุกปี ~$6.75B']] },
  };
  const SCRIM = {};
  function scrim(side) {
    if (SCRIM[side]) return SCRIM[side];
    const c = document.createElement('canvas'); c.width = W; c.height = H; const q = c.getContext('2d');
    if (side === 'L') { const hg = q.createLinearGradient(0, 0, W * 0.6, 0); hg.addColorStop(0, BGA(0.92)); hg.addColorStop(0.5, BGA(0.65)); hg.addColorStop(1, BGA(0)); q.fillStyle = hg; q.fillRect(0, 0, W, H);
      q.globalCompositeOperation = 'destination-in'; const vg = q.createLinearGradient(0, H * 0.55, 0, H * 0.76); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, '#000'); q.fillStyle = vg; q.fillRect(0, 0, W, H); }
    else if (side === 'R') { const hg = q.createLinearGradient(W, 0, W * 0.45, 0); hg.addColorStop(0, BGA(0.92)); hg.addColorStop(0.55, BGA(0.7)); hg.addColorStop(1, BGA(0)); q.fillStyle = hg; q.fillRect(0, 0, W, H);
      q.globalCompositeOperation = 'destination-in'; const vg = q.createLinearGradient(0, H * 0.12, 0, H * 0.28); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, '#000'); q.fillStyle = vg; q.fillRect(0, 0, W, H * 0.75); }
    else { const hg = q.createLinearGradient(W, 0, W * 0.62, 0); hg.addColorStop(0, BGA(0.85)); hg.addColorStop(1, BGA(0)); q.fillStyle = hg; q.fillRect(0, 0, W, H);
      q.globalCompositeOperation = 'destination-in'; const vg = q.createLinearGradient(0, H * 0.42, 0, H * 0.3); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, '#000'); q.fillStyle = vg; q.fillRect(0, 0, W, H); }
    return (SCRIM[side] = c);
  }
  const L = 120;
  function title(g, t, id) {
    const c = TB[id]; if (!c) return;
    const a1 = C((rel(id, t) - 0.25) / 0.6) * C((end(id) - t) / 0.35), a2 = C((rel(id, t) - 0.55) / 0.6) * C((end(id) - t) / 0.35), a3 = C((rel(id, t) - 0.9) / 0.6) * C((end(id) - t) / 0.35);
    const h1 = typeof c.h1 === 'function' ? c.h1(t) : c.h1, h2 = c.h2 && (typeof c.h2 === 'function' ? c.h2(t) : c.h2);
    const y1 = c.foot || h2 ? (h2 ? 860 : 920) : 940, y2 = 934;
    g.save(); g.globalAlpha = a1; g.translate(0, 10 * (1 - eo(a1))); segs(g, h1, L, h2 ? 858 : 932, 56, 1000); g.restore();
    if (h2) { g.save(); g.globalAlpha = a2; g.translate(0, 10 * (1 - eo(a2))); segs(g, h2, L, y2, 56, 1000); g.restore(); }
    if (c.foot) { g.save(); g.globalAlpha = a3; g.fillStyle = 'rgba(28,30,34,.3)'; g.fillRect(L, 966, 60 * eo(a3), 1); tx(g, c.foot, L, 1002, 24, 300, MUTE, { max: 1060 }); g.restore(); }
    void y1;
  }
  function list(g, t, id) {
    const c = LISTS[id]; if (!c || window.__PV_ON) return;
    const x = 1170, w = 640, n = c.items.length, h = 132, y0 = 300 + (3 - n) * 40;
    c.items.forEach((it, k) => {
      const a = C((rel(id, t) - c.d[k]) / 0.5) * C((end(id) - t) / 0.3); if (a <= 0) return;
      const y = y0 + k * h; g.save(); g.globalAlpha = a; g.translate(16 * (1 - eo(a)), 0);
      g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y, w * eo(a), 1);
      tx(g, String(k + 1).padStart(2, '0'), x, y + 44, 20, 500, GOLD, { ls: 3 });
      tx(g, it[0], x + 58, y + 46, 32, 400, INK, { max: w - 60 });
      tx(g, it[1], x + 58, y + 88, 22, 300, MUTE, { max: w - 60 });
      g.restore();
    });
  }
  function lab(g, p3, l1, l2, a, o) { // hairline label above a 3D point
    if (a <= 0) return; o = o || {}; const p = scr(p3); if (!p[2]) return; if (window.__PV_SIDE && p[0] > W * 0.5) return;
    const col = o.col || INK; g.save(); g.globalAlpha = a;
    g.strokeStyle = o.tick || 'rgba(28,30,34,.28)'; g.lineWidth = 1; g.beginPath(); g.moveTo(p[0], p[1] - 6); g.lineTo(p[0], p[1] - 26); g.stroke();
    if (l2) { tx(g, l1, p[0], p[1] - 60, o.s1 || 19, 500, col, { align: 'center', ls: o.ls == null ? 2 : o.ls }); tx(g, l2, p[0], p[1] - 34, o.s2 || 18, 300, o.col2 || MUTE, { align: 'center' }); }
    else tx(g, l1, p[0], p[1] - 36, o.s1 || 19, o.w || 500, col, { align: 'center', ls: o.ls == null ? 2 : o.ls });
    g.restore();
  }
  const fmtM = (m) => (m >= 1000 ? '$' + (m / 1000).toFixed(2) + 'B' : '$' + Math.round(m) + 'M');
  /* top-right data panel */
  function panel(g, a, head, draw) { if (a <= 0 || window.__PV_SIDE) return; g.save(); g.globalAlpha = a; tx(g, head, 1440, 112, 16, 400, MUTE, { ls: 2 }); draw(1440, 112, 360); g.restore(); }
  function flow(g, x, y, w, nodes, c0, t) { // three-node hairline flow: order -> approval -> vault
    const xs = [x, x + w / 2, x + w], yy = y + 66;
    g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y + 20, w, 1); g.fillRect(x, yy + 22, w, 1);
    nodes.forEach((n, k) => tx(g, n, xs[k], yy, 20, k === 1 ? 500 : 400, k === 0 ? c0 : k === 1 ? GOLD : INK, { align: ['left', 'center', 'right'][k] }));
    const ph = (t * 0.45) % 1, px = x + w * ph; g.fillStyle = c0 === RED ? RED : GOLD; g.beginPath(); g.arc(px, yy + 22.5, 4, 0, 6.283); g.fill();
    [0.25, 0.75].forEach((f) => { const ax = x + w * f; g.fillStyle = MUTE; g.beginPath(); g.moveTo(ax + 6, yy + 22.5); g.lineTo(ax - 2, yy + 18); g.lineTo(ax - 2, yy + 27); g.fill(); });
  }
  function bar(g, x, y, w, frac, col, label, val) {
    tx(g, label, x, y, 18, 400, INK2); tx(g, val, x + w, y, 22, 300, col, { align: 'right' });
    g.fillStyle = 'rgba(28,30,34,.18)'; g.fillRect(x, y + 14, w, 1); g.fillStyle = col; g.fillRect(x, y + 12.5, w * frac, 4);
  }

  function hud(g, t, o) {
    const Z = window.__cz, id = beatOf(t);
    const A = (bid, d0) => C((rel(bid, t) - (d0 || 0)) / 0.4) * C((end(bid) - t) / 0.3);
    const rg = g.createRadialGradient(W * 0.42, -H * 0.1, 50, W * 0.42, -H * 0.1, H * 1.1); rg.addColorStop(0, 'rgba(255,255,255,.22)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H);

    /* scrims */
    if (TB[id] || id === 'cover') { g.save(); g.globalAlpha = id === 'cover' ? 1 : C(rel(id, t) / 0.4) * C((end(id) - t) / 0.3); g.drawImage(scrim('L'), 0, 0); g.restore(); }
    if (LISTS[id] && !window.__PV_ON) { g.save(); g.globalAlpha = A(id, LISTS[id].d[0] - 0.3); g.drawImage(scrim('R'), 0, 0); g.restore(); }
    if (['drain', 'eip', 'persist', 'freeze', 'users'].includes(id)) { g.save(); g.globalAlpha = A(id, 0.3); g.drawImage(scrim('P'), 0, 0); g.restore(); }

    /* 3D labels */
    if (id === 'cover' || id === 'hook' || id === 'drain' || id === 'users') Z.mons.forEach((m, i) => {
      const a = id === 'drain' ? A('drain', 0.6 + i * 0.05) : id === 'users' ? A('users', 0.3) : id === 'hook' ? A('hook', 0.8 + i * 0.05) : 0;
      if (a <= 0) return;
      const done = id === 'drain' ? eio(C((t - DR0(i)) / (DR1(i) - DR0(i)))) : 1;
      lab(g, [m.top.x, m.top.y + 0.35, m.top.z], CH[i][0], id === 'hook' ? '' : fmtM(CH[i][2] * done), a, { col2: done > 0 ? GOLD : MUTE });
    });
    if (id === 'scale') { const RISE = [0.35, 0.75, 1.15, 1.7, 2.5]; Z.cols.forEach((m, k) => { const s = C((rel('scale', t) - RISE[k] - 0.6) / 0.4) * C((end('scale') - t) / 0.3); const x = HALL + (k - 2) * 1.8, h = m.userData.h;
      lab(g, [x, 0.1 + h + 0.12, 0], ['$235M', '$308M', '$388M', '$1.5B', '$6.36B'][k], '', s, { s1: k === 4 ? 34 : 24, w: 300, ls: 0, col: k === 4 ? GOLD : INK });
      const b = scr([x, 0, 1.45]); g.save(); g.globalAlpha = s; tx(g, ['WazirX', 'DMM', 'Bitget', 'Bybit', 'Binance'][k], b[0], b[1] + 30, 22, 500, k === 4 ? GOLD : INK, { align: 'center', ls: 2 }); tx(g, ['2567', '2567', '2569', '2568', '2569'][k], b[0], b[1] + 58, 17, 300, MUTE, { align: 'center' }); g.restore(); }); }
    if (id === 'devops') { lab(g, [RACK[0], 1.95, RACK[2]], 'SERVER', 'เซิร์ฟเวอร์ของบริษัท', A('devops', 1.2)); lab(g, [DESK[0], 1.45, DESK[2] - 0.3], 'LAPTOP', 'เครื่อง DevOps', A('devops', 0.6)); }
    if (id === 'howin') { const p = scr([DESK[0], 1.95, DESK[2] - 0.3]), a = A('howin', 0.4); g.save(); g.globalAlpha = a; g.strokeStyle = RED; g.lineWidth = 1.5; g.beginPath(); g.arc(p[0], p[1] - 40, 46 + 6 * (1 - eo(a)), 0, 6.283); g.stroke(); tx(g, '?', p[0], p[1] - 40, 56, 300, RED, { align: 'center', base: 'middle' }); g.restore(); }
    if (id === 'notone') { lab(g, [RACK[0], 1.95, RACK[2]], 'เซิร์ฟเวอร์ภายใน', '', A('notone', 1.2), { col: RED, ls: 0, w: 400 }); lab(g, [CORE[0], 1.4, CORE[2]], 'จุดเจาะอื่น', 'ยังไม่เปิดเผย', A('notone', 2.1), { col: RED, ls: 0 }); }
    if (id === 'signer') { lab(g, [CORE[0], SEALY + 0.35, CORE[2]], 'SIGNING SERVICE', 'ระบบอนุมัติการโอน', A('signer', 0.8), { col: GOLD });
      const ns = SIG_T.filter((x) => t > x).length;
      panel(g, A('signer', 1.4), 'ระบบอนุมัติทำงานอย่างไร', (x, y, w) => { flow(g, x, y, w, ['ใบสั่งโอน', 'ระบบอนุมัติ', 'ตู้เงิน'], INK, t);
        tx(g, 'อนุมัติอัตโนมัติ', x, y + 132, 18, 300, MUTE); tx(g, String(ns), x + w, y + 136, 40, 300, INK, { align: 'right' }); }); }
    if (id === 'abuse') {
      lab(g, [CORE[0], 1.35, CORE[2] + 1.9], 'ใบสั่งโอนปลอม', 'สวมรอยเป็นระบบหลังบ้าน', A('abuse', 0.6), { col: RED, ls: 0, w: 400 });
      const na = ABU_T.filter((x) => t > x).length;
      panel(g, A('abuse', 0.4), 'สิ่งที่แฮ็กเกอร์ทำ', (x, y, w) => { flow(g, x, y, w, ['ใบสั่งปลอม', 'ระบบอนุมัติ', 'ทุกตู้'], RED, t);
        tx(g, 'ตู้ที่ถูกอนุมัติให้โอนออก', x, y + 132, 18, 300, MUTE); const ww = tx(g, '/10', x + w, y + 136, 24, 300, MUTE, { align: 'right' }); tx(g, String(na), x + w - ww - 4, y + 136, 40, 300, RED, { align: 'right' }); });
    }
    if (id === 'eip') {
      lab(g, [ETH.x, TOPY + 0.3, ETH.z], 'ETH', 'Binance 14', A('eip', 0.4));
      const er = rel('eip', t), q = C((er - EIPM) / 2.4), s = Math.round(204 * q);
      panel(g, A('eip', EIPM - 0.2), 'ก้อนแรกจากตู้ ETH', (x, y, w) => { tx(g, '$' + (2.5 * eio(q)).toFixed(2) + 'B', x + w, y + 70, 64, 300, INK, { align: 'right' }); tx(g, 'ใน ' + Math.floor(s / 60) + ' นาที ' + String(s % 60).padStart(2, '0') + ' วินาที หลังลายเซ็นตรงคิว', x + w, y + 104, 18, 300, MUTE, { align: 'right' }); g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y + 20, w, 1); });
      if (er > 1.3 && er < 3.2) { const k = 23, m = Z.tiles[k]; const p = scr([m.position.x, m.position.y + 0.18, m.position.z]); g.save(); g.globalAlpha = C((er - 1.9) / 0.3) * C((3.2 - er) / 0.3); tx(g, 'nonce ตรง', p[0], p[1] - 10, 18, 500, GOLD, { align: 'center', ls: 1 }); g.restore(); }
    }
    if (id === 'persist') {
      lab(g, [ETH.x, TOPY + 1.62, ETH.z], 'DEPOSIT SWEEPER', 'ระบบกวาดเงินฝากอัตโนมัติ', A('persist', 0.6));
      panel(g, A('persist', 0.2), 'รอบที่ถูกดูดซ้ำ (เวลาไทย)', (x, y, w) => { const TM = ['03:41', '03:59', '04:04', '04:44', '05:39', '06:56']; g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y + 20, w, 1);
        TM.forEach((s, k) => { const on = rel('persist', t) > PDROP[k], yy = y + 56 + Math.floor(k / 3) * 44, xx = x + (k % 3) * (w / 3); g.save(); g.globalAlpha *= on ? 1 : 0.35; g.fillStyle = on ? RED : MUTE; g.fillRect(xx, yy - 16, 2, 20); tx(g, s, xx + 12, yy, 26, 300, on ? INK : MUTE); g.restore(); }); });
    }
    if (id === 'drain') {
      const cnt = 6357 * eio(C((t - DR0(0)) / (DR1(N - 1) - DR0(0)))), mins = 20 * eio(C((t - DR0(0)) / (DR1(N - 1) - DR0(0))));
      panel(g, A('drain', 0.3), 'มูลค่าที่ถูกโอนออก', (x, y, w) => { const bw = tx(g, '$' + (cnt / 1000).toFixed(2), x + w - 46, y + 74, 68, 300, INK, { align: 'right' }); void bw; tx(g, 'B', x + w, y + 74, 68, 300, GOLD, { align: 'right' }); g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y + 20, w, 1);
        const ty = y + 120; g.fillRect(x, ty, w, 1); for (let q = 0; q <= 4; q++) { g.fillRect(x + w * q / 4, ty - 4, 1, 9); tx(g, String(q * 5), x + w * q / 4, ty + 24, 13, 400, MUTE, { align: 'center' }); }
        g.fillStyle = GOLD; g.fillRect(x, ty - 1.5, w * mins / 20, 3); g.beginPath(); g.arc(x + w * mins / 20, ty, 5, 0, 6.283); g.fill(); tx(g, 'นาที (โดยประมาณ)', x + w, ty + 46, 13, 400, MUTE, { align: 'right' }); });
    }
    if (id === 'freeze') {
      const q1 = eo(C((rel('freeze', t) - 0.9) / 1.0)), q2 = eo(C((rel('freeze', t) - 2.0) / 1.6));
      panel(g, A('freeze', 0.3), 'ผลการสั่งล็อก', (x, y, w) => { bar(g, x, y + 56, w, 2.85 / 6.36 * q1, SLATE, 'ล็อกทัน (Tether, Circle ฯลฯ)', q1 > 0.98 ? '~$2.7–3B' : '~$' + (2.7 * q1).toFixed(1) + 'B'); bar(g, x, y + 120, w, 2.4 / 6.36 * q2, RED, 'หลุดไปแล้ว', '~$' + (2.4 * q2).toFixed(1) + 'B'); });
      lab(g, [FZ[0] - 1.7, 1.45, FZ[2]], 'USDT · USDC', 'ล็อกได้', A('freeze', 0.6), { col: SLATE }); lab(g, [FZ[0] + 1.7, 1.2, FZ[2]], 'ETH · BTC', 'ล็อกไม่ได้', A('freeze', 0.6), { col: GOLD });
    }
    if (id === 'users') panel(g, A('users', 0.6), 'ชดเชยลูกค้า', (x, y, w) => { tx(g, pct(t) + '%', x + w, y + 74, 68, 300, INK, { align: 'right' }); g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(x, y + 20, w, 1); g.fillRect(x, y + 100, w, 1); g.fillStyle = GOLD; g.fillRect(x, y + 98.5, w * pct(t) / 100, 4); });
    if (id === 'who' || id === 'evidence' || id === 'why') {
      const a = C((t - at('who') - 1.3) / 0.4) * C((end('why') - t) / 0.3);
      lab(g, [MAP[0] - 0.13, 1.75, MAP[2] - 0.88], 'เกาหลีเหนือ', '', a, { col: RED, s1: 28, w: 400, ls: 1 });
      const P = [[MAP[0] + 0.2, 0.2, MAP[2] + 1.25, 'เกาหลีใต้'], [MAP[0] + 3.6, 0.2, MAP[2] + 0.4, 'ญี่ปุ่น'], [MAP[0] - 3.4, 0.2, MAP[2] - 0.6, 'จีน']];
      P.forEach((p) => { const s = scr(p); g.save(); g.globalAlpha = a * 0.9; tx(g, p[3], s[0], s[1], 19, 400, MUTE, { align: 'center', ls: 1 }); g.restore(); });
    }
    if (id === 'bybit') {
      const L1 = scr([CMP - 2.7, 0, 1.95]), L2 = scr([CMP + 2.7, 0, 1.95]);
      [[L1, 'BYBIT', 'ก.พ. 2568', '$1.5B · 1 ตู้', 'หน้าจอหลอกให้คนกดอนุมัติ', INK, A('bybit', 0.5)], [L2, 'BINANCE', 'ต.ค. 2569', '$6.36B · 10 เชน', 'ยึดระบบอนุมัติ เปิดทุกตู้', GOLD, A('bybit', 1.4)]].forEach(([p, n1, n2, n3, n4, col, a]) => {
        g.save(); g.globalAlpha = a; tx(g, n1, p[0], p[1] + 34, 22, 500, col, { align: 'center', ls: 3 }); tx(g, n2, p[0], p[1] + 60, 16, 300, MUTE, { align: 'center' });
        g.fillStyle = 'rgba(28,30,34,.22)'; g.fillRect(p[0] - 110, p[1] + 76, 220, 1); tx(g, n3, p[0], p[1] + 110, 26, 300, col, { align: 'center' }); tx(g, n4, p[0], p[1] + 140, 18, 300, INK2, { align: 'center' }); g.restore(); });
    }
    if (id === 'trend') {
      const NM = [['DMM · 2567', 'แก้คำสั่งโอน'], ['WazirX · 2567', 'หน้าจอหลอกตา'], ['Bybit · 2568', 'แก้โค้ดเว็บ vendor'], ['Bitget · 2569', 'ปลอมคำสั่งหลังบ้าน'], ['Binance · 2569', 'ยึดระบบอนุมัติ']];
      NM.forEach((s, k) => { const h = 0.7 + k * 0.7; lab(g, [HALL + (k - 2) * 1.4, 0.1 + h + (k === 4 ? 0.95 : 0.08), 0.8], s[0], s[1], A('trend', 0.9 + k * 0.5), { col: k === 4 ? GOLD : MUTE, col2: k === 4 ? GOLD : INK, s1: 15, s2: 22, ls: 1 }); });
    }
    if (id === 'lesson' && !window.__PV_SIDE) {
      const Lb = [[[POS[1][0], TOPY + 0.95, POS[1][1]], '01', 'แยกระบบอนุมัติแต่ละตู้', 0.9], [[POS[8][0], TOPY + 0.2, POS[8][1]], '02', 'จำกัดเงินในตู้ออนไลน์', 2.3], [[SINK.x, SINK.y + 0.4, SINK.z], '03', 'เบรกอัตโนมัติ', 3.7]];
      Lb.forEach(([p3, n1, s, d0]) => lab(g, p3, n1, s, A('lesson', d0), { col: GOLD, col2: INK, s2: 24, ls: 3 }));
    }

    const FXh = window.__PV_FX;
    if (FXh) { const fa = C(((performance.now() - FXh.t0) / 1000 - 0.3) / 0.4);
      if (FXh.id === 'cold') lab(g, [COLD[0], 1.95, COLD[2]], 'COLD WALLET', 'ออฟไลน์ · อนุมัติหลายชั้น', fa, { col: SLATE });
      if (FXh.id === 'path1') lab(g, [DESK[0], 1.5, DESK[2] - 0.3], 'LAPTOP', 'จุดเริ่มต้น', fa);
      if (FXh.id === 'path2') lab(g, [CONT[0], 1.2, CONT[2]], 'SERVICE CONTAINER', 'โปรแกรมหลังบ้าน', fa, { col: GOLD });
      if (FXh.id === 'path3') lab(g, [CORE[0], SEALY + 0.35, CORE[2]], 'SIGNING SERVICE', 'ถือกุญแจทุกตู้', fa, { col: GOLD });
    }

    /* titles + lists */
    title(g, t, id); list(g, t, id);

    /* cover */
    if (id === 'cover' || (id === 'hook' && rel('hook', t) < 0.5)) {
      const a = id === 'cover' ? C((end('cover') - t) / 0.35) : 0;
      g.save(); g.globalAlpha = a;
      tx(g, 'BINANCE  ·  30 ต.ค. 2569', L, 470, 20, 500, MUTE, { ls: 4 }); g.fillStyle = 'rgba(28,30,34,.4)'; g.fillRect(L, 494, 380, 1);
      tx(g, 'Binance ถูกแฮ็ก', L, 590, 76, 300, INK);
      const w = tx(g, '$6.36', L - 8, 800, 220, 300, INK); tx(g, 'B', L - 8 + w + 8, 800, 220, 300, GOLD);
      tx(g, 'ราว 2 แสนล้านบาท · ทำได้อย่างไร', L, 900, 50, 300, INK2);
      g.restore();
    }

    /* chapter marker */
    const ch = chap(id);
    if (ch) { const a = C((t - 0.3) / 0.5); g.save(); g.globalAlpha = a; tx(g, ch[0], L, 118, 18, 500, GOLD, { ls: 3 }); g.fillStyle = 'rgba(28,30,34,.35)'; g.fillRect(L + 40, 112, 46, 1); tx(g, ch[1], L + 102, 118, 18, 400, MUTE, { ls: 2 }); g.restore(); }

    /* recap / ask: full overlay */
    if (id === 'recap' || id === 'ask') {
      const a = id === 'recap' ? C(rel('recap', t) / 0.5) : 1; g.save(); g.fillStyle = BGA(0.86 * a); g.fillRect(0, 0, W, H); g.restore();
      if (id === 'recap') {
        const R = [['โน้ตบุ๊ก DevOps ถูกเจาะ 1 เครื่อง', INK], ['ไปถึงระบบอนุมัติที่เปิดได้ทุกตู้', INK], ['ดูด 10 เชน ส่วนใหญ่ใน ~20 นาที รวม $6.36B', INK], ['ล็อกทัน ~$2.7–3B · หลุดไป ~$2.4B', RED], ['FBI ชี้: TraderTraitor (เกาหลีเหนือ)', RED]];
        g.save(); g.globalAlpha = C(rel('recap', t) / 0.4) * C((end('recap') - t) / 0.3); tx(g, 'สรุปใน 5 บรรทัด', 360, 250, 52, 300, INK); g.restore();
        R.forEach(([s, col], k) => { const ak = C((rel('recap', t) - 0.4 - k * 0.35) / 0.4) * C((end('recap') - t) / 0.3); const y = 330 + k * 120; g.save(); g.globalAlpha = ak; g.translate(14 * (1 - eo(ak)), 0);
          g.fillStyle = 'rgba(28,30,34,.2)'; g.fillRect(360, y, 1200, 1); tx(g, String(k + 1).padStart(2, '0'), 360, y + 70, 22, 500, col === RED ? RED : GOLD, { ls: 3 }); tx(g, s, 440, y + 74, 40, 300, INK); g.restore(); });
      } else {
        const a0 = C(rel('ask', t) / 0.5) * C((end('ask') - t) / 0.3);
        g.save(); g.globalAlpha = a0; tx(g, 'ถ้าคุณเป็นผู้บริหาร Binance', 360, 300, 60, 300, INK); tx(g, 'จะเร่งแก้ข้อไหนก่อน', 360, 380, 60, 400, GOLD); g.restore();
        ['แยกระบบอนุมัติของแต่ละตู้', 'จำกัดเงินในตู้ออนไลน์ และวงเงินโอนต่อนาที', 'เบรกอัตโนมัติเมื่อเงินไหลออกผิดปกติ'].forEach((s, k) => { const ak = A('ask', 0.5 + k * 0.3); const y = 470 + k * 120; g.save(); g.globalAlpha = ak;
          g.fillStyle = 'rgba(28,30,34,.2)'; g.fillRect(360, y, 1200, 1); tx(g, String(k + 1).padStart(2, '0'), 360, y + 70, 22, 500, GOLD, { ls: 3 }); tx(g, s, 440, y + 74, 40, 300, INK); g.restore(); });
      }
    }
    /* end card */
    if (id === 'end') {
      const a = C(rel('end', t) / 0.4); g.save(); g.fillStyle = BG; g.fillRect(0, 0, W, H); g.globalAlpha = a;
      tx(g, 'ข้อมูล ณ 2 พ.ย. 2569', W / 2, 440, 48, 300, INK, { align: 'center' }); g.fillStyle = 'rgba(28,30,34,.3)'; g.fillRect(W / 2 - 40, 480, 80, 1);
      tx(g, 'ที่มา: TRM Labs, Binance, FBI, Blockaid, Chainalysis, Elliptic', W / 2, 560, 26, 300, INK2, { align: 'center' });
      tx(g, 'ภาพประกอบเชิงสัญลักษณ์ ไม่ใช่ภาพจริง', W / 2, 620, 20, 300, MUTE, { align: 'center' }); g.restore();
    }
    if (id !== 'end' && id !== 'cover' && id !== 'recap' && id !== 'ask') tx(g, 'ข้อมูล ณ 2 พ.ย. 2569', W - 120, H - 44, 15, 300, MUTE, { align: 'right', ls: 1 });

    /* grain */
    if (Z) { g.save(); g.globalAlpha = 0.045; g.globalCompositeOperation = 'multiply'; const ox = Math.floor((t * 977) % 256), oy = Math.floor((t * 571) % 256); g.translate(-ox, -oy); g.fillStyle = g.createPattern(Z.grain, 'repeat'); g.fillRect(0, 0, W + 256, H + 256); g.restore(); }
    /* fades at stage changes + end */
    let fa = 0; for (const c of CUTS) fa = Math.max(fa, 1 - Math.abs(t - c) / 0.42);
    fa = Math.max(fa, C((t - (DUR - 0.4)) / 0.4));
    if (fa > 0) { g.fillStyle = BGA(C(fa)); g.fillRect(0, 0, W, H); }
  }

  /* silent deck: no music, no SFX, no narration (the presenter talks live) */

  let PSTOP = Infinity; // presenter: never render past the end of the current section, even if a slow machine overshoots
  const go = () => VE.run({
    W, H, DUR, coverAt0: true, brandBar: false, endLen: 0, vignette: 'rgba(60,50,40,.2)', caps: [], bed: [], audio: [], brand: { name: '', series: '', bg: [BG, BG], motif: { notes: [] } }, file: 'binance-hack-6-36b-cinematic', title: 'Binance โดนแฮ็ก $6.36B',
    setup: (o) => { const Z = setup(o); window.__cz = Z; return Z; }, update: (t, Z, o) => update(Math.min(t, PSTOP), Z, o), hud: (g, t, o) => hud(g, Math.min(t, PSTOP), o),
  });
  window.__P = { BEATS, at, end, DUR, setStop: (v) => { PSTOP = v; } };
  const goP = () => { go(); const w = setInterval(() => { if (window.__veReady && window.__ve) { clearInterval(w); if (window.__presenter) window.__presenter(); } }, 50); };
  Promise.race([Promise.all(['300', '400', '500'].map((w) => document.fonts.load(w + ' 40px "IBM Plex Sans Thai"', 'ก A1'))), new Promise((r) => setTimeout(r, 3000))]).then(goP, goP);
})();

(function () {
  /* ---------- presenter deck content (kit-cine reads window.DECK) ---------- */
  const CHAPTERS = [
    { n: '01', name: 'เหตุการณ์', sub: 'เกิดอะไรขึ้น และใหญ่แค่ไหน', beats: ['hook', 'scale', 'drain'],
      recap: ['เงิน $6.36B ถูกโอนออกจาก 10 บล็อกเชน ส่วนใหญ่ภายใน ~20 นาที', 'ใหญ่กว่าสถิติเดิม (Bybit $1.5B) ราว 4 เท่า', 'ตู้ที่ถูกดูดคือ hot wallet ที่ต่อออนไลน์ตลอด', 'แฮ็กเกอร์ไม่ได้ถอดรหัส แต่ใช้ระบบที่มีสิทธิ์อนุมัติอยู่แล้ว'] },
    { n: '02', name: 'ทางเข้า', sub: 'แฮ็กเกอร์เข้ามาทางไหน', beats: ['laptop', 'devops', 'howin', 'playbook', 'notone'],
      recap: ['เริ่มจากโน้ตบุ๊กวิศวกร DevOps 1 เครื่อง ซึ่งเข้าถึงระบบจริงได้', 'Binance ยังไม่เปิดเผยวิธีเจาะ และพบจุดเจาะอื่นร่วมด้วย', 'กลุ่มที่ถูกชี้ตัวมักหลอกด้วยงานปลอม (เคส DMM, Bybit)', 'เส้นทาง: โน้ตบุ๊ก → service container → ระบบอนุมัติ'] },
    { n: '03', name: 'กลไกการโจมตี', sub: 'ทำไมเปิดได้ทุกตู้ โดยไม่ต้องรู้รหัส', beats: ['signer', 'abuse', 'eip', 'persist', 'freeze'],
      recap: ['ระบบอนุมัติอัตโนมัติถือกุญแจทุกตู้ แฮ็กเกอร์แค่ส่งใบสั่งโอนปลอม', 'ตู้ ETH: เซ็นล่วงหน้า 50 คิว (EIP-7702) ก้อนแรกหาย ≈$2.5B ใน 3 นาทีกว่า', 'ดูดซ้ำ 6 รอบ ผ่าน approval ที่ค้างอยู่และระบบกวาดเงินฝาก', 'ล็อก stablecoin ได้ ~$2.7–3B · ETH/BTC หลุดไป ~$2.4B'] },
    { n: '04', name: 'ผู้อยู่เบื้องหลัง', sub: 'ใคร และรู้ได้อย่างไร', beats: ['who', 'evidence', 'why'],
      recap: ['FBI ชี้ว่าเป็น TraderTraitor หน่วยแฮ็กของเกาหลีเหนือ (เครือ Lazarus)', 'หลักฐาน: เงินตั้งต้นจาก Tornado Cash, ซ้อมก่อน 36 ชม., เซ็นเตรียมไว้แบบ Bybit', 'เป้าหมาย: หาเงินเลี่ยงการคว่ำบาตร', 'เคสเดียวมากกว่ายอดที่เกาหลีเหนือขโมยทั้งปี 2568 กว่า 3 เท่า'] },
    { n: '05', name: 'เทียบกับเคสอื่น', sub: 'Bybit, DMM, WazirX, Bitget', beats: ['bybit', 'trend'],
      recap: ['Bybit: หลอกหน้าจอให้คนกดอนุมัติเอง 1 ตู้ ($1.5B)', 'Binance: ยึดระบบอนุมัติ เปิดได้ทุกตู้ ($6.36B)', 'แนวโน้ม: จากหลอก “คน” → หลอก “หน้าจอ” → ยึด “ระบบ”', 'ยิ่งเข้าใกล้ระบบอนุมัติ ความเสียหายต่อครั้งยิ่งใหญ่'] },
    { n: '06', name: 'ผลกระทบและบทเรียน', sub: 'ลูกค้า และสิ่งที่องค์กรควรทำ', beats: ['users', 'lesson'],
      recap: ['Binance รับผิดชอบเองด้วย SAFU + เงินบริษัท ชดเชยแล้ว ~95%', 'เปิดให้ถอนเงินตามปกติตั้งแต่ 1 พ.ย. 2569', 'บทเรียน: แยกระบบอนุมัติ · จำกัดเงินในตู้ออนไลน์ · เบรกอัตโนมัติ', 'เสริมด้วย allow-list, ป้องกันเครื่องทีมสิทธิ์สูง, อบรมเรื่องงานปลอม'] },
    { n: '07', name: 'สรุป', sub: 'ภาพรวม และสิ่งที่ยังไม่รู้', beats: ['recap', 'ask'] },
  ];

  /* explanation points per scene: [{ head, title, items: [[title, body]], note }] — each item is one click */
  const POINTS = {
    scale: [{ head: 'คำที่ควรรู้', title: 'Exchange คืออะไร', items: [['กระดานซื้อขายคริปโต', 'ลูกค้าฝากเหรียญไว้ แล้วซื้อขายหรือถอนออกเมื่อไรก็ได้ ทำหน้าที่คล้ายธนาคารรวมกับตลาดหุ้น Binance เป็นรายใหญ่ที่สุดในโลก']] }],
    drain: [{ head: 'คำที่ควรรู้', title: 'ตู้เงินของ exchange', compact: true, items: [
      ['บล็อกเชน', 'สมุดบัญชีสาธารณะที่บันทึกการโอนทุกครั้ง แก้ย้อนหลังไม่ได้ เหรียญแต่ละชนิดอยู่บนเครือข่ายของตัวเอง จึงต้องมีตู้แยกตามเครือข่าย'],
      ['Hot wallet · ตู้ออนไลน์', 'ต่อออนไลน์ตลอด ใช้จ่ายเงินให้ลูกค้าที่กดถอนได้ทันที สะดวกแต่เสี่ยงที่สุด เคสนี้ถูกดูดจากตู้กลุ่มนี้'],
      ['Cold wallet · ตู้ออฟไลน์', 'เก็บเงินก้อนใหญ่แยกจากอินเทอร์เน็ต ต้องผ่านการอนุมัติหลายชั้น ใช้เติมเงินเข้าตู้ออนไลน์เป็นรอบๆ'],
      ['ตู้ที่เสียมากที่สุด', 'Ethereum ~$3.79B · Bitcoin ~$1.47B · Tron ~$628M · XRP ~$296M ที่เหลือคือ Solana, Avalanche, Arbitrum, Optimism, Base, Polygon']] }],
    devops: [{ head: 'ทำไมเครื่อง DevOps สำคัญ', title: 'สิ่งที่มักอยู่ในเครื่องของทีมนี้', items: [
      ['รหัสและโทเคนเข้าคลาวด์', 'รวมถึง CI/CD pipeline ที่ใช้นำโค้ดขึ้นระบบจริง'],
      ['กุญแจ SSH และไฟล์ตั้งค่า Kubernetes', 'ใช้เข้าเซิร์ฟเวอร์และระบบที่รันโปรแกรมหลังบ้านโดยตรง'],
      ['Session ที่ล็อกอินค้างไว้', 'ใช้ต่อได้โดยไม่ต้องผ่าน MFA ซ้ำ ถ้าถูกขโมยไป แฮ็กเกอร์ก็เข้าระบบได้เหมือนเจ้าของเครื่อง']] }],
    howin: [{ head: 'ข้อมูลที่มี', title: 'สิ่งที่ยังไม่รู้', items: [
      ['โน้ตบุ๊กถูกเจาะด้วยวิธีใด', 'Binance ยังไม่เปิดเผย'],
      ['จุดเจาะอื่นอยู่ที่ไหน', 'Binance ระบุเพียงว่าพบจุดเจาะอื่นร่วมด้วย'],
      ['รายงานเทคนิคฉบับเต็ม', 'Binance แจ้งว่าจะเผยแพร่หลังสอบสวนเสร็จ']] }],
    playbook: [{ head: 'วิธีประจำของกลุ่มที่ถูกชี้ตัว', title: 'หลอกด้วย “งานปลอม” 4 ขั้น', items: [
      ['ทักมาเสนองาน', 'ปลอมเป็น HR หรือบริษัทคริปโตบน LinkedIn / Telegram เสนอเงินเดือนสูง'],
      ['ส่งแบบทดสอบ', 'ให้ดาวน์โหลดโค้ด แบบทดสอบ Python หรือโปรเจกต์ Docker ไปรันในเครื่อง'],
      ['มัลแวร์ทำงาน', 'ขโมยรหัส โทเคน และ session ที่ล็อกอินค้างไว้'],
      ['เข้าระบบบริษัท', 'ใช้สิทธิ์ของพนักงานคนนั้นเข้าไปต่อ ดูเหมือนการใช้งานปกติ']] },
    { head: 'เคสที่เคยเกิดจริง', title: 'วิธีนี้เคยได้ผลมาแล้ว', items: [
      ['DMM Bitcoin · 2567 · $308M', 'FBI ระบุว่าปลอมเป็น recruiter ส่งแบบทดสอบ Python ให้พนักงานของ Ginco ผู้ให้บริการระบบกระเป๋า แล้วใช้สิทธิ์นั้นแก้คำสั่งโอน'],
      ['Bybit · 2568 · $1.5B', 'Mac ของนักพัฒนา Safe{Wallet} ติดมัลแวร์จากโปรเจกต์ Docker ปลอม แฮ็กเกอร์จึงแก้โค้ดหน้าเว็บที่ผู้เซ็นของ Bybit ใช้']],
      note: 'ยังไม่ยืนยันว่าเคส Binance ใช้วิธีนี้' }],
    notone: [{ head: 'เส้นทางที่วิเคราะห์ได้ (TRM Labs)', title: 'จากโน้ตบุ๊ก ไปถึงเงิน', items: [
      ['โน้ตบุ๊ก DevOps', 'จุดเริ่มต้น เครื่องที่มีสิทธิ์เข้าระบบจริง'],
      ['Service container', 'โปรแกรมหลังบ้านที่รันบนเซิร์ฟเวอร์ เช่น ตัวรับคำสั่งถอนแล้วส่งต่อให้ระบบอนุมัติ ยึดได้ก็สั่งโอนได้เหมือนเป็นระบบจริง'],
      ['ระบบอนุมัติ → 10 ตู้', 'ปลายทางที่ถือกุญแจของทุกตู้ (ดูบทที่ 3)']],
      note: 'Binance ระบุว่ามีจุดเจาะอื่นร่วมด้วย ไม่ได้มาจากเครื่องเดียว' }],
    signer: [{ head: 'คำที่ควรรู้', title: 'ระบบอนุมัติการโอนทำงานอย่างไร', items: [
      ['Private key · กุญแจลับ', 'การโอนคริปโตต้องมีลายเซ็นดิจิทัลจากกุญแจของตู้ ใครถือกุญแจก็โอนเงินในตู้นั้นได้'],
      ['Signing service', 'ระบบที่ถือกุญแจและเซ็นให้อัตโนมัติ มักอยู่ในอุปกรณ์เข้ารหัส (HSM) หรือแบบแบ่งกุญแจ (MPC)'],
      ['ทำไมต้องอัตโนมัติ', 'คำสั่งถอนเข้ามาตลอดเวลา คนอนุมัติเองไม่ทัน ระบบจึงเซ็นทันทีเมื่อระบบหลังบ้านส่งใบสั่งโอนมา เหมือนเครื่องปั๊มตรายาง']] }],
    abuse: [{ head: 'จุดอ่อนที่เคสนี้ชี้ให้เห็น', title: 'ทำไมเสียทั้ง 10 ตู้', items: [
      ['ไม่ต้องขโมยกุญแจ', 'แค่ส่งคำสั่งจาก “ช่องที่ระบบเชื่อ” ระบบก็เซ็นให้'],
      ['ระบบเดียวคุมหลายตู้', 'ถูกยึดครั้งเดียว จึงเสียถึง 10 เครือข่าย'],
      ['โอนก้อนใหญ่ได้ในไม่กี่นาที', 'ไม่มีอะไรหยุดการไหลออกได้ทันในช่วงแรก']] }],
    eip: [{ head: 'คำที่ควรรู้', title: 'ทำไมต้องเซ็นล่วงหน้า 50 คิว', items: [
      ['Nonce · เลขคิว', 'ทุกบัญชีบน Ethereum มีเลขลำดับการโอน ขยับ +1 ทุกครั้งที่โอน ตู้ของ Binance จ่ายเงินตลอด เลขจึงวิ่งเร็วมาก'],
      ['EIP-7702', 'ฟีเจอร์ของ Ethereum ที่ให้บัญชีธรรมดามอบการควบคุมให้ smart contract ได้ ด้วยใบอนุญาตที่ผูกกับเลขคิวหนึ่ง'],
      ['เซ็นไว้ 50 ใบ ใช้ได้ใบเดียว', 'ครอบคลุมเลขคิว 18,914,775 – 18,914,824 ใบที่ตรงเลขทำให้ตู้ทำงานตาม contract ของแฮ็กเกอร์'],
      ['ก้อนแรก ≈$2.5B', '3 นาที 24 วินาทีหลังใบที่ตรงคิว · ETH 167,464 + โทเคน 63 ชนิด รวม USDT 1,615 ล้าน']] }],
    persist: [{ head: 'ทำไมดูดซ้ำได้', title: 'ดูดซ้ำ 6 รอบ (03:41–06:56 น.)', items: [
      ['Token approval ที่ค้างอยู่', 'สิทธิ์ให้อีกที่อยู่หนึ่ง “ดึง” โทเคนออกจากบัญชีได้ ยังไม่ถูกเพิกถอน จึงดึง USDC ออกได้อีก $823M'],
      ['Deposit sweeper', 'ระบบอัตโนมัติที่กวาดเงินฝากลูกค้าเข้าตู้ออนไลน์ยังทำงานต่อ จึงดันเงินเข้าตู้ที่ถูกยึดอีก ~$204M (USDT)']],
      note: 'เมื่อเกิดเหตุ ต้องหยุดทั้งระบบถอน และระบบที่ “เติมเงิน” เข้าตู้' }],
    freeze: [{ head: 'ทำไมล็อกได้แค่บางเหรียญ', title: 'Stablecoin ต่างจาก ETH/BTC', items: [
      ['Stablecoin (USDT, USDC)', 'ออกโดยบริษัท (Tether, Circle) ในสัญญามีฟังก์ชันขึ้นบัญชีดำ จึงล็อกที่อยู่ของแฮ็กเกอร์ได้ เช่น Circle ล็อก USDC กว่า $800M'],
      ['ETH, BTC', 'ไม่มีผู้ออก ไม่มีใครสั่งหยุดได้ ทำได้แค่ติดตามเส้นทาง และขอให้ exchange อื่นไม่รับเงิน'],
      ['ผลรวม', 'ล็อกทัน ~$2.7B (TRM) – ~$3B (Binance) · หลุดไปแล้ว ~$2.4B (ETH กว่า 420,000 + BTC 18,270)']] }],
    who: [{ head: 'ผู้ถูกชี้ตัว', title: 'TraderTraitor คือใคร', items: [
      ['หน่วยแฮ็กของรัฐบาลเกาหลีเหนือ', 'อยู่ใต้ร่มกลุ่ม Lazarus เน้นขโมยเงินจากบริษัทคริปโต'],
      ['ชื่ออื่นที่บริษัทความปลอดภัยใช้', 'Jade Sleet, UNC4899, Slow Pisces'],
      ['เคยถูกชี้ตัวมาก่อน', 'FBI ชี้ว่าเป็นกลุ่มเดียวกันในเคส Bybit (2568) และ DMM (2567)']] }],
    evidence: [{ head: 'หลักฐาน', title: 'ทำไมชี้ไปที่เกาหลีเหนือ', items: [
      ['เงินตั้งต้นจาก Tornado Cash', 'บริการผสมเงินคริปโตที่ทำให้ตามรอยยาก ใช้โอนก้อนเล็กเข้ามาก่อนลงมือ'],
      ['ซ้อมก่อนลงมือจริง', 'ทดสอบกับกระเป๋าของตัวเอง 3 ใบ ภายใน 36 ชั่วโมง'],
      ['เซ็นเตรียมไว้ แล้วยิงรวดเดียว', 'รูปแบบเดียวกับเคส Bybit']],
      note: 'TRM Labs ระบุว่ามั่นใจสูง · Chainalysis เห็นตรงกัน' }],
    why: [{ head: 'แรงจูงใจ', title: 'ขโมยไปทำไม', items: [
      ['$2.02B', 'เกาหลีเหนือขโมยคริปโตทั้งปี 2568 ราว 6 ใน 10 ของที่ถูกขโมยทั้งโลก (Chainalysis)'],
      ['~$6.75B', 'ยอดสะสมทุกปีจนถึงสิ้นปี 2568'],
      ['$6.36B', 'เคส Binance เคสเดียว มากกว่ายอดทั้งปี 2568 กว่า 3 เท่า'],
      ['หาเงินเลี่ยงการคว่ำบาตร', 'เป็นแหล่งเงินตราต่างประเทศสำคัญ ใช้หล่อเลี้ยงรัฐบาลและโครงการอาวุธ']] }],
    bybit: [{ head: 'เปรียบเทียบ', title: 'Bybit 2568 กับ Binance 2569', items: [
      ['Bybit · $1.5B · 1 ตู้', 'แก้โค้ดหน้าเว็บ Safe{Wallet} ผู้เซ็นเห็นธุรกรรมปกติ แต่จริงๆ อนุมัติธุรกรรมอันตราย'],
      ['Binance · $6.36B · 10 เชน', 'ไม่ต้องหลอกคนเซ็นแล้ว ยึดช่องทางส่งคำสั่งให้ระบบอนุมัติได้ทั้งระบบ'],
      ['Multisig ช่วยได้แค่ไหน', 'ต้องหลายคนเซ็นร่วมกันจึงโอนได้ ช่วยกันคนเดียวทุจริต แต่ไม่ช่วยถ้าทุกคนถูกหลอกด้วยหน้าจอเดียวกัน หรือถ้าระบบอนุมัติแทนคน']] }],
    trend: [{ head: 'เทียบ 5 เคส', title: 'จุดที่ถูกโจมตีขยับเข้าใกล้ระบบอนุมัติ', compact: true, items: [
      ['DMM Bitcoin · 2567 · $308M', 'หลอกพนักงานของผู้ให้บริการกระเป๋า แล้วแก้คำสั่งโอน'],
      ['WazirX · 2567 · $235M', 'ผู้เซ็น 4 ใน 6 คน เห็นหน้าจอไม่ตรงกับธุรกรรมจริง'],
      ['Bybit · 2568 · $1.5B', 'แก้โค้ดหน้าเว็บของ vendor ที่ผู้เซ็นใช้'],
      ['Bitget · 2569 · ~$388M', 'ปลอมคำสั่งจากระบบหลังบ้าน'],
      ['Binance · 2569 · $6.36B', 'ยึดระบบอนุมัติ เปิดได้ทุกตู้']] }],
    users: [{ head: 'ผลต่อลูกค้า', title: 'Binance รับผิดชอบเอง', items: [
      ['SAFU คืออะไร', 'Secure Asset Fund for Users กองทุนฉุกเฉินที่ Binance ตั้งไว้ตั้งแต่ปี 2561 ปัจจุบันถือ ~15,000 BTC (~$1.2B)'],
      ['ทำไมต้องใช้เงินบริษัทด้วย', 'SAFU อย่างเดียวครอบคลุมได้ราว 1 ใน 5 ของความเสียหาย Binance จึงจัดสรรไว้รวม $6.34B'],
      ['สิ่งที่ยังต้องติดตาม', 'รายงานเทคนิคฉบับเต็ม, Proof of Reserves ฉบับอัปเดต และการติดตามเงิน ~$2.4B ที่ยังหลุดอยู่']] }],
    lesson: [{ head: 'บทเรียนหลัก', title: 'ถ้าระบบอนุมัติถูกยึด ต้องไม่เสียทุกตู้', items: [
      ['แยกระบบอนุมัติของแต่ละตู้', 'ระบบหนึ่งถูกยึด เสียแค่ตู้เดียว ไม่ลามทั้งองค์กร (จำกัด blast radius)'],
      ['จำกัดเงินในตู้ออนไลน์ และวงเงินต่อนาที', 'เก็บไว้เท่าที่จำเป็น และตั้งเพดานการโอนต่อช่วงเวลา (velocity limit)'],
      ['เบรกอัตโนมัติ', 'ตรวจจับเงินไหลออกผิดปกติ แล้วหยุดทั้งระบบถอนและระบบเติมเงินทันที']] },
    { head: 'มาตรการที่เกี่ยวข้อง', title: 'สิ่งที่องค์กรทั่วไปนำไปใช้ได้', items: [
      ['ตรวจปลายทางกับ allow-list', 'ระบบอนุมัติตรวจเองว่าโอนไปที่ใด ไม่เชื่อผู้ส่งคำสั่งอย่างเดียว'],
      ['ป้องกันเครื่องทีมสิทธิ์สูง', 'เครื่อง DevOps/Admin ใช้งานเฉพาะ มี EDR และให้สิทธิ์แบบชั่วคราว (just-in-time)'],
      ['อบรมเรื่องงานปลอม', 'ห้ามรันโค้ดหรือแบบทดสอบจากคนนอกบนเครื่องงาน'],
      ['ทบทวน token approval', 'เพิกถอนสิทธิ์ที่ค้างอยู่เป็นประจำ']],
      note: 'ข้อเสนอแนะจากการวิเคราะห์เคสนี้ ไม่ใช่มาตรการที่ Binance ประกาศ' }],
  };
  const BEAT_NAMES = { hook: 'เปิดเรื่อง', scale: 'ขนาดความเสียหาย', drain: '10 ตู้ถูกเปิดพร้อมกัน', laptop: 'จุดเริ่มต้น', devops: 'DevOps คือใคร', howin: 'เจาะเครื่องได้อย่างไร', playbook: 'หลอกด้วยงานปลอม',
    notone: 'จุดเจาะอื่น', signer: 'ระบบอนุมัติการโอน', abuse: 'ใบสั่งโอนปลอม', eip: 'ตู้ ETH: 50 คิว', persist: 'ดูดซ้ำ 6 รอบ', freeze: 'ล็อกเงิน', who: 'ใครอยู่เบื้องหลัง', evidence: 'หลักฐาน', why: 'ขโมยไปทำไม',
    bybit: 'เทียบ Bybit', trend: 'แนวโน้ม 5 เคส', users: 'เงินลูกค้า', lesson: 'บทเรียน', recap: 'สรุปภาพรวม', ask: 'คำถามปิดท้าย', end: 'ที่มา' };
  const FINAL = { title: 'อะไรยืนยันแล้ว อะไรยังไม่รู้', cols: [
    [['ยืนยันโดย Binance', ['มูลค่าความเสียหาย ~$6.3B · ล็อกได้ ~$3B', 'รับผิดชอบเองด้วย SAFU + เงินบริษัท', 'พบจุดเจาะอื่นร่วมด้วย ไม่กล่าวโทษพนักงานคนใด', 'เปิดให้ถอนเงิน 1 พ.ย. 2569']], ['ยืนยันโดย FBI', ['ผู้อยู่เบื้องหลังคือ TraderTraitor (เกาหลีเหนือ)']]],
    [['จากการวิเคราะห์ธุรกรรม', ['$6.36B จาก 10 เชน (TRM Labs)', 'โน้ตบุ๊ก DevOps → service container → ระบบอนุมัติ', 'EIP-7702 50 คิว ก้อนแรก ~$2.5B (TRM, Blockaid)', 'ดูดซ้ำ 6 รอบ · ล็อก ~$2.7B · หลุด ~$2.4B']], ['ยังไม่เปิดเผย', ['โน้ตบุ๊กถูกเจาะด้วยวิธีใด · จุดเจาะอื่นอยู่ที่ไหน · รายงานเทคนิคฉบับเต็ม'], true]]] };

  const { K: FK_, G, GL, R, M, SL, svg, T, Bx, box, Ar, P, dot, Ci, key, doc, laptop, server, person, coin, bug, check, cross, flow, bars, dl } = window.FIG;
  const K = FK_;
  const F = {};
  F['scale:0:0'] = svg(person(30, 34) + T(30, 80, 'ลูกค้า', { d: 0.3, size: 11 }) + Ar(48, 44, 128, 44, { d: 0.3 }) + Ar(128, 56, 48, 56, { d: 0.5 }) + T(88, 38, 'ฝาก', { d: 0.5, size: 10, c: M }) + T(88, 70, 'ถอน', { d: 0.7, size: 10, c: M }) +
    box(132, 26, 110, 48, 'Exchange', { d: 0.6, w: 500 }) + ['BTC', 'ETH', 'TRX'].map((l, i) => box(300, 8 + i * 30, 90, 24, 'ตู้ ' + l, { d: 1.0 + i * 0.15, c: G, tc: K, size: 11 }) + Ar(244, 50, 297, 20 + i * 30, { d: 0.9 + i * 0.15 })).join(''));
  F['drain:0:0'] = svg([0, 1, 2, 3].map((i) => box(8 + i * 98, 22, 80, 46, 'บล็อก ' + (i + 1) + '\nโอน A → B', { d: i * 0.35, size: 11 }) + (i ? P('M' + (8 + i * 98 - 18) + ',45 h18', { c: G, d: i * 0.35 - 0.1, sw: 2.2 }) : '')).join('') + T(200, 92, 'ต่อกันเป็นสาย · แก้ย้อนหลังไม่ได้', { d: 1.5, size: 11, c: M }));
  F['drain:0:1'] = svg(box(130, 30, 140, 44, 'Hot wallet\nต่อออนไลน์ตลอด', { d: 0, c: G }) + [10, 18, 26].map((r, i) => P('M' + (200 - r) + ',' + (24 - r * 0.2) + ' Q200,' + (12 - r * 0.9) + ' ' + (200 + r) + ',' + (24 - r * 0.2), { c: G, d: 0.4 + i * 0.15 })).join('') +
    person(40, 40) + Ar(56, 52, 126, 52, { d: 0.8 }) + T(90, 46, 'กดถอน', { d: 0.8, size: 10, c: M }) + Ar(272, 52, 350, 52, { d: 1.1 }) + T(372, 56, 'จ่ายทันที', { d: 1.2, size: 11, c: G }));
  F['drain:0:2'] = svg(box(10, 28, 130, 46, 'Cold wallet\nออฟไลน์ · อนุมัติหลายชั้น', { d: 0, c: SL, tc: SL, size: 11 }) + Ar(144, 51, 252, 51, { d: 0.5 }) + T(198, 44, 'เติมเงินเป็นรอบ', { d: 0.6, size: 10.5, c: M }) +
    box(256, 28, 134, 46, 'Hot wallet\nออนไลน์ · จ่ายทันที', { d: 0.8, c: G, size: 11 }) + T(75, 92, 'เงินก้อนใหญ่', { d: 0.4, size: 10.5, c: M }) + T(323, 92, 'เงินหมุนเวียนรายวัน', { d: 1.0, size: 10.5, c: M }));
  F['drain:0:3'] = bars([['Ethereum', 3790, G, '$3.79B'], ['Bitcoin', 1470, G, '$1.47B'], ['Tron', 628, G, '$628M'], ['XRP', 296, G, '$296M'], ['อีก 6 เชน', 173, M, '~$173M']], 3790, { lw: 90 });
  F['devops:0:0'] = flow(['โน้ตบุ๊ก DevOps', 'Cloud console', 'CI/CD pipeline', 'ระบบจริง'], { red: [] });
  F['devops:0:1'] = svg(key(40, 50, G, 0) + T(52, 80, 'SSH key', { d: 0.3, size: 11 }) + Ar(80, 50, 150, 50, { d: 0.5 }) + server(158, 34, K, 0.7) + T(175, 84, 'เซิร์ฟเวอร์', { d: 0.9, size: 11 }) +
    doc(250, 30, K, 0.9) + T(263, 80, 'kubeconfig', { d: 1.1, size: 10.5 }) + Ar(282, 47, 320, 47, { d: 1.2 }) + [0, 1, 2].map((i) => Ci(340 + (i % 2) * 22, 34 + i * 13, 8, { c: G, d: 1.3 + i * 0.1 })).join('') + T(352, 92, 'คลัสเตอร์', { d: 1.5, size: 11 }));
  F['devops:0:2'] = svg(Bx(10, 22, 120, 56, { d: 0 }) + P('M10,34 h120', { d: 0.2 }) + T(70, 58, 'ล็อกอินอยู่ ✓', { d: 0.4, size: 12, c: G }) + T(70, 92, 'เครื่องพนักงาน', { d: 0.4, size: 10.5, c: M }) +
    bug(170, 50, 0.7) + Ar(134, 50, 160, 50, { d: 0.8, c: R }) + Ar(180, 50, 266, 50, { d: 1.0, c: R }) + T(220, 40, 'ขโมย session', { d: 1.0, size: 10.5, c: R }) +
    Bx(270, 22, 120, 56, { d: 1.2, c: R }) + P('M270,34 h120', { d: 1.3, c: R }) + T(330, 58, 'ล็อกอินได้เลย', { d: 1.5, size: 12, c: R }) + T(330, 92, 'ไม่ต้องผ่าน MFA', { d: 1.5, size: 10.5, c: R }));
  F['howin:0:2'] = svg(doc(170, 18, K, 0) + T(183, 46, '?', { d: 0.5, size: 18, c: G, w: 500 }) + T(200, 82, 'รายงานเทคนิคฉบับเต็ม: รอ Binance เผยแพร่', { d: 0.6, size: 11, c: M }));
  F['playbook:0:0'] = svg(person(36, 34, R) + T(36, 82, 'HR ปลอม', { d: 0.3, size: 11, c: R }) + P('M70,20 h240 a8,8 0 0 1 8,8 v34 a8,8 0 0 1 -8,8 h-226 l-14,12 v-12 a8,8 0 0 1 0,0 v-42 a8,8 0 0 1 0,0 z', { d: 0.3 }) +
    T(190, 40, 'สนใจร่วมงานไหมครับ? เงินเดือนสูง', { d: 0.8, size: 12 }) + T(190, 58, 'ส่งแบบทดสอบให้ลองทำก่อนนะ', { d: 1.1, size: 11, c: M }));
  F['playbook:0:1'] = svg(doc(60, 22, R, 0) + T(73, 76, 'test.zip', { d: 0.3, size: 11, c: R }) + Ar(96, 40, 236, 40, { d: 0.5, c: R }) + T(166, 32, 'ดาวน์โหลด แล้วรัน', { d: 0.6, size: 10.5, c: M }) + laptop(250, 26, K, 0.8) + T(270, 80, 'เครื่องงาน', { d: 1.0, size: 11 }));
  F['playbook:0:2'] = svg(laptop(40, 34, R, 0) + bug(60, 47, 0.3) + ['รหัสผ่าน', 'โทเคน', 'session'].map((l, i) => Ar(96, 46, 236, 18 + i * 28, { d: 0.6 + i * 0.2, c: R }) + key(256, 18 + i * 28, R, 0.7 + i * 0.2) + T(320, 22 + i * 28, l, { d: 0.9 + i * 0.2, size: 11, c: R, a: 'start' })).join(''));
  F['playbook:0:3'] = svg(person(40, 34, R) + T(40, 82, 'แฮ็กเกอร์', { d: 0.3, size: 11, c: R }) + Ar(64, 48, 250, 48, { d: 0.5, c: R }) + T(156, 40, 'ใช้สิทธิ์ของพนักงาน', { d: 0.7, size: 10.5, c: M }) + server(262, 30, K, 0.8) + T(279, 82, 'ระบบบริษัท', { d: 1.0, size: 11 }) + T(350, 52, 'ดูปกติ', { d: 1.2, size: 11, c: G }));
  F['playbook:1:0'] = flow(['Recruiter ปลอม', 'พนักงาน Ginco', 'แก้คำสั่งโอน'], { red: [0, 2] });
  F['playbook:1:1'] = flow(['Mac นักพัฒนา\nSafe{Wallet}', 'แก้โค้ดหน้าเว็บ', 'ผู้เซ็นของ Bybit'], { red: [1] });
  F['signer:0:0'] = svg(key(40, 50, G, 0) + T(52, 80, 'private key', { d: 0.3, size: 11 }) + Ar(80, 50, 150, 50, { d: 0.4 }) + doc(160, 30, K, 0.5) + P('M164,58 q5,-8 10,0 t10,0', { c: G, d: 1.0, sw: 1.6 }) + T(173, 82, 'ลายเซ็น', { d: 1.0, size: 11 }) + Ar(200, 50, 280, 50, { d: 1.1 }) + T(330, 54, 'โอนได้ ✓', { d: 1.3, size: 13, c: G, w: 500 }));
  F['signer:0:1'] = svg(Bx(110, 14, 180, 72, { d: 0, c: G }) + T(200, 32, 'Signing service', { d: 0.3, size: 12, w: 500 }) + key(170, 56, G, 0.5) + T(232, 60, 'HSM / MPC', { d: 0.7, size: 11, c: M }) +
    Ar(20, 50, 106, 50, { d: 0.6 }) + T(58, 42, 'ใบสั่งโอน', { d: 0.6, size: 10.5, c: M }) + Ar(294, 50, 382, 50, { d: 0.9 }) + T(340, 42, 'เซ็นแล้ว', { d: 1.0, size: 10.5, c: G }));
  F['abuse:0:2'] = svg(T(10, 22, '0:00', { a: 'start', size: 11, c: M }) + T(390, 22, '3:24', { a: 'end', size: 11, c: M, w: 500 }) + '<rect x="10" y="34" width="380" height="10" fill="#e4e0d8"/><rect x="10" y="34" height="10" width="0" fill="' + R + '"><animate attributeName="width" from="0" to="380" dur="2.2s" begin="0.2s" fill="freeze"/></rect>' +
    T(200, 72, 'ก้อนแรก ≈ $2.5B ออกไปก่อนมีใครหยุดได้', { d: 1.6, size: 12.5, c: R, w: 500 }));
  F['eip:0:0'] = svg([0, 1, 2, 3, 4, 5].map((i) => box(12 + i * 64, 26, 56, 32, '' + (775 + i), { d: i * 0.08, size: 12 })).join('') + '<rect x="12" y="26" width="56" height="32" rx="5" fill="none" stroke="' + G + '" stroke-width="2.4"><animate attributeName="x" values="12;76;140;204;268;332" dur="3s" begin="0.6s" repeatCount="indefinite" calcMode="discrete"/></rect>' +
    T(200, 84, 'เลขคิว 18,914,7xx ขยับ +1 ทุกครั้งที่ตู้โอนเงิน', { d: 0.6, size: 11, c: M }));
  F['eip:0:1'] = flow(['บัญชีตู้ ETH', 'ใบอนุญาต\n(เซ็นแล้ว)', 'contract\nของแฮ็กเกอร์'], { red: [2], extra: T(200, 94, 'บัญชีทำงานตาม contract ที่ใบอนุญาตชี้ไป', { d: 1.3, size: 10.5, c: M }) });
  F['eip:0:2'] = svg(Array.from({ length: 50 }, (_, k) => { const x = 8 + (k % 25) * 15.4, y = 18 + Math.floor(k / 25) * 26, hit = k === 23; return '<rect class="f" ' + dl(0.02 * k) + ' x="' + x + '" y="' + y + '" width="12" height="20" rx="2" fill="' + (hit ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.7)') + '" stroke="#b9b3a8">' + (hit ? '<animate attributeName="fill" to="' + GL + '" begin="2.0s" dur="0.3s" fill="freeze"/>' : '<animate attributeName="opacity" to="0.35" begin="2.2s" dur="0.4s" fill="freeze"/>') + '</rect>'; }).join('') +
    '<rect x="8" y="14" width="2" height="54" fill="' + G + '"><animate attributeName="x" from="8" to="392" dur="1.8s" begin="0.4s" fill="freeze"/></rect>' + T(200, 90, '50 ใบ · ใช้ได้จริงใบเดียว (ใบที่ตรงเลขคิว)', { d: 2.1, size: 11.5, c: G, w: 500 }));
  F['persist:0:0'] = svg(coin(36, 46, 'USDC', '#2f6bbf', 0) + Ar(52, 46, 120, 46, { d: 0.3 }) + doc(128, 26, K, 0.4) + T(141, 76, 'approve', { d: 0.6, size: 10.5 }) + T(141, 90, '(ยังค้างอยู่)', { d: 0.7, size: 10, c: R }) +
    Ar(160, 46, 300, 46, { d: 0.9, c: R }) + T(230, 38, 'ดึงออกได้อีก', { d: 1.0, size: 10.5, c: R }) + person(330, 32, R) + T(356, 86, '$823M', { d: 1.3, size: 13, c: R, w: 500 }));
  F['freeze:0:0'] = svg(coin(60, 44, 'USDT', '#26a17b', 0) + coin(96, 44, 'USDC', '#2f6bbf', 0.15) + Ar(116, 44, 196, 44, { d: 0.4 }) + T(156, 36, 'ผู้ออกเหรียญ', { d: 0.5, size: 10.5, c: M }) +
    box(200, 24, 120, 40, 'บัญชีดำ\nที่อยู่แฮ็กเกอร์', { d: 0.7, c: SL, tc: SL, size: 11 }) + P('M342,34 h18 v20 h-18 z M346,34 v-6 a5,5 0 0 1 10,0 v6', { c: SL, d: 1.1, sw: 1.6 }) + T(200, 90, 'สั่งล็อกได้ เช่น Circle ล็อก USDC กว่า $800M', { d: 1.2, size: 11, c: M }));
  F['freeze:0:2'] = bars([['ล็อกทัน', 2.85, SL, '~$2.7–3B'], ['หลุดไปแล้ว', 2.4, R, '~$2.4B'], ['รวมที่ถูกโอนออก', 6.36, K, '$6.36B']], 6.36, { lw: 110 });
  F['who:0:1'] = svg([['TraderTraitor', 'FBI'], ['Jade Sleet', 'Microsoft'], ['UNC4899', 'Mandiant'], ['Slow Pisces', 'Palo Alto Networks']].map(([n, v], i) => box(6 + i * 98, 24, 90, 44, n + '\n' + v, { d: i * 0.25, c: i ? K : R, tc: i ? K : R, size: 11 })).join('') + T(200, 90, 'กลุ่มเดียวกัน คนละชื่อตามบริษัทที่ตั้ง', { d: 1.2, size: 11, c: M }));
  F['who:0:2'] = svg(P('M30,46 H370', { c: M, d: 0 }) + [['DMM', '2567', 60], ['Bybit', '2568', 200], ['Binance', '2569', 340]].map(([n, y, x], i) => Ci(x, 46, 6, { c: i === 2 ? R : G, d: 0.4 + i * 0.35, fill: i === 2 ? R : '#fff' }) + T(x, 30, n, { d: 0.5 + i * 0.35, size: 12, w: 500, c: i === 2 ? R : K }) + T(x, 70, y, { d: 0.5 + i * 0.35, size: 11, c: M })).join(''));
  F['evidence:0:0'] = svg([0, 1, 2].map((i) => coin(30, 22 + i * 26, '', G, i * 0.1)).join('') + [0, 1, 2].map((i) => Ar(44, 22 + i * 26, 160, 48, { d: 0.3 + i * 0.1 })).join('') + Ci(200, 48, 34, { d: 0.5 }) +
    '<g class="f" style="animation-delay:.8s"><path d="M200,24 a24,24 0 0 1 0,48 a16,16 0 0 1 0,-32 a8,8 0 0 1 0,16" fill="none" stroke="' + G + '" stroke-width="1.6"><animateTransform attributeName="transform" type="rotate" from="0 200 48" to="360 200 48" dur="3s" repeatCount="indefinite"/></path></g>' + T(200, 96, 'Tornado Cash', { d: 0.8, size: 11, w: 500 }) +
    [0, 1, 2, 3].map((i) => Ar(238, 48, 330, 14 + i * 22, { d: 1.1 + i * 0.1 }) + coin(346, 14 + i * 22, '', M, 1.2 + i * 0.1)).join(''));
  F['evidence:0:1'] = svg([0, 1, 2].map((i) => box(10, 6 + i * 30, 70, 24, 'กระเป๋า ' + (i + 1), { d: i * 0.2, size: 11 }) + Ar(84, 18 + i * 30, 150, 48, { d: 0.4 + i * 0.15, c: M })).join('') + Ci(180, 48, 22, { d: 0.6 }) + T(180, 52, '36 ชม.', { d: 0.8, size: 11, w: 500 }) +
    Ar(206, 48, 300, 48, { d: 1.0, sw: 2.2 }) + T(344, 52, 'ลงมือจริง', { d: 1.2, size: 13, c: R, w: 500 }) + T(250, 40, 'ซ้อมก่อน', { d: 1.1, size: 10.5, c: M }));
  F['evidence:0:2'] = svg([0, 1, 2, 3].map((i) => doc(30 + i * 6, 22 - i * 3, K, i * 0.12, 1)).join('') + T(60, 86, 'เซ็นเตรียมไว้', { d: 0.6, size: 11 }) + [0, 1, 2, 3, 4].map((i) => Ar(90, 42, 330, 10 + i * 20, { d: 0.9 + i * 0.06, c: R })).join('') + T(360, 54, 'ยิงรวดเดียว', { d: 1.3, size: 12, c: R, w: 500 }));
  const whyRows = [['2568 ทั้งปี', 2.02, G, '$2.02B'], ['สะสมถึงสิ้น 2568', 6.75, G, '~$6.75B'], ['Binance เคสเดียว', 6.36, R, '$6.36B']];
  F['why:0:0'] = bars(whyRows, 6.75, { lw: 120, hl: 0 }); F['why:0:1'] = bars(whyRows, 6.75, { lw: 120, hl: 1 }); F['why:0:2'] = bars(whyRows, 6.75, { lw: 120, hl: 2 });
  F['bybit:0:2'] = svg([0, 1, 2, 3, 4, 5].map((i) => key(26 + i * 46, 30, i < 4 ? G : M, i * 0.12) + (i < 4 ? check(38 + i * 46, 56, G, 0.8 + i * 0.1) : '')).join('') + T(150, 86, 'ต้องเซ็นร่วม 4 ใน 6', { d: 1.0, size: 11.5 }) +
    box(300, 18, 90, 50, 'หน้าจอเดียวกัน\nหลอกได้ทุกคน', { d: 1.3, c: R, tc: R, size: 10.5 }));
  F['users:0:0'] = svg(Bx(140, 14, 120, 70, { d: 0, c: G }) + T(200, 34, 'SAFU', { d: 0.3, size: 14, w: 500, c: G }) + [0, 1, 2, 3].map((i) => '<ellipse class="f" ' + dl(0.5 + i * 0.12) + ' cx="200" cy="' + (72 - i * 7) + '" rx="22" ry="5" fill="#fff" stroke="' + G + '"/>').join('') +
    T(320, 46, '~15,000 BTC', { d: 0.9, size: 12, w: 500, a: 'start' }) + T(320, 64, '≈ $1.2B', { d: 1.0, size: 11, c: M, a: 'start' }) + T(70, 52, 'ตั้งปี 2561', { d: 0.6, size: 11, c: M }));
  F['users:0:1'] = svg(T(10, 22, 'เงินที่จัดสรรชดเชย $6.34B', { a: 'start', size: 11.5, w: 500 }) + '<rect x="10" y="32" width="380" height="16" fill="#e4e0d8"/>' +
    '<rect x="10" y="32" height="16" width="0" fill="' + G + '"><animate attributeName="width" from="0" to="72" dur="0.7s" begin="0.3s" fill="freeze"/></rect><rect x="82" y="32" height="16" width="0" fill="' + K + '"><animate attributeName="width" from="0" to="308" dur="0.9s" begin="1.0s" fill="freeze"/></rect>' +
    T(46, 68, 'SAFU ~1/5', { d: 0.8, size: 11, c: G, w: 500 }) + T(236, 68, 'เงินบริษัท', { d: 1.7, size: 11, w: 500 }));
  F['users:0:2'] = svg(['รายงานเทคนิคฉบับเต็ม', 'Proof of Reserves ฉบับอัปเดต', 'ติดตามเงิน ~$2.4B ที่หลุดอยู่'].map((l, i) => Bx(20, 8 + i * 30, 16, 16, { d: i * 0.25, rx: 3 }) + T(46, 21 + i * 30, l, { d: 0.2 + i * 0.25, a: 'start', size: 12 })).join(''));
  F['lesson:1:0'] = svg(doc(20, 30, K, 0) + T(33, 80, 'ใบสั่งโอน', { d: 0.3, size: 11 }) + Ar(50, 47, 140, 47, { d: 0.4 }) + box(144, 20, 110, 56, 'allow-list\nปลายทางที่อนุญาต', { d: 0.6, c: G, size: 11 }) +
    Ar(258, 36, 320, 26, { d: 1.0 }) + check(340, 26, G, 1.2) + T(370, 30, 'ผ่าน', { d: 1.3, size: 11, c: G }) + Ar(258, 60, 320, 70, { d: 1.1, c: R }) + cross(340, 70, 1.3) + T(372, 74, 'หยุด', { d: 1.4, size: 11, c: R }));
  F['lesson:1:1'] = svg(laptop(60, 34, K, 0) + P('M200,18 l34,10 v22 q0,22 -34,34 q-34,-12 -34,-34 v-22 z', { c: G, d: 0.4, sw: 1.6 }) + check(200, 50, G, 1.0) + T(300, 40, 'EDR', { d: 1.0, size: 12, w: 500, a: 'start' }) + T(300, 60, 'สิทธิ์ชั่วคราว (JIT)', { d: 1.2, size: 11, c: M, a: 'start' }));
  F['lesson:1:2'] = svg(doc(150, 22, K, 0) + T(163, 76, 'test.zip', { d: 0.3, size: 11 }) + Ci(163, 39, 28, { c: R, d: 0.6, sw: 2 }) + P('M143,59 L183,19', { c: R, d: 0.9, sw: 2 }) + T(290, 44, 'ห้ามรันโค้ดจากคนนอก', { d: 1.0, size: 12, c: R, w: 500, a: 'start' }));
  F['lesson:1:3'] = svg(doc(120, 22, K, 0) + T(133, 76, 'approve', { d: 0.3, size: 11 }) + P('M110,40 h46', { c: R, d: 0.8, sw: 2 }) + key(220, 40, M, 0.5) + cross(232, 40, 1.0) + T(310, 44, 'เพิกถอนเป็นประจำ', { d: 1.1, size: 12, w: 500, a: 'start' }));

  const FXM = {
    'drain:0:1': 'hot', 'drain:0:2': 'cold', 'drain:0:3': 'top4', 'howin:0:0': 'laptop', 'howin:0:1': 'other',
    'notone:0:0': 'path1', 'notone:0:1': 'path2', 'notone:0:2': 'path3', 'signer:0:1': 'core', 'signer:0:2': 'slips',
    'abuse:0:0': 'fake', 'abuse:0:1': 'beams', 'eip:0:3': 'ethflow', 'persist:0:1': 'drops', 'freeze:0:0': 'ice', 'freeze:0:1': 'loose',
    'who:0:0': 'nk', 'why:0:3': 'money', 'bybit:0:0': 'cmpL', 'bybit:0:1': 'cmpR', 'trend:0:0': 'step0', 'trend:0:1': 'step1', 'trend:0:2': 'step2', 'trend:0:3': 'step3', 'trend:0:4': 'step4',
    'lesson:0:0': 'minis', 'lesson:0:1': 'limit', 'lesson:0:2': 'gate',
  };
  window.DECK = { kicker: 'BINANCE HACK · 30 ต.ค. 2569', chapters: CHAPTERS, points: POINTS, beatNames: BEAT_NAMES, final: FINAL, figs: F, fx: FXM };
})();
