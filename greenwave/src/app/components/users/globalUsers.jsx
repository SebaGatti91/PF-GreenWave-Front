"use client";
import React, { createContext, useContext, useState } from "react";
export const GlobalUser = createContext();
export const UserGlobal = ({ children }) => {

  const [user, setUser] = useState({});

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
