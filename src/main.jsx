import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";

import { AuthProvider } from "./auth/AuthContext";
// import { PageProvider } from "./layout/PageContext";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <Layout>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </Layout>
  </AuthProvider>,
);
