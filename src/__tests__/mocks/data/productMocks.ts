import { Product } from "../../../features/product/types/Product";

export const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: "Test Brand",
  category: "Test Category",
  thumbnail: "test-image.jpg",
  images: ["test-image.jpg", "test-image-2.jpg"],
};
