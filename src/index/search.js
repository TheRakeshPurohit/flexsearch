// COMPILER BLOCK -->
import {
    SUPPORT_CACHE,
    SUPPORT_COMPRESSION,
    SUPPORT_DOCUMENT,
    SUPPORT_PERSISTENT,
    SUPPORT_RESOLVER,
    SUPPORT_SUGGESTION,
    SUPPORT_TAGS
} from "../config.js";
// <-- COMPILER BLOCK

import { SearchOptions, SearchResults, EnrichedSearchResults } from "../type.js";
import { create_object, is_object, sort_by_length_down } from "../common.js";
import Index from "../index.js";
import default_compress from "../compress.js";
import Resolver from "../resolver.js";
import { intersect } from "../intersect.js";
import resolve_default from "../resolve/default.js";

let global_resolve = 1;
export function set_resolve(resolve){
    global_resolve = resolve;
}

/**
 * @param {string|SearchOptions} query
 * @param {number|SearchOptions=} limit
 * @param {SearchOptions=} options
 * @returns {SearchResults|EnrichedSearchResults|Resolver|Promise<SearchResults|EnrichedSearchResults|Resolver>}
 */

Index.prototype.search = function(query, limit, options){

    if(!options){
        if(!limit && is_object(query)){
            options = /** @type {!SearchOptions} */ (query);
            query = "";
        }
        else if(is_object(limit)){
            options = /** @type {!SearchOptions} */ (limit);
            limit = 0;
        }
    }

    let result = [];
    let length;
    let context, suggest, offset = 0, resolve, enrich, tag, cache, boost, resolution;

    if(options){
        query = options.query || query;
        limit = options.limit || limit;
        offset = options.offset || 0;
        context = options.context;
        suggest = SUPPORT_SUGGESTION && options.suggest;
        resolve = !SUPPORT_RESOLVER || (global_resolve && options.resolve !== false);
        resolve || (global_resolve = 0);
        enrich = resolve && options.enrich;
        boost = options.boost;
        resolution = options.resolution;
        tag = SUPPORT_PERSISTENT && SUPPORT_DOCUMENT && SUPPORT_TAGS && this.db && options.tag;
    }
    else{
        resolve = !SUPPORT_RESOLVER || this.resolve || global_resolve;
    }

    // todo: term deduplication during encoding when context is disabled

    // do not force a string as input
    // https://github.com/nextapps-de/flexsearch/issues/432
    /** @type {Array<string>} */
    let query_terms = this.encoder.encode(query);
    length = query_terms.length;
    limit || !resolve || (limit = 100);

    // fast path single term
    if(length === 1){
        return single_term_query.call(
            this,
            query_terms[0], // term
            "",       // ctx
            limit,
            offset,
            resolve,
            enrich,
            tag
        );
    }

    // TODO: dedupe terms within encoder?
    // TODO: deduplication will break the context chain

    context = this.depth && context !== false;

    // fast path single context
    if(length === 2 && context && !suggest){
        return single_term_query.call(
            this,
            query_terms[0], // term
            query_terms[1], // ctx
            limit,
            offset,
            resolve,
            enrich,
            tag
        );
    }

    let maxlength = 0;
    let minlength = 0;

    if(length > 1){

        // term deduplication will break the context chain
        // todo add context to dupe check
        const dupes = create_object();
        const query_new = [];

        // if(context){
        //     keyword = query_terms[0];
        //     dupes[keyword] = 1;
        //     query_new.push(keyword);
        //     maxlength = minlength = keyword.length;
        //     i = 1;
        // }

        for(let i = 0, term; i < length; i++){

            term = query_terms[i];

            if(term && !dupes[term]){

                // todo add keyword check
                // this fast path can't apply to persistent indexes
                if(!suggest && !(SUPPORT_PERSISTENT && this.db) && !this.get_array(term/*, keyword*/)){

                    // fast path "not found"
                    return !SUPPORT_RESOLVER || resolve
                        ? result
                        : new Resolver(result);
                }
                else{

                    query_new.push(term);
                    dupes[term] = 1;
                }

                const term_length = term.length;
                maxlength = Math.max(maxlength, term_length);
                minlength = minlength ? Math.min(minlength, term_length) : term_length;
            }
            // else if(term && (!this.depth || context === false)){
            //     query_new.push(term);
            // }
        }

        query_terms = query_new;
        length = query.length;
    }

    // the term length could be changed after deduplication

    if(!length){
        return !SUPPORT_RESOLVER || resolve
            ? result
            : new Resolver(result);
    }

    let index = 0, keyword;

    // fast path single term
    if(length === 1){
        return single_term_query.call(
            this,
            query_terms[0], // term
            "",       // ctx
            limit,
            offset,
            resolve,
            enrich,
            tag
        );
    }

    // fast path single context
    if(length === 2 && context && !suggest){
        return single_term_query.call(
            this,
            query_terms[0], // term
            query_terms[1], // ctx
            limit,
            offset,
            resolve,
            enrich,
            tag
        );
    }

    if(length > 1){
        if(context){
            // start with context right away
            keyword = query_terms[0];
            index = 1;
        }
        // todo
        else if(maxlength > 9 && (maxlength / minlength) > 3){
            // sorting terms will break the context chain
            // bigger terms has less occurrence
            // this might also reduce the intersection task
            // todo check intersection order
            query_terms.sort(sort_by_length_down);
        }
    }

    if(!resolution && resolution !== 0){
        resolution = this.resolution;
    }

    // from this point there are just multi-term queries

    if(SUPPORT_PERSISTENT && this.db){

        if(this.db.search){
            // when the configuration is not supported it returns false
            const result = this.db.search(this, query_terms, limit, offset, suggest, resolve, enrich, tag);
            if(result !== false) return result;
        }

        const self = this;
        return (async function(){

            for(let arr, term; index < length; index++){

                term = query_terms[index];

                if(keyword){

                    arr = await self.get_array(term, keyword, 0, 0, false, false);
                    arr = add_result(
                        arr,
                        result,
                        suggest,
                        self.resolution_ctx,
                        // 0, // /** @type {!number} */ (limit),
                        // 0, // offset,
                        // length === 2
                        // /*, term, keyword*/
                    );

                    // the context is a moving window where the keyword is going forward like a cursor
                    // 1. when suggestion enabled just forward keyword if term was found
                    // 2. as long as the result is empty forward the pointer also
                    if(!suggest || (arr !== false) || !result.length){
                        keyword = term;
                    }
                }
                else{

                    arr = await self.get_array(term, "", 0, 0, false, false);
                    arr = add_result(
                        arr,
                        result,
                        suggest,
                        resolution,
                        // 0, // /** @type {!number} */ (limit),
                        // 0, // offset,
                        // length === 1
                        // /*, term*/
                    );
                }

                // limit reached
                if(arr){
                    return arr;
                }

                // apply suggestions on last loop
                if(suggest && (index === length - 1)){
                    let length = result.length;
                    if(!length){
                        // fallback to non-contextual search when no result was found
                        if(keyword){
                            keyword = "";
                            index = -1;
                            continue;
                        }
                        return result;
                    }
                    else if(length === 1){
                        return !SUPPORT_RESOLVER || resolve
                            ? resolve_default(result[0], /** @type {number} */ (limit), offset)
                            : new Resolver(result[0]);
                    }
                }
            }

            return !SUPPORT_RESOLVER || resolve
                ? intersect(result, resolution, /** @type {number} */ (limit), offset, suggest, boost, resolve)
                : new Resolver(result[0])
        }());
    }

    for(let arr, term; index < length; index++){

        term = query_terms[index];

        if(keyword){

            arr = this.get_array(term, keyword, 0, 0, false, false);
            arr = /*this.*/add_result(
                arr,
                result,
                suggest,
                this.resolution_ctx,
                // 0, // /** @type {!number} */ (limit),
                // 0, // offset,
                // length === 2
                // /*, term, keyword*/
            );

            // 1. when suggestion enabled just forward keyword if term was found
            // 2. as long as the result is empty forward the pointer also
            if(!suggest || (arr !== false) || !result.length){
                keyword = term;
            }
        }
        else{

            arr = this.get_array(term, "", 0, 0, false, false);
            arr = /*this.*/add_result(
                arr,
                result,
                suggest,
                resolution,
                // 0, // /** @type {!number} */ (limit),
                // 0, // offset,
                // length === 1
                // /*, term*/
            );
        }

        // limit reached
        if(arr){
            return /** @type {Array} */ (arr);
        }

        // apply suggestions on last loop
        if(suggest && (index === length - 1)){
            const length = result.length;
            if(!length){
                // fallback to non-contextual search when no result was found
                if(keyword){
                    keyword = "";
                    index = -1;
                    continue;
                }
                return result;
            }
            else if(length === 1){
                return !SUPPORT_RESOLVER || resolve
                    ? resolve_default(result[0], /** @type {number} */ (limit), offset)
                    : new Resolver(result[0]);
            }
        }
    }

    result = intersect(result, resolution, limit, offset, suggest, boost, resolve);

    return !SUPPORT_RESOLVER || resolve
        ? result
        : new Resolver(result);
};

/**
 * @param term
 * @param keyword
 * @param limit
 * @param offset
 * @param resolve
 * @param enrich
 * @param tag
 * @this {Index}
 * @return {Array|Resolver}
 */

function single_term_query(term, keyword, limit, offset, resolve, enrich, tag){

    const result = this.get_array(term, keyword, limit, offset, resolve, enrich, tag);

    if(SUPPORT_PERSISTENT && this.db){
        return result.then(function(result){
            if(resolve) return result;
            return result && result.length
                ? (!SUPPORT_RESOLVER || resolve ? resolve_default(result, limit, offset): new Resolver(result))
                : !SUPPORT_RESOLVER || resolve ? [] : new Resolver([]);
        });
    }

    return result && result.length
        ? (!SUPPORT_RESOLVER || resolve ? resolve_default(result, limit, offset) : new Resolver(result))
        : !SUPPORT_RESOLVER || resolve ? [] : new Resolver([]);
}

/**
 * Returns a 1-dimensional finalized array when the result is done (fast path return),
 * returns false when suggestions is enabled and no result was found,
 * or returns nothing when a set was pushed successfully to the results
 *
 * @private
 * @param {Array} arr
 * @param {Array} result
 * @param {boolean|null=} suggest
 * @param {number=} resolution
 * @return {Array|boolean|undefined}
 */

function add_result(arr, result, suggest, resolution/*, limit, offset single_term, term, keyword*/){

    let word_arr = [];
    //let arr;// = keyword ? this.ctx : this.map;
    //arr = this.get_array(term, keyword);

    if(arr){

        //const resolution = Math.min(arr.length, keyword ? this.resolution_ctx : this.resolution);
        // apply reduced resolution for queries
        resolution = Math.min(arr.length, resolution);

        for(let x = 0, size = 0, tmp; x < resolution; x++){
            if((tmp = arr[x])){

                // if(offset){
                //     // apply offset right here on single terms
                //     if(tmp && single_term){
                //         if(tmp.length <= offset){
                //             offset -= tmp.length;
                //             tmp = null;
                //         }
                //         else{
                //             tmp = tmp.slice(offset);
                //             offset = 0;
                //         }
                //     }
                // }

                if(tmp){

                    // keep score (sparse array):
                    word_arr[x] = tmp;
                    // simplified score order:
                    //word_arr.push(tmp);

                    // if(single_term){
                    //     size += tmp.length;
                    //     if(size >= limit){
                    //         // fast path:
                    //         // a single term does not need to pre-collect results
                    //         break;
                    //     }
                    // }
                }
            }
        }

        if(word_arr.length){
            // if(single_term){
            //     // fast path optimization
            //     // offset was already applied at this point
            //     // return an array will stop the query process immediately
            //     return resolve_default(word_arr, limit, 0);
            // }

            result.push(word_arr);
            // return nothing will continue the query
            return;
        }
    }

    // 1. return an empty array will stop the loop
    // 2. return a false value to prevent stop when using suggestions
    return !suggest && word_arr;
}

Index.prototype.get_array = function(term, keyword, limit, offset, resolve, enrich, tag){

    let arr, swap;

    if(keyword){
        swap = this.bidirectional && (term > keyword);
    }

    if(SUPPORT_COMPRESSION && this.compress){
        term = default_compress(term);
        keyword && (keyword = default_compress(keyword));
    }

    if(SUPPORT_PERSISTENT && this.db){
        return keyword
            ? this.db.get(
                swap ? keyword : term, // term
                swap ? term : keyword, // ctx
                limit,
                offset,
                resolve,
                enrich,
                tag
            )
            : this.db.get(
                term,
                "", // ctx
                limit,
                offset,
                resolve,
                enrich,
                tag
            );
    }

    if(keyword){
        // the frequency of the starting letter is slightly less
        // on the last half of the alphabet (m-z) in almost every latin language,
        // so we sort downwards (https://en.wikipedia.org/wiki/Letter_frequency)
        arr = this.ctx.get(swap ? term : keyword);
        arr = arr && arr.get(swap ? keyword : term);
    }
    else{
        arr = this.map.get(term);
    }

    return arr;
}
