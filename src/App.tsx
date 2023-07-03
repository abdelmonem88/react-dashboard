import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import SharedLayout from "./components/global/SharedLayout";
import Products from "./pages/dashboard/Products";
import Users from "./pages/dashboard/Users";
import PageNotFound from "./pages/PageNotFound";
import AuthGuard from "./utility/AuthGuard";
import { AuthProvider } from "./context/authContext";
import SingleProduct from "./pages/dashboard/SingleProduct";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <SharedLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Products />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          pauseOnHover={true}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
