#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat lok/a-beats.js lok/b-models.js lok/c-setup.js lok/d-run.js lok/e-hud.js; echo '})();'; } > lok/video.js
node --check lok/video.js && node build.js lok/video.js lok/out.html --kit fact --data world=world.geo.json "$@"
