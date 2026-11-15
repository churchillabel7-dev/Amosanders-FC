const W=[["images/posters/cri.jpg","Yes"],
[ "images/posters/cro.jpg","No"],
 ["images/posters/cru.jpg"],
  ["images/posters/deu.jpg"],
   ["images/posters/gad.jpg"],
  ["images/posters/gap.jpg"],
    ["images/posters/gep.jpg"],
 ["images/posters/gin.jpg"],
   ["images/posters/gok.jpg"],
   ["images/posters/gon.jpg"],
   ["images/posters/gop.jpg"],
   ["images/posters/hob.jpg"],
   ["images/posters/hoj.jpg"],
   ["images/posters/hok.jpg"],
   ["images/posters/hol.jpg"],
   ["images/posters/hov.jpg"],
   ["images/posters/hox.jpg"],
   ["images/posters/mep.jpg"],
   ["images/posters/met.jpg"],
   ["images/posters/pel.jpg"],
   ["images/posters/pib.jpg"],
   ["images/posters/pic.jpg"],
   ["images/posters/pik.jpg"],
   ["images/posters/pim.jpg"],
   ["images/posters/pin.jpg"],
   ["images/posters/piv.jpg"],
   ["images/posters/piz.jpg"],
   ["images/posters/sea.jpg"],
   ["images/posters/sef.jpg"],
   ["images/posters/sel.jpg"],
   ["images/posters/sew.jpg"],
   ["images/posters/sez.jpg"],
   ["images/posters/tef.jpg"],
   ["images/posters/tel.jpg"],
   ["images/posters/ter.jpg"],
   ["images/posters/brg.jpg"],
   ["images/posters/mat.jpg"],
   ["images/posters/wes.jpg"],
  
];

const A=[ 
["images/posters/bec.jpg"],
["images/posters/acd.jpg"],
["images/posters/aced.jpg"],
["images/posters/ada.jpg"],
["images/posters/adc.jpg"],
["images/posters/bel.jpg"],
["images/posters/ber.jpg"],
["images/posters/bit.jpg"],
["images/posters/brd.jpg"],
["images/posters/awz.jpg"],
["images/posters/ce;.jpg"],
["images/posters/ben.jpg"],
["images/posters/acam.jpg"],
["images/posters/dac.jpg"],
["images/posters/daf.jpg"],
["images/posters/dej.jpg"],
["images/posters/dev.jpg"],
["images/posters/dez.jpg"],
["images/posters/duh.jpg"],
["images/posters/fep.jpg"],
["images/posters/fid.jpg"],
["images/posters/fol.jpg"],
["images/posters/fri.jpg"],
["images/posters/kel.jpg"],
["images/posters/kic.jpg"],
["images/posters/kid.jpg"],
["images/posters/kij.jpg"],
["images/posters/kik.jpg"],
["images/posters/kin.jpg"],
["images/posters/kip.jpg"],
["images/posters/med.jpg"],
["images/posters/pek.jpg"],
["images/posters/sab.jpg"],
["images/posters/saz.jpg"],
["images/posters/seb.jpg"],
["images/posters/sek.jpg"],
["images/posters/sep.jpg"],
["images/posters/sev.jpg"],
["images/posters/sij.jpg"],
["images/posters/train.jpg"],
["images/posters/tre.jpg"],
["images/posters/tro.jpg"],
["images/posters/vek.jpg"],
["images/posters/gra.jpg"],
["images/posters/gre.jpg"],
["images/posters/gri.jpg"],
["images/posters/gro.jpg"],
];
let players=[[1,"Peter","Goalkeeper","Kenya","GK","images/petro.png"],[4,"Veron","Right-back","Kenya","RB","images/Veron.png"],[3,"Isaac","Left-back","Kenya","LB","images/isaac.png"],[8,"Davie","Midfielder","Kenya","DM","images/davie.png"],[10,"Wizkid","Playmaker","Kenya","AM","images/wiz.png"],[12,"Churchill","Midfielder","Kenya","CM","images/ca.jpeg"],[9,"Lelieto","Striker","Kenya","CF","images/leleito.png"],[11,"Ezekiel","Winger","Kenya","LW","images/ezekiel.png"],[5,"Hosea","Defender","Kenya","CB","images/hosea.png"],[6,"Juma","Midfielder","Kenya","CM","images/juma.png"],[14,"Jonte","Winger","Kenya","RW","images/jonte.png"]];
/* Photos saved as .jpg/.jpeg have a solid background (e.g. Churchill's green). This removes a flat-colour background
   so every player sits on the same pitch tile. (Best long-term fix: save such photos as transparent .png.) */
function unbg(im){try{
  if(im.dataset.k)return;im.dataset.k=1;
  const w=im.naturalWidth,h=im.naturalHeight,sc=Math.min(1,500/Math.max(w,h)),cw=Math.round(w*sc),ch=Math.round(h*sc);
  const cv=document.createElement("canvas");cv.width=cw;cv.height=ch;
  const x=cv.getContext("2d");x.drawImage(im,0,0,cw,ch);
  const d=x.getImageData(0,0,cw,ch),a=d.data;
  const px=(i,j)=>{const o=(j*cw+i)*4;return[a[o],a[o+1],a[o+2]]};
  const dist=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);ss
  const cs=[px(2,2),px(cw-3,2),px(2,ch-3),px(cw-3,ch-3)];
  const bg=[0,1,2].map(k=>cs.reduce((t,c)=>t+c[k],0)/4);
  if(cs.some(c=>dist(c,bg)>40))return;            /* background is not a flat colour: leave the photo alone */
  const T1=35,T2=65;
  for(let o=0;o<a.length;o+=4){const dd=Math.hypot(a[o]-bg[0],a[o+1]-bg[1],a[o+2]-bg[2]);a[o+3]=dd<=T1?0:dd>=T2?255:Math.round((dd-T1)/(T2-T1)*255)}
  x.putImageData(d,0,0);im.src=cv.toDataURL("image/png");
}catch(e){}}
const box=document.getElementById("players");
const squads={men:players,women:W,academy:A};
/* Detailed positions (RB, CM, LW...) belong to a group for the filter buttons and the lineup: GK / DF / MF / FW */
const grp=c=>({GK:"GK",CB:"DF",RB:"DF",LB:"DF",RWB:"DF",LWB:"DF",DF:"DF",DM:"MF",CM:"MF",AM:"MF",LM:"MF",RM:"MF",MF:"MF",LW:"FW",RW:"FW",CF:"FW",ST:"FW",SS:"FW",FW:"FW"})[c]||c;let cur="all";
const sil='<svg viewBox="0 0 100 125" aria-hidden="true"><circle cx="50" cy="42" r="20"/><path d="M12 125c0-30 16-46 38-46s38 16 38 46z"/></svg>';
const pic=(n,src)=>src?`<img src="${src}" alt="${n}" loading="lazy" decoding="async">`:sil;
let team="men";
function draw(f){if(!box)return;const photoOnly=team!=="men";
box.className=photoOnly?"squad photos":"squad";
if(photoOnly){
  box.innerHTML=players.map(p=>typeof p[0]==="string"?p[0]:p[5]).filter(Boolean).map((s,i)=>`<button type="button" class="g" aria-label="Open photo ${i+1}"><img src="${s}" alt="Amosanders FC" loading="lazy" decoding="async"></button>`).join("");
  box.querySelectorAll("img").forEach(im=>im.onerror=()=>im.closest("button").remove());return}
box.innerHTML=players.filter(p=>f==="all"||grp(p[4])===f).map(p=>`<div class="p"><div class="ph">${pic(p[1],p[5])}<b>${p[0]}</b><em>${p[4]}</em></div><div class="t"><h3>${p[1]}</h3><span>${p[2]} · ${p[3]}</span></div></div>`).join("")}
/* Women's team and Academy: click a photo to open it large; arrows / buttons move between photos */
(function(){if(!box)return;
const dlg=document.createElement("dialog");dlg.className="ndet-lb";dlg.setAttribute("aria-label","Photo viewer");
const img=document.createElement("img");img.alt="";
const cnt=document.createElement("p");cnt.className="ndet-lb-n";
const mk=(c,t,l,fn)=>{const b=document.createElement("button");b.type="button";b.className=c;b.textContent=t;b.setAttribute("aria-label",l);b.onclick=e=>{e.stopPropagation();fn()};return b};
let list=[],k=0;
const show=()=>{img.src=list[k].src;cnt.textContent=(k+1)+" / "+list.length};
const step=d=>{k=(k+d+list.length)%list.length;show()};
dlg.append(img,cnt,mk("ndet-lb-x","\u00d7","Close",()=>dlg.close()),mk("ndet-lb-p","\u2039","Previous photo",()=>step(-1)),mk("ndet-lb-nx","\u203a","Next photo",()=>step(1)));
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")step(-1);if(e.key==="ArrowRight")step(1)});
document.body.append(dlg);
box.addEventListener("click",e=>{const b=e.target.closest(".g");if(!b)return;
  list=[...box.querySelectorAll(".g img")];k=list.indexOf(b.querySelector("img"));if(k<0)return;show();dlg.showModal()});
})();
const staff=[["Amos Njoroge","Head coach","Kenya","images/amos.jpeg"]];
const stfEl=document.getElementById("staff");if(stfEl)stfEl.innerHTML=staff.map(s=>`<div class="p"><div class="ph">${pic(s[0],s[3])}</div><div class="t"><h3>${s[0]}</h3><span>${s[1]} · ${s[2]}</span></div></div>`).join("");
/* Management: with a single person, show a profile panel beside the card so the page is not left empty.
   Edit the facts, quote and contact details here. */
const staffBio={"Amos Njoroge":{facts:[["Role","Head coach and Team Manager, Amosanders FC"],["Also serving as","Treasurer, Kasarani Sports Association"],["Education","Diploma in Theology"]],quote:"I pledge to serve with integrity, transparency, and dedication.",phone:"+254720349467",phoneText:"0720 349467",email:"amosnjoroge247@gmail.com"}};
if(stfEl&&staff.length===1&&staffBio[staff[0][0]]){const b=staffBio[staff[0][0]];stfEl.classList.add("solo");
stfEl.insertAdjacentHTML("beforeend",`<aside class="mg-about"><small>About</small><h3>${staff[0][0]}</h3><ul class="mg-facts">${b.facts.map(f=>`<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join("")}</ul><blockquote>\u201c${b.quote}\u201d<cite>\u2014 ${staff[0][0]}</cite></blockquote><div class="mg-btns"><a class="btn" href="tel:${b.phone}">Call ${b.phoneText}</a><a class="btn ghost" href="mailto:${b.email}">Send an email</a></div></aside>`)}
draw("all");
document.querySelectorAll(".tabs:not(.tm) button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs:not(.tm) button").forEach(x=>x.setAttribute("aria-pressed",x===b));cur=b.dataset.f;draw(cur)});
document.querySelectorAll(".tm button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tm button").forEach(x=>x.setAttribute("aria-pressed",x===b));players=squads[b.dataset.t];team=b.dataset.t;
  const men=team==="men",pf=document.getElementById("pos-filter"),lu=document.getElementById("lineup");
  if(pf)pf.hidden=!men;if(lu)lu.hidden=!men;
  if(!men){cur="all";document.querySelectorAll(".tabs:not(.tm) button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.f==="all"))}
  draw(cur)});
const SW={"News · Academy graduate signs first professional contract":"Habari · Mhitimu wa akademi asaini mkataba wa kwanza wa kitaaluma","Result · Amosanders 3–1 Kestrel City":"Matokeo · Amosanders 3–1 Kestrel City","Next · Amosanders v Porto Mare, Sat 21 Nov":"Ijayo · Amosanders v Porto Mare, Jmosi 21 Nov","Community · Youth clinics expand to four new countries":"Jamii · Kliniki za vijana zapanua hadi nchi nne mpya","Gallery":"Picha","nationalities in our squad":"mataifa katika kikosi chetu","countries with supporters":"nchi zenye mashabiki","teams, from academy to first team":"timu, kuanzia akademi hadi timu kuu","Matches":"Mechi","News":"Habari","Squad":"Kikosi","Management":"Uongozi","Videos":"Video","Tickets":"Tiketi","Membership":"Uanachama","One club.":"Klabu moja.","Every continent.":"Kila bara.","Amosanders FC brings together players and supporters from 31 countries. Follow every match, story and signing.":"Amosanders FC inaunganisha wachezaji na mashabiki kutoka nchi 31. Fuatilia kila mechi, habari na usajili.","Next match · Amosanders Arena · Sat 21 Nov, 15:00":"Mechi ijayo · Amosanders Arena · Jmosi 21 Nov, 15:00","days":"siku","hours":"saa","mins":"dakika","secs":"sekunde","Buy tickets":"Nunua tiketi","Full time":"Mwisho wa mchezo","Next":"Ijayo","Amosanders v Porto Mare · Sat 21 Nov, 15:00":"Amosanders v Porto Mare · Jmosi 21 Nov, 15:00","Results":"Matokeo","Fixtures":"Ratiba","Latest news":"Habari mpya","Our teams":"Timu zetu","Men’s team":"Timu ya wanaume","Women’s team":"Timu ya wanawake","Academy":"Akademi","All":"Wote","Goalkeepers":"Walinda lango","Defenders":"Mabeki","Midfielders":"Viungo","Forwards":"Washambuliaji","Official partners":"Washirika rasmi","Matchday ticket":"Tiketi ya mechi","Season ticket":"Tiketi ya msimu","Hospitality":"Ukarimu maalum","Supporter":"Shabiki","Member":"Mwanachama","Free":"Bure","from $20":"kuanzia $20","$240 / season":"$240 / msimu","from $150":"kuanzia $150","$30 / year":"$30 / mwaka","$95 / year":"$95 / mwaka","Single-match entry to Amosanders Arena.":"Kiingilio cha mechi moja Amosanders Arena.","Every home league match, with a reserved seat.":"Kila mechi ya nyumbani ya ligi, ukiwa na kiti chako maalum.","Premium seats, food and drink, and a pitch-side lounge.":"Viti bora, chakula, vinywaji na sebule karibu na uwanja.","News, fixtures and a member newsletter.":"Habari, ratiba na jarida la wanachama.","Early access to club news and exclusive content.":"Nafasi ya mapema ya habari za klabu na maudhui maalum.","A signed shirt, an Arena tour and exclusive events.":"Jezi iliyosainiwa, ziara ya Arena na matukio maalum.","Choose":"Chagua","Be part of the Amosanders family":"Kuwa sehemu ya familia ya Amosanders","Digital membership, club news and match updates. Supporters in more than 90 countries.":"Uanachama wa kidijitali, habari za klabu na taarifa za mechi. Mashabiki katika zaidi ya nchi 90.","Become a member":"Jiunge kama mwanachama","Official website of Amosanders FC.":"Tovuti rasmi ya Amosanders FC.","Contact · Press · Careers · Privacy":"Mawasiliano · Vyombo vya habari · Ajira · Faragha"};
const orig=new WeakMap();
function setLang(l){try{localStorage.setItem("lang",l)}catch(e){}const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.parentNode.tagName==="SCRIPT")continue;if(!orig.has(n))orig.set(n,n.nodeValue);const o=orig.get(n),k=o.trim();if(SW[k])n.nodeValue=l==="sw"?o.replace(k,SW[k]):o}document.documentElement.lang=l;document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===l))}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));
const target=new Date("2026-11-21T15:00:00").getTime();
function tick(){const diff=target-Date.now(),t=Math.max(0,diff)/1000;const v={d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%3600/60),s:Math.floor(t%60)};
for(const k in v){const el=document.getElementById(k),nv=String(v[k]).padStart(2,"0");if(el.textContent!==nv){el.textContent=nv;el.classList.remove("flip");void el.offsetWidth;el.classList.add("flip")}}
const bd=document.getElementById("badge"),nx=document.querySelector(".next"),sw=document.documentElement.lang==="sw";
if(diff<=0&&diff>-72e5){bd.hidden=false;bd.className="badge live";bd.textContent=sw?"Moja kwa moja":"Live now";nx.classList.add("hot")}
else if(diff>0&&diff<864e5){bd.hidden=false;bd.className="badge";bd.textContent=sw?"Mpira leo":"Kick-off today";nx.classList.add("hot")}
else{bd.hidden=true;nx.classList.remove("hot")}}
if(document.getElementById("count")){tick();setInterval(tick,1000)}

/* Lively motion: scroll reveal and count-up numbers */
document.documentElement.classList.add("js");
if(!matchMedia("(prefers-reduced-motion:reduce)").matches&&"IntersectionObserver"in window){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(()=>t.classList.remove("rv","in"),1500)}}),{threshold:.12});
document.querySelectorAll("h2,.row,.news article,.v,.opt,.spons .wrap,.join .wrap,footer .wrap").forEach(el=>{el.classList.add("rv");io.observe(el)});
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const t=+e.target.dataset.n,s=e.target.dataset.s||"";let st=null;const f=ts=>{st=st||ts;const p=Math.min((ts-st)/1500,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
document.querySelectorAll("[data-n]").forEach(el=>{el.textContent="0";co.observe(el)});
}

/* Scroll progress bar */
const pb=document.createElement("div");pb.id="progress";document.body.append(pb);
addEventListener("scroll",()=>{const h=document.documentElement;pb.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"},{passive:true});

/* Photo strip: scrolls endlessly behind Results and Fixtures (styled by .track / .tile in style.css).
Uses only the pictures from images/slides (player photos are no longer included).
Put your pictures in images/slides, name them anything and list the names below
(with or without the extension; .jpg .jpeg .png .webp are tried automatically). */
(function(){
const box=document.getElementById("slides");if(!box)return;
const names=["slide-1","slide-2","slide-3","slide-4","slide-5","slide-6","slide-7","slide-8","slide-9","slide-10","slide-11","slide-12","slide-13","slide-14","slide-15","slide-16","slide-17","slide-18","slide-19","slide-20","slide-21","slide-22","slide-23","slide-24","slide-25","slide-26","slide-27","slide-28","slide-29"," slide-30","slide-31","slide-32","slide-33","slide-34","slide-35","slide-36","slide-37","slide-38","slide-39"," slide-40"," slide-41"," slide-42"," slide-43"];
const exts=["",".jpg",".jpeg",".png",".webp",".avif",".gif",".JPG",".JPEG",".PNG",".WEBP"];
/* On phones / Data Saver only a random handful of slides is loaded, so the page opens quickly and uses little data */
const small=matchMedia("(max-width:700px)").matches||(navigator.connection&&navigator.connection.saveData);
let pool=[...new Set(names.map(n=>n.trim()).filter(Boolean))];
if(small){for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}pool=pool.slice(0,10)}
const jobs=[...pool.map(n=>["images/slides/"+n,/\.\w{3,4}$/.test(n)?[""]:exts])];
const found=[],failed=[];let pending=jobs.length;
function tryLoad(i,base,list){
if(!list.length){failed.push(base);return finish()}
const src=base+list[0],im=new Image();
im.onload=()=>{found[i]=src;finish()};
im.onerror=()=>tryLoad(i,base,list.slice(1));
im.src=src}
function finish(){if(--pending)return;build()}
function build(){
const ok=found.filter(Boolean);
console.info("Slideshow: "+ok.length+" picture(s) loaded"+(failed.length?"; not found: "+failed.join(", "):""));
if(!ok.length)return;
let half=ok.slice();while(half.length<8)half=half.concat(ok);   /* each half must be wider than the screen */
const track=document.createElement("div");track.className="track";
track.style.setProperty("--dur",half.length*5+"s");
[...half,...half].forEach(src=>{               /* two identical halves = seamless loop */
const t=document.createElement("div");t.className="tile";
const im=new Image();im.decoding="async";im.src=src;im.alt="";t.append(im);track.append(t)});
box.append(track);
if(matchMedia("(prefers-reduced-motion:reduce)").matches)track.style.animation="none"}
jobs.forEach(([base,list],i)=>tryLoad(i,base,list));
})();


/* Latest news carousel: builds itself from the <article>s inside #news .news (the grid stays as a no-JS fallback).
   To add a story, copy an <article> and give it data-img="images/news/your-photo.jpg". */
(function(){
const list=document.querySelector("#news .news");if(!list)return;
const arts=[...list.querySelectorAll("article")],n=arts.length;if(n<2)return;
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const data=arts.map(a=>{
  const parts=[],old=getComputedStyle(a,"::before").backgroundImage;
  if(a.dataset.img)parts.push('url("'+a.dataset.img+'")');
  if(old&&old!=="none")parts.push(old);
  parts.push("linear-gradient(135deg,#0f4a1a,#1b7f2a)");
  const q=s=>{const e=a.querySelector(s);return e?e.textContent.trim():""};
  return{tag:q("small"),title:q("h3"),text:q("p"),bg:parts.join(","),img:a.dataset.img||"",more:(a.dataset.more||"").split(",").map(x=>x.trim()).filter(Boolean),paras:[...a.querySelectorAll("p")].map(p=>p.textContent.trim()).filter(Boolean)}});
const car=el("div","ncar");car.setAttribute("role","region");car.setAttribute("aria-roledescription","carousel");car.setAttribute("aria-label","Latest news");
const slides=data.map(d=>{const s=el("div","ncar-slide");s.style.backgroundImage=d.bg;
  const t=el("div","ncar-txt");t.append(el("small",null,d.tag),el("h3",null,d.title),el("p",null,d.text),el("span","ncar-more","Read full story \u2192"));s.append(t);car.append(s);return s});
const box=el("div","ncar-thumbs");
const th=data.map((d,i)=>{const b=el("div","ncar-th");b.style.backgroundImage=d.bg;b.append(el("span",null,d.title));box.append(b);return b});
car.append(box);
const bar=el("div","ncar-bar");car.append(bar);
let cur=0;
function layout(prevCur){
  th.forEach((t,i)=>{
    const r=(i-cur+n)%n,pr=prevCur==null?r:(i-prevCur+n)%n,jump=Math.abs(r-pr)>1;
    if(jump)t.style.transition="none";
    t.style.transform="translateX(calc("+(r?r-1:-1)+" * (var(--tw) + 14px)))"+(r?"":" scale(1.12)");
    if(jump){t.style.opacity=0;void t.offsetWidth;t.style.transition=""}
    t.style.opacity=r?1:0;t.style.pointerEvents=r?"":"none";t.setAttribute("aria-hidden","true")})}
function restartBar(){bar.classList.remove("run");void bar.offsetWidth;if(!reduce)bar.classList.add("run")}
const STEP=6000;
function go(i){
  i=(i+n)%n;if(i===cur)return;const p=cur;cur=i;
  slides.forEach((s,k)=>{s.classList.toggle("on",k===cur);s.setAttribute("aria-hidden",k===cur?"false":"true")});
  layout(p);restartBar()}
slides[0].classList.add("on");slides.forEach((s,k)=>s.setAttribute("aria-hidden",k?"true":"false"));
layout(null);restartBar();setInterval(()=>go(cur+1),STEP);
/* Photo viewer: click a photo in a story's collage to open it large; arrows / swipe / keys move between photos */
let lbDlg,lbImg,lbCount,lbList=[],lbAt=0;
function openLB(list,k,title){
  if(!lbDlg){
    lbDlg=el("dialog","ndet-lb");lbDlg.setAttribute("aria-label","Photo viewer");
    lbImg=new Image();
    lbCount=el("p","ndet-lb-n");
    const mk=(c,t,l,f)=>{const b=el("button",c,t);b.type="button";b.setAttribute("aria-label",l);b.onclick=e=>{e.stopPropagation();f()};return b};
    const step=n=>{lbAt=(lbAt+n+lbList.length)%lbList.length;showLB()};
    lbDlg.append(lbImg,lbCount,mk("ndet-lb-x","\u00d7","Close",()=>lbDlg.close()),mk("ndet-lb-p","\u2039","Previous photo",()=>step(-1)),mk("ndet-lb-nx","\u203a","Next photo",()=>step(1)));
    lbDlg.addEventListener("click",e=>{if(e.target===lbDlg||e.target===lbImg)lbDlg.close()});
    lbDlg.addEventListener("mousedown",e=>{if(e.detail>1)e.preventDefault()});
    lbDlg.addEventListener("keydown",e=>{if(e.key==="ArrowRight")step(1);else if(e.key==="ArrowLeft")step(-1)});
    let x0=null;lbDlg.addEventListener("touchstart",e=>{x0=e.touches[0].clientX},{passive:true});
    lbDlg.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)step(dx<0?1:-1)});
    document.body.append(lbDlg)}
  lbList=list;lbAt=k;lbImg.alt=title||"";showLB();if(!lbDlg.open)lbDlg.showModal()}
function showLB(){lbImg.src=lbList[lbAt];lbCount.textContent=(lbAt+1)+" / "+lbList.length}

/* Full story panel: click a slide or a thumbnail to read the whole story under the carousel.
   Add more <p> paragraphs inside an <article> to make its full story longer. */
const det=el("article","ndet");det.id="news-detail";det.hidden=true;det.setAttribute("aria-live","polite");
function openDet(i){const d=data[i];det.textContent="";
  const x=el("button","ndet-x","\u00d7");x.type="button";x.setAttribute("aria-label","Close story");x.onclick=()=>{det.hidden=true};
  const body=el("div","ndet-body");body.append(el("small",null,d.tag),el("h3",null,d.title));
  (d.paras.length?d.paras:[d.text]).forEach(t=>body.append(el("p",null,t)));
  const one=[d.img,...d.more].filter(Boolean).map(u=>u.split("#")[0]);
  const openable=(im,k)=>{im.tabIndex=0;im.setAttribute("role","button");im.setAttribute("aria-label","Open photo "+(k+1)+" of "+one.length);im.onclick=()=>openLB(one,k,d.title);im.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLB(one,k,d.title)}}};
  if(d.more.length&&d.more.length<2){const m=el("div","ndet-more");d.more.forEach((u,j)=>{const g=new Image();g.alt=d.title;g.loading="lazy";g.onerror=()=>g.remove();g.src=u;openable(g,j+1);m.append(g)});body.append(m)}
  if(d.more.length>=2){/* many photos: they fill the left side as a collage.
       Tile hints after the file name:  #h big (4x2)  #q square (2x2)  #w wide (2x1)  #t tall (1x2)  none = small square */
    const g=el("div","ndet-gal"),all=[d.img,...d.more].filter(Boolean).map(u=>{const[p,hn]=u.split("#");return{src:p,hint:hn||""}});
    const hinted=all.some(x=>x.hint);
    if(hinted){g.classList.add("hinted");if(!all[0].hint)all[0].hint="h";
      const area={h:8,w:2,t:2,q:4};g.style.setProperty("--rows",Math.ceil(all.reduce((t,x)=>t+(area[x.hint]||1),0)/4))}
    else g.style.setProperty("--rows",Math.ceil((all.length-1+4)/3));
    const srcs=all.map(x=>x.src);
    all.forEach((x,k)=>{const c=el("button","gi"+(hinted?" t-"+(x.hint||"s"):(k===0?" big":"")));c.type="button";c.setAttribute("aria-label","Open photo "+(k+1)+" of "+all.length);const im=new Image();im.alt=d.title;im.loading=k<4?"eager":"lazy";im.decoding="async";im.onerror=()=>c.remove();im.src=x.src;c.append(im);c.onclick=()=>openLB(srcs,k,d.title);g.append(c)});
    if(hinted&&"ResizeObserver"in window){/* square units, so every photo keeps its own shape.
       If the story text is taller than the collage, the photos are repeated (zoomed on different parts) to fill the space. */
      const base=+g.style.getPropertyValue("--rows"),ZOOM=[["12%","40%"],["88%","40%"],["50%","70%"],["30%","55%"],["72%","55%"]];let lastW=0;
      const fit=()=>{
        const w=g.clientWidth;if(w===lastW&&g.dataset.fit)return;lastW=w;g.dataset.fit=1;
        g.querySelectorAll(".rep").forEach(x=>x.remove());
        const u=(w-30)/4;
        if(!(u>40)||matchMedia("(max-width:760px)").matches){g.style.gridTemplateRows="";return}
        const room=Math.floor((body.offsetHeight-12+6)/(u+6));
        const extra=Math.min(12,Math.max(0,room-base));
        for(let i=0;i<extra*2;i++){const j=(i+1)%srcs.length,c=el("button","gi t-w rep");c.type="button";c.setAttribute("aria-label","Open photo "+(j+1)+" of "+srcs.length);
          const z=ZOOM[i%ZOOM.length];c.style.setProperty("--ox",z[0]);c.style.setProperty("--oy",z[1]);
          const im=new Image();im.alt=d.title;im.loading="lazy";im.decoding="async";im.src=srcs[j];c.append(im);c.onclick=()=>openLB(srcs,j,d.title);g.append(c)}
        g.style.setProperty("--rows",base+extra);
        g.style.gridTemplateRows="repeat("+(base+extra)+","+u.toFixed(1)+"px)"};
      new ResizeObserver(fit).observe(g);fit()}
    det.append(g)}
  else if(d.img){const im=new Image();im.alt=d.title;im.loading="lazy";im.decoding="async";im.className="ndet-img";im.onerror=()=>im.remove();im.src=d.img;openable(im,0);det.append(im)}
  det.append(body,x);det.hidden=false;
  det.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}
th.forEach((t,i)=>t.addEventListener("click",()=>{go(i);openDet(i)}));
car.addEventListener("click",e=>{if(e.target.closest(".ncar-th"))return;openDet(cur)});
car.tabIndex=0;car.addEventListener("keydown",e=>{if(e.key==="Enter")openDet(cur);else if(e.key==="ArrowRight")go(cur+1);else if(e.key==="ArrowLeft")go(cur-1)});
list.before(car);car.after(det);list.style.display="none";
})();


/* Starting lineup: built from the men's squad (positions GK / DF / MF / FW).
   Add or remove players in the men's list at the top of this file and the formation updates itself. */
(function(){
const root=document.getElementById("lu-cards"),pitch=document.getElementById("pitch");if(!root||!pitch)return;
Object.assign(SW,{"Starting lineup":"Kikosi cha kuanza","Our matchday formation, from goalkeeper to strikers.":"Mfumo wetu wa mechi, kuanzia golikipa hadi washambuliaji.","Formation":"Mfumo","Substitutes":"Wachezaji wa akiba","Head coach":"Kocha mkuu"});
const codes=["GK","DF","MF","FW"],ypos=[85,63,40,16];
const steps=[...document.querySelectorAll("#lineup .lu-steps li")];
const lines=codes.map(c=>squads.men.filter(p=>grp(p[4])===c));
const el=(c,t)=>{const e=document.createElement(t||"div");e.className=c;return e};
/* Substitutes: [shirt number, name, position]. Replace these placeholders with your real bench. */
const subs=[[24,"Okello","GK"],[13,"Erick","LB"],[7,"Benjamin","RW"],[4,"Maxi","CB"],[16,"Elvo","LB"]];
const subEls=subs.map(([no,name,pos])=>{const li=document.createElement("li"),b=document.createElement("b"),sp=document.createElement("span"),em=document.createElement("em");
  b.textContent=no;sp.textContent=name;em.textContent=pos;li.append(b,sp,em);document.getElementById("lu-subs").append(li);return li});
/* Head coach: first person in the staff list near the top of this file */
(function(){const cb=document.getElementById("lu-coach"),s0=staff[0];if(!s0){cb.hidden=true;return}
  const av=el("lu-av");
  if(s0[3]){const im=new Image();im.alt=s0[0];im.onerror=()=>{im.remove();av.insertAdjacentHTML("afterbegin",sil)};im.src=s0[3];av.append(im)}else av.innerHTML=sil;
  const sm=document.createElement("small"),nm=document.createElement("b");sm.textContent="Head coach";nm.textContent=s0[0];cb.append(av,sm,nm)})();
const wrapEl=pitch.parentElement;
const cards=lines.map((list,li)=>list.map((p,j)=>{
  const c=el("lu-c"),k=el("lu-k"),i=el("lu-i"),n=el("lu-n"),b=document.createElement("b");
  c.style.left=(j+1)/(list.length+1)*100+"%";c.style.top=ypos[li]+"%";
  if(p[5]){const im=new Image();im.alt=p[1];im.onerror=()=>{im.remove();i.insertAdjacentHTML("afterbegin",sil)};if(!/\.png$/i.test(p[5]))im.onload=()=>unbg(im);im.src=p[5];i.append(im)}else i.innerHTML=sil;
  b.textContent=p[0];n.append(b,document.createTextNode(p[1]));k.append(i,n);c.append(k);root.append(c);return c}));
const all=cards.flat();
steps.forEach((s,i)=>{if(!lines[i].length)s.hidden=true});
document.getElementById("lu-form").textContent=lines.slice(1).filter(l=>l.length).map(l=>l.length).join("-")||"–";
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
let timers=[],running=false;
const later=(f,ms)=>timers.push(setTimeout(f,ms));
const stop=()=>{timers.forEach(clearTimeout);timers=[];running=false};
function reset(){wrapEl.classList.remove("out");all.forEach(c=>c.classList.remove("in","cur"));subEls.forEach(l=>l.classList.remove("in"));steps.forEach(s=>s.classList.remove("on","done"))}
function run(){
  stop();running=true;reset();let t=500;
  lines.forEach((l,li)=>{if(!l.length)return;
    later(()=>{
      all.forEach(c=>c.classList.remove("cur"));
      steps.forEach((s,k)=>{s.classList.toggle("on",k===li);s.classList.toggle("done",k<li&&lines[k].length>0)});
      cards[li].forEach((c,j)=>later(()=>c.classList.add("in","cur"),j*170))},t);
    t+=1900});
  later(()=>subEls.forEach((l,j)=>later(()=>l.classList.add("in"),j*150)),t);t+=600+subEls.length*150;
  later(()=>steps.forEach(s=>{s.classList.remove("on");if(!s.hidden)s.classList.add("done")}),t);
  later(()=>wrapEl.classList.add("out"),t+3500);
  later(run,t+4400)}
if(reduce){all.forEach(c=>c.classList.add("in"));subEls.forEach(l=>l.classList.add("in"));steps.forEach(s=>s.classList.add("done"))}
else if("IntersectionObserver"in window){
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!running)run()}else stop()}),{threshold:.3}).observe(pitch)}
else run();
})();


/* Kits showcase: shows each kit in turn (5 s each); the thumbnails can also be clicked.
   Kit pictures live in images/kits/ (home, away, third, gk-home, gk-away). */
(function(){
const sec=document.getElementById("kits");if(!sec)return;
Object.assign(SW,{"Our kits":"Jezi zetu","Our matchday colours, for outfield players and goalkeepers.":"Rangi zetu za mechi, kwa wachezaji wa uwanjani na walinda lango.","Outfield":"Wachezaji wa uwanjani","Goalkeeper":"Golikipa","Home kit":"Jezi ya nyumbani","Away kit":"Jezi ya ugenini","Third kit":"Jezi ya tatu","Goalkeeper home kit":"Jezi ya golikipa ya nyumbani","Goalkeeper away kit":"Jezi ya golikipa ya ugenini","Home":"Nyumbani","Away":"Ugenini","Third":"Ya tatu","GK Home":"GK Nyumbani","GK Away":"GK Ugenini","Our first-choice matchday kit. Black with lime trim.":"Jezi yetu kuu ya mechi. Nyeusi yenye mapambo ya kijani kibichi.","Worn when we travel. Bold red with teal accents.":"Huvaliwa tunaposafiri. Nyekundu kali yenye rangi ya samawati-kijani.","Our alternate kit. Navy blue with red accents and a starry pattern.":"Jezi yetu mbadala. Buluu iliyokolea yenye nyekundu na michoro ya nyota.","Red with black panels, with gloves, shin guards and socks.":"Nyekundu yenye sehemu nyeusi, pamoja na glovu, walinzi wa miguu na soksi.","Neon yellow with black panels, with gloves and socks.":"Njano ing'aayo yenye sehemu nyeusi, pamoja na glovu na soksi."});
const kits=[...sec.querySelectorAll(".kit")],txt=[...sec.querySelectorAll(".kit-txt")],th=[...sec.querySelectorAll(".kit-th")];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,STEP=5000;
let cur=0,timer=null,visible=false;
function show(i){cur=(i+kits.length)%kits.length;
  kits.forEach((e,k)=>e.classList.toggle("on",k===cur));txt.forEach((e,k)=>e.classList.toggle("on",k===cur));
  th.forEach((b,k)=>{b.classList.toggle("on",k===cur);b.setAttribute("aria-pressed",k===cur?"true":"false")})}
function arm(){clearTimeout(timer);th.forEach(b=>b.classList.remove("run"));if(!visible||reduce)return;
  void sec.offsetWidth;th[cur].classList.add("run");timer=setTimeout(()=>{show(cur+1);arm()},STEP)}
th.forEach((b,k)=>b.onclick=()=>{show(k);arm()});
if("IntersectionObserver"in window)new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;arm()}),{threshold:.35}).observe(sec);
else{visible=true;arm()}
})();


/* Captain and Player of the Month.
   Set the two names below (they must match a player's name in the men's squad list at the top of this file).
   Optional: note = a short sentence, month = e.g. "November 2026" (blank = current month),
   stats = [["Goals",3],["Assists",2]] */
(function(){
const SPOT={
  captain:{name:"Hosea",note:"It is my honor to serve as captain of this great team.", stats:[["Goals",5],["Assists",3]]},
  potm:{name:"Lelieto",month:"",note:"I thank the Almighty for the far",stats:[["Goals",19],["Assists",8]]}
};
Object.assign(SW,{"Captain & Player of the Month":"Nahodha na Mchezaji Bora wa Mwezi","Meet the leader of our team and this month’s standout performer.":"Mkutane na kiongozi wa timu yetu na mchezaji aliyeng’ara mwezi huu.","Team captain":"Nahodha wa timu","Player of the month":"Mchezaji bora wa mwezi"});
const fill=(id,cfg)=>{
  const card=document.getElementById(id);if(!card)return;
  const p=squads.men.find(x=>x[1]===cfg.name);if(!p){card.hidden=true;return}
  card.querySelector(".sp-no").textContent=p[0];
  card.querySelector("h3").textContent=p[1];
  card.querySelector(".sp-pos").textContent=p[2]+" · "+p[3];
  const mo=card.querySelector(".sp-month");
  if(mo)mo.textContent=cfg.month||new Date().toLocaleString("en",{month:"long",year:"numeric"});
  const nt=card.querySelector(".sp-note");if(cfg.note){nt.textContent=cfg.note;nt.hidden=false}
  const st=card.querySelector(".sp-stats");
  if(st&&cfg.stats&&cfg.stats.length){cfg.stats.forEach(([k,v])=>{const li=document.createElement("li"),b=document.createElement("b"),sp=document.createElement("span");b.textContent=v;sp.textContent=k;li.append(b,sp);st.append(li)});st.hidden=false}
  const ph=card.querySelector(".sp-ph");
  if(p[5]){const im=new Image();im.alt=p[1];im.onerror=()=>{im.remove();ph.insertAdjacentHTML("afterbegin",sil)};
    if(!/\.png$/i.test(p[5])&&window.unbg)im.onload=()=>window.unbg(im);
    im.src=p[5];ph.append(im)}else ph.innerHTML=sil};
fill("sp-cap",SPOT.captain);fill("sp-potm",SPOT.potm);
const sec=document.getElementById("spotlight");
if(!sec)return;
if("IntersectionObserver"in window)new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){sec.classList.add("sp-on");o.disconnect()}}),{threshold:.2}).observe(sec);
else sec.classList.add("sp-on");
})();

Object.assign(SW,{"Beyond the Pitch":"Zaidi ya Uwanja","Quick links":"Viungo vya haraka","Contact us":"Wasiliana nasi","Always open":"Wazi saa zote","Call us":"Tupigie","Get directions":"Pata maelekezo","Your number one HOME.":"Nyumbani kwako nambari moja.","All rights reserved.":"Haki zote zimehifadhiwa."});
Object.assign(SW,{"Amosanders FC on Facebook":"Amosanders FC kwenye Facebook","Send via WhatsApp":"Tuma kupitia WhatsApp"});
document.querySelectorAll(".yr").forEach(e=>e.textContent=new Date().getFullYear());

/* Keep the chosen language when moving between pages */
try{if(localStorage.getItem("lang")==="sw")setLang("sw")}catch(e){}

/* Menu button: on narrow screens the links fold into a drop-down opened by the button */
(function(){const nav=document.querySelector("header nav"),ul=nav&&nav.querySelector("ul");if(!ul)return;
ul.id=ul.id||"site-menu";
const b=document.createElement("button");b.type="button";b.className="menu-btn";
b.setAttribute("aria-label","Menu");b.setAttribute("aria-controls",ul.id);b.setAttribute("aria-expanded","false");
b.innerHTML="<span></span><span></span><span></span>";nav.append(b);
const set=o=>{nav.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false")};
b.addEventListener("click",()=>set(!nav.classList.contains("open")));
ul.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
document.addEventListener("click",e=>{if(!nav.contains(e.target))set(false)});
matchMedia("(min-width:1241px)").addEventListener("change",e=>{if(e.matches)set(false)});
})();

/* Floating WhatsApp button */
(function(){const a=document.createElement("a");a.className="wa-fab";a.href="https://wa.me/254720349467";a.target="_blank";a.rel="noopener";a.setAttribute("aria-label","Chat with Amosanders FC on WhatsApp");
a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.5z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/></svg>';document.body.append(a)})();
