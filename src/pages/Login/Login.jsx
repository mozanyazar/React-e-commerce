import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AuthStore } from "../../store/Auth";
const Login = () => {
  const { signupWithFacebook, signupWithGoogle, signInFn } = AuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    if (email.includes("@") && password.length >= 6) {
      signInFn(email, password);
    }
  };
  return (
    <main className={styles.loginWrapper}>
      <div className={styles.loginInner}>
        <h1 className={styles.loginTitle}>Log In</h1>

        <form onSubmit={loginHandler} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email/Username:</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>

        <Link to={"/signup"} className={styles.link}>
          <Icon fontSize={50} color="#e4a951" icon="ion:game-controller" />
          <span>
            Not registered?, <b>Sign Up</b>
          </span>
          <Icon fontSize={50} color="#e4a951" icon="ion:game-controller" />
        </Link>
        <div className={styles.socialMedia}>
          <button onClick={() => signupWithFacebook()}>
            Login with Facebook
            <Icon icon="ic:round-facebook" />
          </button>
          <button onClick={() => signupWithGoogle()}>
            Login with Google
            <Icon icon="ion:logo-google" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
