/* EXAMPLE video file for the fact channel (kit: fact). Areas are rough demo numbers, not for publishing.
   Build: node build.js example-fact.js out.html --kit fact --data world=world.geo.json */
(function () {
  const T = THREE, P = FK.pal, U = VE.u;
  const NAMES = { Myanmar: ['เมียนมา', 676.6, P.gold], Thailand: ['ไทย', 513.1, P.coral], Vietnam: ['เวียดนาม', 331.2, P.teal] };
  const RISE = { Vietnam: 4.0, Thailand: 5.5, Myanmar: 7.0 }, POS = { Myanmar: [96, 21], Thailand: [101, 15.5], Vietnam: [107, 15] };
  const SIX = ['Myanmar', 'Thailand', 'Vietnam', 'Laos', 'Cambodia', 'Malaysia'];
  const nf = (v) => Math.round(v * 1000).toLocaleString('en-US');
  const CAM = [
    { t: 0, pos: [0, 0, 22], look: [0, 0, 0], fov: 40 }, { t: 3.4, pos: [0, 0, 18], look: [0, 0, 0], fov: 40 },
    { t: 3.5, pos: [0, 44, 40], look: [0, 0, -2], fov: 40 }, { t: 7, pos: [0, 44, 40], look: [0, 0, -2], fov: 40 },
    { t: 7.7, pos: [-2, 36, 32], look: [-2, 0, -3], fov: 40 }, { t: 9, pos: [-2, 36, 32], look: [-2, 0, -3], fov: 40 }, { t: 10.5, pos: [0, 50, 44], look: [0, 0, -2], fov: 40 },
  ];
  VE.run({
    DUR: 12, file: 'example-fact', title: 'Example fact',
    brand: { name: 'RuNgee รู้งี้', series: 'จัดอันดับ Top 3', color: P.teal, endLine: 'รู้งี้... ติดตามไว้' },
    setup({ scene }) {
      FK.lights(T, scene);
      const globe = FK.globe(T, { r: 3, landFn: FK.landTest(DATA.world) }); scene.add(globe);
      const proj = FK.project(102, 15, 0.9);
      const reg = FK.regions(T, DATA.world.features.filter((f) => SIX.includes(f.properties.name)), { project: proj, idOf: (f) => f.properties.name, color: (id) => (NAMES[id] ? NAMES[id][2] : P.land) });
      reg.group.visible = false; scene.add(reg.group);
      const labels = {};
      for (const k in POS) { const sp = FK.label(T, NAMES[k][0], { w: 5 }); const q = proj(POS[k][0], POS[k][1]); sp.userData.x = q[0]; sp.userData.z = -q[1]; sp.visible = false; scene.add(sp); labels[k] = sp; }
      return { globe, reg, labels };
    },
    update(t, s, { camera }) {
      s.globe.visible = t < 3.8; s.globe.rotation.y = FK.faceLon(100.5) + (1 - U.easeOut(U.clamp(t / 3))) * 2.5;
      s.reg.group.visible = t >= 3.4;
      for (const id in s.reg.meshes) {
        const m = s.reg.meshes[id], t0 = RISE[id] || 4.0, v = NAMES[id] ? NAMES[id][1] / 676.6 * 7 : 0.5;
        m.scale.z = Math.max(0.02, v * U.easeBack(U.clamp((t - t0) / 0.6))); m.visible = t > 3.4;
      }
      for (const k in s.labels) { const sp = s.labels[k], t0 = RISE[k]; const a = U.clamp((t - t0 - 0.5) / 0.3); sp.visible = a > 0; sp.material.opacity = a; sp.position.set(sp.userData.x, NAMES[k][1] / 676.6 * 7 + 1.4, sp.userData.z); }
      VE.camAt(CAM, t, camera, t > 3.5 ? 0.4 : 0);
    },
    bgAt: (t) => (t < 3.5 ? ['#0f1630', '#1b2a55'] : ['#10193a', '#243a73']),
    hud(g, t) {
      const R = [[4.0, 5.5, 3], [5.5, 7.0, 2], [7.0, 10.5, 1]];
      for (const r of R) if (t >= r[0] && t < r[1]) FK.rankBadge(g, 160, 330, r[2], 3);
    },
    caps: [
      { t0: 0.3, t1: 3.2, y: 330, lines: [[96, ['ประเทศไหน', '#fff']], [96, ['ใหญ่สุดแถวนี้?', P.gold]]] },
      { t0: 4.0, t1: 5.5, y: 520, lines: [[70, ['เวียดนาม', '#fff']], [44, ['331,212 ตร.กม.', P.teal, 600]]] },
      { t0: 5.5, t1: 7.0, y: 520, lines: [[70, ['ไทย', '#fff']], [44, ['513,120 ตร.กม.', P.coral, 600]]] },
      { t0: 7.0, t1: 10.4, y: 520, lines: [[78, ['เมียนมา', P.gold]], [44, [(t) => nf(U.clamp((t - 7.0) / 1.2) * 676.6) + ' ตร.กม.', '#fff', 600]]], foot: 'ตัวอย่าง — พื้นที่โดยประมาณ' },
    ],
    trans: [{ t: 3.1, dur: 0.8, type: 'iris' }, { t: 7.0, dur: 0.35, type: 'flash' }],
    audio: [[0.3, 'whoosh'], [3.1, 'whoosh'], [4.0, 'pop'], [4.0, 'thump'], [5.5, 'ding'], [5.5, 'thump'], [6.3, 'riser', { dur: 0.7 }], [7.0, 'boom'], [7.0, 'shimmer']],
    bed: [{ t0: 0, t1: 10.5, mood: 'drive' }],
  });
})();
