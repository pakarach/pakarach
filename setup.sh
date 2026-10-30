#!/bin/sh
# One-shot setup in a fresh sandbox: npm deps (playwright is preinstalled there) + world map.
set -e; cd "$(dirname "$0")"
npm i --no-audit --no-fund --loglevel=error
[ -f world.geo.json ] || node prep-world.js world.geo.json
echo "engine ready: $(node -e "console.log(require('three/package.json').version)") three, $(ls *.js | wc -l) js files"
