const cores = require('@babel/core');
const types = require('@babel/types');

/**
 * babel 插件 是固定的
 */
module.exports = function () {
  return {
    visitor: {
      CallExpression: function (path, state) {
        if (types.isMemberExpression(path.node.callee)) {
          if (path.node.callee.object.name === 'console') {
            if (['log', 'warn', 'error', 'info', 'debug'].includes(path.node.callee.property.name)) {
              const { line, column } = path.node.loc.start;
              path.node.arguments.unshift(types.stringLiteral(`${line}:${column}`));
            }
          }
        }
      }
    }
  }
}