"use client";
import { useState, useEffect } from "react";
import { fetchUserById, banUser, setAdminUser } from "../../../lib/data";
import styles from "../../../components/dashboard/users/users.module.css";
import Link from "next/link";

const UserProfile = ({ params }) => {
  console.log(params)
  const [user, setUser] = useState([]);
  const userId = params.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await fetchUserById(userId);
        setUser(fetchedUser);
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
      setUser(updatedUser);

      console.log(`Usuario con ID ${userId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  const handleAdminChange = async (userId) => {
    try {
      await setAdminUser(userId);
      const updatedUser = await fetchUserById(userId);
      setUser(updatedUser);

      console.log(`Usuario con ID ${userId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>User Profile</h1>
        <Link href="/dashboard/users">
          <button className={`${styles.button}`}>Back to users</button>
        </Link>
      </div>
      <div className={styles.user}>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>
          Status:{" "}
          <span
            className={`${styles.status} ${
              user.status ? styles.active : styles.banned
            }`}
          >
            {user.status ? "Active" : "Banned"}
          </span>
        </p>
        <button
          onClick={handleDelete}
          className={`${styles.button} ${styles.view}`}
        >
          {user.status ? "Deactivate" : "Activate"}
        </button>
        <p>
          Admin:{" "}
          <span
            className={`${styles.rol} ${
              user.admin ? styles.admin : styles.client
            }`}
          >
            {user.admin ? "Yes" : "No"}
          </span>
        </p>
        <button
          onClick={handleAdminChange}
          className={`${styles.button} ${styles.view}`}
        >
          {user.admin ? "Remove Admin" : "Make Admin"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
