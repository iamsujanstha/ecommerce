"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { getFromStorage } from "@/utility/storage";

const UserContext = createContext(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const userRole = getFromStorage("user", "local");
    if (user) {
      setUser(null)
    }
  }, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
