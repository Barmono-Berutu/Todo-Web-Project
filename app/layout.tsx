import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Todo List Task Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable}antialiased`}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
