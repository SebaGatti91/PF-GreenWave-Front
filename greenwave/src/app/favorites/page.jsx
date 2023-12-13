"use client";
import { useEffect, useContext, useState } from "react";
import { GlobalUser } from "../components/users/globalUsers";
import Image from "next/image";
import Link from "next/link";
import {
  fetchRemoveFavorites,
  fetchAddFavorites,
  fetchGetFavorites,
} from "../lib/data";
import Button from "../components/button/Button";
import LeftMenu from "../components/leftMenu/LeftMenu";
const Favorites = () => {
  const { user } = useContext(GlobalUser);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await fetchGetFavorites(user?.id);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);

  const handleToggleFavorite = async (productId) => {
    try {
      const isFavorite = favorites.some((fav) => fav.id === productId);

      if (isFavorite) {
        await fetchRemoveFavorites(user.email, productId, setFavorites);
      } else {
        await fetchAddFavorites(user.email, productId);
      }

      const updatedFavorites = await fetchGetFavorites(user.id);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="mx-auto flex flex-col sm:flex-row">
      <div>
        <LeftMenu />
      </div>
      <div className=" w-4/5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          My Favorites
        </h1>
        {favorites && favorites.length === 0 ? (
          <div>
           <div className="flex flex-col justify-center items-center ">
            <Button
              link={"/store"}
              text={"Start shopping"}
              className={
                "p-2 bg-lime-800 hover:bg-lime-700 text-black-50 relative rounded-lg m-5 px-5 py-2 text-lg "
              }
            />
            <Image
              className=" rounded-md"
              src={"/images/myShoppings.png"}
              alt={"myProducts"}
              height={500}
              width={500}
              style={{ width: "620px", height: "620px", marginInline: "auto"}}
            />
            </div>
          </div>
        ) : (
          favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="relative flex flex-row justify-between mb-7 mt-5 shadow-2xl rounded-lg pb-5"
              style={{
                backgroundColor: "#D1D7BF",
                border: "1px solid gray",
              }}
            >
              <button
                className="absolute top-0 right-0 m-2"
                onClick={() => handleToggleFavorite(favorite.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {favorite.fav ? "🤍" : "💚"}
              </button>
              <div className="flex flex-col  lg:flex-row">
                <Image
                  className="w-60 h-40 rounded-md text-center"
                  src={favorite.image[0]}
                  alt={favorite.name}
                  height={150}
                  width={150}
                  style={{
                    height: "150px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    border: "2px solid gray",
                  }}
                />
                <div className="flex flex-col text-start p-4">
                  <h3
                    className="font-bold py-1 text-left text-lg"
                    style={{ width: "100%", textShadow: "1px 1px gray" }}
                  >
                    {favorite.name}
                  </h3>
                  <h3
                    className="text-green-600 py-1 text-lg"
                    style={{
                      color: "#8E9681",
                      textShadow: "1px 1px gray",
                    }}
                  >
                    $ {favorite.price}
                  </h3>
                  <p className="py-1 w-full" >
                    {favorite.description}
                  </p>
                  <Link
                    href={`/store/${favorite.id}`}
                    className="flex justify-start w-full"
                  >
                    <button
                      className="rounded-lg mt-2 bg-button hover:bg-hover-clear"
                      style={{
                        width: "80px",
                      }}
                    >
                      More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
