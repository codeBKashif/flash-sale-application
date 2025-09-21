const { Order, sequelize, Product } = require("../models");
const { setResponse } = require("../utils/responsehandler");

const createOrder = async ({ email, productId }) => {
  const product = await Product.findByPk(productId);
  if (product.stock < 1) {
    return setResponse(404, { message: "Product out of stock" });
  }

  const order = await Order.create({ email, productId, status: "pending" });

  return setResponse(201, { order });
};

const confirmOrder = async ({ email, productId }) => {
  const t = await sequelize.transaction();

  try {
    const product = await Product.findByPk(productId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (product.stock < 1) {
      throw new Error("Product out of stock");
    }
    product.stock -= 1;
    await product.save({ transaction: t });

    await Order.update(
      { status: "confirmed" },
      { where: { email, productId }, transaction: t }
    );

    await t.commit();

    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const orderStatus = async ({ email }) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        attributes: ["name", "price", "stock"],
        required: true,
      },
    ],
    where: { email },
  });

  const result = orders.map((row) => {
    return {
      ...row.toJSON(),
      status:
        "pending" && row.Product.stock === 0 ? "Out of stock" : row.status,
    };
  });
  return setResponse(200, { data: result });
};

const saleStatus = ({ saleInfo }) => {
  const currentTime = new Date();
  const startTime = new Date(saleInfo.startDate);
  const endTime = new Date(saleInfo.endDate);

  if (currentTime < startTime) {
    return setResponse(400, { message: "Sale has not started yet" });
  } else if (currentTime > endTime) {
    return setResponse(400, { message: "Sale has ended" });
  }
  return setResponse(200, { message: "Sale is active" });
};

const getUserOrder = async ({ email, productId }) => {
  const result = await Order.findOne({
    include: [
      {
        model: Product,
        required: true,
        where: { id: productId },
        attributes: ["id"],
      },
    ],
    where: { email },
  });
  return result;
};

const checkIsSaleActive = ({ saleInfo }) => {
  const currentTime = new Date();
  const startTime = new Date(saleInfo.startDate);
  const endTime = new Date(saleInfo.endDate);

  if (currentTime < startTime || currentTime > endTime) {
    return false;
  }
  return true;
};

module.exports = {
  createOrder,
  orderStatus,
  saleStatus,
  getUserOrder,
  checkIsSaleActive,
  confirmOrder,
};
