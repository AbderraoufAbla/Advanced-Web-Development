import React from 'react'

const ErrorMessage = ({ message }) => (
  <div className="container">
    <article className="error">
      <header>Error</header>
      <p>{message}</p>
    </article>
  </div>
)

export default ErrorMessage
