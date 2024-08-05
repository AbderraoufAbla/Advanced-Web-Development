import React from 'react'
import { Link } from 'react-router-dom'

const CreatorCard = ({ creator }) => {
  return (
    <div className="creator-card">
      <h3>{creator.name}</h3>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      <p>{creator.description}</p>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <Link to={`/creator/${creator.id}`}>View Details</Link>
      <Link to={`/edit/${creator.id}`}>Edit</Link>
    </div>
  )
}

export default CreatorCard
