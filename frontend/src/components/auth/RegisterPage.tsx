"use client";
import { registerUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please add all fields");
      return null;
    }
    try {
      await registerUser(formData);
      setFormData({ username: "", email: "", password: "" });
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-800 via-sky-800 to-black p-24 text-white">
        <div className="login-page">
          <div className="rounded-md bg-white px-5 py-10 text-black shadow-md">
            <h1 className="text-center text-2xl font-bold">
              Lets <span className="text-sky-700">Login</span>
            </h1>
            <form onSubmit={handleSubmit} className="pt-4">
              <div className="w-full">
                <div className="pb-4">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    id="username"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500/25 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="Create your username"
                  />
                </div>
                <div className="pb-4">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500/25 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div className="pb-4">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    id="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500/25 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-600">
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
