import { createClient } from '@/lib/supabase/server'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { ProductCard } from '@/components/catalog/ProductCard'

export default async function CatalogPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = await createClient()
  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (searchParams?.q) {
    query = query.ilike('title_fr', `%${searchParams.q}%`)
  }
  const { data: products } = await query

  return (
    <div className="min-h-screen bg-paper">
      <PublicHeader />
      <main className="px-4 md:px-8 py-8">
        <h1 className="font-display font-bold text-3xl text-ink mb-1">Le catalogue</h1>
        {searchParams?.q && (
          <p className="text-muted text-sm mb-6">Résultats pour "{searchParams.q}"</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products?.length === 0 && <p className="text-muted">Aucun produit trouvé.</p>}
      </main>
      <PublicFooter />
    </div>
  )
}
