import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)
const COOKIE_KEY = "theme"

const readThemeCookie = () => {
  if (typeof document === "undefined") return null
  const cookies = document.cookie.split(";").map((c) => c.trim())
  const kv = cookies.find((c) => c.startsWith(`${COOKIE_KEY}=`))
  if (!kv) return null
  const value = kv.split("=")[1]
  return value === "dark" || value === "light" ? value : null
}

const writeThemeCookie = (theme) => {
  if (typeof document === "undefined") return
  document.cookie = `${COOKIE_KEY}=${theme}; max-age=31536000; path=/; samesite=lax`
}

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light"
  const fromCookie = readThemeCookie()
  if (fromCookie) return fromCookie
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

const applyThemeClass = (theme) => {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeClass(theme)
    writeThemeCookie(theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
