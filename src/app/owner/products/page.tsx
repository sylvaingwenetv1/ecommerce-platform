import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { deleteProduct } from '@/app/actions/products'
import Link from 'next/link'

export default async function OwnerProductsPage() {
  const { user } = await requireUser(['owner'])
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-bold text-2xl text-ink">Mes produits</h1>
        <Link href="/owner/products/new" className="bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:brightness-110 transition text-center">
          + Ajouter un produit
        </Link>
      </div>

      {(!products || products.length === 0) && (
        <p className="text-muted">Aucun produit pour l&apos;instant. Ajoutez-en un pour commencer.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title_fr} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-surface" />
            )}
            <div className="p-4">
              <p className="font-medium text-ink">{product.title_fr}</p>
              <p className="text-muted text-sm mt-1">{product.price} €</p>
              <div className="flex items-center gap-3 mt-3">
                <Link href={`/owner/products/${product.id}/edit`} className="text-primary text-sm hover:underline">Modifier</Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <button className="text-danger text-sm hover:underline">Supprimer</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
