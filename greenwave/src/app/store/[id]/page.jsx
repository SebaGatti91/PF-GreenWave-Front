"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/cart/cartContext";
import { useState, useEffect } from "react";
import "./detail.css"
import PostProduct from "../../post-product/page";
import Skeleton from "./Skeleton";

export default function Detail({ params, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  const [loading, SetLoading] = useState(true);
  const { addToCart, cart, countDownCart, countUpCart, removeFromCart } =
    useCart();

  const item = cart.find((item) => item.id === params.id);

  const loadProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/store/${id}`);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product detail:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, []);

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:3001/mercadoPago", [
        {
          title: product.name,
          unit_price: product.price,
          quantity: 1,
          currency_id: "ARS",
        },
      ]);
      console.log(response.data);
      window.location.href = response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) setPreferenceId(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  const handleAddToCart = () => {
    addToCart({
      id: params.id,
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
    });
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(params.id);
    setAddedToCart(false); // Cambia el estado a false al hacer clic en el basurero
  };

  useEffect(() => {
    loadProductDetail(params.id);
  }, [params.id]);

  if (!product) {
    // Puedes agregar un indicador de carga aquí
    return null;
  }
  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <div className="flex justify-center items-center p-7">
        <div className="p-5 border">
          <Link href="/store">
            <button
              className="bg-transparent text-slate-600 m-2 "
              style={{ borderRadius: "2em 2em" }}
            >
              <span className="mr-2 ">&#8592;</span> BACK TO STORE
            </button>
          </Link>
          <div className="flex justify-center containerDetail">
            {
              <Image
                className="p-1 shadow-2xl rounded-lg bg-hover"
                src={product.image}
                alt={product.name}
                width={380}
                height={300}
                style={{ boxShadow: "4px 6px gray" }}
              />
            }

            <div className="flex flex-col items-center text-center p-3 ml-3">
              <div className=" space-x-4 ">
                <button
                  className="bg-orange-800 hover:bg-red-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: "2em 2em",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-sky-950 hover:bg-blue-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: "2em 2em",
                  }}
                >
                  Edit
                </button>
              </div>
              <h1
                className="p-3 title-font font-medium "
                style={{ fontFamily: "font-serif", fontSize: "2em" }}
              >
                {product.name}
              </h1>
              <div>
                <p
                  className="p-2 m-2 leading-relaxed"
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "1.1em",
                  }}
                >
                  {product.description}
                </p>
              </div>

              <p
                className="font-bold text-left"
                style={{ fontFamily: "font-serif", fontSize: "1.5em" }}
              >
                $ {product.price}
              </p>
              <div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleBuy}
                    className="hover:text-blue-900 m-2 bg-transparent text-black px-3 py-1 rounded -md border border-solid border-gray-500"
                    style={{
                      border: "1px solid gray",
                      
                    }}
                  >
                    Buy now
                  </button>

                  <div className="flex justify-center">
                    {addedToCart ? (
                      <>
                        <button
                          className="bg-red-500 hover:bg-red-700 p-1 rounded -md"
                          onClick={() => handleRemoveFromCart()}
                        >
                          {
                            <img
                              src="/images/rubishBeen.png"
                              alt="rubishBeen"
                              className="w-7 h-7"
                            />
                          }
                        </button>
                        <button
                          className="px-3 py-1 ml-4"
                          onClick={() => countDownCart(params.id)}
                          style={{
                            display: item && item.count > 0 ? "block" : "none",
                            border: "1px solid gray",
                          }}
                        >
                          -
                        </button>
                        <h3 className="bg-hover hover:bg-boton px-3 py-1">
                          {item ? item.count : 0}
                        </h3>
                        <button
                          className="px-3 py-1"
                          onClick={() => countUpCart(params.id)}
                          style={{ border: "1px solid gray" }}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button
                        className="hover:text-green-900 bg-transparent text-black px-3 py-1 rounded -md border border-solid border-gray-500 hover:border-green-900"
                        onClick={handleAddToCart}
                      >
                        🛒 Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de edición */}
        {isEditing && (
          <div className="fixed top-0 bottom-0 w-9/12 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg" style={{ width: "50%" }}>
              <PostProduct initialValues={product} isOff={false} />

              <div className="flex justify-center">
                <button
                  className=" bg-orange-800 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
