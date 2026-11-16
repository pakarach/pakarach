#!/bin/sh
# usage: sh story/check.sh epN outdir  -> renders mid-beat frames of every beat (plus a late frame) into a contact sheet
cd "$(dirname "$0")/.."
EPN=$1; OUT=$2
TS=$(node -e "
const src=require('fs').readFileSync('story/$EPN.js','utf8');const B=eval(src.match(/const BEATS = (\[[\s\S]*?\]);/)[1]);let t=0;const o=[];for(const [id,d] of B){if(id!=='end')o.push((id==='cover'?0.05:t+d*0.6).toFixed(2));t+=d}console.log(o.join(','))")
node shot.js story/out-$EPN.html $OUT $TS --scale 0.2 --cols 9 2>&1 | tail -2
