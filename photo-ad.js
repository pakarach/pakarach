/* Affiliate review clip template, "cute sticker" look: cream background, drifting paw prints (or stripes), white-framed photos,
   sticker titles, marimba/pop music. Real product photos + motion graphics only (no AI-generated imagery). 9:16.
   1) write a spec (see example-spec-cute.json)   2) python3 make-ad-data.py spec.json ad.json
   3) node build.js photo-ad.js out.html --kit fact --data ad=ad.json
   Scene types: hook {img,lines,sub} | feat {img,title,sub,note?} | proof {img,title,badges,stars?,note}
                variants {thumbs,title,sub} | price {img,label,price,note,cta,cw?}
   Every scene: d (seconds), optional cy (card centre y), kb [zoomFrom, zoomTo, focusX 0-1, focusY 0-1].
   Claims copied from the listing get "*" and a note; prices/sales always carry the capture date. */
(function () {
  const U = VE.u, cl = U.clamp, eo = U.easeOut, eb = U.easeBack, lerp = U.lerp;
  const seg = (t, a, b) => cl((t - a) / (b - a));
  const D = DATA.ad;
  const TH = Object.assign({ bg: ['#fff6dc', '#ffe3a6'], blob: ['#ffd56e', '#ffc9a3'], hi: '#ffd84d', red: '#ff4d5e', ink: '#2b1d0e', pattern: 'paw' }, D.theme || {});
  const COL = (k) => (k === 'white' ? '#ffffff' : TH[k] || k);
  const INK = TH.ink, BPM = D.bpm || 112, BEAT = 60 / BPM;
  const IM = {}; for (const k in D.imgs) { const i = new Image(); i.src = D.imgs[k].src; IM[k] = { img: i, w: D.imgs[k].w, h: D.imgs[k].h }; }
  const SC = D.scenes; let acc = 0; SC.forEach((s) => { s.t0 = acc; acc += s.d; s.t1 = acc; });
  const END = acc, DUR = +(END + 1.5).toFixed(2);

  /* ---------- music beds ---------- */
  VE.registerSfx('pluck', (t0, o) => { // cute marimba pop, F C Dm Bb
    const A = VE.audio, hz = VE.midiHz, bar = BEAT * 4, dur = o.dur || 20;
    const CH = [[65, 69, 72], [60, 64, 67], [62, 65, 69], [58, 62, 65]];
    for (let b = 0; b * bar < dur - 0.05; b++) {
      const t = t0 + b * bar, ch = CH[b % 4];
      for (let k = 0; k < 4; k++) {
        const tk = t + k * BEAT;
        if (k % 2 === 0) A.tone(tk, 100, 0.12, { f2: 50, vol: 0.26, rel: 0.05 });
        else A.noise(tk, 0.09, { type: 'bandpass', f: 1800, q: 1.2, vol: 0.1 });
        for (let h = 0; h < 4; h++) A.noise(tk + h * BEAT / 4, 0.02, { type: 'highpass', f: 9000, vol: h % 2 ? 0.012 : 0.022 });
        A.tone(tk, hz(ch[0] - 24), BEAT * 0.5, { type: 'triangle', vol: 0.12, rel: 0.08 });
      }
      const arp = [0, 1, 2, 1, 0, 2, 1, 2];
      arp.forEach((ix, i) => { const n = ch[ix] + 12, tk = t + i * BEAT / 2; A.tone(tk, hz(n), 0.18, { type: 'sine', vol: 0.06, rel: 0.16 }); A.tone(tk, hz(n + 12), 0.08, { type: 'triangle', vol: 0.012, rel: 0.06 }); });
    }
  });
  VE.registerSfx('popbeat', (t0, o) => { // upbeat pop, C G Am F
    const A = VE.audio, hz = VE.midiHz, bar = BEAT * 4, dur = o.dur || 18;
    const CH = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], BASS = [36, 43, 45, 41];
    for (let b = 0; b * bar < dur - 0.05; b++) {
      const t = t0 + b * bar, ch = CH[b % 4];
      for (let k = 0; k < 4; k++) {
        const tk = t + k * BEAT;
        A.tone(tk, 110, 0.14, { f2: 45, vol: 0.32, rel: 0.04 });
        if (k % 2) A.noise(tk, 0.12, { type: 'bandpass', f: 1500, q: 0.9, vol: 0.12 });
        for (let h = 0; h < 2; h++) A.noise(tk + h * BEAT / 2 + BEAT / 4, 0.03, { type: 'highpass', f: 8000, vol: 0.03 });
        A.tone(tk, hz(BASS[b % 4]), BEAT * 0.35, { type: 'triangle', vol: 0.12, rel: 0.05 });
      }
      [0, 1.5, 2.5, 3].forEach((bt) => ch.forEach((n) => A.tone(t + bt * BEAT, hz(n + 12), BEAT * 0.3, { type: 'square', vol: 0.016, rel: 0.08 })));
    }
  });
  VE.registerSfx('cash', (t) => { const A = VE.audio; A.noise(t, 0.12, { type: 'highpass', f: 3000, vol: 0.12 }); [2093, 2637].forEach((f, i) => A.tone(t + 0.08 + i * 0.07, f, 0.35, { vol: 0.09, rel: 0.4 })); });

  /* ---------- 2D helpers ---------- */
  function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
  function sticker(g, txt, x, y, size, bg, fg, rot, sc, a) {
    if (a <= 0 || sc <= 0.01) return;
    g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(rot); g.scale(sc, sc);
    g.font = '800 ' + size + 'px Kanit,sans-serif'; let w = g.measureText(txt).width; if (w > 900) { size *= 900 / w; g.font = '800 ' + size + 'px Kanit,sans-serif'; w = 900; }
    const pw = w + size * 0.7, ph = size * 1.35;
    g.fillStyle = 'rgba(0,0,0,.16)'; rr(g, -pw / 2 + 8, -ph / 2 + 10, pw, ph, size * 0.25); g.fill();
    g.fillStyle = bg; rr(g, -pw / 2, -ph / 2, pw, ph, size * 0.25); g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke();
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, 0, size * 0.06); g.restore();
  }
  function plain(g, txt, x, y, size, color, weight, a, maxW) {
    if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = (weight || 600) + ' ' + size + 'px Kanit,sans-serif';
    const w = g.measureText(txt).width, m = maxW || 940; if (w > m) { size *= m / w; g.font = (weight || 600) + ' ' + size + 'px Kanit,sans-serif'; }
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = color; g.fillText(txt, x, y); g.restore();
  }
  function note(g, txt, y, a) { // small claim/date footnote on a light pill so it reads on any background
    if (a <= 0 || !txt) return; g.save(); g.globalAlpha = a; g.font = '500 30px Kanit,sans-serif'; const w = Math.min(980, g.measureText(txt).width + 40);
    g.fillStyle = 'rgba(255,255,255,.85)'; rr(g, 540 - w / 2, y - 26, w, 52, 26); g.fill(); g.restore(); plain(g, txt, 540, y + 1, 30, INK, 500, a, 940);
  }
  function photo(g, key, kb, p, x, y, w, h, rot, a) { // white-framed photo with a slow Ken Burns zoom toward the focus point
    const I = IM[key]; if (!I || a <= 0 || !I.img.complete) return;
    const ar = w / h, iw = I.w, ih = I.h; let sw = iw, sh = iw / ar; if (sh > ih) { sh = ih; sw = ih * ar; }
    const z = lerp(kb ? kb[0] : 1, kb ? kb[1] : 1.05, p), fx = kb ? kb[2] : 0.5, fy = kb ? kb[3] : 0.5; sw /= z; sh /= z;
    const sx = cl(fx * iw - sw / 2, 0, iw - sw), sy = cl(fy * ih - sh / 2, 0, ih - sh);
    g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(rot);
    g.fillStyle = 'rgba(0,0,0,.2)'; rr(g, -w / 2 + 10, -h / 2 + 14, w, h, 28); g.fill();
    g.fillStyle = '#fff'; rr(g, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 34); g.fill(); g.lineWidth = 4; g.strokeStyle = INK; g.stroke();
    rr(g, -w / 2, -h / 2, w, h, 26); g.clip(); g.drawImage(I.img, sx, sy, sw, sh, -w / 2, -h / 2, w, h); g.restore();
  }
  function star(g, x, y, r, fill) {
    g.save(); g.translate(x, y); g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr2 = i % 2 ? r * 0.45 : r; g.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } g.closePath();
    g.fillStyle = '#fff'; g.fill(); g.save(); g.clip(); g.fillStyle = '#ffb400'; g.fillRect(-r, -r, 2 * r * fill, 2 * r); g.restore(); g.lineWidth = 4; g.strokeStyle = INK; g.stroke(); g.restore();
  }
  function paw(g, x, y, s, rot) {
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.beginPath(); g.ellipse(0, 10, 22, 18, 0, 0, 6.3); g.fill();
    [[-24, -14], [-9, -28], [9, -28], [24, -14]].forEach(([a, b]) => { g.beginPath(); g.ellipse(a, b, 8, 10, 0, 0, 6.3); g.fill(); }); g.restore();
  }
  const pulseAt = (t) => 1 + 0.035 * Math.max(0, Math.cos(((t % BEAT) / BEAT) * Math.PI * 2)) * (t % BEAT < BEAT * 0.25 ? 1 : 0);

  /* ---------- scene renderer ---------- */
  function cardOf(s) { const I = IM[s.img]; const w = s.cw || 980; let h = w * I.h / I.w; if (h > 900) h = 900; return [w, h, s.cy || 960]; }
  function drawScene(g, s, t, first, last) {
    const p = seg(t, s.t0, s.t1), pulse = pulseAt(t);
    const inK = seg(t, s.t0, s.t0 + 0.38), outK = last ? 0 : seg(t, s.t1 - 0.22, s.t1);
    const out = 1 - seg(t, s.t1 - 0.2, s.t1) * (last ? 0 : 1);
    let cardBottom = 0;
    if (s.img) {
      const [w, h, cy] = cardOf(s), dx = first ? 0 : (1 - eo(inK)) * 1150 - eo(outK) * 1250, dy = first ? (1 - eo(inK)) * 1000 : 0;
      photo(g, s.img, s.kb, p, 540 + dx, cy + dy, w, h, (first ? -0.03 : 0.07) * (1 - eo(inK)) - 0.06 * eo(outK), 1);
      cardBottom = cy + h / 2;
      if (D.photoNote && !outK) plain(g, D.photoNote, 540, cardBottom + 42, 26, 'rgba(43,29,14,.55)', 400, seg(t, s.t0 + 0.3, s.t0 + 0.6));
    }
    const T0 = s.t0;
    if (s.type === 'hook') {
      (s.lines || []).forEach(([txt, c], i) => sticker(g, txt, 540 + (i ? 20 : 0), 300 + i * 150, i ? 120 : 96, COL(c), INK, i ? 0.04 : -0.03, eb(seg(t, T0 + 0.15 + i * 0.4, T0 + 0.5 + i * 0.4)) * pulse, out));
      plain(g, s.sub, 540, 580, 46, INK, 600, seg(t, T0 + 1.0, T0 + 1.3) * out);
    }
    if (s.type === 'feat' || s.type === 'proof' || s.type === 'variants') {
      sticker(g, s.title, 540, 280, 92, s.type === 'proof' ? '#fff' : TH.hi, INK, -0.025, eb(seg(t, T0, T0 + 0.3)) * pulse, out);
      if (s.sub) plain(g, s.sub, 540, 388, 48, INK, 600, seg(t, T0 + 0.3, T0 + 0.6) * out);
    }
    if (s.type === 'proof') {
      if (s.stars) { const a = seg(t, T0 + 0.3, T0 + 0.6) * out; if (a > 0) { g.save(); g.globalAlpha = a; for (let i = 0; i < 5; i++) star(g, 330 + i * 80, 395, 32 * eb(seg(t, T0 + 0.3 + i * 0.06, T0 + 0.55 + i * 0.06)), cl(s.stars - i)); g.restore(); plain(g, String(s.stars), 790, 398, 60, INK, 800, a); } }
      (s.badges || []).forEach(([txt, c], i) => sticker(g, txt, 540, cardBottom + 110 + i * 105, i ? 50 : 66, COL(c), INK, i ? 0.02 : -0.025, eb(seg(t, T0 + 0.7 + i * 0.4, T0 + 1.0 + i * 0.4)), out));
    }
    if (s.type === 'variants') {
      s.thumbs.forEach((k, i) => { const a = eb(seg(t, T0 + 0.3 + i * 0.22, T0 + 0.65 + i * 0.22)); if (a <= 0) return; const x = 200 + i * 340, y = 900 + (i === 1 ? -40 : 30);
        g.save(); g.translate(x, y); g.rotate((i - 1) * 0.07); g.scale(a, a); g.translate(-x, -y); photo(g, k, [1, 1, 0.5, 0.5], 0, x, y, 290, 290, 0, out); g.restore();
        sticker(g, 'แบบ ' + (i + 1), x, y + 200 + (i === 1 ? -10 : 0), 40, '#fff', INK, (i - 1) * 0.05, a, out); });
    }
    if (s.type === 'price') {
      const a = eb(seg(t, T0 + 0.05, T0 + 0.4));
      sticker(g, s.label || 'ราคา', 540, 285, 64, '#fff', INK, -0.02, eb(seg(t, T0, T0 + 0.25)), 1);
      g.save(); g.translate(540, 470); g.rotate(-0.05 + 0.03 * Math.sin(t * 4)); g.scale(a * pulse, a * pulse);
      g.font = '800 140px Kanit,sans-serif'; let tw = g.measureText(s.price).width, fs = 140; if (tw > 780) { fs *= 780 / tw; tw = 780; g.font = '800 ' + fs + 'px Kanit,sans-serif'; }
      g.fillStyle = TH.red; rr(g, -tw / 2 - 50, -105, tw + 100, 210, 40); g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke();
      g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s.price, 0, 8); g.restore();
      note(g, s.note, 640, seg(t, T0 + 0.4, T0 + 0.7));
      const ca = seg(t, T0 + 0.9, T0 + 1.2), bob = 18 * Math.abs(Math.sin(t * 6));
      sticker(g, s.cta, 540, 1440, 76, TH.hi, INK, 0.02, eb(ca) * pulse, 1);
      if (ca > 0) { g.save(); g.globalAlpha = ca; g.translate(200, 1545 + bob); g.rotate(0.5); g.fillStyle = INK; g.beginPath(); g.moveTo(0, 70); g.lineTo(-45, 0); g.lineTo(-16, 0); g.lineTo(-16, -60); g.lineTo(16, -60); g.lineTo(16, 0); g.lineTo(45, 0); g.closePath(); g.fill(); g.restore(); }
    } else if (s.note) note(g, s.note, s.type === 'proof' ? cardBottom + 330 : 1440, seg(t, T0 + 0.4, T0 + 0.7) * out);
  }

  /* ---------- audio cues per scene ---------- */
  const AUD = [[0, D.music || 'pluck', { dur: END }]];
  SC.forEach((s, i) => {
    AUD.push([Math.max(0, s.t0 - 0.05), 'whoosh'], [s.t0 + 0.15, 'pop']);
    if (s.type === 'hook') AUD.push([s.t0 + 0.55, 'pop']);
    if (s.type === 'proof') (s.badges || []).forEach((b, j) => AUD.push([s.t0 + 0.7 + j * 0.4, 'pop']));
    if (s.type === 'variants') s.thumbs.forEach((b, j) => AUD.push([s.t0 + 0.3 + j * 0.22, 'pop']));
    if (s.type === 'price') AUD.push([s.t0 + 0.1, 'cash'], [s.t0 + 0.9, 'boing']);
  });

  VE.run({
    DUR, file: D.file || 'review-clip', title: D.title || 'review clip', brand: D.brand, vignette: 'rgba(0,0,0,0)',
    setup() { return {}; }, update() {},
    bgAt: () => TH.bg,
    hud(g, t) {
      g.save(); g.globalAlpha = 0.9; g.fillStyle = TH.blob[0]; g.beginPath(); g.arc(940 + 30 * Math.sin(t * 0.7), 420, 300, 0, 6.3); g.fill();
      g.fillStyle = TH.blob[1]; g.beginPath(); g.arc(120 + 25 * Math.cos(t * 0.6), 1500, 340, 0, 6.3); g.fill(); g.restore();
      g.save(); g.globalAlpha = 0.07; g.fillStyle = INK;
      if (TH.pattern === 'paw') for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) { const y = ((r * 260 - t * 30) % 2340 + 2340) % 2340 - 210; paw(g, 110 + c * 215 + (r % 2) * 100, y, 1.1, (r + c) % 2 ? 0.4 : -0.3); }
      else { g.strokeStyle = INK; g.lineWidth = 3; for (let i = -20; i < 40; i++) { const o = (t * 40) % 60; g.beginPath(); g.moveTo(i * 60 + o, 0); g.lineTo(i * 60 + o - 600, 1920); g.stroke(); } }
      g.restore();
      SC.forEach((s, i) => { if (t >= s.t0 && t < s.t1) drawScene(g, s, t, i === 0, i === SC.length - 1); });
    },
    caps: [], trans: [], audio: AUD, bed: [],
  });
})();
