import React, { useState } from 'react'
import { useStore } from '../store.js'
import { api } from '../api.js'

const PLANET_COLORS = ['#ff6b9d','#ffb347','#7bed9f','#70a1ff','#eccc68','#ff6348','#a29bfe']

export default function SidePanel({ friend, targetUserId, owner, onClose, isOwner, initialSlot = null, comments: commentsProp = [], onRefresh }) {
  const { me } = useStore()
  const [commentText, setCommentText] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(initialSlot)
  const [loading, setLoading] = useState(false)

  React.useEffect(() => { setSelectedSlot(initialSlot ?? null) }, [initialSlot])

  const friendId = friend ? Number(friend.id) : null
  const grid = Array(7).fill(null)
  commentsProp.forEach((c, fallbackIdx) => {
    if (!c) return
    const slot = c.planet_slot != null ? Number(c.planet_slot) : fallbackIdx
    if (slot >= 0 && slot < 7) grid[slot] = c
  })

  async function postComment() {
    if (!commentText.trim() || selectedSlot === null) return
    setLoading(true)
    try {
      await api.postComment(targetUserId, { text: commentText.trim(), planet_slot: selectedSlot })
      setCommentText('')
      setSelectedSlot(null)
      onRefresh?.()
    } catch (e) {
      alert(e.message)
    }
    setLoading(false)
  }

  async function deleteComment(cid) {
    await api.deleteComment(cid)
    onRefresh?.()
  }

  const displayName = friend ? friend.username : (owner ? owner.username : 'Unknown')
  const initials = (friend ? friend.username : (owner ? owner.username : '')).slice(0, 2).toUpperCase()
  const filledCount = grid.filter(Boolean).length

  const canComment = !isOwner

  return (
    <div className="side-panel open">
      <div className="panel-header">
        <div className="panel-avatar" style={{ background: (friend?.color_in || owner?.color_in || '#666') + '33', color: (friend?.color_in || owner?.color_in || '#999') }}>
          {initials}
        </div>
        <div>
          <div className="panel-name">{displayName}</div>
          <div className="panel-sub">{filledCount}/7 planets orbiting</div>
        </div>
        <button className="panel-close" onClick={onClose}>×</button>
      </div>

      <div className="panel-body">
        <div className="panel-section-label">Planet comments</div>

        {grid.map((c, i) => c ? (
          <div key={i} className="planet-item">
            <div className="planet-dot" style={{ background: PLANET_COLORS[i] }} />
            <div style={{ flex: 1 }}>
              <div className="planet-text">{c.text}</div>
              <div className="planet-meta">{new Date(c.created_at).toLocaleDateString()}</div>
            </div>
            {(Number(me?.id) === Number(c.author_id)) && (
              <button
                onClick={() => deleteComment(c.id)}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,100,100,0.4)', cursor: 'pointer',
                  fontSize: 14, alignSelf: 'flex-start'
                }}
              >×</button>
            )}
          </div>
        ) : (
          <div key={i} className="empty-slot">
            <div className="empty-dot" />
            <div className="empty-text">Planet {i + 1} — no comment yet</div>
          </div>
        ))}

        {canComment && (
          <>
            <div className="panel-section-label" style={{ marginTop: 16 }}>Leave a comment</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {grid.map((c, i) => !c && (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(i)}
                  style={{
                    padding: '4px 10px', borderRadius: 5, fontSize: 9, cursor: 'pointer',
                    fontFamily: 'Orbitron,monospace', letterSpacing: '0.5px',
                    background: selectedSlot === i ? PLANET_COLORS[i] + '33' : 'rgba(255,255,255,0.03)',
                    border: `0.5px solid ${selectedSlot === i ? PLANET_COLORS[i] : 'rgba(100,160,255,0.15)'}`,
                    color: selectedSlot === i ? PLANET_COLORS[i] : 'rgba(150,190,255,0.5)'
                  }}
                >
                  Slot {i + 1}
                </button>
              ))}
            </div>
            {selectedSlot !== null && (
              <>
                <input
                  className="modal-input"
                  placeholder="Write your comment..."
                  maxLength={120}
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && postComment()}
                />
                <button
                  className="panel-action-btn"
                  onClick={postComment}
                  disabled={loading}
                >
                  {loading ? 'Posting...' : `Post to Planet ${selectedSlot + 1}`}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
