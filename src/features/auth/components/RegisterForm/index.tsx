import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles.module.css";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name cannot contain numbers or special characters"
    )
    .required("Name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z]+$/,
      "First name cannot contain numbers or special characters"
    )
    .required("Last name is required"),
});
const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export const RegisterForm = () => {
  const { register, error: authError } = useAuth();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await register(values);
        } catch (error) {
          console.error("Registration failed", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          <Input
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your username"
            error={touched.username ? errors.username : undefined}
            useFormik={true}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            error={touched.email ? errors.email : undefined}
            useFormik={true}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            error={touched.password ? errors.password : undefined}
            useFormik={true}
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            useFormik={true}
          />
          <Input
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            error={touched.firstName ? errors.firstName : undefined}
            useFormik={true}
          />
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            error={touched.lastName ? errors.lastName : undefined}
            useFormik={true}
          />
          {authError && (
            <p className={styles.error}>
              {(() => {
                // Check username-related errors from API
                if (authError.includes("username")) {
                  return "This username is already taken";
                }
                // Check email-related errors from AP
                if (authError.includes("email")) {
                  return "This email is already registered";
                }
                // Check validation errors from API
                if (authError.includes("validation")) {
                  return "Please check your information";
                }
                // Return default error message if no specific error matched
                return "Registration failed. Please try again.";
              })()}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
