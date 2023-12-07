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
    <div>
      <h2 className="flex flex-row justify-evenly">My Products</h2>
      {userProducts?.map((product) => (
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
  );
};

export default MyProducts;
