/**!
 * FlexSearch.js v0.8.0 (Light/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';
function t(a, c, b) {
  const d = typeof b, e = typeof a;
  if ("undefined" !== d) {
    if ("undefined" !== e) {
      if (b) {
        if ("function" === e && d === e) {
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
            for (var f of a) {
              g.set(f[0], f[1]);
            }
            return g;
          }
          if (c === Set) {
            f = new Set(b);
            for (g of a.values()) {
              f.add(g);
            }
            return f;
          }
        }
      }
      return a;
    }
    return b;
  }
  return "undefined" === e ? c : a;
}
function u() {
  return Object.create(null);
}
function w(a, c) {
  return c.length - a.length;
}
;const x = /[^\p{L}\p{N}]+/u, y = /(\d{3})/g, z = /(\D)(\d{3})/g, A = /(\d{3})(\D)/g, B = "".normalize && /[\u0300-\u036f]/g;
function C(a = {}) {
  if (!(this instanceof C)) {
    return new C(...arguments);
  }
  for (a = 0; a < arguments.length; a++) {
    this.assign(arguments[a]);
  }
}
C.prototype.assign = function(a) {
  this.normalize = t(a.normalize, !0, this.normalize);
  let c = a.N, b = c || a.O || a.split;
  if ("object" === typeof b) {
    let d = !c, e = "";
    a.N || (e += "\\p{Z}");
    b.P && (e += "\\p{L}");
    b.R && (e += "\\p{N}", d = !!c);
    b.T && (e += "\\p{S}");
    b.S && (e += "\\p{P}");
    b.control && (e += "\\p{C}");
    if (b = b.char) {
      e += "object" === typeof b ? b.join("") : b;
    }
    this.split = new RegExp("[" + (c ? "^" : "") + e + "]+", "u");
    this.numeric = d;
  } else {
    this.split = t(b, x, this.split), this.numeric = t(this.numeric, !0);
  }
  this.H = t(a.H, null, this.H);
  this.B = t(a.B, null, this.B);
  this.rtl = a.rtl || !1;
  this.i = t(a.i, !0, this.i);
  this.filter = t((b = a.filter) && new Set(b), null, this.filter);
  this.j = t((b = a.j) && new Map(b), null, this.j);
  this.s = t((b = a.s) && new Map(b), null, this.s);
  this.m = t((b = a.m) && new Map(b), null, this.m);
  this.l = t(a.l, null, this.l);
  this.G = t(a.G, 1, this.G);
  this.K = t(a.K, 0, this.K);
  if (this.cache = b = t(a.cache, !0, this.cache)) {
    this.A = null, this.L = "number" === typeof b ? b : 2e5, this.o = new Map(), this.u = new Map(), this.C = this.h = 128;
  }
  this.D = "";
  this.I = null;
  this.F = "";
  this.J = null;
  if (this.j) {
    for (const d of this.j.keys()) {
      this.D += (this.D ? "|" : "") + d;
    }
  }
  if (this.m) {
    for (const d of this.m.keys()) {
      this.F += (this.F ? "|" : "") + d;
    }
  }
  return this;
};
C.prototype.encode = function(a) {
  if (this.cache && a.length <= this.h) {
    if (this.A) {
      if (this.o.has(a)) {
        return this.o.get(a);
      }
    } else {
      this.A = setTimeout(D, 0, this);
    }
  }
  this.normalize && (a = "function" === typeof this.normalize ? this.normalize(a) : B ? a.normalize("NFKD").replace(B, "").toLowerCase() : a.toLowerCase());
  this.H && (a = this.H(a));
  this.numeric && 3 < a.length && (a = a.replace(z, "$1 $2").replace(A, "$1 $2").replace(y, "$1 "));
  const c = !(this.i || this.s || this.filter || this.j || this.m || this.l);
  let b = [], d = this.split || "" === this.split ? a.split(this.split) : a;
  for (let g = 0, f, h; g < d.length; g++) {
    if (!(f = h = d[g])) {
      continue;
    }
    if (f.length < this.G) {
      continue;
    }
    if (c) {
      b.push(f);
      continue;
    }
    if (this.filter && this.filter.has(f)) {
      continue;
    }
    if (this.cache && f.length <= this.C) {
      if (this.A) {
        var e = this.u.get(f);
        if (e || "" === e) {
          e && b.push(e);
          continue;
        }
      } else {
        this.A = setTimeout(D, 0, this);
      }
    }
    let l;
    this.m && 2 < f.length && (this.J || (this.J = new RegExp("(?!^)(" + this.F + ")$")), f = f.replace(this.J, r => this.m.get(r)), l = 1);
    this.j && 1 < f.length && (this.I || (this.I = new RegExp("(" + this.D + ")", "g")), f = f.replace(this.I, r => this.j.get(r)), l = 1);
    f && l && (f.length < this.G || this.filter && this.filter.has(f)) && (f = "");
    if (f && (this.s || this.i && 1 < f.length)) {
      e = "";
      for (let r = 0, k = "", p, q; r < f.length; r++) {
        p = f.charAt(r), p === k && this.i || ((q = this.s && this.s.get(p)) || "" === q ? q === k && this.i || !(k = q) || (e += q) : e += k = p);
      }
      f = e;
    }
    if (f && this.l) {
      for (e = 0; f && e < this.l.length; e += 2) {
        f = f.replace(this.l[e], this.l[e + 1]);
      }
    }
    this.cache && h.length <= this.C && (this.u.set(h, f), this.u.size > this.L && (this.u.clear(), this.C = this.C / 1.1 | 0));
    f && b.push(f);
  }
  this.B && (b = this.B(b) || b);
  this.cache && a.length <= this.h && (this.o.set(a, b), this.o.size > this.L && (this.o.clear(), this.h = this.h / 1.1 | 0));
  return b;
};
function D(a) {
  a.A = null;
  a.o.clear();
  a.u.clear();
}
;function E(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
E.prototype.set = function(a, c) {
  this.cache.has(a) || (this.cache.set(this.h = a, c), this.limit && this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value));
};
E.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.limit && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, c));
  return c;
};
E.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
E.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
var F = {normalize:function(a) {
  return a.toLowerCase();
}, i:!1};
const G = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
u();
H.prototype.add = function(a, c, b, d) {
  if (c && (a || 0 === a)) {
    if (!d && !b && this.g.has(a)) {
      return this.update(a, c);
    }
    c = this.encoder.encode(c);
    if (d = c.length) {
      const r = u(), k = u(), p = this.depth, q = this.resolution;
      for (let m = 0; m < d; m++) {
        let n = c[this.rtl ? d - 1 - m : m];
        var e = n.length;
        if (e && (p || !k[n])) {
          var g = this.score ? this.score(c, n, m, null, 0) : I(q, d, m), f = "";
          switch(this.tokenize) {
            case "full":
              if (2 < e) {
                for (g = 0; g < e; g++) {
                  for (var h = e; h > g; h--) {
                    f = n.substring(g, h);
                    var l = this.score ? this.score(c, n, m, f, g) : I(q, d, m, e, g);
                    J(this, k, f, l, a, b);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < e) {
                for (h = e - 1; 0 < h; h--) {
                  f = n[h] + f, l = this.score ? this.score(c, n, m, f, h) : I(q, d, m, e, h), J(this, k, f, l, a, b);
                }
                f = "";
              }
            case "forward":
              if (1 < e) {
                for (h = 0; h < e; h++) {
                  f += n[h], J(this, k, f, g, a, b);
                }
                break;
              }
            default:
              if (J(this, k, n, g, a, b), p && 1 < d && m < d - 1) {
                for (e = u(), f = this.M, g = n, h = Math.min(p + 1, d - m), e[g] = 1, l = 1; l < h; l++) {
                  if ((n = c[this.rtl ? d - 1 - m - l : m + l]) && !e[n]) {
                    e[n] = 1;
                    const v = this.score ? this.score(c, g, m, n, l) : I(f + (d / 2 > f ? 0 : 1), d, m, h - 1, l - 1), M = this.bidirectional && n > g;
                    J(this, r, M ? g : n, v, a, b, M ? n : g);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.g.add(a);
    }
  }
  return this;
};
function J(a, c, b, d, e, g, f) {
  let h = f ? a.v : a.map, l;
  c[b] && f && (l = c[b])[f] || (f ? (c = l || (c[b] = u()), c[f] = 1, (l = h.get(f)) ? h = l : h.set(f, h = new Map())) : c[b] = 1, (l = h.get(b)) ? h = l : h.set(b, h = []), h = h[d] || (h[d] = []), g && h.includes(e) || (h.push(e), a.fastupdate && ((c = a.g.get(e)) ? c.push(h) : a.g.set(e, [h]))));
}
function I(a, c, b, d, e) {
  return b && 1 < a ? c + (d || 0) <= a ? b + (e || 0) : (a - 1) / (c + (d || 0)) * (b + (e || 0)) + 1 | 0 : 0;
}
;function K(a, c, b) {
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? c ? a.slice(b, b + c) : a.slice(b) : a;
  }
  let d = [];
  for (let e = 0, g, f; e < a.length; e++) {
    if ((g = a[e]) && (f = g.length)) {
      if (b) {
        if (b >= f) {
          b -= f;
          continue;
        }
        b < f && (g = c ? g.slice(b, b + c) : g.slice(b), f = g.length, b = 0);
      }
      if (d.length) {
        f > c && (g = g.slice(0, c), f = g.length), d.push(g);
      } else {
        if (f >= c) {
          return f > c && (g = g.slice(0, c)), g;
        }
        d = [g];
      }
      c -= f;
      if (!c) {
        break;
      }
    }
  }
  return d.length ? d = 1 < d.length ? [].concat.apply([], d) : d[0] : d;
}
;function L(a, c, b, d) {
  var e = a.length;
  let g = [], f = 0, h, l, r;
  d && (d = []);
  for (let k = e - 1, p; 0 <= k; k--) {
    r = a[k];
    e = u();
    p = !h;
    for (let q = 0, m; q < r.length; q++) {
      if ((m = r[q]) && m.length) {
        for (let n = 0, v; n < m.length; n++) {
          if (v = m[n], h) {
            if (h[v]) {
              if (!k) {
                if (b) {
                  b--;
                } else {
                  if (g[f++] = v, f === c) {
                    return g;
                  }
                }
              }
              if (k || d) {
                e[v] = 1;
              }
              p = !0;
            }
            d && !l[v] && (l[v] = 1, (d[q] || (d[q] = [])).push(v));
          } else {
            e[v] = 1;
          }
        }
      }
    }
    if (d) {
      h || (l = e);
    } else if (!p) {
      return [];
    }
    h = e;
  }
  if (d) {
    for (let k = d.length - 1, p, q; 0 <= k; k--) {
      p = d[k];
      q = p.length;
      for (let m = 0, n; m < q; m++) {
        if (n = p[m], !h[n]) {
          if (b) {
            b--;
          } else {
            if (g[f++] = n, f === c) {
              return g;
            }
          }
          h[n] = 1;
        }
      }
    }
  }
  return g;
}
;H.prototype.search = function(a, c, b) {
  b || (c || "object" !== typeof a ? "object" === typeof c && (b = c, c = 0) : (b = a, a = ""));
  let d = [];
  let e, g = 0;
  if (b) {
    a = b.query || a;
    c = b.limit || c;
    g = b.offset || 0;
    var f = b.context;
    e = b.suggest;
  }
  a = this.encoder.encode(a);
  b = a.length;
  c || (c = 100);
  if (1 === b) {
    return N.call(this, a[0], "", c, g);
  }
  f = this.depth && !1 !== f;
  if (2 === b && f && !e) {
    return N.call(this, a[0], a[1], c, g);
  }
  let h = 0, l = 0;
  if (1 < b) {
    var r = u();
    const p = [];
    for (let q = 0, m; q < b; q++) {
      if ((m = a[q]) && !r[m]) {
        if (e || O(this, m)) {
          p.push(m), r[m] = 1;
        } else {
          return d;
        }
        const n = m.length;
        h = Math.max(h, n);
        l = l ? Math.min(l, n) : n;
      }
    }
    a = p;
    b = a.length;
  }
  if (!b) {
    return d;
  }
  r = 0;
  let k;
  if (1 === b) {
    return N.call(this, a[0], "", c, g);
  }
  if (2 === b && f && !e) {
    return N.call(this, a[0], a[1], c, g);
  }
  1 < b && (f ? (k = a[0], r = 1) : 9 < h && 3 < h / l && a.sort(w));
  for (let p, q; r < b; r++) {
    q = a[r];
    k ? (p = O(this, q, k), p = P(p, d, e, this.M, c, g, 2 === b), e && !1 === p && d.length || (k = q)) : (p = O(this, q), p = P(p, d, e, this.resolution, c, g, 1 === b));
    if (p) {
      return p;
    }
    if (e && r === b - 1) {
      f = d.length;
      if (!f) {
        if (k) {
          k = "";
          r = -1;
          continue;
        }
        return d;
      }
      if (1 === f) {
        return K(d[0], c, g);
      }
    }
  }
  return L(d, c, g, e);
};
function N(a, c, b, d) {
  return (a = O(this, a, c)) && a.length ? K(a, b, d) : [];
}
function P(a, c, b, d, e, g, f) {
  let h = [];
  if (a) {
    d = Math.min(a.length, d);
    for (let l = 0, r = 0, k; l < d; l++) {
      if (k = a[l]) {
        if (g && k && f && (k.length <= g ? (g -= k.length, k = null) : (k = k.slice(g), g = 0)), k && (h[l] = k, f && (r += k.length, r >= e))) {
          break;
        }
      }
    }
    if (h.length) {
      if (f) {
        return K(h, e, 0);
      }
      c.push(h);
      return;
    }
  }
  return !b && h;
}
function O(a, c, b) {
  let d;
  b && (d = a.bidirectional && c > b);
  a = b ? (a = a.v.get(d ? c : b)) && a.get(d ? b : c) : a.map.get(c);
  return a;
}
;H.prototype.remove = function(a, c) {
  const b = this.g.size && (this.fastupdate ? this.g.get(a) : this.g.has(a));
  if (b) {
    if (this.fastupdate) {
      for (let d = 0, e; d < b.length; d++) {
        if (e = b[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            const g = e.indexOf(a);
            g === b.length - 1 ? e.pop() : e.splice(g, 1);
          }
        }
      }
    } else {
      Q(this.map, a), this.depth && Q(this.v, a);
    }
    c || this.g.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function Q(a, c) {
  let b = 0;
  if (a.constructor === Array) {
    for (let d = 0, e, g; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (g = e.indexOf(c), 0 <= g) {
          1 < e.length ? (e.splice(g, 1), b++) : delete a[d];
          break;
        } else {
          b++;
        }
      }
    }
  } else {
    for (let d of a) {
      const e = d[0], g = Q(d[1], c);
      g ? b += g : a.delete(e);
    }
  }
  return b;
}
;function H(a, c) {
  if (!(this instanceof H)) {
    return new H(a);
  }
  if (a) {
    var b = "string" === typeof a ? a : a.preset;
    b && (G[b] || console.warn("Preset not found: " + b), a = Object.assign({}, G[b], a));
  } else {
    a = {};
  }
  b = a.context || {};
  const d = a.encode || a.encoder || F;
  this.encoder = d.encode ? d : "object" === typeof d ? new C(d) : {encode:d};
  let e;
  this.resolution = a.resolution || 9;
  this.tokenize = e = a.tokenize || "strict";
  this.depth = "strict" === e && b.depth || 0;
  this.bidirectional = !1 !== b.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  e = !1;
  this.map = new Map();
  this.v = new Map();
  this.g = c || (this.fastupdate ? new Map() : new Set());
  this.M = b.resolution || 1;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (e = a.cache || null) && new E(e);
}
H.prototype.clear = function() {
  this.map.clear();
  this.v.clear();
  this.g.clear();
  this.cache && this.cache.clear();
  return this;
};
H.prototype.append = function(a, c) {
  return this.add(a, c, !0);
};
H.prototype.contain = function(a) {
  return this.g.has(a);
};
H.prototype.update = function(a, c) {
  if (this.async) {
    const b = this, d = this.remove(a);
    return d.then ? d.then(() => b.add(a, c)) : this.add(a, c);
  }
  return this.remove(a).add(a, c);
};
function R(a) {
  let c = 0;
  if (a.constructor === Array) {
    for (let b = 0, d; b < a.length; b++) {
      (d = a[b]) && (c += d.length);
    }
  } else {
    for (const b of a) {
      const d = b[0], e = R(b[1]);
      e ? c += e : a.delete(d);
    }
  }
  return c;
}
H.prototype.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  R(this.map);
  this.depth && R(this.v);
  return this;
};
H.prototype.searchCache = function(a, c, b) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  let d = this.cache.get(a);
  if (!d) {
    d = this.search(a, c, b);
    if (d instanceof Promise) {
      const e = this;
      d.then(function(g) {
        e.cache.set(a, g);
      });
    }
    this.cache.set(a, d);
  }
  return d;
};
const S = u();
const T = {Index:H, Charset:S, Encoder:C, Document:null, Worker:null, Resolver:null, IndexedDB:null}, U = self;
let V;
(V = U.define) && V.amd ? V([], function() {
  return T;
}) : "object" === typeof U.exports ? U.exports = T : U.FlexSearch = T;
}(this));
