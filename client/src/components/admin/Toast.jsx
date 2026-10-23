import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ToastContext = createContext({ success: () => {}, error: () => {} })

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const show = useCallback((type, message) => setToast({ type, message, id: Date.now() }), [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), toast.type === 'error' ? 7000 : 3500)
    return () => clearTimeout(timer)
  }, [toast])

  const api = useMemo(
    () => ({
      success: (message) => show('success', message),
      error: (message) => show('error', message),
    }),
    [show]
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`} role="status" key={toast.id}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
