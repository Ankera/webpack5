class RunPlugin {
  apply (compiler) {
    console.log('==run plugin===')
    compiler.hooks.done.tap('runPlugin', () => {
      console.log('插件开始编译')
    })
  }
}

module.exports = RunPlugin;