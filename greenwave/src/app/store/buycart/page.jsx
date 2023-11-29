"use client";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../components/cart/cartContext";
import Card from "../../components/card/Card";

const Cart = () => {
  const { cart } = useContext(CartContext);
  useEffect(() => {
    console.log(cart);
  });

  return (
    <div>
        <h1 className="flex justify-center items-center bold" > Cart Items</h1>
        <div className="flex flex-col w-1/3 m-12 " >
      {cart.map((product, index) => (
        <div id={index} className="">
          <Card
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            cartControlers={true}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Cart;
