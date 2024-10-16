import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedLayoutProps{
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth();
  if (!session?.user) redirect('/login')
  
  return (
    <div>
      {children}
    </div>
  )
}