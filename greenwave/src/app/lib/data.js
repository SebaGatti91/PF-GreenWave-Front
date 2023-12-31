import Swal from "sweetalert2";
import axios from "axios";

const BackUrl = process.env.BACK;

export const fetchUsers = async () => {
  try {
    const url = `${BackUrl}/users`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const url = `${BackUrl}/store`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const banUser = async (userId) => {
  try {
    const url = `${BackUrl}/users/ban/${userId}`;
    const response = await axios.put(url);

    return response.data;
  } catch (error) {
    console.error("Error al banear usuario", error);
    throw error;
  }
};

export const approveProduct = async (productId) => {
  try {
    const url = `${BackUrl}/products/approve/${productId}`;
    const response = await axios.put(url);

    return response.data;
  } catch (error) {
    console.error("Error al pausar product", error);
    throw error;
  }
};
export const pauseProduct = async (productId) => {
  try {
    const url = `${BackUrl}/products/pause/${productId}`;
    const response = await axios.put(url);

    return response;
  } catch (error) {
    console.error("Error al pausar product", error);
    throw error;
  }
};

export const setAdminUser = async (userId) => {
  try {
    const url = `${BackUrl}/users/admin/${userId}`;
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

    const url = `${BackUrl}/users`;

    await axios.post(url, user);
  } catch (error) {
    console.error("Error al crear el usuario en el backend", error);
  }
};

export const fetchUserProducts = async (userId) => {
  try {
    if (!userId) {
      console.error("Error:  Missing  data");
      return;
    }

    const response = await axios.get(`${BackUrl}/getUserProducts/${userId}`);
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
    const url = `${BackUrl}/addFavorites`;

    await axios.post(url, data);
  } catch (error) {
    console.error("Error al postear favoritos", error);
  }
};
export const fetchRemoveFavorites = async (userId, productId) => {
  try {
    if (!userId || !productId) {
      console.error("Error:  Missing  data");
      return;
    }
    const data = { userId: userId, productId: productId };
    const url = `${BackUrl}/removeFavorites`;

    await axios.post(url, data);
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

    const response = await axios.get(`${BackUrl}/getfavs/${userId}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error al obtener favoritos", error);
  }
};

export const deleteProduct = async (id) => {
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
      await axios.delete(`${BackUrl}/products/delete/${id}`);
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

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${BackUrl}/users/${userId}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${BackUrl}/store/${productId}`);
    const productData = response.data;
    return productData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const fetchPurchases = async (userId) => {
  try {
    const response = await axios.get(`${BackUrl}/purchases/${userId}`);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchDonation = async (form, resetForm) => {
  try {
    const url = `${BackUrl}/donation`;
    const response = await axios.post(url, form);
    resetForm();
    if (response.status === 200) {
      return Swal.fire({
        icon: "success",
        title: "Donation form submitted!",
        confirmButtonColor: "#426F66",
        text: "We will contact you by e-mail with the steps to follow",
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// export const updateProduct = async (productId, updatedData) => {
//   try {
//     const response = await fetch(`${BackUrl}/products/${productId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update product");
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const updateProduct = async (productId, updatedData) => {
  try {
    const url = `${BackUrl}/products/${productId}`;
    const response = await axios.put(url, updatedData);

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchFeedback = async (cart) => {
  try {
    const url = `${BackUrl}/feedback`;
    await axios.post(url, cart);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const fetchMaterials = async () => {
  try {
    const url = `${BackUrl}/materials`;
    const response = await axios.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
