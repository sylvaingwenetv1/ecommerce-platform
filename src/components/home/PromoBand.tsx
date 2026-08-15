export function PromoBand() {
  return (
    <div className="bg-gradient-to-r from-[#4B3FBB] via-[#7B3FBB] to-[#C23FA0] text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 py-10">
        <div>
          <p className="font-display font-bold text-lg mb-2">Restez informé</p>
          <p className="text-sm text-white/80 mb-4">Nouveautés et pièces uniques dans votre boîte mail.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Votre e-mail"
              className="flex-1 rounded-md px-3 py-2 text-sm text-ink focus:outline-none"
            />
            <button type="submit" className="bg-white text-primary text-sm font-medium rounded-md px-4 py-2 transition hover:brightness-95">
              OK
            </button>
          </form>
        </div>
        <div>
          <p className="font-display font-bold text-lg mb-2">Soutenez l&apos;artisanat</p>
          <p className="text-sm text-white/80">Chaque achat rémunère directement l&apos;artisan créateur.</p>
        </div>
        <div>
          <p className="font-display font-bold text-lg mb-2">Une question ?</p>
          <p className="text-sm text-white/80">Notre équipe vous répond du lundi au vendredi.</p>
        </div>
      </div>
    </div>
  )
}
