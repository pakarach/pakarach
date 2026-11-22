#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat sat/a-beats.js sat/b-models.js sat/c-setup.js sat/d-run.js sat/e-hud.js; echo '})();'; } > sat/video.js
node --check sat/video.js && node build.js sat/video.js sat/out.html --kit fact --data world=world.geo.json "$@"
