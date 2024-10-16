import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthLayoutProps{
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth();
  if (session?.user) redirect('/');

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  )
}