import Swal from "sweetalert2";
import axios from "axios";

const BackUrl = process.env.BACK


export const materialsApi = async () => {
  const response = await axios.get(`${BackUrl}/materials`);
  return response.data;
};

export const submitForm = async (values) => {

  try {
    const response = await axios.post(`${BackUrl}/products`, values);
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
