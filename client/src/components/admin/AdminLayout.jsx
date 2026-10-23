import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} onLogout={handleLogout} />
      {menuOpen && <button type="button" className="admin-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.75} />
          </button>
          <span className="admin-topbar-user">{admin.email}</span>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
