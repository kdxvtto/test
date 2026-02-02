import { useEffect, useState } from "react"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/atoms/ThemeToggle"
import { useTheme } from "@/context/ThemeContext"

export function DashboardPage() {
  const { user, logout } = useAuth()
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { theme } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/auth/dashboard")
        setMessage(data.message || "Welcome to my website")
      } catch (err) {
        navigate("/")
      }
    }
    fetchData()
  }, [navigate])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white transition-colors">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-12">
        <div className="mb-4 flex justify-end">
          <ThemeToggle
            className="border-slate-200 bg-white/90 text-slate-800 hover:shadow-sm dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:shadow-white/30"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
            {user?.name ? `Hi, ${user.name}` : "Welcome"}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            {message || "Welcome to my website"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-200">
            Selamat datang di website saya. Ini adalah halaman sederhana untuk dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 transition hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-lg hover:shadow-red-500/30 dark:border-red-400/40 dark:bg-red-400/20 dark:text-red-50 dark:hover:bg-red-400/30"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
