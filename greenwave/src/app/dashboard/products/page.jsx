"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../../components/dashboard/products/products.module.css"
import {fetchProducts} from "../../lib/data";
import { MdSearch } from "react-icons/md";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Número de productos por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica si ya tienes los usuarios en el estado local antes de realizar una nueva solicitud
        if (products.length === 0) {
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchData();
  }, [products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (product) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(normalizedSearchTerm) ||
      product.id.toString().includes(normalizedSearchTerm)
    );
  };

  const filteredProducts = currentProducts.filter(handleSearch);

  return (
    <div className={styles.container}>
        <div className={styles.search}>
        <MdSearch />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Rating</td>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.image || "/images/noaproduct.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                </div>
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              {/* <td>{product.createdAt?.toString().slice(4, 16)}</td> */}
              <td>{product.stock}</td>
              <td>{product.rating}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
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
          disabled={indexOfLastProduct>= products.length}
        >
          Siguiente
        </button>
        </div>
    </div>
  );
};

export default ProductsPage;
