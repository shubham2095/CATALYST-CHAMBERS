import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import PublicSite from './PublicSite'

// The admin panel is only downloaded when someone opens /admin.
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="content-gate" aria-busy="true" />}>
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <ContentProvider>
      <PublicSite />
    </ContentProvider>
  )
}
