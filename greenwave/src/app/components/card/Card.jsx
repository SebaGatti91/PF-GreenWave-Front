import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cartContext";
import {useEffect, useState} from "react"

const Card = ({ id, name, image, price, rating, cartControlers = false }) => {
  const [fav, setFav] = useState(false);
  const [rate, setRate] = useState([]);
  const { cart, addToCart, removeFromCart, countDownCart, countUpCart } = useCart();

  const handleFavorite = () => {
    setFav(!fav);
  };
  const max = 5;

  useEffect(() => {
    let stars = [];
    for (let i = 0; i < max; i++) {
      if (i < rating) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    setRate(stars);
  }, [rating]);

  return (
    <div className="bg-white shadow-2xl rounded-md m-3 max-w-xs flex flex-col relative">
      <div className="absolute top-0 right-0 m-2">
        {fav ? (
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
          className="w-80 h-60 rounded-md"
        />
      </div>

      <div className="mt-2 flex-grow-0 flex flex-col items-center">
        <h3 className="text-center font-bold">{name}</h3>
        <h3 className="text-green-600 text-center">USD {price}</h3>

        {cartControlers &&
          cart
            .filter((item) => item.id === id)
            .map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center flex-row items-center">
                      <button
                        onClick={() => {
                          removeFromCart(id);
                        }}
                      >
                        🗑️
                      </button>

                      <button
                        className="px-3 py-1"
                        onClick={() => {
                          countDownCart(id);
                        }}
                        style={{
                          display: item.count > 0 ? "block" : "none",
                          border: "1px solid gray",
                        }}
                      >
                        -
                      </button>
                      <h3 className="bg-slate-500 px-3 py-1">{item.count}</h3>
                      <button
                        className="px-3 py-1"
                        onClick={() => {
                          countUpCart(id);
                        }}
                        style={{ border: "1px solid gray" }}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <Link href={`/store/${id}`}>
                          <button
                            className="p-1 bg-yellow-500 rounded-full"
                            style={{
                              backgroundColor: "rgba(170, 180, 154, 0.5)",
                            }}
                          >
                            🔍
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              );
            })}
        {!cartControlers && (
          <div>
            <p className="text-center">rating: {rating}</p>
            <button
              onClick={() => addToCart({ id, name, image, price, rating })}
              className="p-1 m-2 rounded-lg bg-yellow-500"
            >
              Add to Cart
            </button>
            <Link href={`/store/${id}`}>
              <button
                className="p-1 bg-yellow-500 rounded-full"
                style={{ backgroundColor: "rgba(170, 180, 154, 0.5)" }}
              >
                🔍
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
