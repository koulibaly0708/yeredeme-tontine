const V='yt-v2',PRE=['index.html','collecteur.html','adherent.html','admin-tontine.html','logo.png','fond.jpg','icon-192.png','icon-512.png','manifest.webmanifest','pwa.js'],
CDN='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await Promise.all(PRE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));await c.add(new Request(CDN,{mode:'no-cors'})).catch(()=>{})}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
if(r.mode=='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));return}
e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(res=>{if(res.ok||res.type=='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>m);return m||n}))});
