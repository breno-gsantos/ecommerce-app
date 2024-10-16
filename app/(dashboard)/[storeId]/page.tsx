import { db } from "@/lib/db"

interface DashboardPageProps{
  params: {
    storeId: string
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (
    <main>
      Active Store: {store?.name}
    </main>
  )
}