/* gambit-demo: comic-studio set for the recap-look demo. Cast comes from gambit-full-x.js (build with CAST=gambit-full). */
const ctex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); return new T.CanvasTexture(c); };
Object.assign(ENVB, {
  cstudio(st) {
    const out = [], rnd = srnd(91), add = (o, x, y, z, ry) => { place(o, st, x, y, z); if (ry) o.rotation.y = ry; out.push(o); return o; };
    add(mk(new T.BoxGeometry(32, 0.2, 22), '#8a5f44'), 0, -0.1, -1);
    for (const [r, c, y] of [[3.7, '#c8405f', 0.03], [3.0, '#f0d9b0', 0.04], [2.3, '#c8405f', 0.05]]) add(mk(new T.CylinderGeometry(r, r, 0.05, 48), c), -0.6, y, -0.8);
    add(mk(new T.BoxGeometry(32, 10, 0.4), '#2f6c80'), 0, 5, -7.2); for (const sx of [-1, 1]) add(mk(new T.BoxGeometry(0.4, 10, 22), '#28596a'), sx * 16, 5, -1);
    add(mk(new T.BoxGeometry(32, 0.5, 0.3), '#12303c'), 0, 0.25, -6.9);
    /* dusk city window */
    const wt = ctex(512, 320, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3a2a7a'); g.addColorStop(0.55, '#d0508a'); g.addColorStop(1, '#ffb45a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = '#fff3c8'; x.beginPath(); x.arc(410, 70, 24, 0, 6.3); x.fill(); let s = 5; const nx = () => (s = (s * 16807) % 2147483647);
      for (let i = 0; i < 16; i++) { const bh = 60 + (nx() % 130); x.fillStyle = '#1a1438'; x.fillRect(i * 32, h - bh, 30, bh); x.fillStyle = 'rgba(255,220,140,.9)'; for (let j = 0; j < 5; j++) if (nx() % 3) x.fillRect(i * 32 + 5 + (j % 2) * 12, h - bh + 10 + j * 22, 6, 9); } });
    add(new T.Mesh(new T.PlaneGeometry(8, 5), basic('#ffffff', { map: wt })), 6.4, 4.7, -6.98);
    for (const [w, h, x, y] of [[8.5, 0.25, 0, 2.5], [8.5, 0.25, 0, -2.5], [0.25, 5.2, -4.1, 0], [0.25, 5.2, 4.1, 0], [0.16, 5, 0, 0], [8, 0.16, 0, 0.3]]) add(mk(new T.BoxGeometry(w, h, 0.2), '#f0e4cc'), 6.4 + x, 4.7 + y, -6.9);
    const wg = softSprite('rgba(255,140,170,1)', 0.32); wg.scale.setScalar(10); add(wg, 6.4, 4.4, -6.0);
    /* wall of pinned pages + string lights */
    for (let i = 0; i < 9; i++) { const pt = ctex(128, 180, (x, w, h) => { x.fillStyle = '#f4eede'; x.fillRect(0, 0, w, h); let s = 11 + i * 7; const nx = () => (s = (s * 16807) % 2147483647) / 2147483647; const cols = ['#d8486a', '#3a8ad0', '#f0c040', '#5ab08a', '#8a5ad0', '#f08a3a'];
        const rows = [[8, 8, 112, 60], [8, 74, 52, 50], [66, 74, 54, 50], [8, 130, 112, 42]]; for (const q of rows) { x.fillStyle = cols[Math.floor(nx() * 6)]; x.fillRect(q[0], q[1], q[2], q[3]); x.strokeStyle = '#15141a'; x.lineWidth = 4; x.strokeRect(q[0], q[1], q[2], q[3]); x.fillStyle = 'rgba(255,255,255,.75)'; x.beginPath(); x.arc(q[0] + q[2] * (0.3 + nx() * 0.4), q[1] + q[3] * 0.55, q[3] * 0.28, 0, 6.3); x.fill(); } });
      const m = new T.Mesh(new T.PlaneGeometry(1.2, 1.68), basic('#ddd6c6', { map: pt })); add(m, -8.6 + (i % 5) * 1.5 + (i > 4 ? 0.75 : 0), i > 4 ? 2.9 : 4.85, -6.97); m.rotation.z = (rnd() - 0.5) * 0.16; }
    for (let i = 0; i < 13; i++) { const u = i / 12, b = softSprite(['rgba(255,214,150,1)', 'rgba(255,150,190,1)', 'rgba(150,220,255,1)'][i % 3], 0.95); b.scale.setScalar(0.6); add(b, -9.6 + u * 10.4, 7.5 - Math.sin(u * Math.PI) * 0.8, -6.8); }
    /* drawing desk with lamp */
    const desk = new T.Group(), bd = mk(new T.BoxGeometry(3.0, 0.1, 1.9), '#e8dcc0'); bd.rotation.x = 0.5; bd.position.set(0, 1.75, 0); desk.add(bd);
    const pp = mk(new T.BoxGeometry(1.5, 0.02, 1.1), '#fbf7ec'); pp.rotation.x = 0.5; pp.position.set(-0.2, 1.84, 0.02); desk.add(pp);
    for (const x of [-1.3, 1.3]) for (const z of [-0.6, 0.6]) desk.add(at3(mk(new T.BoxGeometry(0.12, z < 0 ? 2.1 : 1.3, 0.12), '#5a4030'), x, (z < 0 ? 2.1 : 1.3) / 2, z));
    desk.add(at3(mk(new T.CylinderGeometry(0.04, 0.04, 1.1, 8), '#2a2e36'), 1.2, 2.7, -0.7), at3(mk(new T.ConeGeometry(0.32, 0.4, 14), '#ffd23f'), 0.95, 3.25, -0.5));
    add(desk, -5.4, 0, -4.9, 0.28); const dl = softSprite('rgba(255,224,150,1)', 0.5); dl.scale.setScalar(3.4); add(dl, -5.2, 3.0, -4.4);
    add(CF.shelf(1.3, '#6a4630'), -13.2, 0, -6.4); add(CF.shelf(1.3, '#6a4630'), 13.2, 0, -6.4);
    for (let i = 0; i < 6; i++) add(mk(new T.BoxGeometry(0.95, 0.14 + (i % 3) * 0.08, 1.25), ['#d8486a', '#3a8ad0', '#f0c040', '#5ab08a', '#8a5ad0', '#f08a3a'][i]), 9.6 + (i % 2) * 0.12, 0.1 + i * 0.2, -4.6, rnd());
    add(CF.sofa(0.62, '#e0a030'), 11.2, 0, -2.4, -0.95);
    const pl = new T.Group(); pl.add(at3(mk(new T.CylinderGeometry(0.45, 0.36, 0.8, 14), '#c86a4a'), 0, 0.4, 0)); for (let i = 0; i < 5; i++) { const lf = mk(new T.ConeGeometry(0.22, 1.5, 6), i % 2 ? '#3f9a6a' : '#2f7f58'); lf.position.set(Math.sin(i * 1.3) * 0.25, 1.4, Math.cos(i * 1.3) * 0.25); lf.rotation.set(Math.cos(i * 1.3) * 0.35, 0, -Math.sin(i * 1.3) * 0.35); pl.add(lf); } add(pl, -11.6, 0, -3.2);
    add(CF.lamp(1.15), -10.8, 0, 2.6); const fl = softSprite('rgba(255,210,150,1)', 0.6); fl.scale.setScalar(2.4); add(fl, -10.8, 3.9, 2.6);
    return out;
  },
});
