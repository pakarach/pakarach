/* Affiliate review clip template, "epic launch" look: dark stage, light rays, glowing framed photos with floor reflection,
   gold count-up numbers, flash cuts, trailer-style music. Real product photos + motion graphics only (no AI imagery). 9:16.
   Same spec/data format as photo-ad.js (see example-spec-epic.json):  python3 make-ad-data.py spec.json ad.json
   node build.js photo-ad-epic.js out.html --kit fact --data ad=ad.json
   Scene types: hook {img,lines[2],sub} | feat {img,title,sub?,big?{n,suffix,label},fx?:'swirl'|'gauge',gauge?{n,unit},grid?[4],extra?,rows?[],note?}
                proof {img,title,stars,badge,note} | price {img,label,price,note,cta}
   Every scene: d, cw (card width), cy (card centre y), kb [zoomFrom, zoomTo, focusX, focusY]. */
(function () {
  const U = VE.u, cl = U.clamp, eo = U.easeOut, eb = U.easeBack, eio = U.easeIO, lerp = U.lerp;
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const D = DATA.ad;
  const TH = Object.assign({ bg: ['#04060c', '#0d1830'], cyan: '#5fd4ff', gold: '#ffc23d', white: '#ffffff' }, D.theme || {});
  const BPM = D.bpm || 120, BEAT = 60 / BPM;
  const IM = {}; for (const k in D.imgs) { const i = new Image(); i.src = D.imgs[k].src; IM[k] = { img: i, w: D.imgs[k].w, h: D.imgs[k].h }; }
  const SC = D.scenes; let acc = 0; SC.forEach((s) => { s.t0 = acc; acc += s.d; s.t1 = acc; if (s.reflect == null) s.reflect = !(s.big || s.grid || s.rows || s.extra || s.badge || s.type === 'price'); });
  const END = acc, DUR = +(END + 1.5).toFixed(2);

  /* ---------- music: trailer-style drive in A minor (Am F C G) ---------- */
  VE.registerSfx('epic', (t0, o) => {
    const A = VE.audio, hz = VE.midiHz, bar = BEAT * 4, dur = o.dur || 24;
    const CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], ROOT = [33, 29, 36, 31];
    for (let b = 0; b * bar < dur - 0.05; b++) {
      const t = t0 + b * bar, ch = CH[b % 4], r = ROOT[b % 4], late = b >= 2;
      ch.forEach((n) => { A.tone(t, hz(n), bar, { type: 'sine', vol: 0.03, att: 0.4, rel: 0.5 }); A.tone(t, hz(n + 12), bar, { type: 'triangle', vol: 0.008, att: 0.6, rel: 0.4 }); });
      for (let k = 0; k < 8; k++) { const tk = t + k * BEAT / 2; A.tone(tk, hz(r + 12), BEAT * 0.42, { type: 'sawtooth', vol: 0.035, rel: 0.05 }); A.tone(tk, hz(r), BEAT * 0.45, { type: 'triangle', vol: 0.14, rel: 0.05 }); }
      [0, 1.5, 2.5].forEach((bt) => A.tone(t + bt * BEAT, 70, 0.3, { f2: 38, vol: 0.42, rel: 0.2 }));
      [1, 3].forEach((bt) => { A.noise(t + bt * BEAT, 0.22, { type: 'bandpass', f: 1300, q: 0.7, vol: 0.16 }); A.tone(t + bt * BEAT, 190, 0.12, { f2: 120, vol: 0.12 }); });
      for (let k = 0; k < 16; k++) A.noise(t + k * BEAT / 4, 0.025, { type: 'highpass', f: 8500, vol: k % 4 === 2 ? 0.035 : 0.014 });
      if (late) for (let k = 0; k < 16; k++) { const n = ch[k % 3] + 24; A.tone(t + k * BEAT / 4, hz(n), BEAT * 0.2, { type: 'square', vol: 0.011, rel: 0.05 }); }
    }
  });
  VE.registerSfx('boom', (t) => { const A = VE.audio; A.tone(t, 62, 1.1, { f2: 28, vol: 0.55, rel: 0.9 }); A.noise(t, 0.7, { type: 'lowpass', f: 900, f2: 120, vol: 0.22 }); A.noise(t, 0.08, { type: 'highpass', f: 3000, vol: 0.1 }); });
  VE.registerSfx('braam', (t) => { const A = VE.audio, hz = VE.midiHz; [33, 40, 45].forEach((n) => A.tone(t, hz(n), 1.8, { type: 'sawtooth', vol: 0.07, att: 0.06, rel: 1.2 })); A.tone(t, 55, 1.6, { f2: 32, vol: 0.4, rel: 1.2 }); });
  VE.registerSfx('cash', (t) => { const A = VE.audio; A.noise(t, 0.12, { type: 'highpass', f: 3000, vol: 0.12 }); [2093, 2637, 3136].forEach((f, i) => A.tone(t + 0.08 + i * 0.07, f, 0.4, { vol: 0.08, rel: 0.4 })); });

  /* ---------- helpers ---------- */
  function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
  function fitFont(g, txt, size, weight, maxW) { g.font = weight + ' ' + size + 'px Kanit,sans-serif'; const w = g.measureText(txt).width; if (w > maxW) { size *= maxW / w; g.font = weight + ' ' + size + 'px Kanit,sans-serif'; } return size; }
  function glowText(g, txt, x, y, size, color, glow, weight, a, maxW, align) {
    if (a <= 0) return; g.save(); g.globalAlpha = a; fitFont(g, txt, size, weight || 800, maxW || 960); g.textAlign = align || 'center'; g.textBaseline = 'middle';
    g.shadowColor = glow || 'rgba(95,212,255,.55)'; g.shadowBlur = 28; g.fillStyle = color; g.fillText(txt, x, y); g.shadowBlur = 0; g.fillText(txt, x, y); g.restore();
  }
  function goldText(g, txt, x, y, size, a, sc, maxW, align) {
    if (a <= 0) return; g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(sc || 1, sc || 1);
    const s = fitFont(g, txt, size, 800, maxW || 960); g.textAlign = align || 'center'; g.textBaseline = 'middle';
    const gr = g.createLinearGradient(0, -s / 2, 0, s / 2); gr.addColorStop(0, '#fff6c9'); gr.addColorStop(0.45, TH.gold); gr.addColorStop(1, '#ff8a00');
    g.shadowColor = 'rgba(255,170,30,.6)'; g.shadowBlur = 40; g.fillStyle = gr; g.fillText(txt, 0, 0); g.shadowBlur = 0; g.fillText(txt, 0, 0); g.restore();
  }
  function wipeTitle(g, txt, y, size, t0, t, a) { // title revealed by a left-to-right light wipe
    if (a <= 0) return; const p = eo(seg(t, t0, t0 + 0.45)); if (p <= 0) return;
    g.save(); g.beginPath(); g.rect(0, y - size, 60 + p * 1020, size * 2); g.clip(); glowText(g, txt, 540, y, size, '#fff', null, 800, a, 980); g.restore();
    if (p < 1) { g.save(); g.globalCompositeOperation = 'lighter'; const x = 60 + p * 1020, gr = g.createLinearGradient(x - 80, 0, x + 20, 0); gr.addColorStop(0, 'rgba(95,212,255,0)'); gr.addColorStop(1, 'rgba(180,240,255,.9)'); g.fillStyle = gr; g.fillRect(x - 80, y - size * 0.7, 100, size * 1.4); g.restore(); }
  }
  function glass(g, x, y, w, h, a, gold) {
    g.save(); g.globalAlpha = a; g.fillStyle = gold ? 'rgba(255,194,61,.14)' : 'rgba(255,255,255,.07)'; rr(g, x, y, w, h, 18); g.fill();
    g.strokeStyle = gold ? 'rgba(255,194,61,.9)' : 'rgba(95,212,255,.7)'; g.lineWidth = 2.5; g.shadowColor = gold ? 'rgba(255,194,61,.6)' : 'rgba(95,212,255,.5)'; g.shadowBlur = 16; g.stroke(); g.restore();
  }
  function note(g, txt, y, a) { if (txt) glowText(g, txt, 540, y, 30, 'rgba(225,240,255,.85)', 'rgba(0,0,0,0)', 400, a, 980); }
  function star(g, x, y, r, fill) {
    g.save(); g.translate(x, y); g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.45 : r; g.lineTo(Math.cos(a) * q, Math.sin(a) * q); } g.closePath();
    g.fillStyle = 'rgba(255,255,255,.15)'; g.fill(); g.save(); g.clip(); g.fillStyle = TH.gold; g.shadowColor = TH.gold; g.shadowBlur = 20; g.fillRect(-r, -r, 2 * r * fill, 2 * r); g.restore(); g.restore();
  }

  const REF = { c: document.createElement('canvas') };
  /* photo card: glowing frame, slow Ken Burns, light sheen, floor reflection */
  function card(g, s, t, enter, exit) {
    const I = IM[s.img]; if (!I || !I.img.complete) return null;
    const w = s.cw || 800; let h = w * I.h / I.w; if (h > 760) h = 760;
    const cx = 540, cy = s.cy || 880, p = seg(t, s.t0, s.t1), kb = s.kb || [1, 1.05, 0.5, 0.5];
    const ar = w / h; let sw = I.w, sh = I.w / ar; if (sh > I.h) { sh = I.h; sw = I.h * ar; }
    const z = lerp(kb[0], kb[1], p); sw /= z; sh /= z;
    const sx = cl(kb[2] * I.w - sw / 2, 0, I.w - sw), sy = cl(kb[3] * I.h - sh / 2, 0, I.h - sh);
    const sc = lerp(1.22, 1, eo(enter)) * lerp(1, 1.3, eio(exit)), a = eo(enter) * (1 - exit);
    if (a <= 0) return null;
    g.save(); g.globalAlpha = a; g.translate(cx, cy); g.scale(sc, sc);
    if (enter < 1) g.filter = 'blur(' + ((1 - eo(enter)) * 16).toFixed(1) + 'px)';
    // reflection
    if (s.reflect) { // mirrored copy that fades out, drawn through an offscreen mask so no box edge shows
      const rh = Math.round(h * 0.4), oc = REF.c; oc.width = Math.round(w); oc.height = rh; const o = oc.getContext('2d');
      o.clearRect(0, 0, w, rh); o.save(); o.translate(0, rh); o.scale(1, -1); o.translate(0, -(h - rh)); o.drawImage(I.img, sx, sy, sw, sh, 0, 0, w, h); o.restore();
      o.globalCompositeOperation = 'destination-in'; const m = o.createLinearGradient(0, 0, 0, rh); m.addColorStop(0, 'rgba(0,0,0,.32)'); m.addColorStop(1, 'rgba(0,0,0,0)'); o.fillStyle = m; o.fillRect(0, 0, w, rh); o.globalCompositeOperation = 'source-over';
      g.drawImage(oc, -w / 2, h / 2 + 14);
    }
    // glow + image
    g.shadowColor = 'rgba(95,212,255,.45)'; g.shadowBlur = 70; g.fillStyle = '#0b1324'; rr(g, -w / 2, -h / 2, w, h, 30); g.fill(); g.shadowBlur = 0;
    g.save(); rr(g, -w / 2, -h / 2, w, h, 30); g.clip(); g.drawImage(I.img, sx, sy, sw, sh, -w / 2, -h / 2, w, h);
    const sp = seg(t, s.t0 + 0.35, s.t0 + 1.25); // light sweep across the photo
    if (sp > 0 && sp < 1) { g.globalCompositeOperation = 'lighter'; const x = lerp(-w, w, sp), gr = g.createLinearGradient(x - 120, -h / 2, x + 120, h / 2); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h); }
    g.restore();
    const bd = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); bd.addColorStop(0, TH.cyan); bd.addColorStop(0.5, 'rgba(255,255,255,.9)'); bd.addColorStop(1, TH.gold);
    g.strokeStyle = bd; g.lineWidth = 4; rr(g, -w / 2, -h / 2, w, h, 30); g.stroke();
    g.restore();
    if (D.photoNote && exit === 0) glowText(g, D.photoNote, cx, cy + h / 2 + 34, 24, 'rgba(200,220,255,.55)', 'rgba(0,0,0,0)', 400, seg(t, s.t0 + 0.4, s.t0 + 0.8), 900);
    return { cx, cy, w, h, top: cy - h / 2, bottom: cy + h / 2 };
  }

  /* effects */
  function swirl(g, c, t, a) {
    if (!c || a <= 0) return; g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = a; g.translate(c.cx, c.cy);
    for (let k = 0; k < 3; k++) {
      g.save(); g.rotate(-0.35 + k * 0.35); g.beginPath(); g.ellipse(0, 0, c.w * 0.62 + k * 26, c.h * 0.2 + k * 18, 0, 0, Math.PI * 2);
      g.setLineDash([150, 90]); g.lineDashOffset = -t * (420 + k * 90); g.lineWidth = 5 - k; g.strokeStyle = k === 1 ? 'rgba(255,214,120,.8)' : 'rgba(110,220,255,.85)'; g.shadowColor = TH.cyan; g.shadowBlur = 24; g.stroke(); g.restore();
    }
    for (let i = 0; i < 28; i++) { const ang = t * 2.4 + i * 0.224 * Math.PI, rx = c.w * 0.64, ry = c.h * 0.22, rot = -0.35 + (i % 3) * 0.35, x0 = Math.cos(ang) * rx, y0 = Math.sin(ang) * ry;
      const x = x0 * Math.cos(rot) - y0 * Math.sin(rot), y = x0 * Math.sin(rot) + y0 * Math.cos(rot); g.fillStyle = 'rgba(200,245,255,.9)'; g.beginPath(); g.arc(x, y, 3 + (i % 3), 0, 6.3); g.fill(); }
    g.restore();
  }
  function gauge(g, x, y, r, prog, n, unit, a) {
    if (a <= 0) return; g.save(); g.globalAlpha = a;
    g.fillStyle = 'rgba(6,10,22,.82)'; g.beginPath(); g.arc(x, y, r + 16, 0, 6.3); g.fill();
    g.lineWidth = 16; g.strokeStyle = 'rgba(255,255,255,.12)'; g.beginPath(); g.arc(x, y, r, 0, 6.3); g.stroke();
    g.strokeStyle = TH.gold; g.lineCap = 'round'; g.shadowColor = TH.gold; g.shadowBlur = 24; g.beginPath(); g.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2); g.stroke(); g.restore();
    goldText(g, String(Math.round(n * prog)), x, y - 12, r * 0.95, a); glowText(g, unit, x, y + r * 0.5, r * 0.3, '#fff', null, 600, a);
  }
  function rays(g, x, y, t, a, color, n) {
    if (a <= 0) return; g.save(); g.globalCompositeOperation = 'lighter'; g.translate(x, y); g.rotate(t * 0.08);
    for (let i = 0; i < n; i++) { g.rotate((Math.PI * 2) / n); const gr = g.createLinearGradient(0, 0, 0, -1500); gr.addColorStop(0, color.replace('A', (0.16 * a).toFixed(3))); gr.addColorStop(1, color.replace('A', '0')); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.lineTo(-70, -1500); g.lineTo(70, -1500); g.closePath(); g.fill(); }
    g.restore();
  }

  /* ---------- scene renderer ---------- */
  function drawScene(g, s, t, first, last) {
    const T0 = s.t0, enter = seg(t, T0 + (s.type === 'hook' ? 0.9 : 0), T0 + (s.type === 'hook' ? 1.5 : 0.45)), exit = last ? 0 : seg(t, s.t1 - 0.25, s.t1);
    const out = 1 - exit;
    const c = s.img ? card(g, s, t, enter, exit) : null;
    if (s.type === 'hook') {
      glowText(g, s.lines[0], 540, 290, 78, '#fff', null, 700, eo(seg(t, T0 + 0.15, T0 + 0.5)) * out);
      goldText(g, s.lines[1], 540, 420, 128, seg(t, T0 + 0.55, T0 + 0.75) * out, lerp(1.6, 1, eo(seg(t, T0 + 0.55, T0 + 0.85))));
      glowText(g, s.sub, 540, 548, 50, '#cfefff', null, 600, seg(t, T0 + 1.5, T0 + 1.8) * out);
    }
    if (s.type === 'feat' || s.type === 'proof') wipeTitle(g, s.title, 270, 82, T0 + 0.1, t, out);
    if (s.sub && s.type !== 'hook') glowText(g, s.sub, 540, 372, 46, '#cfefff', null, 500, seg(t, T0 + 0.45, T0 + 0.75) * out, 960);
    if (s.big && c) {
      const k = eo(seg(t, T0 + 0.5, T0 + 1.3)), a = seg(t, T0 + 0.5, T0 + 0.7) * out, y = c.bottom + 175;
      glowText(g, s.big.label, 540, y - 92, 36, '#cfefff', null, 500, a);
      goldText(g, Math.round(s.big.n * k) + s.big.suffix, 540, y, 150, a, 1 + 0.12 * (1 - eo(seg(t, T0 + 1.3, T0 + 1.6))) * (t > T0 + 1.3 ? 1 : 0));
    }
    if (s.fx === 'swirl') swirl(g, c, t, seg(t, T0 + 0.3, T0 + 0.8) * out);
    if (s.fx === 'gauge' && c) gauge(g, c.cx + c.w / 2 - 90, c.bottom - 40, 120, eio(seg(t, T0 + 0.5, T0 + 1.8)), s.gauge.n, s.gauge.unit, eb(seg(t, T0 + 0.4, T0 + 0.7)) * out);
    if (s.grid && c) s.grid.forEach((txt, i) => {
      const a = eo(seg(t, T0 + 0.6 + i * 0.15, T0 + 0.9 + i * 0.15)) * out, x = i % 2 ? 550 : 90, y = c.bottom + 60 + Math.floor(i / 2) * 112;
      if (a <= 0) return; g.save(); g.translate(0, (1 - a) * 30); glass(g, x, y, 440, 92, a); g.restore();
      g.save(); g.globalAlpha = a; g.fillStyle = TH.cyan; g.shadowColor = TH.cyan; g.shadowBlur = 14; g.beginPath(); g.arc(x + 46, y + 46 + (1 - a) * 30, 10, 0, 6.3); g.fill(); g.restore();
      glowText(g, txt, x + 250, y + 48 + (1 - a) * 30, 44, '#fff', null, 600, a, 330);
    });
    if (s.extra && c) {
      const a = eb(seg(t, T0 + (s.grid ? 1.4 : 0.7), T0 + (s.grid ? 1.75 : 1.05))) * out, y = c.bottom + (s.grid ? 345 : 120);
      if (a > 0) { g.save(); g.translate(540, y); g.scale(a, a); glass(g, -420, -48, 840, 96, 1, true); g.restore(); goldText(g, s.extra, 540, y + 2, 46, cl(a), 1, 780); }
    }
    if (s.rows && c) s.rows.forEach((txt, i) => {
      const a = eo(seg(t, T0 + 0.5 + i * 0.35, T0 + 0.85 + i * 0.35)) * out, y = c.bottom + 70 + i * 112, x = 90 - (1 - a) * 80;
      if (a <= 0) return; glass(g, x, y, 900, 92, a);
      g.save(); g.globalAlpha = a; g.strokeStyle = TH.gold; g.lineWidth = 6; g.lineCap = 'round'; g.shadowColor = TH.gold; g.shadowBlur = 12; g.beginPath(); g.moveTo(x + 34, y + 48); g.lineTo(x + 50, y + 63); g.lineTo(x + 76, y + 32); g.stroke(); g.restore();
      glowText(g, txt, x + 110, y + 48, 42, '#fff', null, 600, a, 760, 'left');
    });
    if (s.type === 'proof' && c) {
      const a = seg(t, T0 + 0.4, T0 + 0.7) * out;
      for (let i = 0; i < 5; i++) { const k = eb(seg(t, T0 + 0.4 + i * 0.08, T0 + 0.7 + i * 0.08)); if (k > 0) star(g, 300 + i * 92, 385, 38 * k, cl(s.stars - i)); }
      goldText(g, String(s.stars), 830, 388, 84, a);
      const b = eb(seg(t, T0 + 1.0, T0 + 1.35)) * out; if (b > 0) { g.save(); g.translate(540, c.bottom + 120); g.scale(b, b); glass(g, -360, -56, 720, 112, 1, true); g.restore(); goldText(g, s.badge, 540, c.bottom + 122, 64, cl(b), 1, 660); }
    }
    if (s.type === 'price') {
      rays(g, 540, 470, t, seg(t, T0, T0 + 0.6), 'rgba(255,194,61,A)', 14);
      glowText(g, s.label, 540, 290, 56, '#fff', null, 600, seg(t, T0 + 0.05, T0 + 0.3));
      const k = eb(seg(t, T0 + 0.1, T0 + 0.5)); goldText(g, s.price, 540, 440, 190, cl(k * 2), Math.max(0.01, k) * (1 + 0.03 * Math.sin(t * 5)), 960);
      note(g, s.note, 575, seg(t, T0 + 0.5, T0 + 0.8));
      const ca = eb(seg(t, T0 + 0.9, T0 + 1.25)), pulse = 0.5 + 0.5 * Math.sin(t * 6);
      if (ca > 0) {
        g.save(); g.translate(540, 1440); g.scale(ca, ca); g.fillStyle = TH.gold; g.shadowColor = TH.gold; g.shadowBlur = 30 + 30 * pulse; rr(g, -300, -58, 600, 116, 58); g.fill(); g.restore();
        g.save(); g.globalAlpha = cl(ca); g.font = '800 60px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#1a1205'; g.fillText(s.cta, 540, 1444); g.restore();
        const bob = 18 * Math.abs(Math.sin(t * 6)); g.save(); g.globalAlpha = cl(ca); g.translate(170, 1560 + bob); g.rotate(0.5); g.fillStyle = TH.gold; g.shadowColor = TH.gold; g.shadowBlur = 20; g.beginPath(); g.moveTo(0, 70); g.lineTo(-45, 0); g.lineTo(-16, 0); g.lineTo(-16, -60); g.lineTo(16, -60); g.lineTo(16, 0); g.lineTo(45, 0); g.closePath(); g.fill(); g.restore();
      }
    } else if (s.note && c) note(g, s.note, Math.min(1480, c.bottom + (s.grid ? 440 : s.rows ? 70 + s.rows.length * 112 + 40 : s.extra || s.badge ? 225 : 120)), seg(t, T0 + 0.6, T0 + 0.9) * out);
    // flash cut on every scene change
    const f = 1 - seg(t, T0, T0 + 0.22); if (!first && f > 0) { g.save(); g.globalAlpha = f * 0.75; g.fillStyle = '#eaf8ff'; g.fillRect(0, 0, 1080, 1920); g.restore(); }
  }

  /* ---------- audio cues ---------- */
  const AUD = [[0, 'braam'], [0.55, 'boom'], [1.0, 'riser', { dur: 0.5 }], [1.5, D.music || 'epic', { dur: END - 1.5 }]];
  SC.forEach((s, i) => {
    if (i) AUD.push([s.t0 - 0.3, 'whoosh', { dur: 0.35 }], [s.t0, 'boom']);
    if (s.big) AUD.push([s.t0 + 0.5, 'riser', { dur: 0.8 }], [s.t0 + 1.3, 'pop']);
    if (s.grid) s.grid.forEach((x, j) => AUD.push([s.t0 + 0.6 + j * 0.15, 'tick']));
    if (s.rows) s.rows.forEach((x, j) => AUD.push([s.t0 + 0.5 + j * 0.35, 'tick']));
    if (s.extra) AUD.push([s.t0 + (s.grid ? 1.4 : 0.7), 'shimmer']);
    if (s.type === 'proof') AUD.push([s.t0 + 1.0, 'shimmer']);
    if (s.type === 'price') AUD.push([s.t0 + 0.12, 'cash'], [s.t0 + 0.9, 'boing']);
  });

  /* ---------- background: dark stage, rotating light rays, rising particles ---------- */
  const P = Array.from({ length: 90 }, (_, i) => ({ x: (i * 397) % 1080, y: (i * 733) % 1920, v: 20 + (i * 37) % 60, r: 1 + (i % 4) * 0.8, ph: i * 1.7 }));
  VE.run({
    DUR, file: D.file || 'review-clip', title: D.title || 'review clip', brand: D.brand, vignette: 'rgba(0,0,0,0)',
    setup() { return {}; }, update() {},
    bgAt: () => TH.bg,
    hud(g, t) {
      const intro = eo(seg(t, 0, 0.9));
      rays(g, 540, -120, t, 0.9 * intro, 'rgba(120,200,255,A)', 11);
      const sp = g.createRadialGradient(540, 900, 50, 540, 900, 900); sp.addColorStop(0, 'rgba(60,110,190,' + (0.35 * intro).toFixed(3) + ')'); sp.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = sp; g.fillRect(0, 0, 1080, 1920);
      g.save(); g.globalCompositeOperation = 'lighter';
      for (const p of P) { const y = ((p.y - t * p.v) % 1920 + 1920) % 1920, a = (0.25 + 0.25 * Math.sin(t * 2 + p.ph)) * intro; g.fillStyle = 'rgba(170,220,255,' + a.toFixed(3) + ')'; g.beginPath(); g.arc(p.x + Math.sin(t * 0.7 + p.ph) * 12, y, p.r, 0, 6.3); g.fill(); }
      g.restore();
      const sh = SC.reduce((m, s, i) => (i && t >= s.t0 && t < s.t0 + 0.25 ? (1 - (t - s.t0) / 0.25) * 10 : m), 0);
      g.save(); if (sh) g.translate(Math.sin(t * 90) * sh, Math.cos(t * 70) * sh);
      SC.forEach((s, i) => { if (t >= s.t0 && t < s.t1) drawScene(g, s, t, i === 0, i === SC.length - 1); });
      g.restore();
      const vg = g.createRadialGradient(540, 960, 600, 540, 960, 1250); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); g.fillStyle = vg; g.fillRect(0, 0, 1080, 1920);
    },
    caps: [], trans: [], audio: AUD, bed: [],
  });
})();
