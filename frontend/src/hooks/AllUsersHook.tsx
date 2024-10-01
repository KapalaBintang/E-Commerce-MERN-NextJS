"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { User } from "../types/userType";
import { getCookie } from "cookies-next";

function AllUsersHook() {
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const accessToken = getCookie("token");
      const isAdmin = getCookie("isAdmin");

      console.log(accessToken);
      console.log(isAdmin);

      if (!isAdmin) {
        router.push("/");
        return;
      }

      setIsLoading(true); // Set loading true saat mulai fetch

      try {
        const response = await fetch("http://localhost:8000/api/users", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setUser(data);
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading false setelah fetch selesai
      }
    };

    console.log(user);

    getUsers();
  }, []);

  return { user, isLoading, error };
}

export default AllUsersHook;
