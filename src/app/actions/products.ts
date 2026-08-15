'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const { user } = await requireUser(['owner'])
  const supabase = await createClient()

  const imageFile = formData.get('image') as File
  let imageUrl: string | null = null

  if (imageFile && imageFile.size > 0) {
    const fileName = `${user.id}/${Date.now()}-${imageFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile)
    if (!uploadError) {
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
      imageUrl = data.publicUrl
    }
  }

  const { error } = await supabase.from('products').insert({
    owner_id: user.id,
    category_id: formData.get('category_id') as string,
    title_fr: formData.get('title_fr') as string,
    title_en: formData.get('title_en') as string,
    description_fr: formData.get('description_fr') as string,
    description_en: formData.get('description_en') as string,
    price: Number(formData.get('price')),
    image_url: imageUrl,
  })

  if (error) redirect(`/owner/products/new?error=${encodeURIComponent(error.message)}`)
  redirect('/owner/products')
}

export async function updateProduct(id: string, formData: FormData) {
  await requireUser(['owner'])
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .update({
      category_id: formData.get('category_id') as string,
      title_fr: formData.get('title_fr') as string,
      title_en: formData.get('title_en') as string,
      description_fr: formData.get('description_fr') as string,
      description_en: formData.get('description_en') as string,
      price: Number(formData.get('price')),
    })
    .eq('id', id)

  if (error) redirect(`/owner/products/${id}/edit?error=${encodeURIComponent(error.message)}`)
  redirect('/owner/products')
}

export async function deleteProduct(formData: FormData) {
  await requireUser(['owner'])
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('products').delete().eq('id', id)
  redirect('/owner/products')
}
