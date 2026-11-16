#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat wang3/a-beats.js wang3/b-models.js wang3/c-setup.js wang3/d-run.js wang3/e-hud.js; echo '})();'; } > wang3/video.js
node --check wang3/video.js && node build.js wang3/video.js wang3/out.html --kit fact --data world=world.geo.json "$@"
