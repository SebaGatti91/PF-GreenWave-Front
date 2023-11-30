"use client";
import Button from "../components/button/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const { data: session } = useSession();
  const user = session.user;
  console.log(user);
  const [userFromDb, setUserFromDb] = useState([]);
  console.log(userFromDb);
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/users`, user.email);
    const { data } = response;
    return setUserFromDb(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Welcome back {user.name} !!!</h1>
      <img src={user.image} alt={user.name} />
      <ul
        className=" text-white "
        style={{
          background:
            "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051)",
          width: "120px",
        }}
      >
        <li>
          <Button link={"/post-product"} text={"Sell a product"} />
        </li>
        <li>
          <Button link={"/favorites"} text={"My favorites"} />
        </li>
        <li>
          <Button link={"/myShopping"} text={"My shopping"} />
        </li>
        {/* <li>
          <Button link={"/"} text={"My credits"} />
        </li> */}
        <li>
          <Button link={"/donation"} text={"Donate"} />
        </li>
      </ul>
    </div>
  );
};
export default Profile;
