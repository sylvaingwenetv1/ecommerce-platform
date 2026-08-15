import { requireUser } from '@/lib/supabase/getProfile'
import { DashboardShell } from '@/components/layout/DashboardShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireUser(['admin'])
  return <DashboardShell fullName={profile.full_name} role="admin">{children}</DashboardShell>
}
