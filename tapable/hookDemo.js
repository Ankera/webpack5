const { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook } = require('tapable');

class Lesson1 {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tap('node', (name) => {
      console.log('name node', name);
    });

    this.hooks.arch.tap('react', (name) => {
      console.log('name react', name);
    })
  }

  start () {
    this.hooks.arch.call('Tom-Tom');
  }
}

class Lesson2 {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tap('node', (name) => {
      console.log('name node', name);
      return undefined;
    });

    this.hooks.arch.tap('react', (name) => {
      console.log('name react', name);
    })
  }

  start () {
    this.hooks.arch.call('Tom-Tom');
  }
}

class Lesson3 {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tap('node', (name) => {
      console.log('name node', name);
      return 'node学的不错';
    });

    this.hooks.arch.tap('react', (name) => {
      console.log('name react', name);
    })
  }

  start () {
    this.hooks.arch.call('Tom-Tom');
  }
}

class Lesson4 {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }

  tap () {
    this.hooks.arch.tap('node', (name) => {
      console.log('name node', name);
      // 返回 undefined 停止执行
      return ++this.index === 3 ? undefined : 'going';
    });

    this.hooks.arch.tap('react', (name) => {
      console.log('name react', name);
    })
  }

  start () {
    this.hooks.arch.call('Tom-Tom');
  }
}

const lesson = new Lesson4();

lesson.tap();
lesson.start();