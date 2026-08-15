export function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block mb-4">
      <span className="block text-sm text-muted mb-1">{label}</span>
      <input
        {...props}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-base text-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      />
    </label>
  )
}
