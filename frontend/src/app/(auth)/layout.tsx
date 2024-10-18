export const metadata = {
  title: "Authentication",
  description: "Authentication",
};

import { Poppins } from "next/font/google";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
