export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-[#4B3FBB] via-[#7B3FBB] to-[#C23FA0]">
        <span className="font-display font-bold text-xl tracking-tight">Artisanat & Co</span>
        <div>
          <h1 className="font-display font-bold text-4xl leading-tight">
            Des pièces uniques,<br />façonnées à la main.
          </h1>
          <p className="text-white/80 mt-4 max-w-sm">
            Objets d&apos;art, créations traditionnelles et pièces artisanales, présentés sous tous les angles et vendus en toute confiance.
          </p>
        </div>
        <span className="text-xs text-white/60">© 2026</span>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
