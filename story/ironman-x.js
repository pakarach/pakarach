/* Iron Man (2008) cast — original vinyl chibis: no actor likeness, no suit/mask/chest-light designs. Loaded after k-vinyl.js. */
CF.tony = (s) => vin({ hair: '#2a1e18', bangs: 'short', brow: '#2a1e18', top: '#2c3756', inner: '#ffffff', bottom: '#232838', longSleeve: true, shoes: '#2a2a2e', scale: AD * (s || 1) });
CF.tonyC = (s) => vin({ hair: '#2a1e18', bangs: 'short', brow: '#2a1e18', top: '#9a917c', bottom: '#5a5040', shoes: '#4a4036', scale: AD * (s || 1) });
CF.yinsen = (s) => vin({ hair: '#77716a', bangs: 'short', backLen: 1.75, glasses: true, brow: '#55504a', top: '#b08a5a', bottom: '#6a5a44', longSleeve: true, skin: CK.pal.skin[1], scale: AD * (s || 1) });
CF.boss = (s) => vin({ hood: '#8a2a2a', brow: '#141414', top: '#2e2e34', bottom: '#3a3a40', longSleeve: true, skin: CK.pal.skin[1], scale: AD * (s || 1) });
CF.gun = (s, c) => vin({ hood: c || '#5a5040', brow: '#141414', top: '#3a3a34', bottom: '#2e2e2a', longSleeve: true, skin: CK.pal.skin[1], scale: AD * (s || 1) });
CF.rhodey = (s) => vin({ hair: '#1a1410', bangs: 'short', backLen: 1.6, brow: '#1a1410', top: '#5f7046', bottom: '#4a5636', longSleeve: true, skin: CK.pal.skin[2], scale: AD * (s || 1) });
CF.pepper = (s) => vin({ hair: '#d08a4c', bangs: 'part', bun: true, lashes: true, brow: '#a0663a', top: '#f4ece0', inner: '#7aa6ff', bottom: '#3a4a6a', longSleeve: true, scale: AD * (s || 1) });
CF.obad = (s) => vin({ hair: '#d6d6dc', bangs: 'short', backLen: 1.6, brow: '#b8b8c0', top: '#55607a', inner: '#ffffff', bottom: '#3a4256', longSleeve: true, scale: AD * 1.12 * (s || 1) });
CF.rep = (s, c) => vin({ hair: ['#3a2a22', '#6b4a3a', '#2b2b33'][(c || 'a').length % 3], hairStyle: ['bob', 'tuft', 'bob'][(c || 'ab').charCodeAt(2) % 3], top: c || '#6a7aa0', bottom: '#3a3d4d', skin: CK.pal.skin[(c || 'a').charCodeAt(3) % 3], scale: AD * (s || 1) });
CF.vil = (s, c) => vin({ hood: c || '#c09a6a', top: c || '#c09a6a', bottom: '#8a6a4a', longSleeve: true, skin: CK.pal.skin[1], scale: (s && s < 0.7 ? 0.8 : AD) * (s && s >= 0.7 ? s : 1) });
CF.soldier = (s) => vin({ hair: '#2a2228', bangs: 'short', hat: '#5f7046', top: '#5f7046', bottom: '#4a5636', longSleeve: true, scale: AD * (s || 1) });
