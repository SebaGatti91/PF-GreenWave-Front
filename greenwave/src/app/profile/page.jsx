"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import Button from "../components/button/Button";
import FormUser from "../components/formUser/FormUser";
import Image from "next/image";
import Link from "next/link";
import "./profile.css"
import { useSession } from "next-auth/react";


const Profile = () => {
  const { user, setUser } = useContext(GlobalUser);
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };
  return (

    <div className="flex h-screen">
      <div className="w-1/6 flex-none h-full">
        <div
          className="text-white h-full"
          style={{
            background:
              "linear-gradient(to right top, #527e7b, #4a7771, #426f66, #3b685c, #356051",
          }}
        >
          <ul className="h-full flex flex-col justify-between text-center ">
            <li>
              <Button link={"/post-product"} text={"Sell a product"} />
            </li>
            <li>
              <Button link={"/favorites"} text={"My favorites"} />
            </li>
            <li>
              <Button link={"/myShopping"} text={"My shopping"} />
            </li>
            <li>
              <Button link={"/myProducts"} text={"My products"} />
            </li>
            {/* <li>
              <Button link={"/"} text={"My credits"} />
            </li> */}
            <li>
              <Button link={"/donation"} text={"Donate"} />
            </li>
          </ul>
        </div>
      </div>
      <div
        className="flex-1"
        style={{
          background: "linear-gradient(0deg, rgba(123,154,50,0.3) 0%, rgba(214,230,178,0.5) 100%)"
        }}

      >
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          Profile
        </h1>
        <div className="flex justify-center items-center relative">
          <div className="card">
            <div className="cardImage">
              <img src="/images/hero.png"></img>
            </div>
            <div className="profileImage">
              <img src={user?.image || session?.user.image}></img>
            </div>
            <div className="cardContent">
              <h3>Hello {user.username}!</h3>
              <p>Phone number: {user.phone}</p>
              <p>Address: {user.address}</p>
              <p>Postal code: {user.postalCode}</p>
              <button
                onClick={handleEdit}
                className="mt-4 border border-gray-400 bg-transparent rounded-md px-4 py-1 cursor-pointer text-black hover:bg-green-700  hover:text-white"
              >
                Edit my profile
              </button>
            </div>
          </div>
          {isEditing && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/2">
              <FormUser closeModal={closeModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
