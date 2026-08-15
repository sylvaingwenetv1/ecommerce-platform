import { createClient } from '@/lib/supabase/server'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { FeatureBar } from '@/components/home/FeatureBar'
import { PromoBand } from '@/components/home/PromoBand'
import { ProductCard } from '@/components/catalog/ProductCard'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div className="min-h-screen bg-paper">
      <PublicHeader />
      <FeatureBar />
      <PromoBand />
      <main className="px-4 md:px-8 py-10">
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Dernières créations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
