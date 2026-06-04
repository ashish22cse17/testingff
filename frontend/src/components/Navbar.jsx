import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.js'
import { api } from '../api.js'
import Modal from './Modal.jsx'

export default function Navbar() {
  const { me, logout, friends, setFriends } = useStore()
  const navigate = useNavigate()
  const [showNotifs, setShowNotifs] = useState(false)

  const pending = friends.filter(f => f.status === 'pending' && f.from_id !== me?.id)

  async function accept(fromId) {
    await api.acceptRequest(fromId)
    const updated = await api.getFriends()
    setFriends(updated)
  }
  async function decline(fromId) {
    await api.removeFriend(fromId)
    const updated = await api.getFriends()
    setFriends(updated)
  }

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
          SOCIAL GALAXY
        </span>
        <div className="navbar-right">
          {me && <span className="nav-user">{me.username}</span>}
          <div style={{position:'relative'}}>
            <button className="nav-btn" onClick={() => setShowNotifs(true)}>
              REQUESTS
              {pending.length > 0 && <span className="nav-badge">{pending.length}</span>}
            </button>
          </div>
          <button className="nav-btn" onClick={() => { logout(); navigate('/') }}>
            LOGOUT
          </button>
        </div>
      </nav>

      {showNotifs && (
        <Modal title="Friend requests" onClose={() => setShowNotifs(false)}>
          {pending.length === 0 && (
            <p style={{fontSize:11,color:'rgba(150,190,255,0.5)',fontFamily:'sans-serif'}}>No pending requests</p>
          )}
          {pending.map(f => (
            <div key={f.id} className="notif-item">
              <div className="notif-name">{f.username}</div>
              <div className="notif-sub">wants to enter your galaxy</div>
              <div className="notif-btns">
                <button className="notif-btn accept" onClick={() => accept(f.id)}>Accept</button>
                <button className="notif-btn decline" onClick={() => decline(f.id)}>Decline</button>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </>
  )
}
