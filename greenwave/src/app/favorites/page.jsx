"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext } from "react";
const Favorites = () => {
  const { user } = useContext(GlobalUser);
  console.log(user);
  return (
    <div>
      <h1>Mis favoritos</h1>
    </div>
  );
};
export default Favorites;
