import { MainNav } from "@/components/main-nav";
import { UserButton } from "@/components/user-button";
import { StoreSwitcher } from "@/components/store-switcher";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function Navbar() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const stores = await db.store.findMany({
    where: {userId: session.user.id}
  })

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </nav>
  )
}