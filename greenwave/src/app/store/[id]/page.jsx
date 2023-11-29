"use client";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../components/cart/cartContext';
import { useState, useEffect } from 'react';
import PostProduct from '../../post-product/page'; // Asegúrate de importar correctamente el componente PostProduct

const loadDetail = async (id) => {
  const response = await axios.get(`http://localhost:3001/store/${id}`);
  return response.data;
};

export default function Detail({ params }) {
  const { addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(null);
  const router = useRouter();

  const loadProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/store/${id}`);
      console.log(response.data)
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product detail:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
  };

  const addCart = () => {
    addToCart(
      params.id,
      product.name,
      product.image,
      product.price,
      product.rating
    );
  };

  useEffect(() => {
    loadProductDetail(params.id);
  }, [params.id]);

  if (!product) {
    // Puedes agregar un indicador de carga aquí
    return null;
  }

  return (
    <div className="flex justify-center items-center p-7 ">
      <div
        className="p-7 m-5 border flex flex-col bg-lime-50 rounded-lg shadow-2xl"
        style={{ width: '65%' }}
      >
        <div className="flex flex-row">
          <Image
            className="p-1 shadow-2xl rounded-lg bg-hover"
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            style={{ boxShadow: '4px 6px gray' }}
          />

          <div className="text-center p-3 ml-3">
            <h1
              className="p-3 title-font font-medium"
              style={{ fontFamily: 'font-serif', fontSize: '1.5em' }}
            >
              {product.name}
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
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded mt-10"
                style={{
                  border: '1px solid gray',
                  borderRadius: '2em 2em',
                }}
              >
                Buy now
              </button>
              <button
                className=" hover:bg-green-900 bg-green-700 text-white m-3 px-3 py-1 rounded"
                style={{
                  border: '1px solid gray',
                  borderRadius: '2em 2em',
                }}
                onClick={addCart}
              >
                🛒 Add to cart
              </button>
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

        <div className="flex flex-row justify-center w-1/2 gap-8 mt-12 mb-8">
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
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg" style={{ width: '50%' }}>
            {/* Pasa los detalles del producto al componente PostProduct para la edición */}
            <PostProduct initialValues={product}/>

            <button
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
