import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danilo.dev | Un mundo por explorar",
  description:
    "Portafolio interactivo de Danilo con un mundo isométrico de bloques.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
