const USER="praneethnalamalapu-afk";
const API=`https://api.github.com/users/${USER}`;
const fallback=[
{name:"site_for_friend",language:"HTML",description:"Responsive online jewelry storefront for chains, bracelets, pendants and rings.",url:`https://github.com/${USER}/site_for_friend`},
{name:"swaraa-",language:"JavaScript",description:"JavaScript web project focused on front-end development and interactive experiences.",url:`https://github.com/${USER}/swaraa-`},
{name:"PR_bank",language:"Python",description:"Banking application demonstrating practical Python programming and application logic.",url:`https://github.com/${USER}/PR_bank`},
{name:"address_book",language:"C",description:"Console application for storing, managing and retrieving contact information.",url:`https://github.com/${USER}/address_book`},
{name:"LSB_Stegnography",language:"C",description:"Bit-level steganography project exploring file handling and image data processing.",url:`https://github.com/${USER}/LSB_Stegnography`},
{name:"mp3-tag-reader",language:"C",description:"MP3 metadata project for reading and working with tag information.",url:`https://github.com/${USER}/mp3-tag-reader`}
];
let repos=[], active="all";
const $=s=>document.querySelector(s);
function esc(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function renderProjects(){
 const data=(repos.length?repos.filter(r=>!r.fork).map(r=>({name:r.name,language:r.language||"Other",description:r.description,url:r.html_url})):fallback);
 const shown=data.filter(p=>active==="all"||p.language===active);
 $("#projects-grid").innerHTML=shown.map((p,i)=>`<article class="project-card"><span class="num">0${i+1}</span><h3>${esc(p.name.replaceAll("-"," "))}</h3><p>${esc(p.description||"Project built during my software engineering journey.")}</p><div class="project-foot"><span class="lang">${esc(p.language)}</span><a class="repo" href="${p.url}" target="_blank">Repository ↗</a></div></article>`).join("");
}
async function loadGitHub(){
 try{
  const [pr,rr]=await Promise.all([fetch(API),fetch(`${API}/repos?per_page=100&sort=updated`)]);
  if(!pr.ok||!rr.ok)throw Error();
  const profile=await pr.json(); repos=await rr.json();
  $("#gh-repos").textContent=profile.public_repos;
  $("#gh-followers").textContent=profile.followers;
  $("#gh-stars").textContent=repos.reduce((s,r)=>s+(r.stargazers_count||0),0);
  $("#gh-languages").textContent=new Set(repos.map(r=>r.language).filter(Boolean)).size+"+";
  renderProjects();
 }catch(e){renderProjects()}
}
function fakeContrib(){
 const grid=$("#contrib-grid"); grid.innerHTML="";
 const days=364;
 for(let i=0;i<days;i++){const c=document.createElement("i");c.className="cell";const n=Math.random();if(n>.88)c.classList.add("l4");else if(n>.76)c.classList.add("l3");else if(n>.61)c.classList.add("l2");else if(n>.43)c.classList.add("l1");grid.appendChild(c)}
 $("#contrib-range").textContent="Last 12 months · public activity";
}
function setupForm(){
 $("#contact-form").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);
  const subject=encodeURIComponent(`Portfolio contact from ${f.get("name")}`);
  const body=encodeURIComponent(`Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`);
  location.href=`mailto:nalamalapupraneethreddy@gmail.com?subject=${subject}&body=${body}`;
  $("#form-status").textContent="Your email client should open with the message ready to send.";
 });
}
function setupFilters(){document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.filter;renderProjects()}))}
function setupMenu(){const b=$(".menu-btn"),n=$(".nav-links");b.onclick=()=>n.classList.toggle("open");n.querySelectorAll("a").forEach(a=>a.onclick=()=>n.classList.remove("open"))}
function setupCursor(){
 const c=$("#cursor"),r=$("#cursor-ring");let mx=0,my=0,rx=0,ry=0;
 addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;c.style.left=mx+"px";c.style.top=my+"px"});
 function tick(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;r.style.left=rx+"px";r.style.top=ry+"px";requestAnimationFrame(tick)}tick();
 document.querySelectorAll("a,button,input,textarea").forEach(el=>{el.addEventListener("mouseenter",()=>r.classList.add("big"));el.addEventListener("mouseleave",()=>r.classList.remove("big"))})
}
document.addEventListener("DOMContentLoaded",()=>{$("#year").textContent=new Date().getFullYear();setupMenu();setupFilters();setupForm();fakeContrib();loadGitHub();setupCursor()});
