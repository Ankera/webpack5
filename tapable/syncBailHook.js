class SyncBailHook {
  constructor(args) {
    this.tasks = [];
  }

  tap (name, task) {
    this.tasks.push(task);
  }

  call (...args) {
    // for (let i = 0; i < this.tasks.length; i++) {
    //   const task = this.tasks[i](...args);
    //   if (task !== undefined) {
    //     break;
    //   }
    // }
    let ret;
    let index = 0;
    do {
      ret = this.tasks[index](...args);
      index++;
    } while (ret === undefined && index < this.tasks.length);
  }
}

const hook = new SyncBailHook(['name', 'age']);

hook.tap('name1', (name, age) => {
  console.log('name1', name, age);
  return '11'
});

hook.tap('name2', (name, age) => {
  console.log('name2', name, age);
});

hook.call('Tom', 13);