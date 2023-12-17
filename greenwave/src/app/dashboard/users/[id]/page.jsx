"use client";
import { useState, useEffect } from "react";
import {
  fetchUserById,
  banUser,
  setAdminUser,
  fetchGetFavorites,
  fetchPurchases,
  fetchUserProducts,
} from "../../../lib/data";
import Link from "next/link";
import Image from "next/image";

const UserProfile = ({ params }) => {
  const [userData, setUserData] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const userId = params.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await fetchUserById(userId);
        const fetchedUserFavorites = await fetchGetFavorites(userId);
        const fetchedUserPurchases = await fetchPurchases(userId);
        const fetchedUserProducts = await fetchUserProducts(userId);
        setUserData(fetchedUser);
        setUserFavorites(fetchedUserFavorites);
        setUserPurchases(fetchedUserPurchases);
        setUserProducts(fetchedUserProducts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDelete = async (userId) => {
    try {
      await banUser(userId);
      const updatedUser = await fetchUserById(userId);
      setUserData(updatedUser);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  const handleAdminChange = async (userId) => {
    try {
      await setAdminUser(userId);
      const updatedUser = await fetchUserById(userId);
      setUserData(updatedUser);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
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
            src={userData.image || "/images/imageDefault.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold mt-4">ID: {userData.id}</h2>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                userData.status ? "text-green-500" : "text-red-500"
              } font-bold`}
            >
              {userData.status ? "Active" : "Banned"}
            </span>
          </p>
          <button
            className={`${
              userData.status
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handleDelete(userData.id)}
            disabled={userData.admin}
          >
            {userData.status ? "Ban" : "Unban"}
          </button>
          <p className="mt-4">
            <strong>Admin:</strong>{" "}
            <span
              className={`${
                userData.admin ? "text-green-500" : "text-red-500"
              } font-bold`}
            >
              {userData.admin ? "Yes" : "No"}
            </span>
          </p>
          <button
            className={`${
              userData.admin
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handleAdminChange(userData.id)}
          >
            {userData.admin ? "Remove Admin" : "Make Admin"}
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
            </tr>
          </thead>
          <tbody>
            {userPurchases && userPurchases && userPurchases.length > 0 ? (
              userPurchases.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    <Image
                      src={product.image[0] || "/images/noaproduct.png"}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay productos comprados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Favorites</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {userData && userFavorites && userFavorites.length > 0 ? (
              userFavorites.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    <Image
                      src={product.image[0] || "/images/noaproduct.png"}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay productos en favoritos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Posted</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {userData && userProducts && userProducts.length > 0 ? (
              userProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    <Image
                      src={product.image[0] || "/images/noaproduct.png"}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay productos posteados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
