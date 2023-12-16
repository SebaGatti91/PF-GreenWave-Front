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
      <div className=" w-4/5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          Revenues
        </h1>
        <h2>Total revenues: ${revenue}</h2>
        {soldProducts && soldProducts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts?.map((soldProduct) => (
                <tr key={soldProduct.id}>
                  <td>{soldProduct.name}</td>
                  <td>{soldProduct.quantity}</td>
                  <td>${soldProduct.price}</td>
                  <td>${soldProduct.price * soldProduct.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sold products</p>
        )}
      </div>
    </div>
  );
};
export default Revenues;
