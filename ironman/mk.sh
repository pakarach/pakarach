#!/bin/sh
# joins the parts into one IIFE and builds the 16:9 file
cd "$(dirname "$0")"
{ echo "(function () {"; cat sets.js story.js; echo "})();"; } > film.js
node ../build.js film.js ${1:-/home/claude/out/iron-man-2008-story.html} --kit fact,movie --font "IBM Plex Sans Thai:wght@300;500" --title "Iron Man (2008) สรุป + วิเคราะห์"
