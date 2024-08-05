import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const ViewCreator = () => {
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    getCreator()
  }, [id])

  async function getCreator() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) throw error
      setCreator(data)
    } catch (error) {
      setError('Failed to fetch creator details')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container">
      <h2>{creator.name}</h2>
      <a href={creator.url} target="_blank" rel="noopener noreferrer" className="button">Visit Channel</a>
      <p>{creator.description}</p>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{maxWidth: '100%'}} />}
      <div className="grid">
        <Link to={`/edit/${creator.id}`} className="button">Edit</Link>
        <Link to="/" className="button secondary">Back to List</Link>
      </div>
    </div>
  )
}

export default ViewCreator
