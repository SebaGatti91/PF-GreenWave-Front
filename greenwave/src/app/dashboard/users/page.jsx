"use client";
import { MdSearch } from "react-icons/md";
import React, { useState, useEffect } from "react";
import styles from "../../components/dashboard/users/users.module.css";
import { fetchUsers } from "../../lib/data";
import Image from "next/image";
import Link from "next/link";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleSearch = (user) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(normalizedSearchTerm) ||
      user.id.toString().includes(normalizedSearchTerm)
    );
  };

  // Filter users based on search term
  const filteredUsers = users.filter(handleSearch);

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
            <td className={styles.columnHeader}>User</td>
            <td className={styles.columnHeader}>Status</td>
            <td className={styles.columnHeader}>Username</td>
            <td className={styles.columnHeader}>Email</td>
            <td className={styles.columnHeader}>Rol</td>
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
              <td
                className={`${styles.rol} ${
                  user.admin ? styles.admin : styles.client
                }`}
              >
                {user.admin ? "Admin" : "User"}
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
