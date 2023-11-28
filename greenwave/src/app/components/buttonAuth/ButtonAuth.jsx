"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleLogin = async (provider) => {
    await signIn(provider, {
      onSuccess: async () => {
        const session = useSession(); // No se utiliza await aquí
        if (session) {
          router.push('/');
        }
      },
    });
  };


  return (
    <>
      {session?.user ? (
        <>
          <img
            src={session.user.image || '../../../../public/images/user.png'}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={() => handleLogout()}
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
