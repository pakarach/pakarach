/* story kit: recap look (EP.recap = true). Long-form 16:9 retellings with a voice-over.
   Needs from the film file: RECAP = { sub, pop, third, credit, title, pages, booth } and RT = recapTiming(BEATS, RECAP.sub) (k-pre.js).
   - sub[id]    = ['phrase', 'phrase with {highlight}', ...]          one-line subtitles, timed across the beat's voice clip
   - pop[id]    = [[time, 'word', { x, y (0..1), px, rot, dur, c }]]   big comic key words
   - third[id]  = [[time, 'name', 'role', dur]]                        character lower third (first appearance)
   - credit[id] = [[time, 'label', 'name', dur]]                       credit plates, stacked on the right
   - title[id]  = ['kicker', 'line 1', 'line 2', secs]                 full-screen chapter card; wipes off at the beat's end, or after secs (then the subtitles show over it)
   - pages[id]  = [{ t0, t1, x, y, h, rot, from, head, panels, stamp, to }]  floating comic pages; each panel shows a live render of the
                  booth cast: panel.shot = (o, t) => RC.cam(...) after posing booth actors with RC.act(...)
   - booth      = ['castKey', ...] cast entries that only live in the booth (hidden in the main scene)
   Times are seconds into the beat; use RT.p(id, i, off) to pin them to phrase i. */
const RC = (() => {
  const INK = '#15141a', PAPER = '#f6efdd', YEL = '#ffd23f', PINK = '#ff3d8b';
  const R = (typeof RECAP !== 'undefined' && RECAP) || {};
  const K = (w, px) => w + ' ' + px + 'px Kanit,sans-serif', D2R = Math.PI / 180;
  const eOut = (x) => 1 - Math.pow(1 - U.clamp(x), 3), eBack = (x) => U.easeBack(U.clamp(x));
  const BO = [-4000, 0, 0];
  let scene = null, renderer = null, pcam = null, S0 = null, dotTile = null, cardBg = null;

  function setup(S, sc, rd) {
    S0 = S; scene = sc; renderer = rd; pcam = new T.PerspectiveCamera(40, L.W / L.H, 0.1, 300);
    const r1 = new T.DirectionalLight('#7fdcff', 0.5); r1.position.set(-6, 4, -8); const r2 = new T.DirectionalLight('#ff7fb4', 0.45); r2.position.set(7, 3, -7); scene.add(r1, r2); S.rims = [r1, r2];
  }
  /* ---------- booth (comic panel renders) ---------- */
  const cam = (lx, ly, lz, dist, h, side) => ({ look: [BO[0] + lx, BO[1] + ly, BO[2] + lz], pos: [BO[0] + lx + (side || 0), BO[1] + ly + (h || 0), BO[2] + lz + dist] });
  function act(o, x, y, z, f, pose, ex, t) {
    if (!o) return; o.visible = true; o.position.set(BO[0] + x, BO[1] + y, BO[2] + z); o.scale.setScalar(o.userData.s0 || 1); o.rotation.set(0, (f || 0) * D2R, 0);
    if (o.userData.arms) { if (o.userData.vinyl) { o.userData.setExpr(ex || 'happy'); o.userData.tick(t || 0); } rest(o); o.userData.head.rotation.set(0, 0, 0); const p = typeof pose === 'function' ? pose : POSE[pose]; if (p) p(o, 1, t || 0, {}); }
  }
  const prop = (o, x, y, z, rx, ry, rz, s) => { if (!o) return; o.visible = true; o.position.set(BO[0] + x, BO[1] + y, BO[2] + z); o.rotation.set(rx || 0, ry || 0, rz || 0); o.scale.setScalar((o.userData.s0 || 1) * (s || 1)); };
  const hideBooth = () => (R.booth || []).forEach((k) => { if (S0.o[k]) S0.o[k].visible = false; });
  function snap(g, shot, t, x, y, w, h) {
    hideBooth(); const c = shot(S0.o, t); pcam.position.set(c.pos[0], c.pos[1], c.pos[2]); pcam.lookAt(c.look[0], c.look[1], c.look[2]); pcam.updateMatrixWorld(true);
    renderer.render(scene, pcam); hideBooth();
    const el = renderer.domElement, cw = el.width, ch = el.height, pa = w / h; let sw = cw, sh = ch; if (pa < cw / ch) sw = ch * pa; else sh = cw / pa;
    g.drawImage(el, (cw - sw) / 2, (ch - sh) / 2, sw, sh, x, y, w, h);
  }
  /* ---------- 2D pieces ---------- */
  function dots() { if (dotTile) return dotTile; const c = document.createElement('canvas'); c.width = c.height = 22; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.beginPath(); x.arc(5.5, 5.5, 3.4, 0, 6.3); x.arc(16.5, 16.5, 3.4, 0, 6.3); x.fill(); return (dotTile = c); }
  function ctext(g, s, x, y, px, o) {
    o = o || {}; g.save(); g.translate(x, y); g.rotate((o.rot || 0) * D2R); g.transform(1, 0, -0.16, 1, 0, 0); g.font = K(800, px); g.textAlign = o.al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    const d = px * 0.085; g.lineWidth = px * 0.2; g.strokeStyle = INK; g.fillStyle = o.sh || PINK; g.strokeText(s, d, d); g.fillText(s, d, d); g.strokeText(s, 0, 0); g.fillStyle = o.c || YEL; g.fillText(s, 0, 0); g.restore();
  }
  const para = (g, x, y, w, h, k) => { g.beginPath(); g.moveTo(x + k, y); g.lineTo(x + w + k, y); g.lineTo(x + w - k, y + h); g.lineTo(x - k, y + h); g.closePath(); };
  function parts(str) { const out = [], re = /\{([^}]*)\}/g; let i = 0, m; while ((m = re.exec(str))) { if (m.index > i) out.push([str.slice(i, m.index), '#fff']); out.push([m[1], YEL]); i = re.lastIndex; } if (i < str.length) out.push([str.slice(i), '#fff']); return out; }
  function subtitle(g, id, r, W, H) {
    const n = RT.n(id); for (let i = 0; i < n; i++) { const t0 = RT.p(id, i), t1 = RT.e(id, i); if (r < t0 - 0.02 || r >= t1) continue;
      const ps = parts(R.sub[id][i]), a = U.clamp((r - t0 + 0.02) / 0.1); let px = 46; g.save(); g.globalAlpha = a; g.font = K(600, px); const w0 = ps.reduce((s, p) => s + g.measureText(p[0]).width, 0); if (w0 > W - 280) { px = Math.floor(px * (W - 280) / w0); g.font = K(600, px); } g.textBaseline = 'middle'; g.textAlign = 'left'; g.lineJoin = 'round';
      const w = ps.reduce((s, p) => s + g.measureText(p[0]).width, 0); let x = W / 2 - w / 2; const y = H - 104 + (1 - a) * 8;
      g.lineWidth = 9; g.strokeStyle = 'rgba(21,20,26,.92)'; for (const p of ps) { g.strokeText(p[0], x, y); x += g.measureText(p[0]).width; }
      x = W / 2 - w / 2; for (const p of ps) { g.fillStyle = p[1]; g.fillText(p[0], x, y); x += g.measureText(p[0]).width; } g.restore(); return; }
  }
  function pops(g, id, r, W, H) {
    for (const q of (R.pop || {})[id] || []) { const o = q[2] || {}, d = o.dur || 1.6, u = r - q[0]; if (u < 0 || u > d) continue;
      const k = eBack(u / 0.24), a = U.clamp((d - u) / 0.2), px = (o.px || 150) * (0.35 + 0.65 * k); g.save(); g.globalAlpha = a;
      if (o.burst !== false) { g.save(); g.translate((o.x || 0.5) * W, (o.y || 0.3) * H); g.rotate((o.rot || -5) * D2R); g.font = K(800, o.px || 150); const w = g.measureText(q[1]).width * 0.62 * k + 90; g.fillStyle = INK; para(g, -w + 14, -(o.px || 150) * 0.44 + 12, w * 2, (o.px || 150) * 0.9, 34); g.fill(); g.fillStyle = o.band || PINK; para(g, -w, -(o.px || 150) * 0.44, w * 2, (o.px || 150) * 0.9, 34); g.fill(); g.restore(); }
      ctext(g, q[1], (o.x || 0.5) * W, (o.y || 0.3) * H, px, { rot: (o.rot == null ? -5 : o.rot) + Math.sin(u * 14) * 0.6 * (1 - U.clamp(u / 0.6)), c: o.c || YEL, sh: o.sh || INK }); g.restore(); }
  }
  function thirds(g, id, r, W, H) {
    for (const q of (R.third || {})[id] || []) { const d = q[3] || 3.2, u = r - q[0]; if (u < 0 || u > d) continue; const k = eOut(u / 0.35), a = U.clamp((d - u) / 0.25), x = 96, y = H - 318, w = 640;
      g.save(); g.globalAlpha = a; g.beginPath(); g.rect(0, y - 30, x + (w + 80) * k, 200); g.clip();
      g.fillStyle = YEL; para(g, x - 16, y + 8, w, 112, 14); g.fill(); g.fillStyle = INK; para(g, x, y, w, 112, 14); g.fill(); g.fillStyle = PINK; para(g, x, y, 14, 112, 14); g.fill();
      g.font = K(800, 60); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(q[1], x + 44, y + 42); g.font = K(600, 30); g.fillStyle = YEL; g.fillText(q[2], x + 40, y + 88); g.restore(); }
  }
  function credits(g, id, r, W, H) {
    const pg = (R.pages || {})[id], left = !!(pg && pg.some((p) => p.x > 0.5 && r > p.t0 - 0.3 && (p.t1 == null || r < p.t1 + 0.4)));   /* a page on the right: plates go left */
    let slot = 0; for (const q of (R.credit || {})[id] || []) { const d = q[3] || 4, u = r - q[0]; if (u < 0) continue; if (u > d) { continue; } const k = eOut(u / 0.3), a = U.clamp((d - u) / 0.25), y = 210 + slot * 138; slot++;
      g.save(); g.globalAlpha = a; g.font = K(800, 52); const w = Math.max(g.measureText(q[2]).width + 84, 380), x = left ? 96 - (1 - k) * 120 : W - 96 - w + (1 - k) * 120;
      g.fillStyle = INK; para(g, x, y, w, 84, 10); g.fill(); g.font = K(600, 26); const lw = g.measureText(q[1]).width + 36; g.fillStyle = PINK; para(g, x + 6, y - 34, lw, 40, 6); g.fill();
      g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(q[1], x + 24, y - 13); g.font = K(800, 52); g.fillText(q[2], x + 40, y + 44); g.restore(); }
  }
  function halftone(W, H) { if (cardBg) return cardBg; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.fillStyle = INK; x.fillRect(0, 0, W, H);
    for (let j = 0; j * 30 < H + 30; j++) for (let i = 0; i * 30 < W + 30; i++) { const px = i * 30 + (j % 2) * 15, py = j * 30, d = Math.hypot(px - W, py - H) / Math.hypot(W, H), rad = Math.max(0, 13 * (1 - d * 1.55)); if (rad < 0.6) continue; x.fillStyle = PINK; x.beginPath(); x.arc(px, py, rad, 0, 6.3); x.fill(); }
    x.fillStyle = YEL; para(x, -80, H * 0.67, W * 0.52, 22, 60); x.fill(); return (cardBg = c); }
  function titleCard(g, id, r, W, H) {
    const tc = (R.title || {})[id]; if (!tc) return; const d = Math.min(tc[3] || 99, dur(id)), w = U.clamp((r - (d - 0.5)) / 0.5), edge = (W + 420) * (1 - U.easeIO(w)) - 210; if (w >= 1) return;
    g.save(); g.beginPath(); g.moveTo(0, 0); g.lineTo(edge + 200, 0); g.lineTo(edge - 200, H); g.lineTo(0, H); g.closePath(); g.clip(); g.drawImage(halftone(W, H), 0, 0);
    const k = cfgCover ? 1 : eOut(r / 0.4); g.font = K(800, 40); const kw = g.measureText(tc[0]).width + 64; g.fillStyle = PINK; para(g, 150, 250, kw, 68, 10); g.fill(); g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(tc[0], 180, 286);
    ctext(g, tc[1], 150 + (1 - k) * -60, 440, 150, { al: 'left', rot: 0, c: '#fff', sh: PINK }); if (tc[2]) ctext(g, tc[2], 150 + (1 - k) * -60, 610, 150, { al: 'left', rot: 0, c: YEL, sh: PINK });
    g.font = K(600, 30); g.fillStyle = 'rgba(255,255,255,.8)'; g.textAlign = 'left'; g.fillText(EP.foot || '', 156, H - 120); g.restore();
    if (w > 0) { g.fillStyle = YEL; g.beginPath(); g.moveTo(edge + 200, 0); g.lineTo(edge + 250, 0); g.lineTo(edge - 150, H); g.lineTo(edge - 200, H); g.closePath(); g.fill(); g.fillStyle = PINK; g.beginPath(); g.moveTo(edge + 250, 0); g.lineTo(edge + 276, 0); g.lineTo(edge - 124, H); g.lineTo(edge - 150, H); g.closePath(); g.fill(); }
  }
  function facts(g, r, W, H) {
    if (!EP.facts || !EP.facts.length) return; const d = dur('facts'), n = EP.facts.length, a = U.clamp(r / 0.35) * U.clamp((d - r) / 0.35), gap = Math.min(2.4, (d - 1.6) / n), x = 110, w = Math.min(980, W * 0.51);
    g.save(); g.globalAlpha = a; const hd = EP.factHead || ['รู้งี้…', '']; g.font = K(800, 64); const hw = g.measureText(hd.join(' ')).width + 80;
    g.fillStyle = INK; para(g, x, 120, hw, 96, 16); g.fill(); g.fillStyle = PINK; para(g, x, 120, 16, 96, 16); g.fill(); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = YEL; g.fillText(hd[0], x + 40, 170); g.fillStyle = '#fff'; g.fillText(hd[1] || '', x + 52 + g.measureText(hd[0] + ' ').width, 170);
    EP.facts.forEach((f, i) => { const u = r - (0.5 + i * gap); if (u < 0) return; const k = eOut(u / 0.35), y = 270 + i * 190, xx = x + (1 - k) * -80; g.save(); g.globalAlpha = a * U.clamp(u / 0.2);
      g.fillStyle = 'rgba(21,20,26,.9)'; para(g, xx, y, w, 160, 14); g.fill(); g.fillStyle = YEL; para(g, xx - 10, y + 12, 96, 136, 10); g.fill(); g.font = K(800, 72); g.textAlign = 'center'; g.fillStyle = INK; g.fillText(String(i + 1), xx + 38, y + 84);
      g.textAlign = 'left'; let px = 44; g.font = K(800, px); const lw = g.measureText(f[0]).width; if (lw > w - 160) { px = Math.floor(px * (w - 160) / lw); g.font = K(800, px); } g.fillStyle = '#fff'; g.fillText(f[0], xx + 120, y + 58);
      g.font = K(600, 32); g.fillStyle = YEL; g.fillText(f[1] || '', xx + 120, y + 112); g.restore(); });
    if (EP.src) { g.font = K(600, 24); g.textAlign = 'left'; g.fillStyle = 'rgba(255,255,255,.75)'; g.fillText(EP.src, x, H - 190); } g.restore();
  }
  const cfgCover = true;
  function panelBg(g, p, x, y, w, h, t) {
    const gr = g.createLinearGradient(x, y, x, y + h); gr.addColorStop(0, p.bg[0]); gr.addColorStop(1, p.bg[1]); g.fillStyle = gr; g.fillRect(x, y, w, h);
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    if (p.fx === 'dots') { g.globalAlpha = 0.2; g.fillStyle = g.createPattern(dots(), 'repeat'); g.fillRect(x, y, w, h); }
    else if (p.fx === 'burst') { g.globalAlpha = 0.22; g.fillStyle = '#fff'; const cx = x + w * (p.cx || 0.5), cy = y + h * (p.cy || 0.55), n = 22, RR = Math.hypot(w, h); for (let i = 0; i < n; i++) { const a = i / n * 6.283 + t * 0.15; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * RR, cy + Math.sin(a) * RR); g.lineTo(cx + Math.cos(a + 0.12) * RR, cy + Math.sin(a + 0.12) * RR); g.closePath(); g.fill(); } }
    else if (p.fx === 'speed') { g.globalAlpha = 0.3; g.fillStyle = '#fff'; for (let i = 0; i < 16; i++) { const yy = y + ((i * 0.618) % 1) * h, len = w * (0.25 + ((i * 0.37) % 1) * 0.5), xx = x + ((i * 0.29 + t * 0.6) % 1.4 - 0.3) * w; g.fillRect(xx, yy, len, 3 + (i % 3) * 2); } }
    g.restore();
  }
  function page(g, pg, r, t, W, H) {
    const u = r - pg.t0; if (u < 0 || (pg.t1 != null && r > pg.t1 + 0.4)) return; const out = pg.t1 != null ? U.clamp((r - pg.t1) / 0.4) : 0;
    const ph = pg.h * H, pw = ph * 0.69; let x = pg.x * W, y = pg.y * H, rot = pg.rot || 0, sc = 1;
    if (pg.to && r > pg.to[0]) { const k = U.easeIO(U.clamp((r - pg.to[0]) / 0.55)); x = U.lerp(x, pg.to[1] * W, k); y = U.lerp(y, pg.to[2] * H, k); rot = U.lerp(rot, pg.to[3], k); sc = U.lerp(1, pg.to[4] || 1, k); }
    const kin = U.clamp(u / 0.5);
    if (pg.from === 'top') { y += -(H * 1.1) * (1 - eOut(u / 0.32)); sc *= 1 + 0.16 * Math.max(0, 1 - Math.abs(u - 0.32) / 0.14) * (u > 0.32 ? 1 : 0) + 0.25 * (1 - U.clamp(u / 0.32)); rot += 10 * (1 - eOut(u / 0.32)); }
    else { x += (W * 0.62) * (1 - eBack(kin)); rot += 16 * (1 - eOut(kin)); }
    x += out * W * 0.7; rot += out * 12; y += Math.sin(t * 1.3 + pg.x * 9) * 7; rot += Math.sin(t * 0.9 + pg.x * 5) * 0.5;
    g.save(); g.translate(x, y); g.rotate(rot * D2R); g.scale(sc, sc);
    g.save(); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 50; g.shadowOffsetX = 18; g.shadowOffsetY = 26; g.fillStyle = PAPER; g.fillRect(-pw / 2, -ph / 2, pw, ph); g.restore();
    const m = pw * 0.045, hh = ph * 0.1; g.fillStyle = INK; g.fillRect(-pw / 2 + m, -ph / 2 + m, pw - 2 * m, hh);
    let rw = 0; if (pg.head[1]) { g.font = K(600, hh * 0.32); rw = g.measureText(pg.head[1]).width + 30; g.textAlign = 'right'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(pg.head[1], pw / 2 - m - 20, -ph / 2 + m + hh / 2 + 2); }
    let hp = hh * 0.56; g.font = K(800, hp); const hw = g.measureText(pg.head[0]).width, room = pw - 2 * m - 44 - rw; if (hw > room) { hp *= room / hw; g.font = K(800, hp); } g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = YEL; g.fillText(pg.head[0], -pw / 2 + m + 22, -ph / 2 + m + hh / 2 + 2);
    const ax = -pw / 2 + m, ay = -ph / 2 + m + hh + m * 0.6, aw = pw - 2 * m, ah = ph - 2 * m - hh - m * 0.6;
    for (const p of pg.panels) { const px = ax + p.r[0] * aw, py = ay + p.r[1] * ah, w = p.r[2] * aw, h = p.r[3] * ah;
      panelBg(g, p, px, py, w, h, t); if (p.shot && renderer) snap(g, p.shot, t, px, py, w, h);
      g.lineWidth = 7; g.strokeStyle = INK; g.strokeRect(px, py, w, h);
      if (p.cap) { g.font = K(600, 26); const cw = g.measureText(p.cap).width + 30; g.fillStyle = YEL; g.fillRect(px + 10, py + 10, cw, 44); g.lineWidth = 4; g.strokeRect(px + 10, py + 10, cw, 44); g.fillStyle = INK; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(p.cap, px + 25, py + 33); }
      if (p.balloon) { g.font = K(800, 34); const bw = g.measureText(p.balloon).width + 50, bx = px + w - bw - 14, by = py + 14; g.fillStyle = '#fff'; g.lineWidth = 5; g.beginPath(); g.ellipse(bx + bw / 2, by + 36, bw / 2, 36, 0, 0, 6.3); g.fill(); g.stroke(); g.beginPath(); g.moveTo(bx + bw * 0.3, by + 66); g.lineTo(bx + bw * 0.16, by + 100); g.lineTo(bx + bw * 0.5, by + 70); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.fillRect(bx + bw * 0.28, by + 58, bw * 0.24, 10); g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(p.balloon, bx + bw / 2, by + 38); }
      if (p.sfx) ctext(g, p.sfx, px + w * 0.5, py + h * 0.2, Math.min(w * 0.3, 84), { rot: -8, c: '#fff', sh: PINK }); }
    if (pg.stamp && r > pg.stamp[0]) { const su = r - pg.stamp[0], k = 1 + 1.3 * (1 - eOut(su / 0.16)); g.save(); g.translate(pw * 0.02, ph * 0.3); g.rotate(-11 * D2R); g.scale(k, k); g.globalAlpha = U.clamp(su / 0.08) * 0.94;
      g.font = K(800, 70); const sw = g.measureText(pg.stamp[1]).width + 70; g.fillStyle = 'rgba(246,239,221,.9)'; g.fillRect(-sw / 2, -58, sw, 116); g.strokeStyle = '#e0263c'; g.lineWidth = 9; g.strokeRect(-sw / 2, -58, sw, 116); g.lineWidth = 3; g.strokeRect(-sw / 2 + 12, -46, sw - 24, 92);
      g.fillStyle = '#e0263c'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pg.stamp[1], 0, 4); g.restore(); }
    g.restore();
  }
  function hud(g, t, W, H) {
    const id = beatAt(t), r = rel(t, id), ended = id === 'end';
    const pgs = (R.pages || {})[id]; if (pgs && pgs.some((p) => r > p.t0)) { const a = U.clamp((r - pgs[0].t0) / 0.5) * 0.5, gr = g.createLinearGradient(W * 0.3, 0, W, 0); gr.addColorStop(0, 'rgba(21,20,26,0)'); gr.addColorStop(1, 'rgba(21,20,26,' + a + ')'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
    const bg = g.createLinearGradient(0, H - 300, 0, H); bg.addColorStop(0, 'rgba(21,20,26,0)'); bg.addColorStop(1, 'rgba(21,20,26,.78)'); g.fillStyle = bg; g.fillRect(0, H - 300, W, 300);
    if (pgs) for (const p of pgs) page(g, p, r, t, W, H);
    g.fillStyle = INK; g.fillRect(0, 0, W, 46); g.fillRect(0, H - 46, W, 46);
    if (!ended) { credits(g, id, r, W, H); thirds(g, id, r, W, H); pops(g, id, r, W, H); if (R.sub && R.sub[id]) subtitle(g, id, r, W, H); }
    g.font = K(800, 26); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = P.teal; g.fillText('RuNgee รู้งี้', 40, 24); if (EP.series) { g.font = K(600, 22); g.fillStyle = 'rgba(255,255,255,.7)'; g.textAlign = 'right'; g.fillText(EP.series, W - 40, 24); }
    titleCard(g, id, r, W, H); const tc = (R.title || {})[id]; if (tc && tc[3] && r < tc[3] && R.sub && R.sub[id]) subtitle(g, id, r, W, H);
    if (id === 'facts') facts(g, r, W, H);
  }
  /* recap camera: SC[id].rc = [[t, lookX, lookY, lookZ, dist, height, angleDeg, cut, drift], ...] (station-relative look point; the camera sits on a circle around it).
     Between two keys everything eases together, so a change of angle is an orbit and a change of look point is a truck; a key with cut = 1 jumps. After the last key
     (or before a cut) the shot keeps breathing: a slow orbit and push (drift = 0 turns that off). Without rc the story kit's own cam keys are used. */
  function camState(id, r) {
    const ks = SC[id] && SC[id].rc; if (!ks) return null; let i = 0; while (i + 1 < ks.length && r >= ks[i + 1][0]) i++; const a = ks[i], b = ks[i + 1];
    if (b && !b[7] && r >= a[0]) { const k = U.easeIO(U.clamp((r - a[0]) / (b[0] - a[0]))); return a.map((x, j) => U.lerp(x, b[j], k)); }
    const v = a.slice(), d = Math.max(0, r - a[0]), dk = a[8] == null ? 1 : a[8]; v[6] += d * 0.8 * dk; v[4] *= 1 - 0.005 * d * dk; return v;
  }
  function update(t, s, ctx) {
    const id = beatAt(t), r = rel(t, id), v = camState(id, r); if (!v) return; const c = ST[RES[id].st], cam = ctx.camera, a = v[6] * D2R;
    let lx = c[0] + v[1], ly = c[1] + v[2], lz = c[2] + v[3];
    /* comic page up: truck the rig sideways so the people sit on the free side of the frame (SC[id].rcPage = false for hand-made moves) */
    const pg = (R.pages || {})[id]; if (pg && SC[id].rcPage !== false) { let sh = 0; for (const q of pg) { const i = U.easeIO(U.clamp((r - q.t0 + 0.3) / 0.8)), o = q.t1 != null ? U.easeIO(U.clamp((r - q.t1) / 0.8)) : 0, v1 = (q.x - 0.5) * 1.04 * v[4] * i * (1 - o); if (Math.abs(v1) > Math.abs(sh)) sh = v1; }
      lx += Math.cos(a) * sh; lz -= Math.sin(a) * sh; } cam.position.set(lx + Math.sin(a) * v[4] + Math.sin(t * 0.5) * 0.08, ly + v[5] + Math.cos(t * 0.4) * 0.04, lz + Math.cos(a) * v[4]); cam.lookAt(lx, ly, lz);
    const sk = SC[id].shake; if (sk && r > sk[0] && r < sk[1]) { const q = 1 - (r - sk[0]) / (sk[1] - sk[0]); cam.position.x += Math.sin(t * 55) * (sk[2] || 0.1) * q; cam.position.y += Math.sin(t * 43) * (sk[2] || 0.1) * 0.8 * q; }
    cam.updateMatrixWorld(true); const p = s.anchorV;
    for (const b of BUB) { b.o.getWorldPosition(p); p.y += (b.dy || 2) * (b.o.scale.y || 1); p.project(cam); b.x = (p.x + 1) / 2 * ctx.W; b.y = (1 - p.y) / 2 * ctx.H; }
  }
  return { setup, hud, update, cam, act, prop, BO, ctext };
})();
if (EP.lt) Object.assign(LT, EP.lt);   /* per-film light levels per background, e.g. EP.lt = { night: [hemi, sun, sunColour] } */
BG.studio = ['#1c1836', '#7a3a5a']; LT.studio = [0.86, 0.85, '#ffe6c8']; ATMO.studio = ['#ffe0a0', 0.08, 0.12, 60, 0, '#ffe0b0', 0.8, '#ffb060', 0.05, 0.45];
