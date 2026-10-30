/* EXAMPLE video file for the family-health channel (kit: clay). Build: node build.js example-clay.js out.html --kit clay */
(function () {
  const T = THREE, P = CK.pal, U = VE.u;
  const CAM = [
    { t: 0, pos: [0, 2.6, 9], look: [0, 1.5, 0], fov: 40 }, { t: 3.4, pos: [0, 2.3, 6.5], look: [0, 1.5, 0], fov: 40 },
    { t: 3.6, pos: [0, 2.2, 6.2], look: [0, 1.6, 0], fov: 36 }, { t: 6.8, pos: [0, 2.1, 5.8], look: [0, 1.6, 0], fov: 34 },
    { t: 7.2, pos: [0, 2.6, 9], look: [0, 1.5, 0], fov: 40 }, { t: 9.5, pos: [0, 2.8, 8.2], look: [0, 1.6, 0], fov: 40 },
  ];
  VE.run({
    DUR: 11, file: 'example-clay', title: 'Example clay',
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'สุขภาพลูก', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามเพื่อดูแลลูกให้ปลอดภัย', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    setup({ scene }) {
      const key = CK.lights(T, scene);
      const room = CK.room(T); scene.add(room);
      const kid = CK.chibi(T, { hairStyle: 'pigtails', top: P.pink, bottom: P.lav, accessory: 'bow', hair: '#6b4a3a', scale: 1.0 }); kid.position.set(0, 0, 0); scene.add(kid);
      const viruses = []; for (let i = 0; i < 3; i++) { const v = CK.virus(T); v.visible = false; scene.add(v); viruses.push(v); }
      const bars = []; for (let i = 0; i < 3; i++) { const b = CK.bar(T, 0.7, 0.7, [P.mint, P.butter, P.pink][i]); b.position.set(-2.6 + i * 0.9, 0, 1.6); b.visible = false; scene.add(b); bars.push(b); }
      return { kid, viruses, bars, key, room };
    },
    update(t, s, { camera }) {
      s.kid.userData.setExpr(t < 3.5 ? 'happy' : t < 5 ? 'worried' : t < 7 ? 'sick' : 'giggle');
      s.kid.userData.tick(t, { wave: t < 3 });
      const danger = t >= 3.6 && t < 7;
      s.viruses.forEach((v, i) => { v.visible = danger; const a = t * 0.9 + i * 2.1; v.position.set(Math.cos(a) * 1.5, 2.2 + Math.sin(a * 1.3) * 0.5, Math.sin(a) * 0.9 + 0.4); v.rotation.y = a; });
      s.bars.forEach((b, i) => { b.visible = t > 7.4; b.scale.y = 0.2 + [1.8, 1.2, 0.7][i] * U.easeBack(U.clamp((t - 7.4 - i * 0.2) / 0.6)); });
      VE.camAt(CAM, t, camera, 0.15);
    },
    bgAt: (t) => (t >= 3.6 && t < 7 ? ['#5a4a7a', '#8a6a9a'] : ['#ffe8f0', '#fff4e6']),
    danger: (t) => (t >= 4.5 && t < 7 ? U.clamp((t - 4.5) / 0.6) : 0),
    caps: [
      { t0: 0.4, t1: 3.3, y: 300, lines: [[88, ['RSV ไวรัสที่', '#fff']], [88, ['ทุกคนในบ้านต้องรู้', '#ffd35e']]] },
      { t0: 3.7, t1: 6.9, y: 300, lines: [[78, ['ใบเตย ไอ มีไข้', '#fff']], [56, ['อาจไม่ใช่แค่หวัดธรรมดา', '#ffd0d8', 600]]] },
      { t0: 7.4, t1: 9.4, y: 300, lines: [[80, ['ล้างมือบ่อยๆ', '#fff']], [48, ['ลดการแพร่เชื้อในบ้าน', '#c8f5dc', 600]]], foot: 'ตัวอย่าง (ไม่ใช่ข้อมูลจริง)' },
    ],
    trans: [{ t: 3.2, dur: 0.7, type: 'iris', color: '#5a4a7a' }, { t: 7.0, dur: 0.6, type: 'iris', color: '#ffe8f0' }],
    audio: [[0.4, 'pop'], [1.0, 'giggle'], [3.2, 'whoosh'], [4.0, 'cough'], [4.6, 'heartbeat'], [5.4, 'heartbeat'], [6.2, 'heartbeat'], [7.0, 'whoosh'], [7.4, 'bubble'], [7.8, 'twinkle']],
    bed: [{ t0: 0, t1: 3.4, mood: 'light' }, { t0: 3.4, t1: 7, mood: 'tense' }, { t0: 7, t1: 9.5, mood: 'warm' }],
  });
})();
