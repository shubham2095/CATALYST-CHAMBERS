import { useState } from 'react'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import ConfirmDialog from './ConfirmDialog'

// A list of items (each with several fields): add, edit, delete and reorder.
// `children(item, update, index)` draws the fields of one item.
export default function ListEditor({ label, items = [], onChange, newItem, itemTitle, addLabel = 'Add item', children }) {
  const [pendingDelete, setPendingDelete] = useState(null)
  const [justAdded, setJustAdded] = useState(null)

  const update = (i, item) => onChange(items.map((existing, idx) => (idx === i ? item : existing)))

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  const add = () => {
    onChange([...items, newItem()])
    setJustAdded(items.length)
  }

  const confirmDelete = () => {
    onChange(items.filter((_, idx) => idx !== pendingDelete))
    setPendingDelete(null)
  }

  // Buttons sit inside <summary>, so stop the click from also opening/closing the item.
  const act = (e, fn) => {
    e.preventDefault()
    e.stopPropagation()
    fn()
  }

  return (
    <div className="admin-list">
      {label && <h3 className="admin-list-title">{label}</h3>}

      {items.length === 0 && <p className="admin-muted">Nothing here yet.</p>}

      {items.map((item, i) => (
        <details className="admin-list-item" key={i} open={justAdded === i}>
          <summary>
            <span className="admin-list-item-title">{itemTitle(item, i) || `Item ${i + 1}`}</span>
            <span className="admin-row-buttons">
              <button type="button" className="admin-icon-button" aria-label="Move up" disabled={i === 0} onClick={(e) => act(e, () => move(i, -1))}>
                <ArrowUp size={15} strokeWidth={1.75} />
              </button>
              <button type="button" className="admin-icon-button" aria-label="Move down" disabled={i === items.length - 1} onClick={(e) => act(e, () => move(i, 1))}>
                <ArrowDown size={15} strokeWidth={1.75} />
              </button>
              <button type="button" className="admin-icon-button admin-icon-danger" aria-label="Delete" onClick={(e) => act(e, () => setPendingDelete(i))}>
                <Trash2 size={15} strokeWidth={1.75} />
              </button>
            </span>
          </summary>
          <div className="admin-list-item-body">{children(item, (next) => update(i, next), i)}</div>
        </details>
      ))}

      <button type="button" className="admin-button admin-button-light admin-button-small" onClick={add}>
        <Plus size={15} strokeWidth={1.75} /> {addLabel}
      </button>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this item?"
        message="It will be removed when you click Save changes."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}
