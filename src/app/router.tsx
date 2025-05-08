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

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
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
