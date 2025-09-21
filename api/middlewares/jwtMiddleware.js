const jwt = require("jsonwebtoken");

const verifyJWT =
  ({ exclude }) =>
  (req, res, next) => {
    if (exclude.includes(req.path)) return next();

    const token = req.headers.authorization;
    const secretKey = process.env.secretKey || "jwt123aaa";
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.sendStatus(401);
      req.user = decoded;
      next();
    });
  };

const generateJWT = ({ email }) => {
  const secretKey = process.env.secretKey || "jwt123aaa";
  try {
    return jwt.sign({ email }, secretKey, { expiresIn: "1h" });
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { verifyJWT, generateJWT };
