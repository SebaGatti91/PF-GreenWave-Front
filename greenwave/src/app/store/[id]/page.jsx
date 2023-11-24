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
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <h3>{product.name}</h3>
      <Image src={product.img} alt={product.name} width={500} height={500} />
      <p>Precio: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
