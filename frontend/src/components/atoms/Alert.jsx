import { cn } from "@/lib/utils"

export function Alert({ variant = "error", children }) {
  const base =
    "rounded-lg border px-3 py-2 text-sm flex items-center gap-2 shadow-sm bg-white/80 dark:bg-slate-900/70 backdrop-blur"
  const styles =
    variant === "success"
      ? "border-emerald-200 text-emerald-800 dark:border-emerald-700 dark:text-emerald-200"
      : "border-red-200 text-red-800 dark:border-red-700 dark:text-red-200"
  return <div className={cn(base, styles)}>{children}</div>
}
