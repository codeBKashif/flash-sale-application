const { getAllProducts } = require("../productService");
const { Product } = require("../../models");

jest.mock("../../models");

describe("getAllProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return products with correct limit and offset", async () => {
    const mockProducts = {
      count: 2,
      rows: [
        {
          id: 1,
          name: "Product 1",
          stock: 10,
          Orders: [],
          toJSON() {
            return { id: 1, name: "Product 1", stock: 10, Orders: [] };
          },
        },
        {
          id: 2,
          name: "Product 2",
          stock: 5,
          Orders: [{ id: 1 }],
          toJSON() {
            return { id: 2, name: "Product 2", stock: 5, Orders: [{ id: 1 }] };
          },
        },
      ],
    };
    Product.findAndCountAll.mockResolvedValue(mockProducts);

    const result = await getAllProducts({ limit: 2, offset: 0 });

    expect(result.statusCode).toBe(200);
    expect(result.data).toEqual({
      count: 2,
      rows: [
        {
          id: 1,
          name: "Product 1",
          stock: 10,
          Orders: [],
          alreadyPurchased: false,
        },
        {
          id: 2,
          name: "Product 2",
          stock: 5,
          Orders: [{ id: 1 }],
          alreadyPurchased: true,
        },
      ],
    });
  });
});
