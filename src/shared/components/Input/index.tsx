import React from "react";
import { Field } from "formik";
import styles from "./styles.module.css";

interface InputProps {
  label?: string;
  error?: string;
  type: "text" | "password" | "email";
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type = "text",
  name,
  placeholder,
  className,
  disabled = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const checkboxId = `showPassword-${name}`;

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <Field
          as="input"
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.error : ""} ${
            className || ""
          } `}
        />
      </div>
      {type === "password" && (
        <div className={styles.passwordToggleWrapper}>
          <Field
            as="input"
            type="checkbox"
            id={checkboxId}
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className={styles.passwordToggle}
          />
          <label htmlFor={checkboxId} className={styles.passwordToggleLabel}>
            Show Password
          </label>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      )}
    </div>
  );
};
