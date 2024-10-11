"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Bars3Icon, UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex w-full justify-between bg-white p-3 text-black shadow-md">
        <Bars3Icon
          className="h-6 w-6 cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
        />
        <h1 className="text-xl font-bold">Admin Page</h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserIcon className="h-6 w-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-full w-48 transform bg-black text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="after: p-5 text-xl font-bold text-blue-400">
          Admin Page
        </div>
        <div className="px-7 py-3">
          <Link
            href={"/admin"}
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <p className="font-bold">Users</p>
            <UserIcon className="h-6 w-6 cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Overlay */}
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

export default Sidebar;
