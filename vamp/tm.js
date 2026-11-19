global.window={};global.THREE={};global.FK={pal:{},land:()=>({})};
const src=require('fs').readFileSync(__dirname+'/a-beats.js','utf8');const m=src.match(/const BEATS = [\s\S]*?\nconst B = /)[0].replace(/\nconst B = $/,'');
eval(m+';global.AT={};let a=0;for(const [i,d] of BEATS){AT[i]=[a,d];a+=d;}');
const q=process.argv.slice(2).map(s=>{const [id,f]=s.split(':');return (AT[id][0]+AT[id][1]*(+f)).toFixed(2)});console.log(q.join(','));
