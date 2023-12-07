"use client"
import styles from "../components/dashboard/dashboard.module.css";
import Card from "../components/dashboard/card/Card";
import Transactions from "../components/dashboard/transactions/Transactions";
import { fetchUsers, fetchProducts } from "../lib/data";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        if (users.length === 0) {
          const fetchedUsers = await fetchUsers();
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDataUser();
  }, [users]);

  useEffect(() => {
    const fetchDataProd = async () => {
      try {
        if (products.length === 0) {
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchDataProd();
  }, [products]);

  const cardsData = [
    { title: "Users", number: users.length, change: 10 },
    { title: "Products", number: products.length, change: -5 },
    { title: "Recycling Points", number: 100, change: 3 },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cardsData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        <Transactions />
        {/* <Chart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
