export const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
jest.mock("axios", () => ({
  create: jest.fn().mockReturnValue(mockAxios),
  defaults: {},
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
}));
