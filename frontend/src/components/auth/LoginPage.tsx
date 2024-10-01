"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/auth";
import { setCookie } from "cookies-next";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return null;

    try {
      const data = await loginUser(formData);

      setCookie("token", data.accessToken.accessToken, {
        maxAge: 15 * 60,
      });

      setCookie("isAdmin", data.isAdmin, {
        maxAge: 15 * 60,
      });

      if (!data.isAdmin) {
        router.push("/");
        return null;
      }

      router.push("/admin");
    } catch (error: any) {
      alert(error.message);
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-24 text-white xl:w-1/2">
          <div className="login-page relative">
            {/* Background untuk styling */}
            <div className="-translate-y-4 translate-x-3 transform rounded-md border border-slate-500 bg-cyan-500 p-[100px] text-black shadow-xl shadow-slate-500">
              <h1 className="text-center text-2xl font-bold">
                Lets <span className="text-sky-700"></span>
              </h1>
              <form className="pt-4">
                <div className="w-full">
                  <div className="pb-4"></div>
                  <div className="pb-14"></div>
                </div>
              </form>
            </div>

            {/* form component */}
            <div className="absolute top-0 rounded-xl border border-slate-500 bg-white px-5 py-10 text-black shadow-md shadow-slate-700">
              <h1 className="text-center text-2xl font-bold">
                Lets <span className="text-sky-700">Login</span>
              </h1>
              <form onSubmit={handleSubmit} className="pt-4">
                <div className="w-full">
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
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:w-1/2">
          <img
            src="form_image.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
