import { Header } from './Header'
import { TopNav } from './TopNav'

export function DashboardShell({
  fullName,
  role,
  children,
}: {
  fullName: string | null
  role: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper">
      <Header fullName={fullName} role={role} />
      <TopNav role={role} />
      <main className="px-4 md:px-8 py-6 md:py-8">{children}</main>
    </div>
  )
}
