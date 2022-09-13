const { AsyncParallelHook } = require('tapable');

class Lesson1 {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('name1', name);
        cb();
      }, 1000)
    });

    this.hooks.arch.tapAsync('webpack', (name, cb) => {
      setTimeout(() => {
        console.log('name2', name);
        cb();
      }, 2000)
    });

    this.hooks.arch.tapAsync('webpack', (name, cb) => {
      setTimeout(() => {
        console.log('name3', name);
        cb();
      }, 3000)
    });
  }

  start () {
    this.hooks.arch.callAsync('Tom', () => {
      console.log('end')
    })
  }
}

class Lesson2 {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tapPromise('node', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('name1', name);
          resolve();
        }, 1000)
      })
    });

    this.hooks.arch.tapPromise('webpack', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('name2', name);
          resolve();
        }, 2000)
      })
    });

    this.hooks.arch.tapPromise('webpack', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('name3', name);
          resolve();
        }, 3000)
      })
    });

    this.hooks.arch.tapAsync('webpack', (name, cb) => {
      setTimeout(() => {
        console.log('name4', name);
        cb();
      }, 4000)
    });
  }

  start () {
    this.hooks.arch.promise('Tom').then(() => {
      console.log('end')
    })
  }
}

const hooks = new Lesson1();
hooks.tap();
hooks.start();