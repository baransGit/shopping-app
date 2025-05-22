import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { BaseAuthForm } from "../BaseAuthForm";
import type { RegisterCredentials } from "../../types/auth";
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

const initialValues: RegisterCredentials = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export const RegisterForm = () => {
  const { register } = useAuth();

  return (
    <BaseAuthForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      mutation={register}
      formType="register"
    />
  );
};
