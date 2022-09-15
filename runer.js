/***
 * loader 执行过程
 * loader 转换规则
 */
const path = require('path');
const fs = require('fs');
const { runLoaders } = require('loader-runner');

const entryFile = path.resolve(__dirname, 'src', 'titleLoader.js');

const rules = [
  {
    test: /\.js$/,
    // enforce: 'normal', // 默认
    use: ['normal1-loader.js', 'normal2-loader.js']
  },
  {
    test: /\.js$/,
    enforce: 'post', // 后置
    use: ['post1-loader.js', 'post2-loader.js']
  },
  {
    test: /\.js$/,
    enforce: 'pre', // 前置
    use: ['pre1-loader.js', 'pre2-loader.js']
  },
];

const request = `inline1-loader!inline2-loader!${entryFile}`;

const parts = request.split('!');

const resource = parts.pop();

const resolveLoader = loader => path.resolve(__dirname, 'loaders', loader);

const inlineLoaders = parts;
const prelLoaders = [];
const normalLoaders = [];
const postLoaders = [];

rules.forEach(rule => {
  if (rule.test.test(entryFile)) {
    if (rule.enforce === 'pre') {
      prelLoaders.push(...rule.use);
    } else if (rule.enforce === 'post') {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
});

let loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...prelLoaders];

loaders = loaders.map(loader => resolveLoader(loader));

runLoaders({
  resource,
  loaders,
  context: { name: "loader" },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(result.resourceBuffer.toString('utf-8'));
})

console.log(loaders)