"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import Button from "../components/button/Button";
import FormUser from "../components/formUser/FormUser";

import Image from "next/image";
import Link from "next/link";

const Profile = () => {
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
        <div className="flex flex-row justify-evenly">
          {/* <h1>Welcome back {usuario?.name} !!!</h1> */}
          <FormUser />
        </div>

        <div
          className="flex flex-wrap justify-evenly m-10 p-10"
          style={{ backgroundColor: "#D1D7BF" }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;
