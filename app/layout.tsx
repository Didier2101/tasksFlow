import type { Metadata } from "next";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import { roboto } from "@/src/lib/fonts";

export const metadata: Metadata = {
  title: "Task Flow",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased bg-slate-50`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
