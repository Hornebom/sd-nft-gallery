import * as React from 'react'

export function Card({ name, description, image }) {
  return (
    <div className="card">
      {!!name && <h3>{name}</h3>}
      {!!description && <p>{description}</p>}
      {!!image && <img className="card-image" src={image} alt="" />}
    </div>
  )
}
