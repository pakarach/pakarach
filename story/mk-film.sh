#!/bin/sh
# รู้งี้สรุปหนัง build: story/mk-film.sh <film> [out.html] [extra build args]
# joins k-pre, <film>.js, story kit, k-vinyl, <film>-x.js (cast) into one IIFE and builds 9:16 with the vinyl kit
F=$1; OUT=${2:-/home/claude/out/$F.html}; shift; [ $# -gt 0 ] && shift
cd "$(dirname "$0")/.."
X=story/$F-x.js; [ -f "$X" ] || X=
{ echo '(function () {'; cat story/k-pre.js story/$F.js story/k-base.js ram1/b-models.js ram1/b2-atmo.js story/k-cast.js story/k-vinyl.js $X story/k-run.js story/k-hud.js; echo '})();'; } > story/video-$F.js
node --check story/video-$F.js && node build.js story/video-$F.js "$OUT" --kit fact,clay --data world=world.geo.json --font "Trirong:wght@600;800" "$@"
