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
          const fetchedUsers = await fetchUsers(); // Asegúrate de que fetchUsers esté definida
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [users]); // Este efecto se ejecutará cada vez que cambie 'users', lo cual parece correcto en tu caso
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
            <tr key={user.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={user.image ? user.image : "/images/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              {/* Mapeo de las compras del usuario */}
              <td>{user.username}</td>
              {user.purchases?.map((purchase) => (
                <React.Fragment key={purchase.id}>
                  <td>{purchase.name}</td>
                  <td>${purchase.price}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
