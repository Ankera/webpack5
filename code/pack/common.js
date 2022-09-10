/**
 * COMMONJS 加载 COMMONJS
 */
(() => {
  const modules = {
    /**
     * 
     * @param {*} module 当前模块
     * @param {*} exports 当前模块导出对象
     * @param {*} require 
     */
    './src/title.js': function (module, exports, require) {
      module.exports = 'title';
    }
  }

  var module_cache__ = {};
  function require (moduleId) {
    if (module_cache__[moduleId]) {
      return module_cache__[moduleId].exports;
    }
    var module = module_cache__[moduleId] = {
      exports: {},
    };

    modules[moduleId](module, module.exports, require);
    return module.exports;
  }

  !function () {
    const title = require("./src/title.js");
    console.log(title);
  }();
})();