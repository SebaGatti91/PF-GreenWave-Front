"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./components/cart/cartContext";
import { UserGlobal } from "./components/users/globalUsers";
export function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <UserGlobal>{children}</UserGlobal>
      </CartProvider>
    </SessionProvider>
  );
}
