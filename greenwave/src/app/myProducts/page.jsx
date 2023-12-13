"use client";
import { GlobalUser } from "../components/users/globalUsers";
import { useContext, useState, useEffect } from "react";
import { fetchUserProducts } from "../lib/data";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/button/Button";
import LeftMenu from "../components/leftMenu/LeftMenu";
import { pauseProduct } from "../lib/data";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const MyProducts = () => {
  const { user } = useContext(GlobalUser);
  const [userProducts, setUserProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const userProductsData = async () => {
      try {
        const userProductsData = await fetchUserProducts(user?.email);
        setUserProducts(userProductsData);
      } catch (error) {
        console.error("Error fetching userProducts:", error);
        // Puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario.
      }
    };

    if (user?.email) {
      userProductsData();
    }
  }, [user]);

  const handleActive = async (productId) => {
    const response = await pauseProduct(productId);

    if (response.status === 200) {
      router.push(`/profile/`);
      return Swal.fire({
        icon: "success",
        title: "Your product is active!",
        confirmButtonColor: "#426F66",
        text: "Now you can see it in the store",
      });
    }
  };
  const handlePause = async (productId) => {
    // router.push(`/profile/`);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Your product will not appear in the store!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pause it!",
    });
    if (result.isConfirmed) {
      const response = await pauseProduct(productId);
      if (response.status === 200) {
        router.push(`/profile/`);
        return Swal.fire({
          icon: "success",
          title: "Your product is pause!",
          confirmButtonColor: "#426F66",
          text: "You can active it whenever you want",
        });
      }
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <LeftMenu />
      </div>
      <div className="mr-5 w-4/5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          My Products
        </h1>

        {userProducts && userProducts.length !== 0 ? (
          userProducts?.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-row justify-between mb-10 mt-5 shadow-2xl rounded-lg pb-5 hover:transform hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: "#D1D7BF",
                border: "1px solid gray",
              }}
            >
              <div className="absolute top-10 right-0 ">
                <div
                  className={`mr-9 5 rounded-lg ${
                    product.paused === true
                      ? "hover:bg-green-500"
                      : "hover:bg-red-500"
                  }`}
                  style={{ border: "1px solid #718096" }}
                >
                  {product && product.approved === true ? (
                    product.paused === true ? (
                      <div>
                        <button onClick={() => handleActive(product.id)}>
                          Active
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => handlePause(product.id)}>
                          Pause
                        </button>
                      </div>
                    )
                  ) : null}
                </div>

                <h3
                  className={`absolute bottom-0 right-0 m-7 px-2 rounded-lg ${
                    product.paused === false ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ border: "1px solid #718096" }}
                >
                  {product.approved === true
                    ? product.paused === true
                      ? "Pause"
                      : "Active"
                    : "Pending"}
                </h3>
              </div>
              <div className="flex flex-row">
                <Image
                  className="w-60 h-40 rounded-md"
                  src={product.image[0]}
                  alt={product.name}
                  height={150}
                  width={150}
                  style={{
                    maxWidth: "200px",
                    height: "150px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    border: "2px solid gray",
                  }}
                />
                <div className="flex flex-col text-start p-4">
                  <h3
                    className="font-bold py-1 text-left text-lg"
                    style={{ width: "100%", textShadow: "1px 1px gray" }}
                  >
                    {product.name}
                  </h3>
                  <h3
                    className="text-green-600 py-1 text-lg"
                    style={{
                      color: "#8E9681",
                      textShadow: "1px 1px gray",
                    }}
                  >
                    $ {product.price}
                  </h3>
                  <p className="py-1 w-full text-justify" style={{ height: "100px" }}>
                    {product.description}
                  </p>

                  <Link
                    href={`/store/${product.id}`}
                    className="flex justify-start w-full"
                  >
                    <button
                      className="rounded-lg bg-button hover:bg-hover-clear"
                      style={{
                        width: "150px",
                      }}
                    >
                      See more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <Image
              className=" rounded-md ml-80"
              src={"/images/myProducts.png"}
              alt={"myProducts"}
              height={500}
              width={500}
              style={{ width: "320px", height: "320px", marginInline: "auto" }}
            />
            <Button
              link={"/post-product"}
              text={"Sell your product"}
              className={
                "p-2 bg-lime-800 hover:bg-lime-700 text-black-50 rounded-lg m-5 px-5 py-2 text-lg"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
