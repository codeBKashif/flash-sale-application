import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getSaleStatus, getProducts, clearError } from "../redux/productSlice";
import Product from "./Product";

const ProductList = () => {
  const navigate = useNavigate();

  const { saleActive, items, saleActiveMessage, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSaleStatus());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getProducts()).unwrap();
      } catch (err) {
        console.error("Failed to fetch products", err);
        navigate("/");
      }
    };
    if (saleActive) {
      fetchProducts();
    }
  }, [saleActive, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">
          Welcome, {saleActiveMessage}
        </h1>
        {saleActive && (
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            View Orders
          </button>
        )}
      </div>

      {saleActive && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
