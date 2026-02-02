import { Spinner } from "@/components/atoms/Spinner"

export function FullScreenLoader({ label = "Loading..." }) {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-50">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <Spinner />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  )
}
