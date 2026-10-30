/* music-cute.js — default background music for the family channel (Dan chose it Oct 2026).
   Music-box melody + pluck bass + soft shaker, scheduled as a custom bed ({t0,t1,play}).
   build.js inlines this file after the kit when --kit clay is used.
   Use:  bed: [CK.musicBed(0, 24, CK.MUSIC.CUTE), CK.musicBed(24, 30, CK.MUSIC.OOPS), CK.musicBed(30, 37, CK.MUSIC.NIGHT), CK.musicBed(74, 80, CK.MUSIC.WARM)]
   CUTE  = everyday / info / prevention scenes (C major, bouncy)
   OOPS  = mechanism, "what goes wrong", doctor list (A minor, slower, still cute)
   NIGHT = night / danger scenes (sparse slow music box; pair with heartbeat SFX)
   WARM  = closing family scene (slower, with bell harmonics)
   Presets are plain objects: copy and tweak bpm / prog / pat / mv (melody vol) / bv (bass vol) / shk (shaker vol) / bell / len / rel. */
(function () {
  const CK = (window.CK = window.CK || {});
  const CHORDS = { C: [60, 64, 67, 72], Am: [57, 60, 64, 69], F: [53, 57, 60, 65], G: [55, 59, 62, 67], Dm: [50, 53, 57, 62], E: [52, 56, 59, 64], Em: [52, 55, 59, 64] };
  CK.CHORDS = CHORDS;
  CK.musicBed = function (t0, t1, o) {
    return {
      t0, t1, play(base, from) {
        const { tone, noise } = VE.audio, step = 60 / o.bpm / 2;
        for (let k = 0, tt = t0; tt < t1 - 0.02; tt += step, k++) {
          if (tt < from - 0.01) continue;
          const at = base + tt, bar = Math.floor(k / 8), ch = CHORDS[o.prog[bar % o.prog.length]], i = k % 8, fade = Math.min(1, (t1 - tt) / 0.6, (tt - t0 + 0.3) / 0.6);
          const p = o.pat[(bar % 2) * 8 + i];
          if (p >= 0) {
            const m = ch[p] + 12;
            tone(at, VE.midiHz(m), o.len || 0.09, { vol: o.mv * fade, att: 0.003, rel: o.rel || 0.26 });
            if (o.bell || i === 0) tone(at, VE.midiHz(m + 12), 0.06, { vol: o.mv * 0.3 * fade, att: 0.002, rel: 0.3 });
          }
          if (o.bv && (i === 0 || i === 4)) tone(at, VE.midiHz(ch[i === 4 ? 2 : 0] - 12), 0.12, { type: 'triangle', vol: o.bv * fade, rel: 0.1 });
          if (o.shk && i % 2 === 1) noise(at, 0.045, { type: 'highpass', f: 7000, vol: o.shk * fade });
        }
      },
    };
  };
  CK.MUSIC = {
    CUTE: { bpm: 112, prog: ['C', 'Am', 'F', 'G'], pat: [0, -1, 2, 1, 3, -1, 2, -1, 3, -1, 2, 3, 1, -1, 0, -1], mv: 0.05, bv: 0.06, shk: 0.02 },
    OOPS: { bpm: 96, prog: ['Am', 'F', 'Dm', 'E'], pat: [0, -1, -1, 2, 1, -1, -1, -1, 2, -1, -1, 1, 0, -1, -1, -1], mv: 0.045, bv: 0.04, rel: 0.35 },
    NIGHT: { bpm: 70, prog: ['Am', 'Dm', 'Am', 'E'], pat: [0, -1, -1, -1, 2, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1], mv: 0.04, bv: 0.025, len: 0.18, rel: 0.5 },
    WARM: { bpm: 92, prog: ['F', 'G', 'C', 'C'], pat: [0, -1, 2, 1, 3, -1, 2, -1, 3, -1, 2, 3, 1, -1, 0, -1], mv: 0.05, bv: 0.05, shk: 0.014, bell: true, rel: 0.4 },
  };
})();
