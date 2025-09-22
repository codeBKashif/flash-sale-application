import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticateUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      try {
        await dispatch(authenticateUser({ email })).unwrap();
        navigate("/products");
      } catch (err) {
        console.error("Login failed", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center">
          Please Login to proceed
        </h2>

        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
