'use client'

import { useState } from 'react'

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return <div className="w-full aspect-square bg-surface rounded-lg" />
  }

  return (
    <div>
      <img
        src={images[active]}
        alt={alt}
        className="w-full aspect-square object-cover rounded-lg transition-opacity duration-300"
      />
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition ${
                i === active ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
