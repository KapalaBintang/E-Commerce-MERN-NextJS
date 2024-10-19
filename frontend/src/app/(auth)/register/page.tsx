import RegisterPage from "@/components/auth/RegisterPage";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "create account",
};

function registerPage() {
  return (
    <>
      <RegisterPage />
    </>
  );
}

export default registerPage;
