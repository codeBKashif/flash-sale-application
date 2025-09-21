const { generateJWT } = require("../middlewares/jwtMiddleware");

const getUserToken = async (req, res) => {
  const { email } = req.body;

  const token = generateJWT({ email });
  if (!token) {
    throw new Error("Could not generate token");
  }
  return res.status(200).json({ token });
};

module.exports = { getUserToken };
