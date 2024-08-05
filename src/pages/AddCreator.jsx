import React from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import CreatorForm from '../components/CreatorForm'

const AddCreator = () => {
  const navigate = useNavigate()

  async function handleSubmit(formData) {
    const { data, error } = await supabase
      .from('creators')
      .insert([formData])
    
    if (error) {
      console.error('Error adding creator:', error)
    } else {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Add New Creator</h2>
      <CreatorForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddCreator
