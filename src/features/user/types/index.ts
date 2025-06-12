export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface AccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  updatedAt?: string;
}
