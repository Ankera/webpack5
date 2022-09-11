(function () {
  var __webpack_modules__ = {
    "./src/title.js": function (module) {
      module.exports = {
        title: 'title',
        age: 18
      };
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
  !function () {
    __webpack_require__.n = function (module) {
      var getter = module && module.__esModule ? function () {
        return module['default'];
      } : function () {
        return module;
      };
      __webpack_require__.d(getter, {
        a: getter
      });
      return getter;
    };
  }();
  !function () {
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
  }();
  !function () {
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }();
  !function () {
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
      }
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
    };
  }();
  var __webpack_exports__ = {};
  !function () {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");
    var _title__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_title__WEBPACK_IMPORTED_MODULE_0__);
    console.log(_title__WEBPACK_IMPORTED_MODULE_0___default());
  }();
})();