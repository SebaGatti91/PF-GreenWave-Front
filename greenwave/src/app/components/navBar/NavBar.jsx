"use client";
import Link from "next/link";
import Button from "../button/Button";
import SearchBar from "../searchBar/SearchBar";
import { usePathname } from "next/navigation";
import {signIn} from 'next-auth/react'

const LogoSection = () => (
  <div className="flex items-center">
    <Link href="/">
      <img
        className="ml-2"
        src="/images/Green-Wave.png"
        alt=""
        style={{ width: "100px" }}
      />
    </Link>
  </div>
);

const SearchSection = ({ pathname }) => (
  <section className="flex justify-center items-center mx-auto">
    {pathname === "/store" && <SearchBar />}
  </section>
);

const NavigationLinks = () => (
  <section className="flex gap-10 items-center">
    <Link
      className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{ fontFamily: "font-serif" }}
      href="/"
    >
      Home
    </Link>

    <Link
      className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{ fontFamily: "font-serif" }}
      href="/about"
    >
      About
    </Link>

    <Link
      className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{ fontFamily: "font-serif" }}
      href="/store"
    >
      Store
    </Link>

    <Link
      className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{ fontFamily: "font-serif" }}
      href="/tips"
    >
      Tips
    </Link>

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

</section>
);

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav
        className="py-3 items-center text-white flex justify-between"
        style={{ backgroundColor: "#535E4A" }}
      >
        <LogoSection />
        <SearchSection pathname={pathname} />
        <NavigationLinks />
      </nav>
    </div>
  );
};

export default NavBar;
