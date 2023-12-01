"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/button/Button";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user; // Use optional chaining to prevent errors if session or user is undefined
  const [userFromDb, setUserFromDb] = useState(null); // Initialize as null for a single user object
  console.log(userFromDb);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${user?.email}`
      );
      const { data } = response;
      setUserFromDb(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error, show a message to the user, or redirect as needed.
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array for fetching data on component mount

  return (
    <div>
      <h1>Welcome back {user?.name} !!!</h1>
      <img src={user?.image} alt={user?.name} />
      <ul
        className="text-white"
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
