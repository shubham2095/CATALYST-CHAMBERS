import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const UnsavedContext = createContext({ dirty: false, setDirty: () => {} })

// Remembers whether the editor on screen has unsaved changes, so leaving the page can warn first.
export function UnsavedProvider({ children }) {
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!dirty) return undefined

    const warn = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const value = useMemo(() => ({ dirty, setDirty }), [dirty])

  return <UnsavedContext.Provider value={value}>{children}</UnsavedContext.Provider>
}

export function useUnsaved() {
  return useContext(UnsavedContext)
}
