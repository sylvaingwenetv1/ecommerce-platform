import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { ProductCard } from '@/components/catalog/ProductCard'

export default async function CatalogPage() {
  const { profile } = await requireUser()
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-lg text-ink">Artisanat & Co</span>
        <span className="text-sm text-muted">{profile.full_name}</span>
      </header>
      <main className="px-4 md:px-8 py-8">
        <h1 className="font-display font-bold text-3xl text-ink mb-6">Le catalogue</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
