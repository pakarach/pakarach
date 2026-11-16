// node story/probe.js epN t key1,key2,...  -> visibility + world position of actors at time t
const {chromium}=require('playwright');const [ep,t,keys]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.route('**/three.min.js',r=>r.fulfill({path:'node_modules/three/build/three.min.js'}));await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
await p.goto('file://'+process.cwd()+'/story/out-'+ep+'.html');await p.waitForFunction(()=>window.__veReady,null,{timeout:60000});
const r=await p.evaluate(([t,keys])=>{__ve.renderFrame(+t);const S=window.__S;const o={};for(const k of keys.split(',')){const q=S.o[k];const v=q.position.clone();v.y+=1;v.project(window.__cam);o[k]=[q.visible,v.x.toFixed(2),v.y.toFixed(2),v.z.toFixed(3),q.position.x.toFixed(1),q.position.y.toFixed(1),q.position.z.toFixed(1),q.scale.x.toFixed(2)]}const c=window.__cam;o.cam=[c.position.x.toFixed(1),c.position.y.toFixed(1),c.position.z.toFixed(1)];return o},[t,keys]);console.log(JSON.stringify(r));await b.close()})();
