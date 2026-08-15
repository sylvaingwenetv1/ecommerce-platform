'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS: Record<string, { href: string; label: string }[]> = {
  admin: [
    { href: '/admin', label: "Vue d'ensemble" },
    { href: '/admin/utilisateurs', label: 'Utilisateurs' },
    { href: '/admin/produits', label: 'Produits' },
  ],
  owner: [
    { href: '/owner', label: "Vue d'ensemble" },
    { href: '/owner/products', label: 'Mes produits' },
  ],
  client: [
    { href: '/client', label: 'Mon compte' },
    { href: '/catalog', label: 'Catalogue' },
  ],
}

export function TopNav({ role }: { role: string }) {
  const pathname = usePathname()
  const links = LINKS[role] ?? []

  return (
    <nav className="border-b border-gray-200 bg-white overflow-x-auto">
      <div className="flex gap-1 px-4 md:px-8">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                active ? 'text-primary' : 'text-muted hover:text-ink'
              }`}
            >
              {link.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
