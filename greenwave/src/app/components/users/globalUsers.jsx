"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const GlobalUser = createContext();
export const UserGlobal = ({ children }) => {
  const [user, setUser] = useState(() => {
    //aqui cargo el localstorage con la informacion que me llega a el estado para la peristencia y lo transormo a Json
    const localData =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    return localData ? JSON.parse(localData) : [];
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${user?.email}`
      );
      const { data } = response;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error, show a message to the user, or redirect as needed.
    }
  };
  // cuando el estado del usuario cambia o se modifica, el local storage restituye la informacion
  useEffect(() => {
    fetchData();
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  //agrego el usuario al estado
  const addUser = (usuario) => {
    setUser(usuario);
  };
  //dejo disponble las acciones
  return (
    <GlobalUser.Provider
      value={{
        user,
        setUser,
        addUser,
      }}
    >
      {children}
    </GlobalUser.Provider>
  );
  //hook personalizado para traer las acciones
};
export const useUser = () => {
  const context = useContext(GlobalUser);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un Userprovider");
  }
  return context;
};
