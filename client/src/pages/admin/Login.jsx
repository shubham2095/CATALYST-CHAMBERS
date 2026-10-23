import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { admin, checking, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!checking && admin) return <Navigate to="/admin" replace />

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form.email, form.password)
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p className="admin-muted">Catalyst Chambers website</p>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="current-password" required />
        </label>

        {error && <p className="admin-error" role="alert">{error}</p>}

        <button type="submit" className="admin-button" disabled={submitting}>
          <LogIn size={17} strokeWidth={1.75} /> {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
