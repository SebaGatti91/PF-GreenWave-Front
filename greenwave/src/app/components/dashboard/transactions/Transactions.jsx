"use client";
import Image from "next/image";
import styles from "./transactions.module.css";
import { useState, useEffect } from "react";

const Transactions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        if (users.length === 0) {
          const fetchedUsers = await fetchUsers(); // Asegúrate de que fetchUsers esté definida
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDataUser();
  }, [users]); // Este efecto se ejecutará cada vez que cambie 'users', lo cual parece correcto en tu caso

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Image</td>
            <td>Username</td>
            <td>Product</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={user.image || "/images/noaproduct.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              {/* Mapeo de las compras del usuario */}
              <td>{user.username}</td>
              {user.purchased.map((purchase) => (
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
