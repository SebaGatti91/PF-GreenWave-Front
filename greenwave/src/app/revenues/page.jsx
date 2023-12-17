"use client";
import { useState, useEffect, useContext } from "react";
import { fetchUsers, fetchUserProducts } from "../lib/data";
import { GlobalUser } from "../components/users/globalUsers";
import LeftMenu from "../components/leftMenu/LeftMenu";
const Revenues = () => {
  const [users, setUsers] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const { user } = useContext(GlobalUser);
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        const fetchedUserProducts = await fetchUserProducts(user?.id);
        setUsers(fetchedUsers);
        setUserProduct(fetchedUserProducts);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [user?.id]); // Solo se ejecuta una vez al montar la página
  const allPurchases = users
    .flatMap((user) => user.purchases)
    .map((purchase) => ({
      id: purchase.Product.id,
      name: purchase.Product.name,
      image: purchase.Product.image,
      price: purchase.Product.price,
      quantity: purchase.quantity,
    }));

  const userProductsId = userProduct?.map((product) => product.id);

  const soldProducts = allPurchases?.filter((purchase) =>
    userProductsId?.includes(purchase.id)
  );
  const revenue = soldProducts?.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <LeftMenu />
      </div>
      <div className="lg:w-full m-2 lg:m-5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          Revenues
        </h1>
        <h2 className="text-center text-xl lg:text-2xl">
          Total revenues:
          <span className="text-green-700 font-bold"> ${revenue}</span>
        </h2>

        {soldProducts && soldProducts.length > 0 ? (
          <table className="m-5 mx-auto w-full shadow-2xl">
            <thead>
              <tr  style={{background: "#9CA88A"}}>
                <th className="p-4 border-4 border-green-800 ">Name</th>
                <th className="p-4 border-4 border-green-800 ">
                  Quantity
                </th>
                <th className="p-4 border-4 border-green-800">Price</th>
                <th className="p-4 border-4 border-green-800">Total</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts?.map((soldProduct) => (
                <tr key={soldProduct.id} style={{background: "#D7DCD0"}}>
                  <td className="p-4 border-4 border-green-800 rounded text-center">
                    {soldProduct.name}
                  </td>
                  <td className="p-4 border-4 border-green-800 rounded text-center">
                    {soldProduct.quantity}
                  </td>
                  <td className="p-4 border-4 border-green-800 rounded text-center">
                    ${soldProduct.price}
                  </td>
                  <td className="p-4 border-4 border-green-800 rounded text-center">
                    ${soldProduct.price * soldProduct.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-orange-800 font-bold text-center mt-3 mb-3">
            No sold products yet
          </p>
        )}
      </div>
    </div>
  );
};
export default Revenues;
