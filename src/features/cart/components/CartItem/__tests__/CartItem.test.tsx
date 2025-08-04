import { render, screen, fireEvent } from "@testing-library/react";
import { CartItem } from "..";
import { useCart } from "../../../hooks/useCart";
import { mockCartItem } from "../../../../../__tests__/mocks/data/cartMocks";

// Mock useCart hook
jest.mock("../../../hooks/useCart");

// Mock useCart hook
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe("CartItem", () => {
  it("should show loading state when isLoading is true", () => {
    mockUseCart.mockReturnValue({
      isLoading: true,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      getCartItemWithDetails: jest.fn(),
    } as any);

    render(<CartItem productId={1} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error state when item is not found", () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      getCartItemWithDetails: jest.fn().mockReturnValue(null),
    } as any);

    render(<CartItem productId={1} />);
    expect(screen.getByText("Product is not found")).toBeInTheDocument();
  });

  it("should render cart item correctly", () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      getCartItemWithDetails: jest.fn().mockReturnValue(mockCartItem),
    } as any);

    render(<CartItem productId={1} />);

    expect(screen.getByText(mockCartItem.product.title)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockCartItem.product.thumbnail
    );
  });

  it("should call removeItem when remove button is clicked", () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      updateItemQuantity: jest.fn(),
      removeItem: jest.fn(),
      getCartItemWithDetails: jest.fn().mockReturnValue(mockCartItem),
    } as any);

    render(<CartItem productId={1} />);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockUseCart().removeItem).toHaveBeenCalledWith(1);
  });

  it("should call updateItemQuantity when quantity is changed", () => {
    const mockUpdateQuantity = jest.fn();
    mockUseCart.mockReturnValue({
      isLoading: false,
      updateItemQuantity: mockUpdateQuantity,
      removeItem: jest.fn(),
      getCartItemWithDetails: jest.fn().mockReturnValue(mockCartItem),
    } as any);

    render(<CartItem productId={1} />);

    const quantityInput = screen.getByText("2");
    fireEvent.click(screen.getByText("+"));

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });
});
