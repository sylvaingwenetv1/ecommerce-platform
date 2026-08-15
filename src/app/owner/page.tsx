import Link from 'next/link'

export default function OwnerHome() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-2">Bienvenue</h1>
      <p className="text-muted mb-6">Gérez vos articles et suivez vos ventes.</p>
      <Link href="/owner/products" className="inline-block bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:brightness-110 transition">
        Voir mes produits
      </Link>
    </div>
  )
}
