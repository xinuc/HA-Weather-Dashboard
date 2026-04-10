function t(t,e,i,r){var o,s=arguments.length,a=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(a=(s<3?o(a):s>3?o(e,i,a):o(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(i,t,r)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,u=globalThis,m=u.trustedTypes,y=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,g=(t,e)=>t,k={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const s=r?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),o=e.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:k).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:k;this._$Em=r;const s=o.fromAttribute(e,t.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(void 0!==t){const s=this.constructor;if(!1===r&&(o=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??w)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,_?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v=globalThis,$=t=>t,M=v.trustedTypes,z=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+U,S=`<${G}>`,N=document,A=()=>N.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,H="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,D=/>/g,P=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,R=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),L=q(1),V=q(2),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Z=new WeakMap,K=N.createTreeWalker(N,129);function Y(t,e){if(!E(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=T;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===T?"!--"===l[1]?a=B:void 0!==l[1]?a=D:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=P):void 0!==l[3]&&(a=P):a===P?">"===l[0]?(a=o??T,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?P:'"'===l[3]?j:I):a===j||a===I?a=P:a===B||a===D?a=T:(a=P,o=void 0);const h=a===P&&t[e+1].startsWith("/>")?" ":"";s+=a===T?i+S:d>=0?(r.push(n),i.slice(0,d)+C+i.slice(d)+U+h):i+U+(-2===d?e:h)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const a=t.length-1,n=this.parts,[l,d]=Q(t,e);if(this.el=J.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=K.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(C)){const e=d[s++],i=r.getAttribute(t).split(U),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?rt:"?"===a[1]?ot:"@"===a[1]?st:it}),r.removeAttribute(t)}else t.startsWith(U)&&(n.push({type:6,index:o}),r.removeAttribute(t));if(R.test(r.tagName)){const t=r.textContent.split(U),e=t.length-1;if(e>0){r.textContent=M?M.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],A()),K.nextNode(),n.push({type:2,index:++o});r.append(t[e],A())}}}else if(8===r.nodeType)if(r.data===G)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(U,t+1));)n.push({type:7,index:o}),t+=U.length-1}o++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,r){if(e===W)return e;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const s=O(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,r)),e}let tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??N).importNode(e,!0);K.currentNode=r;let o=K.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new et(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new at(o,this,t)),this._$AV.push(e),n=i[++a]}s!==n?.index&&(o=K.nextNode(),s++)}return K.currentNode=N,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}};class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>E(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new J(t)),e}k(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new et(this.O(A()),this.O(A()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=X(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==W,s&&(this._$AH=t);else{const r=t;let a,n;for(t=o[0],a=0;a<o.length-1;a++)n=X(this,r[i+a],e,a),n===W&&(n=this._$AH[a]),s||=!O(n)||n!==this._$AH[a],n===F?t=F:t!==F&&(t+=(n??"")+o[a+1]),this._$AH[a]=n}s&&!r&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends it{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===W)return;const i=this._$AH,r=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=v.litHtmlPolyfillSupport;nt?.(J,et),(v.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dt=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=i?.renderBefore??null;r._$litPart$=o=new et(e.insertBefore(A(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:w},ft=(t=pt,e,i)=>{const{kind:r,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,o,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const o=this[r];e.call(this,i),this.requestUpdate(r,o,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?ft(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function yt(t,e){return(e,i,r)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const _t=[{key:"temperature",label:"Temperature",icon:"thermometer-celsius",unit:{metric:"°C",imperial:"°F"}},{key:"feels_like",label:"Feels Like",icon:"thermometer-glass-celsius",unit:{metric:"°C",imperial:"°F"}},{key:"humidity",label:"Humidity",icon:"humidity",unit:{metric:"%",imperial:"%"}},{key:"dew_point",label:"Dew Point",icon:"thermometer-mercury-cold",unit:{metric:"°C",imperial:"°F"}},{key:"uv_index",label:"UV Index",icon:"uv-index",unit:{metric:"",imperial:""}},{key:"wind_speed",label:"Wind Speed",icon:"wind-beaufort-0",unit:{metric:"km/h",imperial:"mph"}},{key:"wind_gust",label:"Wind Gust",icon:"windsock",unit:{metric:"km/h",imperial:"mph"}},{key:"rain_rate",label:"Rain Rate",icon:"raindrop",unit:{metric:"mm/h",imperial:"in/h"}},{key:"daily_rain",label:"Daily Rain",icon:"raindrops",unit:{metric:"mm",imperial:"in"}},{key:"pressure",label:"Pressure",icon:"pressure-low",unit:{metric:"hPa",imperial:"inHg"}},{key:"visibility",label:"Visibility",icon:"mist",unit:{metric:"km",imperial:"mi"}},{key:"solar_radiation",label:"Solar Rad.",icon:"solar-eclipse",unit:{metric:"W/m²",imperial:"W/m²"}},{key:"wind_chill",label:"Wind Chill",icon:"thermometer-colder",unit:{metric:"°C",imperial:"°F"}},{key:"heat_index",label:"Heat Index",icon:"thermometer-warmer",unit:{metric:"°C",imperial:"°F"}},{key:"soil_temp",label:"Soil Temp",icon:"thermometer-mercury",unit:{metric:"°C",imperial:"°F"}}],gt=[{max:1,label:"Calm"},{max:5,label:"Light Air"},{max:11,label:"Light Breeze"},{max:19,label:"Gentle Breeze"},{max:28,label:"Moderate Breeze"},{max:38,label:"Fresh Breeze"},{max:49,label:"Strong Breeze"},{max:61,label:"Near Gale"},{max:74,label:"Gale"},{max:88,label:"Strong Gale"},{max:102,label:"Storm"},{max:117,label:"Violent Storm"},{max:1/0,label:"Hurricane"}],kt={"clear-day":"Clear","clear-night":"Clear Night",sunrise:"Sunrise",sunset:"Sunset","starry-night":"Starry Night","partly-cloudy-day":"Partly Cloudy","partly-cloudy-night":"Partly Cloudy",cloudy:"Cloudy","overcast-day":"Overcast","overcast-night":"Overcast","fog-day":"Fog","fog-night":"Fog",rain:"Rain","partly-cloudy-day-drizzle":"Drizzle","partly-cloudy-night-drizzle":"Drizzle","partly-cloudy-day-rain":"Light Rain","partly-cloudy-night-rain":"Light Rain","thunderstorms-day":"Thunderstorm","thunderstorms-night":"Thunderstorm","thunderstorms-day-rain":"Thunderstorm","thunderstorms-night-rain":"Thunderstorm","thunderstorms-rain":"Heavy Storm","haze-day":"Haze","haze-night":"Haze","partly-cloudy-day-haze":"Hazy","partly-cloudy-night-haze":"Hazy","partly-cloudy-day-smoke":"Smoky","partly-cloudy-night-smoke":"Smoky",moonrise:"Moonrise",moonset:"Moonset",wind:"Windy"},wt=["clear-night","starry-night","partly-cloudy-night","moonrise","moonset"],xt=["clear-night","starry-night","moonrise","moonset"],bt=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],vt=["N","NE","E","SE","S","SW","W","NW"],$t={N:0,NE:45,E:90,SE:135,S:180,SW:225,W:270,NW:315},Mt=[{max:15,label:"Excellent",color:"#2196F3",stroke:"#fff"},{max:30,label:"Good",color:"#4CAF50",stroke:"#fff"},{max:50,label:"Moderate",color:"#FFEB3B",stroke:"#333"},{max:75,label:"Unhealthy",color:"#FF9800",stroke:"#333"},{max:100,label:"Very Bad",color:"#F44336",stroke:"#fff"},{max:200,label:"Hazardous",color:"#9C27B0",stroke:"#fff"},{max:1/0,label:"Toxic",color:"#1a1a1a",stroke:"#fff"}],zt=a`
  :host {
    display: block;
    --wdb-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
    --wdb-panel-bg: rgba(255,255,255,0.08);
    --wdb-panel-border: rgba(255,255,255,0.1);
    --wdb-text: #fff;
    --wdb-text-muted: rgba(255,255,255,0.75);
    --wdb-stat-bg: rgba(100,149,237,0.18);
    --wdb-stat-border: rgba(255,255,255,0.08);
  }

  ha-card {
    background: var(--ha-card-background,
      linear-gradient(180deg, #1a3a5c 0%, #1e4d6e 50%, #1a3a5c 100%)
    );
    color: var(--primary-text-color, var(--wdb-text));
    font-family: var(--wdb-font);
    border-radius: var(--ha-card-border-radius, 16px);
    overflow: hidden;
    padding-bottom: 2px;
    box-shadow: var(--ha-card-box-shadow, 0 8px 32px rgba(0,0,0,0.4));
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16px 24px 8px;
    flex-wrap: wrap;
    gap: 4px 16px;
  }

  .header-left {
    display: flex;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
  }

  .header-title {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .header-location {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .header-date {
    font-size: 0.85rem;
    opacity: 0.75;
  }

  .main-panels {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 12px;
    padding: 8px 16px;
  }

  .panel {
    background: var(--wdb-panel-bg);
    border-radius: 12px;
    border: 1px solid var(--wdb-panel-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .scene-panel {
    position: relative;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px 0;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .stats-section {
    padding: 8px 16px 16px;
  }

  .stats-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    opacity: 0.7;
    padding: 4px 0 8px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .wind-panel {
    padding: 0 16px 12px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .wind-instruments {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
    align-items: start;
  }

  .wind-instrument {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wind-instrument.clickable {
    cursor: pointer;
  }

  .wind-instrument.clickable:active {
    transform: scale(0.97);
  }

  .wind-sublabel {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.7;
    text-align: center;
    margin-bottom: 4px;
  }

  .wind-svg-container {
    width: 100%;
    max-width: 170px;
    aspect-ratio: 1;
  }

  .gauge-svg-container {
    width: 100%;
    max-width: 210px;
  }

  .wind-value {
    text-align: center;
    margin-top: auto;
  }

  .wind-value-primary {
    font-size: 1.2rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .wind-value-secondary {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  /* Narrow (mobile < 500px) */
  :host([narrow]) .main-panels {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  :host([narrow]) .header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px 16px 6px;
    gap: 0;
  }

  :host([narrow]) .header-left {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  :host([narrow]) .header-location {
    order: -1;
    font-size: 0.9rem;
  }

  :host([narrow]) .header-title {
    font-size: 1.4rem;
  }

  :host([narrow]) .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  :host([narrow]) .wind-svg-container,
  :host([narrow]) .gauge-svg-container {
    max-width: 160px;
  }

  :host([narrow]) .wind-value-primary {
    font-size: 1rem;
  }

  /* Wide (desktop >= 768px): 5-column stats */
  :host([wide]) .stats-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
`,Ct=[{role:"feels_like",match:t=>"temperature"===t.device_class&&(/feels.?like/i.test(t.friendly_name??"")||/feelslike/i.test(t.entity_id))},{role:"wind_chill",match:t=>"temperature"===t.device_class&&(/wind.?chill/i.test(t.friendly_name??"")||/windchill/i.test(t.entity_id))},{role:"heat_index",match:t=>"temperature"===t.device_class&&(/heat.?index/i.test(t.friendly_name??"")||/heatindex/i.test(t.entity_id))},{role:"dew_point",match:t=>"temperature"===t.device_class&&(/dew.?p/i.test(t.friendly_name??"")||/dewpt/i.test(t.entity_id))},{role:"soil_temp",match:t=>"temperature"===t.device_class&&(/soil/i.test(t.friendly_name??"")||/soiltemp\d*f?$/i.test(t.entity_id))},{role:"temperature",match:t=>"temperature"===t.device_class&&!/indoor/i.test(t.friendly_name??"")&&!/indoor/i.test(t.entity_id)&&(/temperature/i.test(t.friendly_name??"")||/_tempf$/i.test(t.entity_id))},{role:"humidity",match:t=>"humidity"===t.device_class&&!/indoor/i.test(t.friendly_name??"")&&!/indoor/i.test(t.entity_id)},{role:"wind_gust",match:t=>"wind_speed"===t.device_class&&(/gust/i.test(t.friendly_name??"")||/windgust/i.test(t.entity_id))},{role:"wind_speed",match:t=>"wind_speed"===t.device_class&&!/gust/i.test(t.friendly_name??"")&&!/gust/i.test(t.entity_id)},{role:"wind_bearing",match:t=>("wind_direction"===t.device_class||/winddir$/i.test(t.entity_id))&&!/gust/i.test(t.entity_id)},{role:"rain_rate",match:t=>"precipitation_intensity"===t.device_class||/_rainin$/i.test(t.entity_id)},{role:"daily_rain",match:t=>"precipitation"===t.device_class&&/daily/i.test(t.friendly_name??"")||/dailyrainin$/i.test(t.entity_id)},{role:"pressure",match:t=>"atmospheric_pressure"===t.device_class&&!/abs/i.test(t.friendly_name??"")&&!/abs/i.test(t.entity_id)},{role:"uv_index",match:t=>/uv/i.test(t.entity_id)&&!/indoor/i.test(t.entity_id)},{role:"solar_radiation",match:t=>"irradiance"===t.device_class||/solarradiation/i.test(t.entity_id)},{role:"visibility",match:t=>/visibility/i.test(t.entity_id)},{role:"aqi",match:t=>"pm25"===t.device_class||/pm2[._]?5/i.test(t.entity_id)||/aqi.*pm/i.test(t.entity_id)}];function Ut(t,e){let i={};if(e.device_id&&(i=function(t,e){const i={},r=new Set,o=[],s=t.entities;if(s)for(const[i,r]of Object.entries(s))if(r.device_id===e&&i.startsWith("sensor.")){const e=t.states[i];e&&o.push({entity_id:i,device_class:e.attributes.device_class,friendly_name:e.attributes.friendly_name})}if(0===o.length){const i=`sensor.wu_${e.toLowerCase()}_`;for(const e of Object.keys(t.states))if(e.startsWith(i)){const i=t.states[e];o.push({entity_id:e,device_class:i.attributes.device_class,friendly_name:i.attributes.friendly_name})}}for(const t of Ct)if(!i[t.role])for(const e of o)if(!r.has(e.entity_id)&&t.match(e)){i[t.role]=e.entity_id,r.add(e.entity_id);break}return i}(t,e.device_id)),e.sensors)for(const[t,r]of Object.entries(e.sensors))r&&(i[t]=r);return i}function Gt(t){return null!=t&&"unavailable"!==t&&"unknown"!==t}function St(t){const e=t.s??t.state;if(null==e)return null;const i=t.lu?1e3*t.lu:t.last_updated?new Date(t.last_updated).getTime():0;return i?{state:e,time:i}:null}function Nt(t){const e=St(t);if(!e)return null;if(!Gt(e.state))return null;const i=parseFloat(e.state);return isFinite(i)?{value:i,time:e.time}:null}function At(t,e=!1){const i=new Date(t),r=i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1});if(e){const t=new Date;if(i.getDate()!==t.getDate()||i.getMonth()!==t.getMonth())return`Y ${r}`}return r}function Ot(t,e){switch(e){case"mph":return 1.60934*t;case"m/s":return 3.6*t;case"ft/s":return 1.09728*t;case"kn":case"kt":return 1.852*t;default:return t}}function Et(t){if(!t)return 0;switch(t.toLowerCase().replace(/[_\s]/g,"")){case"newmoon":default:return 0;case"waxingcrescent":case"waningcrescent":return.15;case"firstquarter":case"lastquarter":case"thirdquarter":return.5;case"waxinggibbous":case"waninggibbous":return.75;case"fullmoon":return 1}}function Ht(t){if(t<=0)return 0;const e=t*Math.PI/180,i=Math.sin(e),r=1/(i+.50572*Math.pow(t+6.07995,-1.6364)),o=1361*Math.pow(.7,Math.pow(r,.678));return o*i+.12*o*i}function Tt(t){const e=function(t){const{sensors:e,isNight:i,sunElevation:r,haCondition:o,timestamp:s}=t,a=t.speedUnit||"km/h",n=t.rainUnit||"mm/h",{rain_rate:l,wind_speed:d,humidity:c,dew_point:h,temperature:p,solar_radiation:f}=e,u=o?function(t,e){switch(t){case"sunny":case"clear-night":case"exceptional":default:return e?"clear-night":"clear-day";case"partlycloudy":return e?"partly-cloudy-night":"partly-cloudy-day";case"cloudy":case"snowy":return"cloudy";case"rainy":case"pouring":return"rain";case"lightning":return e?"thunderstorms-night":"thunderstorms-day";case"lightning-rainy":return e?"thunderstorms-night-rain":"thunderstorms-day-rain";case"fog":return e?"fog-night":"fog-day";case"windy":case"windy-variant":return"wind";case"hail":return"thunderstorms-rain"}}(o,i):null,m=void 0!==d?Ot(d,a):void 0,y=void 0!==l&&l>0?(_=l,g=n,g.toLowerCase().replace(/\s/g,"").includes("in")?25.4*_:_):0;var _,g;if(y>=20)return"thunderstorms-rain";if(y>=10)return i?"thunderstorms-night-rain":"thunderstorms-day-rain";if(u){if(("thunderstorms-day"===u||"thunderstorms-night"===u||"thunderstorms-rain"===u||"thunderstorms-day-rain"===u||"thunderstorms-night-rain"===u)&&y<2.5)return u}if(y>=2.5)return"rain";if(y>=1)return i?"partly-cloudy-night-rain":"partly-cloudy-day-rain";if(y>=.1)return i?"partly-cloudy-night-drizzle":"partly-cloudy-day-drizzle";if(u&&void 0===l){if("rain"===u||"partly-cloudy-day-rain"===u||"partly-cloudy-night-rain"===u)return u}if(void 0!==c&&void 0!==p&&void 0!==h){const t=p-h;if(c>=97&&t<=1)return i?"fog-night":"fog-day";if(c>=95&&t<=1.5)return i?"fog-night":"fog-day"}else if("fog-day"===u||"fog-night"===u)return u;if(void 0!==m&&m>=50)return"wind";if("wind"===u&&void 0===d)return"wind";if(!i&&r>3&&void 0!==f){const t=Ht(r);if(t>20){const e=f/t;return Bt(e<.2?"overcast-day":e<.5?"cloudy":e<.75?"partly-cloudy-day":"clear-day",r,s)}}if(!i){if(!(void 0!==f&&r>3&&Ht(r)>20)){if(void 0!==c){if(c>=90)return Bt("cloudy",r,s);if(c>=80)return Bt("partly-cloudy-day",r,s)}return Bt("cloudy"===u||"partly-cloudy-day"===u?u:"clear-day",r,s)}}if(i){if(void 0!==c){if(c>=92)return Bt("overcast-night",r,s);if(c>=70)return Bt("partly-cloudy-night",r,s);if(c<70)return Bt("starry-night",r,s)}if("partly-cloudy-night"===u||"cloudy"===u){return Bt("cloudy"===u?"overcast-night":u,r,s)}return Bt("clear-night",r,s)}return Bt(i?"clear-night":"clear-day",r,s)}(t);return function(t,e,i,r,o,s){if(!e||void 0===i||i>=-6)return t;if(void 0===o||void 0===s)return t;if("clear-night"!==t&&"starry-night"!==t)return t;const a={new_moon:0,waxing_crescent:3,first_quarter:6,waxing_gibbous:9,full_moon:12,waning_gibbous:15,last_quarter:18,waning_crescent:21}[e];if(void 0===a)return t;if("new_moon"===e)return t;const n=r?new Date(r):new Date,l=n.getUTCHours()+n.getUTCMinutes()/60;let d=l-(12-s/15+a)%24;d>12&&(d-=24);d<-12&&(d+=24);const c=Math.abs(d);if(c>=5&&c<=7)return d<0?"moonrise":"moonset";return t}(function(t,e){if(void 0===e)return t;if(e>75)switch(t){case"clear-day":case"partly-cloudy-day":return"partly-cloudy-day-smoke";case"clear-night":case"starry-night":case"partly-cloudy-night":return"partly-cloudy-night-smoke";default:return t}if(e>35)switch(t){case"clear-day":return"haze-day";case"clear-night":case"starry-night":return"haze-night";case"partly-cloudy-day":return"partly-cloudy-day-haze";case"partly-cloudy-night":return"partly-cloudy-night-haze";default:return t}return t}(e,t.aqiPm25),t.moonPhase,t.sunElevation,t.timestamp,t.latitude,t.longitude)}function Bt(t,e,i){if(e<-6||e>4)return t;if(!("clear-night"===t||"clear-day"===t||"partly-cloudy-day"===t||"partly-cloudy-night"===t))return t;return(i?new Date(i).getHours():(new Date).getHours())<12?"sunrise":"sunset"}function Dt(t,e="sensor.moon_phase"){const i=t.states[e];return i?.state}const Pt=[{elevation:-18,zenith:[10,10,30],mid:[12,12,35],horizon:[15,15,40]},{elevation:-12,zenith:[15,20,55],mid:[20,22,58],horizon:[25,25,60]},{elevation:-6,zenith:[25,40,90],mid:[50,45,85],horizon:[60,50,80]},{elevation:-1,zenith:[40,60,120],mid:[140,80,90],horizon:[180,100,60]},{elevation:0,zenith:[60,90,160],mid:[200,120,70],horizon:[220,130,60]},{elevation:5,zenith:[80,130,200],mid:[170,155,130],horizon:[200,170,120]},{elevation:10,zenith:[90,150,220],mid:[150,180,215],horizon:[185,200,218]},{elevation:20,zenith:[70,140,220],mid:[125,175,222],horizon:[175,200,225]},{elevation:45,zenith:[50,120,210],mid:[100,155,218],horizon:[165,195,225]},{elevation:90,zenith:[40,100,200],mid:[90,145,212],horizon:[160,190,222]}],It={clear:null,"thin-ice-veil":{day:[200,215,235],night:[28,26,38]},"thin-haze":{day:[185,200,220],night:[35,32,35]},"moderate-ice":{day:[170,185,210],night:[42,38,35]},"moderate-overcast":{day:[145,160,180],night:[50,44,38]},"thick-overcast":{day:[120,125,135],night:[55,48,40]},"deep-overcast":{day:[90,95,105],night:[48,42,38]},storm:{day:[55,60,70],night:[30,28,30]}},jt={clear:[.9,1],"thin-ice-veil":[.75,.9],"thin-haze":[.75,.9],"moderate-ice":[.5,.75],"moderate-overcast":[.5,.75],"thick-overcast":[.25,.5],"deep-overcast":[.1,.25],storm:[0,.1]},Rt={clear:0,"thin-ice-veil":1,"thin-haze":2,"moderate-ice":3,"moderate-overcast":4,"thick-overcast":5,"deep-overcast":6,storm:7};function qt(t,e,i){const r=Math.max(0,Math.min(1,i));return[Math.round(t[0]+(e[0]-t[0])*r),Math.round(t[1]+(e[1]-t[1])*r),Math.round(t[2]+(e[2]-t[2])*r)]}function Lt(t,e,i){return Math.max(e,Math.min(i,t))}function Vt(t,e,i){if(i<=3||e<=0)return 1;const r=function(t){if(t<=0)return 0;const e=t*Math.PI/180;return 12.5*Math.sin(e)*.85}(i);if(r<=.5)return 1;const o=Lt(t/r,0,1.5);return e<.05?o>.1?1.3:1:Lt(o/e,.5,2)}function Wt(t,e,i,r){const o=It[e];if(!o)return t;const s=r?o.night:o.day,[a,n]=jt[e],l=n-a,d=.75*(l>0?1-(Lt(i,a,n)-a)/l:.5);return{zenith:qt(t.zenith,s,d),mid:qt(t.mid,s,d),horizon:qt(t.horizon,s,d)}}function Ft(t,e){if(e>=10)return"storm";if(e>=2.5)return"deep-overcast";if(e>=.1)return"thick-overcast";if(void 0!==t){if(t>=95)return"thick-overcast";if(t>=90)return"moderate-overcast";if(t>=80)return"thin-haze";if(t>=70)return"thin-haze"}return"clear"}let Zt="clear",Kt=1,Yt=0;function Qt(t,e){const{sunElevation:i,solarRadiation:r,uvIndex:o,humidity:s,rainRate:a=0,moonIllumination:n=0,isNight:l}=t;let d=function(t){const e=Lt(t,-18,90);let i=Pt[0],r=Pt[Pt.length-1];for(let t=0;t<Pt.length-1;t++)if(e>=Pt[t].elevation&&e<=Pt[t+1].elevation){i=Pt[t],r=Pt[t+1];break}const o=r.elevation-i.elevation,s=o>0?(e-i.elevation)/o:0;return{zenith:qt(i.zenith,r.zenith,s),mid:qt(i.mid,r.mid,s),horizon:qt(i.horizon,r.horizon,s)}}(i),c="clear",h=-1,p=!1;if(l||void 0===r)if(l){const t=(e??Date.now())-Yt>108e5?{cloudState:"moderate-overcast",Kt:.6}:{cloudState:Zt,Kt},i=Ft(s,a);if(c=function(t,e){return Rt[t]>=Rt[e]?t:e}(t.cloudState,i),Rt[i]>=Rt[t.cloudState]){const[t,e]=jt[c];h=(t+e)/2}else h=t.Kt;d=Wt(d,c,h,!0)}else{c=Ft(s,a),p=!0;const[t,e]=jt[c];h=(t+e)/2,d=Wt(d,c,h,!1)}else{if(h=function(t,e){if(e<=0)return-1;const i=Ht(e);return i<=20?-1:Lt(t/i,0,1.2)}(r,i),h>=0){c=function(t,e,i){return t<0||t>.9?"clear":t>.75?e<1.08?"thin-ice-veil":"thin-haze":t>.5?e<1.08?"moderate-ice":"moderate-overcast":t>.25?"thick-overcast":i>=.1?"storm":"deep-overcast"}(h,void 0!==o?Vt(o,h,i):1,a),function(t,e,i){Zt=t,Kt=e,Yt=i??Date.now()}(c,h,e)}else{c=Ft(s,a),p=!0;const[t,e]=jt[c];h=(t+e)/2}d=Wt(d,c,h,!1)}return l||void 0===s||(d=function(t,e,i,r){if(i<0)return t;if(i<=.5)return t;if(r)return t;const o=(2+e/20-2)/8*.3,s=[200,210,225];return{zenith:qt(t.zenith,s,o),mid:qt(t.mid,s,1.1*o),horizon:qt(t.horizon,s,1.3*o)}}(d,s,h,p)),!l&&a>=.1&&"storm"!==c&&"deep-overcast"!==c&&(d=function(t,e){if(e<.1)return t;const i=Math.min(e/20,.4),r=[55,60,70];let o={zenith:qt(t.zenith,r,i),mid:qt(t.mid,r,i),horizon:qt(t.horizon,r,i)};if(e>=10){const t=[40,42,50];o={zenith:qt(o.zenith,t,.2),mid:qt(o.mid,t,.2),horizon:qt(o.horizon,t,.2)}}return o}(d,a)),l&&(d=function(t,e,i){if(e>0&&"clear"===i){const i=.1*e,r=[20,25,65];return{zenith:qt(t.zenith,r,i),mid:qt(t.mid,r,.7*i),horizon:qt(t.horizon,r,.5*i)}}if("clear"!==i&&"thin-ice-veil"!==i){const e=[60,48,35],i=.25;return{zenith:qt(t.zenith,e,.7*i),mid:qt(t.mid,e,i),horizon:qt(t.horizon,e,1.2*i)}}return t}(d,n,c)),d}function Jt(t){return`linear-gradient(180deg, ${`rgb(${t.zenith[0]},${t.zenith[1]},${t.zenith[2]})`} 0%, ${`rgb(${t.mid[0]},${t.mid[1]},${t.mid[2]})`} 55%, ${`rgb(${t.horizon[0]},${t.horizon[1]},${t.horizon[2]})`} 100%)`}const Xt=3e5,te=6e5;function ee(t,e){return Math.sqrt((t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2)}function ie(t){return{zenith:[...t.zenith],mid:[...t.mid],horizon:[...t.horizon]}}function re(t,e){if(0===t.length)return;let i=0,r=t.length-1;if(!(e<t[0].time)){if(e>=t[r].time)return t[r];for(;i<r;){const o=i+r+1>>1;t[o].time<=e?i=o:r=o-1}return t[i]}}function oe(t,e,i){const r=new Date(t),o=Math.floor((r.getTime()-new Date(r.getFullYear(),0,0).getTime())/864e5),s=23.45*Math.sin(2*Math.PI/365*(o-81)),a=15*(r.getUTCHours()+r.getUTCMinutes()/60+i/15-12),n=e*Math.PI/180,l=s*Math.PI/180,d=a*Math.PI/180,c=Math.sin(n)*Math.sin(l)+Math.cos(n)*Math.cos(l)*Math.cos(d);return 180*Math.asin(Math.max(-1,Math.min(1,c)))/Math.PI}async function se(t,e,i,r,o="km/h",s="mm/h"){const a=new Date,n=new Date(a.getTime()-864e5),l=[];if(e.weatherEntity&&l.push(e.weatherEntity),l.push(e.sunEntity),e.moonEntity&&l.push(e.moonEntity),e.temperatureEntity&&l.push(e.temperatureEntity),e.humidityEntity&&l.push(e.humidityEntity),e.solarRadiationEntity&&l.push(e.solarRadiationEntity),e.uvIndexEntity&&l.push(e.uvIndexEntity),e.rainRateEntity&&l.push(e.rainRateEntity),e.windSpeedEntity&&l.push(e.windSpeedEntity),e.dewPointEntity&&l.push(e.dewPointEntity),e.aqiEntity&&l.push(e.aqiEntity),0===l.length)return[];let d;try{d=await t.callWS({type:"history/history_during_period",start_time:n.toISOString(),end_time:a.toISOString(),entity_ids:l,minimal_response:!0,significant_changes_only:!0,no_attributes:!0})}catch(t){return console.warn("[sky-history] Failed to fetch history:",t),[]}const c=[],h=[],p=[],f=[],u=[],m=[],y=[],_=[],g=[],k=[],w=[];if(e.weatherEntity&&d[e.weatherEntity])for(const t of d[e.weatherEntity]){const e=St(t);e&&Gt(e.state)&&c.push(e)}if(d[e.sunEntity])for(const t of d[e.sunEntity]){const e=St(t);e&&h.push({value:0,time:e.time})}if(e.moonEntity&&d[e.moonEntity])for(const t of d[e.moonEntity]){const e=St(t);e&&Gt(e.state)&&p.push(e)}const x=t=>{if(!t||!d[t])return[];const e=[];for(const i of d[t]){const t=Nt(i);t&&e.push(t)}return e};f.push(...x(e.temperatureEntity)),u.push(...x(e.humidityEntity)),m.push(...x(e.solarRadiationEntity)),y.push(...x(e.uvIndexEntity)),_.push(...x(e.rainRateEntity)),g.push(...x(e.windSpeedEntity)),k.push(...x(e.dewPointEntity)),w.push(...x(e.aqiEntity));const b=new Set;for(const t of[c,h,p,f,u,m,y,_,g,k,w])for(const e of t)b.add(e.time);const v=n.getTime(),$=a.getTime();for(let t=v;t<=$;t+=9e5)b.add(t);const M=Array.from(b).sort((t,e)=>t-e);if(0===M.length)return[];const z={cloudState:Zt,Kt,timestamp:Yt},C=[];for(const t of M){const e=re(c,t),a=re(p,t),n=re(f,t),l=re(u,t),d=re(m,t),h=re(y,t),x=re(_,t),b=re(g,t),v=re(k,t),$=re(w,t),M=oe(t,i,r),z=M<0,U=Tt({sensors:{temperature:n?.value,humidity:l?.value,solar_radiation:d?.value,uv_index:h?.value,rain_rate:x?.value,wind_speed:b?.value,dew_point:v?.value},isNight:z,sunElevation:M,speedUnit:o,rainUnit:s,haCondition:e?.state,timestamp:t,aqiPm25:$?.value,moonPhase:a?.state,latitude:i,longitude:r}),G=a?.state,S=Et(G),N=Qt({sunElevation:M,solarRadiation:d?.value,uvIndex:h?.value,humidity:l?.value,rainRate:x?.value,moonIllumination:S,isNight:z},t),A=wt.includes(U),O=M<-6&&!!G&&xt.includes(U);C.push({timestamp:t,condition:U,skyGradient:ie(N),temperature:n?.value,showStars:A,showMoon:O,moonPhase:G})}var U;return Zt=(U=z).cloudState,Kt=U.Kt,Yt=U.timestamp,function(t){if(0===t.length)return[];const e=[t[0]];let i=t[0].condition,r=t[0].timestamp;for(let o=1;o<t.length;o++){const s=t[o];if(s.timestamp-r<Xt)continue;if(s.timestamp,s.condition!==i){if(ae(e,s.condition,s.timestamp))continue;e.push(s),i=s.condition,r=s.timestamp;continue}const a=e[e.length-1];(ee(a.skyGradient.zenith,s.skyGradient.zenith)+ee(a.skyGradient.mid,s.skyGradient.mid)+ee(a.skyGradient.horizon,s.skyGradient.horizon))/3>30&&(e.push(s),i=s.condition,r=s.timestamp)}return e}(C)}function ae(t,e,i){for(let r=t.length-1;r>=0;r--){const o=t[r];if(o.condition===e)return i-o.timestamp<te;if(i-o.timestamp>te)break}return!1}var ne='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_1_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_1_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#91c700" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M45.4 40.1a.5.5 0 01.1.36v7.08a.5.5 0 01-.1.36.46.46 0 01-.35.1h-.89a.46.46 0 01-.35-.1.5.5 0 01-.1-.36v-5.29l-1.07.62a.42.42 0 01-.68-.18l-.38-.69a.45.45 0 01-.07-.35.64.64 0 01.29-.27l2-1.18a1.24 1.24 0 01.64-.18h.63a.46.46 0 01.33.08z"/></svg>',le='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#374151" d="M26.1 24.08a.83.83 0 01.16.56v13.48a.59.59 0 01-.72.71h-1.2a.75.75 0 01-.69-.35l-5.14-7.6a11.62 11.62 0 01-.85-1.5 19.708 19.708 0 01-.87-2.03h-.13s0 .23.12.66.15 1 .23 1.64a18 18 0 01.11 1.88v6.59a.77.77 0 01-.16.56.79.79 0 01-.55.15H15.3a.85.85 0 01-.57-.15.76.76 0 01-.17-.56V24.64a.78.78 0 01.17-.56.85.85 0 01.57-.15h1.19a.81.81 0 01.7.33l5.1 7.56a13 13 0 01.89 1.56c.27.55.48 1 .63 1.41s.23.59.24.6h.13s0-.25-.12-.67-.15-1-.23-1.63a16.11 16.11 0 01-.11-1.94v-6.51a.83.83 0 01.15-.56.82.82 0 01.56-.15h1.11a.82.82 0 01.56.15zM30.47 40a1 1 0 01-.54.12h-1.17c-.24 0-.4-.05-.46-.14a.43.43 0 010-.44l5.58-15a1.16 1.16 0 01.33-.46.94.94 0 01.53-.12H36c.24 0 .39.05.45.14a.5.5 0 010 .44l-5.59 15a1.06 1.06 0 01-.39.46zM48.89 38.83H47.8a2.4 2.4 0 01-.91-.12.78.78 0 01-.39-.51l-1-2.7h-5.76l-1 2.7a.78.78 0 01-.39.51 2.4 2.4 0 01-.91.12h-1q-.73 0-.48-.69l5.25-13.65a1.07 1.07 0 01.33-.47 1 1 0 01.55-.11h1.11a1.06 1.06 0 01.57.11.9.9 0 01.32.45l5.24 13.67q.3.69-.44.69zm-6-11.13c-.09-.43-.14-.76-.17-1v-.36h-.15a7.73 7.73 0 01-.46 2.54l-1.62 4.45h4.31l-1.6-4.43a10 10 0 01-.31-1.2z"/></svg>',de='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_full_a" x1="23.25" x2="40.75" y1="16.84" y2="47.16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="17.5" fill="url(#moon_full_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5"/></svg>';const ce={humidity:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="humidity_a" x1="23.61" x2="37.27" y1="21.85" y2="45.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3392d6"/><stop offset=".45" stop-color="#3392d6"/><stop offset="1" stop-color="#2477b2"/></linearGradient></defs><path fill="url(#humidity_a)" stroke="#2885c7" stroke-miterlimit="10" stroke-width=".5" d="M32 17c-6.09 9-10 14.62-10 20.09a10 10 0 0020 0C42 31.62 38.09 26 32 17z"/><path fill="#fff" d="M26.24 30.19a3 3 0 012.12-.69 3 3 0 012.12.69 2.51 2.51 0 01.74 1.92v1.24a2.48 2.48 0 01-.74 1.9 3.05 3.05 0 01-2.12.68 3 3 0 01-2.12-.68 2.48 2.48 0 01-.74-1.9v-1.24a2.51 2.51 0 01.74-1.92zm11-.23a.42.42 0 01-.08.4L29 41.69a1.37 1.37 0 01-.44.44 1.87 1.87 0 01-.72.09h-.67c-.2 0-.33-.06-.38-.18s0-.25.09-.42l8.2-11.35a1 1 0 01.41-.41 2 2 0 01.67-.08h.76q.27 0 .34.22zm-8.9 1.17c-.79 0-1.19.36-1.19 1.07v1c0 .71.4 1.07 1.19 1.07s1.19-.36 1.19-1.07v-1c.02-.71-.38-1.07-1.17-1.07zm5.16 5.63a3 3 0 012.12-.69 3 3 0 012.12.69 2.51 2.51 0 01.74 1.92v1.24a2.48 2.48 0 01-.74 1.9 3 3 0 01-2.12.68 3.05 3.05 0 01-2.12-.68 2.48 2.48 0 01-.74-1.9v-1.24a2.51 2.51 0 01.76-1.92zm2.12.94c-.79 0-1.19.35-1.19 1.07v1c0 .73.4 1.09 1.19 1.09s1.19-.36 1.19-1.09v-1c.02-.72-.38-1.07-1.17-1.07z"/></svg>',mist:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="mist_a" x1="27.5" x2="36.5" y1="17.21" y2="32.79" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="mist_b" y1="24.21" y2="39.79" xlink:href="#mist_a"/><linearGradient id="mist_c" y1="31.21" y2="46.79" xlink:href="#mist_a"/></defs><path fill="none" stroke="url(#mist_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 25h30"><animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path><path fill="none" stroke="url(#mist_b)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 32h30"><animateTransform attributeName="transform" begin="-2s" dur="5s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path><path fill="none" stroke="url(#mist_c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 39h30"><animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path></svg>',"pressure-high":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32 44V20l-5.79 6.89L32 20l5.78 6.89"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 -9; 0 -9"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>',"pressure-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="none" stroke="#2885c7" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32 20v24l-5.79-6.89L32 44l5.78-6.89"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 9; 0 9"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>',raindrop:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="raindrop_a" x1="23.61" x2="37.27" y1="21.85" y2="45.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3392d6"/><stop offset=".45" stop-color="#3392d6"/><stop offset="1" stop-color="#2477b2"/></linearGradient></defs><path fill="url(#raindrop_a)" stroke="#2885c7" stroke-miterlimit="10" stroke-width=".5" d="M32 17c-6.09 9-10 14.62-10 20.09a10 10 0 0020 0C42 31.62 38.09 26 32 17z"><animateTransform attributeName="transform" calcMode="spline" dur="5s" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" repeatCount="indefinite" type="scale" values="1 1; 1 .9; 1 1"/></path></svg>',raindrops:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="raindrops_a" x1="17.61" x2="31.27" y1="21.85" y2="45.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3392d6"/><stop offset=".45" stop-color="#3392d6"/><stop offset="1" stop-color="#2477b2"/></linearGradient><linearGradient id="raindrops_b" x1="29.61" x2="43.27" y1="21.85" y2="45.52" xlink:href="#raindrops_a"/></defs><path fill="url(#raindrops_a)" stroke="#2885c7" stroke-miterlimit="10" stroke-width=".5" d="M26 17c-6.09 9-10 14.62-10 20.09a10 10 0 0020 0C36 31.62 32.09 26 26 17z"><animateTransform attributeName="transform" calcMode="spline" dur="5s" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" repeatCount="indefinite" type="scale" values="1 1; 1 .9; 1 1"/></path><path fill="url(#raindrops_b)" stroke="#2885c7" stroke-miterlimit="10" stroke-width=".5" d="M38 17c-6.09 9-10 14.62-10 20.09a10 10 0 0020 0C48 31.62 44.09 26 38 17z"><animateTransform attributeName="transform" begin="-3s" calcMode="spline" dur="5s" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" repeatCount="indefinite" type="scale" values="1 1; 1 .9; 1 1"/></path></svg>',"solar-eclipse":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="solar_eclipse_b" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="solar_eclipse_c" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><clipPath id="solar_eclipse_a"><path fill="none" d="M29 16V7h28v30h-9l-9-1-10-10V16z"/></clipPath></defs><g stroke-miterlimit="10" clip-path="url(#solar_eclipse_a)"><circle cx="32" cy="32" r="10.5" fill="url(#solar_eclipse_b)" stroke="#f8af18" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path></g><path fill="url(#solar_eclipse_c)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"/></svg>',"thermometer-celsius":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_celsius_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_celsius_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 27v15"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#thermometer_celsius_a)" stroke="url(#thermometer_celsius_b)" stroke-linecap="round" stroke-linejoin="round" d="M39 41.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36m-3.5 8H36"/><path fill="#374151" d="M42.44 35a2 2 0 11.56-1.47 2 2 0 01-.56 1.47zm-2-.79a.89.89 0 001.26 0 .88.88 0 000-1.25.83.83 0 00-.63-.27.86.86 0 00-.63.27.89.89 0 00-.26.63.85.85 0 00.21.57zM45 32.29a3.68 3.68 0 012.61-.85c1.75 0 2.87.68 3.35 2.06a.37.37 0 01-.26.54l-.67.23a.46.46 0 01-.34 0 .49.49 0 01-.19-.28 1.79 1.79 0 00-1.89-1.13 2.13 2.13 0 00-1.46.45 1.61 1.61 0 00-.52 1.3v2.73a1.62 1.62 0 00.52 1.3 2.08 2.08 0 001.46.46 1.78 1.78 0 001.88-1.1.53.53 0 01.21-.29.5.5 0 01.33 0l.66.24a.38.38 0 01.28.54c-.49 1.38-1.61 2.07-3.37 2.07a3.68 3.68 0 01-2.6-.85 3.09 3.09 0 01-.92-2.37v-2.7a3.07 3.07 0 01.92-2.35z"/></svg>',"thermometer-colder":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_colder_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_colder_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 33v9"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#thermometer_colder_a)" stroke="url(#thermometer_colder_b)" stroke-linecap="round" stroke-linejoin="round" d="M32.5 29H36m3 12.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36"/><path fill="none" stroke="#2885c7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M44 26v12l-3-3.45L44 38l3-3.45"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 6; 0 6"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>',"thermometer-fahrenheit":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_fahrenheit_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_fahrenheit_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 27v15"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#thermometer_fahrenheit_a)" stroke="url(#thermometer_fahrenheit_b)" stroke-linecap="round" stroke-linejoin="round" d="M39 41.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36m-3.5 8H36"/><path fill="#374151" d="M42.72 34.92a2.18 2.18 0 11-1.53-3.72 2.17 2.17 0 011.53 3.72zm-2.21-.86a.91.91 0 00.68.28.93.93 0 00.68-.28.89.89 0 00.28-.67.93.93 0 00-.28-.68.87.87 0 00-.68-.29.89.89 0 00-.68.29.93.93 0 00-.28.68.89.89 0 00.28.67zM50.89 31.41a.47.47 0 01.11.35v.66a.46.46 0 01-.11.35.5.5 0 01-.36.1h-4.09v2.46h3.44a.55.55 0 01.36.1.5.5 0 01.11.36v.65a.5.5 0 01-.11.36.51.51 0 01-.36.1h-3.44v3.44a.38.38 0 01-.45.46h-.76a.55.55 0 01-.36-.1.46.46 0 01-.11-.36v-8.58a.43.43 0 01.11-.35.5.5 0 01.36-.1h5.3a.5.5 0 01.36.1z"/></svg>',"thermometer-glass-celsius":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_glass_celsius_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_glass_celsius_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><path fill="url(#thermometer_glass_celsius_a)" stroke="url(#thermometer_glass_celsius_b)" stroke-linecap="round" stroke-linejoin="round" d="M39 41.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36m-3.5 8H36"/><path fill="#374151" d="M42.44 35a2 2 0 11.56-1.47 2 2 0 01-.56 1.47zm-2-.79a.89.89 0 001.26 0 .88.88 0 000-1.25.83.83 0 00-.63-.27.86.86 0 00-.63.27.89.89 0 00-.26.63.85.85 0 00.21.57zM45 32.29a3.68 3.68 0 012.61-.85c1.75 0 2.87.68 3.35 2.06a.37.37 0 01-.26.54l-.67.23a.46.46 0 01-.34 0 .49.49 0 01-.19-.28 1.79 1.79 0 00-1.89-1.13 2.13 2.13 0 00-1.46.45 1.61 1.61 0 00-.52 1.3v2.73a1.62 1.62 0 00.52 1.3 2.08 2.08 0 001.46.46 1.78 1.78 0 001.88-1.1.53.53 0 01.21-.29.5.5 0 01.33 0l.66.24a.38.38 0 01.28.54c-.49 1.38-1.61 2.07-3.37 2.07a3.68 3.68 0 01-2.6-.85 3.09 3.09 0 01-.92-2.37v-2.7a3.07 3.07 0 01.92-2.35z"/></svg>',"thermometer-glass-fahrenheit":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_glass_fahrenheit_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_glass_fahrenheit_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><path fill="url(#thermometer_glass_fahrenheit_a)" stroke="url(#thermometer_glass_fahrenheit_b)" stroke-linecap="round" stroke-linejoin="round" d="M39 41.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36m-3.5 8H36"/><path fill="#374151" d="M42.72 34.92a2.18 2.18 0 11-1.53-3.72 2.17 2.17 0 011.53 3.72zm-2.21-.86a.91.91 0 00.68.28.93.93 0 00.68-.28.89.89 0 00.28-.67.93.93 0 00-.28-.68.87.87 0 00-.68-.29.89.89 0 00-.68.29.93.93 0 00-.28.68.89.89 0 00.28.67zM50.89 31.41a.47.47 0 01.11.35v.66a.46.46 0 01-.11.35.5.5 0 01-.36.1h-4.09v2.46h3.44a.55.55 0 01.36.1.5.5 0 01.11.36v.65a.5.5 0 01-.11.36.51.51 0 01-.36.1h-3.44v3.44a.38.38 0 01-.45.46h-.76a.55.55 0 01-.36-.1.46.46 0 01-.11-.36v-8.58a.43.43 0 01.11-.35.5.5 0 01.36-.1h5.3a.5.5 0 01.36.1z"/></svg>',"thermometer-mercury":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 27v15"/></svg>',"thermometer-mercury-cold":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="42" r="4.5" fill="#2885c7"/><path fill="none" stroke="#2885c7" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 27v15"/></svg>',"thermometer-warmer":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thermometer_warmer_a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="thermometer_warmer_b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 19v23"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#thermometer_warmer_a)" stroke="url(#thermometer_warmer_b)" stroke-linecap="round" stroke-linejoin="round" d="M32.5 29H36m3 12.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M44 38V26l-3 3.45L44 26l3 3.45"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 -6; 0 -6"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>',windsock:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="windsock_b" x1="11.25" x2="25.75" y1="19.45" y2="44.55" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="windsock_a" x1="22.43" x2="28.34" y1="17.8" y2="28.04" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f87171"/><stop offset=".45" stop-color="#f87171"/><stop offset="1" stop-color="#dc2626"/></linearGradient><linearGradient id="windsock_c" x1="31.57" x2="36.49" y1="18.65" y2="27.19" xlink:href="#windsock_a"/><linearGradient id="windsock_d" x1="40.71" x2="44.65" y1="19.5" y2="26.34" xlink:href="#windsock_a"/></defs><path fill="none" stroke="url(#windsock_b)" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M18.5 47V17"/><g><path fill="url(#windsock_a)" stroke="#ef4444" stroke-miterlimit="10" stroke-width=".5" d="M23.93 17.13l3.59.53a.79.79 0 01.68.79v9.21a.8.8 0 01-.68.79l-3.59.55a.8.8 0 01-.92-.79V17.92a.81.81 0 01.92-.79z"/><animateTransform attributeName="transform" begin="0s" dur="1s" repeatCount="indefinite" type="translate" values="-0.1 1; 0 0; -0.1 -1; 0 0; -0.1 1"/></g><g><path fill="url(#windsock_c)" stroke="#ef4444" stroke-miterlimit="10" stroke-width=".5" d="M32.58 18.27l3.59.52a.8.8 0 01.68.79v6.94a.8.8 0 01-.68.79l-3.59.53a.8.8 0 01-.92-.79v-8a.8.8 0 01.92-.78z"/><animateTransform attributeName="transform" begin="-0.1s" dur="1s" repeatCount="indefinite" type="translate" values="-0.1 1; 0 0; -0.1 -1; 0 0; -0.1 1"/></g><g><path fill="url(#windsock_d)" stroke="#ef4444" stroke-miterlimit="10" stroke-width=".5" d="M41.22 19.4l3.6.53a.79.79 0 01.68.79v4.67a.8.8 0 01-.68.79l-3.6.52a.79.79 0 01-.91-.79v-5.72a.8.8 0 01.91-.79z"/><animateTransform attributeName="transform" begin="-0.2s" dur="1s" repeatCount="indefinite" type="translate" values="-0.1 1; 0 0; -0.1 -1; 0 0; -0.1 1"/></g></svg>',"wind-beaufort-0":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_0_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_0_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_0_a"/></defs><path fill="none" stroke="url(#wind_beaufort_0_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"/><path fill="none" stroke="url(#wind_beaufort_0_b)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"/><path fill="#374151" d="M46.08 35.46a4.08 4.08 0 012.92-1 4.08 4.08 0 012.92 1 3.44 3.44 0 011 2.64V42a3.49 3.49 0 01-1 2.66 4.12 4.12 0 01-2.92 1 4.12 4.12 0 01-2.92-1A3.46 3.46 0 0145 42v-3.9a3.41 3.41 0 011.08-2.64zm4.46 1.26a2.66 2.66 0 00-3.08 0 1.78 1.78 0 00-.54 1.38V42a1.78 1.78 0 00.54 1.38 2.67 2.67 0 003.08 0 1.78 1.78 0 00.54-1.38v-3.9a1.78 1.78 0 00-.54-1.38z"/></svg>',"wind-beaufort-1":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_1_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_1_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_1_a"/></defs><path fill="none" stroke="url(#wind_beaufort_1_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2.1s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_1_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.525s" dur="2.1s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M51 34.82a.52.52 0 01.11.39v9.64a.51.51 0 01-.11.39.52.52 0 01-.4.12h-.85a.43.43 0 01-.51-.51V37l-2.1 1.17a.62.62 0 01-.46.12.57.57 0 01-.3-.31l-.38-.69a.58.58 0 01-.07-.4.67.67 0 01.31-.29l2.93-1.68a1.34 1.34 0 01.72-.21h.71a.52.52 0 01.4.11z"/></svg>',"wind-beaufort-2":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_2_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_2_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_2_a"/></defs><path fill="none" stroke="url(#wind_beaufort_2_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_2_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.5s" dur="2s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M49.21 34.48a3.64 3.64 0 012.65 1 3.23 3.23 0 011 2.37 3.29 3.29 0 01-.9 2.48 10.49 10.49 0 01-3.28 1.82l-.22.08-.23.09-.22.09a.92.92 0 00-.23.12l-.19.11a1 1 0 00-.18.15l-.13.16a.34.34 0 00-.09.19.76.76 0 000 .21v.27h5a.58.58 0 01.4.11.55.55 0 01.11.4v.74a.51.51 0 01-.11.39.53.53 0 01-.4.12H45.7a.43.43 0 01-.51-.51v-1.15a3.33 3.33 0 01.23-1.28 2.32 2.32 0 01.71-.93 5.73 5.73 0 01.9-.61c.28-.15.65-.31 1.11-.5a8.51 8.51 0 001.94-.93 1.84 1.84 0 00.79-1.55 1.66 1.66 0 00-.48-1.2 1.74 1.74 0 00-1.26-.49 2.09 2.09 0 00-2.07 1.34.64.64 0 01-.25.35.54.54 0 01-.41 0l-.81-.3c-.34-.13-.45-.34-.33-.64a3.87 3.87 0 013.95-2.5z"/></svg>',"wind-beaufort-3":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_3_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_3_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_3_a"/></defs><path fill="none" stroke="url(#wind_beaufort_3_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.9s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_3_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.475s" dur="1.9s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M51.44 39.79A2.54 2.54 0 0153 42.32a3 3 0 01-1 2.38 4.15 4.15 0 01-2.88.88q-3.18 0-4.07-2.52a.47.47 0 01.33-.66l.81-.28a.55.55 0 01.41 0 .69.69 0 01.25.34 2.07 2.07 0 00.75 1.06 2.74 2.74 0 001.52.33q1.89 0 1.89-1.53t-1.56-1.5h-1.58a.58.58 0 01-.4-.1.53.53 0 01-.11-.4v-.68a.55.55 0 01.11-.4.58.58 0 01.4-.11h1.29a1.65 1.65 0 001.14-.38 1.31 1.31 0 00.43-1c0-1-.56-1.46-1.68-1.46a2.5 2.5 0 00-1.42.32 2.21 2.21 0 00-.71 1.07.6.6 0 01-.24.33.56.56 0 01-.42 0l-.81-.29a.46.46 0 01-.33-.66 3.56 3.56 0 011.38-1.96 4.69 4.69 0 012.58-.62 3.8 3.8 0 012.6.81 2.82 2.82 0 01.93 2.24 2.4 2.4 0 01-1.17 2.26z"/></svg>',"wind-beaufort-4":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_4_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_4_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_4_a"/></defs><path fill="none" stroke="url(#wind_beaufort_4_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.8s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_4_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.45s" dur="1.8s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M53.25 41.33a.57.57 0 01.11.39v.65a.6.6 0 01-.11.4.56.56 0 01-.4.11h-1v2a.43.43 0 01-.51.51h-.73a.55.55 0 01-.4-.12.51.51 0 01-.11-.39v-2h-5a.6.6 0 01-.4-.11.55.55 0 01-.11-.4v-.54a1 1 0 01.18-.62l5-6.17a.88.88 0 01.72-.36h.82a.6.6 0 01.4.1.59.59 0 01.11.41v6h1a.55.55 0 01.43.14zm-6.45-.12h3.26v-4z"/></svg>',"wind-beaufort-5":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_5_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_5_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_5_a"/></defs><path fill="none" stroke="url(#wind_beaufort_5_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.7s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_5_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.425s" dur="1.7s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M52.37 34.82a.57.57 0 01.11.39V36a.42.42 0 01-.51.51h-4.29l-.22 2.21h1.81a3.62 3.62 0 012.71.95 3.32 3.32 0 01.94 2.33 3.42 3.42 0 01-1 2.52 3.69 3.69 0 01-2.75 1c-2.12 0-3.48-.81-4.07-2.45a.46.46 0 01.32-.66l.83-.28a.54.54 0 01.4 0 .62.62 0 01.24.36 2.15 2.15 0 002.26 1.31 1.8 1.8 0 001.31-.47 1.71 1.71 0 00.47-1.33 1.53 1.53 0 00-.48-1.19 1.82 1.82 0 00-1.28-.45H46a.55.55 0 01-.45-.14.6.6 0 01-.09-.46l.45-4.36a1 1 0 01.22-.58 1 1 0 01.61-.15H52a.55.55 0 01.37.15z"/></svg>',"wind-beaufort-6":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_6_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_6_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_6_a"/></defs><path fill="none" stroke="url(#wind_beaufort_6_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.6s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_6_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.4s" dur="1.6s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M49.21 38.72c2.59 0 3.88 1.15 3.88 3.42A3.13 3.13 0 0152 44.66a4.41 4.41 0 01-3 .92 4.11 4.11 0 01-3-1 3.87 3.87 0 01-1-2.87v-3.32a3.88 3.88 0 011-2.88 4.1 4.1 0 013-1q3 0 3.87 2.37a.56.56 0 010 .41.73.73 0 01-.35.25l-.8.28a.46.46 0 01-.4 0 .69.69 0 01-.25-.35 2.05 2.05 0 00-2.11-1.25 1.91 1.91 0 00-2.16 2.15V39a8.91 8.91 0 012.41-.28zm-.15 5.1a2.66 2.66 0 001.61-.42 1.49 1.49 0 00.55-1.26 1.56 1.56 0 00-.5-1.25 2.65 2.65 0 00-1.64-.41 5.3 5.3 0 00-2.18.34v.86a1.9 1.9 0 002.16 2.14z"/></svg>',"wind-beaufort-7":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_7_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_7_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_7_a"/></defs><path fill="none" stroke="url(#wind_beaufort_7_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_7_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.375s" dur="1.5s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M52.69 34.82a.52.52 0 01.11.39v.53a1.94 1.94 0 01-.15.72l-3.79 8.44a.64.64 0 01-.29.37 1.65 1.65 0 01-.66.09h-.82c-.33 0-.42-.17-.26-.51l3.81-8.39h-4.83a.43.43 0 01-.51-.46v-.74a.52.52 0 01.12-.39.51.51 0 01.39-.11h6.48a.53.53 0 01.4.06z"/></svg>',"wind-beaufort-8":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_8_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_8_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_8_a"/></defs><path fill="none" stroke="url(#wind_beaufort_8_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.4s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_8_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.35s" dur="1.4s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M46.26 35.27a4.25 4.25 0 012.74-.79 4.53 4.53 0 012.79.73 2.53 2.53 0 011 2.12 2.7 2.7 0 01-1.53 2.45 3.53 3.53 0 011.37 1 2.58 2.58 0 01.49 1.66 2.84 2.84 0 01-1 2.29 4.71 4.71 0 01-3.09.84q-4.07 0-4.06-2.89A2.9 2.9 0 0146.76 40a2.77 2.77 0 01-1.49-2.56 2.65 2.65 0 01.99-2.17zm4.81 6.82a.77.77 0 00-.15-.33l-.2-.24a.75.75 0 00-.28-.21l-.33-.16-.4-.13-.42-.11-.47-.12-.47-.1a1.89 1.89 0 00-1.52 1.8c0 1 .73 1.46 2.18 1.46a2.68 2.68 0 001.62-.38 1.3 1.3 0 00.48-1.1 2.33 2.33 0 00-.04-.38zm-.66-5.62a2.36 2.36 0 00-1.4-.35c-1.23 0-1.85.46-1.85 1.39a1.15 1.15 0 00.45 1 4.17 4.17 0 001.35.56l.6.15a1.85 1.85 0 001.35-1.71 1.17 1.17 0 00-.5-1.04z"/></svg>',"wind-beaufort-9":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_9_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_9_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_9_a"/></defs><path fill="none" stroke="url(#wind_beaufort_9_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.3s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_9_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.325s" dur="1.3s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M48.79 41.34q-3.88 0-3.88-3.42A3.15 3.15 0 0146 35.4a4.41 4.41 0 013-.92 4.06 4.06 0 013 1 3.85 3.85 0 011 2.87v3.28a3.84 3.84 0 01-1 2.88 4.05 4.05 0 01-3 1 3.74 3.74 0 01-3.89-2.37.65.65 0 010-.41.73.73 0 01.35-.25l.8-.28a.49.49 0 01.4 0 .69.69 0 01.25.35 2 2 0 002.11 1.24 1.9 1.9 0 002.16-2.14v-.63a8.91 8.91 0 01-2.39.32zm1.75-4.56a2.2 2.2 0 00-1.6-.55 2.66 2.66 0 00-1.61.43 1.5 1.5 0 00-.55 1.26 1.56 1.56 0 00.5 1.25 2.65 2.65 0 001.64.41 5.11 5.11 0 002.18-.35v-.85a2.12 2.12 0 00-.56-1.6z"/></svg>',"wind-beaufort-10":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_10_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_10_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_10_a"/></defs><path fill="none" stroke="url(#wind_beaufort_10_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_10_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.3s" dur="1.2s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M46.28 34.82a.57.57 0 01.11.39v9.64a.43.43 0 01-.51.51H45a.52.52 0 01-.4-.12.51.51 0 01-.11-.39V37l-2.1 1.17a.65.65 0 01-.47.12.6.6 0 01-.3-.31l-.37-.67a.53.53 0 01-.07-.4c0-.1.14-.19.31-.29l2.92-1.68a1.37 1.37 0 01.72-.21h.72a.55.55 0 01.43.09zM49.38 35.46a4.84 4.84 0 015.84 0 3.44 3.44 0 011 2.64V42a3.49 3.49 0 01-1 2.66 4.88 4.88 0 01-5.84 0A3.42 3.42 0 0148.33 42v-3.9a3.38 3.38 0 011.05-2.64zm4.46 1.26a2.66 2.66 0 00-3.08 0 1.78 1.78 0 00-.55 1.38V42a1.78 1.78 0 00.55 1.38 2.67 2.67 0 003.08 0 1.78 1.78 0 00.54-1.38v-3.9a1.78 1.78 0 00-.54-1.38z"/></svg>',"wind-beaufort-11":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_11_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_11_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_11_a"/></defs><path fill="none" stroke="url(#wind_beaufort_11_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.1s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_11_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.275s" dur="1.1s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M47.73 34.82a.52.52 0 01.11.39v9.64a.51.51 0 01-.11.39.52.52 0 01-.4.12h-.85a.43.43 0 01-.51-.51V37l-2.1 1.17a.62.62 0 01-.46.12.57.57 0 01-.3-.31l-.38-.67a.58.58 0 01-.07-.4.67.67 0 01.34-.31l2.93-1.68a1.34 1.34 0 01.72-.21h.71a.52.52 0 01.37.11zM54.33 34.82a.52.52 0 01.11.39v9.64a.51.51 0 01-.11.39.53.53 0 01-.4.12h-.85a.43.43 0 01-.51-.51V37l-2.1 1.17a.63.63 0 01-.47.12.55.55 0 01-.29-.31l-.38-.67a.58.58 0 01-.07-.4.67.67 0 01.31-.29l2.93-1.68a1.31 1.31 0 01.71-.21h.72a.53.53 0 01.4.09z"/></svg>',"wind-beaufort-12":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_12_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_12_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_12_a"/></defs><path fill="none" stroke="url(#wind_beaufort_12_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_12_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.25s" dur="1s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M46.55 34.82a.57.57 0 01.11.39v9.64a.43.43 0 01-.51.51h-.86a.43.43 0 01-.5-.51V37l-2.11 1.17a.62.62 0 01-.46.12.6.6 0 01-.3-.31l-.38-.67a.52.52 0 01-.06-.4c0-.1.14-.19.31-.29l2.92-1.68a1.37 1.37 0 01.72-.21h.72a.55.55 0 01.4.09zM52.51 34.48a3.64 3.64 0 012.65 1 3.23 3.23 0 011 2.37 3.29 3.29 0 01-.9 2.48 10.49 10.49 0 01-3.26 1.8l-.22.08-.23.09-.22.09a.92.92 0 00-.23.12l-.19.11a1 1 0 00-.18.15l-.13.16a.34.34 0 00-.09.19.76.76 0 000 .21v.27h5a.58.58 0 01.4.11.55.55 0 01.11.4v.74a.51.51 0 01-.11.39.53.53 0 01-.4.12H49a.43.43 0 01-.51-.51v-1.13a3.33 3.33 0 01.23-1.28 2.32 2.32 0 01.71-.93 5.73 5.73 0 01.9-.61c.28-.15.65-.31 1.11-.5a8.51 8.51 0 001.94-.93 1.84 1.84 0 00.79-1.55 1.66 1.66 0 00-.48-1.2 1.74 1.74 0 00-1.26-.49 2.09 2.09 0 00-2.07 1.34.64.64 0 01-.25.35.54.54 0 01-.41 0l-.81-.3c-.34-.13-.45-.34-.33-.64a3.87 3.87 0 013.95-2.5z"/></svg>'},he=[ne,ne,'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_2_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_2_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#91c700" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M44.13 40a2.93 2.93 0 012.09.73 2.38 2.38 0 01.78 1.8 2.53 2.53 0 01-.65 1.85 7 7 0 01-2.35 1.3l-.27.09-.28.1-.24.1a.54.54 0 00-.2.14.28.28 0 00-.06.18v.09h3.45a.51.51 0 01.37.1.46.46 0 01.1.35v.72a.47.47 0 01-.1.35.51.51 0 01-.37.1h-4.95a.46.46 0 01-.35-.1.47.47 0 01-.1-.35v-.84a2.33 2.33 0 01.18-1 1.79 1.79 0 01.53-.7 4.36 4.36 0 01.67-.45 7.23 7.23 0 01.8-.36 6.56 6.56 0 001.41-.68 1.22 1.22 0 00.5-1 .9.9 0 00-.28-.68 1.05 1.05 0 00-.75-.28 1.26 1.26 0 00-1.24.81.78.78 0 01-.24.31.54.54 0 01-.35 0l-.88-.31c-.3-.11-.4-.3-.28-.58A3 3 0 0144.13 40z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_3_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_3_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ffb800" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M45.94 43.82a1.86 1.86 0 011.06 1.8 2.17 2.17 0 01-.73 1.74 3.18 3.18 0 01-2.16.64A2.9 2.9 0 0141 46.18a.39.39 0 01.27-.56l.82-.29a.4.4 0 01.35 0 .58.58 0 01.22.3 1.18 1.18 0 00.46.61 1.61 1.61 0 00.89.19c.73 0 1.09-.28 1.09-.84s-.3-.85-.91-.85h-.86a.51.51 0 01-.35-.09.43.43 0 01-.1-.34v-.67a.49.49 0 01.1-.35.51.51 0 01.35-.09H44a1.15 1.15 0 00.69-.2.68.68 0 00.27-.59c0-.53-.32-.8-1-.8a1.48 1.48 0 00-.83.18 1.24 1.24 0 00-.42.62.55.55 0 01-.22.29.52.52 0 01-.35 0l-.82-.29a.38.38 0 01-.27-.56 2.64 2.64 0 011.06-1.37 3.66 3.66 0 012-.45 2.88 2.88 0 012 .6 2 2 0 01.7 1.62 1.76 1.76 0 01-.87 1.57z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_4_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_4_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ffb800" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M47.4 44.87a.53.53 0 01.1.36v.63a.55.55 0 01-.1.36.54.54 0 01-.38.1h-.64v1.22a.5.5 0 01-.11.36.51.51 0 01-.37.1h-.81a.51.51 0 01-.37-.1.5.5 0 01-.11-.36v-1.22H41a.54.54 0 01-.38-.1.5.5 0 01-.1-.36v-.56a1.44 1.44 0 010-.35.92.92 0 01.17-.25l3.66-4.37a1 1 0 01.3-.26A.81.81 0 0145 40h.86a.51.51 0 01.37.1.5.5 0 01.11.36v4.31H47a.54.54 0 01.4.1zm-4.79-.1h2v-2.38z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_5_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_5_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ffb800" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M46.58 40.1a.47.47 0 01.1.35v.73a.46.46 0 01-.1.35.47.47 0 01-.35.1h-2.91l-.11 1.16h1a2.77 2.77 0 012.07.72 2.51 2.51 0 01.7 1.84 2.57 2.57 0 01-.77 1.89 2.83 2.83 0 01-2.09.76c-1.62 0-2.65-.61-3.1-1.82a.52.52 0 010-.37.5.5 0 01.29-.21l.85-.3a.45.45 0 01.35 0 .49.49 0 01.22.3 1.23 1.23 0 00.47.59 1.69 1.69 0 00.88.2 1 1 0 00.75-.27 1 1 0 00.28-.77.85.85 0 00-.29-.69 1.08 1.08 0 00-.75-.25h-2.3a.47.47 0 01-.38-.12.52.52 0 01-.08-.4l.33-3.22a.7.7 0 01.19-.5.75.75 0 01.53-.14h3.87a.47.47 0 01.35.07z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_6_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_6_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ff8d00" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M44.11 43C46 43 47 43.8 47 45.47a2.26 2.26 0 01-.8 1.85A3.29 3.29 0 0144 48a3 3 0 01-2.23-.76 2.84 2.84 0 01-.77-2.12v-2.24a2.81 2.81 0 01.78-2.12A3 3 0 0144 40a2.73 2.73 0 012.87 1.73.37.37 0 010 .35.53.53 0 01-.3.21l-.77.29a.42.42 0 01-.34 0 .67.67 0 01-.22-.31 1.23 1.23 0 00-1.24-.66 1.11 1.11 0 00-1.27 1.25v.23a6.56 6.56 0 011.38-.09zM44 46.41q1.26 0 1.26-.93a.84.84 0 00-.29-.7 1.63 1.63 0 00-1-.23 3.7 3.7 0 00-1.26.17v.49q.03 1.2 1.29 1.2z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_7_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_7_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ff8d00" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M46.9 40.1a.5.5 0 01.1.36V41a1.51 1.51 0 01-.15.65l-2.8 5.93a.61.61 0 01-.27.34 1.88 1.88 0 01-.6.07h-.92c-.28 0-.36-.15-.23-.46l2.79-5.87h-3.36a.53.53 0 01-.36-.1.49.49 0 01-.1-.35v-.76a.5.5 0 01.1-.36.48.48 0 01.36-.1h5.07a.53.53 0 01.37.11z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_8_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_8_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ff3c00" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M42 40.6a3 3 0 012-.6 3.26 3.26 0 012.06.55 1.87 1.87 0 01.7 1.57 1.91 1.91 0 01-.86 1.65 2 2 0 011.1 1.88 2.12 2.12 0 01-.74 1.72A3.45 3.45 0 0144 48c-2 0-3-.72-3-2.15A2 2 0 0142.11 44a2 2 0 01-.87-1.78A2 2 0 0142 40.6zm3.17 4.83a.48.48 0 00-.09-.19.53.53 0 00-.17-.16L44.7 45a1.58 1.58 0 00-.26-.1l-.28-.07-.33-.08-.35-.08a1.09 1.09 0 00-.73 1c0 .55.41.83 1.24.83a1.54 1.54 0 00.92-.21.72.72 0 00.28-.62.62.62 0 00-.04-.24zm-.37-3.74a1.31 1.31 0 00-.77-.2c-.68 0-1 .27-1 .79a.64.64 0 00.24.55 2.3 2.3 0 00.73.32l.45.11a1 1 0 00.65-1 .68.68 0 00-.32-.57z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_9_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_9_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ff3c00" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M43.89 45a3.21 3.21 0 01-2.18-.63 2.38 2.38 0 01-.71-1.84 2.25 2.25 0 01.8-1.85A3.29 3.29 0 0144 40a3 3 0 012.23.76 2.84 2.84 0 01.77 2.12v2.24a2.81 2.81 0 01-.78 2.12A3 3 0 0144 48a2.75 2.75 0 01-2.88-1.73.4.4 0 010-.35.53.53 0 01.29-.21l.78-.29a.42.42 0 01.34 0 .75.75 0 01.22.31 1.21 1.21 0 001.26.69 1.11 1.11 0 001.27-1.25v-.23a6.78 6.78 0 01-1.39.06zm.11-3.41q-1.26 0-1.26.93a.84.84 0 00.29.7 1.63 1.63 0 001 .23 3.43 3.43 0 001.26-.18v-.48q-.03-1.2-1.29-1.2z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_10_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_10_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#ff3c00" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M41.9 40.1a.5.5 0 01.1.36v7.08a.5.5 0 01-.1.36.46.46 0 01-.35.1h-.89a.46.46 0 01-.35-.1.5.5 0 01-.1-.36v-5.29l-1.07.62a.42.42 0 01-.68-.18l-.38-.69a.45.45 0 01-.07-.35.64.64 0 01.29-.27l2-1.18a1.24 1.24 0 01.64-.18h.63a.46.46 0 01.33.08zM44.8 40.72a3.74 3.74 0 014.41 0 2.54 2.54 0 01.79 2v2.6a2.53 2.53 0 01-.79 2A3.09 3.09 0 0147 48a3.14 3.14 0 01-2.21-.73 2.53 2.53 0 01-.8-2v-2.6a2.51 2.51 0 01.81-1.95zm3.1 1.16a1.33 1.33 0 00-.89-.27 1.35 1.35 0 00-.91.27 1 1 0 00-.32.79v2.65a1 1 0 00.32.79 1.31 1.31 0 00.91.28 1.28 1.28 0 00.89-.28 1 1 0 00.32-.79v-2.65a1 1 0 00-.32-.79z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="uv_index_11_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#uv_index_11_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path><rect width="21" height="21" x="33.5" y="33.5" fill="#9936d4" stroke="#fff" stroke-miterlimit="10" stroke-width="2" rx="6"/><path fill="#fff" d="M42.9 40.1a.5.5 0 01.1.36v7.08a.5.5 0 01-.1.36.46.46 0 01-.35.1h-.89a.46.46 0 01-.35-.1.5.5 0 01-.1-.36v-5.29l-1.07.62a.42.42 0 01-.68-.18l-.39-.69a.43.43 0 010-.35.56.56 0 01.28-.27l2-1.18a1.18 1.18 0 01.63-.18h.63a.46.46 0 01.29.08zM47.9 40.1a.5.5 0 01.1.36v7.08a.5.5 0 01-.1.36.46.46 0 01-.35.1h-.89a.46.46 0 01-.35-.1.5.5 0 01-.1-.36v-5.29l-1.07.62a.42.42 0 01-.68-.18l-.38-.69a.45.45 0 01-.07-.35.64.64 0 01.29-.27l2-1.18a1.24 1.24 0 01.64-.18h.63a.46.46 0 01.33.08z"/></svg>'],pe={"clear-day":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="clear_day_a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#clear_day_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path></svg>',"clear-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="clear_night_a" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/></linearGradient></defs><path fill="url(#clear_night_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/></path></svg>',cloudy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cloudy_a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#cloudy_a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path></svg>',"fog-day":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="fog_day_c" x1="26.75" x2="37.25" y1="29.91" y2="48.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="fog_day_a" x1="15.5" x2="48.5" y1="44" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="fog_day_d" y1="51" y2="51" xlink:href="#fog_day_a"/><clipPath id="fog_day_b"><path fill="none" d="M0 7.5h64v32H0z"/></clipPath></defs><g stroke-miterlimit="10" clip-path="url(#fog_day_b)"><circle cx="32" cy="39" r="10.5" fill="url(#fog_day_c)" stroke="#f8af18" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="3" d="M32 22.71V16.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 54.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 39H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 39; 360 32 39"/></path></g><path fill="none" stroke="url(#fog_day_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 44h30"><animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path><path fill="none" stroke="url(#fog_day_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 51h30"><animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path></svg>',"fog-night":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="fog_night_c" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/></linearGradient><linearGradient id="fog_night_a" x1="15.5" x2="48.5" y1="44" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="fog_night_d" y1="51" y2="51" xlink:href="#fog_night_a"/><clipPath id="fog_night_b"><path fill="none" d="M0 7.5h64v32H0z"/></clipPath></defs><g clip-path="url(#fog_night_b)"><g><path fill="url(#fog_night_c)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"/><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/></g></g><path fill="none" stroke="url(#fog_night_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 44h30"><animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path><path fill="none" stroke="url(#fog_night_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 51h30"><animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path></svg>',"not-available":le,"overcast-day":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="overcast_day_a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="overcast_day_b" x1="40.76" x2="50.83" y1="23" y2="40.46" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9ca3af"/><stop offset=".45" stop-color="#9ca3af"/><stop offset="1" stop-color="#6b7280"/></linearGradient><linearGradient id="overcast_day_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#overcast_day_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#overcast_day_b)" stroke="#848b98" stroke-miterlimit="10" stroke-width=".5" d="M34.23 33.45a4.05 4.05 0 004.05 4h16.51a4.34 4.34 0 00.81-8.61 3.52 3.52 0 00.06-.66 4.06 4.06 0 00-6.13-3.48 6.08 6.08 0 00-11.25 3.19 6.34 6.34 0 00.18 1.46h-.18a4.05 4.05 0 00-4.05 4.1z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-2.1 0; 2.1 0; -2.1 0"/></path><path fill="url(#overcast_day_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path></svg>',"overcast-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="overcast_night_a" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="overcast_night_b" x1="40.76" x2="50.83" y1="23" y2="40.46" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9ca3af"/><stop offset=".45" stop-color="#9ca3af"/><stop offset="1" stop-color="#6b7280"/></linearGradient><linearGradient id="overcast_night_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#overcast_night_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#overcast_night_b)" stroke="#848b98" stroke-miterlimit="10" stroke-width=".5" d="M34.23 33.45a4.05 4.05 0 004.05 4h16.51a4.34 4.34 0 00.81-8.61 3.52 3.52 0 00.06-.66 4.06 4.06 0 00-6.13-3.48 6.08 6.08 0 00-11.25 3.19 6.34 6.34 0 00.18 1.46h-.18a4.05 4.05 0 00-4.05 4.1z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-2.1 0; 2.1 0; -2.1 0"/></path><path fill="url(#overcast_night_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path></svg>',"partly-cloudy-day":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="partly_cloudy_day_a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="partly_cloudy_day_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#partly_cloudy_day_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#partly_cloudy_day_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>',"partly-cloudy-day-rain":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="partly_cloudy_day_rain_b" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="partly_cloudy_day_rain_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="partly_cloudy_day_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="partly_cloudy_day_rain_d" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#partly_cloudy_day_rain_a"/><linearGradient id="partly_cloudy_day_rain_e" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#partly_cloudy_day_rain_a"/></defs><circle cx="19" cy="24" r="5" fill="url(#partly_cloudy_day_rain_b)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#partly_cloudy_day_rain_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#partly_cloudy_day_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#partly_cloudy_day_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#partly_cloudy_day_rain_e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',"partly-cloudy-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="partly_cloudy_night_a" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="partly_cloudy_night_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#partly_cloudy_night_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#partly_cloudy_night_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>',"partly-cloudy-night-rain":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="partly_cloudy_night_rain_b" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="partly_cloudy_night_rain_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="partly_cloudy_night_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="partly_cloudy_night_rain_d" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#partly_cloudy_night_rain_a"/><linearGradient id="partly_cloudy_night_rain_e" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#partly_cloudy_night_rain_a"/></defs><path fill="url(#partly_cloudy_night_rain_b)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#partly_cloudy_night_rain_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#partly_cloudy_night_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#partly_cloudy_night_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#partly_cloudy_night_rain_e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',rain:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="rain_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="rain_c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#rain_a"/><linearGradient id="rain_d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#rain_a"/></defs><path fill="url(#rain_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#rain_c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',"starry-night":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="starry_night_a" x1="36.88" x2="41.12" y1="15.33" y2="22.67" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcd966"/><stop offset=".45" stop-color="#fcd966"/><stop offset="1" stop-color="#fccd34"/></linearGradient><linearGradient id="starry_night_b" x1="43.79" x2="48.21" y1="25.17" y2="32.83" xlink:href="#starry_night_a"/><linearGradient id="starry_night_c" x1="36.78" x2="39.21" y1="24.9" y2="29.1" xlink:href="#starry_night_a"/><linearGradient id="starry_night_d" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/></linearGradient></defs><path fill="url(#starry_night_a)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M35.44 16.87l1.3 2.13a.55.55 0 01.06.5l-.8 2.36a.59.59 0 00.87.7l2.13-1.3a.55.55 0 01.5-.06l2.36.8a.59.59 0 00.7-.87L41.26 19a.55.55 0 01-.06-.5l.8-2.36a.59.59 0 00-.87-.7L39 16.74a.55.55 0 01-.5.06l-2.36-.8a.59.59 0 00-.7.87z"><animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="1; 0; 1"/></path><path fill="url(#starry_night_b)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M42.27 30.82l2.49.07a.62.62 0 01.46.22l1.53 2a.6.6 0 001.07-.35l.07-2.49a.62.62 0 01.22-.46l2-1.53a.6.6 0 00-.35-1.07l-2.49-.07a.62.62 0 01-.46-.22l-1.53-2a.6.6 0 00-1.07.35l-.07 2.49a.62.62 0 01-.22.46l-2 1.53a.6.6 0 00.35 1.07z"><animate attributeName="opacity" begin="-1s" dur="3s" repeatCount="indefinite" values="1; 0; 1"/></path><path fill="url(#starry_night_c)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M35.31 26.35l1.25 1.1a.4.4 0 01.14.31v1.66a.39.39 0 00.69.27l1.1-1.25a.4.4 0 01.31-.14h1.66a.39.39 0 00.27-.69l-1.25-1.1a.4.4 0 01-.14-.31v-1.66a.39.39 0 00-.69-.27l-1.1 1.25a.4.4 0 01-.31.14h-1.66a.39.39 0 00-.27.69z"><animate attributeName="opacity" begin="-2s" dur="3s" repeatCount="indefinite" values="1; 0; 1"/></path><path fill="url(#starry_night_d)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32;15 32 32;-5 32 32"/><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/></path></svg>',sunrise:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="sunrise-grad" x1="26.75" x2="37.25" y1="29.91" y2="48.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><clipPath id="sunrise-clip"><path fill="none" d="M0 7.5h64v32H0z"/></clipPath></defs><g stroke-miterlimit="10" clip-path="url(#sunrise-clip)"><circle cx="32" cy="39" r="10.5" fill="url(#sunrise-grad)" stroke="#f8af18" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="3" d="M32 22.71V16.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 54.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 39H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 39; 360 32 39"/></path></g><path fill="none" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 42.5h11l5-4.5 5 4.5h11"/></svg>',sunset:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="sunset-grad" x1="26.75" x2="37.25" y1="29.91" y2="48.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><clipPath id="sunset-clip"><path fill="none" d="M0 7.5h64v32H0z"/></clipPath></defs><g stroke-miterlimit="10" clip-path="url(#sunset-clip)"><circle cx="32" cy="39" r="10.5" fill="url(#sunset-grad)" stroke="#f8af18" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="3" d="M32 22.71V16.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 54.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 39H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 39; 360 32 39"/></path></g><path fill="none" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 42.5h11l5 4.5 5-4.5h11"/></svg>',thunderstorms:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_b" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#thunderstorms_a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#thunderstorms_b)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"thunderstorms-day":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_day_a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="thunderstorms_day_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_day_c" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#thunderstorms_day_a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#thunderstorms_day_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#thunderstorms_day_c)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"thunderstorms-day-rain":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_day_rain_b" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="thunderstorms_day_rain_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_day_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="thunderstorms_day_rain_d" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_day_rain_a"/><linearGradient id="thunderstorms_day_rain_e" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_day_rain_a"/><linearGradient id="thunderstorms_day_rain_f" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#thunderstorms_day_rain_b)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#thunderstorms_day_rain_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#thunderstorms_day_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_day_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_day_rain_e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#thunderstorms_day_rain_f)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"thunderstorms-night":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_night_a" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="thunderstorms_night_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_night_c" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#thunderstorms_night_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#thunderstorms_night_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#thunderstorms_night_c)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"thunderstorms-night-rain":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_night_rain_b" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="thunderstorms_night_rain_c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_night_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="thunderstorms_night_rain_d" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_night_rain_a"/><linearGradient id="thunderstorms_night_rain_e" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_night_rain_a"/><linearGradient id="thunderstorms_night_rain_f" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><g><path fill="url(#thunderstorms_night_rain_b)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"/><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></g><path fill="url(#thunderstorms_night_rain_c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#thunderstorms_night_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_night_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_night_rain_e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#thunderstorms_night_rain_f)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"thunderstorms-rain":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_rain_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="thunderstorms_rain_c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_rain_a"/><linearGradient id="thunderstorms_rain_d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_rain_a"/><linearGradient id="thunderstorms_rain_e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#thunderstorms_rain_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#thunderstorms_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_rain_c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#thunderstorms_rain_e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>',"partly-cloudy-day-drizzle":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_day_drizzle_a" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#fbbf24"/>\n\t\t\t<stop offset="0.45" stop-color="#fbbf24"/>\n\t\t\t<stop offset="1" stop-color="#f59e0b"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_drizzle_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_drizzle_c" x1="23.31" y1="44.3" x2="24.69" y2="46.7" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#4286ee"/>\n\t\t\t<stop offset="0.45" stop-color="#4286ee"/>\n\t\t\t<stop offset="1" stop-color="#0950bc"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_drizzle_d" x1="30.31" y1="44.3" x2="31.69" y2="46.7" xlink:href="#partly_cloudy_day_drizzle_c"/>\n\t\t<linearGradient id="partly_cloudy_day_drizzle_e" x1="37.31" y1="44.3" x2="38.69" y2="46.7" xlink:href="#partly_cloudy_day_drizzle_c"/>\n\t</defs>\n\t<circle cx="19" cy="24" r="5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_drizzle_a)"/>\n\t<path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_drizzle_b)"/>\n\t<line x1="24.08" y1="45.01" x2="23.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_day_drizzle_c)"/>\n\t<line x1="31.08" y1="45.01" x2="30.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_day_drizzle_d)"/>\n\t<line x1="38.08" y1="45.01" x2="37.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_day_drizzle_e)"/>\n</svg>\n',"partly-cloudy-night-drizzle":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_night_drizzle_a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_drizzle_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_drizzle_c" x1="23.31" y1="44.3" x2="24.69" y2="46.7" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#4286ee"/>\n\t\t\t<stop offset="0.45" stop-color="#4286ee"/>\n\t\t\t<stop offset="1" stop-color="#0950bc"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_drizzle_d" x1="30.31" y1="44.3" x2="31.69" y2="46.7" xlink:href="#partly_cloudy_night_drizzle_c"/>\n\t\t<linearGradient id="partly_cloudy_night_drizzle_e" x1="37.31" y1="44.3" x2="38.69" y2="46.7" xlink:href="#partly_cloudy_night_drizzle_c"/>\n\t</defs>\n\t<path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#partly_cloudy_night_drizzle_a)"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_drizzle_b)"/>\n\t<line x1="24.08" y1="45.01" x2="23.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_night_drizzle_c)"/>\n\t<line x1="31.08" y1="45.01" x2="30.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_night_drizzle_d)"/>\n\t<line x1="38.08" y1="45.01" x2="37.92" y2="45.99" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#partly_cloudy_night_drizzle_e)"/>\n</svg>\n',"haze-day":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<clipPath id="haze_day_a">\n\t\t\t<rect y="7.5" width="64" height="32" fill="none"/>\n\t\t</clipPath>\n\t\t<linearGradient id="haze_day_b" x1="26.75" y1="29.91" x2="37.25" y2="48.09" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#fbbf24"/>\n\t\t\t<stop offset="0.45" stop-color="#fbbf24"/>\n\t\t\t<stop offset="1" stop-color="#f59e0b"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="haze_day_c" x1="17.94" y1="41.73" x2="26.94" y2="57.32" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="0.45" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="1" stop-color="#bec1c6"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="haze_day_d" x1="28.81" y1="35.45" x2="37.81" y2="51.04" xlink:href="#haze_day_c"/>\n\t\t<linearGradient id="haze_day_e" x1="37.06" y1="30.68" x2="46.06" y2="46.27" xlink:href="#haze_day_c"/>\n\t\t<linearGradient id="haze_day_f" x1="17.94" y1="48.73" x2="26.94" y2="64.32" xlink:href="#haze_day_c"/>\n\t\t<linearGradient id="haze_day_g" x1="28.81" y1="42.45" x2="37.81" y2="58.04" xlink:href="#haze_day_c"/>\n\t\t<linearGradient id="haze_day_h" x1="37.06" y1="37.68" x2="46.06" y2="53.27" xlink:href="#haze_day_c"/>\n\t</defs>\n\t<g clip-path="url(#haze_day_a)">\n\t\t<circle cx="32" cy="39" r="10.5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#haze_day_b)"/>\n\t\t<path d="M32,22.71V16.5m0,45V55.29M43.52,27.48l4.39-4.39M16.09,54.91l4.39-4.39m0-23-4.39-4.39M47.91,54.91l-4.39-4.39M15.71,39H9.5m45,0H48.29" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>\n\t</g>\n\t<line x1="17" y1="44" x2="21.5" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_day_c)"/>\n\t<line x1="28.5" y1="44" x2="39" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#haze_day_d)"/>\n\t<line x1="42.5" y1="44" x2="47" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_day_e)"/>\n\t<line x1="17" y1="51" x2="21.5" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_day_f)"/>\n\t<line x1="28.5" y1="51" x2="39" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#haze_day_g)"/>\n\t<line x1="42.5" y1="51" x2="47" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_day_h)"/>\n</svg>\n',"haze-night":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<clipPath id="haze_night_a">\n\t\t\t<rect y="7.5" width="64" height="32" fill="none"/>\n\t\t</clipPath>\n\t\t<linearGradient id="haze_night_b" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="haze_night_c" x1="17.94" y1="41.73" x2="26.94" y2="57.32" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="0.45" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="1" stop-color="#bec1c6"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="haze_night_d" x1="28.81" y1="35.45" x2="37.81" y2="51.04" xlink:href="#haze_night_c"/>\n\t\t<linearGradient id="haze_night_e" x1="37.06" y1="30.68" x2="46.06" y2="46.27" xlink:href="#haze_night_c"/>\n\t\t<linearGradient id="haze_night_f" x1="17.94" y1="48.73" x2="26.94" y2="64.32" xlink:href="#haze_night_c"/>\n\t\t<linearGradient id="haze_night_g" x1="28.81" y1="42.45" x2="37.81" y2="58.04" xlink:href="#haze_night_c"/>\n\t\t<linearGradient id="haze_night_h" x1="37.06" y1="37.68" x2="46.06" y2="53.27" xlink:href="#haze_night_c"/>\n\t</defs>\n\t<g clip-path="url(#haze_night_a)">\n\t\t<path d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#haze_night_b)"/>\n\t</g>\n\t<line x1="17" y1="44" x2="21.5" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_night_c)"/>\n\t<line x1="28.5" y1="44" x2="39" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#haze_night_d)"/>\n\t<line x1="42.5" y1="44" x2="47" y2="44" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_night_e)"/>\n\t<line x1="17" y1="51" x2="21.5" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_night_f)"/>\n\t<line x1="28.5" y1="51" x2="39" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#haze_night_g)"/>\n\t<line x1="42.5" y1="51" x2="47" y2="51" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#haze_night_h)"/>\n</svg>\n',"partly-cloudy-day-haze":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_day_haze_a" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#fbbf24"/>\n\t\t\t<stop offset="0.45" stop-color="#fbbf24"/>\n\t\t\t<stop offset="1" stop-color="#f59e0b"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_haze_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_haze_c" x1="17.94" y1="55.73" x2="26.94" y2="71.32" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="0.45" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="1" stop-color="#bec1c6"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_haze_d" x1="28.81" y1="49.45" x2="37.81" y2="65.04" xlink:href="#partly_cloudy_day_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_day_haze_e" x1="37.06" y1="44.68" x2="46.06" y2="60.27" xlink:href="#partly_cloudy_day_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_day_haze_f" x1="17.94" y1="49.73" x2="26.94" y2="65.32" xlink:href="#partly_cloudy_day_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_day_haze_g" x1="28.81" y1="43.45" x2="37.81" y2="59.04" xlink:href="#partly_cloudy_day_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_day_haze_h" x1="37.06" y1="38.68" x2="46.06" y2="54.27" xlink:href="#partly_cloudy_day_haze_c"/>\n\t</defs>\n\t<circle cx="19" cy="24" r="5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_haze_a)"/>\n\t<path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_haze_b)"/>\n\t<line x1="17" y1="58" x2="21.5" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_day_haze_c)"/>\n\t<line x1="28.5" y1="58" x2="39" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#partly_cloudy_day_haze_d)"/>\n\t<line x1="42.5" y1="58" x2="47" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_day_haze_e)"/>\n\t<line x1="17" y1="52" x2="21.5" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_day_haze_f)"/>\n\t<line x1="28.5" y1="52" x2="39" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#partly_cloudy_day_haze_g)"/>\n\t<line x1="42.5" y1="52" x2="47" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_day_haze_h)"/>\n</svg>\n',"partly-cloudy-night-haze":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_night_haze_a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_haze_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_haze_c" x1="17.94" y1="55.73" x2="26.94" y2="71.32" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="0.45" stop-color="#d4d7dd"/>\n\t\t\t<stop offset="1" stop-color="#bec1c6"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_haze_d" x1="28.81" y1="49.45" x2="37.81" y2="65.04" xlink:href="#partly_cloudy_night_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_night_haze_e" x1="37.06" y1="44.68" x2="46.06" y2="60.27" xlink:href="#partly_cloudy_night_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_night_haze_f" x1="17.94" y1="49.73" x2="26.94" y2="65.32" xlink:href="#partly_cloudy_night_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_night_haze_g" x1="28.81" y1="43.45" x2="37.81" y2="59.04" xlink:href="#partly_cloudy_night_haze_c"/>\n\t\t<linearGradient id="partly_cloudy_night_haze_h" x1="37.06" y1="38.68" x2="46.06" y2="54.27" xlink:href="#partly_cloudy_night_haze_c"/>\n\t</defs>\n\t<path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#partly_cloudy_night_haze_a)"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_haze_b)"/>\n\t<line x1="17" y1="58" x2="21.5" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_night_haze_c)"/>\n\t<line x1="28.5" y1="58" x2="39" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#partly_cloudy_night_haze_d)"/>\n\t<line x1="42.5" y1="58" x2="47" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_night_haze_e)"/>\n\t<line x1="17" y1="52" x2="21.5" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_night_haze_f)"/>\n\t<line x1="28.5" y1="52" x2="39" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke-dasharray="7 7" stroke="url(#partly_cloudy_night_haze_g)"/>\n\t<line x1="42.5" y1="52" x2="47" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#partly_cloudy_night_haze_h)"/>\n</svg>\n',"partly-cloudy-day-smoke":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_day_smoke_a" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#fbbf24"/>\n\t\t\t<stop offset="0.45" stop-color="#fbbf24"/>\n\t\t\t<stop offset="1" stop-color="#f59e0b"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_smoke_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_smoke_c" x1="30.25" y1="48.4" x2="33.25" y2="53.6" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#b8bdc6"/>\n\t\t\t<stop offset="0.45" stop-color="#b8bdc6"/>\n\t\t\t<stop offset="1" stop-color="#a5aab2"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_day_smoke_d" x1="23.5" y1="38.1" x2="28" y2="45.9" xlink:href="#partly_cloudy_day_smoke_c"/>\n\t\t<linearGradient id="partly_cloudy_day_smoke_e" x1="33.75" y1="28.8" x2="39.75" y2="39.2" xlink:href="#partly_cloudy_day_smoke_c"/>\n\t</defs>\n\t<circle cx="19" cy="24" r="5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_smoke_a)"/>\n\t<path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_smoke_b)"/>\n\t<circle cx="31.75" cy="51" r="3" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_smoke_c)"/>\n\t<circle cx="25.75" cy="42" r="4.5" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_smoke_d)"/>\n\t<circle cx="36.75" cy="34" r="6" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_day_smoke_e)"/>\n</svg>\n',"partly-cloudy-night-smoke":'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">\n\t<defs>\n\t\t<linearGradient id="partly_cloudy_night_smoke_a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_smoke_b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="0.45" stop-color="#f3f7fe"/>\n\t\t\t<stop offset="1" stop-color="#deeafb"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_smoke_c" x1="30.25" y1="48.4" x2="33.25" y2="53.6" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#b8bdc6"/>\n\t\t\t<stop offset="0.45" stop-color="#b8bdc6"/>\n\t\t\t<stop offset="1" stop-color="#a5aab2"/>\n\t\t</linearGradient>\n\t\t<linearGradient id="partly_cloudy_night_smoke_d" x1="23.5" y1="38.1" x2="28" y2="45.9" xlink:href="#partly_cloudy_night_smoke_c"/>\n\t\t<linearGradient id="partly_cloudy_night_smoke_e" x1="33.75" y1="28.8" x2="39.75" y2="39.2" xlink:href="#partly_cloudy_night_smoke_c"/>\n\t</defs>\n\t<path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#partly_cloudy_night_smoke_a)"/>\n\t<path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_smoke_b)"/>\n\t<circle cx="31.75" cy="51" r="3" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_smoke_c)"/>\n\t<circle cx="25.75" cy="42" r="4.5" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_smoke_d)"/>\n\t<circle cx="36.75" cy="34" r="6" stroke="#afb4bc" stroke-miterlimit="10" stroke-width="0.5" fill="url(#partly_cloudy_night_smoke_e)"/>\n</svg>\n',moonrise:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n\t<defs>\n\t\t<clipPath id="moonrise_a">\n\t\t\t<rect y="7.5" width="64" height="32" fill="none"/>\n\t\t</clipPath>\n\t\t<linearGradient id="moonrise_b" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t</defs>\n\t<g clip-path="url(#moonrise_a)">\n\t\t<path d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#moonrise_b)"/>\n\t</g>\n\t<polyline points="16 42.5 27 42.5 32 38 37 42.5 48 42.5" fill="none" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>\n</svg>\n',moonset:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n\t<defs>\n\t\t<clipPath id="moonset_a">\n\t\t\t<rect y="7.5" width="64" height="32" fill="none"/>\n\t\t</clipPath>\n\t\t<linearGradient id="moonset_b" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse">\n\t\t\t<stop offset="0" stop-color="#86c3db"/>\n\t\t\t<stop offset="0.45" stop-color="#86c3db"/>\n\t\t\t<stop offset="1" stop-color="#5eafcf"/>\n\t\t</linearGradient>\n\t</defs>\n\t<g clip-path="url(#moonset_a)">\n\t\t<path d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#moonset_b)"/>\n\t</g>\n\t<polyline points="16 42.5 27 42.5 32 47 37 42.5 48 42.5" fill="none" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>\n</svg>\n',wind:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_a"/></defs><path fill="none" stroke="url(#wind_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-1.5s" dur="2s" repeatCount="indefinite" values="-39; 39"/></path></svg>'},fe={new_moon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/></svg>',waxing_crescent:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_waxing_crescent_a" x1="26.76" x2="41.62" y1="20.91" y2="46.65" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_waxing_crescent_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M39.12 16a18.38 18.38 0 00-2.38-.86l.08.06h0c11.54 12.1 2.63 32.1-14.07 31.62h-.1A18.21 18.21 0 0024.88 48a17.5 17.5 0 1014.24-32z"/></svg>',first_quarter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_first_quarter_a" x1="24.26" x2="40.74" y1="18.57" y2="47.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_first_quarter_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M38.8 15.87a17.48 17.48 0 00-7.12-1.58 17.37 17.37 0 01-13 29.32 13.42 13.42 0 005.93 4.23A17.68 17.68 0 0048 39.12a17.68 17.68 0 00-9.2-23.25z"/></svg>',waxing_gibbous:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_waxing_gibbous_a" x1="24.28" x2="40.93" y1="18.15" y2="47" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_waxing_gibbous_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M49 27a16.78 16.78 0 00-19.45-11.9 17.2 17.2 0 011.73 4 17.76 17.76 0 01-13.82 22.19A16.83 16.83 0 0037 48.74 17.83 17.83 0 0049 27z"/></svg>',full_moon:de,waning_gibbous:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_waning_gibbous_a" x1="20.23" x2="37.75" y1="18.52" y2="48.86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_waning_gibbous_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M44.68 40.83a17.84 17.84 0 01-11.93-21.72 17.2 17.2 0 011.73-4A16.78 16.78 0 0015 27a17.83 17.83 0 0012 21.74 16.83 16.83 0 0019.58-7.45 18 18 0 01-1.9-.46z"/></svg>',last_quarter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_last_quarter_a" x1="19.64" x2="37.19" y1="18.96" y2="49.35" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_last_quarter_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.06 33.31a17.52 17.52 0 013.26-19 17.44 17.44 0 00-7.11 1.58A17.68 17.68 0 0016 39.12a17.68 17.68 0 0023.43 8.72 13.45 13.45 0 005.94-4.23 17.51 17.51 0 01-16.31-10.3z"/></svg>',waning_crescent:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="moon_waning_crescent_a" x1="17.54" x2="35.04" y1="20.14" y2="50.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#moon_waning_crescent_a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M41.25 46.82c-16.7.48-25.61-19.52-14.07-31.61h0l.08-.06a18.38 18.38 0 00-2.38.86A17.5 17.5 0 1039.12 48a18.21 18.21 0 002.23-1.19z"/></svg>'},ue=['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_1_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_1_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_1_a"/></defs><path fill="none" stroke="url(#wind_beaufort_1_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2.1s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_1_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.525s" dur="2.1s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M51 34.82a.52.52 0 01.11.39v9.64a.51.51 0 01-.11.39.52.52 0 01-.4.12h-.85a.43.43 0 01-.51-.51V37l-2.1 1.17a.62.62 0 01-.46.12.57.57 0 01-.3-.31l-.38-.69a.58.58 0 01-.07-.4.67.67 0 01.31-.29l2.93-1.68a1.34 1.34 0 01.72-.21h.71a.52.52 0 01.4.11z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_3_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_3_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_3_a"/></defs><path fill="none" stroke="url(#wind_beaufort_3_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.9s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_3_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.475s" dur="1.9s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M51.44 39.79A2.54 2.54 0 0153 42.32a3 3 0 01-1 2.38 4.15 4.15 0 01-2.88.88q-3.18 0-4.07-2.52a.47.47 0 01.33-.66l.81-.28a.55.55 0 01.41 0 .69.69 0 01.25.34 2.07 2.07 0 00.75 1.06 2.74 2.74 0 001.52.33q1.89 0 1.89-1.53t-1.56-1.5h-1.58a.58.58 0 01-.4-.1.53.53 0 01-.11-.4v-.68a.55.55 0 01.11-.4.58.58 0 01.4-.11h1.29a1.65 1.65 0 001.14-.38 1.31 1.31 0 00.43-1c0-1-.56-1.46-1.68-1.46a2.5 2.5 0 00-1.42.32 2.21 2.21 0 00-.71 1.07.6.6 0 01-.24.33.56.56 0 01-.42 0l-.81-.29a.46.46 0 01-.33-.66 3.56 3.56 0 011.38-1.96 4.69 4.69 0 012.58-.62 3.8 3.8 0 012.6.81 2.82 2.82 0 01.93 2.24 2.4 2.4 0 01-1.17 2.26z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_5_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_5_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_5_a"/></defs><path fill="none" stroke="url(#wind_beaufort_5_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.7s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_5_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.425s" dur="1.7s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M52.37 34.82a.57.57 0 01.11.39V36a.42.42 0 01-.51.51h-4.29l-.22 2.21h1.81a3.62 3.62 0 012.71.95 3.32 3.32 0 01.94 2.33 3.42 3.42 0 01-1 2.52 3.69 3.69 0 01-2.75 1c-2.12 0-3.48-.81-4.07-2.45a.46.46 0 01.32-.66l.83-.28a.54.54 0 01.4 0 .62.62 0 01.24.36 2.15 2.15 0 002.26 1.31 1.8 1.8 0 001.31-.47 1.71 1.71 0 00.47-1.33 1.53 1.53 0 00-.48-1.19 1.82 1.82 0 00-1.28-.45H46a.55.55 0 01-.45-.14.6.6 0 01-.09-.46l.45-4.36a1 1 0 01.22-.58 1 1 0 01.61-.15H52a.55.55 0 01.37.15z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="wind_beaufort_7_a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="wind_beaufort_7_b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#wind_beaufort_7_a"/></defs><path fill="none" stroke="url(#wind_beaufort_7_a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#wind_beaufort_7_b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-.375s" dur="1.5s" repeatCount="indefinite" values="-39; 39"/></path><path fill="#374151" d="M52.69 34.82a.52.52 0 01.11.39v.53a1.94 1.94 0 01-.15.72l-3.79 8.44a.64.64 0 01-.29.37 1.65 1.65 0 01-.66.09h-.82c-.33 0-.42-.17-.26-.51l3.81-8.39h-4.83a.43.43 0 01-.51-.46v-.74a.52.52 0 01.12-.39.51.51 0 01.39-.11h6.48a.53.53 0 01.4.06z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="thunderstorms_rain_b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="thunderstorms_rain_a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="thunderstorms_rain_c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_rain_a"/><linearGradient id="thunderstorms_rain_d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#thunderstorms_rain_a"/><linearGradient id="thunderstorms_rain_e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#thunderstorms_rain_b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#thunderstorms_rain_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_rain_c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#thunderstorms_rain_d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#thunderstorms_rain_e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="hurricane_a" x1="21.97" x2="42.03" y1="14.63" y2="49.37" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/><animateTransform attributeName="gradientTransform" dur="1s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></linearGradient></defs><path fill="none" stroke="url(#hurricane_a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43 32a11 11 0 11-11-11 11 11 0 0111 11zM25 14.61l-.48 1a33.68 33.68 0 00-3.42 17.82h0M39 49.39l.48-1a33.68 33.68 0 003.42-17.82h0"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="rotate" values="360 32 32; 0 32 32"/></path></svg>'];function me(t,e,i,r){if("uv_index"===e&&void 0!==i){const t=Math.min(Math.max(Math.round(i),0),11);return he[t]??he[0]}if("wind_speed"===e&&void 0!==i){const t="imperial"===r?Ot(i,"mph"):i;let e=gt.length-1;for(let i=0;i<gt.length;i++)if(t<=gt[i].max){e=i;break}return ce[`wind-beaufort-${e}`]??ce["wind-beaufort-0"]}if("pressure"===e&&void 0!==i)return i>1013?ce["pressure-high"]:ce["pressure-low"];if("imperial"===r){if("thermometer-celsius"===t)return ce["thermometer-fahrenheit"];if("thermometer-glass-celsius"===t)return ce["thermometer-glass-fahrenheit"]}return ce[t]??le}function ye(t){return pe[t]??pe["not-available"]}function _e(t){return fe[t]??de}let ge=class extends dt{constructor(){super(...arguments),this._schema=[{name:"device_id",label:"Weather Station (ha-wu-mqtt-bridge)",selector:{device:{integration:"mqtt"}}},{name:"weather_entity",label:"Weather Entity (alternative to device)",selector:{entity:{domain:"weather"}}},{name:"aqi_entity",label:"PM2.5 Sensor (for AQI badge)",selector:{entity:{domain:"sensor"}}},{name:"title",label:"Card Title",selector:{text:{}}},{name:"animations",label:"Animations",selector:{boolean:{}}},{name:"gauge_max",label:"Gauge Max Speed (km/h)",selector:{number:{min:10,max:200,step:10,mode:"slider"}}},{name:"latitude",label:"Latitude (for dynamic sky, leave empty to use HA default)",selector:{number:{min:-90,max:90,step:1e-4,mode:"box"}}},{name:"longitude",label:"Longitude (for dynamic sky, leave empty to use HA default)",selector:{number:{min:-180,max:180,step:1e-4,mode:"box"}}}]}setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!t.detail)return;const e={...this._config,...t.detail.value};this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:L``}static{this.styles=a`
    :host {
      display: block;
    }
  `}};t([mt()],ge.prototype,"_config",void 0),ge=t([ht("weather-dashboard-card-editor")],ge);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke=2;class we{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class xe extends we{constructor(t){if(super(t),this.it=F,t.type!==ke)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===F||null==t)return this._t=void 0,this.it=t;if(t===W)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}xe.directiveName="unsafeHTML",xe.resultType=1;const be=(t=>(...e)=>({_$litDirective$:t,values:e}))(xe),ve=a`
  .weather-scene-panel {
    display: flex;
    flex-direction: column;
  }

  .weather-scene {
    position: relative;
    width: calc(100% - 32px);
    aspect-ratio: 16 / 11;
    margin: 12px 16px 8px;
    border-radius: 8px;
    overflow: hidden;
    transition: background 0.5s ease;
  }

  .weather-scene.sky-day {
    background: linear-gradient(180deg, #5b9bd5 0%, #7ab8e0 60%, #a0cce8 100%);
  }

  .weather-scene.sky-night {
    background: linear-gradient(180deg, #0a1628 0%, #162040 40%, #1a2a4a 80%, #1e3050 100%);
  }

  .weather-scene.sky-overcast {
    background: linear-gradient(180deg, #6a7a8a 0%, #8a9aaa 60%, #a0aab5 100%);
  }

  .weather-scene.sky-stormy {
    background: linear-gradient(180deg, #3a4050 0%, #4a5060 40%, #5a6070 80%, #4a5565 100%);
  }

  .weather-scene.sky-night-overcast {
    background: linear-gradient(180deg, #1a2030 0%, #2a3040 40%, #3a4555 80%, #354050 100%);
  }

  .weather-icon-container {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -55%);
    width: 45%;
    max-width: 150px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .weather-icon-container:hover {
    transform: translate(-50%, -55%) scale(1.05);
  }

  .weather-icon-container:active {
    transform: translate(-50%, -55%) scale(0.97);
  }

  .weather-icon-container svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .weather-info {
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
    padding: 12px 16px;
    background: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 100%);
    border-radius: 0 0 8px 0;
    width: 60%;
  }

  .info-clickable {
    display: inline-block;
    cursor: pointer;
    padding: 4px 8px;
    margin: -4px -8px;
    border-radius: 8px;
    transition: background 0.2s ease;
  }
  .info-clickable:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .info-clickable:active {
    background: rgba(255, 255, 255, 0.14);
  }
  .info-clickable:focus-visible {
    outline: 2px solid rgba(100, 180, 255, 0.6);
    outline-offset: 2px;
  }

  .condition-text {
    font-size: 0.9rem;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  .temp-display {
    font-size: 2.2rem;
    font-weight: 700;
    text-shadow: 0 2px 6px rgba(0,0,0,0.3);
    line-height: 1.1;
  }

  .scene-details {
    display: flex;
    gap: 10px;
    font-size: 0.7rem;
    opacity: 0.85;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .moon-icon {
    position: absolute;
    top: 8px;
    left: 12px;
    width: 36px;
    height: 36px;
    opacity: 0.85;
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.4));
    pointer-events: none;
  }

  .moon-icon svg {
    width: 100%;
    height: 100%;
  }

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: none;
  }

  .weather-scene.show-stars .stars {
    display: block;
  }

  /* AQI badge is positioned by its own shadow DOM styles */

  :host([narrow]) .weather-scene {
    aspect-ratio: 16 / 10;
  }

  :host([narrow]) .temp-display {
    font-size: 1.8rem;
  }

`,$e="M41.1,101.17c-20.64-18.34-16.35-28.5-15.85-54.84c0-0.24,0.04-0.47,0.12-0.67l-5.19-1.63c-0.74-16.4,8.75-26.21,20.52-30.93c4.28-1.72-2.89-11.1,6.97-7.49c13.17,4.82,42.39,11.38,49.31,19.65c5.62,6.72,5.85,10.36,5.72,19.13c-0.04,2.85-0.48,5.34-1.79,6.27c-0.61,0.43-1.33,0.6-2.18,0.52c0,16.27,2.19,31.67-9.56,44.92c-6.97,7.86-17.48,12.9-28.06,12.74c-4.17-0.07-6.75-0.66-10.35-2.01C47.21,105.49,44.27,103.98,41.1,101.17z",Me="M53.28,103.38c2.09,0.83,5.99,1.24,8.26,1.24c4.47,0,8.99-1.01,13.19-2.93c4.22-1.92,8.11-4.73,11.3-8.33c10.71-12.09,8.51-27.51,8.51-42.42h0.01c-0.04-1.33-0.24-2.54-0.6-3.65c-0.35-1.07-0.85-2-1.52-2.79c-2.56-3-4.98-2.88-8.44-2.7c-0.32,0.01-0.62,0.03-1.07,0.06c-13.68,0.6-22.64,0.59-29.91-0.04c-6.7-0.6-11.96-1.7-18.1-3.32c-0.58,1.36-1.25,2.69-2.03,3.98c-1,1.65-2.16,3.23-3.49,4.73c-0.46,24.62-4.75,33.82,14.46,50.87c1.09,0.97,2.24,1.83,3.43,2.57C48.99,101.7,51.51,102.81,53.28,103.38z",ze="M77.25,62.33c2.31,0,4.19,1.87,4.19,4.18c0,2.31-1.87,4.19-4.19,4.19s-4.19-1.88-4.19-4.19C73.06,64.2,74.94,62.33,77.25,62.33z",Ce="M45.61,62.33c2.31,0,4.19,1.87,4.19,4.18c0,2.31-1.87,4.19-4.19,4.19c-2.31,0-4.19-1.88-4.19-4.19C41.43,64.2,43.3,62.33,45.61,62.33z",Ue=["M49,87 C49,87 55,97 61,97 C67,97 73,87 73,87 C73,87 67,93 61,93 C55,93 49,87 49,87 Z","M54.12,90.87c-1.01-0.55-1.37-1.81-0.81-2.81c0.55-1,1.81-1.37,2.81-0.81c1.9,1.05,3.74,1.62,5.5,1.66c1.71,0.03,3.4-0.44,5.07-1.46c0.97-0.6,2.24-0.3,2.84,0.67c0.6,0.97,0.3,2.25-0.67,2.84c-2.37,1.46-4.81,2.13-7.31,2.08C59.07,92.98,56.6,92.24,54.12,90.87z","M50,88 L72,88 L72,90.5 L50,90.5 Z","M49,92 C49,92 55,86 61,86 C67,86 73,92 73,92 C73,92 67,89 61,89 C55,89 49,92 49,92 Z","M47,94 C47,94 54,84 61,84 C68,84 75,94 75,94 C75,94 68,88 61,88 C54,88 47,94 47,94 Z","M55,83 C55,79 58,77 61,77 C64,77 67,79 67,83 L67,93 C67,97 64,99 61,99 C58,99 55,97 55,93 Z","M53,82 C53,77 57,74 61,74 C65,74 69,77 69,82 L69,95 C69,100 65,103 61,103 C57,103 53,100 53,95 Z"];let Ge=class extends dt{constructor(){super(...arguments),this.pm25=0}static{this.styles=a`
    :host {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }

    .aqi-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .aqi-face {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aqi-face svg {
      width: 40px;
      height: 40px;
    }

    .aqi-value {
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      line-height: 1;
    }

    .aqi-label {
      font-size: 0.5rem;
      color: #fff;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    .aqi-badge {
      cursor: pointer;
    }

    .aqi-badge:active {
      transform: scale(0.93);
    }
  `}_getLevel(){for(let t=0;t<Mt.length;t++)if(this.pm25<=Mt[t].max)return t;return Mt.length-1}_renderFace(t,e){const i=t>=5,r=[$e,Me,ze,Ce,t>=4?"M73,56 L85,52 L85,54.5 L73,58.5 Z M49,56 L37,52 L37,54.5 L49,58.5 Z":"M86.77,60.28c0.6,0.8,0.44,1.95-0.37,2.55c-0.8,0.6-1.95,0.44-2.55-0.37c-1.46-1.95-3.01-2.97-4.65-3.36c-1.67-0.4-3.49-0.14-5.39,0.49c-0.96,0.32-1.99-0.19-2.3-1.15c-0.31-0.96,0.19-1.99,1.15-2.3c2.49-0.84,4.97-1.16,7.36-0.59C82.47,56.13,84.75,57.59,86.77,60.28z M42.85,55.55c2.39-0.57,4.87-0.25,7.36,0.59c0.96,0.32,1.47,1.35,1.15,2.3c-0.32,0.96-1.35,1.47-2.3,1.15c-1.88-0.64-3.71-0.88-5.39-0.49c-1.63,0.39-3.2,1.42-4.65,3.36c-0.6,0.8-1.74,0.97-2.55,0.37c-0.8-0.6-0.97-1.74-0.37-2.55C38.14,57.59,40.42,56.13,42.85,55.55z",Ue[t]??Ue[4]].join(" ");return V`
      <svg viewBox="18 -5 90 115">
        <path fill="${e}" fill-rule="evenodd" clip-rule="evenodd" d="${r}"/>
        ${i?V`
          <!-- Mask straps -->
          <line x1="38" y1="78" x2="28" y2="66" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="84" y1="78" x2="94" y2="66" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Mask body -->
          <path fill="${e}" d="M38,75 C38,72 42,70 48,70 L74,70 C80,70 84,72 84,75 L84,97 C84,102 78,106 61,106 C44,106 38,102 38,97 Z"/>
          <!-- Mask fold lines -->
          <line x1="42" y1="82" x2="80" y2="82" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
          <line x1="42" y1="88" x2="80" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
          <line x1="42" y1="94" x2="80" y2="94" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
        `:""}
      </svg>
    `}_onClick(){this.dispatchEvent(new CustomEvent("aqi-click",{bubbles:!0,composed:!0}))}render(){const t=this._getLevel(),e=Mt[t];return L`
      <div class="aqi-badge"
           role="button"
           tabindex="0"
           @click=${this._onClick}
           @keydown=${t=>{"Enter"===t.key&&this._onClick()}}>
        <div class="aqi-face">
          ${this._renderFace(t,e.color)}
        </div>
        <div class="aqi-value">${Math.round(this.pm25)}</div>
        <div class="aqi-label">${e.label}</div>
      </div>
    `}};t([ut({type:Number})],Ge.prototype,"pm25",void 0),Ge=t([ht("wdb-aqi-badge")],Ge);const Se=Array.from({length:40},()=>({cx:400*Math.random(),cy:200*Math.random(),r:.5+1.2*Math.random(),opacity:.3+.5*Math.random(),dur:2+4*Math.random(),delay:3*Math.random()}));let Ne=class extends dt{constructor(){super(...arguments),this.condition="clear-day",this.isNight=!1,this.elevation=10,this.tempUnit="°C",this.windSpeedUnit="km/h",this.rainRateUnit="mm/h",this.narrow=!1,this.useDynamicSky=!1}static{this.styles=ve}_getSkyStyle(){if(!this.useDynamicSky)return"";return`background: ${Jt(Qt({sunElevation:this.elevation,solarRadiation:this.solarRadiation,uvIndex:this.uvIndex,humidity:this.humidity,rainRate:this.rainRate,moonIllumination:this.moonIllumination,isNight:this.isNight}))}`}_getSkyClass(){if(this.useDynamicSky)return"";if(this.condition.startsWith("thunderstorms"))return"sky-stormy";return["rain","cloudy","overcast-day","overcast-night","fog-day","fog-night","partly-cloudy-day-rain","partly-cloudy-night-rain","partly-cloudy-day-drizzle","partly-cloudy-night-drizzle","partly-cloudy-day-smoke","partly-cloudy-night-smoke"].includes(this.condition)?this.elevation<0?"sky-night-overcast":"sky-overcast":this.elevation<0?"sky-night":"sky-day"}_renderStars(){return L`
      <div class="stars">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
          ${Se.map(t=>V`
            <circle cx=${t.cx} cy=${t.cy} r=${t.r} fill="#fff" opacity=${t.opacity}>
              <animate attributeName="opacity" values="${t.opacity};${.3*t.opacity};${t.opacity}" dur="${t.dur}s" begin="${t.delay}s" repeatCount="indefinite"/>
            </circle>
          `)}
        </svg>
      </div>
    `}_renderMoon(){if(this.elevation>=-6)return"";if(!this.moonPhase)return"";if(!xt.includes(this.condition))return"";const t=_e(this.moonPhase);return L`
      <div class="moon-icon">
        ${be(t)}
      </div>
    `}_onIconClick(){this.dispatchEvent(new CustomEvent("icon-click",{bubbles:!0,composed:!0}))}_onIconKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._onIconClick())}_onInfoClick(){this.dispatchEvent(new CustomEvent("info-click",{bubbles:!0,composed:!0}))}_onInfoKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._onInfoClick())}render(){const t=this._getSkyClass(),e=this._getSkyStyle(),i=wt.includes(this.condition),r=ye(this.condition),o=kt[this.condition]??this.condition;return L`
      <div class="weather-scene-panel">
        <div class="weather-scene ${t} ${i?"show-stars":""}"
             style=${e}>
          <!-- AQI Badge -->
          ${void 0!==this.aqiValue?L`
            <wdb-aqi-badge .pm25=${this.aqiValue}></wdb-aqi-badge>
          `:""}

          <!-- Stars (night) -->
          ${i?this._renderStars():""}

          <!-- Moon (night, clear skies) -->
          ${this._renderMoon()}

          <!-- Weather icon (clickable — opens sky history) -->
          <div class="weather-icon-container"
               role="button"
               tabindex="0"
               aria-label="Show sky condition history"
               @click=${this._onIconClick}
               @keydown=${this._onIconKeyDown}>
            ${be(r)}
          </div>

          <!-- Info overlay -->
          <div class="weather-info">
            <div class="info-clickable"
                 role="button"
                 tabindex="0"
                 aria-label="Show temperature history"
                 @click=${this._onInfoClick}
                 @keydown=${this._onInfoKeyDown}>
              <div class="condition-text">${o}</div>
              ${void 0!==this.temperature?L`
                <div class="temp-display">${Math.round(this.temperature)}${this.tempUnit}</div>
              `:""}
              <div class="scene-details">
                ${void 0!==this.rainRate&&this.rainRate>=.1?L`
                  <span>Rain ${this.rainRate<10?this.rainRate.toFixed(1):Math.round(this.rainRate)} ${this.rainRateUnit}</span>
                `:void 0!==this.windSpeed&&this.windSpeed>5?L`
                  <span>Wind ${Math.round(this.windSpeed)} ${this.windSpeedUnit}</span>
                `:void 0!==this.uvIndex?L`
                  <span>UV ${Math.round(this.uvIndex)}</span>
                `:""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};t([ut()],Ne.prototype,"condition",void 0),t([ut({type:Boolean})],Ne.prototype,"isNight",void 0),t([ut({type:Number})],Ne.prototype,"elevation",void 0),t([ut({type:Number})],Ne.prototype,"temperature",void 0),t([ut()],Ne.prototype,"tempUnit",void 0),t([ut({type:Number})],Ne.prototype,"uvIndex",void 0),t([ut({type:Number})],Ne.prototype,"windSpeed",void 0),t([ut()],Ne.prototype,"windSpeedUnit",void 0),t([ut({type:Number})],Ne.prototype,"rainRate",void 0),t([ut()],Ne.prototype,"rainRateUnit",void 0),t([ut({type:Number})],Ne.prototype,"solarRadiation",void 0),t([ut({type:Number})],Ne.prototype,"humidity",void 0),t([ut({type:Number})],Ne.prototype,"moonIllumination",void 0),t([ut({type:Number})],Ne.prototype,"aqiValue",void 0),t([ut()],Ne.prototype,"moonPhase",void 0),t([ut({type:Boolean})],Ne.prototype,"narrow",void 0),t([ut({type:Boolean})],Ne.prototype,"useDynamicSky",void 0),Ne=t([ht("wdb-weather-scene")],Ne);const Ae=a`
  :host {
    display: contents;
  }

  /* ─── Overlay Container ─── */

  .history-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .history-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .history-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  /* ─── Panel ─── */

  .history-panel {
    position: relative;
    z-index: 1;
    background: rgba(10, 15, 30, 0.95);
    border-radius: 10px 10px 0 0;
    padding: 12px 0 10px;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    max-height: 65%;
  }

  .history-overlay.open .history-panel {
    transform: translateY(0);
  }

  .history-panel:focus {
    outline: none;
  }

  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .history-title {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.6);
  }

  .history-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    line-height: 1;
    transition: color 0.15s, background 0.15s;
  }

  .history-close:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
  }

  /* ─── Timeline ─── */

  .history-timeline {
    display: flex;
    gap: 6px;
    padding: 12px 14px 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .history-timeline::-webkit-scrollbar {
    display: none;
  }

  /* ─── Entry ─── */

  .history-entry {
    flex: 0 0 auto;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 72px;
  }

  /* ─── Thumbnail ─── */

  .history-thumb {
    position: relative;
    width: 72px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: border-color 0.15s;
  }

  .history-entry.current .history-thumb {
    border-color: rgba(255, 255, 255, 0.35);
  }

  .thumb-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    width: 60%;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));
  }

  .thumb-icon svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .thumb-moon {
    position: absolute;
    top: 3px;
    left: 4px;
    width: 12px;
    height: 12px;
    opacity: 0.8;
  }

  .thumb-moon svg {
    width: 100%;
    height: 100%;
  }

  .thumb-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* ─── Labels ─── */

  .history-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .history-time {
    font-size: 0.62rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }

  .history-temp {
    font-size: 0.58rem;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ─── Connector ─── */

  .history-connector {
    display: flex;
    align-items: center;
    padding: 2px 14px 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .history-connector::-webkit-scrollbar {
    display: none;
  }

  .connector-segment {
    flex: 0 0 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Account for gap between entries */
  .connector-segment + .connector-line {
    flex: 0 0 6px;
  }

  .connector-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
  }

  .connector-segment.current .connector-dot {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
  }

  .connector-line {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  /* ─── Loading State ─── */

  .history-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    opacity: 0.5;
    font-size: 0.78rem;
  }

  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ─── Empty State ─── */

  .history-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    opacity: 0.4;
    font-size: 0.78rem;
  }
`;function Oe(t){return class extends t{connectedCallback(){super.connectedCallback(),this._onDocClick=this._onDocClick.bind(this)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick,!0)}updated(t){super.updated(t),t.has("open")&&(this.open?(requestAnimationFrame(()=>{this._panel?.focus()}),requestAnimationFrame(()=>{document.addEventListener("click",this._onDocClick,!0)})):document.removeEventListener("click",this._onDocClick,!0))}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_onDocClick(t){if(!this.open||!this._panel)return;t.composedPath().includes(this._panel)||this._close()}_onKeyDown(t){"Escape"===t.key&&this._close()}}}const Ee=[{cx:10,cy:8,r:.6,opacity:.5},{cx:32,cy:14,r:.8,opacity:.4},{cx:55,cy:6,r:.5,opacity:.45},{cx:18,cy:30,r:.7,opacity:.35},{cx:48,cy:22,r:.55,opacity:.5},{cx:62,cy:35,r:.6,opacity:.3}];let He=class extends(Oe(dt)){constructor(){super(...arguments),this.entries=[],this.loading=!1,this.open=!1,this.tempUnit="°C"}static{this.styles=Ae}updated(t){if(super.updated(t),t.has("entries")&&this.open&&this.entries.length>0&&this._scrollToEnd(),t.has("open")&&this.open&&this._panel){const t=()=>{this._panel?.removeEventListener("transitionend",t),this._scrollToEnd()};this._panel.addEventListener("transitionend",t)}}_scrollToEnd(){requestAnimationFrame(()=>{this._timeline&&(this._timeline.scrollLeft=this._timeline.scrollWidth),this._connector&&(this._connector.scrollLeft=this._connector.scrollWidth)})}_onTimelineScroll(){if(!this._timeline||!this._connector)return;const t=this._timeline,e=this._connector,i=t.scrollWidth-t.clientWidth,r=e.scrollWidth-e.clientWidth;i>0&&r>0&&(e.scrollLeft=t.scrollLeft/i*r)}_formatTime(t){return At(t,!0)}_renderThumb(t,e){const i=`background: ${Jt(t.skyGradient)}`,r=ye(t.condition);return L`
      <div class="history-entry ${e?"current":""}">
        <div class="history-thumb" style=${i}>
          ${t.showStars?L`
            <svg class="thumb-stars" viewBox="0 0 72 50" preserveAspectRatio="xMidYMid slice">
              ${Ee.map(t=>V`
                <circle cx=${t.cx} cy=${t.cy} r=${t.r} fill="#fff" opacity=${t.opacity}/>
              `)}
            </svg>
          `:""}
          ${t.showMoon&&t.moonPhase?L`
            <div class="thumb-moon">${be(_e(t.moonPhase))}</div>
          `:""}
          <div class="thumb-icon">${be(r)}</div>
        </div>
        <div class="history-label">
          <span class="history-time">${this._formatTime(t.timestamp)}</span>
          ${void 0!==t.temperature?L`
            <span class="history-temp">${Math.round(t.temperature)}${this.tempUnit}</span>
          `:""}
        </div>
      </div>
    `}_renderConnector(){return this.entries.map((t,e)=>{const i=e===this.entries.length-1;return L`
        ${e>0?L`<div class="connector-line"></div>`:""}
        <div class="connector-segment ${i?"current":""}">
          <div class="connector-dot"></div>
        </div>
      `})}render(){return L`
      <div
        class="history-overlay ${this.open?"open":""}"
        role="dialog"
        aria-label="Sky condition history"
      >
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <div class="history-header">
            <span class="history-title">Sky History</span>
            <button
              class="history-close"
              @click=${this._close}
              aria-label="Close sky history"
            >✕</button>
          </div>

          ${this.loading?L`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading sky history...
            </div>
          `:0===this.entries.length?L`
            <div class="history-empty">No sky history available</div>
          `:L`
            <div class="history-timeline" @scroll=${this._onTimelineScroll}>
              ${this.entries.map((t,e)=>this._renderThumb(t,e===this.entries.length-1))}
            </div>

            <div class="history-connector">
              ${this._renderConnector()}
            </div>
          `}
        </div>
      </div>
    `}};t([ut({type:Array})],He.prototype,"entries",void 0),t([ut({type:Boolean})],He.prototype,"loading",void 0),t([ut({type:Boolean})],He.prototype,"open",void 0),t([ut()],He.prototype,"tempUnit",void 0),t([yt(".history-panel")],He.prototype,"_panel",void 0),t([yt(".history-timeline")],He.prototype,"_timeline",void 0),t([yt(".history-connector")],He.prototype,"_connector",void 0),He=t([ht("wdb-sky-history")],He);const Te=a`
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .compass-needle {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;let Be=class extends dt{constructor(){super(...arguments),this.bearing=0,this._rotation=0}static{this.styles=Te}updated(t){if(t.has("bearing")){const e=t.get("bearing")??0;this._rotation=function(t,e){let i=t-e;return i>180&&(i-=360),i<-180&&(i+=360),e+i}(this.bearing,this._rotation??e)}}_renderTicks(){const t=[];for(let e=0;e<360;e+=10){const i=e%30==0,r=95,o=r-(i?18:14),s=e*Math.PI/180;t.push(V`
        <line
          x1=${100+r*Math.sin(s)}
          y1=${100-r*Math.cos(s)}
          x2=${100+o*Math.sin(s)}
          y2=${100-o*Math.cos(s)}
          stroke="rgba(255,255,255,0.4)"
          stroke-width=${i?1.5:1}
        />
      `)}return t}_renderDegreeNumbers(){return[30,60,120,150,210,240,300,330].map(t=>{const e=t*Math.PI/180;return V`
        <text
          x=${100+72*Math.sin(e)}
          y=${100-72*Math.cos(e)}
          text-anchor="middle"
          dominant-baseline="central"
          fill="rgba(255,255,255,0.35)"
          font-size="7"
        >${t}</text>
      `})}render(){return L`
      <svg viewBox="0 0 200 200">
        <!-- Background -->
        <defs>
          <radialGradient id="compass-bg">
            <stop offset="0%" stop-color="#2a3a5c"/>
            <stop offset="100%" stop-color="#1a2a4a"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#compass-bg)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

        <!-- Ticks -->
        ${this._renderTicks()}

        <!-- Degree numbers -->
        ${this._renderDegreeNumbers()}

        <!-- Cardinal directions -->
        <text x="100" y="32" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">N</text>
        <text x="168" y="104" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">E</text>
        <text x="100" y="178" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">S</text>
        <text x="32" y="104" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">W</text>

        <!-- Intercardinal directions -->
        <text x="148" y="56" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">NE</text>
        <text x="148" y="152" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">SE</text>
        <text x="52" y="152" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">SW</text>
        <text x="52" y="56" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">NW</text>

        <!-- Compass rose petals -->
        <polygon points="100,40 108,100 100,70 92,100" fill="rgba(255,255,255,0.08)"/>
        <polygon points="100,160 108,100 100,130 92,100" fill="rgba(255,255,255,0.08)"/>
        <polygon points="40,100 100,92 70,100 100,108" fill="rgba(255,255,255,0.08)"/>
        <polygon points="160,100 100,92 130,100 100,108" fill="rgba(255,255,255,0.08)"/>

        <!-- Needle -->
        <g class="compass-needle" style="transform-origin:100px 100px;transform:rotate(${this._rotation}deg)">
          <polygon points="100,28 96,100 100,92 104,100" fill="#fff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
          <polygon points="100,172 96,100 100,108 104,100" fill="rgba(255,255,255,0.3)"/>
        </g>

        <!-- Center dot -->
        <circle cx="100" cy="100" r="5" fill="#37474F" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="3" fill="#90A4AE"/>
      </svg>
    `}};t([ut({type:Number})],Be.prototype,"bearing",void 0),t([mt()],Be.prototype,"_rotation",void 0),Be=t([ht("wdb-wind-compass")],Be);const De=a`
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .gauge-needle {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`,Pe=["#1976D2","#00ACC1","#43A047","#FDD835","#FB8C00","#E53935"],Ie=150,je=150,Re=90,qe=210,Le=240;function Ve(t,e,i,r){const o=r*Math.PI/180;return[t+i*Math.cos(o),e-i*Math.sin(o)]}let We=class extends dt{constructor(){super(...arguments),this.speed=0,this.maxSpeed=50}get _safeMax(){return this.maxSpeed>0?this.maxSpeed:50}static{this.styles=De}_renderColorBands(){const t=Le/Pe.length;return Pe.map((e,i)=>{const r=qe-i*t;return V`
        <path
          d=${function(t,e){const[i,r]=Ve(Ie,je,Re,t),[o,s]=Ve(Ie,je,Re,e),a=t-e;return`M ${i},${r} A 90,90 0 ${Math.abs(a)>180?1:0},1 ${o},${s}`}(r,r-t)}
          fill="none"
          stroke=${e}
          stroke-width="18"
          stroke-linecap="butt"
        />
      `})}_renderTicks(){const t=[],e=this._safeMax>=100?20:10,i=this._safeMax>=100?10:2;for(let r=0;r<=this._safeMax;r+=i){const i=r/this._safeMax,o=qe-i*Le,s=r%e===0,a=r%(e/2)==0&&!s,n=96,l=s?106:a?102:99,[d,c]=Ve(Ie,je,n,o),[h,p]=Ve(Ie,je,l,o);if(t.push(V`
        <line
          x1=${d} y1=${c} x2=${h} y2=${p}
          stroke="rgba(255,255,255,${s?.8:a?.5:.3})"
          stroke-width=${s?1.5:a?1:.7}
        />
      `),s){const[e,i]=Ve(Ie,je,112,o);t.push(V`
          <text
            x=${e} y=${i}
            text-anchor="middle"
            dominant-baseline="central"
            fill="rgba(255,255,255,0.7)"
            font-size="10"
            font-weight="600"
          >${r}</text>
        `)}}return t}_renderIcons(){return[{angle:215,idx:0},{angle:162,idx:1},{angle:114,idx:2},{angle:66,idx:3},{angle:18,idx:4},{angle:-35,idx:5}].map(({angle:t,idx:e})=>{const[i,r]=Ve(Ie,je,122,t),o=18;return V`
        <foreignObject x=${i-9} y=${r-9} width=${o} height=${o}>
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${o}px;height:${o}px;opacity:0.6">
            ${be((s=e,ue[Math.min(s,ue.length-1)]))}
          </div>
        </foreignObject>
      `;var s})}_renderNeedle(){const t=Math.min(this.speed/this._safeMax,1);return V`
      <g class="gauge-needle" style="transform-origin:${Ie}px ${je}px;transform:rotate(${-(qe-t*Le)}deg)">
        <line x1=${Ie} y1=${je} x2=${236} y2=${je} stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <circle cx=${Ie} cy=${je} r="8" fill="#546E7A"/>
      <circle cx=${Ie} cy=${je} r="4.5" fill="#90A4AE"/>
    `}render(){return L`
      <svg viewBox="35 18 230 215">
        <!-- Color bands -->
        ${this._renderColorBands()}

        <!-- Ticks and numbers -->
        ${this._renderTicks()}

        <!-- Icons -->
        ${this._renderIcons()}

        <!-- Unit label -->
        <text x=${Ie} y=${168} text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">km/h</text>

        <!-- Needle -->
        ${this._renderNeedle()}
      </svg>
    `}};t([ut({type:Number})],We.prototype,"speed",void 0),t([ut({type:Number})],We.prototype,"maxSpeed",void 0),We=t([ht("wdb-wind-gauge")],We);const Fe=a`
  :host {
    display: block;
  }

  .stat-card {
    background: var(--wdb-stat-bg, rgba(100, 149, 237, 0.18));
    border: 1px solid var(--wdb-stat-border, rgba(255, 255, 255, 0.08));
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon svg {
    width: 32px;
    height: 32px;
  }

  .stat-card.clickable {
    cursor: pointer;
    transition: background 0.15s ease, transform 0.12s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .stat-card.clickable:hover {
    background: var(--wdb-stat-bg-hover, rgba(100, 149, 237, 0.28));
  }

  .stat-card.clickable:active {
    transform: scale(0.97);
  }

  .stat-name {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  .stat-value {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;let Ze=class extends dt{constructor(){super(...arguments),this.name="",this.value="",this.unit="",this.icon="",this.entityId="",this.statKey=""}static{this.styles=Fe}_onClick(){this.entityId&&this.dispatchEvent(new CustomEvent("stat-click",{bubbles:!0,composed:!0,detail:{key:this.statKey,entityId:this.entityId,name:this.name,unit:this.unit,icon:this.icon}}))}_onKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._onClick())}render(){const t=!!this.entityId;return L`
      <div
        class="stat-card ${t?"clickable":""}"
        role=${t?"button":"presentation"}
        tabindex=${t?"0":"-1"}
        aria-label=${t?`Show ${this.name} history`:""}
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
      >
        <div class="stat-icon">${be(this.icon)}</div>
        <div class="stat-content">
          <div class="stat-name">${this.name}</div>
          <div class="stat-value">${this.value}${this.unit?` ${this.unit}`:""}</div>
        </div>
      </div>
    `}};t([ut()],Ze.prototype,"name",void 0),t([ut()],Ze.prototype,"value",void 0),t([ut()],Ze.prototype,"unit",void 0),t([ut()],Ze.prototype,"icon",void 0),t([ut()],Ze.prototype,"entityId",void 0),t([ut()],Ze.prototype,"statKey",void 0),Ze=t([ht("wdb-stat-card")],Ze);const Ke=a`
  :host {
    display: contents;
  }

  .history-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .history-overlay.open {
    pointer-events: auto;
    opacity: 1;
  }

  .history-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .history-panel {
    position: relative;
    width: 90%;
    max-width: 520px;
    background: linear-gradient(180deg, rgba(18, 30, 52, 0.98) 0%, rgba(14, 24, 44, 0.98) 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transform: translateY(20px) scale(0.96);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .history-overlay.open .history-panel {
    transform: translateY(0) scale(1);
  }

  .history-panel:focus {
    outline: none;
  }

  /* Header */
  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .history-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .history-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    opacity: 0.9;
  }

  .history-icon svg {
    width: 28px;
    height: 28px;
  }

  .history-title {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .history-subtitle {
    font-size: 0.7rem;
    opacity: 0.5;
    margin-top: 1px;
  }

  .history-close {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: inherit;
    font-size: 0.85rem;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    flex-shrink: 0;
  }

  .history-close:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Summary stats row */
  .history-summary {
    display: flex;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  .summary-item {
    flex: 1;
    text-align: center;
    padding: 10px 6px;
  }

  .summary-item + .summary-item {
    border-left: 1px solid rgba(255, 255, 255, 0.06);
  }

  .summary-label {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.45;
    margin-bottom: 3px;
  }

  .summary-value {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .summary-value.min {
    color: #64b5f6;
  }

  .summary-value.max {
    color: #ef9a6e;
  }

  .summary-value.avg {
    color: rgba(255, 255, 255, 0.8);
  }

  .summary-value.current {
    color: #81c784;
  }

  /* Chart container */
  .chart-container {
    position: relative;
    width: 100%;
    aspect-ratio: 2.8 / 1;
    min-height: 120px;
  }

  .chart-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Loading state */
  .history-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    opacity: 0.5;
    font-size: 0.85rem;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Empty state */
  .history-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    opacity: 0.4;
    font-size: 0.85rem;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .history-panel {
      width: 95%;
      padding: 16px;
    }

    .summary-value {
      font-size: 0.95rem;
    }
  }
`;let Ye=class extends(Oe(dt)){constructor(){super(...arguments),this.open=!1,this.loading=!1,this.statName="",this.statUnit="",this.statIcon="",this.data=[]}static{this.styles=Ke}_stats(){if(0===this.data.length)return{min:0,max:0,avg:0,current:0};let t=1/0,e=-1/0,i=0;for(const r of this.data)r.value<t&&(t=r.value),r.value>e&&(e=r.value),i+=r.value;return{min:t,max:e,avg:i/this.data.length,current:this.data[this.data.length-1].value}}_formatVal(t){return Math.abs(t)>=100?t.toFixed(0):t.toFixed(1)}_formatAxisVal(t,e){return e>=10?t.toFixed(0):e>=.5?t.toFixed(1):t.toFixed(2)}_formatTime(t){return At(t)}_renderChart(t){const e=this.data;if(e.length<2)return L`<div class="history-empty">Not enough data</div>`;const i=12,r=124,{min:o,max:s}=t,a=.1*(s-o||1),n=o-a,l=s+a,d=l-n,c=e[0].time,h=e[e.length-1].time,p=h-c||1,f=t=>42+(t-c)/p*430,u=t=>i+(1-(t-n)/d)*r,m=e.map(t=>({x:f(t.time),y:u(t.value)})),y=this._monotonePath(m),_=`${y} L ${m[m.length-1].x},136 L ${m[0].x},136 Z`,g=[],k=d/4;for(let t=0;t<=4;t++){const e=i+t/4*r,o=l-t/4*d;g.push({y:e,label:this._formatAxisVal(o,k)})}const w=this._computeTimeLabels(c,h,6);return L`
      <div class="chart-container">
        <svg class="chart-svg" viewBox="0 0 ${480} ${160}" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(100,180,255,0.35)" />
              <stop offset="100%" stop-color="rgba(100,180,255,0.02)" />
            </linearGradient>
          </defs>

          <!-- Grid lines -->
          ${g.map(t=>V`
            <line x1="${42}" y1="${t.y}" x2="${472}" y2="${t.y}"
                  stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
            <text x="${38}" y="${t.y+3.5}"
                  fill="rgba(255,255,255,0.3)" font-size="8" text-anchor="end"
                  font-family="system-ui, sans-serif">${t.label}</text>
          `)}

          <!-- Time labels -->
          ${w.map(t=>V`
            <text x="${f(t.time)}" y="${156}"
                  fill="rgba(255,255,255,0.3)" font-size="8" text-anchor="middle"
                  font-family="system-ui, sans-serif">${t.label}</text>
            <line x1="${f(t.time)}" y1="${i}" x2="${f(t.time)}" y2="${136}"
                  stroke="rgba(255,255,255,0.04)" stroke-width="0.5" />
          `)}

          <!-- Area fill -->
          <path d="${_}" fill="url(#areaFill)" />

          <!-- Line -->
          <path d="${y}" fill="none"
                stroke="rgba(100,180,255,0.8)" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />

          <!-- Min marker -->
          ${this._renderMarker(e,m,o,"#64b5f6")}

          <!-- Max marker -->
          ${this._renderMarker(e,m,s,"#ef9a6e")}

          <!-- Current value dot -->
          <circle cx="${m[m.length-1].x}" cy="${m[m.length-1].y}"
                  r="3" fill="#81c784" stroke="rgba(0,0,0,0.3)" stroke-width="0.8" />
        </svg>
      </div>
    `}_renderMarker(t,e,i,r){let o=0,s=1/0;for(let e=0;e<t.length;e++){const r=Math.abs(t[e].value-i);r<s&&(s=r,o=e)}const a=e[o];return o===t.length-1?"":V`
      <circle cx="${a.x}" cy="${a.y}" r="2.5"
              fill="${r}" stroke="rgba(0,0,0,0.3)" stroke-width="0.6" />
    `}_monotonePath(t){if(t.length<2)return"";if(2===t.length)return`M ${t[0].x},${t[0].y} L ${t[1].x},${t[1].y}`;const e=t.length,i=[],r=[],o=[];for(let s=0;s<e-1;s++)i.push(t[s+1].x-t[s].x),r.push(t[s+1].y-t[s].y),o.push(r[s]/(i[s]||1));const s=[o[0]];for(let t=1;t<e-1;t++)o[t-1]*o[t]<=0?s.push(0):s.push((o[t-1]+o[t])/2);s.push(o[e-2]);for(let t=0;t<e-1;t++)if(Math.abs(o[t])<1e-10)s[t]=0,s[t+1]=0;else{const e=s[t]/o[t],i=s[t+1]/o[t],r=e*e+i*i;if(r>9){const a=3/Math.sqrt(r);s[t]=a*e*o[t],s[t+1]=a*i*o[t]}}let a=`M ${t[0].x},${t[0].y}`;for(let r=0;r<e-1;r++){const e=i[r]/3;a+=` C ${t[r].x+e},${t[r].y+s[r]*e} ${t[r+1].x-e},${t[r+1].y-s[r+1]*e} ${t[r+1].x},${t[r+1].y}`}return a}_computeTimeLabels(t,e,i){const r=e-t,o=[],s=[36e5,72e5,108e5,144e5,216e5,288e5,432e5];let a=s[0];for(const t of s)if(r/t<=i){a=t;break}const n=new Date(t);n.setMinutes(0,0,0);let l=n.getTime();for(l<t&&(l+=a);l<e;)o.push({time:l,label:this._formatTime(l)}),l+=a;return o}render(){if(!this.open)return L`<div class="history-overlay"></div>`;const t=this._stats();return L`
      <div
        class="history-overlay open"
        role="dialog"
        aria-label="${this.statName} history"
      >
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <!-- Header -->
          <div class="history-header">
            <div class="history-header-left">
              ${this.statIcon?L`
                <div class="history-icon">${be(this.statIcon)}</div>
              `:""}
              <div>
                <div class="history-title">${this.statName}</div>
                <div class="history-subtitle">Last 24 hours</div>
              </div>
            </div>
            <button
              class="history-close"
              @click=${this._close}
              aria-label="Close history"
            >✕</button>
          </div>

          ${this.loading?L`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading history...
            </div>
          `:this.data.length<2?L`
            <div class="history-empty">No history data available</div>
          `:L`
            <!-- Summary -->
            <div class="history-summary">
              <div class="summary-item">
                <div class="summary-label">Min</div>
                <div class="summary-value min">${this._formatVal(t.min)}${this.statUnit?` ${this.statUnit}`:""}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Max</div>
                <div class="summary-value max">${this._formatVal(t.max)}${this.statUnit?` ${this.statUnit}`:""}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Avg</div>
                <div class="summary-value avg">${this._formatVal(t.avg)}${this.statUnit?` ${this.statUnit}`:""}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Now</div>
                <div class="summary-value current">${this._formatVal(t.current)}${this.statUnit?` ${this.statUnit}`:""}</div>
              </div>
            </div>

            <!-- Chart -->
            ${this._renderChart(t)}
          `}
        </div>
      </div>
    `}};t([ut({type:Boolean})],Ye.prototype,"open",void 0),t([ut({type:Boolean})],Ye.prototype,"loading",void 0),t([ut()],Ye.prototype,"statName",void 0),t([ut()],Ye.prototype,"statUnit",void 0),t([ut()],Ye.prototype,"statIcon",void 0),t([ut({type:Array})],Ye.prototype,"data",void 0),t([yt(".history-panel")],Ye.prototype,"_panel",void 0),Ye=t([ht("wdb-stat-history")],Ye);let Qe=class extends(Oe(dt)){constructor(){super(...arguments),this.open=!1,this.loading=!1,this.data=[]}static{this.styles=a`
    :host { display: contents; }

    .history-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .history-overlay.open {
      pointer-events: auto;
      opacity: 1;
    }
    .history-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .history-panel {
      position: relative;
      width: 90%;
      max-width: 420px;
      background: linear-gradient(180deg, rgba(18, 30, 52, 0.98) 0%, rgba(14, 24, 44, 0.98) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transform: translateY(20px) scale(0.96);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .history-overlay.open .history-panel {
      transform: translateY(0) scale(1);
    }
    .history-panel:focus { outline: none; }

    .history-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .history-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .history-icon {
      width: 22px;
      height: 22px;
      opacity: 0.7;
    }
    .history-title {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .history-subtitle {
      font-size: 0.7rem;
      opacity: 0.5;
      margin-top: 1px;
    }
    .history-close {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: inherit;
      font-size: 0.85rem;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
      flex-shrink: 0;
    }
    .history-close:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .direction-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 420px;
      overflow-y: auto;
    }

    .direction-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .direction-info {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 62px;
      flex-shrink: 0;
      justify-content: flex-end;
    }

    .direction-compass {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .direction-label {
      font-size: 0.65rem;
      font-weight: 600;
      opacity: 0.5;
      letter-spacing: 0.3px;
      width: 20px;
      text-align: left;
    }

    .direction-bar-track {
      flex: 1;
      height: 22px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }

    .direction-bar {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, rgba(100, 180, 255, 0.6), rgba(100, 180, 255, 0.35));
      min-width: 2px;
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .direction-bar.top {
      background: linear-gradient(90deg, rgba(100, 180, 255, 0.9), rgba(100, 180, 255, 0.55));
    }

    .direction-time {
      width: 52px;
      font-size: 0.75rem;
      opacity: 0.6;
      text-align: right;
      flex-shrink: 0;
    }

    .direction-pct {
      width: 36px;
      font-size: 0.7rem;
      opacity: 0.4;
      text-align: right;
      flex-shrink: 0;
    }

    .history-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
      opacity: 0.5;
      font-size: 0.85rem;
    }
    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-top-color: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 10px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .history-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
      opacity: 0.4;
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      .history-panel {
        width: 95%;
        padding: 16px;
      }
    }
  `}_computeDirections(){const t=new Map;for(const e of vt)t.set(e,0);if(this.data.length<2)return[];for(let e=0;e<this.data.length-1;e++){const i=this.data[e].value,r=this.data[e+1].time-this.data[e].time;if(r<=0)continue;const o=Math.round((i%360+360)%360/45)%8,s=vt[o];t.set(s,(t.get(s)??0)+r)}return vt.map(e=>({label:e,duration:t.get(e)??0}))}_formatDuration(t){const e=Math.round(t/6e4);if(e<60)return`${e}m`;const i=Math.floor(e/60),r=e%60;return r>0?`${i}h ${r}m`:`${i}h`}_compassIcon(t){return V`
      <svg viewBox="0 0 64 64" class="direction-compass">
        <defs>
          <linearGradient id="cg-${t}" x1="23" y1="16.41" x2="41" y2="47.59" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#6b7280"/>
            <stop offset="0.45" stop-color="#6b7280"/>
            <stop offset="1" stop-color="#374151"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="18" stroke="#e5e7eb" stroke-miterlimit="10" stroke-width="2" fill="url(#cg-${t})"/>
        <path d="M36.47,39.46l-4.3-15.09A.17.17,0,0,0,32,24.2a.16.16,0,0,0-.17.17L27.51,39.46a.35.35,0,0,0,.07.29q.06.11.24,0l4-1.5a.47.47,0,0,1,.33,0l4,1.5c.13.07.22.07.28,0A.26.26,0,0,0,36.47,39.46Z"
              fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width="0.5"
              transform="rotate(${$t[t]??0} 32 32)"/>
      </svg>
    `}render(){if(!this.open)return L`<div class="history-overlay"></div>`;const t=this._computeDirections(),e=t.reduce((t,e)=>t+e.duration,0),i=Math.max(...t.map(t=>t.duration),0);return L`
      <div class="history-overlay open" role="dialog" aria-label="Wind direction history">
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <div class="history-header">
            <div class="history-header-left">
              <div class="history-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/>
                </svg>
              </div>
              <div>
                <div class="history-title">Wind Direction</div>
                <div class="history-subtitle">Last 24 hours</div>
              </div>
            </div>
            <button class="history-close" @click=${this._close} aria-label="Close">✕</button>
          </div>

          ${this.loading?L`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading history...
            </div>
          `:0===t.length?L`
            <div class="history-empty">No history data available</div>
          `:L`
            <div class="direction-list">
              ${t.map((t,r)=>{const o=e>0?t.duration/e*100:0,s=i>0?t.duration/i*100:0;return L`
                  <div class="direction-row">
                    <div class="direction-info">
                      ${this._compassIcon(t.label)}
                      <div class="direction-label">${t.label}</div>
                    </div>
                    <div class="direction-bar-track">
                      <div class="direction-bar ${t.duration===i?"top":""}"
                           style="width: ${s}%"></div>
                    </div>
                    <div class="direction-time">${this._formatDuration(t.duration)}</div>
                    <div class="direction-pct">${o.toFixed(0)}%</div>
                  </div>
                `})}
            </div>
          `}
        </div>
      </div>
    `}};t([ut({type:Boolean})],Qe.prototype,"open",void 0),t([ut({type:Boolean})],Qe.prototype,"loading",void 0),t([ut({type:Array})],Qe.prototype,"data",void 0),t([yt(".history-panel")],Qe.prototype,"_panel",void 0),Qe=t([ht("wdb-wind-direction-history")],Qe);let Je=class extends dt{constructor(){super(...arguments),this._skyHistoryOpen=!1,this._skyHistoryLoading=!1,this._skyHistoryEntries=[],this._statHistoryOpen=!1,this._statHistoryLoading=!1,this._statHistoryData=[],this._statHistoryName="",this._statHistoryUnit="",this._statHistoryIcon="",this._windDirHistoryOpen=!1,this._windDirHistoryLoading=!1,this._windDirHistoryData=[],this._statHistoryRequestId=0,this._windDirHistoryRequestId=0,this._skyHistoryRequestId=0,this._entities={}}static{this.styles=zt}set hass(t){const e=this._hass;this._hass=t,(!e||this._config?.device_id&&this._shouldRediscover(e))&&(this._entities=Ut(t,this._config)),this._hasRelevantChange(e)&&this.requestUpdate()}get hass(){return this._hass}_shouldRediscover(t){return Object.keys(this._hass.states).length!==Object.keys(t.states).length}_hasRelevantChange(t){if(!t)return!0;return this._getWatchedEntities().some(e=>t.states[e]!==this._hass.states[e])}_getWatchedEntities(){const t=["sun.sun","sensor.moon_phase"];for(const e of Object.values(this._entities))e&&t.push(e);return this._config?.weather_entity&&t.push(this._config.weather_entity),this._config?.aqi_entity&&this._config.aqi_entity!==this._entities.aqi&&t.push(this._config.aqi_entity),t}static getConfigElement(){return document.createElement("weather-dashboard-card-editor")}static getStubConfig(){return{device_id:""}}setConfig(t){if(!t.device_id&&!t.weather_entity)throw new Error("Please define a device_id or weather_entity");this._config={animations:!0,gauge_max:50,title:"Weather Dashboard",...t},this._hass&&(this._entities=Ut(this._hass,this._config))}getCardSize(){return 8}getGridOptions(){return{columns:12,min_columns:6,rows:5,min_rows:3}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(t=>{const e=t[0].contentRect.width;this.toggleAttribute("narrow",e<500),this.toggleAttribute("medium",e>=500&&e<768),this.toggleAttribute("wide",e>=768)}),this._resizeObserver.observe(this),this._intersectionObserver=new IntersectionObserver(([t])=>{!1!==this._config?.animations&&this.toggleAttribute("offscreen",!t.isIntersecting)},{threshold:.1}),this._intersectionObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._intersectionObserver?.disconnect()}_getEntityState(t){const e=this._entities[t];if(e){const t=this._hass?.states[e];if(t&&Gt(t.state))return t}}_getValue(t){const e=this._getEntityState(t);if(e){const t=parseFloat(e.state);return isFinite(t)?t:void 0}if(this._config?.weather_entity){const e=this._hass?.states[this._config.weather_entity];if(e){const i={temperature:"temperature",humidity:"humidity",pressure:"pressure",wind_speed:"wind_speed",wind_bearing:"wind_bearing",visibility:"visibility"}[t];if(i&&void 0!==e.attributes[i])return e.attributes[i]}}}_getUnit(t){const e=this._getEntityState(t);if(e?.attributes?.unit_of_measurement)return e.attributes.unit_of_measurement;if(this._config?.weather_entity){const e=this._hass?.states[this._config.weather_entity];if(e){const i="°C"===(e.attributes?.temperature_unit??"°C"),r=_t.find(e=>e.key===t);if(r)return r.unit[i?"metric":"imperial"]}}const i=_t.find(e=>e.key===t);if(i){const t=this._isHaMetric();return i.unit[t?"metric":"imperial"]}return""}_isHaMetric(){try{const t=this._hass.config;if(t?.unit_system)return"°C"===t.unit_system.temperature}catch{}return!0}_getSensorData(){const t={};for(const e of _t){const i=this._getValue(e.key);void 0!==i&&(t[e.key]=i)}const e=this._getValue("wind_bearing");return void 0!==e&&(t.wind_bearing=e),t}_getCondition(t,e,i,r,o){const s=this._config?.weather_entity?this._hass?.states[this._config.weather_entity]?.state:void 0,a=this._config.latitude??this._hass.config?.latitude,n=this._config.longitude??this._hass.config?.longitude;return Tt({sensors:t,isNight:e,sunElevation:i,speedUnit:this._getUnit("wind_speed")||"km/h",rainUnit:this._getUnit("rain_rate")||"mm/h",haCondition:s,aqiPm25:r,moonPhase:o,latitude:a,longitude:n})}async _toggleSkyHistory(){if(this._skyHistoryOpen)return void(this._skyHistoryOpen=!1);this._skyHistoryLoading=!0,this._skyHistoryOpen=!0;const t=++this._skyHistoryRequestId;try{const e={weatherEntity:this._config.weather_entity,sunEntity:"sun.sun",moonEntity:void 0!==Dt(this._hass)?this._config.moon_entity||"sensor.moon_phase":void 0,temperatureEntity:this._entities.temperature,humidityEntity:this._entities.humidity,solarRadiationEntity:this._entities.solar_radiation,uvIndexEntity:this._entities.uv_index,rainRateEntity:this._entities.rain_rate,windSpeedEntity:this._entities.wind_speed,dewPointEntity:this._entities.dew_point,aqiEntity:this._config.aqi_entity||this._entities.aqi},i=this._config.latitude??this._hass.config?.latitude,r=this._config.longitude??this._hass.config?.longitude;if(void 0===i||void 0===r)return void console.warn("[sky-history] No lat/lng available for reconstruction");const o=await se(this._hass,e,i,r,this._getUnit("wind_speed")||"km/h",this._getUnit("rain_rate")||"mm/h");if(t!==this._skyHistoryRequestId)return;this._skyHistoryLoading=!1,this._skyHistoryEntries=o}catch(e){console.warn("[sky-history] Reconstruction failed:",e),t===this._skyHistoryRequestId&&(this._skyHistoryLoading=!1)}}_closeSkyHistory(){this._skyHistoryOpen=!1,this._skyHistoryEntries=[]}_onInfoClick(){const t=this._entities.temperature;if(!t)return;const e=this._getUnit("temperature")||"°C";this._openStatHistory(t,"Temperature",e,"")}_onAqiClick(){const t=this._config.aqi_entity||this._entities.aqi;if(!t)return;const e=this._hass?.states[t],i=e?.attributes?.unit_of_measurement||"µg/m³";this._openStatHistory(t,"PM2.5",i,"")}async _onWindCompassClick(){const t=this._entities.wind_bearing;if(!t||!this._hass)return;const e=++this._windDirHistoryRequestId;this._windDirHistoryData=[],this._windDirHistoryLoading=!0,this._windDirHistoryOpen=!0;try{const i=new Date,r=new Date(i.getTime()-864e5),o=await this._hass.callWS({type:"history/history_during_period",start_time:r.toISOString(),end_time:i.toISOString(),entity_ids:[t],minimal_response:!0,significant_changes_only:!1,no_attributes:!0});if(e!==this._windDirHistoryRequestId)return;const s=o?.[t];if(Array.isArray(s)){const t=[];for(const e of s){const i=Nt(e);i&&t.push({time:i.time,value:i.value})}this._windDirHistoryData=t}}catch(t){if(e!==this._windDirHistoryRequestId)return;console.warn("Failed to fetch wind direction history:",t),this._windDirHistoryData=[]}finally{e===this._windDirHistoryRequestId&&(this._windDirHistoryLoading=!1)}}_closeWindDirHistory(){this._windDirHistoryOpen=!1}_onWindGaugeClick(){const t=this._entities.wind_speed;if(!t)return;const e=this._getUnit("wind_speed")||"km/h",i=me("wind-beaufort-0","wind_speed",this._getValue("wind_speed"),this._isHaMetric()?"metric":"imperial");this._openStatHistory(t,"Wind Speed",e,i)}_openStatHistory(t,e,i,r){this._onStatClick(new CustomEvent("stat-click",{detail:{entityId:t,name:e,unit:i,icon:r}}))}async _onStatClick(t){const{entityId:e,name:i,unit:r,icon:o}=t.detail;if(!e||!this._hass)return;const s=++this._statHistoryRequestId;this._statHistoryName=i,this._statHistoryUnit=r,this._statHistoryIcon=o,this._statHistoryData=[],this._statHistoryLoading=!0,this._statHistoryOpen=!0;try{const t=new Date,i=new Date(t.getTime()-864e5),r=await this._hass.callWS({type:"history/history_during_period",start_time:i.toISOString(),end_time:t.toISOString(),entity_ids:[e],minimal_response:!0,significant_changes_only:!1,no_attributes:!0});if(s!==this._statHistoryRequestId)return;const o=r?.[e];if(Array.isArray(o)){const t=[];for(const e of o){const i=Nt(e);i&&t.push({time:i.time,value:i.value})}this._statHistoryData=t.length>500?this._downsample(t,500):t}}catch(t){if(s!==this._statHistoryRequestId)return;console.warn("Failed to fetch stat history:",t),this._statHistoryData=[]}finally{s===this._statHistoryRequestId&&(this._statHistoryLoading=!1)}}_closeStatHistory(){this._statHistoryOpen=!1}_downsample(t,e){if(t.length<=e)return t;const i=[t[0]],r=(t.length-2)/(e-2);let o=0;for(let s=1;s<e-1;s++){const e=Math.floor((s-1)*r)+1,a=Math.min(Math.floor(s*r)+1,t.length-1),n=Math.floor(s*r)+1,l=Math.min(Math.floor((s+1)*r)+1,t.length-1);let d=0,c=0;const h=l-n;for(let e=n;e<l;e++)d+=t[e].time,c+=t[e].value;d/=h||1,c/=h||1;const p=t[o];let f=-1,u=e;for(let i=e;i<a;i++){const e=Math.abs((p.time-d)*(t[i].value-p.value)-(p.time-t[i].time)*(c-p.value));e>f&&(f=e,u=i)}i.push(t[u]),o=u}return i.push(t[t.length-1]),i}_getLocationName(){try{return this._hass.config?.location_name??""}catch{return""}}_formatDate(){return(new Date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0})}render(){if(!this._config||!this._hass)return L`<ha-card><div style="padding:16px">Loading...</div></ha-card>`;const t=this._getSensorData(),e=function(t){const e=t.states["sun.sun"];return"below_horizon"===e?.state}(this._hass),i=function(t){const e=t.states["sun.sun"];return e?.attributes?.elevation}(this._hass)??(e?-10:30),r=Dt(this._hass),o=this._getLocationName(),s=this._config.aqi_entity||this._entities.aqi;let a;if(s){const t=this._hass.states[s];if(t&&Gt(t.state)){const e=parseFloat(t.state);isFinite(e)&&(a=e)}}const n=this._getCondition(t,e,i,a,r),l=this._getUnit("temperature")||"°C",d=this._getUnit("wind_speed")||"km/h",c=void 0!==this._config.latitude&&void 0!==this._config.longitude||void 0!==this._hass.config?.latitude,h=Et(r),p=t.wind_speed??0,f=t.wind_bearing??0,u=function(t){const e=Math.round((t%360+360)%360/22.5)%16;return bt[e]}(f),m=Ot(p,d),y=function(t){for(const e of gt)if(t<=e.max)return e.label;return"Hurricane"}(m),_="°C"===l?"metric":"imperial";return L`
      <ha-card>
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="header-title">${this._config.title}</span>
            ${o?L`<span class="header-location">${o}</span>`:""}
          </div>
          <span class="header-date">${this._formatDate()}</span>
        </div>

        <!-- Main panels -->
        <div class="main-panels">
          <!-- Left: Weather Scene -->
          <div class="panel scene-panel">
            <wdb-weather-scene
              .condition=${n}
              .isNight=${e}
              .elevation=${i}
              .temperature=${t.temperature}
              .tempUnit=${l}
              .uvIndex=${t.uv_index}
              .windSpeed=${t.wind_speed}
              .windSpeedUnit=${d}
              .rainRate=${t.rain_rate}
              .rainRateUnit=${this._getUnit("rain_rate")||"mm/h"}
              .solarRadiation=${t.solar_radiation}
              .humidity=${t.humidity}
              .moonIllumination=${h}
              .aqiValue=${a}
              .moonPhase=${r}
              .useDynamicSky=${c}
              @icon-click=${this._toggleSkyHistory}
              @aqi-click=${this._onAqiClick}
              @info-click=${this._onInfoClick}
            ></wdb-weather-scene>
            <wdb-sky-history
              .entries=${this._skyHistoryEntries}
              .loading=${this._skyHistoryLoading}
              .open=${this._skyHistoryOpen}
              .tempUnit=${l}
              @close=${this._closeSkyHistory}
            ></wdb-sky-history>
          </div>

          <!-- Right: Wind Panel -->
          <div class="panel">
            <div class="wind-panel">
              <div class="wind-instruments">
                <!-- Compass -->
                <div class="wind-instrument clickable" @click=${this._onWindCompassClick}>
                  <div class="wind-sublabel">Wind Direction</div>
                  <div class="wind-svg-container">
                    <wdb-wind-compass .bearing=${f}></wdb-wind-compass>
                  </div>
                  <div class="wind-value">
                    <div class="wind-value-primary">${Math.round(f)}° ${u}</div>
                  </div>
                </div>
                <!-- Gauge -->
                <div class="wind-instrument clickable" @click=${this._onWindGaugeClick}>
                  <div class="wind-sublabel">Wind Speed</div>
                  <div class="gauge-svg-container">
                    <wdb-wind-gauge
                      .speed=${m}
                      .maxSpeed=${this._config.gauge_max??50}
                    ></wdb-wind-gauge>
                  </div>
                  <div class="wind-value">
                    <div class="wind-value-primary">${Math.round(p)} ${d}</div>
                    <div class="wind-value-secondary">${y}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-section" @stat-click=${this._onStatClick}>
          <div class="stats-label">Statistics (Live Updates)</div>
          <div class="stats-grid">
            ${this._renderStats(t,_)}
          </div>
        </div>

        <!-- Stat History Overlay -->
        <wdb-stat-history
          .open=${this._statHistoryOpen}
          .loading=${this._statHistoryLoading}
          .statName=${this._statHistoryName}
          .statUnit=${this._statHistoryUnit}
          .statIcon=${this._statHistoryIcon}
          .data=${this._statHistoryData}
          @close=${this._closeStatHistory}
        ></wdb-stat-history>

        <!-- Wind Direction History Overlay -->
        <wdb-wind-direction-history
          .open=${this._windDirHistoryOpen}
          .loading=${this._windDirHistoryLoading}
          .data=${this._windDirHistoryData}
          @close=${this._closeWindDirHistory}
        ></wdb-wind-direction-history>

      </ha-card>
    `}_renderStats(t,e){return _t.map(i=>{const r=t[i.key];if(void 0===r)return"";const o=function(t,e){if(!isFinite(t))return"--";switch(e){case"temperature":case"feels_like":case"dew_point":case"wind_chill":case"heat_index":case"soil_temp":case"uv_index":case"humidity":return Math.round(t).toString();case"pressure":return t<100?t.toFixed(2):Math.round(t).toString();default:return t<10?t.toFixed(1):Math.round(t).toString()}}(r,i.key),s=this._getUnit(i.key),a=me(i.icon,i.key,r,e),n=this._entities[i.key]??"";return L`
        <wdb-stat-card
          .name=${i.label}
          .value=${o}
          .unit=${s}
          .icon=${a}
          .entityId=${n}
          .statKey=${i.key}
        ></wdb-stat-card>
      `})}};t([mt()],Je.prototype,"_config",void 0),t([mt()],Je.prototype,"_skyHistoryOpen",void 0),t([mt()],Je.prototype,"_skyHistoryLoading",void 0),t([mt()],Je.prototype,"_skyHistoryEntries",void 0),t([mt()],Je.prototype,"_statHistoryOpen",void 0),t([mt()],Je.prototype,"_statHistoryLoading",void 0),t([mt()],Je.prototype,"_statHistoryData",void 0),t([mt()],Je.prototype,"_statHistoryName",void 0),t([mt()],Je.prototype,"_statHistoryUnit",void 0),t([mt()],Je.prototype,"_statHistoryIcon",void 0),t([mt()],Je.prototype,"_windDirHistoryOpen",void 0),t([mt()],Je.prototype,"_windDirHistoryLoading",void 0),t([mt()],Je.prototype,"_windDirHistoryData",void 0),Je=t([ht("weather-dashboard-card")],Je),window.customCards=window.customCards||[],window.customCards.push({type:"weather-dashboard-card",name:"Weather Dashboard",description:"Animated weather dashboard with compass and gauges",preview:!0});export{Je as WeatherDashboardCard};
