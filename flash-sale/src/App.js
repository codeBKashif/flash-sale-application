import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import ErrorProvider from "./components/ErrorProvider";
import OrderStatus from "./components/OrderStatus";

function App() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderStatus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;
