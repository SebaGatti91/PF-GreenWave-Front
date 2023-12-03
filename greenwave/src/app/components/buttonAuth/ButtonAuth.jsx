"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  useEffect(() => {
    // Si el pathname cambia, cerrar el menú
    if (pathname !== prevPathname.current) {
      setMenuVisible(false);
    }
    // Actualizar el pathname anterior
    prevPathname.current = pathname;
  }, [pathname]);

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
    switch (option) {
      case "favorites":
        router.push("/favorites");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        handleLogout();
        break;

      default:
    }

    setMenuVisible(false);
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
                <button onClick={() => handleOptionClick("favorites")}>
                  Favorites
                </button>
                <button onClick={() => handleOptionClick("profile")}>
                  Profile
                </button>
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
