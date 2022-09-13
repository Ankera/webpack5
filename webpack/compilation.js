const path = require('path');
const baseDir = toUnixPath(process.cwd());

function toUnixPath (filePath) {
  return filePath.replace(/\\/g, '/');
}

class Compilation {
  constructor(options) {
    this.options = options;
    this.fileDependencies = [];
  }

  build (onCompiled) {
    // 5. 根据配置 entry 中找到入口文件
    let entry = {};

    // 兼容 entry 字符串 
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }

    for (const entryName in entry) {
      // 获取到了所有入口文件的绝对路径
      let entryPath = path.join(baseDir, entry[entryName]);
      this.fileDependencies.push(entryPath);
    }

    onCompiled(null, {}, this.fileDependencies);
  }
}

module.exports = Compilation;