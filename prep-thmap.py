#!/usr/bin/env python3
"""Prepare Thai map data for carousel / fact pages (no runtime fetch; pass the JSON files to build.js with --data).
usage: python3 prep-thmap.py <outDir> [--districts "อุ้มผาง,ทองผาภูมิ,..."] [--simplify 4] [--dsimplify 30]
writes  <outDir>/th.geo.json   77 provinces: pro_th, pro_en, c=[lon,lat] centroid of the largest ring
        <outDir>/nb.geo.json   neighbours (Myanmar, Laos, Cambodia, Malaysia, Vietnam) from world-atlas 50m
        <outDir>/amp.geo.json  only with --districts: those districts (amp_th, pro_th, c, area_gis = GIS km2, NOT an official area)
Needs: curl (raw.githubusercontent.com is reachable), npx mapshaper, and `npm i world-atlas topojson-client` in the cwd for nb."""
import json, os, subprocess, sys

args = sys.argv[1:]
if not args: print(__doc__); sys.exit(1)
out = args[0]; os.makedirs(out, exist_ok=True)
opt = lambda n, d: args[args.index(n) + 1] if n in args else d
dists = [s.strip() for s in opt('--districts', '').split(',') if s.strip()]
SRC = 'https://raw.githubusercontent.com/chingchai/OpenGISData-Thailand/master/'

def fetch(name):
    p = os.path.join(out, '_' + name)
    if not os.path.exists(p): subprocess.run(['curl', '-sS', '-o', p, SRC + name], check=True)
    return p

def cen(g):
    ps = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    ring = max(ps, key=lambda p: len(p[0]))[0]; A = cx = cy = 0
    for i in range(len(ring) - 1):
        x0, y0 = ring[i]; x1, y1 = ring[i + 1]; c = x0 * y1 - x1 * y0; A += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c
    A /= 2; return [round(cx / (6 * A), 3), round(cy / (6 * A), 3)]

def shaper(src, dst, simplify, fields, flt=None):
    cmd = ['npx', '--yes', 'mapshaper', src]
    if flt: cmd += ['-filter', flt]
    cmd += ['-simplify', simplify + '%', 'keep-shapes', '-filter-fields', fields, '-o', 'format=geojson', 'precision=0.002', dst]
    subprocess.run(cmd, check=True, capture_output=True)
    d = json.load(open(dst))
    for f in d['features']: f['properties']['c'] = cen(f['geometry'])
    json.dump(d, open(dst, 'w'), ensure_ascii=False, separators=(',', ':'))
    return d

th = shaper(fetch('provinces.geojson'), os.path.join(out, 'th.geo.json'), opt('--simplify', '4'), 'pro_th,pro_en')
print('th.geo.json', len(th['features']), 'provinces')

if dists:
    raw = json.load(open(fetch('districts.geojson')))
    gis = {f['properties']['amp_th'] + '|' + f['properties']['pro_th']: round(f['properties'].get('area_sqkm', 0), 1) for f in raw['features']}
    flt = '[' + ','.join(json.dumps(x, ensure_ascii=False) for x in dists) + '].indexOf(amp_th)>=0'
    d = shaper(os.path.join(out, '_districts.geojson'), os.path.join(out, 'amp.geo.json'), opt('--dsimplify', '30'), 'amp_th,pro_th', flt)
    for f in d['features']: f['properties']['area_gis'] = gis.get(f['properties']['amp_th'] + '|' + f['properties']['pro_th'])
    json.dump(d, open(os.path.join(out, 'amp.geo.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    found = [f['properties']['amp_th'] for f in d['features']]
    print('amp.geo.json', found, 'missing:', [x for x in dists if x not in found])

nb = os.path.join(out, 'nb.geo.json')
js = ("const topo=require('world-atlas/countries-50m.json'),{feature}=require('topojson-client');const fc=feature(topo,topo.objects.countries);"
      "const k=fc.features.filter(f=>['Myanmar','Laos','Cambodia','Malaysia','Vietnam'].includes(f.properties.name));"
      "const r=n=>Math.round(n*100)/100,rr=x=>typeof x[0]==='number'?[r(x[0]),r(x[1])]:x.map(rr);"
      "k.forEach(f=>{f.geometry.coordinates=rr(f.geometry.coordinates);f.properties={name:f.properties.name};});"
      "require('fs').writeFileSync(process.argv[1],JSON.stringify({type:'FeatureCollection',features:k}));")
r = subprocess.run(['node', '-e', js, nb], capture_output=True, text=True)
print('nb.geo.json', 'ok' if r.returncode == 0 else 'skipped (npm i world-atlas topojson-client): ' + r.stderr[-200:])
