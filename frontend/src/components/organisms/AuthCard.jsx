import { LoginForm } from "@/components/organisms/LoginForm"

export function AuthCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Login</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Masuk dengan username dan password
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
