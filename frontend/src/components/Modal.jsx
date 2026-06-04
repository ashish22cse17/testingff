import React from 'react'

export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-title">{title}</div>
        {children}
        <div style={{marginTop:16}}>
          <button className="modal-btn secondary" style={{width:'100%'}} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
