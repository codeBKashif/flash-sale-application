const errorHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.info(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = errorHandler;
