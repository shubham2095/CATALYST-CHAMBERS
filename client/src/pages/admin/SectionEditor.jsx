import { Link, Navigate, useParams } from 'react-router-dom'
import { getSectionInfo } from './sections'

// Placeholder: the real editor forms are added in the next step.
export default function SectionEditor() {
  const { section } = useParams()
  const info = getSectionInfo(section)

  if (!info) return <Navigate to="/admin" replace />

  return (
    <>
      <h1 className="admin-page-title">{info.label}</h1>
      <p className="admin-muted">The editor for this section is coming in the next step.</p>
      <Link to="/admin" className="admin-button admin-button-light">Back to dashboard</Link>
    </>
  )
}
