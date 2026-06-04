import React from 'react'

export default function Tooltip({ text, x, y }) {
  if (!text) return null
  return (
    <div className={`tooltip ${text ? 'visible' : ''}`} style={{ left: x + 14, top: y - 10 }}>
      {text}
    </div>
  )
}
