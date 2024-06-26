import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tailor Restaurants",
  description: "Tailor Hub Prueba Tecnica",
  creator: "Facundo Palombo <facundo.palombo@gmail.com>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} p-2 w-full h-full flex flex-col items-stretch flex-nowrap`}
      >
        {children}
        <footer className="relative bottom-0 h-auto">
          <p className="relative m-2">
            Prueba técnica ©Tailor hub SL 2019 - 2024
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
