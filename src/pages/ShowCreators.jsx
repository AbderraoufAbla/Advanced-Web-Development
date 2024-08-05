import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'

const ShowCreators = () => {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    getCreators()
  }, [])

  async function getCreators() {
    const { data } = await supabase.from('creators').select()
    setCreators(data)
  }

  return (
    <div>
      <h1>Creatorverse</h1>
      <Link to="/add">Add New Creator</Link>
      {creators.length === 0 ? (
        <p>No creators found</p>
      ) : (
        creators.map(creator => <CreatorCard key={creator.id} creator={creator} />)
      )}
    </div>
  )
}

export default ShowCreators
