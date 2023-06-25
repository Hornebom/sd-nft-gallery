import * as React from 'react'
import { useSelector } from 'react-redux'
import { Card } from './Card'

export function Sidebar() {
  const history = useSelector((state) => state.history.items)

  return (
    <aside className="sidebar">
      <h2>History:</h2>

      {history && history.length > 0 && (
        <ol className="history-list">
          {history.map((entry, index) => (
            <li key={`${entry.tokenId}${index}`}>
              <Card {...entry} />
            </li>
          ))}
        </ol>
      )}
    </aside>
  )
}
