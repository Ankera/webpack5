class ArrayQueue {
  constructor(items) {
    this._list = items ? Array.from(items) : [];
  }
  // 入队
  enqueue(item) {
    this._list.push(item);
  }
  // 出队
  dequeue() {
    return this._list.shift();
  }
}

class AsyncQueue {
  constructor({name, processor, parallelism, getKey}) {
    // 名称
    this._name = name;

    // 处理器函数
    this._processor = processor;

    // 并发执行最大数
    this._parallelism = parallelism || 100;

    // 唯一标示函数
    this._getKey = getKey;

    // 保存当前队列中等执行的任务
    this._queued = new ArrayQueue();

    // 保存当前队列中所有已经执行过的任务
    this._entries = new Map();

    // 当前并发任务
    this._activeTasks = 0;

    // 是否开启下次事件队列EventLoop中等待执行的函数
    this._willEnsureProcessing = false;

    // 队列是否已经结束
    this._stopped = false;
  }

  add(item, callback){
    const key = this.getKey(item)

    
  }
}

module.exports = AsyncQueue;
