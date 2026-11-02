(function(){
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
const st=document.createElement('style');
st.textContent=':root{--nb:0px}body{padding-top:calc(var(--nb) - env(safe-area-inset-top,0px))}.bar,.nv-nav{top:var(--nb)!important}'
+'#tb{position:fixed;top:0;left:0;right:0;z-index:99;padding-top:env(safe-area-inset-top,0px);font:700 15.5px/1.35 "Trebuchet MS",Verdana,sans-serif}'
+'#tb>div{display:none;align-items:center;justify-content:center;gap:10px;min-height:38px;padding:6px 12px;color:#fff;text-align:center}#tb>div.on{display:flex}'
+'#net.off{background:#b3261e}#net.ok{background:#1f8a3a}#inst{background:#0b4a1a}'
+'#inst button{border:0;border-radius:16px;padding:6px 12px;font:inherit;cursor:pointer}#inst .go{background:#f9b908;color:#2a2000}#inst .x{background:transparent;color:#fff;font-size:16px;padding:6px 8px}'
+'@media print{#tb{display:none!important}body{padding-top:0!important}}';
document.head.append(st);
const tb=document.createElement('div');tb.id='tb';
const n=document.createElement('div');n.id='net';n.setAttribute('role','status');n.setAttribute('aria-live','polite');
const i=document.createElement('div');i.id='inst';
tb.append(n,i);
let t;
function upd(){document.documentElement.style.setProperty('--nb',tb.offsetHeight+'px')}
function show(c,m,ms){clearTimeout(t);n.className=c+' on';n.textContent=m;upd();if(ms)t=setTimeout(()=>{n.className=c;upd()},ms)}
function off(){show('off','Hors connexion')}
function box(h,go){i.innerHTML=h;i.classList.add('on');i.querySelector('.x').onclick=()=>{i.classList.remove('on');upd()};if(go)i.querySelector('.go').onclick=go;upd()}
document.addEventListener('DOMContentLoaded',()=>{document.body.append(tb);if('ResizeObserver' in window)new ResizeObserver(upd).observe(tb);if(!navigator.onLine)off();
const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,sa=navigator.standalone||matchMedia('(display-mode: standalone)').matches;let seen;try{seen=localStorage.getItem('yt_ios')}catch(e){}
if(ios&&!sa&&!seen){box('<span>Pour installer : touchez Partager, puis « Sur l\'écran d\'accueil »</span><button class="x" aria-label="Fermer">✕</button>');i.querySelector('.x').onclick=()=>{i.classList.remove('on');upd();try{localStorage.setItem('yt_ios','1')}catch(e){}}}});
addEventListener('offline',off);
addEventListener('online',()=>show('ok','Connexion rétablie',3500));
let dp;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;const go=async()=>{i.classList.remove('on');upd();dp.prompt();await dp.userChoice;dp=null};
const put=()=>box('<span>Installer l\'application</span><button class="go">Installer</button><button class="x" aria-label="Fermer">✕</button>',go);
if(document.body)put();else document.addEventListener('DOMContentLoaded',put)});
addEventListener('appinstalled',()=>{i.classList.remove('on');upd()});
})();
