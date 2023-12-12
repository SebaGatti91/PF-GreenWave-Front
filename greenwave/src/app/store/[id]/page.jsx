"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/cart/cartContext";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import "./detail.css";
import PostProduct from "../../post-product/page";
import Skeleton from "./Skeleton";
import { deleteProduct } from "../../lib/data";
import { GlobalUser } from "../../components/users/globalUsers";
import ReviewList from "../../components/postReview/GetReview";
export default function Detail({ params }) {
  const BackUrl = process.env.BACK;

  // if (!params) {
  //   // Manejar el caso donde params o id no están presentes
  //   return <div>Error: Missing params or id</div>;
  // }
  const { id } = params;

  const { user } = useContext(GlobalUser);

  const router = useRouter();
  const { data: session } = useSession();
  const userAut = session?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  const [loading, SetLoading] = useState(true);
  const { addToCart, cart, countDownCart, countUpCart, removeFromCart } =
    useCart();

  const item = cart.find((item) => item.id === params.id);

  const foundUserProduct = user.posted?.find((product) => product.id === id);
  const loadProductDetail = async (id) => {
    try {
      const response = await axios.get(`/store/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product detail:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, []);

  const [activeImg, setActiveImg] = useState(null);

  const createPreference = async () => {
    try {
      const response = await axios.post(`${BackUrl}/mercadoPago`, {
        userId: user.email,
        productId: product.id,
        item: [
          {
            id: product.id,
            title: product.name,
            unit_price: product.price,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
      });
      window.location.href = response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleProd = async () => {
    await deleteProduct(params.id);
    router.push("/store");
  };

  const handleBuy = async () => {
    if (userAut) {
      const id = await createPreference();
      if (id) setPreferenceId(id);
    } else {
      router.push("/login");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };
  const handleAddToCart = () => {
    addToCart({
      id: params.id,
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      userId: user?.email

    });
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(params.id);
    setAddedToCart(false);
  };

  useEffect(() => {
    loadProductDetail(params.id);
  }, [params.id]);

  console.log(product);
  if (!product) {
    return null;
  }

  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <div>
        <div className="flex flex-col justify-between lg:flex-row md:justify-center md:items-center p-6 gap-12">
          <div className="flex flex-col gap-5 lg:w-4/12 md:w-2/4 cursor-pointer">
            <Link href="/store">
              <button
                className="bg-transparent text-gray-600"
                style={{ borderRadius: "2em 2em" }}
              >
                <span className="mr-2 text-gray-600 ">&#8592;</span> BACK TO
                STORE
              </button>
            </Link>
            <img
              src={activeImg || product?.image[0]}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <img
                src={product?.image[0]}
                alt=""
                className="w-20 h-24 lg:w-28 lg:h-28 rounded-md cursor-pointer"
                onClick={() => setActiveImg(product?.image[0])}
              />
              <img
                src={product?.image[1]}
                alt=""
                className="w-20 h-24 lg:w-28 lg:h-28 md:w-14 rounded-md cursor-pointer"
                onClick={() => setActiveImg(product?.image[1])}
              />
              <img
                src={product?.image[2]}
                alt=""
                className="w-20 h-24 lg:w-28 lg:h-28 md:w-14 rounded-md cursor-pointer"
                onClick={() => setActiveImg(product?.image[2])}
              />
              <img
                src={product?.image[3]}
                alt=""
                className="w-20 h-24 lg:w-28 lg:h-28 md:w-14 rounded-md cursor-pointer"
                onClick={() => setActiveImg(product?.image[3])}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {user.admin || foundUserProduct ? (
              <div className="flex justify-end">
                <button
                  onClick={handleProd}
                  className="bg-orange-900 hover:bg-red-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: "2em 2em",
                  }}
                >
                  <img
                    src="/images/borrar.png"
                    alt="borrado"
                    style={{ width: "22px", height: "22px" }}
                  />
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-hover hover:bg-blue-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: "2em 2em",
                    background:
                      "linear-gradient(to right top, #445a59, #446463, #446e6d, #427978, #408383)",
                  }}
                >
                  <img
                    src="/images/editar.png"
                    alt="borrado"
                    style={{ width: "22px", height: "22px" }}
                  />
                </button>
              </div>
            ) : (
              ""
            )}
            <div>
              <span className="text-green-700 font-semibold">
                {product.materials}
              </span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <h4 className="text-lg font-semibold">${product.price}</h4>
            <p
              className={`m-2 rounded-lg ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                maxWidth: "200px", 
                margin: "0 auto", 
                border: "1px solid #718096",
                padding: "7px", 
              }}
            >
              Stock: {product.stock}
            </p>

            <div>
              <div className="flex flex-col items-center text-center p-3 ml-3">
                {product.stock !== 0 &&
                product.paused !== true &&
                !foundUserProduct ? (
                  <div>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={handleBuy}
                        className="bg-green-800 text-white font-semibold m-2 p-1 px-16 rounded-md h-full"
                      >
                        Buy now
                      </button>

                      <div className="flex justify-start items-start">
                        {addedToCart ? (
                          <>
                            <button
                              className="bg-orange-900 hover:bg-red-700 p-1 rounded-md"
                              onClick={() => handleRemoveFromCart()}
                            >
                              {
                                <img
                                  src="/images/rubishBeen.png"
                                  alt="rubishBeen"
                                  className="w-7 h-7"
                                />
                              }
                            </button>
                            <button
                              className="px-3 py-1 ml-4"
                              onClick={() => countDownCart(params.id)}
                              style={{
                                display:
                                  item && item.count > 0 ? "block" : "none",
                                border: "1px solid gray",
                              }}
                            >
                              -
                            </button>
                            <h3 className="bg-hover hover:bg-boton px-3 py-1">
                              {item ? item.count : 0}
                            </h3>
                            <button
                              className="px-3 py-1"
                              onClick={() =>
                                countUpCart(params.id, product.stock)
                              }
                              style={{ border: "1px solid gray" }}
                            >
                              +
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-row items-center">
                            <button
                              className="hover:text-green-900 bg-transparent text-black px-3 py-1 rounded-md border border-solid border-gray-500 hover:border-green-900"
                              onClick={handleAddToCart}
                            >
                              🛒 Add to cart
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* Modal de edición */}
                {isEditing && (
                  <div className="fixed top-0 bottom-0 w-9/12 flex items-center justify-center m-4	">
                    <div className="bg-white p-3 rounded-lg">
                      <PostProduct initialValues={product} isOff={false} />

                      <div className="flex justify-center">
                        <button
                          className=" bg-orange-800 hover:bg-red-700 text-white py-2 px-4 rounded"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <ReviewList rating={product.rating} reviewedBy={product.Reviews} />
            {/* <button onClick={handlepost} className="elemento">
            add a review
          </button> */}
          </div>
        </div>
      </div>
    );
  }
}
