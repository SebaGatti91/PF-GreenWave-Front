"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
import {
  materialsApi,
  submitForm,
} from "../components/materialsApi/useMaterialsApi";

export default function PostProduct({ initialValues, isOff = true }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsData = await materialsApi();
        setMaterials(materialsData);
      } catch (error) {
        throw Error(error.message);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold m-2 text-center">
        {initialValues && initialValues.id
          ? "Edit Product"
          : "Publish your product"}
      </h2>

      <Formik
        initialValues={{
          name: initialValues ? initialValues.name : "",
          price: initialValues ? initialValues.price : "",
          stock: initialValues ? initialValues.stock : "",
          materials: initialValues ? initialValues.materials : "",
          rating: initialValues ? initialValues.rating : "",
          description: initialValues ? initialValues.description : "",
          image: initialValues ? initialValues.image : "",
        }}
        validate={(values) => {
          let errors = {};
          //validations for name
          if (!values.name) {
            errors.name = "Please enter the name of your product";
          } else if (!/^[a-zA-ZñÑ\s]{3,30}$/.test(values.name)) {
            errors.name = "Can only contain from 3 to 30 letters";
          }

          //validations for price
          if (!values.price) {
            errors.price = "Please enter the cost of the product";
          } else if (!/^\d{1,5}$/.test(values.price)) {
            errors.price = "Must only contain numbers up to 5 digits";
          }

          //validations for stock
          if (!values.stock) {
            errors.stock = "Please enter the stock of the product";
          } else if (!/^\d{1,5}$/.test(values.stock)) {
            errors.stock = "Must only contain numbers up to 5 digits";
          }

          //validation temporal for rating
          if (!values.rating) {
            errors.rating = "Please enter the product rating";
          } else if (!/^[1-5]$/.test(values.rating)) {
            errors.rating = "Must only contain numbers from 1 to 5";
          }

          //validations for description
          if (!values.description) {
            errors.description = "Please enter a product description";
          } else if (!/^[a-zA-ZñÑ\s]{1,300}$/.test(values.description)) {
            errors.description =
              "Must contain only letters and up to 300 characters";
          }

          //validation for image
          if (!values.image) {
            errors.image = "Please enter an image";
          } else {
            const allowedExtensions = /\.(jpg|jpeg|png)$/i;
            if (!allowedExtensions.test(values.image)) {
              errors.image = "Please upload a valid image file (JPG or PNG)";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          
          try {
            const formData = new FormData();
            if (file) {
              formData.append("image", file);

              // Carga la nueva imagen en Cloudinary
              const cloudinaryResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const cloudinaryData = await cloudinaryResponse.json();
              values.image = cloudinaryData.url;
            }

            const url =
              initialValues && initialValues.id
                ? `http://localhost:3001/products/${initialValues.id}`
                : "/api/upload"; 

            // Cambia el método de la solicitud según si es una edición o una publicación
            const method = initialValues && initialValues.id ? "PUT" : "POST";
            if (method === "PUT") {
              try {
                const response = await axios.put(
                  `http://localhost:3001/products/${initialValues.id}`,
                  values
                );
                console.log(initialValues);
                if (response.status === 200) {
                  router.push(`/profile/`)
                  return Swal.fire({
                    icon: "success",
                    title: "Product edited Successfully",
                    text: "Your product has been successfully edited.",
                  });
                }
              } catch (error) {
                throw Error(error);
              }
            }

            const response = await fetch(url, {
              method,
              body: formData,
            });

            const data = await response.json();
            
            values.image = data.url;

            submitForm(values, initialValues && initialValues.id)
              .then(() => {
                resetForm();
              })
              .catch((error) => {
                throw Error(error);
              });
          } catch (error) {
            throw Error(error);
          }
        }}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          handleBlur,
          errors,
          touched,
        }) => (
          <div className="flex">
            <form
              onSubmit={handleSubmit}
              className="w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-4 p-4"
              encType="multipart/form-data"
            >
              <div className="mb-4 w-full">
                <label htmlFor="name" className="font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  placeholder=" Recycled lamp.."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.name && errors.name && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <div className="mb-4 w-full">
                  <label htmlFor="price" className="font-semibold mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="price"
                    placeholder=" $$$"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {touched.price && errors.price && (
                    <div className="font-medium text-xs text-orange-700">
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="stock" className="mb-2 font-semibold">
                    Stock
                  </label>
                  <input
                    type="text"
                    id="stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="stock"
                    placeholder=" 5"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {touched.stock && errors.stock && (
                    <div className="font-medium text-xs text-orange-700">
                      {errors.stock}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="materials" className="font-semibold mb-2">
                  Materials
                </label>
                <select
                  name="materials"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value={values.materials} disabled>
                    Select Material
                  </option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.name}>
                      {material.name}
                    </option>
                  ))}
                </select>
                {touched.materials && errors.materials && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.materials}
                  </div>
                )}
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="name" className="font-semibold mb-2">
                  Rating
                </label>
                <input
                  type="text"
                  id="rating"
                  value={values.rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="rating"
                  placeholder=" 3 "
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.rating && errors.rating && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.rating}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="description" className="font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=" ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.description && errors.description && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="image" className="font-semibold mb-2">
                  Upload your image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    handleChange(event);
                    setFile(event.target.files[0]);
                  }}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.image && errors.image && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.image}
                  </div>
                )}
              </div>
              <button
                // onClick={() => {
                //   router.push("/profile");
                // }}
                type="submit"
                className="bg-green-600 w-full text-white py-2 px-4 rounded hover:bg-green-700"
              >
                {initialValues && initialValues.id ? "Update" : "Post"}
              </button>
            </form>
            {isOff && (
              <div className="w-2/5 bg-lime-200">
                <img
                  src="./images/recicle.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
}
