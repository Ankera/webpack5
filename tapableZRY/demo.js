const { SyncHook, SyncLoopHook } = require('tapable');

const s = new SyncLoopHook(['name', 'age']);

// s.tap(('v1'), (a, b, c) => {
//   console.log('v1', a, b, c)
// })

// s.tap(('v2'), (a, b, c) => {
//   console.log('v2', a, b, c)
// })

// s.call('Tom', 12, 12);
let a1 = 0;
let a2 = 0;
let a3 = 0;

s.tap('1', () => {
  console.log('a1', a1)
  if (++a1 === 1) {
    a1 = 0;
    return undefined;
  }
  return true;
})


s.tap('2', () => {
  console.log('a2', a2)
  if (++a2 === 2) {
    a2 = 0;
    return undefined;
  }
  return true;
})

s.tap('3', () => {
  console.log('a3', a3)
  if (++a3 === 3) {
    a3 = 0;
    return undefined;
  }
  return true;
})

s.call()