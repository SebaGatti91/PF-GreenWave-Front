import { Formik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { GlobalUser } from "../users/globalUsers";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function FormUser({ closeModal }) {
  const router = useRouter();
  const { user, setUser } = useContext(GlobalUser);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const BackUrl = process.env.BACK;

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          image: "",
          phone: "",
          country: "",
          city: "",
          address: "",
          postalCode: "",
        }}
        validate={(values) => {
          let errors = {};
          // Validations for username
          if (
            values.username &&
            !/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]{3,12}$/.test(values.username)
          ) {
            errors.username = "Can only contain from 3 to 12 letters";
          }

          // Validation for image
          if (values.image) {
            const allowedExtensions = /\.(jpg|jpeg|png)$/i;
            if (!allowedExtensions.test(values.image)) {
              errors.image = "Please upload a valid image file (JPG or PNG)";
            }
          }

          // Validation for phone
          if (values.phone) {
            if (!/^(\+|\d)[0-9]{7,16}$/.test(values.phone)) {
              errors.phone =
                "Invalid phone number format. Please enter a valid phone number.";
            }
          }

          if (
            values.country &&
            !/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]{3,12}$/.test(values.country)
          ) {
            errors.country = "Can only contain from 3 to 12 letters";
          }

          if (
            values.city &&
            !/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]{3,12}$/.test(values.city)
          ) {
            errors.city = "Can only contain from 3 to 12 letters";
          }

          // Validation for postalcode
          if (values.postalCode) {
            if (!/^\d{1,9}(-\d{0,8})?$/.test(values.postalCode)) {
              errors.postalCode =
                "Must contain up to 9 digits and an optional hyphen";
            }
          }

          // Validation for adress
          if (values.address) {
            if (!/^[\w\s-]+ \d+$/.test(values.address)) {
              errors.address =
                "Invalid address format. Please enter a valid address.";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          if (
            values.username ||
            values.image ||
            values.phone ||
            values.country ||
            values.city ||
            values.postalCode ||
            values.address
          ) {
            try {
              setLoading(true);
              const formData = new FormData();

              if (values.image) {
                formData.append("image", file);

                const cloudinaryResponse = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const cloudinaryData = await cloudinaryResponse.json();
                values.image = cloudinaryData.url;
              } else {
                values.image = "";
              }

              const response = await axios.put(
                `${BackUrl}/users/update/${user.id}`,
                values
              );

              resetForm();

              if (response.status === 200) {
                setLoading(false);
                let userUpdate = [];

                if (values.username) {
                  userUpdate.push(`username`);
                }

                if (values.image) {
                  userUpdate.push(`image`);
                }

                if (values.phone) {
                  userUpdate.push(`phone`);
                }
                if (values.country) {
                  userUpdate.push(`country`);
                }
                if (values.city) {
                  userUpdate.push(`city`);
                }

                let message = `Your ${userUpdate.join(", ")} has been updated`;

                Swal.fire({
                  icon: "success",
                  title: "User modified!",
                  confirmButtonColor: "#426F66",
                  text: message,
                });
                setTimeout(() => location.reload(), 2000);
              }
            } catch (error) {
              console.error("Error al modificar el usuario:", error.message);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was a problem modifying the user, please try again",
              });
            }
          }
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-md justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
            encType="multipart/form-data"
          >
            <div className="mb-4 w-full">
              <div className="flex justify-end items-end">
                <button
                  style={{ border: "1px solid gray" }}
                  className=" bg-transparent hover:bg-red-700 text-black px-2 rounded"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <label htmlFor="username" className="font-semibold mb-2">
                User name:
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="JohnDoe"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              ></input>
              {touched.username && errors.username && (
                <div className="font-medium text-xs text-orange-700">
                  {errors.username}
                </div>
              )}
              <label htmlFor="phone" className="font-semibold mb-2">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="48511008"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              ></input>
              {touched.phone && errors.phone && (
                <div className="font-medium text-xs text-orange-700">
                  {errors.phone}
                </div>
              )}
              <label htmlFor="country" className="font-semibold mb-2">
                County:
              </label>
              <input
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Argentina"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              ></input>
              {touched.country && errors.country && (
                <div className="font-medium text-xs text-orange-700">
                  {errors.country}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <div className="mb-4 w-full">
                <label htmlFor="city" className="font-semibold mb-2">
                  City:
                </label>
                <input
                  type="text"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="city"
                  placeholder="Buenos Aires"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.city && errors.city && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.city}
                  </div>
                )}
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="postalCode" className="mb-2 font-semibold">
                  Postal code:
                </label>
                <input
                  type="text"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="postalCode"
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.postalCode && errors.postalCode && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.postalCode}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="address" className="font-semibold mb-2">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Fake street 421"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              ></input>
              {touched.address && errors.address && (
                <div className="font-medium text-xs text-orange-700">
                  {errors.address}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="image" className="font-semibold mb-2">
                Upload your new image:
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
                className="w-full py-2"
              ></input>
              {touched.image && errors.image && (
                <div className="font-medium text-xs text-orange-700">
                  {errors.image}
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-col justify-center items-center w-full p-2 rounded text-white ">
              <button
                disabled={loading}
                className={`w-full py-2 px-4 rounded hover:bg-green-700 ${
                  loading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white"
                }`}
                type="submit"
              >
                Edit
              </button>
              {loading && (
                <div>
                  <p className="text-lg	italic text-cyan-800 font-medium	">
                    Loading, do not reload the page...
                  </p>
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
