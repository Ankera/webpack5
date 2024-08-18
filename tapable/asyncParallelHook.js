class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }

  tapAsync (name, task) {
    this.tasks.push(task);
  }

  tapPromise (name, task) {
    this.tasks.push(task);
  }

  callAsync (...args) {
    const finalCallback = args.pop();
    const _this = this;
    let index = 0;

    function done () {
      index++;
      if (index === _this.tasks.length) {
        finalCallback();
      }
    }

    this.tasks.forEach(task => {
      task(...args, done)
    })
  }

  promise (...args) {

    const tasks = this.tasks.map(task => {
      return task(...args);
    })

    console.log('tasks', tasks);

    return Promise.all(tasks);
  }
}

const hook = new AsyncParallelHook();

hook.tapAsync('name1', (name, cb) => {
  setTimeout(() => {
    console.log('name1', name);
    cb();
  }, 1000);
});

hook.tapAsync('name2', (name, cb) => {
  setTimeout(() => {
    console.log('name2', name);
    cb();
  }, 2000);
});

hook.tapAsync('name3', (name, cb) => {
  setTimeout(() => {
    console.log('name3', name);
    cb();
  }, 3000);
});

// hook.callAsync("Tom", () => {
//   console.log('success');
// });

// =================================================================

const hookP = new AsyncParallelHook();

hookP.tapPromise('promise1', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise1', name);
      resolve();
    }, 1000);
  })
});

hookP.tapPromise('promise2', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise2', name);
      resolve();
    }, 2000);
  })
});

hookP.promise('end-Tom').then(() => {
  console.log('end-sucessful');
})