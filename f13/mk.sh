#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat f13/a-beats.js f13/b-models.js f13/c-setup.js f13/d-run.js f13/e-hud.js; echo '})();'; } > f13/video.js
node --check f13/video.js && node build.js f13/video.js f13/out.html --kit fact --data world=world.geo.json "$@"
