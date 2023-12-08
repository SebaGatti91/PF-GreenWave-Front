"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { fetchDonation } from "../lib/data";
import { GlobalUser } from "../components/users/globalUsers";

export default function Donation() {
  const router = useRouter();

  const { user } = useContext(GlobalUser);

  return (
    <div>
      <Formik
        initialValues={{
          userId: user.id,
          nameMaterial: "",
          quantity: "",
          description: "",
          email: user?.email || "",
          address: user?.address || "",
          postalCode: user?.postalCode || "",
          phone: user?.phone || "",
        }}
        validate={(values) => {
          let errors = {};
          //validations for nameMaterial
          if (!values.nameMaterial) {
            errors.nameMaterial = "Please enter the name of material";
          } else if (!/^[a-zA-ZñÑ\s]{3,30}$/.test(values.nameMaterial)) {
            errors.nameMaterial = "Can only contain from 3 to 30 letters";
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
          if (!values.address) {
            errors.address = "Please enter a product description";
          } else if (!/^[a-zA-ZñÑ\s]{1,300}$/.test(values.address)) {
            errors.address =
              "Must contain only letters and up to 300 characters";
          }
          if (!values.postalCode) {
            errors.postalCode = "Por favor, ingresa la cantidad del material";
          } else if (!/^\d+$/.test(values.postalCode)) {
            errors.postalCode = "Debe contener solo números";
          } else if (values.postalCode.length > 3) {
            errors.postalCode = "Supera la cantidad establecida";
          }
          if (!values.phone) {
            errors.phone = "Por favor, ingresa la cantidad del material";
          } else if (!/^\d+$/.test(values.phone)) {
            errors.phone = "Debe contener solo números";
          } else if (values.phone.length > 15) {
            errors.phone = "Supera la cantidad establecida";
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            await fetchDonation(values, resetForm);
            router.push(`/profile/`);
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
              className="w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
              encType="multipart/form-data"
            >
              <div className="mb-4 w-full">
                <label htmlFor="nameMaterial" className="font-semibold mb-2">
                  Material name
                </label>
                <input
                  type="text"
                  id="nameMaterial"
                  value={values.nameMaterial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="nameMaterial"
                  placeholder=" Plastic....."
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {touched.nameMaterial && errors.nameMaterial && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.nameMaterial}
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
                <label htmlFor="address" className="font-semibold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Berlin, Germany"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.address && errors.address && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.address}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="postalCode" className="font-semibold mb-2">
                  Postal Code
                </label>
                <textarea
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="5501"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.postalCode && errors.postalCode && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.postalCode}
                  </div>
                )}
              </div>
              <div className="mb-4 flex flex-col w-full">
                <label htmlFor="phone" className="font-semibold mb-2">
                  Phone number
                </label>
                <textarea
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="45831195462"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                ></textarea>
                {touched.phone && errors.phone && (
                  <div className="font-medium text-xs text-orange-700">
                    {errors.phone}
                  </div>
                )}
              </div>
              <button
                type="submit"
                // disabled={errors}
                className={`w-full py-2 px-4 rounded hover:bg-green-700 `}
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
