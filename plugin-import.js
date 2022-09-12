const cores = require('@babel/core');
const types = require('@babel/types');

/**
 * babel 插件 是固定的
 */
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration (path, state) {
        const { node } = path;
        const { specifiers } = node;
        const { libraryName, libraryDirectory = 'lib' } = state.opts;
        if (node.source.value === libraryName &&
          !types.isImportDefaultSpecifier(specifiers[0])) {
          const declarations = specifiers.map(specifier => {
            return types.importDeclaration(
              [types.importDefaultSpecifier(specifier.local)],
              types.stringLiteral(libraryDirectory ? `${libraryName}/${libraryDirectory}/${specifier.imported.name}` : `${libraryName}/${specifier.imported.name}`)
            )
          });

          // 替换当前节点
          path.replaceWithMultiple(declarations);
        }
      }
    }
  }
}