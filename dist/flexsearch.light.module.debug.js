/**!
 * FlexSearch.js v0.8.0 (Bundle/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
function t(a, b) {
  return b.length - a.length;
}
;function v(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.B = "";
}
v.prototype.set = function(a, b) {
  this.cache.set(this.B = a, b);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
v.prototype.get = function(a) {
  const b = this.cache.get(a);
  b && this.B !== a && (this.cache.delete(a), this.cache.set(this.B = a, b));
  return b;
};
v.prototype.remove = function(a) {
  for (const b of this.cache) {
    const c = b[0];
    b[1].includes(a) && this.cache.delete(c);
  }
};
v.prototype.clear = function() {
  this.cache.clear();
  this.B = "";
};
const w = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
const x = new Map([["ai", "ei"], ["ae", "a"], ["oe", "o"], ["ue", "u"], ["sh", "s"], ["ch", "c"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), y = [/([^aeo])h([aeo$])/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2"];
const z = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
const A = /[\x00-\x7F]+/g;
const B = /[\x00-\x7F]+/g;
const C = /[\x00-\x7F]+/g;
var D = {LatinExact:{normalize:!1, dedupe:!1}, LatinDefault:{normalize:function(a) {
  return a.toLowerCase();
}, dedupe:!1}, LatinSimple:{normalize:!0, dedupe:!0}, LatinBalance:{normalize:!0, dedupe:!0, mapper:w}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:w, replacer:y, matcher:x}, LatinExtra:{normalize:!0, dedupe:!0, mapper:w, replacer:y.concat([/(?!^)[aeoy]/g, ""]), matcher:x}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (let c = 0; c < a.length; c++) {
    var b = a[c];
    let d = b.charAt(0), e = z[d];
    for (let f = 1, g; f < b.length && (g = b.charAt(f), "h" === g || "w" === g || !(g = z[g]) || g === e || (d += g, e = g, 4 !== d.length)); f++) {
    }
    a[c] = d;
  }
}}, ArabicDefault:{rtl:!0, normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(A, " ");
}}, CjkDefault:{normalize:!1, dedupe:!0, split:"", prepare:function(a) {
  return ("" + a).replace(B, "");
}}, CyrillicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(C, " ");
}}};
const E = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
function F(a) {
  const b = "string" === typeof a ? a : a.preset;
  b && (E[b] || console.warn("Preset not found: " + b), a = Object.assign({}, E[b], a));
  return a;
}
;Object.create(null);
G.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.h.has(a)) {
      return this.update(a, b);
    }
    b = this.encoder.encode(b);
    if (d = b.length) {
      const r = Object.create(null), k = Object.create(null), p = this.depth, q = this.resolution;
      for (let l = 0; l < d; l++) {
        let n = b[this.rtl ? d - 1 - l : l];
        var e = n.length;
        if (e && (p || !k[n])) {
          var f = this.score ? this.score(b, n, l, null, 0) : H(q, d, l), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < e) {
                for (f = 0; f < e; f++) {
                  for (var h = e; h > f; h--) {
                    g = n.substring(f, h);
                    var m = this.score ? this.score(b, n, l, g, f) : H(q, d, l, e, f);
                    J(this, k, g, m, a, c);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < e) {
                for (h = e - 1; 0 < h; h--) {
                  g = n[h] + g, m = this.score ? this.score(b, n, l, g, h) : H(q, d, l, e, h), J(this, k, g, m, a, c);
                }
                g = "";
              }
            case "forward":
              if (1 < e) {
                for (h = 0; h < e; h++) {
                  g += n[h], J(this, k, g, f, a, c);
                }
                break;
              }
            default:
              if (J(this, k, n, f, a, c), p && 1 < d && l < d - 1) {
                for (e = Object.create(null), g = this.C, f = n, h = Math.min(p + 1, d - l), e[f] = 1, m = 1; m < h; m++) {
                  if ((n = b[this.rtl ? d - 1 - l - m : l + m]) && !e[n]) {
                    e[n] = 1;
                    const u = this.score ? this.score(b, f, l, n, m) : H(g + (d / 2 > g ? 0 : 1), d, l, h - 1, m - 1), I = this.bidirectional && n > f;
                    J(this, r, I ? f : n, u, a, c, I ? n : f);
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
function J(a, b, c, d, e, f, g) {
  let h = g ? a.A : a.map, m;
  b[c] && g && (m = b[c])[g] || (g ? (b = m || (b[c] = Object.create(null)), b[g] = 1, (m = h.get(g)) ? h = m : h.set(g, h = new Map())) : b[c] = 1, (m = h.get(c)) ? h = m : h.set(c, h = []), h = h[d] || (h[d] = []), f && h.includes(e) || (h.push(e), a.fastupdate && ((b = a.h.get(e)) ? b.push(h) : a.h.set(e, [h]))));
}
function H(a, b, c, d, e) {
  return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0;
}
;function K(a, b, c) {
  if (1 === a.length) {
    return a = a[0], a = c || a.length > b ? b ? a.slice(c, c + b) : a.slice(c) : a;
  }
  let d = [];
  for (let e = 0, f, g; e < a.length; e++) {
    if ((f = a[e]) && (g = f.length)) {
      if (c) {
        if (c >= g) {
          c -= g;
          continue;
        }
        c < g && (f = b ? f.slice(c, c + b) : f.slice(c), g = f.length, c = 0);
      }
      if (d.length) {
        g > b && (f = f.slice(0, b), g = f.length), d.push(f);
      } else {
        if (g >= b) {
          return g > b && (f = f.slice(0, b)), f;
        }
        d = [f];
      }
      b -= g;
      if (!b) {
        break;
      }
    }
  }
  return d.length ? d = 1 < d.length ? [].concat.apply([], d) : d[0] : d;
}
;function L(a, b, c, d) {
  var e = a.length;
  let f = [], g = 0, h, m, r;
  d && (d = []);
  for (let k = e - 1, p; 0 <= k; k--) {
    r = a[k];
    e = Object.create(null);
    p = !h;
    for (let q = 0, l; q < r.length; q++) {
      if ((l = r[q]) && l.length) {
        for (let n = 0, u; n < l.length; n++) {
          if (u = l[n], h) {
            if (h[u]) {
              if (!k) {
                if (c) {
                  c--;
                } else {
                  if (f[g++] = u, g === b) {
                    return f;
                  }
                }
              }
              if (k || d) {
                e[u] = 1;
              }
              p = !0;
            }
            d && !m[u] && (m[u] = 1, (d[q] || (d[q] = [])).push(u));
          } else {
            e[u] = 1;
          }
        }
      }
    }
    if (d) {
      h || (m = e);
    } else if (!p) {
      return [];
    }
    h = e;
  }
  if (d) {
    for (let k = d.length - 1, p, q; 0 <= k; k--) {
      p = d[k];
      q = p.length;
      for (let l = 0, n; l < q; l++) {
        if (n = p[l], !h[n]) {
          if (c) {
            c--;
          } else {
            if (f[g++] = n, g === b) {
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
;G.prototype.search = function(a, b, c) {
  c || (b || "object" !== typeof a ? "object" === typeof b && (c = b, b = 0) : (c = a, a = ""));
  let d = [];
  let e, f = 0;
  if (c) {
    a = c.query || a;
    b = c.limit || b;
    f = c.offset || 0;
    var g = c.context;
    e = !1;
  }
  a = this.encoder.encode(a);
  c = a.length;
  b || (b = 100);
  if (1 === c) {
    return M.call(this, a[0], "", b, f);
  }
  g = this.depth && !1 !== g;
  if (2 === c && g && !e) {
    return M.call(this, a[0], a[1], b, f);
  }
  let h = 0, m = 0;
  if (1 < c) {
    var r = Object.create(null);
    const p = [];
    for (let q = 0, l; q < c; q++) {
      if ((l = a[q]) && !r[l]) {
        if (e || N(this, l)) {
          p.push(l), r[l] = 1;
        } else {
          return d;
        }
        const n = l.length;
        h = Math.max(h, n);
        m = m ? Math.min(m, n) : n;
      }
    }
    a = p;
    c = a.length;
  }
  if (!c) {
    return d;
  }
  r = 0;
  let k;
  if (1 === c) {
    return M.call(this, a[0], "", b, f);
  }
  if (2 === c && g && !e) {
    return M.call(this, a[0], a[1], b, f);
  }
  1 < c && (g ? (k = a[0], r = 1) : 9 < h && 3 < h / m && a.sort(t));
  for (let p, q; r < c; r++) {
    q = a[r];
    k ? (p = N(this, q, k), p = O(p, d, e, this.C, b, f, 2 === c), e && !1 === p && d.length || (k = q)) : (p = N(this, q), p = O(p, d, e, this.resolution, b, f, 1 === c));
    if (p) {
      return p;
    }
    if (e && r === c - 1) {
      g = d.length;
      if (!g) {
        if (k) {
          k = "";
          r = -1;
          continue;
        }
        return d;
      }
      if (1 === g) {
        return K(d[0], b, f);
      }
    }
  }
  return L(d, b, f, e);
};
function M(a, b, c, d) {
  return (a = N(this, a, b)) && a.length ? K(a, c, d) : [];
}
function O(a, b, c, d, e, f, g) {
  let h = [];
  if (a) {
    d = Math.min(a.length, d);
    for (let m = 0, r = 0, k; m < d; m++) {
      if (k = a[m]) {
        if (f && k && g && (k.length <= f ? (f -= k.length, k = null) : (k = k.slice(f), f = 0)), k && (h[m] = k, g && (r += k.length, r >= e))) {
          break;
        }
      }
    }
    if (h.length) {
      if (g) {
        return K(h, e, 0);
      }
      b.push(h);
      return;
    }
  }
  return !c && h;
}
function N(a, b, c) {
  let d;
  c && (d = a.bidirectional && b > c);
  a = c ? (a = a.A.get(d ? b : c)) && a.get(d ? c : b) : a.map.get(b);
  return a;
}
;G.prototype.remove = function(a, b) {
  const c = this.h.size && (this.fastupdate ? this.h.get(a) : this.h.has(a));
  if (c) {
    if (this.fastupdate) {
      for (let d = 0, e; d < c.length; d++) {
        if (e = c[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            const f = e.indexOf(a);
            f === c.length - 1 ? e.pop() : e.splice(f, 1);
          }
        }
      }
    } else {
      P(this.map, a), this.depth && P(this.A, a);
    }
    b || this.h.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
function P(a, b) {
  let c = 0;
  if (a.constructor === Array) {
    for (let d = 0, e, f; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (f = e.indexOf(b), 0 <= f) {
          1 < e.length ? (e.splice(f, 1), c++) : delete a[d];
          break;
        } else {
          c++;
        }
      }
    }
  } else {
    for (let d of a) {
      const e = d[0], f = P(d[1], b);
      f ? c += f : a.delete(e);
    }
  }
  return c;
}
;function G(a, b) {
  if (!this) {
    return new G(a);
  }
  a = a ? F(a) : {};
  const c = a.context || {}, d = a.encode || a.encoder || function(f) {
    return f.toLowerCase().trim().split(/\s+/);
  };
  this.encoder = d.encode ? d : "object" === typeof d ? d : {encode:d};
  let e;
  this.resolution = a.resolution || 9;
  this.tokenize = e = a.tokenize || "strict";
  this.depth = "strict" === e && c.depth || 0;
  this.bidirectional = !1 !== c.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  e = !1;
  this.map = new Map();
  this.A = new Map();
  this.h = b || (this.fastupdate ? new Map() : new Set());
  this.C = c.resolution || 1;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (e = a.cache || null) && new v(e);
}
G.prototype.clear = function() {
  this.map.clear();
  this.A.clear();
  this.h.clear();
  this.cache && this.cache.clear();
  return this;
};
G.prototype.append = function(a, b) {
  return this.add(a, b, !0);
};
G.prototype.contain = function(a) {
  return this.h.has(a);
};
G.prototype.update = function(a, b) {
  if (this.async) {
    const c = this, d = this.remove(a);
    return d.then ? d.then(() => c.add(a, b)) : this.add(a, b);
  }
  return this.remove(a).add(a, b);
};
function Q(a) {
  let b = 0;
  if (a.constructor === Array) {
    for (let c = 0, d; c < a.length; c++) {
      (d = a[c]) && (b += d.length);
    }
  } else {
    for (const c of a) {
      const d = c[0], e = Q(c[1]);
      e ? b += e : a.delete(d);
    }
  }
  return b;
}
G.prototype.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  Q(this.map);
  this.depth && Q(this.A);
  return this;
};
G.prototype.searchCache = function(a, b, c) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  let d = this.cache.get(a);
  if (!d) {
    d = this.search(a, b, c);
    if (d.then) {
      const e = this;
      d.then(function(f) {
        e.cache.set(a, f);
        return f;
      });
    }
    this.cache.set(a, d);
  }
  return d;
};
export default {Index:G, Charset:D, Encoder:null, Document:null, Worker:null, Resolver:null, IndexedDB:null, Language:{}};

export const Index=G;export const  Charset=D;export const  Encoder=null;export const  Document=null;export const  Worker=null;export const  Resolver=null;export const  IndexedDB=null;export const  Language={};