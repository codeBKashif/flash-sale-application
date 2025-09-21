import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { orderStatus } from "../redux/orderSlice";
import { getSaleStatus } from "../redux/productSlice";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.orders);
  const { saleActive } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSaleStatus());
    dispatch(orderStatus());
  }, [dispatch]);

  useEffect(() => {
    if (saleActive === false) {
      navigate("/products");
    }
  }, [navigate, saleActive]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6 pl-[7.5rem] w-full">
        <h1 className="text-3xl font-bold text-center flex-1">My Orders</h1>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View Products
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">
                Product: {order.Product.name}
              </h2>
              <p className="text-gray-600 mb-1">Email: {order.email}</p>
              <p className="text-gray-600 mb-1">
                Price: ${order.Product.price}
              </p>
              <p
                className={`font-semibold ${
                  order.status === "confirmed"
                    ? "text-green-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
