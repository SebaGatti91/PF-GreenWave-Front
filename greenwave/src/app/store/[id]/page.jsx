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

    <div className="flex  justify-center items-center p-7 ">
      <div className="p-7 m-5 border flex flex-col bg-lime-50 rounded-lg shadow-2xl" style={{ width: '65%' }}>
        <div className="flex flex-row">
          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover" 
            src={product.img} alt={product.name} width={500} height={500}
            style={{ boxShadow: '4px 6px gray' }}
          />

          <div className="text-center p-3 ml-3">
            <h1 className="p-3 title-font font-medium"
              style={{ fontFamily: "font-serif", fontSize: '1.5em' }}>{product.name}</h1>
            <p className="font-bold text-left p-1" style={{ fontFamily: "font-serif", fontSize: '1.5em' }}>$ {product.price}</p>
            <p className="text-left p-1" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '1.1em' }}>{product.description}</p>

            <button
              className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded mt-20"
              style={{ border: '1px solid gray', borderRadius: '2em 2em' }}
            >Buy now</button>
             <button 
            className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded"
            style={{border: '1px solid gray', borderRadius: '2em 2em'}}
            > 🛒 Add to cart</button>

          </div>

        </div>

        <div className="flex flex-row  justify-center gap-8 mt-12 mb-8" style={{ width: '57%' }}>
          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300" 
            src={product.img} alt={product.name} width={200} height={250}
            style={{ boxShadow: '4px 4px gray' }}
          />

          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300" 
            src={product.img} alt={product.name} width={200} height={250}
            style={{ boxShadow: '4px 4px gray' }}
          />
        </div>

      </div>
      </div>
    </div>


  );
}
