const axios = require("axios");

export const fetchUsers = async () => {
  try {
    const url = "http://localhost:3001/users";
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const url = "http://localhost:3001/store";
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const banUser = async (userId) => {
  try {
    const url = `http://localhost:3001/users/ban/${userId}`;
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

    const url = `http://localhost:3001/users`;

    await axios.post(url, user);
  } catch (error) {
    console.error("Error al crear el usuario en el backend", error);
    // Consider setting a more specific error message or logging details
  }
};
export const fetchAddFavorites = async (userId, productId) => {
  try {
    if (!userId || !productId) {
      console.error("Error:  Missing  data");
      return;
    }
    const data = { userId: userId, productId: productId };
    const url = `http://localhost:3001/addFavorites`;

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
    const url = `http://localhost:3001/removeFavorites`;

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

    const response = await axios.get(`http://localhost:3001/getFavs/${userId}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error al obtener favoritos", error);
  }
};
