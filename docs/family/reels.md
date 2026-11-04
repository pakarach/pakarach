# Two builds per clip: TikTok + Facebook Reels (Nov 2026)
Both are 9:16 1080x1920 from the same video.js. Only the layout differs, because Facebook overlays more UI.

## Builds
- TikTok: `node build.js video.js <topic>.html --kit clay --title "<Thai title>" [--data vo=vo.json]`
- Facebook Reels: same, plus `--data reel=reel.json` (reel.json = `{"on":true}`), output `<topic>-fb.html`.
- Core v1.11 does the captions by itself when `DATA.reel.on`: 30 px lower, 6% smaller, max width W-240.

## Facebook Reels safe zone (1080x1920)
Top 269 px (14%), bottom 672 px (35%: everything below y ≈ 1250), right 120 px (buttons), and about 90 px per side because tall phones crop. Keep faces, labels, numbers and lists inside x 90-960, y 270-1250. Brand bar and the end card can stay where they are.

## In video.js
- `const REEL = !!(DATA.reel && DATA.reel.on)` at top level (VE.reels is only set inside VE.run).
- HUD panels and lists: inset them 40 px from each side (`LD = REEL ? 40 : 0`), list font ×0.95.
- Any label or number below y ≈ 1250 in a shot (bar labels, axis labels, inset captions): in REEL, lower that shot's FW `top` by 0.8-1.4 (moves the content up), or move the label above the object.
- Characters at the far right (x > 960) sit under FB's like/comment buttons: keep the focused face left of x 900.
- Test: shot.js on both builds, then draw lines at y 269, y 1248, x 960 on the REEL frames and check that nothing key crosses them.
