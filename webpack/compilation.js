const path = require('path');
const fs = require('fs');
const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const baseDir = toUnixPath(process.cwd());

function toUnixPath (filePath) {
  return filePath.replace(/\\/g, '/');
}

class Compilation {
  constructor(options) {
    this.options = options;

    // 当前编译依赖的文件
    this.fileDependencies = [];

    // 用来存放本次编译的所有模块
    this.modules = [];

    // 里面放置所有代码块
    this.chunks = [];

    this.assets = {};
  }

  build (onCompiled) {
    // 5. 根据配置 entry 中找到入口文件
    let entry = {};
    const _this = this;

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

      // 6.从入口文件出发，调用所有配置的 loader 对模块进行解析
      const entryModule = this.buildModule(entryName, entryPath);

      // 8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk
      const chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter(mod => mod.names.includes(entryName))
      }

      this.chunks.push(chunk);

      // 9. 把每个 chunk 转换成一个单独的文件加入到输出列表中
      this.chunks.forEach(chunk => {
        const filename = _this.options.output.filename.replace('[name]', chunk.name);
        _this.assets[filename] = getSource(chunk)
      })
    }

    onCompiled(null, {
      modules: this.modules,
      chunks: this.chunks,
      assets: this.assets
    }, this.fileDependencies);
  }

  /**
   * 编译模块
   * @param name 
   * @param modulePath 
   */
  buildModule (name, modulePath) {
    // 6.从入口文件出发，调用所有配置的 loader 对模块进行解析
    // 6.1 读取源代码
    let sourceCode = fs.readFileSync(modulePath, 'utf8');

    // 6.2 调用取loader
    const { rules } = this.options.module;
    const _this = this;
    const loaders = [];
    rules.forEach(rule => {
      if (modulePath.match(rule.test)) {
        loaders.push(...rule.use);
      }
    });
    sourceCode = loaders.reduceRight((code, loader) => {
      return require(loader)(code);
    }, sourceCode);

    const moduleId = './' + path.relative(baseDir, modulePath);

    /**
     * 创建一个模块对象，
     * moduleId 是相对于项目根目录相对路径；
     * dependencies 表示此模块依赖的路径；
     * names 表示被几个依赖，多次依赖，只需加载一次；
     */
    const module = {
      id: moduleId,
      dependencies: [],
      names: [name]
    }

    // 7. 再找出该模块依赖的模块，再递归被模块（buildModule）;
    let ast = parser.parse(sourceCode, { sourceType: 'module' });

    traverse(ast, {
      CallExpression ({ node }) {
        if (node.callee.name === 'require') {
          // console.log('11111', JSON.stringify(node, null, 4));
          const depModuleName = node.arguments[0].value;
          const dirname = path.dirname(modulePath);
          // 拿到扩展名
          const extensions = _this.options.resolve.extensions;

          let depModulePath = path.join(dirname, depModuleName);
          // 获取依赖模块的绝对路径
          depModulePath = tryExtensions(depModulePath, extensions)
          _this.fileDependencies.push(depModulePath);

          // 获取模块ID，相对根目录绝对路径
          let depModuleId = './' + path.relative(baseDir, depModulePath);

          // 修改 ast 语法树，把 require 
          node.arguments = [types.stringLiteral(depModuleId)];

          module.dependencies.push({
            depModuleId,
            depModulePath
          })
        }
      }
    });

    const { code } = generator(ast);
    module._source = code;

    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      const buildModule = _this.modules.find(mod => mod.id === depModuleId);
      if (buildModule) {
        buildModule.names.push(name);
      } else {
        const depModule = _this.buildModule(name, depModulePath);
        _this.modules.push(depModule);
      }
    });

    return module;
  }
}

// 给当前路径尝试添加扩展名
function tryExtensions (modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath
  }
  for (let i = 0; i < extensions.length; i++) {
    const filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  throw new Error(`找不到${modulePath}`)
}

function getSource (chunk) {
  return `
    (() => {
      var modules = {
        ${chunk.modules.map((module) => `
          "${module.id}": (module) => {
            ${module._source}
          }
        `)}
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
      ${chunk.entryModule._source};
    })()
  `;
}

module.exports = Compilation;