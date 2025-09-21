const { confirmOrder } = require("../orderService");
const { createWorker } = require("./workers");

const orderWorker = createWorker("orderQueue", async (job) => {
  console.log("Processing job:", job.name, job.data);
  const { email, productId } = job.data;
  return await confirmOrder({ email, productId });
});

module.exports = { orderWorker };
