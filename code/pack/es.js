/**
 * ES 加载 ES
 */

(function () {
  var modules = {
    "./src/title.js": function (module, exports, require) {
      require.r(exports);
      require.d(exports, {
        default: () => DEFAULT_EXPORT,
        age: () => age
      });

      // exports.default = 'title';
      var DEFAULT_EXPORT = 'title';
      var age = 18;
    }
  }

  var cache = {};

  function require (moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId]
    }

    var module = cache[moduleId] = {
      exports: {}
    };

    modules[moduleId](module, module.exports, require);

    return module.exports;
  }

  require.d = function (exports, definition) {
    for (const key in definition) {
      Object.defineProperty(exports, key, {
        get: definition[key],
      })
    }
  }

  require.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  require.r = function (exports) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module',
    });

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  }

  var exports = {};
  require.r(exports)
  const title = require("./src/title.js");
  console.log(title.default);
})();