import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export function Header({ fullName, role }: { fullName: string | null; role: string }) {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="h-1 bg-gradient-to-r from-[#4B3FBB] via-[#7B3FBB] to-[#C23FA0]" />
      <div className="border-b border-gray-200 flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/catalog" className="font-display font-bold text-lg text-ink">Artisanat & Co</Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-muted">{fullName ?? role}</span>
          <form action={signOut}>
            <button className="text-sm text-primary hover:underline transition">Déconnexion</button>
          </form>
        </div>
      </div>
    </header>
  )
}
