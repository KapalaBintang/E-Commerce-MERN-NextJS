"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetUserByIdQuery } from "@/lib/redux/api/userApiSlice";
import type { User } from "@/types/userType";

// import edit component
import EditProfile from "./EditProfile";

function ProfileList({ user }: { user: User }) {
  // const [userData, setUserData] = useState<User>(user);

  const { data, isLoading } = useGetUserByIdQuery({
    accessToken: user.user.accessToken,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col sm:items-center sm:justify-center">
        <h1 className="text-2xl font-bold sm:text-center sm:text-3xl md:text-start">
          User details
        </h1>
        <p className="max-w-md py-3 sm:text-center sm:text-lg md:text-start">
          Update your personal information here
        </p>

        <div>
          <form className="flex w-full flex-col justify-center gap-4 py-6 sm:w-96">
            <div className="username flex flex-col gap-2">
              <label htmlFor="username" className="text-blue-400">
                Username:
              </label>
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
              <label htmlFor="email" className="text-blue-400">
                Email:
              </label>
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

          <Button
            onClick={() => setIsEdit(true)}
            className="border-3 w-16 self-start rounded-sm border-black bg-orange-600 text-start hover:bg-orange-700"
          >
            Edit
          </Button>
        </div>
      </div>

      {isEdit && (
        <div className="absolute inset-0 z-50 h-screen w-full bg-black/95">
          <EditProfile
            isEdited={isEdit}
            handleEdit={() => setIsEdit(!isEdit)}
            user={user}
          />
        </div>
      )}
    </>
  );
}

export default ProfileList;
