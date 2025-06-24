import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import {
  UserSuccessResponse,
  UserAddress,
  UserAddressResponse,
  UpdateDetailsCredentials,
  AddressResponse,
  ChangePasswordCredentials,
  AccountDetailsCredentials,
} from "../../user/types";
import { User } from "../../user/types";
import { useNavigation } from "../../../shared/hooks/useNavigation";
import { tokenManager } from "../../../shared/utils/tokenManager";
import { authAPI } from "../../auth/api/authApi";

export const useUserProfile = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: tokenManager.hasToken(),
  });

  const invalidateUserCache = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["address"] });
  };

  const getAddress = (addressId: string, options?: { enabled: boolean }) => {
    return useQuery<AddressResponse, Error>({
      queryKey: ["address", addressId],
      queryFn: () => userApi.getAddress(addressId),
      enabled: options?.enabled && Boolean(addressId),
    });
  };

  const updateDetails = useMutation<
    UserSuccessResponse,
    Error,
    UpdateDetailsCredentials
  >({
    mutationFn: (credentials) => userApi.updateDetails(credentials),
    onSuccess: (data) => {
      console.log(data.message || "User details updated successfully");
      invalidateUserCache();
    },
  });

  const updatePassword = useMutation<
    { message: string },
    Error,
    ChangePasswordCredentials
  >({
    mutationFn: (credentials) => userApi.updatePassword(credentials),
    onSuccess: (data) => {
      console.log(data.message || "Password updated successfully");
      invalidateUserCache();
    },
  });

  const addAddress = useMutation<AddressResponse, Error, UserAddress>({
    mutationFn: (userAddress) => userApi.addAddress(userAddress),
    onSuccess: (data) => {
      console.log(data.message || "Address added successfully.");
      invalidateUserCache();
    },
  });

  const updateAddress = useMutation<AddressResponse, Error, UserAddress>({
    mutationFn: (userAddress) => userApi.updateAddress(userAddress),
    onSuccess: (data) => {
      console.log(data.message || "Address updated successfully.");
      invalidateUserCache();
    },
  });

  const deleteAddress = useMutation<{ message: string }, Error, string>({
    mutationFn: (addressId) => userApi.deleteAddress(addressId),
    onSuccess: (data) => {
      console.log(data.message || "Address deleted successfully.");
      invalidateUserCache();
    },
  });

  return {
    user,
    isLoading,
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    updateDetails,
    updatePassword,
  };
};
