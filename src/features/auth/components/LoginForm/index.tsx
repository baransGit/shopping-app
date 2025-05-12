import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../../../shared/components/Input";
import styles from "./styles.module.css";
import { Button } from "../../../../shared/components/Button";
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});
const initialValues = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const { login, error: authError } = useAuth();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await login(values);
        } catch (error) {
          console.error("Login failed", error);
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
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            error={touched.password ? errors.password : undefined}
            useFormik={true}
          />
          {authError && (
            <p className={styles.error}>
              {authError === "Invalid credentials"
                ? "Invalid username or password"
                : "Login failed"}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
