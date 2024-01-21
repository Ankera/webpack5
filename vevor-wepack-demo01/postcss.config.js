/**
 * https://blog.csdn.net/qq_38290251/article/details/126720607
 */

module.exports = {
  plugins: [
    // TODO 是否移除 postcss-import
    // [
    //   'postcss-import', {
    //     resolve: (id, basedir) => {
    //       console.log('===========id', id)
    //       // 如果导入的是 'common/css/variable.less'，则返回一个虚拟的空样式
    //       if (id === 'common/css/variable.less') {
    //         return { contents: '' };
    //       }
    //       return path.resolve(basedir, id);
    //     },
    //   }
    // ],
    /**
     * 
      postcss-preset-env：
        处理最新的 CSS 语法和规范，允许你使用未来版本的 CSS 特性。
        可以按需引入相关的 Polyfill，以确保在目标浏览器中正确运行。
        可以配置目标浏览器，生成相应的兼容性代码。

      autoprefixer：
        自动为 CSS 规则添加适当的前缀，以确保在不同浏览器中的兼容性。
        根据 Can I Use 数据，为目标浏览器版本添加前缀。

      这样配置的好处是，postcss-preset-env 会在 autoprefixer 之前处理 CSS，
      将新的语法转换为当前浏览器支持的代码，然后 autoprefixer 会为其添加前缀，
      确保在目标浏览器中正确运行。
     */
    'postcss-preset-env',
    // 不同平台兼容性
    'autoprefixer',

    // 给css变量
    ['postcss-custom-properties', {
      // 配置选项...
      preserve: false, // 将变量替换为实际的值
    }],
  ]
}
