/* FK kit — low-poly 3D map + data helpers for the fact channel (fact-map-3d-shorts). */
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
})();
