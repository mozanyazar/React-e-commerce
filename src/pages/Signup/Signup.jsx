import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./Signup.module.scss";
import { useFormik, ErrorMessage } from "formik";
import * as yup from "yup";
import { AuthStore } from "../../store/Auth";

function Signup() {
  const { createUser, signupWithGoogle, signupWithFacebook } = AuthStore();
  const handleFormSubmit = async (values, actions) => {
    console.log("ozan");
    try {
      await createUser(values.email, values.password, values.name);
    } catch (err) {
      console.log(err.message);
    }
    actions.resetForm();
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, "Password must be min 6 character")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must match"),
  });
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleFormSubmit,
    validationSchema: validationSchema,
  });
  return (
    <main className={styles.signupWrapper}>
      <div className={styles.signupInner}>
        <h1 className={styles.signupTitle}>User Registration </h1>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.formInner}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name:</label>
              <input
                name="name"
                onChange={handleChange}
                value={values.name}
                type="text"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                onChange={handleChange}
                value={values.email}
                type="email"
                name="email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                onChange={handleChange}
                value={values.password}
                type="password"
                name="password"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">
                Password:{" "}
                <span className={styles.passwordConfirm}>
                  {errors.confirmPassword}
                </span>
              </label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
                type="password"
                className={`${errors.confirmPassword}` && styles.error}
              />
            </div>
          </div>
          <button type="submit" className={styles.signupButton}>
            Sign up
          </button>
        </form>

        <Link to={"/login"} className={styles.link}>
          <Icon fontSize={50} color="#e4a951" icon="ion:game-controller" />
          <span>
            Already signed up? <b>Login</b>
          </span>
          <Icon fontSize={50} color="#e4a951" icon="ion:game-controller" />
        </Link>
        <div className={styles.socialMedia}>
          <button onClick={() => signupWithFacebook()}>
            signup with Facebook
            <Icon icon="ic:round-facebook" />
          </button>
          <button onClick={() => signupWithGoogle()}>
            signup with Google
            <Icon icon="ion:logo-google" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Signup;
