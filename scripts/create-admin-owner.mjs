import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function createAccount(email, password, fullName, role) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role },
  })
  if (error) {
    console.error(`Erreur pour ${email}:`, error.message)
  } else {
    console.log(`Créé: ${email} (${role}) — id: ${data.user.id}`)
  }
}

await createAccount('admin@tondomaine.com', 'ChangeMoi123!', 'Administrateur', 'admin')
await createAccount('proprietaire@tondomaine.com', 'ChangeMoi456!', 'Propriétaire Test', 'owner')
