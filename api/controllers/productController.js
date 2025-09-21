const { getAllProducts } = require("../libs/productService");

const getProducts = async (req, res) => {
  const { email } = req.user;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  const result = await getAllProducts({ email, limit, offset });

  return res.status(result.statusCode).json(result.data);
};

module.exports = { getProducts };
