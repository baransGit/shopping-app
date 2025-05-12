import { Formik, Form } from "formik";
import { Button } from "../../../../shared/components/Button";
import { Input } from "../../../../shared/components/Input";
import { LoginCredentials, RegisterCredentials } from "../../types/auth";
interface BaseAuthFormProps {
  initialValues: LoginCredentials | RegisterCredentials;
  validationSchema: any;
  onSubmit: (values: any) => Promise<void>;
  formType: "login" | "register";
  error?: string;
}

export const BaseAuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  formType,
  error,
}: BaseAuthFormProps) => {
  const inputFields = {
    login: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter your username",
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
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          {inputFields[formType].map((field) => (
            <Input
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              error={touched[field.name] ? errors[field.name] : undefined}
              useFormik={true}
            />
          ))}
          {error && (
            <p className={styles.error}>
              {(() => {
                if (error.includes("username")) {
                  return "This username is already taken";
                }
                if (error.includes("email")) {
                  return "This email is already registered";
                }
                if (error.includes("validation")) {
                  return "Please check your information";
                }
                return formType === "login"
                  ? "Invalid username or password"
                  : "Registration failed. Please try again.";
              })()}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? `${formType === "login" ? "Logging in..." : "Registering..."}`
              : `${formType === "login" ? "Login" : "Register"}`}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
