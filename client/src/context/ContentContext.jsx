import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchPublicContent } from '../services/contentService'

const ContentContext = createContext(null)

// Loads all public website content once. Children only render when it is ready,
// so pages can always read it without null checks.
export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [failed, setFailed] = useState(false)

  const load = useCallback(() => {
    setFailed(false)
    fetchPublicContent().then(setContent).catch(() => setFailed(true))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const seo = content?.site?.seo
    if (!seo) return
    if (seo.title) document.title = seo.title
    if (seo.description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
    }
  }, [content])

  if (failed) {
    return (
      <div className="content-gate content-gate-error">
        <p>We couldn&rsquo;t load this page. Please check your connection and try again.</p>
        <button type="button" className="btn-primary" onClick={load}>
          Try again
        </button>
      </div>
    )
  }

  if (!content) return <div className="content-gate" aria-busy="true" />

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}

// Site settings plus the links derived from them (phone, WhatsApp).
export function useSite() {
  const { site } = useContent()

  return useMemo(
    () => ({
      ...site,
      telHref: `tel:${site.phone.replace(/[^\d+]/g, '')}`,
      waHref: `https://wa.me/${site.whatsapp}`,
    }),
    [site]
  )
}
