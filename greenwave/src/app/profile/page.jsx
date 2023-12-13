"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import Button from "../components/button/Button";
import FormUser from "../components/formUser/FormUser";
import Image from "next/image";
import Link from "next/link";
import LeftMenu from "../components/leftMenu/LeftMenu";
import "./profile.css";
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
    <div className="mx-auto flex flex-col sm:flex-row ">
      <div>
        <LeftMenu />
      </div>
      <div className="w-4/5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold  text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          Profile
        </h1>
        <div className="flex justify-center items-center relative m-3">
          <div className="card">
            <div className="cardImage">
              <img src="/images/hero.png"></img>
            </div>
            <div className="profileImage">
              <img src={user?.image || session?.user.image}></img>
            </div>
            <div className="cardContent">
              <h3>Hello {user?.username}!</h3>
              <p>Phone number: {user?.phone}</p>
              <p>Address: {user?.address}</p>
              <p>Postal code: {user?.postalCode}</p>
              <button
                onClick={handleEdit}
                className="mt-4 border border-gray-400 bg-transparent rounded-md px-4 py-1 cursor-pointer text-black hover:bg-green-700  hover:text-white"
              >
                Edit my profile
              </button>
            </div>
          </div>
          {isEditing && (
            <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <FormUser closeModal={closeModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
