import { useNavigate } from 'react-router-dom'

// Renders a blog post's HTML. Links that point inside the site use the router, so they don't reload the page.
export default function BlogBody({ html }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    const link = e.target.closest('a')
    if (!link) return

    const href = link.getAttribute('href') || ''
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    const isPlainClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey

    if (isInternal && isPlainClick) {
      e.preventDefault()
      navigate(href)
    }
  }

  return <div className="blog-post-body" onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />
}
