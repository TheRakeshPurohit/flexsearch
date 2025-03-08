/**!
 * FlexSearch.js v0.8.0 (Bundle/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';
var v;
function x(a, c, b) {
  const e = typeof b, d = typeof a;
  if ("undefined" !== e) {
    if ("undefined" !== d) {
      if (b) {
        if ("function" === d && e === d) {
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
            var f = new Map(b);
            for (var g of a) {
              f.set(g[0], g[1]);
            }
            return f;
          }
          if (c === Set) {
            g = new Set(b);
            for (f of a.values()) {
              g.add(f);
            }
            return g;
          }
        }
      }
      return a;
    }
    return b;
  }
  return "undefined" === d ? c : a;
}
function y() {
  return Object.create(null);
}
function aa(a, c) {
  return c.length - a.length;
}
function z(a) {
  return "string" === typeof a;
}
function E(a) {
  return "object" === typeof a;
}
function F(a, c) {
  if (z(c)) {
    a = a[c];
  } else {
    for (let b = 0; a && b < c.length; b++) {
      a = a[c[b]];
    }
  }
  return a;
}
;const ba = /[^\p{L}\p{N}]+/u, ca = /(\d{3})/g, da = /(\D)(\d{3})/g, ea = /(\d{3})(\D)/g, G = "".normalize && /[\u0300-\u036f]/g, fa = !G && [["\u00aa", "a"], ["\u00b2", "2"], ["\u00b3", "3"], ["\u00b9", "1"], ["\u00ba", "o"], ["\u00bc", "1\u20444"], ["\u00bd", "1\u20442"], ["\u00be", "3\u20444"], ["\u00e0", "a"], ["\u00e1", "a"], ["\u00e2", "a"], ["\u00e3", "a"], ["\u00e4", "a"], ["\u00e5", "a"], ["\u00e7", "c"], ["\u00e8", "e"], ["\u00e9", "e"], ["\u00ea", "e"], ["\u00eb", "e"], ["\u00ec", "i"], 
["\u00ed", "i"], ["\u00ee", "i"], ["\u00ef", "i"], ["\u00f1", "n"], ["\u00f2", "o"], ["\u00f3", "o"], ["\u00f4", "o"], ["\u00f5", "o"], ["\u00f6", "o"], ["\u00f9", "u"], ["\u00fa", "u"], ["\u00fb", "u"], ["\u00fc", "u"], ["\u00fd", "y"], ["\u00ff", "y"], ["\u0101", "a"], ["\u0103", "a"], ["\u0105", "a"], ["\u0107", "c"], ["\u0109", "c"], ["\u010b", "c"], ["\u010d", "c"], ["\u010f", "d"], ["\u0113", "e"], ["\u0115", "e"], ["\u0117", "e"], ["\u0119", "e"], ["\u011b", "e"], ["\u011d", "g"], ["\u011f", 
"g"], ["\u0121", "g"], ["\u0123", "g"], ["\u0125", "h"], ["\u0129", "i"], ["\u012b", "i"], ["\u012d", "i"], ["\u012f", "i"], ["\u0133", "ij"], ["\u0135", "j"], ["\u0137", "k"], ["\u013a", "l"], ["\u013c", "l"], ["\u013e", "l"], ["\u0140", "l"], ["\u0144", "n"], ["\u0146", "n"], ["\u0148", "n"], ["\u0149", "n"], ["\u014d", "o"], ["\u014f", "o"], ["\u0151", "o"], ["\u0155", "r"], ["\u0157", "r"], ["\u0159", "r"], ["\u015b", "s"], ["\u015d", "s"], ["\u015f", "s"], ["\u0161", "s"], ["\u0163", "t"], ["\u0165", 
"t"], ["\u0169", "u"], ["\u016b", "u"], ["\u016d", "u"], ["\u016f", "u"], ["\u0171", "u"], ["\u0173", "u"], ["\u0175", "w"], ["\u0177", "y"], ["\u017a", "z"], ["\u017c", "z"], ["\u017e", "z"], ["\u017f", "s"], ["\u01a1", "o"], ["\u01b0", "u"], ["\u01c6", "dz"], ["\u01c9", "lj"], ["\u01cc", "nj"], ["\u01ce", "a"], ["\u01d0", "i"], ["\u01d2", "o"], ["\u01d4", "u"], ["\u01d6", "u"], ["\u01d8", "u"], ["\u01da", "u"], ["\u01dc", "u"], ["\u01df", "a"], ["\u01e1", "a"], ["\u01e3", "ae"], ["\u00e6", "ae"], 
["\u01fd", "ae"], ["\u01e7", "g"], ["\u01e9", "k"], ["\u01eb", "o"], ["\u01ed", "o"], ["\u01ef", "\u0292"], ["\u01f0", "j"], ["\u01f3", "dz"], ["\u01f5", "g"], ["\u01f9", "n"], ["\u01fb", "a"], ["\u01ff", "\u00f8"], ["\u0201", "a"], ["\u0203", "a"], ["\u0205", "e"], ["\u0207", "e"], ["\u0209", "i"], ["\u020b", "i"], ["\u020d", "o"], ["\u020f", "o"], ["\u0211", "r"], ["\u0213", "r"], ["\u0215", "u"], ["\u0217", "u"], ["\u0219", "s"], ["\u021b", "t"], ["\u021f", "h"], ["\u0227", "a"], ["\u0229", "e"], 
["\u022b", "o"], ["\u022d", "o"], ["\u022f", "o"], ["\u0231", "o"], ["\u0233", "y"], ["\u02b0", "h"], ["\u02b1", "h"], ["\u0266", "h"], ["\u02b2", "j"], ["\u02b3", "r"], ["\u02b4", "\u0279"], ["\u02b5", "\u027b"], ["\u02b6", "\u0281"], ["\u02b7", "w"], ["\u02b8", "y"], ["\u02e0", "\u0263"], ["\u02e1", "l"], ["\u02e2", "s"], ["\u02e3", "x"], ["\u02e4", "\u0295"], ["\u0390", "\u03b9"], ["\u03ac", "\u03b1"], ["\u03ad", "\u03b5"], ["\u03ae", "\u03b7"], ["\u03af", "\u03b9"], ["\u03b0", "\u03c5"], ["\u03ca", 
"\u03b9"], ["\u03cb", "\u03c5"], ["\u03cc", "\u03bf"], ["\u03cd", "\u03c5"], ["\u03ce", "\u03c9"], ["\u03d0", "\u03b2"], ["\u03d1", "\u03b8"], ["\u03d2", "\u03a5"], ["\u03d3", "\u03a5"], ["\u03d4", "\u03a5"], ["\u03d5", "\u03c6"], ["\u03d6", "\u03c0"], ["\u03f0", "\u03ba"], ["\u03f1", "\u03c1"], ["\u03f2", "\u03c2"], ["\u03f5", "\u03b5"], ["\u0439", "\u0438"], ["\u0450", "\u0435"], ["\u0451", "\u0435"], ["\u0453", "\u0433"], ["\u0457", "\u0456"], ["\u045c", "\u043a"], ["\u045d", "\u0438"], ["\u045e", 
"\u0443"], ["\u0477", "\u0475"], ["\u04c2", "\u0436"], ["\u04d1", "\u0430"], ["\u04d3", "\u0430"], ["\u04d7", "\u0435"], ["\u04db", "\u04d9"], ["\u04dd", "\u0436"], ["\u04df", "\u0437"], ["\u04e3", "\u0438"], ["\u04e5", "\u0438"], ["\u04e7", "\u043e"], ["\u04eb", "\u04e9"], ["\u04ed", "\u044d"], ["\u04ef", "\u0443"], ["\u04f1", "\u0443"], ["\u04f3", "\u0443"], ["\u04f5", "\u0447"]];
function H(a = {}) {
  if (!(this instanceof H)) {
    return new H(...arguments);
  }
  for (a = 0; a < arguments.length; a++) {
    this.assign(arguments[a]);
  }
}
H.prototype.assign = function(a) {
  this.normalize = x(a.normalize, !0, this.normalize);
  let c = a.aa, b = c || a.ga || a.split;
  if ("object" === typeof b) {
    let e = !c, d = "";
    a.aa || (d += "\\p{Z}");
    b.fa && (d += "\\p{L}");
    b.ha && (d += "\\p{N}", e = !!c);
    b.ja && (d += "\\p{S}");
    b.ia && (d += "\\p{P}");
    b.control && (d += "\\p{C}");
    if (b = b.char) {
      d += "object" === typeof b ? b.join("") : b;
    }
    this.split = new RegExp("[" + (c ? "^" : "") + d + "]+", "u");
    this.numeric = e;
  } else {
    this.split = x(b, ba, this.split), this.numeric = x(this.numeric, !0);
  }
  this.X = x(a.X, null, this.X);
  this.R = x(a.R, null, this.R);
  fa && (this.C = new Map(fa));
  this.rtl = a.rtl || !1;
  this.A = x(a.A, !0, this.A);
  this.filter = x((b = a.filter) && new Set(b), null, this.filter);
  this.F = x((b = a.F) && new Map(b), null, this.F);
  this.C = x((b = a.C) && new Map(b), null, this.C);
  this.J = x((b = a.J) && new Map(b), null, this.J);
  this.G = x(a.G, null, this.G);
  this.W = x(a.W, 1, this.W);
  this.ba = x(a.ba, 0, this.ba);
  if (this.cache = b = x(a.cache, !0, this.cache)) {
    this.T = null, this.$ = "number" === typeof b ? b : 2e5, this.M = new Map(), this.P = new Map(), this.L = this.B = 128;
  }
  this.U = "";
  this.Y = null;
  this.V = "";
  this.Z = null;
  if (this.F) {
    for (const e of this.F.keys()) {
      this.U += (this.U ? "|" : "") + e;
    }
  }
  if (this.J) {
    for (const e of this.J.keys()) {
      this.V += (this.V ? "|" : "") + e;
    }
  }
  return this;
};
H.prototype.encode = function(a) {
  if (this.cache && a.length <= this.B) {
    if (this.T) {
      if (this.M.has(a)) {
        return this.M.get(a);
      }
    } else {
      this.T = setTimeout(ha, 0, this);
    }
  }
  this.normalize && (a = "function" === typeof this.normalize ? this.normalize(a) : G ? a.normalize("NFKD").replace(G, "").toLowerCase() : a.toLowerCase());
  this.X && (a = this.X(a));
  this.numeric && 3 < a.length && (a = a.replace(da, "$1 $2").replace(ea, "$1 $2").replace(ca, "$1 "));
  const c = !(this.A || this.C || this.filter || this.F || this.J || this.G);
  let b = [], e = this.split || "" === this.split ? a.split(this.split) : a;
  for (let f = 0, g, h; f < e.length; f++) {
    if (!(g = h = e[f])) {
      continue;
    }
    if (g.length < this.W) {
      continue;
    }
    if (c) {
      b.push(g);
      continue;
    }
    if (this.filter && this.filter.has(g)) {
      continue;
    }
    if (this.cache && g.length <= this.L) {
      if (this.T) {
        var d = this.P.get(g);
        if (d || "" === d) {
          d && b.push(d);
          continue;
        }
      } else {
        this.T = setTimeout(ha, 0, this);
      }
    }
    let k;
    this.J && 2 < g.length && (this.Z || (this.Z = new RegExp("(?!^)(" + this.V + ")$")), g = g.replace(this.Z, m => this.J.get(m)), k = 1);
    this.F && 1 < g.length && (this.Y || (this.Y = new RegExp("(" + this.U + ")", "g")), g = g.replace(this.Y, m => this.F.get(m)), k = 1);
    g && k && (g.length < this.W || this.filter && this.filter.has(g)) && (g = "");
    if (g && (this.C || this.A && 1 < g.length)) {
      d = "";
      for (let m = 0, l = "", r, t; m < g.length; m++) {
        r = g.charAt(m), r === l && this.A || ((t = this.C && this.C.get(r)) || "" === t ? t === l && this.A || !(l = t) || (d += t) : d += l = r);
      }
      g = d;
    }
    if (g && this.G) {
      for (d = 0; g && d < this.G.length; d += 2) {
        g = g.replace(this.G[d], this.G[d + 1]);
      }
    }
    this.cache && h.length <= this.L && (this.P.set(h, g), this.P.size > this.$ && (this.P.clear(), this.L = this.L / 1.1 | 0));
    g && b.push(g);
  }
  this.R && (b = this.R(b) || b);
  this.cache && a.length <= this.B && (this.M.set(a, b), this.M.size > this.$ && (this.M.clear(), this.B = this.B / 1.1 | 0));
  return b;
};
function ha(a) {
  a.T = null;
  a.M.clear();
  a.P.clear();
}
;function ia(a, c, b) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  let e = this.cache.get(a);
  if (!e) {
    e = this.search(a, c, b);
    if (e instanceof Promise) {
      const d = this;
      e.then(function(f) {
        d.cache.set(a, f);
      });
    }
    this.cache.set(a, e);
  }
  return e;
}
function K(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.B = "";
}
K.prototype.set = function(a, c) {
  this.cache.has(a) || (this.cache.set(this.B = a, c), this.limit && this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value));
};
K.prototype.get = function(a) {
  const c = this.cache.get(a);
  c && this.limit && this.B !== a && (this.cache.delete(a), this.cache.set(this.B = a, c));
  return c;
};
K.prototype.remove = function(a) {
  for (const c of this.cache) {
    const b = c[0];
    c[1].includes(a) && this.cache.delete(b);
  }
};
K.prototype.clear = function() {
  this.cache.clear();
  this.B = "";
};
function ja(a, c, b, e, d, f, g, h) {
  (e = a(b ? b + "." + e : e, JSON.stringify(g))) && e.then ? e.then(function() {
    c.export(a, c, b, d, f + 1, h);
  }) : c.export(a, c, b, d, f + 1, h);
}
;var ka = {normalize:function(a) {
  return a.toLowerCase();
}, A:!1};
const la = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
function ma(a) {
  L.call(a, "add");
  L.call(a, "append");
  L.call(a, "search");
  L.call(a, "update");
  L.call(a, "remove");
}
function L(a) {
  this[a + "Async"] = function() {
    var c = arguments;
    const b = c[c.length - 1];
    let e;
    "function" === typeof b && (e = b, delete c[c.length - 1]);
    this.async = !0;
    c = this[a].apply(this, c);
    this.async = !1;
    c.then ? c.then(e) : e(c);
    return c;
  };
}
;y();
M.prototype.add = function(a, c, b, e) {
  if (c && (a || 0 === a)) {
    if (!e && !b && this.h.has(a)) {
      return this.update(a, c);
    }
    c = this.encoder.encode(c);
    if (e = c.length) {
      const m = y(), l = y(), r = this.depth, t = this.resolution;
      for (let p = 0; p < e; p++) {
        let n = c[this.rtl ? e - 1 - p : p];
        var d = n.length;
        if (d && (r || !l[n])) {
          var f = this.score ? this.score(c, n, p, null, 0) : N(t, e, p), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < d) {
                for (f = 0; f < d; f++) {
                  for (var h = d; h > f; h--) {
                    g = n.substring(f, h);
                    var k = this.score ? this.score(c, n, p, g, f) : N(t, e, p, d, f);
                    O(this, l, g, k, a, b);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < d) {
                for (h = d - 1; 0 < h; h--) {
                  g = n[h] + g, k = this.score ? this.score(c, n, p, g, h) : N(t, e, p, d, h), O(this, l, g, k, a, b);
                }
                g = "";
              }
            case "forward":
              if (1 < d) {
                for (h = 0; h < d; h++) {
                  g += n[h], O(this, l, g, f, a, b);
                }
                break;
              }
            default:
              if (O(this, l, n, f, a, b), r && 1 < e && p < e - 1) {
                for (d = y(), g = this.ca, f = n, h = Math.min(r + 1, e - p), d[f] = 1, k = 1; k < h; k++) {
                  if ((n = c[this.rtl ? e - 1 - p - k : p + k]) && !d[n]) {
                    d[n] = 1;
                    const u = this.score ? this.score(c, f, p, n, k) : N(g + (e / 2 > g ? 0 : 1), e, p, h - 1, k - 1), B = this.bidirectional && n > f;
                    O(this, m, B ? f : n, u, a, b, B ? n : f);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.h.add(a);
    }
  }
  return this;
};
function O(a, c, b, e, d, f, g) {
  let h = g ? a.I : a.map, k;
  c[b] && g && (k = c[b])[g] || (g ? (c = k || (c[b] = y()), c[g] = 1, (k = h.get(g)) ? h = k : h.set(g, h = new Map())) : c[b] = 1, (k = h.get(b)) ? h = k : h.set(b, h = []), h = h[e] || (h[e] = []), f && h.includes(d) || (h.push(d), a.fastupdate && ((c = a.h.get(d)) ? c.push(h) : a.h.set(d, [h]))));
}
function N(a, c, b, e, d) {
  return b && 1 < a ? c + (e || 0) <= a ? b + (d || 0) : (a - 1) / (c + (e || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
;function P(a, c, b) {
  if (1 === a.length) {
    return a = a[0], a = b || a.length > c ? c ? a.slice(b, b + c) : a.slice(b) : a;
  }
  let e = [];
  for (let d = 0, f, g; d < a.length; d++) {
    if ((f = a[d]) && (g = f.length)) {
      if (b) {
        if (b >= g) {
          b -= g;
          continue;
        }
        b < g && (f = c ? f.slice(b, b + c) : f.slice(b), g = f.length, b = 0);
      }
      if (e.length) {
        g > c && (f = f.slice(0, c), g = f.length), e.push(f);
      } else {
        if (g >= c) {
          return g > c && (f = f.slice(0, c)), f;
        }
        e = [f];
      }
      c -= g;
      if (!c) {
        break;
      }
    }
  }
  return e.length ? e = 1 < e.length ? [].concat.apply([], e) : e[0] : e;
}
;function na(a, c, b, e) {
  var d = a.length;
  let f = [], g = 0, h, k, m;
  e && (e = []);
  for (let l = d - 1, r; 0 <= l; l--) {
    m = a[l];
    d = y();
    r = !h;
    for (let t = 0, p; t < m.length; t++) {
      if ((p = m[t]) && p.length) {
        for (let n = 0, u; n < p.length; n++) {
          if (u = p[n], h) {
            if (h[u]) {
              if (!l) {
                if (b) {
                  b--;
                } else {
                  if (f[g++] = u, g === c) {
                    return f;
                  }
                }
              }
              if (l || e) {
                d[u] = 1;
              }
              r = !0;
            }
            e && !k[u] && (k[u] = 1, (e[t] || (e[t] = [])).push(u));
          } else {
            d[u] = 1;
          }
        }
      }
    }
    if (e) {
      h || (k = d);
    } else if (!r) {
      return [];
    }
    h = d;
  }
  if (e) {
    for (let l = e.length - 1, r, t; 0 <= l; l--) {
      r = e[l];
      t = r.length;
      for (let p = 0, n; p < t; p++) {
        if (n = r[p], !h[n]) {
          if (b) {
            b--;
          } else {
            if (f[g++] = n, g === c) {
              return f;
            }
          }
          h[n] = 1;
        }
      }
    }
  }
  return f;
}
function oa(a, c) {
  const b = y(), e = y(), d = [];
  for (let f = 0; f < a.length; f++) {
    b[a[f]] = 1;
  }
  for (let f = 0, g; f < c.length; f++) {
    g = c[f];
    for (let h = 0, k; h < g.length; h++) {
      k = g[h], b[k] && !e[k] && (e[k] = 1, d.push(k));
    }
  }
  return d;
}
;M.prototype.search = function(a, c, b) {
  b || (!c && E(a) ? (b = a, a = "") : E(c) && (b = c, c = 0));
  let e = [];
  let d, f = 0;
  if (b) {
    a = b.query || a;
    c = b.limit || c;
    f = b.offset || 0;
    var g = b.context;
    d = b.suggest;
  }
  a = this.encoder.encode(a);
  b = a.length;
  c || (c = 100);
  if (1 === b) {
    return Q.call(this, a[0], "", c, f);
  }
  g = this.depth && !1 !== g;
  if (2 === b && g && !d) {
    return Q.call(this, a[0], a[1], c, f);
  }
  let h = 0, k = 0;
  if (1 < b) {
    var m = y();
    const r = [];
    for (let t = 0, p; t < b; t++) {
      if ((p = a[t]) && !m[p]) {
        if (d || R(this, p)) {
          r.push(p), m[p] = 1;
        } else {
          return e;
        }
        const n = p.length;
        h = Math.max(h, n);
        k = k ? Math.min(k, n) : n;
      }
    }
    a = r;
    b = a.length;
  }
  if (!b) {
    return e;
  }
  m = 0;
  let l;
  if (1 === b) {
    return Q.call(this, a[0], "", c, f);
  }
  if (2 === b && g && !d) {
    return Q.call(this, a[0], a[1], c, f);
  }
  1 < b && (g ? (l = a[0], m = 1) : 9 < h && 3 < h / k && a.sort(aa));
  for (let r, t; m < b; m++) {
    t = a[m];
    l ? (r = R(this, t, l), r = pa(r, e, d, this.ca, c, f, 2 === b), d && !1 === r && e.length || (l = t)) : (r = R(this, t), r = pa(r, e, d, this.resolution, c, f, 1 === b));
    if (r) {
      return r;
    }
    if (d && m === b - 1) {
      g = e.length;
      if (!g) {
        if (l) {
          l = "";
          m = -1;
          continue;
        }
        return e;
      }
      if (1 === g) {
        return P(e[0], c, f);
      }
    }
  }
  return na(e, c, f, d);
};
function Q(a, c, b, e) {
  return (a = R(this, a, c)) && a.length ? P(a, b, e) : [];
}
function pa(a, c, b, e, d, f, g) {
  let h = [];
  if (a) {
    e = Math.min(a.length, e);
    for (let k = 0, m = 0, l; k < e; k++) {
      if (l = a[k]) {
        if (f && l && g && (l.length <= f ? (f -= l.length, l = null) : (l = l.slice(f), f = 0)), l && (h[k] = l, g && (m += l.length, m >= d))) {
          break;
        }
      }
    }
    if (h.length) {
      if (g) {
        return P(h, d, 0);
      }
      c.push(h);
      return;
    }
  }
  return !b && h;
}
function R(a, c, b) {
  let e;
  b && (e = a.bidirectional && c > b);
  a = b ? (a = a.I.get(e ? c : b)) && a.get(e ? b : c) : a.map.get(c);
  return a;
}
;M.prototype.remove = function(a, c) {
  const b = this.h.size && (this.fastupdate ? this.h.get(a) : this.h.has(a));
  if (b) {
    if (this.fastupdate) {
      for (let e = 0, d; e < b.length; e++) {
        if (d = b[e]) {
          if (2 > d.length) {
            d.pop();
          } else {
            const f = d.indexOf(a);
            f === b.length - 1 ? d.pop() : d.splice(f, 1);
          }
        }
      }
    } else {
      S(this.map, a), this.depth && S(this.I, a);
    }
    c || this.h.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function S(a, c) {
  let b = 0;
  if (a.constructor === Array) {
    for (let e = 0, d, f; e < a.length; e++) {
      if ((d = a[e]) && d.length) {
        if (f = d.indexOf(c), 0 <= f) {
          1 < d.length ? (d.splice(f, 1), b++) : delete a[e];
          break;
        } else {
          b++;
        }
      }
    }
  } else {
    for (let e of a) {
      const d = e[0], f = S(e[1], c);
      f ? b += f : a.delete(d);
    }
  }
  return b;
}
;function M(a, c) {
  if (!(this instanceof M)) {
    return new M(a);
  }
  if (a) {
    var b = z(a) ? a : a.preset;
    b && (la[b] || console.warn("Preset not found: " + b), a = Object.assign({}, la[b], a));
  } else {
    a = {};
  }
  b = a.context || {};
  const e = a.encode || a.encoder || ka;
  this.encoder = e.encode ? e : "object" === typeof e ? new H(e) : {encode:e};
  let d;
  this.resolution = a.resolution || 9;
  this.tokenize = d = a.tokenize || "strict";
  this.depth = "strict" === d && b.depth || 0;
  this.bidirectional = !1 !== b.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  d = !1;
  this.map = new Map();
  this.I = new Map();
  this.h = c || (this.fastupdate ? new Map() : new Set());
  this.ca = b.resolution || 1;
  this.rtl = e.rtl || a.rtl || !1;
  this.cache = (d = a.cache || null) && new K(d);
}
v = M.prototype;
v.clear = function() {
  this.map.clear();
  this.I.clear();
  this.h.clear();
  this.cache && this.cache.clear();
  return this;
};
v.append = function(a, c) {
  return this.add(a, c, !0);
};
v.contain = function(a) {
  return this.h.has(a);
};
v.update = function(a, c) {
  if (this.async) {
    const b = this, e = this.remove(a);
    return e.then ? e.then(() => b.add(a, c)) : this.add(a, c);
  }
  return this.remove(a).add(a, c);
};
function T(a) {
  let c = 0;
  if (a.constructor === Array) {
    for (let b = 0, e; b < a.length; b++) {
      (e = a[b]) && (c += e.length);
    }
  } else {
    for (const b of a) {
      const e = b[0], d = T(b[1]);
      d ? c += d : a.delete(e);
    }
  }
  return c;
}
v.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  T(this.map);
  this.depth && T(this.I);
  return this;
};
v.searchCache = ia;
v.export = function(a, c, b, e, d, f) {
  let g = !0;
  "undefined" === typeof f && (g = new Promise(m => {
    f = m;
  }));
  let h, k;
  switch(d || (d = 0)) {
    case 0:
      h = "reg";
      if (this.fastupdate) {
        k = y();
        for (let m of this.h.keys()) {
          k[m] = 1;
        }
      } else {
        k = this.h;
      }
      break;
    case 1:
      h = "cfg";
      k = {doc:0, opt:this.B ? 1 : 0};
      break;
    case 2:
      h = "map";
      k = this.map;
      break;
    case 3:
      h = "ctx";
      k = this.I;
      break;
    default:
      "undefined" === typeof b && f && f();
      return;
  }
  ja(a, c || this, b, h, e, d, k, f);
  return g;
};
v.import = function(a, c) {
  if (c) {
    switch(z(c) && (c = JSON.parse(c)), a) {
      case "cfg":
        this.B = !!c.opt;
        break;
      case "reg":
        this.fastupdate = !1;
        this.h = c;
        break;
      case "map":
        this.map = c;
        break;
      case "ctx":
        this.I = c;
    }
  }
};
ma(M.prototype);
U.prototype.add = function(a, c, b) {
  E(a) && (c = a, a = F(c, this.key));
  if (c && (a || 0 === a)) {
    if (!b && this.h.has(a)) {
      return this.update(a, c);
    }
    for (let h = 0, k; h < this.field.length; h++) {
      k = this.K[h];
      var e = this.index.get(this.field[h]);
      if ("function" === typeof k) {
        var d = k(c);
        d && e.add(a, d, !1, !0);
      } else {
        if (d = k.O, !d || d(c)) {
          k instanceof String ? k = ["" + k] : z(k) && (k = [k]), V(c, k, this.S, 0, e, a, k[0], b);
        }
      }
    }
    if (this.tag) {
      for (e = 0; e < this.H.length; e++) {
        var f = this.H[e], g = this.da[e];
        d = this.tag.get(g);
        let h = y();
        if ("function" === typeof f) {
          if (f = f(c), !f) {
            continue;
          }
        } else {
          const k = f.O;
          if (k && !k(c)) {
            continue;
          }
          f instanceof String && (f = "" + f);
          f = F(c, f);
        }
        if (d && f) {
          z(f) && (f = [f]);
          for (let k = 0, m, l; k < f.length; k++) {
            m = f[k], h[m] || (h[m] = 1, (g = d.get(m)) ? l = g : d.set(m, l = []), b && l.includes(a) || (l.push(a), this.fastupdate && ((g = this.h.get(a)) ? g.push(l) : this.h.set(a, [l]))));
          }
        } else {
          d || console.warn("Tag '" + g + "' was not found");
        }
      }
    }
    if (this.store && (!b || !this.store.has(a))) {
      let h;
      if (this.D) {
        h = y();
        for (let k = 0, m; k < this.D.length; k++) {
          m = this.D[k];
          if ((b = m.O) && !b(c)) {
            continue;
          }
          let l;
          if ("function" === typeof m) {
            l = m(c);
            if (!l) {
              continue;
            }
            m = [m.ea];
          } else if (z(m) || m instanceof String) {
            h[m] = c[m];
            continue;
          }
          W(c, h, m, 0, m[0], l);
        }
      }
      this.store.set(a, h || c);
    }
  }
  return this;
};
function W(a, c, b, e, d, f) {
  a = a[d];
  if (e === b.length - 1) {
    c[d] = f || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (c = c[d] = Array(a.length), d = 0; d < a.length; d++) {
        W(a, c, b, e, d);
      }
    } else {
      c = c[d] || (c[d] = y()), d = b[++e], W(a, c, b, e, d);
    }
  }
}
function V(a, c, b, e, d, f, g, h) {
  if (a = a[g]) {
    if (e === c.length - 1) {
      if (a.constructor === Array) {
        if (b[e]) {
          for (c = 0; c < a.length; c++) {
            d.add(f, a[c], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      d.add(f, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (g = 0; g < a.length; g++) {
          V(a, c, b, e, d, f, g, h);
        }
      } else {
        g = c[++e], V(a, c, b, e, d, f, g, h);
      }
    }
  }
}
;U.prototype.search = function(a, c, b, e) {
  b || (!c && E(a) ? (b = a, a = "") : E(c) && (b = c, c = 0));
  let d = [];
  var f = [];
  let g, h, k, m, l;
  let r = 0;
  if (b) {
    if (b.constructor === Array) {
      m = b, b = null;
    } else {
      a = b.query || a;
      var t = b.pluck;
      h = b.merge;
      m = t || b.field || b.index;
      l = this.tag && b.tag;
      g = this.store && b.enrich;
      k = b.suggest;
      c = b.limit || c;
      var p = b.offset || 0;
      c || (c = 100);
      if (l) {
        l.constructor !== Array && (l = [l]);
        var n = [];
        for (let w = 0, q; w < l.length; w++) {
          q = l[w];
          if (z(q)) {
            throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
          }
          if (q.field && q.tag) {
            var u = q.tag;
            if (u.constructor === Array) {
              for (var B = 0; B < u.length; B++) {
                n.push(q.field, u[B]);
              }
            } else {
              n.push(q.field, u);
            }
          } else {
            u = Object.keys(q);
            for (let C = 0, D, A; C < u.length; C++) {
              if (D = u[C], A = q[D], A.constructor === Array) {
                for (B = 0; B < A.length; B++) {
                  n.push(D, A[B]);
                }
              } else {
                n.push(D, A);
              }
            }
          }
        }
        if (!n.length) {
          throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
        }
        l = n;
        if (!a) {
          e = [];
          if (n.length) {
            for (f = 0; f < n.length; f += 2) {
              t = qa.call(this, n[f], n[f + 1], c, p, g), d.push({field:n[f], tag:n[f + 1], result:t});
            }
          }
          return e.length ? Promise.all(e).then(function(w) {
            for (let q = 0; q < w.length; q++) {
              d[q].result = w[q];
            }
            return d;
          }) : d;
        }
      }
      z(m) && (m = [m]);
    }
  }
  m || (m = this.field);
  p = !e && (this.worker || this.async) && [];
  for (let w = 0, q, C, D; w < m.length; w++) {
    C = m[w];
    let A;
    z(C) || (A = C, C = A.field, a = A.query || a, c = A.limit || c, k = A.suggest || k);
    if (e) {
      q = e[w];
    } else {
      if (n = A || b, u = this.index.get(C), l && (n.enrich = !1), p) {
        p[w] = u.searchAsync(a, c, n);
        n && g && (n.enrich = g);
        continue;
      } else {
        q = u.search(a, c, n), n && g && (n.enrich = g);
      }
    }
    D = q && q.length;
    if (l && D) {
      n = [];
      u = 0;
      for (let I = 0, J, ya; I < l.length; I += 2) {
        J = this.tag.get(l[I]);
        if (!J) {
          if (console.warn("Tag '" + l[I] + ":" + l[I + 1] + "' will be skipped because there is no field '" + l[I] + "'."), k) {
            continue;
          } else {
            return d;
          }
        }
        if (ya = (J = J && J.get(l[I + 1])) && J.length) {
          u++, n.push(J);
        } else if (!k) {
          return d;
        }
      }
      if (u) {
        q = oa(q, n);
        D = q.length;
        if (!D && !k) {
          return d;
        }
        u--;
      }
    }
    if (D) {
      f[r] = C, d.push(q), r++;
    } else if (1 === m.length) {
      return d;
    }
  }
  if (p) {
    const w = this;
    return Promise.all(p).then(function(q) {
      return q.length ? w.search(a, c, b, q) : q;
    });
  }
  if (!r) {
    return d;
  }
  if (t && (!g || !this.store)) {
    return d[0];
  }
  p = [];
  for (let w = 0, q; w < f.length; w++) {
    q = d[w];
    g && q.length && !q[0].doc && q.length && (q = ra.call(this, q));
    if (t) {
      return q;
    }
    d[w] = {field:f[w], result:q};
  }
  return h ? sa(d, c) : d;
};
function sa(a, c) {
  const b = [], e = y();
  for (let d = 0, f, g; d < a.length; d++) {
    f = a[d];
    g = f.result;
    for (let h = 0, k, m, l; h < g.length; h++) {
      if (m = g[h], k = m.id, l = e[k]) {
        l.push(f.field);
      } else {
        if (b.length === c) {
          return b;
        }
        m.field = e[k] = [f.field];
        b.push(m);
      }
    }
  }
  return b;
}
function qa(a, c, b, e, d) {
  let f = this.tag.get(a);
  if (!f) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (f = f && f.get(c)) && f.length - e) && 0 < a) {
    if (a > b || e) {
      f = f.slice(e, e + b);
    }
    d && (f = ra.call(this, f));
    return f;
  }
}
function ra(a) {
  const c = Array(a.length);
  for (let b = 0, e; b < a.length; b++) {
    e = a[b], c[b] = {id:e, doc:this.store.get(e)};
  }
  return c;
}
;function U(a) {
  if (!(this instanceof U)) {
    return new U(a);
  }
  const c = a.document || a.doc || a;
  var b;
  this.K = [];
  this.field = [];
  this.S = [];
  this.key = (b = c.key || c.id) && X(b, this.S) || "id";
  this.h = (this.fastupdate = !!a.fastupdate) ? new Map() : new Set();
  this.D = (b = c.store || null) && !0 !== b && [];
  this.store = b && new Map();
  this.cache = (b = a.cache || null) && new K(b);
  this.async = a.cache = !1;
  b = new Map();
  let e = c.index || c.field || c;
  z(e) && (e = [e]);
  for (let d = 0, f, g; d < e.length; d++) {
    f = e[d], z(f) || (g = f, f = f.field), g = E(g) ? Object.assign({}, a, g) : a, b.set(f, new M(g, this.h)), g.N ? this.K[d] = g.N : (this.K[d] = X(f, this.S), g.filter && ("string" === typeof this.K[d] && (this.K[d] = new String(this.K[d])), this.K[d].O = g.filter)), this.field[d] = f;
  }
  if (this.D) {
    a = c.store;
    z(a) && (a = [a]);
    for (let d = 0, f, g; d < a.length; d++) {
      f = a[d], g = f.field || f, f.N ? (this.D[d] = f.N, f.N.ea = g) : (this.D[d] = X(g, this.S), f.filter && ("string" === typeof this.D[d] && (this.D[d] = new String(this.D[d])), this.D[d].O = f.filter));
    }
  }
  this.index = b;
  this.tag = null;
  if (b = c.tag) {
    if ("string" === typeof b && (b = [b]), b.length) {
      this.tag = new Map();
      this.H = [];
      this.da = [];
      for (let d = 0, f, g; d < b.length; d++) {
        f = b[d];
        g = f.field || f;
        if (!g) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        f.N ? this.H[d] = f.N : (this.H[d] = X(g, this.S), f.filter && ("string" === typeof this.H[d] && (this.H[d] = new String(this.H[d])), this.H[d].O = f.filter));
        this.da[d] = g;
        this.tag.set(g, new Map());
      }
    }
  }
}
function X(a, c) {
  const b = a.split(":");
  let e = 0;
  for (let d = 0; d < b.length; d++) {
    a = b[d], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (c[e] = !0), a && (b[e++] = a);
  }
  e < b.length && (b.length = e);
  return 1 < e ? b : b[0];
}
v = U.prototype;
v.append = function(a, c) {
  return this.add(a, c, !0);
};
v.update = function(a, c) {
  return this.remove(a).add(a, c);
};
v.remove = function(a) {
  E(a) && (a = F(a, this.key));
  for (var c of this.index.values()) {
    c.remove(a, !0);
  }
  if (this.h.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (let b of this.tag.values()) {
        for (let e of b) {
          c = e[0];
          const d = e[1], f = d.indexOf(a);
          -1 < f && (1 < d.length ? d.splice(f, 1) : b.delete(c));
        }
      }
    }
    this.store && this.store.delete(a);
    this.h.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
v.clear = function() {
  for (const a of this.index.values()) {
    a.clear();
  }
  if (this.tag) {
    for (const a of this.tag.values()) {
      a.clear();
    }
  }
  this.store && this.store.clear();
  return this;
};
v.contain = function(a) {
  return this.h.has(a);
};
v.cleanup = function() {
  for (const a of this.index.values()) {
    a.cleanup();
  }
  return this;
};
v.get = function(a) {
  return this.store.get(a);
};
v.set = function(a, c) {
  this.store.set(a, c);
  return this;
};
v.searchCache = ia;
v.export = function(a, c, b, e, d, f) {
  let g;
  "undefined" === typeof f && (g = new Promise(k => {
    f = k;
  }));
  d || (d = 0);
  e || (e = 0);
  if (e < this.field.length) {
    b = this.field[e];
    var h = this.index[b];
    c = this;
    h.export(a, c, d ? b : "", e, d++, f) || (e++, c.export(a, c, b, e, 1, f));
  } else {
    switch(d) {
      case 1:
        c = "tag";
        h = this.L;
        b = null;
        break;
      case 2:
        c = "store";
        h = this.store;
        b = null;
        break;
      default:
        f();
        return;
    }
    ja(a, this, b, c, e, d, h, f);
  }
  return g;
};
v.import = function(a, c) {
  if (c) {
    switch(z(c) && (c = JSON.parse(c)), a) {
      case "tag":
        this.L = c;
        break;
      case "reg":
        this.fastupdate = !1;
        this.h = c;
        for (let e = 0, d; e < this.field.length; e++) {
          d = this.index[this.field[e]], d.h = c, d.fastupdate = !1;
        }
        break;
      case "store":
        this.store = c;
        break;
      default:
        a = a.split(".");
        const b = a[0];
        a = a[1];
        b && a && this.index[b].import(a, c);
    }
  }
};
ma(U.prototype);
const Y = y();
const ta = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
var ua = {normalize:!0, A:!0, C:ta};
const va = new Map([["ai", "ei"], ["ae", "a"], ["oe", "o"], ["ue", "u"], ["sh", "s"], ["ch", "c"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), wa = [/([^aeo])h([aeo$])/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2"];
var xa = {normalize:!0, A:!0, C:ta, G:wa, F:va};
var za = {normalize:!0, A:!0, C:ta, G:wa.concat([/(?!^)[aeoy]/g, ""]), F:va};
const Aa = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
Y["latin:exact"] = {normalize:!1, A:!1};
Y["latin:default"] = ka;
Y["latin:simple"] = {normalize:!0, A:!0};
Y["latin:balance"] = ua;
Y["latin:advanced"] = xa;
Y["latin:extra"] = za;
Y["latin:soundex"] = {normalize:!0, A:!1, aa:{fa:!0}, R:function(a) {
  for (let b = 0; b < a.length; b++) {
    var c = a[b];
    let e = c.charAt(0), d = Aa[e];
    for (let f = 1, g; f < c.length && (g = c.charAt(f), "h" === g || "w" === g || !(g = Aa[g]) || g === d || (e += g, d = g, 4 !== e.length)); f++) {
    }
    a[b] = e;
  }
}};
const Ba = {Index:M, Charset:Y, Encoder:H, Document:U, Worker:null, Resolver:null, IndexedDB:null}, Z = self;
let Ca;
(Ca = Z.define) && Ca.amd ? Ca([], function() {
  return Ba;
}) : "object" === typeof Z.exports ? Z.exports = Ba : Z.FlexSearch = Ba;
}(this));
