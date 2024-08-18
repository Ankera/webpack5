const css = require("css");

const pxRegExp = /\b(\d+(\.\d+)?)px\b/;

class Px2vw {
  constructor(config) {
    this.config = config;
  }

  _getCalcValue(type, value) {
    let { remUnit, remPrecision } = this.config;
    return value.replace(pxRegExp, (_, $1) => {
      const val = (parseFloat($1) / 7.5).toFixed(remPrecision);
      return val + type;
    });
  }

  generateRem(cssText) {
    const self = this;

    function processRules(rules) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const declarations = rule.declarations;
        for (let j = 0; j < declarations.length; j++) {
          const declaration = declarations[j];
          if (
            declaration.type === "declaration" &&
            pxRegExp.test(declaration.value)
          ) {
            declaration.value = self._getCalcValue("vw", declaration.value);
          }
        }
      }
    }

    const astObj = css.parse(cssText);

    processRules(astObj.stylesheet.rules);

    return css.stringify(astObj);
  }
}

function loader(source) {
  const options = this.getOptions();

  if (options.exclude && options.exclude.test(this.resource)) {
    return source;
  }

  const px2rem = new Px2vw(options);
  const targetSource = px2rem.generateRem(source);
  return targetSource;
}

module.exports = loader;
