import { LoginForm } from "@/components/organisms/LoginForm"
import { useState } from "react"

export function AuthCard() {
  const [mode, setMode] = useState("login")

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {mode === "login" ? "Login" : "Register"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {mode === "login"
            ? "Masuk dengan username dan password"
            : "Buat akun baru dengan username dan password"}
        </p>
      </div>
      <LoginForm mode={mode} setMode={setMode} />
    </div>
  )
}
