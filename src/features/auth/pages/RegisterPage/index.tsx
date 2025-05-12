import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/RegisterForm";
export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <RegisterForm />
      <p className={styles.login}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </p>
    </div>
  );
};
