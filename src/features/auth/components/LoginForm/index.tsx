import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { BaseAuthForm } from "../BaseAuthForm";
import { LoginCredentials } from "../../types/auth";

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

const initialValues: LoginCredentials = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const { login } = useAuth();

  return (
    <BaseAuthForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      mutation={login}
      formType="login"
    />
  );
};
