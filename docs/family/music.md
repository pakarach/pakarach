# Music (music-cute.js, every video; never the engine mood beds)
One preset per scene range, switched at iris midpoints (each fades itself):
- `CK.MUSIC.CUTE` everyday / info / numbers / prevention (C major music box, pluck bass, shaker, 112 bpm)
- `CK.MUSIC.OOPS` mechanism / what goes wrong / doctor list (A minor, 96 bpm, sparser, never scary)
- `CK.MUSIC.NIGHT` night + danger (very sparse; heartbeat SFX carries tension)
- `CK.MUSIC.WARM` closing family scene (92 bpm, bell harmonics)
Example: `bed: [CK.musicBed(at('s1'), at('s4'), CK.MUSIC.CUTE), CK.musicBed(at('s4'), at('s5'), CK.MUSIC.OOPS), CK.musicBed(at('s5'), at('s6'), CK.MUSIC.NIGHT), ..., CK.musicBed(at('s8'), DUR - 1.5, CK.MUSIC.WARM)]`.
With a voice-over: `bed: [VE.voiceBed(VE.voice(DATA.vo, B)), ...music beds]` (bus gain 0.75; untested by ear — say so and ask Dan if the music covers the voice).
Keep ~500-600 scheduled audio nodes (music + SFX) per clip; count by monkey-patching createOscillator/createBufferSource in Playwright after `__ve.play(0)`. To vary: copy a preset, change `prog` (CK.CHORDS), `pat` or `bpm`; keep the music-box timbre.
SFX events: pop, whoosh, sneeze, cough, breath, wheeze, heartbeat, warn, boing, thud, boom, rain, bubble, buzz (mosquito), giggle, twinkle, heart, tick, ding, riser, shimmer.
