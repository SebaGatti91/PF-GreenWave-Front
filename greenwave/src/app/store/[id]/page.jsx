"use client";
import products from "../products.json";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function Detail() {
  const params = useParams();
  const { id } = params;
  // Encuentra el producto correspondiente en base al ID
  const product = products.find((product) => product.id === id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
      <div className="flex justify-center items-center p-7 ">
    <div className=" p-7 m-5 border flex flex-col md:flex-row  bg-lime-50 rounded-lg shadow-2xl">
        <div className="flex justify-center md:w-1/2 ">
      <Image className="p-2 shadow-2xl rounded-lg " src={product.img} alt={product.name} width={500} height={500} />
      </div>
      <div className="md:w-1/2">
      <div className="text-center p-3 ml-3">
        <h3 className="font-bold">{product.name}</h3>
        <p>Precio: ${product.price}</p>
        <p>{product.description}</p>
        <button className="bg-lime-800 hover:bg-hover text-white m-3 px-3 py-1 rounded">Add to Cart</button>
      </div>
      </div>
    </div>
  </div>
  
  
  );
}
