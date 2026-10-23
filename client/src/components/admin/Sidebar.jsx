import { NavLink } from 'react-router-dom'
import { ExternalLink, LayoutDashboard, LogOut } from 'lucide-react'
import { SECTIONS } from '../../pages/admin/sections'

export default function Sidebar({ open, onNavigate, onLogout }) {
  return (
    <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
      <div className="admin-sidebar-brand">
        <span>Catalyst Chambers</span>
        <small>Admin Panel</small>
      </div>

      <nav className="admin-sidebar-nav">
        <NavLink to="/admin" end className="admin-nav-link" onClick={onNavigate}>
          <LayoutDashboard size={17} strokeWidth={1.75} /> Dashboard
        </NavLink>

        <p className="admin-nav-heading">Edit content</p>
        {SECTIONS.map((section) => (
          <NavLink key={section.name} to={`/admin/${section.name}`} className="admin-nav-link" onClick={onNavigate}>
            {section.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">
          <ExternalLink size={17} strokeWidth={1.75} /> View website
        </a>
        <button type="button" className="admin-nav-link" onClick={onLogout}>
          <LogOut size={17} strokeWidth={1.75} /> Log out
        </button>
      </div>
    </aside>
  )
}
