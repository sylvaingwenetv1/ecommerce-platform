import { createClient } from './server'
import { redirect } from 'next/navigation'

export async function requireUser(allowedRoles?: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')
  if (allowedRoles && !allowedRoles.includes(profile.role)) redirect('/login')

  return { user, profile }
}
