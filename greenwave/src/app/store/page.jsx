import products from "./products.json";
import Card from "../components/card/Card";

const Store = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <div className="mr-4">
          <label className="mr-2">Filter by: </label>
          <select className="border rounded p-1">
            <option value="Rating">Rating</option>
            <option value="Materials">Materials</option>
          </select>
        </div>
        <div className="mr-4">
          <label className="mr-2">Order by name: </label>
          <select className="border rounded p-1">
            <option value="Ascendent">Ascendent</option>
            <option value="Descendent">Descendent</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Order by price: </label>
          <select className="border rounded p-1">
            <option value="Ascendent">Ascendent</option>
            <option value="Descendent">Descendent</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
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
