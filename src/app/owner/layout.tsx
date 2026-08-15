import { requireUser } from '@/lib/supabase/getProfile'
import { DashboardShell } from '@/components/layout/DashboardShell'

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireUser(['owner'])
  return <DashboardShell fullName={profile.full_name} role="owner">{children}</DashboardShell>
}
