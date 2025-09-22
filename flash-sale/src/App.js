import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import OrderStatus from "./components/OrderStatus";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderStatus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
