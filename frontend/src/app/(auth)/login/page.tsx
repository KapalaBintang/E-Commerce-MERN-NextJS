import LoginPage from "@/components/auth/LoginPage";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

function loginPage() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export default loginPage;
