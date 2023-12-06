"use client";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";

import { GlobalUser } from "../components/users/globalUsers";
const BackUrl = process.env.BACK;

export default function Donation({ initialValues = {}, isOff = true }) {
  const router = useRouter();

  const { user } = useContext(GlobalUser);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          quantity: "",
          description: "",
          email: user?.email || "",
          adress: user?.adress || "",
          postCode: user?.postCode || "",
        }}
        validate={(values) => {
          let errors = {};
          //validations for name
          if (!values.name) {
            errors.name = "Please enter the name of your product";
          } else if (!/^[a-zA-ZñÑ\s]{3,30}$/.test(values.name)) {
            errors.name = "Can only contain from 3 to 30 letters";
          }
          //validations for quantity
          if (!values.quantity) {
            errors.quantity = "Por favor, ingresa la cantidad del material";
          } else if (!/^\d+$/.test(values.quantity)) {
            errors.quantity = "Debe contener solo números";
          } else if (values.quantity.length > 3) {
            errors.quantity = "Supera la cantidad establecida";
          }
          //validations for description
          if (!values.description) {
            errors.description = "Please enter a product description";
          } else if (!/^[a-zA-ZñÑ\s]{1,300}$/.test(values.description)) {
            errors.description =
              "Must contain only letters and up to 300 characters";
          }
          if (!values.email) {
            errors.email = "Please enter an email address";
          } else if (
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              values.email
            )
          ) {
            errors.email = "Please enter a valid email address";
          }
          if (!values.adress) {
            errors.adress = "Please enter a product description";
          } else if (!/^[a-zA-ZñÑ\s]{1,300}$/.test(values.adress)) {
            errors.adress =
              "Must contain only letters and up to 300 characters";
          }
          if (!values.postCode) {
            errors.postCode = "Por favor, ingresa la cantidad del material";
          } else if (!/^\d+$/.test(values.postCode)) {
            errors.postCode = "Debe contener solo números";
          } else if (values.postCode.length > 3) {
            errors.postCode = "Supera la cantidad establecida";
          }
          return errors;
        }}
        // onSubmit={async () => {}}
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
              className="w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
              encType="multipart/form-data"
            >
              <div className="mb-4 w-full">
                <label htmlFor="name" className="font-semibold mb-2">
                  Material name
                </label>
                <input
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  placeholder=" Plastic....."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.name && errors.name && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="quantity" className="font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="quantity"
                  placeholder=" 10"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.quantity && errors.quantity && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.quantity}
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
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="email" className="font-semibold mb-2">
                  Email
                </label>
                <textarea
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="..."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.email && errors.email && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="adress" className="font-semibold mb-2">
                  Adress
                </label>
                <textarea
                  name="adress"
                  value={values.adress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Berlin, Germany"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.adress && errors.adress && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.adress}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="postCode" className="font-semibold mb-2">
                  Post Code
                </label>
                <textarea
                  name="postCode"
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="5501"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.postCode && errors.postCode && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.postCode}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={errors}
                className={`w-full py-2 px-4 rounded hover:bg-green-700 ${
                  errors
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white"
                }`}
              >
                Donate
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
