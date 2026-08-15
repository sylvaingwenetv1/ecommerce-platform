import { requireUser } from '@/lib/supabase/getProfile'
import { DashboardShell } from '@/components/layout/DashboardShell'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireUser(['client'])
  return <DashboardShell fullName={profile.full_name} role="client">{children}</DashboardShell>
}
