var e,t=Object.defineProperty,s=(e,s,o)=>(((e,s,o)=>{s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o})(e,"symbol"!=typeof s?s+"":s,o),o);const o=e=>[...new Set(e.map((e=>[...e])).flat())],n=()=>Date.now();let i=0,r=n();function d(){return i++,i===Number.MAX_SAFE_INTEGER&&(i=0,r=n()),`${r.toString(16)}-${i.toString(16)}`}class c{constructor(e,t){s(this,"context"),s(this,"components"),s(this,"entities",{}),s(this,"componentAll",{}),s(this,"systems",{}),s(this,"entityRemove",new Set),s(this,"componentRemove",{}),s(this,"componentQueries",{}),s(this,"queries",{}),s(this,"updatedQueries",new Set),this.context=e,this.components=t;for(const s in t)this.componentAll[s]=new Set,this.componentRemove[s]=new Set,this.componentQueries[s]=new Set}createEntity(e,t){const s=d(),o={__uuid:s};return e&&e.forEach((e=>this.addComponent(o,e,t?t[e]:void 0))),this.entities[s]=o,o}removeEntity(e){if(e){this.entityRemove.add(e.__uuid);for(const t of Object.keys(e))"__uuid"!==t&&this.removeComponent(e,t)}}addComponent(e,t,s){const o=Object.assign({},this.components[t],null!=s?s:{});return e[t]=o,this.componentAll[t].add(e.__uuid),this.updateComponents(t,e.__uuid,"added"),e}removeComponent(e,t){this.componentAll[t].delete(e.__uuid),this.componentRemove[t].add(e.__uuid),this.updateComponents(t,e.__uuid,"removed")}createQuery(e){const t=d(),s={__uuid:t,executed:!1,changed:!0,names:e,entity_ids:new Set,entity_added:new Set,entity_removed:new Set,filters:{},filters_added:{},filters_removed:{}};for(const n of e)s.filters[n]=new Set,s.filters_added[n]=new Set,s.filters_removed[n]=new Set,this.componentAll[n].forEach((e=>{s.filters[n].add(e),s.filters_added[n].add(e)}));this.queries[t]=s,e.forEach((e=>this.componentQueries[e].add(t)));const o=()=>{s.executed=!0,s.changed&&(this.updateQuery(s),s.changed=!1)};return{added:()=>(o(),s.entity_added),removed:()=>(o(),s.entity_removed),entities:()=>(o(),[...s.entity_ids].map((e=>this.entities[e]))),random:e=>(o(),function(e,t){const s=new Set;for(;s.size<e&&s.size!==t.length;)s.add(t[Math.floor(Math.random()*t.length)]);return[...s]}(e,[...s.entity_ids]).map((e=>this.entities[e])))}}addSystem(e,t){const s=t(this);return s.mounted&&s.mounted(),this.systems[e]||(this.systems[e]=[]),this.systems[e].push(s),this.systems[e].sort(((e,t)=>(e.priority||1)-(t.priority||1))),t}updateSystems(e,t){const s=(Array.isArray(e)?e:[e]).map((e=>this.systems[e])).flat();for(const o of s)o.update&&o.update(t)}updateQuery(e){e.entity_ids=new Set((e=>{if(0===e.length)return[];const[t,...s]=e;return[...t].filter((e=>{for(const t of s)if(!t.has(e))return!1;return!0}))})(Object.values(e.filters))),e.entity_added=new Set(o(Object.values(e.filters_added)).filter((t=>e.entity_ids.has(t)))),e.entity_removed=new Set(o(Object.values(e.filters_removed)).filter((t=>e.entity_ids.has(t))))}updateComponents(e,t,s){const o=t instanceof Set?t:new Set([t]);if(0===o.size)return;const n=e;for(const i of this.componentQueries[n]){const e=this.queries[i];for(const t of o)e.filters[n].add(t),"added"===s?(e.filters_added[n].add(t),this.updatedQueries.add(i),e.changed=!0):"removed"===s&&(e.filters_removed[n].add(t),this.updatedQueries.add(i),e.changed=!0)}}cleanup(){this.updatedQueries.clear();for(const e of Object.values(this.queries))e.executed&&(Object.values(e.filters_added).forEach((t=>{0!==t.size&&(this.updatedQueries.add(e.__uuid),t.clear())})),Object.values(e.filters_removed).forEach((t=>{0!==t.size&&(this.updatedQueries.add(e.__uuid),t.clear())})));for(const e in this.components){const t=this.componentRemove[e];0!==t.size&&(t.forEach((t=>{this.componentQueries[e].forEach((s=>{this.queries[s].filters[e].delete(t),this.updatedQueries.add(s)}));delete this.entities[t][e]})),t.clear())}if(this.entityRemove.size>0){for(const e of this.entityRemove)delete this.entities[e];this.entityRemove.clear()}for(const e of this.updatedQueries)this.updateQuery(this.queries[e])}}const a=document.createElement("canvas");a.width=1280,a.height=720,a.style.background="transparent";const u=a.getContext("2d");if(null==(e=document.getElementById("app"))||e.appendChild(a),!u)throw new Error("");function m(){let e="#";for(let t=0;t<3;t++)e+=Math.floor(255*Math.random()).toString(16).padStart(2,"0");return e}function h(e){const t=u.createLinearGradient(0,0,1e3,1e3),s=e.length;let o=0;for(let n of e)t.addColorStop(o/(s-1),n),o++;return t}const l=new c({},{rect:{x:0,y:0,w:100,h:100,colors:["#FFFFFF","#000000"]},disc:{x:0,y:0,r:50,colors:["#FFFFFF","#000000"]},move:{dx:0,dy:0}});l.addSystem("move",(()=>{const e=l.createQuery(["rect","move"]),t=l.createQuery(["disc","move"]);return{name:"",update(s){for(const t of e.entities())t.rect.x+=t.move.dx*s,t.rect.y+=t.move.dy*s,(t.rect.x<0||t.rect.x>1280-t.rect.w)&&(t.move.dx*=-1),(t.rect.y<0||t.rect.y>720-t.rect.h)&&(t.move.dy*=-1);for(const e of t.entities())e.disc.x+=e.move.dx*s,e.disc.y+=e.move.dy*s,(e.disc.x<0||e.disc.x>1280-e.disc.r)&&(e.move.dx*=-1),(e.disc.y<0||e.disc.y>720-e.disc.r)&&(e.move.dy*=-1)}}})),l.addSystem("render",(()=>{const e=l.createQuery(["rect"]);return{name:"",update(){for(const t of e.entities())u.beginPath(),u.fillStyle=h(t.rect.colors),u.fillRect(t.rect.x,t.rect.y,t.rect.w,t.rect.h),u.stroke()}}})),l.addSystem("render",(()=>{const e=l.createQuery(["disc"]);return{name:"",update(){for(const t of e.entities())u.beginPath(),u.fillStyle=h(t.disc.colors),u.arc(t.disc.x,t.disc.y,t.disc.r,0,2*Math.PI),u.fill()}}}));const f=()=>[m(),m(),m(),m(),m()],y=()=>250*Math.random()+200;for(let _=0;_<50;_++)l.createEntity(["rect","move"],{rect:{x:y(),y:y(),colors:f()},move:{dx:Math.random()-.5,dy:Math.random()-.5}}),l.createEntity(["disc","move"],{disc:{x:y(),y:y(),r:60*Math.random()+10,colors:f()},move:{dx:Math.random()-.5,dy:Math.random()-.5}});let p=0;const v=e=>{const t=e-p;p=e,u.clearRect(0,0,a.width,a.height),l.updateSystems(["move","render"],t),requestAnimationFrame(v)};v(0);