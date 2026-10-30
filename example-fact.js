/* EXAMPLE video file for the fact channel (kit: fact). Demo numbers only, not for publishing.
   Build: node build.js example-fact.js out.html --kit fact --data world=world.geo.json
   Shows the standard skeleton: BEATS -> FK.beats(at/end/DUR), cover at t=0, FK.softSfx + FK.chillBed (bus 0.75), optional voice-over + landscape. */
(function () {
  const T = THREE, P = FK.pal, U = VE.u, L = FK.land(), SW = L.W, SH = L.H;
  const BEATS = [['cover', 1.8], ['hook', 3.2], ['vn', 3.6], ['th', 3.6], ['mm', 4.2], ['end', 1.6]];
  const B = FK.beats(BEATS, window.DATA && DATA.vo), at = B.at, end = B.end, DUR = B.DUR;
  FK.softSfx();
  const NAMES = { Myanmar: ['เมียนมา', 676.6, P.gold], Thailand: ['ไทย', 513.1, P.coral], Vietnam: ['เวียดนาม', 331.2, P.teal] };
  const RISE = { Vietnam: at('vn'), Thailand: at('th'), Myanmar: at('mm') }, POS = { Myanmar: [96, 21], Thailand: [101, 15.5], Vietnam: [107, 15] };
  const SIX = ['Myanmar', 'Thailand', 'Vietnam', 'Laos', 'Cambodia', 'Malaysia'];
  const nf = (v) => Math.round(v * 1000).toLocaleString('en-US');
  const CAM = [
    { t: 0, pos: [0, 0, 22], look: [0, 0, 0], fov: 40 }, { t: at('vn') - 0.1, pos: [0, 0, 18], look: [0, 0, 0], fov: 40 },
    { t: at('vn'), pos: [0, 44, 40], look: [0, 0, -2], fov: 40 }, { t: at('mm'), pos: [0, 44, 40], look: [0, 0, -2], fov: 40 },
    { t: at('mm', 0.7), pos: [-2, 36, 32], look: [-2, 0, -3], fov: 40 }, { t: end('mm') - 0.6, pos: [-2, 36, 32], look: [-2, 0, -3], fov: 40 }, { t: DUR, pos: [0, 50, 44], look: [0, 0, -2], fov: 40 },
  ];
  const caps = [
    { t0: 0, t1: end('cover'), y: 420, instant: true, lines: [[130, ['ประเทศไหน', '#fff']], [130, ['ใหญ่สุด', P.gold]], [130, ['แถวนี้?', '#fff']]] },
    { t0: at('hook'), t1: end('hook'), y: 330, lines: [[90, ['3 เพื่อนบ้าน', '#fff']], [90, ['ใครกว้างกว่า?', P.teal]]] },
    { t0: at('vn'), t1: end('vn'), y: 520, lines: [[70, ['เวียดนาม', '#fff']], [44, ['331,212 ตร.กม.', P.teal, 600]]] },
    { t0: at('th'), t1: end('th'), y: 520, lines: [[70, ['ไทย', '#fff']], [44, ['513,120 ตร.กม.', P.coral, 600]]] },
    { t0: at('mm'), t1: end('mm'), y: 520, lines: [[78, ['เมียนมา', P.gold]], [44, [(t) => nf(U.clamp((t - at('mm')) / 1.2) * 676.6) + ' ตร.กม.', '#fff', 600]]], foot: 'ตัวอย่าง — พื้นที่โดยประมาณ' },
  ];
  if (L.LAND) caps.forEach((c) => { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; });
  VE.run({
    DUR, W: SW, H: SH, coverAt0: true, file: L.LAND ? 'example-fact-youtube' : 'example-fact', title: 'Example fact',
    brand: { name: 'RuNgee รู้งี้', series: 'จัดอันดับ Top 3', color: P.teal, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
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
      const tv = at('vn');
      s.globe.visible = t < tv + 0.4; s.globe.rotation.y = FK.faceLon(100.5) + (1 - U.easeOut(U.clamp(t / 3))) * 2.5;
      s.reg.group.visible = t >= tv - 0.1;
      for (const id in s.reg.meshes) {
        const m = s.reg.meshes[id], t0 = RISE[id] || tv, v = NAMES[id] ? NAMES[id][1] / 676.6 * 7 : 0.5;
        m.scale.z = Math.max(0.02, v * U.easeBack(U.clamp((t - t0) / 0.6))); m.visible = t > tv - 0.1;
      }
      for (const k in s.labels) { const sp = s.labels[k], t0 = RISE[k]; const a = U.clamp((t - t0 - 0.5) / 0.3); sp.visible = a > 0 && t >= RISE[k] + 3.6; /* 3D label never repeats the active caption */ sp.material.opacity = a; sp.position.set(sp.userData.x, NAMES[k][1] / 676.6 * 7 + 1.4, sp.userData.z); }
      VE.camAt(CAM, t, camera, t > tv ? 0.4 : 0);
    },
    bgAt: (t) => (t < at('vn') ? ['#0f1630', '#1b2a55'] : ['#10193a', '#243a73']),
    hud(g, t, { W, H }) {
      if (L.LAND) { FK.landGradients(g, W, H, { left: t < end('cover') }); if (t < end('cover')) { g.fillStyle = '#fff'; g.font = '800 120px Kanit,sans-serif'; g.textAlign = 'left'; g.fillText('ประเทศไหน', 120, 480); g.fillStyle = P.gold; g.fillText('ใหญ่สุดแถวนี้?', 120, 620); } }
      const R = [[at('vn'), at('th'), 3], [at('th'), at('mm'), 2], [at('mm'), end('mm'), 1]];
      for (const r of R) if (t >= r[0] && t < r[1]) FK.rankBadge(g, L.CX - 380, 330, r[2], 3);
    },
    caps,
    trans: [{ t: at('vn') - 0.4, dur: 0.8, type: 'iris' }, { t: at('mm'), dur: 0.35, type: 'flash' }],
    audio: [[at('hook'), 'glide'], [at('vn') - 0.4, 'glide'], [at('vn'), 'pop'], [at('vn'), 'soft'], [at('th'), 'bell'], [at('th'), 'soft'], [at('mm'), 'chime'], [at('mm'), 'shimmer']],
    bed: [FK.chillBed({ DUR, calm: () => false, voice: FK.voice(window.DATA && DATA.vo, B) })],
  });
})();
