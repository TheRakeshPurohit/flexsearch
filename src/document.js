/**!
 * FlexSearch.js
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */

// COMPILER BLOCK -->
import {
    DEBUG,
    SUPPORT_ASYNC,
    SUPPORT_CACHE,
    SUPPORT_KEYSTORE,
    SUPPORT_PERSISTENT,
    SUPPORT_SERIALIZE,
    SUPPORT_STORE,
    SUPPORT_TAGS,
    SUPPORT_WORKER
} from "./config.js";
// <-- COMPILER BLOCK

import { DocumentOptions, DocumentDescriptor, DocumentIndexOptions, StoreOptions } from "./type.js";
import Index from "./index.js";
import WorkerIndex from "./worker.js";
import Cache, { searchCache } from "./cache.js";
import { is_string, is_object, parse_simple } from "./common.js";
import apply_async from "./async.js";
import { exportDocument, importDocument } from "./serialize.js";
import { KeystoreMap, KeystoreSet } from "./keystore.js";
import "./document/add.js";
import "./document/search.js";

/**
 * @constructor
 * @param {!DocumentOptions} options
 */

export default function Document(options){

    if(!this) {
        return new Document(options);
    }

    /** @type DocumentDescriptor */
    const document = options.document || options.doc || options;
    let tmp, keystore;

    this.tree = [];
    this.field = [];
    this.marker = [];
    this.key = ((tmp = document.key || document.id) && parse_tree(tmp, this.marker)) || "id";

    keystore = SUPPORT_KEYSTORE && (options.keystore || 0);
    keystore && (this.keystore = keystore);
    this.fastupdate = !!options.fastupdate;
    this.reg = this.fastupdate
        ? (keystore && SUPPORT_KEYSTORE ? new KeystoreMap(keystore) : new Map())
        : (keystore && SUPPORT_KEYSTORE ? new KeystoreSet(keystore) : new Set());

    if(SUPPORT_STORE){
        // todo support custom filter function
        this.storetree = (tmp = document.store || null) && tmp !== true && [];
        this.store = tmp && (
            keystore && SUPPORT_KEYSTORE
                ? new KeystoreMap(keystore)
                : new Map()
        );
    }

    if(SUPPORT_CACHE){
        this.cache = (tmp = options.cache || null) && new Cache(tmp);
        // do not apply cache again for the indexes since .searchCache()
        // is just a wrapper over .search()
        options.cache = false;
    }

    if(SUPPORT_WORKER){
        this.worker = options.worker;
    }

    // if(SUPPORT_ASYNC){
    //     // this switch is used by recall of promise callbacks
    //     this.async = false;
    // }

    /**
     * @type {Map<Index>}
     * @export
     */
    this.index = parse_descriptor.call(this, options, document);

    if(SUPPORT_TAGS){
        this.tag = null;
        // TODO case-insensitive tags?
        if((tmp = document.tag)){
            if(typeof tmp === "string"){
                tmp = [tmp];
            }
            if(tmp.length){
                this.tag = new Map();
                this.tagtree = [];
                this.tagfield = [];
                for(let i = 0, params, field; i < tmp.length; i++){
                    params = tmp[i];
                    field = params.field || params;
                    if(!field){
                        throw new Error("The tag field from the document descriptor is undefined.");
                    }
                    if(params.custom){
                        this.tagtree[i] = params.custom;
                    }
                    else{
                        this.tagtree[i] = parse_tree(field, this.marker);
                        if(params.filter){
                            if(typeof this.tagtree[i] === "string"){
                                // it needs an object to put a property to it
                                this.tagtree[i] = new String(this.tagtree[i]);
                            }
                            this.tagtree[i]._filter = params.filter;
                        }
                    }
                    // the tag fields needs to be hold by indices
                    this.tagfield[i] = field;
                    this.tag.set(field, new Map());
                }
            }
        }
    }

    if(SUPPORT_WORKER && this.worker){
        const promises = [];
        for(const index of this.index.values()){
            index.worker.then && promises.push(index.worker);
        }
        if(promises.length){
            const self = this;
            return Promise.all(promises).then(function(){
                return self;
            });
        }
    }
    else if(SUPPORT_PERSISTENT){
        options.db && this.mount(options.db);
    }
}

if(SUPPORT_PERSISTENT){

    Document.prototype.mount = function(db){

        let fields = this.field;

        if(SUPPORT_TAGS && this.tag){
            // tag indexes are referenced by field
            // move tags to their field indexes respectively
            for(let i = 0, field; i < this.tagfield.length; i++){
                field = this.tagfield[i];
                let index;// = this.index.get(field);
                //if(!index){
                    // create raw index when not exists
                    this.index.set(field, index = new Index({}, this.reg));
                    // copy and push to the field selection
                    if(fields === this.field){
                        fields = fields.slice(0);
                    }
                    // tag indexes also needs to be upgraded to db instances
                    fields.push(field);
                //}
                // assign reference
                index.tag = this.tag.get(field);
            }
        }

        const promises = [];
        const config = {
            db: db.db,
            type: db.type,
            fastupdate: db.fastupdate
        };

        // upgrade all indexes to db instances
        for(let i = 0, index, field; i < fields.length; i++){
            config.field = field = fields[i];
            index = this.index.get(field);
            const dbi = new db.constructor(db.id, config);
            // take over the storage id
            dbi.id = db.id;
            promises[i] = dbi.mount(index);
            // add an identification property
            index.document = true;
            if(i){
                // the register has to export just one time
                // also it's needed by the index for ID contain check
                index.bypass = true;
            }
            else if(SUPPORT_STORE){
                // the datastore has to export one time
                index.store = this.store;
            }
        }

        //this.async = true;
        this.db = true;
        return Promise.all(promises);
    };

    Document.prototype.commit = async function(replace, append){
        // parallel:
        const promises = [];
        for(const index of this.index.values()){
            promises.push(index.db.commit(index, replace, append));
        }
        await Promise.all(promises);
        this.reg.clear();
        // queued:
        // for(const index of this.index.values()){
        //     await index.db.commit(index, replace, append);
        // }
        // this.reg.clear();
    };

    Document.prototype.destroy = function(){
        const promises = [];
        for(const idx of this.index.values()){
            promises.push(idx.destroy());
        }
        return Promise.all(promises);
    }
}

/**
 * @this Document
 */

function parse_descriptor(options, document){

    const index = new Map();
    let field = document.index || document.field || document;

    if(is_string(field)){
        field = [field];
    }

    for(let i = 0, key, opt; i < field.length; i++){

        key = field[i];

        if(!is_string(key)){
            opt = key;
            key = key.field;
        }

        opt = /** @type DocumentIndexOptions */ (
            is_object(opt)
                ? Object.assign({}, options, opt)
                : options
        );

        if(SUPPORT_WORKER && this.worker){
            const worker = new WorkerIndex(opt);
            if(worker.worker){
                index.set(key, worker);
            }
            else{
                // fallback when not supported
                this.worker = false;
            }
        }

        if(!SUPPORT_WORKER || !this.worker){
            index.set(key, new Index(opt, this.reg));
        }

        if(opt.custom){
            this.tree[i] = opt.custom;
        }
        else{
            this.tree[i] = parse_tree(key, this.marker);
            if(opt.filter){
                if(typeof this.tree[i] === "string"){
                    // it needs an object to put a property to it
                    this.tree[i] = new String(this.tree[i]);
                }
                this.tree[i]._filter = opt.filter;
            }
        }

        this.field[i] = key;
    }

    if(SUPPORT_STORE && this.storetree){

        let stores = document.store;
        if(is_string(stores)) stores = [stores];

        for(let i = 0, store, field; i < stores.length; i++){
            store = /** @type Array<StoreOptions> */ (stores[i]);
            field = store.field || store;
            if(store.custom){
                this.storetree[i] = store.custom;
                store.custom._field = field;
            }
            else{
                this.storetree[i] = parse_tree(field, this.marker);
                if(store.filter){
                    if(typeof this.storetree[i] === "string"){
                        // it needs an object to put a property to it
                        this.storetree[i] = new String(this.storetree[i]);
                    }
                    this.storetree[i]._filter = store.filter;
                }
            }
        }
    }

    return index;
}

function parse_tree(key, marker){

    const tree = key.split(":");
    let count = 0;

    for(let i = 0; i < tree.length; i++){
        key = tree[i];
        // todo apply some indexes e.g. [0], [-1], [0-2]
        if(key[key.length - 1] === "]"){
            key = key.substring(0, key.length - 2);
            if(key){
                marker[count] = true;
            }
        }
        if(key){
            tree[count++] = key;
        }
    }

    if(count < tree.length){
        tree.length = count;
    }

    return count > 1 ? tree : tree[0];
}

Document.prototype.append = function(id, content){
    return this.add(id, content, true);
};

Document.prototype.update = function(id, content){
   return this.remove(id).add(id, content);
};

Document.prototype.remove = function(id){

    if(is_object(id)){
        id = parse_simple(id, this.key);
    }

    for(const index of this.index.values()){
        index.remove(id, /* skip deletion */ true);
    }

    if(this.reg.has(id)){

        if(SUPPORT_TAGS && this.tag){
            // when fastupdate was enabled all ids are already removed
            if(!this.fastupdate){
                for(let field of this.tag.values()){
                    for(let item of field){
                        const tag = item[0];
                        const ids = item[1];
                        const pos = ids.indexOf(id);
                        if(pos > -1){
                            ids.length > 1
                                ? ids.splice(pos, 1)
                                : field.delete(tag);
                        }
                    }
                }
            }
        }

        if(SUPPORT_STORE && this.store){
            this.store.delete(id);
        }

        this.reg.delete(id);
    }

    // the cache could be used outside the InMemory store
    if(SUPPORT_CACHE && this.cache){
        this.cache.remove(id);
    }

    return this;
};

Document.prototype.clear = function(){

    //const promises = [];

    for(const index of this.index.values()){
        // db index will add clear task
        index.clear();
        // const promise = index.clear();
        // if(promise instanceof Promise){
        //     promises.push(promise);
        // }
    }

    if(SUPPORT_TAGS && this.tag){
        for(const tags of this.tag.values()){
            tags.clear();
        }
    }

    if(SUPPORT_STORE && this.store){
        this.store.clear();
    }

    return this; /*promises.length
        ? Promise.all(promises)
        :*/
};

Document.prototype.contain = function(id){

    if(SUPPORT_PERSISTENT && this.db){
        return this.index.get(this.field[0]).db.has(id);
    }

    return this.reg.has(id);
};

Document.prototype.cleanup = function(){

    for(const index of this.index.values()){
        index.cleanup();
    }

    return this;
};

if(SUPPORT_STORE){

    Document.prototype.get = function(id){

        if(SUPPORT_PERSISTENT && this.db){
            return this.index.get(this.field[0]).db.enrich(id).then(function(result){
                return result[0] && result[0].doc;
            });
        }

        return this.store.get(id);
    };

    Document.prototype.set = function(id, store){

        this.store.set(id, store);
        return this;
    };
}

if(SUPPORT_CACHE){
    // todo mo
    Document.prototype.searchCache = searchCache;
}

if(SUPPORT_SERIALIZE){

    Document.prototype.export = exportDocument;
    Document.prototype.import = importDocument;
}

if(SUPPORT_ASYNC){

    apply_async(Document.prototype);
}
