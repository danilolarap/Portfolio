import './globals.css';

export const metadata = {
  title: 'Danilo Lara | Minecraft Portfolio',
  description: 'Portafolio interactivo estilo Minecraft de Danilo Lara - Ingeniería de Software',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-minecraft bg-[#2b2b2b] text-white selection:bg-green-700 selection:text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}