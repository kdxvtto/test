import{r as a,d as k,j as n,c as g}from"./index-CqrTW50f.js";/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim();/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:d="",children:s,iconNode:l,...m},h)=>a.createElement("svg",{ref:h,...b,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:i("lucide",d),...m},[...l.map(([p,u])=>a.createElement(p,u)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=(t,e)=>{const r=a.forwardRef(({className:o,...d},s)=>a.createElement(y,{ref:s,iconNode:e,className:i(`lucide-${x(t)}`,o),...d}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],w=c("Moon",f);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],v=c("Sun",j);function M({className:t}){const{theme:e,toggleTheme:r}=k(),o=e==="dark";return n.jsxs("button",{type:"button",onClick:r,"aria-label":"Toggle dark mode",className:g("inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition","hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",t),children:[o?n.jsx(v,{size:16}):n.jsx(w,{size:16}),n.jsxs("span",{className:"hidden sm:inline",children:[o?"Light":"Dark"," mode"]})]})}export{M as T,c};
