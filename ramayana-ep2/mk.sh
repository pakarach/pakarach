#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat ramayana-ep2/a-beats.js ramayana-ep1/b-models.js ramayana-ep1/b2-atmo.js ramayana-ep2/c-setup.js ramayana-ep2/d-run.js ramayana-ep2/e-hud.js; echo '})();'; } > ramayana-ep2/video.js
node --check ramayana-ep2/video.js && node build.js ramayana-ep2/video.js ramayana-ep2/out.html --kit fact --data world=world.geo.json --font "Trirong:wght@600;800" "$@"
