# Sound (fact channel) — soft, easy-listening, no heavy bass

Why: viewers said "ลำโพงจะแตก" (Seoul alert, Mekong saw bass + riser/boom). Every tense beat plays soft, never as an alarm.

Rules
- Never the engine mood beds ('drive','tense','dark',...: sawtooth bass) or heavy SFX `thump`, `boom`, `riser`, `warn`.
- Bus gain 0.75 (FK.chillBed default). No SFX above vol ~0.06; nothing under ~100 Hz (only the bed's quiet octave-3 bass).
- Long clips (3 min+): keep scheduled audio nodes near 1,000 (pad on 3 notes, hats every other bar; FK.chillBed vol option).

Standard wiring (kit-fact v1.1)
```js
FK.softSfx();                       // soft, chime, bell, tok, glide, splash, water, rain, roar, siren (+ engine pop/shimmer are fine)
bed: [FK.chillBed({ DUR, calm: (t) => t >= at('danger') && t < end('danger'), voice: FK.voice(DATA.vo, B) })],
// calm(t) true during tense/danger beats -> minor chords, sparse plucks, no hats. vol: 0.6 when a voice-over is present.
```
SFX map: glide = camera moves + each iris; tok = counters; pop = labels; soft = bar rise; bell = rank reveal / new name; chime + shimmer = #1.
Custom SFX (horse clops, tram bell, train chug, propeller, ship horn, gong...) via `VE.registerSfx`, kept at vol <= 0.05 and no lowpass under ~700 Hz.
Siren if really needed: `siren` (sine 520 -> 410 Hz, vol 0.03), never square `warn`.
Sound can't be heard in the sandbox: check by reading the code and say so in the delivery note.
