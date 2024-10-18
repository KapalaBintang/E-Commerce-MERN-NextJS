import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import MainSidebarServer from "@/components/sidebar/MainSidebarServer";
const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iwan Store",
  description: "Iwan Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${inter.className} flex min-h-screen flex-col bg-primary text-white md:flex-row`}
        >
          {/* Sidebar - Tetap terlihat di desktop */}
          <div className="">
            <MainSidebarServer />
          </div>

          {/* Main content */}
          <main className="w-full flex-1">{children}</main>

          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
