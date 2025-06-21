import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Pages/Layout";
import HomePage from "../Pages/HomePage";
import ProtectedRoute from "./../Auth/protectedRoute";
import ProductsPage from "../Pages/ProductsPage";
import LoginPage from "../Pages/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage";
import ErrorHandler from "../Error/ErrorHandler";
import RegisterPage from "../Pages/RegisterPage";
import CartItemPage from "../Pages/CartItemPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import CookieServices from "../services/CookieServices";
import MainDashPage from "../Pages/Dashboard/LayoutDash";
import ProductDashboard from "../Pages/Dashboard/ProductDashboard";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
const user = CookieServices.get("user");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={true} redirectPath="login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute isAllowed={true} redirectPath="login">
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route path="productDetails" element={<ProductDetailsPage />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute isAllowed={true} redirectPath="login">
              <CartItemPage />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <ProtectedRoute isAllowed={user?.jwt} redirectPath="/login">
            <MainDashPage />
          </ProtectedRoute>
        }
      >
        {/* product-manage */}
        <Route path="product-manage" element={<ProductDashboard />} />
        <Route index element={<DashboardPage />} />
      </Route>
    </>
  )
);

export default router;
