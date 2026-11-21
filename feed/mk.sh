#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat feed/a-beats.js feed/b-models.js feed/c-setup.js feed/d-run.js feed/e-hud.js; echo '})();'; } > feed/video.js
node --check feed/video.js && node build.js feed/video.js feed/out.html --kit fact --data world=world.geo.json "$@"
