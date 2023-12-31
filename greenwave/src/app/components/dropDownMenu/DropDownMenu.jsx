import axios from "axios";
import { useState, useEffect } from "react";
import { fetchMaterials } from "../../lib/data";
const DropDownMenu = ({
  handleMaterials,
  handleFilter,
  handleOrder,
  handleClearFilters,
}) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterialsDb = async () => {
      try {
        const materialsDb = await fetchMaterials();
        setMaterials(materialsDb);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterialsDb();
  }, []);

  return (
    <div className="flex flex-col justify-evenly mb-4 pb-8">
      <div className="pb-2 bg-hover">
        <div className="flex flex-col">
          <h3 className="text-left  font-semibold text-base pl-8 pt-6 pb-3 sm:block hidden">
            Materials
          </h3>
          <select
            id="selectedMaterial"
            name="selectedMaterial"
            onChange={handleMaterials}
            className="text-center pl-4 py-1 rounded-lg bg-white hover:cursor-pointer"
            style={{
              marginInline: "auto",
              width: "80%",
              border: "1px solid gray",
            }}
          >
            <option value="Materials">All Materials</option>
            {console.log(materials)}
            {materials?.map((material) => (
              <option
                className="text-center"
                key={material.id}
                value={material.name}
              >
                {material.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div className="pb-6 bg-hover" style={{ borderBottom: '1px solid gray' }}>
        <h3 className="text-left font-semibold text-lg pl-8 pt-6 pb-3">Rating</h3>
        <select
          onChange={handleFilter}
          className="flex justify-center rounded-lg bg-white hover:cursor-pointer pl-4 py-1"
          style={{ marginInline: 'auto', width: '80%', border: '1px solid gray' }}>
          <option value="Rating" className="text-center">Rating</option>
          <option value="1" className="text-center">1</option>
          <option value="2" className="text-center">2</option>
          <option value="3" className="text-center">3</option>
          <option value="4" className="text-center">4</option>
          <option value="5" className="text-center">5</option>
        </select>
      </div> */}

      <div className="pb-2 bg-hover">
        <h3 className="text-left font-semibold text-base pl-8 mt-6 mb-3 sm:block hidden">
          Alphabetical Order
        </h3>
        <select
          onChange={handleOrder}
          className="flex justify-center rounded-lg bg-white hover:cursor-pointer pl-4 py-1"
          style={{
            marginInline: "auto",
            width: "80%",
            border: "1px solid gray",
          }}
        >
          <option value="Alfabetico" className="text-center">
            Alphabetical
          </option>
          <option value="nameAsc" className="text-center">
            Ascending
          </option>
          <option value="nameDesc" className="text-center">
            Descending
          </option>
        </select>
      </div>

      <div className="pb-5 bg-hover">
        <h3 className="text-left font-semibold text-base pl-8 mt-6 mb-3 sm:block hidden">
          Order by price
        </h3>
        <select
          onChange={handleOrder}
          className="flex justify-center rounded-lg bg-white hover:cursor-pointer pl-4 py-1"
          style={{
            marginInline: "auto",
            width: "80%",
            border: "1px solid gray",
          }}
        >
          <option className="text-center" value="Price">
            Price
          </option>
          <option className="text-center" value="priceAsc">
            Ascending
          </option>
          <option className="text-center" value="priceDesc">
            Descending
          </option>
        </select>
      </div>

      <div className="bg-hover flex justify-center">
        <button
          onClick={handleClearFilters}
          className="mt-3 py-1 px-2 text-lime-50 hover:text-black bg-clear hover:bg-hover-clear hover:cursor-pointer rounded-xl"
          style={{ width: "130px", listStyle: "none", marginInline: "auto" }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default DropDownMenu;
