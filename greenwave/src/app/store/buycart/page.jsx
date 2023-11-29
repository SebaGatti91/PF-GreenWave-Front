"use client";
import React, { useContext} from "react";
import { CartContext } from "../../components/cart/cartContext";
import Card from "../../components/card/Card";
import Link from "next/link";
import '../../../../public/estilos/buycart.css'
const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
        <h1 className="flex justify-center items-center bold" > Cart Items</h1>
      { cart.lenght !== 0 && cart.map((product, index) => (
        <div className="flex flex-col w-1/3 m-12 " >
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
            </div>
      ))}
      {cart.length === 0 && (
      <div className="containers">
      <div className="contenido">
      <div>
      <p className="background-clip-text">oh!</p>
      </div>
      
      <div className="message">
        <h1>Tu carrito de compras<br></br>esta vacio!!</h1>
      <h1></h1>
      <Link href="/store">
      <button className="elemento">Store</button>
      </Link>
    </div>
    </div>
    </div>
    
      )
        
      }
    </div>
  );
};

export default Cart;
