import{create_object,concat,sort_by_length_up,get_max_len}from"./common.js";export function intersect(a,b,c,d,e){const f=a.length;let g,h,j=[];g=create_object();for(let i,k,l,m,n=0;n<b;n++)for(let b=0;b<f;b++)if(l=a[b],n<l.length&&(i=l[n]))for(let a=0;a<i.length;a++)k=i[a],(h=g[k])?g[k]++:(h=0,g[k]=1),m=j[h]||(j[h]=[]),m.push(k);const k=j.length;if(k)if(!e){if(k<f)return[];j=j[k-1],(j.length>c||d)&&(j=j.slice(d,c+d))}else{const a=[];for(let b,e,f=k-1,g=0;0<=f;f--){if(b=j[f],e=b.length,d>=e){d-=e;continue}if((e+g>c||d)&&(b=b.slice(d,c-g+d),e=b.length),a.push(b),g+=e,c===g)break}j=1<a.length?union(a,d,c):a[0]}return j}function union(a,b,c){const d=[],e=create_object();let f,g,h,j=a.length;for(let k=0;k<j;k++){f=a[k],h=f.length;for(let a=0;a<h;a++)if(g=f[a],!e[g])if(e[g]=1,b)b--;else if(d.push(g),d.length===c)break}return d}export function intersect_union(a,b){const c=create_object(),d=create_object(),e=[];for(let d=0;d<a.length;d++)c[a[d]]=1;for(let f,g=0;g<b.length;g++){f=b[g];for(let a,b=0;b<f.length;b++)a=f[b],c[a]&&!d[a]&&(d[a]=1,e.push(a))}return e}