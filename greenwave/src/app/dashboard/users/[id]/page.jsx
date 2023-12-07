"use client";
import { useState, useEffect } from "react";
import {
  fetchUserById,
  banUser,
  setAdminUser,
  fetchPurchases,
} from "../../../lib/data";
import Link from "next/link";
import Image from "next/image";

const UserProfile = ({ params }) => {
  const [userView, setUserView] = useState([]);
  const [product, setProduct] = useState([]);
  const userId = params.id;

  console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await fetchUserById(userId);
        setUserView(fetchedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const fetchedProducts = await fetchPurchases(userId);
        setProduct(fetchedProducts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPurchaseData();
  }, [userId]);

  const handleDelete = async (userId) => {
    try {
      await banUser(userId);
      const updatedUser = await fetchUserById(userId);
      setUserView(updatedUser);

      console.log(`Usuario con ID ${userId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  const handleAdminChange = async (userId) => {
    try {
      await setAdminUser(userId);
      const updatedUser = await fetchUserById(userId);
      setUserView(updatedUser);

      console.log(`Usuario con ID ${userId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Link href="/dashboard/users">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to users
          </button>
        </Link>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col items-center">
          <Image
            src={userView.image || "/images/noavatar.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold mt-4">ID: {userView.id}</h2>
          <p>Email: {userView.email}</p>
          <p>Username: {userView.username}</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                userView.status ? "text-green-500" : "text-red-500"
              } font-bold`}
            >
              {userView.status ? "Active" : "Banned"}
            </span>
          </p>
          <button
            className={`${
              userView.status
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handleDelete(userView.id)}
            disabled={userView.admin}
          >
            {userView.status ? "Ban" : "Unban"}
          </button>
          <p className="mt-4">
            <strong>Admin:</strong>{" "}
            <span
              className={`${
                userView.admin ? "text-green-500" : "text-red-500"
              } font-bold`}
            >
              {userView.admin ? "Yes" : "No"}
            </span>
          </p>
          <button
            className={`${
              userView.admin
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handleAdminChange(userView.id)}
          >
            {userView.admin ? "Remove Admin" : "Make Admin"}
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Purchases</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <Image
                    src={product.image || "/images/noaproduct.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.stock}</td>
                <td className="border px-4 py-2">{product.rating}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        View
                      </button>
                    </Link>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;