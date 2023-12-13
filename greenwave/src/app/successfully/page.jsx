"use client";
import Link from "next/link";
import { useContext, useEffect} from "react";
import { CartContext } from "../components/cart/cartContext";
import { fetchFeedback } from "../lib/data";

export default function Success() {
  
  const { cart, setCart } = useContext(CartContext);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  const debouncedFetchFeedback = debounce(fetchFeedback, 500); // Adjust wait time as needed
  
  useEffect(() => {
    const fetchDataAndResetCart = async () => {
      try {
        if (cart.length > 0) {
          debouncedFetchFeedback(cart);
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchDataAndResetCart();
  }, [cart, setCart])

  return (
    <div
      className="m-3 flex flex-col justify-center items-center"
      style={{ height: "69.5vh" }}
    >
      <h1 className="text-3xl font-bold text-center">
        Your purchase has been a success!
      </h1>
      <span className="m-3 block max-w-lg">
        <p>
        Thank you from the bottom of our hearts for choosing us! Your purchase
        has been a resounding success, and we are thrilled to have you as part
        of our valued customer community.
        </p>
      </span>
      <div className="m-2">
        <img src="/images/Green-Wave.png" alt="greenWave logo" />
      </div>
      <Link href="/homepage">
        <button className="m-4 bg-transparent border border-black text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
