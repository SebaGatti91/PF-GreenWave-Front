'use client'
import Card from "../components/card/Card";
import axios from "axios";
import { useState } from 'react'
import Pagination from '../components/pagination/Pagination'

const Store = async () => {

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  const loadProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const { data } = response;
      return data;
    } catch (error) {
      throw Error(error);
    }
  };

  const products = await loadProducts();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-evenly mb-4">
        <div className="mr-4">
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
        </div>

        <div className="mr-4">
          <select
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Products">
              Rating
            </option>
            <option className="text-center" value="Rating">
              Ascendent
            </option>
            <option className="text-center" value="Materials">
              Descendent
            </option>
          </select>
        </div>
        <div className="mr-4">
          <select
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Alfabetico">
              Order
            </option>
            <option className="text-center" value="Ascendent">
              Ascendent
            </option>
            <option className="text-center" value="Descendent">
              Descendent
            </option>
          </select>
        </div>
        <div>
          <select
            className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer"
            style={{ borderRadius: "1em 1em" }}
          >
            <option className="text-center" value="Price">
              Price
            </option>
            <option className="text-center" value="Ascendent">
              Ascendent
            </option>
            <option className="text-center" value="Descendent">
              Descendent
            </option>
          </select>
        </div>
      </div>

      {products.length ? <div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          onPageChange={paginate}
        />
        </div> : <div><p> No existen coincidencias entre los filtros aplicados.</p></div>
      }

      <div className="flex flex-wrap justify-center items-center mb-3">
        {currentProducts.map((product) => (
          <div key={product.id} className=" hover:transform hover:scale-105 transition-transform duration-300">
            <Card
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
