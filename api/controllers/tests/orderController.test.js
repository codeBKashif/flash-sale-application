const request = require("supertest");

jest.mock("../../libs/orderService");
jest.mock("bullmq");

const app = require("../../app");
const {
  getUserOrder,
  createOrder,
  orderStatus,
  checkIsSaleActive,
} = require("../../libs/orderService");

const { orderQueue } = require("../../libs/queue/orderQueue");

const { generateJWT } = require("../../middlewares/jwtMiddleware");

describe("Order Controller", () => {
  let token;

  beforeAll(() => {
    token = generateJWT({ email: "jhon@gmail.com" });
    checkIsSaleActive.mockReturnValue(true);
    orderQueue.add = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /orders - should create a user order", async () => {
    getUserOrder.mockReturnValue(null);
    createOrder.mockReturnValue({
      statusCode: 201,
      data: {
        order: {
          id: 1,
          productId: 1,
          email: "jhon@gmail.com",
          status: "confirmed",
        },
      },
    });

    const response = await request(app)
      .post("/orders")
      .send({ productId: 1 })
      .set("Authorization", token)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("order");
  });

  it("POST /orders - should return bad request if sale is not active", async () => {
    getUserOrder.mockReturnValue(null);
    checkIsSaleActive.mockReturnValue(false);

    const response = await request(app)
      .post("/orders")
      .send({ productId: 1 })
      .set("Authorization", token)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Sale is not active");
  });

  it("POST /orders - should return bad request if user already has one order", async () => {
    getUserOrder.mockReturnValue({
      id: 1,
      productId: 1,
      email: "jhon@gmail.com",
      status: "confirmed",
    });
    checkIsSaleActive.mockReturnValue(true);

    const response = await request(app)
      .post("/orders")
      .send({ productId: 1 })
      .set("Authorization", token)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "User has already made a purchase during the sale"
    );
  });

  it("GET /user/orders - should return user orders", async () => {
    orderStatus.mockReturnValue({
      statusCode: 200,
      data: {
        id: 1,
        productId: 1,
        email: "jhon@gmail.com",
        status: "confirmed",
      },
    });

    const response = await request(app)
      .get("/user/orders")
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("productId");
  });
});
