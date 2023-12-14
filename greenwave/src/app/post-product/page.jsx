"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import {
  materialsApi,
  submitForm,
} from "../components/materialsApi/useMaterialsApi";
import { GlobalUser } from "../components/users/globalUsers";
const BackUrl = process.env.BACK;

export default function PostProduct({ initialValues = {}, isOff = true }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [selectMats, setSelectMats] = useState(
    Array.isArray(initialValues.materials) ? initialValues.materials : []
  );
  const { user } = useContext(GlobalUser);
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

  const handleMaterials = (event) => {
    const selectMat = event.target.value;

    if (selectMats.length > 3 || selectMats.includes(selectMat)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You can select up to 3 materials.",
        confirmButtonColor: "#426F66",
      });
      return;
    }

    setSelectMats((prevSelectMats) => {
      const updatedSelectMats = [...prevSelectMats, selectMat];
      return updatedSelectMats;
    });
  };

  const handleRemoveMaterials = (selectMat) => {
    setSelectMats(selectMats.filter((mat) => mat !== selectMat));
  };

  return (
    <div>
      <h2
        className="font-bold text-center text-2xl py-5 mb-6 shadow-2xl mt-5"
        style={{ width: "80%", marginInline: "auto" }}
      >
        {initialValues && initialValues.id
          ? "Edit Product"
          : "Publish your product"}
      </h2>
      <Formik
        initialValues={{
          name: initialValues ? initialValues.name : "",
          price: initialValues ? initialValues.price : "",
          stock: initialValues ? initialValues.stock : "",
          materials: selectMats ? initialValues.materials : [],
          description: initialValues ? initialValues.description : "",
          image: initialValues ? initialValues.image : "",
        }}
        validate={(values) => {
          let errors = {};
          //validations for name
          if (!values.name) {
            errors.name = "Please enter the name of your product";
          } else if (!/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]{3,30}$/.test(values.name)) {
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

          //validations for description
          if (!values.description) {
            errors.description = "Please enter a product description";
          } else if (!/^[\w\s.,;-]{30,250}$/.test(values.description)) {
            errors.description =
              "Must contain only letters, commas, periods, hyphens, and be between 30 and 250 characters";
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

          //validation for materials
          if (!values.materials || values.materials.length === 0) {
            errors.materials = "Please select at least one material";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);

            if (file) {
              let arr = [];

              for (let i = 0; i < Math.min(file.length, 4); i++) {
                const formData = new FormData();
                formData.append("image", file[i]);
                values.userId = user.id;

                // Carga la nueva imagen en Cloudinary
                const cloudinaryResponse = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const cloudinaryData = await cloudinaryResponse.json();
                arr.push(cloudinaryData.url);
              }

              values.image = arr;
            }

            // Cambia el método de la solicitud según si es una edición o una publicación
            const method = initialValues && initialValues.id ? "PUT" : "POST";
            values.materials = selectMats;

            if (method === "PUT") {
              try {
                values.materials = selectMats;
                const response = await axios.put(
                  `${BackUrl}/products/${initialValues.id}`,
                  values
                );

                if (response.status === 200) {
                  setLoading(false);
                  router.push(`/profile/`);
                  return Swal.fire({
                    icon: "success",
                    title: "Product edited Successfully",
                    confirmButtonColor: "#426F66",
                    text: "It will be pending to approve.",
                  });
                }
              } catch (error) {
                throw Error(error);
              }
            }

            submitForm(values, initialValues && initialValues.id)
              .then(() => {
                setLoading(false);
                resetForm();
                router.push(`/profile/`);
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
          <div className="flex flex-col md:flex-row md:m-3 pb-3">
            <form
              onSubmit={handleSubmit}
              className="w-5/6 lg:w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
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
                  value={selectMats}
                  onChange={(event) => {
                    handleChange(event);
                    handleMaterials(event);
                  }}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="" selected disabled>
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
              <div className="flex flex-wrap justify-center items-center">
                {selectMats.map((selectMat, index) => (
                  <div
                    key={index}
                    className="p-1 m-2 border border-gray-500 rounded-lg bg-transparent flex items-center"
                  >
                    <span className="mr-2">{selectMat}</span>
                    <button
                      type="button"
                      className="border rounded-lg px-2 bg-red-700 text-white"
                      onClick={() => handleRemoveMaterials(selectMat)}
                    >
                      x
                    </button>
                  </div>
                ))}
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
                  Upload up to 4 images:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  multiple
                  onChange={(event) => {
                    handleChange(event);
                    setFile(event.target.files);
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
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded hover:bg-green-700 ${
                  loading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white"
                }`}
              >
                {initialValues && initialValues.id ? "Update" : "Post"}
              </button>
              {loading && (
                <p className="text-lg	italic text-cyan-800 font-medium	">
                  Loading, do not reload the page...
                </p>
              )}
            </form>
            {isOff && (
              <div className="w-2/5 bg-lime-200 hidden lg:block">
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
