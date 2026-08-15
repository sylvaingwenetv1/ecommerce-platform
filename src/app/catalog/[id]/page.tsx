import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Gallery } from '@/components/catalog/Gallery'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  await requireUser()
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single()

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-paper px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <Gallery images={product.images ?? []} alt={product.title_fr} />
          {product.model_3d_url && (
            <div className="mt-4">
              <p className="text-sm text-muted mb-2">Vue 3D — fais glisser pour tourner l&apos;objet</p>
              <model-viewer
                src={product.model_3d_url}
                camera-controls
                auto-rotate
                style={{ width: '100%', height: '320px', borderRadius: '0.5rem', background: '#F5F6FA' }}
              />
            </div>
          )}
        </div>
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
