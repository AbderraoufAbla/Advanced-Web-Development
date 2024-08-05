import React, { useState } from 'react'

const CreatorForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="url" value={formData.url} onChange={handleChange} placeholder="URL" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image URL (optional)" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreatorForm
