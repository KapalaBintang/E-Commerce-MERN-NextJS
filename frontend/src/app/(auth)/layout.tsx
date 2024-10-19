// export const metadata = {
//   title: "Authentication",
//   description: "Authentication",
// };

import { Poppins } from "next/font/google";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={inter.className}>{children}</section>;
}
