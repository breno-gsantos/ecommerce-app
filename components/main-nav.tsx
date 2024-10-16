'use client'

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"
import React from "react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      id: 1,
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    },
  ]

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link key={route.id} href={route.href} className={cn('text-sm font-medium transition-colors hover:text-primary', route.active ? 'text-bold dark:text-white' : 'text-muted-foreground')}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}