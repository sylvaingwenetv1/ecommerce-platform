export default function AdminHome() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-6">Vue d&apos;ensemble</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-6 border-l-4 border-primary">
          <p className="text-sm text-muted">Produits publiés</p>
          <p className="text-3xl font-display font-bold text-ink mt-2">—</p>
        </div>
        <div className="bg-surface rounded-lg p-6 border-l-4 border-accent">
          <p className="text-sm text-muted">Commandes</p>
          <p className="text-3xl font-display font-bold text-ink mt-2">—</p>
        </div>
        <div className="bg-surface rounded-lg p-6 border-l-4 border-ink">
          <p className="text-sm text-muted">Utilisateurs</p>
          <p className="text-3xl font-display font-bold text-ink mt-2">—</p>
        </div>
      </div>
    </div>
  )
}
