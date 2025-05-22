import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "..";
import { mockProduct } from "../../../../../__tests__/mocks/data/productMocks";

const mockOnClick = jest.fn();

describe("ProductCard", () => {
  it("should render product card correctly", () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockProduct.thumbnail
    );
    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("should call onClick when card is clicked", () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should be keyboard accessible", () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
