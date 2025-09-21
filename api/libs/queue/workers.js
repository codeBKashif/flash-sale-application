const { Worker } = require("bullmq");
const connection = { host: "localhost", port: 6379 };

const createWorker = (queueName, processor) => {
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
  return worker;
};

module.exports = { createWorker };
