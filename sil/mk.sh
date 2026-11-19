#!/bin/sh
cd "$(dirname "$0")/.."
{ echo '(function () {'; cat sil/a-beats.js sil/b-models.js sil/c-setup.js sil/d-run.js sil/e-hud.js; echo '})();'; } > sil/video.js
node --check sil/video.js && node build.js sil/video.js sil/out.html --kit fact --data world=world.geo.json "$@"
