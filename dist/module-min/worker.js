import{IndexOptions}from"./type.js";import{create_object,is_function,is_object,is_string}from"./common.js";import handler from"./worker/handler.js";let pid=0;export default function WorkerIndex(a={}){function b(f){function g(a){a=a.data||a;const b=a.id,c=b&&e.resolver[b];c&&(c(a.msg),delete e.resolver[b])}return(this.worker=f||create(c,d,a.worker),this.worker.then)?this.worker.then(b):(this.resolver=create_object(),!!this.worker)?(d?this.worker.on("message",g):this.worker.onmessage=g,a.config)?new Promise(function(b){e.resolver[++pid]=function(){b(e)},e.worker.postMessage({id:pid,task:"init",factory:c,options:a})}):(this.worker.postMessage({task:"init",factory:c,options:a}),this.worker):void 0}if(!this)return new WorkerIndex(a);let c="undefined"==typeof self?"undefined"==typeof window?null:window._factory:self._factory;c&&(c=c.toString());const d="undefined"==typeof window,e=this;this.worker=b.call(this)}register("add"),register("append"),register("search"),register("update"),register("remove");function register(a){WorkerIndex.prototype[a]=WorkerIndex.prototype[a+"Async"]=async function(){const b=this,c=[].slice.call(arguments),d=c[c.length-1];let e;is_function(d)&&(e=d,c.splice(c.length-1,1));const f=new Promise(function(d){b.resolver[++pid]=d,b.worker.postMessage({task:a,id:pid,args:c})});return e?(f.then(e),this):f}}function create(a,b,c){let d;return d=b?"undefined"==typeof module?(0,eval)("import(\"worker_threads\").then(function(worker){ return new worker[\"Worker\"]((1,eval)(\"import.meta.dirname\") + \"/node/node.mjs\"); })"):(0,eval)("new (require(\"worker_threads\")[\"Worker\"])(__dirname + \"/node/node.js\")"):a?new window.Worker(URL.createObjectURL(new Blob(["onmessage="+handler.toString()],{type:"text/javascript"}))):new window.Worker(is_string(c)?c:"worker/worker.js",{type:"module"}),d}