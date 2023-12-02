"use client";
// RootLayout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navBar/NavBar";
import { Footer } from "./components/footer/Footer";
import { Providers } from "./Providers";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Green wave",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/images/Green-Wave.png" />
      </head>

      <body className={inter.className}>
        <Providers>
          {pathname === "/" ? (
            <>{children}</>
          ) : pathname.startsWith("/dashboard") ? (
            <>{children}</>
          ) : (
            <div className="flex flex-col h-screen">
              <NavBar />
              <div className="flex-grow">
                {children}
                {/* <script id="messenger-widget-b" src="https://cdn.botpenguin.com/website-bot.js" defer>6569e3c391144160ce309b20,6569da1e6ab8927385562efb</script> */}
              </div>
              <Footer />
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
