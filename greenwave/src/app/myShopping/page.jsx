"use client";
import { fetchPurchases } from "../lib/data";
import { useState, useEffect, useContext } from "react";
import { GlobalUser } from "../components/users/globalUsers";
import ReviewForm from '../components/postReview/PostReview'
import Image from "next/image";
import Link from "next/link";
import '../../../public/estilos/buycart.css'
const myShopping = () => {
  const [myShopping, setMyShopping] = useState();
  const [showPostReview, setShowPostReview] = useState()
  const { user } = useContext(GlobalUser);

const handleReview = ()=>{
  setShowPostReview(!showPostReview)
}

  const fetchData = async () => {
    const data = await fetchPurchases(user.id);
    return setMyShopping(data);
  };
  useEffect(() => {
    fetchData();
  }, [user]);
console.log(myShopping);
  return (
    <div
      className="w-3/4 flex flex-col justify-center"
      style={{ marginInline: "auto" }}
    >
      <h1
        className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
        style={{ width: "100%", marginInline: "auto" }}
      >
        My Shopping
      </h1>
      {myShopping?.map((purchase) => (
        <div
          key={purchase.id}
          className="relative flex flex-row justify-between mb-10 mt-5 shadow-2xl rounded-lg pb-5 hover:transform hover:scale-105 transition-transform duration-300"
          style={{
            backgroundColor: "#D1D7BF",
            border: "1px solid gray",
          }}
        >
          <div className="flex flex-row">
            <Image
              className="w-60 h-40 rounded-md"
              src={purchase.image}
              alt={purchase.name}
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
              <p className="py-1 w-full" style={{ height: "80px" }}>
                {purchase.description}
              </p>
              <Link
                href={`/store/${purchase.id}`}
                className="flex justify-start w-full"
              >
                <button
                  className="rounded-lg bg-button hover:bg-hover-clear"
                  style={{
                    width: "12%",
                  }}
                >
                  More
                </button>
              </Link>
              <div>
              <button className="elemento" style={{height: "50px", marginTop:"20px"}} onClick={handleReview}>add your Review</button>
                {showPostReview && (
                  <ReviewForm product={purchase.id}/>               
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default myShopping;
