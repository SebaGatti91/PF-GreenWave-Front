"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos un contexto para el carrito
export const CartContext = createContext();

// Creaoms un proveedor de contexto para encapsular la lógica del carrito
export const CartProvider = ({ children }) => {
  //creamos una localstorage para persistencia de datos
  const [cart, setCart] = useState(() => {
    const localData =
      typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    return localData ? JSON.parse(localData) : [];
  });
  //mira el estado y agrega prouducts
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  //si existe no agrega, pero sino, lo agrega
  const addToCart = (product) => {
    const cartIndex = cart.findIndex((item) => item.id === product.id);

    if (cartIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[cartIndex] = {
        ...updatedCart[cartIndex],
        count: updatedCart[cartIndex].count + 1,
      };
      setCart(updatedCart);
    } else {
      const newCartItem = { ...product, count: 1 };
      setCart((prevCart) => [...prevCart, newCartItem]);
    }
  };

  const countUpCart = (productId, productStock) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.count < productStock && item.count < 10
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const countDownCart = (productId) => {
    console.log(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        countDownCart,
        countUpCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};
