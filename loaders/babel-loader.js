const babel = require('@babel/core');

function loader (source) {
  const options = this.getOptions();
  const { code } = babel.transform(source, options);

  return code;
}

module.exports = loader;