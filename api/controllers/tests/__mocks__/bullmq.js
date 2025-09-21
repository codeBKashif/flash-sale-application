class MockQueue {
  constructor(name, opts) {
    this.name = name;
    this.opts = opts;
  }
  add = jest.fn().mockResolvedValue();
  close = jest.fn().mockResolvedValue();
}

class MockWorker {
  constructor(name, processor, opts) {
    this.name = name;
    this.processor = processor;
    this.opts = opts;
  }
  on = jest.fn();
  close = jest.fn().mockResolvedValue();
}

module.exports = { Queue: MockQueue, Worker: MockWorker };
