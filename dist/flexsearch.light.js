/**!
 * FlexSearch.js v0.7.0-beta (Light)
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';function u(a,b){return"undefined"!==typeof a?a:b}function v(a){const b=Array(a);for(let c=0;c<a;c++)b[c]=y();return b}function y(){return Object.create(null)}function z(a,b){return b.length-a.length};const A=/[\u0300-\u036f]/g;function B(a,b){const c=Object.keys(a),d=c.length,e=[];let g="",f=0;for(let h=0,l,k;h<d;h++)l=c[h],(k=a[l])?(e[f++]=new RegExp(b?"(?!\\b)"+l+"(\\b|_)":l,"g"),e[f++]=k):g+=(g?"|":"")+l;g&&(e[f++]=new RegExp(b?"(?!\\b)("+g+")(\\b|_)":"("+g+")","g"),e[f]="");return e}function C(a,b){for(let c=0,d=b.length;c<d&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a};const D=/[\W_]+/;function E(a){a.normalize&&(a=a.normalize("NFD").replace(A,""));if(a=a.toLowerCase())if(this.o&&(a=C(a,this.o)),this.A&&1<a.length&&(a=C(a,this.A)),D||""===D)if(a=a.split(D),this.filter){var b=this.filter;const c=a.length,d=[];for(let e=0,g=0;e<c;e++){const f=a[e];f&&!b[f]&&(d[g++]=f)}a=d}return a};const F={},G={};function H(a,b,c,d){var e=a.length;let g=[],f,h=0;d&&(d=[]);for(--e;0<=e;e--){const l=a[e],k=l.length,n=y();let r=!f;for(let q=0;q<k;q++){const t=l[q],m=t.length;if(m)for(let p=0,x=0,w;p<m;p++)if(w=t[p],!f)n[w]=1;else if(f[w]){if(e)d&&x<b&&((d[q]||(d[q]=[]))[x++]=w),n[w]=1;else if(c)c--;else if(g[h++]=w,h===b)return g;r=!0}}if(!r&&!d)return[];f=n}if(d)for(let l=d.length-1,k,n;0<=l;l--)if((n=(k=d[l])&&k.length)&&c&&(n<=c?(c-=n,n=0):n-=c),n){if(h+n>=b)return g.concat(k.slice(c,b-h+c));g=g.concat(c?
k.slice(c):k);h+=n;c=0}return g};G["latin:default"]=E;
function I(a,b){if(!(this instanceof I))return new I(a);let c;if(a){var d=a.charset;c=a.lang;"string"===typeof d&&(-1===d.indexOf(":")&&(d+=":default"),d=G[d]);"string"===typeof c&&(c=F[c])}else a={};let e,g,f,h=a.context||{};this.encode=a.encode||d&&d.encode||E;this.register=b||y();e=a.resolution||9;g=a.threshold||0;g>=e&&(g=e-1);this.i=e;this.s=g;this.F=b=d&&d.G||a.tokenize||"strict";this.m="strict"===b&&h.depth;this.v=u(h.bidirectional,!0);this.g=f="memory"===a.optimize;this.C=u(a.fastupdate,!0);
this.h=a.minlength||1;this.j=f?v(e-g):y();e=h.resolution||e;g=h.threshold||g;g>=e&&(g=e-1);this.l=e;this.D=g;this.B=f?v(e-g):y();this.u=d&&d.u||a.rtl;this.o=(b=a.matcher||c&&c.o)&&B(b,!1);this.A=(b=a.stemmer||c&&c.A)&&B(b,!0);if(a=b=a.filter||c&&c.filter){a=b;d=y();for(let l=0,k=a.length;l<k;l++)d[a[l]]=1;a=d}this.filter=a}I.prototype.append=function(a,b){return this.add(a,b,!0)};
I.prototype.add=function(a,b,c){if(this.register[a]&&!c)return this.update(a,b);if(b&&(a||0===a)){b=this.encode(b);const k=b.length;if(k){const n=this.m,r=this.i-this.s,q=y(),t=y();for(let m=0;m<k;m++){let p=b[this.u?k-1-m:m];var d=p.length;if(p&&d>=this.h&&(n||!q[p])){var e=Math.min(this.i/k*m|0,m);if(e<r){var g="";switch(this.F){case "full":if(3<d){for(var f=0;f<d;f++){var h=f?Math.min(e/2+this.i/d*f/2|0,e+f):e;if(h<r)for(var l=d;l>f;l--)g=p.substring(f,l),g.length>=this.h&&J(this,q,g,h,a,c)}break}case "reverse":if(2<
d){for(f=d-1;0<f;f--)g=p[f]+g,g.length>=this.h&&J(this,q,g,e,a,c);g=""}case "forward":if(1<d)for(f=0;f<d;f++)g+=p[f],g.length>=this.h&&J(this,q,g,e,a,c);break;default:if(J(this,q,p,e,a,c),n&&1<k&&m<k-1)for(d=this.l-this.D,e=y(),g=p,f=Math.min(n+1,k-m),e[g]=1,h=1;h<f;h++)if((p=b[this.u?k-1-m-h:m+h])&&p.length>=this.h&&!e[p]){if(e[p]=1,l=Math.min((this.l-f)/k*m+h|0,m+(h-1)),l<d){const x=this.v&&p>g;J(this,t,x?g:p,l,a,c,x?p:g)}}else f=Math.min(f+1,k-m)}}}}this.C||(this.register[a]=1)}}return this};
function J(a,b,c,d,e,g,f){let h=f?a.B:a.j;if(!b[c]||f&&!b[c][f])a.g&&(h=h[d]),f?(b=b[c]||(b[c]=y()),b[f]=1,h=h[f]||(h[f]=y())):b[c]=1,h=h[c]||(h[c]=[]),a.g||(h=h[d]||(h[d]=[])),g&&-1!==h.indexOf(e)||(h[h.length]=e,a.C&&(a=a.register[e]||(a.register[e]=[]),a[a.length]=h))}
I.prototype.search=function(a,b,c){"object"===typeof a?(c=a,a=c.query):"object"===typeof b&&(c=b);let d=[],e;var g=this.s;let f,h=0;if(c){b=c.limit;h=c.offset||0;g=u(c.threshold,g);var l=c.context;f=!1}if(a&&(a=this.encode(a),e=a.length,1<e)){c=y();var k=[];for(let r=0,q=0,t;r<e;r++)if((t=a[r])&&t.length>=this.h&&!c[t])if(this.g||f||this.j[t])k[q++]=t,c[t]=1;else return d;a=k;e=a.length}if(!e)return d;b||(b=100);c=this.i-g;g=this.l-g;l=this.m&&1<e&&!1!==l;k=0;let n;l?(n=a[0],k=1):1<e&&a.sort(z);for(let r,
q;k<e;k++){q=a[k];l?(r=K(this,d,f,g,b,h,2===e,q,n),f&&!1===r&&d.length||(n=q)):r=K(this,d,f,c,b,h,1===e,q);if(r)return r;if(f&&k===e-1){let t=d.length;if(!t){if(l){l=0;k=-1;continue}return d}if(1===t)return L(d[0],b,h)}}return H(d,b,h,f)};
function K(a,b,c,d,e,g,f,h,l){let k=[],n=l?a.B:a.j;a.g||(n=M(n,h,l,a.v));if(n){let r=0;d=Math.min(n.length,d);for(let q=0,t=0,m,p;q<d&&!(m=n[q],a.g&&(m=M(m,h,l,a.v)),m&&f&&(p=m.length,p<=g?(g-=p,m=null):g&&(m=m.slice(g),g=0)),m&&(k[r++]=m,f&&(t+=m.length,t>=e)));q++);if(r){if(f)return L(k,e,0);b[b.length]=k;return}}return!c&&k}function L(a,b,c){a=1===a.length?a[0]:[].concat.apply([],a);return c||a.length>b?a.slice(c,c+b):a}
function M(a,b,c,d){c?(d=d&&b>c,a=(a=a[d?b:c])&&a[d?c:b]):a=a[b];return a}I.prototype.contain=function(a){return!!this.register[a]};I.prototype.update=function(a,b){return this.remove(a).add(a,b)};I.prototype.remove=function(a,b){const c=this.register[a];if(c){if(this.C)for(let d=0,e;d<c.length;d++)e=c[d],e.splice(e.indexOf(a),1);else N(this.j,a,this.i-this.s,this.g),this.m&&N(this.B,a,this.l-this.D,this.g);b||delete this.register[a]}return this};
function N(a,b,c,d,e){let g=0;if(a.constructor===Array)if(e)b=a.indexOf(b),-1!==b?1<a.length&&(a.splice(b,1),g++):g++;else{e=Math.min(a.length,c);for(let f=0,h;f<e;f++)if(h=a[f])g=N(h,b,c,d,e),d||g||delete a[f]}else for(let f in a)(g=N(a[f],b,c,d,e))||delete a[f];return g};const O=self;let P;const Q={Index:I,Document:null,Worker:null,registerCharset:function(a,b){G[a]=b},registerLanguage:function(a,b){F[a]=b}};(P=O.define)&&P.amd?P([],function(){return Q}):O.exports?O.exports=Q:O.FlexSearch=Q;}(this));