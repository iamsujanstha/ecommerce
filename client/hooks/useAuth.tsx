"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getFromStorage } from "@/utility/storage";
import { verifyToken } from "@/utility/auth";

export function useAuth(requiredRole: "user" | "admin") {
  const router = useRouter();
  const token = getFromStorage("token", "local") as string;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      const user = verifyToken(token) as Record<'role', 'admin' | 'user'>; // Decode and validate token

      if (user?.role !== requiredRole) {
        router.push("/not-authorized");
      }
    }
  }, [requiredRole, router, token]);
}
