# Two builds per clip: TikTok + Facebook Reels (Nov 2026)
Both are 9:16 1080x1920 from the same video.js, and since 13 Nov 2026 both use the safe layout (`REEL` true): TikTok's overlay zones (below) are almost as large as Facebook's.

## TikTok safe zone (Dan, 13 Nov 2026; given as 12.5% / 34% / 80 px on a 720x1280 frame)
Top 240 px (12.5%), bottom 653 px (34%: everything below y ≈ 1267), right 120 px (like/comment/share buttons). Keep faces, labels, numbers and lists inside x 0-960, y 240-1267. Brand bar and end card can stay where they are.

## Builds
- Review (every draft/revision): one file only, TikTok-safe layout, smallest size: `node build.js video.js review-<topic>.html --kit clay --title "<Thai title>" --data reel=docs/family/tiktok.json` (no voice until the audio is synced).
- Finals, only when Dan types "cre": TikTok `tt-<topic>.html` and Facebook `fb-<topic>.html`:
  `node build.js video.js tt-<topic>.html --kit clay --title "<Thai title>" [--data vo=vo.json] --data reel=docs/family/tiktok.json`
  `node build.js video.js fb-<topic>.html --kit clay --title "<Thai title>" [--data vo=vo.json] --data reel=docs/family/reel.json`
- Core v1.11 does the captions by itself when `DATA.reel.on`: 30 px lower, 6% smaller, max width W-240.

## Facebook Reels safe zone (1080x1920)
Top 269 px (14%), bottom 672 px (35%: everything below y ≈ 1250), right 120 px (buttons), and about 90 px per side because tall phones crop. Keep faces, labels, numbers and lists inside x 90-960, y 270-1250. Brand bar and the end card can stay where they are.

## In video.js
- `const REEL = !!(DATA.reel && DATA.reel.on)` at top level (VE.reels is only set inside VE.run).
- HUD panels and lists: inset them 40 px from each side (`LD = REEL ? 40 : 0`), list font ×0.95.
- Any label or number below y ≈ 1250 in a shot (bar labels, axis labels, inset captions): in REEL, lower that shot's FW `top` by 0.8-1.4 (moves the content up), or move the label above the object.
- Characters at the far right (x > 960) sit under FB's like/comment buttons: keep the focused face left of x 900.
- Test: shot.js on both builds, then draw lines (TikTok: y 240, y 1267, x 960; Facebook: y 269, y 1248, x 960) and check that nothing key crosses them. Cameras zoom in during a beat: check frames near beat ends too.
- Teen/adult on the right of a shot: in REEL move the camera centre right or the character left so the face stays left of x 960; clamp HUD labels that follow 3D props at the left edge (x >= 120).
