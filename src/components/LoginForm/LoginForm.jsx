import { useForm } from "react-hook-form";

import ArrowButton from "../ArrowButton/ArrowButton";
import Logo from "../Logo/Logo";
import PasswordInput from "../PasswordInput/PasswordInput";

import styles from "./login-form.css";

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Logo className={styles.logo} full />

      <PasswordInput
        className={styles.input}
        placeholder="Password"
        {...register("password")}
      />

      <ArrowButton className={styles.button}>Login</ArrowButton>
    </form>
  );
};

export default LoginForm;
