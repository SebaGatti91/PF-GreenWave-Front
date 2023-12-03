"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import styles from "./LoginPage.module.css";
import {createUser} from "../lib/data"


const LoginPage = () => {
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // Utiliza un estado para rastrear si ya se ha ejecutado la lógica de creación de usuario
  const [userCreation, setUserCreation] = useState(false);

  useEffect(() => {

    if (session?.user && !userCreation) {
      setUserCreation(true);
      createUser(session.user);
      router.replace("/homepage");
    }

  }, [session, userCreation, router]);

  const handleSignInWithProvider = async (providerId) => {
    if (providerId === "credentials") {
      const responseNextAuth = await signIn(providerId, {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        // Establece manualmente el mensaje de error deseado
        setErrors("Error de inicio de sesión");
      } else {
        // Éxito en la autorización con credenciales
        setErrors(""); // Limpiar errores
      }
    } else {
      // Si el proveedor es otro, realiza el inicio de sesión normal
      const responseNextAuth = await signIn(providerId, { redirect: false });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
      } else {
        setErrors(""); // Limpiar errores
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div>
        <button
          className={styles.button}
          onClick={() => handleSignInWithProvider("auth0")}
        >
          Sign in with Email and Password
        </button>
      </div>
      {errors && (
        <div
          className={`${styles.alert} ${styles.errorText} alert-danger mt-2`}
        >
          <ul className={styles.alertList}>
            <li>{errors}</li>
          </ul>
        </div>
      )}
      <p className={styles.orText}>- - - OR - - -</p>
      <div className={styles.providers}>
        <button
          className={styles.providerButton}
          onClick={() => handleSignInWithProvider("google")}
        >
          Sign in with Google
        </button>
        <button
          className={styles.providerButton}
          onClick={() => handleSignInWithProvider("github")}
        >
          Sign in with GitHub
        </button>
        <button
          className={styles.providerButton}
          onClick={() => handleSignInWithProvider("facebook")}
        >
          Sign in with Facebook
        </button>
        {/* Agrega más botones para otros proveedores si es necesario */}
      </div>
    </div>
  );
};

export default LoginPage;
