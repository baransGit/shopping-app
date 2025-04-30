import  {memo} from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant? :ButtonVariant
    size? : ButtonSize
    isLoading?:boolean
    isFullWidth?:boolean
    leftIcon?:React.ReactNode; 
    rightIcon?:React.ReactNode;
}

export const Button = memo(({
    children,
    className,
    variant ='primary',
    size = 'medium',
    isLoading = false,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}:ButtonProps)=>{
    return(
        <button
            className = {classNames(
                styles.button,
                styles[variant],
                styles[size],
                {
                    [styles.fullwidth] :isFullWidth,
                    [styles.loading] :isLoading,
                    [styles.disabled] :disabled
                },
                className
            )}
            disabled={disabled || isLoading}
            {...props}
         >
            {isLoading && <div className = {styles.spinner}/>}
            {!isLoading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
         </button>   
    )

})
Button.displayName='Button'
