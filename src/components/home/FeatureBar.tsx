import { Truck, ShieldCheck, Star, BadgeCheck } from 'lucide-react'

const FEATURES = [
  { icon: Truck, title: 'Livraison soignée', desc: 'Chaque pièce est emballée avec soin' },
  { icon: ShieldCheck, title: 'Paiement à la réception', desc: "Vous payez une fois l'objet reçu" },
  { icon: Star, title: 'Satisfaction garantie', desc: 'Des artisans vérifiés et notés' },
  { icon: BadgeCheck, title: 'Pièces authentiques', desc: 'Créations originales et traditionnelles' },
]

export function FeatureBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8 py-10 border-b border-gray-100">
      {FEATURES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex flex-col items-center text-center gap-2">
          <div className="w-11 h-11 rounded-full bg-surface flex items-center justify-center text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-ink">{title}</p>
          <p className="text-xs text-muted">{desc}</p>
        </div>
      ))}
    </div>
  )
}
