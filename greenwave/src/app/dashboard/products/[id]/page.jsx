"use client";
import { useState, useEffect } from "react";
import { fetchProductById, pauseProduct } from "../../../lib/data";
import { updateProduct } from "../../../lib/data";
import Link from "next/link";
import Image from "next/image";

const EditProductForm = ({ product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    stock: 0,
    price: 0,
    description: "",
  });

  useEffect(() => {
    // Actualizar el estado inicial de formData cuando cambie el producto
    setFormData({
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
      description: product.description,
    });
  }, [product]); // Ejecutar este efecto cuando cambie el producto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="image" className="block text-sm font-medium text-white">
          Image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="stock" className="block text-sm font-medium text-white">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="price" className="block text-sm font-medium text-white">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          style={{ backgroundColor: "white", color: "black" }}
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

const ProductProfile = ({ params }) => {
  const [productView, setProductView] = useState([]);
  const productId = params.id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProductView(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handlePause = async (productId) => {
    try {
      await pauseProduct(productId);
      const updatedProduct = await fetchProductById(productId);
      setProductView(updatedProduct);

      console.log(`Product with ID ${productId} paused successfully.`);
    } catch (error) {
      console.error(`Error pausing product with ID ${productId}:`, error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateProduct(productView.id, updatedData);
      const updatedProduct = await fetchProductById(productView.id);
      setProductView(updatedProduct);

      console.log(`Product with ID ${productView.id} updated successfully.`);
    } catch (error) {
      console.error(`Error updating product with ID ${productView.id}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">Product Profile</h1>
        <Link href="/dashboard/products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to products
          </button>
        </Link>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col items-center">
          <Image
            src={productView.image || "/images/noavatar.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold mt-4">ID: {productView.id}</h2>
          <p>Name: {productView.name}</p>
          <p>Price: {productView.price}</p>
          <p>Stock: {productView.stock}</p>
          <p>Rating: {productView.rating}</p>
          <p>Description: {productView.description}</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                productView.paused ? "text-red-500" : " text-green-500"
              } font-bold`}
            >
              {productView.paused ? "Paused" : "Active"}
            </span>
          </p>
          <button
            className={`${
              productView.paused
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } px-4 py-2 rounded mt-2`}
            onClick={() => handlePause(productView.id)}
          >
            {productView.paused ? "Active" : "Pause"}
          </button>
        </div>
      </div>
      <div className="mt-8">
        {productView.userId === null && (
          <>
            <h2 className="text-2xl font-bold text-white">Edit Product</h2>
            <EditProductForm product={productView} onUpdate={handleUpdate} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductProfile;
