import { useMemo, useState } from "react"
import { LogIn, UserPlus } from "lucide-react"
import { TextField } from "@/components/molecules/TextField"
import { PasswordField } from "@/components/molecules/PasswordField"
import { Button } from "@/components/atoms/Button"
import { useAuth } from "@/context/AuthContext"
import { Alert } from "@/components/atoms/Alert"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const [mode, setMode] = useState("login")
  const [form, setForm] = useState({ name: "", username: "", password: "" })
  const { login, register, loading, error, setError } = useAuth()
  const navigate = useNavigate()

  const isRegister = mode === "register"

  const buttonLabel = useMemo(
    () => (isRegister ? "Create account" : "Sign in"),
    [isRegister]
  )

  const icon = isRegister ? <UserPlus size={18} /> : <LogIn size={18} />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (isRegister) {
      const res = await register({
        name: form.name || form.username,
        username: form.username,
        password: form.password,
      })
      if (res.success) {
        setMode("login")
      }
    } else {
      const res = await login({ username: form.username, password: form.password })
      if (res.success) {
        navigate("/dashboard")
      }
    }
  }

  const updateField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2 text-sm">
        <button
          type="button"
          className={`flex-1 rounded-lg border px-3 py-2 ${
            isRegister ? "border-slate-300 text-slate-700 dark:border-slate-700" : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 rounded-lg border px-3 py-2 ${
            isRegister ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "border-slate-300 text-slate-700 dark:border-slate-700"
          }`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      {isRegister && (
        <TextField
          id="name"
          label="Name"
          placeholder="John Doe"
          value={form.name}
          onChange={updateField("name")}
          required
        />
      )}
      <TextField
        id="username"
        label="Username"
        placeholder="johndoe"
        value={form.username}
        onChange={updateField("username")}
        required
      />
      <PasswordField
        id="password"
        placeholder="••••••••"
        value={form.password}
        onChange={updateField("password")}
        required
      />

      {error && <Alert>{error}</Alert>}

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {icon}
        {loading ? "Please wait..." : buttonLabel}
      </Button>
    </form>
  )
}
