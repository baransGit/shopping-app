import styles from "./styles.module.css";

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kayıt Ol</h1>
      <p className={styles.login}>
        Zaten hesabınız var mı?{" "}
        <a href="/login" className={styles.link}>
          Giriş Yap
        </a>
      </p>
    </div>
  );
};
