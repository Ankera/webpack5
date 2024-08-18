const core = require('@babel/core');
const types = require('@babel/types');
const arrowFunctionPlugin = require('babel-plugin-transform-es2015-arrow-functions');

const arrowFunctionPlugin2 = {
  visitor: {
    ArrowFunctionExpression: function (path) {
      let node = path.node;
      node.type = 'FunctionExpression';
    }
  }
}

const sourceCode = `
  const sum = (a,b) => {
    console.log('sum')
    return a + b;
  };
`

const targetCode = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin2]
})

console.log(targetCode.code)