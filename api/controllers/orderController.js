const { orderStatus, createOrder } = require("../libs/orderService");
const { orderQueue } = require("../libs/queue/orderQueue");

const postOrder = async (req, res) => {
  const { productId } = req.body;
  const { email } = req.user;

  const result = await createOrder({ email, productId });
  orderQueue.add("createOrder", { email, productId });

  res.status(result.statusCode).json(result.data);
};

const getOrderStatus = async (req, res) => {
  const { email } = req.user;

  const result = await orderStatus({ email });
  res.status(result.statusCode).json(result.data);
};

module.exports = { postOrder, getOrderStatus };
