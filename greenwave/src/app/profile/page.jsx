"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import Button from "../components/button/Button";
import FormUser from "../components/formUser/FormUser";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { user, setUser } = useContext(GlobalUser);
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="flex-1">
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          Profile
        </h1>
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">Hello {user.username}!</h1>
            <img className="rounded-full w-60 m-2" src={user.image}></img>
            <button
              onClick={handleEdit}
              className="m-2 border border-gray-400 bg-transparent rounded-md px-4 py-2 cursor-pointer"
            >
              Edit my profile
            </button>

            {isEditing && (
              <div className="fixed flex justify-center flex-col items-center top-0 bottom-0">
                <FormUser closeModal={closeModal} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
