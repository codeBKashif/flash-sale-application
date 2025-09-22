const { Worker } = require("bullmq");
const { orderProcessor } = require("./orderProcessor");

const connection = { host: "localhost", port: 6379 };

class WorkerServer {
  constructor() {
    this.workers = [];
    this.redis = { host: process.env.redis_host || "localhost", port: 6379 };
  }

  registerWorker(queueName, processor) {
    // worker concurrency 10, with rate limiter max 20 jobs per second
    const worker = new Worker(queueName, processor, {
      connection,
      concurrency: 10,
      limiter: { max: 20, duration: 1000 },
      autorun: true,
    });
    worker.on("completed", (job) => {
      console.log(`Job with ID ${job.id} has been completed`);
    });
    worker.on("failed", (job, err) => {
      console.log(`Job with ID ${job.id} has failed with error ${err.message}`);
    });
    worker.on("error", (err) => {
      console.error("Worker encountered an error:", err);
    });

    this.workers.push(worker);
    return worker;
  }

  async start() {
    console.log("🚀 Starting Worker Server...");
    this.registerWorkers();
    console.log(`Worker Server started with ${this.workers.length} workers`);

    process.on("SIGTERM", () => this.shutdown());
    process.on("SIGINT", () => this.shutdown());
  }

  async shutdown() {
    console.log("Shutting down Worker Server...");

    for (const [name, worker] of this.workers) {
      console.log(`Closing worker: ${name}`);
      await worker.close();
    }

    console.log("Worker Server shutdown complete");
    process.exit(0);
  }

  registerWorkers() {
    this.registerWorker("orderQueue", orderProcessor);
  }
}

module.exports = { WorkerServer };
