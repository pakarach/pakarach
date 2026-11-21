# Movie-story channel: the dark-soundstage look (kit-movie.js, `MK`)

Reference file: `example-movie.js` (invented noir scene; street set -> office set). Build with `--kit fact,movie --font "IBM Plex Sans Thai:wght@300;500"`.
The fact kit supplies beats, sound and voice (`FK.beats`, `FK.softSfx`, `FK.chillBed`, `FK.voice`); everything visible comes from `MK`. Never use `FK.pal`, `FK.mat` (flat shading), the globe, maps or rank badges here.

## The idea
A dark film studio. Each location of the story is a small set (a slab with walls, props and figurines) standing as an island of light on a black floor. One key spotlight follows the story: it fades down on one set, the camera dollies through the dark, it fades up on the next. That lighting cue replaces cuts, so the film reads as one continuous world.

## Look rules
- `MK.look(scene, renderer, grade)` once in setup: ACES tone mapping, sRGB output, soft shadows, environment map, haze (FogExp2), dark floor, key SpotLight (shadows) + rim DirectionalLight. Returns `L`.
- One grade per film, chosen from the film's mood: `noir, thriller, horror, romance, scifi, adventure, war`, or a custom `{ key, rim, haze, floor, accent, fog }`. `accent` is the only text highlight colour. No second accent.
- Materials: `MK.resin(hex)` for figurines and hero props (smooth, clearcoat), `MK.matte(hex)` for walls/ground/cloth, `MK.metal(hex)`, `MK.emit(hex, k)` for things that glow. Colours are sRGB hex; the helpers convert. Wall and ground colours stay dark and desaturated (value under ~35%) so the light does the colouring.
- Geometry: `MK.rbox(w,h,d,r)` rounded boxes, `MK.capsule(r,len)`, `MK.lathe([[r,y],...])`, spheres and cylinders with >= 16 segments. No hard-edged low-poly.
- Every set has: a slab `MK.set(w, d, hex)`, a back wall or backdrop, at least one practical light `MK.lamp(hex, power, glowSize)` (window, lamp, screen, fire), `MK.dust(n, [x,y,z])` in the key beam, and `MK.bokeh(n, [x,y,z], [hex...])` 15-20 units behind it for depth. A visible cone `MK.beam(hex, h, r)` only where a real lamp would make one.
- Lighting per frame: `MK.keyOn(L, setCentre, { k, from, rimFrom, angle })`. `k` comes from `MK.cue(t, t0, t1, fade)` or an eased ramp. Move the key to the next set only while `k` is ~0. Dim practical lamps with `lamp.userData.k(v)` (keep ~0.2 when the set is "off" so it still glows in the distance).
- Camera: fov 26-32, low (y 1.4-2.8), slow dolly or arc, never static longer than ~1 s, never a whip. Medium shots for people (figurine fills 30-45% of frame height), a wide establishing move when a set first lights up. `VE.camAt(CAM, t, camera, 0.12)`.
- Dark travel between sets: 0.8-1.4 s, with a caption line and a `glide` sound so it never looks like a broken frame.
- 2D finish: `MK.finish(g, t, { W, H })` is the first call in `hud` (bloom, grain, 2.39:1 bars on 16:9). Then titles and labels.
- Type: thin spaced Latin line `MK.spaced(g, 'ACT 1  ·  THE STREET', x, y, size, color)` (Plex 300) + Thai title `MK.title(g, [[text, size, color, weight]], x, y)` (Kanit 800). Small act label in the top bar. No pills, chips, badges or cards with rounded coloured backgrounds; text sits on the picture or on the bars.
- Captions = narrator subtitles: max 2 lines, 50 px on 16:9 (62 px on 9:16), weight 600, second line may use the accent. 16:9 position `c.y = MK.subY(c, H, W)`; keep figurines' heads and the key prop above the subtitle band.
- Run config: `brandBar: false, endLen: 0, vignette: 'rgba(0,0,0,.55)', brand: { name, color: accent, bg: [haze, haze], motif: { notes: [] } }`. The cover title card and the end card are drawn in `hud`.

## Figurines (`MK.figure`)
`MK.figure({ coat, skin, hair, hat, long, h, build, base })` returns a game-piece style figure (face = +x). Animate with `MK.pose(f, { turn, lean, nod, armL, armR, hop })`; set `f.userData.y0` to the slab top (0.24). They glide and hop like pieces being moved; no walk cycle.
- A character is told apart by coat colour, height/build, hair, and ONE generic prop or hat. Keep one colour per character for the whole film and show the name once as a small label when the character first appears.
- Original design only. Never an actor's face or likeness, never a film's costume, mask, creature, robot, vehicle or logo design. If a character is only recognisable by such a design, use a plain figurine and name it in the caption.
- Crowd/extras: same figure with `coat` in the wall colour range, no hat, `h` 1.4-1.5.

## Pitfalls found so far
- Resin (clearcoat) slabs and large light surfaces blow out to white under the key: slabs and walls are `MK.matte`.
- The rim light lights the whole studio floor; the kit keeps the floor near black. Don't brighten `grade.floor`.
- Key `k` above ~0.8 on a small interior set flattens it; 0.5-0.7 with a practical lamp looks better.
- A figurine behind a desk or pole loses its face: place seated/behind-furniture figures at least 1.1 units behind the furniture edge and check the frame.
- `MK.finish` bloom reads the WebGL canvas, so it must run before any 2D text is drawn (text does not bloom).
- Colours passed straight to three (not through `MK.*`) must be converted with `MK.LIN(hex)`.
- Sandbox frames (software GL) are a little noisier than Dan's GPU render; judge composition and exposure, not grain.
- The rim light floods slabs blue on interiors: set `L.rim.intensity` per set each frame (cave ~0.3, rooms ~0.5, open air ~0.9-1.3 of the kit's 1.7 scaled down).
- Lean or fall a figurine by tilting the whole piece (`f.rotation.order = 'YXZ'`, `f.rotation.z = -lean`), not with `MK.pose({ lean })` beyond ~0.15.
- Before projecting a 3D point to the screen for a name label, call `camera.updateMatrixWorld(true)`; otherwise the label uses last frame's camera.
- A lamp glow sprite in front of a face hides it: keep practical lamps to the side of or behind figures, glow size <= 0.9 near faces.
- Only the active set is visible (sets 80 units apart); switch sets through a 0.7 s fade-down, a black overlay, and a 0.9 s fade-up.
- Reference film file: `ironman/` (sets.js + story.js + mk.sh): data-driven beats table, figure tracks, pose/hop/visibility windows.
