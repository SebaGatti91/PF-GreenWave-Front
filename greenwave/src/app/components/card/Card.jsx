import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cartContext";
import { useEffect, useState } from "react"

const Card = ({ id, name, image, price, rating, cartControlers = false }) => {
  const [fav, setFav] = useState(false);
  const [rate, setRate] = useState([]);
  const { cart, addToCart, removeFromCart, countDownCart, countUpCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleFavorite = () => {
    setFav(!fav);
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
      <p className="text-center"> {rate}</p>
      <button
        onClick={handleAddToCart}
        className="p-1 m-2 rounded-lg mr-2"
        style={{
          background:
            "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
        }}
      >
        Add to Cart
      </button>
      <Link href={`/store/${id}`}>
        <button
          className="p-1 bg-yellow-500 rounded-full"
          style={{
            background:
              "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
          }}
        >
          🔍
        </button>
      </Link>
    </div>
  );

  const renderCartControlButtons = () => {
    const item = cart.find((item) => item.id === id);

    return (
      <div className="flex flex-col justify-center">
        <p className="text-center py-1"> {rate}</p>
        <div className="flex justify-center flex-row items-center py-2 mb-2">
          <button
            className="p-1"
            style={{
              background:
                "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
            }}
            onClick={() => handleRemoveFromCart()}>🗑️</button>
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
          <h3
            style={{
              background:
                "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
            }}
            className="bg-slate-500 px-3 py-1">{item ? item.count : 0}</h3>
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

  useEffect(() => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    setRate(stars);
  }, [rating]);

  return (
    <div className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative">
      <div className="absolute top-0 right-0 m-2">
        {fav ? <button onClick={handleFavorite}>💚</button> : <button onClick={handleFavorite}>🤍</button>}
      </div>

      <div className="flex-grow flex-shrink-0">
        <Image src={image} alt={name} height={150} width={150} className="w-80 h-60 rounded-md" />
      </div>

      <div className="mt-2 flex-grow-0 flex flex-col items-center">
        <h3 className="text-center font-bold">{name}</h3>
        <h3 className="text-green-600 text-center">USD {price}</h3>

        {cartControlers ? (
          cart
            .filter((item) => item.id === id)
            .map((item) => renderCartControlButtons())
        ) : addedToCart ? (
          renderCartControlButtons()
        ) : (
          renderAddToCartButton()
        )}
      </div>
    </div>
  );
};

export default Card;