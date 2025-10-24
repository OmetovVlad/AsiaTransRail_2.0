(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
      return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
      s(r);
    new MutationObserver(r => {
        for (const n of r)
          if (n.type === "childList")
            for (const a of n.addedNodes)
              a.tagName === "LINK" && a.rel === "modulepreload" && s(a)
      }
    ).observe(document, {
      childList: !0,
      subtree: !0
    });
    function i(r) {
      const n = {};
      return r.integrity && (n.integrity = r.integrity),
      r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === "use-credentials" ? n.credentials = "include" : r.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
        n
    }
    function s(r) {
      if (r.ep)
        return;
      r.ep = !0;
      const n = i(r);
      fetch(r.href, n)
    }
  }
)();
function Ie(t) {
  return t !== null && typeof t == "object" && "constructor"in t && t.constructor === Object
}
function Ee(t={}, e={}) {
  const i = ["__proto__", "constructor", "prototype"];
  Object.keys(e).filter(s => i.indexOf(s) < 0).forEach(s => {
      typeof t[s] > "u" ? t[s] = e[s] : Ie(e[s]) && Ie(t[s]) && Object.keys(e[s]).length > 0 && Ee(t[s], e[s])
    }
  )
}
const st = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ""
  },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return {
      initEvent() {}
    }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      }
    }
  },
  createElementNS() {
    return {}
  },
  importNode() {
    return null
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function W() {
  const t = typeof document < "u" ? document : {};
  return Ee(t, st),
    t
}
const wt = {
  document: st,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function() {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ""
      }
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
  },
  requestAnimationFrame(t) {
    return typeof setTimeout > "u" ? (t(),
      null) : setTimeout(t, 0)
  },
  cancelAnimationFrame(t) {
    typeof setTimeout > "u" || clearTimeout(t)
  }
};
function O() {
  const t = typeof window < "u" ? window : {};
  return Ee(t, wt),
    t
}
function yt(t="") {
  return t.trim().split(" ").filter(e => !!e.trim())
}
function Mt(t) {
  const e = t;
  Object.keys(e).forEach(i => {
      try {
        e[i] = null
      } catch {}
      try {
        delete e[i]
      } catch {}
    }
  )
}
function rt(t, e=0) {
  return setTimeout(t, e)
}
function se() {
  return Date.now()
}
function Et(t) {
  const e = O();
  let i;
  return e.getComputedStyle && (i = e.getComputedStyle(t, null)),
  !i && t.currentStyle && (i = t.currentStyle),
  i || (i = t.style),
    i
}
function At(t, e="x") {
  const i = O();
  let s, r, n;
  const a = Et(t);
  return i.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform,
  r.split(",").length > 6 && (r = r.split(", ").map(l => l.replace(",", ".")).join(", ")),
    n = new i.WebKitCSSMatrix(r === "none" ? "" : r)) : (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
    s = n.toString().split(",")),
  e === "x" && (i.WebKitCSSMatrix ? r = n.m41 : s.length === 16 ? r = parseFloat(s[12]) : r = parseFloat(s[4])),
  e === "y" && (i.WebKitCSSMatrix ? r = n.m42 : s.length === 16 ? r = parseFloat(s[13]) : r = parseFloat(s[5])),
  r || 0
}
function X(t) {
  return typeof t == "object" && t !== null && t.constructor && Object.prototype.toString.call(t).slice(8, -1) === "Object"
}
function St(t) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? t instanceof HTMLElement : t && (t.nodeType === 1 || t.nodeType === 11)
}
function D(...t) {
  const e = Object(t[0])
    , i = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < t.length; s += 1) {
    const r = t[s];
    if (r != null && !St(r)) {
      const n = Object.keys(Object(r)).filter(a => i.indexOf(a) < 0);
      for (let a = 0, l = n.length; a < l; a += 1) {
        const o = n[a]
          , c = Object.getOwnPropertyDescriptor(r, o);
        c !== void 0 && c.enumerable && (X(e[o]) && X(r[o]) ? r[o].__swiper__ ? e[o] = r[o] : D(e[o], r[o]) : !X(e[o]) && X(r[o]) ? (e[o] = {},
          r[o].__swiper__ ? e[o] = r[o] : D(e[o], r[o])) : e[o] = r[o])
      }
    }
  }
  return e
}
function $(t, e, i) {
  t.style.setProperty(e, i)
}
function nt({swiper: t, targetPosition: e, side: i}) {
  const s = O()
    , r = -t.translate;
  let n = null, a;
  const l = t.params.speed;
  t.wrapperEl.style.scrollSnapType = "none",
    s.cancelAnimationFrame(t.cssModeFrameID);
  const o = e > r ? "next" : "prev"
    , c = (h, p) => o === "next" && h >= p || o === "prev" && h <= p
    , f = () => {
      a = new Date().getTime(),
      n === null && (n = a);
      const h = Math.max(Math.min((a - n) / l, 1), 0)
        , p = .5 - Math.cos(h * Math.PI) / 2;
      let d = r + p * (e - r);
      if (c(d, e) && (d = e),
        t.wrapperEl.scrollTo({
          [i]: d
        }),
        c(d, e)) {
        t.wrapperEl.style.overflow = "hidden",
          t.wrapperEl.style.scrollSnapType = "",
          setTimeout( () => {
              t.wrapperEl.style.overflow = "",
                t.wrapperEl.scrollTo({
                  [i]: d
                })
            }
          ),
          s.cancelAnimationFrame(t.cssModeFrameID);
        return
      }
      t.cssModeFrameID = s.requestAnimationFrame(f)
    }
  ;
  f()
}
function V(t, e="") {
  const i = O()
    , s = [...t.children];
  return i.HTMLSlotElement && t instanceof HTMLSlotElement && s.push(...t.assignedElements()),
    e ? s.filter(r => r.matches(e)) : s
}
function Tt(t, e) {
  const i = [e];
  for (; i.length > 0; ) {
    const s = i.shift();
    if (t === s)
      return !0;
    i.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : [])
  }
}
function bt(t, e) {
  const i = O();
  let s = e.contains(t);
  return !s && i.HTMLSlotElement && e instanceof HTMLSlotElement && (s = [...e.assignedElements()].includes(t),
  s || (s = Tt(t, e))),
    s
}
function re(t) {
  try {
    console.warn(t);
    return
  } catch {}
}
function ne(t, e=[]) {
  const i = document.createElement(t);
  return i.classList.add(...Array.isArray(e) ? e : yt(e)),
    i
}
function Ct(t, e) {
  const i = [];
  for (; t.previousElementSibling; ) {
    const s = t.previousElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s),
      t = s
  }
  return i
}
function It(t, e) {
  const i = [];
  for (; t.nextElementSibling; ) {
    const s = t.nextElementSibling;
    e ? s.matches(e) && i.push(s) : i.push(s),
      t = s
  }
  return i
}
function j(t, e) {
  return O().getComputedStyle(t, null).getPropertyValue(e)
}
function Fe(t) {
  let e = t, i;
  if (e) {
    for (i = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (i += 1);
    return i
  }
}
function Ft(t, e) {
  const i = [];
  let s = t.parentElement;
  for (; s; )
    i.push(s),
      s = s.parentElement;
  return i
}
function Pe(t, e, i) {
  const s = O();
  return t[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"))
}
function Y(t) {
  return (Array.isArray(t) ? t : [t]).filter(e => !!e)
}
function Pt(t, e="") {
  typeof trustedTypes < "u" ? t.innerHTML = trustedTypes.createPolicy("html", {
    createHTML: i => i
  }).createHTML(e) : t.innerHTML = e
}
let ae;
function Gt() {
  const t = O()
    , e = W();
  return {
    smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior"in e.documentElement.style,
    touch: !!("ontouchstart"in t || t.DocumentTouch && e instanceof t.DocumentTouch)
  }
}
function at() {
  return ae || (ae = Gt()),
    ae
}
let oe;
function Ut({userAgent: t}={}) {
  const e = at()
    , i = O()
    , s = i.navigator.platform
    , r = t || i.navigator.userAgent
    , n = {
    ios: !1,
    android: !1
  }
    , a = i.screen.width
    , l = i.screen.height
    , o = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = r.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const f = r.match(/(iPod)(.*OS\s([\d_]+))?/)
    , h = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
    , p = s === "Win32";
  let d = s === "MacIntel";
  const u = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !c && d && e.touch && u.indexOf(`${a}x${l}`) >= 0 && (c = r.match(/(Version)\/([\d.]+)/),
  c || (c = [0, 1, "13_0_0"]),
    d = !1),
  o && !p && (n.os = "android",
    n.android = !0),
  (c || h || f) && (n.os = "ios",
    n.ios = !0),
    n
}
function ot(t={}) {
  return oe || (oe = Ut(t)),
    oe
}
let le;
function Rt() {
  const t = O()
    , e = ot();
  let i = !1;
  function s() {
    const l = t.navigator.userAgent.toLowerCase();
    return l.indexOf("safari") >= 0 && l.indexOf("chrome") < 0 && l.indexOf("android") < 0
  }
  if (s()) {
    const l = String(t.navigator.userAgent);
    if (l.includes("Version/")) {
      const [o,c] = l.split("Version/")[1].split(" ")[0].split(".").map(f => Number(f));
      i = o < 16 || o === 16 && c < 2
    }
  }
  const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    , n = s()
    , a = n || r && e.ios;
  return {
    isSafari: i || n,
    needPerspectiveFix: i,
    need3dFix: a,
    isWebView: r
  }
}
function lt() {
  return le || (le = Rt()),
    le
}
function zt({swiper: t, on: e, emit: i}) {
  const s = O();
  let r = null
    , n = null;
  const a = () => {
      !t || t.destroyed || !t.initialized || (i("beforeResize"),
        i("resize"))
    }
    , l = () => {
      !t || t.destroyed || !t.initialized || (r = new ResizeObserver(f => {
          n = s.requestAnimationFrame( () => {
              const {width: h, height: p} = t;
              let d = h
                , u = p;
              f.forEach( ({contentBoxSize: m, contentRect: g, target: x}) => {
                  x && x !== t.el || (d = g ? g.width : (m[0] || m).inlineSize,
                    u = g ? g.height : (m[0] || m).blockSize)
                }
              ),
              (d !== h || u !== p) && a()
            }
          )
        }
      ),
        r.observe(t.el))
    }
    , o = () => {
      n && s.cancelAnimationFrame(n),
      r && r.unobserve && t.el && (r.unobserve(t.el),
        r = null)
    }
    , c = () => {
      !t || t.destroyed || !t.initialized || i("orientationchange")
    }
  ;
  e("init", () => {
      if (t.params.resizeObserver && typeof s.ResizeObserver < "u") {
        l();
        return
      }
      s.addEventListener("resize", a),
        s.addEventListener("orientationchange", c)
    }
  ),
    e("destroy", () => {
        o(),
          s.removeEventListener("resize", a),
          s.removeEventListener("orientationchange", c)
      }
    )
}
function kt({swiper: t, extendParams: e, on: i, emit: s}) {
  const r = []
    , n = O()
    , a = (c, f={}) => {
      const h = n.MutationObserver || n.WebkitMutationObserver
        , p = new h(d => {
          if (t.__preventObserver__)
            return;
          if (d.length === 1) {
            s("observerUpdate", d[0]);
            return
          }
          const u = function() {
            s("observerUpdate", d[0])
          };
          n.requestAnimationFrame ? n.requestAnimationFrame(u) : n.setTimeout(u, 0)
        }
      );
      p.observe(c, {
        attributes: typeof f.attributes > "u" ? !0 : f.attributes,
        childList: t.isElement || (typeof f.childList > "u" ? !0 : f).childList,
        characterData: typeof f.characterData > "u" ? !0 : f.characterData
      }),
        r.push(p)
    }
    , l = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const c = Ft(t.hostEl);
          for (let f = 0; f < c.length; f += 1)
            a(c[f])
        }
        a(t.hostEl, {
          childList: t.params.observeSlideChildren
        }),
          a(t.wrapperEl, {
            attributes: !1
          })
      }
    }
    , o = () => {
      r.forEach(c => {
          c.disconnect()
        }
      ),
        r.splice(0, r.length)
    }
  ;
  e({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }),
    i("init", l),
    i("destroy", o)
}
var Ot = {
  on(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function")
      return s;
    const r = i ? "unshift" : "push";
    return t.split(" ").forEach(n => {
        s.eventsListeners[n] || (s.eventsListeners[n] = []),
          s.eventsListeners[n][r](e)
      }
    ),
      s
  },
  once(t, e, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function")
      return s;
    function r(...n) {
      s.off(t, r),
      r.__emitterProxy && delete r.__emitterProxy,
        e.apply(s, n)
    }
    return r.__emitterProxy = e,
      s.on(t, r, i)
  },
  onAny(t, e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != "function")
      return i;
    const s = e ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(t) < 0 && i.eventsAnyListeners[s](t),
      i
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners)
      return e;
    const i = e.eventsAnyListeners.indexOf(t);
    return i >= 0 && e.eventsAnyListeners.splice(i, 1),
      e
  },
  off(t, e) {
    const i = this;
    return !i.eventsListeners || i.destroyed || !i.eventsListeners || t.split(" ").forEach(s => {
        typeof e > "u" ? i.eventsListeners[s] = [] : i.eventsListeners[s] && i.eventsListeners[s].forEach( (r, n) => {
            (r === e || r.__emitterProxy && r.__emitterProxy === e) && i.eventsListeners[s].splice(n, 1)
          }
        )
      }
    ),
      i
  },
  emit(...t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners)
      return e;
    let i, s, r;
    return typeof t[0] == "string" || Array.isArray(t[0]) ? (i = t[0],
      s = t.slice(1, t.length),
      r = e) : (i = t[0].events,
      s = t[0].data,
      r = t[0].context || e),
      s.unshift(r),
      (Array.isArray(i) ? i : i.split(" ")).forEach(a => {
          e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(l => {
              l.apply(r, [a, ...s])
            }
          ),
          e.eventsListeners && e.eventsListeners[a] && e.eventsListeners[a].forEach(l => {
              l.apply(r, s)
            }
          )
        }
      ),
      e
  }
};
function Lt() {
  const t = this;
  let e, i;
  const s = t.el;
  typeof t.params.width < "u" && t.params.width !== null ? e = t.params.width : e = s.clientWidth,
    typeof t.params.height < "u" && t.params.height !== null ? i = t.params.height : i = s.clientHeight,
  !(e === 0 && t.isHorizontal() || i === 0 && t.isVertical()) && (e = e - parseInt(j(s, "padding-left") || 0, 10) - parseInt(j(s, "padding-right") || 0, 10),
    i = i - parseInt(j(s, "padding-top") || 0, 10) - parseInt(j(s, "padding-bottom") || 0, 10),
  Number.isNaN(e) && (e = 0),
  Number.isNaN(i) && (i = 0),
    Object.assign(t, {
      width: e,
      height: i,
      size: t.isHorizontal() ? e : i
    }))
}
function Dt() {
  const t = this;
  function e(S, A) {
    return parseFloat(S.getPropertyValue(t.getDirectionLabel(A)) || 0)
  }
  const i = t.params
    , {wrapperEl: s, slidesEl: r, rtlTranslate: n, wrongRTL: a} = t
    , l = t.virtual && i.virtual.enabled
    , o = l ? t.virtual.slides.length : t.slides.length
    , c = V(r, `.${t.params.slideClass}, swiper-slide`)
    , f = l ? t.virtual.slides.length : c.length;
  let h = [];
  const p = []
    , d = [];
  let u = i.slidesOffsetBefore;
  typeof u == "function" && (u = i.slidesOffsetBefore.call(t));
  let m = i.slidesOffsetAfter;
  typeof m == "function" && (m = i.slidesOffsetAfter.call(t));
  const g = t.snapGrid.length
    , x = t.slidesGrid.length
    , v = t.size - u - m;
  let w = i.spaceBetween
    , y = -u
    , M = 0
    , E = 0;
  if (typeof v > "u")
    return;
  typeof w == "string" && w.indexOf("%") >= 0 ? w = parseFloat(w.replace("%", "")) / 100 * v : typeof w == "string" && (w = parseFloat(w)),
    t.virtualSize = -w - u - m,
    c.forEach(S => {
        n ? S.style.marginLeft = "" : S.style.marginRight = "",
          S.style.marginBottom = "",
          S.style.marginTop = ""
      }
    ),
  i.centeredSlides && i.cssMode && ($(s, "--swiper-centered-offset-before", ""),
    $(s, "--swiper-centered-offset-after", ""));
  const I = i.grid && i.grid.rows > 1 && t.grid;
  I ? t.grid.initSlides(c) : t.grid && t.grid.unsetSlides();
  let T;
  const P = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter(S => typeof i.breakpoints[S].slidesPerView < "u").length > 0;
  for (let S = 0; S < f; S += 1) {
    T = 0;
    const A = c[S];
    if (!(A && (I && t.grid.updateSlide(S, A, c),
    j(A, "display") === "none"))) {
      if (l && i.slidesPerView === "auto")
        i.virtual.slidesPerViewAutoSlideSize && (T = i.virtual.slidesPerViewAutoSlideSize),
        T && A && (i.roundLengths && (T = Math.floor(T)),
          A.style[t.getDirectionLabel("width")] = `${T}px`);
      else if (i.slidesPerView === "auto") {
        P && (A.style[t.getDirectionLabel("width")] = "");
        const b = getComputedStyle(A)
          , F = A.style.transform
          , C = A.style.webkitTransform;
        if (F && (A.style.transform = "none"),
        C && (A.style.webkitTransform = "none"),
          i.roundLengths)
          T = t.isHorizontal() ? Pe(A, "width") : Pe(A, "height");
        else {
          const U = e(b, "width")
            , Ce = e(b, "padding-left")
            , H = e(b, "padding-right")
            , G = e(b, "margin-left")
            , k = e(b, "margin-right")
            , L = b.getPropertyValue("box-sizing");
          if (L && L === "border-box")
            T = U + G + k;
          else {
            const {clientWidth: N, offsetWidth: vt} = A;
            T = U + Ce + H + G + k + (vt - N)
          }
        }
        F && (A.style.transform = F),
        C && (A.style.webkitTransform = C),
        i.roundLengths && (T = Math.floor(T))
      } else
        T = (v - (i.slidesPerView - 1) * w) / i.slidesPerView,
        i.roundLengths && (T = Math.floor(T)),
        A && (A.style[t.getDirectionLabel("width")] = `${T}px`);
      A && (A.swiperSlideSize = T),
        d.push(T),
        i.centeredSlides ? (y = y + T / 2 + M / 2 + w,
        M === 0 && S !== 0 && (y = y - v / 2 - w),
        S === 0 && (y = y - v / 2 - w),
        Math.abs(y) < 1 / 1e3 && (y = 0),
        i.roundLengths && (y = Math.floor(y)),
        E % i.slidesPerGroup === 0 && h.push(y),
          p.push(y)) : (i.roundLengths && (y = Math.floor(y)),
        (E - Math.min(t.params.slidesPerGroupSkip, E)) % t.params.slidesPerGroup === 0 && h.push(y),
          p.push(y),
          y = y + T + w),
        t.virtualSize += T + w,
        M = T,
        E += 1
    }
  }
  if (t.virtualSize = Math.max(t.virtualSize, v) + m,
  n && a && (i.effect === "slide" || i.effect === "coverflow") && (s.style.width = `${t.virtualSize + w}px`),
  i.setWrapperSize && (s.style[t.getDirectionLabel("width")] = `${t.virtualSize + w}px`),
  I && t.grid.updateWrapperSize(T, h),
    !i.centeredSlides) {
    const S = [];
    for (let A = 0; A < h.length; A += 1) {
      let b = h[A];
      i.roundLengths && (b = Math.floor(b)),
      h[A] <= t.virtualSize - v && S.push(b)
    }
    h = S,
    Math.floor(t.virtualSize - v) - Math.floor(h[h.length - 1]) > 1 && h.push(t.virtualSize - v)
  }
  if (l && i.loop) {
    const S = d[0] + w;
    if (i.slidesPerGroup > 1) {
      const A = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup)
        , b = S * i.slidesPerGroup;
      for (let F = 0; F < A; F += 1)
        h.push(h[h.length - 1] + b)
    }
    for (let A = 0; A < t.virtual.slidesBefore + t.virtual.slidesAfter; A += 1)
      i.slidesPerGroup === 1 && h.push(h[h.length - 1] + S),
        p.push(p[p.length - 1] + S),
        t.virtualSize += S
  }
  if (h.length === 0 && (h = [0]),
  w !== 0) {
    const S = t.isHorizontal() && n ? "marginLeft" : t.getDirectionLabel("marginRight");
    c.filter( (A, b) => !i.cssMode || i.loop ? !0 : b !== c.length - 1).forEach(A => {
        A.style[S] = `${w}px`
      }
    )
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let S = 0;
    d.forEach(b => {
        S += b + (w || 0)
      }
    ),
      S -= w;
    const A = S > v ? S - v : 0;
    h = h.map(b => b <= 0 ? -u : b > A ? A + m : b)
  }
  if (i.centerInsufficientSlides) {
    let S = 0;
    d.forEach(b => {
        S += b + (w || 0)
      }
    ),
      S -= w;
    const A = (u || 0) + (m || 0);
    if (S + A < v) {
      const b = (v - S - A) / 2;
      h.forEach( (F, C) => {
          h[C] = F - b
        }
      ),
        p.forEach( (F, C) => {
            p[C] = F + b
          }
        )
    }
  }
  if (Object.assign(t, {
    slides: c,
    snapGrid: h,
    slidesGrid: p,
    slidesSizesGrid: d
  }),
  i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    $(s, "--swiper-centered-offset-before", `${-h[0]}px`),
      $(s, "--swiper-centered-offset-after", `${t.size / 2 - d[d.length - 1] / 2}px`);
    const S = -t.snapGrid[0]
      , A = -t.slidesGrid[0];
    t.snapGrid = t.snapGrid.map(b => b + S),
      t.slidesGrid = t.slidesGrid.map(b => b + A)
  }
  if (f !== o && t.emit("slidesLengthChange"),
  h.length !== g && (t.params.watchOverflow && t.checkOverflow(),
    t.emit("snapGridLengthChange")),
  p.length !== x && t.emit("slidesGridLengthChange"),
  i.watchSlidesProgress && t.updateSlidesOffset(),
    t.emit("slidesUpdated"),
  !l && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
    const S = `${i.containerModifierClass}backface-hidden`
      , A = t.el.classList.contains(S);
    f <= i.maxBackfaceHiddenSlides ? A || t.el.classList.add(S) : A && t.el.classList.remove(S)
  }
}
function Bt(t) {
  const e = this
    , i = []
    , s = e.virtual && e.params.virtual.enabled;
  let r = 0, n;
  typeof t == "number" ? e.setTransition(t) : t === !0 && e.setTransition(e.params.speed);
  const a = l => s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach(l => {
          i.push(l)
        }
      );
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const l = e.activeIndex + n;
        if (l > e.slides.length && !s)
          break;
        i.push(a(l))
      }
  else
    i.push(a(e.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < "u") {
      const l = i[n].offsetHeight;
      r = l > r ? l : r
    }
  (r || r === 0) && (e.wrapperEl.style.height = `${r}px`)
}
function Vt() {
  const t = this
    , e = t.slides
    , i = t.isElement ? t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset = (t.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) - i - t.cssOverflowAdjustment()
}
const Ge = (t, e, i) => {
    e && !t.classList.contains(i) ? t.classList.add(i) : !e && t.classList.contains(i) && t.classList.remove(i)
  }
;
function Yt(t=this && this.translate || 0) {
  const e = this
    , i = e.params
    , {slides: s, rtlTranslate: r, snapGrid: n} = e;
  if (s.length === 0)
    return;
  typeof s[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let a = -t;
  r && (a = t),
    e.visibleSlidesIndexes = [],
    e.visibleSlides = [];
  let l = i.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * e.size : typeof l == "string" && (l = parseFloat(l));
  for (let o = 0; o < s.length; o += 1) {
    const c = s[o];
    let f = c.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (f -= s[0].swiperSlideOffset);
    const h = (a + (i.centeredSlides ? e.minTranslate() : 0) - f) / (c.swiperSlideSize + l)
      , p = (a - n[0] + (i.centeredSlides ? e.minTranslate() : 0) - f) / (c.swiperSlideSize + l)
      , d = -(a - f)
      , u = d + e.slidesSizesGrid[o]
      , m = d >= 0 && d <= e.size - e.slidesSizesGrid[o]
      , g = d >= 0 && d < e.size - 1 || u > 1 && u <= e.size || d <= 0 && u >= e.size;
    g && (e.visibleSlides.push(c),
      e.visibleSlidesIndexes.push(o)),
      Ge(c, g, i.slideVisibleClass),
      Ge(c, m, i.slideFullyVisibleClass),
      c.progress = r ? -h : h,
      c.originalProgress = r ? -p : p
  }
}
function Nt(t) {
  const e = this;
  if (typeof t > "u") {
    const f = e.rtlTranslate ? -1 : 1;
    t = e && e.translate && e.translate * f || 0
  }
  const i = e.params
    , s = e.maxTranslate() - e.minTranslate();
  let {progress: r, isBeginning: n, isEnd: a, progressLoop: l} = e;
  const o = n
    , c = a;
  if (s === 0)
    r = 0,
      n = !0,
      a = !0;
  else {
    r = (t - e.minTranslate()) / s;
    const f = Math.abs(t - e.minTranslate()) < 1
      , h = Math.abs(t - e.maxTranslate()) < 1;
    n = f || r <= 0,
      a = h || r >= 1,
    f && (r = 0),
    h && (r = 1)
  }
  if (i.loop) {
    const f = e.getSlideIndexByData(0)
      , h = e.getSlideIndexByData(e.slides.length - 1)
      , p = e.slidesGrid[f]
      , d = e.slidesGrid[h]
      , u = e.slidesGrid[e.slidesGrid.length - 1]
      , m = Math.abs(t);
    m >= p ? l = (m - p) / u : l = (m + u - d) / u,
    l > 1 && (l -= 1)
  }
  Object.assign(e, {
    progress: r,
    progressLoop: l,
    isBeginning: n,
    isEnd: a
  }),
  (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && e.updateSlidesProgress(t),
  n && !o && e.emit("reachBeginning toEdge"),
  a && !c && e.emit("reachEnd toEdge"),
  (o && !n || c && !a) && e.emit("fromEdge"),
    e.emit("progress", r)
}
const ce = (t, e, i) => {
    e && !t.classList.contains(i) ? t.classList.add(i) : !e && t.classList.contains(i) && t.classList.remove(i)
  }
;
function jt() {
  const t = this
    , {slides: e, params: i, slidesEl: s, activeIndex: r} = t
    , n = t.virtual && i.virtual.enabled
    , a = t.grid && i.grid && i.grid.rows > 1
    , l = h => V(s, `.${i.slideClass}${h}, swiper-slide${h}`)[0];
  let o, c, f;
  if (n)
    if (i.loop) {
      let h = r - t.virtual.slidesBefore;
      h < 0 && (h = t.virtual.slides.length + h),
      h >= t.virtual.slides.length && (h -= t.virtual.slides.length),
        o = l(`[data-swiper-slide-index="${h}"]`)
    } else
      o = l(`[data-swiper-slide-index="${r}"]`);
  else
    a ? (o = e.find(h => h.column === r),
      f = e.find(h => h.column === r + 1),
      c = e.find(h => h.column === r - 1)) : o = e[r];
  o && (a || (f = It(o, `.${i.slideClass}, swiper-slide`)[0],
  i.loop && !f && (f = e[0]),
    c = Ct(o, `.${i.slideClass}, swiper-slide`)[0],
  i.loop && !c === 0 && (c = e[e.length - 1]))),
    e.forEach(h => {
        ce(h, h === o, i.slideActiveClass),
          ce(h, h === f, i.slideNextClass),
          ce(h, h === c, i.slidePrevClass)
      }
    ),
    t.emitSlidesClasses()
}
const ie = (t, e) => {
    if (!t || t.destroyed || !t.params)
      return;
    const i = () => t.isElement ? "swiper-slide" : `.${t.params.slideClass}`
      , s = e.closest(i());
    if (s) {
      let r = s.querySelector(`.${t.params.lazyPreloaderClass}`);
      !r && t.isElement && (s.shadowRoot ? r = s.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`) : requestAnimationFrame( () => {
          s.shadowRoot && (r = s.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`),
          r && r.remove())
        }
      )),
      r && r.remove()
    }
  }
  , de = (t, e) => {
    if (!t.slides[e])
      return;
    const i = t.slides[e].querySelector('[loading="lazy"]');
    i && i.removeAttribute("loading")
  }
  , we = t => {
    if (!t || t.destroyed || !t.params)
      return;
    let e = t.params.lazyPreloadPrevNext;
    const i = t.slides.length;
    if (!i || !e || e < 0)
      return;
    e = Math.min(e, i);
    const s = t.params.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(t.params.slidesPerView)
      , r = t.activeIndex;
    if (t.params.grid && t.params.grid.rows > 1) {
      const a = r
        , l = [a - e];
      l.push(...Array.from({
        length: e
      }).map( (o, c) => a + s + c)),
        t.slides.forEach( (o, c) => {
            l.includes(o.column) && de(t, c)
          }
        );
      return
    }
    const n = r + s - 1;
    if (t.params.rewind || t.params.loop)
      for (let a = r - e; a <= n + e; a += 1) {
        const l = (a % i + i) % i;
        (l < r || l > n) && de(t, l)
      }
    else
      for (let a = Math.max(r - e, 0); a <= Math.min(n + e, i - 1); a += 1)
        a !== r && (a > n || a < r) && de(t, a)
  }
;
function Kt(t) {
  const {slidesGrid: e, params: i} = t
    , s = t.rtlTranslate ? t.translate : -t.translate;
  let r;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < "u" ? s >= e[n] && s < e[n + 1] - (e[n + 1] - e[n]) / 2 ? r = n : s >= e[n] && s < e[n + 1] && (r = n + 1) : s >= e[n] && (r = n);
  return i.normalizeSlideIndex && (r < 0 || typeof r > "u") && (r = 0),
    r
}
function Ht(t) {
  const e = this
    , i = e.rtlTranslate ? e.translate : -e.translate
    , {snapGrid: s, params: r, activeIndex: n, realIndex: a, snapIndex: l} = e;
  let o = t, c;
  const f = d => {
      let u = d - e.virtual.slidesBefore;
      return u < 0 && (u = e.virtual.slides.length + u),
      u >= e.virtual.slides.length && (u -= e.virtual.slides.length),
        u
    }
  ;
  if (typeof o > "u" && (o = Kt(e)),
  s.indexOf(i) >= 0)
    c = s.indexOf(i);
  else {
    const d = Math.min(r.slidesPerGroupSkip, o);
    c = d + Math.floor((o - d) / r.slidesPerGroup)
  }
  if (c >= s.length && (c = s.length - 1),
  o === n && !e.params.loop) {
    c !== l && (e.snapIndex = c,
      e.emit("snapIndexChange"));
    return
  }
  if (o === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(o);
    return
  }
  const h = e.grid && r.grid && r.grid.rows > 1;
  let p;
  if (e.virtual && r.virtual.enabled && r.loop)
    p = f(o);
  else if (h) {
    const d = e.slides.find(m => m.column === o);
    let u = parseInt(d.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(u) && (u = Math.max(e.slides.indexOf(d), 0)),
      p = Math.floor(u / r.grid.rows)
  } else if (e.slides[o]) {
    const d = e.slides[o].getAttribute("data-swiper-slide-index");
    d ? p = parseInt(d, 10) : p = o
  } else
    p = o;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: c,
    previousRealIndex: a,
    realIndex: p,
    previousIndex: n,
    activeIndex: o
  }),
  e.initialized && we(e),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
  (e.initialized || e.params.runCallbacksOnInit) && (a !== p && e.emit("realIndexChange"),
    e.emit("slideChange"))
}
function Qt(t, e) {
  const i = this
    , s = i.params;
  let r = t.closest(`.${s.slideClass}, swiper-slide`);
  !r && i.isElement && e && e.length > 1 && e.includes(t) && [...e.slice(e.indexOf(t) + 1, e.length)].forEach(l => {
      !r && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (r = l)
    }
  );
  let n = !1, a;
  if (r) {
    for (let l = 0; l < i.slides.length; l += 1)
      if (i.slides[l] === r) {
        n = !0,
          a = l;
        break
      }
  }
  if (r && n)
    i.clickedSlide = r,
      i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : i.clickedIndex = a;
  else {
    i.clickedSlide = void 0,
      i.clickedIndex = void 0;
    return
  }
  s.slideToClickedSlide && i.clickedIndex !== void 0 && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide()
}
var Wt = {
  updateSize: Lt,
  updateSlides: Dt,
  updateAutoHeight: Bt,
  updateSlidesOffset: Vt,
  updateSlidesProgress: Yt,
  updateProgress: Nt,
  updateSlidesClasses: jt,
  updateActiveIndex: Ht,
  updateClickedSlide: Qt
};
function Zt(t=this.isHorizontal() ? "x" : "y") {
  const e = this
    , {params: i, rtlTranslate: s, translate: r, wrapperEl: n} = e;
  if (i.virtualTranslate)
    return s ? -r : r;
  if (i.cssMode)
    return r;
  let a = At(n, t);
  return a += e.cssOverflowAdjustment(),
  s && (a = -a),
  a || 0
}
function Jt(t, e) {
  const i = this
    , {rtlTranslate: s, params: r, wrapperEl: n, progress: a} = i;
  let l = 0
    , o = 0;
  const c = 0;
  i.isHorizontal() ? l = s ? -t : t : o = t,
  r.roundLengths && (l = Math.floor(l),
    o = Math.floor(o)),
    i.previousTranslate = i.translate,
    i.translate = i.isHorizontal() ? l : o,
    r.cssMode ? n[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -o : r.virtualTranslate || (i.isHorizontal() ? l -= i.cssOverflowAdjustment() : o -= i.cssOverflowAdjustment(),
      n.style.transform = `translate3d(${l}px, ${o}px, ${c}px)`);
  let f;
  const h = i.maxTranslate() - i.minTranslate();
  h === 0 ? f = 0 : f = (t - i.minTranslate()) / h,
  f !== a && i.updateProgress(t),
    i.emit("setTranslate", i.translate, e)
}
function qt() {
  return -this.snapGrid[0]
}
function _t() {
  return -this.snapGrid[this.snapGrid.length - 1]
}
function Xt(t=0, e=this.params.speed, i=!0, s=!0, r) {
  const n = this
    , {params: a, wrapperEl: l} = n;
  if (n.animating && a.preventInteractionOnTransition)
    return !1;
  const o = n.minTranslate()
    , c = n.maxTranslate();
  let f;
  if (s && t > o ? f = o : s && t < c ? f = c : f = t,
    n.updateProgress(f),
    a.cssMode) {
    const h = n.isHorizontal();
    if (e === 0)
      l[h ? "scrollLeft" : "scrollTop"] = -f;
    else {
      if (!n.support.smoothScroll)
        return nt({
          swiper: n,
          targetPosition: -f,
          side: h ? "left" : "top"
        }),
          !0;
      l.scrollTo({
        [h ? "left" : "top"]: -f,
        behavior: "smooth"
      })
    }
    return !0
  }
  return e === 0 ? (n.setTransition(0),
    n.setTranslate(f),
  i && (n.emit("beforeTransitionStart", e, r),
    n.emit("transitionEnd"))) : (n.setTransition(e),
    n.setTranslate(f),
  i && (n.emit("beforeTransitionStart", e, r),
    n.emit("transitionStart")),
  n.animating || (n.animating = !0,
  n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(p) {
      !n || n.destroyed || p.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
        n.onTranslateToWrapperTransitionEnd = null,
        delete n.onTranslateToWrapperTransitionEnd,
        n.animating = !1,
      i && n.emit("transitionEnd"))
    }
  ),
    n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))),
    !0
}
var $t = {
  getTranslate: Zt,
  setTranslate: Jt,
  minTranslate: qt,
  maxTranslate: _t,
  translateTo: Xt
};
function ei(t, e) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${t}ms`,
    i.wrapperEl.style.transitionDelay = t === 0 ? "0ms" : ""),
    i.emit("setTransition", t, e)
}
function ct({swiper: t, runCallbacks: e, direction: i, step: s}) {
  const {activeIndex: r, previousIndex: n} = t;
  let a = i;
  a || (r > n ? a = "next" : r < n ? a = "prev" : a = "reset"),
    t.emit(`transition${s}`),
    e && a === "reset" ? t.emit(`slideResetTransition${s}`) : e && r !== n && (t.emit(`slideChangeTransition${s}`),
      a === "next" ? t.emit(`slideNextTransition${s}`) : t.emit(`slidePrevTransition${s}`))
}
function ti(t=!0, e) {
  const i = this
    , {params: s} = i;
  s.cssMode || (s.autoHeight && i.updateAutoHeight(),
    ct({
      swiper: i,
      runCallbacks: t,
      direction: e,
      step: "Start"
    }))
}
function ii(t=!0, e) {
  const i = this
    , {params: s} = i;
  i.animating = !1,
  !s.cssMode && (i.setTransition(0),
    ct({
      swiper: i,
      runCallbacks: t,
      direction: e,
      step: "End"
    }))
}
var si = {
  setTransition: ei,
  transitionStart: ti,
  transitionEnd: ii
};
function ri(t=0, e, i=!0, s, r) {
  typeof t == "string" && (t = parseInt(t, 10));
  const n = this;
  let a = t;
  a < 0 && (a = 0);
  const {params: l, snapGrid: o, slidesGrid: c, previousIndex: f, activeIndex: h, rtlTranslate: p, wrapperEl: d, enabled: u} = n;
  if (!u && !s && !r || n.destroyed || n.animating && l.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = n.params.speed);
  const m = Math.min(n.params.slidesPerGroupSkip, a);
  let g = m + Math.floor((a - m) / n.params.slidesPerGroup);
  g >= o.length && (g = o.length - 1);
  const x = -o[g];
  if (l.normalizeSlideIndex)
    for (let I = 0; I < c.length; I += 1) {
      const T = -Math.floor(x * 100)
        , P = Math.floor(c[I] * 100)
        , S = Math.floor(c[I + 1] * 100);
      typeof c[I + 1] < "u" ? T >= P && T < S - (S - P) / 2 ? a = I : T >= P && T < S && (a = I + 1) : T >= P && (a = I)
    }
  if (n.initialized && a !== h && (!n.allowSlideNext && (p ? x > n.translate && x > n.minTranslate() : x < n.translate && x < n.minTranslate()) || !n.allowSlidePrev && x > n.translate && x > n.maxTranslate() && (h || 0) !== a))
    return !1;
  a !== (f || 0) && i && n.emit("beforeSlideChangeStart"),
    n.updateProgress(x);
  let v;
  a > h ? v = "next" : a < h ? v = "prev" : v = "reset";
  const w = n.virtual && n.params.virtual.enabled;
  if (!(w && r) && (p && -x === n.translate || !p && x === n.translate))
    return n.updateActiveIndex(a),
    l.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
    l.effect !== "slide" && n.setTranslate(x),
    v !== "reset" && (n.transitionStart(i, v),
      n.transitionEnd(i, v)),
      !1;
  if (l.cssMode) {
    const I = n.isHorizontal()
      , T = p ? x : -x;
    if (e === 0)
      w && (n.wrapperEl.style.scrollSnapType = "none",
        n._immediateVirtual = !0),
        w && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0,
          requestAnimationFrame( () => {
              d[I ? "scrollLeft" : "scrollTop"] = T
            }
          )) : d[I ? "scrollLeft" : "scrollTop"] = T,
      w && requestAnimationFrame( () => {
          n.wrapperEl.style.scrollSnapType = "",
            n._immediateVirtual = !1
        }
      );
    else {
      if (!n.support.smoothScroll)
        return nt({
          swiper: n,
          targetPosition: T,
          side: I ? "left" : "top"
        }),
          !0;
      d.scrollTo({
        [I ? "left" : "top"]: T,
        behavior: "smooth"
      })
    }
    return !0
  }
  const E = lt().isSafari;
  return w && !r && E && n.isElement && n.virtual.update(!1, !1, a),
    n.setTransition(e),
    n.setTranslate(x),
    n.updateActiveIndex(a),
    n.updateSlidesClasses(),
    n.emit("beforeTransitionStart", e, s),
    n.transitionStart(i, v),
    e === 0 ? n.transitionEnd(i, v) : n.animating || (n.animating = !0,
    n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(T) {
        !n || n.destroyed || T.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
          n.onSlideToWrapperTransitionEnd = null,
          delete n.onSlideToWrapperTransitionEnd,
          n.transitionEnd(i, v))
      }
    ),
      n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)),
    !0
}
function ni(t=0, e, i=!0, s) {
  typeof t == "string" && (t = parseInt(t, 10));
  const r = this;
  if (r.destroyed)
    return;
  typeof e > "u" && (e = r.params.speed);
  const n = r.grid && r.params.grid && r.params.grid.rows > 1;
  let a = t;
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled)
      a = a + r.virtual.slidesBefore;
    else {
      let l;
      if (n) {
        const m = a * r.params.grid.rows;
        l = r.slides.find(g => g.getAttribute("data-swiper-slide-index") * 1 === m).column
      } else
        l = r.getSlideIndexByData(a);
      const o = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length
        , {centeredSlides: c, slidesOffsetBefore: f, slidesOffsetAfter: h} = r.params
        , p = c || !!f || !!h;
      let d = r.params.slidesPerView;
      d === "auto" ? d = r.slidesPerViewDynamic() : (d = Math.ceil(parseFloat(r.params.slidesPerView, 10)),
      p && d % 2 === 0 && (d = d + 1));
      let u = o - l < d;
      if (p && (u = u || l < Math.ceil(d / 2)),
      s && p && r.params.slidesPerView !== "auto" && !n && (u = !1),
        u) {
        const m = p ? l < r.activeIndex ? "prev" : "next" : l - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
        r.loopFix({
          direction: m,
          slideTo: !0,
          activeSlideIndex: m === "next" ? l + 1 : l - o + 1,
          slideRealIndex: m === "next" ? r.realIndex : void 0
        })
      }
      if (n) {
        const m = a * r.params.grid.rows;
        a = r.slides.find(g => g.getAttribute("data-swiper-slide-index") * 1 === m).column
      } else
        a = r.getSlideIndexByData(a)
    }
  return requestAnimationFrame( () => {
      r.slideTo(a, e, i, s)
    }
  ),
    r
}
function ai(t, e=!0, i) {
  const s = this
    , {enabled: r, params: n, animating: a} = s;
  if (!r || s.destroyed)
    return s;
  typeof t > "u" && (t = s.params.speed);
  let l = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const o = s.activeIndex < n.slidesPerGroupSkip ? 1 : l
    , c = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (a && !c && n.loopPreventsSliding)
      return !1;
    if (s.loopFix({
      direction: "next"
    }),
      s._clientLeft = s.wrapperEl.clientLeft,
    s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame( () => {
          s.slideTo(s.activeIndex + o, t, e, i)
        }
      ),
        !0
  }
  return n.rewind && s.isEnd ? s.slideTo(0, t, e, i) : s.slideTo(s.activeIndex + o, t, e, i)
}
function oi(t, e=!0, i) {
  const s = this
    , {params: r, snapGrid: n, slidesGrid: a, rtlTranslate: l, enabled: o, animating: c} = s;
  if (!o || s.destroyed)
    return s;
  typeof t > "u" && (t = s.params.speed);
  const f = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (c && !f && r.loopPreventsSliding)
      return !1;
    s.loopFix({
      direction: "prev"
    }),
      s._clientLeft = s.wrapperEl.clientLeft
  }
  const h = l ? s.translate : -s.translate;
  function p(v) {
    return v < 0 ? -Math.floor(Math.abs(v)) : Math.floor(v)
  }
  const d = p(h)
    , u = n.map(v => p(v))
    , m = r.freeMode && r.freeMode.enabled;
  let g = n[u.indexOf(d) - 1];
  if (typeof g > "u" && (r.cssMode || m)) {
    let v;
    n.forEach( (w, y) => {
        d >= w && (v = y)
      }
    ),
    typeof v < "u" && (g = m ? n[v] : n[v > 0 ? v - 1 : v])
  }
  let x = 0;
  if (typeof g < "u" && (x = a.indexOf(g),
  x < 0 && (x = s.activeIndex - 1),
  r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (x = x - s.slidesPerViewDynamic("previous", !0) + 1,
    x = Math.max(x, 0))),
  r.rewind && s.isBeginning) {
    const v = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(v, t, e, i)
  } else if (r.loop && s.activeIndex === 0 && r.cssMode)
    return requestAnimationFrame( () => {
        s.slideTo(x, t, e, i)
      }
    ),
      !0;
  return s.slideTo(x, t, e, i)
}
function li(t, e=!0, i) {
  const s = this;
  if (!s.destroyed)
    return typeof t > "u" && (t = s.params.speed),
      s.slideTo(s.activeIndex, t, e, i)
}
function ci(t, e=!0, i, s=.5) {
  const r = this;
  if (r.destroyed)
    return;
  typeof t > "u" && (t = r.params.speed);
  let n = r.activeIndex;
  const a = Math.min(r.params.slidesPerGroupSkip, n)
    , l = a + Math.floor((n - a) / r.params.slidesPerGroup)
    , o = r.rtlTranslate ? r.translate : -r.translate;
  if (o >= r.snapGrid[l]) {
    const c = r.snapGrid[l]
      , f = r.snapGrid[l + 1];
    o - c > (f - c) * s && (n += r.params.slidesPerGroup)
  } else {
    const c = r.snapGrid[l - 1]
      , f = r.snapGrid[l];
    o - c <= (f - c) * s && (n -= r.params.slidesPerGroup)
  }
  return n = Math.max(n, 0),
    n = Math.min(n, r.slidesGrid.length - 1),
    r.slideTo(n, t, e, i)
}
function di() {
  const t = this;
  if (t.destroyed)
    return;
  const {params: e, slidesEl: i} = t
    , s = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
  let r = t.getSlideIndexWhenGrid(t.clickedIndex), n;
  const a = t.isElement ? "swiper-slide" : `.${e.slideClass}`
    , l = t.grid && t.params.grid && t.params.grid.rows > 1;
  if (e.loop) {
    if (t.animating)
      return;
    n = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
      e.centeredSlides ? t.slideToLoop(n) : r > (l ? (t.slides.length - s) / 2 - (t.params.grid.rows - 1) : t.slides.length - s) ? (t.loopFix(),
        r = t.getSlideIndex(V(i, `${a}[data-swiper-slide-index="${n}"]`)[0]),
        rt( () => {
            t.slideTo(r)
          }
        )) : t.slideTo(r)
  } else
    t.slideTo(r)
}
var hi = {
  slideTo: ri,
  slideToLoop: ni,
  slideNext: ai,
  slidePrev: oi,
  slideReset: li,
  slideToClosest: ci,
  slideToClickedSlide: di
};
function fi(t, e) {
  const i = this
    , {params: s, slidesEl: r} = i;
  if (!s.loop || i.virtual && i.params.virtual.enabled)
    return;
  const n = () => {
    V(r, `.${s.slideClass}, swiper-slide`).forEach( (u, m) => {
        u.setAttribute("data-swiper-slide-index", m)
      }
    )
  }
    , a = () => {
    const d = V(r, `.${s.slideBlankClass}`);
    d.forEach(u => {
        u.remove()
      }
    ),
    d.length > 0 && (i.recalcSlides(),
      i.updateSlides())
  }
    , l = i.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || l) && a();
  const o = s.slidesPerGroup * (l ? s.grid.rows : 1)
    , c = i.slides.length % o !== 0
    , f = l && i.slides.length % s.grid.rows !== 0
    , h = d => {
      for (let u = 0; u < d; u += 1) {
        const m = i.isElement ? ne("swiper-slide", [s.slideBlankClass]) : ne("div", [s.slideClass, s.slideBlankClass]);
        i.slidesEl.append(m)
      }
    }
  ;
  if (c) {
    if (s.loopAddBlankSlides) {
      const d = o - i.slides.length % o;
      h(d),
        i.recalcSlides(),
        i.updateSlides()
    } else
      re("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n()
  } else if (f) {
    if (s.loopAddBlankSlides) {
      const d = s.grid.rows - i.slides.length % s.grid.rows;
      h(d),
        i.recalcSlides(),
        i.updateSlides()
    } else
      re("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n()
  } else
    n();
  const p = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
  i.loopFix({
    slideRealIndex: t,
    direction: p ? void 0 : "next",
    initial: e
  })
}
function ui({slideRealIndex: t, slideTo: e=!0, direction: i, setTranslate: s, activeSlideIndex: r, initial: n, byController: a, byMousewheel: l}={}) {
  const o = this;
  if (!o.params.loop)
    return;
  o.emit("beforeLoopFix");
  const {slides: c, allowSlidePrev: f, allowSlideNext: h, slidesEl: p, params: d} = o
    , {centeredSlides: u, slidesOffsetBefore: m, slidesOffsetAfter: g, initialSlide: x} = d
    , v = u || !!m || !!g;
  if (o.allowSlidePrev = !0,
    o.allowSlideNext = !0,
  o.virtual && d.virtual.enabled) {
    e && (!v && o.snapIndex === 0 ? o.slideTo(o.virtual.slides.length, 0, !1, !0) : v && o.snapIndex < d.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0)),
      o.allowSlidePrev = f,
      o.allowSlideNext = h,
      o.emit("loopFix");
    return
  }
  let w = d.slidesPerView;
  w === "auto" ? w = o.slidesPerViewDynamic() : (w = Math.ceil(parseFloat(d.slidesPerView, 10)),
  v && w % 2 === 0 && (w = w + 1));
  const y = d.slidesPerGroupAuto ? w : d.slidesPerGroup;
  let M = v ? Math.max(y, Math.ceil(w / 2)) : y;
  M % y !== 0 && (M += y - M % y),
    M += d.loopAdditionalSlides,
    o.loopedSlides = M;
  const E = o.grid && d.grid && d.grid.rows > 1;
  c.length < w + M || o.params.effect === "cards" && c.length < w + M * 2 ? re("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : E && d.grid.fill === "row" && re("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const I = []
    , T = []
    , P = E ? Math.ceil(c.length / d.grid.rows) : c.length
    , S = n && P - x < w && !v;
  let A = S ? x : o.activeIndex;
  typeof r > "u" ? r = o.getSlideIndex(c.find(G => G.classList.contains(d.slideActiveClass))) : A = r;
  const b = i === "next" || !i
    , F = i === "prev" || !i;
  let C = 0
    , U = 0;
  const H = (E ? c[r].column : r) + (v && typeof s > "u" ? -w / 2 + .5 : 0);
  if (H < M) {
    C = Math.max(M - H, y);
    for (let G = 0; G < M - H; G += 1) {
      const k = G - Math.floor(G / P) * P;
      if (E) {
        const L = P - k - 1;
        for (let N = c.length - 1; N >= 0; N -= 1)
          c[N].column === L && I.push(N)
      } else
        I.push(P - k - 1)
    }
  } else if (H + w > P - M) {
    U = Math.max(H - (P - M * 2), y),
    S && (U = Math.max(U, w - P + x + 1));
    for (let G = 0; G < U; G += 1) {
      const k = G - Math.floor(G / P) * P;
      E ? c.forEach( (L, N) => {
          L.column === k && T.push(N)
        }
      ) : T.push(k)
    }
  }
  if (o.__preventObserver__ = !0,
    requestAnimationFrame( () => {
        o.__preventObserver__ = !1
      }
    ),
  o.params.effect === "cards" && c.length < w + M * 2 && (T.includes(r) && T.splice(T.indexOf(r), 1),
  I.includes(r) && I.splice(I.indexOf(r), 1)),
  F && I.forEach(G => {
      c[G].swiperLoopMoveDOM = !0,
        p.prepend(c[G]),
        c[G].swiperLoopMoveDOM = !1
    }
  ),
  b && T.forEach(G => {
      c[G].swiperLoopMoveDOM = !0,
        p.append(c[G]),
        c[G].swiperLoopMoveDOM = !1
    }
  ),
    o.recalcSlides(),
    d.slidesPerView === "auto" ? o.updateSlides() : E && (I.length > 0 && F || T.length > 0 && b) && o.slides.forEach( (G, k) => {
        o.grid.updateSlide(k, G, o.slides)
      }
    ),
  d.watchSlidesProgress && o.updateSlidesOffset(),
    e) {
    if (I.length > 0 && F) {
      if (typeof t > "u") {
        const G = o.slidesGrid[A]
          , L = o.slidesGrid[A + C] - G;
        l ? o.setTranslate(o.translate - L) : (o.slideTo(A + Math.ceil(C), 0, !1, !0),
        s && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - L,
          o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - L))
      } else if (s) {
        const G = E ? I.length / d.grid.rows : I.length;
        o.slideTo(o.activeIndex + G, 0, !1, !0),
          o.touchEventsData.currentTranslate = o.translate
      }
    } else if (T.length > 0 && b)
      if (typeof t > "u") {
        const G = o.slidesGrid[A]
          , L = o.slidesGrid[A - U] - G;
        l ? o.setTranslate(o.translate - L) : (o.slideTo(A - U, 0, !1, !0),
        s && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - L,
          o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - L))
      } else {
        const G = E ? T.length / d.grid.rows : T.length;
        o.slideTo(o.activeIndex - G, 0, !1, !0)
      }
  }
  if (o.allowSlidePrev = f,
    o.allowSlideNext = h,
  o.controller && o.controller.control && !a) {
    const G = {
      slideRealIndex: t,
      direction: i,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(o.controller.control) ? o.controller.control.forEach(k => {
        !k.destroyed && k.params.loop && k.loopFix({
          ...G,
          slideTo: k.params.slidesPerView === d.slidesPerView ? e : !1
        })
      }
    ) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix({
      ...G,
      slideTo: o.controller.control.params.slidesPerView === d.slidesPerView ? e : !1
    })
  }
  o.emit("loopFix")
}
function pi() {
  const t = this
    , {params: e, slidesEl: i} = t;
  if (!e.loop || !i || t.virtual && t.params.virtual.enabled)
    return;
  t.recalcSlides();
  const s = [];
  t.slides.forEach(r => {
      const n = typeof r.swiperSlideIndex > "u" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
      s[n] = r
    }
  ),
    t.slides.forEach(r => {
        r.removeAttribute("data-swiper-slide-index")
      }
    ),
    s.forEach(r => {
        i.append(r)
      }
    ),
    t.recalcSlides(),
    t.slideTo(t.realIndex, 0)
}
var mi = {
  loopCreate: fi,
  loopFix: ui,
  loopDestroy: pi
};
function gi(t) {
  const e = this;
  if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode)
    return;
  const i = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0),
    i.style.cursor = "move",
    i.style.cursor = t ? "grabbing" : "grab",
  e.isElement && requestAnimationFrame( () => {
      e.__preventObserver__ = !1
    }
  )
}
function xi() {
  const t = this;
  t.params.watchOverflow && t.isLocked || t.params.cssMode || (t.isElement && (t.__preventObserver__ = !0),
    t[t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "",
  t.isElement && requestAnimationFrame( () => {
      t.__preventObserver__ = !1
    }
  ))
}
var vi = {
  setGrabCursor: gi,
  unsetGrabCursor: xi
};
function wi(t, e=this) {
  function i(s) {
    if (!s || s === W() || s === O())
      return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(t);
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host)
  }
  return i(e)
}
function Ue(t, e, i) {
  const s = O()
    , {params: r} = t
    , n = r.edgeSwipeDetection
    , a = r.edgeSwipeThreshold;
  return n && (i <= a || i >= s.innerWidth - a) ? n === "prevent" ? (e.preventDefault(),
    !0) : !1 : !0
}
function yi(t) {
  const e = this
    , i = W();
  let s = t;
  s.originalEvent && (s = s.originalEvent);
  const r = e.touchEventsData;
  if (s.type === "pointerdown") {
    if (r.pointerId !== null && r.pointerId !== s.pointerId)
      return;
    r.pointerId = s.pointerId
  } else
    s.type === "touchstart" && s.targetTouches.length === 1 && (r.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    Ue(e, s, s.targetTouches[0].pageX);
    return
  }
  const {params: n, touches: a, enabled: l} = e;
  if (!l || !n.simulateTouch && s.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition)
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let o = s.target;
  if (n.touchEventsTarget === "wrapper" && !bt(o, e.wrapperEl) || "which"in s && s.which === 3 || "button"in s && s.button > 0 || r.isTouched && r.isMoved)
    return;
  const c = !!n.noSwipingClass && n.noSwipingClass !== ""
    , f = s.composedPath ? s.composedPath() : s.path;
  c && s.target && s.target.shadowRoot && f && (o = f[0]);
  const h = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`
    , p = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (p ? wi(h, o) : o.closest(h))) {
    e.allowClick = !0;
    return
  }
  if (n.swipeHandler && !o.closest(n.swipeHandler))
    return;
  a.currentX = s.pageX,
    a.currentY = s.pageY;
  const d = a.currentX
    , u = a.currentY;
  if (!Ue(e, s, d))
    return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }),
    a.startX = d,
    a.startY = u,
    r.touchStartTime = se(),
    e.allowClick = !0,
    e.updateSize(),
    e.swipeDirection = void 0,
  n.threshold > 0 && (r.allowThresholdMove = !1);
  let m = !0;
  o.matches(r.focusableElements) && (m = !1,
  o.nodeName === "SELECT" && (r.isTouched = !1)),
  i.activeElement && i.activeElement.matches(r.focusableElements) && i.activeElement !== o && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !o.matches(r.focusableElements)) && i.activeElement.blur();
  const g = m && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || g) && !o.isContentEditable && s.preventDefault(),
  n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(),
    e.emit("touchStart", s)
}
function Mi(t) {
  const e = W()
    , i = this
    , s = i.touchEventsData
    , {params: r, touches: n, rtlTranslate: a, enabled: l} = i;
  if (!l || !r.simulateTouch && t.pointerType === "mouse")
    return;
  let o = t;
  if (o.originalEvent && (o = o.originalEvent),
  o.type === "pointermove" && (s.touchId !== null || o.pointerId !== s.pointerId))
    return;
  let c;
  if (o.type === "touchmove") {
    if (c = [...o.changedTouches].find(M => M.identifier === s.touchId),
    !c || c.identifier !== s.touchId)
      return
  } else
    c = o;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && i.emit("touchMoveOpposite", o);
    return
  }
  const f = c.pageX
    , h = c.pageY;
  if (o.preventedByNestedSwiper) {
    n.startX = f,
      n.startY = h;
    return
  }
  if (!i.allowTouchMove) {
    o.target.matches(s.focusableElements) || (i.allowClick = !1),
    s.isTouched && (Object.assign(n, {
      startX: f,
      startY: h,
      currentX: f,
      currentY: h
    }),
      s.touchStartTime = se());
    return
  }
  if (r.touchReleaseOnEdges && !r.loop)
    if (i.isVertical()) {
      if (h < n.startY && i.translate <= i.maxTranslate() || h > n.startY && i.translate >= i.minTranslate()) {
        s.isTouched = !1,
          s.isMoved = !1;
        return
      }
    } else {
      if (a && (f > n.startX && -i.translate <= i.maxTranslate() || f < n.startX && -i.translate >= i.minTranslate()))
        return;
      if (!a && (f < n.startX && i.translate <= i.maxTranslate() || f > n.startX && i.translate >= i.minTranslate()))
        return
    }
  if (e.activeElement && e.activeElement.matches(s.focusableElements) && e.activeElement !== o.target && o.pointerType !== "mouse" && e.activeElement.blur(),
  e.activeElement && o.target === e.activeElement && o.target.matches(s.focusableElements)) {
    s.isMoved = !0,
      i.allowClick = !1;
    return
  }
  s.allowTouchCallbacks && i.emit("touchMove", o),
    n.previousX = n.currentX,
    n.previousY = n.currentY,
    n.currentX = f,
    n.currentY = h;
  const p = n.currentX - n.startX
    , d = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(p ** 2 + d ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > "u") {
    let M;
    i.isHorizontal() && n.currentY === n.startY || i.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : p * p + d * d >= 25 && (M = Math.atan2(Math.abs(d), Math.abs(p)) * 180 / Math.PI,
      s.isScrolling = i.isHorizontal() ? M > r.touchAngle : 90 - M > r.touchAngle)
  }
  if (s.isScrolling && i.emit("touchMoveOpposite", o),
  typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0),
  s.isScrolling || o.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return
  }
  if (!s.startMoving)
    return;
  i.allowClick = !1,
  !r.cssMode && o.cancelable && o.preventDefault(),
  r.touchMoveStopPropagation && !r.nested && o.stopPropagation();
  let u = i.isHorizontal() ? p : d
    , m = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement && (u = Math.abs(u) * (a ? 1 : -1),
    m = Math.abs(m) * (a ? 1 : -1)),
    n.diff = u,
    u *= r.touchRatio,
  a && (u = -u,
    m = -m);
  const g = i.touchesDirection;
  i.swipeDirection = u > 0 ? "prev" : "next",
    i.touchesDirection = m > 0 ? "prev" : "next";
  const x = i.params.loop && !r.cssMode
    , v = i.touchesDirection === "next" && i.allowSlideNext || i.touchesDirection === "prev" && i.allowSlidePrev;
  if (!s.isMoved) {
    if (x && v && i.loopFix({
      direction: i.swipeDirection
    }),
      s.startTranslate = i.getTranslate(),
      i.setTransition(0),
      i.animating) {
      const M = new window.CustomEvent("transitionend",{
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      i.wrapperEl.dispatchEvent(M)
    }
    s.allowMomentumBounce = !1,
    r.grabCursor && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!0),
      i.emit("sliderFirstMove", o)
  }
  if (new Date().getTime(),
  r._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && g !== i.touchesDirection && x && v && Math.abs(u) >= 1) {
    Object.assign(n, {
      startX: f,
      startY: h,
      currentX: f,
      currentY: h,
      startTranslate: s.currentTranslate
    }),
      s.loopSwapReset = !0,
      s.startTranslate = s.currentTranslate;
    return
  }
  i.emit("sliderMove", o),
    s.isMoved = !0,
    s.currentTranslate = u + s.startTranslate;
  let w = !0
    , y = r.resistanceRatio;
  if (r.touchReleaseOnEdges && (y = 0),
    u > 0 ? (x && v && s.allowThresholdMove && s.currentTranslate > (r.centeredSlides ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1] - (r.slidesPerView !== "auto" && i.slides.length - r.slidesPerView >= 2 ? i.slidesSizesGrid[i.activeIndex + 1] + i.params.spaceBetween : 0) - i.params.spaceBetween : i.minTranslate()) && i.loopFix({
      direction: "prev",
      setTranslate: !0,
      activeSlideIndex: 0
    }),
    s.currentTranslate > i.minTranslate() && (w = !1,
    r.resistance && (s.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + s.startTranslate + u) ** y))) : u < 0 && (x && v && s.allowThresholdMove && s.currentTranslate < (r.centeredSlides ? i.maxTranslate() + i.slidesSizesGrid[i.slidesSizesGrid.length - 1] + i.params.spaceBetween + (r.slidesPerView !== "auto" && i.slides.length - r.slidesPerView >= 2 ? i.slidesSizesGrid[i.slidesSizesGrid.length - 1] + i.params.spaceBetween : 0) : i.maxTranslate()) && i.loopFix({
      direction: "next",
      setTranslate: !0,
      activeSlideIndex: i.slides.length - (r.slidesPerView === "auto" ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
    }),
    s.currentTranslate < i.maxTranslate() && (w = !1,
    r.resistance && (s.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - s.startTranslate - u) ** y))),
  w && (o.preventedByNestedSwiper = !0),
  !i.allowSlideNext && i.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate),
  !i.allowSlidePrev && i.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate),
  !i.allowSlidePrev && !i.allowSlideNext && (s.currentTranslate = s.startTranslate),
  r.threshold > 0)
    if (Math.abs(u) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0,
          n.startX = n.currentX,
          n.startY = n.currentY,
          s.currentTranslate = s.startTranslate,
          n.diff = i.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return
    }
  !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && i.freeMode || r.watchSlidesProgress) && (i.updateActiveIndex(),
    i.updateSlidesClasses()),
  r.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate))
}
function Ei(t) {
  const e = this
    , i = e.touchEventsData;
  let s = t;
  s.originalEvent && (s = s.originalEvent);
  let r;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (r = [...s.changedTouches].find(M => M.identifier === i.touchId),
    !r || r.identifier !== i.touchId)
      return
  } else {
    if (i.touchId !== null || s.pointerId !== i.pointerId)
      return;
    r = s
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (e.browser.isSafari || e.browser.isWebView)))
    return;
  i.pointerId = null,
    i.touchId = null;
  const {params: a, touches: l, rtlTranslate: o, slidesGrid: c, enabled: f} = e;
  if (!f || !a.simulateTouch && s.pointerType === "mouse")
    return;
  if (i.allowTouchCallbacks && e.emit("touchEnd", s),
    i.allowTouchCallbacks = !1,
    !i.isTouched) {
    i.isMoved && a.grabCursor && e.setGrabCursor(!1),
      i.isMoved = !1,
      i.startMoving = !1;
    return
  }
  a.grabCursor && i.isMoved && i.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const h = se()
    , p = h - i.touchStartTime;
  if (e.allowClick) {
    const M = s.path || s.composedPath && s.composedPath();
    e.updateClickedSlide(M && M[0] || s.target, M),
      e.emit("tap click", s),
    p < 300 && h - i.lastClickTime < 300 && e.emit("doubleTap doubleClick", s)
  }
  if (i.lastClickTime = se(),
    rt( () => {
        e.destroyed || (e.allowClick = !0)
      }
    ),
  !i.isTouched || !i.isMoved || !e.swipeDirection || l.diff === 0 && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset) {
    i.isTouched = !1,
      i.isMoved = !1,
      i.startMoving = !1;
    return
  }
  i.isTouched = !1,
    i.isMoved = !1,
    i.startMoving = !1;
  let d;
  if (a.followFinger ? d = o ? e.translate : -e.translate : d = -i.currentTranslate,
    a.cssMode)
    return;
  if (a.freeMode && a.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: d
    });
    return
  }
  const u = d >= -e.maxTranslate() && !e.params.loop;
  let m = 0
    , g = e.slidesSizesGrid[0];
  for (let M = 0; M < c.length; M += M < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
    const E = M < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    typeof c[M + E] < "u" ? (u || d >= c[M] && d < c[M + E]) && (m = M,
      g = c[M + E] - c[M]) : (u || d >= c[M]) && (m = M,
      g = c[c.length - 1] - c[c.length - 2])
  }
  let x = null
    , v = null;
  a.rewind && (e.isBeginning ? v = a.virtual && a.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (x = 0));
  const w = (d - c[m]) / g
    , y = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
  if (p > a.longSwipesMs) {
    if (!a.longSwipes) {
      e.slideTo(e.activeIndex);
      return
    }
    e.swipeDirection === "next" && (w >= a.longSwipesRatio ? e.slideTo(a.rewind && e.isEnd ? x : m + y) : e.slideTo(m)),
    e.swipeDirection === "prev" && (w > 1 - a.longSwipesRatio ? e.slideTo(m + y) : v !== null && w < 0 && Math.abs(w) > a.longSwipesRatio ? e.slideTo(v) : e.slideTo(m))
  } else {
    if (!a.shortSwipes) {
      e.slideTo(e.activeIndex);
      return
    }
    e.navigation && (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl) ? s.target === e.navigation.nextEl ? e.slideTo(m + y) : e.slideTo(m) : (e.swipeDirection === "next" && e.slideTo(x !== null ? x : m + y),
    e.swipeDirection === "prev" && e.slideTo(v !== null ? v : m))
  }
}
function Re() {
  const t = this
    , {params: e, el: i} = t;
  if (i && i.offsetWidth === 0)
    return;
  e.breakpoints && t.setBreakpoint();
  const {allowSlideNext: s, allowSlidePrev: r, snapGrid: n} = t
    , a = t.virtual && t.params.virtual.enabled;
  t.allowSlideNext = !0,
    t.allowSlidePrev = !0,
    t.updateSize(),
    t.updateSlides(),
    t.updateSlidesClasses();
  const l = a && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides && !l ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.params.loop && !a ? t.slideToLoop(t.realIndex, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0),
  t.autoplay && t.autoplay.running && t.autoplay.paused && (clearTimeout(t.autoplay.resizeTimeout),
    t.autoplay.resizeTimeout = setTimeout( () => {
        t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.resume()
      }
      , 500)),
    t.allowSlidePrev = r,
    t.allowSlideNext = s,
  t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow()
}
function Ai(t) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && t.preventDefault(),
  e.params.preventClicksPropagation && e.animating && (t.stopPropagation(),
    t.stopImmediatePropagation())))
}
function Si() {
  const t = this
    , {wrapperEl: e, rtlTranslate: i, enabled: s} = t;
  if (!s)
    return;
  t.previousTranslate = t.translate,
    t.isHorizontal() ? t.translate = -e.scrollLeft : t.translate = -e.scrollTop,
  t.translate === 0 && (t.translate = 0),
    t.updateActiveIndex(),
    t.updateSlidesClasses();
  let r;
  const n = t.maxTranslate() - t.minTranslate();
  n === 0 ? r = 0 : r = (t.translate - t.minTranslate()) / n,
  r !== t.progress && t.updateProgress(i ? -t.translate : t.translate),
    t.emit("setTranslate", t.translate, !1)
}
function Ti(t) {
  const e = this;
  ie(e, t.target),
  !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update()
}
function bi() {
  const t = this;
  t.documentTouchHandlerProceeded || (t.documentTouchHandlerProceeded = !0,
  t.params.touchReleaseOnEdges && (t.el.style.touchAction = "auto"))
}
const dt = (t, e) => {
    const i = W()
      , {params: s, el: r, wrapperEl: n, device: a} = t
      , l = !!s.nested
      , o = e === "on" ? "addEventListener" : "removeEventListener"
      , c = e;
    !r || typeof r == "string" || (i[o]("touchstart", t.onDocumentTouchStart, {
      passive: !1,
      capture: l
    }),
      r[o]("touchstart", t.onTouchStart, {
        passive: !1
      }),
      r[o]("pointerdown", t.onTouchStart, {
        passive: !1
      }),
      i[o]("touchmove", t.onTouchMove, {
        passive: !1,
        capture: l
      }),
      i[o]("pointermove", t.onTouchMove, {
        passive: !1,
        capture: l
      }),
      i[o]("touchend", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("pointerup", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("pointercancel", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("touchcancel", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("pointerout", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("pointerleave", t.onTouchEnd, {
        passive: !0
      }),
      i[o]("contextmenu", t.onTouchEnd, {
        passive: !0
      }),
    (s.preventClicks || s.preventClicksPropagation) && r[o]("click", t.onClick, !0),
    s.cssMode && n[o]("scroll", t.onScroll),
      s.updateOnWindowResize ? t[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Re, !0) : t[c]("observerUpdate", Re, !0),
      r[o]("load", t.onLoad, {
        capture: !0
      }))
  }
;
function Ci() {
  const t = this
    , {params: e} = t;
  t.onTouchStart = yi.bind(t),
    t.onTouchMove = Mi.bind(t),
    t.onTouchEnd = Ei.bind(t),
    t.onDocumentTouchStart = bi.bind(t),
  e.cssMode && (t.onScroll = Si.bind(t)),
    t.onClick = Ai.bind(t),
    t.onLoad = Ti.bind(t),
    dt(t, "on")
}
function Ii() {
  dt(this, "off")
}
var Fi = {
  attachEvents: Ci,
  detachEvents: Ii
};
const ze = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Pi() {
  const t = this
    , {realIndex: e, initialized: i, params: s, el: r} = t
    , n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0)
    return;
  const a = W()
    , l = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container"
    , o = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? t.el : a.querySelector(s.breakpointsBase)
    , c = t.getBreakpoint(n, l, o);
  if (!c || t.currentBreakpoint === c)
    return;
  const h = (c in n ? n[c] : void 0) || t.originalParams
    , p = ze(t, s)
    , d = ze(t, h)
    , u = t.params.grabCursor
    , m = h.grabCursor
    , g = s.enabled;
  p && !d ? (r.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`),
    t.emitContainerClasses()) : !p && d && (r.classList.add(`${s.containerModifierClass}grid`),
  (h.grid.fill && h.grid.fill === "column" || !h.grid.fill && s.grid.fill === "column") && r.classList.add(`${s.containerModifierClass}grid-column`),
    t.emitContainerClasses()),
    u && !m ? t.unsetGrabCursor() : !u && m && t.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach(E => {
        if (typeof h[E] > "u")
          return;
        const I = s[E] && s[E].enabled
          , T = h[E] && h[E].enabled;
        I && !T && t[E].disable(),
        !I && T && t[E].enable()
      }
    );
  const x = h.direction && h.direction !== s.direction
    , v = s.loop && (h.slidesPerView !== s.slidesPerView || x)
    , w = s.loop;
  x && i && t.changeDirection(),
    D(t.params, h);
  const y = t.params.enabled
    , M = t.params.loop;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev
  }),
    g && !y ? t.disable() : !g && y && t.enable(),
    t.currentBreakpoint = c,
    t.emit("_beforeBreakpoint", h),
  i && (v ? (t.loopDestroy(),
    t.loopCreate(e),
    t.updateSlides()) : !w && M ? (t.loopCreate(e),
    t.updateSlides()) : w && !M && t.loopDestroy()),
    t.emit("breakpoint", h)
}
function Gi(t, e="window", i) {
  if (!t || e === "container" && !i)
    return;
  let s = !1;
  const r = O()
    , n = e === "window" ? r.innerHeight : i.clientHeight
    , a = Object.keys(t).map(l => {
      if (typeof l == "string" && l.indexOf("@") === 0) {
        const o = parseFloat(l.substr(1));
        return {
          value: n * o,
          point: l
        }
      }
      return {
        value: l,
        point: l
      }
    }
  );
  a.sort( (l, o) => parseInt(l.value, 10) - parseInt(o.value, 10));
  for (let l = 0; l < a.length; l += 1) {
    const {point: o, value: c} = a[l];
    e === "window" ? r.matchMedia(`(min-width: ${c}px)`).matches && (s = o) : c <= i.clientWidth && (s = o)
  }
  return s || "max"
}
var Ui = {
  setBreakpoint: Pi,
  getBreakpoint: Gi
};
function Ri(t, e) {
  const i = [];
  return t.forEach(s => {
      typeof s == "object" ? Object.keys(s).forEach(r => {
          s[r] && i.push(e + r)
        }
      ) : typeof s == "string" && i.push(e + s)
    }
  ),
    i
}
function zi() {
  const t = this
    , {classNames: e, params: i, rtl: s, el: r, device: n} = t
    , a = Ri(["initialized", i.direction, {
    "free-mode": t.params.freeMode && i.freeMode.enabled
  }, {
    autoheight: i.autoHeight
  }, {
    rtl: s
  }, {
    grid: i.grid && i.grid.rows > 1
  }, {
    "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": i.cssMode
  }, {
    centered: i.cssMode && i.centeredSlides
  }, {
    "watch-progress": i.watchSlidesProgress
  }], i.containerModifierClass);
  e.push(...a),
    r.classList.add(...e),
    t.emitContainerClasses()
}
function ki() {
  const t = this
    , {el: e, classNames: i} = t;
  !e || typeof e == "string" || (e.classList.remove(...i),
    t.emitContainerClasses())
}
var Oi = {
  addClasses: zi,
  removeClasses: ki
};
function Li() {
  const t = this
    , {isLocked: e, params: i} = t
    , {slidesOffsetBefore: s} = i;
  if (s) {
    const r = t.slides.length - 1
      , n = t.slidesGrid[r] + t.slidesSizesGrid[r] + s * 2;
    t.isLocked = t.size > n
  } else
    t.isLocked = t.snapGrid.length === 1;
  i.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked),
  i.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked),
  e && e !== t.isLocked && (t.isEnd = !1),
  e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock")
}
var Di = {
  checkOverflow: Li
}
  , ke = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: !1,
  userAgent: null,
  url: null,
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  autoHeight: !1,
  setWrapperSize: !1,
  virtualTranslate: !1,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  watchOverflow: !0,
  roundLengths: !1,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: .5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  uniqueNavElements: !0,
  resistance: !0,
  resistanceRatio: .85,
  watchSlidesProgress: !1,
  grabCursor: !1,
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  rewind: !1,
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  runCallbacksOnInit: !0,
  _emitClasses: !1
};
function Bi(t, e) {
  return function(s={}) {
    const r = Object.keys(s)[0]
      , n = s[r];
    if (typeof n != "object" || n === null) {
      D(e, s);
      return
    }
    if (t[r] === !0 && (t[r] = {
      enabled: !0
    }),
    r === "navigation" && t[r] && t[r].enabled && !t[r].prevEl && !t[r].nextEl && (t[r].auto = !0),
    ["pagination", "scrollbar"].indexOf(r) >= 0 && t[r] && t[r].enabled && !t[r].el && (t[r].auto = !0),
      !(r in t && "enabled"in n)) {
      D(e, s);
      return
    }
    typeof t[r] == "object" && !("enabled"in t[r]) && (t[r].enabled = !0),
    t[r] || (t[r] = {
      enabled: !1
    }),
      D(e, s)
  }
}
const he = {
  eventsEmitter: Ot,
  update: Wt,
  translate: $t,
  transition: si,
  slide: hi,
  loop: mi,
  grabCursor: vi,
  events: Fi,
  breakpoints: Ui,
  checkOverflow: Di,
  classes: Oi
}
  , fe = {};
class B {
  constructor(...e) {
    let i, s;
    e.length === 1 && e[0].constructor && Object.prototype.toString.call(e[0]).slice(8, -1) === "Object" ? s = e[0] : [i,s] = e,
    s || (s = {}),
      s = D({}, s),
    i && !s.el && (s.el = i);
    const r = W();
    if (s.el && typeof s.el == "string" && r.querySelectorAll(s.el).length > 1) {
      const o = [];
      return r.querySelectorAll(s.el).forEach(c => {
          const f = D({}, s, {
            el: c
          });
          o.push(new B(f))
        }
      ),
        o
    }
    const n = this;
    n.__swiper__ = !0,
      n.support = at(),
      n.device = ot({
        userAgent: s.userAgent
      }),
      n.browser = lt(),
      n.eventsListeners = {},
      n.eventsAnyListeners = [],
      n.modules = [...n.__modules__],
    s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
    const a = {};
    n.modules.forEach(o => {
        o({
          params: s,
          swiper: n,
          extendParams: Bi(s, a),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n)
        })
      }
    );
    const l = D({}, ke, a);
    return n.params = D({}, l, fe, s),
      n.originalParams = D({}, n.params),
      n.passedParams = D({}, s),
    n.params && n.params.on && Object.keys(n.params.on).forEach(o => {
        n.on(o, n.params.on[o])
      }
    ),
    n.params && n.params.onAny && n.onAny(n.params.onAny),
      Object.assign(n, {
        enabled: n.params.enabled,
        el: i,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return n.params.direction === "horizontal"
        },
        isVertical() {
          return n.params.direction === "vertical"
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
        },
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      }),
      n.emit("_swiper"),
    n.params.init && n.init(),
      n
  }
  getDirectionLabel(e) {
    return this.isHorizontal() ? e : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[e]
  }
  getSlideIndex(e) {
    const {slidesEl: i, params: s} = this
      , r = V(i, `.${s.slideClass}, swiper-slide`)
      , n = Fe(r[0]);
    return Fe(e) - n
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.find(i => i.getAttribute("data-swiper-slide-index") * 1 === e))
  }
  getSlideIndexWhenGrid(e) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e = e % Math.ceil(this.slides.length / this.params.grid.rows))),
      e
  }
  recalcSlides() {
    const e = this
      , {slidesEl: i, params: s} = e;
    e.slides = V(i, `.${s.slideClass}, swiper-slide`)
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0,
    e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"))
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1,
    e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"))
  }
  setProgress(e, i) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const r = s.minTranslate()
      , a = (s.maxTranslate() - r) * e + r;
    s.translateTo(a, typeof i > "u" ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses()
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const i = e.el.className.split(" ").filter(s => s.indexOf("swiper") === 0 || s.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", i.join(" "))
  }
  getSlideClasses(e) {
    const i = this;
    return i.destroyed ? "" : e.className.split(" ").filter(s => s.indexOf("swiper-slide") === 0 || s.indexOf(i.params.slideClass) === 0).join(" ")
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const i = [];
    e.slides.forEach(s => {
        const r = e.getSlideClasses(s);
        i.push({
          slideEl: s,
          classNames: r
        }),
          e.emit("_slideClass", s, r)
      }
    ),
      e.emit("_slideClasses", i)
  }
  slidesPerViewDynamic(e="current", i=!1) {
    const s = this
      , {params: r, slides: n, slidesGrid: a, slidesSizesGrid: l, size: o, activeIndex: c} = s;
    let f = 1;
    if (typeof r.slidesPerView == "number")
      return r.slidesPerView;
    if (r.centeredSlides) {
      let h = n[c] ? Math.ceil(n[c].swiperSlideSize) : 0, p;
      for (let d = c + 1; d < n.length; d += 1)
        n[d] && !p && (h += Math.ceil(n[d].swiperSlideSize),
          f += 1,
        h > o && (p = !0));
      for (let d = c - 1; d >= 0; d -= 1)
        n[d] && !p && (h += n[d].swiperSlideSize,
          f += 1,
        h > o && (p = !0))
    } else if (e === "current")
      for (let h = c + 1; h < n.length; h += 1)
        (i ? a[h] + l[h] - a[c] < o : a[h] - a[c] < o) && (f += 1);
    else
      for (let h = c - 1; h >= 0; h -= 1)
        a[c] - a[h] < o && (f += 1);
    return f
  }
  update() {
    const e = this;
    if (!e || e.destroyed)
      return;
    const {snapGrid: i, params: s} = e;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach(a => {
          a.complete && ie(e, a)
        }
      ),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses();
    function r() {
      const a = e.rtlTranslate ? e.translate * -1 : e.translate
        , l = Math.min(Math.max(a, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l),
        e.updateActiveIndex(),
        e.updateSlidesClasses()
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(),
      s.autoHeight && e.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
        const a = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(a.length - 1, 0, !1, !0)
      } else
        n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || r()
    }
    s.watchOverflow && i !== e.snapGrid && e.checkOverflow(),
      e.emit("update")
  }
  changeDirection(e, i=!0) {
    const s = this
      , r = s.params.direction;
    return e || (e = r === "horizontal" ? "vertical" : "horizontal"),
    e === r || e !== "horizontal" && e !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
      s.el.classList.add(`${s.params.containerModifierClass}${e}`),
      s.emitContainerClasses(),
      s.params.direction = e,
      s.slides.forEach(n => {
          e === "vertical" ? n.style.width = "" : n.style.height = ""
        }
      ),
      s.emit("changeDirection"),
    i && s.update()),
      s
  }
  changeLanguageDirection(e) {
    const i = this;
    i.rtl && e === "rtl" || !i.rtl && e === "ltr" || (i.rtl = e === "rtl",
      i.rtlTranslate = i.params.direction === "horizontal" && i.rtl,
      i.rtl ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`),
        i.el.dir = "rtl") : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`),
        i.el.dir = "ltr"),
      i.update())
  }
  mount(e) {
    const i = this;
    if (i.mounted)
      return !0;
    let s = e || i.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)),
      !s)
      return !1;
    s.swiper = i,
    s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === i.params.swiperElementNodeName.toUpperCase() && (i.isElement = !0);
    const r = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let a = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(r()) : V(s, r())[0];
    return !a && i.params.createElements && (a = ne("div", i.params.wrapperClass),
      s.append(a),
      V(s, `.${i.params.slideClass}`).forEach(l => {
          a.append(l)
        }
      )),
      Object.assign(i, {
        el: s,
        wrapperEl: a,
        slidesEl: i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : a,
        hostEl: i.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === "rtl" || j(s, "direction") === "rtl",
        rtlTranslate: i.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || j(s, "direction") === "rtl"),
        wrongRTL: j(a, "display") === "-webkit-box"
      }),
      !0
  }
  init(e) {
    const i = this;
    if (i.initialized || i.mount(e) === !1)
      return i;
    i.emit("beforeInit"),
    i.params.breakpoints && i.setBreakpoint(),
      i.addClasses(),
      i.updateSize(),
      i.updateSlides(),
    i.params.watchOverflow && i.checkOverflow(),
    i.params.grabCursor && i.enabled && i.setGrabCursor(),
      i.params.loop && i.virtual && i.params.virtual.enabled ? i.slideTo(i.params.initialSlide + i.virtual.slidesBefore, 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0),
    i.params.loop && i.loopCreate(void 0, !0),
      i.attachEvents();
    const r = [...i.el.querySelectorAll('[loading="lazy"]')];
    return i.isElement && r.push(...i.hostEl.querySelectorAll('[loading="lazy"]')),
      r.forEach(n => {
          n.complete ? ie(i, n) : n.addEventListener("load", a => {
              ie(i, a.target)
            }
          )
        }
      ),
      we(i),
      i.initialized = !0,
      we(i),
      i.emit("init"),
      i.emit("afterInit"),
      i
  }
  destroy(e=!0, i=!0) {
    const s = this
      , {params: r, el: n, wrapperEl: a, slides: l} = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"),
      s.initialized = !1,
      s.detachEvents(),
    r.loop && s.loopDestroy(),
    i && (s.removeClasses(),
    n && typeof n != "string" && n.removeAttribute("style"),
    a && a.removeAttribute("style"),
    l && l.length && l.forEach(o => {
        o.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass),
          o.removeAttribute("style"),
          o.removeAttribute("data-swiper-slide-index")
      }
    )),
      s.emit("destroy"),
      Object.keys(s.eventsListeners).forEach(o => {
          s.off(o)
        }
      ),
    e !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null),
      Mt(s)),
      s.destroyed = !0),
      null
  }
  static extendDefaults(e) {
    D(fe, e)
  }
  static get extendedDefaults() {
    return fe
  }
  static get defaults() {
    return ke
  }
  static installModule(e) {
    B.prototype.__modules__ || (B.prototype.__modules__ = []);
    const i = B.prototype.__modules__;
    typeof e == "function" && i.indexOf(e) < 0 && i.push(e)
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach(i => B.installModule(i)),
      B) : (B.installModule(e),
      B)
  }
}
Object.keys(he).forEach(t => {
    Object.keys(he[t]).forEach(e => {
        B.prototype[e] = he[t][e]
      }
    )
  }
);
B.use([zt, kt]);
function Vi(t, e, i, s) {
  return t.params.createElements && Object.keys(s).forEach(r => {
      if (!i[r] && i.auto === !0) {
        let n = V(t.el, `.${s[r]}`)[0];
        n || (n = ne("div", s[r]),
          n.className = s[r],
          t.el.append(n)),
          i[r] = n,
          e[r] = n
      }
    }
  ),
    i
}
const Yi = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function Ni({swiper: t, extendParams: e, on: i, emit: s}) {
  e({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }),
    t.navigation = {
      nextEl: null,
      prevEl: null
    };
  function r(d) {
    let u;
    return d && typeof d == "string" && t.isElement && (u = t.el.querySelector(d) || t.hostEl.querySelector(d),
      u) ? u : (d && (typeof d == "string" && (u = [...document.querySelectorAll(d)]),
      t.params.uniqueNavElements && typeof d == "string" && u && u.length > 1 && t.el.querySelectorAll(d).length === 1 ? u = t.el.querySelector(d) : u && u.length === 1 && (u = u[0])),
      d && !u ? d : u)
  }
  function n(d, u) {
    const m = t.params.navigation;
    d = Y(d),
      d.forEach(g => {
          g && (g.classList[u ? "add" : "remove"](...m.disabledClass.split(" ")),
          g.tagName === "BUTTON" && (g.disabled = u),
          t.params.watchOverflow && t.enabled && g.classList[t.isLocked ? "add" : "remove"](m.lockClass))
        }
      )
  }
  function a() {
    const {nextEl: d, prevEl: u} = t.navigation;
    if (t.params.loop) {
      n(u, !1),
        n(d, !1);
      return
    }
    n(u, t.isBeginning && !t.params.rewind),
      n(d, t.isEnd && !t.params.rewind)
  }
  function l(d) {
    d.preventDefault(),
    !(t.isBeginning && !t.params.loop && !t.params.rewind) && (t.slidePrev(),
      s("navigationPrev"))
  }
  function o(d) {
    d.preventDefault(),
    !(t.isEnd && !t.params.loop && !t.params.rewind) && (t.slideNext(),
      s("navigationNext"))
  }
  function c() {
    const d = t.params.navigation;
    if (t.params.navigation = Vi(t, t.originalParams.navigation, t.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }),
      !(d.nextEl || d.prevEl))
      return;
    let u = r(d.nextEl)
      , m = r(d.prevEl);
    Object.assign(t.navigation, {
      nextEl: u,
      prevEl: m
    }),
      u = Y(u),
      m = Y(m);
    const g = (x, v) => {
        x && (x.matches(".swiper-button-next,.swiper-button-prev") && !x.querySelector("svg") && Pt(x, Yi),
          x.addEventListener("click", v === "next" ? o : l)),
        !t.enabled && x && x.classList.add(...d.lockClass.split(" "))
      }
    ;
    u.forEach(x => g(x, "next")),
      m.forEach(x => g(x, "prev"))
  }
  function f() {
    let {nextEl: d, prevEl: u} = t.navigation;
    d = Y(d),
      u = Y(u);
    const m = (g, x) => {
        g.removeEventListener("click", x === "next" ? o : l),
          g.classList.remove(...t.params.navigation.disabledClass.split(" "))
      }
    ;
    d.forEach(g => m(g, "next")),
      u.forEach(g => m(g, "prev"))
  }
  i("init", () => {
      t.params.navigation.enabled === !1 ? p() : (c(),
        a())
    }
  ),
    i("toEdge fromEdge lock unlock", () => {
        a()
      }
    ),
    i("destroy", () => {
        f()
      }
    ),
    i("enable disable", () => {
        let {nextEl: d, prevEl: u} = t.navigation;
        if (d = Y(d),
          u = Y(u),
          t.enabled) {
          a();
          return
        }
        [...d, ...u].filter(m => !!m).forEach(m => m.classList.add(t.params.navigation.lockClass))
      }
    ),
    i("click", (d, u) => {
        let {nextEl: m, prevEl: g} = t.navigation;
        m = Y(m),
          g = Y(g);
        const x = u.target;
        let v = g.includes(x) || m.includes(x);
        if (t.isElement && !v) {
          const w = u.path || u.composedPath && u.composedPath();
          w && (v = w.find(y => m.includes(y) || g.includes(y)))
        }
        if (t.params.navigation.hideOnClick && !v) {
          if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === x || t.pagination.el.contains(x)))
            return;
          let w;
          m.length ? w = m[0].classList.contains(t.params.navigation.hiddenClass) : g.length && (w = g[0].classList.contains(t.params.navigation.hiddenClass)),
            s(w === !0 ? "navigationShow" : "navigationHide"),
            [...m, ...g].filter(y => !!y).forEach(y => y.classList.toggle(t.params.navigation.hiddenClass))
        }
      }
    );
  const h = () => {
      t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),
        c(),
        a()
    }
    , p = () => {
      t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),
        f()
    }
  ;
  Object.assign(t.navigation, {
    enable: h,
    disable: p,
    update: a,
    init: c,
    destroy: f
  })
}
function Oe(t) {
  let e = t[0]
    , i = t[1]
    , s = t[2];
  return Math.sqrt(e * e + i * i + s * s)
}
function ye(t, e) {
  return t[0] = e[0],
    t[1] = e[1],
    t[2] = e[2],
    t
}
function ji(t, e, i, s) {
  return t[0] = e,
    t[1] = i,
    t[2] = s,
    t
}
function Le(t, e, i) {
  return t[0] = e[0] + i[0],
    t[1] = e[1] + i[1],
    t[2] = e[2] + i[2],
    t
}
function De(t, e, i) {
  return t[0] = e[0] - i[0],
    t[1] = e[1] - i[1],
    t[2] = e[2] - i[2],
    t
}
function Ki(t, e, i) {
  return t[0] = e[0] * i[0],
    t[1] = e[1] * i[1],
    t[2] = e[2] * i[2],
    t
}
function Hi(t, e, i) {
  return t[0] = e[0] / i[0],
    t[1] = e[1] / i[1],
    t[2] = e[2] / i[2],
    t
}
function ue(t, e, i) {
  return t[0] = e[0] * i,
    t[1] = e[1] * i,
    t[2] = e[2] * i,
    t
}
function Qi(t, e) {
  let i = e[0] - t[0]
    , s = e[1] - t[1]
    , r = e[2] - t[2];
  return Math.sqrt(i * i + s * s + r * r)
}
function Wi(t, e) {
  let i = e[0] - t[0]
    , s = e[1] - t[1]
    , r = e[2] - t[2];
  return i * i + s * s + r * r
}
function Be(t) {
  let e = t[0]
    , i = t[1]
    , s = t[2];
  return e * e + i * i + s * s
}
function Zi(t, e) {
  return t[0] = -e[0],
    t[1] = -e[1],
    t[2] = -e[2],
    t
}
function Ji(t, e) {
  return t[0] = 1 / e[0],
    t[1] = 1 / e[1],
    t[2] = 1 / e[2],
    t
}
function Me(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = i * i + s * s + r * r;
  return n > 0 && (n = 1 / Math.sqrt(n)),
    t[0] = e[0] * n,
    t[1] = e[1] * n,
    t[2] = e[2] * n,
    t
}
function ht(t, e) {
  return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
}
function Ve(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = i[0]
    , l = i[1]
    , o = i[2];
  return t[0] = r * o - n * l,
    t[1] = n * a - s * o,
    t[2] = s * l - r * a,
    t
}
function qi(t, e, i, s) {
  let r = e[0]
    , n = e[1]
    , a = e[2];
  return t[0] = r + s * (i[0] - r),
    t[1] = n + s * (i[1] - n),
    t[2] = a + s * (i[2] - a),
    t
}
function _i(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = i[3] * s + i[7] * r + i[11] * n + i[15];
  return a = a || 1,
    t[0] = (i[0] * s + i[4] * r + i[8] * n + i[12]) / a,
    t[1] = (i[1] * s + i[5] * r + i[9] * n + i[13]) / a,
    t[2] = (i[2] * s + i[6] * r + i[10] * n + i[14]) / a,
    t
}
function Xi(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = i[3] * s + i[7] * r + i[11] * n + i[15];
  return a = a || 1,
    t[0] = (i[0] * s + i[4] * r + i[8] * n) / a,
    t[1] = (i[1] * s + i[5] * r + i[9] * n) / a,
    t[2] = (i[2] * s + i[6] * r + i[10] * n) / a,
    t
}
function $i(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2];
  return t[0] = s * i[0] + r * i[3] + n * i[6],
    t[1] = s * i[1] + r * i[4] + n * i[7],
    t[2] = s * i[2] + r * i[5] + n * i[8],
    t
}
function es(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = i[0]
    , l = i[1]
    , o = i[2]
    , c = i[3]
    , f = l * n - o * r
    , h = o * s - a * n
    , p = a * r - l * s
    , d = l * p - o * h
    , u = o * f - a * p
    , m = a * h - l * f
    , g = c * 2;
  return f *= g,
    h *= g,
    p *= g,
    d *= 2,
    u *= 2,
    m *= 2,
    t[0] = s + f + d,
    t[1] = r + h + u,
    t[2] = n + p + m,
    t
}
const ts = function() {
  const t = [0, 0, 0]
    , e = [0, 0, 0];
  return function(i, s) {
    ye(t, i),
      ye(e, s),
      Me(t, t),
      Me(e, e);
    let r = ht(t, e);
    return r > 1 ? 0 : r < -1 ? Math.PI : Math.acos(r)
  }
}();
function is(t, e) {
  return t[0] === e[0] && t[1] === e[1] && t[2] === e[2]
}
class R extends Array {
  constructor(e=0, i=e, s=e) {
    return super(e, i, s),
      this
  }
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  get z() {
    return this[2]
  }
  set x(e) {
    this[0] = e
  }
  set y(e) {
    this[1] = e
  }
  set z(e) {
    this[2] = e
  }
  set(e, i=e, s=e) {
    return e.length ? this.copy(e) : (ji(this, e, i, s),
      this)
  }
  copy(e) {
    return ye(this, e),
      this
  }
  add(e, i) {
    return i ? Le(this, e, i) : Le(this, this, e),
      this
  }
  sub(e, i) {
    return i ? De(this, e, i) : De(this, this, e),
      this
  }
  multiply(e) {
    return e.length ? Ki(this, this, e) : ue(this, this, e),
      this
  }
  divide(e) {
    return e.length ? Hi(this, this, e) : ue(this, this, 1 / e),
      this
  }
  inverse(e=this) {
    return Ji(this, e),
      this
  }
  len() {
    return Oe(this)
  }
  distance(e) {
    return e ? Qi(this, e) : Oe(this)
  }
  squaredLen() {
    return Be(this)
  }
  squaredDistance(e) {
    return e ? Wi(this, e) : Be(this)
  }
  negate(e=this) {
    return Zi(this, e),
      this
  }
  cross(e, i) {
    return i ? Ve(this, e, i) : Ve(this, this, e),
      this
  }
  scale(e) {
    return ue(this, this, e),
      this
  }
  normalize() {
    return Me(this, this),
      this
  }
  dot(e) {
    return ht(this, e)
  }
  equals(e) {
    return is(this, e)
  }
  applyMatrix3(e) {
    return $i(this, this, e),
      this
  }
  applyMatrix4(e) {
    return _i(this, this, e),
      this
  }
  scaleRotateMatrix4(e) {
    return Xi(this, this, e),
      this
  }
  applyQuaternion(e) {
    return es(this, this, e),
      this
  }
  angle(e) {
    return ts(this, e)
  }
  lerp(e, i) {
    return qi(this, this, e, i),
      this
  }
  clone() {
    return new R(this[0],this[1],this[2])
  }
  fromArray(e, i=0) {
    return this[0] = e[i],
      this[1] = e[i + 1],
      this[2] = e[i + 2],
      this
  }
  toArray(e=[], i=0) {
    return e[i] = this[0],
      e[i + 1] = this[1],
      e[i + 2] = this[2],
      e
  }
  transformDirection(e) {
    const i = this[0]
      , s = this[1]
      , r = this[2];
    return this[0] = e[0] * i + e[4] * s + e[8] * r,
      this[1] = e[1] * i + e[5] * s + e[9] * r,
      this[2] = e[2] * i + e[6] * s + e[10] * r,
      this.normalize()
  }
}
const Ye = new R;
let ss = 1
  , rs = 1
  , Ne = !1;
class ft {
  constructor(e, i={}) {
    e.canvas || console.error("gl not passed as first argument to Geometry"),
      this.gl = e,
      this.attributes = i,
      this.id = ss++,
      this.VAOs = {},
      this.drawRange = {
        start: 0,
        count: 0
      },
      this.instancedCount = 0,
      this.gl.renderer.bindVertexArray(null),
      this.gl.renderer.currentGeometry = null,
      this.glState = this.gl.renderer.state;
    for (let s in i)
      this.addAttribute(s, i[s])
  }
  addAttribute(e, i) {
    if (this.attributes[e] = i,
      i.id = rs++,
      i.size = i.size || 1,
      i.type = i.type || (i.data.constructor === Float32Array ? this.gl.FLOAT : i.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT),
      i.target = e === "index" ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER,
      i.normalized = i.normalized || !1,
      i.stride = i.stride || 0,
      i.offset = i.offset || 0,
      i.count = i.count || (i.stride ? i.data.byteLength / i.stride : i.data.length / i.size),
      i.divisor = i.instanced || 0,
      i.needsUpdate = !1,
      i.usage = i.usage || this.gl.STATIC_DRAW,
    i.buffer || this.updateAttribute(i),
      i.divisor) {
      if (this.isInstanced = !0,
      this.instancedCount && this.instancedCount !== i.count * i.divisor)
        return console.warn("geometry has multiple instanced buffers of different length"),
          this.instancedCount = Math.min(this.instancedCount, i.count * i.divisor);
      this.instancedCount = i.count * i.divisor
    } else
      e === "index" ? this.drawRange.count = i.count : this.attributes.index || (this.drawRange.count = Math.max(this.drawRange.count, i.count))
  }
  updateAttribute(e) {
    const i = !e.buffer;
    i && (e.buffer = this.gl.createBuffer()),
    this.glState.boundBuffer !== e.buffer && (this.gl.bindBuffer(e.target, e.buffer),
      this.glState.boundBuffer = e.buffer),
      i ? this.gl.bufferData(e.target, e.data, e.usage) : this.gl.bufferSubData(e.target, 0, e.data),
      e.needsUpdate = !1
  }
  setIndex(e) {
    this.addAttribute("index", e)
  }
  setDrawRange(e, i) {
    this.drawRange.start = e,
      this.drawRange.count = i
  }
  setInstancedCount(e) {
    this.instancedCount = e
  }
  createVAO(e) {
    this.VAOs[e.attributeOrder] = this.gl.renderer.createVertexArray(),
      this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),
      this.bindAttributes(e)
  }
  bindAttributes(e) {
    e.attributeLocations.forEach( (i, {name: s, type: r}) => {
        if (!this.attributes[s]) {
          console.warn(`active attribute ${s} not being supplied`);
          return
        }
        const n = this.attributes[s];
        this.gl.bindBuffer(n.target, n.buffer),
          this.glState.boundBuffer = n.buffer;
        let a = 1;
        r === 35674 && (a = 2),
        r === 35675 && (a = 3),
        r === 35676 && (a = 4);
        const l = n.size / a
          , o = a === 1 ? 0 : a * a * a
          , c = a === 1 ? 0 : a * a;
        for (let f = 0; f < a; f++)
          this.gl.vertexAttribPointer(i + f, l, n.type, n.normalized, n.stride + o, n.offset + f * c),
            this.gl.enableVertexAttribArray(i + f),
            this.gl.renderer.vertexAttribDivisor(i + f, n.divisor)
      }
    ),
    this.attributes.index && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer)
  }
  draw({program: e, mode: i=this.gl.TRIANGLES}) {
    this.gl.renderer.currentGeometry !== `${this.id}_${e.attributeOrder}` && (this.VAOs[e.attributeOrder] || this.createVAO(e),
      this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),
      this.gl.renderer.currentGeometry = `${this.id}_${e.attributeOrder}`),
      e.attributeLocations.forEach( (s, {name: r}) => {
          const n = this.attributes[r];
          n.needsUpdate && this.updateAttribute(n)
        }
      ),
      this.isInstanced ? this.attributes.index ? this.gl.renderer.drawElementsInstanced(i, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2, this.instancedCount) : this.gl.renderer.drawArraysInstanced(i, this.drawRange.start, this.drawRange.count, this.instancedCount) : this.attributes.index ? this.gl.drawElements(i, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2) : this.gl.drawArrays(i, this.drawRange.start, this.drawRange.count)
  }
  getPosition() {
    const e = this.attributes.position;
    if (e.data)
      return e;
    if (!Ne)
      return console.warn("No position buffer data found to compute bounds"),
        Ne = !0
  }
  computeBoundingBox(e) {
    e || (e = this.getPosition());
    const i = e.data
      , s = e.stride ? e.stride / i.BYTES_PER_ELEMENT : e.size;
    this.bounds || (this.bounds = {
      min: new R,
      max: new R,
      center: new R,
      scale: new R,
      radius: 1 / 0
    });
    const r = this.bounds.min
      , n = this.bounds.max
      , a = this.bounds.center
      , l = this.bounds.scale;
    r.set(1 / 0),
      n.set(-1 / 0);
    for (let o = 0, c = i.length; o < c; o += s) {
      const f = i[o]
        , h = i[o + 1]
        , p = i[o + 2];
      r.x = Math.min(f, r.x),
        r.y = Math.min(h, r.y),
        r.z = Math.min(p, r.z),
        n.x = Math.max(f, n.x),
        n.y = Math.max(h, n.y),
        n.z = Math.max(p, n.z)
    }
    l.sub(n, r),
      a.add(r, n).divide(2)
  }
  computeBoundingSphere(e) {
    e || (e = this.getPosition());
    const i = e.data
      , s = e.stride ? e.stride / i.BYTES_PER_ELEMENT : e.size;
    this.bounds || this.computeBoundingBox(e);
    let r = 0;
    for (let n = 0, a = i.length; n < a; n += s)
      Ye.fromArray(i, n),
        r = Math.max(r, this.bounds.center.squaredDistance(Ye));
    this.bounds.radius = Math.sqrt(r)
  }
  remove() {
    for (let e in this.VAOs)
      this.gl.renderer.deleteVertexArray(this.VAOs[e]),
        delete this.VAOs[e];
    for (let e in this.attributes)
      this.gl.deleteBuffer(this.attributes[e].buffer),
        delete this.attributes[e]
  }
}
let ns = 1;
const je = {};
class as {
  constructor(e, {vertex: i, fragment: s, uniforms: r={}, transparent: n=!1, cullFace: a=e.BACK, frontFace: l=e.CCW, depthTest: o=!0, depthWrite: c=!0, depthFunc: f=e.LESS}={}) {
    e.canvas || console.error("gl not passed as fist argument to Program"),
      this.gl = e,
      this.uniforms = r,
      this.id = ns++,
    i || console.warn("vertex shader not supplied"),
    s || console.warn("fragment shader not supplied"),
      this.transparent = n,
      this.cullFace = a,
      this.frontFace = l,
      this.depthTest = o,
      this.depthWrite = c,
      this.depthFunc = f,
      this.blendFunc = {},
      this.blendEquation = {},
    this.transparent && !this.blendFunc.src && (this.gl.renderer.premultipliedAlpha ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA) : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA));
    const h = e.createShader(e.VERTEX_SHADER);
    e.shaderSource(h, i),
      e.compileShader(h),
    e.getShaderInfoLog(h) !== "" && console.warn(`${e.getShaderInfoLog(h)}
Vertex Shader
${Ke(i)}`);
    const p = e.createShader(e.FRAGMENT_SHADER);
    if (e.shaderSource(p, s),
      e.compileShader(p),
    e.getShaderInfoLog(p) !== "" && console.warn(`${e.getShaderInfoLog(p)}
Fragment Shader
${Ke(s)}`),
      this.program = e.createProgram(),
      e.attachShader(this.program, h),
      e.attachShader(this.program, p),
      e.linkProgram(this.program),
      !e.getProgramParameter(this.program, e.LINK_STATUS))
      return console.warn(e.getProgramInfoLog(this.program));
    e.deleteShader(h),
      e.deleteShader(p),
      this.uniformLocations = new Map;
    let d = e.getProgramParameter(this.program, e.ACTIVE_UNIFORMS);
    for (let g = 0; g < d; g++) {
      let x = e.getActiveUniform(this.program, g);
      this.uniformLocations.set(x, e.getUniformLocation(this.program, x.name));
      const v = x.name.match(/(\w+)/g);
      x.uniformName = v[0],
        v.length === 3 ? (x.isStructArray = !0,
          x.structIndex = Number(v[1]),
          x.structProperty = v[2]) : v.length === 2 && isNaN(Number(v[1])) && (x.isStruct = !0,
          x.structProperty = v[1])
    }
    this.attributeLocations = new Map;
    const u = []
      , m = e.getProgramParameter(this.program, e.ACTIVE_ATTRIBUTES);
    for (let g = 0; g < m; g++) {
      const x = e.getActiveAttrib(this.program, g)
        , v = e.getAttribLocation(this.program, x.name);
      v !== -1 && (u[v] = x.name,
        this.attributeLocations.set(x, v))
    }
    this.attributeOrder = u.join("")
  }
  setBlendFunc(e, i, s, r) {
    this.blendFunc.src = e,
      this.blendFunc.dst = i,
      this.blendFunc.srcAlpha = s,
      this.blendFunc.dstAlpha = r,
    e && (this.transparent = !0)
  }
  setBlendEquation(e, i) {
    this.blendEquation.modeRGB = e,
      this.blendEquation.modeAlpha = i
  }
  applyState() {
    this.depthTest ? this.gl.renderer.enable(this.gl.DEPTH_TEST) : this.gl.renderer.disable(this.gl.DEPTH_TEST),
      this.cullFace ? this.gl.renderer.enable(this.gl.CULL_FACE) : this.gl.renderer.disable(this.gl.CULL_FACE),
      this.blendFunc.src ? this.gl.renderer.enable(this.gl.BLEND) : this.gl.renderer.disable(this.gl.BLEND),
    this.cullFace && this.gl.renderer.setCullFace(this.cullFace),
      this.gl.renderer.setFrontFace(this.frontFace),
      this.gl.renderer.setDepthMask(this.depthWrite),
      this.gl.renderer.setDepthFunc(this.depthFunc),
    this.blendFunc.src && this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha),
      this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha)
  }
  use({flipFaces: e=!1}={}) {
    let i = -1;
    this.gl.renderer.state.currentProgram === this.id || (this.gl.useProgram(this.program),
      this.gl.renderer.state.currentProgram = this.id),
      this.uniformLocations.forEach( (r, n) => {
          let a = n.uniformName
            , l = this.uniforms[a];
          if (n.isStruct && (l = l[n.structProperty],
            a += `.${n.structProperty}`),
          n.isStructArray && (l = l[n.structIndex][n.structProperty],
            a += `[${n.structIndex}].${n.structProperty}`),
            !l)
            return He(`Active uniform ${a} has not been supplied`);
          if (l && l.value === void 0)
            return He(`${a} uniform is missing a value parameter`);
          if (l.value.texture)
            return i = i + 1,
              l.value.update(i),
              pe(this.gl, n.type, r, i);
          if (l.value.length && l.value[0].texture) {
            const o = [];
            return l.value.forEach(c => {
                i = i + 1,
                  c.update(i),
                  o.push(i)
              }
            ),
              pe(this.gl, n.type, r, o)
          }
          pe(this.gl, n.type, r, l.value)
        }
      ),
      this.applyState(),
    e && this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW)
  }
  remove() {
    this.gl.deleteProgram(this.program)
  }
}
function pe(t, e, i, s) {
  s = s.length ? os(s) : s;
  const r = t.renderer.state.uniformLocations.get(i);
  if (s.length)
    if (r === void 0 || r.length !== s.length)
      t.renderer.state.uniformLocations.set(i, s.slice(0));
    else {
      if (ls(r, s))
        return;
      r.set ? r.set(s) : cs(r, s),
        t.renderer.state.uniformLocations.set(i, r)
    }
  else {
    if (r === s)
      return;
    t.renderer.state.uniformLocations.set(i, s)
  }
  switch (e) {
    case 5126:
      return s.length ? t.uniform1fv(i, s) : t.uniform1f(i, s);
    case 35664:
      return t.uniform2fv(i, s);
    case 35665:
      return t.uniform3fv(i, s);
    case 35666:
      return t.uniform4fv(i, s);
    case 35670:
    case 5124:
    case 35678:
    case 35680:
      return s.length ? t.uniform1iv(i, s) : t.uniform1i(i, s);
    case 35671:
    case 35667:
      return t.uniform2iv(i, s);
    case 35672:
    case 35668:
      return t.uniform3iv(i, s);
    case 35673:
    case 35669:
      return t.uniform4iv(i, s);
    case 35674:
      return t.uniformMatrix2fv(i, !1, s);
    case 35675:
      return t.uniformMatrix3fv(i, !1, s);
    case 35676:
      return t.uniformMatrix4fv(i, !1, s)
  }
}
function Ke(t) {
  let e = t.split(`
`);
  for (let i = 0; i < e.length; i++)
    e[i] = i + 1 + ": " + e[i];
  return e.join(`
`)
}
function os(t) {
  const e = t.length
    , i = t[0].length;
  if (i === void 0)
    return t;
  const s = e * i;
  let r = je[s];
  r || (je[s] = r = new Float32Array(s));
  for (let n = 0; n < e; n++)
    r.set(t[n], n * i);
  return r
}
function ls(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let i = 0, s = t.length; i < s; i++)
    if (t[i] !== e[i])
      return !1;
  return !0
}
function cs(t, e) {
  for (let i = 0, s = t.length; i < s; i++)
    t[i] = e[i]
}
let me = 0;
function He(t) {
  me > 100 || (console.warn(t),
    me++,
  me > 100 && console.warn("More than 100 program warnings - stopping logs."))
}
const ge = new R;
let ds = 1;
class hs {
  constructor({canvas: e=document.createElement("canvas"), width: i=300, height: s=150, dpr: r=1, alpha: n=!1, depth: a=!0, stencil: l=!1, antialias: o=!1, premultipliedAlpha: c=!1, preserveDrawingBuffer: f=!1, powerPreference: h="default", autoClear: p=!0, webgl: d=2}={}) {
    const u = {
      alpha: n,
      depth: a,
      stencil: l,
      antialias: o,
      premultipliedAlpha: c,
      preserveDrawingBuffer: f,
      powerPreference: h
    };
    this.dpr = r,
      this.alpha = n,
      this.color = !0,
      this.depth = a,
      this.stencil = l,
      this.premultipliedAlpha = c,
      this.autoClear = p,
      this.id = ds++,
    d === 2 && (this.gl = e.getContext("webgl2", u)),
      this.isWebgl2 = !!this.gl,
    this.gl || (this.gl = e.getContext("webgl", u)),
    this.gl || console.error("unable to create webgl context"),
      this.gl.renderer = this,
      this.setSize(i, s),
      this.state = {},
      this.state.blendFunc = {
        src: this.gl.ONE,
        dst: this.gl.ZERO
      },
      this.state.blendEquation = {
        modeRGB: this.gl.FUNC_ADD
      },
      this.state.cullFace = null,
      this.state.frontFace = this.gl.CCW,
      this.state.depthMask = !0,
      this.state.depthFunc = this.gl.LESS,
      this.state.premultiplyAlpha = !1,
      this.state.flipY = !1,
      this.state.unpackAlignment = 4,
      this.state.framebuffer = null,
      this.state.viewport = {
        x: 0,
        y: 0,
        width: null,
        height: null
      },
      this.state.textureUnits = [],
      this.state.activeTextureUnit = 0,
      this.state.boundBuffer = null,
      this.state.uniformLocations = new Map,
      this.state.currentProgram = null,
      this.extensions = {},
      this.isWebgl2 ? (this.getExtension("EXT_color_buffer_float"),
        this.getExtension("OES_texture_float_linear")) : (this.getExtension("OES_texture_float"),
        this.getExtension("OES_texture_float_linear"),
        this.getExtension("OES_texture_half_float"),
        this.getExtension("OES_texture_half_float_linear"),
        this.getExtension("OES_element_index_uint"),
        this.getExtension("OES_standard_derivatives"),
        this.getExtension("EXT_sRGB"),
        this.getExtension("WEBGL_depth_texture"),
        this.getExtension("WEBGL_draw_buffers")),
      this.getExtension("WEBGL_compressed_texture_astc"),
      this.getExtension("EXT_texture_compression_bptc"),
      this.getExtension("WEBGL_compressed_texture_s3tc"),
      this.getExtension("WEBGL_compressed_texture_etc1"),
      this.getExtension("WEBGL_compressed_texture_pvrtc"),
      this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE"),
      this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE"),
      this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE"),
      this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES"),
      this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES"),
      this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES"),
      this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL"),
      this.parameters = {},
      this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
  }
  setSize(e, i) {
    this.width = e,
      this.height = i,
      this.gl.canvas.width = e * this.dpr,
      this.gl.canvas.height = i * this.dpr,
      Object.assign(this.gl.canvas.style, {
        width: e + "px",
        height: i + "px"
      })
  }
  setViewport(e, i, s=0, r=0) {
    this.state.viewport.width === e && this.state.viewport.height === i || (this.state.viewport.width = e,
      this.state.viewport.height = i,
      this.state.viewport.x = s,
      this.state.viewport.y = r,
      this.gl.viewport(s, r, e, i))
  }
  setScissor(e, i, s=0, r=0) {
    this.gl.scissor(s, r, e, i)
  }
  enable(e) {
    this.state[e] !== !0 && (this.gl.enable(e),
      this.state[e] = !0)
  }
  disable(e) {
    this.state[e] !== !1 && (this.gl.disable(e),
      this.state[e] = !1)
  }
  setBlendFunc(e, i, s, r) {
    this.state.blendFunc.src === e && this.state.blendFunc.dst === i && this.state.blendFunc.srcAlpha === s && this.state.blendFunc.dstAlpha === r || (this.state.blendFunc.src = e,
      this.state.blendFunc.dst = i,
      this.state.blendFunc.srcAlpha = s,
      this.state.blendFunc.dstAlpha = r,
      s !== void 0 ? this.gl.blendFuncSeparate(e, i, s, r) : this.gl.blendFunc(e, i))
  }
  setBlendEquation(e, i) {
    e = e || this.gl.FUNC_ADD,
    !(this.state.blendEquation.modeRGB === e && this.state.blendEquation.modeAlpha === i) && (this.state.blendEquation.modeRGB = e,
      this.state.blendEquation.modeAlpha = i,
      i !== void 0 ? this.gl.blendEquationSeparate(e, i) : this.gl.blendEquation(e))
  }
  setCullFace(e) {
    this.state.cullFace !== e && (this.state.cullFace = e,
      this.gl.cullFace(e))
  }
  setFrontFace(e) {
    this.state.frontFace !== e && (this.state.frontFace = e,
      this.gl.frontFace(e))
  }
  setDepthMask(e) {
    this.state.depthMask !== e && (this.state.depthMask = e,
      this.gl.depthMask(e))
  }
  setDepthFunc(e) {
    this.state.depthFunc !== e && (this.state.depthFunc = e,
      this.gl.depthFunc(e))
  }
  activeTexture(e) {
    this.state.activeTextureUnit !== e && (this.state.activeTextureUnit = e,
      this.gl.activeTexture(this.gl.TEXTURE0 + e))
  }
  bindFramebuffer({target: e=this.gl.FRAMEBUFFER, buffer: i=null}={}) {
    this.state.framebuffer !== i && (this.state.framebuffer = i,
      this.gl.bindFramebuffer(e, i))
  }
  getExtension(e, i, s) {
    return i && this.gl[i] ? this.gl[i].bind(this.gl) : (this.extensions[e] || (this.extensions[e] = this.gl.getExtension(e)),
      i ? this.extensions[e] ? this.extensions[e][s].bind(this.extensions[e]) : null : this.extensions[e])
  }
  sortOpaque(e, i) {
    return e.renderOrder !== i.renderOrder ? e.renderOrder - i.renderOrder : e.program.id !== i.program.id ? e.program.id - i.program.id : e.zDepth !== i.zDepth ? e.zDepth - i.zDepth : i.id - e.id
  }
  sortTransparent(e, i) {
    return e.renderOrder !== i.renderOrder ? e.renderOrder - i.renderOrder : e.zDepth !== i.zDepth ? i.zDepth - e.zDepth : i.id - e.id
  }
  sortUI(e, i) {
    return e.renderOrder !== i.renderOrder ? e.renderOrder - i.renderOrder : e.program.id !== i.program.id ? e.program.id - i.program.id : i.id - e.id
  }
  getRenderList({scene: e, camera: i, frustumCull: s, sort: r}) {
    let n = [];
    if (i && s && i.updateFrustum(),
      e.traverse(a => {
          if (!a.visible)
            return !0;
          a.draw && (s && a.frustumCulled && i && !i.frustumIntersectsMesh(a) || n.push(a))
        }
      ),
      r) {
      const a = []
        , l = []
        , o = [];
      n.forEach(c => {
          c.program.transparent ? c.program.depthTest ? l.push(c) : o.push(c) : a.push(c),
            c.zDepth = 0,
          !(c.renderOrder !== 0 || !c.program.depthTest || !i) && (c.worldMatrix.getTranslation(ge),
            ge.applyMatrix4(i.projectionViewMatrix),
            c.zDepth = ge.z)
        }
      ),
        a.sort(this.sortOpaque),
        l.sort(this.sortTransparent),
        o.sort(this.sortUI),
        n = a.concat(l, o)
    }
    return n
  }
  render({scene: e, camera: i, target: s=null, update: r=!0, sort: n=!0, frustumCull: a=!0, clear: l}) {
    s === null ? (this.bindFramebuffer(),
      this.setViewport(this.width * this.dpr, this.height * this.dpr)) : (this.bindFramebuffer(s),
      this.setViewport(s.width, s.height)),
    (l || this.autoClear && l !== !1) && (this.depth && (!s || s.depth) && (this.enable(this.gl.DEPTH_TEST),
      this.setDepthMask(!0)),
      this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0))),
    r && e.updateMatrixWorld(),
    i && i.updateMatrixWorld(),
      this.getRenderList({
        scene: e,
        camera: i,
        frustumCull: a,
        sort: n
      }).forEach(c => {
          c.draw({
            camera: i
          })
        }
      )
  }
}
function ut(t, e) {
  return t[0] = e[0],
    t[1] = e[1],
    t[2] = e[2],
    t[3] = e[3],
    t
}
function pt(t, e, i, s, r) {
  return t[0] = e,
    t[1] = i,
    t[2] = s,
    t[3] = r,
    t
}
function fs(t, e, i) {
  return t[0] = e[0] * i,
    t[1] = e[1] * i,
    t[2] = e[2] * i,
    t[3] = e[3] * i,
    t
}
function mt(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = i * i + s * s + r * r + n * n;
  return a > 0 && (a = 1 / Math.sqrt(a)),
    t[0] = i * a,
    t[1] = s * a,
    t[2] = r * a,
    t[3] = n * a,
    t
}
function gt(t, e) {
  return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
}
function us(t) {
  return t[0] = 0,
    t[1] = 0,
    t[2] = 0,
    t[3] = 1,
    t
}
function ps(t, e, i) {
  i = i * .5;
  let s = Math.sin(i);
  return t[0] = s * e[0],
    t[1] = s * e[1],
    t[2] = s * e[2],
    t[3] = Math.cos(i),
    t
}
function Qe(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = i[0]
    , o = i[1]
    , c = i[2]
    , f = i[3];
  return t[0] = s * f + a * l + r * c - n * o,
    t[1] = r * f + a * o + n * l - s * c,
    t[2] = n * f + a * c + s * o - r * l,
    t[3] = a * f - s * l - r * o - n * c,
    t
}
function ms(t, e, i) {
  i *= .5;
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = Math.sin(i)
    , o = Math.cos(i);
  return t[0] = s * o + a * l,
    t[1] = r * o + n * l,
    t[2] = n * o - r * l,
    t[3] = a * o - s * l,
    t
}
function gs(t, e, i) {
  i *= .5;
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = Math.sin(i)
    , o = Math.cos(i);
  return t[0] = s * o - n * l,
    t[1] = r * o + a * l,
    t[2] = n * o + s * l,
    t[3] = a * o - r * l,
    t
}
function xs(t, e, i) {
  i *= .5;
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = Math.sin(i)
    , o = Math.cos(i);
  return t[0] = s * o + r * l,
    t[1] = r * o - s * l,
    t[2] = n * o + a * l,
    t[3] = a * o - n * l,
    t
}
function vs(t, e, i, s) {
  let r = e[0], n = e[1], a = e[2], l = e[3], o = i[0], c = i[1], f = i[2], h = i[3], p, d, u, m, g;
  return d = r * o + n * c + a * f + l * h,
  d < 0 && (d = -d,
    o = -o,
    c = -c,
    f = -f,
    h = -h),
    1 - d > 1e-6 ? (p = Math.acos(d),
      u = Math.sin(p),
      m = Math.sin((1 - s) * p) / u,
      g = Math.sin(s * p) / u) : (m = 1 - s,
      g = s),
    t[0] = m * r + g * o,
    t[1] = m * n + g * c,
    t[2] = m * a + g * f,
    t[3] = m * l + g * h,
    t
}
function ws(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = i * i + s * s + r * r + n * n
    , l = a ? 1 / a : 0;
  return t[0] = -i * l,
    t[1] = -s * l,
    t[2] = -r * l,
    t[3] = n * l,
    t
}
function ys(t, e) {
  return t[0] = -e[0],
    t[1] = -e[1],
    t[2] = -e[2],
    t[3] = e[3],
    t
}
function Ms(t, e) {
  let i = e[0] + e[4] + e[8], s;
  if (i > 0)
    s = Math.sqrt(i + 1),
      t[3] = .5 * s,
      s = .5 / s,
      t[0] = (e[5] - e[7]) * s,
      t[1] = (e[6] - e[2]) * s,
      t[2] = (e[1] - e[3]) * s;
  else {
    let r = 0;
    e[4] > e[0] && (r = 1),
    e[8] > e[r * 3 + r] && (r = 2);
    let n = (r + 1) % 3
      , a = (r + 2) % 3;
    s = Math.sqrt(e[r * 3 + r] - e[n * 3 + n] - e[a * 3 + a] + 1),
      t[r] = .5 * s,
      s = .5 / s,
      t[3] = (e[n * 3 + a] - e[a * 3 + n]) * s,
      t[n] = (e[n * 3 + r] + e[r * 3 + n]) * s,
      t[a] = (e[a * 3 + r] + e[r * 3 + a]) * s
  }
  return t
}
function Es(t, e, i="YXZ") {
  let s = Math.sin(e[0] * .5)
    , r = Math.cos(e[0] * .5)
    , n = Math.sin(e[1] * .5)
    , a = Math.cos(e[1] * .5)
    , l = Math.sin(e[2] * .5)
    , o = Math.cos(e[2] * .5);
  return i === "XYZ" ? (t[0] = s * a * o + r * n * l,
    t[1] = r * n * o - s * a * l,
    t[2] = r * a * l + s * n * o,
    t[3] = r * a * o - s * n * l) : i === "YXZ" ? (t[0] = s * a * o + r * n * l,
    t[1] = r * n * o - s * a * l,
    t[2] = r * a * l - s * n * o,
    t[3] = r * a * o + s * n * l) : i === "ZXY" ? (t[0] = s * a * o - r * n * l,
    t[1] = r * n * o + s * a * l,
    t[2] = r * a * l + s * n * o,
    t[3] = r * a * o - s * n * l) : i === "ZYX" ? (t[0] = s * a * o - r * n * l,
    t[1] = r * n * o + s * a * l,
    t[2] = r * a * l - s * n * o,
    t[3] = r * a * o + s * n * l) : i === "YZX" ? (t[0] = s * a * o + r * n * l,
    t[1] = r * n * o + s * a * l,
    t[2] = r * a * l - s * n * o,
    t[3] = r * a * o - s * n * l) : i === "XZY" && (t[0] = s * a * o - r * n * l,
    t[1] = r * n * o - s * a * l,
    t[2] = r * a * l + s * n * o,
    t[3] = r * a * o + s * n * l),
    t
}
const As = ut
  , Ss = pt
  , Ts = gt
  , bs = mt;
class Cs extends Array {
  constructor(e=0, i=0, s=0, r=1) {
    return super(e, i, s, r),
      this.onChange = () => {}
      ,
      this
  }
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  get z() {
    return this[2]
  }
  get w() {
    return this[3]
  }
  set x(e) {
    this[0] = e,
      this.onChange()
  }
  set y(e) {
    this[1] = e,
      this.onChange()
  }
  set z(e) {
    this[2] = e,
      this.onChange()
  }
  set w(e) {
    this[3] = e,
      this.onChange()
  }
  identity() {
    return us(this),
      this.onChange(),
      this
  }
  set(e, i, s, r) {
    return e.length ? this.copy(e) : (Ss(this, e, i, s, r),
      this.onChange(),
      this)
  }
  rotateX(e) {
    return ms(this, this, e),
      this.onChange(),
      this
  }
  rotateY(e) {
    return gs(this, this, e),
      this.onChange(),
      this
  }
  rotateZ(e) {
    return xs(this, this, e),
      this.onChange(),
      this
  }
  inverse(e=this) {
    return ws(this, e),
      this.onChange(),
      this
  }
  conjugate(e=this) {
    return ys(this, e),
      this.onChange(),
      this
  }
  copy(e) {
    return As(this, e),
      this.onChange(),
      this
  }
  normalize(e=this) {
    return bs(this, e),
      this.onChange(),
      this
  }
  multiply(e, i) {
    return i ? Qe(this, e, i) : Qe(this, this, e),
      this.onChange(),
      this
  }
  dot(e) {
    return Ts(this, e)
  }
  fromMatrix3(e) {
    return Ms(this, e),
      this.onChange(),
      this
  }
  fromEuler(e) {
    return Es(this, e, e.order),
      this
  }
  fromAxisAngle(e, i) {
    return ps(this, e, i),
      this
  }
  slerp(e, i) {
    return vs(this, this, e, i),
      this
  }
  fromArray(e, i=0) {
    return this[0] = e[i],
      this[1] = e[i + 1],
      this[2] = e[i + 2],
      this[3] = e[i + 3],
      this
  }
  toArray(e=[], i=0) {
    return e[i] = this[0],
      e[i + 1] = this[1],
      e[i + 2] = this[2],
      e[i + 3] = this[3],
      e
  }
}
const Is = 1e-6;
function Fs(t, e) {
  return t[0] = e[0],
    t[1] = e[1],
    t[2] = e[2],
    t[3] = e[3],
    t[4] = e[4],
    t[5] = e[5],
    t[6] = e[6],
    t[7] = e[7],
    t[8] = e[8],
    t[9] = e[9],
    t[10] = e[10],
    t[11] = e[11],
    t[12] = e[12],
    t[13] = e[13],
    t[14] = e[14],
    t[15] = e[15],
    t
}
function Ps(t, e, i, s, r, n, a, l, o, c, f, h, p, d, u, m, g) {
  return t[0] = e,
    t[1] = i,
    t[2] = s,
    t[3] = r,
    t[4] = n,
    t[5] = a,
    t[6] = l,
    t[7] = o,
    t[8] = c,
    t[9] = f,
    t[10] = h,
    t[11] = p,
    t[12] = d,
    t[13] = u,
    t[14] = m,
    t[15] = g,
    t
}
function Gs(t) {
  return t[0] = 1,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = 1,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = 1,
    t[11] = 0,
    t[12] = 0,
    t[13] = 0,
    t[14] = 0,
    t[15] = 1,
    t
}
function Us(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = e[4]
    , l = e[5]
    , o = e[6]
    , c = e[7]
    , f = e[8]
    , h = e[9]
    , p = e[10]
    , d = e[11]
    , u = e[12]
    , m = e[13]
    , g = e[14]
    , x = e[15]
    , v = i * l - s * a
    , w = i * o - r * a
    , y = i * c - n * a
    , M = s * o - r * l
    , E = s * c - n * l
    , I = r * c - n * o
    , T = f * m - h * u
    , P = f * g - p * u
    , S = f * x - d * u
    , A = h * g - p * m
    , b = h * x - d * m
    , F = p * x - d * g
    , C = v * F - w * b + y * A + M * S - E * P + I * T;
  return C ? (C = 1 / C,
    t[0] = (l * F - o * b + c * A) * C,
    t[1] = (r * b - s * F - n * A) * C,
    t[2] = (m * I - g * E + x * M) * C,
    t[3] = (p * E - h * I - d * M) * C,
    t[4] = (o * S - a * F - c * P) * C,
    t[5] = (i * F - r * S + n * P) * C,
    t[6] = (g * y - u * I - x * w) * C,
    t[7] = (f * I - p * y + d * w) * C,
    t[8] = (a * b - l * S + c * T) * C,
    t[9] = (s * S - i * b - n * T) * C,
    t[10] = (u * E - m * y + x * v) * C,
    t[11] = (h * y - f * E - d * v) * C,
    t[12] = (l * P - a * A - o * T) * C,
    t[13] = (i * A - s * P + r * T) * C,
    t[14] = (m * w - u * M - g * v) * C,
    t[15] = (f * M - h * w + p * v) * C,
    t) : null
}
function Rs(t) {
  let e = t[0]
    , i = t[1]
    , s = t[2]
    , r = t[3]
    , n = t[4]
    , a = t[5]
    , l = t[6]
    , o = t[7]
    , c = t[8]
    , f = t[9]
    , h = t[10]
    , p = t[11]
    , d = t[12]
    , u = t[13]
    , m = t[14]
    , g = t[15]
    , x = e * a - i * n
    , v = e * l - s * n
    , w = e * o - r * n
    , y = i * l - s * a
    , M = i * o - r * a
    , E = s * o - r * l
    , I = c * u - f * d
    , T = c * m - h * d
    , P = c * g - p * d
    , S = f * m - h * u
    , A = f * g - p * u
    , b = h * g - p * m;
  return x * b - v * A + w * S + y * P - M * T + E * I
}
function We(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = e[4]
    , o = e[5]
    , c = e[6]
    , f = e[7]
    , h = e[8]
    , p = e[9]
    , d = e[10]
    , u = e[11]
    , m = e[12]
    , g = e[13]
    , x = e[14]
    , v = e[15]
    , w = i[0]
    , y = i[1]
    , M = i[2]
    , E = i[3];
  return t[0] = w * s + y * l + M * h + E * m,
    t[1] = w * r + y * o + M * p + E * g,
    t[2] = w * n + y * c + M * d + E * x,
    t[3] = w * a + y * f + M * u + E * v,
    w = i[4],
    y = i[5],
    M = i[6],
    E = i[7],
    t[4] = w * s + y * l + M * h + E * m,
    t[5] = w * r + y * o + M * p + E * g,
    t[6] = w * n + y * c + M * d + E * x,
    t[7] = w * a + y * f + M * u + E * v,
    w = i[8],
    y = i[9],
    M = i[10],
    E = i[11],
    t[8] = w * s + y * l + M * h + E * m,
    t[9] = w * r + y * o + M * p + E * g,
    t[10] = w * n + y * c + M * d + E * x,
    t[11] = w * a + y * f + M * u + E * v,
    w = i[12],
    y = i[13],
    M = i[14],
    E = i[15],
    t[12] = w * s + y * l + M * h + E * m,
    t[13] = w * r + y * o + M * p + E * g,
    t[14] = w * n + y * c + M * d + E * x,
    t[15] = w * a + y * f + M * u + E * v,
    t
}
function zs(t, e, i) {
  let s = i[0], r = i[1], n = i[2], a, l, o, c, f, h, p, d, u, m, g, x;
  return e === t ? (t[12] = e[0] * s + e[4] * r + e[8] * n + e[12],
    t[13] = e[1] * s + e[5] * r + e[9] * n + e[13],
    t[14] = e[2] * s + e[6] * r + e[10] * n + e[14],
    t[15] = e[3] * s + e[7] * r + e[11] * n + e[15]) : (a = e[0],
    l = e[1],
    o = e[2],
    c = e[3],
    f = e[4],
    h = e[5],
    p = e[6],
    d = e[7],
    u = e[8],
    m = e[9],
    g = e[10],
    x = e[11],
    t[0] = a,
    t[1] = l,
    t[2] = o,
    t[3] = c,
    t[4] = f,
    t[5] = h,
    t[6] = p,
    t[7] = d,
    t[8] = u,
    t[9] = m,
    t[10] = g,
    t[11] = x,
    t[12] = a * s + f * r + u * n + e[12],
    t[13] = l * s + h * r + m * n + e[13],
    t[14] = o * s + p * r + g * n + e[14],
    t[15] = c * s + d * r + x * n + e[15]),
    t
}
function ks(t, e, i) {
  let s = i[0]
    , r = i[1]
    , n = i[2];
  return t[0] = e[0] * s,
    t[1] = e[1] * s,
    t[2] = e[2] * s,
    t[3] = e[3] * s,
    t[4] = e[4] * r,
    t[5] = e[5] * r,
    t[6] = e[6] * r,
    t[7] = e[7] * r,
    t[8] = e[8] * n,
    t[9] = e[9] * n,
    t[10] = e[10] * n,
    t[11] = e[11] * n,
    t[12] = e[12],
    t[13] = e[13],
    t[14] = e[14],
    t[15] = e[15],
    t
}
function Os(t, e, i, s) {
  let r = s[0], n = s[1], a = s[2], l = Math.hypot(r, n, a), o, c, f, h, p, d, u, m, g, x, v, w, y, M, E, I, T, P, S, A, b, F, C, U;
  return Math.abs(l) < Is ? null : (l = 1 / l,
    r *= l,
    n *= l,
    a *= l,
    o = Math.sin(i),
    c = Math.cos(i),
    f = 1 - c,
    h = e[0],
    p = e[1],
    d = e[2],
    u = e[3],
    m = e[4],
    g = e[5],
    x = e[6],
    v = e[7],
    w = e[8],
    y = e[9],
    M = e[10],
    E = e[11],
    I = r * r * f + c,
    T = n * r * f + a * o,
    P = a * r * f - n * o,
    S = r * n * f - a * o,
    A = n * n * f + c,
    b = a * n * f + r * o,
    F = r * a * f + n * o,
    C = n * a * f - r * o,
    U = a * a * f + c,
    t[0] = h * I + m * T + w * P,
    t[1] = p * I + g * T + y * P,
    t[2] = d * I + x * T + M * P,
    t[3] = u * I + v * T + E * P,
    t[4] = h * S + m * A + w * b,
    t[5] = p * S + g * A + y * b,
    t[6] = d * S + x * A + M * b,
    t[7] = u * S + v * A + E * b,
    t[8] = h * F + m * C + w * U,
    t[9] = p * F + g * C + y * U,
    t[10] = d * F + x * C + M * U,
    t[11] = u * F + v * C + E * U,
  e !== t && (t[12] = e[12],
    t[13] = e[13],
    t[14] = e[14],
    t[15] = e[15]),
    t)
}
function Ls(t, e) {
  return t[0] = e[12],
    t[1] = e[13],
    t[2] = e[14],
    t
}
function xt(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[4]
    , a = e[5]
    , l = e[6]
    , o = e[8]
    , c = e[9]
    , f = e[10];
  return t[0] = Math.hypot(i, s, r),
    t[1] = Math.hypot(n, a, l),
    t[2] = Math.hypot(o, c, f),
    t
}
function Ds(t) {
  let e = t[0]
    , i = t[1]
    , s = t[2]
    , r = t[4]
    , n = t[5]
    , a = t[6]
    , l = t[8]
    , o = t[9]
    , c = t[10];
  const f = e * e + i * i + s * s
    , h = r * r + n * n + a * a
    , p = l * l + o * o + c * c;
  return Math.sqrt(Math.max(f, h, p))
}
const Bs = function() {
  const t = [0, 0, 0];
  return function(e, i) {
    let s = t;
    xt(s, i);
    let r = 1 / s[0]
      , n = 1 / s[1]
      , a = 1 / s[2]
      , l = i[0] * r
      , o = i[1] * n
      , c = i[2] * a
      , f = i[4] * r
      , h = i[5] * n
      , p = i[6] * a
      , d = i[8] * r
      , u = i[9] * n
      , m = i[10] * a
      , g = l + h + m
      , x = 0;
    return g > 0 ? (x = Math.sqrt(g + 1) * 2,
      e[3] = .25 * x,
      e[0] = (p - u) / x,
      e[1] = (d - c) / x,
      e[2] = (o - f) / x) : l > h && l > m ? (x = Math.sqrt(1 + l - h - m) * 2,
      e[3] = (p - u) / x,
      e[0] = .25 * x,
      e[1] = (o + f) / x,
      e[2] = (d + c) / x) : h > m ? (x = Math.sqrt(1 + h - l - m) * 2,
      e[3] = (d - c) / x,
      e[0] = (o + f) / x,
      e[1] = .25 * x,
      e[2] = (p + u) / x) : (x = Math.sqrt(1 + m - l - h) * 2,
      e[3] = (o - f) / x,
      e[0] = (d + c) / x,
      e[1] = (p + u) / x,
      e[2] = .25 * x),
      e
  }
}();
function Vs(t, e, i, s) {
  let r = e[0]
    , n = e[1]
    , a = e[2]
    , l = e[3]
    , o = r + r
    , c = n + n
    , f = a + a
    , h = r * o
    , p = r * c
    , d = r * f
    , u = n * c
    , m = n * f
    , g = a * f
    , x = l * o
    , v = l * c
    , w = l * f
    , y = s[0]
    , M = s[1]
    , E = s[2];
  return t[0] = (1 - (u + g)) * y,
    t[1] = (p + w) * y,
    t[2] = (d - v) * y,
    t[3] = 0,
    t[4] = (p - w) * M,
    t[5] = (1 - (h + g)) * M,
    t[6] = (m + x) * M,
    t[7] = 0,
    t[8] = (d + v) * E,
    t[9] = (m - x) * E,
    t[10] = (1 - (h + u)) * E,
    t[11] = 0,
    t[12] = i[0],
    t[13] = i[1],
    t[14] = i[2],
    t[15] = 1,
    t
}
function Ys(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = i + i
    , l = s + s
    , o = r + r
    , c = i * a
    , f = s * a
    , h = s * l
    , p = r * a
    , d = r * l
    , u = r * o
    , m = n * a
    , g = n * l
    , x = n * o;
  return t[0] = 1 - h - u,
    t[1] = f + x,
    t[2] = p - g,
    t[3] = 0,
    t[4] = f - x,
    t[5] = 1 - c - u,
    t[6] = d + m,
    t[7] = 0,
    t[8] = p + g,
    t[9] = d - m,
    t[10] = 1 - c - h,
    t[11] = 0,
    t[12] = 0,
    t[13] = 0,
    t[14] = 0,
    t[15] = 1,
    t
}
function Ns(t, e, i, s, r) {
  let n = 1 / Math.tan(e / 2)
    , a = 1 / (s - r);
  return t[0] = n / i,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = n,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = (r + s) * a,
    t[11] = -1,
    t[12] = 0,
    t[13] = 0,
    t[14] = 2 * r * s * a,
    t[15] = 0,
    t
}
function js(t, e, i, s, r, n, a) {
  let l = 1 / (e - i)
    , o = 1 / (s - r)
    , c = 1 / (n - a);
  return t[0] = -2 * l,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 0,
    t[5] = -2 * o,
    t[6] = 0,
    t[7] = 0,
    t[8] = 0,
    t[9] = 0,
    t[10] = 2 * c,
    t[11] = 0,
    t[12] = (e + i) * l,
    t[13] = (r + s) * o,
    t[14] = (a + n) * c,
    t[15] = 1,
    t
}
function Ks(t, e, i, s) {
  let r = e[0]
    , n = e[1]
    , a = e[2]
    , l = s[0]
    , o = s[1]
    , c = s[2]
    , f = r - i[0]
    , h = n - i[1]
    , p = a - i[2]
    , d = f * f + h * h + p * p;
  d === 0 ? p = 1 : (d = 1 / Math.sqrt(d),
    f *= d,
    h *= d,
    p *= d);
  let u = o * p - c * h
    , m = c * f - l * p
    , g = l * h - o * f;
  return d = u * u + m * m + g * g,
  d === 0 && (c ? l += 1e-6 : o ? c += 1e-6 : o += 1e-6,
    u = o * p - c * h,
    m = c * f - l * p,
    g = l * h - o * f,
    d = u * u + m * m + g * g),
    d = 1 / Math.sqrt(d),
    u *= d,
    m *= d,
    g *= d,
    t[0] = u,
    t[1] = m,
    t[2] = g,
    t[3] = 0,
    t[4] = h * g - p * m,
    t[5] = p * u - f * g,
    t[6] = f * m - h * u,
    t[7] = 0,
    t[8] = f,
    t[9] = h,
    t[10] = p,
    t[11] = 0,
    t[12] = r,
    t[13] = n,
    t[14] = a,
    t[15] = 1,
    t
}
class K extends Array {
  constructor(e=1, i=0, s=0, r=0, n=0, a=1, l=0, o=0, c=0, f=0, h=1, p=0, d=0, u=0, m=0, g=1) {
    return super(e, i, s, r, n, a, l, o, c, f, h, p, d, u, m, g),
      this
  }
  get x() {
    return this[12]
  }
  get y() {
    return this[13]
  }
  get z() {
    return this[14]
  }
  get w() {
    return this[15]
  }
  set x(e) {
    this[12] = e
  }
  set y(e) {
    this[13] = e
  }
  set z(e) {
    this[14] = e
  }
  set w(e) {
    this[15] = e
  }
  set(e, i, s, r, n, a, l, o, c, f, h, p, d, u, m, g) {
    return e.length ? this.copy(e) : (Ps(this, e, i, s, r, n, a, l, o, c, f, h, p, d, u, m, g),
      this)
  }
  translate(e, i=this) {
    return zs(this, i, e),
      this
  }
  rotate(e, i, s=this) {
    return Os(this, s, e, i),
      this
  }
  scale(e, i=this) {
    return ks(this, i, typeof e == "number" ? [e, e, e] : e),
      this
  }
  multiply(e, i) {
    return i ? We(this, e, i) : We(this, this, e),
      this
  }
  identity() {
    return Gs(this),
      this
  }
  copy(e) {
    return Fs(this, e),
      this
  }
  fromPerspective({fov: e, aspect: i, near: s, far: r}={}) {
    return Ns(this, e, i, s, r),
      this
  }
  fromOrthogonal({left: e, right: i, bottom: s, top: r, near: n, far: a}) {
    return js(this, e, i, s, r, n, a),
      this
  }
  fromQuaternion(e) {
    return Ys(this, e),
      this
  }
  setPosition(e) {
    return this.x = e[0],
      this.y = e[1],
      this.z = e[2],
      this
  }
  inverse(e=this) {
    return Us(this, e),
      this
  }
  compose(e, i, s) {
    return Vs(this, e, i, s),
      this
  }
  getRotation(e) {
    return Bs(e, this),
      this
  }
  getTranslation(e) {
    return Ls(e, this),
      this
  }
  getScaling(e) {
    return xt(e, this),
      this
  }
  getMaxScaleOnAxis() {
    return Ds(this)
  }
  lookAt(e, i, s) {
    return Ks(this, e, i, s),
      this
  }
  determinant() {
    return Rs(this)
  }
  fromArray(e, i=0) {
    return this[0] = e[i],
      this[1] = e[i + 1],
      this[2] = e[i + 2],
      this[3] = e[i + 3],
      this[4] = e[i + 4],
      this[5] = e[i + 5],
      this[6] = e[i + 6],
      this[7] = e[i + 7],
      this[8] = e[i + 8],
      this[9] = e[i + 9],
      this[10] = e[i + 10],
      this[11] = e[i + 11],
      this[12] = e[i + 12],
      this[13] = e[i + 13],
      this[14] = e[i + 14],
      this[15] = e[i + 15],
      this
  }
  toArray(e=[], i=0) {
    return e[i] = this[0],
      e[i + 1] = this[1],
      e[i + 2] = this[2],
      e[i + 3] = this[3],
      e[i + 4] = this[4],
      e[i + 5] = this[5],
      e[i + 6] = this[6],
      e[i + 7] = this[7],
      e[i + 8] = this[8],
      e[i + 9] = this[9],
      e[i + 10] = this[10],
      e[i + 11] = this[11],
      e[i + 12] = this[12],
      e[i + 13] = this[13],
      e[i + 14] = this[14],
      e[i + 15] = this[15],
      e
  }
}
function Hs(t, e, i="YXZ") {
  return i === "XYZ" ? (t[1] = Math.asin(Math.min(Math.max(e[8], -1), 1)),
    Math.abs(e[8]) < .99999 ? (t[0] = Math.atan2(-e[9], e[10]),
      t[2] = Math.atan2(-e[4], e[0])) : (t[0] = Math.atan2(e[6], e[5]),
      t[2] = 0)) : i === "YXZ" ? (t[0] = Math.asin(-Math.min(Math.max(e[9], -1), 1)),
    Math.abs(e[9]) < .99999 ? (t[1] = Math.atan2(e[8], e[10]),
      t[2] = Math.atan2(e[1], e[5])) : (t[1] = Math.atan2(-e[2], e[0]),
      t[2] = 0)) : i === "ZXY" ? (t[0] = Math.asin(Math.min(Math.max(e[6], -1), 1)),
    Math.abs(e[6]) < .99999 ? (t[1] = Math.atan2(-e[2], e[10]),
      t[2] = Math.atan2(-e[4], e[5])) : (t[1] = 0,
      t[2] = Math.atan2(e[1], e[0]))) : i === "ZYX" ? (t[1] = Math.asin(-Math.min(Math.max(e[2], -1), 1)),
    Math.abs(e[2]) < .99999 ? (t[0] = Math.atan2(e[6], e[10]),
      t[2] = Math.atan2(e[1], e[0])) : (t[0] = 0,
      t[2] = Math.atan2(-e[4], e[5]))) : i === "YZX" ? (t[2] = Math.asin(Math.min(Math.max(e[1], -1), 1)),
    Math.abs(e[1]) < .99999 ? (t[0] = Math.atan2(-e[9], e[5]),
      t[1] = Math.atan2(-e[2], e[0])) : (t[0] = 0,
      t[1] = Math.atan2(e[8], e[10]))) : i === "XZY" && (t[2] = Math.asin(-Math.min(Math.max(e[4], -1), 1)),
    Math.abs(e[4]) < .99999 ? (t[0] = Math.atan2(e[6], e[5]),
      t[1] = Math.atan2(e[8], e[0])) : (t[0] = Math.atan2(-e[9], e[10]),
      t[1] = 0)),
    t
}
const Ze = new K;
class Qs extends Array {
  constructor(e=0, i=e, s=e, r="YXZ") {
    return super(e, i, s),
      this.order = r,
      this.onChange = () => {}
      ,
      this
  }
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  get z() {
    return this[2]
  }
  set x(e) {
    this[0] = e,
      this.onChange()
  }
  set y(e) {
    this[1] = e,
      this.onChange()
  }
  set z(e) {
    this[2] = e,
      this.onChange()
  }
  set(e, i=e, s=e) {
    return e.length ? this.copy(e) : (this[0] = e,
      this[1] = i,
      this[2] = s,
      this.onChange(),
      this)
  }
  copy(e) {
    return this[0] = e[0],
      this[1] = e[1],
      this[2] = e[2],
      this.onChange(),
      this
  }
  reorder(e) {
    return this.order = e,
      this.onChange(),
      this
  }
  fromRotationMatrix(e, i=this.order) {
    return Hs(this, e, i),
      this
  }
  fromQuaternion(e, i=this.order) {
    return Ze.fromQuaternion(e),
      this.fromRotationMatrix(Ze, i)
  }
  toArray(e=[], i=0) {
    return e[i] = this[0],
      e[i + 1] = this[1],
      e[i + 2] = this[2],
      e
  }
}
class Ae {
  constructor() {
    this.parent = null,
      this.children = [],
      this.visible = !0,
      this.matrix = new K,
      this.worldMatrix = new K,
      this.matrixAutoUpdate = !0,
      this.position = new R,
      this.quaternion = new Cs,
      this.scale = new R(1),
      this.rotation = new Qs,
      this.up = new R(0,1,0),
      this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation),
      this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion)
  }
  setParent(e, i=!0) {
    this.parent && e !== this.parent && this.parent.removeChild(this, !1),
      this.parent = e,
    i && e && e.addChild(this, !1)
  }
  addChild(e, i=!0) {
    ~this.children.indexOf(e) || this.children.push(e),
    i && e.setParent(this, !1)
  }
  removeChild(e, i=!0) {
    ~this.children.indexOf(e) && this.children.splice(this.children.indexOf(e), 1),
    i && e.setParent(null, !1)
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(),
    (this.worldMatrixNeedsUpdate || e) && (this.parent === null ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix),
      this.worldMatrixNeedsUpdate = !1,
      e = !0);
    for (let i = 0, s = this.children.length; i < s; i++)
      this.children[i].updateMatrixWorld(e)
  }
  updateMatrix() {
    this.matrix.compose(this.quaternion, this.position, this.scale),
      this.worldMatrixNeedsUpdate = !0
  }
  traverse(e) {
    if (!e(this))
      for (let i = 0, s = this.children.length; i < s; i++)
        this.children[i].traverse(e)
  }
  decompose() {
    this.matrix.getTranslation(this.position),
      this.matrix.getRotation(this.quaternion),
      this.matrix.getScaling(this.scale),
      this.rotation.fromQuaternion(this.quaternion)
  }
  lookAt(e, i=!1) {
    i ? this.matrix.lookAt(this.position, e, this.up) : this.matrix.lookAt(e, this.position, this.up),
      this.matrix.getRotation(this.quaternion),
      this.rotation.fromQuaternion(this.quaternion)
  }
}
const Ws = new K
  , Zs = new R
  , Js = new R;
class qs extends Ae {
  constructor(e, {near: i=.1, far: s=100, fov: r=45, aspect: n=1, left: a, right: l, bottom: o, top: c, zoom: f=1}={}) {
    super(),
      Object.assign(this, {
        near: i,
        far: s,
        fov: r,
        aspect: n,
        left: a,
        right: l,
        bottom: o,
        top: c,
        zoom: f
      }),
      this.projectionMatrix = new K,
      this.viewMatrix = new K,
      this.projectionViewMatrix = new K,
      this.worldPosition = new R,
      this.type = a || l ? "orthographic" : "perspective",
      this.type === "orthographic" ? this.orthographic() : this.perspective()
  }
  perspective({near: e=this.near, far: i=this.far, fov: s=this.fov, aspect: r=this.aspect}={}) {
    return Object.assign(this, {
      near: e,
      far: i,
      fov: s,
      aspect: r
    }),
      this.projectionMatrix.fromPerspective({
        fov: s * (Math.PI / 180),
        aspect: r,
        near: e,
        far: i
      }),
      this.type = "perspective",
      this
  }
  orthographic({near: e=this.near, far: i=this.far, left: s=this.left, right: r=this.right, bottom: n=this.bottom, top: a=this.top, zoom: l=this.zoom}={}) {
    return Object.assign(this, {
      near: e,
      far: i,
      left: s,
      right: r,
      bottom: n,
      top: a,
      zoom: l
    }),
      s /= l,
      r /= l,
      n /= l,
      a /= l,
      this.projectionMatrix.fromOrthogonal({
        left: s,
        right: r,
        bottom: n,
        top: a,
        near: e,
        far: i
      }),
      this.type = "orthographic",
      this
  }
  updateMatrixWorld() {
    return super.updateMatrixWorld(),
      this.viewMatrix.inverse(this.worldMatrix),
      this.worldMatrix.getTranslation(this.worldPosition),
      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix),
      this
  }
  lookAt(e) {
    return super.lookAt(e, !0),
      this
  }
  project(e) {
    return e.applyMatrix4(this.viewMatrix),
      e.applyMatrix4(this.projectionMatrix),
      this
  }
  unproject(e) {
    return e.applyMatrix4(Ws.inverse(this.projectionMatrix)),
      e.applyMatrix4(this.worldMatrix),
      this
  }
  updateFrustum() {
    this.frustum || (this.frustum = [new R, new R, new R, new R, new R, new R]);
    const e = this.projectionViewMatrix;
    this.frustum[0].set(e[3] - e[0], e[7] - e[4], e[11] - e[8]).constant = e[15] - e[12],
      this.frustum[1].set(e[3] + e[0], e[7] + e[4], e[11] + e[8]).constant = e[15] + e[12],
      this.frustum[2].set(e[3] + e[1], e[7] + e[5], e[11] + e[9]).constant = e[15] + e[13],
      this.frustum[3].set(e[3] - e[1], e[7] - e[5], e[11] - e[9]).constant = e[15] - e[13],
      this.frustum[4].set(e[3] - e[2], e[7] - e[6], e[11] - e[10]).constant = e[15] - e[14],
      this.frustum[5].set(e[3] + e[2], e[7] + e[6], e[11] + e[10]).constant = e[15] + e[14];
    for (let i = 0; i < 6; i++) {
      const s = 1 / this.frustum[i].distance();
      this.frustum[i].multiply(s),
        this.frustum[i].constant *= s
    }
  }
  frustumIntersectsMesh(e) {
    if (!e.geometry.attributes.position || ((!e.geometry.bounds || e.geometry.bounds.radius === 1 / 0) && e.geometry.computeBoundingSphere(),
      !e.geometry.bounds))
      return !0;
    const i = Zs;
    i.copy(e.geometry.bounds.center),
      i.applyMatrix4(e.worldMatrix);
    const s = e.geometry.bounds.radius * e.worldMatrix.getMaxScaleOnAxis();
    return this.frustumIntersectsSphere(i, s)
  }
  frustumIntersectsSphere(e, i) {
    const s = Js;
    for (let r = 0; r < 6; r++) {
      const n = this.frustum[r];
      if (s.copy(n).dot(e) + n.constant < -i)
        return !1
    }
    return !0
  }
}
function _s(t, e) {
  return t[0] = e[0],
    t[1] = e[1],
    t[2] = e[2],
    t[3] = e[4],
    t[4] = e[5],
    t[5] = e[6],
    t[6] = e[8],
    t[7] = e[9],
    t[8] = e[10],
    t
}
function Xs(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = i + i
    , l = s + s
    , o = r + r
    , c = i * a
    , f = s * a
    , h = s * l
    , p = r * a
    , d = r * l
    , u = r * o
    , m = n * a
    , g = n * l
    , x = n * o;
  return t[0] = 1 - h - u,
    t[3] = f - x,
    t[6] = p + g,
    t[1] = f + x,
    t[4] = 1 - c - u,
    t[7] = d - m,
    t[2] = p - g,
    t[5] = d + m,
    t[8] = 1 - c - h,
    t
}
function $s(t, e) {
  return t[0] = e[0],
    t[1] = e[1],
    t[2] = e[2],
    t[3] = e[3],
    t[4] = e[4],
    t[5] = e[5],
    t[6] = e[6],
    t[7] = e[7],
    t[8] = e[8],
    t
}
function er(t, e, i, s, r, n, a, l, o, c) {
  return t[0] = e,
    t[1] = i,
    t[2] = s,
    t[3] = r,
    t[4] = n,
    t[5] = a,
    t[6] = l,
    t[7] = o,
    t[8] = c,
    t
}
function tr(t) {
  return t[0] = 1,
    t[1] = 0,
    t[2] = 0,
    t[3] = 0,
    t[4] = 1,
    t[5] = 0,
    t[6] = 0,
    t[7] = 0,
    t[8] = 1,
    t
}
function ir(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = e[4]
    , l = e[5]
    , o = e[6]
    , c = e[7]
    , f = e[8]
    , h = f * a - l * c
    , p = -f * n + l * o
    , d = c * n - a * o
    , u = i * h + s * p + r * d;
  return u ? (u = 1 / u,
    t[0] = h * u,
    t[1] = (-f * s + r * c) * u,
    t[2] = (l * s - r * a) * u,
    t[3] = p * u,
    t[4] = (f * i - r * o) * u,
    t[5] = (-l * i + r * n) * u,
    t[6] = d * u,
    t[7] = (-c * i + s * o) * u,
    t[8] = (a * i - s * n) * u,
    t) : null
}
function Je(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = e[4]
    , o = e[5]
    , c = e[6]
    , f = e[7]
    , h = e[8]
    , p = i[0]
    , d = i[1]
    , u = i[2]
    , m = i[3]
    , g = i[4]
    , x = i[5]
    , v = i[6]
    , w = i[7]
    , y = i[8];
  return t[0] = p * s + d * a + u * c,
    t[1] = p * r + d * l + u * f,
    t[2] = p * n + d * o + u * h,
    t[3] = m * s + g * a + x * c,
    t[4] = m * r + g * l + x * f,
    t[5] = m * n + g * o + x * h,
    t[6] = v * s + w * a + y * c,
    t[7] = v * r + w * l + y * f,
    t[8] = v * n + w * o + y * h,
    t
}
function sr(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = e[4]
    , o = e[5]
    , c = e[6]
    , f = e[7]
    , h = e[8]
    , p = i[0]
    , d = i[1];
  return t[0] = s,
    t[1] = r,
    t[2] = n,
    t[3] = a,
    t[4] = l,
    t[5] = o,
    t[6] = p * s + d * a + c,
    t[7] = p * r + d * l + f,
    t[8] = p * n + d * o + h,
    t
}
function rr(t, e, i) {
  let s = e[0]
    , r = e[1]
    , n = e[2]
    , a = e[3]
    , l = e[4]
    , o = e[5]
    , c = e[6]
    , f = e[7]
    , h = e[8]
    , p = Math.sin(i)
    , d = Math.cos(i);
  return t[0] = d * s + p * a,
    t[1] = d * r + p * l,
    t[2] = d * n + p * o,
    t[3] = d * a - p * s,
    t[4] = d * l - p * r,
    t[5] = d * o - p * n,
    t[6] = c,
    t[7] = f,
    t[8] = h,
    t
}
function nr(t, e, i) {
  let s = i[0]
    , r = i[1];
  return t[0] = s * e[0],
    t[1] = s * e[1],
    t[2] = s * e[2],
    t[3] = r * e[3],
    t[4] = r * e[4],
    t[5] = r * e[5],
    t[6] = e[6],
    t[7] = e[7],
    t[8] = e[8],
    t
}
function ar(t, e) {
  let i = e[0]
    , s = e[1]
    , r = e[2]
    , n = e[3]
    , a = e[4]
    , l = e[5]
    , o = e[6]
    , c = e[7]
    , f = e[8]
    , h = e[9]
    , p = e[10]
    , d = e[11]
    , u = e[12]
    , m = e[13]
    , g = e[14]
    , x = e[15]
    , v = i * l - s * a
    , w = i * o - r * a
    , y = i * c - n * a
    , M = s * o - r * l
    , E = s * c - n * l
    , I = r * c - n * o
    , T = f * m - h * u
    , P = f * g - p * u
    , S = f * x - d * u
    , A = h * g - p * m
    , b = h * x - d * m
    , F = p * x - d * g
    , C = v * F - w * b + y * A + M * S - E * P + I * T;
  return C ? (C = 1 / C,
    t[0] = (l * F - o * b + c * A) * C,
    t[1] = (o * S - a * F - c * P) * C,
    t[2] = (a * b - l * S + c * T) * C,
    t[3] = (r * b - s * F - n * A) * C,
    t[4] = (i * F - r * S + n * P) * C,
    t[5] = (s * S - i * b - n * T) * C,
    t[6] = (m * I - g * E + x * M) * C,
    t[7] = (g * y - u * I - x * w) * C,
    t[8] = (u * E - m * y + x * v) * C,
    t) : null
}
class or extends Array {
  constructor(e=1, i=0, s=0, r=0, n=1, a=0, l=0, o=0, c=1) {
    return super(e, i, s, r, n, a, l, o, c),
      this
  }
  set(e, i, s, r, n, a, l, o, c) {
    return e.length ? this.copy(e) : (er(this, e, i, s, r, n, a, l, o, c),
      this)
  }
  translate(e, i=this) {
    return sr(this, i, e),
      this
  }
  rotate(e, i=this) {
    return rr(this, i, e),
      this
  }
  scale(e, i=this) {
    return nr(this, i, e),
      this
  }
  multiply(e, i) {
    return i ? Je(this, e, i) : Je(this, this, e),
      this
  }
  identity() {
    return tr(this),
      this
  }
  copy(e) {
    return $s(this, e),
      this
  }
  fromMatrix4(e) {
    return _s(this, e),
      this
  }
  fromQuaternion(e) {
    return Xs(this, e),
      this
  }
  fromBasis(e, i, s) {
    return this.set(e[0], e[1], e[2], i[0], i[1], i[2], s[0], s[1], s[2]),
      this
  }
  inverse(e=this) {
    return ir(this, e),
      this
  }
  getNormalMatrix(e) {
    return ar(this, e),
      this
  }
}
let lr = 0;
class xe extends Ae {
  constructor(e, {geometry: i, program: s, mode: r=e.TRIANGLES, frustumCulled: n=!0, renderOrder: a=0}={}) {
    super(),
    e.canvas || console.error("gl not passed as first argument to Mesh"),
      this.gl = e,
      this.id = lr++,
      this.geometry = i,
      this.program = s,
      this.mode = r,
      this.frustumCulled = n,
      this.renderOrder = a,
      this.modelViewMatrix = new K,
      this.normalMatrix = new or,
      this.beforeRenderCallbacks = [],
      this.afterRenderCallbacks = []
  }
  onBeforeRender(e) {
    return this.beforeRenderCallbacks.push(e),
      this
  }
  onAfterRender(e) {
    return this.afterRenderCallbacks.push(e),
      this
  }
  draw({camera: e}={}) {
    this.beforeRenderCallbacks.forEach(s => s && s({
      mesh: this,
      camera: e
    })),
    e && (this.program.uniforms.modelMatrix || Object.assign(this.program.uniforms, {
      modelMatrix: {
        value: null
      },
      viewMatrix: {
        value: null
      },
      modelViewMatrix: {
        value: null
      },
      normalMatrix: {
        value: null
      },
      projectionMatrix: {
        value: null
      },
      cameraPosition: {
        value: null
      }
    }),
      this.program.uniforms.projectionMatrix.value = e.projectionMatrix,
      this.program.uniforms.cameraPosition.value = e.worldPosition,
      this.program.uniforms.viewMatrix.value = e.viewMatrix,
      this.modelViewMatrix.multiply(e.viewMatrix, this.worldMatrix),
      this.normalMatrix.getNormalMatrix(this.modelViewMatrix),
      this.program.uniforms.modelMatrix.value = this.worldMatrix,
      this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix,
      this.program.uniforms.normalMatrix.value = this.normalMatrix);
    let i = this.program.cullFace && this.worldMatrix.determinant() < 0;
    this.program.use({
      flipFaces: i
    }),
      this.geometry.draw({
        mode: this.mode,
        program: this.program
      }),
      this.afterRenderCallbacks.forEach(s => s && s({
        mesh: this,
        camera: e
      }))
  }
}
const qe = new Uint8Array(4);
function _e(t) {
  return (t & t - 1) === 0
}
let cr = 1;
class Xe {
  constructor(e, {image: i, target: s=e.TEXTURE_2D, type: r=e.UNSIGNED_BYTE, format: n=e.RGBA, internalFormat: a=n, wrapS: l=e.CLAMP_TO_EDGE, wrapT: o=e.CLAMP_TO_EDGE, generateMipmaps: c=!0, minFilter: f=c ? e.NEAREST_MIPMAP_LINEAR : e.LINEAR, magFilter: h=e.LINEAR, premultiplyAlpha: p=!1, unpackAlignment: d=4, flipY: u=s == e.TEXTURE_2D, anisotropy: m=0, level: g=0, width: x, height: v=x}={}) {
    this.gl = e,
      this.id = cr++,
      this.image = i,
      this.target = s,
      this.type = r,
      this.format = n,
      this.internalFormat = a,
      this.minFilter = f,
      this.magFilter = h,
      this.wrapS = l,
      this.wrapT = o,
      this.generateMipmaps = c,
      this.premultiplyAlpha = p,
      this.unpackAlignment = d,
      this.flipY = u,
      this.anisotropy = Math.min(m, this.gl.renderer.parameters.maxAnisotropy),
      this.level = g,
      this.width = x,
      this.height = v,
      this.texture = this.gl.createTexture(),
      this.store = {
        image: null
      },
      this.glState = this.gl.renderer.state,
      this.state = {},
      this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR,
      this.state.magFilter = this.gl.LINEAR,
      this.state.wrapS = this.gl.REPEAT,
      this.state.wrapT = this.gl.REPEAT,
      this.state.anisotropy = 0
  }
  bind() {
    this.glState.textureUnits[this.glState.activeTextureUnit] !== this.id && (this.gl.bindTexture(this.target, this.texture),
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id)
  }
  update(e=0) {
    const i = !(this.image === this.store.image && !this.needsUpdate);
    if ((i || this.glState.textureUnits[e] !== this.id) && (this.gl.renderer.activeTexture(e),
      this.bind()),
      !!i) {
      if (this.needsUpdate = !1,
      this.flipY !== this.glState.flipY && (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY),
        this.glState.flipY = this.flipY),
      this.premultiplyAlpha !== this.glState.premultiplyAlpha && (this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha),
        this.glState.premultiplyAlpha = this.premultiplyAlpha),
      this.unpackAlignment !== this.glState.unpackAlignment && (this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment),
        this.glState.unpackAlignment = this.unpackAlignment),
      this.minFilter !== this.state.minFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter),
        this.state.minFilter = this.minFilter),
      this.magFilter !== this.state.magFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter),
        this.state.magFilter = this.magFilter),
      this.wrapS !== this.state.wrapS && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS),
        this.state.wrapS = this.wrapS),
      this.wrapT !== this.state.wrapT && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT),
        this.state.wrapT = this.wrapT),
      this.anisotropy && this.anisotropy !== this.state.anisotropy && (this.gl.texParameterf(this.target, this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy),
        this.state.anisotropy = this.anisotropy),
        this.image) {
        if (this.image.width && (this.width = this.image.width,
          this.height = this.image.height),
        this.target === this.gl.TEXTURE_CUBE_MAP)
          for (let s = 0; s < 6; s++)
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + s, this.level, this.internalFormat, this.format, this.type, this.image[s]);
        else if (ArrayBuffer.isView(this.image))
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        else if (this.image.isCompressedTexture)
          for (let s = 0; s < this.image.length; s++)
            this.gl.compressedTexImage2D(this.target, s, this.internalFormat, this.image[s].width, this.image[s].height, 0, this.image[s].data);
        else
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        this.generateMipmaps && (!this.gl.renderer.isWebgl2 && (!_e(this.image.width) || !_e(this.image.height)) ? (this.generateMipmaps = !1,
          this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE,
          this.minFilter = this.gl.LINEAR) : this.gl.generateMipmap(this.target)),
        this.onUpdate && this.onUpdate()
      } else if (this.target === this.gl.TEXTURE_CUBE_MAP)
        for (let s = 0; s < 6; s++)
          this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + s, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, qe);
      else
        this.width ? this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null) : this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, qe);
      this.store.image = this.image
    }
  }
}
class dr extends Array {
  constructor(e=0, i=e, s=e, r=e) {
    return super(e, i, s, r),
      this
  }
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  get z() {
    return this[2]
  }
  get w() {
    return this[3]
  }
  set x(e) {
    this[0] = e
  }
  set y(e) {
    this[1] = e
  }
  set z(e) {
    this[2] = e
  }
  set w(e) {
    this[3] = e
  }
  set(e, i, s, r) {
    return e.length ? this.copy(e) : (pt(this, e, i, s, r),
      this)
  }
  copy(e) {
    return ut(this, e),
      this
  }
  normalize() {
    return mt(this, this),
      this
  }
  multiply(e) {
    return fs(this, this, e),
      this
  }
  dot(e) {
    return gt(this, e)
  }
  fromArray(e, i=0) {
    return this[0] = e[i],
      this[1] = e[i + 1],
      this[2] = e[i + 2],
      this[3] = e[i + 3],
      this
  }
  toArray(e=[], i=0) {
    return e[i] = this[0],
      e[i + 1] = this[1],
      e[i + 2] = this[2],
      e[i + 3] = this[3],
      e
  }
}
class Se extends ft {
  constructor(e, {width: i=1, height: s=1, widthSegments: r=1, heightSegments: n=1, attributes: a={}}={}) {
    const l = r
      , o = n
      , c = (l + 1) * (o + 1)
      , f = l * o * 6
      , h = new Float32Array(c * 3)
      , p = new Float32Array(c * 3)
      , d = new Float32Array(c * 2)
      , u = f > 65536 ? new Uint32Array(f) : new Uint16Array(f);
    Se.buildPlane(h, p, d, u, i, s, 0, l, o),
      Object.assign(a, {
        position: {
          size: 3,
          data: h
        },
        normal: {
          size: 3,
          data: p
        },
        uv: {
          size: 2,
          data: d
        },
        index: {
          data: u
        }
      }),
      super(e, a)
  }
  static buildPlane(e, i, s, r, n, a, l, o, c, f=0, h=1, p=2, d=1, u=-1, m=0, g=0) {
    const x = m
      , v = n / o
      , w = a / c;
    for (let y = 0; y <= c; y++) {
      let M = y * w - a / 2;
      for (let E = 0; E <= o; E++,
        m++) {
        let I = E * v - n / 2;
        if (e[m * 3 + f] = I * d,
          e[m * 3 + h] = M * u,
          e[m * 3 + p] = l / 2,
          i[m * 3 + f] = 0,
          i[m * 3 + h] = 0,
          i[m * 3 + p] = l >= 0 ? 1 : -1,
          s[m * 2] = E / o,
          s[m * 2 + 1] = 1 - y / c,
        y === c || E === o)
          continue;
        let T = x + E + y * (o + 1)
          , P = x + E + (y + 1) * (o + 1)
          , S = x + E + (y + 1) * (o + 1) + 1
          , A = x + E + y * (o + 1) + 1;
        r[g * 6] = T,
          r[g * 6 + 1] = P,
          r[g * 6 + 2] = A,
          r[g * 6 + 3] = P,
          r[g * 6 + 4] = S,
          r[g * 6 + 5] = A,
          g++
      }
    }
  }
}
const hr = "data:image/jpeg;base64,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"
  , fr = .5 * (Math.sqrt(3) - 1)
  , q = (3 - Math.sqrt(3)) / 6
  , $e = t => Math.floor(t) | 0
  , et = new Float64Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);
function ur(t=Math.random) {
  const e = pr(t)
    , i = new Float64Array(e).map(r => et[r % 12 * 2])
    , s = new Float64Array(e).map(r => et[r % 12 * 2 + 1]);
  return function(n, a) {
    let l = 0
      , o = 0
      , c = 0;
    const f = (n + a) * fr
      , h = $e(n + f)
      , p = $e(a + f)
      , d = (h + p) * q
      , u = h - d
      , m = p - d
      , g = n - u
      , x = a - m;
    let v, w;
    g > x ? (v = 1,
      w = 0) : (v = 0,
      w = 1);
    const y = g - v + q
      , M = x - w + q
      , E = g - 1 + 2 * q
      , I = x - 1 + 2 * q
      , T = h & 255
      , P = p & 255;
    let S = .5 - g * g - x * x;
    if (S >= 0) {
      const F = T + e[P]
        , C = i[F]
        , U = s[F];
      S *= S,
        l = S * S * (C * g + U * x)
    }
    let A = .5 - y * y - M * M;
    if (A >= 0) {
      const F = T + v + e[P + w]
        , C = i[F]
        , U = s[F];
      A *= A,
        o = A * A * (C * y + U * M)
    }
    let b = .5 - E * E - I * I;
    if (b >= 0) {
      const F = T + 1 + e[P + 1]
        , C = i[F]
        , U = s[F];
      b *= b,
        c = b * b * (C * E + U * I)
    }
    return 70 * (l + o + c)
  }
}
function pr(t) {
  const i = new Uint8Array(512);
  for (let s = 0; s < 512 / 2; s++)
    i[s] = s;
  for (let s = 0; s < 512 / 2 - 1; s++) {
    const r = s + ~~(t() * (256 - s))
      , n = i[s];
    i[s] = i[r],
      i[r] = n
  }
  for (let s = 256; s < 512; s++)
    i[s] = i[s - 256];
  return i
}
function tt(t) {
  return t * (.5 - Math.random())
}
function ee(t, e) {
  return t + Math.random() * (e - t)
}
const it = ur(Math.random);
function _(t) {
  return Math.max(0, Math.min(1, t))
}
function mr(t, e, i) {
  i = i || 0;
  const s = e
    , r = 2
    , n = 2
    , a = r / s
    , l = a * Math.sqrt(3) / 2
    , o = n / l
    , c = []
    , f = []
    , h = []
    , p = []
    , d = []
    , u = []
    , m = [];
  let g = 0;
  const x = [];
  let v = 0;
  const w = 2;
  for (let M = 0; M < o; M += 1) {
    v = M * l,
      M % 2 === 1 ? g = -a / 2 : g = 0;
    for (let E = 0; E <= s; E += 1) {
      const I = Math.sign(E * a + g - r / 2);
      f.push(E * a + g - r / 2, v - n / 2, 0),
        m.push((E * a + g) / r, v / n),
        f.push(E * a + a / 2 + g - r / 2, l + v - n / 2, 0),
        m.push((E * a + a / 2 + g) / r, (l + v) / n),
        f.push(E * a - a / 2 + g - r / 2, l + v - n / 2, 0),
        m.push((E * a - a / 2 + g) / r, (l + v) / n);
      let T = it(E / o, M / o) + Math.random();
      const P = _(v / n + 2 * T / e);
      let S = Math.random();
      c.push(P, _(P + .1 * i), _(P + .1 * i)),
        u.push(S, S, S);
      const A = [E * a + g - r / 2, v - n / 2, 0];
      h.push(...A, ...A, ...A);
      const b = [w * I * ee(-.3, .3), -2 * ee(-.3, .3) * 1.5, -tt(.5)]
        , F = [w * I * ee(.3, .6), -2 * ee(.3, .6) * 1.5, -tt(.5)];
      p.push(...b, ...b, ...b),
        d.push(...F, ...F, ...F),
        x.push(0, 0, 1, 0, 1, 0, 1, 0, 0),
        f.push(E * a + g - r / 2, v - n / 2, 0),
        m.push((E * a + g) / r, v / n),
        f.push(E * a + a + g - r / 2, v - n / 2, 0),
        m.push((E * a + a + g) / r, v / n),
        f.push(E * a + a / 2 + g - r / 2, l + v - n / 2, 0),
        m.push((E * a + a / 2 + g) / r, (l + v) / n),
        T = it((E + 1) / o, M / o) + Math.random();
      const C = _(v / n + 2 * T / e);
      S = Math.random(),
        c.push(C, C, _(C + .1 * i)),
        u.push(S, S, S);
      const U = [E * a + g - r / 2, v - n / 2, 0];
      p.push(...b, ...b, ...b),
        d.push(...F, ...F, ...F),
        h.push(...U, ...U, ...U),
        x.push(0, 0, 1, 0, 1, 0, 1, 0, 0)
    }
  }
  const y = new ft(t);
  return y.addAttribute("position", {
    size: 3,
    data: new Float32Array(f)
  }),
    y.addAttribute("bary", {
      size: 3,
      data: new Float32Array(x)
    }),
    y.addAttribute("uv", {
      size: 2,
      data: new Float32Array(m)
    }),
    y.addAttribute("offset", {
      size: 1,
      data: new Float32Array(c)
    }),
    y.addAttribute("centroid1", {
      size: 3,
      data: new Float32Array(h)
    }),
    y.addAttribute("control0", {
      size: 3,
      data: new Float32Array(p)
    }),
    y.addAttribute("control1", {
      size: 3,
      data: new Float32Array(d)
    }),
    y.addAttribute("random", {
      size: 1,
      data: new Float32Array(u)
    }),
    y
}
const J = "float PI = 3.141592653589793238;"
  , z = `
precision highp float;

uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
`
  , Te = `
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float offset;
attribute vec3 bary;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float progress;
uniform vec4 resolution;

varying vec2 vUv;
varying float vProgress;
varying float vProgress1;
varying vec3 vBary;
`
  , be = `
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
`
  , gr = {
    uniforms: {
      intensity: {
        value: 1,
        type: "f",
        min: 0,
        max: 3
      }
    },
    fragment: `
  ${z}
  uniform float intensity;
  uniform sampler2D displacement;
  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  const float PI = 3.1415;
  const float angle1 = PI *0.25;
  const float angle2 = -PI *0.75;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);
    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);
    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(t1, t2, progress);
  }
`
  }
  , xr = {
    uniforms: {
      intensity: {
        value: .3,
        type: "f",
        min: 0,
        max: 2
      }
    },
    fragment: `
  ${z}
  uniform float intensity;
  uniform sampler2D displacement;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 d1 = texture2D(texture1, newUV);
    vec4 d2 = texture2D(texture2, newUV);
    float displace1 = (d1.r + d1.g + d1.b)*0.33;
    float displace2 = (d2.r + d2.g + d2.b)*0.33;

    vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
    vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));
    gl_FragColor = mix(t1, t2, progress);
  }
`
  }
  , vr = {
    uniforms: {},
    fragment: `
    ${z}
    const float MIN_AMOUNT = -0.16;
    const float MAX_AMOUNT = 1.5;

    const float PI = 3.141592653589793;

    const float scale = 512.0;
    const float sharpness = 3.0;

    const float cylinderRadius = 1.0 / PI / 2.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {
      float hitPoint = hitAngle / (2.0 * PI);
      point.y = hitPoint;
      return rrotation * point;
    }

    vec4 antiAlias(vec4 color1, vec4 color2, float distanc) {
      distanc *= scale;
      if(distanc < 0.0)
        return color2;
      if(distanc > 2.0)
        return color1;
      float dd = pow(1.0 - distanc / 2.0, sharpness);
      return ((color2 - color1) * dd) + color1;
    }

    float distanceToEdge(vec3 point) {
      float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
      float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
      if(point.x < 0.0)
        dx = -point.x;
      if(point.x > 1.0)
        dx = point.x - 1.0;
      if(point.y < 0.0)
        dy = -point.y;
      if(point.y > 1.0)
        dy = point.y - 1.0;
      if((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0))
        return sqrt(dx * dx + dy * dy);
      return min(dx, dy);
    }

    vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation, float cylinderAngle) {
      float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
      vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
      if(yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {
        return getToColor(p);
      }

      if(yc > 0.0)
        return getFromColor(p);

      vec4 color = getFromColor(point.xy);
      vec4 tcolor = vec4(0.0);

      return antiAlias(color, tcolor, distanceToEdge(point));
    }

    vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation, float cylinderAngle, float amount) {
      float shadow = distanceToEdge(point) * 30.0;
      shadow = (1.0 - shadow) / 3.0;

      if(shadow < 0.0)
        shadow = 0.0;
      else
        shadow *= amount;

      vec4 shadowColor = seeThrough(yc, p, rotation, rrotation, cylinderAngle);
      shadowColor.r -= shadow;
      shadowColor.g -= shadow;
      shadowColor.b -= shadow;

      return shadowColor;
    }

    vec4 backside(float yc, vec3 point) {
      vec4 color = getFromColor(point.xy);
      float gray = (color.r + color.b + color.g) / 15.0;
      gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
      color.rgb = vec3(gray);
      return color;
    }

    vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation, float cylinderAngle, float amount) {
      float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
      shado *= 1.0 - abs(point.x - 0.5);

      yc = (-cylinderRadius - cylinderRadius - yc);

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
      point = hitPoint(hitAngle, yc, point, rrotation);

      if(yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)) {
        shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
      } else {
        shado = 0.0;
      }
      return vec4(getToColor(p).rgb - shado, 1.0);
    }

    void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);

      float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
      float cylinderCenter = amount;
          // 360 degrees * amount
      float cylinderAngle = 2.0 * PI * amount;

      const float angle = 100.0 * PI / 180.0;
      float c = cos(-angle);
      float s = sin(-angle);

      mat3 rotation = mat3(c, s, 0, -s, c, 0, -0.801, 0.8900, 1);
      c = cos(angle);
      s = sin(angle);

      mat3 rrotation = mat3(c, s, 0, -s, c, 0, 0.98500, 0.985, 1);

      vec3 point = rotation * vec3(newUV, 1.0);

      float yc = point.y - cylinderCenter;

      if(yc < -cylinderRadius) {
                        // Behind surface
        gl_FragColor = behindSurface(newUV, yc, point, rrotation, cylinderAngle, amount);
        return;
      }

      if(yc > cylinderRadius) {
                        // Flat surface
        gl_FragColor = getFromColor(newUV);
        return;
      }

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;

      float hitAngleMod = mod(hitAngle, 2.0 * PI);
      if((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI / 2.0 && amount < 0.0)) {
        gl_FragColor = seeThrough(yc, newUV, rotation, rrotation, cylinderAngle);
        return;
      }

      point = hitPoint(hitAngle, yc, point, rrotation);

      if(point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {
        gl_FragColor = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
        return;
      }

      vec4 color = backside(yc, point);

      vec4 otherColor;
      if(yc < 0.0) {
        float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
        otherColor = vec4(0.0, 0.0, 0.0, shado);
      } else {
        otherColor = getFromColor(newUV);
      }

      color = antiAlias(color, otherColor, cylinderRadius - abs(yc));

      vec4 cl = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
      float dist = distanceToEdge(point);

      gl_FragColor = antiAlias(color, cl, dist);
    }
  `
  }
  , wr = {
    uniforms: {},
    fragment: `
    ${z}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.x-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `
  }
  , yr = {
    uniforms: {},
    fragment: `
    ${z}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `
  }
  , Mr = {
    uniforms: {},
    fragment: `
    ${z}
    ivec2 squaresMin = ivec2(50);
    int steps = 20;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float d = min(progress, 1.0 - progress);
      float dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;
      vec2 squareSize = 2.0 * dist / vec2(squaresMin);

      vec2 p = dist>0.0 ? (floor(newUV / squareSize) + 0.5) * squareSize : newUV;

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,p);
      vec4 t2 = texture2D(texture2,p);

      gl_FragColor = mix(t1, t2, progress);
    }
  `
  }
  , Er = {
    uniforms: {},
    detail: 12,
    offsetTop: 0,
    vertex: `
    ${Te}
    attribute vec3 centroid1;

    ${be}

    void main() {
      ${J}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float pr = (progress - 0.5) * (0. + resolution.y / resolution.x) + 0.5;
      pr = progress;
      float prog = clamp((pr - o * 0.9) / 0.1, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((pr - clamp(o - 0.1, 0., 1.) * 0.9) / 0.1, 0., 1.);
      newpos = rotate((newpos - centroid1), vec3(1., 0., 0.), -prog * PI) + centroid1 + vec3(0., -1., 0.) * prog * 0.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,
    fragment: `
    ${z}
    varying float vProgress;
    varying float vProgress1;
    ${J}
    varying vec3 vBary;

    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      gl_FragColor = vec4(t.rgb + .5 * color * vProgress1, opa);
    }
  `
  }
  , Ar = {
    uniforms: {},
    detail: 20,
    offsetTop: .4,
    vertex: `
    ${Te}
    ${be}

    void main() {
      ${J}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.1, -0., 1.) * 0.9) / 0.1, 0., 1.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,
    fragment: `
    ${z}
    varying float vProgress;
    varying float vProgress1;
    ${J}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `
  }
  , Sr = {
    uniforms: {},
    detail: 40,
    offsetTop: 1,
    vertex: `
    ${Te}
    attribute vec3 control0;
    attribute vec3 control1;

    ${be}

    float easeOut(float t){
      return  t * t * t;
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main() {
      ${J}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.2, -0., 1.) * 0.6) / 0.4, 0., 1.);
      newpos = bezier4(newpos, control0, control1, newpos, easeOut(prog));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,
    fragment: `
    ${z}
    varying float vProgress;
    varying float vProgress1;
    ${J}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      opa = smoothstep(0.5, 1., opa);
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `
  }
  , Tr = {
    uniforms: {
      radius: {
        value: .9,
        type: "f",
        min: .1,
        max: 2
      },
      width: {
        value: .35,
        type: "f",
        min: 0,
        max: 1
      }
    },
    fragment: `
    ${z}
    uniform float width;
    uniform float radius;
    uniform sampler2D displacement;
    float parabola( float x, float k ) {
      return pow( 4. * x * ( 1. - x ), k );
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      vec2 start = vec2(0.5,0.5);
      vec2 aspect = resolution.wz;
      vec2 uv = newUV;
      float dt = parabola(progress, 1.);
      vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
      float prog = progress*0.66 + noise.g * 0.04;
      float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
      float intpl = pow(abs(circ), 1.);
      vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
      vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
      gl_FragColor = mix( t1, t2, intpl );
    }
  `
  }
  , br = {
    uniforms: {
      intensity: {
        value: 50,
        type: "f",
        min: 1,
        max: 100
      }
    },
    fragment: `
    ${z}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = PI *0.25;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 uvDivided = fract(newUV*vec2(intensity,1.));

      vec2 uvDisplaced1 = newUV + rotate(angle1)*uvDivided*progress*0.1;
      vec2 uvDisplaced2 = newUV + rotate(angle2)*uvDivided*(1. - progress)*0.1;

      vec4 t1 = texture2D(texture1,uvDisplaced1);
      vec4 t2 = texture2D(texture2,uvDisplaced2);

      gl_FragColor = mix(t1, t2, progress);
    }

  `
  }
  , Cr = {
    uniforms: {
      size: {
        value: .25,
        type: "f",
        min: .1,
        max: 1
      }
    },
    fragment: `
    ${z}
    uniform float size; // = 0.2
    float count = 20.; // = 10.0
    float smoothness = .5; // = 0.5
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float pr = smoothstep(-smoothness, 0.0, newUV.x - progress * (1.0 + smoothness));
      float s = step(pr, fract(count * newUV.x));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, s);

    }
  `
  }
  , Ir = {
    uniforms: {},
    fragment: `
    ${z}
    ivec2 squares = ivec2(10,10);
    vec2 direction = vec2(1.0, -0.5);
    float smoothness = 1.6;

    const vec2 center = vec2(0.5, 0.5);
    void main() {
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 v = normalize(direction);
      v /= abs(v.x)+abs(v.y);
      float d = v.x * center.x + v.y * center.y;
      float offset = smoothness;
      float pr = smoothstep(-offset, 0.0, v.x * newUV.x + v.y * newUV.y - (d-0.5+progress*(1.+offset)));
      vec2 squarep = fract(newUV*vec2(squares));
      vec2 squaremin = vec2(pr/2.0);
      vec2 squaremax = vec2(1.0 - pr/2.0);
      float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,newUV);
      vec4 t2 = texture2D(texture2,newUV);

      gl_FragColor = mix(t1, t2, a);
    }
  `
  }
  , Fr = {
    uniforms: {
      intensity: {
        value: 50,
        type: "f",
        min: 1,
        max: 100
      }
    },
    fragment: `
    ${z}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = -PI *0.75;
    const float noiseSeed = 2.;
    float random() {
      return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    float hash(float n) { return fract(sin(n) * 1e4); }
    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    float hnoise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float hn = hnoise(newUV.xy * resolution.xy / 100.0);
      vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);
      vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
      vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);
      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, progress);
    }
  `
  }
  , Pr = {
    uniforms: {},
    fragment: `
  ${z}
  uniform sampler2D displacement;
  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
    float prog = (1.0 - progress)*0.8 -0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

    vec4 t1 = texture2D( texture2, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
    vec4 t2 = texture2D( texture1, (newUV - 0.5) * intpl + 0.5 );
    gl_FragColor = mix( t1, t2, intpl );
  }
  `
  }
  , Gr = {
    uniforms: {},
    fragment: `
    ${z}
    float size = 0.2;

    float rand (vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float r = rand(vec2(0, newUV.y));
      float m = smoothstep(0.0, -size, newUV.x*(1.0-size) + size*r - ((progress) * (1.0 + size)));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, m);

    }
  `
  }
  , Ur = {
    uniforms: {},
    fragment: `
    ${z}
    const float SQRT_2 = 1.414213562373;
    const vec2 center = vec2(0, 0);// = vec2(0, 0);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      bool nextImage = distance(fract(newUV * dots), vec2(0.5, 0.5)) < ( progress / distance(newUV, center));
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `
  }
  , Rr = {
    uniforms: {},
    fragment: `
    ${z}
    const float SQRT_2 = 1.414213562373;
    // Center should be 0.5, 0.5 for UV space
    const vec2 center = vec2(0.5, 0.5);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      float aspect = resolution.x / resolution.y;
      // Screen-corrected UVs for dot pattern calculation (makes dots appear square on screen)
      vec2 screenUV = (vUv - center) * vec2(aspect, 1.0) + center;

      // Aspect-corrected UVs for texture sampling (using resolution uniform)
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      // Calculate overall distance threshold using original vUv for a circular boundary
      float dist = distance(vUv, center); // center is (0.5, 0.5)

      // Calculate dot pattern distance using screen-corrected UVs for screen-square dots
      float dotPatternDist = distance(fract(screenUV * dots), vec2(0.5, 0.5));

      // Compare dot pattern distance (screen-square dots) with circular threshold boundary
      bool nextImage = dotPatternDist < ( progress / dist );

      // Sample textures using aspect-corrected newUV
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `
  }
  , zr = {
    uniforms: {},
    fragment: `
    ${z}
    const float size = 0.04; // = 0.04
    const float zoom = 100.0; // = 50.0
    const float colorSeparation = 0.3; // = 0.3

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float inv = 1. - progress;
      vec2 disp = size*vec2(cos(zoom*newUV.x), sin(zoom*newUV.y));
      vec4 texTo = getToColor(newUV + inv*disp);
      vec4 texFrom = vec4(
        getFromColor(newUV + progress*disp*(1.0 - colorSeparation)).r,
        getFromColor(newUV + progress*disp).g,
        getFromColor(newUV + progress*disp*(1.0 + colorSeparation)).b,
        1.0);
      gl_FragColor = texTo*progress + texFrom*inv;
    }

  `
  }
  , Q = {
    dots: Ur,
    "dots-circle": Rr,
    flyeye: zr,
    "morph-x": gr,
    "morph-y": xr,
    "page-curl": vr,
    "peel-x": wr,
    "peel-y": yr,
    "polygons-fall": Er,
    "polygons-morph": Ar,
    "polygons-wind": Sr,
    pixelize: Mr,
    ripple: Tr,
    shutters: br,
    slices: Cr,
    squares: Ir,
    stretch: Fr,
    "wave-x": Pr,
    wind: Gr
  }
  , te = `
attribute vec2 uv;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
  , ve = (t, e) => {
    const {shaderPerSlide: i, swiper: s} = e
      , r = s.params.loop ? s.realIndex : s.activeIndex;
    let n = Q;
    if (Array.isArray(t) && t.length) {
      if (i)
        return typeof t[r] > "u" ? Q[t[0]] : Q[t[r]];
      n = {},
        Object.keys(Q).forEach(l => {
            t.includes(l) && (n[l] = Q[l])
          }
        )
    }
    const a = Math.floor(Math.random() * Object.keys(n).length);
    return n[Object.keys(n)[a]]
  }
;
class kr {
  constructor(e) {
    const i = e.shader === "random" || Array.isArray(e.shader) ? ve(e.shader, e) : Q[e.shader];
    this.shader = i,
      this.displacement = e.displacementMap || hr,
      this.scene = new Ae,
      this.swiper = e.swiper,
      this.vertex = i.vertex || te,
      this.fragment = i.fragment,
      this.uniforms = i.uniforms || {},
      this.renderer = new hs({
        dpr: 2,
        webgl: 2,
        alpha: !0
      }),
      this.gl = this.renderer.gl,
      this.width = window.innerWidth,
      this.height = window.innerHeight,
      this.renderer.setSize(this.width, this.height),
      this.gl.clearColor(1, 1, 1, 0),
      this.gl.clear(this.gl.COLOR_BUFFER_BIT),
      this.opts = e,
      this.container = this.swiper.el,
      this.displacementTexture = null,
      this.width = this.swiper.width,
      this.height = this.swiper.height,
    this.swiper.isElement && (this.gl.canvas.setAttribute("slot", "container-start"),
      this.swiper.hostEl.classList.add("swiper-gl")),
      this.container.prepend(this.gl.canvas),
      this.camera = new qs(this.gl,{
        fov: 45
      }),
      this.camera.perspective({
        aspect: this.gl.canvas.width / this.gl.canvas.height
      }),
      this.camera.position.set(0, 0, 2),
      this.time = 0,
      this.current = 0,
      this.init( () => {
          this.addObjects(),
            this.resize(),
            this.render()
        }
      )
  }
  animateUniform(e, i, s) {
    const r = e.value;
    let n = null, a;
    window.cancelAnimationFrame(this.animateUniformFrame);
    const l = i > e.value ? "next" : "prev"
      , o = (f, h) => l === "next" && f >= h || l === "prev" && f <= h
      , c = () => {
        if (this.destroyed)
          return;
        a = new Date().getTime(),
        n === null && (n = a);
        const f = Math.max(Math.min((a - n) / this.swiper.params.speed, 1), 0)
          , h = .5 - Math.cos(f * Math.PI) / 2;
        let p = r + h * (i - r);
        if (o(p, i) && (p = i),
          e.value = p,
          o(p, i)) {
          cancelAnimationFrame(this.animateUniformFrame),
          s && s();
          return
        }
        this.animateUniformFrame = requestAnimationFrame(c)
      }
    ;
    c()
  }
  loadTextures() {
    const e = []
      , i = this;
    return this.images = [],
      this.textures = [],
      (this.swiper && this.swiper.isElement ? this.swiper.hostEl : this.container).querySelectorAll(".swiper-gl-image").forEach(r => {
          this.images.push(r.src)
        }
      ),
      this.images.forEach( (r, n) => {
          const a = new Promise(l => {
              const o = new Image;
              o.crossOrigin = "anonymous";
              const c = new Xe(this.gl);
              o.onload = () => {
                c.image = o,
                  i.textures[n] = c,
                  l()
              }
                ,
                o.src = r
            }
          );
          e.push(a)
        }
      ),
      e.push(new Promise(r => {
          const n = new Image;
          n.crossOrigin = "anonymous";
          const a = new Xe(this.gl);
          n.onload = () => {
            a.image = n,
              i.displacementTexture = a,
              r()
          }
            ,
            n.src = this.displacement
        }
      )),
      Promise.all(e)
  }
  init(e) {
    this.loadTextures().then( () => {
        this.initialized = !0,
        this.onInit && this.onInit(),
          e()
      }
    )
  }
  resize() {
    if (!this.initialized || this.destroyed)
      return;
    const {width: e, height: i} = this.swiper;
    this.width = e,
      this.height = i,
      this.renderer.setSize(e, i);
    const s = this.camera.position.z;
    if (this.camera.perspective({
      aspect: e / i,
      fov: 2 * (180 / Math.PI) * Math.atan(1 / (2 * s))
    }),
      !this.textures[0].image)
      return;
    const r = this.textures[0].image.height / this.textures[0].image.width;
    let n, a;
    i / e > r ? (n = e / i * r,
      a = 1) : (n = 1,
      a = i / e / r),
      this.material.uniforms.resolution.value.x = e,
      this.material.uniforms.resolution.value.y = i,
      this.material.uniforms.resolution.value.z = n,
      this.material.uniforms.resolution.value.w = a,
    this.shader.vertex && this.vertexMaterial && (this.vertexMaterial.uniforms.resolution.value.x = e,
      this.vertexMaterial.uniforms.resolution.value.y = i,
      this.vertexMaterial.uniforms.resolution.value.z = n,
      this.vertexMaterial.uniforms.resolution.value.w = a),
      this.shader.vertex ? (this.nextMesh.scale.set(this.camera.aspect / 2, 1 / 2, 1 / 2),
        this.currentMesh.scale.set(this.camera.aspect / 2, 1 / 2, 1 / 2)) : (this.plane.scale.x = this.camera.aspect,
        this.plane.scale.y = 1)
  }
  createMaterial() {
    return new as(this.gl,{
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      uniforms: {
        time: {
          type: "f",
          value: 0
        },
        progress: {
          type: "f",
          value: 0
        },
        intensity: {
          type: "f",
          value: 0
        },
        width: {
          type: "f",
          value: 0
        },
        radius: {
          type: "f",
          value: 0
        },
        size: {
          type: "f",
          value: 0
        },
        texture1: {
          type: "f",
          value: this.textures[0]
        },
        texture2: {
          type: "f",
          value: this.textures[1]
        },
        displacement: {
          type: "f",
          value: this.displacementTexture
        },
        resolution: {
          type: "v4",
          value: new dr
        }
      },
      vertex: this.shader.vertex || te,
      fragment: this.shader.fragment,
      ...this.shader.vertex ? {
        transparent: !0,
        depthWrite: !1
      } : {}
    })
  }
  addObjects() {
    if (this.scene.children.forEach(e => {
        this.scene.removeChild(e)
      }
    ),
      this.scene.children.forEach(e => {
          this.scene.removeChild(e)
        }
      ),
      this.material = this.createMaterial(),
      this.shader.vertex) {
      const e = mr(this.gl, this.shader.detail, this.shader.offsetTop)
        , i = this.textures[1];
      this.vertexMaterial = this.createMaterial(),
        this.vertexMaterial.uniforms.texture1.value = i,
        this.currentMesh = new xe(this.gl,{
          geometry: e,
          program: this.material
        }),
        this.nextMesh = new xe(this.gl,{
          geometry: e,
          program: this.vertexMaterial
        }),
        this.nextMesh.position.z = -1e-4,
        this.currentMesh.setParent(this.scene),
        this.nextMesh.setParent(this.scene)
    } else {
      const e = new Se(this.gl,{
        width: 1,
        height: 1,
        widthSegments: 2,
        heightSegments: 2
      });
      this.plane = new xe(this.gl,{
        geometry: e,
        program: this.material
      }),
        this.plane.setParent(this.scene)
    }
  }
  replaceShader(e) {
    let i, s;
    this.shader.vertex ? (i = this.material.uniforms.texture1.value,
      s = this.vertexMaterial.uniforms.texture1.value) : (i = this.material.uniforms.texture1.value,
      s = this.material.uniforms.texture2.value);
    const r = e === "random" || Array.isArray(e) ? ve(e, this.opts) : Q[e]
      , {fragment: n, uniforms: a, vertex: l} = r;
    this.shader = r,
      this.vertex = l || te,
      this.fragment = n || "",
      this.uniforms = a || {},
      this.addObjects(),
      this.shader.vertex ? (this.material.uniforms.texture1.value = s,
        this.vertexMaterial.uniforms.texture1.value = s) : (this.material.uniforms.texture1.value = i,
        this.material.uniforms.texture2.value = s,
        this.material.uniforms.progress.value = 1),
      this.resize(),
      this.swiper.params.gl.shader = e
  }
  replaceRandomShader() {
    const e = ve(this.opts.shader, this.opts)
      , {fragment: i, uniforms: s, vertex: r} = e;
    this.shader = e,
      this.fragment = i || "",
      this.uniforms = s || {},
      this.vertex = r || te,
      this.addObjects(),
      this.resize()
  }
  setProgress(e, i, s, r, n) {
    if (this.destroyed || this.swiper.glDestroyed)
      return;
    if (!this.initialized) {
      this.onInit = () => {
        requestAnimationFrame( () => {
            this.setProgress(e, i, s, r)
          }
        )
      }
      ;
      return
    }
    this.swiper.params.loop && this.swiper.slides[e] && this.swiper.slides[i] && (e = parseInt(this.swiper.slides[e].getAttribute("data-swiper-slide-index"), 10),
      i = parseInt(this.swiper.slides[i].getAttribute("data-swiper-slide-index"), 10));
    const a = this.textures[i]
      , l = this.textures[e];
    if (this.material.uniforms.texture1.value = l,
      this.shader.vertex ? this.vertexMaterial.uniforms.texture1.value = a : this.material.uniforms.texture2.value = a,
      n) {
      if (this.preventShaderReplace) {
        this.material.uniforms.progress.value = Math.abs(s);
        return
      }
      this.preventShaderReplace = !0,
        requestAnimationFrame( () => {
            this.preventShaderReplace = !1
          }
        ),
        this.swiper.params.gl.shader === "random" || Array.isArray(this.swiper.params.gl.shader) ? (this.replaceRandomShader(),
          this.material.uniforms.texture1.value = l,
          this.material.uniforms.texture2.value = a,
          this.material.uniforms.progress.value = Math.abs(s)) : this.material.uniforms.progress.value = Math.abs(s)
    } else
      r ? (s === 0 && this.material.uniforms.progress.value === 0 && (this.material.uniforms.progress.value = 1),
      s === 1 && this.material.uniforms.progress.value === 1 && (this.material.uniforms.progress.value = 0),
        this.animateUniform(this.material.uniforms.progress, s, () => {
            (this.swiper.params.gl.shader === "random" || Array.isArray(this.swiper.params.gl.shader)) && (this.replaceRandomShader(),
              this.material.uniforms.texture1.value = l,
              this.material.uniforms.texture2.value = a,
              this.material.uniforms.progress.value = s),
            s === 1 && (this.material.uniforms.texture1.value = a),
              this.material.uniforms.progress.value = 0
          }
        )) : this.material.uniforms.progress.value = Math.abs(s)
  }
  render() {
    this.swiper.destroyed || this.destroyed || (this.time += .05,
      this.material.uniforms.time.value = this.time,
      Object.keys(this.uniforms).forEach(e => {
          this.material.uniforms[e].value = this.uniforms[e].value
        }
      ),
      requestAnimationFrame(this.render.bind(this)),
      this.renderer.render({
        scene: this.scene,
        camera: this.camera
      }))
  }
  destroy() {
    this.initialized = !1,
      this.destroyed = !0,
    this.gl && this.gl.canvas && this.container.removeChild(this.gl.canvas)
  }
}
typeof window < "u" && window.SwiperElementRegisterParams && window.SwiperElementRegisterParams(["gl"]);
function Or({swiper: t, on: e, extendParams: i}) {
  t.gl = null;
  let s = !1;
  function r() {
    try {
      const o = document.createElement("canvas");
      return !!window.WebGLRenderingContext && (o.getContext("webgl") || o.getContext("experimental-webgl"))
    } catch {
      return !1
    }
  }
  i({
    gl: {
      shader: "random",
      shaderPerSlide: !1,
      displacementMap: void 0
    }
  });
  const n = () => {
      t.gl = new kr({
        swiper: t,
        shader: t.params.gl.shader,
        shaderPerSlide: t.params.gl.shaderPerSlide,
        displacementMap: t.params.gl.displacementMap
      })
    }
  ;
  let a, l;
  e("beforeInit", () => {
      if (t.params.effect !== "gl")
        return;
      if (!r()) {
        s = !0;
        return
      }
      t.classNames.push(`${t.params.containerModifierClass}gl`);
      const o = {
        watchSlidesProgress: !0
      };
      Object.assign(t.params, o),
        Object.assign(t.originalParams, o)
    }
  ),
    e("init", () => {
        t.params.effect !== "gl" || s || t.glDestroyed || t.gl || n()
      }
    ),
    e("resize", () => {
        t.params.effect !== "gl" || s || t.glDestroyed || t.gl.resize()
      }
    ),
    e("setTranslate", () => {
        if (t.params.effect !== "gl" || s || t.glDestroyed)
          return;
        t.gl || n();
        let o, c, f, h = !1, p;
        if (t.slides.forEach( (m, g) => {
            const x = m.progress;
            t.params.cssMode && Math.round(x * 100) === 0 && (h = !0),
            (x > 0 && x < 1 || x === 0 && t.progress < l) && (o = g,
              c = g + 1,
              f = x,
              p = o),
            (x < 0 && x > -1 || x === 0 && t.progress > l) && (o = g - 1,
              c = g,
              f = 1 + x,
              p = c)
          }
        ),
          l = t.progress || 0,
        typeof o > "u" && typeof c > "u")
          return;
        h = h && Math.round(f) === f;
        const d = Math.min(p, t.activeIndex)
          , u = Math.max(p, t.activeIndex);
        !t.params.loop && u !== d && (o = d,
          c = u),
          t.gl.setProgress(o, c, f, a, h)
      }
    ),
    e("setTransition", (o, c) => {
        t.params.effect !== "gl" || s || t.glDestroyed || (a = c > 0 && !t.params.cssMode)
      }
    ),
    e("slidesGridLengthChange", () => {
        t.params.effect !== "gl" || s || !t.initialized || t.glDestroyed || t.gl && t.gl.loadTextures && t.gl.loadTextures()
      }
    ),
    e("beforeDestroy", () => {
        t.params.effect !== "gl" || s || t.gl && (t.glDestroyed = !0,
          t.gl.destroy(),
          t.gl = null)
      }
    )
}


const imageSlider = new B(".imageSlider",{
    modules: [Ni, Or],
    speed: 1e3,
    effect: "gl",
    loop: !0,
    gl: {
      shader: "morph-x"
    }
});

const textSlider = new B(".textSlider",{
  modules: [Ni, Or],
  speed: 1e3,
  effect: "fade",
  loop: !0,
});

imageSlider.controller.control = textSlider;
textSlider.controller.control = imageSlider;
