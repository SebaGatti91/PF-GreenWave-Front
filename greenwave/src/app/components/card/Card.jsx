"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import { useCart } from "../cart/cartContext";

// funcion remover carrito removeFromCart
//funcion setear carrito clearCart
const Card = ({
  id,
  name,
  image,
  price,
  rating,
  cartControlers=false
 
}) => {
  const [fav, setFav] = useState(false);
const { cart, addToCart, removeFromCart, countDownCart, countUpCart} =useCart()
  const count = cart[0].count


  const handleFavorite = () => {
    if (fav) {
      setFav(false);
    } else {
      setFav(true);
    }
  };


  return (
    <div className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative">
      <div className="absolute top-0 right-0 m-2">
        {fav ? (
          <button onClick={handleFavorite}>💚</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
      </div>
      {cartControlers && (
        <div className="absolute top-0 left-0 m-2">
          <button onClick={()=>{removeFromCart(id)}} >❎</button>
        </div>
      )}

      <div className="flex-grow flex-shrink-0">
        <Image
          src={image}
          alt={name}
          height={150}
          width={150}
          className="w-80 h-60 rounded-md"
        />
      </div>

      <div className="mt-2 flex-grow-0 flex flex-col items-center">
        <h3 className="text-center font-bold">{name}</h3>
        <h3 className="text-green-600  text-center">USD {price}</h3>
        <p>rating: {rating}</p>
        <div>
         
            <div className="flex justify-center items-center">
              ⭐️⭐️⭐️⭐️⭐️
            </div>
          {cartControlers ? (
            <div>  
              <div className="flex justify-center items-center">        
              <h3>Qty:{count}</h3>
              </div>
            <div className="flex justify-center items-center">
              <div >
              <button onClick={()=>{countDownCart(id)}} style={{display: count > 0 ? 'block' : 'none'}}>-1</button>
            
              </div>
              <div className="flex justify-center items-center">
              <div>
              <button onClick={() => addToCart({ id, name, image, price, rating })} className="p-1 m-2 rounded-lg bg-yellow-500">
                Add to Cart
              </button>
              
              
              <Link href={`/store/${id}`}>
                <button
                  className="p-1 bg-yellow-500 rounded-full "
                  style={{ backgroundColor: "rgba(170, 180, 154, 0.5)" }}
                >
                  🔍
                </button>
              </Link>
              </div>
              </div>
              <div>
              <button onClick={()=>{countUpCart(id)}}>+1</button>
              </div>
            </div>
            </div>  
          ):(
            <div>
              
              <button onClick={() => addToCart({ id, name, image, price, rating })} className="p-1 m-2 rounded-lg bg-yellow-500">
                Add to Cart
             </button>
             
              <Link href={`/store/${id}`}>
                <button
                  className="p-1 bg-yellow-500 rounded-full "
                  style={{ backgroundColor: "rgba(170, 180, 154, 0.5)" }}
                >
                  🔍
                </button>
              </Link>
             
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Card;
