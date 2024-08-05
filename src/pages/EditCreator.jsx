import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import CreatorForm from '../components/CreatorForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const EditCreator = () => {
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

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

  async function handleSubmit(formData) {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id)

      if (error) throw error
      navigate(`/creator/${id}`)
    } catch (error) {
      setError('Failed to update creator')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        setLoading(true)
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id)

        if (error) throw error
        navigate('/')
      } catch (error) {
        setError('Failed to delete creator')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container">
      <h2>Edit Creator</h2>
      <CreatorForm initialData={creator} onSubmit={handleSubmit} />
      <button onClick={handleDelete} className="button error">Delete Creator</button>
    </div>
  )
}

export default EditCreator
