import { ICONS } from '../common/DynamicIcon'
import Field from './Field'
import ImageUpload from './ImageUpload'
import ListEditor from './ListEditor'
import StringListEditor from './StringListEditor'

// The empty value for a field, used when "Add" creates a new list item.
export function blankValue(field) {
  switch (field.type) {
    case 'checkbox':
      return false
    case 'strings':
    case 'list':
      return []
    case 'icon':
      return 'Scale'
    case 'group':
      return Object.fromEntries(field.fields.map((f) => [f.key, blankValue(f)]))
    default:
      return ''
  }
}

// Draws one form field from its description (see sectionFields.js).
export default function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case 'text':
      return (
        <Field label={field.label} help={field.help}>
          <input type="text" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
        </Field>
      )

    case 'textarea':
      return (
        <Field label={field.label} help={field.help}>
          <textarea rows={field.rows || 4} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        </Field>
      )

    case 'image':
      return <ImageUpload label={field.label} help={field.help} value={value} onChange={onChange} />

    case 'icon':
      return (
        <Field label={field.label || 'Icon'}>
          <select value={value || 'Scale'} onChange={(e) => onChange(e.target.value)}>
            {Object.keys(ICONS).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
      )

    case 'checkbox':
      return (
        <label className="admin-checkbox">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      )

    case 'strings':
      return (
        <StringListEditor
          label={field.label}
          help={field.help}
          value={value}
          multiline={field.multiline}
          addLabel={field.addLabel}
          onChange={onChange}
        />
      )

    case 'group':
      return (
        <fieldset className="admin-group">
          <legend>{field.label}</legend>
          {field.fields.map((sub) => (
            <FieldRenderer key={sub.key} field={sub} value={value?.[sub.key]} onChange={(next) => onChange({ ...value, [sub.key]: next })} />
          ))}
        </fieldset>
      )

    case 'list':
      return (
        <ListEditor
          label={field.label}
          items={value}
          onChange={onChange}
          addLabel={field.addLabel}
          newItem={() => Object.fromEntries(field.fields.map((f) => [f.key, blankValue(f)]))}
          itemTitle={(item) => item[field.titleKey]}
        >
          {(item, update) =>
            field.fields.map((sub) => (
              <FieldRenderer key={sub.key} field={sub} value={item[sub.key]} onChange={(next) => update({ ...item, [sub.key]: next })} />
            ))
          }
        </ListEditor>
      )

    default:
      return null
  }
}
