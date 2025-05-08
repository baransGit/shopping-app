import React from "react";
import { Field, FieldProps } from "formik";

import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: "text" | "password" | "email";
  name: string;
  useFormik?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  type = "text",
  name,
  useFormik = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const renderInput = (fieldProps?: FieldProps) => (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          type={showPassword ? "text" : type}
          className={`${styles.input} ${error ? styles.error : ""} ${
            className || ""
          }`}
          {...(useFormik ? fieldProps?.field : props)}
          name={name}
        />
        {type === "password" && (
          <div className={styles.passwordToggleWrapper}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handlePasswordToggle}
              className={styles.passwordToggle}
            />
            <label
              htmlFor="showPassword"
              className={styles.passwordToggleLabel}
            >
              Show Password
            </label>
          </div>
        )}

        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
  return useFormik ? (
    <Field name={name}>
      {(fieldProps: FieldProps) => renderInput(fieldProps)}
    </Field>
  ) : (
    renderInput()
  );
};
