#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat vamp/a-beats.js vamp/b-models.js vamp/c-setup.js vamp/d-run.js vamp/e-hud.js; echo '})();'; } > vamp/video.js
node --check vamp/video.js && node build.js vamp/video.js vamp/out.html --kit fact --data world=world.geo.json "$@"
