"use client";
import Card from "../components/card/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination/Pagination";

const Store = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState('Products');
  const [orderValue, setOrderValue] = useState('Alfabetico');

  const productsPerPage = 6;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/store");
        const { data } = response;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleOrder = (event) => {
    setOrderValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/store?filter=${filterValue}&sort=${orderValue}`
        );
        const { data } = response;
        setProducts(data);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterValue, orderValue]); 

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-evenly mb-4">
        {/* <div className="mr-4">
          <select
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Products">
              Materials
            </option>
            <option className="text-center" value="Rating">
              Cardboard
            </option>
            <option className="text-center" value="Materials">
              Wood
            </option>
          </select>
        </div> */}

        <div className="mr-4">
          <select
            onChange={handleFilter}
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Products">
              Rating
            </option>
            <option className="text-center" value="1">
              1
            </option>
            <option className="text-center" value="2">
              2
            </option>
            <option className="text-center" value="3">
              3
            </option>
            <option className="text-center" value="4">
              4
            </option>
            <option className="text-center" value="5">
              5
            </option>
          </select>
        </div>
        <div className="mr-4">
          <select
            onChange={handleOrder}
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Alfabetico">
              Order Alfabetic
            </option>
            <option className="text-center" value="nameAsc">
              Ascendent
            </option>
            <option className="text-center" value="nameDesc">
              Descendent
            </option>
          </select>
        </div>
        <div>
          <select
            onChange={handleOrder}
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Price">
              Price
            </option>
            <option className="text-center" value="priceAsc">
              Ascendent
            </option>
            <option className="text-center" value="priceDesc">
              Descendent
            </option>
          </select>
        </div>
      </div>

      {products.length ? (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / productsPerPage)}
            onPageChange={paginate}
          />
        </div>
      ) : (
        <div>
          <p> No existen coincidencias entre los filtros aplicados.</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center mb-3">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className=" hover:transform hover:scale-105 transition-transform duration-300"
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
    </div>
  );
};

export default Store;
