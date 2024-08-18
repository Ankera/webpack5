/**
 * webpack 工作流程 2022-09-25 03:00
 * @author zimu
 */

const fs = require('fs');

function runLoaders (options, finalCallback) {
  const {
    resource,
    loaders = [],
    context = {},
    readResource = fs.readFile
  } = options;

  const loaderObjects = loaders.map(createLoaderObject);

  const loaderContext = context;

  loaderContext.resource = resource;
  loaderContext.readResource = readResource;
  loaderContext.loaders = loaderObjects;
  loaderContext.loaderIndex = 0;

  Object.defineProperty(loaderContext, 'request', {
    get () {
      return loaderContext.loaders.map(loader => loader.path).concat(loaderContext.resource).join('!')
    }
  })

  // 剩下的 loader
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get () {
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(loaderContext.resource).join('!')
    }
  })

  // 从当前开始剩下的 loader
  Object.defineProperty(loaderContext, 'currentRequest', {
    get () {
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
    }
  })

  // 之前的loader
  Object.defineProperty(loaderContext, 'previousRequest', {
    get () {
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).concat(loaderContext.resource).join('!')
    }
  })

  const processOptions = {
    resourceBuffer: null,
    readResource,
  };

  iteratePitchingLoaders();
}

/**
 * 创建loader对象
 * @param {*} loader 
 */
function createLoaderObject (loader) {
  const normal = require(loader);
  const pitch = normal.pitch;
  /**
   * 是否需要原生的 buffer 数据
   * 
   */
  const row = normal.row || false;
  return {
    path: loader,
    normal,
    pitch,
    // true 转 buffer， false 是字符串
    row,
    // 表示当前 pitch 函数已经执行过
    pitchExecuted: false,
    // 表示当前 normal 函数已经执行过
    normalExecuted: false,
  }
}

exports.runLoaders = runLoaders;