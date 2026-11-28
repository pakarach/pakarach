#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat kho/a-beats.js kho/b-models.js kho/c-setup.js kho/d-run.js kho/e-hud.js; echo '})();'; } > kho/video.js
node --check kho/video.js && node build.js kho/video.js kho/out.html --kit fact --data world=world.geo.json "$@"
