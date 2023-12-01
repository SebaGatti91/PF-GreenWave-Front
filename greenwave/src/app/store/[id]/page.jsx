"use client";
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../components/cart/cartContext';
import { useState, useEffect } from 'react';
import PostProduct from '../../post-product/page'; 
import Skeleton from './Skeleton'
const loadDetail = async (id) => {
  const response = await axios.get(`http://localhost:3001/store/${id}`);
  return response.data;
};

export default function Detail({ params, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  const [loading, SetLoading] = useState(true)
  const { addToCart, cart, countDownCart, countUpCart, removeFromCart } = useCart();

  const item = cart.find((item) => item.id === params.id);

  const loadProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/store/${id}`);
      console.log(response.data)
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product detail:', error);
    }
  };
  useEffect(()=>{
    setTimeout(()=>{
     SetLoading(false)
    },2000)
  },[])
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
      rating: product.rating
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

  if (!product) {
    // Puedes agregar un indicador de carga aquí
    return null;
  }
if(loading){
return(
  <Skeleton/>
)
}else{
  return (
    <div className="flex justify-center items-center p-7 ">
      <div
        className="p-7 m-5 border flex flex-col bg-lime-50 rounded-lg shadow-2xl"
        style={{ width: '65%' }}
      >
        <div className="flex flex-row">
          {<Image
            className="p-1 shadow-2xl rounded-lg bg-hover"
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            style={{ boxShadow: '4px 6px gray' }}
          /> }

          <div className="text-center p-3 ml-3">
            <h1
              className="p-3 title-font font-medium"
              style={{ fontFamily: 'font-serif', fontSize: '1.5em' }}
            >
              {product.name }
            </h1>
            <p
              className="font-bold text-left p-1"
              style={{ fontFamily: 'font-serif', fontSize: '1.5em' }}
            >
              $ {product.price}
            </p>
            <p
              className="text-left p-1"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '1.1em',
              }}
            >
              {product.description}
            </p>

            <div>
              <div className='flex flex-col justify-center items-center'>
                <button
                  className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded mt-10"
                  style={{
                    border: '1px solid gray',
                    borderRadius: '2em 2em',
                  }}
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
                          display: item && item.count > 0 ? "block" : "none",
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
                        onClick={() => countUpCart(params.id)}
                        style={{ border: "1px solid gray" }}
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      className="hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded"
                      style={{ border: "1px solid gray", borderRadius: "2em 2em" }}
                      onClick={handleAddToCart}
                    >
                      🛒 Add to cart
                    </button>
                  )}
                </div>
              </div>


              <div class="flex space-x-4 justify-center">
                <button
                  class="bg-orange-800 hover:bg-red-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: '2em 2em',
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  class="bg-sky-950 hover:bg-blue-700 text-white font-bold m-3 px-4 py-1 rounded"
                  style={{
                    borderRadius: '2em 2em',
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <Link href="/store">
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-4 py-1 rounded"
                style={{
                  border: '1px solid gray',
                  borderRadius: '2em 2em',
                  width: '50%',
                }}
              >
                Back to store
              </button>
            </Link>
          </div>
        </div>

        {<div className="flex flex-row justify-center w-1/2 gap-8 mt-12 mb-8">
           <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300"
            src={product.image}
            alt={product.name}
            width={200}
            height={250}
            style={{ boxShadow: '4px 4px gray' }}
          />

          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover hover:transform hover:scale-110 transition-transform duration-300"
            src={product.image}
            alt={product.name}
            width={200}
            height={250}
            style={{ boxShadow: '4px 4px gray' }}
          /> 
        </div>
        }
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="fixed top-0 bottom-0 w-9/12 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg" style={{ width: '50%' }}>
            {/* Pasa los detalles del producto al componente PostProduct para la edición */}
            <PostProduct initialValues={product} isOff={false} />

            <div className='flex justify-center'>
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
  );
}
}
