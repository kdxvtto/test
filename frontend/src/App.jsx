import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { ProtectedRoute } from "@/components/routes/ProtectedRoute"
import { FullScreenLoader } from "@/components/molecules/FullScreenLoader"

const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((mod) => ({ default: mod.LoginPage }))
)
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((mod) => ({ default: mod.DashboardPage }))
)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
