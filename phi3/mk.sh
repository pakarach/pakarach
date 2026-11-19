#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat phi3/a-beats.js phi3/b-models.js phi3/c-setup.js phi3/d-run.js phi3/e-hud.js; echo '})();'; } > phi3/video.js
node --check phi3/video.js && node build.js phi3/video.js phi3/out.html --kit fact --data world=world.geo.json "$@"
