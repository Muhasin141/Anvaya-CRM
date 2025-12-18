import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppProvider from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </Router>
    </AppProvider>
  );
}

export default App;
