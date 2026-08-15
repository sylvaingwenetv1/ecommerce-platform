import Link from 'next/link'

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

export function Sidebar({ role }: { role: string }) {
  const links = LINKS[role] ?? []
  return (
    <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-gray-200 bg-surface md:w-56 md:min-h-[calc(100vh-65px)] px-4 md:px-3 py-2 md:py-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="whitespace-nowrap px-3 py-2 rounded-md text-sm text-ink hover:bg-white transition"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
