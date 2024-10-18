import React from "react";
import Profile from "@/components/profile/Profile";

function page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-primary px-8 py-14 sm:min-h-screen sm:py-0">
        <Profile />
      </div>
    </>
  );
}

export default page;
