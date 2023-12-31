"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { fetchDonation } from "../lib/data";
import { GlobalUser } from "../components/users/globalUsers";
import LeftMenu from "../components/leftMenu/LeftMenu";
import "./donation.css";

export default function Donation() {
  const router = useRouter();

  const { user } = useContext(GlobalUser);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <LeftMenu />
      </div>

      <div className="mx-auto flex flex-col justify-center items-center sm:flex-row">
        <div className="mr-5 w-4/5 m-3" style={{ marginInline: "auto" }}>
          <h1
            className="font-bold text-center text-3xl py-5 mb-6 shadow-2xl mt-5"
            style={{ width: "100%", marginInline: "auto" }}
          >
            Donation
          </h1>
          <Formik
            initialValues={{
              userId: user.id,
              nameMaterial: "",
              quantity: "",
              description: "",
              email: user?.email || "",
              address: user?.address || "",
              country: user?.country || "",
              city: user?.city || "",
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
              if (!values.country) {
                errors.country = "Please enter the name of country";
              } else if (!/^[a-zA-ZñÑ\s]{3,30}$/.test(values.country)) {
                errors.country = "Can only contain from 3 to 30 letters";
              }
              if (!values.city) {
                errors.city = "Please enter the name of city";
              } else if (!/^[a-zA-ZñÑ\s]{3,30}$/.test(values.city)) {
                errors.city = "Can only contain from 3 to 30 letters";
              }
              //validations for quantity
              if (!values.quantity) {
                errors.quantity = "Please enter the quantity of the material";
              } else if (!/^\d+$/.test(values.quantity)) {
                errors.quantity = "Must contain only numbers";
              } else if (values.quantity.length > 4) {
                errors.quantity = "Exceeds the established quantity";
              }
              //validations for description
              if (!values.description) {
                errors.description = "Please enter a product description";
              } else if (!/^[\w\s.,;-]{1,250}$/.test(values.description)) {
                errors.description =
                  "Must contain only letters, commas, periods, hyphens, and be between 30 and 250 characters";
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

              // Validation for adress
              if (values.address) {
                if (!/^[\w\s-]+ \d+$/.test(values.address)) {
                  errors.address =
                    "Invalid address format. Please enter a valid address.";
                }
              }

              // Validation for postalcode
              if (values.postalCode) {
                if (!/^\d{1,9}(-\d{0,8})?$/.test(values.postalCode)) {
                  errors.postalCode =
                    "Must contain up to 9 digits and an optional hyphen";
                }
              }

              // Validation for phone
              if (values.phone) {
                if (!/^(\+|\d)[0-9]{7,16}$/.test(values.phone)) {
                  errors.phone =
                    "Invalid phone number format. Please enter a valid phone number.";
                }
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
              <div className="flex mb-5">
                <form
                  onSubmit={handleSubmit}
                  className="lg:w-full flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-1 p-4"
                  encType="multipart/form-data"
                >
                  <div className="flex gap-3">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="nameMaterial"
                        className="font-semibold mb-2"
                      >
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
                    <label htmlFor="country" className="font-semibold mb-2">
                      County
                    </label>
                    <textarea
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Argentina"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    ></textarea>
                    {touched.country && errors.country && (
                      <div className="font-medium text-xs text-orange-700">
                        {errors.country}
                      </div>
                    )}
                  </div>
                  <div className="mb-4 flex flex-col w-full">
                    <label htmlFor="city" className="font-semibold mb-2">
                      City
                    </label>
                    <textarea
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Buenos Aires"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    ></textarea>
                    {touched.city && errors.city && (
                      <div className="font-medium text-xs text-orange-700">
                        {errors.city}
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
                  <div className="flex gap-3">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="postalCode"
                        className="font-semibold mb-2"
                      >
                        Postal Code
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
                    <div className="mb-4 w-full">
                      <label htmlFor="phone" className="font-semibold mb-2">
                        Phone number
                      </label>
                      <input
                        type="text"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                        placeholder="48511008"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      />
                      {touched.phone && errors.phone && (
                        <div className="font-medium text-xs text-orange-700">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    // disabled={errors}
                    className={`w-full py-2 px-4 rounded hover:bg-green-700`}
                    style={{ border: "2px solid #d1d5db" }}
                  >
                    Donate
                  </button>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
