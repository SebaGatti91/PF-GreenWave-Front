"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import { fetchUserProducts } from "../lib/data";
import Link from "next/link";
import Image from "next/image";
const MyProducts = () => {
  const { user } = useContext(GlobalUser);
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    const userProductsData = async () => {
      try {
        const userProductsData = await fetchUserProducts(user?.email);
        setUserProducts(userProductsData);
      } catch (error) {
        console.error("Error fetching userProducts:", error);
        // Puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
      }
    };

    if (user?.email) {
      userProductsData();
    }
  }, [user]);

  return (
    <div
      className="w-3/4 flex flex-col justify-center"
      style={{ marginInline: "auto" }}
    >
      <h1
        className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
        style={{ width: "100%", marginInline: "auto" }}
      >
        My Products
      </h1>
      {userProducts?.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-row justify-between mb-10 mt-5 shadow-2xl rounded-lg pb-5 hover:transform hover:scale-105 transition-transform duration-300"
          style={{
            backgroundColor: "#D1D7BF",
            border: "1px solid gray",
          }}
        >
          <div className="absolute top-10 right-0">
            <h3
              className={`absolute bottom-0 right-0 m-2 px-2 rounded-lg ${
                product.paused === false ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ border: "1px solid #718096" }}
            >
              {product.paused === false ? "Active" : "Pause"}
            </h3>
          </div>
          <div className="flex flex-row">
            <Image
              className="w-60 h-40 rounded-md"
              src={product.image[0]}
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
              <h3
                className="font-bold py-1 text-left text-lg"
                style={{ width: "100%", textShadow: "1px 1px gray" }}
              >
                {product.name}
              </h3>
              <h3
                className="text-green-600 py-1 text-lg"
                style={{
                  color: "#8E9681",
                  textShadow: "1px 1px gray",
                }}
              >
                $ {product.price}
              </h3>
              <p className="py-1 w-full" style={{ height: "80px" }}>
                {product.description}
              </p>

              <Link
                href={`/store/${product.id}`}
                className="flex justify-start w-full"
              >
                <button
                  className="rounded-lg bg-button hover:bg-hover-clear"
                  style={{
                    width: "150px",
                  }}
                >
                  See more
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
