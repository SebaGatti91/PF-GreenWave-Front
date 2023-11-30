"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../button/Button";

export default function ButtonAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/homepage" });
  };

  const handleLogin = async (provider) => {
    await signIn(provider, {
      onSuccess: async () => {
        const session = useSession();
        if (session) {
          router.push("/homepage");
        }
      },
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionClick = (option) => {
    // Puedes agregar lógica adicional aquí al seleccionar una opción

    // Aquí puedes redirigir o realizar otras acciones según la opción seleccionada

    // Cerrar el menú después de seleccionar una opción
    return setMenuVisible(false);
  };

  return (
    <>
      {session?.user ? (
        <>
          <div className="relative inline-block">
            <img
              src={session.user.image || "../../../../public/images/user.png"}
              alt=""
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleMenu}
            />
            {menuVisible && (
              <div
                className=" mt-5 right-0  w-20 space-y-2 absolute"
                style={{
                  background:
                    "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
                }}
              >
                <div>
                  <Button link={"/favorites"} text={"Favorites"} />
                </div>

                <div>
                  <Button link={"/profile"} text={"Profile"} />
                </div>
                <div>
                  <button
                    onClick={() => handleLogout()}
                    className="flex items-center"
                  >
                    <span>Logout</span>
                    <img
                      src="/images/logOut.png"
                      alt="logOutImage"
                      className="h-5 w-5 ml-2"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <button
          onClick={() => handleLogin()}
          className="py-1 px-10 mr-10 bg-hover hover:bg-boton"
          style={{
            fontFamily: "font-serif",
            borderRadius: "2em 2em",
            boxShadow: "2px 3px black",
          }}
        >
          Login
        </button>
      )}
    </>
  );
}
