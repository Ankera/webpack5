const fs = require('fs').promises;
const path = require('path');
// const co = require('co');

function co (gen) {
  const it = gen();
  return new Promise((resolve, reject) => {
    function step (data) {
      const { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then((d) => {
          step(d);
        }, reject);
      } else {
        resolve(value)
      }
    }

    step(undefined);
  })
}

/**
 * name.txt 内容 age.txt
 * age.txt  内容 18
 */

function* read () {
  const name = yield fs.readFile(path.resolve(__dirname, 'demo.txt'), 'utf8');
  const age = yield fs.readFile(path.resolve(__dirname, name), 'utf8');

  return age;
}

co(read).then(d => {
  // d 18
  console.log('d ', d)
}, e => {
  console.log('e ', e)
})
