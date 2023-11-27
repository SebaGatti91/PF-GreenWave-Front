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
          <Link
            className="text-xl  hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
            style={{
              fontFamily: "font-serif", ':hover': {
                background:
                  'linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)',
              },
            }}
            href="/post-product"
          >
            Post
          </Link>
          <Link
            className="text-xl  hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
            style={{
              fontFamily: "font-serif", ':hover': {
                background:
                  'linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)',
              },
            }}
            href="/tips"
          >
            Donation
          </Link>
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
