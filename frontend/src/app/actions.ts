"use server";

import { cookies } from "next/headers";

export async function setCookies(name: string, value: any) {
  cookies().set(name, value, { httpOnly: true, maxAge: 900 });
}
