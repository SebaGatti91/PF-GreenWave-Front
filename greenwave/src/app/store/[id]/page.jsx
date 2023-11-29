"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/cart/cartContext";


const loadDetail = async (id) => {
  const response = await axios.get(`http://localhost:3001/store/${id}`);
  return response.data;
};

export default async function Detail({ params }) {
  const { addToCart } = useCart();
  const product = await loadDetail(params.id);
 
  const addCart = () => {
    addToCart({id:params.id, name:product.name, image:product.image, price:product.price, rating:product.rating});
  };
  return (
    <div className="flex justify-center items-center p-7 ">
      <div
        className="p-7 m-5 border flex flex-col bg-lime-50 rounded-lg shadow-2xl"
        style={{ width: "65%" }}
      >
        <div className="flex flex-row">
          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover"
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            style={{ boxShadow: "4px 6px gray" }}
          />

          <div className="text-center p-3 ml-3">
            <h1
              className="p-3 title-font font-medium"
              style={{ fontFamily: "font-serif", fontSize: "1.5em" }}
            >
              {product.name}
            </h1>
            <p
              className="font-bold text-left p-1"
              style={{ fontFamily: "font-serif", fontSize: "1.5em" }}
            >
              $ {product.price}
            </p>
            <p
              className="text-left p-1"
              style={{ fontFamily: "Open Sans, sans-serif", fontSize: "1.1em" }}
            >
              {product.description}
            </p>

            <div>
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded mt-10"
                style={{ border: "1px solid gray", borderRadius: "2em 2em" }}
              >
                Buy now
              </button>
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded"
                style={{ border: "1px solid gray", borderRadius: "2em 2em" }}
                onClick={addCart}
              >
                🛒 Add to cart
              </button>
            </div>
            <Link href="/store">
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-4 py-1 rounded"
                style={{
                  border: "1px solid gray",
                  borderRadius: "2em 2em",
                  width: "50%",
                }}
              >
                Store
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-row justify-center w-1/2 gap-8 mt-12 mb-8">
          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300"
            src={product.image}
            alt={product.name}
            width={200}
            height={250}
            style={{ boxShadow: "4px 4px gray" }}
          />

          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300"
            src={product.image}
            alt={product.name}
            width={200}
            height={250}
            style={{ boxShadow: "4px 4px gray" }}
          />
        </div>
      </div>
    </div>
  );
}
