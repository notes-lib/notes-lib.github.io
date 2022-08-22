(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const l of s)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const l = {};
    return (
      s.integrity && (l.integrity = s.integrity),
      s.referrerpolicy && (l.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (l.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const l = n(s);
    fetch(s.href, l);
  }
})();
function Jr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const Ra =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  wa = Jr(Ra);
function Gl(e) {
  return !!e || e === "";
}
function Qr(e) {
  if (X(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = Re(r) ? Fa(r) : Qr(r);
      if (s) for (const l in s) t[l] = s[l];
    }
    return t;
  } else {
    if (Re(e)) return e;
    if (Ne(e)) return e;
  }
}
const ka = /;(?![^(]*\))/g,
  Sa = /:(.+)/;
function Fa(e) {
  const t = {};
  return (
    e.split(ka).forEach((n) => {
      if (n) {
        const r = n.split(Sa);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function zr(e) {
  let t = "";
  if (Re(e)) t = e;
  else if (X(e))
    for (let n = 0; n < e.length; n++) {
      const r = zr(e[n]);
      r && (t += r + " ");
    }
  else if (Ne(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const an = (e) =>
    Re(e)
      ? e
      : e == null
      ? ""
      : X(e) || (Ne(e) && (e.toString === Ql || !J(e.toString)))
      ? JSON.stringify(e, Xl, 2)
      : String(e),
  Xl = (e, t) =>
    t && t.__v_isRef
      ? Xl(e, t.value)
      : Xt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : ql(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Ne(t) && !X(t) && !zl(t)
      ? String(t)
      : t,
  _e = {},
  Gt = [],
  ze = () => {},
  Ma = () => !1,
  xa = /^on[^a-z]/,
  Yn = (e) => xa.test(e),
  Zr = (e) => e.startsWith("onUpdate:"),
  ke = Object.assign,
  es = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Da = Object.prototype.hasOwnProperty,
  le = (e, t) => Da.call(e, t),
  X = Array.isArray,
  Xt = (e) => Gn(e) === "[object Map]",
  ql = (e) => Gn(e) === "[object Set]",
  J = (e) => typeof e == "function",
  Re = (e) => typeof e == "string",
  ts = (e) => typeof e == "symbol",
  Ne = (e) => e !== null && typeof e == "object",
  Jl = (e) => Ne(e) && J(e.then) && J(e.catch),
  Ql = Object.prototype.toString,
  Gn = (e) => Ql.call(e),
  $a = (e) => Gn(e).slice(8, -1),
  zl = (e) => Gn(e) === "[object Object]",
  ns = (e) =>
    Re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  xn = Jr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Xn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ua = /-(\w)/g,
  Qt = Xn((e) => e.replace(Ua, (t, n) => (n ? n.toUpperCase() : ""))),
  Ha = /\B([A-Z])/g,
  rn = Xn((e) => e.replace(Ha, "-$1").toLowerCase()),
  Zl = Xn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  fr = Xn((e) => (e ? `on${Zl(e)}` : "")),
  vn = (e, t) => !Object.is(e, t),
  dr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Hn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Wa = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ws;
const Va = () =>
  ws ||
  (ws =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let rt;
class eo {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        rt &&
        ((this.parent = rt),
        (this.index = (rt.scopes || (rt.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active) {
      const n = rt;
      try {
        return (rt = this), t();
      } finally {
        rt = n;
      }
    }
  }
  on() {
    rt = this;
  }
  off() {
    rt = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      this.active = !1;
    }
  }
}
function to(e) {
  return new eo(e);
}
function ja(e, t = rt) {
  t && t.active && t.effects.push(e);
}
const rs = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  no = (e) => (e.w & Nt) > 0,
  ro = (e) => (e.n & Nt) > 0,
  Ba = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Nt;
  },
  Ka = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        no(s) && !ro(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Nt),
          (s.n &= ~Nt);
      }
      t.length = n;
    }
  },
  yr = new WeakMap();
let fn = 0,
  Nt = 1;
const Lr = 30;
let Je;
const xt = Symbol(""),
  Tr = Symbol("");
class ss {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      ja(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Je,
      n = It;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Je),
        (Je = this),
        (It = !0),
        (Nt = 1 << ++fn),
        fn <= Lr ? Ba(this) : ks(this),
        this.fn()
      );
    } finally {
      fn <= Lr && Ka(this),
        (Nt = 1 << --fn),
        (Je = this.parent),
        (It = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Je === this
      ? (this.deferStop = !0)
      : this.active &&
        (ks(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ks(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let It = !0;
const so = [];
function sn() {
  so.push(It), (It = !1);
}
function ln() {
  const e = so.pop();
  It = e === void 0 ? !0 : e;
}
function Ve(e, t, n) {
  if (It && Je) {
    let r = yr.get(e);
    r || yr.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = rs())), lo(s);
  }
}
function lo(e, t) {
  let n = !1;
  fn <= Lr ? ro(e) || ((e.n |= Nt), (n = !no(e))) : (n = !e.has(Je)),
    n && (e.add(Je), Je.deps.push(e));
}
function _t(e, t, n, r, s, l) {
  const o = yr.get(e);
  if (!o) return;
  let u = [];
  if (t === "clear") u = [...o.values()];
  else if (n === "length" && X(e))
    o.forEach((c, f) => {
      (f === "length" || f >= r) && u.push(c);
    });
  else
    switch ((n !== void 0 && u.push(o.get(n)), t)) {
      case "add":
        X(e)
          ? ns(n) && u.push(o.get("length"))
          : (u.push(o.get(xt)), Xt(e) && u.push(o.get(Tr)));
        break;
      case "delete":
        X(e) || (u.push(o.get(xt)), Xt(e) && u.push(o.get(Tr)));
        break;
      case "set":
        Xt(e) && u.push(o.get(xt));
        break;
    }
  if (u.length === 1) u[0] && Ir(u[0]);
  else {
    const c = [];
    for (const f of u) f && c.push(...f);
    Ir(rs(c));
  }
}
function Ir(e, t) {
  const n = X(e) ? e : [...e];
  for (const r of n) r.computed && Ss(r);
  for (const r of n) r.computed || Ss(r);
}
function Ss(e, t) {
  (e !== Je || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Ya = Jr("__proto__,__v_isRef,__isVue"),
  oo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(ts)
  ),
  Ga = ls(),
  Xa = ls(!1, !0),
  qa = ls(!0),
  Fs = Ja();
function Ja() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = ie(this);
        for (let l = 0, o = this.length; l < o; l++) Ve(r, "get", l + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(ie)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        sn();
        const r = ie(this)[t].apply(this, n);
        return ln(), r;
      };
    }),
    e
  );
}
function ls(e = !1, t = !1) {
  return function (r, s, l) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && l === (e ? (t ? di : fo) : t ? uo : co).get(r))
      return r;
    const o = X(r);
    if (!e && o && le(Fs, s)) return Reflect.get(Fs, s, l);
    const u = Reflect.get(r, s, l);
    return (ts(s) ? oo.has(s) : Ya(s)) || (e || Ve(r, "get", s), t)
      ? u
      : Pe(u)
      ? o && ns(s)
        ? u
        : u.value
      : Ne(u)
      ? e
        ? mo(u)
        : On(u)
      : u;
  };
}
const Qa = ao(),
  za = ao(!0);
function ao(e = !1) {
  return function (n, r, s, l) {
    let o = n[r];
    if (yn(o) && Pe(o) && !Pe(s)) return !1;
    if (
      !e &&
      !yn(s) &&
      (Cr(s) || ((s = ie(s)), (o = ie(o))), !X(n) && Pe(o) && !Pe(s))
    )
      return (o.value = s), !0;
    const u = X(n) && ns(r) ? Number(r) < n.length : le(n, r),
      c = Reflect.set(n, r, s, l);
    return (
      n === ie(l) && (u ? vn(s, o) && _t(n, "set", r, s) : _t(n, "add", r, s)),
      c
    );
  };
}
function Za(e, t) {
  const n = le(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && _t(e, "delete", t, void 0), r;
}
function ei(e, t) {
  const n = Reflect.has(e, t);
  return (!ts(t) || !oo.has(t)) && Ve(e, "has", t), n;
}
function ti(e) {
  return Ve(e, "iterate", X(e) ? "length" : xt), Reflect.ownKeys(e);
}
const io = { get: Ga, set: Qa, deleteProperty: Za, has: ei, ownKeys: ti },
  ni = {
    get: qa,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ri = ke({}, io, { get: Xa, set: za }),
  os = (e) => e,
  qn = (e) => Reflect.getPrototypeOf(e);
function Rn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = ie(e),
    l = ie(t);
  n || (t !== l && Ve(s, "get", t), Ve(s, "get", l));
  const { has: o } = qn(s),
    u = r ? os : n ? us : Ln;
  if (o.call(s, t)) return u(e.get(t));
  if (o.call(s, l)) return u(e.get(l));
  e !== s && e.get(t);
}
function wn(e, t = !1) {
  const n = this.__v_raw,
    r = ie(n),
    s = ie(e);
  return (
    t || (e !== s && Ve(r, "has", e), Ve(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function kn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ve(ie(e), "iterate", xt), Reflect.get(e, "size", e)
  );
}
function Ms(e) {
  e = ie(e);
  const t = ie(this);
  return qn(t).has.call(t, e) || (t.add(e), _t(t, "add", e, e)), this;
}
function xs(e, t) {
  t = ie(t);
  const n = ie(this),
    { has: r, get: s } = qn(n);
  let l = r.call(n, e);
  l || ((e = ie(e)), (l = r.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), l ? vn(t, o) && _t(n, "set", e, t) : _t(n, "add", e, t), this
  );
}
function Ds(e) {
  const t = ie(this),
    { has: n, get: r } = qn(t);
  let s = n.call(t, e);
  s || ((e = ie(e)), (s = n.call(t, e))), r && r.call(t, e);
  const l = t.delete(e);
  return s && _t(t, "delete", e, void 0), l;
}
function $s() {
  const e = ie(this),
    t = e.size !== 0,
    n = e.clear();
  return t && _t(e, "clear", void 0, void 0), n;
}
function Sn(e, t) {
  return function (r, s) {
    const l = this,
      o = l.__v_raw,
      u = ie(o),
      c = t ? os : e ? us : Ln;
    return (
      !e && Ve(u, "iterate", xt), o.forEach((f, d) => r.call(s, c(f), c(d), l))
    );
  };
}
function Fn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      l = ie(s),
      o = Xt(l),
      u = e === "entries" || (e === Symbol.iterator && o),
      c = e === "keys" && o,
      f = s[e](...r),
      d = n ? os : t ? us : Ln;
    return (
      !t && Ve(l, "iterate", c ? Tr : xt),
      {
        next() {
          const { value: _, done: h } = f.next();
          return h
            ? { value: _, done: h }
            : { value: u ? [d(_[0]), d(_[1])] : d(_), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function pt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function si() {
  const e = {
      get(l) {
        return Rn(this, l);
      },
      get size() {
        return kn(this);
      },
      has: wn,
      add: Ms,
      set: xs,
      delete: Ds,
      clear: $s,
      forEach: Sn(!1, !1),
    },
    t = {
      get(l) {
        return Rn(this, l, !1, !0);
      },
      get size() {
        return kn(this);
      },
      has: wn,
      add: Ms,
      set: xs,
      delete: Ds,
      clear: $s,
      forEach: Sn(!1, !0),
    },
    n = {
      get(l) {
        return Rn(this, l, !0);
      },
      get size() {
        return kn(this, !0);
      },
      has(l) {
        return wn.call(this, l, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: Sn(!0, !1),
    },
    r = {
      get(l) {
        return Rn(this, l, !0, !0);
      },
      get size() {
        return kn(this, !0);
      },
      has(l) {
        return wn.call(this, l, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: Sn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((l) => {
      (e[l] = Fn(l, !1, !1)),
        (n[l] = Fn(l, !0, !1)),
        (t[l] = Fn(l, !1, !0)),
        (r[l] = Fn(l, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [li, oi, ai, ii] = si();
function as(e, t) {
  const n = t ? (e ? ii : ai) : e ? oi : li;
  return (r, s, l) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(le(n, s) && s in r ? n : r, s, l);
}
const ci = { get: as(!1, !1) },
  ui = { get: as(!1, !0) },
  fi = { get: as(!0, !1) },
  co = new WeakMap(),
  uo = new WeakMap(),
  fo = new WeakMap(),
  di = new WeakMap();
function mi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : mi($a(e));
}
function On(e) {
  return yn(e) ? e : is(e, !1, io, ci, co);
}
function _i(e) {
  return is(e, !1, ri, ui, uo);
}
function mo(e) {
  return is(e, !0, ni, fi, fo);
}
function is(e, t, n, r, s) {
  if (!Ne(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const l = s.get(e);
  if (l) return l;
  const o = hi(e);
  if (o === 0) return e;
  const u = new Proxy(e, o === 2 ? r : n);
  return s.set(e, u), u;
}
function qt(e) {
  return yn(e) ? qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function yn(e) {
  return !!(e && e.__v_isReadonly);
}
function Cr(e) {
  return !!(e && e.__v_isShallow);
}
function ho(e) {
  return qt(e) || yn(e);
}
function ie(e) {
  const t = e && e.__v_raw;
  return t ? ie(t) : e;
}
function cs(e) {
  return Hn(e, "__v_skip", !0), e;
}
const Ln = (e) => (Ne(e) ? On(e) : e),
  us = (e) => (Ne(e) ? mo(e) : e);
function _o(e) {
  It && Je && ((e = ie(e)), lo(e.dep || (e.dep = rs())));
}
function go(e, t) {
  (e = ie(e)), e.dep && Ir(e.dep);
}
function Pe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ge(e) {
  return bo(e, !1);
}
function po(e) {
  return bo(e, !0);
}
function bo(e, t) {
  return Pe(e) ? e : new gi(e, t);
}
class gi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ie(t)),
      (this._value = n ? t : Ln(t));
  }
  get value() {
    return _o(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : ie(t)),
      vn(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : Ln(t)),
        go(this));
  }
}
function Dt(e) {
  return Pe(e) ? e.value : e;
}
const pi = {
  get: (e, t, n) => Dt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return Pe(s) && !Pe(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Eo(e) {
  return qt(e) ? e : new Proxy(e, pi);
}
class bi {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new ss(t, () => {
        this._dirty || ((this._dirty = !0), go(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ie(this);
    return (
      _o(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ei(e, t, n = !1) {
  let r, s;
  const l = J(e);
  return (
    l ? ((r = e), (s = ze)) : ((r = e.get), (s = e.set)),
    new bi(r, s, l || !s, n)
  );
}
function Ct(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (l) {
    Jn(l, t, n);
  }
  return s;
}
function Xe(e, t, n, r) {
  if (J(e)) {
    const l = Ct(e, t, n, r);
    return (
      l &&
        Jl(l) &&
        l.catch((o) => {
          Jn(o, t, n);
        }),
      l
    );
  }
  const s = [];
  for (let l = 0; l < e.length; l++) s.push(Xe(e[l], t, n, r));
  return s;
}
function Jn(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let l = t.parent;
    const o = t.proxy,
      u = n;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let d = 0; d < f.length; d++) if (f[d](e, o, u) === !1) return;
      }
      l = l.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Ct(c, null, 10, [e, o, u]);
      return;
    }
  }
  vi(e, n, s, r);
}
function vi(e, t, n, r = !0) {
  console.error(e);
}
let Wn = !1,
  Nr = !1;
const We = [];
let dt = 0;
const mn = [];
let dn = null,
  Wt = 0;
const hn = [];
let yt = null,
  Vt = 0;
const vo = Promise.resolve();
let fs = null,
  Ar = null;
function yo(e) {
  const t = fs || vo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yi(e) {
  let t = dt + 1,
    n = We.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Tn(We[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Lo(e) {
  (!We.length || !We.includes(e, Wn && e.allowRecurse ? dt + 1 : dt)) &&
    e !== Ar &&
    (e.id == null ? We.push(e) : We.splice(yi(e.id), 0, e), To());
}
function To() {
  !Wn && !Nr && ((Nr = !0), (fs = vo.then(No)));
}
function Li(e) {
  const t = We.indexOf(e);
  t > dt && We.splice(t, 1);
}
function Io(e, t, n, r) {
  X(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    To();
}
function Ti(e) {
  Io(e, dn, mn, Wt);
}
function Ii(e) {
  Io(e, yt, hn, Vt);
}
function Qn(e, t = null) {
  if (mn.length) {
    for (
      Ar = t, dn = [...new Set(mn)], mn.length = 0, Wt = 0;
      Wt < dn.length;
      Wt++
    )
      dn[Wt]();
    (dn = null), (Wt = 0), (Ar = null), Qn(e, t);
  }
}
function Co(e) {
  if ((Qn(), hn.length)) {
    const t = [...new Set(hn)];
    if (((hn.length = 0), yt)) {
      yt.push(...t);
      return;
    }
    for (yt = t, yt.sort((n, r) => Tn(n) - Tn(r)), Vt = 0; Vt < yt.length; Vt++)
      yt[Vt]();
    (yt = null), (Vt = 0);
  }
}
const Tn = (e) => (e.id == null ? 1 / 0 : e.id);
function No(e) {
  (Nr = !1), (Wn = !0), Qn(e), We.sort((n, r) => Tn(n) - Tn(r));
  const t = ze;
  try {
    for (dt = 0; dt < We.length; dt++) {
      const n = We[dt];
      n && n.active !== !1 && Ct(n, null, 14);
    }
  } finally {
    (dt = 0),
      (We.length = 0),
      Co(),
      (Wn = !1),
      (fs = null),
      (We.length || mn.length || hn.length) && No(e);
  }
}
function Ci(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || _e;
  let s = n;
  const l = t.startsWith("update:"),
    o = l && t.slice(7);
  if (o && o in r) {
    const d = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: _, trim: h } = r[d] || _e;
    h && (s = n.map((E) => E.trim())), _ && (s = n.map(Wa));
  }
  let u,
    c = r[(u = fr(t))] || r[(u = fr(Qt(t)))];
  !c && l && (c = r[(u = fr(rn(t)))]), c && Xe(c, e, 6, s);
  const f = r[u + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[u]) return;
    (e.emitted[u] = !0), Xe(f, e, 6, s);
  }
}
function Ao(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const l = e.emits;
  let o = {},
    u = !1;
  if (!J(e)) {
    const c = (f) => {
      const d = Ao(f, t, !0);
      d && ((u = !0), ke(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !l && !u
    ? (r.set(e, null), null)
    : (X(l) ? l.forEach((c) => (o[c] = null)) : ke(o, l), r.set(e, o), o);
}
function zn(e, t) {
  return !e || !Yn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      le(e, t[0].toLowerCase() + t.slice(1)) || le(e, rn(t)) || le(e, t));
}
let ot = null,
  Zn = null;
function Vn(e) {
  const t = ot;
  return (ot = e), (Zn = (e && e.type.__scopeId) || null), t;
}
function ds(e) {
  Zn = e;
}
function ms() {
  Zn = null;
}
function Ni(e, t = ot, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Xs(-1);
    const l = Vn(t),
      o = e(...s);
    return Vn(l), r._d && Xs(1), o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function mr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: l,
    propsOptions: [o],
    slots: u,
    attrs: c,
    emit: f,
    render: d,
    renderCache: _,
    data: h,
    setupState: E,
    ctx: N,
    inheritAttrs: A,
  } = e;
  let C, g;
  const y = Vn(e);
  try {
    if (n.shapeFlag & 4) {
      const L = s || r;
      (C = st(d.call(L, L, _, l, E, h, N))), (g = c);
    } else {
      const L = t;
      (C = st(
        L.length > 1 ? L(l, { attrs: c, slots: u, emit: f }) : L(l, null)
      )),
        (g = t.props ? c : Ai(c));
    }
  } catch (L) {
    (_n.length = 0), Jn(L, e, 1), (C = fe(ht));
  }
  let R = C;
  if (g && A !== !1) {
    const L = Object.keys(g),
      { shapeFlag: I } = R;
    L.length && I & 7 && (o && L.some(Zr) && (g = Oi(g, o)), (R = At(R, g)));
  }
  return (
    n.dirs && ((R = At(R)), (R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (R.transition = n.transition),
    (C = R),
    Vn(y),
    C
  );
}
const Ai = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Yn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Oi = (e, t) => {
    const n = {};
    for (const r in e) (!Zr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Pi(e, t, n) {
  const { props: r, children: s, component: l } = e,
    { props: o, children: u, patchFlag: c } = t,
    f = l.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Us(r, o, f) : !!o;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let _ = 0; _ < d.length; _++) {
        const h = d[_];
        if (o[h] !== r[h] && !zn(f, h)) return !0;
      }
    }
  } else
    return (s || u) && (!u || !u.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? Us(r, o, f)
        : !0
      : !!o;
  return !1;
}
function Us(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    if (t[l] !== e[l] && !zn(n, l)) return !0;
  }
  return !1;
}
function Ri({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const wi = (e) => e.__isSuspense;
function ki(e, t) {
  t && t.pendingBranch
    ? X(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Ii(e);
}
function Dn(e, t) {
  if (Oe) {
    let n = Oe.provides;
    const r = Oe.parent && Oe.parent.provides;
    r === n && (n = Oe.provides = Object.create(r)), (n[e] = t);
  }
}
function mt(e, t, n = !1) {
  const r = Oe || ot;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && J(t) ? t.call(r.proxy) : t;
  }
}
const Hs = {};
function Jt(e, t, n) {
  return Oo(e, t, n);
}
function Oo(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: l, onTrigger: o } = _e
) {
  const u = Oe;
  let c,
    f = !1,
    d = !1;
  if (
    (Pe(e)
      ? ((c = () => e.value), (f = Cr(e)))
      : qt(e)
      ? ((c = () => e), (r = !0))
      : X(e)
      ? ((d = !0),
        (f = e.some((g) => qt(g) || Cr(g))),
        (c = () =>
          e.map((g) => {
            if (Pe(g)) return g.value;
            if (qt(g)) return Bt(g);
            if (J(g)) return Ct(g, u, 2);
          })))
      : J(e)
      ? t
        ? (c = () => Ct(e, u, 2))
        : (c = () => {
            if (!(u && u.isUnmounted)) return _ && _(), Xe(e, u, 3, [h]);
          })
      : (c = ze),
    t && r)
  ) {
    const g = c;
    c = () => Bt(g());
  }
  let _,
    h = (g) => {
      _ = C.onStop = () => {
        Ct(g, u, 4);
      };
    };
  if (Cn)
    return (h = ze), t ? n && Xe(t, u, 3, [c(), d ? [] : void 0, h]) : c(), ze;
  let E = d ? [] : Hs;
  const N = () => {
    if (!!C.active)
      if (t) {
        const g = C.run();
        (r || f || (d ? g.some((y, R) => vn(y, E[R])) : vn(g, E))) &&
          (_ && _(), Xe(t, u, 3, [g, E === Hs ? void 0 : E, h]), (E = g));
      } else C.run();
  };
  N.allowRecurse = !!t;
  let A;
  s === "sync"
    ? (A = N)
    : s === "post"
    ? (A = () => $e(N, u && u.suspense))
    : (A = () => Ti(N));
  const C = new ss(c, A);
  return (
    t
      ? n
        ? N()
        : (E = C.run())
      : s === "post"
      ? $e(C.run.bind(C), u && u.suspense)
      : C.run(),
    () => {
      C.stop(), u && u.scope && es(u.scope.effects, C);
    }
  );
}
function Si(e, t, n) {
  const r = this.proxy,
    s = Re(e) ? (e.includes(".") ? Po(r, e) : () => r[e]) : e.bind(r, r);
  let l;
  J(t) ? (l = t) : ((l = t.handler), (n = t));
  const o = Oe;
  Zt(this);
  const u = Oo(s, l.bind(r), n);
  return o ? Zt(o) : $t(), u;
}
function Po(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function Bt(e, t) {
  if (!Ne(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Pe(e))) Bt(e.value, t);
  else if (X(e)) for (let n = 0; n < e.length; n++) Bt(e[n], t);
  else if (ql(e) || Xt(e))
    e.forEach((n) => {
      Bt(n, t);
    });
  else if (zl(e)) for (const n in e) Bt(e[n], t);
  return e;
}
function Fi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    hs(() => {
      e.isMounted = !0;
    }),
    Mo(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ye = [Function, Array],
  Mi = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ye,
      onEnter: Ye,
      onAfterEnter: Ye,
      onEnterCancelled: Ye,
      onBeforeLeave: Ye,
      onLeave: Ye,
      onAfterLeave: Ye,
      onLeaveCancelled: Ye,
      onBeforeAppear: Ye,
      onAppear: Ye,
      onAfterAppear: Ye,
      onAppearCancelled: Ye,
    },
    setup(e, { slots: t }) {
      const n = zt(),
        r = Fi();
      let s;
      return () => {
        const l = t.default && wo(t.default(), !0);
        if (!l || !l.length) return;
        let o = l[0];
        if (l.length > 1) {
          for (const A of l)
            if (A.type !== ht) {
              o = A;
              break;
            }
        }
        const u = ie(e),
          { mode: c } = u;
        if (r.isLeaving) return hr(o);
        const f = Ws(o);
        if (!f) return hr(o);
        const d = Or(f, u, r, n);
        Pr(f, d);
        const _ = n.subTree,
          h = _ && Ws(_);
        let E = !1;
        const { getTransitionKey: N } = f.type;
        if (N) {
          const A = N();
          s === void 0 ? (s = A) : A !== s && ((s = A), (E = !0));
        }
        if (h && h.type !== ht && (!Ft(f, h) || E)) {
          const A = Or(h, u, r, n);
          if ((Pr(h, A), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (A.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              hr(o)
            );
          c === "in-out" &&
            f.type !== ht &&
            (A.delayLeave = (C, g, y) => {
              const R = Ro(r, h);
              (R[String(h.key)] = h),
                (C._leaveCb = () => {
                  g(), (C._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = y);
            });
        }
        return o;
      };
    },
  },
  xi = Mi;
function Ro(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Or(e, t, n, r) {
  const {
      appear: s,
      mode: l,
      persisted: o = !1,
      onBeforeEnter: u,
      onEnter: c,
      onAfterEnter: f,
      onEnterCancelled: d,
      onBeforeLeave: _,
      onLeave: h,
      onAfterLeave: E,
      onLeaveCancelled: N,
      onBeforeAppear: A,
      onAppear: C,
      onAfterAppear: g,
      onAppearCancelled: y,
    } = t,
    R = String(e.key),
    L = Ro(n, e),
    I = (V, j) => {
      V && Xe(V, r, 9, j);
    },
    S = (V, j) => {
      const q = j[1];
      I(V, j),
        X(V) ? V.every((oe) => oe.length <= 1) && q() : V.length <= 1 && q();
    },
    D = {
      mode: l,
      persisted: o,
      beforeEnter(V) {
        let j = u;
        if (!n.isMounted)
          if (s) j = A || u;
          else return;
        V._leaveCb && V._leaveCb(!0);
        const q = L[R];
        q && Ft(e, q) && q.el._leaveCb && q.el._leaveCb(), I(j, [V]);
      },
      enter(V) {
        let j = c,
          q = f,
          oe = d;
        if (!n.isMounted)
          if (s) (j = C || c), (q = g || f), (oe = y || d);
          else return;
        let de = !1;
        const be = (V._enterCb = (Se) => {
          de ||
            ((de = !0),
            Se ? I(oe, [V]) : I(q, [V]),
            D.delayedLeave && D.delayedLeave(),
            (V._enterCb = void 0));
        });
        j ? S(j, [V, be]) : be();
      },
      leave(V, j) {
        const q = String(e.key);
        if ((V._enterCb && V._enterCb(!0), n.isUnmounting)) return j();
        I(_, [V]);
        let oe = !1;
        const de = (V._leaveCb = (be) => {
          oe ||
            ((oe = !0),
            j(),
            be ? I(N, [V]) : I(E, [V]),
            (V._leaveCb = void 0),
            L[q] === e && delete L[q]);
        });
        (L[q] = e), h ? S(h, [V, de]) : de();
      },
      clone(V) {
        return Or(V, t, n, r);
      },
    };
  return D;
}
function hr(e) {
  if (er(e)) return (e = At(e)), (e.children = null), e;
}
function Ws(e) {
  return er(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Pr(e, t) {
  e.shapeFlag & 6 && e.component
    ? Pr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function wo(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let l = 0; l < e.length; l++) {
    let o = e[l];
    const u = n == null ? o.key : String(n) + String(o.key != null ? o.key : l);
    o.type === He
      ? (o.patchFlag & 128 && s++, (r = r.concat(wo(o.children, t, u))))
      : (t || o.type !== ht) && r.push(u != null ? At(o, { key: u }) : o);
  }
  if (s > 1) for (let l = 0; l < r.length; l++) r[l].patchFlag = -2;
  return r;
}
function ko(e) {
  return J(e) ? { setup: e, name: e.name } : e;
}
const $n = (e) => !!e.type.__asyncLoader,
  er = (e) => e.type.__isKeepAlive;
function Di(e, t) {
  So(e, "a", t);
}
function $i(e, t) {
  So(e, "da", t);
}
function So(e, t, n = Oe) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((tr(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      er(s.parent.vnode) && Ui(r, t, n, s), (s = s.parent);
  }
}
function Ui(e, t, n, r) {
  const s = tr(t, e, r, !0);
  _s(() => {
    es(r[t], s);
  }, n);
}
function tr(e, t, n = Oe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      l =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          sn(), Zt(n);
          const u = Xe(t, n, e, o);
          return $t(), ln(), u;
        });
    return r ? s.unshift(l) : s.push(l), l;
  }
}
const gt =
    (e) =>
    (t, n = Oe) =>
      (!Cn || e === "sp") && tr(e, t, n),
  Fo = gt("bm"),
  hs = gt("m"),
  Hi = gt("bu"),
  Wi = gt("u"),
  Mo = gt("bum"),
  _s = gt("um"),
  Vi = gt("sp"),
  ji = gt("rtg"),
  Bi = gt("rtc");
function Ki(e, t = Oe) {
  tr("ec", e, t);
}
function wt(e, t, n, r) {
  const s = e.dirs,
    l = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const u = s[o];
    l && (u.oldValue = l[o].value);
    let c = u.dir[r];
    c && (sn(), Xe(c, n, 8, [e.el, u, e, t]), ln());
  }
}
const Yi = Symbol(),
  Rr = (e) => (e ? (Go(e) ? bs(e) || e.proxy : Rr(e.parent)) : null),
  jn = ke(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Rr(e.parent),
    $root: (e) => Rr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Do(e),
    $forceUpdate: (e) => e.f || (e.f = () => Lo(e.update)),
    $nextTick: (e) => e.n || (e.n = yo.bind(e.proxy)),
    $watch: (e) => Si.bind(e),
  }),
  Gi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: l,
        accessCache: o,
        type: u,
        appContext: c,
      } = e;
      let f;
      if (t[0] !== "$") {
        const E = o[t];
        if (E !== void 0)
          switch (E) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return l[t];
          }
        else {
          if (r !== _e && le(r, t)) return (o[t] = 1), r[t];
          if (s !== _e && le(s, t)) return (o[t] = 2), s[t];
          if ((f = e.propsOptions[0]) && le(f, t)) return (o[t] = 3), l[t];
          if (n !== _e && le(n, t)) return (o[t] = 4), n[t];
          wr && (o[t] = 0);
        }
      }
      const d = jn[t];
      let _, h;
      if (d) return t === "$attrs" && Ve(e, "get", t), d(e);
      if ((_ = u.__cssModules) && (_ = _[t])) return _;
      if (n !== _e && le(n, t)) return (o[t] = 4), n[t];
      if (((h = c.config.globalProperties), le(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: l } = e;
      return s !== _e && le(s, t)
        ? ((s[t] = n), !0)
        : r !== _e && le(r, t)
        ? ((r[t] = n), !0)
        : le(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((l[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: l,
        },
      },
      o
    ) {
      let u;
      return (
        !!n[o] ||
        (e !== _e && le(e, o)) ||
        (t !== _e && le(t, o)) ||
        ((u = l[0]) && le(u, o)) ||
        le(r, o) ||
        le(jn, o) ||
        le(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : le(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let wr = !0;
function Xi(e) {
  const t = Do(e),
    n = e.proxy,
    r = e.ctx;
  (wr = !1), t.beforeCreate && Vs(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: l,
    methods: o,
    watch: u,
    provide: c,
    inject: f,
    created: d,
    beforeMount: _,
    mounted: h,
    beforeUpdate: E,
    updated: N,
    activated: A,
    deactivated: C,
    beforeDestroy: g,
    beforeUnmount: y,
    destroyed: R,
    unmounted: L,
    render: I,
    renderTracked: S,
    renderTriggered: D,
    errorCaptured: V,
    serverPrefetch: j,
    expose: q,
    inheritAttrs: oe,
    components: de,
    directives: be,
    filters: Se,
  } = t;
  if ((f && qi(f, r, null, e.appContext.config.unwrapInjectedRef), o))
    for (const Q in o) {
      const re = o[Q];
      J(re) && (r[Q] = re.bind(n));
    }
  if (s) {
    const Q = s.call(n, n);
    Ne(Q) && (e.data = On(Q));
  }
  if (((wr = !0), l))
    for (const Q in l) {
      const re = l[Q],
        ye = J(re) ? re.bind(n, n) : J(re.get) ? re.get.bind(n, n) : ze,
        Be = !J(re) && J(re.set) ? re.set.bind(n) : ze,
        Fe = Ee({ get: ye, set: Be });
      Object.defineProperty(r, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (we) => (Fe.value = we),
      });
    }
  if (u) for (const Q in u) xo(u[Q], r, n, Q);
  if (c) {
    const Q = J(c) ? c.call(n) : c;
    Reflect.ownKeys(Q).forEach((re) => {
      Dn(re, Q[re]);
    });
  }
  d && Vs(d, e, "c");
  function ce(Q, re) {
    X(re) ? re.forEach((ye) => Q(ye.bind(n))) : re && Q(re.bind(n));
  }
  if (
    (ce(Fo, _),
    ce(hs, h),
    ce(Hi, E),
    ce(Wi, N),
    ce(Di, A),
    ce($i, C),
    ce(Ki, V),
    ce(Bi, S),
    ce(ji, D),
    ce(Mo, y),
    ce(_s, L),
    ce(Vi, j),
    X(q))
  )
    if (q.length) {
      const Q = e.exposed || (e.exposed = {});
      q.forEach((re) => {
        Object.defineProperty(Q, re, {
          get: () => n[re],
          set: (ye) => (n[re] = ye),
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === ze && (e.render = I),
    oe != null && (e.inheritAttrs = oe),
    de && (e.components = de),
    be && (e.directives = be);
}
function qi(e, t, n = ze, r = !1) {
  X(e) && (e = kr(e));
  for (const s in e) {
    const l = e[s];
    let o;
    Ne(l)
      ? "default" in l
        ? (o = mt(l.from || s, l.default, !0))
        : (o = mt(l.from || s))
      : (o = mt(l)),
      Pe(o) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (u) => (o.value = u),
          })
        : (t[s] = o);
  }
}
function Vs(e, t, n) {
  Xe(X(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function xo(e, t, n, r) {
  const s = r.includes(".") ? Po(n, r) : () => n[r];
  if (Re(e)) {
    const l = t[e];
    J(l) && Jt(s, l);
  } else if (J(e)) Jt(s, e.bind(n));
  else if (Ne(e))
    if (X(e)) e.forEach((l) => xo(l, t, n, r));
    else {
      const l = J(e.handler) ? e.handler.bind(n) : t[e.handler];
      J(l) && Jt(s, l, e);
    }
}
function Do(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: l,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    u = l.get(t);
  let c;
  return (
    u
      ? (c = u)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((f) => Bn(c, f, o, !0)), Bn(c, t, o)),
    l.set(t, c),
    c
  );
}
function Bn(e, t, n, r = !1) {
  const { mixins: s, extends: l } = t;
  l && Bn(e, l, n, !0), s && s.forEach((o) => Bn(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const u = Ji[o] || (n && n[o]);
      e[o] = u ? u(e[o], t[o]) : t[o];
    }
  return e;
}
const Ji = {
  data: js,
  props: St,
  emits: St,
  methods: St,
  computed: St,
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  components: St,
  directives: St,
  watch: zi,
  provide: js,
  inject: Qi,
};
function js(e, t) {
  return t
    ? e
      ? function () {
          return ke(
            J(e) ? e.call(this, this) : e,
            J(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Qi(e, t) {
  return St(kr(e), kr(t));
}
function kr(e) {
  if (X(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function St(e, t) {
  return e ? ke(ke(Object.create(null), e), t) : t;
}
function zi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ke(Object.create(null), e);
  for (const r in t) n[r] = Me(e[r], t[r]);
  return n;
}
function Zi(e, t, n, r = !1) {
  const s = {},
    l = {};
  Hn(l, rr, 1), (e.propsDefaults = Object.create(null)), $o(e, t, s, l);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = r ? s : _i(s)) : e.type.props ? (e.props = s) : (e.props = l),
    (e.attrs = l);
}
function ec(e, t, n, r) {
  const {
      props: s,
      attrs: l,
      vnode: { patchFlag: o },
    } = e,
    u = ie(s),
    [c] = e.propsOptions;
  let f = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let _ = 0; _ < d.length; _++) {
        let h = d[_];
        if (zn(e.emitsOptions, h)) continue;
        const E = t[h];
        if (c)
          if (le(l, h)) E !== l[h] && ((l[h] = E), (f = !0));
          else {
            const N = Qt(h);
            s[N] = Sr(c, u, N, E, e, !1);
          }
        else E !== l[h] && ((l[h] = E), (f = !0));
      }
    }
  } else {
    $o(e, t, s, l) && (f = !0);
    let d;
    for (const _ in u)
      (!t || (!le(t, _) && ((d = rn(_)) === _ || !le(t, d)))) &&
        (c
          ? n &&
            (n[_] !== void 0 || n[d] !== void 0) &&
            (s[_] = Sr(c, u, _, void 0, e, !0))
          : delete s[_]);
    if (l !== u)
      for (const _ in l) (!t || (!le(t, _) && !0)) && (delete l[_], (f = !0));
  }
  f && _t(e, "set", "$attrs");
}
function $o(e, t, n, r) {
  const [s, l] = e.propsOptions;
  let o = !1,
    u;
  if (t)
    for (let c in t) {
      if (xn(c)) continue;
      const f = t[c];
      let d;
      s && le(s, (d = Qt(c)))
        ? !l || !l.includes(d)
          ? (n[d] = f)
          : ((u || (u = {}))[d] = f)
        : zn(e.emitsOptions, c) ||
          ((!(c in r) || f !== r[c]) && ((r[c] = f), (o = !0)));
    }
  if (l) {
    const c = ie(n),
      f = u || _e;
    for (let d = 0; d < l.length; d++) {
      const _ = l[d];
      n[_] = Sr(s, c, _, f[_], e, !le(f, _));
    }
  }
  return o;
}
function Sr(e, t, n, r, s, l) {
  const o = e[n];
  if (o != null) {
    const u = le(o, "default");
    if (u && r === void 0) {
      const c = o.default;
      if (o.type !== Function && J(c)) {
        const { propsDefaults: f } = s;
        n in f ? (r = f[n]) : (Zt(s), (r = f[n] = c.call(null, t)), $t());
      } else r = c;
    }
    o[0] &&
      (l && !u ? (r = !1) : o[1] && (r === "" || r === rn(n)) && (r = !0));
  }
  return r;
}
function Uo(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const l = e.props,
    o = {},
    u = [];
  let c = !1;
  if (!J(e)) {
    const d = (_) => {
      c = !0;
      const [h, E] = Uo(_, t, !0);
      ke(o, h), E && u.push(...E);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!l && !c) return r.set(e, Gt), Gt;
  if (X(l))
    for (let d = 0; d < l.length; d++) {
      const _ = Qt(l[d]);
      Bs(_) && (o[_] = _e);
    }
  else if (l)
    for (const d in l) {
      const _ = Qt(d);
      if (Bs(_)) {
        const h = l[d],
          E = (o[_] = X(h) || J(h) ? { type: h } : h);
        if (E) {
          const N = Gs(Boolean, E.type),
            A = Gs(String, E.type);
          (E[0] = N > -1),
            (E[1] = A < 0 || N < A),
            (N > -1 || le(E, "default")) && u.push(_);
        }
      }
    }
  const f = [o, u];
  return r.set(e, f), f;
}
function Bs(e) {
  return e[0] !== "$";
}
function Ks(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Ys(e, t) {
  return Ks(e) === Ks(t);
}
function Gs(e, t) {
  return X(t) ? t.findIndex((n) => Ys(n, e)) : J(t) && Ys(t, e) ? 0 : -1;
}
const Ho = (e) => e[0] === "_" || e === "$stable",
  gs = (e) => (X(e) ? e.map(st) : [st(e)]),
  tc = (e, t, n) => {
    if (t._n) return t;
    const r = Ni((...s) => gs(t(...s)), n);
    return (r._c = !1), r;
  },
  Wo = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Ho(s)) continue;
      const l = e[s];
      if (J(l)) t[s] = tc(s, l, r);
      else if (l != null) {
        const o = gs(l);
        t[s] = () => o;
      }
    }
  },
  Vo = (e, t) => {
    const n = gs(t);
    e.slots.default = () => n;
  },
  nc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ie(t)), Hn(t, "_", n)) : Wo(t, (e.slots = {}));
    } else (e.slots = {}), t && Vo(e, t);
    Hn(e.slots, rr, 1);
  },
  rc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let l = !0,
      o = _e;
    if (r.shapeFlag & 32) {
      const u = t._;
      u
        ? n && u === 1
          ? (l = !1)
          : (ke(s, t), !n && u === 1 && delete s._)
        : ((l = !t.$stable), Wo(t, s)),
        (o = t);
    } else t && (Vo(e, t), (o = { default: 1 }));
    if (l) for (const u in s) !Ho(u) && !(u in o) && delete s[u];
  };
function jo() {
  return {
    app: null,
    config: {
      isNativeTag: Ma,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let sc = 0;
function lc(e, t) {
  return function (r, s = null) {
    J(r) || (r = Object.assign({}, r)), s != null && !Ne(s) && (s = null);
    const l = jo(),
      o = new Set();
    let u = !1;
    const c = (l.app = {
      _uid: sc++,
      _component: r,
      _props: s,
      _container: null,
      _context: l,
      _instance: null,
      version: Tc,
      get config() {
        return l.config;
      },
      set config(f) {},
      use(f, ...d) {
        return (
          o.has(f) ||
            (f && J(f.install)
              ? (o.add(f), f.install(c, ...d))
              : J(f) && (o.add(f), f(c, ...d))),
          c
        );
      },
      mixin(f) {
        return l.mixins.includes(f) || l.mixins.push(f), c;
      },
      component(f, d) {
        return d ? ((l.components[f] = d), c) : l.components[f];
      },
      directive(f, d) {
        return d ? ((l.directives[f] = d), c) : l.directives[f];
      },
      mount(f, d, _) {
        if (!u) {
          const h = fe(r, s);
          return (
            (h.appContext = l),
            d && t ? t(h, f) : e(h, f, _),
            (u = !0),
            (c._container = f),
            (f.__vue_app__ = c),
            bs(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        u && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(f, d) {
        return (l.provides[f] = d), c;
      },
    });
    return c;
  };
}
function Fr(e, t, n, r, s = !1) {
  if (X(e)) {
    e.forEach((h, E) => Fr(h, t && (X(t) ? t[E] : t), n, r, s));
    return;
  }
  if ($n(r) && !s) return;
  const l = r.shapeFlag & 4 ? bs(r.component) || r.component.proxy : r.el,
    o = s ? null : l,
    { i: u, r: c } = e,
    f = t && t.r,
    d = u.refs === _e ? (u.refs = {}) : u.refs,
    _ = u.setupState;
  if (
    (f != null &&
      f !== c &&
      (Re(f)
        ? ((d[f] = null), le(_, f) && (_[f] = null))
        : Pe(f) && (f.value = null)),
    J(c))
  )
    Ct(c, u, 12, [o, d]);
  else {
    const h = Re(c),
      E = Pe(c);
    if (h || E) {
      const N = () => {
        if (e.f) {
          const A = h ? d[c] : c.value;
          s
            ? X(A) && es(A, l)
            : X(A)
            ? A.includes(l) || A.push(l)
            : h
            ? ((d[c] = [l]), le(_, c) && (_[c] = d[c]))
            : ((c.value = [l]), e.k && (d[e.k] = c.value));
        } else
          h
            ? ((d[c] = o), le(_, c) && (_[c] = o))
            : E && ((c.value = o), e.k && (d[e.k] = o));
      };
      o ? ((N.id = -1), $e(N, n)) : N();
    }
  }
}
const $e = ki;
function oc(e) {
  return ac(e);
}
function ac(e, t) {
  const n = Va();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: l,
      createElement: o,
      createText: u,
      createComment: c,
      setText: f,
      setElementText: d,
      parentNode: _,
      nextSibling: h,
      setScopeId: E = ze,
      cloneNode: N,
      insertStaticContent: A,
    } = e,
    C = (
      a,
      i,
      m,
      b = null,
      v = null,
      O = null,
      M = !1,
      k = null,
      w = !!i.dynamicChildren
    ) => {
      if (a === i) return;
      a && !Ft(a, i) && ((b = W(a)), Ae(a, v, O, !0), (a = null)),
        i.patchFlag === -2 && ((w = !1), (i.dynamicChildren = null));
      const { type: p, ref: T, shapeFlag: $ } = i;
      switch (p) {
        case nr:
          g(a, i, m, b);
          break;
        case ht:
          y(a, i, m, b);
          break;
        case _r:
          a == null && R(i, m, b, M);
          break;
        case He:
          be(a, i, m, b, v, O, M, k, w);
          break;
        default:
          $ & 1
            ? S(a, i, m, b, v, O, M, k, w)
            : $ & 6
            ? Se(a, i, m, b, v, O, M, k, w)
            : ($ & 64 || $ & 128) && p.process(a, i, m, b, v, O, M, k, w, te);
      }
      T != null && v && Fr(T, a && a.ref, O, i || a, !i);
    },
    g = (a, i, m, b) => {
      if (a == null) r((i.el = u(i.children)), m, b);
      else {
        const v = (i.el = a.el);
        i.children !== a.children && f(v, i.children);
      }
    },
    y = (a, i, m, b) => {
      a == null ? r((i.el = c(i.children || "")), m, b) : (i.el = a.el);
    },
    R = (a, i, m, b) => {
      [a.el, a.anchor] = A(a.children, i, m, b, a.el, a.anchor);
    },
    L = ({ el: a, anchor: i }, m, b) => {
      let v;
      for (; a && a !== i; ) (v = h(a)), r(a, m, b), (a = v);
      r(i, m, b);
    },
    I = ({ el: a, anchor: i }) => {
      let m;
      for (; a && a !== i; ) (m = h(a)), s(a), (a = m);
      s(i);
    },
    S = (a, i, m, b, v, O, M, k, w) => {
      (M = M || i.type === "svg"),
        a == null ? D(i, m, b, v, O, M, k, w) : q(a, i, v, O, M, k, w);
    },
    D = (a, i, m, b, v, O, M, k) => {
      let w, p;
      const {
        type: T,
        props: $,
        shapeFlag: U,
        transition: B,
        patchFlag: z,
        dirs: se,
      } = a;
      if (a.el && N !== void 0 && z === -1) w = a.el = N(a.el);
      else {
        if (
          ((w = a.el = o(a.type, O, $ && $.is, $)),
          U & 8
            ? d(w, a.children)
            : U & 16 &&
              j(a.children, w, null, b, v, O && T !== "foreignObject", M, k),
          se && wt(a, null, b, "created"),
          $)
        ) {
          for (const he in $)
            he !== "value" &&
              !xn(he) &&
              l(w, he, null, $[he], O, a.children, b, v, F);
          "value" in $ && l(w, "value", null, $.value),
            (p = $.onVnodeBeforeMount) && tt(p, b, a);
        }
        V(w, a, a.scopeId, M, b);
      }
      se && wt(a, null, b, "beforeMount");
      const ue = (!v || (v && !v.pendingBranch)) && B && !B.persisted;
      ue && B.beforeEnter(w),
        r(w, i, m),
        ((p = $ && $.onVnodeMounted) || ue || se) &&
          $e(() => {
            p && tt(p, b, a), ue && B.enter(w), se && wt(a, null, b, "mounted");
          }, v);
    },
    V = (a, i, m, b, v) => {
      if ((m && E(a, m), b)) for (let O = 0; O < b.length; O++) E(a, b[O]);
      if (v) {
        let O = v.subTree;
        if (i === O) {
          const M = v.vnode;
          V(a, M, M.scopeId, M.slotScopeIds, v.parent);
        }
      }
    },
    j = (a, i, m, b, v, O, M, k, w = 0) => {
      for (let p = w; p < a.length; p++) {
        const T = (a[p] = k ? Lt(a[p]) : st(a[p]));
        C(null, T, i, m, b, v, O, M, k);
      }
    },
    q = (a, i, m, b, v, O, M) => {
      const k = (i.el = a.el);
      let { patchFlag: w, dynamicChildren: p, dirs: T } = i;
      w |= a.patchFlag & 16;
      const $ = a.props || _e,
        U = i.props || _e;
      let B;
      m && kt(m, !1),
        (B = U.onVnodeBeforeUpdate) && tt(B, m, i, a),
        T && wt(i, a, m, "beforeUpdate"),
        m && kt(m, !0);
      const z = v && i.type !== "foreignObject";
      if (
        (p
          ? oe(a.dynamicChildren, p, k, m, b, z, O)
          : M || ye(a, i, k, null, m, b, z, O, !1),
        w > 0)
      ) {
        if (w & 16) de(k, i, $, U, m, b, v);
        else if (
          (w & 2 && $.class !== U.class && l(k, "class", null, U.class, v),
          w & 4 && l(k, "style", $.style, U.style, v),
          w & 8)
        ) {
          const se = i.dynamicProps;
          for (let ue = 0; ue < se.length; ue++) {
            const he = se[ue],
              qe = $[he],
              Ut = U[he];
            (Ut !== qe || he === "value") &&
              l(k, he, qe, Ut, v, a.children, m, b, F);
          }
        }
        w & 1 && a.children !== i.children && d(k, i.children);
      } else !M && p == null && de(k, i, $, U, m, b, v);
      ((B = U.onVnodeUpdated) || T) &&
        $e(() => {
          B && tt(B, m, i, a), T && wt(i, a, m, "updated");
        }, b);
    },
    oe = (a, i, m, b, v, O, M) => {
      for (let k = 0; k < i.length; k++) {
        const w = a[k],
          p = i[k],
          T =
            w.el && (w.type === He || !Ft(w, p) || w.shapeFlag & 70)
              ? _(w.el)
              : m;
        C(w, p, T, null, b, v, O, M, !0);
      }
    },
    de = (a, i, m, b, v, O, M) => {
      if (m !== b) {
        for (const k in b) {
          if (xn(k)) continue;
          const w = b[k],
            p = m[k];
          w !== p && k !== "value" && l(a, k, p, w, M, i.children, v, O, F);
        }
        if (m !== _e)
          for (const k in m)
            !xn(k) && !(k in b) && l(a, k, m[k], null, M, i.children, v, O, F);
        "value" in b && l(a, "value", m.value, b.value);
      }
    },
    be = (a, i, m, b, v, O, M, k, w) => {
      const p = (i.el = a ? a.el : u("")),
        T = (i.anchor = a ? a.anchor : u(""));
      let { patchFlag: $, dynamicChildren: U, slotScopeIds: B } = i;
      B && (k = k ? k.concat(B) : B),
        a == null
          ? (r(p, m, b), r(T, m, b), j(i.children, m, T, v, O, M, k, w))
          : $ > 0 && $ & 64 && U && a.dynamicChildren
          ? (oe(a.dynamicChildren, U, m, v, O, M, k),
            (i.key != null || (v && i === v.subTree)) && Bo(a, i, !0))
          : ye(a, i, m, T, v, O, M, k, w);
    },
    Se = (a, i, m, b, v, O, M, k, w) => {
      (i.slotScopeIds = k),
        a == null
          ? i.shapeFlag & 512
            ? v.ctx.activate(i, m, b, M, w)
            : je(i, m, b, v, O, M, w)
          : ce(a, i, w);
    },
    je = (a, i, m, b, v, O, M) => {
      const k = (a.component = pc(a, b, v));
      if ((er(a) && (k.ctx.renderer = te), bc(k), k.asyncDep)) {
        if ((v && v.registerDep(k, Q), !a.el)) {
          const w = (k.subTree = fe(ht));
          y(null, w, i, m);
        }
        return;
      }
      Q(k, a, i, m, v, O, M);
    },
    ce = (a, i, m) => {
      const b = (i.component = a.component);
      if (Pi(a, i, m))
        if (b.asyncDep && !b.asyncResolved) {
          re(b, i, m);
          return;
        } else (b.next = i), Li(b.update), b.update();
      else (i.el = a.el), (b.vnode = i);
    },
    Q = (a, i, m, b, v, O, M) => {
      const k = () => {
          if (a.isMounted) {
            let { next: T, bu: $, u: U, parent: B, vnode: z } = a,
              se = T,
              ue;
            kt(a, !1),
              T ? ((T.el = z.el), re(a, T, M)) : (T = z),
              $ && dr($),
              (ue = T.props && T.props.onVnodeBeforeUpdate) && tt(ue, B, T, z),
              kt(a, !0);
            const he = mr(a),
              qe = a.subTree;
            (a.subTree = he),
              C(qe, he, _(qe.el), W(qe), a, v, O),
              (T.el = he.el),
              se === null && Ri(a, he.el),
              U && $e(U, v),
              (ue = T.props && T.props.onVnodeUpdated) &&
                $e(() => tt(ue, B, T, z), v);
          } else {
            let T;
            const { el: $, props: U } = i,
              { bm: B, m: z, parent: se } = a,
              ue = $n(i);
            if (
              (kt(a, !1),
              B && dr(B),
              !ue && (T = U && U.onVnodeBeforeMount) && tt(T, se, i),
              kt(a, !0),
              $ && K)
            ) {
              const he = () => {
                (a.subTree = mr(a)), K($, a.subTree, a, v, null);
              };
              ue
                ? i.type.__asyncLoader().then(() => !a.isUnmounted && he())
                : he();
            } else {
              const he = (a.subTree = mr(a));
              C(null, he, m, b, a, v, O), (i.el = he.el);
            }
            if ((z && $e(z, v), !ue && (T = U && U.onVnodeMounted))) {
              const he = i;
              $e(() => tt(T, se, he), v);
            }
            (i.shapeFlag & 256 ||
              (se && $n(se.vnode) && se.vnode.shapeFlag & 256)) &&
              a.a &&
              $e(a.a, v),
              (a.isMounted = !0),
              (i = m = b = null);
          }
        },
        w = (a.effect = new ss(k, () => Lo(p), a.scope)),
        p = (a.update = () => w.run());
      (p.id = a.uid), kt(a, !0), p();
    },
    re = (a, i, m) => {
      i.component = a;
      const b = a.vnode.props;
      (a.vnode = i),
        (a.next = null),
        ec(a, i.props, b, m),
        rc(a, i.children, m),
        sn(),
        Qn(void 0, a.update),
        ln();
    },
    ye = (a, i, m, b, v, O, M, k, w = !1) => {
      const p = a && a.children,
        T = a ? a.shapeFlag : 0,
        $ = i.children,
        { patchFlag: U, shapeFlag: B } = i;
      if (U > 0) {
        if (U & 128) {
          Fe(p, $, m, b, v, O, M, k, w);
          return;
        } else if (U & 256) {
          Be(p, $, m, b, v, O, M, k, w);
          return;
        }
      }
      B & 8
        ? (T & 16 && F(p, v, O), $ !== p && d(m, $))
        : T & 16
        ? B & 16
          ? Fe(p, $, m, b, v, O, M, k, w)
          : F(p, v, O, !0)
        : (T & 8 && d(m, ""), B & 16 && j($, m, b, v, O, M, k, w));
    },
    Be = (a, i, m, b, v, O, M, k, w) => {
      (a = a || Gt), (i = i || Gt);
      const p = a.length,
        T = i.length,
        $ = Math.min(p, T);
      let U;
      for (U = 0; U < $; U++) {
        const B = (i[U] = w ? Lt(i[U]) : st(i[U]));
        C(a[U], B, m, null, v, O, M, k, w);
      }
      p > T ? F(a, v, O, !0, !1, $) : j(i, m, b, v, O, M, k, w, $);
    },
    Fe = (a, i, m, b, v, O, M, k, w) => {
      let p = 0;
      const T = i.length;
      let $ = a.length - 1,
        U = T - 1;
      for (; p <= $ && p <= U; ) {
        const B = a[p],
          z = (i[p] = w ? Lt(i[p]) : st(i[p]));
        if (Ft(B, z)) C(B, z, m, null, v, O, M, k, w);
        else break;
        p++;
      }
      for (; p <= $ && p <= U; ) {
        const B = a[$],
          z = (i[U] = w ? Lt(i[U]) : st(i[U]));
        if (Ft(B, z)) C(B, z, m, null, v, O, M, k, w);
        else break;
        $--, U--;
      }
      if (p > $) {
        if (p <= U) {
          const B = U + 1,
            z = B < T ? i[B].el : b;
          for (; p <= U; )
            C(null, (i[p] = w ? Lt(i[p]) : st(i[p])), m, z, v, O, M, k, w), p++;
        }
      } else if (p > U) for (; p <= $; ) Ae(a[p], v, O, !0), p++;
      else {
        const B = p,
          z = p,
          se = new Map();
        for (p = z; p <= U; p++) {
          const Ue = (i[p] = w ? Lt(i[p]) : st(i[p]));
          Ue.key != null && se.set(Ue.key, p);
        }
        let ue,
          he = 0;
        const qe = U - z + 1;
        let Ut = !1,
          Os = 0;
        const on = new Array(qe);
        for (p = 0; p < qe; p++) on[p] = 0;
        for (p = B; p <= $; p++) {
          const Ue = a[p];
          if (he >= qe) {
            Ae(Ue, v, O, !0);
            continue;
          }
          let et;
          if (Ue.key != null) et = se.get(Ue.key);
          else
            for (ue = z; ue <= U; ue++)
              if (on[ue - z] === 0 && Ft(Ue, i[ue])) {
                et = ue;
                break;
              }
          et === void 0
            ? Ae(Ue, v, O, !0)
            : ((on[et - z] = p + 1),
              et >= Os ? (Os = et) : (Ut = !0),
              C(Ue, i[et], m, null, v, O, M, k, w),
              he++);
        }
        const Ps = Ut ? ic(on) : Gt;
        for (ue = Ps.length - 1, p = qe - 1; p >= 0; p--) {
          const Ue = z + p,
            et = i[Ue],
            Rs = Ue + 1 < T ? i[Ue + 1].el : b;
          on[p] === 0
            ? C(null, et, m, Rs, v, O, M, k, w)
            : Ut && (ue < 0 || p !== Ps[ue] ? we(et, m, Rs, 2) : ue--);
        }
      }
    },
    we = (a, i, m, b, v = null) => {
      const { el: O, type: M, transition: k, children: w, shapeFlag: p } = a;
      if (p & 6) {
        we(a.component.subTree, i, m, b);
        return;
      }
      if (p & 128) {
        a.suspense.move(i, m, b);
        return;
      }
      if (p & 64) {
        M.move(a, i, m, te);
        return;
      }
      if (M === He) {
        r(O, i, m);
        for (let $ = 0; $ < w.length; $++) we(w[$], i, m, b);
        r(a.anchor, i, m);
        return;
      }
      if (M === _r) {
        L(a, i, m);
        return;
      }
      if (b !== 2 && p & 1 && k)
        if (b === 0) k.beforeEnter(O), r(O, i, m), $e(() => k.enter(O), v);
        else {
          const { leave: $, delayLeave: U, afterLeave: B } = k,
            z = () => r(O, i, m),
            se = () => {
              $(O, () => {
                z(), B && B();
              });
            };
          U ? U(O, z, se) : se();
        }
      else r(O, i, m);
    },
    Ae = (a, i, m, b = !1, v = !1) => {
      const {
        type: O,
        props: M,
        ref: k,
        children: w,
        dynamicChildren: p,
        shapeFlag: T,
        patchFlag: $,
        dirs: U,
      } = a;
      if ((k != null && Fr(k, null, m, a, !0), T & 256)) {
        i.ctx.deactivate(a);
        return;
      }
      const B = T & 1 && U,
        z = !$n(a);
      let se;
      if ((z && (se = M && M.onVnodeBeforeUnmount) && tt(se, i, a), T & 6))
        H(a.component, m, b);
      else {
        if (T & 128) {
          a.suspense.unmount(m, b);
          return;
        }
        B && wt(a, null, i, "beforeUnmount"),
          T & 64
            ? a.type.remove(a, i, m, v, te, b)
            : p && (O !== He || ($ > 0 && $ & 64))
            ? F(p, i, m, !1, !0)
            : ((O === He && $ & 384) || (!v && T & 16)) && F(w, i, m),
          b && Ke(a);
      }
      ((z && (se = M && M.onVnodeUnmounted)) || B) &&
        $e(() => {
          se && tt(se, i, a), B && wt(a, null, i, "unmounted");
        }, m);
    },
    Ke = (a) => {
      const { type: i, el: m, anchor: b, transition: v } = a;
      if (i === He) {
        P(m, b);
        return;
      }
      if (i === _r) {
        I(a);
        return;
      }
      const O = () => {
        s(m), v && !v.persisted && v.afterLeave && v.afterLeave();
      };
      if (a.shapeFlag & 1 && v && !v.persisted) {
        const { leave: M, delayLeave: k } = v,
          w = () => M(m, O);
        k ? k(a.el, O, w) : w();
      } else O();
    },
    P = (a, i) => {
      let m;
      for (; a !== i; ) (m = h(a)), s(a), (a = m);
      s(i);
    },
    H = (a, i, m) => {
      const { bum: b, scope: v, update: O, subTree: M, um: k } = a;
      b && dr(b),
        v.stop(),
        O && ((O.active = !1), Ae(M, a, i, m)),
        k && $e(k, i),
        $e(() => {
          a.isUnmounted = !0;
        }, i),
        i &&
          i.pendingBranch &&
          !i.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === i.pendingId &&
          (i.deps--, i.deps === 0 && i.resolve());
    },
    F = (a, i, m, b = !1, v = !1, O = 0) => {
      for (let M = O; M < a.length; M++) Ae(a[M], i, m, b, v);
    },
    W = (a) =>
      a.shapeFlag & 6
        ? W(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : h(a.anchor || a.el),
    ee = (a, i, m) => {
      a == null
        ? i._vnode && Ae(i._vnode, null, null, !0)
        : C(i._vnode || null, a, i, null, null, null, m),
        Co(),
        (i._vnode = a);
    },
    te = {
      p: C,
      um: Ae,
      m: we,
      r: Ke,
      mt: je,
      mc: j,
      pc: ye,
      pbc: oe,
      n: W,
      o: e,
    };
  let Y, K;
  return (
    t && ([Y, K] = t(te)), { render: ee, hydrate: Y, createApp: lc(ee, Y) }
  );
}
function kt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Bo(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (X(r) && X(s))
    for (let l = 0; l < r.length; l++) {
      const o = r[l];
      let u = s[l];
      u.shapeFlag & 1 &&
        !u.dynamicChildren &&
        ((u.patchFlag <= 0 || u.patchFlag === 32) &&
          ((u = s[l] = Lt(s[l])), (u.el = o.el)),
        n || Bo(o, u));
    }
}
function ic(e) {
  const t = e.slice(),
    n = [0];
  let r, s, l, o, u;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const f = e[r];
    if (f !== 0) {
      if (((s = n[n.length - 1]), e[s] < f)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (l = 0, o = n.length - 1; l < o; )
        (u = (l + o) >> 1), e[n[u]] < f ? (l = u + 1) : (o = u);
      f < e[n[l]] && (l > 0 && (t[r] = n[l - 1]), (n[l] = r));
    }
  }
  for (l = n.length, o = n[l - 1]; l-- > 0; ) (n[l] = o), (o = t[o]);
  return n;
}
const cc = (e) => e.__isTeleport,
  He = Symbol(void 0),
  nr = Symbol(void 0),
  ht = Symbol(void 0),
  _r = Symbol(void 0),
  _n = [];
let Qe = null;
function at(e = !1) {
  _n.push((Qe = e ? null : []));
}
function uc() {
  _n.pop(), (Qe = _n[_n.length - 1] || null);
}
let In = 1;
function Xs(e) {
  In += e;
}
function fc(e) {
  return (
    (e.dynamicChildren = In > 0 ? Qe || Gt : null),
    uc(),
    In > 0 && Qe && Qe.push(e),
    e
  );
}
function it(e, t, n, r, s, l) {
  return fc(Z(e, t, n, r, s, l, !0));
}
function Mr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const rr = "__vInternal",
  Ko = ({ key: e }) => (e != null ? e : null),
  Un = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? Re(e) || Pe(e) || J(e)
        ? { i: ot, r: e, k: t, f: !!n }
        : e
      : null;
function Z(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  l = e === He ? 0 : 1,
  o = !1,
  u = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ko(t),
    ref: t && Un(t),
    scopeId: Zn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: l,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    u
      ? (ps(c, n), l & 128 && e.normalize(c))
      : n && (c.shapeFlag |= Re(n) ? 8 : 16),
    In > 0 &&
      !o &&
      Qe &&
      (c.patchFlag > 0 || l & 6) &&
      c.patchFlag !== 32 &&
      Qe.push(c),
    c
  );
}
const fe = dc;
function dc(e, t = null, n = null, r = 0, s = null, l = !1) {
  if (((!e || e === Yi) && (e = ht), Mr(e))) {
    const u = At(e, t, !0);
    return (
      n && ps(u, n),
      In > 0 &&
        !l &&
        Qe &&
        (u.shapeFlag & 6 ? (Qe[Qe.indexOf(e)] = u) : Qe.push(u)),
      (u.patchFlag |= -2),
      u
    );
  }
  if ((Lc(e) && (e = e.__vccOpts), t)) {
    t = mc(t);
    let { class: u, style: c } = t;
    u && !Re(u) && (t.class = zr(u)),
      Ne(c) && (ho(c) && !X(c) && (c = ke({}, c)), (t.style = Qr(c)));
  }
  const o = Re(e) ? 1 : wi(e) ? 128 : cc(e) ? 64 : Ne(e) ? 4 : J(e) ? 2 : 0;
  return Z(e, t, n, r, s, o, l, !0);
}
function mc(e) {
  return e ? (ho(e) || rr in e ? ke({}, e) : e) : null;
}
function At(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: l, children: o } = e,
    u = t ? hc(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Ko(u),
    ref:
      t && t.ref ? (n && s ? (X(s) ? s.concat(Un(t)) : [s, Un(t)]) : Un(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== He ? (l === -1 ? 16 : l | 16) : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && At(e.ssContent),
    ssFallback: e.ssFallback && At(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Yo(e = " ", t = 0) {
  return fe(nr, null, e, t);
}
function st(e) {
  return e == null || typeof e == "boolean"
    ? fe(ht)
    : X(e)
    ? fe(He, null, e.slice())
    : typeof e == "object"
    ? Lt(e)
    : fe(nr, null, String(e));
}
function Lt(e) {
  return e.el === null || e.memo ? e : At(e);
}
function ps(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (X(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ps(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(rr in t)
        ? (t._ctx = ot)
        : s === 3 &&
          ot &&
          (ot.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    J(t)
      ? ((t = { default: t, _ctx: ot }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Yo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function hc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = zr([t.class, r.class]));
      else if (s === "style") t.style = Qr([t.style, r.style]);
      else if (Yn(s)) {
        const l = t[s],
          o = r[s];
        o &&
          l !== o &&
          !(X(l) && l.includes(o)) &&
          (t[s] = l ? [].concat(l, o) : o);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function tt(e, t, n, r = null) {
  Xe(e, t, 7, [n, r]);
}
const _c = jo();
let gc = 0;
function pc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || _c,
    l = {
      uid: gc++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new eo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Uo(r, s),
      emitsOptions: Ao(r, s),
      emit: null,
      emitted: null,
      propsDefaults: _e,
      inheritAttrs: r.inheritAttrs,
      ctx: _e,
      data: _e,
      props: _e,
      attrs: _e,
      slots: _e,
      refs: _e,
      setupState: _e,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (l.ctx = { _: l }),
    (l.root = t ? t.root : l),
    (l.emit = Ci.bind(null, l)),
    e.ce && e.ce(l),
    l
  );
}
let Oe = null;
const zt = () => Oe || ot,
  Zt = (e) => {
    (Oe = e), e.scope.on();
  },
  $t = () => {
    Oe && Oe.scope.off(), (Oe = null);
  };
function Go(e) {
  return e.vnode.shapeFlag & 4;
}
let Cn = !1;
function bc(e, t = !1) {
  Cn = t;
  const { props: n, children: r } = e.vnode,
    s = Go(e);
  Zi(e, n, s, t), nc(e, r);
  const l = s ? Ec(e, t) : void 0;
  return (Cn = !1), l;
}
function Ec(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = cs(new Proxy(e.ctx, Gi)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? yc(e) : null);
    Zt(e), sn();
    const l = Ct(r, e, 0, [e.props, s]);
    if ((ln(), $t(), Jl(l))) {
      if ((l.then($t, $t), t))
        return l
          .then((o) => {
            qs(e, o, t);
          })
          .catch((o) => {
            Jn(o, e, 0);
          });
      e.asyncDep = l;
    } else qs(e, l, t);
  } else Xo(e, t);
}
function qs(e, t, n) {
  J(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Ne(t) && (e.setupState = Eo(t)),
    Xo(e, n);
}
let Js;
function Xo(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Js && !r.render) {
      const s = r.template;
      if (s) {
        const { isCustomElement: l, compilerOptions: o } = e.appContext.config,
          { delimiters: u, compilerOptions: c } = r,
          f = ke(ke({ isCustomElement: l, delimiters: u }, o), c);
        r.render = Js(s, f);
      }
    }
    e.render = r.render || ze;
  }
  Zt(e), sn(), Xi(e), ln(), $t();
}
function vc(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ve(e, "get", "$attrs"), t[n];
    },
  });
}
function yc(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = vc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function bs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Eo(cs(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in jn) return jn[n](e);
        },
      }))
    );
}
function Lc(e) {
  return J(e) && "__vccOpts" in e;
}
const Ee = (e, t) => Ei(e, t, Cn);
function sr(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Ne(t) && !X(t)
      ? Mr(t)
        ? fe(e, null, [t])
        : fe(e, t)
      : fe(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Mr(n) && (n = [n]),
      fe(e, t, n));
}
const Tc = "3.2.37",
  Ic = "http://www.w3.org/2000/svg",
  Mt = typeof document < "u" ? document : null,
  Qs = Mt && Mt.createElement("template"),
  Cc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Mt.createElementNS(Ic, e)
        : Mt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => Mt.createTextNode(e),
    createComment: (e) => Mt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Mt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r, s, l) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === l || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === l || !(s = s.nextSibling));

        );
      else {
        Qs.innerHTML = r ? `<svg>${e}</svg>` : e;
        const u = Qs.content;
        if (r) {
          const c = u.firstChild;
          for (; c.firstChild; ) u.appendChild(c.firstChild);
          u.removeChild(c);
        }
        t.insertBefore(u, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Nc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ac(e, t, n) {
  const r = e.style,
    s = Re(n);
  if (n && !s) {
    for (const l in n) xr(r, l, n[l]);
    if (t && !Re(t)) for (const l in t) n[l] == null && xr(r, l, "");
  } else {
    const l = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = l);
  }
}
const zs = /\s*!important$/;
function xr(e, t, n) {
  if (X(n)) n.forEach((r) => xr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Oc(e, t);
    zs.test(n)
      ? e.setProperty(rn(r), n.replace(zs, ""), "important")
      : (e[r] = n);
  }
}
const Zs = ["Webkit", "Moz", "ms"],
  gr = {};
function Oc(e, t) {
  const n = gr[t];
  if (n) return n;
  let r = Qt(t);
  if (r !== "filter" && r in e) return (gr[t] = r);
  r = Zl(r);
  for (let s = 0; s < Zs.length; s++) {
    const l = Zs[s] + r;
    if (l in e) return (gr[t] = l);
  }
  return t;
}
const el = "http://www.w3.org/1999/xlink";
function Pc(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(el, t.slice(6, t.length))
      : e.setAttributeNS(el, t, n);
  else {
    const l = wa(t);
    n == null || (l && !Gl(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, l ? "" : n);
  }
}
function Rc(e, t, n, r, s, l, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, s, l), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n == null ? "" : n;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = Gl(n))
      : n == null && c === "string"
      ? ((n = ""), (u = !0))
      : c === "number" && ((n = 0), (u = !0));
  }
  try {
    e[t] = n;
  } catch {}
  u && e.removeAttribute(t);
}
const [qo, wc] = (() => {
  let e = Date.now,
    t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let Dr = 0;
const kc = Promise.resolve(),
  Sc = () => {
    Dr = 0;
  },
  Fc = () => Dr || (kc.then(Sc), (Dr = qo()));
function Mc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function xc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Dc(e, t, n, r, s = null) {
  const l = e._vei || (e._vei = {}),
    o = l[t];
  if (r && o) o.value = r;
  else {
    const [u, c] = $c(t);
    if (r) {
      const f = (l[t] = Uc(r, s));
      Mc(e, u, f, c);
    } else o && (xc(e, u, o, c), (l[t] = void 0));
  }
}
const tl = /(?:Once|Passive|Capture)$/;
function $c(e) {
  let t;
  if (tl.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(tl)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [rn(e.slice(2)), t];
}
function Uc(e, t) {
  const n = (r) => {
    const s = r.timeStamp || qo();
    (wc || s >= n.attached - 1) && Xe(Hc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Fc()), n;
}
function Hc(e, t) {
  if (X(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const nl = /^on[a-z]/,
  Wc = (e, t, n, r, s = !1, l, o, u, c) => {
    t === "class"
      ? Nc(e, r, s)
      : t === "style"
      ? Ac(e, n, r)
      : Yn(t)
      ? Zr(t) || Dc(e, t, n, r, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Vc(e, t, r, s)
        )
      ? Rc(e, t, r, l, o, u, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Pc(e, t, r, s));
  };
function Vc(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && nl.test(t) && J(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (nl.test(t) && Re(n))
    ? !1
    : t in e;
}
const jc = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
xi.props;
const Bc = ke({ patchProp: Wc }, Cc);
let rl;
function Kc() {
  return rl || (rl = oc(Bc));
}
const Yc = (...e) => {
  const t = Kc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = Gc(r);
      if (!s) return;
      const l = t._component;
      !J(l) && !l.render && !l.template && (l.template = s.innerHTML),
        (s.innerHTML = "");
      const o = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function Gc(e) {
  return Re(e) ? document.querySelector(e) : e;
}
var Xc = !1;
/*!
 * pinia v2.0.17
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const qc = Symbol();
var sl;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(sl || (sl = {}));
function Jc() {
  const e = to(!0),
    t = e.run(() => Ge({}));
  let n = [],
    r = [];
  const s = cs({
    install(l) {
      (s._a = l),
        l.provide(qc, s),
        (l.config.globalProperties.$pinia = s),
        r.forEach((o) => n.push(o)),
        (r = []);
    },
    use(l) {
      return !this._a && !Xc ? r.push(l) : n.push(l), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
/*!
 * shared v9.2.0-beta.40
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Qc = typeof window < "u",
  zc = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  Pt = (e) => (zc ? Symbol(e) : e),
  Zc = (e, t, n) => eu({ l: e, k: t, s: n }),
  eu = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\u0027/g, "\\u0027"),
  Te = (e) => typeof e == "number" && isFinite(e),
  tu = (e) => vs(e) === "[object Date]",
  Ot = (e) => vs(e) === "[object RegExp]",
  lr = (e) => G(e) && Object.keys(e).length === 0;
function nu(e, t) {
  typeof console < "u" &&
    (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Ce = Object.assign;
let ll;
const gn = () =>
  ll ||
  (ll =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function ol(e) {
  return e
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
const ru = Object.prototype.hasOwnProperty;
function Es(e, t) {
  return ru.call(e, t);
}
const ge = Array.isArray,
  ve = (e) => typeof e == "function",
  x = (e) => typeof e == "string",
  ne = (e) => typeof e == "boolean",
  pe = (e) => e !== null && typeof e == "object",
  Jo = Object.prototype.toString,
  vs = (e) => Jo.call(e),
  G = (e) => vs(e) === "[object Object]",
  su = (e) =>
    e == null
      ? ""
      : ge(e) || (G(e) && e.toString === Jo)
      ? JSON.stringify(e, null, 2)
      : String(e);
/*!
 * message-compiler v9.2.0-beta.40
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const ae = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15,
};
function or(e, t, n = {}) {
  const { domain: r, messages: s, args: l } = n,
    o = e,
    u = new SyntaxError(String(o));
  return (u.code = e), t && (u.location = t), (u.domain = r), u;
}
function lu(e) {
  throw e;
}
function ou(e, t, n) {
  return { line: e, column: t, offset: n };
}
function $r(e, t, n) {
  const r = { start: e, end: t };
  return n != null && (r.source = n), r;
}
const ut = " ",
  au = "\r",
  xe = `
`,
  iu = String.fromCharCode(8232),
  cu = String.fromCharCode(8233);
function uu(e) {
  const t = e;
  let n = 0,
    r = 1,
    s = 1,
    l = 0;
  const o = (D) => t[D] === au && t[D + 1] === xe,
    u = (D) => t[D] === xe,
    c = (D) => t[D] === cu,
    f = (D) => t[D] === iu,
    d = (D) => o(D) || u(D) || c(D) || f(D),
    _ = () => n,
    h = () => r,
    E = () => s,
    N = () => l,
    A = (D) => (o(D) || c(D) || f(D) ? xe : t[D]),
    C = () => A(n),
    g = () => A(n + l);
  function y() {
    return (l = 0), d(n) && (r++, (s = 0)), o(n) && n++, n++, s++, t[n];
  }
  function R() {
    return o(n + l) && l++, l++, t[n + l];
  }
  function L() {
    (n = 0), (r = 1), (s = 1), (l = 0);
  }
  function I(D = 0) {
    l = D;
  }
  function S() {
    const D = n + l;
    for (; D !== n; ) y();
    l = 0;
  }
  return {
    index: _,
    line: h,
    column: E,
    peekOffset: N,
    charAt: A,
    currentChar: C,
    currentPeek: g,
    next: y,
    peek: R,
    reset: L,
    resetPeek: I,
    skipToPeek: S,
  };
}
const bt = void 0,
  al = "'",
  fu = "tokenizer";
function du(e, t = {}) {
  const n = t.location !== !1,
    r = uu(e),
    s = () => r.index(),
    l = () => ou(r.line(), r.column(), r.index()),
    o = l(),
    u = s(),
    c = {
      currentType: 14,
      offset: u,
      startLoc: o,
      endLoc: o,
      lastType: 14,
      lastOffset: u,
      lastStartLoc: o,
      lastEndLoc: o,
      braceNest: 0,
      inLinked: !1,
      text: "",
    },
    f = () => c,
    { onError: d } = t;
  function _(a, i, m, ...b) {
    const v = f();
    if (((i.column += m), (i.offset += m), d)) {
      const O = $r(v.startLoc, i),
        M = or(a, O, { domain: fu, args: b });
      d(M);
    }
  }
  function h(a, i, m) {
    (a.endLoc = l()), (a.currentType = i);
    const b = { type: i };
    return (
      n && (b.loc = $r(a.startLoc, a.endLoc)), m != null && (b.value = m), b
    );
  }
  const E = (a) => h(a, 14);
  function N(a, i) {
    return a.currentChar() === i
      ? (a.next(), i)
      : (_(ae.EXPECTED_TOKEN, l(), 0, i), "");
  }
  function A(a) {
    let i = "";
    for (; a.currentPeek() === ut || a.currentPeek() === xe; )
      (i += a.currentPeek()), a.peek();
    return i;
  }
  function C(a) {
    const i = A(a);
    return a.skipToPeek(), i;
  }
  function g(a) {
    if (a === bt) return !1;
    const i = a.charCodeAt(0);
    return (i >= 97 && i <= 122) || (i >= 65 && i <= 90) || i === 95;
  }
  function y(a) {
    if (a === bt) return !1;
    const i = a.charCodeAt(0);
    return i >= 48 && i <= 57;
  }
  function R(a, i) {
    const { currentType: m } = i;
    if (m !== 2) return !1;
    A(a);
    const b = g(a.currentPeek());
    return a.resetPeek(), b;
  }
  function L(a, i) {
    const { currentType: m } = i;
    if (m !== 2) return !1;
    A(a);
    const b = a.currentPeek() === "-" ? a.peek() : a.currentPeek(),
      v = y(b);
    return a.resetPeek(), v;
  }
  function I(a, i) {
    const { currentType: m } = i;
    if (m !== 2) return !1;
    A(a);
    const b = a.currentPeek() === al;
    return a.resetPeek(), b;
  }
  function S(a, i) {
    const { currentType: m } = i;
    if (m !== 8) return !1;
    A(a);
    const b = a.currentPeek() === ".";
    return a.resetPeek(), b;
  }
  function D(a, i) {
    const { currentType: m } = i;
    if (m !== 9) return !1;
    A(a);
    const b = g(a.currentPeek());
    return a.resetPeek(), b;
  }
  function V(a, i) {
    const { currentType: m } = i;
    if (!(m === 8 || m === 12)) return !1;
    A(a);
    const b = a.currentPeek() === ":";
    return a.resetPeek(), b;
  }
  function j(a, i) {
    const { currentType: m } = i;
    if (m !== 10) return !1;
    const b = () => {
        const O = a.currentPeek();
        return O === "{"
          ? g(a.peek())
          : O === "@" ||
            O === "%" ||
            O === "|" ||
            O === ":" ||
            O === "." ||
            O === ut ||
            !O
          ? !1
          : O === xe
          ? (a.peek(), b())
          : g(O);
      },
      v = b();
    return a.resetPeek(), v;
  }
  function q(a) {
    A(a);
    const i = a.currentPeek() === "|";
    return a.resetPeek(), i;
  }
  function oe(a) {
    const i = A(a),
      m = a.currentPeek() === "%" && a.peek() === "{";
    return a.resetPeek(), { isModulo: m, hasSpace: i.length > 0 };
  }
  function de(a, i = !0) {
    const m = (v = !1, O = "", M = !1) => {
        const k = a.currentPeek();
        return k === "{"
          ? O === "%"
            ? !1
            : v
          : k === "@" || !k
          ? O === "%"
            ? !0
            : v
          : k === "%"
          ? (a.peek(), m(v, "%", !0))
          : k === "|"
          ? O === "%" || M
            ? !0
            : !(O === ut || O === xe)
          : k === ut
          ? (a.peek(), m(!0, ut, M))
          : k === xe
          ? (a.peek(), m(!0, xe, M))
          : !0;
      },
      b = m();
    return i && a.resetPeek(), b;
  }
  function be(a, i) {
    const m = a.currentChar();
    return m === bt ? bt : i(m) ? (a.next(), m) : null;
  }
  function Se(a) {
    return be(a, (m) => {
      const b = m.charCodeAt(0);
      return (
        (b >= 97 && b <= 122) ||
        (b >= 65 && b <= 90) ||
        (b >= 48 && b <= 57) ||
        b === 95 ||
        b === 36
      );
    });
  }
  function je(a) {
    return be(a, (m) => {
      const b = m.charCodeAt(0);
      return b >= 48 && b <= 57;
    });
  }
  function ce(a) {
    return be(a, (m) => {
      const b = m.charCodeAt(0);
      return (
        (b >= 48 && b <= 57) || (b >= 65 && b <= 70) || (b >= 97 && b <= 102)
      );
    });
  }
  function Q(a) {
    let i = "",
      m = "";
    for (; (i = je(a)); ) m += i;
    return m;
  }
  function re(a) {
    C(a);
    const i = a.currentChar();
    return i !== "%" && _(ae.EXPECTED_TOKEN, l(), 0, i), a.next(), "%";
  }
  function ye(a) {
    let i = "";
    for (;;) {
      const m = a.currentChar();
      if (m === "{" || m === "}" || m === "@" || m === "|" || !m) break;
      if (m === "%")
        if (de(a)) (i += m), a.next();
        else break;
      else if (m === ut || m === xe)
        if (de(a)) (i += m), a.next();
        else {
          if (q(a)) break;
          (i += m), a.next();
        }
      else (i += m), a.next();
    }
    return i;
  }
  function Be(a) {
    C(a);
    let i = "",
      m = "";
    for (; (i = Se(a)); ) m += i;
    return (
      a.currentChar() === bt && _(ae.UNTERMINATED_CLOSING_BRACE, l(), 0), m
    );
  }
  function Fe(a) {
    C(a);
    let i = "";
    return (
      a.currentChar() === "-" ? (a.next(), (i += `-${Q(a)}`)) : (i += Q(a)),
      a.currentChar() === bt && _(ae.UNTERMINATED_CLOSING_BRACE, l(), 0),
      i
    );
  }
  function we(a) {
    C(a), N(a, "'");
    let i = "",
      m = "";
    const b = (O) => O !== al && O !== xe;
    for (; (i = be(a, b)); ) i === "\\" ? (m += Ae(a)) : (m += i);
    const v = a.currentChar();
    return v === xe || v === bt
      ? (_(ae.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, l(), 0),
        v === xe && (a.next(), N(a, "'")),
        m)
      : (N(a, "'"), m);
  }
  function Ae(a) {
    const i = a.currentChar();
    switch (i) {
      case "\\":
      case "'":
        return a.next(), `\\${i}`;
      case "u":
        return Ke(a, i, 4);
      case "U":
        return Ke(a, i, 6);
      default:
        return _(ae.UNKNOWN_ESCAPE_SEQUENCE, l(), 0, i), "";
    }
  }
  function Ke(a, i, m) {
    N(a, i);
    let b = "";
    for (let v = 0; v < m; v++) {
      const O = ce(a);
      if (!O) {
        _(
          ae.INVALID_UNICODE_ESCAPE_SEQUENCE,
          l(),
          0,
          `\\${i}${b}${a.currentChar()}`
        );
        break;
      }
      b += O;
    }
    return `\\${i}${b}`;
  }
  function P(a) {
    C(a);
    let i = "",
      m = "";
    const b = (v) => v !== "{" && v !== "}" && v !== ut && v !== xe;
    for (; (i = be(a, b)); ) m += i;
    return m;
  }
  function H(a) {
    let i = "",
      m = "";
    for (; (i = Se(a)); ) m += i;
    return m;
  }
  function F(a) {
    const i = (m = !1, b) => {
      const v = a.currentChar();
      return v === "{" || v === "%" || v === "@" || v === "|" || !v || v === ut
        ? b
        : v === xe
        ? ((b += v), a.next(), i(m, b))
        : ((b += v), a.next(), i(!0, b));
    };
    return i(!1, "");
  }
  function W(a) {
    C(a);
    const i = N(a, "|");
    return C(a), i;
  }
  function ee(a, i) {
    let m = null;
    switch (a.currentChar()) {
      case "{":
        return (
          i.braceNest >= 1 && _(ae.NOT_ALLOW_NEST_PLACEHOLDER, l(), 0),
          a.next(),
          (m = h(i, 2, "{")),
          C(a),
          i.braceNest++,
          m
        );
      case "}":
        return (
          i.braceNest > 0 &&
            i.currentType === 2 &&
            _(ae.EMPTY_PLACEHOLDER, l(), 0),
          a.next(),
          (m = h(i, 3, "}")),
          i.braceNest--,
          i.braceNest > 0 && C(a),
          i.inLinked && i.braceNest === 0 && (i.inLinked = !1),
          m
        );
      case "@":
        return (
          i.braceNest > 0 && _(ae.UNTERMINATED_CLOSING_BRACE, l(), 0),
          (m = te(a, i) || E(i)),
          (i.braceNest = 0),
          m
        );
      default:
        let v = !0,
          O = !0,
          M = !0;
        if (q(a))
          return (
            i.braceNest > 0 && _(ae.UNTERMINATED_CLOSING_BRACE, l(), 0),
            (m = h(i, 1, W(a))),
            (i.braceNest = 0),
            (i.inLinked = !1),
            m
          );
        if (
          i.braceNest > 0 &&
          (i.currentType === 5 || i.currentType === 6 || i.currentType === 7)
        )
          return (
            _(ae.UNTERMINATED_CLOSING_BRACE, l(), 0), (i.braceNest = 0), Y(a, i)
          );
        if ((v = R(a, i))) return (m = h(i, 5, Be(a))), C(a), m;
        if ((O = L(a, i))) return (m = h(i, 6, Fe(a))), C(a), m;
        if ((M = I(a, i))) return (m = h(i, 7, we(a))), C(a), m;
        if (!v && !O && !M)
          return (
            (m = h(i, 13, P(a))),
            _(ae.INVALID_TOKEN_IN_PLACEHOLDER, l(), 0, m.value),
            C(a),
            m
          );
        break;
    }
    return m;
  }
  function te(a, i) {
    const { currentType: m } = i;
    let b = null;
    const v = a.currentChar();
    switch (
      ((m === 8 || m === 9 || m === 12 || m === 10) &&
        (v === xe || v === ut) &&
        _(ae.INVALID_LINKED_FORMAT, l(), 0),
      v)
    ) {
      case "@":
        return a.next(), (b = h(i, 8, "@")), (i.inLinked = !0), b;
      case ".":
        return C(a), a.next(), h(i, 9, ".");
      case ":":
        return C(a), a.next(), h(i, 10, ":");
      default:
        return q(a)
          ? ((b = h(i, 1, W(a))), (i.braceNest = 0), (i.inLinked = !1), b)
          : S(a, i) || V(a, i)
          ? (C(a), te(a, i))
          : D(a, i)
          ? (C(a), h(i, 12, H(a)))
          : j(a, i)
          ? (C(a), v === "{" ? ee(a, i) || b : h(i, 11, F(a)))
          : (m === 8 && _(ae.INVALID_LINKED_FORMAT, l(), 0),
            (i.braceNest = 0),
            (i.inLinked = !1),
            Y(a, i));
    }
  }
  function Y(a, i) {
    let m = { type: 14 };
    if (i.braceNest > 0) return ee(a, i) || E(i);
    if (i.inLinked) return te(a, i) || E(i);
    switch (a.currentChar()) {
      case "{":
        return ee(a, i) || E(i);
      case "}":
        return _(ae.UNBALANCED_CLOSING_BRACE, l(), 0), a.next(), h(i, 3, "}");
      case "@":
        return te(a, i) || E(i);
      default:
        if (q(a))
          return (m = h(i, 1, W(a))), (i.braceNest = 0), (i.inLinked = !1), m;
        const { isModulo: v, hasSpace: O } = oe(a);
        if (v) return O ? h(i, 0, ye(a)) : h(i, 4, re(a));
        if (de(a)) return h(i, 0, ye(a));
        break;
    }
    return m;
  }
  function K() {
    const { currentType: a, offset: i, startLoc: m, endLoc: b } = c;
    return (
      (c.lastType = a),
      (c.lastOffset = i),
      (c.lastStartLoc = m),
      (c.lastEndLoc = b),
      (c.offset = s()),
      (c.startLoc = l()),
      r.currentChar() === bt ? h(c, 14) : Y(r, c)
    );
  }
  return { nextToken: K, currentOffset: s, currentPosition: l, context: f };
}
const mu = "parser",
  hu = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function _u(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "\uFFFD";
    }
  }
}
function gu(e = {}) {
  const t = e.location !== !1,
    { onError: n } = e;
  function r(g, y, R, L, ...I) {
    const S = g.currentPosition();
    if (((S.offset += L), (S.column += L), n)) {
      const D = $r(R, S),
        V = or(y, D, { domain: mu, args: I });
      n(V);
    }
  }
  function s(g, y, R) {
    const L = { type: g, start: y, end: y };
    return t && (L.loc = { start: R, end: R }), L;
  }
  function l(g, y, R, L) {
    (g.end = y), L && (g.type = L), t && g.loc && (g.loc.end = R);
  }
  function o(g, y) {
    const R = g.context(),
      L = s(3, R.offset, R.startLoc);
    return (L.value = y), l(L, g.currentOffset(), g.currentPosition()), L;
  }
  function u(g, y) {
    const R = g.context(),
      { lastOffset: L, lastStartLoc: I } = R,
      S = s(5, L, I);
    return (
      (S.index = parseInt(y, 10)),
      g.nextToken(),
      l(S, g.currentOffset(), g.currentPosition()),
      S
    );
  }
  function c(g, y) {
    const R = g.context(),
      { lastOffset: L, lastStartLoc: I } = R,
      S = s(4, L, I);
    return (
      (S.key = y),
      g.nextToken(),
      l(S, g.currentOffset(), g.currentPosition()),
      S
    );
  }
  function f(g, y) {
    const R = g.context(),
      { lastOffset: L, lastStartLoc: I } = R,
      S = s(9, L, I);
    return (
      (S.value = y.replace(hu, _u)),
      g.nextToken(),
      l(S, g.currentOffset(), g.currentPosition()),
      S
    );
  }
  function d(g) {
    const y = g.nextToken(),
      R = g.context(),
      { lastOffset: L, lastStartLoc: I } = R,
      S = s(8, L, I);
    return y.type !== 12
      ? (r(g, ae.UNEXPECTED_EMPTY_LINKED_MODIFIER, R.lastStartLoc, 0),
        (S.value = ""),
        l(S, L, I),
        { nextConsumeToken: y, node: S })
      : (y.value == null &&
          r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, R.lastStartLoc, 0, nt(y)),
        (S.value = y.value || ""),
        l(S, g.currentOffset(), g.currentPosition()),
        { node: S });
  }
  function _(g, y) {
    const R = g.context(),
      L = s(7, R.offset, R.startLoc);
    return (L.value = y), l(L, g.currentOffset(), g.currentPosition()), L;
  }
  function h(g) {
    const y = g.context(),
      R = s(6, y.offset, y.startLoc);
    let L = g.nextToken();
    if (L.type === 9) {
      const I = d(g);
      (R.modifier = I.node), (L = I.nextConsumeToken || g.nextToken());
    }
    switch (
      (L.type !== 10 &&
        r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(L)),
      (L = g.nextToken()),
      L.type === 2 && (L = g.nextToken()),
      L.type)
    ) {
      case 11:
        L.value == null &&
          r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(L)),
          (R.key = _(g, L.value || ""));
        break;
      case 5:
        L.value == null &&
          r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(L)),
          (R.key = c(g, L.value || ""));
        break;
      case 6:
        L.value == null &&
          r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(L)),
          (R.key = u(g, L.value || ""));
        break;
      case 7:
        L.value == null &&
          r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(L)),
          (R.key = f(g, L.value || ""));
        break;
      default:
        r(g, ae.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const I = g.context(),
          S = s(7, I.offset, I.startLoc);
        return (
          (S.value = ""),
          l(S, I.offset, I.startLoc),
          (R.key = S),
          l(R, I.offset, I.startLoc),
          { nextConsumeToken: L, node: R }
        );
    }
    return l(R, g.currentOffset(), g.currentPosition()), { node: R };
  }
  function E(g) {
    const y = g.context(),
      R = y.currentType === 1 ? g.currentOffset() : y.offset,
      L = y.currentType === 1 ? y.endLoc : y.startLoc,
      I = s(2, R, L);
    I.items = [];
    let S = null;
    do {
      const j = S || g.nextToken();
      switch (((S = null), j.type)) {
        case 0:
          j.value == null &&
            r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(j)),
            I.items.push(o(g, j.value || ""));
          break;
        case 6:
          j.value == null &&
            r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(j)),
            I.items.push(u(g, j.value || ""));
          break;
        case 5:
          j.value == null &&
            r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(j)),
            I.items.push(c(g, j.value || ""));
          break;
        case 7:
          j.value == null &&
            r(g, ae.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, nt(j)),
            I.items.push(f(g, j.value || ""));
          break;
        case 8:
          const q = h(g);
          I.items.push(q.node), (S = q.nextConsumeToken || null);
          break;
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const D = y.currentType === 1 ? y.lastOffset : g.currentOffset(),
      V = y.currentType === 1 ? y.lastEndLoc : g.currentPosition();
    return l(I, D, V), I;
  }
  function N(g, y, R, L) {
    const I = g.context();
    let S = L.items.length === 0;
    const D = s(1, y, R);
    (D.cases = []), D.cases.push(L);
    do {
      const V = E(g);
      S || (S = V.items.length === 0), D.cases.push(V);
    } while (I.currentType !== 14);
    return (
      S && r(g, ae.MUST_HAVE_MESSAGES_IN_PLURAL, R, 0),
      l(D, g.currentOffset(), g.currentPosition()),
      D
    );
  }
  function A(g) {
    const y = g.context(),
      { offset: R, startLoc: L } = y,
      I = E(g);
    return y.currentType === 14 ? I : N(g, R, L, I);
  }
  function C(g) {
    const y = du(g, Ce({}, e)),
      R = y.context(),
      L = s(0, R.offset, R.startLoc);
    return (
      t && L.loc && (L.loc.source = g),
      (L.body = A(y)),
      R.currentType !== 14 &&
        r(
          y,
          ae.UNEXPECTED_LEXICAL_ANALYSIS,
          R.lastStartLoc,
          0,
          g[R.offset] || ""
        ),
      l(L, y.currentOffset(), y.currentPosition()),
      L
    );
  }
  return { parse: C };
}
function nt(e) {
  if (e.type === 14) return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "\u2026" : t;
}
function pu(e, t = {}) {
  const n = { ast: e, helpers: new Set() };
  return { context: () => n, helper: (l) => (n.helpers.add(l), l) };
}
function il(e, t) {
  for (let n = 0; n < e.length; n++) ys(e[n], t);
}
function ys(e, t) {
  switch (e.type) {
    case 1:
      il(e.cases, t), t.helper("plural");
      break;
    case 2:
      il(e.items, t);
      break;
    case 6:
      ys(e.key, t), t.helper("linked"), t.helper("type");
      break;
    case 5:
      t.helper("interpolate"), t.helper("list");
      break;
    case 4:
      t.helper("interpolate"), t.helper("named");
      break;
  }
}
function bu(e, t = {}) {
  const n = pu(e);
  n.helper("normalize"), e.body && ys(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function Eu(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: s, needIndent: l } = t,
    o = {
      source: e.loc.source,
      filename: r,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: s,
      needIndent: l,
      indentLevel: 0,
    },
    u = () => o;
  function c(A, C) {
    o.code += A;
  }
  function f(A, C = !0) {
    const g = C ? s : "";
    c(l ? g + "  ".repeat(A) : g);
  }
  function d(A = !0) {
    const C = ++o.indentLevel;
    A && f(C);
  }
  function _(A = !0) {
    const C = --o.indentLevel;
    A && f(C);
  }
  function h() {
    f(o.indentLevel);
  }
  return {
    context: u,
    push: c,
    indent: d,
    deindent: _,
    newline: h,
    helper: (A) => `_${A}`,
    needIndent: () => o.needIndent,
  };
}
function vu(e, t) {
  const { helper: n } = e;
  e.push(`${n("linked")}(`),
    en(e, t.key),
    t.modifier
      ? (e.push(", "), en(e, t.modifier), e.push(", _type"))
      : e.push(", undefined, _type"),
    e.push(")");
}
function yu(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n("normalize")}([`), e.indent(r());
  const s = t.items.length;
  for (let l = 0; l < s && (en(e, t.items[l]), l !== s - 1); l++) e.push(", ");
  e.deindent(r()), e.push("])");
}
function Lu(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n("plural")}([`), e.indent(r());
    const s = t.cases.length;
    for (let l = 0; l < s && (en(e, t.cases[l]), l !== s - 1); l++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Tu(e, t) {
  t.body ? en(e, t.body) : e.push("null");
}
function en(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Tu(e, t);
      break;
    case 1:
      Lu(e, t);
      break;
    case 2:
      yu(e, t);
      break;
    case 6:
      vu(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const Iu = (e, t = {}) => {
  const n = x(t.mode) ? t.mode : "normal",
    r = x(t.filename) ? t.filename : "message.intl",
    s = !!t.sourceMap,
    l =
      t.breakLineCode != null
        ? t.breakLineCode
        : n === "arrow"
        ? ";"
        : `
`,
    o = t.needIndent ? t.needIndent : n !== "arrow",
    u = e.helpers || [],
    c = Eu(e, {
      mode: n,
      filename: r,
      sourceMap: s,
      breakLineCode: l,
      needIndent: o,
    });
  c.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    c.indent(o),
    u.length > 0 &&
      (c.push(`const { ${u.map((_) => `${_}: _${_}`).join(", ")} } = ctx`),
      c.newline()),
    c.push("return "),
    en(c, e),
    c.deindent(o),
    c.push("}");
  const { code: f, map: d } = c.context();
  return { ast: e, code: f, map: d ? d.toJSON() : void 0 };
};
function Cu(e, t = {}) {
  const n = Ce({}, t),
    s = gu(n).parse(e);
  return bu(s, n), Iu(s, n);
}
/*!
 * devtools-if v9.2.0-beta.40
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Qo = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate",
};
/*!
 * core-base v9.2.0-beta.40
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const Rt = [];
Rt[0] = { w: [0], i: [3, 0], ["["]: [4], o: [7] };
Rt[1] = { w: [1], ["."]: [2], ["["]: [4], o: [7] };
Rt[2] = { w: [2], i: [3, 0], [0]: [3, 0] };
Rt[3] = {
  i: [3, 0],
  [0]: [3, 0],
  w: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  o: [7, 1],
};
Rt[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [4, 2],
  ["]"]: [1, 3],
  o: 8,
  l: [4, 0],
};
Rt[5] = { ["'"]: [4, 0], o: 8, l: [5, 0] };
Rt[6] = { ['"']: [4, 0], o: 8, l: [6, 0] };
const Nu = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Au(e) {
  return Nu.test(e);
}
function Ou(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Pu(e) {
  if (e == null) return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Ru(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e))
    ? !1
    : Au(t)
    ? Ou(t)
    : "*" + t;
}
function wu(e) {
  const t = [];
  let n = -1,
    r = 0,
    s = 0,
    l,
    o,
    u,
    c,
    f,
    d,
    _;
  const h = [];
  (h[0] = () => {
    o === void 0 ? (o = u) : (o += u);
  }),
    (h[1] = () => {
      o !== void 0 && (t.push(o), (o = void 0));
    }),
    (h[2] = () => {
      h[0](), s++;
    }),
    (h[3] = () => {
      if (s > 0) s--, (r = 4), h[0]();
      else {
        if (((s = 0), o === void 0 || ((o = Ru(o)), o === !1))) return !1;
        h[1]();
      }
    });
  function E() {
    const N = e[n + 1];
    if ((r === 5 && N === "'") || (r === 6 && N === '"'))
      return n++, (u = "\\" + N), h[0](), !0;
  }
  for (; r !== null; )
    if ((n++, (l = e[n]), !(l === "\\" && E()))) {
      if (
        ((c = Pu(l)),
        (_ = Rt[r]),
        (f = _[c] || _.l || 8),
        f === 8 ||
          ((r = f[0]),
          f[1] !== void 0 && ((d = h[f[1]]), d && ((u = l), d() === !1))))
      )
        return;
      if (r === 7) return t;
    }
}
const cl = new Map();
function ku(e, t) {
  return pe(e) ? e[t] : null;
}
function Su(e, t) {
  if (!pe(e)) return null;
  let n = cl.get(t);
  if ((n || ((n = wu(t)), n && cl.set(t, n)), !n)) return null;
  const r = n.length;
  let s = e,
    l = 0;
  for (; l < r; ) {
    const o = s[n[l]];
    if (o === void 0) return null;
    (s = o), l++;
  }
  return s;
}
const Fu = (e) => e,
  Mu = (e) => "",
  xu = "text",
  Du = (e) => (e.length === 0 ? "" : e.join("")),
  $u = su;
function ul(e, t) {
  return (
    (e = Math.abs(e)),
    t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  );
}
function Uu(e) {
  const t = Te(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Te(e.named.count) || Te(e.named.n))
    ? Te(e.named.count)
      ? e.named.count
      : Te(e.named.n)
      ? e.named.n
      : t
    : t;
}
function Hu(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Wu(e = {}) {
  const t = e.locale,
    n = Uu(e),
    r =
      pe(e.pluralRules) && x(t) && ve(e.pluralRules[t]) ? e.pluralRules[t] : ul,
    s = pe(e.pluralRules) && x(t) && ve(e.pluralRules[t]) ? ul : void 0,
    l = (g) => g[r(n, g.length, s)],
    o = e.list || [],
    u = (g) => o[g],
    c = e.named || {};
  Te(e.pluralIndex) && Hu(n, c);
  const f = (g) => c[g];
  function d(g) {
    const y = ve(e.messages)
      ? e.messages(g)
      : pe(e.messages)
      ? e.messages[g]
      : !1;
    return y || (e.parent ? e.parent.message(g) : Mu);
  }
  const _ = (g) => (e.modifiers ? e.modifiers[g] : Fu),
    h =
      G(e.processor) && ve(e.processor.normalize) ? e.processor.normalize : Du,
    E =
      G(e.processor) && ve(e.processor.interpolate)
        ? e.processor.interpolate
        : $u,
    N = G(e.processor) && x(e.processor.type) ? e.processor.type : xu,
    C = {
      list: u,
      named: f,
      plural: l,
      linked: (g, ...y) => {
        const [R, L] = y;
        let I = "text",
          S = "";
        y.length === 1
          ? pe(R)
            ? ((S = R.modifier || S), (I = R.type || I))
            : x(R) && (S = R || S)
          : y.length === 2 && (x(R) && (S = R || S), x(L) && (I = L || I));
        let D = d(g)(C);
        return I === "vnode" && ge(D) && S && (D = D[0]), S ? _(S)(D, I) : D;
      },
      message: d,
      type: N,
      interpolate: E,
      normalize: h,
    };
  return C;
}
let Nn = null;
function Vu(e) {
  Nn = e;
}
function ju(e, t, n) {
  Nn &&
    Nn.emit(Qo.I18nInit, {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n,
    });
}
const Bu = Ku(Qo.FunctionTranslate);
function Ku(e) {
  return (t) => Nn && Nn.emit(e, t);
}
const Yu = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7,
};
function Gu(e, t, n) {
  return [
    ...new Set([n, ...(ge(t) ? t : pe(t) ? Object.keys(t) : x(t) ? [t] : [n])]),
  ];
}
function zo(e, t, n) {
  const r = x(n) ? n : Pn,
    s = e;
  s.__localeChainCache || (s.__localeChainCache = new Map());
  let l = s.__localeChainCache.get(r);
  if (!l) {
    l = [];
    let o = [n];
    for (; ge(o); ) o = fl(l, o, t);
    const u = ge(t) || !G(t) ? t : t.default ? t.default : null;
    (o = x(u) ? [u] : u), ge(o) && fl(l, o, !1), s.__localeChainCache.set(r, l);
  }
  return l;
}
function fl(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && ne(r); s++) {
    const l = t[s];
    x(l) && (r = Xu(e, t[s], n));
  }
  return r;
}
function Xu(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const l = s.join("-");
    (r = qu(e, l, n)), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function qu(e, t, n) {
  let r = !1;
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (ge(n) || G(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const Ju = "9.2.0-beta.40",
  ar = -1,
  Pn = "en-US",
  dl = "",
  ml = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Qu() {
  return {
    upper: (e, t) =>
      t === "text" && x(e)
        ? e.toUpperCase()
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? e.children.toUpperCase()
        : e,
    lower: (e, t) =>
      t === "text" && x(e)
        ? e.toLowerCase()
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? e.children.toLowerCase()
        : e,
    capitalize: (e, t) =>
      t === "text" && x(e)
        ? ml(e)
        : t === "vnode" && pe(e) && "__v_isVNode" in e
        ? ml(e.children)
        : e,
  };
}
let Zo;
function zu(e) {
  Zo = e;
}
let ea;
function Zu(e) {
  ea = e;
}
let ta;
function ef(e) {
  ta = e;
}
let na = null;
const hl = (e) => {
    na = e;
  },
  tf = () => na;
let ra = null;
const _l = (e) => {
    ra = e;
  },
  nf = () => ra;
let gl = 0;
function rf(e = {}) {
  const t = x(e.version) ? e.version : Ju,
    n = x(e.locale) ? e.locale : Pn,
    r =
      ge(e.fallbackLocale) ||
      G(e.fallbackLocale) ||
      x(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : n,
    s = G(e.messages) ? e.messages : { [n]: {} },
    l = G(e.datetimeFormats) ? e.datetimeFormats : { [n]: {} },
    o = G(e.numberFormats) ? e.numberFormats : { [n]: {} },
    u = Ce({}, e.modifiers || {}, Qu()),
    c = e.pluralRules || {},
    f = ve(e.missing) ? e.missing : null,
    d = ne(e.missingWarn) || Ot(e.missingWarn) ? e.missingWarn : !0,
    _ = ne(e.fallbackWarn) || Ot(e.fallbackWarn) ? e.fallbackWarn : !0,
    h = !!e.fallbackFormat,
    E = !!e.unresolving,
    N = ve(e.postTranslation) ? e.postTranslation : null,
    A = G(e.processor) ? e.processor : null,
    C = ne(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    g = !!e.escapeParameter,
    y = ve(e.messageCompiler) ? e.messageCompiler : Zo,
    R = ve(e.messageResolver) ? e.messageResolver : ea || ku,
    L = ve(e.localeFallbacker) ? e.localeFallbacker : ta || Gu,
    I = pe(e.fallbackContext) ? e.fallbackContext : void 0,
    S = ve(e.onWarn) ? e.onWarn : nu,
    D = e,
    V = pe(D.__datetimeFormatters) ? D.__datetimeFormatters : new Map(),
    j = pe(D.__numberFormatters) ? D.__numberFormatters : new Map(),
    q = pe(D.__meta) ? D.__meta : {};
  gl++;
  const oe = {
    version: t,
    cid: gl,
    locale: n,
    fallbackLocale: r,
    messages: s,
    modifiers: u,
    pluralRules: c,
    missing: f,
    missingWarn: d,
    fallbackWarn: _,
    fallbackFormat: h,
    unresolving: E,
    postTranslation: N,
    processor: A,
    warnHtmlMessage: C,
    escapeParameter: g,
    messageCompiler: y,
    messageResolver: R,
    localeFallbacker: L,
    fallbackContext: I,
    onWarn: S,
    __meta: q,
  };
  return (
    (oe.datetimeFormats = l),
    (oe.numberFormats = o),
    (oe.__datetimeFormatters = V),
    (oe.__numberFormatters = j),
    __INTLIFY_PROD_DEVTOOLS__ && ju(oe, t, q),
    oe
  );
}
function Ls(e, t, n, r, s) {
  const { missing: l, onWarn: o } = e;
  if (l !== null) {
    const u = l(e, n, t, s);
    return x(u) ? u : t;
  } else return t;
}
function cn(e, t, n) {
  const r = e;
  (r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t);
}
const sf = (e) => e;
let pl = Object.create(null);
function lf(e, t = {}) {
  {
    const r = (t.onCacheKey || sf)(e),
      s = pl[r];
    if (s) return s;
    let l = !1;
    const o = t.onError || lu;
    t.onError = (f) => {
      (l = !0), o(f);
    };
    const { code: u } = Cu(e, t),
      c = new Function(`return ${u}`)();
    return l ? c : (pl[r] = c);
  }
}
let sa = ae.__EXTEND_POINT__;
const pr = () => ++sa,
  Kt = {
    INVALID_ARGUMENT: sa,
    INVALID_DATE_ARGUMENT: pr(),
    INVALID_ISO_DATE_ARGUMENT: pr(),
    __EXTEND_POINT__: pr(),
  };
function Yt(e) {
  return or(e, null, void 0);
}
const bl = () => "",
  lt = (e) => ve(e);
function El(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: s,
      messageCompiler: l,
      fallbackLocale: o,
      messages: u,
    } = e,
    [c, f] = Ur(...t),
    d = ne(f.missingWarn) ? f.missingWarn : e.missingWarn,
    _ = ne(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn,
    h = ne(f.escapeParameter) ? f.escapeParameter : e.escapeParameter,
    E = !!f.resolvedMessage,
    N =
      x(f.default) || ne(f.default)
        ? ne(f.default)
          ? l
            ? c
            : () => c
          : f.default
        : n
        ? l
          ? c
          : () => c
        : "",
    A = n || N !== "",
    C = x(f.locale) ? f.locale : e.locale;
  h && of(f);
  let [g, y, R] = E ? [c, C, u[C] || {}] : la(e, c, C, o, _, d),
    L = g,
    I = c;
  if (
    (!E && !(x(L) || lt(L)) && A && ((L = N), (I = L)),
    !E && (!(x(L) || lt(L)) || !x(y)))
  )
    return s ? ar : c;
  let S = !1;
  const D = () => {
      S = !0;
    },
    V = lt(L) ? L : oa(e, c, y, L, I, D);
  if (S) return L;
  const j = uf(e, y, R, f),
    q = Wu(j),
    oe = af(e, V, q),
    de = r ? r(oe, c) : oe;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const be = {
      timestamp: Date.now(),
      key: x(c) ? c : lt(L) ? L.key : "",
      locale: y || (lt(L) ? L.locale : ""),
      format: x(L) ? L : lt(L) ? L.source : "",
      message: de,
    };
    (be.meta = Ce({}, e.__meta, tf() || {})), Bu(be);
  }
  return de;
}
function of(e) {
  ge(e.list)
    ? (e.list = e.list.map((t) => (x(t) ? ol(t) : t)))
    : pe(e.named) &&
      Object.keys(e.named).forEach((t) => {
        x(e.named[t]) && (e.named[t] = ol(e.named[t]));
      });
}
function la(e, t, n, r, s, l) {
  const { messages: o, onWarn: u, messageResolver: c, localeFallbacker: f } = e,
    d = f(e, r, n);
  let _ = {},
    h,
    E = null;
  const N = "translate";
  for (
    let A = 0;
    A < d.length &&
    ((h = d[A]),
    (_ = o[h] || {}),
    (E = c(_, t)) === null && (E = _[t]),
    !(x(E) || ve(E)));
    A++
  ) {
    const C = Ls(e, t, h, l, N);
    C !== t && (E = C);
  }
  return [E, h, _];
}
function oa(e, t, n, r, s, l) {
  const { messageCompiler: o, warnHtmlMessage: u } = e;
  if (lt(r)) {
    const f = r;
    return (f.locale = f.locale || n), (f.key = f.key || t), f;
  }
  if (o == null) {
    const f = () => r;
    return (f.locale = n), (f.key = t), f;
  }
  const c = o(r, cf(e, n, s, r, u, l));
  return (c.locale = n), (c.key = t), (c.source = r), c;
}
function af(e, t, n) {
  return t(n);
}
function Ur(...e) {
  const [t, n, r] = e,
    s = {};
  if (!x(t) && !Te(t) && !lt(t)) throw Yt(Kt.INVALID_ARGUMENT);
  const l = Te(t) ? String(t) : (lt(t), t);
  return (
    Te(n)
      ? (s.plural = n)
      : x(n)
      ? (s.default = n)
      : G(n) && !lr(n)
      ? (s.named = n)
      : ge(n) && (s.list = n),
    Te(r) ? (s.plural = r) : x(r) ? (s.default = r) : G(r) && Ce(s, r),
    [l, s]
  );
}
function cf(e, t, n, r, s, l) {
  return {
    warnHtmlMessage: s,
    onError: (o) => {
      throw (l && l(o), o);
    },
    onCacheKey: (o) => Zc(t, n, o),
  };
}
function uf(e, t, n, r) {
  const {
      modifiers: s,
      pluralRules: l,
      messageResolver: o,
      fallbackLocale: u,
      fallbackWarn: c,
      missingWarn: f,
      fallbackContext: d,
    } = e,
    h = {
      locale: t,
      modifiers: s,
      pluralRules: l,
      messages: (E) => {
        let N = o(n, E);
        if (N == null && d) {
          const [, , A] = la(d, E, t, u, c, f);
          N = o(A, E);
        }
        if (x(N)) {
          let A = !1;
          const g = oa(e, E, t, N, E, () => {
            A = !0;
          });
          return A ? bl : g;
        } else return lt(N) ? N : bl;
      },
    };
  return (
    e.processor && (h.processor = e.processor),
    r.list && (h.list = r.list),
    r.named && (h.named = r.named),
    Te(r.plural) && (h.pluralIndex = r.plural),
    h
  );
}
function vl(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: l,
      localeFallbacker: o,
    } = e,
    { __datetimeFormatters: u } = e,
    [c, f, d, _] = Hr(...t),
    h = ne(d.missingWarn) ? d.missingWarn : e.missingWarn;
  ne(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn;
  const E = !!d.part,
    N = x(d.locale) ? d.locale : e.locale,
    A = o(e, s, N);
  if (!x(c) || c === "") return new Intl.DateTimeFormat(N, _).format(f);
  let C = {},
    g,
    y = null;
  const R = "datetime format";
  for (
    let S = 0;
    S < A.length && ((g = A[S]), (C = n[g] || {}), (y = C[c]), !G(y));
    S++
  )
    Ls(e, c, g, h, R);
  if (!G(y) || !x(g)) return r ? ar : c;
  let L = `${g}__${c}`;
  lr(_) || (L = `${L}__${JSON.stringify(_)}`);
  let I = u.get(L);
  return (
    I || ((I = new Intl.DateTimeFormat(g, Ce({}, y, _))), u.set(L, I)),
    E ? I.formatToParts(f) : I.format(f)
  );
}
const aa = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits",
];
function Hr(...e) {
  const [t, n, r, s] = e,
    l = {};
  let o = {},
    u;
  if (x(t)) {
    const c = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!c) throw Yt(Kt.INVALID_ISO_DATE_ARGUMENT);
    const f = c[3]
      ? c[3].trim().startsWith("T")
        ? `${c[1].trim()}${c[3].trim()}`
        : `${c[1].trim()}T${c[3].trim()}`
      : c[1].trim();
    u = new Date(f);
    try {
      u.toISOString();
    } catch {
      throw Yt(Kt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (tu(t)) {
    if (isNaN(t.getTime())) throw Yt(Kt.INVALID_DATE_ARGUMENT);
    u = t;
  } else if (Te(t)) u = t;
  else throw Yt(Kt.INVALID_ARGUMENT);
  return (
    x(n)
      ? (l.key = n)
      : G(n) &&
        Object.keys(n).forEach((c) => {
          aa.includes(c) ? (o[c] = n[c]) : (l[c] = n[c]);
        }),
    x(r) ? (l.locale = r) : G(r) && (o = r),
    G(s) && (o = s),
    [l.key || "", u, l, o]
  );
}
function yl(e, t, n) {
  const r = e;
  for (const s in n) {
    const l = `${t}__${s}`;
    !r.__datetimeFormatters.has(l) || r.__datetimeFormatters.delete(l);
  }
}
function Ll(e, ...t) {
  const {
      numberFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: l,
      localeFallbacker: o,
    } = e,
    { __numberFormatters: u } = e,
    [c, f, d, _] = Wr(...t),
    h = ne(d.missingWarn) ? d.missingWarn : e.missingWarn;
  ne(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn;
  const E = !!d.part,
    N = x(d.locale) ? d.locale : e.locale,
    A = o(e, s, N);
  if (!x(c) || c === "") return new Intl.NumberFormat(N, _).format(f);
  let C = {},
    g,
    y = null;
  const R = "number format";
  for (
    let S = 0;
    S < A.length && ((g = A[S]), (C = n[g] || {}), (y = C[c]), !G(y));
    S++
  )
    Ls(e, c, g, h, R);
  if (!G(y) || !x(g)) return r ? ar : c;
  let L = `${g}__${c}`;
  lr(_) || (L = `${L}__${JSON.stringify(_)}`);
  let I = u.get(L);
  return (
    I || ((I = new Intl.NumberFormat(g, Ce({}, y, _))), u.set(L, I)),
    E ? I.formatToParts(f) : I.format(f)
  );
}
const ia = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay",
];
function Wr(...e) {
  const [t, n, r, s] = e,
    l = {};
  let o = {};
  if (!Te(t)) throw Yt(Kt.INVALID_ARGUMENT);
  const u = t;
  return (
    x(n)
      ? (l.key = n)
      : G(n) &&
        Object.keys(n).forEach((c) => {
          ia.includes(c) ? (o[c] = n[c]) : (l[c] = n[c]);
        }),
    x(r) ? (l.locale = r) : G(r) && (o = r),
    G(s) && (o = s),
    [l.key || "", u, l, o]
  );
}
function Tl(e, t, n) {
  const r = e;
  for (const s in n) {
    const l = `${t}__${s}`;
    !r.__numberFormatters.has(l) || r.__numberFormatters.delete(l);
  }
}
typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
  (gn().__INTLIFY_PROD_DEVTOOLS__ = !1);
/*!
 * vue-i18n v9.2.0-beta.40
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */ const ff = "9.2.0-beta.40";
function df() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" &&
    (gn().__VUE_I18N_FULL_INSTALL__ = !0),
    typeof __VUE_I18N_LEGACY_API__ != "boolean" &&
      (gn().__VUE_I18N_LEGACY_API__ = !0),
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
      (gn().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
Yu.__EXTEND_POINT__;
let ca = ae.__EXTEND_POINT__;
const De = () => ++ca,
  Le = {
    UNEXPECTED_RETURN_TYPE: ca,
    INVALID_ARGUMENT: De(),
    MUST_BE_CALL_SETUP_TOP: De(),
    NOT_INSLALLED: De(),
    NOT_AVAILABLE_IN_LEGACY_MODE: De(),
    REQUIRED_VALUE: De(),
    INVALID_VALUE: De(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: De(),
    NOT_INSLALLED_WITH_PROVIDE: De(),
    UNEXPECTED_ERROR: De(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: De(),
    BRIDGE_SUPPORT_VUE_2_ONLY: De(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: De(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: De(),
    __EXTEND_POINT__: De(),
  };
function Ie(e, ...t) {
  return or(e, null, void 0);
}
const Vr = Pt("__transrateVNode"),
  jr = Pt("__datetimeParts"),
  Br = Pt("__numberParts"),
  ua = Pt("__setPluralRules");
Pt("__intlifyMeta");
const fa = Pt("__injectWithOption");
function Kr(e) {
  if (!pe(e)) return e;
  for (const t in e)
    if (!!Es(e, t))
      if (!t.includes(".")) pe(e[t]) && Kr(e[t]);
      else {
        const n = t.split("."),
          r = n.length - 1;
        let s = e;
        for (let l = 0; l < r; l++) n[l] in s || (s[n[l]] = {}), (s = s[n[l]]);
        (s[n[r]] = e[t]), delete e[t], pe(s[n[r]]) && Kr(s[n[r]]);
      }
  return e;
}
function ir(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: l } = t,
    o = G(n) ? n : ge(r) ? {} : { [e]: {} };
  if (
    (ge(r) &&
      r.forEach((u) => {
        if ("locale" in u && "resource" in u) {
          const { locale: c, resource: f } = u;
          c ? ((o[c] = o[c] || {}), pn(f, o[c])) : pn(f, o);
        } else x(u) && pn(JSON.parse(u), o);
      }),
    s == null && l)
  )
    for (const u in o) Es(o, u) && Kr(o[u]);
  return o;
}
const Mn = (e) => !pe(e) || ge(e);
function pn(e, t) {
  if (Mn(e) || Mn(t)) throw Ie(Le.INVALID_VALUE);
  for (const n in e)
    Es(e, n) && (Mn(e[n]) || Mn(t[n]) ? (t[n] = e[n]) : pn(e[n], t[n]));
}
function da(e) {
  return e.type;
}
function ma(e, t, n) {
  let r = pe(t.messages) ? t.messages : {};
  "__i18nGlobal" in n &&
    (r = ir(e.locale.value, { messages: r, __i18n: n.__i18nGlobal }));
  const s = Object.keys(r);
  s.length &&
    s.forEach((l) => {
      e.mergeLocaleMessage(l, r[l]);
    });
  {
    if (pe(t.datetimeFormats)) {
      const l = Object.keys(t.datetimeFormats);
      l.length &&
        l.forEach((o) => {
          e.mergeDateTimeFormat(o, t.datetimeFormats[o]);
        });
    }
    if (pe(t.numberFormats)) {
      const l = Object.keys(t.numberFormats);
      l.length &&
        l.forEach((o) => {
          e.mergeNumberFormat(o, t.numberFormats[o]);
        });
    }
  }
}
function Il(e) {
  return fe(nr, null, e, 0);
}
const Cl = "__INTLIFY_META__";
let Nl = 0;
function Al(e) {
  return (t, n, r, s) => e(n, r, zt() || void 0, s);
}
const mf = () => {
  const e = zt();
  let t = null;
  return e && (t = da(e)[Cl]) ? { [Cl]: t } : null;
};
function Ts(e = {}, t) {
  const { __root: n } = e,
    r = n === void 0;
  let s = ne(e.inheritLocale) ? e.inheritLocale : !0;
  const l = Ge(n && s ? n.locale.value : x(e.locale) ? e.locale : Pn),
    o = Ge(
      n && s
        ? n.fallbackLocale.value
        : x(e.fallbackLocale) ||
          ge(e.fallbackLocale) ||
          G(e.fallbackLocale) ||
          e.fallbackLocale === !1
        ? e.fallbackLocale
        : l.value
    ),
    u = Ge(ir(l.value, e)),
    c = Ge(G(e.datetimeFormats) ? e.datetimeFormats : { [l.value]: {} }),
    f = Ge(G(e.numberFormats) ? e.numberFormats : { [l.value]: {} });
  let d = n
      ? n.missingWarn
      : ne(e.missingWarn) || Ot(e.missingWarn)
      ? e.missingWarn
      : !0,
    _ = n
      ? n.fallbackWarn
      : ne(e.fallbackWarn) || Ot(e.fallbackWarn)
      ? e.fallbackWarn
      : !0,
    h = n ? n.fallbackRoot : ne(e.fallbackRoot) ? e.fallbackRoot : !0,
    E = !!e.fallbackFormat,
    N = ve(e.missing) ? e.missing : null,
    A = ve(e.missing) ? Al(e.missing) : null,
    C = ve(e.postTranslation) ? e.postTranslation : null,
    g = n ? n.warnHtmlMessage : ne(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    y = !!e.escapeParameter;
  const R = n ? n.modifiers : G(e.modifiers) ? e.modifiers : {};
  let L = e.pluralRules || (n && n.pluralRules),
    I;
  function S() {
    r && _l(null);
    const p = {
      version: ff,
      locale: l.value,
      fallbackLocale: o.value,
      messages: u.value,
      modifiers: R,
      pluralRules: L,
      missing: A === null ? void 0 : A,
      missingWarn: d,
      fallbackWarn: _,
      fallbackFormat: E,
      unresolving: !0,
      postTranslation: C === null ? void 0 : C,
      warnHtmlMessage: g,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      __meta: { framework: "vue" },
    };
    (p.datetimeFormats = c.value),
      (p.numberFormats = f.value),
      (p.__datetimeFormatters = G(I) ? I.__datetimeFormatters : void 0),
      (p.__numberFormatters = G(I) ? I.__numberFormatters : void 0);
    const T = rf(p);
    return r && _l(T), T;
  }
  (I = S()), cn(I, l.value, o.value);
  function D() {
    return [l.value, o.value, u.value, c.value, f.value];
  }
  const V = Ee({
      get: () => l.value,
      set: (p) => {
        (l.value = p), (I.locale = l.value);
      },
    }),
    j = Ee({
      get: () => o.value,
      set: (p) => {
        (o.value = p), (I.fallbackLocale = o.value), cn(I, l.value, p);
      },
    }),
    q = Ee(() => u.value),
    oe = Ee(() => c.value),
    de = Ee(() => f.value);
  function be() {
    return ve(C) ? C : null;
  }
  function Se(p) {
    (C = p), (I.postTranslation = p);
  }
  function je() {
    return N;
  }
  function ce(p) {
    p !== null && (A = Al(p)), (N = p), (I.missing = A);
  }
  function Q(p, T, $, U, B, z) {
    D();
    let se;
    if (__INTLIFY_PROD_DEVTOOLS__)
      try {
        hl(mf()), r || (I.fallbackContext = n ? nf() : void 0), (se = p(I));
      } finally {
        hl(null), r || (I.fallbackContext = void 0);
      }
    else se = p(I);
    if (Te(se) && se === ar) {
      const [ue, he] = T();
      return n && h ? U(n) : B(ue);
    } else {
      if (z(se)) return se;
      throw Ie(Le.UNEXPECTED_RETURN_TYPE);
    }
  }
  function re(...p) {
    return Q(
      (T) => Reflect.apply(El, null, [T, ...p]),
      () => Ur(...p),
      "translate",
      (T) => Reflect.apply(T.t, T, [...p]),
      (T) => T,
      (T) => x(T)
    );
  }
  function ye(...p) {
    const [T, $, U] = p;
    if (U && !pe(U)) throw Ie(Le.INVALID_ARGUMENT);
    return re(T, $, Ce({ resolvedMessage: !0 }, U || {}));
  }
  function Be(...p) {
    return Q(
      (T) => Reflect.apply(vl, null, [T, ...p]),
      () => Hr(...p),
      "datetime format",
      (T) => Reflect.apply(T.d, T, [...p]),
      () => dl,
      (T) => x(T)
    );
  }
  function Fe(...p) {
    return Q(
      (T) => Reflect.apply(Ll, null, [T, ...p]),
      () => Wr(...p),
      "number format",
      (T) => Reflect.apply(T.n, T, [...p]),
      () => dl,
      (T) => x(T)
    );
  }
  function we(p) {
    return p.map((T) => (x(T) || Te(T) || ne(T) ? Il(String(T)) : T));
  }
  const Ke = { normalize: we, interpolate: (p) => p, type: "vnode" };
  function P(...p) {
    return Q(
      (T) => {
        let $;
        const U = T;
        try {
          (U.processor = Ke), ($ = Reflect.apply(El, null, [U, ...p]));
        } finally {
          U.processor = null;
        }
        return $;
      },
      () => Ur(...p),
      "translate",
      (T) => T[Vr](...p),
      (T) => [Il(T)],
      (T) => ge(T)
    );
  }
  function H(...p) {
    return Q(
      (T) => Reflect.apply(Ll, null, [T, ...p]),
      () => Wr(...p),
      "number format",
      (T) => T[Br](...p),
      () => [],
      (T) => x(T) || ge(T)
    );
  }
  function F(...p) {
    return Q(
      (T) => Reflect.apply(vl, null, [T, ...p]),
      () => Hr(...p),
      "datetime format",
      (T) => T[jr](...p),
      () => [],
      (T) => x(T) || ge(T)
    );
  }
  function W(p) {
    (L = p), (I.pluralRules = L);
  }
  function ee(p, T) {
    const $ = x(T) ? T : l.value,
      U = K($);
    return I.messageResolver(U, p) !== null;
  }
  function te(p) {
    let T = null;
    const $ = zo(I, o.value, l.value);
    for (let U = 0; U < $.length; U++) {
      const B = u.value[$[U]] || {},
        z = I.messageResolver(B, p);
      if (z != null) {
        T = z;
        break;
      }
    }
    return T;
  }
  function Y(p) {
    const T = te(p);
    return T != null ? T : n ? n.tm(p) || {} : {};
  }
  function K(p) {
    return u.value[p] || {};
  }
  function a(p, T) {
    (u.value[p] = T), (I.messages = u.value);
  }
  function i(p, T) {
    (u.value[p] = u.value[p] || {}), pn(T, u.value[p]), (I.messages = u.value);
  }
  function m(p) {
    return c.value[p] || {};
  }
  function b(p, T) {
    (c.value[p] = T), (I.datetimeFormats = c.value), yl(I, p, T);
  }
  function v(p, T) {
    (c.value[p] = Ce(c.value[p] || {}, T)),
      (I.datetimeFormats = c.value),
      yl(I, p, T);
  }
  function O(p) {
    return f.value[p] || {};
  }
  function M(p, T) {
    (f.value[p] = T), (I.numberFormats = f.value), Tl(I, p, T);
  }
  function k(p, T) {
    (f.value[p] = Ce(f.value[p] || {}, T)),
      (I.numberFormats = f.value),
      Tl(I, p, T);
  }
  Nl++,
    n &&
      Qc &&
      (Jt(n.locale, (p) => {
        s && ((l.value = p), (I.locale = p), cn(I, l.value, o.value));
      }),
      Jt(n.fallbackLocale, (p) => {
        s && ((o.value = p), (I.fallbackLocale = p), cn(I, l.value, o.value));
      }));
  const w = {
    id: Nl,
    locale: V,
    fallbackLocale: j,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(p) {
      (s = p),
        p &&
          n &&
          ((l.value = n.locale.value),
          (o.value = n.fallbackLocale.value),
          cn(I, l.value, o.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: q,
    get modifiers() {
      return R;
    },
    get pluralRules() {
      return L || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return d;
    },
    set missingWarn(p) {
      (d = p), (I.missingWarn = d);
    },
    get fallbackWarn() {
      return _;
    },
    set fallbackWarn(p) {
      (_ = p), (I.fallbackWarn = _);
    },
    get fallbackRoot() {
      return h;
    },
    set fallbackRoot(p) {
      h = p;
    },
    get fallbackFormat() {
      return E;
    },
    set fallbackFormat(p) {
      (E = p), (I.fallbackFormat = E);
    },
    get warnHtmlMessage() {
      return g;
    },
    set warnHtmlMessage(p) {
      (g = p), (I.warnHtmlMessage = p);
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(p) {
      (y = p), (I.escapeParameter = p);
    },
    t: re,
    getLocaleMessage: K,
    setLocaleMessage: a,
    mergeLocaleMessage: i,
    getPostTranslationHandler: be,
    setPostTranslationHandler: Se,
    getMissingHandler: je,
    setMissingHandler: ce,
    [ua]: W,
  };
  return (
    (w.datetimeFormats = oe),
    (w.numberFormats = de),
    (w.rt = ye),
    (w.te = ee),
    (w.tm = Y),
    (w.d = Be),
    (w.n = Fe),
    (w.getDateTimeFormat = m),
    (w.setDateTimeFormat = b),
    (w.mergeDateTimeFormat = v),
    (w.getNumberFormat = O),
    (w.setNumberFormat = M),
    (w.mergeNumberFormat = k),
    (w[fa] = e.__injectWithOption),
    (w[Vr] = P),
    (w[jr] = F),
    (w[Br] = H),
    w
  );
}
function hf(e) {
  const t = x(e.locale) ? e.locale : Pn,
    n =
      x(e.fallbackLocale) ||
      ge(e.fallbackLocale) ||
      G(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : t,
    r = ve(e.missing) ? e.missing : void 0,
    s =
      ne(e.silentTranslationWarn) || Ot(e.silentTranslationWarn)
        ? !e.silentTranslationWarn
        : !0,
    l =
      ne(e.silentFallbackWarn) || Ot(e.silentFallbackWarn)
        ? !e.silentFallbackWarn
        : !0,
    o = ne(e.fallbackRoot) ? e.fallbackRoot : !0,
    u = !!e.formatFallbackMessages,
    c = G(e.modifiers) ? e.modifiers : {},
    f = e.pluralizationRules,
    d = ve(e.postTranslation) ? e.postTranslation : void 0,
    _ = x(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0,
    h = !!e.escapeParameterHtml,
    E = ne(e.sync) ? e.sync : !0;
  let N = e.messages;
  if (G(e.sharedMessages)) {
    const I = e.sharedMessages;
    N = Object.keys(I).reduce((D, V) => {
      const j = D[V] || (D[V] = {});
      return Ce(j, I[V]), D;
    }, N || {});
  }
  const { __i18n: A, __root: C, __injectWithOption: g } = e,
    y = e.datetimeFormats,
    R = e.numberFormats,
    L = e.flatJson;
  return {
    locale: t,
    fallbackLocale: n,
    messages: N,
    flatJson: L,
    datetimeFormats: y,
    numberFormats: R,
    missing: r,
    missingWarn: s,
    fallbackWarn: l,
    fallbackRoot: o,
    fallbackFormat: u,
    modifiers: c,
    pluralRules: f,
    postTranslation: d,
    warnHtmlMessage: _,
    escapeParameter: h,
    messageResolver: e.messageResolver,
    inheritLocale: E,
    __i18n: A,
    __root: C,
    __injectWithOption: g,
  };
}
function Yr(e = {}, t) {
  {
    const n = Ts(hf(e)),
      r = {
        id: n.id,
        get locale() {
          return n.locale.value;
        },
        set locale(s) {
          n.locale.value = s;
        },
        get fallbackLocale() {
          return n.fallbackLocale.value;
        },
        set fallbackLocale(s) {
          n.fallbackLocale.value = s;
        },
        get messages() {
          return n.messages.value;
        },
        get datetimeFormats() {
          return n.datetimeFormats.value;
        },
        get numberFormats() {
          return n.numberFormats.value;
        },
        get availableLocales() {
          return n.availableLocales;
        },
        get formatter() {
          return {
            interpolate() {
              return [];
            },
          };
        },
        set formatter(s) {},
        get missing() {
          return n.getMissingHandler();
        },
        set missing(s) {
          n.setMissingHandler(s);
        },
        get silentTranslationWarn() {
          return ne(n.missingWarn) ? !n.missingWarn : n.missingWarn;
        },
        set silentTranslationWarn(s) {
          n.missingWarn = ne(s) ? !s : s;
        },
        get silentFallbackWarn() {
          return ne(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
        },
        set silentFallbackWarn(s) {
          n.fallbackWarn = ne(s) ? !s : s;
        },
        get modifiers() {
          return n.modifiers;
        },
        get formatFallbackMessages() {
          return n.fallbackFormat;
        },
        set formatFallbackMessages(s) {
          n.fallbackFormat = s;
        },
        get postTranslation() {
          return n.getPostTranslationHandler();
        },
        set postTranslation(s) {
          n.setPostTranslationHandler(s);
        },
        get sync() {
          return n.inheritLocale;
        },
        set sync(s) {
          n.inheritLocale = s;
        },
        get warnHtmlInMessage() {
          return n.warnHtmlMessage ? "warn" : "off";
        },
        set warnHtmlInMessage(s) {
          n.warnHtmlMessage = s !== "off";
        },
        get escapeParameterHtml() {
          return n.escapeParameter;
        },
        set escapeParameterHtml(s) {
          n.escapeParameter = s;
        },
        get preserveDirectiveContent() {
          return !0;
        },
        set preserveDirectiveContent(s) {},
        get pluralizationRules() {
          return n.pluralRules || {};
        },
        __composer: n,
        t(...s) {
          const [l, o, u] = s,
            c = {};
          let f = null,
            d = null;
          if (!x(l)) throw Ie(Le.INVALID_ARGUMENT);
          const _ = l;
          return (
            x(o) ? (c.locale = o) : ge(o) ? (f = o) : G(o) && (d = o),
            ge(u) ? (f = u) : G(u) && (d = u),
            Reflect.apply(n.t, n, [_, f || d || {}, c])
          );
        },
        rt(...s) {
          return Reflect.apply(n.rt, n, [...s]);
        },
        tc(...s) {
          const [l, o, u] = s,
            c = { plural: 1 };
          let f = null,
            d = null;
          if (!x(l)) throw Ie(Le.INVALID_ARGUMENT);
          const _ = l;
          return (
            x(o)
              ? (c.locale = o)
              : Te(o)
              ? (c.plural = o)
              : ge(o)
              ? (f = o)
              : G(o) && (d = o),
            x(u) ? (c.locale = u) : ge(u) ? (f = u) : G(u) && (d = u),
            Reflect.apply(n.t, n, [_, f || d || {}, c])
          );
        },
        te(s, l) {
          return n.te(s, l);
        },
        tm(s) {
          return n.tm(s);
        },
        getLocaleMessage(s) {
          return n.getLocaleMessage(s);
        },
        setLocaleMessage(s, l) {
          n.setLocaleMessage(s, l);
        },
        mergeLocaleMessage(s, l) {
          n.mergeLocaleMessage(s, l);
        },
        d(...s) {
          return Reflect.apply(n.d, n, [...s]);
        },
        getDateTimeFormat(s) {
          return n.getDateTimeFormat(s);
        },
        setDateTimeFormat(s, l) {
          n.setDateTimeFormat(s, l);
        },
        mergeDateTimeFormat(s, l) {
          n.mergeDateTimeFormat(s, l);
        },
        n(...s) {
          return Reflect.apply(n.n, n, [...s]);
        },
        getNumberFormat(s) {
          return n.getNumberFormat(s);
        },
        setNumberFormat(s, l) {
          n.setNumberFormat(s, l);
        },
        mergeNumberFormat(s, l) {
          n.mergeNumberFormat(s, l);
        },
        getChoiceIndex(s, l) {
          return -1;
        },
        __onComponentInstanceCreated(s) {
          const { componentInstanceCreatedListener: l } = e;
          l && l(s, r);
        },
      };
    return r;
  }
}
const Is = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: {
    type: String,
    validator: (e) => e === "parent" || e === "global",
    default: "parent",
  },
  i18n: { type: Object },
};
function _f({ slots: e }, t) {
  return t.length === 1 && t[0] === "default"
    ? (e.default ? e.default() : []).reduce(
        (r, s) => (r = [...r, ...(ge(s.children) ? s.children : [s])]),
        []
      )
    : t.reduce((n, r) => {
        const s = e[r];
        return s && (n[r] = s()), n;
      }, {});
}
function ha(e) {
  return He;
}
const Ol = {
  name: "i18n-t",
  props: Ce(
    {
      keypath: { type: String, required: !0 },
      plural: { type: [Number, String], validator: (e) => Te(e) || !isNaN(e) },
    },
    Is
  ),
  setup(e, t) {
    const { slots: n, attrs: r } = t,
      s = e.i18n || Cs({ useScope: e.scope, __useComponent: !0 });
    return () => {
      const l = Object.keys(n).filter((_) => _ !== "_"),
        o = {};
      e.locale && (o.locale = e.locale),
        e.plural !== void 0 && (o.plural = x(e.plural) ? +e.plural : e.plural);
      const u = _f(t, l),
        c = s[Vr](e.keypath, u, o),
        f = Ce({}, r),
        d = x(e.tag) || pe(e.tag) ? e.tag : ha();
      return sr(d, f, c);
    };
  },
};
function gf(e) {
  return ge(e) && !x(e[0]);
}
function _a(e, t, n, r) {
  const { slots: s, attrs: l } = t;
  return () => {
    const o = { part: !0 };
    let u = {};
    e.locale && (o.locale = e.locale),
      x(e.format)
        ? (o.key = e.format)
        : pe(e.format) &&
          (x(e.format.key) && (o.key = e.format.key),
          (u = Object.keys(e.format).reduce(
            (h, E) => (n.includes(E) ? Ce({}, h, { [E]: e.format[E] }) : h),
            {}
          )));
    const c = r(e.value, o, u);
    let f = [o.key];
    ge(c)
      ? (f = c.map((h, E) => {
          const N = s[h.type],
            A = N ? N({ [h.type]: h.value, index: E, parts: c }) : [h.value];
          return gf(A) && (A[0].key = `${h.type}-${E}`), A;
        }))
      : x(c) && (f = [c]);
    const d = Ce({}, l),
      _ = x(e.tag) || pe(e.tag) ? e.tag : ha();
    return sr(_, d, f);
  };
}
const Pl = {
    name: "i18n-n",
    props: Ce(
      {
        value: { type: Number, required: !0 },
        format: { type: [String, Object] },
      },
      Is
    ),
    setup(e, t) {
      const n = e.i18n || Cs({ useScope: "parent", __useComponent: !0 });
      return _a(e, t, ia, (...r) => n[Br](...r));
    },
  },
  Rl = {
    name: "i18n-d",
    props: Ce(
      {
        value: { type: [Number, Date], required: !0 },
        format: { type: [String, Object] },
      },
      Is
    ),
    setup(e, t) {
      const n = e.i18n || Cs({ useScope: "parent", __useComponent: !0 });
      return _a(e, t, aa, (...r) => n[jr](...r));
    },
  };
function pf(e, t) {
  const n = e;
  if (e.mode === "composition") return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function bf(e) {
  const t = (n, { instance: r, value: s, modifiers: l }) => {
    if (!r || !r.$) throw Ie(Le.UNEXPECTED_ERROR);
    const o = pf(e, r.$),
      u = Ef(s);
    n.textContent = Reflect.apply(o.t, o, [...vf(u)]);
  };
  return { beforeMount: t, beforeUpdate: t };
}
function Ef(e) {
  if (x(e)) return { path: e };
  if (G(e)) {
    if (!("path" in e)) throw Ie(Le.REQUIRED_VALUE, "path");
    return e;
  } else throw Ie(Le.INVALID_VALUE);
}
function vf(e) {
  const { path: t, locale: n, args: r, choice: s, plural: l } = e,
    o = {},
    u = r || {};
  return (
    x(n) && (o.locale = n),
    Te(s) && (o.plural = s),
    Te(l) && (o.plural = l),
    [t, u, o]
  );
}
function yf(e, t, ...n) {
  const r = G(n[0]) ? n[0] : {},
    s = !!r.useI18nComponentName;
  (ne(r.globalInstall) ? r.globalInstall : !0) &&
    (e.component(s ? "i18n" : Ol.name, Ol),
    e.component(Pl.name, Pl),
    e.component(Rl.name, Rl)),
    e.directive("t", bf(t));
}
function Lf(e, t, n) {
  return {
    beforeCreate() {
      const r = zt();
      if (!r) throw Ie(Le.UNEXPECTED_ERROR);
      const s = this.$options;
      if (s.i18n) {
        const l = s.i18n;
        s.__i18n && (l.__i18n = s.__i18n),
          (l.__root = t),
          this === this.$root
            ? (this.$i18n = wl(e, l))
            : ((l.__injectWithOption = !0), (this.$i18n = Yr(l)));
      } else
        s.__i18n
          ? this === this.$root
            ? (this.$i18n = wl(e, s))
            : (this.$i18n = Yr({
                __i18n: s.__i18n,
                __injectWithOption: !0,
                __root: t,
              }))
          : (this.$i18n = e);
      s.__i18nGlobal && ma(t, s, s),
        e.__onComponentInstanceCreated(this.$i18n),
        n.__setInstance(r, this.$i18n),
        (this.$t = (...l) => this.$i18n.t(...l)),
        (this.$rt = (...l) => this.$i18n.rt(...l)),
        (this.$tc = (...l) => this.$i18n.tc(...l)),
        (this.$te = (l, o) => this.$i18n.te(l, o)),
        (this.$d = (...l) => this.$i18n.d(...l)),
        (this.$n = (...l) => this.$i18n.n(...l)),
        (this.$tm = (l) => this.$i18n.tm(l));
    },
    mounted() {},
    unmounted() {
      const r = zt();
      if (!r) throw Ie(Le.UNEXPECTED_ERROR);
      delete this.$t,
        delete this.$rt,
        delete this.$tc,
        delete this.$te,
        delete this.$d,
        delete this.$n,
        delete this.$tm,
        n.__deleteInstance(r),
        delete this.$i18n;
    },
  };
}
function wl(e, t) {
  (e.locale = t.locale || e.locale),
    (e.fallbackLocale = t.fallbackLocale || e.fallbackLocale),
    (e.missing = t.missing || e.missing),
    (e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn),
    (e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn),
    (e.formatFallbackMessages =
      t.formatFallbackMessages || e.formatFallbackMessages),
    (e.postTranslation = t.postTranslation || e.postTranslation),
    (e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage),
    (e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml),
    (e.sync = t.sync || e.sync),
    e.__composer[ua](t.pluralizationRules || e.pluralizationRules);
  const n = ir(e.locale, { messages: t.messages, __i18n: t.__i18n });
  return (
    Object.keys(n).forEach((r) => e.mergeLocaleMessage(r, n[r])),
    t.datetimeFormats &&
      Object.keys(t.datetimeFormats).forEach((r) =>
        e.mergeDateTimeFormat(r, t.datetimeFormats[r])
      ),
    t.numberFormats &&
      Object.keys(t.numberFormats).forEach((r) =>
        e.mergeNumberFormat(r, t.numberFormats[r])
      ),
    e
  );
}
const Tf = Pt("global-vue-i18n");
function If(e = {}, t) {
  const n =
      __VUE_I18N_LEGACY_API__ && ne(e.legacy)
        ? e.legacy
        : __VUE_I18N_LEGACY_API__,
    r = ne(e.globalInjection) ? e.globalInjection : !0,
    s = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0,
    l = new Map(),
    [o, u] = Cf(e, n),
    c = Pt("");
  function f(h) {
    return l.get(h) || null;
  }
  function d(h, E) {
    l.set(h, E);
  }
  function _(h) {
    l.delete(h);
  }
  {
    const h = {
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition";
      },
      get allowComposition() {
        return s;
      },
      async install(E, ...N) {
        (E.__VUE_I18N_SYMBOL__ = c),
          E.provide(E.__VUE_I18N_SYMBOL__, h),
          !n && r && Ff(E, h.global),
          __VUE_I18N_FULL_INSTALL__ && yf(E, h, ...N),
          __VUE_I18N_LEGACY_API__ && n && E.mixin(Lf(u, u.__composer, h));
        const A = E.unmount;
        E.unmount = () => {
          h.dispose(), A();
        };
      },
      get global() {
        return u;
      },
      dispose() {
        o.stop();
      },
      __instances: l,
      __getInstance: f,
      __setInstance: d,
      __deleteInstance: _,
    };
    return h;
  }
}
function Cs(e = {}) {
  const t = zt();
  if (t == null) throw Ie(Le.MUST_BE_CALL_SETUP_TOP);
  if (
    !t.isCE &&
    t.appContext.app != null &&
    !t.appContext.app.__VUE_I18N_SYMBOL__
  )
    throw Ie(Le.NOT_INSLALLED);
  const n = Nf(t),
    r = Of(n),
    s = da(t),
    l = Af(e, s);
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition) throw Ie(Le.NOT_AVAILABLE_IN_LEGACY_MODE);
    return wf(t, l, r, e);
  }
  if (l === "global") return ma(r, e, s), r;
  if (l === "parent") {
    let c = Pf(n, t, e.__useComponent);
    return c == null && (c = r), c;
  }
  const o = n;
  let u = o.__getInstance(t);
  if (u == null) {
    const c = Ce({}, e);
    "__i18n" in s && (c.__i18n = s.__i18n),
      r && (c.__root = r),
      (u = Ts(c)),
      Rf(o, t),
      o.__setInstance(t, u);
  }
  return u;
}
function Cf(e, t, n) {
  const r = to();
  {
    const s =
      __VUE_I18N_LEGACY_API__ && t ? r.run(() => Yr(e)) : r.run(() => Ts(e));
    if (s == null) throw Ie(Le.UNEXPECTED_ERROR);
    return [r, s];
  }
}
function Nf(e) {
  {
    const t = mt(e.isCE ? Tf : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw Ie(e.isCE ? Le.NOT_INSLALLED_WITH_PROVIDE : Le.UNEXPECTED_ERROR);
    return t;
  }
}
function Af(e, t) {
  return lr(e)
    ? "__i18n" in t
      ? "local"
      : "global"
    : e.useScope
    ? e.useScope
    : "local";
}
function Of(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Pf(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let l = t.parent;
  for (; l != null; ) {
    const o = e;
    if (e.mode === "composition") r = o.__getInstance(l);
    else if (__VUE_I18N_LEGACY_API__) {
      const u = o.__getInstance(l);
      u != null && ((r = u.__composer), n && r && !r[fa] && (r = null));
    }
    if (r != null || s === l) break;
    l = l.parent;
  }
  return r;
}
function Rf(e, t, n) {
  hs(() => {}, t),
    _s(() => {
      e.__deleteInstance(t);
    }, t);
}
function wf(e, t, n, r = {}) {
  const s = t === "local",
    l = po(null);
  if (s && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw Ie(Le.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
  const o = ne(r.inheritLocale) ? r.inheritLocale : !0,
    u = Ge(s && o ? n.locale.value : x(r.locale) ? r.locale : Pn),
    c = Ge(
      s && o
        ? n.fallbackLocale.value
        : x(r.fallbackLocale) ||
          ge(r.fallbackLocale) ||
          G(r.fallbackLocale) ||
          r.fallbackLocale === !1
        ? r.fallbackLocale
        : u.value
    ),
    f = Ge(ir(u.value, r)),
    d = Ge(G(r.datetimeFormats) ? r.datetimeFormats : { [u.value]: {} }),
    _ = Ge(G(r.numberFormats) ? r.numberFormats : { [u.value]: {} }),
    h = s
      ? n.missingWarn
      : ne(r.missingWarn) || Ot(r.missingWarn)
      ? r.missingWarn
      : !0,
    E = s
      ? n.fallbackWarn
      : ne(r.fallbackWarn) || Ot(r.fallbackWarn)
      ? r.fallbackWarn
      : !0,
    N = s ? n.fallbackRoot : ne(r.fallbackRoot) ? r.fallbackRoot : !0,
    A = !!r.fallbackFormat,
    C = ve(r.missing) ? r.missing : null,
    g = ve(r.postTranslation) ? r.postTranslation : null,
    y = s ? n.warnHtmlMessage : ne(r.warnHtmlMessage) ? r.warnHtmlMessage : !0,
    R = !!r.escapeParameter,
    L = s ? n.modifiers : G(r.modifiers) ? r.modifiers : {},
    I = r.pluralRules || (s && n.pluralRules);
  function S() {
    return [u.value, c.value, f.value, d.value, _.value];
  }
  const D = Ee({
      get: () => (l.value ? l.value.locale.value : u.value),
      set: (i) => {
        l.value && (l.value.locale.value = i), (u.value = i);
      },
    }),
    V = Ee({
      get: () => (l.value ? l.value.fallbackLocale.value : c.value),
      set: (i) => {
        l.value && (l.value.fallbackLocale.value = i), (c.value = i);
      },
    }),
    j = Ee(() => (l.value ? l.value.messages.value : f.value)),
    q = Ee(() => d.value),
    oe = Ee(() => _.value);
  function de() {
    return l.value ? l.value.getPostTranslationHandler() : g;
  }
  function be(i) {
    l.value && l.value.setPostTranslationHandler(i);
  }
  function Se() {
    return l.value ? l.value.getMissingHandler() : C;
  }
  function je(i) {
    l.value && l.value.setMissingHandler(i);
  }
  function ce(i) {
    return S(), i();
  }
  function Q(...i) {
    return l.value
      ? ce(() => Reflect.apply(l.value.t, null, [...i]))
      : ce(() => "");
  }
  function re(...i) {
    return l.value ? Reflect.apply(l.value.rt, null, [...i]) : "";
  }
  function ye(...i) {
    return l.value
      ? ce(() => Reflect.apply(l.value.d, null, [...i]))
      : ce(() => "");
  }
  function Be(...i) {
    return l.value
      ? ce(() => Reflect.apply(l.value.n, null, [...i]))
      : ce(() => "");
  }
  function Fe(i) {
    return l.value ? l.value.tm(i) : {};
  }
  function we(i, m) {
    return l.value ? l.value.te(i, m) : !1;
  }
  function Ae(i) {
    return l.value ? l.value.getLocaleMessage(i) : {};
  }
  function Ke(i, m) {
    l.value && (l.value.setLocaleMessage(i, m), (f.value[i] = m));
  }
  function P(i, m) {
    l.value && l.value.mergeLocaleMessage(i, m);
  }
  function H(i) {
    return l.value ? l.value.getDateTimeFormat(i) : {};
  }
  function F(i, m) {
    l.value && (l.value.setDateTimeFormat(i, m), (d.value[i] = m));
  }
  function W(i, m) {
    l.value && l.value.mergeDateTimeFormat(i, m);
  }
  function ee(i) {
    return l.value ? l.value.getNumberFormat(i) : {};
  }
  function te(i, m) {
    l.value && (l.value.setNumberFormat(i, m), (_.value[i] = m));
  }
  function Y(i, m) {
    l.value && l.value.mergeNumberFormat(i, m);
  }
  const K = {
    get id() {
      return l.value ? l.value.id : -1;
    },
    locale: D,
    fallbackLocale: V,
    messages: j,
    datetimeFormats: q,
    numberFormats: oe,
    get inheritLocale() {
      return l.value ? l.value.inheritLocale : o;
    },
    set inheritLocale(i) {
      l.value && (l.value.inheritLocale = i);
    },
    get availableLocales() {
      return l.value ? l.value.availableLocales : Object.keys(f.value);
    },
    get modifiers() {
      return l.value ? l.value.modifiers : L;
    },
    get pluralRules() {
      return l.value ? l.value.pluralRules : I;
    },
    get isGlobal() {
      return l.value ? l.value.isGlobal : !1;
    },
    get missingWarn() {
      return l.value ? l.value.missingWarn : h;
    },
    set missingWarn(i) {
      l.value && (l.value.missingWarn = i);
    },
    get fallbackWarn() {
      return l.value ? l.value.fallbackWarn : E;
    },
    set fallbackWarn(i) {
      l.value && (l.value.missingWarn = i);
    },
    get fallbackRoot() {
      return l.value ? l.value.fallbackRoot : N;
    },
    set fallbackRoot(i) {
      l.value && (l.value.fallbackRoot = i);
    },
    get fallbackFormat() {
      return l.value ? l.value.fallbackFormat : A;
    },
    set fallbackFormat(i) {
      l.value && (l.value.fallbackFormat = i);
    },
    get warnHtmlMessage() {
      return l.value ? l.value.warnHtmlMessage : y;
    },
    set warnHtmlMessage(i) {
      l.value && (l.value.warnHtmlMessage = i);
    },
    get escapeParameter() {
      return l.value ? l.value.escapeParameter : R;
    },
    set escapeParameter(i) {
      l.value && (l.value.escapeParameter = i);
    },
    t: Q,
    getPostTranslationHandler: de,
    setPostTranslationHandler: be,
    getMissingHandler: Se,
    setMissingHandler: je,
    rt: re,
    d: ye,
    n: Be,
    tm: Fe,
    te: we,
    getLocaleMessage: Ae,
    setLocaleMessage: Ke,
    mergeLocaleMessage: P,
    getDateTimeFormat: H,
    setDateTimeFormat: F,
    mergeDateTimeFormat: W,
    getNumberFormat: ee,
    setNumberFormat: te,
    mergeNumberFormat: Y,
  };
  function a(i) {
    (i.locale.value = u.value),
      (i.fallbackLocale.value = c.value),
      Object.keys(f.value).forEach((m) => {
        i.mergeLocaleMessage(m, f.value[m]);
      }),
      Object.keys(d.value).forEach((m) => {
        i.mergeDateTimeFormat(m, d.value[m]);
      }),
      Object.keys(_.value).forEach((m) => {
        i.mergeNumberFormat(m, _.value[m]);
      }),
      (i.escapeParameter = R),
      (i.fallbackFormat = A),
      (i.fallbackRoot = N),
      (i.fallbackWarn = E),
      (i.missingWarn = h),
      (i.warnHtmlMessage = y);
  }
  return (
    Fo(() => {
      if (e.proxy == null || e.proxy.$i18n == null)
        throw Ie(Le.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
      const i = (l.value = e.proxy.$i18n.__composer);
      t === "global"
        ? ((u.value = i.locale.value),
          (c.value = i.fallbackLocale.value),
          (f.value = i.messages.value),
          (d.value = i.datetimeFormats.value),
          (_.value = i.numberFormats.value))
        : s && a(i);
    }),
    K
  );
}
const kf = ["locale", "fallbackLocale", "availableLocales"],
  Sf = ["t", "rt", "d", "n", "tm"];
function Ff(e, t) {
  const n = Object.create(null);
  kf.forEach((r) => {
    const s = Object.getOwnPropertyDescriptor(t, r);
    if (!s) throw Ie(Le.UNEXPECTED_ERROR);
    const l = Pe(s.value)
      ? {
          get() {
            return s.value.value;
          },
          set(o) {
            s.value.value = o;
          },
        }
      : {
          get() {
            return s.get && s.get();
          },
        };
    Object.defineProperty(n, r, l);
  }),
    (e.config.globalProperties.$i18n = n),
    Sf.forEach((r) => {
      const s = Object.getOwnPropertyDescriptor(t, r);
      if (!s || !s.value) throw Ie(Le.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${r}`, s);
    });
}
zu(lf);
Zu(Su);
ef(zo);
df();
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = gn();
  (e.__INTLIFY__ = !0), Vu(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
/*!
 * vue-router v4.1.3
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const jt = typeof window < "u";
function Mf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const me = Object.assign;
function br(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Ze(s) ? s.map(e) : e(s);
  }
  return n;
}
const bn = () => {},
  Ze = Array.isArray,
  xf = /\/$/,
  Df = (e) => e.replace(xf, "");
function Er(e, t, n = "/") {
  let r,
    s = {},
    l = "",
    o = "";
  const u = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    u < c && u >= 0 && (c = -1),
    c > -1 &&
      ((r = t.slice(0, c)),
      (l = t.slice(c + 1, u > -1 ? u : t.length)),
      (s = e(l))),
    u > -1 && ((r = r || t.slice(0, u)), (o = t.slice(u, t.length))),
    (r = Wf(r != null ? r : t, n)),
    { fullPath: r + (l && "?") + l + o, path: r, query: s, hash: o }
  );
}
function $f(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function kl(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Uf(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    tn(t.matched[r], n.matched[s]) &&
    ga(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function tn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ga(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Hf(e[n], t[n])) return !1;
  return !0;
}
function Hf(e, t) {
  return Ze(e) ? Sl(e, t) : Ze(t) ? Sl(t, e) : e === t;
}
function Sl(e, t) {
  return Ze(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Wf(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/");
  let s = n.length - 1,
    l,
    o;
  for (l = 0; l < r.length; l++)
    if (((o = r[l]), o !== "."))
      if (o === "..") s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(l - (l === r.length ? 1 : 0)).join("/")
  );
}
var An;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(An || (An = {}));
var En;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(En || (En = {}));
function Vf(e) {
  if (!e)
    if (jt) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Df(e);
}
const jf = /^[^#]+#/;
function Bf(e, t) {
  return e.replace(jf, "#") + t;
}
function Kf(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const cr = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Yf(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Kf(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Fl(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Gr = new Map();
function Gf(e, t) {
  Gr.set(e, t);
}
function Xf(e) {
  const t = Gr.get(e);
  return Gr.delete(e), t;
}
let qf = () => location.protocol + "//" + location.host;
function pa(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    l = e.indexOf("#");
  if (l > -1) {
    let u = s.includes(e.slice(l)) ? e.slice(l).length : 1,
      c = s.slice(u);
    return c[0] !== "/" && (c = "/" + c), kl(c, "");
  }
  return kl(n, e) + r + s;
}
function Jf(e, t, n, r) {
  let s = [],
    l = [],
    o = null;
  const u = ({ state: h }) => {
    const E = pa(e, location),
      N = n.value,
      A = t.value;
    let C = 0;
    if (h) {
      if (((n.value = E), (t.value = h), o && o === N)) {
        o = null;
        return;
      }
      C = A ? h.position - A.position : 0;
    } else r(E);
    s.forEach((g) => {
      g(n.value, N, {
        delta: C,
        type: An.pop,
        direction: C ? (C > 0 ? En.forward : En.back) : En.unknown,
      });
    });
  };
  function c() {
    o = n.value;
  }
  function f(h) {
    s.push(h);
    const E = () => {
      const N = s.indexOf(h);
      N > -1 && s.splice(N, 1);
    };
    return l.push(E), E;
  }
  function d() {
    const { history: h } = window;
    !h.state || h.replaceState(me({}, h.state, { scroll: cr() }), "");
  }
  function _() {
    for (const h of l) h();
    (l = []),
      window.removeEventListener("popstate", u),
      window.removeEventListener("beforeunload", d);
  }
  return (
    window.addEventListener("popstate", u),
    window.addEventListener("beforeunload", d),
    { pauseListeners: c, listen: f, destroy: _ }
  );
}
function Ml(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? cr() : null,
  };
}
function Qf(e) {
  const { history: t, location: n } = window,
    r = { value: pa(e, n) },
    s = { value: t.state };
  s.value ||
    l(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function l(c, f, d) {
    const _ = e.indexOf("#"),
      h =
        _ > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(_)) + c
          : qf() + e + c;
    try {
      t[d ? "replaceState" : "pushState"](f, "", h), (s.value = f);
    } catch (E) {
      console.error(E), n[d ? "replace" : "assign"](h);
    }
  }
  function o(c, f) {
    const d = me({}, t.state, Ml(s.value.back, c, s.value.forward, !0), f, {
      position: s.value.position,
    });
    l(c, d, !0), (r.value = c);
  }
  function u(c, f) {
    const d = me({}, s.value, t.state, { forward: c, scroll: cr() });
    l(d.current, d, !0);
    const _ = me({}, Ml(r.value, c, null), { position: d.position + 1 }, f);
    l(c, _, !1), (r.value = c);
  }
  return { location: r, state: s, push: u, replace: o };
}
function zf(e) {
  e = Vf(e);
  const t = Qf(e),
    n = Jf(e, t.state, t.location, t.replace);
  function r(l, o = !0) {
    o || n.pauseListeners(), history.go(l);
  }
  const s = me(
    { location: "", base: e, go: r, createHref: Bf.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Zf(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ba(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Et = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Ea = Symbol("");
var xl;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(xl || (xl = {}));
function nn(e, t) {
  return me(new Error(), { type: e, [Ea]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && Ea in e && (t == null || !!(e.type & t));
}
const Dl = "[^/]+?",
  ed = { sensitive: !1, strict: !1, start: !0, end: !0 },
  td = /[.+*?^${}()[\]/\\]/g;
function nd(e, t) {
  const n = me({}, ed, t),
    r = [];
  let s = n.start ? "^" : "";
  const l = [];
  for (const f of e) {
    const d = f.length ? [] : [90];
    n.strict && !f.length && (s += "/");
    for (let _ = 0; _ < f.length; _++) {
      const h = f[_];
      let E = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        _ || (s += "/"), (s += h.value.replace(td, "\\$&")), (E += 40);
      else if (h.type === 1) {
        const { value: N, repeatable: A, optional: C, regexp: g } = h;
        l.push({ name: N, repeatable: A, optional: C });
        const y = g || Dl;
        if (y !== Dl) {
          E += 10;
          try {
            new RegExp(`(${y})`);
          } catch (L) {
            throw new Error(
              `Invalid custom RegExp for param "${N}" (${y}): ` + L.message
            );
          }
        }
        let R = A ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        _ || (R = C && f.length < 2 ? `(?:/${R})` : "/" + R),
          C && (R += "?"),
          (s += R),
          (E += 20),
          C && (E += -8),
          A && (E += -20),
          y === ".*" && (E += -50);
      }
      d.push(E);
    }
    r.push(d);
  }
  if (n.strict && n.end) {
    const f = r.length - 1;
    r[f][r[f].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const o = new RegExp(s, n.sensitive ? "" : "i");
  function u(f) {
    const d = f.match(o),
      _ = {};
    if (!d) return null;
    for (let h = 1; h < d.length; h++) {
      const E = d[h] || "",
        N = l[h - 1];
      _[N.name] = E && N.repeatable ? E.split("/") : E;
    }
    return _;
  }
  function c(f) {
    let d = "",
      _ = !1;
    for (const h of e) {
      (!_ || !d.endsWith("/")) && (d += "/"), (_ = !1);
      for (const E of h)
        if (E.type === 0) d += E.value;
        else if (E.type === 1) {
          const { value: N, repeatable: A, optional: C } = E,
            g = N in f ? f[N] : "";
          if (Ze(g) && !A)
            throw new Error(
              `Provided param "${N}" is an array but it is not repeatable (* or + modifiers)`
            );
          const y = Ze(g) ? g.join("/") : g;
          if (!y)
            if (C)
              h.length < 2 &&
                (d.endsWith("/") ? (d = d.slice(0, -1)) : (_ = !0));
            else throw new Error(`Missing required param "${N}"`);
          d += y;
        }
    }
    return d || "/";
  }
  return { re: o, score: r, keys: l, parse: u, stringify: c };
}
function rd(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function sd(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const l = rd(r[n], s[n]);
    if (l) return l;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if ($l(r)) return 1;
    if ($l(s)) return -1;
  }
  return s.length - r.length;
}
function $l(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const ld = { type: 0, value: "" },
  od = /[a-zA-Z0-9_]/;
function ad(e) {
  if (!e) return [[]];
  if (e === "/") return [[ld]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(E) {
    throw new Error(`ERR (${n})/"${f}": ${E}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let l;
  function o() {
    l && s.push(l), (l = []);
  }
  let u = 0,
    c,
    f = "",
    d = "";
  function _() {
    !f ||
      (n === 0
        ? l.push({ type: 0, value: f })
        : n === 1 || n === 2 || n === 3
        ? (l.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`
            ),
          l.push({
            type: 1,
            value: f,
            regexp: d,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (f = ""));
  }
  function h() {
    f += c;
  }
  for (; u < e.length; ) {
    if (((c = e[u++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (f && _(), o()) : c === ":" ? (_(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : od.test(c)
          ? h()
          : (_(), (n = 0), c !== "*" && c !== "?" && c !== "+" && u--);
        break;
      case 2:
        c === ")"
          ? d[d.length - 1] == "\\"
            ? (d = d.slice(0, -1) + c)
            : (n = 3)
          : (d += c);
        break;
      case 3:
        _(), (n = 0), c !== "*" && c !== "?" && c !== "+" && u--, (d = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), _(), o(), s;
}
function id(e, t, n) {
  const r = nd(ad(e.path), n),
    s = me(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function cd(e, t) {
  const n = [],
    r = new Map();
  t = Hl({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(d) {
    return r.get(d);
  }
  function l(d, _, h) {
    const E = !h,
      N = fd(d);
    N.aliasOf = h && h.record;
    const A = Hl(t, d),
      C = [N];
    if ("alias" in d) {
      const R = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const L of R)
        C.push(
          me({}, N, {
            components: h ? h.record.components : N.components,
            path: L,
            aliasOf: h ? h.record : N,
          })
        );
    }
    let g, y;
    for (const R of C) {
      const { path: L } = R;
      if (_ && L[0] !== "/") {
        const I = _.record.path,
          S = I[I.length - 1] === "/" ? "" : "/";
        R.path = _.record.path + (L && S + L);
      }
      if (
        ((g = id(R, _, A)),
        h
          ? h.alias.push(g)
          : ((y = y || g),
            y !== g && y.alias.push(g),
            E && d.name && !Ul(g) && o(d.name)),
        N.children)
      ) {
        const I = N.children;
        for (let S = 0; S < I.length; S++) l(I[S], g, h && h.children[S]);
      }
      (h = h || g), c(g);
    }
    return y
      ? () => {
          o(y);
        }
      : bn;
  }
  function o(d) {
    if (ba(d)) {
      const _ = r.get(d);
      _ &&
        (r.delete(d),
        n.splice(n.indexOf(_), 1),
        _.children.forEach(o),
        _.alias.forEach(o));
    } else {
      const _ = n.indexOf(d);
      _ > -1 &&
        (n.splice(_, 1),
        d.record.name && r.delete(d.record.name),
        d.children.forEach(o),
        d.alias.forEach(o));
    }
  }
  function u() {
    return n;
  }
  function c(d) {
    let _ = 0;
    for (
      ;
      _ < n.length &&
      sd(d, n[_]) >= 0 &&
      (d.record.path !== n[_].record.path || !va(d, n[_]));

    )
      _++;
    n.splice(_, 0, d), d.record.name && !Ul(d) && r.set(d.record.name, d);
  }
  function f(d, _) {
    let h,
      E = {},
      N,
      A;
    if ("name" in d && d.name) {
      if (((h = r.get(d.name)), !h)) throw nn(1, { location: d });
      (A = h.record.name),
        (E = me(
          ud(
            _.params,
            h.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          d.params
        )),
        (N = h.stringify(E));
    } else if ("path" in d)
      (N = d.path),
        (h = n.find((y) => y.re.test(N))),
        h && ((E = h.parse(N)), (A = h.record.name));
    else {
      if (((h = _.name ? r.get(_.name) : n.find((y) => y.re.test(_.path))), !h))
        throw nn(1, { location: d, currentLocation: _ });
      (A = h.record.name),
        (E = me({}, _.params, d.params)),
        (N = h.stringify(E));
    }
    const C = [];
    let g = h;
    for (; g; ) C.unshift(g.record), (g = g.parent);
    return { name: A, path: N, params: E, matched: C, meta: md(C) };
  }
  return (
    e.forEach((d) => l(d)),
    {
      addRoute: l,
      resolve: f,
      removeRoute: o,
      getRoutes: u,
      getRecordMatcher: s,
    }
  );
}
function ud(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function fd(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: dd(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function dd(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
  return t;
}
function Ul(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function md(e) {
  return e.reduce((t, n) => me(t, n.meta), {});
}
function Hl(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function va(e, t) {
  return t.children.some((n) => n === e || va(e, n));
}
const ya = /#/g,
  hd = /&/g,
  _d = /\//g,
  gd = /=/g,
  pd = /\?/g,
  La = /\+/g,
  bd = /%5B/g,
  Ed = /%5D/g,
  Ta = /%5E/g,
  vd = /%60/g,
  Ia = /%7B/g,
  yd = /%7C/g,
  Ca = /%7D/g,
  Ld = /%20/g;
function Ns(e) {
  return encodeURI("" + e)
    .replace(yd, "|")
    .replace(bd, "[")
    .replace(Ed, "]");
}
function Td(e) {
  return Ns(e).replace(Ia, "{").replace(Ca, "}").replace(Ta, "^");
}
function Xr(e) {
  return Ns(e)
    .replace(La, "%2B")
    .replace(Ld, "+")
    .replace(ya, "%23")
    .replace(hd, "%26")
    .replace(vd, "`")
    .replace(Ia, "{")
    .replace(Ca, "}")
    .replace(Ta, "^");
}
function Id(e) {
  return Xr(e).replace(gd, "%3D");
}
function Cd(e) {
  return Ns(e).replace(ya, "%23").replace(pd, "%3F");
}
function Nd(e) {
  return e == null ? "" : Cd(e).replace(_d, "%2F");
}
function Kn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Ad(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const l = r[s].replace(La, " "),
      o = l.indexOf("="),
      u = Kn(o < 0 ? l : l.slice(0, o)),
      c = o < 0 ? null : Kn(l.slice(o + 1));
    if (u in t) {
      let f = t[u];
      Ze(f) || (f = t[u] = [f]), f.push(c);
    } else t[u] = c;
  }
  return t;
}
function Wl(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = Id(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ze(r) ? r.map((l) => l && Xr(l)) : [r && Xr(r)]).forEach((l) => {
      l !== void 0 &&
        ((t += (t.length ? "&" : "") + n), l != null && (t += "=" + l));
    });
  }
  return t;
}
function Od(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Ze(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const Pd = Symbol(""),
  Vl = Symbol(""),
  As = Symbol(""),
  Na = Symbol(""),
  qr = Symbol("");
function un() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Tt(e, t, n, r, s) {
  const l = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((o, u) => {
      const c = (_) => {
          _ === !1
            ? u(nn(4, { from: n, to: t }))
            : _ instanceof Error
            ? u(_)
            : Zf(_)
            ? u(nn(2, { from: t, to: _ }))
            : (l &&
                r.enterCallbacks[s] === l &&
                typeof _ == "function" &&
                l.push(_),
              o());
        },
        f = e.call(r && r.instances[s], t, n, c);
      let d = Promise.resolve(f);
      e.length < 3 && (d = d.then(c)), d.catch((_) => u(_));
    });
}
function vr(e, t, n, r) {
  const s = [];
  for (const l of e)
    for (const o in l.components) {
      let u = l.components[o];
      if (!(t !== "beforeRouteEnter" && !l.instances[o]))
        if (Rd(u)) {
          const f = (u.__vccOpts || u)[t];
          f && s.push(Tt(f, n, r, l, o));
        } else {
          let c = u();
          s.push(() =>
            c.then((f) => {
              if (!f)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${l.path}"`)
                );
              const d = Mf(f) ? f.default : f;
              l.components[o] = d;
              const h = (d.__vccOpts || d)[t];
              return h && Tt(h, n, r, l, o)();
            })
          );
        }
    }
  return s;
}
function Rd(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function jl(e) {
  const t = mt(As),
    n = mt(Na),
    r = Ee(() => t.resolve(Dt(e.to))),
    s = Ee(() => {
      const { matched: c } = r.value,
        { length: f } = c,
        d = c[f - 1],
        _ = n.matched;
      if (!d || !_.length) return -1;
      const h = _.findIndex(tn.bind(null, d));
      if (h > -1) return h;
      const E = Bl(c[f - 2]);
      return f > 1 && Bl(d) === E && _[_.length - 1].path !== E
        ? _.findIndex(tn.bind(null, c[f - 2]))
        : h;
    }),
    l = Ee(() => s.value > -1 && Fd(n.params, r.value.params)),
    o = Ee(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        ga(n.params, r.value.params)
    );
  function u(c = {}) {
    return Sd(c)
      ? t[Dt(e.replace) ? "replace" : "push"](Dt(e.to)).catch(bn)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Ee(() => r.value.href),
    isActive: l,
    isExactActive: o,
    navigate: u,
  };
}
const wd = ko({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: jl,
    setup(e, { slots: t }) {
      const n = On(jl(e)),
        { options: r } = mt(As),
        s = Ee(() => ({
          [Kl(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Kl(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const l = t.default && t.default(n);
        return e.custom
          ? l
          : sr(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              l
            );
      };
    },
  }),
  kd = wd;
function Sd(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Fd(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (!Ze(s) || s.length !== r.length || r.some((l, o) => l !== s[o]))
      return !1;
  }
  return !0;
}
function Bl(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Kl = (e, t, n) => (e != null ? e : t != null ? t : n),
  Md = ko({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = mt(qr),
        s = Ee(() => e.route || r.value),
        l = mt(Vl, 0),
        o = Ee(() => {
          let f = Dt(l);
          const { matched: d } = s.value;
          let _;
          for (; (_ = d[f]) && !_.components; ) f++;
          return f;
        }),
        u = Ee(() => s.value.matched[o.value]);
      Dn(
        Vl,
        Ee(() => o.value + 1)
      ),
        Dn(Pd, u),
        Dn(qr, s);
      const c = Ge();
      return (
        Jt(
          () => [c.value, u.value, e.name],
          ([f, d, _], [h, E, N]) => {
            d &&
              ((d.instances[_] = f),
              E &&
                E !== d &&
                f &&
                f === h &&
                (d.leaveGuards.size || (d.leaveGuards = E.leaveGuards),
                d.updateGuards.size || (d.updateGuards = E.updateGuards))),
              f &&
                d &&
                (!E || !tn(d, E) || !h) &&
                (d.enterCallbacks[_] || []).forEach((A) => A(f));
          },
          { flush: "post" }
        ),
        () => {
          const f = s.value,
            d = e.name,
            _ = u.value,
            h = _ && _.components[d];
          if (!h) return Yl(n.default, { Component: h, route: f });
          const E = _.props[d],
            N = E
              ? E === !0
                ? f.params
                : typeof E == "function"
                ? E(f)
                : E
              : null,
            C = sr(
              h,
              me({}, N, t, {
                onVnodeUnmounted: (g) => {
                  g.component.isUnmounted && (_.instances[d] = null);
                },
                ref: c,
              })
            );
          return Yl(n.default, { Component: C, route: f }) || C;
        }
      );
    },
  });
function Yl(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Aa = Md;
function xd(e) {
  const t = cd(e.routes, e),
    n = e.parseQuery || Ad,
    r = e.stringifyQuery || Wl,
    s = e.history,
    l = un(),
    o = un(),
    u = un(),
    c = po(Et);
  let f = Et;
  jt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const d = br.bind(null, (P) => "" + P),
    _ = br.bind(null, Nd),
    h = br.bind(null, Kn);
  function E(P, H) {
    let F, W;
    return (
      ba(P) ? ((F = t.getRecordMatcher(P)), (W = H)) : (W = P), t.addRoute(W, F)
    );
  }
  function N(P) {
    const H = t.getRecordMatcher(P);
    H && t.removeRoute(H);
  }
  function A() {
    return t.getRoutes().map((P) => P.record);
  }
  function C(P) {
    return !!t.getRecordMatcher(P);
  }
  function g(P, H) {
    if (((H = me({}, H || c.value)), typeof P == "string")) {
      const K = Er(n, P, H.path),
        a = t.resolve({ path: K.path }, H),
        i = s.createHref(K.fullPath);
      return me(K, a, {
        params: h(a.params),
        hash: Kn(K.hash),
        redirectedFrom: void 0,
        href: i,
      });
    }
    let F;
    if ("path" in P) F = me({}, P, { path: Er(n, P.path, H.path).path });
    else {
      const K = me({}, P.params);
      for (const a in K) K[a] == null && delete K[a];
      (F = me({}, P, { params: _(P.params) })), (H.params = _(H.params));
    }
    const W = t.resolve(F, H),
      ee = P.hash || "";
    W.params = d(h(W.params));
    const te = $f(r, me({}, P, { hash: Td(ee), path: W.path })),
      Y = s.createHref(te);
    return me(
      { fullPath: te, hash: ee, query: r === Wl ? Od(P.query) : P.query || {} },
      W,
      { redirectedFrom: void 0, href: Y }
    );
  }
  function y(P) {
    return typeof P == "string" ? Er(n, P, c.value.path) : me({}, P);
  }
  function R(P, H) {
    if (f !== P) return nn(8, { from: H, to: P });
  }
  function L(P) {
    return D(P);
  }
  function I(P) {
    return L(me(y(P), { replace: !0 }));
  }
  function S(P) {
    const H = P.matched[P.matched.length - 1];
    if (H && H.redirect) {
      const { redirect: F } = H;
      let W = typeof F == "function" ? F(P) : F;
      return (
        typeof W == "string" &&
          ((W = W.includes("?") || W.includes("#") ? (W = y(W)) : { path: W }),
          (W.params = {})),
        me(
          { query: P.query, hash: P.hash, params: "path" in W ? {} : P.params },
          W
        )
      );
    }
  }
  function D(P, H) {
    const F = (f = g(P)),
      W = c.value,
      ee = P.state,
      te = P.force,
      Y = P.replace === !0,
      K = S(F);
    if (K) return D(me(y(K), { state: ee, force: te, replace: Y }), H || F);
    const a = F;
    a.redirectedFrom = H;
    let i;
    return (
      !te &&
        Uf(r, W, F) &&
        ((i = nn(16, { to: a, from: W })), Be(W, W, !0, !1)),
      (i ? Promise.resolve(i) : j(a, W))
        .catch((m) => (ft(m) ? (ft(m, 2) ? m : ye(m)) : Q(m, a, W)))
        .then((m) => {
          if (m) {
            if (ft(m, 2))
              return D(
                me({ replace: Y }, y(m.to), { state: ee, force: te }),
                H || a
              );
          } else m = oe(a, W, !0, Y, ee);
          return q(a, W, m), m;
        })
    );
  }
  function V(P, H) {
    const F = R(P, H);
    return F ? Promise.reject(F) : Promise.resolve();
  }
  function j(P, H) {
    let F;
    const [W, ee, te] = Dd(P, H);
    F = vr(W.reverse(), "beforeRouteLeave", P, H);
    for (const K of W)
      K.leaveGuards.forEach((a) => {
        F.push(Tt(a, P, H));
      });
    const Y = V.bind(null, P, H);
    return (
      F.push(Y),
      Ht(F)
        .then(() => {
          F = [];
          for (const K of l.list()) F.push(Tt(K, P, H));
          return F.push(Y), Ht(F);
        })
        .then(() => {
          F = vr(ee, "beforeRouteUpdate", P, H);
          for (const K of ee)
            K.updateGuards.forEach((a) => {
              F.push(Tt(a, P, H));
            });
          return F.push(Y), Ht(F);
        })
        .then(() => {
          F = [];
          for (const K of P.matched)
            if (K.beforeEnter && !H.matched.includes(K))
              if (Ze(K.beforeEnter))
                for (const a of K.beforeEnter) F.push(Tt(a, P, H));
              else F.push(Tt(K.beforeEnter, P, H));
          return F.push(Y), Ht(F);
        })
        .then(
          () => (
            P.matched.forEach((K) => (K.enterCallbacks = {})),
            (F = vr(te, "beforeRouteEnter", P, H)),
            F.push(Y),
            Ht(F)
          )
        )
        .then(() => {
          F = [];
          for (const K of o.list()) F.push(Tt(K, P, H));
          return F.push(Y), Ht(F);
        })
        .catch((K) => (ft(K, 8) ? K : Promise.reject(K)))
    );
  }
  function q(P, H, F) {
    for (const W of u.list()) W(P, H, F);
  }
  function oe(P, H, F, W, ee) {
    const te = R(P, H);
    if (te) return te;
    const Y = H === Et,
      K = jt ? history.state : {};
    F &&
      (W || Y
        ? s.replace(P.fullPath, me({ scroll: Y && K && K.scroll }, ee))
        : s.push(P.fullPath, ee)),
      (c.value = P),
      Be(P, H, F, Y),
      ye();
  }
  let de;
  function be() {
    de ||
      (de = s.listen((P, H, F) => {
        if (!Ke.listening) return;
        const W = g(P),
          ee = S(W);
        if (ee) {
          D(me(ee, { replace: !0 }), W).catch(bn);
          return;
        }
        f = W;
        const te = c.value;
        jt && Gf(Fl(te.fullPath, F.delta), cr()),
          j(W, te)
            .catch((Y) =>
              ft(Y, 12)
                ? Y
                : ft(Y, 2)
                ? (D(Y.to, W)
                    .then((K) => {
                      ft(K, 20) &&
                        !F.delta &&
                        F.type === An.pop &&
                        s.go(-1, !1);
                    })
                    .catch(bn),
                  Promise.reject())
                : (F.delta && s.go(-F.delta, !1), Q(Y, W, te))
            )
            .then((Y) => {
              (Y = Y || oe(W, te, !1)),
                Y &&
                  (F.delta && !ft(Y, 8)
                    ? s.go(-F.delta, !1)
                    : F.type === An.pop && ft(Y, 20) && s.go(-1, !1)),
                q(W, te, Y);
            })
            .catch(bn);
      }));
  }
  let Se = un(),
    je = un(),
    ce;
  function Q(P, H, F) {
    ye(P);
    const W = je.list();
    return (
      W.length ? W.forEach((ee) => ee(P, H, F)) : console.error(P),
      Promise.reject(P)
    );
  }
  function re() {
    return ce && c.value !== Et
      ? Promise.resolve()
      : new Promise((P, H) => {
          Se.add([P, H]);
        });
  }
  function ye(P) {
    return (
      ce ||
        ((ce = !P),
        be(),
        Se.list().forEach(([H, F]) => (P ? F(P) : H())),
        Se.reset()),
      P
    );
  }
  function Be(P, H, F, W) {
    const { scrollBehavior: ee } = e;
    if (!jt || !ee) return Promise.resolve();
    const te =
      (!F && Xf(Fl(P.fullPath, 0))) ||
      ((W || !F) && history.state && history.state.scroll) ||
      null;
    return yo()
      .then(() => ee(P, H, te))
      .then((Y) => Y && Yf(Y))
      .catch((Y) => Q(Y, P, H));
  }
  const Fe = (P) => s.go(P);
  let we;
  const Ae = new Set(),
    Ke = {
      currentRoute: c,
      listening: !0,
      addRoute: E,
      removeRoute: N,
      hasRoute: C,
      getRoutes: A,
      resolve: g,
      options: e,
      push: L,
      replace: I,
      go: Fe,
      back: () => Fe(-1),
      forward: () => Fe(1),
      beforeEach: l.add,
      beforeResolve: o.add,
      afterEach: u.add,
      onError: je.add,
      isReady: re,
      install(P) {
        const H = this;
        P.component("RouterLink", kd),
          P.component("RouterView", Aa),
          (P.config.globalProperties.$router = H),
          Object.defineProperty(P.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Dt(c),
          }),
          jt &&
            !we &&
            c.value === Et &&
            ((we = !0), L(s.location).catch((ee) => {}));
        const F = {};
        for (const ee in Et) F[ee] = Ee(() => c.value[ee]);
        P.provide(As, H), P.provide(Na, On(F)), P.provide(qr, c);
        const W = P.unmount;
        Ae.add(P),
          (P.unmount = function () {
            Ae.delete(P),
              Ae.size < 1 &&
                ((f = Et),
                de && de(),
                (de = null),
                (c.value = Et),
                (we = !1),
                (ce = !1)),
              W();
          });
      },
    };
  return Ke;
}
function Ht(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Dd(e, t) {
  const n = [],
    r = [],
    s = [],
    l = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < l; o++) {
    const u = t.matched[o];
    u && (e.matched.find((f) => tn(f, u)) ? r.push(u) : n.push(u));
    const c = e.matched[o];
    c && (t.matched.find((f) => tn(f, c)) || s.push(c));
  }
  return [n, r, s];
}
const ct = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  $d = {},
  Ud = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
  },
  Hd = Z("path", { fill: "none", d: "M0 0h24v24H0z" }, null, -1),
  Wd = Z(
    "path",
    {
      d: "M20 22H6.5A3.5 3.5 0 0 1 3 18.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-3H6.5a1.5 1.5 0 0 0 0 3H19zM10 4v8l3.5-2 3.5 2V4h-7z",
    },
    null,
    -1
  ),
  Vd = [Hd, Wd];
function jd(e, t) {
  return at(), it("svg", Ud, Vd);
}
const Bd = ct($d, [["render", jd]]),
  Kd = {},
  Yd = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
  },
  Gd = Z("path", { fill: "none", d: "M0 0h24v24H0z" }, null, -1),
  Xd = Z(
    "path",
    {
      d: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-6.671-5.575A8 8 0 1 0 16.425 5.328a8.997 8.997 0 0 1-2.304 8.793 8.997 8.997 0 0 1-8.792 2.304z",
    },
    null,
    -1
  ),
  qd = [Gd, Xd];
function Jd(e, t) {
  return at(), it("svg", Yd, qd);
}
const Qd = ct(Kd, [["render", Jd]]),
  zd = {},
  Zd = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
  },
  em = Z("path", { fill: "none", d: "M0 0h24v24H0z" }, null, -1),
  tm = Z(
    "path",
    {
      d: "M18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301 14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z",
    },
    null,
    -1
  ),
  nm = [em, tm];
function rm(e, t) {
  return at(), it("svg", Zd, nm);
}
const sm = ct(zd, [["render", rm]]),
  lm = {},
  om = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
  },
  am = Z("path", { fill: "none", d: "M0 0h24v24H0z" }, null, -1),
  im = Z(
    "path",
    {
      d: "M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zM6 7v2h8V7H6zm0 4v2h8v-2H6zm0 4v2h5v-2H6z",
    },
    null,
    -1
  ),
  cm = [am, im];
function um(e, t) {
  return at(), it("svg", om, cm);
}
const fm = ct(lm, [["render", um]]),
  dm = {},
  mm = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
  },
  hm = Z("path", { fill: "none", d: "M0 0h24v24H0z" }, null, -1),
  _m = Z(
    "path",
    {
      d: "M16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-5 9H8v2h3v3h2v-3h3v-2h-3V8h-2v3z",
    },
    null,
    -1
  ),
  gm = [hm, _m];
function pm(e, t) {
  return at(), it("svg", mm, gm);
}
const bm = ct(dm, [["render", pm]]);
const Em = (e) => (ds("data-v-5b01e4d5"), (e = e()), ms(), e),
  vm = { class: "width" },
  ym = { class: "start" },
  Lm = Em(() => Z("p", null, "Notes DB", -1)),
  Tm = { class: "end" },
  Im = { class: "surround" },
  Cm = {
    __name: "Navbar",
    setup(e) {
      return (t, n) => (
        at(),
        it("nav", null, [
          Z("div", vm, [
            Z("div", ym, [fe(Bd), Lm]),
            Z("div", Tm, [fe(Qd), fe(sm), fe(fm), Z("div", Im, [fe(bm)])]),
          ]),
        ])
      );
    },
  },
  Nm = ct(Cm, [["__scopeId", "data-v-5b01e4d5"]]);
const Am = {},
  Oa = (e) => (ds("data-v-b34f6eef"), (e = e()), ms(), e),
  Om = { class: "q-container" },
  Pm = { class: "question" },
  Rm = Oa(() => Z("br", null, null, -1)),
  wm = { class: "question" },
  km = Oa(() => Z("br", null, null, -1));
function Sm(e, t) {
  return (
    at(),
    it(
      He,
      null,
      [
        Z("h1", null, an(e.$t("home.welcome")), 1),
        Z("div", Om, [
          Z("div", Pm, [
            Z("h3", null, an(e.$t("home.q1")), 1),
            Rm,
            Z("p", null, an(e.$t("home.a1")), 1),
          ]),
          Z("div", wm, [
            Z("h3", null, an(e.$t("home.q2")), 1),
            km,
            Z("p", null, an(e.$t("home.a2")), 1),
          ]),
        ]),
      ],
      64
    )
  );
}
const Fm = ct(Am, [
    ["render", Sm],
    ["__scopeId", "data-v-b34f6eef"],
  ]),
  Mm = "" + new URL("art.897da71d.jpg", import.meta.url).href;
const xm = {},
  Pa = (e) => (ds("data-v-268c78b7"), (e = e()), ms(), e),
  Dm = { class: "main" },
  $m = Pa(() => Z("img", { src: Mm, alt: "chemistry" }, null, -1)),
  Um = Pa(() =>
    Z(
      "div",
      { class: "section" },
      [
        Z("h3", null, "Random Reactions"),
        Z("div", { class: "author" }, [
          Yo(" By ScratchX98 "),
          Z("br"),
          Z("em", null, "10/08/22"),
        ]),
      ],
      -1
    )
  ),
  Hm = [$m, Um];
function Wm(e, t) {
  return at(), it("div", Dm, Hm);
}
const vt = ct(xm, [
  ["render", Wm],
  ["__scopeId", "data-v-268c78b7"],
]);
const Vm = { class: "notes" },
  jm = {
    __name: "NotePreviews",
    setup(e) {
      return (t, n) => (
        at(),
        it("div", Vm, [
          fe(vt),
          fe(vt),
          fe(vt),
          fe(vt),
          fe(vt),
          fe(vt),
          fe(vt),
          fe(vt),
        ])
      );
    },
  },
  Bm = ct(jm, [["__scopeId", "data-v-fd6917cb"]]);
const Km = { class: "wrapper" },
  Ym = { class: "width" },
  Gm = {
    __name: "App",
    setup(e) {
      return (t, n) => (
        at(),
        it(
          He,
          null,
          [
            Z("header", null, [
              Z("div", Km, [fe(Nm), Z("div", Ym, [fe(Fm), fe(Bm)])]),
            ]),
            fe(Dt(Aa)),
          ],
          64
        )
      );
    },
  },
  Xm = ct(Gm, [["__scopeId", "data-v-d046dba7"]]),
  qm = xd({ history: zf("./"), routes: [] }),
  Jm = {
    en: {
      home: {
        welcome: "Welcome to the Alexandria of notes",
        q1: "What is this website?",
        a1: "This is a database of notes created by a student of Lyceum E.Fermi of Padua, containing their and community submitted notes.",
        q2: "How do I contribute?",
        a2: "Read the rules and click the + button to start.",
      },
    },
    it: {
      home: {
        welcome: "Benvenuti all'Alessandria degli appunti",
        q1: "Cos'\xE8 questo sito?",
        a1: "\xC8 un database di appunti creato da uno studente del Liceo E.Fermi di Padova, contenente i suoi appunti e anche quelli della comunit\xE0.",
        q2: "Come faccio a contribuire?",
        a2: "Leggete le regole e cliccate il tasto + per cominciare.",
      },
    },
  },
  Qm = new If({ legacy: !0, locale: "en", globalInjection: !0, messages: Jm }),
  ur = Yc(Xm);
ur.use(Jc());
ur.use(qm);
ur.use(Qm);
ur.mount("#app");
