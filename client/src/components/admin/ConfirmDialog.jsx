export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="admin-dialog-backdrop" onClick={onCancel}>
      <div className="admin-dialog" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="admin-dialog-actions">
          <button type="button" className="admin-button admin-button-light" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="admin-button admin-button-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
