import { useState, createContext, useContext } from "react";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError({ id: Date.now(), message });
    setTimeout(() => setError(null), 5000);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && (
        <div
          key={error.id}
          className="fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-4"
        >
          <span>{error.message}</span>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
