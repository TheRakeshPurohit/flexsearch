import{DocumentOptions}from"./type.js";import Index from"./index.js";import WorkerIndex from"./worker/index.js";import Cache,{searchCache}from"./cache.js";import{is_string,is_object,parse_simple}from"./common.js";import apply_async from"./async.js";import{exportDocument,importDocument}from"./serialize.js";import{KeystoreMap,KeystoreSet}from"./keystore.js";import"./document/add.js";import"./document/search.js";export default function Document(a){if(!(this instanceof Document))return new Document(a);const b=a.document||a.doc||a;let c,d;if(this.tree=[],this.field=[],this.marker=[],this.key=(c=b.key||b.id)&&parse_tree(c,this.marker)||"id",d=a.keystore||0,d&&(this.keystore=d),this.fastupdate=!!a.fastupdate,this.reg=this.fastupdate?d&&!0?new KeystoreMap(d):new Map:d&&!0?new KeystoreSet(d):new Set,this.storetree=(c=b.store||null)&&!0!==c&&[],this.store=c&&(d&&!0?new KeystoreMap(d):new Map),this.cache=(c=a.cache||null)&&new Cache(c),a.cache=!1,this.worker=a.worker,this.async=!1,this.index=parse_descriptor.call(this,a,b),(this.tag=null,(c=b.tag)&&("string"==typeof c&&(c=[c]),c.length))){this.tag=new Map,this.tagtree=[],this.tagfield=[];for(let a,b,d=0;d<c.length;d++){if(a=c[d],b=a.field||a,!b)throw new Error("The tag field from the document descriptor is undefined.");a.custom?this.tagtree[d]=a.custom:(this.tagtree[d]=parse_tree(b,this.marker),a.filter&&("string"==typeof this.tagtree[d]&&(this.tagtree[d]=new String(this.tagtree[d])),this.tagtree[d]._filter=a.filter)),this.tagfield[d]=b,this.tag.set(b,new Map)}}a.db&&this.mount(a.db)}Document.prototype.mount=function(a){let b=this.field;if(this.tag)for(let a,c=0;c<this.tagfield.length;c++){a=this.tagfield[c];let d=this.index.get(a);d||(this.index.set(a,d=new Index({},this.reg)),b===this.field&&(b=b.slice(0)),b.push(a)),d.tag=this.tag.get(a)}const c=[],d={db:a.db,type:a.type,fastupdate:a.fastupdate};for(let e,f,g=0;g<b.length;g++){d.field=f=b[g],e=this.index.get(f);const h=new a.constructor(a.id,d);h.id=a.id,c[g]=h.mount(e),e.document=!0,g?e.bypass=!0:e.store=this.store}return this.async=!0,this.db=!0,Promise.all(c)},Document.prototype.commit=async function(a,b){const c=[];for(const d of this.index.values())c.push(d.db.commit(d,a,b));await Promise.all(c),this.reg.clear()};function parse_descriptor(a,b){const c=new Map;let d=b.index||b.field||b;is_string(d)&&(d=[d]);for(let e,f,g=0;g<d.length;g++){if(e=d[g],is_string(e)||(f=e,e=e.field),f=is_object(f)?Object.assign({},a,f):a,this.worker){const a=new WorkerIndex(f);c.set(e,a),a.worker||(this.worker=!1)}this.worker||c.set(e,new Index(f,this.reg)),f.custom?this.tree[g]=f.custom:(this.tree[g]=parse_tree(e,this.marker),f.filter&&("string"==typeof this.tree[g]&&(this.tree[g]=new String(this.tree[g])),this.tree[g]._filter=f.filter)),this.field[g]=e}if(this.storetree){let a=b.store;is_string(a)&&(a=[a]);for(let b,c,d=0;d<a.length;d++)b=a[d],c=b.field||b,b.custom?(this.storetree[d]=b.custom,b.custom._field=c):(this.storetree[d]=parse_tree(c,this.marker),b.filter&&("string"==typeof this.storetree[d]&&(this.storetree[d]=new String(this.storetree[d])),this.storetree[d]._filter=b.filter))}return c}function parse_tree(a,b){const c=a.split(":");let d=0;for(let e=0;e<c.length;e++)a=c[e],"]"===a[a.length-1]&&(a=a.substring(0,a.length-2),a&&(b[d]=!0)),a&&(c[d++]=a);return d<c.length&&(c.length=d),1<d?c:c[0]}Document.prototype.append=function(a,b){return this.add(a,b,!0)},Document.prototype.update=function(a,b){return this.remove(a).add(a,b)},Document.prototype.remove=function(a){is_object(a)&&(a=parse_simple(a,this.key));for(const b of this.index.values())b.remove(a,!0);if(this.reg.has(a)){if(this.tag&&!this.fastupdate)for(let b of this.tag.values())for(let c of b){const d=c[0],e=c[1],f=e.indexOf(a);-1<f&&(1<e.length?e.splice(f,1):b.delete(d))}this.store&&this.store.delete(a),this.reg.delete(a)}return this.cache&&this.cache.remove(a),this},Document.prototype.clear=function(){for(const a of this.index.values())a.clear();if(this.tag)for(const a of this.tag.values())a.clear();return this.store&&this.store.clear(),this},Document.prototype.contain=function(a){return this.db?this.index.get(this.field[0]).db.has(a):this.reg.has(a)},Document.prototype.cleanup=function(){for(const a of this.index.values())a.cleanup();return this},Document.prototype.get=function(a){return this.db?this.index.get(this.field[0]).db.enrich(a).then(function(a){return a[0]&&a[0].doc}):this.store.get(a)},Document.prototype.set=function(a,b){return this.store.set(a,b),this},Document.prototype.searchCache=searchCache,Document.prototype.export=exportDocument,Document.prototype.import=importDocument,apply_async(Document.prototype);