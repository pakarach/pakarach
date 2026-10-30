# Voice-over sync (Dan's TTS -> one clip per beat)

1. TTS script (post kit, after approval): .txt, one paragraph per beat in BEATS order, every beat except `cover` and `end`, blank line between, short spoken lines (1-3 s), numbers in Thai words, nothing the TTS shouldn't read. Ask Dan for ~0.5-1 s pauses between paragraphs.
2. When the wav/mp3 arrives: copy it into its own folder, then from the engine folder
   `python3 vo-align.py voice.wav script.txt vo.json` (numpy + ffmpeg). Pauses RMS < -40 dB >= 0.25 s, DP split against expected paragraph length. Read the table: a run of `<<` rows = drift (try silence_db -35/-45, or ask for longer pauses).
3. Build with `--data vo=vo.json`. In video.js nothing else changes when the skeleton is `const B = FK.beats(BEATS, DATA.vo)` + `FK.chillBed({..., voice: FK.voice(DATA.vo, B)})`: beats grow to fit their clip (lead 0.3 s + 0.6 s tail), every at()/end() time shifts with them, clips play in live play and in Render MP4.
4. Test: wait for `window.__voiceOk`, `__ve.play(2)`, no console errors. Say which beats grew; ask Dan to report any line landing on the wrong scene (fix that one boundary in vo.json by hand). A different voice later = redo from step 2 with the same script.
