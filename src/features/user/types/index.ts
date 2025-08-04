export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
  dateOfBirth?: Date | string;
  addressBook?: UserAddress[];
}

export interface AccountDetailsCredentials {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  updatedAt?: string;
}
export type UpdateDetailsCredentials = Omit<
  AccountDetailsCredentials,
  "updatedAt"
>;

export interface UserAddress {
  id?: string;
  fullName: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  zip: string;
}
export interface UserAddressResponse {
  success: boolean;
  message: string;
  addresses: UserAddress[];
}

export interface AddressResponse {
  success: boolean;
  message: string;
  address: UserAddress;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}
export interface UserSuccessResponse {
  success: boolean;
  user: User;

  message?: string;
}
