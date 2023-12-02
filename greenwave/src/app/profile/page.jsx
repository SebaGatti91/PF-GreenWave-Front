"use client";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import Button from "../components/button/Button";
import { GlobalUser } from "../components/users/globalUsers";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();
  const usuario = session?.user;
  const { user } = useContext(GlobalUser);

  return (
    <div className="flex h-screen">
      <div className="w-1/6 flex-none h-full">
        <div
          className="text-white h-full"
          style={{
            background:
              "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051",
          }}
        >
          <ul className="h-full flex flex-col justify-between text-center ">
            <li>
              <Button link={"/post-product"} text={"Sell a product"} />
            </li>
            <li>
              <Button link={"/favorites"} text={"My favorites"} />
            </li>
            <li>
              <Button link={"/myShopping"} text={"My shopping"} />
            </li>
            {/* <li>
              <Button link={"/"} text={"My credits"} />
            </li> */}
            <li>
              <Button link={"/donation"} text={"Donate"} />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-row justify-evenly">
          <h1>Welcome back {usuario?.name} !!!</h1>
        </div>
        <h2 className="flex flex-row justify-evenly">My Products</h2>
        <div
          className="flex flex-wrap justify-evenly m-10 p-10"
          style={{ backgroundColor: "#D1D7BF" }}
        >
          {user.productsCreados?.map((product) => (
            <div key={product.id} className="w-1/2">
              <Link href={`/store/${product.id}`} className="flex items-center">
                <Image
                  className="w-60 h-40 rounded-md"
                  src={product.image}
                  alt={product.name}
                  height={150}
                  width={150}
                  style={{
                    maxWidth: "200px",
                    height: "150px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    border: "2px solid gray",
                  }}
                />
                <div className="flex flex-col text-start p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <h3 className="text-green-600">USD {product.price}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
