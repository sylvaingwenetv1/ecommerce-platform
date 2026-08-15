import Link from 'next/link'

type Product = {
  id: string
  title_fr: string
  price: number
  images: string[] | null
}

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0]
  return (
    <Link
      href={`/catalog/${product.id}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
    >
      {cover ? (
        <img src={cover} alt={product.title_fr} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-surface" />
      )}
      <div className="p-4">
        <p className="font-medium text-ink line-clamp-1">{product.title_fr}</p>
        <p className="text-primary font-display font-bold mt-1">{product.price} €</p>
      </div>
    </Link>
  )
}
