# รู้งี้สรุปหนัง — film recap files (story kit + vinyl cast)

Build: `story/mk-film.sh <film> [out.html]` (e.g. `story/mk-film.sh ironman /home/claude/out/iron-man-recap.html`), 9:16, `--kit fact,clay`.
Parts joined in order: k-pre.js, <film>.js (EP/BEATS/CAP/ST/ENV/CAST/SC), k-base.js, ram1/b-models.js, ram1/b2-atmo.js, k-cast.js, k-vinyl.js, <film>-x.js (cast looks), k-run.js, k-hud.js.

- `<film>.js`: data only. EP {file, title, series:'สรุปหนัง', cover, chap, factHead, facts, src, factFoot, light}, BEATS, CAP, ST stations 200 apart, ENV presets per station, CAST (key: [CF name, scale, arg]), SC per beat (st, bg, cam [t,lx,ly,lz,d,h,sx], A actors, fx, sfx, shake, flash, dim, calm, hud).
- Actor fields: p [x,z,y], to [x,z,t0,t1,y], f (deg | key | [dx,dz]), pose (name | fn(c,r,t,a)), ex (happy giggle worried angry cry sleepy sick), say [text,t0,t1,big], pop, out, lie, sit, fall [t0,t1], fallDir, on [key,'R'|'L'|'x',dx,dy,dz], glide, bob, rot, s, head.
- `<film>-x.js`: the film's cast as `CF.<name> = (s) => vin({...kit-clay chibi options, scale: AD * (s||1)})`. Original looks only: colours, hair, one prop. No actor likeness, no costume/suit/mask/creature/logo designs.
- k-vinyl.js: vin() adapter, dress(c, {...}) costume layer (coat, cape, vest, belt, scarf, bandana, gloves, boots, pads, hand prop; see Vinyl Chibi Editor), props (truck, missile, crates, tarp, bench, cot, battery, case, podium, paper, burger, car, arm, screens, monitor, desk, jet, heli, house, reactor, console, device, boom, puff, flash, streak, flyer), fly(o, path, u, step), set presets desert/room/village/roof, SFX puff/zip.
- Portrait framing for the vinyl cast: see the camera pull-back block at the end of ironman.js (K 2.25, look +1.45).
