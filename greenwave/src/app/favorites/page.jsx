"use client";
import { useEffect, useContext, useState } from "react";
import { GlobalUser } from "../components/users/globalUsers";
import { fetchGetFavorites } from "../lib/data";
import Card from "../components/card/Card";
import Swal from "sweetalert2";

const Favorites = () => {
  const { user } = useContext(GlobalUser);
  const [favorites, setFavorites] = useState([]);
console.log(user);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await fetchGetFavorites(user?.id);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        // Puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
      }
    };

    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div>
      <h1>Mis favoritos</h1>
      {favorites.map((favorite) => (
        <Card
          key={favorite.id}
          id={favorite.id}
          name={favorite.name}
          price={favorite.price}
          image={favorite.image}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
};

export default Favorites;
