import { useAuth } from "../../hooks/useAuth";
import { BaseAuthForm } from "../BaseAuthForm";
import { LoginCredentials } from "../../types/auth";
import { validationLoginSchema } from "../../../../../shared/validations/authSchemas";

const initialValues: LoginCredentials = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const { login } = useAuth();

  return (
    <BaseAuthForm
      initialValues={initialValues}
      validationSchema={validationLoginSchema}
      mutation={login}
      formType="login"
    />
  );
};
