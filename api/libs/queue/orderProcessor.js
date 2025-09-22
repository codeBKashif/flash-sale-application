const { confirmOrder } = require("../orderService");

const orderProcessor = async (job) => {
  console.log("Processing job:", job.name, job.data);
  const { email, productId } = job.data;
  return await confirmOrder({ email, productId });
};

module.exports = { orderProcessor };
