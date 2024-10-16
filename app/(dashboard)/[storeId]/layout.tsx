import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children, params }: { children: ReactNode; params: { storeId: string } }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: session.user.id
    }
  });

  if (!store) redirect('/')
  
  return (
    <>
      <div>
        This will be a navbar
      </div>
      {children}
    </>
  )
}