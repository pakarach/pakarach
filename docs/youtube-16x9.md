# YouTube 16:9 build (clips over 2 min, after approval)

Same video.js, built again with `--data cfg=land.json` (`{"land":true}`) into a separate html; vertical build untouched.
```js
const L = FK.land();            // { LAND, W, H, CX }
VE.run({ W: L.W, H: L.H, file: L.LAND ? '<slug>-youtube' : '<slug>', ... })
if (L.LAND) caps.forEach((c) => { if (!c.instant) c.y = FK.subtitleY(c); else c.t1 = 0; }); // subtitle band; hide the instant cover caption
hud(g, t, { W, H }) { if (L.LAND) FK.landGradients(g, W, H, { left: t < end('cover') }); ... }
```
- Camera keys unchanged (same vertical FOV, more world at the sides). Shift the first keys ~6 units sideways so the cover subject sits right; draw the cover title left-aligned in hud (x ~120, y ~330-830) over the left gradient — this frame is the YouTube thumbnail.
- HUD: centre on L.CX, cards on the left (x 70, w ~820), counters near y 1500 move to y ~330, recap panels `translate(CX - 540, -90)`.
- Check cover, a card beat, a caption beat, recap and end frame in landscape, then send both builds.
