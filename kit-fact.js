/* FK kit v1.1 — low-poly 3D map + data helpers for the fact channel (fact-map-3d-shorts).
   v1.1 (Oct 2026): FK.softSfx, FK.chillBed, FK.voice, FK.land, FK.beats — the sound/voice/landscape code videos used to carry themselves. */
(function () {
  const FK = (window.FK = {});
  FK.pal = { navy: '#0f1630', ocean: '#1b2a55', land: '#2e3f73', teal: '#2ee6c5', coral: '#ff5d73', gold: '#ffc94a', violet: '#8f7bff', white: '#ffffff' };
  FK.mat = (T, c, x) => new T.MeshStandardMaterial(Object.assign({ color: c, flatShading: true, roughness: 0.65, metalness: 0.05 }, x || {}));
  FK.lights = (T, scene) => {
    scene.add(new T.HemisphereLight(0xbfd4ff, 0x1b2a55, 0.95));
    const d = new T.DirectionalLight(0xffffff, 0.9); d.position.set(5, 12, 8); scene.add(d);
  };

  /* lon/lat point-in-polygon test from a GeoJSON FeatureCollection (coarse, for globe land colouring) */
  FK.landTest = function (geo) {
    const polys = [];
    for (const f of geo.features) {
      const gm = f.geometry, ps = gm.type === 'Polygon' ? [gm.coordinates] : gm.coordinates;
      for (const p of ps) {
        const ring = p[0]; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
        for (const q of ring) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }
        polys.push({ ring, x0, x1, y0, y1 });
      }
    }
    return (lon, lat) => {
      for (const p of polys) {
        if (lon < p.x0 || lon > p.x1 || lat < p.y0 || lat > p.y1) continue;
        let inside = false; const r = p.ring;
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
          if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
        }
        if (inside) return true;
      }
      return false;
    };
  };

  /* low-poly icosahedron globe; land faces coloured via landFn(lon,lat). lon=0 faces +z. */
  FK.globe = function (T, o) {
    o = o || {}; const r = o.r || 3, geo = new T.IcosahedronGeometry(r, o.detail || 3), pos = geo.attributes.position, cols = [];
    const land = new T.Color(o.land || '#2ee6c5'), sea = new T.Color(o.sea || '#27408f'), land2 = new T.Color(o.land2 || '#27c7ab');
    for (let i = 0; i < pos.count; i += 3) {
      const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3, cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3, cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
      const lat = Math.asin(cy / Math.hypot(cx, cy, cz)) * 57.2958, lon = Math.atan2(cx, cz) * 57.2958;
      const isLand = o.landFn ? o.landFn(lon, lat) : Math.sin(lon * 0.07) * Math.cos(lat * 0.09) > 0.2;
      const c = isLand ? ((i / 3) % 2 ? land : land2) : sea;
      for (let k = 0; k < 3; k++) cols.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new T.Float32BufferAttribute(cols, 3));
    return new T.Mesh(geo, new T.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.7 }));
  };
  /* rotation.y that brings (lon) to face the camera on +z */
  FK.faceLon = (lon) => -lon * Math.PI / 180;

  /* equirectangular projection around (lon0,lat0), k = units per degree */
  FK.project = (lon0, lat0, k) => (lon, lat) => [(lon - lon0) * Math.cos(lat0 * Math.PI / 180) * k, (lat - lat0) * k];
  FK.shapes = function (T, gm, proj) {
    const ps = gm.type === 'Polygon' ? [gm.coordinates] : gm.coordinates, out = [];
    for (const p of ps) {
      const mk = (r) => r.map((q) => { const v = proj(q[0], q[1]); return new T.Vector2(v[0], v[1]); });
      const s = new T.Shape(mk(p[0])); for (let i = 1; i < p.length; i++) s.holes.push(new T.Path(mk(p[i])));
      out.push(s);
    }
    return out;
  };
  /* extruded regions; scale.z = height (animate rise). group is rotated so +z extrusion points up (+y).
     o={project,idOf(f),color(id,f)}; returns {group,meshes:{id:mesh}} */
  FK.regions = function (T, features, o) {
    const group = new T.Group(), meshes = {};
    for (const f of features) {
      const id = o.idOf(f), geo = new T.ExtrudeGeometry(FK.shapes(T, f.geometry, o.project), { depth: 1, bevelEnabled: false });
      const m = new T.Mesh(geo, FK.mat(T, o.color(id, f))); m.userData.id = id; m.scale.z = 0.02; meshes[id] = m; group.add(m);
    }
    group.rotation.x = -Math.PI / 2; return { group, meshes };
  };
  FK.bar = (T, w, d, color) => { const g = new T.BoxGeometry(w, 1, d); g.translate(0, 0.5, 0); return new T.Mesh(g, FK.mat(T, color)); };

  /* canvas-texture sprite label (depthTest off). Create inside setup() (after fonts load). */
  FK.label = function (T, txt, o) {
    o = o || {}; const c = document.createElement('canvas'); c.width = 640; c.height = 200; const x = c.getContext('2d');
    x.font = '800 ' + (o.px || 92) + 'px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineJoin = 'round'; x.lineWidth = 16; x.strokeStyle = 'rgba(10,12,30,.9)'; x.strokeText(txt, 320, 100); x.fillStyle = o.color || '#fff'; x.fillText(txt, 320, 100);
    const sp = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(c), transparent: true, depthTest: false }));
    const w = o.w || 3; sp.scale.set(w, w * 200 / 640, 1); sp.renderOrder = 10; return sp;
  };

  /* diorama pieces */
  FK.platform = (T, r, color) => new T.Mesh(new T.CylinderGeometry(r, r * 0.8, 0.5, 8), FK.mat(T, color || FK.pal.land));
  FK.tree = (T, color) => { const g = new T.Group(); const t = new T.Mesh(new T.CylinderGeometry(0.08, 0.1, 0.4, 5), FK.mat(T, '#8a5a3c')); t.position.y = 0.2; const c = new T.Mesh(new T.ConeGeometry(0.35, 0.8, 6), FK.mat(T, color || '#2ee6c5')); c.position.y = 0.8; g.add(t, c); return g; };
  FK.building = (T, w, h, d, color) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), FK.mat(T, color || FK.pal.violet)); m.position.y = h / 2; return m; };
  FK.person = (T, color) => { const g = new T.Group(); const b = new T.Mesh(new T.CylinderGeometry(0.1, 0.12, 0.35, 8), FK.mat(T, color || FK.pal.coral)); b.position.y = 0.18; const h = new T.Mesh(new T.SphereGeometry(0.11, 8, 6), FK.mat(T, '#ffd9c2')); h.position.y = 0.48; g.add(b, h); return g; };
  FK.particles = (T, n, spread, color) => {
    const p = new Float32Array(n * 3); for (let i = 0; i < n * 3; i++) p[i] = (Math.random() - 0.5) * spread;
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3));
    return new T.Points(g, new T.PointsMaterial({ color: color || '#ffffff', size: 0.06, transparent: true, opacity: 0.7 }));
  };

  /* 2D HUD: rank badge (rounded square with number, #1 gold) */
  FK.rankBadge = function (g, x, y, n, total, color) {
    const s = 120; g.save(); g.fillStyle = color || (n === 1 ? FK.pal.gold : FK.pal.teal);
    g.beginPath(); g.roundRect ? g.roundRect(x - s / 2, y - s / 2, s, s, 26) : g.rect(x - s / 2, y - s / 2, s, s); g.fill();
    g.fillStyle = '#0f1630'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 76px Kanit,sans-serif'; g.fillText('#' + n, x, y + 2);
    if (total) { g.font = '600 26px Kanit,sans-serif'; g.fillStyle = '#fff'; g.fillText(n + '/' + total, x, y + s / 2 + 26); }
    g.restore();
  };
  /* ---------- v1.1: beats, sound, voice, landscape (see docs/sound.md, docs/voiceover.md, docs/youtube-16x9.md) ---------- */

  FK.beats = VE.beats; // see core.js

  /* Soft SFX set (all quiet, nothing under ~100 Hz). Replaces thump/boom/riser/warn. */
  FK.softSfx = function () {
    const AU = VE.audio, R = VE.registerSfx;
    R('soft', (t) => AU.tone(t, 523, 0.18, { type: 'sine', vol: 0.05, rel: 0.25 }));
    R('chime', (t) => { AU.tone(t, 988, 0.5, { vol: 0.04, rel: 0.4 }); AU.tone(t + 0.05, 1319, 0.5, { vol: 0.035, rel: 0.4 }); });
    R('bell', (t) => AU.tone(t, 784, 0.4, { vol: 0.05, rel: 0.45 }));
    R('tok', (t) => AU.tone(t, 760, 0.05, { type: 'triangle', vol: 0.05, rel: 0.04 }));
    R('glide', (t, o) => AU.noise(t, (o && o.dur) || 0.5, { type: 'bandpass', f: 500, f2: 1400, q: 0.9, vol: 0.05 }));
    R('splash', (t) => AU.noise(t, 0.45, { type: 'bandpass', f: 1200, f2: 700, q: 0.7, vol: 0.05 }));
    R('water', (t, o) => AU.noise(t, (o && o.dur) || 1.5, { type: 'bandpass', f: 900, q: 0.5, vol: 0.025, att: 0.3 }));
    R('rain', (t, o) => AU.noise(t, (o && o.dur) || 2, { type: 'highpass', f: 1500, vol: 0.03, att: 0.4 }));
    R('roar', (t, o) => AU.noise(t, (o && o.dur) || 1.2, { type: 'bandpass', f: 700, f2: 1100, q: 0.6, vol: 0.05, att: 0.3 }));
    R('siren', (t) => { AU.tone(t, 520, 0.9, { type: 'sine', f2: 410, vol: 0.03, att: 0.35, rel: 0.3 }); });
  };

  /* Chill bed (~78 bpm, Fmaj7 Em7 Dm7 Cmaj7; minor colour while calm(t) is true). Returns a bed entry.
     opts: { DUR, calm(t)->bool, gain (bus, default 0.75), vol (music scale, 1; use ~0.6 under a voice), voice (from FK.voice) }. */
  FK.chillBed = function (o) {
    const DUR = o.DUR, calm = o.calm || (() => false), gain = o.gain == null ? 0.75 : o.gain, V = o.vol == null ? 1 : o.vol;
    const AU = VE.audio, hz = VE.midiHz, MB = 60 / 78 * 4;
    const PA = [[65, 69, 72, 76], [64, 67, 71, 74], [62, 65, 69, 72], [60, 64, 67, 71]], PB = [[57, 60, 64, 67], [53, 57, 60, 64], [62, 65, 69, 72], [64, 67, 71, 74]], ARP = [0, 2, 1, 3, 2, 1];
    function chill(base, from) {
      const t1 = DUR - 1.6;
      for (let b = 0, tb = 0.3; tb < t1; b++, tb += MB) {
        const rev = calm(tb), ch = (rev ? PB : PA)[b % 4], len = Math.min(MB, t1 - tb);
        if (tb + len < from) continue; const p0 = base + Math.max(tb, from);
        for (const n of ch) AU.tone(p0, hz(n), Math.max(0.2, len - 0.3), { type: 'sine', vol: 0.016 * V, att: 0.5, rel: 0.6 });
        AU.tone(p0, hz(ch[0] - 12), Math.max(0.2, len * 0.45), { type: 'sine', vol: 0.025 * V, att: 0.08, rel: 0.4 });
        for (const k of rev ? [0, 3] : [0, 1, 2, 3, 4, 5]) { const tt = tb + k * MB / 6 + MB / 12; if (tt < from || tt > t1) continue; AU.tone(base + tt, hz(ch[ARP[k]] + 12), 0.25, { type: 'triangle', vol: (rev ? 0.012 : 0.016) * V, att: 0.01, rel: 0.35 }); }
        if (!rev) for (const k of [1, 3]) { const tt = tb + k * MB / 4; if (tt < from || tt > t1) continue; AU.noise(base + tt, 0.06, { type: 'highpass', f: 7000, vol: 0.012 * V }); }
      }
    }
    return { play(base, from, A) {
      if (A && A.bus) { A.bus.gain.setValueAtTime(gain, base + Math.max(0, from)); A.bus.gain.setValueAtTime(gain, base + DUR - 0.6); }
      if (o.voice) o.voice.play(base, from, A);
      chill(base, from);
    } };
  };

  FK.voice = VE.voice; // see core.js

  /* Landscape (YouTube 16:9) helpers: FK.land() -> { LAND, W, H, CX }. Build with --data cfg=land.json ({"land":true}).
     FK.subtitleY(cap) places a caption as a bottom subtitle band; FK.landGradients(g, W, H, {bottom, left}) draws the dark bands. */
  FK.land = function () { const LAND = !!(window.DATA && DATA.cfg && DATA.cfg.land); return { LAND, W: LAND ? 1920 : 1080, H: LAND ? 1080 : 1920, CX: LAND ? 960 : 540 }; };
  FK.subtitleY = function (cap, bottom) { let h = 0; cap.lines.forEach((l, i) => { h += i === cap.lines.length - 1 ? l[0] * 0.6 : l[0] * 1.25; }); return (bottom || 1040) - h - (cap.foot ? 40 : 0); };
  FK.landGradients = function (g, W, H, o) {
    o = o || {}; g.save();
    if (o.bottom !== false) { const gr = g.createLinearGradient(0, H - 320, 0, H); gr.addColorStop(0, 'rgba(15,22,48,0)'); gr.addColorStop(1, 'rgba(15,22,48,.85)'); g.fillStyle = gr; g.fillRect(0, H - 320, W, 320); }
    if (o.left) { const gl = g.createLinearGradient(0, 0, W * 0.55, 0); gl.addColorStop(0, 'rgba(15,22,48,.85)'); gl.addColorStop(1, 'rgba(15,22,48,0)'); g.fillStyle = gl; g.fillRect(0, 0, W * 0.55, H); }
    g.restore();
  };
})();
