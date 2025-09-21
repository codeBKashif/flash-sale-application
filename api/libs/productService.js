const { Product, Order } = require("../models");
const { setResponse } = require("../utils/responsehandler");

const getAllProducts = async ({ email, limit, offset }) => {
  const { count, rows } = await Product.findAndCountAll({
    include: [
      {
        model: Order,
        where: { email },
        required: false,
        attributes: ["id"],
      },
    ],
    limit,
    offset,
    order: [["id", "ASC"]],
  });

  const result = rows.map((row) => {
    return {
      ...row.toJSON(),
      alreadyPurchased: row.Orders.length > 0,
    };
  });

  return setResponse(200, { count, rows: result });
};

module.exports = { getAllProducts };
