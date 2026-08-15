import { signUp } from '@/app/actions/auth'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <form action={signUp}>
      <h2 className="font-display font-bold text-3xl text-ink mb-1">Créer un compte</h2>
      <p className="text-muted text-sm mb-6">C'est rapide et gratuit.</p>

      {searchParams?.error && (
        <p className="text-danger text-sm mb-4">{decodeURIComponent(searchParams.error)}</p>
      )}

      <Input label="Nom complet" name="fullName" type="text" required />
      <Input label="E-mail" name="email" type="email" required />
      <PasswordInput label="Mot de passe" name="password" required minLength={6} />

      <Button type="submit">Créer mon compte</Button>

      <p className="text-muted text-sm text-center mt-6">
        Déjà un compte ? <Link href="/login" className="text-primary hover:underline">Se connecter</Link>
      </p>
    </form>
  )
}
