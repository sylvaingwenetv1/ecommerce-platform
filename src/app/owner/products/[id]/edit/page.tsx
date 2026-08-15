import { createClient } from '@/lib/supabase/server'
import { updateProduct } from '@/app/actions/products'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params, searchParams }: { params: { id: string }; searchParams: { error?: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single()
  const { data: categories } = await supabase.from('categories').select('*')

  if (!product) notFound()

  const updateWithId = updateProduct.bind(null, product.id)

  return (
    <div className="max-w-xl">
      <h1 className="font-display font-bold text-2xl text-ink mb-6">Modifier le produit</h1>

      {searchParams?.error && (
        <p className="text-danger text-sm mb-4">{decodeURIComponent(searchParams.error)}</p>
      )}

      <form action={updateWithId}>
        <Input label="Titre (Français)" name="title_fr" type="text" defaultValue={product.title_fr} required />
        <Input label="Titre (English)" name="title_en" type="text" defaultValue={product.title_en} />
        <label className="block mb-4">
          <span className="block text-sm text-muted mb-1">Description (Français)</span>
          <textarea name="description_fr" rows={3} defaultValue={product.description_fr} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <Input label="Prix (€)" name="price" type="number" step="0.01" defaultValue={product.price} required />
        <label className="block mb-6">
          <span className="block text-sm text-muted mb-1">Catégorie</span>
          <select name="category_id" defaultValue={product.category_id} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary">
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name_fr}</option>
            ))}
          </select>
        </label>
        <Button type="submit">Enregistrer</Button>
      </form>
    </div>
  )
}
