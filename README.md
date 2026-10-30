# shorts-engine — shared engine for Dan's two shorts channels

Goal: a video file only holds DATA + scene builders (~100-200 lines). Everything else (captions, brand intro/end frame, transitions, audio, transport, export) lives in the engine, so no chat rewrites it.

Files (this Drive folder)
- core.js (v1.4) — VE: VE.run(cfg), VE.camAt, VE.sfx, VE.registerSfx, VE.audio {tone,noise}, VE.u {clamp,lerp,easeOut,easeIO,easeBack}, VE.mp4.mux (MP4 muxer)
- kit-fact.js — FK (fact channel "RuNgee รู้งี้"): palette, lights, globe, landTest, project, regions (extruded GeoJSON), bar, label, platform/tree/building/person, particles, rankBadge
- kit-clay.js (v2, Oct 2026) — CK (family-health page "พ่อแม่หัวจะปวด"): bright vinyl-toy look. chibi = clay/vinyl body + 2D-drawn anime face decal (big glossy eyes with iris, blush, mouth), sculpted hair locks growing from a hairline fill + shine, blob shadow. FIXED FAMILY CAST CK.family(T,'mom'|'dad'|'mama'|'nana'|'wawa'), CK.neighbor(T,i) for supporting cast, CK.room (wallpaper room), virus, bar, tube + health SFX (sneeze, cough, breath, wheeze, rain, bubble, heart, thud)
- build.js — node build.js video.js out.html --kit fact|clay [--data name=file.json] [--title t] -> ONE .html (core + kit + data + video inlined; Three r128 + Kanit via CDN)
- shot.js — node shot.js out.html outDir t1,t2,... [--scale 0.3 --cols 4] -> PNG frames + sheet.png (uses the sandbox's preinstalled Chrome; Playwright download is blocked)
- overlap.js — node overlap.js out.html t0 t1 step -> lists on-screen head overlaps ('a/b ov=0.3') and frame-edge cuts ('CUT x') between characters. Needs `window.__dbg = { s, camera }` at the end of update(). Characters = objects in state s (or one level down, e.g. s.fam.mom, s.kids[3]) with userData.head. Brief pop-in / walk-in hits are fine; anything that persists is a blocking bug.
- mp4.js — node mp4.js out.html out.mp4 [--fps 30] -> MP4 rendered in the cloud sandbox (CPU only, ~2 s/frame, hours for a clip). Last resort only: Dan renders MP4 himself with the page's 'Render MP4' button in 1-3 minutes. Resumable (delete <out>.frames/ when the video changed).
- mp4mux-test.js — node mp4mux-test.js -> round-trip test of VE.mp4.mux: ffmpeg-made H.264 + AAC chunks (same shape the page passes) muxed, then ffprobe/ffmpeg check streams, durations, keyframes, faststart and frame hashes; must print ALL PASS after any muxer change. Page-flow changes can be checked by driving #mp4 with Playwright and mock VideoEncoder/AudioEncoder classes (addInitScript) that emit chunks from an ffmpeg reference stream.
- prep-world.js — world-atlas 110m -> compact world.geo.json (for globe / country maps)
- example-fact.js, example-clay.js, example-family.js — working video files; copy and change

Setup in a fresh sandbox chat
1. mkdir eng; fetch every file above from this folder into eng/ (Drive: search_files parentId = this folder, then download/read each and Write it). Check each file's byte size against Drive's fileSize; long single lines can lose characters in transfer (node --check catches most).
2. cd eng; npm i three@0.128.0 @fontsource/kanit playwright (maps: also world-atlas topojson-client, then node prep-world.js world.geo.json).
3. Write video.js, build, shot (key frames), overlap.js (family channel), fix, then send the .html.

Video file contract: VE.run({ DUR, file, brand, setup, update, bgAt, danger, hud, caps, trans, audio, bed, endLen, vignette })
- DUR seconds. file = download name. brand = {name, series, color, bg:[c1,c2], icon:'globe'|'heart', endLine, motif:{notes,gap,timbre:'synth'|'bell'}} — keep brand IDENTICAL every video (series is the only field that changes).
- setup({THREE,scene,camera,renderer,W,H}) -> state. Runs AFTER Kanit loads (labels may draw text). Build meshes here.
- update(t,state,{camera,...}) — deterministic in t: animate meshes, call VE.camAt(keys,t,camera,drift). Hide zero-scale meshes.
- bgAt(t)->[c1,c2]; danger(t)->0..1 (red heartbeat vignette); hud(g,t,{W,H}) 2D overlay (e.g. FK.rankBadge).
- vignette: edge colour of the soft edge tint (default 'rgba(0,0,0,.35)'). Family channel uses 'rgba(255,150,190,.16)' so frames stay bright.
- caps: [{t0,t1,y,foot?,lines:[[size,[text|fn(t),color,weight]],...]}] (auto-shrink to 920px, pop-in)
- trans: [{t,dur,type:'iris'|'flash'|'fade',color?}]  audio: [[t,'sfxName',opts?],...]  bed: [{t0,t1,mood:'drive'|'light'|'warm'|'tense'|'dark'}]
- Engine adds automatically: brand mark + series badge (first 3s), opening sting under the hook, end frame (last 1.5s, inside DUR), fade-out, transport, 'Render MP4' and 'WebM (real-time)'.
- Safe zone: captions y 220-760; bottom 380px and right 140px stay clear.

kit-clay v2 notes (family channel)
- CK.chibi options: skin, hair, bangs side|part|short|baby|peek|none, ahoge, bun, pigtails, bald, hood(colour) + bear, ears, top, bottom, shoes, sleeve, longSleeve (sleeve covers most of the arm; mom/nana/wawa have it), stripes (colour, painted flush into the shirt texture, not raised rings), inner (open cardigan), collar, glasses, paci(colour), bow(colour), hat(colour), bib, mustache(colour), lashes, eyeScale, eyeSpread, round, brow, iris, scale. v1 names still work: hairStyle tuft|short|bun|bob|pigtails|bald, accessory glasses|pacifier|bow|hat|bib|bearEars.
- Expressions via userData.setExpr: happy, giggle, worried, sick, sleepy, angry (red pop mark), cry (tears). Blink is automatic in tick(). Call setExpr before tick each frame.
- userData: head, headSpace (scaled head group; CK.surf(T,theta,dphi,r) gives points on the head surface), arm1, arm-1, hand1, hand-1, mark, paci.
- Arms: arm1 / arm-1 are shoulder pivots (sleeve + skin forearm + round hand). rotation.z = 0 hangs straight down; + swings arm1 (screen right) out/up, - swings arm-1 out/up (about +-2.4 = overhead or hugging the head). rotation.x tilts: hanging arms come forward with negative x, raised arms come forward with positive x (never use a negative x on raised arms, they go behind the head). tick() sets a relaxed rest pose (~0.4-0.5 out) and wave; set your pose AFTER tick each frame and only change rotation, never position/scale. Held props: add them to hand1 / hand-1 (they follow the arm); to place something in world space at the hand, updateMatrixWorld(true) then hand1.getWorldPosition(v).
- CK.lights: hemi + warm key + cool fill + 2 rims; the first DirectionalLight is the key (dim it with the hemi for night scenes).
- CK.room(T,{wall,dots,wain,floor,rug,props,bunting,curtain,winX}) -> userData {floor, wall, win, wain} for night tinting (lerp material colour white -> night colour). Bunting/curtains are opt-in (they clutter the caption zone).
- Head sizes (half-width incl. hair, world units): mom 1.1, dad 1.18, neighbour adult (scale 1.4) 1.18, mama 0.8, nana 0.71, wawa 0.53, kid at scale 0.62 0.52. Two characters at the same depth need |dx| >= sum of their half-widths.
- Blocking that never overlaps: parents/adults back row (z ~ -1.2), kids front row (z ~ +1.3); the tallest kid (mama) between or beside parents, never right under a parent's chin; camera high and looking down (pos y ~6, look y ~3.1-3.35, distance ~21 at fov 29) so front-row heads sit below back-row faces. Crowds: second row on a riser (~0.95 high) behind the first.
- Lens: fov ~28-30 and a farther camera (same subject size) for cute, undistorted heads; fov 40 close-ups make heads bulge.

Lessons from tests
- Do not put a 3D label with the same name as the active caption; hide labels of non-active items.
- Keep viruses/props away from the character's face (z offset); keep camera far enough for 9:16.
- Globe r=3 needs camera z about 22 to sit inside the frame.
- Three r128 has no CapsuleGeometry; use cylinders/spheres.
- Close-up on one family member: step them forward (z) and frame with distance ≈ 3.6 × (head height + 0.7) at fov 40 (×1.4 at fov 29), look point slightly above body centre, so the caption sits above the character.
- Arms used to be stubby capsules glued to the body (looked like nubs); keep the shoulder-pivot arms and pose them by rotation only.
- Raised arms: use the arm on the camera side so the gesture reads (arm1 = character's left / screen right when facing camera).
- Off-stage characters: park them at |x| >= 5 from the shot centre (or hide them), and start walk-ins outside the frame.
- window.__renderAt(t) renders one frame deterministically (used by shot.js, overlap.js and mp4.js).
- Render MP4 (core v1.3): the page renders frame by frame with WebCodecs, not in real time, so no dropped frames: soundtrack rendered offline (OfflineAudioContext, same scheduleAll as playback), H.264 1080x1920 30fps ~10 Mbps VBR (cfg.fps / cfg.bitrate override), AAC 192k (Opus if the browser has no AAC encoder), keyframe every 2 s, moov-first MP4 built by VE.mp4.mux. Needs desktop Chrome/Edge (Windows/Mac). Progress shows under the player and in the tab title. Errors fall back to the 'WebM (real-time)' button. Button ids: 'mp4' = Render MP4, 'ex' = WebM (mp4.js clicks #ex to capture the soundtrack, so keep that id). The sandbox's Chromium has no H.264/AAC encoder, so test the muxer in node (node mp4mux-test.js) instead of clicking the button.
- Pre-rendered music (core v1.4, Oct 2026): a bed entry may be `{ play(base, from, A) }` instead of a mood; A = { ctx, bus, master, noise } (the same object for live playback and the offline MP4 soundtrack, so create the AudioBuffer on A.ctx inside play). Decode the embedded MP3 (DATA.song.mp3 via --data) at page load with a temporary AudioContext into Float32 channels, then in play: ctx.createBuffer -> source -> A.bus; start at base+S0 (offset 0) or, when from > S0, at base+from with offset from-S0 (keeps scrubbing in sync). Pass the song's syllable timing JSON with --data too and derive every scene time from it (see the ABC Song demo video.js, kids-song channel).
