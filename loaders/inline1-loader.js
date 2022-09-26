function loader (source) {
  console.log('====inline1====');
  return source + '//inline1';
}

// loader.pitch = function () {

// }

// loader.row = false;

module.exports = loader;