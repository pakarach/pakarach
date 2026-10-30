/* CK kit v2 — bright vinyl-toy chibi diorama for the family-health channel (family-health-info-3d-video).
   v2 (Oct 2026): 2D-drawn anime face decal on the head (big glossy eyes, blush, expressive mouth), sculpted hair locks + shine,
   saturated candy palette, blob shadows, wallpaper room with props. Same call API as v1 (CK.family / CK.neighbor / CK.chibi / CK.room / CK.lights). */
(function () {
  const CK = (window.CK = {}), PI = Math.PI, TAU = PI * 2;
  CK.pal = { cream: '#fff4e6', pink: '#ffb3c6', mint: '#9fe3cf', sky: '#9fd3ff', butter: '#ffe08a', lav: '#c9b6ff', peach: '#ffc09f', skin: ['#ffd6bd', '#f5c09a', '#d99a6c'], dark: '#3a2f3f' };
  CK.mat = (T, c, x) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.5, metalness: 0 }, x || {}));
  const M0 = (T, c, x) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.42, metalness: 0 }, x || {}));
  /* lights: hemi + warm key + cool fill + pink/gold rims. Order matters to videos: first DirectionalLight is the key. */
  CK.lights = (T, scene, warm) => {
    scene.add(new T.HemisphereLight(0xfff8f0, 0xffc8da, warm ? 0.44 : 0.48));
    const key = new T.DirectionalLight(0xfff0dc, 0.68); key.position.set(4, 8, 7); scene.add(key);
    const fill = new T.DirectionalLight(0xd2e6ff, 0.22); fill.position.set(-7, 3, 5); scene.add(fill);
    const rim = new T.DirectionalLight(0xffc0e0, 0.6); rim.position.set(-3, 6, -9); scene.add(rim);
    const r2 = new T.DirectionalLight(0xfff0c0, 0.35); r2.position.set(5, 4, -8); scene.add(r2);
    return key;
  };

  /* ---------- face decal (drawn on a 512px canvas, mapped onto the front of the head) ---------- */
  const LW = 760, CX = 380, EY = 262, EX = 148, MY = 350, PW = 1.7, TH0 = 1.0, THL = 1.3;
  function drawFace(ctx, o, ex, blink) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 512, 512); ctx.setTransform(512 / LW, 0, 0, 1, 0, 0);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const es = o.eyeScale || 1, ink = '#3a2224', sp = o.eyeSpread || 1, hot = ex === 'angry';
    for (const s of [-1, 1]) {
      const bx = CX + s * 228, by = 322, g = ctx.createRadialGradient(bx, by, 4, bx, by, 74), c = hot ? '255,70,90' : '255,100,145';
      g.addColorStop(0, 'rgba(' + c + ',' + (hot ? 0.75 : 0.6) + ')'); g.addColorStop(1, 'rgba(' + c + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(bx, by, 78, 48, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 5;
      for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(bx + k * 18 - 5, by + 9); ctx.lineTo(bx + k * 18 + 5, by - 9); ctx.stroke(); }
    }
    const closed = blink || ex === 'giggle' || ex === 'sleepy';
    for (const s of [-1, 1]) {
      const x = CX + s * EX * sp, y = EY, rx = 50 * es * (o.round ? 1.08 : 1), ry = 62 * es;
      if (closed) {
        ctx.strokeStyle = ink; ctx.lineWidth = 12; ctx.beginPath();
        if (ex === 'giggle') ctx.arc(x, y + 26, 40 * es, PI * 1.2, PI * 1.8); else ctx.arc(x, y - 16, 40 * es, PI * 0.22, PI * 0.78);
        ctx.stroke(); continue;
      }
      ctx.fillStyle = '#2a1617'; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.fill();
      const ig = ctx.createLinearGradient(0, y - ry, 0, y + ry); ig.addColorStop(0, '#2a1617'); ig.addColorStop(0.5, o.iris2 || '#6e3d27'); ig.addColorStop(1, o.iris || '#e09a5f');
      ctx.fillStyle = ig; ctx.beginPath(); ctx.ellipse(x, y + 7 * es, rx * 0.82, ry * 0.82, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(28,12,12,0.9)'; ctx.beginPath(); ctx.ellipse(x, y + 4 * es, rx * 0.4, ry * 0.44, 0, 0, TAU); ctx.fill();
      const big = ex === 'cry' || ex === 'worried' ? 1.15 : 1;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(x - 15 * es, y - 24 * es, 19 * es * big, 22 * es * big, -0.3, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 18 * es, y + 25 * es, 8.5 * es * big, 0, TAU); ctx.fill();
      ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(x + 22 * es, y - 8 * es, 5 * es, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
      if (ex === 'sick' || ex === 'angry') {
        ctx.fillStyle = o.skin; ctx.beginPath(); ctx.moveTo(x - rx - 6, y - ry - 8); ctx.lineTo(x + rx + 6, y - ry - 8);
        const dy = ex === 'angry' ? (s < 0 ? [-0.35, 0.1] : [0.1, -0.35]) : [-0.25, -0.25];
        ctx.lineTo(x + rx + 6, y + ry * dy[1]); ctx.lineTo(x - rx - 6, y + ry * dy[0]); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = ink; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x - rx, y + ry * dy[0]); ctx.lineTo(x + rx, y + ry * dy[1]); ctx.stroke();
      }
      if (ex === 'cry') {
        ctx.fillStyle = 'rgba(140,210,255,0.92)'; ctx.beginPath(); ctx.ellipse(x, y + ry * 0.74, rx * 0.95, ry * 0.3, 0, 0, TAU); ctx.fill();
        const tg = ctx.createLinearGradient(0, y + ry * 0.8, 0, y + ry * 0.8 + 150); tg.addColorStop(0, 'rgba(140,210,255,0.95)'); tg.addColorStop(1, 'rgba(140,210,255,0)');
        ctx.fillStyle = tg; ctx.beginPath(); ctx.ellipse(x + s * 20, y + ry * 0.8 + 70, 15, 80, 0, 0, TAU); ctx.fill();
      }
      if (o.lashes) {
        ctx.strokeStyle = ink; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(x, y, rx + 3, ry + 3, 0, PI * 1.1, PI * 1.9); ctx.stroke();
        const ox = x + s * rx * 0.92, oy = y - ry * 0.5; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + s * 20, oy - 14); ctx.moveTo(ox - s * 8, oy - 16); ctx.lineTo(ox + s * 8, oy - 33); ctx.stroke();
      }
    }
    ctx.strokeStyle = o.brow || '#5a3a2a'; ctx.lineWidth = hot ? 15 : 10;
    for (const s of [-1, 1]) {
      const x = CX + s * EX * sp, by = EY - 108; let yi = by, yo = by;
      if (ex === 'worried' || ex === 'cry' || ex === 'sick') { yi = by - 16; yo = by + 4; } else if (hot) { yi = by + 22; yo = by - 16; }
      ctx.beginPath(); ctx.moveTo(x - s * 34, yi); ctx.quadraticCurveTo(x, Math.min(yi, yo) - (ex === 'happy' || ex === 'giggle' ? 12 : 4), x + s * 34, yo); ctx.stroke();
    }
    if (o.paci) return;
    ctx.strokeStyle = '#6e2a30'; ctx.fillStyle = '#8c2f3e'; ctx.lineWidth = 8;
    if (ex === 'happy') { ctx.beginPath(); ctx.arc(CX - 15, MY - 6, 15, PI * 0.1, PI * 0.9); ctx.stroke(); ctx.beginPath(); ctx.arc(CX + 15, MY - 6, 15, PI * 0.1, PI * 0.9); ctx.stroke(); }
    else if (ex === 'giggle') { ctx.save(); ctx.beginPath(); ctx.moveTo(CX - 36, MY - 12); ctx.quadraticCurveTo(CX, MY - 4, CX + 36, MY - 12); ctx.quadraticCurveTo(CX + 30, MY + 34, CX, MY + 36); ctx.quadraticCurveTo(CX - 30, MY + 34, CX - 36, MY - 12); ctx.closePath(); ctx.fill(); ctx.clip(); ctx.fillStyle = '#ff8a9e'; ctx.beginPath(); ctx.ellipse(CX, MY + 34, 24, 16, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    else if (ex === 'worried' || ex === 'sick') { ctx.beginPath(); ctx.moveTo(CX - 24, MY + 6); ctx.quadraticCurveTo(CX - 12, MY - 6, CX, MY + 4); ctx.quadraticCurveTo(CX + 12, MY + 12, CX + 24, MY + 2); ctx.stroke(); }
    else if (ex === 'cry') { ctx.beginPath(); ctx.moveTo(CX - 30, MY + 22); ctx.quadraticCurveTo(CX, MY - 18, CX + 30, MY + 22); ctx.quadraticCurveTo(CX, MY + 10, CX - 30, MY + 22); ctx.fill(); }
    else if (hot) { ctx.beginPath(); ctx.moveTo(CX - 30, MY + 14); ctx.lineTo(CX - 15, MY + 2); ctx.lineTo(CX, MY + 12); ctx.lineTo(CX + 15, MY + 2); ctx.lineTo(CX + 30, MY + 14); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(CX, MY + 4, 9, 0, TAU); ctx.fill(); }
  }
  const surf = (T, th, dphi, r) => { const ph = PI / 2 + dphi; return new T.Vector3(-Math.cos(ph) * Math.sin(th), Math.cos(th), Math.sin(ph) * Math.sin(th)).multiplyScalar(r); };
  CK.surf = surf;
  let blobTex = null, lockGeo = null;
  const blob = (T) => { if (!blobTex) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(120,50,90,0.55)'); g.addColorStop(1, 'rgba(120,50,90,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); blobTex = new T.CanvasTexture(c); } return blobTex; };
  const lockG = (T) => { if (lockGeo) return lockGeo; const pts = []; for (let i = 0; i <= 18; i++) { const y = -1 + 2 * i / 18, r = Math.sqrt(Math.max(0, 1 - y * y)) * Math.pow((y + 1) / 2, 0.55) * 0.62; pts.push(new T.Vector2(Math.max(r, 0.0001), y)); } lockGeo = new T.LatheGeometry(pts, 18); lockGeo.scale(0.2, 0.2, 0.2); return lockGeo; };
  /* bang locks: [dphi, theta, size, tilt, sx?, sy?] */
  const BANGS = {
    side: [[-0.72, 1.16, 0.95, 0.4], [-0.44, 1.11, 1.0, 0.4], [-0.15, 1.08, 1.05, 0.4], [0.14, 1.08, 1.05, 0.4], [0.43, 1.11, 1.0, 0.35], [0.7, 1.16, 0.92, 0.3]],
    part: [[-0.18, 1.1, 1.0, -0.5], [-0.46, 1.15, 1.05, -0.55], [0.18, 1.1, 1.0, 0.5], [0.46, 1.15, 1.05, 0.55], [-0.86, 1.45, 1.0, -0.1, 1.3, 2.0], [0.86, 1.45, 1.0, 0.1, 1.3, 2.0]],
    short: [[-0.62, 1.1, 0.85, 0.7], [-0.36, 1.05, 0.95, 0.7], [-0.1, 1.03, 1.0, 0.7], [0.16, 1.04, 0.98, 0.65], [0.42, 1.07, 0.9, 0.6], [0.66, 1.13, 0.8, 0.5]],
    baby: [[-0.27, 1.08, 0.72, 0.3], [0, 1.06, 0.78, 0], [0.27, 1.08, 0.72, -0.3]],
    peek: [[-0.3, 1.13, 0.75, 0.25], [0, 1.11, 0.8, 0], [0.3, 1.13, 0.75, -0.25]],
    none: [],
  };
  /* v1 hairStyle names -> v2 hair options */
  const STYLE = {
    tuft: { bangs: 'side', ahoge: 'big' }, short: { bangs: 'short', backLen: 1.75, sideOpen: 1.15, ears: true }, bun: { bangs: 'part', bun: true },
    bob: { bangs: 'part', backLen: 2.25, sideOpen: 0.7 }, pigtails: { bangs: 'side', pigtails: true }, none: { bald: true, ears: true }, bald: { bald: true, ears: true },
  };
  /* shirt stripes painted into the body texture (flush, not raised rings). Sphere v runs top->bottom; the pants cap starts at 0.66 */
  const stripeTex = (T, base, stripe) => { const c = document.createElement('canvas'); c.width = 16; c.height = 256; const x = c.getContext('2d'); x.fillStyle = base; x.fillRect(0, 0, 16, 256); x.fillStyle = stripe; for (const f of [0.26, 0.36, 0.46, 0.56]) x.fillRect(0, Math.round(f * 256), 16, 11); return new T.CanvasTexture(c); };
  function bow(T, color, k) { const g = new T.Group(), m = M0(T, color); for (const s of [-1, 1]) { const c = new T.Mesh(new T.ConeGeometry(0.15, 0.3, 16), m); c.rotation.z = s * PI / 2; c.position.x = s * 0.15; c.scale.set(1, 1, 0.55); g.add(c); } g.add(new T.Mesh(new T.SphereGeometry(0.075, 12, 10), m)); g.scale.setScalar(k || 1); return g; }

  /* chibi character. Options (v2 names; v1 names hairStyle/accessory still work):
     skin, hair, bangs side|part|short|baby|peek|none, ahoge, bun, pigtails, bald, hood(color), bear(bear ears on hood), ears,
     top, bottom, shoes, sleeve, stripes(color), inner(color, open cardigan), collar(color),
     glasses, paci(color), bow(color), hat(color), bib, mustache(color), lashes, eyeScale, eyeSpread, round, brow, iris, scale.
     longSleeve (sleeve covers most of the arm).
     userData: head, arm1, arm-1 (shoulder pivots), hand1, hand-1, setExpr(happy|worried|sick|sleepy|giggle|angry|cry), tick(t,{wave,breath}). Angry shows a pop mark, cry adds falling tears. */
  CK.chibi = function (T, o0) {
    o0 = o0 || {};
    const acc = [].concat(o0.accessory || []), o = Object.assign({}, STYLE[o0.hairStyle] || {}, o0);
    if (acc.includes('glasses')) o.glasses = true; if (acc.includes('pacifier')) o.paci = o.paci || o0.paciColor || '#8fd3ff';
    if (acc.includes('bow')) o.bow = o.bow || o0.bowColor || '#ff6f9f'; if (acc.includes('hat')) o.hat = o.hat || o0.hatColor || '#ffb3c6';
    if (acc.includes('bib')) o.bib = true; if (acc.includes('bearEars')) o.bear = true;
    if (o.hood && !o0.bangs) o.bangs = 'peek';
    const g = new T.Group(), M = (c, x) => M0(T, c, x), ud = g.userData;
    const adult = (o.scale || 1) >= 1.2, skinC = (o.skin = o.skin || CK.pal.skin[0]), skin = M(skinC);
    const sh = new T.Mesh(new T.CircleGeometry(0.66, 32), new T.MeshBasicMaterial({ map: blob(T), transparent: true, depthWrite: false })); sh.rotation.x = -PI / 2; sh.position.y = 0.012; g.add(sh);
    const top = o.top || CK.pal.sky, bottom = o.bottom || CK.pal.butter, legH = adult ? 0.36 : 0.12;
    for (const s of [-1, 1]) {
      const leg = new T.Mesh(new T.CylinderGeometry(0.12, 0.13, legH + 0.08, 14), M(bottom)); leg.position.set(s * 0.17, legH / 2 + 0.08, 0); g.add(leg);
      const shoe = new T.Mesh(new T.SphereGeometry(0.16, 16, 12), M(o.shoes || '#ffffff')); shoe.scale.set(1, 0.62, 1.35); shoe.position.set(s * 0.18, 0.08, 0.06); g.add(shoe);
    }
    const bodyH = adult ? 1.28 : 1.0, bodyY = legH + 0.08 + 0.46 * bodyH * 0.92;
    const body = new T.Mesh(new T.SphereGeometry(0.46, 32, 24), o.stripes ? M('#ffffff', { map: stripeTex(T, top, o.stripes) }) : M(top)); body.scale.set(1.02, bodyH, 0.9); body.position.y = bodyY; g.add(body);
    body.add(new T.Mesh(new T.SphereGeometry(0.466, 32, 12, 0, TAU, PI * 0.66, PI * 0.34), M(bottom)));
    if (o.inner) { body.add(new T.Mesh(new T.SphereGeometry(0.464, 20, 14, PI / 2 - 0.3, 0.6, 0.3, 1.75), M(o.inner))); for (let i = 0; i < 3; i++) { const b = new T.Mesh(new T.SphereGeometry(0.035, 10, 8), M('#ffffff')); b.position.copy(surf(T, 0.85 + i * 0.32, 0.36, 0.47)); body.add(b); } }
    if (o.collar) { const c = new T.Mesh(new T.TorusGeometry(0.2, 0.045, 8, 24), M(o.collar)); c.rotation.x = PI / 2; c.position.y = 0.43; body.add(c); }
    if (o.bib) { const b = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.04, 20), M('#ffffff')); b.rotation.x = PI / 2 - 0.25; b.position.set(0, 0.26, 0.4); body.add(b); }
    /* arms hinge at the shoulder: rotation.z = 0 hangs straight down; + swings arm1 (screen right) outward/up, - swings arm-1 outward/up. Rest pose is set by tick(). */
    const shY = bodyY + 0.46 * bodyH * (adult ? 0.58 : 0.55), armL = adult ? 0.56 : 0.42, ar = adult ? 0.1 : 0.095, slv = M(o.sleeve || top), sleeveLen = armL * (o.longSleeve ? 0.82 : 0.48), rest = adult ? 0.4 : 0.5;
    for (const s of [-1, 1]) {
      const arm = new T.Group(); arm.position.set(s * 0.4, shY, 0.04); arm.rotation.x = -0.12; g.add(arm); ud['arm' + s] = arm;
      arm.add(new T.Mesh(new T.SphereGeometry(ar * 1.15, 14, 10), slv));
      const up = new T.Mesh(new T.CylinderGeometry(ar * 1.15, ar * 1.08, sleeveLen, 14), slv); up.position.y = -sleeveLen / 2; arm.add(up);
      const fore = new T.Mesh(new T.CylinderGeometry(ar * 0.85, ar * 0.8, armL - sleeveLen + 0.02, 12), skin); fore.position.y = -sleeveLen - (armL - sleeveLen) / 2 + 0.01; arm.add(fore);
      const hand = new T.Mesh(new T.SphereGeometry(ar * 1.2, 14, 10), skin); hand.position.y = -armL; hand.scale.set(1, 1.08, 0.88); arm.add(hand); ud['hand' + s] = hand;
    }
    const headY = bodyY + 0.46 * bodyH * 0.9 + 0.52;
    const head = new T.Group(); head.position.y = headY; g.add(head); ud.head = head;
    const HS = new T.Group(); HS.scale.set(1.08, 0.95, 1); head.add(HS); ud.headSpace = HS;
    HS.add(new T.Mesh(new T.SphereGeometry(0.72, 40, 30), skin));
    if (o.ears) for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.14, 12, 10), skin); e.scale.set(0.55, 1, 0.8); e.position.set(s * 0.72, -0.06, 0); HS.add(e); }
    const cv = document.createElement('canvas'); cv.width = cv.height = 512; const ctx = cv.getContext('2d'), tex = new T.CanvasTexture(cv);
    HS.add(new T.Mesh(new T.SphereGeometry(0.723, 48, 28, PI / 2 - PW / 2, PW, TH0, THL), M('#ffffff', { map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 })));
    const hairC = o.hair || '#4a3328', hairM = M(hairC), HG = new T.Group(); HS.add(HG);
    if (o.hood) {
      const hm = M(o.hood, { side: T.DoubleSide });
      HG.add(new T.Mesh(new T.SphereGeometry(0.82, 40, 22, PI / 2 + 0.98, TAU - 1.96, 0, 2.05), hm));
      HG.add(new T.Mesh(new T.SphereGeometry(0.82, 40, 14, 0, TAU, 0, 1.02), hm));
      const pts = [], R = 0.83; for (let th = 2.0; th > 1.2; th -= 0.1) pts.push(surf(T, th, -0.98, R)); pts.push(surf(T, 1.08, -0.88, R)); for (let d = -0.7; d <= 0.71; d += 0.175) pts.push(surf(T, 1.03, d, R)); pts.push(surf(T, 1.08, 0.88, R)); for (let th = 1.2; th <= 2.01; th += 0.1) pts.push(surf(T, th, 0.98, R));
      HG.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 80, 0.085, 10, false), M(o.hood)));
      if (o.bear) for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.19, 16, 12), M(o.hood)); e.scale.set(1, 1, 0.62); e.position.set(s * 0.5, 0.68, 0.02); HG.add(e); const ei = new T.Mesh(new T.SphereGeometry(0.11, 12, 8), M('#ffc4d6')); ei.scale.set(1, 1, 0.4); ei.position.set(0, 0, 0.1); e.add(ei); }
    } else if (o.bald) {
      for (const s of [-1, 1]) { const p = new T.Mesh(new T.SphereGeometry(0.2, 14, 10), hairM); p.scale.set(0.7, 1, 1.1); p.position.set(s * 0.66, 0.1, -0.22); HG.add(p); }
      const bk = new T.Mesh(new T.SphereGeometry(0.752, 32, 12, PI / 2 + 1.3, TAU - 2.6, 1.3, 0.55), hairM); HG.add(bk);
    } else {
      const capG = new T.Group(); capG.rotation.x = -0.26; HG.add(capG);
      capG.add(new T.Mesh(new T.SphereGeometry(0.75, 40, 20, 0, TAU, 0, o.capLen || 1.25), hairM));
      const sg = new T.TorusGeometry(0.762 * Math.sin(0.92), 0.026, 8, 40, 1.15); sg.rotateZ(PI / 2 - 0.575); sg.rotateX(PI / 2);
      const shine = new T.Mesh(sg, new T.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.38 })); shine.position.y = 0.762 * Math.cos(0.92); capG.add(shine);
      const side = o.sideOpen || 0.82;
      HG.add(new T.Mesh(new T.SphereGeometry(0.752, 40, 20, PI / 2 + side, TAU - 2 * side, 0.5, (o.backLen || 2.05) - 0.5), hairM));
    }
    const bset = BANGS[o.bald ? 'none' : o.bangs || 'side'];
    /* hairline fill: hair surface from the crown down to the bang roots, so locks grow out of hair (never float on the forehead) */
    if (!o.hood && !o.bald && bset.length) { const top = Math.min(...bset.map((L) => L[1])); HG.add(new T.Mesh(new T.SphereGeometry(0.745, 40, 12, PI / 2 - 0.92, 1.84, 0.4, top - 0.4), hairM)); }
    for (const L of bset) {
      const m = new T.Mesh(lockG(T), hairM), p = surf(T, L[1], L[0], 0.735), n = p.clone().normalize();
      const up = new T.Vector3(0, -1, 0).addScaledVector(n, n.y).normalize().negate().applyAxisAngle(n, L[3] || 0), xa = new T.Vector3().crossVectors(up, n);
      m.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(xa, up, n)); m.position.copy(p); m.scale.set((L[4] || 1.6) * L[2], (L[5] || 1.3) * L[2], 0.8 * L[2]); HG.add(m);
    }
    const tuft = [];
    if (o.ahoge) { const k = o.ahoge === 'big' ? 1 : 0.7; for (const [x, rz, sz] of [[0.04, PI - 0.45, 1], [-0.1, PI + 0.35, 0.7]]) { const a = new T.Mesh(lockG(T), hairM); a.position.set(x * k, 0.7 + 0.16 * k * sz, 0.06); a.rotation.z = rz; a.scale.set(1.3 * k * sz, 1.9 * k * sz, 0.9 * k * sz); HG.add(a); tuft.push(a); } }
    if (o.bun) { const b = new T.Mesh(new T.SphereGeometry(0.27, 20, 16), hairM); b.position.set(0, 0.74, -0.3); HG.add(b); tuft.push(b); const sc = new T.Mesh(new T.TorusGeometry(0.2, 0.075, 10, 24), M(o.scrunchie || '#ff8fab')); sc.position.set(0, 0.58, -0.22); sc.rotation.x = PI / 2 - 0.55; HG.add(sc); }
    if (o.pigtails) for (const s of [-1, 1]) { const p = new T.Mesh(new T.SphereGeometry(0.22, 16, 12), hairM); p.scale.set(0.85, 1.15, 0.85); p.position.set(s * 0.8, 0.12, -0.12); HG.add(p); tuft.push(p); if (o.bow) { const b = bow(T, o.bow, 0.6); b.position.set(s * 0.72, 0.36, -0.02); b.rotation.z = s * 0.4; HS.add(b); } }
    if (o.bow && !o.pigtails) { const b = bow(T, o.bow); b.position.set(0.32, 0.66, 0.3); b.rotation.z = -0.35; HS.add(b); }
    if (o.hat) { const hg = new T.Group(), hm = M(o.hat); const brim = new T.Mesh(new T.CylinderGeometry(1.0, 1.0, 0.05, 32), hm); const crown = new T.Mesh(new T.SphereGeometry(0.62, 24, 12, 0, TAU, 0, PI / 2), hm); crown.scale.y = 0.75; const band = new T.Mesh(new T.CylinderGeometry(0.63, 0.63, 0.1, 28, 1, true), M('#ffffff')); band.position.y = 0.06; hg.add(brim, crown, band); hg.position.set(0, 0.6, -0.04); hg.rotation.x = -0.18; HS.add(hg); }
    if (o.glasses) {
      const gm = M('#2b2b2b', { roughness: 0.25 });
      for (const s of [-1, 1]) { const p = surf(T, 1.66, s * 0.31, 0.745); const r = new T.Mesh(new T.TorusGeometry(0.15, 0.026, 10, 32), gm); r.position.set(p.x, p.y, p.z + 0.035); r.rotation.y = s * 0.3; HS.add(r); }
      const br = new T.Mesh(new T.CylinderGeometry(0.016, 0.016, 0.16, 6), gm); br.rotation.z = PI / 2; br.position.set(0, -0.04, 0.77); HS.add(br);
    }
    if (o.mustache) for (const s of [-1, 1]) { const m = new T.Mesh(new T.SphereGeometry(0.1, 14, 10), M(o.mustache)); const p = surf(T, 1.84, s * 0.12, 0.74); m.position.copy(p); m.scale.set(1.5, 0.55, 0.6); m.rotation.z = s * 0.28; HS.add(m); }
    if (o.paci) { const p = surf(T, 1.92, 0, 0.73); const shd = new T.Mesh(new T.SphereGeometry(0.15, 18, 12), M(o.paci)); shd.scale.set(1.35, 0.85, 0.32); shd.position.copy(p).add(new T.Vector3(0, 0, 0.02)); HS.add(shd); const bt = new T.Mesh(new T.SphereGeometry(0.055, 12, 10), M('#ffffff')); bt.position.copy(shd.position).add(new T.Vector3(0, 0, 0.05)); HS.add(bt); const rg = new T.Mesh(new T.TorusGeometry(0.075, 0.022, 8, 20), M('#ffffff')); rg.position.copy(shd.position).add(new T.Vector3(0, -0.09, 0.08)); rg.rotation.x = 0.5; HS.add(rg); ud.paci = [shd, bt, rg]; }
    /* anger pop mark + tears (driven by setExpr) */
    const mark = new T.Group(), mm = new T.MeshBasicMaterial({ color: '#ff3b4f' });
    for (const [sx, sy] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) { const a = new T.Mesh(new T.TorusGeometry(0.075, 0.028, 6, 12, PI / 2), mm); a.position.set(sx * 0.105, sy * 0.105, 0); a.rotation.z = Math.atan2(-sy, -sx) - PI / 4; mark.add(a); }
    mark.position.set(0.55, 0.6, 0.42); mark.visible = false; head.add(mark); ud.mark = mark;
    const tm = new T.MeshBasicMaterial({ color: '#8fd3ff' }), drops = [];
    for (const s of [-1, 1]) for (let i = 0; i < 2; i++) { const d = new T.Mesh(new T.SphereGeometry(0.05, 10, 8), tm); d.visible = false; HS.add(d); drops.push({ d, s, i }); }
    g.scale.setScalar(o.scale || 1);
    let cur = 'happy', blinkOn = false, dirty = true;
    const redraw = () => { drawFace(ctx, o, cur, blinkOn); tex.needsUpdate = true; dirty = false; };
    ud.setExpr = (n) => { if (n !== cur) { cur = n; dirty = true; } };
    ud.expr = () => cur;
    const bph = (CK._m = (CK._m || 0) + 1) * 1.37;
    ud.tick = (t, o2) => {
      o2 = o2 || {}; const rate = o2.breath || (cur === 'sick' ? 1.1 : 0.4), ph = t * rate * TAU;
      body.scale.set(1.02 + 0.015 * Math.sin(ph), bodyH + 0.025 * Math.sin(ph), 0.9); head.position.y = headY + 0.02 * Math.sin(ph); head.rotation.z = 0.04 * Math.sin(t * 0.9 + bph);
      const b = cur !== 'cry' && ((t + bph) % 3.3) < 0.13; if (b !== blinkOn) { blinkOn = b; dirty = true; } if (dirty) redraw();
      tuft.forEach((m, i) => (m.rotation.x = 0.08 * Math.sin(t * 2 + i)));
      ud['arm-1'].rotation.z = -(rest + 0.05 * Math.sin(t * 1.5)); ud.arm1.rotation.z = rest + 0.05 * Math.sin(t * 1.5 + 1);
      if (o2.wave) ud.arm1.rotation.z = 2.55 + 0.3 * Math.sin(t * 9);
      mark.visible = cur === 'angry'; if (mark.visible) mark.scale.setScalar(1 + 0.18 * Math.sin(t * 12));
      for (const q of drops) { q.d.visible = cur === 'cry'; if (!q.d.visible) continue; const k = (t * 1.4 + q.i * 0.5 + (q.s > 0 ? 0.25 : 0)) % 1; q.d.position.copy(surf(T, 1.82 + k * 0.42, q.s * (0.33 + k * 0.08), 0.75)); q.d.scale.set(1 - k * 0.3, 1.3 * (1 - k * 0.3), 1); }
    };
    redraw(); return g;
  };

  /* FIXED main cast (from the page's cartoon). Same look every video; only expressions/poses/situational extras change. */
  CK.FAMILY = {
    mom: { hair: '#8a5634', bangs: 'part', bun: true, lashes: true, eyeScale: 0.95, brow: '#6b4026', top: '#ffc93c', inner: '#ffffff', bottom: '#34497a', longSleeve: true, scale: 1.3 },
    dad: { hair: '#26232e', bangs: 'short', backLen: 1.75, sideOpen: 1.15, ears: true, glasses: true, eyeScale: 0.8, eyeSpread: 0.95, brow: '#26232e', top: '#cfd3dd', bottom: '#3a3d4d', scale: 1.4 },
    /* พี่มามะ: boy ~4, black hair with a curl on top, red/white striped shirt, blue shorts */
    mama: { hair: '#26232e', bangs: 'side', ahoge: 'big', brow: '#26232e', top: '#ffffff', stripes: '#ff4757', bottom: '#3d86e8', scale: 0.95 },
    /* น้องนานะ: boy ~2, mint bear-ear hoodie, butter shorts */
    nana: { hair: '#7a4e30', bangs: 'peek', hood: '#79dcb4', bear: true, top: '#79dcb4', bottom: '#ffd95a', longSleeve: true, scale: 0.8 },
    /* น้องวาวา: baby girl, brown hair, pink bow, pastel-blue pacifier, pink onesie */
    wawa: { hair: '#9a6a45', bangs: 'baby', capLen: 1.05, backLen: 1.55, ahoge: true, bow: '#ff6f9f', paci: '#8fd3ff', round: true, eyeScale: 1.08, top: '#ffa6c6', bottom: '#ffa6c6', shoes: '#ffa6c6', longSleeve: true, scale: 0.62 },
  };
  CK.FAMILY.bro = CK.FAMILY.mama; CK.FAMILY.sis = CK.FAMILY.wawa;
  CK.family = (T, who, extra) => CK.chibi(T, Object.assign({}, CK.FAMILY[who], extra || {}));
  /* supporting cast: colours that do NOT copy the main cast's signatures */
  const NB = [['#5cc99a', '#ffd166', 'bob', '#5a3d2b'], ['#9b8cff', '#ffc09f', 'tuft', '#6b4a3a'], ['#5fb3ff', '#fff1a8', 'pigtails', '#3a2a22'], ['#ff9a62', '#bfeedd', 'bob', '#2b2b33']];
  CK.neighbor = (T, i, extra) => { const n = NB[i % NB.length]; return CK.chibi(T, Object.assign({ top: n[0], bottom: n[1], hairStyle: n[2], hair: n[3], skin: CK.pal.skin[i % 3] }, extra || {})); };

  /* room: wallpaper + wainscot, plank floor (deep, so long lenses never see its edge), rug, window, bunting, optional props.
     o: wall, dots, wain, floor, rug (colour|false), props (default true), bunting (opt-in; sits in the caption zone), curtain (colour, opt-in), winX. userData: floor, wall, win(pane) */
  const ctex = (T, w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); if (rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; };
  const shade = (T, c, k) => '#' + new T.Color(c).multiplyScalar(k).getHexString();
  CK.room = function (T, o) {
    o = o || {}; const g = new T.Group(), M = (c, x) => M0(T, c, x), wallC = o.wall || '#ffcfe0';
    const wt = ctex(T, 256, 256, (x) => { x.fillStyle = wallC; x.fillRect(0, 0, 256, 256); x.fillStyle = o.dots || 'rgba(255,255,255,0.75)'; for (const [a, b] of [[64, 64], [192, 192]]) { x.beginPath(); x.arc(a, b, 20, 0, TAU); x.fill(); } x.fillStyle = shade(T, wallC, 0.9); for (const [a, b] of [[192, 64], [64, 192]]) { x.beginPath(); x.arc(a, b, 9, 0, TAU); x.fill(); } }, [9, 4]);
    const wall = new T.Mesh(new T.BoxGeometry(18, 8, 0.3), M('#ffffff', { map: wt })); wall.position.set(0, 4, -4.5); g.add(wall);
    const wain = new T.Mesh(new T.BoxGeometry(18, 1.3, 0.12), M(o.wain || '#9fe3cf')); wain.position.set(0, 0.65, -4.32); g.add(wain);
    const trim = new T.Mesh(new T.BoxGeometry(18, 0.12, 0.22), M('#ffffff')); trim.position.set(0, 1.32, -4.28); g.add(trim);
    const fc = o.floor || '#ffe3bd', ft = ctex(T, 256, 256, (x) => { x.fillStyle = fc; x.fillRect(0, 0, 256, 256); x.fillStyle = shade(T, fc, 0.93); for (let i = 0; i < 4; i++) x.fillRect(i * 64, 0, 4, 256); }, [7, 9]);
    const floor = new T.Mesh(new T.BoxGeometry(18, 0.3, 22), M('#ffffff', { map: ft })); floor.position.set(0, -0.15, 6.4); g.add(floor);
    if (o.rug !== false) {
      const rc = o.rug || '#ff9ec0', rt = ctex(T, 512, 512, (x) => { x.fillStyle = rc; x.fillRect(0, 0, 512, 512); x.fillStyle = '#' + new T.Color(rc).lerp(new T.Color('#ffffff'), 0.1).getHexString(); x.beginPath(); x.arc(256, 256, 200, 0, TAU); x.fill(); x.fillStyle = '#ffffff'; for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; x.beginPath(); x.arc(256 + Math.cos(a) * 226, 256 + Math.sin(a) * 226, 10, 0, TAU); x.fill(); } });
      const rug = new T.Mesh(new T.CylinderGeometry(3.3, 3.3, 0.05, 48), [M(rc), M('#ffffff', { map: rt }), M(rc)]); rug.position.set(0, 0.025, 0.4); g.add(rug); g.userData.rug = rug;
    }
    const win = new T.Group(), paneM = new T.MeshBasicMaterial({ map: ctex(T, 256, 256, (x) => { const gr = x.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#7fc8ff'); gr.addColorStop(1, '#d4efff'); x.fillStyle = gr; x.fillRect(0, 0, 256, 256); x.fillStyle = '#ffffff'; for (const [a, b, r] of [[70, 150, 34], [110, 140, 42], [150, 152, 30], [190, 70, 22], [214, 64, 28]]) { x.beginPath(); x.arc(a, b, r, 0, TAU); x.fill(); } x.fillStyle = '#ffe066'; x.beginPath(); x.arc(60, 60, 26, 0, TAU); x.fill(); }) });
    const pane = new T.Mesh(new T.PlaneGeometry(2.2, 2.0), paneM); win.add(pane); const fm = M('#ffffff');
    for (const [w, h, x, y] of [[2.45, 0.14, 0, 1.06], [2.45, 0.14, 0, -1.06], [0.14, 2.2, 1.16, 0], [0.14, 2.2, -1.16, 0], [0.08, 2.0, 0, 0], [2.2, 0.08, 0, 0]]) { const b = new T.Mesh(new T.BoxGeometry(w, h, 0.12), fm); b.position.set(x, y, 0.04); win.add(b); }
    if (o.curtain) for (const s of [-1, 1]) { const c = new T.Mesh(new T.CylinderGeometry(0.28, 0.4, 2.5, 16), M(o.curtain)); c.scale.z = 0.4; c.position.set(s * 1.42, -0.1, 0.12); win.add(c); }
    win.position.set(o.winX == null ? 3.55 : o.winX, 3.2, -4.32); g.add(win);
    if (o.bunting) { const FC = ['#ff6f91', '#ffd23f', '#5ab8ff', '#79dcb4', '#b9a4ff']; for (let i = 0; i < 13; i++) { const u = i / 12, f = new T.Mesh(new T.ConeGeometry(0.2, 0.42, 3), M(FC[i % 5])); f.rotation.z = PI; f.scale.z = 0.25; f.position.set(-3.2 + u * 6.4, 5.05 - Math.sin(u * PI) * 0.45, -4.2); g.add(f); } }
    if (o.props !== false) {
      const pot = new T.Mesh(new T.CylinderGeometry(0.34, 0.26, 0.55, 20), M('#ff9e6e')); pot.position.set(-3.0, 0.28, -3.4); g.add(pot);
      for (const [x, y, z, r] of [[0, 0.85, 0, 0.42], [-0.25, 1.1, 0.05, 0.3], [0.25, 1.15, 0, 0.32], [0, 1.4, 0.02, 0.28]]) { const l = new T.Mesh(new T.SphereGeometry(r, 16, 12), M('#57c98b')); l.position.set(-3.0 + x, y, -3.4 + z); g.add(l); }
      [['#ffd23f', 0], ['#5ab8ff', 1], ['#ff6f91', 2]].forEach(([c, i]) => { const b = new T.Mesh(new T.BoxGeometry(0.42, 0.42, 0.42), M(c)); b.position.set(2.95 + (i === 2 ? 0.1 : i * 0.46 - 0.23), 0.21 + (i === 2 ? 0.42 : 0), -2.3); b.rotation.y = i * 0.3; g.add(b); });
    }
    g.userData = Object.assign(g.userData, { floor, wall, win: pane, wain });
    return g;
  };
  CK.virus = function (T, o) {
    o = o || {}; const g = new T.Group(), c = o.color || '#ff7a8a', M = CK.mat(T, c);
    g.add(new T.Mesh(new T.SphereGeometry(0.4, 18, 14), M));
    const ico = new T.IcosahedronGeometry(1, 0).attributes.position, seen = [];
    for (let i = 0; i < ico.count; i++) {
      const v = new T.Vector3(ico.getX(i), ico.getY(i), ico.getZ(i)).normalize();
      if (seen.some((s) => s.distanceTo(v) < 0.01)) continue; seen.push(v);
      const sp = new T.Mesh(new T.ConeGeometry(0.09, 0.28, 8), M); sp.position.copy(v).multiplyScalar(0.5); sp.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), v); g.add(sp);
    }
    const eM = CK.mat(T, CK.pal.dark);
    for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.05, 8, 8), eM); e.position.set(s * 0.14, 0.06, 0.37); g.add(e); }
    return g;
  };
  CK.bar = (T, w, d, color) => { const g = new T.BoxGeometry(w, 1, d); g.translate(0, 0.5, 0); return new T.Mesh(g, CK.mat(T, color)); };
  CK.tube = (T, r, len, color) => new T.Mesh(new T.CylinderGeometry(r, r, len, 28, 1, true), CK.mat(T, color || CK.pal.pink, { side: T.DoubleSide }));

  /* health-specific SFX */
  const au = () => VE.audio;
  VE.registerSfx('sneeze', (t) => { au().noise(t, 0.12, { type: 'highpass', f: 2000, vol: 0.1 }); au().tone(t + 0.12, 900, 0.18, { f2: 300, vol: 0.2 }); au().noise(t + 0.12, 0.25, { type: 'bandpass', f: 1500, vol: 0.18 }); });
  VE.registerSfx('cough', (t) => { for (let i = 0; i < 2; i++) { au().noise(t + i * 0.18, 0.12, { type: 'bandpass', f: 900, vol: 0.2 }); au().tone(t + i * 0.18, 220, 0.1, { f2: 140, type: 'sawtooth', vol: 0.08 }); } });
  VE.registerSfx('breath', (t) => au().noise(t, 0.9, { type: 'bandpass', f: 500, f2: 900, vol: 0.07, att: 0.4 }));
  VE.registerSfx('wheeze', (t) => { au().tone(t, 700, 0.8, { f2: 900, vol: 0.05, type: 'sawtooth' }); au().noise(t, 0.8, { type: 'highpass', f: 3000, vol: 0.05 }); });
  VE.registerSfx('rain', (t, o) => au().noise(t, (o && o.dur) || 2, { type: 'highpass', f: 4000, vol: 0.06, att: 0.3 }));
  VE.registerSfx('bubble', (t) => au().tone(t, 500, 0.12, { f2: 1100, vol: 0.12 }));
  VE.registerSfx('heart', (t) => { VE.sfx.twinkle(t); });
  VE.registerSfx('thud', (t) => au().tone(t, 100, 0.15, { f2: 50, vol: 0.3 }));
})();
