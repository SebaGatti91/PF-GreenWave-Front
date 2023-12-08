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
  console.log(session);
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
    <div className="container flex justify-center">
      <div className='relative flex-grow flex p-20 bg-hover mt-12 mb-12 pl-6 pr-3 shadow-2xl rounded-xl'
        style={{ maxWidth: '400px', background: '#6CA188', border: '1px solid black' }}>

        <div className="absolute top-8 right-20 m-1 bg-hover-clear rounded-xl shadow-2xl border-b-gray-400"
          style={{ height: '400px', width: '310px', zIndex: '1', transform: 'translateX(100%)', background: '#50816A', border: '1px solid black' }}>
          {/* Contenido del segundo div */}
          <h1 className="text-center pt-10 pb-6 text-3xl"
            style={{ textShadow: '2px 1px aliceblue' }}>Contact Us</h1>

          <div className="flex flex-row items-center ml-4">
            <img
              src="/images/ubicacion.png"
              alt="ubication"
              style={{ width: "22px", height: "22px" }}
            />
            <p className="text-left px-2 py-5 ml-2 text-lg">1234 Elm Street Suite 567 Citytown</p>
          </div>

          <div className="flex flex-row items-center ml-4">
            <img
              src="/images/correo.png"
              alt="mail"
              style={{ width: "22px", height: "22px", }}
            />
            <p className="text-left px-2 py-7 ml-2 text-lg">greenwave.page@gmail.com</p>
          </div>

          <div className="flex flex-row items-center ml-4">
            <img
              src="/images/telefono.png"
              alt="phone"
              style={{ width: "22px", height: "22px" }}
            />
            <p className="text-left px-2 py-8 ml-2 text-lg" >202-555-0128</p>
          </div>
        </div>

        <div className="text-center"> {/* Agregado contenedor para centrar */}
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
