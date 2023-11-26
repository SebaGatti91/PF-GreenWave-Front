"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithProvider = async (providerId) => {
    // Si el proveedor es "credentials", realiza el inicio de sesión con email y password
    if (providerId === "credentials") {
      const responseNextAuth = await signIn(providerId, { email, password, redirect: false });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }
    } else {
      // Si el proveedor es otro, realiza el inicio de sesión normal
      const responseNextAuth = await signIn(providerId, { redirect: false });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }
    }
    // No necesitas redireccionar aquí, la redirección puede ser manejada por el callback de signIn (ver)
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div>
        <input
          type="email"
          placeholder="example@example.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => handleSignInWithProvider("credentials")}
        >
          Sign in with Email and Password
        </button>
      </div>
      {errors && (
        <div className={`${styles.alert} alert-danger mt-2`}>
          <ul className={styles.alertList}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <p className={styles.orText}>- - - OR - - -</p>
      <div className={styles.providers}>
        <button className={styles.providerButton} onClick={() => handleSignInWithProvider("google")}>
          Sign in with Google
        </button>
        <button className={styles.providerButton} onClick={() => handleSignInWithProvider("github")}>
          Sign in with GitHub
        </button>
        <button className={styles.providerButton} onClick={() => handleSignInWithProvider("facebook")}>
          Sign in with Facebook
        </button>
        {/* Agrega más botones para otros proveedores si es necesario */}
      </div>
    </div>
  );
};

export default LoginPage;

