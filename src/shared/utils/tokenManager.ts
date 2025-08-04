const TOKEN_KEY = "token";

export const tokenManager = {
  // Get token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Save token
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Clear token
  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if token exists
  hasToken(): boolean {
    return !!this.getToken();
  },

  // Completely logout user (clear token + clear cache)
  clearAuth(queryClient?: any): void {
    this.clearToken();
    if (queryClient) {
      queryClient.clear();
    }
  },
};
