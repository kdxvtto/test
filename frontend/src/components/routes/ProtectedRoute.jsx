import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { FullScreenLoader } from "@/components/molecules/FullScreenLoader"

export function ProtectedRoute({ children }) {
  const { authenticated, loading } = useAuth()
  if (loading) return <FullScreenLoader />
  if (!authenticated) return <Navigate to="/" replace />
  return children
}
