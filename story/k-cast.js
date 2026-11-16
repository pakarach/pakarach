/* story kit: cast factories, props and environment presets */
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
const RAV = '#7a5a8a', RAMA_SKIN = '#5a7fd0';
const CF = {};
CF.rama = (s) => chibi({ robe: '#ffcf4a', sash: P.coral, skin: RAMA_SKIN, crown: true, sleeve: RAMA_SKIN, s });
CF.ramaX = (s) => { const c = chibi({ robe: '#c99a5a', sash: '#7a5a2a', skin: RAMA_SKIN, hair: '#1a1420', bun: true, sleeve: RAMA_SKIN, s }); return c; }; // exile: bark clothes, matted hair
CF.laksh = (s) => chibi({ robe: '#c0304a', sash: P.gold, skin: '#e8c090', crown: true, sleeve: '#e8c090', s });
CF.lakshX = (s) => chibi({ robe: '#a07a4a', sash: '#6a4a2a', skin: '#e8c090', hair: '#1a1420', bun: true, sleeve: '#e8c090', s });
CF.sita = (s) => chibi({ robe: '#ff7fae', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#2a2228', jewel: '#ffe36a', s });
CF.sitaX = (s) => chibi({ robe: '#f2b84a', sash: '#c06a2a', skin: '#f0c8a0', hair: '#2a2228', bun: true, s }); // forest / captive: yellow cloth
CF.das = (s) => chibi({ robe: '#c0304a', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s });
CF.kaik = (s) => chibi({ robe: '#7a3aa0', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#2a2228', jewel: '#ff4d6d', s });
CF.kaus = (s) => chibi({ robe: '#f4ead6', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#d8d8d8', s });
CF.sumi = (s) => chibi({ robe: '#4aa07a', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#2a2228', s });
CF.mant = (s) => { const c = chibi({ robe: '#6a5a6a', skin: '#d8a880', hair: '#e8e8e8', bun: true, s: s || 0.85 }); const h = mk(new T.SphereGeometry(0.38, 10, 8), '#6a5a6a'); h.position.set(0, 1.0, -0.35); c.add(h); c.userData.head.position.z = 0.12; c.userData.head.position.y -= 0.12; return c; };
CF.bharat = (s) => chibi({ robe: '#2a8aa0', sash: P.gold, skin: '#e8b890', crown: true, sleeve: '#e8b890', s });
CF.shatru = (s) => chibi({ robe: '#d0602a', sash: P.gold, skin: '#e8c090', crown: true, sleeve: '#e8c090', s });
CF.rishi = (s) => chibi({ robe: '#e8892a', skin: SKIN, hair: '#f4f4f4', bun: true, beard: '#f4f4f4', s });
CF.guard = (s) => chibi({ robe: '#8a6a3a', skin: SKIN, hair: '#2a2228', band: P.gold, s });
CF.ravana = (s) => { const c = chibi({ robe: '#8a2a2a', sash: P.gold, skin: RAV, crown: true, eyeGlow: YAK_EYE, fangs: true, sleeve: RAV, s }); xHeads(c, 'in', RAV, YAK_EYE); c.userData.weapons = true; xArms(c, 18, RAV, null, 0.9); return c; };
CF.ravanaH = (s) => { const c = chibi({ robe: '#e8892a', skin: '#c89070', hair: '#e8e8e8', bun: true, beard: '#e8e8e8', s }); return c; }; // disguised as a mendicant
CF.rak = (s, skin, robe) => chibi({ robe: robe || '#3a2a4a', skin: skin || '#6a4a7a', eyeGlow: YAK_EYE, fangs: true, sleeve: skin || '#6a4a7a', hair: '#1a1420', s });
CF.surp = (s) => { const c = chibi({ robe: '#c03a6a', sash: P.gold, skin: '#8a6a9a', hair: '#1a1420', eyeGlow: YAK_EYE, fangs: true, sleeve: '#8a6a9a', s }); const n = mk(new T.ConeGeometry(0.07, 0.2, 5), '#8a6a9a'); n.rotation.x = Math.PI / 2; n.position.set(0, -0.04, 0.45); c.userData.head.add(n); c.userData.nose = n; return c; };
CF.surpC = (s) => { const c = CF.surp(s); c.userData.nose.visible = false; const w = mk(new T.BoxGeometry(0.16, 0.08, 0.03), '#c02030'); w.position.set(0, -0.04, 0.39); c.userData.head.add(w); return c; };
CF.sword = (s) => { const g = new T.Group(); const bl = mk(new T.BoxGeometry(0.07, 0.95, 0.02), '#e8f4ff', { emissive: new T.Color('#9fd8ff'), emissiveIntensity: 0.6 }); bl.position.y = 0.55; const hd = mk(new T.BoxGeometry(0.24, 0.05, 0.06), P.gold, GOLDM); g.add(bl, hd); g.scale.setScalar(s || 1); return g; };
CF.surpF = (s) => chibi({ robe: '#ff9ac0', sash: P.gold, skin: '#f0c8a0', hair: '#2a2228', crown: true, jewel: '#c03a6a', s }); // beautiful disguise
CF.mari = (s) => CF.rak(s, '#6a4a7a', '#3a2a4a');
CF.khara = (s) => CF.rak(s, '#7a3a2a', '#4a1a1a');
CF.vib = (s) => chibi({ robe: '#2a6a5a', sash: P.gold, skin: '#6a8a7a', crown: true, sleeve: '#6a8a7a', s });
CF.kumbha = (s) => { const c = chibi({ robe: '#6a4a2a', sash: P.gold, skin: '#5f7a5a', eyeGlow: YAK_EYE, fangs: true, sleeve: '#5f7a5a', crown: true, s: s || 1.45 }); const belly = mk(new T.SphereGeometry(0.42, 12, 8), '#5f7a5a'); belly.position.set(0, 0.62, 0.18); c.add(belly); return c; };
CF.indra = (s) => chibi({ robe: '#3a2a6a', sash: P.gold, skin: '#7a6a9a', crown: true, eyeGlow: '#ff6a6a', fangs: true, sleeve: '#7a6a9a', jewel: '#7fd0ff', s });
CF.mando = (s) => chibi({ robe: '#8a2a5a', sash: P.gold, skin: '#9a7aa0', crown: true, hair: '#1a1420', s });
CF.valmiki = (s) => chibi({ robe: '#f4ead6', skin: SKIN, hair: '#f4f4f4', bun: true, beard: '#f4f4f4', s });
CF.kid = (s, robe, skin) => chibi({ robe: robe || '#f2b84a', skin: skin || SKIN, hair: '#1a1420', bun: true, sleeve: skin || SKIN, s: s || 0.6 });
CF.twin = (s, robe) => CF.kid(s || 0.7, robe || '#f2b84a', RAMA_SKIN);
CF.oldw = (s) => chibi({ robe: '#c9a45a', skin: SKIN, hair: '#f0f0f0', bun: true, s });
CF.brahma = (s) => { const c = chibi({ robe: '#ff9a4a', sash: P.gold, skin: '#ffd28a', crown: true, beard: '#f4f4f4', halo: true, s }); return c; };
CF.agni = (s) => { const c = chibi({ robe: '#ff5a1a', sash: P.gold, skin: '#ffb04a', crown: true, glow: '#ff6a1a', halo: true, s }); return c; };
CF.bhumi = (s) => chibi({ robe: '#4a8a3a', sash: P.gold, skin: '#c8a070', crown: true, hair: '#2a2228', halo: true, s });
function vanara(o) {
  const c = chibi({ robe: o.robe || '#c0402a', sash: o.sash, skin: o.fur || '#b07a3a', sleeve: o.fur || '#b07a3a', crown: o.crown, jewel: o.jewel, s: o.s });
  const h = c.userData.head; const mz = mk(new T.SphereGeometry(0.24, 10, 8), o.face || '#f0c89a'); mz.scale.set(1.1, 0.8, 0.7); mz.position.set(0, -0.1, 0.28); h.add(mz);
  for (const sx of [-1, 1]) { const ear = mk(new T.SphereGeometry(0.12, 8, 6), o.face || '#f0c89a'); ear.position.set(sx * 0.42, 0.04, 0); ear.scale.z = 0.5; h.add(ear); }
  c.userData.eyes.forEach((e) => (e.position.y = 0.09));
  const tail = new T.Group(); let prev = tail; for (let i = 0; i < 6; i++) { const sg = new T.Group(); const m = mk(new T.CylinderGeometry(0.06, 0.07, 0.3, 6), o.fur || '#b07a3a'); m.position.y = 0.15; sg.add(m); sg.position.y = i ? 0.28 : 0; sg.rotation.x = i ? 0.28 : -1.1; prev.add(sg); prev = sg; } tail.position.set(0, 0.3, -0.5); c.add(tail); c.userData.tail = tail;
  return c;
}
CF.hanu = (s) => vanara({ robe: '#d0402a', sash: P.gold, fur: '#c88a3a', face: '#f4d0a0', crown: true, jewel: '#ffe36a', s });
CF.sugriva = (s) => vanara({ robe: '#2a6aa0', sash: P.gold, fur: '#8a6a3a', crown: true, s });
CF.vanara = (s) => vanara({ robe: '#a05a2a', fur: '#9a6a3a', s });
CF.vanara2 = (s) => vanara({ robe: '#5a7a3a', fur: '#7a5a3a', s });
CF.nala = (s) => vanara({ robe: '#3a7a8a', fur: '#a07a4a', band: P.gold, s });
CF.jambavan = (s) => { const c = chibi({ robe: '#5a3a2a', skin: '#3a2a22', sleeve: '#3a2a22', beard: '#d8d8d8', s }); for (const sx of [-1, 1]) { const ear = mk(new T.SphereGeometry(0.12, 8, 6), '#3a2a22'); ear.position.set(sx * 0.3, 0.36, 0); c.userData.head.add(ear); } return c; };
/* animals & props */
CF.deer = (s) => { const g = new T.Group(), gm = M('#f2c040', { emissive: new T.Color('#a06a00'), emissiveIntensity: 0.55, metalness: 0.3 }); const body = new T.Mesh(new T.SphereGeometry(0.5, 12, 8), gm); body.scale.set(0.7, 0.6, 1.2); body.position.y = 0.95; g.add(body);
  for (const q of [[-0.2, 0.35], [0.2, 0.35], [-0.2, -0.35], [0.2, -0.35]]) { const l = mk(new T.CylinderGeometry(0.05, 0.04, 0.75, 5), '#e8b030'); l.position.set(q[0], 0.4, q[1]); g.add(l); }
  const neck = new T.Mesh(new T.CylinderGeometry(0.1, 0.13, 0.5, 6), gm); neck.position.set(0, 1.3, 0.48); neck.rotation.x = 0.5; g.add(neck); const hd = new T.Mesh(new T.SphereGeometry(0.17, 10, 8), gm); hd.scale.z = 1.4; hd.position.set(0, 1.55, 0.62); g.add(hd);
  for (const sx of [-1, 1]) { const an = mk(new T.CylinderGeometry(0.02, 0.025, 0.4, 4), '#e8f0ff', { emissive: new T.Color('#9fd8ff'), emissiveIntensity: 0.6 }); an.position.set(sx * 0.1, 1.82, 0.56); an.rotation.z = sx * 0.4; g.add(an); }
  for (let i = 0; i < 9; i++) { const sp = new T.Mesh(new T.SphereGeometry(0.05, 6, 4), basic('#f4f8ff')); const a = i * 0.7; sp.position.set(Math.sin(a) * 0.34, 0.95 + Math.cos(a * 1.3) * 0.18, -0.3 + (i / 9) * 0.6); g.add(sp); }
  const gl = softSprite('rgba(255,220,120,1)', 0.6); gl.scale.setScalar(2.6); gl.position.y = 1.0; g.add(gl); g.scale.setScalar(s || 1); g.userData.legs = g.children.slice(1, 5); return g; };
CF.jatayu = (s) => { const g = new T.Group(); const body = mk(new T.SphereGeometry(0.5, 10, 8), '#6a4a3a'); body.scale.set(0.8, 0.8, 1.2); body.position.y = 1.2; g.add(body); const hd = mk(new T.SphereGeometry(0.24, 10, 8), '#e8e0d0'); hd.position.set(0, 1.75, 0.45); g.add(hd);
  const bk = mk(new T.ConeGeometry(0.08, 0.3, 5), '#e8b030'); bk.rotation.x = Math.PI / 2; bk.position.set(0, 1.7, 0.75); g.add(bk); for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.04, 6, 4), basic('#1a1420')); e.position.set(sx * 0.12, 1.8, 0.62); g.add(e); }
  const wings = []; for (const sx of [-1, 1]) { const w = new T.Group(); const m = mk(new T.BoxGeometry(1.6, 0.06, 0.7), '#5a3a2a'); m.position.x = sx * 0.8; w.add(m); w.position.set(sx * 0.3, 1.35, 0); g.add(w); wings.push(w); }
  g.userData.wings = wings; g.scale.setScalar(s || 1.3); return g; };
CF.bow = (s) => { const r = 0.7; const g = new T.Group(); const m = M('#8a5a2a', { emissive: new T.Color('#ffb347'), emissiveIntensity: 0.25 }); const a = new T.Mesh(new T.TorusGeometry(r, 0.05, 6, 24, Math.PI), m); a.rotation.z = -Math.PI / 2; g.add(a); const sg = new T.BufferGeometry().setFromPoints([new T.Vector3(0, r, 0), new T.Vector3(0, 0, 0), new T.Vector3(0, -r, 0)]); const str = new T.Line(sg, new T.LineBasicMaterial({ color: '#fff6dc' })); g.add(str); g.userData.str = str; g.scale.setScalar(s || 1); return g; };
CF.arrow = () => beam('#cfefff');
CF.fire = (s) => { const f = fire(); f.scale.setScalar(s || 1); f.userData.isFire = true; return f; };
CF.glow = (s, c) => { const g = softSprite(c || 'rgba(255,220,140,1)', 0.8); g.scale.setScalar((s || 1) * 3); return g; };
CF.orb = (s, c) => { const o = orb(c || 'rgba(255,120,140,1)'); o.scale.setScalar(s || 1); return o; };
CF.throne = (s) => { const t = throne(); t.scale.setScalar(s || 1); return t; };
CF.chariot = (s) => { const g = new T.Group(); const b = mk(new T.BoxGeometry(1.8, 0.8, 1.4), '#c99a3a'); b.position.y = 0.9; const roof = mk(new T.ConeGeometry(1.2, 1.0, 4), P.gold, GOLDM); roof.rotation.y = Math.PI / 4; roof.position.y = 1.85; g.add(b, roof); for (const sx of [-1, 1]) { const w = mk(new T.CylinderGeometry(0.5, 0.5, 0.12, 14), '#5a3a1a'); w.rotation.z = Math.PI / 2; w.position.set(sx * 0.98, 0.5, 0); g.add(w); } g.scale.setScalar(s || 1); return g; };
CF.pushpaka = (s) => { const g = new T.Group(); const base = mk(new T.CylinderGeometry(1.6, 1.1, 0.5, 8), P.gold, GOLDM); g.add(base); const pal = palace('#ffe7b0'); pal.scale.setScalar(0.32); pal.position.y = 0.25; g.add(pal); for (let i = 0; i < 3; i++) { const c = cloud(0.7); c.position.set(-1.1 + i * 1.1, -0.45, 0); g.add(c); } const gl = softSprite('rgba(255,230,150,1)', 0.5); gl.scale.setScalar(5); gl.position.y = 0.6; g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.ring = (s) => { const g = new T.Group(); const r = new T.Mesh(new T.TorusGeometry(0.16, 0.04, 6, 16), M(P.gold, GOLDM)); const j = new T.Mesh(new T.OctahedronGeometry(0.07), basic('#7fe0ff')); j.position.y = 0.18; g.add(r, j); const gl = softSprite('rgba(255,230,150,1)', 0.7); gl.scale.setScalar(0.9); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.sandals = (s) => { const g = new T.Group(); for (const sx of [-1, 1]) { const p = mk(new T.BoxGeometry(0.22, 0.05, 0.5), P.gold, GOLDM); p.position.x = sx * 0.16; g.add(p); } const gl = softSprite('rgba(255,230,150,1)', 0.6); gl.scale.setScalar(1.2); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.mace = (s) => { const g = new T.Group(); const st = mk(new T.CylinderGeometry(0.04, 0.04, 1.0, 6), '#8a6a3a'); st.position.y = 0.5; const hd = mk(new T.SphereGeometry(0.2, 10, 8), P.gold, GOLDM); hd.position.y = 1.05; g.add(st, hd); g.scale.setScalar(s || 1); return g; };
CF.stone = (s) => { const r = mk(new T.DodecahedronGeometry(0.5, 0), '#9a9a8a', { flatShading: true }); r.scale.set(1.2, 0.5, 0.9); r.scale.multiplyScalar(s || 1); return r; };
CF.urn = (s) => { const g = new T.Group(); const u = mk(new T.CylinderGeometry(0.3, 0.22, 0.5, 12), P.gold, GOLDM); u.position.y = 0.25; const li = mk(new T.ConeGeometry(0.32, 0.25, 12), P.gold, GOLDM); li.position.y = 0.62; g.add(u, li); g.scale.setScalar(s || 1); return g; };
CF.hut = (s) => { const g = new T.Group(); const w = mk(new T.CylinderGeometry(1.1, 1.2, 1.2, 8), '#b0844a'); w.position.y = 0.6; const r = mk(new T.ConeGeometry(1.6, 1.3, 8), '#c9a45a'); r.position.y = 1.85; const d = mk(new T.BoxGeometry(0.5, 0.8, 0.05), '#4a2a14'); d.position.set(0, 0.4, 1.17); g.add(w, r, d); g.scale.setScalar(s || 1); return g; };
CF.tree = (s, c) => tree(s || 1.4, c);
CF.redtree = (s) => { const t = tree(s || 1.6, '#3f7a4a'); for (let i = 0; i < 9; i++) { const f = new T.Mesh(new T.SphereGeometry(0.1, 6, 4), basic('#ff5a4a')); const a = i * 0.7; f.position.set(Math.sin(a) * 0.6, 1.2 + Math.cos(a * 1.7) * 0.4, Math.cos(a) * 0.6); t.add(f); } return t; };
CF.sprite = (s, c) => { const g = softSprite(c || 'rgba(255,255,255,1)', 0.8); g.scale.setScalar(s || 1); return g; };
CF.flames = (s) => { const g = new T.Group(); for (let i = 0; i < 7; i++) { const f = fire(); f.position.set((i - 3) * 1.6 + Math.sin(i) * 0.5, 0, Math.cos(i * 1.3) * 1.2); f.scale.setScalar(1.4 + (i % 3) * 0.5); g.add(f); } g.userData.fires = g.children; g.scale.setScalar(s || 1); return g; };
CF.boat = (s) => { const g = new T.Group(); const h = mk(new T.BoxGeometry(1.0, 0.35, 2.6), '#7a4a2a'); h.position.y = 0.18; const p1 = mk(new T.ConeGeometry(0.5, 0.6, 4), '#7a4a2a'); p1.rotation.x = Math.PI / 2; p1.position.set(0, 0.18, 1.55); g.add(h, p1); g.scale.setScalar(s || 1); return g; };
CF.pyre = (s) => { const g = new T.Group(); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const l = mk(new T.CylinderGeometry(0.08, 0.08, 2.0, 5), '#5a3a1a'); l.rotation.z = Math.PI / 2; if (i % 2) l.rotation.y = Math.PI / 2; l.position.set(i % 2 ? (j - 1.5) * 0.45 : 0, 0.1 + i * 0.16, i % 2 ? 0 : (j - 1.5) * 0.45); g.add(l); } g.scale.setScalar(s || 1); return g; };
CF.bridge = (s) => { const g = new T.Group(); const m = mk(new T.BoxGeometry(3.2, 0.5, 1), '#8a7a5a'); m.position.z = -0.5; g.add(m); for (let i = 0; i < 6; i++) { const r = mk(new T.DodecahedronGeometry(0.35, 0), '#9a9a8a', { flatShading: true }); r.position.set(-1.2 + i * 0.5, 0.35, -0.2 - (i % 2) * 0.5); r.scale.y = 0.5; g.add(r); } g.userData.isBridge = true; g.scale.setScalar(s || 1); return g; };
CF.oceanGod = (s) => chibi({ robe: '#2a7ab0', sash: '#7fe0ff', skin: '#7ab0d0', crown: true, jewel: '#7fe0ff', glow: '#4a9adf', halo: true, s });
CF.elephant = (s) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.8, 10, 8), '#8a8a9a'); b.scale.set(0.9, 0.8, 1.2); b.position.y = 1.2; g.add(b); const h = mk(new T.SphereGeometry(0.5, 10, 8), '#8a8a9a'); h.position.set(0, 1.5, 0.9); g.add(h); const tr = mk(new T.CylinderGeometry(0.12, 0.08, 0.9, 6), '#8a8a9a'); tr.position.set(0, 1.0, 1.25); tr.rotation.x = 0.2; g.add(tr); for (const sx of [-1, 1]) { const ear = mk(new T.CircleGeometry(0.45, 8), '#9a9aaa'); ear.position.set(sx * 0.45, 1.55, 0.75); ear.rotation.y = sx * 1.1; ear.material.side = T.DoubleSide; g.add(ear); const tu = mk(new T.ConeGeometry(0.06, 0.4, 5), '#fff6e0'); tu.position.set(sx * 0.2, 1.2, 1.25); tu.rotation.x = 1.9; g.add(tu); }
  for (const q of [[-0.4, 0.5], [0.4, 0.5], [-0.4, -0.5], [0.4, -0.5]]) { const l = mk(new T.CylinderGeometry(0.2, 0.2, 0.8, 8), '#7a7a8a'); l.position.set(q[0], 0.4, q[1]); g.add(l); } g.userData.legs = g.children.slice(-4); g.scale.setScalar(s || 1); return g; };
CF.drum = (s) => { const g = new T.Group(); const d = mk(new T.CylinderGeometry(0.4, 0.4, 0.5, 12), '#a0402a'); d.position.y = 0.25; const t = mk(new T.CylinderGeometry(0.41, 0.41, 0.04, 12), '#f0e0c0'); t.position.y = 0.51; g.add(d, t); g.scale.setScalar(s || 1); return g; };
CF.food = (s) => { const g = new T.Group(); for (let i = 0; i < 9; i++) { const f = mk(new T.SphereGeometry(0.35 + (i % 3) * 0.1, 8, 6), ['#c08a3a', '#e8c070', '#a05a2a'][i % 3]); f.position.set(Math.sin(i * 2.1) * 0.6, 0.3 + Math.floor(i / 3) * 0.4, Math.cos(i * 2.1) * 0.6); g.add(f); } g.scale.setScalar(s || 1); return g; };
CF.apsara = (s) => chibi({ robe: '#ffb0d0', sash: P.gold, skin: '#f8d8b8', hair: '#2a2228', crown: true, jewel: '#7fe0ff', glow: '#ffb0d0', s });
CF.mountain = (s) => { const g = new T.Group(); const c = mk(new T.ConeGeometry(1.4, 2.2, 6), '#5a7a4a', { flatShading: true }); c.position.y = 1.1; const sn = mk(new T.ConeGeometry(0.5, 0.7, 6), '#f2f4ff'); sn.position.y = 1.95; g.add(c, sn); for (let i = 0; i < 4; i++) { const h = softSprite(['rgba(120,255,160,1)', 'rgba(255,240,120,1)', 'rgba(120,200,255,1)', 'rgba(255,140,200,1)'][i], 0.9); h.scale.setScalar(0.5); h.position.set(Math.sin(i * 1.6) * 0.9, 0.6 + i * 0.25, Math.cos(i * 1.6) * 0.9); g.add(h); } g.scale.setScalar(s || 1); return g; };
CF.goldSita = (s) => chibi({ robe: P.gold, sash: P.gold, skin: P.gold, hair: P.gold, crown: true, gold: true, statue: true, s });
CF.dasG = (s) => chibi({ robe: '#fff0d0', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', halo: true, glow: '#ffe0a0', s });
CF.label = (s, txt) => { const l = label(txt || '', { size: 64, color: '#fff' }); l.scale.multiplyScalar(s || 1); return l; };
CF.lightning = () => { const g = softSprite('rgba(220,230,255,1)', 1); g.scale.setScalar(14); return g; };

/* environment presets: build per station */
const ENVB = {
  palace(st, o) { const pal = palace(o.col || '#fff3d6'); pal.scale.setScalar(1.3); place(pal, st, 0, 0, -7.5); const fl = mk(new T.BoxGeometry(14, 0.12, 10), o.floor || '#d9c29a'); place(fl, st, 0, 0, -1); fl.position.y = -0.05;
    const out = [pal, fl, terrain(st, '#c9a77a', '#8a6a42', { hill: 3.5, seed: 8 }), ranges(st, [[36, '#8a5a3a', 5, 9, 12, 2.6], [48, '#6a3a2a', 9, 15, 9, 2.8]], { seed: 9 })];
    for (const q of [[-6, -3], [6, -3], [-7, 2], [7, 2]]) { const tr = tree(1.4, '#4f8f5a'); place(tr, st, q[0], 0, q[1]); out.push(tr); } return out; },
  hall(st, o) { const out = []; const fl = mk(new T.BoxGeometry(18, 0.2, 16), o.floor || '#b0844a'); place(fl, st, 0, -0.1, -2); out.push(fl); const wall = mk(new T.BoxGeometry(18, 9, 0.4), o.wall || '#6a2a2a'); place(wall, st, 0, 4.4, -9); out.push(wall);
    const cp = mk(new T.BoxGeometry(2.4, 0.04, 14), o.carpet || '#b02a3a'); place(cp, st, 0, 0.02, 0); out.push(cp);
    for (let i = 0; i < 4; i++) for (const sx of [-1, 1]) { const p = mk(new T.CylinderGeometry(0.28, 0.32, 7, 8), o.pillar || P.gold, GOLDM); place(p, st, sx * 4.6, 3.5, -7 + i * 4); out.push(p); }
    if (o.throne !== false) { const th = throne(); th.scale.setScalar(1.15); place(th, st, 0, 0, -6.6); out.push(th); }
    for (const sx of [-1, 1]) { const lp = softSprite('rgba(255,200,120,1)', 0.7); lp.scale.setScalar(3); place(lp, st, sx * 4.6, 6.2, -8.6); out.push(lp); } return out; },
  forest(st, o) { const out = [terrain(st, o.g1 || '#5f8a42', o.g2 || '#2f5a32', { hill: 5, seed: o.seed || 21, seaX: o.seaX }), ranges(st, [[34, o.r1 || '#3f6a5a', 6, 11, 11, 2.6], [46, o.r2 || '#5f7fa0', 12, 20, 8, 2.8]], { seed: (o.seed || 21) + 1, snow: o.snow })];
    let rs = o.seed || 21; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < (o.trees || 16); i++) { const a = rnd() * 6.283, r = 6.5 + rnd() * 9; const x = Math.sin(a) * r, z = Math.cos(a) * r - 2; if (z > 4 && Math.abs(x) < 6) continue; const tr = (o.red && i % 3 === 0) ? CF.redtree(1.3 + rnd() * 0.8) : tree(1.2 + rnd() * 0.9, ['#3f8f5a', '#4f7a3a', '#2f6a4a'][i % 3]); place(tr, st, x, 0, z); out.push(tr); }
    if (o.hut) { const h = CF.hut(1.2); place(h, st, o.hut[0], 0, o.hut[1]); out.push(h); }
    if (o.river) { const rv = mk(new T.BoxGeometry(60, 0.08, o.river[1] || 3), '#4a8ac8', { emissive: new T.Color('#2a5a9a'), emissiveIntensity: 0.25 }); place(rv, st, 0, 0.03, o.river[0]); out.push(rv); }
    return out; },
  shore(st, o) { const out = []; const back = mk(new T.BoxGeometry(90, 0.3, 50), '#5f8a42'); place(back, st, 0, -0.2, 32); out.push(back);
    const sea = mk(new T.BoxGeometry(220, 0.4, 160), '#2a6aa8', { emissive: new T.Color('#1a3a7a'), emissiveIntensity: 0.3 }); place(sea, st, 0, -0.35, -86); out.push(sea);
    const sand = mk(new T.BoxGeometry(60, 0.3, 14), '#e0c890'); place(sand, st, 0, -0.1, 2); out.push(sand);
    for (const q of [[-8, 4], [9, 5], [-11, 8], [12, 9]]) { const tr = tree(1.6, '#3f8f5a'); place(tr, st, q[0], 0, q[1]); out.push(tr); }
    if (o.island) { const is = mk(new T.CylinderGeometry(9, 11, 1.4, 10), '#3f7a4a'); place(is, st, 0, -0.2, o.island); out.push(is); const sk = skyline(st, o.island); sk.scale.setScalar(0.8); out.push(sk); }
    return out; },
  lanka(st, o) { const out = []; const sea = mk(new T.BoxGeometry(260, 0.4, 260), '#2a3a7a', { emissive: new T.Color('#1a2050'), emissiveIntensity: 0.3 }); place(sea, st, 0, -0.6, 0); out.push(sea);
    out.push(terrain(st, o.g1 || '#4a6a4a', o.g2 || '#2a3a3a', { hill: 4, seed: 41 }), skyline(st, -20), ranges(st, [[42, '#2a2450', 6, 12, 10, 2.4]], { seed: 43 }));
    if (o.palace) { const pal = palace('#e8c070'); pal.scale.setScalar(1.6); place(pal, st, o.palace[0], 0, o.palace[1]); out.push(pal); }
    return out; },
  grove(st, o) { return ENVB.forest(st, Object.assign({ g1: '#4f7a42', g2: '#2a4a32', red: true, trees: 18, seed: 51 }, o)).concat([skyline(st, -26)]); },
  field(st, o) { const out = [terrain(st, o.g1 || '#8a7a4a', o.g2 || '#5a5a3a', { hill: 4, seed: o.seed || 61, flat: 14 }), ranges(st, [[40, o.r1 || '#4a3a4a', 6, 12, 11, 2.6]], { seed: (o.seed || 61) + 1 })];
    if (o.city) { const sk = skyline(st, o.city); out.push(sk); } return out; },
  sky(st, o) { const out = []; let rs = 71; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 26; i++) { const c = cloud(1.2 + rnd() * 1.6); place(c, st, (rnd() - 0.5) * 60, -6 + rnd() * 18, -10 - rnd() * 50); out.push(c); }
    const sea = mk(new T.BoxGeometry(400, 0.4, 400), '#2a6aa8', { emissive: new T.Color('#1a4a8a'), emissiveIntensity: 0.3 }); place(sea, st, 0, -30, -40); out.push(sea); return out; },
  heaven(st, o) { const out = []; for (let i = 0; i < 14; i++) { const c = cloud(2 + (i % 3)); const a = i * 0.45; place(c, st, Math.sin(a) * 12, -0.8, -6 + Math.cos(a) * 9); out.push(c); } const fl = mk(new T.CylinderGeometry(9, 9, 0.3, 24), '#f4f6ff', { emissive: new T.Color('#9fb2ff'), emissiveIntensity: 0.3 }); place(fl, st, 0, -0.15, -2); out.push(fl); return out; },
};
