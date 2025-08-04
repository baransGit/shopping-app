import { useAuth } from "../../hooks/useAuth";
import { BaseAuthForm } from "../BaseAuthForm";
import type { RegisterCredentials } from "../../types/auth";
import { validationRegisterSchema } from "../../../../../shared/validations/authSchemas";

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
      validationSchema={validationRegisterSchema}
      mutation={register}
      formType="register"
    />
  );
};
