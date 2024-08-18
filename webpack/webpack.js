const Compiler = require('./compiler');

function webpack (options) {
  // 1. 初始化参数，从配置文件 和 shell 脚本中读取并合并参数，得出最终的配置对象
  const argv = process.argv.slice(2);
  const shellOptions = argv.reduce((shellOptions, option) => {
    let [key, value] = option.split('=');
    shellOptions[key.slice(2)] = value
    return shellOptions;
  }, {});
  const finalOptions = {
    ...options,
    ...shellOptions
  };

  // 2. 用上一步得到的参数初始化 compiler 对象
  const compiler = new Compiler(finalOptions);

  // 3. 加载所有的插件
  finalOptions.plugins.forEach((plugin) => {
    plugin.apply(compiler)
  });

  console.log('=====准备工作结束======')

  // 4. 执行对象的 run 方法开始编译
  // compiler 文件

  return compiler;
}

module.exports = webpack;