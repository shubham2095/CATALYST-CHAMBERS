import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import Field from './Field'

// A list of plain text lines: add, edit, delete and reorder.
export default function StringListEditor({ label, help, value = [], onChange, multiline = false, addLabel = 'Add' }) {
  const update = (i, text) => onChange(value.map((item, idx) => (idx === i ? text : item)))
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= value.length) return
    const next = [...value]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <Field label={label} help={help}>
      <div className="admin-strings">
        {value.map((item, i) => (
          <div className="admin-strings-row" key={i}>
            {multiline ? (
              <textarea rows={3} value={item} onChange={(e) => update(i, e.target.value)} />
            ) : (
              <input type="text" value={item} onChange={(e) => update(i, e.target.value)} />
            )}
            <div className="admin-row-buttons">
              <button type="button" className="admin-icon-button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                <ArrowUp size={15} strokeWidth={1.75} />
              </button>
              <button type="button" className="admin-icon-button" aria-label="Move down" disabled={i === value.length - 1} onClick={() => move(i, 1)}>
                <ArrowDown size={15} strokeWidth={1.75} />
              </button>
              <button type="button" className="admin-icon-button admin-icon-danger" aria-label="Delete" onClick={() => remove(i)}>
                <Trash2 size={15} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="admin-button admin-button-light admin-button-small" onClick={() => onChange([...value, ''])}>
          <Plus size={15} strokeWidth={1.75} /> {addLabel}
        </button>
      </div>
    </Field>
  )
}
