import { Header } from './Header'
import { Sidebar } from './Sidebar'

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
      <div className="flex flex-col md:flex-row">
        <Sidebar role={role} />
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">{children}</main>
      </div>
    </div>
  )
}
