class SyncWaterfallHook {
  constructor() {
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    const [first, ...other] = this.tasks;
    const ret = first(...args);
    other.reduce((a, b) => {
      return b(a);
    }, ret)
  }
}

const hook = new SyncWaterfallHook(['name', 'age']);

hook.tap('name1', (name) => {
  console.log('name1', name);
  return '11111'
});

hook.tap('name2', (name) => {
  console.log('name2', name);
  return '22222'
});

hook.tap('name3', (name) => {
  console.log('name3', name);
  return '33333'
});

hook.tap('name4', (name) => {
  console.log('name4', name);
  return '44444'
});

hook.tap('name5', (name) => {
  console.log('name5', name);
});

hook.tap('name6', (name) => {
  console.log('name6', name);
});

hook.call('Tom', 13);