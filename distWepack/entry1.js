
    (() => {
      var modules = {
        
          "./src/entryTitle.js": (module) => {
            //打印日志 log1 
//打印日志 log2 
module.exports = 'entryTitle';
          }
        
      }

      var cache = {};
      function require (moduleId) {
        var cacheModule = cache[moduleId];
        if(cacheModule !== undefined){
          return cacheModule.exports;
        }

        var module = cache[moduleId] = {
          exports: {}
        };

        modules[moduleId](module, module.exports, require);

        return module.exports;
      }
      var exports = {};
      //打印日志 log1 
//打印日志 log2 
let title = require("./src/entryTitle.js");

console.log('entry1111', title);;
    })()
  