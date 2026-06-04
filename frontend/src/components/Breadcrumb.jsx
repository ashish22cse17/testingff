import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  const navigate = useNavigate()
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="bc-sep">›</span>}
          {item.path
            ? <span className="bc-link" onClick={() => navigate(item.path)}>{item.label}</span>
            : <span className="bc-current">{item.label}</span>
          }
        </React.Fragment>
      ))}
    </div>
  )
}
