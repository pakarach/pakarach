#!/bin/sh
# Iron Man (2008) recap test: story kit + ironman-x props/sets
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat story/k-pre.js story/ironman.js story/k-base.js ram1/b-models.js ram1/b2-atmo.js story/k-cast.js story/ironman-x.js story/k-run.js story/k-hud.js; echo '})();'; } > story/video-ironman.js
node --check story/video-ironman.js && node build.js story/video-ironman.js /home/claude/out/iron-man-recap.html --kit fact --data world=world.geo.json --font "Trirong:wght@600;800" "$@"
