import type { Metadata } from "next";
import "../globals.css";
import Header from "@/src/components/header/header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Miro Mariapori - Software Developer Portfolio",
  description:
    "Welcome to my software developer portfolio! Explore my projects, experience, and skills in software development. Discover innovative solutions I've created and learn more about my work in the field.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
