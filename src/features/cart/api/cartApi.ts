import { api } from "../../../shared/lib/axios";

// Backend'den gelecek stok kontrol response'u
export interface StockCheckResponse {
  productId: number;
  currentStock: number;
  available: boolean;
  maxAddableToCart: number;
  message?: string;
}

// Sepete ekleme request'i
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

// Sepete ekleme response'u
export interface AddToCartResponse {
  success: boolean;
  cartItem?: {
    productId: number;
    quantity: number;
    totalInCart: number;
  };
  stockInfo: {
    currentStock: number;
    remaining: number;
  };
  message?: string;
}

// Miktar güncelleme response'u
export interface UpdateQuantityResponse {
  success: boolean;
  newQuantity: number;
  stockInfo: {
    currentStock: number;
    remaining: number;
  };
  message?: string;
}

export const cartAPI = {
  // Stok kontrolü (real-time)
  checkStock: async (productId: number): Promise<StockCheckResponse> => {
    // TODO: Backend hazır olunca gerçek endpoint
    // const { data } = await api.get(`/cart/check-stock/${productId}`);
    // return data;

    // Mock response (backend gelene kadar)
    const mockStock = Math.floor(Math.random() * 20) + 1; // 1-20 arası random stok
    return {
      productId,
      currentStock: mockStock,
      available: mockStock > 0,
      maxAddableToCart: mockStock,
      message: mockStock > 0 ? undefined : "Stokta yok",
    };
  },

  // Sepete ürün ekleme
  addToCart: async (request: AddToCartRequest): Promise<AddToCartResponse> => {
    // TODO: Backend hazır olunca gerçek endpoint
    // const { data } = await api.post('/cart/add', request);
    // return data;

    // Mock response (backend gelene kadar)
    await new Promise((resolve) => setTimeout(resolve, 500)); // API gecikmesi simülasyonu

    const mockCurrentStock = Math.floor(Math.random() * 20) + 1;
    const available = mockCurrentStock >= request.quantity;

    if (!available) {
      return {
        success: false,
        stockInfo: {
          currentStock: mockCurrentStock,
          remaining: mockCurrentStock,
        },
        message: "Yetersiz stok",
      };
    }

    return {
      success: true,
      cartItem: {
        productId: request.productId,
        quantity: request.quantity,
        totalInCart: request.quantity,
      },
      stockInfo: {
        currentStock: mockCurrentStock,
        remaining: mockCurrentStock - request.quantity,
      },
      message: "Ürün sepete eklendi",
    };
  },

  // Miktar güncelleme
  updateQuantity: async (
    productId: number,
    quantity: number
  ): Promise<UpdateQuantityResponse> => {
    // TODO: Backend hazır olunca gerçek endpoint
    // const { data } = await api.put(`/cart/items/${productId}`, { quantity });
    // return data;

    // Mock response
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockCurrentStock = Math.floor(Math.random() * 20) + 5; // En az 5 stok
    const available = mockCurrentStock >= quantity;

    return {
      success: available,
      newQuantity: available ? quantity : Math.min(quantity, mockCurrentStock),
      stockInfo: {
        currentStock: mockCurrentStock,
        remaining:
          mockCurrentStock -
          (available ? quantity : Math.min(quantity, mockCurrentStock)),
      },
      message: available
        ? "Miktar güncellendi"
        : `Maksimum ${mockCurrentStock} adet ekleyebilirsiniz`,
    };
  },

  // Sepetten ürün çıkarma
  removeFromCart: async (
    productId: number
  ): Promise<{ success: boolean; message?: string }> => {
    // TODO: Backend hazır olunca gerçek endpoint
    // const { data } = await api.delete(`/cart/items/${productId}`);
    // return data;

    // Mock response
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      success: true,
      message: "Ürün sepetten çıkarıldı",
    };
  },
};
