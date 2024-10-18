"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/api/userApiSlice";
import type { User } from "@/types/userType";

function ProfileList({ user }: { user: User }) {
  const { data, isLoading } = useGetUserByIdQuery({
    accessToken: user.user.accessToken,
  });

  console.log("ini data", data);

  return (
    <>
      <div className="flex w-full flex-col sm:items-center sm:justify-center">
        <h1 className="text-2xl font-bold sm:text-center sm:text-3xl md:text-start">
          User details
        </h1>
        <p className="max-w-md py-3 sm:text-center sm:text-lg md:text-start">
          Update your personal information here
        </p>

        <form className="flex w-72 flex-col justify-center gap-4 py-10 sm:w-96">
          <div className="username flex flex-col gap-2">
            <label htmlFor="username">Username:</label>
            <Input
              readOnly
              type="text"
              id="username"
              value={data?.username}
              placeholder="username"
              className="max-w-xl cursor-pointer border-[1px] border-blue-600/70 text-black shadow-sm shadow-cyan-900 transition duration-200 sm:max-w-sm"
            />
          </div>
          <div className="email flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <Input
              readOnly
              type="email"
              id="email"
              placeholder="email"
              value={data?.email}
              className="max-w-xl cursor-pointer border-[1px] border-blue-600/70 text-black shadow-sm shadow-cyan-900 transition duration-200 sm:max-w-sm"
            />
          </div>
        </form>

        <Button className="border-3 w-16 justify-self-start rounded-sm border-black bg-orange-600 hover:bg-orange-700">
          Edit
        </Button>
      </div>
    </>
  );
}

export default ProfileList;
