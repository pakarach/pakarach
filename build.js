#!/usr/bin/env node
/* Build ONE self-contained .html from the engine + a kit + a video file.
   usage: node build.js <video.js> <out.html> --kit fact|clay [--data name=file.json ...] [--title "..."]
   Three.js r128 + Kanit are loaded from cdnjs / Google Fonts (same as the skills specify). */
const fs = require('fs'), path = require('path');
const a = process.argv.slice(2);
const video = a[0], out = a[1];
if (!video || !out) { console.error('usage: node build.js <video.js> <out.html> --kit fact|clay [--data name=file.json] [--title t]'); process.exit(1); }
let kit = 'fact', title = 'Video', data = [];
for (let i = 2; i < a.length; i++) {
  if (a[i] === '--kit') kit = a[++i];
  else if (a[i] === '--title') title = a[++i];
  else if (a[i] === '--data') { const [n, f] = a[++i].split('='); data.push([n, f]); }
}
const here = __dirname, rd = (f) => fs.readFileSync(f, 'utf8');
const parts = [rd(path.join(here, 'core.js')), rd(path.join(here, 'kit-' + kit + '.js'))];
if (kit === 'clay' && fs.existsSync(path.join(here, 'music-cute.js'))) parts.push(rd(path.join(here, 'music-cute.js'))); // default family-channel music (CK.musicBed, CK.MUSIC)
if (data.length) parts.push('window.DATA=window.DATA||{};' + data.map(([n, f]) => 'DATA[' + JSON.stringify(n) + ']=' + JSON.stringify(JSON.parse(rd(f))) + ';').join(''));
parts.push(rd(video));
const js = parts.join('\n;\n').replace(/<\/script/gi, '<\\/script');
const html = '<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title.replace(/</g, '&lt;') + '</title>' +
  '<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800&display=swap" rel="stylesheet">' +
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script></head><body><script>\n' + js + '\n</script></body></html>';
fs.writeFileSync(out, html);
console.log('built', out, (html.length / 1024).toFixed(0) + ' KB');
