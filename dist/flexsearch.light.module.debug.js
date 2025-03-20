/**!
 * FlexSearch.js v0.8.113 (Bundle/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
var q;
function r(a, c, b) {
  const f = typeof b, d = typeof a;
  if ("undefined" !== f) {
    if ("undefined" !== d) {
      if (b) {
        if ("function" === d && f === d) {
          return function(h) {
            return a(b(h));
          };
        }
        c = a.constructor;
        if (c === b.constructor) {
          if (c === Array) {
            return b.concat(a);
          }
          if (c === Map) {
            var g = new Map(b);
            for (var e of a) {
              g.set(e[0], e[1]);
            }
            return g;
          }
          if (c === Set) {
            e = new Set(b);
            for (g of a.values()) {
              e.add(g);
            }
            return e;
          }
        }
      }
      return a;
    }
    return b;
  }
  return "undefined" === d ? c : a;
}
function w() {
  return Object.create(null);
}
;const y = /[^\p{L}\p{N}]+/u, z = /(\d{3})/g, A = /(\D)(\d{3})/g, B = /(\d{3})(\D)/g, D = "".normalize && /[\u0300-\u036f]/g;
function F(a) {
  if (!this || this.constructor !== F) {
    return new F(...arguments);
  }
  for (let c = 0; c < arguments.length; c++) {
    this.assign(arguments[c]);
  }
}
q = F.prototype;
q.assign = function(a) {
  this.normalize = r(a.normalize, !0, this.normalize);
  let c = a.include, b = c || a.exclude || a.split, f;
  if (b || "" === b) {
    if ("object" === typeof b && b.constructor !== RegExp) {
      let d = "";
      f = !c;
      c || (d += "\\p{Z}");
      b.letter && (d += "\\p{L}");
      b.number && (d += "\\p{N}", f = !!c);
      b.symbol && (d += "\\p{S}");
      b.punctuation && (d += "\\p{P}");
      b.control && (d += "\\p{C}");
      if (b = b.char) {
        d += "object" === typeof b ? b.join("") : b;
      }
      try {
        this.split = new RegExp("[" + (c ? "^" : "") + d + "]+", "u");
      } catch (g) {
        console.error("Your split configuration:", b, "is not supported on this platform. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
      }
    } else {
      this.split = b, f = !1 === b || 2 > "a1a".split(b).length;
    }
    this.numeric = r(a.numeric, f);
  } else {
    try {
      this.split = r(this.split, y);
    } catch (d) {
      console.warn("This platform does not support unicode regex. It falls back to using simple whitespace splitter instead: /s+/."), this.split = /\s+/;
    }
    this.numeric = r(a.numeric, r(this.numeric, !0));
  }
  this.prepare = r(a.prepare, null, this.prepare);
  this.finalize = r(a.finalize, null, this.finalize);
  this.rtl = r(a.rtl, !1, this.rtl);
  this.dedupe = r(a.dedupe, !1, this.dedupe);
  this.filter = r((b = a.filter) && new Set(b), null, this.filter);
  this.matcher = r((b = a.matcher) && new Map(b), null, this.matcher);
  this.mapper = r((b = a.mapper) && new Map(b), null, this.mapper);
  this.stemmer = r((b = a.stemmer) && new Map(b), null, this.stemmer);
  this.replacer = r(a.replacer, null, this.replacer);
  this.minlength = r(a.minlength, 1, this.minlength);
  this.maxlength = r(a.maxlength, 0, this.maxlength);
  if (this.cache = b = r(a.cache, !0, this.cache)) {
    this.l = null, this.A = "number" === typeof b ? b : 2e5, this.i = new Map(), this.j = new Map(), this.o = this.m = 128;
  }
  this.g = "";
  this.s = null;
  this.h = "";
  this.u = null;
  if (this.matcher) {
    for (const d of this.matcher.keys()) {
      this.g += (this.g ? "|" : "") + d;
    }
  }
  if (this.stemmer) {
    for (const d of this.stemmer.keys()) {
      this.h += (this.h ? "|" : "") + d;
    }
  }
  return this;
};
q.addStemmer = function(a, c) {
  this.stemmer || (this.stemmer = new Map());
  this.stemmer.set(a, c);
  this.h += (this.h ? "|" : "") + a;
  this.u = null;
  this.cache && G(this);
  return this;
};
q.addFilter = function(a) {
  this.filter || (this.filter = new Set());
  this.filter.add(a);
  this.cache && G(this);
  return this;
};
q.addMapper = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (1 < a.length) {
    return this.addMatcher(a, c);
  }
  this.mapper || (this.mapper = new Map());
  this.mapper.set(a, c);
  this.cache && G(this);
  return this;
};
q.addMatcher = function(a, c) {
  if ("object" === typeof a) {
    return this.addReplacer(a, c);
  }
  if (2 > a.length && (this.dedupe || this.mapper)) {
    return this.addMapper(a, c);
  }
  this.matcher || (this.matcher = new Map());
  this.matcher.set(a, c);
  this.g += (this.g ? "|" : "") + a;
  this.s = null;
  this.cache && G(this);
  return this;
};
q.addReplacer = function(a, c) {
  if ("string" === typeof a) {
    return this.addMatcher(a, c);
  }
  this.replacer || (this.replacer = []);
  this.replacer.push(a, c);
  this.cache && G(this);
  return this;
};
q.encode = function(a) {
  if (this.cache && a.length <= this.m) {
    if (this.l) {
      if (this.i.has(a)) {
        return this.i.get(a);
      }
    } else {
      this.l = setTimeout(G, 50, this);
    }
  }
  this.normalize && ("function" === typeof this.normalize ? a = this.normalize(a) : a = D ? a.normalize("NFKD").replace(D, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(A, "$1 $2").replace(B, "$1 $2").replace(z, "$1 "));
  const c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer);
  let b = [], f = this.split || "" === this.split ? a.split(this.split) : a;
  for (let g = 0, e, h; g < f.length; g++) {
    if ((e = h = f[g]) && !(e.length < this.minlength)) {
      if (c) {
        b.push(e);
      } else {
        if (!this.filter || !this.filter.has(e)) {
          if (this.cache && e.length <= this.o) {
            if (this.l) {
              var d = this.j.get(e);
              if (d || "" === d) {
                d && b.push(d);
                continue;
              }
            } else {
              this.l = setTimeout(G, 50, this);
            }
          }
          this.stemmer && 2 < e.length && (this.u || (this.u = new RegExp("(?!^)(" + this.h + ")$")), e = e.replace(this.u, k => this.stemmer.get(k)), e.length < this.minlength || this.filter && this.filter.has(e)) && (e = "");
          if (e && (this.mapper || this.dedupe && 1 < e.length)) {
            d = "";
            for (let k = 0, n = "", m, u; k < e.length; k++) {
              m = e.charAt(k), m === n && this.dedupe || ((u = this.mapper && this.mapper.get(m)) || "" === u ? u === n && this.dedupe || !(n = u) || (d += u) : d += n = m);
            }
            e = d;
          }
          this.matcher && 1 < e.length && (this.s || (this.s = new RegExp("(" + this.g + ")", "g")), e = e.replace(this.s, k => this.matcher.get(k)));
          if (e && this.replacer) {
            for (d = 0; e && d < this.replacer.length; d += 2) {
              e = e.replace(this.replacer[d], this.replacer[d + 1]);
            }
          }
          this.cache && h.length <= this.o && (this.j.set(h, e), this.j.size > this.A && (this.j.clear(), this.o = this.o / 1.1 | 0));
          e && b.push(e);
        }
      }
    }
  }
  this.finalize && (b = this.finalize(b) || b);
  this.cache && a.length <= this.m && (this.i.set(a, b), this.i.size > this.A && (this.i.clear(), this.m = this.m / 1.1 | 0));
  return b;
};
function G(a) {
  a.l = null;
  a.i.clear();
  a.j.clear();
}
;function H(a, c, b) {
  if (!a.length) {
    return a;
  }
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? c ? a.slice(b, b + c) : a.slice(b) : a;
  }
  let f = [];
  for (let d = 0, g, e; d < a.length; d++) {
    if ((g = a[d]) && (e = g.length)) {
      if (b) {
        if (b >= e) {
          b -= e;
          continue;
        }
        b < e && (g = c ? g.slice(b, b + c) : g.slice(b), e = g.length, b = 0);
      }
      e > c && (g = g.slice(0, c), e = c);
      if (!f.length && e >= c) {
        return g;
      }
      f.push(g);
      c -= e;
      if (!c) {
        break;
      }
    }
  }
  return f = 1 < f.length ? [].concat.apply([], f) : f[0];
}
;w();
function I(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.g = "";
}
I.prototype.set = function(a, c) {
  this.cache.set(this.g = a, c);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
I.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.g !== a && (this.cache.delete(a), this.cache.set(this.g = a, c));
  return c;
};
I.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
I.prototype.clear = function() {
  this.cache.clear();
  this.g = "";
};
const J = {normalize:function(a) {
  return a.toLowerCase();
}};
const K = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
L.prototype.add = function(a, c, b, f) {
  if (c && (a || 0 === a)) {
    if (!f && !b && this.reg.has(a)) {
      return this.update(a, c);
    }
    c = this.encoder.encode(c);
    if (f = c.length) {
      const n = w(), m = w(), u = this.depth, C = this.resolution;
      for (let p = 0; p < f; p++) {
        let l = c[this.rtl ? f - 1 - p : p];
        var d = l.length;
        if (d && (u || !m[l])) {
          var g = this.score ? this.score(c, l, p, null, 0) : M(C, f, p), e = "";
          switch(this.tokenize) {
            case "full":
              if (2 < d) {
                for (g = 0; g < d; g++) {
                  for (var h = d; h > g; h--) {
                    e = l.substring(g, h);
                    var k = this.score ? this.score(c, l, p, e, g) : M(C, f, p, d, g);
                    N(this, m, e, k, a, b);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < d) {
                for (h = d - 1; 0 < h; h--) {
                  e = l[h] + e, k = this.score ? this.score(c, l, p, e, h) : M(C, f, p, d, h), N(this, m, e, k, a, b);
                }
                e = "";
              }
            case "forward":
              if (1 < d) {
                for (h = 0; h < d; h++) {
                  e += l[h], N(this, m, e, g, a, b);
                }
                break;
              }
            default:
              if (N(this, m, l, g, a, b), u && 1 < f && p < f - 1) {
                for (d = w(), e = this.v, g = l, h = Math.min(u + 1, f - p), d[g] = 1, k = 1; k < h; k++) {
                  if ((l = c[this.rtl ? f - 1 - p - k : p + k]) && !d[l]) {
                    d[l] = 1;
                    const v = this.score ? this.score(c, g, p, l, k) : M(e + (f / 2 > e ? 0 : 1), f, p, h - 1, k - 1), t = this.bidirectional && l > g;
                    N(this, n, t ? g : l, v, a, b, t ? l : g);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.reg.add(a);
    }
  }
  return this;
};
function N(a, c, b, f, d, g, e) {
  let h = e ? a.ctx : a.map, k;
  if (!c[b] || e && !(k = c[b])[e]) {
    e ? (c = k || (c[b] = w()), c[e] = 1, (k = h.get(e)) ? h = k : h.set(e, h = new Map())) : c[b] = 1, (k = h.get(b)) ? h = k : h.set(b, h = []), h = h[f] || (h[f] = []), g && h.includes(d) || (h.push(d), a.fastupdate && ((c = a.reg.get(d)) ? c.push(h) : a.reg.set(d, [h])));
  }
}
function M(a, c, b, f, d) {
  return b && 1 < a ? c + (f || 0) <= a ? b + (d || 0) : (a - 1) / (c + (f || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
;L.prototype.search = function(a, c, b) {
  b || (c || "object" !== typeof a ? "object" === typeof c && (b = c, c = 0) : (b = a, a = ""));
  var f = [], d = 0;
  if (b) {
    a = b.query || a;
    c = b.limit || c;
    d = b.offset || 0;
    var g = b.context;
    var e = b.suggest;
    var h = !0;
    var k = b.resolution;
  } else {
    h = !0;
  }
  a = this.encoder.encode(a);
  b = a.length;
  c = c || (h ? 100 : 0);
  if (1 === b) {
    return e = d, (d = O(this, a[0], "")) && d.length ? H.call(this, d, c, e) : [];
  }
  g = this.depth && !1 !== g;
  if (2 === b && g && !e) {
    return e = d, (d = O(this, a[0], a[1])) && d.length ? H.call(this, d, c, e) : [];
  }
  h = w();
  var n = 0;
  if (1 < b && g) {
    var m = a[0];
    n = 1;
  }
  k || 0 === k || (k = m ? this.v : this.resolution);
  for (let l, v; n < b; n++) {
    if ((v = a[n]) && !h[v]) {
      h[v] = 1;
      l = O(this, v, m);
      a: {
        g = l;
        var u = f, C = e, p = k;
        let t = [];
        if (g && g.length) {
          if (g.length <= p) {
            u.push(g);
            l = void 0;
            break a;
          }
          for (let x = 0, E; x < p; x++) {
            if (E = g[x]) {
              t[x] = E;
            }
          }
          if (t.length) {
            u.push(t);
            l = void 0;
            break a;
          }
        }
        l = C ? void 0 : t;
      }
      if (l) {
        f = l;
        break;
      }
      m && (e && l && f.length || (m = v));
    }
    e && m && n === b - 1 && !f.length && (m = "", n = -1, h = w());
  }
  a: {
    a = f;
    f = a.length;
    m = a;
    if (1 < f) {
      b: {
        f = e;
        m = a.length;
        e = [];
        b = w();
        for (let l = 0, v, t, x, E; l < k; l++) {
          for (n = 0; n < m; n++) {
            if (x = a[n], l < x.length && (v = x[l])) {
              for (g = 0; g < v.length; g++) {
                t = v[g], (h = b[t]) ? b[t]++ : (h = 0, b[t] = 1), E = e[h] || (e[h] = []), E.push(t);
              }
            }
          }
        }
        if (a = e.length) {
          if (f) {
            if (1 < e.length) {
              c: {
                for (a = [], k = w(), f = e.length, h = f - 1; 0 <= h; h--) {
                  if (b = (f = e[h]) && f.length) {
                    for (n = 0; n < b; n++) {
                      if (m = f[n], !k[m]) {
                        if (k[m] = 1, d) {
                          d--;
                        } else {
                          if (a.push(m), a.length === c) {
                            break c;
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              a = (e = e[0]).length > c || d ? e.slice(d, c + d) : e;
            }
            e = a;
          } else {
            if (a < m) {
              m = [];
              break b;
            }
            e = e[a - 1];
            if (c || d) {
              if (e.length > c || d) {
                e = e.slice(d, c + d);
              }
            }
          }
        }
        m = e;
      }
    } else if (1 === f) {
      c = H.call(null, a[0], c, d);
      break a;
    }
    c = m;
  }
  return c;
};
function O(a, c, b) {
  let f;
  b && (f = a.bidirectional && c > b) && (f = b, b = c, c = f);
  a = b ? (a = a.ctx.get(b)) && a.get(c) : a.map.get(c);
  return a;
}
;L.prototype.remove = function(a, c) {
  const b = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (b) {
    if (this.fastupdate) {
      for (let f = 0, d; f < b.length; f++) {
        if (d = b[f]) {
          if (2 > d.length) {
            d.pop();
          } else {
            const g = d.indexOf(a);
            g === b.length - 1 ? d.pop() : d.splice(g, 1);
          }
        }
      }
    } else {
      P(this.map, a), this.depth && P(this.ctx, a);
    }
    c || this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function P(a, c) {
  let b = 0;
  if (a.constructor === Array) {
    for (let f = 0, d, g; f < a.length; f++) {
      if ((d = a[f]) && d.length) {
        if (g = d.indexOf(c), 0 <= g) {
          1 < d.length ? (d.splice(g, 1), b++) : delete a[f];
          break;
        } else {
          b++;
        }
      }
    }
  } else {
    for (let f of a.entries()) {
      const d = f[0], g = P(f[1], c);
      g ? b += g : a.delete(d);
    }
  }
  return b;
}
;function L(a, c) {
  if (!this || this.constructor !== L) {
    return new L(a);
  }
  if (a) {
    var b = "string" === typeof a ? a : a.preset;
    b && (K[b] || console.warn("Preset not found: " + b), a = Object.assign({}, K[b], a));
  } else {
    a = {};
  }
  b = a.context;
  const f = !0 === b ? {depth:1} : b || {}, d = a.encode || a.encoder || J;
  this.encoder = d.encode ? d : "object" === typeof d ? new F(d) : {encode:d};
  this.resolution = a.resolution || 9;
  this.tokenize = (b = a.tokenize) && "default" !== b && b || "strict";
  this.depth = "strict" === b && f.depth || 0;
  this.bidirectional = !1 !== f.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  b = !1;
  this.map = new Map();
  this.ctx = new Map();
  this.reg = c || (this.fastupdate ? new Map() : new Set());
  this.v = f.resolution || 3;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (b = a.cache || null) && new I(b);
}
q = L.prototype;
q.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  return this;
};
q.append = function(a, c) {
  return this.add(a, c, !0);
};
q.contain = function(a) {
  return this.reg.has(a);
};
q.update = function(a, c) {
  const b = this, f = this.remove(a);
  return f && f.then ? f.then(() => b.add(a, c)) : this.add(a, c);
};
function Q(a) {
  let c = 0;
  if (a.constructor === Array) {
    for (let b = 0, f; b < a.length; b++) {
      (f = a[b]) && (c += f.length);
    }
  } else {
    for (const b of a) {
      const f = b[0], d = Q(b[1]);
      d ? c += d : a.delete(f);
    }
  }
  return c;
}
q.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Q(this.map);
  this.depth && Q(this.ctx);
  return this;
};
q.searchCache = function(a, c, b) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  this.cache || (this.cache = new I());
  let f = this.cache.get(a);
  if (!f) {
    f = this.search(a, c, b);
    if (f.then) {
      const d = this;
      f.then(function(g) {
        d.cache.set(a, g);
        return g;
      });
    }
    this.cache.set(a, f);
  }
  return f;
};
export default {Index:L, Charset:null, Encoder:F, Document:null, Worker:null, Resolver:null, IndexedDB:null, Language:{}};

export const Index=L;export const  Charset=null;export const  Encoder=F;export const  Document=null;export const  Worker=null;export const  Resolver=null;export const  IndexedDB=null;export const  Language={};