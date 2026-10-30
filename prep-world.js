#!/usr/bin/env node
/* world-atlas 110m -> compact GeoJSON (coords rounded to 0.1 deg). usage: node prep-world.js out.json  (run from a folder with world-atlas + topojson-client installed) */
const topo = require('world-atlas/countries-110m.json'), { feature } = require('topojson-client');
const fc = feature(topo, topo.objects.countries);
const r = (n) => Math.round(n * 10) / 10;
const rr = (x) => (typeof x[0] === 'number' ? [r(x[0]), r(x[1])] : x.map(rr));
fc.features.forEach((f) => { f.geometry.coordinates = rr(f.geometry.coordinates); f.properties = { name: f.properties.name }; });
require('fs').writeFileSync(process.argv[2] || 'world.geo.json', JSON.stringify(fc));
console.log('features', fc.features.length);
