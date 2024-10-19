"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { useLoginMutation } from "@/lib/redux/api/userApiSlice";
import { setCookies } from "@/app/actions";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, isError }] = useLoginMutation();

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return null;

    try {
      const data = await loginUser(formData).unwrap();
      console.log(data);

      await setCookies("user", JSON.stringify(data));

      toast({
        title: "Login success",
        description: "Welcome back!",
        variant: "success",
      });

      if (!data.isAdmin) {
        router.push("/");
        return null;
      }

      router.push("/admin");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
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
                  {isError && (
                    <p className="pb-2 text-red-500">Invalid credentials</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:w-1/2">
          <img
            src="/images/form_image.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
