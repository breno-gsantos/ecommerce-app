import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const store = await db.store.findFirst({
    where: {
      userId: session.user.id
    }
  });

  if (store) redirect(`/${store.id}`)
  
  return (
    <>
      {children}
    </>
  )
}