"use client";
import Swal from "sweetalert2";
import { useState } from "react";
import validatePost from "./validation";
import Card from "../components/card/Card";
import image from "../../../public/images/Green-Wave.png";
import "../../../public/estilos/postbutton.css";
import axios from "axios";
export default function PostProduct() {
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    image: "",
    status: "",
    price: "",
    rating: "",
    materials: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    let newProduct;
    if (e.target.name === "price") {
      const price = parseFloat(e.target.value);
      if (!isNaN(price)) {
        newProduct = { ...product, price: price.toFixed(2) + "$" };
      }
    }
    if (e.target.name === "imgFile") {
      setFile(e.target.files[0]);
      newProduct = { ...product, [e.target.name]: e.target.value, image: "" };
    } else if (e.target.name === "image") {
      newProduct = { ...product, [e.target.name]: e.target.value };
      setFile(null);
    } else {
      newProduct = { ...product, [e.target.name]: e.target.value };
    }
    setProduct(newProduct);
    const validateErrors = validatePost(newProduct);
    setErrors(validateErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validatePost(product);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      return "all required fields";
    }
    try {
      const endPoint = "http://localhost:3001/products";
      const response = await axios.post(endPoint, product);
      if (response.status === 200) {
        return Swal.fire({
          title: "Your product has been published!",
          icon: "success"
        });
      }
      setProduct({
        name: "",
        image: "",
        status: "",
        price: "",
        rating: "",
        materials: "",
        description: "",
      });
      setFile(null);
      setErrors(null);
    } catch (error) {
      setErrors(error.message);
    }
  };
  console.log(product);

  return (
    <div>
      <h2 className="text-2xl font-bold m-2 text-center">Publish your product</h2>
      <div className="form m-2 flex justify-center items-center">
        <div className="flex gap-3 items-center">
          <div className="w-3/4">
            <form
              className="bg-custom-green text-black rounded-lg p-8 max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Recycled lamp.."
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm italic">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    placeholder="New"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mb-4">
                  <label className="block mb-2">Rating</label>
                  <input
                    type="text"
                    name="rating"
                    placeholder="4"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Materials</label>
                  <input
                    type="text"
                    name="materials"
                    placeholder="Glass, plastic.."
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mb-4">
                  <label className="block mb-2">Price</label>
                  <div className="flex">
                    <span className="bg-gray-200 p-2 border border-r-0 border-gray-300 rounded-l">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="$$$"
                      min="0"
                      name="price"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-r"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm italic">
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Add an image</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://image.jpg"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm italic">{errors.image}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                Or select an image to upload:
                </label>
                <input
                  type="file"
                  name="imgFile"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="..."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm italic">
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button id="button" className=" bg-lime-100  hover:bg-lime-900 hover:text-lime-50  rounded-lg p-1">
                  <span>Publish</span>
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2 h-200">
            <Card
              id={product.id}
              name={product.name}
              image={product?.image || image}
              price={product.price}
              rating={product.rating}
              description={product.description}
              showStars={false}
              showbuybutton={false}
              showdescription={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
