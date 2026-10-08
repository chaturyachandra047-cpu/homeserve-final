let S;try{S=JSON.parse(localStorage.getItem('gs1'))}catch(e){}
if(!S){S={cart:[],bookings:[],seq:125,comm:15,notifs:[],role:'customer',pid:0,view:'shop',cat:'all',q:'',coupon:'',
providers:PR.map((p,i)=>({id:i,name:p[0],cats:p[1],areas:p[2],st:p[3],rating:p[4],rc:p[5],on:true,max:4,leave:''}))};
for(let i=0;i<8;i++){const sv=SV[(i*5)%SV.length],pid=i%5,done=i<6;S.bookings.push({id:'SRV-20261001-'+String(100+i).padStart(5,'0'),cust:NAMES[i%6],sid:sv[0],pk:i%3,area:AREAS[i%5],date:'2026-10-0'+(1+i%7),slot:SLOTS[i%5],pid,st:done?'COMPLETED':'CANCELLED',amt:sv[3]*PK[i%3][1]*1.18+49,pay:done?'SUCCESSFUL':'REFUNDED',mine:false,rated:true})}}
const save=()=>{try{localStorage.setItem('gs1',JSON.stringify(S))}catch(e){}};
const sv=id=>SV.find(s=>s[0]==id),cat=id=>CATS.find(c=>c[0]==id),pv=id=>S.providers[id];
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',2600)}
function note(to,t){S.notifs.unshift({to,t});toast(t)}
const live=b=>!['CANCELLED','REJECTED'].includes(b.st);
function elig(c,area,date,slot,ex){return S.providers.filter(p=>p.st=='VERIFIED'&&p.on&&p.cats.includes(c)&&p.areas.includes(area)&&p.leave!=date&&!S.bookings.some(b=>b.pid==p.id&&b.id!=ex&&live(b)&&b.date==date&&b.slot==slot)&&S.bookings.filter(b=>b.pid==p.id&&b.date==date&&live(b)).length<p.max)}
function totals(){let sub=0;S.cart.forEach(i=>sub+=sv(i.sid)[3]*PK[i.pk][1]*i.q);const c=COUP[S.coupon],d=c&&sub>=c.min?Math.min(sub*c.p/100,c.max):0,fee=sub?49:0,tax=(sub-d+fee)*.18;return{sub,d,fee,tax,tot:sub-d+fee+tax}}
function go(v){if(S.role=='customer'&&v=='bookings'&&!S.user){toast('Log in to see your bookings');v='login'}S.view=v;save();draw()}
function add(id,pk,buy){const sel=document.getElementById('pk'+id),k=pk??(sel?+sel.value:0),x=S.cart.find(i=>i.sid==id&&i.pk==k);x?x.q++:S.cart.push({sid:id,pk:k,q:1});save();buy?go('cart'):(toast('Added to cart'),draw())}
function nav(){const m={customer:[['shop','Home & services'],['cart','Cart ('+S.cart.length+')'],['bookings','My bookings']],provider:[['req','Requests'],['jobs','Jobs'],['earn','Earnings'],['avail','Availability']],admin:[['dash','Dashboard'],['prov','Providers'],['book','Bookings'],['set','Settings']]}[S.role];
document.getElementById('nav').innerHTML=m.map(t=>`<button class="tab ${S.view==t[0]?'on':''}" onclick="go('${t[0]}')">${t[1]}</button>`).join('');authBar()}
function noteList(to){const n=S.notifs.filter(x=>x.to==to).slice(0,5);return `<h2>Notifications</h2><div class="card">${n.length?n.map(x=>`<div>• ${x.t}</div>`).join(''):'<span class="mut">Nothing yet. Updates on bookings appear here.</span>'}</div>`}
