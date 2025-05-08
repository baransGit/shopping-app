/**
 * Navigation Hook
 * Custom hook for handling application navigation
 *
 * Provides type-safe navigation functions for:
 * - Home page
 * - Product detail pages
 * - Category product pages
 *
 * Uses React Router's useNavigate hook internally
 * and handles URL parameter formatting
 */

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/constants/routes";

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    // Navigate to home page
    goToHome: () => navigate(ROUTES.HOME),

    // Navigate to product detail page with specific product ID
    goToProductDetail: (id: number) =>
      navigate(`${ROUTES.PRODUCTS.DETAIL.replace(":id", id.toString())}`),

    // Navigate to category products page with specific category ID
    goToCategoryProducts: (categorySlug: string) =>
      navigate(
        ROUTES.CATEGORIES.PRODUCTS.replace(":categorySlug", categorySlug)
      ),
    goToLogin: () => navigate(ROUTES.LOGIN.LIST),
    goToRegister: () => navigate(ROUTES.REGISTER.LIST),
  };
};
