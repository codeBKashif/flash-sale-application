module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/libs", "<rootDir>/utils", "<rootDir>/controllers"],
  testMatch: ["**/tests/**/*.test.js"],
  moduleFileExtensions: ["js", "json"],
  clearMocks: true,
};
