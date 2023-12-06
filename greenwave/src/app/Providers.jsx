"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./components/cart/cartContext";
import { UserGlobal } from "./components/users/globalUsers";
import {SocketProvider} from './websocket'
export function Providers({ children }) {
  return (
    <SessionProvider>
      <SocketProvider>
      <CartProvider>
        <UserGlobal>{children}</UserGlobal>
      </CartProvider>
      </SocketProvider>
    </SessionProvider>
  );
}
