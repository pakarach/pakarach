/* Interstellar (2014) cast — original vinyl chibis: no actor likeness, no film suits/robot/ship designs (astronauts = plain white + colour patch + generic bubble helmet; TARS = glowing orb). Loaded after k-vinyl.js. */
const IS = { coopH: '#5a4030', murphH: '#8a4a2a', suit: '#f2f2ee', suitB: '#dcdcd6' };
const astro = (o, h) => { const c = vin(Object.assign({ top: IS.suit, bottom: IS.suitB, longSleeve: true, shoes: '#9a9ea8' }, o)); return h ? helm(c) : c; };
CF.coop = (s) => vin({ hair: IS.coopH, bangs: 'short', backLen: 1.7, ears: true, brow: IS.coopH, top: '#7a8a5a', inner: '#efe8d8', bottom: '#4a5a7a', longSleeve: true, shoes: '#5a4030', scale: AD * (s || 1) });
CF.coopS = (s, h) => astro({ hair: IS.coopH, bangs: 'short', backLen: 1.7, ears: true, brow: IS.coopH, inner: '#7a8a5a', scale: AD * (s || 1) }, h);
CF.murphK = (s) => vin({ hair: IS.murphH, bangs: 'part', backLen: 2.1, sideOpen: 0.7, lashes: true, brow: '#6a3a20', top: '#f2c24a', bottom: '#4a5a7a', shoes: '#c04a3a', scale: 0.8 * (s || 1) });
CF.murph = (s) => vin({ hair: IS.murphH, bangs: 'part', backLen: 2.3, sideOpen: 0.7, lashes: true, brow: '#6a3a20', top: '#8a2a3a', bottom: '#2e3446', longSleeve: true, shoes: '#2a2a2e', scale: AD * 0.96 * (s || 1) });
CF.murphO = (s) => vin({ hair: '#ececf0', bangs: 'part', bun: true, lashes: true, brow: '#c8c8cc', top: '#b884a8', bottom: '#8a6a88', longSleeve: true, scale: AD * 0.96 * (s || 1) });
CF.tom = (s) => vin({ hair: '#6a4a30', bangs: 'short', hat: '#3a6ab0', brow: '#5a3a20', top: '#c87a3a', bottom: '#3a4a6a', shoes: '#2a2a2e', scale: 0.9 * (s || 1) });
CF.tomA = (s) => vin({ hair: '#6a4a30', bangs: 'short', hat: '#3a6ab0', brow: '#5a3a20', top: '#a05a3a', bottom: '#3a4a6a', longSleeve: true, scale: AD * (s || 1) });
CF.brand = (s) => vin({ hair: '#dcdce0', bangs: 'short', backLen: 1.6, ears: true, glasses: true, brow: '#c0c0c6', top: '#4a4e5a', inner: '#ffffff', bottom: '#30343e', longSleeve: true, shoes: '#2a2a2e', scale: AD * 1.02 * (s || 1) });
CF.amelia = (s, h) => astro({ hair: '#3a2a22', hairStyle: 'bob', lashes: true, brow: '#2a1a12', inner: '#5aa0d8', scale: AD * 0.96 * (s || 1) }, h);
CF.romilly = (s, h, old) => astro({ hair: old ? '#9a9aa0' : '#1a1410', bangs: 'short', ears: true, brow: old ? '#8a8a90' : '#1a1410', inner: '#f08a3a', skin: CK.pal.skin[2], scale: AD * (s || 1) }, h);
CF.doyle = (s, h) => astro({ hair: '#c8a060', bangs: 'short', ears: true, brow: '#a08040', inner: '#2a4a8a', scale: AD * (s || 1) }, h);
CF.mann = (s, h) => astro({ hair: '#6a5a4a', bangs: 'short', backLen: 1.6, ears: true, brow: '#5a4a3a', inner: '#7a7e88', scale: AD * 1.04 * (s || 1) }, h);
CF.doc = (s) => vin({ hair: '#2a2228', hairStyle: 'bob', lashes: true, top: '#f4f6f8', inner: '#8ac0e0', bottom: '#8ac0e0', longSleeve: true, skin: CK.pal.skin[1], scale: AD * 0.96 * (s || 1) });
CF.fam = (s, c) => vin({ hair: ['#8a4a2a', '#3a2a22', '#c89a5a', '#6a4a30'][c % 4], hairStyle: ['bob', 'short', 'tuft', 'bun'][c % 4], top: ['#e07a6a', '#4a8ad0', '#9ac05a', '#8a5ab0'][c % 4], bottom: '#3a3d4d', skin: CK.pal.skin[c % 3], scale: (c > 1 ? 0.8 : AD * 0.96) * (s || 1) });
CF.nguard = (s) => vin({ hair: '#2a2228', bangs: 'short', hat: '#2e3446', top: '#2e3446', bottom: '#22262e', longSleeve: true, scale: AD * (s || 1) });
CF.truckF = (s) => CF.truck(s, '#7a6a52');
