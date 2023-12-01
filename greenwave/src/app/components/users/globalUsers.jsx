"use client"
import React, {createContext, useContext, useEffect, useState} from "react"
//creo el contexto para los usuarios
export const GlobalUser = createContext();
export const UserGlobal = ({children}) =>{
    const [user, setUser]= useState(()=>{
        //aqui cargo el localstorage con la informacion que me llega a el estado para la peristencia y lo transormo a Json
        const localData = typeof window !=="undefined" ? localStorage.getItem("user") : null
        return localData ?JSON.parse(localData) : [];
    })
   
// cuando el estado del usuario cambia o se modifica, el local storage restituye la informacion
useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(user));
},[user]);

//agrego el usuario al estado
const addUser =(usuario)=>{
    setUser(usuario)     
}
//dejo disponble las acciones
return(
    <GlobalUser.Provider value={{
        user, setUser, addUser, 
    }}
    >
    {children}
    </GlobalUser.Provider>
)
//hook personalizado para traer las acciones
};
export const useUser = () =>{
    const context =useContext(GlobalUser);
    if(!context){
        throw new Error ("useUser debe ser usado dentro de un Userprovider")
    }
    return context
};