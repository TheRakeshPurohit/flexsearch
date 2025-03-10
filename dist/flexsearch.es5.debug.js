/**!
 * FlexSearch.js v0.8.0 (ES5/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';
var w;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function x(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return {next:aa(a)};
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function ca(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
}
var z = ca(this);
function B(a, b) {
  if (b) {
    a: {
      var c = z;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        if (!(e in c)) {
          break a;
        }
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
var da;
if ("function" == typeof Object.setPrototypeOf) {
  da = Object.setPrototypeOf;
} else {
  var ea;
  a: {
    var fa = {a:!0}, ha = {};
    try {
      ha.__proto__ = fa;
      ea = ha.a;
      break a;
    } catch (a) {
    }
    ea = !1;
  }
  da = ea ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) {
      throw new TypeError(a + " is not extensible");
    }
    return a;
  } : null;
}
var ia = da;
function ja() {
  this.D = !1;
  this.A = null;
  this.G = void 0;
  this.h = 1;
  this.L = 0;
  this.C = null;
}
function ka(a) {
  if (a.D) {
    throw new TypeError("Generator is already running");
  }
  a.D = !0;
}
ja.prototype.H = function(a) {
  this.G = a;
};
function la(a, b) {
  a.C = {qa:b, ra:!0};
  a.h = a.L;
}
ja.prototype.return = function(a) {
  this.C = {return:a};
  this.h = this.L;
};
function F(a, b, c) {
  a.h = c;
  return {value:b};
}
function ma(a) {
  this.h = new ja();
  this.A = a;
}
function na(a, b) {
  ka(a.h);
  var c = a.h.A;
  if (c) {
    return oa(a, "return" in c ? c["return"] : function(d) {
      return {value:d, done:!0};
    }, b, a.h.return);
  }
  a.h.return(b);
  return G(a);
}
function oa(a, b, c, d) {
  try {
    var e = b.call(a.h.A, c);
    if (!(e instanceof Object)) {
      throw new TypeError("Iterator result " + e + " is not an object");
    }
    if (!e.done) {
      return a.h.D = !1, e;
    }
    var g = e.value;
  } catch (f) {
    return a.h.A = null, la(a.h, f), G(a);
  }
  a.h.A = null;
  d.call(a.h, g);
  return G(a);
}
function G(a) {
  for (; a.h.h;) {
    try {
      var b = a.A(a.h);
      if (b) {
        return a.h.D = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.h.G = void 0, la(a.h, c);
    }
  }
  a.h.D = !1;
  if (a.h.C) {
    b = a.h.C;
    a.h.C = null;
    if (b.ra) {
      throw b.qa;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function pa(a) {
  this.next = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A.next, b, a.h.H) : (a.h.H(b), b = G(a));
    return b;
  };
  this.throw = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A["throw"], b, a.h.H) : (la(a.h, b), b = G(a));
    return b;
  };
  this.return = function(b) {
    return na(a, b);
  };
  this[Symbol.iterator] = function() {
    return this;
  };
}
function qa(a, b) {
  b = new pa(new ma(b));
  ia && a.prototype && ia(b, a.prototype);
  return b;
}
function ra(a) {
  function b(d) {
    return a.next(d);
  }
  function c(d) {
    return a.throw(d);
  }
  return new Promise(function(d, e) {
    function g(f) {
      f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
    }
    g(a.next());
  });
}
function sa(a) {
  return ra(new pa(new ma(a)));
}
B("Symbol", function(a) {
  function b(g) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (g || "") + "_" + e++, g);
  }
  function c(g, f) {
    this.h = g;
    ba(this, "description", {configurable:!0, writable:!0, value:f});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.h;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", e = 0;
  return b;
});
B("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = z[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return ta(aa(this));
    }});
  }
  return a;
});
function ta(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
}
B("Promise", function(a) {
  function b(f) {
    this.A = 0;
    this.C = void 0;
    this.h = [];
    this.L = !1;
    var h = this.D();
    try {
      f(h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  }
  function c() {
    this.h = null;
  }
  function d(f) {
    return f instanceof b ? f : new b(function(h) {
      h(f);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.A = function(f) {
    if (null == this.h) {
      this.h = [];
      var h = this;
      this.C(function() {
        h.G();
      });
    }
    this.h.push(f);
  };
  var e = z.setTimeout;
  c.prototype.C = function(f) {
    e(f, 0);
  };
  c.prototype.G = function() {
    for (; this.h && this.h.length;) {
      var f = this.h;
      this.h = [];
      for (var h = 0; h < f.length; ++h) {
        var k = f[h];
        f[h] = null;
        try {
          k();
        } catch (l) {
          this.D(l);
        }
      }
    }
    this.h = null;
  };
  c.prototype.D = function(f) {
    this.C(function() {
      throw f;
    });
  };
  b.prototype.D = function() {
    function f(l) {
      return function(m) {
        k || (k = !0, l.call(h, m));
      };
    }
    var h = this, k = !1;
    return {resolve:f(this.ka), reject:f(this.G)};
  };
  b.prototype.ka = function(f) {
    if (f === this) {
      this.G(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (f instanceof b) {
        this.ma(f);
      } else {
        a: {
          switch(typeof f) {
            case "object":
              var h = null != f;
              break a;
            case "function":
              h = !0;
              break a;
            default:
              h = !1;
          }
        }
        h ? this.ja(f) : this.H(f);
      }
    }
  };
  b.prototype.ja = function(f) {
    var h = void 0;
    try {
      h = f.then;
    } catch (k) {
      this.G(k);
      return;
    }
    "function" == typeof h ? this.na(h, f) : this.H(f);
  };
  b.prototype.G = function(f) {
    this.fa(2, f);
  };
  b.prototype.H = function(f) {
    this.fa(1, f);
  };
  b.prototype.fa = function(f, h) {
    if (0 != this.A) {
      throw Error("Cannot settle(" + f + ", " + h + "): Promise already settled in state" + this.A);
    }
    this.A = f;
    this.C = h;
    2 === this.A && this.la();
    this.ha();
  };
  b.prototype.la = function() {
    var f = this;
    e(function() {
      if (f.ia()) {
        var h = z.console;
        "undefined" !== typeof h && h.error(f.C);
      }
    }, 1);
  };
  b.prototype.ia = function() {
    if (this.L) {
      return !1;
    }
    var f = z.CustomEvent, h = z.Event, k = z.dispatchEvent;
    if ("undefined" === typeof k) {
      return !0;
    }
    "function" === typeof f ? f = new f("unhandledrejection", {cancelable:!0}) : "function" === typeof h ? f = new h("unhandledrejection", {cancelable:!0}) : (f = z.document.createEvent("CustomEvent"), f.initCustomEvent("unhandledrejection", !1, !0, f));
    f.promise = this;
    f.reason = this.C;
    return k(f);
  };
  b.prototype.ha = function() {
    if (null != this.h) {
      for (var f = 0; f < this.h.length; ++f) {
        g.A(this.h[f]);
      }
      this.h = null;
    }
  };
  var g = new c();
  b.prototype.ma = function(f) {
    var h = this.D();
    f.Y(h.resolve, h.reject);
  };
  b.prototype.na = function(f, h) {
    var k = this.D();
    try {
      f.call(h, k.resolve, k.reject);
    } catch (l) {
      k.reject(l);
    }
  };
  b.prototype.then = function(f, h) {
    function k(p, q) {
      return "function" == typeof p ? function(r) {
        try {
          l(p(r));
        } catch (y) {
          m(y);
        }
      } : q;
    }
    var l, m, n = new b(function(p, q) {
      l = p;
      m = q;
    });
    this.Y(k(f, l), k(h, m));
    return n;
  };
  b.prototype.catch = function(f) {
    return this.then(void 0, f);
  };
  b.prototype.Y = function(f, h) {
    function k() {
      switch(l.A) {
        case 1:
          f(l.C);
          break;
        case 2:
          h(l.C);
          break;
        default:
          throw Error("Unexpected state: " + l.A);
      }
    }
    var l = this;
    null == this.h ? g.A(k) : this.h.push(k);
    this.L = !0;
  };
  b.resolve = d;
  b.reject = function(f) {
    return new b(function(h, k) {
      k(f);
    });
  };
  b.race = function(f) {
    return new b(function(h, k) {
      for (var l = x(f), m = l.next(); !m.done; m = l.next()) {
        d(m.value).Y(h, k);
      }
    });
  };
  b.all = function(f) {
    var h = x(f), k = h.next();
    return k.done ? d([]) : new b(function(l, m) {
      function n(r) {
        return function(y) {
          p[r] = y;
          q--;
          0 == q && l(p);
        };
      }
      var p = [], q = 0;
      do {
        p.push(void 0), q++, d(k.value).Y(n(p.length - 1), m), k = h.next();
      } while (!k.done);
    });
  };
  return b;
});
function ua(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, e = {next:function() {
    if (!d && c < a.length) {
      var g = c++;
      return {value:b(g, a[g]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
}
B("Array.prototype.values", function(a) {
  return a ? a : function() {
    return ua(this, function(b, c) {
      return c;
    });
  };
});
function H(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
B("WeakMap", function(a) {
  function b(k) {
    this.h = (h += Math.random() + 1).toString();
    if (k) {
      k = x(k);
      for (var l; !(l = k.next()).done;) {
        l = l.value, this.set(l[0], l[1]);
      }
    }
  }
  function c() {
  }
  function d(k) {
    var l = typeof k;
    return "object" === l && null !== k || "function" === l;
  }
  function e(k) {
    if (!H(k, f)) {
      var l = new c();
      ba(k, f, {value:l});
    }
  }
  function g(k) {
    var l = Object[k];
    l && (Object[k] = function(m) {
      if (m instanceof c) {
        return m;
      }
      Object.isExtensible(m) && e(m);
      return l(m);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), l = Object.seal({}), m = new a([[k, 2], [l, 3]]);
      if (2 != m.get(k) || 3 != m.get(l)) {
        return !1;
      }
      m.delete(k);
      m.set(l, 4);
      return !m.has(k) && 4 == m.get(l);
    } catch (n) {
      return !1;
    }
  }()) {
    return a;
  }
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var h = 0;
  b.prototype.set = function(k, l) {
    if (!d(k)) {
      throw Error("Invalid WeakMap key");
    }
    e(k);
    if (!H(k, f)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[f][this.h] = l;
    return this;
  };
  b.prototype.get = function(k) {
    return d(k) && H(k, f) ? k[f][this.h] : void 0;
  };
  b.prototype.has = function(k) {
    return d(k) && H(k, f) && H(k[f], this.h);
  };
  b.prototype.delete = function(k) {
    return d(k) && H(k, f) && H(k[f], this.h) ? delete k[f][this.h] : !1;
  };
  return b;
});
B("Map", function(a) {
  function b() {
    var h = {};
    return h.K = h.next = h.head = h;
  }
  function c(h, k) {
    var l = h[1];
    return ta(function() {
      if (l) {
        for (; l.head != h[1];) {
          l = l.K;
        }
        for (; l.next != l.head;) {
          return l = l.next, {done:!1, value:k(l)};
        }
        l = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(h, k) {
    var l = k && typeof k;
    "object" == l || "function" == l ? g.has(k) ? l = g.get(k) : (l = "" + ++f, g.set(k, l)) : l = "p_" + k;
    var m = h[0][l];
    if (m && H(h[0], l)) {
      for (h = 0; h < m.length; h++) {
        var n = m[h];
        if (k !== k && n.key !== n.key || k === n.key) {
          return {id:l, list:m, index:h, F:n};
        }
      }
    }
    return {id:l, list:m, index:-1, F:void 0};
  }
  function e(h) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (h) {
      h = x(h);
      for (var k; !(k = h.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({x:4}), k = new a(x([[h, "s"]]));
      if ("s" != k.get(h) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var l = k.entries(), m = l.next();
      if (m.done || m.value[0] != h || "s" != m.value[1]) {
        return !1;
      }
      m = l.next();
      return m.done || 4 != m.value[0].x || "t" != m.value[1] || !l.next().done ? !1 : !0;
    } catch (n) {
      return !1;
    }
  }()) {
    return a;
  }
  var g = new WeakMap();
  e.prototype.set = function(h, k) {
    h = 0 === h ? 0 : h;
    var l = d(this, h);
    l.list || (l.list = this[0][l.id] = []);
    l.F ? l.F.value = k : (l.F = {next:this[1], K:this[1].K, head:this[1], key:h, value:k}, l.list.push(l.F), this[1].K.next = l.F, this[1].K = l.F, this.size++);
    return this;
  };
  e.prototype.delete = function(h) {
    h = d(this, h);
    return h.F && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this[0][h.id], h.F.K.next = h.F.next, h.F.next.K = h.F.K, h.F.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].K = b();
    this.size = 0;
  };
  e.prototype.has = function(h) {
    return !!d(this, h).F;
  };
  e.prototype.get = function(h) {
    return (h = d(this, h).F) && h.value;
  };
  e.prototype.entries = function() {
    return c(this, function(h) {
      return [h.key, h.value];
    });
  };
  e.prototype.keys = function() {
    return c(this, function(h) {
      return h.key;
    });
  };
  e.prototype.values = function() {
    return c(this, function(h) {
      return h.value;
    });
  };
  e.prototype.forEach = function(h, k) {
    for (var l = this.entries(), m; !(m = l.next()).done;) {
      m = m.value, h.call(k, m[1], m[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var f = 0;
  return e;
});
B("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return ua(this, function(b) {
      return b;
    });
  };
});
B("Set", function(a) {
  function b(c) {
    this.h = new Map();
    if (c) {
      c = x(c);
      for (var d; !(d = c.next()).done;) {
        this.add(d.value);
      }
    }
    this.size = this.h.size;
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), d = new a(x([c]));
      if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({x:4}) != d || 2 != d.size) {
        return !1;
      }
      var e = d.entries(), g = e.next();
      if (g.done || g.value[0] != c || g.value[1] != c) {
        return !1;
      }
      g = e.next();
      return g.done || g.value[0] == c || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : e.next().done;
    } catch (f) {
      return !1;
    }
  }()) {
    return a;
  }
  b.prototype.add = function(c) {
    c = 0 === c ? 0 : c;
    this.h.set(c, c);
    this.size = this.h.size;
    return this;
  };
  b.prototype.delete = function(c) {
    c = this.h.delete(c);
    this.size = this.h.size;
    return c;
  };
  b.prototype.clear = function() {
    this.h.clear();
    this.size = 0;
  };
  b.prototype.has = function(c) {
    return this.h.has(c);
  };
  b.prototype.entries = function() {
    return this.h.entries();
  };
  b.prototype.values = function() {
    return this.h.values();
  };
  b.prototype.keys = b.prototype.values;
  b.prototype[Symbol.iterator] = b.prototype.values;
  b.prototype.forEach = function(c, d) {
    var e = this;
    this.h.forEach(function(g) {
      return c.call(d, g, g, e);
    });
  };
  return b;
});
B("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
B("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var g = d[c];
      if (g === b || Object.is(g, b)) {
        return !0;
      }
    }
    return !1;
  };
});
B("String.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    if (null == this) {
      throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
    }
    if (b instanceof RegExp) {
      throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
    }
    return -1 !== this.indexOf(b, c || 0);
  };
});
B("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return ua(this, function(b, c) {
      return [b, c];
    });
  };
});
var va = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var e in d) {
        H(d, e) && (a[e] = d[e]);
      }
    }
  }
  return a;
};
B("Object.assign", function(a) {
  return a || va;
});
B("Array.prototype.flat", function(a) {
  return a ? a : function(b) {
    b = void 0 === b ? 1 : b;
    var c = [];
    Array.prototype.forEach.call(this, function(d) {
      Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1), c.push.apply(c, d)) : c.push(d);
    });
    return c;
  };
});
function I(a, b, c) {
  var d = typeof c, e = typeof a;
  if ("undefined" !== d) {
    if ("undefined" !== e) {
      if (c) {
        if ("function" === e && d === e) {
          return function(g) {
            return a(c(g));
          };
        }
        b = a.constructor;
        if (b === c.constructor) {
          if (b === Array) {
            return c.concat(a);
          }
          if (b === Map) {
            b = new Map(c);
            d = x(a);
            for (e = d.next(); !e.done; e = d.next()) {
              e = e.value, b.set(e[0], e[1]);
            }
            return b;
          }
          if (b === Set) {
            b = new Set(c);
            d = x(a.values());
            for (e = d.next(); !e.done; e = d.next()) {
              b.add(e.value);
            }
            return b;
          }
        }
      }
      return a;
    }
    return c;
  }
  return "undefined" === e ? b : a;
}
function K() {
  return Object.create(null);
}
function wa(a, b) {
  return b.length - a.length;
}
function L(a) {
  return "string" === typeof a;
}
function M(a) {
  return "object" === typeof a;
}
function xa(a) {
  var b = [];
  a = x(a.keys());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function ya(a, b) {
  if (L(b)) {
    a = a[b];
  } else {
    for (var c = 0; a && c < b.length; c++) {
      a = a[b[c]];
    }
  }
  return a;
}
function za(a) {
  for (var b = 0, c = 0, d = void 0; c < a.length; c++) {
    (d = a[c]) && b < d.length && (b = d.length);
  }
  return b;
}
;var Aa = [["\u00aa", "a"], ["\u00b2", "2"], ["\u00b3", "3"], ["\u00b9", "1"], ["\u00ba", "o"], ["\u00bc", "1\u20444"], ["\u00bd", "1\u20442"], ["\u00be", "3\u20444"], ["\u00e0", "a"], ["\u00e1", "a"], ["\u00e2", "a"], ["\u00e3", "a"], ["\u00e4", "a"], ["\u00e5", "a"], ["\u00e7", "c"], ["\u00e8", "e"], ["\u00e9", "e"], ["\u00ea", "e"], ["\u00eb", "e"], ["\u00ec", "i"], ["\u00ed", "i"], ["\u00ee", "i"], ["\u00ef", "i"], ["\u00f1", "n"], ["\u00f2", "o"], ["\u00f3", "o"], ["\u00f4", "o"], ["\u00f5", 
"o"], ["\u00f6", "o"], ["\u00f9", "u"], ["\u00fa", "u"], ["\u00fb", "u"], ["\u00fc", "u"], ["\u00fd", "y"], ["\u00ff", "y"], ["\u0101", "a"], ["\u0103", "a"], ["\u0105", "a"], ["\u0107", "c"], ["\u0109", "c"], ["\u010b", "c"], ["\u010d", "c"], ["\u010f", "d"], ["\u0113", "e"], ["\u0115", "e"], ["\u0117", "e"], ["\u0119", "e"], ["\u011b", "e"], ["\u011d", "g"], ["\u011f", "g"], ["\u0121", "g"], ["\u0123", "g"], ["\u0125", "h"], ["\u0129", "i"], ["\u012b", "i"], ["\u012d", "i"], ["\u012f", "i"], ["\u0133", 
"ij"], ["\u0135", "j"], ["\u0137", "k"], ["\u013a", "l"], ["\u013c", "l"], ["\u013e", "l"], ["\u0140", "l"], ["\u0144", "n"], ["\u0146", "n"], ["\u0148", "n"], ["\u0149", "n"], ["\u014d", "o"], ["\u014f", "o"], ["\u0151", "o"], ["\u0155", "r"], ["\u0157", "r"], ["\u0159", "r"], ["\u015b", "s"], ["\u015d", "s"], ["\u015f", "s"], ["\u0161", "s"], ["\u0163", "t"], ["\u0165", "t"], ["\u0169", "u"], ["\u016b", "u"], ["\u016d", "u"], ["\u016f", "u"], ["\u0171", "u"], ["\u0173", "u"], ["\u0175", "w"], ["\u0177", 
"y"], ["\u017a", "z"], ["\u017c", "z"], ["\u017e", "z"], ["\u017f", "s"], ["\u01a1", "o"], ["\u01b0", "u"], ["\u01c6", "dz"], ["\u01c9", "lj"], ["\u01cc", "nj"], ["\u01ce", "a"], ["\u01d0", "i"], ["\u01d2", "o"], ["\u01d4", "u"], ["\u01d6", "u"], ["\u01d8", "u"], ["\u01da", "u"], ["\u01dc", "u"], ["\u01df", "a"], ["\u01e1", "a"], ["\u01e3", "ae"], ["\u00e6", "ae"], ["\u01fd", "ae"], ["\u01e7", "g"], ["\u01e9", "k"], ["\u01eb", "o"], ["\u01ed", "o"], ["\u01ef", "\u0292"], ["\u01f0", "j"], ["\u01f3", 
"dz"], ["\u01f5", "g"], ["\u01f9", "n"], ["\u01fb", "a"], ["\u01ff", "\u00f8"], ["\u0201", "a"], ["\u0203", "a"], ["\u0205", "e"], ["\u0207", "e"], ["\u0209", "i"], ["\u020b", "i"], ["\u020d", "o"], ["\u020f", "o"], ["\u0211", "r"], ["\u0213", "r"], ["\u0215", "u"], ["\u0217", "u"], ["\u0219", "s"], ["\u021b", "t"], ["\u021f", "h"], ["\u0227", "a"], ["\u0229", "e"], ["\u022b", "o"], ["\u022d", "o"], ["\u022f", "o"], ["\u0231", "o"], ["\u0233", "y"], ["\u02b0", "h"], ["\u02b1", "h"], ["\u0266", "h"], 
["\u02b2", "j"], ["\u02b3", "r"], ["\u02b4", "\u0279"], ["\u02b5", "\u027b"], ["\u02b6", "\u0281"], ["\u02b7", "w"], ["\u02b8", "y"], ["\u02e0", "\u0263"], ["\u02e1", "l"], ["\u02e2", "s"], ["\u02e3", "x"], ["\u02e4", "\u0295"], ["\u0390", "\u03b9"], ["\u03ac", "\u03b1"], ["\u03ad", "\u03b5"], ["\u03ae", "\u03b7"], ["\u03af", "\u03b9"], ["\u03b0", "\u03c5"], ["\u03ca", "\u03b9"], ["\u03cb", "\u03c5"], ["\u03cc", "\u03bf"], ["\u03cd", "\u03c5"], ["\u03ce", "\u03c9"], ["\u03d0", "\u03b2"], ["\u03d1", 
"\u03b8"], ["\u03d2", "\u03a5"], ["\u03d3", "\u03a5"], ["\u03d4", "\u03a5"], ["\u03d5", "\u03c6"], ["\u03d6", "\u03c0"], ["\u03f0", "\u03ba"], ["\u03f1", "\u03c1"], ["\u03f2", "\u03c2"], ["\u03f5", "\u03b5"], ["\u0439", "\u0438"], ["\u0450", "\u0435"], ["\u0451", "\u0435"], ["\u0453", "\u0433"], ["\u0457", "\u0456"], ["\u045c", "\u043a"], ["\u045d", "\u0438"], ["\u045e", "\u0443"], ["\u0477", "\u0475"], ["\u04c2", "\u0436"], ["\u04d1", "\u0430"], ["\u04d3", "\u0430"], ["\u04d7", "\u0435"], ["\u04db", 
"\u04d9"], ["\u04dd", "\u0436"], ["\u04df", "\u0437"], ["\u04e3", "\u0438"], ["\u04e5", "\u0438"], ["\u04e7", "\u043e"], ["\u04eb", "\u04e9"], ["\u04ed", "\u044d"], ["\u04ef", "\u0443"], ["\u04f1", "\u0443"], ["\u04f3", "\u0443"], ["\u04f5", "\u0447"]];
var Ba = /[^\p{L}\p{N}]+/u, Ca = /(\d{3})/g, Da = /(\D)(\d{3})/g, Ea = /(\d{3})(\D)/g, Fa = "".normalize && /[\u0300-\u036f]/g;
function N(a) {
  if (!this) {
    var b = Function.prototype.bind, c = b.apply, d = [null], e = d.concat;
    if (arguments instanceof Array) {
      var g = arguments;
    } else {
      g = x(arguments);
      for (var f, h = []; !(f = g.next()).done;) {
        h.push(f.value);
      }
      g = h;
    }
    return new (c.call(b, N, e.call(d, g)))();
  }
  for (b = 0; b < arguments.length; b++) {
    this.assign(arguments[b]);
  }
}
N.prototype.assign = function(a) {
  this.normalize = I(a.normalize, !0, this.normalize);
  var b = a.include, c = b || a.exclude || a.split;
  if ("object" === typeof c) {
    var d = !b, e = "";
    a.include || (e += "\\p{Z}");
    c.letter && (e += "\\p{L}");
    c.number && (e += "\\p{N}", d = !!b);
    c.symbol && (e += "\\p{S}");
    c.punctuation && (e += "\\p{P}");
    c.control && (e += "\\p{C}");
    if (c = c.char) {
      e += "object" === typeof c ? c.join("") : c;
    }
    this.split = new RegExp("[" + (b ? "^" : "") + e + "]+", "u");
    this.numeric = d;
  } else {
    this.split = I(c, Ba, this.split), this.numeric = I(this.numeric, !0);
  }
  this.prepare = I(a.prepare, null, this.prepare);
  this.finalize = I(a.finalize, null, this.finalize);
  Fa || (this.mapper = new Map(Aa));
  this.rtl = a.rtl || !1;
  this.dedupe = I(a.dedupe, !0, this.dedupe);
  this.filter = I((c = a.filter) && new Set(c), null, this.filter);
  this.matcher = I((c = a.matcher) && new Map(c), null, this.matcher);
  this.mapper = I((c = a.mapper) && new Map(c), null, this.mapper);
  this.stemmer = I((c = a.stemmer) && new Map(c), null, this.stemmer);
  this.replacer = I(a.replacer, null, this.replacer);
  this.minlength = I(a.minlength, 1, this.minlength);
  this.maxlength = I(a.maxlength, 0, this.maxlength);
  if (this.cache = c = I(a.cache, !0, this.cache)) {
    this.X = null, this.L = "number" === typeof c ? c : 2e5, this.P = new Map(), this.V = new Map(), this.A = this.h = 128;
  }
  this.C = "";
  this.G = null;
  this.D = "";
  this.H = null;
  if (this.matcher) {
    for (a = x(this.matcher.keys()), b = a.next(); !b.done; b = a.next()) {
      this.C += (this.C ? "|" : "") + b.value;
    }
  }
  if (this.stemmer) {
    for (a = x(this.stemmer.keys()), b = a.next(); !b.done; b = a.next()) {
      this.D += (this.D ? "|" : "") + b.value;
    }
  }
  return this;
};
N.prototype.encode = function(a) {
  var b = this;
  if (this.cache && a.length <= this.h) {
    if (this.X) {
      if (this.P.has(a)) {
        return this.P.get(a);
      }
    } else {
      this.X = setTimeout(Ga, 0, this);
    }
  }
  this.normalize && (a = "function" === typeof this.normalize ? this.normalize(a) : Fa ? a.normalize("NFKD").replace(Fa, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(Da, "$1 $2").replace(Ea, "$1 $2").replace(Ca, "$1 "));
  for (var c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer), d = [], e = this.split || "" === this.split ? a.split(this.split) : a, g = 0, f = void 0, h = void 0; g < e.length; g++) {
    if ((f = h = e[g]) && !(f.length < this.minlength)) {
      if (c) {
        d.push(f);
      } else {
        if (!this.filter || !this.filter.has(f)) {
          if (this.cache && f.length <= this.A) {
            if (this.X) {
              var k = this.V.get(f);
              if (k || "" === k) {
                k && d.push(k);
                continue;
              }
            } else {
              this.X = setTimeout(Ga, 0, this);
            }
          }
          k = void 0;
          this.stemmer && 2 < f.length && (this.H || (this.H = new RegExp("(?!^)(" + this.D + ")$")), f = f.replace(this.H, function(q) {
            return b.stemmer.get(q);
          }), k = 1);
          this.matcher && 1 < f.length && (this.G || (this.G = new RegExp("(" + this.C + ")", "g")), f = f.replace(this.G, function(q) {
            return b.matcher.get(q);
          }), k = 1);
          f && k && (f.length < this.minlength || this.filter && this.filter.has(f)) && (f = "");
          if (f && (this.mapper || this.dedupe && 1 < f.length)) {
            k = "";
            for (var l = 0, m = "", n = void 0, p = void 0; l < f.length; l++) {
              n = f.charAt(l), n === m && this.dedupe || ((p = this.mapper && this.mapper.get(n)) || "" === p ? p === m && this.dedupe || !(m = p) || (k += p) : k += m = n);
            }
            f = k;
          }
          if (f && this.replacer) {
            for (k = 0; f && k < this.replacer.length; k += 2) {
              f = f.replace(this.replacer[k], this.replacer[k + 1]);
            }
          }
          this.cache && h.length <= this.A && (this.V.set(h, f), this.V.size > this.L && (this.V.clear(), this.A = this.A / 1.1 | 0));
          f && d.push(f);
        }
      }
    }
  }
  this.finalize && (d = this.finalize(d) || d);
  this.cache && a.length <= this.h && (this.P.set(a, d), this.P.size > this.L && (this.P.clear(), this.h = this.h / 1.1 | 0));
  return d;
};
function Ga(a) {
  a.X = null;
  a.P.clear();
  a.V.clear();
}
;function Ha(a, b, c) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  var d = this.cache.get(a);
  if (!d) {
    d = this.search(a, b, c);
    if (d.then) {
      var e = this;
      d.then(function(g) {
        e.cache.set(a, g);
        return g;
      });
    }
    this.cache.set(a, d);
  }
  return d;
}
function Q(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
Q.prototype.set = function(a, b) {
  this.cache.set(this.h = a, b);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
Q.prototype.get = function(a) {
  var b = this.cache.get(a);
  b && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, b));
  return b;
};
Q.prototype.remove = function(a) {
  for (var b = x(this.cache), c = b.next(); !c.done; c = b.next()) {
    c = c.value;
    var d = c[0];
    c[1].includes(a) && this.cache.delete(d);
  }
};
Q.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
var Ia = {normalize:function(a) {
  return a.toLowerCase();
}, dedupe:!1};
var Ja = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
var Ka = new Map([["ai", "ei"], ["ae", "a"], ["oe", "o"], ["ue", "u"], ["sh", "s"], ["ch", "c"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), La = [/([^aeo])h([aeo$])/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2"];
var Ma = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var Na = /[\x00-\x7F]+/g;
var Oa = /[\x00-\x7F]+/g;
var Pa = /[\x00-\x7F]+/g;
var Qa = {LatinExact:{normalize:!1, dedupe:!1}, LatinDefault:Ia, LatinSimple:{normalize:!0, dedupe:!0}, LatinBalance:{normalize:!0, dedupe:!0, mapper:Ja}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:Ja, replacer:La, matcher:Ka}, LatinExtra:{normalize:!0, dedupe:!0, mapper:Ja, replacer:La.concat([/(?!^)[aeoy]/g, ""]), matcher:Ka}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (var b = 0; b < a.length; b++) {
    for (var c = a[b], d = c.charAt(0), e = Ma[d], g = 1, f; g < c.length && (f = c.charAt(g), "h" === f || "w" === f || !(f = Ma[f]) || f === e || (d += f, e = f, 4 !== d.length)); g++) {
    }
    a[b] = d;
  }
}}, ArabicDefault:{rtl:!0, normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Na, " ");
}}, CjkDefault:{normalize:!1, dedupe:!0, split:"", prepare:function(a) {
  return ("" + a).replace(Oa, "");
}}, CyrillicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Pa, " ");
}}};
function Ra(a, b, c, d) {
  for (var e = [], g = 0, f; g < a.index.length; g++) {
    if (f = a.index[g], b >= f.length) {
      b -= f.length;
    } else {
      b = f[d ? "splice" : "slice"](b, c);
      if (f = b.length) {
        if (e = e.length ? e.concat(b) : b, c -= f, d && (a.length -= f), !c) {
          break;
        }
      }
      b = 0;
    }
  }
  return e;
}
function R(a) {
  if (!this) {
    return new R(a);
  }
  this.index = a ? [a] : [];
  this.length = a ? a.length : 0;
  var b = this;
  return new Proxy([], {get:function(c, d) {
    if ("length" === d) {
      return b.length;
    }
    if ("push" === d) {
      return function(e) {
        b.index[b.index.length - 1].push(e);
        b.length++;
      };
    }
    if ("pop" === d) {
      return function() {
        if (b.length) {
          return b.length--, b.index[b.index.length - 1].pop();
        }
      };
    }
    if ("indexOf" === d) {
      return function(e) {
        for (var g = 0, f = 0, h, k; f < b.index.length; f++) {
          h = b.index[f];
          k = h.indexOf(e);
          if (0 <= k) {
            return g + k;
          }
          g += h.length;
        }
        return -1;
      };
    }
    if ("includes" === d) {
      return function(e) {
        for (var g = 0; g < b.index.length; g++) {
          if (b.index[g].includes(e)) {
            return !0;
          }
        }
        return !1;
      };
    }
    if ("slice" === d) {
      return function(e, g) {
        return Ra(b, e || 0, g || b.length, !1);
      };
    }
    if ("splice" === d) {
      return function(e, g) {
        return Ra(b, e || 0, g || b.length, !0);
      };
    }
    if ("constructor" === d) {
      return Array;
    }
    if ("symbol" !== typeof d) {
      return (c = b.index[d / Math.pow(2, 31) | 0]) && c[d];
    }
  }, set:function(c, d, e) {
    c = d / Math.pow(2, 31) | 0;
    (b.index[c] || (b.index[c] = []))[d] = e;
    b.length++;
    return !0;
  }});
}
R.prototype.clear = function() {
  this.index.length = 0;
};
R.prototype.push = function() {
};
function S(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new S(a);
  }
  this.index = K();
  this.C = [];
  this.size = 0;
  32 < a ? (this.h = Sa, this.A = BigInt(a)) : (this.h = Ta, this.A = a);
}
S.prototype.get = function(a) {
  var b = this.h(a);
  return (b = this.index[b]) && b.get(a);
};
S.prototype.set = function(a, b) {
  var c = this.h(a), d = this.index[c];
  d ? (c = d.size, d.set(a, b), (c -= d.size) && this.size++) : (this.index[c] = d = new Map([[a, b]]), this.C.push(d));
};
function T(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new T(a);
  }
  this.index = K();
  this.h = [];
  32 < a ? (this.C = Sa, this.A = BigInt(a)) : (this.C = Ta, this.A = a);
}
T.prototype.add = function(a) {
  var b = this.C(a), c = this.index[b];
  c ? (b = c.size, c.add(a), (b -= c.size) && this.size++) : (this.index[b] = c = new Set([a]), this.h.push(c));
};
w = S.prototype;
w.has = T.prototype.has = function(a) {
  var b = this.C(a);
  return (b = this.index[b]) && b.has(a);
};
w.delete = T.prototype.delete = function(a) {
  var b = this.C(a);
  (b = this.index[b]) && b.delete(a) && this.size--;
};
w.clear = T.prototype.clear = function() {
  this.index = K();
  this.h = [];
  this.size = 0;
};
w.values = T.prototype.values = function Ua() {
  var b, c = this, d, e, g;
  return qa(Ua, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = x(c.h[b].values());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return F(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
w.keys = T.prototype.keys = function Va() {
  var b, c = this, d, e, g;
  return qa(Va, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = x(c.h[b].keys());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return F(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
w.entries = T.prototype.entries = function Wa() {
  var b, c = this, d, e, g;
  return qa(Wa, function(f) {
    switch(f.h) {
      case 1:
        b = 0;
      case 2:
        if (!(b < c.h.length)) {
          f.h = 0;
          break;
        }
        d = x(c.h[b].entries());
        e = d.next();
      case 5:
        if (e.done) {
          b++;
          f.h = 2;
          break;
        }
        g = e.value;
        return F(f, g, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
function Ta(a) {
  var b = Math.pow(2, this.A) - 1;
  if ("number" == typeof a) {
    return a & b;
  }
  for (var c = 0, d = this.A + 1, e = 0; e < a.length; e++) {
    c = (c * d ^ a.charCodeAt(e)) & b;
  }
  return 32 === this.A ? c + Math.pow(2, 31) : c;
}
function Sa() {
  throw Error("The keystore is limited to 32 for EcmaScript5");
}
;function Xa(a, b, c, d, e, g, f, h) {
  (d = a(c ? c + "." + d : d, JSON.stringify(f))) && d.then ? d.then(function() {
    b.export(a, b, c, e, g + 1, h);
  }) : b.export(a, b, c, e, g + 1, h);
}
;var Ya = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
function Za(a) {
  U.call(a, "add");
  U.call(a, "append");
  U.call(a, "search");
  U.call(a, "update");
  U.call(a, "remove");
}
function U(a) {
  this[a + "Async"] = function() {
    var b = arguments, c = b[b.length - 1];
    if ("function" === typeof c) {
      var d = c;
      delete b[b.length - 1];
    }
    this.async = !0;
    b = this[a].apply(this, b);
    this.async = !1;
    d && (b.then ? b.then(d) : d(b));
    return b;
  };
}
;K();
V.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.B.has(a)) {
      return this.update(a, b);
    }
    b = this.encoder.encode(b);
    if (d = b.length) {
      for (var e = K(), g = K(), f = this.depth, h = this.resolution, k = 0; k < d; k++) {
        var l = b[this.rtl ? d - 1 - k : k], m = l.length;
        if (m && (f || !g[l])) {
          var n = this.score ? this.score(b, l, k, null, 0) : $a(h, d, k), p = "";
          switch(this.tokenize) {
            case "full":
              if (2 < m) {
                for (n = 0; n < m; n++) {
                  for (var q = m; q > n; q--) {
                    p = l.substring(n, q);
                    var r = this.score ? this.score(b, l, k, p, n) : $a(h, d, k, m, n);
                    ab(this, g, p, r, a, c);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < m) {
                for (q = m - 1; 0 < q; q--) {
                  p = l[q] + p, r = this.score ? this.score(b, l, k, p, q) : $a(h, d, k, m, q), ab(this, g, p, r, a, c);
                }
                p = "";
              }
            case "forward":
              if (1 < m) {
                for (q = 0; q < m; q++) {
                  p += l[q], ab(this, g, p, n, a, c);
                }
                break;
              }
            default:
              if (ab(this, g, l, n, a, c), f && 1 < d && k < d - 1) {
                for (m = K(), p = this.da, n = l, q = Math.min(f + 1, d - k), r = m[n] = 1; r < q; r++) {
                  if ((l = b[this.rtl ? d - 1 - k - r : k + r]) && !m[l]) {
                    m[l] = 1;
                    var y = this.score ? this.score(b, n, k, l, r) : $a(p + (d / 2 > p ? 0 : 1), d, k, q - 1, r - 1), u = this.bidirectional && l > n;
                    ab(this, e, u ? n : l, y, a, c, u ? l : n);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.B.add(a);
    } else {
      b = "";
    }
  }
  this.db && (b || this.R.push({del:a}), this.ga && bb(this));
  return this;
};
function ab(a, b, c, d, e, g, f) {
  var h = f ? a.J : a.map, k;
  if (!b[c] || !f || !(k = b[c])[f]) {
    if (f ? (b = k || (b[c] = K()), b[f] = 1, (k = h.get(f)) ? h = k : h.set(f, h = new Map())) : b[c] = 1, (k = h.get(c)) ? h = k : h.set(c, h = k = []), h = h[d] || (h[d] = []), !g || !h.includes(e)) {
      if (h.length === Math.pow(2, 31) - 1) {
        b = new R(h);
        if (a.fastupdate) {
          for (c = x(a.B.values()), g = c.next(); !g.done; g = c.next()) {
            g = g.value, g.includes(h) && (g[g.indexOf(h)] = b);
          }
        }
        k[d] = h = b;
      }
      h.push(e);
      a.fastupdate && ((d = a.B.get(e)) ? d.push(h) : a.B.set(e, [h]));
    }
  }
}
function $a(a, b, c, d, e) {
  return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0;
}
;function W(a, b, c, d) {
  if (1 === a.length) {
    return a = a[0], a = c || a.length > b ? b ? a.slice(c, c + b) : a.slice(c) : a, d ? cb(a) : a;
  }
  for (var e = [], g = 0, f = void 0, h = void 0; g < a.length; g++) {
    if ((f = a[g]) && (h = f.length)) {
      if (c) {
        if (c >= h) {
          c -= h;
          continue;
        }
        c < h && (f = b ? f.slice(c, c + b) : f.slice(c), h = f.length, c = 0);
      }
      if (e.length) {
        h > b && (f = f.slice(0, b), h = f.length), e.push(f);
      } else {
        if (h >= b) {
          return h > b && (f = f.slice(0, b)), d ? cb(f) : f;
        }
        e = [f];
      }
      b -= h;
      if (!b) {
        break;
      }
    }
  }
  if (!e.length) {
    return e;
  }
  e = 1 < e.length ? [].concat.apply([], e) : e[0];
  return d ? cb(e) : e;
}
function cb(a) {
  for (var b = 0; b < a.length; b++) {
    a[b] = {score:b, id:a[b]};
  }
  return a;
}
;X.prototype.or = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.or.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.or.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e = 0, g = 0, f, h, k = 0, l = void 0; k < b.length; k++) {
    if (l = b[k]) {
      var m = void 0;
      if (l.constructor === X) {
        m = l.result;
      } else if (l.constructor === Array) {
        m = l;
      } else if (l.index) {
        l.resolve = !1, m = l.index.search(l).result;
      } else if (l.and) {
        m = this.and(l.and);
      } else if (l.xor) {
        m = this.xor(l.xor);
      } else if (l.not) {
        m = this.not(l.not);
      } else {
        e = l.limit || 0;
        g = l.offset || 0;
        f = l.enrich;
        h = l.resolve;
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = [a.result].concat(d));
      a.result = db(d, e, g, f, h, a.M);
      return h ? a.result : a;
    });
  }
  this.result.length && (d = [this.result].concat(d));
  this.result = db(d, e, g, f, h, a.M);
  return h ? this.result : this;
};
function db(a, b, c, d, e, g) {
  if (!a.length) {
    return a;
  }
  "object" === typeof b && (c = b.offset || 0, d = b.enrich || !1, b = b.limit || 0);
  if (2 > a.length) {
    return e ? W(a[0], b, c, d) : a[0];
  }
  d = [];
  for (var f = 0, h = K(), k = za(a), l = 0, m; l < k; l++) {
    for (var n = 0; n < a.length; n++) {
      if (m = a[n]) {
        if (m = m[l]) {
          for (var p = 0, q; p < m.length; p++) {
            if (q = m[p], !h[q]) {
              if (h[q] = 1, c) {
                c--;
              } else {
                if (e) {
                  d.push(q);
                } else {
                  var r = l + (n ? g : 0);
                  d[r] || (d[r] = []);
                  d[r].push(q);
                }
                if (b && ++f === b) {
                  return d;
                }
              }
            }
          }
        }
      }
    }
  }
  return d;
}
;X.prototype.and = function() {
  if (this.result.length) {
    var a = this, b = arguments, c = b[0];
    if (c.then) {
      return c.then(function() {
        return a.and.apply(a, b);
      });
    }
    if (c[0] && c[0].index) {
      return this.and.apply(this, c);
    }
    var d = [];
    c = [];
    for (var e = 0, g = 0, f, h = 0, k = void 0; h < b.length; h++) {
      if (k = b[h]) {
        var l = void 0;
        if (k.constructor === X) {
          l = k.result;
        } else if (k.constructor === Array) {
          l = k;
        } else if (k.index) {
          k.resolve = !1, l = k.index.search(k).result;
        } else if (k.or) {
          l = this.or(k.or);
        } else if (k.xor) {
          l = this.xor(k.xor);
        } else if (k.not) {
          l = this.not(k.not);
        } else {
          e = k.limit || 0;
          g = k.offset || 0;
          f = k.resolve;
          continue;
        }
        d[h] = l;
        l.then && c.push(l);
      }
    }
    if (c.length) {
      return Promise.all(c).then(function() {
        d = [a.result].concat(d);
        a.result = eb(d, e, g, f, a.M);
        return f ? a.result : a;
      });
    }
    d = [this.result].concat(d);
    this.result = eb(d, e, g, f, a.M);
    return f ? this.result : this;
  }
  return this;
};
function eb(a, b, c, d, e) {
  if (2 > a.length) {
    return [];
  }
  var g = [], f = 0, h = K(), k = za(a);
  if (!k) {
    return g;
  }
  for (var l = 0, m; l < a.length; l++) {
    m = a[l];
    if (!m || !m.length) {
      return [];
    }
    for (var n = K(), p = 0, q = l === a.length - 1, r = 0, y; r < k; r++) {
      if (y = m[r]) {
        for (var u = 0, t, v; u < y.length; u++) {
          if (t = y[u], !l) {
            n[t] = r + 1 + (l ? e : 0), p = 1;
          } else if (q) {
            if (v = h[t]) {
              if (p = 1, c) {
                c--;
              } else {
                if (d ? g.push(t) : (v--, r < v && (v = r), g[v] || (g[v] = []), g[v].push(t)), b && ++f === b) {
                  return g;
                }
              }
            }
          } else if (v = h[t]) {
            r + 1 < v && (v = r + 1), n[t] = v, p = 1;
          }
        }
      }
    }
    if (!p) {
      return [];
    }
    h = n;
  }
  return g;
}
;X.prototype.xor = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.xor.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.xor.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e = 0, g = 0, f, h, k = 0, l = void 0; k < b.length; k++) {
    if (l = b[k]) {
      var m = void 0;
      if (l.constructor === X) {
        m = l.result;
      } else if (l.constructor === Array) {
        m = l;
      } else if (l.index) {
        l.resolve = !1, m = l.index.search(l).result;
      } else if (l.or) {
        m = this.or(l.or);
      } else if (l.and) {
        m = this.and(l.and);
      } else if (l.not) {
        m = this.not(l.not);
      } else {
        e = l.limit || 0;
        g = l.offset || 0;
        f = l.enrich;
        h = l.resolve;
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = [a.result].concat(d));
      a.result = fb(d, e, g, f, !h, a.M);
      return h ? a.result : a;
    });
  }
  this.result.length && (d = [this.result].concat(d));
  this.result = fb(d, e, g, f, !h, a.M);
  return h ? this.result : this;
};
function fb(a, b, c, d, e, g) {
  if (!a.length) {
    return a;
  }
  if (2 > a.length) {
    return e ? W(a[0], b, c, d) : a[0];
  }
  b = [];
  c = K();
  d = 0;
  for (var f; d < a.length; d++) {
    if (f = a[d]) {
      for (var h = 0, k; h < f.length; h++) {
        if (k = f[h]) {
          for (var l = 0, m; l < k.length; l++) {
            m = k[l], c[m] ? c[m]++ : c[m] = 1;
          }
        }
      }
    }
  }
  for (d = 0; d < a.length; d++) {
    if (f = a[d]) {
      for (h = 0; h < f.length; h++) {
        if (k = f[h]) {
          for (l = 0; l < k.length; l++) {
            if (m = k[l], 1 === c[m]) {
              if (e) {
                b.push(m);
              } else {
                var n = h + (d ? g : 0);
                b[n] || (b[n] = []);
                b[n].push(m);
              }
            }
          }
        }
      }
    }
  }
  return b;
}
;X.prototype.not = function() {
  var a = this, b = arguments, c = b[0];
  if (c.then) {
    return c.then(function() {
      return a.not.apply(a, b);
    });
  }
  if (c[0] && c[0].index) {
    return this.not.apply(this, c);
  }
  var d = [];
  c = [];
  for (var e, g = 0, f = void 0; g < b.length; g++) {
    if (f = b[g]) {
      var h = void 0;
      if (f.constructor === X) {
        h = f.result;
      } else if (f.constructor === Array) {
        h = f;
      } else if (f.index) {
        f.resolve = !1, h = f.index.search(f).result;
      } else if (f.or) {
        h = this.or(f.or);
      } else if (f.and) {
        h = this.and(f.and);
      } else if (f.xor) {
        h = this.xor(f.xor);
      } else {
        e = f.resolve;
        continue;
      }
      d[g] = h;
      h.then && c.push(h);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result = gb.call(a, d, e);
      return e ? a.result : a;
    });
  }
  this.result = gb.call(this, d, e);
  return e ? this.result : this;
};
function gb(a, b) {
  if (!a.length) {
    return this.result;
  }
  var c = [];
  a = new Set(a.flat().flat());
  for (var d = 0, e; d < this.result.length; d++) {
    if (e = this.result[d]) {
      for (var g = 0, f; g < e.length; g++) {
        f = e[g], a.has(f) || (b ? c.push(f) : (c[d] || (c[d] = []), c[d].push(f)));
      }
    }
  }
  return c;
}
;function X(a) {
  if (!this) {
    return new X(a);
  }
  if (a && a.index) {
    return a.resolve = !1, this.index = a.index, a.index.search(a);
  }
  if (a.constructor === X) {
    return a;
  }
  this.index = null;
  this.result = a || [];
  this.M = 0;
}
X.prototype.limit = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d = 0, e; d < this.result.length; d++) {
      if (e = this.result[d], e.length + c < a) {
        b[d] = e, c += e.length;
      } else {
        b[d] = e.slice(0, a - c);
        this.result = b;
        break;
      }
    }
  }
  return this;
};
X.prototype.offset = function(a) {
  if (this.result.length) {
    for (var b = [], c = 0, d = 0, e; d < this.result.length; d++) {
      e = this.result[d], e.length + c < a ? c += e.length : (b[d] = e.slice(a - c), c = a);
    }
    this.result = b;
  }
  return this;
};
X.prototype.boost = function(a) {
  this.M += a;
  return this;
};
X.prototype.resolve = function(a, b, c) {
  hb = 1;
  var d = this.result;
  this.result = this.index = null;
  return d.length ? ("object" === typeof a && (c = a.enrich, b = a.offset, a = a.limit), W(d, a || 100, b, c)) : d;
};
function ib(a, b, c, d, e) {
  var g = a.length, f = [], h;
  var k = K();
  for (var l = 0, m = void 0, n; l < b; l++) {
    for (var p = 0; p < g; p++) {
      if (n = a[p], l < n.length && (m = n[l])) {
        for (var q = 0; q < m.length; q++) {
          n = m[q], (h = k[n]) ? k[n]++ : (h = 0, k[n] = 1), h = f[h] || (f[h] = []), h.push(n);
        }
      }
    }
  }
  if (a = f.length) {
    if (e) {
      e = [];
      g = a - 1;
      for (a = 0; 0 <= g; g--) {
        if (b = f[g], k = b.length, d >= k) {
          d -= k;
        } else {
          if (k + a > c || d) {
            b = b.slice(d, c - a + d), k = b.length;
          }
          e.push(b);
          a += k;
          if (c === a) {
            break;
          }
        }
      }
      if (1 < e.length) {
        f = [];
        g = K();
        k = e.length;
        for (m = 0; m < k; m++) {
          for (a = e[m], l = a.length, p = 0; p < l; p++) {
            if (b = a[p], !g[b]) {
              if (g[b] = 1, d) {
                d--;
              } else {
                if (f.push(b), f.length === c) {
                  break;
                }
              }
            }
          }
        }
        c = f;
      } else {
        c = e[0];
      }
      f = c;
    } else {
      if (a < g) {
        return [];
      }
      f = f[a - 1];
      if (f.length > c || d) {
        f = f.slice(d, c + d);
      }
    }
  }
  return f;
}
function jb(a, b) {
  for (var c = K(), d = K(), e = [], g = 0; g < a.length; g++) {
    c[a[g]] = 1;
  }
  for (a = 0; a < b.length; a++) {
    g = b[a];
    for (var f = 0, h; f < g.length; f++) {
      h = g[f], c[h] && !d[h] && (d[h] = 1, e.push(h));
    }
  }
  return e;
}
;var hb = 1;
V.prototype.search = function(a, b, c) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var d = [], e = 0, g;
  if (c) {
    a = c.query || a;
    b = c.limit || b;
    e = c.offset || 0;
    var f = c.context;
    var h = c.suggest;
    (g = hb && !1 !== c.resolve) || (hb = 0);
    var k = g && c.enrich;
    var l = this.db && c.tag;
  } else {
    g = this.resolve || hb;
  }
  a = this.encoder.encode(a);
  var m = a.length;
  b || !g || (b = 100);
  if (1 === m) {
    return kb.call(this, a[0], "", b, e, g, k, l);
  }
  f = this.depth && !1 !== f;
  if (2 === m && f && !h) {
    return kb.call(this, a[0], a[1], b, e, g, k, l);
  }
  var n = c = 0;
  if (1 < m) {
    for (var p = K(), q = [], r = 0, y = void 0; r < m; r++) {
      if ((y = a[r]) && !p[y]) {
        if (h || this.db || Y(this, y)) {
          q.push(y), p[y] = 1;
        } else {
          return g ? d : new X(d);
        }
        y = y.length;
        c = Math.max(c, y);
        n = n ? Math.min(n, y) : y;
      }
    }
    a = q;
    m = a.length;
  }
  if (!m) {
    return g ? d : new X(d);
  }
  var u = 0;
  if (1 === m) {
    return kb.call(this, a[0], "", b, e, g, k, l);
  }
  if (2 === m && f && !h) {
    return kb.call(this, a[0], a[1], b, e, g, k, l);
  }
  if (1 < m) {
    if (f) {
      var t = a[0];
      u = 1;
    } else {
      9 < c && 3 < c / n && a.sort(wa);
    }
  }
  if (this.db) {
    if (this.db.search && (f = this.db.search(this, a, b, e, h, g, k, l), !1 !== f)) {
      return f;
    }
    var v = this;
    return function() {
      var A, D, C;
      return sa(function(E) {
        switch(E.h) {
          case 1:
            D = A = void 0;
          case 2:
            if (!(u < m)) {
              E.h = 4;
              break;
            }
            D = a[u];
            return t ? F(E, Y(v, D, t), 8) : F(E, Y(v, D), 7);
          case 7:
            A = E.G;
            A = lb(A, d, h, v.resolution, b, e, 1 === m);
            E.h = 6;
            break;
          case 8:
            A = E.G, A = lb(A, d, h, v.da, b, e, 2 === m), h && !1 === A && d.length || (t = D);
          case 6:
            if (A) {
              return E.return(A);
            }
            if (h && u === m - 1) {
              C = d.length;
              if (!C) {
                if (t) {
                  t = "";
                  u = -1;
                  E.h = 3;
                  break;
                }
                return E.return(d);
              }
              if (1 === C) {
                return E.return(g ? W(d[0], b, e) : new X(d[0]));
              }
            }
          case 3:
            u++;
            E.h = 2;
            break;
          case 4:
            return E.return(g ? ib(d, v.resolution, b, e, h) : new X(d[0]));
        }
      });
    }();
  }
  for (k = f = void 0; u < m; u++) {
    k = a[u];
    t ? (f = Y(this, k, t), f = lb(f, d, h, this.da, b, e, 2 === m), h && !1 === f && d.length || (t = k)) : (f = Y(this, k), f = lb(f, d, h, this.resolution, b, e, 1 === m));
    if (f) {
      return f;
    }
    if (h && u === m - 1) {
      f = d.length;
      if (!f) {
        if (t) {
          t = "";
          u = -1;
          continue;
        }
        return d;
      }
      if (1 === f) {
        return g ? W(d[0], b, e) : new X(d[0]);
      }
    }
  }
  d = ib(d, this.resolution, b, e, h);
  return g ? d : new X(d);
};
function kb(a, b, c, d, e, g, f) {
  a = Y(this, a, b, c, d, e, g, f);
  return this.db ? a.then(function(h) {
    return e ? h : h && h.length ? e ? W(h, c, d) : new X(h) : e ? [] : new X([]);
  }) : a && a.length ? e ? W(a, c, d) : new X(a) : e ? [] : new X([]);
}
function lb(a, b, c, d, e, g, f) {
  var h = [];
  if (a) {
    d = Math.min(a.length, d);
    for (var k = 0, l = 0, m; k < d; k++) {
      if (m = a[k]) {
        if (g && m && f && (m.length <= g ? (g -= m.length, m = null) : (m = m.slice(g), g = 0)), m && (h[k] = m, f && (l += m.length, l >= e))) {
          break;
        }
      }
    }
    if (h.length) {
      if (f) {
        return W(h, e, 0);
      }
      b.push(h);
      return;
    }
  }
  return !c && h;
}
function Y(a, b, c, d, e, g, f, h) {
  var k;
  c && (k = a.bidirectional && b > c);
  if (a.db) {
    return c ? a.db.get(k ? c : b, k ? b : c, d, e, g, f, h) : a.db.get(b, "", d, e, g, f, h);
  }
  a = c ? (a = a.J.get(k ? b : c)) && a.get(k ? c : b) : a.map.get(b);
  return a;
}
;V.prototype.remove = function(a, b) {
  var c = this.B.size && (this.fastupdate ? this.B.get(a) : this.B.has(a));
  if (c) {
    if (this.fastupdate) {
      for (var d = 0, e; d < c.length; d++) {
        if (e = c[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            var g = e.indexOf(a);
            g === c.length - 1 ? e.pop() : e.splice(g, 1);
          }
        }
      }
    } else {
      mb(this.map, a), this.depth && mb(this.J, a);
    }
    b || this.B.delete(a);
  }
  this.db && (this.R.push({del:a}), this.ga && bb(this));
  this.cache && this.cache.remove(a);
  return this;
};
function mb(a, b) {
  var c = 0;
  if (a.constructor === Array) {
    for (var d = 0, e = void 0, g; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (g = e.indexOf(b), 0 <= g) {
          1 < e.length ? (e.splice(g, 1), c++) : delete a[d];
          break;
        } else {
          c++;
        }
      }
    }
  } else {
    for (d = x(a), e = d.next(); !e.done; e = d.next()) {
      g = e.value, e = g[0], (g = mb(g[1], b)) ? c += g : a.delete(e);
    }
  }
  return c;
}
;function V(a, b) {
  if (!this) {
    return new V(a);
  }
  if (a) {
    var c = L(a) ? a : a.preset;
    c && (Ya[c] || console.warn("Preset not found: " + c), a = Object.assign({}, Ya[c], a));
  } else {
    a = {};
  }
  c = a.context || {};
  var d = a.encode || a.encoder || Ia;
  this.encoder = d.encode ? d : "object" === typeof d ? new N(d) : {encode:d};
  var e;
  this.resolution = a.resolution || 9;
  this.tokenize = e = a.tokenize || "strict";
  this.depth = "strict" === e && c.depth || 0;
  this.bidirectional = !1 !== c.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  (e = a.keystore || 0) && (this.keystore = e);
  this.map = e ? new S(e) : new Map();
  this.J = e ? new S(e) : new Map();
  this.B = b || (this.fastupdate ? e ? new S(e) : new Map() : e ? new T(e) : new Set());
  this.da = c.resolution || 1;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (e = a.cache || null) && new Q(e);
  this.resolve = !1 !== a.resolve;
  if (e = a.db) {
    this.db = e.mount(this);
  }
  this.ga = !1 !== a.commit;
  this.R = [];
  this.h = null;
}
w = V.prototype;
w.mount = function(a) {
  this.h && (clearTimeout(this.h), this.h = null);
  return a.mount(this);
};
w.commit = function(a, b) {
  this.h && (clearTimeout(this.h), this.h = null);
  return this.db.commit(this, a, b);
};
function bb(a) {
  a.h || (a.h = setTimeout(function() {
    a.h = null;
    a.db.commit(a, void 0, void 0);
  }, 0));
}
w.clear = function() {
  this.map.clear();
  this.J.clear();
  this.B.clear();
  this.cache && this.cache.clear();
  this.db && (this.h && clearTimeout(this.h), this.h = null, this.R = [{clear:!0}]);
  return this;
};
w.append = function(a, b) {
  return this.add(a, b, !0);
};
w.contain = function(a) {
  return this.db ? this.db.has(a) : this.B.has(a);
};
w.update = function(a, b) {
  if (this.async) {
    var c = this, d = this.remove(a);
    return d.then ? d.then(function() {
      return c.add(a, b);
    }) : this.add(a, b);
  }
  return this.remove(a).add(a, b);
};
function nb(a) {
  var b = 0;
  if (a.constructor === Array) {
    for (var c = 0, d = void 0; c < a.length; c++) {
      (d = a[c]) && (b += d.length);
    }
  } else {
    for (c = x(a), d = c.next(); !d.done; d = c.next()) {
      var e = d.value;
      d = e[0];
      (e = nb(e[1])) ? b += e : a.delete(d);
    }
  }
  return b;
}
w.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  nb(this.map);
  this.depth && nb(this.J);
  return this;
};
w.searchCache = Ha;
w.export = function(a, b, c, d, e, g) {
  var f = !0;
  "undefined" === typeof g && (f = new Promise(function(n) {
    g = n;
  }));
  switch(e || (e = 0)) {
    case 0:
      var h = "reg";
      if (this.fastupdate) {
        var k = K();
        for (var l = x(this.B.keys()), m = l.next(); !m.done; m = l.next()) {
          k[m.value] = 1;
        }
      } else {
        k = this.B;
      }
      break;
    case 1:
      h = "cfg";
      k = {doc:0, opt:this.A ? 1 : 0};
      break;
    case 2:
      h = "map";
      k = this.map;
      break;
    case 3:
      h = "ctx";
      k = this.J;
      break;
    default:
      "undefined" === typeof c && g && g();
      return;
  }
  Xa(a, b || this, c, h, d, e, k, g);
  return f;
};
w.import = function(a, b) {
  if (b) {
    switch(L(b) && (b = JSON.parse(b)), a) {
      case "cfg":
        this.A = !!b.opt;
        break;
      case "reg":
        this.fastupdate = !1;
        this.B = b;
        break;
      case "map":
        this.map = b;
        break;
      case "ctx":
        this.J = b;
    }
  }
};
Za(V.prototype);
function ob(a) {
  var b, c, d, e, g, f, h, k;
  return sa(function(l) {
    a = a.data;
    b = self._index;
    c = a.args;
    d = a.task;
    switch(d) {
      case "init":
        e = a.options || {};
        (g = e.config) && (e = g);
        (f = a.factory) ? (Function("return " + f)()(self), self._index = new self.FlexSearch.Index(e), delete self.FlexSearch) : self._index = new V(e);
        postMessage({id:a.id});
        break;
      default:
        h = a.id, k = b[d].apply(b, c), postMessage("search" === d ? {id:h, msg:k} : {id:h});
    }
    l.h = 0;
  });
}
;var pb = 0;
function qb(a) {
  function b(g) {
    g = g.data || g;
    var f = g.id, h = f && e.h[f];
    h && (h(g.msg), delete e.h[f]);
  }
  if (!this) {
    return new qb(a);
  }
  a || (a = {});
  var c = (self || window)._factory;
  c && (c = c.toString());
  var d = "undefined" === typeof window && self.exports, e = this;
  this.worker = rb(c, d, a.worker);
  this.h = K();
  if (this.worker) {
    d ? this.worker.on("message", b) : this.worker.onmessage = b;
    if (a.config) {
      return new Promise(function(g) {
        e.h[++pb] = function() {
          g(e);
        };
        e.worker.postMessage({id:pb, task:"init", factory:c, options:a});
      });
    }
    this.worker.postMessage({task:"init", factory:c, options:a});
  }
}
sb("add");
sb("append");
sb("search");
sb("update");
sb("remove");
function sb(a) {
  qb.prototype[a] = qb.prototype[a + "Async"] = function() {
    var b = this, c = [].slice.call(arguments), d = c[c.length - 1];
    if ("function" === typeof d) {
      var e = d;
      c.splice(c.length - 1, 1);
    }
    d = new Promise(function(g) {
      b.h[++pb] = g;
      b.worker.postMessage({task:a, id:pb, args:c});
    });
    return e ? (d.then(e), this) : d;
  };
}
function rb(a, b, c) {
  return b ? new (require("worker_threads")["Worker"])(__dirname + "/node/node.js") : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + ob.toString()], {type:"text/javascript"}))) : new window.Worker(L(c) ? c : "worker/worker.js", {type:"module"});
}
;Z.prototype.add = function(a, b, c) {
  M(a) && (b = a, a = ya(b, this.key));
  if (b && (a || 0 === a)) {
    if (!c && this.B.has(a)) {
      return this.update(a, b);
    }
    for (var d = 0, e; d < this.field.length; d++) {
      e = this.O[d];
      var g = this.index.get(this.field[d]);
      if ("function" === typeof e) {
        (e = e(b)) && g.add(a, e, !1, !0);
      } else {
        var f = e.U;
        if (!f || f(b)) {
          e.constructor === String ? e = ["" + e] : L(e) && (e = [e]), tb(b, e, this.W, 0, g, a, e[0], c);
        }
      }
    }
    if (this.tag) {
      for (d = 0; d < this.N.length; d++) {
        f = this.N[d];
        var h = this.ca[d];
        g = this.tag.get(h);
        e = K();
        if ("function" === typeof f) {
          if (f = f(b), !f) {
            continue;
          }
        } else {
          var k = f.U;
          if (k && !k(b)) {
            continue;
          }
          f.constructor === String && (f = "" + f);
          f = ya(b, f);
        }
        if (g && f) {
          for (L(f) && (f = [f]), h = 0, k = void 0; h < f.length; h++) {
            var l = f[h];
            if (!e[l]) {
              e[l] = 1;
              var m;
              (m = g.get(l)) ? k = m : g.set(l, k = []);
              if (!c || !k.includes(a)) {
                if (k.length === Math.pow(2, 31) - 1) {
                  m = new R(k);
                  if (this.fastupdate) {
                    for (var n = x(this.B.values()), p = n.next(); !p.done; p = n.next()) {
                      p = p.value, p.includes(k) && (p[p.indexOf(k)] = m);
                    }
                  }
                  g.set(l, k = m);
                }
                k.push(a);
                this.fastupdate && ((l = this.B.get(a)) ? l.push(k) : this.B.set(a, [k]));
              }
            }
          }
        } else {
          g || console.warn("Tag '" + h + "' was not found");
        }
      }
    }
    if (this.store && (!c || !this.store.has(a))) {
      if (this.I) {
        var q = K();
        for (c = 0; c < this.I.length; c++) {
          if (d = this.I[c], g = d.U, !g || g(b)) {
            g = void 0;
            if ("function" === typeof d) {
              g = d(b);
              if (!g) {
                continue;
              }
              d = [d.oa];
            } else if (L(d) || d.constructor === String) {
              q[d] = b[d];
              continue;
            }
            ub(b, q, d, 0, d[0], g);
          }
        }
      }
      this.store.set(a, q || b);
    }
  }
  return this;
};
function ub(a, b, c, d, e, g) {
  a = a[e];
  if (d === c.length - 1) {
    b[e] = g || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) {
        ub(a, b, c, d, e);
      }
    } else {
      b = b[e] || (b[e] = K()), e = c[++d], ub(a, b, c, d, e);
    }
  }
}
function tb(a, b, c, d, e, g, f, h) {
  if (a = a[f]) {
    if (d === b.length - 1) {
      if (a.constructor === Array) {
        if (c[d]) {
          for (b = 0; b < a.length; b++) {
            e.add(g, a[b], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      e.add(g, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (f = 0; f < a.length; f++) {
          tb(a, b, c, d, e, g, f, h);
        }
      } else {
        f = b[++d], tb(a, b, c, d, e, g, f, h);
      }
    }
  } else {
    e.db && e.remove(g);
  }
}
;Z.prototype.search = function(a, b, c, d) {
  c || (!b && M(a) ? (c = a, a = "") : M(b) && (c = b, b = 0));
  var e = [], g = [], f = 0;
  if (c) {
    c.constructor === Array && (c = {index:c});
    a = c.query || a;
    var h = c.pluck;
    var k = c.merge;
    var l = h || c.field || c.index;
    var m = this.tag && c.tag;
    var n = this.store && c.enrich;
    var p = c.suggest;
    b = c.limit || b;
    var q = c.offset || 0;
    b || (b = 100);
    if (m && (!this.db || !d)) {
      m.constructor !== Array && (m = [m]);
      for (var r = [], y = 0, u = void 0; y < m.length; y++) {
        u = m[y];
        if (L(u)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (u.field && u.tag) {
          var t = u.tag;
          if (t.constructor === Array) {
            for (var v = 0; v < t.length; v++) {
              r.push(u.field, t[v]);
            }
          } else {
            r.push(u.field, t);
          }
        } else {
          t = Object.keys(u);
          v = 0;
          for (var A = void 0, D = void 0; v < t.length; v++) {
            if (A = t[v], D = u[A], D.constructor === Array) {
              for (var C = 0; C < D.length; C++) {
                r.push(A, D[C]);
              }
            } else {
              r.push(A, D);
            }
          }
        }
      }
      if (!r.length) {
        throw Error("Your tag definition within the search options is probably wrong. No valid tags found.");
      }
      m = r;
      if (!a) {
        g = [];
        if (r.length) {
          for (h = 0; h < r.length; h += 2) {
            p = void 0;
            if (this.db) {
              p = this.index.get(r[h]);
              if (!p) {
                console.warn("Tag '" + r[h] + ":" + r[h + 1] + "' will be skipped because there is no field '" + r[h] + "'.");
                continue;
              }
              g.push(p = p.db.tag(r[h + 1], b, q, n));
            } else {
              p = vb.call(this, r[h], r[h + 1], b, q, n);
            }
            e.push({field:r[h], tag:r[h + 1], result:p});
          }
        }
        return g.length ? Promise.all(g).then(function(O) {
          for (var P = 0; P < O.length; P++) {
            e[P].result = O[P];
          }
          return e;
        }) : e;
      }
    }
    L(l) && (l = [l]);
  }
  l || (l = this.field);
  r = !d && (this.worker || this.async) && [];
  y = 0;
  for (v = u = t = void 0; y < l.length; y++) {
    if (u = l[y], !this.db || !this.tag || this.O[y]) {
      t = void 0;
      L(u) || (t = u, u = t.field, a = t.query || a, b = t.limit || b, p = t.suggest || p);
      if (d) {
        t = d[y];
      } else {
        v = t || c;
        t = this.index.get(u);
        if (m) {
          if (this.db) {
            v.tag = m;
            var E = t.db.sa;
            v.field = l;
          }
          E || (v.enrich = !1);
        }
        if (r) {
          r[y] = t.searchAsync(a, b, v);
          v && n && (v.enrich = n);
          continue;
        } else {
          t = t.search(a, b, v), v && n && (v.enrich = n);
        }
      }
      v = t && t.length;
      if (m && v) {
        A = [];
        D = 0;
        if (this.db && d) {
          if (!E) {
            for (C = l.length; C < d.length; C++) {
              var J = d[C];
              if (J && J.length) {
                D++, A.push(J);
              } else if (!p) {
                return e;
              }
            }
          }
        } else {
          C = 0;
          for (var Gb = J = void 0; C < m.length; C += 2) {
            J = this.tag.get(m[C]);
            if (!J) {
              if (console.warn("Tag '" + m[C] + ":" + m[C + 1] + "' will be skipped because there is no field '" + m[C] + "'."), p) {
                continue;
              } else {
                return e;
              }
            }
            if (Gb = (J = J && J.get(m[C + 1])) && J.length) {
              D++, A.push(J);
            } else if (!p) {
              return e;
            }
          }
        }
        if (D) {
          t = jb(t, A);
          v = t.length;
          if (!v && !p) {
            return e;
          }
          D--;
        }
      }
      if (v) {
        g[f] = u, e.push(t), f++;
      } else if (1 === l.length) {
        return e;
      }
    }
  }
  if (r) {
    if (this.db && m && m.length && !E) {
      for (n = 0; n < m.length; n += 2) {
        g = this.index.get(m[n]);
        if (!g) {
          if (console.warn("Tag '" + m[n] + ":" + m[n + 1] + "' was not found because there is no field '" + m[n] + "'."), p) {
            continue;
          } else {
            return e;
          }
        }
        r.push(g.db.tag(m[n + 1], b, q, !1));
      }
    }
    var Hb = this;
    return Promise.all(r).then(function(O) {
      return O.length ? Hb.search(a, b, c, O) : O;
    });
  }
  if (!f) {
    return e;
  }
  if (h && (!n || !this.store)) {
    return e[0];
  }
  r = [];
  q = 0;
  for (p = void 0; q < g.length; q++) {
    p = e[q];
    n && p.length && !p[0].doc && (this.db ? r.push(p = this.index.get(this.field[0]).db.enrich(p)) : p.length && (p = wb.call(this, p)));
    if (h) {
      return p;
    }
    e[q] = {field:g[q], result:p};
  }
  return n && this.db && r.length ? Promise.all(r).then(function(O) {
    for (var P = 0; P < O.length; P++) {
      e[P].result = O[P];
    }
    return k ? xb(e, b) : e;
  }) : k ? xb(e, b) : e;
};
function xb(a, b) {
  for (var c = [], d = K(), e = 0, g, f; e < a.length; e++) {
    g = a[e];
    f = g.result;
    for (var h = 0, k, l, m; h < f.length; h++) {
      if (l = f[h], k = l.id, m = d[k]) {
        m.push(g.field);
      } else {
        if (c.length === b) {
          return c;
        }
        l.field = d[k] = [g.field];
        c.push(l);
      }
    }
  }
  return c;
}
function vb(a, b, c, d, e) {
  var g = this.tag.get(a);
  if (!g) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (g = g && g.get(b)) && g.length - d) && 0 < a) {
    if (a > c || d) {
      g = g.slice(d, d + c);
    }
    e && (g = wb.call(this, g));
    return g;
  }
}
function wb(a) {
  for (var b = Array(a.length), c = 0, d; c < a.length; c++) {
    d = a[c], b[c] = {id:d, doc:this.store.get(d)};
  }
  return b;
}
;function Z(a) {
  if (!this) {
    return new Z(a);
  }
  var b = a.document || a.doc || a, c, d;
  this.O = [];
  this.field = [];
  this.W = [];
  this.key = (c = b.key || b.id) && yb(c, this.W) || "id";
  (d = a.keystore || 0) && (this.keystore = d);
  this.B = (this.fastupdate = !!a.fastupdate) ? d ? new S(d) : new Map() : d ? new T(d) : new Set();
  this.I = (c = b.store || null) && !0 !== c && [];
  this.store = c && (d ? new S(d) : new Map());
  this.cache = (c = a.cache || null) && new Q(c);
  a.cache = !1;
  this.worker = a.worker;
  this.async = !1;
  c = new Map();
  d = b.index || b.field || b;
  L(d) && (d = [d]);
  for (var e = 0, g, f = void 0; e < d.length; e++) {
    g = d[e];
    L(g) || (f = g, g = g.field);
    f = M(f) ? Object.assign({}, a, f) : a;
    if (this.worker) {
      var h = new qb(f);
      c.set(g, h);
      h.worker || (this.worker = !1);
    }
    this.worker || c.set(g, new V(f, this.B));
    f.custom ? this.O[e] = f.custom : (this.O[e] = yb(g, this.W), f.filter && ("string" === typeof this.O[e] && (this.O[e] = new String(this.O[e])), this.O[e].U = f.filter));
    this.field[e] = g;
  }
  if (this.I) {
    for (d = b.store, L(d) && (d = [d]), e = 0; e < d.length; e++) {
      g = d[e], f = g.field || g, g.custom ? (this.I[e] = g.custom, g.custom.oa = f) : (this.I[e] = yb(f, this.W), g.filter && ("string" === typeof this.I[e] && (this.I[e] = new String(this.I[e])), this.I[e].U = g.filter));
    }
  }
  this.index = c;
  this.tag = null;
  if (c = b.tag) {
    if ("string" === typeof c && (c = [c]), c.length) {
      for (this.tag = new Map(), this.N = [], this.ca = [], b = 0; b < c.length; b++) {
        d = c[b];
        e = d.field || d;
        if (!e) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        d.custom ? this.N[b] = d.custom : (this.N[b] = yb(e, this.W), d.filter && ("string" === typeof this.N[b] && (this.N[b] = new String(this.N[b])), this.N[b].U = d.filter));
        this.ca[b] = e;
        this.tag.set(e, new Map());
      }
    }
  }
  a.db && this.mount(a.db);
}
w = Z.prototype;
w.mount = function(a) {
  var b = this.field;
  if (this.tag) {
    for (var c = 0, d; c < this.ca.length; c++) {
      d = this.ca[c];
      var e = this.index.get(d);
      e || (this.index.set(d, e = new V({}, this.B)), b === this.field && (b = b.slice(0)), b.push(d));
      e.tag = this.tag.get(d);
    }
  }
  c = [];
  d = {db:a.db, type:a.type, fastupdate:a.fastupdate};
  e = 0;
  for (var g; e < b.length; e++) {
    d.field = g = b[e];
    g = this.index.get(g);
    var f = new a.constructor(a.id, d);
    f.id = a.id;
    c[e] = f.mount(g);
    g.document = !0;
    e ? g.pa = !0 : g.store = this.store;
  }
  this.db = this.async = !0;
  return Promise.all(c);
};
w.commit = function(a, b) {
  var c = this, d, e, g, f;
  return sa(function(h) {
    if (1 == h.h) {
      d = [];
      e = x(c.index.values());
      for (g = e.next(); !g.done; g = e.next()) {
        f = g.value, d.push(f.db.commit(f, a, b));
      }
      return F(h, Promise.all(d), 2);
    }
    c.B.clear();
    h.h = 0;
  });
};
function yb(a, b) {
  for (var c = a.split(":"), d = 0, e = 0; e < c.length; e++) {
    a = c[e], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
  }
  d < c.length && (c.length = d);
  return 1 < d ? c : c[0];
}
w.append = function(a, b) {
  return this.add(a, b, !0);
};
w.update = function(a, b) {
  return this.remove(a).add(a, b);
};
w.remove = function(a) {
  M(a) && (a = ya(a, this.key));
  for (var b = x(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    c.value.remove(a, !0);
  }
  if (this.B.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (b = x(this.tag.values()), c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = x(c), e = d.next(); !e.done; e = d.next()) {
          var g = e.value;
          e = g[0];
          g = g[1];
          var f = g.indexOf(a);
          -1 < f && (1 < g.length ? g.splice(f, 1) : c.delete(e));
        }
      }
    }
    this.store && this.store.delete(a);
    this.B.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
w.clear = function() {
  for (var a = x(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.clear();
  }
  if (this.tag) {
    for (a = x(this.tag.values()), b = a.next(); !b.done; b = a.next()) {
      b.value.clear();
    }
  }
  this.store && this.store.clear();
  return this;
};
w.contain = function(a) {
  return this.db ? this.index.get(this.field[0]).db.has(a) : this.B.has(a);
};
w.cleanup = function() {
  for (var a = x(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.cleanup();
  }
  return this;
};
w.get = function(a) {
  return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(b) {
    return b[0] && b[0].doc;
  }) : this.store.get(a);
};
w.set = function(a, b) {
  this.store.set(a, b);
  return this;
};
w.searchCache = Ha;
w.export = function(a, b, c, d, e, g) {
  var f;
  "undefined" === typeof g && (f = new Promise(function(k) {
    g = k;
  }));
  e || (e = 0);
  d || (d = 0);
  if (d < this.field.length) {
    c = this.field[d];
    var h = this.index[c];
    b = this;
    h.export(a, b, e ? c : "", d, e++, g) || (d++, b.export(a, b, c, d, 1, g));
  } else {
    switch(e) {
      case 1:
        b = "tag";
        h = this.h;
        c = null;
        break;
      case 2:
        b = "store";
        h = this.store;
        c = null;
        break;
      default:
        g();
        return;
    }
    Xa(a, this, c, b, d, e, h, g);
  }
  return f;
};
w.import = function(a, b) {
  if (b) {
    switch(L(b) && (b = JSON.parse(b)), a) {
      case "tag":
        this.h = b;
        break;
      case "reg":
        this.fastupdate = !1;
        this.B = b;
        a = 0;
        for (var c; a < this.field.length; a++) {
          c = this.index[this.field[a]], c.B = b, c.fastupdate = !1;
        }
        break;
      case "store":
        this.store = b;
        break;
      default:
        a = a.split("."), c = a[0], a = a[1], c && a && this.index[c].import(a, b);
    }
  }
};
Za(Z.prototype);
var zb = "undefined" !== typeof window && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), Ab = ["map", "ctx", "tag", "reg", "cfg"];
function Bb(a, b) {
  b = void 0 === b ? {} : b;
  if (!this) {
    return new Bb(a, b);
  }
  "object" === typeof a && (b = a = a.name);
  a || console.info("Default storage space was used, because a name was not passed.");
  this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
  this.field = b.field ? b.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
  this.sa = !1;
  this.db = null;
  this.h = {};
}
w = Bb.prototype;
w.mount = function(a) {
  if (a.constructor === Z) {
    return a.mount(this);
  }
  a.db = this;
  return Cb(this);
};
function Cb(a) {
  navigator.storage && navigator.storage.persist();
  return a.db || new Promise(function(b, c) {
    var d = zb.open(a.id + (a.field ? ":" + a.field : ""), 1);
    d.onupgradeneeded = function() {
      var e = a.db = this.result;
      Ab.forEach(function(g) {
        e.objectStoreNames.contains(g) || e.createObjectStore(g);
      });
    };
    d.onblocked = function(e) {
      console.error("blocked", e);
      c();
    };
    d.onerror = function(e) {
      console.error(this.error, e);
      c();
    };
    d.onsuccess = function() {
      a.db = this.result;
      a.db.onversionchange = function() {
        a.close();
      };
      b(a);
    };
  });
}
w.close = function() {
  this.db.close();
  this.db = null;
};
w.clear = function() {
  for (var a = this.db.transaction(Ab, "readwrite"), b = 0; b < Ab.length; b++) {
    a.objectStore(Ab[b]).clear();
  }
  return Db(a);
};
w.get = function(a, b, c, d, e, g) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  e = void 0 === e ? !0 : e;
  g = void 0 === g ? !1 : g;
  a = this.db.transaction(b ? "ctx" : "map", "readonly").objectStore(b ? "ctx" : "map").get(b ? b + ":" + a : a);
  var f = this;
  return Db(a).then(function(h) {
    var k = [];
    if (!h || !h.length) {
      return k;
    }
    if (e) {
      if (!c && !d && 1 === h.length) {
        return h[0];
      }
      for (var l = 0, m = void 0; l < h.length; l++) {
        if ((m = h[l]) && m.length) {
          if (d >= m.length) {
            d -= m.length;
          } else {
            for (var n = c ? d + Math.min(m.length - d, c) : m.length, p = d; p < n; p++) {
              k.push(m[p]);
            }
            d = 0;
            if (k.length === c) {
              break;
            }
          }
        }
      }
      return g ? f.enrich(k) : k;
    }
    return h;
  });
};
w.tag = function(a, b, c, d) {
  b = void 0 === b ? 0 : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? !1 : d;
  a = this.db.transaction("tag", "readonly").objectStore("tag").get(a);
  var e = this;
  return Db(a).then(function(g) {
    if (!g || !g.length || c >= g.length) {
      return [];
    }
    if (!b && !c) {
      return g;
    }
    g = g.slice(c, c + b);
    return d ? e.enrich(g) : g;
  });
};
w.enrich = function(a) {
  "object" !== typeof a && (a = [a]);
  for (var b = this.db.transaction("reg", "readonly").objectStore("reg"), c = [], d = 0; d < a.length; d++) {
    c[d] = Db(b.get(a[d]));
  }
  return Promise.all(c).then(function(e) {
    for (var g = 0; g < e.length; g++) {
      e[g] = {id:a[g], doc:e[g] ? JSON.parse(e[g]) : null};
    }
    return e;
  });
};
w.has = function(a) {
  a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
  return Db(a);
};
w.search = null;
w.info = function() {
};
w.transaction = function(a, b, c) {
  var d = this, e = this.h[a + ":" + b];
  if (e) {
    return c.call(this, e);
  }
  var g = this.db.transaction(a, b);
  this.h[a + ":" + b] = e = g.objectStore(a);
  return new Promise(function(f, h) {
    g.onerror = function(k) {
      d.h[a + ":" + b] = null;
      g.abort();
      g = e = null;
      h(k);
    };
    g.oncomplete = function(k) {
      g = e = d.h[a + ":" + b] = null;
      f(k || !0);
    };
    return c.call(d, e);
  });
};
w.commit = function(a, b, c) {
  var d = this, e, g, f;
  return sa(function(h) {
    switch(h.h) {
      case 1:
        if (b) {
          return F(h, d.clear(), 12);
        }
        e = a.R;
        a.R = [];
        g = 0;
        f = void 0;
      case 4:
        if (!(g < e.length)) {
          h.h = 6;
          break;
        }
        f = e[g];
        if (!f.clear) {
          e[g] = f.ta;
          h.h = 5;
          break;
        }
        return F(h, d.clear(), 8);
      case 8:
        b = !0;
        h.h = 6;
        break;
      case 5:
        g++;
        h.h = 4;
        break;
      case 6:
        if (b) {
          h.h = 3;
          break;
        }
        c || (e = e.concat(xa(a.B)));
        if (!e.length) {
          h.h = 10;
          break;
        }
        return F(h, d.remove(e), 11);
      case 11:
      case 10:
        h.h = 3;
        break;
      case 12:
        a.R = [];
      case 3:
        return a.B.size ? F(h, d.transaction("map", "readwrite", function(k) {
          for (var l = x(a.map), m = l.next(), n = {}; !m.done; n = {S:void 0, aa:void 0}, m = l.next()) {
            m = m.value, n.aa = m[0], n.S = m[1], n.S.length && (b ? k.put(n.S, n.aa) : k.get(n.aa).onsuccess = function(p) {
              return function() {
                var q = this.result, r;
                if (q && q.length) {
                  for (var y = Math.max(q.length, p.S.length), u = 0, t; u < y; u++) {
                    if ((t = p.S[u]) && t.length) {
                      if ((r = q[u]) && r.length) {
                        for (var v = 0; v < t.length; v++) {
                          r.push(t[v]);
                        }
                      } else {
                        q[u] = t;
                      }
                      r = 1;
                    }
                  }
                } else {
                  q = p.S, r = 1;
                }
                r && k.put(q, p.aa);
              };
            }(n));
          }
        }), 13) : h.return();
      case 13:
        return F(h, d.transaction("ctx", "readwrite", function(k) {
          for (var l = x(a.J), m = l.next(), n = {}; !m.done; n = {Z:void 0}, m = l.next()) {
            m = m.value;
            n.Z = m[0];
            m = x(m[1]);
            for (var p = m.next(), q = {}; !p.done; q = {T:void 0, ba:void 0}, p = m.next()) {
              p = p.value, q.ba = p[0], q.T = p[1], q.T.length && (b ? k.put(q.T, n.Z + ":" + q.ba) : k.get(n.Z + ":" + q.ba).onsuccess = function(r, y) {
                return function() {
                  var u = this.result, t;
                  if (u && u.length) {
                    for (var v = Math.max(u.length, r.T.length), A = 0, D; A < v; A++) {
                      if ((D = r.T[A]) && D.length) {
                        if ((t = u[A]) && t.length) {
                          for (var C = 0; C < D.length; C++) {
                            t.push(D[C]);
                          }
                        } else {
                          u[A] = D;
                        }
                        t = 1;
                      }
                    }
                  } else {
                    u = r.T, t = 1;
                  }
                  t && k.put(u, y.Z + ":" + r.ba);
                };
              }(q, n));
            }
          }
        }), 14);
      case 14:
        if (a.store) {
          return F(h, d.transaction("reg", "readwrite", function(k) {
            for (var l = x(a.store), m = l.next(); !m.done; m = l.next()) {
              var n = m.value;
              m = n[0];
              n = n[1];
              k.put("object" === typeof n ? JSON.stringify(n) : 1, m);
            }
          }), 16);
        }
        if (a.pa) {
          h.h = 16;
          break;
        }
        return F(h, d.transaction("reg", "readwrite", function(k) {
          for (var l = x(a.B.keys()), m = l.next(); !m.done; m = l.next()) {
            k.put(1, m.value);
          }
        }), 16);
      case 16:
        if (!a.tag) {
          h.h = 20;
          break;
        }
        return F(h, d.transaction("tag", "readwrite", function(k) {
          for (var l = x(a.tag), m = l.next(), n = {}; !m.done; n = {$:void 0, ea:void 0}, m = l.next()) {
            m = m.value, n.ea = m[0], n.$ = m[1], n.$.length && (k.get(n.ea).onsuccess = function(p) {
              return function() {
                var q = this.result;
                q = q && q.length ? q.concat(p.$) : p.$;
                k.put(q, p.ea);
              };
            }(n));
          }
        }), 20);
      case 20:
        a.map.clear(), a.J.clear(), a.tag && a.tag.clear(), a.store && a.store.clear(), a.document || a.B.clear(), h.h = 0;
    }
  });
};
function Eb(a, b, c) {
  for (var d = a.value, e, g, f = 0, h = 0, k; h < d.length; h++) {
    if (k = c ? d : d[h]) {
      for (var l = 0, m, n; l < b.length; l++) {
        if (n = b[l], m = k.indexOf(g ? parseInt(n, 10) : n), 0 > m && !g && "string" === typeof n && !isNaN(n) && (m = k.indexOf(parseInt(n, 10))) && (g = 1), 0 <= m) {
          if (e = 1, 1 < k.length) {
            k.splice(m, 1);
          } else {
            d[h] = [];
            break;
          }
        }
      }
      f += k.length;
    }
    if (c) {
      break;
    }
  }
  f ? e && a.update(d) : a.delete();
  a.continue();
}
w.remove = function(a) {
  "object" !== typeof a && (a = [a]);
  return Promise.all([this.transaction("map", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Eb(c, a);
    };
  }), this.transaction("ctx", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Eb(c, a);
    };
  }), this.transaction("tag", "readwrite", function(b) {
    b.openCursor().onsuccess = function() {
      var c = this.result;
      c && Eb(c, a, !0);
    };
  }), this.transaction("reg", "readwrite", function(b) {
    for (var c = 0; c < a.length; c++) {
      b.delete(a[c]);
    }
  })]);
};
function Db(a) {
  return new Promise(function(b, c) {
    a.onsuccess = function() {
      b(this.result);
    };
    a.oncomplete = function() {
      b(this.result);
    };
    a.onerror = c;
    a = null;
  });
}
;var Fb = {Index:V, Charset:Qa, Encoder:N, Document:Z, Worker:qb, Resolver:X, IndexedDB:Bb, Language:{}}, Ib = self, Jb;
(Jb = Ib.define) && Jb.amd ? Jb([], function() {
  return Fb;
}) : "object" === typeof Ib.exports ? Ib.exports = Fb : Ib.FlexSearch = Fb;
}(this));
