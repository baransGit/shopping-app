/**
 * Reusable Button Component
 * A highly customizable button component that supports:
 * - Multiple variants (primary, secondary, outline, text)
 * - Different sizes (small, medium, large)
 * - Loading states
 * - Full width option
 * - Left and right icons
 * - Disabled states
 */

import styles from "./styles.module.css";
import classNames from "classnames";

// Button variants for different use cases
type ButtonVariant = "primary" | "secondary" | "outline" | "text";

// Available button sizes
type ButtonSize = "small" | "medium" | "large";

/**
 * Props interface for the Button component
 * Extends native button HTML attributes
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Visual style variant of the button
  size?: ButtonSize; // Size variant of the button
  isLoading?: boolean; // Loading state indicator
  isFullWidth?: boolean; // Whether button should take full width
  leftIcon?: React.ReactNode; // Icon to show before button text
  rightIcon?: React.ReactNode; // Icon to show after button text
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullwidth]: isFullWidth,
          [styles.loading]: isLoading,
          [styles.disabled]: disabled,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading spinner indicator */}
      {isLoading && <div className={styles.spinner} />}

      {/* Left icon if provided and not loading */}
      {!isLoading && leftIcon && (
        <span className={styles.leftIcon}>{leftIcon}</span>
      )}

      {/* Button content/children */}
      {children}

      {/* Right icon if provided and not loading */}
      {!isLoading && rightIcon && (
        <span className={styles.rightIcon}>{rightIcon}</span>
      )}
    </button>
  );
};
