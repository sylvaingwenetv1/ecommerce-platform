import { signIn } from '@/app/actions/auth'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function LoginPage({ searchParams }: { searchParams: { error?: string; message?: string } }) {
  return (
    <form action={signIn}>
      <h2 className="font-display font-bold text-3xl text-ink mb-1">Bon retour</h2>
      <p className="text-muted text-sm mb-6">Connectez-vous à votre compte.</p>

      {searchParams?.message === 'check-email' && (
        <p className="text-primary text-sm mb-4">Vérifiez votre e-mail pour confirmer votre compte.</p>
      )}
      {searchParams?.error && (
        <p className="text-danger text-sm mb-4">{decodeURIComponent(searchParams.error)}</p>
      )}

      <Input label="E-mail" name="email" type="email" required />
      <PasswordInput label="Mot de passe" name="password" required />

      <Button type="submit">Se connecter</Button>

      <p className="text-muted text-sm text-center mt-6">
        Pas encore de compte ? <Link href="/signup" className="text-primary hover:underline">S'inscrire</Link>
      </p>
    </form>
  )
}
