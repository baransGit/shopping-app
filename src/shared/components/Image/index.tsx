/**
 * Reusable Image Component
 * A robust image component that handles:
 * - Lazy loading
 * - Loading states with skeleton placeholder
 * - Error states with fallback image
 * - Different object-fit options
 * - Customizable loading behavior
 */

import { memo, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { PLACEHOLDER } from "../../constants/images";

// Available object-fit options for image display
type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";

/**
 * Props interface for the Image component
 * Extends native img HTML attributes, excluding 'loading'
 */
interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  src: string; // Source URL of the image
  alt: string; // Alt text for accessibility
  fit?: ImageFit; // Object-fit property for image display
  fallback?: string; // Fallback image URL for error states
  loading?: "eager" | "lazy"; // Loading behavior (eager or lazy)
}

export const Image = memo(
  ({
    src,
    alt,
    className,
    fit = "cover",
    fallback = PLACEHOLDER,
    loading = "lazy",
    onError,
    ...props
  }: ImageProps) => {
    // State for tracking error and loading states
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Handles image loading errors
     * Falls back to placeholder image and calls optional error callback
     */
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    };

    return (
      <div
        className={classNames(styles.container, className, {
          [styles.loading]: isLoading,
        })}
      >
        {/* Main image element */}
        <img
          src={hasError ? fallback : src}
          alt={alt}
          className={styles.image}
          loading={loading}
          onError={handleError}
          onLoad={() => setIsLoading(false)}
          style={{ objectFit: fit }}
          {...props}
        />
        {/* Loading skeleton placeholder */}
        {isLoading && <div className={styles.skeleton} />}
      </div>
    );
  }
);

Image.displayName = "Image";
