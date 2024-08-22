import React from "react";
import { Input } from "../ui/input";

function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-800 via-sky-800 to-black p-24 text-white">
        <div className="login-page">
          <div className="rounded-md bg-white px-5 py-10 text-black shadow-md">
            <h1 className="text-center text-2xl font-bold">
              Let's <span className="text-sky-700">Login</span>
            </h1>
            <form action="" className="pt-4">
              <div className="w-full">
                <div className="pb-4">
                  <label htmlFor="username">Username</label>
                  <Input type="text" />
                </div>
                <div className="pb-4">
                  <label htmlFor="username">Email</label>
                  <Input type="text" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
