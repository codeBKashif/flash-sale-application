const saleInfo = require("../config/sale.json");
const { getUserOrder, checkIsSaleActive } = require("../libs/orderService");

const verifySaleTime = async (req, res, next) => {
  const isSaleActive = checkIsSaleActive({ saleInfo });
  if (!isSaleActive) {
    return res.status(400).json({ message: "Sale is not active" });
  }

  return next();
};

const verifyOneSalePerUser = async (req, res, next) => {
  const { email } = req.user;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const order = await getUserOrder({ email, productId });
  if (order) {
    return res
      .status(400)
      .json({ message: "User has already made a purchase during the sale" });
  }

  next();
};

module.exports = { verifySaleTime, verifyOneSalePerUser };
