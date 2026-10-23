import { Navigate, useParams } from 'react-router-dom'
import { SECTION_FIELDS } from './sectionFields'
import SectionEditor from './SectionEditor'

// /admin/:section -> the right editor. `key` makes React start fresh when you switch sections.
export default function SectionRoute() {
  const { section } = useParams()

  if (!SECTION_FIELDS[section]) return <Navigate to="/admin" replace />

  return <SectionEditor key={section} section={section} />
}
