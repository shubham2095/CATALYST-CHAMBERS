import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Pencil } from 'lucide-react'
import { listSections } from '../../services/adminContentService'
import { SECTIONS } from './sections'

function formatTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function Dashboard() {
  const [modified, setModified] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    listSections()
      .then(({ sections }) => setModified(Object.fromEntries(sections.map((s) => [s.name, s.lastModified]))))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-muted">Choose a part of the website to edit. Changes show on the public site as soon as you save.</p>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-card-grid">
        {SECTIONS.map((section) => (
          <div className="admin-card" key={section.name}>
            <h2>{section.label}</h2>
            <p>{section.description}</p>
            <p className="admin-card-meta">Last edited: {formatTime(modified[section.name])}</p>
            <div className="admin-card-actions">
              <Link to={`/admin/${section.name}`} className="admin-button">
                <Pencil size={15} strokeWidth={1.75} /> Edit
              </Link>
              <a href={section.preview} target="_blank" rel="noopener noreferrer" className="admin-button admin-button-light">
                <ExternalLink size={15} strokeWidth={1.75} /> View page
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
