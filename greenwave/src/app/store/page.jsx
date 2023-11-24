import products from "./products.json";
import Card from "../components/card/Card";

const Store = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-evenly mb-4">
        <div className="mr-4">
          
          <select className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer" style={{borderRadius: '1em 1em'}}>
          <option className="text-center" value="Products">Materials</option>
            <option className="text-center" value="Rating">Cardboard</option>
            <option className="text-center" value="Materials">Wood</option>
          </select>
        </div>

        <div className="mr-4">
          
          <select className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer" style={{borderRadius: '1em 1em'}}>
          <option className="text-center" value="Products">Rating</option>
            <option className="text-center" value="Rating">Ascendent</option>
            <option className="text-center" value="Materials">Descendent</option>
          </select>
        </div>
        <div className="mr-4">
          
          <select className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer" style={{borderRadius: '1em 1em'}}>
            <option className="text-center" value="Alfabetico">Order</option>
            <option className="text-center" value="Ascendent">Ascendent</option>
            <option className="text-center" value="Descendent">Descendent</option>
          </select>
        </div>
        <div>
          
          <select className="py-1 px-2 bg-hover hover:bg-boton hover:cursor-pointer" style={{borderRadius: '1em 1em'}}>
            <option className="text-center" value="Price">Price</option>
            <option className="text-center" value="Ascendent">Ascendent</option>
            <option className="text-center" value="Descendent">Descendent</option>
          </select>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <div key={product.id} className="">
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
