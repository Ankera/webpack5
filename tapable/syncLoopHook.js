class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap (name, task) {
    this.tasks.push(task)
  }

  call (...args) {
    this.tasks.forEach((task) => {
      let ret = task(...args);
      while (ret !== undefined) {
        ret = task(...args);
      }
    })
  }
}

const hook = new SyncLoopHook(['name']);
let total = 0;

hook.tap('name1', (name) => {
  console.log('name1', name, total);
  return ++total === 3 ? undefined : 'going1';
});

hook.tap('name2', (name) => {
  console.log('name2', name);
  return undefined;
});

hook.call('React')