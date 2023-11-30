"use client";
import React, { useContext } from "react";
import { CartContext } from "../../components/cart/cartContext";
import Card from "../../components/card/Card";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    return acc + count;
  }, 0);

  const totalPrice = cart.reduce((acc, product) => {
    const count = typeof product.count === "number" ? product.count : 0;
    const price = typeof product.price === "number" ? product.price : 0;
    return acc + count * price;
  }, 0);

  const cartItemStyles = {
    display: 'flex',
    flexDirection: 'row',
    background: '#FFFFFF',
    minWidth: '97%',
    height: '200px',
  };

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
        <div>
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

          <div className="flex justify-center mt-5">
            <div className="bg-red-500 hover:bg-red-700 p-1 rounded-md">
              <button onClick={() => setCart([])}>Clear cart</button>
            </div>
          </div>

          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col w-1/2 m-12 mb-2">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="mb-10 bg-slate-500 rounded-lg shadow-2xl"
                  style={{ backgroundColor: "#D1D7BF"}}
                >
                  <Card
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    cardStyles={cartItemStyles}
                    imageStyle={{
                      width: '200px',
                      height: '150px', 
                      marginTop: '20px',
                      marginLeft: '20px',
                      border: '2px solid gray'
                    }}
                    text={{
                      fontSize: '1.2em',
                      width: '100%',
                      textAlign: 'start',
                      marginTop: '20px',
                    }}
                    textPrice={{
                      marginRigth: '20px'
                    }}
                    estrellas={{
                      display: 'none'
                    }}
                    botones={{
                      marginLeft: '310px',
                      marginTop: '50px'
                    }}
                    cartControlers={true}
                  />
                </div>
              ))}
            </div>

            <div
              className="w-1/4 m-12 py-2 rounded-xl shadow-2xl"
              style={{ backgroundColor: "#D1D7BF", height: "40%" }}
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
                className="bg-lime-900 hover:bg-lime-700 text-lime-50 rounded-lg p-1 m-5"
                style={{ width: "90%" }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
