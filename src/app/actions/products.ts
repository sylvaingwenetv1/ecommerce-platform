'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/getProfile'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const { user } = await requireUser(['owner'])
  const supabase = await createClient()

  const imageFiles = (formData.getAll('images') as File[]).filter((f) => f.size > 0).slice(0, 4)
  const imageUrls: string[] = []
  for (const file of imageFiles) {
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file)
    if (!error) {
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
      imageUrls.push(data.publicUrl)
    }
  }

  let modelUrl: string | null = null
  const modelFile = formData.get('model3d') as File
  if (modelFile && modelFile.size > 0) {
    const fileName = `${user.id}/${Date.now()}-${modelFile.name}`
    const { error } = await supabase.storage.from('product-3d').upload(fileName, modelFile)
    if (!error) {
      const { data } = supabase.storage.from('product-3d').getPublicUrl(fileName)
      modelUrl = data.publicUrl
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
    images: imageUrls,
    model_3d_url: modelUrl,
  })

  if (error) redirect(`/owner/products?error=${encodeURIComponent(error.message)}`)
  redirect('/owner/products')
}

export async function updateProduct(formData: FormData) {
  const { user } = await requireUser(['owner'])
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { data: existing } = await supabase
    .from('products')
    .select('images, model_3d_url')
    .eq('id', id)
    .single()

  const imageUrls = [...(existing?.images ?? [])]
  const newFiles = (formData.getAll('images') as File[]).filter((f) => f.size > 0)
  for (const file of newFiles) {
    if (imageUrls.length >= 4) break
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file)
    if (!error) {
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
      imageUrls.push(data.publicUrl)
    }
  }

  let modelUrl = existing?.model_3d_url ?? null
  const modelFile = formData.get('model3d') as File
  if (modelFile && modelFile.size > 0) {
    const fileName = `${user.id}/${Date.now()}-${modelFile.name}`
    const { error } = await supabase.storage.from('product-3d').upload(fileName, modelFile)
    if (!error) {
      const { data } = supabase.storage.from('product-3d').getPublicUrl(fileName)
      modelUrl = data.publicUrl
    }
  }

  const { error } = await supabase
    .from('products')
    .update({
      category_id: formData.get('category_id') as string,
      title_fr: formData.get('title_fr') as string,
      title_en: formData.get('title_en') as string,
      description_fr: formData.get('description_fr') as string,
      description_en: formData.get('description_en') as string,
      price: Number(formData.get('price')),
      images: imageUrls,
      model_3d_url: modelUrl,
    })
    .eq('id', id)

  if (error) redirect(`/owner/products?error=${encodeURIComponent(error.message)}`)
  redirect('/owner/products')
}

export async function deleteProduct(formData: FormData) {
  await requireUser(['owner'])
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('products').delete().eq('id', id)
  redirect('/owner/products')
}
