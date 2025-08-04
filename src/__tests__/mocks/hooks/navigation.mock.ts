export const mockNavigation = {
  goToHome: jest.fn(),
  goToProductDetail: jest.fn(),
  goToCategoryProducts: jest.fn(),
  goToLogin: jest.fn(),
  goToRegister: jest.fn(),
};

export const useNavigation = () => mockNavigation;
