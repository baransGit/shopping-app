import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ProductList } from "../features/product/pages/ProductList";
import { ROUTES } from "../app/constants/routes";
import { MainLayout } from "../shared/components/layout/MainLayout";
import { ProductDetail } from "../features/product/pages/ProductDetail";
import { CategoryList } from "../features/category/components/CategoryList";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";

import { useAuth } from "../features/auth/hooks/useAuth";
import { AccountDetailsForm } from "../features/user/components/AccountDetails";
import { AccountPage } from "../features/user/pages/AccountPage";
const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("🚪 PrivateRoutes Debug:", { isAuthenticated, isLoading });
  if (isLoading) {
    console.log("⏳ Loading...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("❌ Not authenticated, redirecting to login");
    return <Navigate to={ROUTES.LOGIN.LIST} />;
  }

  console.log("✅ Authenticated, showing protected route");
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN.LIST} />;
};

const PublicOnlyRoutes = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
};
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: ROUTES.HOME,
            element: <CategoryList />,
          },
          {
            path: ROUTES.CATEGORIES.PRODUCTS,
            element: <ProductList />,
          },
          {
            path: ROUTES.PRODUCTS.DETAIL,
            element: <ProductDetail />,
          },
          {
            path: ROUTES.ACCOUNT.ROOT,
            element: <AccountPage />,
            children: [
              {
                path: ROUTES.ACCOUNT.DETAILS,
                element: <AccountDetailsForm />,
              },
              {
                path: ROUTES.ACCOUNT.CHANGE_PASSWORD,
                element: <p>to be added</p>,
              },
              {
                index: true,
                element: <Navigate to="details" />,
              },
            ],
          },
        ],
      },
      {
        element: <PublicOnlyRoutes />,
        children: [
          {
            path: ROUTES.LOGIN.LIST,
            element: <LoginPage />,
          },
          {
            path: ROUTES.REGISTER.LIST,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
export const Router = () => {
  return <RouterProvider router={router} />;
};
