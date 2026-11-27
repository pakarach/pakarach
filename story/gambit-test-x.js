/* gambit-test cast: PLACEHOLDERS ONLY (plain vinyl chibis). Swap in your own actors here:
   - kit chibi:  CF.gambit = (s) => { const c = vin({...}); dress(c, {...}); return c; };   (make the line in Vinyl Chibi Editor)
   - own model:  paste your builder function above, then  CF.gambit = (s) => { const m = myBuilder(); return actor(m.root, { head: m.parts.head, armR: ..., armL: ... }, 1.8 * (s || 1)); };
   Keep the names CF.gambit and CF.rogue so the scenes find them. */
CF.gambit = (s) => { const c = vin({ hair: '#3a2a22', bangs: 'short', backLen: 1.75, brow: '#3a2a22', top: '#6f7d8c', bottom: '#2e3240', shoes: '#2a2a2e', longSleeve: true, scale: AD * (s || 1) }); return c; };
CF.rogue = (s) => { const c = vin({ hair: '#6a4a3a', bangs: 'part', backLen: 2.3, sideOpen: 0.7, lashes: true, brow: '#5a3a2a', top: '#8a7aa0', bottom: '#3a3d4d', shoes: '#2a2a2e', longSleeve: true, scale: AD * 0.96 * (s || 1) });
  dress(c, { gloves: '#e8e4dc' }); return c; };
