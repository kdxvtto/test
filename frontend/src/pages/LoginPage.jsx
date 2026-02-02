import { AuthCard } from "@/components/organisms/AuthCard"
import { ThemeToggle } from "@/components/atoms/ThemeToggle"

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-8">
        <div className="mb-6 flex w-full max-w-6xl justify-end">
          <ThemeToggle />
        </div>
        <AuthCard />
      </div>
    </div>
  )
}
