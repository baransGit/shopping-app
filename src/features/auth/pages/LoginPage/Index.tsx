import { LoginForm } from "../../components/LoginForm";

import styles from "./styles.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <LoginForm />
      <p className={styles.register}>
        Don't have an account?{" "}
        <a href="/register" className="styles.link">
          Register
        </a>
      </p>
    </div>
  );
};
