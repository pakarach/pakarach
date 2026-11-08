/* พ่อแม่หัวจะปวด — อุ้มลูกแต่ละวัย ท่าไหน (คอ / สะโพก / ข้อศอก / สมอง / หลังพ่อแม่) — zoom + X-ray close-ups
   Build: node build.js um-luk-tam-wai.js review-um-luk-tam-wai.html --kit clay --title "อุ้มลูกแต่ละวัย ท่าไหนถูก" */
(function () {
  const T = THREE, U = VE.u, PI = Math.PI, DATA = window.DATA || {};
  const BEATS = [['cover', 2.2], ['s1', 6], ['s2', 6.5], ['s3', 7.5], ['s4', 6.5], ['s5', 8], ['s6', 7.5], ['s7', 7.5], ['s8', 6], ['s9', 5], ['s10', 7.5], ['s11', 7.5], ['s12', 8.5], ['s13', 5], ['end', 1.6]];
  const B = VE.beats(BEATS, DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
  const ph = (id, t) => (t - at(id)) / dur(id), inB = (id, t) => t >= at(id) && t < end(id), P = (id, f) => at(id) + dur(id) * f;
  const REEL = !!(DATA.reel && DATA.reel.on), LD = REEL ? 40 : 0, LF = REEL ? 0.95 : 1;
  const MK = (DATA.vo && DATA.vo.marks) || {}, SPL = (DATA.vo && DATA.vo.split) || {};
  const TM = (id, i, frac) => MK[id] ? at(id) + B.lead + 0.06 + MK[id][i] - 0.12 : P(id, frac);
  const SP = (id, frac) => SPL[id] != null ? at(id) + B.lead + 0.06 + SPL[id] - 0.15 : P(id, frac);
  const ORDER = BEATS.map((b) => b[0]).filter((k) => k !== 'end');
  const beatAt = (t) => { for (const k of ORDER) if (t < end(k)) return k; return 's13'; };

  const FW = (cx, cz, width, top, tilt) => { tilt = tilt || 0.12; const k = 1080 / width, d = 960 / k / Math.tan(14.5 * PI / 180), yc = top - 130 / k; return { pos: [cx, yc + d * Math.sin(tilt), cz + d * Math.cos(tilt)], look: [cx, yc, cz], fov: 29 }; };
  /* zoom: put world point (px,py,pz) at screen y ~1060 with a frame `w` wide */
  const ZM = (px, py, pz, w, tilt) => FW(px, pz, w, py + (REEL ? 80 : 230) * w / 1080, tilt || 0.15);
  const RT = (top, d) => top - (REEL ? d : 0); /* FB build: lower `top` = content moves up */

  const NX = 60, HX = 75, EX = 90, BX = 105, LX = -60;
  const SH = {
    cover: [[0, FW(0.15, 0, 6.4, 4.1, 0.18)], [1, FW(0.2, 0, 6.0, 4.1, 0.18)]],
    s1: [[0, FW(LX, 0, 7.6, 3.3, 0.12)], [1, FW(LX, 0, 7.3, 3.3, 0.12)]],
    s2: [[0, FW(0, 0.2, 5.4, 3.95, 0.2)], [0.3, FW(0, 0.2, 5.2, 3.95, 0.2)], [0.58, ZM(-0.15, 1.05, 0.9, 3.1, 0.42)], [1, ZM(-0.15, 1.05, 0.9, 2.9, 0.42)]],
    s3: [[0, FW(NX, 0, 6.0, RT(4.6, 0.6), 0.1)], [1, FW(NX, 0, 5.6, RT(4.6, 0.6), 0.1)]],
    s4: [[0, FW(0.55, 0, 5.8, 4.1, 0.18)], [0.3, FW(0.55, 0, 5.6, 4.1, 0.18)], [0.58, ZM(1.4, 0.9, 0.4, 3.0, 0.3)], [1, ZM(1.4, 0.9, 0.4, 2.8, 0.3)]],
    s5: [[0, FW(HX + 0.45, 0, 8.2, RT(4.4, 1.1), 0.1)], [1, FW(HX + 0.45, 0, 7.9, RT(4.4, 1.1), 0.1)]],
    s6: [[0, FW(EX + 0.5, 0, 7.6, 3.85, 0.1)], [1, FW(EX + 0.5, 0, 7.3, 3.85, 0.1)]],
    s7: REEL ? [[0, FW(0.1, 0, 6.6, 4.6, 0.2)], [1, FW(0.1, 0, 6.3, 4.6, 0.2)]] : [[0, FW(0.1, 0, 6.6, 5.4, 0.2)], [1, FW(0.1, 0, 6.3, 5.4, 0.2)]],
    s8: [[0, FW(0, 0.6, 5.6, RT(4.9, 0.8), 0.15)], [1, FW(0, 0.6, 5.1, RT(4.9, 0.8), 0.15)]],
    s9: [[0, FW(-0.2, 0, 7.0, 5.6, 0.12)], [1, FW(-0.2, 0, 6.7, 5.6, 0.12)]],
    s10: [[0, FW(BX, 0, 6.0, RT(5.4, 1.3), 0.1)], [1, FW(BX, 0, 5.7, RT(5.4, 1.3), 0.1)]],
    s11: [[0, FW(-0.3, 0, 7.4, 4.1, 0.15)], [1, FW(-0.3, 0, 7.1, 4.1, 0.15)]],
    s12: [[0, FW(0.4, 0, 9.6, 6.6, 0.3)], [1, FW(0.4, 0, 9.3, 6.6, 0.3)]],
    s13: [[0, FW(0.4, 0, 9.0, 4.4, 0.2)], [1, FW(0.4, 0, 8.4, 4.4, 0.2)]],
  };
  const CUT = new Set(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12']);
  const CAM = [];
  for (const id of ORDER) { const t0 = at(id), d = dur(id); SH[id].forEach(([f, sh], i) => { const t = i === 0 ? (CUT.has(id) || id === 'cover' ? t0 : t0 + 0.75) : f >= 1 ? end(id) : t0 + d * f; CAM.push(Object.assign({ t }, sh)); }); }
  const trans = [...CUT].map((id) => ({ t: at(id) - 0.3, dur: 0.6, type: 'iris', color: '#ffe8f0' }));
  const danger = (t) => U.clamp((t - at('s7') - 0.2) / 0.6) * U.clamp((end('s7') - t) / 0.35);

  let CAMR = null; const V3 = new T.Vector3(), V4 = new T.Vector3();
  const proj = (v) => { V3.copy(v).project(CAMR); return [(V3.x + 1) * 540, (1 - V3.y) * 960, V3.z]; };
  const wp = (o, dx, dy, dz) => { o.getWorldPosition(V4); V4.x += dx || 0; V4.y += dy || 0; V4.z += dz || 0; return proj(V4); };

  const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); if (rep) { tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(rep[0], rep[1]); } return tx; };
  const UPV = new T.Vector3(0, 1, 0);
  const setLimb = (m, a, b) => { const d = new T.Vector3().subVectors(b, a), L = d.length(); m.position.copy(a).addScaledVector(d, 0.5); m.scale.set(1, Math.max(0.001, L), 1); m.quaternion.setFromUnitVectors(UPV, d.normalize()); };
  const limb = (r, mat) => new T.Mesh(new T.CylinderGeometry(r, r, 1, 18), mat);
  const v = (x, y, z) => new T.Vector3(x, y, z);
  const lerpV = (a, b, k) => new T.Vector3().lerpVectors(a, b, k);

  VE.registerSfx('click', (t) => { VE.audio.tone(t, 1400, 0.05, { vol: 0.12 }); VE.audio.noise(t, 0.05, { type: 'highpass', f: 3000, vol: 0.12 }); });

  VE.run({
    DUR, file: 'um-luk-tam-wai', title: 'อุ้มลูกแต่ละวัย ท่าไหนถูก', coverAt0: true,
    brand: { name: 'พ่อแม่หัวจะปวด', series: 'อุ้มลูกตามวัย', icon: 'heart', color: '#ff8fab', bg: ['#ffe8f0', '#fff4e6'], endLine: 'ติดตามไว้ หัวจะได้ไม่ปวด', motif: { notes: ['C5', 'E5', 'G5'], gap: 0.09, timbre: 'bell' } },
    vignette: 'rgba(255,150,190,.16)',
    setup({ scene }) {
      const key = CK.lights(T, scene); const hemi = scene.children.find((o) => o.isHemisphereLight);
      const M = (c, x) => CK.mat(T, c, x);
      /* ===== stage 0: living room ===== */
      const room = CK.room(T, { wall: '#ffcfe0', wain: '#9fe3cf', floor: '#e9b483', rug: '#7fb6ef', winX: 3.4 }); scene.add(room);
      const sofa = new T.Group(), sm = M('#b9a4f0'); const seat = new T.Mesh(new T.BoxGeometry(4.2, 0.7, 1.2), sm); seat.position.set(-0.6, 0.35, -3.1); const back = new T.Mesh(new T.BoxGeometry(4.2, 1.4, 0.4), sm); back.position.set(-0.6, 1.0, -3.7); sofa.add(seat, back); scene.add(sofa);
      const mk = (who, extra) => { const g = CK.family(T, who, extra); g.userData.base = g.scale.x; scene.add(g); return g; };
      const C = { dad: mk('dad'), mom: mk('mom'), mama: mk('mama'), nana: mk('nana'), wawa: mk('wawa') };
      C.dad.rotation.order = 'YXZ';
      C.lichi = CK.neighbor(T, 1, { scale: 1.32 }); C.lichi.userData.base = 1.32; scene.add(C.lichi);
      C.chom = CK.neighbor(T, 0, { scale: 1.26, hairStyle: 'bob', hair: '#d9d3e0', lashes: true, brow: '#a89fb0', top: '#5cc99a', bottom: '#8b6fd6' }); C.chom.userData.base = 1.26; scene.add(C.chom);
      /* newborn (flashback) in mom's arms */
      const nb = CK.family(T, 'wawa'); nb.scale.setScalar(0.56 / 1.3); C.mom.add(nb);
      /* wawa on dad's hip, with M legs */
      const wh = CK.family(T, 'wawa'); wh.scale.setScalar(0.62 / 1.4); C.dad.add(wh);
      const hideLegs = (g) => g.children.forEach((m) => { if (!m.isMesh) return; const ty = m.geometry.type, ax = Math.abs(m.position.x); if ((ty === 'CylinderGeometry' && Math.abs(ax - 0.17) < 0.01) || (ty === 'SphereGeometry' && Math.abs(ax - 0.18) < 0.01 && m.position.y < 0.1)) m.visible = false; });
      hideLegs(wh);
      const pinkM = M('#ffa6c6');
      for (const s of [-1, 1]) {
        const hip = v(s * 0.2, 0.3, 0.05), kn = v(s * 0.56, 0.44, 0.42), ft = v(s * 0.6, 0.1, 0.5);
        const th = limb(0.13, pinkM); setLimb(th, hip, kn); wh.add(th); const kb = new T.Mesh(new T.SphereGeometry(0.14, 14, 10), pinkM); kb.position.copy(kn); wh.add(kb);
        const sn = limb(0.11, pinkM); setLimb(sn, kn, ft); wh.add(sn); const fb = new T.Mesh(new T.SphereGeometry(0.15, 14, 10), pinkM); fb.scale.set(1, 0.7, 1.3); fb.position.copy(ft); wh.add(fb);
      }
      /* dad's spine (X-ray overlay, s11) */
      const spine = new T.Group(); C.dad.add(spine); const vert = [], discs = [];
      const vm = new T.MeshBasicMaterial({ color: '#fff3d6', depthTest: false, transparent: true, opacity: 0.95 });
      for (let i = 0; i < 7; i++) { const b = new T.Mesh(new T.BoxGeometry(0.22, 0.1, 0.2), vm.clone()); b.renderOrder = 20; spine.add(b); vert.push(b); }
      for (let i = 0; i < 6; i++) { const d = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.05, 14), new T.MeshBasicMaterial({ color: '#ff8fab', depthTest: false, transparent: true })); d.renderOrder = 21; spine.add(d); discs.push(d); }
      const spineGlow = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 1.3, 20, 1, true), new T.MeshBasicMaterial({ color: '#ff5f6d', depthTest: false, transparent: true, opacity: 0.25, side: T.DoubleSide })); spineGlow.renderOrder = 19; spine.add(spineGlow);

      /* ===== stage L: weight ladder (x = -60) ===== */
      const dotT = (base, dot, rep) => ctex(256, 256, (x) => { x.fillStyle = base; x.fillRect(0, 0, 256, 256); x.fillStyle = dot; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(32 + i * 64 + (j % 2) * 32, 32 + j * 64, 12, 0, 7); x.fill(); } }, rep);
      const platL = new T.Mesh(new T.BoxGeometry(16, 0.3, 12), M('#ff9ebd')); platL.position.set(LX, -0.15, 0); scene.add(platL);
      const wallL = new T.Mesh(new T.BoxGeometry(16, 10, 0.3), M('#ffffff', { map: dotT('#ffd1e3', '#ffffff', [7, 4]) })); wallL.position.set(LX, 4.5, -4); scene.add(wallL);
      const KG = [3.3, 9.6, 12.2], LXS = [LX - 2.6, LX, LX + 2.6], BC = ['#ffc94d', '#ff8fab', '#79dcb4'];
      const lbars = KG.map((kg, i) => { const b = CK.bar(T, 1.7, 1.3, BC[i]); b.position.set(LXS[i], 0, 0); b.scale.y = 0.01; scene.add(b); return b; });
      const Lk = [CK.family(T, 'wawa', { scale: 0.44 }), CK.family(T, 'wawa'), CK.family(T, 'nana')]; Lk.forEach((g) => { g.userData.base = g.scale.x; scene.add(g); });

      /* ===== X-ray stage (x 52..112) ===== */
      const gridT = ctex(256, 256, (x) => { x.fillStyle = '#8fc4f5'; x.fillRect(0, 0, 256, 256); x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 4; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, 256); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(256, i * 64); x.stroke(); } }, [28, 4]);
      const xw = new T.Mesh(new T.BoxGeometry(64, 12, 0.3), M('#ffffff', { map: gridT })); xw.position.set(82, 5, -4.2); scene.add(xw);
      const xf = new T.Mesh(new T.BoxGeometry(64, 0.3, 12), M('#7aa9e8')); xf.position.set(82, -0.15, 0); scene.add(xf);
      const boneM = M('#fff1d6', { roughness: 0.35 }), skin2 = M('#f5c09a');
      const mkHand = (sc) => { const h = new T.Group(); const palm = new T.Mesh(new T.SphereGeometry(0.5, 20, 14), skin2); palm.scale.set(1, 0.34, 0.8); h.add(palm); for (let i = 0; i < 4; i++) { const f = limb(0.1, skin2); setLimb(f, v(0.35, 0, -0.27 + i * 0.18), v(0.8, 0.05, -0.3 + i * 0.2)); h.add(f); const tip = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), skin2); tip.position.set(0.8, 0.05, -0.3 + i * 0.2); h.add(tip); } const th = limb(0.11, skin2); setLimb(th, v(0.1, 0, 0.35), v(0.45, 0.12, 0.62)); h.add(th); h.scale.setScalar(sc || 1); return h; };
      /* -- NECK (x=60): big wawa, floppy head, vertebrae, supporting hand -- */
      const cush = new T.Mesh(new T.SphereGeometry(1, 28, 18), M('#ffd36e')); cush.scale.set(2.2, 0.5, 1.4); cush.position.set(NX, 0.35, 0); scene.add(cush);
      const bigW = CK.family(T, 'wawa', { scale: 1.75 }); bigW.userData.base = 1.75; scene.add(bigW);
      const neck = new T.Group(); bigW.add(neck); const nv = [];
      for (let i = 0; i < 5; i++) { const d = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.07, 16), new T.MeshBasicMaterial({ color: '#fff3d6', depthTest: false, transparent: true })); d.renderOrder = 20; neck.add(d); nv.push(d); }
      const musc = [-1, 1].map(() => { const m = limb(0.035, new T.MeshBasicMaterial({ color: '#ff5f86', depthTest: false, transparent: true, opacity: 0.85 })); m.renderOrder = 19; neck.add(m); return m; });
      const handN = mkHand(1.5); scene.add(handN);
      /* -- LIFT close-up (room, s8): big nana + dad's two hands under the armpits -- */
      const bigN = CK.family(T, 'nana', { scale: 1.45 }); bigN.userData.base = 1.45; scene.add(bigN);
      const sleeveM = M('#cfd3dd');
      const liftH = [-1, 1].map((sd) => { const h = mkHand(1.15); const fa = limb(0.2, skin2); setLimb(fa, v(-0.35, 0, 0), v(-1.5, -0.45, 0)); h.add(fa); const sl = limb(0.3, sleeveM); setLimb(sl, v(-1.45, -0.43, 0), v(-3.8, -1.3, 0)); h.add(sl); scene.add(h); return h; });
      /* -- HIP (x=75): two lower-body skeletons, wrong (left) and M (right) -- */
      const hipModel = (x) => {
        const g = new T.Group(); g.position.set(x, 0, 0); scene.add(g);
        const dia = new T.Mesh(new T.SphereGeometry(1, 28, 18), M('#ffffff', { transparent: true, opacity: 0.55 })); dia.scale.set(1.25, 0.75, 0.75); dia.position.set(0, 2.85, 0); g.add(dia);
        const pel = new T.Mesh(new T.TorusGeometry(0.55, 0.14, 12, 28, PI), boneM); pel.rotation.z = PI; pel.position.set(0, 3.15, 0); pel.scale.set(1.25, 0.9, 1); g.add(pel);
        const out = { g, s: [] };
        for (const s of [-1, 1]) {
          const cup = new T.Mesh(new T.SphereGeometry(0.34, 20, 14, 0, 2 * PI, 0, PI * 0.62), M('#ff8fab', { side: T.DoubleSide, transparent: true, opacity: 0.85 })); cup.rotation.z = s * 2.2; cup.position.set(s * 0.72, 2.85, 0); g.add(cup);
          const ball = new T.Mesh(new T.SphereGeometry(0.26, 20, 14), boneM); g.add(ball);
          const fem = limb(0.13, boneM), knee = new T.Mesh(new T.SphereGeometry(0.2, 16, 12), boneM), shin = limb(0.1, boneM), foot = new T.Mesh(new T.SphereGeometry(0.24, 16, 12), M('#ffa6c6'));
          foot.scale.set(0.9, 0.6, 1.4); g.add(fem, knee, shin, foot);
          const ring = new T.Mesh(new T.TorusGeometry(0.42, 0.05, 8, 32), new T.MeshBasicMaterial({ color: '#5fd38d', transparent: true, opacity: 0, depthTest: false })); ring.renderOrder = 22; ring.position.set(s * 0.72, 2.85, 0.1); g.add(ring);
          out.s.push({ s, ball, fem, knee, shin, foot, ring });
        }
        return out;
      };
      const hipBad = hipModel(HX - 2.0), hipOk = hipModel(HX + 2.0);
      /* -- ELBOW (x=90): humerus | radius + ulna, annular ligament, pulling hand -- */
      const elb = new T.Group(); elb.position.set(EX, 0, 0); scene.add(elb);
      const sleeve = new T.Mesh(new T.CylinderGeometry(0.62, 0.62, 3.2, 24, 1, true), M('#79dcb4', { transparent: true, opacity: 0.35, side: T.DoubleSide })); sleeve.rotation.z = PI / 2; sleeve.position.set(-1.9, 2.6, 0); sleeve.scale.y = 0.75; elb.add(sleeve);
      const skinTube = new T.Mesh(new T.CylinderGeometry(0.5, 0.45, 3.6, 24, 1, true), M('#ffd6bd', { transparent: true, opacity: 0.28, side: T.DoubleSide, depthWrite: false })); skinTube.rotation.z = PI / 2; skinTube.position.set(0.2, 2.6, 0); skinTube.scale.y = 1.25; elb.add(skinTube);
      const hum = limb(0.24, boneM); setLimb(hum, v(-3.0, 2.6, 0), v(-0.35, 2.6, 0)); elb.add(hum);
      const humK = new T.Mesh(new T.SphereGeometry(0.38, 20, 14), boneM); humK.scale.set(0.8, 1.15, 1); humK.position.set(-0.3, 2.6, 0); elb.add(humK);
      const fore = new T.Group(); elb.add(fore);
      const uln = limb(0.15, boneM); setLimb(uln, v(0.0, 2.38, -0.12), v(2.5, 2.45, -0.12)); fore.add(uln);
      const radG = new T.Group(); fore.add(radG);
      const rad = limb(0.15, boneM); setLimb(rad, v(0.12, 2.86, 0.14), v(2.5, 2.75, 0.14)); radG.add(rad);
      const radH = new T.Mesh(new T.CylinderGeometry(0.27, 0.27, 0.2, 22), M('#ffe6b8')); radH.rotation.z = PI / 2; radH.position.set(0.12, 2.86, 0.14); radG.add(radH);
      const lig = new T.Mesh(new T.TorusGeometry(0.31, 0.075, 10, 32), M('#ff5f86', { emissive: '#ff2050', emissiveIntensity: 0 })); lig.rotation.y = PI / 2; lig.position.set(0.42, 2.86, 0.14); elb.add(lig);
      const kidHand = new T.Mesh(new T.SphereGeometry(0.42, 18, 14), M('#ffd6bd')); kidHand.scale.set(1.15, 0.95, 0.8); kidHand.position.set(2.9, 2.6, 0); fore.add(kidHand);
      const bigHand = mkHand(1.3); bigHand.rotation.set(PI / 2, 0, 0); bigHand.position.set(3.2, 2.6, 0.05); bigHand.scale.setScalar(0.95); fore.add(bigHand);
      const arrow = new T.Group(); const ash = limb(0.12, M('#ff5f6d')); setLimb(ash, v(0, 0, 0), v(1.1, 0, 0)); const ahd = new T.Mesh(new T.ConeGeometry(0.3, 0.55, 18), M('#ff5f6d')); ahd.rotation.z = -PI / 2; ahd.position.set(1.3, 0, 0); arrow.add(ash, ahd); arrow.position.set(EX + 1.6, 3.85, 0.4); scene.add(arrow);
      const flash = new T.Mesh(new T.SphereGeometry(0.75, 20, 14), new T.MeshBasicMaterial({ color: '#ff3b5c', transparent: true, opacity: 0, depthWrite: false })); flash.position.set(EX + 0.2, 2.75, 0.3); scene.add(flash);
      /* -- BRAIN (x=105): see-through head, wobbly brain -- */
      const bb = new T.Group(); bb.position.set(BX, 0, 0); scene.add(bb);
      const bodyB = new T.Mesh(new T.SphereGeometry(1, 28, 18), M('#ffa6c6')); bodyB.scale.set(1.15, 0.95, 0.9); bodyB.position.set(0, 0.95, 0); bb.add(bodyB);
      const headB = new T.Group(); headB.position.set(0, 3.1, 0); bb.add(headB);
      const skull = new T.Mesh(new T.SphereGeometry(1.7, 40, 30), M('#ffd6bd', { transparent: true, opacity: 0.32, depthWrite: false })); skull.scale.set(1.08, 0.95, 1); headB.add(skull);
      const skullRim = new T.Mesh(new T.SphereGeometry(1.72, 40, 30), new T.MeshBasicMaterial({ color: '#ffffff', wireframe: true, transparent: true, opacity: 0.08 })); skullRim.scale.copy(skull.scale); headB.add(skullRim);
      for (const s of [-1, 1]) { const c = new T.Mesh(new T.ConeGeometry(0.3, 0.6, 16), M('#ff6f9f')); c.rotation.z = s * PI / 2; c.scale.z = 0.55; c.position.set(0.55 + s * 0.3, 1.55, 0.35); headB.add(c); }
      const bknot = new T.Mesh(new T.SphereGeometry(0.15, 12, 10), M('#ff6f9f')); bknot.position.set(0.55, 1.55, 0.4); headB.add(bknot);
      const bg = new T.SphereGeometry(1.12, 56, 40), bp = bg.attributes.position;
      for (let i = 0; i < bp.count; i++) { const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i), r = Math.hypot(x, y, z), nx = x / r, ny = y / r, nz = z / r; const k = 1 + 0.055 * Math.sin(9 * nx + 4 * ny) * Math.sin(8 * ny + 6 * nz) + 0.03 * Math.sin(17 * nz + 5 * nx); bp.setXYZ(i, nx * r * k, ny * r * k * 0.9, nz * r * k); }
      bg.computeVertexNormals();
      const brain = new T.Mesh(bg, M('#ff9eb8', { roughness: 0.45 })); headB.add(brain);
      const bEyes = []; for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.11, 12, 10), M('#3a2f3f')); e.position.set(s * 0.32, 0.12, 1.02); brain.add(e); bEyes.push(e); }
      const hitL = new T.Mesh(new T.SphereGeometry(0.55, 18, 12), new T.MeshBasicMaterial({ color: '#ff3b5c', transparent: true, opacity: 0, depthWrite: false })); headB.add(hitL);
      const hitR = hitL.clone(); hitR.material = hitL.material.clone(); headB.add(hitR);
      const hearts = []; for (let i = 0; i < 8; i++) { const h = new T.Mesh(new T.SphereGeometry(0.13, 10, 8), M(i % 2 ? '#ff8fab' : '#ffc94d')); h.userData.s = [Math.sin(i * 7.1) * 2.2, (i * 0.37) % 1]; h.visible = false; scene.add(h); hearts.push(h); }
      return { key, hemi, room, C, nb, wh, bigN, liftH, spine, vert, discs, spineGlow, lbars, Lk, bigW, nv, musc, handN, hipBad, hipOk, elb, fore, radG, lig, arrow, flash, headB, brain, bEyes, hitL, hitR, hearts };
    },
    update(t, s, { camera }) {
      CAMR = camera; const bt = beatAt(t), C = s.C;
      /* ---------- lights / night ---------- */
      const dn = danger(t);
      s.hemi.intensity = U.lerp(0.48, 0.24, dn); s.key.intensity = U.lerp(0.68, 0.36, dn);
      const wc = new T.Color('#ffffff').lerp(new T.Color('#6f6aa8'), dn); s.room.userData.wall.material.color.copy(wc); s.room.userData.floor.material.color.copy(wc); s.room.userData.wain.material.color.set('#9fe3cf').lerp(new T.Color('#4a5f7a'), dn);

      /* ---------- living room cast ---------- */
      const ROOM = ['dad', 'mom', 'mama', 'nana', 'wawa', 'lichi', 'chom'];
      const st = {};
      const def = (k, x, z, ex, o) => (st[k] = Object.assign({ x, y: 0, z, ry: 0, rx: 0, rz: 0, ex: ex || 'happy' }, o || {}));
      let nbOn = false, whOn = false, spineOn = 0;
      if (bt === 'cover') {
        def('dad', 1.55, 0, 'happy', { ry: -0.4, a1: [-1.3, -0.15] }); def('nana', 0, 0.25, 'giggle', { lift: true });
      } else if (bt === 's2') {
        def('mom', 0, 0.2, 'happy', { hx: 0.22, a1: [-0.15, -0.95], a2: [0.1, -0.95] }); nbOn = true;
      } else if (bt === 's4') {
        def('dad', 0, 0, 'happy', { ry: 0.25, a1: [0.5, -0.9], a2: [0.55, -0.55] }); whOn = true;
      } else if (bt === 's7') {
        def('dad', 1.15, 0, 'worried', { y: -0.42, ry: -0.5, a1: [-1.0, -0.7] }); def('nana', -0.55, 0.35, 'cry', { ry: 0.25, a1: [0.75, -1.0], a2: [0.06, 0.05] });
      } else if (bt === 's9') {
        const p = ph('s9', t);
        def('lichi', 1.0, 0, 'giggle', { a1: [-2.5, 0.3], a2: [2.5, 0.3] }); def('mom', -1.9, 0.2, p > 0.35 ? 'worried' : 'happy', { ry: 0.45, a2: p > 0.35 ? [1.9, 0.6] : null });
        def('wawa', 1.0, 0.25, 'giggle', { toss: p });
      } else if (bt === 's11') {
        const p = ph('s11', t), q = SP('s11', 0.5), sq = U.easeIO(U.clamp((t - q) / 0.7));
        spineOn = U.clamp((p - 0.12) / 0.1);
        def('dad', 1.35, -0.1, sq > 0.5 ? 'happy' : 'worried', { ry: U.lerp(-1.15, -0.35, sq), rx: U.lerp(0.45, 0.04, sq), y: -0.36 * sq, a1: [U.lerp(0.1, -0.2, sq), U.lerp(-0.6, -0.2, sq)], a2: [U.lerp(-0.1, 0.4, sq), U.lerp(-0.6, -0.3, sq)], bend: 1 - sq, hug: sq });
        def('nana', U.lerp(-1.25, -0.3, sq), U.lerp(0.35, 0.35, sq), sq > 0.5 ? 'giggle' : 'happy', { ry: U.lerp(0.6, 0.4, sq) });
        if (t > q) def('chom', -2.75, -0.4, 'happy', { ry: 0.5, a1: [-0.9, -0.3], pop: U.clamp((t - q - 0.3) / 0.4) });
      } else if (bt === 's12' || bt === 's13') {
        def('mom', -1.9, -0.7, 'happy'); def('dad', 1.85, -0.7, 'happy', { ry: 0.2, a1: [0.5, -0.9], a2: [0.55, -0.55] }); whOn = true;
        def('nana', -1.4, 1.3, bt === 's13' ? 'giggle' : 'happy'); def('mama', 0.15, 1.35, 'giggle', { wave: bt === 's13' });
      }
      for (const k of ROOM) {
        const g = C[k], q = st[k]; g.visible = !!q; if (!q) continue;
        g.position.set(q.x, q.y, q.z); g.rotation.set(q.rx, q.ry, q.rz);
        g.userData.setExpr(q.ex); g.userData.tick(t, { wave: q.wave }); g.userData.arm1.scale.y = 1; g.userData['arm-1'].scale.y = 1;
        if (q.a1) { g.userData['arm-1'].rotation.z = q.a1[0] + 0.04 * Math.sin(t * 3); g.userData['arm-1'].rotation.x = q.a1[1]; }
        if (q.a2) { g.userData.arm1.rotation.z = q.a2[0] + 0.04 * Math.sin(t * 3 + 1); g.userData.arm1.rotation.x = q.a2[1]; }
        if (q.hx) g.userData.head.rotation.x = q.hx;
        if (q.pop != null) g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(q.pop)));
        else g.scale.setScalar(g.userData.base);
      }
      /* cover: nana hangs from dad's hand by one arm */
      if (st.nana && st.nana.lift) {
        const n = C.nana; n.userData.arm1.rotation.z = 2.45; n.userData.arm1.rotation.x = 0.15; n.userData['arm-1'].rotation.z = -0.9 - 0.15 * Math.sin(t * 7);
        n.rotation.z = -0.22 + 0.05 * Math.sin(t * 5); n.position.set(0, 0, 0.25);
        C.dad.updateMatrixWorld(true); n.updateMatrixWorld(true); const hd = new T.Vector3(), hn = new T.Vector3(); C.dad.userData['hand-1'].getWorldPosition(hd); n.userData.hand1.getWorldPosition(hn);
        n.position.add(hd.sub(hn)); n.position.z = 0.25;
      }
      /* s8: big nana lifted by dad's hands under the armpits */
      { const on = bt === 's8', g = s.bigN; g.visible = on; s.liftH.forEach((h) => (h.visible = on));
        if (on) { const p = ph('s8', t), slide = U.easeOut(U.clamp((p - 0.05) / 0.15)), up = U.easeIO(U.clamp((p - 0.25) / 0.3)) * 0.85;
          g.position.set(0, up + 0.04 * Math.sin(t * 3) * up, 0.6); g.rotation.set(0, 0, 0);
          g.userData.setExpr(p > 0.4 ? 'giggle' : 'happy'); g.userData.tick(t, {}); g.userData.arm1.rotation.z = 1.35 + 0.1 * Math.sin(t * 4) * up; g.userData['arm-1'].rotation.z = -1.35 - 0.1 * Math.sin(t * 4 + 1) * up;
          const ay = g.position.y + 0.8 * 1.45, half = 0.47 * 1.45;
          s.liftH.forEach((h, i) => { const sd = i ? 1 : -1; h.position.set(sd * (half + 0.3 + 2.2 * (1 - slide)), ay + 0.05, 0.45); h.rotation.set(0.1, i ? PI : 0, 1.05); }); } }
      /* s9: wawa tossed */
      if (st.wawa && st.wawa.toss != null) { const p = st.wawa.toss, cyc = (p * 2.3) % 1, h = 4 * cyc * (1 - cyc); C.wawa.position.set(1.0, 3.55 + 1.2 * h, 0.35); C.wawa.rotation.z = 0.25 * Math.sin(p * 14); C.wawa.userData.arm1.rotation.z = 2.3; C.wawa.userData['arm-1'].rotation.z = -2.3; }
      /* s11: dad holding nana close after squat */
      if (bt === 's11' && st.dad && st.dad.hug > 0.3) { /* dad's screen-left arm reaches around nana's near shoulder (simple aim IK, slight stretch) */
        const d = C.dad, arm = d.userData['arm-1']; d.updateMatrixWorld(true); C.nana.updateMatrixWorld(true);
        const sh = arm.getWorldPosition(new T.Vector3()), tg = C.nana.localToWorld(new T.Vector3(0.42, 0.85, -0.05));
        const dir = tg.clone().sub(sh), dist = dir.length(); dir.applyQuaternion(d.quaternion.clone().invert()).normalize();
        const k = U.clamp((st.dad.hug - 0.3) / 0.5); arm.rotation.set(U.lerp(arm.rotation.x, Math.atan2(-dir.z, -dir.y), k), 0, U.lerp(arm.rotation.z, Math.asin(U.clamp(dir.x, -1, 1)), k));
        arm.scale.y = U.lerp(1, U.clamp(dist / (0.66 * d.scale.x), 1, 1.3), k); }
      /* newborn cradle */
      s.nb.visible = nbOn;
      if (nbOn) { s.nb.position.set(0.45, 0.78, 0.6); s.nb.rotation.set(-0.45, 0, PI / 2 - 0.32); s.nb.userData.setExpr(ph('s2', t) > 0.55 ? 'sleepy' : 'happy'); s.nb.userData.tick(t, { breath: 0.35 }); s.nb.userData.arm1.rotation.z = 0.9; s.nb.userData['arm-1'].rotation.z = -0.9; }
      s.wh.visible = whOn;
      if (whOn) { s.wh.position.set(0.92, 0.5, 0.3); s.wh.rotation.set(0, -0.5, 0); s.wh.userData.setExpr(bt === 's13' ? 'giggle' : 'happy'); s.wh.userData.tick(t, {}); s.wh.userData['arm-1'].rotation.z = -1.1; s.wh.userData['arm-1'].rotation.x = -0.6; }
      /* dad's spine overlay */
      s.spine.visible = spineOn > 0.01;
      if (s.spine.visible) {
        const bend = st.dad ? st.dad.bend : 0, col = new T.Color('#5fd38d').lerp(new T.Color('#ff5f6d'), bend);
        s.vert.forEach((b, i) => { const u = i / 6, y = 0.5 + u * 1.15, z = -0.36 - 0.22 * Math.sin(PI * u) * bend; b.position.set(0, y, z); b.rotation.x = -0.5 * Math.cos(PI * u) * bend; b.material.opacity = 0.95 * spineOn; });
        s.discs.forEach((d, i) => { const u = (i + 0.5) / 6, y = 0.5 + u * 1.15, z = -0.36 - 0.22 * Math.sin(PI * u) * bend; d.position.set(0, y, z); d.rotation.x = -0.5 * Math.cos(PI * u) * bend; d.material.color.copy(col); d.material.opacity = spineOn; d.scale.set(1, 1 - 0.45 * bend, 1); });
        s.spineGlow.position.set(0, 1.08, -0.42); s.spineGlow.material.color.copy(col); s.spineGlow.material.opacity = (0.18 + 0.12 * Math.sin(t * 8) * bend) * spineOn;
      }

      /* ---------- weight ladder ---------- */
      { const p = inB('s1', t) ? ph('s1', t) : t > end('s1') ? 1 : 0;
        s.lbars.forEach((b, i) => { const k = U.easeOut(U.clamp((p - 0.06 - i * 0.12) / 0.3)); b.scale.y = Math.max(0.01, [3.3, 9.6, 12.2][i] * 0.15 * k); const g = s.Lk[i]; g.position.set(b.position.x, b.scale.y, 0.1); g.visible = k > 0.02; g.scale.setScalar(g.userData.base * Math.max(0.01, U.easeBack(U.clamp(k * 1.5)))); g.userData.setExpr(i === 0 ? 'sleepy' : 'happy'); g.userData.tick(t, { wave: i === 2 && p > 0.4 && p < 0.6 }); }); }

      /* ---------- NECK ---------- */
      { const p = inB('s3', t) ? ph('s3', t) : 0, q = SP('s3', 0.5), sup = U.easeIO(U.clamp((t - q + 0.2) / 0.8)), g = s.bigW;
        g.position.set(NX - 0.35, 0.55 + 0.35 * Math.max(0, Math.sin(p * PI * 3)) * (1 - sup), 0.1); g.rotation.set(0, 0, -0.42);
        g.userData.setExpr(sup > 0.5 ? 'happy' : p > 0.08 ? 'worried' : 'happy'); g.userData.tick(t, { breath: 0.5 }); g.userData.arm1.rotation.z = 1.0; g.userData['arm-1'].rotation.z = -1.0;
        const flop = (1 - sup) * (0.5 + 0.18 * Math.sin(t * 5.5)) * U.clamp(p / 0.1) * -1, hd = g.userData.head, R = 0.52, Y0 = 1.037;
        hd.position.set(-Math.sin(flop) * R, Y0 + Math.cos(flop) * R, 0); hd.rotation.z = flop;
        s.nv.forEach((d, i) => { const u = (i + 0.5) / 5, a = flop * u; d.position.set(-Math.sin(a) * R * u * 0.95, Y0 - 0.1 + Math.cos(a) * R * u * 0.95, 0.15); d.rotation.z = a; d.material.opacity = 0; });
        s.musc.forEach((m, i) => { const sx = i ? 1 : -1, a = flop; setLimb(m, v(sx * 0.2, Y0 - 0.15, 0.15), v(-Math.sin(a) * R + sx * 0.2 * Math.cos(a), Y0 + Math.cos(a) * R + sx * 0.2 * Math.sin(a), 0.15)); m.material.opacity = 0; });
        g.updateMatrixWorld(true); const hp = new T.Vector3(); hd.getWorldPosition(hp);
        s.handN.position.set(U.lerp(hp.x + 3.6, hp.x + 1.25, sup), hp.y - 1.2 - 1.2 * (1 - sup), hp.z + 0.25); s.handN.rotation.set(0.3, 0, 2.1); s.handN.visible = sup > 0.01; }

      /* ---------- HIP ---------- */
      { const p = inB('s5', t) ? ph('s5', t) : 0, k = U.easeIO(U.clamp((p - 0.08) / 0.3)), kOk = U.easeIO(U.clamp((t - SP('s5', 0.5) + 0.1) / 0.8));
        const pose = (m, kk, ok) => m.s.forEach((L) => {
          const sx = L.s, cupC = v(sx * 0.72, 2.85, 0);
          const ball = ok ? cupC : lerpV(cupC, v(sx * 0.92, 2.62, 0.12), kk);
          const kneeN = v(sx * 1.1, 2.0, 0.3), footN = v(sx * 1.2, 1.0, 0.4);
          const knee = ok ? lerpV(kneeN, v(sx * 1.45, 3.15, 0.55), kk) : lerpV(kneeN, v(sx * 0.62, 1.55, 0.1), kk);
          const foot = ok ? lerpV(footN, v(sx * 1.55, 1.95, 0.75), kk) : lerpV(footN, v(sx * 0.55, 0.45, 0.15), kk);
          L.ball.position.copy(ball); L.knee.position.copy(knee); L.foot.position.copy(foot); setLimb(L.fem, ball, knee); setLimb(L.shin, knee, foot);
          L.ring.position.set(ball.x, ball.y, 0.35); L.ring.material.color.set(ok ? '#3fd07a' : '#ff3b5c'); L.ring.material.opacity = kk * (0.65 + 0.3 * Math.sin(t * 7)); L.ring.scale.setScalar(ok ? 1 : 1 + 0.1 * Math.sin(t * 9));
        });
        pose(s.hipBad, k, false); pose(s.hipOk, kOk, true); }

      /* ---------- ELBOW ---------- */
      { const p = inB('s6', t) ? ph('s6', t) : 0, pull = U.easeIO(U.clamp((p - 0.12) / 0.22)), slip = U.easeIO(U.clamp((t - SP('s6', 0.5) + 0.6) / 0.6));
        s.fore.position.x = 0.3 * pull + 0.15 * slip; s.radG.position.x = 0.35 * slip; s.lig.position.x = 0.42 - 0.38 * slip + 0.3 * pull * (1 - slip);
        s.lig.material.emissiveIntensity = slip * (0.5 + 0.4 * Math.sin(t * 9)); s.lig.scale.setScalar(1 - 0.12 * slip);
        s.arrow.visible = p > 0.08 && p < 0.62; s.arrow.position.x = EX + 1.4 + 0.4 * pull + 0.12 * Math.sin(t * 10); s.arrow.scale.setScalar(U.easeBack(U.clamp((p - 0.08) / 0.1)));
        s.flash.material.opacity = slip * (0.25 + 0.2 * Math.sin(t * 10)) * (inB('s6', t) ? 1 : 0); }

      /* ---------- BRAIN ---------- */
      { const p = inB('s10', t) ? ph('s10', t) : 0, q = SP('s10', 0.5), shk = t < q ? U.clamp((p - 0.06) / 0.08) * U.clamp((q - t) / 0.25) : 0;
        const sx = (tt) => 0.55 * Math.sin(tt * 13);
        s.headB.position.x = sx(t) * shk; s.headB.rotation.z = 0.12 * Math.sin(t * 13) * shk;
        let rel = (sx(t - 0.07) - sx(t)) * 1.5 * shk; const lim = 0.48; const hitSide = rel > lim ? 1 : rel < -lim ? -1 : 0; rel = U.clamp(rel, -lim, lim);
        s.brain.position.x = rel; s.brain.scale.set(1 - 0.08 * Math.abs(hitSide), 1, 1);
        s.hitL.position.set(-1.45, 0, 0.3); s.hitR.position.set(1.45, 0, 0.3);
        s.hitL.material.opacity = hitSide < 0 ? 0.55 : Math.max(0, s.hitL.material.opacity - 0.05); s.hitR.material.opacity = hitSide > 0 ? 0.55 : Math.max(0, s.hitR.material.opacity - 0.05);
        if (!inB('s10', t)) s.hitL.material.opacity = s.hitR.material.opacity = 0;
        s.bEyes.forEach((e) => e.scale.set(1, hitSide ? 0.25 : 1, 1));
        s.brain.rotation.y = 0.15 * Math.sin(t * 1.3);
        s.hearts.forEach((h) => { const u = h.userData.s, a = (t - q - 0.4 - u[1] * 1.5) / 3.0; h.visible = inB('s10', t) && a > 0 && a < 1; if (!h.visible) return; h.position.set(BX + u[0], 3.2 + a * 2.6, 1.2); h.scale.setScalar(1 + Math.sin(t * 6 + u[0]) * 0.15); }); }

      VE.camAt(CAM, t, camera, 0.05);
      window.__dbg = { s: { C, nb: s.nb, wh: s.wh, Lk: s.Lk, bigW: s.bigW, bigN: s.bigN, liftH: s.liftH }, camera };
    },
    bgAt: (t) => { const b = beatAt(t); if (['s3', 's5', 's6', 's10'].includes(b)) return ['#a8d8ff', '#e3f3ff']; if (b === 's7') return ['#3a3570', '#6a4a80']; return ['#ffd1e3', '#fff4e6']; },
    danger,
    hud(g, t) {
      if (!CAMR) return;
      const b = beatAt(t), S = window.__dbg && window.__dbg.s; if (!S) return;
      const txt = (str, x, y, size, col, w, al) => VE.draw.text(str, x, y, size, col, w || 800, al);
      const plain = (str, x, y, size, col, w, al) => { g.font = (w || 600) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = al || 'left'; g.textBaseline = 'middle'; g.fillStyle = col; g.fillText(str, x, y); };
      const rr = (x, y, w, h, r, fill, stroke) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.lineWidth = 4; g.strokeStyle = stroke; g.stroke(); } };
      const mark = (x, y, r, ok, a) => { g.save(); g.globalAlpha = a; g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = ok ? '#3fd07a' : '#ff4d5e'; g.fill(); g.lineWidth = 6; g.strokeStyle = '#ffffff'; g.stroke(); g.lineWidth = r * 0.28; g.lineCap = 'round'; g.strokeStyle = '#ffffff'; g.beginPath(); if (ok) { g.moveTo(x - r * 0.42, y); g.lineTo(x - r * 0.1, y + r * 0.32); g.lineTo(x + r * 0.45, y - r * 0.35); } else { g.moveTo(x - r * 0.35, y - r * 0.35); g.lineTo(x + r * 0.35, y + r * 0.35); g.moveTo(x + r * 0.35, y - r * 0.35); g.lineTo(x - r * 0.35, y + r * 0.35); } g.stroke(); g.restore(); };
      const tag = (str, x, y, size, a, fill, col) => { g.save(); g.globalAlpha = a; g.font = '700 ' + size + 'px Kanit,sans-serif'; const w = g.measureText(str).width + size * 0.9; rr(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.75, fill || '#ffffff', '#ff8fab'); plain(str, x, y + 2, size, col || '#3a2f3f', 700, 'center'); g.restore(); };
      const ring = (x, y, r, a, col) => { g.save(); g.globalAlpha = a; g.lineWidth = 9; g.strokeStyle = col || '#ffd35e'; g.setLineDash([22, 14]); g.lineDashOffset = -t * 60; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.restore(); };
      const bubble = (str, x, y, a) => { g.save(); g.globalAlpha = a; g.font = '700 40px Kanit,sans-serif'; const w = g.measureText(str).width + 50; rr(x - w / 2, y - 40, w, 80, 40, '#ffffff', '#ff8fab'); g.beginPath(); g.moveTo(x - 14, y + 38); g.lineTo(x + 4, y + 68); g.lineTo(x + 18, y + 38); g.fillStyle = '#ffffff'; g.fill(); plain(str, x, y + 2, 40, '#3a2f3f', 700, 'center'); g.restore(); };
      const C = S.C;
      /* cover */
      if (b === 'cover') { const [x, y] = wp(C.dad.userData['hand-1'], 0, 0.1); bubble('ฮึ้บ!', x + 230, y - 330, U.clamp((t - 0.3) / 0.3)); }
      /* s1: kg labels + body-part tags */
      if (b === 's1') {
        const p = ph('s1', t), q = SP('s1', 0.5), LBL = ['แรกเกิด', '1 ขวบ', '2 ขวบ'], KGS = [3.3, 9.6, 12.2], PART = ['คอ', 'สะโพก', 'ข้อศอก'];
        S.Lk.forEach((k, i) => {
          const a = U.clamp((p - 0.12 - i * 0.12) / 0.15); if (a <= 0) return; const bx = LX + (i - 1) * 2.6;
          let [x, y] = proj(new T.Vector3(bx, 0, 0.7)); g.save(); g.globalAlpha = a; txt(LBL[i], x, y + 48, 50, '#ffffff', 800); g.restore();
          const hy = (KGS[i] * 0.15) + [0.95, 1.38, 1.78][i]; [x, y] = proj(new T.Vector3(bx, hy, 0.1)); const kk = U.clamp((p - 0.15 - i * 0.12) / 0.3);
          if (t < q) { g.save(); g.globalAlpha = a; txt('~' + (KGS[i] * kk).toFixed(1) + ' กก.', x, y - 40, 50, '#ffd35e', 800); g.restore(); }
          else { const a2 = U.clamp((t - q - i * 0.35) / 0.3); if (a2 > 0) { const py = [0.62, 0.32, 0.7][i]; const [rx, ry] = proj(new T.Vector3(bx + (i === 2 ? 0.4 : 0), KGS[i] * 0.15 + py * k.scale.x / 0.62 * 0.62, 0.3)); ring(rx, ry, 52, a2); tag(PART[i], x, y - 46, 44, a2, '#ffd35e'); } }
        });
      }
      /* s2: zoom ring on head + neck */
      if (b === 's2') { const p = ph('s2', t), a = U.clamp((p - 0.5) / 0.1); if (a > 0) { const [x, y] = wp(S.nb.userData.head, 0, 0, 0.2); ring(x + 40, y + 30, 165, a); tag('หัว + คอ', x + 40, y - 175, 46, a, '#ffd35e'); } }
      /* s3: neck labels */
      if (b === 's3') { const p = ph('s3', t), q = SP('s3', 0.5); S.bigW.updateMatrixWorld(true); const nk = S.bigW.localToWorld(new T.Vector3(0, 1.0, 0.5)); const [x, y] = proj(nk); const a = U.clamp((p - 0.14) / 0.1); ring(x, y, 110, a, t < q ? '#ff5f6d' : '#5fd38d');
        if (t < q) { tag('กล้ามเนื้อคอยังอ่อน', 540, REEL ? 1200 : 1560, 42, a); mark(900, 760, 50, false, a); }
        else { const a2 = U.clamp((t - q - 0.4) / 0.3); tag('มือประคองหัว + คอ', 540, REEL ? 1200 : 1560, 42, a2, '#c9f5d9'); mark(900, 760, 50, true, a2); } }
      /* s4: zoom on wawa's legs */
      if (b === 's4') { const p = ph('s4', t), a = U.clamp((p - 0.5) / 0.1); if (a > 0) { const [x, y] = wp(S.wh, 0, 0.18, 0.2); ring(x + 10, y, 150, a); tag('ขาคร่อม เข่าสูงกว่าก้น', x, y + 200, 44, a, '#ffd35e'); } }
      /* s5: hip labels */
      if (b === 's5') { const p = ph('s5', t), q = SP('s5', 0.5);
        let [x, y] = proj(new T.Vector3(HX - 2.0, 0, 0.8)); const a = U.clamp((p - 0.12) / 0.1); tag('ขาห้อยตรง / ถูกรัดขาชิด', Math.max(x, REEL ? 320 : 250), y + (REEL ? -80 : 40), 36, a); mark(x, y - (REEL ? 640 : 760), 48, false, a);
        [x, y] = proj(new T.Vector3(HX + 2.0, 0, 0.8)); const a2 = U.clamp((t - q) / 0.3); tag('ขาเป็นตัว M', x, y + (REEL ? -80 : 40), 40, a2, '#c9f5d9'); mark(x, y - (REEL ? 640 : 760), 48, true, a2);
        if (a2 > 0.1) { let [kx, ky] = proj(new T.Vector3(HX + 2.0 - 1.45, 3.15, 0.55)); tag('เข่า', kx, ky - 70, 34, a2, '#ffd35e'); [kx, ky] = proj(new T.Vector3(HX + 2.0, 2.2, 0.5)); tag('ก้น', kx, ky + 20, 34, a2, '#ffd35e'); } }
      /* s6: elbow labels */
      if (b === 's6') { const p = ph('s6', t), q = SP('s6', 0.5);
        let [x, y] = proj(new T.Vector3(EX + 2.0, 3.9, 0.4)); const a = U.clamp((p - 0.1) / 0.1) * (p < 0.62 ? 1 : U.clamp((0.7 - p) / 0.08)); if (a > 0) tag('ดึง!', x + 30, y - 70, 50, a, '#ff5f6d', '#ffffff');
        [x, y] = proj(new T.Vector3(EX + 0.3, 2.2, 0.3)); const a2 = U.clamp((p - 0.2) / 0.1); tag(t < q ? 'เอ็นวงแหวน (ยังหลวม)' : 'เอ็นเลื่อนไปขัดในข้อ', x, y + 70, 38, a2, t < q ? '#ffffff' : '#ffd6dc');
        [x, y] = proj(new T.Vector3(EX - 1.8, 3.3, 0)); tag('ต้นแขน', x, y - 30, 34, a2); [x, y] = proj(new T.Vector3(EX + 1.4, 3.25, 0)); if (t < q) tag('แขนท่อนล่าง', x, y - 30, 34, a2); }
      /* s7: doctor list */
      if (b === 's7') {
        const p = ph('s7', t), a0 = U.clamp((p - 0.05) / 0.08);
        g.save(); g.globalAlpha = a0; rr(60 + LD, 330, 960 - 2 * LD, 440, 30, 'rgba(25,18,50,.62)', 'rgba(255,120,150,.9)'); g.restore();
        const L = ['ร้องไห้ทันที หลังถูกดึง/เหวี่ยงแขน', 'ไม่ยอมยก ไม่ยอมใช้แขนข้างนั้น', 'แขนห้อยแนบตัว ศอกงอนิดๆ', 'อย่าพยายามดึงกลับเข้าที่เอง'];
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s7', i, 0.12 + i * 0.13)) / 0.35); if (a <= 0) return; const y = 400 + i * 86; g.save(); g.globalAlpha = a; g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === 3 ? '#ffd35e' : '#ff5f6d'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, i === 3 ? '#3a2f3f' : '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(39 * LF), i === 3 ? '#ffd35e' : '#ffffff', i === 3 ? 700 : 600); g.restore(); });
        g.save(); g.globalAlpha = a0; plain('ที่มา: KidsHealth (Nemours), Kaiser Permanente', 540, 738, 26, 'rgba(255,255,255,.9)', 400, 'center'); g.restore();
      }
      /* s8: rings on the two hands */
      if (b === 's8') { const p = ph('s8', t), a = U.clamp((p - 0.3) / 0.1); if (a > 0) { S.liftH.forEach((h) => { const [x, y] = wp(h, 0, 0.1, 0); ring(x, y, 115, a, '#5fd38d'); }); tag('มือสอดใต้รักแร้ ทั้ง 2 ข้าง', 540, REEL ? 1200 : 1580, 44, a, '#c9f5d9'); } }
      /* s9: bubble */
      if (b === 's9') { const p = ph('s9', t); const [x, y] = wp(C.mom.userData.head, 0, 0.9); bubble('อย่าโยน!', x + 30, y - 60, U.clamp((p - 0.38) / 0.1)); }
      /* s10: brain labels */
      if (b === 's10') { const p = ph('s10', t), q = SP('s10', 0.5), a = U.clamp((p - 0.1) / 0.1); let [x, y] = proj(new T.Vector3(BX, 1.2, 0.5));
        if (t < q) { tag('สมองเหวี่ยงกระแทกกะโหลก', x, REEL ? Math.min(y + 250, 1210) : y + 250, 40, a, '#ffd6dc'); mark(x + 330, y - 640, 50, false, a); }
        else { const a2 = U.clamp((t - q - 0.2) / 0.3); tag('อุ้มนิ่งๆ กอดเบาๆ', x, REEL ? Math.min(y + 250, 1210) : y + 250, 42, a2, '#c9f5d9'); mark(x + 330, y - 640, 50, true, a2); } }
      /* s11: spine labels */
      if (b === 's11') { const p = ph('s11', t), q = SP('s11', 0.5), a = U.clamp((p - 0.14) / 0.1); const [x, y] = wp(C.dad, -2.6, 2.9, 0);
        if (t < q) { tag('ก้มหลังยก', x + 120, y - 60, 40, a, '#ffd6dc'); mark(x + 120, y - 160, 44, false, a); }
        else { const a2 = U.clamp((t - q - 0.4) / 0.3); tag('ย่อเข่า ลูกชิดตัว', x + 120, y - 60, 40, a2, '#c9f5d9'); mark(x + 120, y - 160, 44, true, a2); } }
      /* s12: tips */
      if (b === 's12') {
        const p = ph('s12', t), a0 = U.clamp((p - 0.04) / 0.06);
        g.save(); g.globalAlpha = a0; rr(50 + LD, 320, 980 - 2 * LD, 470, 30, 'rgba(255,255,255,.88)', '#ff8fab'); g.restore();
        const L = ['ประคองหัว + คอ จนลูกชันคอนิ่ง', 'อุ้มเอว/ใช้เป้: ขาเป็นตัว M', 'ยกที่ใต้รักแร้ ไม่ดึง ไม่เหวี่ยงแขน', 'ไม่เขย่า ไม่โยน ไม่ถือของร้อนตอนอุ้ม', 'ย่อเข่าก่อนยก สลับข้างอุ้มเอว'];
        let cur = -1; for (let i = 0; i < 5; i++) if (t >= TM('s12', i, 0.1 + i * 0.17)) cur = i;
        L.forEach((s2, i) => { const a = U.clamp((t - TM('s12', i, 0.1 + i * 0.17)) / 0.3); if (a <= 0) return; const y = 382 + i * 86; g.save(); g.globalAlpha = a0 * a; if (i === cur) rr(74 + LD, y - 37, 932 - 2 * LD, 74, 37, '#ffd6e4'); g.beginPath(); g.arc(122 + LD, y, 27, 0, 7); g.fillStyle = i === cur ? '#ff6f91' : '#ff9ec0'; g.fill(); plain(String(i + 1), 122 + LD, y + 2, 32, '#ffffff', 800, 'center'); plain(s2, 166 + LD, y + 2, Math.round(38 * LF), '#3a2f3f', i === cur ? 800 : 600); g.restore(); });
      }
    },
    caps: [
      { t0: 0, t1: at('s1') + 0.05, y: 300, instant: true, lines: [[80, ['อุ้มลูกมาเป็นพันครั้ง', '#fff']], [68, ['ท่าเดิม ใช้ได้ทุกวัยจริงไหม?', '#ffd35e']]] },
      { t0: at('s1') + 0.2, t1: SP('s1', 0.5), y: 290, lines: [[62, ['ลูกหนักขึ้นเกือบ ', '#fff'], ['4 เท่า', '#ffd35e']], [48, ['ในแค่ 2 ปีแรก', '#ffe3ea', 600]]], foot: 'ค่ากลางน้ำหนักเด็ก: WHO Child Growth Standards' },
      { t0: SP('s1', 0.5) + 0.02, t1: end('s1') - 0.05, y: 290, lines: [[60, ['คอ สะโพก ข้อศอก', '#ffd35e']], [46, ['แข็งแรงไม่เท่ากันในแต่ละวัย', '#fff', 600]], [44, ['ท่าอุ้มเลยต้องเปลี่ยนตาม', '#ffe3ea', 600]]] },
      { t0: at('s2') + 0.2, t1: SP('s2', 0.5), y: 290, lines: [[66, ['0–3 เดือน', '#ffd35e']], [50, ['หัวหนัก คอยังอ่อน', '#fff', 600]]], foot: 'ย้อนไปตอนน้องวาวาเพิ่งเกิด' },
      { t0: SP('s2', 0.5) + 0.02, t1: end('s2') - 0.05, y: 290, lines: [[56, ['ท่าเปล: หัวอยู่ที่ข้อพับแขน', '#fff']], [44, ['อีกมือรองหลังและก้น · ตอนเรอ อุ้มพาดบ่า', '#ffe3ea', 600]]], foot: 'ที่มา: UNICEF Parenting' },
      { t0: at('s3') + 0.2, t1: SP('s3', 0.5), y: 290, lines: [[58, ['ไม่ประคอง หัวจะพับไปมา', '#fff']], [46, ['กล้ามเนื้อคอยังไม่แข็งแรงพอ', '#ffe3ea', 600]]] },
      { t0: SP('s3', 0.5) + 0.02, t1: end('s3') - 0.05, y: 290, lines: [[60, ['ประคองหัว + คอ ทุกครั้ง', '#ffd35e']], [46, ['ตอนยก ตอนส่งต่อ ตอนวางลง', '#fff', 600]]], foot: 'ส่วนใหญ่ชันคอนิ่งได้เองราว 4 เดือน (CDC)' },
      { t0: at('s4') + 0.2, t1: SP('s4', 0.5), y: 290, lines: [[66, ['4–12 เดือน', '#ffd35e']], [48, ['ชันคอได้แล้ว อุ้มตั้งตัว/อุ้มเอวได้', '#fff', 600]]] },
      { t0: SP('s4', 0.5) + 0.02, t1: end('s4') - 0.05, y: 290, lines: [[58, ['ให้ดูที่ "ขา" ของลูก', '#fff']], [46, ['ขาคร่อมตัวเรา เข่าสูงกว่าก้น', '#ffe3ea', 600]]] },
      { t0: at('s5') + 0.2, t1: SP('s5', 0.5), y: 290, lines: [[56, ['ขาห้อยตรง หรือถูกรัดขาชิดนานๆ', '#fff']], [46, ['ข้อสะโพกไม่อยู่ในท่าที่มั่นคง', '#ffe3ea', 600]]] },
      { t0: SP('s5', 0.5) + 0.02, t1: end('s5') - 0.05, y: 290, lines: [[62, ['ขาเป็นตัว M', '#ffd35e']], [46, ['เข่าสูงกว่าก้น ต้นขามีที่รองถึงข้อพับ', '#fff', 600]]], foot: 'ใช้เป้อุ้มก็หลักเดียวกัน · International Hip Dysplasia Institute' },
      { t0: at('s6') + 0.2, t1: SP('s6', 0.5), y: 290, lines: [[58, ['1–4 ขวบ: อย่ายกตัวด้วยแขน', '#ffd35e']], [46, ['ดึง เหวี่ยง หรือหิ้วมือข้างเดียว', '#fff', 600]]] },
      { t0: SP('s6', 0.5) + 0.02, t1: end('s6') - 0.05, y: 290, lines: [[54, ['เอ็นรอบข้อศอกเด็กยังหลวม', '#fff']], [46, ['ดึงแรง ข้อศอกเคลื่อนได้', '#ffe3ea', 600]]], foot: 'พบมากใน 1–4 ขวบ ส่วนใหญ่ไม่เกิดหลัง 5 ขวบ (KidsHealth)' },
      { t0: at('s7') + 0.2, t1: end('s7') - 0.05, y: 250, lines: [[58, ['ไปหาหมอ ถ้าหลังถูกดึงแขน…', '#ffd35e']]] },
      { t0: at('s8') + 0.2, t1: SP('s8', 0.5), y: 290, lines: [[58, ['ยกให้ถูก: มือสอดใต้รักแร้', '#ffd35e']], [46, ['ไม่จับแค่มือหรือข้อมือ', '#fff', 600]]] },
      { t0: SP('s8', 0.5) + 0.02, t1: end('s8') - 0.05, y: 290, lines: [[54, ['ข้ามขอบถนน ข้ามบันได', '#fff']], [46, ['อุ้มขึ้นทั้งตัว แทนการหิ้วแขน', '#ffe3ea', 600]]] },
      { t0: at('s9') + 0.2, t1: end('s9') - 0.05, y: 290, lines: [[58, ['โยนลูกขึ้นฟ้า เขย่าแรงๆ', '#fff']], [46, ['ดูสนุก แต่เสี่ยงกว่าที่คิด', '#ffe3ea', 600]]], foot: 'น้าลิ้นจี่ มาเล่นกับหลาน' },
      { t0: at('s10') + 0.2, t1: SP('s10', 0.5), y: 290, lines: [[56, ['หัวหนัก คอยังอ่อน', '#fff']], [46, ['สมองเหวี่ยงกระแทกในกะโหลก', '#ffe3ea', 600]]], foot: 'เขย่าแรงแค่ราว 5 วินาที ก็บาดเจ็บได้ (MedlinePlus)' },
      { t0: SP('s10', 0.5) + 0.02, t1: end('s10') - 0.05, y: 290, lines: [[58, ['ห้ามเขย่า ห้ามโยนเด็กเล็ก', '#ffd35e']], [44, ['ลูกร้องไม่หยุด วางลงในเปล แล้วพักใจก่อน', '#fff', 600]]], foot: 'AAP: Take a break, don’t shake' },
      { t0: at('s11') + 0.2, t1: SP('s11', 0.5), y: 290, lines: [[54, ['ยกลูกวันละหลายสิบครั้ง', '#fff']], [46, ['ก้มหลังยก หลังรับแรงเต็มๆ', '#ffe3ea', 600]]] },
      { t0: SP('s11', 0.5) + 0.02, t1: end('s11') - 0.05, y: 290, lines: [[56, ['ย่อเข่า ลูกชิดตัว ใช้แรงขา', '#ffd35e']], [44, ['ยายชมพู่ที่ช่วยอุ้มหลาน ยิ่งต้องระวัง', '#fff', 600]]] },
      { t0: at('s12') + 0.2, t1: end('s12') - 0.05, y: 250, lines: [[58, ['5 ข้อ อุ้มลูกให้ถูกวัย', '#ffd35e']]] },
      { t0: at('s13') + 0.2, t1: end('s13'), y: 290, lines: [[56, ['ลูกโตขึ้นทุกวัน', '#fff']], [60, ['ท่าอุ้มก็ต้องโตตามลูก', '#ffd35e']], [42, ['ลูกคุณชอบให้อุ้มท่าไหนที่สุด? คอมเมนต์เลย', '#ffe3ea', 600]]], foot: 'ข้อมูล: CDC, UNICEF, WHO, IHDI, KidsHealth, MedlinePlus' },
    ],
    trans,
    audio: [
      [0.4, 'boing'], [0.9, 'giggle'],
      [at('s1') + 0.4, 'riser'], [P('s1', 0.2), 'pop'], [P('s1', 0.32), 'pop'], [P('s1', 0.44), 'pop'], [SP('s1', 0.5) + 0.1, 'ding'], [SP('s1', 0.5) + 0.45, 'ding'], [SP('s1', 0.5) + 0.8, 'ding'],
      [at('s2') + 0.3, 'twinkle'], [P('s2', 0.42), 'whoosh'], [P('s2', 0.58), 'shimmer'],
      [at('s3') + 0.5, 'boing'], [at('s3') + 1.4, 'boing'], [at('s3') + 2.3, 'warn'], [SP('s3', 0.5), 'whoosh'], [SP('s3', 0.5) + 0.7, 'ding'],
      [at('s4') + 0.4, 'giggle'], [P('s4', 0.42), 'whoosh'], [P('s4', 0.58), 'shimmer'],
      [at('s5') + 0.8, 'warn'], [SP('s5', 0.5) + 0.2, 'pop'], [SP('s5', 0.5) + 0.9, 'ding'],
      [P('s6', 0.12), 'whoosh'], [SP('s6', 0.5) - 0.3, 'click'], [SP('s6', 0.5) - 0.2, 'warn'],
      [at('s7') + 0.3, 'heartbeat'], [TM('s7', 0, 0.15), 'tick'], [TM('s7', 1, 0.28), 'tick'], [TM('s7', 2, 0.41), 'tick'], [TM('s7', 3, 0.54), 'tick'], [P('s7', 0.7), 'heartbeat'],
      [at('s8') + 0.3, 'pop'], [P('s8', 0.4), 'boing'], [P('s8', 0.58), 'shimmer'], [P('s8', 0.7), 'giggle'],
      [at('s9') + 0.3, 'whoosh'], [P('s9', 0.45), 'whoosh'], [P('s9', 0.4), 'warn'],
      [at('s10') + 0.6, 'thud'], [at('s10') + 1.1, 'thud'], [at('s10') + 1.6, 'thud'], [SP('s10', 0.5) + 0.3, 'twinkle'], [SP('s10', 0.5) + 0.9, 'heart'],
      [at('s11') + 0.6, 'warn'], [SP('s11', 0.5), 'whoosh'], [SP('s11', 0.5) + 0.7, 'ding'],
      [TM('s12', 0, 0.1), 'ding'], [TM('s12', 1, 0.27), 'tick'], [TM('s12', 2, 0.44), 'tick'], [TM('s12', 3, 0.61), 'tick'], [TM('s12', 4, 0.78), 'tick'],
      [at('s13') + 0.3, 'twinkle'], [at('s13') + 1.2, 'heart'],
    ],
    bed: [VE.voiceBed(VE.voice(DATA.vo, B)), CK.musicBed(0.8, at('s3'), CK.MUSIC.CUTE), CK.musicBed(at('s3'), at('s4'), CK.MUSIC.OOPS), CK.musicBed(at('s4'), at('s5'), CK.MUSIC.CUTE), CK.musicBed(at('s5'), at('s7'), CK.MUSIC.OOPS), CK.musicBed(at('s7'), at('s8'), CK.MUSIC.NIGHT), CK.musicBed(at('s8'), at('s9'), CK.MUSIC.CUTE), CK.musicBed(at('s9'), at('s11'), CK.MUSIC.OOPS), CK.musicBed(at('s11'), at('s13'), CK.MUSIC.CUTE), CK.musicBed(at('s13'), DUR - 1.5, CK.MUSIC.WARM)],
  });
})();
