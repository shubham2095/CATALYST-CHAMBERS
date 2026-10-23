import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Only lets a logged-in admin through; everyone else is sent to the login page.
export default function ProtectedRoute() {
  const { admin, checking } = useAuth()
  const location = useLocation()

  if (checking) return <div className="admin-loading">Loading…</div>
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />

  return <Outlet />
}
