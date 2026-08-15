import Link from 'next/link'

export default function ClientHome() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-2">Bienvenue</h1>
      <p className="text-muted mb-6">Découvrez les créations disponibles.</p>
      <Link href="/catalog" className="inline-block bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:brightness-110 transition">
        Parcourir le catalogue
      </Link>
    </div>
  )
}
