/* Harry Potter 1-8 cast — original vinyl chibis told apart by clothes colour, hair and one prop.
   No actor likeness, no scar, no round glasses (plain rectangular frames), no house colours/crests, no film costumes or creature designs.
   Voldemort = hooded figure with a shaded face and two green glints. Loaded after k-vinyl.js. */
const KD = 0.84; // students (11-17), times AD
/* swap the kit's round glasses for plain rectangular frames */
const rectGlasses = (c, col) => { const out = []; c.traverse((m) => { if (m.isMesh && m.geometry && m.geometry.type === 'TorusGeometry' && Math.abs(m.geometry.parameters.radius - 0.15) < 0.001) out.push(m); });
  const gm = M(col || '#2b2b2b', { roughness: 0.25 });
  out.forEach((m) => { const g = new T.Group(); for (const [w, h, x, y] of [[0.34, 0.035, 0, 0.11], [0.34, 0.035, 0, -0.11], [0.035, 0.25, -0.155, 0], [0.035, 0.25, 0.155, 0]]) g.add(at3(new T.Mesh(new T.BoxGeometry(w, h, 0.03), gm), x, y, 0));
    g.position.copy(m.position); g.rotation.copy(m.rotation); m.parent.add(g); m.parent.remove(m); }); return c; };
/* replace the glasses rings by two green glints (Voldemort) */
const glint = (c, col) => { const out = []; c.traverse((m) => { if (m.isMesh && m.geometry && m.geometry.type === 'TorusGeometry' && Math.abs(m.geometry.parameters.radius - 0.15) < 0.001) out.push(m); });
  out.forEach((m) => { const g = softSprite(col || 'rgba(90,255,120,1)', 1); g.scale.setScalar(0.42); g.position.copy(m.position); g.position.z += 0.06; m.parent.add(g); m.parent.remove(m); });
  c.traverse((m) => { if (m.isMesh && m.geometry && m.geometry.type === 'CylinderGeometry' && Math.abs(m.geometry.parameters.height - 0.16) < 0.001 && m.geometry.parameters.radiusTop < 0.02) m.visible = false; }); return c; };
const HPH = { harry: '#1a1618', ron: '#d8662a', herm: '#7a4a2a' };
CF.harry = (s, top) => { const c = vin({ hair: HPH.harry, bangs: 'side', backLen: 1.7, ahoge: true, ears: true, brow: HPH.harry, glasses: true, iris: '#3a8a4a', top: top || '#a8443a', inner: '#ece4d4', bottom: '#3a3d4d', longSleeve: true, shoes: '#2a2a30', scale: AD * KD * (s || 1) }); return rectGlasses(c); };
CF.harryA = (s) => CF.harry((s || 1) / KD, '#7a3a32'); // adult (epilogue)
CF.ron = (s, top) => vin({ hair: HPH.ron, bangs: 'short', backLen: 1.7, ears: true, brow: '#b04a1a', iris: '#4a7ab0', stripes: top ? undefined : '#55642c', top: top || '#6a7a3a', inner: '#e4dcc8', bottom: '#4a4038', longSleeve: true, shoes: '#3a2a22', scale: AD * KD * 1.04 * (s || 1) });
CF.ronLace = (s) => CF.ron(s, '#c8a0a8'); // old lace dress robe (ball)
CF.ronA = (s) => CF.ron((s || 1) / KD, '#5a6a32');
CF.herm = (s, top) => vin({ hair: HPH.herm, bangs: 'part', backLen: 2.4, sideOpen: 0.85, lashes: true, brow: '#5a3218', iris: '#7a4a2a', eyeScale: 1.08, top: top || '#7a4a9a', inner: '#ece4d4', bottom: '#3a3448', longSleeve: true, shoes: '#3a2a30', scale: AD * KD * 0.98 * (s || 1) });
CF.hermBall = (s) => CF.herm(s, '#e890c0');
CF.hermA = (s) => CF.herm((s || 1) / KD, '#6a3a8a');
CF.hermStone = (s) => vin({ hair: '#a8a8a2', bangs: 'part', backLen: 2.4, sideOpen: 0.85, lashes: true, brow: '#8a8a84', skin: '#b4b4ae', top: '#9e9e98', bottom: '#8a8a84', shoes: '#8a8a84', longSleeve: true, scale: AD * KD * 0.98 * (s || 1) });
CF.dumb = (s) => vin({ hair: '#dcdce4', bangs: 'part', backLen: 2.7, sideOpen: 0.7, ears: true, brow: '#c8c8d0', iris: '#5a8ad0', eyeScale: 0.9, top: '#2a3a6a', inner: '#b08a4a', bottom: '#23305a', longSleeve: true, shoes: '#3a2a3a', scale: AD * 1.04 * (s || 1) });
CF.hagrid = (s) => vin({ hair: '#2a2018', bangs: 'short', backLen: 2.4, sideOpen: 0.6, ears: true, brow: '#2a2018', top: '#5a3e2a', inner: '#7a6a4a', bottom: '#3a3028', longSleeve: true, shoes: '#2a2018', scale: AD * 1.45 * (s || 1) });
CF.snape = (s) => vin({ hair: '#121014', bangs: 'part', backLen: 2.1, sideOpen: 0.8, ears: true, brow: '#121014', eyeScale: 0.78, iris: '#141414', top: '#141418', inner: '#2a2a30', bottom: '#141418', longSleeve: true, shoes: '#101012', skin: CK.pal.skin[0], scale: AD * (s || 1) });
CF.snapeK = (s) => vin({ hair: '#121014', bangs: 'part', backLen: 1.9, sideOpen: 0.8, ears: true, brow: '#121014', top: '#3a3a40', bottom: '#2a2a30', longSleeve: true, scale: AD * 0.68 * (s || 1) });
CF.lily = (s) => vin({ hair: '#a83a26', bangs: 'part', backLen: 2.4, sideOpen: 0.8, lashes: true, brow: '#7a2a1a', iris: '#3a8a4a', top: '#4a8a5a', inner: '#ece4d4', bottom: '#3a4a5a', longSleeve: true, scale: AD * 0.98 * (s || 1) });
CF.lilyK = (s) => vin({ hair: '#a83a26', bangs: 'part', backLen: 2.2, sideOpen: 0.8, lashes: true, brow: '#7a2a1a', iris: '#3a8a4a', top: '#e8c84a', bottom: '#4a8a5a', scale: AD * 0.66 * (s || 1) });
CF.james = (s) => rectGlasses(vin({ hair: '#1a1618', bangs: 'side', backLen: 1.7, ahoge: true, ears: true, brow: '#1a1618', glasses: true, top: '#3a4a7a', inner: '#ece4d4', bottom: '#2a2e3a', longSleeve: true, scale: AD * (s || 1) }));
CF.vold = (s) => glint(vin({ hood: '#121216', skin: '#2e2e38', brow: '#1e1e26', glasses: true, top: '#121216', inner: '#1e1e26', bottom: '#121216', longSleeve: true, shoes: '#0e0e10', scale: AD * 1.06 * (s || 1) }));
CF.tom = (s) => vin({ hair: '#1e1a18', bangs: 'part', backLen: 1.6, ears: true, brow: '#1e1a18', top: '#3a3a44', inner: '#ece8e0', bottom: '#2a2a30', longSleeve: true, scale: AD * KD * 1.05 * (s || 1) });
CF.draco = (s) => vin({ hair: '#efe8d2', bangs: 'none', backLen: 1.6, ears: true, brow: '#d8cca8', eyeScale: 0.84, iris: '#8a96a0', top: '#24483a', inner: '#c8c8c0', bottom: '#22262a', longSleeve: true, shoes: '#1a1a1e', scale: AD * KD * (s || 1) });
CF.dracoA = (s) => CF.draco((s || 1) / KD);
CF.quirrell = (s) => { const c = vin({ hood: '#6a3a7a', brow: '#6a5a4a', top: '#4a3a5a', inner: '#8a7aa0', bottom: '#3a2e44', longSleeve: true, scale: AD * (s || 1) });
  const g = softSprite('rgba(90,255,120,1)', 0.9); g.scale.setScalar(2.4); g.position.set(0, 1.2, -1.0); c.userData.head.add(g); g.visible = false; c.userData.back = g; return c; };
CF.lockhart = (s) => vin({ hair: '#e8c870', bangs: 'part', backLen: 1.9, sideOpen: 0.8, ears: true, brow: '#c8a850', iris: '#3a8ad0', eyeScale: 1.1, top: '#3ab0b0', inner: '#f0f0e8', bottom: '#2a8a8a', longSleeve: true, shoes: '#e8e4dc', scale: AD * (s || 1) });
CF.mcg = (s) => wizHat(vin({ hair: '#8a8a88', bun: true, lashes: true, glasses: true, brow: '#6a6a68', top: '#1e4a3a', inner: '#2a2a2a', bottom: '#1a3e30', longSleeve: true, scale: AD * (s || 1) }), '#1e4a3a');
CF.sirius = (s) => vin({ hair: '#1a1618', bangs: 'part', backLen: 2.5, sideOpen: 0.8, ears: true, brow: '#1a1618', top: '#7a3a2a', inner: '#3a2a22', bottom: '#2a2420', longSleeve: true, shoes: '#1e1a18', scale: AD * (s || 1) });
CF.lupin = (s) => vin({ hair: '#8a7a5a', bangs: 'side', backLen: 1.8, ears: true, brow: '#6a5a3a', eyeScale: 0.85, stripes: '#6e6250', top: '#8a7a64', inner: '#c8b89a', bottom: '#5a5044', longSleeve: true, scale: AD * (s || 1) });
CF.peter = (s) => vin({ hair: '#8a8a78', bangs: 'short', backLen: 1.3, ears: true, brow: '#6a6a58', top: '#6a5a4a', inner: '#a89a80', bottom: '#4a4038', longSleeve: true, scale: AD * 0.9 * (s || 1) });
CF.marge = (s) => vin({ hair: '#8a6a4a', bun: true, lashes: true, brow: '#6a4a2a', top: '#a85a6a', inner: '#e8d0d0', bottom: '#5a4a4a', longSleeve: true, scale: AD * 1.08 * (s || 1) });
CF.vernon = (s) => vin({ hair: '#5a4a3a', bangs: 'short', backLen: 1.4, ears: true, brow: '#4a3a2a', top: '#6a6e7a', inner: '#e8e8e8', bottom: '#4a4e5a', longSleeve: true, scale: AD * 1.15 * (s || 1) });
CF.petunia = (s) => vin({ hair: '#c8a870', bangs: 'part', backLen: 1.7, lashes: true, brow: '#a08850', top: '#d8b0c0', inner: '#f4ecec', bottom: '#8a7a8a', longSleeve: true, scale: AD * 0.98 * (s || 1) });
CF.dudley = (s) => vin({ hair: '#e0c890', bangs: 'short', backLen: 1.3, ears: true, brow: '#c0a870', top: '#4a7ac0', bottom: '#3a3a44', scale: AD * 0.92 * (s || 1) });
CF.cedric = (s) => vin({ hair: '#6a4a2a', bangs: 'side', backLen: 1.6, ears: true, brow: '#4a2a1a', top: '#e0b83a', inner: '#2a2a2a', bottom: '#2a2a30', longSleeve: true, scale: AD * 0.95 * (s || 1) });
CF.moody = (s) => vin({ hair: '#9a9a90', bangs: 'part', backLen: 2.0, sideOpen: 0.8, ears: true, brow: '#7a7a70', top: '#4a4a3a', inner: '#6a5a4a', bottom: '#3a3a30', longSleeve: true, shoes: '#2a2a22', scale: AD * (s || 1) });
CF.crouch = (s) => vin({ hair: '#c8a870', bangs: 'side', backLen: 1.5, ears: true, brow: '#a08850', top: '#4a4a3a', inner: '#6a5a4a', bottom: '#3a3a30', longSleeve: true, scale: AD * (s || 1) });
CF.umb = (s) => vin({ hair: '#b08a6a', bun: true, round: true, bow: '#f070a0', lashes: true, brow: '#8a6a4a', top: '#f4a0c0', inner: '#ffd6e4', bottom: '#f090b8', longSleeve: true, shoes: '#f070a0', scale: AD * 0.9 * (s || 1) });
CF.bella = (s) => vin({ hair: '#141014', bangs: 'part', backLen: 2.7, sideOpen: 0.6, lashes: true, brow: '#141014', top: '#3a2a4a', inner: '#1e1428', bottom: '#2a1e34', longSleeve: true, shoes: '#141014', scale: AD * (s || 1) });
CF.nev = (s, k) => vin({ hair: '#6a4a2a', bangs: 'short', backLen: 1.5, ears: true, brow: '#4a2a1a', round: true, eyeScale: 1.15, top: '#c8a03a', inner: '#ece4d4', bottom: '#4a4038', longSleeve: true, scale: AD * (k || KD) * (s || 1) });
CF.nevA = (s) => CF.nev(s, 0.97);
CF.ginny = (s) => vin({ hair: '#d0602a', bangs: 'part', backLen: 2.4, sideOpen: 0.8, lashes: true, brow: '#a84a1a', top: '#3a7a9a', bottom: '#2a3a4a', longSleeve: true, scale: AD * KD * 0.96 * (s || 1) });
CF.ginnyA = (s) => CF.ginny((s || 1) / KD);
CF.twin = (s, c) => vin({ hair: HPH.ron, bangs: 'side', backLen: 1.7, ears: true, brow: '#b04a1a', top: c ? '#3a8a6a' : '#c05a3a', inner: '#e4dcc8', bottom: '#3a3430', longSleeve: true, scale: AD * 0.96 * (s || 1) });
CF.slug = (s) => vin({ hair: '#d0c4a0', bangs: 'short', backLen: 1.3, ears: true, round: true, brow: '#b0a480', top: '#8a5a3a', inner: '#e8d090', bottom: '#5a3a2a', longSleeve: true, scale: AD * 1.12 * (s || 1) });
CF.minister = (s) => vin({ hair: '#8a8a80', bangs: 'short', hat: '#2a4a3a', ears: true, top: '#3a3a5a', inner: '#e8e8e0', bottom: '#2a2a40', longSleeve: true, scale: AD * 1.05 * (s || 1) });
CF.de = (s, c) => vin({ hood: ['#121216', '#16141a', '#121418'][(c || 0) % 3], skin: CK.pal.skin[(c || 0) % 3], brow: '#2a2a2a', top: '#18181c', inner: '#2a2a30', bottom: '#141418', longSleeve: true, shoes: '#101012', scale: AD * (s || 1) });
CF.bro = (s, c) => vin({ hood: ['#6a3a2a', '#3a5a6a', '#5a6a3a'][(c || 0) % 3], brow: '#4a3a2a', top: ['#8a4a3a', '#4a6a8a', '#6a8a4a'][(c || 0) % 3], bottom: '#3a3430', longSleeve: true, skin: CK.pal.skin[(c || 0) % 3], scale: AD * (s || 1) });
CF.stu = (s, c) => { const k = (c || 0) % 6; return vin({ hair: ['#3a2a22', '#c8a060', '#1a1410', '#8a4a2a', '#6a4a3a', '#e0c890'][k], bangs: ['short', 'part', 'side', 'short', 'part', 'side'][k], backLen: [1.6, 2.3, 1.6, 2.2, 1.6, 2.4][k], sideOpen: 0.8, lashes: k % 2 === 1, ears: k % 2 === 0,
  top: ['#5a6a8a', '#8a5a7a', '#4a7a6a', '#a8743a', '#6a5a9a', '#3a6a9a'][k], bottom: '#2e2e36', longSleeve: true, skin: CK.pal.skin[k % 3], scale: AD * KD * (s || 1) }); };
CF.stuStone = (s) => vin({ hair: '#9a9a94', bangs: 'short', backLen: 1.6, ears: true, brow: '#8a8a84', skin: '#b4b4ae', top: '#a0a09a', bottom: '#8a8a84', shoes: '#8a8a84', longSleeve: true, scale: AD * KD * (s || 1) });
CF.trollG = (s) => vin({ bald: true, ears: true, skin: '#8a8a7a', brow: '#5a5a4a', top: '#6a5a3a', bottom: '#4a3a2a', shoes: '#8a8a7a', scale: AD * 2.0 * (s || 1) });
CF.baby = (s) => vin({ hair: HPH.harry, bangs: 'baby', backLen: 1.2, brow: HPH.harry, top: '#e8f0f8', bottom: '#e8f0f8', scale: AD * 0.42 * (s || 1) });
CF.kidA = (s, c) => vin({ hair: c ? HPH.ron : HPH.harry, bangs: 'side', backLen: 1.5, ears: !c, lashes: !!c, brow: '#2a2018', top: c ? '#7a4a9a' : '#3a4a7a', bottom: '#2e2e36', longSleeve: true, scale: AD * 0.66 * (s || 1) });
CF.wand = (s, c, tip) => CF.staff((s || 1) * 0.32, c || '#5a3a22', tip);
CF.lbl = (s, txt, col) => { const l = label(txt || '', { size: 64, color: col || '#fff' }); l.scale.multiplyScalar(s || 1); return l; };
/* ---- face / silhouette details so each character is easy to tell apart (generic shapes, no actor likeness) ---- */
const HSP = (c) => c.userData.headSpace || c.userData.head;
const onHead = (c, m, th, dp, r) => { const p = CK.surf(T, th, dp, r); m.position.copy(p); const n = p.clone().normalize(); m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), n); HSP(c).add(m); return m; };
const freckles = (c, col) => { const m = M(col || '#c0784a'); for (const s of [-1, 1]) for (const [th, dp] of [[1.93, 0.4], [2.0, 0.5], [1.88, 0.55], [2.04, 0.36]]) { const d = new T.Mesh(new T.SphereGeometry(0.028, 8, 6), m); d.scale.set(1, 0.35, 1); onHead(c, d, th, s * dp, 0.724); } return c; };
const puffs = (c, col, n, rad, front) => { const m = M(col); const N = n || 10; for (let i = 0; i < N; i++) { const a = i / N, th = 0.55 + (i % 3) * 0.55, dp = (front ? 0.95 : 1.25) + a * (2 * Math.PI - 2 * (front ? 0.95 : 1.25));
  const b = new T.Mesh(new T.SphereGeometry((rad || 0.27) * (0.85 + (i % 2) * 0.3), 12, 10), m); onHead(c, b, th, dp, 0.8); } return c; };
const spikes = (c, col, n) => { const m = M(col); const N = n || 7; for (let i = 0; i < N; i++) { const th = 0.35 + (i % 3) * 0.22, dp = -1.1 + i * (2.2 / (N - 1)); const k = new T.Mesh(new T.ConeGeometry(0.13, 0.34, 6), m); onHead(c, k, th, dp, 0.82); } return c; };
const bigCollar = (c, col) => { const m = mk(new T.CylinderGeometry(0.42, 0.5, 0.26, 16, 1, true), col, { side: T.DoubleSide }); m.position.set(0, c.userData.head.position.y - 0.62, -0.02); c.add(m); return c; };
const WRAP = (name, f) => { const base = CF[name]; CF[name] = (...a) => f(base(...a)); };
WRAP('harry', (c) => spikes(c, HPH.harry, 7)); WRAP('james', (c) => spikes(c, '#1a1618', 7));
WRAP('ron', (c) => freckles(c)); WRAP('ginny', (c) => freckles(c)); WRAP('twin', (c) => freckles(c));
WRAP('herm', (c) => puffs(c, HPH.herm, 11, 0.3)); WRAP('hermStone', (c) => puffs(c, '#a8a8a2', 11, 0.3));
WRAP('hagrid', (c) => puffs(c, '#2a2018', 12, 0.34, true)); WRAP('bella', (c) => puffs(c, '#141014', 12, 0.3)); WRAP('sirius', (c) => puffs(c, '#1a1618', 6, 0.24));
WRAP('snape', (c) => bigCollar(c, '#0e0e12')); WRAP('dumb', (c) => wizHat(c, '#2a3a6a')); WRAP('mcg', (c) => rectGlasses(c));
WRAP('draco', (c) => bigCollar(c, '#1a3a2e'));
/* generic house elf (folklore elf: small, long pointed ears, big eyes, plain brown tunic) */
CF.hpElf = (s) => { const c = vin({ hair: '#6a4a2a', bangs: 'baby', backLen: 1.1, brow: '#5a3a1a', skin: '#e2c6a4', eyeScale: 1.3, iris: '#3a6aa0', top: '#7a5a3a', bottom: '#6a4a2e', shoes: '#e2c6a4', scale: AD * 0.52 * (s || 1) });
  const m = M('#e2c6a4'); for (const sx of [-1, 1]) { const e = new T.Mesh(new T.ConeGeometry(0.17, 1.0, 8), m); e.scale.set(1, 1, 0.45); onHead(c, e, 1.5, sx * 1.52, 0.8); e.rotateZ(sx * 0.05); }
  return c; };
