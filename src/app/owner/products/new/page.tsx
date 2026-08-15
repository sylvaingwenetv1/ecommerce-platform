import { createProduct } from '@/app/actions/products'
import { createClient } from '@/lib/supabase/server'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default async function NewProductPage({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div className="max-w-xl">
      <h1 className="font-display font-bold text-2xl text-ink mb-6">Ajouter un produit</h1>

      {searchParams?.error && (
        <p className="text-danger text-sm mb-4">{decodeURIComponent(searchParams.error)}</p>
      )}

      <form action={createProduct} encType="multipart/form-data">
        <Input label="Titre (Français)" name="title_fr" type="text" required />
        <Input label="Titre (English)" name="title_en" type="text" />
        <label className="block mb-4">
          <span className="block text-sm text-muted mb-1">Description (Français)</span>
          <textarea name="description_fr" rows={3} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="block mb-4">
          <span className="block text-sm text-muted mb-1">Description (English)</span>
          <textarea name="description_en" rows={3} className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <Input label="Prix (€)" name="price" type="number" step="0.01" required />
        <label className="block mb-4">
          <span className="block text-sm text-muted mb-1">Catégorie</span>
          <select name="category_id" className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary">
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name_fr}</option>
            ))}
          </select>
        </label>
        <label className="block mb-6">
          <span className="block text-sm text-muted mb-1">Photo du produit</span>
          <input type="file" name="image" accept="image/*" className="w-full text-sm text-muted" />
        </label>
        <Button type="submit">Publier le produit</Button>
      </form>
    </div>
  )
}
