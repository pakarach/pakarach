#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat mog/a-beats.js mog/b-models.js mog/c-setup.js mog/d-run.js mog/e-hud.js; echo '})();'; } > mog/video.js
node --check mog/video.js && node build.js mog/video.js mog/out.html --kit fact --data world=world.geo.json "$@"
