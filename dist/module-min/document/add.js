import{create_object,is_array,is_object,is_string,parse_simple}from"../common.js";import{KeystoreArray}from"../keystore.js";import Document from"../document.js";Document.prototype.add=function(a,b,c){if(is_object(a)&&(b=a,a=parse_simple(b,this.key)),b&&(a||0===a)){if(!c&&this.reg.has(a))return this.update(a,b);for(let d,e=0;e<this.field.length;e++){d=this.tree[e];const f=this.index.get(this.field[e]);if("function"==typeof d){const c=d(b);c&&f.add(a,c,!1,!0)}else{const e=d._filter;if(e&&!e(b))continue;d.constructor===String?d=[""+d]:is_string(d)&&(d=[d]),add_index(b,d,this.marker,0,f,a,d[0],c)}}if(this.tag)for(let d=0;d<this.tagtree.length;d++){let e,f=this.tagtree[d],g=this.tagfield[d],h=this.tag.get(g),j=create_object();if("function"!=typeof f){const a=f._filter;if(a&&!a(b))continue;f.constructor===String&&(f=""+f),e=parse_simple(b,f)}else if(e=f(b),!e)continue;if(!h||!e){continue}is_string(e)&&(e=[e]);for(let b,d,f=0;f<e.length;f++)if(b=e[f],!j[b]){j[b]=1;let e;if(e=h.get(b),e?d=e:h.set(b,d=[]),!c||!d.includes(a)){if(2147483647===d.length){const a=new KeystoreArray(d);if(this.fastupdate)for(let b of this.reg.values())b.includes(d)&&(b[b.indexOf(d)]=a);h.set(b,d=a)}if(d.push(a),this.fastupdate){const b=this.reg.get(a);b?b.push(d):this.reg.set(a,[d])}}}}if(this.store&&(!c||!this.store.has(a))){let c;if(this.storetree){c=create_object();for(let a,d=0;d<this.storetree.length;d++){a=this.storetree[d];const e=a._filter;if(e&&!e(b))continue;let f;if("function"==typeof a){if(f=a(b),!f)continue;a=[a._field]}else if(is_string(a)||a.constructor===String){c[a]=b[a];continue}store_value(b,c,a,0,a[0],f)}}this.store.set(a,c||b)}this.worker&&(this.fastupdate||this.reg.add(a))}return this};function store_value(a,b,c,d,e,f){if(a=a[e],d===c.length-1)b[e]=f||a;else if(a)if(is_array(a)){b=b[e]=Array(a.length);for(let e=0;e<a.length;e++)store_value(a,b,c,d,e)}else b=b[e]||(b[e]=create_object()),e=c[++d],store_value(a,b,c,d,e)}function add_index(a,b,c,d,e,f,g,h){if(!(a=a[g]))e.db&&e.remove(f);else if(d===b.length-1){if(is_array(a)){if(c[d]){for(let b=0;b<a.length;b++)e.add(f,a[b],!0,!0);return}a=a.join(" ")}e.add(f,a,h,!0)}else if(is_array(a))for(let g=0;g<a.length;g++)add_index(a,b,c,d,e,f,g,h);else g=b[++d],add_index(a,b,c,d,e,f,g,h)}