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
  const [materials, setMaterials] = useState([]);
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

          //validation for materials
          if (!values.materials || values.materials.length === 0) {
            errors.materials = "Please select at least one material";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            setLoading(true);
            const formData = new FormData();
            if (file) {
              formData.append("image", file);
              values.userId = user.id;
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
                  setLoading(false);
                  router.push(`/profile/`);
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
          <div className="flex">
            <form
              className="bg-custom-green text-black rounded-lg p-8 max-w-lg mx-auto"
              onSubmit={handleSubmit}
              className="w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
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
