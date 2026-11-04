/* kit-cine v1.0 (Nov 2026): point-by-point presenter for cinematic-minimal briefing decks (see docs/cine-briefing.md, example-cine.js).
   cover → agenda → per scene: play it, then explanation points one per click (right panel over the scene) → chapter recap → … → confirmed vs unknown → sources.
   Keys: → / PageDown / Space / Enter / click = next · ← / PageUp / Backspace = back · R = replay scene · F = fullscreen · Home = start. */
(function () {
  window.__PV_ON = true;
  /* content comes from window.DECK (set by the video file):
     { kicker, chapters:[{n,name,sub,beats:[beatIds],recap:[lines]}], beatNames:{id:label}, points:{beatId:[{head,title,compact,items:[[t,body]],note}]},
       figs:{'beat:panel:item': svg}, fx:{'beat:panel:item': fxId}, final:{title, cols:[[[heading,[items],red?],...],...]} } */
  const css = `
  .pv-stage{display:flex;justify-content:center}
  .pv-wrap{position:relative;width:min(96vw,calc(84vh*16/9),1600px);aspect-ratio:16/9;container-type:inline-size;border-radius:8px;overflow:hidden;background:#000}
  .pv-wrap canvas{width:100%!important;height:100%!important;max-width:none!important;display:block;border-radius:0!important;cursor:pointer}
  .pv-stage:fullscreen{background:#000;align-items:center}
  .pv-stage:fullscreen .pv-wrap{width:min(100vw,calc(100vh*16/9));border-radius:0}
  .pv-side,.pv-full{position:absolute;opacity:0;pointer-events:none;transition:opacity .45s ease;font-family:"IBM Plex Sans Thai",Kanit,sans-serif;color:#1c1e22;cursor:pointer}
  .pv-side.on,.pv-full.on{opacity:1;pointer-events:auto}
  .pv-side{top:0;right:0;bottom:0;width:52%;background:linear-gradient(to left,rgba(232,228,221,.96) 0%,rgba(232,228,221,.92) 58%,rgba(232,228,221,0) 100%)}
  .pv-in{position:absolute;left:27%;right:6.5%;top:25%;bottom:10%;display:flex;flex-direction:column;gap:1.05cqw}
  .pv-kick{font-size:.95cqw;letter-spacing:.16cqw;color:#b8862f;font-weight:500}
  .pv-tt{font-size:1.85cqw;font-weight:300;line-height:1.3;margin-bottom:.3cqw}
  .pv-pt{display:grid;grid-template-columns:2.6cqw 1fr;column-gap:.6cqw;border-top:1px solid rgba(28,30,34,.2);padding-top:.75cqw;display:none}
  .pv-pt.on{display:grid;animation:pvIn .45s ease}
  @keyframes pvIn{from{opacity:0;transform:translateY(.7cqw)}to{opacity:1;transform:none}}
  .pv-pt.past{padding-top:.45cqw}.pv-pt.past span,.pv-pt.past .pv-figbox{display:none}.pv-pt.past b{font-size:1.15cqw;font-weight:400;color:#77746d}.pv-pt.past em{color:#c9b48a}
  .pv-figbox:empty{display:none}.pv-figbox{margin-top:.7cqw}
  .pv-fig{width:100%;height:auto;display:block;overflow:visible;font-family:"IBM Plex Sans Thai",Kanit,sans-serif}
  .pv-fig .d{stroke-dasharray:1;stroke-dashoffset:1;animation:pvDraw .8s ease forwards}
  .pv-fig .f{opacity:0;animation:pvFade .45s ease forwards}
  @keyframes pvDraw{to{stroke-dashoffset:0}}@keyframes pvFade{to{opacity:1}}
  .pv-pt em{font-style:normal;font-size:1.0cqw;font-weight:500;color:#b8862f;letter-spacing:.12cqw;padding-top:.2cqw}
  .pv-pt b{display:block;font-size:1.42cqw;font-weight:500;line-height:1.35}
  .pv-pt span{display:block;font-size:1.18cqw;font-weight:300;line-height:1.55;color:#4e4c47;margin-top:.15cqw}
  .pv-in.compact{gap:.7cqw}.pv-in.compact .pv-pt{padding-top:.5cqw}.pv-in.compact .pv-pt b{font-size:1.3cqw}.pv-in.compact .pv-pt span{font-size:1.1cqw;line-height:1.4}
  .pv-note{font-size:1.1cqw;color:#b3242f;border-left:2px solid #b3242f;padding:.15cqw 0 .15cqw .8cqw;line-height:1.45;display:none}
  .pv-note.on{display:block;animation:pvIn .45s ease}
  .pv-full{inset:0;background:rgba(232,228,221,.93);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .pv-fin{position:absolute;left:18.75%;right:14%;top:17%;bottom:10%}
  .pv-fk{font-size:1.05cqw;letter-spacing:.2cqw;color:#b8862f;font-weight:500}
  .pv-ft{font-size:3.0cqw;font-weight:300;margin:.6cqw 0 2.2cqw;line-height:1.2}
  .pv-row{display:grid;grid-template-columns:4.2cqw 1fr;align-items:baseline;border-top:1px solid rgba(28,30,34,.18);padding:1.05cqw 0 .95cqw;opacity:0;transform:translateX(.8cqw);transition:opacity .5s ease,transform .5s ease}
  .pv-full.on .pv-row{opacity:1;transform:none}
  .pv-row em{font-style:normal;font-size:1.15cqw;font-weight:500;color:#b8862f;letter-spacing:.15cqw}
  .pv-row b{font-size:1.95cqw;font-weight:300;line-height:1.35}
  .pv-row b small{display:block;font-size:1.1cqw;color:#8b877f;font-weight:300;margin-top:.2cqw}
  .pv-agenda{top:11%!important}.pv-agenda .pv-ft{margin-bottom:1.3cqw}.pv-agenda .pv-row{padding:.55cqw 0 .45cqw}.pv-agenda .pv-row b{font-size:1.55cqw}.pv-agenda .pv-row b small{font-size:1.0cqw;margin-top:0}
  .pv-vcols{display:grid;grid-template-columns:1fr 1fr;gap:4cqw}
  .pv-vh{font-size:1.0cqw;font-weight:500;color:#b8862f;letter-spacing:.14cqw;border-top:1px solid rgba(28,30,34,.22);padding-top:.7cqw;margin:1.2cqw 0 .6cqw}
  .pv-vl{margin:0;padding:0;list-style:none}
  .pv-vl li{font-size:1.3cqw;font-weight:300;line-height:1.5;padding-left:1.3cqw;position:relative;margin:.3cqw 0}
  .pv-vl li:before{content:"";position:absolute;left:0;top:.95cqw;width:.6cqw;height:1px;background:#b8862f}
  .pv-vl.red li:before{background:#b3242f}.pv-vl.red li{color:#b3242f}
  .pv-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center;font:15px Kanit,sans-serif;margin-top:6px}
  .pv-bar button{font:600 16px Kanit,sans-serif;padding:8px 18px;border-radius:8px;border:1px solid #3a3f52;background:#1b1f2e;color:#fff;cursor:pointer}
  .pv-bar button:disabled{opacity:.35;cursor:default}
  .pv-lab{min-width:360px;text-align:center;color:#d9d6cf}
  .pv-hint{font:13px Kanit,sans-serif;opacity:.6;text-align:center}
  .pv-dots{display:flex;gap:6px;justify-content:center;margin-top:4px}
  .pv-dots span{width:22px;height:4px;border-radius:2px;background:#2b3043}.pv-dots span.on{background:#d9a441}.pv-dots span.done{background:#6b5a35}`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  window.__presenter = function () {
    const V = window.__ve, P = window.__P, HOLD = 0.45;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const app = document.getElementById('app'), cv = document.getElementById('cv');
    const stage = document.createElement('div'); stage.className = 'pv-stage';
    const wrap = document.createElement('div'); wrap.className = 'pv-wrap';
    cv.parentNode.insertBefore(stage, cv); stage.appendChild(wrap); wrap.appendChild(cv);
    const side = document.createElement('div'); side.className = 'pv-side'; const full = document.createElement('div'); full.className = 'pv-full';
    wrap.append(side, full);

    /* step list */
    const D = window.DECK, CH = D.chapters, PTS = D.points || {}, BEAT_NAME = D.beatNames || {}, VERIFIED = D.final, FIGS = D.figs || {}, FXM = D.fx || {};
    const S = [{ k: 'cover', t: 0 }, { k: 'agenda', t: 0 }];
    let prevStop = 0;
    CH.forEach((c, ci) => {
      c.beats.forEach((b) => {
        const stop = P.end(b) - HOLD; S.push({ k: 'play', b, ci, start: prevStop, t: stop }); prevStop = stop;
        (PTS[b] || []).forEach((pn, pi) => pn.items.forEach((it, ii) => S.push({ k: 'pt', b, ci, pi, ii, t: stop })));
      });
      if (c.recap) S.push({ k: 'recap', ci, t: prevStop });
    });
    if (VERIFIED) S.push({ k: 'verified', ci: CH.length - 1, t: prevStop });
    S.push({ k: 'play', b: 'end', ci: CH.length, start: prevStop, t: P.DUR - HOLD });
    let cur = 0, live = false, sideKey = '', fullKey = '';

    const bar = document.createElement('div'); bar.className = 'pv-bar';
    const mk = (t) => { const b = document.createElement('button'); b.textContent = t; return b; };
    const bp = mk('◀ ก่อนหน้า'), bn = mk('ถัดไป ▶'), br = mk('เล่นฉากนี้ซ้ำ'), bf = mk('เต็มจอ');
    const lab = document.createElement('span'); lab.className = 'pv-lab'; bar.append(bp, lab, bn, br, bf);
    const dots = document.createElement('div'); dots.className = 'pv-dots'; dots.innerHTML = CH.map(() => '<span></span>').join('');
    const hint = document.createElement('div'); hint.className = 'pv-hint';
    hint.textContent = '→ / PageDown / Space / คลิก = ถัดไป · ← / PageUp = ย้อนกลับ · R = เล่นฉากนี้ซ้ำ · F = เต็มจอ · Home = กลับหน้าแรก';
    app.append(bar, dots, hint);

    function sideHTML(b, pi) {
      const pn = PTS[b][pi];
      return '<div class="pv-in' + (pn.compact ? ' compact' : '') + '"><div class="pv-kick">' + esc(pn.head) + '</div><div class="pv-tt">' + esc(pn.title) + '</div>' +
        pn.items.map(([t, d], i) => '<div class="pv-pt" data-i="' + i + '"><em>' + String(i + 1).padStart(2, '0') + '</em><div><b>' + esc(t) + '</b><span>' + esc(d) + '</span><div class="pv-figbox"></div></div></div>').join('') +
        (pn.note ? '<div class="pv-note">' + esc(pn.note) + '</div>' : '') + '</div>';
    }
    const rows = (a) => a.map(([n, t, sub], i) => '<div class="pv-row" style="transition-delay:' + (0.12 + i * 0.12) + 's"><em>' + n + '</em><b>' + esc(t) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</b></div>').join('');
    function fullHTML(s) {
      if (s.k === 'agenda') return '<div class="pv-fin pv-agenda"><div class="pv-fk">' + esc(D.kicker || '') + '</div><div class="pv-ft">สิ่งที่จะนำเสนอ</div>' + rows(CH.map((c) => [c.n, c.name, c.sub])) + '</div>';
      if (s.k === 'recap') { const c = CH[s.ci]; return '<div class="pv-fin"><div class="pv-fk">สรุปบทที่ ' + c.n + '</div><div class="pv-ft">' + esc(c.name) + '</div>' + rows(c.recap.map((t, i) => [String(i + 1).padStart(2, '0'), t])) + '</div>'; }
      if (s.k === 'verified') return '<div class="pv-fin"><div class="pv-fk">บทที่ ' + CH[CH.length - 1].n + ' · ' + esc(CH[CH.length - 1].name) + '</div><div class="pv-ft">' + esc(VERIFIED.title) + '</div><div class="pv-vcols">' +
        VERIFIED.cols.map((col) => '<div>' + col.map(([h, items, red]) => '<div class="pv-vh">' + esc(h) + '</div><ul class="pv-vl' + (red ? ' red' : '') + '">' + items.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>').join('') + '</div>').join('') + '</div></div>';
      return '';
    }
    function show() {
      const s = S[cur], c = CH[s.ci];
      let t = s.k === 'cover' ? 'หน้าปก · กด → เพื่อดูหัวข้อ' : s.k === 'agenda' ? 'สิ่งที่จะนำเสนอ' : s.b === 'end' ? (BEAT_NAME.end || 'ที่มา') :
        'บท ' + c.n + ' · ' + c.name + ' · ' + (s.k === 'recap' ? 'สรุปบท' : s.k === 'verified' ? 'ยืนยันแล้ว / ยังไม่รู้' : BEAT_NAME[s.b] + (s.k === 'pt' ? ' · ข้อ ' + (s.ii + 1) + '/' + PTS[s.b][s.pi].items.length : ''));
      lab.textContent = t + (live ? '  ▶' : '');
      bp.disabled = cur === 0; bn.disabled = cur === S.length - 1 && !live;
      [...dots.children].forEach((d, i) => { d.className = s.ci == null ? '' : i === s.ci ? 'on' : i < s.ci ? 'done' : ''; });
    }
    const hold = (t) => { V.pause(); V.S.t = t; P.setStop(Infinity); V.renderFrame(t); live = false; const sc = document.getElementById('sc'), tm = document.getElementById('tm'); if (sc) sc.value = Math.round(t / P.DUR * 1000); if (tm) tm.textContent = t.toFixed(1) + '/' + P.DUR + 's'; };
    function overlays(s) {
      /* right panel with points */
      if (s.k === 'pt') {
        const key = s.b + ':' + s.pi;
        if (key !== sideKey) { side.innerHTML = sideHTML(s.b, s.pi); sideKey = key; void side.offsetWidth; }
        side.classList.add('on');
        side.querySelectorAll('.pv-pt').forEach((el) => { const i = +el.dataset.i, fb = el.querySelector('.pv-figbox'); el.classList.toggle('on', i <= s.ii); el.classList.toggle('past', i < s.ii);
          const fk = s.b + ':' + s.pi + ':' + i, want = i === s.ii && FIGS[fk] ? fk : '';
          if (fb.dataset.k !== want) { fb.innerHTML = want ? FIGS[want] : ''; fb.dataset.k = want; } });
        const pn = PTS[s.b][s.pi], note = side.querySelector('.pv-note'); if (note) note.classList.toggle('on', s.ii === pn.items.length - 1);
      } else { side.classList.remove('on'); sideKey = ''; }
      /* full-frame slides */
      if (s.k === 'agenda' || s.k === 'recap' || s.k === 'verified') {
        const key = s.k + ':' + s.ci; if (key !== fullKey) { full.classList.remove('on'); full.innerHTML = fullHTML(s); fullKey = key; void full.offsetWidth; } full.classList.add('on');
      } else { full.classList.remove('on'); fullKey = ''; }
    }
    function go(i, opt) {
      cur = Math.max(0, Math.min(S.length - 1, i)); const s = S[cur];
      const sideOn = s.k === 'pt', changed = !!window.__PV_SIDE !== sideOn; window.__PV_SIDE = sideOn;
      if (changed) { const o = window.__PV_OFFT, nowv = o ? o.from + (o.to - o.from) * Math.min(1, (performance.now() - o.t0) / 650) : 0; window.__PV_OFFT = { from: nowv, to: sideOn ? 1 : 0, t0: performance.now() }; renderUntil = performance.now() + 750; }
      const fxId = s.k === 'pt' ? FXM[s.b + ':' + s.pi + ':' + s.ii] : null;
      const fxChanged = (window.__PV_FX ? window.__PV_FX.id : null) !== fxId || !!fxId;
      window.__PV_FX = fxId ? { id: fxId, t0: performance.now() } : null;
      if (s.k === 'play' && !(opt && opt.still)) { overlays(s); live = true; P.setStop(s.t); V.play(s.start + 0.001); }
      else { if (live || Math.abs(V.S.t - s.t) > 0.01) hold(s.t); else if (changed || fxChanged) V.renderFrame(s.t); overlays(s); }
      show();
    }
    let renderUntil = 0;
    (function fxLoop() { if (!live && (window.__PV_FX || performance.now() < renderUntil) && !window.__PV_NOLOOP) V.renderFrame(V.S.t); requestAnimationFrame(fxLoop); })();
    (function watch() { if (live) { const s = S[cur]; if (!V.S.playing) { live = false; show(); } else if (V.S.t >= s.t) { hold(s.t); show(); } } requestAnimationFrame(watch); })();
    const next = () => { if (live) { hold(S[cur].t); show(); } else if (cur < S.length - 1) go(cur + 1); };
    const back = () => { if (cur > 0) go(cur - 1, { still: true }); };
    const replay = () => { let i = cur; while (i > 0 && S[i].k !== 'play') i--; if (i > 0) go(i); };
    const fs = () => { if (document.fullscreenElement) document.exitFullscreen(); else stage.requestFullscreen && stage.requestFullscreen(); };
    bn.onclick = next; bp.onclick = back; br.onclick = replay; bf.onclick = fs; cv.onclick = next; side.onclick = next; full.onclick = next;
    document.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); back(); }
      else if (k === 'r' || k === 'R') { e.preventDefault(); replay(); }
      else if (k === 'f' || k === 'F') { e.preventDefault(); fs(); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
    });
    go(0);
    window.__pv = { S, go, get cur() { return cur; } };
  };

  /* ---------- FIG: animated line-diagram helpers for explanation points (viewBox 400x100; draw-on + fade-in) ---------- */
  window.FIG = (function () {
  const K = '#1c1e22', G = '#b8862f', GL = '#d9a441', R = '#b3242f', M = '#8b877f', SL = '#5d7690';
  let uid = 0;
  const dl = (d) => 'style="animation-delay:' + (d || 0).toFixed(2) + 's"';
  const svg = (inner) => { uid++; return '<svg class="pv-fig" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah' + uid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + G + '"/></marker><marker id="ar' + uid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + R + '"/></marker></defs>' + inner.replace(/#AH/g, '#ah' + uid).replace(/#AR/g, '#ar' + uid) + '</svg>'; };
  const T = (x, y, s, o) => { o = o || {}; return '<text class="f" ' + dl(o.d) + ' x="' + x + '" y="' + y + '" font-size="' + (o.size || 12) + '" font-weight="' + (o.w || 400) + '" fill="' + (o.c || K) + '" text-anchor="' + (o.a || 'middle') + '">' + s + '</text>'; };
  const Bx = (x, y, w, h, o) => { o = o || {}; return '<rect class="d" ' + dl(o.d) + ' pathLength="1" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.rx == null ? 5 : o.rx) + '" fill="' + (o.fill || 'rgba(255,255,255,.55)') + '" stroke="' + (o.c || K) + '" stroke-width="' + (o.sw || 1.2) + '"/>'; };
  const box = (x, y, w, h, label, o) => { o = o || {}; const lines = String(label).split('\n'), cy = y + h / 2 - (lines.length - 1) * 7 + 4; return Bx(x, y, w, h, o) + lines.map((l, i) => T(x + w / 2, cy + i * 14, l, { d: (o.d || 0) + 0.3, c: o.tc || o.c || K, size: o.size || 12, w: o.w || 400 })).join(''); };
  const Ar = (x1, y1, x2, y2, o) => { o = o || {}; return '<path class="d" ' + dl(o.d) + ' pathLength="1" d="M' + x1 + ',' + y1 + (o.q ? ' Q' + o.q[0] + ',' + o.q[1] + ' ' : ' L') + x2 + ',' + y2 + '" fill="none" stroke="' + (o.c || G) + '" stroke-width="' + (o.sw || 1.4) + '" marker-end="url(#' + (o.c === R ? 'AR' : 'AH') + ')"/>'; };
  const P = (d, o) => { o = o || {}; return '<path class="d" ' + dl(o.d) + ' pathLength="1" d="' + d + '" fill="' + (o.fill || 'none') + '" stroke="' + (o.c || K) + '" stroke-width="' + (o.sw || 1.2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
  const dot = (path, o) => { o = o || {}; return '<circle class="f" ' + dl(o.d) + ' r="' + (o.r || 3.5) + '" fill="' + (o.c || G) + '"><animateMotion dur="' + (o.dur || 1.8) + 's" begin="' + (o.d || 0) + 's" repeatCount="indefinite" path="' + path + '"/></circle>'; };
  const Ci = (x, y, r, o) => { o = o || {}; return '<circle class="d" ' + dl(o.d) + ' pathLength="1" cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (o.fill || 'none') + '" stroke="' + (o.c || K) + '" stroke-width="' + (o.sw || 1.2) + '"/>'; };
  /* icons */
  const key = (x, y, c, d) => Ci(x, y, 7, { c: c || G, d, sw: 1.6 }) + P('M' + (x + 7) + ',' + y + ' h18 m-5,0 v5 m-5,-5 v4', { c: c || G, d: (d || 0) + 0.2, sw: 1.6 });
  const doc = (x, y, c, d, lines) => Bx(x, y, 26, 34, { c: c || K, d, rx: 2 }) + [0, 1, 2].slice(0, lines == null ? 3 : lines).map((i) => P('M' + (x + 5) + ',' + (y + 9 + i * 7) + ' h' + (16 - i * 3), { c: M, d: (d || 0) + 0.3 + i * 0.1 })).join('');
  const laptop = (x, y, c, d) => Bx(x, y, 40, 26, { c: c || K, d, rx: 2 }) + P('M' + (x - 6) + ',' + (y + 30) + ' h52', { c: c || K, d: (d || 0) + 0.2, sw: 1.6 });
  const server = (x, y, c, d) => [0, 1, 2].map((i) => Bx(x, y + i * 11, 34, 9, { c: c || K, d: (d || 0) + i * 0.12, rx: 2 })).join('');
  const person = (x, y, c, d) => Ci(x, y, 6, { c: c || K, d }) + P('M' + (x - 10) + ',' + (y + 22) + ' q10,-16 20,0', { c: c || K, d: (d || 0) + 0.2 });
  const coin = (x, y, l, c, d) => Ci(x, y, 11, { c: c || G, d, sw: 1.4 }) + T(x, y + 4, l, { d: (d || 0) + 0.3, size: 9, c: c || G, w: 500 });
  const bug = (x, y, d) => Ci(x, y, 5, { c: R, d, fill: 'rgba(179,36,47,.15)' }) + P('M' + (x - 8) + ',' + (y - 4) + ' l3,2 M' + (x + 8) + ',' + (y - 4) + ' l-3,2 M' + (x - 8) + ',' + (y + 4) + ' l3,-1 M' + (x + 8) + ',' + (y + 4) + ' l-3,-1', { c: R, d: (d || 0) + 0.2 });
  const check = (x, y, c, d) => P('M' + (x - 5) + ',' + y + ' l4,4 l7,-8', { c: c || G, d, sw: 2 });
  const cross = (x, y, d) => P('M' + (x - 5) + ',' + (y - 5) + ' l10,10 M' + (x + 5) + ',' + (y - 5) + ' l-10,10', { c: R, d, sw: 2 });
  /* generic flow: nodes left->right with arrows and a travelling dot */
  function flow(nodes, o) {
    o = o || {}; const n = nodes.length, gap = 24, w = (392 - gap * (n - 1)) / n, y = o.y || 30, h = o.h || 40; let s = '';
    nodes.forEach((lab, i) => { const x = 4 + i * (w + gap), red = (o.red || []).includes(i); s += box(x, y, w, h, lab, { d: i * 0.35, c: red ? R : K, tc: red ? R : K, size: o.size || 11.5 }); if (i) s += Ar(x - gap + 2, y + h / 2, x - 3, y + h / 2, { d: i * 0.35 - 0.1, c: (o.red || []).includes(i) ? R : G }); });
    s += dot('M8,' + (y + h / 2) + ' H392', { d: n * 0.35, dur: 2.2, c: o.dotc || G });
    return svg(s + (o.extra || ''));
  }
  function bars(rows, max, o) {
    o = o || {}; let s = ''; const lw = o.lw || 120, bw = 392 - lw - 70, rh = Math.min(20, 92 / rows.length);
    rows.forEach(([lab, v, c, val], i) => { const y = 6 + i * (rh + 4), w = Math.max(2, bw * v / max), hl = o.hl == null || o.hl === i;
      s += T(lw - 6, y + rh / 2 + 4, lab, { a: 'end', size: 11, d: i * 0.15, c: hl ? K : M });
      s += '<rect x="' + lw + '" y="' + (y + 3) + '" height="' + (rh - 6) + '" width="0" fill="' + (hl ? c : '#cfc9be') + '"><animate attributeName="width" from="0" to="' + w.toFixed(1) + '" dur="0.9s" begin="' + (0.2 + i * 0.15) + 's" fill="freeze"/></rect>';
      s += T(lw + w + 6, y + rh / 2 + 4, val, { a: 'start', size: 11, w: 500, d: 0.9 + i * 0.15, c: hl ? c : M }); });
    return svg(s);
  }

    return { K, G, GL, R, M, SL, svg, T, Bx, box, Ar, P, dot, Ci, key, doc, laptop, server, person, coin, bug, check, cross, flow, bars, dl };
  })();
})();
