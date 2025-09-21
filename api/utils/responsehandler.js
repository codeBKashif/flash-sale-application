const setResponse = (statusCode = 200, data = {}) => {
  return { statusCode, data };
};

module.exports = { setResponse };
