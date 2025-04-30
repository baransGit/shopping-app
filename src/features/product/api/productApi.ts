import { api } from "../../../shared/lib/axios";

export const productAPI = {
  // Tüm ürünleri getir
  getProducts: async () => {
    const { data } = await api.get("/products");
    return data.products; // DummyJSON {products: Product[]} şeklinde dönüyor
  },

  getProductsByGroup: async (groupId: string) => {
    const { data } = await api.get(`/products/category/${groupId}`);
    return data.products; // DummyJSON {products: Product[]} şeklinde dönüyor
  },

  // Tek ürün detayı
  getProduct: async (id: number) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
