class DonePlugin {
  apply (compiler) {
    console.log('==done plugin===')
    compiler.hooks.done.tap('donePlugin', () => {
      console.log('插件结束编译')
    })
  }
}

module.exports = DonePlugin;