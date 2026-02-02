import { createContext, useContext, useEffect, useState } from "react"
import api from "@/api/axios"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const refresh = async () => {
      try {
        await api.post("/auth/refresh")
        const { data } = await api.get("/auth/dashboard")
        setUser(data.user || null)
        setAuthenticated(true)
      } catch {
        setAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    refresh()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post("/auth/login", credentials)
      setUser(data.user)
      setAuthenticated(true)
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      return { success: false, message: err.response?.data?.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      await api.post("/auth/register", payload)
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || "Register failed")
      return { success: false, message: err.response?.data?.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout")
    } catch (_) {
      console.log("ignored")
    }
    setAuthenticated(false)
    setUser(null)
  }

  const value = {
    user,
    authenticated,
    loading,
    error,
    login,
    register,
    logout,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
