const express = require("express");
const router = express.Router();
const errorHandler = require("./utils/errorHandler");

const { getProducts } = require("./controllers/productController");
const { postOrder, getOrderStatus } = require("./controllers/orderController");
const { getUserToken } = require("./controllers/userController");
const { getSaleStatus } = require("./controllers/saleController");

const {
  verifySaleTime,
  verifyOneSalePerUser,
} = require("./middlewares/saleMiddleware");

router.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

router.get("/sale/status", getSaleStatus);

router.post(
  "/orders",
  verifySaleTime,
  verifyOneSalePerUser,
  errorHandler(postOrder)
);

router.get("/products", errorHandler(getProducts));

router.post("/auth/token", errorHandler(getUserToken));

router.get("/user/orders", errorHandler(getOrderStatus));

module.exports = router;
