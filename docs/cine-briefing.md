# Cinematic-minimal briefing decks (kit-cine)

Silent 16:9 HTML deck the presenter clicks through live: 3D scenes in a premium "studio" look, plus explanation points one per click. Reference build: `example-cine.js` (Binance hack, Nov 2026, 7 chapters, 95 steps).

Build: `node build.js deck.js out.html --kit fact,cine --data world=world.geo.json` (kit-fact for FK helpers, kit-cine for the presenter + FIG diagrams; add `--data` only if a map is used).

## Step model (what one click does)
cover (title frame) → agenda (full slide: chapters + one-line sub) → for each chapter: for each scene beat: **play** the beat (stops on a still frame) → its **points** one per click (right panel; the 3D view slides left) → **chapter recap** (full slide, 4 lines) → … → **final** slide (confirmed / from analysis / not yet known) → sources end card.
Keys: → / PageDown / Space / Enter / click = next (pressing while a scene plays jumps to its still end) · ← / PageUp = back one step (still, no replay) · R = replay scene · F = fullscreen (wrapper, overlays included) · Home = start. Clickers send PageUp/PageDown.

## Deck file layout (copy example-cine.js)
1. Video IIFE (scenes): palette, `BEATS` (one beat per scene; `cover` first, `end` last; durations only pace the play-through), `SHOT` per beat `[A, B]` camera dolly (eased over the beat), `CUTS` = beats that start on a new stage (fade through the background), `stage(t)` visibility, `setup()` builds every stage once, `update(t)` deterministic in t, `hud()` draws title block / labels / data panel, then `VE.run({... bed: [], audio: [], brand: { name: '', series: '', bg: [BG, BG], motif: { notes: [] } } ...})` → silent. Keep `window.__P = { BEATS, at, end, DUR, setStop }` and the `PSTOP` clamp in update/hud (the presenter never renders past a scene's stop).
2. Deck IIFE: `window.DECK = { kicker, chapters:[{ n:'01', name, sub, beats:[...], recap:[4 lines] }], beatNames:{ beat: label, end: 'ที่มา' }, points:{ beat:[{ head, title, compact?, items:[[title, body], ...], note? }] }, figs:{ 'beat:panel:item': svg }, fx:{ 'beat:panel:item': fxId }, final:{ title, cols } }`. The last chapter (summary) has no `recap`; `final` follows it.

## Look (keep it consistent)
- Off-white studio: `scene.background = fog = #e2ded7`, floor `#dcd7cf` roughness .92, ACES tone mapping exposure .82, `outputEncoding = sRGB`, PMREM env from an inline "room" (box + 4 emissive panels), hemisphere .28 + warm sun 2.1 with PCFSoft shadows (shadow box follows the camera) + cool fill .35, soft blob contact shadows, film grain 4.5 %, light vignette.
- Materials: ceramic `MeshPhysical #ece8e1` clearcoat .5; graphite `#2b2d31` metal .7; gold metal `#d2a24a`; red only for compromise/adversary. **Accent colours must be converted with `LIN(hex)` (`Color.convertSRGBToLinear`)** — with sRGB output, unconverted reds turn pink and golds pale. Neutrals stay as-is.
- Objects abstract and few: monoliths (rounded extrusions) with a gold level slot, graphite cores, hairline gold beams/tubes, gold droplets, thin rings. No mascots, no cartoon people, no logos or real photos.
- Type: IBM Plex Sans Thai 300/400/500 (load the Google Fonts link at the top of the deck, start `VE.run` after `document.fonts.load`). Lower-left title block (h1 56 px weight 300 + h2 accent 400 + foot 24 px muted, max width 1000 px, soft left scrim), chapter marker top-left (`01 —— ชื่อบท`), data panel top-right x 1440-1800 (counter / bars / timeline, hairlines only), hairline 3D labels (`lab()`), source line bottom-right `ข้อมูล ณ <date>`. No cards, no pills, no series/channel name.
- Motion: one slow camera move per beat, fades (not iris) at stage changes, something meaningful moving in each scene; scenes end at rest (the still frame is a slide).

## Points panel (kit-cine)
- Right gradient panel, inner box from 63 % to 93.5 % width, 25-90 % height. Past items collapse to their title, the current item shows body + figure, future items are not laid out (`display:none`), so 4-5 items fit. Bodies 1-3 short lines; `compact: true` for 5 items or long bodies; `note` (red rule) appears with the last item.
- While the panel is open: `window.__PV_SIDE = true` → the deck hides its top-right data panel and any `lab()` whose screen x > 50 %, and the camera gets `setViewOffset` (0.17·W, eased 650 ms via `window.__PV_OFFT`) so the subject slides left.
- **figs**: animated SVG from `window.FIG` helpers (viewBox 400×100): `svg, T, Bx, box, Ar, P, dot, Ci, key, doc, laptop, server, person, coin, bug, check, cross, flow(nodes,{red}), bars(rows,max,{hl})`. Use for concepts with no 3D object (nonce counter, mixer, multisig, timelines, money bars). Draw-on uses `pathLength="1"`; markers are per-svg ids (`url(#ahN)` — keep the `#`).
- **fx**: 3D highlight while a point is on screen: `window.__PV_FX = { id, t0 }`, the presenter re-renders the held frame every animation frame. In `update()`: compute `ft`, map ids to effects at the end (pulsing ring pool, reveal an extra object such as a cold vault or a service container, beams on), and wrap subsystems in `((t) => {...})(tVirtual)` so loops (stamps, streams, drops, coins, money flights) replay on the held frame. Add matching `lab()`s in hud when an fx reveals a new object.
- Content per point: a term explained plainly (what it is → why it matters here), the case-specific fact with number and source, and which facts are confirmed vs analysis vs unknown. Recaps: 4 lines, numbers included. Final slide: confirmed (by whom) / from analysis (who) / not disclosed.

## Testing (no GPU, slow; no sound to check)
- Scenes: `node shot.js out.html dir t1,t2,... --scale 0.3 --cols 4` (one frame per beat at ~60-70 % of the beat; reframe anything where text overlaps the subject or the subject is cut).
- Steps: `node deck-shot.js out.html dir last` (agenda, recaps, final and the last point of every panel; prints `OVERFLOW` per panel), `all` for every point, `--from/--to` to batch (~8 s per step). Fix every overflow (trim text, `compact`, move a fig) and re-check only those steps.
- Check: subject not under the panel; labels not under the panel; figures readable; recap lines fit; no console errors. Never Read the built .html.

## Pitfalls seen
- Fading layers: a camera jump between two beats on the same stage (make B of one beat = A of the next, or add the beat to `CUTS`).
- `FK.regions` meshes come with FK.mat: replace `material` after creation; Russia/Mongolia polygons cross the antimeridian and cover the map — leave them out.
- Overlay toggles: set innerHTML, force reflow (`void el.offsetWidth`), then add `on`; never add it in a later requestAnimationFrame (it fires after the next step and sticks).
- The held frame is `end(beat) - 0.45` so titles are fully visible and the stage fade has not started.
