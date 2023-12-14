"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { CartContext } from "../../components/cart/cartContext";
import Link from "next/link";
import Image from "next/image";
import { GlobalUser } from "../../components/users/globalUsers";
import "./page.css";

const Cart = () => {
  const BackUrl = process.env.BACK;

  const { cart, setCart, removeFromCart, countDownCart, countUpCart } =
    useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);
  const { user } = useContext(GlobalUser);
  const { data: session } = useSession();
  const userAut = session?.user;
  const router = useRouter();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setAddedToCart(false); // Cambia el estado a false al hacer clic en el basurero
  };

  const createPreference = async () => {
    try {
      const itemsFromCart = cart?.map((prod) => ({
        id: prod.id,
        title: prod.name,
        unit_price: prod.price,
        quantity: prod.count,
        currency_id: "ARS",
      }));

      if (!itemsFromCart || itemsFromCart.length === 0) {
        console.error("Cart is empty. Cannot create preference.");
        return;
      }

      const productsIds = cart.map((prod) => prod.id);
      const response = await axios.post(`${BackUrl}/mercadoPago`, {
        userId: user.email,
        productId: productsIds,
        item: itemsFromCart,
      });

      //setCart([]);
      window.location.href = response.data;
    } catch (error) {
      console.error("Error creating preference:", error);
    }
  };

  const handleBuy = async () => {
    if (userAut && user.address !== null) {
      const id = await createPreference();
      if (id) setPreferenceId(id);
      return router.push("/login");
    } else {
      return router.push("/profile");
    }
  };

  const totalItems = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    return acc + count;
  }, 0);

  const totalPrice = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    const price = typeof product.price === "number" ? product.price : 0;
    return acc + count * price;
  }, 0);

  return (
    <div>
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center h-screen">
          <h1
            className="text-center mt-10 text-6xl text-shadow-lg py-1"
            style={{
              fontFamily: "font-serif",
              width: "85%",
              marginInline: "auto",
            }}
          >
            Your cart is empty
          </h1>
          <h3 className="text-center mt-4 text-2xl text-shadow-lg py-1">
            Add items to your cart
          </h3>
          <Link href="/store" style={{ marginInline: "auto" }}>
            <button className="bg-lime-800 hover:bg-lime-700 text-black-50 rounded-lg p-1 m-5 px-5 py-2 text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="min-h-screen">
          <h1
            className="text-center mt-10 text-4xl font-bold text-shadow-lg shadow-2xl py-1"
            style={{
              fontFamily: "font-serif",
              width: "85%",
              marginInline: "auto",
            }}
          >
            Cart Items
          </h1>

          <div className="flex flex-col lg:flex-row justify-evenly min-h-full apartado">
            <div className="m-12 rounded-lg w-1/2 padre">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-row justify-between mb-10 shadow-2xl rounded-lg pb-5 producto"
                  style={{
                    backgroundColor: "#D1D7BF",
                    border: "1px solid gray",
                  }}
                >
                  <div className="flex flex-row producto">
                    <Link
                      href={`/store/${product.id}`}
                      className="flex items-center"
                    >
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
                        id="pic"
                      />
                    </Link>
                    <div className="flex flex-col text-start p-4">
                      <h3 className="font-bold py-1 nombre">{product.name}</h3>
                      <h3 className="text-green-600 py-1">
                        USD <span className="ml-1">${product.price}</span>
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-center flex-row items-center py-2 mb-2 mt-24 botones">
                    <button
                      className="bg-red-500 hover:bg-red-700 p-1 rounded-md"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      {
                        <img
                          src="/images/borrar.png"
                          alt="rubishBeen"
                          className="w-5 h-5"
                        />
                      }
                    </button>
                    <button
                      className="px-2 ml-2"
                      onClick={() => countDownCart(product.id)}
                      style={{
                        display:
                          product && product.count > 0 ? "block" : "none",
                        border: "1px solid gray",
                      }}
                    >
                      -
                    </button>
                    <h3 className="bg-hover hover:bg-boton px-2">
                      {product ? product.count : 0}
                    </h3>

                    <button
                      className="px-2 mr-5"
                      onClick={() => countUpCart(product.id, product.stock)}
                      style={{ border: "1px solid gray" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="lg:w-1/4 w-1/2 m-12 py-2 rounded-xl shadow-2xl pb-3 contador"
              style={{
                backgroundColor: "#D1D7BF",
                height: "40%",
                border: "1px solid gray",
              }}
            >
              <div
                className="mx-6 pt-8 mb-3 pb-3"
                style={{ borderBottom: "1px solid gray" }}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg">Total Items: </h3>
                  <h3 className="text-lg">{totalItems}</h3>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-lg">Sub-Total: </h3>
                  <h3 className="text-lg">${totalPrice}</h3>
                </div>
              </div>

              <div className="flex justify-between">
                <h3 className="text-xl px-6 mt-3 mb-5">Total:</h3>
                <strong className="text-xl px-6 mt-3 mb-5">
                  ${totalPrice}
                </strong>
              </div>

              <button
                onClick={handleBuy}
                className="bg-lime-900 hover:bg-lime-700 text-lime-50 rounded-lg p-1 mt-5 flex justify-center"
                style={{ width: "90%", marginInline: "auto" }}
              >
                Check Out
              </button>
              <div className="flex justify-center mt-5">
                <div
                  className="bg-red-500 hover:bg-red-700 p-1 rounded-md text-lime-50 text-center mb-2"
                  style={{ width: "90%" }}
                >
                  <button onClick={() => setCart([])}>Clear cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
