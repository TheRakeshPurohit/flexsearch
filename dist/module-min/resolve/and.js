import Resolver from"../resolver.js";import default_resolver from"./default.js";import{create_object,get_max_len}from"../common.js";Resolver.prototype.and=function(){if(this.result.length){const a=this;let b=arguments,c=b[0];if(c.then)return c.then(function(){return a.and.apply(a,b)});if(c[0]&&c[0].index)return this.and.apply(this,c);let d,e,f=[],g=[],h=0,i=0;for(let a,c=0;c<b.length;c++)if(a=b[c]){let b;if(a.constructor===Resolver)b=a.result;else if(a.constructor===Array)b=a;else if(a.index)a.resolve=!1,b=a.index.search(a).result;else if(a.or)b=this.or(a.or);else if(a.xor)b=this.xor(a.xor);else if(a.not)b=this.not(a.not);else{h=a.limit||0,i=a.offset||0,d=a.enrich,e=a.resolve;continue}f[c]=b,b.then&&g.push(b)}return g.length?Promise.all(g).then(function(){return f=[a.result].concat(f),a.result=intersect(f,h,i,d,e,a.boostval),e?a.result:a}):(f=[this.result].concat(f),this.result=intersect(f,h,i,d,e,a.boostval),e?this.result:this)}return this};function intersect(a,b,c,d,e,f){if(2>a.length)return[];let g=[],h=0,l=create_object(),m=get_max_len(a);if(!m)return g;for(let k,n=0;n<a.length;n++){if(k=a[n],!k||!k.length)return[];let d=create_object(),i=0,o=n===a.length-1;for(let a,p=0;p<m;p++)if(a=k[p],a)for(let j,m,q=0;q<a.length;q++)if(j=a[q],!n)d[j]=p+1+(n?f:0),i=1;else if(!o)(m=l[j])&&(p+1<m&&(m=p+1),d[j]=m,i=1);else if(m=l[j]){if(i=1,c){c--;continue}if(e?g.push(j):(m--,p<m&&(m=p),g[m]||(g[m]=[]),g[m].push(j)),b&&++h===b)return g}if(!i)return[];l=d}return g}