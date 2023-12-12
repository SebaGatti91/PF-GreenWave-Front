"use client";
import Image from "next/image";
import styles from "./transactions.module.css";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../../lib/data";

const Transactions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (users.length === 0) {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [users]);

  console.log(users);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Product</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            user.purchases && user.purchases.length > 0 ? (
              user.purchases.map((purchase) => (
                <tr key={`${user.id}-${purchase.Product.id}`}>
                  <td>
                    <div className={styles.user}>
                      <Image
                        src={user.image ? user.image : "/images/noavatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.userImage}
                      />
                    </div>
                  </td>
                  <td>{user.username}</td>
                  <td>{purchase.Product.name}</td>
                  <td>${purchase.Product.price}</td>
                </tr>
              ))
            ) : null
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
