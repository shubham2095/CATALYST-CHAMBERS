import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { UnsavedProvider } from '../../context/UnsavedContext'
import { ToastProvider } from '../../components/admin/Toast'
import ProtectedRoute from '../../components/admin/ProtectedRoute'
import AdminLayout from '../../components/admin/AdminLayout'
import Login from './Login'
import Dashboard from './Dashboard'
import BlogEditor from './BlogEditor'
import SectionRoute from './SectionRoute'
import './admin.css'
import './admin-forms.css'

export default function AdminApp() {
  // Keep the admin out of search results while it is open.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)

    const previousTitle = document.title
    document.title = 'Admin | Catalyst Chambers'

    return () => {
      meta.remove()
      document.title = previousTitle
    }
  }, [])

  return (
    <AuthProvider>
      <ToastProvider>
        <UnsavedProvider>
          <div className="admin-root">
            <Routes>
              <Route path="/admin/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="blog" element={<BlogEditor />} />
                  <Route path=":section" element={<SectionRoute />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </UnsavedProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
