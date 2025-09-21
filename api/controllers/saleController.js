const { saleStatus } = require("../libs/orderService");
const saleInfo = require("../config/sale.json");

const getSaleStatus = (req, res) => {
  const result = saleStatus({ saleInfo });
  return res.status(result.statusCode).json(result.data);
};

module.exports = { getSaleStatus };
