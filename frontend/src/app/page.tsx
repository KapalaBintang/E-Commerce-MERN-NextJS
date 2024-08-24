"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      try {
        const response = await fetch("http://localhost:8000/api/users", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
      }
    };

    getUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>ini adalah halaman utama</p>
    </main>
  );
}
