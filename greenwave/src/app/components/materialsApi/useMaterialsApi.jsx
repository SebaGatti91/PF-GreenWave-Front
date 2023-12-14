import Swal from "sweetalert2";
import axios from "axios";

const BackUrl = process.env.BACK;

export const materialsApi = async () => {
  const response = await axios.get(`${BackUrl}/materials`);
  return response.data;
};

export const submitForm = async (values) => {
  console.log(values)
  try {
    const response = await axios.post(`${BackUrl}/products`, values);
    if (response.status === 200) {
      return Swal.fire({
        icon: "success",
        title: "Product Posted Successfully",
        confirmButtonColor: "#426F66",
        text: "Your product will be reviewed by an administrator, soon it will be published, check the status from your profile!",
      });
    }
  } catch (error) {
    throw Error(error);
  }
};
