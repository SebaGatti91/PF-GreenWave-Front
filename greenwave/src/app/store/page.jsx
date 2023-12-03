"use client";
import Card from "../components/card/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination/Pagination";
import DropDownMenu from "../components/dropDownMenu/DropDownMenu";
import Link from "next/link";

const Store = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("Products");
  const [orderValue, setOrderValue] = useState("Alfabetico");
  const [filterValueName, setFilterValueName] = useState("");

  const productsPerPage = 6;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/store?filter=${filterValue}&sort=${orderValue}&name=${filterValueName}`
      );
      const { data } = response;
      setProducts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterValue, orderValue]);

  const handleFilterName = (event) => {
    setFilterValueName(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };
  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleOrder = (event) => {
    setOrderValue(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className=" mx-auto flex flex-row ">
      <aside className="flex flex-col bg-hover shadow-2xl" style={{ borderRight: '1px solid gray', width: '20%' }}>

        <div className="flex flex-row pb-5 pt-6 px-3 bg-hover" style={{ borderBottom: '1px solid gray' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              borderRadius: "1em 0 0 1em",
              width: "200px",
              border: '1px solid gray'
            }}
            className="text-black px-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-center"
            value={filterValueName}
            onChange={handleFilterName}
          />
          <button
            type="button"
            onClick={handleSearch}
            style={{
              borderRadius: "0 1em 1em 0",
              padding: "1.5px",
              borderLeft: "1px solid gray",
              paddingRight: "10px",
              paddingLeft: "5px",
              border: "1px solid gray",
            }}
            className="bg-white text-white rounded-r focus:outline-none focus:ring focus:border-blue-300"
          >
            &#128269;
          </button>
        </div>

        <div className="flex flex-col">
          <DropDownMenu
            handleMaterials={handleMaterials}
            handleFilter={handleFilter}
            handleOrder={handleOrder}
            handleClearFilters={handleClearFilters}
          />
        </div>
      </aside>
      <main className="flex flex-col justify-center container" style={{ marginInline: 'auto' }}>
        <div
          className="flex flex-wrap gap-8 justify-center items-center mb-3"
          style={{ marginTop: "30px" }}
        >
          {currentProducts.map((product) => (
            <div key={product.id}
              className="hover:transform hover:scale-105 transition-transform duration-300"
              style={{ width: '28%', height: '380px' }}
            >
              <Card
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
              />
            </div>


          ))}
        </div>
        {products.length ? (
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                totalFilteredProducts.length / productsPerPage
              )}
              onPageChange={paginate}
            />
          </div>
        ) : (
          <div className="h-screen">
            <p></p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Store;
