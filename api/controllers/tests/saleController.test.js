const request = require("supertest");

jest.mock("../../libs/orderService");

const app = require("../../app");
const { saleStatus } = require("../../libs/orderService");

describe("Sale Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /sale/status - should return sale status", async () => {
    saleStatus.mockReturnValue({
      statusCode: 200,
      data: { message: "Sale is active" },
    });
    const response = await request(app).get("/sale/status");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
