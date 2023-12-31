"use client";
import Card from "../components/card/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination/Pagination";
import DropDownMenu from "../components/dropDownMenu/DropDownMenu";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import './store.css'

const Store = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("Products");
  const [filterValueMaterial, setFilterValueMaterial] = useState("Materials");
  const [orderValue, setOrderValue] = useState("Alfabetico");
  const [filterValueName, setFilterValueName] = useState("");
  const [totalFilteredProducts, setTotalFilteredProducts] = useState([]);
  const [filtersActive, setFiltersActive] = useState(false);
  const [ordersActive, setOrdersActive] = useState(false);
  const productsPerPage = 6;

  const fetchData = async () => {
    try {
      let url = "/store?";

      // Agregar el filtro de materiales solo si no es 'Materials'
      if (filterValueMaterial !== "Materials") {
        url += `material=${filterValueMaterial}&`;
      }

      // Agregar el filtro de rating solo si no es 'Products'
      if (filterValue !== "Products") {
        url += `filter=${filterValue}&`;
      }

      // Agregar el filtro de orden solo si no es 'Alfabetico' o 'Price'
      if (orderValue !== "Alfabetico" && orderValue !== "Price") {
        url += `sort=${orderValue}&`;
      }

      // Agregar el filtro de nombre solo si no está vacío
      if (filterValueName.trim() !== "") {
        url += `name=${filterValueName}&`;
      }

      const response = await axios.get(url);
      const { data } = response;
      setProducts(data);
      setTotalFilteredProducts(data);
      setFiltersActive(
        filterValue !== "Products" || filterValueName.trim() !== ""
      );
      setOrdersActive(orderValue !== "Alfabetico" && orderValue !== "Price");

      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterValue, orderValue, filterValueMaterial]);

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

  const handleClearFilters = () => {
    // Restablecer estados de filtros y ordenamientos
    setFilterValue("Products");
    setFilterValueMaterial("Materials");
    setOrderValue("Alfabetico");
    setFilterValueName("");

    // Volver a obtener datos
    fetchData();
  };

  const handleMaterials = (event) => {
    const selectedMaterial = event.target.value;
    if (selectedMaterial === "Materials") {
      setFilterValueMaterial(selectedMaterial);
      setFilterValue("Products"); // Restaurar el valor predeterminado para el filtro general
      fetchData(); // Volver a obtener datos
    } else {
      setFilterValueMaterial(selectedMaterial);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredProductsByStockOrPoused = products.filter(
    (product) => product.stock > 0 && !product.paused && product.deleted !== true
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsByStockOrPoused.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="mx-auto flex flex-col sm:flex-row ">
      <aside
        className="flex flex-col bg-hover shadow-2xl"
        style={{ borderRight: "1px solid gray" }}
      >
        <div className="flex justify-center flex-row pb-4 pt-6 px-3 bg-hover">
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "200px",
              border: "1px solid gray",
            }}
            className="text-black px-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 text-center"
            value={filterValueName}
            onChange={handleFilterName}
          />
          <button
            type="button"
            onClick={handleSearch}
            style={{
              padding: "1.5px",
              borderLeft: "1px solid gray",
              paddingRight: "10px",
              paddingLeft: "5px",
              border: "1px solid gray",
            }}
            className="bg-white text-white rounded-r-lg focus:outline-none focus:ring focus:border-blue-300"
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

      <main
        className="flex  flex-col justify-center container"
        style={{ marginInline: "auto", width: "100%" }}
      >
        <div
          className="flex flex-wrap gap-3 lg:gap-12 justify-center items-center mb-3"
          style={{ marginTop: "30px" }}
        >

          {currentProducts.length !== 0 && products.length !== 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="hover:transform hover:scale-105 transition-transform duration-500"
                
              >
                <Card
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  stock={product.stock}
                />
              </div>
            ))
          ): (
            <Image
              className="rounded-md ml-80 imagen"
              src={"/images/store.png"}
              alt={"store"}
              height={500}
              width={500}
              style={{ width: "300px", height: "300px", marginInline: "auto" }}
            />
          )}
        </div>
        {products.length !== 0? (
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProductsByStockOrPoused.length / productsPerPage)}
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
