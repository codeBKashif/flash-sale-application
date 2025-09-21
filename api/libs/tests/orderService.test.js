const {
  createOrder,
  orderStatus,
  saleStatus,
  getUserOrder,
  confirmOrder,
} = require("../orderService");
const { Order, Product, sequelize } = require("../../models");

jest.mock("../../models");

describe("confirmOrder", () => {
  beforeEach(() => {
    t = {
      commit: jest.fn(),
      rollback: jest.fn(),
      LOCK: { UPDATE: "UPDATE" },
    };

    sequelize.transaction = jest.fn().mockResolvedValue(t);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return bad request when product out of stock", async () => {
    Product.findByPk.mockResolvedValue({ stock: 0 });
    await expect(
      confirmOrder({ email: "abc@gmail.com", productId: 1 })
    ).rejects.toThrow("Product out of stock");

    expect(t.rollback).toHaveBeenCalled();
  });

  it("should deduct from stock and create order when product is available", async () => {
    Product.findByPk.mockResolvedValue({ stock: 10, save: jest.fn() });
    Order.create.mockResolvedValue({
      email: "abc@gmail.com",
      productId: 1,
      status: "pending",
    });

    await confirmOrder({ email: "abc@gmail.com", productId: 1 });
    expect(t.commit).toHaveBeenCalled();
  });

  it("should not oversold when multiple orders are placed concurrently", async () => {
    Product.findByPk.mockResolvedValue({
      productId: 1,
      stock: 1,
      save: jest.fn(),
    });
    Order.update.mockResolvedValue([1]);

    const results = await Promise.allSettled([
      confirmOrder({ email: "abc@gmail.com", productId: 1 }),
      confirmOrder({ email: "xyz@gmail.com", productId: 1 }),
      confirmOrder({ email: "jhon@gmail.com", productId: 1 }),
    ]);

    const successResponses = results.filter((r) => r.status === "fulfilled");
    const failedResponses = results.filter((r) => r.status === "rejected");

    expect(successResponses.length).toBe(1);
    expect(failedResponses.length).toBe(2);
    expect(failedResponses[0].reason.message).toBe("Product out of stock");
    expect(failedResponses[1].reason.message).toBe("Product out of stock");
  });

  describe("saleStatus", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return sale not started", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const saleInfo = { startDate: futureDate, endDate: null };

      const result = saleStatus({ saleInfo });
      expect(result.statusCode).toBe(400);
      expect(result.data.message).toBe("Sale has not started yet");
    });

    it("should return sale ended", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const saleInfo = { startDate: null, endDate: pastDate };

      const result = saleStatus({ saleInfo });
      expect(result.statusCode).toBe(400);
      expect(result.data.message).toBe("Sale has ended");
    });

    it("should return sale active", () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const saleInfo = { startDate: pastDate, endDate: futureDate };

      const result = saleStatus({ saleInfo });
      expect(result.statusCode).toBe(200);
      expect(result.data.message).toBe("Sale is active");
    });
  });

  describe("getUserOrder", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a user order", async () => {
      Order.findOne.mockResolvedValue({
        id: 1,
        productId: 1,
        email: "jhon@gmail.com",
        status: "confirmed",
        Product: { id: 1 },
      });

      const result = await getUserOrder({ email: "jhon@gmail.com" });

      expect(result.id).toBe(1);
    });
  });
});
