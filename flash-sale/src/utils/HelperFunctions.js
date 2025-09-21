const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

const setTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

module.exports = {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
};
