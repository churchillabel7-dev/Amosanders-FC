// Add photos to images/gallery/ using these file names, or change the list.
const items=[
["images/gallery/match-1.jpg","Amosanders 3–1 Kestrel City","Matches"],["images/gallery/match-2.jpg","Late equaliser away at Valdora","Matches"],["images/gallery/match-3.jpg","Continental Cup win at home","Matches"],["images/gallery/match-4.jpg","Celebrating at full time","Matches"],

["/images/gallery/training-1.jpeg", "Morning session", "Training"],
["/images/gallery/training-2.jpeg", "Goalkeeper drills", "Training"],
["/images/gallery/training-3.png", "Academy training day", "Training"],
["/images/gallery/training-4.jpg", "Warm-up before the match", "Training"],

["images/gallery/fans-1.jpg","Supporters in the stands","Fans"],["images/gallery/fans-2.jpg","Matchday atmosphere","Fans"],["images/gallery/fans-3.jpg","Fans meet the players","Fans"]];
const SW={"Matches":"Mechi","News":"Habari","Squad":"Kikosi","Management":"Uongozi","Videos":"Video","Gallery":"Picha","Membership":"Uanachama","Training":"Mazoezi","Fans":"Mashabiki","All":"Wote","Close":"Funga","Add photo":"Weka picha","Match days, training and moments with our supporters.":"Siku za mechi, mazoezi na nyakati na mashabiki wetu.","Official website of Amosanders FC.":"Tovuti rasmi ya Amosanders FC.","Contact · Press · Careers · Privacy":"Mawasiliano · Vyombo vya habari · Ajira · Faragha"};
const orig=new WeakMap();let lang="en",cat="all";
function setLang(l){lang=l;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.parentNode.tagName==="SCRIPT")continue;if(!orig.has(n))orig.set(n,n.nodeValue);const o=orig.get(n),k=o.trim();n.nodeValue=(l==="sw"&&SW[k])?o.replace(k,SW[k]):o}document.documentElement.lang=l;document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===l))}
const grid=document.getElementById("gal"),dlg=document.getElementById("lb");
function draw(){grid.innerHTML="";items.filter(i=>cat==="all"||i[2]===cat).forEach(i=>{const b=document.createElement("button");b.type="button";b.className="g";const im=new Image();im.alt=i[1];
im.onload=()=>{b.onclick=()=>{dlg.querySelector("img").src=im.src;dlg.querySelector("img").alt=i[1];dlg.querySelector("p").textContent=i[1];dlg.showModal()}};
im.onerror=()=>{im.remove();b.classList.add("empty");b.disabled=true;b.insertAdjacentHTML("afterbegin","<em>Add photo</em>");setLang(lang)};
im.src="images/gallery/"+i[0];b.append(im);const c=document.createElement("span");c.textContent=i[1];b.append(c);grid.append(b)})}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-pressed",x===b));cat=b.dataset.c;draw()});
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));
document.getElementById("close").onclick=()=>dlg.close();
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
draw();

/* Scroll progress bar */
const pb=document.createElement("div");pb.id="progress";document.body.append(pb);
addEventListener("scroll",()=>{const h=document.documentElement;pb.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"},{passive:true});
