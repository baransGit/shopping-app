import styles from "./styles.module.css";
import { RegisterForm } from "../../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};
