"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  StoreIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Bars3Icon, UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogoutMutation } from "@/lib/redux/api/userApiSlice";
import { useRouter } from "next/navigation";
import type { User } from "@/types/userType";

const mainLink = [
  {
    name: "Home",
    href: "/",
    icon: StoreIcon,
  },
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingCartIcon,
  },
];

export default function MainSidebarClient({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const path = ["/admin", "/login", "/register", "/404"];

  // logout
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const data = await logout().unwrap();
      console.log(data);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  // handler to profile Page
  const handleProfile = () => {
    router.push(`/profile/`);
    setIsOpen(false);
  };

  // get username
  const username = user.username;

  return (
    <div
      className={`relative md:w-48 ${path.includes(pathname) ? "hidden" : "block"}`}
    >
      {/* Navbar untuk Mobile */}
      <div className="flex w-full justify-between bg-white p-3 text-black shadow-md md:hidden">
        <h1 className="text-xl font-bold">Iwan Store</h1>
        <Bars3Icon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
        />
      </div>

      {/* Sidebar - Mobile dan Desktop */}

      <div
        className={`fixed left-0 top-0 z-40 h-full w-40 transform border-r-2 bg-black text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div className="p-6 text-xl font-bold text-blue-400">
          {username || "Guest"}
        </div>
        <div className="flex flex-col gap-5 px-7 py-3">
          {mainLink.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex gap-3 transition duration-200 hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600" : "text-white"
              }`}
            >
              <link.icon className="h-6 w-6" />
              <p className="font-bold">{link.name}</p>
            </Link>
          ))}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-3 transition duration-200 hover:text-blue-600">
                  <UserIcon className="h-6 w-6 cursor-pointer" />
                  <p className="font-bold">Profile</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-blue-600"
                  onClick={() => handleProfile()}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoading ? "Loading..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Overlay untuk Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
