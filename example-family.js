/* EXAMPLE (clay kit): 21s intro of the fixed family cast. Build: node build.js example-family.js out.html --kit clay */
(function () {
  const T = THREE, U = VE.u;
  const WHO = ['dad', 'mom', 'mama', 'nana', 'wawa'];
  const POS = { mom: [-1.35, -0.4], dad: [1.35, -0.5], mama: [0.85, 1.0], nana: [-0.05, 1.15], wawa: [-0.95, 1.25] };
  const HEAD = { dad: 2.72, mom: 2.53, mama: 1.7, nana: 1.43, wawa: 1.11 };
  const IN = { dad: 0.25, mom: 0.45, mama: 0.65, nana: 0.85, wawa: 1.05 }, CU = { dad: 2.6, mom: 5.4, mama: 8.2, nana: 11.0, wawa: 13.8 };
  const FW = { dad: 2.2, mom: 2.2, mama: 1.3, nana: 1.3, wawa: 1.3 };
  const close = (k, t) => { const p = POS[k], H = HEAD[k] + 0.7, d = H * 3.6, ly = H / 2 + 0.11 * 0.61 * d; const z = p[1] + FW[k]; return { t, pos: [p[0] * 0.8, ly + 0.4, z + d], look: [p[0], ly, z], fov: 34 }; };
  const WIDE = (t) => ({ t, pos: [0, 2.2, 13], look: [0, 1.5, 0], fov: 40 });
  const CAM = [
    WIDE(0), { t: 2.2, pos: [0, 2.3, 11.5], look: [0, 1.6, 0], fov: 40 },
    close('dad', 2.6), close('dad', 5.0),
    close('mom', 5.4), close('mom', 7.8),
    close('mama', 8.2), close('mama', 10.6),
    close('nana', 11.0), close('nana', 13.4),
    close('wawa', 13.8), close('wawa', 16.2),
    { t: 16.8, pos: [0, 2.2, 11.5], look: [0, 1.6, 0], fov: 40 }, { t: 20, pos: [0, 2.6, 13.5], look: [0, 1.6, 0], fov: 40 },
  ];
  VE.run({
    DUR: 21.5, file: 'family-intro', title: 'แนะนำตัว บ้านพ่อแม่หัวจะปวด',
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'แนะนำตัว', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    setup({ scene }) {
      CK.lights(T, scene); scene.add(CK.room(T, { wall: '#ffd9e4' }));
      const sofa = new T.Group(), sm = CK.mat(T, '#b9a4f0');
      const seat = new T.Mesh(new T.BoxGeometry(4.6, 0.7, 1.3), sm); seat.position.set(0, 0.35, -2.6); const back = new T.Mesh(new T.BoxGeometry(4.6, 1.4, 0.4), sm); back.position.set(0, 1.0, -3.2);
      sofa.add(seat, back); scene.add(sofa);
      const rug = new T.Mesh(new T.CylinderGeometry(3.2, 3.2, 0.04, 40), CK.mat(T, '#fff1c9')); rug.position.set(0, 0.02, 0.6); scene.add(rug);
      const c = {}; for (const k of WHO) { const g = CK.family(T, k); g.position.set(POS[k][0], 0, POS[k][1]); g.userData.base = g.scale.x; g.visible = false; scene.add(g); c[k] = g; }
      const hearts = []; for (let i = 0; i < 14; i++) { const h = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), CK.mat(T, i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 3.4, Math.cos(i * 3.3) * 0.8 + 0.4, (i * 0.37) % 1]; h.visible = false; scene.add(h); hearts.push(h); }
      return { c, hearts };
    },
    update(t, s, { camera }) {
      for (const k of WHO) {
        const g = s.c[k], t0 = IN[k], a = U.clamp((t - t0) / 0.5);
        g.visible = a > 0; if (!g.visible) continue;
        g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(a)));
        let x = POS[k][0], y = 0;
        const cu = t - CU[k]; if (cu > 0.3 && cu < 2.2) y = Math.abs(Math.sin(cu * (k === 'mama' ? 9 : 6))) * (k === 'mama' ? 0.35 : k === 'nana' ? 0.22 : 0.08);
        if (t > 16.6) y = Math.max(y, Math.abs(Math.sin((t - 16.6) * 5 + POS[k][0]))) * 0.12 * (t < 18.5 ? 1 : 0);
        const f = U.clamp((t - CU[k] + 0.4) / 0.5) * (1 - U.clamp((t - CU[k] - 2.3) / 0.5)); g.position.set(x, y, POS[k][1] + FW[k] * U.easeIO(f));
        g.rotation.y = 0.15 * Math.sin(t * 0.8 + POS[k][0]);
        const ex = k === 'dad' ? (t > 13.8 && t < 16.4 ? 'worried' : 'happy') : k === 'mom' ? (t > 8.4 && t < 13.6 ? 'worried' : 'happy') : k === 'wawa' ? (t > 14.6 && t < 15.6 ? 'giggle' : 'happy') : (t > 16.8 ? 'giggle' : 'happy');
        g.userData.setExpr(ex);
        g.userData.tick(t, { wave: (k === 'dad' && t > 3 && t < 4.6) || (k === 'mama' && t > 9.2 && t < 10.6) || (t > 17 && t < 19.5 && (k === 'nana' || k === 'mom')) });
      }
      s.hearts.forEach((h) => { const u = h.userData.s, a = (t - 16.8 - u[2] * 1.5) / 3.5; h.visible = a > 0 && a < 1; if (!h.visible) return; h.position.set(u[0], 0.5 + a * 4.2, u[1]); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); });
      VE.camAt(CAM, t, camera, 0.12);
    },
    bgAt: () => ['#ffe8f0', '#fff4e6'],
    caps: [
      { t0: 0.3, t1: 2.5, y: 300, lines: [[66, ['ทำความรู้จัก', '#fff']], [92, ['บ้านหัวจะปวด', '#ffd35e']]] },
      { t0: 2.8, t1: 5.2, y: 300, lines: [[96, ['พ่อ', '#fff']], [50, ['แว่นหนา ใจดี เล่นกับลูกเก่ง', '#ffe3ea', 600]]] },
      { t0: 5.6, t1: 8.0, y: 300, lines: [[96, ['แม่', '#fff']], [50, ['ผู้คุมกฎตัวจริงของบ้าน', '#ffe3ea', 600]]] },
      { t0: 8.4, t1: 10.8, y: 300, lines: [[88, ['พี่มามะ', '#fff']], [50, ['4 ขวบ พลังเหลือล้น', '#ffe3ea', 600]]] },
      { t0: 11.2, t1: 13.6, y: 300, lines: [[88, ['น้องนานะ', '#fff']], [50, ['2 ขวบ พี่ทำอะไร ทำตามหมด', '#ffe3ea', 600]]] },
      { t0: 14.0, t1: 16.4, y: 300, lines: [[88, ['น้องวาวา', '#fff']], [50, ['เบบี๋ ตัวเล็กสุด เสียงดังสุด', '#ffe3ea', 600]]] },
      { t0: 16.9, t1: 19.9, y: 300, lines: [[60, ['เรื่องสุขภาพลูก', '#fff']], [60, ['บ้านเราเล่าให้ฟัง', '#ffd35e']]] },
    ],
    trans: [],
    audio: [[0.25, 'pop'], [0.45, 'pop'], [0.65, 'pop'], [0.85, 'pop'], [1.05, 'pop'], [2.4, 'whoosh'], [2.9, 'boing'], [5.2, 'whoosh'], [5.7, 'boing'], [8.0, 'whoosh'], [8.5, 'boing'], [8.6, 'giggle'], [10.8, 'whoosh'], [11.3, 'boing'], [11.5, 'giggle'], [13.6, 'whoosh'], [14.6, 'giggle'], [16.5, 'whoosh'], [16.9, 'twinkle'], [17.3, 'heart'], [18.2, 'heart']],
    bed: [{ t0: 0, t1: 16.6, mood: 'light' }, { t0: 16.6, t1: 20, mood: 'warm' }],
  });
})();
