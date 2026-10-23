import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, Pencil, Plus, Save, Trash2 } from 'lucide-react'
import { getSection, saveSection } from '../../services/adminContentService'
import { formatPostDate } from '../../utils/formatDate'
import { useToast } from '../../components/admin/Toast'
import { useUnsaved } from '../../context/UnsavedContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import Field from '../../components/admin/Field'
import FieldRenderer from '../../components/admin/FieldRenderer'
import ImageUpload from '../../components/admin/ImageUpload'
import RichTextEditor from '../../components/admin/RichTextEditor'

const AUTHOR_FIELDS = [
  { type: 'text', key: 'name', label: 'Name' },
  { type: 'text', key: 'role', label: 'Role' },
  { type: 'image', key: 'photo', label: 'Photo' },
  { type: 'text', key: 'linkedin', label: 'LinkedIn link' },
]

const todayIso = () => new Date().toISOString().slice(0, 10)

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
}

// Rough reading time from the post text (about 200 words a minute).
function estimateReadingTime(html = '') {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function newPost() {
  return {
    slug: '',
    title: '',
    date: todayIso(),
    location: 'New Delhi, Delhi, India',
    readingTime: 1,
    excerpt: '',
    tags: [],
    note: '',
    externalLink: '',
    externalLinkLabel: '',
    embedUrl: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    status: 'draft',
    body: '',
  }
}

function uniqueSlug(base, posts, ignoreIndex) {
  const taken = new Set(posts.filter((_, i) => i !== ignoreIndex).map((p) => p.slug))
  const start = base || 'new-post'
  let slug = start
  let n = 2
  while (taken.has(slug)) slug = `${start}-${n++}`
  return slug
}

function TagsInput({ tags, onChange }) {
  const [raw, setRaw] = useState(tags.join(', '))

  const handleChange = (e) => {
    setRaw(e.target.value)
    onChange(e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))
  }

  return (
    <Field label="Tags" help="Separate tags with commas, e.g. Law, Litigation, Delhi NCR.">
      <input type="text" value={raw} onChange={handleChange} />
    </Field>
  )
}

function PostForm({ post, index, posts, onChange, onBack }) {
  const [slugTouched, setSlugTouched] = useState(post.slug !== '')
  const set = (patch) => onChange({ ...post, ...patch })

  const handleTitle = (title) => {
    const patch = { title }
    if (!slugTouched) patch.slug = uniqueSlug(slugify(title), posts, index)
    set(patch)
  }

  const handleBody = (body) => {
    // Keep the reading time in step with the text, unless it was typed in by hand.
    const wasAuto = post.readingTime === estimateReadingTime(post.body)
    set({ body, ...(wasAuto ? { readingTime: estimateReadingTime(body) } : {}) })
  }

  const duplicate = posts.some((p, i) => i !== index && p.slug === post.slug)

  return (
    <>
      <button type="button" className="admin-back" onClick={onBack}>
        <ArrowLeft size={16} strokeWidth={1.75} /> All posts
      </button>

      <div className="admin-form">
        <Field label="Title">
          <input type="text" value={post.title} onChange={(e) => handleTitle(e.target.value)} />
        </Field>

        <div className="admin-field-row">
          <Field label="Status" help="Drafts are saved but not shown on the website.">
            <select value={post.status} onChange={(e) => set({ status: e.target.value })}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published (visible)</option>
            </select>
          </Field>

          <Field label="Date">
            <input type="date" value={post.date} onChange={(e) => set({ date: e.target.value })} />
          </Field>

          <Field label="Reading time (minutes)">
            <input type="number" min="1" max="120" value={post.readingTime} onChange={(e) => set({ readingTime: Number(e.target.value) || 1 })} />
          </Field>
        </div>

        <Field label="Web address (slug)" help={duplicate ? undefined : 'The post opens at /blog/your-slug. Changing it breaks old links to this post.'}>
          <input
            type="text"
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true)
              set({ slug: slugify(e.target.value) })
            }}
          />
          {duplicate && <small className="admin-field-error">Another post already uses this address.</small>}
        </Field>

        <Field label="Short summary (shown on the blog list)">
          <textarea rows={3} value={post.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
        </Field>

        <TagsInput tags={post.tags} onChange={(tags) => set({ tags })} />

        <ImageUpload label="Cover image (optional)" value={post.coverImage} onChange={(coverImage) => set({ coverImage })} />

        <Field label="Post content">
          <RichTextEditor value={post.body} onChange={handleBody} />
        </Field>

        <Field label="Location">
          <input type="text" value={post.location} onChange={(e) => set({ location: e.target.value })} />
        </Field>

        <details className="admin-advanced">
          <summary>More options (embed, source link, SEO)</summary>
          <div className="admin-form">
            <Field label="Embed a LinkedIn or YouTube post" help="Paste the embed link, e.g. https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:… It is shown under the content.">
              <input type="text" value={post.embedUrl} onChange={(e) => set({ embedUrl: e.target.value })} />
            </Field>
            <Field label="Note above the post (optional)">
              <textarea rows={2} value={post.note} onChange={(e) => set({ note: e.target.value })} />
            </Field>
            <Field label="Link to the original (optional)">
              <input type="text" value={post.externalLink} onChange={(e) => set({ externalLink: e.target.value })} />
            </Field>
            <Field label="Text for that link">
              <input type="text" value={post.externalLinkLabel} onChange={(e) => set({ externalLinkLabel: e.target.value })} />
            </Field>
            <Field label="SEO title (optional)">
              <input type="text" value={post.seoTitle} onChange={(e) => set({ seoTitle: e.target.value })} />
            </Field>
            <Field label="SEO description (optional)">
              <textarea rows={2} value={post.seoDescription} onChange={(e) => set({ seoDescription: e.target.value })} />
            </Field>
          </div>
        </details>
      </div>
    </>
  )
}

export default function BlogEditor() {
  const toast = useToast()
  const { setDirty } = useUnsaved()

  const [data, setData] = useState(null)
  const [saved, setSaved] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  useEffect(() => {
    getSection('blog')
      .then((res) => {
        setData(res.data)
        setSaved(JSON.stringify(res.data))
      })
      .catch((err) => setError(err.message))
  }, [])

  const dirty = data !== null && JSON.stringify(data) !== saved

  useEffect(() => {
    setDirty(dirty)
    return () => setDirty(false)
  }, [dirty, setDirty])

  const setPosts = (posts) => setData({ ...data, posts })

  const addPost = () => {
    setPosts([newPost(), ...data.posts])
    setSelected(0)
  }

  const movePost = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= data.posts.length) return
    const posts = [...data.posts]
    ;[posts[i], posts[j]] = [posts[j], posts[i]]
    setPosts(posts)
  }

  const deletePost = () => {
    setPosts(data.posts.filter((_, i) => i !== pendingDelete))
    setPendingDelete(null)
  }

  const handleSave = async () => {
    const missing = data.posts.findIndex((p) => !p.title.trim() || !p.slug.trim())
    if (missing !== -1) {
      setSelected(missing)
      toast.error('Every post needs a title and a web address (slug).')
      return
    }

    setSaving(true)
    try {
      const res = await saveSection('blog', data)
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
        <h1 className="admin-page-title">Blog</h1>
        <a href="/blog" target="_blank" rel="noopener noreferrer" className="admin-button admin-button-light">
          <ExternalLink size={15} strokeWidth={1.75} /> View blog
        </a>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!data && !error && <p className="admin-muted">Loading…</p>}

      {data && selected !== null && data.posts[selected] && (
        <PostForm
          key={selected}
          post={data.posts[selected]}
          index={selected}
          posts={data.posts}
          onChange={(post) => setPosts(data.posts.map((p, i) => (i === selected ? post : p)))}
          onBack={() => setSelected(null)}
        />
      )}

      {data && selected === null && (
        <>
          <p className="admin-muted">Write, edit, hide or delete blog posts. New posts start as drafts. Remember to click Save changes.</p>

          <button type="button" className="admin-button" onClick={addPost}>
            <Plus size={16} strokeWidth={1.75} /> New post
          </button>

          <div className="admin-post-list">
            {data.posts.length === 0 && <p className="admin-muted">No posts yet.</p>}

            {data.posts.map((post, i) => (
              <div className="admin-post-row" key={post.slug || `new-${i}`}>
                <div className="admin-post-info">
                  <strong>{post.title || 'Untitled post'}</strong>
                  <span>
                    {formatPostDate(post.date)} · <span className={`admin-badge admin-badge-${post.status}`}>{post.status === 'published' ? 'Published' : 'Draft'}</span>
                  </span>
                </div>
                <div className="admin-row-buttons">
                  <button type="button" className="admin-icon-button" aria-label="Move up" disabled={i === 0} onClick={() => movePost(i, -1)}>
                    <ArrowUp size={15} strokeWidth={1.75} />
                  </button>
                  <button type="button" className="admin-icon-button" aria-label="Move down" disabled={i === data.posts.length - 1} onClick={() => movePost(i, 1)}>
                    <ArrowDown size={15} strokeWidth={1.75} />
                  </button>
                  {post.status === 'published' && post.slug && (
                    <a className="admin-icon-button" aria-label="View post" href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={15} strokeWidth={1.75} />
                    </a>
                  )}
                  <button type="button" className="admin-button admin-button-light admin-button-small" onClick={() => setSelected(i)}>
                    <Pencil size={14} strokeWidth={1.75} /> Edit
                  </button>
                  <button type="button" className="admin-icon-button admin-icon-danger" aria-label="Delete post" onClick={() => setPendingDelete(i)}>
                    <Trash2 size={15} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <FieldRenderer
            field={{ type: 'group', key: 'author', label: 'Author shown on every post', fields: AUTHOR_FIELDS }}
            value={data.author}
            onChange={(author) => setData({ ...data, author })}
          />
        </>
      )}

      {data && (
        <div className="admin-savebar">
          <span className={dirty ? 'admin-savebar-dirty' : 'admin-savebar-clean'}>{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
          <button type="button" className="admin-button" disabled={!dirty || saving} onClick={handleSave}>
            <Save size={16} strokeWidth={1.75} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this post?"
        message="It will be removed from the website when you click Save changes."
        onConfirm={deletePost}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  )
}
