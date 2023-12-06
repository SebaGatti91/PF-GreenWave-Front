"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { GlobalUser } from "../users/globalUsers";
export default function ButtonAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const { user } = useContext(GlobalUser);
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
        case "post product":
        router.push("/post-product");
        break;
      case "dashboard":
        router.push("/dashboard");
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
                className="mt-5 right-0 w-40 space-y-2 absolute"
                style={{
                  background:
                  "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
                  zIndex: 1 
                }}
              >
                <div className="flex flex-col" style={{border: '1px solid gray'}}>
                  <button className="py-1 hover:bg-hover text-left pl-3" style={{borderBottom: '1px solid gray'}} onClick={() => handleOptionClick("favorites")}>
                    Favorites
                  </button>
                  <button className="py-1 hover:bg-hover text-left pl-3" style={{borderBottom: '1px solid gray'}}  onClick={() => handleOptionClick("profile")}>
                    Profile
                  </button>
                  <button className="py-1 hover:bg-hover text-left pl-3" style={{borderBottom: '1px solid gray'}}  onClick={() => handleOptionClick("post product")}>
                    Sell a product
                  </button>
                  {user.admin === true && session?.user && (
                    <button className="py-1 hover:bg-hover text-left ml-3" onClick={() => handleOptionClick("dashboard")}>
                      Dashboard
                    </button>
                  )}
                  <div className="text-center flex justify-start pl-3 hover:bg-hover">
                    <button
                      onClick={() => handleLogout()}
                      className="py-1 flex flex-row"
                    >
                      <span className="text-left mr-2">Logout</span>
                      <img
                        src="/images/logOut.png"
                        alt="logOutImage"
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
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
