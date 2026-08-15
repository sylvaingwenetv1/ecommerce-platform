import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="bg-ink text-white mt-16">
      <div className="px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-accent font-display font-bold mb-3">Découvrir</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/catalog" className="hover:text-white transition">Tout le catalogue</Link></li>
            <li><Link href="/catalog" className="hover:text-white transition">Nouveautés</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-accent font-display font-bold mb-3">Artisanat</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/signup" className="hover:text-white transition">Devenir vendeur</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Espace propriétaire</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-accent font-display font-bold mb-3">Aide</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><span className="cursor-default">Livraison & réception</span></li>
            <li><span className="cursor-default">Paiement après réception</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-accent font-display font-bold mb-3">Compte</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/login" className="hover:text-white transition">Se connecter</Link></li>
            <li><Link href="/signup" className="hover:text-white transition">Créer un compte</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 md:px-8 py-4 text-center text-xs text-white/50">
        Paiement sécurisé après réception · © 2026 Artisanat & Co
      </div>
    </footer>
  )
}
