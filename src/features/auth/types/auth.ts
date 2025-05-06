export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  //avatar to be added in future
}
export interface LoginCredentials {
  username: string;
  password: string;
}
export interface LoginResponse {
  user: User;
  token: string;
}
