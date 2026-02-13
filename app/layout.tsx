import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context"; // 引入大腦

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muju Residence",
  description: "Aesthetic Automation for Modern Landlords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 確保這裡有包住！ */}
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}