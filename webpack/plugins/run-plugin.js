class RunPlugin {
  apply (compiler) {
    console.log('==run plugin===')
    compiler.hooks.done.tap('runPlugin', () => {
      console.log('插件开始编译')
    })

    compiler.watch({}, (aa) => {
      console.log('监听到文件变化====', aa)
    })
  }
}

module.exports = RunPlugin;