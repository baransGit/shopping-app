import { Link } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";

import styles from "./styles.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <LoginForm />
      <p className={styles.register}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </p>
    </div>
  );
};
