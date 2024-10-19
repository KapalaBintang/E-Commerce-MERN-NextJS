// This file is a Server Component
import { getCookies } from "@/app/actions";

import MainSidebarClient from "./MainSidebarClient";

export default async function MainSidebarServer() {
  const user = await getCookies("user"); // Ambil cookies di Server Component

  return <MainSidebarClient user={user} />;
}
