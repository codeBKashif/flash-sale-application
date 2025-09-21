const request = require("supertest");

jest.mock("../../libs/productService");

const app = require("../../app");
const { getAllProducts } = require("../../libs/productService");
const { generateJWT } = require("../../middlewares/jwtMiddleware");

describe("Product Controller", () => {
  let token;
  beforeAll(() => {
    token = generateJWT({ email: "jhon@gmail.com" });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /products - should return sale status", async () => {
    const mockProducts = {
      count: 2,
      rows: [
        { id: 1, name: "Product 1", stock: 10 },
        { id: 2, name: "Product 2", stock: 5 },
      ],
    };
    getAllProducts.mockReturnValue({
      statusCode: 200,
      data: mockProducts,
    });
    const response = await request(app)
      .get("/products")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("rows");
    expect(response.body).toHaveProperty("count");
  });
});
