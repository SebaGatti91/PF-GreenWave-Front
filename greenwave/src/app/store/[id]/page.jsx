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
      stock: product.stock
    });
    setAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(params.id);
    setAddedToCart(false); // Cambia el estado a false al hacer clic en el basurero
  };

  useEffect(() => {
    loadProductDetail(params.id);
  }, [params.id]);


  console.log(product);
  if (!product) {
    // Puedes agregar un indicador de carga aquí
    return null;
  }
  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center items-center p-7">
          <div className="relative p-5 bordercontainer w-4/5 rounded-lg" 
          style={{background: 'linear-gradient(to right top, #386b67, #407f77, #4a9486, #55a995, #63bea2)'}}>
            <Link href="/store">
              <button
                className="bg-transparent"
                style={{ borderRadius: "2em 2em" }}
              >
                <span className="mr-2 text-white ">&#8592;</span> BACK TO STORE
              </button>
            </Link>
            <div className="flex justify-center containerDetail">
              {
                <Image
                  className="p-1 shadow-2xl rounded-lg bg-hover"
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  style={{ boxShadow: "4px 6px gray", width: '250px', height: '200px' }}
                />
              }

              <div className="flex flex-col items-center p-3 ml-3">
                {user.admin || foundUserProduct ? (
                  <div className="absolute top-0 right-0">
                    <button
                      onClick={handleProd}
                      className="bg-hover hover:bg-red-700 text-white font-bold m-3 px-4 py-1 rounded"
                      style={{
                        borderRadius: "2em 2em",
                        background: 'linear-gradient(to right top, #445a59, #446463, #446e6d, #427978, #408383)'
                      }}
                    >
                      <img
                        src="/images/borrar.png"
                        alt="borrado"
                        style={{ width: "22px", height: "22px", }}
                      />
                    </button>
                    <button
                      onClick={handleEdit}
                      className="bg-hover hover:bg-blue-700 text-white font-bold m-3 px-4 py-1 rounded"
                      style={{
                        borderRadius: "2em 2em", 
                        background: 'linear-gradient(to right top, #445a59, #446463, #446e6d, #427978, #408383)'
                      }}
                    >
                      <img
                        src="/images/editar.png"
                        alt="borrado"
                        style={{ width: "22px", height: "22px", }}
                      />
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col justify-start">
                <h1
                  className="p-3 title-font font-medium text-center"
                  style={{ fontFamily: "font-serif", fontSize: "2em" }}
                >
                  {product.name}
                </h1>
                <div>

                <p
                  className="font-bold leading-relaxed text-left w-full ml-4"
                  style={{ fontFamily: "font-serif", fontSize: "1.5em" }}
                  >
                  $ {product.price}
                </p>
                </div>
                <div>
                  <p
                    className="p-2 m-2 leading-relaxed text-left"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "1.1em",
                    }}
                  >
                    {product.description}
                  </p>
                </div>
                </div>
                

                <div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={handleBuy}
                      className="hover:text-blue-900 m-2 bg-transparent text-black px-3 py-1 rounded -md border border-solid border-gray-500"
                    >
                      Buy now
                    </button>

                    <div className="flex justify-center">
                      {addedToCart ? (
                        <>
                          <button
                            className="bg-red-500 hover:bg-red-700 p-1 rounded -md"
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
                            onClick={() => countUpCart(params.id, product.stock)}
                            style={{ border: "1px solid gray" }}
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-row items-center">

                        <button
                          className="hover:text-green-900 bg-transparent text-black px-3 py-1 rounded -md border border-solid border-gray-500 hover:border-green-900"
                          onClick={handleAddToCart}
                        >
                          🛒 Add to cart
                        </button>
                        <h3 className=" absolute bottom-0 right-0 m-2 px-2 rounded-lg" style={{border: '1px solid #718096'}}> Stock: {product.stock}</h3>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        <div className="flex">
          <ReviewList rating={product.rating} reviewedBy={product.Reviews} />
          {/* <button onClick={handlepost} className="elemento">
            add a review
          </button> */}
        </div>
      </div>
    );
  }
}
