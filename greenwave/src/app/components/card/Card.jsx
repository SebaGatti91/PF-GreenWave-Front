import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cartContext";
import { useEffect, useState, useContext } from "react";
import React from "react";
import SkeletonCard from "./SkeletonCard";
import { GlobalUser } from "../users/globalUsers";
import { fetchAddFavorites, fetchRemoveFavorites } from "../../lib/data";

const Card = ({
  id,
  name,
  image,
  price,
  rating,
  // Estilos
  cardStyles,
  imageStyle,
  text,
  textPrice,
  estrellas,
  botones,
  cartControlers = false,
  // function
  setFavorites,
}) => {
  const cardContainerStyles = {
    display: "flex",
    ...cardStyles,
  };

  const { user } = useContext(GlobalUser);
  const { cart, addToCart, removeFromCart, countDownCart, countUpCart } =
    useCart();

  const [state, setState] = useState({
    fav: false,
    rate: [],
    loading: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }, 2000);
  }, []);

  useEffect(() => {
    let stars = [];
    const max = 5;

    for (let i = 0; i < max; i++) {
      if (i < rating) {
        stars.push("⭐");
      } else {
        stars.push("☆");
      }
    }

    setState((prevState) => ({ ...prevState, rate: stars }));
  }, [rating]);

  useEffect(() => {
    // Recuperar la información de favoritos desde localStorage al cargar el componente
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favoritesFromStorage.includes(id);
    setState((prevState) => ({ ...prevState, fav: isFavorite }));
  }, [id]);

  const handleFavorite = () => {
    const productId = id;

    setState((prevState) => ({
      ...prevState,
      fav: !prevState.fav,
    }));

    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (state.fav) {
      // Remover el producto de favoritos y actualizar localStorage
      const updatedFavorites = favoritesFromStorage.filter(
        (favId) => favId !== productId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      fetchRemoveFavorites(user.email, productId, setFavorites);
    } else {
      // Agregar el producto a favoritos y actualizar localStorage
      const updatedFavorites = [...favoritesFromStorage, productId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      fetchAddFavorites(user.email, productId);
    }
  };

  const handleAddToCart = () => {
    addToCart({ id, name, image, price, rating });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  const renderAddToCartButton = () => (
    <div className="py-2">
      <p className="text-center" style={textPrice}>
        {state.rate}
      </p>
      <button
        onClick={handleAddToCart}
        className="p-1 m-2 rounded-lg mr-2 bg-hover hover:bg-boton"
      >
        Add to Cart
      </button>
      <Link href={`/store/${id}`}>
        <button className="bg-hover hover:bg-boton p-1 rounded-full">🔍</button>
      </Link>
    </div>
  );

  const renderCartControlButtons = () => {
    const item = cart.find((item) => item.id === id);

    return (
      <div
        key={item.id}
        style={cardContainerStyles}
        className="flex flex-col justify-center"
      >
        <p className="text-center py-1" style={estrellas}>
          {state.rate}
        </p>
        <div
          style={botones}
          className="flex justify-center flex-row items-center py-2 mb-2"
        >
          <button
            className="bg-red-500 hover:bg-red-700 p-1 rounded-md"
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

  const loader = () => <SkeletonCard />;

  if (state.loading) {
    return loader();
  } else {
    return (
      <div
        style={cardContainerStyles}
        className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative"
      >
        <div className="absolute top-0 right-0 m-2">
          {state.fav ? (
            <button onClick={handleFavorite}>💚</button>
          ) : (
            <button onClick={handleFavorite}>🤍</button>
          )}
        </div>

        <div className="flex-grow flex-shrink-0">
          <Image
            src={image}
            alt={name}
            height={150}
            width={150}
            style={imageStyle}
            className="w-80 h-60 rounded-md"
          />
        </div>

        <div
          style={text}
          className="mt-2 flex-grow-0 flex flex-col items-center"
        >
          <h3 className="text-center font-bold">{name}</h3>
          <h3 className="text-green-600 text-center">USD {price}</h3>

          {cartControlers
            ? cart
                .filter((item) => item.id === id)
                .map((item) => renderCartControlButtons())
            : renderAddToCartButton()}
        </div>
      </div>
    );
  }
};

export default Card;
