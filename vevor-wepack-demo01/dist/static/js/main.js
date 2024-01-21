!(function () {
  var t = {
      29: function (t, r, e) {
        var n = e(546);
        console.log("====ar====", n([]));
      },
      546: function (t) {
        var r = {}.toString;
        t.exports =
          Array.isArray ||
          function (t) {
            return "[object Array]" == r.call(t);
          };
      },
      478: function (t, r, e) {
        "use strict";
        var n = e(533);
        (r.createRoot = n.createRoot), (r.hydrateRoot = n.hydrateRoot);
      },
      533: function (t) {
        "use strict";
        t.exports = ReactDOM;
      },
    },
    r = {};
  function e(n) {
    var o = r[n];
    if (void 0 !== o) return o.exports;
    var c = (r[n] = { exports: {} });
    return t[n](c, c.exports, e), c.exports;
  }
  (e.n = function (t) {
    var r =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return e.d(r, { a: r }), r;
  }),
    (e.d = function (t, r) {
      for (var n in r)
        e.o(r, n) &&
          !e.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: r[n] });
    }),
    (e.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (function () {
      "use strict";
      var t = React,
        r = e.n(t),
        n = e(478),
        o = e(29),
        c = e.n(o);
      n.createRoot(document.getElementById("root")).render(
        r().createElement(
          r().StrictMode,
          null,
          r().createElement(c(), null),
          ","
        )
      );
    })();
})();
