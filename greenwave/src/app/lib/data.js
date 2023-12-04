import Swal from "sweetalert2";
import axios from "axios";

  // axios.defaults.baseURL="http://localhost:3001"
  axios.defaults.baseURL="https://greenwave-back.up.railway.app/"

export const fetchUsers = async () => {
  try {
    const url = `${axios.defaults.baseURL}/users`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const url = `${axios.defaults.baseURL}/store`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const banUser = async (userId) => {
  try {
    const url = `${axios.defaults.baseURL}/users/ban/${userId}`;
    const response = await axios.put(url);

    return response.data;
  } catch (error) {
    console.error("Error al banear usuario", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    if (!user?.email) {
      console.error("Error: Email is missing in user data");
      return;
    }

    const url = `${axios.defaults.baseURL}/users`;

    await axios.post(url, user);
  } catch (error) {
    console.error("Error al crear el usuario en el backend", error);
    // Consider setting a more specific error message or logging details
  }
};

export const fetchUserProducts = async (userId) => {
  try {
    if (!userId) {
      console.error("Error:  Missing  data");
      return;
    }

    const response = await axios.get(`${axios.defaults.baseURL}/getUserProducts/${userId}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error al postear favoritos", error);
  }
};

export const fetchAddFavorites = async (userId, productId) => {
  try {
    if (!userId || !productId) {
      console.error("Error:  Missing  data");
      return;
    }
    const data = { userId: userId, productId: productId };
    const url =`${axios.defaults.baseURL}/addFavorites`;

    await axios.post(url, data);
  } catch (error) {
    console.error("Error al postear favoritos", error);
  }
};
export const fetchRemoveFavorites = async (userId, productId, setFavorites) => {
  try {
    if (!userId || !productId) {
      console.error("Error:  Missing  data");
      return;
    }
    const data = { userId: userId, productId: productId };
    const url = `${axios.defaults.baseURL}/removeFavorites`;

    await axios.post(url, data);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== productId)
    );
  } catch (error) {
    console.error("Error al postear favoritos", error);
  }
};
export const fetchGetFavorites = async (userId) => {
  try {
    if (!userId) {
      console.error("Error:  Missing  data");
      return;
    }

    const response = await axios.get(`${axios.defaults.baseURL}/getFavs/${userId}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error al obtener favoritos", error);
  }
};

export const deleteProduct = async (id) => {
  console.log(id);
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    try {
      await axios.delete(`${axios.defaults.baseURL}/products/delete/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } catch (error) {
      throw Error(error);
    }
  }
};
