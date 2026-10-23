import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Code, Heading2, Heading3, Italic, Link2, List, ListOrdered, Quote, Redo2, Undo2, Unlink } from 'lucide-react'

// Posts that use special formatting (numbered headings, images) are safest to edit as HTML.
function needsHtmlMode(html = '') {
  return /class=|<span|<img|<iframe|<table/i.test(html)
}

function ToolbarButton({ label, active, disabled, onClick, children }) {
  return (
    <button
      type="button"
      className={`admin-rte-button ${active ? 'is-active' : ''}`}
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }) {
  const run = () => editor.chain().focus()

  const setLink = () => {
    const previous = editor.getAttributes('link').href || ''
    const url = window.prompt('Link address (https://… or /page)', previous)
    if (url === null) return

    if (url.trim() === '') run().extendMarkRange('link').unsetLink().run()
    else run().extendMarkRange('link').setLink({ href: url.trim() }).run()
  }

  return (
    <div className="admin-rte-toolbar">
      <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => run().toggleBold().run()}>
        <Bold size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => run().toggleItalic().run()}>
        <Italic size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Heading" active={editor.isActive('heading', { level: 2 })} onClick={() => run().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Sub-heading" active={editor.isActive('heading', { level: 3 })} onClick={() => run().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => run().toggleBulletList().run()}>
        <List size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => run().toggleOrderedList().run()}>
        <ListOrdered size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => run().toggleBlockquote().run()}>
        <Quote size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Add link" active={editor.isActive('link')} onClick={setLink}>
        <Link2 size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Remove link" disabled={!editor.isActive('link')} onClick={() => run().extendMarkRange('link').unsetLink().run()}>
        <Unlink size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => run().undo().run()}>
        <Undo2 size={16} strokeWidth={1.75} />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => run().redo().run()}>
        <Redo2 size={16} strokeWidth={1.75} />
      </ToolbarButton>
    </div>
  )
}

function VisualEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: false },
      }),
    ],
    content: value,
    shouldRerenderOnTransaction: true,
    editorProps: { attributes: { class: 'admin-rte-content' } },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  })

  if (!editor) return null

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

// Rich text box for blog posts. Starts in visual mode; posts with special formatting open in HTML mode.
export default function RichTextEditor({ value, onChange }) {
  const [mode, setMode] = useState(() => (needsHtmlMode(value) ? 'html' : 'visual'))

  const toggleMode = () => {
    if (mode === 'html' && needsHtmlMode(value)) {
      const ok = window.confirm(
        'This post has special formatting (such as numbered headings) that the visual editor cannot keep. Editing it visually may remove that formatting. Continue?'
      )
      if (!ok) return
    }
    setMode(mode === 'visual' ? 'html' : 'visual')
  }

  return (
    <div className="admin-rte">
      <div className="admin-rte-modebar">
        <span>{mode === 'visual' ? 'Visual editor' : 'HTML mode'}</span>
        <button type="button" className="admin-button admin-button-light admin-button-small" onClick={toggleMode}>
          <Code size={15} strokeWidth={1.75} /> {mode === 'visual' ? 'Edit HTML' : 'Switch to visual editor'}
        </button>
      </div>

      {mode === 'visual' ? (
        <VisualEditor value={value} onChange={onChange} />
      ) : (
        <textarea className="admin-rte-html" rows={18} value={value} spellCheck={false} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}
