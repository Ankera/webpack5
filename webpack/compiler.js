const { SyncHook } = require('tapable');
const Compilation = require('./compilation');

/**
 * 代表整个编译对象，负责整个编译的过程，里面会保存所有的编译对象
 * 全局唯一
 */
class Compiler {
  constructor(options) {
    this.options = options;

    this.hooks = {
      // 开始编译时触发
      run: new SyncHook(),
      // 编译结束时触发
      done: new SyncHook(),
    };
  }

  // 4. 执行对象的 run 方法开始编译
  run (callback) {
    this.hooks.run.call();

    function onCompiled (err, stats, fileDependencies) {
      console.log('onCompiled', err, stats, fileDependencies)
    }
    this.compile(onCompiled);

    this.hooks.done.call();

    // callback();
  }

  compile (onCompiled) {
    // 以后每次开启一次新的编译，都会创建一个新的 Compilation 类的实例 
    const compilation = new Compilation(this.options);
    compilation.build(onCompiled);
  }
}

module.exports = Compiler;