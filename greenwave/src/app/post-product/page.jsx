"use client";
import Swal from "sweetalert2";
import { Formik } from "formik";
import React, { createContext } from "react";
import axios from "axios";

const materialsApi = async () => {
  const response = await axios.get(`http://localhost:3001/materials/`);
  return response.data;
};

const submitForm = async (values) => {
  try {
    const response = await axios.post("http://localhost:3001/products", values);
    if (response.status === 200) {
      return Swal.fire({
        icon: "success",
        title: "Product Posted Successfully",
        text: "Your product has been successfully posted.",
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

export default async function PostProduct() {
  const materials = await materialsApi();

  return (
    <div>
      <h2 className="text-2xl font-bold m-2 text-center">
        Publish your product
      </h2>

      <Formik
        initialValues={{
          name: "",
          price: "",
          stock: "",
          materials: "",
          rating: "",
          description: "",
          image: "",
        }}
        validate={(values) => {
          let errors = {};
          //validations for name
          if (!values.name) {
            errors.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-Z\s]{3,30}$/.test(values.name)) {
            errors.name = "Debe contener de 3 a 30 letras";
          }

          //validations for price
          if (!values.price) {
            errors.price = "Por favor ingresa el costo del producto";
          } else if (!/^\d{1,5}$/.test(values.price)) {
            errors.price = "Solo debe contener numeros de hasta 5 cifras";
          }

          //validations for stock
          if (!values.stock) {
            errors.stock = "Por favor ingresa el stock del producto";
          } else if (!/^\d{1,5}$/.test(values.stock)) {
            errors.stock = "Solo debe contener numeros de hasta 5 cifras";
          }

          //validation temporal for rrating
          if (!values.rating) {
            errors.rating = "Por favor ingresa el rating del producto";
          } else if (!/^[1-5]$/.test(values.rating)) {
            errors.rating = "Solo debe contener numeros del 1 al 5";
          }

          //validations for description
          if (!values.description) {
            errors.description =
              "Por favor ingresa una descripcion del producto";
          } else if (!/^[a-zA-Z\s]{1,300}$/.test(values.description)) {
            errors.description =
              "Solo debe contener letras y hasta 300 caracteres";
          }

          //validation for image
          if (
            !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
              values.image
            )
          ) {
            errors.image = "Only URL image";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          submitForm(values)
            .then(() => {
              resetForm();
              console.log("formulario enviado");
            })
            .catch((error) => {
              console.error("Error al enviar el formulario:", error);
            });
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
                  Add your URL image:
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=" https://image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.image && errors.image && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.image}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 w-full text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Post
              </button>
            </form>
            <div className="w-2/5 bg-lime-200">
              <img
                src="./images/recicle.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
