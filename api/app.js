const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");
const { verifyJWT } = require("./middlewares/jwtMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(verifyJWT({ exclude: ["/", "/sale/status", "/auth/token"] }));

app.use(routes);

module.exports = app;
