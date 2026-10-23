import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

// Knows whether the admin is logged in. `checking` is true until the first /me check finishes.
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    authService
      .getCurrentAdmin()
      .then(setAdmin)
      .catch(() => setAdmin(null))
      .finally(() => setChecking(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password)
    setAdmin(result)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setAdmin(null)
    }
  }, [])

  const value = useMemo(() => ({ admin, checking, login, logout }), [admin, checking, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
