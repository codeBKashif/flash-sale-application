const request = require("supertest");

const app = require("../../app");
const { generateJWT } = require("../../middlewares/jwtMiddleware");

jest.mock("../../middlewares/jwtMiddleware", () => {
  const actual = jest.requireActual("../../middlewares/jwtMiddleware");
  return {
    ...actual,
    generateJWT: jest.fn(),
  };
});

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /auth/token - should create auth token", async () => {
    generateJWT.mockReturnValue("mocked_jwt_token");

    const response = await request(app)
      .post("/auth/token")
      .send({ email: "john@gmail.com" })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token", "mocked_jwt_token");
  });

  it("POST /auth/token - should return 500 if JWT sign fails", async () => {
    generateJWT.mockReturnValue(null);

    const response = await request(app)
      .post("/auth/token")
      .send({ email: "john@gmail.com" })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(500);
  });
});
