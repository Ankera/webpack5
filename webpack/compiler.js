const fs = require('fs');
const path = require('path').posix;
const { stat } = require('fs/promises');
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
    const _this = this;

    function onCompiled (err, stats, fileDependencies) {
      // 10. 在确定好输出内容后，根据配置输出的路径和文件名，把文件内容写入到文件系统
      for (const filename in stats.assets) {
        const filePath = path.join(_this.options.output.path, filename);
        fs.mkdir(_this.options.output.path, { recursive: true }, function () {
          fs.writeFileSync(filePath, stats.assets[filename], 'utf8');
        })
      }
      callback(null, {
        toJson: () => stats
      });

      fileDependencies.forEach(fileDependency => {
        fs.watch(fileDependency, () => {
          _this.compile(onCompiled);
        })
      })
    }

    this.compile(onCompiled);

    this.hooks.done.call();
  }

  compile (onCompiled) {
    // 以后每次开启一次新的编译，都会创建一个新的 Compilation 类的实例 
    const compilation = new Compilation(this.options);
    compilation.build(onCompiled);
  }
}

module.exports = Compiler;