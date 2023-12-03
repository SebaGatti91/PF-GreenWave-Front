import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cartContext";
import { useEffect, useState } from "react";
import React from 'react'
import SkeletonCard from './SkeletonCard'

const Card = ({
  id,
  name,
  image,
  price,
  rating,
  cartControlers = false,
}) => {

  const [state, setState] = useState({
    fav: false,
    rate: [],
    loading: true
  });
  const { cart, addToCart, removeFromCart, countDownCart, countUpCart } =
    useCart();
    
  useEffect(() => {
    setTimeout(() => {
      setState(prevState => ({
        ...prevState, loading: false
      }))
    }, 2000)
  }, [])
  const [addedToCart, setAddedToCart] = useState(false);
  const max = 5
  useEffect(() => {
    let stars = [];
    for (let i = 0; i < max; i++) {
      if (i < rating) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    setState(prevState => ({ ...prevState, rate: stars }));
  }, [rating]);
  const handleFavorite = () => {
    setState(prevState => ({
      ...prevState, fav: true
    }));
  };

  const handleAddToCart = () => {
    addToCart({ id, name, image, price, rating });
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    setAddedToCart(false); // Cambia el estado a false al hacer clic en el basurero
  };

  const renderAddToCartButton = () => (
    <div className="py-2">
      <p className="text-center"> {state.rate}</p>
      <button
        onClick={handleAddToCart}
        className="p-1 m-2 rounded-lg mr-2 bg-hover hover:bg-boton flex justify-center"
        style={{ marginInline: 'auto' }}
      >
        <img
          src="/images/shoppingCart.png"
          alt="shoppingCartImage"
          style={{ width: "25px", height: "25px" }}
        />
      </button>
    </div>
  );

  const renderCartControlButtons = () => {
    const item = cart.find((item) => item.id === id);

    return (
      <div className="flex flex-col justify-center">
        <p className="text-center py-1"> {state.rate}</p>
        <div className="flex justify-center flex-row items-center py-2 mb-2">
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
            className="px-3 py-1 ml-2"
            onClick={() => countDownCart(id)}
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
            onClick={() => countUpCart(id)}
            style={{ border: "1px solid gray" }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const loader = () => {

    return (
      <SkeletonCard />
    )
  }
  if (state.loading) {
    return (loader())
  }
  else {
    return (
      <div className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative">
        <div className="absolute top-0 right-0 m-2">
          {state.fav ? (
            <button onClick={handleFavorite}>💚</button>
          ) : (
            <button onClick={handleFavorite}>🤍</button>
          )}
        </div>

        <div className="flex-grow flex-shrink-0">
          <Link href={`/store/${id}`} className="flex w-full">
            <Image src={image} alt={name} height={200} width={150}
              style={{ height: "200px" }}
              className="w-80 h-60 rounded-md border-sky-950"
            />
          </Link>
        </div>

        <div className="mt-2 flex-grow-0 flex flex-col items-center">
          <h3 className="text-center font-bold">{name}</h3>
          <h3 className="text-green-600 text-center">USD {price}</h3>

          {cartControlers
            ? cart
              .filter((item) => item.id === id)
              .map((item) => renderCartControlButtons())
            : addedToCart
              ? renderCartControlButtons()
              : renderAddToCartButton()
          }
        </div>
      </div>
    );
  };
}
export default Card;
