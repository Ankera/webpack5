function loader (source) {
  console.log('====post1====');
  return source + '//post1';
}

loader.pitch = function (source) {
  console.log('==== post1 pitch', source.split('!'));
}

module.exports = loader;