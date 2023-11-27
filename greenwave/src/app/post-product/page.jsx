"use client";
import Swal from "sweetalert2";

import axios from "axios";

export default function PostProduct() {
  return (
    <div>
      <h2 className="text-2xl font-bold m-2 text-center">
        Publish your product
      </h2>
      <div className="flex">
        <form className="w-3/5 flex flex-col rounded justify-center items-start bg-white max-w-lg mx-auto my-4 p-4">
          <div className="mb-4 w-full">
            <label htmlFor="name" className="font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" Recycled lamp.."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-3">
            <div className="mb-4 w-full">
              <label htmlFor="price" className="font-semibold mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder=" $$$"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="stock" className="mb-2 font-semibold">
                Stock
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                placeholder=" 5"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="materials" className="font-semibold mb-2">
              Materials
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              placeholder=" Glass, plastic.."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="name" className="font-semibold mb-2">
              Rating
            </label>
            <input
              type="text"
              id="rating"
              name="rating"
              placeholder=" 3 stars"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 flex flex-col w-full">
            <label htmlFor="description" className="font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder=" ..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="image" className="font-semibold mb-2">
              Add your URL image:
            </label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder=" https://image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
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
    </div>
  );
}
