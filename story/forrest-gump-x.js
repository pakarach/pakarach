/* Forrest Gump (1994) cast — original vinyl chibis: no actor likeness, no film costumes (no white suit, no plaid, no beard). Loaded after k-vinyl.js. */
const FG = { hair: '#5a3e26', top: '#6f7d3c', bottom: '#c8b48a' };
CF.forK = (s, nob) => { const c = vin({ hair: FG.hair, bangs: 'short', backLen: 1.75, ears: true, brow: FG.hair, top: FG.top, bottom: FG.bottom, shoes: '#6a4a32', scale: 0.8 * (s || 1) }); return nob ? c : braces(c); };
CF.forr = (s) => vin({ hair: FG.hair, bangs: 'short', backLen: 1.7, ears: true, brow: FG.hair, top: FG.top, bottom: FG.bottom, shoes: '#6a4a32', scale: AD * (s || 1) });
CF.forA = (s) => vin({ hair: FG.hair, bangs: 'short', ears: true, brow: FG.hair, hat: '#56653c', top: '#5f7046', bottom: '#4a5636', longSleeve: true, shoes: '#2a2a22', scale: AD * (s || 1) });
CF.forU = (s) => vin({ hair: FG.hair, bangs: 'short', backLen: 1.7, ears: true, brow: FG.hair, top: '#c03a3a', stripes: '#f4f4f0', bottom: '#f4f4f0', shoes: '#f4f4f4', scale: AD * (s || 1) }); // college uniform
CF.forW = (s) => vin({ hair: FG.hair, bangs: 'short', backLen: 1.7, ears: true, brow: FG.hair, top: '#3a5a8a', bottom: '#2e3a4e', longSleeve: true, shoes: '#2a2a2e', scale: AD * (s || 1) }); // wedding / suit (navy, not the film's)
CF.jenK = (s) => vin({ hair: '#c8a060', bangs: 'part', backLen: 2.25, sideOpen: 0.7, lashes: true, brow: '#a07a40', top: '#f07a6a', bottom: '#f4e6d0', shoes: '#ffffff', scale: 0.8 * (s || 1) });
CF.jen = (s) => vin({ hair: '#c8a060', bangs: 'part', backLen: 2.3, sideOpen: 0.7, lashes: true, brow: '#a07a40', top: '#f06a5a', bottom: '#3a4a6a', shoes: '#ffffff', scale: AD * 0.96 * (s || 1) });
CF.jenW = (s) => vin({ hair: '#c8a060', bangs: 'part', backLen: 2.3, sideOpen: 0.7, lashes: true, brow: '#a07a40', top: '#fbf6ee', bottom: '#fbf6ee', shoes: '#ffffff', bow: '#ffb0c8', scale: AD * 0.96 * (s || 1) });
CF.mom = (s) => vin({ hair: '#5a3a2a', bangs: 'part', bun: true, lashes: true, brow: '#4a2e20', top: '#8a5aa8', bottom: '#6a4a88', longSleeve: true, scale: AD * (s || 1) });
CF.bub = (s) => vin({ hair: '#1a1410', bangs: 'short', ears: true, brow: '#1a1410', hat: '#56653c', top: '#5f7046', bottom: '#4a5636', longSleeve: true, shoes: '#2a2a22', skin: CK.pal.skin[2], scale: AD * (s || 1) });
CF.danA = (s) => vin({ hair: '#c8a878', bangs: 'short', ears: true, brow: '#a88a5a', hat: '#4a5a34', top: '#4f6040', bottom: '#3e4a30', longSleeve: true, shoes: '#2a2a22', scale: AD * 1.04 * (s || 1) });
CF.danC = (s) => vin({ hair: '#c8a878', bangs: 'short', backLen: 1.7, ears: true, brow: '#a88a5a', glasses: true, top: '#7a8088', bottom: '#4a4e56', longSleeve: true, scale: AD * 1.04 * (s || 1) });
CF.boy = (s) => vin({ hair: FG.hair, bangs: 'short', backLen: 1.75, ears: true, brow: FG.hair, top: '#5aa0d8', bottom: '#3a4a6a', shoes: '#ffffff', scale: 0.8 * (s || 1) });
CF.lady = (s) => vin({ hair: '#3a2a22', bangs: 'part', bun: true, lashes: true, hat: '#f2c4d0', top: '#ffd2a0', bottom: '#8a6a9a', scale: AD * 0.95 * (s || 1) });
CF.prin = (s) => vin({ hair: '#8a8a90', bangs: 'short', backLen: 1.6, glasses: true, brow: '#6a6a70', top: '#4a4e5a', inner: '#ffffff', bottom: '#30343e', longSleeve: true, scale: AD * (s || 1) });
CF.coach = (s) => vin({ hair: '#4a3a2a', bangs: 'short', hat: '#c03a3a', brow: '#3a2a1a', top: '#f4f4f0', bottom: '#30343e', mustache: '#4a3a2a', scale: AD * 1.05 * (s || 1) });
CF.bully = (s, c) => vin({ hair: c === 2 ? '#c89a5a' : '#2a2228', hairStyle: c === 2 ? 'tuft' : 'short', top: ['#4a6ab0', '#b0703a', '#5a8a4a'][c || 0], bottom: '#3a3d4d', scale: 0.8 * (s || 1) });
CF.kid = (s, c) => vin({ hair: ['#3a2a22', '#c89a5a', '#2b2b33', '#6b4a3a'][c % 4], hairStyle: ['bob', 'tuft', 'short', 'bun'][c % 4], top: ['#f2a03a', '#7ab0e0', '#e07a9a', '#9ac05a'][c % 4], bottom: '#3a3d4d', skin: CK.pal.skin[c % 3], scale: 0.8 * (s || 1) });
CF.jog = (s, c) => vin({ hair: ['#3a2a22', '#c89a5a', '#2b2b33', '#8a5a3a', '#1a1410'][c % 5], hairStyle: ['short', 'bob', 'tuft', 'bun', 'short'][c % 5], top: ['#e05a4a', '#4a8ad0', '#f2c24a', '#8a5ab0', '#4aa080'][c % 5], bottom: '#3a3d4d', skin: CK.pal.skin[c % 3], scale: AD * (s || 1) });
CF.soldier2 = (s, c) => vin({ hair: '#2a2228', bangs: 'short', hat: '#56653c', top: '#5f7046', bottom: '#4a5636', longSleeve: true, skin: CK.pal.skin[c || 0], scale: AD * (s || 1) });
CF.truckR = (s) => CF.truck(s, '#b04a3a');
CF.bf = (s) => vin({ hair: '#3a2a1a', bangs: 'part', backLen: 2.2, sideOpen: 0.7, brow: '#2a1a10', mustache: '#3a2a1a', top: '#8a6a3a', inner: '#d8c8a0', bottom: '#3a4a6a', longSleeve: true, scale: AD * 1.04 * (s || 1) });
