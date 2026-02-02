import { cn } from "@/lib/utils"

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn("text-sm font-medium text-slate-800 dark:text-slate-100", className)}
      {...props}
    >
      {children}
    </label>
  )
}
