class SyncHook {
  constructor(args) {
    this.args = args;
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    this.tasks.forEach(task => {
      task(...args);
    })
  }
}

const hook = new SyncHook(['name', 'age']);

hook.tap('监听器的名字1', (name, age) => {
  console.log('监听器的名字1', name, age);
});

hook.tap('监听器的名字2', (name, age) => {
  console.log('监听器的名字2', name, age);
});

hook.call('Tom', 13);