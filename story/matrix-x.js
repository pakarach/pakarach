/* The Matrix 1-4 cast — original vinyl chibis. No actor likeness (no bald head, no pince-nez, no long hair + beard), no film costumes (no black long coat, no latex; sunglasses are a generic round pair, Dan's call),
   no code-rain, ship, machine or logo designs. Loaded after k-vinyl.js. */
const MX = { neoH: '#1e1a1c', skinM: '#8a5a3c' };
/* Neo: office (blue shirt + tie), in the sim (navy jacket, teal inner), real world (grey knit), 2021 (brown cardigan + glasses) */
CF.neoW = (s) => { const c = vin({ hair: MX.neoH, bangs: 'short', backLen: 1.75, ears: true, brow: MX.neoH, top: '#9ab8d8', bottom: '#3a3f4a', longSleeve: true, shoes: '#2a2a2e', scale: AD * (s || 1) });
  const t = mk(new T.BoxGeometry(0.09, 0.42, 0.03), '#2a3a6a'); t.position.set(0, 0.72, 0.36); t.rotation.x = -0.12; c.add(t); return c; };
CF.neo = (s) => vin({ hair: MX.neoH, bangs: 'short', backLen: 1.75, ears: true, brow: MX.neoH, shades: true, top: '#24324e', inner: '#2f8f8a', bottom: '#1e2230', longSleeve: true, shoes: '#1e1e24', scale: AD * (s || 1) });
CF.neoR = (s) => vin({ hair: MX.neoH, bangs: 'baby', backLen: 1.5, ears: true, brow: MX.neoH, top: '#8a8a8e', bottom: '#5a5a60', longSleeve: true, shoes: '#3a3a3e', scale: AD * (s || 1) });
CF.neoB = (s) => { const c = CF.neoR(s); const b = mk(new T.BoxGeometry(1.25, 0.2, 0.2), '#e8e4dc'); b.position.set(0, 0.95, 0.62); c.userData.head.add(b); return c; }; // blindfold (Revolutions)
CF.neo4 = (s) => vin({ hair: '#2a2224', bangs: 'side', backLen: 1.9, ears: true, glasses: true, brow: '#2a2224', top: '#7a5a3a', inner: '#e8e0d0', bottom: '#3a3a44', longSleeve: true, scale: AD * (s || 1) });
/* Trinity: plum jacket, short dark bob; real world dark grey; Tiffany (2021) orange work jacket */
CF.trin = (s) => vin({ hair: '#16121a', bangs: 'part', backLen: 1.9, sideOpen: 0.8, lashes: true, shades: true, brow: '#16121a', top: '#4a2a5e', inner: '#1e1a26', bottom: '#2a2234', longSleeve: true, shoes: '#1e1e24', scale: AD * 0.97 * (s || 1) });
CF.trinR = (s) => vin({ hair: '#16121a', bangs: 'part', backLen: 1.9, sideOpen: 0.8, lashes: true, brow: '#16121a', top: '#5a5a62', bottom: '#3a3a42', longSleeve: true, scale: AD * 0.97 * (s || 1) });
CF.tiff = (s) => vin({ hair: '#3a2a22', bangs: 'side', backLen: 2.3, sideOpen: 0.7, lashes: true, brow: '#3a2a22', top: '#d8783a', inner: '#f2ece0', bottom: '#3a4a6a', longSleeve: true, scale: AD * 0.97 * (s || 1) });
/* Morpheus: short hair, deep red coat, gold inner (no bald head, no pince-nez); 2021 program: teal suit */
CF.morph = (s) => vin({ hair: '#1a1414', bangs: 'short', backLen: 1.6, ears: true, brow: '#1a1414', shades: true, top: '#7a2232', inner: '#d8b04a', bottom: '#2a1e22', longSleeve: true, skin: MX.skinM, shoes: '#2a1e1e', scale: AD * 1.05 * (s || 1) });
CF.morphR = (s) => vin({ hair: '#1a1414', bangs: 'short', backLen: 1.6, ears: true, brow: '#1a1414', top: '#6a5a50', bottom: '#4a4038', longSleeve: true, skin: MX.skinM, scale: AD * 1.05 * (s || 1) });
CF.morph4 = (s) => vin({ hair: '#1a1414', bangs: 'side', backLen: 1.6, ears: true, brow: '#1a1414', top: '#2a9a8a', inner: '#f2d04a', bottom: '#2a9a8a', longSleeve: true, skin: CK.pal.skin[2], scale: AD * 1.03 * (s || 1) });
/* Agents: plain grey suits, slicked hair, round generic sunglasses (Dan's call, Nov 2026); Smith = mid grey + green-grey tie; 2021 Smith = navy suit */
const suit = (c, tie, hair, s) => { const f = vin({ hair: hair || '#3a2e28', shades: true, bangs: 'part', backLen: 1.6, ears: true, brow: hair || '#3a2e28', top: c, inner: '#eef0f2', bottom: c, longSleeve: true, shoes: '#1a1a1e', scale: AD * (s || 1) });
  const t = mk(new T.BoxGeometry(0.09, 0.42, 0.03), tie); t.position.set(0, 0.72, 0.36); t.rotation.x = -0.12; f.add(t); return f; };
CF.smith = (s) => suit('#6a6e76', '#3a4a40', '#3a2e28', s);
CF.agent = (s, i) => suit(['#4a4e56', '#5a5650', '#3e4450'][(i || 0) % 3], '#2a2a30', ['#2a2420', '#6a5040', '#1a1614'][(i || 0) % 3], s);
CF.smith4 = (s) => suit('#2a3a5a', '#8a2a2a', '#4a3a2a', s);
/* Bane (crew member) */
CF.bane = (s) => vin({ hair: '#5a4030', bangs: 'short', ears: true, brow: '#5a4030', top: '#5a5040', bottom: '#3a3630', longSleeve: true, scale: AD * (s || 1) });
/* ship crew */
CF.tank = (s) => vin({ hair: '#1a1414', bangs: 'short', ears: true, brow: '#1a1414', top: '#c86a3a', bottom: '#4a4038', longSleeve: true, skin: CK.pal.skin[2], scale: AD * (s || 1) });
CF.cypher = (s) => vin({ hair: '#4a3a2e', bangs: 'baby', backLen: 1.4, ears: true, brow: '#4a3a2e', mustache: '#4a3a2e', top: '#7a6a4a', bottom: '#3a3630', longSleeve: true, scale: AD * (s || 1) });
CF.crew = (s, i) => vin({ hair: ['#2a2224', '#6a4a3a', '#1a1410'][(i || 0) % 3], bangs: ['short', 'side', 'part'][(i || 0) % 3], ears: true, top: ['#5a6a5a', '#6a5a6a', '#5a5a6a'][(i || 0) % 3], bottom: '#3a3a3e', longSleeve: true, skin: CK.pal.skin[(i || 0) % 3], scale: AD * (s || 1) });
CF.niobe = (s) => vin({ hair: '#1a1414', bangs: 'part', bun: true, lashes: true, brow: '#1a1414', top: '#3a6a4a', bottom: '#2a3a2e', longSleeve: true, skin: CK.pal.skin[2], scale: AD * 0.96 * (s || 1) });
CF.niobeO = (s) => vin({ hair: '#d8d4cc', bangs: 'part', bun: true, lashes: true, glasses: true, brow: '#b8b4ac', top: '#3a6a4a', bottom: '#2a3a2e', longSleeve: true, skin: CK.pal.skin[2], scale: AD * 0.94 * (s || 1) });
/* Oracle (apron, cookies), spoon kid, Keymaker, Architect, Merovingian, Persephone, twins */
CF.oracle = (s) => vin({ hair: '#3a2e2a', bangs: 'part', bun: true, brow: '#3a2e2a', top: '#c86a5a', inner: '#f4ecdc', bottom: '#6a4a3a', longSleeve: true, skin: CK.pal.skin[2], scale: AD * 0.95 * (s || 1) });
CF.kidS = (s) => vin({ hair: '#f2e6d0', bald: false, bangs: 'baby', backLen: 1.2, ears: true, top: '#e8d8b8', bottom: '#c8b898', scale: 0.85 * (s || 1) });
CF.keym = (s) => vin({ hair: '#e8e4dc', bangs: 'short', backLen: 1.4, ears: true, glasses: true, brow: '#c8c4bc', mustache: '#d8d4cc', top: '#8a7a5a', inner: '#e8e0c8', bottom: '#5a4e3a', longSleeve: true, scale: AD * 0.9 * (s || 1) });
CF.arch = (s) => vin({ hair: '#f4f4f2', bangs: 'part', backLen: 1.6, ears: true, brow: '#e0e0de', top: '#f2f2f0', inner: '#d8dce4', bottom: '#e8e8e6', longSleeve: true, shoes: '#d8d8d8', scale: AD * (s || 1) });
CF.mero = (s) => vin({ hair: '#2a1e18', bangs: 'part', backLen: 1.9, ears: true, brow: '#2a1e18', top: '#7a1a2a', inner: '#f2e6e6', bottom: '#3a1a22', longSleeve: true, scale: AD * (s || 1) });
CF.perse = (s) => vin({ hair: '#1a1414', bangs: 'part', backLen: 2.4, sideOpen: 0.7, lashes: true, brow: '#1a1414', top: '#f2f0ea', bottom: '#f2f0ea', longSleeve: true, scale: AD * 0.97 * (s || 1) });
CF.twin = (s) => vin({ hood: '#dcdcd8', brow: '#c8c8c4', top: '#e4e4e0', bottom: '#d0d0cc', longSleeve: true, skin: '#f4ece6', scale: AD * (s || 1) });
CF.thug = (s, i) => vin({ hair: ['#2a2228', '#6a4a3a', '#1a1410'][(i || 0) % 3], bangs: 'short', ears: true, top: ['#2a2a30', '#3a3a44', '#4a3434'][(i || 0) % 3], bottom: '#22242a', longSleeve: true, skin: CK.pal.skin[(i || 0) % 3], scale: AD * (s || 1) });
CF.cop = (s, i) => vin({ hat: '#2a3450', brow: '#2a2220', top: '#2a3a5a', bottom: '#1e2638', longSleeve: true, skin: CK.pal.skin[(i || 0) % 3], scale: AD * (s || 1) });
CF.boss = (s) => vin({ hair: '#6a6a6e', bangs: 'short', ears: true, glasses: true, brow: '#5a5a5e', top: '#5a5e66', inner: '#ffffff', bottom: '#3a3d44', longSleeve: true, scale: AD * 1.05 * (s || 1) });
CF.club = (s, i) => vin({ hair: ['#c03a6a', '#2a2224', '#e0c060'][(i || 0) % 3], bangs: ['side', 'part', 'short'][(i || 0) % 3], ears: true, lashes: !!((i || 0) % 2), top: ['#2a1a3a', '#1a1a22', '#3a1a2a'][(i || 0) % 3], bottom: '#1a1a22', longSleeve: true, skin: CK.pal.skin[(i || 0) % 3], scale: AD * (s || 1) });
/* 2021: the Analyst (white sweater, glasses), Bugs (orange hair, red jacket), Chad (Tiffany's husband), swarm townsfolk */
CF.analyst = (s) => vin({ hair: '#c8a878', bangs: 'side', backLen: 1.6, ears: true, glasses: true, brow: '#a88a5a', top: '#f2eee6', bottom: '#5a5a66', longSleeve: true, scale: AD * (s || 1) });
CF.bugs = (s) => vin({ hair: '#e8783a', bangs: 'side', backLen: 1.7, sideOpen: 0.8, lashes: true, brow: '#c8582a', top: '#a82a2a', inner: '#1e1e24', bottom: '#2a2a32', longSleeve: true, skin: CK.pal.skin[1], scale: AD * 0.95 * (s || 1) });
CF.chad = (s) => vin({ hair: '#c8a060', bangs: 'side', ears: true, brow: '#a8803a', top: '#4a8ac0', bottom: '#d8c8a0', longSleeve: false, scale: AD * (s || 1) });
CF.folk = (s, i) => vin({ hair: ['#2a2224', '#8a5a3a', '#d8c070', '#1a1410'][(i || 0) % 4], bangs: ['short', 'side', 'part', 'short'][(i || 0) % 4], ears: true, lashes: !!((i || 0) % 2), top: ['#7a8a9a', '#a07a6a', '#6a8a6a', '#8a7a9a'][(i || 0) % 4], bottom: '#3a3a44', longSleeve: true, skin: CK.pal.skin[(i || 0) % 3], scale: AD * (s || 1) });
CF.zion = (s, i) => vin({ hair: ['#1a1410', '#5a3a2a', '#2a2224'][(i || 0) % 3], bangs: ['short', 'baby', 'side'][(i || 0) % 3], ears: true, top: ['#7a6a52', '#6a5a4a', '#5a6a5a'][(i || 0) % 3], bottom: '#4a4238', longSleeve: true, skin: CK.pal.skin[(i + 1 || 1) % 3], scale: AD * (s || 1) });
CF.heartR = (s) => { const g = new T.Group(), m = '#ff5a7a', o = { emissive: new T.Color('#ff2a5a'), emissiveIntensity: 0.35 }; for (const x of [-0.17, 0.17]) g.add(at3(mk(new T.SphereGeometry(0.22, 14, 10), m, o), x, 0.08, 0)); const c = mk(new T.ConeGeometry(0.33, 0.46, 14), m, o); c.rotation.z = Math.PI; c.position.y = -0.2; g.add(c); g.scale.setScalar(s || 1); return g; };
CF.mkid = (s, i) => vin({ hair: ['#3a2a22', '#e0b060'][(i || 0) % 2], bangs: ['side', 'part'][(i || 0) % 2], pigtails: !!((i || 0) % 2), lashes: !!((i || 0) % 2), ears: true, top: ['#f2a03a', '#e86a9a'][(i || 0) % 2], bottom: '#4a6aa0', scale: 0.85 * (s || 1) });
