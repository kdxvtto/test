import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export const Input = forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition",
        "focus:border-primary focus:ring-2 focus:ring-primary/30",
        "dark:border-slate-800 dark:focus:border-primary",
        className
      )}
      {...props}
    />
  )
})
