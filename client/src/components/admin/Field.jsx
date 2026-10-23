// Label + help text wrapper used by every admin form field.
export default function Field({ label, help, children }) {
  return (
    <div className="admin-field">
      {label && <span className="admin-field-label">{label}</span>}
      {children}
      {help && <small className="admin-field-help">{help}</small>}
    </div>
  )
}
