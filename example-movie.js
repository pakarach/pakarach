/* EXAMPLE for the movie-story channel (kits: fact + movie). An invented noir scene, not a real film.
   Build 16:9: node build.js example-movie.js out.html --kit fact,movie --font "IBM Plex Sans Thai:wght@300;500"
   Build 9:16 teaser: add --data cfg=port.json  ({"port":true})
   Shows: MK.look grade, two sets as islands of light, one key light that travels with the story (lighting cues instead of cuts),
   figurines, practical lamps, beam, dust, MK.finish (bloom, grain, bars), title card, subtitle-band captions. */
(function () {
  const T = THREE, U = VE.u, F = MK.frame(), W = F.W, H = F.H, PI = Math.PI;
  const BEATS = [['cover', 2.2], ['street', 4.5], ['walk', 2.6], ['office', 4.5], ['end', 1.8]];
  const B = FK.beats(BEATS, window.DATA && DATA.vo), at = B.at, end = B.end, DUR = B.DUR;
  FK.softSfx();
  const S1 = [0, 0, 0], S2 = [24, 0, -3];
  const CAM = F.PORT ? [
    { t: 0, pos: [9, 2.4, 15], look: [0.4, 3.3, 0], fov: 30 }, { t: end('street'), pos: [6, 2.8, 15], look: [0.4, 3.0, 0], fov: 30 },
    { t: at('office'), pos: [27, 3.2, 13], look: [24, 1.9, -3], fov: 30 }, { t: DUR, pos: [25, 2.6, 12], look: [24, 1.8, -3], fov: 30 },
  ] : [
    { t: 0, pos: [7.2, 1.5, 7.2], look: [0.2, 1.75, -0.6], fov: 28 }, { t: end('street'), pos: [5.2, 1.7, 7.6], look: [-0.2, 1.6, -0.6], fov: 28 },
    { t: at('office'), pos: [29.5, 2.4, 4.2], look: [24.2, 1.5, -3.4], fov: 28 }, { t: DUR, pos: [28.2, 2.0, 3.6], look: [24.2, 1.45, -3.4], fov: 28 },
  ];
  const cap = (id, a, b) => ({ t0: at(id) + 0.2, t1: end(id) - 0.1, y: 0, lines: [[F.PORT ? 62 : 50, [a, '#fff', 600]]].concat(b ? [[F.PORT ? 62 : 50, [b, MK.GRADES.noir.accent, 600]]] : []) });
  const caps = [cap('street', 'คืนฝนตก นักสืบยืนรอใต้เสาไฟ', 'เขาไม่รู้ว่ามีคนมองอยู่'), cap('walk', 'อีกฟากของเมือง ไฟห้องหนึ่งยังเปิดอยู่'), cap('office', 'คนที่จ้างเขา', 'คือคนเดียวกับที่เขาตามหา')];
  caps.forEach((c) => { c.y = F.PORT ? 1380 : MK.subY(c, H, W); });

  VE.run({
    DUR, W, H, coverAt0: true, brandBar: false, endLen: 0, vignette: 'rgba(0,0,0,.55)', file: F.PORT ? 'example-movie-teaser' : 'example-movie', title: 'Example movie',
    brand: { name: 'ชื่อช่อง', series: '', color: MK.GRADES.noir.accent, bg: ['#070a12', '#070a12'], motif: { notes: [] } },
    setup({ scene, renderer }) {
      const L = MK.look(scene, renderer, 'noir'), sh = MK.sh, s = { L };
      /* --- set 1: street corner --- */
      const a = MK.set(10, 6.5, '#23262e'); a.position.set(S1[0], 0, S1[2]); scene.add(a);
      const wall = sh(new T.Mesh(MK.rbox(10, 4.2, 0.4, 0.05), MK.matte('#3f2d28'))); wall.position.set(0, 2.34, -2.9); a.add(wall);
      for (let i = 0; i < 7; i++) { const c = sh(new T.Mesh(MK.rbox(10, 0.06, 0.46, 0.02), MK.matte('#2e211d'))); c.position.set(0, 0.7 + i * 0.55, -2.9); a.add(c); }
      const door = sh(new T.Mesh(MK.rbox(1.3, 2.5, 0.2, 0.05), MK.resin('#2d3a35'))); door.position.set(-2.6, 1.49, -2.68); a.add(door);
      const win = new T.Mesh(MK.rbox(1.5, 1.2, 0.1, 0.04), MK.emit('#ffb060', 2.4)); win.position.set(2.4, 2.6, -2.68); a.add(win);
      for (const x of [-0.4, 0, 0.4]) { const bar = new T.Mesh(MK.rbox(0.06, 1.2, 0.14, 0.02), MK.matte('#1a1a1c')); bar.position.set(2.4 + x, 2.6, -2.66); a.add(bar); }
      const wl = MK.lamp('#ffb060', 0.9, 2.2); wl.position.set(2.4, 2.6, -2.2); a.add(wl);
      const post = sh(new T.Mesh(new T.CylinderGeometry(0.06, 0.09, 4.2, 16), MK.metal('#30333a'))); post.position.set(-0.9, 2.34, -0.6); a.add(post);
      const arm = sh(new T.Mesh(MK.rbox(1.1, 0.08, 0.08, 0.03), MK.metal('#30333a'))); arm.position.set(-0.4, 4.4, -0.6); a.add(arm);
      const hood = sh(new T.Mesh(new T.ConeGeometry(0.32, 0.26, 24, 1, true), MK.metal('#30333a', { side: T.DoubleSide }))); hood.position.set(0.1, 4.3, -0.6); a.add(hood);
      const bulb = new T.Mesh(new T.SphereGeometry(0.12, 16, 12), MK.emit('#ffd9a0', 4)); bulb.position.set(0.1, 4.2, -0.6); a.add(bulb);
      const sl = MK.lamp('#ffc480', 1.5, 2.6); sl.position.copy(bulb.position); a.add(sl);
      const beam = MK.beam('#ffc480', 4.2, 2.3, 0.2); beam.position.copy(bulb.position); a.add(beam);
      const det = MK.figure({ coat: '#b49562', hat: '#3b3129', hair: '#2a2320' }); det.position.set(0.5, 0.24, -0.2); det.userData.y0 = 0.24; a.add(det);
      const her = MK.figure({ coat: '#8a2633', hair: '#1d1512', long: true, h: 1.5, build: 0.9 }); her.position.set(-2.6, 0.24, -1.9); her.userData.y0 = 0.24; a.add(her);
      const bk1 = MK.bokeh(26, [34, 7, 6], ['#ffb060', '#4f7dff', '#ff6a5a', '#ffe0a8'], 2.2); bk1.position.set(-6, 1.5, -20); a.add(bk1);
      const dust1 = MK.dust(90, [5, 4.4, 4], '#ffd9a0'); dust1.position.set(0.1, 0.2, -0.6); a.add(dust1);
      /* --- set 2: office --- */
      const b = MK.set(8, 6, '#3a2a20'); b.position.set(S2[0], 0, S2[2]); scene.add(b);
      const bw = sh(new T.Mesh(MK.rbox(8, 4, 0.3, 0.05), MK.matte('#1f2a2e'))); bw.position.set(0, 2.24, -2.7); b.add(bw);
      for (let i = 0; i < 9; i++) { const sl2 = new T.Mesh(MK.rbox(2.4, 0.07, 0.06, 0.02), MK.emit('#6f95ff', 1.6)); sl2.position.set(1.6, 1.5 + i * 0.2, -2.52); b.add(sl2); }
      const desk = sh(new T.Mesh(MK.rbox(3, 0.14, 1.4, 0.05), MK.resin('#6b4630'))); desk.position.set(0.2, 1.05, 0); b.add(desk);
      for (const x of [-1.2, 1.6]) { const leg = sh(new T.Mesh(MK.rbox(0.14, 0.82, 1.2, 0.04), MK.resin('#3a2619'))); leg.position.set(x, 0.65, 0); b.add(leg); }
      const lb = sh(new T.Mesh(new T.CylinderGeometry(0.16, 0.2, 0.05, 24), MK.metal('#b08a3c'))); lb.position.set(-0.7, 1.15, -0.2); b.add(lb);
      const ls = sh(new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.5, 10), MK.metal('#b08a3c'))); ls.position.set(-0.7, 1.4, -0.2); b.add(ls);
      const shade = sh(new T.Mesh(MK.rbox(0.7, 0.16, 0.3, 0.07), MK.resin('#1f6b4e'))); shade.position.set(-0.7, 1.7, -0.2); b.add(shade);
      const dl = MK.lamp('#ffe0a8', 1.4, 1.5); dl.position.set(-0.7, 1.56, -0.2); b.add(dl);
      const paper = sh(new T.Mesh(MK.rbox(0.55, 0.02, 0.4, 0.008), MK.matte('#efe6d2'))); paper.position.set(0.1, 1.135, 0.2); paper.rotation.y = 0.3; b.add(paper);
      const boss = MK.figure({ coat: '#3d4a63', hair: '#8b8d92', build: 1.12 }); boss.position.set(0.6, 0.24, -1.3); boss.userData.y0 = 0.24; b.add(boss);
      const bk2 = MK.bokeh(20, [30, 7, 6], ['#4f7dff', '#ffb060', '#9fc0ff'], 2.0); bk2.position.set(-8, 1.5, -18); b.add(bk2);
      const dust2 = MK.dust(60, [5, 3.6, 4], '#cfdcff'); dust2.position.set(0, 0.3, 0); b.add(dust2);
      Object.assign(s, { det, her, boss, wl, sl, dl, beam, dust1, dust2, bk1, bk2 });
      return s;
    },
    update(t, s, { camera }) {
      const k1 = t < at('walk') ? 1 : 1 - U.easeIO(U.clamp((t - at('walk')) / 1.0)), k2 = U.easeIO(U.clamp((t - at('walk', 1.3)) / 1.1));
      if (t < at('walk', 1.15)) MK.keyOn(s.L, S1, { k: k1, from: [-5, 12, 9] }); else MK.keyOn(s.L, S2, { k: k2 * 0.6, from: [7, 10, 8], rimFrom: [-8, 5, -7] });
      s.sl.userData.k(0.25 + 0.75 * k1 + Math.sin(t * 31) * 0.02); s.wl.userData.k(0.2 + 0.8 * k1); s.beam.material.opacity = 0.2 * (0.2 + 0.8 * k1); s.dl.userData.k(0.15 + 0.85 * k2);
      MK.pose(s.det, { turn: -0.5 + Math.sin(t * 0.5) * 0.08, nod: 0.12 + Math.sin(t * 0.9) * 0.03, armR: 0.2 });
      const peek = U.easeIO(U.clamp((t - at('street', 1.6)) / 1.2)); s.her.position.x = -2.6 + peek * 0.75; s.her.position.z = -1.9 + peek * 0.5; MK.pose(s.her, { turn: 0.15, lean: peek * 0.12 });
      MK.pose(s.boss, { turn: 0.5, nod: 0.1, armL: -0.5 - U.easeIO(U.clamp((t - at('office', 1.5)) / 0.8)) * 0.5 });
      s.dust1.userData.tick(t); s.dust2.userData.tick(t); s.bk1.userData.tick(t); s.bk2.userData.tick(t);
      VE.camAt(CAM, t, camera, 0.12);
    },
    hud(g, t, { W, H }) {
      MK.finish(g, t, { W, H });
      const bar = MK.bar(W, H), A = MK.GRADES.noir.accent;
      if (t < end('cover')) {
        const a = U.clamp((end('cover') - t) / 0.4); g.save(); g.globalAlpha = a;
        if (F.PORT) { MK.spaced(g, 'FILM STORY', W / 2, 230, 30, A, 'center'); MK.title(g, [['คดีใต้เสาไฟ', 150, '#fff'], ['เรื่องสมมติ (ตัวอย่างลุค)', 44, A, 400]], W / 2, 270, { align: 'center' }); }
        else { const gl = g.createLinearGradient(0, 0, W * 0.5, 0); gl.addColorStop(0, 'rgba(4,6,12,.82)'); gl.addColorStop(1, 'rgba(4,6,12,0)'); g.fillStyle = gl; g.fillRect(0, bar, W * 0.5, H - 2 * bar); MK.spaced(g, 'FILM STORY  ·  NOIR', 130, bar + 150, 28, A); MK.title(g, [['คดีใต้เสาไฟ', 150, '#fff'], ['เรื่องสมมติ (ตัวอย่างลุค)', 42, A, 400]], 126, bar + 200); }
        g.restore();
      }
      if (!F.PORT && t >= end('cover') && t < at('end')) MK.spaced(g, 'ACT 1  ·  ' + (t < at('walk', 1.2) ? 'THE STREET' : 'THE OFFICE'), 70, bar / 2, 22, 'rgba(255,255,255,.6)');
      if (t >= at('end')) { const a = U.clamp((t - at('end')) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#05070c'; g.fillRect(0, 0, W, H); g.globalAlpha = a; MK.spaced(g, 'TO BE CONTINUED', W / 2, H / 2 - 40, F.PORT ? 34 : 30, A, 'center'); MK.title(g, [['ชื่อช่อง', F.PORT ? 90 : 80, '#fff']], W / 2, H / 2, { align: 'center' }); g.restore(); }
    },
    caps,
    audio: [[at('street'), 'rain', { dur: 4 }], [at('walk'), 'glide', { dur: 1.2 }], [at('office'), 'soft'], [at('office', 1.6), 'bell']],
    bed: [FK.chillBed({ DUR, calm: () => true, voice: FK.voice(window.DATA && DATA.vo, B) })],
  });
})();
