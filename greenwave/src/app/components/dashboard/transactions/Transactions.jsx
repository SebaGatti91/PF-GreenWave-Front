"use client";
import Image from "next/image";
import styles from "./transactions.module.css";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../../lib/data";
import { MdSearch } from "react-icons/md";

const Transactions = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (user) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(normalizedSearchTerm) ||
      user.id.toString().includes(normalizedSearchTerm) ||
      user.username.toLowerCase().includes(normalizedSearchTerm)
    );
  };

  // Filter users based on search term
  const filteredUsers = users.filter(handleSearch);

  // lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transactions by Users</h2>
      <div className={styles.search}>
        <MdSearch />
        <input
          type="text"
          placeholder="Search by email or username"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reinicia la página cuando cambia el término de búsqueda
          }}
          className={styles.input}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) =>
            user.purchases && user.purchases.length > 0
              ? user.purchases.map((purchase) => (
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
                    <td>{purchase.quantity}</td>
                    <td>${purchase.Product.price}</td>
                    <td>${purchase.Product.price * purchase.quantity}</td>
                  </tr>
                ))
              : null
          )}
        </tbody>
      </table>
      {/* Agregar botones de paginación */}
      <div>
        <button
         className={styles.buttonBottom}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
         className={styles.buttonBottom}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastUser >= filteredUsers.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Transactions;
