import axios from "axios";
import { useState, useEffect } from "react";
const DropDownMenu = ({
  handleMaterials,
  handleFilter,
  handleOrder,
  handleClearFilters,
}) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:3001/materials");
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <details className="flex justify-evenly mb-4">
      <summary
        className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer rounded"
        style={{ width: "70px", listStyle: "none" }}
      >
        menu
      </summary>

      <div className="relative inline-block mr-4">
        <select
          name="materials"
          onChange={handleMaterials}
          className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer appearance-none"
          style={{ width: "130px" }}
        >
          <option value="Materials">Materials</option>
          {materials.map((material) => (
            <option key={material.id} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative inline-block mr-4">
        <select
          onChange={handleFilter}
          className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer appearance-none"
          style={{ width: "130px" }}
        >
          <option value="Rating">Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="relative inline-block mr-4">
        <select
          onChange={handleOrder}
          className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer appearance-none"
          style={{ width: "130px" }}
        >
          <option value="Alfabetico">Order Alfabetic</option>
          <option value="nameAsc">Ascendent</option>
          <option value="nameDesc">Descendent</option>
        </select>
      </div>
      <div className="relative inline-block">
        <select
          onChange={handleOrder}
          className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer appearance-none"
          style={{ width: "130px" }}
        >
          <option value="Price">Price</option>
          <option value="priceAsc">Ascendent</option>
          <option value="priceDesc">Descendent</option>
        </select>
      </div>
      <button
        onClick={handleClearFilters}
        className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer rounded"
        style={{ width: "130px", listStyle: "none" }}
      >
        Clear Filters
      </button>
    </details>
  );
};

export default DropDownMenu;
