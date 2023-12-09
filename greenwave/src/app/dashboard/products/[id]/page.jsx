"use client";
import { useState, useEffect } from "react";
import { fetchProductById, pauseProduct} from "../../../lib/data";
import Link from "next/link";
import Image from "next/image";

const ProductProfile = ({ params }) => {
  const [productView, setProductView] = useState([]);
  const productId = params.id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProductView(fetchedProduct);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handlePause = async (productId) => {
    try {
      await pauseProduct(productId);
      const updatedProduct = await fetchProductById(productId);
      setProductView(updatedProduct);

      console.log(`Usuario con ID ${productId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${productId}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Link href="/dashboard/products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to products
          </button>
        </Link>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col items-center">
          <Image
            src={productView.image || "/images/noavatar.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold mt-4">ID: {productView.id}</h2>
          <p>Name: {productView.name}</p>
          <p>Price: {productView.price}</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                productView.paused ? "text-red-500" : " text-green-500"
              } font-bold`}
            >
              {productView.paused ? "Paused" : "Active"}
            </span>
          </p>
          <button
            className={`${
             productView.paused
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handlePause(productView.id)}
          >
            {productView.paused ? "Active" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;
