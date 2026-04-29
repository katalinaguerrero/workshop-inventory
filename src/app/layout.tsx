import type { Metadata } from "next";
import { Noto_Sans_Ol_Chiki } from "next/font/google";

const noto = Noto_Sans_Ol_Chiki({
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Industrial Workshop Inventory",
  description: "Created by Katalina Guerrero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${noto.className} `}>
      <body>{children}</body>
    </html>
  );
}
