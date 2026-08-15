export default function CatalogLoading() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="h-1 bg-gradient-to-r from-[#4B3FBB] via-[#7B3FBB] to-[#C23FA0]" />
      <div className="px-4 md:px-8 py-8">
        <div className="h-8 w-48 bg-surface rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-48 bg-surface animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-surface rounded animate-pulse" />
                <div className="h-4 w-16 bg-surface rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
