global.window = {}; global.THREE = {}; global.FK = { pal: {}, land: () => ({}), beats: null };
const src = require('fs').readFileSync(__dirname + '/a-beats.js', 'utf8');
const core = require('fs').readFileSync(__dirname + '/../core.js', 'utf8');
const m = src.match(/const BEATS = [\s\S]*?\nconst B = /)[0].replace(/\nconst B = $/, '');
eval(m + "\nlet a=0;const o=[];for(const [i,d] of BEATS){o.push(i+'='+a.toFixed(1));a+=d;}console.log(o.join(' '));console.log('DUR',a.toFixed(1))");
