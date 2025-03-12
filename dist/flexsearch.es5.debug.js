/**!
 * FlexSearch.js v0.8.0 (ES5/Debug)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function(self){'use strict';
var u;
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
function C(a, b) {
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
  this.C = !1;
  this.A = null;
  this.F = void 0;
  this.h = 1;
  this.J = 0;
  this.B = null;
}
function ka(a) {
  if (a.C) {
    throw new TypeError("Generator is already running");
  }
  a.C = !0;
}
ja.prototype.G = function(a) {
  this.F = a;
};
function la(a, b) {
  a.B = {ma:b, na:!0};
  a.h = a.J;
}
ja.prototype.return = function(a) {
  this.B = {return:a};
  this.h = this.J;
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
      return a.h.C = !1, e;
    }
    var h = e.value;
  } catch (f) {
    return a.h.A = null, la(a.h, f), G(a);
  }
  a.h.A = null;
  d.call(a.h, h);
  return G(a);
}
function G(a) {
  for (; a.h.h;) {
    try {
      var b = a.A(a.h);
      if (b) {
        return a.h.C = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.h.F = void 0, la(a.h, c);
    }
  }
  a.h.C = !1;
  if (a.h.B) {
    b = a.h.B;
    a.h.B = null;
    if (b.na) {
      throw b.ma;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function pa(a) {
  this.next = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A.next, b, a.h.G) : (a.h.G(b), b = G(a));
    return b;
  };
  this.throw = function(b) {
    ka(a.h);
    a.h.A ? b = oa(a, a.h.A["throw"], b, a.h.G) : (la(a.h, b), b = G(a));
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
    function h(f) {
      f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(h, e);
    }
    h(a.next());
  });
}
function H(a) {
  return ra(new pa(new ma(a)));
}
C("Symbol", function(a) {
  function b(h) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (h || "") + "_" + e++, h);
  }
  function c(h, f) {
    this.h = h;
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
C("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = z[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return sa(aa(this));
    }});
  }
  return a;
});
function sa(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
}
C("Promise", function(a) {
  function b(f) {
    this.A = 0;
    this.B = void 0;
    this.h = [];
    this.J = !1;
    var g = this.C();
    try {
      f(g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  }
  function c() {
    this.h = null;
  }
  function d(f) {
    return f instanceof b ? f : new b(function(g) {
      g(f);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.A = function(f) {
    if (null == this.h) {
      this.h = [];
      var g = this;
      this.B(function() {
        g.F();
      });
    }
    this.h.push(f);
  };
  var e = z.setTimeout;
  c.prototype.B = function(f) {
    e(f, 0);
  };
  c.prototype.F = function() {
    for (; this.h && this.h.length;) {
      var f = this.h;
      this.h = [];
      for (var g = 0; g < f.length; ++g) {
        var k = f[g];
        f[g] = null;
        try {
          k();
        } catch (l) {
          this.C(l);
        }
      }
    }
    this.h = null;
  };
  c.prototype.C = function(f) {
    this.B(function() {
      throw f;
    });
  };
  b.prototype.C = function() {
    function f(l) {
      return function(m) {
        k || (k = !0, l.call(g, m));
      };
    }
    var g = this, k = !1;
    return {resolve:f(this.ha), reject:f(this.F)};
  };
  b.prototype.ha = function(f) {
    if (f === this) {
      this.F(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (f instanceof b) {
        this.ja(f);
      } else {
        a: {
          switch(typeof f) {
            case "object":
              var g = null != f;
              break a;
            case "function":
              g = !0;
              break a;
            default:
              g = !1;
          }
        }
        g ? this.ga(f) : this.G(f);
      }
    }
  };
  b.prototype.ga = function(f) {
    var g = void 0;
    try {
      g = f.then;
    } catch (k) {
      this.F(k);
      return;
    }
    "function" == typeof g ? this.ka(g, f) : this.G(f);
  };
  b.prototype.F = function(f) {
    this.ca(2, f);
  };
  b.prototype.G = function(f) {
    this.ca(1, f);
  };
  b.prototype.ca = function(f, g) {
    if (0 != this.A) {
      throw Error("Cannot settle(" + f + ", " + g + "): Promise already settled in state" + this.A);
    }
    this.A = f;
    this.B = g;
    2 === this.A && this.ia();
    this.ea();
  };
  b.prototype.ia = function() {
    var f = this;
    e(function() {
      if (f.fa()) {
        var g = z.console;
        "undefined" !== typeof g && g.error(f.B);
      }
    }, 1);
  };
  b.prototype.fa = function() {
    if (this.J) {
      return !1;
    }
    var f = z.CustomEvent, g = z.Event, k = z.dispatchEvent;
    if ("undefined" === typeof k) {
      return !0;
    }
    "function" === typeof f ? f = new f("unhandledrejection", {cancelable:!0}) : "function" === typeof g ? f = new g("unhandledrejection", {cancelable:!0}) : (f = z.document.createEvent("CustomEvent"), f.initCustomEvent("unhandledrejection", !1, !0, f));
    f.promise = this;
    f.reason = this.B;
    return k(f);
  };
  b.prototype.ea = function() {
    if (null != this.h) {
      for (var f = 0; f < this.h.length; ++f) {
        h.A(this.h[f]);
      }
      this.h = null;
    }
  };
  var h = new c();
  b.prototype.ja = function(f) {
    var g = this.C();
    f.V(g.resolve, g.reject);
  };
  b.prototype.ka = function(f, g) {
    var k = this.C();
    try {
      f.call(g, k.resolve, k.reject);
    } catch (l) {
      k.reject(l);
    }
  };
  b.prototype.then = function(f, g) {
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
    this.V(k(f, l), k(g, m));
    return n;
  };
  b.prototype.catch = function(f) {
    return this.then(void 0, f);
  };
  b.prototype.V = function(f, g) {
    function k() {
      switch(l.A) {
        case 1:
          f(l.B);
          break;
        case 2:
          g(l.B);
          break;
        default:
          throw Error("Unexpected state: " + l.A);
      }
    }
    var l = this;
    null == this.h ? h.A(k) : this.h.push(k);
    this.J = !0;
  };
  b.resolve = d;
  b.reject = function(f) {
    return new b(function(g, k) {
      k(f);
    });
  };
  b.race = function(f) {
    return new b(function(g, k) {
      for (var l = x(f), m = l.next(); !m.done; m = l.next()) {
        d(m.value).V(g, k);
      }
    });
  };
  b.all = function(f) {
    var g = x(f), k = g.next();
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
        p.push(void 0), q++, d(k.value).V(n(p.length - 1), m), k = g.next();
      } while (!k.done);
    });
  };
  return b;
});
function ta(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, e = {next:function() {
    if (!d && c < a.length) {
      var h = c++;
      return {value:b(h, a[h]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
}
C("Array.prototype.values", function(a) {
  return a ? a : function() {
    return ta(this, function(b, c) {
      return c;
    });
  };
});
function I(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
C("WeakMap", function(a) {
  function b(k) {
    this.h = (g += Math.random() + 1).toString();
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
    if (!I(k, f)) {
      var l = new c();
      ba(k, f, {value:l});
    }
  }
  function h(k) {
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
  h("freeze");
  h("preventExtensions");
  h("seal");
  var g = 0;
  b.prototype.set = function(k, l) {
    if (!d(k)) {
      throw Error("Invalid WeakMap key");
    }
    e(k);
    if (!I(k, f)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[f][this.h] = l;
    return this;
  };
  b.prototype.get = function(k) {
    return d(k) && I(k, f) ? k[f][this.h] : void 0;
  };
  b.prototype.has = function(k) {
    return d(k) && I(k, f) && I(k[f], this.h);
  };
  b.prototype.delete = function(k) {
    return d(k) && I(k, f) && I(k[f], this.h) ? delete k[f][this.h] : !1;
  };
  return b;
});
C("Map", function(a) {
  function b() {
    var g = {};
    return g.I = g.next = g.head = g;
  }
  function c(g, k) {
    var l = g[1];
    return sa(function() {
      if (l) {
        for (; l.head != g[1];) {
          l = l.I;
        }
        for (; l.next != l.head;) {
          return l = l.next, {done:!1, value:k(l)};
        }
        l = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(g, k) {
    var l = k && typeof k;
    "object" == l || "function" == l ? h.has(k) ? l = h.get(k) : (l = "" + ++f, h.set(k, l)) : l = "p_" + k;
    var m = g[0][l];
    if (m && I(g[0], l)) {
      for (g = 0; g < m.length; g++) {
        var n = m[g];
        if (k !== k && n.key !== n.key || k === n.key) {
          return {id:l, list:m, index:g, D:n};
        }
      }
    }
    return {id:l, list:m, index:-1, D:void 0};
  }
  function e(g) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (g) {
      g = x(g);
      for (var k; !(k = g.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var g = Object.seal({x:4}), k = new a(x([[g, "s"]]));
      if ("s" != k.get(g) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var l = k.entries(), m = l.next();
      if (m.done || m.value[0] != g || "s" != m.value[1]) {
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
  var h = new WeakMap();
  e.prototype.set = function(g, k) {
    g = 0 === g ? 0 : g;
    var l = d(this, g);
    l.list || (l.list = this[0][l.id] = []);
    l.D ? l.D.value = k : (l.D = {next:this[1], I:this[1].I, head:this[1], key:g, value:k}, l.list.push(l.D), this[1].I.next = l.D, this[1].I = l.D, this.size++);
    return this;
  };
  e.prototype.delete = function(g) {
    g = d(this, g);
    return g.D && g.list ? (g.list.splice(g.index, 1), g.list.length || delete this[0][g.id], g.D.I.next = g.D.next, g.D.next.I = g.D.I, g.D.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].I = b();
    this.size = 0;
  };
  e.prototype.has = function(g) {
    return !!d(this, g).D;
  };
  e.prototype.get = function(g) {
    return (g = d(this, g).D) && g.value;
  };
  e.prototype.entries = function() {
    return c(this, function(g) {
      return [g.key, g.value];
    });
  };
  e.prototype.keys = function() {
    return c(this, function(g) {
      return g.key;
    });
  };
  e.prototype.values = function() {
    return c(this, function(g) {
      return g.value;
    });
  };
  e.prototype.forEach = function(g, k) {
    for (var l = this.entries(), m; !(m = l.next()).done;) {
      m = m.value, g.call(k, m[1], m[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var f = 0;
  return e;
});
C("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return ta(this, function(b) {
      return b;
    });
  };
});
C("Set", function(a) {
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
      var e = d.entries(), h = e.next();
      if (h.done || h.value[0] != c || h.value[1] != c) {
        return !1;
      }
      h = e.next();
      return h.done || h.value[0] == c || 4 != h.value[0].x || h.value[1] != h.value[0] ? !1 : e.next().done;
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
    this.h.forEach(function(h) {
      return c.call(d, h, h, e);
    });
  };
  return b;
});
C("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
C("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var h = d[c];
      if (h === b || Object.is(h, b)) {
        return !0;
      }
    }
    return !1;
  };
});
C("String.prototype.includes", function(a) {
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
C("Array.prototype.entries", function(a) {
  return a ? a : function() {
    return ta(this, function(b, c) {
      return [b, c];
    });
  };
});
var ua = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var e in d) {
        I(d, e) && (a[e] = d[e]);
      }
    }
  }
  return a;
};
C("Object.assign", function(a) {
  return a || ua;
});
C("Array.prototype.flat", function(a) {
  return a ? a : function(b) {
    b = void 0 === b ? 1 : b;
    var c = [];
    Array.prototype.forEach.call(this, function(d) {
      Array.isArray(d) && 0 < b ? (d = Array.prototype.flat.call(d, b - 1), c.push.apply(c, d)) : c.push(d);
    });
    return c;
  };
});
function K(a, b, c) {
  var d = typeof c, e = typeof a;
  if ("undefined" !== d) {
    if ("undefined" !== e) {
      if (c) {
        if ("function" === e && d === e) {
          return function(h) {
            return a(c(h));
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
function L() {
  return Object.create(null);
}
function va(a, b) {
  return b.length - a.length;
}
function M(a) {
  return "string" === typeof a;
}
function N(a) {
  return "object" === typeof a;
}
function wa(a) {
  var b = [];
  a = x(a.keys());
  for (var c = a.next(); !c.done; c = a.next()) {
    b.push(c.value);
  }
  return b;
}
function xa(a, b) {
  if (M(b)) {
    a = a[b];
  } else {
    for (var c = 0; a && c < b.length; c++) {
      a = a[b[c]];
    }
  }
  return a;
}
function ya(a) {
  for (var b = 0, c = 0, d = void 0; c < a.length; c++) {
    (d = a[c]) && b < d.length && (b = d.length);
  }
  return b;
}
;var za = [["\u00aa", "a"], ["\u00b2", "2"], ["\u00b3", "3"], ["\u00b9", "1"], ["\u00ba", "o"], ["\u00bc", "1\u20444"], ["\u00bd", "1\u20442"], ["\u00be", "3\u20444"], ["\u00e0", "a"], ["\u00e1", "a"], ["\u00e2", "a"], ["\u00e3", "a"], ["\u00e4", "a"], ["\u00e5", "a"], ["\u00e7", "c"], ["\u00e8", "e"], ["\u00e9", "e"], ["\u00ea", "e"], ["\u00eb", "e"], ["\u00ec", "i"], ["\u00ed", "i"], ["\u00ee", "i"], ["\u00ef", "i"], ["\u00f1", "n"], ["\u00f2", "o"], ["\u00f3", "o"], ["\u00f4", "o"], ["\u00f5", 
"o"], ["\u00f6", "o"], ["\u00f9", "u"], ["\u00fa", "u"], ["\u00fb", "u"], ["\u00fc", "u"], ["\u00fd", "y"], ["\u00ff", "y"], ["\u0101", "a"], ["\u0103", "a"], ["\u0105", "a"], ["\u0107", "c"], ["\u0109", "c"], ["\u010b", "c"], ["\u010d", "c"], ["\u010f", "d"], ["\u0113", "e"], ["\u0115", "e"], ["\u0117", "e"], ["\u0119", "e"], ["\u011b", "e"], ["\u011d", "g"], ["\u011f", "g"], ["\u0121", "g"], ["\u0123", "g"], ["\u0125", "h"], ["\u0129", "i"], ["\u012b", "i"], ["\u012d", "i"], ["\u012f", "i"], ["\u0133", 
"ij"], ["\u0135", "j"], ["\u0137", "k"], ["\u013a", "l"], ["\u013c", "l"], ["\u013e", "l"], ["\u0140", "l"], ["\u0144", "n"], ["\u0146", "n"], ["\u0148", "n"], ["\u0149", "n"], ["\u014d", "o"], ["\u014f", "o"], ["\u0151", "o"], ["\u0155", "r"], ["\u0157", "r"], ["\u0159", "r"], ["\u015b", "s"], ["\u015d", "s"], ["\u015f", "s"], ["\u0161", "s"], ["\u0163", "t"], ["\u0165", "t"], ["\u0169", "u"], ["\u016b", "u"], ["\u016d", "u"], ["\u016f", "u"], ["\u0171", "u"], ["\u0173", "u"], ["\u0175", "w"], ["\u0177", 
"y"], ["\u017a", "z"], ["\u017c", "z"], ["\u017e", "z"], ["\u017f", "s"], ["\u01a1", "o"], ["\u01b0", "u"], ["\u01c6", "dz"], ["\u01c9", "lj"], ["\u01cc", "nj"], ["\u01ce", "a"], ["\u01d0", "i"], ["\u01d2", "o"], ["\u01d4", "u"], ["\u01d6", "u"], ["\u01d8", "u"], ["\u01da", "u"], ["\u01dc", "u"], ["\u01df", "a"], ["\u01e1", "a"], ["\u01e3", "ae"], ["\u00e6", "ae"], ["\u01fd", "ae"], ["\u01e7", "g"], ["\u01e9", "k"], ["\u01eb", "o"], ["\u01ed", "o"], ["\u01ef", "\u0292"], ["\u01f0", "j"], ["\u01f3", 
"dz"], ["\u01f5", "g"], ["\u01f9", "n"], ["\u01fb", "a"], ["\u01ff", "\u00f8"], ["\u0201", "a"], ["\u0203", "a"], ["\u0205", "e"], ["\u0207", "e"], ["\u0209", "i"], ["\u020b", "i"], ["\u020d", "o"], ["\u020f", "o"], ["\u0211", "r"], ["\u0213", "r"], ["\u0215", "u"], ["\u0217", "u"], ["\u0219", "s"], ["\u021b", "t"], ["\u021f", "h"], ["\u0227", "a"], ["\u0229", "e"], ["\u022b", "o"], ["\u022d", "o"], ["\u022f", "o"], ["\u0231", "o"], ["\u0233", "y"], ["\u02b0", "h"], ["\u02b1", "h"], ["\u0266", "h"], 
["\u02b2", "j"], ["\u02b3", "r"], ["\u02b4", "\u0279"], ["\u02b5", "\u027b"], ["\u02b6", "\u0281"], ["\u02b7", "w"], ["\u02b8", "y"], ["\u02e0", "\u0263"], ["\u02e1", "l"], ["\u02e2", "s"], ["\u02e3", "x"], ["\u02e4", "\u0295"], ["\u0390", "\u03b9"], ["\u03ac", "\u03b1"], ["\u03ad", "\u03b5"], ["\u03ae", "\u03b7"], ["\u03af", "\u03b9"], ["\u03b0", "\u03c5"], ["\u03ca", "\u03b9"], ["\u03cb", "\u03c5"], ["\u03cc", "\u03bf"], ["\u03cd", "\u03c5"], ["\u03ce", "\u03c9"], ["\u03d0", "\u03b2"], ["\u03d1", 
"\u03b8"], ["\u03d2", "\u03a5"], ["\u03d3", "\u03a5"], ["\u03d4", "\u03a5"], ["\u03d5", "\u03c6"], ["\u03d6", "\u03c0"], ["\u03f0", "\u03ba"], ["\u03f1", "\u03c1"], ["\u03f2", "\u03c2"], ["\u03f5", "\u03b5"], ["\u0439", "\u0438"], ["\u0450", "\u0435"], ["\u0451", "\u0435"], ["\u0453", "\u0433"], ["\u0457", "\u0456"], ["\u045c", "\u043a"], ["\u045d", "\u0438"], ["\u045e", "\u0443"], ["\u0477", "\u0475"], ["\u04c2", "\u0436"], ["\u04d1", "\u0430"], ["\u04d3", "\u0430"], ["\u04d7", "\u0435"], ["\u04db", 
"\u04d9"], ["\u04dd", "\u0436"], ["\u04df", "\u0437"], ["\u04e3", "\u0438"], ["\u04e5", "\u0438"], ["\u04e7", "\u043e"], ["\u04eb", "\u04e9"], ["\u04ed", "\u044d"], ["\u04ef", "\u0443"], ["\u04f1", "\u0443"], ["\u04f3", "\u0443"], ["\u04f5", "\u0447"]];
var Aa = /[^\p{L}\p{N}]+/u, Ba = /(\d{3})/g, Ca = /(\D)(\d{3})/g, Da = /(\d{3})(\D)/g, Ea = "".normalize && /[\u0300-\u036f]/g;
function Q(a) {
  if (!this) {
    var b = Function.prototype.bind, c = b.apply, d = [null], e = d.concat;
    if (arguments instanceof Array) {
      var h = arguments;
    } else {
      h = x(arguments);
      for (var f, g = []; !(f = h.next()).done;) {
        g.push(f.value);
      }
      h = g;
    }
    return new (c.call(b, Q, e.call(d, h)))();
  }
  for (b = 0; b < arguments.length; b++) {
    this.assign(arguments[b]);
  }
}
Q.prototype.assign = function(a) {
  this.normalize = K(a.normalize, !0, this.normalize);
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
    try {
      this.split = new RegExp("[" + (b ? "^" : "") + e + "]+", "u");
    } catch (h) {
      this.split = /\s+/;
    }
    this.numeric = d;
  } else {
    try {
      this.split = K(c, Aa, this.split);
    } catch (h) {
      this.split = /\s+/;
    }
    this.numeric = K(this.numeric, !0);
  }
  this.prepare = K(a.prepare, null, this.prepare);
  this.finalize = K(a.finalize, null, this.finalize);
  Ea || (this.mapper = new Map(za));
  this.rtl = a.rtl || !1;
  this.dedupe = K(a.dedupe, !0, this.dedupe);
  this.filter = K((c = a.filter) && new Set(c), null, this.filter);
  this.matcher = K((c = a.matcher) && new Map(c), null, this.matcher);
  this.mapper = K((c = a.mapper) && new Map(c), null, this.mapper);
  this.stemmer = K((c = a.stemmer) && new Map(c), null, this.stemmer);
  this.replacer = K(a.replacer, null, this.replacer);
  this.minlength = K(a.minlength, 1, this.minlength);
  this.maxlength = K(a.maxlength, 0, this.maxlength);
  if (this.cache = c = K(a.cache, !0, this.cache)) {
    this.U = null, this.J = "number" === typeof c ? c : 2e5, this.N = new Map(), this.S = new Map(), this.A = this.h = 128;
  }
  this.B = "";
  this.F = null;
  this.C = "";
  this.G = null;
  if (this.matcher) {
    for (a = x(this.matcher.keys()), b = a.next(); !b.done; b = a.next()) {
      this.B += (this.B ? "|" : "") + b.value;
    }
  }
  if (this.stemmer) {
    for (a = x(this.stemmer.keys()), b = a.next(); !b.done; b = a.next()) {
      this.C += (this.C ? "|" : "") + b.value;
    }
  }
  return this;
};
Q.prototype.encode = function(a) {
  var b = this;
  if (this.cache && a.length <= this.h) {
    if (this.U) {
      if (this.N.has(a)) {
        return this.N.get(a);
      }
    } else {
      this.U = setTimeout(Fa, 0, this);
    }
  }
  this.normalize && (a = "function" === typeof this.normalize ? this.normalize(a) : Ea ? a.normalize("NFKD").replace(Ea, "").toLowerCase() : a.toLowerCase());
  this.prepare && (a = this.prepare(a));
  this.numeric && 3 < a.length && (a = a.replace(Ca, "$1 $2").replace(Da, "$1 $2").replace(Ba, "$1 "));
  for (var c = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer), d = [], e = this.split || "" === this.split ? a.split(this.split) : a, h = 0, f = void 0, g = void 0; h < e.length; h++) {
    if ((f = g = e[h]) && !(f.length < this.minlength)) {
      if (c) {
        d.push(f);
      } else {
        if (!this.filter || !this.filter.has(f)) {
          if (this.cache && f.length <= this.A) {
            if (this.U) {
              var k = this.S.get(f);
              if (k || "" === k) {
                k && d.push(k);
                continue;
              }
            } else {
              this.U = setTimeout(Fa, 0, this);
            }
          }
          k = void 0;
          this.stemmer && 2 < f.length && (this.G || (this.G = new RegExp("(?!^)(" + this.C + ")$")), f = f.replace(this.G, function(q) {
            return b.stemmer.get(q);
          }), k = 1);
          this.matcher && 1 < f.length && (this.F || (this.F = new RegExp("(" + this.B + ")", "g")), f = f.replace(this.F, function(q) {
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
          this.cache && g.length <= this.A && (this.S.set(g, f), this.S.size > this.J && (this.S.clear(), this.A = this.A / 1.1 | 0));
          f && d.push(f);
        }
      }
    }
  }
  this.finalize && (d = this.finalize(d) || d);
  this.cache && a.length <= this.h && (this.N.set(a, d), this.N.size > this.J && (this.N.clear(), this.h = this.h / 1.1 | 0));
  return d;
};
function Fa(a) {
  a.U = null;
  a.N.clear();
  a.S.clear();
}
;function Ga(a, b, c) {
  a = ("object" === typeof a ? "" + a.query : a).toLowerCase();
  var d = this.cache.get(a);
  if (!d) {
    d = this.search(a, b, c);
    if (d.then) {
      var e = this;
      d.then(function(h) {
        e.cache.set(a, h);
        return h;
      });
    }
    this.cache.set(a, d);
  }
  return d;
}
function R(a) {
  this.limit = a && !0 !== a ? a : 1000;
  this.cache = new Map();
  this.h = "";
}
R.prototype.set = function(a, b) {
  this.cache.set(this.h = a, b);
  this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
R.prototype.get = function(a) {
  var b = this.cache.get(a);
  b && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, b));
  return b;
};
R.prototype.remove = function(a) {
  for (var b = x(this.cache), c = b.next(); !c.done; c = b.next()) {
    c = c.value;
    var d = c[0];
    c[1].includes(a) && this.cache.delete(d);
  }
};
R.prototype.clear = function() {
  this.cache.clear();
  this.h = "";
};
var Ha = {normalize:function(a) {
  return a.toLowerCase();
}, dedupe:!1};
var Ia = new Map([["b", "p"], ["v", "f"], ["w", "f"], ["z", "s"], ["x", "s"], ["d", "t"], ["n", "m"], ["c", "k"], ["g", "k"], ["j", "k"], ["q", "k"], ["i", "e"], ["y", "e"], ["u", "o"]]);
var Ja = new Map([["ai", "ei"], ["ae", "a"], ["oe", "o"], ["ue", "u"], ["sh", "s"], ["ch", "c"], ["th", "t"], ["ph", "f"], ["pf", "f"]]), Ka = [/([^aeo])h([aeo$])/g, "$1$2", /([aeo])h([^aeo]|$)/g, "$1$2"];
var La = {a:"", e:"", i:"", o:"", u:"", y:"", b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, "\u00df":2, d:3, t:3, l:4, m:5, n:5, r:6};
var Ma = /[\x00-\x7F]+/g;
var Na = /[\x00-\x7F]+/g;
var Oa = /[\x00-\x7F]+/g;
var Pa = {LatinExact:{normalize:!1, dedupe:!1}, LatinDefault:Ha, LatinSimple:{normalize:!0, dedupe:!0}, LatinBalance:{normalize:!0, dedupe:!0, mapper:Ia}, LatinAdvanced:{normalize:!0, dedupe:!0, mapper:Ia, replacer:Ka, matcher:Ja}, LatinExtra:{normalize:!0, dedupe:!0, mapper:Ia, replacer:Ka.concat([/(?!^)[aeoy]/g, ""]), matcher:Ja}, LatinSoundex:{normalize:!0, dedupe:!1, include:{letter:!0}, finalize:function(a) {
  for (var b = 0; b < a.length; b++) {
    for (var c = a[b], d = c.charAt(0), e = La[d], h = 1, f; h < c.length && (f = c.charAt(h), "h" === f || "w" === f || !(f = La[f]) || f === e || (d += f, e = f, 4 !== d.length)); h++) {
    }
    a[b] = d;
  }
}}, ArabicDefault:{rtl:!0, normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Ma, " ");
}}, CjkDefault:{normalize:!1, dedupe:!0, split:"", prepare:function(a) {
  return ("" + a).replace(Na, "");
}}, CyrillicDefault:{normalize:!1, dedupe:!0, prepare:function(a) {
  return ("" + a).replace(Oa, " ");
}}};
function Qa(a, b, c, d) {
  for (var e = [], h = 0, f; h < a.index.length; h++) {
    if (f = a.index[h], b >= f.length) {
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
function S(a) {
  if (!this) {
    return new S(a);
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
        for (var h = 0, f = 0, g, k; f < b.index.length; f++) {
          g = b.index[f];
          k = g.indexOf(e);
          if (0 <= k) {
            return h + k;
          }
          h += g.length;
        }
        return -1;
      };
    }
    if ("includes" === d) {
      return function(e) {
        for (var h = 0; h < b.index.length; h++) {
          if (b.index[h].includes(e)) {
            return !0;
          }
        }
        return !1;
      };
    }
    if ("slice" === d) {
      return function(e, h) {
        return Qa(b, e || 0, h || b.length, !1);
      };
    }
    if ("splice" === d) {
      return function(e, h) {
        return Qa(b, e || 0, h || b.length, !0);
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
S.prototype.clear = function() {
  this.index.length = 0;
};
S.prototype.destroy = function() {
  this.proxy = this.index = null;
};
S.prototype.push = function() {
};
function T(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new T(a);
  }
  this.index = L();
  this.B = [];
  this.size = 0;
  32 < a ? (this.h = Ra, this.A = BigInt(a)) : (this.h = Sa, this.A = a);
}
T.prototype.get = function(a) {
  var b = this.h(a);
  return (b = this.index[b]) && b.get(a);
};
T.prototype.set = function(a, b) {
  var c = this.h(a), d = this.index[c];
  d ? (c = d.size, d.set(a, b), (c -= d.size) && this.size++) : (this.index[c] = d = new Map([[a, b]]), this.B.push(d));
};
function U(a) {
  a = void 0 === a ? 8 : a;
  if (!this) {
    return new U(a);
  }
  this.index = L();
  this.h = [];
  32 < a ? (this.B = Ra, this.A = BigInt(a)) : (this.B = Sa, this.A = a);
}
U.prototype.add = function(a) {
  var b = this.B(a), c = this.index[b];
  c ? (b = c.size, c.add(a), (b -= c.size) && this.size++) : (this.index[b] = c = new Set([a]), this.h.push(c));
};
u = T.prototype;
u.has = U.prototype.has = function(a) {
  var b = this.B(a);
  return (b = this.index[b]) && b.has(a);
};
u.delete = U.prototype.delete = function(a) {
  var b = this.B(a);
  (b = this.index[b]) && b.delete(a) && this.size--;
};
u.clear = U.prototype.clear = function() {
  this.index = L();
  this.h = [];
  this.size = 0;
};
u.values = U.prototype.values = function Ta() {
  var b, c = this, d, e, h;
  return qa(Ta, function(f) {
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
        h = e.value;
        return F(f, h, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
u.keys = U.prototype.keys = function Ua() {
  var b, c = this, d, e, h;
  return qa(Ua, function(f) {
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
        h = e.value;
        return F(f, h, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
u.entries = U.prototype.entries = function Va() {
  var b, c = this, d, e, h;
  return qa(Va, function(f) {
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
        h = e.value;
        return F(f, h, 6);
      case 6:
        e = d.next(), f.h = 5;
    }
  });
};
function Sa(a) {
  var b = Math.pow(2, this.A) - 1;
  if ("number" == typeof a) {
    return a & b;
  }
  for (var c = 0, d = this.A + 1, e = 0; e < a.length; e++) {
    c = (c * d ^ a.charCodeAt(e)) & b;
  }
  return 32 === this.A ? c + Math.pow(2, 31) : c;
}
function Ra() {
  throw Error("The keystore is limited to 32 for EcmaScript5");
}
;function Wa(a, b, c, d, e, h, f, g) {
  (d = a(c ? c + "." + d : d, JSON.stringify(f))) && d.then ? d.then(function() {
    b.export(a, b, c, e, h + 1, g);
  }) : b.export(a, b, c, e, h + 1, g);
}
;var Xa = {memory:{resolution:1}, performance:{resolution:6, fastupdate:!0, context:{depth:1, resolution:3}}, match:{tokenize:"forward"}, score:{resolution:9, context:{depth:2, resolution:9}}};
function Ya(a) {
  Za.call(a, "add");
  Za.call(a, "append");
  Za.call(a, "search");
  Za.call(a, "update");
  Za.call(a, "remove");
}
function Za(a) {
  this[a + "Async"] = function() {
    var b = arguments, c = b[b.length - 1];
    if ("function" === typeof c) {
      var d = c;
      delete b[b.length - 1];
    }
    b = this[a].apply(this, b);
    d && (b.then ? b.then(d) : d(b));
    return b;
  };
}
;L();
V.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.reg.has(a)) {
      return this.update(a, b);
    }
    b = this.encoder.encode(b);
    if (d = b.length) {
      for (var e = L(), h = L(), f = this.depth, g = this.resolution, k = 0; k < d; k++) {
        var l = b[this.rtl ? d - 1 - k : k], m = l.length;
        if (m && (f || !h[l])) {
          var n = this.score ? this.score(b, l, k, null, 0) : $a(g, d, k), p = "";
          switch(this.tokenize) {
            case "full":
              if (2 < m) {
                for (n = 0; n < m; n++) {
                  for (var q = m; q > n; q--) {
                    p = l.substring(n, q);
                    var r = this.score ? this.score(b, l, k, p, n) : $a(g, d, k, m, n);
                    ab(this, h, p, r, a, c);
                  }
                }
                break;
              }
            case "reverse":
              if (1 < m) {
                for (q = m - 1; 0 < q; q--) {
                  p = l[q] + p, r = this.score ? this.score(b, l, k, p, q) : $a(g, d, k, m, q), ab(this, h, p, r, a, c);
                }
                p = "";
              }
            case "forward":
              if (1 < m) {
                for (q = 0; q < m; q++) {
                  p += l[q], ab(this, h, p, n, a, c);
                }
                break;
              }
            default:
              if (ab(this, h, l, n, a, c), f && 1 < d && k < d - 1) {
                for (m = L(), p = this.aa, n = l, q = Math.min(f + 1, d - k), r = m[n] = 1; r < q; r++) {
                  if ((l = b[this.rtl ? d - 1 - k - r : k + r]) && !m[l]) {
                    m[l] = 1;
                    var y = this.score ? this.score(b, n, k, l, r) : $a(p + (d / 2 > p ? 0 : 1), d, k, q - 1, r - 1), v = this.bidirectional && l > n;
                    ab(this, e, v ? n : l, y, a, c, v ? l : n);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || this.reg.add(a);
    } else {
      b = "";
    }
  }
  this.db && (b || this.commit_task.push({del:a}), this.da && bb(this));
  return this;
};
function ab(a, b, c, d, e, h, f) {
  var g = f ? a.ctx : a.map, k;
  if (!b[c] || !f || !(k = b[c])[f]) {
    if (f ? (b = k || (b[c] = L()), b[f] = 1, (k = g.get(f)) ? g = k : g.set(f, g = new Map())) : b[c] = 1, (k = g.get(c)) ? g = k : g.set(c, g = k = []), g = g[d] || (g[d] = []), !h || !g.includes(e)) {
      if (g.length === Math.pow(2, 31) - 1) {
        b = new S(g);
        if (a.fastupdate) {
          for (c = x(a.reg.values()), h = c.next(); !h.done; h = c.next()) {
            h = h.value, h.includes(g) && (h[h.indexOf(g)] = b);
          }
        }
        k[d] = g = b;
      }
      g.push(e);
      a.fastupdate && ((d = a.reg.get(e)) ? d.push(g) : a.reg.set(e, [g]));
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
  for (var e = [], h = 0, f = void 0, g = void 0; h < a.length; h++) {
    if ((f = a[h]) && (g = f.length)) {
      if (c) {
        if (c >= g) {
          c -= g;
          continue;
        }
        c < g && (f = b ? f.slice(c, c + b) : f.slice(c), g = f.length, c = 0);
      }
      if (e.length) {
        g > b && (f = f.slice(0, b), g = f.length), e.push(f);
      } else {
        if (g >= b) {
          return g > b && (f = f.slice(0, b)), d ? cb(f) : f;
        }
        e = [f];
      }
      b -= g;
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
  for (var e = 0, h = 0, f, g, k = 0, l = void 0; k < b.length; k++) {
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
        h = l.offset || 0;
        f = l.enrich;
        g = l.resolve;
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = [a.result].concat(d));
      a.result = db(d, e, h, f, g, a.K);
      return g ? a.result : a;
    });
  }
  this.result.length && (d = [this.result].concat(d));
  this.result = db(d, e, h, f, g, a.K);
  return g ? this.result : this;
};
function db(a, b, c, d, e, h) {
  if (!a.length) {
    return a;
  }
  "object" === typeof b && (c = b.offset || 0, d = b.enrich || !1, b = b.limit || 0);
  if (2 > a.length) {
    return e ? W(a[0], b, c, d) : a[0];
  }
  d = [];
  for (var f = 0, g = L(), k = ya(a), l = 0, m; l < k; l++) {
    for (var n = 0; n < a.length; n++) {
      if (m = a[n]) {
        if (m = m[l]) {
          for (var p = 0, q; p < m.length; p++) {
            if (q = m[p], !g[q]) {
              if (g[q] = 1, c) {
                c--;
              } else {
                if (e) {
                  d.push(q);
                } else {
                  var r = l + (n ? h : 0);
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
    for (var e = 0, h = 0, f, g = 0, k = void 0; g < b.length; g++) {
      if (k = b[g]) {
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
          h = k.offset || 0;
          f = k.resolve;
          continue;
        }
        d[g] = l;
        l.then && c.push(l);
      }
    }
    if (c.length) {
      return Promise.all(c).then(function() {
        d = [a.result].concat(d);
        a.result = eb(d, e, h, f, a.K);
        return f ? a.result : a;
      });
    }
    d = [this.result].concat(d);
    this.result = eb(d, e, h, f, a.K);
    return f ? this.result : this;
  }
  return this;
};
function eb(a, b, c, d, e) {
  if (2 > a.length) {
    return [];
  }
  var h = [], f = 0, g = L(), k = ya(a);
  if (!k) {
    return h;
  }
  for (var l = 0, m; l < a.length; l++) {
    m = a[l];
    if (!m || !m.length) {
      return [];
    }
    for (var n = L(), p = 0, q = l === a.length - 1, r = 0, y; r < k; r++) {
      if (y = m[r]) {
        for (var v = 0, t, w; v < y.length; v++) {
          if (t = y[v], !l) {
            n[t] = r + 1 + (l ? e : 0), p = 1;
          } else if (q) {
            if (w = g[t]) {
              if (p = 1, c) {
                c--;
              } else {
                if (d ? h.push(t) : (w--, r < w && (w = r), h[w] || (h[w] = []), h[w].push(t)), b && ++f === b) {
                  return h;
                }
              }
            }
          } else if (w = g[t]) {
            r + 1 < w && (w = r + 1), n[t] = w, p = 1;
          }
        }
      }
    }
    if (!p) {
      return [];
    }
    g = n;
  }
  return h;
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
  for (var e = 0, h = 0, f, g, k = 0, l = void 0; k < b.length; k++) {
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
        h = l.offset || 0;
        f = l.enrich;
        g = l.resolve;
        continue;
      }
      d[k] = m;
      m.then && c.push(m);
    }
  }
  if (c.length) {
    return Promise.all(c).then(function() {
      a.result.length && (d = [a.result].concat(d));
      a.result = fb(d, e, h, f, !g, a.K);
      return g ? a.result : a;
    });
  }
  this.result.length && (d = [this.result].concat(d));
  this.result = fb(d, e, h, f, !g, a.K);
  return g ? this.result : this;
};
function fb(a, b, c, d, e, h) {
  if (!a.length) {
    return a;
  }
  if (2 > a.length) {
    return e ? W(a[0], b, c, d) : a[0];
  }
  b = [];
  c = L();
  d = 0;
  for (var f; d < a.length; d++) {
    if (f = a[d]) {
      for (var g = 0, k; g < f.length; g++) {
        if (k = f[g]) {
          for (var l = 0, m; l < k.length; l++) {
            m = k[l], c[m] ? c[m]++ : c[m] = 1;
          }
        }
      }
    }
  }
  for (d = 0; d < a.length; d++) {
    if (f = a[d]) {
      for (g = 0; g < f.length; g++) {
        if (k = f[g]) {
          for (l = 0; l < k.length; l++) {
            if (m = k[l], 1 === c[m]) {
              if (e) {
                b.push(m);
              } else {
                var n = g + (d ? h : 0);
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
  for (var e, h = 0, f = void 0; h < b.length; h++) {
    if (f = b[h]) {
      var g = void 0;
      if (f.constructor === X) {
        g = f.result;
      } else if (f.constructor === Array) {
        g = f;
      } else if (f.index) {
        f.resolve = !1, g = f.index.search(f).result;
      } else if (f.or) {
        g = this.or(f.or);
      } else if (f.and) {
        g = this.and(f.and);
      } else if (f.xor) {
        g = this.xor(f.xor);
      } else {
        e = f.resolve;
        continue;
      }
      d[h] = g;
      g.then && c.push(g);
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
      for (var h = 0, f; h < e.length; h++) {
        f = e[h], a.has(f) || (b ? c.push(f) : (c[d] || (c[d] = []), c[d].push(f)));
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
  this.K = 0;
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
  this.K += a;
  return this;
};
X.prototype.resolve = function(a, b, c) {
  hb = 1;
  var d = this.result;
  this.result = this.index = null;
  return d.length ? ("object" === typeof a && (c = a.enrich, b = a.offset, a = a.limit), W(d, a || 100, b, c)) : d;
};
function ib(a, b, c, d, e) {
  var h = a.length, f = [], g;
  var k = L();
  for (var l = 0, m = void 0, n; l < b; l++) {
    for (var p = 0; p < h; p++) {
      if (n = a[p], l < n.length && (m = n[l])) {
        for (var q = 0; q < m.length; q++) {
          n = m[q], (g = k[n]) ? k[n]++ : (g = 0, k[n] = 1), g = f[g] || (f[g] = []), g.push(n);
        }
      }
    }
  }
  if (a = f.length) {
    if (e) {
      if (1 < f.length) {
        e = f;
        h = [];
        f = L();
        k = e.length;
        for (m = 0; m < k; m++) {
          for (a = e[m], l = a.length, p = 0; p < l; p++) {
            if (b = a[p], !f[b]) {
              if (f[b] = 1, d) {
                d--;
              } else {
                if (h.push(b), h.length === c) {
                  break;
                }
              }
            }
          }
        }
        c = h;
      } else {
        c = f[0];
      }
      f = c;
    } else {
      if (a < h) {
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
  for (var c = L(), d = [], e = 0, h; e < b.length; e++) {
    h = b[e];
    for (var f = 0; f < h.length; f++) {
      c[h[f]] = 1;
    }
  }
  for (b = 0; b < a.length; b++) {
    e = a[b], 1 === c[e] && (d.push(e), c[e] = 2);
  }
  return d;
}
;var hb = 1;
V.prototype.search = function(a, b, c) {
  c || (!b && N(a) ? (c = a, a = "") : N(b) && (c = b, b = 0));
  var d = [], e = 0, h;
  if (c) {
    a = c.query || a;
    b = c.limit || b;
    e = c.offset || 0;
    var f = c.context;
    var g = c.suggest;
    (h = hb && !1 !== c.resolve) || (hb = 0);
    var k = h && c.enrich;
    var l = this.db && c.tag;
  } else {
    h = this.resolve || hb;
  }
  a = this.encoder.encode(a);
  var m = a.length;
  b || !h || (b = 100);
  if (1 === m) {
    return kb.call(this, a[0], "", b, e, h, k, l);
  }
  f = this.depth && !1 !== f;
  if (2 === m && f && !g) {
    return kb.call(this, a[0], a[1], b, e, h, k, l);
  }
  var n = c = 0;
  if (1 < m) {
    for (var p = L(), q = [], r = 0, y = void 0; r < m; r++) {
      if ((y = a[r]) && !p[y]) {
        if (g || this.db || Y(this, y)) {
          q.push(y), p[y] = 1;
        } else {
          return h ? d : new X(d);
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
    return h ? d : new X(d);
  }
  var v = 0;
  if (1 === m) {
    return kb.call(this, a[0], "", b, e, h, k, l);
  }
  if (2 === m && f && !g) {
    return kb.call(this, a[0], a[1], b, e, h, k, l);
  }
  if (1 < m) {
    if (f) {
      var t = a[0];
      v = 1;
    } else {
      9 < c && 3 < c / n && a.sort(va);
    }
  }
  if (this.db) {
    if (this.db.search && (f = this.db.search(this, a, b, e, g, h, k, l), !1 !== f)) {
      return f;
    }
    var w = this;
    return function() {
      var A, D, B;
      return H(function(E) {
        switch(E.h) {
          case 1:
            D = A = void 0;
          case 2:
            if (!(v < m)) {
              E.h = 4;
              break;
            }
            D = a[v];
            return t ? F(E, Y(w, D, t, 0, 0, !1, !1), 8) : F(E, Y(w, D, "", 0, 0, !1, !1), 7);
          case 7:
            A = E.F;
            A = lb(A, d, g, w.resolution);
            E.h = 6;
            break;
          case 8:
            A = E.F, A = lb(A, d, g, w.aa), g && !1 === A && d.length || (t = D);
          case 6:
            if (A) {
              return E.return(A);
            }
            if (g && v === m - 1) {
              B = d.length;
              if (!B) {
                if (t) {
                  t = "";
                  v = -1;
                  E.h = 3;
                  break;
                }
                return E.return(d);
              }
              if (1 === B) {
                return E.return(h ? W(d[0], b, e) : new X(d[0]));
              }
            }
          case 3:
            v++;
            E.h = 2;
            break;
          case 4:
            return E.return(h ? ib(d, w.resolution, b, e, g) : new X(d[0]));
        }
      });
    }();
  }
  for (k = f = void 0; v < m; v++) {
    k = a[v];
    t ? (f = Y(this, k, t, 0, 0, !1, !1), f = lb(f, d, g, this.aa), g && !1 === f && d.length || (t = k)) : (f = Y(this, k, "", 0, 0, !1, !1), f = lb(f, d, g, this.resolution));
    if (f) {
      return f;
    }
    if (g && v === m - 1) {
      f = d.length;
      if (!f) {
        if (t) {
          t = "";
          v = -1;
          continue;
        }
        return d;
      }
      if (1 === f) {
        return h ? W(d[0], b, e) : new X(d[0]);
      }
    }
  }
  d = ib(d, this.resolution, b, e, g);
  return h ? d : new X(d);
};
function kb(a, b, c, d, e, h, f) {
  a = Y(this, a, b, c, d, e, h, f);
  return this.db ? a.then(function(g) {
    return e ? g : g && g.length ? e ? W(g, c, d) : new X(g) : e ? [] : new X([]);
  }) : a && a.length ? e ? W(a, c, d) : new X(a) : e ? [] : new X([]);
}
function lb(a, b, c, d) {
  var e = [];
  if (a) {
    d = Math.min(a.length, d);
    for (var h = 0, f = void 0; h < d; h++) {
      (f = a[h]) && f && (e[h] = f);
    }
    if (e.length) {
      b.push(e);
      return;
    }
  }
  return !c && e;
}
function Y(a, b, c, d, e, h, f, g) {
  var k;
  c && (k = a.bidirectional && b > c);
  if (a.db) {
    return c ? a.db.get(k ? c : b, k ? b : c, d, e, h, f, g) : a.db.get(b, "", d, e, h, f, g);
  }
  a = c ? (a = a.ctx.get(k ? b : c)) && a.get(k ? c : b) : a.map.get(b);
  return a;
}
;V.prototype.remove = function(a, b) {
  var c = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
  if (c) {
    if (this.fastupdate) {
      for (var d = 0, e; d < c.length; d++) {
        if (e = c[d]) {
          if (2 > e.length) {
            e.pop();
          } else {
            var h = e.indexOf(a);
            h === c.length - 1 ? e.pop() : e.splice(h, 1);
          }
        }
      }
    } else {
      mb(this.map, a), this.depth && mb(this.ctx, a);
    }
    b || this.reg.delete(a);
  }
  this.db && (this.commit_task.push({del:a}), this.da && bb(this));
  this.cache && this.cache.remove(a);
  return this;
};
function mb(a, b) {
  var c = 0;
  if (a.constructor === Array) {
    for (var d = 0, e = void 0, h; d < a.length; d++) {
      if ((e = a[d]) && e.length) {
        if (h = e.indexOf(b), 0 <= h) {
          1 < e.length ? (e.splice(h, 1), c++) : delete a[d];
          break;
        } else {
          c++;
        }
      }
    }
  } else {
    for (d = x(a), e = d.next(); !e.done; e = d.next()) {
      h = e.value, e = h[0], (h = mb(h[1], b)) ? c += h : a.delete(e);
    }
  }
  return c;
}
;function V(a, b) {
  if (!this) {
    return new V(a);
  }
  if (a) {
    var c = M(a) ? a : a.preset;
    c && (Xa[c] || console.warn("Preset not found: " + c), a = Object.assign({}, Xa[c], a));
  } else {
    a = {};
  }
  c = a.context || {};
  var d = M(a.encoder) ? Pa[a.encoder] : a.encode || a.encoder || Ha;
  this.encoder = d.encode ? d : "object" === typeof d ? new Q(d) : {encode:d};
  var e;
  this.resolution = a.resolution || 9;
  this.tokenize = e = a.tokenize || "strict";
  this.depth = "strict" === e && c.depth || 0;
  this.bidirectional = !1 !== c.bidirectional;
  this.fastupdate = !!a.fastupdate;
  this.score = a.score || null;
  (e = a.keystore || 0) && (this.keystore = e);
  this.map = e ? new T(e) : new Map();
  this.ctx = e ? new T(e) : new Map();
  this.reg = b || (this.fastupdate ? e ? new T(e) : new Map() : e ? new U(e) : new Set());
  this.aa = c.resolution || 1;
  this.rtl = d.rtl || a.rtl || !1;
  this.cache = (e = a.cache || null) && new R(e);
  this.resolve = !1 !== a.resolve;
  if (e = a.db) {
    this.db = this.mount(e);
  }
  this.da = !1 !== a.commit;
  this.commit_task = [];
  this.commit_timer = null;
}
u = V.prototype;
u.mount = function(a) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return a.mount(this);
};
u.commit = function(a, b) {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.commit(this, a, b);
};
u.destroy = function() {
  this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
  return this.db.destroy();
};
function bb(a) {
  a.commit_timer || (a.commit_timer = setTimeout(function() {
    a.commit_timer = null;
    a.db.commit(a, void 0, void 0);
  }, 0));
}
u.clear = function() {
  this.map.clear();
  this.ctx.clear();
  this.reg.clear();
  this.cache && this.cache.clear();
  this.db && (this.commit_timer && clearTimeout(this.commit_timer), this.commit_timer = null, this.commit_task = [{clear:!0}]);
  return this;
};
u.append = function(a, b) {
  return this.add(a, b, !0);
};
u.contain = function(a) {
  return this.db ? this.db.has(a) : this.reg.has(a);
};
u.update = function(a, b) {
  var c = this, d = this.remove(a);
  return d && d.then ? d.then(function() {
    return c.add(a, b);
  }) : this.add(a, b);
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
u.cleanup = function() {
  if (!this.fastupdate) {
    return console.info('Cleanup the index isn\'t required when not using "fastupdate".'), this;
  }
  nb(this.map);
  this.depth && nb(this.ctx);
  return this;
};
u.searchCache = Ga;
u.export = function(a, b, c, d, e, h) {
  var f = !0;
  "undefined" === typeof h && (f = new Promise(function(n) {
    h = n;
  }));
  switch(e || (e = 0)) {
    case 0:
      var g = "reg";
      if (this.fastupdate) {
        var k = L();
        for (var l = x(this.reg.keys()), m = l.next(); !m.done; m = l.next()) {
          k[m.value] = 1;
        }
      } else {
        k = this.reg;
      }
      break;
    case 1:
      g = "cfg";
      k = {doc:0, opt:this.h ? 1 : 0};
      break;
    case 2:
      g = "map";
      k = this.map;
      break;
    case 3:
      g = "ctx";
      k = this.ctx;
      break;
    default:
      "undefined" === typeof c && h && h();
      return;
  }
  Wa(a, b || this, c, g, d, e, k, h);
  return f;
};
u.import = function(a, b) {
  if (b) {
    switch(M(b) && (b = JSON.parse(b)), a) {
      case "cfg":
        this.h = !!b.opt;
        break;
      case "reg":
        this.fastupdate = !1;
        this.reg = b;
        break;
      case "map":
        this.map = b;
        break;
      case "ctx":
        this.ctx = b;
    }
  }
};
u.serialize = function(a) {
  a = void 0 === a ? !0 : a;
  if (!this.reg.size) {
    return "";
  }
  for (var b = "", c = "", d = x(this.reg.keys()), e = d.next(); !e.done; e = d.next()) {
    e = e.value, c || (c = typeof e), b += (b ? "," : "") + ("string" === c ? '"' + e + '"' : e);
  }
  b = "index.reg=new Set([" + b + "]);";
  d = "";
  e = x(this.map.entries());
  for (var h = e.next(); !h.done; h = e.next()) {
    var f = h.value;
    h = f[0];
    f = f[1];
    for (var g = "", k = 0, l; k < f.length; k++) {
      l = f[k] || [""];
      for (var m = "", n = 0; n < l.length; n++) {
        m += (m ? "," : "") + ("string" === c ? '"' + l[n] + '"' : l[n]);
      }
      m = "[" + m + "]";
      g += (g ? "," : "") + m;
    }
    g = '["' + h + '",[' + g + "]]";
    d += (d ? "," : "") + g;
  }
  d = "index.map=new Map([" + d + "]);";
  e = "";
  h = x(this.ctx.entries());
  for (f = h.next(); !f.done; f = h.next()) {
    for (g = f.value, f = g[0], g = x(g[1].entries()), k = g.next(); !k.done; k = g.next()) {
      l = k.value;
      k = l[0];
      l = l[1];
      m = "";
      n = 0;
      for (var p; n < l.length; n++) {
        p = l[n] || [""];
        for (var q = "", r = 0; r < p.length; r++) {
          q += (q ? "," : "") + ("string" === c ? '"' + p[r] + '"' : p[r]);
        }
        q = "[" + q + "]";
        m += (m ? "," : "") + q;
      }
      m = 'new Map([["' + k + '",[' + m + "]]])";
      m = '["' + f + '",' + m + "]";
      e += (e ? "," : "") + m;
    }
  }
  e = "index.ctx=new Map([" + e + "]);";
  return a ? "function inject(index){" + b + d + e + "}" : b + d + e;
};
Ya(V.prototype);
function ob(a) {
  var b, c, d, e, h, f, g, k;
  return H(function(l) {
    a = a.data;
    b = self._index;
    c = a.args;
    d = a.task;
    switch(d) {
      case "init":
        e = a.options || {};
        (h = e.config) && (e = h);
        (f = a.factory) ? (Function("return " + f)()(self), self._index = new self.FlexSearch.Index(e), delete self.FlexSearch) : self._index = new V(e);
        postMessage({id:a.id});
        break;
      default:
        g = a.id, k = b[d].apply(b, c), postMessage("search" === d ? {id:g, msg:k} : {id:g});
    }
    l.h = 0;
  });
}
;var pb = 0;
function qb(a) {
  function b(h) {
    function f(g) {
      g = g.data || g;
      var k = g.id, l = k && e.h[k];
      l && (l(g.msg), delete e.h[k]);
    }
    this.worker = h || rb(c, d, a.worker);
    if (this.worker.then) {
      return this.worker.then(b);
    }
    this.h = L();
    if (this.worker) {
      d ? this.worker.on("message", f) : this.worker.onmessage = f;
      if (a.config) {
        return new Promise(function(g) {
          e.h[++pb] = function() {
            g(e);
          };
          e.worker.postMessage({id:pb, task:"init", factory:c, options:a});
        });
      }
      this.worker.postMessage({task:"init", factory:c, options:a});
      return this.worker;
    }
  }
  a = void 0 === a ? {} : a;
  if (!this) {
    return new qb(a);
  }
  var c = "undefined" !== typeof self ? self._factory : "undefined" !== typeof window ? window._factory : null;
  c && (c = c.toString());
  var d = "undefined" === typeof window, e = this;
  this.worker = b.call(this);
}
sb("add");
sb("append");
sb("search");
sb("update");
sb("remove");
function sb(a) {
  qb.prototype[a] = qb.prototype[a + "Async"] = function() {
    var b = this, c = arguments, d, e, h, f, g;
    return H(function(k) {
      d = b;
      e = [].slice.call(c);
      h = e[e.length - 1];
      "function" === typeof h && (f = h, e.splice(e.length - 1, 1));
      g = new Promise(function(l) {
        d.h[++pb] = l;
        d.worker.postMessage({task:a, id:pb, args:e});
      });
      return f ? (g.then(f), k.return(b)) : k.return(g);
    });
  };
}
function rb(a, b, c) {
  return b ? "undefined" !== typeof module ? new (require("worker_threads")["Worker"])(__dirname + "/node/node.js") : import("worker_threads").then(function(worker){ return new worker["Worker"]((1,eval)("import.meta.dirname") + "/node/node.mjs"); }) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + ob.toString()], {type:"text/javascript"}))) : new window.Worker(M(c) ? c : "worker/worker.js", {type:"module"});
}
;Z.prototype.add = function(a, b, c) {
  N(a) && (b = a, a = xa(b, this.key));
  if (b && (a || 0 === a)) {
    if (!c && this.reg.has(a)) {
      return this.update(a, b);
    }
    for (var d = 0, e; d < this.field.length; d++) {
      e = this.M[d];
      var h = this.index.get(this.field[d]);
      if ("function" === typeof e) {
        (e = e(b)) && h.add(a, e, !1, !0);
      } else {
        var f = e.R;
        if (!f || f(b)) {
          e.constructor === String ? e = ["" + e] : M(e) && (e = [e]), tb(b, e, this.T, 0, h, a, e[0], c);
        }
      }
    }
    if (this.tag) {
      for (d = 0; d < this.L.length; d++) {
        f = this.L[d];
        var g = this.$[d];
        h = this.tag.get(g);
        e = L();
        if ("function" === typeof f) {
          if (f = f(b), !f) {
            continue;
          }
        } else {
          var k = f.R;
          if (k && !k(b)) {
            continue;
          }
          f.constructor === String && (f = "" + f);
          f = xa(b, f);
        }
        if (h && f) {
          for (M(f) && (f = [f]), g = 0, k = void 0; g < f.length; g++) {
            var l = f[g];
            if (!e[l]) {
              e[l] = 1;
              var m;
              (m = h.get(l)) ? k = m : h.set(l, k = []);
              if (!c || !k.includes(a)) {
                if (k.length === Math.pow(2, 31) - 1) {
                  m = new S(k);
                  if (this.fastupdate) {
                    for (var n = x(this.reg.values()), p = n.next(); !p.done; p = n.next()) {
                      p = p.value, p.includes(k) && (p[p.indexOf(k)] = m);
                    }
                  }
                  h.set(l, k = m);
                }
                k.push(a);
                this.fastupdate && ((l = this.reg.get(a)) ? l.push(k) : this.reg.set(a, [k]));
              }
            }
          }
        } else {
          h || console.warn("Tag '" + g + "' was not found");
        }
      }
    }
    if (this.store && (!c || !this.store.has(a))) {
      if (this.H) {
        var q = L();
        for (c = 0; c < this.H.length; c++) {
          if (d = this.H[c], h = d.R, !h || h(b)) {
            h = void 0;
            if ("function" === typeof d) {
              h = d(b);
              if (!h) {
                continue;
              }
              d = [d.la];
            } else if (M(d) || d.constructor === String) {
              q[d] = b[d];
              continue;
            }
            ub(b, q, d, 0, d[0], h);
          }
        }
      }
      this.store.set(a, q || b);
    }
  }
  return this;
};
function ub(a, b, c, d, e, h) {
  a = a[e];
  if (d === c.length - 1) {
    b[e] = h || a;
  } else if (a) {
    if (a.constructor === Array) {
      for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) {
        ub(a, b, c, d, e);
      }
    } else {
      b = b[e] || (b[e] = L()), e = c[++d], ub(a, b, c, d, e);
    }
  }
}
function tb(a, b, c, d, e, h, f, g) {
  if (a = a[f]) {
    if (d === b.length - 1) {
      if (a.constructor === Array) {
        if (c[d]) {
          for (b = 0; b < a.length; b++) {
            e.add(h, a[b], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      e.add(h, a, g, !0);
    } else {
      if (a.constructor === Array) {
        for (f = 0; f < a.length; f++) {
          tb(a, b, c, d, e, h, f, g);
        }
      } else {
        f = b[++d], tb(a, b, c, d, e, h, f, g);
      }
    }
  } else {
    e.db && e.remove(h);
  }
}
;Z.prototype.search = function(a, b, c, d) {
  c || (!b && N(a) ? (c = a, a = "") : N(b) && (c = b, b = 0));
  var e = [], h = [], f = 0;
  if (c) {
    c.constructor === Array && (c = {index:c});
    a = c.query || a;
    var g = c.pluck;
    var k = c.merge;
    var l = g || c.field || c.index;
    var m = this.tag && c.tag;
    var n = this.store && c.enrich;
    var p = c.suggest;
    b = c.limit || b;
    var q = c.offset || 0;
    b || (b = 100);
    if (m && (!this.db || !d)) {
      m.constructor !== Array && (m = [m]);
      for (var r = [], y = 0, v = void 0; y < m.length; y++) {
        v = m[y];
        if (M(v)) {
          throw Error("A tag option can't be a string, instead it needs a { field: tag } format.");
        }
        if (v.field && v.tag) {
          var t = v.tag;
          if (t.constructor === Array) {
            for (var w = 0; w < t.length; w++) {
              r.push(v.field, t[w]);
            }
          } else {
            r.push(v.field, t);
          }
        } else {
          t = Object.keys(v);
          w = 0;
          for (var A = void 0, D = void 0; w < t.length; w++) {
            if (A = t[w], D = v[A], D.constructor === Array) {
              for (var B = 0; B < D.length; B++) {
                r.push(A, D[B]);
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
        h = [];
        if (r.length) {
          for (g = 0; g < r.length; g += 2) {
            p = void 0;
            if (this.db) {
              p = this.index.get(r[g]);
              if (!p) {
                console.warn("Tag '" + r[g] + ":" + r[g + 1] + "' will be skipped because there is no field '" + r[g] + "'.");
                continue;
              }
              h.push(p = p.db.tag(r[g + 1], b, q, n));
            } else {
              p = vb.call(this, r[g], r[g + 1], b, q, n);
            }
            e.push({field:r[g], tag:r[g + 1], result:p});
          }
        }
        return h.length ? Promise.all(h).then(function(O) {
          for (var P = 0; P < O.length; P++) {
            e[P].result = O[P];
          }
          return e;
        }) : e;
      }
    }
    M(l) && (l = [l]);
  }
  l || (l = this.field);
  r = !d && (this.worker || this.db) && [];
  y = 0;
  for (w = v = t = void 0; y < l.length; y++) {
    if (v = l[y], !this.db || !this.tag || this.M[y]) {
      t = void 0;
      M(v) || (t = v, v = t.field, a = t.query || a, b = t.limit || b, p = t.suggest || p);
      if (d) {
        t = d[y];
      } else {
        w = t || c;
        t = this.index.get(v);
        if (m) {
          if (this.db) {
            w.tag = m;
            var E = t.db.support_tag_search;
            w.field = l;
          }
          E || (w.enrich = !1);
        }
        if (r) {
          r[y] = t.searchAsync(a, b, w);
          w && n && (w.enrich = n);
          continue;
        } else {
          t = t.search(a, b, w), w && n && (w.enrich = n);
        }
      }
      w = t && t.length;
      if (m && w) {
        A = [];
        D = 0;
        if (this.db && d) {
          if (!E) {
            for (B = l.length; B < d.length; B++) {
              var J = d[B];
              if (J && J.length) {
                D++, A.push(J);
              } else if (!p) {
                return e;
              }
            }
          }
        } else {
          B = 0;
          for (var Hb = J = void 0; B < m.length; B += 2) {
            J = this.tag.get(m[B]);
            if (!J) {
              if (console.warn("Tag '" + m[B] + ":" + m[B + 1] + "' will be skipped because there is no field '" + m[B] + "'."), p) {
                continue;
              } else {
                return e;
              }
            }
            if (Hb = (J = J && J.get(m[B + 1])) && J.length) {
              D++, A.push(J);
            } else if (!p) {
              return e;
            }
          }
        }
        if (D) {
          t = jb(t, A);
          w = t.length;
          if (!w && !p) {
            return e;
          }
          D--;
        }
      }
      if (w) {
        h[f] = v, e.push(t), f++;
      } else if (1 === l.length) {
        return e;
      }
    }
  }
  if (r) {
    if (this.db && m && m.length && !E) {
      for (n = 0; n < m.length; n += 2) {
        h = this.index.get(m[n]);
        if (!h) {
          if (console.warn("Tag '" + m[n] + ":" + m[n + 1] + "' was not found because there is no field '" + m[n] + "'."), p) {
            continue;
          } else {
            return e;
          }
        }
        r.push(h.db.tag(m[n + 1], b, q, !1));
      }
    }
    var Ib = this;
    return Promise.all(r).then(function(O) {
      return O.length ? Ib.search(a, b, c, O) : O;
    });
  }
  if (!f) {
    return e;
  }
  if (g && (!n || !this.store)) {
    return e[0];
  }
  r = [];
  q = 0;
  for (p = void 0; q < h.length; q++) {
    p = e[q];
    n && p.length && !p[0].doc && (this.db ? r.push(p = this.index.get(this.field[0]).db.enrich(p)) : p.length && (p = wb.call(this, p)));
    if (g) {
      return p;
    }
    e[q] = {field:h[q], result:p};
  }
  return n && this.db && r.length ? Promise.all(r).then(function(O) {
    for (var P = 0; P < O.length; P++) {
      e[P].result = O[P];
    }
    return k ? xb(e, b) : e;
  }) : k ? xb(e, b) : e;
};
function xb(a, b) {
  for (var c = [], d = L(), e = 0, h, f; e < a.length; e++) {
    h = a[e];
    f = h.result;
    for (var g = 0, k, l, m; g < f.length; g++) {
      if (l = f[g], k = l.id, m = d[k]) {
        m.push(h.field);
      } else {
        if (c.length === b) {
          return c;
        }
        l.field = d[k] = [h.field];
        c.push(l);
      }
    }
  }
  return c;
}
function vb(a, b, c, d, e) {
  var h = this.tag.get(a);
  if (!h) {
    return console.warn("Tag '" + a + "' was not found"), [];
  }
  if ((a = (h = h && h.get(b)) && h.length - d) && 0 < a) {
    if (a > c || d) {
      h = h.slice(d, d + c);
    }
    e && (h = wb.call(this, h));
    return h;
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
  this.M = [];
  this.field = [];
  this.T = [];
  this.key = (c = b.key || b.id) && yb(c, this.T) || "id";
  (d = a.keystore || 0) && (this.keystore = d);
  this.reg = (this.fastupdate = !!a.fastupdate) ? d ? new T(d) : new Map() : d ? new U(d) : new Set();
  this.H = (c = b.store || null) && !0 !== c && [];
  this.store = c && (d ? new T(d) : new Map());
  this.cache = (c = a.cache || null) && new R(c);
  a.cache = !1;
  this.worker = a.worker;
  this.index = zb.call(this, a, b);
  this.tag = null;
  if (c = b.tag) {
    if ("string" === typeof c && (c = [c]), c.length) {
      this.tag = new Map();
      this.L = [];
      this.$ = [];
      b = 0;
      for (var e = d = void 0; b < c.length; b++) {
        d = c[b];
        e = d.field || d;
        if (!e) {
          throw Error("The tag field from the document descriptor is undefined.");
        }
        d.custom ? this.L[b] = d.custom : (this.L[b] = yb(e, this.T), d.filter && ("string" === typeof this.L[b] && (this.L[b] = new String(this.L[b])), this.L[b].R = d.filter));
        this.$[b] = e;
        this.tag.set(e, new Map());
      }
    }
  }
  if (this.worker) {
    a = [];
    c = x(this.index.values());
    for (b = c.next(); !b.done; b = c.next()) {
      b = b.value, b.worker.then && a.push(b.worker);
    }
    if (a.length) {
      var h = this;
      return Promise.all(a).then(function() {
        return h;
      });
    }
  } else {
    a.db && this.mount(a.db);
  }
}
u = Z.prototype;
u.mount = function(a) {
  var b = this.field;
  if (this.tag) {
    for (var c = 0, d; c < this.$.length; c++) {
      d = this.$[c];
      var e;
      this.index.set(d, e = new V({}, this.reg));
      b === this.field && (b = b.slice(0));
      b.push(d);
      e.tag = this.tag.get(d);
    }
  }
  c = [];
  d = {db:a.db, type:a.type, fastupdate:a.fastupdate};
  e = 0;
  for (var h; e < b.length; e++) {
    d.field = h = b[e];
    h = this.index.get(h);
    var f = new a.constructor(a.id, d);
    f.id = a.id;
    c[e] = f.mount(h);
    h.document = !0;
    e ? h.bypass = !0 : h.store = this.store;
  }
  this.db = !0;
  return Promise.all(c);
};
u.commit = function(a, b) {
  var c = this, d, e, h, f;
  return H(function(g) {
    if (1 == g.h) {
      d = [];
      e = x(c.index.values());
      for (h = e.next(); !h.done; h = e.next()) {
        f = h.value, d.push(f.db.commit(f, a, b));
      }
      return F(g, Promise.all(d), 2);
    }
    c.reg.clear();
    g.h = 0;
  });
};
u.destroy = function() {
  for (var a = [], b = x(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    a.push(c.value.destroy());
  }
  return Promise.all(a);
};
function zb(a, b) {
  var c = new Map(), d = b.index || b.field || b;
  M(d) && (d = [d]);
  for (var e = 0, h, f = void 0; e < d.length; e++) {
    h = d[e];
    M(h) || (f = h, h = h.field);
    f = N(f) ? Object.assign({}, a, f) : a;
    if (this.worker) {
      var g = new qb(f);
      g.worker ? c.set(h, g) : this.worker = !1;
    }
    this.worker || c.set(h, new V(f, this.reg));
    f.custom ? this.M[e] = f.custom : (this.M[e] = yb(h, this.T), f.filter && ("string" === typeof this.M[e] && (this.M[e] = new String(this.M[e])), this.M[e].R = f.filter));
    this.field[e] = h;
  }
  if (this.H) {
    for (a = b.store, M(a) && (a = [a]), b = 0; b < a.length; b++) {
      d = a[b], e = d.field || d, d.custom ? (this.H[b] = d.custom, d.custom.la = e) : (this.H[b] = yb(e, this.T), d.filter && ("string" === typeof this.H[b] && (this.H[b] = new String(this.H[b])), this.H[b].R = d.filter));
    }
  }
  return c;
}
function yb(a, b) {
  for (var c = a.split(":"), d = 0, e = 0; e < c.length; e++) {
    a = c[e], "]" === a[a.length - 1] && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
  }
  d < c.length && (c.length = d);
  return 1 < d ? c : c[0];
}
u.append = function(a, b) {
  return this.add(a, b, !0);
};
u.update = function(a, b) {
  return this.remove(a).add(a, b);
};
u.remove = function(a) {
  N(a) && (a = xa(a, this.key));
  for (var b = x(this.index.values()), c = b.next(); !c.done; c = b.next()) {
    c.value.remove(a, !0);
  }
  if (this.reg.has(a)) {
    if (this.tag && !this.fastupdate) {
      for (b = x(this.tag.values()), c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = x(c), e = d.next(); !e.done; e = d.next()) {
          var h = e.value;
          e = h[0];
          h = h[1];
          var f = h.indexOf(a);
          -1 < f && (1 < h.length ? h.splice(f, 1) : c.delete(e));
        }
      }
    }
    this.store && this.store.delete(a);
    this.reg.delete(a);
  }
  this.cache && this.cache.remove(a);
  return this;
};
u.clear = function() {
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
u.contain = function(a) {
  return this.db ? this.index.get(this.field[0]).db.has(a) : this.reg.has(a);
};
u.cleanup = function() {
  for (var a = x(this.index.values()), b = a.next(); !b.done; b = a.next()) {
    b.value.cleanup();
  }
  return this;
};
u.get = function(a) {
  return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(b) {
    return b[0] && b[0].doc;
  }) : this.store.get(a);
};
u.set = function(a, b) {
  this.store.set(a, b);
  return this;
};
u.searchCache = Ga;
u.export = function(a, b, c, d, e, h) {
  var f;
  "undefined" === typeof h && (f = new Promise(function(k) {
    h = k;
  }));
  e || (e = 0);
  d || (d = 0);
  if (d < this.field.length) {
    c = this.field[d];
    var g = this.index[c];
    b = this;
    g.export(a, b, e ? c : "", d, e++, h) || (d++, b.export(a, b, c, d, 1, h));
  } else {
    switch(e) {
      case 1:
        b = "tag";
        g = this.A;
        c = null;
        break;
      case 2:
        b = "store";
        g = this.store;
        c = null;
        break;
      default:
        h();
        return;
    }
    Wa(a, this, c, b, d, e, g, h);
  }
  return f;
};
u.import = function(a, b) {
  if (b) {
    switch(M(b) && (b = JSON.parse(b)), a) {
      case "tag":
        this.A = b;
        break;
      case "reg":
        this.fastupdate = !1;
        this.reg = b;
        a = 0;
        for (var c; a < this.field.length; a++) {
          c = this.index[this.field[a]], c.reg = b, c.fastupdate = !1;
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
Ya(Z.prototype);
var Ab = "undefined" !== typeof window && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), Bb = ["map", "ctx", "tag", "reg", "cfg"];
function Cb(a, b) {
  b = void 0 === b ? {} : b;
  if (!this) {
    return new Cb(a, b);
  }
  "object" === typeof a && (b = a = a.name);
  a || console.info("Default storage space was used, because a name was not passed.");
  this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
  this.field = b.field ? b.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
  this.support_tag_search = !1;
  this.db = null;
  this.h = {};
}
u = Cb.prototype;
u.mount = function(a) {
  if (!a.encoder) {
    return a.mount(this);
  }
  a.db = this;
  return this.open();
};
u.open = function() {
  var a = this;
  navigator.storage && navigator.storage.persist();
  return this.db || new Promise(function(b, c) {
    var d = Ab.open(a.id + (a.field ? ":" + a.field : ""), 1);
    d.onupgradeneeded = function() {
      var e = a.db = this.result;
      Bb.forEach(function(h) {
        e.objectStoreNames.contains(h) || e.createObjectStore(h);
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
};
u.close = function() {
  this.db.close();
  this.db = null;
};
u.destroy = function() {
  return Ab.deleteDatabase(this.id + (this.field ? ":" + this.field : ""));
};
u.clear = function() {
  for (var a = this.db.transaction(Bb, "readwrite"), b = 0; b < Bb.length; b++) {
    a.objectStore(Bb[b]).clear();
  }
  return Db(a);
};
u.get = function(a, b, c, d, e, h) {
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  e = void 0 === e ? !0 : e;
  h = void 0 === h ? !1 : h;
  console.log("!!!!!!!!!!!");
  a = this.db.transaction(b ? "ctx" : "map", "readonly").objectStore(b ? "ctx" : "map").get(b ? b + ":" + a : a);
  var f = this;
  return Db(a).then(function(g) {
    var k = [];
    if (!g || !g.length) {
      return k;
    }
    if (e) {
      if (!c && !d && 1 === g.length) {
        return g[0];
      }
      for (var l = 0, m = void 0; l < g.length; l++) {
        if ((m = g[l]) && m.length) {
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
      return h ? f.enrich(k) : k;
    }
    return g;
  });
};
u.tag = function(a, b, c, d) {
  b = void 0 === b ? 0 : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? !1 : d;
  a = this.db.transaction("tag", "readonly").objectStore("tag").get(a);
  var e = this;
  return Db(a).then(function(h) {
    if (!h || !h.length || c >= h.length) {
      return [];
    }
    if (!b && !c) {
      return h;
    }
    h = h.slice(c, c + b);
    return d ? e.enrich(h) : h;
  });
};
u.enrich = function(a) {
  "object" !== typeof a && (a = [a]);
  for (var b = this.db.transaction("reg", "readonly").objectStore("reg"), c = [], d = 0; d < a.length; d++) {
    c[d] = Db(b.get(a[d]));
  }
  return Promise.all(c).then(function(e) {
    for (var h = 0; h < e.length; h++) {
      e[h] = {id:a[h], doc:e[h] ? JSON.parse(e[h]) : null};
    }
    return e;
  });
};
u.has = function(a) {
  a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
  return Db(a);
};
u.search = null;
u.info = function() {
};
u.transaction = function(a, b, c) {
  var d = this, e = this.h[a + ":" + b];
  if (e) {
    return c.call(this, e);
  }
  var h = this.db.transaction(a, b);
  this.h[a + ":" + b] = e = h.objectStore(a);
  return new Promise(function(f, g) {
    h.onerror = function(k) {
      d.h[a + ":" + b] = null;
      h.abort();
      h = e = null;
      g(k);
    };
    h.oncomplete = function(k) {
      h = e = d.h[a + ":" + b] = null;
      f(k || !0);
    };
    return c.call(d, e);
  });
};
u.commit = function(a, b, c) {
  var d = this, e, h, f;
  return H(function(g) {
    switch(g.h) {
      case 1:
        if (b) {
          return F(g, d.clear(), 12);
        }
        e = a.commit_task;
        a.commit_task = [];
        h = 0;
        f = void 0;
      case 4:
        if (!(h < e.length)) {
          g.h = 6;
          break;
        }
        f = e[h];
        if (!f.clear) {
          e[h] = f.oa;
          g.h = 5;
          break;
        }
        return F(g, d.clear(), 8);
      case 8:
        b = !0;
        g.h = 6;
        break;
      case 5:
        h++;
        g.h = 4;
        break;
      case 6:
        if (b) {
          g.h = 3;
          break;
        }
        c || (e = e.concat(wa(a.reg)));
        if (!e.length) {
          g.h = 10;
          break;
        }
        return F(g, d.remove(e), 11);
      case 11:
      case 10:
        g.h = 3;
        break;
      case 12:
        a.commit_task = [];
      case 3:
        return a.reg.size ? F(g, d.transaction("map", "readwrite", function(k) {
          for (var l = x(a.map), m = l.next(), n = {}; !m.done; n = {O:void 0, Y:void 0}, m = l.next()) {
            m = m.value, n.Y = m[0], n.O = m[1], n.O.length && (b ? k.put(n.O, n.Y) : k.get(n.Y).onsuccess = function(p) {
              return function() {
                var q = this.result, r;
                if (q && q.length) {
                  for (var y = Math.max(q.length, p.O.length), v = 0, t; v < y; v++) {
                    if ((t = p.O[v]) && t.length) {
                      if ((r = q[v]) && r.length) {
                        for (var w = 0; w < t.length; w++) {
                          r.push(t[w]);
                        }
                      } else {
                        q[v] = t;
                      }
                      r = 1;
                    }
                  }
                } else {
                  q = p.O, r = 1;
                }
                r && k.put(q, p.Y);
              };
            }(n));
          }
        }), 13) : g.return();
      case 13:
        return F(g, d.transaction("ctx", "readwrite", function(k) {
          for (var l = x(a.ctx), m = l.next(), n = {}; !m.done; n = {W:void 0}, m = l.next()) {
            m = m.value;
            n.W = m[0];
            m = x(m[1]);
            for (var p = m.next(), q = {}; !p.done; q = {P:void 0, Z:void 0}, p = m.next()) {
              p = p.value, q.Z = p[0], q.P = p[1], q.P.length && (b ? k.put(q.P, n.W + ":" + q.Z) : k.get(n.W + ":" + q.Z).onsuccess = function(r, y) {
                return function() {
                  var v = this.result, t;
                  if (v && v.length) {
                    for (var w = Math.max(v.length, r.P.length), A = 0, D; A < w; A++) {
                      if ((D = r.P[A]) && D.length) {
                        if ((t = v[A]) && t.length) {
                          for (var B = 0; B < D.length; B++) {
                            t.push(D[B]);
                          }
                        } else {
                          v[A] = D;
                        }
                        t = 1;
                      }
                    }
                  } else {
                    v = r.P, t = 1;
                  }
                  t && k.put(v, y.W + ":" + r.Z);
                };
              }(q, n));
            }
          }
        }), 14);
      case 14:
        if (a.store) {
          return F(g, d.transaction("reg", "readwrite", function(k) {
            for (var l = x(a.store), m = l.next(); !m.done; m = l.next()) {
              var n = m.value;
              m = n[0];
              n = n[1];
              k.put("object" === typeof n ? JSON.stringify(n) : 1, m);
            }
          }), 16);
        }
        if (a.bypass) {
          g.h = 16;
          break;
        }
        return F(g, d.transaction("reg", "readwrite", function(k) {
          for (var l = x(a.reg.keys()), m = l.next(); !m.done; m = l.next()) {
            k.put(1, m.value);
          }
        }), 16);
      case 16:
        if (!a.tag) {
          g.h = 20;
          break;
        }
        return F(g, d.transaction("tag", "readwrite", function(k) {
          for (var l = x(a.tag), m = l.next(), n = {}; !m.done; n = {X:void 0, ba:void 0}, m = l.next()) {
            m = m.value, n.ba = m[0], n.X = m[1], n.X.length && (k.get(n.ba).onsuccess = function(p) {
              return function() {
                var q = this.result;
                q = q && q.length ? q.concat(p.X) : p.X;
                k.put(q, p.ba);
              };
            }(n));
          }
        }), 20);
      case 20:
        a.map.clear(), a.ctx.clear(), a.tag && a.tag.clear(), a.store && a.store.clear(), a.document || a.reg.clear(), g.h = 0;
    }
  });
};
function Eb(a, b, c) {
  for (var d = a.value, e, h, f = 0, g = 0, k; g < d.length; g++) {
    if (k = c ? d : d[g]) {
      for (var l = 0, m, n; l < b.length; l++) {
        if (n = b[l], m = k.indexOf(h ? parseInt(n, 10) : n), 0 > m && !h && "string" === typeof n && !isNaN(n) && (m = k.indexOf(parseInt(n, 10))) && (h = 1), 0 <= m) {
          if (e = 1, 1 < k.length) {
            k.splice(m, 1);
          } else {
            d[g] = [];
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
u.remove = function(a) {
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
;var Fb = {Index:V, Charset:Pa, Encoder:Q, Document:Z, Worker:qb, Resolver:X, IndexedDB:Cb, Language:{}}, Gb = self, Jb;
(Jb = Gb.define) && Jb.amd ? Jb([], function() {
  return Fb;
}) : "object" === typeof Gb.exports ? Gb.exports = Fb : Gb.FlexSearch = Fb;
}(this));
