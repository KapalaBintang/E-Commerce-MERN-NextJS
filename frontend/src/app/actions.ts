"use server";

import { cookies } from "next/headers";

export async function setCookies(name: string, value: any) {
  cookies().set(name, value, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60,
  });
}

export async function getCookies(name: string) {
  const getUserCookie = cookies().get(name);
  const user = JSON.parse(getUserCookie?.value || "{}");
  return user;
}
