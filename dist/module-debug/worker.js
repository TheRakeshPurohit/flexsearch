
import { IndexOptions } from "./type.js";
import { create_object } from "./common.js";
import handler from "./worker/handler.js";
import apply_async from "./async.js";

let pid = 0;

/**
 * @param {IndexOptions=} options
 * @constructor
 */

export default function WorkerIndex(options = /** @type IndexOptions */{}) {

    if (!this || this.constructor !== WorkerIndex) {
        return new WorkerIndex(options);
    }

    // the factory is the outer wrapper from the build
    // it uses "self" as a trap for node.js
    let factory = "undefined" != typeof self ? self._factory : "undefined" != typeof window ? window._factory : null;
    if (factory) {
        factory = factory.toString();
    }

    const is_node_js = "undefined" == typeof window /*&& self["exports"]*/,
          _self = this;

    /**
     * @this {WorkerIndex}
     */
    function init(worker) {

        this.worker = worker;
        this.resolver = create_object();

        if (!this.worker) {
            return;
        }

        function onmessage(msg) {
            msg = msg.data || msg;
            const id = msg.id,
                  res = id && _self.resolver[id];

            if (res) {
                res(msg.msg);
                delete _self.resolver[id];
            }
        }

        is_node_js ? this.worker.on("message", onmessage) : this.worker.onmessage = onmessage;

        if (options.config) {

            // when extern configuration needs to be loaded
            // it needs to return a promise to await for
            return new Promise(function (resolve) {

                _self.resolver[++pid] = function () {
                    resolve(_self);
                };

                _self.worker.postMessage({
                    id: pid,
                    task: "init",
                    factory: factory,
                    options: options
                });
            });
        }

        this.worker.postMessage({
            task: "init",
            factory: factory,
            options: options
        });

        return this;
    }

    const worker = create(factory, is_node_js, options.worker);
    return worker.then ? worker.then(function (worker) {
        return init.call(_self, worker);
    }) : init.call(this, worker);
}

register("add");
register("append");
register("search");
register("update");
register("remove");
register("clear");
register("export");
register("import");

apply_async(WorkerIndex.prototype);


function register(key) {

    WorkerIndex.prototype[key] = function () {
        const self = this,
              args = [].slice.call(arguments),
              arg = args[args.length - 1];

        let callback;

        if ("function" == typeof arg) {
            callback = arg;
            args.pop();
        }

        const promise = new Promise(function (resolve) {
            if ("export" === key && "function" == typeof args[0]) {
                // remove function handler
                args[0] = null;
            }
            self.resolver[++pid] = resolve;
            self.worker.postMessage({
                task: key,
                id: pid,
                args: args
            });
        });

        if (callback) {
            promise.then(callback);
            return this;
        } else {
            return promise;
        }
    };
}

function create(factory, is_node_js, worker_path) {

    let worker = is_node_js ?
    // This eval will be removed when compiling
    "undefined" != typeof module ? (0, eval)('new (require("worker_threads")["Worker"])(__dirname + "/node/node.js")')
    //: (0,eval)('new ((await import("worker_threads"))["Worker"])(import.meta.dirname + "/worker/node.mjs")')
    //: (0,eval)('new ((await import("worker_threads"))["Worker"])((1,eval)(\"import.meta.dirname\") + "/node/node.mjs")')
    : (0, eval)('import("worker_threads").then(function(worker){ return new worker["Worker"]((1,eval)(\"import.meta.dirname\") + "/node/node.mjs"); })')
    //: import("worker_threads").then(function(worker){ return new worker["Worker"](import.meta.dirname + "/worker/node.mjs"); })

    //eval('new (require("worker_threads")["Worker"])(__dirname + "/node/node.js")')
    : factory ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + handler.toString()], { type: "text/javascript" }))) : new window.Worker("string" == typeof worker_path ? worker_path : import.meta.url.replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", "module/worker/worker.js") /*"worker/worker.js"*/
    , { type: "module" });

    return worker;
}