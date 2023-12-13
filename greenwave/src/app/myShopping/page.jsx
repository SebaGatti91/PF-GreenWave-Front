"use client";
import { fetchPurchases } from "../lib/data";
import { useState, useEffect, useContext } from "react";
import { GlobalUser } from "../components/users/globalUsers";
import ReviewForm from "../components/postReview/PostReview";
import Image from "next/image";
import Link from "next/link";
import LeftMenu from "../components/leftMenu/LeftMenu";
import Button from "../components/button/Button";
const myShopping = () => {
  const [myShopping, setMyShopping] = useState([]);
  const [showPostReview, setShowPostReview] = useState(false);
  const [review, setReview] = useState(false);
  const { user } = useContext(GlobalUser);

  const handleModalReview = () => {
    setReview(true);
  };

  const closeModal = () => {
    setReview(false);
  };

  const handleReview = (id) => {
    setShowPostReview((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const fetchData = async () => {
    const data = await fetchPurchases(user.id);
    return setMyShopping(data);
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="mx-auto flex flex-col sm:flex-row ">
      <div>
        <LeftMenu />
      </div>
      <div className="w-4/5" style={{ marginInline: "auto" }}>
        <h1
          className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
          style={{ width: "100%", marginInline: "auto" }}
        >
          My Shopping
        </h1>
        {myShopping && myShopping.length !== 0 ? (
          myShopping?.map((purchase) => (
            <div
              key={purchase.id}
              className=" flex flex-col lg:flex-row justify-between mb-10 mt-5 shadow-2xl rounded-lg pb-5"
              style={{
                backgroundColor: "#D1D7BF",
                border: "1px solid gray",
              }}
            >
              <div className="flex flex-col lg:flex-row">
                <Image
                  className="w-60 h-40 rounded-md"
                  src={purchase.image[0]}
                  alt={purchase.name}
                  height={150}
                  width={150}
                  style={{
                    height: "150px",
                    marginTop: "20px",
                    marginLeft: "33px",
                    border: "2px solid gray",
                  }}
                />
                <div className="flex flex-col text-start p-4 ml-3">
                  <h3
                    className="font-bold py-1 text-left text-lg"
                    style={{ width: "100%", textShadow: "1px 1px gray" }}
                  >
                    {purchase.name}
                  </h3>
                  <h3
                    className="text-green-600 py-1 text-lg"
                    style={{
                      color: "#8E9681",
                      textShadow: "1px 1px gray",
                    }}
                  >
                    $ {purchase.price}
                  </h3>
                  <p className="py-1 w-full">{purchase.description}</p>

                  {purchase.reviewedBy.includes(user.id) ? (
                    <p className="text-sm mt-3 text-gray-500">
                      You have already reviewed this product.
                    </p>
                  ) : (
                    <button
                      className="rounded-lg bg-button hover:bg-hover-clear mt-3"
                      style={{ width: "150px" }}
                      onClick={() => {
                        handleReview(purchase.id);
                        handleModalReview();
                      }}
                    >
                      Add your Review
                    </button>
                  )}
                  <Link
                    href={`/store/${purchase.id}`}
                    className="flex justify-start w-full"
                  >
                    <button
                      className="rounded-lg mt-3 bg-button hover:bg-hover-clear"
                      style={{
                        width: "150px",
                      }}
                    >
                      See more
                    </button>
                  </Link>
                  {review && (
                    <div className="fixed rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 md:w-2/3 lg:w-1/2 xl:w-1/3">
                      {showPostReview[purchase.id] && (
                        <ReviewForm productId={purchase.id} closeModal={closeModal} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
          ) : (
            <div>
            <div className="flex flex-col justify-center items-center ">
            <Button
              link={"/store"}
              text={"Start shopping"}
              className={
                "p-2 bg-lime-800 hover:bg-lime-700 text-black-50 relative rounded-lg m-5 px-5 py-2 text-lg "
              }
            />
            <Image
              className=" rounded-md"
              src={"/images/myShoppings.png"}
              alt={"myProducts"}
              height={500}
              width={500}
              style={{ width: "620px", height: "620px", marginInline: "auto"}}
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default myShopping;
