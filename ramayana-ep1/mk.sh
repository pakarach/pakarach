#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat ramayana-ep1/a-beats.js ramayana-ep1/b-models.js ramayana-ep1/c-setup.js ramayana-ep1/d-run.js ramayana-ep1/e-hud.js; echo '})();'; } > ramayana-ep1/video.js
node --check ramayana-ep1/video.js && node build.js ramayana-ep1/video.js ramayana-ep1/out.html --kit fact --data world=world.geo.json "$@"
