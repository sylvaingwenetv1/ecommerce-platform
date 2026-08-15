'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createProduct, updateProduct } from '@/app/actions/products'

type Category = { id: string; name_fr: string }
type Product = {
  id: string
  title_fr: string
  title_en: string | null
  description_fr: string | null
  description_en: string | null
  price: number
  category_id: string | null
}

export function ProductFormModal({
  categories,
  product,
  trigger,
}: {
  categories: Category[]
  product?: Product
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const isEdit = !!product
  const action = isEdit ? updateProduct : createProduct

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Modal open={open} onClose={() => setOpen(false)} title={isEdit ? 'Modifier le produit' : 'Ajouter un produit'}>
        <form action={action} encType="multipart/form-data">
          {isEdit && <input type="hidden" name="id" value={product!.id} />}
          <Input label="Titre (Français)" name="title_fr" type="text" defaultValue={product?.title_fr} required />
          <Input label="Titre (English)" name="title_en" type="text" defaultValue={product?.title_en ?? ''} />
          <label className="block mb-4">
            <span className="block text-sm text-muted mb-1">Description (Français)</span>
            <textarea
              name="description_fr"
              rows={3}
              defaultValue={product?.description_fr ?? ''}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </label>
          <Input label="Prix (€)" name="price" type="number" step="0.01" defaultValue={product?.price} required />
          <label className="block mb-4">
            <span className="block text-sm text-muted mb-1">Catégorie</span>
            <select
              name="category_id"
              defaultValue={product?.category_id ?? ''}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name_fr}</option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="block text-sm text-muted mb-1">Photos (jusqu&apos;à 4)</span>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 4) {
                  alert('4 photos maximum.')
                  e.target.value = ''
                }
              }}
              className="w-full text-sm text-muted"
            />
          </label>
          <label className="block mb-6">
            <span className="block text-sm text-muted mb-1">Modèle 3D (.glb, optionnel)</span>
            <input type="file" name="model3d" accept=".glb,.gltf" className="w-full text-sm text-muted" />
          </label>
          <Button type="submit">{isEdit ? 'Enregistrer' : 'Publier le produit'}</Button>
        </form>
      </Modal>
    </>
  )
}
