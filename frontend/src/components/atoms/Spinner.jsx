import { cn } from "@/lib/utils"

export function Spinner({ className }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white",
        className
      )}
    />
  )
}
