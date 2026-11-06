import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Minefolio",
  description:
    "Portafolio interactivo de Danilo con un mundo isométrico de bloques.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="dark" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/Mojangles.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
