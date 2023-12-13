import React, { useState, useContext } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { GlobalUser } from "../users/globalUsers";
import * as Yup from "yup";
import Filter from "bad-words";
import Swal from "sweetalert2";
import "../../../../public/estilos/buycart.css";

function ReviewForm({ productId, closeModal }) {
  const Backurl = process.env.BACK;
  const { user } = useContext(GlobalUser);
  const [rating, setRating] = useState(0);
  const filter = new Filter();

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (values) => {
    const reviewData = {
      productId,
      userId: user.id,
      rating: rating,
      comment: filter.clean(values.comment),
    };
    try {
      const response = await axios.post(`${Backurl}/reviews`, reviewData);

      if (response.status === 200) {
        return Swal.fire({
          icon: "Great",
          title: "Review",
          text: "Thanks for your Review",
        });
      } else {
        console.log("Error when creating the revision");
      }
    } catch (error) {
      console.error("Error when making the POST request:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .min(2, "The comment is very short - it must be at least 2 characters long.")
      .max(
        300,
        "The comment is very long - it should be no longer than 300 characters."
      ),
  });

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form
          className=" flex flex-col rounded-lg justify-center items-start  max-w-lg mx-auto my-1 p-4"
          style={{ backgroundColor: "ButtonFace" }}
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
            <label className="font-semibold mb-2 flex justify-center items-center">
              Rating: 
              <StarRatings
                rating={rating}
                starRatedColor="green"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
              />
            </label>
          </div>
          <div className="mb-4 w-full "></div>
          <label className="font-semibold mb-2">
          Commentary:
            <Field type="textarea" name="comment" className="border border-gray-400 rounded-lg w-full" />
            {errors.comment && touched.comment ? (
              <div>{errors.comment}</div>
            ) : null}
          </label>
          <div className="mt-4">
            <button
              type="submit"
              className="px-2 bg-lime-700 rounded-lg  text-white"
              style={{ height: "30px", backgroundColor: "ButtonFace" }}
            >
              Send review
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
