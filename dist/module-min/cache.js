import Index from"./index.js";import Document from"./document.js";import{SearchOptions,DocumentSearchOptions}from"./type.js";export function searchCache(a,b,c){a=("object"==typeof a?""+a.query:""+a).toLowerCase();let d=this.cache.get(a);if(!d){if(d=this.search(a,b,c),d.then){const b=this;d.then(function(c){return b.cache.set(a,c),c})}this.cache.set(a,d)}return d}export default function CacheClass(a){this.limit=a&&!0!==a?a:1000,this.cache=new Map,this.last=""}CacheClass.prototype.set=function(a,b){this.cache.set(this.last=a,b),this.cache.size>this.limit&&this.cache.delete(this.cache.keys().next().value)},CacheClass.prototype.get=function(a){const b=this.cache.get(a);return b&&this.last!==a&&(this.cache.delete(a),this.cache.set(this.last=a,b)),b},CacheClass.prototype.remove=function(a){for(const b of this.cache){const c=b[0],d=b[1];d.includes(a)&&this.cache.delete(c)}},CacheClass.prototype.clear=function(){this.cache.clear(),this.last=""};