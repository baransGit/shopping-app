import {
  ChangePasswordCredentials,
  AccountDetailsCredentials,
  AddressResponse,
  UserAddress,
  UpdateDetailsCredentials,
  UserSuccessResponse,
} from "../types";
import { authApi } from "../../../shared/lib/axios";
export const userApi = {
  updateDetails: async (
    credentials: UpdateDetailsCredentials
  ): Promise<UserSuccessResponse> => {
    const { data } = await authApi.put("/api/auth/update-details", credentials);
    return data;
  },
  updatePassword: async (
    credentials: ChangePasswordCredentials
  ): Promise<{ message: string }> => {
    const { data } = await authApi.put(
      "/api/auth/update-password",
      credentials
    );
    return data; //
  },
  getAddress: async (addressId: string): Promise<AddressResponse> => {
    const { data } = await authApi.get(`/api/auth/address/${addressId}`);
    return data;
  },
  addAddress: async (address: UserAddress): Promise<AddressResponse> => {
    const { data } = await authApi.post("/api/auth/addAddress", address);
    return data;
  },
  updateAddress: async (address: UserAddress): Promise<AddressResponse> => {
    const { data } = await authApi.put(
      `/api/auth/updateAddress/${address.id}`,
      address
    );
    return data;
  },
  deleteAddress: async (
    addressId: string
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await authApi.delete(
      `/api/auth/deleteAddress/${addressId}`
    );
    return data;
  },
};
