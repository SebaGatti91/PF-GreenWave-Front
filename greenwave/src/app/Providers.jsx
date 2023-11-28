"use client"

import { SessionProvider } from "next-auth/react"
import {CartProvider} from "./components/cart/cartContext"
export function Providers ({children}) {
    return (
        <SessionProvider>
            <CartProvider>
            {children}
            </CartProvider>
        </SessionProvider>

    )
}
