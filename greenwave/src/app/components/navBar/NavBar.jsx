"use client";
import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import { usePathname } from "next/navigation";
import ButtonAuth from "../buttonAuth/ButtonAuth";
import { useSession } from "next-auth/react";
import { CartContext } from "../cart/cartContext";
import { useContext } from "react";
const LogoSection = () => (
  <div className="flex items-center">
    <Link className="" href="/">
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

const NavigationLinks = ({ session, totalItems }) => (
  <section className="flex gap-10 items-center">
    <Link
      className="text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300 "
      style={{
        fontFamily: "font-serif",
        ":hover": {
          background:
            "linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)",
        },
      }}
      href="/homepage"
    >
      Home
    </Link>

    <Link
      className="text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{
        fontFamily: "font-serif",
        ":hover": {
          background:
            "linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)",
        },
      }}
      href="/about"
    >
      About
    </Link>

    <Link
      className="text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{
        fontFamily: "font-serif",
        ":hover": {
          background:
            "linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)",
        },
      }}
      href="/store"
    >
      Store
    </Link>

    <Link
      className="text-xl  hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
      style={{
        fontFamily: "font-serif",
        ":hover": {
          background:
            "linear-gradient(to right top, #527e7b, #4e8780, #4b9183, #499a84, #4ba384)",
        },
      }}
      href="/tips"
    >
      Tips
    </Link>
    <Link
      href="/store/buycart"
      className="hover:cursor-pointer hover:transform hover:scale-110 transition-transform duration-300"
    >
      <div className="flex items-center gap-4">
        <img
          src="/images/shoppingCart.png"
          alt="shoppingCartImage"
          style={{ width: "30px", height: "30px" }}
        />
        <div
          style={{
            backgroundColor: "white",
            color:
              "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
            borderRadius: "100%",
            width: "22px",
            textAlign: "center",
          }}
        >
          {totalItems}
        </div>
      </div>
    </Link>

    <div className="mr-8 mt-2">
      <ButtonAuth />
    </div>
  </section>
);

const NavBar = () => {
  const pathname = usePathname;
  const { data: session } = useSession();

  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    return acc + count;
  }, 0);
  return (
    <div>
      <nav
        className="py-3 items-center text-white flex justify-between "
        style={{
          background:
            "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
        }}
      >
        <LogoSection />
        {/* <SearchSection pathname={pathname} /> */}
        <NavigationLinks session={session} totalItems={totalItems} />
      </nav>
    </div>
  );
};

export default NavBar;
