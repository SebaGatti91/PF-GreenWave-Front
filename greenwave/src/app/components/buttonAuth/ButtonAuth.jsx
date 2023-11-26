"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session?.user ? (
        <>
          <img
            src={session.user.image}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => signOut()}
            className="py-1 px-10 mr-10 bg-hover hover:bg-boton"
            style={{
              fontFamily: "font-serif",
              borderRadius: "2em 2em",
              boxShadow: "2px 3px black",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn()}
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
