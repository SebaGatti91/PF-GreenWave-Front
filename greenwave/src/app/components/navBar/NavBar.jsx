"use client";
import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import { usePathname } from "next/navigation";
import ButtonAuth from "../buttonAuth/ButtonAuth";
import { useSession } from "next-auth/react";
import { CartContext } from "../cart/cartContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { GlobalUser } from "../users/globalUsers";
import './NavBar.css'

const LogoSection = () => {
  const { user } = useContext(GlobalUser);
  return (
    <div className="flex items-center flex-row gap-10 logo">
      <Link className="" href="/">
        <img
          className="ml-2"
          src="/images/Green-Wave.png"
          alt=""
          style={{ width: "100px" }}
        />
      </Link>

      <Link href={"/profile"} className="direccion flex flex-row gap-5">
        <Image
          src={"/images/ubicacion.png"}
          alt={"ubicacionImage"}
          height={30}
          width={30}
        />
        <p>{user?.address ? user?.address : "Insert adress"}</p>
      </Link>
    </div>
  );
};

const SearchSection = ({ pathname }) => (
  <section className="flex justify-center items-center mx-auto">
    {pathname === "/store" && <SearchBar />}
  </section>
);

const NavigationLinks = ({ session, totalItems, isMenuOpen, toggleMenu }) => {
  return (
    <section id="contenedor-menu" className={`flex gap-10 items-center ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}>
      <img className="menu" src="/images/burger_menu.png" alt="menu abierto" id="abrir" onClick={toggleMenu} />
      <img className="menu" src="/images/cerrar_menu.png" alt="menu cerrado" id="cerrar" onClick={toggleMenu} />
     <div className="enlaces">
     <Link
        className="link text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300 "
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
        className="link text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
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
        className="link text-xl hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
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
        className="link text-xl  hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
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
        className="link hover:cursor-pointer hover:transform hover:scale-110 transition-transform duration-300"
      >
        <div className="flex items-center gap-4">
          <img
            src="/images/shoppingCart.png"
            alt="shoppingCartImage"
            style={{ width: "25px", height: "25px" }}
          />
          <div
            style={{
              backgroundColor: "white",
              color: "green",
              borderRadius: "100%",
              width: "20px",
              textAlign: "center",
            }}
          >
            {totalItems}
          </div>
        </div>
      </Link>
     </div>
      

      <div className="mr-8 mt-2">
        <ButtonAuth />
      </div>
    </section>
  )
};

const NavBar = () => {
  const pathname = usePathname;
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    return acc + count;
  }, 0);
  return (
    <div>
      <nav
        className="py-3 items-center text-white flex justify-between navegacion"
        style={{
          background:
            "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
        }}
      >
        <LogoSection />

        <NavigationLinks session={session} totalItems={totalItems} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav>
    </div>
  );
};

export default NavBar;
