import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store.js'
import { api } from '../api.js'
import GalaxyCanvas from '../components/GalaxyCanvas.jsx'
import SidePanel from '../components/SidePanel.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Tooltip from '../components/Tooltip.jsx'

export default function GalaxyPage() {
  const { userId }  = useParams()
  const navigate    = useNavigate()
  const { me, friends } = useStore()

  const [galaxyUser,   setGalaxyUser]   = useState(null)
  const [stars,        setStars]        = useState([])
  const [selectedStar, setSelectedStar] = useState(null)
  const [tooltip,      setTooltip]      = useState({ text: '', x: 0, y: 0 })
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState('')

  const uid     = String(userId)
  const isOwner = String(me?.id) === uid

  const buildSlots = useCallback((allComments, allUsers, myFriends = []) => {
    if (!isOwner) {
      const isFriendWithOwner = myFriends
        .filter(f => f.status === 'accepted')
        .some(f => String(f.id ?? f.friend_id ?? f) === uid)
      if (!isFriendWithOwner || !me) return []

      const myComments = allComments
        .filter(c => String(c.author_id) === String(me.id))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(0, 7)

      return [{ friend: me, comments: myComments }]
    }

    const commenterIds = [...new Set(allComments.map(c => String(c.author_id)))]
    const accepted = myFriends
      .filter(f => f.status === 'accepted')
      .map(f => String(f.id ?? f.friend_id ?? f))
    const allIds = [...new Set([...commenterIds, ...accepted])]
    const friendList = allIds
      .map(id => allUsers.find(u => String(u.id) === id))
      .filter(Boolean)

    return friendList.slice(0, 40).map((friend) => {
      const myComments = allComments
        .filter(c => String(c.author_id) === String(friend.id))
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(0, 7)
      return { friend, comments: myComments }
    })
  }, [isOwner, me?.id, uid])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setSelectedStar(null)
    setError('')

    async function load() {
      try {
        const [owner, allComments, allUsers] = await Promise.all([
          api.getUser(uid),
          api.getComments(uid),
          api.getAllUsers(),
        ])
        if (cancelled) return

        const myFriends = isOwner
          ? await api.getFriends().catch(() => [])
          : friends || []

        const slots = buildSlots(allComments, allUsers, myFriends)
        setGalaxyUser(owner)
        setStars(slots)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load galaxy')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [uid, isOwner, friends])

  const refreshComments = useCallback(async () => {
    try {
      const [allComments, allUsers, myFriends] = await Promise.all([
        api.getComments(uid),
        api.getAllUsers(),
        isOwner ? api.getFriends() : Promise.resolve(friends || [])
      ])

      const slots = buildSlots(allComments, allUsers, myFriends)
      setStars(slots)

      setSelectedStar(prev => {
        if (!prev) return null
        if (prev.slotIdx !== undefined) return slots[prev.slotIdx] ?? prev
        if (prev.friend) {
          return slots.find(slot => slot?.friend?.id === prev.friend.id) || prev
        }
        return prev
      })
    } catch (e) {
      console.error('refreshComments:', e)
    }
  }, [uid, isOwner, buildSlots, friends])

  const handleStarClick = useCallback((slot) => {
    if (!slot) return
    if (slot.slotIdx !== undefined && (slot.friend === null || slot.friend === undefined)) {
      setSelectedStar({ friend: null, comments: [], slotIdx: slot.slotIdx })
    } else {
      setSelectedStar(slot)
    }
  }, [])

  const handleHover = useCallback((slot, x, y) => {
    if (slot) {
      const n = (slot.comments && slot.comments.length) || 0
      const name = slot.friend ? slot.friend.username : `Empty Slot ${slot.slotIdx + 1}`
      setTooltip({
        text: `${name} · ${n} planet${n !== 1 ? 's' : ''}`,
        x, y
      })
    } else {
      setTooltip({ text: '', x: 0, y: 0 })
    }
  }, [])

  if (loading) return (
    <div className="page" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 14
    }}>
      <div style={{
        fontFamily: 'Orbitron, monospace', fontSize: 10,
        color: 'rgba(150,190,255,0.5)', letterSpacing: 3, textTransform: 'uppercase'
      }}>
        Loading Galaxy…
      </div>
      <div style={{
        width: 48, height: 2,
        background: 'linear-gradient(90deg,transparent,rgba(100,160,255,0.5),transparent)',
        animation: 'pulse 1.5s ease-in-out infinite'
      }} />
    </div>
  )

  if (error) return (
    <div className="page" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 14
    }}>
      <div style={{ color: '#ff6b6b', fontFamily: 'Orbitron, monospace', fontSize: 11 }}>
        {error}
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none', border: '1px solid rgba(255,100,100,.3)',
          color: 'rgba(255,150,150,.8)', fontFamily: 'Orbitron, monospace',
          fontSize: 9, letterSpacing: 2, padding: '8px 16px',
          cursor: 'pointer', borderRadius: 6, textTransform: 'uppercase'
        }}
      >
        ← Back to Universe
      </button>
    </div>
  )

  if (!galaxyUser) return null

  const galaxyDef = {
    key:          `user-${galaxyUser.id}`,
    name:         galaxyUser.username,
    type:         'spiral',
    arms:         galaxyUser.arms  || 4,
    count:        3000,
    radius:       5.0,
    scaleMin:     0.001,
    scaleMax:     0.08,
    colorInside:  galaxyUser.color_in  || '#ffa575',
    colorOutside: galaxyUser.color_out || '#6a1599',
    randomMul:    1.0,
  }

  return (
    <div className="page">
      <Breadcrumb items={[
        { label: 'Universe', path: '/' },
        { label: `${galaxyUser.username}'s Galaxy` },
      ]} />

      <GalaxyCanvas
        key={`galaxy-${galaxyUser.id}`}
        galaxyDef={galaxyDef}
        stars={stars}
        isOwner={isOwner}
        me={me}
        onStarClick={handleStarClick}
        onHover={handleHover}
      />

      <Tooltip {...tooltip} />

      {selectedStar && (
        <SidePanel
          friend={selectedStar.friend}
          targetUserId={uid}
          owner={galaxyUser}
          isOwner={isOwner}
          initialSlot={selectedStar.slotIdx}
          comments={selectedStar.comments}
          onRefresh={refreshComments}
          onClose={() => setSelectedStar(null)}
        />
      )}

      <div className="zoom-bar">
        <button className="zb" onClick={() => navigate('/')}>← Universe</button>
        <button className="zb active">{galaxyUser.username}</button>
      </div>
    </div>
  )
}
