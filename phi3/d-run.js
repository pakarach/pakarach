/* Part D: camera shots, backgrounds, update */
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { st, look, pos: [look[0] + (sx || 0), look[1] + h, look[2] + d], fov: fov || 40 }; };
const LINEUP = fr('VIL', 0.5, 2.6, 3.0, 15.5, 1.5);
const SHOT = {
  cover: [[0, fr('VIL', -14.1, 2.6, 3.3, 10.2, 1.4, 0.6)]],
  hook1: [[0, fr('VIL', -6, 3.4, 0.5, 24, 4.5)]],
  hook2: [[0, LINEUP]],
  hook3: [[0, fr('VIL', 0.5, 2.6, 3.0, 11, 1.2)]],
  tools: [[0, fr('VIL', 0.5, 2.8, 3.0, 13, 1.8, -0.4)]],
  fair: [[0, fr('SUTTA', 30, 3.0, 0, 21, 3.4)]],
  a1: [[0, fr('VIL', -18, 2.8, -1.0, 16, 4.5)]],
  a2: [[0, fr('VIL', -14.1, 2.8, 2.6, 11, 1.8, 1.0)]],
  a3: [[0, fr('VIL', -7.6, 3.0, 1.2, 10.5, 2.2)]],
  a4: [[0, fr('VIL', -12.6, 2.5, 3.0, 10.5, 1.8)]],
  a5: [[0, fr('VIL', -12, 3.0, 2.0, 13.5, 3.0)]],
  a6: [[0, fr('SUTTA', 0, 2.3, 0.2, 11.5, 3.2)]],
  a7: [[0, fr('SUTTA', 0, 2.5, -1.2, 7.6, 1.6)]],
  a8: [[0, fr('VIL', -14.1, 3.0, 2.8, 9.4, 1.4)]],
  a9: [[0, fr('VIL', -8.4, 2.4, 3.8, 11.5, 1.6)]],
  a10: [[0, fr('VIL', -10, 3.5, 3.2, 13, 0.6)]],
  a11: [[0, fr('VIL', -13, 3.1, 1.5, 14, 3.0)]],
  cliff1: [[0, fr('VIL', 1.2, 2.7, 0.2, 12.5, 2.4)]],
  b1: [[0, fr('VIL', 1.0, 2.8, 1.2, 9.4, 1.6)]],
  b2: [[0, fr('VIL', 1.6, 2.6, 1.4, 9.0, 1.6)]],
  b3: [[0, fr('VIL', 3.6, 2.7, 1.0, 13, 3.0)]],
  b4: [[0, fr('VIL', 1.0, 2.7, 2.0, 12, 2.4)], [2.8, fr('VIL', -27.5, 2.5, 4.2, 9.5, 1.8)]],
  b5: [[0, fr('VIL', 3.2, 2.6, 2.2, 12, 2.4)]],
  b6: [[0, fr('VIL', 27, 2.2, 3.2, 8.4, 1.8)]],
  b7: [[0, fr('SUTTA', 2.6, 1.9, 1.3, 10.5, 1.4)]],
  b8: [[0, fr('SUTTA', 3.0, 1.8, 1.4, 9.5, 1.2)]],
  b9: [[0, fr('VIL', 1.4, 2.6, 2.2, 10.5, 2.0)]],
  b10: [[0, fr('VIL', 15.2, 2.5, 3.2, 13, 1.8)]],
  b11: [[0, fr('VIL', 16.8, 2.1, 3.2, 7.8, 1.3)]],
  b12: [[0, fr('VIL', 13, 3.0, 2.0, 14, 3.0)]],
  cliff2: [[0, fr('VIL', 9.2, 3.1, 1.2, 11.5, 2.4)]],
  c1: [[0, fr('VIL', 9.4, 2.9, 1.2, 8.8, 1.6)]],
  c2: [[0, fr('VIL', 9.2, 2.8, 1.6, 10.5, 1.4)]],
  c3: [[0, fr('VIL', -10, 3.4, 0.5, 22, 5)], [2.4, fr('VIL', 12, 3.4, 0.5, 22, 5)]],
  c4: [[0, fr('VIL', 13, 3.6, 0.5, 15, 2.6)]],
  c5: [[0, fr('VIL', 2, 2.0, -4, 32, 17)]],
  c6: [[0, fr('VIL', 0, 0, -45, 62, 34)]],
  c7: [[0, fr('VIL', 0, 0, -40, 52, 28)]],
  c8: [[0, fr('HOSP', -12.8, 2.4, -1.6, 15, 3.0)]],
  c9: [[0, fr('SUTTA', 0.9, 2.3, -0.4, 8.6, 1.6)]],
  c10: [[0, fr('SUTTA', 1.0, 2.0, -0.6, 11.5, 1.6)]],
  c11: [[0, fr('SUTTA', 0.2, 2.6, -1.4, 7.4, 1.0)]],
  c12: [[0, fr('HOSP', 4.6, 2.6, -1.2, 11.5, 2.0)]],
  c13: [[0, fr('HOSP', 6.6, 3.0, -3.9, 6.2, 0.2)]],
  c14: [[0, fr('HOSP', 10.6, 2.0, -1.2, 9.5, 0.6)], [2.6, fr('HOSP', 0.4, 3.3, -4.0, 6.2, 0.2)]],
  c15: [[0, fr('HOSP', 16.6, 2.3, 0.6, 13, 1.4)]],
  c16: [[0, fr('HOSP', 5.0, 2.8, -1.0, 11, 1.4)]],
  c17: [[0, fr('HOSP', 5.4, 2.4, 0.0, 9.6, 1.6)]],
  c18: [[0, fr('VIL', 9.6, 3.1, 1.4, 12.5, 2.4)]],
  d1: [[0, fr('SUTTA', 30, 2.5, 0.6, 13.5, 2.2)]],
  d2: [[0, fr('SUTTA', 30.4, 2.0, 0.8, 12, 3.4)]],
  d3: [[0, fr('SUTTA', 29, 2.4, -0.4, 9, 1.2)]],
  d4: [[0, fr('VIL', -4, 3.3, 1.0, 24, 4.2)]],
  recap: [[0, fr('VIL', 0.5, 3.4, 1.0, 22, 4)]],
  ask: [[0, LINEUP]],
};
const CUT = new Set(['fair', 'a1', 'a6', 'a8', 'b6', 'b7', 'b9', 'c8', 'c9', 'c12', 'c18', 'd1', 'd4']);
const SEGS = [], IRIS = [];
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sg = SHOT[id];
    sg.forEach((g, j) => {
      const t0 = at(id) + ph(id, g[0]), t1 = j + 1 < sg.length ? at(id) + ph(id, sg[j + 1][0]) : end(id), f = g[1], fe = push(f, 0.93);
      const cut = j === 0 ? CUT.has(id) : !!g[2];
      SEGS.push([t0, f.st]); if (cut && prev) IRIS.push({ t: t0 - 0.25, dur: 0.5, type: 'iris' });
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[2] - f.look[2]) > 10; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 1.6 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
const stAt = (t) => { let s0 = SEGS[0][1]; for (const sg of SEGS) if (t >= sg[0]) s0 = sg[1]; return s0; };

const NIGHT = ['#080c22', '#1e2a52'], DAWN = ['#3a4a8a', '#ffb07a'], DUSK = ['#3a2a5a', '#e0805a'];
const BG = { VIL: NIGHT, SUTTA: ['#14203a', '#3a5a6a'], HOSP: ['#2a4a7a', '#7aa0d0'] };
const LT = { VIL: [0.5, 0.5, '#a8b8ff'], SUTTA: [0.75, 0.7, '#ffe8c8'], HOSP: [0.9, 0.85, '#ffffff'] };
const isDawn = (t) => inB(t, 'a9') || inB(t, 'd4');
const _c1 = new T.Color(), _c2 = new T.Color();
const mixHex = (a, b, k) => '#' + _c1.set(a).lerp(_c2.set(b), U.clamp(k)).getHexString();
function bgAt(t) {
  const st = stAt(t);
  if (st === 'VIL' && isDawn(t)) return DAWN;
  if (st === 'VIL' && inB(t, 'hook1')) { const k = sm(0.3, 3.8, rk(t, 'hook1')); return [mixHex(DUSK[0], NIGHT[0], k), mixHex(DUSK[1], NIGHT[1], k)]; }
  return BG[st];
}

const ss = (o, k) => { o.scale.setScalar(Math.max(0.0001, k)); o.visible = k > 0.002; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const pop = (k) => U.easeBack(U.clamp(k));
const BUB = [];
let FLASH = 0;
const lineupBeat = (t) => inB(t, 'hook2') || inB(t, 'hook3') || inB(t, 'tools') || inB(t, 'ask');

function update(t, s, { camera, W, H }) {
  BUB.length = 0; FLASH = 0; const id = beatAt(t), stN = stAt(t), r = rk(t, id);
  for (const k in s.st) s.st[k].visible = k === stN;
  { const l = LT[stN]; s.hemi.intensity = l[0]; s.sun.intensity = l[1]; s.sun.color.set(l[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = stN === 'VIL' ? 40 : 30; s.fog.far = stN === 'VIL' ? (between(t, 'c5', 'c7') ? 220 : 120) : 90;
  s.pt.intensity = 0;

  /* ---------- VIL ---------- */
  if (stN === 'VIL') { const C = s.c.vil, dawn = isDawn(t);
    if (dawn) { s.hemi.intensity = 0.85; s.sun.intensity = 0.9; s.sun.color.set('#ffd8b0'); }
    if (inB(t, 'hook1')) { const k = sm(0.3, 3.8, r); s.hemi.intensity = U.lerp(0.85, 0.5, k); s.sun.intensity = U.lerp(0.85, 0.5, k); s.sun.color.set(mixHex('#ffc8a0', '#a8b8ff', k)); }
    C.moon.visible = !dawn; C.fog.forEach((f, i) => { f.position.x = -32 + ((i * 11 + t * 0.5) % 66); f.material.opacity = dawn ? 0.06 : 0.14; });
    /* doors + windows */
    const keys = Object.keys(HX);
    keys.forEach((k, i) => { const h = C.houses[k]; let open = 0;
      if (inB(t, 'hook1')) open = 1.25 * (1 - sm(0.6 + i * 0.45, 1.0 + i * 0.45, r));
      if (inB(t, 'd4')) open = 1.25 * sm(0.4 + i * 0.3, 0.9 + i * 0.3, r);
      h.userData.door.rotation.y = open;
      h.userData.win.material.color.set(dawn ? '#c8b89a' : U.lerp(0, 1, 0.5 + 0.5 * Math.sin(t * 2 + i)) > 0.2 ? '#ffd27a' : '#ffc860'); });
    /* legend pair */
    const pair = [C.lmonk, C.lnun]; let pv = 0;
    const pairAt = (x, z, fx, fz, k) => { pair.forEach((p, i) => { p.position.set(x + i * 1.15, 0, z + i * 0.08); face(p, fx, fz); }); pv = k == null ? 1 : k; };
    if (inB(t, 'cover')) pairAt(-14.75, 3.3, 0.25, 1);
    if (lineupBeat(t)) { C.lmonk.position.set(-1.9, 0, 3.0); C.lnun.position.set(-0.75, 0, 3.05); face(C.lmonk, 0.15, 1); face(C.lnun, -0.1, 1); pv = 1; }
    if (inB(t, 'a1')) { const k = U.easeIO(sm(0.2, 4.4, r)); pairAt(U.lerp(-23, -14.75, k), U.lerp(-7, 3.2, k), 0.8, 1); pv = sm(0.0, 0.6, r); }
    if (inB(t, 'a2') || inB(t, 'a3')) pairAt(-14.75, 3.2, 0.05, -1);
    if (inB(t, 'a4')) { pairAt(-14.75, 3.2, 0.05, -1, 1 - sm(0.4, 1.6, r)); }
    if (inB(t, 'a8')) pairAt(-14.75, 3.2, 0.1, 1, sm(0.2, 0.9, r));
    pair.forEach((p, i) => { ss(p, pv * (i ? 0.98 : 1.05)); rest(p); p.userData.arms.L.rotation.set(-1.0, 0, 0.45); p.userData.arms.R.rotation.set(-1.0, 0, -0.45); p.position.y = Math.sin(t * 2 + i) * 0.03; });
    if (inB(t, 'a1') && r > 0.3) { walk(C.lmonk, t, 0.4); walk(C.lnun, t + 0.3, 0.4); C.lmonk.userData.arms.L.rotation.set(-1.0, 0, 0.45); C.lnun.userData.arms.L.rotation.set(-1.0, 0, 0.45); }
    if (inB(t, 'a2')) { const kn = Math.max(0, Math.sin(r * 9)) * sm(0.6, 0.9, r) * (1 - sm(3.0, 3.3, r)); C.lmonk.userData.arms.R.rotation.set(-1.6 - 0.25 * kn, 0, 0.2); }
    C.ldog.userData.tail.rotation.y = Math.sin(t * 6) * 0.4; C.lcat.userData.tail.rotation.z = Math.sin(t * 2) * 0.3;
    C.lglow.visible = pv > 0.01; C.lglow.material.opacity = 0.35 * pv * (0.8 + 0.2 * Math.sin(t * 3)); C.lglow.position.set(C.lmonk.position.x + 0.6, 1.2, C.lmonk.position.z);
    if (inB(t, 'a2') && r > 0.7 && r < 2.6) BUB.push({ o: C.houses.h0, dy: 4.4, dx: -0.6, txt: 'ก๊อก… ก๊อก…', c: '#fff' });
    if (inB(t, 'a2') && r > 2.8) BUB.push({ o: C.lmonk, dy: 2.4, txt: 'โยม… อยู่ไหม…', c: '#fff' });
    /* H1 porch family (a3) */
    const fam = inB(t, 'a3'); C.mom.visible = C.kid.visible = fam;
    if (fam) { const h = C.houses.h1; C.mom.position.set(HX.h1[0] - 0.6, 1.67, HX.h1[1] + 2.3); C.kid.position.set(HX.h1[0] + 0.5, 1.67, HX.h1[1] + 2.35); rest(C.mom); rest(C.kid); face(C.mom, 0.5, 1); face(C.kid, -0.4, 1);
      C.mom.userData.arms.R.rotation.set(-1.9, 0, 0.25); C.kid.userData.head.rotation.x = 0.1 * Math.sin(t * 3); void h;
      if (r > 1.6) BUB.push({ o: C.mom, dy: 2.2, txt: 'ใครเรียก ห้ามขานนะลูก', c: '#fff' }); }
    C.bushes.forEach((b, i) => { const k = t < at('a3') ? 0 : inB(t, 'a3') ? pop(sm(0.3 + i * 0.12, 0.6 + i * 0.12, r)) : 1; ss(b, 1.1 * k); });
    /* police (a4-a5) */
    const pol = inB(t, 'a4') || inB(t, 'a5'); C.police.visible = pol; C.torch.visible = pol;
    if (pol) { rest(C.police); let px = -13.4, pz = 3.5;
      if (inB(t, 'a4')) { const k = U.easeOut(sm(0.6, 3.0, r)); px = U.lerp(-6.5, -13.4, k); pz = U.lerp(4.4, 3.5, k); face(C.police, -1, -0.2); if (k < 1) walk(C.police, t, 0.9); else face(C.police, Math.sin(t * 2.2) * 0.8, -0.6); }
      else { face(C.police, 0.4, 1); C.police.userData.arms.R.rotation.set(-2.6, 0, 0.6); }
      C.police.position.set(px, 0, pz); C.police.userData.arms.L.rotation.set(-1.2, 0, -0.1);
      C.torch.position.set(px - 0.6, 1.3, pz - 1.0); C.torch.material.opacity = 0.5 + 0.1 * Math.sin(t * 7);
      if (inB(t, 'a4') && r > 3.2) BUB.push({ o: C.police, dy: 2.3, txt: 'ไม่เจอใครเลย?', c: '#fff' }); }
    /* villagers */
    C.villagers.forEach((v) => { v.visible = false; });
    if (inB(t, 'a5')) { const v = C.villagers[0]; v.visible = true; rest(v); const k = sm(0.8, 4.2, r); v.position.set(U.lerp(-4, -20, k), 0, 4.6); face(v, -1, 0); walk(v, t * 1.4, 1); v.userData.arms.R.rotation.set(-2.6, 0, 0.3); if (r > 1.0 && r < 4.4) BUB.push({ o: v, dy: 2.2, txt: 'มาถึงอำเภอข้างๆ แล้ว!', c: '#ffb3b3' }); }
    /* real monk (a9) */
    const am = inB(t, 'a9'); C.rmonk.visible = C.giver.visible = am;
    if (am) { const k = U.easeOut(sm(0.2, 2.2, r)); C.rmonk.position.set(U.lerp(-12.5, -8.0, k), 0, 4.0); face(C.rmonk, k < 1 ? 1 : 0.6, k < 1 ? 0 : 0.6); rest(C.rmonk); C.rmonk.userData.arms.L.rotation.set(-1.0, 0, -0.5); C.rmonk.userData.arms.R.rotation.set(-1.0, 0, 0.5); if (k > 0 && k < 1) { C.rmonk.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 6)) * 0.03; }
      C.giver.position.set(-6.7, 0, 4.4); face(C.giver, -1, 0.15); const gk = sm(2.4, 3.2, r); anjali(C.giver, 1 - gk); if (gk > 0) C.giver.userData.arms.R.rotation.set(-1.2 * gk, 0, 0.14);
      if (r > 2.8) BUB.push({ o: C.giver, dy: 1.9, txt: 'นิมนต์ค่ะ', c: '#fff' }); }
    /* phone (a10) */
    const pk = inB(t, 'a10') ? U.easeOut(sm(0.1, 0.9, r)) : 0; ss(C.phone, pk); if (pk > 0) { C.phone.position.set(-10, 3.7 + Math.sin(t * 1.5) * 0.05, 3.2); C.phone.rotation.y = Math.sin(t * 0.8) * 0.08;
      C.chats.forEach((b, i) => { const k = pop(sm(0.9 + i * 0.75, 1.2 + i * 0.75, r)); b.visible = k > 0.01; b.scale.setScalar(Math.max(0.001, k)); b.position.set(i % 2 ? 0.08 : -0.08, 0.95 - i * 0.6, 0.13); }); }
    /* rule card (a8) */
    const rc = inB(t, 'a8') ? pop(sm(0.8, 1.3, r)) : 0; ss(C.ruleCard, rc); C.ruleCard.position.set(-14.1, 4.7, 3.4);
    if (inB(t, 'a8') && r > 2.2) BUB.push({ o: C.lmonk, dy: 2.4, txt: 'ผิดวินัยตั้งแต่ก้าวแรก', c: '#ffb3b3' });
    /* ---- ปอบ ---- */
    const sv = between(t, 'b1', 'b2'); C.sorc.visible = sv; C.kidB.visible = inB(t, 'b2'); C.plate.visible = inB(t, 'b2');
    if (sv) { rest(C.sorc); C.sorc.position.set(0.0, 0, 1.6); face(C.sorc, 0.3, 1); if (inB(t, 'b1')) { const k = sm(0.6, 1.6, r) * (1 - sm(2.4, 3.2, r)); C.sorc.userData.arms.R.rotation.set(-1.4 * (1 - k) - 2.6 * k, 0, 0.3); } }
    let pobv = 0, pobP = [1.6, 0, 1.4];
    if (inB(t, 'b1')) { pobv = sm(2.4, 3.6, r); pobP = [0.0 + 0.9 * pobv, 0.6 + 0.6 * pobv, 1.0]; }
    if (inB(t, 'b2')) { pobv = 1; const k = U.easeIO(sm(2.2, 3.8, r)); pobP = [U.lerp(0.9, 2.6, k), 1.0 + Math.sin(t * 2) * 0.1, U.lerp(1.0, 1.2, k)]; }
    if (inB(t, 'b9')) { const k = sm(1.4, 2.4, r); pobv = 1 - k; pobP = [1.4 + Math.sin(t * 8) * 0.2 * (1 - k), 0.3 + k * 1.6, 2.6]; }
    if (lineupBeat(t)) { pobv = 1; pobP = [1.25, 0.2, 3.0]; }
    ss(C.pob, 1.05 * pobv); C.pob.position.set(pobP[0], pobP[1] + Math.sin(t * 2.2) * 0.08, pobP[2]); face(C.pob, lineupBeat(t) ? 0 : -0.3, 1); rest(C.pob); armUp(C.pob, 'R', 0.3, -0.8); armUp(C.pob, 'L', 0.3, -0.8);
    if (inB(t, 'b2')) { C.plate.position.set(0.9, 1.05 + Math.sin(t * 2) * 0.05, 1.9); C.kidB.position.set(2.9, 0, 1.6); rest(C.kidB); face(C.kidB, -0.5, 1); if (r < 2.2) BUB.push({ o: C.pob, dy: 2.1, txt: 'ของดิบ…', c: '#ffb3b3' }); }
    /* wreaths + animals (Na Bong) */
    C.wreaths.forEach((w, i) => ss(w, inB(t, 'b3') ? pop(sm(0.3 + i * 0.4, 0.7 + i * 0.4, r)) : between(t, 'b4', 'b5') ? 1 : 0));
    const lay = inB(t, 'b3') ? sm(1.6, 3.4, r) : between(t, 'b4', 'b5') ? 1 : 0;
    C.animals.forEach((a, i) => { a.rotation.order = 'YXZ'; a.rotation.y = -0.5; a.rotation.z = (Math.PI / 2) * U.easeIO(U.clamp(lay * 1.4 - i * 0.2)); a.position.y = 0; });
    /* gathering + fee + gate (b4) */
    if (inB(t, 'b4') || inB(t, 'b5')) C.villagers.forEach((v, i) => { v.visible = true; rest(v); const a = -1.1 + i * 0.31; v.position.set(SALA[0] - 0.4 + Math.sin(a) * 3.4, 0, 1.6 + Math.cos(a) * 1.2); face(v, -Math.sin(a), -0.6); });
    C.mor.visible = inB(t, 'b4'); if (C.mor.visible) { rest(C.mor); C.mor.position.set(SALA[0] - 0.4, 0.4, SALA[1] + 0.8); face(C.mor, 0, 1); armUp(C.mor, 'R', 0.6 + 0.15 * Math.sin(t * 6), -0.2); armUp(C.mor, 'L', 0.6 + 0.15 * Math.sin(t * 6 + 1), -0.2); }
    C.bowlC.visible = inB(t, 'b4'); C.bowlC.position.set(SALA[0] + 0.9, 0.55, SALA[1] + 2.0);
    C.coins.forEach((c, i) => { const k = inB(t, 'b4') ? ((r * 0.9 + i * 0.1) % 1) : 0; c.visible = inB(t, 'b4') && r < 2.8; c.position.set(SALA[0] + 0.9 + Math.sin(i * 2) * (1 - k) * 2.2, 0.6 + Math.sin(k * Math.PI) * 1.6, SALA[1] + 2.0 + Math.cos(i * 2) * (1 - k) * 1.5); c.rotation.x = t * 5 + i; });
    const gk = t >= at('b4') + ph('b4', 3.2) && t < end('b12') ? 1 : 0; C.rope.visible = gk > 0; if (inB(t, 'b4')) C.rope.scale.y = Math.max(0.01, pop(sm(3.2, 3.8, r)));
    /* officials (b5) */
    C.nurse.visible = inB(t, 'b5'); C.vet.visible = inB(t, 'b5') || inB(t, 'b6');
    if (inB(t, 'b5')) { const k = U.easeOut(sm(0.2, 2.0, r)); rest(C.nurse); rest(C.vet); C.nurse.position.set(U.lerp(12, 3.6, k), 0, 4.6); C.vet.position.set(U.lerp(13.4, 5.6, k), 0, 4.4); face(C.nurse, k < 1 ? -1 : -0.6, k < 1 ? 0 : -0.5); face(C.vet, k < 1 ? -1 : 0.4, k < 1 ? 0 : -1); if (k < 1) { walk(C.nurse, t, 0.8); walk(C.vet, t + 0.2, 0.8); } C.vet.userData.arms.R.rotation.set(-1.2, 0, 0.2); }
    C.check.forEach((c, i) => { const k = inB(t, 'b5') ? pop(sm(2.4 + i * 0.35, 2.7 + i * 0.35, r)) : 0; ss(c, k); const tgt = i < 2 ? C.villagers[5 + i] : C.animals[i - 2]; c.position.set(tgt.position.x, 2.9, tgt.position.z + 0.3); });
    C.cow.visible = inB(t, 'b6'); if (inB(t, 'b6')) { C.cow.position.set(27.4, 0, 2.6); C.cow.rotation.order = 'YXZ'; C.cow.rotation.y = -0.4; C.cow.rotation.z = Math.PI / 2 * 0.95; rest(C.vet); C.vet.position.set(25.8, 0, 3.8); face(C.vet, 0.8, -0.4); C.vet.userData.arms.R.rotation.set(-1.3, 0, 0.2); if (r > 2.6) BUB.push({ o: C.vet, dy: 2.3, txt: 'ไม่ใช่ปอบครับ', c: '#fff' }); }
    /* net (b9) */
    const nk = inB(t, 'b9') ? U.easeIO(sm(0.5, 1.4, r)) : 0; C.net.visible = inB(t, 'b9'); C.net.position.set(1.4, U.lerp(4.5, 0.05, nk), 2.6); C.net.scale.set(1.1, 1.2, 1.1);
    if (inB(t, 'b9') && r > 2.4) BUB.push({ o: C.net, dy: 1.6, txt: 'ว่างเปล่า…', c: '#fff' });
    /* granny (b10-b12) */
    C.granA.visible = inB(t, 'b10'); C.granW.visible = between(t, 'b11', 'b12'); C.tear.visible = inB(t, 'b10') && r > 1.6;
    if (inB(t, 'b10')) { rest(C.granA); C.granA.position.set(17.6, 0, 3.0); face(C.granA, -0.35, 1); C.granA.userData.head.rotation.x = 0.25; C.granA.userData.arms.L.rotation.set(-0.5, 0, 0.4); C.granA.userData.arms.R.rotation.set(-0.5, 0, -0.4);
      const tk = ((r - 1.6) * 0.8) % 1; C.tear.position.set(17.6 - 0.05, 1.45 - tk * 0.5, 3.36); C.tear.scale.setScalar(1 - tk * 0.4);
      [1, 3, 6].forEach((vi, j) => { const v = C.villagers[vi]; v.visible = true; rest(v); v.position.set(12.4 + j * 1.25, 0, 3.6 + (j % 2) * 0.4); face(v, 1, -0.15); const k = sm(0.6 + j * 0.3, 1.0 + j * 0.3, r); armFwd(v, 'R', k); });
      if (r > 1.2 && r < 3.4) BUB.push({ o: C.villagers[1], dy: 2.2, txt: 'ยายเป็นปอบ!', c: '#ffb3b3' }); }
    if (between(t, 'b11', 'b12')) { rest(C.granW); C.granW.position.set(17.4, 0, 3.0); face(C.granW, -0.25, 1); anjali(C.granW); }
    /* ---- ผีแม่ม่าย ---- */
    const sl = between(t, 'cliff2', 'c2') || inB(t, 'c18'); C.sleeper.visible = C.mat.visible = sl;
    if (sl) { const hz = HX.red[1] + 1.5 + 0.75; C.sleeper.position.set(HX.red[0] + 0.9, 1.67 + 0.3, hz); C.sleeper.rotation.y = Math.PI / 2; C.sleeper.userData.body.scale.x = 1 + 0.02 * Math.sin(t * 2.4); C.mat.position.set(HX.red[0] + 0.05, 1.70, hz); C.mat.rotation.y = Math.PI / 2; }
    C.zz.forEach((z, i) => { const k = (t * 0.45 + i / 3) % 1; z.visible = sl; z.position.set(HX.red[0] - 0.4 + k * 0.6, 2.4 + k * 1.2, HX.red[1] + 2.3); z.material.opacity = sl ? 1 - k : 0; z.scale.setScalar(0.4 + k * 0.4); });
    let wv = 0, wp = [9, 1, -6];
    if (inB(t, 'cliff2')) { wv = 0.6 * sm(1.2, 2.6, r); wp = [4.5, 1.2, -6]; }
    if (inB(t, 'c1')) { wv = 1; const k = U.easeIO(sm(0.2, 3.8, r)); wp = [U.lerp(4.5, 7.4, k), U.lerp(1.2, 1.8, k), U.lerp(-6, 1.9, k)]; }
    if (inB(t, 'c2')) { const k = U.easeIO(sm(1.4, 3.6, r)); wv = 1 - sm(3.0, 4.4, r); wp = [U.lerp(7.4, 4.0, k), 1.8, U.lerp(1.9, -4, k)]; }
    if (lineupBeat(t)) { wv = 1; wp = [2.95, 0.2, 3.0]; }
    ss(C.widow, wv); C.widow.position.set(wp[0], wp[1] + Math.sin(t * 1.8) * 0.1, wp[2]); rest(C.widow);
    if (inB(t, 'c1')) { face(C.widow, 0.6, 1); armUp(C.widow, 'R', 0.25, -1.0); } else if (inB(t, 'c2')) { face(C.widow, -0.5, -1); } else face(C.widow, -0.1, 1);
    if (inB(t, 'c2') && r > 1.0 && r < 3.2) BUB.push({ o: C.widow, dy: 2.4, txt: 'ไม่มีผู้ชายเหรอ…', c: '#fff' });
    for (const k in C.shirts) C.shirts[k].forEach((sh, i) => { let v = 0;
      if (k === 'red') v = inB(t, 'c2') ? pop(sm(0.4 + i * 0.25, 0.8 + i * 0.25, r)) : t >= end('c2') ? 1 : 0;
      else v = inB(t, 'c3') ? pop(sm(0.3 + Object.keys(HX).indexOf(k) * 0.55 + i * 0.12, 0.6 + Object.keys(HX).indexOf(k) * 0.55 + i * 0.12, r)) : t >= end('c3') ? 1 : 0;
      ss(sh, 0.8 * v); sh.rotation.z = Math.sin(t * 1.6 + i + k.length) * 0.08; });
    ss(C.sign, inB(t, 'c2') ? pop(sm(1.2, 1.7, r)) : t >= end('c2') ? 1 : 0);
    C.souls.forEach((g, i) => { const k = inB(t, 'c4') ? sm(0.6 + i * 1.6, 3.6 + i * 1.6, r) : 0; g.visible = k > 0 && k < 1; const hx = i ? HX.gran : HX.red; g.position.set(hx[0], 3.4 + k * 6, hx[1] + 1); g.material.opacity = Math.sin(k * Math.PI) * 0.9; });
    /* far villages (c6-c7) */
    { const on = between(t, 'c5', 'c7'); C.far.visible = on; if (on) { const r6 = inB(t, 'c6') ? r : t >= end('c6') ? 99 : -1; const d = C.farD;
      for (let i = 0; i < C.farN; i++) { const [x, z, q] = C.farSeed[i]; const k = pop(sm(0.4 + q * 3.4, 0.7 + q * 3.4, r6)); d.position.set(x, 0.5, z); d.scale.set(0.7 * k + 0.001, 0.5 * k + 0.001, 0.6 * k + 0.001); d.updateMatrix(); C.far.setMatrixAt(i, d.matrix); }
      C.far.instanceMatrix.needsUpdate = true; } }
    /* lineup numbers */
    C.nums.forEach((n, i) => { const on = lineupBeat(t) && !inB(t, 'tools'); n.visible = on; n.position.set([-1.3, 1.25, 2.95][i], 3.35 + Math.sin(t * 2 + i) * 0.06, 3.0); });
  }

  /* ---------- SUTTA ---------- */
  if (stN === 'SUTTA') { const C = s.c.sutta;
    C.budGlow.material.opacity = 0.4 + 0.08 * Math.sin(t * 2);
    const kalOn = between(t, 'a6', 'a7'); C.kal.forEach((c) => (c.visible = kalOn)); C.kmonk.visible = inB(t, 'a7');
    if (kalOn) C.kal.forEach((c, i) => { c.userData.head.rotation.x = 0.06 * Math.sin(t * 1.2 + i); });
    if (inB(t, 'a7')) { C.kmonk.position.set(2.7, 0, 0.6); face(C.kmonk, -0.7, -1); }
    const so = between(t, 'b7', 'b8'); C.par.visible = C.child.visible = C.orbP.visible = C.orbC.visible = so;
    if (so) { rest(C.par); rest(C.child); C.par.position.set(2.0, 0, 1.4); C.child.position.set(3.9, 0, 1.5); face(C.par, 0.6, 1); face(C.child, -0.6, 1); anjali(C.par, 0.6);
      let ox = 2.0, oy = 2.05; if (inB(t, 'b8')) { const k = sm(0.4, 1.6, r), back = sm(1.8, 2.8, r); ox = U.lerp(2.0, 3.3, k * (1 - back)); oy = 2.05 + Math.sin(k * Math.PI) * 0.5; if (r > 1.6 && r < 2.2) FLASH = 0.15; }
      C.orbP.position.set(ox, oy + Math.sin(t * 3) * 0.05, 1.5); C.orbC.position.set(3.9, 1.5 + Math.sin(t * 3 + 1) * 0.05, 1.7);
      if (inB(t, 'b7') && r > 1.4) BUB.push({ o: C.par, dy: 2.4, txt: 'กรรมของพ่อ', c: '#fff' });
      if (inB(t, 'b8') && r > 2.6) BUB.push({ o: C.child, dy: 2.0, txt: 'ของหนู ของหนู', c: '#fff' }); }
    const sv = between(t, 'c9', 'c11'); C.siv.visible = sv; if (sv) { rest(C.siv); C.siv.position.set(2.3, 0, 0.6); face(C.siv, -0.8, -0.8); if (inB(t, 'c9')) armFwd(C.siv, 'R', 0.6 + 0.1 * Math.sin(t * 4)); if (inB(t, 'c9') && r > 1.4) BUB.push({ o: C.siv, dy: 2.3, txt: 'มาจากกรรมเก่าทั้งหมดไหม?', c: '#fff' }); }
    /* palace + pretas */
    const pr = inB(t, 'fair') || between(t, 'd1', 'd3'); C.pretas.forEach((p, i) => { p.visible = pr; rest(p); p.userData.head.rotation.x = 0.2; p.position.y = Math.sin(t * 1.3 + i) * 0.05;
      const glow = inB(t, 'd2') ? sm(1.4 + i * 0.2, 2.6 + i * 0.2, r) : inB(t, 'd3') ? 1 : 0;
      p.traverse((m) => { if (m.isMesh && m.material && m.material.emissive) { m.material.emissive.set(glow > 0 ? mixHex('#7a9cff', '#ffc94a', glow) : '#7a9cff'); m.material.opacity = inB(t, 'fair') ? 0.35 : 0.6 + 0.3 * glow; } });
      if (inB(t, 'd3')) { const k = sm(0.3 + i * 0.12, 0.8 + i * 0.12, r); p.userData.arms.L.rotation.set(-1.2 * k, 0, -0.3); p.userData.arms.R.rotation.set(-1.2 * k, 0, 0.3); p.userData.head.rotation.x = 0.2 - 0.3 * k; } });
    const dv = between(t, 'd1', 'd3'); C.king.visible = dv; C.dmonks.forEach((m) => (m.visible = dv)); C.stream.visible = inB(t, 'd2') && r > 0.6;
    if (dv) { rest(C.king); face(C.king, -0.5, -0.7); C.king.position.set(31.6, 0, 3.0); C.king.userData.arms.R.rotation.set(-1.3, 0, 0.2); C.king.userData.arms.L.rotation.set(-1.1, 0, -0.4); C.dmonks.forEach((m) => anjali(m, 0.4));
      C.king.updateMatrixWorld(true); C.pot.getWorldPosition(s.v); C.stream.position.set(s.v.x - ST.SUTTA[0] + 0.1, s.v.y - 0.45, s.v.z); }
    C.merit.forEach((m, i) => { const on = inB(t, 'd2') && r > 1.0; m.visible = on; if (on) { const k = ((r - 1.0) * 0.5 + i / 12) % 1, tg = C.pretas[i % 6].position; m.position.set(U.lerp(31.6, tg.x, k), 1.2 + Math.sin(k * Math.PI) * 1.8, U.lerp(2.6, tg.z, k)); m.material.opacity = Math.sin(k * Math.PI); } });
    if (inB(t, 'd2') && r > 2.6) BUB.push({ o: C.pretas[2], dy: 2.4, txt: 'อนุโมทนา…', c: '#fff' });
  }

  /* ---------- HOSP ---------- */
  if (stN === 'HOSP') { const C = s.c.hosp;
    C.workers.forEach((w, i) => { w.visible = inB(t, 'c8'); w.userData.body.scale.x = 1 + 0.03 * Math.sin(t * 2 + i); });
    const ward = between(t, 'c12', 'c17'); C.pat.visible = between(t, 'c12', 'c13'); C.doc.visible = ward;
    if (C.pat.visible) { C.pat.position.set(4.1, 1.15, -0.6); C.pat.rotation.y = -Math.PI / 2; }
    if (ward) { rest(C.doc); if (inB(t, 'c17')) { C.doc.position.set(7.4, 0, 0.6); face(C.doc, -1, 0.3); armFwd(C.doc, 'R', 0.5); } else { C.doc.position.set(5.6, 0, 0.4); face(C.doc, -0.5, 0.6); C.doc.userData.arms.R.rotation.set(-1.0, 0, 0.3); } }
    const brug = inB(t, 'c13') ? sm(1.0, 2.4, r) : between(t, 'c14', 'c17') ? 1 : 0, vf = inB(t, 'c14') ? sm(1.0, 1.6, r) * (1 - sm(2.4, 2.6, r)) : 0;
    ecg(C.mon, t, brug, vf);
    const hv = between(t, 'c13', 'c14'); C.heart.visible = hv; if (hv) { const bt = (t * 1.2) % 1, sq = vf > 0 ? 1 + 0.06 * Math.sin(t * 40) : 1 + 0.08 * Math.exp(-bt * 8); C.heart.scale.setScalar(1.15 * sq); C.heart.rotation.y = Math.sin(t * 0.6) * 0.3; }
    C.spark.forEach((sp, i) => { const on = inB(t, 'c14') && r < 2.6; sp.visible = on; if (on) { const k = (t * 1.6 + i / 6) % 1; sp.position.set(10.6 + Math.sin(i * 2.4) * 0.9, 2.6 + Math.cos(i * 1.7) * 0.9, -0.4); sp.material.opacity = (1 - k) * (0.6 + vf * 0.4); sp.scale.setScalar(0.3 + k * 0.6); } });
    if (inB(t, 'c14') && r > 0.8 && r < 2.5) BUB.push({ o: C.heart, dy: 1.6, txt: 'ตุบ ตุบ… ระริก!', c: '#ffb3b3' });
    C.clock.material.opacity = 1; C.clock.visible = between(t, 'c12', 'c17');
    const fv = inB(t, 'c15'); C.fam.forEach((c, i) => { c.visible = fv; if (fv) { const g = Math.floor(i / 2), j = i % 2; rest(c); c.position.set(14.0 + g * 2.5 + j * 1.0, 0, 0.6 + (j ? 0.2 : 0)); face(c, 0, 1); const lit = j === 0 ? sm(0.6 + g * 0.8, 1.0 + g * 0.8, r) : 0; c.userData.body.material.emissive.set(lit > 0 ? P.gold : '#000000'); c.userData.body.material.emissiveIntensity = 0.5 * lit; } });
    const rx = inB(t, 'c16'); C.redX.visible = rx; ss(C.no, rx ? pop(sm(1.2, 1.6, r)) : 0); ss(C.yes, rx ? pop(sm(2.6, 3.0, r)) : 0);
    if (rx) { C.redX.position.set(3.4, 3.6, 0.4); C.redX.rotation.z = Math.sin(t * 1.4) * 0.06; C.no.position.set(3.4, 2.9, 0.6); C.yes.position.set(6.6, 5.1, -3.6); }
    const wk = inB(t, 'c17'); C.walker.visible = wk; if (wk) { rest(C.walker); const k = U.easeOut(sm(0.2, 2.2, r)); C.walker.position.set(U.lerp(0.5, 5.6, k), 0, 0.8); face(C.walker, k < 1 ? 1 : 0.8, k < 1 ? 0 : -0.3); if (k < 1) walk(C.walker, t, 0.8); if (r > 2.6) BUB.push({ o: C.walker, dy: 2.3, txt: 'ตรวจไว้ อุ่นใจ', c: '#fff' }); }
  }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.1);
  camera.updateMatrixWorld(true);
  const v = s.v;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
