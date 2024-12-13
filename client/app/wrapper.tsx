"use client";

import { useCheckAuth } from "@/app/auth/auth.query";
// import { privateRoutePath } from "@/routes/private/private.routes";
// import { redirect } from 'next/navigation'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: authenticatedUser } = useCheckAuth();

  // console.log(authenticatedUser)
  return <>{children}</>;
}
