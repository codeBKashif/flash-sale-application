const { Queue } = require("bullmq");
const connection = { host: "localhost", port: 6379 };

const orderQueue = new Queue("orderQueue", { connection });

module.exports = { orderQueue };
