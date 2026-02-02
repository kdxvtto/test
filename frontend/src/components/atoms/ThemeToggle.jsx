import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition",
        "hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100",
        className
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"} mode</span>
    </button>
  )
}
