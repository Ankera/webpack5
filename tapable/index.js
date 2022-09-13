const { SyncHook } = require('tapable');

const syncHook = new SyncHook(['name', 'age']);

syncHook.tap('监听器的名字', (name, age) => {
  console.log(name, age);
});

syncHook.call('Tom', 13);