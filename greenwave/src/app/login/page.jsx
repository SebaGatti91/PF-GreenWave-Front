"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import styles from "./LoginPage.module.css";
import { createUser } from "../lib/data";

const LoginPage = () => {
  const [errors, setErrors] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const frontURL = process.env.FRONT
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
        callbackUrl: frontURL + "/homepage",
      });
      if (responseNextAuth?.error) {
        // Establece manualmente el mensaje de error deseado
        setErrors("Error de inicio de sesión");
      } else {
        // Éxito en la autorización con credenciales
        setErrors(""); // Limpiar errores
      }
    } else {
      const responseNextAuth = await signIn(providerId, {
        redirect: false,
        callbackUrl: frontURL + "/homepage", 
      });
  
      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
      } else {
        setErrors(""); // Limpiar errores
      }
    }
  };


  return (
    <div className={ `${styles.container} flex justify-center items-center h-full`}>
     
      <div className=' flex-grow flex p-2  h-[450px] mt-12 max-w-[350px] justify-around mb-12 pl-[50px] bg-neutral-400 items-center shadow-lg shadow-lime-900 rounded-xl'
        >
          
        <div className="text-center mr-10">
          <h1 className={styles.title}>Login</h1>
          <div>
            <button
              className={styles.button}
              onClick={() => handleSignInWithProvider("auth0")}
            >
              <img
                src="/images/email.png"
                alt="google"
                style={{ width: "22px", height: "22px", marginRight: '16px' }}
              />
              Sign in with Email    
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

          <p className={styles.orText}>Other methods</p>
          <div className={styles.providers}>
            <button
              className={styles.providerButton}
              onClick={() => handleSignInWithProvider("google")}
            >
              <img
                src="/images/google.png"
                alt="google"
                style={{ width: "22px", height: "22px", marginRight: '16px' }}
              />
              Sign in with Google
            </button>
            <button
              className={styles.providerButton}
              onClick={() => handleSignInWithProvider("github")}
            >
              <img
                src="/images/github.png"
                alt="github"
                style={{ width: "22px", height: "22px", marginRight: '16px' }}
              />
              Sign in with GitHub
            </button>
            {/* <button
              className={styles.providerButton}
              onClick={() => handleSignInWithProvider("facebook")}
            >
              Sign in with Facebook
            </button> */}
            {/* Agrega más botones para otros proveedores si es necesario */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
