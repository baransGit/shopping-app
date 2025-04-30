import { memo, useState } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'
const PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDMtMjdUMTU6NDA6MjMtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDMtMjdUMTU6NDA6MjMtMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAzLTI3VDE1OjQwOjIzLTA0OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE1Y2Y5ZDM3LTU2NDYtNDJlYi05MTI4LTk2ZDQzNzY3NmFhYSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjIzYzZiMjQwLTJiMDUtYzU0Ny1iOWRmLTZlNjExNjk4MzQ1YiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjEyMzQ1Njc4LWNkZTctNDFlYi1hNWY5LTY4YjQ1Njc4OTFhYSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyMzQ1Njc4LWNkZTctNDFlYi1hNWY5LTY4YjQ1Njc4OTFhYSIgc3RFdnQ6d2hlbj0iMjAyMy0wMy0yN1QxNTo0MDoyMy0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE1Y2Y5ZDM3LTU2NDYtNDJlYi05MTI4LTk2ZDQzNzY3NmFhYSIgc3RFdnQ6d2hlbj0iMjAyMy0wMy0yN1QxNTo0MDoyMy0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YjqHUwAAIABJREFUeJztnXd4VFX6xz/3Tk0jjYReQhJ6EQHpKoIKqIC9rL2sveyuq7v2trb1p65lV9e1rV1EQQEFpEsJhBogIYX0TDKT6ff8/pgECCEwk8ydO5P5PM88E+bOPe95M3O/c857zvueI6mqyv8wePHCCw+8UPBCQpIkJEBFRUVBAmQkVEBCQpJAQkIGZEBGQgJkQEZCRkZGRkZCRgIkJGQkJCQkJGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGR'
type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
    src: string;
    alt: string;
    fit?: ImageFit;
    fallback?: string;
    loading?: 'eager' | 'lazy';
}

export const Image = memo(({
    src,
    alt,
    className,
    fit = 'cover',
    fallback = PLACEHOLDER,
    loading = 'lazy',
    onError,
    ...props
}: ImageProps) => {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHasError(true)
        onError?.(e)  
    }

    return (
        <div 
            className={classNames(styles.container, className, {
                [styles.loading]: isLoading
            })}
        >
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
            {isLoading && <div className={styles.skeleton} />}
        </div>
    )
})

Image.displayName = 'Image'