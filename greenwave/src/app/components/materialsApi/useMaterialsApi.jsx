import Swal from "sweetalert2";
import axios from "axios";

export const materialsApi = async () => {
  const response = await axios.get(`https://greenwave-back.up.railway.app/materials`);
  return response.data;
};

export const submitForm = async (values) => {

  try {
    const response = await axios.post("https://greenwave-back.up.railway.app/products", values);
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
