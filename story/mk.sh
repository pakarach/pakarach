#!/bin/sh
# usage: sh story/mk.sh epN [build args...]   (episode data in story/epN.js -> story/out-epN.html)
cd "$(dirname "$0")/.."
EPN=$1; shift
{ echo '(function () {'; cat story/k-pre.js story/$EPN.js story/k-base.js ram1/b-models.js ram1/b2-atmo.js story/k-cast.js story/k-run.js story/k-hud.js; echo '})();'; } > story/video-$EPN.js
node --check story/video-$EPN.js && node build.js story/video-$EPN.js story/out-$EPN.html --kit fact --data world=world.geo.json --font "Trirong:wght@600;800" "$@"
