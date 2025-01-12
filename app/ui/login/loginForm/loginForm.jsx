"use client";

// import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { login } from '../../../lib/action'

const LoginForm = () => {
  //const [state, formAction] = useFormState(authenticate, undefined);

  return (
    // action={formAction} 
    <form action={login} className={styles.form}> 
      <h1>Login</h1>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button type='submit'>Login</button>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
