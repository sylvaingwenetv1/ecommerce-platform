import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single()

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-paper px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title_fr} className="w-full rounded-lg object-cover" />
        ) : (
          <div className="w-full aspect-square bg-surface rounded-lg" />
        )}
        <div>
          <h1 className="font-display font-bold text-3xl text-ink mb-2">{product.title_fr}</h1>
          <p className="text-primary font-display font-bold text-2xl mb-4">{product.price} €</p>
          <p className="text-muted leading-relaxed">{product.description_fr}</p>
          <div className="mt-8 max-w-xs">
            <Button disabled>Ajouter au panier (bientôt)</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
