"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
export const GlobalUser = createContext();
export const UserGlobal = ({ children }) => {
  const { data: session } = useSession();
  const userData = session?.user;
  const [user, setUser] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userData?.email}`
      );
      const { data } = response;

      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error, show a message to the user, or redirect as needed.
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session?.user]);

  return (
    <GlobalUser.Provider
      value={{
        user,
        setUser,
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
