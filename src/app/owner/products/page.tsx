import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { deleteProduct } from '@/app/actions/products'
import { ProductFormModal } from '@/components/owner/ProductFormModal'

export default async function OwnerProductsPage() {
  const { user } = await requireUser(['owner'])
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-bold text-2xl text-ink">Mes produits</h1>
        <ProductFormModal
          categories={categories ?? []}
          trigger={
            <button className="bg-primary text-white text-sm font-medium rounded-md px-4 py-2 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5">
              + Ajouter un produit
            </button>
          }
        />
      </div>

      {(!products || products.length === 0) && (
        <p className="text-muted">Aucun produit pour l&apos;instant. Ajoutez-en un pour commencer.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.title_fr} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-surface" />
            )}
            <div className="p-4">
              <p className="font-medium text-ink">{product.title_fr}</p>
              <p className="text-muted text-sm mt-1">{product.price} €</p>
              <div className="flex items-center gap-3 mt-3">
                <ProductFormModal
                  categories={categories ?? []}
                  product={product}
                  trigger={<span className="text-primary text-sm hover:underline cursor-pointer transition">Modifier</span>}
                />
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <button className="text-danger text-sm hover:underline transition">Supprimer</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
