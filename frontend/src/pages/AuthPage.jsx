import React, { useState } from 'react'
import { useStore } from '../store.js'
import { api } from '../api.js'

export default function AuthPage() {
  const [mode, setMode]     = useState('login')
  const [form, setForm]     = useState({ username:'', email:'', password:'' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken } = useStore()

  async function submit() {
    setError(''); setLoading(true)
    try {
      const data = mode === 'login'
        ? await api.login({ email: form.email, password: form.password })
        : await api.register(form)
      setToken(data.token)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  function field(name, placeholder, type='text') {
    return (
      <input
        className="modal-input"
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => setForm(f => ({...f, [name]: e.target.value}))}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">SOCIAL GALAXY</div>
        <div className="auth-sub">{mode === 'login' ? 'Enter the universe' : 'Create your galaxy'}</div>
        {error && <div className="auth-error">{error}</div>}
        {mode === 'register' && field('username', 'Username')}
        {field('email', 'Email', 'email')}
        {field('password', 'Password', 'password')}
        <button className="modal-btn primary" style={{width:'100%',marginTop:4}} onClick={submit} disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'Enter' : 'Create Galaxy'}
        </button>
        <div className="auth-toggle" onClick={() => { setMode(m => m==='login'?'register':'login'); setError('') }}>
          {mode === 'login' ? "Don't have a galaxy? Register" : 'Already have a galaxy? Login'}
        </div>
      </div>
    </div>
  )
}
