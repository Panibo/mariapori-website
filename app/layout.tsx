import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Miro Mariapori - Software Developer Portfolio",
  description:
    "Welcome to my software developer portfolio! Explore my projects, experience, and skills in software development. Discover innovative solutions I've created and learn more about my work in the field.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
