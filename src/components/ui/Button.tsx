export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full bg-primary text-white font-medium rounded-md py-2.5 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:brightness-95 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {children}
    </button>
  )
}
