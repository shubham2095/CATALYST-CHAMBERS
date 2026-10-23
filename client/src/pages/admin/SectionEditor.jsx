import { useEffect, useState } from 'react'
import { ExternalLink, Save } from 'lucide-react'
import { getSection, saveSection } from '../../services/adminContentService'
import { useToast } from '../../components/admin/Toast'
import { useUnsaved } from '../../context/UnsavedContext'
import FieldRenderer from '../../components/admin/FieldRenderer'
import { SECTION_FIELDS } from './sectionFields'
import { getSectionInfo } from './sections'

// One form for one section (everything except Blog). Loads the saved content, edits it, saves it back.
export default function SectionEditor({ section }) {
  const info = getSectionInfo(section)
  const fields = SECTION_FIELDS[section]
  const toast = useToast()
  const { setDirty } = useUnsaved()

  const [data, setData] = useState(null)
  const [saved, setSaved] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSection(section)
      .then((res) => {
        setData(res.data)
        setSaved(JSON.stringify(res.data))
      })
      .catch((err) => setError(err.message))
  }, [section])

  const dirty = data !== null && JSON.stringify(data) !== saved

  useEffect(() => {
    setDirty(dirty)
    return () => setDirty(false)
  }, [dirty, setDirty])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await saveSection(section, data)
      setData(res.data)
      setSaved(JSON.stringify(res.data))
      toast.success('Saved. The website now shows your changes.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">{info.label}</h1>
        <a href={info.preview} target="_blank" rel="noopener noreferrer" className="admin-button admin-button-light">
          <ExternalLink size={15} strokeWidth={1.75} /> View page
        </a>
      </div>
      <p className="admin-muted">{info.description}</p>

      {error && <p className="admin-error">{error}</p>}
      {!data && !error && <p className="admin-muted">Loading…</p>}

      {data && (
        <>
          <div className="admin-form">
            {fields.map((field) => (
              <FieldRenderer key={field.key} field={field} value={data[field.key]} onChange={(next) => setData({ ...data, [field.key]: next })} />
            ))}
          </div>

          <div className="admin-savebar">
            <span className={dirty ? 'admin-savebar-dirty' : 'admin-savebar-clean'}>{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
            <button type="button" className="admin-button" disabled={!dirty || saving} onClick={handleSave}>
              <Save size={16} strokeWidth={1.75} /> {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
