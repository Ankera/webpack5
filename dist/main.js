(function () {
  var __webpack_modules__ = {
    "./src/title.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        "age": function () {
          return age;
        }
      });
      __webpack_exports__["default"] = 'title';
      const age = 18;
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__ (moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key]
        });
      }
    }
  };
  __webpack_require__.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
  __webpack_require__.r = function (exports) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module'
    });
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  };
  var __webpack_exports__ = {};
  !function () {
    const title = __webpack_require__("./src/title.js");
    console.log(title);
  }();
})();