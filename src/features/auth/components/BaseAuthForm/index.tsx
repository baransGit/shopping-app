import { Formik, Form, FormikErrors, FormikTouched } from "formik";
import { Button } from "../../../../shared/components/Button";
import { Input } from "../../../../shared/components/Input";
import {
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  RegisterResponse,
} from "../../types/auth";
import { UseMutationResult } from "@tanstack/react-query";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

type AuthResponse = LoginResponse | RegisterResponse;

interface InputField {
  name: string;
  type: "text" | "password" | "email";
  label: string;
  placeholder: string;
}

interface BaseAuthFormProps<T extends Record<string, any>> {
  initialValues: T;
  validationSchema: any;
  mutation: UseMutationResult<AuthResponse, Error, T>;
  formType: "login" | "register";
}

export const BaseAuthForm = <T extends LoginCredentials | RegisterCredentials>({
  initialValues,
  validationSchema,
  mutation,
  formType,
}: BaseAuthFormProps<T>) => {
  const inputFields: Record<"login" | "register", InputField[]> = {
    login: [
      {
        name: "username",
        type: "text",
        label: "Email or Username",
        placeholder: "Enter your email or username",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
      },
    ],
    register: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter your username",
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "Confirm your password",
      },
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
      },
    ],
  } as const;

  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>
          {formType === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <Formik<T>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await mutation.mutateAsync(values);
            } catch (error) {
              console.error(`${formType} failed:`, error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting,
            errors,
            touched,
          }: {
            isSubmitting: boolean;
            errors: FormikErrors<T>;
            touched: FormikTouched<T>;
          }) => (
            <Form className={styles.form}>
              {inputFields[formType].map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  error={
                    touched[field.name as keyof T]
                      ? String(errors[field.name as keyof T])
                      : undefined
                  }
                />
              ))}
              {mutation.error && (
                <p className={styles.error}>
                  {(() => {
                    const errorMessage = mutation.error.message || "";
                    if (errorMessage.includes("username")) {
                      return "This username is already taken";
                    }
                    if (errorMessage.includes("email")) {
                      return "This email is already registered";
                    }
                    if (errorMessage.includes("validation")) {
                      return "Please check your information";
                    }
                    return formType === "login"
                      ? "Invalid username or password"
                      : "Registration failed. Please try again.";
                  })()}
                </p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending
                  ? `${
                      formType === "login" ? "Logging in..." : "Registering..."
                    }`
                  : `${formType === "login" ? "Login" : "Register"}`}
              </Button>
            </Form>
          )}
        </Formik>
        <div className={styles.switchAuthMode}>
          {formType === "login" ? (
            <p>
              Don't have an account?{" "}
              <Link to="/register" className={styles.authLink}>
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.authLink}>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
