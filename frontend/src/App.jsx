import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store.js'
import { api } from './api.js'
import AuthPage from './pages/AuthPage.jsx'
import UniversePage from './pages/UniversePage.jsx'
import GalaxyPage from './pages/GalaxyPage.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const { token, setMe, setAllUsers, setFriends, me } = useStore()

  useEffect(() => {
    if (!token) return
    api.getMe().then(setMe).catch(() => {})
    api.getAllUsers().then(setAllUsers).catch(() => {})
    api.getFriends().then(setFriends).catch(() => {})
  }, [token])

  if (!token) return <AuthPage />

  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path="/" element={<UniversePage />} />
        <Route path="/galaxy/:userId" element={<GalaxyPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
