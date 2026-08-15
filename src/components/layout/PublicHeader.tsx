import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="h-1 bg-gradient-to-r from-[#4B3FBB] via-[#7B3FBB] to-[#C23FA0]" />
      <div className="border-b border-gray-200 px-4 md:px-8 py-4 flex items-center gap-4">
        <Link href="/" className="font-display font-bold text-lg text-ink whitespace-nowrap">Artisanat & Co</Link>
        <form action="/catalog" method="GET" className="flex-1 hidden sm:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              name="q"
              placeholder="Rechercher une pièce, un artisan..."
              className="w-full bg-surface border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </form>
        <div className="flex items-center gap-4 ml-auto">
          <Link href="/login" className="flex items-center gap-1.5 text-sm text-ink hover:text-primary transition">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Mon compte</span>
          </Link>
          <Link href="/login" className="flex items-center gap-1.5 text-sm text-ink hover:text-primary transition">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
