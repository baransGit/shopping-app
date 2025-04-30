// src/features/product/types/Product.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ImageGalleryProps {
  images: string[];
  title: string;
}

export interface ImageThumbnailsProps {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  title: string;
}
