"use client";
import { MdSearch } from "react-icons/md";
import React, { useState, useEffect } from "react";
import styles from "../../components/dashboard/users/users.module.css";
import { fetchUsers, banUser } from "../../lib/data";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8; // Número de usuarios por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica si ya tienes los usuarios en el estado local antes de realizar una nueva solicitud
        if (users.length === 0) {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (user) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(normalizedSearchTerm) ||
      user.id.toString().includes(normalizedSearchTerm)
    );
  };

  const handleDelete = async (userId) => {
    try {
      await banUser(userId);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);

      console.log(`Usuario con ID ${userId} baneado con éxito.`);
    } catch (error) {
      console.error(`Error al borrar/banear usuario con ID ${userId}:`, error);
    }
  };

  const filteredUsers = currentUsers.filter(handleSearch);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <MdSearch />
        <input
          type="text"
          placeholder="Search by email "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>User</td>
            <td>Status</td>
            <td>Username</td>
            <td>Email</td>
            <td>Credits</td>
            <td>Rol</td>      
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.image || "/images/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div>
              </td>
              <td
                className={`${styles.status} ${
                  user.status ? styles.active : styles.banned
                }`}
              >
                {user.status ? "Active" : "Banned"}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.credits}</td>
              <td
                className={`${styles.rol} ${
                  user.admin ? styles.admin : styles.client
                }`}
              >
                {user.admin ? "Admin" : "Client"}
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(user.id)}
                    disabled={user.admin}
                  >
                    Ban/Unban
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={indexOfLastUser >= users.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
