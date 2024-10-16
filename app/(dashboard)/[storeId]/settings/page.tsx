import { auth } from "@/auth"
import { SettingsForm } from "@/components/forms/settings-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface SettingsPageProps{
  params: {
    storeId: string
  }
}

export default async function SettingsPage({params}: SettingsPageProps) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: session.user.id
    }
  });

  if(!store) redirect('/')

  return (
    <main className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </main>
  )
}