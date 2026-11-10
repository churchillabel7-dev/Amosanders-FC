const W=[[1,"Nia Okafor","Goalkeeper","Nigeria","GK"],[5,"Sofia Alvarez","Centre-back","Mexico","DF"],[2,"Yuki Hayashi","Right-back","Japan","DF"],[8,"Elena Petrova","Midfielder","Bulgaria","MF"],[10,"Zainab Hassan","Playmaker","Kenya","MF"],[9,"Chloe Martin","Striker","Canada","FW"],[11,"Aisha Bello","Winger","Ghana","FW"]];
const A=[[1,"Leo Park","Goalkeeper · U18","Korea","GK"],[5,"Ibrahim Sow","Defender · U18","Mali","DF"],[8,"Pedro Costa","Midfielder · U18","Brazil","MF"],[7,"Daniel Mwangi","Midfielder · U16","Kenya","MF"],[9,"Noah Fischer","Forward · U18","Germany","FW"],[11,"Samir Haddad","Winger · U16","Morocco","FW"]];
let players=[[1,"Peter","Goalkeeper","Kenya","GK","images/petro.png"],[4,"Veron","Centre-back","Kenya","DF","images/veron.png"],[3,"Isaac","Left-back","Kenya","DF","images/isaac.png"],[8,"Davie","Midfielder","Kenya","MF","images/davie.png"],[10,"Wizkid","Playmaker","Kenya","MF","images/wiz.png"],[6,"Churchill","Midfielder","Kenya","MF","images/ca.jpeg"],[9,"Lelieto","Striker","Kenya","FW","images/leleito.png"],[11,"Ezekiel","Winger","Kenya","FW","images/ezekiel.png"]];
const box=document.getElementById("players");
const squads={men:players,women:W,academy:A};let cur="all";
const sil='<svg viewBox="0 0 100 125" aria-hidden="true"><circle cx="50" cy="42" r="20"/><path d="M12 125c0-30 16-46 38-46s38 16 38 46z"/></svg>';
const pic=(n,src)=>src?`<img src="${src}" alt="${n}">`:sil;
function draw(f){box.innerHTML=players.filter(p=>f==="all"||p[4]===f).map(p=>`<div class="p"><div class="ph">${pic(p[1],p[5])}<b>${p[0]}</b><em>${p[4]}</em></div><div class="t"><h3>${p[1]}</h3><span>${p[2]} · ${p[3]}</span></div></div>`).join("")}
const staff=[["Rafael Moreau","Head coach","France"],["Emeka Obi","Assistant coach","Nigeria"],["Sven Lindqvist","Goalkeeping coach","Sweden"],["Dr. Aiko Sato","Head of medical","Japan"],["Carlos Benitez","Fitness coach","Spain"],["Grace Wanjiru","Club director","Kenya"],["Hassan Al-Rashid","Technical director","UAE"],["Marta Kowalski","Academy director","Poland"]];
document.getElementById("staff").innerHTML=staff.map(s=>`<div class="p"><div class="ph">${pic(s[0],s[3])}</div><div class="t"><h3>${s[0]}</h3><span>${s[1]} · ${s[2]}</span></div></div>`).join("");
draw("all");
document.querySelectorAll(".tabs:not(.tm) button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs:not(.tm) button").forEach(x=>x.setAttribute("aria-pressed",x===b));cur=b.dataset.f;draw(cur)});
document.querySelectorAll(".tm button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tm button").forEach(x=>x.setAttribute("aria-pressed",x===b));players=squads[b.dataset.t];draw(cur)});
const SW={"News · Academy graduate signs first professional contract":"Habari · Mhitimu wa akademi asaini mkataba wa kwanza wa kitaaluma","Result · Amosanders 3–1 Kestrel City":"Matokeo · Amosanders 3–1 Kestrel City","Next · Amosanders v Porto Mare, Sat 21 Nov":"Ijayo · Amosanders v Porto Mare, Jmosi 21 Nov","Community · Youth clinics expand to four new countries":"Jamii · Kliniki za vijana zapanua hadi nchi nne mpya","Gallery":"Picha","nationalities in our squad":"mataifa katika kikosi chetu","countries with supporters":"nchi zenye mashabiki","teams, from academy to first team":"timu, kuanzia akademi hadi timu kuu","Matches":"Mechi","News":"Habari","Squad":"Kikosi","Management":"Uongozi","Videos":"Video","Tickets":"Tiketi","Membership":"Uanachama","One club.":"Klabu moja.","Every continent.":"Kila bara.","Amosanders FC brings together players and supporters from 31 countries. Follow every match, story and signing.":"Amosanders FC inaunganisha wachezaji na mashabiki kutoka nchi 31. Fuatilia kila mechi, habari na usajili.","Next match · Amosanders Arena · Sat 21 Nov, 15:00":"Mechi ijayo · Amosanders Arena · Jmosi 21 Nov, 15:00","days":"siku","hours":"saa","mins":"dakika","secs":"sekunde","Buy tickets":"Nunua tiketi","Full time":"Mwisho wa mchezo","Next":"Ijayo","Amosanders v Porto Mare · Sat 21 Nov, 15:00":"Amosanders v Porto Mare · Jmosi 21 Nov, 15:00","Results":"Matokeo","Fixtures":"Ratiba","Latest news":"Habari mpya","Our teams":"Timu zetu","Men’s team":"Timu ya wanaume","Women’s team":"Timu ya wanawake","Academy":"Akademi","All":"Wote","Goalkeepers":"Walinda lango","Defenders":"Mabeki","Midfielders":"Viungo","Forwards":"Washambuliaji","Official partners":"Washirika rasmi","Matchday ticket":"Tiketi ya mechi","Season ticket":"Tiketi ya msimu","Hospitality":"Ukarimu maalum","Supporter":"Shabiki","Member":"Mwanachama","Free":"Bure","from $20":"kuanzia $20","$240 / season":"$240 / msimu","from $150":"kuanzia $150","$30 / year":"$30 / mwaka","$95 / year":"$95 / mwaka","Single-match entry to Amosanders Arena.":"Kiingilio cha mechi moja Amosanders Arena.","Every home league match, with a reserved seat.":"Kila mechi ya nyumbani ya ligi, ukiwa na kiti chako maalum.","Premium seats, food and drink, and a pitch-side lounge.":"Viti bora, chakula, vinywaji na sebule karibu na uwanja.","News, fixtures and a member newsletter.":"Habari, ratiba na jarida la wanachama.","Early access to club news and exclusive content.":"Nafasi ya mapema ya habari za klabu na maudhui maalum.","A signed shirt, an Arena tour and exclusive events.":"Jezi iliyosainiwa, ziara ya Arena na matukio maalum.","Choose":"Chagua","Be part of the Amosanders family":"Kuwa sehemu ya familia ya Amosanders","Digital membership, club news and match updates. Supporters in more than 90 countries.":"Uanachama wa kidijitali, habari za klabu na taarifa za mechi. Mashabiki katika zaidi ya nchi 90.","Become a member":"Jiunge kama mwanachama","Official website of Amosanders FC.":"Tovuti rasmi ya Amosanders FC.","Contact · Press · Careers · Privacy":"Mawasiliano · Vyombo vya habari · Ajira · Faragha"};
const orig=new WeakMap();
function setLang(l){const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.parentNode.tagName==="SCRIPT")continue;if(!orig.has(n))orig.set(n,n.nodeValue);const o=orig.get(n),k=o.trim();if(SW[k])n.nodeValue=l==="sw"?o.replace(k,SW[k]):o}document.documentElement.lang=l;document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===l))}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));
const target=new Date("2026-11-21T15:00:00").getTime();
function tick(){const diff=target-Date.now(),t=Math.max(0,diff)/1000;const v={d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%3600/60),s:Math.floor(t%60)};
for(const k in v){const el=document.getElementById(k),nv=String(v[k]).padStart(2,"0");if(el.textContent!==nv){el.textContent=nv;el.classList.remove("flip");void el.offsetWidth;el.classList.add("flip")}}
const bd=document.getElementById("badge"),nx=document.querySelector(".next"),sw=document.documentElement.lang==="sw";
if(diff<=0&&diff>-72e5){bd.hidden=false;bd.className="badge live";bd.textContent=sw?"Moja kwa moja":"Live now";nx.classList.add("hot")}
else if(diff>0&&diff<864e5){bd.hidden=false;bd.className="badge";bd.textContent=sw?"Mpira leo":"Kick-off today";nx.classList.add("hot")}
else{bd.hidden=true;nx.classList.remove("hot")}}
tick();setInterval(tick,1000);

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

/* Player slideshow: uses every player photo, plus pictures from images/slides.
Put your pictures in images/slides. Name them anything and list the names below
   (with or without the extension; .jpg .jpeg .png .webp are tried automatically). */
(function(){
const box=document.getElementById("slides");if(!box){console.warn("Slideshow: <div id=\"slides\"> is missing in index.html");return}
const names=["slide-1","slide-2","slide-3","slide-4","slide-5","slide-6"];
const exts=["",".jpg",".jpeg",".png",".webp",".JPG",".JPEG",".PNG"];
const playerPics=[...new Set(Object.values(squads).flat().map(p=>p[5]).filter(Boolean))];
const els=[],failed=[];let pending=0,idx=0;
function add(im,src){const d=document.createElement("div");d.className="slide"+(/\.png$/i.test(src)?" cut":"");im.alt="";d.append(im);box.append(d);els.push(d);if(els.length===1)d.classList.add("on")}
function tryLoad(base,list,done){if(!list.length){failed.push(base);return done()}
const src=base+list[0],im=new Image();im.onload=()=>{add(im,src);done()};im.onerror=()=>tryLoad(base,list.slice(1),done);im.src=src}
const jobs=[...playerPics.map(p=>[p,[""]]),...names.map(n=>["images/slides/"+n,/\.\w{3,4}$/.test(n)?[""]:exts])];
jobs.forEach(([base,list])=>{pending++;tryLoad(base,list,()=>{if(--pending)return;
console.info("Slideshow: "+els.length+" picture(s) loaded"+(failed.length?"; not found: "+failed.join(", "):""));
if(els.length>1&&!matchMedia("(prefers-reduced-motion:reduce)").matches)setInterval(()=>{els[idx].classList.remove("on");idx=(idx+1)%els.length;els[idx].classList.add("on")},4500)})});
})();
