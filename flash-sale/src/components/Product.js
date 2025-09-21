import { orderProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";

import { useError } from "./ErrorProvider";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { showError } = useError();

  const buyProduct = async () => {
    try {
      await dispatch(orderProduct(product.id)).unwrap();
    } catch (err) {
      console.error("Failed to order product", err);
      showError(err.message || "Failed to order product");
    }
  };
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-1">Price: ${product.price}</p>
        <p
          className={`mb-2 font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock ? "Available" : "Out of stock"}
        </p>
      </div>
      <button
        className={`mt-4 py-2 rounded transition-colors
            ${
              product.stock === 0 || product.alreadyPurchased
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        disabled={product.stock == 0 || product.alreadyPurchased}
        onClick={buyProduct}
      >
        {product.alreadyPurchased ? "Already Bought" : "Buy Now"}
      </button>
    </div>
  );
};

export default Product;
