import { useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { uploadImage } from '../../services/uploadService'
import { useToast } from './Toast'
import Field from './Field'

export default function ImageUpload({ label, value, onChange, help }) {
  const toast = useToast()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setBusy(true)
    try {
      const { url } = await uploadImage(file)
      onChange(url)
      toast.success('Image uploaded. Remember to save your changes.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Field label={label} help={help || 'JPG, PNG or WebP, up to 5MB.'}>
      <div className="admin-image">
        {value ? <img src={value} alt="" /> : <div className="admin-image-empty">No image</div>}

        <div className="admin-image-controls">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/photo.jpg"
            aria-label={`${label || 'Image'} path`}
          />
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleFile} />
          <button type="button" className="admin-button admin-button-light" disabled={busy} onClick={() => inputRef.current?.click()}>
            <ImagePlus size={15} strokeWidth={1.75} /> {busy ? 'Uploading…' : 'Upload'}
          </button>
          {value && (
            <button type="button" className="admin-icon-button" aria-label="Remove image" onClick={() => onChange('')}>
              <X size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>
    </Field>
  )
}
