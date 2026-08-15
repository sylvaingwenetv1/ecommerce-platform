export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full bg-primary text-white font-medium rounded-md py-2.5 hover:brightness-110 active:brightness-95 transition"
    >
      {children}
    </button>
  )
}
