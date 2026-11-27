/* gambit-full cast + sets. EVERY FIGURE HERE IS A PLACEHOLDER: plain vinyl chibis in neutral colours with a name badge on the chest.
   Swap any of them by redefining the same CF name (keep the name, the scenes look it up):
     CF.gambit = (s) => { const c = vin({...}); dress(c, {...}); return c; };                       // from Vinyl Chibi Editor
     CF.gambit = (s) => { const m = myBuilder(); return actor(m.root, { head: ..., armR: ..., armL: ... }, 1.8 * (s || 1)); };   // own model
   Badges: tag(c, 'name') — drop it from your own actors if you don't want the badge. */
function tag(c, name) {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128; const x = cv.getContext('2d');
  x.fillStyle = 'rgba(21,20,26,.82)'; const r = 40; x.beginPath(); x.moveTo(r, 8); x.arcTo(504, 8, 504, 120, r); x.arcTo(504, 120, 8, 120, r); x.arcTo(8, 120, 8, 8, r); x.arcTo(8, 8, 504, 8, r); x.fill();
  x.font = '700 ' + (name.length > 9 ? 54 : 66) + 'px Kanit, Trirong, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e0'; x.fillText(name, 256, 68);
  const sp = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false }));
  const k = 1 / (c.scale.x || 1); sp.scale.set(1.25 * k * 1.25, 0.31 * k * 1.25, 1); sp.position.set(0, 1.12, 0.62); sp.renderOrder = 5; c.add(sp); c.userData.badge = sp; return c;
}
const ph = (name, o, kid) => (s) => tag(vin(Object.assign({ brow: o.hair || '#3a2a22', shoes: '#2e2e34', longSleeve: true }, o, { scale: (kid ? 0.8 : AD) * (o.k || 1) * (s || 1) })), name);
const phD = (name, o, d, kid) => (s) => { const c = ph(name, o, kid)(s); dress(c, d); return c; };

/* ---- named cast (PLACEHOLDERS) ---- */
CF.gambit = phD('แกมบิท', { hair: '#4a3328', bangs: 'side', backLen: 1.85, top: '#7d8a99', bottom: '#33384a' }, { prop: 'card', propColor: '#3a4a7a' });
CF.gambitKid = ph('เรมี่ (เด็ก)', { hair: '#4a3328', bangs: 'side', top: '#9aa6b4', bottom: '#4a5068' }, true);
CF.baby = (s) => { const g = new T.Group(); const b = new T.Mesh(new T.SphereGeometry(0.34, 18, 14), CK.mat(T, '#f2ece0')); b.scale.set(1.25, 0.8, 0.9); b.position.y = 0.3; g.add(b);
  const h = new T.Mesh(new T.SphereGeometry(0.16, 14, 12), CK.mat(T, CK.pal.skin[0])); h.position.set(0.3, 0.36, 0.05); g.add(h); g.scale.setScalar(s || 1); return g; };
CF.jeanluc = ph('ฌอง-ลุค', { hair: '#6a6a70', bangs: 'short', backLen: 1.7, mustache: '#5a5a60', top: '#6a5a7a', bottom: '#2e2a36' });
CF.henri = ph('อองรี', { hair: '#2e2420', bangs: 'short', backLen: 1.7, top: '#8a9a7a', bottom: '#3a3a30' });
CF.antiquary = phD('แอนทีควอรี่', { hair: '#9a9aa0', bald: true, top: '#4a4a52', bottom: '#2a2a30' }, { cape: '#3a3640', capeLen: 0.9 });
CF.bellaKid = ph('เบลล่า (เด็ก)', { hair: '#d8c08a', bangs: 'part', backLen: 2.2, lashes: true, top: '#a8c8c0', bottom: '#5a6a70' }, true);
CF.bella = ph('เบลล่า ดอนน่า', { hair: '#d8c08a', bangs: 'part', backLen: 2.4, lashes: true, top: '#a8c8c0', bottom: '#4a5a60' });
CF.julien = ph('จูเลียน', { hair: '#c8b080', bangs: 'short', backLen: 1.7, top: '#7a8a8a', bottom: '#2e3436' });
CF.sinister = phD('ซินิสเตอร์', { hair: '#2a2a30', bangs: 'none', backLen: 1.7, top: '#5a6070', bottom: '#2a2e38', k: 1.1 }, { cape: '#3a3e4a', capeLen: 0.85 });
CF.sabre = ph('เซเบอร์ทูธ', { hair: '#8a8a7a', bangs: 'short', top: '#6a7060', bottom: '#3a3c34', k: 1.15 });
CF.marauder = ph('มาโรเดอร์ส', { hair: '#3a3a40', bangs: 'short', top: '#5e646e', bottom: '#2e3036' });
CF.sarah = ph('ซาร่าห์', { hair: '#c8a0b8', bangs: 'baby', pigtails: true, top: '#d8c8b0', bottom: '#8a7a6a' }, true);
CF.storm = ph('สตอร์ม', { hair: '#3a2e2a', bangs: 'part', backLen: 2.5, lashes: true, skin: CK.pal.skin[2], top: '#7aa08a', bottom: '#3a4a42' });
CF.stormKid = ph('สตอร์ม (เด็ก)', { hair: '#3a2e2a', bangs: 'baby', bun: true, lashes: true, skin: CK.pal.skin[2], top: '#a8c0a0', bottom: '#6a7a5a' }, true);
CF.cyclops = ph('ไซคลอปส์', { hair: '#5a3a2a', bangs: 'short', top: '#8a9aa8', bottom: '#3a4048' });
CF.wolverine = ph('วูล์ฟเวอรีน', { hair: '#2a2420', bangs: 'short', top: '#7a7a6a', bottom: '#3a3a34', k: 0.95 });
CF.beast = ph('บีสต์', { hair: '#5a5a5a', bangs: 'short', top: '#9a8a7a', bottom: '#4a4038', k: 1.15 });
CF.psylocke = ph('ไซล็อค', { hair: '#2a2a2e', bangs: 'side', backLen: 2.5, lashes: true, top: '#7a9a9a', bottom: '#34403e' });
CF.jubilee = ph('จูบิลี่', { hair: '#2a2a2e', bangs: 'baby', backLen: 1.6, lashes: true, top: '#a0b0c8', bottom: '#4a5060', k: 0.9 });
CF.rogue = phD('โร้ก', { hair: '#6a4a3a', bangs: 'part', backLen: 2.3, lashes: true, top: '#a08ab0', bottom: '#3a3d4d' }, { gloves: '#e8e4dc' });
CF.hunter = ph('นักล่าค่าหัว', { hair: '#3a3a3a', bangs: 'short', top: '#6a6460', bottom: '#2e2c2a' });
CF.erik = phD('อีริคเดอะเรด', { hair: '#6a6a6a', hood: '#5a5258', top: '#5a5258', bottom: '#2a2628' }, { cape: '#4a4248', capeLen: 1 });
CF.apoc = ph('อะพอคคาลิปส์', { hair: '#3a3a3a', bald: true, top: '#6a6a5a', bottom: '#3a3a30', k: 1.45 });
CF.horseman = ph('ม้าสาวก', { hair: '#3a3a3a', bangs: 'short', top: '#7a6a5a', bottom: '#3a3430' });
CF.sunfire = ph('ซันไฟร์', { hair: '#1e1e22', bangs: 'short', top: '#8a9a8a', bottom: '#3a403a' });
CF.kitty = ph('คิตตี้ ไพรด์', { hair: '#5a3a2a', bangs: 'part', backLen: 2.1, lashes: true, top: '#b8a8c8', bottom: '#4a4a5a' });
CF.colossus = ph('โคลอสซัส', { hair: '#3a2a20', bangs: 'short', top: '#8a8a9a', bottom: '#3a3a44', k: 1.2 });
CF.kurt = ph('ไนท์ครอว์เลอร์', { hair: '#2a2a30', bangs: 'side', top: '#9a8a8a', bottom: '#3a3436' });
CF.dp = ph('เดดพูล', { hair: '#3a3a3a', bald: true, top: '#7a8a7a', bottom: '#2e342e' });
CF.elektra = ph('เอเล็คตร้า', { hair: '#1e1e22', bangs: 'part', backLen: 2.3, lashes: true, top: '#8a8aa0', bottom: '#30303e' });
CF.blade = ph('เบลด', { hair: '#1e1e22', bangs: 'short', skin: CK.pal.skin[3] || CK.pal.skin[2], top: '#6a7a8a', bottom: '#2e3440' });
CF.x23 = ph('เอ็กซ์ยี่สิบสาม', { hair: '#2a2420', bangs: 'side', backLen: 2.2, lashes: true, top: '#9aa0a8', bottom: '#3a3e44', k: 0.9 });
/* unnamed extras (fans, bullies, guild members, guests, morlocks, viewers) */
CF.extra = (s, n) => { const L = [['#7aa0b8', '#3a2a22', 'short'], ['#c8a070', '#2a2a30', 'part'], ['#a0b088', '#5a3a2a', 'side'], ['#b89ab0', '#6a4a3a', 'baby']][(n || 0) % 4];
  return vin({ hair: L[1], bangs: L[2], backLen: L[2] === 'part' ? 2.2 : 1.75, lashes: L[2] === 'part', brow: L[1], top: L[0], bottom: '#3a3d4d', shoes: '#2e2e34', longSleeve: true, scale: AD * 0.95 * (s || 1) }); };
CF.extraKid = (s, n) => { const c = CF.extra(1, n); c.scale.setScalar(0.8 * (s || 1)); return c; };
/* the giant robot attack: a coloured light, not a design */
CF.giant = (s) => { const g = CF.streak(1, 'rgba(255,150,110,1)'); g.scale.setScalar(4 * (s || 1)); return g; };
CF.dark = (s, c) => { const g = softSprite(c || 'rgba(120,60,160,1)', 0.9); g.scale.setScalar(3 * (s || 1)); return g; };
CF.sign = (s, txt, col) => { const g = new T.Group(), l = FK.label(T, txt, { px: txt.length > 16 ? 60 : 78, color: col || '#ffd66a', w: 5.2 }); l.material.depthTest = true; g.add(l); g.scale.setScalar(s || 1); return g; };

/* ---- sets ---- */
const lamps = (st, xs, z, c) => xs.map((x) => { const lp = softSprite(c || 'rgba(255,214,150,1)', 0.6); lp.scale.setScalar(2.2); place(lp, st, x, 5.4, z || -5); return lp; });
Object.assign(ENVB, {
  gstudio(st) { const out = ENVB.room(st, { floor: '#c4ad8c', wall: '#efe3cf', side: '#e6d8c2', lamps: [-5, 0, 5] });
    out.push(...decor(st, [[CF.shelf(1.25, '#8a6040'), -5.6, 0, -5.8], [CF.shelf(1.25, '#8a6040'), -3.1, 0, -5.8], [CF.shelf(1.25, '#8a6040'), 5.6, 0, -5.8], [CF.lamp(1), 7.2, 0, -4.5]])); return out; },
  gstreet(st) { const out = []; const fl = mk(new T.BoxGeometry(40, 0.2, 18), '#3a3438'); place(fl, st, 0, -0.1, -2); out.push(fl);
    const cols = ['#7a5a6a', '#5a6a7a', '#7a6a4a', '#5a7a6a', '#6a5a7a', '#8a6a5a'];
    for (let i = 0; i < 9; i++) { const h = CF.house(1.6, cols[i % 6]); place(h, st, -16 + i * 4, 0, -7.5 - (i % 2) * 1.2); out.push(h); }
    for (const x of [-8, -2.5, 3, 8.5]) { const l = CF.lamp(1); place(l, st, x, 0, -4.2); out.push(l); out.push(...lamps(st, [x], -4.2, 'rgba(255,200,120,1)').map((p) => { p.position.y = 3.6; p.scale.setScalar(1.6); return p; })); }
    for (let i = 0; i < 7; i++) { const ln = CF.lantern(0.7, ['#d04a3a', '#e0a040', '#4a8ad0'][i % 3]); place(ln, st, -10 + i * 3.3, 4.6, -6); out.push(ln); }
    return out; },
  ghosp(st) { const out = ENVB.room(st, { floor: '#cfd6dc', wall: '#eaf0f2', side: '#dfe6ea', lamps: [-3, 3], lampC: 'rgba(230,245,255,1)' }); out.push(...decor(st, [[CF.cot(1.1), -3.4, 0, -3.6], [CF.cot(1.1), 3.6, 0, -3.6]])); return out; },
  gguild(st) { const out = ENVB.room(st, { floor: '#3a2a20', wall: '#2a1c18', side: '#241814', banner: '#6a2424', lamps: [-4, 4], lampC: 'rgba(255,190,120,1)' });
    out.push(...decor(st, [[CF.candles(1, 7), -4.5, 0, -5.2], [CF.candles(1, 7), 4.5, 0, -5.2], [CF.table(1.3, '#4a3020'), 0, 0, -4.4]])); return out; },
  gwed(st) { const out = ENVB.room(st, { floor: '#e6d8c8', wall: '#f6ecea', side: '#f0e2e0', banner: '#f2c6d0', lamps: [-4, 0, 4], lampC: 'rgba(255,230,200,1)' });
    out.push(...decor(st, [[CF.arch(1.4), 0, 0, -3.6], [CF.candles(1, 6), -4, 0, -4.6], [CF.candles(1, 6), 4, 0, -4.6]])); return out; },
  glab(st) { const out = ENVB.room(st, { floor: '#1c1e24', wall: '#15171d', side: '#181a20' });
    out.push(...decor(st, [[CF.screens(1.6), 0, 0, -6.0], [CF.pod(1.1), -5, 0, -4.4], [CF.pod(1.1), 5, 0, -4.4], [CF.console ? CF.console(1) : CF.desk(1), 2.6, 0, -3.8]])); out.push(...lamps(st, [-5, 5], -4.4, 'rgba(120,230,170,1)')); return out; },
  gtunnel(st) { return ENVB.room(st, { floor: '#2c2824', wall: '#1e1a18', side: '#221e1a', rocks: true, lamps: [-3, 4], lampC: 'rgba(255,170,90,1)' }); },
  gmansion(st) { const out = ENVB.room(st, { floor: '#2a3348', wall: '#1e2a48', side: '#22304e', banner: '#3a5a9a', lamps: [-5, 0, 5] }); out.push(...decor(st, [[CF.sofa(1, '#4a5a7a'), -4.6, 0, -4.6]])); return out; },
  gcinema(st) { const out = ENVB.room(st, { floor: '#1e161a', wall: '#140e12', side: '#1a1216' });
    const sc = new T.Mesh(new T.PlaneGeometry(12, 5), basic('#f4ead6')); place(sc, st, 0, 3.6, -6.25); out.push(sc);
    for (let r = 0; r < 2; r++) for (const x of [-4.2, 0, 4.2]) { const s = CF.sofa(0.9, '#8a2a34'); place(s, st, x, 0, 2.6 + r * 1.6); s.rotation.y = Math.PI; out.push(s); } return out; },
  gvoid(st) { const out = ENVB.desert(st, { seed: 41 }); out.push(...decor(st, [[CF.ruin(1.4), -6, 0, -5], [CF.wreck(1.2), 5.5, 0, -4.6]])); return out; },
  ggenosha(st) { const out = ENVB.village(st, {}); out.push(...decor(st, [[CF.bldg(0.35, 8, 20, 8, '#5a5a66'), -9, 0, -10], [CF.bldg(0.35, 8, 26, 8, '#4a4a56'), 9, 0, -11]])); return out; },
});
