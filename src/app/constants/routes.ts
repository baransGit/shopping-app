/**
 * Application Routes
 * Defines all the route paths used in the application
 *
 * Structure:
 * - HOME: Main landing page
 * - PRODUCTS:
 *   - LIST: All products page
 *   - DETAIL: Individual product page (requires ID parameter)
 * - CATEGORIES:
 *   - LIST: All categories page
 *   - PRODUCTS: Products in a specific category (requires categorySlug parameter)
 */

export const ROUTES = {
  HOME: "/",
  PRODUCTS: {
    LIST: "/products",
    DETAIL: "/product/:id", // Dynamic route with product ID parameter
  },
  CATEGORIES: {
    LIST: "/",
    PRODUCTS: "/category/:categorySlug", // Dynamic route with category slug parameter
  },
} as const;
