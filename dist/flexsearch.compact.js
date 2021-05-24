/**!
 * FlexSearch.js v0.7.0-beta (Compact)
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';var v;function w(a,b){return"undefined"!==typeof a?a:b}function y(a){const b=Array(a);for(let c=0;c<a;c++)b[c]=z();return b}function z(){return Object.create(null)}function aa(a,b){return b.length-a.length}function A(a){return"string"===typeof a}function B(a){return"object"===typeof a};const ba=/[\u0300-\u036f]/g;function C(a){a.normalize&&(a=a.normalize("NFD").replace(ba,""));return a}function D(a,b){const c=Object.keys(a),e=c.length,d=[];let f="",g=0;for(let h=0,k,l;h<e;h++)k=c[h],(l=a[k])?(d[g++]=E(b?"(?!\\b)"+k+"(\\b|_)":k),d[g++]=l):f+=(f?"|":"")+k;f&&(d[g++]=E(b?"(?!\\b)("+f+")(\\b|_)":"("+f+")"),d[g]="");return d}function F(a,b){for(let c=0,e=b.length;c<e&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a}function E(a){return new RegExp(a,"g")}
function I(a){let b="",c="";for(let e=0,d=a.length,f;e<d;e++)(f=a[e])!==c&&(b+=c=f);return b};const ca=/[\W_]+/;function J(a){return K(this,C(a).toLowerCase(),!1,ca)};const da={},N={};let ea=Promise;function fa(a){O(a,"add");O(a,"append");O(a,"search");O(a,"update");O(a,"remove")}function O(a,b){a[b+"Async"]=function(){const c=this,e=arguments;var d=e[e.length-1];let f;"function"===typeof d&&(f=d,delete e[e.length-1]);d=new ea(function(g){setTimeout(function(){c.async=!0;g(c[b].apply(c,e));c.async=!1})});return f?(d.then(f),this):d}};function ja(a,b,c,e){var d=a.length;let f=[],g,h=0;e&&(e=[]);for(--d;0<=d;d--){const k=a[d],l=k.length,m=z();let q=!g;for(let r=0;r<l;r++){const u=k[r],p=u.length;if(p)for(let n=0,t=0,x;n<p;n++)if(x=u[n],!g)m[x]=1;else if(g[x]){if(d)e&&t<b&&((e[r]||(e[r]=[]))[t++]=x),m[x]=1;else if(c)c--;else if(f[h++]=x,h===b)return f;q=!0}}if(!q&&!e)return[];g=m}if(e)for(let k=e.length-1,l,m;0<=k;k--)if((m=(l=e[k])&&l.length)&&c&&(m<=c?(c-=m,m=0):m-=c),m){if(h+m>=b)return f.concat(l.slice(c,b-h+c));f=f.concat(c?
l.slice(c):l);h+=m;c=0}return f}function ka(a,b){const c=z(),e=z(),d=[];for(let f=0;f<a.length;f++)c[a[f]]=1;for(let f=0,g;f<b.length;f++){g=b[f];for(let h=0,k;h<g.length;h++)k=g[h],c[k]&&!e[k]&&(e[k]=1,d[d.length]=k)}return d};const la={memory:{charset:"latin:extra",A:3,o:3,D:!1,s:"memory"},performance:{threshold:8,o:3,context:{depth:1,G:!0}},match:{charset:"latin:extra",H:"full",A:3},score:{charset:"latin:advanced",threshold:1,context:{depth:3,G:!0}},"default":{A:3,threshold:0,depth:3}};N["latin:default"]=J;
function P(a,b){if(!(this instanceof P))return new P(a);var c;let e;a?(A(a)?a=la[a]:(c=a.preset)&&(a=Object.assign({},c[c],a)),c=a.charset,e=a.lang,A(c)&&(-1===c.indexOf(":")&&(c+=":default"),c=N[c]),A(e)&&(e=da[e])):a={};let d,f,g,h=a.context||{};this.encode=a.encode||c&&c.encode||J;this.register=b||z();d=a.resolution||9;f=a.threshold||0;f>=d&&(f=d-1);this.A=d;this.threshold=f;this.F=b=c&&c.H||a.tokenize||"strict";this.depth="strict"===b&&h.depth;this.G=w(h.bidirectional,!0);this.s=g="memory"===
a.optimize;this.D=w(a.fastupdate,!0);this.o=a.minlength||1;this.h=g?y(d-f):z();d=h.resolution||d;f=h.threshold||f;f>=d&&(f=d-1);this.l=d;this.B=f;this.m=g?y(d-f):z();this.C=c&&c.C||a.rtl;this.I=(b=a.matcher||e&&e.I)&&D(b,!1);this.J=(b=a.stemmer||e&&e.J)&&D(b,!0);if(a=b=a.filter||e&&e.filter){a=b;c=z();for(let k=0,l=a.length;k<l;k++)c[a[k]]=1;a=c}this.filter=a}
function K(a,b,c,e){if(b&&(c&&(b=F(b,c)),a.I&&(b=F(b,a.I)),a.J&&1<b.length&&(b=F(b,a.J)),e||""===e)){b=b.split(e);if(a.filter){a=a.filter;c=b.length;e=[];for(let d=0,f=0;d<c;d++){const g=b[d];g&&!a[g]&&(e[f++]=g)}a=e}else a=b;return a}return b}v=P.prototype;v.append=function(a,b){return this.add(a,b,!0)};
v.add=function(a,b,c){if(this.register[a]&&!c)return this.update(a,b);if(b&&(a||0===a)){b=this.encode(b);const l=b.length;if(l){const m=this.depth,q=this.A-this.threshold,r=z(),u=z();for(let p=0;p<l;p++){let n=b[this.C?l-1-p:p];var e=n.length;if(n&&e>=this.o&&(m||!r[n])){var d=Math.min(this.A/l*p|0,p);if(d<q){var f="";switch(this.F){case "full":if(3<e){for(var g=0;g<e;g++){var h=g?Math.min(d/2+this.A/e*g/2|0,d+g):d;if(h<q)for(var k=e;k>g;k--)f=n.substring(g,k),f.length>=this.o&&Q(this,r,f,h,a,c)}break}case "reverse":if(2<
e){for(g=e-1;0<g;g--)f=n[g]+f,f.length>=this.o&&Q(this,r,f,d,a,c);f=""}case "forward":if(1<e)for(g=0;g<e;g++)f+=n[g],f.length>=this.o&&Q(this,r,f,d,a,c);break;default:if(Q(this,r,n,d,a,c),m&&1<l&&p<l-1)for(e=this.l-this.B,d=z(),f=n,g=Math.min(m+1,l-p),d[f]=1,h=1;h<g;h++)if((n=b[this.C?l-1-p-h:p+h])&&n.length>=this.o&&!d[n]){if(d[n]=1,k=Math.min((this.l-g)/l*p+h|0,p+(h-1)),k<e){const t=this.G&&n>f;Q(this,u,t?f:n,k,a,c,t?n:f)}}else g=Math.min(g+1,l-p)}}}}this.D||(this.register[a]=1)}}return this};
function Q(a,b,c,e,d,f,g){let h=g?a.m:a.h;if(!b[c]||g&&!b[c][g])a.s&&(h=h[e]),g?(b=b[c]||(b[c]=z()),b[g]=1,h=h[g]||(h[g]=z())):b[c]=1,h=h[c]||(h[c]=[]),a.s||(h=h[e]||(h[e]=[])),f&&-1!==h.indexOf(d)||(h[h.length]=d,a.D&&(a=a.register[d]||(a.register[d]=[]),a[a.length]=h))}
v.search=function(a,b,c){B(a)?(c=a,a=c.query):B(b)&&(c=b);let e=[],d;var f=this.threshold;let g,h=0;if(c){b=c.limit;h=c.offset||0;f=w(c.threshold,f);var k=c.context;g=c.suggest}if(a&&(a=this.encode(a),d=a.length,1<d)){c=z();var l=[];for(let q=0,r=0,u;q<d;q++)if((u=a[q])&&u.length>=this.o&&!c[u])if(this.s||g||this.h[u])l[r++]=u,c[u]=1;else return e;a=l;d=a.length}if(!d)return e;b||(b=100);c=this.A-f;f=this.l-f;k=this.depth&&1<d&&!1!==k;l=0;let m;k?(m=a[0],l=1):1<d&&a.sort(aa);for(let q,r;l<d;l++){r=
a[l];k?(q=ma(this,e,g,f,b,h,2===d,r,m),g&&!1===q&&e.length||(m=r)):q=ma(this,e,g,c,b,h,1===d,r);if(q)return q;if(g&&l===d-1){let u=e.length;if(!u){if(k){k=0;l=-1;continue}return e}if(1===u)return na(e[0],b,h)}}return ja(e,b,h,g)};
function ma(a,b,c,e,d,f,g,h,k){let l=[],m=k?a.m:a.h;a.s||(m=oa(m,h,k,a.G));if(m){let q=0;e=Math.min(m.length,e);for(let r=0,u=0,p,n;r<e&&!(p=m[r],a.s&&(p=oa(p,h,k,a.G)),p&&g&&(n=p.length,n<=f?(f-=n,p=null):f&&(p=p.slice(f),f=0)),p&&(l[q++]=p,g&&(u+=p.length,u>=d)));r++);if(q){if(g)return na(l,d,0);b[b.length]=l;return}}return!c&&l}function na(a,b,c){a=1===a.length?a[0]:[].concat.apply([],a);return c||a.length>b?a.slice(c,c+b):a}
function oa(a,b,c,e){c?(e=e&&b>c,a=(a=a[e?b:c])&&a[e?c:b]):a=a[b];return a}v.contain=function(a){return!!this.register[a]};v.update=function(a,b){return this.remove(a).add(a,b)};v.remove=function(a,b){const c=this.register[a];if(c){if(this.D)for(let e=0,d;e<c.length;e++)d=c[e],d.splice(d.indexOf(a),1);else S(this.h,a,this.A-this.threshold,this.s),this.depth&&S(this.m,a,this.l-this.B,this.s);b||delete this.register[a]}return this};
function S(a,b,c,e,d){let f=0;if(a.constructor===Array)if(d)b=a.indexOf(b),-1!==b?1<a.length&&(a.splice(b,1),f++):f++;else{d=Math.min(a.length,c);for(let g=0,h;g<d;g++)if(h=a[g])f=S(h,b,c,e,d),e||f||delete a[g]}else for(let g in a)(f=S(a[g],b,c,e,d))||delete a[g];return f}fa(P.prototype);function T(a){if(!(this instanceof T))return new T(a);var b;a||(a={});this.K=[];this.h=[];this.F=[];this.register=z();this.key=(b=a.key)&&U(b,this.F)||"id";this.D=w(a.fastupdate,!0);this.B=!!(b=a.extern);this.l=!this.B&&(b=a.store)&&!0!==b&&[];this.store=b&&(this.B?b:z());this.async=!1;b=a;a=z();let c=b.doc;if(A(c))c=[c];else if(c.constructor!==Array){var e=c;c=Object.keys(c)}for(let d=0,f,g;d<c.length;d++)f=c[d],A(f)?e&&(g=e[f]):(g=f,f=f.field),g=B(g)?Object.assign({},b,g):b,this.L||(a[f]=new P(g,
this.register)),this.K[d]=U(f,this.F),this.h[d]=f;if(this.l)for(e=b.store,A(e)&&(e=[e]),b=0;b<e.length;b++)this.l[b]=U(e[b],this.F);this.m=a}function U(a,b){const c=a.split(":");let e=0;for(let d=0;d<c.length;d++)a=c[d],0<=a.indexOf("[]")&&(a=a.substring(0,a.length-2))&&(b[e]=!0),a&&(c[e++]=a);e<c.length&&(c.length=e);return 1<e?c:c[0]}
function V(a,b,c,e,d){a=a[d];if(e===c.length-1)b[d]=a;else if(a)if(a.constructor===Array)for(b=b[d]=Array(a.length),d=0;d<a.length;d++)V(a,b,c,e,d);else b=b[d]||(b[d]=z()),d=c[++e],V(a,b,c,e,d)}function W(a,b,c,e,d,f,g,h){a=a[g];if(e===b.length-1){if(a.constructor===Array){if(c[e]){for(b=0;b<a.length;b++)d.add(f,a[b],!0);return}a=a.join(" ")}d.add(f,a,h)}else if(a)if(a.constructor===Array)for(g=0;g<a.length;g++)W(a,b,c,e,d,f,g,h);else g=b[++e],W(a,b,c,e,d,f,g,h)}v=T.prototype;
v.add=function(a,b,c){if(B(a)){a=b=a;var e=this.key;if(A(e))a=a[e];else for(let d=0;a&&d<e.length;d++)a=a[e[d]]}if(b&&(a||0===a)){if(this.register[a])return this.update(a,b);for(let d=0,f,g;d<this.h.length;d++)g=this.h[d],f=this.K[d],A(f)&&(f=[f]),W(b,f,this.F,0,this.m[g],a,f[0],c);if(this.store&&!this.B){let d;if(this.l){d=z();for(let f=0,g;f<this.l.length;f++)g=this.l[f],A(g)?d[g]=b[g]:V(b,d,g,0,g[0])}this.store[a]=d||b}}return this};v.append=function(a,b){return this.add(a,b,!0)};
v.update=function(a,b){return this.remove(a).add(a,b)};v.remove=function(a){B(a)&&(a=a[this.key]);if(this.register[a]){for(let b=0;b<this.h.length&&(this.m[this.h[b]].remove(a,!0),!this.D||this.L);b++);this.store&&!this.B&&delete this.store[a];delete this.register[a]}return this};
v.search=function(a,b,c,e){B(a)?(c=a,a=c.query):B(b)&&(c=b,b=0);let d=[],f=[],g,h,k,l,m,q,r,u=0;if(c)if(c.constructor===Array)k=c,c=null;else if(k=(g=c.pluck)||c.field||c.doc,m=!1,h=this.store&&c.enrich,q="and"===c.bool,b=c.limit||100,r=c.offset||0,k&&(A(k)?k=[k]:k.constructor!==Array&&(l=k,k=Object.keys(k))),m&&(A(m)&&(m=[m]),!a)){for(let n=0,t;n<m.length;n++)if(t=pa.call(this,m[n],b,r,h))d[d.length]=t,u++;return u?d:[]}k||(k=this.h);q=q&&(1<k.length||m&&1<m.length);const p=!e&&(this.L||this.async)&&
[];for(let n=0,t,x,G;n<k.length;n++){let L;x=k[n];A(x)?l&&(L=l[x]):(L=x,x=x.field);if(p)p[n]=this.m[x].searchAsync(a,b,L||c);else{e?t=e[n]:t=this.m[x].search(a,b,L||c);G=t.length;if(m&&G){const H=[];let ha=0;q&&(H[0]=[t]);for(let R=0,ia,M;R<m.length;R++)if(ia=m[R],G=(M=this.M[ia])&&M.length)ha++,H[H.length]=q?[M]:M;ha&&(t=q?ja(H,b||100,r||0):ka(t,H),G=t.length)}if(G)f[u]=x,d[u++]=t;else if(q)return[]}}if(p){const n=this;return new Promise(function(t){Promise.all(p).then(function(x){t(n.search(a,b,
c,x))})})}if(!u)return[];if(g&&(!h||!this.store))return d[0];for(let n=0,t;n<f.length;n++){t=d[n];t.length&&h&&(t=qa.call(this,t));if(g)return t;d[n]={field:f[n],result:t}}return d};function pa(a,b,c,e){let d=this.M[a],f=d&&d.length-c;if(f&&0<f){if(f>b||c)d=d.slice(c,c+b);e&&(d=qa.call(this,d));return{tag:a,result:d}}}function qa(a){const b=Array(a.length);for(let c=0,e;c<a.length;c++)e=a[c],b[c]={key:e,doc:this.store[e]};return b}v.contain=function(a){return!!this.register[a]};v.get=function(a){return this.store[a]};
v.set=function(a,b){this.store[a]=b;return this};fa(T.prototype);const ra=/[\W_]+/,sa=[E("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),"a",E("[\u00e8\u00e9\u00ea\u00eb]"),"e",E("[\u00ec\u00ed\u00ee\u00ef]"),"i",E("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),"o",E("[\u00f9\u00fa\u00fb\u00fc\u0171]"),"u",E("[\u00fd\u0177\u00ff]"),"y",E("\u00f1"),"n",E("[\u00e7c]"),"k",E("\u00df"),"s",E(" & ")," and "];function ta(a){return K(this,C(a).toLowerCase(),!a.normalize&&sa,ra)};var va={encode:ua,C:!1,H:"strict"};const wa=/[^a-z0-9]+/,xa={b:"p",v:"f",w:"f",z:"s",x:"s","\u00df":"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function ua(a){a=ta.call(this,a).join(" ");const b=[];if(a){const c=a.split(wa),e=c.length;for(let d=0,f,g=0;d<e;d++)if((a=c[d])&&(!this.filter||!this.filter[a])){f=a[0];let h=xa[f]||f,k=h;for(let l=1;l<a.length;l++){f=a[l];const m=xa[f]||f;m&&m!==k&&(h+=m,k=m)}b[g++]=h}}return b};var za={encode:ya,C:!1,H:""};const Aa=[E("ae"),"a",E("oe"),"o",E("sh"),"s",E("th"),"t",E("ph"),"f",E("pf"),"f"];function ya(a,b){a&&(a=ua.call(this,a).join(" "),2<a.length&&(a=F(a,Aa)),b||(1<a.length&&(a=I(a)),a&&(a=a.split(" "))));return a};var Ca={encode:Ba,C:!1,H:""};const Da=E("(?!\\b)[aeiouy]");function Ba(a){a&&(a=ya.call(this,a,!0),1<a.length&&(a=a.replace(Da,"")),1<a.length&&(a=I(a)),a&&(a=a.split(" ")));return a};N["latin:simple"]={encode:ta,C:!1,H:""};N["latin:balance"]=va;N["latin:advanced"]=za;N["latin:extra"]=Ca;const X=self;let Y;const Z={Index:P,Document:T,Worker:null,registerCharset:function(a,b){N[a]=b},registerLanguage:function(a,b){da[a]=b}};(Y=X.define)&&Y.amd?Y([],function(){return Z}):X.exports?X.exports=Z:X.FlexSearch=Z;}(this));