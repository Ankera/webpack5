Promise.resolve().then(() => {
  console.log('then - 1');
  Promise.resolve().then(() => {
    console.log('then1 - 1');
    return Promise.resolve();
  }).then(() => {
    console.log('then1 - 2');
  })
}).then(() => {
  console.log('then2');
}).then(() => {
  console.log('then3');
}).then(() => {
  console.log('then4');
})

/**
 * then - 1
 * then1 - 1
 * then2
 * then1 - 2
 * then3
 * then4
 */
// Promise.resolve().then(() => {
//   Promise.resolve().then(() => {
//     return 111;
//   })
// }).then((d) => {
//   console.log('d ', d)
// }, (e) => {
//   console.log('e ', e)
// })

// Promise.resolve = function (data) {
//   return new Promise((resolve, reject) => {
//     resolve(data)
//   })
// }