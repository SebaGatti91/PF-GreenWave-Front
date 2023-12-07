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
  console.log(user);

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          image: "",
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

          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          if (values.username || values.image){
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
                `http://localhost:3001/users/update/${user.id}`,
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
  
                let message = `Your ${userUpdate.join(", ")} has been updated`;
  
                Swal.fire({
                  icon: "success",
                  title: "User modified!",
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
            className="flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
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
